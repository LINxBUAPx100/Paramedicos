// ============================================================
//  Tienda de mostrador — la cuenta del alumno y el inventario (lógica PURA)
// ------------------------------------------------------------
//  ESTE MÓDULO ES LA SEGUNDA COSTURA. La tienda virtual completa es el trabajo
//  M del plan y todavía no existe: no hay catálogo público, ni carrito del
//  alumno, ni pasarela. Lo que sí hace falta hoy es que recepción pueda
//  comprobar existencias, apuntar artículos en la cuenta de alguien y
//  descontarlos del inventario al entregarlos.
//
//  Así que aquí está toda la aritmética de esa operación, SIN saber de dónde
//  salen los artículos. Cuando llegue la tienda de verdad, se le cambia el
//  adaptador a `lib/firebase/staff/tienda.js` y este módulo no se toca.
//
//  DOS REGLAS QUE NO SON NEGOCIABLES, y el porqué:
//
//  1. **El inventario se descuenta AL ENTREGAR, no al apartar.** Un artículo
//     apartado sigue estando en el estante: si se descontara al apartarlo, una
//     cuenta que nadie recoge dejaría existencias fantasma que no se recuperan
//     sin que alguien se dé cuenta. Lo que sí hace el apartado es RESERVAR, y
//     lo disponible se calcula restando lo reservado. Ver `disponibleDe`.
//  2. **Nunca se deja bajar el inventario por debajo de cero.** No por
//     pulcritud: un inventario negativo es un artículo que se prometió dos
//     veces, y eso se descubre con el alumno delante.
//
//  Módulo PURO: sin React y sin Firebase.
// ============================================================

/** Estados por los que pasa una cuenta de tienda. El orden es el del proceso. */
export const ESTADOS_ORDEN = [
  // `solicitado` lo crea EL ALUMNO desde la tienda, y es deliberadamente el
  // estado más débil que existe: no lleva precios y no reserva inventario. El
  // porqué está en `lib/tiendaModelo.js` — un pedido hecho desde el teléfono no
  // puede ni fijar lo que se cobra ni retener material que otro sí viene a
  // recoger. Recepción lo convierte en `apartado` con los precios del catálogo.
  { id: 'solicitado', etiqueta: 'Pedido del alumno', nota: 'Sin confirmar. No reserva material ni fija precio.' },
  { id: 'apartado', etiqueta: 'Apartado', nota: 'Anotado en su cuenta. Sigue en inventario.' },
  { id: 'pagado', etiqueta: 'Pagado', nota: 'Cobrado en caja. Pendiente de entrega.' },
  { id: 'entregado', etiqueta: 'Entregado', nota: 'Descontado del inventario.' },
  { id: 'cancelado', etiqueta: 'Cancelado', nota: 'No se cobra ni se descuenta.' },
]

const ETIQUETA_ESTADO = new Map(ESTADOS_ORDEN.map((e) => [e.id, e.etiqueta]))
export const etiquetaEstado = (id) => ETIQUETA_ESTADO.get(id) || String(id || '—')

/** Estados que todavía cuentan como cargo pendiente en el estado de cuenta.
 *  `solicitado` NO: todavía no hay importe acordado, y apuntarle una deuda a
 *  alguien por algo que no se le ha confirmado es cobrar de más. */
export const ESTADOS_PENDIENTES = ['apartado']

/** Estados que reservan existencias (todavía no salieron del estante).
 *  `solicitado` tampoco, por el motivo de la cabecera de `tiendaModelo.js`. */
export const ESTADOS_RESERVAN = ['apartado', 'pagado']

/** Lo que espera una acción de recepción. Es la bandeja del mostrador. */
export const ESTADOS_ABIERTOS = ['solicitado', 'apartado', 'pagado']

/** Un artículo venido de la base, en forma utilizable. FAIL-OPEN. */
export function normalizarArticulo(a) {
  const precio = Number(a?.precio)
  const existencias = Number(a?.existencias)
  return {
    id: a?.id || '',
    nombre: String(a?.nombre || '').trim() || 'Artículo sin nombre',
    precio: Number.isFinite(precio) && precio >= 0 ? precio : 0,
    existencias: Number.isInteger(existencias) && existencias >= 0 ? existencias : 0,
    academiaId: a?.academiaId || null,
    activo: a?.activo !== false,
  }
}

/** Una línea nueva. La cantidad se acota aquí: un teclado no pone topes. */
export function lineaDe(articulo, cantidad = 1) {
  const art = normalizarArticulo(articulo)
  const n = Math.max(1, Math.min(999, Math.trunc(Number(cantidad) || 1)))
  return {
    articuloId: art.id,
    nombre: art.nombre,
    // El precio se COPIA a la línea a propósito: si mañana sube, la cuenta que
    // se apartó ayer tiene que seguir valiendo lo que se le dijo a la persona.
    precio: art.precio,
    cantidad: n,
  }
}

/** Añade, o suma a la línea que ya estaba. */
export function agregar(lineas, articulo, cantidad = 1) {
  const nueva = lineaDe(articulo, cantidad)
  const actuales = lineas || []
  const i = actuales.findIndex((l) => l.articuloId === nueva.articuloId)
  if (i < 0) return [...actuales, nueva]
  const copia = actuales.slice()
  copia[i] = { ...copia[i], cantidad: Math.min(999, copia[i].cantidad + nueva.cantidad) }
  return copia
}

/** Cambia la cantidad. Cero o menos QUITA la línea: es lo que espera quien teclea 0. */
export function cambiarCantidad(lineas, articuloId, cantidad) {
  const n = Math.trunc(Number(cantidad) || 0)
  if (n <= 0) return quitar(lineas, articuloId)
  return (lineas || []).map((l) => (
    l.articuloId === articuloId ? { ...l, cantidad: Math.min(999, n) } : l
  ))
}

export function quitar(lineas, articuloId) {
  return (lineas || []).filter((l) => l.articuloId !== articuloId)
}

export function totalDe(lineas) {
  return (lineas || []).reduce((suma, l) => suma + (Number(l.precio) || 0) * (Number(l.cantidad) || 0), 0)
}

export function piezasDe(lineas) {
  return (lineas || []).reduce((suma, l) => suma + (Number(l.cantidad) || 0), 0)
}

/**
 * Cuánto hay DISPONIBLE de verdad: existencias menos lo que está reservado en
 * cuentas de otras personas. Ver la regla 1 de la cabecera.
 */
export function disponibleDe(articulo, ordenesAbiertas = []) {
  const art = normalizarArticulo(articulo)
  const reservado = (ordenesAbiertas || [])
    .filter((o) => ESTADOS_RESERVAN.includes(o?.estado))
    .flatMap((o) => o?.lineas || [])
    .filter((l) => l?.articuloId === art.id)
    .reduce((suma, l) => suma + (Number(l.cantidad) || 0), 0)
  return Math.max(0, art.existencias - reservado)
}

/**
 * Qué impide guardar esta cuenta.
 *
 * `disponibles` es un mapa `{articuloId: número}`. Se pasa ya calculado para
 * que este módulo no tenga que saber de dónde salen las órdenes abiertas.
 */
export function problemasDelCarrito(lineas, disponibles = {}) {
  const p = []
  if (!(lineas || []).length) p.push('Añade al menos un artículo.')
  for (const l of lineas || []) {
    const hay = Number(disponibles?.[l.articuloId])
    if (Number.isFinite(hay) && l.cantidad > hay) {
      p.push(hay === 0
        ? `No queda ${l.nombre} en inventario.`
        : `Solo quedan ${hay} de ${l.nombre} y estás apuntando ${l.cantidad}.`)
    }
  }
  return p
}

/** La orden, lista para guardar. */
export function ordenParaGuardar({ lineas, alumno, academiaId, registradoPor, estado = 'apartado' }) {
  return {
    academiaId,
    uid: alumno?.uid || alumno?.id || null,
    // CADENA, NUNCA `null`: la regla de `ordenes` exige `matricula is string`
    // al crear desde el mostrador, así que un `null` aquí hacía que apartarle
    // material a quien todavía no tiene matrícula se denegara con un error de
    // permisos que en pantalla no explicaba nada. Quien la identifica es el
    // `uid`; la matrícula es un dato de mostrador que puede faltar.
    matricula: alumno?.matricula || '',
    nombre: String(alumno?.nombre || '').trim(),
    lineas: (lineas || []).map((l) => ({
      articuloId: l.articuloId,
      nombre: l.nombre,
      precio: Number(l.precio) || 0,
      cantidad: Number(l.cantidad) || 0,
    })),
    total: Math.round(totalDe(lineas) * 100) / 100,
    estado: ESTADOS_ORDEN.some((e) => e.id === estado) ? estado : 'apartado',
    registradoPor: registradoPor || null,
  }
}

/**
 * Cuánto hay que descontar de cada artículo al ENTREGAR una orden.
 *
 * Devuelve un mapa `{articuloId: piezas}`. Quien lo aplica es una transacción
 * (`lib/firebase/staff/tienda.js`): aquí solo se decide el cuánto.
 */
export function descuentoPorEntrega(orden) {
  const mapa = {}
  for (const l of orden?.lineas || []) {
    if (!l?.articuloId) continue
    mapa[l.articuloId] = (mapa[l.articuloId] || 0) + (Number(l.cantidad) || 0)
  }
  return mapa
}

/**
 * Las órdenes que cuentan como adeudo, en la forma que espera
 * `cajaModelo.estadoDeCuenta`.
 */
export function cargosDeOrdenes(ordenes) {
  return (ordenes || [])
    .filter((o) => ESTADOS_PENDIENTES.includes(o?.estado))
    .map((o) => ({
      id: o.id,
      concepto: 'material',
      descripcion: `Tienda · ${piezasDe(o.lineas)} artículo(s)`,
      monto: Number(o.total) || totalDe(o.lineas),
      fecha: o.creado || null,
    }))
}
