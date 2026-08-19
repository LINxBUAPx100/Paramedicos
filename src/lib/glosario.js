// ============================================================
//  Glosario del temario — lógica PURA
// ------------------------------------------------------------
//  De dónde salen las palabras: de los `conceptosClave` que cada tema ya
//  trae escritos (término + definición). No se inventa nada ni se adivina qué
//  es un tecnicismo con heurísticas de texto: si el autor del tema lo marcó
//  como concepto clave, es lo que hay que repasar. Son ~1 100 entradas
//  repartidas por los 287 temas.
//
//  Reglas que impone este módulo:
//
//    · ORDEN DE APARICIÓN. El glosario sigue el plan: módulo 1 antes que el 2,
//      y dentro de cada módulo el orden de sus temas y de sus conceptos. No se
//      ordena alfabéticamente: la palabra se estudia cuando toca.
//    · SIN REPETIDOS. La primera aparición manda. Un término que vuelve a
//      definirse más adelante no crea una segunda entrada; se registra el tema
//      donde reaparece para poder decir dónde más se usa.
//    · POR MÓDULO. Las entradas se agrupan en bloques, un bloque por módulo.
//    · SE DESCUBRE. Cada entrada recuerda de qué tema viene, que es lo que
//      permite a la página enseñar la definición solo cuando ese tema está
//      desbloqueado para el alumno.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================

// Clave de comparación: sin acentos, sin mayúsculas y con los espacios
// colapsados. «Vía aérea», «via aerea» y «VÍA  AÉREA» son la misma palabra.
export function normalizarTermino(texto) {
  return String(texto || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

// Ancla estable para enlazar desde un tema: /logros?t=<slug>
export function slugTermino(texto) {
  const s = normalizarTermino(texto)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
  return s || 'termino'
}

/**
 * Construye el glosario a partir de los temas del plan, EN ORDEN.
 *
 * @param {Array} todosLosTemas temas ya aplanados y ordenados (contenidoApi),
 *   cada uno con `conceptosClave` y sus datos de módulo.
 * @returns {{entradas: Array, porModulo: Array, indice: Map, total: number}}
 */
export function construirGlosario(todosLosTemas) {
  const entradas = []
  const indice = new Map()

  for (const tema of todosLosTemas || []) {
    for (const concepto of tema.conceptosClave || []) {
      const termino = String(concepto?.termino || '').trim()
      const definicion = String(concepto?.definicion || '').trim()
      if (!termino || !definicion) continue

      const clave = normalizarTermino(termino)
      const ya = indice.get(clave)
      if (ya) {
        // Repetido: no entra otra vez, pero se apunta dónde vuelve a salir.
        if (ya.temaId !== tema.id && !ya.tambienEn.includes(tema.id)) {
          ya.tambienEn.push(tema.id)
        }
        continue
      }

      const entrada = {
        termino,
        definicion,
        clave,
        slug: slugTermino(termino),
        orden: entradas.length,
        temaId: tema.id,
        temaTitulo: tema.titulo,
        temaNumero: tema.numero,
        moduloId: tema.moduloId,
        moduloNumero: tema.moduloNumero,
        moduloTitulo: tema.moduloTitulo,
        moduloColor: tema.moduloColor,
        tambienEn: [],
      }
      entradas.push(entrada)
      indice.set(clave, entrada)
    }
  }

  // Dos slugs iguales para términos distintos romperían el enlace (llevaría a
  // la palabra equivocada). Se desempata con un sufijo estable por orden.
  const vistos = new Map()
  for (const e of entradas) {
    const n = (vistos.get(e.slug) || 0) + 1
    vistos.set(e.slug, n)
    if (n > 1) e.slug = `${e.slug}-${n}`
  }

  const porModulo = []
  for (const e of entradas) {
    let bloque = porModulo[porModulo.length - 1]
    if (!bloque || bloque.moduloId !== e.moduloId) {
      bloque = {
        moduloId: e.moduloId,
        moduloNumero: e.moduloNumero,
        moduloTitulo: e.moduloTitulo,
        moduloColor: e.moduloColor,
        entradas: [],
      }
      porModulo.push(bloque)
    }
    bloque.entradas.push(e)
  }

  return { entradas, porModulo, indice, total: entradas.length }
}

// Escapa lo que en una expresión regular significaría otra cosa: hay términos
// con paréntesis y con signos (p. ej. «Na⁺/K⁺ ATPasa»).
function escapar(texto) {
  return String(texto).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Expresión que reconoce cualquier término del glosario dentro de un texto.
 *
 * Detalles que importan:
 *   · los términos van del MÁS LARGO al más corto, para que «paro
 *     cardiorrespiratorio» gane a «paro» y no se parta la frase;
 *   · los límites son de letra o número Unicode, no `\b`: `\b` es ASCII y
 *     cortaría mal en «vía» o «músculo»;
 *   · sin distinguir mayúsculas, porque el término se escribe capitalizado al
 *     principio de una frase y en minúscula dentro de ella.
 */
export function expresionDeTerminos(entradas) {
  const lista = (entradas || []).map((e) => e.termino).filter(Boolean)
  if (!lista.length) return null
  const alternativas = [...lista]
    .sort((a, b) => b.length - a.length)
    .map(escapar)
    .join('|')
  return new RegExp(`(?<![\\p{L}\\p{N}])(${alternativas})(?![\\p{L}\\p{N}])`, 'giu')
}

/**
 * Parte un texto en trozos, marcando los que son términos del glosario.
 *
 * Devuelve segmentos `{ texto }` y `{ texto, entrada }`. El componente decide
 * cómo pintarlos; aquí no hay React para poder probar esto en Node.
 *
 * `yaMarcados` es OPCIONAL y la interfaz no lo usa: con un Set, solo se marca
 * la primera aparición de cada término. Se midió sobre el temario real antes de
 * decidir —8,0 subrayados por tema marcando todo frente a 5,9 marcando solo el
 * primero—, así que el ahorro no justificaba que el resultado dependiera del
 * orden en que React pinta los bloques. Queda disponible para quien recorra el
 * temario fuera de React (informes, auditorías) y quiera contar términos únicos.
 */
export function partirTexto(texto, glosario, { regex = null, yaMarcados = null } = {}) {
  const cadena = String(texto ?? '')
  if (!cadena || !glosario?.indice?.size) return [{ texto: cadena }]
  const re = regex || expresionDeTerminos(glosario.entradas)
  if (!re) return [{ texto: cadena }]

  re.lastIndex = 0
  const segmentos = []
  let ultimo = 0
  let m
  while ((m = re.exec(cadena)) !== null) {
    const entrada = glosario.indice.get(normalizarTermino(m[1]))
    if (entrada && !(yaMarcados && yaMarcados.has(entrada.clave))) {
      if (m.index > ultimo) segmentos.push({ texto: cadena.slice(ultimo, m.index) })
      segmentos.push({ texto: m[1], entrada })
      yaMarcados?.add(entrada.clave)
      ultimo = m.index + m[1].length
    }
  }
  if (ultimo < cadena.length) segmentos.push({ texto: cadena.slice(ultimo) })
  return segmentos.length ? segmentos : [{ texto: cadena }]
}

/**
 * Cuántas palabras tiene descubiertas el alumno.
 * `estaVisible(temaId)` la pone quien sepa de visibilidad (useVisibilidad).
 */
export function progresoGlosario(glosario, estaVisible) {
  const total = glosario?.entradas?.length || 0
  if (!total) return { total: 0, descubiertas: 0, pct: 0 }
  const descubiertas = glosario.entradas.filter((e) => estaVisible(e.temaId)).length
  return { total, descubiertas, pct: Math.round((descubiertas / total) * 100) }
}
