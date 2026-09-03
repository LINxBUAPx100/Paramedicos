// ============================================================
//  Matrículas en Firestore — reservar el número sin duplicar
// ------------------------------------------------------------
//  La forma de la matrícula y las reglas del traslado son puras y viven en
//  `lib/matriculas.js`. Aquí está lo único que no puede ser puro: repartir
//  números sin que dos altas simultáneas se lleven el mismo.
//
//  EL CONTADOR ES LA AUTORIDAD, no la lista de alumnos.
//
//  Contar los alumnos existentes para saber cuál toca tiene dos fallos: cuesta
//  una lectura por alumno, y sobre todo REUTILIZA números —si alguien se dio de
//  baja, su matrícula volvería a repartirse y su historial acabaría en el
//  expediente de otra persona—. El contador solo sube.
//
//  Un documento por academia (`contadores/{academiaId}`) y una transacción. El
//  límite real es ~1 escritura por segundo sostenida SOBRE ESE DOCUMENTO, que
//  para el ritmo de inscripción de una academia sobra con mucho margen.
//
//  EL TRASLADO ES CONSERVADOR, Y SE DICE POR QUÉ.
//
//  Al mover a alguien de academia hay que saber si su número está libre en el
//  destino. Contarlo exacto exige leer las matrículas de allí, y esa lectura
//  fuera de la transacción se puede quedar vieja entre que se lee y se escribe:
//  dos traslados a la vez producirían la duplicidad que esto existe para
//  impedir. Dentro de la transacción solo se puede mirar el contador, así que
//  la regla es: **conserva su número solo si está por encima del contador del
//  destino**, es decir, si con certeza no lo tiene nadie.
//
//  El precio: alguien que se traslade a una academia grande recibirá número
//  nuevo aunque el suyo estuviera libre por un hueco. Es el lado bueno del
//  intercambio — cambiar un número de más no rompe nada; repetirlo, sí.
// ============================================================
import { db } from './init.js'
import { doc, getDoc, runTransaction, serverTimestamp } from 'firebase/firestore'
import { formatearMatricula, partirMatricula, prefijoDeAcademia } from '../matriculas.js'

const refContador = (academiaId) => doc(db, 'contadores', academiaId)

/**
 * Reserva el siguiente número de una academia y devuelve la matrícula.
 *
 * No escribe en el usuario: quien llama decide dónde va. Así la misma reserva
 * sirve para un alta desde recepción y para rellenar a alguien que ya existía.
 */
export async function reservarMatricula(academiaId) {
  if (!academiaId) throw new Error('Falta la academia.')
  const numero = await runTransaction(db, async (tx) => {
    const ref = refContador(academiaId)
    const snap = await tx.get(ref)
    const ultimo = snap.exists() ? Number(snap.data()?.ultimaMatricula || 0) : 0
    const siguiente = ultimo + 1
    tx.set(ref, {
      academiaId,
      ultimaMatricula: siguiente,
      actualizado: serverTimestamp(),
    }, { merge: true })
    return siguiente
  })
  return formatearMatricula(academiaId, numero)
}

/**
 * La matrícula que le toca a alguien que se traslada, ya reservada.
 *
 * Devuelve también el MOTIVO, para que quien hace el traslado pueda explicarlo:
 * no es lo mismo «cambian las dos letras» que «cambió entera porque su número
 * ya estaba ocupado allí».
 */
export async function matriculaParaTraslado(academiaDestino, matriculaActual) {
  if (!academiaDestino) throw new Error('Falta la academia de destino.')
  const prefijo = prefijoDeAcademia(academiaDestino)
  const actual = partirMatricula(matriculaActual)

  const resultado = await runTransaction(db, async (tx) => {
    const ref = refContador(academiaDestino)
    const snap = await tx.get(ref)
    const ultimo = snap.exists() ? Number(snap.data()?.ultimaMatricula || 0) : 0

    // Por encima del contador: nadie lo tiene. Conserva su número —es el dato
    // que el alumno se sabe de memoria— y el contador salta hasta él para que
    // no se reparta después.
    if (actual && actual.numero > ultimo) {
      tx.set(ref, { academiaId: academiaDestino, ultimaMatricula: actual.numero, actualizado: serverTimestamp() }, { merge: true })
      return { numero: actual.numero, motivo: actual.prefijo === prefijo ? 'sin-cambio' : 'prefijo' }
    }

    const siguiente = ultimo + 1
    tx.set(ref, { academiaId: academiaDestino, ultimaMatricula: siguiente, actualizado: serverTimestamp() }, { merge: true })
    return { numero: siguiente, motivo: actual ? 'numero-ocupado' : 'nueva' }
  })

  return { ...resultado, matricula: formatearMatricula(academiaDestino, resultado.numero) }
}

/** Cuántas matrículas lleva emitidas una academia. Una lectura. */
export async function ultimaMatriculaDe(academiaId) {
  if (!academiaId) return 0
  const snap = await getDoc(refContador(academiaId))
  return snap.exists() ? Number(snap.data()?.ultimaMatricula || 0) : 0
}
