// ============================================================
//  Genera/inspecciona la PLANTILLA OFICIAL desde src/data.
// ------------------------------------------------------------
//  Reproduce, en Node, exactamente los documentos que el seed del cliente
//  (importarPlantillaOficial) escribe en Firestore. Sirve para verificar la
//  migración e inspeccionar el resultado sin tocar la base de datos.
//
//  Uso:   node scripts/gen-plantilla.mjs [ruta-salida.json]
//  Por defecto escribe scripts/plantilla-oficial.json (git-ignored).
// ============================================================
import { fases, todosLosTemas, stats } from '../src/data/index.js'
import { plantillaDesdeData } from '../src/lib/contenidoModelo.js'
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export const PLANTILLA_OFICIAL_ID = 'paramedico-tum'
export const PLANTILLA_OFICIAL_NOMBRE = 'Programa Paramédico (TUM)'

const raiz = path.dirname(fileURLToPath(import.meta.url)) + '/..'
const destino = process.argv[2] || path.join(raiz, 'scripts', 'plantilla-oficial.json')

const { plantilla, temas } = plantillaDesdeData({
  id: PLANTILLA_OFICIAL_ID,
  nombre: PLANTILLA_OFICIAL_NOMBRE,
  tipoDestino: 'basico',
  version: 1,
  fases,
  todosLosTemas,
})

await writeFile(destino, JSON.stringify({ plantilla, temas, stats }, null, 2), 'utf8')

const mayor = temas.reduce((max, t) => Math.max(max, JSON.stringify(t).length), 0)
console.log(
  `plantilla "${plantilla.id}" → ${plantilla.estructura.length} fases, ${temas.length} temas`
  + ` (tema más grande ≈ ${(mayor / 1024).toFixed(1)} KB) → ${destino}`
)
