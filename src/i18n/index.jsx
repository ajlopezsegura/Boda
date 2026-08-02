import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import weddingES from '../data/wedding'
import weddingEN from '../data/wedding.en'

/* Textos de interfaz. El contenido de la boda vive en data/wedding(.en).js */
const UI = {
  es: {
    nav:        { historia: 'Historia', dia: 'El día', viaje: 'Viaje', info: 'Info', rsvp: 'Confirmar' },
    openMenu:   'Abrir menú',
    closeMenu:  'Cerrar menú',
    nextStop:   'Siguiente parada',
    backHome:   'Volver al inicio',
    swipe:      'Desliza',
    continue:   'Continuar',
    viewMap:    'Ver en el mapa',
    view:       'Ver',
    diary:      'Diario',
    ourStory:   'Nuestra historia',
    timing:     'Timing del evento',
    bus:        'Autobús',
    busBack:    'Vuelta a Jaén',
    firstBus:   'Primera salida',
    lastBus:    'Última salida',
    whereSleep: 'Dónde dormir',
    movingJaen: 'Moverse por Jaén',
    discover:   'Descubre Jaén',
    bookingCode:'Código de reserva',
    book:       'Reservar',
    howToBook:  'Cómo reservar',
    whatsapp:   'WhatsApp',
    previous:   'Anterior',
    next:       'Siguiente',
    dressCode:  'Dress code',
    gift:       'El aterrizaje',
    copyAccount:'Copiar cuenta',
    copied:     'Copiado',
    countdown:  { days: 'días', day: 'día', hours: 'horas', min: 'min', sec: 'seg', today: '¡Hoy es el día!' },
    titles: {
      dia:   ['El gran ', 'día'],
      viaje: ['El ', 'viaje'],
      info:  ['Instrucciones de ', 'vuelo'],
      rsvp:  ['Confirma tu ', 'asistencia'],
    },
    subtitles: {
      dia:   'Dos escalas, un mismo destino: de la iglesia de San Bartolomé al Claustro de Vandelvira.',
      viaje: 'Dónde dormir, cómo moverte por Jaén y qué ver si te quedas unos días.',
      info:  'Los detalles que te ayudarán a disfrutar del día sin sorpresas.',
      rsvp:  'Nos encantaría contar con vuestra presencia ese día. Decidnos si podéis acompañarnos: saberlo con tiempo nos ayuda a organizarlo todo con cariño.',
    },
    hotelsIntro: 'Estos hoteles de Jaén nos ofrecen condiciones especiales. Las plazas son limitadas y pueden agotarse, así que mejor no dejarlo para el final.',
    form: {
      name: 'Nombre y apellidos', namePh: 'Tu nombre', nameErr: 'Dinos tu nombre',
      coming: '¿Nos acompañas?', yes: 'Sí, allí estaré', no: 'No podré ir',
      guests: '¿Cuántos acompañantes?',
      companion: n => `Acompañante ${n}`, companionPh: 'Nombre y apellidos',
      busQ: '¿Necesitas autobús?',
      busBoth: 'Ida y vuelta', busOut: 'Solo ida', busBack: 'Solo vuelta', busNone: 'No lo necesito',
      diet: 'Alergias o intolerancias', dietPh: 'Vegetariano, celíaco, frutos secos…',
      message: 'Mensaje para los novios (opcional)', messagePh: 'Escríbeles algo bonito…',
      send: 'Enviar',
      hint: 'Se abrirá tu app de correo con el mensaje ya escrito · solo tienes que enviarlo',
      doubts: '¿Dudas? Llámanos:',
    },
  },
  en: {
    nav:        { historia: 'Our story', dia: 'The day', viaje: 'Stay', info: 'Info', rsvp: 'RSVP' },
    openMenu:   'Open menu',
    closeMenu:  'Close menu',
    nextStop:   'Next stop',
    backHome:   'Back to start',
    swipe:      'Swipe',
    continue:   'Continue',
    viewMap:    'View on the map',
    view:       'Visit',
    diary:      'Diary',
    ourStory:   'Our story',
    timing:     'Schedule',
    bus:        'Coach',
    busBack:    'Back to Jaén',
    firstBus:   'First departure',
    lastBus:    'Last departure',
    whereSleep: 'Where to stay',
    movingJaen: 'Getting around Jaén',
    discover:   'Discover Jaén',
    bookingCode:'Booking code',
    book:       'Book',
    howToBook:  'How to book',
    whatsapp:   'WhatsApp',
    previous:   'Previous',
    next:       'Next',
    dressCode:  'Dress code',
    gift:       'The landing',
    copyAccount:'Copy account number',
    copied:     'Copied',
    countdown:  { days: 'days', day: 'day', hours: 'hours', min: 'min', sec: 'sec', today: 'Today is the day!' },
    titles: {
      dia:   ['The big ', 'day'],
      viaje: ['The ', 'stay'],
      info:  ['Flight ', 'instructions'],
      rsvp:  ['Confirm your ', 'attendance'],
    },
    subtitles: {
      dia:   'Two stops, one destination: from the Church of San Bartolomé to the Claustro de Vandelvira.',
      viaje: 'Where to stay, how to get around Jaén and what to see if you stay a few days.',
      info:  'The details that will help you enjoy the day without surprises.',
      rsvp:  'We would love to have you with us that day. Let us know whether you can join us — hearing early helps us get everything ready properly.',
    },
    hotelsIntro: 'These hotels in Jaén are offering us special rates. Availability is limited and may run out, so it is best not to leave it too late.',
    form: {
      name: 'Full name', namePh: 'Your name', nameErr: 'Please tell us your name',
      coming: 'Will you join us?', yes: 'Yes, I will be there', no: 'I cannot make it',
      guests: 'How many people are coming with you?',
      companion: n => `Guest ${n}`, companionPh: 'Full name',
      busQ: 'Do you need the coach?',
      busBoth: 'Both ways', busOut: 'Outbound only', busBack: 'Return only', busNone: 'I don’t need it',
      diet: 'Allergies or intolerances', dietPh: 'Vegetarian, coeliac, nuts…',
      message: 'A message for the couple (optional)', messagePh: 'Write them something nice…',
      send: 'Send',
      hint: 'Your mail app will open with the message ready · you only have to send it',
      doubts: 'Any questions? Call us:',
    },
  },
}

const DATA = { es: weddingES, en: weddingEN }
const STORAGE_KEY = 'boda-lang'

function detectar() {
  if (typeof window === 'undefined') return 'es'
  const guardado = window.localStorage?.getItem(STORAGE_KEY)
  if (guardado === 'es' || guardado === 'en') return guardado
  // Si el navegador no está en español, se abre en inglés
  const nav = (navigator.language || 'es').toLowerCase()
  return nav.startsWith('es') ? 'es' : 'en'
}

const LangContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectar)

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, lang) } catch { /* modo privado */ }
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(
    () => ({ lang, setLang, t: UI[lang], wedding: DATA[lang] }),
    [lang]
  )

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang debe usarse dentro de LanguageProvider')
  return ctx
}
