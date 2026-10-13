import { useEffect, useRef, useState } from 'react'
import { ZONES } from '../world/config.js'
import { frame, setState, useStore, getState } from '../store.js'
import { travelTo, startTour, stopTour, walk } from '../world/CameraRig.jsx'
import { useContent, useUi } from '../data/useContent.js'
import { LANGUAGES } from '../data/portfolio.js'

/** Brand mark, top-left. */
export function Brand() {
  const { profile } = useContent()
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

/** EN / 中文. The choice is remembered for the next visit. */
export function LangSwitch() {
  const lang = useStore((s) => s.lang)
  return (
    <div className="mode-switch lang-switch" role="group" aria-label="Language">
      {LANGUAGES.map((l) => (
        <button
          key={l.code}
          className={lang === l.code ? 'is-on' : ''}
          onClick={() => {
            setState({ lang: l.code })
            try {
              localStorage.setItem('portfolio:lang', l.code)
            } catch {
              /* private mode — the choice just won't persist */
            }
            document.documentElement.lang = l.code === 'zh' ? 'zh-CN' : 'en'
          }}
          aria-pressed={lang === l.code}
          title={l.name}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}

/** Zone list down the left edge. Doubles as the progress indicator. */
export function ZoneNav() {
  const active = useStore((s) => s.activeZone)
  const ui = useUi()
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
          <span className="label">{ui.zones[z.id]}</span>
        </button>
      ))}
    </nav>
  )
}

/** Mode switch, tour, quality, résumé, help. */
export function Controls() {
  const mode = useStore((s) => s.mode)
  const touring = useStore((s) => s.touring)
  const quality = useStore((s) => s.quality)
  const { profile } = useContent()
  const ui = useUi()

  return (
    <div className="controls">
      <LangSwitch />

      <div className="mode-switch" role="group" aria-label="Navigation mode">
        <button
          className={mode === 'rail' ? 'is-on' : ''}
          onClick={() => {
            if (getState().mode === 'rail') return
            window.dispatchEvent(new CustomEvent('portfolio:mode', { detail: 'rail' }))
          }}
        >
          {ui.scroll}
        </button>
        <button
          className={mode === 'free' ? 'is-on' : ''}
          onClick={() => {
            if (getState().mode === 'free') return
            window.dispatchEvent(new CustomEvent('portfolio:mode', { detail: 'free' }))
          }}
        >
          {ui.walk}
        </button>
      </div>

      <button className="ghost-btn" onClick={() => (touring ? stopTour() : startTour())}>
        {touring ? ui.tourStop : ui.tour}
      </button>

      <button
        className="ghost-btn"
        onClick={() => setState({ quality: quality === 'high' ? 'medium' : quality === 'medium' ? 'low' : 'high' })}
      >
        {ui.quality}: {quality}
      </button>

      <a className="ghost-btn" href={profile.resumeUrl} download>
        {ui.resume} ↓
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
  const mode = useStore((s) => s.mode)
  const nearZone = useStore((s) => s.nearZone)
  const touring = useStore((s) => s.touring)
  const activeZone = useStore((s) => s.activeZone)
  const ui = useUi()
  const isTouch = useIsTouch()

  let text
  if (touring) text = ui.promptTour
  else if (mode === 'free' && nearZone) {
    const name = ui.zones[nearZone]
    text = isTouch ? ui.promptOpenTouch(name) : ui.promptOpen(name)
  } else if (mode === 'free') text = isTouch ? ui.promptWalkTouch : ui.promptWalk
  else text = isTouch ? ui.promptRailTouch : ui.promptRail

  return (
    <div className="prompt" key={text}>
      <span className="prompt-zone">{ui.zones[activeZone]}</span>
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
  }, [mode, isTouch])

  if (!isTouch || mode !== 'free' || panel) return null
  return (
    <div className="joystick" ref={base} aria-hidden>
      <div className="joystick-knob" ref={knob} />
    </div>
  )
}

/** Big "open this zone" button on touch, replacing the E key. */
export function TouchInteract() {
  const mode = useStore((s) => s.mode)
  const nearZone = useStore((s) => s.nearZone)
  const openPanel = useStore((s) => s.openPanel)
  const ui = useUi()
  const isTouch = useIsTouch()
  if (!isTouch || mode !== 'free' || !nearZone || openPanel) return null
  return (
    <button className="touch-interact" onClick={() => setState({ openPanel: nearZone })}>
      {ui.open} {ui.zones[nearZone]}
    </button>
  )
}
