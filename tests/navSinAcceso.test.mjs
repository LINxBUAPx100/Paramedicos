// ============================================================
//  Sin acceso no se enseña NADA del temario, ni siquiera sus títulos
// ------------------------------------------------------------
//  Reportado el 30 de agosto de 2026 con una captura: el panel principal decía
//  «No has iniciado sesión» y, al mismo tiempo, el menú lateral listaba el
//  recorrido de estudio entero —«1.1 Introducción», «1.5 OVACE en adultos»,
//  «1.12 Heridas especiales»…— a un visitante sin cuenta.
//
//  Los títulos del plan SON contenido de la academia: son su índice, el
//  resultado de ordenar un programa completo. Enseñarlos es filtrar la
//  estructura del curso aunque no se abra ninguna lección.
//
//  Auditando el arreglo apareció un SEGUNDO caso, peor de encontrar: un alumno
//  con cuenta y academia pero SIN GRUPO. Ése pasa la puerta de la sesión y
//  falla la del plan de estudios, así que veía los 287 títulos mientras la
//  página le pedía un código de grupo. Por eso las dos puertas.
//
//  Aquí se comprueba sobre el propio archivo, sin montar React.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const leer = (...p) => readFileSync(path.join(RAIZ, ...p), 'utf8')
const LAYOUT = leer('src', 'components', 'Layout.jsx')
const HOME = leer('src', 'pages', 'Home.jsx')

test('el recorrido de estudio se vacía cuando no se puede ver contenido', () => {
  assert.match(
    LAYOUT,
    /const modulosVisibles\s*=\s*!veContenido\s*\?\s*\[\]/,
    'Layout debe vaciar `modulosVisibles`. Sin esto, el menú lateral lista los '
    + 'títulos del temario a quien no puede leerlos.'
  )
})

test('la puerta del menú son las DOS de RutaProtegida, no solo la sesión', () => {
  assert.match(
    LAYOUT,
    /const bloqueoDePrograma\s*=\s*motivoSinPrograma\(/,
    'Layout debe comprobar también el plan de estudios (motivoSinPrograma).'
  )
  assert.match(
    LAYOUT,
    /const veContenido\s*=\s*puedeAcceder\s*&&\s*!bloqueoDePrograma/,
    'Ver contenido exige las dos puertas: acceso Y programa asignado.'
  )
})

test('Layout lee de useAuth todo lo que las dos puertas necesitan', () => {
  for (const campo of ['puedeAcceder', 'rol', 'grupo', 'esSuperadmin']) {
    assert.ok(LAYOUT.includes(campo), `Layout no lee ${campo} de useAuth`)
  }
})

// El Home NO cuelga de RutaProtegida —es la raíz—, así que necesita su propia
// puerta o el carrusel de módulos enseña el índice del curso por su cuenta.
test('el Home también se cierra sin plan de estudios', () => {
  assert.match(
    HOME,
    /const bloqueo\s*=\s*motivoSinPrograma\(/,
    'Home debe comprobar el plan de estudios: la raíz no pasa por RutaProtegida.'
  )
  assert.match(
    HOME,
    /if \(bloqueo\) return <SinPrograma/,
    'Con bloqueo, Home no puede seguir pintando el carrusel de módulos.'
  )
})

test('los accesos al contenido llevan marca de que exigen acceso', () => {
  for (const ruta of ['/examen', '/progreso', '/logros', '/flashcards', '/buscar']) {
    const linea = LAYOUT.split('\n').find((l) => l.includes(`to: '${ruta}'`))
    assert.ok(linea, `no se encontró la entrada de menú para ${ruta}`)
    assert.match(linea, /soloConAcceso:\s*true/,
      `la entrada de menú de ${ruta} debe llevar soloConAcceso: true`)
  }
})

test('el buscador de la barra no se ofrece sin acceso', () => {
  const i = LAYOUT.indexOf('className="topbar-buscar"')
  assert.ok(i > 0, 'no se encontró el buscador de la barra')
  const antes = LAYOUT.slice(Math.max(0, i - 400), i)
  assert.match(antes, /\{veContenido && \(/,
    'El buscador entra en las lecciones: sin acceso no debe pintarse.')
})

// La marca, que también se reportó: el producto es PTEM, no «PTEM / T-Tem».
test('los textos legales dicen PTEM, no «PTEM / T-Tem»', () => {
  const archivos = [
    ['src', 'data', 'terminos.js'],
    ['src', 'components', 'AceptarTerminos.jsx'],
    ['src', 'pages', 'TerminosPage.jsx'],
  ]
  for (const partes of archivos) {
    assert.doesNotMatch(leer(...partes), /T-Tem/i,
      `${partes.join('/')} todavía nombra «T-Tem»: la plataforma es PTEM.`)
  }
})

// El sitemap llevaba una nota que decía «añadir aquí cada /tema/…». Eso
// publicaría el índice del plan en Google, que es justo lo contrario de lo que
// se pide. Se corrigió; esta prueba impide que vuelva.
test('el sitemap no lista NINGUNA ruta de contenido', () => {
  const sitemap = leer('public', 'sitemap.xml')
  // Solo las URLs declaradas. El comentario del archivo NOMBRA `/tema/` para
  // explicar por qué no puede estar, y mirar el texto entero lo confundiría
  // con una entrada real.
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  assert.ok(urls.length > 0, 'el sitemap no declara ninguna URL')
  for (const url of urls) {
    for (const prohibida of ['/tema/', '/modulo/', '/panel', '/admin', '/temario', '/editor']) {
      assert.ok(!url.includes(prohibida),
        `el sitemap publica "${url}", que es contenido de la academia`)
    }
  }
})
