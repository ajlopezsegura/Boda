import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import weddingES from '../data/wedding'
import weddingEN from '../data/wedding.en'

/* Textos de interfaz. El contenido de la boda vive en data/wedding(.en).js */
const UI = {
  es: {
    nav:        { historia: 'Historia', dia: 'El día', viaje: 'Viaje', info: 'Tasas', rsvp: 'Confirmar' },
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
    or:         'o',
    firstBus:   'Primera salida',
    lastBus:    'Segunda salida',
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
      info:  ['Tasas de ', 'vuelo'],
      rsvp:  ['Confirma tu ', 'asistencia'],
    },
    subtitles: {
      dia:   'Dos escalas, un mismo destino: de la iglesia de San Bartolomé al Claustro de Vandelvira.',
      viaje: 'Dónde dormir, cómo moverte por Jaén y qué ver si te quedas unos días.',
      info:  '',
      rsvp:  'Nos encantaría contar con vuestra presencia ese día. Decidnos si podéis acompañarnos: saberlo con tiempo nos ayuda a organizarlo todo con cariño.',
    },
    hotelsIntro: 'Hemos acordado condiciones especiales con una selección de hoteles en Jaén para que tu estancia sea lo más cómoda posible. Debido a las fechas del evento y a la disponibilidad de los alojamientos, recomendamos realizar las reservas cuanto antes.',
    form: {
      name: 'Nombre y apellidos', namePh: 'Tu nombre', nameErr: 'Dinos tu nombre',
      coming: '¿Nos acompañas?', yes: 'Sí, allí estaré', no: 'No podré ir',
      companionQ: '¿Vienes con acompañante?', simpleYes: 'Sí', simpleNo: 'No',
      companionName: 'Nombre del acompañante', companionPh: 'Nombre y apellidos',
      returnQ: '¿En qué autobús de vuelta?',
      busQ: '¿Necesitas autobús?',
      busBoth: 'Ida y vuelta', busOut: 'Solo ida', busBack: 'Solo vuelta', busNone: 'No lo necesito',
      diet: 'Alergias o intolerancias', dietPh: 'Gluten, lactosa, frutos secos…',
      message: 'Mensaje para los novios', messagePh: 'Escríbeles algo bonito…',
      send: 'Enviar',
      sending: 'Enviando…',
      errorText: 'No hemos podido enviar la confirmación. Vuelve a intentarlo o mándanosla por correo.',
      errorMail: 'Enviar por correo',
      doubts: '¿Dudas? Llámanos:',
      sentEyebrow: 'Embarque confirmado',
      sentTitle: 'Gracias por volar con nosotros',
      sentText: 'Nos hace muchísima ilusión que vengáis. Esto es lo que queda para embarcar en el primer día del resto de nuestras vidas.',
      sentBack: 'Volver al formulario',
    },
  },
  en: {
    nav:        { historia: 'Our story', dia: 'The day', viaje: 'Stay', info: 'Fees', rsvp: 'RSVP' },
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
    or:         'or',
    firstBus:   'First departure',
    lastBus:    'Second departure',
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
      info:  ['Flight ', 'fees'],
      rsvp:  ['Confirm your ', 'attendance'],
    },
    subtitles: {
      dia:   'Two stops, one destination: from the Church of San Bartolomé to the Claustro de Vandelvira.',
      viaje: 'Where to stay, how to get around Jaén and what to see if you stay a few days.',
      info:  '',
      rsvp:  'We would love to have you with us that day. Let us know whether you can join us — hearing early helps us get everything ready properly.',
    },
    hotelsIntro: 'We have agreed special rates with a selection of hotels in Jaén to make your stay as comfortable as possible. Given the dates and how much availability there is, we recommend booking as early as you can.',
    form: {
      name: 'Full name', namePh: 'Your name', nameErr: 'Please tell us your name',
      coming: 'Will you join us?', yes: 'Yes, I will be there', no: 'I cannot make it',
      companionQ: 'Are you bringing someone?', simpleYes: 'Yes', simpleNo: 'No',
      companionName: 'Their name', companionPh: 'Full name',
      returnQ: 'Which return coach?',
      busQ: 'Do you need the coach?',
      busBoth: 'Both ways', busOut: 'Outbound only', busBack: 'Return only', busNone: 'I don’t need it',
      diet: 'Allergies or intolerances', dietPh: 'Gluten, lactose, nuts…',
      message: 'A message for the couple', messagePh: 'Write them something nice…',
      send: 'Send',
      sending: 'Sending…',
      errorText: 'We could not send your reply. Please try again, or send it to us by email.',
      errorMail: 'Send by email',
      doubts: 'Any questions? Call us:',
      sentEyebrow: 'Boarding confirmed',
      sentTitle: 'Thank you for flying with us',
      sentText: 'We are so happy you are coming. This is what is left before boarding the first day of the rest of our lives.',
      sentBack: 'Back to the form',
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
