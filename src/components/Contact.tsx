import { CONTACTS } from '../data'
import { ContactIcon } from './Icons'

export function Contact() {
  return (
    <footer id="iletisim" className="dark">
      <div className="container contact">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span className="eyebrow">06 · İletişim</span>
          <h2 className="contact__title">
            Birlikte bir şey
            <br />
            üretelim<span className="dot">.</span>
          </h2>
        </div>

        <div className="contact__cards">
          {CONTACTS.map((c) => {
            const external = c.kind === 'linkedin' || c.kind === 'github' || c.kind === 'cv'
            return (
              <a
                key={c.kind}
                href={c.href}
                className={c.kind === 'cv' ? 'contact-card contact-card--cv' : 'contact-card'}
                {...(external ? { target: '_blank', rel: 'noopener' } : {})}
              >
                <ContactIcon kind={c.kind} />
                <span className="contact-card__label">{c.label}</span>
                <span className="contact-card__value">{c.value}</span>
              </a>
            )
          })}
        </div>

        <div className="contact__foot">
          <span>© 2026 Sıla Bayram</span>
          <span>Ankara, Yenimahalle · Referanslar istek üzerine paylaşılır.</span>
        </div>
      </div>
    </footer>
  )
}
