import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import MonogramSeal from '../brand/MonogramSeal'
import { useLang } from '../../i18n'

const RUTAS = [
  { to: '/historia', key: 'historia' },
  { to: '/dia',      key: 'dia' },
  { to: '/viaje',    key: 'viaje' },
  { to: '/info',     key: 'info' },
  { to: '/rsvp',     key: 'rsvp' },
]

/* Selector de idioma: dos letras y un filete, sin banderas
   (una bandera nunca representa bien a todos los que hablan un idioma). */
function SelectorIdioma({ tone = 'ink' }) {
  const { lang, setLang } = useLang()
  const claro = tone === 'light'

  const estilo = activo => ({
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '0.52rem',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: activo
      ? (claro ? '#E4CE93' : 'var(--gold)')
      : (claro ? 'rgba(247,243,234,0.55)' : 'var(--ink-faint)'),
    padding: '4px 2px',
    minHeight: 32,
    transition: 'color 0.4s ease',
  })

  return (
    <div className="flex items-center gap-1.5" role="group" aria-label="Idioma / Language">
      {['es', 'en'].map((codigo, i) => (
        <span key={codigo} className="flex items-center gap-1.5">
          {i > 0 && (
            <span aria-hidden="true" style={{ width: 1, height: 10, backgroundColor: claro ? 'rgba(247,243,234,0.3)' : 'var(--hairline)' }} />
          )}
          <button
            type="button"
            onClick={() => setLang(codigo)}
            data-cursor="hover"
            aria-pressed={lang === codigo}
            style={estilo(lang === codigo)}
          >
            {codigo}
          </button>
        </span>
      ))}
    </div>
  )
}

export default function WeddingNav() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const { t, wedding } = useLang()

  const onCover = location.pathname === '/'
  const ink       = 'var(--ink-muted)'
  const inkStrong = 'var(--navy)'
  const gold      = 'var(--gold)'

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.43, 0.13, 0.23, 0.96] }}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-9 py-3
          ${onCover
            /* En la portada el vídeo va a pantalla completa en móvil: el
               encabezado se vuelve transparente para no cortarlo. En escritorio
               recupera el papel para que los enlaces se lean sobre él. */
            ? 'bg-transparent border-transparent md:bg-[#F4F0E7] md:border-[color:var(--hairline)]'
            : 'bg-[#F4F0E7] border-[color:var(--hairline)]'}
          border-b`}
        style={{ minHeight: 'var(--header-h)' }}
      >
        {/* Nombres + fecha. En la portada se omiten: el titular ya lleva la
            identidad a gran escala y repetirla aquí ensucia la jerarquía. */}
        {onCover ? (
          <span aria-hidden="true" />
        ) : (
          <Link to="/" data-cursor="hover" className="no-underline flex flex-col justify-center" style={{ gap: 2, minHeight: 44 }}>
            <span className="display" style={{ color: inkStrong, fontSize: 'clamp(0.94rem, 3.3vw, 1.16rem)', letterSpacing: '0.08em', lineHeight: 1 }}>
              {wedding.couple.bride} &amp; {wedding.couple.groom}
            </span>
            <span className="eyebrow" style={{ color: gold, fontSize: '0.44rem', letterSpacing: '0.22em' }}>
              {wedding.dateShort}
            </span>
          </Link>
        )}

        <div className="flex items-center gap-5 sm:gap-7">
          {/* Nav escritorio */}
          <nav className="hidden md:flex items-center gap-7">
            {RUTAS.map(l => {
              const active = location.pathname === l.to
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  data-cursor="hover"
                  className="eyebrow no-underline transition-colors duration-500"
                  style={{ fontSize: '0.58rem', color: active ? gold : ink }}
                  onMouseEnter={e => (e.currentTarget.style.color = gold)}
                  onMouseLeave={e => (e.currentTarget.style.color = active ? gold : ink)}
                >
                  {t.nav[l.key]}
                </Link>
              )
            })}
          </nav>

          {/* Idioma: en escritorio siempre; en móvil solo fuera de la portada */}
          <div className={onCover ? 'hidden md:flex' : 'flex'}>
            <SelectorIdioma tone="ink" />
          </div>

          {/* Botón móvil */}
          <button
            onClick={() => setOpen(true)}
            data-cursor="hover"
            className={`md:hidden flex items-center justify-center min-h-[44px] min-w-[44px]
              ${onCover ? 'text-[#E4CE93]' : 'text-[color:var(--gold)]'}`}
            aria-label={t.openMenu}
          >
            <Menu size={22} strokeWidth={1.2} />
          </button>
        </div>
      </motion.header>

      {/* Menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 md:hidden"
            style={{ backgroundColor: 'var(--navy)' }}
          >
            <button
              onClick={() => setOpen(false)}
              data-cursor="hover"
              className="absolute top-4 right-4 flex items-center justify-center min-h-[44px] min-w-[44px]"
              style={{ color: 'var(--gold-soft)' }}
              aria-label={t.closeMenu}
            >
              <X size={24} strokeWidth={1.2} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
            >
              <MonogramSeal size={108} />
            </motion.div>

            {RUTAS.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
              >
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  data-cursor="hover"
                  className="display no-underline"
                  style={{
                    fontSize: '1.7rem',
                    letterSpacing: '0.06em',
                    color: location.pathname === l.to ? 'var(--gold-soft)' : '#F4F0E7',
                  }}
                >
                  {t.nav[l.key]}
                </Link>
              </motion.div>
            ))}

            <div className="mt-4">
              <SelectorIdioma tone="light" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
