# Wajid Kanwar Abdul 万吉 — portfolio

A bilingual (English / 简体中文) portfolio site for an AI full-stack engineer.
Dark, dense, animated: spotlight hero, bento grid, pointer-tracking project
cards with full case studies, an animated experience rail, skill meters that
fill on scroll, and a contact block with one-tap copy for every channel.

**Live:** https://syluszephyr.github.io/Portfolio/

## Stack

| | |
| --- | --- |
| Framework | Next.js 16 (App Router, static export) |
| Styling | Tailwind CSS 4 — tokens live in `app/globals.css` under `@theme` |
| Animation | Motion (Framer Motion v12) |
| Icons | lucide-react |
| Hosting | GitHub Pages, deployed by Actions |

No WebGL, no canvas, no 3D runtime. Every effect is CSS, SVG or a transform
driven by a motion value, so the site renders identically on a four-year-old
laptop and never drops frames on integrated graphics.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

Node 20+. `npm run build` writes a fully static `out/` — no server needed.

## Editing the content

**All copy lives in two files that share one shape:** `content/en.ts` and
`content/zh.ts`, typed by `content/types.ts`. TypeScript will tell you if the
two languages drift apart, so a change made in one language cannot be forgotten
in the other.

| What | Where |
| --- | --- |
| Name, role, contact details, target roles and cities | `profile` |
| Hero eyebrow, headline, sub-heading, the four stat tiles | `hero` |
| Bento cards, the five-step chain, the pull quote | `about` |
| Projects — one card plus one full case study each | `projects.items` |
| Jobs and media work on the timeline | `experience.items` |
| Skill groups and self-assessed levels | `skills.groups` |
| Competition awards and the governance report | `awards.items` |
| Degree, course results, languages | `awards.education` |
| Contact copy and footer | `contact`, `footer` |

Adding a language: copy either file, translate it, and register it in
`content/index.ts` and `LANGUAGES`. Nothing else needs to know it exists.

Chinese text uses the system CJK stack (PingFang SC, Microsoft YaHei, Noto Sans
CJK) rather than a downloaded webfont, so Chinese visitors pay no font cost.

Drop a new `public/resume.pdf` to replace the downloadable CV.

## Structure

```
app/
  layout.tsx          fonts, metadata, language provider
  page.tsx            section order
  globals.css         design tokens, keyframes, utilities
components/
  ui/                 Nav, Spotlight, TiltCard, Marquee, MagicButton,
                      Reveal, SectionHeading, ScrollProgress
  sections/           Hero, About, Work, Experience, Skills, Awards, Contact
content/              en.ts, zh.ts, types.ts — the only files copy lives in
lib/
  i18n.tsx            language context, persistence, browser-locale default
  utils.ts            cn() and asset() for the Pages base path
```

## Deployment

`.github/workflows/deploy-pages.yml` builds and publishes on every push to the
default branch. `configure-pages` runs with `enablement: true`, so the first run
turns Pages on by itself.

The site is served from `/Portfolio`, not a domain root, so `next.config.ts`
sets `basePath` and `lib/utils.ts#asset()` prefixes anything referenced by hand
(the résumé PDF). Build for a domain root with `BASE_PATH= npm run build`.

## Accessibility and performance

- Fully static: no client-side data fetching, no layout shift from it.
- `prefers-reduced-motion` disables every animation and smooth scrolling.
- Language choice drives `<html lang>`, so screen readers switch voice.
- The case-study dialog traps page scroll, closes on <kbd>Esc</kbd> and on
  backdrop click, and is labelled for assistive tech.
- Nav highlights the section in view via `IntersectionObserver` rather than
  scroll maths, and hides on scroll-down so it never covers the content.
