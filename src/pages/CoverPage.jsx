import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import Monogram from '../components/brand/Monogram'
import { useCountdown } from '../hooks/useCountdown'
import wedding from '../data/wedding'

const ease = [0.43, 0.13, 0.23, 0.96]

export default function CoverPage() {
  const navigate = useNavigate()
  const { couple, cover, dateLabel, dateShort, city, country } = wedding
  const { days } = useCountdown(wedding.date)
  const [videoFailed, setVideoFailed] = useState(false)
  const mobileVideoRef = useRef(null)
  const cardVideoRef = useRef(null)

  const showVideo = cover.video && !videoFailed

  // React no siempre fija la propiedad DOM `muted` a tiempo para que el
  // navegador permita el autoplay (bug conocido, sobre todo en Safari/iOS).
  // Se fuerza de forma imperativa antes de llamar a play(), para las dos
  // instancias del clip (fondo móvil y tarjeta de escritorio).
  useEffect(() => {
    if (!showVideo) return
    for (const ref of [mobileVideoRef, cardVideoRef]) {
      const v = ref.current
      if (!v) continue
      v.muted = true
      v.defaultMuted = true
      const playPromise = v.play()
      if (playPromise?.catch) {
        playPromise.catch(() => setVideoFailed(true))
      }
    }
  }, [showVideo])

  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: 'var(--navy)' }}>

        {/* Móvil — vídeo a sangre, sin cambios respecto al diseño original */}
        {showVideo && (
          <video
            ref={mobileVideoRef}
            src={cover.video}
            poster={cover.image || undefined}
            autoPlay muted defaultMuted loop playsInline webkit-playsinline="true" preload="auto"
            onError={() => setVideoFailed(true)}
            className="md:hidden absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 0 }}
          />
        )}

        {/* Velo cinematográfico (marino) — solo aporta sobre el vídeo de móvil */}
        <div
          className="md:hidden absolute inset-0"
          style={{
            zIndex: 1,
            background:
              'linear-gradient(180deg, rgba(22,32,58,0.78) 0%, rgba(22,32,58,0.42) 32%, rgba(22,32,58,0.48) 62%, rgba(22,32,58,0.88) 100%)',
          }}
        />

        {/* Resplandor sutil de fondo — siempre presente, especialmente visible en escritorio */}
        <div className="absolute inset-0" style={{ zIndex: 0, background: 'radial-gradient(ellipse at 30% 45%, rgba(198,166,89,0.09), transparent 60%)' }} />

        {/* Contenido — móvil: una columna centrada sobre el vídeo.
            Escritorio: split editorial — texto a la izquierda, la foto/vídeo
            como una instantánea (estilo polaroid) a la derecha, ligeramente
            girada, con su franja de pie de foto. */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6
            ${showVideo ? 'md:grid md:grid-cols-2 md:items-center md:text-left' : ''}`}
          style={{ zIndex: 2 }}
        >
          {/* Columna de texto */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left md:pl-14 lg:pl-24 md:pr-8">

            <motion.p
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0, delay: 0.5, ease }}
              className="eyebrow" style={{ color: 'var(--gold-soft)', fontSize: '0.6rem', letterSpacing: '0.36em' }}
            >
              {cover.passportLabel}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0, delay: 0.7 }}
              className="eyebrow mt-2" style={{ color: 'rgba(244,240,231,0.62)', fontSize: '0.5rem', letterSpacing: '0.28em' }}
            >
              {cover.passportSub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.9, ease }}
              className="my-8 sm:my-10"
            >
              <Monogram size={94} color="var(--gold-soft)" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 1.1, ease }}
              className="display" style={{ color: '#F7F3EA', fontSize: 'clamp(2.7rem, 6.4vw, 5.4rem)', letterSpacing: '0.05em', lineHeight: 1.04, textShadow: '0 2px 30px rgba(16,22,40,0.45)' }}
            >
              {couple.bride}
              <span style={{ color: 'var(--gold-soft)', fontStyle: 'italic', fontWeight: 400, padding: '0 0.15em' }}>y</span>
              {couple.groom}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 1.5 }}
              className="eyebrow mt-6" style={{ color: 'rgba(247,243,234,0.85)', fontSize: '0.62rem', letterSpacing: '0.22em' }}
            >
              {dateLabel}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 1.65 }}
              className="eyebrow mt-2" style={{ color: 'var(--gold-soft)', fontSize: '0.5rem', letterSpacing: '0.26em' }}
            >
              {city} · {country}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 1.9 }}
              className="eyebrow mt-8" style={{ color: 'rgba(247,243,234,0.55)', fontSize: '0.48rem', letterSpacing: '0.24em' }}
            >
              faltan {days} días
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.2 }}
              onClick={() => navigate('/historia')}
              className="mt-10 sm:mt-12 eyebrow flex items-center gap-3 transition-all duration-700"
              style={{ border: '1px solid rgba(198,166,89,0.6)', color: '#F7F3EA', fontSize: '0.56rem', letterSpacing: '0.26em', minHeight: 46, padding: '0 34px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-soft)'; e.currentTarget.style.backgroundColor = 'rgba(198,166,89,0.14)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(198,166,89,0.6)'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Abrir
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'inline-block' }}>↓</motion.span>
            </motion.button>
          </div>

          {/* Columna de la instantánea — solo escritorio */}
          {showVideo && (
            <div className="hidden md:flex items-center justify-center relative h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, rotate: -7 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                transition={{ duration: 1.3, delay: 0.7, ease }}
                style={{
                  backgroundColor: 'var(--paper)',
                  padding: '14px 14px 46px',
                  boxShadow: '0 35px 80px rgba(6,9,18,0.5)',
                  width: 'min(30vw, 380px)',
                }}
              >
                <div className="overflow-hidden" style={{ aspectRatio: '41 / 64' }}>
                  <video
                    ref={cardVideoRef}
                    src={cover.video}
                    poster={cover.image || undefined}
                    autoPlay muted defaultMuted loop playsInline webkit-playsinline="true" preload="auto"
                    onError={() => setVideoFailed(true)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="text-center mt-3"
                  style={{ fontFamily: '"EB Garamond", Georgia, serif', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--navy)', letterSpacing: '0.02em' }}
                >
                  {dateShort}
                </p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
