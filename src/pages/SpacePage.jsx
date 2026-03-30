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
  const { lang, t } = useLang()

  // Hooks must be called unconditionally — compute tabs safely
  const tabs = space ? buildTabs(space, t) : [{ id: 'info', label: t('tab_info') }]
  const [activeTab, setActiveTab] = useState(() => tabs[0]?.id ?? 'info')

  if (!space) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center pt-24" style={{ backgroundColor: 'var(--color-bg)' }}>
          <p className="label-luxury" style={{ color: 'var(--color-accent)', opacity: 0.5 }}>
            {t('space_not_found')}
          </p>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
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
                <VideoPlayer src={space.video} poster={space.thumbnail} />
              )}

              {/* Info tab */}
              {activeTab === 'info' && (
                <InfoTab space={space} lang={lang} t={t} />
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  )
}

function buildTabs(space, t) {
  const tabs = []
  if (space.psStreamUrl || space.model) tabs.push({ id: '3d',      label: t('tab_3d') })
  if (space.images?.length)             tabs.push({ id: 'gallery', label: t('tab_gallery') })
  if (space.video)                      tabs.push({ id: 'video',   label: t('tab_video') })
  tabs.push({ id: 'info', label: t('tab_info') })
  return tabs
}

function InfoTab({ space, lang, t }) {
  const label       = (lang === 'es' ? space.label       : space.labelEN)       ?? space.label
  const description = (lang === 'es' ? space.description : space.descriptionEN) ?? space.description
  const typeLabel   = t(`space_type_${space.type}`)

  return (
    <div className="max-w-xl mx-auto py-8">
      <p className="label-luxury mb-6" style={{ color: 'var(--color-accent)' }}>{typeLabel}</p>
      <h2
        className="display-heading text-text mb-8"
        style={{ fontSize: '2rem', letterSpacing: '0.08em' }}
      >
        {label?.toUpperCase()}
      </h2>
      <div className="accent-rule mb-8" />
      <p className="font-sans font-light" style={{ fontSize: '1.05rem', lineHeight: 2.0, color: 'var(--color-text-muted)' }}>
        {description}
      </p>

      {space.materials?.length > 0 && (
        <div className="mt-12">
          <p className="label-luxury mb-4" style={{ color: 'var(--color-accent)', opacity: 0.6, fontSize: '0.6rem' }}>
            {t('materials_title')}
          </p>
          <div className="flex flex-col gap-3">
            {space.materials.map(mat => {
              const matLabel = (lang === 'es' ? mat.label : mat.labelEN) ?? mat.label
              return (
                <div key={mat.id} className="flex items-center gap-4">
                  <div
                    className="rounded-full flex-shrink-0"
                    style={{ width: 16, height: 16, backgroundColor: mat.swatch, border: '1px solid rgba(184,152,72,0.3)' }}
                  />
                  <span className="font-sans font-light text-text/70" style={{ fontSize: '0.9rem' }}>
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
