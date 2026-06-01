# Image Cleaning — Professional Cleaning Services Website

A fast, SEO-friendly, static website for **Image Cleaning**, a locally owned professional cleaning company serving Savannah, GA and the Lowcountry.

- Built with [Eleventy](https://www.11ty.dev/) (v2) + [Tailwind CSS](https://tailwindcss.com/)
- Fully responsive, accessible, and semantic HTML5
- Reusable components (header, footer, nav, contact form)
- Contact form uses the user’s email client via `mailto:` (zero backend, works perfectly on GitHub Pages)
- Optimized for local SEO targeting Savannah-area searches for house cleaning, Airbnb turnover, and commercial janitorial

## 🚀 Quick Start (Local Development)

```bash
npm install
npm run dev
```

Open http://localhost:8080

- Eleventy dev server + Tailwind watch both run concurrently.
- Any change to `.njk`, CSS, or JS will refresh.

## 📦 Production Build

```bash
npm run build
```

Output is in `_site/`. This is what gets deployed.

You can preview the production build with:

```bash
npm run preview
```

## 🧹 Linting & Formatting

```bash
npm run lint        # Check
npm run lint:fix    # Auto-fix
```

## 📁 Project Structure

```
src/
├── _data/
│   └── site.json          # Global config: name, phone, email, nav, SEO defaults
├── _includes/
│   ├── components/
│   │   ├── contact-form.njk   # Reusable form (used in modal + standalone)
│   │   ├── header.njk
│   │   └── footer.njk
│   └── layouts/
│       └── base.njk       # Main layout with all SEO meta + JSON-LD
├── assets/
│   ├── css/input.css      # Tailwind + custom design system
│   ├── js/main.js         # Mobile nav, modal, form mailto, toasts
│   └── images/            # logo.svg, icon.svg, hero-illustration.svg
├── index.njk
├── residential.njk
├── commercial.njk
├── vacation-rentals.njk
├── about.njk
├── testimonials.njk
├── 404.njk
├── privacy.njk
├── terms.njk
├── sitemap.xml.njk
└── robots.txt
```

**Important variables** (edit in `src/_data/site.json`):

- `email`: ashliobryant@gmail.com
- `phone`: 912-445-1035

## 🌐 Deployment to GitHub Pages

The site is designed to be deployed automatically via GitHub Actions.

### One-time Setup

1. Create a new GitHub repository (recommended name: `image-cleaning`).
2. Push this code.
3. Go to **Settings → Pages** and ensure "GitHub Actions" is selected as the source.
4. (Optional) Add a custom domain and update `site.url` in `src/_data/site.json`.

The included workflow (`.github/workflows/deploy.yml`) will:

- Run on every push to `main`
- Build the site with Eleventy + Tailwind
- Deploy `_site` to GitHub Pages

## 🔧 Customization

### Changing Contact Info

Edit `src/_data/site.json` — the email and phone are used everywhere (headers, footers, forms, structured data).

### Adding a New Page

1. Create `src/new-page.njk`
2. Add frontmatter:
   ```yaml
   ---
   layout: layouts/base.njk
   title: 'Page Title'
   description: 'SEO description...'
   ---
   ```
3. Add to the `nav` array in `site.json` if it should appear in the header.

### The Contact Form

The reusable form component lives in `src/_includes/components/contact-form.njk`.

It uses JavaScript to:

- Validate fields
- Open the user’s email client with a beautifully pre-filled message (mailto)
- Show success state + toast notifications

No external form service is required. If you ever want to switch to Formspree, Netlify Forms, or Web3Forms, simply update the `<form>` action in the component.

## 🎨 Branding & Design

- **Primary color**: Teal (`#0D9488`) — clean, trustworthy, friendly
- **Accent**: Amber (`#D97706`) — warm, human touch
- **Typography**: System UI stack (fast + native feel)
- **Logo & Favicon**: Fully custom SVG in `src/assets/images/logo.svg` and `favicon.svg`

You can regenerate or tweak the SVGs easily. For high-resolution PNG fallbacks, run the images through any SVG→PNG converter and add them to the `images/` folder.

## ✅ SEO Highlights

- Unique title + meta description on every page
- Open Graph + Twitter Card tags
- LocalBusiness JSON-LD structured data
- Semantic HTML5 (`header`, `nav`, `main`, `section`, `article`)
- Proper heading hierarchy
- `sitemap.xml` + `robots.txt`
- Fast (no heavy frameworks, Tailwind purged)
- Accessible (skip links, ARIA, keyboard friendly)

Targeted keywords baked in for Savannah, GA searches:

- house cleaning Savannah GA
- Airbnb cleaning Savannah / Vrbo turnover
- commercial / office cleaning Savannah
- deep cleaning, move-in cleaning, etc.

## 📝 Notes

- The contact form opens the visitor’s email client. This is the most reliable, privacy-friendly solution for pure static hosting.
- Update the placeholder `site.url` in `src/_data/site.json` after you have a real domain or GitHub Pages URL.
- For production Google reviews link, replace the placeholder in `testimonials.njk`.

---

Built with care for Image Cleaning — Savannah, Georgia.

```

Good. Now the GitHub Action.
```
