import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

export function ServiceAreaSection() {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 text-lime font-display text-sm font-semibold mb-4">
              <MapPin className="h-4 w-4" />
              {t('serviceArea.badge')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {t('serviceArea.title1')}
              <br />
              <span className="text-lime">{t('serviceArea.title2')}</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
              {t('serviceArea.description')}
            </p>
            <div className="flex items-center gap-6 mb-8">
              <div>
                <div className="font-display text-4xl font-bold text-lime">50km</div>
                <div className="text-sm text-primary-foreground/70">{t('serviceArea.serviceRadius')}</div>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20" />
              <div>
                <div className="font-display text-4xl font-bold text-lime">12+</div>
                <div className="text-sm text-primary-foreground/70">{t('serviceArea.communities')}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-primary-foreground/10 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d180000!2d-73.65!3d45.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sca!4v1704000000000!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TerraLux Service Area - Greater Montreal"
                className="absolute inset-0 pointer-events-none"
              />
            </div>
            
            <div className="relative mt-2 p-5 rounded-2xl bg-gradient-to-br from-primary-foreground/10 to-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-lime" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-primary-foreground mb-0.5 whitespace-nowrap">
                      {t('serviceArea.notSure')}
                    </p>
                    <p className="text-sm text-primary-foreground/60">
                      {t('serviceArea.loveToCheck')}
                    </p>
                  </div>
                </div>
                <Button asChild variant="cta" size="lg" className="w-full sm:w-auto flex-shrink-0">
                  <Link to="/quote">{t('serviceArea.requestQuote')}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
