import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Static export is served under /Portfolio on GitHub Pages. */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  return `${base}/${path.replace(/^\//, '')}`
}
