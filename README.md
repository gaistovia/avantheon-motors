# Avantheon Motors — GA Istovia Concept Project
### Nine Scenes — A Website Built to Close, Not Just Impress

**Industry:** Luxury Automotive
**Type:** Concept brand + cinematic scroll experience (demo portfolio project)
**Status:** Demo Experience — not a real dealership
**Live path:** `https://gaistovia.github.io/avantheon-motors/`

---

## The brief

*"Your objective is not to impress me. Your objective is to make another business
owner hire GA Istovia after exploring this demo for five minutes."*

This build follows a strict nine-scene structure where **no two consecutive
scenes share a layout, rhythm, or interaction model.** Predictability was
treated as a bug.

| # | Scene | Composition | What makes it different from the scene before it |
|---|---|---|---|
| 01 | **Silence** | Full-viewport negative space, one italic sentence typed in word-by-word with a live blinking cursor and a running millisecond timestamp. No image, no nav chrome, no color. | Opens the site with *nothing* — pure restraint, the opposite of a hero banner. |
| 02 | **The Vision** | Full-bleed cinematic render that zooms in from 112% to 100% as it enters view, with a scrolling subtitle ticker along the bottom edge like a film's lower-third. | All image, almost no text — the inverse of Scene 01. |
| 03 | **The Ignition** | A live engine console: press **Start Engine** and a synthesized twin-turbo V8 (built in the browser from oscillators + a sweeping filter via the Web Audio API — no recorded audio) drives a real-time 28-bar frequency visualizer and a climbing RPM readout. | Sound and data replace imagery entirely — an interactive instrument, not a static section. |
| 04 | **The Collection** | A pinned, scroll-driven horizontal filmstrip — vertical scroll input translates a rail of four vehicles sideways, with a progress bar tracking position. | Vertical scroll suddenly drives horizontal motion — a rhythm change from every prior scene. |
| 05 | **Craftsmanship** | An asymmetric magazine collage: overlapping rotated tiles, a floating italic pull-quote, and a hand-drawn signature that draws itself in. | Breaks the grid entirely — nothing aligns to a column. |
| 06 | **Interior** | A dark cockpit blueprint with four clickable hotspots (pulsing pin markers) that swap a detail panel's copy on click. | Introduces direct manipulation — the visitor chooses what they see next. |
| 07 | **Performance** | A diagonal clip-path split: dark wedge with an animated radial gauge on the left, light panel with animated horsepower bars on the right. | Two data-visualization styles (radial + linear) inside one diagonal composition — no grid, no card. |
| 08 | **Ownership** | A winding SVG "route" line that draws itself on scroll, connecting four alternating left/right stops like a road map. | Replaces the expected numbered-list/timeline with a literal path metaphor tied to the brand's driving language. |
| 09 | **Private Consultation** | A dark glass "invitation card" with a perforated edge and dashed center fold, chip-style collection selector, and a two-field form — closes like a hand-delivered invite, not a contact form. | Ends on intimacy and exclusivity after eight scenes of spectacle. |

Persistent utility layer (present throughout, never a scene of its own):
floating WhatsApp button, "GA Istovia Concept Project" badge, and a full-screen
numbered **Index** overlay (not a navbar) reached via a single "Index" trigger
that inverts color via `mix-blend-mode: difference` against any scene.

---

## On imagery

Real photography of actual, trademarked vehicles was intentionally avoided —
using photos of real manufacturers' cars to represent a *fictional competing
brand* creates real copyright/trademark exposure, which a real agency would
also need to flag to a client. Every image slot instead uses an original
studio-lit SVG render, clearly marked "Placeholder for Licensed Photography" —
the intended handoff point for real photography or CGI in production.

## Features

- Web Audio API engine synthesis + live analyser-driven frequency visualizer (Scene 03)
- Scroll-driven horizontal rail with progress indicator (Scene 04)
- Click-to-reveal interior hotspot system (Scene 06)
- SVG path draw-on-scroll route map (Scene 08)
- Custom lagging cursor with hover states; disabled on touch devices
- Magnetic button hover effect
- Full-screen numbered index overlay (circle-reveal transition)
- `prefers-reduced-motion` and `pointer: coarse` respected throughout — every
  animation, the cursor, and the audio visualizer degrade gracefully
- Fully responsive: desktop, tablet, mobile

## SEO

- Unique title & meta description, canonical URL set to the GitHub Pages path
- Open Graph + Twitter Card tags
- `AutomotiveBusiness` JSON-LD schema
- Semantic HTML5, descriptive `aria-label`s, logical heading order

## Technologies Used

HTML5 · Modern CSS (custom properties, clip-path, CSS Grid, glassmorphism) ·
Vanilla JavaScript (Web Audio API, IntersectionObserver, no build step —
GitHub Pages ready) · Google Fonts (Bodoni Moda, Inter, JetBrains Mono)

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
demo. All vehicle specifications, pricing and statistics are illustrative and
do not represent a real company, product, or offer of sale.
