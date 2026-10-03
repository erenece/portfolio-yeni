import PageLayout from '../components/PageLayout.jsx'
import { useLanguage } from '../language.js'

export default function About() {
  const { t } = useLanguage()

  return (
    <PageLayout title={t.about.title} intro={t.about.intro}>
      {/* TODO: story, education, skills */}
      <p className="placeholder">{t.comingSoon}</p>
    </PageLayout>
  )
}
