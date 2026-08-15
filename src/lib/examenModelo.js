// ============================================================
//  Selección de preguntas de examen (módulo PURO)
// ------------------------------------------------------------
//  El examen de fase usaba las 73 preguntas de la fase. Todas. Siempre. Con
//  eso, barajar el orden no sirve de nada para evitar que se pasen las
//  respuestas: dos alumnos sentados juntos ven exactamente el mismo examen.
//
//  Aquí se decide CUÁNTAS preguntas entran y CUÁLES, a partir de una semilla
//  (lib/azar.js) para que el mismo intento se pueda regenerar entero.
//
//  Dos criterios, y el segundo importa tanto como el primero:
//
//   1. TAMAÑO — un subconjunto del banco, no el banco entero.
//   2. REPARTO POR TEMA — proporcional, no un puñado al azar. Si se cogieran
//      30 de 73 a lo bruto, un alumno podría librarse por suerte del tema que
//      no estudió mientras a otro le caen cuatro preguntas de ese mismo tema.
//      Eso no es rigor, es lotería. Con reparto proporcional todos los temas
//      de la fase están representados y lo que varía es QUÉ preguntas de cada
//      tema tocan.
// ============================================================
import { generador, barajarCon, elegirCon } from './azar.js'

// --- El dial ----------------------------------------------------------------
// Cuánto del banco entra en el examen. Es el único número que hay que tocar
// para hacer los exámenes más largos o más variados, y es un compromiso:
//
//   · MÁS preguntas  → cubre más temario, pero dos alumnos comparten más
//                      examen (con el banco entero comparten el 100%).
//   · MENOS preguntas → casi no se solapan, pero se evalúa menos.
//
// El % es lo que un compañero ve TAMBIÉN en su examen. Con los valores de
// abajo (50%, tope 30, piso 12) el temario actual queda así:
//
//   Fase 1 · banco 73 → 30 preguntas (41% compartido)
//   Fase 2 · banco 71 → 30 (42%)      Fase 5 · banco 61 → 30 (49%)
//   Fase 3 · banco 46 → 23 (50%)      Fase 6 · banco 29 → 15 (52%)
//   Fase 4 · banco 68 → 30 (44%)      Fase 7 · banco 14 → 12 (86%)
//                                     Fase 8 · banco 12 → 12 (100%)
//
// Las fases 7 y 8 (14 y 12 preguntas) se van al piso y comparten casi todo: con
// un banco así no existe subconjunto que sirva de nada. Ahí lo único que sube
// el rigor es escribir más preguntas — ningún reparto lo arregla.
export const PORCION_DEL_BANCO = 0.5
export const MINIMO_PREGUNTAS = 12
export const MAXIMO_PREGUNTAS = 30

// Cuántas preguntas entran, dado el tamaño del banco disponible.
// Nunca más de las que hay: un banco de 8 da un examen de 8.
export function tamanoExamen(total, {
  porcion = PORCION_DEL_BANCO, minimo = MINIMO_PREGUNTAS, maximo = MAXIMO_PREGUNTAS,
} = {}) {
  const n = Math.max(0, Number(total) || 0)
  if (n === 0) return 0
  const objetivo = Math.round(n * porcion)
  return Math.min(n, Math.max(Math.min(minimo, n), Math.min(objetivo, maximo)))
}

// Agrupa por tema conservando el orden de aparición (determinista: si esto
// dependiera del orden de las claves de un objeto, el reparto cambiaría entre
// navegadores y la semilla dejaría de reproducir el mismo examen).
function porTema(preguntas) {
  const grupos = []
  const indice = new Map()
  for (const p of preguntas || []) {
    const clave = p.temaId ?? '__sin-tema__'
    if (!indice.has(clave)) {
      indice.set(clave, grupos.length)
      grupos.push({ temaId: clave, preguntas: [] })
    }
    grupos[indice.get(clave)].preguntas.push(p)
  }
  return grupos
}

// Reparte `tamano` plazas entre los temas, proporcionalmente a su número de
// preguntas y con RESTO MAYOR (cuota de Hare): se asigna la parte entera y las
// plazas sobrantes van a los temas con mayor decimal pendiente. Es el mismo
// método que reparte escaños, y por la misma razón: la suma tiene que dar
// exactamente `tamano`, sin que el redondeo invente ni pierda una plaza.
//
// Empates de decimal: los rompe la semilla, no el orden del temario. Si no,
// los temas del final de la fase quedarían sistemáticamente infrarrepresentados.
export function repartoPorTema(grupos, tamano, rng) {
  const disponibles = grupos.map((g) => g.preguntas.length)
  const total = disponibles.reduce((a, b) => a + b, 0)
  if (total === 0 || tamano <= 0) return grupos.map(() => 0)
  if (tamano >= total) return [...disponibles]

  // Menos plazas que temas: no alcanza para uno por tema. Se sortean cuáles
  // entran, y así entre intentos no salen siempre los mismos temas.
  if (tamano < grupos.length) {
    const cuota = grupos.map(() => 0)
    for (const i of barajarCon(rng, grupos.map((_, i) => i)).slice(0, tamano)) cuota[i] = 1
    return cuota
  }

  const exacto = disponibles.map((n) => (n * tamano) / total)
  const cuota = exacto.map((x) => Math.floor(x))
  let faltan = tamano - cuota.reduce((a, b) => a + b, 0)

  // Candidatos ordenados por decimal pendiente; el desempate lo pone la
  // semilla (se baraja ANTES de ordenar, así el sort estable lo respeta).
  const orden = barajarCon(rng, exacto.map((x, i) => ({ i, resto: x - Math.floor(x) })))
    .sort((a, b) => b.resto - a.resto)

  for (const { i } of orden) {
    if (faltan <= 0) break
    if (cuota[i] < disponibles[i]) { cuota[i] += 1; faltan -= 1 }
  }
  // Si aún faltan plazas (temas ya agotados), se reparten donde quepan.
  for (let i = 0; faltan > 0 && i < cuota.length; i++) {
    while (faltan > 0 && cuota[i] < disponibles[i]) { cuota[i] += 1; faltan -= 1 }
  }
  return cuota
}

// Selección final: `tamano` preguntas repartidas por tema y barajadas entre sí.
// La MISMA semilla devuelve SIEMPRE el mismo examen — es lo que hace que
// refrescar la página no sea una tirada de dados nueva.
//
// `tamano` omitido ⇒ lo decide tamanoExamen(). `tamano: null` explícito ⇒ el
// banco entero (lo usa el examen general cuando el alumno pide "Todas").
export function seleccionarPreguntas(preguntas, { semilla, tamano } = {}) {
  const lista = preguntas || []
  if (lista.length === 0) return []
  const rng = generador(semilla)
  const cuantas = tamano === null
    ? lista.length
    : (tamano === undefined ? tamanoExamen(lista.length) : Math.min(tamano, lista.length))

  const grupos = porTema(lista)
  // Un solo tema (quiz de tema, o examen general sin metadatos): no hay nada
  // que repartir, es una elección directa.
  if (grupos.length <= 1) return elegirCon(rng, lista, cuantas)

  const cuota = repartoPorTema(grupos, cuantas, rng)
  const elegidas = grupos.flatMap((g, i) => elegirCon(rng, g.preguntas, cuota[i]))
  return barajarCon(rng, elegidas)
}

// Cuántos temas distintos quedan representados. Lo usa la pantalla previa al
// examen para poder decir "30 preguntas de 12 temas" en vez de solo el número.
export function temasCubiertos(preguntas) {
  return new Set((preguntas || []).map((p) => p.temaId).filter(Boolean)).size
}
