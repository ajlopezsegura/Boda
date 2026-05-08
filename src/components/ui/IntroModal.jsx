import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../../context/LangContext'

const STORAGE_KEY = 'tvbs_seen_intro_v1'

const COPY = {
  es: {
    eyebrow: 'CASO DEMO',
    title:   'LA FORMA VISIBLE\nDEL VALOR',
    body1:   'TVBS diseña sistemas de venta visual para proyectos de alto valor: estrategia, dirección visual e inteligencia comercial reunidas en una misma experiencia.',
    body2:   'Pensado para defender valor, alinear equipos y acelerar procesos de decisión.',
    button:  'ENTRAR EN LA DEMO',
    caption: 'Caso demo construido íntegramente por TVBS.',
  },
  en: {
    eyebrow: 'DEMO CASE',
    title:   'THE VISIBLE FORM\nOF VALUE',
    body1:   'TVBS designs visual sales systems for high-value projects: strategy, visual direction and commercial intelligence brought together in a single experience.',
    body2:   'Built to defend value, align teams and accelerate decision processes.',
    button:  'ENTER THE DEMO',
    caption: 'Demo case built entirely by TVBS.',
  },
}

export default function IntroModal() {
  const { lang } = useLang()
  const [open, setOpen] = useState(false)
  const t = COPY[lang] ?? COPY.es

  useEffect(() => {
    // TODO: re-enable once-per-visitor by checking localStorage[STORAGE_KEY]
    const id = setTimeout(() => setOpen(true), 600)
    return () => clearTimeout(id)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') dismiss() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  function dismiss() {
    // localStorage write skipped during testing so the modal returns on reload
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="intro-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.32, 0.72, 0.24, 1] }}
          onClick={dismiss}
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
            key="intro-card"
            initial={{ opacity: 0, y: 8, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.99 }}
            transition={{ duration: 1.05, ease: [0.32, 0.72, 0.24, 1] }}
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
            {/* studio mark */}
            <div className="label-luxury" style={{
              fontSize: '0.5rem', letterSpacing: '0.28em',
              color: 'rgba(184,152,72,0.55)', marginBottom: 28,
            }}>
              THE VISUALS BOUTIQUE·STUDIO
            </div>

            {/* eyebrow */}
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
              {t.eyebrow}
            </motion.div>

            {/* title */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="display-heading"
              style={{
                fontSize: 'clamp(1.4rem, 4.2vw, 2rem)',
                letterSpacing: '0.1em',
                lineHeight: 1.15, color: '#ffffff',
                whiteSpace: 'pre-line',
                marginBottom: 22,
              }}
            >
              {t.title}
            </motion.h2>

            {/* rule */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 36 }}
              transition={{ delay: 0.55, duration: 0.7 }}
              style={{ height: 1, backgroundColor: 'var(--color-accent)', marginBottom: 22 }}
            />

            {/* body — first paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{
                fontSize: 'clamp(0.72rem, 2vw, 0.82rem)',
                lineHeight: 1.75,
                color: 'rgba(244,241,234,0.78)',
                letterSpacing: '0.02em',
                maxWidth: 440,
                marginBottom: 16,
              }}
            >
              {t.body1}
            </motion.p>

            {/* body — second paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.82, duration: 0.8 }}
              style={{
                fontSize: 'clamp(0.7rem, 1.95vw, 0.78rem)',
                lineHeight: 1.7,
                color: 'rgba(244,241,234,0.66)',
                letterSpacing: '0.02em',
                maxWidth: 420,
                marginBottom: 34,
              }}
            >
              {t.body2}
            </motion.p>

            {/* button */}
            <motion.button
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.6 }}
              onClick={dismiss}
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
              {t.button}
              <span style={{ display: 'inline-block' }}>→</span>
            </motion.button>

            {/* caption */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15, duration: 0.7 }}
              style={{
                marginTop: 22,
                fontSize: '0.58rem',
                fontStyle: 'italic',
                letterSpacing: '0.04em',
                color: 'rgba(244,241,234,0.4)',
              }}
            >
              {t.caption}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
