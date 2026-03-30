import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      // The Epic Pixel Streaming library is optional and installed separately
      // by the user to match their Unreal Engine version.
      // The PixelStreamingViewer component handles its absence gracefully.
      external: [/^@epicgames-ps\//],
    },
  },
})
