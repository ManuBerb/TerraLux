import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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

const services = [
  {
    icon: Leaf,
    title: 'Lawn Mowing & Edging',
    description: 'Professional mowing with precision edging for a perfectly manicured lawn that enhances your curb appeal.',
    features: ['Weekly/bi-weekly service', 'Clean edge lines', 'Clippings removed'],
    featured: true,
  },
  {
    icon: Sprout,
    title: 'Overseeding',
    description: 'Revitalize thin or patchy lawns with premium grass seed to achieve a thick, lush carpet of green.',
    features: ['Premium seed blend', 'Soil preparation', 'Follow-up care'],
    featured: false,
  },
  {
    icon: Flower2,
    title: 'Flower Bed Installations',
    description: 'Beautiful flower beds designed and installed to add color and character to your property.',
    features: ['Custom designs', 'Quality plants', 'Seasonal options'],
    featured: false,
  },
  {
    icon: TreeDeciduous,
    title: 'Mulch Beds',
    description: 'Fresh mulch installation to protect plants, retain moisture, and create clean, defined garden beds.',
    features: ['Multiple colors', 'Weed prevention', 'Professional finish'],
    featured: false,
  },
  {
    icon: Droplets,
    title: 'Sod Installation',
    description: 'Instant lawn transformation with professionally installed, premium quality sod.',
    features: ['Same-day green lawn', 'Grade preparation', 'Watering guidance'],
    featured: false,
  },
  {
    icon: Sparkles,
    title: 'Window & Pressure Washing',
    description: 'Crystal clear windows and spotless surfaces to make your entire property shine.',
    features: ['Streak-free finish', 'Deck & driveway', 'Safe techniques'],
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function ServicesSection() {
  return (
    <section className="section-padding bg-gradient-section">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary font-display text-sm font-semibold mb-4"
          >
            Our Services
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
          >
            Complete Outdoor Care for Your Home
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            From regular lawn maintenance to complete landscape transformations, 
            we offer everything you need for a beautiful outdoor space.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className={`group relative p-8 rounded-2xl transition-all duration-300 ${
                service.featured
                  ? 'bg-primary text-primary-foreground shadow-xl'
                  : 'bg-card hover:shadow-xl card-hover'
              }`}
            >
              {service.featured && (
                <div className="absolute -top-3 right-6 px-3 py-1 bg-lime text-accent-foreground text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                  service.featured
                    ? 'bg-primary-foreground/20'
                    : 'bg-secondary'
                }`}
              >
                <service.icon
                  className={`h-7 w-7 ${
                    service.featured ? 'text-lime' : 'text-primary'
                  }`}
                />
              </div>
              <h3
                className={`font-display text-xl font-semibold mb-3 ${
                  service.featured ? 'text-primary-foreground' : 'text-foreground'
                }`}
              >
                {service.title}
              </h3>
              <p
                className={`text-sm leading-relaxed mb-4 ${
                  service.featured
                    ? 'text-primary-foreground/80'
                    : 'text-muted-foreground'
                }`}
              >
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-center gap-2 text-sm ${
                      service.featured
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <CheckCircle2
                      className={`h-4 w-4 flex-shrink-0 ${
                        service.featured ? 'text-lime' : 'text-lime'
                      }`}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Button variant="cta" size="lg" asChild>
            <Link to="/services">
              View All Services
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
