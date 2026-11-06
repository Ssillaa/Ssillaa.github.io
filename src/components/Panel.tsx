import { useEffect, useRef } from 'react'

import { CERTIFICATES, COVER, CV_URL, EDUCATION, EXPERIENCE, PROJECTS, SKILLS, type ProjectId } from '../data'
import { ArrowRight, Close, Download } from './Icons'

export type PanelId = 'kunye' | ProjectId

export function panelFromHash(hash: string): PanelId | null {
  const id = hash.replace('#', '')
  if (id === 'kunye' || id in PROJECTS) return id as PanelId
  return null
}

/**
 * The one side panel (HIKAYE-PLANI.md, K7, K8): the künye or a project.
 * A native modal dialog, so focus stays inside and Esc closes it; it slides
 * in from the right on a desktop and up from the bottom on a phone.
 */
export function Panel({ id, onClose, onOpen }: { id: PanelId | null; onClose: () => void; onOpen: (id: ProjectId) => void }) {
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
      aria-label={id === 'kunye' ? COVER.more : id ? PROJECTS[id].title : undefined}
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
          <span className="eyebrow">{id === 'kunye' ? COVER.more : id ? PROJECTS[id].label : ''}</span>
          <button type="button" className="round-btn" aria-label="Paneli kapat" onClick={onClose}>
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
  return (
    <>
      <section className="panel__section">
        <h2 className="panel__h">Deneyim</h2>
        {EXPERIENCE.map((org, i) => (
          <div key={org.company} className="org">
            <h3 className="org__name">{org.company}</h3>
            <ol className="timeline">
              {org.roles.map((r, n) => (
                <li key={r.title} className={i === 0 && n === 0 ? 'is-now' : undefined}>
                  <span className="timeline__title">{r.title}</span>
                  <span className="timeline__year">{i === 0 && n === 0 ? `${r.year} · bugün` : r.year}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>

      <section className="panel__section">
        <h2 className="panel__h">Projeler</h2>
        <ul className="works">
          {Object.values(PROJECTS).map((p) => (
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
        <h2 className="panel__h">Eğitim</h2>
        <div className="edu">
          <span className="edu__years">{EDUCATION.years}</span>
          <span className="org__name">{EDUCATION.program}</span>
          <span className="panel__muted">
            {EDUCATION.school} · {EDUCATION.detail}
          </span>
        </div>
      </section>

      <section className="panel__section">
        <h2 className="panel__h">Yetkinlikler</h2>
        <ul className="tags">
          {SKILLS.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel__section">
        <h2 className="panel__h">Sertifikalar</h2>
        <ul className="plain-list">
          {CERTIFICATES.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <a href={CV_URL} target="_blank" rel="noopener" className="btn btn--solid btn--wide">
        <Download /> CV indir (PDF)
      </a>
    </>
  )
}

function ProjectDetail({ id }: { id: ProjectId }) {
  const p = PROJECTS[id]
  return (
    <section className="panel__section panel__section--first">
      <h2 className="panel__title">{p.title}</h2>
      <p className="panel__lead">{p.text}</p>
      {p.points && (
        <ul className="plain-list plain-list--ticks">
          {p.points.map((pt) => (
            <li key={pt}>{pt}</li>
          ))}
        </ul>
      )}
      <div className="role">
        <span className="role__label">Katkım</span>
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
