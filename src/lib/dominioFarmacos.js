// ============================================================
//  Dominio del entrenador de farmacología (por navegador)
// ------------------------------------------------------------
//  Guarda en localStorage la racha de cada habilidad y de cada caso. Es una
//  comodidad del alumno, no una calificación: no viaja a Firestore, se
//  pierde en una ventana privada y la pantalla funciona igual sin ella.
// ============================================================

const CLAVE = 'ptem.farmacos.dominio.v1'
export const RACHA_PARA_DOMINAR = 3

function almacen() {
  try { return globalThis.localStorage || null } catch { return null }
}

export function leerDominio() {
  try {
    const crudo = almacen()?.getItem(CLAVE)
    const d = crudo ? JSON.parse(crudo) : {}
    return d && typeof d === 'object' ? d : {}
  } catch { return {} }
}

// Registra un intento. `limpio` = resuelto sin errores ni ayuda. Un intento
// con errores reinicia la racha; la marca de dominada, una vez ganada, se
// conserva. Devuelve el mapa completo actualizado.
export function actualizarDominio(dominio, clave, limpio, ahora = Date.now()) {
  const previo = dominio[clave] || { racha: 0, intentos: 0, dominada: false }
  const racha = limpio ? previo.racha + 1 : 0
  return {
    ...dominio,
    [clave]: {
      racha,
      intentos: previo.intentos + 1,
      dominada: previo.dominada || racha >= RACHA_PARA_DOMINAR,
      ultimo: ahora,
    },
  }
}

export function registrarIntento(clave, limpio) {
  const nuevo = actualizarDominio(leerDominio(), clave, limpio)
  try { almacen()?.setItem(CLAVE, JSON.stringify(nuevo)) } catch { /* sin almacenamiento: seguimos */ }
  return nuevo
}

// ---------- Errores de cálculo (PTEM Pulso) ----------
//
// Mismo almacén y misma regla que el dominio: comodidad del alumno, en este
// navegador. Guarda cuántas veces cometió cada TIPO de error que reconoce
// diagnosticar() (unidades, tiempo, peso…), para decirle qué practicar.
const CLAVE_ERRORES = 'ptem.farmacos.errores.v1'

export function leerErrores() {
  try {
    const crudo = almacen()?.getItem(CLAVE_ERRORES)
    const e = crudo ? JSON.parse(crudo) : {}
    return e && typeof e === 'object' ? e : {}
  } catch { return {} }
}

export function guardarErrores(errores) {
  try { almacen()?.setItem(CLAVE_ERRORES, JSON.stringify(errores)) } catch { /* sin almacenamiento */ }
  return errores
}
