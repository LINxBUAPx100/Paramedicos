// ============================================================
//  Recepción · tienda — el PUERTO del catálogo y el inventario
// ------------------------------------------------------------
//  ESTE ARCHIVO ES LA SEGUNDA COSTURA DEL ENTORNO DE RECEPCIÓN.
//
//  La tienda virtual completa —catálogo público, carrito del alumno, pasarela,
//  logística de entrega— es el trabajo M del plan técnico y todavía no existe.
//  Lo que recepción necesita hoy es más pequeño y perfectamente construible:
//  ver qué hay, apuntarlo en la cuenta de alguien y descontarlo al entregarlo.
//
//  Así que la pantalla habla con un PUERTO de cinco funciones:
//
//      listarArticulos · ordenesDe · apartar · marcarPagada · entregar
//
//  El día que exista la tienda de verdad se reescribe este archivo contra sus
//  colecciones y NI UN COMPONENTE CAMBIA. Es el mismo trato que hace
//  `resolverAlumno.js` con el formato de la matrícula.
//
//  ── EL DESCUENTO DE INVENTARIO VA EN UNA TRANSACCIÓN, y esto no es opcional.
//
//  Sin ella, dos mostradores —o el mismo pulsado dos veces— leen «quedan 3»,
//  los dos escriben «quedan 2» y se han entregado cuatro piezas de un artículo
//  que tenía tres. Firestore resuelve esto con `runTransaction`, que relee y
//  reintenta; es el mismo patrón que ya usa el contador de matrículas.
//
//  La transacción además COMPRUEBA que haya existencias antes de bajarlas, y
//  aborta entera si falta una sola pieza de un solo artículo. Entregar media
//  orden y dejar la otra mitad apuntada es peor que no entregar nada: la
//  persona se va con parte de lo suyo y el sistema cree que se llevó todo.
// ============================================================
import { db } from '../init.js'
import {
  addDoc, collection, doc, getDocs, limit, query, runTransaction,
  serverTimestamp, updateDoc, where,
} from 'firebase/firestore'
import {
  ESTADOS_ABIERTOS, ESTADOS_RESERVAN, descuentoPorEntrega, disponibleDe,
  normalizarArticulo, ordenParaGuardar, problemasDelCarrito, totalDe,
} from '../../staff/carritoModelo.js'
import { confirmarConCatalogo } from '../../tiendaModelo.js'
import { registrarSinRomper } from './auditoria.js'

// --- CATÁLOGO ---------------------------------------------------------------

/** Los artículos de una academia. Lista corta: se lee entera y se filtra aquí. */
export async function listarArticulos(academiaId, { incluirInactivos = false } = {}) {
  if (!academiaId) return []
  const snap = await getDocs(query(
    collection(db, 'articulos'),
    where('academiaId', '==', academiaId),
    limit(300),
  ))
  return snap.docs
    .map((d) => normalizarArticulo({ id: d.id, ...d.data() }))
    .filter((a) => incluirInactivos || a.activo)
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'))
}

/**
 * Lo realmente disponible de cada artículo: existencias menos lo reservado en
 * cuentas abiertas de cualquiera. Devuelve `{articuloId: número}`.
 */
export async function disponibilidad(academiaId, articulos) {
  const abiertas = await ordenesAbiertas(academiaId)
  return Object.fromEntries(
    (articulos || []).map((a) => [a.id, disponibleDe(a, abiertas)])
  )
}

// --- ÓRDENES ----------------------------------------------------------------

/**
 * Las cuentas de UNA persona, recientes primero.
 *
 * SE BUSCA POR `uid`, y esto arregla un agujero que dejaba pedidos
 * inatendibles: un pedido mandado desde la tienda por alguien SIN MATRÍCULA
 * —recién dado de alta, o dado de alta sin ella— se guarda con
 * `matricula: null`, así que la consulta por matrícula no lo encontraba nunca.
 * Recepción lo veía en la bandeja, pulsaba «Abrir su ficha» y en su tienda leía
 * «No tiene ninguna compra registrada»: el pedido no se podía confirmar desde
 * ningún sitio de la aplicación.
 *
 * La matrícula se sigue consultando CUANDO LA HAY, porque una orden vieja del
 * mostrador puede no llevar `uid`. Se consultan TODAS las que ha tenido —desde
 * el 21-09-2026 cambiar de grupo la rehace—, porque una orden guardó la que
 * estaba vigente el día que se apuntó. Las listas se funden por id, así que una
 * orden que cumpla las dos condiciones aparece una sola vez.
 */
export async function ordenesDe({ uid, matricula, matriculas = null, academiaId, limite = 50 }) {
  if (!academiaId) return []
  const claves = [...new Set(
    (matriculas?.length ? matriculas : [matricula])
      .map((m) => String(m || '').trim())
      .filter(Boolean)
  )].slice(0, 30)
  const filtros = []
  if (uid) filtros.push(where('uid', '==', uid))
  if (claves.length === 1) filtros.push(where('matricula', '==', claves[0]))
  else if (claves.length > 1) filtros.push(where('matricula', 'in', claves))
  if (!filtros.length) return []

  const snaps = await Promise.all(filtros.map((filtro) => getDocs(query(
    collection(db, 'ordenes'),
    where('academiaId', '==', academiaId),
    filtro,
    limit(limite),
  ))))

  const porId = new Map()
  for (const snap of snaps) {
    for (const d of snap.docs) porId.set(d.id, { id: d.id, ...d.data() })
  }
  return [...porId.values()].sort((a, b) => (segundos(b.creado) - segundos(a.creado)))
}

/** Las que todavía reservan existencias, de toda la academia. */
export async function ordenesAbiertas(academiaId, { limite = 300 } = {}) {
  if (!academiaId) return []
  const snap = await getDocs(query(
    collection(db, 'ordenes'),
    where('academiaId', '==', academiaId),
    where('estado', 'in', ESTADOS_RESERVAN),
    limit(limite),
  ))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

/**
 * La bandeja del mostrador: lo que espera una acción, de toda la academia.
 *
 * Incluye los pedidos que los alumnos mandaron desde la tienda (`solicitado`),
 * que es lo que recepción tiene que atender primero: hasta que no se confirman
 * no hay material reservado ni precio acordado.
 */
export async function bandejaDeOrdenes(academiaId, { limite = 200 } = {}) {
  if (!academiaId) return []
  const snap = await getDocs(query(
    collection(db, 'ordenes'),
    where('academiaId', '==', academiaId),
    where('estado', 'in', ESTADOS_ABIERTOS),
    limit(limite),
  ))
  return snap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => segundos(b.creado) - segundos(a.creado))
}

/**
 * Recepción confirma un pedido de alumno: `solicitado` → `apartado`.
 *
 * ES AQUÍ Y SOLO AQUÍ DONDE EL PEDIDO RECIBE PRECIOS, y salen del catálogo
 * leído en este momento, nunca de lo que mandó el cliente. Es la contrapartida
 * de que el pedido del alumno viaje sin importes (ver `lib/tiendaModelo.js`):
 * si los trajera, bastaría con editarlos antes de enviarlos.
 *
 * `forzar` deja confirmar aunque falte inventario para alguna línea. Existe
 * porque en un mostrador se pacta —«te lo aparto y te llega el jueves»— y
 * negarlo sin alternativa obligaría a cancelar y rehacer. La entrega volverá a
 * comprobar existencias en su transacción, así que no se puede entregar de más.
 */
export async function confirmarPedido({ orden, academiaId, registradoPor, forzar = false }) {
  if (!orden?.id) throw new Error('Falta el pedido.')
  if (orden.estado !== 'solicitado') throw new Error('Ese pedido ya estaba confirmado.')

  const catalogo = await listarArticulos(academiaId, { incluirInactivos: true })
  const { lineas, problemas } = confirmarConCatalogo(orden.lineas, catalogo)
  if (!lineas.length) throw new Error('Ninguno de los artículos del pedido sigue en el catálogo.')
  if (problemas.length && !forzar) {
    const err = new Error(problemas.join(' '))
    err.problemas = problemas
    err.confirmable = true
    throw err
  }

  const total = Math.round(totalDe(lineas) * 100) / 100
  await updateDoc(doc(db, 'ordenes', orden.id), {
    lineas,
    total,
    estado: 'apartado',
    confirmadoPor: registradoPor || null,
    confirmado: serverTimestamp(),
  })

  const auditado = await registrarSinRomper({
    academiaId,
    accion: 'apartar-articulos',
    coleccion: 'ordenes',
    docId: orden.id,
    antes: { estado: 'solicitado', total: 0 },
    despues: { estado: 'apartado', total, lineas, _nombre: orden.nombre || '' },
  })

  // EL PEDIDO CONFIRMADO ES UNA DEUDA, así que se apunta como tal (21-09-2026):
  // con su compromiso se puede abonar a plazos y cobrar desde la propia tienda,
  // en vez de tener que ir a la caja de la ficha. `adeudoParaPedido` no
  // duplica: si ese pedido ya tenía compromiso, devuelve el que había.
  const adeudo = await compromisoDePedido({ orden: { ...orden, total, lineas }, academiaId, registradoPor })

  return { total, lineas, problemas, auditado, adeudoId: adeudo }
}

const segundos = (t) => (typeof t?.seconds === 'number' ? t.seconds : 0)

/**
 * Apunta artículos en la cuenta de alguien.
 *
 * NO descuenta inventario: ver la regla 1 de `staff/carritoModelo.js`. Lo que
 * hace es reservar, y lo reservado ya no aparece como disponible para nadie.
 */
export async function apartar({ lineas, alumno, academiaId, registradoPor }) {
  const articulos = await listarArticulos(academiaId)
  const disponibles = await disponibilidad(academiaId, articulos)
  const fallos = problemasDelCarrito(lineas, disponibles)
  if (fallos.length) throw new Error(fallos.join(' '))

  const datos = ordenParaGuardar({ lineas, alumno, academiaId, registradoPor, estado: 'apartado' })
  const ref = await addDoc(collection(db, 'ordenes'), { ...datos, creado: serverTimestamp() })

  const auditado = await registrarSinRomper({
    academiaId,
    accion: 'apartar-articulos',
    coleccion: 'ordenes',
    docId: ref.id,
    despues: { total: datos.total, lineas: datos.lineas, matricula: datos.matricula, _nombre: datos.nombre },
  })

  const adeudoId = await compromisoDePedido({
    orden: { id: ref.id, ...datos }, academiaId, registradoPor, alumno,
  })

  return { id: ref.id, orden: { id: ref.id, ...datos }, auditado, adeudoId }
}

/**
 * Marca una orden como pagada.
 *
 * Deja de contar como adeudo y sigue reservando existencias hasta la entrega,
 * que es exactamente lo que ocurre físicamente: está pagada y en el estante.
 * El COBRO en sí se registra con `caja.cobrar()`; esto solo cambia el estado.
 */
export async function marcarPagada({ ordenId, academiaId }) {
  return cambiarEstado({ ordenId, academiaId, estado: 'pagado', accion: 'cobrar-mostrador' })
}

/** Cancela una cuenta: ni se cobra ni se descuenta, y libera lo reservado. */
export async function cancelar({ ordenId, academiaId }) {
  return cambiarEstado({ ordenId, academiaId, estado: 'cancelado', accion: 'cancelar-orden' })
}

async function cambiarEstado({ ordenId, academiaId, estado, accion }) {
  const ref = doc(db, 'ordenes', ordenId)
  const antes = await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref)
    if (!snap.exists()) throw new Error('Esa cuenta ya no existe.')
    const previo = snap.data()?.estado
    if (previo === 'entregado') throw new Error('Esa cuenta ya se entregó: no se puede cambiar.')
    tx.update(ref, { estado, actualizado: serverTimestamp() })
    return previo
  })
  const auditado = await registrarSinRomper({
    academiaId, accion, coleccion: 'ordenes', docId: ordenId,
    antes: { estado: antes }, despues: { estado },
  })
  return { auditado }
}

/**
 * ENTREGA: baja el inventario y cierra la cuenta, todo o nada.
 *
 * La transacción hace, en este orden y dentro de la misma operación atómica:
 *   1. lee la orden y comprueba que no se haya entregado ya (pulsar dos veces
 *      no puede descontar dos veces);
 *   2. lee CADA artículo y comprueba que alcance;
 *   3. baja las existencias;
 *   4. marca la orden como entregada.
 *
 * Si algo de eso falla, no ocurre nada de lo demás.
 *
 * Firestore admite hasta 500 escrituras por transacción; una orden de mostrador
 * no se acerca ni de lejos. Lo que sí hay que respetar es que todas las
 * LECTURAS vayan antes que la primera escritura, y por eso están separadas.
 */
export async function entregar({ orden, academiaId, registradoPor }) {
  const ordenId = orden?.id
  if (!ordenId) throw new Error('Falta la cuenta que se va a entregar.')
  const descuentos = descuentoPorEntrega(orden)
  const ids = Object.keys(descuentos)
  if (!ids.length) throw new Error('Esa cuenta no tiene artículos.')

  const refOrden = doc(db, 'ordenes', ordenId)

  await runTransaction(db, async (tx) => {
    // --- todas las lecturas primero ---
    const snapOrden = await tx.get(refOrden)
    if (!snapOrden.exists()) throw new Error('Esa cuenta ya no existe.')
    if (snapOrden.data()?.estado === 'entregado') throw new Error('Esa cuenta ya estaba entregada.')
    if (snapOrden.data()?.estado === 'cancelado') throw new Error('Esa cuenta está cancelada.')

    const snaps = await Promise.all(ids.map((id) => tx.get(doc(db, 'articulos', id))))

    // --- comprobar que alcanza, ANTES de escribir nada ---
    const nuevas = []
    for (let i = 0; i < ids.length; i += 1) {
      const id = ids[i]
      const snap = snaps[i]
      if (!snap.exists()) throw new Error(`El artículo «${nombreEnOrden(orden, id)}» ya no está en el catálogo.`)
      const hay = Number(snap.data()?.existencias)
      const pide = descuentos[id]
      if (!Number.isFinite(hay) || hay < pide) {
        throw new Error(`No alcanza el inventario de «${nombreEnOrden(orden, id)}»: quedan ${Number.isFinite(hay) ? hay : 0} y se van a entregar ${pide}.`)
      }
      nuevas.push({ id, existencias: hay - pide })
    }

    // --- escribir ---
    for (const n of nuevas) {
      tx.update(doc(db, 'articulos', n.id), { existencias: n.existencias, actualizado: serverTimestamp() })
    }
    tx.update(refOrden, {
      estado: 'entregado',
      entregadoPor: registradoPor || null,
      entregado: serverTimestamp(),
    })
  })

  const auditado = await registrarSinRomper({
    academiaId,
    accion: 'entregar-articulos',
    coleccion: 'ordenes',
    docId: ordenId,
    antes: { estado: orden?.estado || null },
    despues: { estado: 'entregado', descuentos, total: Number(orden?.total) || totalDe(orden?.lineas) },
  })

  return { auditado }
}

/**
 * El compromiso de pago de un pedido, creado o reutilizado.
 *
 * NO ROMPE LA OPERACIÓN SI FALLA. El pedido ya está apartado y el material
 * reservado, que es lo que la persona está esperando; si el compromiso no se
 * pudo apuntar, su deuda se sigue viendo —la tienda apartada cuenta como cargo
 * en `estadoDeCuenta`, que es como funcionaba antes de que existieran— y se
 * puede apuntar a mano. Tumbar una confirmación por esto sería peor.
 */
async function compromisoDePedido({ orden, academiaId, registradoPor, alumno = null }) {
  try {
    const { adeudoParaPedido } = await import('./adeudos.js')
    const r = await adeudoParaPedido({
      orden,
      // El pedido del alumno ya trae con quién es; el del mostrador, además, la
      // ficha entera.
      alumno: alumno || { uid: orden.uid, matricula: orden.matricula, nombre: orden.nombre },
      academiaId,
      registradoPor,
    })
    return r.id
  } catch {
    return ''
  }
}

const nombreEnOrden = (orden, articuloId) => (
  (orden?.lineas || []).find((l) => l.articuloId === articuloId)?.nombre || articuloId
)
