import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Monogram from '../brand/Monogram'
import wedding from '../../data/wedding'

const LINKS = [
  { to: '/historia', label: 'Historia' },
  { to: '/dia',      label: 'El día' },
  { to: '/viaje',    label: 'Viaje' },
  { to: '/info',     label: 'Info' },
  { to: '/rsvp',     label: 'Confirmar' },
]

export default function WeddingNav() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  const onCover = location.pathname === '/'
  // Sobre la portada (marino) → tinta clara; sobre papel → tinta marino.
  const ink      = onCover ? 'rgba(244,240,231,0.72)' : 'var(--ink-muted)'
  const inkStrong= onCover ? '#F4F0E7' : 'var(--navy)'
  const gold     = onCover ? 'var(--gold-soft)' : 'var(--gold)'

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-9 py-3"
        style={{
          backgroundColor: onCover ? 'transparent' : 'rgba(244,240,231,0.88)',
          backdropFilter: onCover ? 'none' : 'blur(14px)',
          borderBottom: onCover ? 'none' : '1px solid var(--hairline)',
          minHeight: 'var(--header-h)',
        }}
      >
        {/* Nombres + fecha */}
        <Link to="/" data-cursor="hover" className="no-underline flex flex-col justify-center" style={{ gap: 2, minHeight: 44 }}>
          <span className="display" style={{ color: inkStrong, fontSize: 'clamp(0.94rem, 3.3vw, 1.16rem)', letterSpacing: '0.08em', lineHeight: 1 }}>
            {wedding.couple.bride} &amp; {wedding.couple.groom}
          </span>
          <span className="eyebrow" style={{ color: gold, fontSize: '0.44rem', letterSpacing: '0.22em' }}>
            {wedding.dateShort}
          </span>
        </Link>

        {/* Nav escritorio */}
        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map(l => {
            const active = location.pathname === l.to
            return (
              <Link
                key={l.to}
                to={l.to}
                data-cursor="hover"
                className="eyebrow no-underline transition-colors duration-500"
                style={{ fontSize: '0.58rem', color: active ? gold : ink }}
                onMouseEnter={e => (e.currentTarget.style.color = gold)}
                onMouseLeave={e => (e.currentTarget.style.color = active ? gold : ink)}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>

        {/* Botón móvil */}
        <button
          onClick={() => setOpen(true)}
          data-cursor="hover"
          className="md:hidden flex items-center justify-center min-h-[44px] min-w-[44px]"
          style={{ color: gold }}
          aria-label="Abrir menú"
        >
          <Menu size={22} strokeWidth={1.2} />
        </button>
      </motion.header>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ backgroundColor: 'var(--navy)' }}
          >
            <button
              onClick={() => setOpen(false)}
              data-cursor="hover"
              className="absolute top-4 right-4 flex items-center justify-center min-h-[44px] min-w-[44px]"
              style={{ color: 'var(--gold-soft)' }}
              aria-label="Cerrar menú"
            >
              <X size={24} strokeWidth={1.2} />
            </button>

            <Monogram size={72} color="var(--gold-soft)" />

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
                  className="display no-underline"
                  style={{
                    fontSize: '1.7rem',
                    letterSpacing: '0.06em',
                    color: location.pathname === l.to ? 'var(--gold-soft)' : '#F4F0E7',
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
