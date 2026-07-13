// ============================================================
//  Configuración global de la plataforma (solo super-admin)
// ------------------------------------------------------------
//  - Anuncio global: banner que ven TODOS los usuarios.
//  - Facturación de academias: plan, estado y fecha de renovación
//    (los directores no pueden tocar estos campos; lo imponen las reglas).
// ============================================================
import { db } from './init.js'
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, Timestamp } from 'firebase/firestore'

// --- Anuncio global (configuracion/anuncio) ---
export async function obtenerAnuncio() {
  try {
    const snap = await getDoc(doc(db, 'configuracion', 'anuncio'))
    return snap.exists() ? snap.data() : null
  } catch {
    return null
  }
}

export async function guardarAnuncio({ mensaje, tipo = 'info', activo }) {
  await setDoc(
    doc(db, 'configuracion', 'anuncio'),
    { mensaje: String(mensaje || '').trim(), tipo, activo: Boolean(activo), actualizado: serverTimestamp() },
    { merge: true }
  )
}

// --- Facturación / plan de una academia ---
// Fija plan (texto), estado (activo|suspendido) y fecha de renovación (Date).
export async function actualizarFacturacion(academiaId, { plan, estado, fechaRenovacion }) {
  const cambios = {}
  if (plan !== undefined) cambios.plan = String(plan || '').trim()
  if (estado !== undefined) cambios.estado = estado
  if (fechaRenovacion !== undefined) {
    cambios.fechaRenovacion = fechaRenovacion ? Timestamp.fromDate(new Date(fechaRenovacion)) : null
  }
  await updateDoc(doc(db, 'academias', academiaId), cambios)
}

// Extiende la renovación N días desde la fecha vigente (o desde hoy si ya venció)
// y reactiva la academia. Devuelve la nueva fecha.
export async function renovarAcademia(academiaId, dias = 30, fechaActual = null) {
  const base = fechaActual && fechaActual > Date.now() ? fechaActual : Date.now()
  const nueva = new Date(base + dias * 24 * 60 * 60 * 1000)
  await updateDoc(doc(db, 'academias', academiaId), {
    fechaRenovacion: Timestamp.fromDate(nueva),
    estado: 'activo',
  })
  return nueva
}
