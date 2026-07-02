import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'

/* Páginas donde el CTA flotante NO aparece */
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
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 8 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          onClick={() => navigate('/rsvp')}
          data-cursor="hover"
          style={{
            position: 'fixed', bottom: 22, right: 22, zIndex: 40,
            display: 'flex', alignItems: 'center', gap: 9,
            padding: '12px 20px 12px 16px',
            background: 'var(--navy)',
            border: '1px solid var(--gold)',
            color: 'var(--gold-soft)',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(30,42,68,0.18)',
            transition: 'background 0.25s, color 0.25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy-deep)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--navy)' }}
        >
          <Send size={13} />
          Confirmar asistencia
        </motion.button>
      )}
    </AnimatePresence>
  )
}
