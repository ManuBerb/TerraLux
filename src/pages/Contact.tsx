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
  Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle2
} from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Please enter a valid email').max(255),
  phone: z.string().max(20).optional(),
  message: z.string().min(1, 'Message is required').max(5000),
});

const ContactPage = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honeypot, setHoneypot] = useState('');
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
      contactSchema.parse(formData);
      const response = await supabase.functions.invoke('send-contact-email', {
        body: { ...formData, _hp: honeypot },
      });
      if (response.error) {
        const errorBody = response.data;
        if (errorBody?.error?.includes('Too many requests')) {
          throw Object.assign(new Error('Rate limited'), { status: 429 });
        }
        throw response.error;
      }
      toast({
        title: t('contactPage.messageSent'),
        description: t('contactPage.messageSentDesc'),
      });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error: any) {
      console.error('Error sending message:', error);
      if (error?.message?.includes('429') || error?.status === 429) {
        toast({
          title: t('contactPage.error'),
          description: t('errors.rateLimit'),
          variant: 'destructive',
        });
      } else {
        toast({
          title: t('contactPage.error'),
          description: t('contactPage.errorDesc'),
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('contactPage.metaTitle')}</title>
        <meta name="description" content={t('contactPage.metaDesc')} />
      </Helmet>

      <Header />

      <main className="pt-20 pb-32 lg:pb-20">
        <section className="bg-gradient-hero text-primary-foreground py-16 sm:py-20">
          <div className="container-custom text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            >
              {t('contactPage.heroTitle')} <span className="text-lime">{t('contactPage.heroTitle2')}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-foreground/80 max-w-xl mx-auto"
            >
              {t('contactPage.heroSubtitle')}
            </motion.p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">
                    {t('contactPage.getInTouch')}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {t('contactPage.getInTouchDesc')}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">{t('contactPage.phone')}</h3>
                      <a href="tel:+15142935662" className="text-primary hover:text-forest-light transition-colors font-medium">
                        (514) 293-5662
                      </a>
                      <div className="text-sm text-muted-foreground mt-1 space-y-1">
                        <p>{t('contactPage.monFri')}</p>
                        <p>{t('contactPage.satSun')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">{t('contactPage.email')}</h3>
                      <a href="mailto:info@terraluxlandscape.ca" className="text-primary hover:text-forest-light transition-colors font-medium">
                        info@terraluxlandscape.ca
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">{t('contactPage.respondTime')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">{t('contactPage.serviceArea')}</h3>
                      <p className="text-foreground/80">{t('contactPage.serviceAreaValue')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-1">{t('contactPage.businessHours')}</h3>
                      <div className="text-foreground/80 text-sm space-y-1">
                        <p>{t('contactPage.monFri')}</p>
                        <p>{t('contactPage.satSun')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary rounded-2xl p-6">
                  <h3 className="font-display font-semibold text-foreground mb-3">{t('contactPage.lookingForQuote')}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{t('contactPage.lookingForQuoteDesc')}</p>
                  <Button variant="cta" asChild>
                    <Link to="/quote">
                      {t('contactPage.getQuote')}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-card">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-6">{t('contactPage.sendMessage')}</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <input
                      type="text"
                      name="_hp"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ position: 'absolute', left: '-9999px' }}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                    />
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('contactPage.nameLabel')}</Label>
                      <Input id="name" type="text" placeholder={t('contactPage.namePlaceholder')} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('contactPage.emailLabel')}</Label>
                      <Input id="email" type="email" placeholder={t('contactPage.emailPlaceholder')} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t('contactPage.phoneLabel')}</Label>
                      <Input id="phone" type="tel" placeholder={t('contactPage.phonePlaceholder')} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">{t('contactPage.messageLabel')}</Label>
                      <Textarea id="message" placeholder={t('contactPage.messagePlaceholder')} rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                    </div>
                    <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? t('contactPage.sending') : t('contactPage.sendButton')}
                    </Button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-secondary">
          <div className="container-custom">
            <div className="flex flex-wrap items-center justify-center gap-8 text-center">
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-lime" />
                <span className="font-medium">{t('contactPage.freeEstimates')}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-lime" />
                <span className="font-medium">{t('contactPage.response24hr')}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-lime" />
                <span className="font-medium">{t('contactPage.yearsExperience')}</span>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <CheckCircle2 className="h-5 w-5 text-lime" />
                <span className="font-medium">{t('contactPage.happyCustomers')}</span>
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
