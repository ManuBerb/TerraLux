import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { FileText, Phone, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Request a Quote',
    description: 'Fill out our simple form with your service needs and property details. It takes less than 2 minutes.',
  },
  {
    number: '02',
    icon: Phone,
    title: 'We Contact You',
    description: 'Our team will reach out within 24 hours to discuss your needs and provide a personalized estimate.',
  },
  {
    number: '03',
    icon: CheckCircle,
    title: 'Service Completed',
    description: 'Sit back and relax as our professional team transforms your outdoor space to perfection.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary font-display text-sm font-semibold mb-4"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
          >
            Getting Started is Easy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Three simple steps to a beautiful yard. We make the process seamless 
            so you can enjoy your outdoor space without the hassle.
          </motion.p>
        </div>

        {/* Steps */}
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
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-lime to-transparent" />
              )}
              
              {/* Step Number */}
              <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full bg-secondary mb-6">
                <span className="font-display text-5xl font-bold text-primary/20">
                  {step.number}
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
              </div>

              <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Button variant="cta" size="xl" asChild>
            <Link to="/quote">
              Start Your Free Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            No obligation. Free estimates for all services.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
