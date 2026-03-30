import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang } from '../../context/LangContext'

export default function SpaceCard({ space, index }) {
  const navigate = useNavigate()
  const { lang, t } = useLang()

  const label     = (lang === 'es' ? space.label : space.labelEN) ?? space.label
  const typeLabel = t(`space_type_${space.type}`)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.43, 0.13, 0.23, 0.96] }}
      onClick={() => navigate(`/space/${space.id}`)}
      data-cursor="hover"
      className="flex-shrink-0 group"
      style={{ width: 'clamp(150px, 42vw, 200px)' }}
    >
      {/* Photo */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-bg-card)' }}
      >
        <img
          src={space.thumbnail}
          alt={label}
          className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          onError={e => { e.target.style.display = 'none' }}
        />
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-3 sm:p-4"
          style={{ background: 'linear-gradient(to top, rgba(26,33,48,0.7) 0%, transparent 60%)' }}
        >
          <span className="label-luxury text-text/70" style={{ fontSize: '0.55rem' }}>
            {t('nav_explore')} →
          </span>
        </div>
      </div>

      {/* Gold accent line */}
      <div className="h-px" style={{ background: 'linear-gradient(to right, var(--color-accent), transparent)', opacity: 0.5 }} />

      {/* Text */}
      <div className="pt-3 sm:pt-4 pb-2">
        <p className="label-luxury mb-1.5 sm:mb-2" style={{ color: 'var(--color-accent)', opacity: 0.6, fontSize: '0.55rem' }}>
          {typeLabel}
        </p>
        <p
          className="font-sans font-light text-text group-hover:text-accent transition-colors duration-500"
          style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.85rem)', letterSpacing: '0.07em', textTransform: 'uppercase' }}
        >
          {label ?? ''}
        </p>
      </div>
    </motion.div>
  )
}
