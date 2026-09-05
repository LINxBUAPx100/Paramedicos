// ============================================================
//  IMÁGENES DEL SITIO  ·  PTEM
// ------------------------------------------------------------
//  Ya no hay ningún enlace de Google Drive en este archivo, y no debe volver a
//  haberlo. Todo lo que se sirve al alumno son archivos DEL REPOSITORIO:
//
//    · las tres bandas del Home → public/home/ (WebP y AVIF a varios anchos,
//      generados con `npm run optimizar:imagenes`);
//    · el material médico del temario → public/imagenes/medical/, importado de
//      BioIcons y Servier Medical Art con `npm run activos:importar` y
//      catalogado en src/data/activosMedicos.js con su autor y su licencia.
//
//  Por qué se retiró Drive: no es un hosting de imágenes —no garantiza el
//  hotlink y limita el tráfico automatizado—, obliga a compartir cada archivo a
//  mano, y sobre todo un enlace de Drive no dice quién hizo el dibujo ni bajo
//  qué licencia se puede publicar, así que no permitía atribuir nada.
//
//  Ver docs/archivo/PLAN-IMAGENES-PTEM.md y docs/INVENTARIO-ACTIVOS-MEDICOS.md.
// ============================================================
import { juegoResponsivo } from '../lib/imagenLocal.js'

// --- Home -------------------------------------------------------------------
//  Las tres imágenes de las bandas se sirven CON EL SITIO, en WebP y AVIF a tres
//  anchos, igual que el hero del paramédico. Antes eran enlaces de Google Drive
//  y eso costaba dos cosas a la vez:
//
//    · no se podían tocar. Recortar, recolocar o cambiar de tamaño dependía de
//      lo que Drive decidiera servir, y su CDN no garantiza el hotlink: el día
//      que responde mal, el Home sale sin imágenes;
//    · cada visita descargaba el PNG entero (0,5–1,1 MB por imagen).
//
//  Ahora pesan entre 9 y 48 KB según el dispositivo, y son archivos del
//  repositorio: se recortan, se mueven y se reemplazan como cualquier otro.
//  Los originales están en `scripts/img-src/` y se reconvierten con
//  `npm run optimizar:imagenes`. Los anchos declarados aquí TIENEN que existir
//  como archivo; `tests/imagenesTemario.test.mjs` lo comprueba.
//
//  El hero va aparte porque lo precarga index.html (es el LCP): sus URLs se
//  construyen en Home.jsx desde public/hero/.
// Cada banda ocupa una columna de un grid de dos y pasa a ancho completo en móvil.
const SIZES_HOME = '(max-width: 880px) 90vw, 620px'

//  Los tres archivos vienen RECORTADOS al dibujo (el script les quita el margen
//  transparente, que era entre el 49 % y el 65 % del lienzo). Dos consecuencias
//  que hay que declarar aquí:
//
//   · `anchos` es distinto en cada uno, porque al recortar cada dibujo se queda
//     con el ancho que de verdad tiene. Pedir un ancho que no existe deja un
//     `srcset` prometiendo un archivo que da 404.
//   · `aspecto` es la proporción REAL del dibujo. Al pasarla como `ratio` de la
//     caja, `object-fit: contain` la llena por completo: ni franjas vacías ni
//     recorte ni deformación. Antes el margen transparente falseaba la
//     proporción (los libros venían en un archivo vertical siendo cuadrados) y
//     por eso el dibujo salía pequeño dentro de una caja llena de aire.
export const BANDAS_HOME = [
  { clave: 'ponteAprueba', nombre: 'ponte-a-prueba', anchos: [480, 800, 1200], aspecto: '1418 / 1084' },
  { clave: 'atlas', nombre: 'logros', anchos: [480, 800, 960], aspecto: '973 / 959' },
  { clave: 'flashcards', nombre: 'flashcards', anchos: [480, 800, 1080], aspecto: '1092 / 1224' },
]

export const IMG = Object.fromEntries(
  BANDAS_HOME.map(({ clave, nombre, anchos, aspecto }) => [
    clave,
    { ...juegoResponsivo(nombre, { carpeta: 'home', anchos, sizes: SIZES_HOME }), ratio: aspecto },
  ])
)

// --- LOGROS: el Atlas se DERIVA del catálogo de activos médicos ------------
//
//  Antes esta sección era una lista escrita a mano de 21 entradas, trece de
//  ellas enlaces de Google Drive. Eso costaba tres cosas a la vez:
//
//   · Drive no es un hosting de imágenes. No garantiza el hotlink, hay que
//     compartir cada archivo a mano y una imagen que alguien mueva de carpeta
//     desaparece del temario sin aviso.
//   · No había procedencia. Un enlace de Drive no dice quién hizo el dibujo ni
//     bajo qué licencia se puede publicar, así que no se podía atribuir.
//   · No había cobertura. 21 imágenes para 287 temas: la mayoría de las
//     lecciones no tenía ningún apoyo visual.
//
//  Ahora las dos estructuras se calculan desde `src/data/activosMedicos.js`,
//  que genera `scripts/importar-activos-medicos.mjs` desde BioIcons y Servier
//  Medical Art. Consecuencias que conviene tener presentes:
//
//   · el archivo se sirve DESDE ESTE SITIO (`public/imagenes/medical/…`): sin
//     Drive, sin hotlink y sin proxy;
//   · cada entrada arrastra su `assetId`, y con él su autor, su licencia y su
//     texto de atribución, que es lo que permite mostrar «Créditos» junto a la
//     figura y llenar la página /creditos;
//   · los 287 temas del plan tienen al menos una imagen, y el pipeline aborta
//     si alguno se queda sin ella.
//
//  `src` se mantiene por compatibilidad —`galeriaDeLogros` deduplica por `src`
//  y `Contenido.jsx` resuelve los bloques `diagrama` por clave— pero la fuente
//  de verdad es `assetId`.
// Del catálogo LIGERO, no del completo: el Atlas necesita ruta, título y texto
// alternativo, y este módulo lo importa la portada. El catálogo entero son
// 500 kB y vive en lib/creditosActivos.js, para quien pregunta por la autoría.
import { ACTIVOS_POR_TEMA, ACTIVOS_LIGEROS } from './activosLigeros.js'
import { rutaImagen } from '../lib/img.js'

const ACTIVO_POR_ID = new Map(ACTIVOS_LIGEROS.map((a) => [a.id, a]))

// Tema canónico de cada activo: el PRIMER tema del plan que lo usa. Es a donde
// lleva su tarjeta en Logros y con qué tema se bloquea o se descubre.
const TEMA_CANONICO = (() => {
  const m = new Map()
  for (const [temaId, lista] of Object.entries(ACTIVOS_POR_TEMA)) {
    for (const activoId of lista) if (!m.has(activoId)) m.set(activoId, temaId)
  }
  return m
})()

// El Atlas: un activo, una tarjeta. `clave` es el propio assetId, de modo que
// un bloque `diagrama` puede seguir refiriéndose a una figura por su clave.
export const ATLAS_TEMAS = [...TEMA_CANONICO.entries()]
  .map(([activoId, temaId]) => {
    const a = ACTIVO_POR_ID.get(activoId)
    if (!a) return null
    return {
      clave: activoId,
      assetId: activoId,
      titulo: a.title,
      tema: temaId,
      src: rutaImagen(a.filePath),
      alt: a.accesibilidad?.alt || a.title,
      descripcion: a.accesibilidad?.descripcion || '',
      licencia: a.license.id,
      // Sin `autor`: nadie lo leía. La autoría se pide a creditosActivos.js,
      // que la tiene entera; repetirla aquí obligaba a cargar el catálogo
      // completo en la portada para un campo que no se pintaba en ningún sitio.
    }
  })
  .filter(Boolean)

// Imágenes de referencia por tema: es el mapa del catálogo, tal cual. La
// galería «Imágenes de referencia» de cada lección (TemaPage) sale de aquí.
export const IMAGENES_POR_TEMA = ACTIVOS_POR_TEMA

const ATLAS_POR_CLAVE = Object.fromEntries(ATLAS_TEMAS.map((t) => [t.clave, t]))

// Devuelve las imágenes de referencia de un tema, en el orden de pertinencia
// que fijó la curación. Se omite la que no tenga archivo resuelto.
export function imagenesDeTema(temaId) {
  return (IMAGENES_POR_TEMA[temaId] || [])
    .map((clave) => ATLAS_POR_CLAVE[clave])
    .filter((t) => t && (t.src || '').trim())
}
