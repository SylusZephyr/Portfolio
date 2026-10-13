# Neon Portfolio — an interactive 3D portfolio world

A single-page portfolio you *walk through*. Seven zones laid out in a neon-cyber
space — entry, about, skills, a project gallery, an experience timeline, writing,
and contact — connected by a camera path you can either scroll along or leave to
roam on foot.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # serve the build locally
```

Node 18+ required. The build is fully static — `dist/` drops onto GitHub Pages,
Netlify, Vercel or any file host with no server-side piece.

## Making it yours

**Everything you need to change lives in one file: `src/data/portfolio.js`.**

| What | Where |
| --- | --- |
| Name, role, tagline, email, socials, résumé link | `profile` |
| About copy and the stat shards orbiting the core | `about` |
| Skill groups, levels and their accent colours | `skills` |
| Projects — one entry per monolith in the gallery | `projects` |
| Jobs on the timeline | `experience` |
| Degrees and certifications | `education` |
| Blog posts | `posts` |
| Contact panel copy | `contact` |

Two things to know when editing projects:

- `shape` picks the 3D form of that project's monolith: `'slab'`, `'tower'`,
  `'ring'` or `'shard'`. Mixing them is what keeps the gallery from looking
  repetitive.
- `accent` drives that monolith's emissive colour, its pedestal ring, its light
  and the accent of its case-study panel.

Add or remove projects freely — the gallery arranges itself into a double arc in
`src/world/config.js` (`PROJECT_SLOTS`), so nothing needs to be repositioned by
hand.

Drop your real `resume.pdf` into `public/` to make the Résumé buttons work.

## Navigation

Two modes, switchable at any time from the top-right toggle, and the hand-off
keeps your position either way.

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
  data/portfolio.js   all content — the only file a content swap touches
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
