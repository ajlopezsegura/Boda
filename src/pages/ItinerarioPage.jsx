import { motion } from 'framer-motion'
import { MapPin, Plane } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import wedding from '../data/wedding'

const ease = [0.43, 0.13, 0.23, 0.96]

function BoardingCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.05, ease }}
      className="relative flex overflow-hidden"
      style={{ border: '1px solid rgba(184,152,72,0.22)', backgroundColor: 'var(--color-bg-card)' }}
    >
      {/* Stub */}
      <div
        className="flex-shrink-0 flex flex-col items-center justify-center px-4 sm:px-6 py-6"
        style={{ backgroundColor: 'var(--color-bg-deep)', borderRight: '1px dashed rgba(184,152,72,0.35)', minWidth: 96 }}
      >
        <span className="label-luxury text-accent" style={{ fontSize: '0.5rem', letterSpacing: '0.24em' }}>
          {item.code}
        </span>
        <span className="text-text mt-1" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.6rem', lineHeight: 1, fontWeight: 500 }}>
          {item.time}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 px-5 sm:px-7 py-5">
        <h3 className="text-text mb-2" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(1.2rem, 4vw, 1.55rem)', fontWeight: 500 }}>
          {item.title}
        </h3>
        <div className="flex items-center gap-1.5 mb-2.5">
          <MapPin size={11} style={{ color: 'var(--color-accent)' }} />
          <span className="label-luxury" style={{ fontSize: '0.53rem', color: 'var(--color-text-muted)', letterSpacing: '0.14em' }}>
            {item.place} · {item.location}
          </span>
        </div>
        <p className="font-sans font-light" style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(244,241,234,0.55)' }}>
          {item.note}
        </p>
      </div>
    </motion.div>
  )
}

export default function ItinerarioPage() {
  return (
    <PageScaffold
      kicker="Boarding pass"
      title="El gran día"
      subtitle="Este es el itinerario de vuelo. Guarda tu tarjeta de embarque y no te saltes ninguna escala."
      maxWidth={760}
    >
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className="label-luxury text-accent" style={{ fontSize: '0.55rem' }}>{wedding.dateShort}</span>
        <Plane size={13} style={{ color: 'var(--color-accent)' }} />
        <span className="label-luxury" style={{ fontSize: '0.55rem', color: 'var(--color-text-muted)' }}>{wedding.city}</span>
      </div>

      <div className="flex flex-col gap-4">
        {wedding.itinerary.map((item, i) => (
          <BoardingCard key={item.code + item.time} item={item} index={i} />
        ))}
      </div>
    </PageScaffold>
  )
}
