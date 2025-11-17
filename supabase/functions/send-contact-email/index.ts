import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.79.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// HTML escaping function to prevent XSS in emails
const escapeHtml = (text: string): string => {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
};

// Get client IP address from request
const getClientIp = (req: Request): string => {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() || 
         req.headers.get("x-real-ip") || 
         "unknown";
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message }: ContactEmailRequest = await req.json();

    // Normalize inputs
    const normalizedName = name?.trim();
    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedPhone = phone?.trim();
    const normalizedMessage = message?.trim();

    // Comprehensive server-side validation
    if (!normalizedName || normalizedName.length < 2 || normalizedName.length > 100) {
      return new Response(
        JSON.stringify({ error: "Name must be between 2 and 100 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || normalizedEmail.length > 255) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    if (!normalizedPhone || normalizedPhone.length < 10 || normalizedPhone.length > 20) {
      return new Response(
        JSON.stringify({ error: "Phone number must be between 10 and 20 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    
    if (!normalizedMessage || normalizedMessage.length < 10 || normalizedMessage.length > 1000) {
      return new Response(
        JSON.stringify({ error: "Message must be between 10 and 1000 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check for suspicious patterns (basic XSS/injection detection)
    const suspiciousPattern = /<script|javascript:|onerror=|onload=/i;
    if (suspiciousPattern.test(normalizedMessage) || suspiciousPattern.test(normalizedName)) {
      console.warn("Suspicious content detected in submission");
      return new Response(
        JSON.stringify({ error: "Invalid content detected" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Rate limiting check
    const clientIp = getClientIp(req);
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Clean up old rate limit records
    await supabase.rpc("cleanup_old_rate_limits");

    // Check current rate limit for this IP
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { data: rateLimitData, error: rateLimitError } = await supabase
      .from("contact_rate_limits")
      .select("submission_count")
      .eq("ip_address", clientIp)
      .gte("window_start", oneHourAgo)
      .single();

    if (rateLimitError && rateLimitError.code !== "PGRST116") {
      console.error("Rate limit check error:", rateLimitError);
    }

    // If rate limit exceeded (more than 5 submissions per hour)
    if (rateLimitData && rateLimitData.submission_count >= 5) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Update or create rate limit record
    if (rateLimitData) {
      await supabase
        .from("contact_rate_limits")
        .update({ submission_count: rateLimitData.submission_count + 1 })
        .eq("ip_address", clientIp)
        .gte("window_start", oneHourAgo);
    } else {
      await supabase
        .from("contact_rate_limits")
        .insert({ ip_address: clientIp, submission_count: 1 });
    }

    console.log("Sending contact form email from:", normalizedEmail);

    // Configure SMTP client
    const client = new SMTPClient({
      connection: {
        hostname: Deno.env.get("SMTP_HOST")!,
        port: Number(Deno.env.get("SMTP_PORT")),
        tls: true,
        auth: {
          username: Deno.env.get("SMTP_USER")!,
          password: Deno.env.get("SMTP_PASSWORD")!,
        },
      },
    });

    // Send email to business owner with escaped HTML content
    await client.send({
      from: Deno.env.get("SMTP_USER")!,
      to: "service@fixwellauto.ca",
      subject: `New Contact Form Submission from ${escapeHtml(normalizedName)}`,
      content: `
        New Contact Form Submission
        
        Name: ${normalizedName}
        Email: ${normalizedEmail}
        Phone: ${normalizedPhone}
        
        Message:
        ${normalizedMessage}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(normalizedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(normalizedEmail)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(normalizedPhone)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(normalizedMessage).replace(/\n/g, '<br>')}</p>
      `,
    });

    await client.close();
    
    return new Response(
      JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
