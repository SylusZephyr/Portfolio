import { useEffect, useState } from 'react'
import { useProgress } from '@react-three/drei'
import { setState, useStore } from '../store.js'
import { useContent } from '../data/useContent.js'
import { LANGUAGES } from '../data/portfolio.js'

/**
 * Entry screen. Holds until assets are ready, then waits for a deliberate click —
 * a 3D world that starts moving before the visitor is ready feels broken.
 */
export function Loader() {
  const { profile, ui } = useContent()
  const lang = useStore((s) => s.lang)
  const { progress, active } = useProgress()
  const loaded = useStore((s) => s.loaded)
  const [ready, setReady] = useState(false)
  const [settle, setSettle] = useState(0)

  /**
   * useProgress only moves while something is actually in flight. With everything
   * cached — or on a fast connection where the scene is built from geometry rather
   * than downloaded assets — it can sit at 0 forever, so the gate is "nothing is
   * loading and the first frames have been drawn", not "progress hit 100".
   */
  useEffect(() => {
    let raf
    const start = performance.now()
    const tick = () => {
      const elapsed = performance.now() - start
      // a floor that creeps up, so the bar always reads as motion
      setSettle(Math.min(100, (elapsed / 1400) * 100))
      if (elapsed > 1400 && !active) setReady(true)
      else raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])

  // safety net: never trap a visitor behind the loader, whatever the loaders report
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 9000)
    return () => clearTimeout(t)
  }, [])

  const shown = Math.max(progress, ready ? 100 : settle)

  if (loaded) return null

  return (
    <div className={`loader${ready ? ' is-ready' : ''}`}>
      <div className="loader-inner">
        <div className="loader-langs">
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
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="loader-mark">{profile.initials}</div>
        <h1>{profile.name}</h1>
        <p className="loader-role">{profile.roleLong}</p>
        <p className="loader-tag">{profile.tagline}</p>

        <div className="loader-bar">
          <div className="loader-fill" style={{ width: `${Math.min(100, shown)}%` }} />
        </div>

        {ready ? (
          <button className="btn primary big" onClick={() => setState({ loaded: true })}>
            {ui.enter}
          </button>
        ) : (
          <p className="loader-status">
            {ui.building} {Math.round(shown)}%
          </p>
        )}

        <p className="loader-note">{ui.loaderNote}</p>
      </div>
    </div>
  )
}
