// ============================================================
//  Créditos de los activos médicos — la mitad PESADA del catálogo
// ------------------------------------------------------------
//  POR QUÉ ESTÁ SEPARADO DE `lib/activosMedicos.js`.
//
//  Aquí vive todo lo que responde a «¿de dónde salió esta figura?»: autoría,
//  proveedor, licencia completa, URL de origen, hash del archivo y el texto de
//  atribución. Para eso hace falta `src/data/activosMedicos.js` entero, que son
//  500 kB.
//
//  Ese archivo viajaba en el trozo de ENTRADA de la aplicación —499 kB de
//  1 401 kB, un 36 %— porque `lib/activosMedicos.js` lo importaba para las dos
//  cosas a la vez: pintar y acreditar. Pintar lo hace todo el mundo; acreditar
//  lo pide quien abre el panel «Créditos», la página /creditos o el selector de
//  figuras del editor. Los tres son trozos que se cargan aparte.
//
//  Así que la frontera es de USO, no de tema: lo que necesita la pantalla para
//  pintar está en `lib/activosMedicos.js` sobre el catálogo ligero; lo que solo
//  se lee cuando alguien pregunta por la procedencia está aquí.
//
//  NADA DE ESTO ES DECORATIVO. Casi todo el material del Atlas está bajo CC BY:
//  la atribución no es cortesía, es la condición de la licencia. Por eso el
//  catálogo completo sigue existiendo y por eso una composición lista a sus
//  cinco autores en vez de al primero.
// ============================================================
import {
  ACTIVOS_MEDICOS, ACTIVOS_POR_TEMA, ICONO_POR_TEMA, ICONO_POR_MODULO,
  BIOICONS_COMMIT, SMART_RECUPERADO,
} from '../data/activosMedicos.js'
import { LICENCIAS, NOMBRE_PROVEEDOR, URL_PROVEEDOR } from './licenciasActivos.js'

export { BIOICONS_COMMIT, SMART_RECUPERADO }

const POR_ID = new Map(ACTIVOS_MEDICOS.map((a) => [a.id, a]))

// La ficha COMPLETA de un activo. `activo()` de lib/activosMedicos.js devuelve
// la ligera; esta trae además procedencia, licencia entera y atribución.
export function activoCompleto(id) {
  return POR_ID.get(String(id || '')) || null
}

export const todosLosActivos = ACTIVOS_MEDICOS

// ------------------------------------------------------------
//  Créditos
// ------------------------------------------------------------
//  Devuelve todo lo que el panel «Créditos» y la página /creditos necesitan
//  mostrar, ya resuelto: nada de que cada componente vuelva a decidir si esta
//  licencia exige atribución.
export function creditoDe(id) {
  const a = activoCompleto(id)
  if (!a) return null
  const lic = LICENCIAS[a.license.id] || a.license
  const componentes = (a.componentes || []).map(activoCompleto).filter(Boolean)
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
    for (const c of activoCompleto(id)?.componentes || []) usados.add(c)
  }
  return [...usados].map(activoCompleto).filter(Boolean)
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
