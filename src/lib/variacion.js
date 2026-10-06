// ============================================================
//  Modo llamada — cada partida es distinta (07-10-2026)
// ------------------------------------------------------------
//  Sin IA y sin contenido sin revisar: la variedad sale de lo que el caso ya
//  trae validado, combinado de otra forma en cada partida.
//
//    1. VERSIONES. Un caso puede declarar `variantes`: versiones coherentes
//       del mismo escenario (otro paciente, otra escena, otros testigos, otra
//       gravedad de partida). Cada una puede sobrescribir los signos de
//       inicio, la historia y los testigos del caso, y el texto, los signos,
//       la historia y los testigos de cualquier momento. NO cambia las
//       opciones: la decisión correcta y su porqué son siempre las mismas.
//    2. SIGNOS. Cada partida desplaza un poco cada cifra (FC, FR, SpO₂, TA,
//       glucosa, temperatura). El desplazamiento es el MISMO para todo el
//       caso: si el paciente empeora, sigue empeorando igual.
//    3. ORDEN. Las opciones se barajan: la correcta no vive siempre arriba.
//
//  Todo sale de una SEMILLA: la misma semilla da la misma partida (sirve
//  para reproducir lo que vio un alumno y para probar).
//
//  Módulo PURO: se prueba con `npm test`.
// ============================================================

/** Generador determinista (mulberry32). */
export function azar(semilla) {
  let a = semilla >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export const nuevaSemilla = () => Math.floor(Math.random() * 2 ** 31)

const entero = (r, min, max) => min + Math.floor(r() * (max - min + 1))

/**
 * El caso con su versión `i` aplicada (sin barajar ni desplazar nada). La usa
 * también el validador: cada versión tiene que ser un caso válido por sí sola.
 */
export function aplicarVariante(caso, i) {
  const v = caso?.variantes?.[i]
  if (!v) return { ...caso }
  const nodos = {}
  for (const [id, n] of Object.entries(caso.nodos || {})) {
    const o = v.nodos?.[id]
    nodos[id] = o
      ? {
          ...n,
          ...(o.texto ? { texto: o.texto } : {}),
          ...(o.historia ? { historia: o.historia } : {}),
          ...(o.testigos ? { testigos: o.testigos } : {}),
          ...(o.signos ? { signos: { ...(n.signos || {}), ...o.signos } } : {}),
        }
      : n
  }
  const { variantes, ...base } = caso
  return {
    ...base,
    ...(v.signos ? { signos: { ...(caso.signos || {}), ...v.signos } } : {}),
    ...(v.historia ? { historia: v.historia } : {}),
    ...(v.testigos ? { testigos: v.testigos } : {}),
    nodos,
    version: v.etiqueta || `Versión ${i + 1}`,
  }
}

// ---------- Desplazar las cifras -------------------------------------------

/** Un desplazamiento por signo para toda la partida. */
function desplazamientos(r) {
  return {
    fc: entero(r, -7, 7),
    fr: entero(r, -2, 2),
    spo2: entero(r, -1, 1),
    sis: entero(r, -8, 8),
    dia: entero(r, -5, 5),
    glu: r() * 2 - 1, // proporción: se escala según el valor
    temp: Math.round((r() * 0.4 - 0.2) * 10) / 10,
  }
}

function desplazar(signos, d) {
  if (!signos) return signos
  const out = { ...signos }
  // Un cero es un cero (paro, apnea): no se mueve.
  if (typeof out.fc === 'number' && out.fc > 0) out.fc = Math.max(20, out.fc + d.fc)
  if (typeof out.fr === 'number' && out.fr > 0) out.fr = Math.max(4, out.fr + d.fr)
  if (typeof out.spo2 === 'number' && out.spo2 > 0) out.spo2 = Math.min(out.spo2 >= 100 ? 100 : 99, Math.max(50, out.spo2 + d.spo2))
  if (typeof out.ta === 'string') {
    const m = /^(\d{2,3})\/(\d{2,3})$/.exec(out.ta)
    if (m) {
      const s = Math.max(50, Number(m[1]) + d.sis)
      const di = Math.min(s - 15, Math.max(30, Number(m[2]) + d.dia))
      out.ta = `${s}/${di}`
    }
  }
  // La glucemia se mueve poco y en proporción: una hipoglucemia sigue siéndolo.
  if (typeof out.glucosa === 'number' && out.glucosa > 0) {
    const paso = out.glucosa < 70 ? 3 : 8
    out.glucosa = Math.max(10, Math.round(out.glucosa + d.glu * paso))
  }
  if (typeof out.temp === 'number') out.temp = Math.round((out.temp + d.temp) * 10) / 10
  return out
}

function barajar(lista, r) {
  const a = [...lista]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/**
 * La partida: versión elegida, cifras desplazadas y opciones barajadas.
 * Devuelve un caso con el mismo formato (el reproductor no nota nada) y con
 * `semilla` y `version` para el resumen.
 */
export function variarCaso(caso, semilla = nuevaSemilla()) {
  if (!caso) return caso
  const r = azar(semilla)
  const n = caso.variantes?.length || 0
  const base = n ? aplicarVariante(caso, entero(r, 0, n - 1)) : { ...caso }
  const d = desplazamientos(r)
  const nodos = {}
  for (const [id, nodo] of Object.entries(base.nodos || {})) {
    nodos[id] = {
      ...nodo,
      ...(nodo.signos ? { signos: desplazar(nodo.signos, d) } : {}),
      ...(nodo.opciones
        ? { opciones: barajar(nodo.opciones, r).map((o) => (o.signos ? { ...o, signos: desplazar(o.signos, d) } : o)) }
        : {}),
    }
  }
  return {
    ...base,
    ...(base.signos ? { signos: desplazar(base.signos, d) } : {}),
    nodos,
    semilla,
  }
}
