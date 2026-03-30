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
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit:    { opacity: 0 },
  transition: { duration: 0.3 },
}

export default function SpacePage() {
  const { id } = useParams()
  const space = useSpace(id)
  const { lang, t } = useLang()

  const tabs = space ? buildTabs(space, t) : [{ id: 'info', label: t('tab_info') }]
  const [activeTab, setActiveTab] = useState(() => tabs[0]?.id ?? 'info')

  if (!space) {
    return (
      <PageTransition>
        <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--color-bg)' }}>
          <p className="label-luxury" style={{ color: 'var(--color-accent)', opacity: 0.5 }}>
            {t('space_not_found')}
          </p>
        </div>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* Top bar: back + tabs */}
        <div className="flex-shrink-0 pt-14 sm:pt-16 px-4 sm:px-8">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <BackButton />
            <p className="label-luxury hidden sm:block" style={{ color: 'var(--color-text-muted)', fontSize: '0.55rem' }}>
              {(lang === 'es' ? space.label : space.labelEN)?.toUpperCase()}
            </p>
          </div>
          {tabs.length > 1 && (
            <TabBar tabs={tabs} active={activeTab} onChange={setActiveTab} />
          )}
        </div>

        {/* Content area — fills remaining space */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div key={activeTab} {...tabFade} className="absolute inset-0 top-auto"
              style={{ position: 'relative', height: '100%' }}>

              {activeTab === '3d' && (
                <div className="h-full flex flex-col">
                  {space.psStreamUrl
                    ? <PixelStreamingViewer space={space} />
                    : <ModelViewer space={space} />}
                  {activeTab === '3d' && space.materials?.length > 0 && !space.psStreamUrl && (
                    <div className="flex-shrink-0 px-4 sm:px-8 py-3">
                      <MaterialSelector materials={space.materials} disabled />
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'gallery' && (
                <div className="h-full overflow-y-auto px-4 sm:px-8 py-4 sm:py-6">
                  <ImageGallery images={space.images} />
                </div>
              )}

              {activeTab === 'video' && (
                <div className="h-full flex items-center px-4 sm:px-8 py-4">
                  <VideoPlayer src={space.video} poster={space.thumbnail} />
                </div>
              )}

              {activeTab === 'info' && (
                <div className="h-full overflow-y-auto px-4 sm:px-8 py-4 sm:py-6">
                  <InfoTab space={space} lang={lang} t={t} />
                </div>
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

  return (
    <div className="max-w-xl py-2">
      <p className="label-luxury mb-3" style={{ color: 'var(--color-accent)' }}>
        {t(`space_type_${space.type}`)}
      </p>
      <h2 className="display-heading text-text mb-5"
        style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', letterSpacing: '0.08em' }}>
        {label?.toUpperCase()}
      </h2>
      <div className="accent-rule mb-5" />
      <p className="font-sans font-light"
        style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', lineHeight: 1.9, color: 'var(--color-text-muted)' }}>
        {description}
      </p>

      {space.materials?.length > 0 && (
        <div className="mt-8">
          <p className="label-luxury mb-3" style={{ color: 'var(--color-accent)', opacity: 0.6 }}>
            {t('materials_title')}
          </p>
          <div className="flex flex-col gap-3">
            {space.materials.map(mat => (
              <div key={mat.id} className="flex items-center gap-3">
                <div className="rounded-full flex-shrink-0"
                  style={{ width: 14, height: 14, backgroundColor: mat.swatch, border: '1px solid rgba(184,152,72,0.3)' }} />
                <span className="font-sans font-light text-text/70" style={{ fontSize: '0.9rem' }}>
                  {(lang === 'es' ? mat.label : mat.labelEN) ?? mat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
