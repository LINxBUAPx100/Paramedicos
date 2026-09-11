import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Entrada independiente: no monta AuthProvider ni requiere configuración Firebase.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { outDir: 'dist/rediseno', rollupOptions: { input: 'rediseno.html' } },
})
