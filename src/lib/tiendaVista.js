// ============================================================
//  Tienda — buscar, filtrar y ordenar el catálogo (lógica PURA)
// ------------------------------------------------------------
//  QUÉ SE PIDIÓ: que la tienda «funcione como Amazon o Mercado Libre». Lo que
//  eso significa, desmontado en piezas, es esto:
//
//    buscador que perdona · filtros con el número de resultados al lado ·
//    orden por precio · ficha de producto propia · carrito que sobrevive a
//    navegar · y volver atrás sin perder lo que llevabas.
//
//  Este módulo es la primera mitad —lo que decide QUÉ se ve y en qué orden—, y
//  está aquí y no dentro de la pantalla por el mismo motivo de siempre: se
//  puede probar sin navegador, y el rediseño que viene se lleva por delante la
//  pantalla y no esto.
//
//  ── TRES DECISIONES QUE SE NOTAN AL USARLA:
//
//  1. **Los contadores de cada filtro se calculan SIN ese filtro.** Si estás
//     viendo «Uniformes», al lado de «Libros» tiene que decir cuántos libros
//     hay —no cero—. Contarlos con el filtro puesto es el fallo clásico: deja
//     todas las demás opciones en cero y la barra lateral deja de servir.
//  2. **La relevancia prefiere el nombre a la descripción.** Quien busca
//     «férula» quiere la férula, no el manual que la menciona.
//  3. **El buscador perdona acentos y orden de palabras.** «playera institu»
//     encuentra «Playera institucional»; «institucional playera» también.
//
//  Módulo PURO: sin React y sin Firebase.
// ============================================================
import { CATEGORIAS, esCategoria, etiquetaCategoria } from './tiendaModelo.js'

export const ORDENES = [
  { id: 'relevancia', etiqueta: 'Más relevantes' },
  { id: 'precio-asc', etiqueta: 'Menor precio' },
  { id: 'precio-desc', etiqueta: 'Mayor precio' },
  { id: 'nombre', etiqueta: 'Nombre (A–Z)' },
  { id: 'nuevos', etiqueta: 'Más recientes' },
]

const ES_ORDEN = new Set(ORDENES.map((o) => o.id))

export function filtrosVacios() {
  return {
    texto: '',
    categoria: '',
    soloDisponibles: false,
    precioMax: '',
    orden: 'relevancia',
  }
}

/** Texto comparable: sin acentos, sin mayúsculas, sin espacios de más. */
export function normalizar(valor) {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

/** Las palabras de la búsqueda, ya normalizadas y sin vacías. */
export const palabrasDe = (texto) => normalizar(texto).split(' ').filter(Boolean)

/**
 * Cuánto encaja un artículo con lo que se buscó. 0 = no encaja.
 *
 * Cada palabra tiene que aparecer en alguna parte (si falta una, el artículo
 * se descarta): buscar dos palabras y recibir lo que solo cumple una es lo que
 * hace que la gente deje de escribir la segunda.
 *
 * El peso premia el NOMBRE sobre la descripción, y premia empezar por la
 * palabra sobre contenerla: «man» debe subir «Manual» antes que «Pantalón
 * táctico con bolsas para el manual».
 */
export function puntuar(articulo, palabras) {
  if (!palabras.length) return 1
  const nombre = normalizar(articulo?.nombre)
  const descripcion = normalizar(articulo?.descripcion)
  const categoria = normalizar(etiquetaCategoria(articulo?.categoria))
  let total = 0
  for (const p of palabras) {
    let punto = 0
    if (nombre.startsWith(p)) punto = 10
    else if (nombre.includes(` ${p}`)) punto = 8
    else if (nombre.includes(p)) punto = 6
    else if (categoria.includes(p)) punto = 3
    else if (descripcion.includes(p)) punto = 2
    if (!punto) return 0
    total += punto
  }
  return total
}

/** ¿Pasa este artículo los filtros que NO son `salvo`? */
function pasa(articulo, filtros, salvo = null) {
  if (salvo !== 'categoria' && filtros.categoria && articulo.categoria !== filtros.categoria) return false
  if (salvo !== 'soloDisponibles' && filtros.soloDisponibles && Number(articulo.existencias) <= 0) return false
  if (salvo !== 'precioMax') {
    const tope = Number(filtros.precioMax)
    if (Number.isFinite(tope) && String(filtros.precioMax).trim() !== '' && Number(articulo.precio) > tope) return false
  }
  if (salvo !== 'texto' && !puntuar(articulo, palabrasDe(filtros.texto))) return false
  return true
}

/** El catálogo ya filtrado y ordenado. */
export function aplicar(articulos, filtros = filtrosVacios()) {
  const palabras = palabrasDe(filtros.texto)
  const conPuntos = (articulos || [])
    .filter((a) => pasa(a, filtros))
    .map((a) => ({ ...a, _punto: puntuar(a, palabras) }))

  const orden = ES_ORDEN.has(filtros.orden) ? filtros.orden : 'relevancia'
  const porNombre = (a, b) => String(a.nombre || '').localeCompare(String(b.nombre || ''), 'es')
  const segundos = (a) => (typeof a?.creado?.seconds === 'number' ? a.creado.seconds : 0)

  const ordenada = conPuntos.slice().sort((a, b) => {
    if (orden === 'precio-asc') return (a.precio - b.precio) || porNombre(a, b)
    if (orden === 'precio-desc') return (b.precio - a.precio) || porNombre(a, b)
    if (orden === 'nombre') return porNombre(a, b)
    if (orden === 'nuevos') return (segundos(b) - segundos(a)) || porNombre(a, b)
    // RELEVANCIA. Sin búsqueda todos puntúan igual, así que manda el desempate:
    // primero lo que hay en existencia. Ofrecer agotados arriba en una tienda
    // pequeña es la forma más rápida de que parezca que no hay nada.
    const dispA = Number(a.existencias) > 0 ? 1 : 0
    const dispB = Number(b.existencias) > 0 ? 1 : 0
    return (b._punto - a._punto) || (dispB - dispA) || porNombre(a, b)
  })

  return ordenada
}

/**
 * Los contadores de la barra lateral.
 *
 * CADA UNO SE CALCULA SIN SU PROPIO FILTRO (ver la decisión 1 de la cabecera):
 * con «Uniformes» seleccionado, «Libros» sigue diciendo cuántos libros hay.
 */
export function facetas(articulos, filtros = filtrosVacios()) {
  const lista = articulos || []

  const paraCategorias = lista.filter((a) => pasa(a, filtros, 'categoria'))
  const categorias = CATEGORIAS
    .map((c) => ({
      id: c.id,
      etiqueta: c.etiqueta,
      total: paraCategorias.filter((a) => (esCategoria(a.categoria) ? a.categoria : 'otro') === c.id).length,
    }))
    // Una categoría sin nada NO se enseña: un filtro que siempre da cero es
    // ruido en una barra que se lee de un vistazo.
    .filter((c) => c.total > 0)

  const paraDisponibles = lista.filter((a) => pasa(a, filtros, 'soloDisponibles'))
  const precios = lista.filter((a) => pasa(a, filtros, 'precioMax')).map((a) => Number(a.precio) || 0)

  return {
    categorias,
    disponibles: paraDisponibles.filter((a) => Number(a.existencias) > 0).length,
    agotados: paraDisponibles.filter((a) => Number(a.existencias) <= 0).length,
    precioMin: precios.length ? Math.min(...precios) : 0,
    precioMax: precios.length ? Math.max(...precios) : 0,
  }
}

/** ¿Hay algún filtro puesto? El orden NO cuenta: siempre hay uno. */
export function hayFiltros(filtros) {
  return Boolean(
    String(filtros?.texto || '').trim()
    || filtros?.categoria
    || filtros?.soloDisponibles
    || String(filtros?.precioMax || '').trim()
  )
}

/**
 * Las «pastillas» de filtro activo, para poder quitarlas una a una.
 *
 * Es lo que evita el callejón sin salida de toda tienda: cuatro filtros
 * puestos, cero resultados, y ninguna pista de cuál sobra.
 */
export function chips(filtros, { moneda = (n) => `$${n}` } = {}) {
  const lista = []
  const texto = String(filtros?.texto || '').trim()
  if (texto) lista.push({ id: 'texto', etiqueta: `«${texto}»` })
  if (filtros?.categoria) lista.push({ id: 'categoria', etiqueta: etiquetaCategoria(filtros.categoria) })
  if (filtros?.soloDisponibles) lista.push({ id: 'soloDisponibles', etiqueta: 'Solo disponibles' })
  const tope = String(filtros?.precioMax || '').trim()
  if (tope) lista.push({ id: 'precioMax', etiqueta: `Hasta ${moneda(Number(tope))}` })
  return lista
}

/** Quita un filtro por su id, devolviendo unos filtros nuevos. */
export function quitar(filtros, id) {
  const base = { ...filtros }
  if (id === 'texto') base.texto = ''
  if (id === 'categoria') base.categoria = ''
  if (id === 'soloDisponibles') base.soloDisponibles = false
  if (id === 'precioMax') base.precioMax = ''
  return base
}

/** Todo fuera menos el orden, que es una preferencia de lectura y no un filtro. */
export function limpiar(filtros) {
  return { ...filtrosVacios(), orden: filtros?.orden || 'relevancia' }
}

/**
 * Los filtros, leídos y escritos en la URL.
 *
 * ESTO ES LO QUE HACE QUE LA TIENDA SE COMPORTE COMO UNA TIENDA: el botón
 * «atrás» del navegador deshace un filtro en vez de sacarte de la tienda, y
 * una búsqueda se puede pasar por WhatsApp. Sin esto, entrar a un producto y
 * volver te devuelve al catálogo entero, que es el motivo por el que la gente
 * abandona una lista larga.
 */
export function filtrosDesdeParams(params) {
  const p = params instanceof URLSearchParams ? params : new URLSearchParams(params || '')
  const base = filtrosVacios()
  return {
    texto: p.get('q') || base.texto,
    categoria: esCategoria(p.get('cat')) ? p.get('cat') : base.categoria,
    soloDisponibles: p.get('disp') === '1',
    precioMax: p.get('max') || base.precioMax,
    orden: ES_ORDEN.has(p.get('orden')) ? p.get('orden') : base.orden,
  }
}

export function paramsDesdeFiltros(filtros) {
  const p = new URLSearchParams()
  const texto = String(filtros?.texto || '').trim()
  if (texto) p.set('q', texto)
  if (filtros?.categoria) p.set('cat', filtros.categoria)
  if (filtros?.soloDisponibles) p.set('disp', '1')
  const tope = String(filtros?.precioMax || '').trim()
  if (tope) p.set('max', tope)
  // El orden por defecto NO ensucia la URL: un enlace compartido debe ser lo
  // más corto posible, y `orden=relevancia` no aporta nada.
  if (filtros?.orden && filtros.orden !== 'relevancia') p.set('orden', filtros.orden)
  return p
}

/**
 * Qué decirle a quien no encontró nada, y qué ofrecerle para salir.
 *
 * Nunca un «0 resultados» a secas: siempre la vía de vuelta más corta.
 */
export function sinResultados(filtros) {
  const texto = String(filtros?.texto || '').trim()
  if (texto) {
    return {
      titulo: `No hay nada para «${texto}»`,
      texto: 'Prueba con menos palabras, o quita alguno de los filtros.',
      accion: 'texto',
      accionEtiqueta: 'Borrar la búsqueda',
    }
  }
  if (filtros?.categoria) {
    return {
      titulo: `No hay nada en ${etiquetaCategoria(filtros.categoria)}`,
      texto: 'Con los filtros que tienes puestos, esta categoría se queda vacía.',
      accion: 'categoria',
      accionEtiqueta: 'Ver todas las categorías',
    }
  }
  if (filtros?.precioMax) {
    return {
      titulo: 'Nada por debajo de ese precio',
      texto: 'Sube el tope o quítalo para ver el catálogo completo.',
      accion: 'precioMax',
      accionEtiqueta: 'Quitar el tope de precio',
    }
  }
  if (filtros?.soloDisponibles) {
    return {
      titulo: 'Todo lo que queda está agotado',
      texto: 'Puedes verlo igualmente y preguntar en recepción cuándo llega.',
      accion: 'soloDisponibles',
      accionEtiqueta: 'Mostrar también lo agotado',
    }
  }
  return {
    titulo: 'La tienda todavía está vacía',
    texto: 'Cuando tu academia publique uniformes, libros o material, aparecerán aquí.',
    accion: null,
    accionEtiqueta: '',
  }
}

/**
 * Sugerencias del buscador mientras se escribe.
 *
 * Son NOMBRES DE ARTÍCULOS reales, no un histórico: en un catálogo de
 * cincuenta piezas, adivinar lo que existe vale más que recordar lo que se
 * buscó ayer.
 */
export function sugerencias(articulos, texto, tope = 6) {
  const palabras = palabrasDe(texto)
  if (!palabras.length) return []
  return (articulos || [])
    .map((a) => ({ id: a.id, nombre: a.nombre, punto: puntuar(a, palabras) }))
    .filter((s) => s.punto > 0)
    .sort((a, b) => b.punto - a.punto || String(a.nombre).localeCompare(String(b.nombre), 'es'))
    .slice(0, tope)
}
