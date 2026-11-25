# Maintaining the profile README

All artwork is generated. Edit the sources below, run two commands, commit the result.

```bash
node scripts/build.mjs      # rebuilds assets/tools, assets/buttons, heroes, footers and project cards
node scripts/validate.mjs   # checks both READMEs and every generated SVG
```

No dependencies: Node 18+ is enough. Both scripts work offline.

## Files

| Path | What it is | Edit by hand? |
| --- | --- | --- |
| `README.md` | English README (primary language) | yes |
| `README.pt.md` | Portuguese README (secondary), linked at the top of both files | yes |
| `scripts/build.mjs` | Generator: copy per language (`I18N`), tool list (`TOOLS`), buttons (`BUTTONS`), palette | yes |
| `scripts/validate.mjs` | Checks links, anchors, alt text, motion, icon credits and EN/PT parity | rarely |
| `assets/icons/` | Vendored logos with their licenses (see `docs/ICONS.md`) | only to add or replace a logo |
| `assets/hero-*.svg`, `footer-*.svg`, `buttons/`, `tools/`, and the `projects/*-en.svg` / `*-pt.svg` cards | Generated | no, run the build |
| `assets/projects/*.png`, `*.gif` | Screenshots and the demo replay (in English, shared by both READMEs) | yes |

## File naming

Language-bound art ends in `-en` or `-pt` (`hero-pt.svg`, `buttons/code-pt.svg`, `tools/lgpd-pt.svg`). Tool cards whose text is the same in both languages have no suffix and are shared (`tools/claude.svg`). The validator rejects English art in the PT README and the reverse.

## Common changes

**Change copy in a banner, card or button.** Edit the matching entry in `I18N` in `scripts/build.mjs`, in both `en` and `pt`. Mind the width: card subtitles fit about 80 characters, metric labels about 24, audit log values about 24.

**Add or change a project.** Add an object to `projects` in both languages (same order), add the section to both READMEs with the same links and numbers, then build. Only publish what the repository proves; no client numbers or client cases.

**Add a tool.** Add it to `TOOLS` in `scripts/build.mjs`. With a logo: drop the SVG into `assets/icons/`, set `icon`, and list it in `docs/ICONS.md` with source and license (the validator fails if it is missing). Without an official logo, use `mono` for a typographic card; never fake a seal. If the card has a `small` caption, add its translation under `small` in both languages. Then add the `<img>` and the plain-text name to both READMEs.

**Add a button.** Add the id to `BUTTONS` and its label to `buttons` in both languages. The second item in the pair marks the primary (silver) style.

**Update "Now".** Edit the code block in both READMEs. Keep the same lines in the same order.

## What the validator enforces

- Relative links and `#anchors` resolve; external links use `https:` or `mailto:`.
- Every `<img>` and Markdown image has alt text.
- No `<script>`, `<style>`, `<iframe>` or `onclick` (GitHub strips them).
- Only the heroes animate, and they honor `prefers-reduced-motion`.
- Every SVG has a `<title>`; no external references inside SVGs.
- Every file in `assets/icons/` is credited in `docs/ICONS.md`.
- **EN/PT parity:** same heading structure, same external links (the policy button may point to the matching language file), same numbers, same art after ignoring the language suffix, and a language link at the top of each README.

Parity does not check meaning. Read the PT text against the EN text after any edit.

## Rules

- English is the primary language; Portuguese must keep the same scope, links and numbers.
- Only the hero banner animates.
- Essential text is never only inside an SVG: the Markdown repeats it.
- Never use the timed Autoria test as a "time saved" claim (one sample, no conclusion).
- Logos are trademarks of their owners and only identify the tool. Do not alter them.
- Images are served from the repository, and GitHub caches them for a few minutes. After a push, a hard refresh shows the new art.
- Changes go through a pull request that GG reviews; nothing is edited directly on `main`.
