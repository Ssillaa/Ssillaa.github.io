import { WORK_STEPS } from '../data'
import { SectionHead } from './SectionHead'

export function About() {
  return (
    <section id="hakkimda">
      <div className="container section split">
        <SectionHead number="01" title="Hakkımda" />
        <div className="split__body about">
          <p className="about__quote rv">
            Yönetim Bilişim Sistemleri mezunuyum. Teknik yetkinliklerimi iş süreçlerinin analiziyle birleştirip
            gerçekten kullanılan dijital çözümler üretmeye odaklanıyorum.
          </p>
          <p className="about__text rv">
            2023'te yapay zekâ stajıyla başlayan yolculuğum; Ar-Ge, yazılım geliştirme ve kalite güvence stajlarının
            ardından Junior Yazılım Uzmanlığına uzandı. Bugün yapay zekâ ajanı ve süreç otomasyonu geliştiren ekiplerde
            hem kod yazıyor hem de kullanıcı ve departman ihtiyaçlarının belirlenmesi, gereksinimlerin netleştirilmesi,
            test ve geri bildirim süreçlerinde görev alıyorum.
          </p>
        </div>
      </div>

      <div className="container flow rv">
        <h3 className="label">Bir ihtiyaç geldiğinde</h3>
        <div aria-hidden="true" className="flow__bar">
          <div className="flow__fill" />
        </div>
        <ol className="flow__steps">
          {WORK_STEPS.map((step, i) => (
            <li key={step.title} className="flow__step">
              <span className="flow__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="flow__title">{step.title}</span>
              <span className="flow__text">{step.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
