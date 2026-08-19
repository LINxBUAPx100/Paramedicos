// ============================================================
//  Los CURSOS que esta persona puede estudiar — lógica PURA
// ------------------------------------------------------------
//  La plataforma nació con un solo plan, el de paramédico, y eso se coló en
//  sitios donde no debía: el resolutor cargaba `cursos[0]` y llamaba a eso «el
//  contenido», y el Home hablaba de Técnico en Urgencias Médicas como si no
//  pudiera haber otra cosa. En cuanto una academia imparta enfermería —o un
//  grupo curse una especialización además de su carrera— eso deja de ser
//  cierto: hay VARIOS cursos y hay que poder verlos y elegir.
//
//  Este módulo responde a tres preguntas, sin React y sin Firebase:
//    · ¿qué cursos puede ver esta persona? (lo decide su grupo, ver
//      programasModelo.js: el aislamiento por programa manda);
//    · ¿cuál está estudiando ahora?
//    · ¿qué hay dentro de cada uno? (módulos y temas, sin bajar los temas).
// ============================================================
import { programasVisibles } from './programasModelo.js'
import { META_PROGRAMA } from './programasModelo.js'

// Cuenta módulos y temas leyendo SOLO la estructura del curso: son datos que ya
// viajan en el doc del curso, así que la tarjeta del Home no cuesta lecturas.
export function conteosDeCurso(curso) {
  const modulos = Array.isArray(curso?.estructura) ? curso.estructura : []
  let temas = 0
  for (const modulo of modulos) {
    for (const unidad of modulo?.unidades || []) temas += (unidad?.temas || []).length
    // Estructura antigua sin nivel unidad: los temas cuelgan del módulo.
    if (!modulo?.unidades && Array.isArray(modulo?.temas)) temas += modulo.temas.length
  }
  return { modulos: modulos.length, temas }
}

/**
 * Cursos visibles para esta persona, ya listos para pintar.
 *
 * @param {Array} cursos docs de `cursos` de su academia
 * @param {{rol?:string, esSuperadmin?:boolean, grupo?:object}} acceso
 * @param {string|null} cursoActivo id del que se está sirviendo ahora
 */
export function cursosDelUsuario(cursos, acceso = {}, cursoActivo = null) {
  const visibles = programasVisibles(cursos || [], {
    rol: acceso.rol,
    esSuperadmin: acceso.esSuperadmin,
    grupo: acceso.grupo,
  })
  return visibles
    .map((c) => {
      const tipo = META_PROGRAMA[c.tipoPrograma] ? c.tipoPrograma : 'tum'
      return {
        id: c.id,
        titulo: c.titulo || c.id,
        tipoPrograma: tipo,
        etiqueta: META_PROGRAMA[tipo].etiqueta,
        etiquetaCorta: META_PROGRAMA[tipo].etiquetaCorta,
        color: META_PROGRAMA[tipo].color,
        icono: META_PROGRAMA[tipo].icono,
        conteos: conteosDeCurso(c),
        activo: Boolean(cursoActivo) && c.id === cursoActivo,
        // Un curso a medio clonar no se puede estudiar: se enseña, pero
        // desactivado, en vez de dejar que alguien entre a un temario con
        // agujeros y crea que ese es el contenido.
        listo: Boolean(c.clonacion?.completa),
        orden: Number.isFinite(c.orden) ? c.orden : 1,
      }
    })
    .sort((a, b) => a.orden - b.orden || a.titulo.localeCompare(b.titulo))
}

/**
 * Qué curso hay que servir: el que la persona eligió, si sigue estando a su
 * alcance; si no, el primero. Nunca devuelve uno que no pueda ver —de eso
 * depende el aislamiento— ni uno a medio clonar si hay alguno completo.
 */
export function cursoAServir(cursosVisibles, preferido = null) {
  const lista = cursosVisibles || []
  if (!lista.length) return null
  const elegido = lista.find((c) => c.id === preferido)
  if (elegido && elegido.listo !== false) return elegido.id
  const primeroListo = lista.find((c) => c.listo !== false)
  return (primeroListo || lista[0]).id
}

// ¿Hace falta enseñar el selector de cursos? Con uno solo, no: sería una
// pantalla que pide elegir entre una única opción.
export function hayVariosCursos(cursosVisibles) {
  return (cursosVisibles || []).length > 1
}
