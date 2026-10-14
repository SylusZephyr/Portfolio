'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

/**
 * Pointer-tracking card: a subtle 3D tilt plus a spotlight that follows the
 * cursor. Both are CSS transforms driven by motion values, so nothing
 * re-renders React on pointer move.
 */
export function TiltCard({
  children,
  className,
  accent = '#22d3ee',
  intensity = 7,
}: {
  children: ReactNode
  className?: string
  accent?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 })

  const glowX = useMotionTemplate`${useSpring(x, { stiffness: 260, damping: 28 })}`
  const glowY = useMotionTemplate`${useSpring(y, { stiffness: 260, damping: 28 })}`

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    x.set(px)
    y.set(py)
    rotateY.set((px - 0.5) * intensity * 2)
    rotateX.set(-(py - 0.5) * intensity * 2)
  }

  const reset = () => {
    rotateX.set(0)
    rotateY.set(0)
    x.set(0.5)
    y.set(0.5)
  }

  const background = useMotionTemplate`radial-gradient(420px circle at calc(${glowX} * 100%) calc(${glowY} * 100%), ${accent}22, transparent 70%)`

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className={cn(
        'group relative isolate overflow-hidden rounded-3xl border border-line bg-card/70 transition-colors duration-300 hover:border-white/20',
        className,
      )}
    >
      <motion.div
        style={{ background }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />
      {children}
    </motion.div>
  )
}
