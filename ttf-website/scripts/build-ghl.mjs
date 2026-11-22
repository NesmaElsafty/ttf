/**
 * Builds GoHighLevel deployment artifacts:
 *   dist/ghl-home.html        — HTML fragment (#ttf-app only)
 *   dist/ghl-home-inline.html — single file with inlined CSS + JS
 *   dist/ttf.css              — concatenated scoped stylesheet
 *   dist/ttf.js               — concatenated IIFE-safe scripts
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const componentsDir = path.join(root, 'src/components');
const stylesDir = path.join(root, 'src/styles');
const scriptsDir = path.join(root, 'src/scripts');

fs.mkdirSync(dist, { recursive: true });

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

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function readComponent(name) {
  return read(path.join(componentsDir, `${name}.html`)).trim();
}

const fragmentInner = ORDER.map((name) => {
  if (Array.isArray(name)) {
    const inner = name.map((n) => `  <!-- ${n} -->\n${readComponent(n)}`).join('\n\n');
    return `  <!-- about+partners band -->\n<div class="ttf-about-partners-band">\n${inner}\n</div>`;
  }
  return `  <!-- ${name} -->\n${readComponent(name)}`;
}).join('\n\n');

const fragment = `<div id="ttf-app">
${fragmentInner}
</div>
`;

const css = [
  'tokens.css',
  'base.css',
  'components.css',
  'responsive.css',
]
  .map((f) => `/* ===== ${f} ===== */\n${read(path.join(stylesDir, f))}`)
  .join('\n\n');

const js = [
  'navigation.js',
  'interactions.js',
  'main.js',
]
  .map((f) => `/* ===== ${f} ===== */\n${read(path.join(scriptsDir, f))}`)
  .join('\n\n');

const googleFonts =
  'https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;500;600;700&family=Roboto+Condensed:wght@300;400;700&display=swap';
const faCss =
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';

const inline = `<!-- Tech Titans Factory — GHL inline bundle -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="${googleFonts}" rel="stylesheet" />
<link rel="stylesheet" href="${faCss}" crossorigin="anonymous" referrerpolicy="no-referrer" />
<style id="ttf-css">
${css}
</style>
${fragment}
<script id="ttf-js">
${js}
</script>
`;

fs.writeFileSync(path.join(dist, 'ghl-home.html'), fragment, 'utf8');
fs.writeFileSync(path.join(dist, 'ghl-home-inline.html'), inline, 'utf8');
fs.writeFileSync(path.join(dist, 'ttf.css'), css, 'utf8');
fs.writeFileSync(path.join(dist, 'ttf.js'), js, 'utf8');

console.log('GHL build complete:');
console.log(' - dist/ghl-home.html');
console.log(' - dist/ghl-home-inline.html');
console.log(' - dist/ttf.css');
console.log(' - dist/ttf.js');
