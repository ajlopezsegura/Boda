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
  const { couple, cover, dateLabel, city, country } = wedding
  const { days } = useCountdown(wedding.date)
  const [videoFailed, setVideoFailed] = useState(false)
  const videoRef = useRef(null)

  const showVideo = cover.video && !videoFailed
  const ambientRef = useRef(null)

  // React no siempre fija la propiedad DOM `muted` a tiempo para que el
  // navegador permita el autoplay (bug conocido, sobre todo en Safari/iOS).
  // Se fuerza de forma imperativa antes de llamar a play().
  useEffect(() => {
    if (!showVideo) return
    for (const ref of [videoRef, ambientRef]) {
      const v = ref.current
      if (!v) continue
      v.muted = true
      v.defaultMuted = true
      const playPromise = v.play()
      if (playPromise?.catch) {
        playPromise.catch(() => {
          if (ref === videoRef) {
            // Autoplay bloqueado por el navegador: se deja el fallback
            // visual (fondo marino) y no se interrumpe la experiencia.
            setVideoFailed(true)
          }
        })
      }
    }
  }, [showVideo])

  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: 'var(--navy)' }}>

        {/* Fondo — vídeo.
            Es un clip vertical (formato retrato). En móvil cubre toda la
            pantalla a sangre. En escritorio, para evitar tanto el recorte
            extremo de estirarlo a lo ancho como el efecto "tarjeta" de
            enmarcarlo con un borde duro, se usa el mismo tratamiento que
            Instagram/TikTok en web: una copia del vídeo, muy desenfocada y
            oscurecida, llena todo el fondo a modo ambiental (sin negro/marino
            vacío a los lados), y el vídeo nítido flota centrado por encima en
            su proporción real, sin borde — se funde con el ambiente. */}
        {showVideo && (
          <>
            {/* Ambiente — solo visible en escritorio (en móvil el vídeo nítido ya cubre todo) */}
            <video
              ref={ambientRef}
              src={cover.video}
              aria-hidden="true"
              autoPlay muted defaultMuted loop playsInline webkit-playsinline="true" preload="auto"
              className="hidden md:block absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 0, filter: 'blur(60px) saturate(1.15) brightness(0.55)', transform: 'scale(1.2)' }}
            />

            {/* Nítido — a sangre en móvil, centrado en su proporción real en escritorio */}
            <div className="absolute inset-0 md:flex md:items-center md:justify-center md:py-12" style={{ zIndex: 0 }}>
              <div className="absolute inset-0 md:relative md:inset-auto md:h-[82vh] md:max-h-[760px] md:aspect-[41/64] overflow-hidden md:shadow-[0_40px_100px_rgba(6,9,18,0.6)]">
                <video
                  ref={videoRef}
                  src={cover.video}
                  poster={cover.image || undefined}
                  autoPlay
                  muted
                  defaultMuted
                  loop
                  playsInline
                  webkit-playsinline="true"
                  preload="auto"
                  onError={() => setVideoFailed(true)}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </>
        )}

        {/* Velo cinematográfico (marino) para legibilidad */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            background:
              'linear-gradient(180deg, rgba(22,32,58,0.78) 0%, rgba(22,32,58,0.42) 32%, rgba(22,32,58,0.48) 62%, rgba(22,32,58,0.88) 100%)',
          }}
        />
        {/* Tinte de color para unificar con la paleta */}
        <div className="absolute inset-0" style={{ zIndex: 1, backgroundColor: 'rgba(30,42,68,0.20)', mixBlendMode: 'multiply' }} />

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center" style={{ zIndex: 2 }}>

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
            className="display" style={{ color: '#F7F3EA', fontSize: 'clamp(2.7rem, 10vw, 6.2rem)', letterSpacing: '0.05em', lineHeight: 1.04, textShadow: '0 2px 30px rgba(16,22,40,0.45)' }}
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
            style={{ border: '1px solid rgba(198,166,89,0.6)', color: '#F7F3EA', fontSize: '0.56rem', letterSpacing: '0.26em', minHeight: 46, padding: '0 34px', backdropFilter: 'blur(2px)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold-soft)'; e.currentTarget.style.backgroundColor = 'rgba(198,166,89,0.14)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(198,166,89,0.6)'; e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            Abrir
            <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} style={{ display: 'inline-block' }}>↓</motion.span>
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}
