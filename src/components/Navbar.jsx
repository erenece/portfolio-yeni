import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router'
import { useLanguage } from '../language.js'
import LanguageToggle from './LanguageToggle.jsx'

// NavLink adds the "active" class to the link of the page you're on
const links = [
  { to: '/work', key: 'work' },
  { to: '/about', key: 'about' },
  { to: '/contact', key: 'contact' },
]

export default function Navbar() {
  const { t } = useLanguage()
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8)

  // Once the page scrolls, a purple band fades in behind the header so
  // content sliding underneath doesn't clash with the nav text.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <Link to="/" className="logo" aria-label={t.nav.home}>
        E
      </Link>

      <nav className="nav-pill">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to}>
            {t.nav[link.key]}
          </NavLink>
        ))}
      </nav>

      <LanguageToggle />
    </header>
  )
}
