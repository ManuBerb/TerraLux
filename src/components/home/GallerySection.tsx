import { useState } from 'react';
import { motion } from 'framer-motion';
import lawnCareBefore1 from '@/assets/gallery/lawn-care-before-1.jpg';
import lawnCareAfter1 from '@/assets/gallery/lawn-care-after-1.jpg';
import lawnCareBefore2 from '@/assets/gallery/lawn-care-before-2.jpg';
import lawnCareAfter2 from '@/assets/gallery/lawn-care-after-2.jpg';
import hedgingBefore1 from '@/assets/gallery/hedging-before-1.jpg';
import hedgingAfter1 from '@/assets/gallery/hedging-after-1.jpg';

const categories = ['All', 'Lawn Care', 'Hedging'];

const galleryItems = [
  {
    id: 1,
    beforeImage: lawnCareBefore1,
    afterImage: lawnCareAfter1,
    category: 'Lawn Care',
    title: 'Front Yard Transformation',
    location: 'Ville Saint-Laurent',
  },
  {
    id: 2,
    beforeImage: lawnCareBefore2,
    afterImage: lawnCareAfter2,
    category: 'Lawn Care',
    title: 'Backyard Cleanup',
    location: 'Ville Saint-Laurent',
  },
  {
    id: 3,
    beforeImage: hedgingBefore1,
    afterImage: hedgingAfter1,
    category: 'Hedging',
    title: 'Hedge Trimming',
    location: 'Ville Saint-Laurent',
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              layout
              className="group rounded-2xl overflow-hidden shadow-card bg-card"
            >
              <div className="grid grid-cols-2 gap-1">
                <div className="relative aspect-[4/3]">
                  <span className="absolute top-2 left-2 z-10 px-2 py-1 bg-destructive/90 text-destructive-foreground text-xs font-semibold rounded">
                    Before
                  </span>
                  <img
                    src={item.beforeImage}
                    alt={`${item.title} - Before`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="relative aspect-[4/3]">
                  <span className="absolute top-2 left-2 z-10 px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-semibold rounded">
                    After
                  </span>
                  <img
                    src={item.afterImage}
                    alt={`${item.title} - After`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-4">
                <span className="inline-block px-2 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded mb-2">
                  {item.category}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
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
