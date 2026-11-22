# TTF Production Audit Report

**Date:** 2026-11-22  
**Repo:** https://github.com/NesmaElsafty/ttf  
**Reference:** https://link.funnelfast.co/preview/qSk5jMK30gPUoMt3symE?notrack=true  
**Scope:** Production readiness & GoHighLevel compatibility (no redesign)

---

## Summary

Production blockers in form handling, testimonial media, GHL boot timing, HTML semantics, and repo hygiene were fixed. GHL build artifacts regenerated. Fonts/CDN assets verified over HTTP. Visual checks captured at 1440 / 1024 / 768 / 390. **GoHighLevel published-page CRM submission was not tested** in this pass.

---

## Issues discovered

| # | Severity | Issue |
|---|----------|--------|
| 1 | High | Registration form showed success / placeholder alerts without a real submission |
| 2 | High | Testimonial “youtube” card loaded an MP4 URL inside an `<iframe>` (invalid / broken playback) |
| 3 | High | Relative `/media/...` audio & video paths from the reference are not publicly hosted |
| 4 | High | `main.js` set `__ttfAppInit` even when `#ttf-app` was missing, blocking later GHL mounts |
| 5 | Medium | Ziko RTL helper polled forever with `setTimeout` if the widget never appeared |
| 6 | Medium | Invalid nav markup: `<button>` as direct child of `<ul>` |
| 7 | Medium | Heading hierarchy: multiple decorative `<h1>`s under the page hero |
| 8 | Medium | `ttf-website/node_modules` was tracked in Git (229 paths) |
| 9 | Low | No root `.gitignore` |
| 10 | Info | Reference funnel itself uses the same broken `/media/` paths and joke YouTube id |

---

## Fixes implemented

### 1. GoHighLevel form integration

**Files:** `ttf-website/src/components/cta.html`, `ttf-website/src/scripts/interactions.js`, `docs/DEPLOYMENT.md`, `ttf-website/README.md`

- Removed fake success / placeholder hint UX.
- Wired submit to the **reference** Lead Connector webhook from `reference/assembled/registration.js` via `data-ghl-webhook` (not invented).
- Success status (`role="status"`) appears **only** after `fetch` resolves OK.
- Errors / validation failures show status text; no success copy on failure.
- Native GHL embed path documented; JS skips when a native embed is detected.
- Accessible labels added (`ttf-sr-only`).

### 2. Testimonial media

**File:** `ttf-website/src/scripts/interactions.js`, CSS fallbacks in `components.css`

- Replaced MP4-in-iframe with HTML5 `<video controls playsinline>`.
- Verified playable URL only:  
  `https://storage.googleapis.com/msgsndr/9LHVl0sw8gABEkuoMC1s/media/6950ace7ee1047793af668b6.mp4` (HTTP 200).
- Cleared unverified `/media/voices/*` and `/media/videos/cx-drop-22.mp4` sources.
- Fallback UI: “Audio/Video unavailable” when no verified absolute URL exists.
- Runtime check: Real Feedback tab → 1 `<video>` + 1 fallback, **0 iframes**.

### 3. GoHighLevel-safe initialization

**File:** `ttf-website/src/scripts/main.js`

- Boot waits for `#ttf-app` with a **bounded** retry (50 × 100ms ≈ 5s), then stops.
- Per-root flag `__ttfBootstrapped` prevents duplicate listeners.
- Ziko guarded by `__ttfZikoInit` / `__ttfZikoStarted`; skips if widget already in DOM.
- RTL helper capped (~20s), no uncontrolled observer/poll forever.
- Delayed-mount test (`dist/delayed-init-test.html`):  
  `#ttf-app` absent at `t0` → injected at +800ms → `bootstrapped=true`, `navInit=true`, **exactly 1** Ziko widget after double `TTF.init()`.

### 4. HTML semantics & a11y

**Files:** `header.html`, `hero.html`, `about.html`, `partners.html`, `testimonials.html`, `cta.html`, `navigation.js`, related CSS

- Close control wrapped in `<li class="ttf-menu-close">`; primary `<nav aria-label="Primary">`.
- Dropdown toggles expose `aria-haspopup` / `aria-expanded`.
- Single page `<h1>` (Wael Fathy); DECODING / SUCCESS are styled `<p>`s.
- Section titles demoted to logical `h2` / `h3` / `p` while keeping class-based visuals.
- Form fields associated with labels.

### 5. Repository cleanup

- Added `.gitignore` (repo root) and `ttf-website/.gitignore`.
- Ran `git rm -r --cached ttf-website/node_modules` (local `node_modules` preserved; Vite still installs/runs).
- `package-lock.json` preserved.
- Install / build commands documented in `ttf-website/README.md`.

### 6. Fonts & assets

HTTP `HEAD` checks (all **200**):

| Asset | Result |
|-------|--------|
| Korolev Bold / Heavy / Thin OTFs (filesafe CDN) | 200 `font/otf` |
| Charlotte Southern + Charlotte Swash OTFs | 200 `font/otf` |
| Hero SVG / portrait PNG / logo PNG | 200 |
| Verified testimonial MP4 | 200 `video/mp4` |

Computed fonts in Chromium preview at 1440px: Charlotte Southern (name), Poppins (DECODING), Korolev Bold (SUCCESS).  
**CORS cross-origin font embedding on a published GHL domain was not separately audited beyond CDN availability.**

### 7. Final GHL build

```bash
cd ttf-website
npm install
npm run build
```

Generated:

| File | Bytes (approx.) |
|------|-----------------|
| `ttf-website/dist/ghl-home-inline.html` | 82 961 |
| `ttf-website/dist/ghl-home.html` | 22 176 |
| `ttf-website/dist/ttf.css` | 35 939 |
| `ttf-website/dist/ttf.js` | 24 277 |

---

## Files modified

- `ttf-website/src/components/cta.html`
- `ttf-website/src/components/header.html`
- `ttf-website/src/components/hero.html`
- `ttf-website/src/components/about.html`
- `ttf-website/src/components/partners.html`
- `ttf-website/src/components/testimonials.html`
- `ttf-website/src/scripts/interactions.js`
- `ttf-website/src/scripts/main.js`
- `ttf-website/src/scripts/navigation.js`
- `ttf-website/src/styles/components.css`
- `ttf-website/src/styles/responsive.css`
- `ttf-website/README.md`
- `ttf-website/.gitignore` (new)
- `.gitignore` (new)
- `docs/DEPLOYMENT.md`
- `ttf-website/dist/*` (rebuild)
- `docs/qa-screenshots/*` (new captures)
- Git index: `ttf-website/node_modules/**` untracked

Reference source under `reference/` was **not** modified.

---

## Visual regression

Screenshots: `docs/qa-screenshots/`

| Width | Local | Reference |
|------:|-------|-----------|
| 1440 | `local-1440.png` | `ref-1440.png` |
| 1024 | `local-1024.png` | `ref-1024.png` |
| 768 | `local-768.png` | `ref-768.png` |
| 390 | `local-390.png` | `ref-390.png` |

### Observed differences (evidence-based; not claimed pixel-perfect)

1. **Hero column width / wrapping:** At 1024 and 768 the reference funnel chrome can wrap DECODING (e.g. DECODIN/G); local full-bleed preview kept a wider text column in some captures. Layout tokens (80px copy inset, bg-size 100%, text x≈191 at 1440) match prior measurements.
2. **Mobile hero stacking (390):** Reference shows a more centered portrait overlap; local keeps portrait in the grid column. No redesign applied (constraint: preserve current visual implementation).
3. **Partners at ≤900:** Local correctly switches to crystal 6-logo grid (burger visible) — matches intended GHL mobile custom code.
4. Screenshot tool may crop wide canvases; layout metrics were also read via `getBoundingClientRect`.

No pixel-perfect claim is made without identical GHL page chrome.

---

## Browser / functional test results

| Test | Result |
|------|--------|
| Vite preview `http://127.0.0.1:4173/` loads `#ttf-app` | Pass |
| Immediate boot (`__ttfBootstrapped`, fonts, Ziko present) | Pass |
| Delayed `#ttf-app` mount (`dist/delayed-init-test.html`) | Pass |
| Double `TTF.init()` → single Ziko widget | Pass |
| Testimonials → Real Feedback HTML5 video + fallback | Pass |
| Nav semantics / single h1 in a11y tree | Pass |
| Webhook form submit against live CRM on published GHL page | **Not verified** |
| GHL Custom Code paste in live funnel | **Not verified** |

---

## Remaining GHL integration steps

1. Paste `ttf-website/dist/ghl-home-inline.html` into a full-width Custom Code element (or use split CSS/HTML/JS — see `docs/DEPLOYMENT.md`).
2. Confirm webhook trigger `28d257a9-5c8b-42fd-9279-3d3e72166ef7` is still active for location `9LHVl0sw8gABEkuoMC1s`, **or** update `data-ghl-webhook` and rebuild.
3. Optionally replace the form with a native GHL Form embed inside `[data-ghl-form="registration"]`.
4. Publish the page and submit a test lead; confirm contact / workflow in GHL CRM.
5. Confirm Korolev / Charlotte fonts render on the published domain (CDN CORS).
6. Smoke-test burger nav, testimonials tabs, vlog play, and single Ziko button on mobile + desktop.
7. If community audio/video assets become available on a public CDN, set absolute `https` URLs in `TTF_DATA` and rebuild.

---

## Could not verify

- CRM contact creation / workflow firing from a **published** GHL page.
- Exact pixel parity inside GHL’s editor/preview chrome vs Vite preview.
- Availability of original `/media/voices/*` and `/media/videos/cx-drop-22.mp4` assets (absent from public CDN; same as reference).
- Cross-browser matrix beyond Chromium automation (Firefox/Safari/iOS WebView not run here).
- Production `techtitansfactory.com` live page parity (audit used the funnelfast preview reference).

---

## Install & build (canonical)

```bash
cd ttf-website
npm install
npm run assemble   # optional; also runs as prebuild
npm run dev        # http://localhost:5173
npm run build      # Vite + dist/ghl-home*.html + ttf.css + ttf.js
```

Delayed boot smoke test (after build):

```bash
npx serve ttf-website/dist -l 4174
# open http://127.0.0.1:4174/delayed-init-test.html
```
