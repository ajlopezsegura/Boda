import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import { useCountdown } from '../hooks/useCountdown'
import wedding from '../data/wedding'

const ease = [0.43, 0.13, 0.23, 0.96]

function CountUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center" style={{ minWidth: 54 }}>
      <span
        className="text-text"
        style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.6rem, 6vw, 2.6rem)', lineHeight: 1, fontWeight: 500 }}
      >
        {String(value).padStart(2, '0')}
      </span>
      <span className="label-luxury text-accent mt-1.5" style={{ fontSize: '0.5rem', letterSpacing: '0.2em' }}>
        {label}
      </span>
    </div>
  )
}

export default function CoverPage() {
  const navigate = useNavigate()
  const [videoFailed, setVideoFailed] = useState(false)
  const { couple, hero, dateLabel, city, country } = wedding
  const { days, hours, minutes, seconds } = useCountdown(wedding.date)

  const showVideo = hero.video && !videoFailed

  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-hidden">

        {/* Background — video or image */}
        {showVideo ? (
          <video
            src={hero.video}
            poster={hero.image}
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-center bg-cover" style={{ backgroundImage: `url(${hero.image})` }} />
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(26,33,48,0.45) 0%, rgba(26,33,48,0.55) 55%, rgba(26,33,48,0.88) 100%)' }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease }}
            className="label-luxury mb-6 sm:mb-8"
            style={{ color: 'rgba(184,152,72,0.9)', fontSize: '0.6rem', letterSpacing: '0.3em', fontWeight: 600 }}
          >
            {hero.kicker}
          </motion.p>

          {/* Names */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease }}
            className="text-text"
            style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2.8rem, 11vw, 6.5rem)', letterSpacing: '0.02em', lineHeight: 1.05, fontWeight: 500 }}
          >
            {couple.bride}
            <span className="text-accent" style={{ fontWeight: 400 }}> &amp; </span>
            {couple.groom}
          </motion.h1>

          {/* Rule */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 56 }}
            transition={{ duration: 0.9, delay: 1.3, ease }}
            className="h-px my-5 sm:my-7"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />

          {/* Date + place */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="label-luxury text-text/70"
            style={{ fontSize: '0.68rem', letterSpacing: '0.22em' }}
          >
            {dateLabel} · {city}, {country}
          </motion.p>

          {/* Countdown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.9, ease }}
            className="flex items-start gap-4 sm:gap-7 mt-9 sm:mt-11"
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
            transition={{ duration: 0.8, delay: 2.3 }}
            onClick={() => navigate('/historia')}
            data-cursor="hover"
            className="mt-11 sm:mt-14 label-luxury border transition-all duration-700 min-h-[46px] px-9 flex items-center gap-3"
            style={{ borderColor: 'rgba(184,152,72,0.45)', color: 'var(--color-text)', fontSize: '0.6rem', letterSpacing: '0.2em' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'rgba(184,152,72,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,152,72,0.45)'; e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            EMBARCAR
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block' }}
            >
              ↓
            </motion.span>
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}
