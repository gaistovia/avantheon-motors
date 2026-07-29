# Avantheon Motors — GA Istovia Concept Project
### Flagship Demo — Eight Chapters, Real Photography

**Industry:** Luxury Automotive
**Type:** Concept brand + cinematic editorial website (flagship portfolio demo)
**Status:** Demo Experience — not a real dealership
**Live path:** `https://gaistovia.github.io/avantheon-motors/`

---

## What changed in this build

Two things the brief flagged as non-negotiable, addressed directly:

1. **Real photography, no illustrations.** Every image on this site is a real,
   properly licensed photograph — no SVG car wireframes, no CGI silhouettes.
   See "On the photography" below for sourcing and licensing detail.
2. **Chapters, not sections.** The page is built as eight distinct chapters —
   Arrival, Craftsmanship, Engineering, Performance, The Collection, Ownership,
   Legacy, Private Consultation — and no two consecutive chapters share a
   layout, image treatment, or animation style.

| # | Chapter | Composition |
|---|---|---|
| 01 | **Arrival** | Full-bleed cinematic photograph, slow zoom-in on load, kinetic headline reveal, scrolling subtitle ticker. |
| 02 | **Craftsmanship** | Asymmetric split — large macro photograph of hand-stitched leather opposite an editorial pull-quote and a hand-drawn signature. |
| 03 | **Engineering** | Full-bleed headlight photograph annotated with drafting-style callout lines, like a technical exploded diagram laid over a photograph. |
| 04 | **Performance** | A tall night-driving photograph beside a stacked wheel-detail photograph and a live stat card (radial gauge + horsepower bars). |
| 05 | **The Collection** | Sticky-scroll spotlight: the photograph stays pinned and crossfades while the specification story scrolls past beside it — a different rhythm from every chapter before it. |
| 06 | **Ownership** | Full-bleed lifestyle photograph with a frosted glass panel of ownership services laid over it. |
| 07 | **Legacy** | Pure typography on a near-empty dark scene — the one chapter with no photograph, deliberately, as a breath before the close. |
| 08 | **Private Consultation** | A glass "invitation card" with a perforated edge — closes like a hand-delivered invite, not a contact form. |

Persistent utility layer: floating WhatsApp button, "GA Istovia Concept Project"
badge, and a full-screen numbered **Index** overlay (not a navbar) that inverts
color via `mix-blend-mode: difference` against any chapter.

---

## On the photography

Every photograph is real, sourced from Unsplash, and licensed for commercial
use under the [Unsplash License](https://unsplash.com/license) (free to use,
no permission or attribution required). None depict a real, named vehicle
model prominently or by badge — they were deliberately chosen as mood, detail,
and lifestyle photography (a headlight glow, a leather macro, a motion-blurred
night drive, a driving silhouette) rather than full identifying shots of a
real manufacturer's car, since using a competitor's actual production model to
represent a *fictional* brand would be a real trademark problem, not just a
style choice — a real agency would need to flag exactly this to a client
before launch.

Every photo carries an on-page caption identifying it as **editorial
placeholder photography**, ready to be swapped for Avantheon's own studio and
location shoot in production — the same way a real agency delivers a concept
site ahead of a client's brand photography being ready.

| Chapter | Image | Photographer | Source |
|---|---|---|---|
| Arrival / Collection | Dark studio sports car | Yuvraj Singh Parmar | [Unsplash](https://unsplash.com/photos/a-black-sports-car-in-a-dark-room-kStCRRQ1kcE) |
| Craftsmanship | Leather stitching macro | Yehor Parkhomenko | [Unsplash](https://unsplash.com/photos/close-up-of-black-leather-with-orange-stitching-JhYCWU3xUJo) |
| Engineering | Illuminated headlight at night | Jack Lucas Smith | [Unsplash](https://unsplash.com/photos/close-up-of-a-cars-illuminated-headlights-at-night-l9brPcxp-pM) |
| Performance | Motion-blurred night taillights | Tymur Tsebrenko | [Unsplash](https://unsplash.com/photos/blurred-car-taillights-at-night-with-city-lights-wIRzNCbJ9R0) |
| Performance | Wheel and tire detail | Sachin Khadka | [Unsplash](https://unsplash.com/photos/a-black-and-white-sports-car-in-the-dark-7L2-sf19x78) |
| Collection (cabin) | Interior, wheel and dashboard | Coleman Glover | [Unsplash](https://unsplash.com/photos/the-interior-of-a-car-with-a-steering-wheel-and-dashboard-FQHeFJbCdSI) |
| Ownership | Driving silhouette at golden hour | Nong | [Unsplash](https://unsplash.com/photos/silhouette-person-driving-vehicle-YwSaCxOpBAM) |

All images are lazy-loaded except the Arrival hero (loaded eagerly with
`fetchpriority="high"` for LCP), served at responsive widths via Unsplash's
`?w=` resize parameter, and compressed via `auto=format&q=80` to keep payload
size down without a build step.

---

## Features

- Real, licensed cinematic photography throughout — zero illustrations
- Slow Ken Burns–style zoom on the Arrival hero
- Scrolling subtitle ticker (film lower-third style)
- Drafting-style photo callouts in Engineering
- Sticky-scroll image crossfade in The Collection
- Frosted glass panel over photography in Ownership
- Custom lagging cursor with hover states; disabled on touch devices
- Magnetic button hover effect
- Full-screen numbered index overlay (circle-reveal transition)
- `prefers-reduced-motion` and `pointer: coarse` respected throughout
- Fully responsive: desktop, tablet, mobile

## SEO

- Unique title & meta description, canonical URL set to the GitHub Pages path
- Open Graph + Twitter Card tags
- `AutomotiveBusiness` JSON-LD schema
- Semantic HTML5, descriptive `alt` text on every photograph, logical heading order

## Technologies Used

HTML5 · Modern CSS (custom properties, clip-path, sticky positioning,
glassmorphism) · Vanilla JavaScript (IntersectionObserver, no build step —
GitHub Pages ready) · Google Fonts (Bodoni Moda, Inter, JetBrains Mono) ·
Unsplash-licensed photography

## File Structure

```
avantheon/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   ├── images/       (reserved for the brand's own studio photography)
│   └── icons/
└── README.md
```

## Disclaimer

Avantheon Motors is a fictional brand created solely for this GA Istovia concept
demo. All vehicle specifications, pricing and statistics are illustrative and
do not represent a real company, product, or offer of sale. Photography is
real and licensed as credited above, used as mood/detail placeholder imagery
pending the brand's own commissioned photography.
