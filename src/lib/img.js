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

// URL de imagen lista para <img src>. Drive → CDN lh3 redimensionado del lado
// del servidor (=w####); cualquier otra cosa se devuelve tal cual (URL o '').
// lh3.googleusercontent.com es el CDN de Google: rápido y estable para
// incrustar imágenes públicas (no satura GitHub Pages).
export function driveSrc(input, ancho = 1200) {
  const id = parseDriveId(input)
  if (id) return `https://lh3.googleusercontent.com/d/${id}=w${ancho}`
  return input ? String(input).trim() : ''
}

// `srcset` con varios anchos para que el navegador elija según el dispositivo.
// Solo aplica a Drive (que sabe redimensionar); en URLs externas → undefined.
export function driveSrcSet(input, anchos = [480, 800, 1200, 1600]) {
  const id = parseDriveId(input)
  if (!id) return undefined
  return anchos
    .map((w) => `https://lh3.googleusercontent.com/d/${id}=w${w} ${w}w`)
    .join(', ')
}
