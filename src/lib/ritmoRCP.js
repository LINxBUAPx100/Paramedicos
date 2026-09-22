// ============================================================
//  Ritmo de compresiones — la música de la práctica de RCP (PURO)
// ------------------------------------------------------------
//  PARA QUÉ SIRVE ESTO, porque no es decoración: las compresiones torácicas se
//  dan a 100–120 por minuto y mantener ese ritmo sin una referencia es difícil.
//  Poner una canción a ese tempo es una técnica de enseñanza reconocida —de ahí
//  que «Stayin' Alive» (≈103 bpm) se cite constantemente— y lo que se pidió es
//  tenerla a mano en el tema de RCP y en las prácticas que marque el profesorado.
//
//  ── LA SEGURIDAD ESTÁ EN QUE LA URL SE CONSTRUYE, NO SE COPIA.
//
//  El enlace lo pega una persona: un profesor en su práctica, o quien configure
//  la academia. Meter esa cadena en el `src` de un iframe sería abrir la
//  aplicación a cualquier página que alguien quiera incrustar, con la sesión del
//  alumno delante. Así que aquí NO se usa nunca lo pegado: se extraen el TIPO y
//  el ID, se comprueban contra una lista cerrada y un patrón exacto, y la URL se
//  arma desde cero contra `open.spotify.com`. Lo que no encaje, se rechaza.
//
//  Acepta las tres formas en que la gente copia esto, porque las tres circulan:
//  la URL de «compartir», el URI `spotify:` y el iframe entero del botón
//  «Insertar» —que es lo que Spotify pone en el portapapeles—.
//
//  ── EL REPRODUCTOR NO ES LA ÚNICA REFERENCIA, Y NO DEBE SERLO.
//
//  El reproductor incrustado de Spotify solo suena ENTERO si quien mira ha
//  iniciado sesión con Premium en ese navegador; si no, reproduce una vista
//  previa de unos 30 segundos. Para dos minutos de compresiones eso no basta,
//  así que el componente lleva además un metrónomo propio que no depende de
//  nadie. La música es el gancho; el metrónomo es la garantía.
//
//  Módulo PURO: sin React, sin red y sin reloj propio.
// ============================================================

/** El rango que enseña la guía: 100–120 compresiones por minuto. */
export const COMPRESIONES_MIN = 100
export const COMPRESIONES_MAX = 120
/** Lo que marca el metrónomo si nadie lo cambia: el centro del rango. */
export const COMPRESIONES_POR_DEFECTO = 110

/** Lo que Spotify admite incrustar y a nosotros nos sirve. Lista CERRADA. */
const TIPOS = ['playlist', 'album', 'track', 'artist', 'episode', 'show']

// Un id de Spotify son 22 caracteres base62. Ni uno más, ni uno menos.
const ID = /^[A-Za-z0-9]{22}$/

/**
 * La playlist de la academia, la que suena cuando nadie configura otra.
 *
 * ESTÁ VACÍA A PROPÓSITO, y conviene saber por qué. La academia tiene su lista
 * («RCP México»: Stayin' Alive, Billie Jean, Eye of the Tiger… todas entre 100
 * y 120 bpm), pero su identificador se intentó transcribir de una captura de
 * pantalla en la que el diálogo de Spotify cortaba el enlace por el borde. Ese
 * id devuelve «Page not found» —se comprobó abriéndolo—, así que se quitó: un
 * identificador inventado que casi funciona es PEOR que ninguno, porque el
 * reproductor abriría la lista de otra persona sin que nadie lo notara.
 *
 * Para ponerla, pegar aquí el enlace de «Compartir» o el código del botón
 * «Insertar» de esa lista. Valen las dos formas —`parsearSpotify` las
 * entiende— y esto es lo único que hay que tocar:
 *
 *     export const PLAYLIST_DE_LA_ACADEMIA = 'https://open.spotify.com/playlist/…'
 *
 * Mientras esté vacío, el ritmo funciona igual con el metrónomo, y cada
 * profesor puede poner su música en cada práctica.
 */
export const PLAYLIST_DE_LA_ACADEMIA = ''

/**
 * Los temas del temario donde el ritmo tiene sentido.
 *
 * Es una lista explícita y no una búsqueda por palabras en el título: «paro
 * cardiorrespiratorio» aparece en temas que NO son de compresiones —un tema de
 * farmacología, uno de ECG— y ponerles un reproductor de música sería ruido.
 * Los ids salen del plan oficial (`scripts/seed/plan-rescate.json`).
 */
export const TEMAS_CON_RITMO = [
  'm1-pab-rcp-legos-adulto',
  'm1-pai-rcp-pediatrico',
  'm4-card-pcr-megacode',
  'm6-svp-rcp-neonatal',
]

export const tieneRitmo = (temaId) => TEMAS_CON_RITMO.includes(String(temaId || ''))

/**
 * Qué hay dentro de lo que alguien pegó.
 *
 * @returns {{tipo: string, id: string}|null} `null` si no es de Spotify o no
 *   tiene la forma exacta. Nunca devuelve la cadena original: quien la use para
 *   construir una URL estaría confiando en lo pegado, que es justo lo que este
 *   módulo evita.
 */
export function parsearSpotify(entrada) {
  const texto = String(entrada || '').trim()
  if (!texto) return null

  // 1) El iframe entero del botón «Insertar»: se le saca el src y se sigue.
  const deIframe = /<iframe[^>]*\ssrc=["']([^"']+)["']/i.exec(texto)
  const crudo = deIframe ? deIframe[1] : texto

  // 2) URI corto: spotify:playlist:ID
  const uri = /^spotify:([a-z]+):([A-Za-z0-9]{22})$/i.exec(crudo)
  if (uri) return valido(uri[1], uri[2])

  // 3) URL. Se parsea de verdad —no con una expresión regular sobre el texto—
  //    porque `https://open.spotify.com.ejemplo.mx/…` supera cualquier «empieza
  //    por» ingenuo y no es Spotify.
  let url
  try { url = new URL(crudo) } catch { return null }
  if (url.protocol !== 'https:') return null
  if (url.hostname !== 'open.spotify.com') return null

  // /embed/playlist/ID, /playlist/ID, /intl-es/playlist/ID…
  const partes = url.pathname.split('/').filter(Boolean)
  const iTipo = partes.findIndex((p) => TIPOS.includes(p.toLowerCase()))
  if (iTipo === -1) return null
  return valido(partes[iTipo], partes[iTipo + 1])
}

function valido(tipo, id) {
  const t = String(tipo || '').toLowerCase()
  const i = String(id || '')
  if (!TIPOS.includes(t) || !ID.test(i)) return null
  return { tipo: t, id: i }
}

/**
 * La URL del reproductor incrustado, armada desde cero.
 *
 * `theme=0` es el tema oscuro de Spotify, que es el que no deslumbra en una
 * sala de prácticas con las luces bajas.
 */
export function urlDeEmbed(fuente) {
  const f = fuente?.tipo && fuente?.id ? valido(fuente.tipo, fuente.id) : parsearSpotify(fuente)
  if (!f) return ''
  return `https://open.spotify.com/embed/${f.tipo}/${f.id}?utm_source=ptem&theme=0`
}

/** El enlace para abrirlo en la aplicación de Spotify, fuera de la página. */
export function urlDeSpotify(fuente) {
  const f = fuente?.tipo && fuente?.id ? valido(fuente.tipo, fuente.id) : parsearSpotify(fuente)
  return f ? `https://open.spotify.com/${f.tipo}/${f.id}` : ''
}

/** Qué decirle a quien pegó algo que no sirve. Frase, no booleano. */
export function problemaDelEnlace(entrada) {
  const texto = String(entrada || '').trim()
  if (!texto) return ''
  if (parsearSpotify(texto)) return ''
  if (/spotify/i.test(texto)) {
    return 'Ese enlace de Spotify no tiene una forma que se pueda incrustar. Copia el enlace con «Compartir» o el código del botón «Insertar».'
  }
  return 'Solo se pueden incrustar enlaces de open.spotify.com.'
}

/** Compresiones por minuto, acotadas al rango que se enseña. */
export function ritmoValido(valor) {
  const n = Math.round(Number(valor))
  if (!Number.isFinite(n)) return COMPRESIONES_POR_DEFECTO
  return Math.min(COMPRESIONES_MAX, Math.max(COMPRESIONES_MIN, n))
}

/** El intervalo entre compresiones, en milisegundos. */
export const intervaloDe = (porMinuto) => 60000 / ritmoValido(porMinuto)

/**
 * La fuente que toca usar, en orden de preferencia.
 *
 * La de la actividad manda sobre la de la academia, y la de la academia sobre
 * la de por defecto: quien prepara una práctica concreta sabe mejor que nadie
 * qué quiere que suene en ella.
 */
export function fuenteDeRitmo({ actividad = '', academia = '' } = {}) {
  // `null` cuando no hay ninguna: el componente enseña solo el metrónomo y
  // dice qué falta, en vez de incrustar una lista al azar.
  return parsearSpotify(actividad) || parsearSpotify(academia)
    || parsearSpotify(PLAYLIST_DE_LA_ACADEMIA)
}
