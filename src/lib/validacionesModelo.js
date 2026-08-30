// ============================================================
//  Validaciones docentes del temario — lógica PURA
// ------------------------------------------------------------
//  QUÉ ARREGLA ESTE ARCHIVO
//
//  Hasta ahora «Validar» no validaba nada. El circuito era: el docente firmaba
//  un dictamen → el dictamen quedaba en cola → la coordinación lo marcaba
//  «aplicado» → y ahí se acababa. NADIE escribía nunca el estado editorial del
//  tema. El botón respondía, el dictamen se guardaba, y el alumno seguía
//  viendo «Contenido en revisión» para siempre; el banco de examen, vacío.
//
//  Ahora la firma se aplica en el acto y se guarda AQUÍ: un documento por
//  academia con el mapa `temaId → ficha de validación`. Se eligió una CAPA
//  APARTE, y no el propio documento del tema, por tres razones concretas:
//
//   1. funciona igual con el temario del paquete (academias sin migrar, y la
//      consola del super-admin) que con el de Firestore: la capa se aplica al
//      leer, venga de donde venga la lección;
//   2. no compite con el editor por la versión del tema, así que validar no
//      choca nunca con quien esté redactando;
//   3. una lectura por sesión: es UN documento, no 287.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================
import { validarRevision, esEstadoEditorial } from './estadoEditorial.js'

// Documento que recoge las validaciones cuando quien revisa no pertenece a
// ninguna academia (el super-admin sobre la plantilla global).
export const DOC_PLATAFORMA = '_plataforma'

// Estados que esta capa puede otorgar. Retirar la firma NO es un estado más:
// es borrar la entrada y devolver el tema a lo que su propio material declara.
export const ESTADOS_VALIDACION = ['validado', 'publicado']

const FECHA = /^\d{4}-\d{2}-\d{2}$/
const texto = (v, max) => typeof v === 'string' && v.trim().length > 0 && v.length <= max
const lista = (v, max) =>
  (Array.isArray(v) ? v : []).filter((x) => texto(x, 600)).map((x) => x.trim()).slice(0, max)

export function docValidacionesDe(academiaId) {
  return academiaId || DOC_PLATAFORMA
}

/**
 * Traza de la firma, para el campo `fuentes` de la ficha editorial.
 *
 * `validarRevision` exige que un tema validado declare al menos una fuente, y
 * esa exigencia se conserva: es la que impide que algo llegue a `validado` sin
 * nada detrás. Lo que cambia es de dónde sale cuando el docente no teclea
 * ninguna: el propio acto de revisión —quién firma, en qué fecha y con qué
 * observaciones— ES la traza, y se escribe con esas palabras para que nadie la
 * confunda con una cita bibliográfica.
 */
export function trazaDeFirma({ revisadoPor, fecha, comentario } = {}) {
  const quien = String(revisadoPor || '').trim().slice(0, 200) || 'docente sin identificar'
  const cuando = FECHA.test(String(fecha || '')) ? String(fecha) : 'fecha no registrada'
  const nota = String(comentario || '').trim().replace(/\s+/g, ' ').slice(0, 300)
  return `Revision docente de ${quien} (${cuando}).${nota ? ` Observaciones: ${nota}` : ''}`
}

/**
 * Lleva una firma a la forma que se guarda. Lanza si la firma no se sostiene:
 * sin nombre no hay responsable, y sin responsable esto no es una validación.
 */
export function normalizarValidacion({
  estado = 'validado', revisadoPor, comentario = '', fuentes = [], fecha,
  uid = null, nombre = '',
} = {}) {
  if (!ESTADOS_VALIDACION.includes(estado)) {
    throw new Error(`Estado de validacion no admitido: "${estado}".`)
  }
  if (!texto(revisadoPor, 200)) {
    throw new Error('Firma con tu nombre o tu cargo: un tema validado necesita responsable.')
  }
  if (!FECHA.test(String(fecha || ''))) {
    throw new Error('Falta la fecha de la validacion (AAAA-MM-DD).')
  }
  const citadas = lista(fuentes, 20)
  return {
    estado,
    revisadoPor: String(revisadoPor).trim().slice(0, 200),
    comentario: String(comentario || '').trim().slice(0, 4000),
    // Si el docente citó fuentes se conservan tal cual; si no, queda la traza
    // de su firma. Nunca vacío: ver trazaDeFirma().
    fuentes: citadas.length > 0 ? citadas : [trazaDeFirma({ revisadoPor, fecha, comentario })],
    fecha: String(fecha),
    uid: uid || null,
    nombre: String(nombre || '').slice(0, 200),
  }
}

// Solo las claves conocidas y bien formadas sobreviven a la lectura. Un
// documento manipulado, o escrito por una versión anterior, no puede colar un
// estado inventado en el temario.
export function normalizarLeido(bruto) {
  const f = bruto && typeof bruto === 'object' && !Array.isArray(bruto) ? bruto : {}
  if (!ESTADOS_VALIDACION.includes(f.estado)) return null
  if (!texto(f.revisadoPor, 200)) return null
  if (!FECHA.test(String(f.fecha || ''))) return null
  return {
    estado: f.estado,
    revisadoPor: String(f.revisadoPor).slice(0, 200),
    comentario: typeof f.comentario === 'string' ? f.comentario.slice(0, 4000) : '',
    fuentes: lista(f.fuentes, 20),
    fecha: String(f.fecha),
    uid: typeof f.uid === 'string' ? f.uid : null,
    nombre: typeof f.nombre === 'string' ? f.nombre.slice(0, 200) : '',
  }
}

/**
 * Une las firmas de la PLATAFORMA con las de una academia.
 *
 * El super-admin firma sobre el temario global (`_plataforma`), que es el que
 * se clona a todas las academias; una academia firma sobre su propia copia.
 * Las dos capas cuentan, y la de la academia manda sobre la global cuando las
 * dos hablan del mismo tema: quien tiene el temario delante y conoce a sus
 * alumnos es quien responde por él.
 *
 * Sin esto, validar como super-admin no se notaba en ninguna academia —la
 * firma se guardaba en un documento que nadie leía— y la única lectura posible
 * era «validé y no pasó nada».
 */
export function combinarValidaciones(plataforma, academia) {
  return { ...(plataforma || {}), ...(academia || {}) }
}

/** Mapa `temaId → validación` ya limpio, a partir del documento de Firestore. */
export function mapaDeValidaciones(documento) {
  const temas = documento && typeof documento === 'object' ? documento.temas : null
  if (!temas || typeof temas !== 'object' || Array.isArray(temas)) return {}
  const salida = {}
  for (const [temaId, bruto] of Object.entries(temas)) {
    const limpia = normalizarLeido(bruto)
    if (limpia) salida[temaId] = limpia
  }
  return salida
}

/**
 * Ficha editorial resultante de aplicar una firma sobre la que el tema ya
 * traía. Conserva observaciones y fuentes previas: validar no borra lo que la
 * redacción dejó dicho de sí misma.
 */
export function fichaConValidacion(revisionPrevia, validacion) {
  const base = revisionPrevia && typeof revisionPrevia === 'object' ? revisionPrevia : {}
  const previas = Array.isArray(base.fuentes) ? base.fuentes : []
  return {
    ...base,
    estado: validacion.estado,
    revisadoPor: validacion.revisadoPor,
    actualizado: validacion.fecha,
    fuentes: [...new Set([...previas, ...validacion.fuentes])],
    ...(validacion.comentario ? { notaRevision: validacion.comentario } : {}),
  }
}

/**
 * Aplica la capa a UNA lección (o a su ficha de listado). Devuelve el mismo
 * objeto si no hay firma para ese tema, para no romper la igualdad referencial
 * de lo que ya estaba en memoria.
 *
 * Se niega a aplicar una firma que produciría una ficha inválida: ascender el
 * estado pasa por `validarRevision` también por este camino.
 */
export function aplicarValidacion(tema, mapa) {
  if (!tema?.id) return tema
  const firma = mapa?.[tema.id]
  if (!firma) return tema
  const revision = fichaConValidacion(tema.revision, firma)
  if (validarRevision(revision)) return tema
  return { ...tema, estadoEditorial: firma.estado, revision }
}

export function aplicarValidaciones(temas, mapa) {
  if (!Array.isArray(temas)) return temas
  if (!mapa || Object.keys(mapa).length === 0) return temas
  return temas.map((t) => aplicarValidacion(t, mapa))
}

/**
 * Envuelve la API de contenido para que TODA lección salga ya con su capa de
 * validación puesta. Un solo sitio: si mañana aparece otra pantalla que lea
 * lecciones, las recibe validadas sin acordarse de nada.
 */
export function apiConValidaciones(api, mapa) {
  if (!api) return api
  if (!mapa || Object.keys(mapa).length === 0) return api
  const conFichas = (fn) => async (...args) => aplicarValidaciones(await fn(...args), mapa)
  return {
    ...api,
    validaciones: mapa,
    getTemaAsync: async (temaId) => aplicarValidacion(await api.getTemaAsync(temaId), mapa),
    fichasDeModuloAsync: conFichas(api.fichasDeModuloAsync),
    todasLasFichasAsync: conFichas(api.todasLasFichasAsync),
  }
}

// ¿El estado declarado de esta lección admite firma? Un tema vacío o detenido
// por la academia no se valida: no hay nada que avalar.
export function sePuedeValidar(estadoEditorial) {
  return esEstadoEditorial(estadoEditorial)
    && estadoEditorial !== 'vacio'
    && estadoEditorial !== 'bloqueado_por_decision'
}
