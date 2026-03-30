import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../../context/LangContext'

export default function SpaceCard({ space, index }) {
  const navigate = useNavigate()
  const { lang, t } = useLang()

  const label = lang === 'es' ? space.label : space.labelEN
  const typeLabel = t(`space_type_${space.type}`)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      onClick={() => navigate(`/space/${space.id}`)}
      data-cursor="hover"
      className="flex-shrink-0 group"
      style={{ width: 200 }}
    >
      {/* Photo */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '3/4', backgroundColor: '#E8DFD0' }}
      >
        <img
          src={space.thumbnail}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-luxury group-hover:scale-105"
          onError={e => { e.target.style.display = 'none' }}
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            background: 'linear-gradient(to top, rgba(26,23,20,0.5) 0%, transparent 60%)',
            opacity: 0,
          }}
          ref={el => {
            if (el) {
              const parent = el.closest('[data-cursor="hover"]')
              parent?.addEventListener('mouseenter', () => { el.style.opacity = 1 })
              parent?.addEventListener('mouseleave', () => { el.style.opacity = 0 })
            }
          }}
        />
      </div>

      {/* Gold separator */}
      <div
        className="h-px mt-0 transition-all duration-700"
        style={{
          background: 'linear-gradient(to right, var(--color-gold), transparent)',
          opacity: 0.6,
        }}
      />

      {/* Text */}
      <div className="pt-4 pb-2">
        <p className="label-luxury text-gold/70 mb-2" style={{ fontSize: '0.55rem' }}>
          {typeLabel}
        </p>
        <p
          className="font-serif font-light text-ink transition-colors duration-500 group-hover:text-gold"
          style={{ fontSize: '1rem', letterSpacing: '0.03em' }}
        >
          {label}
        </p>
      </div>
    </motion.div>
  )
}
