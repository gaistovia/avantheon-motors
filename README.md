# Avantheon Motors — GA Istovia Concept Project

**Industry:** Luxury Automotive
**Type:** Concept brand + marketing website (demo portfolio project)
**Status:** Demo Experience — not a real dealership

---

## Overview

Avantheon Motors is an original luxury automotive brand invented for this concept
project. It exists to showcase GA Istovia's ability to design and build premium,
conversion-focused digital experiences for high-end automotive and luxury clients.

**Tagline:** *Timeless Velocity*
**Brand story:** Founded in Geneva on the belief that true luxury is engineered
patience — Avantheon builds Luxury, Electric and Performance vehicles for owners
who plan to keep them, not trade them in.

---

## Brand System

| Token | Value |
|---|---|
| Midnight (background) | `#050b16` |
| Royal Blue | `#0d2159` |
| Royal Blue 2 | `#12308a` |
| Electric Blue (accent/CTA) | `#2e6fff` |
| Ice Blue (highlight) | `#a9c8ff` |
| Soft Silver (body text) | `#c7cdd8` |
| Glass surfaces | `rgba(255,255,255,0.055)` + blur |

**Typography**
- Display: `Bodoni Moda` — luxury high-contrast serif for headlines
- Body / UI: `Inter` — clean, highly legible sans-serif
- Data / specs: `JetBrains Mono` — used for horsepower, pricing, specs and timestamps to reinforce engineering precision

**Signature visual language**
Rather than stock photography of real, trademarked vehicles (which would create
copyright/trademark conflicts for a fictional competing brand), every "image" slot
uses an original **technical wireframe render**: a hand-drawn car silhouette line
art on a gradient blueprint background. This is intentional — it reinforces
Avantheon's "engineered precision" positioning and doubles as a licensing-safe
placeholder system that a real client would swap for licensed photography or
studio renders.

---

## Sections Included

- Luxury loading sequence (preloader)
- Glass-morphic sticky navigation with mobile menu
- Cinematic hero with animated headline reveal, ambient glow, live spec strip
- Press/partner marquee (trust strip)
- Brand story: mission, craft values, discretion, horizon (electric parity)
- Three collections: Luxury / Electric / Performance
- Filterable inventory grid (6 vehicles) with specs, pricing, wishlist, Reserve + WhatsApp CTAs
- Ownership services: Acquisition, Financing, Trade-In, Atelier Customization
- Odometer-style animated statistics band
- Client testimonials (clearly marked as illustrative demo content)
- FAQ accordion
- Consultation CTA band
- Contact section: form, phone, email, showroom address, hours, map placeholder
- Floating WhatsApp button
- Enterprise footer with newsletter, sitemap, legal links
- Persistent "GA Istovia Concept Project" demo badge

## Features

- Scroll-reveal animations via IntersectionObserver
- Animated odometer counters for statistics
- Inventory filtering by collection
- Wishlist toggle on vehicle cards
- Accessible FAQ accordion (ARIA expanded states)
- Smooth-scroll navigation with fixed-header offset correction
- Fully responsive: desktop, tablet, mobile
- `prefers-reduced-motion` respected throughout
- Visible keyboard focus states

## SEO

- Unique title & meta description
- Open Graph + Twitter Card tags
- Canonical URL
- `AutomotiveBusiness` JSON-LD schema
- Semantic HTML5 landmarks (`header`, `main`, `section`, `footer`, `nav`)
- Descriptive `aria-label`s and heading hierarchy

## Technologies Used

- HTML5 (semantic, accessible)
- Modern CSS (custom properties/design tokens, CSS Grid, glassmorphism, keyframe animation)
- Vanilla JavaScript (no framework/build step — GitHub Pages ready)
- Google Fonts (Bodoni Moda, Inter, JetBrains Mono)

## File Structure

```
avantheon/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── images/       (reserved for licensed photography)
│   └── icons/
└── README.md
```

## Disclaimer

Avantheon Motors is a fictional brand created solely for this GA Istovia concept
demo. All vehicle specifications, pricing, testimonials and statistics are
illustrative and do not represent a real company, product, or offer of sale.
