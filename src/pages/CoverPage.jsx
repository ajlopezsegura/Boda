import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

export default function CoverPage() {
  const navigate = useNavigate()
  const { project } = useProject()
  const { lang } = useLang()
  const [videoFailed, setVideoFailed] = useState(false)

  const name = lang === 'es' ? project.name : project.nameEN
  const showVideo = project.heroVideo && !videoFailed

  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-hidden">

        {/* Background — video or image */}
        {showVideo ? (
          <video
            src={project.heroVideo}
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setVideoFailed(true)}
          />
        ) : (
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: `url(${project.heroImage})` }}
          />
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(26,33,48,0.25) 0%, rgba(26,33,48,0.55) 60%, rgba(26,33,48,0.80) 100%)' }}
        />

        {/* Content — centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">

          {/* Studio name — very subtle top */}
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="label-luxury mb-8 sm:mb-12"
            style={{ color: 'rgba(184,152,72,0.9)', fontSize: '0.6rem', letterSpacing: '0.25em', fontWeight: 700 }}
          >
            THE VISUALS BOUTIQUE·STUDIO
          </motion.p>

          {/* Project name — large */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="display-heading text-text"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)', letterSpacing: 'clamp(0.06em, 2vw, 0.14em)', lineHeight: 1 }}
          >
            {name?.toUpperCase()}
          </motion.h1>

          {/* Decorative rule */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 56 }}
            transition={{ duration: 0.9, delay: 1.3, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="h-px my-6 sm:my-8"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />

          {/* Location + year */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="label-luxury text-text/60"
            style={{ fontSize: '0.65rem', letterSpacing: '0.22em' }}
          >
            {project.subtitle}
          </motion.p>

          {/* CTA */}
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.0 }}
            onClick={() => navigate('/proyecto')}
            data-cursor="hover"
            className="mt-12 sm:mt-16 label-luxury border transition-all duration-700 min-h-[44px] px-8 flex items-center gap-3"
            style={{ borderColor: 'rgba(184,152,72,0.45)', color: 'var(--color-text)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'rgba(184,152,72,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,152,72,0.45)'; e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            {lang === 'es' ? 'Explorar' : 'Explore'}
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
