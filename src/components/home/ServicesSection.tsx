import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SeasonBadges, type Season } from '@/components/SeasonBadge';
import { 
  Leaf, 
  Sprout, 
  Flower2, 
  TreeDeciduous, 
  Sparkles, 
  Droplets,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const serviceKeys = [
  { key: 'lawnMowing', icon: Leaf, featured: true, seasons: ['spring', 'summer', 'fall'] as Season[] },
  { key: 'leafRemoval', icon: TreeDeciduous, featured: false, seasons: ['fall'] as Season[] },
  { key: 'sodInstallation', icon: Droplets, featured: false, seasons: ['spring', 'fall'] as Season[] },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-[#f6f8f8]">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-secondary text-[#0fbd94] font-display text-sm font-semibold mb-4 uppercase tracking-widest border-b-2 border-[#0fbd94]"
          >
            {t('services.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
          >
            {t('services.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            {t('services.subtitle')}
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {serviceKeys.map((service) => {
            const title = t(`services.${service.key}.title`);
            const description = t(`services.${service.key}.description`);
            const features = t(`services.${service.key}.features`, { returnObjects: true }) as string[];

            return (
              <motion.div
                key={service.key}
                variants={itemVariants}
                className={`group relative p-8 rounded-sm transition-all duration-300 ${
                  service.featured
                    ? 'bg-[#10221e] text-white shadow-xl'
                    : 'bg-white border border-stone-200 shadow-sm card-hover'
                }`}
              >
                {service.featured && (
                  <div className="absolute -top-3 right-6 px-3 py-1 bg-[#0fbd94] text-white text-xs font-bold rounded-sm">
                    {t('services.mostPopular')}
                  </div>
                )}
                <div
                  className={`w-14 h-14 rounded-sm flex items-center justify-center mb-4 ${
                    service.featured ? 'bg-white/10' : 'bg-[#f6f8f8]'
                  }`}
                >
                  <service.icon
                    className={`h-7 w-7 ${service.featured ? 'text-[#0fbd94]' : 'text-[#0fbd94]'}`}
                  />
                </div>
                <div className="mb-3">
                  <SeasonBadges seasons={service.seasons} />
                </div>
                <h3
                  className={`font-display text-xl font-semibold mb-3 ${
                    service.featured ? 'text-white' : 'text-foreground'
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-4 ${
                    service.featured ? 'text-white/80' : 'text-muted-foreground'
                  }`}
                >
                  {description}
                </p>
                <ul className="space-y-2">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-2 text-sm ${
                        service.featured ? 'text-white/70' : 'text-muted-foreground'
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-[#0fbd94]" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="text-[#0fbd94] text-sm font-medium flex items-center gap-1 mt-4 group-hover:gap-2 transition-all"
                >
                  {t('services.viewAll')} →
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button variant="cta" size="lg" asChild>
            <Link to="/services">
              {t('services.viewAll')}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
