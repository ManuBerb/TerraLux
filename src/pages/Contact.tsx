import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileCTA } from '@/components/layout/MobileCTA';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ContactPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: 'Message Sent!',
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again or call us directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Terralux Landscape Montreal</title>
        <meta 
          name="description" 
          content="Contact Terralux Landscape for premium lawn care and landscaping services in Greater Montreal. Call us, email us, or send a message. Complimentary estimates available." 
        />
      </Helmet>

      <Header />

      <main className="pt-20 pb-32 lg:pb-20">
        {/* Hero */}
        <section className="bg-gradient-hero text-primary-foreground py-16 sm:py-20">
          <div className="container-custom text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            >
              Contact <span className="text-lime">Us</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-foreground/80 max-w-xl mx-auto"
            >
              Have questions? We're here to help. Reach out to us through 
              any of the methods below.
            </motion.p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Whether you have a question about our services, want to request 
                    a quote, or just want to say hello, we'd love to hear from you.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        Phone
                      </h3>
                      <a
                        href="tel:5142935662"
                        className="text-primary hover:text-forest-light transition-colors font-medium"
                      >
                        (514) 293-5662
                      </a>
                      <div className="text-sm text-muted-foreground mt-1 space-y-1">
                        <p>Monday – Friday: 8:00 AM – 6:00 PM</p>
                        <p>Saturday – Sunday: 9:00 AM – 5:00 PM</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        Email
                      </h3>
                      <a
                        href="mailto:info@terraluxlandscape.ca"
                        className="text-primary hover:text-forest-light transition-colors font-medium"
                      >
                        info@terraluxlandscape.ca
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        We respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        Service Area
                      </h3>
                      <p className="text-foreground/80">
                        Greater Montreal & Surrounding Regions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        Business Hours
                      </h3>
                      <div className="text-foreground/80 text-sm space-y-1">
                        <p>Monday – Friday: 8:00 AM – 6:00 PM</p>
                        <p>Saturday – Sunday: 9:00 AM – 5:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-foreground mb-3">
                    Looking for a Quote?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    For the fastest response on service quotes, use our 
                    dedicated quote form.
                  </p>
                  <Button variant="cta" asChild>
                    <Link to="/quote">
                      Get a Free Quote
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-card">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(514) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      variant="cta"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 bg-secondary">
          <div className="container-custom">
            <div className="flex flex-wrap items-center justify-center gap-8 text-center">
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-lime" />
                <span className="font-medium">Free Estimates</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-lime" />
                <span className="font-medium">24hr Response Time</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-lime" />
                <span className="font-medium">7+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-lime" />
                <span className="font-medium">100+ Happy Customers</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileCTA />
    </>
  );
};

export default ContactPage;
