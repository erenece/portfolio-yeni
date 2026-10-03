import { Link } from 'react-router'
import PageLayout from '../components/PageLayout.jsx'
import { useLanguage } from '../language.js'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <PageLayout title={t.notFound.title} intro={t.notFound.intro}>
      <Link to="/" className="btn btn-solid">{t.notFound.back}</Link>
    </PageLayout>
  )
}
