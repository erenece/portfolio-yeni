import { Link } from 'react-router'
import { useLanguage } from '../language.js'

// One project in the Work grid. The whole card is a link to its detail page.
export default function ProjectCard({ project }) {
  const { lang, t } = useLanguage()

  // data-no-magnet: the card is too big for the cursor's magnetic pull (see MagneticCursor.jsx)
  return (
    <Link
      to={`/work/${project.slug}`}
      className="project-card"
      style={{ '--accent': project.accent }}
      data-no-magnet
    >
      <ProjectCover project={project} />

      <div className="project-card-body">
        <p className="project-meta">
          {project.period[lang]} · {project.context[lang]}
        </p>
        <h2 className="project-card-title">{project.title}</h2>
        <p className="project-card-summary">{project.summary[lang]}</p>

        <ul className="tags">
          {project.stack.slice(0, 4).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
          {project.stack.length > 4 && <li>+{project.stack.length - 4}</li>}
        </ul>

        <span className="project-card-cta">
          {t.work.view}
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  )
}

// The project's screenshot; without one, its accent colour as a soft glow
// with the name in the script font.
export function ProjectCover({ project, large = false }) {
  return (
    <div className={`project-cover${large ? ' is-large' : ''}`} aria-hidden="true">
      {project.image ? (
        <img
          src={project.image}
          alt=""
          loading="lazy"
          style={{ objectPosition: project.imagePosition ?? 'center top' }}
        />
      ) : (
        <span>{project.title}</span>
      )}
    </div>
  )
}
