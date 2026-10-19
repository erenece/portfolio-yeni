import { Link, useParams } from 'react-router'
import PageLayout from '../components/PageLayout.jsx'
import { ProjectCover } from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { findProject } from '../data/projects.js'
import { useLanguage } from '../language.js'
import NotFound from './NotFound.jsx'

// /work/:slug -> the slug in the URL picks the project
export default function ProjectDetail() {
  const { slug } = useParams()
  const { lang, t } = useLanguage()
  const project = findProject(slug)

  if (!project) return <NotFound />

  return (
    <PageLayout title={project.title} intro={project.summary[lang]}>
      <div className="project-detail" style={{ '--accent': project.accent }}>
        <Link to="/work" className="back-link">
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.work.back}
        </Link>

        {/* each block slides in as you scroll down to it */}
        {/* demo video when there is one (preload="none": ~10MB, only fetched on play) */}
        <Reveal>
          {project.video ? (
            <div className={`project-video${project.videoPortrait ? ' is-portrait' : ''}`}>
              <video src={project.video} poster={project.image} controls playsInline preload="none">
                {t.work.noVideo}
              </video>
            </div>
          ) : (
            <ProjectCover project={project} large />
          )}
        </Reveal>

        <Reveal>
          <dl className="project-facts">
            <div>
              <dt>{t.work.role}</dt>
              <dd>{project.role[lang]}</dd>
            </div>
            <div>
              <dt>{t.work.context}</dt>
              <dd>{project.context[lang]}</dd>
            </div>
            <div>
              <dt>{t.work.period}</dt>
              <dd>{project.period[lang]}</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal as="section" className="project-section">
          <h2>{project.teamStack ? t.work.contributions : t.work.highlights}</h2>
          <ul className="highlights">
            {project.highlights[lang].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="project-section">
          <h2>{project.teamStack ? t.work.productStack : t.work.stack}</h2>
          <ul className="tags">
            {project.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </Reveal>

        {project.links.github && (
          <Reveal className="actions">
            <a href={project.links.github} className="btn btn-solid" target="_blank" rel="noreferrer">
              {t.work.github}
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Reveal>
        )}
      </div>
    </PageLayout>
  )
}
