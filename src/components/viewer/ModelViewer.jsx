import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import ModelScene from './ModelScene'
import LoadingDots from '../ui/LoadingDots'
import { useLang } from '../../context/LangContext'

function HintOverlay({ text }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 3500)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <p className="label-luxury" style={{ color: 'rgba(200,160,122,0.7)', fontSize: '0.55rem' }}>
            {text}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function ModelViewer({ space }) {
  const { t } = useLang()
  const config = space.modelConfig ?? {}
  const camPos = config.cameraPosition ?? [3, 2, 5]
  const env = config.environment ?? 'apartment'

  return (
    <div
      className="relative w-full rounded-none overflow-hidden"
      style={{ height: '60vh', backgroundColor: '#F0EAE0' }}
    >
      <Canvas
        camera={{ position: camPos, fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />

        <Suspense fallback={null}>
          <ModelScene path={space.model} />
          <Environment preset={env} />
        </Suspense>

        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          autoRotate={false}
          minDistance={1}
          maxDistance={20}
          makeDefault
        />
      </Canvas>

      {/* Loading overlay */}
      <div
        id={`loader-${space.id}`}
        className="absolute inset-0 flex items-center justify-center bg-sand/60 pointer-events-none"
        style={{ transition: 'opacity 0.6s ease' }}
      >
        <LoadingDots />
      </div>

      <HintOverlay text={t('model_hint')} />
    </div>
  )
}
