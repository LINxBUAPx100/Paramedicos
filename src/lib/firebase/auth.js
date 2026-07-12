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
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

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
