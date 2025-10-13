/**
 * Services Gallery System
 * Handles dynamic loading and rendering of service-specific image galleries
 */

let servicesMedia = null;

// Load services media data
async function loadServicesMedia() {
  if (servicesMedia) return servicesMedia;
  
  try {
    const response = await fetch('/js/services-media.json');
    if (!response.ok) {
      throw new Error(`Failed to load services media: ${response.status}`);
    }
    servicesMedia = await response.json();
    return servicesMedia;
  } catch (error) {
    console.warn('⚠️ Could not load services-media.json:', error);
    return [];
  }
}

// Load media for a specific service
export async function loadServiceMedia(slug, lang = 'en') {
  const media = await loadServicesMedia();
  return media.filter(item => item.service === slug);
}

// Render gallery into a container
export async function renderGallery(container, slug, lang = 'en') {
  const media = await loadServiceMedia(slug, lang);
  
  if (media.length === 0) {
    renderEmptyState(container, lang);
    return;
  }
  
  const galleryHTML = media.map(item => `
    <figure class="gallery-item">
      <img 
        src="${item.src}" 
        alt="${lang === 'ar' ? item.alt_ar : item.alt_en}"
        loading="lazy"
        width="400"
        height="225"
      />
      <figcaption>${lang === 'ar' ? item.caption_ar : item.caption_en}</figcaption>
    </figure>
  `).join('');
  
  container.innerHTML = `
    <div class="gallery">
      ${galleryHTML}
    </div>
  `;
}

// Render empty state
function renderEmptyState(container, lang) {
  const emptyText = lang === 'ar' ? 
    'لا توجد صور متاحة حالياً لهذه الخدمة' : 
    'No images available for this service at the moment';
    
  container.innerHTML = `
    <div class="gallery-empty">
      <div class="empty-icon">📸</div>
      <p>${emptyText}</p>
    </div>
  `;
}

// Get first image for a service (for thumbnails)
export async function getServiceThumbnail(slug, lang = 'en') {
  const media = await loadServiceMedia(slug, lang);
  return media.length > 0 ? media[0].src : '/images/placeholder.webp';
}

// Initialize galleries on page load
export function initializeGalleries() {
  // Find all gallery containers
  const galleryContainers = document.querySelectorAll('[data-gallery]');
  
  galleryContainers.forEach(container => {
    const slug = container.dataset.gallery;
    const lang = document.documentElement.lang || 'en';
    
    renderGallery(container, slug, lang);
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeGalleries);
} else {
  initializeGalleries();
}
