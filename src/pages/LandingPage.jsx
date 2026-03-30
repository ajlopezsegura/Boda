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
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const name = lang === 'es' ? project.name : project.nameEN
  const description = lang === 'es' ? project.description : project.descriptionEN

  return (
    <PageTransition>
      <div ref={containerRef} className="relative min-h-screen">
        {/* Hero */}
        <div className="relative h-screen overflow-hidden flex items-center justify-center">
          {/* Background image with parallax */}
          <motion.div
            className="absolute inset-0"
            style={{ y: bgY }}
          >
            <div
              className="w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${project.heroImage})`,
                backgroundColor: '#2A2318',
              }}
            />
            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, rgba(26,23,20,0.3) 0%, rgba(26,23,20,0.15) 40%, rgba(26,23,20,0.5) 100%)' }}
            />
          </motion.div>

          {/* Hero content */}
          <div className="relative z-10 text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="label-luxury mb-6"
              style={{ color: 'rgba(200,160,122,0.9)' }}
            >
              {project.architect} — {project.subtitle}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="font-serif italic font-light"
              style={{
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                color: '#F5F0E8',
                lineHeight: 1.05,
                letterSpacing: '0.02em',
              }}
            >
              {name}
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 48 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="h-px bg-gold mx-auto my-8"
            />

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              onClick={() => navigate('/map')}
              data-cursor="hover"
              className="label-luxury px-10 py-4 border border-gold/60 hover:border-gold text-cream hover:bg-gold/10 transition-all duration-700"
              style={{ letterSpacing: '0.18em' }}
            >
              {t('cta_explore')}
            </motion.button>
          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          >
            <span className="label-luxury" style={{ color: 'rgba(200,160,122,0.6)', fontSize: '0.55rem' }}>
              {t('scroll_hint')}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowDown size={14} color="rgba(200,160,122,0.6)" strokeWidth={1} />
            </motion.div>
          </motion.div>
        </div>

        {/* Project description section */}
        <section className="bg-cream py-32 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <p className="label-luxury text-gold mb-8">{project.subtitle}</p>
            <p
              className="font-serif font-light text-ink/75"
              style={{ fontSize: '1.25rem', lineHeight: 1.9 }}
            >
              {description}
            </p>
            <div className="gold-rule mx-auto mt-12 mb-12" />
            <button
              onClick={() => navigate('/map')}
              data-cursor="hover"
              className="label-luxury text-ink hover:text-gold transition-colors duration-500"
            >
              {t('cta_explore')} →
            </button>
          </div>
        </section>
      </div>
    </PageTransition>
  )
}
