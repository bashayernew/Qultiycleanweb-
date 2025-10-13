// Quality Clean Website - Main JavaScript

// ========================================
// Initialize AOS (Animate On Scroll)
// ========================================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-in-out'
});

// ========================================
// Mobile Navigation Toggle
// ========================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navToggle) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// ========================================
// Header Scroll Effect
// ========================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hash or just #
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

        if (correspondingLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                correspondingLink.classList.add('active');
            } else {
                correspondingLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========================================
// Animated Counter for Numbers
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter animation when element is in viewport
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with counter class
document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
});

// ========================================
// Form Validation (for contact form)
// ========================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form fields
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        
        // Reset previous error states
        [name, email, phone, message].forEach(field => {
            if (field) field.classList.remove('error');
        });
        
        let isValid = true;
        
        // Validate name
        if (name && name.value.trim() === '') {
            showError(name, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        if (email) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() === '') {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!emailPattern.test(email.value)) {
                showError(email, 'Please enter a valid email');
                isValid = false;
            }
        }
        
        // Validate phone (optional but should be valid if provided)
        if (phone && phone.value.trim() !== '') {
            const phonePattern = /^[\d\s\-\+\(\)]+$/;
            if (!phonePattern.test(phone.value)) {
                showError(phone, 'Please enter a valid phone number');
                isValid = false;
            }
        }
        
        // Validate message
        if (message && message.value.trim() === '') {
            showError(message, 'Please enter your message');
            isValid = false;
        }
        
        // If form is valid, show success message
        if (isValid) {
            showSuccessMessage();
            contactForm.reset();
        }
    });
}

function showError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message if any
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create and insert error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 6L9 17l-5-5"></path>
        </svg>
        <span>Thank you! Your message has been sent successfully.</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ========================================
// Lazy Loading Images
// ========================================
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
            }
            
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// ========================================
// Back to Top Button
// ========================================
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// Parallax Effect for Hero Section
// ========================================
const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ========================================
// Preloader (optional)
// ========================================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ========================================
// Print Console Message
// ========================================
console.log('%c Quality Clean Website ', 'background: #2ecc71; color: #fff; padding: 10px; font-size: 16px; font-weight: bold;');
console.log('%c Developed with ❤️ ', 'background: #27ae60; color: #fff; padding: 5px; font-size: 12px;');

