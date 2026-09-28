// ============================================================
//  Modo llamada — casos que se ramifican (PTEM Pulso, entrega 6)
// ------------------------------------------------------------
//  Motor y formato. El CONTENIDO de los casos es clínico y lo escribe y valida
//  la academia (CLAUDE.md §4: no se inventa contenido clínico). Un caso solo
//  llega al alumno con estado `validado` o `publicado`, igual que los bancos
//  de examen, y sin errores de forma.
//
//  Formato:
//  {
//    id: 'caso-…', titulo, resumen,
//    estado: 'borrador' | 'en_revision' | 'validado' | 'publicado',
//    temas: ['m3-ep-avdi', …],            // lecciones que sostienen el caso
//    fuentes: [{ nombre, nota }],          // como en las lecciones
//    inicio: 'n1',
//    nodos: {
//      n1: { texto, opciones: [{ texto, va: 'n2', tipo: 'correcta'|'aceptable'|'riesgo', retro, tema? }] },
//      fin1: { texto, fin: true, desenlace: 'favorable'|'desfavorable' },
//    },
//  }
// ============================================================

export const ESTADOS_CASO = ['borrador', 'en_revision', 'validado', 'publicado']
const TIPOS = ['correcta', 'aceptable', 'riesgo']
const AVALADOS = new Set(['validado', 'publicado'])

/** Errores de forma de un caso. Lista vacía = caso bien formado. */
export function validarCaso(caso) {
  const errores = []
  if (!caso || typeof caso !== 'object') return ['El caso no es un objeto.']
  if (!caso.id) errores.push('Falta el id.')
  if (!caso.titulo) errores.push('Falta el título.')
  if (!ESTADOS_CASO.includes(caso.estado)) errores.push('Estado desconocido.')
  if (!Array.isArray(caso.temas) || !caso.temas.length) errores.push('El caso debe citar al menos una lección.')
  if (!Array.isArray(caso.fuentes) || !caso.fuentes.length) errores.push('El caso debe declarar sus fuentes.')
  const nodos = caso.nodos || {}
  if (!nodos[caso.inicio]) errores.push('El nodo de inicio no existe.')
  let finales = 0
  for (const [id, n] of Object.entries(nodos)) {
    if (!n?.texto) errores.push(`El nodo «${id}» no tiene texto.`)
    if (n?.fin) {
      finales += 1
      if (!['favorable', 'desfavorable'].includes(n.desenlace)) errores.push(`El final «${id}» no declara desenlace.`)
      continue
    }
    const ops = n?.opciones || []
    if (ops.length < 2) errores.push(`El nodo «${id}» necesita al menos dos opciones.`)
    for (const o of ops) {
      if (!nodos[o?.va]) errores.push(`Una opción de «${id}» lleva a un nodo que no existe.`)
      if (!TIPOS.includes(o?.tipo)) errores.push(`Una opción de «${id}» no declara si es correcta, aceptable o de riesgo.`)
      if (!o?.retro) errores.push(`Una opción de «${id}» no explica su consecuencia.`)
    }
  }
  if (!finales) errores.push('El caso no tiene ningún final.')
  // Todo nodo debe poder alcanzarse desde el inicio.
  const vistos = new Set()
  const pila = [caso.inicio]
  while (pila.length) {
    const id = pila.pop()
    if (!id || vistos.has(id) || !nodos[id]) continue
    vistos.add(id)
    for (const o of nodos[id].opciones || []) pila.push(o.va)
  }
  for (const id of Object.keys(nodos)) if (!vistos.has(id)) errores.push(`El nodo «${id}» no se alcanza desde el inicio.`)
  return errores
}

/** Solo casos avalados por un docente, bien formados y sobre temas visibles. */
export function casosParaElAlumno(casos = [], { temaVisible = () => true } = {}) {
  return casos.filter((c) => AVALADOS.has(c?.estado)
    && validarCaso(c).length === 0
    && c.temas.every((t) => temaVisible(t)))
}

/** Aplica una decisión: devuelve el nodo siguiente y el registro ampliado. */
export function decidir(caso, nodoId, indiceOpcion, registro = [], ms = 0) {
  const nodo = caso?.nodos?.[nodoId]
  const opcion = nodo?.opciones?.[indiceOpcion]
  if (!opcion) return { nodoId, registro }
  return {
    nodoId: opcion.va,
    registro: [...registro, { nodo: nodoId, opcion: indiceOpcion, tipo: opcion.tipo, retro: opcion.retro, tema: opcion.tema || null, ms }],
  }
}

/** Resumen del recorrido para la pantalla final. */
export function resumenRecorrido(caso, registro = [], nodoFinal) {
  const final = caso?.nodos?.[nodoFinal]
  const cuenta = (tipo) => registro.filter((r) => r.tipo === tipo).length
  const repasar = [...new Set(registro.filter((r) => r.tipo !== 'correcta' && r.tema).map((r) => r.tema))]
  return {
    desenlace: final?.desenlace || null,
    decisiones: registro.length,
    correctas: cuenta('correcta'),
    aceptables: cuenta('aceptable'),
    riesgos: cuenta('riesgo'),
    segundos: Math.round(registro.reduce((s, r) => s + (r.ms || 0), 0) / 1000),
    repasar,
  }
}
