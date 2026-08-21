// ============================================================
//  Los archivos generados están al día con sus fuentes
// ------------------------------------------------------------
//  `src/data/planRescate.js`, `src/data/navIndice.js` y
//  `src/data/activosMedicos.js` los escribe un script y los consume la
//  aplicación. Un archivo generado que se queda atrás es un fallo silencioso: la
//  app sigue funcionando y sigue sirviendo datos viejos, sin que ninguna prueba
//  se entere.
//
//  Esto se volvió urgente con la migración de iconos: los iconos de tema y de
//  módulo pasaron de ser emojis escritos a mano a identificadores del catálogo
//  de activos. Si alguien reimporta el catálogo y no regenera el plan, la app
//  pediría un icono que ya no existe y las cabeceras saldrían con el respaldo
//  genérico, todas iguales, sin error visible.
//
//  La prueba REGENERA el plan en un proceso aparte y compara. No escribe nada
//  en el repositorio: usa un directorio temporal.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const RAIZ = new URL('../', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

// Compara ignorando el fin de línea: git puede normalizar CRLF/LF al escribir en
// el árbol de trabajo, y eso no es una desincronización real.
const normaliza = (s) => String(s).replace(/\r\n/g, '\n').trimEnd()

// Genera a un archivo TEMPORAL y compara. No se toca el del repositorio: el
// ejecutor de pruebas corre los archivos en paralelo, y una prueba que
// reescribiera `planRescate.js` haría fallar de forma intermitente a las que lo
// están leyendo en ese momento. (Ocurrió: por eso los generadores aceptan
// `--salida`.)
function generadoIgual(script, archivo, comando) {
  const esperado = fs.readFileSync(path.join(RAIZ, 'src', 'data', archivo), 'utf8')
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ptem-gen-'))
  const salida = path.join(tmp, archivo)
  try {
    execFileSync(process.execPath, [path.join(RAIZ, 'scripts', script), `--salida=${salida}`], {
      cwd: RAIZ, stdio: 'pipe',
    })
    assert.ok(fs.existsSync(salida), `${script} no escribió en la salida indicada`)
    assert.equal(
      normaliza(fs.readFileSync(salida, 'utf8')), normaliza(esperado),
      `src/data/${archivo} está desincronizado de su fuente: ejecuta \`${comando}\`.`
    )
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true })
  }
}

test('planRescate.js coincide con lo que genera su script', () => {
  generadoIgual('gen-plan-rescate.mjs', 'planRescate.js', 'npm run gen:plan')
})

test('navIndice.js coincide con lo que genera su script', () => {
  generadoIgual('gen-nav-indice.mjs', 'navIndice.js', 'npm run gen:nav')
})

test('el catálogo de activos se puede regenerar sin red desde la caché', () => {
  // `--sin-red --dry-run` reconstruye el catálogo con lo que ya está en
  // `.cache/activos/` y no escribe nada. Si falla, el pipeline dejó de ser
  // reproducible: la próxima persona que lo ejecute obtendrá otro resultado, o
  // ninguno.
  const cache = path.join(RAIZ, '.cache', 'activos')
  if (!fs.existsSync(cache)) {
    // Sin caché no se puede comprobar sin salir a la red, y una prueba no debe
    // depender de internet. Se dice en voz alta en vez de pasar en falso.
    console.log('  (omitida: no hay .cache/activos; ejecuta `npm run activos:importar` una vez)')
    return
  }
  const salida = execFileSync(
    process.execPath,
    [path.join(RAIZ, 'scripts', 'importar-activos-medicos.mjs'), '--sin-red', '--dry-run'],
    { cwd: RAIZ, encoding: 'utf8' }
  )
  assert.match(salida, /activos de banco importados/, `el pipeline no completó:\n${salida}`)
  assert.match(salida, /composiciones generadas/)
  assert.doesNotMatch(salida, /problema\(s\)/, `el pipeline reporta problemas:\n${salida}`)
})
