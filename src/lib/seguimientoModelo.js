import { APROBADO } from './panelModelo.js'

export function filasSeguimiento(alumnos = [], porAlumno = {}, { consulta = '', categoria = 'todos', orden = 'nombre' } = {}) {
  const normalizar = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const q = normalizar(consulta.trim())
  const filas = alumnos.map((alumno) => {
    const notas = Object.values(porAlumno[alumno.id] || {}).map((m) => m.mejor).filter(Number.isFinite)
    const promedio = notas.length ? Math.round(notas.reduce((a, b) => a + b, 0) / notas.length) : null
    return { alumno, promedio, categoria: promedio === null ? 'sin-evidencia' : promedio < APROBADO ? 'riesgo' : 'con-evidencia', modulos: notas.length }
  }).filter((f) => (categoria === 'todos' || categoria === f.categoria) && normalizar(`${f.alumno.nombre} ${f.alumno.email || ''}`).includes(q))
  return filas.sort((a, b) => orden === 'promedio'
    ? (a.promedio ?? -1) - (b.promedio ?? -1) || String(a.alumno.nombre).localeCompare(String(b.alumno.nombre), 'es')
    : String(a.alumno.nombre || a.alumno.email).localeCompare(String(b.alumno.nombre || b.alumno.email), 'es'))
}

/**
 * Semáforo de UN módulo en el grupo (PTEM Pulso): cuántos alumnos lo aprueban,
 * cuántos están por debajo y cuántos no tienen intento. «Sin intento» NO es
 * reprobación y se cuenta aparte.
 */
export function semaforoDeModulo(alumnos = [], porAlumno = {}, moduloId) {
  let aprobados = 0
  let bajo = 0
  let sinIntento = 0
  for (const a of alumnos) {
    const nota = porAlumno[a.id]?.[moduloId]?.mejor
    if (!Number.isFinite(nota)) sinIntento += 1
    else if (nota >= APROBADO) aprobados += 1
    else bajo += 1
  }
  return { aprobados, bajo, sinIntento, total: alumnos.length }
}

/** A quién atender primero: los de promedio más bajo, luego los sin evidencia. */
export function atenderPrimero(alumnos = [], porAlumno = {}, cuantos = 5) {
  const filas = filasSeguimiento(alumnos, porAlumno, { orden: 'promedio' })
  const riesgo = filas.filter((f) => f.categoria === 'riesgo')
  const sin = filas.filter((f) => f.categoria === 'sin-evidencia')
  return [...riesgo, ...sin].slice(0, cuantos)
}
