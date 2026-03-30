import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowDown } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

export default function LandingPage() {
  const navigate = useNavigate()
  const { project } = useProject()
  const { lang, t } = useLang()
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: containerRef })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])

  const name        = lang === 'es' ? project.name        : project.nameEN
  const description = lang === 'es' ? project.description : project.descriptionEN

  return (
    <PageTransition>
      <div ref={containerRef} className="relative min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* Hero */}
        <div className="relative h-screen overflow-hidden flex items-end pb-12 sm:pb-20">
          {/* Background */}
          <motion.div className="absolute inset-0" style={{ y: bgY }}>
            <div
              className="w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url(${project.heroImage})`, backgroundColor: 'var(--color-bg-deep)' }}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(26,33,48,0.9) 0%, rgba(26,33,48,0.2) 50%, rgba(26,33,48,0.4) 100%)' }}
            />
          </motion.div>

          {/* Hero content */}
          <div className="relative z-10 px-4 sm:px-10 md:px-16 max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="label-luxury mb-4 sm:mb-5"
              style={{ color: 'var(--color-accent)' }}
            >
              {project.architect} — {project.subtitle}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="display-heading text-text mb-6 sm:mb-8"
              style={{ fontSize: 'clamp(2rem, 8vw, 6.5rem)', letterSpacing: 'clamp(0.02em, 1vw, 0.06em)' }}
            >
              {name?.toUpperCase()}
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 36 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="h-px mb-6 sm:mb-8"
              style={{ backgroundColor: 'var(--color-accent)' }}
            />

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.3 }}
              onClick={() => navigate('/map')}
              data-cursor="hover"
              className="label-luxury border transition-all duration-700 min-h-[44px] px-6 sm:px-8 flex items-center"
              style={{ borderColor: 'rgba(184,152,72,0.5)', color: 'var(--color-text)' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-accent)'
                e.currentTarget.style.backgroundColor = 'rgba(184,152,72,0.08)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(184,152,72,0.5)'
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
            >
              {t('cta_explore')}
            </motion.button>
          </div>

          {/* Scroll hint — hidden on small screens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="absolute bottom-6 right-4 sm:right-10 sm:bottom-10 hidden sm:flex flex-col items-center gap-3"
          >
            <span className="label-luxury" style={{ color: 'rgba(184,152,72,0.45)', fontSize: '0.5rem', writingMode: 'vertical-rl' }}>
              {t('scroll_hint')}
            </span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={12} color="rgba(184,152,72,0.45)" strokeWidth={1.5} />
            </motion.div>
          </motion.div>
        </div>

        {/* Description section */}
        <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-10 md:px-20" style={{ backgroundColor: 'var(--color-bg)' }}>
          <div className="max-w-xl">
            <p className="label-luxury mb-6 sm:mb-8" style={{ color: 'var(--color-accent)' }}>
              {project.subtitle}
            </p>
            <p className="font-sans font-light text-text/70" style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)', lineHeight: 1.9 }}>
              {description}
            </p>
            <div className="h-px mt-10 sm:mt-12 mb-8 sm:mb-12" style={{ width: 36, backgroundColor: 'var(--color-accent)', opacity: 0.5 }} />
            <button
              onClick={() => navigate('/map')}
              data-cursor="hover"
              className="label-luxury transition-colors duration-500 text-text/60 hover:text-accent min-h-[44px] flex items-center"
            >
              {t('cta_explore')} →
            </button>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
