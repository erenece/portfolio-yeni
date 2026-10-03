import PageLayout from '../components/PageLayout.jsx'
import { useLanguage } from '../language.js'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <PageLayout title={t.contact.title} intro={t.contact.intro}>
      {/* TODO: email, LinkedIn, GitHub (and maybe a form) */}
      <p className="placeholder">{t.comingSoon}</p>
    </PageLayout>
  )
}
