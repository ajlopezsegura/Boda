import { useNavigate } from 'react-router-dom'
import PageTransition from '../components/layout/PageTransition'
import FloorPlanMap from '../components/map/FloorPlanMap'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'
import { ChevronLeft } from 'lucide-react'

export default function MapPage() {
  const { project } = useProject()
  const { lang } = useLang()
  const navigate = useNavigate()

  const name = lang === 'es' ? project.name : project.nameEN

  return (
    <PageTransition>
      <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>

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

        {/* Floor plan — grows to fill available space */}
        <div className="flex-1 min-h-0 flex items-center justify-center px-4 sm:px-8 py-6">
          <FloorPlanMap />
        </div>

        {/* Footer label */}
        <div className="flex-shrink-0 text-center pb-4">
          <p className="label-luxury" style={{ fontSize: '0.48rem', letterSpacing: '0.2em', color: 'rgba(184,152,72,0.35)' }}>
            {lang === 'es' ? 'PLANO ORIENTATIVO · SUJETO A CAMBIOS' : 'INDICATIVE PLAN · SUBJECT TO CHANGES'}
          </p>
        </div>
      </div>
    </PageTransition>
  )
}
