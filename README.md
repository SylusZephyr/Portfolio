# Wajid Kanwar Abdul — interactive 3D portfolio

A bilingual (English / 中文) single-page portfolio you *walk through*. Seven zones
laid out in a neon-cyber space — entry, about, skills, a project gallery, an
experience timeline, awards & research, and contact — connected by a camera path
you can either scroll along or leave to roam on foot.

All content comes from the CV: AI full-stack engineering, edge AI, large-model
applications and AI governance.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # serve the build locally
```

Node 18+ required. The build is fully static — `dist/` drops onto GitHub Pages,
Netlify, Vercel or any file host with no server-side piece.

## Editing the content

**Everything lives in one file: `src/data/portfolio.js`.** It exports
`content.en` and `content.zh`, which have the *exact same shape* — so every edit
is made twice, once per language, side by side.

| What | Where |
| --- | --- |
| Name, role, tagline, contact details, target roles/cities, availability | `profile` |
| About copy and the stat shards orbiting the core | `about` |
| Skill groups, levels and their accent colours | `skills` |
| Projects — one entry per monolith in the gallery | `projects` |
| Internship, media and university roles on the timeline | `experience` |
| Degree, course results, languages | `education` |
| Competition awards and the AI governance report | `research` |
| Contact panel copy | `contact` |
| Every interface string — buttons, prompts, help | `ui` |

Accent colours are defined once in the `ACCENT` map at the top and shared across
both languages, so switching language changes the words and nothing else.

### Adding a third language

Copy either block, translate it, and add an entry to `LANGUAGES`. Nothing else
in the codebase needs to know the language exists.

### Chinese text in 3D

troika (what the 3D text renderer uses) ships a Latin-only font, so Chinese would
render as empty boxes. `public/fonts/noto-sans-sc-subset.ttf` is Noto Sans SC cut
down to exactly the characters the Chinese content uses — 170kB instead of 10MB —
and it is only fetched when Chinese is selected.

After editing Chinese copy, rebuild that subset so any new characters are
included:

```bash
# one-time: pip install fonttools brotli, and put the full face at
# .fonts/noto-sans-sc.ttf (from fonts.google.com/noto/specimen/Noto+Sans+SC)
npm run font:subset
```

If a character shows as a blank box, it is missing from the subset — that command
is the fix.

Two things to know when editing projects:

- `shape` picks the 3D form of that project's monolith: `'slab'`, `'tower'`,
  `'ring'` or `'shard'`. Mixing them is what keeps the gallery from looking
  repetitive.
- `accent` drives that monolith's emissive colour, its pedestal ring, its light
  and the accent of its case-study panel.

Add or remove projects freely — the gallery arranges itself into a double arc in
`src/world/config.js` (`PROJECT_SLOTS`), so nothing needs to be repositioned by
hand.

Drop the real `resume.pdf` into `public/` to make the Résumé buttons work — the
file there now is a placeholder.

## Navigation

Two modes, switchable at any time from the top-right toggle, and the hand-off
keeps your position either way.

The language toggle (EN / 中文) sits top-right and on the entry screen. The choice
is remembered in `localStorage`; first-time visitors with a Chinese browser
locale get Chinese automatically.

**Scroll mode** (default) — the camera rides a Catmull-Rom spline through every
zone. Scroll, swipe, or press <kbd>↑</kbd>/<kbd>↓</kbd> to travel; clicking a
zone in the left nav flies you there; "Guided tour" runs the whole path on its
own and bails out the moment you touch anything.

**Walk mode** — <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> to move, drag
to look, <kbd>Shift</kbd> to sprint, <kbd>E</kbd> to open whatever you're
standing next to. On touch devices you get a virtual joystick and a large
"Open <zone>" button instead.

<kbd>Esc</kbd> closes a panel, <kbd>?</kbd> opens the controls help.

## Structure

```
src/
  data/portfolio.js   all content, both languages — the only file a content
                      change touches
  data/useContent.js  hook returning the active language's content tree
  store.js            tiny external store (no state library); per-frame values
                      bypass React entirely via the `frame` object
  world/
    config.js         zone layout, the camera rail, project placement, palette
    Scene.jsx         the Canvas: renderer settings, fog, post-processing
    CameraRig.jsx     both navigation modes, input handling, zone proximity
    Environment.jsx   shader grid floor, dust, light pillars, lighting
    Primitives.jsx    reusable neon building blocks
    Monolith.jsx      a project structure, one per `projects` entry
    Zones.jsx         each zone's 3D contents, assembled into `<World/>`
    Txt.jsx           <Text> wrapper that swaps in the CJK font for Chinese
  ui/
    Hud.jsx           brand, zone nav, mode switch, prompts, joystick
    Panels.jsx        the overlay panels and case studies
    Loader.jsx        entry screen, gated on asset load
  styles.css          all UI styling
```

## Performance notes

The world is built to hold 60fps on ordinary hardware rather than to look good
only on a workstation:

- The grid floor is one shader-drawn plane, not line geometry — one draw call for
  the entire floor, with distance fade and a travelling scan pulse for free.
- Per-frame values (camera progress, proximity) are written to a plain object and
  never to React state, so the render loop triggers no re-renders.
- Post-processing is the dominant cost, so the Quality control steps it down:
  **high** = bloom + chromatic aberration + MSAA, **medium** = bloom only,
  **low** = no effects, reduced DPR, fewer stars, no dust.
- `AdaptiveDpr` drops resolution automatically when frame times slip.

If the frame rate dips on your machine, the Quality button in the top-right is
the first thing to reach for.

## Accessibility and fallbacks

- The entry screen waits for a deliberate click, so nothing moves before the
  visitor is ready.
- `prefers-reduced-motion` disables UI animation and transitions.
- Every zone's content is also reachable as flat, scrollable, text-first panels —
  the 3D is the way in, not the only way to read it.
- Scroll mode means the whole portfolio is navigable without ever learning WASD.
- `<html lang>` follows the selected language, so screen readers switch voice.
