import { useEffect, useRef, useState } from 'react'
import { ZONES, zoneById } from '../world/config.js'
import { frame, setState, useStore, getState } from '../store.js'
import { travelTo, startTour, stopTour, walk } from '../world/CameraRig.jsx'
import { profile } from '../data/portfolio.js'

/** Brand mark, top-left. */
export function Brand() {
  return (
    <div className="brand">
      <div className="brand-mark">{profile.initials}</div>
      <div className="brand-text">
        <strong>{profile.name}</strong>
        <span>{profile.role}</span>
      </div>
    </div>
  )
}

/** Zone list down the left edge. Doubles as the progress indicator. */
export function ZoneNav() {
  const active = useStore((s) => s.activeZone)
  return (
    <nav className="zone-nav" aria-label="Sections">
      {ZONES.map((z) => (
        <button
          key={z.id}
          className={`zone-nav-item${active === z.id ? ' is-active' : ''}`}
          style={{ '--accent': z.accent }}
          onClick={() => {
            stopTour()
            travelTo(z.id)
          }}
        >
          <span className="dot" />
          <span className="label">{z.nav}</span>
        </button>
      ))}
    </nav>
  )
}

/** Mode switch, tour, quality, help. */
export function Controls() {
  const { mode, touring, quality } = useStore((s) => ({ mode: s.mode, touring: s.touring, quality: s.quality }))

  return (
    <div className="controls">
      <div className="mode-switch" role="group" aria-label="Navigation mode">
        <button
          className={mode === 'rail' ? 'is-on' : ''}
          onClick={() => {
            if (getState().mode === 'rail') return
            window.dispatchEvent(new CustomEvent('portfolio:mode', { detail: 'rail' }))
          }}
        >
          Scroll
        </button>
        <button
          className={mode === 'free' ? 'is-on' : ''}
          onClick={() => {
            if (getState().mode === 'free') return
            window.dispatchEvent(new CustomEvent('portfolio:mode', { detail: 'free' }))
          }}
        >
          Walk
        </button>
      </div>

      <button className="ghost-btn" onClick={() => (touring ? stopTour() : startTour())}>
        {touring ? 'Stop tour' : 'Guided tour'}
      </button>

      <button
        className="ghost-btn"
        onClick={() => setState({ quality: quality === 'high' ? 'medium' : quality === 'medium' ? 'low' : 'high' })}
        title="Lower this if the frame rate drops"
      >
        Quality: {quality}
      </button>

      <a className="ghost-btn" href={profile.resumeUrl} download>
        Résumé ↓
      </a>

      <button className="ghost-btn icon" onClick={() => setState({ showHelp: !getState().showHelp })} aria-label="Help">
        ?
      </button>
    </div>
  )
}

/** Thin progress bar with zone ticks, bottom of screen (rail mode). */
export function RailProgress() {
  const mode = useStore((s) => s.mode)
  const fill = useRef()

  useEffect(() => {
    let raf
    const loop = () => {
      if (fill.current) fill.current.style.transform = `scaleX(${frame.progress})`
      raf = requestAnimationFrame(loop)
    }
    loop()
    return () => cancelAnimationFrame(raf)
  }, [])

  if (mode !== 'rail') return null
  return (
    <div className="rail-progress">
      <div className="rail-track">
        <div className="rail-fill" ref={fill} />
      </div>
    </div>
  )
}

/** Contextual prompt: what to do right now. */
export function Prompt() {
  const { mode, nearZone, touring, activeZone } = useStore((s) => ({
    mode: s.mode,
    nearZone: s.nearZone,
    touring: s.touring,
    activeZone: s.activeZone,
  }))
  const isTouch = useIsTouch()

  let text
  if (touring) text = 'Guided tour running — scroll or click anything to take over'
  else if (mode === 'free' && nearZone) {
    const z = zoneById[nearZone]
    text = isTouch ? `Tap the marker to open ${z.nav}` : `Press E to open ${z.nav}`
  } else if (mode === 'free') text = isTouch ? 'Drag to look · joystick to move' : 'WASD to move · drag to look · Shift to sprint'
  else text = isTouch ? 'Swipe up to travel · tap a structure to open it' : 'Scroll to travel · click any structure to open it'

  return (
    <div className="prompt" key={text}>
      <span className="prompt-zone">{zoneById[activeZone]?.nav}</span>
      <span className="prompt-text">{text}</span>
    </div>
  )
}

export function useIsTouch() {
  const [touch, setTouch] = useState(false)
  useEffect(() => {
    const check = () => setTouch(window.matchMedia('(pointer: coarse)').matches)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return touch
}

/** Virtual joystick for free-roam on touch devices. */
export function Joystick() {
  const mode = useStore((s) => s.mode)
  const panel = useStore((s) => s.openPanel)
  const isTouch = useIsTouch()
  const base = useRef()
  const knob = useRef()
  const [, force] = useState(0)

  useEffect(() => {
    const el = base.current
    if (!el) return
    const R = 48
    let id = null

    const set = (dx, dy) => {
      const d = Math.hypot(dx, dy)
      const k = d > R ? R / d : 1
      const x = dx * k
      const y = dy * k
      walk.joy.x = x / R
      walk.joy.y = y / R
      walk.joy.active = true
      if (knob.current) knob.current.style.transform = `translate(${x}px, ${y}px)`
    }
    const reset = () => {
      walk.joy.x = 0
      walk.joy.y = 0
      walk.joy.active = false
      id = null
      if (knob.current) knob.current.style.transform = 'translate(0px, 0px)'
    }

    const onStart = (e) => {
      const t = e.changedTouches[0]
      id = t.identifier
      const r = el.getBoundingClientRect()
      set(t.clientX - (r.left + r.width / 2), t.clientY - (r.top + r.height / 2))
      e.preventDefault()
    }
    const onMove = (e) => {
      for (const t of e.changedTouches) {
        if (t.identifier !== id) continue
        const r = el.getBoundingClientRect()
        set(t.clientX - (r.left + r.width / 2), t.clientY - (r.top + r.height / 2))
        e.preventDefault()
      }
    }
    const onEnd = (e) => {
      for (const t of e.changedTouches) if (t.identifier === id) reset()
    }

    el.addEventListener('touchstart', onStart, { passive: false })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd)
    el.addEventListener('touchcancel', onEnd)
    return () => {
      reset()
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
      el.removeEventListener('touchcancel', onEnd)
    }
  }, [mode, isTouch, force])

  if (!isTouch || mode !== 'free' || panel) return null
  return (
    <div className="joystick" ref={base} aria-hidden>
      <div className="joystick-knob" ref={knob} />
    </div>
  )
}

/** Big "open this zone" button on touch, replacing the E key. */
export function TouchInteract() {
  const { mode, nearZone, openPanel } = useStore((s) => ({ mode: s.mode, nearZone: s.nearZone, openPanel: s.openPanel }))
  const isTouch = useIsTouch()
  if (!isTouch || mode !== 'free' || !nearZone || openPanel) return null
  return (
    <button className="touch-interact" onClick={() => setState({ openPanel: nearZone })}>
      Open {zoneById[nearZone]?.nav}
    </button>
  )
}
