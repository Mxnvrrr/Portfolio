# Manveer Singh — Personal Portfolio Website

A modern, premium, dark-mode personal portfolio website crafted for **Manveer Singh** (B.Tech Computer Science - Artificial Intelligence student at IITM Janakpuri, Class Representative, and PR / Partnerships Strategist).

---

## 🌟 Key Features

- **Strict CV Fidelity:** Every qualification, role, metric, organization, and skill is grounded in Manveer's actual CV (no invented titles or fabricated statistics).
- **Aesthetic Design System:** Obsidian dark mode (`#090c15`) with electric indigo and cyan lighting accents, glassmorphic cards, and subtle animated ambient orbs.
- **Interactive Canvas Constellation:** Lightweight, hardware-accelerated particle network background on the hero section with cursor physics (auto-disabled if `prefers-reduced-motion` is detected).
- **Dynamic Typewriter Headline:** Loops through core identities:
  - *B.Tech CSE (Artificial Intelligence) Student*
  - *Public Relations & Brand Strategist*
  - *Monetary Partnership & Corporate Alliances Member*
  - *Creative Graphic Designer & Problem Solver*
- **Filterable Work / Projects:** Interactive category filters (`All`, `PR & Strategy`, `Corporate Alliances`, `Brand & Media`, `Event Operations`, `Tech & AI`) with custom detail modals.
- **Direct CV Integration:**
  - One-click **Download CV** button downloading `Manveer_Singh_CV.pdf`.
  - Built-in **In-Browser CV Preview Modal** so recruiters can review the document without leaving the page.
- **Verified Skills Showcase:** Clean proficiency badges across *Graphic & Creative Design*, *PR & Corporate Outreach*, and *Leadership & Communication* with zero misleading percentage meters.
- **Interactive Contact Hub:**
  - One-click copy buttons for Email (`manveersingh0112@gmail.com`) and Phone (`+91 9911157779`) with instant toast alerts.
  - Clickable LinkedIn integration.
  - Client-side contact form with mailto fallback composer.
- **100% Mobile Responsive:** Optimized across desktop, laptop, tablet, and mobile screens with custom glassmorphic navigation drawer.

---

## 📂 Project Structure

```
├── index.html                        # Main HTML5 semantic structure
├── assets/
│   ├── css/
│   │   └── style.css                 # Custom design system, typography & glassmorphism
│   ├── js/
│   │   └── main.js                   # Interactions, canvas, modals, filter & clipboard utils
│   ├── images/
│   │   └── favicon.svg               # Custom brand monogram favicon (MS)
│   └── docs/
│       └── Manveer_Singh_CV.pdf      # Actual verified CV PDF
└── README.md                         # Documentation & deployment guide
```

---

## 🚀 How to Open & Test Locally

You do not need Node.js or any build tools to run this website.

1. Simply double-click `index.html` in your file explorer.
2. It will open instantly in your default web browser (Google Chrome, Microsoft Edge, Safari, Firefox).
3. All interactive features (animations, modals, filter buttons, clipboard copy) work right out of the box.

---

## 🌐 How to Deploy for Free

### Option 1: GitHub Pages (Recommended)
1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of portfolio"
   ```
2. Create a new public repository on GitHub (e.g. `portfolio` or `manveer-singh.github.io`).
3. Push your code to GitHub:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
   git push -u origin main
   ```
4. Go to **Repository Settings** > **Pages** > Set source to **Deploy from branch** (`main` / `/root`) and click Save.
5. Your portfolio will be live at `https://YOUR_USERNAME.github.io/portfolio/`!

### Option 2: Netlify / Vercel
1. Drag and drop this folder directly into [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com).
2. Deployment is instant (takes less than 30 seconds).

---

## ✏️ How to Update Your Information Later

- **Personal Brand Identity Card:** The website showcases a futuristic interactive Developer & Brand Identity Card featuring your monogram (`MS`), academic credentials, and floating achievement badges. If you ever wish to re-add a portrait photo in the future, simply place your photo in `assets/images/manveer-profile.jpg` and add an `<img>` tag inside `.hero-avatar-card` in `index.html`.
- **Add New Certificates:** Open `index.html`, navigate to the `<section id="certifications">` block, and update the placeholder card with your new credential name, issuing authority, and link.
- **Connect Contact Form to Backend:** The contact form currently generates a mail draft addressed to `manveersingh0112@gmail.com`. If you prefer automated form-to-inbox forwarding without opening an email client, you can use [Formspree](https://formspree.io):
  ```html
  <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  ```
