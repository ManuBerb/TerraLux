import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import heroImage from '@/assets/hero-lawn.jpg';
import { useTranslation } from 'react-i18next';

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-forest-dark">
      {/* Background Image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Beautiful professionally maintained lawn with crisp edges"
          className="w-full h-full object-cover opacity-30"
          style={{ objectPosition: 'center calc(50% + 80px)' }}
        />
      </div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 z-[1] grain-texture" />

      {/* Content */}
      <div className="relative z-10 container-custom py-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-earth/30 text-warm-tan font-sans text-sm font-semibold mb-6 backdrop-blur-sm border border-warm-tan/20">
              <CheckCircle2 className="h-4 w-4" />
              {t('hero.badge')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.12 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-tight"
          >
            {t('hero.title1')}
            <br />
            <span className="text-warm-tan">{t('hero.title2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.24 }}
            className="mt-6 text-lg sm:text-xl text-warm-tan/80 leading-relaxed max-w-xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.36 }}
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

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.48 }}
            className="mt-12 inline-flex items-center gap-6 sm:gap-8 px-6 py-4 rounded-lg bg-parchment/10 backdrop-blur-sm border border-warm-tan/20"
          >
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-cream">100+</div>
              <div className="text-xs sm:text-sm text-warm-tan/70">{t('hero.happyCustomers')}</div>
            </div>
            <div className="w-px h-10 bg-warm-tan/30" />
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-cream">7+</div>
              <div className="text-xs sm:text-sm text-warm-tan/70">{t('hero.yearsExperience')}</div>
            </div>
            <div className="w-px h-10 bg-warm-tan/30" />
            <div className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-cream">4.9★</div>
              <div className="text-xs sm:text-sm text-warm-tan/70">{t('hero.averageRating')}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
