import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileCTA } from '@/components/layout/MobileCTA';
import { HeroSection } from '@/components/home/HeroSection';
import { ServicesSection } from '@/components/home/ServicesSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { GallerySection } from '@/components/home/GallerySection';
import { ServiceAreaSection } from '@/components/home/ServiceAreaSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Welandscape | Professional Lawn Care & Outdoor Services in Greater Montreal</title>
        <meta 
          name="description" 
          content="Transform your outdoor space with Welandscape. Professional lawn mowing, landscaping, mulch beds, sod installation, and pressure washing services across Greater Montreal. Free estimates!" 
        />
        <meta name="keywords" content="lawn care Montreal, landscaping Greater Montreal, lawn mowing Laval, mulch installation, sod installation Montreal, pressure washing" />
        <link rel="canonical" href="https://welandscape.ca" />
      </Helmet>

      <Header />
      
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <GallerySection />
        <ServiceAreaSection />
        <CTASection />
      </main>

      <Footer />
      <MobileCTA />
    </>
  );
};

export default Index;
