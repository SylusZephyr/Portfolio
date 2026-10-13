import { useEffect } from 'react'
import { Scene } from './world/Scene.jsx'
import { Brand, ZoneNav, Controls, RailProgress, Prompt, Joystick, TouchInteract } from './ui/Hud.jsx'
import { PanelLayer } from './ui/Panels.jsx'
import { Loader } from './ui/Loader.jsx'
import { getState, setState, useStore } from './store.js'
import { seedFreeFromRail, seedRailFromFree, useInteractKeys, stopTour } from './world/CameraRig.jsx'

/**
 * Mode switching needs the live camera, which lives inside the Canvas, so the
 * buttons dispatch an event and a small bridge inside the scene answers it.
 * Keeping the bridge here (outside r3f) would mean prop-drilling the camera out.
 */
function useModeBridge() {
  useEffect(() => {
    const onMode = (e) => {
      const next = e.detail
      const cam = window.__portfolioCamera
      if (!cam) return
      stopTour()
      if (next === 'free') {
        seedFreeFromRail(cam)
        setState({ mode: 'free', openPanel: null })
      } else {
        seedRailFromFree()
        setState({ mode: 'rail', nearZone: null })
      }
    }
    window.addEventListener('portfolio:mode', onMode)
    return () => window.removeEventListener('portfolio:mode', onMode)
  }, [])
}

/** Restore a saved language, else follow the browser, once on mount. */
function useLanguageInit() {
  useEffect(() => {
    let saved = null
    try {
      saved = localStorage.getItem('portfolio:lang')
    } catch {
      /* private mode */
    }
    const guess = (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en'
    const lang = saved === 'en' || saved === 'zh' ? saved : guess
    setState({ lang })
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }, [])
}

export default function App() {
  const loaded = useStore((s) => s.loaded)
  useLanguageInit()
  useInteractKeys()
  useModeBridge()

  // any deliberate interaction cancels the guided tour
  useEffect(() => {
    const cancel = () => getState().touring && stopTour()
    window.addEventListener('pointerdown', cancel)
    return () => window.removeEventListener('pointerdown', cancel)
  }, [])

  return (
    <div className="app">
      <div className="canvas-wrap">
        <Scene />
      </div>

      {loaded && (
        <div className="hud">
          <Brand />
          <Controls />
          <ZoneNav />
          <Prompt />
          <RailProgress />
          <Joystick />
          <TouchInteract />
        </div>
      )}

      <PanelLayer />
      <Loader />
      <div className="scanlines" aria-hidden />
    </div>
  )
}
