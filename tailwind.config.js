/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta destilada de la invitación — papel marfil · marino · oro antiguo
        paper:        '#F4F0E7',  // Papel marfil cálido (fondo)
        'paper-deep': '#ECE5D6',  // Papel sombreado (tarjetas)
        navy:         '#1E2A44',  // Azul marino (tinta / portada)
        'navy-deep':  '#16203A',  // Marino profundo
        gold:         '#A6813C',  // Oro antiguo (sobre crema)
        'gold-soft':  '#C6A659',  // Oro claro (sobre marino)
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans:  ['Montserrat', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.28em',
        wide:   '0.16em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
      },
    },
  },
  plugins: [],
}
