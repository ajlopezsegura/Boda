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

  // Imagen de fondo apenas insinuada en las páginas interiores.
  // Sustituye public/assets/images/fondo.jpg por la foto definitiva.
  backdrop: './assets/images/fondo-catedral.jpg',

  // ── Portada (cubierta del pasaporte) ──────────────────────────────────────
  cover: {
    // Rótulo pequeño sobre los nombres
    welcome: 'Bienvenidos a nuestro gran viaje',
    // Texto del botón que entra en la web
    cta: 'Embarcar',
    // Vídeo de fondo de la portada (déjalo vacío para cubierta lisa)
    video: './assets/videos/portada.mp4',
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
      map: 'https://maps.google.com/?q=Iglesia+de+San+Bartolomé+Jaén',
      note: 'El embarque comienza puntual. Os esperamos para dar el «sí, quiero».',
    },
    {
      code: 'CEL',
      time: '14:30',
      title: 'Celebración',
      place: 'Claustro de Vandelvira',
      location: 'Baeza (Jaén)',
      map: 'https://maps.google.com/?q=Claustro+de+Vandelvira+Baeza',
      note: 'Cóctel, banquete y baile en un claustro renacentista. Que empiece el viaje.',
    },
  ],

  // Programa aproximado de la celebración (sin horas fijas — edítalo a tu gusto)
  // Horarios facilitados por la wedding planner
  program: [
    { time: '14:30', title: 'Cóctel',      detail: 'Hasta las 16:00' },
    { time: '16:00', title: 'Menú',        detail: 'Hasta las 18:00' },
    { time: '18:00', title: 'Barra libre', detail: 'Grupo en directo hasta las 19:00' },
    { time: '19:00', title: 'Fiesta',      detail: 'DJ hasta las 00:00' },
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
      { place: 'Málaga',          title: 'El primer sello', text: 'Nos conocimos un verano en el sur. Una conversación que se alargó hasta el amanecer.', photo: './assets/images/momento-malaga.jpg' },
      { place: 'Zúrich ✈ Madrid', title: 'Larga distancia', text: 'Vuelos de última hora, videollamadas con husos horarios y maletas que nunca se deshacían del todo.', photo: './assets/images/momento-zurich.jpg' },
      { place: 'Jaén',            title: 'Entre olivos',    text: 'Volvimos a su tierra, entre olivares infinitos, y llegó el «sí». El mejor destino no estaba en ningún mapa.', photo: './assets/images/momento-jaen.jpg' },
    ],
  },

  // ── Viaje & Alojamiento ───────────────────────────────────────────────────
  travel: {
    // Consejo para moverse por Jaén el día de la ceremonia
    taxi:
      'Jaén es una ciudad de cuestas y el casco antiguo tiene las calles ' +
      'estrechas. Te recomendamos reservar taxi con antelación para subir a la ' +
      'iglesia: ese día habrá mucha demanda y no siempre es fácil encontrar uno.',
    // Hoteles con acuerdo. Cada uno tiene SU PROPIO código de reserva.
    // Rellena `code`, `url` (web), `bookingUrl` (reserva directa), `phone` y
    // `email`: lo que quede vacío sencillamente no se muestra.
    // PENDIENTE: códigos, enlaces, teléfonos y correos reales.
    hotels: [
      {
        name: 'HO Ciudad de Jaén',
        stars: 4,
        area: 'Autovía Bailén-Motril, salida 36',
        note: 'A la entrada de la ciudad. Habitaciones con terraza, spa y piscina, y vistas panorámicas de Jaén.',
        code: 'XXX',
        url: 'https://grupoolivencia.com/ho-ciudad-de-jaen/home/', bookingUrl: '', phone: '953 28 48 00', email: '',
      },
      {
        name: 'Hotel Infanta Cristina',
        stars: 4,
        area: 'Avenida de Madrid, s/n',
        note: 'Junto a la universidad y El Corte Inglés. Con piscina exterior y gimnasio.',
        code: 'XXX',
        url: 'https://www.hotelinfantacristina.com', bookingUrl: '', phone: '953 26 30 40', email: '',
      },
      {
        name: 'Hotel Condestable Iranzo',
        stars: 4,
        area: 'Paseo de la Estación, 32',
        note: 'En pleno centro, sobre el paseo principal. Tiene parking propio.',
        code: 'XXX',
        url: 'https://www.hotelcondestableiranzo.com', bookingUrl: '', phone: '953 22 28 00', email: '',
      },
      {
        name: 'Hotel Europa',
        stars: 3,
        area: 'Plaza de Belén, 1',
        note: 'El más céntrico de los cuatro. Desde su terraza se ve la catedral.',
        code: 'XXX',
        url: 'https://www.hoteleuropajaen.es', bookingUrl: '', phone: '953 22 27 04', email: '',
      },
    ],
    shuttle:
      'Habrá autobús desde la Iglesia de San Bartolomé (Jaén) hasta el Claustro de ' +
      'Vandelvira (Baeza). Para la vuelta a Jaén habrá dos salidas.',
    // Horarios de vuelta a Jaén
    shuttleReturns: ['20:30', '00:00'],
  },

  // ── Descubrir Jaén (edita o amplía a vuestro gusto) ───────────────────────
  jaen: {
    intro:
      'Si vienes de fuera y te quedas un par de días, Jaén merece que le des ' +
      'una vuelta. Es una provincia de olivares infinitos y ciudades ' +
      'renacentistas, con mucho más de lo que suele contarse.',
    highlights: [
      {
        title: 'La catedral',
        text: 'Obra maestra del Renacimiento español, proyectada por Andrés de Vandelvira. Sí: el mismo arquitecto que da nombre al claustro donde celebramos.',
      },
      {
        title: 'Castillo de Santa Catalina',
        text: 'Sobre el cerro que domina la ciudad. Las vistas del mar de olivos al atardecer son el mejor plan de la visita.',
      },
      {
        title: 'Baños árabes',
        text: 'Bajo el Palacio de Villardompardo, de los mayores conservados de España. Una parada breve y sorprendente.',
      },
      {
        title: 'Úbeda y Baeza',
        text: 'A media hora, las dos ciudades renacentistas declaradas Patrimonio de la Humanidad. Baeza es donde celebramos.',
      },
    ],
  },

  // ── Información práctica ───────────────────────────────────────────────────
  info: {
    dressCode: {
      value: 'Formal',
      note: 'Ellas, largo o midi; ellos, traje. El claustro tiene zonas de tierra y adoquín: tacón cómodo o cuña recomendado.',
    },
    gift: {
      note: 'Vuestra presencia es nuestro mejor regalo. Si además queréis tener un detalle y ayudarnos a llenar la maleta de nuestra luna de miel, aquí os dejamos nuestra cuenta.',
      account: 'ES50 3067 0109 3832 2957 6123', // REVISAR
      concept: 'Boda Pilar y Pablo 12/12/2026',
    },
    faq: [
      { q: '¿Puedo llevar a mis hijos?', a: 'Será una celebración pensada para adultos. Si necesitas ayuda con canguro en la zona, dínoslo y te echamos una mano.' },
      { q: '¿Hay servicio de autobús?', a: 'Sí, entre la ceremonia (Jaén) y la celebración (Baeza). Para la vuelta a Jaén hay dos salidas: a las 20:30 y a las 00:00. Resérvalo al confirmar.' },
      { q: '¿Dónde aparco?', a: 'Hay parking gratuito junto al Claustro de Vandelvira, en Baeza.' },
      { q: '¿Hasta cuándo confirmo?', a: 'Te agradecemos que confirmes antes del 30 de septiembre de 2026 para organizarlo todo con cariño.' },
    ],
  },

  // ── RSVP (sin backend: envía por WhatsApp o email) ────────────────────────
  rsvp: {
    deadline: '30 de septiembre de 2026',
    deadlineShort: '30.09.2026',
    whatsapp: '34600123456',           // REVISAR — teléfono real en formato internacional
    email: 'pilarypablo2026@gmail.com', // REVISAR
    contacts: [
      { name: 'Pilar', phone: '600 123 456' }, // REVISAR
      { name: 'Pablo', phone: '600 987 654' }, // REVISAR
    ],
  },
}

export default wedding
