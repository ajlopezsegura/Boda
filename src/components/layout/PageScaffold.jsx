import { motion } from 'framer-motion'
import PageTransition from './PageTransition'
import SectionNav from './SectionNav'
import Countdown from '../brand/Countdown'

const ease = [0.43, 0.13, 0.23, 0.96]

/**
 * Scaffold editorial de las páginas interiores (papel marfil, tinta marino).
 * Cabecera asimétrica con número de página tipo pasaporte y titular a la
 * izquierda; cierre con navegación a la siguiente parada.
 */
export default function PageScaffold({ eyebrow, index, title, subtitle, maxWidth = 880, backdrop, children }) {
  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-y-auto" style={{ backgroundColor: 'var(--paper)' }}>
        {/* Fondo fotográfico apenas insinuado: aporta textura y calidez sin
            competir con el texto. Se desatura para no pelear con el oro. */}
        {backdrop && (
          <div
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${backdrop})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.07,
              filter: 'grayscale(0.4) sepia(0.18)',
              zIndex: 0,
            }}
          />
        )}

        <div
          className="relative mx-auto px-6 sm:px-10"
          style={{ maxWidth, paddingTop: 'calc(var(--header-h) + 3.5rem)', paddingBottom: '4.5rem', zIndex: 1 }}
        >
          {/* Cabecera editorial */}
          <motion.header
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="relative mb-14 sm:mb-20"
          >
            {/* Número de página (motivo pasaporte) */}
            {index && (
              <span
                aria-hidden="true"
                className="display absolute select-none"
                style={{ top: '-1.6rem', right: 0, fontSize: 'clamp(4rem, 14vw, 9rem)', lineHeight: 1, color: 'var(--navy)', opacity: 0.06, pointerEvents: 'none' }}
              >
                {index}
              </span>
            )}

            <div className="relative">
              {(eyebrow || index) && (
                <div className="flex items-center gap-3 mb-4">
                  {index && <span className="data" style={{ color: 'var(--gold)', fontSize: '0.6rem' }}>Nº&nbsp;{index}</span>}
                  {index && eyebrow && <span style={{ width: 22, height: 1, backgroundColor: 'var(--hairline)' }} />}
                  {eyebrow && <span className="eyebrow" style={{ color: 'var(--gold)' }}>{eyebrow}</span>}
                </div>
              )}

              <h1 className="display" style={{ color: 'var(--navy)', fontSize: 'clamp(2.6rem, 9vw, 4.6rem)', letterSpacing: '0.01em', lineHeight: 1.02 }}>
                {title}
              </h1>

              {subtitle && (
                <p className="mt-7" style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.25rem)', lineHeight: 1.85, color: 'var(--ink-muted)', maxWidth: 540 }}>
                  {subtitle}
                </p>
              )}
            </div>

            <div className="rule-gold mt-9" style={{ width: '100%', opacity: 0.5 }} />

            {/* Cuenta atrás — justo debajo del filete que cierra la cabecera */}
            <Countdown tone="ink" align="start" className="mt-8" />
          </motion.header>

          {children}

          {/* Cierre + navegación a la siguiente parada */}
          <SectionNav />
        </div>
      </div>
    </PageTransition>
  )
}
