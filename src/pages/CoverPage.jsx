import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import wedding from '../data/wedding'

const ease = [0.22, 0.61, 0.36, 1]

export default function CoverPage() {
  const navigate = useNavigate()
  const { couple, cover, dateShort, city } = wedding
  const [videoFailed, setVideoFailed] = useState(false)
  const videoRef = useRef(null)

  const showVideo = cover.video && !videoFailed

  // React no siempre fija la propiedad DOM `muted` a tiempo para que el
  // navegador permita el autoplay (bug conocido, sobre todo en Safari/iOS).
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.play?.()?.catch(() => setVideoFailed(true))
  }, [showVideo])

  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: 'var(--paper)' }}>

        {/* Retrato — a sangre en el borde derecho (escritorio) / abajo (móvil) */}
        {showVideo && (
          <motion.div
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease }}
            className="absolute overflow-hidden
                       left-0 right-0 bottom-0 h-[48vh]
                       md:left-auto md:top-[var(--header-h)] md:bottom-0 md:h-auto md:w-[42vw] lg:w-[38vw]"
          >
            <video
              ref={videoRef}
              src={cover.video}
              poster={cover.image || undefined}
              autoPlay muted defaultMuted loop playsInline webkit-playsinline="true" preload="auto"
              onError={() => setVideoFailed(true)}
              className="w-full h-full object-cover"
            />
            {/* Fundido del papel hacia la imagen — evita el corte seco en móvil */}
            <div
              className="md:hidden absolute inset-x-0 top-0 pointer-events-none"
              style={{ height: 64, background: 'linear-gradient(to bottom, var(--paper) 0%, rgba(244,240,231,0.55) 45%, transparent 100%)' }}
            />
          </motion.div>
        )}

        {/* Texto — centrado en móvil, alineado a la izquierda en escritorio */}
        <div
          className="absolute inset-0 flex flex-col items-center text-center justify-end
                     md:items-start md:text-left md:justify-center
                     px-8 sm:px-12 md:px-16 lg:px-24
                     pb-[calc(48vh+2.25rem)] md:pb-0 md:pr-[46vw] lg:md:pr-[42vw]"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(0.58rem, 1.6vw, 0.66rem)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 'clamp(1.4rem, 3vh, 2.2rem)',
              maxWidth: '30ch',
              lineHeight: 1.9,
              textWrap: 'balance',
            }}
          >
            {cover.welcome}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease }}
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontWeight: 400,
              color: 'var(--navy)',
              fontSize: 'clamp(3rem, 7.5vw, 6.4rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.005em',
            }}
          >
            {couple.bride}
            <span style={{ color: 'var(--gold)', fontStyle: 'italic', padding: '0 0.12em' }}>&amp;</span>
            {couple.groom}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              color: 'var(--gold)',
              fontSize: 'clamp(1.15rem, 2vw, 1.5rem)',
              letterSpacing: '0.06em',
              marginTop: 'clamp(1.6rem, 4vh, 2.4rem)',
            }}
          >
            {dateShort.replace(/\s/g, '')}
          </motion.p>

          {/* Ruta de vuelo: nodo · línea de puntos · nodo — la firma del viaje */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.4 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.9, ease }}
            aria-hidden="true"
            className="flex items-center gap-2"
            style={{ marginTop: '1.1rem', color: 'var(--gold)', transformOrigin: 'center' }}
          >
            <span style={{ width: 5, height: 5, borderRadius: '50%', border: '1px solid currentColor' }} />
            <span style={{ width: 88, height: 1, backgroundColor: 'currentColor', opacity: 0.55 }} />
            <span style={{ width: 5, height: 5, borderRadius: '50%', border: '1px solid currentColor' }} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease }}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
              marginTop: '1.1rem',
            }}
          >
            {city}
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.25 }}
            onClick={() => navigate('/historia')}
            className="group self-center md:self-start flex items-center gap-3"
            style={{
              marginTop: 'clamp(2.2rem, 5vh, 3.4rem)',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--navy)',
              paddingBottom: 6,
              borderBottom: '1px solid var(--gold)',
              minHeight: 44,
            }}
          >
            {cover.cta}
            <span className="transition-transform duration-500 group-hover:translate-x-1" style={{ color: 'var(--gold)' }}>→</span>
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}
