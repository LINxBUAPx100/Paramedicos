// ============================================================
//  Genera la imagen de previsualización social (Open Graph) 1200x630.
//  Compone al paramédico sobre el fondo plata de la marca + wordmark PTEM.
//  Uso:  node scripts/og-image.mjs   (requiere: npm i -D sharp)
// ============================================================
import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const raiz = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const paramedico = path.join(raiz, 'scripts', 'hero-src', 'heroParamedico.png')
const salida = path.join(raiz, 'public', 'og-image.jpg')

const W = 1200, H = 630

// Fondo de marca (plata + acento rojo + wordmark y tagline como SVG).
const fondo = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f4f6f8"/>
      <stop offset="1" stop-color="#d8dde3"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="0" y="0" width="14" height="${H}" fill="#e11d2a"/>
  <g font-family="Arial, Helvetica, sans-serif">
    <text x="70" y="250" font-size="150" font-weight="900" fill="#0c5fc4" letter-spacing="4">PTEM</text>
    <text x="74" y="315" font-size="34" font-weight="700" fill="#16181d">Técnico en Urgencias Médicas</text>
    <text x="74" y="365" font-size="26" font-weight="400" fill="#475569">Comprende el porqué, no solo memorices.</text>
    <rect x="74" y="410" width="300" height="6" rx="3" fill="#e11d2a"/>
  </g>
</svg>`)

// Paramédico: escalado a la altura del lienzo y anclado abajo-derecha.
const persona = await sharp(paramedico)
  .resize({ height: H, fit: 'inside' })
  .toBuffer()
const meta = await sharp(persona).metadata()
const pw = meta.width || H
const ph = meta.height || H
const left = Math.max(0, W - pw)   // pegado al borde derecho
const top = Math.max(0, H - ph)    // anclado abajo

await sharp(fondo)
  .composite([{ input: persona, top, left }])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(salida)

console.log('OG generada → public/og-image.jpg')
