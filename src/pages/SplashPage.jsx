import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

export default function SplashPage() {
  const navigate = useNavigate()
  const { project } = useProject()
  const { lang } = useLang()
  const name = lang === 'es' ? project.name : project.nameEN

  useEffect(() => {
    const timer = setTimeout(() => navigate('/home'), 3600)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ backgroundColor: '#0E0C0A' }}
      onClick={() => navigate('/home')}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.4 }}
        className="text-center"
      >
        <p
          className="font-serif italic font-light"
          style={{
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
            color: '#F5F0E8',
            letterSpacing: '0.06em',
            lineHeight: 1.2,
          }}
        >
          {name}
        </p>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 1.0, ease: [0.43, 0.13, 0.23, 0.96], delay: 1.2 }}
          className="h-px bg-gold mx-auto mt-8"
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="label-luxury mt-8"
          style={{ color: '#C8A07A', fontSize: '0.6rem' }}
        >
          {project.subtitle}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
