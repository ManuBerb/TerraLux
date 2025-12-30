import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import lawnCareBefore1 from '@/assets/gallery/lawn-care-before-1.jpg';
import lawnCareAfter1 from '@/assets/gallery/lawn-care-after-1.jpg';
import hedgingBefore1 from '@/assets/gallery/hedging-before-1.jpg';
import hedgingAfter1 from '@/assets/gallery/hedging-after-1.jpg';
import overseedingBefore1 from '@/assets/gallery/overseeding-before-1.jpg';
import overseedingAfter1 from '@/assets/gallery/overseeding-after-1.jpg';

const featuredProjects = [
  {
    id: 1,
    beforeImage: lawnCareBefore1,
    afterImage: lawnCareAfter1,
    title: 'Front Yard Transformation',
    category: 'Lawn Care',
  },
  {
    id: 2,
    beforeImage: hedgingBefore1,
    afterImage: hedgingAfter1,
    title: 'Hedge Trimming',
    category: 'Hedging',
  },
  {
    id: 3,
    beforeImage: overseedingBefore1,
    afterImage: overseedingAfter1,
    title: 'Lawn Restoration',
    category: 'Overseeding',
  },
];

export function FeaturedProjectsSection() {
  return (
    <section className="py-12 bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <Star className="w-5 h-5 text-primary fill-primary" />
          <span className="font-display text-lg font-semibold text-foreground">
            Featured Transformations
          </span>
          <Star className="w-5 h-5 text-primary fill-primary" />
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative rounded-xl overflow-hidden shadow-md bg-card cursor-pointer"
            >
              {/* Before/After Side by Side */}
              <div className="grid grid-cols-2">
                <div className="relative aspect-[3/2]">
                  <img
                    src={project.beforeImage}
                    alt={`${project.title} - Before`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-destructive/90 text-destructive-foreground text-[10px] font-semibold rounded">
                    Before
                  </span>
                </div>
                <div className="relative aspect-[3/2]">
                  <img
                    src={project.afterImage}
                    alt={`${project.title} - After`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-primary/90 text-primary-foreground text-[10px] font-semibold rounded">
                    After
                  </span>
                </div>
              </div>
              
              {/* Overlay Info */}
              <div className="p-3 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-semibold text-foreground truncate">
                    {project.title}
                  </span>
                  <span className="text-xs text-muted-foreground px-2 py-0.5 bg-secondary rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
