import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

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
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-6">
              Greater Montreal & Surrounding Regions
            </p>
            <p className="text-primary-foreground/70 leading-relaxed mb-8">
              From the heart of Montreal to surrounding suburbs, we bring 
              professional outdoor services to residential properties across 
              the entire Greater Montreal region.
            </p>
            <div className="flex items-center gap-6">
              <div>
                <div className="font-display text-4xl font-bold text-lime">50km</div>
                <div className="text-sm text-primary-foreground/70">Service Radius</div>
              </div>
              <div className="w-px h-12 bg-primary-foreground/20" />
              <div>
                <div className="font-display text-4xl font-bold text-lime">7+</div>
                <div className="text-sm text-primary-foreground/70">Years Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 flex flex-col justify-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-primary-foreground/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d178784.94894372045!2d-73.5674!3d45.5017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sca"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Terralux Service Area - Greater Montreal"
                className="w-full aspect-[4/3] sm:aspect-video"
              />
            </div>
            
            {/* CTA Note */}
            <div className="bg-primary-foreground/5 rounded-xl p-4 border border-primary-foreground/10">
              <p className="text-sm text-primary-foreground/80 mb-3">
                Not sure if you're in our service area? Request a free quote.
              </p>
              <Button variant="cta" size="sm" asChild>
                <Link to="/quote">
                  Get a Free Quote
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
