import { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle2, Clock, Phone, Mail, ArrowRight, Loader2, Upload, X, ImageIcon
} from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useTranslation } from 'react-i18next';

const serviceValueKeys = [
  { value: 'Lawn Mowing & Edging', key: 'lawnMowing' },
  { value: 'Overseeding', key: 'overseeding' },
  { value: 'Flower Bed Installations', key: 'flowerBeds' },
  { value: 'Hedging', key: 'hedging' },
  { value: 'Leaf Removal & Raking', key: 'leafRemoval' },
  { value: 'Mulch Beds', key: 'mulchBeds' },
  { value: 'Sod Installation', key: 'sodInstallation' },
  { value: 'Window Cleaning', key: 'windowCleaning' },
  { value: 'Pressure Washing & Sanding', key: 'pressureWashing' },
  { value: 'Multiple Services', key: 'multipleServices' },
];

const quoteSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  phone: z.string().min(10, 'Please enter a valid phone number').max(20),
  service: z.string().min(1, 'Please select a service'),
  address: z.string().max(500).optional(),
  propertyType: z.string().optional(),
  contactMethod: z.string().optional(),
  details: z.string().max(2000).optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const QuotePage = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [attachedImages, setAttachedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '', email: '', phone: '', service: '',
    address: '', propertyType: 'residential', contactMethod: 'phone', details: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).filter(file => {
      if (!file.type.startsWith('image/')) {
        toast({ title: t('quotePage.invalidFile'), description: t('quotePage.invalidFileDesc'), variant: 'destructive' });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({ title: t('quotePage.fileTooLarge'), description: t('quotePage.fileTooLargeDesc'), variant: 'destructive' });
        return false;
      }
      return true;
    });
    const totalImages = [...attachedImages, ...newImages].slice(0, 3);
    setAttachedImages(totalImages);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (index: number) => {
    setAttachedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = quoteSchema.parse(formData);
      let imagePaths: string[] = [];
      if (attachedImages.length > 0) {
        for (const file of attachedImages) {
          const fileName = `${Date.now()}-${file.name}`;
          const { error: uploadError } = await supabase.storage.from('quotes').upload(fileName, file);
          if (!uploadError) imagePaths.push(fileName);
        }
      }

      const { data, error } = await supabase.functions.invoke('send-quote-email', {
        body: {
          fullName: validatedData.fullName, email: validatedData.email, phone: validatedData.phone,
          serviceRequested: validatedData.service, propertyType: validatedData.propertyType || undefined,
          addressOrNeighborhood: validatedData.address || undefined,
          preferredContactMethod: validatedData.contactMethod || undefined,
          additionalDetails: validatedData.details || undefined,
          imagePaths: imagePaths.length > 0 ? imagePaths : undefined,
          website_url: honeypot,
        },
      });

      if (error) throw new Error(error.message);
      if (!data?.success) throw new Error(data?.error || 'Failed to submit quote');

      setFormData({ fullName: '', email: '', phone: '', service: '', address: '', propertyType: 'residential', contactMethod: 'phone', details: '' });
      setAttachedImages([]);
      setIsSubmitted(true);
      toast({ title: t('quotePage.submitted'), description: t('quotePage.submittedDesc') });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof QuoteFormData, string>> = {};
        error.errors.forEach((err) => { if (err.path[0]) fieldErrors[err.path[0] as keyof QuoteFormData] = err.message; });
        setErrors(fieldErrors);
        toast({ title: t('quotePage.checkForm'), description: t('quotePage.checkFormDesc'), variant: 'destructive' });
      } else if (error?.message?.includes('429') || error?.status === 429) {
        toast({ title: t('quotePage.somethingWrong'), description: t('errors.rateLimit'), variant: 'destructive' });
      } else {
        toast({ title: t('quotePage.somethingWrong'), description: t('quotePage.somethingWrongDesc'), variant: 'destructive' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSubmitted) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [isSubmitted]);

  if (isSubmitted) {
    return (
      <>
        <Helmet><title>{t('quotePage.thankYouTitle')} | Terralux Landscape</title></Helmet>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center bg-gradient-section">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="container-custom py-20">
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 bg-lime/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-lime" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('quotePage.thankYouTitle')}</h1>
              <p className="text-lg text-muted-foreground mb-8" dangerouslySetInnerHTML={{ __html: t('quotePage.thankYouDesc') }} />
              <div className="bg-card rounded-2xl p-6 shadow-card mb-8">
                <h3 className="font-display font-semibold text-foreground mb-4">{t('quotePage.whatNext')}</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{t('quotePage.nextReview')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{t('quotePage.nextContact')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{t('quotePage.nextEstimate')}</span>
                  </li>
                </ul>
              </div>
              <Button variant="cta" size="lg" asChild>
                <a href="/">{t('quotePage.returnHome')}</a>
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('quotePage.metaTitle')}</title>
        <meta name="description" content={t('quotePage.metaDesc')} />
      </Helmet>

      <Header />

      <main className="pt-20 pb-32 lg:pb-20">
        <section className="bg-gradient-hero text-primary-foreground py-16 sm:py-20">
          <div className="container-custom text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('quotePage.heroTitle')} <span className="text-lime">{t('quotePage.heroTitle2')}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg text-primary-foreground/80 max-w-xl mx-auto">
              {t('quotePage.heroSubtitle')}
            </motion.p>
          </div>
        </section>

        <section className="py-12 sm:py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <input
                      type="text"
                      name="website_url"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="new-password"
                    />
                  </div>
                  <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
                    <h2 className="font-display text-xl font-semibold text-foreground">{t('quotePage.contactInfo')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">{t('quotePage.fullName')} <span className="text-destructive">*</span></Label>
                        <Input id="fullName" type="text" placeholder={t('quotePage.fullNamePlaceholder')} value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className={errors.fullName ? 'border-destructive' : ''} />
                        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('quotePage.emailLabel')} <span className="text-destructive">*</span></Label>
                        <Input id="email" type="email" placeholder={t('quotePage.emailPlaceholder')} value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className={errors.email ? 'border-destructive' : ''} />
                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t('quotePage.phoneLabel')} <span className="text-destructive">*</span></Label>
                        <Input id="phone" type="tel" placeholder={t('quotePage.phonePlaceholder')} value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className={errors.phone ? 'border-destructive' : ''} />
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">{t('quotePage.serviceLabel')} <span className="text-destructive">*</span></Label>
                        <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                          <SelectTrigger className={errors.service ? 'border-destructive' : ''}>
                            <SelectValue placeholder={t('quotePage.servicePlaceholder')} />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            {serviceValueKeys.map((s) => (
                              <SelectItem key={s.value} value={s.value}>{t(`quotePage.services.${s.key}`)}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.service && <p className="text-sm text-destructive">{errors.service}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      {t('quotePage.additionalDetails')} <span className="text-muted-foreground font-normal text-sm">{t('quotePage.optional')}</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">{t('quotePage.addressLabel')}</Label>
                        <Input id="address" type="text" placeholder={t('quotePage.addressPlaceholder')} value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="propertyType">{t('quotePage.propertyType')}</Label>
                        <Select value={formData.propertyType} onValueChange={(value) => handleInputChange('propertyType', value)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-popover">
                            <SelectItem value="residential">{t('quotePage.residential')}</SelectItem>
                            <SelectItem value="commercial">{t('quotePage.commercial')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contactMethod">{t('quotePage.contactMethod')}</Label>
                        <Select value={formData.contactMethod} onValueChange={(value) => handleInputChange('contactMethod', value)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent className="bg-popover">
                            <SelectItem value="phone">{t('quotePage.phoneCall')}</SelectItem>
                            <SelectItem value="text">{t('quotePage.textMessage')}</SelectItem>
                            <SelectItem value="email">{t('quotePage.emailMethod')}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="details">{t('quotePage.projectDetails')}</Label>
                        <Textarea id="details" placeholder={t('quotePage.projectPlaceholder')} rows={4} value={formData.details} onChange={(e) => handleInputChange('details', e.target.value)} />
                      </div>
                      <div className="space-y-2 sm:col-span-2">
                        <Label>{t('quotePage.attachPhotos')}</Label>
                        <p className="text-sm text-muted-foreground mb-2">{t('quotePage.attachPhotosDesc')}</p>
                        <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" id="image-upload" />
                        <div className="flex flex-wrap gap-3">
                          {attachedImages.map((file, index) => (
                            <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border bg-muted">
                              <img src={URL.createObjectURL(file)} alt={`Attachment ${index + 1}`} className="w-full h-full object-cover" />
                              <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors">
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                          {attachedImages.length < 3 && (
                            <button type="button" onClick={() => fileInputRef.current?.click()} className="w-20 h-20 rounded-lg border-2 border-dashed border-border hover:border-primary/50 bg-muted/50 hover:bg-muted flex flex-col items-center justify-center gap-1 transition-colors">
                              <Upload className="h-5 w-5 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">{t('quotePage.add')}</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" variant="cta" size="xl" className="w-full sm:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <><Loader2 className="h-5 w-5 animate-spin" />{t('quotePage.submitting')}</>
                    ) : (
                      <>{t('quotePage.submitButton')}<ArrowRight className="h-5 w-5" /></>
                    )}
                  </Button>
                </form>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
                <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                  <h3 className="font-display text-lg font-semibold mb-4">{t('quotePage.whyChoose')}</h3>
                  <ul className="space-y-4">
                    {['whyFreeEstimates', 'whyResponse', 'whyExperience', 'whySatisfied', 'whyRating'].map((key) => (
                      <li key={key} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-primary-foreground/80">{t(`quotePage.${key}`)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">{t('quotePage.preferCall')}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{t('quotePage.preferCallDesc')}</p>
                  <a href="tel:+15142935662" className="flex items-center gap-3 text-primary font-semibold hover:text-forest-light transition-colors">
                    <Phone className="h-5 w-5" />
                    (514) 293-5662
                  </a>
                </div>

                <div className="bg-secondary rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{t('quotePage.serviceAreaTitle')}</h3>
                  <p className="text-muted-foreground text-sm">{t('quotePage.serviceAreaValue')}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default QuotePage;
