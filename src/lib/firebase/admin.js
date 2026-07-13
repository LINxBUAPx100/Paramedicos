// ============================================================
//  Operaciones de administración (super-admin, sin Cloud Functions)
// ------------------------------------------------------------
//  LÍMITES del SDK de cliente (plan Spark, sin servidor):
//  - Crear usuarios: se hace con una app SECUNDARIA de Firebase para no
//    cerrar la sesión del administrador; el perfil lo escribe la sesión
//    principal (las reglas se lo permiten al super-admin).
//  - Cambiar la contraseña de otro: imposible directamente; lo correcto es
//    enviarle un CORREO de restablecimiento (enviarResetPassword).
//  - Cambiar el correo de INICIO DE SESIÓN de otro: imposible desde cliente;
//    solo el propio usuario desde Mi cuenta, o desde la consola de Firebase.
//  - Eliminar usuarios: se borra su perfil y su progreso en Firestore; su
//    registro de Auth queda huérfano (se borra en la consola si se quiere
//    eliminar del todo). Si vuelve a entrar, renace como alumno sin academia.
// ============================================================
import { auth, db, firebaseConfig } from './init.js'
import { sendPasswordResetEmail } from 'firebase/auth'
import {
  doc, getDoc, setDoc, deleteDoc, serverTimestamp,
  collection, query, where, getDocs, writeBatch,
} from 'firebase/firestore'

// --- Academias ---

// Crea una academia; el ID del doc ES el código de acceso.
// logo/lema/colorHero alimentan el hero personalizado del Home.
export async function crearAcademia({ codigo, nombre, tipo = 'basico', plan = '', logo = '', lema = '', colorHero = '' }) {
  const cod = String(codigo || '').trim().toUpperCase()
  if (!/^[A-Z0-9][A-Z0-9-]{2,19}$/.test(cod)) {
    throw new Error('Código inválido: usa 3–20 letras/números/guiones (p. ej. AEP-2026).')
  }
  if (!nombre?.trim()) throw new Error('Escribe el nombre de la academia.')
  const ref = doc(db, 'academias', cod)
  const ya = await getDoc(ref)
  if (ya.exists()) throw new Error(`Ya existe una academia con el código ${cod}.`)
  await setDoc(ref, {
    nombre: nombre.trim(),
    tipo,
    plan: plan || '',
    estado: 'activo',
    logo: logo?.trim() || '',
    lema: lema?.trim() || '',
    colorHero: colorHero || '',
    creado: serverTimestamp(),
  })
  return cod
}

// Cambia el CÓDIGO de una academia (el código es el ID del doc, así que se
// copia el doc al ID nuevo y se migra todo lo que lo referencia: usuarios,
// grupos, códigos de prueba, intentos y solicitudes). Solo super-admin.
export async function cambiarCodigoAcademia(codigoViejo, codigoNuevo) {
  const viejo = String(codigoViejo || '').trim().toUpperCase()
  const nuevo = String(codigoNuevo || '').trim().toUpperCase()
  if (!/^[A-Z0-9][A-Z0-9-]{2,19}$/.test(nuevo)) {
    throw new Error('Código inválido: usa 3–20 letras/números/guiones (p. ej. AEP-2027).')
  }
  if (nuevo === viejo) throw new Error('El código nuevo es igual al actual.')

  const refViejo = doc(db, 'academias', viejo)
  const refNuevo = doc(db, 'academias', nuevo)
  const [snapViejo, snapNuevo] = await Promise.all([getDoc(refViejo), getDoc(refNuevo)])
  if (!snapViejo.exists()) throw new Error(`No existe la academia ${viejo}.`)
  if (snapNuevo.exists()) throw new Error(`Ya existe una academia con el código ${nuevo}.`)

  // 1) Copia del doc con el ID nuevo (mismos datos).
  await setDoc(refNuevo, snapViejo.data())

  // 2) Migra todas las referencias por lotes (límite de 500 por batch).
  for (const col of ['usuarios', 'grupos', 'codigos', 'intentos', 'solicitudes', 'reportes']) {
    const snap = await getDocs(query(collection(db, col), where('academiaId', '==', viejo)))
    let batch = writeBatch(db)
    let n = 0
    for (const d of snap.docs) {
      batch.update(d.ref, { academiaId: nuevo })
      if (++n === 400) { await batch.commit(); batch = writeBatch(db); n = 0 }
    }
    if (n > 0) await batch.commit()
  }

  // 3) Borra el doc viejo: el código anterior deja de funcionar.
  await deleteDoc(refViejo)
  return nuevo
}

// --- Usuarios ---

// Crea un usuario (Auth + perfil) SIN tocar la sesión del administrador,
// usando una app secundaria que se cierra al terminar.
export async function crearUsuarioNuevo({ nombre, email, password, rol = 'alumno', academiaId = null }) {
  if (!email?.trim()) throw new Error('Escribe el correo del usuario.')
  if (!password || password.length < 6) throw new Error('La contraseña debe tener al menos 6 caracteres.')

  const [{ initializeApp, deleteApp }, authMod] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
  ])
  const segunda = initializeApp(firebaseConfig, `alta-${Date.now()}`)
  try {
    const authSec = authMod.getAuth(segunda)
    const cred = await authMod.createUserWithEmailAndPassword(authSec, email.trim(), password)
    if (nombre) await authMod.updateProfile(cred.user, { displayName: nombre })
    const uid = cred.user.uid
    await authMod.signOut(authSec)
    // El perfil lo escribe la sesión PRINCIPAL (super-admin) con el rol pedido.
    await setDoc(doc(db, 'usuarios', uid), {
      nombre: nombre || '',
      email: email.trim(),
      rol,
      academiaId: academiaId || null,
      estado: 'activo',
      creado: serverTimestamp(),
    })
    return uid
  } finally {
    try { await deleteApp(segunda) } catch { /* ya cerrada */ }
  }
}

// Borra el perfil y el progreso del usuario en Firestore (ver límites arriba).
export async function eliminarUsuario(uid) {
  await deleteDoc(doc(db, 'usuarios', uid))
  try { await deleteDoc(doc(db, 'progreso', uid)) } catch { /* sin progreso */ }
}

// Envía el correo oficial de Firebase para restablecer la contraseña.
export async function enviarResetPassword(email) {
  if (!email) throw new Error('Ese usuario no tiene correo registrado.')
  await sendPasswordResetEmail(auth, email)
}
