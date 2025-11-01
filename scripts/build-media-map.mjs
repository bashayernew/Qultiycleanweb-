#!/usr/bin/env node

import { readdir, writeFile } from 'fs/promises';
import { join, extname } from 'path';

const IMAGES_DIR = './images';
const OUTPUT_FILE = './js/services-media.json';

// Service keyword mappings (order matters - most specific first)
const SERVICE_KEYWORDS = {
  'dry-ice': ['dry-ice', 'dryice', 'ice'],
  'vapor': ['vapor', 'steam', 'mist'],
  'soda': ['soda', 'bicarbonate', 'nahco3'],
  'laser': ['laser'],
  'glass-bead': ['glassbead', 'glass-bead', 'bead'],
  'abrasive': ['abrasive', 'garnet', 'sandblast', 'sand']
};

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

// Generate alt text and captions
function generateContent(filename, serviceSlug) {
  const baseName = filename.replace(/\.[^/.]+$/, '').toLowerCase();
  
  const contentMap = {
    'dry-ice': {
      alt_en: `Dry ice blasting equipment and process images`,
      alt_ar: `صور معدات وعملية التنظيف بالثلج الجاف`,
      caption_en: `Eco-friendly dry ice cleaning removes contaminants without residue`,
      caption_ar: `تنظيف بالثلج الجاف صديق للبيئة يزيل الملوثات دون مخلفات`
    },
    'vapor': {
      alt_en: `Steam and vapor cleaning technology`,
      alt_ar: `تكنولوجيا التنظيف بالبخار والضباب`,
      caption_en: `High-temperature steam cleaning for deep sanitization`,
      caption_ar: `تنظيف بالبخار عالي الحرارة للتعقيم العميق`
    },
    'soda': {
      alt_en: `Soda blasting equipment and applications`,
      alt_ar: `معدات وتطبيقات التنظيف ببيكربونات الصوديوم`,
      caption_en: `Gentle soda blasting for delicate surfaces`,
      caption_ar: `التنظيف ببيكربونات الصوديوم اللطيف للأسطح الحساسة`
    },
    'laser': {
      alt_en: `Laser cleaning technology and equipment`,
      alt_ar: `تكنولوجيا ومعدات التنظيف بالليزر`,
      caption_en: `Precision laser cleaning for detailed work`,
      caption_ar: `تنظيف بالليزر دقيق للأعمال التفصيلية`
    },
    'glass-bead': {
      alt_en: `Glass bead blasting equipment and results`,
      alt_ar: `معدات ونتائج التنظيف بالخرز الزجاجي`,
      caption_en: `Glass bead blasting creates smooth, uniform finishes`,
      caption_ar: `التنظيف بالخرز الزجاجي ينتج أسطح ناعمة ومتسقة`
    },
    'abrasive': {
      alt_en: `Abrasive blasting equipment and applications`,
      alt_ar: `معدات وتطبيقات التنظيف بالرمل`,
      caption_en: `Powerful abrasive blasting for tough cleaning jobs`,
      caption_ar: `التنظيف بالرمل القوي للمهام التنظيفية الصعبة`
    }
  };

  // Try to generate more specific content from filename
  let specificAlt = '';
  let specificCaption = '';
  
  if (baseName.includes('equipment') || baseName.includes('machine') || baseName.includes('unit')) {
    specificAlt = `Professional ${serviceSlug.replace('-', ' ')} cleaning equipment`;
    specificCaption = `Industrial-grade ${serviceSlug.replace('-', ' ')} blasting equipment`;
  } else if (baseName.includes('process') || baseName.includes('cleaning') || baseName.includes('work')) {
    specificAlt = `${serviceSlug.replace('-', ' ')} cleaning process in action`;
    specificCaption = `Professional ${serviceSlug.replace('-', ' ')} cleaning service`;
  } else if (baseName.includes('before') || baseName.includes('after') || baseName.includes('result')) {
    specificAlt = `Before and after results of ${serviceSlug.replace('-', ' ')} cleaning`;
    specificCaption = `Transformation achieved with ${serviceSlug.replace('-', ' ')} blasting`;
  }

  const content = contentMap[serviceSlug];
  
  return {
    alt_en: specificAlt || content.alt_en,
    alt_ar: specificAlt ? generateArabicAlt(specificAlt, serviceSlug) : content.alt_ar,
    caption_en: specificCaption || content.caption_en,
    caption_ar: specificCaption ? generateArabicCaption(specificCaption, serviceSlug) : content.caption_ar
  };
}

function generateArabicAlt(englishText, serviceSlug) {
  const translations = {
    'dry-ice': 'معدات تنظيف احترافية بالثلج الجاف',
    'vapor': 'معدات تنظيف احترافية بالبخار',
    'soda': 'معدات تنظيف احترافية ببيكربونات الصوديوم',
    'laser': 'معدات تنظيف احترافية بالليزر',
    'glass-bead': 'معدات تنظيف احترافية بالخرز الزجاجي',
    'abrasive': 'معدات تنظيف احترافية كاشطة'
  };
  return translations[serviceSlug] || englishText;
}

function generateArabicCaption(englishText, serviceSlug) {
  const translations = {
    'dry-ice': 'خدمة تنظيف احترافية بالثلج الجاف',
    'vapor': 'خدمة تنظيف احترافية بالبخار',
    'soda': 'خدمة تنظيف احترافية ببيكربونات الصوديوم',
    'laser': 'خدمة تنظيف احترافية بالليزر',
    'glass-bead': 'خدمة تنظيف احترافية بالخرز الزجاجي',
    'abrasive': 'خدمة تنظيف احترافية كاشطة'
  };
  return translations[serviceSlug] || englishText;
}

// Match filename to service slug
function matchService(filename) {
  const lowerFilename = filename.toLowerCase();
  
  // Check each service in order (most specific first)
  for (const [slug, keywords] of Object.entries(SERVICE_KEYWORDS)) {
    if (keywords.some(keyword => lowerFilename.includes(keyword))) {
      return slug;
    }
  }
  
  return null;
}

// Main function
async function buildMediaMap() {
  try {
    console.log('🔍 Scanning images directory...');
    
    const files = await readdir(IMAGES_DIR);
    const mediaItems = [];
    const unmatchedFiles = [];
    
    for (const file of files) {
      const ext = extname(file).toLowerCase();
      
      // Skip non-image files
      if (!IMAGE_EXTENSIONS.includes(ext)) {
        continue;
      }
      
      // Match service
      const serviceSlug = matchService(file);
      
      if (serviceSlug) {
        const content = generateContent(file, serviceSlug);
        
        mediaItems.push({
          service: serviceSlug,
          src: `/images/${file}`,
          alt_en: content.alt_en,
          alt_ar: content.alt_ar,
          caption_en: content.caption_en,
          caption_ar: content.caption_ar
        });
        
        console.log(`✅ ${file} → ${serviceSlug}`);
      } else {
        unmatchedFiles.push(file);
        console.log(`⚠️  ${file} → No service match`);
      }
    }
    
    // Write JSON file
    await writeFile(OUTPUT_FILE, JSON.stringify(mediaItems, null, 2));
    
    console.log(`\n📊 Results:`);
    console.log(`   • Matched images: ${mediaItems.length}`);
    console.log(`   • Unmatched files: ${unmatchedFiles.length}`);
    console.log(`   • Output: ${OUTPUT_FILE}`);
    
    if (unmatchedFiles.length > 0) {
      console.log(`\n⚠️  Unmatched files (will be ignored):`);
      unmatchedFiles.forEach(file => console.log(`   • ${file}`));
    }
    
    // Group by service
    const byService = {};
    mediaItems.forEach(item => {
      if (!byService[item.service]) {
        byService[item.service] = [];
      }
      byService[item.service].push(item);
    });
    
    console.log(`\n📋 Service breakdown:`);
    Object.entries(byService).forEach(([service, items]) => {
      console.log(`   • ${service}: ${items.length} images`);
    });
    
  } catch (error) {
    console.error('❌ Error building media map:', error);
    process.exit(1);
  }
}

// Run the script
buildMediaMap();
