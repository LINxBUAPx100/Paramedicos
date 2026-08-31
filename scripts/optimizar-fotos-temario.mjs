// ============================================================
//  Optimiza las FOTOGRAFÍAS DE CONTEXTO del temario
// ------------------------------------------------------------
//  Hermano de `optimizar-imagenes.mjs`, que lleva un catálogo escrito a mano
//  de imágenes sueltas del sitio. Éste no lleva catálogo propio a propósito:
//  recorre `scripts/img-src/temario/` y saca AVIF y WebP a los anchos que
//  declara `src/data/fotosTemario.js`. Una sola lista, la que ya usa la
//  aplicación, para que no puedan desincronizarse.
//
//  Los originales pesan ~2 MB cada uno; a 800 px salen entre 60 y 120 kB.
//
//  Uso:  npm run optimizar:fotos      (requiere: npm i --no-save sharp)
//
//  `sharp` no está en package.json a propósito: son ~30 MB de binarios que
//  solo hacen falta el día que se añade o se reemplaza una foto.
// ============================================================
import sharp from 'sharp'
import { mkdir, readdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { ANCHOS, CARPETA, FOTOS, RESERVADAS } from '../src/data/fotosTemario.js'

const raiz = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const origen = path.join(raiz, 'scripts', 'img-src', CARPETA)
const destino = path.join(raiz, 'public', 'imagenes', CARPETA)
await mkdir(destino, { recursive: true })

const kb = (b) => (b / 1024).toFixed(0) + ' KB'
const archivos = (await readdir(origen)).filter((f) => /\.(png|jpe?g)$/i.test(f))

// Las fotos declaradas TIENEN que existir como archivo. Si falta una, el
// contenido apuntaría a un 404 y el fallo se vería en producción, no aquí.
const declaradas = new Set([...FOTOS.map((f) => f.clave), ...RESERVADAS.map((r) => r.clave)])
const presentes = new Set(archivos.map((f) => f.replace(/\.(png|jpe?g)$/i, '')))
const faltan = [...declaradas].filter((c) => !presentes.has(c))
if (faltan.length) {
  console.error(`✗ Declaradas en fotosTemario.js pero SIN original:\n   ${faltan.join('\n   ')}`)
  process.exit(1)
}
const sobran = [...presentes].filter((c) => !declaradas.has(c))
if (sobran.length) console.warn(`! Originales que nadie declara (no se usarán): ${sobran.join(', ')}`)

let total = 0
for (const archivo of archivos.sort()) {
  const nombre = archivo.replace(/\.(png|jpe?g)$/i, '')
  const entrada = path.join(origen, archivo)
  const meta = await sharp(entrada).metadata()
  const orig = await stat(entrada)
  const pesos = []
  for (const w of ANCHOS) {
    if (w > meta.width) continue
    const base = sharp(entrada).resize({ width: w, withoutEnlargement: true })
    const webp = path.join(destino, `${nombre}-${w}.webp`)
    const avif = path.join(destino, `${nombre}-${w}.avif`)
    await base.clone().webp({ quality: 80, effort: 6 }).toFile(webp)
    await base.clone().avif({ quality: 55, effort: 6 }).toFile(avif)
    const [a, b] = await Promise.all([stat(webp), stat(avif)])
    total += a.size + b.size
    pesos.push(`${w}w ${kb(a.size)}/${kb(b.size)}`)
  }
  console.log(`${nombre.padEnd(36)} ${kb(orig.size).padStart(8)} → ${pesos.join('  ')}`)
}

console.log(`\n${archivos.length} fotos · ${kb(total)} en total (todas las variantes).`)
