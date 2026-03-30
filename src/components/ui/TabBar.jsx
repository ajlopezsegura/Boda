import { motion } from 'framer-motion'

export default function TabBar({ tabs, active, onChange }) {
  return (
    <div
      className="flex items-center gap-8"
      style={{ borderBottom: '1px solid rgba(184,152,72,0.15)' }}
    >
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          data-cursor="hover"
          className="relative pb-4 label-luxury text-text transition-colors duration-300"
          style={{ opacity: active === id ? 1 : 0.35 }}
        >
          {label}
          {active === id && (
            <motion.span
              layoutId="tab-underline"
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ backgroundColor: 'var(--color-accent)' }}
              transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            />
          )}
        </button>
      ))}
    </div>
  )
}
