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
      <div className="min-h-screen pt-20 sm:pt-24 pb-16 sm:pb-20" style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 px-4">
          <p className="label-luxury mb-3 sm:mb-4" style={{ color: 'var(--color-accent)' }}>
            {project.architect}
          </p>
          <h2
            className="display-heading text-text"
            style={{ fontSize: 'clamp(1.3rem, 5vw, 3rem)', letterSpacing: 'clamp(0.06em, 2vw, 0.10em)' }}
          >
            {name?.toUpperCase()}
          </h2>
          <div className="h-px mx-auto mt-5 sm:mt-6" style={{ width: 36, backgroundColor: 'var(--color-accent)' }} />
        </div>

        {/* Floor Plan */}
        <div className="px-4 sm:px-6 mb-12 sm:mb-16">
          <FloorPlanMap />
          {/* Only show label if floor plan exists */}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 sm:gap-6 px-4 sm:px-10 mb-8 sm:mb-10">
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(184,152,72,0.15)' }} />
          <p className="label-luxury whitespace-nowrap" style={{ color: 'var(--color-text-muted)', fontSize: '0.6rem' }}>
            {t('rooms_title')}
          </p>
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(184,152,72,0.15)' }} />
        </div>

        {/* Space cards — horizontal scroll */}
        <div className="overflow-x-auto px-4 sm:px-10" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="flex gap-4 sm:gap-6 pb-4">
            {sortedSpaces.map((space, i) => (
              <SpaceCard key={space.id} space={space} index={i} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
