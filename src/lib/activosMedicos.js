// ============================================================
//  Activos médicos — acceso desde la aplicación
// ------------------------------------------------------------
//  Punto único por el que la interfaz pregunta por una imagen médica. Lo que
//  resuelve, y por qué está aquí y no repartido por los componentes:
//
//   · UNA SOLA VERDAD. `src/data/activosMedicos.js` lo genera el pipeline y
//     nadie lo edita a mano. Todo lo que la web sabe de una imagen —dónde está
//     el archivo, quién la hizo, qué licencia tiene, qué se cambió— sale de
//     ahí. Si un assetId no existe, estas funciones devuelven null y el
//     componente pinta el estado «no disponible»: nunca una URL inventada.
//
//   · LA RUTA SE RESUELVE UNA VEZ. El archivo se guarda como ruta relativa
//     («imagenes/medical/…») y `rutaImagen` de lib/img.js le pone el BASE_URL
//     que toque. Así el día que el material se sirva desde un CDN no hay que
//     tocar 228 fichas.
//
//   · EL CRÉDITO VIAJA CON LA IMAGEN. `creditoDe` devuelve lo que el panel
//     «Créditos» necesita, incluida la lista de componentes de una composición:
//     atribuir una figura de cinco autores a uno solo sería incumplir la
//     licencia de los otros cuatro.
// ============================================================
import {
  ACTIVOS_MEDICOS, ACTIVOS_POR_TEMA, ICONO_POR_TEMA, ICONO_POR_MODULO,
  BIOICONS_COMMIT, SMART_RECUPERADO, PRESUPUESTO_ICONO,
} from '../data/activosMedicos.js'
import { rutaImagen } from './img.js'
import { LICENCIAS, NOMBRE_PROVEEDOR, URL_PROVEEDOR } from './licenciasActivos.js'

export { BIOICONS_COMMIT, SMART_RECUPERADO, PRESUPUESTO_ICONO }

const POR_ID = new Map(ACTIVOS_MEDICOS.map((a) => [a.id, a]))

// Directorios donde puede vivir una imagen médica. Cualquier ruta fuera de
// aquí se rechaza: es la misma frontera que aplica el validador del editor.
export const DIRECTORIOS_IMAGEN = ['imagenes/medical/', 'imagenes/temario/', 'imagenes/m1/', 'imagenes/m2/', 'imagenes/m3/', 'imagenes/m4/', 'imagenes/m5/', 'imagenes/m6/', 'imagenes/m7/']

export function activo(id) {
  return POR_ID.get(String(id || '')) || null
}

export function existeActivo(id) {
  return POR_ID.has(String(id || ''))
}

export const todosLosActivos = ACTIVOS_MEDICOS

// URL lista para `<img src>`. Devuelve '' si el activo no existe, para que el
// componente pinte el hueco declarado en vez de pedir un archivo inexistente.
export function srcDeActivo(id) {
  const a = activo(id)
  return a ? rutaImagen(a.filePath) : ''
}

// Los activos de un tema, en el orden de pertinencia que fijó la curación.
export function activosDeTema(temaId) {
  return (ACTIVOS_POR_TEMA[temaId] || []).map(activo).filter(Boolean)
}

// El activo canónico de un tema: el que encabeza su galería y hace de tarjeta
// en Logros.
export function activoCanonicoDeTema(temaId) {
  return activosDeTema(temaId)[0] || null
}

// El activo que hace de ICONO. Puede no ser el canónico: una composición de
// 400 KB es una gran figura y un icono horrible, así que el pipeline elige
// para este papel uno que entre en el presupuesto de peso.
export function iconoDeTema(temaId) {
  return activo(ICONO_POR_TEMA[temaId])
}

export function iconoDeModulo(moduloId) {
  return activo(ICONO_POR_MODULO[moduloId])
}

// ¿Este identificador es un activo válido? Es lo que comprueban las pruebas
// sobre los campos `icono` del contenido: ahí ya no puede haber un emoji.
export function esIdentificadorDeActivo(valor) {
  const s = String(valor || '')
  return /^[a-z0-9][a-z0-9-]{2,63}$/.test(s) && POR_ID.has(s)
}

// ------------------------------------------------------------
//  Créditos
// ------------------------------------------------------------
//  Devuelve todo lo que el panel «Créditos» y la página /creditos necesitan
//  mostrar, ya resuelto: nada de que cada componente vuelva a decidir si esta
//  licencia exige atribución.
export function creditoDe(id) {
  const a = activo(id)
  if (!a) return null
  const lic = LICENCIAS[a.license.id] || a.license
  const componentes = (a.componentes || []).map(activo).filter(Boolean)
  return {
    id: a.id,
    titulo: a.title,
    tipo: a.kind,
    autor: a.originalCreator.name,
    autorUrl: a.originalCreator.url || '',
    proveedor: NOMBRE_PROVEEDOR[a.catalogProvider] || a.catalogProvider,
    proveedorUrl: URL_PROVEEDOR[a.catalogProvider] || '',
    licencia: { id: lic.id, nombre: lic.name, url: lic.url || '' },
    exigeAtribucion: Boolean(a.license.attributionRequired),
    compartirIgual: Boolean(a.license.shareAlike),
    fuenteUrl: a.origin.sourcePageUrl || a.origin.rawFileUrl || '',
    archivoUrl: a.origin.rawFileUrl || '',
    commit: a.origin.upstreamCommit || '',
    recuperadoEl: a.origin.retrievedAt || '',
    sha256: a.origin.sha256,
    cambios: a.attribution.changes || [],
    textoCopiable: a.attribution.displayText,
    // Cada componente con su propio crédito. Una composición sin esto
    // parecería obra de un único autor.
    componentes: componentes.map((c) => ({
      id: c.id,
      titulo: c.title,
      autor: c.originalCreator.name,
      autorUrl: c.originalCreator.url || '',
      proveedor: NOMBRE_PROVEEDOR[c.catalogProvider] || c.catalogProvider,
      licencia: { id: c.license.id, nombre: c.license.name, url: c.license.url || '' },
      exigeAtribucion: Boolean(c.license.attributionRequired),
    })),
  }
}

// ¿Hay que mostrar el control «Créditos» junto a la figura? Sí cuando la
// licencia lo exige, o cuando la figura es una composición cuyos componentes lo
// exigen. Un CC0 no lo exige, pero su procedencia sigue en /creditos.
export function requiereCreditoVisible(id) {
  const a = activo(id)
  if (!a) return false
  if (a.license.attributionRequired) return true
  return (a.componentes || []).some((c) => activo(c)?.license.attributionRequired)
}

// Los activos REALMENTE usados en el temario, agrupados para la página global
// de créditos: por licencia primero, y dentro por autor, que es el orden en el
// que se leen las obligaciones.
export function activosEnUso() {
  const usados = new Set()
  for (const lista of Object.values(ACTIVOS_POR_TEMA)) for (const id of lista) usados.add(id)
  for (const id of Object.values(ICONO_POR_TEMA)) usados.add(id)
  for (const id of Object.values(ICONO_POR_MODULO)) usados.add(id)
  // Los componentes de una composición se usan aunque no aparezcan en el mapa:
  // están dentro de la figura y su licencia sigue viva.
  for (const id of [...usados]) {
    for (const c of activo(id)?.componentes || []) usados.add(c)
  }
  return [...usados].map(activo).filter(Boolean)
}

export function agrupadosPorLicencia(lista = activosEnUso()) {
  const grupos = new Map()
  for (const a of lista) {
    const k = a.license.id
    if (!grupos.has(k)) grupos.set(k, [])
    grupos.get(k).push(a)
  }
  const orden = ['CC-BY-3.0', 'CC-BY-4.0', 'CC0-1.0', 'MIT', 'BSD-3-Clause', 'CC-BY-SA-3.0', 'CC-BY-SA-4.0', 'PTEM-Propia']
  return [...grupos.entries()]
    .sort((a, b) => orden.indexOf(a[0]) - orden.indexOf(b[0]))
    .map(([id, activos]) => ({
      licencia: LICENCIAS[id] || { id, name: id, url: '' },
      activos: activos.sort((x, y) => x.originalCreator.name.localeCompare(y.originalCreator.name, 'es')
        || x.title.localeCompare(y.title, 'es')),
    }))
}

// Autores distintos, con cuántas obras aporta cada uno. Es lo que hace legible
// una página de créditos con doscientas entradas.
export function autoresEnUso(lista = activosEnUso()) {
  const m = new Map()
  for (const a of lista) {
    const k = a.originalCreator.name
    if (!m.has(k)) m.set(k, { nombre: k, url: a.originalCreator.url || '', obras: 0, licencias: new Set() })
    const e = m.get(k)
    e.obras += 1
    e.licencias.add(a.license.id)
    if (!e.url && a.originalCreator.url) e.url = a.originalCreator.url
  }
  return [...m.values()]
    .map((e) => ({ ...e, licencias: [...e.licencias] }))
    .sort((a, b) => b.obras - a.obras || a.nombre.localeCompare(b.nombre, 'es'))
}

// Avisos de licencias que obligan a conservar el texto de la licencia (MIT,
// BSD). Si algún día entra un activo así, la página tiene que mostrarlo.
export function avisosDeLicencia(lista = activosEnUso()) {
  return lista
    .filter((a) => LICENCIAS[a.license.id]?.avisoObligatorio)
    .map((a) => ({
      id: a.id,
      titulo: a.title,
      autor: a.originalCreator.name,
      licencia: a.license.id,
      url: a.license.url,
    }))
}
