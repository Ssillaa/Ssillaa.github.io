import { useEffect, useRef, useState } from 'react'

import { SCENE_IDS, TEAM_FILES, type ProjectId } from '../data'
import { useLang } from '../i18n'
import { HobbyList } from './Hobbies'
import { ArrowDown, ArrowRight } from './Icons'
import { SceneDrawing } from './Scenes'

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
  const [active, setActive] = useState(0)
  const [step, setStep] = useState(0)
  const stepRefs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    // The text that counts is the one crossing a line through the text area:
    // the middle of the screen on a desktop, lower on a phone, where the
    // drawing takes the top of the screen (K10).
    const phone = window.matchMedia('(max-width: 899px)').matches
    const line = phone ? '-68% 0px -32% 0px' : '-50% 0px -50% 0px'
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index)
            setActive(i)
            onActiveChange(i)
          }
        }
      },
      { rootMargin: line },
    )
    stepRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [onActiveChange])

  return (
    <div className="story">
      <div className="stage" aria-live="off">
        <div className="stage__frame">
          {SCENE_IDS.map((id, i) => (
            <SceneDrawing key={id} id={id} active={i === active} words={t.drawing} />
          ))}
        </div>
      </div>

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
