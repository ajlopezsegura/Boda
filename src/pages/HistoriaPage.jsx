import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import { Stamp } from '../components/brand/decor'
import wedding from '../data/wedding'

const ease = [0.43, 0.13, 0.23, 0.96]

function DataCell({ label, value }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.42rem', letterSpacing: '0.2em' }}>{label}</span>
      <span className="data" style={{ color: 'var(--navy)', fontSize: '0.8rem' }}>{value}</span>
    </div>
  )
}

function Stamp2({ s, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease }}
      className="relative flex gap-5 sm:gap-8 pb-11"
    >
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 62 }}>
        <div
          className="flex items-center justify-center display"
          style={{ width: 60, height: 60, borderRadius: '50%', border: '1px solid var(--gold)', color: 'var(--navy)', fontSize: '1rem', transform: 'rotate(-7deg)' }}
        >
          {s.year}
        </div>
        <div className="flex-1 w-px mt-3" style={{ backgroundColor: 'var(--hairline)', minHeight: 34 }} />
      </div>

      <div className="flex-1 pt-1.5">
        <div className="flex items-center gap-1.5 mb-2">
          <MapPin size={11} style={{ color: 'var(--gold)' }} />
          <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.5rem', letterSpacing: '0.18em' }}>{s.place}</span>
        </div>
        <h3 className="display mb-2" style={{ color: 'var(--navy)', fontSize: 'clamp(1.4rem, 4vw, 1.8rem)' }}>{s.title}</h3>
        <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: 'var(--ink-muted)' }}>{s.text}</p>
      </div>
    </motion.div>
  )
}

export default function HistoriaPage() {
  const { story } = wedding
  const p = story.passport
  return (
    <PageScaffold index="01" eyebrow="Diario" title={<>Nuestra <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>historia</span></>} subtitle={story.intro} maxWidth={760}>
      {/* Franja de datos tipo pasaporte */}
      <div className="relative mb-14 p-6 overflow-hidden" style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--paper-deep)' }}>
        <Stamp label={wedding.city} sub="2026" size={130} rotate={-14} className="absolute" style={{ top: -18, right: -14 }} opacity={0.16} />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 relative">
          <DataCell label="Tipo" value={p.type} />
          <DataCell label="Código" value={p.code} />
          <DataCell label="Nº" value={p.number} />
          <DataCell label="Expedido en" value={p.authority} />
        </div>
      </div>

      <div>
        {story.stamps.map((s, i) => (
          <Stamp2 key={s.year + s.title} s={s} index={i} />
        ))}
      </div>
    </PageScaffold>
  )
}
