// ============================================================
//  Recepción · asistencias — el check-in que sustituye a la firma en papel
// ------------------------------------------------------------
//  EL ID ES DETERMINISTA (`{uid}__{AAAA-MM-DD}`) y eso es lo que hace el
//  trabajo: un segundo pase el mismo día ESCRIBE ENCIMA del primero en vez de
//  crear un duplicado. No hace falta leer antes para comprobar si ya existe, no
//  hay carrera posible entre dos mostradores, y el recuento de asistencias no
//  puede inflarse por pulsar dos veces.
//
//  Toda la aritmética —la vigencia, el día, si está dentro— vive en
//  `lib/staff/asistenciaModelo.js` y se prueba sin red. Aquí solo se escribe.
// ============================================================
import { db } from '../init.js'
import { collection, doc, getDocs, limit, orderBy, query, setDoc, where } from 'firebase/firestore'
import { checkinParaGuardar, idAsistencia, problemasDelCheckin } from '../../staff/asistenciaModelo.js'
import { registrarSinRomper } from './auditoria.js'

/**
 * Registra la entrada de una persona.
 *
 * @returns {{id: string, asistencia: object, repetida: boolean, auditado: boolean}}
 *   `repetida` es true cuando ya había un pase ese día: la pantalla lo dice
 *   («ya estaba registrada; se renovó su vigencia») en vez de callarlo, porque
 *   quien lo pulsa tiene que saber que no acaba de apuntar dos veces.
 */
export async function registrarEntrada({ alumno, academiaId, registradoPor, medio = 'manual', ahora = new Date(), yaRegistradaHoy = false }) {
  const fallos = problemasDelCheckin({ alumno, academiaId })
  if (fallos.length) throw new Error(fallos.join(' '))

  const uid = alumno?.uid || alumno?.id
  const id = idAsistencia(uid, ahora)
  if (!id) throw new Error('No se pudo calcular el día de la entrada.')

  const asistencia = checkinParaGuardar({ alumno, academiaId, registradoPor, medio, ahora })
  await setDoc(doc(db, 'asistencias', id), asistencia)

  const auditado = await registrarSinRomper({
    academiaId,
    accion: 'registrar-entrada',
    coleccion: 'asistencias',
    docId: id,
    despues: {
      uid,
      matricula: asistencia.matricula,
      _nombre: asistencia.nombre,
      medio: asistencia.medio,
      renovada: Boolean(yaRegistradaHoy),
    },
  })

  return { id, asistencia, repetida: Boolean(yaRegistradaHoy), auditado }
}

/**
 * Las últimas asistencias de una persona.
 *
 * El `where` por academia va primero por la misma razón de siempre: es lo que
 * permite que la regla `list` se evalúe. Ordenar por `inicio` junto a dos
 * igualdades necesita índice compuesto, así que se pide sin `orderBy` y se
 * ordena en memoria cuando Firestore lo rechaza. Es una lista corta.
 */
export async function asistenciasDe({ uid, academiaId, limite = 60 }) {
  if (!uid || !academiaId) return []
  const base = [
    collection(db, 'asistencias'),
    where('academiaId', '==', academiaId),
    where('uid', '==', uid),
  ]
  try {
    const snap = await getDocs(query(...base, orderBy('inicio', 'desc'), limit(limite)))
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
  } catch (err) {
    // `failed-precondition` = falta el índice compuesto. No es motivo para
    // dejar la ficha sin asistencias: se pide sin orden y se ordena aquí.
    if (err?.code !== 'failed-precondition') throw err
    const snap = await getDocs(query(...base, limit(limite)))
    return snap.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => String(b.id).localeCompare(String(a.id)))
  }
}

/**
 * Quién está dentro AHORA, para el contador de la cabecera.
 *
 * Se pregunta por `expira > ahora`, que es la definición de estar en clase (no
 * hay ningún booleano que mantener). Una sola desigualdad: no necesita índice
 * compuesto más allá del que Firestore crea solo.
 */
export async function presentesAhora({ academiaId, ahora = new Date(), limite = 200 }) {
  if (!academiaId) return []
  const snap = await getDocs(query(
    collection(db, 'asistencias'),
    where('academiaId', '==', academiaId),
    where('expira', '>', ahora),
    limit(limite),
  ))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}
