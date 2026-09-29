import { useEffect, useRef, useState } from 'react'

const FRAME_COUNT = 64
const STEP = (Math.PI * 2) / FRAME_COUNT // ~5.625° per frame
const RESPONSE = 0.26 // lerp factor per 60fps frame -> tracks in ~35ms
const DEADZONE = 0.12 // fraction of the screen: inside this radius she looks at you

// Shortest-path interpolation between two angles (radians).
// Without this, going from 350° to 10° would spin the long way round.
function lerpAngle(from, to, t) {
  let diff = (to - from) % (Math.PI * 2)
  if (diff > Math.PI) diff -= Math.PI * 2
  if (diff < -Math.PI) diff += Math.PI * 2
  return from + diff * t
}

// Resolve on `load` (fires even in background tabs, unlike decode()),
// then warm the decoder so the first drawImage() of each frame doesn't stall.
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      img.decode().catch(() => {})
      resolve(img)
    }
    img.onerror = reject
    img.src = src
  })
}

export default function CharacterCanvas({ manifest }) {
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    let frames = []
    let center = null
    let cancelled = false
    let rafId = 0

    // Shared mutable state for the render loop (no React re-renders at 60fps)
    const pointer = { x: 0, y: 0, active: false }
    const cover = { x: 0, y: 0, w: 0, h: 0, dpr: 1 } // where the image lands, in CSS px
    let smoothed = null // current smoothed angle
    let drawn = null // the image currently on the canvas
    let lastTime = performance.now()

    // object-fit: cover, done by hand so we know exactly where the face ends up
    function resize() {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(vw * dpr)
      canvas.height = Math.round(vh * dpr)
      const scale = Math.max(vw / manifest.width, vh / manifest.height)
      cover.w = manifest.width * scale
      cover.h = manifest.height * scale
      cover.x = (vw - cover.w) / 2
      cover.y = (vh - cover.h) / 2
      cover.dpr = dpr
      ctx.imageSmoothingQuality = 'high'
      const img = drawn
      drawn = null // force a redraw at the new size
      if (img) draw(img)
    }

    function draw(img) {
      if (img === drawn) return
      const { x, y, w, h, dpr } = cover
      // EXACTLY one frame, 100% opacity: no blending, no ghosting
      ctx.drawImage(img, x * dpr, y * dpr, w * dpr, h * dpr)
      drawn = img
    }

    function tick(now) {
      const dt = Math.min(now - lastTime, 100)
      lastTime = now

      if (pointer.active) {
        const faceX = cover.x + manifest.face.x * cover.w
        const faceY = cover.y + manifest.face.y * cover.h
        const dx = pointer.x - faceX
        const dy = pointer.y - faceY
        const radius = DEADZONE * Math.max(window.innerWidth, window.innerHeight)

        if (Math.hypot(dx, dy) < radius) {
          smoothed = null
          draw(center)
        } else {
          const target = Math.atan2(dy, dx)
          // Frame-rate independent version of "move 26% of the way each frame"
          const t = 1 - Math.pow(1 - RESPONSE, dt / (1000 / 60))
          smoothed = smoothed === null ? target : lerpAngle(smoothed, target, t)

          const normalized = (smoothed + Math.PI * 2) % (Math.PI * 2)
          const index = Math.round(normalized / STEP) % FRAME_COUNT
          draw(frames[index])
        }
      } else {
        smoothed = null
        draw(center)
      }

      rafId = requestAnimationFrame(tick)
    }

    function onPointerMove(e) {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
    }
    function onPointerLeave() {
      pointer.active = false
    }

    const srcs = Array.from({ length: FRAME_COUNT }, (_, i) => `/frames/${String(i).padStart(2, '0')}.webp`)

    // Center first so something shows immediately, then all 64 in parallel
    loadImage('/frames/center.webp').then((img) => {
      if (cancelled) return
      center = img
      resize()
      draw(center)
      setReady(true)
      return Promise.all(srcs.map(loadImage))
    }).then((imgs) => {
      if (cancelled || !imgs) return
      frames = imgs
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      document.documentElement.addEventListener('pointerleave', onPointerLeave)
      rafId = requestAnimationFrame(tick)
    })

    window.addEventListener('resize', resize)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [manifest])

  return (
    <canvas
      ref={canvasRef}
      className={`character${ready ? ' is-ready' : ''}`}
      role="img"
      aria-label="Illustrated portrait of Ece that follows your cursor"
    />
  )
}
