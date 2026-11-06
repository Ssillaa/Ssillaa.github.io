import { EXPERIENCE } from '../data'
import { SectionHead } from './SectionHead'

export function Experience() {
  return (
    <section id="deneyim" className="dark">
      <div className="container section split">
        <SectionHead number="03" title="Deneyim" />
        <ol className="split__body jobs">
          {EXPERIENCE.map((job) => (
            <li key={`${job.role}-${job.date}`} className="job rv">
              <div className="job__top">
                <h3 className="job__role">{job.role}</h3>
                <span className="job__date">{job.date}</span>
              </div>
              <span className="job__company">{job.company}</span>
              <p className="job__summary">{job.summary}</p>
              <div className="tags">
                {job.tags.map((tag) => (
                  <span key={tag} className="tag-dark">
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
