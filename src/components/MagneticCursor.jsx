import { useEffect, useRef } from 'react'

const INTERACTIVE = 'a, button, [data-magnetic]'
const RING_FOLLOW = 0.18 // the aura trails behind the dot
const MAGNET_PULL = 0.3 // how far a hovered element leans toward the cursor

export default function MagneticCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Touch screens have no hover: keep the native behaviour there
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { ...mouse }
    let magnet = null // element currently under the cursor
    let visible = false
    let rafId = 0

    document.documentElement.classList.add('has-custom-cursor')

    function onMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!visible) {
        visible = true
        ringPos.x = mouse.x
        ringPos.y = mouse.y
        dot.classList.add('is-visible')
        ring.classList.add('is-visible')
      }

      const target = e.target.closest?.(INTERACTIVE) ?? null
      if (target !== magnet) {
        if (magnet) magnet.style.transform = ''
        magnet = target
        ring.classList.toggle('is-hover', !!magnet)
        dot.classList.toggle('is-hover', !!magnet)
      }
      if (magnet) {
        // 2D translate toward the cursor: the "magnetic" pull
        const r = magnet.getBoundingClientRect()
        const mx = (mouse.x - (r.left + r.width / 2)) * MAGNET_PULL
        const my = (mouse.y - (r.top + r.height / 2)) * MAGNET_PULL
        magnet.style.transform = `translate(${mx}px, ${my}px)`
      }
    }

    function onLeave() {
      visible = false
      dot.classList.remove('is-visible')
      ring.classList.remove('is-visible')
    }

    function tick() {
      ringPos.x += (mouse.x - ringPos.x) * RING_FOLLOW
      ringPos.y += (mouse.y - ringPos.y) * RING_FOLLOW
      dot.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`
      ring.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
      if (magnet) magnet.style.transform = ''
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true"><span /></div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true"><span /></div>
    </>
  )
}
