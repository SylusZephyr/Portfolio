import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Txt } from './Txt.jsx'
import { NeonBox, GlowRing, Beacon, Hotspot, PathLine } from './Primitives.jsx'
import { Monolith } from './Monolith.jsx'
import { ZONES, projectSlots, PALETTE } from './config.js'
import { useContent } from '../data/useContent.js'
import { setState } from '../store.js'

/* ───────────────────────── Entry ───────────────────────── */

function RotatingName() {
  const { profile } = useContent()
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.25) * 0.22
      ref.current.position.y = 5.6 + Math.sin(clock.elapsedTime * 0.7) * 0.1
    }
  })
  return (
    <group ref={ref} position={[0, 5.6, 0]}>
      <Txt
        fontSize={1.6}
        color="#f4fbff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.02}
        outlineWidth={0.01}
        outlineColor="#05060c"
        maxWidth={18}
        textAlign="center"
      >
        {profile.name}
      </Txt>
      <Txt position={[0, -1.25, 0]} fontSize={0.38} color="#9fc4d8" anchorX="center" letterSpacing={0.1}>
        {profile.altName}
      </Txt>
      <Txt position={[0, -2.1, 0]} fontSize={0.46} color={PALETTE.cyan} anchorX="center" letterSpacing={0.28}>
        {profile.role}
      </Txt>
      <Txt
        position={[0, -3.2, 0]}
        fontSize={0.28}
        color="#93aec2"
        anchorX="center"
        maxWidth={15}
        textAlign="center"
        lineHeight={1.55}
      >
        {profile.tagline}
      </Txt>
    </group>
  )
}

/** A slowly turning wireframe sphere behind the name — the "core" of the entry. */
function EntryCore() {
  const ref = useRef()
  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.08
      ref.current.rotation.x += d * 0.03
    }
  })
  return (
    <group ref={ref} position={[0, 5.4, -17]}>
      <mesh>
        <icosahedronGeometry args={[5.4, 2]} />
        <meshBasicMaterial color={PALETTE.violet} wireframe transparent opacity={0.16} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[3.0, 1]} />
        <meshBasicMaterial color={PALETTE.cyan} wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  )
}

function EntryZone({ zone }) {
  const { profile } = useContent()
  return (
    <group position={zone.position}>
      <GlowRing radius={9} color={zone.accent} opacity={0.5} speed={0.08} />
      <GlowRing radius={6.2} color={PALETTE.violet} opacity={0.35} speed={-0.14} />
      <EntryCore />
      <RotatingName />
      <Txt position={[0, 0.5, 8.2]} fontSize={0.24} color="#6d87a0" anchorX="center" letterSpacing={0.24}>
        {`${profile.location}  ·  ${profile.availabilityNote}`}
      </Txt>
    </group>
  )
}

/* ───────────────────────── About ───────────────────────── */

function AboutZone({ zone }) {
  const { about, ui } = useContent()
  const shards = useMemo(
    () =>
      about.facts.map((f, i) => ({
        ...f,
        angle: (i / about.facts.length) * Math.PI * 2,
        r: 5.6,
        y: 2.2 + (i % 3) * 1.5,
      })),
    [about],
  )
  const group = useRef()
  useFrame((_, d) => {
    if (group.current) group.current.rotation.y += d * 0.06
  })

  return (
    <group position={zone.position}>
      <GlowRing radius={7} color={zone.accent} opacity={0.5} speed={0.1} />
      <Beacon color={zone.accent} height={24} opacity={0.12} />

      <mesh position={[0, 4.6, 0]}>
        <dodecahedronGeometry args={[2.1, 0]} />
        <meshStandardMaterial
          color={zone.accent}
          emissive={zone.accent}
          emissiveIntensity={1.1}
          transparent
          opacity={0.42}
          roughness={0.2}
          metalness={0.7}
          flatShading
        />
      </mesh>
      <mesh position={[0, 4.6, 0]}>
        <dodecahedronGeometry args={[2.12, 0]} />
        <meshBasicMaterial color={zone.accent} wireframe transparent opacity={0.6} />
      </mesh>

      <group ref={group}>
        {shards.map((s, i) => (
          <group key={i} position={[Math.cos(s.angle) * s.r, s.y, Math.sin(s.angle) * s.r]}>
            <Txt fontSize={0.5} color="#f0f8ff" anchorX="center" anchorY="middle">
              {s.v}
            </Txt>
            <Txt position={[0, -0.42, 0]} fontSize={0.19} color={zone.accent} anchorX="center" letterSpacing={0.08}>
              {s.k}
            </Txt>
          </group>
        ))}
      </group>

      <ZoneSign zone={zone} title={about.heading} sub={about.lead} />
      <Hotspot position={[0, 1.4, 5.6]} color={zone.accent} onClick={() => setState({ openPanel: 'about' })} label={ui.aboutHint} />
      <pointLight position={[0, 5, 2]} intensity={24} distance={22} color={zone.accent} />
    </group>
  )
}

/* ───────────────────────── Skills ───────────────────────── */

/** Each skill group is a tower; each skill a lit segment whose height is its level. */
function SkillTower({ group, index, total }) {
  const angle = (index / total) * Math.PI * 2 + 0.4
  const r = 9.2
  const x = Math.cos(angle) * r
  const z = Math.sin(angle) * r
  const spin = useRef()
  useFrame((_, d) => {
    if (spin.current) spin.current.rotation.y += d * 0.12
  })

  return (
    <group position={[x, 0, z]}>
      <group ref={spin}>
        {group.items.map((it, i) => {
          const h = 0.34 + (it.level / 100) * 0.5
          const w = 0.6 + (it.level / 100) * 1.5
          return (
            <group key={it.name} position={[0, 1.1 + i * 1.08, 0]}>
              <mesh>
                <boxGeometry args={[w, h, w]} />
                <meshStandardMaterial
                  color={group.accent}
                  emissive={group.accent}
                  emissiveIntensity={0.3 + (it.level / 100) * 1.3}
                  transparent
                  opacity={0.55}
                  roughness={0.25}
                  metalness={0.6}
                />
              </mesh>
              <Txt position={[w / 2 + 0.28, 0, 0]} fontSize={0.2} color="#cfe4f2" anchorX="left" anchorY="middle" maxWidth={7}>
                {it.name}
              </Txt>
              <Txt position={[-w / 2 - 0.28, 0, 0]} fontSize={0.17} color={group.accent} anchorX="right" anchorY="middle">
                {String(it.level)}
              </Txt>
            </group>
          )
        })}
      </group>
      <GlowRing radius={1.7} color={group.accent} opacity={0.6} speed={0.3} />
      <Txt
        position={[0, 0.42, 0]}
        fontSize={0.25}
        color={group.accent}
        anchorX="center"
        letterSpacing={0.1}
        rotation={[-Math.PI / 2.2, 0, 0]}
        maxWidth={6}
        textAlign="center"
      >
        {group.group}
      </Txt>
      <pointLight position={[0, 3, 0]} intensity={14} distance={12} color={group.accent} />
    </group>
  )
}

function SkillsZone({ zone }) {
  const { skills, ui } = useContent()
  return (
    <group position={zone.position}>
      <GlowRing radius={12.5} color={zone.accent} opacity={0.4} speed={-0.07} />
      {skills.map((g, i) => (
        <SkillTower key={g.group} group={g} index={i} total={skills.length} />
      ))}
      <ZoneSign zone={zone} title={ui.zones.skills} sub={ui.skillsSub} y={11.5} />
      <Hotspot position={[0, 1.6, 0]} color={zone.accent} onClick={() => setState({ openPanel: 'skills' })} label={ui.skillsHint} />
    </group>
  )
}

/* ───────────────────────── Projects ───────────────────────── */

function ProjectsZone({ zone }) {
  const { projects, ui } = useContent()
  const slots = useMemo(() => projectSlots(projects), [projects])
  return (
    <group>
      <group position={[0, 0, -126]}>
        <Txt fontSize={1.4} color="#f4fbff" position={[0, 7.2, 0]} anchorX="center" letterSpacing={0.04}>
          {ui.sectionWork}
        </Txt>
        <Txt fontSize={0.3} color={zone.accent} position={[0, 5.9, 0]} anchorX="center" letterSpacing={0.2}>
          {ui.caseStudies(slots.length)}
        </Txt>
      </group>
      {slots.map((p) => (
        <Monolith key={p.id} project={p} />
      ))}
      {Array.from({ length: 14 }).map((_, i) => (
        <PathLine
          key={i}
          from={[-2.4, 0.05, -128 - i * 5]}
          to={[2.4, 0.05, -128 - i * 5]}
          color={PALETTE.magenta}
          opacity={0.18}
        />
      ))}
    </group>
  )
}

/* ───────────────────────── Experience ───────────────────────── */

function ExperienceZone({ zone }) {
  const { experience, ui } = useContent()
  return (
    <group position={zone.position}>
      <GlowRing radius={8} color={zone.accent} opacity={0.42} speed={0.09} />
      <Beacon color={zone.accent} height={26} opacity={0.1} />
      {experience.map((job, i) => {
        const y = 8.6 - i * 2.9
        return (
          <group key={job.company} position={[0, y, 0]}>
            <NeonBox args={[8.6, 2.2, 0.3]} color={job.accent} opacity={0.12} />
            <Txt position={[-3.9, 0.46, 0.25]} fontSize={0.38} color="#f2faff" anchorX="left" anchorY="middle" maxWidth={7.4}>
              {job.company}
            </Txt>
            <Txt position={[-3.9, -0.05, 0.25]} fontSize={0.25} color={job.accent} anchorX="left" anchorY="middle" maxWidth={7.4}>
              {job.role}
            </Txt>
            <Txt position={[-3.9, -0.52, 0.25]} fontSize={0.18} color="#8ba6ba" anchorX="left" anchorY="middle" letterSpacing={0.08} maxWidth={7.4}>
              {`${job.period}  ·  ${job.location}`}
            </Txt>
            <mesh position={[3.9, 0, 0.3]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshBasicMaterial color={job.accent} />
            </mesh>
          </group>
        )
      })}
      <PathLine from={[3.9, 9.4, 0.3]} to={[3.9, -0.8, 0.3]} color={zone.accent} opacity={0.6} />
      <ZoneSign zone={zone} title={ui.zones.experience} sub={ui.experienceSub} y={11.6} />
      <Hotspot position={[0, 1.2, 4.4]} color={zone.accent} onClick={() => setState({ openPanel: 'experience' })} label={ui.experienceHint} />
    </group>
  )
}

/* ───────────────────────── Awards & research ───────────────────────── */

function ResearchZone({ zone }) {
  const { research, ui } = useContent()
  const [hover, setHover] = useState(null)
  return (
    <group position={zone.position}>
      <GlowRing radius={7.5} color={zone.accent} opacity={0.42} speed={-0.1} />
      {research.items.slice(0, 4).map((p, i) => {
        const angle = -0.9 + i * 0.6
        const r = 5.6
        return (
          <group
            key={p.title}
            position={[Math.sin(angle) * r, 2.1 + i * 1.9, Math.cos(angle) * r]}
            rotation={[0, angle, 0]}
            onPointerOver={(e) => {
              e.stopPropagation()
              setHover(i)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={() => {
              setHover(null)
              document.body.style.cursor = ''
            }}
            onClick={(e) => {
              e.stopPropagation()
              setState({ openPanel: 'research' })
            }}
          >
            <NeonBox args={[6.2, 1.6, 0.16]} color={zone.accent} opacity={hover === i ? 0.26 : 0.1} />
            <Txt position={[-2.8, 0.26, 0.14]} fontSize={0.22} color="#eef7ff" anchorX="left" anchorY="middle" maxWidth={5.6}>
              {p.title}
            </Txt>
            <Txt position={[-2.8, -0.42, 0.14]} fontSize={0.16} color={zone.accent} anchorX="left" anchorY="middle" letterSpacing={0.08} maxWidth={5.6}>
              {`${p.date} · ${p.kind}`}
            </Txt>
          </group>
        )
      })}
      <ZoneSign zone={zone} title={research.heading} sub={ui.researchSub} y={11} />
      <Hotspot position={[0, 1.3, 3.4]} color={zone.accent} onClick={() => setState({ openPanel: 'research' })} label={ui.researchHint} />
    </group>
  )
}

/* ───────────────────────── Contact ───────────────────────── */

function ContactZone({ zone }) {
  const { profile, ui } = useContent()
  const core = useRef()
  useFrame(({ clock }) => {
    if (core.current) {
      core.current.rotation.y += 0.004
      core.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.4) * 0.06)
    }
  })

  return (
    <group position={zone.position}>
      <GlowRing radius={10} color={zone.accent} opacity={0.5} speed={0.06} />
      <GlowRing radius={7} color={PALETTE.magenta} opacity={0.3} speed={-0.12} />
      <Beacon color={zone.accent} height={44} radius={0.9} opacity={0.2} />

      <group ref={core} position={[0, 6.4, 0]}>
        <mesh>
          <torusKnotGeometry args={[1.6, 0.34, 140, 20, 2, 3]} />
          <meshStandardMaterial color={zone.accent} emissive={zone.accent} emissiveIntensity={0.75} roughness={0.18} metalness={0.85} />
        </mesh>
      </group>

      <Txt position={[0, 2.9, 0]} fontSize={0.95} color="#f4fbff" anchorX="center" letterSpacing={0.02}>
        {ui.contactHeadline}
      </Txt>
      <Txt position={[0, 2.0, 0]} fontSize={0.28} color={zone.accent} anchorX="center" letterSpacing={0.12}>
        {profile.email}
      </Txt>
      <Hotspot position={[0, 1.0, 4.0]} color={zone.accent} onClick={() => setState({ openPanel: 'contact' })} label={ui.contactHint} />
      <pointLight position={[0, 6, 3]} intensity={22} distance={30} color={zone.accent} />
    </group>
  )
}

/* ───────────────────────── shared ───────────────────────── */

function ZoneSign({ zone, title, sub, y = 9.6 }) {
  const { ui } = useContent()
  return (
    <group position={[0, y, 0]}>
      <Txt fontSize={0.88} color="#f4fbff" anchorX="center" anchorY="middle" letterSpacing={0.03}>
        {title}
      </Txt>
      <Txt
        position={[0, -0.82, 0]}
        fontSize={0.24}
        color="#92aec3"
        anchorX="center"
        anchorY="middle"
        maxWidth={13}
        textAlign="center"
        lineHeight={1.5}
      >
        {sub}
      </Txt>
      <Txt position={[0, 0.78, 0]} fontSize={0.18} color={zone.accent} anchorX="center" letterSpacing={0.4}>
        {ui.zoneLabels[zone.id]}
      </Txt>
    </group>
  )
}

const RENDERERS = {
  hero: EntryZone,
  about: AboutZone,
  skills: SkillsZone,
  projects: ProjectsZone,
  experience: ExperienceZone,
  research: ResearchZone,
  contact: ContactZone,
}

export function World() {
  return (
    <group>
      {ZONES.map((zone) => {
        const C = RENDERERS[zone.id]
        return C ? <C key={zone.id} zone={zone} /> : null
      })}
      {ZONES.slice(0, -1).map((z, i) => {
        const n = ZONES[i + 1]
        return (
          <PathLine
            key={z.id}
            from={[z.position[0], 0.06, z.position[2]]}
            to={[n.position[0], 0.06, n.position[2]]}
            color={PALETTE.cyan}
            opacity={0.32}
          />
        )
      })}
    </group>
  )
}
