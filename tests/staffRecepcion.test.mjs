// ============================================================
//  Recepción — la aritmética del mostrador
// ------------------------------------------------------------
//  Todo lo que se prueba aquí es PURO: no hay red, no hay React y el reloj
//  entra como argumento. Por eso se puede comprobar un sábado a las nueve que
//  una entrada de las 22:00 sigue vigente a la 01:00, sin esperar al sábado.
//
//  Lo que se vigila no son «las funciones»: son las decisiones que se tomaron
//  y que alguien podría deshacer sin darse cuenta. Cada `test` dice cuál.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import {
  adaptadorMatricula, coincide, interpretarClave, normalizarTexto,
  ordenarCandidatos, sinResultados,
} from '../src/lib/staff/resolverAlumno.js'
import {
  HORAS_VIGENCIA, asistenciaDeHoy, checkinParaGuardar, claveDeDia, enClase,
  expiraDe, idAsistencia, minutosRestantes, resumenDeAsistencia,
} from '../src/lib/staff/asistenciaModelo.js'
import { estadoDeCuenta, porConcepto, problemasDelCobro, totalPagado } from '../src/lib/staff/cajaModelo.js'
import {
  agregar, cambiarCantidad, cargosDeOrdenes, descuentoPorEntrega, disponibleDe,
  problemasDelCarrito, quitar, totalDe,
} from '../src/lib/staff/carritoModelo.js'
import { componer, datosDeMensaje } from '../src/lib/staff/plantillasMensaje.js'
import {
  CAMPOS_VETADOS, cambiosDe, entradaDeAuditoria, parcheDeEdicion, parcheSeguro,
  problemasDeEdicion,
} from '../src/lib/staff/edicionPerfil.js'
import { construirReporte, problemasDelReporte, seleccionPorDefecto } from '../src/lib/staff/reporteModelo.js'

const ALUMNA = {
  uid: 'u1', nombre: 'Ana María Pérez Solís', matricula: 'RE0000007',
  email: 'ana@ejemplo.mx', telefono: '2222256586', grupoId: 'G1',
  academiaId: 'RES-2026', rol: 'alumno', estado: 'activo',
}

// ── EL BUSCADOR ─────────────────────────────────────────────────────────────

test('UN TROZO DE MATRÍCULA YA NO SE RELLENA CON CEROS', () => {
  // Cambió el 21-09-2026 y es el corazón del formato nuevo: los siete dígitos
  // significan generación, mes, día y orden, así que completar «15» hasta
  // «0000015» no produce la matrícula de nadie, produce un número de otra
  // generación y otro mes. Quien teclea menos de siete dígitos está buscando
  // por un trozo, y eso se resuelve buscando, no inventando.
  const r = interpretarClave('15', { academiaId: 'RES-2026' })
  assert.equal(r.tipo, 'matricula-parcial')
  assert.equal(r.consulta, '15')
  assert.ok(coincide({ matricula: '0411115' }, r), 'no encuentra a quien acaba en 15')
  assert.ok(!coincide({ matricula: '0411123' }, r))
})

test('la matrícula nueva completa se busca exacta y sin aviso', () => {
  const r = interpretarClave('0411115', { academiaId: 'RES-2026' })
  assert.equal(r.tipo, 'matricula')
  assert.equal(r.consulta, '0411115')
  assert.equal(r.aviso, '', 'avisar de algo que no se cambió es ruido')
})

test('la matrícula del formato anterior se sigue encontrando', () => {
  // Mientras dure la migración el padrón tiene las dos. Un buscador que deje de
  // encontrar las viejas deja sin atender a quien las lleva en la credencial.
  const r = interpretarClave('RE0000007', { academiaId: 'RES-2026' })
  assert.equal(r.tipo, 'matricula')
  assert.equal(r.consulta, 'RE0000007')
  assert.equal(interpretarClave('RE7', { academiaId: 'RES-2026' }).consulta, 'RE0000007',
    'las viejas sí se completan: su número era correlativo y no codificaba nada')
})

test('correo, teléfono y nombre se distinguen solos', () => {
  assert.equal(interpretarClave('ana@ejemplo.mx').tipo, 'correo')
  assert.equal(interpretarClave('(222) 225-6586').tipo, 'telefono')
  assert.equal(interpretarClave('perez solis').tipo, 'nombre')
  assert.equal(interpretarClave('   ').tipo, 'vacio')
})

test('el teléfono se normaliza a dígitos: se busca lo que se guardó', () => {
  assert.equal(interpretarClave('(222) 225-6586').consulta, '2222256586')
})

test('buscar «Martinez» encuentra a «Martínez»', () => {
  // El fallo más aburrido y más frecuente de un buscador en español.
  const m = { nombre: 'José Martínez Ruiz' }
  assert.ok(coincide(m, interpretarClave('martinez')))
  assert.equal(normalizarTexto('Pérez  Solís'), 'perez solis')
})

test('el nombre se busca por palabras sueltas y en cualquier orden', () => {
  assert.ok(coincide(ALUMNA, interpretarClave('ana perez')))
  assert.ok(coincide(ALUMNA, interpretarClave('solis ana')))
  assert.ok(!coincide(ALUMNA, interpretarClave('ana gutierrez')))
})

test('un alumno SIN teléfono no coincide con cualquier teléfono', () => {
  // `''.endsWith(x)` es false, pero un teléfono vacío normalizado podría
  // colarse si alguien invierte la comparación. Se fija el comportamiento.
  const sinTel = { ...ALUMNA, telefono: '' }
  assert.ok(!coincide(sinTel, interpretarClave('2222256586')))
})

test('la coincidencia exacta va primero en la lista', () => {
  const otros = [{ nombre: 'Zoe', matricula: 'RE0000009' }, ALUMNA]
  const orden = ordenarCandidatos(otros, interpretarClave('RE7', { academiaId: 'RES-2026' }))
  assert.equal(orden[0].matricula, 'RE0000007')
})

test('«no existe» NO es un error: ofrece dar de alta', () => {
  // Es el caso normal el primer día de inscripciones. Si la pantalla solo
  // dijera «no existe», habría que salir a otra con alguien esperando delante.
  for (const clave of ['9', 'nadie@ejemplo.mx', 'persona inexistente']) {
    assert.equal(sinResultados(interpretarClave(clave, { academiaId: 'RES' })).ofreceAlta, true)
  }
  assert.equal(sinResultados(interpretarClave('')).ofreceAlta, false)
})

test('el adaptador de matrícula es sustituible entero', () => {
  // ESTA ES LA COSTURA. El día que cambie la numeración se escribe otro
  // adaptador y el buscador no se toca. Si esta prueba deja de pasar, es que
  // alguien cableó el formato dentro del buscador.
  const otro = {
    parece: (t) => /^MAT-/i.test(t),
    completar: (t) => t.toUpperCase(),
    esValida: (t) => /^MAT-\d+$/.test(t),
  }
  const r = interpretarClave('mat-42', { adaptador: otro })
  assert.equal(r.tipo, 'matricula')
  assert.equal(r.consulta, 'MAT-42')
  // Y el vigente son SIETE DÍGITOS que significan algo: se acepta entero y no
  // se rellena a partir de un trozo.
  assert.equal(adaptadorMatricula.completar('0411115', 'RES-2026'), '0411115')
  assert.equal(adaptadorMatricula.completar('15', 'RES-2026'), null)
  // El anterior se sigue completando mientras queden matrículas viejas.
  assert.equal(adaptadorMatricula.completar('RE7', 'RES-2026'), 'RE0000007')
})

// ── EL CORTE DE CAJA ────────────────────────────────────────────────────────
//
//  LO QUE ESTA PRUEBA IMPIDE QUE VUELVA: un corte de caja que dice «$0.00 · sin
//  cobros en este periodo» con el cajón lleno. Pasaba porque la consulta cruza
//  una igualdad con un rango de fechas —eso exige índice compuesto—, y al
//  faltar el índice el `catch` devolvía una lista vacía SIN AVISAR. Un corte en
//  blanco por un fallo técnico no se distingue de un día sin ventas.

test('el corte de caja NO puede devolver cero en silencio', () => {
  const CAJA = readFileSync(new URL('../src/lib/firebase/staff/caja.js', import.meta.url), 'utf8')
  const corte = CAJA.slice(CAJA.indexOf('export async function cobrosDelDia'))
  assert.doesNotMatch(corte.slice(0, corte.indexOf('\n}')), /failed-precondition'\) throw err\s*\n\s*return \[\]/,
    'el corte volvió a tragarse la falta de índice devolviendo una lista vacía')
  assert.match(corte, /aviso:/, 'el corte dejó de poder explicar por qué va por el camino lento')
  assert.match(corte, /completo:/, 'un corte recortado por el tope dejó de avisarlo')
  const PANEL = readFileSync(new URL('../src/components/staff/PanelCorte.jsx', import.meta.url), 'utf8')
  assert.match(PANEL, /setAviso\(r\.aviso/, 'la pantalla dejó de enseñar el aviso')
})

test('el índice que el corte necesita está DECLARADO', () => {
  // Declararlo no lo despliega (`firebase deploy --only firestore:indexes`),
  // pero sin declararlo no se despliega nunca.
  const INDICES = JSON.parse(readFileSync(new URL('../firestore.indexes.json', import.meta.url), 'utf8'))
  const pagos = INDICES.indexes.filter((i) => i.collectionGroup === 'pagos')
  assert.ok(pagos.length >= 1, 'desapareció el índice de pagos: el corte de caja volverá a salir vacío')
  const porFecha = pagos.find((i) => i.fields.some((f) => f.fieldPath === 'creado')
    && i.fields.some((f) => f.fieldPath === 'academiaId'))
  assert.ok(porFecha, 'falta el índice academiaId + creado, que es el del corte')
})

// ── ASISTENCIA ──────────────────────────────────────────────────────────────

test('«en clase» se DERIVA de la hora de caducidad, no de una bandera', () => {
  // Un booleano exigiría un proceso que lo apagara, y en plan Spark no hay ni
  // TTL ni cron: alguien se quedaría «en clase» para siempre.
  const inicio = new Date('2026-09-20T08:00:00')
  const a = { inicio, expira: expiraDe(inicio) }
  assert.equal(enClase(a, new Date('2026-09-20T12:00:00')), true)
  assert.equal(enClase(a, new Date('2026-09-20T16:30:00')), false)
  assert.equal(minutosRestantes(a, new Date('2026-09-20T15:00:00')), 60)
})

test('la vigencia son exactamente ocho horas', () => {
  const inicio = new Date('2026-09-20T08:00:00')
  assert.equal(expiraDe(inicio).getTime() - inicio.getTime(), HORAS_VIGENCIA * 3600_000)
})

test('una clase que cruza medianoche sigue vigente', () => {
  const inicio = new Date('2026-09-20T22:00:00')
  const a = { inicio, expira: expiraDe(inicio) }
  assert.equal(enClase(a, new Date('2026-09-21T01:00:00')), true)
  // Pero el documento pertenece al día en que EMPEZÓ: si se contara por el día
  // en curso, el mismo turno saldría partido en dos fechas.
  assert.equal(claveDeDia(inicio), '2026-09-20')
  assert.equal(idAsistencia('u1', inicio), 'u1__2026-09-20')
})

test('dos pases el mismo día son el MISMO documento', () => {
  // Es lo que impide inflar el recuento pulsando dos veces, sin leer antes y
  // sin carrera posible entre dos mostradores.
  const a = idAsistencia('u1', new Date('2026-09-20T08:00:00'))
  const b = idAsistencia('u1', new Date('2026-09-20T19:30:00'))
  assert.equal(a, b)
  assert.notEqual(a, idAsistencia('u1', new Date('2026-09-21T08:00:00')))
})

test('el check-in guarda inicio y expira con la relación garantizada', () => {
  // No se usan dos `serverTimestamp()` independientes a propósito: con ellos no
  // hay forma de garantizar que `expira` sea `inicio + 8 h`.
  const doc = checkinParaGuardar({
    alumno: ALUMNA, academiaId: 'RES-2026', registradoPor: 'staff1',
    ahora: new Date('2026-09-20T08:00:00'),
  })
  assert.equal(doc.expira.getTime() - doc.inicio.getTime(), HORAS_VIGENCIA * 3600_000)
  assert.equal(doc.medio, 'manual')
  assert.equal(doc.matricula, 'RE0000007')
})

test('un medio inventado cae a «manual» en vez de guardarse', () => {
  const doc = checkinParaGuardar({ alumno: ALUMNA, academiaId: 'A', medio: 'telepatia' })
  assert.equal(doc.medio, 'manual')
})

test('el resumen sabe si entró hoy y cuánto le queda', () => {
  const ahora = new Date('2026-09-20T12:00:00')
  const inicio = new Date('2026-09-20T08:00:00')
  const lista = [
    { inicio: new Date('2026-09-18T08:00:00'), expira: expiraDe(new Date('2026-09-18T08:00:00')) },
    { inicio, expira: expiraDe(inicio) },
  ]
  const r = resumenDeAsistencia(lista, ahora)
  assert.equal(r.total, 2)
  assert.equal(r.dentro, true)
  assert.equal(r.minutos, 240)
  assert.ok(asistenciaDeHoy(lista, ahora))
})

// ── CAJA ────────────────────────────────────────────────────────────────────

test('el saldo NO resta los pagos de los cargos', () => {
  // Restarlos contaría dos veces: una orden que ya se cobró deja de ser cargo,
  // así que restarle además su pago daría saldo negativo por cada compra.
  const cuenta = estadoDeCuenta({
    pagos: [{ monto: 2500, concepto: 'inscripcion' }, { monto: 900, concepto: 'mensualidad' }],
    cargos: [{ monto: 450 }],
  })
  assert.equal(cuenta.pagado, 3400)
  assert.equal(cuenta.saldo, 450)
})

test('el estado de cuenta DICE lo que no incluye', () => {
  // Un saldo en cero sin esta frase se lee como «está al corriente». Desde el
  // 21-09-2026 una colegiatura SÍ se puede apuntar (los compromisos de pago),
  // así que lo que hay que advertir es otra cosa: que solo cuenta lo apuntado.
  assert.match(estadoDeCuenta({}).alcance, /NO significa que esté al corriente/)
  assert.match(estadoDeCuenta({}).alcance, /no tiene ningún compromiso apuntado/)
  // Y con compromisos, el texto cambia: ahí el saldo sí quiere decir algo.
  const conDeuda = estadoDeCuenta({ adeudos: [{ id: 'a1', total: 300, estado: 'abierto' }] })
  assert.equal(conDeuda.saldo, 300)
  assert.match(conDeuda.alcance, /compromisos de pago/)
})

test('un pago con monto corrupto no rompe la tabla entera', () => {
  assert.equal(totalPagado([{ monto: 100 }, { monto: 'muchos' }, {}]), 100)
  assert.equal(porConcepto([{ monto: 50, concepto: 'material' }])[0].etiqueta, 'Material')
})

test('no se puede cobrar a quien no tiene matrícula', () => {
  // La regla de Firestore exige `matricula is string`: sin este aviso, el
  // servidor devolvería un `permission-denied` que parece un fallo de permisos.
  const cobro = { monto: 100, concepto: 'mensualidad', metodo: 'efectivo' }
  assert.equal(problemasDelCobro(cobro, { matricula: 'RE0000007' }).length, 0)
  assert.match(problemasDelCobro(cobro, { matricula: '' }).join(' '), /matrícula/)
})

test('un dedo de más en el teclado se detecta antes de cobrar', () => {
  const p = problemasDelCobro({ monto: 250000, concepto: 'mensualidad', metodo: 'efectivo' }, { matricula: 'RE0000001' })
  assert.match(p.join(' '), /parece equivocado/)
})

// ── TIENDA ──────────────────────────────────────────────────────────────────

const FERULA = { id: 'a1', nombre: 'Férula de vacío', precio: 450, existencias: 3, activo: true }

test('lo DISPONIBLE descuenta lo que otros ya apartaron', () => {
  // Un artículo prometido no se puede prometer otra vez.
  const abiertas = [{ estado: 'apartado', lineas: [{ articuloId: 'a1', cantidad: 2 }] }]
  assert.equal(disponibleDe(FERULA, abiertas), 1)
  // Lo entregado ya no reserva: salió del estante y del inventario.
  assert.equal(disponibleDe(FERULA, [{ estado: 'entregado', lineas: [{ articuloId: 'a1', cantidad: 2 }] }]), 3)
})

test('añadir dos veces suma en la misma línea', () => {
  let l = agregar([], FERULA, 1)
  l = agregar(l, FERULA, 2)
  assert.equal(l.length, 1)
  assert.equal(l[0].cantidad, 3)
  assert.equal(totalDe(l), 1350)
})

test('poner cantidad 0 quita la línea: es lo que espera quien teclea 0', () => {
  const l = cambiarCantidad(agregar([], FERULA, 2), 'a1', 0)
  assert.equal(l.length, 0)
  assert.equal(quitar(agregar([], FERULA, 1), 'a1').length, 0)
})

test('no se puede apartar más de lo que queda, y se dice cuánto queda', () => {
  const l = agregar([], FERULA, 5)
  const p = problemasDelCarrito(l, { a1: 3 })
  assert.match(p.join(' '), /Solo quedan 3/)
  assert.match(problemasDelCarrito(l, { a1: 0 }).join(' '), /No queda/)
  assert.equal(problemasDelCarrito(l, { a1: 5 }).length, 0)
})

test('el precio se congela en la línea', () => {
  // Si mañana sube, la cuenta que se apartó ayer tiene que seguir valiendo lo
  // que se le dijo a la persona.
  const l = agregar([], FERULA, 1)
  assert.equal(l[0].precio, 450)
})

test('la entrega descuenta la suma por artículo, no línea a línea', () => {
  const orden = { lineas: [{ articuloId: 'a1', cantidad: 2 }, { articuloId: 'a1', cantidad: 1 }] }
  assert.deepEqual(descuentoPorEntrega(orden), { a1: 3 })
})

test('solo lo APARTADO cuenta como adeudo', () => {
  const ordenes = [
    { id: 'o1', estado: 'apartado', total: 450, lineas: [{ articuloId: 'a1', cantidad: 1 }] },
    { id: 'o2', estado: 'pagado', total: 900, lineas: [] },
    { id: 'o3', estado: 'entregado', total: 100, lineas: [] },
  ]
  const cargos = cargosDeOrdenes(ordenes)
  assert.equal(cargos.length, 1)
  assert.equal(cargos[0].monto, 450)
})

// ── MENSAJES ────────────────────────────────────────────────────────────────

test('si falta un dato, el mensaje NO se manda: se dice qué falta', () => {
  // Un «Tu adeudo es de undefined» llega al teléfono de un alumno real.
  const datos = datosDeMensaje({ alumno: ALUMNA, academia: null, saldo: null })
  const r = componer('recordatorio-pago', datos)
  assert.equal(r.texto, '')
  assert.ok(r.faltan.length > 0)
})

test('el recordatorio lleva el nombre de pila y el importe con formato', () => {
  const datos = datosDeMensaje({ alumno: ALUMNA, academia: { nombre: 'R.E.S.C.A.T.E.' }, saldo: 450 })
  const r = componer('recordatorio-pago', datos, { telefono: ALUMNA.telefono })
  assert.match(r.texto, /^Ana,/, 'un mensaje que empieza por los cuatro apellidos no lo lee nadie')
  assert.match(r.texto, /450/)
  assert.match(r.enlace, /^https:\/\/wa\.me\/2222256586\?text=/)
})

test('sin teléfono el mensaje sigue sirviendo: se copia', () => {
  const datos = datosDeMensaje({ alumno: { ...ALUMNA, telefono: '' }, academia: { nombre: 'A' }, saldo: 0 })
  const r = componer('recordatorio-pago', datos, { telefono: '' })
  assert.ok(r.texto.length > 0)
  assert.equal(r.enlace, '', 'no hay a quién abrirle WhatsApp, y eso no es un error')
})

test('las cuatro plantillas pedidas existen y se componen', () => {
  const orden = { total: 450, lineas: [{ articuloId: 'a1', nombre: 'Férula', cantidad: 1 }] }
  const datos = datosDeMensaje({
    alumno: ALUMNA, academia: { nombre: 'A' }, saldo: 0, orden, enlace: 'https://x/y',
  })
  for (const id of ['recordatorio-pago', 'confirmacion-asistencia', 'compra-confirmada', 'recoleccion-lista']) {
    assert.equal(componer(id, datos).faltan.length, 0, `la plantilla ${id} no se pudo componer`)
  }
})

// ── EDICIÓN DE FICHA ────────────────────────────────────────────────────────

test('recepción NO puede tocar rol, estado, academia ni matrícula', () => {
  // La decisión del 20-09-2026, y el motivo: con `rol` el mostrador convertiría
  // a un alumno en profesor, y un profesor lee el temario completo.
  for (const campo of ['rol', 'estado', 'academiaId', 'matricula']) {
    assert.ok(CAMPOS_VETADOS.includes(campo), `${campo} salió de la lista de vetados`)
    assert.equal(parcheSeguro({ [campo]: 'x' }), false)
  }
})

test('el parche lleva SOLO lo que cambió', () => {
  // Mandar el objeto entero haría que `affectedKeys()` contara campos que no
  // se tocaron, y la regla tendría que ser más ancha de lo necesario.
  const parche = parcheDeEdicion(ALUMNA, { ...ALUMNA, telefono: '5512345678' })
  assert.deepEqual(Object.keys(parche), ['telefono'])
  assert.equal(parcheSeguro(parche), true)
})

test('sin cambios no hay parche, y eso no es un error', () => {
  assert.deepEqual(cambiosDe(ALUMNA, ALUMNA), [])
  assert.equal(parcheSeguro({}), false, 'un parche vacío no se manda')
})

test('la ficha no se puede dejar sin grupo: sin grupo no ve contenido', () => {
  // Es el agujero que se cerró en las altas por directorio el 02-09-2026.
  assert.match(problemasDeEdicion({ ...ALUMNA, grupoId: '' }).join(' '), /grupo/)
  assert.match(problemasDeEdicion({ ...ALUMNA, email: 'roto' }).join(' '), /correo/)
  assert.equal(problemasDeEdicion(ALUMNA).length, 0)
})

test('la auditoría guarda el antes Y el después, campo a campo', () => {
  // Un registro que solo diga «editó el perfil» no sirve el día que haga falta.
  const cambios = cambiosDe(ALUMNA, { ...ALUMNA, telefono: '5512345678' })
  const e = entradaDeAuditoria({ alumno: ALUMNA, cambios, academiaId: 'RES-2026' })
  assert.equal(e.accion, 'editar-alumno')
  assert.equal(e.coleccion, 'usuarios')
  assert.equal(e.antes.telefono, '2222256586')
  assert.equal(e.despues.telefono, '5512345678')
  assert.match(e.detalle, /Teléfono/)
})

// ── REPORTE IMPRIMIBLE ──────────────────────────────────────────────────────

const PARA_REPORTE = {
  alumno: ALUMNA,
  academia: { nombre: 'R.E.S.C.A.T.E.', logo: 'https://x/logo.png' },
  grupo: { nombre: 'Matutino 2026', generacion: { numero: 3, anio: 2026 } },
  cuenta: estadoDeCuenta({ pagos: [{ monto: 2500, concepto: 'inscripcion', metodo: 'efectivo' }], cargos: [] }),
  asistencias: [{ inicio: new Date('2026-09-20T08:00:00'), medio: 'manual' }],
  ordenes: [],
  evaluaciones: [],
}

test('lo que NO se marca, NO se imprime', () => {
  // Es la razón de que el documento sea un dato y no un componente: se puede
  // comprobar sin abrir un PDF.
  const doc = construirReporte({
    ...PARA_REPORTE,
    seleccion: { identidad: true, contacto: false, pagos: false, asistencias: false, compras: false, academico: false },
  })
  const ids = doc.bloques.map((b) => b.id)
  assert.deepEqual(ids, ['identidad'])
  assert.equal(JSON.stringify(doc).includes('2,500'), false, 'se coló un importe en un reporte sin pagos')
})

test('lo que SÍ se marca, sale con sus datos', () => {
  const doc = construirReporte({ ...PARA_REPORTE, seleccion: seleccionPorDefecto() })
  const ids = doc.bloques.map((b) => b.id)
  assert.ok(ids.includes('identidad') && ids.includes('contacto') && ids.includes('pagos'))
  const identidad = doc.bloques.find((b) => b.id === 'identidad')
  assert.ok(identidad.pares.some(([, v]) => v === 'RE0000007'))
  assert.ok(identidad.pares.some(([, v]) => /3ª generación/.test(v)))
})

test('el saldo impreso lleva SIEMPRE su alcance al lado', () => {
  const doc = construirReporte({ ...PARA_REPORTE, seleccion: { pagos: true } })
  const resumen = doc.bloques.find((b) => b.id === 'pagos-resumen')
  assert.match(resumen.nota, /NO significa que esté al corriente/,
    'el saldo se imprimió sin la advertencia de qué incluye')
})

test('el logo de la academia viaja en el documento', () => {
  const doc = construirReporte({ ...PARA_REPORTE, seleccion: { identidad: true } })
  assert.equal(doc.academia.logo, 'https://x/logo.png')
})

test('sin logo el reporte sale igual, con el nombre', () => {
  // Un reporte que no sale porque falta un logo es un reporte que se acaba
  // escribiendo a mano.
  const doc = construirReporte({
    ...PARA_REPORTE, academia: { nombre: 'Academia X' }, seleccion: { identidad: true },
  })
  assert.equal(doc.academia.logo, '')
  assert.equal(doc.academia.nombre, 'Academia X')
})

test('no se puede imprimir una hoja sin apartados', () => {
  assert.equal(problemasDelReporte({}).length, 1)
  assert.equal(problemasDelReporte(seleccionPorDefecto()).length, 0)
})

test('una tabla vacía dice por qué, en vez de salir en blanco', () => {
  const doc = construirReporte({ ...PARA_REPORTE, ordenes: [], seleccion: { compras: true } })
  const compras = doc.bloques.find((b) => b.id === 'compras')
  assert.equal(compras.filas.length, 0)
  assert.match(compras.vacio, /Sin compras/)
})

// ── PADRÓN: CUÁNTOS ALUMNOS HAY ─────────────────────────────────────────────

const GRUPOS = [{ id: 'G1', nombre: 'Matutino 2026' }, { id: 'G2', nombre: 'Sabatino 2026' }]
const PERSONAS = [
  { uid: 'a', rol: 'alumno', estado: 'activo', nombre: 'Ana', matricula: 'PR0000001', grupoId: 'G1' },
  { uid: 'b', rol: 'alumno', estado: 'activo', nombre: 'Beto', matricula: 'PR0000002', grupoId: 'G1' },
  { uid: 'c', rol: 'alumno', estado: 'activo', nombre: 'Celia', matricula: '', grupoId: 'G2' },
  { uid: 'd', rol: 'alumno', estado: 'activo', nombre: 'Darío', matricula: 'PR0000004' },
  { uid: 'e', rol: 'alumno', estado: 'eliminado', nombre: 'Eva' },
  { uid: 'p', rol: 'instructor', estado: 'activo', nombre: 'Pablo' },
]

test('el padrón cuenta alumnos ACTIVOS, no personas', async () => {
  const { resumenDePadron } = await import('../src/lib/staff/padronModelo.js')
  const r = resumenDePadron(PERSONAS, GRUPOS)
  assert.equal(r.total, 4, 'se coló un profesor o un dado de baja en el recuento')
  assert.equal(r.suspendidos, 1)
})

test('«sin grupo» y «sin matrícula» son listas de trabajo, no estadística', async () => {
  const { resumenDePadron } = await import('../src/lib/staff/padronModelo.js')
  const r = resumenDePadron(PERSONAS, GRUPOS)
  // Sin grupo: entró y no ve contenido, porque el plan cuelga del grupo.
  assert.deepEqual(r.sinGrupo.map((p) => p.nombre), ['Darío'])
  // Sin matrícula: no se le puede cobrar ni imprimir un estado de cuenta.
  assert.deepEqual(r.sinMatricula.map((p) => p.nombre), ['Celia'])
})

test('el recuento por grupo usa el NOMBRE del grupo, no su id', async () => {
  const { resumenDePadron } = await import('../src/lib/staff/padronModelo.js')
  const r = resumenDePadron(PERSONAS, GRUPOS)
  assert.deepEqual(r.porGrupo, [
    { grupoId: 'G1', nombre: 'Matutino 2026', total: 2 },
    { grupoId: 'G2', nombre: 'Sabatino 2026', total: 1 },
  ])
})

test('quien no tiene matrícula no se amontona al principio', async () => {
  const { ordenarPadron } = await import('../src/lib/staff/padronModelo.js')
  const filas = ordenarPadron(PERSONAS, GRUPOS)
  assert.deepEqual(filas.map((f) => f.nombre), ['Ana', 'Beto', 'Darío', 'Celia'])
})

test('el filtro del padrón ignora acentos y admite «sin grupo»', async () => {
  const { filtrarPadron, ordenarPadron } = await import('../src/lib/staff/padronModelo.js')
  const filas = ordenarPadron(PERSONAS, GRUPOS)
  assert.deepEqual(filtrarPadron(filas, { texto: 'dario' }).map((f) => f.nombre), ['Darío'])
  assert.deepEqual(filtrarPadron(filas, { grupo: '__sin__' }).map((f) => f.nombre), ['Darío'])
  assert.deepEqual(filtrarPadron(filas, { grupo: 'Matutino 2026' }).map((f) => f.nombre), ['Ana', 'Beto'])
})

test('la hoja del padrón imprime SOLO las filas que se le pasan', async () => {
  // Se imprime lo que se ve. Si se imprimiera la lista entera, el botón
  // dejaría de ser de fiar en cuanto alguien lo comprobara una vez.
  const { construirPadron } = await import('../src/lib/staff/reporteModelo.js')
  const doc = construirPadron({
    academia: { nombre: 'A' },
    filas: [{ nombre: 'Darío', matricula: 'PR0000004', grupo: '', email: '', telefono: '' }],
    columnas: { matricula: true, grupo: true, contacto: false },
  })
  const listado = doc.bloques.find((b) => b.id === 'padron')
  assert.equal(listado.filas.length, 1)
  assert.deepEqual(listado.columnas, ['Nombre', 'Matrícula', 'Grupo'])
  assert.equal(JSON.stringify(doc).includes('Ana'), false)
})

test('las columnas de contacto solo salen si se marcan', async () => {
  const { construirPadron } = await import('../src/lib/staff/reporteModelo.js')
  const filas = [{ nombre: 'Ana', matricula: 'PR0000001', grupo: 'G1', email: 'ana@x.mx', telefono: '2222256586' }]
  const sin = construirPadron({ academia: {}, filas, columnas: { matricula: true, grupo: true, contacto: false } })
  assert.equal(JSON.stringify(sin).includes('ana@x.mx'), false)
  const con = construirPadron({ academia: {}, filas, columnas: { matricula: true, grupo: true, contacto: true } })
  assert.ok(JSON.stringify(con).includes('ana@x.mx'))
})

// ── CORTE DE CAJA ───────────────────────────────────────────────────────────

test('el corte agrupa por método: es lo que se cuadra contra el cajón', async () => {
  const { construirCorte } = await import('../src/lib/staff/reporteModelo.js')
  const doc = construirCorte({
    academia: { nombre: 'A' },
    pagos: [
      { id: '1', monto: 2500, metodo: 'efectivo', concepto: 'inscripcion', matricula: 'PR0000001' },
      { id: '2', monto: 900, metodo: 'efectivo', concepto: 'mensualidad', matricula: 'PR0000002' },
      { id: '3', monto: 450, metodo: 'transferencia', concepto: 'material', matricula: 'PR0000001' },
    ],
  })
  const totales = doc.bloques.find((b) => b.id === 'totales')
  assert.ok(totales.pares.some(([, v]) => v.includes('3,850')), 'el total del corte no cuadra')
  const metodos = doc.bloques.find((b) => b.id === 'metodos')
  assert.equal(metodos.filas[0][0], 'Efectivo')
  assert.equal(metodos.filas[0][1], '2')
})

test('el corte avisa de que un cobro no se corrige editándolo', async () => {
  const { construirCorte } = await import('../src/lib/staff/reporteModelo.js')
  const doc = construirCorte({ academia: {}, pagos: [] })
  const detalle = doc.bloques.find((b) => b.id === 'detalle')
  assert.match(detalle.nota, /otro asiento/)
  assert.match(detalle.vacio, /Sin cobros/)
})

test('las tres hojas comparten cabecera y se imprimen con el mismo componente', async () => {
  const { construirCorte, construirPadron, construirReporte } = await import('../src/lib/staff/reporteModelo.js')
  const academia = { nombre: 'Academia X', logo: 'https://x/logo.png' }
  const hojas = [
    construirReporte({ alumno: ALUMNA, academia, seleccion: { identidad: true } }),
    construirPadron({ academia, filas: [] }),
    construirCorte({ academia, pagos: [] }),
  ]
  for (const h of hojas) {
    assert.equal(h.academia.logo, 'https://x/logo.png')
    assert.ok(h.titulo, 'una hoja se quedó sin título')
    assert.ok(h.generado, 'una hoja se quedó sin fecha de generación')
    assert.ok(Array.isArray(h.bloques))
  }
  assert.deepEqual(hojas.map((h) => h.titulo), ['Estado de cuenta', 'Padrón de alumnos', 'Corte de caja'])
})
