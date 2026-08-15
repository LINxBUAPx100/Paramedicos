// ============================================================
//  Estados de una cuenta y qué se puede hacer con ella — PURO
// ------------------------------------------------------------
//  Las cuentas se dan de baja de forma LÓGICA: el documento se queda con
//  `estado: 'eliminado'`, sin academia, sin grupo y sin permisos. Eso ya
//  existía. Lo que no existía era la vuelta: una cuenta dada de baja no se
//  podía reactivar desde ninguna pantalla.
//
//  Y «volver a crearla» no es una alternativa: el registro de Auth (correo y
//  contraseña) sigue existiendo —solo se borra con el Admin SDK, desde la
//  consola de Firebase—, así que dar de alta a la misma persona con el mismo
//  correo falla con «email already in use». La única vuelta posible, y además
//  la buena, es reactivar la que ya está: conserva su uid, su historial y sus
//  intentos.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================

export const ESTADOS = {
  activo: { etiqueta: 'Activa', tono: 'ok' },
  suspendido: { etiqueta: 'Suspendida', tono: 'aviso' },
  eliminado: { etiqueta: 'Dada de baja', tono: 'mal' },
}

export function estadoDeCuenta(usuario) {
  const e = usuario?.estado || 'activo'
  return ESTADOS[e] ? e : 'activo'
}

export function estaDadaDeBaja(usuario) {
  return estadoDeCuenta(usuario) === 'eliminado'
}

// Reactivar EXIGE academia porque la baja se la quitó. Sin ella, la cuenta
// volvería «activa» pero sin poder entrar a ningún contenido: activa por
// dentro y rota por fuera, que es peor que seguir de baja.
export function reactivarExigeAcademia(usuario) {
  return estaDadaDeBaja(usuario) && !usuario?.academiaId
}

// Rol con el que vuelve. Se conserva el que tenía, pero nunca se devuelve a
// alguien como superadmin: ese rol se concede a mano y no se hereda de un
// documento antiguo.
export function rolAlReactivar(usuario) {
  const rol = usuario?.rol
  if (!rol || rol === 'superadmin') return 'alumno'
  return rol
}

// Qué ofrece la interfaz para esta cuenta. Devuelve ids de acción, para que la
// pantalla no decida nada por su cuenta.
export function accionesDeCuenta(usuario, { esSuperadmin = false } = {}) {
  const estado = estadoDeCuenta(usuario)
  if (estado === 'eliminado') {
    // Un director no puede: la cuenta ya no pertenece a su academia, así que
    // las reglas no le dejan tocarla. Ofrecérselo sería un botón que falla.
    return esSuperadmin ? ['reactivar'] : []
  }
  const acciones = [estado === 'suspendido' ? 'activar' : 'suspender']
  acciones.push('dar-de-baja')
  return acciones
}

// Aviso honesto de lo que la reactivación NO devuelve. Se dice antes de
// pulsar: la baja retira los permisos editoriales a propósito, y volver sin
// ellos es lo correcto pero hay que avisarlo para que nadie lo dé por hecho.
export function avisoDeReactivacion() {
  return 'Vuelve con su historial y sus intentos, pero SIN los permisos editoriales que tuviera: la baja se los retiró y hay que concederlos otra vez si los necesita.'
}
