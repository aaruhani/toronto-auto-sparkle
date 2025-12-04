import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart } from "lucide-react";
import aboutImage from "@/assets/about-car-repair.jpg";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Our certified technician brings decades of experience to every job",
    },
    {
      icon: Target,
      title: "Precision Service",
      description:
        "We use the latest diagnostic tools to identify and fix issues accurately",
    },
    {
      icon: Heart,
      title: "Customer First",
      description:
        "Your satisfaction and safety are our top priorities in everything we do",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Markham's premier automotive service center, dedicated to keeping
              your vehicle running at its best
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Founded in Markham, FIXWELL AUTO has been
                  serving the community with exceptional automotive care and
                  honest service. Our journey began with a simple mission: to
                  provide reliable, high-quality auto repair services that
                  customers can trust.
                </p>
                <p>
                  Over the years, we've built our reputation on transparency,
                  expertise, and customer satisfaction. We service all types of vehicles including electric vehicles (EVs), plug-in hybrids, and hybrid cars, staying current with the latest automotive technology. Our certified
                  technician is passionate about cars and committed to
                  delivering the best possible service for every vehicle that
                  comes through our doors.
                </p>
                <p>
                  We invest in the latest diagnostic equipment and ongoing
                  training to ensure we can handle everything from routine
                  maintenance to complex repairs on all makes and models. When
                  you choose FIXWELL AUTO, you're choosing a partner who
                  cares about your safety and your vehicle's performance.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={aboutImage}
                alt="Car being repaired at FIXWELL AUTO"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-border hover:border-primary transition-all duration-300"
              >
                <CardContent className="pt-6 text-center">
                  <div className="inline-flex p-3 rounded-lg bg-primary/10 mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary mb-2">10+</div>
              <p className="text-muted-foreground">Years Experience</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">5000+</div>
              <p className="text-muted-foreground">Vehicles Serviced</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">Certified</div>
              <p className="text-muted-foreground">Expert Technicians</p>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary mb-2">98%</div>
              <p className="text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
