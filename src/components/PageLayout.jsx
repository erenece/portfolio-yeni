import { useEffect } from 'react'
import Reveal from './Reveal.jsx'

// Shared shell for the inner pages (Work, About, Contact):
// big script title, a short intro line, then the page's own content.
export default function PageLayout({ title, intro, children }) {
  // browser tab title, e.g. "About — Ece"
  useEffect(() => {
    document.title = `${title} — Ece`
  }, [title])

  return (
    <main className="page">
      <Reveal as="header" className="page-header">
        <h1 className="page-title">{title}</h1>
        {intro && <p className="page-intro">{intro}</p>}
      </Reveal>
      {children}
    </main>
  )
}
