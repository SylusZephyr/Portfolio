'use client'

import { Reveal } from './Reveal'

export function SectionHeading({
  eyebrow,
  heading,
  sub,
  align = 'center',
}: {
  eyebrow: string
  heading: string
  sub?: string
  align?: 'center' | 'left'
}) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'
  return (
    <Reveal className={`mb-14 flex flex-col ${alignment}`}>
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </span>
      <h2 className="max-w-3xl text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
      {sub && <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-mist">{sub}</p>}
    </Reveal>
  )
}
