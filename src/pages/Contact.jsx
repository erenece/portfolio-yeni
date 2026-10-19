import { useState } from 'react'
import PageLayout from '../components/PageLayout.jsx'
import Reveal from '../components/Reveal.jsx'
import { useLanguage } from '../language.js'

const EMAIL = 'eceeren.dev@gmail.com'
const SOCIALS = [
  { name: 'GitHub', url: 'https://github.com/erenece' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/ece-eren-7806ab247' },
]

export default function Contact() {
  const { t } = useLanguage()
  const [copied, setCopied] = useState(false)

  // Copy the address for people who don't use a mail app
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard blocked: the mailto link still works
    }
  }

  return (
    <PageLayout title={t.contact.title} intro={t.contact.intro}>
      <div className="contact-grid">
        <Reveal className="contact-card contact-email">
          <p className="cert-issuer">{t.contact.emailLabel}</p>
          <a href={`mailto:${EMAIL}`} className="contact-address" data-no-magnet>
            {EMAIL}
          </a>
          <div className="actions">
            <a href={`mailto:${EMAIL}`} className="btn btn-solid">
              {t.contact.write}
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button type="button" className="btn btn-glass" onClick={copyEmail}>
              {copied ? t.contact.copied : t.contact.copy}
            </button>
          </div>
          <p className="contact-note">{t.contact.reply}</p>
        </Reveal>

        <Reveal delay={100} className="contact-card contact-status">
          <p className="cert-issuer">{t.contact.nowLabel}</p>
          <p className="contact-status-line">
            <span className="status-dot" aria-hidden="true" />
            {t.contact.open}
          </p>
          <p className="contact-note">{t.contact.location}</p>

          <ul className="contact-socials">
            {SOCIALS.map((social) => (
              <li key={social.name}>
                {/* full-width rows: too wide for the magnetic pull */}
                <a href={social.url} target="_blank" rel="noreferrer" data-no-magnet>
                  {social.name}
                  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                    <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </PageLayout>
  )
}
