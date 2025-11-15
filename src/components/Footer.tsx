import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import logo from "@/assets/logo-car.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="FIXWELL AUTO Logo" 
                className="h-8 w-auto sm:h-10"
              />
              <span className="font-bold">FIXWELL AUTO</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your trusted automotive service partner in Markham, delivering
              excellence since day one.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/services"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Services
              </Link>
              <Link
                to="/contact"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="flex flex-col gap-2">
              <li className="text-sm text-muted-foreground">Oil Changes</li>
              <li className="text-sm text-muted-foreground">Brake Service</li>
              <li className="text-sm text-muted-foreground">Engine Diagnostics</li>
              <li className="text-sm text-muted-foreground">Tire Service</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  7605 Woodbine Ave, Unit 10, Markham, Ontario L3R 5V3
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+19054778276"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  905-477-8276
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:service@fixwellauto.ca"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  service@fixwellauto.ca
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <div>Mon-Fri: 8AM-5PM</div>
                  <div>Sat: 9AM-2PM</div>
                  <div>Sun: Closed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FIXWELL AUTO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
