// ============================================================
//  Genera src/data/navIndice.js — un índice LIGERO (solo metadatos)
//  para el shell (Layout, Home, carrusel de fases) sin arrastrar todo
//  el contenido de los temas al bundle inicial.
//  Se ejecuta en `prebuild`, así siempre queda sincronizado con los datos.
//  Uso:  node scripts/gen-nav-indice.mjs
// ============================================================
import { fases, stats } from '../src/data/index.js'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const raiz = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const destino = path.join(raiz, 'src', 'data', 'navIndice.js')

// Solo lo que el shell necesita para navegar (sin secciones/bloques/quiz/etc.).
const fasesNav = fases.map((f) => ({
  id: f.id,
  numero: f.numero,
  titulo: f.titulo,
  subtitulo: f.subtitulo,
  descripcion: f.descripcion,
  color: f.color,
  temas: f.temas.map((t) => ({ id: t.id, numero: t.numero, titulo: t.titulo })),
}))

const cuerpo = `// ⚠️ ARCHIVO GENERADO por scripts/gen-nav-indice.mjs — NO editar a mano.
// Índice ligero de navegación (metadatos) para el shell, sin el contenido pesado.
export const fasesNav = ${JSON.stringify(fasesNav, null, 2)}

export const stats = ${JSON.stringify(stats, null, 2)}
`

await writeFile(destino, cuerpo, 'utf8')
console.log(`navIndice.js generado → ${fasesNav.length} fases, ${stats.temas} temas`)
