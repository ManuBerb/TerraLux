

## Testimonials Section: Mobile Carousel

Convert the 6-card grid into a carousel that shows 3 cards at a time, with navigation arrows to reveal the next 3.

### Approach
- On **mobile/tablet** (below `lg`): Show a carousel using the existing Embla-based `Carousel` component, displaying 1 card per slide with dot indicators and arrow buttons
- On **desktop** (`lg`+): Keep the current 3-column grid, but only show 3 cards initially with a "Show more" or arrow button to reveal the next 3

**Alternative (simpler):** Use the carousel on all screen sizes — show 3 cards per view on desktop, 1 per view on mobile, with left/right arrow navigation.

### Implementation Steps

1. **`src/components/home/TestimonialsSection.tsx`**:
   - Replace the static grid with the `Carousel`, `CarouselContent`, `CarouselItem`, `CarouselPrevious`, `CarouselNext` components
   - On mobile: 1 card per slide, 6 slides total, arrow buttons to navigate
   - On desktop (`lg`+): 3 cards visible per slide (2 groups of 3), arrow buttons
   - Add dot indicators below to show current position
   - Keep the rating summary bar at the bottom unchanged

No translation or other file changes needed.

