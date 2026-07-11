// ============================================================
//  Optimiza el hero (heroParamedico.png) SIN cambiar la imagen.
//  Genera WebP y AVIF responsivos conservando la transparencia.
//  Uso:  node scripts/optimizar-hero.mjs   (requiere: npm i -D sharp)
// ============================================================
import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const raiz = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const origen = path.join(raiz, 'scripts', 'hero-src', 'heroParamedico.png')
const destino = path.join(raiz, 'public', 'hero')
const anchos = [480, 800, 1200, 1600, 2000]

await mkdir(destino, { recursive: true })

const kb = (b) => (b / 1024).toFixed(0) + ' KB'
const orig = await stat(origen)
console.log(`Origen: heroParamedico.png = ${kb(orig.size)}\n`)

for (const w of anchos) {
  const base = sharp(origen).resize({ width: w, withoutEnlargement: true })
  const webp = path.join(destino, `paramedico-${w}.webp`)
  const avif = path.join(destino, `paramedico-${w}.avif`)
  // quality alto + alpha conservado; el resultado es visualmente idéntico
  await base.clone().webp({ quality: 82, effort: 6, alphaQuality: 90 }).toFile(webp)
  await base.clone().avif({ quality: 58, effort: 6 }).toFile(avif)
  const [a, b] = await Promise.all([stat(webp), stat(avif)])
  console.log(`  ${w}w  →  webp ${kb(a.size).padStart(7)}   avif ${kb(b.size).padStart(7)}`)
}
console.log('\nListo → public/hero/')
