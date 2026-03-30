import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LoadingDots from '../ui/LoadingDots'
import ModelViewer from './ModelViewer'
import MaterialSelector from './MaterialSelector'
import { useLang } from '../../context/LangContext'

const CONNECTION_TIMEOUT = 6000

export default function PixelStreamingViewer({ space }) {
  const { t } = useLang()
  const containerRef = useRef(null)
  const psRef = useRef(null)
  const [status, setStatus] = useState('connecting') // connecting | streaming | fallback
  const streamUrl = space.psStreamUrl

  useEffect(() => {
    if (!streamUrl) {
      setStatus('fallback')
      return
    }

    let cancelled = false
    const timeout = setTimeout(() => {
      if (!cancelled) setStatus('fallback')
    }, CONNECTION_TIMEOUT)

    async function initPS() {
      try {
        // Dynamically import Epic's PS frontend library
        // Install with: npm install @epicgames-ps/lib-pixelstreamingfrontend-ue5.5
        const { PixelStreaming, Config } = await import(
          '@epicgames-ps/lib-pixelstreamingfrontend-ue5.5'
        )

        if (cancelled) return

        const config = new Config({
          initialSettings: {
            AutoPlayVideo: true,
            AutoConnect: true,
            ss: streamUrl,
            StartVideoMuted: true,
          },
        })

        const ps = new PixelStreaming(config)
        psRef.current = ps

        ps.addEventListener('streamReady', () => {
          if (!cancelled) {
            clearTimeout(timeout)
            setStatus('streaming')
          }
        })

        ps.addEventListener('webRtcFailed', () => {
          if (!cancelled) setStatus('fallback')
        })

        if (containerRef.current) {
          containerRef.current.appendChild(ps.videoElementParent)
        }
      } catch {
        if (!cancelled) setStatus('fallback')
      }
    }

    initPS()

    return () => {
      cancelled = true
      clearTimeout(timeout)
      try { psRef.current?.disconnect?.() } catch {}
    }
  }, [streamUrl])

  // Expose sendToUnreal for child components
  function sendToUnreal(descriptor) {
    try {
      psRef.current?.emitUIInteraction(descriptor)
    } catch (e) {
      console.warn('[PS] emitUIInteraction failed:', e)
    }
  }

  function handleMaterialSelect(mat) {
    sendToUnreal({ action: 'changeMaterial', materialId: mat.id })
  }

  const showFallback = status === 'fallback'
  const showStream = status === 'streaming'
  const showLoading = status === 'connecting'

  return (
    <div>
      {/* PS container / fallback */}
      <div className="relative" style={{ height: '60vh' }}>
        {/* Pixel Streaming video container */}
        {!showFallback && (
          <div
            ref={containerRef}
            className="ps-container w-full h-full"
            style={{ display: showStream ? 'block' : 'none' }}
          />
        )}

        {/* GLTF fallback */}
        {showFallback && space.model && (
          <ModelViewer space={space} />
        )}
        {showFallback && !space.model && (
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ backgroundColor: '#F0EAE0' }}
          >
            <p className="label-luxury text-gold/50" style={{ fontSize: '0.6rem' }}>
              {t('ps_unavailable')}
            </p>
          </div>
        )}

        {/* Loading overlay */}
        <AnimatePresence>
          {showLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              style={{ backgroundColor: '#F0EAE0' }}
            >
              <LoadingDots />
              <p className="label-luxury text-gold/60" style={{ fontSize: '0.6rem' }}>
                {t('ps_connecting')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fallback notice */}
        {showFallback && space.model && (
          <div
            className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none"
          >
            <p className="label-luxury" style={{ color: 'rgba(200,160,122,0.5)', fontSize: '0.55rem' }}>
              {t('ps_fallback')}
            </p>
          </div>
        )}
      </div>

      {/* Material selector — sends events to Unreal (or shows without action in fallback) */}
      {space.materials?.length > 0 && (
        <div className="mt-6 px-2">
          <MaterialSelector
            materials={space.materials}
            onSelect={showStream ? handleMaterialSelect : undefined}
            disabled={!showStream}
          />
        </div>
      )}
    </div>
  )
}
