'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Download, Languages, Menu, X } from 'lucide-react'
import { useLang } from '@/lib/i18n'
import { LANGUAGES } from '@/content'
import { asset, cn } from '@/lib/utils'

/**
 * Floating pill nav. It hides as you scroll down and comes back the moment you
 * scroll up, so it never covers what you are reading but is always one flick away.
 */
export function Nav() {
  const { t, lang, setLang } = useLang()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > previous && y > 320 && !open)
  })

  // highlight the section currently filling the viewport
  useEffect(() => {
    const ids = t.nav.map((n) => n.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [t.nav])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -110 : 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={cn(
          'flex w-full max-w-5xl items-center justify-between gap-3 rounded-2xl border border-line px-3 py-2.5 transition-colors duration-300 sm:px-4',
          scrolled ? 'glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.9)]' : 'border-transparent bg-transparent',
        )}
      >
        <a href="#top" className="group flex shrink-0 items-center gap-2.5" aria-label="Back to top">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-accent/40 bg-accent/10 font-mono text-xs font-semibold text-accent transition-transform group-hover:scale-105">
            {t.profile.initials}
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold text-slate-100">{t.profile.name}</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
              {t.profile.role}
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {t.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'relative rounded-lg px-3 py-2 text-sm transition-colors',
                active === item.href ? 'text-slate-50' : 'text-slate-400 hover:text-slate-100',
              )}
            >
              {active === item.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-lg bg-white/[0.07]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="flex items-center gap-0.5 rounded-xl border border-line bg-white/[0.03] p-0.5">
            <Languages className="ml-1.5 h-3.5 w-3.5 text-slate-500" aria-hidden />
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                aria-pressed={lang === l.code}
                title={l.name}
                className={cn(
                  'rounded-lg px-2.5 py-1.5 font-mono text-[11px] transition-colors',
                  lang === l.code ? 'bg-accent text-ink' : 'text-slate-400 hover:text-slate-100',
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          <a
            href={asset(t.profile.resumeUrl)}
            download
            className="hidden items-center gap-1.5 rounded-xl border border-line bg-white/[0.03] px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-slate-300 transition-colors hover:border-accent/50 hover:text-slate-50 sm:flex"
          >
            <Download className="h-3.5 w-3.5" aria-hidden />
            CV
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-white/[0.03] text-slate-300 md:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass absolute inset-x-4 top-20 rounded-2xl p-2 md:hidden"
          >
            {t.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-slate-50"
              >
                {item.label}
              </a>
            ))}
            <a
              href={asset(t.profile.resumeUrl)}
              download
              className="mt-1 flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-accent"
            >
              <Download className="h-4 w-4" />
              {t.hero.secondaryCta}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
