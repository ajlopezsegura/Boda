import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import Countdown from '../components/brand/Countdown'
import { useLang } from '../i18n'

const ease = [0.22, 0.61, 0.36, 1]

export default function CoverPage() {
  const navigate = useNavigate()
  const { wedding } = useLang()
  const { couple, cover, dateShort, city } = wedding
  // El fondo de la portada tiene tres estados: el vídeo, la imagen animada de
  // recambio y, si tampoco carga, el papel liso.
  const [usarAnimada, setUsarAnimada] = useState(false)
  const [sinFondo, setSinFondo] = useState(false)

  const videoRef = useRef(null)
  const imgRef = useRef(null)
  const hayFondo = Boolean(cover.video) && !sinFondo
  const mostrarVideo = hayFondo && !usarAnimada

  /* El fondo no se muestra hasta que está listo de verdad: si no, la imagen
     animada arranca a trompicones mientras se descodifica. Mientras tanto gira
     un anillo, que solo asoma si la espera pasa de un suspiro. */
  const [listo, setListo] = useState(false)
  const [mostrarEspera, setMostrarEspera] = useState(false)

  useEffect(() => { setListo(false) }, [mostrarVideo])

  useEffect(() => {
    if (listo) { setMostrarEspera(false); return }
    const reloj = setTimeout(() => setMostrarEspera(true), 220)
    return () => clearTimeout(reloj)
  }, [listo])

  async function imagenCargada() {
    // decode() espera a tener los fotogramas descodificados, no solo bajados
    try { await imgRef.current?.decode?.() } catch { /* da igual: se muestra */ }
    setListo(true)
  }

  useEffect(() => {
    const v = videoRef.current
    if (!v || !mostrarVideo) return

    // React no siempre fija la propiedad DOM `muted` a tiempo para que el
    // navegador permita el autoplay (bug conocido, sobre todo en Safari/iOS).
    v.muted = true
    v.defaultMuted = true

    let cancelado = false
    const rendirse = () => {
      if (cancelado) return
      if (cover.videoAnimado) setUsarAnimada(true)
      else setSinFondo(true)
    }

    v.play?.()?.catch(rendirse)

    // El modo de bajo consumo de iOS no siempre rechaza la promesa: a veces la
    // resuelve y deja el vídeo congelado en el primer fotograma. Por eso, además
    // de escuchar el rechazo, se comprueba que de verdad haya echado a andar.
    const vigilante = setTimeout(() => {
      if (v.paused || (v.readyState >= 2 && v.currentTime === 0)) rendirse()
    }, 1200)

    return () => { cancelado = true; clearTimeout(vigilante) }
  }, [mostrarVideo, cover.videoAnimado])

  return (
    <PageTransition>
      {/* Móvil: vídeo a pantalla completa con el texto encima.
          Escritorio: papel a la izquierda con el texto, vídeo a sangre a la derecha. */}
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: 'var(--paper)' }}>

        {hayFondo && (
          <div
            className="absolute inset-0 overflow-hidden
                       md:inset-auto md:right-0 md:top-[var(--header-h)] md:bottom-0 md:w-[42vw] lg:w-[38vw]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: listo ? 1 : 0, scale: listo ? 1 : 1.04 }}
              transition={{ duration: 1.3, ease }}
              className="w-full h-full"
            >
              {mostrarVideo ? (
                <video
                  ref={videoRef}
                  src={cover.video}
                  poster={cover.image || undefined}
                  autoPlay muted defaultMuted loop playsInline webkit-playsinline="true" preload="auto"
                  onPlaying={() => setListo(true)}
                  onError={() => (cover.videoAnimado ? setUsarAnimada(true) : setSinFondo(true))}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  ref={imgRef}
                  src={cover.videoAnimado}
                  alt=""
                  aria-hidden="true"
                  onLoad={imagenCargada}
                  onError={() => setSinFondo(true)}
                  className="w-full h-full object-cover"
                />
              )}
            </motion.div>

            {!listo && mostrarEspera && (
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <i
                  className="giro block"
                  style={{
                    width: 26, height: 26, borderRadius: '50%',
                    border: '1px solid rgba(166,129,60,0.22)',
                    borderTopColor: 'var(--gold)',
                  }}
                />
              </span>
            )}
          </div>
        )}

        {/* Velo para legibilidad — solo en móvil, donde el texto va sobre el fondo */}
        {hayFondo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: listo ? 1 : 0 }}
            transition={{ duration: 1.3, ease }}
            className="absolute inset-0 md:hidden pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, rgba(18,26,44,0.60) 0%, rgba(18,26,44,0.46) 26%, rgba(18,26,44,0.62) 52%, rgba(18,26,44,0.58) 74%, rgba(18,26,44,0.82) 100%)',
            }}
          />
        )}

        {/* Texto. En móvil va en claro sobre el vídeo, así que espera al fondo:
            sobre el papel desnudo no se leería. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: !hayFondo || listo ? 1 : 0 }}
          transition={{ duration: 0.7, ease }}
          className="absolute inset-0 flex flex-col items-center text-center justify-center
                     px-8 sm:px-12 md:px-16 lg:px-24
                     pt-[var(--header-h)] md:pt-0
                     md:items-start md:text-left md:pr-[46vw] lg:pr-[42vw]"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="text-[#D9BE7A] md:text-[#A6813C]"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 'clamp(0.58rem, 1.6vw, 0.66rem)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
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
            className="text-[#F7F3EA] md:text-[#1E2A44]"
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontWeight: 400,
              fontSize: 'clamp(3rem, 7.5vw, 6.4rem)',
              lineHeight: 1.04,
              letterSpacing: '-0.005em',
              textShadow: '0 2px 24px rgba(14,20,36,0.32)',
            }}
          >
            {couple.bride}
            {/* Ampersand en redonda: la cursiva de EB Garamond usa un glifo
                caligráfico antiguo que desentona a este tamaño. */}
            <span className="text-[#D9BE7A] md:text-[#A6813C]" style={{ padding: '0 0.14em' }}>&amp;</span>
            {couple.groom}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
            className="text-[#D9BE7A] md:text-[#A6813C]"
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
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
            transition={{ duration: 0.9, delay: 0.85, ease }}
            className="text-[rgba(247,243,234,0.8)] md:text-[rgba(30,42,68,0.6)]"
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: '0.45rem',
            }}
          >
            {city}
          </motion.p>

          {/* Cuenta atrás y botón: mismo ancho, el que marque el botón */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease }}
            className="flex flex-col self-center md:self-start"
            style={{ width: 'fit-content', marginTop: 'clamp(2rem, 4.5vh, 3rem)' }}
          >
            <Countdown tone="cover" compact className="w-full" />

            <button
              onClick={() => navigate('/historia')}
              className="group inline-flex items-center justify-center gap-3
                         text-[#F7F3EA] md:text-[#1E2A44]
                         border border-[rgba(217,190,122,0.75)] md:border-[rgba(166,129,60,0.75)]
                         transition-colors duration-500
                         hover:bg-[rgba(217,190,122,0.14)] md:hover:bg-[rgba(166,129,60,0.10)]"
              style={{
                marginTop: 'clamp(1rem, 2.4vh, 1.5rem)',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '0.62rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                minHeight: 48,
                padding: '0 2.1rem',
              }}
            >
              {cover.cta}
              <span className="transition-transform duration-500 group-hover:translate-x-1 text-[#D9BE7A] md:text-[#A6813C]">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  )
}
