import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import PageScaffold from '../components/layout/PageScaffold'
import { SectionLabel } from '../components/brand/decor'
import { useLang } from '../i18n'

const ease = [0.43, 0.13, 0.23, 0.96]

function Row({ i, title, children, href, verLabel }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      transition={{ duration: 0.5, ease }}
      className="flex gap-5 sm:gap-8 py-7"
      style={{ borderTop: '1px solid var(--hairline)' }}
    >
      {i && (
        <span className="display flex-shrink-0" style={{ color: 'var(--gold)', opacity: 0.5, fontSize: '1.6rem', lineHeight: 1, width: 42 }}>{i}</span>
      )}
      <div className="flex-1">
        <div className="flex items-center justify-between gap-3">
          <h3 className="display" style={{ color: 'var(--navy)', fontSize: 'clamp(1.4rem, 4vw, 1.7rem)' }}>{title}</h3>
          {href && (
            <a href={href} target="_blank" rel="noreferrer" data-cursor="hover"
              className="eyebrow no-underline flex items-center gap-1 flex-shrink-0" style={{ color: 'var(--gold)', fontSize: '0.46rem' }}>
              {verLabel} <ArrowUpRight size={11} />
            </a>
          )}
        </div>
        <div className="mt-2" style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--ink-muted)' }}>{children}</div>
      </div>
    </motion.div>
  )
}

export default function ViajePage() {
  const { wedding, t } = useLang()
  const { travel, jaen } = wedding

  return (
    <PageScaffold
      align="center"
      title={<>{t.titles.viaje[0]}<span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{t.titles.viaje[1]}</span></>}
      subtitle={t.subtitles.viaje}
      backdrop={wedding.backdropViaje}
      /* Esta foto tiene mucho más contraste que la de la catedral (el rojo del
         vestido canta), así que se baja para que siga siendo solo una textura */
      backdropOpacity={0.05}
    >
      {/* Alojamiento — lo primero */}
      <div><SectionLabel>{t.whereSleep}</SectionLabel></div>

      <p className="mt-6 mx-auto text-center" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-muted)', maxWidth: 560 }}>
        {t.hotelsIntro}
      </p>

      <div className="mt-8" style={{ borderBottom: '1px solid var(--hairline)' }}>
        {travel.hotels.map(h => (
          <Row key={h.name} title={h.name} href={h.url || undefined} verLabel={t.view}>
            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {h.stars && (
                <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.46rem', letterSpacing: '0.14em' }}>
                  {'★'.repeat(h.stars)}
                </span>
              )}
              <span className="eyebrow" style={{ color: 'var(--ink-faint)', fontSize: '0.46rem', letterSpacing: '0.14em' }}>{h.area}</span>
            </span>

            {h.note && <span className="block mt-2">{h.note}</span>}

            {/* Cómo reservar: solo lo llevan los hoteles que piden un trámite
                concreto, y por eso se despega del resto con un filete */}
            {(h.bookingEmail || h.bookingPhone || h.bookingUrl || h.bookingNote) && (
              <span className="block mt-4 pl-4" style={{ borderLeft: '1px solid var(--gold)' }}>
                <span className="eyebrow block" style={{ color: 'var(--gold)', fontSize: '0.44rem', letterSpacing: '0.16em' }}>
                  {t.howToBook}
                </span>
                {h.bookingPhone && (
                  <a href={`tel:${h.bookingPhone.replace(/\s/g, '')}`} data-cursor="hover"
                     className="no-underline block mt-2" style={{ color: 'var(--navy)', fontSize: '0.98rem' }}>
                    {h.bookingPhone}
                  </a>
                )}
                {h.bookingEmail && (
                  <a href={`mailto:${h.bookingEmail}`} data-cursor="hover"
                     className="no-underline block mt-2" style={{ color: 'var(--navy)', fontSize: '0.98rem', wordBreak: 'break-word' }}>
                    {h.bookingEmail}
                  </a>
                )}
                {h.bookingUrl && (
                  <a href={h.bookingUrl} target="_blank" rel="noreferrer" data-cursor="hover"
                     className="no-underline inline-flex items-center gap-1 mt-2"
                     style={{ color: 'var(--navy)', fontSize: '0.98rem', borderBottom: '1px solid var(--gold)', paddingBottom: 1 }}>
                    {h.bookingLabel || t.book} <ArrowUpRight size={12} style={{ color: 'var(--gold)' }} />
                  </a>
                )}
                {h.code && (
                  <span className="block mt-2.5">
                    <span className="eyebrow" style={{ color: 'var(--ink-faint)', fontSize: '0.44rem', letterSpacing: '0.16em' }}>{t.bookingCode} </span>
                    <span className="data" style={{ color: 'var(--gold)', fontSize: '0.95rem' }}>{h.code}</span>
                  </span>
                )}
                {h.bookingNote && (
                  <span className={`block ${h.bookingPhone || h.bookingEmail ? 'mt-1.5' : 'mt-2'}`}
                        style={{ fontSize: '0.98rem', lineHeight: 1.7 }}>
                    {h.bookingNote}
                  </span>
                )}
              </span>
            )}

            {/* Si la reserva ya tiene su propio teléfono, el general se calla:
                dos números distintos del mismo hotel solo despistan */}
            {((h.phone && !h.bookingPhone) || h.email) && (
              <span className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2.5">
                {h.phone && !h.bookingPhone && (
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
          <SectionLabel>{t.movingJaen}</SectionLabel>
          <p className="mt-6 mx-auto" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-muted)', maxWidth: 560 }}>
            {travel.taxi}
          </p>
        </motion.div>
      )}

      {/* Descubrir Jaén */}
      {jaen && (
        <>
          <div className="mt-16"><SectionLabel>{t.discover}</SectionLabel></div>
          <p className="mt-6 mx-auto text-center" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--ink-muted)', maxWidth: 560 }}>
            {jaen.intro}
          </p>

          <div className="mt-8" style={{ borderBottom: '1px solid var(--hairline)' }}>
            {jaen.highlights.map((h, i) => (
              <Row key={h.title} i={String(i + 1).padStart(2, '0')} title={h.title} verLabel={t.view}>
                {h.text}
              </Row>
            ))}
          </div>
        </>
      )}
    </PageScaffold>
  )
}
