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
      <div className="min-h-screen bg-cream pt-24 pb-20">
        {/* Header */}
        <div className="text-center mb-14 px-6">
          <p className="label-luxury text-gold mb-4">{project.architect}</p>
          <h2
            className="font-serif italic font-light text-ink"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)', letterSpacing: '0.02em' }}
          >
            {name}
          </h2>
          <div className="gold-rule mx-auto mt-6" />
        </div>

        {/* Floor Plan */}
        <div className="px-6 mb-16">
          <FloorPlanMap />
          <p className="label-luxury text-ink/30 text-center mt-4" style={{ fontSize: '0.55rem' }}>
            {t('nav_map')}
          </p>
        </div>

        {/* Spaces divider */}
        <div className="flex items-center gap-6 px-10 mb-10">
          <div className="flex-1 h-px bg-sand" />
          <p className="label-luxury text-ink/40" style={{ fontSize: '0.6rem' }}>
            {t('rooms_title')}
          </p>
          <div className="flex-1 h-px bg-sand" />
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
