# Swini Makeup Studio — React website

React 18 + Vite + Framer Motion + Lenis (smooth scroll).

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
```

## Deploy (Hostinger)
```bash
npm run build
```
Upload **everything inside `dist/`** to `public_html` for swinimakeupstudio.com.
A ready-built `dist/` is already included, so you can upload it straight away.

## Edit content
All text, photos, phone, address, timings, social links, services, courses,
awards, portfolio and testimonials are in **`src/data.js`**.

- Photos live in `public/images/` — replace a file with the same name, or add new ones and list them in `portfolio` in `data.js` (`cat`: bridal / party / classic / pmu, `size`: '' / 'tall' / 'wide').
- Testimonials are placeholders (`[Client Name]`) — replace with real reviews.
- Items marked `TODO` in `data.js` need client confirmation (timings, social links).

## Structure
```
src/
  App.jsx                 page assembly, smooth scroll, preloader state
  data.js                 ALL site content
  styles.css              theme (colors/fonts in :root)
  components/
    ui.jsx                Reveal, SplitText, Magnetic, Tilt, Counter, icons
    Chrome.jsx            Preloader, custom cursor, navbar, floating buttons
    Hero.jsx              hero (sparkles, rotating word, parallax) + marquee
    Sections.jsx          About, Awards, Portfolio, Services, Academy,
                          Testimonials, Contact, Footer, Lightbox
```

## Animations included
Preloader with drawn gold ring · gold-dust particle hero · word-by-word heading reveals ·
rotating hero word · shimmering gold text · mouse + scroll parallax collage ·
spinning text badge · custom cursor · magnetic buttons · scroll progress bar ·
dual-direction marquee · curtain image reveal · 3D tilt award cards with glare ·
animated portfolio filter + lightbox · service card shine & icon spin ·
academy course tabs · orbiting academy visual · swipeable testimonial carousel ·
floating-label booking form → WhatsApp · back-to-top progress ring.
Respects "reduce motion" accessibility settings.
