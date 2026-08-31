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
// `--salida=<ruta>` redirige el archivo generado; lo usan las pruebas para
// comprobar que el del repositorio está al día sin reescribirlo.
const argSalida = process.argv.find((a) => a.startsWith('--salida='))
const destino = argSalida
  ? path.resolve(process.cwd(), argSalida.slice(9))
  : path.join(raiz, 'src', 'data', 'navIndice.js')

// YA NO SE ESCRIBE `modulosNav` (trabajo P2, 31-08-2026).
//
// Era la lista de los 7 módulos con los 287 títulos de tema: 50 kB que el shell
// usaba como índice de reserva mientras llegaba el de Firestore. Los títulos
// del plan SON contenido de la academia —son su índice, el resultado de ordenar
// un programa completo—, y publicarlos en el JavaScript los dejaba
// descargables por cualquiera aunque la interfaz no los pintara.
//
// El shell arranca ahora sin índice y lo rellena con el de la academia. No hace
// falta reserva: una academia migrada trae el suyo, y una que no lo esté no
// debe recibir el de otra.

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

const cuerpo = `// ARCHIVO GENERADO por scripts/gen-nav-indice.mjs — NO editar a mano.
//
// Solo CIFRAS y estados de gestión. Los títulos del temario NO se publican
// aquí: son contenido de la academia y viajaban al navegador de cualquiera.
// Ver el trabajo P2 en docs/PLAN-TECNICO-FASES.md.

// Cuántos módulos, temas, preguntas y flashcards tiene el plan. Son números, no
// contenido, y la portada pública los enseña a propósito.
export const stats = ${JSON.stringify(stats, null, 2)}

// temaId → estado editorial del temario oficial. Solo lo usa el panel de
// gestión; la vista del alumno resuelve su estado desde el contenido completo.
export const estadosEditoriales = ${JSON.stringify(estadosEditoriales, null, 2)}
`

await writeFile(destino, cuerpo, 'utf8')
console.log(`navIndice.js generado → cifras de ${stats.modulos} modulos y ${stats.temas} temas`)
console.log('  sin títulos: los 287 nombres de tema ya NO se publican (P2)')
