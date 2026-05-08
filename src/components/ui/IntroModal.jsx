import { useEffect, useState } from 'react'
import { useLang } from '../../context/LangContext'
import JourneyModal from './JourneyModal'

const STORAGE_KEY = 'tvbs_seen_intro_v1'

const COPY = {
  es: {
    eyebrow: 'CASO DEMO',
    title:   'LA FORMA VISIBLE\nDEL VALOR',
    body: [
      'TVBS diseña sistemas de venta visual para proyectos de alto valor: estrategia, dirección visual e inteligencia comercial reunidas en una misma experiencia.',
      'Pensado para defender valor, alinear equipos y acelerar procesos de decisión.',
    ],
    button:  'ENTRAR EN LA DEMO',
    caption: 'Caso demo construido íntegramente por TVBS.',
  },
  en: {
    eyebrow: 'DEMO CASE',
    title:   'THE VISIBLE FORM\nOF VALUE',
    body: [
      'TVBS designs visual sales systems for high-value projects: strategy, visual direction and commercial intelligence brought together in a single experience.',
      'Built to defend value, align teams and accelerate decision processes.',
    ],
    button:  'ENTER THE DEMO',
    caption: 'Demo case built entirely by TVBS.',
  },
}

export default function IntroModal() {
  const { lang } = useLang()
  const [open, setOpen] = useState(false)
  const t = COPY[lang] ?? COPY.es

  useEffect(() => {
    // TODO: re-enable once-per-visitor by checking localStorage[STORAGE_KEY]
    const id = setTimeout(() => setOpen(true), 600)
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
      studioMark
      eyebrow={t.eyebrow}
      title={t.title}
      body={t.body}
      button={t.button}
      caption={t.caption}
    />
  )
}
