// ============================================================
//  Juegos responsivos de imágenes PROPIAS (WebP + AVIF a varios anchos)
// ------------------------------------------------------------
//  El hero del paramédico ya se servía así: el mismo dibujo en cinco anchos y
//  en dos formatos, y el navegador elige. Las tres imágenes de las bandas del
//  Home, en cambio, seguían en Google Drive, con dos consecuencias:
//
//    · no se podían tocar (recortar, recolocar, cambiar de tamaño) sin depender
//      de lo que Drive decidiera servir, y el CDN de Drive no garantiza el
//      hotlink: el día que responde mal, el Home sale sin imágenes;
//    · cada visita descargaba un PNG de medio megabyte o más.
//
//  Este módulo construye las URLs de un juego ya generado por
//  `scripts/optimizar-imagenes.mjs`. No inventa nada: los anchos que se le pasan
//  tienen que existir como archivo en `public/`, y una prueba lo comprueba
//  (tests/imagenesTemario.test.mjs).
//
//  Módulo PURO (sin React): se prueba con `npm test`.
// ============================================================
import { rutaImagen } from './img.js'

/**
 * @param {string} nombre    base del archivo, sin ancho ni extensión ('logros')
 * @param {object} opciones
 *   carpeta  subcarpeta de public/ donde vive el juego ('home')
 *   anchos   anchos que EXISTEN como archivo, de menor a mayor
 *   sizes    atributo `sizes` del <img>: cuánto espacio ocupa en pantalla
 * @returns props para <Imagen …> (src, srcSet, srcSetAvif, sizes)
 */
export function juegoResponsivo(nombre, { carpeta = 'home', anchos = [480, 800, 1200], sizes } = {}) {
  const url = (w, ext) => rutaImagen(`${carpeta}/${nombre}-${w}.${ext}`)
  const set = (ext) => anchos.map((w) => `${url(w, ext)} ${w}w`).join(', ')
  return {
    // Reserva para navegadores sin srcset: el ancho intermedio, no el mayor.
    src: url(anchos[Math.min(1, anchos.length - 1)], 'webp'),
    srcSet: set('webp'),
    srcSetAvif: set('avif'),
    sizes,
  }
}

/** Rutas de TODOS los archivos de un juego (para comprobar que existen). */
export function archivosDelJuego(nombre, { carpeta = 'home', anchos = [480, 800, 1200] } = {}) {
  return anchos.flatMap((w) => [`${carpeta}/${nombre}-${w}.webp`, `${carpeta}/${nombre}-${w}.avif`])
}
