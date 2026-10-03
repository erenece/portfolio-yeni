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

  return (
    <header className="site-header">
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
