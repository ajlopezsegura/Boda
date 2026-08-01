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
                       left-0 right-0 bottom-0 h-[46vh]
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
          </motion.div>
        )}

        {/* Texto — alineado a la izquierda, con aire generoso */}
        <div
          className="absolute inset-0 flex flex-col justify-center
                     px-8 sm:px-12 md:px-16 lg:px-24
                     pb-[46vh] md:pb-0 md:pr-[46vw] lg:md:pr-[42vw]"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.66rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 'clamp(1.6rem, 4vh, 2.6rem)',
            }}
          >
            {cover.passportSub}
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

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.78, ease }}
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--ink-muted)',
              marginTop: '0.85rem',
            }}
          >
            {city}
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.05 }}
            onClick={() => navigate('/historia')}
            className="group self-start flex items-center gap-3"
            style={{
              marginTop: 'clamp(2.4rem, 6vh, 3.6rem)',
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
            Ver la invitación
            <span className="transition-transform duration-500 group-hover:translate-x-1" style={{ color: 'var(--gold)' }}>→</span>
          </motion.button>
        </div>
      </div>
    </PageTransition>
  )
}
