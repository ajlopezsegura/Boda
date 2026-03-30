import { motion } from 'framer-motion'

export default function GalleryThumb({ image, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.43, 0.13, 0.23, 0.96] }}
      onClick={onClick}
      data-cursor="hover"
      className="relative overflow-hidden group"
      style={{ aspectRatio: '4/3', backgroundColor: 'var(--color-bg-card)' }}
    >
      <img
        src={image.src}
        alt={image.caption}
        className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        loading="lazy"
        onError={e => { e.target.style.display = 'none' }}
      />
      <div
        className="absolute inset-0 flex items-end p-2 sm:p-4 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{ background: 'linear-gradient(to top, rgba(26,33,48,0.5) 0%, transparent 60%)' }}
      >
        <p className="label-luxury text-text/80" style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.65rem)' }}>
          {image.caption}
        </p>
      </div>
    </motion.div>
  )
}
