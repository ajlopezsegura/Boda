import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useProject } from '../../context/ProjectContext'
import { useLang } from '../../context/LangContext'
import { useCompare } from '../../context/CompareContext'

const HIDDEN_EXACT   = ['/']
const HIDDEN_PREFIX  = ['/contact', '/admin', '/privacy', '/summary', '/inmersion']

// ── Journey steps ─────────────────────────────────────────────────────────────
const STEPS = [
  { id: 'proyecto',      es: 'PROYECTO',        en: 'PROJECT',       short: 'PRO' },
  { id: 'disponibilidad',es: 'DISPONIBILIDAD',  en: 'AVAILABILITY',  short: 'DISP' },
  { id: 'vivienda',      es: 'VIVIENDA',        en: 'UNIT',          short: 'VIV' },
  { id: 'decision',      es: 'DECISIÓN',        en: 'DECISION',      short: 'DEC' },
]

function getStepIndex(pathname) {
  if (pathname === '/proyecto' || pathname === '/map') return 0
  if (pathname === '/availability') return 1
  if (pathname.startsWith('/availability/')) return 2
  if (pathname === '/compare') return 1 // comparator is part of the browse phase
  if (pathname === '/decision') return 3
  return -1 // unknown — don't highlight any step
}

function useIsMobile(bp = 640) {
  const [m, setM] = useState(() => window.innerWidth < bp)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp - 1}px)`)
    const h = e => setM(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [bp])
  return m
}

export default function AppFooter() {
  const location = useLocation()
  const navigate = useNavigate()
  const { project } = useProject()
  const { lang } = useLang()
  const { ids } = useCompare()
  const mob = useIsMobile()

  const compareBarActive = location.pathname.startsWith('/availability') && ids.length >= 2

  const hidden =
    HIDDEN_EXACT.includes(location.pathname) ||
    HIDDEN_PREFIX.some(p => location.pathname.startsWith(p)) ||
    compareBarActive

  const currentStep = getStepIndex(location.pathname)

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.footer
          key="app-footer"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 30,
            height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: mob ? '0 14px' : '0 32px',
            backgroundColor: 'var(--color-bg)',
            borderTop: '1px solid rgba(184,152,72,0.12)',
          }}>

          {/* Journey progress indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: mob ? 0 : 2 }}>
            {STEPS.map((step, i) => {
              const isPast    = currentStep > i
              const isCurrent = currentStep === i
              const isFuture  = currentStep < i || currentStep === -1

              return (
                <div key={step.id} style={{ display: 'flex', alignItems: 'center' }}>
                  {/* Connecting line before dot (skip first) */}
                  {i > 0 && (
                    <div style={{
                      width: mob ? 12 : 20,
                      height: 1,
                      backgroundColor: isPast || isCurrent
                        ? 'rgba(184,152,72,0.45)'
                        : 'rgba(184,152,72,0.12)',
                      transition: 'background-color 0.4s',
                    }} />
                  )}

                  {/* Dot + label */}
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    gap: 2, position: 'relative',
                  }}>
                    {/* Dot */}
                    <div style={{
                      width: isCurrent ? 7 : 5,
                      height: isCurrent ? 7 : 5,
                      borderRadius: '50%',
                      backgroundColor: isCurrent
                        ? 'var(--color-accent)'
                        : isPast
                          ? 'rgba(184,152,72,0.5)'
                          : 'rgba(184,152,72,0.15)',
                      border: isCurrent ? '1px solid rgba(184,152,72,0.8)' : 'none',
                      transition: 'all 0.4s',
                      flexShrink: 0,
                    }} />

                    {/* Label (desktop only) */}
                    {!mob && (
                      <span style={{
                        position: 'absolute',
                        top: 12,
                        fontSize: '0.32rem',
                        letterSpacing: '0.1em',
                        fontWeight: 400,
                        whiteSpace: 'nowrap',
                        color: isCurrent
                          ? 'rgba(184,152,72,0.7)'
                          : isPast
                            ? 'rgba(184,152,72,0.35)'
                            : 'rgba(184,152,72,0.15)',
                        transition: 'color 0.4s',
                        fontFamily: "'Montserrat', sans-serif",
                        textTransform: 'uppercase',
                      }}>
                        {lang === 'es' ? step.es : step.en}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA button */}
          <button
            onClick={() => navigate('/contact')}
            data-cursor="hover"
            className="label-luxury flex items-center gap-2.5 transition-all duration-400"
            style={{
              border: '1px solid rgba(184,152,72,0.7)',
              backgroundColor: 'rgba(184,152,72,0.10)',
              color: 'var(--color-accent)',
              fontSize: mob ? '0.52rem' : '0.58rem',
              letterSpacing: '0.22em',
              padding: mob ? '7px 16px' : '8px 22px',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'rgba(184,152,72,0.18)'
              e.currentTarget.style.borderColor = 'var(--color-accent)'
              e.currentTarget.style.color = '#ffffff'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'rgba(184,152,72,0.10)'
              e.currentTarget.style.borderColor = 'rgba(184,152,72,0.7)'
              e.currentTarget.style.color = 'var(--color-accent)'
            }}
          >
            {lang === 'es' ? 'CONTACTAR' : 'CONTACT'}
          </button>
        </motion.footer>
      )}
    </AnimatePresence>
  )
}
