import { useEffect, useRef, useState } from 'react'

// Wraps anything that should fade + slide up the first time it scrolls into view.
//   <Reveal>...</Reveal>                 a <div>
//   <Reveal as="section" delay={120}>    another tag, starting 120ms later
// IntersectionObserver tells us when the element enters the viewport, so there
// is no scroll listener running on every frame. The animation itself is CSS (.reveal).
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children }) {
  const ref = useRef(null)
  // very old browsers without IntersectionObserver just show everything
  const [visible, setVisible] = useState(() => !('IntersectionObserver' in window))

  useEffect(() => {
    const el = ref.current
    if (visible) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect() // animate once, not every time it re-enters
        }
      },
      // trigger a little before the bottom edge so it doesn't pop in late
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [visible])

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
