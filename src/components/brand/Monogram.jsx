import wedding from '../../data/wedding'

/**
 * Monograma-firma: dos iniciales serif enlazadas por una "ruta de vuelo"
 * (línea diagonal con dos nodos), igual que la invitación. Es la marca que
 * se repite en toda la web (código couture: una sola firma).
 *
 * props:
 *   size  — lado en px (por defecto 64)
 *   color — color de tinta (por defecto marino)
 */
export default function Monogram({ size = 64, color = 'var(--navy)' }) {
  const [a, b] = wedding.couple.initials

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label={`${a} y ${b}`}
      style={{ display: 'block', overflow: 'visible' }}
    >
      {/* Inicial izquierda (arriba) */}
      <text
        x="33" y="49" textAnchor="middle"
        fontFamily='"Cormorant Garamond", Georgia, serif'
        fontSize="46" fontWeight="500" fill={color}
      >{a}</text>

      {/* Inicial derecha (abajo) */}
      <text
        x="67" y="77" textAnchor="middle"
        fontFamily='"Cormorant Garamond", Georgia, serif'
        fontSize="46" fontWeight="500" fill={color}
      >{b}</text>

      {/* Ruta de vuelo: nodo → línea → nodo */}
      <line x1="41" y1="74" x2="63" y2="36" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="41" cy="74" r="2.8" fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx="63" cy="36" r="2.8" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  )
}
