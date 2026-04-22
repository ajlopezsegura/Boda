import { useEffect, useRef } from 'react'
import { useIsTouch } from '../../hooks/useMediaQuery'

export default function LuxuryCursor() {
  const isTouch = useIsTouch()
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const rafId   = useRef(null)

  useEffect(() => {
    if (isTouch) return

    function onMove(e) {
      pos.current = { x: e.clientX, y: e.clientY }
      const t = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      if (dotRef.current)  dotRef.current.style.transform  = t
      if (ringRef.current) ringRef.current.style.transform = t
    }

    function onEnter(e) {
      if (e.target.closest('[data-cursor="hover"]')) {
        ringRef.current?.classList.add('cursor-hover')
        dotRef.current?.classList.add('cursor-hover')
      }
    }

    function onLeave(e) {
      if (e.target.closest('[data-cursor="hover"]')) {
        ringRef.current?.classList.remove('cursor-hover')
        dotRef.current?.classList.remove('cursor-hover')
      }
    }

    function onDown() {
      ringRef.current?.classList.add('cursor-click')
    }
    function onUp() {
      ringRef.current?.classList.remove('cursor-click')
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onEnter)
    window.addEventListener('mouseout',  onLeave)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onEnter)
      window.removeEventListener('mouseout',  onLeave)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
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
      <style>{`
        div.cursor-hover[style*="width: 7px"] { width: 3px !important; height: 3px !important; opacity: 0.3; }
        div.cursor-hover[style*="width: 34px"] { width: 54px !important; height: 54px !important; border-color: rgba(184,152,72,0.8) !important; transition: width 0.3s ease, height 0.3s ease !important; }
        div.cursor-click { animation: cursor-pop 0.25s ease-out forwards; }
        @keyframes cursor-pop {
          0%   { scale: 1;    opacity: 1;   }
          40%  { scale: 1.5;  opacity: 0.5; }
          100% { scale: 1;    opacity: 1;   }
        }
      `}</style>
    </>
  )
}
