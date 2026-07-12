// ============================================================
//  Inicialización de Firebase (cliente)
// ------------------------------------------------------------
//  La config se lee de variables de entorno (Vite: VITE_FIREBASE_*).
//  Estos valores son PÚBLICOS por diseño (config de cliente, no secretos):
//  la seguridad real la dan las Security Rules de Firestore, no ocultar la apiKey.
//  Aun así, van en .env (ignorado por git) para no fijarlos en el repo.
// ============================================================
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
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
