import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Waves, Dumbbell, TreePine, Car, ShieldCheck, Sparkles, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

const ICONS = { Waves, Dumbbell, TreePine, Car, ShieldCheck, Sparkles }

// ─── Simple carousel used for both left panel + amenities ────────────────────
function ImageCarousel({ images, aspectClass = 'w-full h-full', objectFit = 'object-cover', auto = true, interval = 4000 }) {
  const [idx, setIdx] = useState(0)
  const len = images?.length ?? 0

  useEffect(() => { setIdx(0) }, [images])

  useEffect(() => {
    if (!auto || len <= 1) return
    const t = setInterval(() => setIdx(i => (i + 1) % len), interval)
    return () => clearInterval(t)
  }, [auto, len, interval])

  if (!len) return null

  const prev = () => setIdx(i => (i - 1 + len) % len)
  const next = () => setIdx(i => (i + 1) % len)

  return (
    <div className={`relative overflow-hidden ${aspectClass}`}>
      <AnimatePresence mode="wait">
        <motion.img key={images[idx]} src={images[idx]} alt=""
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 w-full h-full ${objectFit}`} />
      </AnimatePresence>

      {len > 1 && (
        <>
          <button onClick={prev} data-cursor="hover"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-200"
            style={{ width: 28, height: 28, backgroundColor: 'rgba(26,33,48,0.65)', backdropFilter: 'blur(6px)', border: '1px solid rgba(184,152,72,0.2)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(184,152,72,0.2)'}>
            <ChevronLeft size={13} color="rgba(244,241,234,0.8)" />
          </button>
          <button onClick={next} data-cursor="hover"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center transition-all duration-200"
            style={{ width: 28, height: 28, backgroundColor: 'rgba(26,33,48,0.65)', backdropFilter: 'blur(6px)', border: '1px solid rgba(184,152,72,0.2)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(184,152,72,0.2)'}>
            <ChevronRight size={13} color="rgba(244,241,234,0.8)" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className="rounded-full transition-all duration-300"
                style={{ width: i === idx ? 14 : 4, height: 4, backgroundColor: i === idx ? 'var(--color-accent)' : 'rgba(244,241,234,0.4)' }} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function ContextPage() {
  const navigate = useNavigate()
  const { project, building, amenities } = useProject()
  const { lang } = useLang()
  const [openAmenity, setOpenAmenity] = useState(null)

  const name        = lang === 'es' ? project.name        : project.nameEN
  const description = lang === 'es' ? project.description : project.descriptionEN
  const gallery     = project.gallery ?? [project.aerialImage]

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
          <div className="flex items-center gap-2 label-luxury" style={{ fontSize: '0.6rem' }}>
            <span className="text-text">ES</span>
            <span style={{ color: 'var(--color-accent)' }}>|</span>
            <span style={{ opacity: 0.4 }}>EN</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">

          {/* Left — full project slideshow */}
          <div className="relative flex-shrink-0 md:w-1/2 h-48 sm:h-64 md:h-full overflow-hidden">
            <ImageCarousel images={gallery} interval={4000} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent 55%, var(--color-bg) 100%)' }} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent 65%, var(--color-bg) 100%)' }} />
            {/* Compass */}
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
                  { label: 'Unidades',   value: building?.totalUnits },
                  { label: 'Tipologías', value: building?.typologies?.join(', ') },
                  { label: 'Superficie', value: building?.surfaceRange },
                  { label: 'Desde',      value: '350.000 €' },
                ].map(item => (
                  <div key={item.label}>
                    <p className="label-luxury mb-1" style={{ color: 'var(--color-accent)', opacity: 0.6, fontSize: '0.55rem' }}>{item.label}</p>
                    <p className="font-sans font-light text-text" style={{ fontSize: 'clamp(0.78rem, 1.8vw, 0.9rem)' }}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="h-px mt-5" style={{ backgroundColor: 'rgba(184,152,72,0.15)' }} />
            </motion.div>

            {/* Amenities accordion */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <p className="label-luxury mb-4" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>Amenities</p>
              <div className="flex flex-col gap-1">
                {amenities?.map(amenity => {
                  const Icon  = ICONS[amenity.icon]
                  const label = lang === 'es' ? amenity.label : amenity.labelEN
                  const desc  = lang === 'es' ? amenity.description : amenity.descriptionEN
                  const imgs  = amenity.images ?? []
                  const isOpen = openAmenity === amenity.id

                  return (
                    <div key={amenity.id}
                      style={{ border: '1px solid', borderColor: isOpen ? 'rgba(184,152,72,0.45)' : 'rgba(184,152,72,0.12)', transition: 'border-color 0.3s' }}>

                      {/* Row */}
                      <button onClick={() => setOpenAmenity(isOpen ? null : amenity.id)}
                        data-cursor="hover"
                        className="w-full flex items-center gap-3 px-4 py-3 transition-colors duration-300"
                        style={{ backgroundColor: isOpen ? 'rgba(184,152,72,0.06)' : 'transparent' }}>
                        {Icon && <Icon size={14} strokeWidth={1.2}
                          color={isOpen ? 'var(--color-accent)' : 'rgba(244,241,234,0.45)'} />}
                        <span className="flex-1 text-left label-luxury"
                          style={{ fontSize: '0.6rem', color: isOpen ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
                          {label}
                        </span>
                        <ChevronDown size={12}
                          color={isOpen ? 'var(--color-accent)' : 'rgba(244,241,234,0.3)'}
                          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', flexShrink: 0 }} />
                      </button>

                      {/* Expanded */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div key="body"
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}
                            style={{ overflow: 'hidden' }}>
                            <div className="flex flex-col gap-3 px-4 pb-4">
                              {/* Full image / carousel */}
                              {imgs.length > 0 && (
                                <div className="relative overflow-hidden" style={{ height: 220, backgroundColor: 'rgba(13,17,23,0.6)' }}>
                                  <ImageCarousel images={imgs} auto={true} interval={3500} objectFit="object-contain" />
                                </div>
                              )}
                              {/* Description */}
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
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
              className="flex-shrink-0 pb-2">
              <button onClick={() => navigate('/seleccion')} data-cursor="hover"
                className="label-luxury border transition-all duration-500 min-h-[44px] px-8 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
                style={{ borderColor: 'rgba(184,152,72,0.45)', color: 'var(--color-text)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'rgba(184,152,72,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,152,72,0.45)'; e.currentTarget.style.backgroundColor = 'transparent' }}>
                Ver viviendas disponibles →
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
