import { useId } from 'react'
import { MonogramStrokes } from './Monogram'
import wedding from '../../data/wedding'

/**
 * El monograma en relieve seco (blind emboss), como va troquelado en las
 * invitaciones: no lleva tinta, solo la huella que el troquel deja en el papel.
 *
 * Se consigue pintando el monograma del mismo color que el papel y dejando que
 * un filtro dibuje el filo claro arriba a la izquierda y la sombra abajo a la
 * derecha, que es como se comporta la luz rasante sobre un relieve real.
 *
 * props:
 *   size  — lado del papel en px
 *   paper — color del papel sobre el que se estampa
 */
export default function MonogramSeal({ size = 108, paper = '#EFE9DC' }) {
  const [a, b] = wedding.couple.initials
  const uid = useId().replace(/[:]/g, '')
  const fid = `emboss-${uid}`
  const glyph = Math.round(size * 0.82)

  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: paper,
        // Luz rasante entrando por arriba a la izquierda, como en la foto
        backgroundImage:
          'radial-gradient(125% 125% at 26% 16%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 58%)',
        boxShadow: '0 14px 34px rgba(8,13,24,0.42)',
      }}
    >
      <svg
        width={glyph}
        height={glyph}
        viewBox="0 0 100 100"
        fill="none"
        role="img"
        aria-label={`${a} y ${b}`}
        style={{ display: 'block' }}
      >
        <defs>
          <filter id={fid} x="-25%" y="-25%" width="150%" height="150%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceAlpha" stdDeviation="0.9" result="huella" />

            {/* Sombra: el papel que se hunde al otro lado del relieve */}
            <feOffset in="huella" dx="1.5" dy="1.9" result="sombraPos" />
            <feFlood floodColor="#8C7A5C" floodOpacity="0.8" />
            <feComposite in2="sombraPos" operator="in" result="sombra" />

            {/* Filo iluminado: la cresta que da la cara a la luz */}
            <feOffset in="huella" dx="-1.3" dy="-1.6" result="luzPos" />
            <feFlood floodColor="#FFFFFF" floodOpacity="0.95" />
            <feComposite in2="luzPos" operator="in" result="luz" />

            <feMerge>
              <feMergeNode in="sombra" />
              <feMergeNode in="luz" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* El monograma va del color del papel: sin tinta, solo huella */}
        <g filter={`url(#${fid})`}>
          <MonogramStrokes color={paper} />
        </g>
      </svg>
    </div>
  )
}
