import HorizontalScroll from '../components/HorizontalScroll.jsx'
import PageLayout from '../components/PageLayout.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { projects } from '../data/projects.js'
import { useLanguage } from '../language.js'

export default function Work() {
  const { t } = useLanguage()

  return (
    <PageLayout title={t.work.title} intro={t.work.intro}>
      {/* scrolling down slides the cards sideways */}
      <HorizontalScroll>
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={Math.min(i, 2) * 100} className="hscroll-item">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </HorizontalScroll>
    </PageLayout>
  )
}
