import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'
import { ChevronLeft } from 'lucide-react'

// Cache-bust query so stale CDN copies of the previous svg can't win.
const FALLBACK_PLAN = './assets/images/plano-edificio.webp?v=2'

export default function MapPage() {
  const { project } = useProject()
  const { lang } = useLang()
  const navigate = useNavigate()

  if (!project) return null

  const name     = lang === 'es' ? project.name : project.nameEN
  const planSrc  = project.floorPlan?.src ?? FALLBACK_PLAN

  return (
    <PageTransition>
      <div className="absolute inset-0 flex flex-col overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 sm:px-10 py-4"
          style={{ borderBottom: '1px solid rgba(184,152,72,0.12)' }}>
          <button onClick={() => navigate(-1)} data-cursor="hover"
            className="flex items-center gap-2 label-luxury transition-colors duration-300"
            style={{ color: 'rgba(244,241,234,0.45)', fontSize: '0.6rem' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,241,234,0.45)'}>
            <ChevronLeft size={14} />
            {lang === 'es' ? 'Volver' : 'Back'}
          </button>
          <span className="label-luxury text-text/40 hidden sm:block" style={{ fontSize: '0.55rem' }}>
            {name?.toUpperCase()} · {lang === 'es' ? 'PLANO GENERAL' : 'FLOOR PLAN'}
          </span>
          <div style={{ width: 60 }} />
        </div>

        {/* Floor plan image */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 min-h-0 flex items-center justify-center px-4 sm:px-10 py-6">
          <img
            src={planSrc}
            alt={lang === 'es' ? 'Plano general' : 'Floor plan'}
            className="w-full h-full object-contain select-none"
            style={{ maxHeight: '100%', maxWidth: '100%' }}
            draggable={false}
          />
        </motion.div>

        {/* Footer */}
        <div className="flex-shrink-0 text-center pb-4">
          <p className="label-luxury" style={{ fontSize: '0.48rem', letterSpacing: '0.2em', color: 'rgba(184,152,72,0.3)' }}>
            {lang === 'es' ? 'PLANO ORIENTATIVO · SUJETO A CAMBIOS' : 'INDICATIVE PLAN · SUBJECT TO CHANGES'}
          </p>
        </div>
      </div>
    </PageTransition>
  )
}
