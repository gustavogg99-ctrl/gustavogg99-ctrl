// Profile README artwork. Dependency-free: reads only assets/icons/ and writes SVGs.
// Run: node scripts/build.mjs   (then: node scripts/validate.mjs)
import { mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../assets/', import.meta.url));
for (const dir of ['tools', 'buttons']) {
  rmSync(`${root}${dir}`, { recursive: true, force: true }); // generated folders: rebuilt from scratch
  mkdirSync(`${root}${dir}`, { recursive: true });
}
mkdirSync(`${root}projects`, { recursive: true });

// Palette = Portfolio design tokens (dark), plus one muted "pass" signal.
const c = {
  bg: '#0a0a0a', surface: '#141414', surface2: '#1c1c1c', border: '#2a2a2a', line: '#3a3a3a',
  fg: '#ededed', muted: '#8a8a8a', dim: '#5c5c5c', silverFrom: '#e5e5e5', silverTo: '#9ca3af',
  accent: '#d4d4d4', pass: '#7ee2a8', tile: '#f4f4f5',
};
const SANS = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif";
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";
const esc = (s) => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const defs = `<defs>
<linearGradient id="silver" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c.silverFrom}"/><stop offset="1" stop-color="${c.silverTo}"/></linearGradient>
<linearGradient id="silverU" gradientUnits="userSpaceOnUse" x1="30" y1="0" x2="560" y2="0"><stop offset="0" stop-color="${c.silverFrom}"/><stop offset="1" stop-color="${c.silverTo}"/></linearGradient>
<radialGradient id="glow" cx="0.12" cy="0" r="0.9"><stop offset="0" stop-color="#ffffff" stop-opacity=".07"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
<pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#ffffff" stroke-opacity=".035"/></pattern>
</defs>`;

const svg = (w, h, title, desc, body, style = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-labelledby="t d"><title id="t">${esc(title)}</title><desc id="d">${esc(desc)}</desc>${defs}${style}<g font-family="${SANS}" fill="${c.fg}">${body}</g></svg>\n`;
const save = (path, content) => writeFileSync(`${root}${path}`, content);

/**
 * Typewriter that cycles words. Pure CSS with step-end keyframes (no clip-path, no JS).
 * Each character is its own <text> on a monospace grid, so the cursor position is exact.
 * With prefers-reduced-motion the first word is shown, static.
 */
function typewriter({ x, y, words, size, charW, cycle = 12, cursorH }) {
  const slot = 100 / words.length, typeStep = 2.2, eraseStep = 0.6;
  const pct = (v) => `${Math.max(0, Math.min(100, v)).toFixed(2)}%`;
  const restX = words[0].length * charW;
  let css = '', els = '';
  const frames = [];
  words.forEach((word, wi) => {
    const s = wi * slot, n = word.length, eraseStart = s + slot - n * eraseStep - 1;
    frames.push([s, 0]);
    [...word].forEach((ch, ci) => {
      const on = s + (ci + 1) * typeStep, off = eraseStart + (n - ci - 1) * eraseStep;
      frames.push([on, ci + 1], [off, ci]);
      const id = `w${wi}c${ci}`;
      css += `.${id}{animation:${id} ${cycle}s step-end infinite}@keyframes ${id}{0%{opacity:0}${pct(on)}{opacity:1}${pct(off)}{opacity:0}100%{opacity:0}}`;
      els += `<text class="${id}" x="${(x + ci * charW).toFixed(1)}" y="${y}" font-size="${size}" font-weight="700" font-family="${MONO}" fill="url(#silverU)" opacity="${wi === 0 ? 1 : 0}">${esc(ch)}</text>`;
    });
  });
  frames.sort((a, b) => a[0] - b[0]);
  // The cursor group sits at the end of the first word (reduced-motion state); keyframes move it relative to that.
  css += `.tw-cursor{animation:twc ${cycle}s step-end infinite,blink 1s step-end infinite}@keyframes twc{${frames.map(([p, k]) => `${pct(p)}{transform:translateX(${(k * charW - restX).toFixed(1)}px)}`).join('')}100%{transform:translateX(${(-restX).toFixed(1)}px)}}@keyframes blink{50%{opacity:0}}`;
  css += `@media (prefers-reduced-motion: reduce){[class^="w"],.tw-cursor{animation:none!important}}`;
  const h = cursorH ?? Math.round(size * 0.78);
  els += `<g transform="translate(${restX.toFixed(1)} 0)"><rect class="tw-cursor" x="${x + 4}" y="${y - h}" width="${Math.round(size * 0.12)}" height="${h}" fill="${c.accent}"/></g>`;
  return { css: `<style>${css}</style>`, els };
}

const WORDS = ['SECURE', 'TESTED', 'AUDITABLE'];
// Each line is a control that exists in a public project below.
const AUDIT = [
  ['guardrail', 'stricter decision wins'],
  ['review', 'a person approves replies'],
  ['logging', 'sensitive values redacted'],
  ['tests', 'CI on every pull request'],
  ['policy', 'ISO/IEC 42001 · LGPD'],
];
function auditPanel(x, y, w, rowH = 30) {
  const h = 54 + AUDIT.length * rowH + 8;
  let b = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${c.surface}" stroke="${c.border}"/>`;
  b += `<text x="${x + 20}" y="${y + 30}" font-family="${MONO}" font-size="11" letter-spacing="2" fill="${c.muted}">AUDIT LOG</text>`;
  b += `<text x="${x + w - 20}" y="${y + 30}" text-anchor="end" font-family="${MONO}" font-size="11" letter-spacing="1" fill="${c.pass}">5/5 PASS</text>`;
  b += `<path d="M${x + 20} ${y + 42}H${x + w - 20}" stroke="${c.border}"/>`;
  AUDIT.forEach(([k, v], i) => {
    const ry = y + 66 + i * rowH;
    b += `<text x="${x + 20}" y="${ry}" font-family="${MONO}" font-size="13" fill="${c.pass}">✓</text>`;
    b += `<text x="${x + 40}" y="${ry}" font-family="${MONO}" font-size="13" fill="${c.fg}">${esc(k)}</text>`;
    b += `<text x="${x + 122}" y="${ry}" font-family="${MONO}" font-size="12" fill="${c.muted}">${esc(v)}</text>`;
  });
  return b;
}
const frame = (w, h) => `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="18" fill="${c.bg}" stroke="${c.border}"/>
<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="18" fill="url(#grid)"/>
<rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="18" fill="url(#glow)"/>
<circle cx="30" cy="27" r="5" fill="${c.line}"/><circle cx="48" cy="27" r="5" fill="${c.line}"/><circle cx="66" cy="27" r="5" fill="${c.line}"/>
<path d="M18 50H${w - 18}" stroke="${c.border}"/>`;
const HERO_TITLE = 'Gustavo Rodrigues: I build AI that is secure, tested, auditable';

// ---------- Hero, desktop 960×420 ----------
{
  const W = 960, H = 420;
  const tw = typewriter({ x: 44, y: 216, words: WORDS, size: 52, charW: 31.2, cursorH: 40 });
  save('hero-en.svg', svg(W, H, HERO_TITLE, 'Dark console banner. The last word of the headline is typed in a loop: secure, tested, auditable. An audit log panel lists five controls used in the projects below.', `${frame(W, H)}
<text x="${W / 2}" y="31" text-anchor="middle" font-family="${MONO}" font-size="12" letter-spacing="1.6" fill="${c.muted}">gg@governance:~ / AI BUILDER PROFILE</text>
<text x="44" y="94" font-family="${MONO}" font-size="12" letter-spacing="2.4" fill="${c.muted}">BRASÍLIA, BRAZIL // AI THAT SHIPS WITH EVIDENCE</text>
<text x="40" y="152" font-size="54" font-weight="700" letter-spacing="-1" fill="url(#silver)">I BUILD AI THAT IS</text>
${tw.els}
<text x="44" y="262" font-size="19" fill="${c.fg}">Gustavo Rodrigues · AI Builder · AI Governance</text>
<rect x="44" y="290" width="540" height="64" rx="10" fill="${c.surface}" stroke="${c.border}"/>
<text x="62" y="316" font-family="${MONO}" font-size="12" fill="${c.muted}">$ cat pattern.txt</text>
<text x="62" y="340" font-family="${MONO}" font-size="14" fill="${c.fg}">LLM decides · code applies · tests gate the release</text>
${auditPanel(604, 96, 322)}
<text x="44" y="392" font-family="${MONO}" font-size="11" letter-spacing="1.6" fill="${c.muted}">APPLIED AI · AUTOMATION · AI SECURITY &amp; GOVERNANCE</text>
<text x="${W - 40}" y="392" text-anchor="end" font-family="${MONO}" font-size="11" letter-spacing="1" fill="${c.dim}">github.com/gustavogg99-ctrl</text>`, tw.css));
}

// ---------- Hero, mobile 600×640 ----------
{
  const W = 600, H = 640;
  const tw = typewriter({ x: 34, y: 232, words: WORDS, size: 46, charW: 27.6, cursorH: 36 });
  save('hero-en-mobile.svg', svg(W, H, HERO_TITLE, 'Mobile banner with the typed headline and the audit log panel.', `${frame(W, H)}
<text x="${W / 2}" y="31" text-anchor="middle" font-family="${MONO}" font-size="12" letter-spacing="1.4" fill="${c.muted}">gg@governance:~</text>
<text x="34" y="92" font-family="${MONO}" font-size="12" letter-spacing="2.2" fill="${c.muted}">BRASÍLIA, BRAZIL</text>
<text x="32" y="150" font-size="50" font-weight="700" letter-spacing="-1" fill="url(#silver)">I BUILD AI</text>
<text x="32" y="188" font-size="34" font-weight="700" letter-spacing="-.5" fill="url(#silver)">THAT IS</text>
${tw.els}
<text x="34" y="278" font-size="20" fill="${c.fg}">Gustavo Rodrigues</text>
<text x="34" y="306" font-size="17" fill="${c.muted}">AI Builder · AI Governance</text>
<text x="34" y="352" font-family="${MONO}" font-size="13" fill="${c.fg}">LLM decides · code applies · tests gate</text>
${auditPanel(34, 386, W - 68)}`, tw.css));
}

// ---------- Footer 960×120 ----------
save('footer-en.svg', svg(960, 120, 'Ship with evidence.', 'Closing banner: tests, controls and documentation.', `<rect x="1" y="1" width="958" height="118" rx="16" fill="${c.bg}" stroke="${c.border}"/>
<rect x="1" y="1" width="958" height="118" rx="16" fill="url(#grid)"/><rect x="1" y="1" width="958" height="118" rx="16" fill="url(#glow)"/>
<text x="40" y="56" font-size="26" font-weight="700" fill="url(#silver)">ship with evidence.</text>
<text x="40" y="86" font-size="14" fill="${c.muted}">Tests, controls and documentation, in the open.</text>
<text x="920" y="56" text-anchor="end" font-family="${MONO}" font-size="12" fill="${c.pass}">$ exit 0</text>
<text x="920" y="86" text-anchor="end" font-family="${MONO}" font-size="11" letter-spacing="1.4" fill="${c.dim}">GG · BRASÍLIA, BRAZIL</text>`));

// ---------- Project cards 960×128 ----------
const PROJECTS = [
  { file: 'support-agent-en', index: '01', tag: 'AI AGENT · PROTOTYPE', title: 'Support Agent Governance Prototype',
    subtitle: 'An LLM triages tickets, rules act as a guardrail, a person approves.', metric: '0 / 21', metricLabel: 'unsafe auto-replies' },
  { file: 'autoria-em-forma-en', index: '02', tag: 'AI PIPELINE · LAUNCHED, PAUSED', title: 'Autoria em Forma',
    subtitle: 'ABNT thesis formatting: AI decides what to fix, code applies it.', metric: '41 / 41', metricLabel: 'regression checks' },
  { file: 'ai-policy-en', index: '03', tag: 'AI GOVERNANCE · TEMPLATE', title: 'Corporate AI Use Policy',
    subtitle: 'An adoptable policy template, plus a vendor risk procedure.', metric: 'EN / PT', metricLabel: 'v2.1 · CC BY 4.0' },
  { file: 'portfolio-en', index: '04', tag: 'WEBSITE · LIVE', title: 'Portfolio',
    subtitle: 'Next.js on Vercel, built part by part with documented decisions.', metric: '38', metricLabel: 'parts, one PR each' },
];
for (const p of PROJECTS) {
  const W = 960, H = 128;
  save(`projects/${p.file}.svg`, svg(W, H, p.title, `${p.subtitle} ${p.metric} ${p.metricLabel}.`, `<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="${c.surface}" stroke="${c.border}"/>
<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="14" fill="url(#glow)"/>
<path d="M22 28V100" stroke="url(#silver)" stroke-width="3" stroke-linecap="round"/>
<text x="44" y="36" font-family="${MONO}" font-size="12" letter-spacing="2" fill="${c.muted}">${esc(p.index)} / ${esc(p.tag)}</text>
<text x="43" y="76" font-size="30" font-weight="700" letter-spacing="-.5" fill="url(#silver)">${esc(p.title)}</text>
<text x="44" y="104" font-size="16" fill="${c.muted}">${esc(p.subtitle)}</text>
<rect x="${W - 214}" y="24" width="190" height="80" rx="12" fill="${c.bg}" stroke="${c.border}"/>
<text x="${W - 119}" y="66" text-anchor="middle" font-family="${MONO}" font-size="28" font-weight="700" fill="${c.fg}">${esc(p.metric)}</text>
<text x="${W - 119}" y="88" text-anchor="middle" font-family="${MONO}" font-size="11" letter-spacing=".6" fill="${c.muted}">${esc(p.metricLabel)}</text>`));
}

// ---------- Tool cards 160×64 ----------
// icon: file in assets/icons/ (sources and licenses in docs/ICONS.md). mono: monogram card, no logo.
const TOOLS = [
  // Applied AI
  { id: 'claude', name: ['Claude'], icon: 'claude-color.svg' },
  { id: 'openai', name: ['OpenAI API'], icon: 'openai.svg', color: '#111111' },
  { id: 'copilot', name: ['Microsoft', 'Copilot'], icon: 'copilot-color.svg' },
  { id: 'copilot-studio', name: ['Copilot', 'Studio'], mono: 'CS' },
  { id: 'n8n', name: ['n8n'], icon: 'n8n-color.svg' },
  { id: 'make', name: ['Make'], icon: 'make-color.svg' },
  { id: 'power-automate', name: ['Power', 'Automate'], mono: 'PA' },
  // Engineering
  { id: 'python', name: ['Python'], icon: 'python-original.svg' },
  { id: 'typescript', name: ['TypeScript'], icon: 'typescript-original.svg' },
  { id: 'nextjs', name: ['Next.js'], icon: 'nextjs-original.svg' },
  { id: 'tailwindcss', name: ['Tailwind CSS'], icon: 'tailwindcss-original.svg' },
  { id: 'vercel', name: ['Vercel'], icon: 'vercel.svg' },
  { id: 'cloudflare-workers', name: ['Cloudflare', 'Workers'], icon: 'cloudflareworkers.svg' },
  { id: 'supabase', name: ['Supabase'], icon: 'supabase-original.svg' },
  { id: 'github-actions', name: ['GitHub', 'Actions'], icon: 'githubactions.svg' },
  { id: 'git', name: ['Git'], icon: 'git-original.svg' },
  { id: 'github', name: ['GitHub'], icon: 'github.svg' },
  { id: 'whatsapp', name: ['WhatsApp API'], icon: 'whatsapp.svg' },
  { id: 'servicenow', name: ['ServiceNow'], mono: 'SN' },
  { id: 'jira', name: ['Jira'], icon: 'jira-original.svg' },
  { id: 'microsoft-365', name: ['Microsoft 365'], icon: 'microsoft-color.svg' },
  // Security & governance: frameworks have no official logo here, so they get typographic cards.
  { id: 'iso-27001', name: ['ISO/IEC 27001'], mono: '27001', small: 'info security' },
  { id: 'iso-42001', name: ['ISO/IEC 42001'], mono: '42001', small: 'AI management' },
  { id: 'lgpd', name: ['LGPD'], mono: 'LGPD', small: 'data protection' },
  { id: 'nist-ai-rmf', name: ['NIST AI RMF'], mono: 'RMF', small: 'AI risk' },
  { id: 'itil-4', name: ['ITIL 4'], mono: 'ITIL', small: 'IT service mgmt' },
  { id: 'cobit', name: ['COBIT'], mono: 'COBIT', small: 'conceptual' },
  { id: 'eu-ai-act', name: ['EU AI Act'], mono: 'EU', small: 'conceptual' },
];
function inlineIcon(file, x, y, size, color) {
  const src = readFileSync(`${root}icons/${file}`, 'utf8').replace(/<\?xml[^>]*>/, '');
  const open = src.match(/<svg\b[^>]*>/)[0];
  const viewBox = (open.match(/viewBox="([^"]+)"/) || [])[1] || '0 0 24 24';
  const inner = src.slice(src.indexOf(open) + open.length, src.lastIndexOf('</svg>')).replace(/<title>.*?<\/title>/s, '');
  const prefix = file.replace(/\W/g, '');
  const scoped = inner.replace(/id="([^"]+)"/g, `id="${prefix}-$1"`).replace(/url\(#([^)]+)\)/g, `url(#${prefix}-$1)`).replace(/href="#([^"]+)"/g, `href="#${prefix}-$1"`);
  return `<svg x="${x}" y="${y}" width="${size}" height="${size}" viewBox="${viewBox}" color="${color || '#111111'}" fill="${color || '#111111'}">${scoped}</svg>`;
}
for (const t of TOOLS) {
  const W = 160, H = 64, label = t.name.join(' ');
  let body = `<rect x="1" y="1" width="${W - 2}" height="${H - 2}" rx="10" fill="${c.surface}" stroke="${c.border}"/>`;
  if (t.icon) {
    body += `<rect x="9" y="10" width="44" height="44" rx="9" fill="${c.tile}"/>` + inlineIcon(t.icon, 17, 18, 28, t.color);
  } else {
    const fs = t.mono.length > 4 ? 11 : t.mono.length > 2 ? 13 : 16;
    body += `<rect x="9.5" y="10.5" width="43" height="43" rx="9" fill="${c.surface2}" stroke="${c.line}"/><text x="31" y="${32 + fs * 0.36}" text-anchor="middle" font-family="${MONO}" font-size="${fs}" font-weight="700" fill="url(#silver)">${esc(t.mono)}</text>`;
  }
  const lines = t.small ? [...t.name] : t.name;
  const startY = t.small ? 30 : lines.length === 2 ? 30 : 37;
  lines.forEach((ln, i) => { body += `<text x="64" y="${startY + i * 17}" font-size="13" font-weight="600" fill="${c.fg}">${esc(ln)}</text>`; });
  if (t.small) body += `<text x="64" y="${startY + 17}" font-size="10.5" fill="${c.muted}">${esc(t.small)}</text>`;
  save(`tools/${t.id}.svg`, svg(W, H, label, t.icon ? `${label} logo` : `${label} (no logo)`, body));
}

// ---------- Buttons ----------
const BUTTONS = [
  ['code', 'View code', true], ['results', 'Results'], ['live', 'Live site', true], ['policy', 'Read the policy', true],
  ['portfolio', 'Portfolio', true], ['linkedin', 'LinkedIn'], ['email', 'Email'], ['blog', 'Blog'],
];
for (const [id, label, primary] of BUTTONS) {
  const w = Math.ceil(label.length * 7.4 + 54), H = 40;
  const bg = primary ? c.silverFrom : c.surface2, fg = primary ? '#0a0a0a' : c.fg, st = primary ? c.silverFrom : c.line;
  save(`buttons/${id}-en.svg`, svg(w, H, label, `${label} link`, `<rect x="1" y="4" width="${w - 2}" height="32" rx="8" fill="${bg}" stroke="${st}"/>
<text x="${(w - 18) / 2}" y="25" text-anchor="middle" font-size="13" font-weight="600" fill="${fg}">${esc(label)}</text>
<path d="m${w - 24} 15 5 5-5 5m-6-5h11" fill="none" stroke="${fg}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`));
}

const count = (d) => readdirSync(`${root}${d}`).length;
console.log(`Built: 2 heroes, footer, ${PROJECTS.length} project cards, ${count('tools')} tool cards, ${count('buttons')} buttons.`);
