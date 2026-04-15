import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useProject } from '../../context/ProjectContext'
import { useLang } from '../../context/LangContext'
import { useCompare } from '../../context/CompareContext'

const HIDDEN_EXACT   = ['/']
const HIDDEN_PREFIX  = ['/contact', '/admin', '/privacy', '/summary', '/inmersion']

export default function AppFooter() {
  const location = useLocation()
  const navigate = useNavigate()
  const { project } = useProject()
  const { lang } = useLang()
  const { ids } = useCompare()

  const compareBarActive = location.pathname.startsWith('/availability') && ids.length >= 2

  const hidden =
    HIDDEN_EXACT.includes(location.pathname) ||
    HIDDEN_PREFIX.some(p => location.pathname.startsWith(p)) ||
    compareBarActive

  const name = lang === 'es' ? project?.name : (project?.nameEN ?? project?.name)

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
            padding: '0 32px',
            backgroundColor: 'var(--color-bg)',
            borderTop: '1px solid rgba(184,152,72,0.12)',
          }}>

          {/* Left — project identity */}
          <div className="flex items-center gap-3">
            <span className="label-luxury" style={{ fontSize: '0.58rem', color: 'rgba(184,152,72,0.6)', letterSpacing: '0.2em' }}>
              {name?.toUpperCase()}
            </span>
            {project?.subtitle && (
              <>
                <span style={{ color: 'rgba(184,152,72,0.25)', fontSize: '0.5rem' }}>·</span>
                <span className="label-luxury hidden sm:inline" style={{ fontSize: '0.52rem', color: 'rgba(244,241,234,0.35)', letterSpacing: '0.12em' }}>
                  {project.subtitle}
                </span>
              </>
            )}
          </div>

          {/* Right — CTA */}
          <button
            onClick={() => navigate('/contact')}
            data-cursor="hover"
            className="label-luxury flex items-center gap-2.5 transition-all duration-400"
            style={{
              border: '1px solid rgba(184,152,72,0.7)',
              backgroundColor: 'rgba(184,152,72,0.10)',
              color: 'var(--color-accent)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              padding: '8px 22px',
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
