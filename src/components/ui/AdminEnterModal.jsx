import { useEffect, useState } from 'react'
import JourneyModal from './JourneyModal'

const STORAGE_KEY = 'tvbs_seen_admin_enter_v1'

const COPY = {
  es: {
    eyebrow: 'PERSPECTIVA COMERCIAL',
    title:   'EL RECORRIDO\nCONVERTIDO EN LECTURA',
    body: [
      'Cada visita deja una huella: qué se ha mirado, cuánto tiempo, qué viviendas generan interés, dónde aparecen dudas y qué decisiones avanzan o se frenan.',
      'El panel transforma ese recorrido en una lectura comercial del proyecto: inventario en movimiento, señales de interés, comportamiento de navegación, leads cualificados y puntos de fricción dentro de la experiencia.',
      'No se trata solo de medir tráfico, sino de entender cómo se está tomando la decisión y qué necesita el equipo comercial para actuar mejor.',
    ],
    button: 'ENTRAR AL PANEL',
  },
  en: {
    eyebrow: 'COMMERCIAL PERSPECTIVE',
    title:   'THE JOURNEY\nTURNED INTO READING',
    body: [
      'Every visit leaves a trace: what was looked at, for how long, which residences generate interest, where doubts appear and which decisions move forward or stall.',
      'The panel turns that journey into a commercial reading of the project: live inventory, interest signals, navigation behaviour, qualified leads and friction points within the experience.',
      'It is not only about measuring traffic, but about understanding how the decision is being made and what the commercial team needs to act better.',
    ],
    button: 'ENTER THE PANEL',
  },
}

export default function AdminEnterModal({ lang = 'es' }) {
  const [open, setOpen] = useState(false)
  const t = COPY[lang] ?? COPY.es

  useEffect(() => {
    // TODO: re-enable once-per-visitor by checking localStorage[STORAGE_KEY]
    const id = setTimeout(() => setOpen(true), 400)
    return () => clearTimeout(id)
  }, [])

  function dismiss() {
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
