import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Wrench, Clock, Shield, Award, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-garage.avif";

const Home = () => {
  const features = [
    {
      icon: Clock,
      title: "Fast Service",
      description: "Quick turnaround times without compromising quality",
    },
    {
      icon: Shield,
      title: "Certified Technicians",
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
      title: "Oil Change & Maintenance",
      description: "Regular maintenance to keep your vehicle running smoothly",
    },
    {
      title: "Brake Service",
      description: "Complete brake inspection, repair, and replacement",
    },
    {
      title: "Engine Diagnostics",
      description: "Advanced computer diagnostics for all makes and models",
    },
    {
      title: "Tire Service",
      description: "Tire rotation, balancing, and replacement services",
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
            Premium automotive service with certified technicians and
            state-of-the-art equipment
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href="https://arinvoice.utilitymobileapps.com/booking?FBProject=ARI&shopID=Y7C3apECuwSqaSpLkuchz5pmgsQ2&version=v.15.5.7" target="_blank" rel="noopener noreferrer">
                Request an Appointment <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
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

      {/* Services Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive automotive solutions for all your vehicle needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <Card
                key={index}
                className="border-border hover:border-primary transition-all duration-300 group cursor-pointer"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/services">
                View All Services <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

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
