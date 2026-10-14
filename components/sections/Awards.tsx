'use client'

import { Award as AwardIcon, GraduationCap } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { useLang } from '@/lib/i18n'

export function Awards() {
  const { t } = useLang()

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 sm:py-32">
      <SectionHeading eyebrow={t.awards.eyebrow} heading={t.awards.heading} sub={t.awards.sub} />

      <div className="grid gap-4 md:grid-cols-2">
        {t.awards.items.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <article className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card/60 p-6 transition-colors hover:border-white/20 sm:p-7">
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03]">
                  <AwardIcon className="h-4.5 w-4.5 text-amber-400" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-400">{a.kind}</span>
                    <span className="font-mono text-[11px] text-slate-500">{a.date}</span>
                  </div>
                  <h3 className="mt-2 text-pretty text-base font-semibold leading-snug text-slate-50">{a.title}</h3>
                </div>
              </div>

              <p className="relative mt-4 text-pretty text-sm leading-relaxed text-mist">{a.detail}</p>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {a.tags.map((tag) => (
                  <span key={tag} className="rounded-lg border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <h3 className="mb-5 mt-14 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-400">
          <GraduationCap className="h-4 w-4 text-accent" />
          {t.awards.educationHeading}
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          {t.awards.education.map((e) => (
            <div key={e.credential} className="rounded-3xl border border-line bg-card/60 p-6 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="text-base font-semibold text-slate-50">{e.school}</h4>
                <span className="font-mono text-[11px] text-accent">{e.period}</span>
              </div>
              <p className="mt-1.5 text-sm text-slate-300">{e.credential}</p>
              <p className="mt-3 text-pretty text-[13px] leading-relaxed text-mist">{e.detail}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
