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
    <section className="section-padding bg-[#10221e]">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-sm bg-white/10 text-[#0fbd94] font-display text-sm font-semibold mb-4 border border-white/10 uppercase tracking-widest"
          >
            {t('howItWorks.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100"
          >
            {t('howItWorks.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-400"
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
              transition={{ delay: index * 0.15 }}
              className="relative text-center"
            >
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-[#0fbd94]/30" />
              )}
              <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-white/5 mb-6">
                <span className="font-display text-6xl font-black italic text-[#0fbd94]/30">
                  {step.number}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#0fbd94] flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-100 mb-3">
                {t(`howItWorks.${step.titleKey}`)}
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-xs mx-auto">
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
          <Button variant="cta" size="xl" asChild>
            <Link to="/quote">
              {t('howItWorks.cta')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-slate-400">
            {t('howItWorks.noObligation')}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
