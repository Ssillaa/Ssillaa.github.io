import { useEffect, useRef } from 'react'

import { CV_URL, type ProjectId } from '../data'
import { useLang } from '../i18n'
import { ArrowRight, Close, Download } from './Icons'

export type PanelId = 'kunye' | ProjectId

export function panelFromHash(hash: string): PanelId | null {
  const id = hash.replace('#', '')
  if (id === 'kunye' || id === 'talentagent' || id === 'ajan' || id === 'devops' || id === 'ofis' || id === 'hukuk') return id
  return null
}

/**
 * The one side panel (HIKAYE-PLANI.md, K7, K8): the künye or a project.
 * A native modal dialog, so focus stays inside and Esc closes it; it slides
 * in from the right on a desktop and up from the bottom on a phone.
 */
export function Panel({ id, onClose, onOpen }: { id: PanelId | null; onClose: () => void; onOpen: (id: ProjectId) => void }) {
  const { t } = useLang()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (id && !dialog.open) dialog.showModal()
    if (!id && dialog.open) dialog.close()
  }, [id])

  return (
    <dialog
      ref={ref}
      className="panel"
      aria-label={id === 'kunye' ? t.cover.more : id ? t.projects[id].title : undefined}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="panel__inner">
        <div className="panel__head">
          <span className="eyebrow">{id === 'kunye' ? t.cover.more : id ? t.projects[id].label : ''}</span>
          <button type="button" className="round-btn" aria-label={t.ui.closePanel} onClick={onClose}>
            <Close />
          </button>
        </div>
        {id === 'kunye' && <Kunye onOpen={onOpen} />}
        {id && id !== 'kunye' && <ProjectDetail id={id} />}
      </div>
    </dialog>
  )
}

function Kunye({ onOpen }: { onOpen: (id: ProjectId) => void }) {
  const { t } = useLang()
  return (
    <>
      <section className="panel__section">
        <h2 className="panel__h">{t.ui.experience}</h2>
        {t.experience.map((org, i) => (
          <div key={org.company} className="org">
            <h3 className="org__name">{org.company}</h3>
            <ol className="timeline">
              {org.roles.map((r, n) => (
                <li key={r.title} className={i === 0 && n === 0 ? 'is-now' : undefined}>
                  <span className="timeline__title">{r.title}</span>
                  <span className="timeline__year">{i === 0 && n === 0 ? `${r.year} · ${t.ui.now}` : r.year}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>

      <section className="panel__section">
        <h2 className="panel__h">{t.ui.projects}</h2>
        <ul className="works">
          {Object.values(t.projects).map((p) => (
            <li key={p.id}>
              <button type="button" className="work" onClick={() => onOpen(p.id)}>
                <span className="work__title">{p.title}</span>
                <span className="work__meta">
                  {p.kind} · {p.tags.slice(0, 3).join(', ')}
                </span>
                <span className="work__year">{p.year}</span>
                <ArrowRight />
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel__section">
        <h2 className="panel__h">{t.ui.education}</h2>
        <div className="edu">
          <span className="edu__years">{t.education.years}</span>
          <span className="org__name">{t.education.program}</span>
          <span className="panel__muted">
            {t.education.school} · {t.education.detail}
          </span>
        </div>
      </section>

      <section className="panel__section">
        <h2 className="panel__h">{t.ui.skills}</h2>
        <ul className="tags">
          {t.skills.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel__section">
        <h2 className="panel__h">{t.ui.certificates}</h2>
        <ul className="plain-list">
          {t.certificates.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <a href={CV_URL} target="_blank" rel="noopener" className="btn btn--solid btn--wide">
        <Download /> {t.ui.cvButton}
      </a>
    </>
  )
}

function ProjectDetail({ id }: { id: ProjectId }) {
  const { t } = useLang()
  const p = t.projects[id]
  return (
    <section className="panel__section panel__section--first">
      <h2 className="panel__title">{p.title}</h2>
      {p.status && (
        <span className="live live--panel">
          <span className="live__dot" aria-hidden="true" />
          {p.status}
        </span>
      )}
      <p className="panel__lead">{p.text}</p>
      {p.points && (
        <ul className="plain-list plain-list--ticks">
          {p.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      )}
      <div className="role">
        <span className="role__label">{t.ui.myPart}</span>
        <span>{p.role}</span>
      </div>
      <ul className="tags">
        {p.tags.map((t) => (
          <li key={t} className="tag">
            {t}
          </li>
        ))}
      </ul>
    </section>
  )
}
