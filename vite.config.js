import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative base: works on Vercel (root) and on GitHub Pages / subpaths.
  base: './',
})
