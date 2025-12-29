import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const services = [
  { name: 'Lawn Mowing & Edging', href: '/services#lawn-mowing' },
  { name: 'Overseeding', href: '/services#overseeding' },
  { name: 'Flower Bed Installations', href: '/services#flower-beds' },
  { name: 'Mulch Beds', href: '/services#mulch-beds' },
  { name: 'Sod Installation', href: '/services#sod' },
  { name: 'Window Cleaning', href: '/services#window-cleaning' },
  { name: 'Pressure Washing', href: '/services#pressure-washing' },
];

const company = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Get a Quote', href: '/quote' },
  { name: 'Contact', href: '/contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-display text-2xl font-bold">
                Terra<span className="text-lime">lux</span>
              </span>
            </Link>
            <p className="mt-4 text-primary-foreground/80 text-sm leading-relaxed">
              Elevate Your Outdoor Living.
            </p>
            <p className="mt-4 text-primary-foreground/70 text-sm">
              Premium outdoor services for discerning homeowners across Greater Montreal.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-sm text-primary-foreground/70 hover:text-lime transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-primary-foreground/70 hover:text-lime transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+15141234567"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-lime transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  (514) 123-4567
                </a>
              </li>
              <li>
              <a
                  href="mailto:info@terraluxlandscape.ca"
                  className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-lime transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  info@terraluxlandscape.ca
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>Serving Greater Montreal<br />& Surrounding Regions</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {currentYear} Terralux Landscape Inc. All rights reserved.
            </p>
            <p className="text-sm text-primary-foreground/60">
              Free estimates for all services
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
