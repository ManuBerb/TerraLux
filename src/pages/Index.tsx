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
        <title>Terralux Landscape | Premium Lawn Care & Outdoor Services in Greater Montreal</title>
        <meta 
          name="description" 
          content="Elevate your outdoor space with Terralux Landscape. Premium lawn mowing, landscaping, mulch beds, sod installation, and pressure washing services across Greater Montreal. Complimentary estimates." 
        />
        <meta name="keywords" content="lawn care Montreal, landscaping Greater Montreal, lawn mowing Laval, mulch installation, sod installation Montreal, pressure washing, premium landscaping" />
        <link rel="canonical" href="https://terraluxlandscape.ca" />
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
