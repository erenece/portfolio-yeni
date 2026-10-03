import PageLayout from '../components/PageLayout.jsx'
import { useLanguage } from '../language.js'

export default function Work() {
  const { t } = useLanguage()

  return (
    <PageLayout title={t.work.title} intro={t.work.intro}>
      {/* TODO: project cards (ProjectCard component) */}
      <p className="placeholder">{t.comingSoon}</p>
    </PageLayout>
  )
}
