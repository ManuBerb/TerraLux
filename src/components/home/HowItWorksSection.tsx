import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Phone, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function HowItWorksSection() {
  const { t } = useTranslation();

  const steps = [
    { number: '01', icon: FileText, titleKey: 'step1Title', descKey: 'step1Desc' },
    { number: '02', icon: Phone, titleKey: 'step2Title', descKey: 'step2Desc' },
    { number: '03', icon: CheckCircle, titleKey: 'step3Title', descKey: 'step3Desc' },
  ];

  return (
    <section className="section-padding bg-primary relative grain-texture overflow-hidden">
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-lg bg-parchment/10 text-warm-tan font-display text-sm font-semibold mb-4 border border-warm-tan/20"
          >
            {t('howItWorks.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-parchment"
          >
            {t('howItWorks.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            className="mt-4 text-lg text-parchment/70"
          >
            {t('howItWorks.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.18 }}
              className="relative text-center"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-warm-tan/50 to-transparent" />
              )}
              <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-parchment/10 mb-6 border border-warm-tan/20">
                <span className="font-display text-5xl font-bold text-earth/40">
                  {step.number}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-earth flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-parchment" />
                  </div>
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold text-cream mb-3">
                {t(`howItWorks.${step.titleKey}`)}
              </h3>
              <p className="text-parchment/60 leading-relaxed max-w-xs mx-auto">
                {t(`howItWorks.${step.descKey}`)}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button variant="hero" size="xl" asChild>
            <Link to="/quote">
              {t('howItWorks.cta')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-parchment/50">
            {t('howItWorks.noObligation')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
