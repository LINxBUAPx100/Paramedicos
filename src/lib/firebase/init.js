// ============================================================
//  Inicialización de Firebase (cliente)
// ------------------------------------------------------------
//  Estos valores son PÚBLICOS por diseño (config de cliente, no secretos):
//  la seguridad real la dan las Security Rules de Firestore, no ocultar la
//  apiKey. Van incrustados para que el build de GitHub Actions (que no tiene
//  .env) salga funcional; un .env local con VITE_FIREBASE_* los sobrescribe.
// ============================================================
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const DEFAULTS = {
  apiKey: 'AIzaSyCSR5D60yOCg9g6vK5_UB8EkOlmXnBUHXI',
  authDomain: 'ptem-a304f.firebaseapp.com',
  projectId: 'ptem-a304f',
  storageBucket: 'ptem-a304f.firebasestorage.app',
  messagingSenderId: '944566588634',
  appId: '1:944566588634:web:6add4b5851f3027dd881e3',
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || DEFAULTS.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || DEFAULTS.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || DEFAULTS.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || DEFAULTS.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || DEFAULTS.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || DEFAULTS.appId,
}

// Aviso claro en desarrollo si falta configurar el .env.
export const firebaseListo = Boolean(firebaseConfig.apiKey && firebaseConfig.appId)
if (!firebaseListo && import.meta.env.DEV) {
  console.warn(
    '[Firebase] Falta configuración: copia .env.example a .env y pega VITE_FIREBASE_API_KEY y VITE_FIREBASE_APP_ID desde la consola de Firebase.'
  )
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
