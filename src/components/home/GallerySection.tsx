import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import lawnCareBefore1 from '@/assets/gallery/lawn-care-before-1.jpg';
import lawnCareAfter1 from '@/assets/gallery/lawn-care-after-1.jpg';
import lawnCareBefore2 from '@/assets/gallery/lawn-care-before-2.jpg';
import lawnCareAfter2 from '@/assets/gallery/lawn-care-after-2.jpg';
import lawnCareBefore3 from '@/assets/gallery/lawn-care-before-3.jpg';
import lawnCareAfter3 from '@/assets/gallery/lawn-care-after-3.jpg';
import hedgingBefore1 from '@/assets/gallery/hedging-before-1.jpg';
import hedgingAfter1 from '@/assets/gallery/hedging-after-1.jpg';
import overseedingBefore1 from '@/assets/gallery/overseeding-before-1.jpg';
import overseedingAfter1 from '@/assets/gallery/overseeding-after-1.jpg';
import windowCleaningBefore1 from '@/assets/gallery/window-cleaning-before-1.jpg';
import windowCleaningAfter1 from '@/assets/gallery/window-cleaning-after-1.jpg';
import windowCleaningBefore2 from '@/assets/gallery/window-cleaning-before-2.jpg';
import windowCleaningAfter2 from '@/assets/gallery/window-cleaning-after-2.jpg';
import pressureWashingBefore1 from '@/assets/gallery/pressure-washing-before-1.jpg';
import pressureWashingAfter1 from '@/assets/gallery/pressure-washing-after-1.jpg';
import pressureWashingBefore2 from '@/assets/gallery/pressure-washing-before-2.jpg';
import pressureWashingAfter2 from '@/assets/gallery/pressure-washing-after-2.jpg';

const ITEMS_PER_PAGE = 12;

const categoryKeys = ['All', 'Lawn Care', 'Hedging', 'Overseeding', 'Window Cleaning', 'Pressure Washing'];

const galleryItems = [
  { id: 1, image: lawnCareAfter1, category: 'Lawn Care', title: 'Front Yard Transformation', tall: true },
  { id: 2, image: lawnCareAfter2, category: 'Lawn Care', title: 'Backyard Cleanup', tall: false },
  { id: 3, image: hedgingAfter1, category: 'Hedging', title: 'Hedge Trimming', tall: false },
  { id: 4, image: lawnCareAfter3, category: 'Lawn Care', title: 'Front Lawn Mowing', tall: true },
  { id: 5, image: overseedingAfter1, category: 'Overseeding', title: 'Lawn Restoration', tall: false },
  { id: 6, image: windowCleaningAfter1, category: 'Window Cleaning', title: 'Window Cleaning', tall: true },
  { id: 7, image: pressureWashingAfter1, category: 'Pressure Washing', title: 'Patio Pressure Washing', tall: false },
  { id: 8, image: windowCleaningAfter2, category: 'Window Cleaning', title: 'Window Cleaning', tall: false },
  { id: 9, image: pressureWashingAfter2, category: 'Pressure Washing', title: 'Walkway Pressure Washing', tall: true },
  { id: 10, image: lawnCareBefore1, category: 'Lawn Care', title: 'Before - Front Yard', tall: false },
  { id: 11, image: hedgingBefore1, category: 'Hedging', title: 'Before - Hedge', tall: true },
  { id: 12, image: pressureWashingBefore1, category: 'Pressure Washing', title: 'Before - Patio', tall: false },
];

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { t } = useTranslation();

  const filteredItems =
    activeCategory === 'All'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  return (
    <section className="section-padding bg-earth">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-lg bg-parchment/10 text-warm-tan font-display text-sm font-semibold mb-4 border border-warm-tan/20"
          >
            {t('gallery.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.12 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-cream"
          >
            {t('gallery.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
            className="mt-4 text-lg text-parchment/70"
          >
            {t('gallery.subtitle')}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categoryKeys.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2.5 rounded-lg font-sans text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-parchment text-primary shadow-lg'
                  : 'bg-parchment/10 text-parchment/80 hover:bg-parchment/20 border border-warm-tan/20'
              }`}
            >
              {t(`gallery.categories.${category}`)}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="break-inside-avoid group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  item.tall ? 'h-80 sm:h-96' : 'h-52 sm:h-64'
                }`}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center">
                  <span className="font-display text-lg text-cream font-semibold">
                    {t(`gallery.categories.${item.category}`)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <Button
              variant="hero-outline"
              size="lg"
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="font-sans font-semibold"
            >
              {t('gallery.showMore')}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
