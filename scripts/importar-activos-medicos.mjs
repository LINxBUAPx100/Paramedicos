// ============================================================
//  Importador de activos médicos  ·  BioIcons + Servier Medical Art
// ------------------------------------------------------------
//  Qué hace, en una frase: baja los archivos SELECCIONADOS de dos bancos
//  autorizados, comprueba su autoría y su licencia, los sanea, los guarda en
//  public/imagenes/medical/ y genera el catálogo que la web consulta.
//
//  Por qué existe y no se copian los archivos a mano:
//
//   1. LA LICENCIA VIVE EN LA RUTA. En BioIcons cada dibujo está en
//      static/icons/<licencia>/<categoría>/<autor>/<archivo>.svg, y la licencia
//      del REPOSITORIO (MIT) no es la del dibujo. Copiar a mano invita a
//      atribuir 2 830 obras de terceros a «BioIcons, CC BY 4.0», que es falso.
//      Aquí la licencia se LEE de la ruta y se rechaza si no está registrada.
//
//   2. REPRODUCIBILIDAD. Todo se baja de un COMMIT FIJADO. Sin eso, el mismo
//      comando de mañana podría traer un archivo distinto y el crédito quedaría
//      apuntando a una obra que ya no es la que se sirve.
//
//   3. UN SVG ES CÓDIGO. Servido desde el propio origen puede ejecutar
//      JavaScript o pedir recursos a otro dominio. Cada archivo pasa por
//      scripts/lib/svgSeguro.mjs y se RECHAZA si trae algo de eso.
//
//   4. NO SOBRESCRIBIR TRABAJO AJENO. Si un archivo de destino fue modificado
//      a mano (su hash no coincide con el que registró el catálogo), el
//      importador se detiene y lo dice, en vez de pisarlo en silencio.
//
//  Uso:
//    node scripts/importar-activos-medicos.mjs --dry-run   (no escribe nada)
//    node scripts/importar-activos-medicos.mjs             (importa)
//    node scripts/importar-activos-medicos.mjs --solo=il-corazon-vascularizacion
//    node scripts/importar-activos-medicos.mjs --sin-red   (solo caché local)
//
//  Salidas:
//    public/imagenes/medical/{bioicons,smart,composiciones}/…
//    src/data/activosMedicos.js              (catálogo, GENERADO)
//    src/data/activosLigeros.js              (proyección para pintar, GENERADO)
//    docs/INVENTARIO-ACTIVOS-MEDICOS.md      (inventario y reversión, GENERADO)
// ============================================================
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  limpiarSvg, problemasDeSvg, dimensionesSvg, dimensionesPng, cuerpoSvg, escaparXml,
} from './lib/svgSeguro.mjs'
import { minificarSvg, cargarMinificador } from './lib/minificarSvg.mjs'
import { componerFigura } from './lib/componerFigura.mjs'
import {
  CARPETA_A_LICENCIA, licenciaAdmitida, LICENCIAS, textoAtribucion,
  NOMBRE_PROVEEDOR, URL_PROVEEDOR, PREFERENCIA,
} from '../src/lib/licenciasActivos.js'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIR_ACTIVOS = path.join(RAIZ, 'scripts', 'activos')
const CACHE = path.join(RAIZ, '.cache', 'activos')
const DESTINO = path.join(RAIZ, 'public', 'imagenes', 'medical')
const CATALOGO = path.join(RAIZ, 'src', 'data', 'activosMedicos.js')
const INVENTARIO = path.join(RAIZ, 'docs', 'INVENTARIO-ACTIVOS-MEDICOS.md')

// El minificado es PARTE del archivo que se sirve, así que también es parte de
// su hash. Sin svgo, esta ejecución produciría bytes distintos a los del
// catálogo y volvería a dejar CI en rojo (ver scripts/lib/minificarSvg.mjs).
// Por eso se aborta en vez de continuar «casi bien».
if (!await cargarMinificador()) {
  console.error('\n  Falta svgo, que es parte del pipeline: los SVG se sirven minificados.')
  console.error('  Instálalo sin añadirlo a package.json y repite:\n')
  console.error('    npm i --no-save svgo && npm run activos:importar\n')
  process.exit(1)
}

const args = process.argv.slice(2)
const SECO = args.includes('--dry-run')
const SIN_RED = args.includes('--sin-red')
const SOLO = (args.find((a) => a.startsWith('--solo=')) || '').slice(7)

const fuentes = leerJson(path.join(DIR_ACTIVOS, 'fuentes.json'))
const seleccion = leerJson(path.join(DIR_ACTIVOS, 'seleccion.json'))
const composiciones = leerJson(path.join(DIR_ACTIVOS, 'composiciones.json'))

const CURACION = {}
const errores = []
const avisos = []
const importados = []

// ------------------------------------------------------------
//  Utilidades
// ------------------------------------------------------------
function leerJson(p) {
  try {
    return JSON.parse(readFileSync(p, 'utf8'))
  } catch (e) {
    console.error(`✗ No se pudo leer ${path.relative(RAIZ, p)}: ${e.message}`)
    process.exit(1)
  }
}

function sha256(buf) {
  return createHash('sha256').update(buf).digest('hex')
}

function asegurarDir(p) {
  if (!existsSync(p)) mkdirSync(p, { recursive: true })
}

// El nombre de archivo se construye desde el id del activo, nunca desde texto
// libre: así una ruta del catálogo no puede salir del directorio autorizado.
function idSeguro(id) {
  return /^[a-z0-9][a-z0-9-]{2,63}$/.test(id)
}

// Descarga con caché en disco. La caché es lo que hace el pipeline idempotente
// y lo que permite volver a generar sin red (`--sin-red`).
async function bajar(url, clave) {
  const destino = path.join(CACHE, clave)
  if (existsSync(destino)) return readFileSync(destino)
  if (SIN_RED) throw new Error(`falta en caché y se pidió --sin-red: ${clave}`)
  const res = await fetch(url, {
    headers: { 'user-agent': 'PTEM-importador-activos/1.0 (+material educativo, licencias abiertas)' },
    redirect: 'follow',
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} al pedir ${url}`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (!buf.length) throw new Error(`respuesta vacía de ${url}`)
  asegurarDir(path.dirname(destino))
  writeFileSync(destino, buf)
  return buf
}

// ------------------------------------------------------------
//  BioIcons: la ruta ES la ficha de procedencia
// ------------------------------------------------------------
//  static/icons/<licencia>/<categoría>/<autor>/<archivo>.svg
//  Si la ruta no tiene esa forma, o la carpeta de licencia no está en el
//  registro, el activo se rechaza. No se adivina.
function metadatosBioicons(ruta) {
  const partes = ruta.split('/')
  if (partes.length < 4) return { error: `la ruta "${ruta}" no tiene la forma <licencia>/<categoría>/<autor>/<archivo>` }
  const [carpetaLicencia, categoria, autorCarpeta] = partes
  const archivo = partes[partes.length - 1]
  const subCategoria = partes.length > 4 ? partes.slice(3, -1).join('/') : ''
  const licenciaId = CARPETA_A_LICENCIA[carpetaLicencia]
  if (!licenciaId) return { error: `carpeta de licencia desconocida "${carpetaLicencia}" en ${ruta}` }
  if (!licenciaAdmitida(licenciaId)) return { error: `licencia no admitida "${licenciaId}" en ${ruta}` }
  return {
    licenciaId,
    categoria: categoria.replace(/_/g, ' '),
    subCategoria,
    autor: nombreAutor(autorCarpeta),
    autorCarpeta,
    archivo,
  }
}

// El nombre del autor sale del nombre de su carpeta, que es lo único que hay.
// Dos formas conviven en el repositorio y las dos se respetan:
//
//   · «Marcel_Tisch», «Erick-Hernández-López» → nombre con separadores;
//   · «David-Eccles--gringer-» → nombre y ALIAS, separados por doble guion.
//     Aplanarlo a «David Eccles gringer» convertiría el alias en un apellido,
//     que no es como esa persona se llama.
//
// Un identificador sin separadores («EmilyADaniel») se deja tal cual: es el
// nombre de usuario con el que publicó y no hay forma de partirlo sin adivinar.
function nombreAutor(carpeta) {
  const limpio = String(carpeta).replace(/-+$/, '')
  const guiones = limpio.indexOf('--')
  const suave = (s) => s.replace(/[_-]+/g, ' ').trim()
  if (guiones > 0) {
    const nombre = suave(limpio.slice(0, guiones))
    const alias = suave(limpio.slice(guiones + 2))
    return alias ? `${nombre} (${alias})` : nombre
  }
  return suave(limpio)
}

let AUTORES_BIOICONS = {}

async function cargarAutoresBioicons() {
  const cfg = fuentes.bioicons
  const url = cfg.urlCrudo.replace('{commit}', cfg.commit).replace('{ruta}', cfg.rutaAutores)
  try {
    const buf = await bajar(url, `bioicons/${cfg.commit}/authors.json`)
    AUTORES_BIOICONS = JSON.parse(buf.toString('utf8'))
  } catch (e) {
    errores.push(`No se pudo leer authors.json de BioIcons: ${e.message}`)
  }
}

// El nombre de la carpeta del autor no siempre coincide con la clave de
// authors.json (guiones frente a espacios, acentos). Se prueban variantes; si
// ninguna casa, se deja la URL vacía y se AVISA, en vez de inventarla.
function urlAutorBioicons(autor, carpeta) {
  const candidatos = [
    carpeta, // el caso más frecuente: la clave ES el nombre de la carpeta
    autor,
    carpeta.replace(/_/g, ' '),
    carpeta.replace(/-/g, ' '),
    carpeta.replace(/[_-]+/g, ' ').trim(),
  ]
  for (const c of candidatos) {
    const v = String(AUTORES_BIOICONS[c] || '').trim()
    if (!v) continue
    // Solo se guarda un enlace navegable. Varias entradas de authors.json son
    // un correo o un identificador de Mastodon («gringene@genomic.social»):
    // ponerlos en un href daría un enlace roto, y presentarlos como «sitio del
    // autor» sería decir algo que no es. Se cita al autor sin enlace.
    if (/^https?:\/\//i.test(v)) return v
    return ''
  }
  return ''
}

async function importarBioicons(entrada) {
  const cfg = fuentes.bioicons
  const meta = metadatosBioicons(entrada.ruta)
  if (meta.error) { errores.push(`[${entrada.id}] ${meta.error}`); return null }

  const rutaRepo = `${cfg.rutaIconos}/${entrada.ruta}`
  const url = cfg.urlCrudo.replace('{commit}', cfg.commit).replace('{ruta}', rutaRepo.split('/').map(encodeURIComponent).join('/'))
  let bruto
  try {
    bruto = (await bajar(url, `bioicons/${cfg.commit}/${entrada.ruta}`)).toString('utf8')
  } catch (e) {
    errores.push(`[${entrada.id}] no se pudo bajar ${entrada.ruta}: ${e.message}`)
    return null
  }

  // Dos comprobaciones, en este orden y por este motivo: primero sobre el
  // archivo TAL COMO LLEGA, buscando solo lo que la limpieza no podría volver
  // inocuo (código, eventos, referencias a otro dominio) —así el saneado nunca
  // puede tapar un `<script>` «arreglándolo»—; después, sobre el archivo ya
  // limpio, la comprobación estricta completa.
  const enOrigen = problemasDeSvg(bruto, { nombre: entrada.ruta, modo: 'origen' })
  if (enOrigen.length) {
    errores.push(`[${entrada.id}] SVG rechazado en origen:\n      - ${enOrigen.join('\n      - ')}`)
    return null
  }

  const limpio = minificarSvg(limpiarSvg(bruto, {
    titulo: entrada.title,
    descripcion: entrada.descripcion,
    quitarTexto: entrada.quitarTexto,
  }))
  const problemas = problemasDeSvg(limpio, { nombre: entrada.ruta })
  if (problemas.length) {
    errores.push(`[${entrada.id}] SVG rechazado tras el saneado:\n      - ${problemas.join('\n      - ')}`)
    return null
  }

  const dim = dimensionesSvg(limpio)
  if (!dim) { errores.push(`[${entrada.id}] no se pudo determinar el viewBox de ${entrada.ruta}`); return null }

  const autorUrl = urlAutorBioicons(meta.autor, meta.autorCarpeta)
  if (!autorUrl) avisos.push(`[${entrada.id}] authors.json no tiene URL para «${meta.autor}»; se cita sin enlace.`)

  return construir(entrada, {
    proveedor: 'bioicons',
    formato: 'svg',
    contenido: Buffer.from(limpio, 'utf8'),
    subcarpeta: 'bioicons',
    dim,
    licenciaId: meta.licenciaId,
    creador: meta.autor,
    creadorUrl: autorUrl,
    categoria: meta.categoria,
    subCategoria: meta.subCategoria,
    origen: {
      sourcePageUrl: 'https://bioicons.com/',
      rawFileUrl: url,
      repositoryPath: rutaRepo,
      upstreamCommit: cfg.commit,
      retrievedAt: null,
    },
    cuerpo: cuerpoSvg(limpio),
  })
}

// ------------------------------------------------------------
//  Servier Medical Art: la ficha pública declara el archivo y la licencia
// ------------------------------------------------------------
async function importarSmart(entrada) {
  const cfg = fuentes.servier_smart
  const pagina = cfg.paginaActivo.replace('{slug}', entrada.slug)
  let html
  try {
    html = (await bajar(pagina, `smart/paginas/${entrada.slug}.html`)).toString('utf8')
  } catch (e) {
    errores.push(`[${entrada.id}] no se pudo leer la ficha ${pagina}: ${e.message}`)
    return null
  }

  const og = html.match(/<meta property="og:image" content="([^"]+)"/i)
  if (!og) { errores.push(`[${entrada.id}] la ficha ${pagina} no declara og:image; no se adivina el archivo.`); return null }
  const archivoUrl = og[1]
  if (!/^https:\/\/smart\.servier\.com\/wp-content\/uploads\//i.test(archivoUrl)) {
    errores.push(`[${entrada.id}] og:image apunta fuera de la biblioteca oficial: ${archivoUrl}`)
    return null
  }
  // La propia ficha tiene que declarar CC BY 4.0. Si dejara de declararla, el
  // activo se rechaza: la licencia no se hereda de una ejecución anterior.
  if (!/CC BY 4\.0/i.test(html) && !/creativecommons\.org\/licenses\/by\/4\.0/i.test(html)) {
    errores.push(`[${entrada.id}] la ficha ${pagina} ya no declara CC BY 4.0.`)
    return null
  }

  const ext = (archivoUrl.match(/\.(png|jpg|jpeg|svg|webp)$/i) || [, 'png'])[1].toLowerCase()
  let buf
  try {
    buf = await bajar(archivoUrl, `smart/archivos/${entrada.slug}.${ext}`)
  } catch (e) {
    errores.push(`[${entrada.id}] no se pudo bajar ${archivoUrl}: ${e.message}`)
    return null
  }

  let dim = null
  let cuerpo = ''
  let contenido = buf
  if (ext === 'svg') {
    const texto = buf.toString('utf8')
    const enOrigen = problemasDeSvg(texto, { nombre: entrada.slug, modo: 'origen' })
    if (enOrigen.length) { errores.push(`[${entrada.id}] SVG rechazado en origen:\n      - ${enOrigen.join('\n      - ')}`); return null }
    const limpio = minificarSvg(limpiarSvg(texto, {
      titulo: entrada.title,
      descripcion: entrada.descripcion,
      quitarTexto: entrada.quitarTexto,
    }))
    const problemas = problemasDeSvg(limpio, { nombre: entrada.slug })
    if (problemas.length) { errores.push(`[${entrada.id}] SVG rechazado tras el saneado:\n      - ${problemas.join('\n      - ')}`); return null }
    contenido = Buffer.from(limpio, 'utf8')
    dim = dimensionesSvg(limpio)
    cuerpo = cuerpoSvg(limpio)
  } else if (ext === 'png') {
    dim = dimensionesPng(buf)
  }
  if (!dim) { errores.push(`[${entrada.id}] no se pudieron leer las dimensiones de ${archivoUrl}`); return null }

  const tituloOg = (html.match(/<meta property="og:title" content="([^"]+)"/i) || [, ''])[1]
    .replace(/\s*[-–]\s*Servier Medical Art\s*$/i, '')
    .replace(/&#8211;/g, '–').replace(/&amp;/g, '&')

  return construir(entrada, {
    proveedor: 'servier_smart',
    formato: ext,
    contenido,
    subcarpeta: 'smart',
    dim,
    licenciaId: cfg.licenciaDeclarada,
    creador: cfg.creador,
    creadorUrl: cfg.creadorUrl,
    categoria: 'Servier Medical Art',
    subCategoria: tituloOg,
    origen: {
      sourcePageUrl: pagina,
      rawFileUrl: archivoUrl,
      repositoryPath: archivoUrl.replace('https://smart.servier.com/', ''),
      upstreamCommit: null,
      retrievedAt: cfg.recuperadoEl,
    },
    cuerpo,
  })
}

// ------------------------------------------------------------
//  Ficha común del catálogo
// ------------------------------------------------------------
function construir(entrada, d) {
  if (!idSeguro(entrada.id)) { errores.push(`[${entrada.id}] id inválido: solo minúsculas, dígitos y guiones.`); return null }
  if (!entrada.title) { errores.push(`[${entrada.id}] falta title.`); return null }
  if (!entrada.alt) { errores.push(`[${entrada.id}] falta alt (texto alternativo obligatorio).`); return null }
  if (!entrada.motivo) { errores.push(`[${entrada.id}] falta motivo de selección.`); return null }
  if (!d.creador) { errores.push(`[${entrada.id}] sin autor comprobable; se rechaza.`); return null }
  const lic = LICENCIAS[d.licenciaId]
  if (!lic) { errores.push(`[${entrada.id}] licencia no registrada: ${d.licenciaId}`); return null }

  const rel = `imagenes/medical/${d.subcarpeta}/${entrada.id}.${d.formato}`
  const abs = path.join(RAIZ, 'public', rel)
  const hash = sha256(d.contenido)

  return {
    ficha: {
      id: entrada.id,
      title: entrada.title,
      kind: entrada.kind || 'medical_icon',
      catalogProvider: d.proveedor,
      originalCreator: { name: d.creador, url: d.creadorUrl || '' },
      category: d.categoria,
      subCategory: d.subCategoria || '',
      tags: entrada.tags || [],
      filePath: rel,
      format: d.formato,
      dimensions: { width: d.dim.width, height: d.dim.height, viewBox: d.dim.viewBox || '' },
      origin: {
        sourcePageUrl: d.origen.sourcePageUrl,
        rawFileUrl: d.origen.rawFileUrl,
        repositoryPath: d.origen.repositoryPath,
        upstreamCommit: d.origen.upstreamCommit,
        retrievedAt: d.origen.retrievedAt,
        sha256: hash,
      },
      license: {
        id: lic.id, name: lic.name, url: lic.url,
        attributionRequired: lic.attributionRequired, shareAlike: lic.shareAlike,
      },
      attribution: {
        displayText: textoAtribucion({
          title: entrada.title,
          creador: d.creador,
          creadorUrl: d.creadorUrl,
          proveedor: NOMBRE_PROVEEDOR[d.proveedor],
          licenciaId: lic.id,
          cambios: [],
        }),
        changes: entrada.quitarTexto
          ? [entrada.quitarTexto === true
            ? 'rótulos originales en inglés retirados del dibujo; se nombran en el pie y en el texto alternativo'
            : 'rótulos en inglés retirados del dibujo: ' + [].concat(entrada.quitarTexto).join(', ')]
          : [],
      },
      accesibilidad: { alt: entrada.alt, descripcion: entrada.descripcion || '' },
      usages: { topicIds: [], locations: [] },
    },
    // La justificación editorial (por qué se eligió este activo y qué se
    // comprobó frente al material que sustituye) NO viaja en el catálogo que
    // consume el navegador: son 228 párrafos que nadie ve en pantalla y que
    // pesarían en el bundle. Va al inventario, que es donde se revisa.
    curacion: { motivo: entrada.motivo, equivalencia: entrada.equivalencia || '' },
    archivo: { abs, rel, contenido: d.contenido, hash },
    cuerpo: d.cuerpo,
  }
}

// ------------------------------------------------------------
//  Escritura que no pisa cambios locales
// ------------------------------------------------------------
const hashesPrevios = (() => {
  if (!existsSync(CATALOGO)) return {}
  try {
    const txt = readFileSync(CATALOGO, 'utf8')
    const m = {}
    const re = /"id":\s*"([^"]+)"[\s\S]*?"sha256":\s*"([a-f0-9]{64})"/g
    let g
    while ((g = re.exec(txt))) m[g[1]] = g[2]
    return m
  } catch { return {} }
})()

function escribirArchivo(a, id) {
  if (existsSync(a.abs)) {
    const actual = sha256(readFileSync(a.abs))
    if (actual === a.hash) return 'igual'
    const esperado = hashesPrevios[id]
    if (esperado && esperado !== actual) {
      errores.push(`[${id}] public/${a.rel} fue modificado a mano (hash ${actual.slice(0, 12)}…, el catálogo esperaba ${esperado.slice(0, 12)}…). No se sobrescribe; borra el archivo o actualiza a conciencia.`)
      return 'conflicto'
    }
  }
  if (SECO) return 'pendiente'
  asegurarDir(path.dirname(a.abs))
  writeFileSync(a.abs, a.contenido)
  return existsSync(a.abs) ? 'escrito' : 'error'
}

// ------------------------------------------------------------
//  Ejecución
// ------------------------------------------------------------
console.log(`\n· Importador de activos médicos${SECO ? '  [--dry-run: no se escribe nada]' : ''}`)
console.log(`  BioIcons @ ${fuentes.bioicons.commit.slice(0, 12)}  ·  SMART recuperado ${fuentes.servier_smart.recuperadoEl}`)

await cargarAutoresBioicons()

const fichas = []
const cuerpos = new Map()
const estados = {}

const pendientes = [
  ...(seleccion.bioicons || []).map((e) => ({ e, fn: importarBioicons })),
  ...(seleccion.servier_smart || []).map((e) => ({ e, fn: importarSmart })),
].filter(({ e }) => !SOLO || e.id === SOLO)

// Ids duplicados: un id repetido haría que dos activos distintos compartieran
// archivo y crédito. Se comprueba antes de bajar nada.
const vistos = new Set()
for (const { e } of pendientes) {
  if (vistos.has(e.id)) errores.push(`Id duplicado en seleccion.json: ${e.id}`)
  vistos.add(e.id)
}

let n = 0
for (const { e, fn } of pendientes) {
  n++
  const r = await fn(e)
  if (!r) { estados[e.id] = 'bloqueado'; continue }
  const estado = escribirArchivo(r.archivo, e.id)
  estados[e.id] = estado === 'conflicto' ? 'bloqueado' : 'reemplazado'
  fichas.push(r.ficha)
  CURACION[e.id] = r.curacion
  cuerpos.set(e.id, { cuerpo: r.cuerpo, ficha: r.ficha })
  importados.push(e.id)
  if (n % 25 === 0) console.log(`  … ${n}/${pendientes.length}`)
}
console.log(`  ${fichas.length} activos de banco importados de ${pendientes.length} seleccionados`)

// ------------------------------------------------------------
//  Composiciones
// ------------------------------------------------------------
//  Una composición NO es un activo bajado: es obra nueva de PTEM que EMBEBE
//  activos de terceros. Por eso declara sus componentes uno a uno, y la página
//  de créditos muestra el crédito de cada uno: atribuir la figura completa a un
//  solo autor sería tan incorrecto como no atribuirla.
const porId = new Map(fichas.map((f) => [f.id, f]))
let nComp = 0
for (const comp of composiciones.composiciones || []) {
  if (SOLO && comp.id !== SOLO) continue
  if (!idSeguro(comp.id)) { errores.push(`[${comp.id}] id de composición inválido.`); continue }
  const r = componerFigura(comp, { porId, cuerpos, escaparXml })
  if (r.errores.length) { errores.push(...r.errores.map((x) => `[${comp.id}] ${x}`)); estados[comp.id] = 'bloqueado'; continue }

  // La composición se sirve tal cual, así que se minifica ANTES de validarla y
  // de calcular su hash: lo que se comprueba y lo que se sella es el archivo
  // final, no una versión intermedia que nadie va a descargar.
  r.svg = minificarSvg(r.svg)
  const problemas = problemasDeSvg(r.svg, { nombre: `${comp.id}.svg` })
  if (problemas.length) { errores.push(`[${comp.id}] la composición generada no pasa el saneado:\n      - ${problemas.join('\n      - ')}`); continue }

  const rel = `imagenes/medical/composiciones/${comp.id}.svg`
  const abs = path.join(RAIZ, 'public', rel)
  const contenido = Buffer.from(r.svg, 'utf8')
  const hash = sha256(contenido)
  const estado = escribirArchivo({ abs, rel, contenido, hash }, comp.id)
  if (estado === 'conflicto') { estados[comp.id] = 'bloqueado'; continue }

  const compsUsados = r.componentes.map((id) => porId.get(id)).filter(Boolean)
  const conAtribucion = compsUsados.filter((c) => c.license.attributionRequired)
  const shareAlike = compsUsados.some((c) => c.license.shareAlike)
  // Los «cambios» tienen que describir lo que de verdad se hizo. Una
  // composición que solo lleva trazos y rótulos de PTEM no está «recompuesta a
  // partir de activos de terceros», y decirlo sería atribuir a otros un dibujo
  // que no es suyo (y de paso ocultar que es obra propia).
  const cambios = compsUsados.length
    ? [
      'rotulado en español con texto SVG accesible',
      'recompuesto en una figura nueva junto a otros activos abiertos',
      ...(comp.cambios || []),
    ]
    : [
      'esquema y rótulos dibujados por PTEM, sin componentes de terceros',
      ...(comp.cambios || []),
    ]

  fichas.push({
    id: comp.id,
    title: comp.title,
    kind: 'composite',
    catalogProvider: 'ptem',
    originalCreator: { name: 'PTEM (composición) y los autores de sus componentes', url: '' },
    category: 'Composición docente',
    subCategory: comp.subtitulo || '',
    tags: comp.tags || [],
    filePath: rel,
    format: 'svg',
    dimensions: { width: comp.ancho, height: comp.alto, viewBox: `0 0 ${comp.ancho} ${comp.alto}` },
    origin: {
      sourcePageUrl: '',
      rawFileUrl: '',
      repositoryPath: `scripts/activos/composiciones.json#${comp.id}`,
      upstreamCommit: null,
      retrievedAt: null,
      sha256: hash,
    },
    license: {
      // La figura hereda la obligación MÁS EXIGENTE de sus componentes: si uno
      // pide atribución, la composición la pide. Si uno fuera CompartirIgual,
      // la composición arrastraría esa obligación y hay que declararlo.
      id: 'PTEM-Propia',
      name: 'Obra propia de PTEM sobre componentes de terceros',
      url: '',
      attributionRequired: conAtribucion.length > 0,
      shareAlike,
    },
    attribution: {
      displayText: conAtribucion.length
        ? `Figura de PTEM construida con: ${conAtribucion.map((c) => `«${c.title}» de ${c.originalCreator.name} (${c.license.id})`).join('; ')}.`
        : compsUsados.length
          ? 'Figura de PTEM. Sus componentes son de dominio público (CC0) y no exigen atribución, pero su procedencia queda registrada.'
          : `«${comp.title}»: esquema y rótulos dibujados por PTEM. No incorpora obra de terceros.`,
      changes: cambios,
    },
    accesibilidad: { alt: comp.title, descripcion: comp.descripcion || '' },
    componentes: r.componentes,
    usages: { topicIds: [], locations: [] },
  })
  CURACION[comp.id] = {
    motivo: 'La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba.',
    equivalencia: comp.equivalencia || 'Conserva íntegro el texto pedagógico de la figura que sustituye.',
  }
  estados[comp.id] = 'reemplazado'
  nComp++
}
console.log(`  ${nComp} composiciones generadas`)

// ------------------------------------------------------------
//  Presupuesto de peso para el papel de ICONO
// ------------------------------------------------------------
//  Un icono de cabecera se pinta a 22–30 px y en una lista de módulo aparecen
//  veinte a la vez. Varias ilustraciones de Servier son dibujos de más de mil
//  trazos y pesan entre 200 y 500 KB: son excelentes como figura y ruinosas
//  como icono. Aquí se separan los dos papeles por peso medido, no por
//  intención: lo que no entra en el presupuesto sigue en el catálogo como
//  ilustración —se usa en la galería y en el tema— pero deja de ser elegible
//  como icono. El aviso se imprime: nada se degrada en silencio.
const PRESUPUESTO_ICONO = 128 * 1024
const reclasificados = []
for (const f of fichas) {
  if (f.kind !== 'medical_icon') continue
  const abs = path.join(RAIZ, 'public', f.filePath)
  const peso = existsSync(abs) ? statSync(abs).size : 0
  f.pesoBytes = peso
  if (peso > PRESUPUESTO_ICONO) {
    f.kind = 'illustration'
    f.notaPeso = `Reclasificado como ilustración: ${Math.round(peso / 1024)} KB supera el presupuesto de ${Math.round(PRESUPUESTO_ICONO / 1024)} KB para un icono.`
    reclasificados.push(`${f.id} (${Math.round(peso / 1024)} KB)`)
  }
}
for (const f of fichas) {
  if (f.pesoBytes != null) continue
  const abs = path.join(RAIZ, 'public', f.filePath)
  f.pesoBytes = existsSync(abs) ? statSync(abs).size : 0
}
if (reclasificados.length) {
  console.log(`  ${reclasificados.length} activos pasan de icono a ilustración por peso:`)
  console.log(`    ${reclasificados.join(', ')}`)
}

// ------------------------------------------------------------
//  Mapa de temas → activos  (cobertura de los 287 temas)
// ------------------------------------------------------------
const mapa = existsSync(path.join(DIR_ACTIVOS, 'mapa-temas.json'))
  ? leerJson(path.join(DIR_ACTIVOS, 'mapa-temas.json'))
  : { temas: {} }

const idsCatalogo = new Set(fichas.map((f) => f.id))
for (const [temaId, lista] of Object.entries(mapa.temas || {})) {
  for (const activoId of lista) {
    if (!idsCatalogo.has(activoId)) {
      errores.push(`mapa-temas.json: el tema "${temaId}" usa el activo "${activoId}", que no está en el catálogo.`)
      continue
    }
    const f = fichas.find((x) => x.id === activoId)
    if (!f.usages.topicIds.includes(temaId)) f.usages.topicIds.push(temaId)
  }
}
for (const f of fichas) {
  if (f.usages.topicIds.length) f.usages.locations.push('Atlas / galería de Logros', 'Imágenes de referencia del tema')
}

// Cobertura: ningún tema puede quedarse sin imagen. Se comprueba aquí, contra
// la semilla oficial, y no como una prueba a posteriori: si falta un tema, el
// catálogo no se escribe.
const semilla = leerJson(path.join(RAIZ, 'scripts', 'seed', 'plan-rescate.json'))
const programa = semilla.programas.find((p) => p.id === 'tum-rescate')
const TEMAS_PLAN = programa.modulos.flatMap((m) => m.unidades.flatMap((u) => u.temas.map((t) => t.id)))
const sinImagen = TEMAS_PLAN.filter((id) => !(mapa.temas || {})[id]?.length)
if (sinImagen.length) {
  errores.push(`${sinImagen.length} de ${TEMAS_PLAN.length} temas del plan no tienen imagen en mapa-temas.json:\n      ${sinImagen.join(', ')}`)
}
const sobrantes = Object.keys(mapa.temas || {}).filter((id) => !TEMAS_PLAN.includes(id))
if (sobrantes.length) {
  errores.push(`mapa-temas.json declara temas que no existen en el plan: ${sobrantes.join(', ')}`)
}

// Icono de cada tema: el PRIMER activo del tema que entre en el presupuesto de
// icono. Es el mismo activo que encabeza su galería siempre que pueda serlo, de
// modo que la cabecera y la figura compartan petición y caché. Si ninguno de
// los activos del tema es lo bastante ligero, hereda el de su módulo y se
// registra: preferimos un icono heredado y declarado a una descarga de 400 KB
// para pintar 24 píxeles.
const porIdFinal = new Map(fichas.map((f) => [f.id, f]))
const ICONOS_MODULO = leerJson(path.join(DIR_ACTIVOS, 'iconos-modulo.json'))
const heredados = []
const iconoPorTema = {}
for (const m of programa.modulos) {
  const iconoModulo = ICONOS_MODULO.modulos[m.id]
  if (!iconoModulo) { errores.push(`iconos-modulo.json no declara icono para el módulo ${m.id}`); continue }
  const fm = porIdFinal.get(iconoModulo)
  if (!fm) { errores.push(`el icono del módulo ${m.id} ("${iconoModulo}") no está en el catálogo`); continue }
  if (fm.pesoBytes > PRESUPUESTO_ICONO) {
    errores.push(`el icono del módulo ${m.id} ("${iconoModulo}") pesa ${Math.round(fm.pesoBytes / 1024)} KB y no entra en el presupuesto de icono`)
    continue
  }
  for (const u of m.unidades) {
    for (const t of u.temas) {
      // Excepción declarada a mano: manda sobre el automatismo.
      const excepcion = (ICONOS_MODULO.temas || {})[t.id]
      if (excepcion) {
        const fe = porIdFinal.get(excepcion)
        if (!fe) { errores.push(`iconos-modulo.json: el icono declarado para "${t.id}" ("${excepcion}") no está en el catálogo`); continue }
        if (fe.pesoBytes > PRESUPUESTO_ICONO) {
          errores.push(`iconos-modulo.json: el icono declarado para "${t.id}" ("${excepcion}") pesa ${Math.round(fe.pesoBytes / 1024)} KB y no entra en el presupuesto`)
          continue
        }
        iconoPorTema[t.id] = excepcion
        continue
      }
      const lista = (mapa.temas || {})[t.id] || []
      const elegido = lista.map((id) => porIdFinal.get(id)).find((f) => f && f.pesoBytes <= PRESUPUESTO_ICONO)
      if (elegido) iconoPorTema[t.id] = elegido.id
      else { iconoPorTema[t.id] = iconoModulo; heredados.push(t.id) }
    }
  }
}
if (heredados.length) {
  console.log(`  ${heredados.length} temas heredan el icono de su módulo (sus activos son ilustraciones pesadas):`)
  console.log(`    ${heredados.join(', ')}`)
}

// ------------------------------------------------------------
//  Informe
// ------------------------------------------------------------
if (avisos.length) {
  console.log('\n  Avisos:')
  for (const a of avisos.slice(0, 20)) console.log(`   · ${a}`)
  if (avisos.length > 20) console.log(`   · … y ${avisos.length - 20} más`)
}
if (errores.length) {
  console.error(`\n✗ ${errores.length} problema(s). No se escribe el catálogo:`)
  for (const e of errores) console.error(`   · ${e}`)
  process.exit(1)
}

// Reparto por licencia y por proveedor, para el informe final.
const porLicencia = {}
const porProveedor = {}
for (const f of fichas) {
  porLicencia[f.license.id] = (porLicencia[f.license.id] || 0) + 1
  porProveedor[f.catalogProvider] = (porProveedor[f.catalogProvider] || 0) + 1
}
const sa = fichas.filter((f) => f.license.shareAlike)

if (SECO) {
  console.log('\n  [--dry-run] Resumen de lo que se habría escrito:')
  console.log(`   · ${fichas.length} activos  ·  proveedores: ${JSON.stringify(porProveedor)}`)
  console.log(`   · licencias: ${JSON.stringify(porLicencia)}`)
  console.log(`   · CompartirIgual pendiente de declarar: ${sa.length}`)
  console.log('   · catálogo e inventario NO escritos.\n')
  process.exit(0)
}

// ------------------------------------------------------------
//  Catálogo generado
// ------------------------------------------------------------
fichas.sort((a, b) => a.id.localeCompare(b.id, 'es'))

const cabecera = `// ARCHIVO GENERADO por scripts/importar-activos-medicos.mjs — NO editar a mano.
//
// Catálogo de activos médicos: es la ÚNICA fuente de verdad sobre qué imagen se
// sirve, de dónde salió, quién la hizo y bajo qué licencia. La web lo consulta
// para pintar la figura, para el panel «Créditos» de cada imagen y para la
// página /creditos.
//
// Para cambiarlo se edita scripts/activos/seleccion.json (o composiciones.json)
// y se ejecuta \`npm run activos:importar\`.
//
// Fuentes fijadas en esta generación:
//   · BioIcons  → commit ${fuentes.bioicons.commit}
//   · Servier Medical Art → biblioteca pública, recuperada ${fuentes.servier_smart.recuperadoEl}
`

const cuerpoJs = `${cabecera}
export const BIOICONS_COMMIT = ${JSON.stringify(fuentes.bioicons.commit)}
export const SMART_RECUPERADO = ${JSON.stringify(fuentes.servier_smart.recuperadoEl)}

export const ACTIVOS_MEDICOS = ${JSON.stringify(fichas, null, 2)}

// tema → activos que le corresponden, en orden de pertinencia. El primero es
// el canónico: encabeza la galería del tema y es su tarjeta en Logros.
export const ACTIVOS_POR_TEMA = ${JSON.stringify(mapa.temas || {}, null, 2)}

// tema → activo que hace de ICONO (cabecera, listas, buscador). Es el primer
// activo del tema que entra en el presupuesto de peso de icono; si ninguno
// entra, hereda el de su módulo.
export const ICONO_POR_TEMA = ${JSON.stringify(iconoPorTema, null, 2)}

// módulo → activo que hace de icono.
export const ICONO_POR_MODULO = ${JSON.stringify(ICONOS_MODULO.modulos, null, 2)}

// Presupuesto de peso, en bytes, por encima del cual un activo deja de poder
// ser icono y queda solo como ilustración.
export const PRESUPUESTO_ICONO = ${PRESUPUESTO_ICONO}
`

writeFileSync(CATALOGO, cuerpoJs)
console.log(`\n  ${path.relative(RAIZ, CATALOGO)} escrito · ${fichas.length} activos`)

// El catálogo LIGERO se rehace aquí mismo, no «cuando toque».
//
// `src/data/activosLigeros.js` es la proyección del catálogo que consume la
// aplicación para pintar; el completo se quedó para los créditos. Si esto no se
// regenerara en el mismo paso, una figura retirada seguiría teniendo ruta en la
// web y una nueva no aparecería, sin ningún error a la vista. Hay una prueba que
// compara los dos archivos (tests/generadoAlDia.test.mjs), pero fallar en CI es
// peor que no dar ocasión de equivocarse.
execFileSync(process.execPath, [path.join(RAIZ, 'scripts', 'gen-activos-ligeros.mjs')], {
  cwd: RAIZ, stdio: 'inherit',
})

// ------------------------------------------------------------
//  Inventario de migración y tabla de reversión
// ------------------------------------------------------------
const reversion = leerJson(path.join(DIR_ACTIVOS, 'reversion.json'))
const filas = reversion.entradas.map((r) => {
  // Un `estado` declarado a mano manda: hay filas que describen una migración
  // de campos (los 269 iconos) y no tienen un único assetId al que apuntar.
  const estado = r.estado
    ? r.estado
    : r.assetId
      ? (fichas.some((f) => f.id === r.assetId) ? 'reemplazado' : 'BLOQUEADO: el activo no está en el catálogo')
      : 'sin activo declarado'
  return `| ${r.ubicacion} | ${r.tema || '—'} | \`${r.anterior}\` | ${r.tipoOrigen} | ${r.descripcion} | \`${r.assetId || '—'}\` | ${estado} | ${r.motivo} | ${r.equivalencia} | ${r.reversion} |`
})

const inv = `# Inventario de activos médicos — reemplazos, procedencia y reversión

ARCHIVO GENERADO por \`scripts/importar-activos-medicos.mjs\`. No editar a mano:
se regenera con \`npm run activos:importar\`.

## 1. Resumen

| | |
|---|---|
| Activos en el catálogo | **${fichas.length}** |
| Bajados de BioIcons | ${porProveedor.bioicons || 0} |
| Bajados de Servier Medical Art | ${porProveedor.servier_smart || 0} |
| Composiciones nuevas de PTEM | ${porProveedor.ptem || 0} |
| Temas con al menos una imagen | ${Object.keys(mapa.temas || {}).length} |
| Commit fijado de BioIcons | \`${fuentes.bioicons.commit}\` |
| SMART recuperado el | ${fuentes.servier_smart.recuperadoEl} |

### Reparto por licencia

| Licencia | Activos | Exige atribución | CompartirIgual |
|---|---|---|---|
${Object.entries(porLicencia).sort((a, b) => b[1] - a[1]).map(([id, k]) => {
  const l = LICENCIAS[id] || {}
  return `| ${id} | ${k} | ${l.attributionRequired ? 'sí' : 'no'} | ${l.shareAlike ? 'sí' : 'no'} |`
}).join('\n')}

Orden de preferencia declarado en la política: ${PREFERENCIA.join(' → ')}.

${sa.length === 0
  ? '**No hay ningún activo CompartirIgual (CC BY-SA) en el catálogo**, así que PTEM no arrastra ninguna obligación vírica por este material.'
  : `**Atención: ${sa.length} activo(s) CompartirIgual.** Obligan a licenciar la obra derivada en los mismos términos:\n\n${sa.map((f) => `- \`${f.id}\` — ${f.title} (${f.license.id})`).join('\n')}`}

## 2. Tabla de reemplazos y reversión

Cada fila dice de dónde venía la imagen, qué la sustituye y **cómo volver atrás**.
Ningún archivo original de Drive se ha borrado: solo se han retirado sus
referencias en la aplicación.

| Dónde se usa | Tema | Origen anterior | Tipo | Qué mostraba | Nuevo assetId | Estado | Motivo | Equivalencia | Cómo revertir |
|---|---|---|---|---|---|---|---|---|---|
${filas.join('\n')}

## 3. Catálogo completo

| assetId | Título | Tipo | Proveedor | Autor | Licencia | Archivo | Temas |
|---|---|---|---|---|---|---|---|
${fichas.map((f) => `| \`${f.id}\` | ${f.title} | ${f.kind} | ${NOMBRE_PROVEEDOR[f.catalogProvider] || f.catalogProvider} | ${f.originalCreator.name} | [${f.license.id}](${f.license.url || URL_PROVEEDOR[f.catalogProvider] || ''}) | \`public/${f.filePath}\` | ${f.usages.topicIds.length} |`).join('\n')}

## 4. Curación: por qué se eligió cada activo

Esta justificación NO viaja en el catálogo que consume el navegador (son 228
párrafos que nadie ve en pantalla): vive aquí, que es donde se revisa.

| assetId | Motivo de la elección | Equivalencia comprobada |
|---|---|---|
${fichas.map((f) => {
  const c = CURACION[f.id] || {}
  return `| \`${f.id}\` | ${(c.motivo || '—').replace(/\|/g, '\\|')} | ${(c.equivalencia || '—').replace(/\|/g, '\\|')} |`
}).join('\n')}

## 5. Peso de los archivos

El presupuesto para el papel de ICONO es **${Math.round(PRESUPUESTO_ICONO / 1024)} KB**. Lo que lo supera
sigue en el catálogo como ilustración —se usa en la galería y en el tema— pero
deja de ser elegible como icono de cabecera: pedir 400 KB para pintar 26 píxeles
sería absurdo. Nada se degrada en silencio, y estos son los diez más pesados:

| assetId | Peso | Tipo |
|---|---|---|
${[...fichas].sort((a, b) => (b.pesoBytes || 0) - (a.pesoBytes || 0)).slice(0, 10)
  .map((f) => `| \`${f.id}\` | ${Math.round((f.pesoBytes || 0) / 1024)} KB | ${f.kind} |`).join('\n')}

${reclasificados.length
  ? `Reclasificados de icono a ilustración por peso (${reclasificados.length}): ${reclasificados.join(', ')}.`
  : 'Ningún activo hubo que reclasificar por peso.'}

Los SVG se sirven comprimidos: el conjunto ocupa unos 4 MB con gzip. Los PNG de
SMART llegan tal cual del proveedor, porque optimizarlos exigiría \`sharp\`, que
este repositorio no lleva como dependencia a propósito.

## 6. Bloqueos y deudas declaradas

${(reversion.bloqueos || []).map((b) => `- **${b.asunto}** — ${b.detalle}`).join('\n') || '- Ninguno.'}

## 7. Cómo actualizar en el futuro

1. Editar \`scripts/activos/seleccion.json\` (activos) o \`composiciones.json\` (figuras).
2. Para subir la versión de BioIcons, cambiar \`commit\` en \`scripts/activos/fuentes.json\`.
3. \`npm run activos:importar -- --dry-run\` y revisar el informe.
4. \`npm run activos:importar\` y después \`npm test\`.
5. La caché de descargas vive en \`.cache/activos/\`; borrarla fuerza a volver a bajar.
   \`--sin-red\` regenera solo con lo que ya está en caché.
`

writeFileSync(INVENTARIO, inv)
console.log(`  ${path.relative(RAIZ, INVENTARIO)} escrito`)
console.log(`\n  Proveedores: ${JSON.stringify(porProveedor)}`)
console.log(`  Licencias:   ${JSON.stringify(porLicencia)}`)
console.log(`  CompartirIgual: ${sa.length}\n`)
