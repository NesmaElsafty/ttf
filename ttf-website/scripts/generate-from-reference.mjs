import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const ref = path.resolve(root, '../reference');
const comp = path.join(root, 'src/components');
const stylesDir = path.join(root, 'src/styles');
const scriptsDir = path.join(root, 'src/scripts');

for (const d of [comp, stylesDir, scriptsDir, path.join(root, 'public/images'), path.join(root, 'dist')]) {
  fs.mkdirSync(d, { recursive: true });
}

function clean(html = '') {
  return html
    .replace(/data-cursor-ref="[^"]*"/g, '')
    .replace(/<meta[^>]*>/gi, '')
    .replace(/<title>[^<]*<\/title>/gi, '')
    .replace(/<link[^>]*fonts\.googleapis[^>]*>/gi, '')
    .replace(/&amp;/g, '&')
    .trim();
}

function splitHtml(html = '') {
  const styles = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join('\n');
  const scripts = [...html.matchAll(/<script(?![^>]*type=["']module["'])[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1])
    .join('\n');
  const modules = [...html.matchAll(/<script[^>]*type=["']module["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => m[1])
    .join('\n');
  let body = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<link[^>]*>/gi, '');
  body = clean(body);
  return { styles: clean(styles), scripts: clean(scripts), modules: clean(modules), body };
}

const read = (name) => {
  const p = path.join(ref, name);
  return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
};

const styleFiles = {
  header: read('style-12.css'),
  crystal: read('style-13.css'),
  partners: read('style-14.css'),
  testimonials: read('style-15.css'),
  vlogs: read('style-16.css'),
  programs: read('style-17.css'),
  newsletter: read('style-18.css'),
  cta: read('style-19.css'),
  footer: read('style-20.css'),
};

const blocks = {
  vlogs: splitHtml(read('cc4.html')),
  programs: splitHtml(read('cc5.html')),
  newsletter: splitHtml(read('cc6.html')),
  registration: splitHtml(read('cc7.html')),
  footer: splitHtml(read('cc8.html')),
  registrationMobile: splitHtml(read('cc9.html')),
  ziko: splitHtml(read('cc10.html')),
  footerMobile: splitHtml(read('cc11.html')),
};

// Persist extracted pieces for manual component writing
const outMeta = path.join(ref, 'assembled');
fs.mkdirSync(outMeta, { recursive: true });
fs.writeFileSync(
  path.join(outMeta, 'meta.json'),
  JSON.stringify(
    {
      styleKeys: Object.keys(styleFiles),
      blockKeys: Object.keys(blocks),
      lengths: Object.fromEntries(
        Object.entries(blocks).map(([k, v]) => [k, { body: v.body.length, styles: v.styles.length, scripts: v.scripts.length }]),
      ),
    },
    null,
    2,
  ),
);

for (const [k, v] of Object.entries(blocks)) {
  fs.writeFileSync(path.join(outMeta, `${k}.body.html`), v.body);
  if (v.scripts) fs.writeFileSync(path.join(outMeta, `${k}.js`), v.scripts);
  if (v.modules) fs.writeFileSync(path.join(outMeta, `${k}.module.js`), v.modules);
  if (v.styles) fs.writeFileSync(path.join(outMeta, `${k}.css`), v.styles);
}

for (const [k, v] of Object.entries(styleFiles)) {
  if (v) fs.writeFileSync(path.join(outMeta, `style-${k}.css`), v);
}

console.log('Assembled reference pieces to', outMeta);
