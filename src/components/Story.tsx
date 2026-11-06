import { useEffect, useRef, useState } from 'react'

import { COVER, COVER_FACTS, PROJECTS, SCENES, STEPS, TEAM_FILES, type ProjectId } from '../data'
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
          {SCENES.map((scene, i) => (
            <SceneDrawing key={scene.id} id={scene.id} active={i === active} />
          ))}
        </div>
      </div>

      <div className="steps">
        {SCENES.map((scene, i) => (
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
              <p className="byline">{COVER.role}</p>
            )}
            <p className="step__text">{scene.text}</p>

            {scene.id === 'cover' && (
              <>
                <dl className="facts">
                  {COVER_FACTS.map((f) => (
                    <div key={f.label}>
                      <dt>{f.label}</dt>
                      <dd>{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="cta">
                  <button type="button" className="btn btn--outline" onClick={onOpenMore}>
                    {COVER.more} <ArrowRight />
                  </button>
                  <a href="#sahne-1" className="hint">
                    <ArrowDown /> {COVER.ctaNote}
                  </a>
                </div>
              </>
            )}

            {scene.id === 'product' && (
              <div className="projects">
                <button type="button" className="chip-btn chip-btn--main" onClick={() => onOpen('talentagent')}>
                  {PROJECTS.talentagent.title}
                </button>
                {TEAM_FILES.map((id) => (
                  <button key={id} type="button" className="chip-btn" onClick={() => onOpen(id)}>
                    {PROJECTS[id].title}
                  </button>
                ))}
              </div>
            )}

            {scene.id === 'bridge' && (
              <>
                <div className="howto">
                  <span className="howto__label">Nasıl çalışırım</span>
                  <p className="howto__text" aria-live="polite">
                    <strong>
                      {String(step + 1).padStart(2, '0')} {STEPS[step].title}.
                    </strong>{' '}
                    {STEPS[step].text}
                  </p>
                  <div className="howto__tabs" role="group" aria-label="Çalışma adımları">
                    {STEPS.map((s, n) => (
                      <button
                        key={s.title}
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
          </section>
        ))}
      </div>
    </div>
  )
}
