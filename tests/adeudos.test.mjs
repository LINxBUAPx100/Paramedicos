// ============================================================
//  Compromisos de pago — parciales, apartados y liquidaciones
// ------------------------------------------------------------
//  LO QUE ESTA SUITE EXISTE PARA IMPEDIR, y es el error que se pidió evitar con
//  todas sus letras: **que en la caja aparezcan faltantes**.
//
//  Pasa en cuanto alguien confunde las dos cosas que este módulo separa:
//
//   · el PAGO es dinero que entró y se cuadra contra el cajón;
//   · el ADEUDO es una promesa, y no es dinero.
//
//  Si un abono de $500 sobre una deuda de $3 000 apuntara $3 000 en caja,
//  faltarían $2 500 al cerrar. Y al revés: si la deuda no quedara registrada,
//  el alumno se iría debiendo $2 500 que nadie recuerda.
//
//  Módulo PURO: sin red y sin React.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  abonadoDe, abonosDe, adeudoDeOrden, adeudoParaGuardar, claseDeAbono, compromisosDe,
  deudaTotal, estadoDeAdeudo, fechaDeVencimiento, problemasDelAdeudo, saldoDe,
} from '../src/lib/staff/adeudosModelo.js'
import { estadoDeCuenta } from '../src/lib/staff/cajaModelo.js'

const ALUMNA = { uid: 'u1', nombre: 'Ana Pérez', matricula: '0411115' }
const DEUDA = { id: 'a1', total: 3000, concepto: 'inscripcion', estado: 'abierto', vence: '2026-10-05' }
const ABONO = { id: 'p1', monto: 500, adeudoId: 'a1', metodo: 'efectivo' }

// ── EL CASO QUE SE PIDIÓ ────────────────────────────────────────────────────

test('UN ABONO DE 500 SOBRE 3000 NO PRODUCE UN FALTANTE DE 2500', () => {
  // En caja entran 500, ni uno más. Lo que queda debiendo vive en su ficha.
  const cuenta = estadoDeCuenta({ pagos: [ABONO], adeudos: [DEUDA] })
  assert.equal(cuenta.pagado, 500, 'la caja dejó de sumar lo que de verdad entró')
  assert.equal(cuenta.saldo, 2500, 'el saldo pendiente no es lo que falta')
  assert.equal(abonadoDe(DEUDA, [ABONO]), 500)
  assert.equal(saldoDe(DEUDA, [ABONO]), 2500)
})

test('el historial de abonos sobrevive a la normalización del pago', () => {
  // El saldo se calcula con los pagos crudos y salía bien; los abonos de cada
  // compromiso se pintan desde los pagos NORMALIZADOS, y ahí se perdía el
  // vínculo `adeudoId`: la lista salía vacía. El saldo correcto tapaba el fallo.
  const cuenta = estadoDeCuenta({ pagos: [ABONO], adeudos: [DEUDA] })
  assert.equal(cuenta.compromisos[0].abonos.length, 1,
    'un compromiso con abonos los enseña como historial')
  assert.equal(cuenta.compromisos[0].abonos[0].monto, 500)
})

test('liquidar cierra el compromiso y deja de pesar en el saldo', () => {
  const pagos = [ABONO, { id: 'p2', monto: 2500, adeudoId: 'a1' }]
  const estado = estadoDeAdeudo(DEUDA, pagos)
  assert.equal(estado.estado, 'liquidado')
  assert.equal(estado.saldo, 0)
  assert.equal(estadoDeCuenta({ pagos, adeudos: [DEUDA] }).saldo, 0)
  // Y el historial sigue entero: dos abonos, no uno.
  assert.equal(abonosDe(DEUDA, pagos).length, 2)
})

test('el saldo SE DERIVA de los pagos, no del campo guardado', () => {
  // `pagado` es una caché: si se queda corta —una escritura a medias—, el saldo
  // que se enseña sigue siendo el correcto.
  const mentiroso = { ...DEUDA, pagado: 0 }
  assert.equal(saldoDe(mentiroso, [ABONO]), 2500)
  const optimista = { ...DEUDA, pagado: 3000 }
  assert.equal(saldoDe(optimista, [ABONO]), 2500, 'una caché adelantada borró una deuda real')
})

// ── LO QUE NO SE PERMITE ────────────────────────────────────────────────────

test('NO se puede abonar más de lo que falta', () => {
  // Cobrar 600 de una deuda de 500 no es un abono: o está mal tecleado o es
  // otra cosa. Y un pago registrado ya no se corrige.
  const r = claseDeAbono({ id: 'a1', total: 500 }, 600, [])
  assert.equal(r.tipo, 'invalido')
  assert.match(r.problema, /mayor que lo que falta/)

  assert.equal(claseDeAbono({ id: 'a1', total: 500 }, 500, []).tipo, 'liquidacion')
  assert.equal(claseDeAbono({ id: 'a1', total: 500 }, 200, []).tipo, 'abono')
  assert.equal(claseDeAbono({ id: 'a1', total: 500 }, 0, []).tipo, 'invalido')
  assert.equal(claseDeAbono({ id: 'a1', total: 500 }, 100, [{ adeudoId: 'a1', monto: 500 }]).tipo, 'invalido',
    'se pudo abonar a algo ya liquidado')
})

test('un compromiso sin importe o sin concepto no se guarda', () => {
  assert.match(problemasDelAdeudo({ total: 0, concepto: 'inscripcion' }).join(' '), /mayor que cero/)
  assert.match(problemasDelAdeudo({ total: 100, concepto: 'inventado' }).join(' '), /concepto/)
  assert.match(problemasDelAdeudo({ total: 250000, concepto: 'otro' }).join(' '), /equivocado/)
  assert.match(problemasDelAdeudo({ total: 100, concepto: 'otro', vence: 'mañana' }).join(' '), /fecha/)
  assert.equal(problemasDelAdeudo({ total: 100, concepto: 'otro', vence: '2026-11-09' }).length, 0)
})

test('nace SIN abonos: un compromiso medio pagado sería dinero que no pasó por caja', () => {
  const doc = adeudoParaGuardar(
    { total: 1500.456, concepto: 'mensualidad', vence: '2026-11-09', descripcion: 'Noviembre' },
    { academiaId: 'ACA', alumno: ALUMNA, registradoPor: 'r1' }
  )
  assert.equal(doc.pagado, 0)
  assert.equal(doc.estado, 'abierto')
  assert.equal(doc.total, 1500.46, 'el importe no se redondeó a dos decimales')
  assert.equal(doc.uid, 'u1')
  assert.equal(typeof doc.matricula, 'string')
})

// ── VENCIMIENTOS ────────────────────────────────────────────────────────────

test('lo vencido se distingue de lo pendiente', () => {
  const despues = new Date(2026, 9, 6) // 6 de octubre
  const antes = new Date(2026, 9, 1)
  assert.equal(estadoDeAdeudo(DEUDA, [], despues).vencido, true)
  assert.equal(estadoDeAdeudo(DEUDA, [], antes).vencido, false)
  // El día del vencimiento todavía NO está vencido: se cobra ese día.
  assert.equal(estadoDeAdeudo(DEUDA, [], new Date(2026, 9, 5, 10)).vencido, false)
  assert.equal(fechaDeVencimiento({ vence: '' }), null)
  // Y un compromiso liquidado nunca está vencido, aunque la fecha pasara.
  assert.equal(estadoDeAdeudo(DEUDA, [{ adeudoId: 'a1', monto: 3000 }], despues).vencido, false)
})

test('el saldo separa lo vencido, que es lo que se reclama hoy', () => {
  const ahora = new Date(2026, 9, 6)
  const alDia = { id: 'a2', total: 800, estado: 'abierto', vence: '2026-12-01' }
  const cuenta = estadoDeCuenta({ pagos: [ABONO], adeudos: [DEUDA, alDia], ahora })
  assert.equal(cuenta.saldo, 3300) // 2500 + 800
  assert.equal(cuenta.vencido, 2500)
})

test('lo cancelado deja de reclamarse, pero sus abonos no se borran', () => {
  const cancelado = { ...DEUDA, estado: 'cancelado' }
  assert.equal(estadoDeCuenta({ pagos: [ABONO], adeudos: [cancelado] }).saldo, 0)
  assert.equal(estadoDeCuenta({ pagos: [ABONO], adeudos: [cancelado] }).pagado, 500,
    'cancelar una deuda borró un pago que ya había entrado en caja')
})

// ── LA TIENDA NO SE CUENTA DOS VECES ────────────────────────────────────────

test('un pedido con compromiso NO suma también como cargo suelto', () => {
  // Al confirmarse, un pedido deja su compromiso. Si además siguiera contando
  // como cargo de tienda, la deuda saldría doble.
  const deOrden = adeudoDeOrden(
    { id: 'o1', total: 450, lineas: [{ cantidad: 1, nombre: 'Férula' }] },
    { academiaId: 'ACA', alumno: ALUMNA, registradoPor: 'r1' }
  )
  const cargo = { id: 'o1', concepto: 'material', monto: 450 }
  const r = deudaTotal({ adeudos: [{ ...deOrden, id: 'ad1' }], cargos: [cargo], pagos: [] })
  assert.equal(r.total, 450, 'el pedido se contó dos veces')
  assert.equal(r.deCargos, 0)
  assert.match(deOrden.descripcion, /Férula/)
  assert.equal(deOrden.origen.id, 'o1')
})

test('los pedidos VIEJOS, sin compromiso, siguen contando como siempre', () => {
  // No hace falta migrar nada: lo que no tiene compromiso cuenta por su cargo.
  const r = deudaTotal({ adeudos: [], cargos: [{ id: 'o9', monto: 320 }], pagos: [] })
  assert.equal(r.total, 320)
  assert.equal(r.deCargos, 320)
})

// ── EL ORDEN EN QUE SE PINTAN ───────────────────────────────────────────────

test('primero lo vencido, al final lo liquidado', () => {
  const ahora = new Date(2026, 9, 6)
  const lista = compromisosDe([
    { id: 'z', total: 100, estado: 'abierto' },
    { id: 'v', total: 200, estado: 'abierto', vence: '2026-09-01' },
    { id: 'l', total: 300, estado: 'abierto' },
  ], [{ adeudoId: 'l', monto: 300 }], ahora)
  assert.deepEqual(lista.map((c) => c.id), ['v', 'z', 'l'])
  assert.equal(lista[0].vencido, true)
  assert.equal(lista[2].estado, 'liquidado')
})

// ── LA ESCRITURA Y LAS REGLAS ───────────────────────────────────────────────

const PUERTO = readFileSync(new URL('../src/lib/firebase/staff/adeudos.js', import.meta.url), 'utf8')
const CAJA = readFileSync(new URL('../src/lib/firebase/staff/caja.js', import.meta.url), 'utf8')
const REGLAS = readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8')

test('PRIMERO EL DINERO, DESPUÉS LA DEUDA', () => {
  // Si se apuntara el abono antes de registrar el pago y fallara el pago,
  // quedaría una deuda descontada sin que hubiera entrado un peso: el faltante
  // que todo esto existe para evitar.
  const cobrar = CAJA.slice(CAJA.indexOf('export async function cobrar'), CAJA.indexOf('export async function pagosDe'))
  const iPago = cobrar.indexOf("addDoc(collection(db, 'pagos')")
  const iAbono = cobrar.indexOf('apuntarAbono')
  assert.ok(iPago > 0 && iAbono > 0)
  assert.ok(iPago < iAbono, 'el abono se apunta antes de registrar el pago')
  assert.match(cobrar, /catch \{ \/\* el pago ya está/, 'un fallo al apuntar el abono tumba el cobro')
})

test('el abono se apunta en una TRANSACCIÓN', () => {
  // Dos cobros a la vez leerían el mismo `pagado` y el segundo pisaría al
  // primero, dejando la caché corta.
  assert.match(PUERTO, /runTransaction/)
  assert.match(PUERTO, /pagado >= \(Number\(datos\.total\)/)
})

test('un pedido no genera DOS compromisos aunque se reintente', () => {
  assert.match(PUERTO, /where\('origen\.id', '==', orden\?\.id/)
  assert.match(PUERTO, /reutilizado: true/)
})

test('LA REGLA no deja reescribir el importe ni bajar lo abonado', () => {
  const i = REGLAS.indexOf('match /adeudos/{id}')
  assert.notEqual(i, -1, 'desaparecieron las reglas de los compromisos')
  const bloque = REGLAS.slice(i, REGLAS.indexOf('\n    }', REGLAS.indexOf('allow delete', i)))
  assert.match(bloque, /request\.resource\.data\.total == resource\.data\.total/,
    'se puede cambiar el importe de una deuda que ya tiene abonos')
  assert.match(bloque, /pagado >= resource\.data\.get\('pagado', 0\)/,
    'se puede «desabonar» dinero ya cobrado')
  assert.match(bloque, /request\.resource\.data\.uid == resource\.data\.uid/,
    'se puede trasladar una deuda a quien no la contrajo')
  assert.match(bloque, /request\.resource\.data\.pagado == 0/,
    'un compromiso puede nacer medio pagado, con dinero que no pasó por caja')
  assert.match(bloque, /esDueno\(resource\.data\.uid\)/,
    'el alumno dejó de poder ver lo que debe')
})

test('cobrar desde la tienda usa la MISMA función que la caja', () => {
  // Un segundo camino para mover dinero es lo que descuadra una caja.
  const TIENDA = readFileSync(new URL('../src/components/staff/PanelTienda.jsx', import.meta.url), 'utf8')
  assert.match(TIENDA, /import\('\.\.\/\.\.\/lib\/firebase\/staff\/caja\.js'\)/,
    'la tienda dejó de cobrar por la caja de siempre')
  assert.match(TIENDA, /adeudoId: compromiso\.id/, 'el cobro de la tienda no se aplica a su compromiso')
  assert.match(TIENDA, /claseDeAbono/, 'la tienda dejó de comprobar que el abono cabe en la deuda')
})
