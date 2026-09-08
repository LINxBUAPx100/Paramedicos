// ============================================================
//  Mi Botiquín — modelo puro y ampliable
// ------------------------------------------------------------
//  No importa React ni Firebase. El catálogo se valida aquí antes de llegar
//  a la escena 3D o a una futura copia por academia en Firestore.
// ============================================================

export const COMPARTIMENTOS_BOTIQUIN = [
  {
    id: 'viaAerea',
    nombre: 'Vía aérea',
    corto: 'Vía aérea',
    color: '#0ea5e9',
    descripcion: 'Dispositivos para mantener una vía aérea permeable y apoyar la ventilación.',
  },
  {
    id: 'circulacion',
    nombre: 'Circulación y hemorragias',
    corto: 'Circulación',
    color: '#e11d2a',
    descripcion: 'Material para control de hemorragias y acceso vascular.',
  },
  {
    id: 'inmovilizacion',
    nombre: 'Inmovilización',
    corto: 'Inmovilización',
    color: '#f59e0b',
    descripcion: 'Material para soporte, vendaje e inmovilización.',
  },
  {
    id: 'curacion',
    nombre: 'Curación',
    corto: 'Curación',
    color: '#10b981',
    descripcion: 'Apósitos, gasas, soluciones y consumibles para curación.',
  },
  {
    id: 'medicamentos',
    nombre: 'Medicamentos',
    corto: 'Fármacos',
    color: '#8b5cf6',
    descripcion: 'Presentaciones farmacológicas registradas y revisadas por la academia.',
  },
  {
    id: 'monitoreo',
    nombre: 'Monitoreo y valoración',
    corto: 'Monitoreo',
    color: '#06b6d4',
    descripcion: 'Equipo para valoración, exploración y toma de signos.',
  },
  {
    id: 'proteccion',
    nombre: 'Protección e higiene',
    corto: 'Protección',
    color: '#64748b',
    descripcion: 'Barreras, higiene de manos y protección personal.',
  },
  {
    id: 'otros',
    nombre: 'Instrumental y otros',
    corto: 'Otros',
    color: '#f97316',
    descripcion: 'Instrumental auxiliar y material de apoyo general.',
  },
]

export const CATEGORIAS_BOTIQUIN = [
  'dispositivo',
  'insumo',
  'medicamento',
  'equipo',
  'proteccion',
  'instrumental',
  'familia',
]

export const RIESGOS_BOTIQUIN = ['identificacion', 'tecnica', 'invasivo', 'farmacologia']
export const CADUCIDADES_BOTIQUIN = ['no_aplica', 'revisar_fecha', 'esteril_sellado', 'por_definir']
export const PRESETS_VISUALES_BOTIQUIN = [
  'botella', 'frasco', 'sobre', 'paquete', 'rollo', 'caja', 'guantes', 'cubrebocas',
  'baumanometro', 'estetoscopio', 'cabestrillo', 'compresa', 'ferula', 'termometro',
  'jeringa', 'canulas', 'lampara', 'mascarillaRcp', 'pinzaKelly', 'manta', 'tijera',
  'bvm', 'torniquete', 'selloToracico', 'canulaNasal', 'supraglotico', 'cateteres',
  'normogotero', 'cintaCanalizar', 'farmacologia', 'generico',
]

const IDS_COMPARTIMENTOS = new Set(COMPARTIMENTOS_BOTIQUIN.map((item) => item.id))
const IDS_CATEGORIAS = new Set(CATEGORIAS_BOTIQUIN)
const IDS_RIESGOS = new Set(RIESGOS_BOTIQUIN)
const IDS_CADUCIDAD = new Set(CADUCIDADES_BOTIQUIN)
const IDS_PRESET = new Set(PRESETS_VISUALES_BOTIQUIN)
const ID_VALIDO = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function normalizarTextoBotiquin(valor) {
  return String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function compartimentoBotiquin(id) {
  return COMPARTIMENTOS_BOTIQUIN.find((item) => item.id === id) || COMPARTIMENTOS_BOTIQUIN.at(-1)
}

export function cantidadTotalArticulo(articulo) {
  if (Number.isFinite(articulo?.cantidad) && articulo.cantidad >= 0) return articulo.cantidad
  const variantes = Array.isArray(articulo?.variantes) ? articulo.variantes : []
  if (!variantes.length) return null
  const cantidades = variantes.map((item) => item?.cantidad)
  if (cantidades.some((cantidad) => !Number.isFinite(cantidad) || cantidad < 0)) return null
  return cantidades.reduce((total, cantidad) => total + cantidad, 0)
}

export function etiquetaCantidadArticulo(articulo) {
  const cantidad = cantidadTotalArticulo(articulo)
  if (cantidad == null) return 'Cantidad por confirmar'
  const unidad = String(articulo?.unidad || '').trim()
  return `${cantidad}${unidad ? ` ${cantidad === 1 ? unidad : articulo.unidadPlural || unidad}` : ''}`
}

export function terminosArticulo(articulo) {
  return normalizarTextoBotiquin([
    articulo?.id,
    articulo?.nombre,
    articulo?.presentacion,
    articulo?.compartimento,
    articulo?.categoria,
    ...(Array.isArray(articulo?.alias) ? articulo.alias : []),
    ...(Array.isArray(articulo?.variantes)
      ? articulo.variantes.flatMap((item) => [item?.id, item?.nombre, item?.presentacion, item?.calibre, item?.medida])
      : []),
  ].filter(Boolean).join(' '))
}

function listaDeTextos(valor, max = 12) {
  return Array.isArray(valor)
    && valor.length <= max
    && valor.every((item) => typeof item === 'string' && item.trim().length > 0 && item.length <= 500)
}

export function problemasDeArticulo(articulo, indice = 0) {
  const prefijo = `Artículo ${indice + 1}`
  const problemas = []
  if (!articulo || typeof articulo !== 'object' || Array.isArray(articulo)) {
    return [`${prefijo}: debe ser un objeto.`]
  }
  if (!ID_VALIDO.test(String(articulo.id || ''))) problemas.push(`${prefijo}: id inválido.`)
  if (typeof articulo.nombre !== 'string' || !articulo.nombre.trim()) problemas.push(`${prefijo}: falta nombre.`)
  if (!IDS_COMPARTIMENTOS.has(articulo.compartimento)) problemas.push(`${prefijo}: compartimento desconocido.`)
  if (!IDS_CATEGORIAS.has(articulo.categoria)) problemas.push(`${prefijo}: categoría desconocida.`)
  if (!IDS_RIESGOS.has(articulo.nivelRiesgo)) problemas.push(`${prefijo}: nivel de riesgo desconocido.`)
  if (!IDS_CADUCIDAD.has(articulo.caducidad)) problemas.push(`${prefijo}: caducidad desconocida.`)
  if (articulo.cantidad != null && (!Number.isFinite(articulo.cantidad) || articulo.cantidad < 0)) {
    problemas.push(`${prefijo}: cantidad inválida.`)
  }
  if (articulo.variantes != null && !Array.isArray(articulo.variantes)) {
    problemas.push(`${prefijo}: variantes debe ser un arreglo.`)
  }
  if (Array.isArray(articulo.variantes)) {
    const ids = new Set()
    articulo.variantes.forEach((variante, i) => {
      if (!variante || typeof variante !== 'object') problemas.push(`${prefijo}: variante ${i + 1} inválida.`)
      else {
        if (!variante.id || ids.has(variante.id)) problemas.push(`${prefijo}: variante ${i + 1} sin id único.`)
        ids.add(variante.id)
        if (variante.cantidad != null && (!Number.isFinite(variante.cantidad) || variante.cantidad < 0)) {
          problemas.push(`${prefijo}: variante ${i + 1} con cantidad inválida.`)
        }
      }
    })
  }
  for (const campo of ['comoSeReconoce', 'seConfundeCon', 'comoSeRevisa', 'erroresFrecuentes']) {
    if (!listaDeTextos(articulo[campo] || [], 16)) problemas.push(`${prefijo}: ${campo} debe ser una lista breve de textos.`)
  }
  if (typeof articulo.resumen !== 'string' || !articulo.resumen.trim() || articulo.resumen.length > 800) {
    problemas.push(`${prefijo}: resumen ausente o demasiado largo.`)
  }
  if (!articulo.visual || !IDS_PRESET.has(articulo.visual.preset)) {
    problemas.push(`${prefijo}: preset visual desconocido.`)
  }
  if (articulo.temaId != null && typeof articulo.temaId !== 'string') problemas.push(`${prefijo}: temaId inválido.`)
  if (articulo.desbloqueaCon != null) {
    const d = articulo.desbloqueaCon
    if (!d || typeof d !== 'object' || typeof d.moduloId !== 'string' || typeof d.temaId !== 'string') {
      problemas.push(`${prefijo}: desbloqueaCon inválido.`)
    }
  }
  return problemas
}

export function problemasDelCatalogoBotiquin(catalogo) {
  if (!Array.isArray(catalogo)) return ['El catálogo debe ser un arreglo.']
  const problemas = catalogo.flatMap((articulo, indice) => problemasDeArticulo(articulo, indice))
  const ids = new Set()
  for (const articulo of catalogo) {
    if (!articulo?.id) continue
    if (ids.has(articulo.id)) problemas.push(`Id repetido: ${articulo.id}.`)
    ids.add(articulo.id)
  }
  return problemas
}

export function catalogoPorCompartimento(catalogo) {
  const salida = Object.fromEntries(COMPARTIMENTOS_BOTIQUIN.map((item) => [item.id, []]))
  for (const articulo of Array.isArray(catalogo) ? catalogo : []) {
    if (salida[articulo.compartimento]) salida[articulo.compartimento].push(articulo)
  }
  return salida
}

/**
 * Permite que una academia amplíe o ajuste su copia sin cambiar la escena.
 * Una entrada con el mismo id reemplaza campos concretos; una nueva se añade.
 */
export function combinarCatalogosBotiquin(base, extensiones = []) {
  const porId = new Map((Array.isArray(base) ? base : []).map((item) => [item.id, { ...item }]))
  for (const extension of Array.isArray(extensiones) ? extensiones : []) {
    if (!extension?.id) continue
    const previo = porId.get(extension.id)
    porId.set(extension.id, previo ? {
      ...previo,
      ...extension,
      visual: { ...(previo.visual || {}), ...(extension.visual || {}) },
      variantes: extension.variantes ?? previo.variantes,
    } : { ...extension })
  }
  return [...porId.values()]
}

export function filtrarCatalogoBotiquin(catalogo, {
  consulta = '', compartimento = 'todos', estado = 'todos', estados = {},
} = {}) {
  const termino = normalizarTextoBotiquin(consulta)
  return (Array.isArray(catalogo) ? catalogo : []).filter((articulo) => {
    if (compartimento !== 'todos' && articulo.compartimento !== compartimento) return false
    if (estado !== 'todos' && estados[articulo.id]?.estado !== estado) return false
    return !termino || terminosArticulo(articulo).includes(termino)
  })
}
