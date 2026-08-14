// ============================================================
//  Guía del editor: cuál es el SIGUIENTE paso — lógica PURA
// ------------------------------------------------------------
//  El editor pide construir cuatro niveles —curso → fase → módulo → tema— y en
//  ningún sitio lo dice. Quien entra a crear su primer tema no tiene forma de
//  saber que antes necesita una fase y un módulo: ve un árbol vacío, un enlace
//  pequeño al final de una lista, y siete paneles de campos cuando por fin
//  llega. El paso a paso existía solo en la cabeza de quien lo programó.
//
//  Esto calcula, a partir de la estructura y de lo que está seleccionado, cuál
//  es LA acción siguiente. Una sola: dos sugerencias a la vez vuelven a dejar
//  la decisión en el aire, que es el problema de partida.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
//
//  Regla que gobierna todo esto: la guía aparece cuando algo está VACÍO, y
//  desaparece en cuanto hay contenido. No es un tutorial que acompaña siempre;
//  es un cartel en el hueco. Un editor que insiste cuando ya sabes lo que
//  haces se convierte en ruido y se aprende a ignorar.
// ============================================================

const activos = (lista) => (lista || []).filter((n) => n && n.estado !== 'archivado')

// ¿El contenido de un tema está vacío? Se mira lo que de verdad ve el alumno
// (secciones con bloques), no los campos de apoyo: un tema con solo un objetivo
// escrito sigue siendo una página en blanco para quien estudia.
export function temaSinContenido(tema) {
  if (!tema) return false // sin cargar todavía: no se opina
  const secciones = tema.secciones || []
  return !secciones.some((s) => (s?.bloques || []).length > 0)
}

// Devuelve { clave, titulo, texto, etiquetaAccion, accion } o null.
// `accion` es lo que el editor ya sabe ejecutar: { tipo: 'fase'|'modulo'|'tema',
// faseId?, moduloId? }. Puede venir en null: hay pasos que solo hay que
// SEÑALAR, y un botón que no lleva a ningún sitio nuevo es peor que una frase.
export function siguientePaso({ estructura = [], seleccion = null, tema = null, puedeCrear = true } = {}) {
  if (!puedeCrear) return null

  const fases = activos(estructura)

  // 1. Un temario sin fases. Es el estado en el que se queda quien acaba de
  //    crear su curso, y el más desorientador de todos.
  if (fases.length === 0) {
    return {
      clave: 'sin-fases',
      titulo: 'Tu temario está vacío',
      texto: 'Un temario se organiza en fases (los grandes bloques del curso), cada fase en módulos, y cada módulo en temas. Empieza por la primera fase.',
      etiquetaAccion: 'Crear la primera fase',
      accion: { tipo: 'fase' },
    }
  }

  // 2. Una fase sin módulos. Se prioriza la fase SELECCIONADA: si el usuario
  //    está mirando una, el siguiente paso es el de esa y no el de otra.
  const faseSel = seleccion?.faseId ? fases.find((f) => f.id === seleccion.faseId) : null
  const faseVacia = (faseSel && activos(faseSel.modulos).length === 0)
    ? faseSel
    : fases.find((f) => activos(f.modulos).length === 0)
  if (faseVacia) {
    return {
      clave: 'sin-modulos',
      titulo: `«${faseVacia.titulo}» no tiene módulos`,
      texto: 'Los temas no cuelgan de la fase directamente: van dentro de un módulo. Crea el primero para poder añadir temas.',
      etiquetaAccion: 'Crear un módulo aquí',
      accion: { tipo: 'modulo', faseId: faseVacia.id },
    }
  }

  // 3. Un módulo sin temas, con la misma preferencia por lo seleccionado.
  const parejas = []
  for (const f of fases) {
    for (const m of activos(f.modulos)) parejas.push({ fase: f, modulo: m })
  }
  const selPareja = seleccion?.moduloId
    ? parejas.find((p) => p.modulo.id === seleccion.moduloId)
    : null
  const moduloVacio = (selPareja && activos(selPareja.modulo.temas).length === 0)
    ? selPareja
    : parejas.find((p) => activos(p.modulo.temas).length === 0)
  if (moduloVacio) {
    return {
      clave: 'sin-temas',
      titulo: `«${moduloVacio.modulo.titulo}» no tiene temas`,
      texto: 'El tema es la página que estudia el alumno. Ahí van el contenido, las imágenes, el quiz y las actividades.',
      etiquetaAccion: 'Crear un tema aquí',
      accion: { tipo: 'tema', faseId: moduloVacio.fase.id, moduloId: moduloVacio.modulo.id },
    }
  }

  // 4. Un tema abierto y todavía en blanco. Aquí no hay nada que ejecutar: el
  //    sitio donde se escribe ya está abierto en el panel de la derecha. Lo
  //    único que faltaba era decir por dónde se empieza, porque entre siete
  //    apartados no se adivina cuál es el que ve el alumno.
  if (seleccion?.temaId && temaSinContenido(tema)) {
    return {
      clave: 'tema-vacio',
      titulo: 'Este tema todavía no tiene contenido',
      texto: 'Empieza por «Contenido del tema», a la derecha: son las secciones que lee el alumno. El resto —quiz, flashcards, actividades— se puede añadir después.',
      etiquetaAccion: '',
      accion: null,
    }
  }

  // Hay estructura y contenido: la guía se calla.
  return null
}
