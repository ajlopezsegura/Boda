import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import wedding from '../../data/wedding'

const LINKS = [
  { to: '/historia', label: 'Historia' },
  { to: '/dia',      label: 'El día' },
  { to: '/viaje',    label: 'Viaje' },
  { to: '/galeria',  label: 'Galería' },
  { to: '/info',     label: 'Info' },
  { to: '/rsvp',     label: 'Confirmar' },
]

export default function WeddingNav() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const onCover = location.pathname === '/'

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4"
        style={{
          backgroundColor: onCover ? 'transparent' : 'rgba(37,45,58,0.90)',
          backdropFilter: onCover ? 'none' : 'blur(16px)',
          borderBottom: onCover ? 'none' : '1px solid rgba(184,152,72,0.15)',
          minHeight: 'var(--header-h)',
        }}
      >
        {/* Monogram */}
        <Link to="/" data-cursor="hover" className="no-underline flex items-center gap-2.5">
          <span
            className="flex items-center justify-center"
            style={{
              width: 34, height: 34, borderRadius: '50%',
              border: '1px solid rgba(184,152,72,0.6)',
              color: 'var(--color-accent)',
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '0.85rem', letterSpacing: '0.04em', fontWeight: 500,
            }}
          >
            {wedding.couple.monogram}
          </span>
          <span className="hidden sm:flex flex-col gap-0.5">
            <span className="text-text" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '0.95rem', letterSpacing: '0.08em', lineHeight: 1 }}>
              {wedding.couple.bride} &amp; {wedding.couple.groom}
            </span>
            <span className="label-luxury text-accent" style={{ fontSize: '0.42rem', letterSpacing: '0.22em' }}>
              {wedding.dateShort}
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map(l => {
            const active = location.pathname === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                data-cursor="hover"
                className="label-luxury no-underline transition-colors duration-500"
                style={{ fontSize: '0.6rem', color: active ? 'var(--color-accent)' : 'rgba(244,241,234,0.6)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={e => (e.currentTarget.style.color = active ? 'var(--color-accent)' : 'rgba(244,241,234,0.6)')}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(true)}
          data-cursor="hover"
          className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px]"
          style={{ color: 'var(--color-accent)' }}
          aria-label="Abrir menú"
        >
          <Menu size={22} strokeWidth={1.2} />
        </button>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-7 md:hidden"
            style={{ backgroundColor: 'rgba(26,33,48,0.98)', backdropFilter: 'blur(8px)' }}
          >
            <button
              onClick={() => setOpen(false)}
              data-cursor="hover"
              className="absolute top-4 right-4 flex items-center justify-center min-h-[44px] min-w-[44px]"
              style={{ color: 'var(--color-accent)' }}
              aria-label="Cerrar menú"
            >
              <X size={24} strokeWidth={1.2} />
            </button>

            <span style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '2rem', color: 'var(--color-accent)', letterSpacing: '0.06em' }}>
              {wedding.couple.monogram}
            </span>

            {LINKS.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
              >
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  data-cursor="hover"
                  className="label-luxury no-underline"
                  style={{
                    fontSize: '0.9rem',
                    letterSpacing: '0.14em',
                    color: location.pathname === l.to ? 'var(--color-accent)' : 'var(--color-text)',
                  }}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
