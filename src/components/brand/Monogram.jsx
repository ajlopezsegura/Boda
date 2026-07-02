import wedding from '../../data/wedding'

/**
 * Monograma-firma P · P.
 * La pieza de marca que se repite en toda la web (código couture: una sola firma).
 *
 * props:
 *   size   — diámetro en px (por defecto 64)
 *   color  — color de trazo/tinta (por defecto marino)
 *   ring   — mostrar el aro exterior (por defecto true)
 */
export default function Monogram({ size = 64, color = 'var(--navy)', ring = true }) {
  const [a, b] = wedding.couple.initials
  const glyph = Math.round(size * 0.34)
  const gap = Math.round(size * 0.05)

  return (
    <span
      aria-label={`${a} y ${b}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: ring ? `1px solid ${color}` : 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {/* segundo aro fino interior */}
      {ring && (
        <span
          style={{
            position: 'absolute',
            inset: Math.max(3, Math.round(size * 0.07)),
            borderRadius: '50%',
            border: `1px solid ${color}`,
            opacity: 0.35,
          }}
        />
      )}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap,
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontWeight: 500,
          fontSize: glyph,
          lineHeight: 1,
        }}
      >
        <span>{a}</span>
        <span style={{ width: 1, height: glyph * 0.9, backgroundColor: color, opacity: 0.7 }} />
        <span>{b}</span>
      </span>
    </span>
  )
}
