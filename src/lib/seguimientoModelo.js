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
