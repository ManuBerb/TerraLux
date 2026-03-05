import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { LanguageToggle } from '@/components/LanguageToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.services'), href: '/services' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-parchment/95 backdrop-blur-md border-b border-warm-tan/50 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <nav className="container-custom" aria-label="Global">
        <div className="flex h-20 items-center justify-between">
          <Link to="/" className="flex items-center">
            <Logo className="h-10 md:h-12" />
          </Link>

          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`font-sans text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                  location.pathname === item.href
                    ? 'text-primary after:w-full'
                    : 'text-foreground/80 hover:text-primary after:w-0 hover:after:w-full'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <LanguageToggle />
            <a
              href="tel:+15142935662"
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              {t('nav.phone')}
            </a>
            <Button variant="default" size="lg" className="rounded-lg" asChild>
              <Link to="/quote">{t('nav.getQuote')}</Link>
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <LanguageToggle />
            <button
              type="button"
              className="p-2 -m-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-parchment border-t border-warm-tan"
          >
            <div className="container-custom py-6 space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block font-display text-lg font-medium py-2 transition-colors ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-foreground/80 hover:text-primary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-warm-tan space-y-4">
                <a
                  href="tel:+15142935662"
                  className="flex items-center gap-2 text-muted-foreground"
                >
                  <Phone className="h-5 w-5" />
                  {t('nav.phone')}
                </a>
                <Button variant="default" size="lg" className="w-full rounded-lg" asChild>
                  <Link to="/quote">{t('nav.getQuote')}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
