import { motion } from 'framer-motion'

/** Rótulo centrado flanqueado por filete de oro:  ——  CEREMONIA  —— */
export function SectionLabel({ children, className = '' }) {
  return (
    <div className={`flanked ${className}`}>
      <span className="eyebrow" style={{ color: 'var(--gold)', whiteSpace: 'nowrap' }}>
        {children}
      </span>
    </div>
  )
}

/** Filete de oro corto y centrado, con animación de apertura opcional. */
export function GoldRule({ width = 48, animate = true, className = '' }) {
  if (!animate) {
    return <div className={`rule-gold ${className}`} style={{ width }} />
  }
  return (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={`rule-gold ${className}`}
    />
  )
}

/**
 * Sello de pasaporte sutil — acento decorativo de fondo (baja opacidad).
 * Uso puntual, nunca protagonista.
 */
export function Stamp({ label = 'JAÉN', sub = '2026', size = 120, rotate = -12, color = 'var(--gold)', opacity = 0.18, className = '', style = {} }) {
  const r = size / 2
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ transform: `rotate(${rotate}deg)`, opacity, color, ...style }}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.4" strokeDasharray="2 3" />
      <circle cx="50" cy="50" r="34" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <text x="50" y="47" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize="10" letterSpacing="1.5" fill="currentColor" style={{ textTransform: 'uppercase' }}>
        {label}
      </text>
      <text x="50" y="60" textAnchor="middle" fontFamily="Montserrat, sans-serif" fontSize="6" letterSpacing="2" fill="currentColor">
        {sub}
      </text>
    </svg>
  )
}
