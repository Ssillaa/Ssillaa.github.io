import { SKILL_GROUPS } from '../data'
import { SectionHead } from './SectionHead'

export function Skills() {
  return (
    <section className="section--bordered">
      <div className="container section split">
        <SectionHead number="05" title="Yetkinlikler" />
        <div className="split__body skills">
          {SKILL_GROUPS.map((g) => (
            <div key={g.group} className="skill rv">
              <h3 className="label">{g.group}</h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
