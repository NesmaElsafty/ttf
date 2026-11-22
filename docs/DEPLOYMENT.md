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

## Registration form (Lead Connector webhook)

The form under `[data-ghl-form="registration"]` submits to the webhook copied from
`reference/assembled/registration.js` (location `9LHVl0sw8gABEkuoMC1s`).

Payload:

```json
{ "name": "...", "email": "...", "whatsapp": "...", "source": "TTF Glass CTA (no-bg)" }
```

### Configure in GHL

1. Open **Automations → Webhooks** (or the workflow that owns trigger `28d257a9-5c8b-42fd-9279-3d3e72166ef7`).
2. Confirm the trigger is active and maps `name` / `email` / `whatsapp`.
3. If you rotate the webhook, update `data-ghl-webhook` on `#ttfns-form` and rebuild.
4. **Optional:** replace the entire `<form id="ttfns-form">` with a native GHL Form embed inside the same slot. The JS skips handlers when a native embed is detected.

Success messaging appears only after a successful HTTP response. Local Vite preview may succeed at the network layer but **does not prove CRM contact creation**.

## Safety rules for GHL

- All markup lives inside `#ttf-app`.
- CSS is scoped under `#ttf-app` — no global `body { }` resets in shipped CSS.
- JS waits for `#ttf-app` (bounded ~5s retry) then bootstraps once per root (`__ttfBootstrapped`).
- Ziko double-init guarded (`__ttfZikoInit` / `__ttfZikoStarted`).
- No SPA router — all links are absolute production URLs.

## Smoke test after publish

1. Desktop hero: Wael Fathy / DECODING / SUCCESS + portrait.
2. Mobile ≤900px: burger opens / closes; dropdowns expand on tap.
3. Testimonials: three tabs render different cards; Real Feedback plays HTML5 video.
4. Vlogs: click thumbnail → video element plays.
5. Registration: submit a test lead; confirm contact/workflow in GHL.
6. Ziko: single floating button; Arabic input flips RTL inside widget.
7. Footer social icons open correct profiles.

## Rollback

Keep the previous Custom Code contents in a note / Git commit. Replacing the Custom Code block restores the prior page instantly.
