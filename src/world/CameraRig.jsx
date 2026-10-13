import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RAIL, ZONES, ZONE_STOPS, zoneById } from './config.js'
import { frame, getState, setState, useStore } from '../store.js'

const PATH_LEN = RAIL.getLength()
const EYE = 3.3

/** Tween state for nav clicks and the guided tour. */
const tween = { active: false, from: 0, to: 0, t: 0, dur: 1 }

export function travelTo(zoneId, { instant = false } = {}) {
  const stop = ZONE_STOPS.find((s) => s.id === zoneId)
  if (!stop) return
  if (getState().mode === 'free') setState({ mode: 'rail' })
  if (instant) {
    frame.progress = stop.t
    frame.targetProgress = stop.t
    return
  }
  tween.active = true
  tween.from = frame.progress
  tween.to = stop.t
  tween.t = 0
  tween.dur = 0.6 + Math.abs(stop.t - frame.progress) * 3.4
}

export function startTour() {
  setState({ mode: 'rail', touring: true, openPanel: null })
  tween.active = true
  tween.from = frame.progress
  tween.to = 1
  tween.t = 0
  tween.dur = 26 * (1 - frame.progress)
}

export function stopTour() {
  if (getState().touring) {
    tween.active = false
    setState({ touring: false })
  }
}

const easeInOut = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2)

/* ───────────────────── input ───────────────────── */

function useRailInput() {
  useEffect(() => {
    const clamp = (v) => Math.max(0, Math.min(1, v))
    // 1 full wheel notch ≈ 100px; scale so the whole world is a comfortable scroll
    const SCROLL_SCALE = 1 / (PATH_LEN * 7)

    const onWheel = (e) => {
      if (getState().mode !== 'rail' || getState().openPanel) return
      stopTour()
      frame.targetProgress = clamp(frame.targetProgress + e.deltaY * SCROLL_SCALE * 1.6)
    }

    let touchY = null
    const onTouchStart = (e) => {
      touchY = e.touches[0].clientY
    }
    const onTouchMove = (e) => {
      if (getState().mode !== 'rail' || getState().openPanel || touchY === null) return
      const y = e.touches[0].clientY
      stopTour()
      frame.targetProgress = clamp(frame.targetProgress + (touchY - y) * SCROLL_SCALE * 4.2)
      touchY = y
    }
    const onTouchEnd = () => {
      touchY = null
    }

    const onKey = (e) => {
      if (getState().openPanel) return
      const step = 0.018
      if (e.code === 'ArrowDown' || e.code === 'PageDown') {
        if (getState().mode !== 'rail') return
        stopTour()
        frame.targetProgress = clamp(frame.targetProgress + step)
      } else if (e.code === 'ArrowUp' || e.code === 'PageUp') {
        if (getState().mode !== 'rail') return
        stopTour()
        frame.targetProgress = clamp(frame.targetProgress - step)
      }
    }

    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('keydown', onKey)
    }
  }, [])
}

/** Keyboard + drag-look + virtual joystick state for free-roam. */
export const walk = {
  fwd: 0,
  right: 0,
  yaw: Math.PI,
  pitch: -0.05,
  sprint: false,
  joy: { x: 0, y: 0, active: false },
}

function useFreeInput() {
  const { gl } = useThree()

  useEffect(() => {
    const keys = new Set()
    const sync = () => {
      walk.fwd = (keys.has('KeyW') || keys.has('ArrowUp') ? 1 : 0) - (keys.has('KeyS') || keys.has('ArrowDown') ? 1 : 0)
      walk.right = (keys.has('KeyD') || keys.has('ArrowRight') ? 1 : 0) - (keys.has('KeyA') || keys.has('ArrowLeft') ? 1 : 0)
      walk.sprint = keys.has('ShiftLeft') || keys.has('ShiftRight')
    }
    const down = (e) => {
      if (getState().mode !== 'free') return
      keys.add(e.code)
      sync()
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'Space'].includes(e.code)) e.preventDefault()
    }
    const up = (e) => {
      keys.delete(e.code)
      sync()
    }
    const blur = () => {
      keys.clear()
      sync()
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('blur', blur)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('blur', blur)
    }
  }, [])

  // drag to look; pointer lock when the canvas is clicked in free mode
  useEffect(() => {
    const el = gl.domElement
    let dragging = false
    let last = null

    const onDown = (e) => {
      if (getState().mode !== 'free') return
      dragging = true
      last = { x: e.clientX, y: e.clientY }
    }
    const onMove = (e) => {
      if (getState().mode !== 'free') return
      if (document.pointerLockElement === el) {
        applyLook(e.movementX, e.movementY)
        return
      }
      if (!dragging || !last) return
      applyLook(e.clientX - last.x, e.clientY - last.y)
      last = { x: e.clientX, y: e.clientY }
    }
    const onUp = () => {
      dragging = false
      last = null
    }
    const applyLook = (dx, dy) => {
      walk.yaw -= dx * 0.0032
      walk.pitch = Math.max(-0.95, Math.min(0.75, walk.pitch - dy * 0.0028))
    }

    el.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      el.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [gl])
}

/* ───────────────────── the rig ───────────────────── */

const tmpA = new THREE.Vector3()
const tmpB = new THREE.Vector3()
const lookTarget = new THREE.Vector3()
const desired = new THREE.Vector3()
const freePos = new THREE.Vector3(0, EYE, 14)
const freeLook = new THREE.Vector3()

/** Called when switching into free mode so you start where you were looking. */
export function seedFreeFromRail(camera) {
  freePos.copy(camera.position)
  freePos.y = EYE
  const dir = camera.getWorldDirection(tmpA.set(0, 0, -1)).clone()
  walk.yaw = Math.atan2(-dir.x, -dir.z)
  walk.pitch = Math.max(-0.4, Math.min(0.3, Math.asin(THREE.MathUtils.clamp(dir.y, -1, 1))))
}

export function seedRailFromFree() {
  // pick the rail point nearest the walker so the hand-off doesn't teleport you
  let best = 0
  let bestD = Infinity
  for (let i = 0; i <= 400; i++) {
    const t = i / 400
    const d = RAIL.getPointAt(t).distanceToSquared(freePos)
    if (d < bestD) {
      bestD = d
      best = t
    }
  }
  frame.progress = best
  frame.targetProgress = best
}

export function CameraRig() {
  const { camera } = useThree()
  const zoneCheck = useRef(0)
  useRailInput()
  useFreeInput()

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 1 / 20)
    const { mode } = getState()

    if (mode === 'rail') {
      if (tween.active) {
        tween.t += delta / tween.dur
        const k = easeInOut(Math.min(1, tween.t))
        frame.targetProgress = THREE.MathUtils.lerp(tween.from, tween.to, k)
        if (tween.t >= 1) {
          tween.active = false
          if (getState().touring) setState({ touring: false })
        }
      }

      frame.progress = THREE.MathUtils.damp(frame.progress, frame.targetProgress, 4.2, delta)
      const p = THREE.MathUtils.clamp(frame.progress, 0, 1)

      RAIL.getPointAt(p, desired)
      camera.position.lerp(desired, 1 - Math.pow(0.0001, delta))

      // look slightly ahead along the rail, then bias toward whatever zone is nearest
      RAIL.getPointAt(Math.min(1, p + 0.02), tmpA)
      const near = nearestZone(camera.position)
      tmpB.set(...near.zone.look)
      const bias = 1 - THREE.MathUtils.clamp(near.dist / (near.zone.radius * 2.2), 0, 1)
      lookTarget.lerpVectors(tmpA, tmpB, bias * 0.85)
      camera.lookAt(lookTarget)
      camera.position.y += Math.sin(performance.now() / 1400) * 0.015
    } else {
      // free roam
      const speed = (walk.sprint ? 17 : 8.4) * delta
      const joy = walk.joy
      const fwd = walk.fwd + (joy.active ? -joy.y : 0)
      const right = walk.right + (joy.active ? joy.x : 0)

      if (fwd || right) {
        const sin = Math.sin(walk.yaw)
        const cos = Math.cos(walk.yaw)
        // forward is -Z rotated by yaw
        freePos.x += (-sin * fwd + cos * right) * speed
        freePos.z += (-cos * fwd - sin * right) * speed
        freePos.x = THREE.MathUtils.clamp(freePos.x, -62, 62)
        freePos.z = THREE.MathUtils.clamp(freePos.z, -330, 34)
      }

      const bob = (fwd || right) ? Math.sin(performance.now() / 150) * 0.045 : 0
      camera.position.lerp(tmpA.set(freePos.x, EYE + bob, freePos.z), 1 - Math.pow(0.0005, delta))

      freeLook.set(
        camera.position.x - Math.sin(walk.yaw) * 10,
        camera.position.y + Math.tan(walk.pitch) * 10,
        camera.position.z - Math.cos(walk.yaw) * 10,
      )
      camera.lookAt(freeLook)
    }

    // zone bookkeeping, a few times a second rather than every frame
    zoneCheck.current += delta
    if (zoneCheck.current > 0.15) {
      zoneCheck.current = 0
      const near = nearestZone(camera.position)
      const s = getState()
      const patch = {}
      if (s.activeZone !== near.zone.id) patch.activeZone = near.zone.id
      const inRange = near.zone.interactive && near.dist < near.zone.radius * 0.95
      const nextNear = s.mode === 'free' && inRange ? near.zone.id : null
      if (s.nearZone !== nextNear) patch.nearZone = nextNear
      if (Object.keys(patch).length) setState(patch)
    }
  })

  return null
}

function nearestZone(pos) {
  let zone = ZONES[0]
  let dist = Infinity
  for (const z of ZONES) {
    const d = Math.hypot(pos.x - z.position[0], pos.z - z.position[2])
    if (d < dist) {
      dist = d
      zone = z
    }
  }
  return { zone, dist }
}

/** 'E' opens whatever you are standing next to; Escape closes panels. */
export function useInteractKeys() {
  useEffect(() => {
    const onKey = (e) => {
      const s = getState()
      if (e.code === 'Escape') {
        if (s.openPanel) setState({ openPanel: null })
        else if (document.pointerLockElement) document.exitPointerLock()
        return
      }
      if (e.code === 'KeyE' && s.nearZone && !s.openPanel) {
        setState({ openPanel: s.nearZone })
      }
      if (e.code === 'Slash' && e.shiftKey) setState({ showHelp: !s.showHelp })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}

export { zoneById }
