import { useEffect, useRef, useState } from 'react'

export default function LuxuryCursor() {
  const dotRef       = useRef(null)
  const ringRef      = useRef(null)
  const isHovering   = useRef(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onMove(e) {
      const t = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      if (dotRef.current)  dotRef.current.style.transform  = t
      if (ringRef.current) ringRef.current.style.transform = t
      if (!visible) setVisible(true)

      const hovering = !!e.target.closest?.('[data-cursor="hover"]')
      if (hovering !== isHovering.current) {
        isHovering.current = hovering
        if (hovering) ringRef.current?.classList.add('cursor-hover')
        else          ringRef.current?.classList.remove('cursor-hover')
      }
    }

    function onTouch() {
      setVisible(false)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchstart', onTouch)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('touchstart', onTouch)
    }
  }, [visible])

  if (!visible) return null

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
          transition: 'scale 0.2s ease',
        }}
      />
      <style>{`div.cursor-hover { scale: 1.6; }`}</style>
    </>
  )
}
