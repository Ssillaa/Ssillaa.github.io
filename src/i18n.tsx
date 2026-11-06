import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

import { CONTENT, type Content, type Lang } from './data'

/*
 * Two languages, no library: the whole text of the site is one object per
 * language (`data.ts`), and this context says which one is on screen.
 * The first visit follows `?lang=`, then the last choice, then the browser.
 */
const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void; t: Content } | null>(null)

function firstLang(): Lang {
  const asked = new URLSearchParams(window.location.search).get('lang')
  if (asked === 'tr' || asked === 'en') return asked
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'tr' || saved === 'en') return saved
  } catch {
    // Storage can be blocked; the browser language decides then.
  }
  return navigator.language.toLowerCase().startsWith('tr') ? 'tr' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(firstLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = CONTENT[lang].meta.title
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // Not remembered across visits; nothing else depends on it.
    }
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang, t: CONTENT[lang] }}>{children}</LangContext.Provider>
}

export function useLang() {
  const value = useContext(LangContext)
  if (!value) throw new Error('useLang needs LangProvider')
  return value
}
