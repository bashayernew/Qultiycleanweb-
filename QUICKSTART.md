# Quality Clean Website - Quick Start Guide

## ✅ Project Complete!

Your bilingual website has been successfully built with:
- **8 HTML pages** (4 English + 4 Arabic)
- **2 CSS files** (main + RTL styles)
- **2 JavaScript files** (functionality + language toggle)
- **Full documentation** (README.md)

---

## 🚀 How to View Your Website (3 Easy Methods)

### Method 1: Simple File Opening (Quickest)
1. Navigate to the `pages` folder
2. Double-click `index.html` for English version
3. Double-click `index-ar.html` for Arabic version
4. ✨ That's it!

### Method 2: Python Local Server (Recommended)
```bash
# Open terminal/command prompt in project folder
python -m http.server 8000

# Then open browser and visit:
# http://localhost:8000/pages/index.html
```

### Method 3: VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click `pages/index.html`
3. Select "Open with Live Server"

---

## 📋 What You Have

### English Pages:
- **Home** (`pages/index.html`) - Hero, values, process, sectors
- **About** (`pages/about.html`) - Company info, team, certifications
- **Services** (`pages/services.html`) - All services with pricing
- **Contact** (`pages/contact.html`) - Form, map, FAQ

### Arabic Pages (RTL):
- **الرئيسية** (`pages/index-ar.html`)
- **من نحن** (`pages/about-ar.html`)
- **الخدمات** (`pages/services-ar.html`)
- **اتصل بنا** (`pages/contact-ar.html`)

---

## 🎨 Features Included

✅ Fully responsive design (mobile, tablet, desktop)
✅ Modern green-white theme matching your branding
✅ Smooth scroll animations (AOS.js)
✅ Language toggle button (EN ⇄ AR)
✅ Mobile hamburger menu
✅ Contact form with validation
✅ Google Maps integration placeholder
✅ FAQ accordion
✅ Animated statistics counters
✅ Team showcase
✅ Services pricing tables
✅ Social media links
✅ SEO optimized

---

## 📝 Next Steps (Customize Your Site)

### 1. Add Your Images (Priority!)
Place these images in the `images/` folder:

**Essential Images:**
- `logo.png` - Your company logo (200x60px recommended)
- `favicon.png` - Browser tab icon (32x32px)
- `hero-bg.jpg` - Homepage hero background
- `safety.jpg` - Safety section image

**Service Images:**
- `commercial.jpg` - Commercial cleaning
- `industrial.jpg` - Industrial cleaning
- `specialized.jpg` - Specialized services
- `maintenance.jpg` - Maintenance services

**About Page:**
- `about-intro.jpg` - About page intro image
- `team-1.jpg` to `team-4.jpg` - Team member photos

**Other:**
- `qr-code.png` - QR code for contact section

### 2. Update Contact Information
Search and replace in ALL files:
- `+123 456 7890` → Your phone number
- `info@qualityclean.com` → Your email
- `123 Clean Street, City, Country` → Your address

### 3. Update Google Maps
In `contact.html` and `contact-ar.html`:
1. Go to Google Maps → Find your location
2. Click Share → Embed a map
3. Copy the iframe code
4. Replace the existing iframe code in the map section

### 4. Update Social Media Links
In the footer of all pages, update:
- Facebook link
- Instagram link
- LinkedIn link
- Twitter/X link
- WhatsApp number

### 5. Customize Colors (Optional)
Edit `css/style.css` - lines 10-15:
```css
--primary-green: #2ecc71;  /* Your primary color */
--dark-green: #27ae60;     /* Darker shade */
```

---

## 🧪 Testing Checklist

Before going live, test these:

- [ ] All internal links work correctly
- [ ] Language toggle switches between EN and AR
- [ ] Mobile menu opens and closes properly
- [ ] Contact form validation works
- [ ] All images load (after you add them)
- [ ] Google Maps shows your location
- [ ] Social media links point to your profiles
- [ ] Test on mobile devices
- [ ] Test on different browsers

---

## 📞 Need Help?

### Common Issues:

**Q: Images not showing?**
A: Make sure image files are in the `images/` folder with correct names.

**Q: Language toggle not working?**
A: Ensure both HTML files are in the same `pages/` folder.

**Q: Styles look broken?**
A: Check that CSS files are in the `css/` folder and paths are correct.

**Q: Map not loading?**
A: Update the Google Maps embed code with your location.

---

## 🌐 Ready to Deploy?

### Free Hosting Options:
1. **GitHub Pages** - Free, easy setup
2. **Netlify** - Free with custom domain
3. **Vercel** - Free, automatic deployments
4. **Traditional Hosting** - cPanel/FTP upload

---

## 🎯 Current Status

```
✅ Project Structure Created
✅ All HTML Pages Built (8 pages)
✅ Responsive CSS Implemented
✅ JavaScript Functionality Added
✅ Bilingual Support (EN + AR)
✅ RTL Layout for Arabic
✅ Animations Integrated
✅ Forms with Validation
✅ Documentation Complete

🔲 Add Your Images
🔲 Update Contact Info
🔲 Customize Content
🔲 Test Thoroughly
🔲 Deploy Online
```

---

## 📚 File Reference

```
Qulitycleanweb/
├── pages/           → All HTML pages
├── css/             → Stylesheets
├── js/              → JavaScript files
├── images/          → Add your images here!
├── README.md        → Full documentation
├── QUICKSTART.md    → This file
└── .gitignore       → Git ignore file
```

---

## 💡 Pro Tips

1. **Before editing**: Make a backup copy of the entire folder
2. **Test locally**: Always test changes before deploying
3. **Use placeholder images**: Until you have real images, placeholders will show
4. **Check console**: Press F12 in browser to check for errors
5. **Mobile first**: Always test mobile view first

---

## 🎨 Design Specifications

**Colors:**
- Primary: #2ecc71 (Green)
- Secondary: #27ae60 (Dark Green)
- Background: #ffffff (White)
- Accent: #a8e6cf (Light Green)

**Fonts:**
- English: Poppins (Google Fonts)
- Arabic: Cairo (Google Fonts)

**Responsive Breakpoints:**
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

---

## 📖 Learn More

For detailed information, see `README.md`

**Support:**
- 📧 Email: info@qualityclean.com
- 📞 Phone: +123 456 7890

---

**Built with ❤️ for Quality Clean**

*Last Updated: October 12, 2025*

