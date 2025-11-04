// Quality Clean Website - Language Toggle

// ========================================
// Language Switching (robust for extensionless URLs)
// ========================================

function getCurrentPageInfo() {
    let page = window.location.pathname.split('/').pop() || 'index.html';
    // strip query/hash
    page = page.split('?')[0].split('#')[0];
    // remove .html if present → supports extensionless routing
    let name = page.endsWith('.html') ? page.slice(0, -5) : page; // e.g. "about", "about-ar", "index"
    if (name === '' || name === '/') name = 'index';
    const isArabic = name.endsWith('-ar');
    const slug = isArabic ? name.slice(0, -3) : name; // remove "-ar"
    return { slug: slug || 'index', isArabic };
}

function switchLanguage(lang) {
    try {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        // Remove query and hash
        const pageName = currentPage.split('?')[0].split('#')[0];
        
        let targetPage;
        
        if (lang === 'ar') {
            // Switch to Arabic version
            if (pageName === 'index.html') {
                targetPage = 'index-ar.html';
            } else if (pageName.endsWith('-ar.html')) {
                // Already Arabic, do nothing
                console.log('Already on Arabic page');
                return;
            } else {
                // Replace .html with -ar.html for other pages
                targetPage = pageName.replace('.html', '-ar.html');
            }
        } else {
            // Switch to English version
            if (pageName === 'index-ar.html') {
                targetPage = 'index.html';
            } else if (!pageName.includes('-ar')) {
                // Already English, do nothing
                console.log('Already on English page');
                return;
            } else {
                // Replace -ar.html with .html
                targetPage = pageName.replace('-ar.html', '.html');
            }
        }
        
        // Navigate to target page
        console.log('Switching language:', lang, 'to page:', targetPage);
        window.location.href = targetPage;
    } catch (error) {
        console.error('Error switching language:', error);
        // Fallback: manually construct the path
        const currentPage = window.location.pathname;
        if (lang === 'ar') {
            if (currentPage.includes('index.html') && !currentPage.includes('index-ar.html')) {
                window.location.href = 'index-ar.html';
            } else if (currentPage.includes('about.html')) {
                window.location.href = 'about-ar.html';
            } else if (currentPage.includes('services.html')) {
                window.location.href = 'services-ar.html';
            } else if (currentPage.includes('contact.html')) {
                window.location.href = 'contact-ar.html';
            } else if (currentPage.includes('cleaning-types.html')) {
                window.location.href = 'cleaning-types-ar.html';
            }
        }
    }
}

// ========================================
// Detect Current Language and Update UI
// ========================================

function detectLanguage() {
    return getCurrentPageInfo().isArabic ? 'ar' : 'en';
}

// Update language button text based on current language
function updateLanguageButton() {
    const langBtn = document.querySelector('.lang-btn');
    const currentLang = detectLanguage();
    
    if (langBtn) {
        if (currentLang === 'ar') {
            langBtn.textContent = 'English';
            langBtn.onclick = () => switchLanguage('en');
        } else {
            langBtn.textContent = 'العربية';
            langBtn.onclick = () => switchLanguage('ar');
        }
    }
}

// ========================================
// Store Language Preference in LocalStorage
// ========================================

function saveLanguagePreference(lang) {
    localStorage.setItem('preferredLanguage', lang);
}

function getLanguagePreference() {
    return localStorage.getItem('preferredLanguage') || 'en';
}

// Auto-redirect to preferred language on first load
function applyLanguagePreference() {
    const currentLang = detectLanguage();
    const preferredLang = getLanguagePreference();
    
    // Only auto-redirect if on homepage and language doesn't match preference
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' && preferredLang === 'ar') {
        window.location.href = 'index-ar.html';
    } else if (currentPage === 'index-ar.html' && preferredLang === 'en') {
        window.location.href = 'index.html';
    }
}

// ========================================
// Enhanced switchLanguage with localStorage
// ========================================

function switchLanguageWithPreference(lang) {
    saveLanguagePreference(lang);
    switchLanguage(lang);
}

// Update the onclick handlers to use the enhanced function
window.addEventListener('DOMContentLoaded', () => {
    updateLanguageButton();
    
    // Update all language buttons to save preference
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        const originalOnclick = btn.onclick;
        btn.onclick = function() {
            const targetLang = detectLanguage() === 'ar' ? 'en' : 'ar';
            switchLanguageWithPreference(targetLang);
        };
    });
});

// ========================================
// RTL/LTR Helper Functions
// ========================================

function setDirection(lang) {
    const html = document.documentElement;
    
    if (lang === 'ar') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
    }
}

// Apply correct direction on page load
window.addEventListener('DOMContentLoaded', () => {
    const currentLang = detectLanguage();
    setDirection(currentLang);
    
    // Force RTL/LTR based on detected language
    const html = document.documentElement;
    if (currentLang === 'ar') {
        html.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        // Ensure UTF-8 encoding
        document.charset = 'UTF-8';
    } else {
        html.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        document.charset = 'UTF-8';
    }
});

// ========================================
// Keyboard Shortcut for Language Toggle
// ========================================

document.addEventListener('keydown', (e) => {
    // Alt + L to toggle language
    if (e.altKey && e.key === 'l') {
        e.preventDefault();
        const currentLang = detectLanguage();
        const targetLang = currentLang === 'ar' ? 'en' : 'ar';
        switchLanguageWithPreference(targetLang);
    }
});

// ========================================
// Language Selector Dropdown (Alternative UI)
// ========================================

function createLanguageDropdown() {
    const langSwitch = document.querySelector('.lang-switch');
    
    if (!langSwitch || langSwitch.querySelector('.lang-dropdown')) {
        return; // Already exists or not needed
    }
    
    const currentLang = detectLanguage();
    
    const dropdown = document.createElement('div');
    dropdown.className = 'lang-dropdown';
    dropdown.innerHTML = `
        <button class="lang-dropdown-btn">
            <span class="flag">${currentLang === 'ar' ? '🇸🇦' : '🇬🇧'}</span>
            <span>${currentLang === 'ar' ? 'العربية' : 'English'}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </button>
        <div class="lang-dropdown-menu">
            <a href="#" class="lang-option" data-lang="en">
                <span class="flag">🇬🇧</span>
                <span>English</span>
            </a>
            <a href="#" class="lang-option" data-lang="ar">
                <span class="flag">🇸🇦</span>
                <span>العربية</span>
            </a>
        </div>
    `;
    
    // Toggle dropdown
    const dropdownBtn = dropdown.querySelector('.lang-dropdown-btn');
    const dropdownMenu = dropdown.querySelector('.lang-dropdown-menu');
    
    dropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        dropdown.classList.remove('active');
    });
    
    // Handle language selection
    dropdown.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const targetLang = option.getAttribute('data-lang');
            switchLanguageWithPreference(targetLang);
        });
    });
    
    langSwitch.appendChild(dropdown);
}

// ========================================
// Initialize on Page Load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Uncomment the line below if you want auto-redirect based on saved preference
    // applyLanguagePreference();
    
    // Update button text based on current language
    updateLanguageButton();
});

// ========================================
// Export functions for use in other scripts
// ========================================

window.LanguageToggle = {
    switch: switchLanguageWithPreference,
    detect: detectLanguage,
    savePreference: saveLanguagePreference,
    getPreference: getLanguagePreference
};

// Make switchLanguage globally available
window.switchLanguage = switchLanguage;

