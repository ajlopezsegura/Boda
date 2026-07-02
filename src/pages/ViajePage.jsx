import { motion } from 'framer-motion'
import { Plane, TrainFront, Car, BedDouble, Bus, ArrowRight } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import wedding from '../data/wedding'

const ICONS = { Plane, TrainFront, Car }
const ease = [0.43, 0.13, 0.23, 0.96]

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-12 first:mt-0">
      <span className="h-px flex-1" style={{ backgroundColor: 'rgba(184,152,72,0.2)' }} />
      <span className="label-luxury text-accent" style={{ fontSize: '0.58rem', letterSpacing: '0.22em' }}>{children}</span>
      <span className="h-px flex-1" style={{ backgroundColor: 'rgba(184,152,72,0.2)' }} />
    </div>
  )
}

export default function ViajePage() {
  const { travel } = wedding

  return (
    <PageScaffold
      kicker="Origen → Destino"
      title="Viaje & alojamiento"
      subtitle="Venimos de sitios distintos, pero el destino es el mismo. Aquí tienes todo para llegar y quedarte a dormir."
    >
      {/* Route map */}
      <SectionLabel>Todos los caminos a Jaén</SectionLabel>
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
        {travel.origins.map((o, i) => (
          <motion.div
            key={o.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease }}
            className="flex flex-col items-center text-center px-5 py-4"
            style={{ border: '1px solid rgba(184,152,72,0.2)', minWidth: 130 }}
          >
            <span className="label-luxury text-accent" style={{ fontSize: '0.5rem', letterSpacing: '0.22em' }}>{o.code}</span>
            <span className="text-text mt-1" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.3rem', fontWeight: 500 }}>{o.now}</span>
            <span className="label-luxury mt-1" style={{ fontSize: '0.46rem', color: 'var(--color-text-muted)' }}>{o.label} · de {o.from}</span>
          </motion.div>
        ))}

        <ArrowRight size={20} style={{ color: 'var(--color-accent)' }} className="hidden sm:block" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.25, ease }}
          className="flex flex-col items-center text-center px-6 py-5"
          style={{ border: '1px solid var(--color-accent)', backgroundColor: 'rgba(184,152,72,0.07)', minWidth: 150 }}
        >
          <Plane size={16} style={{ color: 'var(--color-accent)' }} />
          <span className="text-text mt-1.5" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.4rem', fontWeight: 500 }}>{travel.destination.place}</span>
          <span className="label-luxury mt-1" style={{ fontSize: '0.46rem', color: 'var(--color-accent)' }}>{travel.destination.label}</span>
        </motion.div>
      </div>

      {/* Getting there */}
      <SectionLabel>Cómo llegar</SectionLabel>
      <div className="grid sm:grid-cols-3 gap-4">
        {travel.getting.map((g, i) => {
          const Icon = ICONS[g.icon] ?? Car
          return (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="p-5"
              style={{ border: '1px solid rgba(184,152,72,0.18)', backgroundColor: 'var(--color-bg-card)' }}
            >
              <Icon size={18} strokeWidth={1.3} style={{ color: 'var(--color-accent)' }} />
              <h3 className="text-text mt-3 mb-2" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem', fontWeight: 500 }}>{g.title}</h3>
              <p className="font-sans font-light" style={{ fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--color-text-muted)' }}>{g.text}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Shuttle */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-start gap-4 mt-6 p-5"
        style={{ border: '1px dashed rgba(184,152,72,0.35)' }}
      >
        <Bus size={18} strokeWidth={1.3} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <h3 className="label-luxury text-accent mb-1.5" style={{ fontSize: '0.58rem' }}>Autobús</h3>
          <p className="font-sans font-light" style={{ fontSize: '0.85rem', lineHeight: 1.75, color: 'var(--color-text-muted)' }}>{travel.shuttle}</p>
        </div>
      </motion.div>

      {/* Hotels */}
      <SectionLabel>Dónde dormir</SectionLabel>
      <div className="grid sm:grid-cols-3 gap-4">
        {travel.hotels.map((h, i) => (
          <motion.div
            key={h.name}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease }}
            className="p-5 flex flex-col gap-2"
            style={{ border: '1px solid rgba(184,152,72,0.18)' }}
          >
            <BedDouble size={16} strokeWidth={1.3} style={{ color: 'var(--color-accent)' }} />
            <h3 className="text-text" style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.2rem', fontWeight: 500 }}>{h.name}</h3>
            <span className="label-luxury" style={{ fontSize: '0.5rem', color: 'var(--color-accent)', letterSpacing: '0.14em' }}>{h.area}</span>
            <p className="font-sans font-light" style={{ fontSize: '0.8rem', lineHeight: 1.65, color: 'var(--color-text-muted)' }}>{h.note}</p>
            {h.url && (
              <a href={h.url} target="_blank" rel="noreferrer" data-cursor="hover"
                className="label-luxury mt-1 no-underline" style={{ fontSize: '0.5rem', color: 'var(--color-accent)' }}>
                Ver hotel →
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </PageScaffold>
  )
}
