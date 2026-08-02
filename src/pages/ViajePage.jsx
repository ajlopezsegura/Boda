import { motion } from 'framer-motion'
import { Plane, ArrowUpRight } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import { SectionLabel } from '../components/brand/decor'
import wedding from '../data/wedding'

const ease = [0.43, 0.13, 0.23, 0.96]

function OriginNode({ o }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="data" style={{ color: 'var(--gold)', fontSize: '0.6rem' }}>{o.code}</span>
      <span className="display" style={{ color: 'var(--navy)', fontSize: 'clamp(1.4rem, 4.5vw, 1.9rem)', lineHeight: 1.1, marginTop: 2 }}>{o.now}</span>
      <span className="eyebrow" style={{ color: 'var(--ink-faint)', fontSize: '0.44rem', marginTop: 5 }}>{o.label} · {o.from}</span>
    </div>
  )
}

function Row({ i, title, children, href }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
      className="flex gap-5 sm:gap-8 py-7"
      style={{ borderTop: '1px solid var(--hairline)' }}
    >
      <span className="display flex-shrink-0" style={{ color: 'var(--gold)', opacity: 0.5, fontSize: '1.6rem', lineHeight: 1, width: 42 }}>{i}</span>
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="display" style={{ color: 'var(--navy)', fontSize: 'clamp(1.4rem, 4vw, 1.7rem)' }}>{title}</h3>
          {href && (
            <a href={href} target="_blank" rel="noreferrer" data-cursor="hover"
              className="eyebrow no-underline flex items-center gap-1 flex-shrink-0" style={{ color: 'var(--gold)', fontSize: '0.46rem' }}>
              Ver <ArrowUpRight size={11} />
            </a>
          )}
        </div>
        <div className="mt-2" style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>{children}</div>
      </div>
    </motion.div>
  )
}

export default function ViajePage() {
  const { travel } = wedding
  const dest = travel.destination

  return (
    <PageScaffold
      index="03"
      eyebrow="Rutas"
      title={<>El <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>viaje</span></>}
      subtitle="Venimos de sitios distintos, pero el destino es el mismo. Todo lo que necesitas para llegar y quedarte."
    >
      {/* Ruta origen → destino */}
      <div className="flex items-center justify-between gap-4 max-w-2xl mx-auto mb-4">
        <div className="flex flex-col gap-7">
          {travel.origins.map(o => <OriginNode key={o.code} o={o} />)}
        </div>

        <div className="flex-1 relative flex items-center justify-center px-2" style={{ minWidth: 54 }}>
          <div style={{ height: 1, width: '100%', backgroundImage: 'radial-gradient(var(--gold) 1px, transparent 1px)', backgroundSize: '7px 1px', opacity: 0.6 }} />
          <Plane size={17} style={{ color: 'var(--gold)', position: 'absolute', backgroundColor: 'var(--paper)', paddingLeft: 4, paddingRight: 4 }} />
        </div>

        <div className="flex flex-col items-center text-center flex-shrink-0">
          <span className="data" style={{ color: 'var(--gold)', fontSize: '0.6rem' }}>{dest.code}</span>
          <span className="display" style={{ color: 'var(--navy)', fontSize: 'clamp(1.5rem, 5vw, 2.1rem)', lineHeight: 1.1, marginTop: 2 }}>{dest.place}</span>
          <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.44rem', marginTop: 5 }}>{dest.label}</span>
        </div>
      </div>

      {/* Cómo llegar — listado */}
      <div className="mt-16"><SectionLabel>Cómo llegar</SectionLabel></div>
      <div className="mt-4" style={{ borderBottom: '1px solid var(--hairline)' }}>
        {travel.getting.map((g, i) => (
          <Row key={g.title} i={String(i + 1).padStart(2, '0')} title={g.title}>{g.text}</Row>
        ))}
      </div>

      {/* Autobús */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="mt-12 text-center">
        <SectionLabel>Autobús</SectionLabel>
        <p className="mt-6 mx-auto" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-muted)', maxWidth: 560 }}>{travel.shuttle}</p>

        {travel.shuttleReturns?.length > 0 && (
          <div className="flex items-center justify-center gap-8 mt-6">
            {travel.shuttleReturns.map((t, i) => (
              <div key={t} className="flex flex-col items-center gap-1">
                <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.44rem', letterSpacing: '0.16em' }}>
                  {i === 0 ? 'Primera salida' : 'Última salida'}
                </span>
                <span className="data" style={{ color: 'var(--navy)', fontSize: '1.1rem' }}>{t}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Alojamiento — listado */}
      <div className="mt-16"><SectionLabel>Dónde dormir</SectionLabel></div>

      {travel.bookingCode && (
        <p className="mt-6 mx-auto text-center" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-muted)', maxWidth: 560 }}>
          Tenemos habitaciones reservadas en estos hoteles de Jaén. Al reservar, indica el código{' '}
          <span className="data" style={{ color: 'var(--gold)', fontSize: '0.95rem' }}>{travel.bookingCode}</span>.
        </p>
      )}

      <div className="mt-8" style={{ borderBottom: '1px solid var(--hairline)' }}>
        {travel.hotels.map((h, i) => (
          <Row key={h.name} i={String(i + 1).padStart(2, '0')} title={h.name} href={h.url || undefined}>
            <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.46rem', letterSpacing: '0.14em' }}>{h.area}</span>
            {h.note && <span className="block mt-1.5">{h.note}</span>}
            {(h.bookingUrl || h.email) && (
              <span className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2">
                {h.bookingUrl && (
                  <a href={h.bookingUrl} target="_blank" rel="noreferrer" data-cursor="hover"
                     className="eyebrow no-underline" style={{ color: 'var(--gold)', fontSize: '0.46rem', letterSpacing: '0.14em', borderBottom: '1px solid var(--gold)' }}>
                    Reservar
                  </a>
                )}
                {h.email && (
                  <a href={`mailto:${h.email}`} data-cursor="hover"
                     className="no-underline" style={{ color: 'var(--ink-muted)', fontSize: '0.9rem' }}>
                    {h.email}
                  </a>
                )}
              </span>
            )}
          </Row>
        ))}
      </div>
    </PageScaffold>
  )
}
