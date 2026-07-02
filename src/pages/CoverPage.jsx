import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import Monogram from '../components/brand/Monogram'
import { useCountdown } from '../hooks/useCountdown'
import wedding from '../data/wedding'

const ease = [0.43, 0.13, 0.23, 0.96]

function CountUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center" style={{ minWidth: 52 }}>
      <span className="display" style={{ color: '#F4F0E7', fontSize: 'clamp(1.5rem, 5.5vw, 2.4rem)', lineHeight: 1 }}>
        {String(value).padStart(2, '0')}
      </span>
      <span className="eyebrow mt-2" style={{ color: 'var(--gold-soft)', fontSize: '0.44rem', letterSpacing: '0.22em' }}>
        {label}
      </span>
    </div>
  )
}

export default function CoverPage() {
  const navigate = useNavigate()
  const { couple, cover, dateLabel, city, country } = wedding
  const { days, hours, minutes, seconds } = useCountdown(wedding.date)

  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: 'var(--navy)' }}>
        {/* Viñeta sutil */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 38%, rgba(198,166,89,0.10), transparent 60%)' }} />

        {/* Marco de hilo dorado */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="absolute pointer-events-none"
          style={{ inset: 'clamp(14px, 3vw, 30px)', border: '1px solid rgba(198,166,89,0.35)' }}
        />

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.5, ease }}
            className="eyebrow"
            style={{ color: 'var(--gold-soft)', fontSize: '0.6rem', letterSpacing: '0.34em' }}
          >
            {cover.passportLabel}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 0.7 }}
            className="eyebrow mt-2"
            style={{ color: 'rgba(244,240,231,0.55)', fontSize: '0.5rem', letterSpacing: '0.28em' }}
          >
            {cover.passportSub}
          </motion.p>

          {/* Monograma firma */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.9, ease }}
            className="my-8 sm:my-10"
          >
            <Monogram size={96} color="var(--gold-soft)" />
          </motion.div>

          {/* Nombres */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease }}
            className="display"
            style={{ color: '#F4F0E7', fontSize: 'clamp(2.6rem, 10vw, 6rem)', letterSpacing: '0.06em', lineHeight: 1.05 }}
          >
            {couple.bride}
            <span style={{ color: 'var(--gold-soft)', fontWeight: 400 }}> &amp; </span>
            {couple.groom}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.5 }}
            className="eyebrow mt-5"
            style={{ color: 'rgba(244,240,231,0.7)', fontSize: '0.62rem', letterSpacing: '0.22em' }}
          >
            {dateLabel} · {city}, {country}
          </motion.p>

          {/* Cuenta atrás */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.8, ease }}
            className="flex items-start gap-5 sm:gap-8 mt-9 sm:mt-11"
          >
            <CountUnit value={days} label="Días" />
            <CountUnit value={hours} label="Horas" />
            <CountUnit value={minutes} label="Min" />
            <CountUnit value={seconds} label="Seg" />
          </motion.div>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            onClick={() => navigate('/historia')}
            data-cursor="hover"
            className="mt-11 sm:mt-14 eyebrow flex items-center gap-3 transition-all duration-700"
            style={{ border: '1px solid rgba(198,166,89,0.5)', color: '#F4F0E7', fontSize: '0.58rem', letterSpacing: '0.24em', minHeight: 46, padding: '0 34px' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-soft)'; e.currentTarget.style.backgroundColor = 'rgba(198,166,89,0.10)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(198,166,89,0.5)'; e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            Descubrir
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'inline-block' }}>↓</motion.span>
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}
