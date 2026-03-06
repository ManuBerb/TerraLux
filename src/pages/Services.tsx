import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileCTA } from '@/components/layout/MobileCTA';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SeasonBadges, type Season } from '@/components/SeasonBadge';
import { 
  Leaf, Sprout, Flower2, TreeDeciduous, Sparkles, Droplets, ArrowRight, CheckCircle2, Snowflake
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const serviceKeys: {
  id: string;
  key: string;
  icon: typeof Leaf;
  seasons: Season[];
}[] = [
  { id: 'lawn-mowing', key: 'lawnMowing', icon: Leaf, seasons: ['spring', 'summer', 'fall'] },
  { id: 'overseeding', key: 'overseeding', icon: Sprout, seasons: ['spring', 'fall'] },
  { id: 'flower-beds', key: 'flowerBeds', icon: Flower2, seasons: ['spring', 'fall'] },
  { id: 'mulch-beds', key: 'mulchBeds', icon: TreeDeciduous, seasons: ['spring', 'summer', 'fall'] },
  { id: 'sod', key: 'sodInstallation', icon: Droplets, seasons: ['spring', 'fall'] },
  { id: 'leaf-removal', key: 'leafRemoval', icon: Leaf, seasons: ['fall'] },
  { id: 'hedging', key: 'hedging', icon: TreeDeciduous, seasons: ['spring', 'fall'] },
  { id: 'window-cleaning', key: 'windowCleaning', icon: Sparkles, seasons: ['year-round'] },
  { id: 'pressure-washing', key: 'pressureWashing', icon: Droplets, seasons: ['spring', 'summer', 'fall'] },
  { id: 'snow-removal', key: 'snowRemoval', icon: Snowflake, seasons: ['coming-soon'] },
];

const ServicesPage = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <>
      <Helmet>
        <title>{t('servicesPage.metaTitle')}</title>
        <meta name="description" content={t('servicesPage.metaDesc')} />
      </Helmet>

      <Header />

      <main className="pt-20">
        <section className="bg-gradient-hero text-primary-foreground section-padding">
          <div className="container-custom text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            >
              {t('servicesPage.heroTitle')} <span className="text-lime">{t('servicesPage.heroTitle2')}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-primary-foreground/80 max-w-2xl mx-auto"
            >
              {t('servicesPage.heroSubtitle')}
            </motion.p>
          </div>
        </section>

        {/* Mobile Accordion Layout */}
        <section className="section-padding bg-background lg:hidden">
          <div className="container-custom">
            <Accordion type="single" collapsible defaultValue="lawnMowing" className="rounded-2xl overflow-hidden border border-border shadow-sm bg-white">
              {serviceKeys.map((service) => {
                const title = t(`servicesPage.${service.key}.title`);
                const description = t(`servicesPage.${service.key}.description`);
                const features = t(`servicesPage.${service.key}.features`, { returnObjects: true }) as string[];

                return (
                  <AccordionItem key={service.id} value={service.key} id={`mobile-${service.id}`}>
                    <AccordionTrigger className="py-4 px-5">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                          <service.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex flex-col items-start gap-1 flex-1">
                          <span className="font-display font-semibold text-foreground text-left">{title}</span>
                          <SeasonBadges seasons={service.seasons} />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
                      <h4 className="font-display text-sm font-semibold text-foreground mb-3">
                        {t('servicesPage.whatsIncluded')}
                      </h4>
                      <ul className="space-y-2.5 mb-5">
                        {features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <CheckCircle2 className="h-4 w-4 text-lime flex-shrink-0 mt-0.5" />
                            <span className="text-foreground/80 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {!service.seasons.includes('coming-soon') && (
                        <Button variant="cta" size="lg" className="w-full" asChild>
                          <Link to="/quote">
                            {t('servicesPage.getQuote')}
                            <ArrowRight className="h-5 w-5" />
                          </Link>
                        </Button>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </section>

        {/* Desktop Zigzag Layout */}
        <section className="section-padding bg-background hidden lg:block">
          <div className="container-custom space-y-24">
            {serviceKeys.map((service, index) => {
              const title = t(`servicesPage.${service.key}.title`);
              const description = t(`servicesPage.${service.key}.description`);
              const benefits = t(`servicesPage.${service.key}.benefits`);
              const features = t(`servicesPage.${service.key}.features`, { returnObjects: true }) as string[];

              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center flex-shrink-0">
                        <service.icon className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                          {title}
                        </h2>
                        <SeasonBadges seasons={service.seasons} />
                      </div>
                    </div>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{description}</p>
                    <p className="text-foreground/80 mb-8 leading-relaxed">{benefits}</p>
                    {!service.seasons.includes('coming-soon') && (
                      <Button variant="cta" size="lg" asChild>
                        <Link to="/quote">
                          {t('servicesPage.getQuote')}
                          <ArrowRight className="h-5 w-5" />
                        </Link>
                      </Button>
                    )}
                  </div>

                  <div className={`bg-secondary rounded-2xl p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                      {t('servicesPage.whatsIncluded')}
                    </h3>
                    <ul className="space-y-4">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <section className="section-padding bg-primary">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
              {t('servicesPage.readyTitle')}
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              {t('servicesPage.readySubtitle')}
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/quote">
                {t('servicesPage.readyCta')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <MobileCTA />
    </>
  );
};

export default ServicesPage;
