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
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8">
              Greater Montreal &amp; Surrounding Regions. From the heart of 
              Montreal to surrounding suburbs, we bring professional outdoor 
              services to residential properties across the entire region.
            </p>
            <div className="flex items-center gap-6 mb-8">
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

          {/* Map Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-primary-foreground/10 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d357453.4487658013!2d-73.97627258750002!3d45.55975785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a541c64b70d%3A0x654e3138211fefef!2sMontreal%2C%20QC!5e0!3m2!1sen!2sca!4v1704000000000!5m2!1sen!2sca"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TerraLux Service Area - Greater Montreal"
                className="absolute inset-0"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-sm text-primary-foreground/70">
              <p>Not sure if you're in our service area?</p>
              <Button asChild variant="outline" size="sm" className="border-lime text-lime hover:bg-lime hover:text-primary">
                <Link to="/quote">Request a Free Quote</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
