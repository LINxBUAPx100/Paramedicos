// ============================================================
//  Estado de los ÍNDICES de un curso, en palabras que el director entienda
// ------------------------------------------------------------
//  Los «agregados» son las vistas derivadas de un curso —glosario, buscador,
//  banco de exámenes, mazo de flashcards, galería y contadores— guardadas ya
//  calculadas. Existen para que abrir UNA lección cueste 3 lecturas de
//  Firestore en vez de las 287 del curso entero (Fase 1).
//
//  POR QUÉ HACE FALTA ESTE MÓDULO. El 31 de agosto de 2026 se descubrió que
//  R.E.S.C.A.T.E. llevaba desde su migración SIN agregados. Nada estaba roto
//  —el resolutor cae a un camino más caro pero correcto— y precisamente por eso
//  nadie se enteró: el único síntoma era la factura de lecturas.
//
//  El fallo original está en la clonación: escribe los agregados dentro de un
//  try/catch que se traga el error en un `console.warn` del navegador de quien
//  clonó, y marca la clonación como completa igual. Un aviso que solo vive en
//  una consola cerrada hace meses no es un aviso.
//
//  Aquí no se arregla la clonación: se hace VISIBLE el resultado, con su coste
//  en lecturas, para que se pueda ver en el panel y arreglar con un botón sin
//  necesidad de credenciales de administrador.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================

/**
 * Lecturas de Firestore que cuesta abrir el contenido de un curso.
 *
 * Con índices al día son tres: el sello, el índice del curso y la lección.
 * Sin ellos hay que traerse el curso entero para reconstruirlos en memoria,
 * así que el coste es «un documento por lección, más el curso».
 */
export const LECTURAS_CON_INDICES = 3

/** Cuota diaria de lecturas del plan gratuito (Spark) de Firestore. */
export const CUOTA_SPARK_DIARIA = 50000

export function lecturasPorCarga(temas, hayIndices) {
  if (hayIndices) return LECTURAS_CON_INDICES
  // +1 por el documento del curso, que hay que leer igual. Ese +1 ya evita que
  // la cifra sea cero, así que un curso vacío cuesta 1 y no hace falta ningún
  // suelo artificial (que además mentiría: diría 2 donde solo hay 1 lectura).
  return Math.max(0, Number(temas) || 0) + 1
}

/**
 * Cuántas cargas de contenido caben en un día antes de agotar la cuota gratuita.
 *
 * Es la cifra que convierte «falta un índice» en una decisión: con 287 temas y
 * sin índices salen unas 173 cargas al día, y un grupo de treinta alumnos se
 * las come en una clase.
 */
export function cargasAntesDeAgotarCuota(temas, hayIndices, cuota = CUOTA_SPARK_DIARIA) {
  return Math.floor(cuota / lecturasPorCarga(temas, hayIndices))
}

/**
 * Traduce el sello de agregados a un estado con nombre.
 *
 * `sello` es el documento `agregados/{cursoId}__sello`, o null si no existe.
 * Se replica aquí la condición de `agregadosUtilizables` a propósito: ese
 * módulo arrastra el SDK de Firebase y este tiene que poder probarse solo.
 *
 *  · `nunca`       — no hay sello. O la clonación falló al escribirlos, o el
 *                    curso se creó antes de que existieran.
 *  · `caducado`    — hay sello, pero marcado `desactualizado`: alguien editó
 *                    una lección y la regeneración no llegó a terminar.
 *  · `al-dia`      — utilizables.
 */
export function estadoDeIndices(sello) {
  if (!sello || !sello.version) return 'nunca'
  if (sello.desactualizado) return 'caducado'
  return 'al-dia'
}

const TEXTOS = {
  'al-dia': {
    titulo: 'Índices al día',
    detalle: 'Abrir una lección cuesta 3 lecturas. Es lo correcto.',
    accion: 'Regenerar de todas formas',
    grave: false,
  },
  caducado: {
    titulo: 'Índices caducados',
    detalle:
      'Se editó contenido y los índices no llegaron a rehacerse. Los alumnos ven '
      + 'el contenido correcto, pero cada carga vuelve a costar el curso entero.',
    accion: 'Rehacer los índices',
    grave: true,
  },
  nunca: {
    titulo: 'Sin índices',
    detalle:
      'Este curso nunca generó sus índices. Nada está roto —el buscador, el '
      + 'glosario y los exámenes funcionan— pero cada vez que alguien abre el '
      + 'temario se descarga el curso completo en vez de tres documentos.',
    accion: 'Generar los índices',
    grave: true,
  },
}

/**
 * Todo lo que el panel necesita pintar para un curso, ya resuelto.
 *
 * Devuelve también las dos cifras que hacen entendible el problema, porque
 * «faltan los agregados» no le dice nada a nadie y «hoy caben 173 cargas al
 * día» sí.
 */
export function resumenDeIndices({ sello = null, temas = 0 } = {}) {
  const estado = estadoDeIndices(sello)
  const hayIndices = estado === 'al-dia'
  const t = TEXTOS[estado]
  return {
    estado,
    grave: t.grave,
    titulo: t.titulo,
    detalle: t.detalle,
    accion: t.accion,
    lecturasPorCarga: lecturasPorCarga(temas, hayIndices),
    cargasAlDia: cargasAntesDeAgotarCuota(temas, hayIndices),
    version: sello?.version || 0,
  }
}

/** Cuenta los temas de la estructura de un curso (módulos → unidades → temas). */
export function temasDeEstructura(estructura) {
  const modulos = Array.isArray(estructura) ? estructura : (estructura?.modulos || [])
  let n = 0
  for (const m of modulos) {
    // La estructura real anida los temas dentro de UNIDADES; algunos cursos
    // antiguos los cuelgan directamente del módulo. Se admiten las dos formas
    // porque contarlos mal aquí falsearía la cifra de lecturas, que es justo lo
    // que hace que alguien actúe.
    for (const u of (m.unidades || [])) n += (u.temas || []).length
    n += (m.temas || []).length
  }
  return n
}
