// ============================================================
//  Cálculo de dosis — motor puro del entrenador
// ------------------------------------------------------------
//  Sin React ni Firebase: se prueba con `npm test`.
//
//  Dos piezas:
//   1. Aritmética: conversiones, concentración, dosis por peso, volumen,
//      dilución, velocidad de infusión y goteo. Es matemática, no clínica.
//   2. Diagnóstico del error: cuando el alumno se equivoca, no basta con
//      «incorrecto». La razón entre su respuesta y la esperada delata casi
//      siempre el fallo (×1000 = confundió mg y mcg; ×60 = minutos y horas;
//      ×peso = olvidó o repitió el peso), y la pista lo nombra.
//
//  Las CIFRAS CLÍNICAS (qué dosis, para quién) no viven aquí: vienen del
//  catálogo, cada una con su fuente. Este módulo solo sabe multiplicar.
// ============================================================

// Masa expresada en microgramos.
export const MASA_EN_MCG = { g: 1e6, mg: 1e3, mcg: 1 }
export const VOLUMEN_EN_ML = { L: 1000, mL: 1 }

export function convertirMasa(valor, de, a) {
  // Misma unidad (también «UI», que no se convierte a masa): no hay nada que hacer.
  if (de === a) return valor
  if (!(de in MASA_EN_MCG) || !(a in MASA_EN_MCG)) throw new Error(`Unidad de masa desconocida: ${de} → ${a}`)
  return (valor * MASA_EN_MCG[de]) / MASA_EN_MCG[a]
}

// Redondeo con decimales fijos, sin arrastrar 0.30000000000000004.
export function redondear(x, decimales = 2) {
  const f = 10 ** decimales
  return Math.round((x + Number.EPSILON) * f) / f
}

// Formato legible en es-MX (coma de miles, punto decimal, sin ceros de más).
export function fmt(x, decimales = 2) {
  return redondear(x, decimales).toLocaleString('es-MX', { maximumFractionDigits: decimales })
}

// ---------- Fórmulas ------------------------------------------------------

// Porcentaje p/v → mg/mL. 1 % = 1 g / 100 mL = 10 mg/mL.
export const porcentajeAMgMl = (pct) => pct * 10

// Proporción 1:X (g por mL) → mg/mL. 1:1000 = 1 g / 1000 mL = 1 mg/mL.
export const proporcionAMgMl = (x) => 1000 / x

// Concentración = cantidad / volumen.
export const concentracion = (cantidad, volumenMl) => cantidad / volumenMl

// Dosis por peso, con tope opcional. Devuelve { dosis, topada }.
export function dosisPorPeso(dosisPorKg, pesoKg, maximo = null) {
  const bruta = dosisPorKg * pesoKg
  if (maximo != null && bruta > maximo) return { dosis: maximo, bruta, topada: true }
  return { dosis: bruta, bruta, topada: false }
}

// Volumen a extraer = dosis / concentración (misma unidad de masa).
export const volumenAExtraer = (dosis, concMasaPorMl) => dosis / concMasaPorMl

// Infusión por peso: mL/h = (mcg/kg/min × kg × 60) / (mcg/mL).
export const mlHoraPorPeso = (mcgKgMin, pesoKg, concMcgMl) => (mcgKgMin * pesoKg * 60) / concMcgMl

// Infusión fija: mL/h = (mcg/min × 60) / (mcg/mL).
export const mlHoraFija = (mcgMin, concMcgMl) => (mcgMin * 60) / concMcgMl

// Volumen en un tiempo: mL/h = mL / (min / 60).
export const mlHoraPorTiempo = (volumenMl, minutos) => volumenMl / (minutos / 60)

// Goteo: gotas/min = mL × factor (gotas/mL) / minutos.
export const gotasPorMinuto = (volumenMl, factor, minutos) => (volumenMl * factor) / minutos

// ---------- Diagnóstico ---------------------------------------------------

// ¿Coincide dentro de la tolerancia relativa? (2 % cubre el redondeo).
export function coincide(respuesta, esperado, tolerancia = 0.02) {
  if (!Number.isFinite(respuesta)) return false
  if (esperado === 0) return Math.abs(respuesta) < 1e-9
  return Math.abs(respuesta - esperado) / Math.abs(esperado) <= tolerancia
}

// Lee un número escrito por una persona: «1,5», «1.5», « 2 mL ».
export function leerNumero(texto) {
  if (typeof texto === 'number') return texto
  const limpio = String(texto ?? '').trim().replace(/\s+/g, '').replace(/[a-zA-Zµ/%]+$/, '')
  if (!limpio) return NaN
  // Una sola coma y sin punto → decimal. Si hay ambos, la coma es de miles.
  const normal = limpio.includes('.') ? limpio.replace(/,/g, '') : limpio.replace(',', '.')
  return /^-?\d*\.?\d+$/.test(normal) ? Number(normal) : NaN
}

// Diagnostica una respuesta equivocada. `ctx` trae los números del paso
// para reconocer errores concretos (peso, factor de goteo, etc.).
// Devuelve null si la respuesta es correcta.
export function diagnosticar(respuesta, esperado, ctx = {}) {
  if (!Number.isFinite(respuesta)) {
    return { tipo: 'formato', pista: 'Escribe solo el número (usa punto o coma para decimales).' }
  }
  if (coincide(respuesta, esperado, ctx.tolerancia)) return null
  // Primero la operación invertida: sus razones pueden parecer un salto de
  // unidades (×10⁻⁶) y la pista sería la equivocada.
  if (ctx.invertido != null && coincide(respuesta, ctx.invertido, 0.03)) {
    return { tipo: 'invertido', pista: ctx.pistaInvertido || 'Hiciste la operación al revés. Si buscas cuántos mL, lo que necesitas va arriba: dosis ÷ concentración. Al bajar de unidad (mg → mcg) se multiplica; al subir, se divide.' }
  }
  const r = respuesta / esperado
  const cerca = (x) => coincide(r, x, 0.03)

  // El factor va antes que el tiempo: un microgotero da 60 gotas/mL y su
  // omisión se confundiría con un error de minutos contra horas.
  if (ctx.factor && (cerca(ctx.factor) || cerca(1 / ctx.factor))) {
    return { tipo: 'factor', pista: 'Revisa el factor de goteo del equipo (gotas por mL): parece que lo omitiste o lo usaste de más.' }
  }
  if (cerca(1000) || cerca(0.001)) {
    return { tipo: 'unidades', pista: `Tu resultado es ${r > 1 ? 'mil veces mayor' : 'mil veces menor'} que el correcto. Revisa la conversión entre g, mg y mcg: 1 mg = 1000 mcg.` }
  }
  if (cerca(1e6) || cerca(1e-6)) {
    return { tipo: 'unidades', pista: 'Te desviaste un millón de veces: probablemente saltaste de g a mcg (1 g = 1 000 000 mcg).' }
  }
  if (cerca(60) || cerca(1 / 60)) {
    return { tipo: 'tiempo', pista: `Tu resultado es 60 veces ${r > 1 ? 'mayor' : 'menor'}. Revisa minutos contra horas: una hora tiene 60 minutos.` }
  }
  if (ctx.peso && (cerca(ctx.peso) || cerca(1 / ctx.peso))) {
    return { tipo: 'peso', pista: r > 1 ? 'Parece que multiplicaste por el peso dos veces o donde no tocaba.' : 'Parece que olvidaste multiplicar por el peso del paciente.' }
  }
  if (ctx.sinTope != null && coincide(respuesta, ctx.sinTope, 0.03)) {
    return { tipo: 'tope', pista: 'El cálculo por peso supera la dosis máxima. Cuando eso pasa, se administra el máximo, no el resultado.' }
  }
  if (cerca(10) || cerca(0.1) || cerca(100) || cerca(0.01)) {
    return { tipo: 'decimal', pista: 'El punto decimal está desplazado. Revisa cada paso y la conversión de porcentajes (1 % = 10 mg/mL).' }
  }
  return { tipo: 'otro', pista: 'No coincide. Vuelve a la fórmula del paso y sustituye cada dato con su unidad.' }
}
