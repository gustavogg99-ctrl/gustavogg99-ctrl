# Icons: sources and licenses

Logos and product names belong to their owners. They appear in this profile only to name tools I use (nominative use), without changes to the drawings. The source files are in `assets/icons/`; `scripts/build.mjs` places each one on a tool card in `assets/tools/`.

| Tool card | File | Source | License |
|---|---|---|---|
| Claude | `claude-color.svg` | [Lobe Icons](https://github.com/lobehub/lobe-icons) (`@lobehub/icons-static-svg` 1.106.0) | MIT |
| OpenAI API | `openai.svg` | Lobe Icons | MIT |
| Microsoft Copilot | `copilot-color.svg` | Lobe Icons | MIT |
| n8n | `n8n-color.svg` | Lobe Icons | MIT |
| Make | `make-color.svg` | Lobe Icons | MIT |
| Microsoft 365 | `microsoft-color.svg` (Microsoft logo) | Lobe Icons | MIT |
| Python | `python-original.svg` | [Devicon](https://devicon.dev) 2.18.0 | MIT ([license](../assets/icons/DEVICON-LICENSE.txt)) |
| TypeScript | `typescript-original.svg` | Devicon | MIT |
| Next.js | `nextjs-original.svg` | Devicon | MIT |
| Tailwind CSS | `tailwindcss-original.svg` | Devicon | MIT |
| Supabase | `supabase-original.svg` | Devicon | MIT |
| Git | `git-original.svg` | Devicon | MIT |
| Jira | `jira-original.svg` | Devicon | MIT |
| Vercel | `vercel.svg` | [Simple Icons](https://simpleicons.org) 16.38.1 | CC0 ([license](../assets/icons/SIMPLE-ICONS-LICENSE.md)) |
| Cloudflare Workers | `cloudflareworkers.svg` | Simple Icons | CC0 |
| GitHub Actions | `githubactions.svg` | Simple Icons | CC0 |
| GitHub | `github.svg` | Simple Icons | CC0 |
| WhatsApp API | `whatsapp.svg` | Simple Icons | CC0 |

Lobe Icons is MIT licensed, Copyright (c) LobeHub. See https://github.com/lobehub/lobe-icons/blob/master/LICENSE.

## Cards without a logo

- **Copilot Studio, Power Automate, ServiceNow:** none of the three open icon sets above includes them. They use a typographic card until official icons are added from Microsoft's product icon downloads and ServiceNow's brand resources, respecting each owner's terms.
- **ISO/IEC 27001, ISO/IEC 42001, LGPD, NIST AI RMF, ITIL 4, COBIT, EU AI Act:** frameworks and laws, not products. They get typographic cards on purpose. No seal or certification mark is drawn.

## Adding a tool

1. Put the source SVG in `assets/icons/` and add a row above (source, version, license).
2. Add an entry to `TOOLS` in `scripts/build.mjs`.
3. Run `node scripts/build.mjs` and `node scripts/validate.mjs`, then add the card to both READMEs.
