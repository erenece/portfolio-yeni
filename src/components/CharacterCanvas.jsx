import { useEffect, useRef, useState } from 'react'

const FRAME_COUNT = 64
const STEP = (Math.PI * 2) / FRAME_COUNT // ~5.625° per frame
const RESPONSE = 0.26 // lerp factor per 60fps frame -> tracks in ~35ms
const DEADZONE = 0.12 // fraction of the screen: inside this radius she looks at you
const FADE_MS = 160 // short fade when snapping to / away from the center frame

// Phones: "cover" would blow the face up to fill the tall screen, so draw it
// smaller and melt the image's bottom edge into the background colour.
const MOBILE_MAX_WIDTH = 640 // same breakpoint as the CSS
const MOBILE_ZOOM = 0.7 // 70% of the cover size
const MOBILE_FACE_Y = 0.38 // face sits 38% down the screen
const EDGE_FADE = 200 // CSS px of fade where the image stops short of the screen

// "#6936a0" -> "105, 54, 160" for building rgba() strings
function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}

// Shortest-path interpolation between two angles (radians).
// Without this, going from 350° to 10° would spin the long way round.
function lerpAngle(from, to, t) {
  let diff = (to - from) % (Math.PI * 2)
  if (diff > Math.PI) diff -= Math.PI * 2
  if (diff < -Math.PI) diff += Math.PI * 2
  return from + diff * t
}

// Resolve on `load` (fires even in background tabs, unlike decode()),
// then turn the image into an ImageBitmap. A plain <img> can have its decoded
// pixels thrown away by the browser and re-decoded on every drawImage() (~9ms
// for 1080p); an ImageBitmap stays decoded, so drawing it is <1ms.
function loadFrame(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      if (typeof createImageBitmap !== 'function') return resolve(img)
      createImageBitmap(img).then(resolve, () => resolve(img))
    }
    img.onerror = reject
    img.src = src
  })
}

// The frames live here, outside the component, so they are loaded once per
// visit. Leaving the home page and coming back used to re-download and
// re-decode all ~40 frames (stutter + a frozen face for a moment); now the
// remounted canvas finds them ready.
const store = {
  center: null,
  slots: new Array(FRAME_COUNT).fill(null), // slot i = frame for angle i
  loading: false,
  listeners: new Set(), // mounted canvases that want to hear "a frame arrived"
}

function loadFrames(manifest) {
  if (store.loading) return
  store.loading = true
  const notify = () => store.listeners.forEach((fn) => fn())

  // manifest.sources[i] = which video frame slot i came from. Many slots
  // repeat the same source, so load each distinct image only once:
  // ~39 bitmaps instead of 64 (each 1080p bitmap is ~8MB of memory).
  const sources = manifest.sources ?? Array.from({ length: FRAME_COUNT }, (_, i) => i)
  const firstSlot = new Map() // source frame -> first slot that uses it
  sources.forEach((source, slot) => {
    if (!firstSlot.has(source)) firstSlot.set(source, slot)
  })
  const pad = (n) => String(n).padStart(2, '0')

  // Center first so something shows immediately, then the rest in parallel.
  // Each frame is usable the moment it arrives; no waiting for all of them.
  loadFrame('/frames/center.webp')
    .then((img) => {
      store.center = img
      notify()
      return Promise.all(
        [...firstSlot].map(([source, slot]) =>
          loadFrame(`/frames/${pad(slot)}.webp`).then((bitmap) => {
            sources.forEach((s, i) => {
              if (s === source) store.slots[i] = bitmap
            })
            notify()
          }),
        ),
      )
    })
    .catch(() => {
      store.loading = false // a frame failed (offline?): try again on the next mount
    })
}

// While frames are still arriving, use the closest angle that is already loaded
function nearestFrame(index) {
  for (let d = 0; d <= FRAME_COUNT / 2; d++) {
    const ahead = store.slots[(index + d) % FRAME_COUNT]
    if (ahead) return ahead
    const behind = store.slots[(index - d + FRAME_COUNT) % FRAME_COUNT]
    if (behind) return behind
  }
  return null
}

export default function CharacterCanvas({ manifest, label }) {
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(() => store.center !== null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { alpha: false })
    let started = false
    let rafId = 0

    // Shared mutable state for the render loop (no React re-renders at 60fps)
    const pointer = { x: 0, y: 0, active: false }
    const cover = { x: 0, y: 0, w: 0, h: 0, dpr: 1, vw: 0, vh: 0 } // where the image lands, in CSS px
    const bgRgb = hexToRgb(manifest.background)
    let smoothed = null // current smoothed angle
    let target = null // the frame that should be on screen
    let dirty = false // target changed (or canvas resized) and needs painting
    let fade = null // { from, start } while fading to/from the center frame
    let lastTime = performance.now()

    // object-fit: cover, done by hand so we know exactly where the face ends up
    // (on phones: a bit smaller than cover, see MOBILE_ZOOM)
    function resize() {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const mobile = vw <= MOBILE_MAX_WIDTH
      canvas.width = Math.round(vw * dpr)
      canvas.height = Math.round(vh * dpr)
      let scale = Math.max(vw / manifest.width, vh / manifest.height)
      if (mobile) scale *= MOBILE_ZOOM
      cover.w = manifest.width * scale
      cover.h = manifest.height * scale
      cover.x = (vw - cover.w) / 2
      cover.y = mobile ? vh * MOBILE_FACE_Y - manifest.face.y * cover.h : (vh - cover.h) / 2
      cover.dpr = dpr
      cover.vw = vw
      cover.vh = vh
      ctx.imageSmoothingQuality = 'high'
      dirty = true
      render(performance.now())
    }

    function paint(img, alpha) {
      const { x, y, w, h, dpr } = cover
      if (alpha === 1) {
        // the image may not cover the whole screen (phones): clear to the background first
        ctx.fillStyle = manifest.background
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
      ctx.globalAlpha = alpha
      ctx.drawImage(img, x * dpr, y * dpr, w * dpr, h * dpr)
      ctx.globalAlpha = 1
    }

    // Where the image stops short of the screen, fade its edge into the background
    function fadeEdges() {
      const { y, h, dpr, vh } = cover
      const edges = []
      if (y > 0) edges.push([y + EDGE_FADE, y]) // top: from inside the image up to its edge
      if (y + h < vh) edges.push([y + h - EDGE_FADE, y + h]) // bottom
      for (const [from, to] of edges) {
        const g = ctx.createLinearGradient(0, from * dpr, 0, to * dpr)
        // smoothstep stops instead of a straight ramp: a linear fade meeting the
        // flat colour reads as a faint line to the eye (Mach band)
        for (let i = 0; i <= 8; i++) {
          const t = i / 8
          g.addColorStop(t, `rgba(${bgRgb}, ${t * t * (3 - 2 * t)})`)
        }
        ctx.fillStyle = g
        // overshoot by a few px: the image edge rarely lands on a whole pixel,
        // and the half-covered last row would otherwise show as a thin dark line
        ctx.fillRect(0, (Math.min(from, to) - 4) * dpr, canvas.width, (EDGE_FADE + 8) * dpr)
      }
    }

    // Pick what should be on screen. Neighbouring angle frames are swapped
    // instantly (one frame, 100% opacity: no ghosting). Only the jump to/from
    // the center frame gets a short fade, because that one is a big pose change.
    function show(img, now) {
      if (!img || img === target) return
      const crossesCenter = target && (img === store.center || target === store.center)
      if (crossesCenter && !fade) fade = { from: target, start: now }
      target = img
      dirty = true
    }

    function render(now) {
      if (!target) return
      if (fade) {
        const t = Math.min((now - fade.start) / FADE_MS, 1)
        const eased = t * t * (3 - 2 * t) // smoothstep
        paint(fade.from, 1)
        paint(target, eased)
        fadeEdges()
        if (t >= 1) fade = null
        dirty = false
        return
      }
      if (dirty) {
        paint(target, 1)
        fadeEdges()
        dirty = false
      }
    }

    function tick(now) {
      const dt = Math.min(now - lastTime, 100)
      lastTime = now
      rafId = requestAnimationFrame(tick)
      if (!store.center) return // nothing to draw yet

      if (pointer.active) {
        const faceX = cover.x + manifest.face.x * cover.w
        const faceY = cover.y + manifest.face.y * cover.h
        const dx = pointer.x - faceX
        const dy = pointer.y - faceY
        const radius = DEADZONE * Math.max(window.innerWidth, window.innerHeight)

        if (Math.hypot(dx, dy) < radius) {
          smoothed = null
          show(store.center, now)
        } else {
          const angle = Math.atan2(dy, dx)
          // Frame-rate independent version of "move 26% of the way each frame"
          const t = 1 - Math.pow(1 - RESPONSE, dt / (1000 / 60))
          smoothed = smoothed === null ? angle : lerpAngle(smoothed, angle, t)

          const normalized = (smoothed + Math.PI * 2) % (Math.PI * 2)
          const index = Math.round(normalized / STEP) % FRAME_COUNT
          show(nearestFrame(index), now)
        }
      } else {
        smoothed = null
        show(store.center, now)
      }

      render(now)
    }

    function onPointerMove(e) {
      pointer.x = e.clientX
      pointer.y = e.clientY
      pointer.active = true
    }
    function onPointerLeave() {
      pointer.active = false
    }

    // First paint as soon as the center frame exists (instantly if it was
    // already loaded on an earlier visit to the home page)
    function onFrame() {
      if (started || !store.center) return
      started = true
      resize()
      show(store.center, performance.now())
      render(performance.now())
      setReady(true)
    }

    store.listeners.add(onFrame)
    loadFrames(manifest)
    onFrame()

    // Track the cursor right away; missing angles fall back to the nearest loaded one
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)
    rafId = requestAnimationFrame(tick)

    window.addEventListener('resize', resize)

    // the frames stay in `store` for the next visit; only this canvas's listeners go
    return () => {
      store.listeners.delete(onFrame)
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
      aria-label={label}
    />
  )
}
