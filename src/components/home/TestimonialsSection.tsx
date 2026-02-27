import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const testimonials = [
  {
    name: 'Marie-Claire Dubois',
    location: 'Laval',
    rating: 5,
    text: "Terralux transformed our backyard completely. The lawn looks better than it has in years, and their attention to detail with the edging is impressive. Highly recommend for anyone in the Greater Montreal area!",
    service: 'Lawn Mowing & Edging',
  },
  {
    name: 'Jean-Pierre Tremblay',
    location: 'Brossard',
    rating: 5,
    text: "Professional, punctual, and the results speak for themselves. Our neighbors keep asking who does our landscaping. The mulch bed installation was exactly what we wanted.",
    service: 'Mulch Beds',
  },
  {
    name: 'Sophie Anderson',
    location: 'West Island',
    rating: 5,
    text: "After trying several lawn care companies, Terralux is by far the best. They actually listen to what you want and deliver consistently excellent results every single time.",
    service: 'Weekly Lawn Care',
  },
  {
    name: 'Michel Gagnon',
    location: 'Longueuil',
    rating: 5,
    text: "The sod installation was seamless. Within a week of calling, our entire front yard was transformed from patchy dirt to a beautiful green lawn. Worth every penny!",
    service: 'Sod Installation',
  },
  {
    name: 'Catherine Roy',
    location: 'Ville Mont-Royal',
    rating: 5,
    text: "Their pressure washing service brought our driveway and patio back to life. It looks brand new! The team was respectful and cleaned up perfectly after the job.",
    service: 'Pressure Washing',
  },
  {
    name: 'Robert Lefebvre',
    location: 'Saint-Laurent',
    rating: 5,
    text: "I've been using Terralux for two years now for regular lawn maintenance. They're reliable, fairly priced, and my lawn has never looked better. True professionals.",
    service: 'Lawn Maintenance',
  },
];

export function TestimonialsSection() {
  const { t } = useTranslation();

  return (
    <section className="section-padding bg-gradient-section overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary font-display text-sm font-semibold mb-4"
          >
            {t('testimonials.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
          >
            {t('testimonials.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            {t('testimonials.subtitle')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 shadow-card hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0">
                  <Quote className="h-8 w-8 text-lime/30" />
                </div>
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-lime text-lime" />
                  ))}
                </div>
              </div>
              <p className="text-foreground/80 leading-relaxed mb-6">
                "{testimonial.text}"
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <div className="font-display font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-secondary text-primary font-medium">
                  {testimonial.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card shadow-md">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-lime text-lime" />
              ))}
            </div>
            <span className="text-foreground font-display font-semibold">
              {t('testimonials.averageRating')}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {t('testimonials.happyCustomers')}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
