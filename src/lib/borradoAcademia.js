// ============================================================
//  Dar de baja una academia — decisiones PURAS
// ------------------------------------------------------------
//  Se podían CREAR academias y no había forma de borrarlas ni archivarlas:
//  solo suspenderlas, que las deja existiendo con todo dentro. Justo la
//  asimetría que este proyecto tiene escrito que no debe haber.
//
//  Borrar una academia no es borrar un documento: de ella cuelgan personas,
//  grupos, códigos, intentos, solicitudes y reportes. Si se borra el documento
//  y nada más, esos usuarios quedan apuntando a una academia que no existe: no
//  pueden entrar y no hay pantalla donde arreglarlo.
//
//  Por eso son DOS PASOS y en este orden:
//    1. ¿Qué pasa con las personas? (moverlas, dejarlas sin academia, borrarlas)
//    2. Ya sabiendo eso, ¿qué se hace con la academia? (borrar / archivar /
//       suspender)
//  Preguntarlo al revés obliga a decidir lo irreversible antes de saber a
//  quién afecta.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================

// Qué se puede hacer con la academia al final del asistente.
export const ACCIONES_ACADEMIA = {
  borrar: {
    etiqueta: 'Borrar definitivamente',
    tono: 'peligro',
    reversible: false,
    descripcion: 'Se elimina la academia y todo lo suyo: grupos, códigos, intentos, solicitudes y reportes. No se puede deshacer.',
  },
  archivar: {
    etiqueta: 'Solo archivar',
    tono: 'aviso',
    reversible: true,
    descripcion: 'La academia deja de aparecer en las listas y nadie puede entrar, pero se conserva todo. Se puede restaurar.',
  },
  suspender: {
    etiqueta: 'Solo suspender',
    tono: 'aviso',
    reversible: true,
    descripcion: 'Sus miembros no pueden acceder al contenido, pero la academia sigue a la vista y se reactiva con un clic.',
  },
}

// El destino de las personas. `borrar` va aparte en la interfaz (botón rojo a
// la izquierda); el resto son destinos de una lista.
export const DESTINO_BORRAR = 'borrar'
export const DESTINO_SIN_ACADEMIA = 'sin'

// Lista de destinos para las personas: primero «sin academia», después las
// demás academias. La propia academia NO aparece: mover a alguien a la academia
// que se está borrando no significa nada.
export function destinosDeUsuarios(academias, academiaId) {
  const otras = (academias || [])
    .filter((a) => a && a.id && a.id !== academiaId)
    .map((a) => ({ id: a.id, etiqueta: `${a.nombre || a.id} (${a.id})` }))
    .sort((a, b) => a.etiqueta.localeCompare(b.etiqueta))
  return [
    { id: DESTINO_SIN_ACADEMIA, etiqueta: 'Dejarlos sin academia (podrán entrar con otro código)' },
    ...otras,
  ]
}

// Resumen de a quién afecta, para poder enseñarlo ANTES de decidir.
export function reparto(usuarios, academiaId) {
  const dentro = (usuarios || []).filter((u) => u && u.academiaId === academiaId && u.estado !== 'eliminado')
  return {
    total: dentro.length,
    alumnos: dentro.filter((u) => u.rol === 'alumno').length,
    staff: dentro.filter((u) => u.rol === 'instructor' || u.rol === 'admin_escuela').length,
    uids: dentro.map((u) => u.id),
  }
}

// Qué va a pasar, en una frase, para que la pantalla no tenga que componerla.
// Se prueba porque es la única señal de lo que se está a punto de hacer.
export function describirDestino(destino, cuenta, academias = []) {
  if (cuenta === 0) return 'Esta academia no tiene personas: no hay nada que reubicar.'
  const gente = cuenta === 1 ? '1 persona' : `${cuenta} personas`
  if (destino === DESTINO_BORRAR) {
    return `Se dará de baja a ${gente}. Sus cuentas dejarán de funcionar.`
  }
  if (destino === DESTINO_SIN_ACADEMIA) {
    return `${gente} se quedará sin academia y podrá entrar a otra con un código.`
  }
  const a = (academias || []).find((x) => x.id === destino)
  return `${gente} pasará a ${a?.nombre || destino}.`
}

// ¿Se puede pasar del paso 1 al paso 2? Sin destino elegido, no: el asistente
// no debe dejar avanzar con una decisión a medias.
export function puedeAvanzar(destino, cuenta) {
  if (cuenta === 0) return true // sin personas, el paso 1 no decide nada
  return Boolean(destino)
}

// La frase de confirmación del borrado definitivo es el CÓDIGO de la academia:
// escribirlo obliga a mirar cuál se está borrando, que es el error que de
// verdad se quiere evitar (borrar la academia equivocada).
export function validarConfirmacion(escrito, academiaId) {
  const limpio = String(escrito || '').trim().toUpperCase()
  return limpio === String(academiaId || '').trim().toUpperCase()
}

// Solo el borrado exige escribir el código. Archivar y suspender son
// reversibles: pedir una frase para algo que se deshace con un clic enseña a
// teclear frases sin leerlas, y entonces tampoco protege el borrado.
export function exigeConfirmacionEscrita(accion) {
  return ACCIONES_ACADEMIA[accion]?.reversible === false
}
