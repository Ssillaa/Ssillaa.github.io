import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { SCENE_IDS, TEAM_FILES, type ProjectId } from '../data'
import { useLang } from '../i18n'
import { HobbyList } from './Hobbies'
import { ArrowDown, ArrowRight } from './Icons'
import { SceneDrawing } from './Scenes'

const PHONE = '(max-width: 899px)'

/** True on a phone-sized screen, and kept up to date when the window is resized. */
function usePhone() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(PHONE)
      query.addEventListener('change', onChange)
      return () => query.removeEventListener('change', onChange)
    },
    () => window.matchMedia(PHONE).matches,
  )
}

/**
 * The sticky stage (HIKAYE-PLANI.md, K2): the drawing stays on screen while
 * the text of each scene scrolls past it. The scene whose text crosses the
 * middle of the screen is the active one.
 */
export function Story({
  onOpen,
  onOpenMore,
  onActiveChange,
}: {
  onOpen: (id: ProjectId) => void
  onOpenMore: () => void
  onActiveChange: (i: number) => void
}) {
  const { t } = useLang()
  const phone = usePhone()
  const [active, setActive] = useState(0)
  // The furthest chapter reached: on a phone a drawing draws itself once,
  // when its chapter is first reached, and is never erased again.
  const [seen, setSeen] = useState(0)
  // The first drawing starts blank and draws itself in once the page has
  // painted; drawn from the first frame it would simply appear, finished.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 120)
    return () => window.clearTimeout(timer)
  }, [])
  const [step, setStep] = useState(0)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    // The chapter that counts is the one crossing a line across the screen:
    // the middle on a desktop; on a phone, where each chapter carries its own
    // drawing, a little lower, so a drawing starts as it comes into view.
    const line = phone ? '-62% 0px -38% 0px' : '-50% 0px -50% 0px'
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index)
            setActive(i)
            setSeen((s) => Math.max(s, i))
            onActiveChange(i)
          }
        }
      },
      { rootMargin: line },
    )
    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [onActiveChange, phone])

  return (
    <div className="story">
      {!phone && (
        <div className="stage" aria-live="off">
          <div className="stage__frame">
            {SCENE_IDS.map((id, i) => (
              <SceneDrawing key={id} id={id} active={ready && i === active} words={t.drawing} />
            ))}
          </div>
        </div>
      )}

      <div className="steps">
        {SCENE_IDS.map((sceneId, i) => {
          const scene = { id: sceneId, ...t.scenes[sceneId] }
          return (
          <section
            key={scene.id}
            id={`sahne-${i}`}
            data-index={i}
            ref={(el) => {
              stepRefs.current[i] = el
            }}
            className={i === active ? 'step is-active' : 'step'}
          >
            {phone && (
              <div className="step__art">
                <SceneDrawing id={scene.id} active={ready && i <= seen} words={t.drawing} />
              </div>
            )}
            <span className="eyebrow">{scene.label}</span>
            {i === 0 ? <h1 className="step__title step__title--cover">{scene.title}</h1> : <h2 className="step__title">{scene.title}</h2>}
            {scene.id === 'cover' && (
              <p className="byline">{t.cover.role}</p>
            )}
            <p className="step__text">{scene.text}</p>

            {scene.id === 'cover' && (
              <>
                <dl className="facts">
                  {t.cover.facts.map((f) => (
                    <div key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="cta">
                  <button type="button" className="btn btn--outline" onClick={onOpenMore}>
                    {t.cover.more} <ArrowRight />
                  </button>
                  <a href="#sahne-1" className="hint">
                    <ArrowDown /> {t.cover.ctaNote}
                  </a>
                </div>
              </>
            )}

            {scene.id === 'product' && (
              <section className="projects" aria-labelledby="projelerim">
                <div className="projects__head">
                  <h3 id="projelerim" className="projects__title">
                    {t.ui.projectsHeading}
                  </h3>
                  <span className="projects__hint">{t.ui.projectsHint}</span>
                </div>
                <div className="projects__grid">
                  {(['talentagent', ...TEAM_FILES] as ProjectId[]).map((id) => (
                    <button
                      key={id}
                      type="button"
                      className={id === 'talentagent' ? 'pcard pcard--main' : 'pcard'}
                      onClick={() => onOpen(id)}
                    >
                      <span className="pcard__kind">{id === 'talentagent' ? t.ui.mainKind : t.projects[id].kind}</span>
                      <span className="pcard__title">{t.projects[id].title}</span>
                      <span className="pcard__summary">{t.projects[id].summary}</span>
                      {t.projects[id].status && (
                        <span className="live">
                          <span className="live__dot" aria-hidden="true" />
                          {t.projects[id].status}
                        </span>
                      )}
                      <span className="pcard__more">
                        {t.ui.details} <ArrowRight />
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            )}

            {scene.id === 'bridge' && (
              <>
                <div className="howto">
                  <span className="howto__label">{t.ui.howto}</span>
                  <p className="howto__text" aria-live="polite">
                    <strong>
                      {String(step + 1).padStart(2, '0')} {t.steps[step].title}.
                    </strong>{' '}
                    {t.steps[step].text}
                  </p>
                  <div className="howto__tabs" role="group" aria-label={t.ui.howtoAria}>
                    {t.steps.map((s, n) => (
                      <button
                        key={n}
                        type="button"
                        className={n === step ? 'howto__tab is-active' : 'howto__tab'}
                        aria-pressed={n === step}
                        onClick={() => setStep(n)}
                      >
                        <span>{String(n + 1).padStart(2, '0')}</span> {s.title}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {scene.id === 'music' && <HobbyList />}
          </section>
          )
        })}
      </div>
    </div>
  )
}
