// ============================================================
//  Galería de Logros — se arma sola con las imágenes del temario
// ------------------------------------------------------------
//  Antes la galería era una LISTA A MANO (`src/data/imagenes.js`). Una imagen
//  que un editor añadía a una lección no aparecía en Logros: había que acordarse
//  de anotarla también en esa lista, y nadie se acuerda. El resultado era una
//  galería congelada en 21 entradas mientras el temario crecía.
//
//  Ahora la galería se DERIVA del contenido que ese usuario tiene servido —el
//  bundle o la copia editada de su academia—, así que:
//
//    · toda imagen que se suba o se pegue en un tema entra sola en Logros;
//    · entra con SU tema, y por tanto se bloquea o se descubre con él;
//    · sale en el orden del plan: módulo 1 antes que el 2, y dentro de cada
//      módulo el orden de sus lecciones.
//
//  La lista a mano no desaparece: sigue sirviendo para el material que no está
//  incrustado en ninguna lección. Se fusiona, sin duplicar lo que ya salió del
//  contenido.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================

const TIPOS_CON_IMAGEN = ['imagen', 'diagrama']

const limpio = (v) => String(v || '').trim()

/**
 * @param {Array} todosLosTemas temas del plan, ya aplanados y en orden.
 * @param {Array} catalogo entradas escritas a mano (ATLAS_TEMAS).
 * @returns {Array} { clave, titulo, src, tema, origen, ancla }
 */
export function galeriaDeLogros(todosLosTemas, catalogo = []) {
  const temas = todosLosTemas || []
  const porClave = new Map((catalogo || []).map((c) => [c.clave, c]))
  const ordenDeTema = new Map(temas.map((t, i) => [t.id, i]))

  const vistas = new Set() // src ya usados: la misma imagen no sale dos veces
  const salida = []

  // 1. Lo que hay DENTRO de las lecciones, en orden de plan.
  temas.forEach((tema, iTema) => {
    let nEnTema = 0
    for (const seccion of tema.secciones || []) {
      for (const bloque of seccion.bloques || []) {
        if (!TIPOS_CON_IMAGEN.includes(bloque?.tipo)) continue
        // Un `diagrama` puede traer solo la clave y sacar la imagen del catálogo.
        const src = limpio(bloque.src) || limpio(porClave.get(bloque.clave)?.src)
        if (!src || vistas.has(src)) continue
        vistas.add(src)
        nEnTema += 1
        salida.push({
          // La clave identifica la tarjeta y, si el bloque la trae, sirve para
          // saltar al punto exacto de la lección (`?ref=`).
          clave: bloque.clave || `${tema.id}-img-${nEnTema}`,
          titulo: limpio(bloque.caption) || limpio(bloque.titulo) || limpio(bloque.alt) || tema.titulo,
          src,
          tema: tema.id,
          origen: 'contenido',
          ancla: bloque.clave || null,
          orden: iTema,
        })
      }
    }
  })

  // 2. El catálogo a mano: solo lo que no haya salido ya del contenido.
  for (const entrada of catalogo || []) {
    const src = limpio(entrada.src)
    if (!src || vistas.has(src)) continue
    vistas.add(src)
    salida.push({
      clave: entrada.clave,
      titulo: entrada.titulo,
      src,
      tema: entrada.tema || null,
      origen: 'catalogo',
      ancla: entrada.clave || null,
      // Se coloca donde está SU tema; sin tema, al final.
      orden: ordenDeTema.has(entrada.tema) ? ordenDeTema.get(entrada.tema) : Number.MAX_SAFE_INTEGER,
    })
  }

  // Orden del plan. El desempate por posición mantiene estable el resultado:
  // dos imágenes del mismo tema conservan el orden en que se leen.
  return salida
    .map((e, i) => ({ e, i }))
    .sort((a, b) => a.e.orden - b.e.orden || a.i - b.i)
    .map(({ e }) => {
      const { orden, ...resto } = e // `orden` es de uso interno
      return resto
    })
}
