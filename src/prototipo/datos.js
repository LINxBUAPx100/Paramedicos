import { todosLosTemas, modulos } from '../data/index.js'
export { modulos }
export const tema = todosLosTemas.find((t) => t.id === 'm2-afi-cardiovascular')
export const alumnos = Array.from({ length: 200 }, (_, i) => ({ id: `demo-${i}`, nombre: `${['Ana', 'Daniel', 'Elena', 'Gabriel', 'Lucía', 'María', 'Omar', 'Sofía'][i % 8]} · Alumno de prueba ${String(i + 1).padStart(3, '0')}`, email: `alumno${i + 1}@example.invalid` }))
export const porAlumno = Object.fromEntries(alumnos.filter((_, i) => i % 4 !== 0).map((a, i) => [a.id, { [modulos[0].id]: { mejor: 45 + i % 56, n: 1 + i % 3 } }]))
// Fixture de volumen: bloques originales, con origen visible; no representa una lección académica nueva.
const conTablas = todosLosTemas.find((t) => t.id === 'm4-far-nom-034')
export const seccionesVolumen = [...conTablas.secciones, ...tema.secciones.filter((s) => !s.bloques.some((b) => b.tipo === 'tabla')).slice(0, 5)].map((s, i) => ({ ...s, titulo: `${s.titulo} · fuente: ${i < conTablas.secciones.length ? conTablas.titulo : tema.titulo}` }))
