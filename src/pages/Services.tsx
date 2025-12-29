import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileCTA } from '@/components/layout/MobileCTA';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Leaf, 
  Sprout, 
  Flower2, 
  TreeDeciduous, 
  Sparkles, 
  Droplets,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const services = [
  {
    id: 'lawn-mowing',
    icon: Leaf,
    title: 'Lawn Mowing & Edging',
    description: 'Keep your lawn looking pristine with our professional mowing and precision edging services. We ensure clean, consistent cuts and crisp edge lines that make your property stand out.',
    features: [
      'Weekly or bi-weekly service options',
      'Precision edging along driveways, walkways, and beds',
      'Grass clippings bagged or mulched',
      'Consistent mowing height for healthy growth',
      'Trimming around obstacles and tight spaces',
      'Blow-off of all hard surfaces',
    ],
    benefits: 'A well-maintained lawn is the foundation of great curb appeal. Our regular mowing service ensures your grass stays healthy, dense, and weed-resistant while looking professionally maintained year-round.',
  },
  {
    id: 'overseeding',
    icon: Sprout,
    title: 'Overseeding',
    description: 'Revitalize thin, patchy, or worn lawns with our professional overseeding service. We use premium grass seed blends suited for the Montreal climate to create a thick, lush lawn.',
    features: [
      'Soil analysis and preparation',
      'Premium cool-season grass seed blends',
      'Proper seed-to-soil contact techniques',
      'Fertilizer application included',
      'Watering schedule guidance',
      'Follow-up care recommendations',
    ],
    benefits: 'Overseeding fills in bare spots, thickens thin areas, and introduces newer grass varieties that are more disease and drought resistant. The result is a fuller, greener lawn that crowds out weeds naturally.',
  },
  {
    id: 'flower-beds',
    icon: Flower2,
    title: 'Flower Bed Installations',
    description: 'Add color, texture, and character to your landscape with custom-designed flower beds. We create beautiful arrangements using quality plants selected for our Montreal climate.',
    features: [
      'Custom design consultation',
      'Quality perennials and annuals',
      'Seasonal color options',
      'Proper soil preparation',
      'Mulch finishing included',
      'Care instructions provided',
    ],
    benefits: 'Well-designed flower beds create focal points, add seasonal color, and enhance your property\'s visual appeal. We select plants that thrive in our local conditions for long-lasting beauty.',
  },
  {
    id: 'mulch-beds',
    icon: TreeDeciduous,
    title: 'Mulch Beds',
    description: 'Protect your plants and beautify your landscape with fresh mulch installation. We offer various mulch types and colors to complement your home\'s aesthetic.',
    features: [
      'Multiple mulch color options',
      'Proper depth application (2-3 inches)',
      'Edge definition and clean lines',
      'Weed barrier option available',
      'Old mulch removal if needed',
      'Bed edging included',
    ],
    benefits: 'Mulch retains moisture, regulates soil temperature, prevents weeds, and gives your landscape a polished, professional look. Annual mulching also adds organic matter to improve soil health.',
  },
  {
    id: 'sod',
    icon: Droplets,
    title: 'Sod Installation',
    description: 'Transform your yard instantly with professional sod installation. Whether you\'re starting fresh or replacing damaged areas, we deliver a beautiful green lawn in just one day.',
    features: [
      'Grade preparation and leveling',
      'Premium quality sod delivery',
      'Professional installation technique',
      'Seam rolling for root contact',
      'Initial watering included',
      'Post-installation care guide',
    ],
    benefits: 'Sod provides instant results - no waiting months for seed to grow. It also prevents erosion, is ready to use within 2-3 weeks, and establishes faster than seeded lawns.',
  },
  {
    id: 'leaf-removal',
    icon: Leaf,
    title: 'Leaf Removal & Raking',
    description: 'Keep your property clean and your lawn healthy with our professional leaf removal services. We efficiently clear leaves from lawns, beds, and hard surfaces during the fall season.',
    features: [
      'Complete lawn and bed clearing',
      'Hard surface cleanup (driveways, patios)',
      'Gutter area clearing',
      'Leaf bagging and removal',
      'Final blow-off for clean finish',
      'Flexible scheduling during peak season',
    ],
    benefits: 'Removing fallen leaves prevents lawn suffocation, reduces fungal diseases, and keeps your property looking well-maintained throughout autumn. A clean yard also deters pests seeking winter shelter.',
  },
  {
    id: 'window-cleaning',
    icon: Sparkles,
    title: 'Window Cleaning',
    description: 'Crystal clear windows make your entire home shine. Our professional window cleaning service removes dirt, grime, and water spots for a streak-free finish.',
    features: [
      'Interior and exterior cleaning',
      'Screen cleaning included',
      'Track and sill wiping',
      'Streak-free finish guaranteed',
      'Hard water stain removal',
      'Safe techniques for all window types',
    ],
    benefits: 'Clean windows improve natural light, enhance your home\'s appearance, and extend window life by preventing etching from hard water and debris buildup.',
  },
  {
    id: 'pressure-washing',
    icon: Droplets,
    title: 'Pressure Washing & Sanding',
    description: 'Restore your outdoor surfaces to like-new condition. We safely and effectively clean driveways, patios, decks, siding, and more.',
    features: [
      'Driveway and walkway cleaning',
      'Deck and patio restoration',
      'Fence and siding washing',
      'Polymeric sand application',
      'Pre-treatment for stains',
      'Environmentally safe methods',
    ],
    benefits: 'Pressure washing removes years of dirt, mold, mildew, and stains that regular cleaning can\'t touch. It\'s the fastest way to dramatically improve your property\'s appearance.',
  },
];

const ServicesPage = () => {
  const location = useLocation();

  // Handle hash scrolling on page load and navigation
  useEffect(() => {
    if (location.hash) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          const headerOffset = 100; // Account for fixed header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <>
      <Helmet>
        <title>Our Services | Premium Lawn Care & Landscaping | Terralux Landscape Montreal</title>
        <meta 
          name="description" 
          content="Explore our complete range of premium outdoor services: lawn mowing, overseeding, flower beds, mulch, sod installation, window cleaning, and pressure washing. Serving Greater Montreal." 
        />
        <meta name="keywords" content="lawn mowing Montreal, landscaping services Laval, mulch installation, sod installation, pressure washing Montreal, window cleaning, premium landscaping" />
      </Helmet>

      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-gradient-hero text-primary-foreground section-padding">
          <div className="container-custom text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            >
              Our <span className="text-lime">Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-primary-foreground/80 max-w-2xl mx-auto"
            >
              Complete outdoor care solutions for residential properties 
              across Greater Montreal. All services include free estimates.
            </motion.p>
          </div>
        </section>

        {/* Services List */}
        <section className="section-padding bg-background">
          <div className="container-custom space-y-24">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-foreground/80 mb-8 leading-relaxed">
                    {service.benefits}
                  </p>
                  <Button variant="cta" size="lg" asChild>
                    <Link to="/quote">
                      Get a Free Quote
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>

                <div className={`bg-secondary rounded-2xl p-8 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-6">
                    What's Included
                  </h3>
                  <ul className="space-y-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-lime flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-primary">
          <div className="container-custom text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Request your free estimate today. We'll contact you within 24 hours 
              to discuss your needs.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to="/quote">
                Get Your Free Quote
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
      <MobileCTA />
    </>
  );
};

export default ServicesPage;
