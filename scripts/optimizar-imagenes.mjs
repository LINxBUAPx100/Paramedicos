// ============================================================
//  Optimiza las imágenes PROPIAS del sitio (hero + bandas del Home)
// ------------------------------------------------------------
//  Sustituye a `optimizar-hero.mjs`, que hacía lo mismo para una sola imagen.
//  Motivo del cambio: las tres imágenes de las bandas del Home vivían en Google
//  Drive, así que no se podían recortar, redimensionar ni recolocar sin pelearse
//  con lo que Drive decida servir ese día — y encima cada visita pagaba una
//  petición a un CDN ajeno que no garantiza el hotlink. Ahora se sirven con el
//  sitio, igual que el paramédico.
//
//  Qué hace, por cada imagen del catálogo:
//    · genera WebP y AVIF a varios anchos, CONSERVANDO la transparencia;
//    · nunca agranda (`withoutEnlargement`): si el original es más pequeño que
//      un ancho pedido, ese ancho se OMITE en vez de escribir un archivo que
//      miente sobre su tamaño (el navegador elegiría por el `srcset` una
//      variante que no tiene más píxeles que la anterior);
//    · imprime el peso resultante y la lista de anchos que de verdad existen,
//      que es lo que hay que declarar en `src/data/imagenes.js`.
//
//  Uso:  npm run optimizar:imagenes      (requiere: npm i --no-save sharp)
//
//  `sharp` no está en package.json a propósito: son ~30 MB de binarios por
//  plataforma que solo hacen falta el día que se añade o se recorta una imagen.
//  Los originales viven en `scripts/img-src/` para que esto sea repetible.
// ============================================================
import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const raiz = path.dirname(fileURLToPath(import.meta.url)) + '/..'

// Catálogo. `anchos` es el máximo que se pretende: los que superen el ancho del
// original se omiten solos.
const IMAGENES = [
  {
    nombre: 'paramedico',
    origen: 'scripts/hero-src/heroParamedico.png',
    destino: 'public/hero',
    anchos: [480, 800, 1200, 1600, 2000],
    nota: 'hero (LCP): lo precarga index.html',
  },
  // Bandas del Home. Se muestran a ~0.7fr del contenedor (unos 400–520 px CSS),
  // así que 1200 px ya cubre pantallas de alta densidad; pedir 2000 solo pesaría.
  {
    nombre: 'ponte-a-prueba',
    origen: 'scripts/img-src/ponteAprueba.png',
    destino: 'public/home',
    anchos: [480, 800, 1200],
    nota: 'banda «Ponte a Prueba»',
  },
  {
    nombre: 'logros',
    origen: 'scripts/img-src/atlas.png',
    destino: 'public/home',
    anchos: [480, 800, 1200],
    nota: 'banda «Descubre tus Logros»',
  },
  {
    nombre: 'flashcards',
    origen: 'scripts/img-src/flashcards.png',
    destino: 'public/home',
    anchos: [480, 800, 1200],
    nota: 'banda «FlashCards»',
  },
]

const kb = (b) => (b / 1024).toFixed(0) + ' KB'
const solo = process.argv[2] // opcional: optimizar una sola por nombre

for (const img of IMAGENES) {
  if (solo && img.nombre !== solo) continue
  const origen = path.join(raiz, img.origen)
  const destino = path.join(raiz, img.destino)
  await mkdir(destino, { recursive: true })

  const meta = await sharp(origen).metadata()
  const orig = await stat(origen)
  console.log(
    `\n${img.nombre}  (${img.nota})\n` +
    `  origen: ${img.origen} · ${meta.width}×${meta.height} · ${kb(orig.size)}` +
    `${meta.hasAlpha ? ' · con transparencia' : ''}`
  )

  const hechos = []
  for (const w of img.anchos) {
    if (w > meta.width) {
      console.log(`  ${String(w).padStart(4)}w  →  omitido (el original solo tiene ${meta.width} px)`)
      continue
    }
    const base = sharp(origen).resize({ width: w, withoutEnlargement: true })
    const webp = path.join(destino, `${img.nombre}-${w}.webp`)
    const avif = path.join(destino, `${img.nombre}-${w}.avif`)
    // Calidad alta y alfa conservado: el resultado es visualmente idéntico.
    await base.clone().webp({ quality: 82, effort: 6, alphaQuality: 90 }).toFile(webp)
    await base.clone().avif({ quality: 58, effort: 6 }).toFile(avif)
    const [a, b] = await Promise.all([stat(webp), stat(avif)])
    console.log(`  ${String(w).padStart(4)}w  →  webp ${kb(a.size).padStart(7)}   avif ${kb(b.size).padStart(7)}`)
    hechos.push(w)
  }
  console.log(`  anchos que existen: [${hechos.join(', ')}]  → declárralos en src/data/imagenes.js`)
}

console.log('\nListo.')
