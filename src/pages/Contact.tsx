import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits")
    .max(20, "Phone number must be less than 20 characters"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      contactSchema.parse(formData);

      // TODO: Implement email sending via edge function
      // For now, just show success message
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "(416) 555-1234",
      link: "tel:+14165551234",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@torontoautogarage.com",
      link: "mailto:info@torontoautogarage.com",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "123 Auto Street, Toronto, ON M5V 3A8",
      link: "https://maps.google.com",
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon-Fri: 8AM-6PM, Sat: 9AM-4PM",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have questions or need service? Get in touch with our team today
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="border-border hover:border-primary transition-all duration-300"
              >
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {info.content}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-border">
              <CardContent className="pt-6">
                <h2 className="text-3xl font-bold mb-6 text-center">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium mb-2"
                    >
                      Phone *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="(416) 555-1234"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your vehicle and what service you need..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
