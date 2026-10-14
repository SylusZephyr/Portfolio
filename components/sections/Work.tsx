'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, X } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { TiltCard } from '@/components/ui/TiltCard'
import { useLang } from '@/lib/i18n'
import type { Project } from '@/content/types'
import { cn } from '@/lib/utils'

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLang()
  const labels = t.projects.labels

  // lock the page behind the dialog and close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-ink/85 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.article
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-line bg-card"
      >
        <div className={cn('absolute inset-x-0 top-0 h-56 bg-gradient-to-b opacity-70', project.gradient)} />

        <header className="relative px-6 pb-6 pt-8 sm:px-9 sm:pt-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: project.accent }}>
            {project.kind} · {project.period}
          </span>
          <h3 className="mt-3 text-pretty text-2xl font-semibold leading-tight text-slate-50 sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 text-pretty text-[15px] leading-relaxed text-slate-300">{project.summary}</p>

          <button
            onClick={onClose}
            aria-label={labels.close}
            className="absolute right-5 top-6 grid h-9 w-9 place-items-center rounded-xl border border-line bg-ink/60 text-slate-400 transition-colors hover:text-slate-100"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="relative grid grid-cols-3 gap-px border-y border-line bg-line">
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-card px-4 py-5 text-center">
              <div className="font-mono text-lg font-semibold text-slate-50 sm:text-xl">{m.value}</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">{m.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-7 px-6 py-8 sm:px-9">
          {([
            [labels.problem, project.problem],
            [labels.approach, project.approach],
          ] as const).map(([label, body]) => (
            <section key={label}>
              <h4 className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: project.accent }}>
                {label}
              </h4>
              <p className="text-pretty text-[15px] leading-relaxed text-slate-300">{body}</p>
            </section>
          ))}

          <section>
            <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: project.accent }}>
              {labels.outcome}
            </h4>
            <ul className="space-y-2.5">
              {project.outcome.map((o) => (
                <li key={o} className="flex gap-3 text-[15px] leading-relaxed text-slate-300">
                  <span
                    className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: project.accent }}
                  />
                  {o}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">{labels.stack}</h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="rounded-lg border border-line bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] text-slate-300">
                  {s}
                </span>
              ))}
            </div>
          </section>

          {project.links.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-1">
              {project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-line px-4 py-2.5 text-sm text-slate-200 transition-colors hover:border-white/25"
                >
                  {l.label}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.article>
    </motion.div>
  )
}

export function Work() {
  const { t } = useLang()
  const [open, setOpen] = useState<string | null>(null)
  const active = t.projects.items.find((p) => p.id === open) ?? null

  return (
    <section id="work" className="relative mx-auto max-w-7xl scroll-mt-28 px-5 py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <SectionHeading eyebrow={t.projects.eyebrow} heading={t.projects.heading} sub={t.projects.sub} />

      <div className="grid gap-5 md:grid-cols-2">
        {t.projects.items.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.07} className={cn(p.featured && 'md:col-span-1')}>
            <TiltCard accent={p.accent} className="h-full">
              <button
                onClick={() => setOpen(p.id)}
                className="flex h-full w-full flex-col p-6 text-left sm:p-8"
                aria-label={`${t.projects.labels.open}: ${p.title}`}
              >
                <div className={cn('pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b', p.gradient)} />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: p.accent }}>
                    {p.kind}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] text-slate-500">{p.period}</span>
                </div>

                <h3 className="relative mt-4 text-pretty text-xl font-semibold leading-snug text-slate-50 sm:text-2xl">
                  {p.title}
                </h3>
                <p className="relative mt-3 text-pretty text-sm leading-relaxed text-mist">{p.summary}</p>

                <div className="relative mt-6 flex flex-wrap gap-2">
                  {p.stack.slice(0, 5).map((s) => (
                    <span key={s} className="rounded-lg border border-line bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-slate-400">
                      {s}
                    </span>
                  ))}
                  {p.stack.length > 5 && (
                    <span className="rounded-lg px-2.5 py-1 font-mono text-[10px] text-slate-500">
                      +{p.stack.length - 5}
                    </span>
                  )}
                </div>

                <div className="relative mt-auto grid grid-cols-3 gap-3 pt-7">
                  {p.metrics.map((m) => (
                    <div key={m.label}>
                      <div className="font-mono text-base font-semibold text-slate-100">{m.value}</div>
                      <div className="mt-0.5 text-[10px] uppercase tracking-wider text-slate-500">{m.label}</div>
                    </div>
                  ))}
                </div>

                <div
                  className="relative mt-6 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider transition-transform group-hover:translate-x-1"
                  style={{ color: p.accent }}
                >
                  {t.projects.labels.open}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </div>
              </button>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>{active && <CaseStudy project={active} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}
