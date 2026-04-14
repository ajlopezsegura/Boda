import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useLang } from '../../context/LangContext'

/* Pages where the CTA should NOT appear */
const HIDDEN_ON = ['/contact', '/admin', '/privacy', '/summary']

export default function ContactCTA() {
  const location = useLocation()
  const navigate = useNavigate()
  const { lang } = useLang()

  const hidden = HIDDEN_ON.some(p => location.pathname.startsWith(p))

  function handleClick() {
    // Preserve any existing lead context (unit pages set this already).
    // If none exists, create a minimal one with just the source page.
    const existing = (() => {
      try { return JSON.parse(localStorage.getItem('tvbs_lead_context') ?? 'null') }
      catch { return null }
    })()

    if (!existing) {
      const source = location.pathname.replace('/', '') || 'cover'
      localStorage.setItem('tvbs_lead_context', JSON.stringify({
        source,
        unit_ids: [],
        primary_unit_id: null,
        back_path: location.pathname,
      }))
    } else {
      // Update source to current page so we know where CTA was clicked
      localStorage.setItem('tvbs_lead_context', JSON.stringify({
        ...existing,
        source: existing.source ?? (location.pathname.replace('/', '') || 'cover'),
        back_path: existing.back_path ?? location.pathname,
      }))
    }

    navigate('/contact')
  }

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.button
          key="contact-cta"
          initial={{ opacity: 0, scale: 0.8, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 8 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          onClick={handleClick}
          data-cursor="hover"
          style={{
            position: 'fixed', bottom: 28, right: 28, zIndex: 40,
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '10px 18px 10px 14px',
            background: 'rgba(18,16,12,0.92)',
            border: '1px solid rgba(184,152,72,0.35)',
            color: 'var(--color-accent)',
            fontSize: '0.5rem', letterSpacing: '0.15em',
            fontFamily: 'inherit', cursor: 'pointer',
            backdropFilter: 'blur(12px)',
            transition: 'border-color 0.2s, background 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(184,152,72,0.7)'
            e.currentTarget.style.background  = 'rgba(184,152,72,0.1)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(184,152,72,0.35)'
            e.currentTarget.style.background  = 'rgba(18,16,12,0.92)'
          }}>
          <MessageCircle size={13} />
          {lang === 'es' ? 'CONTACTAR' : 'CONTACT'}
        </motion.button>
      )}
    </AnimatePresence>
  )
}
