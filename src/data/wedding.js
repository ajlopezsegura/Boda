// ─────────────────────────────────────────────────────────────────────────────
//  BODA PILAR & PABLO — DATOS EDITABLES
//  Todo el contenido de la web vive aquí. Los datos marcados con «REVISAR»
//  provienen de la invitación (pasaporte); confírmalos antes de publicar.
// ─────────────────────────────────────────────────────────────────────────────

const wedding = {
  // ── Pareja y fecha ────────────────────────────────────────────────────────
  couple: {
    bride: 'Pilar',
    groom: 'Pablo',
    brideFull: 'María del Pilar',
    groomFull: 'Pablo Vicente',
    initials: ['P', 'P'],
    hashtag: '#PilarYPablo2026',
  },


  // Fecha y hora de inicio (para la cuenta atrás). Formato: AAAA-MM-DDTHH:MM
  date: '2026-12-12T12:00:00',
  dateLabel: 'Sábado, 12 de Diciembre de 2026',
  dateShort: '12 · 12 · 2026',
  city: 'Jaén',
  country: 'España',

  // Imágenes de fondo apenas insinuadas en las páginas interiores
  backdrop: './assets/images/fondo-catedral.jpg',
  backdropViaje: './assets/images/fondo-viaje-piedra.jpg',

  // ── Portada (cubierta del pasaporte) ──────────────────────────────────────
  cover: {
    // Rótulo pequeño sobre los nombres
    welcome: 'Bienvenidos a nuestro gran viaje',
    // Texto del botón que entra en la web
    cta: 'Embarcar',
    // Vídeo de fondo de la portada (déjalo vacío para cubierta lisa)
    video: './assets/videos/portada.mp4',
    // Mismo plano en WebP animado. iOS en modo de bajo consumo prohíbe que un
    // <video> arranque solo, pero una imagen animada sí se mueve: es el recambio
    // cuando el vídeo se niega a reproducirse. Solo se descarga si hace falta.
    videoAnimado: './assets/videos/portada-animada-v2.webp',
    image: '',
  },

  // Texto de la invitación (tal cual la vuestra)
  invitation:
    'Nos hace mucha ilusión invitaros a celebrar con nosotros nuestro enlace. ' +
    'Vuestra presencia hará que este día sea aún más especial.',

  // ── El día · lugares confirmados (de la invitación) ───────────────────────
  events: [
    {
      code: 'CER',
      time: '12:00',
      title: 'Ceremonia',
      place: 'Iglesia de San Bartolomé',
      location: 'Jaén Capital',
      map: 'https://www.google.com/maps/search/?api=1&query=Iglesia%20de%20San%20Bartolom%C3%A9%2C%20Plaza%20de%20San%20Bartolom%C3%A9%2C%2023004%20Ja%C3%A9n',
      note: 'El embarque comienza puntual. Os esperamos para dar el «sí, quiero».',
    },
    {
      code: 'CEL',
      time: '14:30',
      title: 'Celebración',
      place: 'Claustro de Vandelvira',
      location: 'Baeza (Jaén)',
      map: 'https://www.google.com/maps/search/?api=1&query=Vandelvira%20Restaurante%2C%20Plaza%20de%20San%20Francisco%2C%2023440%20Baeza%2C%20Ja%C3%A9n',
      note: 'Cóctel, banquete y baile en un claustro renacentista. Que empiece el viaje.',
    },
  ],

  // Cronología completa del día, de la ceremonia al último autobús
  program: [
    { time: '12:00', title: 'Ceremonia',           detail: 'Iglesia de San Bartolomé, Jaén' },
    { time: '13:30', title: 'Autobús',             detail: 'Recogida cerca de la iglesia' },
    { time: '14:30', title: 'Cóctel',              detail: 'Hasta las 16:00' },
    { time: '16:00', title: 'Almuerzo',            detail: 'Hasta las 18:00' },
    { time: '18:00', title: 'Hora de desmelenarse', detail: 'Hasta las 00:00' },
    { time: '00:00', title: 'Último autobús',      detail: 'Vuelta a Jaén' },
  ],

  // ── Nuestra historia (página de datos del pasaporte) ──────────────────────
  story: {
    passport: {
      type: 'BODA',
      code: 'PYP',
      number: '12·12·2026',
      authority: 'Jaén · España',
    },
    intro:
      'Lo nuestro empezó a kilómetros de distancia y no ha parado de sumar destinos. ' +
      'De Madrid a Zúrich, de Málaga a Jaén. Aviones, trenes y estaciones que ' +
      'siempre nos llevaban al mismo sitio: el uno al otro.',
    // `photo`: imagen a pantalla completa de cada momento. Sustituye los
    // archivos de public/assets/images/ por vuestras fotos (mismo nombre) o
    // cambia aquí la ruta. Vertical funciona mejor en móvil.
    stamps: [
      { place: 'Málaga',          title: 'El primer sello', text: 'Nos conocimos un verano en el sur. Una conversación que se alargó hasta el amanecer.', photo: './assets/images/momento-mar.jpg' },
      { place: 'Zúrich ✈ Madrid', title: 'Larga distancia', text: 'Vuelos de última hora, videollamadas con husos horarios y maletas que nunca se deshacían del todo.', photo: './assets/images/momento-zurich.jpg' },
      { place: 'Jaén',            title: 'Entre olivos',    text: 'Volvimos a su tierra, entre olivares infinitos, y llegó el «sí». El mejor destino no estaba en ningún mapa.', photo: './assets/images/momento-jaen.jpg' },
    ],
  },

  // ── Viaje & Alojamiento ───────────────────────────────────────────────────
  travel: {
    // Consejo para moverse por Jaén el día de la ceremonia
    taxi:
      'Aunque el mapa diga que se llega andando en diez minutos, no te fíes: ' +
      'Jaén está en cuesta. Te recomendamos subir a la iglesia en taxi, y ' +
      'pedirlo con antelación, porque ese día habrá mucha demanda.',
    // Radioteléfonos de taxi de Jaén
    taxis: [
      { phone: '953 27 10 10' },
      { phone: '953 22 22 22', whatsapp: true },
    ],
    // Hoteles con acuerdo. Cada uno tiene SU PROPIO código de reserva.
    // Rellena `code`, `url` (web), `bookingUrl` (reserva directa), `phone` y
    // `email`: lo que quede vacío sencillamente no se muestra.
    // PENDIENTE: códigos, enlaces, teléfonos y correos reales.
    hotels: [
      {
        name: 'Parador de Jaén',
        stars: 4,
        area: 'Castillo de Santa Catalina',
        note: 'Uno de los iconos de la ciudad.',
        code: '',
        url: 'https://paradores.es/es/parador-de-jaen', phone: '953 23 00 00', email: '',
        bookingNote: 'Todavía no sabemos nada. En cuanto nos lo confirmen, lo actualizamos aquí.',
      },
      {
        name: 'Hotel Condestable Iranzo',
        stars: 4,
        area: 'Paseo de la Estación, 32',
        note: 'Sobre el paseo principal. Es el que recomendamos por cercanía y ubicación.',
        code: '',
        bookingEmail: 'comercial@hotelcondestableiranzo.com',
        bookingNote: 'Escríbeles indicando que asistís a la boda de Pablo y Pilar.',
        url: 'https://www.hotelcondestableiranzo.com', bookingUrl: '', phone: '953 22 28 00', email: '',
      },
      {
        name: 'Hotel Europa',
        stars: 3,
        area: 'Plaza de Belén, 1',
        note: 'El más céntrico.',
        code: '',
        bookingPhone: '953 22 27 00',
        bookingNote: 'Llama indicando el código de bloqueo 141565, para la boda de Pilar y Pablo. Está activo hasta el 1 de noviembre de 2026.',
        url: 'https://www.hoteleuropajaen.es', bookingUrl: '', phone: '953 22 27 04', email: '',
      },
      {
        name: 'Hotel Infanta Cristina',
        stars: 4,
        area: 'Avenida de Madrid, s/n',
        note: 'En una de las avenidas principales.',
        code: '',
        bookingNote: 'Todavía no sabemos nada. En cuanto nos lo confirmen, lo actualizamos aquí.',
        url: 'https://www.hotelinfantacristina.com', bookingUrl: '', phone: '953 26 30 40', email: '',
      },
      {
        name: 'HO Ciudad de Jaén',
        stars: 4,
        area: 'Autovía Bailén-Motril, salida 36',
        note: 'A la entrada de la ciudad (hay que coger taxi sí o sí).',
        code: '',
        url: 'https://grupoolivencia.com/ho-ciudad-de-jaen/home/', phone: '953 28 48 00', email: '',
        bookingUrl: 'https://direct-book.com/properties/HOCiudadDeJaenDirect',
        bookingLabel: 'Hotel HO (reserva aquí)',
        bookingNote: 'Reserva en su web indicando el código OLIVENCIA2026.',
      },
    ],
    // Autobús entre la ceremonia y la celebración
    shuttlePickup: '13:30',
    shuttle: 'Recogida cerca de la iglesia, con salida hacia Baeza.',
    // Horarios de vuelta a Jaén
    shuttleReturns: ['21:00', '00:00'],
  },

  // ── Descubrir Jaén (edita o amplía a vuestro gusto) ───────────────────────
  jaen: {
    // Va por párrafos: el texto respira mejor y el remate cae solo
    intro: [
      'No existe en el mundo un mar de olivos tan inmenso como el que rodea esta ' +
      'ciudad. Se alza una de las catedrales más impresionantes del Renacimiento ' +
      'español, se conservan los baños árabes visitables más grandes de España y ' +
      'cada rincón guarda siglos de historia.',
      'Hay ciudades que todo el mundo conoce y otras que se descubren. Jaén ' +
      'pertenece a estas últimas.',
      'Os animamos a recorrer la ciudad y sus alrededores. Estamos seguros de que ' +
      'os sorprenderá.',
    ],
    highlights: [
      {
        title: 'La Catedral',
        text: 'Andrés de Vandelvira la proyectó como el templo perfecto y trabajó en ella hasta el final de sus días. Es el mismo arquitecto que da nombre al claustro donde celebramos, así que ya sabéis a quién darle las gracias.',
      },
      {
        title: 'Castillo de Santa Catalina',
        text: 'Corona el cerro que vigila la ciudad. Al atardecer, desde la muralla, el mar de olivos se pierde hasta donde alcanza la vista.',
      },
      {
        title: 'Baños árabes',
        text: 'Pasaron siglos bajo tierra, olvidados debajo de un palacio renacentista. Se recorren entre bóvedas perforadas con estrellas, por donde entraba la luz sobre el vapor.',
      },
      {
        title: 'Museo Íbero',
        text: 'Jaén fue el corazón del mundo íbero, y este museo se levantó para reunir la mayor colección de su arte. Guerreros de piedra de hace veinticinco siglos, mirándote de frente.',
      },
      {
        title: 'Barrio de la Magdalena',
        text: 'El rincón más antiguo de la ciudad. Su iglesia se alzó sobre una mezquita y conserva el patio de abluciones y el alminar, hoy campanario. Y en la fuente de la plaza vivía, dicen, el lagarto que aterrorizó a Jaén.',
      },
      {
        title: 'Úbeda y Baeza',
        text: 'A media hora, dos ciudades renacentistas declaradas Patrimonio de la Humanidad. En Baeza es donde celebramos, así que media excusa ya la tenéis puesta.',
      },
    ],
  },

  // ── Información práctica ───────────────────────────────────────────────────
  info: {
    dressCode: {
      value: 'Formal',
      note: '',
    },
    gift: {
      note: 'Empezamos una nueva vida juntos en Suiza, un país precioso donde un café cuesta lo que aquí un menú. Si queréis echarnos una mano con el aterrizaje, esta es nuestra cuenta. Y si no, con que vengáis a la boda —y luego a vernos allí— nos basta.',
      account: 'ES19 2100 6490 7013 0040 1953',
      concept: 'Boda Pilar y Pablo 12/12/2026',
    },
  },

  // ── Confirmación de asistencia ────────────────────────────────────────────
  rsvp: {
    // Buzón en Google Sheets. La hoja es privada; esta dirección solo sabe
    // añadir filas —no leer, ni editar, ni borrar— y exige el token.
    endpoint: 'https://script.google.com/macros/s/AKfycbw2BUAbIk-O-NmTa5tOfFnbuBwh4coW1mMESiW28GiQLoMHT6ASj1KheETOFvrJGzE7Cg/exec',
    token: 'pilarypablo-12122026',
    // Correo de reserva por si el envío falla. Es una redirección de OVH: no
    // tiene buzón propio, reenvía a la dirección personal.
    email: 'hola@bodapilarypablo.es',
    contacts: [
      { name: 'Pilar', phone: '(+34) 633 468 172' },
      { name: 'Pablo', phone: '(+41) 788 937 771' },
    ],
  },
}

export default wedding
