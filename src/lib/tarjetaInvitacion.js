// ============================================================
//  Tarjeta de invitación — TU imagen, con el código escrito encima
// ------------------------------------------------------------
//  Regla de este módulo: **la página no diseña nada**. La imagen es la que tú
//  entregas; lo único que se escribe encima es el CÓDIGO, en el sitio que
//  indique la configuración de abajo. Nada de títulos, ni nombres de academia,
//  ni fechas: si tu diseño lo dice, ya está dicho.
//
//  (La primera versión de esto sí componía la tarjeta entera —marca, rol,
//  grupo, caducidad—; era exactamente lo que no se quería: una imagen hecha por
//  la web en vez de por quien diseña.)
//
//  CÓMO SE CAMBIA LA IMAGEN
//
//    1. Deja tu archivo en `public/imagenes/invitaciones/`.
//    2. Escribe su nombre en `IMAGENES` (abajo). Si usas una sola para todo,
//       pon el mismo nombre en las cuatro claves, o deja solo `general`.
//    3. Ajusta `POSICION_CODIGO` si el hueco de tu diseño no cae donde está
//       previsto. Las coordenadas son PROPORCIONALES (0 a 1), así que valen
//       para cualquier resolución de imagen: 0.5 es el centro horizontal, 0.62
//       es un 62 % de la altura contando desde arriba.
//
//  Módulo PURO (sin React, sin canvas): se prueba con `npm test`.
// ============================================================

const CARPETA = 'imagenes/invitaciones'

// Archivo por tipo de invitación. Mientras no exista el archivo, la tarjeta
// avisa en pantalla en lugar de inventarse un fondo: es lo que evita que salga
// a WhatsApp una imagen que nadie diseñó.
export const IMAGENES = {
  alumno: `${CARPETA}/invitacion-alumno.png`,
  instructor: `${CARPETA}/invitacion-profesor.png`,
  admin_escuela: `${CARPETA}/invitacion-director.png`,
  // Códigos de academia, de grupo y de prueba (no tienen rol).
  general: `${CARPETA}/invitacion.png`,
}

/**
 * Dónde y cómo se escribe el código sobre la imagen.
 *
 *   x, y      → posición del CENTRO del texto, en proporción (0..1)
 *   tam       → altura de la letra, en proporción del alto de la imagen
 *   maxAncho  → ancho máximo que puede ocupar; si no cabe, se encoge sola
 *   color     → color del texto
 *   sombra    → contorno oscuro detrás; hace legible el código sobre cualquier
 *               fondo, que es lo que pasa cuando la imagen es una foto
 */
// Medido sobre el diseño real (invitacion-alumno.png, 1080×1350): el sujeto
// llega hasta x≈568 y el rótulo «codigo de acceso» ocupa de y 964 a 1000. El
// hueco libre es la franja x 580–1080 · y 780–950, y ahí va el código: centrado
// en ella (x≈820, y≈900), sin tocar al sujeto ni al rótulo de abajo.
export const POSICION_CODIGO = {
  x: 0.759,   // ≈ 820 px de 1080: centrado en el hueco de la derecha
  y: 0.667,   // ≈ 900 px de 1350: justo encima de «codigo de acceso»
  tam: 0.039, // ≈ 52 px de alto
  maxAncho: 0.43, // ≈ 464 px: no se acerca al sujeto ni se sale por la derecha
  // Negro como el resto de tu tipografía; el fondo del diseño es claro.
  color: '#0b1220',
  sombra: false,
  // Monoespaciada a propósito: el código se teclea, y en una tipografía normal
  // el 0 y la O, o el 1 y la l, se confunden.
  familia: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
}

export function imagenDe(rol) {
  return IMAGENES[rol] || IMAGENES.general
}

// Píxeles reales para una imagen concreta (la que sea, del tamaño que sea).
export function posicionEnPixeles(medidas, posicion = POSICION_CODIGO) {
  const ancho = Number(medidas?.ancho) || 0
  const alto = Number(medidas?.alto) || 0
  return {
    x: Math.round(posicion.x * ancho),
    y: Math.round(posicion.y * alto),
    tam: Math.max(1, Math.round(posicion.tam * alto)),
    maxAncho: Math.round(posicion.maxAncho * ancho),
    color: posicion.color,
    sombra: posicion.sombra,
    familia: posicion.familia,
  }
}

// Nombre del archivo que se descarga o se comparte. Sin espacios ni acentos:
// viaja por WhatsApp, por correo y por sistemas de archivos distintos.
export function nombreArchivoTarjeta({ academia = '', codigo = '' } = {}) {
  const limpio = (t) => String(t || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase()
  const partes = ['invitacion', limpio(academia), limpio(codigo)].filter(Boolean)
  return `${partes.join('-').slice(0, 80)}.png`
}
