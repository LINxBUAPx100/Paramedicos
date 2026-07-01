// ============================================================
// Imágenes desde Google Drive (responsivas, sin saturar GitHub Pages)
// ------------------------------------------------------------
// Acepta el enlace de "Compartir" de Drive, una URL de Drive con ?id=,
// el ID pelado del archivo, o cualquier URL completa (Cloudinary, etc.).
// Usa el endpoint `thumbnail` de Drive, que REDIMENSIONA del lado del
// servidor (sz=w####) → servimos el tamaño justo a cada dispositivo.
// ============================================================

const PATRONES = [
  /\/file\/d\/([-\w]{20,})/, // .../file/d/ID/view
  /[?&]id=([-\w]{20,})/, // ...open?id=ID  ·  uc?export=view&id=ID
  /\/d\/([-\w]{20,})/, // .../d/ID
  /thumbnail\?id=([-\w]{20,})/, // ya es un thumbnail
]

// Extrae el ID de archivo de Drive de cualquier forma de enlace, o null.
export function parseDriveId(input) {
  if (!input) return null
  const s = String(input).trim()
  if (/^[-\w]{20,}$/.test(s)) return s // ID pelado
  for (const re of PATRONES) {
    const m = s.match(re)
    if (m) return m[1]
  }
  return null
}

// ¿La entrada apunta a Google Drive (o es un ID pelado)?
export function esDrive(input) {
  return parseDriveId(input) != null
}

// Proxy de imágenes wsrv.nl: CDN que cachea en el borde, redimensiona y
// convierte a WebP. Se usa para URLs externas (Wikimedia, etc.) porque:
//   · Wikimedia limita el hotlink directo (devuelve 429) y rasteriza los SVG
//     en cada carga → lento. El proxy lo sirve cacheado y ya rasterizado.
//   · WebP pesa ~40-60% menos que el PNG/JPG original → renderiza más rápido.
// La URL destino va codificada para no mezclar su query con la del proxy.
function proxyUrl(url, ancho) {
  const limpia = String(url).trim().replace(/^https?:\/\//, '')
  const destino = encodeURIComponent(limpia)
  return `https://wsrv.nl/?url=${destino}&w=${ancho}&output=webp&q=82&we`
}

// URL de imagen lista para <img src>. Tres rutas según la fuente:
//   · Drive → CDN lh3 de Google (=w####), rápido y ya redimensionado.
//   · Otra URL externa → proxy wsrv.nl (cache + WebP + resize).
//   · vacío → '' (el componente muestra el placeholder).
export function driveSrc(input, ancho = 1200) {
  const id = parseDriveId(input)
  if (id) return `https://lh3.googleusercontent.com/d/${id}=w${ancho}`
  const url = input ? String(input).trim() : ''
  if (!url) return ''
  return proxyUrl(url, ancho)
}

// `srcset` con varios anchos para que el navegador elija según el dispositivo.
// Drive → lh3; URL externa → proxy wsrv.nl (ambos redimensionan del lado del
// servidor). Sin fuente → undefined.
export function driveSrcSet(input, anchos = [480, 800, 1200, 1600]) {
  const id = parseDriveId(input)
  if (id) {
    return anchos
      .map((w) => `https://lh3.googleusercontent.com/d/${id}=w${w} ${w}w`)
      .join(', ')
  }
  const url = input ? String(input).trim() : ''
  if (!url) return undefined
  return anchos.map((w) => `${proxyUrl(url, w)} ${w}w`).join(', ')
}
