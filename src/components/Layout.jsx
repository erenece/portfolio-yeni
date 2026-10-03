import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router'
import MagneticCursor from './MagneticCursor.jsx'
import Navbar from './Navbar.jsx'

// The frame shared by every page. <Outlet /> is where the current page renders.
export default function Layout() {
  const { pathname } = useLocation()

  // A new page should start at the top, not where the last one was scrolled to
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Navbar />
      <Outlet />
      <MagneticCursor />
    </>
  )
}
