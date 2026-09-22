// ============================================================
//  Recepción · compromisos de pago — el PUERTO de `adeudos`
// ------------------------------------------------------------
//  La aritmética es pura y vive en `lib/staff/adeudosModelo.js`. Aquí solo está
//  lo que toca la red.
//
//  LA REGLA QUE GOBIERNA ESTE ARCHIVO: **un adeudo no es dinero**. El dinero son
//  los `pagos`, que son inmutables y se cuadran contra el cajón. Un adeudo es la
//  promesa, y por eso sí se puede editar y cancelar: cancelar una deuda no
//  devuelve un peso, solo deja de reclamarlo.
//
//  EL `pagado` DEL DOCUMENTO ES UNA CACHÉ y se dice aquí también porque es el
//  sitio donde se escribe: sirve para listar quién debe sin leer los pagos de
//  toda la academia. La verdad es la suma de los pagos que apuntan al adeudo
//  (`adeudosModelo.abonadoDe`), y cuando la ficha los tiene delante manda esa.
//  Si la caché se queda corta —una escritura que falló a medias—, el saldo de la
//  ficha sigue siendo correcto y el listado global se reajusta al siguiente
//  cobro.
// ============================================================
import { db } from '../init.js'
import {
  addDoc, collection, doc, getDocs, limit, query, runTransaction,
  serverTimestamp, updateDoc, where,
} from 'firebase/firestore'
import {
  ESTADOS_VIVOS, adeudoDeOrden, adeudoParaGuardar, problemasDelAdeudo,
} from '../../staff/adeudosModelo.js'
import { registrarSinRomper } from './auditoria.js'

/** Los compromisos de UNA persona. Por uid, que es lo que no cambia nunca. */
export async function adeudosDe({ uid, matriculas = null, academiaId, limite = 100 }) {
  if (!academiaId) return []
  const filtros = []
  if (uid) filtros.push(where('uid', '==', uid))
  // Por matrícula solo si no hay uid: un compromiso siempre nace con uid, así
  // que esta rama es para datos viejos o importados.
  else if (matriculas?.length) filtros.push(where('matricula', 'in', matriculas.slice(0, 30)))
  if (!filtros.length) return []

  const snap = await getDocs(query(
    collection(db, 'adeudos'),
    where('academiaId', '==', academiaId),
    ...filtros,
    limit(limite),
  ))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/**
 * Todo lo que la academia tiene por cobrar. Es la lista de cobranza.
 *
 * Sin `orderBy`: ordenar por vencimiento exigiría un índice más, y la lista de
 * una academia cabe de sobra en memoria. El orden lo pone `compromisosDe`.
 */
export async function adeudosAbiertos(academiaId, { limite = 300 } = {}) {
  if (!academiaId) return []
  const snap = await getDocs(query(
    collection(db, 'adeudos'),
    where('academiaId', '==', academiaId),
    where('estado', 'in', ESTADOS_VIVOS),
    limit(limite),
  ))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/** Apunta un compromiso de pago. No mueve dinero: solo lo promete. */
export async function crearAdeudo({ adeudo, alumno, academiaId, registradoPor, origen = null }) {
  const fallos = problemasDelAdeudo(adeudo)
  if (fallos.length) throw new Error(fallos.join(' '))

  const datos = adeudoParaGuardar(adeudo, { academiaId, alumno, registradoPor, origen })
  const ref = await addDoc(collection(db, 'adeudos'), { ...datos, creado: serverTimestamp() })

  const auditado = await registrarSinRomper({
    academiaId,
    accion: 'crear-adeudo',
    coleccion: 'adeudos',
    docId: ref.id,
    despues: { total: datos.total, concepto: datos.concepto, vence: datos.vence, _nombre: datos.nombre },
  })

  return { id: ref.id, adeudo: { id: ref.id, ...datos }, auditado }
}

/**
 * El compromiso que deja un pedido de tienda confirmado.
 *
 * Se llama desde la confirmación y desde el apartado del mostrador. Si ya
 * existe uno para ese pedido no crea otro: confirmar dos veces —o reintentar
 * tras un fallo de red— no puede duplicarle la deuda a nadie.
 */
export async function adeudoParaPedido({ orden, alumno, academiaId, registradoPor }) {
  const yaHay = await getDocs(query(
    collection(db, 'adeudos'),
    where('academiaId', '==', academiaId),
    where('origen.id', '==', orden?.id || ''),
    limit(1),
  ))
  if (!yaHay.empty) return { id: yaHay.docs[0].id, reutilizado: true }

  const datos = adeudoDeOrden(orden, { academiaId, alumno, registradoPor })
  if (!(datos.total > 0)) return { id: '', reutilizado: false } // un pedido gratis no debe nada
  const ref = await addDoc(collection(db, 'adeudos'), { ...datos, creado: serverTimestamp() })
  return { id: ref.id, reutilizado: false }
}

/**
 * Apunta un abono en la CACHÉ del adeudo y lo liquida si ya no falta nada.
 *
 * Va en una transacción porque dos cobros a la vez leerían el mismo `pagado` y
 * el segundo pisaría al primero, dejando la caché corta. El PAGO ya está
 * escrito antes de llamar aquí: si esto falla, el dinero está registrado —que
 * es lo que importa— y la caché se recalcula sola en la ficha.
 */
export async function apuntarAbono({ adeudoId, monto }) {
  if (!adeudoId) return { liquidado: false }
  const ref = doc(db, 'adeudos', adeudoId)
  return runTransaction(db, async (tx) => {
    const snap = await tx.get(ref)
    if (!snap.exists()) throw new Error('Ese compromiso ya no existe.')
    const datos = snap.data()
    const pagado = Math.round(((Number(datos.pagado) || 0) + (Number(monto) || 0)) * 100) / 100
    const liquidado = pagado >= (Number(datos.total) || 0)
    tx.update(ref, {
      pagado,
      estado: liquidado ? 'liquidado' : 'abierto',
      actualizado: serverTimestamp(),
    })
    return { liquidado, pagado }
  })
}

/**
 * Cancela un compromiso: deja de reclamarse.
 *
 * NO devuelve dinero ni borra los abonos que ya tenía: esos son pagos, y un
 * pago no se deshace. Lo que se cancela es lo que falta.
 */
export async function cancelarAdeudo({ adeudoId, academiaId, motivo = '' }) {
  await updateDoc(doc(db, 'adeudos', adeudoId), {
    estado: 'cancelado',
    motivoCancelacion: String(motivo || '').slice(0, 200),
    actualizado: serverTimestamp(),
  })
  const auditado = await registrarSinRomper({
    academiaId,
    accion: 'cancelar-adeudo',
    coleccion: 'adeudos',
    docId: adeudoId,
    antes: { estado: 'abierto' },
    despues: { estado: 'cancelado', motivo },
  })
  return { auditado }
}
