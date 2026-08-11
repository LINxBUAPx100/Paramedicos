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
import { validarPlanTipo } from '../capacidades.js'
import { sendPasswordResetEmail } from 'firebase/auth'
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, serverTimestamp,
  collection, query, where, getDocs, writeBatch,
} from 'firebase/firestore'

// --- Academias ---

// Crea una academia; el ID del doc ES el código de acceso.
// logo/lema/colorHero alimentan el hero personalizado del Home.
// `planComercial` (base|pro|curso) define capacidades; `plan` es solo la
// periodicidad de facturación (texto libre, p. ej. "anual").
export async function crearAcademia({
  codigo, nombre, tipo = 'basico', planComercial = 'base', plan = '',
  logo = '', lema = '', colorHero = '',
}) {
  const cod = String(codigo || '').trim().toUpperCase()
  if (!/^[A-Z0-9][A-Z0-9-]{2,19}$/.test(cod)) {
    throw new Error('Código inválido: usa 3–20 letras/números/guiones (p. ej. AEP-2026).')
  }
  if (!nombre?.trim()) throw new Error('Escribe el nombre de la academia.')
  const errorPlan = validarPlanTipo(planComercial, tipo)
  if (errorPlan) throw new Error(errorPlan)
  const ref = doc(db, 'academias', cod)
  const ya = await getDoc(ref)
  if (ya.exists()) throw new Error(`Ya existe una academia con el código ${cod}.`)
  await setDoc(ref, {
    nombre: nombre.trim(),
    tipo,
    planComercial,
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

    // Alta en DOS sistemas (Auth + Firestore) sin transacción posible desde el
    // cliente. Si el perfil falla, la cuenta de Auth se queda huérfana y ese
    // usuario cae PARA SIEMPRE en motivo 'sin-perfil' (AuthContext), con una
    // pantalla que le dice que vuelva a entrar y nunca se arregla. Peor aún:
    // asegurarPerfil() se lo recrearía como 'alumno' sin academia, no con el
    // rol que el director pidió. Así que se COMPENSA: se borra la cuenta recién
    // creada y el alta falla entera, que es un estado consistente.
    //
    // El orden importa: el borrado se hace ANTES del signOut, mientras la
    // sesión secundaria sigue siendo reciente (deleteUser exige credencial
    // fresca).
    try {
      // El perfil lo escribe la sesión PRINCIPAL (super-admin) con el rol pedido.
      await setDoc(doc(db, 'usuarios', uid), {
        nombre: nombre || '',
        email: email.trim(),
        rol,
        academiaId: academiaId || null,
        estado: 'activo',
        creado: serverTimestamp(),
      })
    } catch (err) {
      let compensado = true
      try {
        await authMod.deleteUser(cred.user)
      } catch {
        compensado = false
      }
      throw new Error(
        compensado
          ? `No se pudo crear el perfil de ${email.trim()} y el alta se deshizo entera. Inténtalo de nuevo. (${err.message})`
          : `No se pudo crear el perfil de ${email.trim()} y TAMPOCO se pudo deshacer su cuenta de acceso. ` +
            `Bórrala a mano en la consola de Firebase → Authentication antes de reintentar. (${err.message})`
      )
    }

    await authMod.signOut(authSec)
    return uid
  } finally {
    try { await deleteApp(segunda) } catch { /* ya cerrada */ }
  }
}

// Da de baja a un usuario. Es un BORRADO LÓGICO, y no por comodidad:
//
//   Borrar el doc de usuarios/{uid} NO expulsaba a nadie. Su registro de Auth
//   seguía vivo, así que al volver a entrar asegurarPerfil() le recreaba el
//   perfil como 'alumno', y con el código de su academia — que se sabe de
//   memoria — se reincorporaba. Expulsar a alguien no lo expulsaba.
//
// Con estado 'eliminado' el acceso queda cerrado de verdad: calcularAcceso()
// bloquea cualquier estado != 'activo' (AuthContext) y asegurarPerfil() no
// pisa un doc que ya existe. Además se le quita academia y grupo, así que
// desaparece de los paneles y de miembrosDeAcademia(); el super-admin sigue
// viéndolo en su listado global, que es lo que permite auditar la baja.
//
// El registro de Auth (correo/contraseña) solo se borra con el Admin SDK:
// consola de Firebase → Authentication, o un script con firebase-admin.
export async function eliminarUsuario(uid) {
  await updateDoc(doc(db, 'usuarios', uid), {
    estado: 'eliminado',
    academiaId: null,
    grupoId: null,
    // Se le retiran también los permisos editoriales: si algún día se
    // reactivara la cuenta, no debe volver con lo que tenía concedido.
    permisosEditor: {},
    puedeVerCodigos: false,
    eliminadoEn: serverTimestamp(),
  })
  try { await deleteDoc(doc(db, 'progreso', uid)) } catch { /* sin progreso */ }
}

// Envía el correo oficial de Firebase para restablecer la contraseña.
export async function enviarResetPassword(email) {
  if (!email) throw new Error('Ese usuario no tiene correo registrado.')
  await sendPasswordResetEmail(auth, email)
}
