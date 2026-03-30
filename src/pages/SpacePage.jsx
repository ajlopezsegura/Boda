import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PageTransition from '../components/layout/PageTransition'
import SpaceHeader from '../components/ui/SpaceHeader'
import TabBar from '../components/ui/TabBar'
import BackButton from '../components/ui/BackButton'
import PixelStreamingViewer from '../components/viewer/PixelStreamingViewer'
import ModelViewer from '../components/viewer/ModelViewer'
import MaterialSelector from '../components/viewer/MaterialSelector'
import ImageGallery from '../components/gallery/ImageGallery'
import VideoPlayer from '../components/media/VideoPlayer'
import { useSpace } from '../context/ProjectContext'
import { useLang } from '../context/LangContext'

const tabFade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
  transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
}

export default function SpacePage() {
  const { id } = useParams()
  const space = useSpace(id)
  const { t } = useLang()

  // Build available tabs dynamically
  const tabs = []
  if (space?.psStreamUrl || space?.model) {
    tabs.push({ id: '3d', label: t('tab_3d') })
  }
  if (space?.images?.length) {
    tabs.push({ id: 'gallery', label: t('tab_gallery') })
  }
  if (space?.video) {
    tabs.push({ id: 'video', label: t('tab_video') })
  }
  tabs.push({ id: 'info', label: t('tab_info') })

  const [activeTab, setActiveTab] = useState(tabs[0]?.id ?? 'info')

  if (!space) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-cream flex items-center justify-center pt-24">
          <p className="label-luxury text-gold/50">Espacio no encontrado</p>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-cream">
        {/* Back button */}
        <div className="pt-28 pb-0 px-10">
          <BackButton />
        </div>

        {/* Space header */}
        <SpaceHeader space={space} />

        {/* Content area */}
        <div className="max-w-5xl mx-auto px-6 pb-24">
          {/* Tab bar */}
          {tabs.length > 1 && (
            <div className="mb-10">
              <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
            </div>
          )}

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} {...tabFade}>

              {/* 3D tab */}
              {activeTab === '3d' && (
                <div>
                  {space.psStreamUrl ? (
                    <PixelStreamingViewer space={space} />
                  ) : (
                    <>
                      <ModelViewer space={space} />
                      {space.materials?.length > 0 && (
                        <div className="mt-6">
                          <MaterialSelector materials={space.materials} disabled />
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Gallery tab */}
              {activeTab === 'gallery' && (
                <ImageGallery images={space.images} />
              )}

              {/* Video tab */}
              {activeTab === 'video' && (
                <VideoPlayer
                  src={space.video}
                  poster={space.thumbnail}
                />
              )}

              {/* Info tab */}
              {activeTab === 'info' && (
                <InfoTab space={space} />
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}

function InfoTab({ space }) {
  const { lang, t } = useLang()
  const label = lang === 'es' ? space.label : space.labelEN
  const description = lang === 'es' ? space.description : space.descriptionEN
  const typeLabel = t(`space_type_${space.type}`)

  return (
    <div className="max-w-xl mx-auto py-8">
      <p className="label-luxury text-gold mb-6">{typeLabel}</p>
      <h2
        className="font-serif italic font-light text-ink mb-8"
        style={{ fontSize: '2.2rem', lineHeight: 1.2 }}
      >
        {label}
      </h2>
      <div className="gold-rule mb-8" />
      <p
        className="font-serif font-light text-ink/75"
        style={{ fontSize: '1.1rem', lineHeight: 2.0 }}
      >
        {description}
      </p>

      {/* Materials list */}
      {space.materials?.length > 0 && (
        <div className="mt-12">
          <p className="label-luxury text-gold/70 mb-4" style={{ fontSize: '0.6rem' }}>
            {t('materials_title')}
          </p>
          <div className="flex flex-col gap-3">
            {space.materials.map(mat => {
              const matLabel = lang === 'es' ? mat.label : mat.labelEN
              return (
                <div key={mat.id} className="flex items-center gap-4">
                  <div
                    className="rounded-full flex-shrink-0"
                    style={{ width: 16, height: 16, backgroundColor: mat.swatch, border: '1px solid rgba(200,160,122,0.3)' }}
                  />
                  <span className="font-serif font-light text-ink/70" style={{ fontSize: '0.9rem' }}>
                    {matLabel}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
