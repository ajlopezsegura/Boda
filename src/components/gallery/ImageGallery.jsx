import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import GalleryThumb from './GalleryThumb'
import { useLang } from '../../context/LangContext'

export default function ImageGallery({ images }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const { lang } = useLang()

  const slides = images.map(img => ({
    src: img.src,
    alt: lang === 'es' ? img.caption : (img.captionEN ?? img.caption),
  }))

  function openAt(i) { setIndex(i); setOpen(true) }

  return (
    <>
      <div
        className="grid gap-2 sm:gap-3"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))' }}
      >
        {images.map((img, i) => (
          <GalleryThumb
            key={img.src}
            image={{ ...img, caption: lang === 'es' ? img.caption : (img.captionEN ?? img.caption) }}
            index={i}
            onClick={() => openAt(i)}
          />
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        styles={{ container: { backgroundColor: 'rgba(26,33,48,0.97)' } }}
      />
    </>
  )
}
