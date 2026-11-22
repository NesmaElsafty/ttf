/**
 * Assembles src/index.html from component partials.
 * Component files under src/components/ are the source of truth.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const componentsDir = path.join(root, 'src/components');
const outFile = path.join(root, 'src/index.html');

const ORDER = [
  'header',
  'hero',
  ['about', 'partners'],
  'testimonials',
  'vlogs',
  'marketing-team',
  'programs',
  'newsletter',
  'cta',
  'footer',
  'ziko',
];

function readComponent(name) {
  const file = path.join(componentsDir, `${name}.html`);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing component: ${file}`);
  }
  return fs.readFileSync(file, 'utf8').trim();
}

const body = ORDER.map((name) => {
  if (Array.isArray(name)) {
    const inner = name.map((n) => `    <!-- ${n} -->\n${readComponent(n)}`).join('\n\n');
    return `    <!-- about+partners band -->\n<div class="ttf-about-partners-band">\n${inner}\n</div>`;
  }
  return `    <!-- ${name} -->\n${readComponent(name)}`;
}).join('\n\n');

const html = `<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tech Titans Factory</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;500;600;700&family=Roboto+Condensed:wght@100;300;400;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="/styles/tokens.css" />
    <link rel="stylesheet" href="/styles/base.css" />
    <link rel="stylesheet" href="/styles/components.css" />
    <link rel="stylesheet" href="/styles/responsive.css" />
    <style>
      /* Local preview only — does not ship into GHL scoped CSS */
      html, body { margin: 0; padding: 0; background: #1b2029; }
    </style>
  </head>
  <body>
    <div id="ttf-app">
${body}
    </div>
    <script type="module" src="/scripts/entry.js"></script>
  </body>
</html>
`;

fs.writeFileSync(outFile, html, 'utf8');
console.log('Assembled', outFile);
