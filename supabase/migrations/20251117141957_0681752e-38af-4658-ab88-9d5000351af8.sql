-- Create rate limiting table for contact form submissions
CREATE TABLE IF NOT EXISTS public.contact_rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  ip_address TEXT NOT NULL,
  submission_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_contact_rate_limits_ip_window 
ON public.contact_rate_limits(ip_address, window_start);

-- Enable RLS (even though this table is only accessed by edge functions)
ALTER TABLE public.contact_rate_limits ENABLE ROW LEVEL SECURITY;

-- Create policy to allow edge functions to manage rate limits
CREATE POLICY "Allow service role to manage rate limits"
ON public.contact_rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create function to clean up old rate limit records (older than 1 hour)
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM public.contact_rate_limits
  WHERE window_start < now() - interval '1 hour';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;