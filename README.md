# # Lucila C Garrison — Elegant Booking Site

This is a fully responsive, dark-mode optimized static site for Lucila C Garrison.  
It includes service pages, booking form, gallery, and geo-aware logic for payment and contact.

---

## 📁 Folder Structure



lucila-site/ ├── index.html          # Home page ├── services.html       # Service menu ├── intimate.html       # Intimate Escape service ├── hookup.html         # Hook Up service ├── content.html        # Content service ├── facetime.html       # Facetime service ├── booking.html        # Booking form ├── styles.css          # Shared stylesheet ├── script.js           # Shared JavaScript logic ├── assets/             # Images folder │   ├── profile.jpg │   ├── gallery1.jpg … gallery6.jpg


---

## 🌐 Live Site

Once deployed via GitHub Pages, the site will be available at:



https://USERNAME.github.io/lucila-site/


Replace `USERNAME` with your GitHub username.

---

## 🚀 Deployment Instructions (Mobile-Friendly)

### ✅ Step-by-step (GitHub Web UI)

1. Login to [GitHub](https://github.com)
2. Create a new **public repository** (e.g. `lucila-site`)
3. Open the repo → **Add file → Upload files**
4. Select all `.html`, `.css`, `.js` files + `assets/` folder with images
5. Write a commit message → **Commit changes**
6. Go to **Settings → Pages**
   - Source: `main` branch
   - Folder: `/ (root)`
   - Save → Site goes live

---

## 🔒 Logic & Features

- ✅ Dark mode always active
- ✅ Floating contact buttons (WhatsApp USA-only, Signal, Kik)
- ✅ Auto currency symbol by country
- ✅ Payment method dropdown filtered by location
- ✅ Booking form with Incall/Outcall selection
- ✅ Modal confirmation (no redirect)
- ✅ Gallery grid on homepage
- ✅ Service menu with direct booking links
- ✅ Outcall price note shown only on Intimate Escape & Hook Up pages

---

## 🛠 Configuration

To customize:

- **Contact links:** Edit `script.js` → `CONFIG.CONTACT.whatsapp`, `signal`, `kik`
- **Formspree endpoint:** Replace `CONFIG.FORMSPREE_ENDPOINT` with your own
- **Images:** Replace files in `assets/` folder
- **Pricing:** Update `data-price` values in service pages

---

## 📌 Notes

- All pages are static HTML
- No backend required
- Form submission handled via Formspree
- Mobile-first layout
- Designed for GitHub Pages, Netlify, Vercel, or any static host

---

## 🤝 Credits

Built by [Lucila C Garrison Team]  
Design, logic, and deployment optimized by Dark



---
