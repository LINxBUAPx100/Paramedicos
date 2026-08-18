// ============================================================
//  Genera src/data/navIndice.js — un índice LIGERO (solo metadatos)
//  para el shell (Layout, Home, carrusel de módulos) sin arrastrar todo
//  el contenido de los temas al bundle inicial.
//  Se ejecuta en `prebuild`, así siempre queda sincronizado con los datos.
//  Uso:  node scripts/gen-nav-indice.mjs
// ============================================================
import { modulos, stats } from '../src/data/index.js'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const raiz = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const destino = path.join(raiz, 'src', 'data', 'navIndice.js')

// Solo lo que el shell necesita para navegar (sin secciones/bloques/quiz/etc.).
const modulosNav = modulos.map((f) => ({
  id: f.id,
  numero: f.numero,
  titulo: f.titulo,
  subtitulo: f.subtitulo,
  descripcion: f.descripcion,
  color: f.color,
  temas: f.temas.map((t) => ({ id: t.id, numero: t.numero, titulo: t.titulo })),
}))

// Estado editorial por tema, en un mapa APARTE de `modulosNav`.
//
// Aparte y no dentro de cada tema por dos razones. Una: `modulosNav` tiene que
// seguir siendo idéntico al índice que se deriva de la estructura de una
// academia clonada —hay una prueba que compara ambos—, y esa estructura no
// tiene estado editorial. Dos: esto es información de GESTIÓN del temario
// oficial, la consume solo el panel del superadmin, y así el resto del shell no
// la arrastra.
const estadosEditoriales = Object.fromEntries(
  modulos.flatMap((m) => m.temas.map((t) => [t.id, t.estadoEditorial])),
)

const cuerpo = `// ⚠️ ARCHIVO GENERADO por scripts/gen-nav-indice.mjs — NO editar a mano.
// Índice ligero de navegación (metadatos) para el shell, sin el contenido pesado.
export const modulosNav = ${JSON.stringify(modulosNav, null, 2)}

export const stats = ${JSON.stringify(stats, null, 2)}

// temaId → estado editorial del temario oficial. Solo lo usa el panel de
// gestión; la vista del alumno resuelve su estado desde el contenido completo.
export const estadosEditoriales = ${JSON.stringify(estadosEditoriales, null, 2)}
`

await writeFile(destino, cuerpo, 'utf8')
console.log(`navIndice.js generado → ${modulosNav.length} modulos, ${stats.temas} temas`)
