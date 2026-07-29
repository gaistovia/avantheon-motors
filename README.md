# Avantheon Motors — GA Istovia Concept Project
### Cinematic Reboot

**Industry:** Luxury Automotive
**Type:** Concept brand + cinematic storytelling website (demo portfolio project)
**Status:** Demo Experience — not a real dealership
**Live path:** `https://gaistovia.github.io/avantheon-motors/`

---

## What changed in this reboot

This is a complete rebuild, not an iteration. The brand name is the only thing
carried over from the previous version.

- **Color balance flipped.** The old version was blue-dominant and read as a
  corporate landing page. This version runs ~70% white/paper, ~15% platinum
  grey, ~10% deep royal blue, ~5% electric blue accent — blue is now used only
  to create focus (kickers, hover states, one CTA, glows in dark scenes).
- **Sections became scenes.** The page is structured as a sequence of full-bleed
  cinematic "scenes" (Hero → Philosophy → Designed Without Compromise → The Art
  of Performance → Engineered for Tomorrow → Crafted by Visionaries → The
  Collection → Behind the Details → Ownership Experience → Global Delivery →
  Client Voices → FAQ → Private Consultation), each with its own mood, not a
  generic card-grid layout.
- **The Collection is no longer a grid of cards.** It's an alternating,
  full-width editorial showcase — large imagery, specs reveal on hover, one
  vehicle per "chapter."
- **New motion system:** custom cursor with magnetic hover ring, magnetic
  buttons, parallax hero layers, scroll-linked scene reveals, animated odometer
  counters, an animated hand-drawn signature, and a subtle full-page film-grain
  overlay for a cinematic, non-digital texture.

---

## On imagery

The brief asked for magazine-quality editorial photography (exterior, interior,
night, studio, driving, detail, lifestyle). Real photography of actual,
trademarked vehicles was deliberately avoided in this build: using photos of
real manufacturers' cars to represent a *fictional competing brand* would
misrepresent the brand and create real copyright/trademark exposure — a risk a
real agency delivering this to a client would also need to flag.

Instead, every image slot in this demo uses an **original studio wireframe
render** (gradient-lit car silhouette, specular highlight pass, ground
reflection, and category-specific lighting — `--studio`, `--night`, `--dawn`,
`--drive`) built entirely in SVG/CSS. Every one is labeled in the UI as
"Placeholder for Licensed Photography," exactly as the brief allows for demo
work. This is the intended handoff point: a production build swaps these
render containers for licensed photography/CGI without touching layout, motion,
or copy.

---

## Section Map

| Scene | Purpose |
|---|---|
| Hero | Full-bleed cinematic opening, staged headline reveal, parallax render, live spec |
| The Philosophy | Single editorial statement, maximum white space |
| Designed Without Compromise | Split layout — design ethos |
| The Art of Performance | Dark scene, motion-streak background, hard stats |
| Engineered for Tomorrow | Platinum/glass panel, Electric Collection specs |
| Crafted by Visionaries | Split layout, brand story, animated signature |
| The Collection | Alternating full-width showcase, 3 vehicles, hover spec reveal |
| Behind the Details | Macro detail grid (wheel, lens, stitching, emblem) |
| Luxury Ownership Experience | Numbered editorial service list |
| Global Delivery | Stat band + map placeholder |
| Client Voices | Testimonials (marked as illustrative demo content) |
| FAQ | Accordion |
| Private Consultation | Contact form, advisor info, newsletter |
| Footer | Sitemap, legal, social, copyright |

Persistent: floating WhatsApp button, "GA Istovia Concept Project" badge.

## Features

- Custom cursor (dot + lagging ring, hover-aware) — disabled automatically on touch devices
- Magnetic button hover effect
- Parallax hero + performance-scene background layers
- Scroll-triggered reveal animations (IntersectionObserver)
- Animated odometer-style stat counters
- Hover-reveal vehicle specifications in The Collection
- Animated hand-drawn signature (stroke-draw on scroll)
- Full-page film-grain texture overlay
- Accessible FAQ accordion (ARIA expanded states)
- `prefers-reduced-motion` and `pointer: coarse` respected throughout (cursor, parallax, counters all degrade gracefully)
- Fully responsive: desktop, tablet, mobile

## SEO

- Unique title & meta description
- Open Graph + Twitter Card tags
- Canonical URL set to `https://gaistovia.github.io/avantheon-motors/`
- `AutomotiveBusiness` JSON-LD schema
- Semantic HTML5 landmarks, descriptive `aria-label`s, logical heading order

## Technologies Used

- HTML5 (semantic, accessible)
- Modern CSS (custom properties, CSS Grid, glassmorphism, keyframe/scroll animation)
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
