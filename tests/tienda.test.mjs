// ============================================================
//  Tienda — catálogo, pedido y la línea que separa a los dos
// ------------------------------------------------------------
//  LO QUE ESTA SUITE EXISTE PARA IMPEDIR, dicho antes que nada, porque es un
//  cambio que parece una mejora:
//
//    «el pedido del alumno debería traer ya sus precios y su total, así
//     recepción no tiene que recalcular nada».
//
//  Si eso se hace, cualquiera puede editar el importe antes de enviarlo y
//  recepción cobrará lo que le hayan mandado. Las reglas de Firestore no tienen
//  bucles, así que NO pueden comprobar línea a línea que un precio coincide con
//  el del catálogo: la única defensa posible es que el pedido no traiga dinero.
//  Por eso `total == 0` está en la regla, y por eso se prueba aquí.
//
//  Módulos PUROS: sin red y sin React.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import {
  CATEGORIAS, articuloParaEditar, articuloParaGuardar, articuloVacio,
  confirmarConCatalogo, etiquetaCategoria, imagenValida, lineasDePedido,
  porCategoria, problemasDelArticulo, problemasDelPedido, totalOrientativo,
} from '../src/lib/tiendaModelo.js'
import {
  ESTADOS_ABIERTOS, ESTADOS_PENDIENTES, ESTADOS_RESERVAN, cargosDeOrdenes,
  disponibleDe, etiquetaEstado, ordenParaGuardar,
} from '../src/lib/staff/carritoModelo.js'

const CATALOGO = [
  { id: 'a1', nombre: 'Férula de vacío', precio: 450, existencias: 3, activo: true, categoria: 'equipo' },
  { id: 'a2', nombre: 'Playera institucional', precio: 320, existencias: 10, activo: true, categoria: 'uniforme' },
  { id: 'a3', nombre: 'Manual PHTLS', precio: 900, existencias: 0, activo: true, categoria: 'libro' },
  { id: 'a4', nombre: 'Descatalogado', precio: 100, existencias: 5, activo: false, categoria: 'otro' },
]

// ── EL CATÁLOGO ─────────────────────────────────────────────────────────────

test('un artículo sin nombre o con precio raro no se publica', () => {
  assert.match(problemasDelArticulo({ ...articuloVacio(), precio: 10, existencias: 1 }).join(' '), /nombre/)
  assert.match(problemasDelArticulo({ nombre: 'X', precio: -1, existencias: 1, categoria: 'otro' }).join(' '), /precio/)
  assert.match(problemasDelArticulo({ nombre: 'X', precio: 250000, existencias: 1, categoria: 'otro' }).join(' '), /equivocado/)
  assert.match(problemasDelArticulo({ nombre: 'X', precio: 10, existencias: 1.5, categoria: 'otro' }).join(' '), /entero/)
  assert.equal(problemasDelArticulo({ nombre: 'X', precio: 0, existencias: 0, categoria: 'otro' }).length, 0,
    'un artículo gratis y agotado es válido: un trámite de cero pesos existe')
})

test('la imagen solo puede ser https, o nada', () => {
  // Este catálogo lo ven TODOS los alumnos de la academia a la vez.
  assert.equal(imagenValida(''), true)
  assert.equal(imagenValida('https://ejemplo.mx/x.jpg'), true)
  assert.equal(imagenValida('http://ejemplo.mx/x.jpg'), false)
  assert.equal(imagenValida('javascript:alert(1)'), false)
  // `data:` tampoco: incrustarla infla el catálogo, que se lee entero de golpe.
  assert.equal(imagenValida('data:image/png;base64,AAAA'), false)
})

test('guardar convierte los textos del formulario en números', () => {
  const doc = articuloParaGuardar(
    { nombre: '  Playera  ', precio: '320.5', existencias: '10', categoria: 'uniforme', imagen: ' ', descripcion: 'x' },
    { academiaId: 'ACA', creadoPor: 'dir1' }
  )
  assert.equal(doc.nombre, 'Playera')
  assert.equal(doc.precio, 320.5)
  assert.equal(doc.existencias, 10)
  assert.equal(doc.imagen, '')
  assert.equal(doc.activo, true, 'un artículo nuevo nace publicado')
})

test('una categoría inventada cae en «Otros» en vez de romper el filtro', () => {
  const doc = articuloParaGuardar({ nombre: 'X', precio: 1, existencias: 1, categoria: 'inventada' }, { academiaId: 'A' })
  assert.equal(doc.categoria, 'otro')
  assert.equal(etiquetaCategoria('inventada'), 'Otros')
  assert.ok(CATEGORIAS.every((c) => c.id && c.etiqueta))
})

test('editar un artículo devuelve exactamente lo que hay, sin inventar', () => {
  const f = articuloParaEditar({ nombre: 'X', precio: 0, existencias: 0 })
  assert.equal(f.precio, '0', 'un precio de cero se perdía si se comprobaba con un booleano')
  assert.equal(f.existencias, '0')
  assert.equal(f.activo, true)
})

test('el catálogo se agrupa en el orden de las categorías, sin secciones vacías', () => {
  const grupos = porCategoria(CATALOGO)
  assert.deepEqual(grupos.map((g) => g.id), ['uniforme', 'libro', 'equipo', 'otro'])
  assert.equal(grupos.every((g) => g.articulos.length > 0), true)
})

// ── EL PEDIDO DEL ALUMNO ────────────────────────────────────────────────────

test('el pedido del alumno NO lleva precios: solo artículo y cantidad', () => {
  // ES LA DEFENSA ENTERA. Si esta prueba deja de pasar, el importe lo decide
  // el cliente y recepción cobra lo que le manden.
  const lineas = lineasDePedido({ a1: 2, a2: 1 })
  assert.deepEqual(lineas, [
    { articuloId: 'a1', cantidad: 2 },
    { articuloId: 'a2', cantidad: 1 },
  ])
  for (const l of lineas) {
    assert.equal('precio' in l, false, 'se coló un precio en el pedido del alumno')
    assert.equal('total' in l, false)
  }
})

test('una cantidad de cero o negativa no viaja', () => {
  assert.deepEqual(lineasDePedido({ a1: 0, a2: -3, a3: 1 }), [{ articuloId: 'a3', cantidad: 1 }])
})

test('no se puede pedir lo agotado ni lo despublicado', () => {
  assert.match(problemasDelPedido({ a3: 1 }, CATALOGO).join(' '), /se agotó/)
  assert.match(problemasDelPedido({ a4: 1 }, CATALOGO).join(' '), /ya no está disponible/)
  assert.match(problemasDelPedido({}, CATALOGO).join(' '), /vacío/)
  assert.equal(problemasDelPedido({ a1: 2 }, CATALOGO).length, 0)
})

test('el total que ve el alumno es ORIENTATIVO y se calcula con el catálogo', () => {
  assert.equal(totalOrientativo({ a1: 2, a2: 1 }, CATALOGO), 1220)
  // Sin catálogo no se inventa un importe.
  assert.equal(totalOrientativo({ a1: 2 }, []), 0)
})

// ── LA CONFIRMACIÓN, QUE ES DONDE ENTRA EL DINERO ───────────────────────────

test('confirmar pone los precios del CATÁLOGO, no los del pedido', () => {
  // Aunque el pedido llegara con precios (un cliente modificado), se ignoran.
  const { lineas, problemas } = confirmarConCatalogo(
    [{ articuloId: 'a1', cantidad: 2, precio: 1, nombre: 'Gratis total' }],
    CATALOGO
  )
  assert.equal(lineas[0].precio, 450, 'se respetó un precio enviado por el cliente')
  assert.equal(lineas[0].nombre, 'Férula de vacío')
  assert.equal(problemas.length, 0)
})

test('confirmar avisa de lo que ya no alcanza, sin negarse en redondo', () => {
  // En un mostrador se pacta («te lo aparto y te llega el jueves»), así que el
  // aviso es informativo y la decisión es de quien atiende.
  const { lineas, problemas } = confirmarConCatalogo([{ articuloId: 'a1', cantidad: 9 }], CATALOGO)
  assert.equal(lineas.length, 1)
  assert.match(problemas.join(' '), /quedan 3 y pide 9/)
})

test('un artículo que desapareció del catálogo se reporta y no se sirve', () => {
  const { lineas, problemas } = confirmarConCatalogo([{ articuloId: 'fantasma', cantidad: 1 }], CATALOGO)
  assert.equal(lineas.length, 0)
  assert.match(problemas.join(' '), /ya no está en el catálogo/)
})

// ── LOS ESTADOS ─────────────────────────────────────────────────────────────

test('`solicitado` no reserva inventario ni cuenta como deuda', () => {
  // Si reservara, bastaría con pedir diez férulas desde el teléfono y no
  // aparecer para dejar sin material a quien sí viene. Y si contara como deuda,
  // se le apuntaría un adeudo por algo que nadie le ha confirmado.
  assert.equal(ESTADOS_RESERVAN.includes('solicitado'), false)
  assert.equal(ESTADOS_PENDIENTES.includes('solicitado'), false)
  assert.equal(ESTADOS_ABIERTOS.includes('solicitado'), true,
    'debe seguir apareciendo en la bandeja del mostrador')

  const pedido = [{ estado: 'solicitado', lineas: [{ articuloId: 'a1', cantidad: 3 }] }]
  assert.equal(disponibleDe(CATALOGO[0], pedido), 3, 'un pedido sin confirmar retuvo existencias')
  assert.equal(cargosDeOrdenes([{ id: 'o', estado: 'solicitado', total: 450, lineas: [] }]).length, 0)
})

test('apartado sí reserva y sí es deuda', () => {
  const apartado = [{ estado: 'apartado', lineas: [{ articuloId: 'a1', cantidad: 2 }] }]
  assert.equal(disponibleDe(CATALOGO[0], apartado), 1)
  assert.equal(cargosDeOrdenes([{ id: 'o', estado: 'apartado', total: 450, lineas: [] }]).length, 1)
  assert.equal(etiquetaEstado('solicitado'), 'Pedido del alumno')
})

// ── EL PEDIDO SE TIENE QUE PODER ATENDER ────────────────────────────────────
//
//  Lo que estas tres pruebas impiden que vuelva: un pedido visible en la
//  bandeja de recepción que NO APARECÍA en la ficha de quien lo hizo, así que
//  no se podía confirmar desde ninguna pantalla. La causa era que la ficha
//  buscaba las órdenes por MATRÍCULA y el pedido del alumno se guarda con
//  `matricula: null` mientras esa persona no tenga una.

const PUERTO_TIENDA = readFileSync(new URL('../src/lib/firebase/staff/tienda.js', import.meta.url), 'utf8')
const FICHA = readFileSync(new URL('../src/context/FichaStaffContext.jsx', import.meta.url), 'utf8')

test('las cuentas de una persona se buscan por uid, no solo por matrícula', () => {
  assert.match(PUERTO_TIENDA, /export async function ordenesDe\(\{ uid,/,
    'ordenesDe volvió a pedir solo la matrícula: quien no la tenga no podría recibir su pedido')
  assert.match(PUERTO_TIENDA, /filtros\.push\(where\('uid', '==', uid\)\)/)
  // Y la matrícula solo se consulta si existe: un `where('matricula','==','')`
  // devolvería las órdenes de todos los demás que tampoco la tienen.
  assert.match(PUERTO_TIENDA, /where\('matricula', '==', claves\[0\]\)/)
  assert.match(PUERTO_TIENDA, /where\('matricula', 'in', claves\)/,
    'dejó de buscar por las matrículas anteriores: cambiar de grupo la rehace')
})

test('la ficha del mostrador le pasa el uid al buscar sus órdenes', () => {
  assert.match(FICHA, /ordenesDe\(\{ uid, matriculas: matriculasDe\(persona\), academiaId \}\)/,
    'la ficha dejó de buscar las órdenes por uid')
})

test('una orden de mostrador nunca lleva la matrícula en null', () => {
  // La regla de `ordenes` exige `matricula is string` al crear desde el
  // mostrador: con `null`, apartarle material a alguien sin matrícula se
  // deniega por permisos y en pantalla no se entiende por qué.
  const sinMatricula = ordenParaGuardar({
    lineas: [{ articuloId: 'a1', nombre: 'Férula', precio: 450, cantidad: 1 }],
    alumno: { uid: 'u1', nombre: 'Sin matrícula' },
    academiaId: 'ACA',
    registradoPor: 'r1',
  })
  assert.equal(typeof sinMatricula.matricula, 'string')
  assert.equal(sinMatricula.uid, 'u1', 'el uid es lo que identifica a la persona')
})

// ── LAS REGLAS LO IMPONEN EN EL SERVIDOR ────────────────────────────────────

const REGLAS = readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8')
const bloque = (c) => {
  const i = REGLAS.indexOf(`match /${c}/`)
  assert.notEqual(i, -1, `no hay reglas para ${c}`)
  return REGLAS.slice(i, REGLAS.indexOf('\n    }', i))
}

test('la regla exige que el pedido del alumno venga en CERO', () => {
  const b = bloque('ordenes')
  assert.match(b, /request\.resource\.data\.estado == 'solicitado'/)
  assert.match(b, /request\.resource\.data\.total == 0/,
    'sin esto, el alumno decide cuánto se le cobra')
  assert.match(b, /request\.resource\.data\.uid == request\.auth\.uid/)
})

test('el alumno solo puede CANCELAR lo suyo, y solo sin confirmar', () => {
  const b = bloque('ordenes')
  assert.match(b, /allow update: if esDueno\(resource\.data\.uid\)[\s\S]*estado == 'cancelado'/)
  assert.match(b, /esDueno\(resource\.data\.uid\)[\s\S]*resource\.data\.estado == 'solicitado'/)
})

test('solo la DIRECCIÓN publica en el catálogo, y con la forma comprobada', () => {
  const b = bloque('articulos')
  assert.match(b, /allow create: if \(esSuper\(\) \|\| esAdminDe\(request\.resource\.data\.academiaId\)\)/)
  assert.match(b, /articuloFormaValida\(\)/)
  assert.match(REGLAS, /function articuloFormaValida\(\)/)
  assert.match(REGLAS, /imagen\.matches\('\^https:\/\/\.\*'\)/,
    'la regla dejó de acotar el esquema de la imagen')
})
