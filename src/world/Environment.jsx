import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { PALETTE, WORLD_END } from './config.js'

/**
 * The floor is a single large plane with a shader-drawn grid. Doing it in a shader
 * (rather than a line mesh) keeps it to one draw call and lets the grid glow,
 * pulse and fade with distance for free.
 */
const gridVertex = /* glsl */ `
  varying vec2 vWorld;
  varying vec3 vPos;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xz;
    vPos = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const gridFragment = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColor;
  uniform vec3 uHot;
  uniform vec3 uCamera;
  varying vec2 vWorld;
  varying vec3 vPos;

  // anti-aliased grid lines at a given spacing
  float grid(vec2 p, float spacing, float thickness) {
    vec2 c = p / spacing;
    vec2 g = abs(fract(c - 0.5) - 0.5) / fwidth(c);
    float line = min(g.x, g.y);
    return 1.0 - min(line / thickness, 1.0);
  }

  void main() {
    float fine = grid(vWorld, 2.0, 1.0) * 0.35;
    float major = grid(vWorld, 10.0, 1.4) * 0.8;

    float dist = length(vWorld - uCamera.xz);
    float falloff = 1.0 - smoothstep(20.0, 150.0, dist);

    // a slow pulse travelling down -Z, like a scan sweeping through the world.
    // vWorld.y is world Z here (the plane is rotated flat).
    float scanZ = 20.0 - fract(uTime * 0.045) * 360.0;
    float pulse = exp(-pow(vWorld.y - scanZ, 2.0) * 0.0012);

    vec3 col = uColor * (fine + major);
    col += uHot * major * 0.55 * falloff;
    col += uHot * pulse * (fine + major) * 1.6;

    float alpha = (fine + major) * falloff;
    alpha += pulse * (fine + major) * 0.8;
    if (alpha < 0.004) discard;
    gl_FragColor = vec4(col, alpha);
  }
`

export function GridFloor() {
  const mat = useRef()
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(PALETTE.grid) },
      uHot: { value: new THREE.Color(PALETTE.gridHot) },
      uCamera: { value: new THREE.Vector3() },
    }),
    [],
  )

  useFrame(({ clock, camera }) => {
    uniforms.uTime.value = clock.elapsedTime
    uniforms.uCamera.value.copy(camera.position)
  })

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, WORLD_END / 2]} frustumCulled={false}>
      <planeGeometry args={[520, 520]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        vertexShader={gridVertex}
        fragmentShader={gridFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/** Dark reflective-ish base under the grid so the world has a floor, not a void. */
export function BasePlane() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, WORLD_END / 2]} receiveShadow>
      <planeGeometry args={[520, 520]} />
      <meshStandardMaterial color="#070912" roughness={0.42} metalness={0.75} envMapIntensity={0.25} />
    </mesh>
  )
}

/** Drifting motes. One instanced points cloud for the whole world. */
export function Dust({ count = 900 }) {
  const ref = useRef()
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120
      positions[i * 3 + 1] = Math.random() * 26
      positions[i * 3 + 2] = Math.random() * (WORLD_END - 30) + 20
      speeds[i] = 0.12 + Math.random() * 0.5
    }
    return { positions, speeds }
  }, [count])

  useFrame((_, delta) => {
    const geo = ref.current?.geometry
    if (!geo) return
    const arr = geo.attributes.position.array
    const d = Math.min(delta, 0.05)
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * d
      if (arr[i * 3 + 1] > 27) arr[i * 3 + 1] = -0.5
    }
    geo.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.085}
        color={PALETTE.cyan}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** Vertical light pillars that mark the horizon and give the fog something to eat. */
export function Pillars() {
  const items = useMemo(() => {
    const out = []
    for (let i = 0; i < 26; i++) {
      const side = i % 2 === 0 ? -1 : 1
      out.push({
        position: [side * (34 + Math.random() * 46), 0, 20 - i * 13 - Math.random() * 8],
        height: 14 + Math.random() * 40,
        color: i % 5 === 0 ? PALETTE.magenta : i % 3 === 0 ? PALETTE.violet : PALETTE.cyan,
        opacity: 0.1 + Math.random() * 0.16,
      })
    }
    return out
  }, [])

  return (
    <group>
      {items.map((p, i) => (
        <mesh key={i} position={[p.position[0], p.height / 2, p.position[2]]}>
          <boxGeometry args={[1.1, p.height, 1.1]} />
          <meshBasicMaterial
            color={p.color}
            transparent
            opacity={p.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.26} color="#5e7adf" />
      <hemisphereLight args={['#2b3f7a', '#04050a', 0.5]} />
      <directionalLight position={[18, 30, 12]} intensity={0.5} color="#8fd6ff" />
      <pointLight position={[0, 9, -148]} intensity={60} distance={70} color={PALETTE.magenta} />
      <pointLight position={[0, 7, -300]} intensity={50} distance={60} color={PALETTE.cyan} />
    </>
  )
}
