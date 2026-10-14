'use client'

import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

/**
 * Seamless CSS marquee. The children are rendered twice and the track slides
 * exactly half its width, so the loop has no visible seam and no JS runs.
 */
export function Marquee({
  children,
  className,
  slow = false,
  reverse = false,
}: {
  children: ReactNode
  className?: string
  slow?: boolean
  reverse?: boolean
}) {
  return (
    <div
      className={cn(
        'group relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-max shrink-0 gap-3 pr-3',
          slow ? 'animate-marquee-slow' : 'animate-marquee',
          reverse && '[animation-direction:reverse]',
          'group-hover:[animation-play-state:paused]',
        )}
      >
        {children}
        {children}
      </div>
    </div>
  )
}
