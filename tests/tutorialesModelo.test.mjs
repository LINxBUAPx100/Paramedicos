// ============================================================
//  Pruebas del catálogo de tutoriales
// ------------------------------------------------------------
//  Dos reglas del dueño del producto se protegen aquí, y la primera es
//  innegociable:
//
//   1. En las páginas de TEMA no sale nunca. Ahí el usuario viene a leer
//      material clínico y un tutorial encima interrumpe justo lo que la
//      plataforma existe para cuidar.
//   2. Una vez en la vida de la cuenta. La decisión de si toca enseñarlo vive
//      en UNA función (`tutorialPendiente`), para que no se calcule de dos
//      maneras distintas en el componente y en las pruebas.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  TUTORIALES, CLAVES_TUTORIAL, RUTAS_SIN_TUTORIAL, RUTAS_PUBLICAS,
  claveDeRuta, tutorialDe, existeTutorial, tutorialPendiente,
  normalizarVistos, conteoDeVistos, TUTORIALES_PUBLICOS,
} from '../src/lib/tutorialesModelo.js'

// ---------- la regla que no se toca ----------

test('NINGUNA página de tema lleva tutorial, ni el quiz ni el examen del tema', () => {
  const rutas = [
    '/tema/m1-int-definicion',
    '/tema/m5-hemorragia-shock/quiz',
    '/tema/m4-far-generalidades/examen',
    '/tema/cualquier-cosa',
  ]
  for (const r of rutas) {
    assert.equal(claveDeRuta(r, { autenticado: true }), null,
      `"${r}" no puede llevar tutorial: es una lección`)
    assert.equal(tutorialPendiente(r, {}, { autenticado: true }), null)
  }
  assert.deepEqual(RUTAS_SIN_TUTORIAL, ['/tema/'])
})

test('las portadas públicas tampoco: quien las ve aún no usa la plataforma', () => {
  for (const r of RUTAS_PUBLICAS) {
    assert.equal(claveDeRuta(r, { autenticado: false }), null)
    assert.equal(claveDeRuta(r, { autenticado: true }), null)
  }
})

test('la raíz depende de la sesión: portada sin ella, Home con ella', () => {
  assert.equal(claveDeRuta('/', { autenticado: false }), null)
  assert.equal(claveDeRuta('/', { autenticado: true }), 'home')
  assert.equal(claveDeRuta('', { autenticado: true }), 'home')
})

// ---------- una sola vez ----------

test('un tutorial ya visto no vuelve a estar pendiente', () => {
  assert.equal(tutorialPendiente('/progreso', {}, { autenticado: true }), 'progreso')
  assert.equal(tutorialPendiente('/progreso', { progreso: true }, { autenticado: true }), null)
  // Haber visto otro no calla el que toca.
  assert.equal(tutorialPendiente('/progreso', { buscar: true }, { autenticado: true }), 'progreso')
})

test('una ruta sin tutorial nunca está pendiente, se haya visto lo que se haya visto', () => {
  assert.equal(tutorialPendiente('/ruta-inventada', {}, { autenticado: true }), null)
  assert.equal(tutorialPendiente('/tema/x', {}, { autenticado: true }), null)
})

// ---------- resolución de rutas ----------

test('las rutas específicas ganan a su prefijo', () => {
  const con = { autenticado: true }
  assert.equal(claveDeRuta('/panel', con), 'panel-resumen')
  assert.equal(claveDeRuta('/panel/miembros', con), 'panel-miembros')
  assert.equal(claveDeRuta('/panel/calificaciones', con), 'panel-calificaciones')
  assert.equal(claveDeRuta('/admin', con), 'admin-resumen')
  assert.equal(claveDeRuta('/admin/academias', con), 'admin-academias')
  assert.equal(claveDeRuta('/admin/logs', con), 'admin-logs')
})

test('las rutas con parámetro resuelven a su pantalla', () => {
  const con = { autenticado: true }
  assert.equal(claveDeRuta('/modulo/m1-propedeutico', con), 'modulo')
  assert.equal(claveDeRuta('/flashcards/m2-afi-cardiovascular', con), 'flashcards')
  assert.equal(claveDeRuta('/editor/RESCATE', con), 'editor')
})

test('claveDeRuta no revienta con basura', () => {
  assert.equal(claveDeRuta(null), null)
  assert.equal(claveDeRuta(undefined), null)
  assert.equal(claveDeRuta(123), null)
})

// ---------- integridad del catálogo ----------

test('cada tutorial tiene título y al menos un paso con texto', () => {
  assert.ok(CLAVES_TUTORIAL.length >= 20, 'faltan pantallas por cubrir')
  for (const clave of CLAVES_TUTORIAL) {
    const t = TUTORIALES[clave]
    assert.ok(t.titulo && t.titulo.length > 0, `${clave} no tiene título`)
    assert.ok(Array.isArray(t.pasos) && t.pasos.length > 0, `${clave} no tiene pasos`)
    for (const [i, paso] of t.pasos.entries()) {
      assert.ok(paso.texto && paso.texto.length > 10,
        `${clave}: el paso ${i + 1} no explica nada`)
      if (paso.objetivo != null) {
        assert.equal(typeof paso.objetivo, 'string')
        assert.ok(paso.objetivo.length > 0, `${clave}: objetivo vacío en el paso ${i + 1}`)
      }
    }
  }
})

test('toda ruta del catálogo apunta a un tutorial que existe', () => {
  const rutas = ['/', '/progreso', '/buscar', '/flashcards', '/examen', '/logros',
    '/cuenta', '/temario', '/modulo/x', '/editor', '/panel', '/panel/miembros',
    '/panel/grupos', '/panel/invitaciones', '/panel/accesos', '/panel/calificaciones',
    '/panel/contenido', '/panel/academia', '/admin', '/admin/academias',
    '/admin/usuarios', '/admin/contenido', '/admin/facturacion',
    '/admin/incidencias', '/admin/logs']
  for (const r of rutas) {
    const clave = claveDeRuta(r, { autenticado: true })
    assert.ok(clave, `"${r}" debería llevar tutorial y no lleva`)
    assert.ok(existeTutorial(clave), `"${r}" apunta a "${clave}", que no está en el catálogo`)
    assert.ok(tutorialDe(clave), `tutorialDe("${clave}") no devuelve nada`)
  }
})

// ---------- lo que se guarda ----------

test('normalizarVistos descarta claves inventadas y valores falsos', () => {
  assert.deepEqual(normalizarVistos({ home: true, inventado: true }), { home: true })
  assert.deepEqual(normalizarVistos({ home: false }), {})
  assert.deepEqual(normalizarVistos(null), {})
  assert.deepEqual(normalizarVistos('texto'), {})
  assert.deepEqual(normalizarVistos([1, 2]), {})
})

test('el conteo solo cuenta tutoriales que existen', () => {
  const c = conteoDeVistos({ home: true, progreso: true, inventado: true })
  assert.equal(c.vistos, 2)
  assert.equal(c.total, CLAVES_TUTORIAL.length)
})

// ============================================================
//  Sin acceso no se explica una pantalla que no se está viendo
// ------------------------------------------------------------
//  Visto en pantalla el 30-08-2026: entrando a /temario SIN sesión, el fondo
//  decía «No has iniciado sesión» y encima salía el tutorial «Visibilidad del
//  temario», explicando una herramienta del cuerpo docente a un desconocido.
// ============================================================
test('un tutorial de pantalla protegida no sale sin acceso', () => {
  const sinAcceso = { autenticado: false, puedeAcceder: false }
  for (const r of ['/temario', '/panel', '/panel/contenido', '/admin', '/progreso', '/examen']) {
    assert.equal(tutorialPendiente(r, {}, sinAcceso), null,
      `"${r}" no debe explicarse a quien no puede entrar`)
  }
})

test('«Tu cuenta» SÍ se explica sin sesión: es donde se canjea el código', () => {
  assert.deepEqual(TUTORIALES_PUBLICOS, ['cuenta'])
  assert.equal(tutorialPendiente('/cuenta', {}, { puedeAcceder: false }), 'cuenta')
})

test('con acceso, todo vuelve a la normalidad', () => {
  const conAcceso = { autenticado: true, puedeAcceder: true }
  assert.equal(tutorialPendiente('/temario', {}, conAcceso), 'temario')
  assert.equal(tutorialPendiente('/progreso', {}, conAcceso), 'progreso')
})

test('sin declarar puedeAcceder se asume que sí (no rompe a quien ya lo llamaba)', () => {
  assert.equal(tutorialPendiente('/progreso', {}, { autenticado: true }), 'progreso')
})

// ============================================================
//  Las anclas: verificadas una por una en pantalla
// ------------------------------------------------------------
//  Un `objetivo` es un selector CSS, y nada en el código impide apuntar a algo
//  inútil. Pasó: `logros` apuntaba a `.atlas-grid`, la rejilla ENTERA, que mide
//  casi 39 000 px de alto —medido el 31-08-2026 en el navegador—. El foco la
//  abarcaba toda, así que el «agujero» del velo era la página completa y el
//  paso no señalaba nada.
//
//  Esta lista es la de anclas COMPROBADAS en pantalla, con su tamaño real.
//  Añadir un `objetivo` nuevo obliga a medirlo y a apuntarlo aquí; si no, la
//  prueba falla. Es deliberadamente incómodo: es más barato que descubrirlo
//  cuando ya lo está viendo un alumno.
// ============================================================
const ANCLAS_VERIFICADAS = {
  '.menu-btn': '22x38 en /',
  '.topbar-buscar': '213x40 en /',
  '.topnav': '504x42 en /',
  '.barra-global': 'existe para el ALUMNO en /progreso; el staff ve otra pantalla y el paso sale centrado',
  '.atlas-card': '427x365 en /logros (una tarjeta, NO la rejilla)',
  '.consola-nav': '216x353 en /admin y en /panel',
}

test('toda ancla del catálogo está en la lista de verificadas en pantalla', () => {
  const usadas = new Set(
    Object.values(TUTORIALES)
      .flatMap((t) => t.pasos)
      .map((p) => p.objetivo)
      .filter(Boolean)
  )
  for (const sel of usadas) {
    assert.ok(
      Object.prototype.hasOwnProperty.call(ANCLAS_VERIFICADAS, sel),
      `El ancla "${sel}" no está verificada. Ábrela en el navegador, mide el `
      + 'elemento y añádelo a ANCLAS_VERIFICADAS con su tamaño. Un ancla que '
      + 'abarca la pantalla entera no señala nada.'
    )
  }
})

test('no se apunta a contenedores que envuelven la página entera', () => {
  // Los que ya se sabe que son demasiado grandes. `.atlas-grid` está aquí
  // porque fue el fallo real, no por precaución.
  const PROHIBIDOS = ['.atlas-grid', '.app', '.contenido', 'body', 'main', '.ph', '.lp']
  const usadas = Object.values(TUTORIALES)
    .flatMap((t) => t.pasos).map((p) => p.objetivo).filter(Boolean)
  for (const sel of usadas) {
    assert.ok(!PROHIBIDOS.includes(sel),
      `"${sel}" envuelve la pantalla entera: el foco no señalaría nada.`)
  }
})
