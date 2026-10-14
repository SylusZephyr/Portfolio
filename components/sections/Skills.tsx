'use client'

import { motion } from 'motion/react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { useLang } from '@/lib/i18n'

export function Skills() {
  const { t } = useLang()

  return (
    <section id="skills" className="relative mx-auto max-w-7xl scroll-mt-28 px-5 py-24 sm:py-32">
      <SectionHeading eyebrow={t.skills.eyebrow} heading={t.skills.heading} sub={t.skills.sub} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.skills.groups.map((group, gi) => (
          <Reveal key={group.group} delay={gi * 0.05}>
            <div className="group h-full rounded-3xl border border-line bg-card/60 p-6 transition-colors hover:border-white/20">
              <div className="mb-6 flex items-center gap-2.5">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: group.accent, boxShadow: `0 0 12px ${group.accent}` }}
                />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-200">{group.group}</h3>
              </div>

              <div className="space-y-4">
                {group.items.map((item, i) => (
                  <div key={item.name}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-pretty text-[13px] text-slate-300">{item.name}</span>
                      <span className="shrink-0 font-mono text-[11px] text-slate-500">{item.level}</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.level}%` }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full"
                        style={{ background: group.accent, boxShadow: `0 0 10px ${group.accent}80` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
