// ─────────────────────────────────────────────────────────────────────────────
//  BODA PILAR & PABLO — DATOS EDITABLES
//  Todo el contenido de la web vive aquí. Cambia estos valores y la web se
//  actualiza sola. No hace falta tocar el resto del código.
// ─────────────────────────────────────────────────────────────────────────────

const wedding = {
  // ── Pareja y fecha ────────────────────────────────────────────────────────
  couple: {
    bride: 'Pilar',
    groom: 'Pablo',
    monogram: 'P|P',
    hashtag: '#PilarYPablo2026',
  },

  // Fecha y hora de inicio (para la cuenta atrás). Formato: AAAA-MM-DDTHH:MM
  date: '2026-12-12T12:00:00',
  dateLabel: 'Sábado, 12 de Diciembre de 2026',
  dateShort: '12 · 12 · 2026',
  city: 'Jaén',
  country: 'España',

  // ── Hero (portada) ────────────────────────────────────────────────────────
  hero: {
    // Vídeo de fondo (sustituir por uno vuestro en public/assets/videos/)
    video: './assets/videos/Hero.mp4',
    // Imagen de respaldo si el vídeo no carga
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=90',
    kicker: 'NOS CASAMOS',
    tagline: 'De Zúrich a Madrid, de Málaga a Jaén — todos los caminos nos traen aquí.',
  },

  // ── Nuestra historia (timeline con mood de viaje) ─────────────────────────
  story: {
    intro:
      'Lo nuestro empezó a kilómetros de distancia y no ha parado de sumar destinos. ' +
      'Él desde Zúrich, ella desde Madrid; él de Málaga, ella de Jaén. Aviones, trenes ' +
      'y estaciones que, sin saberlo, siempre nos llevaban al mismo sitio: el uno al otro.',
    stamps: [
      {
        year: '2019',
        place: 'Málaga',
        title: 'El primer sello',
        text: 'Nos conocimos un verano en el sur. Una conversación que se alargó hasta el amanecer y ya no supimos separarnos.',
      },
      {
        year: '2020',
        place: 'Zúrich ✈ Madrid',
        title: 'Larga distancia',
        text: 'Empezó el ir y venir: vuelos de última hora, videollamadas con husos horarios y maletas que nunca se deshacían del todo.',
      },
      {
        year: '2023',
        place: 'Jaén',
        title: 'Entre olivos',
        text: 'Volvimos a casa de ella, entre olivares infinitos, y entendimos que nuestro próximo billete sería solo de ida: juntos.',
      },
      {
        year: '2025',
        place: 'Los Alpes',
        title: 'La pedida',
        text: 'En una escapada a la montaña, con medio mundo recorrido, llegó el «sí». El mejor destino no estaba en ningún mapa.',
      },
    ],
  },

  // ── El día · Itinerario (tarjetas tipo boarding pass) ─────────────────────
  itinerary: [
    {
      time: '12:00',
      code: 'CER',
      title: 'Ceremonia',
      place: 'Iglesia de San Bartolomé',
      location: 'Jaén Capital',
      note: 'El embarque comienza puntual. Os esperamos para dar el «sí, quiero».',
    },
    {
      time: '14:00',
      code: 'COC',
      title: 'Cóctel de bienvenida',
      place: 'Claustro de Vandelvira',
      location: 'Baeza (Jaén)',
      note: 'Aperitivo al aire libre en un claustro renacentista. Que empiece el viaje.',
    },
    {
      time: '15:30',
      code: 'BAN',
      title: 'Banquete',
      place: 'Claustro de Vandelvira',
      location: 'Baeza (Jaén)',
      note: 'Comida y brindis con los sabores de la tierra.',
    },
    {
      time: '18:00',
      code: 'FST',
      title: 'Barra libre y fiesta',
      place: 'Claustro de Vandelvira',
      location: 'Baeza (Jaén)',
      note: 'DJ, baile y celebración hasta que el cuerpo aguante.',
    },
    {
      time: '00:00',
      code: 'RCN',
      title: 'Recena',
      place: 'Claustro de Vandelvira',
      location: 'Baeza (Jaén)',
      note: 'Para reponer fuerzas y seguir volando.',
    },
  ],

  // ── Viaje & Alojamiento ───────────────────────────────────────────────────
  travel: {
    origins: [
      { label: 'Pablo', from: 'Málaga', now: 'Zúrich', code: 'ZRH' },
      { label: 'Pilar', from: 'Jaén', now: 'Madrid', code: 'MAD' },
    ],
    destination: { label: 'Nuestro gran día', place: 'Baeza · Jaén', code: 'JAÉN' },
    getting: [
      {
        icon: 'Plane',
        title: 'En avión',
        text: 'Aeropuerto de Granada-Jaén (F.G.L.) a 1h, o Madrid-Barajas a 3h en AVE + coche. Desde Zúrich hay vuelos directos a Madrid y Málaga.',
      },
      {
        icon: 'TrainFront',
        title: 'En tren',
        text: 'AVE hasta Jaén / Linares-Baeza desde Madrid. Desde la estación, coche o bus hasta Baeza (35 min).',
      },
      {
        icon: 'Car',
        title: 'En coche',
        text: 'Baeza está a 48 km de Jaén capital por la A-316. Hay parking gratuito junto al Claustro de Vandelvira.',
      },
    ],
    hotels: [
      {
        name: 'Hotel Puerta de la Luna',
        area: 'Baeza — centro histórico',
        note: 'A 5 min andando de la celebración. Recomendado.',
        url: '',
      },
      {
        name: 'Parador de Úbeda',
        area: 'Úbeda — a 10 min en coche',
        note: 'Palacio renacentista con encanto.',
        url: '',
      },
      {
        name: 'Hotel TRH Baeza',
        area: 'Baeza',
        note: 'Opción cómoda y céntrica.',
        url: '',
      },
    ],
    shuttle:
      'Habrá servicio de autobús desde la Iglesia de San Bartolomé (Jaén) hasta el ' +
      'Claustro de Vandelvira (Baeza) y de vuelta al final de la fiesta. Reserva tu ' +
      'plaza al confirmar asistencia.',
  },

  // ── Galería (sustituir por fotos vuestras en public/assets/images/) ───────
  gallery: [
    { src: './assets/images/Salon 01.webp', caption: 'Nuestro primer viaje' },
    { src: './assets/images/salon 02.webp', caption: 'Escapadas' },
    { src: './assets/images/Salon 03.jpg', caption: 'Los Alpes' },
    { src: './assets/images/Terraza (1).jpg', caption: 'Verano en el sur' },
    { src: './assets/images/Terraza (2).jpg', caption: 'Atardeceres' },
    { src: './assets/images/Salon 04.jpg', caption: 'Ciudades' },
    { src: './assets/images/Salon 05.jpg', caption: 'Aventuras' },
    { src: './assets/images/Cocina (1).jpg', caption: 'En casa' },
    { src: './assets/images/Dormitorio (1).jpg', caption: 'Momentos' },
    { src: './assets/images/Piscina (1).jpg', caption: 'Descansos' },
    { src: './assets/images/Piscina (2).jpg', caption: 'Planes' },
    { src: './assets/images/Cocina (2).jpg', caption: 'Recuerdos' },
  ],

  // ── Información práctica ───────────────────────────────────────────────────
  info: {
    dressCode: {
      title: 'Dress code',
      value: 'Etiqueta formal',
      note: 'Ellas, largo o midi; ellos, traje. El claustro tiene zonas de tierra y adoquín: ellas, tacón cómodo o cuña recomendado.',
    },
    gift: {
      title: 'Un detalle',
      note: 'Vuestra presencia es nuestro mejor regalo. Si aun así queréis tener un detalle con nosotros y ayudarnos a llenar la maleta de nuestra luna de miel, aquí os dejamos nuestra cuenta.',
      account: 'ES50 0000 0000 0000 0000 0000',
      concept: 'Boda Pilar & Pablo',
    },
    faq: [
      {
        q: '¿Puedo llevar a mis hijos?',
        a: 'Nos encantan los peques, pero será una celebración pensada para adultos. Si necesitas ayuda con canguro en la zona, dínoslo y te echamos una mano.',
      },
      {
        q: '¿Hay servicio de autobús?',
        a: 'Sí. Habrá bus entre la ceremonia (Jaén) y la celebración (Baeza), y de vuelta al final de la noche. Resérvalo al confirmar tu asistencia.',
      },
      {
        q: '¿Dónde aparco?',
        a: 'Hay parking gratuito junto al Claustro de Vandelvira, en Baeza.',
      },
      {
        q: '¿Hasta cuándo confirmo?',
        a: 'Te agradecemos que confirmes antes del 30 de septiembre de 2026 para poder organizarlo todo con cariño.',
      },
    ],
  },

  // ── RSVP (sin backend: envía por WhatsApp o email) ────────────────────────
  rsvp: {
    deadline: '30 de septiembre de 2026',
    // Teléfono en formato internacional sin signos (para el enlace de WhatsApp)
    whatsapp: '34600000000',
    email: 'pilarypablo2026@gmail.com',
    contacts: [
      { name: 'Pilar', phone: '+34 600 000 000' },
      { name: 'Pablo', phone: '+34 600 000 001' },
    ],
  },
}

export default wedding
