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

// FORMA de cada valor, no solo su presencia.
//
// Comprobar «no está vacío» dejó pasar el peor build posible: los seis secrets
// del repositorio se crearon con el NOMBRE de la variable pegado en la casilla
// del valor, así que el bundle salió con apiKey: "VITE_FIREBASE_API_KEY". El
// build en verde, el despliegue en verde, y la app publicada sin poder
// autenticar a nadie: «auth/api-key-not-valid» para todo el mundo.
//
// Tardó tres días en verse porque la web se publicaba desde una rama anterior a
// esta config, que la llevaba escrita en el código. Una comprobación que pasa
// cuando no debería es peor que no tenerla: da una garantía falsa.
const FORMA = {
  VITE_FIREBASE_API_KEY: {
    ok: (v) => /^AIza[\w-]{30,40}$/.test(v),
    esperado: 'empieza por "AIza" (clave de API de Google, ~39 caracteres)',
  },
  VITE_FIREBASE_AUTH_DOMAIN: {
    ok: (v) => v.includes('.') && !v.includes(' ') && !v.includes('/'),
    esperado: 'un dominio, p. ej. tu-proyecto.firebaseapp.com',
  },
  VITE_FIREBASE_PROJECT_ID: {
    ok: (v) => /^[a-z0-9-]{4,40}$/.test(v),
    esperado: 'el id del proyecto en minúsculas, p. ej. ptem-a304f',
  },
  VITE_FIREBASE_STORAGE_BUCKET: {
    ok: (v) => v.includes('.') && !v.includes(' '),
    esperado: 'el bucket, p. ej. tu-proyecto.firebasestorage.app',
  },
  VITE_FIREBASE_MESSAGING_SENDER_ID: {
    ok: (v) => /^\d{6,}$/.test(v),
    esperado: 'solo dígitos',
  },
  VITE_FIREBASE_APP_ID: {
    ok: (v) => /^1:\d+:web:[a-f0-9]+$/i.test(v),
    esperado: 'con el formato 1:123456789:web:abc123',
  },
}

// Un valor recortado para el mensaje de error. La config de cliente es pública
// (acaba en el bundle), pero un secret mal puesto puede contener cualquier cosa
// pegada por error, así que no se vuelca entero en el log del CI.
function pista(valor) {
  const v = String(valor)
  return v.length <= 12 ? JSON.stringify(v) : JSON.stringify(v.slice(0, 8) + '…') + ` (${v.length} caracteres)`
}

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
    // Un valor igual al nombre de su variable es el error de copiar y pegar que
    // ya ocurrió una vez: se comprueba por separado para poder decirlo tal cual.
    const sonElNombre = VARS_FIREBASE.filter((clave) => env[clave] === clave)
    const malFormados = VARS_FIREBASE.filter(
      (clave) => env[clave] && env[clave] !== clave && FORMA[clave] && !FORMA[clave].ok(env[clave])
    )
    if (faltan.length > 0 || sonElNombre.length > 0 || malFormados.length > 0) {
      const partes = ['\n\n  Build detenido: la configuración de Firebase no sirve.\n']
      if (faltan.length > 0) {
        partes.push('  Faltan por completo:')
        partes.push(faltan.map((c) => `    · ${c}`).join('\n') + '\n')
      }
      if (sonElNombre.length > 0) {
        partes.push('  Tienen como valor su PROPIO NOMBRE (se pegó el nombre en vez del valor):')
        partes.push(sonElNombre.map((c) => `    · ${c} = "${c}"`).join('\n') + '\n')
      }
      if (malFormados.length > 0) {
        partes.push('  No tienen la forma esperada:')
        partes.push(
          malFormados
            .map((c) => `    · ${c} = ${pista(env[c])}\n      esperado: ${FORMA[c].esperado}`)
            .join('\n') + '\n'
        )
      }
      partes.push('  En local:  copia .env.example a .env y rellénalo.')
      partes.push('  En CI:     Settings → Secrets and variables → Actions.')
      partes.push('             Los valores salen de la consola de Firebase →')
      partes.push('             Configuración del proyecto → Tus apps → Configuración del SDK.\n')
      throw new Error(partes.join('\n'))
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
