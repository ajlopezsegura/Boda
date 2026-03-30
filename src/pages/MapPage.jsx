import { motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import FloorPlanMap from '../components/map/FloorPlanMap'
import SpaceCard from '../components/map/SpaceCard'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

export default function MapPage() {
  const { project, spaces } = useProject()
  const { lang, t } = useLang()

  const sortedSpaces = [...spaces].sort((a, b) => a.order - b.order)
  const name = lang === 'es' ? project.name : project.nameEN

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-20" style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* Header */}
        <div className="text-center mb-14 px-6">
          <p className="label-luxury mb-4" style={{ color: 'var(--color-accent)' }}>
            {project.architect}
          </p>
          <h2
            className="display-heading text-text"
            style={{ fontSize: 'clamp(1.6rem, 4vw, 3rem)', letterSpacing: '0.10em' }}
          >
            {name.toUpperCase()}
          </h2>
          <div className="h-px mx-auto mt-6" style={{ width: 48, backgroundColor: 'var(--color-accent)' }} />
        </div>

        {/* Floor Plan */}
        <div className="px-6 mb-16">
          <FloorPlanMap />
          <p className="label-luxury text-center mt-4" style={{ color: 'var(--color-text-muted)', fontSize: '0.55rem' }}>
            {t('nav_map')}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-6 px-10 mb-10">
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(184,152,72,0.15)' }} />
          <p className="label-luxury" style={{ color: 'var(--color-text-muted)', fontSize: '0.6rem' }}>
            {t('rooms_title')}
          </p>
          <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(184,152,72,0.15)' }} />
        </div>

        {/* Space cards — horizontal scroll */}
        <div className="overflow-x-auto px-10">
          <div className="flex gap-6 pb-4" style={{ width: 'max-content' }}>
            {sortedSpaces.map((space, i) => (
              <SpaceCard key={space.id} space={space} index={i} />
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
