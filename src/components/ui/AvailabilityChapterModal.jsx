import { useEffect, useState } from 'react'
import { useLang } from '../../context/LangContext'
import JourneyModal from './JourneyModal'

const STORAGE_KEY = 'tvbs_seen_chapter_availability_v1'

const COPY = {
  es: {
    eyebrow: 'CAPÍTULO 02',
    title:   'DE LA DISPONIBILIDAD\nA LA COMPARACIÓN',
    body: [
      'Antes de elegir una vivienda, el comprador necesita entender el conjunto.',
      'La disponibilidad se convierte así en una lectura clara del proyecto: qué opciones existen, qué ritmo tiene la comercialización y qué opciones merece la pena comparar.',
      'El objetivo no es mostrar más información, sino ordenar la decisión: reducir ruido, hacer visibles las diferencias reales y preparar una elección con más criterio.',
    ],
    button:  'SELECCIONA 3 VIVIENDAS Y COMPÁRALAS',
  },
  en: {
    eyebrow: 'CHAPTER 02',
    title:   'FROM AVAILABILITY\nTO COMPARISON',
    body: [
      'Before choosing a residence, the buyer needs to understand the whole.',
      'Availability becomes a clear reading of the project: what options exist, the pace of sales, and which ones are worth comparing.',
      'The goal is not to show more information, but to order the decision: reduce noise, surface real differences and prepare a more considered choice.',
    ],
    button:  'SELECT 3 RESIDENCES TO COMPARE',
  },
}

export default function AvailabilityChapterModal() {
  const { lang } = useLang()
  const [open, setOpen] = useState(false)
  const t = COPY[lang] ?? COPY.es

  useEffect(() => {
    // TODO: re-enable once-per-visitor by checking localStorage[STORAGE_KEY]
    const id = setTimeout(() => setOpen(true), 500)
    return () => clearTimeout(id)
  }, [])

  function dismiss() {
    // localStorage write skipped during testing so the modal returns on reload
    setOpen(false)
  }

  return (
    <JourneyModal
      open={open}
      onClose={dismiss}
      eyebrow={t.eyebrow}
      title={t.title}
      body={t.body}
      button={t.button}
    />
  )
}
