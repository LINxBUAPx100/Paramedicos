// ============================================================
//  Recarga cuando se publica una versión nueva — módulo puro
// ------------------------------------------------------------
//  Lo que se protege: que un despliegue no deje al usuario con
//  «Failed to fetch dynamically imported module» y sin salida, y que el remedio
//  NO sea un bucle de recargas si el archivo falta de verdad —ni siquiera en el
//  navegador que no deja escribir en sessionStorage.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

// Escenario mínimo de navegador: eventos, sessionStorage, location e history.
function navegadorFalso({ almacenRoto = false, url = 'https://ptem.test/Paramedicos/#/temario' } = {}) {
  const oyentes = {}
  const datos = new Map()
  const reventar = () => { throw new Error('almacenamiento bloqueado') }
  globalThis.sessionStorage = {
    getItem: (k) => (almacenRoto ? reventar() : (datos.has(k) ? datos.get(k) : null)),
    setItem: (k, v) => (almacenRoto ? reventar() : datos.set(k, v)),
    removeItem: (k) => (almacenRoto ? reventar() : datos.delete(k)),
  }
  const estado = { href: url, recargas: 0, reemplazos: [] }
  globalThis.window = {
    addEventListener: (tipo, fn) => { (oyentes[tipo] = oyentes[tipo] || []).push(fn) },
    get location() {
      return {
        get href() { return estado.href },
        reload: () => { estado.recargas += 1 },
        replace: (destino) => { estado.reemplazos.push(destino); estado.href = destino },
      }
    },
    history: { replaceState: (_a, _b, destino) => { estado.href = destino } },
  }
  return {
    estado,
    disparar() {
      let prevenido = false
      for (const fn of oyentes['vite:preloadError'] || []) fn({ preventDefault: () => { prevenido = true } })
      return prevenido
    },
  }
}

test('un trozo que no se puede traer provoca UNA recarga, no un bucle', async () => {
  const nav = navegadorFalso()
  const { vigilarVersionNueva } = await import('../src/lib/versionNueva.js?1')
  vigilarVersionNueva()

  assert.equal(nav.disparar(), true, 'debe frenar el error para poder recargar')
  assert.equal(nav.estado.recargas, 1)

  // Segunda vez en la misma pestaña: ya no se recarga; el error tiene que verse.
  assert.equal(nav.disparar(), false)
  assert.equal(nav.estado.recargas, 1, 'dos recargas seguidas serían el bucle')
})

test('sin sessionStorage la marca viaja en la URL y tampoco hay bucle', async () => {
  const nav = navegadorFalso({ almacenRoto: true })
  const { vigilarVersionNueva } = await import('../src/lib/versionNueva.js?2')
  vigilarVersionNueva()

  nav.disparar()
  assert.equal(nav.estado.recargas, 0, 'sin dónde recordar, no se usa reload a secas')
  assert.equal(nav.estado.reemplazos.length, 1)
  assert.ok(nav.estado.reemplazos[0].includes('ptem_recarga=1'), nav.estado.reemplazos[0])
  // La marca va en la QUERY, no en el hash: el hash es la ruta.
  assert.ok(nav.estado.reemplazos[0].includes('?ptem_recarga=1'))
  assert.ok(nav.estado.reemplazos[0].includes('#/temario'), 'la ruta se conserva')

  // Ya con la marca puesta, otro fallo NO vuelve a recargar.
  nav.disparar()
  assert.equal(nav.estado.reemplazos.length, 1)
})

test('si la aplicación llega a montar, la recarga vuelve a estar disponible', async () => {
  const nav = navegadorFalso()
  const { vigilarVersionNueva, versionCargadaBien } = await import('../src/lib/versionNueva.js?3')
  vigilarVersionNueva()

  nav.disparar()
  assert.equal(nav.estado.recargas, 1)
  versionCargadaBien() // montó bien: el incidente anterior queda superado
  nav.disparar()
  assert.equal(nav.estado.recargas, 2, 'tras un arranque correcto sí se puede recargar otra vez')
})

test('al montar se limpia la marca de la URL (no se comparte pegada)', async () => {
  const nav = navegadorFalso({ url: 'https://ptem.test/Paramedicos/?ptem_recarga=1#/temario' })
  const { versionCargadaBien } = await import('../src/lib/versionNueva.js?4')
  versionCargadaBien()
  assert.ok(!nav.estado.href.includes('ptem_recarga'), nav.estado.href)
  assert.ok(nav.estado.href.includes('#/temario'), 'sin llevarse por delante la ruta')
})
