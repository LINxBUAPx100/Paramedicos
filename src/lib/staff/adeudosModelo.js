// ============================================================
//  Compromisos de pago — adeudos y sus abonos (lógica PURA)
// ------------------------------------------------------------
//  LO QUE SE PIDIÓ el 21-09-2026, en palabras del dueño del producto: «poder
//  recibir pagos parciales, apartados, liquidaciones, etc., y registrarlo como
//  tal, haciendo que en caja no haya faltantes pero en la información del
//  alumno sí haya compromisos de pago y sus historiales».
//
//  Eso son DOS COSAS DISTINTAS y la confusión entre ambas es lo que produce
//  cajas descuadradas:
//
//   · **El PAGO es dinero que entró.** Es un asiento, es inmutable y es lo que
//     se cuadra contra el cajón. Si alguien abona $500 de $3 000, en caja hay
//     $500 y nada más: apuntar los $3 000 crearía un faltante de $2 500 que no
//     existe.
//   · **El ADEUDO es una promesa.** No es dinero: es lo que esa persona quedó
//     a deber, con su fecha y su concepto. Vive en su ficha, no en la caja.
//
//  ── EL SALDO SE DERIVA, NUNCA SE GUARDA COMO VERDAD.
//
//  Lo abonado a un adeudo es la suma de los pagos que apuntan a él
//  (`pago.adeudoId`). El documento del adeudo guarda `pagado` y `estado` como
//  CACHÉ —para poder listar quién debe sin leer los pagos de toda la academia—,
//  pero cuando la ficha tiene los pagos delante manda el cálculo, no la caché.
//  Un número guardado que nadie recalcula es un saldo mentiroso esperando su
//  turno; es la misma regla que ya sigue `estadoDeCuenta`.
//
//  ── UN ABONO NUNCA PUEDE PASARSE DEL TOTAL.
//
//  Cobrar $600 de un adeudo de $500 no es un abono: o el importe está mal
//  tecleado o hay que cobrarlo como otra cosa. Se rechaza antes de tocar la
//  red, porque un pago ya registrado no se puede corregir.
//
//  Módulo PURO: sin React y sin Firebase.
// ============================================================
import { CONCEPTOS_PAGO } from '../recepcionModelo.js'
import { comoFecha } from './asistenciaModelo.js'

export { CONCEPTOS_PAGO }

const ETIQUETA_CONCEPTO = new Map(CONCEPTOS_PAGO.map((c) => [c.id, c.etiqueta]))

/** Estados de un compromiso. `vencido` NO se guarda: se deriva de la fecha. */
export const ESTADOS_ADEUDO = [
  { id: 'abierto', etiqueta: 'Pendiente' },
  { id: 'liquidado', etiqueta: 'Liquidado' },
  { id: 'cancelado', etiqueta: 'Cancelado' },
]

export const IMPORTE_MAXIMO = 100000

/** Lo que cuenta como deuda viva. Un adeudo cancelado no se cobra. */
export const ESTADOS_VIVOS = ['abierto']

/**
 * Lo abonado a un adeudo: la suma de los pagos que apuntan a él.
 *
 * Es la FUENTE DE VERDAD. El campo `pagado` del documento es una copia para
 * poder listar sin leer los pagos, y cuando los dos discrepan manda esto.
 */
export function abonadoDe(adeudo, pagos = []) {
  if (!adeudo?.id) return 0
  const suma = (pagos || [])
    .filter((p) => p?.adeudoId === adeudo.id)
    .reduce((s, p) => s + (Number(p?.monto) || 0), 0)
  return Math.round(suma * 100) / 100
}

/** Lo que falta por pagar. Nunca negativo: un sobrepago no es un saldo a favor. */
export function saldoDe(adeudo, pagos = []) {
  const total = Number(adeudo?.total) || 0
  return Math.max(0, Math.round((total - abonadoDe(adeudo, pagos)) * 100) / 100)
}

/**
 * El estado REAL de un compromiso, con su fecha de vencimiento aplicada.
 *
 * @returns {{estado: string, etiqueta: string, saldo: number, abonado: number, vencido: boolean}}
 *   estado: 'abierto' · 'abonado' · 'liquidado' · 'cancelado'
 */
export function estadoDeAdeudo(adeudo, pagos = [], ahora = new Date()) {
  const abonado = abonadoDe(adeudo, pagos)
  const saldo = saldoDe(adeudo, pagos)
  if (adeudo?.estado === 'cancelado') {
    return { estado: 'cancelado', etiqueta: 'Cancelado', saldo: 0, abonado, vencido: false }
  }
  if (saldo === 0) {
    return { estado: 'liquidado', etiqueta: 'Liquidado', saldo: 0, abonado, vencido: false }
  }
  const vence = fechaDeVencimiento(adeudo)
  const vencido = Boolean(vence && vence.getTime() < ahora.getTime())
  return {
    estado: abonado > 0 ? 'abonado' : 'abierto',
    etiqueta: vencido
      ? (abonado > 0 ? 'Abonado y vencido' : 'Vencido')
      : (abonado > 0 ? 'Con abonos' : 'Pendiente'),
    saldo,
    abonado,
    vencido,
  }
}

/** La fecha de vencimiento como `Date`, o `null`. Admite 'YYYY-MM-DD' y Timestamp. */
export function fechaDeVencimiento(adeudo) {
  const v = adeudo?.vence
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) {
    // Mediodía local: sin esto, un vencimiento «hoy» se leería como vencido o
    // como pendiente según la zona horaria del navegador.
    const [a, m, d] = v.split('-').map(Number)
    return new Date(a, m - 1, d, 23, 59, 59)
  }
  return comoFecha(v)
}

/**
 * Qué clase de abono es este importe sobre este adeudo.
 *
 * @returns {{tipo: string, problema: string}}
 *   tipo: 'liquidacion' · 'abono' · 'invalido'
 */
export function claseDeAbono(adeudo, monto, pagos = []) {
  const n = Number(monto)
  const saldo = saldoDe(adeudo, pagos)
  if (!Number.isFinite(n) || n <= 0) return { tipo: 'invalido', problema: 'El importe debe ser mayor que cero.' }
  if (saldo === 0) return { tipo: 'invalido', problema: 'Ese compromiso ya está liquidado.' }
  if (n > saldo) {
    return {
      tipo: 'invalido',
      problema: `Ese abono ($${n.toFixed(2)}) es mayor que lo que falta ($${saldo.toFixed(2)}). Cóbralo en dos: el resto va como otro concepto.`,
    }
  }
  return { tipo: n === saldo ? 'liquidacion' : 'abono', problema: '' }
}

/** Qué le falta a un compromiso para poder guardarse. */
export function problemasDelAdeudo(adeudo) {
  const p = []
  const total = Number(adeudo?.total)
  if (!Number.isFinite(total) || total <= 0) p.push('El importe del compromiso debe ser mayor que cero.')
  else if (total > IMPORTE_MAXIMO) p.push('El importe parece equivocado: revisa las cifras.')
  if (!ETIQUETA_CONCEPTO.has(adeudo?.concepto)) p.push('Elige el concepto del compromiso.')
  const vence = String(adeudo?.vence || '').trim()
  if (vence && !/^\d{4}-\d{2}-\d{2}$/.test(vence)) p.push('La fecha de vencimiento no tiene una forma válida.')
  return p
}

/** El documento listo para guardar. Los importes salen ya como números. */
export function adeudoParaGuardar(adeudo, { academiaId, alumno, registradoPor, origen = null }) {
  return {
    academiaId,
    uid: alumno?.uid || alumno?.id || null,
    // Cadena y no `null`: la matrícula puede faltar (ver carritoModelo), y un
    // campo que a veces no está obliga a comprobarlo en cada lectura.
    matricula: alumno?.matricula || '',
    nombre: String(alumno?.nombre || '').trim(),
    concepto: adeudo.concepto,
    descripcion: String(adeudo.descripcion || '').trim().slice(0, 200),
    total: Math.round(Number(adeudo.total) * 100) / 100,
    // CACHÉ, no verdad: ver la cabecera. Nace en cero y lo mueve cada cobro.
    pagado: 0,
    estado: 'abierto',
    vence: String(adeudo.vence || '').trim() || null,
    // De dónde salió: `null` si lo creó alguien a mano, o el pedido de tienda
    // que lo originó. Es lo que impide contar dos veces la misma deuda.
    origen: origen || null,
    registradoPor: registradoPor || null,
  }
}

/** El compromiso que genera un pedido de tienda ya confirmado. */
export function adeudoDeOrden(orden, { academiaId, alumno, registradoPor }) {
  return adeudoParaGuardar({
    concepto: 'material',
    descripcion: `Tienda · ${(orden?.lineas || []).map((l) => `${l.cantidad}× ${l.nombre || l.articuloId}`).join(', ')}`.slice(0, 200),
    total: Number(orden?.total) || 0,
    vence: '',
  }, { academiaId, alumno, registradoPor, origen: { tipo: 'orden', id: orden?.id || '' } })
}

/**
 * Los compromisos de alguien, ya resueltos y ordenados para pintar.
 *
 * Primero lo vencido, después por fecha de vencimiento, y al final lo que no
 * tiene fecha. Lo liquidado y lo cancelado van al fondo: son historial.
 */
export function compromisosDe(adeudos = [], pagos = [], ahora = new Date()) {
  return (adeudos || [])
    .map((a) => ({ ...a, ...estadoDeAdeudo(a, pagos, ahora), abonos: abonosDe(a, pagos) }))
    .sort((x, y) => {
      const vivo = (c) => (c.estado === 'liquidado' || c.estado === 'cancelado' ? 1 : 0)
      if (vivo(x) !== vivo(y)) return vivo(x) - vivo(y)
      if (x.vencido !== y.vencido) return x.vencido ? -1 : 1
      const fx = fechaDeVencimiento(x)
      const fy = fechaDeVencimiento(y)
      if (fx && fy) return fx - fy
      if (fx) return -1
      if (fy) return 1
      return 0
    })
}

/** Los abonos concretos de un compromiso, recientes primero. */
export function abonosDe(adeudo, pagos = []) {
  return (pagos || [])
    .filter((p) => p?.adeudoId === adeudo?.id)
    .slice()
    .sort((a, b) => (comoFecha(b?.creado)?.getTime() || 0) - (comoFecha(a?.creado)?.getTime() || 0))
}

/**
 * Cuánto debe alguien de verdad, sin contar nada dos veces.
 *
 * `cargos` son los de la tienda que YA calcula `cargosDeOrdenes`. Un pedido
 * confirmado desde el 21-09-2026 genera su propio compromiso, así que su cargo
 * se descarta aquí: sumar los dos duplicaría la deuda. Los pedidos anteriores
 * no tienen compromiso y siguen contando como siempre, sin migrar nada.
 */
export function deudaTotal({ adeudos = [], pagos = [], cargos = [], ahora = new Date() } = {}) {
  const conCompromiso = new Set(
    (adeudos || []).map((a) => a?.origen?.id).filter(Boolean)
  )
  const deAdeudos = (adeudos || [])
    .filter((a) => a?.estado !== 'cancelado')
    .reduce((s, a) => s + saldoDe(a, pagos), 0)
  const deCargos = (cargos || [])
    .filter((c) => !conCompromiso.has(c?.id))
    .reduce((s, c) => s + (Number(c?.monto) || 0), 0)
  const vencido = (adeudos || [])
    .filter((a) => estadoDeAdeudo(a, pagos, ahora).vencido)
    .reduce((s, a) => s + saldoDe(a, pagos), 0)
  return {
    total: Math.round((deAdeudos + deCargos) * 100) / 100,
    deAdeudos: Math.round(deAdeudos * 100) / 100,
    deCargos: Math.round(deCargos * 100) / 100,
    vencido: Math.round(vencido * 100) / 100,
  }
}

export const etiquetaConceptoAdeudo = (id) => ETIQUETA_CONCEPTO.get(id) || String(id || '—')
