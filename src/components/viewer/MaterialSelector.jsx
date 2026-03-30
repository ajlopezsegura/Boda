import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLang } from '../../context/LangContext'

export default function MaterialSelector({ materials, onSelect, disabled = false }) {
  const [active, setActive] = useState(materials[0]?.id ?? null)
  const { lang, t } = useLang()

  function handleSelect(mat) {
    setActive(mat.id)
    onSelect?.(mat)
  }

  return (
    <div className="mt-6">
      <p className="label-luxury text-gold/70 mb-4" style={{ fontSize: '0.6rem' }}>
        {t('materials_title')}
      </p>
      <div className="flex flex-wrap gap-4">
        {materials.map(mat => {
          const label = lang === 'es' ? mat.label : mat.labelEN
          const isActive = mat.id === active

          return (
            <button
              key={mat.id}
              onClick={() => !disabled && handleSelect(mat)}
              data-cursor="hover"
              className="flex flex-col items-center gap-2 group"
              disabled={disabled}
            >
              {/* Swatch circle */}
              <div
                className="rounded-full transition-all duration-500"
                style={{
                  width: 28,
                  height: 28,
                  backgroundColor: mat.swatch,
                  border: isActive
                    ? '2px solid var(--color-gold)'
                    : '2px solid transparent',
                  outline: isActive ? 'none' : '1px solid rgba(200,160,122,0.3)',
                  boxShadow: isActive ? '0 0 0 3px rgba(200,160,122,0.15)' : 'none',
                }}
              />
              {/* Label */}
              <span
                className="label-luxury transition-colors duration-300"
                style={{
                  fontSize: '0.55rem',
                  color: isActive ? 'var(--color-gold)' : 'rgba(26,23,20,0.5)',
                  maxWidth: 64,
                  textAlign: 'center',
                  lineHeight: 1.4,
                }}
              >
                {label}
              </span>

              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  layoutId="mat-indicator"
                  className="h-px bg-gold"
                  style={{ width: 20 }}
                  transition={{ duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
