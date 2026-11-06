import { useCallback, useEffect, useRef, useState } from 'react'

import { SCENES } from './data'
import { InkTrail } from './components/InkTrail'
import { LastPage } from './components/LastPage'
import { Panel, panelFromHash, type PanelId } from './components/Panel'
import { Story } from './components/Story'

const CHAPTERS = SCENES.length - 1

export function App() {
  const [panel, setPanel] = useState<PanelId | null>(() => panelFromHash(window.location.hash))
  const [scene, setScene] = useState(0)
  const pushed = useRef(false)

  // The open panel lives in the address (#kunye, #talentagent …): a link opens
  // it directly and the browser's back button closes it.
  useEffect(() => {
    const sync = () => {
      const id = panelFromHash(window.location.hash)
      if (!id) pushed.current = false
      setPanel(id)
    }
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  // The last page has no step of its own in the story; light its dot when it is on screen.
  useEffect(() => {
    const last = document.getElementById('iletisim')
    if (!last) return
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setScene(SCENES.length),
      { rootMargin: '-50% 0px -50% 0px' },
    )
    observer.observe(last)
    return () => observer.disconnect()
  }, [])

  const open = useCallback((id: PanelId) => {
    if (pushed.current) window.history.replaceState(null, '', `#${id}`)
    else window.history.pushState(null, '', `#${id}`)
    pushed.current = true
    setPanel(id)
  }, [])

  const close = useCallback(() => {
    if (pushed.current) {
      // Undo our own history entry, so Back does not reopen the panel.
      pushed.current = false
      window.history.back()
      return
    }
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
    setPanel(null)
  }, [])

  const goTo = (i: number) => {
    const target = i < SCENES.length ? document.getElementById(`sahne-${i}`) : document.getElementById('iletisim')
    target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <>
      {scene > 0 && scene <= CHAPTERS && (
        <span className="progress" aria-hidden="true">
          Bölüm {scene} / {CHAPTERS}
        </span>
      )}

      <nav className="dots" aria-label="Bölümler">
        {[...SCENES.map((s) => s.title), 'İletişim'].map((title, i) => (
          <button
            key={title}
            type="button"
            className={i === scene ? 'dot is-active' : 'dot'}
            aria-label={title}
            aria-current={i === scene ? 'step' : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </nav>

      <main>
        <Story onOpen={open} onOpenMore={() => open('kunye')} onActiveChange={setScene} />
      </main>
      <LastPage />

      <Panel id={panel} onClose={close} onOpen={open} />
      <InkTrail />
    </>
  )
}
