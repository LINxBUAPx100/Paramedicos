// ============================================================
//  Activos médicos — procedencia, licencias, archivos y saneado
// ------------------------------------------------------------
//  Estas pruebas no comprueban que el pipeline «funcionó»: comprueban el
//  RESULTADO que se sirve. Es una distinción que importa, porque un catálogo
//  bien generado y un directorio public/ desincronizado dan exactamente el
//  mismo informe de éxito y una web con huecos.
//
//  Lo que impiden, en orden de gravedad:
//
//   1. Publicar una obra de un tercero SIN atribución, cuando su licencia la
//      exige. Es el incumplimiento que la migración vino a resolver.
//   2. Atribuir mal: darle a un archivo la licencia del repositorio que lo
//      aloja en vez de la suya. BioIcons es MIT y sus 2 830 dibujos NO lo son.
//   3. Servir un SVG con código dentro desde el propio origen del sitio.
//   4. Declarar en el catálogo un archivo que no está en public/, que es un
//      hueco en la lección y no da error en ninguna parte.
//   5. Volver a apuntar a Google Drive.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { createHash } from 'node:crypto'

import {
  ACTIVOS_MEDICOS, ACTIVOS_POR_TEMA, ICONO_POR_TEMA, ICONO_POR_MODULO,
  BIOICONS_COMMIT, SMART_RECUPERADO, PRESUPUESTO_ICONO,
} from '../src/data/activosMedicos.js'
import { LICENCIAS, licenciaAdmitida } from '../src/lib/licenciasActivos.js'
import { problemasDeSvg } from '../scripts/lib/svgSeguro.mjs'
import { todosLosTemas, modulos } from '../src/data/index.js'

const PUBLICO = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const POR_ID = new Map(ACTIVOS_MEDICOS.map((a) => [a.id, a]))

test('el catálogo no está vacío (guardia de la propia prueba)', () => {
  assert.ok(ACTIVOS_MEDICOS.length >= 150, `solo hay ${ACTIVOS_MEDICOS.length} activos`)
  assert.match(BIOICONS_COMMIT, /^[0-9a-f]{40}$/, 'el commit de BioIcons debe ser un sha completo')
  assert.match(SMART_RECUPERADO, /^\d{4}-\d{2}-\d{2}$/)
})

test('cada activo declara autor, procedencia, licencia y URL de licencia', () => {
  const mal = []
  for (const a of ACTIVOS_MEDICOS) {
    if (!a.originalCreator?.name) mal.push(`${a.id}: sin autor`)
    if (!a.license?.id || !licenciaAdmitida(a.license.id)) mal.push(`${a.id}: licencia no admitida "${a.license?.id}"`)
    // CC0 y la obra propia no tienen URL de licencia obligatoria en el sentido
    // de un enlace de términos, pero CC0 sí la tiene y se exige; la única sin
    // URL es la obra propia de PTEM, que no es una licencia de tercero.
    const lic = LICENCIAS[a.license?.id]
    if (lic && !lic.propia && !lic.url) mal.push(`${a.id}: la licencia ${a.license.id} no trae URL`)
    if (!a.origin?.sha256 || !/^[0-9a-f]{64}$/.test(a.origin.sha256)) mal.push(`${a.id}: sha256 ausente o inválido`)
    if (!a.accesibilidad?.alt) mal.push(`${a.id}: sin texto alternativo`)
    if (!a.title) mal.push(`${a.id}: sin título`)
  }
  assert.deepEqual(mal, [], `Fichas incompletas:\n  ${mal.join('\n  ')}`)
})

test('el origen queda trazado: commit fijado o fecha de recuperación', () => {
  const mal = ACTIVOS_MEDICOS
    .filter((a) => a.catalogProvider !== 'ptem')
    .filter((a) => !a.origin.upstreamCommit && !a.origin.retrievedAt)
    .map((a) => a.id)
  assert.deepEqual(mal, [], `Sin trazabilidad de versión: ${mal.join(', ')}`)

  // Los de BioIcons van todos al MISMO commit: si dos fichas apuntaran a
  // commits distintos, el catálogo describiría dos versiones del repositorio
  // a la vez y no se podría reproducir.
  const commits = new Set(
    ACTIVOS_MEDICOS.filter((a) => a.catalogProvider === 'bioicons').map((a) => a.origin.upstreamCommit)
  )
  assert.deepEqual([...commits], [BIOICONS_COMMIT])
})

test('toda licencia que exige atribución trae su cadena de crédito', () => {
  const mal = ACTIVOS_MEDICOS
    .filter((a) => a.license.attributionRequired)
    .filter((a) => !a.attribution?.displayText || a.attribution.displayText.length < 20)
    .map((a) => a.id)
  assert.deepEqual(mal, [], `Sin texto de atribución: ${mal.join(', ')}`)

  // Y el crédito nombra al autor: una cadena que solo diga «vía BioIcons»
  // atribuiría la obra al almacén en vez de a quien la hizo.
  const sinAutor = ACTIVOS_MEDICOS
    .filter((a) => a.license.attributionRequired && a.catalogProvider !== 'ptem')
    .filter((a) => !a.attribution.displayText.includes(a.originalCreator.name))
    .map((a) => a.id)
  assert.deepEqual(sinAutor, [], `El crédito no nombra al autor: ${sinAutor.join(', ')}`)
})

test('la licencia declarada coincide con la que dice la ruta de origen', () => {
  // Es la comprobación que impide el error clásico: tomar la licencia del
  // REPOSITORIO (BioIcons se publica bajo MIT) y aplicarla a los dibujos de
  // terceros que aloja. La carpeta de la ruta es la fuente de verdad.
  const CARPETA = {
    'cc-0': 'CC0-1.0', mit: 'MIT', bsd: 'BSD-3-Clause',
    'cc-by-3.0': 'CC-BY-3.0', 'cc-by-4.0': 'CC-BY-4.0',
    'cc-by-sa-3.0': 'CC-BY-SA-3.0', 'cc-by-sa-4.0': 'CC-BY-SA-4.0',
  }
  const mal = []
  for (const a of ACTIVOS_MEDICOS) {
    if (a.catalogProvider !== 'bioicons') continue
    const m = a.origin.repositoryPath.match(/^static\/icons\/([^/]+)\//)
    assert.ok(m, `${a.id}: la ruta de origen no tiene la forma esperada`)
    const esperada = CARPETA[m[1]]
    if (esperada !== a.license.id) mal.push(`${a.id}: la ruta dice ${esperada} y la ficha ${a.license.id}`)
  }
  assert.deepEqual(mal, [], `Licencia mal atribuida:\n  ${mal.join('\n  ')}`)

  // SMART declara CC BY 4.0 en su propio sitio. Que sea eso y no CC BY 3.0
  // importa: BioIcons aloja copias HISTÓRICAS de Servier bajo CC BY 3.0, y
  // confundirlas atribuiría con la licencia equivocada.
  const smartMal = ACTIVOS_MEDICOS
    .filter((a) => a.catalogProvider === 'servier_smart' && a.license.id !== 'CC-BY-4.0')
    .map((a) => `${a.id} → ${a.license.id}`)
  assert.deepEqual(smartMal, [], `SMART debe ser CC BY 4.0: ${smartMal.join(', ')}`)
})

test('cada archivo declarado existe en public/ y su hash coincide', () => {
  const faltan = []
  const cambiados = []
  for (const a of ACTIVOS_MEDICOS) {
    const abs = path.join(PUBLICO, a.filePath)
    if (!fs.existsSync(abs)) { faltan.push(`${a.id} → public/${a.filePath}`); continue }
    const hash = createHash('sha256').update(fs.readFileSync(abs)).digest('hex')
    if (hash !== a.origin.sha256) cambiados.push(`${a.id} (archivo ${hash.slice(0, 12)}… ≠ catálogo ${a.origin.sha256.slice(0, 12)}…)`)
  }
  assert.deepEqual(faltan, [], `Archivos que no existen:\n  ${faltan.join('\n  ')}`)
  assert.deepEqual(cambiados, [], `Archivos que ya no son los catalogados:\n  ${cambiados.join('\n  ')}`)
})

test('ninguna ruta del catálogo puede salir del directorio de imágenes', () => {
  const mal = []
  for (const a of ACTIVOS_MEDICOS) {
    const p = a.filePath
    if (!p.startsWith('imagenes/medical/')) mal.push(`${a.id}: ${p}`)
    if (p.includes('..') || p.includes('\\') || p.startsWith('/')) mal.push(`${a.id}: traversal en ${p}`)
    // El nombre del archivo se construye desde el id: si no coincide, alguien
    // lo escribió a mano y la relación catálogo↔archivo deja de ser fiable.
    if (path.basename(p) !== `${a.id}.${a.format}`) mal.push(`${a.id}: el archivo se llama ${path.basename(p)}`)
  }
  assert.deepEqual(mal, [], `Rutas inválidas:\n  ${mal.join('\n  ')}`)
})

test('los SVG servidos no contienen nada ejecutable ni referencias externas', () => {
  const mal = []
  for (const a of ACTIVOS_MEDICOS) {
    if (a.format !== 'svg') continue
    const abs = path.join(PUBLICO, a.filePath)
    if (!fs.existsSync(abs)) continue
    const problemas = problemasDeSvg(fs.readFileSync(abs, 'utf8'), { nombre: a.id })
    if (problemas.length) mal.push(...problemas)
  }
  assert.deepEqual(mal, [], `SVG con contenido peligroso:\n  ${mal.join('\n  ')}`)
})

test('todo SVG servido conserva su viewBox y su nombre accesible', () => {
  const mal = []
  for (const a of ACTIVOS_MEDICOS) {
    if (a.format !== 'svg') continue
    const abs = path.join(PUBLICO, a.filePath)
    if (!fs.existsSync(abs)) continue
    const txt = fs.readFileSync(abs, 'utf8')
    // Sin viewBox el dibujo no escala: se pinta a su tamaño intrínseco y se
    // desborda o se queda diminuto, según el caso.
    if (!/viewBox\s*=/.test(txt)) mal.push(`${a.id}: sin viewBox`)
    if (!/<title>/.test(txt)) mal.push(`${a.id}: sin <title> (nombre accesible)`)
    if (!a.dimensions?.viewBox) mal.push(`${a.id}: el catálogo no declara viewBox`)
  }
  assert.deepEqual(mal, [], `SVG mal preparados:\n  ${mal.join('\n  ')}`)
})

test('una composición declara TODOS sus componentes y su crédito', () => {
  const composiciones = ACTIVOS_MEDICOS.filter((a) => a.kind === 'composite')
  assert.ok(composiciones.length >= 15, `solo hay ${composiciones.length} composiciones`)
  const mal = []
  for (const c of composiciones) {
    if (!Array.isArray(c.componentes)) { mal.push(`${c.id}: no declara la lista de componentes`); continue }
    // Una composición SIN componentes es legítima —el esquema de la columna
    // vertebral son trazos y rótulos de PTEM, sin obra de terceros— pero
    // entonces su crédito tiene que decirlo, no insinuar que hay componentes.
    if (c.componentes.length === 0) {
      if (!/No incorpora obra de terceros/i.test(c.attribution.displayText)) {
        mal.push(`${c.id}: sin componentes y sin declarar que es obra propia íntegra`)
      }
      if (c.license.attributionRequired) {
        mal.push(`${c.id}: sin componentes de terceros, no debería exigir atribución`)
      }
      if (!c.attribution.changes.length) mal.push(`${c.id}: debe declarar qué dibujó PTEM`)
      continue
    }
    for (const id of c.componentes) {
      if (!POR_ID.has(id)) mal.push(`${c.id}: el componente "${id}" no está en el catálogo`)
    }
    // Si algún componente exige atribución, la composición también, y su
    // crédito tiene que nombrar a esos autores.
    const conAtribucion = c.componentes.map((id) => POR_ID.get(id)).filter((x) => x?.license.attributionRequired)
    if (conAtribucion.length && !c.license.attributionRequired) {
      mal.push(`${c.id}: sus componentes exigen atribución y la composición no la declara`)
    }
    for (const comp of conAtribucion) {
      if (!c.attribution.displayText.includes(comp.originalCreator.name)) {
        mal.push(`${c.id}: el crédito no nombra a ${comp.originalCreator.name} (${comp.id})`)
      }
    }
    if (!c.attribution.changes.length) mal.push(`${c.id}: una composición es obra derivada y debe declarar sus cambios`)
  }
  assert.deepEqual(mal, [], `Composiciones mal acreditadas:\n  ${mal.join('\n  ')}`)
})

test('los 287 temas del plan tienen imagen y tienen icono', () => {
  const ids = todosLosTemas.map((t) => t.id)
  assert.equal(ids.length, 287, `el plan debería tener 287 temas, tiene ${ids.length}`)

  const sinImagen = ids.filter((id) => !(ACTIVOS_POR_TEMA[id] || []).length)
  assert.deepEqual(sinImagen, [], `Temas sin imagen (${sinImagen.length}): ${sinImagen.join(', ')}`)

  const sinIcono = ids.filter((id) => !ICONO_POR_TEMA[id])
  assert.deepEqual(sinIcono, [], `Temas sin icono: ${sinIcono.join(', ')}`)

  const rotos = []
  for (const id of ids) {
    for (const activoId of ACTIVOS_POR_TEMA[id]) {
      if (!POR_ID.has(activoId)) rotos.push(`${id} → ${activoId}`)
    }
    if (!POR_ID.has(ICONO_POR_TEMA[id])) rotos.push(`${id} (icono) → ${ICONO_POR_TEMA[id]}`)
  }
  assert.deepEqual(rotos, [], `Referencias a activos inexistentes:\n  ${rotos.join('\n  ')}`)
})

test('el mapa de temas no inventa temas que no están en el plan', () => {
  const ids = new Set(todosLosTemas.map((t) => t.id))
  const sobra = Object.keys(ACTIVOS_POR_TEMA).filter((id) => !ids.has(id))
  assert.deepEqual(sobra, [], `Temas inexistentes en el mapa: ${sobra.join(', ')}`)
})

test('el icono de un tema entra en el presupuesto de peso', () => {
  // Un icono de cabecera se pinta a 26–34 px y en la lista de un módulo salen
  // veinte a la vez. Pedir 400 KB por cada uno haría inusable la lista, así que
  // las ilustraciones pesadas se quedan como figura y no como icono.
  const mal = []
  for (const [temaId, activoId] of Object.entries(ICONO_POR_TEMA)) {
    const a = POR_ID.get(activoId)
    if (!a) continue
    const abs = path.join(PUBLICO, a.filePath)
    if (!fs.existsSync(abs)) continue
    const peso = fs.statSync(abs).size
    if (peso > PRESUPUESTO_ICONO) {
      mal.push(`${temaId} → ${activoId} (${Math.round(peso / 1024)} KB > ${Math.round(PRESUPUESTO_ICONO / 1024)} KB)`)
    }
  }
  assert.deepEqual(mal, [], `Iconos demasiado pesados:\n  ${mal.join('\n  ')}`)
})

test('los siete módulos tienen icono y es un activo del catálogo', () => {
  const mal = []
  for (const m of modulos) {
    const id = m.icono
    if (!id) { mal.push(`${m.id}: sin icono`); continue }
    if (!POR_ID.has(id)) mal.push(`${m.id}: el icono "${id}" no está en el catálogo`)
    if (ICONO_POR_MODULO[m.id] !== id) mal.push(`${m.id}: el plan dice "${id}" y el catálogo "${ICONO_POR_MODULO[m.id]}"`)
  }
  assert.deepEqual(mal, [], `Iconos de módulo:\n  ${mal.join('\n  ')}`)
})

test('ninguna imagen médica apunta a Drive ni a un dominio externo', () => {
  // La regresión que hay que impedir: volver a pegar un enlace. `rawFileUrl` es
  // la procedencia (tiene que ser una URL, es su función); lo que no puede ser
  // externo es `filePath`, que es lo que el navegador pide.
  const mal = ACTIVOS_MEDICOS
    .filter((a) => /^(https?:)?\/\//i.test(a.filePath) || /drive\.google|googleusercontent|wsrv\.nl/i.test(a.filePath))
    .map((a) => `${a.id} → ${a.filePath}`)
  assert.deepEqual(mal, [], `Imágenes servidas desde fuera: ${mal.join(', ')}`)

  // Y la procedencia solo puede venir de los dos bancos autorizados.
  const fuera = ACTIVOS_MEDICOS
    .filter((a) => a.origin.rawFileUrl)
    .filter((a) => !/^https:\/\/(raw\.githubusercontent\.com\/duerrsimon\/bioicons|smart\.servier\.com)\//.test(a.origin.rawFileUrl))
    .map((a) => `${a.id} → ${a.origin.rawFileUrl}`)
  assert.deepEqual(fuera, [], `Procedencia no autorizada: ${fuera.join(', ')}`)
})

test('no hay activos con licencia CompartirIgual sin declararla', () => {
  // CC BY-SA obliga a licenciar la obra derivada en los mismos términos. No se
  // prohíbe, pero no puede entrar sin que quede escrito: la política prefiere
  // CC0 → MIT → CC BY, y por eso hoy el catálogo no tiene ninguno.
  const sa = ACTIVOS_MEDICOS.filter((a) => a.license.shareAlike)
  for (const a of sa) {
    assert.ok(
      LICENCIAS[a.license.id]?.shareAlike,
      `${a.id} declara shareAlike pero su licencia ${a.license.id} no lo es`
    )
  }
  // Si algún día entra uno, esta prueba sigue pasando: lo que se protege es la
  // coherencia. La página /creditos es la que lo hace visible.
  assert.ok(Array.isArray(sa))
})

// ============================================================
//  Rótulos quemados en el dibujo
// ------------------------------------------------------------
//  Una regla del proyecto: lo que explica la imagen va en el pie y en el texto
//  alternativo, no dentro del mapa de bits ni del vector. Texto quemado no se
//  traduce, no se busca y no lo lee un lector de pantalla, y en este material
//  venía además en inglés: una guía en español con figuras bilingües.
//
//  Quince archivos lo traían. Seis se conservan por una razón declarada —son
//  figuras densas de líneas guía y borrar los rótulos las dejaría apuntando al
//  aire, sin que exista una versión sin rótulos en ninguno de los dos bancos— y
//  tres porque su texto NO es inglés: los números de la esfera de un cronómetro
//  son el dibujo, y «O₂», «CO₂», «P», «QRS», «T» y «mV» son notación universal.
//
//  Esta prueba FIJA esa lista. Si un activo nuevo entra con rótulos en inglés,
//  falla: la decisión hay que tomarla y declararla, no heredarla por descuido.
const CON_TEXTO_ACEPTADO = new Set([
  // Deuda declarada: sin equivalente sin rótulos en los bancos autorizados.
  'cp-servier-cavidad-oral',
  'cp-servier-colon',
  'cp-servier-diente',
  'cp-servier-tendon',
  'cp-servier-vellosidades',
  'cp-servier-via-aerea-superior',
  // Texto que no es inglés y que forma parte del dibujo o de la notación.
  'cp-servier-cronometro',
  'cp-servier-ecg',
  'cp-servier-intercambio-gaseoso',
])

test('ningún activo nuevo trae rótulos quemados sin declararlo', () => {
  const conTexto = []
  for (const a of ACTIVOS_MEDICOS) {
    if (a.format !== 'svg' || a.kind === 'composite') continue
    const abs = path.join(PUBLICO, a.filePath)
    if (!fs.existsSync(abs)) continue
    const txt = fs.readFileSync(abs, 'utf8')
    const rotulos = [...txt.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/gi)]
      .map((m) => m[1].replace(/<[^>]*>/g, '').trim())
      .filter(Boolean)
    if (rotulos.length) conTexto.push(a.id)
  }
  const nuevos = conTexto.filter((id) => !CON_TEXTO_ACEPTADO.has(id))
  assert.deepEqual(
    nuevos, [],
    'Activos con rótulos quemados sin decisión declarada. Añade `quitarTexto` en '
    + `seleccion.json, o justifícalo y añádelo a CON_TEXTO_ACEPTADO:\n  ${nuevos.join('\n  ')}`
  )
  // Y al revés: si una decisión deja de hacer falta, la lista sobra.
  const sobran = [...CON_TEXTO_ACEPTADO].filter((id) => !conTexto.includes(id))
  assert.deepEqual(sobran, [], `Ya no tienen texto quemado; quítalos de la lista: ${sobran.join(', ')}`)
})

test('retirar rótulos queda declarado como cambio sobre la obra original', () => {
  // Borrar el texto de un dibujo de otra persona es modificarlo. CC BY obliga a
  // indicar que hubo cambios, así que tiene que constar en la atribución.
  const retirados = ACTIVOS_MEDICOS.filter((a) => (
    a.kind !== 'composite' && a.attribution.changes.some((c) => /rótulos.*retirad/i.test(c))
  ))
  const mal = retirados
    .filter((a) => !a.license.attributionRequired && a.license.id !== 'CC0-1.0')
    .map((a) => a.id)
  assert.deepEqual(mal, [], `Retiro de rótulos sobre una licencia incoherente: ${mal.join(', ')}`)

  assert.ok(
    retirados.length >= 6,
    `solo ${retirados.length} activos declaran el retiro de rótulos; se esperaban al menos 6`
  )
})

test('los identificadores no se repiten y tienen forma segura', () => {
  const ids = ACTIVOS_MEDICOS.map((a) => a.id)
  assert.equal(new Set(ids).size, ids.length, 'hay identificadores duplicados en el catálogo')
  const mal = ids.filter((id) => !/^[a-z0-9][a-z0-9-]{2,63}$/.test(id))
  assert.deepEqual(mal, [], `Identificadores con forma inválida: ${mal.join(', ')}`)
})
