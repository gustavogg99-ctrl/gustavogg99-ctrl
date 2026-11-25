// Checks the READMEs and generated art. No browser or network. Run: node scripts/validate.mjs
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const errors = [];
const fail = (m) => errors.push(m);
const anchor = (t) => t.trim().toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/ /g, '-');

const readmes = ['README.md', 'README.pt.md'].filter((f) => existsSync(resolve(root, f)));
for (const name of readmes) {
  const text = readFileSync(resolve(root, name), 'utf8');
  const headings = new Set([...text.matchAll(/^#{1,6} (.+)$/gm)].map((m) => anchor(m[1])));
  const targets = [...text.matchAll(/(?:\]\(|(?:src|srcset|href)=")([^")]+)/g)].map((m) => m[1]);
  for (const t of targets) {
    if (t.startsWith('#')) { if (!headings.has(t.slice(1))) fail(`${name}: missing anchor ${t}`); }
    else if (!/^(https:|mailto:)/.test(t)) { if (!existsSync(resolve(root, t.split('#')[0]))) fail(`${name}: missing file ${t}`); }
  }
  for (const m of text.matchAll(/<img\b[^>]*>/g)) if (!/alt="[^"]+"/.test(m[0])) fail(`${name}: <img> without alt: ${m[0].slice(0, 80)}`);
  for (const m of text.matchAll(/!\[([^\]]*)\]\(/g)) if (!m[1].trim()) fail(`${name}: markdown image without alt text`);
  if (/<script|<style|<iframe|onclick=/i.test(text)) fail(`${name}: executable markup is stripped by GitHub`);
  if ((text.match(/```/g) || []).length % 2) fail(`${name}: unclosed code fence`);
  if ((text.match(/<details>/g) || []).length !== (text.match(/<\/details>/g) || []).length) fail(`${name}: unbalanced <details>`);
  if (/http:\/\//.test(text)) fail(`${name}: plain http link`);
}

// Every generated SVG has a title, and only the hero animates.
const walk = (d) => readdirSync(resolve(root, d), { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(`${d}/${e.name}`) : [`${d}/${e.name}`]));
for (const f of walk('assets').filter((f) => f.endsWith('.svg') && !f.startsWith('assets/icons/'))) {
  const s = readFileSync(resolve(root, f), 'utf8');
  if (!/<title id="t">[^<]+<\/title>/.test(s)) fail(`${f}: missing <title>`);
  if (/@keyframes/.test(s) && !/prefers-reduced-motion/.test(s)) fail(`${f}: animation without reduced-motion fallback`);
  if (/@keyframes/.test(s) && !/^assets\/hero-/.test(f)) fail(`${f}: only the hero may animate`);
  if (/<script|href="http/.test(s)) fail(`${f}: script or external reference inside SVG`);
}

// Every vendored icon is listed in docs/ICONS.md.
const icons = readFileSync(resolve(root, 'docs/ICONS.md'), 'utf8');
for (const f of readdirSync(resolve(root, 'assets/icons')).filter((f) => f.endsWith('.svg'))) if (!icons.includes(`\`${f}\``)) fail(`assets/icons/${f}: not listed in docs/ICONS.md`);

if (errors.length) { console.error(errors.map((e) => `✗ ${e}`).join('\n')); process.exit(1); }
console.log(`✓ ${readmes.join(', ')} and generated SVGs passed.`);
