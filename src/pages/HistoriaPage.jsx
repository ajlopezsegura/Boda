import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import { useLang } from '../i18n'

const ease = [0.22, 0.61, 0.36, 1]

/* Cada momento ocupa la pantalla completa y encaja al deslizar (scroll-snap).
   La foto entra con un zoom lento y el texto sube escalonado detrás. */

function Plate({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.55 }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

function Stop({ s }) {
  return (
    <section
      className="relative w-full shrink-0 overflow-hidden flex items-start justify-center px-8 sm:px-12"
      style={{ height: '100%', scrollSnapAlign: 'start', scrollSnapStop: 'always', paddingTop: 'clamp(2rem, 6vh, 3.5rem)' }}
    >
      {s.photo && (
        <motion.img
          src={s.photo}
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ amount: 0.55 }}
          transition={{ duration: 7, ease }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Velo para que el texto se lea sobre la imagen */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(18,26,42,0.80) 0%, rgba(18,26,42,0.68) 26%, rgba(18,26,42,0.28) 48%, rgba(18,26,42,0.14) 68%, rgba(18,26,42,0.42) 100%)',
        }}
      />

      <div className="relative text-center" style={{ maxWidth: '34rem' }}>
        <Plate delay={0.15}>
          <span
            style={{
              display: 'block',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--gold-soft)',
            }}
          >
            {s.place}
          </span>
        </Plate>

        <Plate delay={0.3}>
          <h2
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              fontWeight: 400,
              color: '#F7F3EA',
              fontSize: 'clamp(2.1rem, 6.4vw, 3.4rem)',
              lineHeight: 1.1,
              marginTop: '0.85rem',
              textShadow: '0 2px 26px rgba(14,20,36,0.4)',
            }}
          >
            {s.title}
          </h2>
        </Plate>

        <Plate delay={0.45}>
          <p
            style={{
              fontFamily: '"EB Garamond", Georgia, serif',
              color: 'rgba(247,243,234,0.88)',
              fontSize: 'clamp(1.05rem, 2.4vw, 1.22rem)',
              lineHeight: 1.75,
              marginTop: '1.15rem',
            }}
          >
            {s.text}
          </p>
        </Plate>
      </div>
    </section>
  )
}

export default function HistoriaPage() {
  const navigate = useNavigate()
  const { wedding, t } = useLang()
  const { story } = wedding
  const reelRef = useRef(null)
  const [active, setActive] = useState(0)

  const total = story.stamps.length + 2 // portadilla + escalas + cierre

  useEffect(() => {
    const reel = reelRef.current
    if (!reel) return
    const panels = [...reel.children]
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(panels.indexOf(e.target))
        })
      },
      { root: reel, threshold: 0.55 }
    )
    panels.forEach(p => io.observe(p))
    return () => io.disconnect()
  }, [])

  const onPaper = active === 0 || active === total - 1

  return (
    <PageTransition>
      <div className="absolute inset-0" style={{ paddingTop: 'var(--header-h)', backgroundColor: 'var(--paper)' }}>
        {/* Riel de progreso: cuántas paradas hay y en cuál vas */}
        <div
          aria-hidden="true"
          className="fixed z-20 flex flex-col"
          style={{ top: '50%', right: 'clamp(0.7rem, 2vw, 1.4rem)', transform: 'translateY(-50%)', gap: '0.55rem' }}
        >
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 1,
                height: i === active ? 30 : 16,
                backgroundColor:
                  i === active
                    ? (onPaper ? 'var(--gold)' : 'var(--gold-soft)')
                    : (onPaper ? 'rgba(166,129,60,0.35)' : 'rgba(166,129,60,0.5)'),
                transition: 'height 0.45s ease, background-color 0.45s ease',
              }}
            />
          ))}
        </div>

        <div
          ref={reelRef}
          className="h-full overflow-y-auto"
          style={{ scrollSnapType: 'y mandatory', scrollbarWidth: 'none' }}
        >
          {/* Portadilla */}
          <section
            className="relative w-full shrink-0 flex flex-col items-center justify-center text-center px-8 sm:px-12"
            style={{ height: '100%', scrollSnapAlign: 'start', scrollSnapStop: 'always', backgroundColor: 'var(--paper)' }}
          >
            <Plate>
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                }}
              >
                {t.diary}
              </span>
            </Plate>

            <Plate delay={0.14}>
              <h1
                style={{
                  fontFamily: '"EB Garamond", Georgia, serif',
                  fontWeight: 400,
                  color: 'var(--navy)',
                  fontSize: 'clamp(2.7rem, 9vw, 5rem)',
                  lineHeight: 1.04,
                  marginTop: '1.5rem',
                }}
              >
                {t.ourStory}
              </h1>
            </Plate>

            <Plate delay={0.28}>
              <p
                style={{
                  fontFamily: '"EB Garamond", Georgia, serif',
                  fontSize: 'clamp(1.08rem, 2.4vw, 1.3rem)',
                  lineHeight: 1.8,
                  color: 'var(--ink-muted)',
                  maxWidth: '40ch',
                  marginTop: '1.8rem',
                }}
              >
                {story.intro}
              </p>
            </Plate>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute flex flex-col items-center"
              style={{ bottom: 'clamp(1.6rem, 5vh, 2.6rem)', gap: '0.55rem' }}
            >
              <motion.i
                animate={{ y: [0, 7, 0], opacity: [0.35, 1, 0.35] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ display: 'block', width: 1, height: 34, backgroundColor: 'var(--gold)' }}
              />
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.52rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                }}
              >
                {t.swipe}
              </span>
            </motion.span>
          </section>

          {/* Escalas */}
          {story.stamps.map(s => (
            <Stop key={s.year + s.title} s={s} />
          ))}

          {/* Cierre — siguiente parada */}
          <section
            className="relative w-full shrink-0 flex flex-col items-center justify-center text-center px-8"
            style={{ height: '100%', scrollSnapAlign: 'start', scrollSnapStop: 'always', backgroundColor: 'var(--paper-deep)' }}
          >
            <Plate>
              <span
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                }}
              >
                {t.nextStop}
              </span>
            </Plate>

            <Plate delay={0.14}>
              <h2
                style={{
                  fontFamily: '"EB Garamond", Georgia, serif',
                  fontWeight: 400,
                  color: 'var(--navy)',
                  fontSize: 'clamp(2.2rem, 7vw, 3.4rem)',
                  lineHeight: 1.1,
                  marginTop: '1.1rem',
                }}
              >
                {t.titles.dia.join('')}
              </h2>
            </Plate>

            <Plate delay={0.3}>
              <button
                type="button"
                onClick={() => navigate('/dia')}
                className="inline-flex items-center justify-center gap-3 transition-colors duration-500 hover:bg-[rgba(166,129,60,0.1)]"
                style={{
                  marginTop: '2.1rem',
                  minHeight: 48,
                  padding: '0 2.1rem',
                  border: '1px solid rgba(166,129,60,0.75)',
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '0.62rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--navy)',
                }}
              >
                {t.continue}
                <span style={{ color: 'var(--gold)' }}>→</span>
              </button>
            </Plate>
          </section>
        </div>
      </div>
    </PageTransition>
  )
}
