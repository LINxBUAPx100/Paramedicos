// ============================================================
//  Helpers de autenticación (Firebase Auth + perfil en Firestore)
// ============================================================
import { auth, db } from './init.js'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  verifyBeforeUpdateEmail,
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { parcheDePerfil, perfilNuevo } from '../perfilMinimo.js'

const googleProvider = new GoogleAuthProvider()

// ============================================================
//  Perfil de Firestore: crearlo si falta y REPARARLO si está incompleto
// ------------------------------------------------------------
//  Una cuenta de Auth sin su doc en `usuarios` —o con el doc a medias— es una
//  cuenta que no puede hacer NADA: las reglas de escritura del propio perfil
//  comparan `rol`, `estado` y `academiaId` contra lo que ya hay, así que si uno
//  de esos campos no existe la escritura se deniega entera. Eso es lo que veía
//  quien abría una invitación y recibía «Missing or insufficient permissions»
//  al pulsar «Activar código»: el canje intentaba un `update` sobre un
//  documento que no estaba (o que no tenía `rol`).
//
//  El alta puede quedar a medias por causas normales: el `setDoc` del registro
//  falla por red, la pestaña se cierra entre `createUser` y el perfil, o el doc
//  viene de una versión anterior del esquema. Así que no se confía en que el
//  registro lo haya dejado bien: se comprueba y se arregla cada vez que hay
//  sesión (AuthContext) y otra vez antes de canjear un código (canjear.js).
//
//  Devuelve 'creado' | 'reparado' | 'ok' para poder registrarlo y probarlo.
// ============================================================

// Qué falta y con qué se rellena está en lib/perfilMinimo.js (módulo puro).
export async function asegurarPerfil(user, nombre) {
  if (!user?.uid) return 'ok'
  const ref = doc(db, 'usuarios', user.uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) {
    await setDoc(ref, { ...perfilNuevo(user, nombre), creado: serverTimestamp() })
    return 'creado'
  }
  const parche = parcheDePerfil(snap.data(), user, nombre)
  if (Object.keys(parche).length === 0) return 'ok'
  await updateDoc(ref, parche)
  return 'reparado'
}

// Igual que `asegurarPerfil`, para quien solo tiene la sesión a mano.
export async function asegurarMiPerfil() {
  if (!auth.currentUser) throw new Error('Necesitas iniciar sesión.')
  return asegurarPerfil(auth.currentUser)
}

export async function registrarEmail({ nombre, email, password }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  if (nombre) await updateProfile(cred.user, { displayName: nombre })
  await asegurarPerfil(cred.user, nombre)
  return cred.user
}

export async function entrarEmail({ email, password }) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  await asegurarPerfil(cred.user)
  return cred.user
}

export async function entrarGoogle() {
  const cred = await signInWithPopup(auth, googleProvider)
  await asegurarPerfil(cred.user)
  return cred.user
}

export function salir() {
  return signOut(auth)
}

export function observarAuth(cb) {
  return onAuthStateChanged(auth, cb)
}

// --- Mis datos (el propio usuario autenticado) ---

// Cambia mi nombre (en Auth y en mi perfil de Firestore).
export async function cambiarMiNombre(nombre) {
  const limpio = String(nombre || '').trim()
  if (!limpio) throw new Error('Escribe tu nombre.')
  if (auth.currentUser) await updateProfile(auth.currentUser, { displayName: limpio })
  await updateDoc(doc(db, 'usuarios', auth.currentUser.uid), { nombre: limpio })
}

// Cambia mi correo de inicio de sesión: Firebase manda un enlace de
// verificación al correo NUEVO; al confirmarlo, el cambio se aplica.
// Puede exigir sesión reciente (error auth/requires-recent-login).
export async function cambiarMiCorreo(nuevoEmail) {
  const limpio = String(nuevoEmail || '').trim()
  if (!limpio) throw new Error('Escribe el nuevo correo.')
  await verifyBeforeUpdateEmail(auth.currentUser, limpio)
  // El campo email del perfil se actualiza cuando el usuario vuelva a entrar
  // con el correo ya verificado (asegurarPerfil no lo pisa; lo hace la app).
}

// Me envío a mí mismo el correo para restablecer mi contraseña.
export async function restablecerMiPassword() {
  if (!auth.currentUser?.email) throw new Error('Tu cuenta no tiene correo.')
  await sendPasswordResetEmail(auth, auth.currentUser.email)
}

// ---------- términos y condiciones ----------

/**
 * Registra en MI perfil que acepté la versión vigente del texto legal.
 *
 * La fecha la pone el SERVIDOR (`serverTimestamp`) y no el navegador: es la
 * constancia de cuándo se aceptó un contrato, y el reloj de quien acepta no
 * puede decidirla. La versión sí viaja desde el cliente, pero solo puede ser
 * la que la aplicación está mostrando: si mañana cambia, `aceptoTerminos`
 * dejará de darla por buena y se volverá a pedir.
 *
 * Las reglas permiten al usuario escribir únicamente el campo `terminos` de su
 * propio documento, y solo con esta forma.
 */
export async function aceptarTerminos(version) {
  const uid = auth.currentUser?.uid
  if (!uid) throw new Error('Necesitas iniciar sesión para aceptar los términos.')
  const { fichaAceptacion } = await import('../terminosModelo.js')
  await updateDoc(doc(db, 'usuarios', uid), {
    terminos: fichaAceptacion(serverTimestamp(), version),
  })
}
