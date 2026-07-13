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

const googleProvider = new GoogleAuthProvider()

// Crea el perfil en usuarios/{uid} si aún no existe (rol 'alumno' por defecto).
export async function asegurarPerfil(user, nombre) {
  const ref = doc(db, 'usuarios', user.uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) {
    await setDoc(ref, {
      nombre: nombre || user.displayName || '',
      email: user.email || '',
      rol: 'alumno',
      academiaId: null,
      estado: 'activo',
      creado: serverTimestamp(),
    })
  } else if (user.email && snap.data().email !== user.email) {
    // El correo de Auth cambió (p. ej. lo actualizó desde Mi cuenta):
    // sincroniza el campo informativo del perfil.
    await updateDoc(ref, { email: user.email })
  }
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
