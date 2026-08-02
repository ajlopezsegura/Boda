// ─────────────────────────────────────────────────────────────────────────────
//  PILAR & PABLO'S WEDDING — ENGLISH CONTENT
//  Mirrors data/wedding.js. Keep both files in step when editing.
// ─────────────────────────────────────────────────────────────────────────────

import es from './wedding'

// Shared hotel data (links and phones) looked up by name, so reordering the
// list on either side can never mismatch the two files.
const hotel = name => es.travel.hotels.find(h => h.name === name)

const wedding = {
  // Shared, language-independent values
  couple: es.couple,
  date: es.date,
  dateShort: es.dateShort,
  city: 'Jaén',
  country: 'Spain',
  backdrop: es.backdrop,
  backdropViaje: es.backdropViaje,

  dateLabel: 'Saturday, 12 December 2026',

  cover: {
    welcome: 'Welcome to our great journey',
    cta: 'Board now',
    video: es.cover.video,
    videoAnimado: es.cover.videoAnimado,
    image: es.cover.image,
  },

  invitation:
    'We would love you to celebrate our wedding with us. ' +
    'Your presence will make the day even more special.',

  events: [
    {
      code: 'CER',
      time: '12:00',
      title: 'Ceremony',
      place: 'Church of San Bartolomé',
      location: 'Jaén',
      map: es.events[0].map,
      note: 'Boarding starts on time. We look forward to saying «I do» with you there.',
    },
    {
      code: 'CEL',
      time: '14:30',
      title: 'Celebration',
      place: 'Claustro de Vandelvira',
      location: 'Baeza (Jaén)',
      map: es.events[1].map,
      note: 'Drinks, lunch and dancing in a Renaissance cloister. Let the journey begin.',
    },
  ],

  program: [
    { time: '12:00', title: 'Ceremony',        detail: 'Church of San Bartolomé, Jaén' },
    { time: '13:30', title: 'Coach',           detail: 'Pick-up near the church' },
    { time: '14:30', title: 'Drinks reception', detail: 'Until 16:00' },
    { time: '16:00', title: 'Lunch',           detail: 'Until 18:00' },
    { time: '18:00', title: 'Time to dance!', detail: 'Until midnight' },
    { time: '00:00', title: 'Last coach',      detail: 'Back to Jaén' },
  ],

  story: {
    passport: es.story.passport,
    intro:
      'Ours began miles apart and has never stopped adding destinations. ' +
      'From Madrid to Zurich, from Málaga to Jaén. Planes, trains and stations ' +
      'that always took us to the same place: each other.',
    stamps: [
      { place: 'Málaga',          title: 'The first stamp',  text: 'We met one summer in the south. A conversation that ran until sunrise.',                                     photo: es.story.stamps[0].photo },
      { place: 'Zurich ✈ Madrid', title: 'Long distance',    text: 'Last-minute flights, video calls across time zones and suitcases that never got fully unpacked.',            photo: es.story.stamps[1].photo },
      { place: 'Jaén',            title: 'Among olive trees', text: 'We went back to her home, among endless olive groves, and the «yes» arrived. The best destination was on no map.', photo: es.story.stamps[2].photo },
    ],
  },

  travel: {
    taxi:
      'The map may tell you it is a ten-minute walk. Do not believe it: Jaén is ' +
      'one long hill. We recommend taking a taxi up to the church, and booking it ' +
      'in advance, because demand will be high that day.',
    taxis: es.travel.taxis,
    hotels: [
      {
        name: 'Parador de Jaén',
        oculto: hotel('Parador de Jaén').oculto,
        stars: 4,
        area: 'Santa Catalina castle',
        note: 'One of the city’s landmarks.',
        code: '',
        url: hotel('Parador de Jaén').url, phone: hotel('Parador de Jaén').phone, email: '',
        bookingNote: 'We don’t know yet. As soon as we hear back, we’ll update it here.',
      },
      {
        name: 'Hotel Condestable Iranzo',
        stars: 4,
        area: 'Paseo de la Estación, 32',
        note: 'On the main avenue. This is the one we recommend, for how close and well placed it is.',
        code: '',
        bookingEmail: hotel('Hotel Condestable Iranzo').bookingEmail,
        bookingNote: 'Write to them saying that you are attending Pablo and Pilar’s wedding.',
        url: hotel('Hotel Condestable Iranzo').url, bookingUrl: '', phone: hotel('Hotel Condestable Iranzo').phone, email: '',
      },
      {
        name: 'Hotel Europa',
        stars: 3,
        area: 'Plaza de Belén, 1',
        note: 'The most central one.',
        code: '',
        bookingPhone: hotel('Hotel Europa').bookingPhone,
        bookingNote: 'Call and quote the block code 141565, for Pilar and Pablo’s wedding. It is held until 1 November 2026.',
        url: hotel('Hotel Europa').url, bookingUrl: '', phone: hotel('Hotel Europa').phone, email: '',
      },
      {
        name: 'Hotel Infanta Cristina',
        oculto: hotel('Hotel Infanta Cristina').oculto,
        stars: 4,
        area: 'Avenida de Madrid',
        note: 'On one of the main avenues.',
        code: '',
        bookingNote: 'We don’t know yet. As soon as we hear back, we’ll update it here.',
        url: hotel('Hotel Infanta Cristina').url, bookingUrl: '', phone: hotel('Hotel Infanta Cristina').phone, email: '',
      },
      {
        name: 'HO Ciudad de Jaén',
        stars: 4,
        area: 'Bailén-Motril motorway, exit 36',
        note: 'At the entrance to the city (you will need a taxi, no way around it).',
        code: '',
        url: hotel('HO Ciudad de Jaén').url, phone: hotel('HO Ciudad de Jaén').phone, email: '',
        bookingUrl: hotel('HO Ciudad de Jaén').bookingUrl,
        bookingLabel: 'Hotel HO (book here)',
        bookingNote: 'Book on their website quoting the code OLIVENCIA2026.',
      },
    ],
    shuttlePickup: '13:30',
    shuttle: 'Pick-up near the church, heading to Baeza.',
    shuttleReturns: es.travel.shuttleReturns,
  },

  jaen: {
    intro: [
      'Nowhere in the world is there a sea of olive trees as vast as the one that ' +
      'surrounds this city. One of the most striking cathedrals of the Spanish ' +
      'Renaissance rises here, the largest Arab baths open to visitors in Spain ' +
      'have survived beneath it, and every corner holds centuries of history.',
      'There are cities everybody knows, and cities you discover. Jaén belongs to ' +
      'the second kind.',
      'We hope you take the time to walk the city and the country around it. We are ' +
      'certain it will surprise you.',
    ],
    highlights: [
      {
        title: 'The Cathedral',
        text: 'Andrés de Vandelvira designed it as the perfect temple and worked on it until the end of his life. He is the same architect who gives his name to the cloister where we celebrate, so now you know who to thank.',
      },
      {
        title: 'Santa Catalina castle',
        text: 'It crowns the hill that watches over the city. At sunset, from the ramparts, the sea of olive trees runs on as far as you can see.',
      },
      {
        title: 'Arab baths',
        text: 'They spent centuries underground, forgotten beneath a Renaissance palace. You walk under vaults pierced with stars, where the light once fell on the steam.',
      },
      {
        title: 'Íbero Museum',
        text: 'Jaén was the heart of the Iberian world, and this museum was built to gather the greatest collection of its art. Stone warriors from twenty-five centuries ago, looking straight at you.',
      },
      {
        title: 'La Magdalena quarter',
        text: 'The oldest corner of the city. Its church was raised over a mosque and still keeps the ablutions courtyard and the minaret, now a bell tower. And in the fountain on the square lived, so they say, the lizard that terrorised Jaén.',
      },
      {
        title: 'Úbeda and Baeza',
        text: 'Half an hour away, two Renaissance towns listed as World Heritage Sites. Baeza is where we celebrate, so half your excuse is already in place.',
      },
    ],
  },

  info: {
    dressCode: {
      value: 'Formal',
      note: '',
    },
    gift: {
      note: 'We are starting a new life together in Switzerland, a beautiful country where a coffee costs what a full lunch costs in Spain. If you would like to help with the landing, these are our bank details. And if not, having you at the wedding — and visiting us over there afterwards — is more than enough.',
      account: es.info.gift.account,
      concept: 'Pilar and Pablo wedding 12/12/2026',
    },
  },

  rsvp: {
    endpoint: es.rsvp.endpoint,
    token: es.rsvp.token,
    email: es.rsvp.email,
    contacts: es.rsvp.contacts,
  },
}

export default wedding
