// ============================================================
//  Inicialización de Firebase (cliente)
// ------------------------------------------------------------
//  La config de cliente es PÚBLICA por diseño: acaba en el bundle sí o sí y
//  la seguridad real la dan las Security Rules, no ocultar la apiKey. Aun así
//  ya NO se incrusta en el código:
//
//    · rotar la clave no debe exigir un commit,
//    · una clave en el repositorio se copia a proyectos de prueba sin querer,
//    · y sobre todo: la clave debe ir RESTRINGIDA por referente HTTP y con
//      App Check activo. Lista de comprobación en FIREBASE.md.
//
//  Los valores llegan por variables VITE_FIREBASE_* (fichero .env en local,
//  secrets del repositorio en GitHub Actions). Si faltan, el BUILD FALLA a
//  propósito — ver la comprobación en vite.config.js: es preferible un CI en
//  rojo a desplegar una app que no puede hablar con su backend.
// ============================================================
import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Aviso claro en desarrollo si falta configurar el .env. En producción esto no
// debería poder ocurrir: el build se niega a generarse sin configuración.
export const firebaseListo = Boolean(firebaseConfig.apiKey && firebaseConfig.appId)
if (!firebaseListo && import.meta.env.DEV) {
  console.warn(
    '[Firebase] Falta configuración: copia .env.example a .env y pega VITE_FIREBASE_API_KEY y VITE_FIREBASE_APP_ID desde la consola de Firebase.'
  )
}

export const app = initializeApp(firebaseConfig)

// --- App Check (inactivo hasta registrar reCAPTCHA v3) --------------------
// Demuestra al backend que la petición sale de ESTA app y no de un script con
// la apiKey copiada del bundle. Sin VITE_APPCHECK_SITE_KEY no se inicializa
// nada, así que este código se puede desplegar antes de activarlo en consola.
//
// Va después de initializeApp y ANTES de getAuth/getFirestore: con App Check
// forzado en consola, una petición emitida antes de que exista token se
// rechaza con permission-denied.
//
// El import es ESTÁTICO a propósito, aunque cueste ~25 kB (5 kB gz) en el
// chunk `init` incluso con App Check apagado:
//   · tree-shaking NO puede quitarlo: el módulo de Firebase registra un
//     componente al importarse, así que tiene efectos secundarios;
//   · un import dinámico sí lo sacaría del bundle, pero introduce una carrera:
//     initializeAppCheck correría un tick DESPUÉS de que el módulo termine de
//     evaluarse, y una petición emitida en ese hueco se rechaza. La forma
//     correcta de evitarla es `await` de nivel superior, y build.target está
//     hoy en es2020, que no lo admite (esbuild falla el build).
//   Si en el Bloque I se sube build.target a es2022, este import puede pasar a
//   dinámico + await y recuperar esos 5 kB sin reintroducir la carrera.
const siteKey = import.meta.env.VITE_APPCHECK_SITE_KEY
export const appCheckListo = Boolean(siteKey)
if (appCheckListo) {
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(siteKey),
      // Renovación automática del token: sin esto, las sesiones largas
      // empiezan a fallar en cuanto caduca el primero.
      isTokenAutoRefreshEnabled: true,
    })
  } catch (err) {
    // Clave mal registrada o dominio no autorizado. No debe tumbar la app: con
    // App Check FORZADO en consola las lecturas fallarán después con
    // permission-denied, y este aviso es la pista de por qué.
    console.error('[AppCheck] No se pudo inicializar:', err)
  }
}

export const auth = getAuth(app)
export const db = getFirestore(app)

// --- EMULADOR local (solo desarrollo) -------------------------------------
//
// Hasta ahora la aplicación solo sabía hablar con el proyecto de PRODUCCIÓN, y
// eso obligaba a elegir entre dos malas opciones para probar cualquier pantalla
// con sesión: crear usuarios de prueba en la academia real —que aparecerían en
// los listados de quien está trabajando— o no probar.
//
// Con `VITE_FIREBASE_EMULADOR=1` en el `.env` local, Auth y Firestore apuntan
// al emulador y no se toca nada real. Se siembra con:
//
//     npx firebase-tools@15 emulators:start --only auth,firestore
//     node scripts/seed-usuarios-prueba.mjs --apply
//
// DOS CANDADOS para que esto no llegue jamás a producción:
//   · `import.meta.env.DEV` — Vite lo sustituye por `false` al construir, así
//     que la condición entera se pliega a `false` y el bloque NUNCA se ejecuta
//     en producción. Se comprueba en `tests/emuladorFueraDeProduccion.test.mjs`.
//   · la variable tiene que estar puesta a mano en el `.env` local, que no se
//     versiona.
//
// La constante NO se exporta a propósito. Exportándola, el empaquetador no
// puede demostrar que nadie la use y conserva la rama muerta en el bundle
// —comprobado: seguía apareciendo la cadena del aviso—. Sin export, se elimina
// entera. La importación es ESTÁTICA porque `await` de nivel superior no
// compila con el target actual (es2020), como ya documenta App Check arriba.
const usandoEmulador = import.meta.env.DEV
  && import.meta.env.VITE_FIREBASE_EMULADOR === '1'

if (usandoEmulador) {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
  connectFirestoreEmulator(db, '127.0.0.1', 8080)
  console.warn('[Firebase] EMULADOR LOCAL: no se está tocando ningún dato real.')
}

// La config se re-exporta para poder crear una app SECUNDARIA (crear usuarios
// desde el dashboard sin cerrar la sesión del administrador).
export { firebaseConfig }
