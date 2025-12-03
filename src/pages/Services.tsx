import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Cog,
  ArrowRight,
  Zap,
  Droplets,
  Disc,
  CircleDot,
  Battery,
  Wind,
  Settings,
} from "lucide-react";
import servicesImage from "@/assets/services-bg.jpg";

const Services = () => {
  const services = [
    {
      icon: Droplets,
      title: "Oil Change & Lubrication",
      description:
        "Regular oil changes and lubrication services to keep your engine running smoothly and extend its life",
      features: [
        "Synthetic & conventional oil",
        "Filter replacement",
        "Fluid level check",
        "Multi-point inspection",
      ],
    },
    {
      icon: Disc,
      title: "Brake Service",
      description:
        "Complete brake system inspection, maintenance, and repair for optimal stopping power and safety",
      features: [
        "Brake pad replacement",
        "Rotor resurfacing",
        "Brake fluid flush",
        "ABS diagnostics",
      ],
    },
    {
      icon: Cog,
      title: "Engine Diagnostics",
      description:
        "Advanced computer diagnostics to identify and resolve engine issues quickly and accurately",
      features: [
        "Check engine light diagnosis",
        "Performance testing",
        "Emission testing",
        "Computer reprogramming",
      ],
    },
    {
      icon: CircleDot,
      title: "Tire Service",
      description:
        "Comprehensive tire services including installation, balancing, rotation, and alignment",
      features: [
        "Tire installation",
        "Wheel balancing",
        "Tire rotation",
        "Alignment service",
      ],
    },
    {
      icon: Battery,
      title: "Battery Service",
      description:
        "Battery testing, maintenance, and replacement to ensure reliable starts every time",
      features: [
        "Battery testing",
        "Terminal cleaning",
        "Battery replacement",
        "Charging system check",
      ],
    },
    {
      icon: Wind,
      title: "Air Conditioning",
      description:
        "AC system diagnostics, recharge, and repair to keep you comfortable in any weather",
      features: [
        "AC performance check",
        "Refrigerant recharge",
        "Leak detection",
        "Component replacement",
      ],
    },
    {
      icon: Settings,
      title: "Transmission Service",
      description:
        "Transmission maintenance and repair for smooth shifting and optimal performance",
      features: [
        "Fluid exchange",
        "Filter replacement",
        "Diagnostics",
        "Repair & rebuild",
      ],
    },
    {
      icon: Zap,
      title: "Electrical Systems",
      description:
        "Expert electrical diagnostics and repair for all vehicle electrical components",
      features: [
        "Alternator service",
        "Starter replacement",
        "Lighting repair",
        "Wiring diagnostics",
      ],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${servicesImage})`,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-32 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive automotive solutions for all vehicles including EV, plug-in and hybrid, delivered by a certified
            technician with state-of-the-art equipment
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Automotive Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Complete maintenance and repair services for all vehicle types
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-border hover:border-primary transition-all duration-300 hover:shadow-lg group"
              >
                <CardContent className="pt-6">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Why Choose Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Certified Technician
                  </h3>
                  <p className="text-muted-foreground">
                    Our ASE-certified technician has extensive training and experience
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Quality Parts
                  </h3>
                  <p className="text-muted-foreground">
                    We use only OEM or premium aftermarket parts to ensure
                    lasting repairs
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Warranty Coverage
                  </h3>
                  <p className="text-muted-foreground">
                    All our services come with comprehensive warranty coverage
                    for your peace of mind
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Transparent Pricing
                  </h3>
                  <p className="text-muted-foreground">
                    No hidden fees or surprises - we provide detailed estimates
                    before any work begins
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Need Service for Your Vehicle?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Get in touch with us today for a free quote or to schedule your
            service appointment
          </p>
          <Button asChild size="lg">
            <a href="https://arinvoice.utilitymobileapps.com/booking?FBProject=ARI&shopID=Y7C3apECuwSqaSpLkuchz5pmgsQ2&version=v.15.5.7" target="_blank" rel="noopener noreferrer">
              Request an Appointment <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
