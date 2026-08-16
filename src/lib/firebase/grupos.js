// ============================================================
//  Grupos internos de una academia — colección `grupos`
// ------------------------------------------------------------
//  El ID del doc ES el código del grupo (p. ej. GRP-7K3M). Un mismo código
//  sirve para profesores y alumnos: al unirse, el perfil recibe grupoId y
//  academiaId (la academia del grupo). El director y el super-admin crean,
//  renombran y desactivan los grupos; el panel filtra avances por grupo.
// ============================================================
import { db } from './init.js'
import {
  doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where,
  getDocs, serverTimestamp,
} from 'firebase/firestore'
import { normalizarGrupo, normalizarGrupos } from '../compatNombres.js'

// Código legible tipo GRP-7K3M (sin caracteres confusos).
function generarCodigoGrupo() {
  const abc = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let sufijo = ''
  for (let i = 0; i < 4; i++) sufijo += abc[Math.floor(Math.random() * abc.length)]
  return `GRP-${sufijo}`
}

// Crea un grupo de la academia. Devuelve { id }.
//
// `programaId` es el PLAN DE ESTUDIOS del grupo y, por tanto, lo que define el
// «tipo de alumno»: un grupo de Enfermería solo da acceso al programa de
// Enfermería. Puede quedar en null al crear (el director lo asigna después),
// pero mientras esté vacío sus alumnos no verán contenido — la ruta protegida
// se lo dice con todas sus letras (programasModelo.motivoSinPrograma).
export async function crearGrupo({ academiaId, nombre, creadoPor, programaId = null, tipoPrograma = null }) {
  if (!nombre?.trim()) throw new Error('Escribe el nombre del grupo.')
  if (!academiaId) throw new Error('El grupo necesita una academia.')
  for (let intento = 0; intento < 5; intento++) {
    const id = generarCodigoGrupo()
    const ref = doc(db, 'grupos', id)
    const ya = await getDoc(ref)
    if (ya.exists()) continue
    await setDoc(ref, {
      academiaId,
      nombre: nombre.trim(),
      creadoPor,
      estado: 'activo',
      programaId,
      tipoPrograma,
      programasExtra: [],
      creado: serverTimestamp(),
    })
    return { id }
  }
  throw new Error('No se pudo generar un código único. Intenta de nuevo.')
}

// Asigna (o cambia) el plan de estudios de un grupo.
//
// `tipoPrograma` viaja DENORMALIZADO junto al id para poder etiquetar grupos
// sin leer la colección `cursos` entera en cada pantalla. Es una etiqueta, no
// una llave: el acceso lo decide `programaId`, así que si se desincroniza no
// abre ninguna puerta.
//
// `programasExtra` son los programas ADICIONALES del grupo — el caso real son
// las dos especializaciones que el plan oficial exige al alumno de TUM.
export async function asignarProgramaAGrupo(id, { programaId, tipoPrograma = null, programasExtra = null }) {
  if (!id) throw new Error('Falta el grupo.')
  const cambios = { programaId: programaId || null, tipoPrograma: tipoPrograma || null }
  if (programasExtra) {
    if (!Array.isArray(programasExtra)) throw new Error('Los programas extra deben ser una lista.')
    cambios.programasExtra = [...new Set(programasExtra.filter(Boolean))]
  }
  await updateDoc(doc(db, 'grupos', id), cambios)
  // El contenido servido depende del grupo: sin esto, los alumnos que ya
  // tuvieran contenido en memoria seguirían viendo el programa anterior.
  const { limpiarCacheContenido } = await import('./contenido.js')
  limpiarCacheContenido()
}

// Grupos de una academia (staff).
export async function listarGrupos(academiaId) {
  const q = query(collection(db, 'grupos'), where('academiaId', '==', academiaId))
  const snap = await getDocs(q)
  // normalizarGrupos traduce `fasesOcultas` → `modulosOcultos` en los grupos
  // creados antes del renombrado (ver lib/compatNombres.js): sin esto su
  // visibilidad configurada dejaría de aplicarse en silencio.
  return normalizarGrupos(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    .sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''))
}

// Renombrar (solo director/super-admin, lo imponen las reglas).
export async function renombrarGrupo(id, nombre) {
  const limpio = String(nombre || '').trim()
  if (!limpio) throw new Error('Escribe el nombre del grupo.')
  await updateDoc(doc(db, 'grupos', id), { nombre: limpio })
}

export async function alternarGrupo(id, estado) {
  await updateDoc(doc(db, 'grupos', id), { estado })
}

export async function borrarGrupo(id) {
  await deleteDoc(doc(db, 'grupos', id))
}

// Aplica los cambios de visibilidad que calcula `alcanceContenido.js`. Las
// reglas dejan al staff de la academia tocar SOLO `modulosOcultos` y
// `temasOcultos`, así que esto vale también para un profesor.
//
// En un lote: son N-1 grupos y deben quedar todos o ninguno. Si se escribieran
// de una en una y fallara la tercera, el tema quedaría visible para unos grupos
// y no para otros, que es el peor de los dos resultados posibles.
export async function aplicarVisibilidad(cambios) {
  if (!Array.isArray(cambios) || cambios.length === 0) return 0
  const { writeBatch } = await import('firebase/firestore')
  const batch = writeBatch(db)
  for (const c of cambios) {
    batch.update(doc(db, 'grupos', c.grupoId), { [c.campo]: c.valores })
  }
  await batch.commit()
  return cambios.length
}

// Une al usuario (alumno o profesor) a un grupo por su código: fija grupoId
// y también academiaId (la academia del grupo). Devuelve el grupo.
export async function unirseGrupo(uid, codigo) {
  const cod = String(codigo || '').trim().toUpperCase()
  const snap = await getDoc(doc(db, 'grupos', cod))
  if (!snap.exists()) throw new Error('No existe un grupo con ese código.')
  const g = normalizarGrupo(snap.data())
  if (g.estado !== 'activo') throw new Error('Ese grupo está desactivado.')
  const aca = await getDoc(doc(db, 'academias', g.academiaId))
  if (!aca.exists() || aca.data().estado !== 'activo') {
    throw new Error('La academia de ese grupo no está activa.')
  }
  // Unión REAL: quita la marca de prueba si venía de un código temporal.
  await updateDoc(doc(db, 'usuarios', uid), { grupoId: cod, academiaId: g.academiaId, esPrueba: false })
  return { id: cod, ...g, academia: { id: g.academiaId, ...aca.data() } }
}
