// ============================================================
//  El super-admin puede todo lo que puede un director
// ------------------------------------------------------------
//  Dicho por el dueño del producto el 2 de septiembre de 2026, al descubrir que
//  el botón para regenerar los índices del temario «solo lo puede hacer el
//  director»:
//
//    «el super admin debe poder hacer TODO lo que hacen los demás usuarios»
//
//  Y tenía razón, pero el diagnóstico era otro: **las reglas nunca se lo
//  impidieron.** `esSuper()` está en el `allow` de `agregados`, de
//  `calificaciones` y de las solicitudes. Lo que faltaba era la PANTALLA. El
//  director opera desde `/panel/*` y el super-admin desde `/admin/aca/:id/*`,
//  son dos árboles distintos, y tres secciones se habían quedado solo en el
//  primero: los índices del temario, los accesos y el libro de calificaciones.
//
//  Una capacidad que existe en el servidor y no existe en la interfaz es una
//  capacidad que no existe: el dueño de la plataforma acababa pidiéndole a un
//  director que pulsara un botón que él mismo podía pulsar.
//
//  ESTA PRUEBA IMPIDE QUE VUELVA A ABRIRSE EL HUECO. Cada sección nueva del
//  panel del director tiene que tener su equivalente en la consola, o declararse
//  aquí como excepción con su motivo. Añadir una pantalla al panel y olvidarla
//  en la consola deja de ser algo que se descubre meses después.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { SECCIONES_ACADEMIA } from '../src/lib/adminModelo.js'

const APP = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')

/**
 * Los `path` de un subárbol de rutas, delimitado contando etiquetas.
 *
 * Recortar «hasta la siguiente marca» no vale: el árbol de la consola tiene un
 * nivel anidado (`c/:cursoId`) y el del panel está seguido de otras rutas de la
 * aplicación. Cortar por el primer `</Route>` cerraría el grupo interior, y
 * cortar más allá se traga rutas ajenas — con eso, la prueba llegó a exigirle a
 * la consola un equivalente de `/editor`.
 */
function rutasDe(marcaInicio) {
  const i = APP.indexOf(marcaInicio)
  assert.ok(i > 0, `no se encontró el árbol de rutas «${marcaInicio}»`)
  const lineas = APP.slice(i).split('\n')
  const rutas = []
  let nivel = 0
  for (const linea of lineas) {
    const abre = linea.includes('<Route') && !linea.trimEnd().endsWith('/>')
    const cierra = linea.includes('</Route>')
    const m = linea.match(/<Route path="([^"]+)"/)
    // El nivel 0 es la raíz del propio árbol; sus hijos están en el 1. El nivel
    // intermedio de programa (`c/:cursoId`) tampoco es una sección.
    if (m && nivel > 0 && m[1] !== 'c/:cursoId') rutas.push(m[1])
    if (abre) nivel += 1
    if (cierra) {
      nivel -= 1
      if (nivel <= 0) break
    }
  }
  return rutas
}

const PANEL = rutasDe('<Route path="/panel"')
const CONSOLA = rutasDe('<Route path="aca/:academiaId"')

// Qué sección de la consola cubre cada sección del panel. La consola parte por
// programa lo que el panel enseña junto, así que la correspondencia no siempre
// es por el mismo nombre.
const EQUIVALE = {
  miembros: 'alumnos',      // «Alumnos y staff» hace lo de Miembros y más
  academia: 'ajustes',      // «Mi academia» = «Ajustes de la academia»
  grupos: 'grupos',
  invitaciones: 'invitaciones',
  accesos: 'accesos',
  calificaciones: 'calificaciones',
  contenido: 'contenido',
}

test('el recorrido encuentra los dos árboles de rutas', () => {
  // Cordura: sin esto, un cambio de formato en App.jsx dejaría las dos listas
  // vacías y la prueba pasaría en verde sin comparar nada.
  assert.ok(PANEL.length >= 7, `solo se leyeron ${PANEL.length} rutas del panel`)
  assert.ok(CONSOLA.length >= 7, `solo se leyeron ${CONSOLA.length} rutas de la consola`)
  assert.ok(PANEL.includes('contenido') && CONSOLA.includes('contenido'))
})

test('toda sección del panel del director existe también en la consola', () => {
  for (const ruta of PANEL) {
    const esperada = EQUIVALE[ruta]
    assert.ok(esperada,
      `«/panel/${ruta}» es una sección nueva y nadie decidió su equivalente en la `
      + 'consola del super-admin. Añádela a /admin/aca/:academiaId, o declárala '
      + 'aquí como excepción explicando por qué el super-admin no la necesita.')
    assert.ok(CONSOLA.includes(esperada),
      `«/panel/${ruta}» no tiene equivalente en la consola: falta «${esperada}» en `
      + '/admin/aca/:academiaId. El super-admin puede hacerlo en el servidor pero '
      + 'no tiene dónde pulsarlo.')
  }
})

test('las tres secciones que faltaban están', () => {
  // Las que motivaron esta prueba. Se nombran una a una para que borrarlas
  // duela en rojo y no en silencio.
  for (const s of ['accesos', 'calificaciones', 'contenido']) {
    assert.ok(CONSOLA.includes(s), `la consola perdió «${s}»`)
  }
})

test('cada sección de la consola tiene su pestaña, o no se puede llegar a ella', () => {
  // Una ruta sin pestaña es una pantalla a la que solo se llega escribiendo la
  // URL, que es otra forma de no existir.
  const conPestana = new Set(SECCIONES_ACADEMIA.map((s) => s.sufijo).filter(Boolean))
  for (const ruta of CONSOLA) {
    // La raíz del árbol y el nivel de programa no son secciones.
    if (ruta.startsWith('c/') || ruta.startsWith(':')) continue
    assert.ok(conPestana.has(ruta),
      `«${ruta}» es una ruta de la consola sin pestaña en SECCIONES_ACADEMIA`)
  }
})

test('el libro de calificaciones es UNO, compartido por las dos pantallas', () => {
  // Duplicarlo habría garantizado que las dos versiones divergieran a la primera
  // corrección, y las notas no son un sitio donde permitirse dos verdades.
  const admin = readFileSync(new URL('../src/pages/admin/academia/Calificaciones.jsx', import.meta.url), 'utf8')
  assert.match(admin, /import \{ LibroDeCalificaciones \} from '\.\.\/\.\.\/panel\/Calificaciones\.jsx'/,
    'la consola dejó de reutilizar el libro del panel')
  const panel = readFileSync(new URL('../src/pages/panel/Calificaciones.jsx', import.meta.url), 'utf8')
  assert.match(panel, /export function LibroDeCalificaciones\(\{/,
    'el libro volvió a atarse al contexto del panel del director')
})

test('el estado de los índices también es uno solo', () => {
  for (const archivo of ['../src/pages/panel/Contenido.jsx', '../src/pages/admin/academia/Contenido.jsx']) {
    const fuente = readFileSync(new URL(archivo, import.meta.url), 'utf8')
    assert.match(fuente, /CursoConIndices/,
      `${archivo} dejó de usar el componente compartido de índices`)
  }
})
