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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.43, 0.13, 0.23, 0.96] }}
      onClick={() => navigate(`/space/${space.id}`)}
      data-cursor="hover"
      className="flex-shrink-0 group"
      style={{ width: 'clamp(110px, 28vw, 160px)' }}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden"
        style={{ aspectRatio: '3/4', backgroundColor: 'var(--color-bg-card)' }}>
        <img
          src={space.thumbnail} alt={label}
          className="w-full h-full object-cover transition-transform duration-[1000ms] group-hover:scale-105"
          onError={e => { e.target.style.display = 'none' }}
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-2"
          style={{ background: 'linear-gradient(to top, rgba(26,33,48,0.7) 0%, transparent 60%)' }}>
          <span className="label-luxury text-text/70" style={{ fontSize: '0.5rem' }}>→</span>
        </div>
      </div>

      <div className="h-px" style={{ background: 'linear-gradient(to right, var(--color-accent), transparent)', opacity: 0.4 }} />

      <div className="pt-2 pb-1">
        <p className="label-luxury mb-1" style={{ color: 'var(--color-accent)', opacity: 0.5, fontSize: '0.5rem' }}>
          {typeLabel}
        </p>
        <p className="font-sans font-light text-text group-hover:text-accent transition-colors duration-400"
          style={{ fontSize: 'clamp(0.65rem, 2vw, 0.78rem)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {label ?? ''}
        </p>
      </div>
    </motion.div>
  )
}
