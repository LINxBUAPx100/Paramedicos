// Solo recibe las filas del grupo que el usuario ya tiene autorizado.
export function filtrarFilasCalificaciones(filas, { consulta = '', evidencia = 'todos', orden = 'nombre' } = {}) {
  const normalizar = (texto) => String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const busqueda = normalizar(consulta.trim())
  return filas.filter((fila) => {
    if (!normalizar(`${fila.alumno.nombre || ''} ${fila.alumno.email || ''}`).includes(busqueda)) return false
    if (evidencia === 'riesgo') return fila.promedio !== null && fila.promedio < 70
    if (evidencia === 'sin-evidencia') return fila.promedio === null
    if (evidencia === 'pendientes') return fila.pendientes > 0
    return true
  }).sort((a, b) => {
    if (orden === 'promedio') {
      const diferencia = (a.promedio ?? Infinity) - (b.promedio ?? Infinity)
      if (diferencia) return diferencia
    }
    return (a.alumno.nombre || a.alumno.email || a.alumno.id).localeCompare(b.alumno.nombre || b.alumno.email || b.alumno.id, 'es')
  })
}
