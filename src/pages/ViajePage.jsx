import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import { SectionLabel } from '../components/brand/decor'
import wedding from '../data/wedding'

const ease = [0.43, 0.13, 0.23, 0.96]

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
  const { travel, jaen } = wedding

  return (
    <PageScaffold
      index="03"
      eyebrow="La estancia"
      title={<>El <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>viaje</span></>}
      subtitle="Dónde dormir, cómo moverte por Jaén y qué ver si te quedas unos días."
    >
      {/* Alojamiento — lo primero */}
      <div><SectionLabel>Dónde dormir</SectionLabel></div>

      <p className="mt-6 mx-auto text-center" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-muted)', maxWidth: 560 }}>
        Tenemos habitaciones reservadas en estos hoteles de Jaén. Cada uno tiene
        su propio código: indícalo al hacer la reserva.
      </p>

      <div className="mt-8" style={{ borderBottom: '1px solid var(--hairline)' }}>
        {travel.hotels.map((h, i) => (
          <Row key={h.name} i={String(i + 1).padStart(2, '0')} title={h.name} href={h.url || undefined}>
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {h.stars && (
                <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.46rem', letterSpacing: '0.14em' }}>
                  {'★'.repeat(h.stars)}
                </span>
              )}
              <span className="eyebrow" style={{ color: 'var(--ink-faint)', fontSize: '0.46rem', letterSpacing: '0.14em' }}>{h.area}</span>
            </span>

            {h.note && <span className="block mt-2">{h.note}</span>}

            {h.code && (
              <span className="block mt-3">
                <span className="eyebrow" style={{ color: 'var(--ink-faint)', fontSize: '0.44rem', letterSpacing: '0.16em' }}>Código de reserva </span>
                <span className="data" style={{ color: 'var(--gold)', fontSize: '0.92rem' }}>{h.code}</span>
              </span>
            )}

            {(h.bookingUrl || h.phone || h.email) && (
              <span className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2.5">
                {h.bookingUrl && (
                  <a href={h.bookingUrl} target="_blank" rel="noreferrer" data-cursor="hover"
                     className="eyebrow no-underline" style={{ color: 'var(--gold)', fontSize: '0.46rem', letterSpacing: '0.14em', borderBottom: '1px solid var(--gold)' }}>
                    Reservar
                  </a>
                )}
                {h.phone && (
                  <a href={`tel:${h.phone.replace(/\s/g, '')}`} data-cursor="hover"
                     className="no-underline" style={{ color: 'var(--ink-muted)', fontSize: '0.9rem' }}>
                    {h.phone}
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

      {/* Moverse por Jaén */}
      {travel.taxi && (
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <SectionLabel>Moverse por Jaén</SectionLabel>
          <p className="mt-6 mx-auto" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-muted)', maxWidth: 560 }}>
            {travel.taxi}
          </p>
        </motion.div>
      )}

      {/* Descubrir Jaén */}
      {jaen && (
        <>
          <div className="mt-16"><SectionLabel>Descubre Jaén</SectionLabel></div>
          <p className="mt-6 mx-auto text-center" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-muted)', maxWidth: 560 }}>
            {jaen.intro}
          </p>

          <div className="mt-8" style={{ borderBottom: '1px solid var(--hairline)' }}>
            {jaen.highlights.map((h, i) => (
              <Row key={h.title} i={String(i + 1).padStart(2, '0')} title={h.title}>
                {h.text}
              </Row>
            ))}
          </div>
        </>
      )}
    </PageScaffold>
  )
}
