import { motion } from 'framer-motion'
import PageTransition from './PageTransition'
import { GoldRule } from '../brand/decor'
import Monogram from '../brand/Monogram'

const ease = [0.43, 0.13, 0.23, 0.96]

/**
 * Scaffold editorial de las páginas interiores (papel marfil, tinta marino).
 * Encabezado con rótulo espaciado + titular serif + filete de oro, y un cierre
 * con el monograma-firma.
 */
export default function PageScaffold({ eyebrow, title, subtitle, maxWidth = 860, children, closing = true }) {
  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-y-auto" style={{ backgroundColor: 'var(--paper)' }}>
        <div
          className="mx-auto px-6 sm:px-8"
          style={{ maxWidth, paddingTop: 'calc(var(--header-h) + 4rem)', paddingBottom: '4.5rem' }}
        >
          {/* Encabezado */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="flex flex-col items-center text-center mb-12 sm:mb-16"
          >
            {eyebrow && (
              <span className="eyebrow mb-5" style={{ color: 'var(--gold)' }}>
                {eyebrow}
              </span>
            )}
            <h1 className="display" style={{ color: 'var(--navy)', fontSize: 'clamp(2.2rem, 7vw, 3.6rem)', letterSpacing: '0.03em' }}>
              {title}
            </h1>
            <GoldRule className="my-6" width={52} animate={false} />
            {subtitle && (
              <p style={{ fontSize: 'clamp(1rem, 2.2vw, 1.18rem)', lineHeight: 1.85, color: 'var(--ink-muted)', maxWidth: 640 }}>
                {subtitle}
              </p>
            )}
          </motion.div>

          {children}

          {/* Cierre */}
          {closing && (
            <div className="flex justify-center mt-16 sm:mt-20">
              <Monogram size={54} color="var(--gold)" />
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  )
}
