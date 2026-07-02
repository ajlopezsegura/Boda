import { motion } from 'framer-motion'
import { Plane, TrainFront, Car, BedDouble, Bus, ArrowUpRight } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import { SectionLabel } from '../components/brand/decor'
import wedding from '../data/wedding'

const ICONS = { Plane, TrainFront, Car }
const ease = [0.43, 0.13, 0.23, 0.96]

function OriginNode({ o }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="data" style={{ color: 'var(--gold)', fontSize: '0.62rem' }}>{o.code}</span>
      <span className="display" style={{ color: 'var(--navy)', fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', lineHeight: 1.1, marginTop: 2 }}>{o.now}</span>
      <span className="eyebrow" style={{ color: 'var(--ink-faint)', fontSize: '0.44rem', marginTop: 4 }}>{o.label} · {o.from}</span>
    </div>
  )
}

export default function ViajePage() {
  const { travel } = wedding
  const dest = travel.destination

  return (
    <PageScaffold
      eyebrow="Origen · Destino"
      title="El viaje"
      subtitle="Venimos de sitios distintos, pero el destino es el mismo. Todo lo que necesitas para llegar y quedarte."
    >
      {/* Ruta */}
      <div className="relative mb-6 py-10 px-4" style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--paper-deep)' }}>
        <div className="flex items-center justify-between gap-4 max-w-2xl mx-auto">
          <div className="flex flex-col gap-6">
            {travel.origins.map(o => <OriginNode key={o.code} o={o} />)}
          </div>

          {/* Línea de puntos + avión */}
          <div className="flex-1 relative flex items-center justify-center" style={{ minWidth: 60 }}>
            <div style={{ height: 1, width: '100%', backgroundImage: 'radial-gradient(var(--gold) 1px, transparent 1px)', backgroundSize: '7px 1px', opacity: 0.7 }} />
            <motion.div
              initial={{ x: '-40%', opacity: 0 }}
              whileInView={{ x: '30%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease }}
              className="absolute"
              style={{ color: 'var(--gold)' }}
            >
              <Plane size={20} />
            </motion.div>
          </div>

          {/* Destino */}
          <div className="flex flex-col items-center text-center flex-shrink-0 px-4 py-3" style={{ border: '1px solid var(--gold)' }}>
            <span className="data" style={{ color: 'var(--gold)', fontSize: '0.6rem' }}>{dest.code}</span>
            <span className="display" style={{ color: 'var(--navy)', fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', lineHeight: 1.1, marginTop: 2 }}>{dest.place}</span>
            <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.44rem', marginTop: 4 }}>{dest.label}</span>
          </div>
        </div>
      </div>

      {/* Cómo llegar */}
      <div className="mt-14"><SectionLabel>Cómo llegar</SectionLabel></div>
      <div className="grid sm:grid-cols-3 gap-4 mt-7">
        {travel.getting.map((g, i) => {
          const Icon = ICONS[g.icon] ?? Car
          return (
            <motion.div key={g.title}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
              className="p-6" style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--paper-deep)' }}>
              <Icon size={19} strokeWidth={1.3} style={{ color: 'var(--gold)' }} />
              <h3 className="display mt-3 mb-2" style={{ color: 'var(--navy)', fontSize: '1.35rem' }}>{g.title}</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: 'var(--ink-muted)' }}>{g.text}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Autobús */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="flex items-start gap-4 mt-6 p-6" style={{ border: '1px solid var(--hairline)' }}>
        <Bus size={19} strokeWidth={1.3} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }} />
        <div>
          <h3 className="eyebrow mb-2" style={{ color: 'var(--gold)' }}>Autobús</h3>
          <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>{travel.shuttle}</p>
        </div>
      </motion.div>

      {/* Alojamiento */}
      <div className="mt-14"><SectionLabel>Dónde dormir</SectionLabel></div>
      <div className="grid sm:grid-cols-3 gap-4 mt-7">
        {travel.hotels.map((h, i) => (
          <motion.div key={h.name}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08, ease }}
            className="p-6 flex flex-col gap-2" style={{ border: '1px solid var(--hairline)' }}>
            <BedDouble size={17} strokeWidth={1.3} style={{ color: 'var(--gold)' }} />
            <h3 className="display" style={{ color: 'var(--navy)', fontSize: '1.3rem' }}>{h.name}</h3>
            <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.46rem', letterSpacing: '0.14em' }}>{h.area}</span>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--ink-muted)' }}>{h.note}</p>
            {h.url && (
              <a href={h.url} target="_blank" rel="noreferrer" data-cursor="hover"
                className="inline-flex items-center gap-1 mt-1 eyebrow no-underline" style={{ color: 'var(--gold)', fontSize: '0.48rem' }}>
                Ver hotel <ArrowUpRight size={11} />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </PageScaffold>
  )
}
