import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useProject } from '../../context/ProjectContext'
import { useLang } from '../../context/LangContext'
import LangToggle from '../ui/LangToggle'

export default function AppShell() {
  const { project } = useProject()
  const { lang, t } = useLang()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 20) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const projectName = lang === 'es' ? project.name : project.nameEN

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{
        backgroundColor: scrolled ? 'rgba(37,45,58,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'background-color 0.6s ease, backdrop-filter 0.6s ease',
        borderBottom: scrolled ? '1px solid rgba(184,152,72,0.15)' : 'none',
      }}
    >
      {/* Left: Studio name + project name */}
      <Link to="/home" data-cursor="hover" className="no-underline flex flex-col gap-0.5">
        <span
          className="display-heading text-text"
          style={{ fontSize: '0.75rem', letterSpacing: '0.14em' }}
        >
          THE VISUALS
        </span>
        <span className="label-luxury text-accent" style={{ fontSize: '0.5rem', letterSpacing: '0.22em' }}>
          BOUTIQUE·STUDIO
        </span>
      </Link>

      {/* Center: Project name (hidden on small screens) */}
      <div className="hidden md:flex flex-col items-center gap-0.5">
        <span className="label-luxury text-text/50" style={{ fontSize: '0.55rem' }}>
          {projectName}
        </span>
      </div>

      {/* Right: Nav + lang toggle */}
      <div className="flex items-center gap-8">
        {location.pathname !== '/map' && (
          <Link
            to="/map"
            data-cursor="hover"
            className="label-luxury text-text/60 hover:text-accent transition-colors duration-500 no-underline"
          >
            {t('nav_map')}
          </Link>
        )}
        <LangToggle />
      </div>
    </motion.header>
  )
}
