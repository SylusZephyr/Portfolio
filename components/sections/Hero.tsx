'use client'

import { motion } from 'motion/react'
import { ArrowDown, Download, MapPin } from 'lucide-react'
import { Spotlight } from '@/components/ui/Spotlight'
import { MagicButton } from '@/components/ui/MagicButton'
import { useLang } from '@/lib/i18n'
import { asset } from '@/lib/utils'

/** Headline that assembles word by word on load. */
function WordReveal({ text }: { text: string }) {
  // Chinese has no spaces, so fall back to per-character for CJK copy
  const spaced = /\s/.test(text)
  const tokens = spaced ? text.split(' ') : Array.from(text)

  return (
    <h1 className="max-w-4xl text-balance text-center text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
      {tokens.map((token, i) => (
        <motion.span
          key={`${token}-${i}`}
          initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: 0.25 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
          // the space has to be a real character inside the span, kept by
          // whitespace-pre: a margin would look right but leave the headline
          // as one unbroken word for copy-paste and screen readers
          className="inline-block whitespace-pre text-slate-100"
        >
          {spaced ? `${token} ` : token}
        </motion.span>
      ))}
    </h1>
  )
}

export function Hero() {
  const { t } = useLang()

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-20 pt-32">
      {/* light + grid backdrop */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Spotlight className="-left-10 -top-40 h-screen md:-left-32 md:-top-20" fill="#38bdf8" />
        <Spotlight className="left-full top-10 h-[80vh] w-[50vw]" fill="#a855f7" />
        <Spotlight className="left-1/4 top-28 h-[60vh] w-[50vw]" fill="#22d3ee" />
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-ink [mask-image:radial-gradient(ellipse_at_center,transparent_8%,black_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.04] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-300 sm:text-[11px]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t.hero.eyebrow}
        </motion.span>

        <WordReveal text={t.hero.headlineWords} />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-7 max-w-2xl text-pretty text-center text-base leading-relaxed text-mist sm:text-lg"
        >
          {t.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <MagicButton
            title={t.hero.primaryCta}
            href="#work"
            icon={<ArrowDown className="h-4 w-4" />}
            className="w-full sm:w-auto"
          />
          <MagicButton
            variant="ghost"
            title={t.hero.secondaryCta}
            href={asset(t.profile.resumeUrl)}
            download
            icon={<Download className="h-4 w-4" />}
            position="left"
            className="w-full sm:w-auto"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-14 grid w-full max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {t.hero.stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-line bg-white/[0.02] px-4 py-4 text-center backdrop-blur-sm"
            >
              <div className="font-mono text-2xl font-semibold text-slate-50 sm:text-3xl">{s.value}</div>
              <div className="mt-1 text-[11px] uppercase tracking-wider text-slate-500">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-10 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500"
        >
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {t.profile.location}
        </motion.div>
      </div>
    </section>
  )
}
