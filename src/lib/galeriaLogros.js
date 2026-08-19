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
 * TODAS las imágenes de UNA lección, en el orden en que el alumno las ve:
 *
 *   1. los bloques `imagen` y `diagrama` del cuerpo (Contenido.jsx);
 *   2. las de `recursos.imagenes`, que la lección pinta al final bajo
 *      «Imágenes del tema» (Recursos.jsx).
 *
 * El segundo grupo faltaba, y con él faltaban en Logros: son imágenes que un
 * editor sube desde el panel, así que la galería enseñaba menos de lo que el
 * temario tiene. Si algún día aparece otro sitio con imágenes, se añade AQUÍ y
 * la galería lo recoge sola.
 *
 * Las imágenes de referencia por tema (IMAGENES_POR_TEMA, la galería que
 * TemaPage arma al final) no hacen falta: salen del catálogo, que se fusiona
 * después, y son las mismas piezas.
 */
export function imagenesDeUnTema(tema, porClave = new Map()) {
  const piezas = []
  for (const seccion of tema?.secciones || []) {
    for (const bloque of seccion?.bloques || []) {
      if (!TIPOS_CON_IMAGEN.includes(bloque?.tipo)) continue
      // Un `diagrama` puede traer solo la clave y sacar la imagen del catálogo.
      const src = limpio(bloque.src) || limpio(porClave.get(bloque.clave)?.src)
      if (!src) continue
      piezas.push({
        src,
        clave: bloque.clave || null,
        titulo: limpio(bloque.caption) || limpio(bloque.titulo) || limpio(bloque.alt),
      })
    }
  }
  for (const img of tema?.recursos?.imagenes || []) {
    const src = limpio(img?.src)
    if (!src) continue
    piezas.push({
      src,
      clave: null, // no hay ancla: no vive en una sección concreta
      titulo: limpio(img?.caption) || limpio(img?.busqueda),
    })
  }
  return piezas
}

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
    for (const pieza of imagenesDeUnTema(tema, porClave)) {
      if (vistas.has(pieza.src)) continue
      vistas.add(pieza.src)
      nEnTema += 1
      salida.push({
        // La clave identifica la tarjeta y, si el bloque la trae, sirve para
        // saltar al punto exacto de la lección (`?ref=`).
        clave: pieza.clave || `${tema.id}-img-${nEnTema}`,
        titulo: pieza.titulo || tema.titulo,
        src: pieza.src,
        tema: tema.id,
        origen: 'contenido',
        ancla: pieza.clave || null,
        orden: iTema,
      })
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
