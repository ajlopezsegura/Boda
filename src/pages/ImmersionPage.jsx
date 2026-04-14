import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Sliders, X, Check, Sun, Sunset, Moon, Sunrise } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { useUnit, useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

// ─── Time of day config ───────────────────────────────────────────────────────
const TIMES = [
  { id: 'dawn',      icon: Sunrise, es: 'Amanecer',  en: 'Dawn',      overlay: 'rgba(255,180,100,0.18)' },
  { id: 'morning',   icon: Sun,     es: 'Mañana',    en: 'Morning',   overlay: 'rgba(255,240,200,0.10)' },
  { id: 'afternoon', icon: Sun,     es: 'Tarde',     en: 'Afternoon', overlay: 'rgba(255,200,120,0.14)' },
  { id: 'sunset',    icon: Sunset,  es: 'Atardecer', en: 'Sunset',    overlay: 'rgba(255,120,60,0.20)'  },
  { id: 'night',     icon: Moon,    es: 'Noche',     en: 'Night',     overlay: 'rgba(20,30,60,0.55)'    },
]

// ─── Rooms ────────────────────────────────────────────────────────────────────
const ROOMS = [
  { id: 'salon',     es: 'Salón',         en: 'Living Room'   },
  { id: 'cocina',    es: 'Cocina',         en: 'Kitchen'       },
  { id: 'dormitorio',es: 'Dormitorio',     en: 'Master Bedroom'},
  { id: 'bano',      es: 'Baño',           en: 'Bathroom'      },
  { id: 'terraza',   es: 'Terraza',        en: 'Terrace'       },
]

// ─── Material category labels ─────────────────────────────────────────────────
const MAT_LABELS = {
  floor:   { es: 'Suelo',   en: 'Floor'   },
  walls:   { es: 'Paredes', en: 'Walls'   },
  kitchen: { es: 'Cocina',  en: 'Kitchen' },
}

// ─── Room → images ────────────────────────────────────────────────────────────
const ROOM_IMAGES = {
  salon:      ['./assets/images/Salon 01.webp','./assets/images/salon 02.webp','./assets/images/Salon 03.jpg','./assets/images/Salon 04.jpg','./assets/images/Salon 05.jpg'],
  cocina:     ['./assets/images/Cocina (1).jpg','./assets/images/Cocina (2).jpg','./assets/images/Cocina (3).jpg'],
  dormitorio: ['./assets/images/Dormitorio (1).jpg','./assets/images/Dormitorio (2).jpg','./assets/images/Dormitorio (3).jpg'],
  bano:       ['./assets/images/Baño (1).jpg','./assets/images/Baño (2).jpg','./assets/images/Baño (3).jpg'],
  terraza:    ['./assets/images/Terraza (1).jpg','./assets/images/Terraza (2).jpg'],
}

// ─── Pixel Streaming placeholder ─────────────────────────────────────────────
function PixelStreamingPlaceholder({ activeRoom, imgIndex, timeOverlay }) {
  const imgs = ROOM_IMAGES[activeRoom] ?? []
  const src  = imgs[imgIndex] ?? imgs[0]

  return (
    <div className="absolute inset-0" style={{ backgroundColor: '#0d1117' }}>
      <AnimatePresence mode="wait">
        <motion.img key={src} src={src} alt=""
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full object-contain" />
      </AnimatePresence>
      <div className="absolute inset-0 transition-all duration-700" style={{ backgroundColor: timeOverlay }} />
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ImmersionPage() {
  const { unitId }  = useParams()
  const navigate    = useNavigate()
  const unit        = useUnit(unitId)
  const { project, materials } = useProject()
  const { lang, toggle } = useLang()

  const [loading, setLoading]       = useState(true)
  const [panelOpen, setPanelOpen]   = useState(false)
  const [psToast, setPsToast]       = useState(false)
  const [activeTime, setActiveTime] = useState('morning')
  const [activeRoom, setActiveRoom] = useState('salon')
  const [imgIndex, setImgIndex]     = useState(0)
  const [selected, setSelected]   = useState({
    floor:   materials?.floor?.[0]?.id   ?? null,
    walls:   materials?.walls?.[0]?.id   ?? null,
    kitchen: materials?.kitchen?.[0]?.id ?? null,
  })

  // Simulate PS loading screen
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200)
    return () => clearTimeout(t)
  }, [])

  // Reset image index when room changes
  useEffect(() => { setImgIndex(0) }, [activeRoom])

  // Auto-advance slideshow every 5s
  useEffect(() => {
    if (loading || panelOpen) return
    const imgs = ROOM_IMAGES[activeRoom] ?? []
    if (imgs.length <= 1) return
    const t = setInterval(() => setImgIndex(i => (i + 1) % imgs.length), 5000)
    return () => clearInterval(t)
  }, [activeRoom, loading, panelOpen])


  if (!unit) {
    return (
      <PageTransition>
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
          <p className="label-luxury" style={{ color: 'var(--color-accent)', opacity: 0.4 }}>Vivienda no encontrada</p>
        </div>
      </PageTransition>
    )
  }

  const name      = lang === 'es' ? project.name : project.nameEN
  const timeData  = TIMES.find(t => t.id === activeTime) ?? TIMES[1]
  const roomData  = ROOMS.find(r => r.id === activeRoom) ?? ROOMS[0]

  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: '#0d1117' }}>

        {/* ── Loading screen ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6"
              style={{ backgroundColor: 'var(--color-bg)' }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="flex flex-col items-center gap-2">
                <span className="display-heading text-text" style={{ fontSize: 'clamp(0.65rem, 2vw, 0.8rem)', letterSpacing: '0.14em' }}>
                  THE VISUALS BOUTIQUE·STUDIO
                </span>
                <span className="label-luxury text-accent" style={{ fontSize: '0.5rem', letterSpacing: '0.3em' }}>
                  {name?.toUpperCase()} · {unit.id}
                </span>
              </motion.div>
              {/* Progress bar */}
              <motion.div className="relative overflow-hidden" style={{ width: 160, height: 1, backgroundColor: 'rgba(184,152,72,0.2)' }}>
                <motion.div
                  initial={{ x: '-100%' }} animate={{ x: '0%' }}
                  transition={{ duration: 1.8, ease: 'easeInOut' }}
                  className="absolute inset-0" style={{ backgroundColor: 'var(--color-accent)' }} />
              </motion.div>
              <p className="label-luxury" style={{ fontSize: '0.5rem', color: 'rgba(184,152,72,0.45)', letterSpacing: '0.2em' }}>
                {lang === 'es' ? 'CARGANDO EXPERIENCIA' : 'LOADING EXPERIENCE'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Pixel Streaming area ── */}
        <PixelStreamingPlaceholder activeRoom={activeRoom} imgIndex={imgIndex} timeOverlay={timeData.overlay} />

        {/* Dark vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(13,17,23,0.65) 0%, transparent 25%, transparent 70%, rgba(13,17,23,0.75) 100%)' }} />

        {/* ── Header ── */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 sm:px-8 py-4 z-10">
          <button onClick={() => navigate(`/availability/${unit.slug}`)} data-cursor="hover"
            className="flex items-center gap-1.5 label-luxury transition-all duration-300"
            style={{ color: 'rgba(244,241,234,0.5)', fontSize: '0.58rem' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,241,234,0.5)'}>
            <ChevronLeft size={13} />
            {lang === 'es' ? 'Volver' : 'Back'}
          </button>

          {/* Room indicator */}
          <div className="flex flex-col items-center">
            <span className="label-luxury text-accent" style={{ fontSize: '0.5rem', letterSpacing: '0.22em', opacity: 0.7 }}>
              {lang === 'es' ? roomData.es : roomData.en}
            </span>
            <span className="label-luxury text-text/30" style={{ fontSize: '0.44rem', letterSpacing: '0.15em' }}>
              {unit.id} · {unit.floor}ª {lang === 'es' ? 'planta' : 'floor'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={toggle} data-cursor="hover"
              className="flex items-center gap-1.5 label-luxury"
              style={{ fontSize: '0.58rem', backgroundColor: 'rgba(13,17,23,0.5)', backdropFilter: 'blur(8px)', padding: '0.4rem 0.75rem' }}>
              <span style={{ color: lang === 'es' ? 'var(--color-text)' : 'rgba(244,241,234,0.35)' }}>ES</span>
              <span style={{ color: 'var(--color-accent)' }}>|</span>
              <span style={{ color: lang === 'en' ? 'var(--color-text)' : 'rgba(244,241,234,0.35)' }}>EN</span>
            </button>
            <button onClick={() => { localStorage.setItem('tvbs_selection', JSON.stringify({ unitId: unit.id, materials: selected })); navigate('/decision') }} data-cursor="hover"
              className="label-luxury px-5 py-2 transition-all duration-300 min-h-[36px]"
              style={{ border: '1px solid var(--color-accent)', color: 'var(--color-accent)', fontSize: '0.58rem',
                backgroundColor: 'rgba(26,33,48,0.5)', backdropFilter: 'blur(8px)' }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(184,152,72,0.14)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(26,33,48,0.5)'}>
              {lang === 'es' ? 'Reservar →' : 'Reserve →'}
            </button>
          </div>
        </div>

        {/* ── Room navigation (left side) ── */}
        <div className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          {ROOMS.map(room => {
            const isActive = activeRoom === room.id
            return (
              <button key={room.id} onClick={() => setActiveRoom(room.id)} data-cursor="hover"
                className="label-luxury px-3 py-2 text-left transition-all duration-300"
                style={{
                  fontSize: '0.52rem',
                  borderLeft: `2px solid ${isActive ? 'var(--color-accent)' : 'rgba(184,152,72,0.2)'}`,
                  color: isActive ? 'var(--color-accent)' : 'rgba(244,241,234,0.35)',
                  backgroundColor: isActive ? 'rgba(184,152,72,0.06)' : 'transparent',
                  paddingLeft: '0.75rem',
                }}>
                {lang === 'es' ? room.es : room.en}
              </button>
            )
          })}
        </div>

        {/* ── Time of day control (right side) ── */}
        <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          {TIMES.map(t => {
            const Icon = t.icon
            const isActive = activeTime === t.id
            return (
              <button key={t.id} onClick={() => setActiveTime(t.id)} data-cursor="hover"
                className="flex flex-col items-center gap-1 px-2 py-2 transition-all duration-300"
                style={{
                  border: '1px solid',
                  borderColor: isActive ? 'rgba(184,152,72,0.5)' : 'rgba(184,152,72,0.12)',
                  backgroundColor: isActive ? 'rgba(184,152,72,0.08)' : 'rgba(13,17,23,0.4)',
                  backdropFilter: 'blur(8px)',
                }}>
                <Icon size={13} color={isActive ? 'var(--color-accent)' : 'rgba(244,241,234,0.35)'} strokeWidth={1.5} />
                <span className="label-luxury" style={{ fontSize: '0.42rem', color: isActive ? 'var(--color-accent)' : 'rgba(244,241,234,0.3)' }}>
                  {lang === 'es' ? t.es : t.en}
                </span>
              </button>
            )
          })}
        </div>

        {/* ── Bottom bar ── */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-5 sm:px-8 pb-5 z-10 gap-4">
          {/* PS launch button */}
          <button onClick={() => { setPsToast(true); setTimeout(() => setPsToast(false), 3000) }}
            data-cursor="hover"
            className="flex items-center gap-2 label-luxury px-4 py-2.5 transition-all duration-300 min-h-[40px]"
            style={{ border: '1px solid rgba(184,152,72,0.5)', color: 'var(--color-accent)', fontSize: '0.58rem',
              backgroundColor: 'rgba(13,17,23,0.55)', backdropFilter: 'blur(10px)' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(184,152,72,0.1)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(13,17,23,0.55)'}>
            {lang === 'es' ? 'Empezar experiencia' : 'Start experience'}
          </button>

          {/* Material config toggle */}
          <button onClick={() => setPanelOpen(true)} data-cursor="hover"
            className="flex items-center gap-2 label-luxury px-4 py-2.5 transition-all duration-300 min-h-[40px]"
            style={{ border: '1px solid rgba(184,152,72,0.3)', color: 'rgba(244,241,234,0.65)', fontSize: '0.58rem',
              backgroundColor: 'rgba(13,17,23,0.55)', backdropFilter: 'blur(10px)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(184,152,72,0.3)'}>
            <Sliders size={12} />
            {lang === 'es' ? 'Materiales' : 'Materials'}
          </button>

          {/* Selected materials swatches */}
          <div className="hidden sm:flex items-center gap-3">
            {Object.entries(selected).map(([cat, id]) => {
              const item = materials?.[cat]?.find(m => m.id === id)
              if (!item) return null
              return (
                <div key={cat} className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5" style={{ backgroundColor: item.swatch, border: '1px solid rgba(244,241,234,0.2)' }} />
                  <span className="label-luxury" style={{ fontSize: '0.48rem', color: 'rgba(244,241,234,0.4)' }}>
                    {lang === 'es' ? item.label : item.labelEN}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── PS coming soon toast ── */}
        <AnimatePresence>
          {psToast && (
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-5 py-3"
              style={{ backgroundColor: 'rgba(26,33,48,0.95)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(184,152,72,0.25)', whiteSpace: 'nowrap' }}>
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'var(--color-accent)' }} />
              <p className="label-luxury" style={{ fontSize: '0.58rem', color: 'rgba(244,241,234,0.8)' }}>
                {lang === 'es' ? 'Experiencia interactiva — Próximamente' : 'Interactive experience — Coming soon'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Material configurator panel ── */}
        <AnimatePresence>
          {panelOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setPanelOpen(false)}
                className="absolute inset-0 z-20"
                style={{ backgroundColor: 'rgba(13,17,23,0.45)', backdropFilter: 'blur(3px)' }} />

              <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="absolute top-0 right-0 bottom-0 z-30 flex flex-col overflow-y-auto"
                style={{ width: 'min(320px, 88vw)', backgroundColor: 'rgba(26,33,48,0.97)',
                  borderLeft: '1px solid rgba(184,152,72,0.15)', backdropFilter: 'blur(16px)' }}>

                <div className="flex items-center justify-between px-5 py-4"
                  style={{ borderBottom: '1px solid rgba(184,152,72,0.1)' }}>
                  <div>
                    <p className="display-heading text-text" style={{ fontSize: '0.72rem', letterSpacing: '0.12em' }}>
                      {lang === 'es' ? 'MATERIALES' : 'MATERIALS'}
                    </p>
                    <p className="label-luxury mt-0.5" style={{ fontSize: '0.48rem', color: 'rgba(184,152,72,0.55)' }}>
                      {lang === 'es' ? 'Vivienda' : 'Unit'} {unit.id}
                    </p>
                  </div>
                  <button onClick={() => setPanelOpen(false)} data-cursor="hover"
                    style={{ color: 'rgba(244,241,234,0.3)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,241,234,0.3)'}>
                    <X size={15} />
                  </button>
                </div>

                <div className="flex flex-col gap-5 px-5 py-5">
                  {Object.entries(MAT_LABELS).map(([cat, labels]) => {
                    const opts = materials?.[cat] ?? []
                    const catLabel = lang === 'es' ? labels.es : labels.en
                    return (
                      <div key={cat}>
                        <p className="label-luxury mb-2.5" style={{ fontSize: '0.52rem', color: 'rgba(184,152,72,0.65)', letterSpacing: '0.18em' }}>
                          {catLabel.toUpperCase()}
                        </p>
                        <div className="flex flex-col gap-1">
                          {opts.map(opt => {
                            const isSel = selected[cat] === opt.id
                            return (
                              <button key={opt.id}
                                onClick={() => setSelected(s => ({ ...s, [cat]: opt.id }))}
                                data-cursor="hover"
                                className="flex items-center gap-3 px-3 py-2.5 transition-all duration-200"
                                style={{
                                  border: '1px solid',
                                  borderColor: isSel ? 'rgba(184,152,72,0.45)' : 'rgba(184,152,72,0.08)',
                                  backgroundColor: isSel ? 'rgba(184,152,72,0.06)' : 'transparent',
                                }}>
                                <div className="w-5 h-5 flex-shrink-0"
                                  style={{ backgroundColor: opt.swatch, border: '1px solid rgba(244,241,234,0.12)' }} />
                                <span className="flex-1 text-left label-luxury"
                                  style={{ fontSize: '0.58rem', color: isSel ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                                  {lang === 'es' ? opt.label : opt.labelEN}
                                </span>
                                {isSel && <Check size={11} color="var(--color-accent)" />}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-auto px-5 py-5" style={{ borderTop: '1px solid rgba(184,152,72,0.1)' }}>
                  <p className="label-luxury mb-3" style={{ fontSize: '0.48rem', color: 'rgba(184,152,72,0.4)', lineHeight: 1.6 }}>
                    {lang === 'es'
                      ? 'La selección de materiales se enviará junto con tu reserva.'
                      : 'Your material selection will be sent with your reservation.'}
                  </p>
                  <button onClick={() => { localStorage.setItem('tvbs_selection', JSON.stringify({ unitId: unit.id, materials: selected })); navigate('/decision') }} data-cursor="hover"
                    className="w-full label-luxury py-3 transition-opacity duration-200"
                    style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)', fontSize: '0.6rem', letterSpacing: '0.15em' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    {lang === 'es' ? 'CONFIRMAR Y RESERVAR' : 'CONFIRM & RESERVE'}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  )
}
