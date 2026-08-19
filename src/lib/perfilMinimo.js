// ============================================================
//  Perfil MÍNIMO viable — lógica PURA
// ------------------------------------------------------------
//  Un usuario de Firebase Auth no sirve de nada sin su documento en
//  `usuarios/{uid}`, y —esto es lo que costó un fallo real— tampoco sirve con
//  el documento a medias. Las reglas de escritura del propio perfil comparan
//  `rol`, `estado` y `academiaId` con lo que ya hay guardado, y en Firestore
//  Rules leer un campo que NO EXISTE con notación de punto no vale `false`:
//  lanza un error de evaluación que tumba la regla entera. Resultado: una
//  cuenta cuyo doc no tenía `rol` no podía escribir NADA sobre su propio
//  perfil —ni cambiar su nombre, ni unirse por código, ni canjear la
//  invitación que le habían mandado— y el único síntoma visible era
//  «Missing or insufficient permissions», con el rol pintado como «—».
//
//  El alta puede quedarse a medias por causas del todo normales: el `setDoc`
//  del registro se cae por red, la pestaña se cierra entre crear la cuenta y
//  crear el perfil, o el documento viene de una versión anterior del esquema.
//  Así que el estado «perfil incompleto» no es una anomalía imposible: es un
//  caso que la aplicación tiene que saber detectar y arreglar sola.
//
//  Aquí vive esa decisión (qué falta y con qué se rellena). Lo usa
//  `asegurarPerfil` (lib/firebase/auth.js) para escribir el parche y
//  AuthContext para saber si hay que repararlo.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================

// Rol mínimo. Nunca se rellena con nada más alto: subir de alumno exige una
// invitación por rol (o que lo promueva un director), y así lo imponen las
// reglas además de este módulo.
export const ROL_POR_DEFECTO = 'alumno'

/**
 * ¿El perfil tiene lo imprescindible para que las reglas puedan evaluarse?
 * `null` (documento inexistente) NO está completo: hay que crearlo.
 */
export function perfilCompleto(perfil) {
  if (!perfil) return false
  if (!perfil.rol) return false
  if (perfil.academiaId === undefined) return false
  return true
}

/**
 * Campos que hay que escribir para completar un perfil existente. Vacío = nada
 * que hacer.
 *
 * `estado` NO se toca: no está en la lista blanca que las reglas permiten al
 * propio usuario, y su ausencia ya no denega nada (las reglas lo leen con
 * `.get('estado', 'activo')`). Rellenarlo aquí solo produciría un rechazo.
 *
 * @param datos  lo que hay hoy en usuarios/{uid} (o null si no existe)
 * @param user   el usuario de Auth (email y displayName son la fuente buena)
 * @param nombre nombre recién escrito en el registro, si lo hubo
 */
export function parcheDePerfil(datos, user = null, nombre = '') {
  const parche = {}
  if (!datos?.rol) parche.rol = ROL_POR_DEFECTO
  if (datos?.academiaId === undefined) parche.academiaId = null
  const nombreBueno = String(nombre || user?.displayName || '').trim()
  if (!datos?.nombre && nombreBueno) parche.nombre = nombreBueno
  // El correo de Auth manda: puede haber cambiado desde «Mi cuenta».
  if (user?.email && datos?.email !== user.email) parche.email = user.email
  return parche
}

/** Documento completo para un perfil que NO existe todavía. */
export function perfilNuevo(user, nombre = '') {
  return {
    nombre: String(nombre || user?.displayName || '').trim(),
    email: user?.email || '',
    rol: ROL_POR_DEFECTO,
    academiaId: null,
    estado: 'activo',
  }
}
