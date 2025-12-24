import { useState } from 'react';
import { motion } from 'framer-motion';
import beforeAfterLawn from '@/assets/before-after-lawn.jpg';
import mulchBed from '@/assets/mulch-bed.jpg';
import pressureWashing from '@/assets/pressure-washing.jpg';

const categories = ['All', 'Lawn Care', 'Mulch Beds', 'Pressure Washing'];

const galleryItems = [
  {
    id: 1,
    image: beforeAfterLawn,
    category: 'Lawn Care',
    title: 'Complete Lawn Restoration',
    location: 'Laval',
  },
  {
    id: 2,
    image: mulchBed,
    category: 'Mulch Beds',
    title: 'Fresh Mulch Installation',
    location: 'Brossard',
  },
  {
    id: 3,
    image: pressureWashing,
    category: 'Pressure Washing',
    title: 'Driveway Transformation',
    location: 'West Island',
  },
  {
    id: 4,
    image: beforeAfterLawn,
    category: 'Lawn Care',
    title: 'Weekly Mowing Results',
    location: 'Longueuil',
  },
  {
    id: 5,
    image: mulchBed,
    category: 'Mulch Beds',
    title: 'Garden Bed Renovation',
    location: 'Ville Mont-Royal',
  },
  {
    id: 6,
    image: pressureWashing,
    category: 'Pressure Washing',
    title: 'Patio Deep Clean',
    location: 'Saint-Laurent',
  },
];

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-secondary text-primary font-display text-sm font-semibold mb-4"
          >
            Our Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
          >
            Before & After Gallery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            See the transformation we bring to properties across Greater Montreal.
            Real results from real projects.
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full font-display text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary text-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              layout
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-2 py-1 bg-lime/90 text-accent-foreground text-xs font-semibold rounded mb-2">
                  {item.category}
                </span>
                <h3 className="font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm text-primary-foreground/80">
                  {item.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
