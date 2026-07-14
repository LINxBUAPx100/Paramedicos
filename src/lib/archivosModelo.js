// ============================================================
//  Archivos y Storage — lógica PURA (Fase 4)
// ------------------------------------------------------------
//  Sin Firebase. Define QUÉ archivos se aceptan y DÓNDE viven:
//
//    academias/{academiaId}/{carpeta}/{nombre}
//
//  Aislamiento: cada academia solo escribe y lee bajo SU prefijo (lo impone
//  storage.rules; aquí se valida antes para no ofrecer lo que el servidor
//  rechazaría, y para revisar REFERENCIAS guardadas en el contenido).
//
//  Seguridad:
//   - allowlist de extensiones y tipos MIME (nunca ejecutables),
//   - límite de tamaño por categoría,
//   - nombres sanitizados (sin rutas relativas, '..' ni caracteres raros),
//   - las rutas del cliente NUNCA se aceptan tal cual: se reconstruyen y
//     validan contra el prefijo de la academia.
// ============================================================

// Extensión → { mime aceptados, categoría }. SOLO lo listado se admite:
// ejecutables (.exe .bat .js .apk…), scripts y demás quedan fuera por diseño.
export const TIPOS_ARCHIVO = {
  pdf: { mimes: ['application/pdf'], categoria: 'documento' },
  png: { mimes: ['image/png'], categoria: 'imagen' },
  jpg: { mimes: ['image/jpeg'], categoria: 'imagen' },
  jpeg: { mimes: ['image/jpeg'], categoria: 'imagen' },
  webp: { mimes: ['image/webp'], categoria: 'imagen' },
  gif: { mimes: ['image/gif'], categoria: 'imagen' },
  mp3: { mimes: ['audio/mpeg'], categoria: 'audio' },
  mp4: { mimes: ['video/mp4'], categoria: 'video' },
  webm: { mimes: ['video/webm'], categoria: 'video' },
}

export const EXTENSIONES_PERMITIDAS = Object.keys(TIPOS_ARCHIVO)

// Límites de tamaño (bytes) por categoría.
export const TAMANO_MAXIMO = {
  imagen: 8 * 1024 * 1024,     // 8 MB
  documento: 15 * 1024 * 1024, // 15 MB
  audio: 20 * 1024 * 1024,     // 20 MB
  video: 50 * 1024 * 1024,     // 50 MB
}

export const CARPETAS_VALIDAS = ['archivos', 'imagenes']

export function extensionDe(nombre) {
  const m = String(nombre || '').toLowerCase().match(/\.([a-z0-9]+)$/)
  return m ? m[1] : ''
}

// Nombre de archivo seguro: minúsculas, sin acentos, sin separadores de ruta,
// conservando la extensión. "Guía RCP (v2).pdf" → "guia-rcp-v2.pdf".
export function nombreSeguro(nombre) {
  const ext = extensionDe(nombre)
  const base = String(nombre || '')
    .replace(/\.[a-z0-9]+$/i, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
  return `${base || 'archivo'}${ext ? `.${ext}` : ''}`
}

// Valida un archivo ANTES de subirlo. Devuelve mensaje de error o null.
export function validarArchivoParaSubir({ nombre, tipo, tamano }) {
  const ext = extensionDe(nombre)
  const spec = TIPOS_ARCHIVO[ext]
  if (!spec) {
    return `Tipo de archivo no permitido (.${ext || '?'}). Se aceptan: ${EXTENSIONES_PERMITIDAS.map((e) => `.${e}`).join(', ')}.`
  }
  if (tipo && !spec.mimes.includes(tipo)) {
    return `El contenido del archivo (${tipo}) no coincide con su extensión .${ext}.`
  }
  const limite = TAMANO_MAXIMO[spec.categoria]
  if (typeof tamano !== 'number' || tamano <= 0) return 'El archivo está vacío.'
  if (tamano > limite) {
    return `El archivo pesa ${(tamano / 1024 / 1024).toFixed(1)} MB; el máximo para ${spec.categoria} es ${Math.round(limite / 1024 / 1024)} MB.`
  }
  return null
}

// Ruta CANÓNICA de un archivo de la academia. `marcaTiempo` la pasa quien
// llama (los módulos puros no consultan el reloj) para evitar colisiones.
export function rutaArchivoAcademia(academiaId, carpeta, nombre, marcaTiempo) {
  if (!academiaId || /[/\\.]/.test(academiaId)) throw new Error('Academia inválida para la ruta de archivo.')
  if (!CARPETAS_VALIDAS.includes(carpeta)) throw new Error(`Carpeta inválida: usa ${CARPETAS_VALIDAS.join(' o ')}.`)
  const limpio = nombreSeguro(nombre)
  const prefijo = marcaTiempo ? `${marcaTiempo}-` : ''
  return `academias/${academiaId}/${carpeta}/${prefijo}${limpio}`
}

// ¿Una ruta de Storage pertenece al prefijo de ESTA academia?
// Rechaza '..', '//' y cualquier academia ajena (rutas del cliente jamás se
// aceptan sin pasar por aquí).
export function rutaEsDeAcademia(path, academiaId) {
  const p = String(path || '')
  if (!academiaId || p.includes('..') || p.includes('//')) return false
  return p.startsWith(`academias/${academiaId}/`)
}

// URL de descarga de Firebase Storage → ruta del objeto (o null si no es de
// Storage). Sirve para validar referencias guardadas dentro del contenido.
//   https://firebasestorage.googleapis.com/v0/b/<bucket>/o/<path-urlencoded>?...
export function rutaDesdeUrlStorage(url) {
  const m = String(url || '').match(/^https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/[^/]+\/o\/([^?]+)/i)
  if (!m) return null
  try {
    return decodeURIComponent(m[1])
  } catch {
    return null
  }
}

// Revisa TODAS las referencias de Storage dentro del contenido de un tema:
// archivos descargables (path + url) y cualquier URL de Storage en imágenes.
// Nada puede apuntar al almacenamiento de otra academia.
export function validarReferenciasStorage(contenido, academiaId) {
  const urls = []
  for (const a of contenido?.recursos?.archivos || []) {
    if (!rutaEsDeAcademia(a.path, academiaId)) {
      return `El archivo "${a.titulo}" apunta a un almacenamiento que no es de esta academia.`
    }
    urls.push({ url: a.url, donde: `el archivo "${a.titulo}"` })
  }
  for (const img of contenido?.recursos?.imagenes || []) urls.push({ url: img?.src, donde: 'una imagen de recursos' })
  for (const sec of contenido?.secciones || []) {
    for (const b of sec.bloques || []) {
      if (b.tipo === 'imagen') urls.push({ url: b.src, donde: `una imagen de la sección "${sec.titulo}"` })
      if (b.tipo === 'diagrama') urls.push({ url: b.src, donde: `un diagrama de la sección "${sec.titulo}"` })
    }
  }
  for (const { url, donde } of urls) {
    const ruta = rutaDesdeUrlStorage(url)
    if (ruta && !rutaEsDeAcademia(ruta, academiaId)) {
      return `Hay ${donde} que apunta al almacenamiento de otra academia.`
    }
  }
  return null
}
