import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import JourneyModal from './JourneyModal'

const STORAGE_KEY = 'tvbs_seen_chapter_decision_v1'

const COPY = {
  es: {
    eyebrow: 'CAPÍTULO 06',
    title:   'DE LA DECISIÓN\nAL CONTACTO\nCUALIFICADO',
    body: [
      'El recorrido termina donde empieza la conversación comercial.',
      'Antes de contactar, la experiencia devuelve al comprador una síntesis clara de su decisión: la vivienda elegida, las preferencias configuradas y aquello que hizo que esa opción destacara frente al resto.',
      'Lo que sigue ya no pertenece solo al comprador. Cada interacción deja contexto, intención y señales de decisión que ayudan al equipo comercial a entender qué necesita cada lead antes de la primera llamada.',
    ],
    button:  'ENTRAR EN EL PANEL DE GESTIÓN',
  },
  en: {
    eyebrow: 'CHAPTER 06',
    title:   'FROM DECISION\nTO QUALIFIED\nCONTACT',
    body: [
      'The journey ends where the commercial conversation begins.',
      'Before getting in touch, the experience returns to the buyer a clear synthesis of their decision: the chosen residence, the configured preferences and what made that option stand out from the rest.',
      'What follows no longer belongs to the buyer alone. Every interaction leaves context, intent and decision signals that help the commercial team understand what each lead needs before the first call.',
    ],
    button:  'ENTER THE MANAGEMENT PANEL',
  },
}

export default function DecisionChapterModal() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const t = COPY[lang] ?? COPY.es

  useEffect(() => {
    // TODO: re-enable once-per-visitor by checking localStorage[STORAGE_KEY]
    const id = setTimeout(() => setOpen(true), 500)
    return () => clearTimeout(id)
  }, [])

  function dismiss() {
    setOpen(false)
  }

  function confirm() {
    setOpen(false)
    navigate('/admin')
  }

  return (
    <JourneyModal
      open={open}
      onClose={dismiss}
      onConfirm={confirm}
      eyebrow={t.eyebrow}
      title={t.title}
      body={t.body}
      button={t.button}
    />
  )
}
