'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Check, Copy, Globe2, MapPin, Quote } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Marquee } from '@/components/ui/Marquee'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const STACK = [
  'Python', 'TypeScript', 'Vue 3', 'C / C++', 'Java', 'SQL',
  'Ollama', 'ESP32-S3', 'WebSocket', 'Spring Boot', 'Flowable',
  'PostgreSQL', 'Redis', 'Elasticsearch', 'jieba', 'gensim',
  'pandas', 'Unity 6', 'OpenXR', 'Git', 'Linux', 'Postman',
]

/** The five-step pipeline every project walks, drawn as a lit rail. */
function Chain({ steps }: { steps: string[] }) {
  return (
    <ol className="relative mt-7 space-y-0">
      {steps.map((step, i) => (
        <motion.li
          key={step}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5 }}
          className="relative flex items-center gap-4 pb-6 last:pb-0"
        >
          {i < steps.length - 1 && (
            <span className="absolute left-[11px] top-6 h-full w-px bg-gradient-to-b from-accent/60 to-accent/5" />
          )}
          <span className="relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-accent/40 bg-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
          </span>
          <span className="font-mono text-[13px] tracking-wide text-slate-300">{step}</span>
        </motion.li>
      ))}
    </ol>
  )
}

function CopyEmail({ email, label, copied }: { email: string; label: string; copied: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email)
          setDone(true)
          setTimeout(() => setDone(false), 1800)
        } catch {
          // clipboard can be blocked; the mailto link below still works
          window.location.href = `mailto:${email}`
        }
      }}
      className="mt-4 inline-flex items-center gap-2 rounded-xl border border-line bg-white/[0.04] px-4 py-2.5 font-mono text-xs text-slate-200 transition-colors hover:border-accent/50 hover:text-accent"
    >
      {done ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      {done ? copied : label}
    </button>
  )
}

export function About() {
  const { t } = useLang()

  return (
    <section id="about" className="relative mx-auto max-w-7xl scroll-mt-28 px-5 py-24 sm:py-32">
      <SectionHeading eyebrow={t.about.eyebrow} heading={t.about.heading} />

      <div className="grid auto-rows-[minmax(140px,auto)] grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-6">
        {t.about.cards.map((card, i) => (
          <Reveal key={card.id} delay={i * 0.06} className={cn('h-full', card.className)}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card/60 p-6 transition-colors duration-300 hover:border-white/20 sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.35]" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-accent/10 blur-3xl transition-opacity duration-500 group-hover:opacity-150" />

              <div className="relative flex h-full flex-col">
                <h3 className="text-pretty text-lg font-semibold leading-snug text-slate-100">{card.title}</h3>
                {card.description && (
                  <p className="mt-2.5 text-sm leading-relaxed text-mist">{card.description}</p>
                )}

                {card.variant === 'chain' && <Chain steps={t.about.chainSteps} />}

                {card.variant === 'stack' && (
                  <div className="mt-5 -mx-6 sm:-mx-7">
                    <Marquee className="py-1">
                      {STACK.map((s) => (
                        <span
                          key={s}
                          className="whitespace-nowrap rounded-lg border border-line bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </Marquee>
                    <Marquee className="mt-2 py-1" reverse slow>
                      {STACK.slice().reverse().map((s) => (
                        <span
                          key={`r-${s}`}
                          className="whitespace-nowrap rounded-lg border border-line bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] text-slate-300"
                        >
                          {s}
                        </span>
                      ))}
                    </Marquee>
                  </div>
                )}

                {card.variant === 'location' && (
                  <div className="mt-auto flex items-center gap-2 pt-5 font-mono text-[11px] uppercase tracking-wider text-accent">
                    <MapPin className="h-3.5 w-3.5" />
                    {t.profile.targetCities}
                  </div>
                )}

                {card.variant === 'bilingual' && (
                  <div className="mt-auto flex items-center gap-3 pt-5">
                    <Globe2 className="h-4 w-4 text-accent-2" />
                    <div className="flex gap-2 font-mono text-[11px]">
                      <span className="rounded-md border border-line px-2 py-1 text-slate-300">EN · IELTS 7.5</span>
                      <span className="rounded-md border border-line px-2 py-1 text-slate-300">中文 · HSK5</span>
                      <span className="rounded-md border border-line px-2 py-1 text-slate-300">اردو</span>
                    </div>
                  </div>
                )}

                {card.variant === 'quote' && (
                  <blockquote className="relative mt-4">
                    <Quote className="absolute -left-1 -top-1 h-7 w-7 text-accent/20" aria-hidden />
                    <p className="pl-8 text-pretty text-[15px] leading-relaxed text-slate-300">{t.about.quote}</p>
                  </blockquote>
                )}

                {card.variant === 'cta' && (
                  <div className="mt-auto">
                    <CopyEmail email={t.profile.email} label={t.about.ctaLabel} copied={t.about.ctaCopied} />
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
