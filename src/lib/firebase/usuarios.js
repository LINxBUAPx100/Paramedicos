// ============================================================
//  Operaciones sobre usuarios / academias
// ============================================================
import { db } from './init.js'
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { normalizarPermisos, validarPermisos, PERMISOS_EDITOR } from '../permisosEditor.js'

// Une al alumno a una academia validando su código (el código ES el id del doc).
export async function unirseAcademia(uid, codigo) {
  const cod = String(codigo || '').trim().toUpperCase()
  if (!cod) throw new Error('Escribe el código de tu academia.')

  const aca = await getDoc(doc(db, 'academias', cod))
  if (!aca.exists()) throw new Error('No existe una academia con ese código.')
  if (aca.data().estado !== 'activo') throw new Error('Esa academia no está activa.')

  // Unión REAL: el grupo anterior deja de aplicar y la marca de prueba se quita.
  await updateDoc(doc(db, 'usuarios', uid), { academiaId: cod, grupoId: null, esPrueba: false })
  return { id: cod, ...aca.data() }
}

// Miembros de una academia (para el panel del maestro/admin).
export async function miembrosDeAcademia(academiaId) {
  const q = query(collection(db, 'usuarios'), where('academiaId', '==', academiaId))
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.nombre || '').localeCompare(b.nombre || ''))
}

// Todas las academias (para el selector del super-admin).
export async function listarAcademias() {
  const snap = await getDocs(collection(db, 'academias'))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => a.id.localeCompare(b.id))
}

// Una academia por su código (dashboard individual).
export async function obtenerAcademia(academiaId) {
  const snap = await getDoc(doc(db, 'academias', academiaId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

// Actualiza campos de una academia (estado, nombre…). Solo super-admin (reglas).
export async function actualizarAcademia(academiaId, cambios) {
  await updateDoc(doc(db, 'academias', academiaId), cambios)
}

// TODOS los usuarios de la plataforma (dashboard del super-admin).
export async function listarUsuarios() {
  const snap = await getDocs(collection(db, 'usuarios'))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.nombre || a.email || '').localeCompare(b.nombre || b.email || ''))
}

// Cambia rol / estado / academia de un usuario. Las reglas deciden quién puede:
// super-admin (cualquier cambio) o admin_escuela (alumno<->instructor de su academia).
export async function actualizarUsuario(uid, cambios) {
  await updateDoc(doc(db, 'usuarios', uid), cambios)
}

// Concede/retira los PERMISOS EDITORIALES de un PROFESOR (Fase 6). La barrera
// REAL es firestore.rules (solo director PRO/super, mismo profesor de SU
// academia, solo el campo permisosEditor); aquí se validan la forma y los
// cursos, se escribe el mapa NORMALIZADO y se registra la auditoría en
// `historial` (append-only). `cursosDisponibles`: cursoId reales de la academia
// (para rechazar cursos que no existen). Devuelve los permisos normalizados.
export async function asignarPermisosEditor(instructorUid, permisos, { cursosDisponibles = null } = {}) {
  const norm = normalizarPermisos(permisos)
  const error = validarPermisos(norm, cursosDisponibles)
  if (error) throw new Error(error)

  const ref = doc(db, 'usuarios', instructorUid)
  const snap = await getDoc(ref)
  if (!snap.exists()) throw new Error('Ese profesor ya no existe.')
  const datos = snap.data()
  if (datos.rol !== 'instructor') {
    throw new Error('Los permisos editoriales solo se asignan a profesores.')
  }
  const antes = normalizarPermisos(datos.permisosEditor)

  await updateDoc(ref, { permisosEditor: norm })

  // Auditoría (best-effort: no debe tumbar la asignación si el historial falla).
  const otorgaAlgo = PERMISOS_EDITOR.some((k) => norm[k])
  try {
    const { registrarHistorial } = await import('./contenido.js')
    await registrarHistorial({
      academiaId: datos.academiaId || null,
      accion: otorgaAlgo ? 'asignar-permisos' : 'revocar-permisos',
      coleccion: 'usuarios',
      docId: instructorUid,
      antes,
      despues: norm,
      origen: 'panel',
    })
  } catch { /* la auditoría no bloquea la operación principal */ }

  return norm
}

// Entradas de auditoría de permisos de una academia (las lee el director/super
// por reglas). Filtra el historial a las acciones de permisos, más recientes
// primero. Devuelve [] si la academia no tiene historial legible.
export async function historialPermisos(academiaId) {
  const q = query(collection(db, 'historial'), where('academiaId', '==', academiaId))
  const snap = await getDocs(q)
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .filter((h) => h.accion === 'asignar-permisos' || h.accion === 'revocar-permisos')
    .sort((a, b) => (b.fecha?.seconds || 0) - (a.fecha?.seconds || 0))
}
