import { en } from './en'
import { zh } from './zh'
import type { Content, Lang } from './types'

export const dictionaries: Record<Lang, Content> = { en, zh }

export const LANGUAGES: { code: Lang; label: string; name: string }[] = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'zh', label: '中文', name: '简体中文' },
]

export const DEFAULT_LANG: Lang = 'en'
export type { Content, Lang }
