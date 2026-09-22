// ============================================================
//  Caja de recepción — cobros, historial y estado de cuenta (lógica PURA)
// ------------------------------------------------------------
//  LO QUE ESTE MÓDULO NO INVENTA, y hay que decirlo antes que nada.
//
//  Un «estado de cuenta» de verdad necesita saber QUÉ SE DEBE, y eso exige un
//  plan de cobro —cuánto cuesta la colegiatura de este grupo, qué día vence—
//  que en este sistema NO EXISTE todavía. Inventarlo aquí produciría un adeudo
//  con pinta de oficial calculado sobre una cifra que nadie ha configurado, y
//  eso es peor que no darlo: en un mostrador, una cifra equivocada se cobra.
//
//  Así que el saldo se calcula SOLO sobre cargos reales y comprobables: lo que
//  la persona se llevó de la tienda y todavía no ha pagado. Lo demás es
//  historial de pagos, que sí es un hecho. El día que exista un plan de cobro
//  (trabajo L), entra por `cargos` sin cambiar nada más.
//
//  LOS CONCEPTOS Y MÉTODOS NO SE DUPLICAN: salen de `lib/recepcionModelo.js`,
//  que es donde los puso el alta de mostrador. Dos listas de métodos de pago
//  que se separan con el tiempo es exactamente como se rompe un corte de caja.
//
//  Módulo PURO: sin React y sin Firebase.
// ============================================================
import {
  CONCEPTOS_PAGO, METODOS_PAGO, problemasDelPago,
} from '../recepcionModelo.js'
import { comoFecha } from './asistenciaModelo.js'
import { compromisosDe, deudaTotal } from './adeudosModelo.js'

export { CONCEPTOS_PAGO, METODOS_PAGO, problemasDelPago }

const ETIQUETA_CONCEPTO = new Map(CONCEPTOS_PAGO.map((c) => [c.id, c.etiqueta]))
const ETIQUETA_METODO = new Map(METODOS_PAGO.map((m) => [m.id, m.etiqueta]))

export const etiquetaConcepto = (id) => ETIQUETA_CONCEPTO.get(id) || String(id || '—')
/** ¿Es uno de los conceptos del catálogo? Lo usa la corrección de un pago. */
export const esConcepto = (id) => ETIQUETA_CONCEPTO.has(id)
export const etiquetaMetodo = (id) => ETIQUETA_METODO.get(id) || String(id || '—')

/** Pesos mexicanos. Un importe se lee o no se lee; aquí se lee siempre igual. */
export function moneda(valor) {
  const n = Number(valor)
  if (!Number.isFinite(n)) return '—'
  return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
}

/**
 * Un pago venido de Firestore, en forma utilizable.
 *
 * FAIL-OPEN, igual que `normalizarEvaluacion`: un documento con un campo raro
 * cae a un valor razonable en vez de romper la tabla entera. En una pantalla de
 * mostrador, media tabla es mucho mejor que ninguna.
 */
export function normalizarPago(p) {
  const monto = Number(p?.monto)
  return {
    id: p?.id || '',
    monto: Number.isFinite(monto) ? monto : 0,
    concepto: p?.concepto || 'otro',
    metodo: p?.metodo || 'efectivo',
    referencia: String(p?.referencia || ''),
    nota: String(p?.nota || ''),
    matricula: p?.matricula || null,
    registradoPor: p?.registradoPor || null,
    // A QUÉ COMPROMISO SE APLICÓ. Sin esto, normalizar un pago le quitaba el
    // vínculo y el historial de abonos de cada compromiso salía VACÍO en
    // pantalla —el saldo era correcto, porque se calcula con los pagos crudos,
    // pero no se podía enseñar qué se había pagado ni cuándo, que es la mitad
    // de lo que se pidió—. Lo cazó una comprobación en el navegador.
    adeudoId: p?.adeudoId || null,
    fecha: comoFecha(p?.creado) || comoFecha(p?.fecha) || null,
  }
}

/** Del más reciente al más antiguo. Un pago sin fecha va al final, no se pierde. */
export function ordenarPagos(pagos) {
  return (pagos || []).map(normalizarPago).sort((a, b) => {
    if (a.fecha && b.fecha) return b.fecha - a.fecha
    if (a.fecha) return -1
    if (b.fecha) return 1
    return 0
  })
}

export function totalPagado(pagos) {
  return (pagos || []).reduce((suma, p) => suma + (Number(p?.monto) || 0), 0)
}

/** Cuánto se ha cobrado de cada concepto. Para el resumen de la ficha. */
export function porConcepto(pagos) {
  const mapa = new Map()
  for (const p of ordenarPagos(pagos)) {
    const actual = mapa.get(p.concepto) || { concepto: p.concepto, etiqueta: etiquetaConcepto(p.concepto), total: 0, veces: 0 }
    actual.total += p.monto
    actual.veces += 1
    mapa.set(p.concepto, actual)
  }
  return [...mapa.values()].sort((a, b) => b.total - a.total)
}

/**
 * El estado de cuenta.
 *
 * @param {object} arg
 * @param {Array} arg.pagos   lo cobrado.
 * @param {Array} arg.cargos  lo que se debe. Hoy solo llega de la tienda
 *   (artículos apartados y no pagados). Si algún día existe un plan de cobro,
 *   sus vencimientos entran por aquí y el resto de la pantalla no cambia.
 */
export function estadoDeCuenta({ pagos = [], cargos = [], adeudos = [], ahora = new Date() } = {}) {
  const lista = ordenarPagos(pagos)
  const pagado = totalPagado(lista)
  // La deuda ya no es solo la tienda: desde el 21-09-2026 hay COMPROMISOS DE
  // PAGO con sus abonos (`lib/staff/adeudosModelo.js`). `deudaTotal` es quien
  // sabe no contar dos veces el mismo pedido —el que genera su compromiso ya no
  // cuenta como cargo suelto— y quién está vencido.
  const deuda = deudaTotal({ adeudos, pagos, cargos, ahora })
  const debido = deuda.total
  return {
    pagos: lista,
    cargos: cargos || [],
    pagado,
    debido,
    // EL SALDO ES LO PENDIENTE, y no «lo debido menos lo pagado».
    //
    // Restarlos sería contar dos veces: un cargo que ya se cobró deja de ser
    // cargo (la orden pasa a `pagado`), así que restarle además su pago daría
    // un saldo negativo por cada compra saldada. `pagado` es historial —lo que
    // esta persona ha dejado en caja desde que se inscribió—, no un abono
    // contra estos cargos.
    saldo: Math.round((debido + Number.EPSILON) * 100) / 100,
    // Lo que ya venció, que es lo que de verdad se reclama en el mostrador.
    vencido: deuda.vencido,
    compromisos: compromisosDe(adeudos, lista, ahora),
    porConcepto: porConcepto(lista),
    // Se dice explícitamente que el adeudo NO incluye colegiaturas, para que
    // nadie lea un saldo en cero como «está al corriente».
    alcance: adeudos?.length
      ? 'Incluye sus compromisos de pago y lo apartado en tienda. Un abono baja el saldo sin cerrar el compromiso; lo que falta sigue a la vista hasta que se liquide.'
      : 'Incluye únicamente lo que esté apuntado en el sistema: compromisos de pago y lo apartado en tienda. Esta persona no tiene ningún compromiso apuntado, así que un saldo en cero NO significa que esté al corriente.',
  }
}

/** El documento de cobro, listo para guardar. Reutiliza el del alta. */
export function cobroParaGuardar(cobro, { academiaId, matricula, uid, registradoPor }) {
  const monto = Math.round(Number(cobro.monto) * 100) / 100
  return {
    academiaId,
    matricula: matricula || null,
    uid: uid || null,
    monto,
    concepto: cobro.concepto,
    metodo: cobro.metodo,
    referencia: String(cobro.referencia || '').trim().slice(0, 60),
    nota: String(cobro.nota || '').trim().slice(0, 300),
    registradoPor: registradoPor || null,
  }
}

/**
 * Qué impide cobrar, además de lo que ya valida `problemasDelPago`.
 *
 * La matrícula es obligatoria en la regla de Firestore (`matricula is string`),
 * así que cobrarle a alguien sin ella se denegaría en el servidor con un
 * `permission-denied` que en pantalla parece un problema de permisos. Mejor
 * decirlo antes y con su nombre.
 */
export function problemasDelCobro(cobro, { matricula } = {}) {
  const p = problemasDelPago(cobro)
  if (!String(matricula || '').trim()) {
    p.push('Esta persona no tiene matrícula todavía: emítesela antes de registrarle un cobro.')
  }
  return p
}

/** `20 sep 2026, 14:35`. Para tablas e impresión. */
export function fechaCorta(valor) {
  const d = comoFecha(valor)
  if (!d) return '—'
  return d.toLocaleString('es-MX', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}
