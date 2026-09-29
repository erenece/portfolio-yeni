import CharacterCanvas from './components/CharacterCanvas.jsx'
import MagneticCursor from './components/MagneticCursor.jsx'
import manifest from '../public/frames/manifest.json'

export default function App() {
  return (
    <main className="hero" style={{ '--bg': manifest.background }}>
      <CharacterCanvas manifest={manifest} />

      <header className="nav-pill">
        <nav>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero-copy">
        <p className="hello">Hi, I'm</p>
        <h1 className="name">Ece</h1>
        <p className="bio">
          Full stack developer building fast, thoughtful web apps — from
          pixel-perfect React interfaces to the APIs and databases behind them.
        </p>
        <div className="actions">
          <a href="/resume.pdf" className="btn btn-solid">
            Resume
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#contact" className="btn btn-glass">Let's Talk</a>
        </div>
      </section>

      <MagneticCursor />
    </main>
  )
}
