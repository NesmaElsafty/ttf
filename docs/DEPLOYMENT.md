# TTF Website — GoHighLevel Deployment

## Artifacts

Built by `npm run build` inside `ttf-website/`:

| File | Use |
|------|-----|
| `ttf-website/dist/ghl-home-inline.html` | One-shot Custom Code paste (HTML + CSS + JS) |
| `ttf-website/dist/ghl-home.html` | HTML fragment only (`#ttf-app`) |
| `ttf-website/dist/ttf.css` | Scoped stylesheet |
| `ttf-website/dist/ttf.js` | IIFE navigation / interactions / Ziko |

## Recommended path (inline)

1. In GHL, edit the Home funnel / website page.
2. Add a **Custom Code** element spanning full width.
3. Paste the full contents of `ghl-home-inline.html`.
4. Disable conflicting GHL section backgrounds if they fight `#1b2029`.
5. Publish and hard-refresh.

## Split path

1. **Header tracking / custom CSS:** paste `ttf.css` (or link it from CDN/hosting).
2. **Body Custom Code:** paste `ghl-home.html`.
3. **Footer tracking / custom JS:** wrap `ttf.js` in `<script>…</script>`.
4. Load fonts + Font Awesome if not already global:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;500;600;700&family=Roboto+Condensed:wght@300;400;700&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
```

## GHL form embed

Locate:

```html
<div … data-ghl-form="registration">
```

1. Delete or comment out the placeholder `<form id="ttfns-form">`.
2. Paste the GHL form embed code from Sites → Forms (or the funnel form element export).
3. Keep the outer `data-ghl-form="registration"` wrapper for QA selectors.
4. Style the embedded form with GHL’s form designer to match lime `#d3fd04` / dark glass fields if needed.

**Do not invent** form IDs, webhook URLs, or LeadConnector endpoints in code.

## Safety rules for GHL

- All markup lives inside `#ttf-app`.
- CSS is prefixed / scoped under `#ttf-app` — no global `body { }` resets in shipped CSS.
- JS initializes once (`__ttfAppInit`); safe to paste even if GHL reloads the block.
- No SPA router — all links are absolute production URLs.

## Smoke test after publish

1. Desktop hero: Wael Fathy / DECODING / SUCCESS + portrait.
2. Mobile ≤900px: burger opens / closes; dropdowns expand on tap.
3. Testimonials: three tabs render different cards.
4. Vlogs: click thumbnail → video element plays.
5. Registration slot: GHL form submits into the account CRM.
6. Ziko: single floating button; Arabic input flips RTL inside widget.
7. Footer social icons open correct profiles.

## Rollback

Keep the previous Custom Code contents in a note / Git commit. Replacing the Custom Code block restores the prior page instantly.
