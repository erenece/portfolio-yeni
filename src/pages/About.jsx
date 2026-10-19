import Certificates from '../components/Certificates.jsx'
import PageLayout from '../components/PageLayout.jsx'
import Reveal from '../components/Reveal.jsx'
import { education, experience, skills, story } from '../data/profile.js'
import { useLanguage } from '../language.js'

export default function About() {
  const { lang, t } = useLanguage()

  return (
    <PageLayout title={t.about.title} intro={t.about.intro}>
      <Reveal className="about-story">
        {story[lang].map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </Reveal>

      <section className="about-section">
        <Reveal as="h2" className="section-title">{t.about.experience}</Reveal>
        <ol className="timeline">
          {experience.map((job) => (
            <Reveal as="li" key={job.org}>
              <p className="timeline-meta">
                {job.period[lang]} · {job.place[lang]}
              </p>
              <h3>{job.role[lang]}</h3>
              <p className="timeline-org">{job.org}</p>
              <p className="timeline-text">{job.description[lang]}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="about-section">
        <Reveal as="h2" className="section-title">{t.about.education}</Reveal>
        <ol className="timeline">
          {education.map((item) => (
            <Reveal as="li" key={item.school.en}>
              <p className="timeline-meta">{item.period[lang]}</p>
              <h3>{item.degree[lang]}</h3>
              <p className="timeline-org">{item.school[lang]}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="about-section">
        <Reveal as="h2" className="section-title">{t.about.skills}</Reveal>
        <div className="skill-groups">
          {skills.map((group, i) => (
            <Reveal key={group.group.en} delay={(i % 2) * 80} className="skill-group">
              <h3>{group.group[lang]}</h3>
              <ul className="tags">
                {group.items.map((skill) => (
                  <li key={skill.name} className={skill.learning ? 'is-learning' : undefined}>
                    {skill.name}
                    {skill.learning && <span className="learning-badge">{t.about.learning}</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <Certificates />
    </PageLayout>
  )
}
