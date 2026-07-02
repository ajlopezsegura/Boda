import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import Monogram from '../components/brand/Monogram'
import { useCountdown } from '../hooks/useCountdown'
import wedding from '../data/wedding'

const ease = [0.43, 0.13, 0.23, 0.96]

export default function CoverPage() {
  const navigate = useNavigate()
  const { couple, cover, dateLabel, city, country } = wedding
  const { days } = useCountdown(wedding.date)

  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: 'var(--navy)' }}>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 36%, rgba(198,166,89,0.10), transparent 62%)' }} />

        {/* Marco de hilo dorado */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.4, delay: 0.4 }}
          className="absolute pointer-events-none"
          style={{ inset: 'clamp(14px, 3vw, 30px)', border: '1px solid rgba(198,166,89,0.32)' }}
        />

        {/* Microtexto de esquina (motivo pasaporte) */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.6 }}
          className="absolute hidden sm:flex items-center justify-between"
          style={{ left: 'clamp(28px, 4vw, 52px)', right: 'clamp(28px, 4vw, 52px)', top: 'clamp(28px, 4vw, 48px)' }}
        >
          <span className="data" style={{ color: 'rgba(198,166,89,0.5)', fontSize: '0.5rem' }}>ESP · {city.toUpperCase()}</span>
          <span className="data" style={{ color: 'rgba(198,166,89,0.5)', fontSize: '0.5rem' }}>Nº&nbsp;12·12·MMXXVI</span>
        </motion.div>

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

          <motion.p
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.5, ease }}
            className="eyebrow" style={{ color: 'var(--gold-soft)', fontSize: '0.6rem', letterSpacing: '0.36em' }}
          >
            {cover.passportLabel}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0, delay: 0.7 }}
            className="eyebrow mt-2" style={{ color: 'rgba(244,240,231,0.5)', fontSize: '0.5rem', letterSpacing: '0.28em' }}
          >
            {cover.passportSub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.9, ease }}
            className="my-8 sm:my-10"
          >
            <Monogram size={94} color="var(--gold-soft)" />
          </motion.div>

          {/* Nombres — con «y» en itálica serif */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.1, ease }}
            className="display" style={{ color: '#F4F0E7', fontSize: 'clamp(2.7rem, 10vw, 6.2rem)', letterSpacing: '0.05em', lineHeight: 1.04 }}
          >
            {couple.bride}
            <span style={{ color: 'var(--gold-soft)', fontStyle: 'italic', fontWeight: 400, padding: '0 0.15em' }}>y</span>
            {couple.groom}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 1.5 }}
            className="eyebrow mt-6" style={{ color: 'rgba(244,240,231,0.72)', fontSize: '0.62rem', letterSpacing: '0.22em' }}
          >
            {dateLabel}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 1.65 }}
            className="eyebrow mt-2" style={{ color: 'rgba(198,166,89,0.7)', fontSize: '0.5rem', letterSpacing: '0.26em' }}
          >
            {city} · {country}
          </motion.p>

          {/* Cuenta atrás discreta — una sola línea */}
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 1.9 }}
            className="eyebrow mt-8" style={{ color: 'rgba(244,240,231,0.4)', fontSize: '0.48rem', letterSpacing: '0.24em' }}
          >
            faltan {days} días
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.2 }}
            onClick={() => navigate('/historia')}
            data-cursor="hover"
            className="mt-10 sm:mt-12 eyebrow flex items-center gap-3 transition-all duration-700"
            style={{ border: '1px solid rgba(198,166,89,0.5)', color: '#F4F0E7', fontSize: '0.56rem', letterSpacing: '0.26em', minHeight: 46, padding: '0 34px' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-soft)'; e.currentTarget.style.backgroundColor = 'rgba(198,166,89,0.10)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(198,166,89,0.5)'; e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            Abrir
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'inline-block' }}>↓</motion.span>
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}
