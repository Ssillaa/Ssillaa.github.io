import { useLang } from '../i18n'
import { ContactIcon } from './Icons'

/** The last page: the contact cards carried over from the first site. */
export function LastPage() {
  const { t } = useLang()
  return (
    <footer id="iletisim" className="last">
      <div className="last__inner">
        <span className="eyebrow eyebrow--light">{t.last.eyebrow}</span>
        <h2 className="last__title last__title--hand">{t.last.title}</h2>

        <div className="cards">
          {t.contacts.map((c) => {
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

        <div className="last__foot">
          <span>© 2026 Sıla Bayram</span>
          <span>{t.last.footer}</span>
        </div>
      </div>
    </footer>
  )
}
