# Quality Clean Website - Media Gallery System

## Overview
This project implements a dynamic media gallery system for cleaning technique services with automatic image categorization and bilingual support.

## Features
- **Automatic Image Categorization**: Scans `/images` folder and categorizes images by service type
- **Bilingual Support**: English and Arabic content with proper RTL layout
- **Responsive Galleries**: 3-column desktop, 2-column tablet, 1-column mobile
- **Lazy Loading**: Optimized image loading for performance
- **SEO Optimized**: Proper alt tags and structured data

## Services Supported
1. **Dry Ice Blasting** (`dry-ice`)
2. **Steam/Vapor Cleaning** (`vapor`)
3. **Soda Blasting** (`soda`)
4. **Laser Cleaning** (`laser`)
5. **Glass Bead Blasting** (`glass-bead`)
6. **Abrasive Blasting** (`abrasive`)

## Quick Start

### 1. Build Media Map
```bash
node ./scripts/build-media-map.mjs
```

### 2. View Results
Open any of the service pages to see the galleries in action:
- `/pages/services/dry-ice.html` (English)
- `/pages/services-ar/dry-ice.html` (Arabic)

## File Structure
```
├── scripts/
│   └── build-media-map.mjs    # Image categorization script
├── js/
│   ├── services-media.json    # Generated media data
│   └── services-gallery.js    # Gallery rendering system
├── css/
│   ├── services.css           # Gallery styles
│   └── services-ar.css        # Arabic RTL overrides
└── pages/
    ├── services/
    │   └── dry-ice.html       # English service pages
    └── services-ar/
        └── dry-ice.html       # Arabic service pages
```

## Image Naming Convention
Images are automatically categorized based on filename keywords:

### Dry Ice Blasting
- Keywords: `dry-ice`, `dryice`, `ice`
- Examples: `dry-ice-unit.jpg`, `dryice-blasting.png`

### Steam/Vapor Cleaning
- Keywords: `vapor`, `steam`, `mist`
- Examples: `steam-cleaning.jpg`, `vapor-unit.png`

### Soda Blasting
- Keywords: `soda`, `bicarbonate`, `nahco3`
- Examples: `soda-blasting.jpg`, `bicarbonate-cleaning.png`

### Laser Cleaning
- Keywords: `laser`
- Examples: `laser-cleaning.jpg`, `laser-unit.png`

### Glass Bead Blasting
- Keywords: `glassbead`, `glass-bead`, `bead`
- Examples: `glass-bead-blasting.jpg`, `glassbead-unit.png`

### Abrasive Blasting
- Keywords: `abrasive`, `garnet`, `sandblast`, `sand`
- Examples: `abrasive-blasting.jpg`, `garnet-cleaning.png`

## Supported Image Formats
- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.avif`

## Usage

### Adding New Images
1. Add images to `/images` folder with appropriate keywords in filename
2. Run `node ./scripts/build-media-map.mjs`
3. Refresh service pages to see new images

### Creating New Service Pages
1. Copy existing service page template
2. Update service slug in `data-gallery` attribute
3. Update page content and metadata
4. Ensure images exist for the service

### Gallery Integration
Add this HTML to any page:
```html
<section id="gallery" data-gallery="dry-ice"></section>
<script type="module" src="../js/services-gallery.js"></script>
```

## API Reference

### loadServiceMedia(slug, lang)
Returns array of media objects for a specific service.
```javascript
import { loadServiceMedia } from './services-gallery.js';
const media = await loadServiceMedia('dry-ice', 'en');
```

### renderGallery(container, slug, lang)
Renders gallery into specified container.
```javascript
import { renderGallery } from './services-gallery.js';
await renderGallery(document.getElementById('gallery'), 'dry-ice', 'ar');
```

### getServiceThumbnail(slug, lang)
Returns URL of first image for service thumbnail.
```javascript
import { getServiceThumbnail } from './services-gallery.js';
const thumbnail = await getServiceThumbnail('dry-ice', 'en');
```

## Troubleshooting

### No Images Showing
1. Check if `services-media.json` exists
2. Verify image filenames contain correct keywords
3. Run build script: `node ./scripts/build-media-map.mjs`

### Gallery Not Loading
1. Ensure `services-gallery.js` is imported as module
2. Check browser console for errors
3. Verify `data-gallery` attribute is set correctly

### RTL Layout Issues
1. Ensure `dir="rtl"` is set on HTML element
2. Check that `services-ar.css` is loaded
3. Verify Arabic font (Cairo) is loaded

## Performance Notes
- Images are lazy-loaded for better performance
- Gallery uses CSS Grid for responsive layout
- Alt text is generated automatically for SEO
- Aspect ratio is maintained to prevent layout shift

## Browser Support
- Modern browsers with ES6 module support
- CSS Grid support required
- Lazy loading fallback for older browsers