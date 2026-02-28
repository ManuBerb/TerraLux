

## Update "Complete Outdoor Care" Section

### 1. `src/components/home/ServicesSection.tsx`
Replace the `serviceKeys` array with only 3 services:
- `lawnMowing` (Leaf icon, featured, spring/summer/fall)
- `leafRemoval` (Leaf icon, not featured, fall)
- `sodInstallation` (Droplets icon, not featured, spring/fall)

Need a different icon for leafRemoval to avoid duplicate — use `TreeDeciduous` or keep `Leaf` but differentiate visually.

### 2. `src/i18n/en.json`
Add `services.leafRemoval` entry with title, description, and features:
```json
"leafRemoval": {
  "title": "Leaf Removal & Raking",
  "description": "Keep your property clean and your lawn healthy with professional leaf removal during the fall season.",
  "features": ["Complete lawn clearing", "Bed & surface cleanup", "Debris hauled away"]
}
```

### 3. `src/i18n/fr.json`
Add `services.leafRemoval` entry:
```json
"leafRemoval": {
  "title": "Ramassage de feuilles",
  "description": "Gardez votre propriété propre et votre pelouse en santé avec notre service professionnel de ramassage de feuilles en automne.",
  "features": ["Nettoyage complet de la pelouse", "Plates-bandes et surfaces", "Débris ramassés"]
}
```

### Summary
- Remove overseeding, flowerBeds, mulchBeds, windowPressure from the homepage cards
- Add leafRemoval card entry to both translation files
- Keep "View All Services" button unchanged

