import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Waves, Dumbbell, TreePine, Car, ShieldCheck, Sparkles } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

const ICONS = { Waves, Dumbbell, TreePine, Car, ShieldCheck, Sparkles }

export default function ContextPage() {
  const navigate = useNavigate()
  const { project, building, amenities } = useProject()
  const { lang } = useLang()
  const [hoveredAmenity, setHoveredAmenity] = useState(null)

  const name        = lang === 'es' ? project.name        : project.nameEN
  const description = lang === 'es' ? project.description : project.descriptionEN
  const hovered     = amenities?.find(a => a.id === hoveredAmenity)

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
          <div className="flex items-center gap-2 label-luxury" style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>
            <span className="text-text">ES</span>
            <span style={{ color: 'var(--color-accent)' }}>|</span>
            <span style={{ opacity: 0.4 }}>EN</span>
          </div>
        </div>

        {/* Body — two columns on desktop */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">

          {/* Left — aerial image */}
          <div className="relative flex-shrink-0 md:w-1/2 h-48 sm:h-64 md:h-full overflow-hidden">
            <img src={project.aerialImage} alt={name} className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to right, transparent 50%, var(--color-bg) 100%)' }} />
            {/* Compass */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col items-center"
              style={{ width: 40, height: 40, border: '1px solid rgba(184,152,72,0.4)', borderRadius: '50%',
                backgroundColor: 'rgba(26,33,48,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="display-heading text-accent" style={{ fontSize: '0.65rem' }}>N</span>
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
                  { label: 'Unidades',     value: building?.totalUnits },
                  { label: 'Tipologías',   value: building?.typologies?.join(', ') },
                  { label: 'Superficie',   value: building?.surfaceRange },
                  { label: 'Desde',        value: '350.000 €' },
                ].map(item => (
                  <div key={item.label}>
                    <p className="label-luxury mb-1" style={{ color: 'var(--color-accent)', opacity: 0.6, fontSize: '0.55rem' }}>{item.label}</p>
                    <p className="font-sans font-light text-text" style={{ fontSize: 'clamp(0.78rem, 1.8vw, 0.9rem)' }}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="h-px mt-5" style={{ backgroundColor: 'rgba(184,152,72,0.15)' }} />
            </motion.div>

            {/* Amenities */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <p className="label-luxury mb-4" style={{ color: 'var(--color-accent)', opacity: 0.7 }}>Amenities</p>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
                {amenities?.map(amenity => {
                  const Icon = ICONS[amenity.icon]
                  const label = lang === 'es' ? amenity.label : amenity.labelEN
                  const isHovered = hoveredAmenity === amenity.id
                  return (
                    <button
                      key={amenity.id}
                      onMouseEnter={() => setHoveredAmenity(amenity.id)}
                      onMouseLeave={() => setHoveredAmenity(null)}
                      onClick={() => setHoveredAmenity(isHovered ? null : amenity.id)}
                      data-cursor="hover"
                      className="flex flex-col items-center gap-2 p-2 sm:p-3 transition-all duration-400"
                      style={{
                        border: '1px solid',
                        borderColor: isHovered ? 'rgba(184,152,72,0.6)' : 'rgba(184,152,72,0.15)',
                        backgroundColor: isHovered ? 'rgba(184,152,72,0.08)' : 'transparent',
                      }}
                    >
                      {Icon && <Icon size={16} strokeWidth={1.2}
                        color={isHovered ? 'var(--color-accent)' : 'rgba(244,241,234,0.45)'} />}
                      <span className="label-luxury text-center leading-tight"
                        style={{ fontSize: '0.48rem', color: isHovered ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
                        {label}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Image preview on hover */}
              {hovered?.image && (
                <motion.div key={hovered.id}
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 100 }}
                  transition={{ duration: 0.35 }}
                  className="mt-3 overflow-hidden">
                  <img src={hovered.image} alt={hovered.label} className="w-full h-full object-cover" />
                </motion.div>
              )}
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
              className="flex-shrink-0 pb-2">
              <button
                onClick={() => navigate('/seleccion')}
                data-cursor="hover"
                className="label-luxury border transition-all duration-500 min-h-[44px] px-8 flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start"
                style={{ borderColor: 'rgba(184,152,72,0.45)', color: 'var(--color-text)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.backgroundColor = 'rgba(184,152,72,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,152,72,0.45)'; e.currentTarget.style.backgroundColor = 'transparent' }}
              >
                Ver viviendas disponibles →
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  )
}
