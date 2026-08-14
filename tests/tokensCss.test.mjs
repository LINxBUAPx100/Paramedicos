// ============================================================
//  Tokens de CSS: que ninguno se use sin existir
// ------------------------------------------------------------
//  La ventana de «Archivar» salió sin fondo, transparente, con el texto de la
//  página leyéndose por debajo. La causa: `background: var(--bg-1)`, y `--bg-1`
//  NO EXISTE — los tokens son --bg, --bg-2 y --bg-3. Un `var()` que apunta a un
//  token inexistente y sin valor de reserva no es un error: el navegador
//  descarta la declaración entera y sigue. Así que el elemento se queda sin
//  fondo y nada avisa.
//
//  Estaba en SIETE sitios, incluidos el diálogo de archivar, el popover de
//  compartir código y los apartados del editor. Ninguna prueba lo veía porque
//  el CSS no se probaba, y en pantalla solo se nota si te fijas en el elemento
//  concreto y en el tema concreto.
//
//  Esto lo cierra: un token que se usa sin reserva tiene que estar definido.
//  Con reserva —`var(--x, algo)`— se admite: ahí el autor ya previó el hueco,
//  y es el patrón de los tokens que se inyectan desde JS (`--fase-color`,
//  `--aca-color`).
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/index.css', import.meta.url), 'utf8')

// Definiciones: `--token:` en cualquier bloque (:root, [data-tema], una clase…).
const definidos = new Set(
  [...css.matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)].map((m) => m[1])
)

// Usos SIN valor de reserva: `var(--token)` con el paréntesis cerrando ya.
const usadosSinReserva = [...css.matchAll(/var\(\s*(--[a-zA-Z0-9-]+)\s*\)/g)].map((m) => m[1])

test('todo token usado sin valor de reserva está definido', () => {
  const huerfanos = [...new Set(usadosSinReserva)].filter((t) => !definidos.has(t))
  assert.deepEqual(
    huerfanos, [],
    `Estos tokens se usan en index.css sin estar definidos y sin valor de reserva, ` +
    `así que el navegador DESCARTA esas declaraciones en silencio (fue el caso de ` +
    `--bg-1: dejó el diálogo de archivar sin fondo). Defínelos, corrige el nombre ` +
    `o dales una reserva: var(--token, algo).`
  )
})

test('la prueba sabe distinguir un uso con reserva de uno sin ella', () => {
  // Guardia de la propia prueba: si las expresiones dejaran de casar, arriba
  // saldría verde por no encontrar NADA, que es el falso verde que se quiere
  // evitar. Aquí se comprueba que sí encuentra.
  assert.ok(definidos.has('--bg'), 'debería ver los tokens de :root')
  assert.ok(definidos.has('--bg-2'))
  assert.ok(usadosSinReserva.length > 50, 'debería ver muchos usos sin reserva')

  // Y que --bg-1, el token del fallo, ya no aparece por ninguna parte.
  assert.ok(!usadosSinReserva.includes('--bg-1'))
  assert.ok(!definidos.has('--bg-1'))
})
