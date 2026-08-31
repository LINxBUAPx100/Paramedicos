// ============================================================
//  El emulador local NO puede llegar a producción
// ------------------------------------------------------------
//  `src/lib/firebase/init.js` sabe conectarse al emulador para poder probar
//  pantallas con sesión sin crear gente en la academia real. Eso es una puerta
//  a un backend distinto, y una puerta así en el bundle público sería un
//  problema: bastaría con que la condición dejara de plegarse a `false` para
//  que la aplicación intentara hablar con `127.0.0.1`.
//
//  Ya pasó una vez, y por eso existe esta prueba: al exportar la constante
//  `usandoEmulador`, el empaquetador no podía demostrar que nadie la usara y
//  conservaba la rama muerta —con su URL y su aviso— dentro del archivo
//  publicado. Funcionaba (la rama nunca corría), pero el comentario del código
//  afirmaba que ni siquiera viajaba, y eso era falso.
//
//  Aquí se comprueba lo que se puede comprobar sin construir: que la condición
//  siga colgando de `import.meta.env.DEV` y que la constante NO se exporte.
//  Las dos cosas juntas son las que permiten eliminarla.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const INIT = readFileSync(path.join(RAIZ, 'src', 'lib', 'firebase', 'init.js'), 'utf8')

test('la conexión al emulador cuelga de import.meta.env.DEV', () => {
  // Sin esto, Vite no puede plegar la condición a `false` al construir y la
  // rama quedaría viva en el archivo que se publica.
  assert.match(
    INIT,
    /const usandoEmulador\s*=\s*import\.meta\.env\.DEV/,
    'La condición del emulador debe empezar por import.meta.env.DEV para que el '
    + 'build de producción la elimine.'
  )
})

test('la constante NO se exporta: exportarla la deja viva en el bundle', () => {
  assert.doesNotMatch(
    INIT,
    /export\s+const\s+usandoEmulador/,
    'Exportar `usandoEmulador` impide al empaquetador eliminar la rama muerta: '
    + 'la URL del emulador acabaría en el archivo publicado.'
  )
})

test('el emulador solo se activa con la variable puesta a mano', () => {
  // Un valor por defecto activo, o una comprobación laxa (`Boolean(x)` sobre
  // cualquier cadena), convertiría un `.env` mal copiado en una aplicación que
  // habla con localhost.
  assert.match(
    INIT,
    /VITE_FIREBASE_EMULADOR\s*===\s*'1'/,
    'La variable debe compararse EXACTAMENTE con "1".'
  )
})

test('las llamadas al emulador están dentro de la rama, no sueltas', () => {
  const bloque = INIT.slice(INIT.indexOf('if (usandoEmulador)'))
  assert.ok(bloque.includes('connectAuthEmulator'), 'connectAuthEmulator fuera de la rama')
  assert.ok(bloque.includes('connectFirestoreEmulator'), 'connectFirestoreEmulator fuera de la rama')
  // Y que no haya una segunda llamada suelta antes del `if`.
  const antes = INIT.slice(0, INIT.indexOf('if (usandoEmulador)'))
  assert.doesNotMatch(antes, /connectAuthEmulator\s*\(/)
  assert.doesNotMatch(antes, /connectFirestoreEmulator\s*\(/)
})
