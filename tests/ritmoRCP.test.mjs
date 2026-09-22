// ============================================================
//  Ritmo de compresiones — y el agujero que esta suite cierra
// ------------------------------------------------------------
//  LO QUE NO PUEDE VOLVER: que la cadena que pega una persona acabe en el `src`
//  de un iframe.
//
//  El enlace de música lo escribe un profesor en su práctica. Si se copiara tal
//  cual al reproductor, cualquiera con permiso para crear una evaluación podría
//  incrustar la página que quisiera dentro de la aplicación, con la sesión del
//  alumno delante. Por eso aquí NUNCA se usa lo pegado: se extraen el tipo y el
//  id, se comprueban contra una lista cerrada y un patrón exacto, y la URL se
//  arma desde cero.
//
//  Módulo PURO: sin red y sin React.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  COMPRESIONES_MAX, COMPRESIONES_MIN, COMPRESIONES_POR_DEFECTO, PLAYLIST_DE_LA_ACADEMIA,
  TEMAS_CON_RITMO, fuenteDeRitmo, intervaloDe, parsearSpotify, problemaDelEnlace,
  ritmoValido, tieneRitmo, urlDeEmbed, urlDeSpotify,
} from '../src/lib/ritmoRCP.js'

const ID = '4LluiTmvtkD2UR7qH6xwqG'

// ── LO QUE SE ACEPTA ────────────────────────────────────────────────────────

test('las tres formas en que la gente copia esto valen', () => {
  // La URL de «Compartir», el URI corto y el iframe entero del botón
  // «Insertar», que es lo que Spotify deja en el portapapeles.
  const esperado = { tipo: 'playlist', id: ID }
  assert.deepEqual(parsearSpotify(`https://open.spotify.com/playlist/${ID}`), esperado)
  assert.deepEqual(parsearSpotify(`https://open.spotify.com/playlist/${ID}?si=7887e7f4c8294293`), esperado)
  assert.deepEqual(parsearSpotify(`spotify:playlist:${ID}`), esperado)
  assert.deepEqual(parsearSpotify(
    `<iframe data-testid="embed-iframe" style="border-radius:12px" src="https://open.spotify.com/embed/playlist/${ID}?utm_source=generator&si=7887e7f4c8294293" width="100%" height="352"></iframe>`
  ), esperado)
  // Y el enlace con idioma, que es como lo copia media aplicación móvil.
  assert.deepEqual(parsearSpotify(`https://open.spotify.com/intl-es/playlist/${ID}`), esperado)
})

test('una pista suelta también sirve: hay quien pone una sola canción', () => {
  assert.deepEqual(parsearSpotify(`https://open.spotify.com/track/${ID}`), { tipo: 'track', id: ID })
})

// ── LO QUE SE RECHAZA ───────────────────────────────────────────────────────

test('NO SE ACEPTA NADA QUE NO SEA open.spotify.com', () => {
  const malos = [
    // El clásico: un dominio que «empieza por» lo correcto y no lo es.
    `https://open.spotify.com.ejemplo.mx/playlist/${ID}`,
    `https://openspotify.com/playlist/${ID}`,
    `https://evil.mx/embed/playlist/${ID}`,
    // Sin https no se incrusta: el navegador lo bloquearía y además no es de fiar.
    `http://open.spotify.com/playlist/${ID}`,
    'javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    // Un iframe pegado que apunta a otro sitio: se saca el src y se rechaza igual.
    '<iframe src="https://evil.mx/x"></iframe>',
    '', null, undefined, {},
  ]
  for (const malo of malos) {
    assert.equal(parsearSpotify(malo), null, `pasó ${String(malo).slice(0, 40)}`)
    assert.equal(urlDeEmbed(malo), '', 'se construyó una URL de algo que no es de Spotify')
  }
})

test('un id con la longitud equivocada no pasa', () => {
  // 22 caracteres base62, ni uno más ni uno menos. Sin esto, cualquier ruta
  // (`/playlist/../../algo`) pasaría por buena.
  assert.equal(parsearSpotify('https://open.spotify.com/playlist/corto'), null)
  assert.equal(parsearSpotify(`https://open.spotify.com/playlist/${ID}x`), null)
  assert.equal(parsearSpotify('https://open.spotify.com/playlist/../../etc'), null)
})

test('un tipo que no está en la lista no se incrusta', () => {
  assert.equal(parsearSpotify(`https://open.spotify.com/user/${ID}`), null)
  assert.equal(parsearSpotify(`https://open.spotify.com/search/${ID}`), null)
})

// ── LA URL SE CONSTRUYE, NO SE COPIA ────────────────────────────────────────

test('la URL del reproductor se arma desde cero', () => {
  // Aunque lo pegado traiga parámetros raros, lo que sale es siempre la misma
  // forma: nada de lo que escribió una persona viaja al `src`.
  const url = urlDeEmbed(`https://open.spotify.com/playlist/${ID}?si=x&algo=<script>`)
  assert.equal(url, `https://open.spotify.com/embed/playlist/${ID}?utm_source=ptem&theme=0`)
  assert.equal(urlDeSpotify(`spotify:playlist:${ID}`), `https://open.spotify.com/playlist/${ID}`)
})

test('la escritura guarda la forma NORMALIZADA, no lo que se pegó', () => {
  const CAPA = readFileSync(new URL('../src/lib/firebase/calificaciones.js', import.meta.url), 'utf8')
  assert.match(CAPA, /ritmoEnlace: practicaRCP === true \? \(urlDeSpotify\(ritmoEnlace\) \|\| ''\) : ''/,
    'se guarda el texto pegado en vez de la forma comprobada')
})

test('el reproductor no se monta hasta que alguien lo pide', () => {
  // Montarlo al abrir la lección metería las cookies de Spotify en el navegador
  // de todos los alumnos que pasen por el tema, lo escuchen o no.
  const COMP = readFileSync(new URL('../src/components/RitmoRCP.jsx', import.meta.url), 'utf8')
  assert.match(COMP, /cargarReproductor \? \(/)
  assert.match(COMP, /const \[cargarReproductor, setCargarReproductor\] = useState\(false\)/)
  assert.match(COMP, /referrerPolicy="no-referrer"/)
  // Y el metrónomo no depende de Spotify ni de la red.
  assert.match(COMP, /AudioContext/)
})

// ── EL RITMO ────────────────────────────────────────────────────────────────

test('el metrónomo no se sale del rango que se enseña', () => {
  assert.equal(COMPRESIONES_MIN, 100)
  assert.equal(COMPRESIONES_MAX, 120)
  assert.equal(COMPRESIONES_POR_DEFECTO, 110)
  assert.equal(ritmoValido(300), 120, 'se pudo marcar un ritmo que no se enseña')
  assert.equal(ritmoValido(10), 100)
  assert.equal(ritmoValido('115'), 115)
  assert.equal(ritmoValido('rápido'), 110, 'un valor ilegible dejó el metrónomo sin ritmo')
  // 110 por minuto son ~545 ms entre compresión y compresión.
  assert.equal(Math.round(intervaloDe(110)), 545)
  assert.equal(Math.round(intervaloDe(100)), 600)
})

// ── DÓNDE APARECE ───────────────────────────────────────────────────────────

test('solo en los temas donde de verdad se comprime', () => {
  // Por lista explícita y no por buscar «paro cardiorrespiratorio» en el
  // título: esa frase aparece en temas de farmacología y de ECG, y ahí un
  // reproductor de música es ruido.
  assert.ok(tieneRitmo('m1-pab-rcp-legos-adulto'))
  assert.ok(tieneRitmo('m4-card-pcr-megacode'))
  assert.equal(tieneRitmo('m4-far-dosis-urgencia'), false)
  assert.equal(tieneRitmo(''), false)
  assert.equal(TEMAS_CON_RITMO.length, 4)
})

test('la música de la práctica manda sobre la de la academia', () => {
  // Quien prepara una práctica concreta sabe mejor que nadie qué quiere que
  // suene en ella.
  const otra = '1DZlSrleWpwcOTPCzoNpUf'
  assert.equal(fuenteDeRitmo({ actividad: `spotify:playlist:${otra}` }).id, otra)
  assert.equal(fuenteDeRitmo({ academia: `spotify:playlist:${otra}` }).id, otra)
  assert.equal(
    fuenteDeRitmo({ actividad: `spotify:playlist:${ID}`, academia: `spotify:playlist:${otra}` }).id,
    ID
  )
  // SIN NADA CONFIGURADO NO SE INVENTA UNA LISTA. El id de la de la academia se
  // transcribió de una captura, daba «Page not found» al abrirlo y se retiró:
  // incrustar una lista al azar abriría la de otra persona sin que nadie lo
  // notara. Queda el metrónomo, que es lo que de verdad marca el ritmo.
  assert.equal(fuenteDeRitmo({}), null)
  assert.equal(PLAYLIST_DE_LA_ACADEMIA, '', 'se configuró una lista sin comprobar que existe')
  // Y un enlace roto en la actividad tampoco rompe la pantalla.
  assert.equal(fuenteDeRitmo({ actividad: 'https://evil.mx/x' }), null)
  assert.equal(urlDeEmbed(fuenteDeRitmo({})), '')
})

test('el aviso explica qué se pegó mal, no solo que está mal', () => {
  assert.equal(problemaDelEnlace(''), '', 'un campo vacío no es un error')
  assert.equal(problemaDelEnlace(`spotify:playlist:${ID}`), '')
  assert.match(problemaDelEnlace('https://open.spotify.com/user/algo'), /no tiene una forma/)
  assert.match(problemaDelEnlace('https://youtube.com/watch?v=x'), /open\.spotify\.com/)
})

test('la práctica de RCP viaja en la evaluación', () => {
  const MODELO = readFileSync(new URL('../src/lib/calificacionesModelo.js', import.meta.url), 'utf8')
  assert.match(MODELO, /practicaRCP: ev\?\.practicaRCP === true/,
    'una evaluación dejó de poder marcarse como práctica de RCP')
  const ALUMNO = readFileSync(new URL('../src/components/MisCalificaciones.jsx', import.meta.url), 'utf8')
  assert.match(ALUMNO, /evaluacion\.practicaRCP &&/, 'el alumno dejó de ver el ritmo en su práctica')
  const PROFE = readFileSync(new URL('../src/pages/panel/Calificaciones.jsx', import.meta.url), 'utf8')
  assert.match(PROFE, /Habrá práctica de RCP/, 'el profesorado dejó de poder marcarlo')
})
