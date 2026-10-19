import { useEffect } from 'react'
import { Link } from 'react-router'
import CharacterCanvas from '../components/CharacterCanvas.jsx'
import { useLanguage } from '../language.js'
import manifest from '../../public/frames/manifest.json'

export default function Home() {
  const { t } = useLanguage()

  useEffect(() => {
    document.title = t.home.title
  }, [t])

  return (
    <main className="hero" style={{ '--bg': manifest.background }}>
      <CharacterCanvas manifest={manifest} label={t.home.portrait} />

      <section className="hero-copy">
        <p className="hello">{t.home.hello}</p>
        <h1 className="name">Ece</h1>
        <p className="bio">{t.home.bio}</p>
        <div className="actions">
          {/* opens the CV in the current language */}
          <a href={t.home.resumeUrl} className="btn btn-solid" target="_blank" rel="noreferrer">
            {t.home.resume}
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <Link to="/contact" className="btn btn-glass">{t.home.talk}</Link>
        </div>
      </section>
    </main>
  )
}
