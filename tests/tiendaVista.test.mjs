// ============================================================
//  Tienda — buscar, filtrar y ordenar
// ------------------------------------------------------------
//  Se pidió que la tienda «funcione como Amazon o Mercado Libre». Lo que de
//  esas dos hay que copiar no es el color: es la mecánica, y la mecánica se
//  puede probar. Aquí están las tres piezas que la sostienen y que se rompen
//  en silencio si alguien las toca sin darse cuenta:
//
//   1. el buscador perdona acentos y orden de palabras;
//   2. los contadores de los filtros se calculan SIN su propio filtro;
//   3. los filtros viajan en la URL, que es lo que hace que «atrás» deshaga un
//      filtro en vez de sacarte de la tienda.
//
//  Módulo PURO: sin red y sin React.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import {
  ORDENES, aplicar, chips, facetas, filtrosDesdeParams, filtrosVacios, hayFiltros,
  limpiar, normalizar, palabrasDe, paramsDesdeFiltros, puntuar, quitar, sinResultados,
  sugerencias,
} from '../src/lib/tiendaVista.js'

const CATALOGO = [
  { id: 'a1', nombre: 'Playera institucional', categoria: 'uniforme', precio: 320, existencias: 24, descripcion: 'Con el logotipo bordado', creado: { seconds: 100 } },
  { id: 'a2', nombre: 'Pantalón táctico', categoria: 'uniforme', precio: 780, existencias: 9, descripcion: 'Refuerzo en rodilla', creado: { seconds: 200 } },
  { id: 'a3', nombre: 'Manual PHTLS', categoria: 'libro', precio: 1450, existencias: 3, descripcion: 'Edición oficial', creado: { seconds: 300 } },
  { id: 'a4', nombre: 'Férula de vacío', categoria: 'equipo', precio: 1890, existencias: 0, descripcion: 'Con bomba manual y su manual de uso', creado: { seconds: 400 } },
  { id: 'a5', nombre: 'Guantes de nitrilo', categoria: 'insumo', precio: 260, existencias: 0, descripcion: 'Caja de 100', creado: { seconds: 500 } },
]

const con = (parcial) => ({ ...filtrosVacios(), ...parcial })
const ids = (lista) => lista.map((a) => a.id)

// ── EL BUSCADOR ─────────────────────────────────────────────────────────────

test('el buscador perdona acentos y orden de palabras', () => {
  // «pantalon tactico» sin acentos tiene que encontrar «Pantalón táctico», y
  // da igual en qué orden se escriban las dos palabras.
  assert.deepEqual(ids(aplicar(CATALOGO, con({ texto: 'pantalon tactico' }))), ['a2'])
  assert.deepEqual(ids(aplicar(CATALOGO, con({ texto: 'tactico pantalon' }))), ['a2'])
  assert.equal(normalizar('  Pérez   Solís '), 'perez solis')
  assert.deepEqual(palabrasDe(' dos  palabras '), ['dos', 'palabras'])
})

test('si falta UNA palabra, el artículo no sale', () => {
  // Buscar dos palabras y recibir lo que solo cumple una es lo que hace que la
  // gente deje de escribir la segunda.
  assert.deepEqual(ids(aplicar(CATALOGO, con({ texto: 'manual phtls' }))), ['a3'])
  assert.deepEqual(ids(aplicar(CATALOGO, con({ texto: 'manual inexistente' }))), [])
})

test('la relevancia prefiere el NOMBRE a la descripción', () => {
  // «manual» está en el nombre de a3 y en la descripción de a4. Quien busca
  // «manual» quiere el manual.
  const r = aplicar(CATALOGO, con({ texto: 'manual' }))
  assert.equal(r[0].id, 'a3', 'un artículo que solo lo menciona quedó por delante del que lo es')
  assert.ok(puntuar(CATALOGO[2], ['manual']) > puntuar(CATALOGO[3], ['manual']))
})

test('empezar por la palabra pesa más que contenerla', () => {
  assert.ok(puntuar({ nombre: 'Manual PHTLS' }, ['man']) > puntuar({ nombre: 'Kit con manual' }, ['man']))
})

test('sin búsqueda, lo disponible va antes que lo agotado', () => {
  // En una tienda pequeña, abrir con agotados arriba parece que no hay nada.
  const r = aplicar(CATALOGO, filtrosVacios())
  const primerosAgotados = r.findIndex((a) => a.existencias === 0)
  const ultimoDisponible = r.map((a) => a.existencias > 0).lastIndexOf(true)
  assert.ok(primerosAgotados > ultimoDisponible, 'un agotado se coló entre los disponibles')
})

test('las sugerencias son artículos que existen', () => {
  const s = sugerencias(CATALOGO, 'pla')
  assert.deepEqual(s.map((x) => x.nombre), ['Playera institucional'])
  assert.deepEqual(sugerencias(CATALOGO, ''), [], 'sin texto no se sugiere nada')
})

// ── ORDEN ───────────────────────────────────────────────────────────────────

test('ordenar por precio, por nombre y por novedad', () => {
  assert.deepEqual(ids(aplicar(CATALOGO, con({ orden: 'precio-asc' }))), ['a5', 'a1', 'a2', 'a3', 'a4'])
  assert.deepEqual(ids(aplicar(CATALOGO, con({ orden: 'precio-desc' }))), ['a4', 'a3', 'a2', 'a1', 'a5'])
  assert.deepEqual(ids(aplicar(CATALOGO, con({ orden: 'nuevos' }))), ['a5', 'a4', 'a3', 'a2', 'a1'])
  assert.equal(aplicar(CATALOGO, con({ orden: 'nombre' }))[0].nombre, 'Férula de vacío')
})

test('un orden inventado cae en relevancia en vez de romper la lista', () => {
  const r = aplicar(CATALOGO, con({ orden: 'por-color' }))
  assert.equal(r.length, CATALOGO.length)
  assert.ok(ORDENES.every((o) => o.id && o.etiqueta))
})

// ── FILTROS ─────────────────────────────────────────────────────────────────

test('categoría, disponibilidad y tope de precio', () => {
  // Sin búsqueda, dos disponibles empatan a relevancia y desempata el nombre:
  // «Pantalón» antes que «Playera».
  assert.deepEqual(ids(aplicar(CATALOGO, con({ categoria: 'uniforme' }))), ['a2', 'a1'])
  assert.deepEqual(ids(aplicar(CATALOGO, con({ soloDisponibles: true, orden: 'precio-asc' }))), ['a1', 'a2', 'a3'])
  assert.deepEqual(ids(aplicar(CATALOGO, con({ precioMax: '400', orden: 'precio-asc' }))), ['a5', 'a1'])
})

test('un tope de precio vacío NO filtra', () => {
  // `Number('')` es 0, y sin la comprobación de cadena vacía el catálogo
  // entero desaparecía en cuanto se tocaba y se soltaba el deslizador.
  assert.equal(aplicar(CATALOGO, con({ precioMax: '' })).length, CATALOGO.length)
})

test('LOS CONTADORES SE CALCULAN SIN SU PROPIO FILTRO', () => {
  // Es la decisión que hace útil la barra lateral. Con «Uniformes» puesto, al
  // lado de «Libros» tiene que seguir diciendo 1, no 0: contarlos con el
  // filtro puesto deja todas las demás opciones en cero.
  const f = facetas(CATALOGO, con({ categoria: 'uniforme' }))
  const libros = f.categorias.find((c) => c.id === 'libro')
  assert.ok(libros, 'la categoría Libros desapareció al filtrar por Uniformes')
  assert.equal(libros.total, 1)
  const uniformes = f.categorias.find((c) => c.id === 'uniforme')
  assert.equal(uniformes.total, 2)
})

test('el contador de disponibles no se cuenta a sí mismo', () => {
  const f = facetas(CATALOGO, con({ soloDisponibles: true }))
  assert.equal(f.disponibles, 3)
  assert.equal(f.agotados, 2, 'con el filtro puesto, los agotados salían a cero')
})

test('una categoría sin nada no se enseña', () => {
  // Un filtro que siempre da cero es ruido en una barra que se lee de un vistazo.
  const f = facetas(CATALOGO, filtrosVacios())
  assert.equal(f.categorias.some((c) => c.total === 0), false)
  assert.equal(f.categorias.some((c) => c.id === 'tramite'), false)
})

test('el rango de precios sale del catálogo', () => {
  const f = facetas(CATALOGO, filtrosVacios())
  assert.equal(f.precioMin, 260)
  assert.equal(f.precioMax, 1890)
})

// ── PASTILLAS Y SALIDA DEL CALLEJÓN ─────────────────────────────────────────

test('las pastillas dicen qué filtros llevas puestos', () => {
  const f = con({ texto: 'férula', categoria: 'equipo', soloDisponibles: true, precioMax: '2000' })
  const lista = chips(f, { moneda: (n) => `$${n}` })
  assert.deepEqual(lista.map((c) => c.id), ['texto', 'categoria', 'soloDisponibles', 'precioMax'])
  assert.match(lista[0].etiqueta, /férula/)
})

test('quitar una pastilla quita SOLO ese filtro', () => {
  const f = con({ texto: 'x', categoria: 'libro', soloDisponibles: true })
  const sinCategoria = quitar(f, 'categoria')
  assert.equal(sinCategoria.categoria, '')
  assert.equal(sinCategoria.texto, 'x', 'quitar la categoría se llevó por delante la búsqueda')
  assert.equal(sinCategoria.soloDisponibles, true)
})

test('limpiar conserva el orden: es una preferencia, no un filtro', () => {
  const f = con({ texto: 'x', categoria: 'libro', orden: 'precio-desc' })
  assert.equal(limpiar(f).orden, 'precio-desc')
  assert.equal(hayFiltros(limpiar(f)), false)
  assert.equal(hayFiltros(con({ orden: 'precio-asc' })), false, 'el orden contó como filtro')
  assert.equal(hayFiltros(con({ texto: 'x' })), true)
})

test('«no hay resultados» siempre ofrece la salida más corta', () => {
  // Nunca un «0 resultados» a secas: con cuatro filtros puestos, adivinar cuál
  // sobra es lo que hace abandonar.
  assert.equal(sinResultados(con({ texto: 'zzz' })).accion, 'texto')
  assert.equal(sinResultados(con({ categoria: 'libro' })).accion, 'categoria')
  assert.equal(sinResultados(con({ precioMax: '1' })).accion, 'precioMax')
  assert.equal(sinResultados(con({ soloDisponibles: true })).accion, 'soloDisponibles')
  // Catálogo vacío de verdad: no hay filtro que quitar, y se dice otra cosa.
  assert.equal(sinResultados(filtrosVacios()).accion, null)
  assert.match(sinResultados(filtrosVacios()).titulo, /vacía/)
})

// ── LOS FILTROS VIAJAN EN LA URL ────────────────────────────────────────────

test('los filtros se leen y se escriben en la URL', () => {
  // ES LO QUE HACE QUE SEA UNA TIENDA: «atrás» deshace un filtro, y una
  // búsqueda se puede pasar por WhatsApp.
  const f = con({ texto: 'férula', categoria: 'equipo', soloDisponibles: true, precioMax: '2000', orden: 'precio-asc' })
  const params = paramsDesdeFiltros(f)
  assert.equal(params.get('q'), 'férula')
  assert.equal(params.get('cat'), 'equipo')
  assert.equal(params.get('disp'), '1')
  assert.equal(params.get('max'), '2000')
  assert.equal(params.get('orden'), 'precio-asc')
  assert.deepEqual(filtrosDesdeParams(params), f)
})

test('el orden por defecto no ensucia la URL', () => {
  const params = paramsDesdeFiltros(con({ texto: 'x', orden: 'relevancia' }))
  assert.equal(params.has('orden'), false, 'un enlace compartido arrastra un parámetro inútil')
  assert.equal(params.toString(), 'q=x')
})

test('una URL manipulada no rompe la tienda', () => {
  // Las direcciones se editan a mano y se comparten cortadas.
  const f = filtrosDesdeParams('cat=inventada&orden=por-color&disp=quizas')
  assert.equal(f.categoria, '', 'una categoría inventada se coló')
  assert.equal(f.orden, 'relevancia')
  assert.equal(f.soloDisponibles, false)
  assert.equal(aplicar(CATALOGO, f).length, CATALOGO.length)
})

// ── EL CARRITO SIGUE SIN LLEVAR DINERO ──────────────────────────────────────

test('el carrito guarda ids y cantidades, nunca precios', () => {
  // La tienda nueva no cambió la defensa: el pedido viaja sin importes y los
  // pone recepción con el catálogo delante. Si esto deja de pasar, el cliente
  // decide lo que se le cobra.
  const CARRITO = readFileSync(new URL('../src/context/CarritoContext.jsx', import.meta.url), 'utf8')
  assert.doesNotMatch(CARRITO, /precio:/, 'se coló un precio en lo que guarda el carrito')
  assert.match(CARRITO, /localStorage/, 'el carrito dejó de sobrevivir a navegar')
  assert.match(CARRITO, /ptem:carrito:/, 'el carrito dejó de separarse por academia')
})
