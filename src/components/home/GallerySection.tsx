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

const ITEMS_PER_PAGE = 6;

const categoryKeys = ['All', 'Lawn Care', 'Hedging', 'Overseeding', 'Window Cleaning', 'Pressure Washing'];

const galleryItems = [
  { id: 1, beforeImage: lawnCareBefore1, afterImage: lawnCareAfter1, category: 'Lawn Care', title: 'Front Yard Transformation', location: 'Ville Saint-Laurent' },
  { id: 2, beforeImage: lawnCareBefore2, afterImage: lawnCareAfter2, category: 'Lawn Care', title: 'Backyard Cleanup', location: 'Ville Saint-Laurent' },
  { id: 3, beforeImage: lawnCareBefore3, afterImage: lawnCareAfter3, category: 'Lawn Care', title: 'Front Lawn Mowing', location: 'Ville Saint-Laurent' },
  { id: 4, beforeImage: hedgingBefore1, afterImage: hedgingAfter1, category: 'Hedging', title: 'Hedge Trimming', location: 'Ville Saint-Laurent' },
  { id: 5, beforeImage: overseedingBefore1, afterImage: overseedingAfter1, category: 'Overseeding', title: 'Lawn Restoration', location: 'Ville Saint-Laurent' },
  { id: 6, beforeImage: windowCleaningBefore1, afterImage: windowCleaningAfter1, category: 'Window Cleaning', title: 'Window Cleaning', location: 'Mont-Royal' },
  { id: 7, beforeImage: windowCleaningBefore2, afterImage: windowCleaningAfter2, category: 'Window Cleaning', title: 'Window Cleaning', location: 'Downtown Montreal' },
  { id: 8, beforeImage: pressureWashingBefore1, afterImage: pressureWashingAfter1, category: 'Pressure Washing', title: 'Patio Pressure Washing', location: 'Westmount' },
  { id: 9, beforeImage: pressureWashingBefore2, afterImage: pressureWashingAfter2, category: 'Pressure Washing', title: 'Walkway Pressure Washing', location: 'Westmount' },
];

function GalleryCard({ item }: { item: typeof galleryItems[0] }) {
  const { t } = useTranslation();
  return (
    <div className="group relative overflow-hidden rounded-sm bg-card h-full">
      <img
        src={item.afterImage}
        alt={`${item.title} - After`}
        loading="lazy"
        className="w-full h-full object-cover aspect-[4/3]"
      />
      <div className="absolute inset-0 bg-[#10221e]/0 group-hover:bg-[#10221e]/70 transition-all duration-300 flex items-end p-6 opacity-0 group-hover:opacity-100">
        <div>
          <span className="text-[#0fbd94] text-xs uppercase tracking-widest font-semibold">
            {t(`gallery.categories.${item.category}`)}
          </span>
          <h3 className="font-display text-white text-lg font-semibold mt-1">{item.title}</h3>
          <p className="text-white/60 text-sm">{item.location}</p>
        </div>
      </div>
    </div>
  );
}

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

  // Split items for asymmetric layout
  const heroItems = visibleItems.slice(0, 3);
  const remainingItems = visibleItems.slice(3);

  return (
    <section className="section-padding bg-[#f6f8f8]">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-secondary text-[#0fbd94] font-display text-sm font-semibold mb-4 uppercase tracking-widest border-b-2 border-[#0fbd94]"
          >
            {t('gallery.badge')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
          >
            {t('gallery.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
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
              className={`px-5 py-2.5 rounded-sm font-display text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#0fbd94] text-white shadow-lg'
                  : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
              }`}
            >
              {t(`gallery.categories.${category}`)}
            </button>
          ))}
        </motion.div>

        {/* Asymmetric editorial layout for first 3 items */}
        {heroItems.length >= 3 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Large item — spans full height left */}
              <motion.div
                key={heroItems[0].id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                layout
                className="md:row-span-2 min-h-[400px] md:min-h-[500px]"
              >
                <div className="group relative overflow-hidden rounded-sm bg-card h-full">
                  <img
                    src={heroItems[0].afterImage}
                    alt={`${heroItems[0].title} - After`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#10221e]/0 group-hover:bg-[#10221e]/70 transition-all duration-300 flex items-end p-6 opacity-0 group-hover:opacity-100">
                    <div>
                      <span className="text-[#0fbd94] text-xs uppercase tracking-widest font-semibold">
                        {t(`gallery.categories.${heroItems[0].category}`)}
                      </span>
                      <h3 className="font-display text-white text-lg font-semibold mt-1">{heroItems[0].title}</h3>
                      <p className="text-white/60 text-sm">{heroItems[0].location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Two stacked items right */}
              {heroItems.slice(1, 3).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index + 1) * 0.1 }}
                  layout
                  className="min-h-[240px]"
                >
                  <div className="group relative overflow-hidden rounded-sm bg-card h-full">
                    <img
                      src={item.afterImage}
                      alt={`${item.title} - After`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[#10221e]/0 group-hover:bg-[#10221e]/70 transition-all duration-300 flex items-end p-6 opacity-0 group-hover:opacity-100">
                      <div>
                        <span className="text-[#0fbd94] text-xs uppercase tracking-widest font-semibold">
                          {t(`gallery.categories.${item.category}`)}
                        </span>
                        <h3 className="font-display text-white text-lg font-semibold mt-1">{item.title}</h3>
                        <p className="text-white/60 text-sm">{item.location}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Remaining items in standard 2-col grid */}
            {remainingItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {remainingItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    layout
                  >
                    <GalleryCard item={item} />
                  </motion.div>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Fallback for fewer than 3 items */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {visibleItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <GalleryCard item={item} />
              </motion.div>
            ))}
          </div>
        )}

        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-10"
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
              className="font-display font-semibold border-stone-300 text-slate-700 rounded-sm hover:bg-stone-100"
            >
              {t('gallery.showMore')}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
