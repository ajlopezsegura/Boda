import { motion } from 'framer-motion'

export default function GalleryThumb({ image, index, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.06, ease: [0.43, 0.13, 0.23, 0.96] }}
      onClick={onClick}
      data-cursor="hover"
      className="relative overflow-hidden group"
      style={{ aspectRatio: '4/5', backgroundColor: 'var(--paper-deep)', border: '1px solid var(--hairline)' }}
    >
      <img
        src={image.src}
        alt={image.caption}
        className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
        loading="lazy"
        onError={e => { e.target.style.display = 'none' }}
      />
      <div
        className="absolute inset-0 flex items-end p-3 sm:p-4 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{ background: 'linear-gradient(to top, rgba(30,42,68,0.72) 0%, transparent 55%)' }}
      >
        <p className="eyebrow" style={{ color: '#F4F0E7', fontSize: '0.5rem', letterSpacing: '0.16em' }}>
          {image.caption}
        </p>
      </div>
    </motion.div>
  )
}
