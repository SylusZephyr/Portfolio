'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Primary CTA with a conic border that sweeps once per rotation. */
export function MagicButton({
  title,
  icon,
  position = 'right',
  href,
  download,
  onClick,
  variant = 'primary',
  className,
}: {
  title: string
  icon?: ReactNode
  position?: 'left' | 'right'
  href?: string
  download?: boolean
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
}) {
  const inner = (
    <>
      {position === 'left' && icon}
      {title}
      {position === 'right' && icon}
    </>
  )

  if (variant === 'ghost') {
    return (
      <a
        href={href}
        download={download}
        onClick={onClick}
        className={cn(
          'inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line bg-white/[0.03] px-6 text-sm font-medium text-slate-200 transition-all hover:border-white/25 hover:bg-white/[0.07]',
          className,
        )}
      >
        {inner}
      </a>
    )
  }

  const body = (
    <span className="relative inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink-soft px-6 text-sm font-medium text-slate-50 backdrop-blur-3xl transition-colors group-hover:bg-ink-soft/85">
      {inner}
    </span>
  )

  const shell = cn(
    'group relative inline-flex h-12 overflow-hidden rounded-xl p-[1.5px] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60',
    className,
  )

  const sweep = (
    <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#22d3ee_0%,#a855f7_50%,#22d3ee_100%)]" />
  )

  return href ? (
    <a href={href} download={download} onClick={onClick} className={shell}>
      {sweep}
      {body}
    </a>
  ) : (
    <button onClick={onClick} className={shell}>
      {sweep}
      {body}
    </button>
  )
}
