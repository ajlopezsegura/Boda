import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import FloorPlanMap from '../components/map/FloorPlanMap'
import SpaceCard from '../components/map/SpaceCard'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

export default function MapPage() {
  const { project, spaces } = useProject()
  const { lang, t } = useLang()

  const sortedSpaces = spaces ? [...spaces].sort((a, b) => a.order - b.order) : []
  const name = lang === 'es' ? project.name : project.nameEN

  return (
    <PageTransition>
      <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* Header */}
        <div className="flex-shrink-0 text-center pt-16 sm:pt-20 pb-4 sm:pb-6 px-4">
          <p className="label-luxury mb-2" style={{ color: 'var(--color-accent)' }}>
            {project.architect}
          </p>
          <h2 className="display-heading text-text"
            style={{ fontSize: 'clamp(1.1rem, 4vw, 2.2rem)', letterSpacing: 'clamp(0.06em, 2vw, 0.10em)' }}>
            {name?.toUpperCase()}
          </h2>
          <div className="h-px mx-auto mt-4" style={{ width: 36, backgroundColor: 'var(--color-accent)' }} />
        </div>

        {/* Floor plan — grows to fill available space */}
        <div className="flex-1 min-h-0 px-4 sm:px-6 py-2 sm:py-4">
          <FloorPlanMap />
        </div>

        {/* Divider */}
        <div className="flex-shrink-0 flex items-center gap-3 px-4 sm:px-8 py-2">
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(184,152,72,0.15)' }} />
          <p className="label-luxury whitespace-nowrap" style={{ color: 'var(--color-text-muted)', fontSize: '0.6rem' }}>
            {t('rooms_title')}
          </p>
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(184,152,72,0.15)' }} />
        </div>

        {/* Space cards — fixed height strip at bottom */}
        <div className="flex-shrink-0 overflow-x-auto px-4 sm:px-8 pb-4 sm:pb-6"
          style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex gap-3 sm:gap-5">
            {sortedSpaces.map((space, i) => (
              <SpaceCard key={space.id} space={space} index={i} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
