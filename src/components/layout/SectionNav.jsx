import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, RotateCcw } from 'lucide-react'
import Monogram from '../brand/Monogram'

// Orden del recorrido (la "ruta" del pasaporte)
const JOURNEY = [
  { to: '/',         label: 'Inicio' },
  { to: '/historia', label: 'Nuestra historia' },
  { to: '/dia',      label: 'El gran día' },
  { to: '/viaje',    label: 'El viaje' },
  { to: '/info',     label: 'Buen viaje' },
  { to: '/rsvp',     label: 'Confirmar asistencia' },
]

export default function SectionNav() {
  const { pathname } = useLocation()
  const i = JOURNEY.findIndex(s => s.to === pathname)
  if (i === -1) return null

  const isLast = i === JOURNEY.length - 1
  const next = isLast ? JOURNEY[0] : JOURNEY[i + 1]

  return (
    <div className="mt-16 sm:mt-20">
      {/* Monograma-firma como cierre/divisor */}
      <div className="flex justify-center mb-8">
        <Monogram size={50} color="var(--gold)" />
      </div>

      <Link
        to={next.to}
        data-cursor="hover"
        className="group no-underline flex items-center justify-between gap-4 w-full px-6 py-6 transition-colors duration-500"
        style={{
          borderTop: '1px solid var(--hairline)',
          borderBottom: '1px solid var(--hairline)',
          minHeight: 76,
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(166,129,60,0.06)')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        <span className="flex flex-col gap-1.5">
          <span className="eyebrow" style={{ color: 'var(--gold)', fontSize: '0.5rem' }}>
            {isLast ? 'Fin del trayecto' : 'Siguiente parada'}
          </span>
          <span className="display" style={{ color: 'var(--navy)', fontSize: 'clamp(1.5rem, 6vw, 2rem)', lineHeight: 1.05 }}>
            {isLast ? 'Volver al inicio' : next.label}
          </span>
        </span>

        <span
          className="flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:translate-x-1"
          style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid var(--gold)', color: 'var(--gold)' }}
        >
          {isLast ? <RotateCcw size={18} strokeWidth={1.4} /> : <ArrowRight size={18} strokeWidth={1.4} />}
        </span>
      </Link>
    </div>
  )
}
