import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'

/* Pages where the floating CTA should NOT appear */
const HIDDEN_ON = ['/', '/rsvp']

export default function RsvpCTA() {
  const location = useLocation()
  const navigate = useNavigate()

  const hidden = HIDDEN_ON.includes(location.pathname)

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.button
          key="rsvp-cta"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          onClick={() => navigate('/rsvp')}
          data-cursor="hover"
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 40,
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 18px 11px 15px',
            background: 'rgba(26,33,48,0.92)',
            border: '1px solid rgba(184,152,72,0.4)',
            color: 'var(--color-accent)',
            fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            fontFamily: 'inherit', cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(184,152,72,0.8)'
            e.currentTarget.style.background = 'rgba(184,152,72,0.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(184,152,72,0.4)'
            e.currentTarget.style.background = 'rgba(26,33,48,0.92)'
          }}
        >
          <Send size={13} />
          Confirmar asistencia
        </motion.button>
      )}
    </AnimatePresence>
  )
}
