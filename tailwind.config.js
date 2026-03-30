/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0E8',
        sand:  '#E8DFD0',
        gold:  '#C8A07A',
        ink:   '#1A1714',
        'gold-light': '#DDB98A',
        'gold-dark':  '#A07848',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['Montserrat', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.18em',
        wide: '0.10em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
      },
      transitionDuration: {
        800: '800ms',
        1200: '1200ms',
      },
    },
  },
  plugins: [],
}
