'use client'

import { useState } from 'react'
import { Check, Copy, Download, Github, Mail, MessageCircle, Phone } from 'lucide-react'
import { Reveal } from '@/components/ui/Reveal'
import { MagicButton } from '@/components/ui/MagicButton'
import { useLang } from '@/lib/i18n'
import { asset } from '@/lib/utils'

function CopyRow({
  icon,
  label,
  value,
  href,
  copied,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  copied: string
}) {
  const [done, setDone] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      setTimeout(() => setDone(false), 1800)
    } catch {
      /* clipboard blocked — the link beside it still works */
    }
  }

  const body = (
    <>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-white/[0.03] text-accent transition-colors group-hover:border-accent/40">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</span>
        <span className="block truncate text-sm text-slate-200">{value}</span>
      </span>
    </>
  )

  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-line bg-card/50 p-3 transition-colors hover:border-white/20">
      {href ? (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer noopener" className="flex flex-1 items-center gap-3">
          {body}
        </a>
      ) : (
        <div className="flex flex-1 items-center gap-3">{body}</div>
      )}
      <button
        onClick={copy}
        aria-label={`${label}: copy`}
        title={done ? copied : undefined}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-200"
      >
        {done ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}

export function Contact() {
  const { t } = useLang()
  const p = t.profile

  return (
    <section id="contact" className="relative scroll-mt-28 overflow-hidden px-5 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <Reveal className="flex flex-col items-center text-center">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t.contact.availability}
          </span>

          <h2 className="max-w-2xl text-balance text-3xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
            {t.contact.heading}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-mist">{t.contact.sub}</p>

          <div className="mt-9 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
            <MagicButton
              title={t.contact.emailCta}
              href={`mailto:${p.email}`}
              icon={<Mail className="h-4 w-4" />}
              position="left"
              className="w-full sm:w-auto"
            />
            <MagicButton
              variant="ghost"
              title={t.contact.resumeCta}
              href={asset(p.resumeUrl)}
              download
              icon={<Download className="h-4 w-4" />}
              position="left"
              className="w-full sm:w-auto"
            />
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-12 grid gap-3 sm:grid-cols-2">
            <CopyRow icon={<Mail className="h-4 w-4" />} label="Email" value={p.email} href={`mailto:${p.email}`} copied={t.contact.copied} />
            <CopyRow icon={<Github className="h-4 w-4" />} label="GitHub" value={p.githubHandle} href={p.github} copied={t.contact.copied} />
            <CopyRow icon={<Phone className="h-4 w-4" />} label="Phone" value={p.phone} href={`tel:${p.phone.replace(/\s/g, '')}`} copied={t.contact.copied} />
            <CopyRow icon={<MessageCircle className="h-4 w-4" />} label="WeChat" value={p.wechat} copied={t.contact.copied} />
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-card/50 p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{t.contact.rolesLabel}</div>
              <div className="mt-2 text-pretty text-sm text-slate-300">{p.targetRoles}</div>
            </div>
            <div className="rounded-2xl border border-line bg-card/50 p-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">{t.contact.citiesLabel}</div>
              <div className="mt-2 text-pretty text-sm text-slate-300">{p.targetCities}</div>
            </div>
          </div>
        </Reveal>

        <footer className="mt-20 flex flex-col items-center gap-2 border-t border-line pt-8 text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400">{t.footer.rights}</span>
          <span className="text-[11px] text-slate-600">{t.footer.built}</span>
        </footer>
      </div>
    </section>
  )
}
