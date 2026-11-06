import { CERTIFICATES } from '../data'
import { SectionHead } from './SectionHead'

export function Education() {
  return (
    <section id="egitim" className="section--bordered">
      <div className="container section split">
        <SectionHead number="02" title="Eğitim" />
        <ol className="split__body">
          <li className="edu__row rv">
            <span className="edu__when">2021 — 2026</span>
            <div className="edu__what">
              <h3 className="edu__school">OSTİM Teknik Üniversitesi</h3>
              <span className="edu__degree">Yönetim Bilişim Sistemleri · Lisans (İngilizce, %100 burslu)</span>
              <p className="edu__note">
                Genel not ortalaması 3,41. Bitirme projem olan yapay zekâ destekli işe alım platformuyla mezun oldum.
                İngilizce hazırlık sonrası B2 düzeyi.
              </p>
            </div>
          </li>
          <li className="edu__row rv">
            <span className="edu__when">Sertifikalar</span>
            <ul className="certs">
              {CERTIFICATES.map((c) => (
                <li key={c.title}>
                  <strong>{c.title}</strong>
                  <span>{c.level}</span>
                </li>
              ))}
            </ul>
          </li>
        </ol>
      </div>
    </section>
  )
}
