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
    { time: '18:00', title: 'Time to let loose', detail: 'DJ until midnight' },
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
      'Jaén is a city of steep streets and the old town is narrow. We recommend ' +
      'booking a taxi in advance to get up to the church: demand will be high ' +
      'that day and they are not always easy to find.',
    hotels: [
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
        bookingNote: 'Call and mention that there is a block of rooms held for Pilar and Pablo’s wedding. It is held until 1 November 2026.',
        url: hotel('Hotel Europa').url, bookingUrl: '', phone: hotel('Hotel Europa').phone, email: '',
      },
      {
        name: 'Hotel Infanta Cristina',
        stars: 4,
        area: 'Avenida de Madrid',
        note: 'Next to the university and El Corte Inglés. With outdoor pool and gym.',
        code: '',
        url: hotel('Hotel Infanta Cristina').url, bookingUrl: '', phone: hotel('Hotel Infanta Cristina').phone, email: '',
      },
      {
        name: 'HO Ciudad de Jaén',
        stars: 4,
        area: 'Bailén-Motril motorway, exit 36',
        note: 'At the entrance to the city. Rooms with terrace, spa and pool, and panoramic views over Jaén.',
        code: '',
        url: hotel('HO Ciudad de Jaén').url, bookingUrl: '', phone: hotel('HO Ciudad de Jaén').phone, email: '',
      },
    ],
    shuttlePickup: '13:30',
    shuttle: 'Pick-up near the church, heading to Baeza.',
    shuttleReturns: es.travel.shuttleReturns,
  },

  jaen: {
    intro:
      'If you are coming from abroad and can stay a couple of days, Jaén is worth ' +
      'exploring. It is a province of endless olive groves and Renaissance towns, ' +
      'with far more to it than usually gets told.',
    highlights: [
      {
        title: 'The cathedral',
        text: 'A masterpiece of the Spanish Renaissance, designed by Andrés de Vandelvira — the same architect who gives his name to the cloister where we celebrate.',
      },
      {
        title: 'Santa Catalina castle',
        text: 'On the hill above the city. The views over the sea of olive trees at sunset are the highlight of any visit.',
      },
      {
        title: 'Arab baths',
        text: 'Beneath the Villardompardo Palace, among the largest preserved in Spain. A short and surprising stop.',
      },
      {
        title: 'Úbeda and Baeza',
        text: 'Half an hour away, two Renaissance towns listed as World Heritage Sites. Baeza is where we celebrate.',
      },
    ],
  },

  info: {
    dressCode: {
      value: 'Formal',
      note: 'Long or midi dresses; suits. The cloister has gravel and cobbled areas, so a comfortable or block heel is a good idea.',
    },
    gift: {
      note: 'Your presence is the best gift of all. If you would also like to help us fill the suitcase for our honeymoon, here are our bank details.',
      account: es.info.gift.account,
      concept: 'Pilar and Pablo wedding 12/12/2026',
    },
    faq: [
      { q: 'Can I bring my children?', a: 'It will be an adults-only celebration. If you need help finding a babysitter nearby, let us know and we will lend a hand.' },
      { q: 'Is there a coach service?',  a: 'Yes, between the ceremony (Jaén) and the celebration (Baeza). There are two departures back to Jaén: at 21:00 and at midnight. Book your seat when you RSVP.' },
      { q: 'Where can I park?',          a: 'There is free parking next to the Claustro de Vandelvira, in Baeza.' },
      { q: 'When should I RSVP by?',     a: 'We would be grateful if you could confirm before 30 September 2026 so we can organise everything properly.' },
    ],
  },

  rsvp: {
    deadline: '30 September 2026',
    deadlineShort: es.rsvp.deadlineShort,
    whatsapp: es.rsvp.whatsapp,
    email: es.rsvp.email,
    contacts: es.rsvp.contacts,
  },
}

export default wedding
