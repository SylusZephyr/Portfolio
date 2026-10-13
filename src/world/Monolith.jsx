import { useRef, useState, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import { NeonBox, GlowRing } from './Primitives.jsx'
import { setState } from '../store.js'

/** Each project gets a different silhouette so the gallery reads as varied, not repeated. */
function Form({ shape, color, hover }) {
  const spin = useRef()
  useFrame((_, d) => {
    if (spin.current) spin.current.rotation.y += d * (hover ? 0.6 : 0.18)
  })

  if (shape === 'ring') {
    return (
      <group ref={spin} position={[0, 4.2, 0]}>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[1.9, 0.14, 16, 72]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hover ? 2.6 : 1.3} roughness={0.25} />
        </mesh>
        <mesh rotation={[Math.PI / 1.7, 0.6, 0]}>
          <torusGeometry args={[1.35, 0.07, 12, 56]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hover ? 2.2 : 1.0} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.52, 1]} />
          <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={2} />
        </mesh>
      </group>
    )
  }

  if (shape === 'tower') {
    return (
      <group ref={spin} position={[0, 0.1, 0]}>
        {[0, 1, 2, 3].map((i) => (
          <NeonBox
            key={i}
            args={[3.1 - i * 0.55, 1.5, 3.1 - i * 0.55]}
            color={color}
            opacity={0.1 + i * 0.05}
            position={[0, 1.0 + i * 1.72, 0]}
            rotation={[0, i * 0.3, 0]}
          />
        ))}
        <mesh position={[0, 8.0, 0]}>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hover ? 3 : 1.6} />
        </mesh>
      </group>
    )
  }

  if (shape === 'shard') {
    return (
      <group ref={spin}>
        <mesh position={[0, 3.6, 0]} rotation={[0, 0.4, 0.09]}>
          <coneGeometry args={[1.5, 7.2, 5]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hover ? 1.4 : 0.6}
            transparent
            opacity={0.3}
            roughness={0.15}
            metalness={0.8}
            flatShading
          />
        </mesh>
        <mesh position={[0, 3.6, 0]} rotation={[0, 0.4, 0.09]}>
          <coneGeometry args={[1.5, 7.2, 5]} />
          <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
        </mesh>
      </group>
    )
  }

  // 'slab' — a holographic panel
  return (
    <group position={[0, 3.5, 0]}>
      <NeonBox args={[4.4, 6.0, 0.22]} color={color} opacity={0.14} />
      <mesh position={[0, 0, 0.14]}>
        <planeGeometry args={[3.9, 5.4]} />
        <meshBasicMaterial color={color} transparent opacity={hover ? 0.22 : 0.1} blending={THREE.AdditiveBlending} />
      </mesh>
      <ScanBar color={color} />
    </group>
  )
}

function ScanBar({ color }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.position.y = ((clock.elapsedTime * 0.7) % 1) * 5.2 - 2.6
  })
  return (
    <mesh ref={ref} position={[0, 0, 0.16]}>
      <planeGeometry args={[3.9, 0.1]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

export function Monolith({ project, dimmed }) {
  const [hover, setHover] = useState(false)
  const group = useRef()
  const baseY = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame(({ clock }) => {
    if (!group.current) return
    group.current.position.y = Math.sin(clock.elapsedTime * 0.6 + baseY) * 0.12
  })

  const open = () => setState({ openPanel: `project:${project.id}` })

  return (
    <group position={project.position} rotation={project.rotation}>
      <group
        ref={group}
        onClick={(e) => {
          e.stopPropagation()
          open()
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
        {/* generous invisible hit area so clicking is never fiddly */}
        <mesh visible={false} position={[0, 4, 0]}>
          <boxGeometry args={[5.4, 9, 5.4]} />
        </mesh>

        <Form shape={project.shape} color={project.accent} hover={hover} />

        <Text
          position={[0, 0.9, 2.3]}
          fontSize={0.62}
          color="#f2faff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.006}
          outlineColor="#05060c"
          maxWidth={6}
        >
          {project.title}
        </Text>
        <Text
          position={[0, 0.42, 2.3]}
          fontSize={0.23}
          color={project.accent}
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.14}
        >
          {project.kind.toUpperCase()}
        </Text>
        <Text
          position={[0, 10.1, 0]}
          fontSize={0.3}
          color={project.accent}
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.6}
        >
          {project.year}
        </Text>
      </group>

      <GlowRing radius={3.5} color={project.accent} opacity={hover ? 1 : dimmed ? 0.3 : 0.6} speed={hover ? 0.9 : 0.25} />
      <pointLight position={[0, 3, 1.5]} intensity={hover ? 26 : 12} distance={16} color={project.accent} />

      {hover && (
        <Text
          position={[0, -0.25, 3.0]}
          fontSize={0.2}
          color="#9fb6c9"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.2}
        >
          CLICK TO OPEN CASE STUDY
        </Text>
      )}
    </group>
  )
}
