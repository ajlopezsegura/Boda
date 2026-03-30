import { useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

export default function VideoPlayer({ src, poster }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else          { v.pause(); setPlaying(false) }
  }

  function toggleMute() {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <div
      className="relative w-full overflow-hidden group"
      style={{ aspectRatio: '16/9', backgroundColor: '#1A1714' }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        loop
        className="w-full h-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {/* Controls overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to top, rgba(26,23,20,0.6) 0%, transparent 50%)',
          opacity: playing ? 0 : 1,
        }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={togglePlay}
            data-cursor="hover"
            className="flex items-center gap-3 group/btn"
          >
            <div
              className="flex items-center justify-center rounded-full border border-cream/40 transition-all duration-500 group-hover/btn:border-gold group-hover/btn:bg-gold/10"
              style={{ width: 48, height: 48 }}
            >
              {playing
                ? <Pause size={16} color="#F5F0E8" strokeWidth={1.5} />
                : <Play  size={16} color="#F5F0E8" strokeWidth={1.5} fill="#F5F0E8" />
              }
            </div>
          </button>

          <button
            onClick={toggleMute}
            data-cursor="hover"
            className="transition-opacity duration-300 hover:opacity-70"
          >
            {muted
              ? <VolumeX size={16} color="#F5F0E8" strokeWidth={1.5} />
              : <Volume2 size={16} color="#F5F0E8" strokeWidth={1.5} />
            }
          </button>
        </div>
      </div>

      {/* Click to play/pause anywhere */}
      <div
        className="absolute inset-0"
        onClick={togglePlay}
        style={{ cursor: 'none' }}
        data-cursor="hover"
      />

      {/* Show controls on hover when playing */}
      {playing && (
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-4"
          style={{ background: 'linear-gradient(to top, rgba(26,23,20,0.5) 0%, transparent)' }}
        >
          <button onClick={togglePlay} data-cursor="hover">
            <Pause size={14} color="#F5F0E8" strokeWidth={1.5} />
          </button>
          <button onClick={toggleMute} data-cursor="hover">
            {muted
              ? <VolumeX size={14} color="#F5F0E8" strokeWidth={1.5} />
              : <Volume2 size={14} color="#F5F0E8" strokeWidth={1.5} />
            }
          </button>
        </motion.div>
      )}
    </div>
  )
}
