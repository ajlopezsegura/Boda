import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Waves, Dumbbell, TreePine, Car, ShieldCheck, Sparkles, ChevronDown,
  Anchor, Flag, ShoppingBag, Plane, Utensils, MapPin,
} from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'
import { useSession } from '../context/SessionContext'

const AMENITY_ICONS = { Waves, Dumbbell, TreePine, Car, ShieldCheck, Sparkles }
const NEARBY_ICONS  = { Waves, Anchor, Flag, ShoppingBag, Plane, Utensils, MapPin }

const TABS = [
  { id: 'obra',      es: 'OBRA',      en: 'BUILD'     },
  { id: 'entorno',   es: 'ENTORNO',   en: 'LOCATION'  },
  { id: 'amenities', es: 'AMENITIES', en: 'AMENITIES' },
]

// ─── Auto-only carousel ───────────────────────────────────────────────────────
function ImageCarousel({ images, interval = 4000 }) {
  const [idx, setIdx] = useState(0)
  const len = images?.length ?? 0
  useEffect(() => { setIdx(0) }, [images])
  useEffect(() => {
    if (len <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % len), interval)
    return () => clearInterval(t)
  }, [len, interval])
  if (!len) return null
  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img key={images[idx]} src={images[idx]} alt=""
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 w-full h-full object-cover" />
      </AnimatePresence>
    </div>
  )
}

// ─── OBRA tab ─────────────────────────────────────────────────────────────────
function ObraTab({ construction, lang }) {
  if (!construction) return (
    <p className="label-luxury" style={{ fontSize: '0.55rem', color: 'rgba(244,241,234,0.3)' }}>
      {lang === 'es' ? 'Información de obra no disponible.' : 'Build info not available.'}
    </p>
  )
  const status = lang === 'es' ? construction.status   : construction.statusEN
  const phase  = lang === 'es' ? construction.phase    : construction.phaseEN
  const pct    = construction.completion ?? 0

  return (
    <div className="flex flex-col gap-5">
      {/* Status badge */}
      <div>
        <span className="label-luxury px-3 py-1.5" style={{
          fontSize: '0.5rem', letterSpacing: '0.15em',
          color: 'rgba(255,200,80,0.9)', backgroundColor: 'rgba(255,200,80,0.08)',
          border: '1px solid rgba(255,200,80,0.3)',
        }}>
          ● {status?.toUpperCase()}
        </span>
      </div>

      {/* Phase */}
      <div>
        <p className="label-luxury mb-1.5" style={{ fontSize: '0.48rem', color: 'rgba(184,152,72,0.5)', letterSpacing: '0.18em' }}>
          {lang === 'es' ? 'FASE ACTUAL' : 'CURRENT PHASE'}
        </p>
        <p className="font-sans font-light text-text" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
          {phase}
        </p>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="label-luxury" style={{ fontSize: '0.48rem', color: 'rgba(184,152,72,0.5)', letterSpacing: '0.18em' }}>
            {lang === 'es' ? 'AVANCE DE OBRA' : 'BUILD PROGRESS'}
          </p>
          <p className="label-luxury" style={{ fontSize: '0.52rem', color: 'var(--color-accent)' }}>
            {pct}%
          </p>
        </div>
        <div style={{ height: 3, backgroundColor: 'rgba(184,152,72,0.12)', borderRadius: 2 }}>
          <motion.div
            initial={{ width: 0 }} animate={{ width: `${pct}%` }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            style={{ height: '100%', backgroundColor: 'var(--color-accent)', borderRadius: 2 }}
          />
        </div>
      </div>

      {/* Delivery */}
      <div>
        <p className="label-luxury mb-1.5" style={{ fontSize: '0.48rem', color: 'rgba(184,152,72,0.5)', letterSpacing: '0.18em' }}>
          {lang === 'es' ? 'ENTREGA ESTIMADA' : 'ESTIMATED DELIVERY'}
        </p>
        <p className="font-sans font-light text-text" style={{ fontSize: '0.9rem' }}>
          {construction.delivery}
        </p>
      </div>
    </div>
  )
}

// ─── ENTORNO tab ──────────────────────────────────────────────────────────────
function EntornoTab({ nearby, lang, onItemView }) {
  if (!nearby?.length) return (
    <p className="label-luxury" style={{ fontSize: '0.55rem', color: 'rgba(244,241,234,0.3)' }}>
      {lang === 'es' ? 'Información de entorno no disponible.' : 'Location info not available.'}
    </p>
  )
  return (
    <div className="grid grid-cols-2 gap-2">
      {nearby.map(item => {
        const Icon  = NEARBY_ICONS[item.icon] ?? MapPin
        const label = lang === 'es' ? item.es : item.en
        return (
          <div key={item.id}
            style={{ border: '1px solid rgba(184,152,72,0.12)', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(184,152,72,0.3)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(184,152,72,0.12)'}>
            <Icon size={14} strokeWidth={1.2} color="rgba(184,152,72,0.6)" style={{ flexShrink: 0 }} />
            <div className="flex-1 min-w-0">
              <p className="label-luxury truncate" style={{ fontSize: '0.52rem', color: 'rgba(244,241,234,0.7)' }}>{label}</p>
            </div>
            <span className="label-luxury flex-shrink-0" style={{ fontSize: '0.46rem', color: 'rgba(184,152,72,0.6)', letterSpacing: '0.1em' }}>
              {item.dist}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// ─── AMENITIES tab ────────────────────────────────────────────────────────────
function AmenitiesTab({ amenities, lang, openAmenity, onToggle }) {
  return (
    <div className="flex flex-col gap-1">
      {amenities?.map(amenity => {
        const Icon   = AMENITY_ICONS[amenity.icon]
        const label  = lang === 'es' ? amenity.label       : amenity.labelEN
        const desc   = lang === 'es' ? amenity.description : amenity.descriptionEN
        const imgs   = amenity.images ?? []
        const isOpen = openAmenity === amenity.id
        return (
          <div key={amenity.id}
            style={{ border: '1px solid', borderColor: isOpen ? 'rgba(184,152,72,0.45)' : 'rgba(184,152,72,0.12)', transition: 'border-color 0.3s' }}>
            <button onClick={() => onToggle(amenity)} data-cursor="hover"
              className="w-full flex items-center gap-3 px-4 py-3 transition-colors duration-300"
              style={{ backgroundColor: isOpen ? 'rgba(184,152,72,0.06)' : 'transparent' }}>
              {Icon && <Icon size={14} strokeWidth={1.2} color={isOpen ? 'var(--color-accent)' : 'rgba(244,241,234,0.45)'} />}
              <span className="flex-1 text-left label-luxury"
                style={{ fontSize: '0.6rem', color: isOpen ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
                {label}
              </span>
              <ChevronDown size={12} color={isOpen ? 'var(--color-accent)' : 'rgba(244,241,234,0.3)'}
                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', flexShrink: 0 }} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div key="body"
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}>
                  <div className="flex flex-col gap-3 px-4 pb-4">
                    {imgs.length > 0 && (
                      <div className="relative overflow-hidden" style={{ height: 220, backgroundColor: '#0d1117' }}>
                        <ImageCarousel images={imgs} interval={3500} />
                      </div>
                    )}
                    {desc && (
                      <p className="font-sans font-light"
                        style={{ fontSize: '0.82rem', lineHeight: 1.75, color: 'var(--color-text-muted)' }}>
                        {desc}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ContextPage() {
  const navigate = useNavigate()
  const { project, building, amenities, construction, nearby } = useProject()
  const { lang, toggle } = useLang()
  const { trackEvent } = useSession()

  const [activeTab,  setActiveTab]  = useState('obra')
  const [openAmenity, setOpenAmenity] = useState(null)

  const name        = lang === 'es' ? project.name        : project.nameEN
  const description = lang === 'es' ? project.description : project.descriptionEN
  const gallery     = project.gallery ?? [project.aerialImage]

  function switchTab(tab) {
    setActiveTab(tab)
    trackEvent('section_view', { section: tab })
  }

  function handleAmenityToggle(amenity) {
    const isOpening = openAmenity !== amenity.id
    setOpenAmenity(isOpening ? amenity.id : null)
    if (isOpening) trackEvent('amenity_open', { id: amenity.id, label: amenity.label })
  }

  return (
    <PageTransition>
      <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 sm:px-10 py-4"
          style={{ borderBottom: '1px solid rgba(184,152,72,0.12)' }}>
          <div className="flex flex-col gap-0.5">
            <span className="display-heading text-text" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.75rem)', letterSpacing: '0.12em' }}>THE VISUALS</span>
            <span className="label-luxury text-accent" style={{ fontSize: '0.45rem', letterSpacing: '0.22em' }}>BOUTIQUE·STUDIO</span>
          </div>
          <span className="label-luxury text-text/40 hidden sm:block" style={{ fontSize: '0.55rem' }}>{name?.toUpperCase()}</span>
          <button onClick={toggle} data-cursor="hover"
            className="flex items-center gap-2 label-luxury" style={{ fontSize: '0.6rem' }}>
            <span style={{ color: lang === 'es' ? 'var(--color-text)' : 'rgba(244,241,234,0.35)' }}>ES</span>
            <span style={{ color: 'var(--color-accent)' }}>|</span>
            <span style={{ color: lang === 'en' ? 'var(--color-text)' : 'rgba(244,241,234,0.35)' }}>EN</span>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">

          {/* Left — slideshow */}
          <div className="relative flex-shrink-0 md:w-1/2 h-48 sm:h-64 md:h-full overflow-hidden">
            <ImageCarousel images={gallery} interval={4000} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent 55%, var(--color-bg) 100%)' }} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent 65%, var(--color-bg) 100%)' }} />
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 pointer-events-none"
              style={{ width: 36, height: 36, border: '1px solid rgba(184,152,72,0.4)', borderRadius: '50%',
                backgroundColor: 'rgba(26,33,48,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="display-heading text-accent" style={{ fontSize: '0.6rem' }}>N</span>
            </div>
          </div>

          {/* Right — info */}
          <div className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-10 py-6 sm:py-8 flex flex-col gap-6">

            {/* Description */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <p className="label-luxury mb-3" style={{ color: 'var(--color-accent)' }}>{project.subtitle}</p>
              <p className="font-sans font-light" style={{ fontSize: 'clamp(0.9rem, 2vw, 1rem)', lineHeight: 1.85, color: 'var(--color-text-muted)' }}>
                {description}
              </p>
            </motion.div>

            {/* Key data */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="h-px mb-5" style={{ backgroundColor: 'rgba(184,152,72,0.15)' }} />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: lang === 'es' ? 'Unidades'   : 'Units',      value: building?.totalUnits },
                  { label: lang === 'es' ? 'Tipologías' : 'Typologies', value: building?.typologies?.join(', ') },
                  { label: lang === 'es' ? 'Superficie' : 'Surface',    value: building?.surfaceRange },
                  { label: lang === 'es' ? 'Desde'      : 'From',       value: '350.000 €' },
                ].map(item => (
                  <div key={item.label}>
                    <p className="label-luxury mb-1" style={{ color: 'var(--color-accent)', opacity: 0.6, fontSize: '0.55rem' }}>{item.label}</p>
                    <p className="font-sans font-light text-text" style={{ fontSize: 'clamp(0.78rem, 1.8vw, 0.9rem)' }}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="h-px mt-5" style={{ backgroundColor: 'rgba(184,152,72,0.15)' }} />
            </motion.div>

            {/* ── 3 Tabs ── */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col gap-4">

              {/* Tab headers */}
              <div className="flex" style={{ borderBottom: '1px solid rgba(184,152,72,0.12)' }}>
                {TABS.map(tab => {
                  const isActive = activeTab === tab.id
                  return (
                    <button key={tab.id} onClick={() => switchTab(tab.id)} data-cursor="hover"
                      className="label-luxury px-4 py-2.5 transition-all duration-200 relative"
                      style={{ fontSize: '0.52rem', letterSpacing: '0.18em',
                        color: isActive ? 'var(--color-accent)' : 'rgba(244,241,234,0.35)' }}>
                      {lang === 'es' ? tab.es : tab.en}
                      {isActive && (
                        <motion.div layoutId="tab-underline"
                          className="absolute bottom-0 left-0 right-0 h-px"
                          style={{ backgroundColor: 'var(--color-accent)' }} />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div key={activeTab}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.25 }}>
                  {activeTab === 'obra' && (
                    <ObraTab construction={construction} lang={lang} />
                  )}
                  {activeTab === 'entorno' && (
                    <EntornoTab nearby={nearby} lang={lang} />
                  )}
                  {activeTab === 'amenities' && (
                    <AmenitiesTab amenities={amenities} lang={lang}
                      openAmenity={openAmenity} onToggle={handleAmenityToggle} />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
              className="flex-shrink-0 pb-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button onClick={() => navigate('/availability')} data-cursor="hover"
                className="label-luxury border transition-all duration-500 min-h-[44px] px-8 flex items-center gap-2 justify-center sm:justify-start"
                style={{ borderColor: 'rgba(184,152,72,0.45)', color: 'var(--color-text)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'rgba(184,152,72,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,152,72,0.45)'; e.currentTarget.style.backgroundColor = 'transparent' }}>
                {lang === 'es' ? 'Ver viviendas disponibles →' : 'View available residences →'}
              </button>
              <button onClick={() => navigate('/map')} data-cursor="hover"
                className="label-luxury border transition-all duration-500 min-h-[44px] px-6 flex items-center gap-2 justify-center sm:justify-start"
                style={{ borderColor: 'rgba(184,152,72,0.2)', color: 'rgba(244,241,234,0.45)', fontSize: '0.52rem' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(184,152,72,0.45)'; e.currentTarget.style.color = 'var(--color-text)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,152,72,0.2)'; e.currentTarget.style.color = 'rgba(244,241,234,0.45)' }}>
                {lang === 'es' ? 'Ver plano →' : 'Floor plan →'}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
