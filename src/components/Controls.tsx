import { useEffect, useState } from 'react'

import { LANGS } from '../data'
import { useLang } from '../i18n'
import { Moon, Sun } from './Icons'

type Theme = 'light' | 'dark'

/** The theme the inline script in index.html already put on <html>. */
function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

/**
 * The two switches in the top corner: language and day/night. The chapter
 * counter sits beside them on a desktop.
 */
export function Controls({ progress }: { progress: string | null }) {
  const { lang, setLang, t } = useLang()
  const [theme, setTheme] = useState<Theme>(currentTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#121a17' : '#f2f0e8')
  }, [theme])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Not remembered across visits; the system setting decides next time.
    }
  }

  return (
    <div className="controls">
      {progress && (
        <span className="progress" aria-hidden="true">
          {progress}
        </span>
      )}
      <div className="switch" role="group" aria-label={t.ui.langLabel}>
        {LANGS.map((l) => (
          <button key={l} type="button" lang={l} className={l === lang ? 'switch__opt is-on' : 'switch__opt'} aria-pressed={l === lang} onClick={() => setLang(l)}>
            {l.toUpperCase()}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="theme-btn"
        aria-label={theme === 'dark' ? t.ui.toLight : t.ui.toDark}
        title={theme === 'dark' ? t.ui.toLight : t.ui.toDark}
        onClick={toggle}
      >
        {theme === 'dark' ? <Sun /> : <Moon />}
      </button>
    </div>
  )
}
