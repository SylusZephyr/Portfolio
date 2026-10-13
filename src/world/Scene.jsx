import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { AdaptiveDpr, Preload, Stars } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { World } from './Zones.jsx'
import { CameraRig } from './CameraRig.jsx'
import { GridFloor, BasePlane, Dust, Pillars, Lighting } from './Environment.jsx'
import { PALETTE } from './config.js'
import { useStore } from '../store.js'

/** Effects are the single biggest cost here, so they scale with the quality setting. */
function Effects({ quality }) {
  if (quality === 'low') return null
  return (
    <EffectComposer multisampling={quality === 'high' ? 2 : 0} disableNormalPass>
      <Bloom
        intensity={quality === 'high' ? 1.15 : 0.8}
        luminanceThreshold={0.16}
        luminanceSmoothing={0.5}
        mipmapBlur
        radius={0.72}
      />
      {quality === 'high' ? (
        <ChromaticAberration
          offset={[0.00055, 0.0008]}
          blendFunction={BlendFunction.NORMAL}
          radialModulation
          modulationOffset={0.4}
        />
      ) : null}
      <Vignette eskil={false} offset={0.26} darkness={0.78} />
    </EffectComposer>
  )
}

export function Scene() {
  const quality = useStore((s) => s.quality)
  const [dpr, setDpr] = useState([1, 1.75])

  // keep the pixel ratio modest on phones and on the low setting
  useEffect(() => {
    if (quality === 'low') setDpr([0.7, 1])
    else if (quality === 'medium') setDpr([0.85, 1.35])
    else setDpr([1, Math.min(window.devicePixelRatio || 1, 1.9)])
  }, [quality])

  return (
    <Canvas
      dpr={dpr}
      gl={{
        antialias: quality === 'high',
        powerPreference: 'high-performance',
        alpha: false,
        stencil: false,
      }}
      camera={{ fov: 62, near: 0.1, far: 520, position: [0, 6.5, 34] }}
      onCreated={({ gl, scene, camera }) => {
        // the mode-switch bridge in App needs the live camera to hand off smoothly
        window.__portfolioCamera = camera
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.08
        scene.background = new THREE.Color(PALETTE.bg)
        scene.fog = new THREE.Fog(PALETTE.fog, 26, 185)
      }}
    >
      <Lighting />
      <Stars
        key={`stars-${quality}`}
        radius={260}
        depth={90}
        count={quality === 'low' ? 900 : 3200}
        factor={5}
        saturation={0}
        fade
        speed={0.35}
      />
      <BasePlane />
      <GridFloor />
      {/* keyed on quality: the particle count changes with it, and a buffer
          attribute cannot be resized in place — it has to remount */}
      {quality !== 'low' && <Dust key={quality} count={quality === 'high' ? 900 : 380} />}
      <Pillars />

      <Suspense fallback={null}>
        <World />
        <Preload all />
      </Suspense>

      <CameraRig />
      <Effects quality={quality} />
      <AdaptiveDpr pixelated={false} />
    </Canvas>
  )
}
