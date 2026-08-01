import { motion } from 'framer-motion'
import { MapPin, Plane, ArrowUpRight } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import { SectionLabel } from '../components/brand/decor'
import wedding from '../data/wedding'

const ease = [0.43, 0.13, 0.23, 0.96]

function EventCard({ ev, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease }}
      className="flex items-stretch"
      style={{ border: '1px solid var(--hairline)', backgroundColor: 'var(--paper-deep)' }}
    >
      {/* Hora */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center px-5 sm:px-8 py-7" style={{ minWidth: 116 }}>
        <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.5rem', letterSpacing: '0.24em' }}>{ev.code}</span>
        <span className="display" style={{ color: 'var(--navy)', fontSize: 'clamp(1.8rem, 6vw, 2.4rem)', lineHeight: 1, marginTop: 4 }}>{ev.time}</span>
      </div>

      {/* Divisor */}
      <div className="w-px my-6" style={{ backgroundColor: 'var(--hairline)' }} />

      {/* Detalle */}
      <div className="flex-1 px-5 sm:px-8 py-6">
        <h3 className="display mb-2" style={{ color: 'var(--navy)', fontSize: 'clamp(1.5rem, 5vw, 1.9rem)' }}>{ev.title}</h3>
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={12} style={{ color: 'var(--gold)' }} />
          <span className="eyebrow" style={{ color: 'var(--ink-muted)', fontSize: '0.52rem', letterSpacing: '0.12em' }}>
            {ev.place} · {ev.location}
          </span>
        </div>
        <p style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>{ev.note}</p>
        {ev.map && (
          <a href={ev.map} target="_blank" rel="noreferrer" data-cursor="hover"
            className="inline-flex items-center gap-1 mt-4 eyebrow no-underline"
            style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>
            Ver en el mapa <ArrowUpRight size={12} />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function ItinerarioPage() {
  const { events, program, dateShort } = wedding
  return (
    <PageScaffold
      index="02"
      eyebrow="Itinerario"
      title={<>El gran <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>día</span></>}
      subtitle="Dos escalas, un mismo destino: del «sí, quiero» en Jaén a la hacienda de Úbeda."
      maxWidth={760}
    >
      <div className="flex items-center justify-center gap-3 mb-10">
        <span className="data" style={{ color: 'var(--gold)', fontSize: '0.62rem' }}>{dateShort}</span>
      </div>

      <div className="flex flex-col">
        {events.map((ev, i) => (
          <div key={ev.code}>
            <EventCard ev={ev} index={i} />
            {i < events.length - 1 && (
              <div className="flex items-center justify-center gap-3 py-4" aria-hidden="true">
                <span style={{ width: 1, height: 18, background: 'linear-gradient(var(--hairline), transparent)' }} />
                <Plane size={15} style={{ color: 'var(--gold)', transform: 'rotate(90deg)' }} />
                <span style={{ width: 1, height: 18, background: 'linear-gradient(transparent, var(--hairline))' }} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Programa de la celebración */}
      <div className="mt-16">
        <SectionLabel>El programa de la celebración</SectionLabel>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 mt-7">
          {program.map((item, i) => (
            <div key={item} className="flex items-center gap-4">
              <span className="display" style={{ color: 'var(--navy)', fontSize: 'clamp(1.05rem, 3vw, 1.3rem)' }}>{item}</span>
              {i < program.length - 1 && <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--gold)' }} />}
            </div>
          ))}
        </div>
      </div>
    </PageScaffold>
  )
}
