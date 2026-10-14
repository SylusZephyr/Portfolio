'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { dictionaries, DEFAULT_LANG, type Content, type Lang } from '@/content'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Content }

const LangContext = createContext<Ctx | null>(null)
const STORAGE_KEY = 'portfolio:lang'

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG)

  // Resolve the stored or browser language after mount: the markup is
  // pre-rendered at build time, so reading either during render would
  // produce a hydration mismatch.
  useEffect(() => {
    let stored: string | null = null
    try {
      stored = localStorage.getItem(STORAGE_KEY)
    } catch {
      /* private mode */
    }
    const guess = navigator.language?.toLowerCase().startsWith('zh') ? 'zh' : 'en'
    const next = (stored === 'en' || stored === 'zh' ? stored : guess) as Lang
    setLangState(next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    document.documentElement.dataset.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* private mode */
    }
  }, [])

  const value = useMemo<Ctx>(() => ({ lang, setLang, t: dictionaries[lang] }), [lang, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
