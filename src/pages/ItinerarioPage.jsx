import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Bus, ArrowUpRight } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import { SectionLabel } from '../components/brand/decor'
import { useLang } from '../i18n'

const ease = [0.43, 0.13, 0.23, 0.96]

function EventCard({ ev, index, t }) {
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
            {t.viewMap} <ArrowUpRight size={12} />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function ItinerarioPage() {
  const { wedding, t } = useLang()
  const { events, program, dateShort, travel } = wedding
  return (
    <PageScaffold
      align="center"
      title={<>{t.titles.dia[0]}<span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{t.titles.dia[1]}</span></>}
      subtitle={t.subtitles.dia}
      maxWidth={760}
      backdrop={wedding.backdrop}
    >
      <div className="flex items-center justify-center gap-3 mb-10">
        <span className="data" style={{ color: 'var(--gold)', fontSize: '0.62rem' }}>{dateShort}</span>
      </div>

      <div className="flex flex-col">
        {events.map((ev, i) => (
          <div key={ev.code}>
            <EventCard ev={ev} index={i} t={t} />
            {/* Entre las dos escalas: el autobús que las une */}
            {i < events.length - 1 && travel?.shuttle && (
              <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center py-6"
              >
                <span aria-hidden="true" style={{ width: 1, height: 22, background: 'linear-gradient(var(--hairline), transparent)' }} />

                <div className="flex items-center gap-2.5 mt-4">
                  <Bus size={14} style={{ color: 'var(--gold)' }} />
                  <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.5rem', letterSpacing: '0.2em' }}>{t.bus}</span>
                </div>

                {travel.shuttlePickup && (
                  <span className="display mt-2" style={{ color: 'var(--navy)', fontSize: 'clamp(1.4rem, 4.5vw, 1.8rem)', lineHeight: 1 }}>
                    {travel.shuttlePickup}
                  </span>
                )}

                <p className="mt-2" style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)', maxWidth: 340 }}>
                  {travel.shuttle}
                </p>

                <span aria-hidden="true" className="mt-4" style={{ width: 1, height: 22, background: 'linear-gradient(transparent, var(--hairline))' }} />
              </motion.div>
            )}

            {/* Tras la celebración: la vuelta a Jaén */}
            {i === events.length - 1 && travel?.shuttleReturns?.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center pt-6"
              >
                <span aria-hidden="true" style={{ width: 1, height: 22, background: 'linear-gradient(var(--hairline), transparent)' }} />

                <div className="flex items-center gap-2.5 mt-4">
                  <Bus size={14} style={{ color: 'var(--gold)' }} />
                  <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.5rem', letterSpacing: '0.2em' }}>{t.busBack}</span>
                </div>

                {/* La conjunción entre las dos horas evita leerlas como un
                    rango: son dos salidas, y cada uno coge la que quiera */}
                <div className="flex items-start justify-center gap-6 sm:gap-8 mt-4">
                  {travel.shuttleReturns.map((hora, n) => (
                    <Fragment key={hora}>
                      {n > 0 && (
                        <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.5rem', letterSpacing: '0.16em', marginTop: '0.45rem' }}>
                          {t.or}
                        </span>
                      )}
                      <div className="flex flex-col items-center gap-1.5">
                        <span className="display" style={{ color: 'var(--navy)', fontSize: 'clamp(1.4rem, 4.5vw, 1.8rem)', lineHeight: 1 }}>{hora}</span>
                        <span className="eyebrow" style={{ color: 'var(--ink-faint)', fontSize: '0.44rem', letterSpacing: '0.16em' }}>
                          {n === 0 ? t.firstBus : t.lastBus}
                        </span>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Programa de la celebración */}
      <div className="mt-16">
        <SectionLabel>{t.timing}</SectionLabel>
        <div className="flex flex-col mt-7" style={{ maxWidth: 460, marginInline: 'auto' }}>
          {program.map((item, i) => (
            <div
              key={item.time + item.title}
              className="grid items-baseline gap-4 py-4"
              style={{
                gridTemplateColumns: '4.2rem 1fr',
                borderTop: i === 0 ? 'none' : '1px solid var(--hairline)',
              }}
            >
              <span className="data" style={{ color: 'var(--gold)', fontSize: '0.82rem' }}>{item.time}</span>
              <div className="text-left">
                <span className="display" style={{ color: 'var(--navy)', fontSize: 'clamp(1.05rem, 3vw, 1.3rem)' }}>{item.title}</span>
                {item.detail && (
                  <p style={{ color: 'var(--ink-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginTop: 2 }}>{item.detail}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </PageScaffold>
  )
}
