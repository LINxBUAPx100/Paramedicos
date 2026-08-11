import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ============================================================
//  Content-Security-Policy
// ------------------------------------------------------------
//  GitHub Pages no deja poner cabeceras, así que la CSP viaja en un <meta>.
//  Se inyecta SOLO en el build: en desarrollo, Vite sirve el preámbulo inline
//  de React Fast Refresh y el websocket de HMR, que una `script-src 'self'`
//  bloquearía (rompiendo `npm run dev` sin ganar nada — el atacante no está en
//  tu localhost).
//
//  Qué defiende: `script-src 'self'` sin 'unsafe-inline' neutraliza cualquier
//  `javascript:` que sobreviviera al filtro de lib/enlaceSeguro.js, y
//  `form-action 'none'` + `base-uri 'none'` cierran el robo de formularios y
//  el secuestro de rutas relativas.
//
//  Por qué cada origen está aquí:
//    style-src 'unsafe-inline' → React escribe estilos en el atributo `style`
//                                (p. ej. style={{'--d':'120ms'}} en Home).
//    fonts.googleapis/gstatic  → Heebo, Oswald y Fira Sans. DESAPARECEN al
//                                auto-alojarlas (Bloque I): entonces esta línea
//                                se reduce a 'self'.
//    lh3.googleusercontent     → imágenes de Google Drive (lib/img.js).
//    wsrv.nl                   → proxy de imágenes externas (lib/img.js).
//    firebasestorage           → descargables subidos por cada academia.
//    *.googleapis.com          → Firestore, Identity Toolkit, Secure Token.
//    frame-src                 → iframe del dominio de Auth y de la cuenta de
//                                Google durante el login.
// ============================================================
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.googleusercontent.com https://wsrv.nl https://firebasestorage.googleapis.com",
  "connect-src 'self' https://*.googleapis.com wss://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com",
  "frame-src https://ptem-a304f.firebaseapp.com https://accounts.google.com",
  "base-uri 'none'",
  "object-src 'none'",
  "form-action 'none'",
].join('; ')

function cspSoloEnBuild() {
  return {
    name: 'ptem-csp',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: (html) => ({
        html,
        tags: [
          {
            tag: 'meta',
            attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP },
            injectTo: 'head-prepend',
          },
        ],
      }),
    },
  }
}

// Base relativa ('./') para que funcione en GitHub Pages sin importar
// el nombre exacto del repositorio (evita problemas de mayúsculas/minúsculas).
// Se usa HashRouter, así que el enrutado del lado del cliente no depende de la base.
export default defineConfig({
  plugins: [react(), cspSoloEnBuild()],
  base: './',
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1500,
  },
})
