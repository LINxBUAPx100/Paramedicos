// ============================================================
//  Avance por alumno: qué módulos ve cada uno — lógica PURA
// ------------------------------------------------------------
//  La visibilidad tiene DOS capas, y confundirlas es lo que hacía que el panel
//  solo dejara avanzar de una en una:
//
//    1. El GRUPO decide qué módulos están ocultas para todos sus alumnos
//       (`grupos/{id}.modulosOcultos`).
//    2. El ALUMNO puede tener módulos desbloqueadas individualmente
//       (`usuarios/{uid}.modulosDesbloqueados`), que ANULAN lo oculto del grupo.
//
//  Ese segundo campo ya existía y ya lo respetaba `useVisibilidad`, pero solo
//  se podía tocar aprobando la solicitud del «siguiente módulo»: el profesor no
//  podía abrirle a un alumno el módulo 5 sin abrirle antes el 3 y el 4. Aquí está
//  el estado de CADA módulo para CADA alumno, que es lo que permite ofrecerlas
//  todas a la vez.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================

// Estados posibles de un módulo para un alumno:
//   'grupo'      → la ve porque su grupo la muestra (no hay nada que decidir)
//   'individual' → su grupo la oculta pero se le desbloqueó a él
//   'oculta'     → su grupo la oculta y a él no se le ha abierto
export function estadoModuloAlumno(moduloId, { modulosOcultosDelGrupo = [], modulosDesbloqueados = [] } = {}) {
  const ocultaEnGrupo = (modulosOcultosDelGrupo || []).includes(moduloId)
  if (!ocultaEnGrupo) return 'grupo'
  return (modulosDesbloqueados || []).includes(moduloId) ? 'individual' : 'oculta'
}

// ¿Se puede alternar este módulo para este alumno? Solo tiene sentido si su grupo
// la oculta: si el grupo ya la muestra, quitársela a UNA persona no se puede
// —el campo solo suma, no resta— y ofrecer un interruptor que no hace nada es
// peor que no ofrecerlo.
export function sePuedeAlternar(estado) {
  return estado === 'individual' || estado === 'oculta'
}

// Qué hace el interruptor: 'desbloquear' o 'bloquear'. Devuelve null cuando no
// hay nada que hacer, para que la interfaz no invente una acción.
export function accionDeAlternar(estado) {
  if (estado === 'oculta') return 'desbloquear'
  if (estado === 'individual') return 'bloquear'
  return null
}

// Retrato de un alumno frente a todas los módulos del temario.
export function avanceDeAlumno(alumno, modulos, modulosOcultosDelGrupo) {
  const desbloqueadas = alumno?.modulosDesbloqueados || []
  const filas = (modulos || []).map((f) => {
    const estado = estadoModuloAlumno(f.id, {
      modulosOcultosDelGrupo, modulosDesbloqueados: desbloqueadas,
    })
    return { modulo: f, estado, alternable: sePuedeAlternar(estado), accion: accionDeAlternar(estado) }
  })
  return {
    filas,
    // Lo que el alumno ve de verdad, sea por su grupo o por su desbloqueo.
    visibles: filas.filter((r) => r.estado !== 'oculta').length,
    // Lo que se le abrió a él en particular: es el trabajo del profesor.
    individuales: filas.filter((r) => r.estado === 'individual').length,
    total: filas.length,
  }
}

// Los módulos que hay que desbloquear para llevar a un alumno HASTA un módulo
// concreta, incluida. Sirve al atajo «ábrele hasta aquí», que es como piensa un
// maestro: no «desbloquea la 3, la 4 y la 5», sino «que llegue hasta la 5».
// Solo devuelve las que su grupo oculta y él aún no tiene.
export function modulosHasta(modulos, moduloIdDestino, { modulosOcultosDelGrupo = [], modulosDesbloqueados = [] } = {}) {
  const lista = modulos || []
  const corte = lista.findIndex((f) => f.id === moduloIdDestino)
  if (corte < 0) return []
  return lista
    .slice(0, corte + 1)
    .filter((f) => (modulosOcultosDelGrupo || []).includes(f.id))
    .filter((f) => !(modulosDesbloqueados || []).includes(f.id))
    .map((f) => f.id)
}

// Resumen del grupo entero: cuántos alumnos van por cada módulo. Es lo que
// convierte una tabla de casillas en información que se puede mirar de un
// vistazo.
export function resumenAvanceGrupo(alumnos, modulos, modulosOcultosDelGrupo) {
  return (modulos || []).map((f) => {
    let conAcceso = 0
    let individuales = 0
    for (const al of alumnos || []) {
      const estado = estadoModuloAlumno(f.id, {
        modulosOcultosDelGrupo, modulosDesbloqueados: al?.modulosDesbloqueados || [],
      })
      if (estado !== 'oculta') conAcceso += 1
      if (estado === 'individual') individuales += 1
    }
    return { modulo: f, conAcceso, individuales, total: (alumnos || []).length }
  })
}
