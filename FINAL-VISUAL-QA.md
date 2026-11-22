# TTF Homepage — Final Visual QA

**Date:** 2026-11-22  
**Reference:** https://link.funnelfast.co/preview/qSk5jMK30gPUoMt3symE?notrack=true  
**Deliverable:** `ttf-website/dist/TTF-HOMEPAGE-GHL.html`

This is a replication pass (not a redesign). Pixel-perfect parity is **not** claimed without identical GHL chrome; findings below are from computed styles + side-by-side screenshots.

---

## What changed

### About Us (Task 1)

Inspected live GHL sections:

- Desktop: `#section--CHrNfd6Co` (`.desktop-only`) with `.bg.full-center` — `background-size: cover`, `background-position: 50% 50%`, `opacity: 0.3`
- Mobile: `#section-ZPj-jc3mjg` (`.mobile-only.tablet-hide`) with `.bg.bgCover100` — `background-size: 100%`, `background-position: 0% 0%`, `opacity: 0.3`, section padding `80px 0 20px`

Matched in source:

| Property | Reference (desktop) | Implementation |
|----------|---------------------|----------------|
| ABOUT type | Korolev Bold 40px / 700 / `#d3fd04` (span) | Same via `.ttf-about-heading` |
| Body type | Roboto Condensed 18px / weight 100 / lh 27px / white / center | Same; Google Fonts now includes weight **100** |
| Read More | `#d3fd04`, Roboto Condensed | Same |
| Content width | ~1150px inside 1170px inner | `max-width: 1170px` / text `1150px` |
| Band padding | `0 0 20px` desktop | Same on `.ttf-about-partners-band` |
| Partners glass pad | `70px 20px` | Updated from `40px` |
| Crystal pad | `80px 20px` | Updated |

Screenshots: `docs/qa-screenshots/ref-about-1440.png`, `local-about-1440.png`

### Hero entrance animation (Task 2)

Reference uses Animate.css via GHL:

- `data-animation-class="animate__animated animate__fadeInUp"`
- Keyframes: `0% { opacity:0; transform: translate3d(0,100%,0) }` → `100% { opacity:1; transform: none }`
- Duration **1s**, delay **0s**, timing **ease**, fill-mode **both**
- Targets: Wael Fathy, DECODING, SUCCESS, portrait (simultaneous)
- Runs once on enter (no loop)

Recreated as scoped `#ttf-app` animation `ttf-fadeInUp` + class `ttf-hero-anim`, triggered once by `initHeroEntrance()` after `#ttf-app` bootstrap (double `requestAnimationFrame` so the initial hidden state paints). Guarded with `hero.__ttfHeroAnim`. `prefers-reduced-motion: reduce` skips motion and shows the final state.

### Single-file GHL delivery (Tasks 4–6)

`npm run build` / `npm run build:ghl` now emits:

- `dist/TTF-HOMEPAGE-GHL.html` — paste-ready fragment
- Also: `ghl-home-inline.html`, `ghl-home.html`, `ttf.css`, `ttf.js`

`TTF-HOMEPAGE-GHL.html` contains:

1. Font + Font Awesome `<link>`s (external HTTPS only)
2. Full scoped CSS in `<style id="ttf-css">`
3. Full `#ttf-app` markup (all sections)
4. Full IIFE JS in `<script id="ttf-js">` (nav, interactions, hero anim, Ziko)

No `<!DOCTYPE>`, `<html>`, `<head>`, `<body>`, Vite imports, or local relative CSS/JS paths.

Source architecture preserved: components + styles + scripts → assemble / build-ghl.

---

## Single-file verification (Task 5)

Host simulation: `dist/ghl-host-test.html` loads the fragment into a delayed slot (GHL-like injection) and re-executes inline scripts.

| Check | Result |
|-------|--------|
| All sections present | Pass |
| CSS embedded (`#ttf-css`) | Pass |
| JS embedded / `TTF` global | Pass |
| No localhost / `/styles/` / `/scripts/` / `type="module"` app imports | Pass |
| Hero entrance class applied once | Pass (`ttf-hero--entered`, 4× `ttf-hero-anim`) |
| About markup + styles present | Pass |
| Ziko single widget after boot | Pass (1) |
| Double-init guards | Pass (`__ttfBootstrapped` / Ziko flags) |
| Published GHL Custom Code element | **Not tested in live GHL** |

External dependencies that remain (cannot embed reasonably):

- Google Fonts (Poppins, Roboto Condensed)
- Font Awesome 6.5.2 CDN
- Filesafe / msgsndr media + OTF fonts
- Ziko / n8n Chat UI CDN + webhook
- Lead Connector registration webhook

These match the reference funnel’s third-party usage.

---

## Viewport comparison notes

Viewports checked: **1440 / 1024 / 768 / 390** (reference + local / host fragment).

| Area | Status |
|------|--------|
| Header | Matches structure; sticky dark bar + logo |
| Hero final state | Matches metrics (copy inset, Korolev/Charlotte/Poppins, portrait) |
| Hero entrance | fadeInUp 1s recreated from reference Animate.css |
| About + Partners band | BG opacity/size/position + typography aligned to computed styles |
| Testimonials / Vlogs / Marketing / Programs / Newsletter / CTA / Footer | No new redesign; prior production fixes retained |
| Mobile ≤768 | About band uses `bg-size: 100%` / `0% 0%` + `80px` top padding per mobile GHL section |

### Remaining differences (documented, not claimed fixed)

1. **GHL page chrome** — reference preview width/gutters differ from a full-bleed Custom Code paste; text wrap on DECODING/SUCCESS at mid widths can diverge.
2. **LeadConnector image proxy** — reference may serve WebP via `images.leadconnectorhq.com`; we use the original filesafe/msgsndr URLs (same assets).
3. **Duplicate GHL desktop/mobile About sections** — reference hides one via `.desktop-only` / `.mobile-only`; we use one band with responsive CSS (no duplicate visible content).
4. **Live CRM / published GHL** — webhook + Custom Code paste not verified on a published GHL page.
5. **Screenshot crops** — sticky header can obscure About title when scrolled flush; use metrics above for alignment proof.

Screenshots under `docs/qa-screenshots/` (including `ghl-host-1440.png`, about pair, prior multi-width set).

---

## How to deploy

```bash
cd ttf-website
npm install
npm run build
```

1. Open `dist/TTF-HOMEPAGE-GHL.html`
2. Copy **all** contents
3. Paste into one GHL Custom Code / Custom HTML element (full width)
4. Publish and hard-refresh
5. Confirm: hero fadeInUp once, About band, form webhook, single Ziko button

---

## Acceptance checklist

- [x] About Us closely matched to reference computed styles + screenshots
- [x] Hero entrance matches reference fadeInUp sequence (1s, ease, both, delay 0)
- [x] All homepage sections included
- [x] One paste-ready file: `dist/TTF-HOMEPAGE-GHL.html`
- [x] No project-owned external CSS/JS required for that file
- [x] Built from the same component source as local preview
- [x] Business logic (form webhook, Ziko, nav) unchanged in intent
- [ ] Live published GHL page (operator step)
