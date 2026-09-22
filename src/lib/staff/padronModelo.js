// ============================================================
//  Padrón de la academia — cuántos hay y cómo están (lógica PURA)
// ------------------------------------------------------------
//  «Ver cuántos alumnos hay» parece una cifra y son cuatro, porque en un
//  mostrador la pregunta nunca es solo el total:
//
//   · cuántos ACTIVOS —la cifra que se dice en voz alta—;
//   · cuántos por GRUPO, que es como se organiza la clase;
//   · cuántos SIN GRUPO, que son los que entraron y no ven contenido: es el
//     agujero que ya se cerró en las altas por directorio, y aquí es la lista
//     que hay que vaciar;
//   · cuántos SIN MATRÍCULA, que son a los que no se les puede cobrar (la
//     regla de `pagos` la exige) ni imprimir un estado de cuenta.
//
//  Las dos últimas no son estadística: son listas de trabajo pendiente.
//
//  Módulo PURO: sin React y sin Firebase.
// ============================================================

/** Solo alumnos activos. Un dado de baja no cuenta en el padrón. */
export function alumnosActivos(personas) {
  return (personas || []).filter(
    (p) => p?.rol === 'alumno' && (p?.estado || 'activo') === 'activo'
  )
}

/**
 * El recuento, con sus listas de trabajo dentro.
 *
 * @returns {{
 *   total: number, sinGrupo: Array, sinMatricula: Array, suspendidos: number,
 *   porGrupo: Array<{grupoId, nombre, total}>
 * }}
 */
export function resumenDePadron(personas, grupos = []) {
  const activos = alumnosActivos(personas)
  const nombreDe = new Map((grupos || []).map((g) => [g.id, g.nombre || g.id]))

  const porGrupo = new Map()
  for (const a of activos) {
    const id = a.grupoId || null
    if (!id) continue
    const fila = porGrupo.get(id) || { grupoId: id, nombre: nombreDe.get(id) || id, total: 0 }
    fila.total += 1
    porGrupo.set(id, fila)
  }

  return {
    total: activos.length,
    suspendidos: (personas || []).filter(
      (p) => p?.rol === 'alumno' && p?.estado && p.estado !== 'activo'
    ).length,
    sinGrupo: activos.filter((a) => !a.grupoId),
    sinMatricula: activos.filter((a) => !String(a.matricula || '').trim()),
    porGrupo: [...porGrupo.values()].sort((a, b) => b.total - a.total),
  }
}

/** El padrón ordenado para la tabla y para la hoja impresa. */
export function ordenarPadron(personas, grupos = []) {
  const nombreDe = new Map((grupos || []).map((g) => [g.id, g.nombre || g.id]))
  return alumnosActivos(personas)
    .map((a) => ({
      uid: a.uid || a.id,
      nombre: a.nombre || 'Sin nombre',
      matricula: a.matricula || '',
      grupo: a.grupoId ? (nombreDe.get(a.grupoId) || a.grupoId) : '',
      email: a.email || '',
      telefono: a.telefono || '',
    }))
    .sort((a, b) => {
      // Por matrícula cuando las dos la tienen —es el orden en que se archiva—
      // y por nombre en cuanto falta una, para que los que no la tienen no se
      // amontonen todos al principio en un bloque sin criterio.
      if (a.matricula && b.matricula) return a.matricula.localeCompare(b.matricula)
      if (a.matricula) return -1
      if (b.matricula) return 1
      return a.nombre.localeCompare(b.nombre, 'es')
    })
}

/** Filtro de la tabla: por texto y por grupo. Se aplica sobre lo ya ordenado. */
export function filtrarPadron(filas, { texto = '', grupo = '' } = {}) {
  const t = String(texto || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim()
  return (filas || []).filter((f) => {
    if (grupo === '__sin__' && f.grupo) return false
    if (grupo && grupo !== '__sin__' && f.grupo !== grupo) return false
    if (!t) return true
    const heno = `${f.nombre} ${f.matricula} ${f.email} ${f.telefono}`
      .normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    return t.split(/\s+/).every((palabra) => heno.includes(palabra))
  })
}
