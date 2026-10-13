import * as THREE from 'three'
import { projects } from '../data/portfolio.js'

export const PALETTE = {
  bg: '#05060c',
  fog: '#05070f',
  grid: '#1b3a4d',
  gridHot: '#38f8d4',
  cyan: '#38f8d4',
  violet: '#7b6cff',
  magenta: '#ff4ddb',
  amber: '#ffb347',
  ice: '#5ad8ff',
  lime: '#9dff5a',
}

/**
 * Zones are the rooms of the world. `anchor` is where the camera rests when the
 * rail or a guided jump brings you here; `look` is what it points at.
 */
export const ZONES = [
  {
    id: 'hero',
    label: 'Entry',
    nav: 'Home',
    accent: PALETTE.cyan,
    position: [0, 0, 0],
    anchor: [0, 3.2, 14],
    look: [0, 3.4, 0],
    radius: 11,
    interactive: false,
  },
  {
    id: 'about',
    label: 'Core',
    nav: 'About',
    accent: PALETTE.ice,
    position: [-6, 0, -46],
    anchor: [1.5, 3.4, -33],
    look: [-6, 3.6, -46],
    radius: 10,
    interactive: true,
  },
  {
    id: 'skills',
    label: 'Array',
    nav: 'Skills',
    accent: PALETTE.violet,
    position: [8, 0, -92],
    anchor: [0.5, 4.2, -79],
    look: [8, 4.2, -92],
    radius: 12,
    interactive: true,
  },
  {
    id: 'projects',
    label: 'Gallery',
    nav: 'Projects',
    accent: PALETTE.magenta,
    position: [0, 0, -148],
    anchor: [0, 4.2, -124],
    look: [0, 4.0, -150],
    radius: 26,
    interactive: false,
  },
  {
    id: 'experience',
    label: 'Timeline',
    nav: 'Experience',
    accent: PALETTE.amber,
    position: [-9, 0, -210],
    anchor: [1, 3.8, -196],
    look: [-9, 4.0, -210],
    radius: 12,
    interactive: true,
  },
  {
    id: 'blog',
    label: 'Signals',
    nav: 'Writing',
    accent: PALETTE.lime,
    position: [9, 0, -254],
    anchor: [0, 3.6, -242],
    look: [9, 3.8, -254],
    radius: 11,
    interactive: true,
  },
  {
    id: 'contact',
    label: 'Beacon',
    nav: 'Contact',
    accent: PALETTE.cyan,
    position: [0, 0, -300],
    anchor: [0, 4.0, -286],
    look: [0, 5.2, -301],
    radius: 13,
    interactive: true,
  },
]

export const zoneById = Object.fromEntries(ZONES.map((z) => [z.id, z]))

/** Smooth camera path through every zone anchor, used by rail mode and the guided tour. */
export const RAIL = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 6.5, 34),
    ...ZONES.flatMap((z, i) => {
      const a = new THREE.Vector3(...z.anchor)
      const next = ZONES[i + 1]
      if (!next) return [a]
      // a gentle sway between zones so the travel never feels like a straight tube
      const b = new THREE.Vector3(...next.anchor)
      const mid = a.clone().lerp(b, 0.5)
      mid.x += i % 2 === 0 ? 7 : -7
      mid.y += 1.1
      return [a, mid]
    }),
    // the tail must stay in FRONT of the last zone: overshooting it leaves the
    // camera behind the contact structure, reading its text back-to-front
    new THREE.Vector3(0, 4.4, -292),
  ],
  false,
  'catmullrom',
  0.4,
)

/** Where each zone sits as a 0..1 position along the rail — for the nav and the scrollbar. */
export const ZONE_STOPS = (() => {
  const samples = 900
  const pts = []
  for (let i = 0; i <= samples; i++) pts.push({ t: i / samples, p: RAIL.getPointAt(i / samples) })
  return ZONES.map((z) => {
    const a = new THREE.Vector3(...z.anchor)
    let best = pts[0]
    let bestD = Infinity
    for (const s of pts) {
      const d = s.p.distanceToSquared(a)
      if (d < bestD) {
        bestD = d
        best = s
      }
    }
    return { id: z.id, t: best.t }
  })
})()

/** Project monoliths arranged as a double arc you walk between. */
export const PROJECT_SLOTS = projects.map((p, i) => {
  const side = i % 2 === 0 ? -1 : 1
  const row = Math.floor(i / 2)
  const z = -132 - row * 15
  const x = side * (9.5 + (row % 2) * 1.6)
  return {
    ...p,
    position: [x, 0, z],
    rotation: [0, side * -0.42, 0],
    slot: i,
  }
})

export const WORLD_END = -320
