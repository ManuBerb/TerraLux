import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function CTASection() {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-cream">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-primary rounded-lg p-8 sm:p-12 lg:p-16 overflow-hidden grain-texture"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-earth/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-parchment/5 rounded-full blur-2xl" />

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-parchment mb-6">
              {t('cta.title1')}
              <br />
              <span className="text-warm-tan">{t('cta.title2')}</span>
            </h2>
            <p className="text-lg text-parchment/70 mb-8 max-w-xl mx-auto">
              {t('cta.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button variant="hero" size="xl" asChild>
                <Link to="/quote">
                  {t('cta.button')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-parchment/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-warm-tan" />
                <span className="text-sm">{t('cta.freeEstimates')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-warm-tan" />
                <span className="text-sm">{t('cta.noObligation')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-warm-tan" />
                <span className="text-sm">{t('cta.response24hr')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
