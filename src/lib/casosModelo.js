import { incoherenciaConciencia, leerGlasgow } from './exploracion.js'
import { aplicarVariante } from './variacion.js'

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
//
//  SIGNOS VITALES QUE REACCIONAN (05-10-2026). Opcionales:
//    caso.signos      — los de partida: { avdi, fc, fr, spo2, ta, piel, ritmo, glucosa, temp }
//    opcion.signos    — lo que CAMBIA esa decisión (parcial: solo las claves que mueve)
//    nodo.signos      — cómo evoluciona el paciente al llegar a ese momento, sea cual
//                       sea el camino (parcial también)
//  El monitor se reconstruye desde el recorrido: inicio → por cada paso, efecto
//  de la opción elegida y luego la evolución del nodo al que lleva. Dos alumnos
//  que deciden distinto ven signos distintos.
//  Valores: número, texto («boqueo», «sin pulso») o null («—», no medible).
//  Son valores ILUSTRATIVOS del escenario, no rangos de referencia: el caso no
//  enseña cifras que su lección no enseñe.
// ============================================================

export const ESTADOS_CASO = ['borrador', 'en_revision', 'validado', 'publicado']
const TIPOS = ['correcta', 'aceptable', 'riesgo']
const AVALADOS = new Set(['validado', 'publicado'])

// Claves del monitor, en el orden en que se pintan, y qué admite cada una.
export const SIGNOS = [
  { clave: 'avdi', etiqueta: 'AVDI', unidad: '' },
  { clave: 'fc', etiqueta: 'FC', unidad: 'lpm', min: 0, max: 250 },
  { clave: 'fr', etiqueta: 'FR', unidad: 'rpm', min: 0, max: 70 },
  { clave: 'spo2', etiqueta: 'SpO₂', unidad: '%', min: 0, max: 100 },
  { clave: 'ta', etiqueta: 'TA', unidad: 'mmHg' },
  { clave: 'glucosa', etiqueta: 'Glucosa', unidad: 'mg/dL', min: 0, max: 1500 },
  { clave: 'temp', etiqueta: 'Temp.', unidad: '°C', min: 20, max: 45 },
  { clave: 'ritmo', etiqueta: 'Ritmo', unidad: '' },
  { clave: 'piel', etiqueta: 'Piel', unidad: '' },
  { clave: 'pupilas', etiqueta: 'Pupilas', unidad: '' },
  // Exploración neurológica focal (cara, fuerza de las cuatro extremidades,
  // habla), como la enseña m3-ep-neurologica. Texto.
  { clave: 'neuro', etiqueta: 'Neuro', unidad: '' },
  // Valoración neurovascular distal de una extremidad lesionada (pulso,
  // color/temperatura, sensibilidad, movilidad), como la enseña m1-pab-fracturas.
  { clave: 'distal', etiqueta: 'Distal', unidad: '' },
  // Lo que se ve al observar cuando hay movimientos anormales (una crisis
  // convulsiva): sustituye a la frase que deriva de Glasgow.
  { clave: 'movimientos', etiqueta: 'Movimientos', unidad: '' },
  // Exploración de tórax y cuello (inspección, palpación, percusión, yugulares,
  // tráquea), como la enseña m4-resp-exploracion-torax.
  { clave: 'torax', etiqueta: 'Tórax', unidad: '' },
  // Glasgow real del paciente («O3V4M6»). Opcional: sin él se usa el que
  // corresponde a su AVDI. No se muestra nunca: el alumno lo clasifica.
  { clave: 'glasgow', etiqueta: 'Glasgow', unidad: '' },
]
const POR_CLAVE = Object.fromEntries(SIGNOS.map((x) => [x.clave, x]))

function erroresDeSignos(signos, donde) {
  if (signos == null) return []
  if (typeof signos !== 'object' || Array.isArray(signos)) return [`${donde}: «signos» debe ser un objeto.`]
  const errores = []
  for (const [k, v] of Object.entries(signos)) {
    const def = POR_CLAVE[k]
    if (!def) { errores.push(`${donde}: signo desconocido «${k}».`); continue }
    if (v === null) continue
    if (k === 'glasgow') {
      if (!leerGlasgow(v)) errores.push(`${donde}: Glasgow debe tener la forma O#V#M# («O3V4M6»).`)
    } else if (k === 'avdi') {
      if (!['A', 'V', 'D', 'I'].includes(v)) errores.push(`${donde}: AVDI debe ser A, V, D o I.`)
    } else if (k === 'ta') {
      // «120/80», o texto cuando no se puede medir así («no se palpa radial»).
      if (typeof v !== 'string' || !v) errores.push(`${donde}: TA debe ser texto («120/80»).`)
    } else if (typeof v === 'number') {
      if (def.min == null || v < def.min || v > def.max) errores.push(`${donde}: ${def.etiqueta} fuera de rango (${v}).`)
    } else if (typeof v !== 'string' || !v) {
      errores.push(`${donde}: ${def.etiqueta} debe ser número, texto o null.`)
    }
  }
  return errores
}

/**
 * Signos del monitor tras un recorrido. Devuelve `actual` y `previo` (el
 * estado antes del último paso) para pintar la tendencia, o null si el caso
 * no tiene monitor.
 */
export function signosDelRecorrido(caso, registro = []) {
  if (!caso?.signos) return null
  let actual = { ...caso.signos }
  let previo = { ...actual }
  for (const paso of registro) {
    previo = actual
    const opcion = caso.nodos?.[paso.nodo]?.opciones?.[paso.opcion]
    const llegada = caso.nodos?.[opcion?.va]
    const cambios = { ...(opcion?.signos || {}), ...(llegada?.signos || {}) }
    actual = { ...actual, ...cambios }
    // Un AVDI nuevo sin Glasgow nuevo: el Glasgow anterior ya no vale y se
    // deriva del AVDI (exploracion.glasgowDe). Igual que en el validador.
    if ('avdi' in cambios && !('glasgow' in cambios)) delete actual.glasgow
  }
  return { actual, previo }
}

/** Dirección del cambio de un signo numérico: 1 sube, -1 baja, 0 igual o no comparable. */
export function tendencia(actual, previo) {
  const num = (v) => (typeof v === 'number' ? v : typeof v === 'string' && /^\d{2,3}\/\d{2,3}$/.test(v) ? Number(v.split('/')[0]) : null)
  const a = num(actual)
  const b = num(previo)
  if (a == null || b == null || a === b) return 0
  return a > b ? 1 : -1
}

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
  errores.push(...erroresDeSignos(caso.signos, 'Inicio'))
  if (caso.rol != null && !['lego', 'tum'].includes(caso.rol)) errores.push('El rol debe ser «lego» o «tum».')
  if (caso.paciente != null && !['adulto', 'nino', 'lactante'].includes(caso.paciente)) errores.push('El paciente debe ser «adulto», «nino» o «lactante».')
  // AVDI y Glasgow tienen que contar la misma historia en cada momento
  // posible del caso; si no, el alumno aprendería mal las dos escalas.
  for (const estado of estadosPosibles(caso)) {
    const mal = incoherenciaConciencia(estado.signos)
    if (mal) { errores.push(`${estado.donde}: ${mal}`); break }
  }
  let finales = 0
  for (const [id, n] of Object.entries(nodos)) {
    if (!n?.texto) errores.push(`El nodo «${id}» no tiene texto.`)
    errores.push(...erroresDeSignos(n?.signos, `Nodo «${id}»`))
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
      errores.push(...erroresDeSignos(o?.signos, `Opción de «${id}»`))
    }
  }
  if (!finales) errores.push('El caso no tiene ningún final.')
  // VERSIONES (lib/variacion.js): cada una tiene que ser un caso válido por sí
  // sola, y solo puede tocar momentos que existen.
  if (caso.variantes != null) {
    if (!Array.isArray(caso.variantes) || caso.variantes.length > 6) errores.push('«variantes» debe ser una lista de hasta 6 versiones.')
    else {
      caso.variantes.forEach((v, i) => {
        const nombre = v?.etiqueta || `versión ${i + 1}`
        for (const id of Object.keys(v?.nodos || {})) {
          if (!nodos[id]) errores.push(`La ${nombre} cambia el momento «${id}», que no existe.`)
        }
        for (const e of validarCaso(aplicarVariante(caso, i))) errores.push(`${nombre}: ${e}`)
      })
    }
  }
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

/**
 * Lo que ve el PERSONAL: todos los casos bien formados, avalados o no, para
 * poder revisarlos donde se van a usar. Cada uno lleva `avalado` para que la
 * pantalla marque los que el alumno todavía no ve.
 */
export function casosParaElPersonal(casos = []) {
  return casos
    .filter((c) => validarCaso(c).length === 0)
    .map((c) => ({ ...c, avalado: AVALADOS.has(c.estado) }))
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

/**
 * Los estados de signos que el caso puede llegar a mostrar: el inicial y el
 * que resulta tras cada opción (opción + llegada), aplicados sobre el estado
 * con que se llega a su nodo. Recorre el grafo una vez por nodo.
 */
function estadosPosibles(caso) {
  const out = []
  if (!caso?.signos || !caso.nodos?.[caso.inicio]) return out
  const visto = new Set()
  const cola = [{ id: caso.inicio, signos: { ...caso.signos } }]
  out.push({ donde: 'Inicio', signos: cola[0].signos })
  while (cola.length) {
    const { id, signos } = cola.shift()
    if (visto.has(id)) continue
    visto.add(id)
    for (const o of caso.nodos[id]?.opciones || []) {
      const llegada = caso.nodos[o.va]
      if (!llegada) continue
      const tras = { ...signos, ...(o.signos || {}), ...(llegada.signos || {}) }
      // Si la opción cambia el AVDI y no dice Glasgow, el Glasgow anterior ya
      // no vale: se deja que se derive del nuevo AVDI.
      if (('avdi' in (o.signos || {}) || 'avdi' in (llegada.signos || {}))
        && !('glasgow' in (o.signos || {})) && !('glasgow' in (llegada.signos || {}))) delete tras.glasgow
      out.push({ donde: `Tras «${o.texto.slice(0, 40)}…»`, signos: tras })
      cola.push({ id: o.va, signos: tras })
    }
  }
  return out
}
