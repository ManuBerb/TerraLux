import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useTranslation } from 'react-i18next';

const serviceLinks = [
  { key: 'lawnMowing', href: '/services#lawn-mowing' },
  { key: 'overseeding', href: '/services#overseeding' },
  { key: 'flowerBeds', href: '/services#flower-beds' },
  { key: 'mulchBeds', href: '/services#mulch-beds' },
  { key: 'sod', href: '/services#sod' },
  { key: 'windowCleaning', href: '/services#window-cleaning' },
  { key: 'pressureWashing', href: '/services#pressure-washing' },
  { key: 'leafRemoval', href: '/services#leaf-removal' },
  { key: 'hedging', href: '/services#hedging' },
];

const companyLinks = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'getQuote', href: '/quote' },
  { key: 'contact', href: '/contact' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();

  return (
    <footer className="bg-charcoal text-parchment border-t-2 border-primary">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <Logo className="h-10 md:h-12" />
            </Link>
            <p className="mt-4 text-parchment/70 text-sm leading-relaxed">
              {t('footer.tagline')}
            </p>
            <p className="mt-4 text-parchment/60 text-sm">
              {t('footer.description')}
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-parchment">{t('footer.servicesTitle')}</h3>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service.key}>
                  <Link
                    to={service.href}
                    className="text-sm text-warm-tan hover:text-parchment transition-colors"
                  >
                    {t(`footer.serviceLinks.${service.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-parchment">{t('footer.companyTitle')}</h3>
            <ul className="space-y-2">
              {companyLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.href}
                    className="text-sm text-warm-tan hover:text-parchment transition-colors"
                  >
                    {t(`footer.companyLinks.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 text-parchment">{t('footer.contactTitle')}</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+15142935662"
                  className="flex items-center gap-3 text-sm text-warm-tan hover:text-parchment transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  (514) 293-5662
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@terraluxlandscape.ca"
                  className="flex items-center gap-3 text-sm text-warm-tan hover:text-parchment transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  info@terraluxlandscape.ca
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-warm-tan">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <span>{t('footer.servingArea')}<br />{t('footer.servingArea2')}</span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3 text-sm text-warm-tan">
                  <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-parchment block mb-1">{t('footer.businessHours')}</span>
                    <span className="whitespace-nowrap">{t('footer.monFri')}</span><br />
                    <span className="whitespace-nowrap">{t('footer.satSun')}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-warm-gray/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-parchment/50">
              {t('footer.copyright', { year: currentYear })}
            </p>
            <p className="text-sm text-parchment/50">
              {t('footer.freeEstimates')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
