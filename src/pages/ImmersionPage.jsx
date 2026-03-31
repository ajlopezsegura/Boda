import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Sliders, X, Check } from 'lucide-react'
import PageTransition from '../components/layout/PageTransition'
import { useUnit, useProject } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

const MATERIAL_LABELS = {
  floor:   { es: 'Suelo',   en: 'Floor' },
  walls:   { es: 'Paredes', en: 'Walls' },
  kitchen: { es: 'Cocina',  en: 'Kitchen' },
}

export default function ImmersionPage() {
  const { unitId } = useParams()
  const navigate   = useNavigate()
  const unit       = useUnit(unitId)
  const { project, materials } = useProject()
  const { lang }   = useLang()

  const [panelOpen, setPanelOpen] = useState(false)
  const [selected, setSelected] = useState({
    floor:   materials?.floor?.[0]?.id   ?? null,
    walls:   materials?.walls?.[0]?.id   ?? null,
    kitchen: materials?.kitchen?.[0]?.id ?? null,
  })

  if (!unit) {
    return (
      <PageTransition>
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
          <p className="label-luxury" style={{ color: 'var(--color-accent)', opacity: 0.4 }}>Vivienda no encontrada</p>
        </div>
      </PageTransition>
    )
  }

  const name = lang === 'es' ? project.name : project.nameEN

  return (
    <PageTransition>
      <div className="absolute inset-0 overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* Background image */}
        {unit.thumbnail && (
          <img src={unit.thumbnail} alt={`Vivienda ${unit.id}`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: 0.45 }} />
        )}

        {/* Gradient overlays */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(26,33,48,0.6) 0%, rgba(26,33,48,0.1) 40%, rgba(26,33,48,0.1) 60%, rgba(26,33,48,0.85) 100%)' }} />

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 sm:px-10 py-5 z-10">
          <button onClick={() => navigate('/seleccion')} data-cursor="hover"
            className="flex items-center gap-2 label-luxury transition-all duration-300"
            style={{ color: 'rgba(244,241,234,0.55)', fontSize: '0.6rem' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,241,234,0.55)'}>
            <ChevronLeft size={14} />
            {lang === 'es' ? 'Viviendas' : 'Residences'}
          </button>

          <div className="flex flex-col items-center">
            <span className="display-heading text-text" style={{ fontSize: 'clamp(0.6rem, 2vw, 0.75rem)', letterSpacing: '0.12em' }}>{name?.toUpperCase()}</span>
            <span className="label-luxury text-accent" style={{ fontSize: '0.45rem', letterSpacing: '0.22em' }}>VIVIENDA {unit.id}</span>
          </div>

          <button onClick={() => navigate('/decision')} data-cursor="hover"
            className="label-luxury px-6 py-2 transition-all duration-300 min-h-[40px]"
            style={{ border: '1px solid var(--color-accent)', color: 'var(--color-accent)', fontSize: '0.6rem' }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(184,152,72,0.12)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
            {lang === 'es' ? 'Reservar →' : 'Reserve →'}
          </button>
        </div>

        {/* Center — unit key data */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center gap-3">

            <h1 className="display-heading text-text" style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', letterSpacing: '0.1em', lineHeight: 1 }}>
              {unit.id}
            </h1>
            <div className="h-px w-12" style={{ backgroundColor: 'var(--color-accent)' }} />
            <div className="flex gap-6 sm:gap-10 flex-wrap justify-center">
              {[
                { label: lang === 'es' ? 'Planta'       : 'Floor',       value: `${unit.floor}ª` },
                { label: lang === 'es' ? 'Dormitorios'  : 'Bedrooms',    value: unit.bedrooms },
                { label: lang === 'es' ? 'Superficie'   : 'Surface',     value: `${unit.surface} m²` },
                { label: lang === 'es' ? 'Orientación'  : 'Orientation', value: unit.orientation },
                { label: lang === 'es' ? 'Precio'       : 'Price',       value: unit.price.toLocaleString('es-ES') + ' €' },
              ].map(d => (
                <div key={d.label} className="flex flex-col items-center gap-1">
                  <span className="label-luxury" style={{ fontSize: '0.48rem', color: 'rgba(184,152,72,0.6)', letterSpacing: '0.18em' }}>{d.label.toUpperCase()}</span>
                  <span className="font-sans font-light text-text" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between px-6 sm:px-10 pb-6 z-10">
          {/* Material config toggle */}
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            onClick={() => setPanelOpen(true)}
            data-cursor="hover"
            className="flex items-center gap-2 label-luxury px-5 py-3 transition-all duration-300"
            style={{ border: '1px solid rgba(184,152,72,0.35)', color: 'rgba(244,241,234,0.7)', fontSize: '0.6rem',
              backgroundColor: 'rgba(26,33,48,0.5)', backdropFilter: 'blur(8px)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(184,152,72,0.35)'}>
            <Sliders size={13} />
            {lang === 'es' ? 'Configurar materiales' : 'Configure materials'}
          </motion.button>

          {/* Selected materials preview */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="hidden sm:flex items-center gap-2">
            {Object.entries(selected).map(([cat, id]) => {
              const item = materials?.[cat]?.find(m => m.id === id)
              if (!item) return null
              return (
                <div key={cat} className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.swatch, border: '1px solid rgba(244,241,234,0.2)' }} />
                  <span className="label-luxury" style={{ fontSize: '0.5rem', color: 'rgba(244,241,234,0.45)' }}>
                    {lang === 'es' ? item.label : item.labelEN}
                  </span>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Material configurator panel */}
        <AnimatePresence>
          {panelOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setPanelOpen(false)}
                className="absolute inset-0 z-20"
                style={{ backgroundColor: 'rgba(26,33,48,0.4)', backdropFilter: 'blur(2px)' }} />

              {/* Panel */}
              <motion.div
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96] }}
                className="absolute top-0 right-0 bottom-0 z-30 flex flex-col overflow-y-auto"
                style={{ width: 'min(340px, 90vw)', backgroundColor: 'rgba(37,45,58,0.97)',
                  borderLeft: '1px solid rgba(184,152,72,0.15)', backdropFilter: 'blur(16px)' }}>

                {/* Panel header */}
                <div className="flex items-center justify-between px-6 py-5"
                  style={{ borderBottom: '1px solid rgba(184,152,72,0.12)' }}>
                  <div>
                    <p className="display-heading text-text" style={{ fontSize: '0.75rem', letterSpacing: '0.12em' }}>
                      {lang === 'es' ? 'MATERIALES' : 'MATERIALS'}
                    </p>
                    <p className="label-luxury mt-0.5" style={{ fontSize: '0.5rem', color: 'rgba(184,152,72,0.6)' }}>
                      {lang === 'es' ? 'Vivienda' : 'Unit'} {unit.id}
                    </p>
                  </div>
                  <button onClick={() => setPanelOpen(false)} data-cursor="hover"
                    className="transition-colors duration-300"
                    style={{ color: 'rgba(244,241,234,0.35)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,241,234,0.35)'}>
                    <X size={16} />
                  </button>
                </div>

                {/* Material categories */}
                <div className="flex flex-col gap-6 px-6 py-6">
                  {Object.entries(MATERIAL_LABELS).map(([cat, labels]) => {
                    const opts = materials?.[cat] ?? []
                    const catLabel = lang === 'es' ? labels.es : labels.en
                    return (
                      <div key={cat}>
                        <p className="label-luxury mb-3" style={{ fontSize: '0.55rem', color: 'rgba(184,152,72,0.7)', letterSpacing: '0.18em' }}>
                          {catLabel.toUpperCase()}
                        </p>
                        <div className="flex flex-col gap-1.5">
                          {opts.map(opt => {
                            const isSelected = selected[cat] === opt.id
                            return (
                              <button key={opt.id}
                                onClick={() => setSelected(s => ({ ...s, [cat]: opt.id }))}
                                data-cursor="hover"
                                className="flex items-center gap-3 px-3 py-2.5 transition-all duration-200"
                                style={{
                                  border: '1px solid',
                                  borderColor: isSelected ? 'rgba(184,152,72,0.5)' : 'rgba(184,152,72,0.1)',
                                  backgroundColor: isSelected ? 'rgba(184,152,72,0.06)' : 'transparent',
                                }}>
                                <div className="w-6 h-6 flex-shrink-0"
                                  style={{ backgroundColor: opt.swatch, border: '1px solid rgba(244,241,234,0.15)' }} />
                                <span className="flex-1 text-left label-luxury"
                                  style={{ fontSize: '0.6rem', color: isSelected ? 'var(--color-text)' : 'var(--color-text-muted)' }}>
                                  {lang === 'es' ? opt.label : opt.labelEN}
                                </span>
                                {isSelected && <Check size={12} color="var(--color-accent)" />}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Confirm & reserve */}
                <div className="mt-auto px-6 py-6" style={{ borderTop: '1px solid rgba(184,152,72,0.12)' }}>
                  <button
                    onClick={() => navigate('/decision')}
                    data-cursor="hover"
                    className="w-full label-luxury py-3 transition-all duration-300"
                    style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-bg)', fontSize: '0.62rem', letterSpacing: '0.15em' }}
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
