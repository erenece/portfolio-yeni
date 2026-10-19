import { useEffect, useRef } from 'react'

// Vertical scroll -> horizontal movement.
//
// How it works:
//  1. The outer <section> is made exactly as tall as the distance the track
//     has to travel sideways (+ one screen), so there is room to scroll.
//  2. Inside it, a sticky box pins to the screen while you scroll through.
//  3. On every scroll we turn "how far through the section am I" (0 → 1)
//     into a translateX on the track.
export default function HorizontalScroll({ children }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const bar = barRef.current
    let distance = 0 // how far (px) the track needs to move
    let frame = 0

    function update() {
      frame = 0
      const progress = distance > 0 ? Math.min(Math.max(-section.getBoundingClientRect().top / distance, 0), 1) : 0
      track.style.transform = `translate3d(${-progress * distance}px, 0, 0)`
      bar.style.transform = `scaleX(${progress})`
    }

    function measure() {
      distance = Math.max(track.scrollWidth - window.innerWidth, 0)
      // nothing to scroll sideways (very wide screen): no extra height, no pinning
      section.style.height = distance > 0 ? `${distance + window.innerHeight}px` : ''
      section.classList.toggle('is-static', distance === 0)
      update()
    }

    // run at most once per frame, however many scroll events arrive
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    measure()
    // card sizes change with the window and with the language (longer text)
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(track)
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section ref={sectionRef} className="hscroll">
      <div className="hscroll-sticky">
        <div ref={trackRef} className="hscroll-track">
          {children}
        </div>
        <div className="hscroll-progress" aria-hidden="true">
          <span ref={barRef} />
        </div>
      </div>
    </section>
  )
}
