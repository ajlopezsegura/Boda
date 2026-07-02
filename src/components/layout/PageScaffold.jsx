import { motion } from 'framer-motion'
import PageTransition from './PageTransition'

const ease = [0.43, 0.13, 0.23, 0.96]

/**
 * Shared scaffold for interior wedding pages.
 * Full-screen fixed layer with an internal scroll area, a passport-style
 * heading (kicker + serif title + gold rule) and a centered content column.
 */
export default function PageScaffold({ kicker, title, subtitle, maxWidth = 860, children }) {
  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-y-auto" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div
          className="mx-auto px-6 sm:px-8"
          style={{ maxWidth, paddingTop: 'calc(var(--header-h) + 3.5rem)', paddingBottom: '5rem' }}
        >
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col items-center text-center mb-10 sm:mb-14"
          >
            {kicker && (
              <span className="label-luxury text-accent mb-4" style={{ fontSize: '0.6rem', letterSpacing: '0.28em' }}>
                {kicker}
              </span>
            )}
            <h1
              className="text-text"
              style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: 'clamp(2rem, 7vw, 3.4rem)', letterSpacing: '0.02em', lineHeight: 1.1, fontWeight: 500 }}
            >
              {title}
            </h1>
            <div className="h-px my-6" style={{ width: 48, backgroundColor: 'var(--color-accent)' }} />
            {subtitle && (
              <p
                className="font-sans font-light"
                style={{ fontSize: 'clamp(0.9rem, 2vw, 1.02rem)', lineHeight: 1.9, color: 'var(--color-text-muted)', maxWidth: 620 }}
              >
                {subtitle}
              </p>
            )}
          </motion.div>

          {children}
        </div>
      </div>
    </PageTransition>
  )
}
