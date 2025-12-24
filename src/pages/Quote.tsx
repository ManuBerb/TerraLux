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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle2, 
  Clock, 
  Phone, 
  Mail,
  ArrowRight,
  Loader2,
  Upload,
  X,
  ImageIcon
} from 'lucide-react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';

const services = [
  'Lawn Mowing & Edging',
  'Overseeding',
  'Flower Bed Installations',
  'Mulch Beds',
  'Sod Installation',
  'Window Cleaning',
  'Pressure Washing & Sanding',
  'Multiple Services',
];

const contactMethods = [
  { value: 'phone', label: 'Phone Call' },
  { value: 'text', label: 'Text Message' },
  { value: 'email', label: 'Email' },
];

const propertyTypes = [
  { value: 'residential', label: 'Residential' },
  { value: 'commercial', label: 'Commercial' },
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});
  const [attachedImages, setAttachedImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    email: '',
    phone: '',
    service: '',
    address: '',
    propertyType: 'residential',
    contactMethod: 'phone',
    details: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    const newImages = Array.from(files).filter(file => {
      // Only accept image files under 5MB
      if (!file.type.startsWith('image/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload image files only (JPG, PNG, etc.)',
          variant: 'destructive',
        });
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please upload images under 5MB',
          variant: 'destructive',
        });
        return false;
      }
      return true;
    });
    
    // Limit to 3 images total
    const totalImages = [...attachedImages, ...newImages].slice(0, 3);
    setAttachedImages(totalImages);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setAttachedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (field: keyof QuoteFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = quoteSchema.parse(formData);
      
      // Prepare extra data (image filenames for now, will add URLs when storage is set up)
      const extraData = attachedImages.length > 0 
        ? { pending_image_filenames: attachedImages.map(img => img.name) }
        : null;

      // Insert into Supabase
      const { error: supabaseError } = await supabase
        .from('quotes')
        .insert({
          full_name: validatedData.fullName,
          email: validatedData.email,
          phone: validatedData.phone,
          service_requested: validatedData.service,
          address_or_neighborhood: validatedData.address || null,
          property_type: validatedData.propertyType || null,
          preferred_contact_method: validatedData.contactMethod || null,
          additional_details: validatedData.details || null,
          extra: extraData,
        });

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        throw new Error(supabaseError.message);
      }

      // Reset form on success
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        service: '',
        address: '',
        propertyType: 'residential',
        contactMethod: 'phone',
        details: '',
      });
      setAttachedImages([]);

      setIsSubmitted(true);
      toast({
        title: 'Quote Request Submitted!',
        description: "We'll contact you within 24 hours to provide your free estimate.",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof QuoteFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof QuoteFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast({
          title: 'Please check your form',
          description: 'Some fields need your attention.',
          variant: 'destructive',
        });
      } else {
        console.error('Submission error:', error);
        toast({
          title: 'Something went wrong',
          description: 'Please try again or call us directly.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Scroll to top when showing Thank You page
  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [isSubmitted]);

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Thank You | Welandscape Montreal</title>
        </Helmet>
        <Header />
        <main className="pt-20 min-h-screen flex items-center justify-center bg-gradient-section">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="container-custom py-20"
          >
            <div className="max-w-lg mx-auto text-center">
              <div className="w-20 h-20 bg-lime/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-lime" />
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Thank You!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your quote request has been received. We'll contact you within 
                <strong className="text-foreground"> 24 hours</strong> to provide 
                your free estimate.
              </p>
              <div className="bg-card rounded-2xl p-6 shadow-card mb-8">
                <h3 className="font-display font-semibold text-foreground mb-4">
                  What Happens Next?
                </h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      Our team reviews your request
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      We contact you to discuss details and schedule an on-site visit if needed
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">
                      You receive your free, no-obligation estimate
                    </span>
                  </li>
                </ul>
              </div>
              <Button variant="cta" size="lg" asChild>
                <a href="/">Return to Home</a>
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
        <title>Get a Free Quote | Welandscape Montreal</title>
        <meta 
          name="description" 
          content="Request a free, no-obligation quote for lawn care and landscaping services in Greater Montreal. We'll contact you within 24 hours." 
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
              Get Your <span className="text-lime">Free Quote</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-primary-foreground/80 max-w-xl mx-auto"
            >
              Fill out the form below and we'll get back to you within 24 hours 
              with a free, no-obligation estimate.
            </motion.p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 sm:py-16 bg-background">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-2"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Required Fields */}
                  <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Contact Information
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="fullName"
                          type="text"
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className={errors.fullName ? 'border-destructive' : ''}
                        />
                        {errors.fullName && (
                          <p className="text-sm text-destructive">{errors.fullName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={errors.email ? 'border-destructive' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(514) 000-0000"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={errors.phone ? 'border-destructive' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive">{errors.phone}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="service">
                          Service Needed <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          value={formData.service}
                          onValueChange={(value) => handleInputChange('service', value)}
                        >
                          <SelectTrigger className={errors.service ? 'border-destructive' : ''}>
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.service && (
                          <p className="text-sm text-destructive">{errors.service}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Optional Fields */}
                  <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Additional Details <span className="text-muted-foreground font-normal text-sm">(Optional)</span>
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="address">Address or Neighborhood</Label>
                        <Input
                          id="address"
                          type="text"
                          placeholder="e.g., 123 Main St, Laval or West Island"
                          value={formData.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="propertyType">Property Type</Label>
                        <Select
                          value={formData.propertyType}
                          onValueChange={(value) => handleInputChange('propertyType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            {propertyTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactMethod">Preferred Contact Method</Label>
                        <Select
                          value={formData.contactMethod}
                          onValueChange={(value) => handleInputChange('contactMethod', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            {contactMethods.map((method) => (
                              <SelectItem key={method.value} value={method.value}>
                                {method.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="details">Project Details or Notes</Label>
                        <Textarea
                          id="details"
                          placeholder="Tell us more about your project, yard size, specific needs, etc."
                          rows={4}
                          value={formData.details}
                          onChange={(e) => handleInputChange('details', e.target.value)}
                        />
                      </div>

                      {/* Image Upload */}
                      <div className="space-y-2 sm:col-span-2">
                        <Label>Attach Photos (Optional)</Label>
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload up to 3 photos of your yard or project area
                        </p>
                        
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        
                        <div className="flex flex-wrap gap-3">
                          {attachedImages.map((file, index) => (
                            <div
                              key={index}
                              className="relative w-20 h-20 rounded-lg overflow-hidden border border-border bg-muted"
                            >
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Attachment ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                          
                          {attachedImages.length < 3 && (
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="w-20 h-20 rounded-lg border-2 border-dashed border-border hover:border-primary/50 bg-muted/50 hover:bg-muted flex flex-col items-center justify-center gap-1 transition-colors"
                            >
                              <Upload className="h-5 w-5 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Add</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="cta"
                    size="xl"
                    className="w-full sm:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Quote Request
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
                  <h3 className="font-display text-lg font-semibold mb-4">
                    Why Choose Welandscape?
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-primary-foreground/80">
                        Free, no-obligation estimates
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-primary-foreground/80">
                        Response within 24 hours
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-primary-foreground/80">
                        10+ years serving Greater Montreal
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-primary-foreground/80">
                        500+ satisfied customers
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-primary-foreground/80">
                        4.9★ average customer rating
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-card">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    Prefer to Call?
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Our team is available to discuss your project directly.
                  </p>
                  <a
                    href="tel:+15141234567"
                    className="flex items-center gap-3 text-primary font-semibold hover:text-forest-light transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    (514) 123-4567
                  </a>
                </div>

                <div className="bg-secondary rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    Service Area
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    We proudly serve Montreal, Laval, Longueuil, Brossard, 
                    West Island, South Shore, North Shore, and surrounding areas.
                  </p>
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
