// ============================================================
//  Entrenador de farmacología — lógica pura
// ------------------------------------------------------------
//  Sin React ni Firebase: se prueba con `npm test`.
//
//  Todo lo que el alumno practica SALE DE LA FICHA. Las preguntas y las
//  tarjetas se construyen con los campos del catálogo (grupo, uso,
//  precaución, apéndice); ninguna afirma nada que la ficha no diga, y los
//  distractores son los mismos campos de OTRAS fichas. Así el entrenador no
//  puede enseñar un dato que nadie haya escrito y citado.
// ============================================================
import { barajarCon, generador } from './azar.js'

export const APENDICES = ['A', 'B', 'C', 'D']

export const ETIQUETA_ORIGEN = {
  A: 'NOM-034 · apéndice A',
  B: 'NOM-034 · apéndice B',
  C: 'NOM-034 · apéndice C',
  D: 'NOM-034 · apéndice D',
  ampliado: 'Formulario ampliado',
}

// Aviso permanente (PLAN-LMS §23.1 punto 2 y §27.4). No es descartable.
export const AVISO_PROTOCOLO =
  'Material de estudio. Presentación, concentración, dosis, vía y alcance profesional dependen del protocolo autorizado del servicio y de la indicación médica; esta ficha no los sustituye.'

export const AVISO_SIN_DOSIS =
  'El catálogo de la academia no incluye dosis, diluciones ni algoritmos de administración. Se consultan en el protocolo vigente del servicio.'

// Casilla de clasificación de una ficha: su apéndice o «ampliado».
export function casillaDe(f) {
  return f.apendice || 'ampliado'
}

// ---------- Validación (la usa tests/farmacos.test.mjs) -------------------

const CAMPOS_TEXTO = ['id', 'nombre', 'grupo', 'seccion', 'uso', 'precaucion']

// Una dosis solo es aceptable con su fuente COMPLETA: documento, edición,
// año y capítulo, sección o página. Es el guardarraíl de PLAN-LMS §23.1.
const TIPOS_CALCULO = ['fija', 'porKg', 'infusionPorKg', 'infusionFija', 'enTiempo', 'volumenPorKg', 'quemados']
const POBLACIONES = ['adulto', 'pediatrico', 'embarazo']

export function problemasDeDosis(d, presentaciones = []) {
  const p = []
  for (const c of ['id', 'indicacion', 'poblacion', 'via', 'dosisTexto']) {
    if (!d?.[c]) p.push(`dosis sin «${c}»`)
  }
  if (d?.poblacion && !POBLACIONES.includes(d.poblacion)) p.push(`población inválida «${d.poblacion}»`)
  const f = d?.fuente
  if (!f) return [...p, 'dosis sin fuente']
  for (const c of ['documento', 'edicion', 'anio', 'url']) {
    if (!f[c]) p.push(`fuente de dosis sin «${c}»`)
  }
  if (!f.capitulo && !f.pagina && !f.seccion) p.push('fuente de dosis sin capítulo, sección ni página')
  if (!d.cita) p.push('dosis sin cita literal de la fuente')
  const c = d.calculo
  if (c) {
    if (!TIPOS_CALCULO.includes(c.tipo)) p.push(`cálculo de tipo desconocido «${c.tipo}»`)
    if (c.tipo !== 'enTiempo' && !(c.valor > 0)) p.push('cálculo sin valor positivo')
    if (['fija', 'porKg'].includes(c.tipo)) {
      if (!['g', 'mg', 'mcg', 'UI', 'mEq'].includes(c.unidadMasa)) p.push('cálculo sin unidad de masa')
      if (c.presentacion && !presentaciones.some((x) => x.id === c.presentacion)) p.push(`presentación inexistente «${c.presentacion}»`)
    }
    if (c.tipo.startsWith('infusion') && !(c.dilucion?.mg > 0 && c.dilucion?.ml > 0)) p.push('infusión sin dilución')
    if (c.tipo === 'enTiempo' && !(c.volumenMl > 0 && c.minutos > 0)) p.push('paso en tiempo sin volumen o minutos')
    if (c.tipo === 'quemados' && !(c.horasPrimeraFraccion > 0 && c.fraccion > 0 && c.fraccion <= 1)) p.push('fórmula de quemados sin fracción u horas')
  }
  for (const o of d.administracion?.opciones || []) {
    if (!o.texto || !o.porque) p.push('opción de administración sin texto o sin porqué')
  }
  if (d.administracion && d.administracion.opciones.filter((o) => o.correcta).length !== 1) p.push('administración sin exactamente una opción correcta')
  return p
}

// Problemas de una ficha. Lista vacía = ficha aceptable.
export function problemasDeFicha(f, { secciones = [], referencias = {}, temasExistentes = null } = {}) {
  const p = []
  for (const c of CAMPOS_TEXTO) {
    if (typeof f?.[c] !== 'string' || !f[c].trim()) p.push(`falta «${c}»`)
  }
  if (secciones.length && !secciones.includes(f.seccion)) p.push(`sección desconocida «${f.seccion}»`)
  if (f.apendice && !APENDICES.includes(f.apendice)) p.push(`apéndice inválido «${f.apendice}»`)
  if (f.apendice && !f.numeral) p.push('ficha de la NOM sin numeral')
  if ((f.origen === 'nom') !== Boolean(f.apendice)) p.push('origen y apéndice no concuerdan')
  if (!f.fuente?.pagina && f.seccion !== 'complementarios') p.push('sin página del catálogo')
  const refs = f.fuente?.referencias || []
  if (!refs.length) p.push('sin referencias')
  for (const r of refs) if (!referencias[r]) p.push(`referencia inexistente [${r}]`)
  if (f.apendice && !refs.includes(1)) p.push('ficha de la NOM que no cita la NOM [1]')
  for (const d of f.dosis || []) p.push(...problemasDeDosis(d, f.presentaciones || []).map((x) => `${d.id || '?'}: ${x}`))
  for (const x of f.presentaciones || []) {
    const volumenOk = x.forma === 'tableta' || x.volumenMl > 0
    if (!x.id || !x.texto || !(x.cantidad > 0) || !volumenOk || !['g', 'mg', 'mcg', 'UI', 'mEq'].includes(x.unidad)) p.push(`presentación incompleta «${x.id}»`)
    if (!x.fuente?.documento) p.push(`presentación sin fuente «${x.id}»`)
  }
  if (temasExistentes) {
    for (const t of f.temasRelacionados || []) {
      if (!temasExistentes.has(t)) p.push(`tema inexistente «${t}»`)
    }
  }
  if ((f.temasRelacionados || []).length && !f.patron) p.push('temas relacionados sin «patron» que los compruebe')
  if (['validado', 'publicado'].includes(f.estadoEditorial)) {
    // Validar es una firma docente; el catálogo no se autovalida.
    if (!f.revision?.revisadoPor) p.push('estado validado sin revisor')
  }
  return p
}

// ---------- Consulta ------------------------------------------------------

// Índice inverso temaId → fichas. Se deriva del catálogo: ninguna lección se
// edita para enlazar sus fármacos (PLAN-LMS §27.2).
export function indiceInverso(farmacos) {
  const indice = {}
  for (const f of farmacos) {
    for (const t of f.temasRelacionados || []) {
      ;(indice[t] ||= []).push(f)
    }
  }
  return indice
}

function normalizar(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

export function filtrarFarmacos(farmacos, { consulta = '', seccion = 'todas', origen = 'todos' } = {}) {
  const q = normalizar(consulta).trim()
  return farmacos.filter((f) => {
    if (seccion !== 'todas' && f.seccion !== seccion) return false
    if (origen === 'nom' && !f.apendice) return false
    if (origen === 'ampliado' && f.apendice) return false
    if (!q) return true
    return normalizar(`${f.nombre} ${f.grupo} ${f.uso} ${f.precaucion}`).includes(q)
  })
}

// ---------- Práctica ------------------------------------------------------

// Tarjetas: dos por ficha, en el formato de /flashcards.
export function tarjetasDe(farmacos) {
  return farmacos.flatMap((f) => [
    {
      id: `${f.id}-uso`,
      farmacoId: f.id,
      frente: `${f.nombre}: ¿a qué grupo pertenece y para qué se usa?`,
      reverso: `${f.grupo}. ${f.uso}`,
    },
    {
      id: `${f.id}-precaucion`,
      farmacoId: f.id,
      frente: `${f.nombre}: ¿cuál es su precaución clave?`,
      reverso: f.precaucion,
    },
  ])
}

// Elige `n` valores distintos entre sí y distintos de `correcto`.
// PTEM Pulso: `cercanos` va PRIMERO (los de la misma sección del catálogo) y
// solo se completa con el resto si no alcanzan. Una opción de una sección
// lejana se descarta sola; una vecina obliga a distinguir.
function distractores(valores, correcto, n, rng, cercanos = []) {
  const vistos = new Set([normalizar(correcto)])
  const out = []
  for (const v of [...barajarCon(rng, cercanos), ...barajarCon(rng, valores)]) {
    const k = normalizar(v)
    if (vistos.has(k)) continue
    vistos.add(k)
    out.push(v)
    if (out.length === n) break
  }
  return out
}

function citaDe(f) {
  if (!f.fuente.pagina) return `Fuente: ${f.fuente.referencias.map((r) => `[${r}]`).join(' ')}.`
  return `Catálogo de la academia, p. ${f.fuente.pagina}${f.numeral ? ` · NOM-034 ${f.numeral}` : ''}.`
}

// Preguntas en el esquema del <Quiz> existente (correcta = 0; Quiz baraja).
// Se omite una pregunta si no hay tres distractores distintos.
export function preguntasDe(farmacos, { semilla = null, catalogo = farmacos } = {}) {
  const rng = semilla == null ? Math.random : generador(semilla)
  const grupos = catalogo.map((f) => f.grupo)
  const usos = catalogo.map((f) => f.uso)
  const precauciones = catalogo.map((f) => f.precaucion)
  const nombres = catalogo.map((f) => f.nombre)
  const casillas = [...APENDICES, 'ampliado'].map((c) => ETIQUETA_ORIGEN[c])
  const preguntas = []

  const agregar = (f, tipo, pregunta, correcto, pool, explicacion, campo = null) => {
    const cercanos = campo ? catalogo.filter((x) => x.id !== f.id && x.seccion === f.seccion).map((x) => x[campo]) : []
    const otros = distractores(pool, correcto, 3, rng, cercanos)
    if (otros.length < 3) return
    preguntas.push({
      id: `${f.id}-${tipo}`,
      farmacoId: f.id,
      pregunta,
      opciones: [correcto, ...otros],
      correcta: 0,
      explicacion: `${explicacion} ${citaDe(f)}`,
    })
  }

  for (const f of farmacos) {
    agregar(f, 'grupo', `¿A qué grupo pertenece ${f.nombre}?`, f.grupo, grupos,
      `${f.nombre} es ${f.grupo.toLowerCase()}.`, 'grupo')
    agregar(f, 'uso', `¿Qué uso le asigna el catálogo a ${f.nombre}?`, f.uso, usos,
      `${f.nombre}: ${f.uso}`, 'uso')
    agregar(f, 'precaucion', `¿Qué precaución corresponde a ${f.nombre}?`, f.precaucion, precauciones,
      `${f.nombre}: ${f.precaucion}`, 'precaucion')
    agregar(f, 'inverso', `¿Qué fármaco del catálogo corresponde a este uso? «${f.uso}»`, f.nombre, nombres,
      `Es ${f.nombre} (${f.grupo.toLowerCase()}).`, 'nombre')
    agregar(f, 'origen', `¿Dónde figura ${f.nombre}?`, ETIQUETA_ORIGEN[casillaDe(f)], casillas,
      f.apendice
        ? `Está en el mínimo de la NOM-034, apéndice ${f.apendice}.`
        : 'No figura por nombre en los apéndices A-D de la NOM-034: es un ejemplo de formulario ampliado, sujeto a protocolo.')
  }
  return barajarCon(rng, preguntas)
}

// Tanda de «clasificación relámpago»: fichas barajadas; el alumno decide la
// casilla (A/B/C/D/ampliado) de cada una contra reloj.
export function tandaClasificacion(farmacos, n = 12, semilla = null) {
  const rng = semilla == null ? Math.random : generador(semilla)
  return barajarCon(rng, farmacos).slice(0, n)
}

export function evaluarClasificacion(f, casilla) {
  return casillaDe(f) === casilla
}

// ---------- Relámpago con variantes (PTEM Pulso) ----------
//
//  apendice — ¿en qué apéndice de la NOM-034 está? (la de siempre)
//  unidad   — ¿cuál es la unidad MÍNIMA que lo lleva? La dotación es
//             acumulativa: el apéndice A va desde Traslado, el B desde
//             Urgencias básicas… Sin apéndice, «según formulario del servicio».
//  grupo    — ¿a qué grupo farmacológico pertenece? Las opciones falsas salen
//             primero de su misma sección.
export const VARIANTES_RELAMPAGO = {
  apendice: 'Apéndice NOM-034',
  unidad: 'Unidad que lo lleva',
  grupo: 'Grupo',
}
export const SIN_UNIDAD = 'Según formulario del servicio'

export function unidadMinima(f, unidades = []) {
  if (!f.apendice) return SIN_UNIDAD
  return unidades.find((u) => u.apendices.includes(f.apendice))?.tipo || SIN_UNIDAD
}

/** Opciones y respuesta de una ficha en una variante. */
export function preguntaRelampago(f, variante, { unidades = [], catalogo = [], semilla = null } = {}) {
  if (variante === 'unidad') {
    return { opciones: [...unidades.map((u) => u.tipo), SIN_UNIDAD], correcta: unidadMinima(f, unidades) }
  }
  if (variante === 'grupo') {
    const rng = semilla == null ? Math.random : generador(semilla)
    const cercanos = catalogo.filter((x) => x.id !== f.id && x.seccion === f.seccion).map((x) => x.grupo)
    const otros = distractores(catalogo.map((x) => x.grupo), f.grupo, 3, rng, cercanos)
    return { opciones: barajarCon(rng, [f.grupo, ...otros]), correcta: f.grupo }
  }
  return { opciones: [...APENDICES, 'ampliado'].map((c) => ETIQUETA_ORIGEN[c]), correcta: ETIQUETA_ORIGEN[casillaDe(f)] }
}

// ---------- Comparador (PTEM Pulso) ----------

/** Filas de un comparador de dos fichas, solo con campos que ya existen. */
export function filasComparador(a, b, unidades = []) {
  const unidadesDe = (f) => (f.apendice ? unidades.filter((u) => u.apendices.includes(f.apendice)).map((u) => u.tipo).join(', ') : SIN_UNIDAD)
  const filas = [
    ['Grupo', a.grupo, b.grupo],
    ['Origen', ETIQUETA_ORIGEN[casillaDe(a)], ETIQUETA_ORIGEN[casillaDe(b)]],
    ['Unidades que lo llevan', unidadesDe(a), unidadesDe(b)],
    ['Presentación en la NOM', a.presentacionNom || 'No figura', b.presentacionNom || 'No figura'],
    ['Uso', a.uso, b.uso],
    ['Precaución clave', a.precaucion, b.precaucion],
    ['Dosis verificadas', String(a.dosis?.length || 'Ninguna'), String(b.dosis?.length || 'Ninguna')],
  ]
  return filas.map(([campo, va, vb]) => ({ campo, a: va, b: vb, difiere: normalizar(va) !== normalizar(vb) }))
}
