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
    initials: ['P', 'P'],
    hashtag: '#PilarYPablo2026',
  },

  // Fecha y hora de inicio (para la cuenta atrás). Formato: AAAA-MM-DDTHH:MM
  date: '2026-12-12T12:00:00',
  dateLabel: 'Sábado, 12 de Diciembre de 2026',
  dateShort: '12 · 12 · 2026',
  city: 'Jaén',
  country: 'España',

  // ── Portada (cubierta del pasaporte) ──────────────────────────────────────
  cover: {
    passportLabel: 'Pasaporte',
    passportSub: 'A nuestro gran día',
    // Vídeo/imagen opcional detrás de la cubierta (déjalo vacío para cubierta lisa)
    video: '',
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
      // Enlace de Google Maps (rellena con la ubicación exacta)
      map: 'https://maps.google.com/?q=Iglesia+de+San+Bartolomé+Jaén',
      note: 'El embarque comienza puntual. Os esperamos para dar el «sí, quiero».',
    },
    {
      code: 'CEL',
      time: '14:00',
      title: 'Celebración',
      place: 'Claustro de Vandelvira',
      location: 'Baeza (Jaén)',
      map: 'https://maps.google.com/?q=Claustro+de+Vandelvira+Baeza',
      note: 'Cóctel, banquete y baile en un claustro renacentista. Que empiece el viaje.',
    },
  ],

  // Programa aproximado de la celebración (sin horas fijas — edítalo a tu gusto)
  program: ['Cóctel de bienvenida', 'Banquete', 'Barra libre y baile', 'Recena'],

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
      'Él desde Zúrich, ella desde Madrid; él de Málaga, ella de Jaén. Aviones, trenes ' +
      'y estaciones que siempre nos llevaban al mismo sitio: el uno al otro.',
    stamps: [
      { year: '2019', place: 'Málaga',           title: 'El primer sello', text: 'Nos conocimos un verano en el sur. Una conversación que se alargó hasta el amanecer.' },
      { year: '2020', place: 'Zúrich ✈ Madrid',  title: 'Larga distancia', text: 'Vuelos de última hora, videollamadas con husos horarios y maletas que nunca se deshacían del todo.' },
      { year: '2023', place: 'Jaén',             title: 'Entre olivos',    text: 'Volvimos a su tierra, entre olivares infinitos, y supimos que el próximo billete sería solo de ida.' },
      { year: '2025', place: 'Los Alpes',        title: 'La pedida',       text: 'En una escapada a la montaña llegó el «sí». El mejor destino no estaba en ningún mapa.' },
    ],
  },

  // ── Viaje & Alojamiento ───────────────────────────────────────────────────
  travel: {
    origins: [
      { label: 'Pablo', from: 'de Málaga', now: 'Zúrich', code: 'ZRH' },
      { label: 'Pilar', from: 'de Jaén',   now: 'Madrid', code: 'MAD' },
    ],
    destination: { place: 'Jaén · Baeza', code: 'JAE', label: 'Nuestro mejor día' },
    getting: [
      { icon: 'Plane',      title: 'En avión', text: 'Aeropuerto Federico García Lorca Granada-Jaén (GRX) a ~1h. Desde Zúrich, vuelos directos a Madrid y Málaga.' },
      { icon: 'TrainFront', title: 'En tren',  text: 'AVE hasta Jaén o Linares-Baeza desde Madrid. Desde la estación, coche o bus hasta Baeza (~35 min).' },
      { icon: 'Car',        title: 'En coche', text: 'Baeza está a 48 km de Jaén capital por la A-316. Parking gratuito junto al Claustro de Vandelvira.' },
    ],
    hotels: [
      { name: 'Hotel Puerta de la Luna', area: 'Baeza — centro histórico', note: 'A 5 min andando de la celebración. Recomendado.', url: '' },
      { name: 'Parador de Úbeda',        area: 'Úbeda — a 10 min en coche', note: 'Palacio renacentista con encanto.',            url: '' },
      { name: 'Hotel TRH Baeza',         area: 'Baeza',                     note: 'Opción cómoda y céntrica.',                    url: '' },
    ],
    shuttle:
      'Habrá autobús desde la Iglesia de San Bartolomé (Jaén) hasta el Claustro de ' +
      'Vandelvira (Baeza) y de vuelta al final de la fiesta. Reserva tu plaza al confirmar.',
  },

  // ── Galería (sustituir por fotos vuestras en public/assets/images/) ───────
  gallery: [
    { src: './assets/images/Salon 01.webp', caption: 'Nuestro primer viaje' },
    { src: './assets/images/salon 02.webp', caption: 'Escapadas' },
    { src: './assets/images/Salon 03.jpg',  caption: 'Los Alpes' },
    { src: './assets/images/Terraza (1).jpg', caption: 'Verano en el sur' },
    { src: './assets/images/Terraza (2).jpg', caption: 'Atardeceres' },
    { src: './assets/images/Salon 04.jpg',  caption: 'Ciudades' },
    { src: './assets/images/Salon 05.jpg',  caption: 'Aventuras' },
    { src: './assets/images/Cocina (1).jpg', caption: 'En casa' },
    { src: './assets/images/Dormitorio (1).jpg', caption: 'Momentos' },
    { src: './assets/images/Piscina (1).jpg', caption: 'Descansos' },
    { src: './assets/images/Piscina (2).jpg', caption: 'Planes' },
    { src: './assets/images/Cocina (2).jpg', caption: 'Recuerdos' },
  ],

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
      { q: '¿Hay servicio de autobús?', a: 'Sí, entre la ceremonia (Jaén) y la celebración (Baeza), y de vuelta al final de la noche. Resérvalo al confirmar.' },
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
