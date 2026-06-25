import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Hosted at the root of MarwanMesbah18.github.io (GitHub user pages)
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          gsap: ['gsap'],
        },
      },
    },
  },
})
