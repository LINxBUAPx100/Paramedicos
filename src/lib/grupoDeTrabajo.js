// ============================================================
//  El grupo con el que trabaja el personal, recordado entre pantallas
// ------------------------------------------------------------
//  Antes cada pantalla del staff tenía su propia memoria del grupo, o
//  ninguna: se elegía en Temario, se abría Grupos y volvía a pedirse; el
//  filtro de Alumnos se perdía al pasar a Calificaciones. Aquí vive UNA sola
//  memoria, por academia y por navegador.
//
//  Son dos cosas distintas y por eso dos claves:
//    · 'grupo'  — el grupo ELEGIDO en un selector (Temario, panel › Grupos).
//    · 'filtro' — el filtro de las listas ('' = todos, 'sin' = sin grupo, o un
//                 id), compartido por Alumnos, Calificaciones y el panel.
//  Separadas para que elegir «Todos» en un filtro no borre el grupo de trabajo.
//
//  Es una preferencia de lectura, no una credencial: quien la lee comprueba
//  que el id sigue existiendo antes de usarlo.
//
//  Módulo PURO salvo por localStorage (siempre con try/catch).
// ============================================================

const PREFIJO = 'ptem:trabajo'

export function claveDeTrabajo(tipo, academiaId) {
  return `${PREFIJO}:${tipo}:${academiaId || 'sin-academia'}`
}

export function leerDeTrabajo(tipo, academiaId) {
  try { return localStorage.getItem(claveDeTrabajo(tipo, academiaId)) || '' } catch { return '' }
}

export function recordarDeTrabajo(tipo, academiaId, valor) {
  try {
    const clave = claveDeTrabajo(tipo, academiaId)
    if (valor) localStorage.setItem(clave, valor)
    else localStorage.removeItem(clave)
  } catch { /* almacenamiento bloqueado: la elección dura lo que la pantalla */ }
}

/**
 * Un filtro recordado solo vale si todavía tiene sentido: '' y 'sin' siempre;
 * un id, solo si ese grupo sigue en la lista. Si no, «todos».
 */
export function filtroValido(valor, grupos = []) {
  if (!valor || valor === 'sin') return valor || ''
  return grupos.some((g) => g.id === valor) ? valor : ''
}
