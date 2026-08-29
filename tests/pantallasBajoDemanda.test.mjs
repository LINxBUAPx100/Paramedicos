// ============================================================
//  Pruebas de las PANTALLAS migradas a la carga bajo demanda (Fase 1)
// ------------------------------------------------------------
//  Por qué existe este archivo:
//
//  Al migrar las pantallas de `useContenido()` (curso entero en memoria) a los
//  hooks bajo demanda, dos de ellas se quedaron con una guarda vieja:
//
//      if (!contenido) return <CargandoContenido />
//
//  `contenido` ya no se declaraba en esas funciones, así que al abrir el examen
//  saltaba «contenido is not defined» y la pantalla no pintaba. El build NO lo
//  detecta —los identificadores sueltos no rompen el empaquetado, solo la
//  ejecución— y las pruebas de lógica tampoco, porque no renderizan React.
//
//  Esta suite cubre ese hueco leyendo el código: barata, sin navegador, y
//  encuentra exactamente la clase de error que se coló.
// ============================================================
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'

const PAGINAS = 'src/pages'
const COMPONENTES = 'src/components'

// Quita comentarios y literales de texto para no confundir una palabra escrita
// en prosa con una variable de verdad. Es un barrido, no un analizador: basta
// porque solo se buscan identificadores concretos.
function soloCodigo(fuente) {
  let salida = ''
  let i = 0
  let modo = null // 'linea' | 'bloque' | comilla
  while (i < fuente.length) {
    const c = fuente[i]
    const par = fuente.slice(i, i + 2)
    if (!modo) {
      if (par === '//') { modo = 'linea'; i += 2; continue }
      if (par === '/*') { modo = 'bloque'; i += 2; continue }
      if (c === '"' || c === "'" || c === '`') { modo = c; i += 1; continue }
      salida += c
      i += 1
      continue
    }
    if (modo === 'linea') {
      if (c === '\n') { modo = null; salida += c }
      i += 1
      continue
    }
    if (modo === 'bloque') {
      if (par === '*/') { modo = null; i += 2; continue }
      if (c === '\n') salida += c
      i += 1
      continue
    }
    // Dentro de un literal de texto.
    if (c === '\\') { i += 2; continue }
    if (c === modo) modo = null
    i += 1
  }
  return salida
}

const archivosJsx = (dir) =>
  readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith('.jsx'))
    .map((e) => `${dir}/${e.name}`)

const TODAS = [...archivosJsx(PAGINAS), ...archivosJsx(COMPONENTES)]

// «contenido» USADO COMO VARIABLE, no escrito en prosa.
//
// El filtro de arriba quita comentarios y cadenas, pero el texto visible de un
// JSX no está entrecomillado: «El contenido que buscas no existe» sobrevive al
// barrido y parecería una variable. Por eso no basta con buscar la palabra —
// hay que exigir que aparezca en una posición donde solo cabe una expresión.
// El `(?<![.\w])` es lo que separa la variable `contenido` de la PROPIEDAD
// `a.contenido`: sin él, `academia.contenido?.estado` —que es legítimo y no
// tiene nada que ver con esta migración— saldría marcado.
const SUELTO = '(?<![.\\w$])contenido'
const USO_COMO_VARIABLE = new RegExp(
  [
    `!\\s*${SUELTO}\\b`, // !contenido
    `${SUELTO}\\?\\.`, // contenido?.algo
    `${SUELTO}\\.[a-zA-Z_$]`, // contenido.getTema  (la prosa lleva espacio tras el punto)
    `${SUELTO}\\s*(?:&&|\\|\\|)`, // contenido && …
    `[({,=]\\s*${SUELTO}\\s*[),;}]`, // (contenido) · = contenido;
  ].join('|')
)

test('ninguna pantalla usa «contenido» sin declararlo', () => {
  // El identificador que dejó de existir al migrar. Se comprueba que, allí
  // donde se usa, también se declare: así una pantalla nueva puede volver a
  // usarlo legítimamente, pero una guarda huérfana salta.
  const rotas = []
  for (const archivo of TODAS) {
    const codigo = soloCodigo(readFileSync(archivo, 'utf8'))
    if (!USO_COMO_VARIABLE.test(codigo)) continue
    // Formas en que `contenido` puede estar legítimamente declarado: destructurado
    // de un hook, como variable, como prop desestructurada o como PARÁMETRO de
    // función —incluida la arrow `(contenido) => …`, que es como lo recibe el
    // guardado del editor—.
    const declara = new RegExp([
      '(?:const|let|var)\\s*\\{[^}]*\\bcontenido\\b',
      '(?:const|let|var)\\s+contenido\\b',
      '\\(\\s*\\{[^}]*\\bcontenido\\b[^}]*\\}\\s*\\)',
      '\\(\\s*contenido\\s*(?:,|\\))',
      '\\bcontenido\\s*=>',
      'function\\s+\\w*\\s*\\([^)]*\\bcontenido\\b',
    ].join('|')).test(codigo)
    if (!declara) {
      const linea = codigo.split('\n').findIndex((l) => USO_COMO_VARIABLE.test(l)) + 1
      rotas.push(`${archivo}:${linea}`)
    }
  }
  assert.deepEqual(rotas, [], `usan «contenido» sin declararlo: ${rotas.join(', ')}`)
})

test('las pantallas de estudio ya no cargan el curso entero', () => {
  // `useContenido()` baja los 287 temas. Sigue existiendo a propósito (es el
  // camino de respaldo del resolutor), pero ninguna pantalla de estudio debe
  // llamarlo: si una vuelve a hacerlo, se pierde el ahorro de toda la fase sin
  // que nada falle a la vista.
  const ESTUDIO = [
    'TemaPage', 'QuizPage', 'ModuloPage', 'BuscarPage', 'ExamenPage',
    'ExamenModuloPage', 'ExamenUnidadPage', 'FlashcardsPage', 'LogrosPage', 'ProgresoPage',
  ]
  const culpables = ESTUDIO.filter((p) => {
    const codigo = soloCodigo(readFileSync(`${PAGINAS}/${p}.jsx`, 'utf8'))
    return /\buseContenido\s*\(/.test(codigo)
  })
  assert.deepEqual(culpables, [], `vuelven a cargar el curso entero: ${culpables.join(', ')}`)
})

test('toda pantalla que espera datos tiene su guarda de carga', () => {
  // Un hook bajo demanda devuelve null mientras resuelve. Sin guarda, la
  // pantalla intenta pintar con datos a medias y revienta en el primer `.map`.
  const conHooks = []
  for (const archivo of TODAS) {
    const codigo = soloCodigo(readFileSync(archivo, 'utf8'))
    if (!/\buse(Tema|FichasDeModulo|TodasLasFichas|TodasLasPreguntas|PreguntasDeModulo|TodasLasFlashcards)\s*\(/.test(codigo)) continue
    const guarda = /\bif\s*\(\s*(cargando|cargandoTema|cargandoMazo|!api)\b/.test(codigo)
    if (!guarda) conHooks.push(archivo)
  }
  assert.deepEqual(conHooks, [], `sin guarda de carga: ${conHooks.join(', ')}`)
})

test('los hooks se declaran antes de cualquier return', () => {
  // Regla de los hooks de React: un `return` temprano por encima de un hook
  // hace que el número de hooks cambie entre renders y React lanza. Es fácil
  // de introducir al añadir una guarda nueva y no lo ve ni el build.
  const rotas = []
  for (const archivo of TODAS) {
    const codigo = soloCodigo(readFileSync(archivo, 'utf8'))
    const lineas = codigo.split('\n')
    let vistoReturn = -1
    for (let i = 0; i < lineas.length; i += 1) {
      const l = lineas[i]
      // Fin de función: se reinicia el rastreo (cada componente cuenta aparte).
      if (/^(export\s+)?(default\s+)?function\s/.test(l)) { vistoReturn = -1; continue }
      if (/^\s{2}if\s*\(.*\)\s*return\b/.test(l) && vistoReturn < 0) vistoReturn = i + 1
      if (vistoReturn > 0 && /^\s{2}const\s+.*\buse[A-Z]\w*\s*\(/.test(l)) {
        rotas.push(`${archivo}:${i + 1} (hook tras el return de la línea ${vistoReturn})`)
      }
    }
  }
  assert.deepEqual(rotas, [], rotas.join('\n'))
})
