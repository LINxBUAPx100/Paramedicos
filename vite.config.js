import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base relativa ('./') para que funcione en GitHub Pages sin importar
// el nombre exacto del repositorio (evita problemas de mayúsculas/minúsculas).
// Se usa HashRouter, así que el enrutado del lado del cliente no depende de la base.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
})
