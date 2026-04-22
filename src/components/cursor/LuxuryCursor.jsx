import { useEffect, useRef } from 'react'
import { useIsTouch } from '../../hooks/useMediaQuery'

export default function LuxuryCursor() {
  const isTouch = useIsTouch()
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if (isTouch) return

    function onMove(e) {
      pos.current = { x: e.clientX, y: e.clientY }
      const t = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      if (dotRef.current)  dotRef.current.style.transform  = t
      if (ringRef.current) ringRef.current.style.transform = t
    }

    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
    }
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 7, height: 7,
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          transition: 'width 0.2s, height 0.2s, opacity 0.2s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 34, height: 34,
          borderRadius: '50%',
          border: '1px solid rgba(184,152,72,0.6)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
        }}
      />
    </>
  )
}
