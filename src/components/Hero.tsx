import { CV_URL } from '../data'
import { ArrowRight, Download } from './Icons'
import { Octopus } from './Octopus'

export function Hero() {
  return (
    <section id="ust" className="container hero">
      <div className="hero__text">
        <div className="status">
          <span aria-hidden="true" className="status__dot pulse" />
          <span>Junior Yazılım Uzmanı · Ankara</span>
        </div>

        <h1 className="hero__title">
          Merhaba,
          <br />
          ben Sıla Bayram<span className="dot">.</span>
        </h1>

        <p className="hero__lead">
          İnsanlarla konuşan, <em>ihtiyacı dinleyen, gereksinimi netleştiren ve aynı zamanda ürün geliştirebilen</em>{' '}
          <span className="roll">
            <span className="sr-only">yeri gelince test eden biri.</span>
            <span className="roll__track" aria-hidden="true">
              <span>biri.</span>
              <span>yeri gelince test eden biri.</span>
              <span>biri.</span>
            </span>
          </span>
        </p>

        <p className="hero__intro">
          İletişimi güçlü biriyim; departmanlarla yakın çalışıp asıl ihtiyacı anlamayı, gereksinimleri netleştirmeyi ve
          önceliklendirmeye katkı vermeyi seviyorum. Yeri geldiğinde geliştirilen özellikleri test edip geri bildirimleri
          topluyor, yeri geldiğinde ürünü bizzat kodluyorum. İş tarafıyla teknik ekip arasında köprü olmak bana iyi
          geliyor.
        </p>

        <div className="actions">
          <a href="#projeler" className="btn btn--solid">
            Projelere göz at <ArrowRight />
          </a>
          <a href="#iletisim" className="btn btn--outline">
            İletişime geç
          </a>
          <a href={CV_URL} target="_blank" rel="noopener" className="btn btn--link">
            <Download /> CV indir (PDF)
          </a>
        </div>
      </div>

      <div className="mascot">
        <div aria-hidden="true" className="mascot__halo" />
        <div aria-hidden="true" className="mascot__bubble">
          Merhaba!
        </div>
        <span aria-hidden="true" className="chip" style={{ top: 50, left: 0 }}>
          Dinler
        </span>
        <span aria-hidden="true" className="chip" style={{ top: '40%', right: '-4%', animationDelay: '-3s' }}>
          Geliştirir
        </span>
        <span aria-hidden="true" className="chip" style={{ top: '70%', right: 0, animationDelay: '-4s' }}>
          Test eder
        </span>
        <span aria-hidden="true" className="chip" style={{ top: '64%', left: '30%', animationDelay: '-1.5s' }}>
          Netleştirir
        </span>
        <Octopus />
      </div>
    </section>
  )
}
