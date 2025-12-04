import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GoogleReviews from "@/components/GoogleReviews";
import {
  Clock,
  Shield,
  Award,
  Wrench,
  ChevronRight,
} from "lucide-react";
import heroImage from "@/assets/hero-garage.avif";
import oilPressureIcon from "@/assets/service-icons/oil-pressure.png";
import absBrakeIcon from "@/assets/service-icons/abs-brake.png";
import engineLightIcon from "@/assets/service-icons/engine-light.png";
import tirePressureIcon from "@/assets/service-icons/tire-light.png";
import batteryLightIcon from "@/assets/service-icons/battery-light.png";
import acServiceIcon from "@/assets/service-icons/ac-service.png";
import electricalServiceIcon from "@/assets/service-icons/electrical-service.png";
import transmissionServiceIcon from "@/assets/service-icons/transmission-service.png";

const Home = () => {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const features = [
    {
      icon: Clock,
      title: "Fast Service",
      description: "Quick turnaround times without compromising quality",
    },
    {
      icon: Shield,
      title: "Certified Technician",
      description: "Expert team with years of automotive experience",
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "We stand behind our work with comprehensive warranties",
    },
    {
      icon: Wrench,
      title: "Modern Equipment",
      description: "State-of-the-art tools for accurate diagnostics",
    },
  ];

  const services = [
    {
      image: oilPressureIcon,
      title: "Oil Change & Lubrication",
      description: "Regular oil changes and lubrication services to keep your engine running smoothly and extend its life",
      features: ["Synthetic & conventional oil", "Filter replacement", "Fluid level check", "Multi-point inspection"],
    },
    {
      image: absBrakeIcon,
      title: "Brake Service",
      description: "Complete brake system inspection, maintenance, and repair for optimal stopping power and safety",
      features: ["Brake pad replacement", "Rotor resurfacing", "Brake fluid flush", "ABS diagnostics"],
    },
    {
      image: engineLightIcon,
      title: "Engine Diagnostics",
      description: "Advanced computer diagnostics to identify and resolve engine issues quickly and accurately",
      features: ["Check engine light diagnosis", "Performance testing", "Emission testing", "Computer reprogramming"],
    },
    {
      image: tirePressureIcon,
      title: "Tire Service",
      description: "Comprehensive tire services including installation, balancing, rotation, and alignment",
      features: ["Tire installation", "Wheel balancing", "Tire rotation", "Alignment service"],
    },
    {
      image: batteryLightIcon,
      title: "Battery Service",
      description: "Battery testing, maintenance, and replacement to ensure reliable starts every time",
      features: ["Battery testing", "Terminal cleaning", "Battery replacement", "Charging system check"],
    },
    {
      image: acServiceIcon,
      title: "Air Conditioning",
      description: "AC system diagnostics, recharge, and repair to keep you comfortable in any weather",
      features: ["AC performance check", "Refrigerant recharge", "Leak detection", "Component replacement"],
    },
    {
      image: transmissionServiceIcon,
      title: "Transmission Service",
      description: "Transmission maintenance and repair for smooth shifting and optimal performance",
      features: ["Fluid exchange", "Filter replacement", "Diagnostics", "Repair & rebuild"],
    },
    {
      image: electricalServiceIcon,
      title: "Electrical Systems",
      description: "Expert electrical diagnostics and repair for all vehicle electrical components",
      features: ["Alternator service", "Starter replacement", "Lighting repair", "Wiring diagnostics"],
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImage})`,
          }}
        />
        <div className="relative z-10 container mx-auto px-4 py-32 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Expert Auto Care in{" "}
            <span className="text-primary">Markham</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Premium automotive service for all vehicles including EV, plug-in and hybrid, delivered by a certified technician with state-of-the-art equipment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="font-bold">
              <a href="https://arinvoice.utilitymobileapps.com/booking?FBProject=ARI&shopID=Y7C3apECuwSqaSpLkuchz5pmgsQ2&version=v.15.5.7" target="_blank" rel="noopener noreferrer">
                Request an Appointment
              </a>
            </Button>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-200 border-none font-bold">
              <Link to="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine expertise, quality, and customer service to deliver the
              best automotive care in Markham
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-border hover:border-primary transition-all duration-300 hover:shadow-lg group"
              >
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive automotive solutions for all your vehicle needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`border-border hover:border-primary transition-all duration-300 group cursor-pointer ${expandedService === index ? "border-primary shadow-lg" : ""
                  }`}
                onClick={() => setExpandedService(expandedService === index ? null : index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="mb-3">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-14 w-14 object-contain mix-blend-screen"
                      />
                    </div>
                    <ChevronRight
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-300 ${expandedService === index ? "rotate-90" : ""
                        }`}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{service.description}</p>

                  {expandedService === index && (
                    <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviews />

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Contact us today for a free quote or to schedule your service
            appointment
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
