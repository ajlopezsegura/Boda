import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
}

const transition = {
  duration: 0.8,
  ease: [0.43, 0.13, 0.23, 0.96],
}

export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}
