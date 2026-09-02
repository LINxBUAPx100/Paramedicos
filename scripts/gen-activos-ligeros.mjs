// ============================================================
//  Generador del catálogo LIGERO de activos médicos
// ------------------------------------------------------------
//  POR QUÉ EXISTE.
//
//  `src/data/activosMedicos.js` son 500 kB y es la única verdad sobre cada
//  figura: de dónde salió, quién la hizo, con qué licencia, con qué hash y en
//  qué páginas se usa. Todo eso hace falta —para la página /creditos, para el
//  panel «Créditos» de cada figura y para el selector del editor—, pero NO para
//  pintar la imagen.
//
//  Y sin embargo viajaba entero en el trozo de entrada de la aplicación: eran
//  499 kB de los 1 401 kB del chunk, un 36 %, que descargaba hasta el visitante
//  anónimo de la portada, que no ve ninguna figura. Medido sobre `dist/` el
//  2 de septiembre de 2026.
//
//  Este script proyecta el catálogo a lo que la pantalla necesita de verdad y
//  escribe `src/data/activosLigeros.js`. El pesado se queda para quien lo pide:
//  /creditos, el panel de créditos y el editor, todos en trozos que se cargan
//  aparte.
//
//  LA FRONTERA, dicha una vez para no discutirla en cada campo:
//
//    Va en el ligero lo que se necesita para PINTAR o para DECIDIR si se pinta
//    algo —la ruta del archivo, el texto alternativo, si la licencia obliga a
//    enseñar el botón de créditos—. Se queda en el pesado todo lo que solo se
//    lee cuando alguien PREGUNTA por la procedencia.
//
//  Se genera DESDE el catálogo, no desde la red: es una proyección determinista
//  y `tests/generadoAlDia.test.mjs` comprueba que no se ha quedado atrás.
//
//  Uso:
//    node scripts/gen-activos-ligeros.mjs            (escribe src/data/)
//    node scripts/gen-activos-ligeros.mjs --salida=X (escribe en X; lo usan las pruebas)
// ============================================================
import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  ACTIVOS_MEDICOS, ACTIVOS_POR_TEMA, ICONO_POR_TEMA, ICONO_POR_MODULO, PRESUPUESTO_ICONO,
} from '../src/data/activosMedicos.js'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DESTINO = process.argv.find((a) => a.startsWith('--salida='))?.split('=').slice(1).join('=')
  || path.join(RAIZ, 'src', 'data', 'activosLigeros.js')

/**
 * Un activo, con lo justo para pintarlo.
 *
 * `license` se recorta a tres datos: el id (la tarjeta del Atlas lo enseña) y
 * las dos banderas que deciden si hay que mostrar atribución. El nombre y la
 * URL de la licencia se resuelven en `lib/licenciasActivos.js`, que ya los
 * tiene, así que repetirlos 228 veces era pagar dos veces por lo mismo.
 *
 * `componentes` se conserva aunque parezca cosa de créditos: una composición
 * hereda la obligación de atribuir de sus piezas, y eso se decide ANTES de
 * pintar el botón.
 */
function ligero(a) {
  return {
    id: a.id,
    title: a.title,
    kind: a.kind,
    filePath: a.filePath,
    format: a.format,
    accesibilidad: a.accesibilidad,
    license: {
      id: a.license.id,
      attributionRequired: Boolean(a.license.attributionRequired),
      shareAlike: Boolean(a.license.shareAlike),
    },
    ...(a.componentes?.length ? { componentes: a.componentes } : {}),
  }
}

const ligeros = ACTIVOS_MEDICOS.map(ligero)

const cuerpo = `// ARCHIVO GENERADO por scripts/gen-activos-ligeros.mjs — NO editar a mano.
//
// Catálogo LIGERO de activos médicos: lo que hace falta para PINTAR una figura.
// Se proyecta desde src/data/activosMedicos.js, que sigue siendo la única
// verdad sobre procedencia, autoría y licencia.
//
// Existe por peso: el catálogo completo son 500 kB y viajaba en el trozo de
// entrada, así que lo descargaba hasta quien solo abría la portada. Aquí van
// unos 130 kB y el resto se carga cuando alguien pide los créditos.
//
// Para regenerarlo: \`npm run gen:activos\` (o \`npm run build\`, que lo hace solo).

export const ACTIVOS_LIGEROS = ${JSON.stringify(ligeros, null, 2)}

// tema → activos que le corresponden, en orden de pertinencia. El primero es
// el canónico: encabeza la galería del tema y es su tarjeta en Logros.
export const ACTIVOS_POR_TEMA = ${JSON.stringify(ACTIVOS_POR_TEMA, null, 2)}

// tema → activo que hace de ICONO (cabecera, listas, buscador).
export const ICONO_POR_TEMA = ${JSON.stringify(ICONO_POR_TEMA, null, 2)}

// módulo → activo que hace de icono.
export const ICONO_POR_MODULO = ${JSON.stringify(ICONO_POR_MODULO, null, 2)}

// Presupuesto de peso, en bytes, por encima del cual un activo deja de poder
// ser icono y queda solo como ilustración.
export const PRESUPUESTO_ICONO = ${PRESUPUESTO_ICONO}
`

writeFileSync(DESTINO, cuerpo)
const kb = (n) => `${Math.round(n / 1024)} kB`
console.log(
  `${path.relative(RAIZ, DESTINO)} escrito · ${ligeros.length} activos · ` +
  `${kb(cuerpo.length)} (el catálogo completo son ${kb(JSON.stringify(ACTIVOS_MEDICOS).length)})`
)
