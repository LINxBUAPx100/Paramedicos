// ============================================================
//  La sonda que decide si hace falta encender Firebase
// ------------------------------------------------------------
//  `AuthProvider` cargaba el SDK en toda visita —~950 kB, 240 comprimidos—
//  porque era la única forma que tenía de saber si había sesión. La sonda lo
//  averigua leyendo lo que el propio SDK deja escrito en el navegador.
//
//  TODA ESTA SUITE EXISTE POR UN SOLO MOTIVO: que la sonda nunca diga «no hay
//  sesión» cuando la hay. Ese fallo deja a un alumno con sesión abierta
//  viéndose como visitante anónimo, sin su temario y sin entender por qué. El
//  fallo contrario —encender de más— solo cuesta la descarga que se hacía
//  siempre hasta ayer, así que la mitad de las pruebas comprueban justamente
//  que ante cualquier duda se encienda.
//
//  El caso de la base VACÍA no es hipotético: la primera versión daba por buena
//  la existencia de `firebaseLocalStorageDb`, y comprobado en el navegador esa
//  base la crea el SDK al inicializarse, no al iniciar sesión. Con aquella
//  versión, cualquiera que hubiera abierto la web una vez habría vuelto a
//  descargar el SDK para siempre.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { hayIndicioDeSesion, BASE_AUTH, ALMACEN_AUTH, CLAVE_AUTH } from '../src/lib/sesionProbable.js'

const CLAVE_REAL = `${CLAVE_AUTH}AIzaSyEjemplo:[DEFAULT]`

// localStorage de mentira, con la misma interfaz que usa la sonda.
function almacenCon(claves = []) {
  return {
    length: claves.length,
    key: (i) => claves[i] ?? null,
  }
}

/**
 * IndexedDB de mentira.
 *
 * @param {object} cfg
 * @param {string[]|null} cfg.bases nombres listados por `databases()`; null = falla.
 * @param {string[]|null} cfg.claves claves del almacén; null = la lectura falla.
 * @param {boolean} cfg.sinAlmacen la base existe pero no tiene el almacén.
 * @param {boolean} cfg.colgado `open` no responde nunca (otra pestaña la bloquea).
 */
function idbCon({ bases = [BASE_AUTH], claves = [], sinAlmacen = false, colgado = false } = {}) {
  return {
    databases: async () => {
      if (bases === null) throw new Error('denegado')
      return bases.map((name) => ({ name, version: 1 }))
    },
    open: () => {
      const req = {}
      if (colgado) return req // nunca dispara nada: salta el plazo
      queueMicrotask(() => {
        const store = {
          getAllKeys: () => {
            const pedido = {}
            queueMicrotask(() => {
              if (claves === null) pedido.onerror?.()
              else { pedido.result = claves; pedido.onsuccess?.() }
            })
            return pedido
          },
        }
        req.result = {
          objectStoreNames: sinAlmacen ? [] : [ALMACEN_AUTH],
          transaction: () => ({ objectStore: () => store }),
          close: () => {},
        }
        req.onsuccess?.()
      })
      return req
    },
  }
}

// ---------- lo que DEBE encender ----------

test('con la sesión guardada en IndexedDB, enciende', async () => {
  const hay = await hayIndicioDeSesion({ almacen: almacenCon([]), idb: idbCon({ claves: [CLAVE_REAL] }) })
  assert.equal(hay, true)
})

test('con la sesión en el localStorage de respaldo, enciende sin tocar IndexedDB', async () => {
  // Si el SDK no pudo usar IndexedDB, la sesión vive aquí. Mirar solo la base
  // dejaría fuera justo esos navegadores.
  const idb = idbCon({ bases: [] }) // diría que NO hay base
  const hay = await hayIndicioDeSesion({ almacen: almacenCon(['otra-cosa', CLAVE_REAL]), idb })
  assert.equal(hay, true)
})

test('sin databases() —Firefox— enciende, porque no se puede saber', async () => {
  const idb = { open: () => ({}) } // sin `databases`
  assert.equal(await hayIndicioDeSesion({ almacen: almacenCon([]), idb }), true)
})

test('sin IndexedDB, enciende', async () => {
  assert.equal(await hayIndicioDeSesion({ almacen: almacenCon([]), idb: null }), true)
})

test('con el almacenamiento bloqueado, enciende', async () => {
  const almacen = { get length() { throw new Error('bloqueado') }, key: () => null }
  assert.equal(await hayIndicioDeSesion({ almacen, idb: idbCon({ claves: [] }) }), true)
})

test('si databases() falla, enciende', async () => {
  assert.equal(await hayIndicioDeSesion({ almacen: almacenCon([]), idb: idbCon({ bases: null }) }), true)
})

test('si la lectura de las claves falla, enciende', async () => {
  assert.equal(await hayIndicioDeSesion({ almacen: almacenCon([]), idb: idbCon({ claves: null }) }), true)
})

test('si abrir la base se queda colgado, enciende sin bloquear el arranque', async () => {
  const t0 = Date.now()
  const hay = await hayIndicioDeSesion({
    almacen: almacenCon([]), idb: idbCon({ colgado: true }), esperaMs: 40,
  })
  assert.equal(hay, true)
  assert.ok(Date.now() - t0 < 1000, 'la sonda no puede quedarse esperando a IndexedDB')
})

// ---------- lo que puede esperar ----------

test('LA BASE VACÍA NO ES UNA SESIÓN: la crea el SDK al arrancar, no al entrar', async () => {
  // El caso que hundía la primera versión de la sonda. Comprobado en el
  // navegador el 02-09-2026: `firebaseLocalStorageDb` existía con su almacén
  // vacío en una pestaña que nunca había iniciado sesión.
  const hay = await hayIndicioDeSesion({ almacen: almacenCon([]), idb: idbCon({ claves: [] }) })
  assert.equal(hay, false)
})

test('sin la base, no hay sesión: en este navegador nunca se entró', async () => {
  const hay = await hayIndicioDeSesion({ almacen: almacenCon([]), idb: idbCon({ bases: [] }) })
  assert.equal(hay, false)
})

test('una base con otras claves, pero ninguna de sesión, tampoco enciende', async () => {
  const idb = idbCon({ claves: ['firebase:heartbeat', 'otra'] })
  assert.equal(await hayIndicioDeSesion({ almacen: almacenCon([]), idb }), false)
})

test('la base existe pero sin el almacén de Auth: no hay sesión', async () => {
  const hay = await hayIndicioDeSesion({ almacen: almacenCon([]), idb: idbCon({ sinAlmacen: true }) })
  assert.equal(hay, false)
})

// ---------- el cableado ----------

test('AuthProvider no carga Firebase sin pasar por la sonda', () => {
  // La sonda no sirve de nada si alguien vuelve a poner un `import()` suelto en
  // el efecto de arranque. El efecto de sesión tiene que estar gobernado por
  // `encendido`.
  const fuente = new URL('../src/context/AuthContext.jsx', import.meta.url)
  const texto = fs.readFileSync(fuente, 'utf8')
  assert.match(texto, /hayIndicioDeSesion/, 'AuthContext ya no consulta la sonda')
  assert.match(texto, /if \(!encendido\) return undefined/, 'el efecto de sesión ya no espera a `encendido`')
})

test('las dos puertas donde no se puede suponer llaman a encender()', () => {
  for (const archivo of ['../src/components/RutaProtegida.jsx', '../src/pages/Cuenta.jsx']) {
    const texto = fs.readFileSync(new URL(archivo, import.meta.url), 'utf8')
    assert.match(texto, /encender\(\)/, `${archivo} debe encender Firebase al montarse`)
  }
})
