import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard } from '@react-three/drei'
import { Txt } from './Txt.jsx'
import * as THREE from 'three'

/** Wireframe shell + soft inner glow. The building block of every structure here. */
export function NeonBox({ args = [1, 1, 1], color = '#38f8d4', opacity = 0.12, wire = 0.55, ...rest }) {
  const geo = useMemo(() => new THREE.BoxGeometry(...args), [args.join(',')])
  const edges = useMemo(() => new THREE.EdgesGeometry(geo), [geo])
  return (
    <group {...rest}>
      <mesh geometry={geo}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.35}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color={color} transparent opacity={wire} />
      </lineSegments>
    </group>
  )
}

/** A glowing horizontal ring, used as a pedestal / zone marker. */
export function GlowRing({ radius = 4, color = '#38f8d4', thickness = 0.06, speed = 0.3, opacity = 0.8 }) {
  const ref = useRef()
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.z += d * speed
  })
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]}>
      <ringGeometry args={[radius - thickness, radius, 96]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

/** Vertical beam of light rising out of a zone, visible from across the world. */
export function Beacon({ color = '#38f8d4', height = 30, radius = 0.45, opacity = 0.18 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.elapsedTime
      ref.current.material.opacity = opacity * (0.7 + Math.sin(t * 1.6) * 0.3)
    }
  })
  return (
    <mesh ref={ref} position={[0, height / 2, 0]}>
      <cylinderGeometry args={[radius * 0.35, radius, height, 16, 1, true]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

/** Floating label that always faces the camera. */
export function FloatLabel({ children, position = [0, 0, 0], color = '#eaf6ff', size = 0.5, sub, subColor }) {
  return (
    <Billboard position={position}>
      <Txt
        fontSize={size}
        color={color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.08}
        outlineWidth={0.004}
        outlineColor="#05060c"
      >
        {children}
      </Txt>
      {sub && (
        <Txt
          position={[0, -size * 1.15, 0]}
          fontSize={size * 0.42}
          color={subColor || color}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.16}
          fillOpacity={0.75}
        >
          {sub}
        </Txt>
      )}
    </Billboard>
  )
}

/** Hoverable, clickable hotspot. Handles its own cursor + pulse. */
export function Hotspot({ position = [0, 0, 0], color = '#38f8d4', radius = 0.42, onClick, label }) {
  const [hover, setHover] = useState(false)
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const s = 1 + Math.sin(clock.elapsedTime * 3) * 0.12 + (hover ? 0.4 : 0)
    ref.current.scale.setScalar(s)
  })
  return (
    <group position={position}>
      <mesh
        ref={ref}
        onClick={(e) => {
          e.stopPropagation()
          onClick?.()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHover(false)
          document.body.style.cursor = ''
        }}
      >
        <sphereGeometry args={[radius, 20, 20]} />
        <meshBasicMaterial color={color} transparent opacity={hover ? 0.95 : 0.65} />
      </mesh>
      {hover && label && <FloatLabel position={[0, radius + 0.7, 0]} size={0.28} color={color}>{label}</FloatLabel>}
    </group>
  )
}

/** Thin glowing connector between two points — the paths between zones. */
export function PathLine({ from, to, color = '#1f6f86', opacity = 0.5 }) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute([...from, ...to], 3))
    return g
  }, [from.join(','), to.join(',')])
  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  )
}
