import { useSyncExternalStore } from 'react'

/** Minimal external store — avoids a state-management dependency. */
const listeners = new Set()

let state = {
  /** 'rail' = scroll drives the camera along a fixed path. 'free' = WASD / joystick. */
  mode: 'rail',
  /** 0..1 progress along the camera rail. */
  progress: 0,
  /** id of the zone the camera is currently closest to. */
  activeZone: 'hero',
  /** id of a zone the visitor is close enough to interact with, in free mode. */
  nearZone: null,
  /** which overlay panel is open: zone id, or `project:<id>`, or null. */
  openPanel: null,
  /** guided tour running. */
  touring: false,
  loaded: false,
  quality: 'high',
  muted: true,
  showHelp: false,
}

export function getState() {
  return state
}

export function setState(patch) {
  const next = typeof patch === 'function' ? patch(state) : patch
  let changed = false
  for (const k in next) {
    if (state[k] !== next[k]) {
      changed = true
      break
    }
  }
  if (!changed) return
  state = { ...state, ...next }
  listeners.forEach((l) => l())
}

function subscribe(l) {
  listeners.add(l)
  return () => listeners.delete(l)
}

/** Subscribe to a slice. Pass a selector so components only re-render on what they use. */
export function useStore(selector = (s) => s) {
  return useSyncExternalStore(
    subscribe,
    () => selector(state),
    () => selector(state),
  )
}

/**
 * Values that change every frame (progress, proximity) are written here instead of
 * React state, so the render loop never triggers a re-render.
 */
export const frame = {
  progress: 0,
  targetProgress: 0,
  velocity: 0,
}
