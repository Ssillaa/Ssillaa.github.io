import { useState } from 'react'

import { FEATURED_PROJECT, PROJECT_FILTERS, TEAM_PROJECTS, type ProjectCategory, type TeamProject } from '../data'
import { Star } from './Icons'

type Filter = 'all' | ProjectCategory

export function Projects() {
  const [filter, setFilter] = useState<Filter>('all')
  const shows = (category: ProjectCategory) => filter === 'all' || filter === category

  return (
    <section id="projeler">
      <div className="container section">
        <div className="projects__head">
          <div className="projects__intro">
            <span className="eyebrow">04</span>
            <h2 className="h2 h2--big">Projeler</h2>
            <p>
              Bir bitirme projesi ve ekip olarak geliştirdiğimiz ürünler. Her kartta ürünün ne yaptığını ve benim
              katkımı bulabilirsiniz.
            </p>
          </div>
          <div role="group" aria-label="Projeleri süz" className="filters">
            {PROJECT_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className="filter"
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid">
          {shows(FEATURED_PROJECT.category) && <FeaturedCard />}
          {TEAM_PROJECTS.filter((p) => shows(p.category)).map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedCard() {
  const p = FEATURED_PROJECT
  return (
    <article className="featured">
      <div className="featured__body">
        <div className="badges">
          {p.badges.map((b) => (
            <span key={b} className="badge">
              {b}
            </span>
          ))}
        </div>
        <h3 className="featured__title">{p.title}</h3>
        <p className="featured__text">{p.description}</p>
        <div className="story">
          <Star />
          <span>{p.story}</span>
        </div>
        <div className="tags">
          {p.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="featured__art">
        <InterviewArt />
      </div>
    </article>
  )
}

function ProjectCard({ project: p }: { project: TeamProject }) {
  return (
    <article className="card">
      <div aria-hidden="true" className={`card__art art-${p.illustration}`}>
        {p.illustration === 'platform' && <PlatformArt />}
        {p.illustration === 'review' && <ReviewArt />}
        {p.illustration === 'office' && <OfficeArt />}
      </div>
      <div className="card__body">
        <span className="card__label">{p.label}</span>
        <h3 className="card__title">{p.title}</h3>
        <p className="card__text">{p.description}</p>
        <div className="contribution">
          <span>Katkım</span>
          <span>{p.contribution}</span>
        </div>
        <div className="tags">
          {p.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

/* ---------- Illustrations: drawn, since the products are not public ---------- */

const WAVE_DELAYS = [0, -0.2, -0.5, -0.8, -0.3, -0.6, -0.1, -0.9, -0.4]
const SCORES = [
  { label: 'Teknik bilgi', width: '78%', delay: '0s' },
  { label: 'İletişim', width: '88%', delay: '-.6s' },
  { label: 'İlanla uyum', width: '64%', delay: '-1.2s' },
]

function InterviewArt() {
  return (
    <div className="window">
      <div className="window__bar">
        <span />
        <span />
        <span />
      </div>
      <div className="window__body">
        <div className="assistant">
          <span className="assistant__face" />
          <div className="assistant__bubble">Sanal asistan · soru 3</div>
        </div>
        <div className="wave">
          {WAVE_DELAYS.map((d, i) => (
            <span key={i} style={{ animationDelay: `${d}s` }} />
          ))}
        </div>
        <div className="scores">
          <span className="scores__title">Gerekçeli değerlendirme</span>
          {SCORES.map((s) => (
            <div key={s.label} className="score">
              <span>{s.label}</span>
              <div className="score__track">
                <div className="score__fill" style={{ width: s.width, animationDelay: s.delay }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PlatformArt() {
  return (
    <>
      <div className="art-platform__h" />
      <div className="art-platform__v" />
      <span className="art-platform__core">Ajan</span>
      <span className="node" style={{ left: '8%', top: '50%', marginTop: -16 }}>Araç</span>
      <span className="node" style={{ right: '8%', top: '50%', marginTop: -16, animationDelay: '-1.5s' }}>Yetenek</span>
      <span className="node" style={{ left: '50%', top: '9%', marginLeft: -30, animationDelay: '-3s' }}>Bilgi</span>
      <span className="node" style={{ left: '50%', bottom: '9%', marginLeft: -30, animationDelay: '-4s' }}>Onay</span>
    </>
  )
}

const CODE_LINES = [
  { n: 12, w: '46%' },
  { n: 13, w: '62%' },
  { n: 14, w: '54%', hit: true },
  { n: 15, w: '38%' },
  { n: 16, w: '58%' },
]

function ReviewArt() {
  return (
    <>
      {CODE_LINES.map((l) => (
        <div key={l.n} className={l.hit ? 'code-line code-line--hit' : 'code-line'}>
          <span>{l.n}</span>
          <div style={{ width: l.w }} />
        </div>
      ))}
      <div className="review-note">
        <strong>Öneri:</strong> 14. satırdaki değeri doğrulamadan kullanma.
      </div>
    </>
  )
}

/** Which desk is busy on each floor, top to bottom. */
const BUSY_DESKS = [1, 2, 0, 3]
const DESK_DELAYS = ['0s', '-.7s', '-1.3s', '-.4s']

function OfficeArt() {
  return (
    <div className="building">
      {BUSY_DESKS.map((busy, floor) => (
        <div key={floor} className="floor">
          {[0, 1, 2, 3].map((desk) => (
            <span
              key={desk}
              className={desk === busy ? 'desk desk--on' : 'desk'}
              style={desk === busy ? { animationDelay: DESK_DELAYS[floor] } : undefined}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
