import { CONTACTS, HOBBIES } from '../data'
import { ContactIcon } from './Icons'

/** The last page: the contact cards carried over from the first site. */
export function LastPage() {
  return (
    <footer id="iletisim" className="last">
      <div className="last__inner">
        <span className="eyebrow eyebrow--light">İletişim</span>
        <h2 className="last__title last__title--hand">Okuduğunuz için teşekkürler.&nbsp;:)</h2>

        <div className="cards">
          {CONTACTS.map((c) => {
            const external = c.kind === 'linkedin' || c.kind === 'github' || c.kind === 'cv'
            return (
              <a
                key={c.kind}
                href={c.href}
                className={c.kind === 'cv' ? 'card card--cv' : 'card'}
                {...(external ? { target: '_blank', rel: 'noopener' } : {})}
              >
                <ContactIcon kind={c.kind} />
                <span className="card__label">{c.label}</span>
                <span className="card__value">{c.value}</span>
              </a>
            )
          })}
        </div>

        <section className="hobbies" aria-labelledby="kod-disinda">
          <div className="hobbies__head">
            <span id="kod-disinda" className="hobbies__label">
              {HOBBIES.label}
            </span>
            <span className="hobbies__text">{HOBBIES.text}</span>
          </div>
          <ul className="hobbies__list">
            {HOBBIES.items.map((h) => (
              <li key={h.id} className="hobby">
                <HobbyDrawing id={h.id} />
                <span className="hobby__title">{h.title}</span>
                <span className="hobby__text">{h.text}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="last__foot">
          <span>© 2026 Sıla Bayram</span>
          <span>Ankara · Referanslar istek üzerine paylaşılır.</span>
        </div>
      </div>
    </footer>
  )
}

/** Small brass line drawings, in the same hand as the story's pictures. */
function HobbyDrawing({ id }: { id: 'koro' | 'baglama' }) {
  return (
    <svg className="hobby__art" viewBox="0 0 120 64" aria-hidden="true">
      {id === 'baglama' ? (
        <g>
          {/* a bağlama lying down: pear-shaped body, long neck, pegs */}
          <path d="M8 34 C 8 18, 26 14, 40 22 L 44 26 L 44 42 L 40 46 C 26 54, 8 50, 8 34 Z" />
          <path d="M44 30 H108 M44 38 H108 M108 28 V40 L116 38 V30 Z" />
          <path d="M58 30 V38 M70 30 V38 M80 30 V38 M89 30 V38 M97 30 V38" className="thin" />
          <path d="M110 28 V22 M114 29 V23 M110 40 V46 M114 39 V45" className="thin" />
          <path d="M24 34 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0" className="thin" />
        </g>
      ) : (
        <g>
          {/* three singers side by side, a few notes above them */}
          <path d="M30 34 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M60 30 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M90 34 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0" />
          <path d="M16 62 C 18 50, 42 50, 44 62 M46 62 C 48 46, 72 46, 74 62 M76 62 C 78 50, 102 50, 104 62" />
          <path d="M28 37 q2 2 4 0 M58 33 q2 3 4 0 M88 37 q2 2 4 0" className="thin" />
          <path d="M40 14 V4 L48 2 V12 M40 14 m-3 0 a3 2.4 0 1 0 6 0 a3 2.4 0 1 0 -6 0 M48 12 m-3 0 a3 2.4 0 1 0 6 0 a3 2.4 0 1 0 -6 0" className="thin" />
          <path d="M80 16 V6 M80 16 m-3 0 a3 2.4 0 1 0 6 0 a3 2.4 0 1 0 -6 0 M80 6 q5 2 6 7" className="thin" />
        </g>
      )}
    </svg>
  )
}
