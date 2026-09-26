// ============================================================
//  Casos clínicos del entrenador — generador puro
// ------------------------------------------------------------
//  Un caso encadena las decisiones reales de una administración:
//
//    1. ¿qué fármaco?     (opción; los distractores dicen para qué sirven)
//    2. ¿qué vía?         (opción; si la vía es la de OTRA indicación del
//                          mismo fármaco, la pista lo dice)
//    3. ¿cuánta dosis?    (número; con el peso del paciente y el tope)
//    4. ¿cuántos mL?      (número; con la presentación real)
//       o ¿a cuántos mL/h? (infusiones)
//    5. ¿cómo se administra? (opción, solo si la ficha lo documenta)
//
//  Cada cifra sale de una entrada `dosis` del catálogo, que a su vez exige
//  fuente completa (tests/farmacos.test.mjs). Aquí no se escribe ninguna.
// ============================================================
import { barajarCon, generador } from './azar.js'
import {
  convertirMasa, dosisPorPeso, volumenAExtraer, mlHoraPorPeso, mlHoraFija,
  mlHoraPorTiempo, fmt, redondear,
} from './calculoDosis.js'

export const VIAS = ['IV', 'IO', 'IM', 'IN', 'SL', 'VO', 'Inhalada']

// Pesos con los que se generan los pacientes, por población.
const PESOS = {
  adulto: [50, 55, 60, 65, 70, 75, 80, 90],
  pediatrico: [4, 6, 8, 10, 12, 15, 18, 20, 25, 30, 35],
  embarazo: [60, 65, 70, 75, 80],
}

const ETIQUETA_POBLACION = { adulto: 'Adulto', pediatrico: 'Paciente pediátrico', embarazo: 'Paciente embarazada' }

function paso(id, pregunta, respuesta, unidad, formula, resolucion, ctx = {}) {
  return { id, pregunta, respuesta: redondear(respuesta, 4), unidad, formula, resolucion, ctx }
}

// ---------- Distractores honestos ----------------------------------------

const normal = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

// Condiciones que se nombran de varias maneras en el catálogo.
const SINONIMOS = {
  paro: ['reanim', 'sin pulso', 'fibrila', 'paro'],
  dolor: ['dolor', 'analges', 'analgos'],
  convul: ['convul', 'epilep'],
  hipote: ['hipote', 'choque', 'vasopres', 'presion'],
  hemorr: ['hemorr', 'sangr'],
  intuba: ['intuba', 'induccion', 'via aerea'],
  sedaci: ['sedac', 'sedant'],
  hipert: ['hipert'],
  opioid: ['opioid'],
  benzod: ['benzod'],
}
const VACIAS = new Set(['aguda', 'agudo', 'grave', 'severo', 'moderado', 'moderadamente', 'dosis', 'carga', 'sintomatica', 'refractaria', 'embarazo', 'puerperio', 'persistente', 'adulto', 'estado', 'infusion'])

// Raíces de las palabras que definen la condición del caso.
function raicesDe(texto) {
  const out = new Set()
  for (const w of normal(texto).split(/[^a-z]+/)) {
    if ((w.length < 5 && !SINONIMOS[w]) || VACIAS.has(w)) continue
    const r = w.slice(0, 6)
    out.add(r)
    for (const [k, alias] of Object.entries(SINONIMOS)) {
      if (r.startsWith(k.slice(0, 5)) || alias.some((a) => r.startsWith(a.slice(0, 5)))) alias.forEach((a) => out.add(a))
    }
  }
  return out
}

// ¿La ficha `x` sirve también para la condición de la dosis `d`?
export function compartenCondicion(d, x) {
  const raices = raicesDe(d.indicacion)
  const suyo = normal([x.uso, ...(x.dosis || []).map((y) => y.indicacion)].join(' '))
  return [...raices].some((r) => suyo.includes(r))
}

// ¿La fuente de la dosis admite esa vía? (p. ej. «IN, IM, IV o IO»)
export function viaMencionada(d, via) {
  const t = String(d.dosisTexto || '')
  if (via === 'Inhalada') return /inhal|disparo|nebuliz/i.test(t)
  return new RegExp(`(^|[^A-Za-z])${via}([^A-Za-z]|$)`).test(t)
}

// ¿Esta entrada de dosis se puede convertir en caso?
export function esCalculable(d) {
  return Boolean(d?.calculo && d.calculo.tipo)
}

// Todas las (ficha, dosis) que generan casos.
export function casosDisponibles(farmacos) {
  return farmacos.flatMap((f) => (f.dosis || []).filter(esCalculable).map((d) => ({ f, d })))
}

// Dosis en la unidad de masa de la presentación, a partir del cálculo.
function pasoDosis(d, peso) {
  const c = d.calculo
  const u = c.unidadMasa // mg | mcg | g
  if (c.tipo === 'porKg') {
    const { dosis, bruta, topada } = dosisPorPeso(c.valor, peso, c.maximo ?? null)
    const minimo = c.minimo ?? null
    const final = minimo != null && dosis < minimo ? minimo : dosis
    const nota = topada ? ` → supera el máximo de ${fmt(c.maximo, 3)} ${u}, se administra el máximo`
      : minimo != null && dosis < minimo ? ` → queda por debajo del mínimo de ${fmt(minimo, 3)} ${u}, se administra el mínimo` : ''
    return {
      valor: final,
      paso: paso('dosis', `¿Qué dosis le corresponde a ${peso} kg?`, final, u, `${fmt(c.valor, 3)} ${u}/kg × kg${c.maximo != null ? `, máximo ${fmt(c.maximo, 3)} ${u}` : ''}`,
        `${fmt(c.valor, 3)} × ${peso} = ${fmt(bruta, 3)} ${u}${nota}`,
        { peso, sinTope: topada ? bruta : null }),
    }
  }
  return {
    valor: c.valor,
    paso: paso('dosis', '¿Qué dosis indica la guía?', c.valor, u, 'dosis fija (no depende del peso)',
      `${d.dosisTexto}`, { invertido: null }),
  }
}

// Construye un caso a partir de una ficha y una de sus dosis.
export function construirCaso(f, d, { farmacos, semilla = null } = {}) {
  const rng = semilla == null ? Math.random : generador(semilla)
  const pesos = PESOS[d.poblacion] || PESOS.adulto
  const peso = pesos[Math.floor(rng() * pesos.length)]
  const c = d.calculo
  // Sin presentación declarada no se inventa una: el caso se queda en la dosis.
  const pres = c.presentacion ? (f.presentaciones || []).find((p) => p.id === c.presentacion) || null : null
  const pasos = []

  // 1. Fármaco. Un distractor que TAMBIÉN sirve para esa condición enseñaría
  // algo falso («la adrenalina no es para la bradicardia»): se excluye.
  const otros = barajarCon(rng, farmacos.filter((x) => x.id !== f.id && !compartenCondicion(d, x))).slice(0, 3)
  pasos.push({
    tipo: 'opcion',
    id: 'farmaco',
    pregunta: `¿Qué fármaco del catálogo corresponde a esta indicación: ${d.indicacion.toLowerCase()}?`,
    opciones: barajarCon(rng, [
      { texto: f.nombre, correcta: true, porque: `Correcto. ${f.nombre}: ${f.uso}` },
      ...otros.map((x) => ({ texto: x.nombre, correcta: false, porque: `${x.nombre} es ${x.grupo.toLowerCase()}; su uso es otro: ${x.uso}` })),
    ]),
  })

  // 2. Vía.
  const otrasDosis = (f.dosis || []).filter((x) => x !== d)
  // Una vía que la propia fuente admite («IN, IM, IV o IO») no es un error.
  const vias = barajarCon(rng, VIAS.filter((v) => v !== d.via && !viaMencionada(d, v))).slice(0, 3)
  pasos.push({
    tipo: 'opcion',
    id: 'via',
    pregunta: '¿Por qué vía se administra en esta indicación?',
    opciones: barajarCon(rng, [
      { texto: d.via, correcta: true, porque: `Correcto: ${d.via}. ${d.dosisTexto}` },
      ...vias.map((v) => {
        const de = otrasDosis.find((x) => x.via === v)
        return {
          texto: v,
          correcta: false,
          porque: de ? `${v} es la vía de otra indicación (${de.indicacion.toLowerCase()}). Los esquemas no son intercambiables.` : `${v} no es la vía que indica la fuente para este caso.`,
        }
      }),
    ]),
  })

  // 3-4. Cálculo.
  let enunciadoDato = ''
  if (c.tipo === 'porKg' || c.tipo === 'fija') {
    const { valor, paso: pd } = pasoDosis(d, peso)
    pasos.push(pd)
    if (pres?.forma === 'tableta') {
      const dosisEnPres = convertirMasa(valor, c.unidadMasa, pres.unidad)
      const n = dosisEnPres / pres.cantidad
      pasos.push(paso('tabletas', `Con ${pres.texto}, ¿cuántas tabletas das?`, n, 'tabletas', 'dosis ÷ contenido de cada tableta',
        `${fmt(dosisEnPres, 3)} ${pres.unidad} ÷ ${fmt(pres.cantidad, 3)} ${pres.unidad} = ${fmt(n, 2)} tabletas`,
        { invertido: pres.cantidad / dosisEnPres }))
    } else if (pres) {
      const conc = pres.cantidad / pres.volumenMl // unidad de la presentación por mL
      const dosisEnPres = convertirMasa(valor, c.unidadMasa, pres.unidad)
      const ml = volumenAExtraer(dosisEnPres, conc)
      const conv = c.unidadMasa !== pres.unidad ? ` (${fmt(valor, 3)} ${c.unidadMasa} = ${fmt(dosisEnPres, 4)} ${pres.unidad})` : ''
      pasos.push(paso('ml', `Con ${pres.texto}, ¿cuántos mL cargas?`, ml, 'mL', 'dosis ÷ concentración',
        `Concentración: ${fmt(pres.cantidad, 3)} ${pres.unidad} ÷ ${fmt(pres.volumenMl, 2)} mL = ${fmt(conc, 4)} ${pres.unidad}/mL${conv}. Volumen: ${fmt(dosisEnPres, 4)} ÷ ${fmt(conc, 4)} = ${fmt(ml, 3)} mL`,
        { invertido: conc / dosisEnPres, peso: c.tipo === 'porKg' ? peso : null }))
    }
  } else if (c.tipo === 'infusionPorKg' || c.tipo === 'infusionFija') {
    const { mg, ml } = c.dilucion
    const concMcg = convertirMasa(mg, 'mg', 'mcg') / ml
    enunciadoDato = c.dilucionCitada
      ? ` Preparas ${fmt(mg, 2)} mg en ${ml} mL, como indica la fuente.`
      : ` Preparas ${fmt(mg, 2)} mg en ${ml} mL (dilución del ejercicio: la estándar la fija el protocolo de tu servicio).`
    pasos.push(paso('conc', '¿Qué concentración tiene la dilución?', concMcg, 'mcg/mL', '(mg × 1000) ÷ mL',
      `${fmt(mg, 2)} × 1000 ÷ ${ml} = ${fmt(concMcg, 3)} mcg/mL`, { invertido: ml / (mg * 1000) }))
    const mlh = c.tipo === 'infusionPorKg' ? mlHoraPorPeso(c.valor, peso, concMcg) : mlHoraFija(c.valor, concMcg)
    const formula = c.tipo === 'infusionPorKg' ? '(mcg/kg/min × kg × 60) ÷ mcg/mL' : '(mcg/min × 60) ÷ mcg/mL'
    const res = c.tipo === 'infusionPorKg'
      ? `(${fmt(c.valor, 3)} × ${peso} × 60) ÷ ${fmt(concMcg, 3)} = ${fmt(mlh, 2)} mL/h`
      : `(${fmt(c.valor, 3)} × 60) ÷ ${fmt(concMcg, 3)} = ${fmt(mlh, 2)} mL/h`
    pasos.push(paso('mlh', `Para iniciar a ${fmt(c.valor, 3)} ${c.tipo === 'infusionPorKg' ? 'mcg/kg/min' : 'mcg/min'}, ¿a cuántos mL/h programas la bomba?`, mlh, 'mL/h', formula, res,
      { peso: c.tipo === 'infusionPorKg' ? peso : null }))
  } else if (c.tipo === 'volumenPorKg') {
    // Bolo de líquidos: mL/kg × kg, con tope opcional.
    const bruto = c.valor * peso
    const ml = c.maximoMl != null ? Math.min(bruto, c.maximoMl) : bruto
    pasos.push(paso('bolo', `¿Cuántos mL le corresponden a ${peso} kg?`, ml, 'mL', `${fmt(c.valor, 2)} mL/kg × kg${c.maximoMl != null ? `, máximo ${c.maximoMl} mL` : ''}`,
      `${fmt(c.valor, 2)} × ${peso} = ${fmt(bruto, 1)} mL${ml < bruto ? ` → supera el máximo, se dan ${c.maximoMl} mL` : ''}`,
      { peso, sinTope: ml < bruto ? bruto : null }))
    if (c.minutos) {
      const mlh = mlHoraPorTiempo(ml, c.minutos)
      pasos.push(paso('mlh', `Para pasarlo en ${c.minutos} minutos, ¿a cuántos mL/h?`, mlh, 'mL/h', 'mL ÷ (min ÷ 60)', `${fmt(ml, 1)} ÷ (${c.minutos} ÷ 60) = ${fmt(mlh, 1)} mL/h`))
    }
  } else if (c.tipo === 'quemados') {
    // Fórmula de reanimación del quemado: mL/kg/%SCQ.
    const scqs = c.scq || [20, 25, 30, 35, 40, 50]
    const scq = scqs[Math.floor(rng() * scqs.length)]
    const total = c.valor * peso * scq
    const primera = total * c.fraccion
    const mlh = primera / c.horasPrimeraFraccion
    enunciadoDato = ` Superficie corporal quemada: ${scq} %.`
    pasos.push(paso('total', '¿Cuánto volumen estima la fórmula para 24 horas?', total, 'mL', `${fmt(c.valor, 1)} mL × kg × %SCQ`,
      `${fmt(c.valor, 1)} × ${peso} × ${scq} = ${fmt(total, 0)} mL`, { peso }))
    pasos.push(paso('primera', `¿Cuánto pasa en las primeras ${c.horasPrimeraFraccion} horas?`, primera, 'mL', `total × ${fmt(c.fraccion, 2)}`,
      `${fmt(total, 0)} × ${fmt(c.fraccion, 2)} = ${fmt(primera, 0)} mL`))
    pasos.push(paso('mlh', '¿A cuántos mL/h inicias?', mlh, 'mL/h', `mL ÷ ${c.horasPrimeraFraccion} h`,
      `${fmt(primera, 0)} ÷ ${c.horasPrimeraFraccion} = ${fmt(mlh, 1)} mL/h`, { tolerancia: 0.03 }))
  } else if (c.tipo === 'enTiempo') {
    const mlh = mlHoraPorTiempo(c.volumenMl, c.minutos)
    enunciadoDato = ` La dosis se prepara en ${c.volumenMl} mL.`
    pasos.push(paso('mlh', `Para pasarla en ${c.minutos} minutos, ¿a cuántos mL/h programas la bomba?`, mlh, 'mL/h', 'mL ÷ (min ÷ 60)',
      `${c.volumenMl} ÷ (${c.minutos} ÷ 60) = ${fmt(mlh, 2)} mL/h`))
  }

  // 5. Administración (solo si la ficha lo documenta).
  if (d.administracion?.opciones?.length) {
    pasos.push({
      tipo: 'opcion',
      id: 'administracion',
      pregunta: d.administracion.pregunta || '¿Cómo se administra?',
      opciones: barajarCon(rng, d.administracion.opciones),
    })
  }

  const pob = ETIQUETA_POBLACION[d.poblacion] || 'Paciente'
  return {
    id: `${f.id}:${d.id}`,
    farmacoId: f.id,
    dosisId: d.id,
    enunciado: `${pob} de ${peso} kg. ${d.escenario || d.indicacion}.${enunciadoDato}`,
    pasos,
    fuente: d.fuente,
    cita: d.cita || null,
    repeticion: d.repeticion || null,
  }
}
