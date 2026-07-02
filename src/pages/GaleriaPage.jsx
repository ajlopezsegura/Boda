import PageScaffold from '../components/layout/PageScaffold'
import ImageGallery from '../components/gallery/ImageGallery'
import wedding from '../data/wedding'

export default function GaleriaPage() {
  return (
    <PageScaffold
      index="04"
      eyebrow="Álbum"
      title="Galería"
      subtitle="Un puñado de destinos, estaciones y atardeceres que nos han traído hasta aquí."
      maxWidth={1040}
    >
      <ImageGallery images={wedding.gallery} />
    </PageScaffold>
  )
}
