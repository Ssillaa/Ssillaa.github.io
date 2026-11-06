import { useCallback, useEffect, useRef, useState } from 'react'

import { SCENE_IDS } from './data'
import { useLang } from './i18n'
import { Controls } from './components/Controls'
import { InkTrail } from './components/InkTrail'
import { LastPage } from './components/LastPage'
import { Panel, panelFromHash, type PanelId } from './components/Panel'
import { Story } from './components/Story'

const CHAPTERS = SCENE_IDS.length - 1

export function App() {
  const { t } = useLang()
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
      ([entry]) => entry.isIntersecting && setScene(SCENE_IDS.length),
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
    const target = i < SCENE_IDS.length ? document.getElementById(`sahne-${i}`) : document.getElementById('iletisim')
    target?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <>
      <Controls progress={scene > 0 && scene <= CHAPTERS ? t.ui.progress(scene, CHAPTERS) : null} />

      <nav className="dots" aria-label={t.ui.chapters}>
        {[...SCENE_IDS.map((id) => t.scenes[id].title), t.ui.contact].map((title, i) => (
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
