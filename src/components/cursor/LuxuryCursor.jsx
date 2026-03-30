import { useEffect, useRef } from 'react'
import { useIsTouch } from '../../hooks/useMediaQuery'

export default function LuxuryCursor() {
  const isTouch = useIsTouch()
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const rafId   = useRef(null)
  const hovered = useRef(false)

  useEffect(() => {
    if (isTouch) return

    function onMove(e) {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    function onEnter(e) {
      if (e.target.closest('[data-cursor="hover"]')) {
        hovered.current = true
        ringRef.current?.classList.add('cursor-hover')
        dotRef.current?.classList.add('cursor-hover')
      }
    }

    function onLeave(e) {
      if (e.target.closest('[data-cursor="hover"]')) {
        hovered.current = false
        ringRef.current?.classList.remove('cursor-hover')
        dotRef.current?.classList.remove('cursor-hover')
      }
    }

    function animate() {
      const LERP = 0.10
      ring.current.x += (pos.current.x - ring.current.x) * LERP
      ring.current.y += (pos.current.y - ring.current.y) * LERP
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      }
      rafId.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout',  onLeave)
    rafId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout',  onLeave)
      cancelAnimationFrame(rafId.current)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--color-gold)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1px solid var(--color-gold)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
        }}
      />
      <style>{`
        .cursor-dot.cursor-hover   { width: 4px !important; height: 4px !important; opacity: 0.4; }
        .cursor-ring.cursor-hover  { width: 56px !important; height: 56px !important; border-color: var(--color-gold-light); transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease; }
      `}</style>
    </>
  )
}
