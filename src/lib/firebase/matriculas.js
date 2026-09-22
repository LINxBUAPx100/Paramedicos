// ============================================================
//  Matrículas en Firestore — repartir el orden sin duplicarlo
// ------------------------------------------------------------
//  La forma de la matrícula y lo que significa cada tramo son puros y viven en
//  `lib/matriculas.js`. Aquí está lo único que no puede ser puro: repartir el
//  «orden de llegada» sin que dos altas simultáneas se lleven el mismo número.
//
//  UN CONTADOR POR SERIE Y TURNO, no uno por academia.
//
//  La matrícula nueva ya no es correlativa dentro de la academia: los dos
//  últimos dígitos cuentan a los alumnos de UNA serie —generación, mes de
//  inicio y día de clase— y dentro de ella, de UN turno. Así que el contador
//  vive en `contadores/{academiaId}/series/{clave}`, con `clave` = `04111-m` o
//  `04111-v`, y cada uno sube por su cuenta.
//
//  POR QUÉ POR SERIE Y NO POR GRUPO, que sería lo intuitivo: dos grupos
//  distintos pueden compartir generación, mes, día y turno. Si cada grupo
//  llevara su propio contador, los dos empezarían en 01 y emitirían matrículas
//  idénticas, que es exactamente lo que una matrícula existe para impedir. El
//  contador cuelga de lo que la matrícula DICE, no de lo que la origina.
//
//  EL CONTADOR ES LA AUTORIDAD, no la lista de alumnos. Contar los alumnos que
//  ya hay cuesta una lectura por alumno y, sobre todo, REUTILIZA números: quien
//  se dio de baja devolvería su matrícula a la circulación y su historial de
//  pagos acabaría en el expediente de otra persona. El contador solo sube.
//
//  LA SERIE SE PUEDE AGOTAR, y se dice en voz alta. Caben 49 alumnos de mañana
//  y 49 de tarde por serie. Al llegar ahí no se da la vuelta ni se invade el
//  otro turno: se falla con un mensaje que explica qué pasó, porque un grupo de
//  50 alumnos es una decisión de la academia, no algo que el código pueda
//  arreglar solo.
// ============================================================
import { db } from './init.js'
import { doc, getDoc, runTransaction, serverTimestamp, updateDoc } from 'firebase/firestore'
import {
  RANGOS_TURNO, matriculaAlCambiarDeGrupo, formatearMatricula, serieDeGrupo,
} from '../matriculas.js'

const refSerie = (academiaId, clave) => doc(db, 'contadores', academiaId, 'series', clave)

/**
 * Reserva el siguiente orden de una serie y devuelve la matrícula completa.
 *
 * `serie` es lo que devuelve `serieDeGrupo()`. No escribe en el usuario: quien
 * llama decide dónde va, y así la misma reserva sirve para un alta de
 * mostrador, para un cambio de grupo y para la migración del padrón.
 */
export async function reservarEnSerie(academiaId, serie) {
  if (!academiaId) throw new Error('Falta la academia.')
  if (!serie?.ok) throw new Error(serie?.problemas?.join(' ') || 'La serie del grupo no está completa.')
  const rango = RANGOS_TURNO[serie.turno]

  const orden = await runTransaction(db, async (tx) => {
    const ref = refSerie(academiaId, serie.clave)
    const snap = await tx.get(ref)
    // Sin documento, el contador arranca UNA POSICIÓN ANTES del primero que se
    // emite: el vespertino empieza en 50 para que el primer alumno sea el 51.
    const ultimo = snap.exists() ? Number(snap.data()?.ultimo || 0) : 0
    const base = ultimo >= rango.desde ? ultimo : rango.desde - 1
    const siguiente = base + 1
    if (siguiente > rango.hasta) {
      throw new Error(`La serie ${serie.serie} del turno ${serie.turno} se agotó: ya tiene ${rango.hasta - rango.desde + 1} alumnos. Hace falta abrir otro grupo o revisar la generación.`)
    }
    tx.set(ref, {
      academiaId,
      serie: serie.serie,
      turno: serie.turno,
      ultimo: siguiente,
      actualizado: serverTimestamp(),
    }, { merge: true })
    return siguiente
  })

  return formatearMatricula(serie.serie, orden)
}

/**
 * La matrícula que le toca a alguien por el grupo en el que entra, ya
 * reservada.
 *
 * Lee el grupo aquí dentro a propósito: quien llama tiene el `grupoId` —es lo
 * que se elige en la pantalla— y no siempre el documento, y leerlo mal sería
 * emitir una matrícula que dice algo falso.
 */
export async function matriculaParaGrupo({ academiaId, grupoId, grupo = null }) {
  const doc_ = grupo || await grupoDe(grupoId)
  if (!doc_) throw new Error('No se encontró el grupo al que entra: sin grupo no hay matrícula que emitir.')
  const serie = serieDeGrupo(doc_)
  if (!serie.ok) throw new Error(serie.problemas.join(' '))
  return { matricula: await reservarEnSerie(academiaId, serie), serie }
}

/**
 * Qué hacer con la matrícula de alguien que cambia de grupo.
 *
 * Tres respuestas posibles, y las tres hay que poder explicárselas al alumno:
 *
 *  · `conservar` — su grupo nuevo es de la misma serie y turno. El número no
 *    dice nada distinto, así que cambiarlo solo serviría para invalidarle la
 *    credencial.
 *  · `emitir` — se le rehace, y la anterior se conserva en su historial. NO es
 *    cosmético: los pagos se indexan por matrícula y las reglas los hacen
 *    inmutables, así que sin ese historial el dinero ya cobrado deja de
 *    encontrarse (ver `lib/firebase/staff/caja.js`).
 *  · lanzar — el grupo de destino no tiene los datos para formar una serie.
 *
 * @returns {{matricula: string, cambio: boolean, anterior: string, motivo: string}}
 */
export async function matriculaAlMoverDeGrupo({ academiaId, grupoId, grupo = null, matriculaActual = '' }) {
  const doc_ = grupo || await grupoDe(grupoId)
  if (!doc_) throw new Error('No se encontró el grupo de destino.')
  const decision = matriculaAlCambiarDeGrupo({ matricula: matriculaActual, grupo: doc_ })
  if (decision.accion === 'bloqueado') throw new Error(decision.motivo)
  if (decision.accion === 'conservar') {
    return { matricula: String(matriculaActual), cambio: false, anterior: '', motivo: decision.motivo }
  }
  const matricula = await reservarEnSerie(academiaId, decision.serie)
  return {
    matricula,
    cambio: true,
    anterior: String(matriculaActual || ''),
    motivo: decision.motivo,
  }
}

// --- EMISIÓN AUTOMÁTICA -----------------------------------------------------
//
//  NO HAY BOTÓN DE «EMITIR MATRÍCULA» (21-09-2026, pedido por el dueño del
//  producto): en cuanto alguien tiene un grupo que cumple los parámetros, su
//  matrícula se emite sola.
//
//  DÓNDE OCURRE, y por qué en más de un sitio. Cuando es el personal quien
//  asigna el grupo, la matrícula sale en la misma escritura —el alta de
//  mostrador, la ficha de recepción y el selector de grupo del padrón—. Pero un
//  alumno también puede conseguir grupo SIN que intervenga nadie: entrando con
//  el código del grupo, canjeando una invitación o cuando se le acepta una
//  solicitud de acceso. En esos tres casos el servidor no puede emitirla:
//
//    · no hay Cloud Functions (plan Spark), así que nada corre del lado del
//      servidor cuando el alumno escribe su propio perfil;
//    · y la regla de `contadores` NO deja al alumno mover el contador, a
//      propósito: quien pudiera avanzarlo tendría en la mano la numeración de
//      la academia entera.
//
//  Así que esos casos los recoge `asegurarMatriculas`, que se ejecuta sola
//  cuando el personal abre una pantalla donde esa gente aparece (el padrón, la
//  gestión de miembros, la ficha del mostrador). Es lo más automático que se
//  puede ser sin servidor, y hay que decirlo claro: **un alumno que se une por
//  código no tiene matrícula hasta que alguien del personal abra una de esas
//  pantallas.** El día que haya Blaze, esto se convierte en un trigger y estas
//  llamadas se pueden quitar sin tocar ninguna pantalla.

/**
 * Emite la matrícula que falte, en lote. Idempotente y silenciosa.
 *
 * NO TOCA a quien ya tiene una —ni siquiera del formato anterior—: reescribir
 * una matrícula emitida solo ocurre al cambiar de grupo, y la regla lo impone.
 * Para las viejas está `npm run migrar:matriculas`.
 *
 * `tope` existe porque esto corre al abrir una pantalla: un padrón recién
 * migrado con trescientos huecos no puede convertir esa apertura en trescientas
 * escrituras. Lo que quede se emite en la siguiente, que es igual de automática.
 *
 * Los fallos NO se propagan: esto es un añadido a una pantalla que tiene su
 * propio trabajo, y que reviente por un grupo mal configurado sería peor que la
 * matrícula que falta. Se devuelven para poder contarlos.
 *
 * @returns {{emitidas: Array<{uid, matricula}>, bloqueadas: Array<{uid, motivo}>}}
 */
export async function asegurarMatriculas({ alumnos, grupos, academiaId, tope = 25 }) {
  const emitidas = []
  const bloqueadas = []
  if (!academiaId) return { emitidas, bloqueadas }

  const porId = new Map((grupos || []).map((g) => [g.id, g]))
  const pendientes = (alumnos || []).filter((a) => (
    (a?.rol || 'alumno') === 'alumno'
    && !String(a?.matricula || '').trim()
    && a?.grupoId
    && a?.academiaId === academiaId
  ))

  for (const alumno of pendientes.slice(0, tope)) {
    const grupo = porId.get(alumno.grupoId)
    if (!grupo) { bloqueadas.push({ uid: alumno.uid || alumno.id, motivo: 'Su grupo ya no existe.' }); continue }
    const serie = serieDeGrupo(grupo)
    if (!serie.ok) {
      bloqueadas.push({ uid: alumno.uid || alumno.id, motivo: serie.problemas.join(' '), grupo: grupo.nombre || grupo.id })
      continue
    }
    try {
      const matricula = await reservarEnSerie(academiaId, serie)
      await updateDoc(doc(db, 'usuarios', alumno.uid || alumno.id), { matricula })
      emitidas.push({ uid: alumno.uid || alumno.id, matricula, nombre: alumno.nombre || '' })
    } catch (err) {
      // Si la escritura falla DESPUÉS de reservar, ese número se queda sin
      // usar. Es el intercambio correcto: un hueco en la numeración no rompe
      // nada; repetir un número, sí.
      bloqueadas.push({ uid: alumno.uid || alumno.id, motivo: err?.message || 'No se pudo emitir.' })
    }
  }
  return { emitidas, bloqueadas }
}

/**
 * El historial de matrículas de alguien: la de ahora y las que tuvo antes.
 *
 * Es lo que hay que usar para buscar su dinero. Se acota a 30 porque es el
 * tope de la cláusula `in` de Firestore, y quien haya cambiado de grupo treinta
 * veces tiene un problema que no es este.
 */
export function matriculasDe(alumno) {
  const todas = [alumno?.matricula, ...(Array.isArray(alumno?.matriculasAnteriores) ? alumno.matriculasAnteriores : [])]
  return [...new Set(todas.map((m) => String(m || '').trim()).filter(Boolean))].slice(0, 30)
}

/** El parche que deja la matrícula nueva y guarda la anterior. */
export function parcheDeMatricula(alumno, matricula) {
  const anterior = String(alumno?.matricula || '').trim()
  const previas = Array.isArray(alumno?.matriculasAnteriores) ? alumno.matriculasAnteriores : []
  const historial = [...new Set([...previas, anterior].filter(Boolean))]
  return anterior && anterior !== matricula
    ? { matricula, matriculasAnteriores: historial }
    : { matricula }
}

async function grupoDe(grupoId) {
  if (!grupoId) return null
  const snap = await getDoc(doc(db, 'grupos', grupoId))
  return snap.exists() ? { id: snap.id, ...snap.data() } : null
}

/** Cuántos alumnos lleva emitidos una serie. Una lectura, para diagnóstico. */
export async function ultimoDeSerie(academiaId, clave) {
  if (!academiaId || !clave) return 0
  const snap = await getDoc(refSerie(academiaId, clave))
  return snap.exists() ? Number(snap.data()?.ultimo || 0) : 0
}
