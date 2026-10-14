'use client'

import { motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { useLang } from '@/lib/i18n'

/**
 * Timeline where the rail fills as the section scrolls past, so the eye is led
 * from the most recent role downward.
 */
export function Experience() {
  const { t } = useLang()

  return (
    <section id="experience" className="relative mx-auto max-w-5xl scroll-mt-28 px-5 py-24 sm:py-32">
      <SectionHeading eyebrow={t.experience.eyebrow} heading={t.experience.heading} sub={t.experience.sub} />

      <div className="relative">
        {/* the rail */}
        <div className="absolute left-[15px] top-2 hidden h-[calc(100%-1rem)] w-px bg-line sm:block">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="h-full w-full origin-top bg-gradient-to-b from-accent via-accent-2 to-transparent"
          />
        </div>

        <div className="space-y-5">
          {t.experience.items.map((job, i) => (
            <Reveal key={job.company} delay={i * 0.08}>
              <div className="relative sm:pl-14">
                <span className="absolute left-0 top-7 hidden h-8 w-8 place-items-center rounded-full border border-line bg-ink sm:grid">
                  <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
                </span>

                <article className="group relative overflow-hidden rounded-2xl border border-line bg-card/60 p-6 transition-colors hover:border-white/20 sm:p-7">
                  <div className="pointer-events-none absolute -left-24 top-0 h-full w-48 bg-gradient-to-r from-accent/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold text-slate-50">{job.company}</h3>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-accent">{job.period}</span>
                  </div>

                  <p className="relative mt-1 font-mono text-[12px] text-slate-400">
                    {job.role} · {job.location}
                  </p>
                  <p className="relative mt-3.5 text-pretty text-[15px] leading-relaxed text-slate-300">{job.blurb}</p>

                  <ul className="relative mt-4 space-y-2">
                    {job.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm leading-relaxed text-mist">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-slate-600" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
