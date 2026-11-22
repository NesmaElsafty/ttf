# TTF Website — Pixel-Perfect QA Report

**Date:** 2026-11-22  
**Project:** `ttf-website`  
**Reference:** https://link.funnelfast.co/preview/qSk5jMK30gPUoMt3symE?notrack=true  
**Local preview:** http://127.0.0.1:5173/

## Visual comparison (browser screenshots)

| Viewport | Result | Notes |
|----------|--------|-------|
| 1440×900 desktop | Close match | Hero typography, BG SVG grid, sticky nav, lime SUCCESS / thin DECODING |
| 768 tablet | Close match | Stacked hero; burger ≤900px |
| 390 mobile | Close match | Burger, centered hero type, portrait bottom; 3-col partner logos |

## Section checklist

| # | Section | Status | Match notes |
|---|---------|--------|-------------|
| 1 | Header / nav | Pass | Logo CDN, dropdowns, burger drawer, original URLs |
| 2 | Hero | Pass | Charlotte Southern / Poppins 100 / Korolev Bold; portrait + grid SVG |
| 3 | About | Pass | Continuous BG image; ABOUT lime; Roboto Condensed body; Read More |
| 4 | Partners | Pass | PARTNERS / WHO WE WORK WITH + glass logos (white filter) |
| 5 | Testimonials | Pass | Tabs people / voices / real; original data model |
| 6 | Our Vlogs | Pass | Sidebar buttons + video cards + play → `.mov` sources |
| 7 | Marketing Team | Pass | Pillars + white OUR SERVICES CTA |
| 8 | Our Programs | Pass | 4 cards + Read More → services |
| 9 | Newsletter | Pass | Glass CTA + brand mark |
| 10 | Take Action form | Layout only | `data-ghl-form="registration"` — needs native GHL embed |
| 11 | Footer | Pass | Explore / Support links + social icons |
| 12 | Ziko chatbot | Pass | Original n8nChatUI init; double-init guarded |

## Interactions tested locally

- [x] Mobile burger open/close  
- [x] Desktop dropdown hover  
- [x] Testimonials tab switching  
- [x] Vlog title jump / play button wiring  
- [x] Register form required fields (client validation)  
- [x] No console-blocking errors on load (Ziko loads from CDN)  
- [x] Production `npm run build` succeeds  

## Build artifacts

| File | Purpose |
|------|---------|
| `dist/ghl-home.html` | Fragment for Custom HTML element |
| `dist/ghl-home-inline.html` | Single-file paste (HTML+CSS+JS) |
| `dist/ttf.css` | Scoped stylesheet |
| `dist/ttf.js` | Browser IIFE bundle |

## Unverified / residual

1. **Native GHL form CRM submission** — not verified inside a published GHL page; replace placeholder with embed.  
2. **Voices / case-study media** — still use live-site `/media/…` placeholders.  
3. **GHL container width quirks** — fine-tune after paste if page width ≠ full viewport.  
4. **GHL deployment** — local rebuild verified; live GHL paste not claimed verified.  
5. **DECODING stroke look** — live site uses Poppins weight 100 (reads as ultra-thin / outline-like); mirrored, not forced `-webkit-text-stroke`.
