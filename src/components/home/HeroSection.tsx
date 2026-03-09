import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-lawn.jpg';
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Beautiful professionally maintained lawn with crisp edges"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center calc(50% + 80px)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom pt-0 pb-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/20 text-lime font-display text-sm font-semibold mb-6 backdrop-blur-sm">
              <CheckCircle2 className="h-4 w-4" />
              {t('hero.badge')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight"
          >
            {t('hero.title1')}
            <br />
            <span className="text-lime">{t('hero.title2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg sm:text-xl text-primary-foreground/80 leading-relaxed max-w-xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Button variant="hero" size="xl" asChild>
              <Link to="/quote">
                {t('hero.ctaQuote')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/services">
                {t('hero.ctaServices')}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 grid grid-cols-3 gap-4 sm:flex sm:items-center sm:gap-8"
          >
            <div className="text-primary-foreground text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold">100+</div>
              <div className="text-xs sm:text-sm text-primary-foreground/70">{t('hero.happyCustomers')}</div>
            </div>
            <div className="text-primary-foreground text-center sm:border-l sm:border-primary-foreground/20 sm:pl-8">
              <div className="font-display text-2xl sm:text-3xl font-bold">7+</div>
              <div className="text-xs sm:text-sm text-primary-foreground/70">{t('hero.yearsExperience')}</div>
            </div>
            <div className="text-primary-foreground text-center sm:border-l sm:border-primary-foreground/20 sm:pl-8">
              <div className="font-display text-2xl sm:text-3xl font-bold">4.9★</div>
              <div className="text-xs sm:text-sm text-primary-foreground/70">{t('hero.averageRating')}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
