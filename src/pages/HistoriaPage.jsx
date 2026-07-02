import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import wedding from '../data/wedding'

const ease = [0.43, 0.13, 0.23, 0.96]

function Stamp({ stamp, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease }}
      className="relative flex gap-5 sm:gap-8 pb-10 sm:pb-12"
    >
      {/* Rail */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 64 }}>
        <div
          className="flex items-center justify-center"
          style={{
            width: 60, height: 60, borderRadius: '50%',
            border: '1px dashed rgba(184,152,72,0.55)',
            color: 'var(--color-accent)',
            transform: 'rotate(-8deg)',
            fontFamily: '"Cormorant Garamond", serif',
          }}
        >
          <span style={{ fontSize: '1rem', fontWeight: 600 }}>{stamp.year}</span>
        </div>
        <div className="flex-1 w-px mt-3" style={{ backgroundColor: 'rgba(184,152,72,0.2)', minHeight: 40 }} />
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={11} style={{ color: 'var(--color-accent)' }} />
          <span className="label-luxury text-accent" style={{ fontSize: '0.55rem', letterSpacing: '0.2em' }}>
            {stamp.place}
          </span>
        </div>
        <h3 className="text-text mb-2" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', fontWeight: 500 }}>
          {stamp.title}
        </h3>
        <p className="font-sans font-light" style={{ fontSize: '0.92rem', lineHeight: 1.85, color: 'var(--color-text-muted)' }}>
          {stamp.text}
        </p>
      </div>
    </motion.div>
  )
}

export default function HistoriaPage() {
  const { story } = wedding
  return (
    <PageScaffold kicker="Nuestro pasaporte" title="Nuestra historia" subtitle={story.intro} maxWidth={720}>
      <div className="mt-4">
        {story.stamps.map((s, i) => (
          <Stamp key={s.year + s.title} stamp={s} index={i} />
        ))}
      </div>
    </PageScaffold>
  )
}
