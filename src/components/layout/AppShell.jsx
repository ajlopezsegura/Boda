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

  const name = lang === 'es' ? project.name : project.nameEN

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
      style={{
        backgroundColor: scrolled ? 'rgba(245,240,232,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        transition: 'background-color 0.6s ease, backdrop-filter 0.6s ease',
        borderBottom: scrolled ? '1px solid rgba(200,160,122,0.2)' : 'none',
      }}
    >
      {/* Project name / home link */}
      <Link
        to="/home"
        data-cursor="hover"
        className="label-luxury text-ink hover:text-gold transition-colors duration-500 no-underline"
      >
        {name}
      </Link>

      {/* Nav + lang toggle */}
      <div className="flex items-center gap-8">
        {location.pathname !== '/map' && (
          <Link
            to="/map"
            data-cursor="hover"
            className="label-luxury text-ink hover:text-gold transition-colors duration-500 no-underline"
          >
            {t('nav_map')}
          </Link>
        )}
        <LangToggle />
      </div>
    </motion.header>
  )
}
