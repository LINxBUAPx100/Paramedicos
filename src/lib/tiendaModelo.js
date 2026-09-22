// ============================================================
//  Tienda de la academia — el catálogo y el pedido (lógica PURA)
// ------------------------------------------------------------
//  BORRADOR DEL TRABAJO M, pedido el 20-09-2026. Lo que resuelve hoy, entero y
//  sin depender de Blaze:
//
//    el director (o el super-admin) publica artículos → el alumno los mira y
//    arma su pedido → recepción lo confirma con los precios del catálogo, lo
//    cobra en mostrador y lo entrega descontando inventario.
//
//  Lo que NO resuelve, y hay que decirlo para que nadie lo dé por hecho: pago
//  en línea. La pasarela es el trabajo L y necesita una Cloud Function, o sea
//  Blaze. Aquí se paga en caja, que es lo que la academia hace hoy.
//
//  ── LA DECISIÓN QUE GOBIERNA TODO LO DEMÁS: EL PEDIDO DEL ALUMNO NO LLEVA
//  DINERO NI RESERVA INVENTARIO.
//
//  Un pedido hecho desde el teléfono nace como `solicitado`, con artículos y
//  cantidades y NADA MÁS. Ni precios ni total. Dos motivos, los dos concretos:
//
//   1. **El precio no se puede validar en el servidor.** Las reglas de
//      Firestore no tienen bucles, así que no hay forma de comprobar línea a
//      línea que el precio enviado coincide con el del catálogo. Si el pedido
//      trajera importes, cualquiera podría mandar un total de cero y recepción
//      cobraría eso. Al no traerlos, el precio lo pone SIEMPRE el catálogo en
//      el momento de confirmar.
//   2. **Un pedido sin atender no puede retener existencias.** Si `solicitado`
//      reservara, bastaría con pedir diez férulas y no aparecer para dejar sin
//      material a quien sí viene. Reserva `apartado`, que lo crea una persona
//      del mostrador mirando a quien tiene delante.
//
//  Módulo PURO: sin React y sin Firebase.
// ============================================================

/** Categorías del catálogo. Cerradas a propósito: un catálogo con veinte
 *  categorías escritas a mano deja de poder filtrarse. */
export const CATEGORIAS = [
  { id: 'uniforme', etiqueta: 'Uniformes' },
  { id: 'insumo', etiqueta: 'Insumos y material' },
  { id: 'libro', etiqueta: 'Libros y manuales' },
  { id: 'equipo', etiqueta: 'Equipo' },
  { id: 'tramite', etiqueta: 'Trámites y servicios' },
  { id: 'otro', etiqueta: 'Otros' },
]

const ETIQUETA_CATEGORIA = new Map(CATEGORIAS.map((c) => [c.id, c.etiqueta]))
export const etiquetaCategoria = (id) => ETIQUETA_CATEGORIA.get(id) || 'Otros'
export const esCategoria = (id) => ETIQUETA_CATEGORIA.has(id)

// Topes. No son caprichosos: un precio de siete cifras o un nombre de párrafo
// entero son errores de tecleo, y detectarlos aquí evita que lleguen al
// catálogo que ve el alumno.
export const PRECIO_MAXIMO = 100000
export const EXISTENCIAS_MAXIMAS = 99999
export const LINEAS_MAXIMAS = 20

/** El artículo vacío del formulario. */
export function articuloVacio() {
  return {
    nombre: '',
    descripcion: '',
    categoria: 'insumo',
    precio: '',
    existencias: '',
    imagen: '',
    activo: true,
  }
}

/** Un artículo de Firestore, en forma de formulario. */
export function articuloParaEditar(a) {
  return {
    nombre: String(a?.nombre || ''),
    descripcion: String(a?.descripcion || ''),
    categoria: esCategoria(a?.categoria) ? a.categoria : 'insumo',
    precio: a?.precio === 0 || a?.precio ? String(a.precio) : '',
    existencias: a?.existencias === 0 || a?.existencias ? String(a.existencias) : '',
    imagen: String(a?.imagen || ''),
    activo: a?.activo !== false,
  }
}

/**
 * Qué le falta a un artículo para poder publicarse.
 *
 * Lista de frases, no un booleano: quien está dando de alta veinte artículos
 * necesita saber CUÁL de ellos está mal y por qué.
 */
export function problemasDelArticulo(art) {
  const p = []
  const nombre = String(art?.nombre || '').trim()
  if (!nombre) p.push('Escribe el nombre del artículo.')
  else if (nombre.length > 80) p.push('El nombre no puede pasar de 80 caracteres.')

  if (String(art?.descripcion || '').length > 500) {
    p.push('La descripción no puede pasar de 500 caracteres.')
  }

  const precio = Number(art?.precio)
  if (!Number.isFinite(precio) || precio < 0) p.push('El precio debe ser un número de cero en adelante.')
  else if (precio > PRECIO_MAXIMO) p.push('El precio parece equivocado: revisa las cifras.')

  const existencias = Number(art?.existencias)
  if (!Number.isInteger(existencias) || existencias < 0) {
    p.push('Las existencias deben ser un número entero de cero en adelante.')
  } else if (existencias > EXISTENCIAS_MAXIMAS) {
    p.push('Esas existencias parecen equivocadas: revisa las cifras.')
  }

  if (!esCategoria(art?.categoria)) p.push('Elige una categoría.')

  const imagen = String(art?.imagen || '').trim()
  if (imagen && !imagenValida(imagen)) {
    p.push('La imagen tiene que ser un enlace https, o una imagen subida desde aquí.')
  }
  return p
}

/**
 * ¿Sirve este enlace de imagen?
 *
 * Solo `https://`. Un `javascript:` en un `src` no ejecuta nada por sí mismo,
 * pero esta cadena viaja al catálogo que ven todos los alumnos y no hay ningún
 * motivo para aceptar otro esquema. `data:` tampoco: una imagen incrustada en
 * el documento infla el catálogo entero, que se lee de una vez.
 */
export function imagenValida(url) {
  const u = String(url || '').trim()
  if (!u) return true // vacío es válido: el artículo sale con su marcador
  return /^https:\/\/[^\s]+$/i.test(u)
}

/** El documento listo para guardar. Los números salen ya como números. */
export function articuloParaGuardar(art, { academiaId, creadoPor }) {
  return {
    academiaId,
    nombre: String(art.nombre || '').trim().slice(0, 80),
    descripcion: String(art.descripcion || '').trim().slice(0, 500),
    categoria: esCategoria(art.categoria) ? art.categoria : 'otro',
    precio: Math.round(Number(art.precio) * 100) / 100,
    existencias: Math.trunc(Number(art.existencias)),
    imagen: String(art.imagen || '').trim(),
    // `activo` es lo que decide si el alumno lo ve. Se despublica en vez de
    // borrarse: un artículo borrado se lleva por delante el nombre que aparece
    // en las órdenes que ya lo incluyen.
    activo: art.activo !== false,
    creadoPor: creadoPor || null,
  }
}

// --- EL PEDIDO DEL ALUMNO ---------------------------------------------------

/**
 * Las líneas de un pedido de alumno: artículo y cantidad, SIN PRECIO.
 *
 * Ver la decisión de la cabecera. Quien confirma el pedido reconstruye los
 * importes desde el catálogo.
 */
export function lineasDePedido(carrito) {
  return Object.entries(carrito || {})
    .filter(([, cantidad]) => Number(cantidad) > 0)
    .slice(0, LINEAS_MAXIMAS)
    .map(([articuloId, cantidad]) => ({
      articuloId,
      cantidad: Math.max(1, Math.min(99, Math.trunc(Number(cantidad)))),
    }))
}

/** Qué impide mandar el pedido. */
export function problemasDelPedido(carrito, catalogo = []) {
  const lineas = lineasDePedido(carrito)
  const p = []
  if (!lineas.length) p.push('Tu pedido está vacío.')
  if (Object.keys(carrito || {}).length > LINEAS_MAXIMAS) {
    p.push(`No puedes pedir más de ${LINEAS_MAXIMAS} artículos distintos a la vez.`)
  }
  const porId = new Map((catalogo || []).map((a) => [a.id, a]))
  for (const l of lineas) {
    const art = porId.get(l.articuloId)
    if (!art || art.activo === false) {
      p.push('Uno de los artículos ya no está disponible. Quítalo para continuar.')
      continue
    }
    if (Number(art.existencias) <= 0) p.push(`«${art.nombre}» se agotó.`)
  }
  return p
}

/**
 * El total ORIENTATIVO que se le enseña al alumno.
 *
 * Se llama orientativo y se dice en pantalla porque no es el que se cobra: el
 * que se cobra lo calcula recepción con el catálogo del momento de confirmar.
 * Prometer un importe exacto que después puede cambiar es peor que no darlo.
 */
export function totalOrientativo(carrito, catalogo = []) {
  const porId = new Map((catalogo || []).map((a) => [a.id, a]))
  return lineasDePedido(carrito).reduce((suma, l) => {
    const art = porId.get(l.articuloId)
    return suma + (Number(art?.precio) || 0) * l.cantidad
  }, 0)
}

/**
 * Las líneas de un pedido, con los precios del catálogo puestos AHORA.
 *
 * Es lo que ejecuta recepción al confirmar, y la única vez que un pedido de
 * alumno recibe importes. Devuelve también lo que ya no se puede servir, para
 * que quien confirma lo vea antes de prometerlo.
 */
export function confirmarConCatalogo(lineas, catalogo = []) {
  const porId = new Map((catalogo || []).map((a) => [a.id, a]))
  const servibles = []
  const problemas = []
  for (const l of lineas || []) {
    const art = porId.get(l.articuloId)
    if (!art) {
      problemas.push(`Un artículo del pedido ya no está en el catálogo (${l.articuloId}).`)
      continue
    }
    const cantidad = Math.max(1, Math.trunc(Number(l.cantidad) || 1))
    if (Number(art.existencias) < cantidad) {
      problemas.push(`De «${art.nombre}» quedan ${art.existencias} y pide ${cantidad}.`)
    }
    servibles.push({
      articuloId: art.id,
      nombre: art.nombre,
      precio: Number(art.precio) || 0,
      cantidad,
    })
  }
  return { lineas: servibles, problemas }
}

/** El catálogo agrupado por categoría, en el orden del catálogo de categorías. */
export function porCategoria(articulos) {
  const grupos = CATEGORIAS.map((c) => ({
    ...c,
    articulos: (articulos || []).filter((a) => (esCategoria(a.categoria) ? a.categoria : 'otro') === c.id),
  }))
  return grupos.filter((g) => g.articulos.length > 0)
}
