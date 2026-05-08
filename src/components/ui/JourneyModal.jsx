import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE = [0.32, 0.72, 0.24, 1]

export default function JourneyModal({
  open,
  onClose,
  studioMark = false,
  eyebrow,
  title,
  body = [],
  button,
  caption,
}) {
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') onClose?.() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  // Stagger body paragraphs after the rule (0.7) with 0.12s gap.
  const bodyDelay = i => 0.7 + i * 0.12
  const buttonDelay  = 0.7 + body.length * 0.12 + 0.13
  const captionDelay = buttonDelay + 0.2

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="jm-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px',
            background: 'rgba(8,10,14,0.42)',
            backdropFilter: 'blur(3px) saturate(110%)',
            WebkitBackdropFilter: 'blur(3px) saturate(110%)',
          }}
        >
          <motion.div
            key="jm-card"
            initial={{ opacity: 0, y: 8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.99 }}
            transition={{ duration: 1.05, ease: EASE }}
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%', maxWidth: 540,
              padding: 'clamp(36px, 6vw, 56px) clamp(28px, 5vw, 52px)',
              background: 'linear-gradient(180deg, rgba(18,22,32,0.55) 0%, rgba(12,15,22,0.6) 100%)',
              backdropFilter: 'blur(22px) saturate(135%)',
              WebkitBackdropFilter: 'blur(22px) saturate(135%)',
              border: '1px solid rgba(184,152,72,0.28)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(184,152,72,0.04)',
              textAlign: 'center',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
            }}
          >
            {studioMark && (
              <div className="label-luxury" style={{
                fontSize: '0.5rem', letterSpacing: '0.28em',
                color: 'rgba(184,152,72,0.55)', marginBottom: 28,
              }}>
                THE VISUALS BOUTIQUE·STUDIO
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="label-luxury"
              style={{
                fontSize: '0.58rem', letterSpacing: '0.32em',
                color: 'var(--color-accent)', marginBottom: 18,
              }}
            >
              {eyebrow}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="display-heading"
              style={{
                fontSize: 'clamp(1.2rem, 3.8vw, 1.85rem)',
                letterSpacing: '0.08em',
                lineHeight: 1.2, color: '#ffffff',
                marginBottom: 22,
              }}
            >
              {String(title).split('\n').map((line, i) => (
                <span key={i} style={{ display: 'block', whiteSpace: 'nowrap' }}>
                  {line}
                </span>
              ))}
            </motion.h2>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 36 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              style={{ height: 1, backgroundColor: 'var(--color-accent)', marginBottom: 22 }}
            />

            {body.map((paragraph, i) => {
              const isLast = i === body.length - 1
              return (
                <motion.p
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: bodyDelay(i), duration: 0.8 }}
                  style={{
                    fontSize: i === 0 ? 'clamp(0.72rem, 2vw, 0.82rem)' : 'clamp(0.7rem, 1.95vw, 0.78rem)',
                    lineHeight: i === 0 ? 1.75 : 1.7,
                    color: i === 0 ? 'rgba(244,241,234,0.78)' : 'rgba(244,241,234,0.66)',
                    letterSpacing: '0.02em',
                    maxWidth: 440,
                    marginBottom: isLast ? 34 : 16,
                  }}
                >
                  {paragraph}
                </motion.p>
              )
            })}

            <motion.button
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: buttonDelay, duration: 0.6 }}
              onClick={onClose}
              data-cursor="hover"
              className="label-luxury"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 32px',
                border: '1px solid rgba(184,152,72,0.7)',
                background: 'rgba(184,152,72,0.08)',
                color: 'var(--color-accent)',
                fontSize: '0.6rem', letterSpacing: '0.26em',
                cursor: 'pointer', transition: 'all 0.4s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = 'rgba(184,152,72,0.18)'
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.color       = '#ffffff'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = 'rgba(184,152,72,0.08)'
                e.currentTarget.style.borderColor = 'rgba(184,152,72,0.7)'
                e.currentTarget.style.color       = 'var(--color-accent)'
              }}
            >
              {button}
              <span style={{ display: 'inline-block' }}>→</span>
            </motion.button>

            {caption && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: captionDelay, duration: 0.7 }}
                style={{
                  marginTop: 22,
                  fontSize: '0.58rem',
                  fontStyle: 'italic',
                  letterSpacing: '0.04em',
                  color: 'rgba(244,241,234,0.4)',
                }}
              >
                {caption}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
