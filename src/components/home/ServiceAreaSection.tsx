import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const areas = [
  'Montreal',
  'Laval',
  'Longueuil',
  'Brossard',
  'West Island',
  'South Shore',
  'North Shore',
  'Terrebonne',
  'Blainville',
  'Saint-Laurent',
  'Ville Mont-Royal',
  'Verdun',
];

export function ServiceAreaSection() {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 text-lime font-display text-sm font-semibold mb-4">
              <MapPin className="h-4 w-4" />
              Service Area
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Proudly Serving
              <br />
              <span className="text-lime">Greater Montreal</span>
            </h2>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
              From the heart of Montreal to surrounding suburbs, we bring 
              professional outdoor services to residential properties across 
              the entire Greater Montreal region. If you're within our service 
              area, we'd love to give you a free estimate.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <div className="font-display text-4xl font-bold text-lime">50km</div>
                <div className="text-sm text-primary-foreground/70">Service Radius</div>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20" />
              <div>
                <div className="font-display text-4xl font-bold text-lime">12+</div>
                <div className="text-sm text-primary-foreground/70">Communities</div>
              </div>
            </div>
          </motion.div>

          {/* Areas Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {areas.map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/10 transition-colors"
              >
                <MapPin className="h-4 w-4 text-lime flex-shrink-0" />
                <span className="font-medium text-sm">{area}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
