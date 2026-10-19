import { certificates } from '../data/certificates.js'
import { useLanguage } from '../language.js'
import Reveal from './Reveal.jsx'

// "2026-07" -> "Jul 2026" (en) / "Tem 2026" (tr), using the browser's built-in formatter
function formatDate(yearMonth, lang) {
  const [year, month] = yearMonth.split('-').map(Number)
  return new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric' }).format(new Date(year, month - 1))
}

// a tag is either a plain string ("Scrum") or an { en, tr } pair
function Tags({ tags, lang }) {
  if (!tags) return null
  return (
    <ul className="tags cert-tags">
      {tags.map((tag) => {
        const text = typeof tag === 'string' ? tag : tag[lang]
        return <li key={text}>{text}</li>
      })}
    </ul>
  )
}

function VerifyLink({ url, label }) {
  if (!url) return null
  return (
    <a href={url} className="cert-verify" target="_blank" rel="noreferrer">
      {label}
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}

export default function Certificates() {
  const { lang, t } = useLanguage()
  const visible = certificates.filter((cert) => cert.show !== false)
  const featured = visible.find((cert) => cert.featured)
  const completed = visible.filter((cert) => cert.kind === 'completion' && !cert.featured)
  const events = visible.filter((cert) => cert.kind === 'participation')

  return (
    <section className="certificates">
      <Reveal as="h2" className="section-title">{t.about.certificates}</Reveal>

      {featured && (
        <Reveal className="cert-featured">
          <p className="cert-issuer">{featured.issuer}</p>
          <h3>{featured.title[lang]}</h3>
          {featured.description && <p className="cert-description">{featured.description[lang]}</p>}
          <Tags tags={featured.tags} lang={lang} />
          <div className="cert-footer">
            <span className="cert-date">{formatDate(featured.date, lang)}</span>
            <VerifyLink url={featured.url} label={t.about.verify} />
          </div>
        </Reveal>
      )}

      <Reveal as="h3" className="cert-group-title">{t.about.completed}</Reveal>
      <div className="cert-grid">
        {completed.map((cert, i) => (
          <Reveal key={cert.title.en} delay={(i % 3) * 80} className="cert-card">
            <p className="cert-issuer">{cert.issuer}</p>
            <h4>{cert.title[lang]}</h4>
            {cert.description && <p className="cert-description">{cert.description[lang]}</p>}
            <Tags tags={cert.tags} lang={lang} />
            <div className="cert-footer">
              <span className={`cert-date${cert.inProgress ? ' is-progress' : ''}`}>
                {cert.inProgress ? t.about.inProgress : formatDate(cert.date, lang)}
              </span>
              <VerifyLink url={cert.url} label={t.about.verify} />
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal as="h3" className="cert-group-title">{t.about.events}</Reveal>
      <Reveal as="ul" className="cert-list">
        {events.map((cert) => (
          <li key={cert.title.en}>
            <span className="cert-list-title">{cert.title[lang]}</span>
            <span className="cert-list-meta">
              {cert.issuer} · {formatDate(cert.date, lang)}
            </span>
          </li>
        ))}
      </Reveal>
    </section>
  )
}
