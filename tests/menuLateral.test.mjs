// ============================================================
//  El botón de hamburguesa solo cuando hay algo que abrir
// ------------------------------------------------------------
//  En la portada sin sesión el cajón contenía un único enlace, «Inicio», que ya
//  está en la barra superior. El botón abría un panel que no ofrecía nada.
//
//  Estas pruebas cubren las DOS mitades, y la segunda es la que de verdad hace
//  falta: que al esconderlo para el visitante no se haya escondido también para
//  el alumno, que es quien lo necesita para navegar el temario. Ese caso no se
//  puede comprobar abriendo la página sin credenciales.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { hayMenuLateral } from '../src/lib/menuLateral.js'

// Los mismos enlaces que quedan tras filtrar por permisos en Layout.jsx.
const INICIO = { to: '/' }
const ESTUDIO = [
  INICIO,
  { to: '/examen' },
  { to: '/flashcards' },
  { to: '/logros' },
  { to: '/progreso' },
  { to: '/buscar' },
]

test('visitante sin cuenta: el cajón no ofrece nada, así que no hay botón', () => {
  assert.equal(
    hayMenuLateral({ navDrawer: [INICIO], topnav: [INICIO], modulos: 0 }),
    false,
    'con solo «Inicio», que ya está arriba, el botón abriría un panel vacío'
  )
})

test('alumno con temario: el botón SIGUE estando', () => {
  // La mitad que hay que blindar. Si esto se pusiera en false, el alumno se
  // quedaría sin forma de navegar los módulos.
  assert.equal(
    hayMenuLateral({
      navDrawer: ESTUDIO,
      topnav: [INICIO, { to: '/examen' }, { to: '/progreso' }, { to: '/logros' }],
      modulos: 7,
    }),
    true
  )
})

test('un módulo visible basta, aunque los enlaces se repitan arriba', () => {
  assert.equal(
    hayMenuLateral({ navDrawer: [INICIO], topnav: [INICIO], modulos: 1 }),
    true,
    'el recorrido de estudio SOLO vive en el cajón: si hay módulo, hay motivo'
  )
})

test('un enlace de cajón que no está arriba basta, sin temario', () => {
  // El caso que hace que esto no haya que mantener a mano: si mañana se añade
  // un enlace de cajón para visitantes, el botón vuelve solo.
  assert.equal(
    hayMenuLateral({
      navDrawer: [INICIO, { to: '/ayuda' }],
      topnav: [INICIO],
      modulos: 0,
    }),
    true
  )
})

test('staff sin temario abierto conserva su panel', () => {
  // Un director entra a una academia cuyos módulos aún no se han abierto: sus
  // accesos de gestión están en el cajón y no puede perderlos.
  assert.equal(
    hayMenuLateral({
      navDrawer: [INICIO, { to: '/panel' }],
      topnav: [INICIO, { to: '/panel' }],
      modulos: 0,
    }),
    false,
    'si su panel ya está en la barra de arriba, el cajón sigue sin aportar nada'
  )
  assert.equal(
    hayMenuLateral({
      navDrawer: [INICIO, { to: '/temario' }, { to: '/panel' }],
      topnav: [INICIO, { to: '/panel' }],
      modulos: 0,
    }),
    true,
    '«Temario (staff)» solo existe en el cajón: ahí sí hace falta el botón'
  )
})

test('sin argumentos no revienta y responde que no', () => {
  assert.equal(hayMenuLateral(), false)
  assert.equal(hayMenuLateral({}), false)
})

test('Layout usa la regla en lugar de reimplementarla', async () => {
  const { readFileSync } = await import('node:fs')
  const { fileURLToPath } = await import('node:url')
  const path = await import('node:path')
  const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const layout = readFileSync(path.join(raiz, 'src', 'components', 'Layout.jsx'), 'utf8')
  assert.match(layout, /hayMenuLateral/,
    'Layout debe importar la regla; una copia en el componente se desincroniza '
    + 'de estas pruebas sin que nadie se entere')
})
