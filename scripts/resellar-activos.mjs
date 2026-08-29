// ============================================================
//  Resellado del catálogo de activos médicos
// ------------------------------------------------------------
//  QUÉ HACE. Vuelve a calcular el `sha256` y las `dimensions` de cada activo
//  A PARTIR DEL ARCHIVO QUE YA ESTÁ EN public/, y reescribe esos dos campos en
//  el catálogo generado. No baja nada, no toca ninguna imagen y no cambia
//  autoría, licencia ni procedencia: solo vuelve a sellar lo que hay.
//
//  POR QUÉ EXISTE. El catálogo registra el hash de cada archivo servido, y
//  `tests/activosMedicos.test.mjs` lo compara contra el archivo real. Es una
//  buena regla: impide que una imagen cambie sin que cambie su procedencia.
//  Pero cuando las imágenes se optimizan legítimamente (29 de agosto de 2026,
//  commit 92ba65a), la única forma de resincronizar era volver a ejecutar el
//  importador completo, y eso exige alcanzar smart.servier.com. Si esa fuente
//  no responde, el importador deja fuera del catálogo los 48 activos de
//  Servier: el remedio sería peor que la avería.
//
//  CUÁNDO USARLO. Solo cuando los archivos de public/ son los buenos y el
//  catálogo se quedó atrás. Si lo que quieres es volver a bajar los activos de
//  origen, esto NO es lo tuyo: usa `npm run activos:importar`.
//
//  QUÉ NO HACE, a propósito: no acepta un archivo que no pase el saneado
//  estricto. Resellar es declarar «este archivo es el bueno», y eso no se
//  puede decir de un SVG con script o con referencias externas.
//
//  Uso:  npm run activos:resellar            (informa y reescribe)
//        npm run activos:resellar -- --dry-run   (solo informa)
// ============================================================
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { problemasDeSvg, dimensionesSvg, dimensionesPng } from './lib/svgSeguro.mjs'
import { ACTIVOS_MEDICOS } from '../src/data/activosMedicos.js'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PUBLICO = path.join(RAIZ, 'public')
const CATALOGO = path.join(RAIZ, 'src', 'data', 'activosMedicos.js')
const SECO = process.argv.includes('--dry-run')

const sha256 = (b) => createHash('sha256').update(b).digest('hex')

const errores = []
const cambios = []
const fichas = ACTIVOS_MEDICOS.map((a) => JSON.parse(JSON.stringify(a)))

for (const a of fichas) {
  const abs = path.join(PUBLICO, a.filePath)
  if (!existsSync(abs)) { errores.push(`[${a.id}] no existe public/${a.filePath}`); continue }
  const buf = readFileSync(abs)

  let dim = null
  if (a.format === 'svg') {
    const texto = buf.toString('utf8')
    const problemas = problemasDeSvg(texto, { nombre: a.filePath })
    if (problemas.length) {
      errores.push(`[${a.id}] no pasa el saneado estricto:\n      - ${problemas.join('\n      - ')}`)
      continue
    }
    dim = dimensionesSvg(texto)
  } else if (a.format === 'png') {
    dim = dimensionesPng(buf)
  }
  if (!dim) { errores.push(`[${a.id}] no se pudieron leer las dimensiones de ${a.filePath}`); continue }

  const hash = sha256(buf)
  const detalle = []
  if (hash !== a.origin.sha256) detalle.push(`hash ${a.origin.sha256.slice(0, 8)}…→${hash.slice(0, 8)}…`)
  const dimVieja = a.dimensions || {}
  if (dim.width !== dimVieja.width || dim.height !== dimVieja.height || (dim.viewBox || '') !== (dimVieja.viewBox || '')) {
    detalle.push(`dim ${dimVieja.width}×${dimVieja.height}→${dim.width}×${dim.height}`)
  }
  if (detalle.length) cambios.push(`${a.id}: ${detalle.join(' · ')}`)

  a.origin.sha256 = hash
  a.dimensions = { width: dim.width, height: dim.height, viewBox: dim.viewBox || '' }
}

console.log('\n— Resellado del catálogo de activos médicos —\n')
if (errores.length) {
  console.error(`  ${errores.length} problema(s); no se reescribe nada:\n`)
  for (const e of errores) console.error(`   · ${e}`)
  process.exit(1)
}

if (!cambios.length) {
  console.log('  El catálogo ya coincide con los archivos de public/. Nada que hacer.\n')
  process.exit(0)
}

console.log(`  ${cambios.length} de ${fichas.length} activos cambiaron:\n`)
for (const c of cambios.slice(0, 12)) console.log(`   · ${c}`)
if (cambios.length > 12) console.log(`   … y ${cambios.length - 12} más`)

if (SECO) { console.log('\n  --dry-run: no se escribió nada.\n'); process.exit(0) }

// Se sustituye SOLO el bloque del arreglo, con el mismo formato que escribe el
// importador (`JSON.stringify(fichas, null, 2)`), para que el archivo no se
// diferencie en nada más que en los campos reseleccionados.
const txt = readFileSync(CATALOGO, 'utf8')
const marca = 'export const ACTIVOS_MEDICOS = ['
const ini = txt.indexOf(marca)
if (ini < 0) { console.error('  No se encontró ACTIVOS_MEDICOS en el catálogo.'); process.exit(1) }
const fin = txt.indexOf('\n]', ini)
if (fin < 0) { console.error('  No se encontró el cierre del arreglo.'); process.exit(1) }

const nuevo = txt.slice(0, ini)
  + 'export const ACTIVOS_MEDICOS = ' + JSON.stringify(fichas, null, 2)
  + txt.slice(fin + 2)
writeFileSync(CATALOGO, nuevo)
console.log(`\n  src/data/activosMedicos.js resellado · ${fichas.length} activos\n`)
