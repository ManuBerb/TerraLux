

## Brand Identity Integration Plan

### Approach: SVG Logo Component + Image Favicon

Rather than embedding raster PNG images (which can look blurry at different sizes and have background issues on dark footers), I will:

1. **Recreate the logo as an inline SVG React component** based on the uploaded design -- three stacked chevrons (sage green, gray-green, dark slate) with "Terralux" text. This gives pixel-perfect rendering at any size, works on both light and dark backgrounds, and scales perfectly for mobile.

2. **Use the icon-only upload as the favicon** (PNG is fine for favicons).

### Files to Create/Modify

| File | Change |
|------|--------|
| `src/components/TerraluxLogo.tsx` | **New** -- SVG logo component with `size` and `variant` props (full with text, icon-only) |
| `public/favicon.png` | **New** -- Copy icon-only upload |
| `index.html` | Add favicon `<link>` tag |
| `src/components/layout/Header.tsx` | Replace text logo with `<TerraluxLogo />` component, sized ~180px desktop / ~140px mobile |
| `src/components/layout/Footer.tsx` | Replace text logo with `<TerraluxLogo />` component with light color variant for dark background |
| `src/index.css` | Update color palette to match logo: sage green primary (`145 25% 52%`), slate/charcoal grays for text and secondary elements |
| `src/components/ui/button.tsx` | Update CTA/hero button variants to use new sage green tones instead of bright lime |

### Color Palette Update

Derived from the logo's three chevron layers:

| Element | Token | New HSL Value |
|---------|-------|--------------|
| Top chevron (sage green) | `--primary`, `--lime` | `145 30% 50%` |
| Mid chevron (muted green) | `--forest` | `160 15% 42%` |
| Bottom chevron (dark slate) | `--charcoal` | `200 12% 25%` |
| Text (near-black) | `--foreground` | `210 10% 18%` |
| CTA glow | `--shadow-glow` | Updated to sage green hue |
| Gradients | `--gradient-cta`, `--gradient-hero` | Shifted from lime to sage green |

### SVG Logo Component

The component will accept:
- `variant`: `"full"` (chevrons + text) or `"icon"` (chevrons only)
- `className`: for sizing via Tailwind
- `light`: boolean for white text on dark backgrounds (footer)

### Favicon

Copy `user-uploads://Gemini_Generated_Image_ppbgq6ppbgq6ppbg.png` (icon-only) to `public/favicon.png` and add the appropriate `<link>` in `index.html`.

### Benefits of SVG Approach
- Crisp at any resolution (retina, mobile, desktop)
- No background color issues on the dark footer
- Text color can adapt (dark on light header, white on dark footer)
- Tiny file size compared to PNG
- Perfectly matches the uploaded design

