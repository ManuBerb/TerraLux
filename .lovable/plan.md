

## Plan: Update Lucide Icon Assignments

### Changes

**`src/pages/Services.tsx`**
- Update imports: replace `Droplets` with `Layers, Grid3x3, Zap`
- Update icon assignments in `serviceKeys` array:
  - `lawnMowing` → `Leaf` (already correct)
  - `overseeding` → `Sprout` (already correct)
  - `flowerBeds` → `Flower2` (already correct)
  - `mulchBeds` → `Layers` (was `TreeDeciduous`)
  - `sodInstallation` → `Grid3x3` (was `Droplets`)
  - `leafRemoval` → `Leaf` (already correct)
  - `hedging` → `TreeDeciduous` (already correct)
  - `windowCleaning` → `Sparkles` (already correct)
  - `pressureWashing` → `Zap` (was `Droplets`)

**`src/components/home/ServicesSection.tsx`**
- Update imports: replace `Droplets` with `Layers, Grid3x3, Zap` (keep only icons used by the 3 services shown here)
- Update icon assignments:
  - `lawnMowing` → `Leaf` (already correct)
  - `leafRemoval` → `Leaf` (was `TreeDeciduous`)
  - `sodInstallation` → `Grid3x3` (was `Droplets`)

No layout, color, text, or logic changes.

