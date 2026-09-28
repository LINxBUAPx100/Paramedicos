// ============================================================
//  Ruta del entrenador de farmacología (PTEM Pulso, entregas 1 a 3)
// ------------------------------------------------------------
//  Lógica PURA: niveles por fármaco, avance de cada etapa de la ruta, errores
//  de cálculo acumulados y qué habilidad practicar para cada error. No añade
//  datos clínicos: todo sale del catálogo, del repaso espaciado y del almacén
//  de dominio que el entrenador ya tenía (lib/dominioFarmacos.js).
// ============================================================
import { claveTarjeta } from './pulsoModelo.js'

// Las tarjetas de un fármaco entran al repaso con este «tema» sintético, para
// que su clave no choque nunca con la de una lección.
export const PREFIJO_TARJETA = 'farm:'
export const temaDeFarmaco = (farmacoId) => `${PREFIJO_TARJETA}${farmacoId}`
export const esClaveDeFarmaco = (clave) => String(clave || '').startsWith(PREFIJO_TARJETA)

/** Tarjetas del entrenador en el formato del repaso espaciado. */
export function tarjetasParaRepaso(tarjetas = [], farmacos = []) {
  const nombre = new Map(farmacos.map((f) => [f.id, f.nombre]))
  return tarjetas.map((t) => ({
    ...t,
    temaId: temaDeFarmaco(t.farmacoId),
    temaTitulo: nombre.get(t.farmacoId) || t.farmacoId,
    enlace: `/farmacos/${t.farmacoId}`,
    clave: claveTarjeta(temaDeFarmaco(t.farmacoId), t.frente),
  }))
}

export const NIVELES_FARMACO = ['Sin empezar', 'Conoce', 'Clasifica', 'Aplica']

/**
 * Nivel de UN fármaco:
 *  1 Conoce    — alguna de sus tarjetas se calificó «bien» o «fácil» en el repaso;
 *  2 Clasifica — acertó su clasificación en el relámpago (clave `clas:<id>`);
 *  3 Aplica    — dominó alguno de sus casos (`caso:<id>:<dosis>` dominada).
 * Cada nivel exige el anterior. Un fármaco sin casos llega como máximo a 2, y
 * `maximo` lo dice para no presentarlo como incompleto.
 */
export function nivelDeFarmaco(f, { srs = {}, dominio = {}, conCasos = false } = {}) {
  const tema = temaDeFarmaco(f.id)
  const tarjetas = Object.entries(srs).filter(([k]) => k.startsWith(`${tema}#`)).map(([, v]) => v)
  const conoce = tarjetas.some((t) => (t?.intervalo || 0) >= 1)
  const clasifica = Boolean(dominio[`clas:${f.id}`]?.racha > 0 || dominio[`clas:${f.id}`]?.dominada)
  const aplica = Object.entries(dominio).some(([k, v]) => k.startsWith(`caso:${f.id}:`) && v?.dominada)
  let nivel = 0
  if (conoce) nivel = 1
  if (nivel === 1 && clasifica) nivel = 2
  if (nivel === 2 && aplica) nivel = 3
  return { nivel, maximo: conCasos ? 3 : 2 }
}

/**
 * Avance de las cuatro etapas. `casos` = [{ f, d }] de casosDisponibles().
 * Devuelve [{ id, titulo, sub, modo, pct, hechos, total }] y el índice de la
 * primera etapa sin terminar (la «actual»).
 */
export function etapasDeRuta({ farmacos = [], niveles = new Map(), dominio = {}, habilidades = [], casos = [] } = {}) {
  const n = (min) => farmacos.filter((f) => (niveles.get(f.id)?.nivel || 0) >= min).length
  const calc = habilidades.filter((h) => dominio[`calc:${h.id}`]?.dominada).length
  const casosHechos = casos.filter(({ f, d }) => dominio[`caso:${f.id}:${d.id}`]?.dominada).length
  const etapas = [
    { id: 'conocer', titulo: 'Conocer', sub: 'Catálogo y tarjetas', modo: 'tarjetas', hechos: n(1), total: farmacos.length },
    { id: 'clasificar', titulo: 'Clasificar', sub: 'NOM-034 y relámpago', modo: 'relampago', hechos: n(2), total: farmacos.length },
    { id: 'calcular', titulo: 'Calcular', sub: 'Aprende a calcular', modo: 'calcular', hechos: calc, total: habilidades.length },
    { id: 'aplicar', titulo: 'Aplicar', sub: 'Casos clínicos', modo: 'casos', hechos: casosHechos, total: casos.length },
  ].map((e) => ({ ...e, pct: e.total ? Math.round((e.hechos / e.total) * 100) : 0 }))
  const actual = etapas.findIndex((e) => e.total > 0 && e.hechos < e.total)
  return { etapas, actual: actual < 0 ? etapas.length - 1 : actual }
}

// ---------- Errores de cálculo ----------

// Tipo de error que devuelve diagnosticar() → habilidad que lo entrena.
export const HABILIDAD_PARA_ERROR = {
  unidades: 'conversiones',
  decimal: 'porcentajes',
  invertido: 'volumen',
  peso: 'peso',
  tope: 'peso',
  tiempo: 'tiempo',
  factor: 'goteo',
}

export const NOMBRE_ERROR = {
  unidades: 'Conversión de unidades',
  decimal: 'Punto decimal y porcentajes',
  invertido: 'Operación invertida',
  peso: 'Peso del paciente',
  tope: 'Dosis máxima',
  tiempo: 'Minutos y horas',
  factor: 'Factor de goteo',
}

/** Suma a `previos` los tipos de error de una tanda de pasos resueltos. */
export function sumarErrores(previos = {}, resultados = []) {
  const n = { ...previos }
  for (const r of resultados) {
    for (const tipo of r?.errores || []) {
      if (!NOMBRE_ERROR[tipo]) continue // «formato» y «otro» no dicen qué practicar
      n[tipo] = (n[tipo] || 0) + 1
    }
  }
  return n
}

/** Errores de más a menos frecuente, con la habilidad que los entrena. */
export function erroresOrdenados(errores = {}) {
  return Object.entries(errores)
    .filter(([tipo, n]) => n > 0 && NOMBRE_ERROR[tipo])
    .sort((a, b) => b[1] - a[1])
    .map(([tipo, n]) => ({ tipo, n, nombre: NOMBRE_ERROR[tipo], habilidad: HABILIDAD_PARA_ERROR[tipo] || null }))
}

// ---------- Fármacos dentro de la lectura (entrega 2) ----------

/**
 * Parte `texto` en segmentos, marcando las apariciones de los fármacos dados
 * según su `patron` (el mismo que tests/farmacos.test.mjs comprueba en cada
 * lección relacionada). Solo se buscan los fármacos que el catálogo liga a la
 * lección: así no se marca por error una palabra de otra.
 * Devuelve [{ texto, farmaco? }].
 */
export function partirPorFarmacos(texto, farmacos = []) {
  const s = String(texto || '')
  const con = farmacos.filter((f) => f?.patron)
  if (!s || !con.length) return [{ texto: s }]
  const res = con.map((f) => { try { return new RegExp(f.patron, 'iu') } catch { return null } })
  const salida = []
  let resto = s
  // Siempre se toma la aparición MÁS TEMPRANA de cualquiera de los fármacos.
  for (let guarda = 0; resto && guarda < 200; guarda++) {
    let mejor = null
    res.forEach((re, k) => {
      if (!re) return
      const m = re.exec(resto)
      if (m && m[0] && (!mejor || m.index < mejor.index)) mejor = { index: m.index, largo: m[0].length, f: con[k] }
    })
    if (!mejor) break
    if (mejor.index > 0) salida.push({ texto: resto.slice(0, mejor.index) })
    salida.push({ texto: resto.slice(mejor.index, mejor.index + mejor.largo), farmaco: mejor.f })
    resto = resto.slice(mejor.index + mejor.largo)
  }
  if (resto) salida.push({ texto: resto })
  return salida
}
