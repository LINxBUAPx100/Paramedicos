import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Config de cliente que el build NECESITA para producir una app funcional.
// No son secretos (acaban en el bundle), pero deben venir del entorno y no
// del código: ver la cabecera de src/lib/firebase/init.js.
const VARS_FIREBASE = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
]

// ============================================================
//  Content-Security-Policy
// ------------------------------------------------------------
//  GitHub Pages no deja poner cabeceras, así que la CSP viaja en un <meta>.
//  Se inyecta SOLO en el build: en desarrollo, Vite sirve el preámbulo inline
//  de React Fast Refresh y el websocket de HMR, que una `script-src 'self'`
//  bloquearía (rompiendo `npm run dev` sin ganar nada — el atacante no está en
//  tu localhost).
//
//  Qué defiende: `script-src` sin 'unsafe-inline' neutraliza cualquier
//  `javascript:` que sobreviviera al filtro de lib/enlaceSeguro.js, y
//  `form-action 'none'` + `base-uri 'none'` cierran el robo de formularios y
//  el secuestro de rutas relativas.
//
//  Por qué cada origen está aquí:
//    style-src 'unsafe-inline' → React escribe estilos en el atributo `style`
//                                (p. ej. style={{'--d':'120ms'}} en Home).
//    font-src 'self'           → las tipografías se auto-alojan (Bloque I), así
//                                que ya no hay que abrir fonts.googleapis.com
//                                ni fonts.gstatic.com.
//    lh3.googleusercontent     → imágenes de Google Drive (lib/img.js).
//    wsrv.nl                   → proxy de imágenes externas (lib/img.js).
//    firebasestorage           → descargables subidos por cada academia.
//    *.googleapis.com          → Firestore, Identity Toolkit, Secure Token.
//    frame-src                 → iframe del dominio de Auth y de la cuenta de
//                                Google durante el login.
// ============================================================
function construirCSP({ conAppCheck }) {
  // reCAPTCHA v3 (App Check) carga su script desde google.com/gstatic.com y
  // pinta un iframe invisible desde google.com. Se abren SOLO si App Check
  // está configurado: sin la clave, la política se queda más cerrada.
  // Añadir orígenes de confianza a script-src no reabre el vector de XSS —
  // eso lo haría 'unsafe-inline', que no está aquí ni con App Check activo.
  const scriptExtra = conAppCheck ? ' https://www.google.com https://www.gstatic.com' : ''
  const frameExtra = conAppCheck ? ' https://www.google.com https://recaptcha.google.com' : ''
  return [
    "default-src 'self'",
    `script-src 'self'${scriptExtra}`,
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self'",
    "img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.googleusercontent.com https://wsrv.nl https://firebasestorage.googleapis.com",
    "connect-src 'self' https://*.googleapis.com wss://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com",
    `frame-src https://ptem-a304f.firebaseapp.com https://accounts.google.com${frameExtra}`,
    "base-uri 'none'",
    "object-src 'none'",
    "form-action 'none'",
  ].join('; ')
}

function cspSoloEnBuild(csp) {
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
            attrs: { 'http-equiv': 'Content-Security-Policy', content: csp },
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
export default defineConfig(({ command, mode }) => {
  // loadEnv lee los .env Y las variables VITE_* del proceso, que es como
  // llegan los secrets en GitHub Actions.
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  // Un build sin configuración genera una app que arranca pero no puede hablar
  // con Firebase: pantalla de "Firebase no está configurado" para todo el
  // mundo. Antes esto no podía pasar porque la config estaba incrustada en
  // init.js; ahora se detiene aquí, en rojo y explicando qué falta.
  if (command === 'build') {
    const faltan = VARS_FIREBASE.filter((clave) => !env[clave])
    if (faltan.length > 0) {
      throw new Error(
        `\n\n  Build detenido: falta la configuración de Firebase.\n\n` +
          `  Sin estas variables la app se despliega sin poder conectarse:\n` +
          faltan.map((c) => `    · ${c}`).join('\n') +
          `\n\n  En local:  copia .env.example a .env y rellénalo.\n` +
          `  En CI:     Settings → Secrets and variables → Actions,\n` +
          `             y páselas al paso de build (ver .github/workflows/deploy.yml).\n`
      )
    }
  }

  return {
    plugins: [react(), cspSoloEnBuild(construirCSP({ conAppCheck: Boolean(env.VITE_APPCHECK_SITE_KEY) }))],
    base: './',
    build: {
      outDir: 'dist',
      // Estaba en 1500, que no arreglaba nada: silenciaba el aviso que señalaba
      // el problema. A 500 vuelve a avisar de los dos chunks gordos (el SDK de
      // Firestore y los datos del temario), que es información, no ruido.
      chunkSizeWarningLimit: 500,
    },
  }
})
