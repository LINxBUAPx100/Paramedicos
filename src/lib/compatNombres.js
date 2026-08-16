// ============================================================
//  Compatibilidad de nomenclatura: documentos escritos como «fase»
// ------------------------------------------------------------
//  El renombrado Fase→Módulo cambió los nombres de tres campos que YA están
//  escritos en Firestore de producción:
//
//    grupos/{id}.fasesOcultas        → modulosOcultos
//    usuarios/{uid}.fasesDesbloqueadas → modulosDesbloqueados
//    intentos/{id}.faseId|faseNumero|faseTitulo → moduloId|moduloNumero|moduloTitulo
//
//  Si el código nuevo leyera solo el nombre nuevo, esos documentos devolverían
//  `undefined` y el fallo sería SILENCIOSO y grave: un grupo con módulos
//  ocultos pasaría a enseñárselos a sus alumnos, y los intentos ya guardados
//  perderían a qué módulo pertenecen (se verían como «—» en el panel).
//
//  Por eso la traducción se hace UNA vez, en el punto de lectura de cada
//  colección, y el resto de la app solo conoce los nombres nuevos.
//
//  Precedencia: SIEMPRE gana el nombre nuevo si está presente. Así, en cuanto
//  un documento se reescribe con el nombre nuevo, el viejo queda inerte (no se
//  borra: si hubiera que revertir la fase, los datos siguen ahí).
//
//  Módulo PURO (sin Firebase, sin React): se prueba con `npm test`.
//
//  RETIRADA: cuando ningún documento conserve los campos viejos (verificable
//  con una consulta puntual del super-admin), este módulo y sus llamadas se
//  eliminan sin tocar nada más.
// ============================================================

// Primer valor definido; ignora `undefined` y `null` pero NO el array vacío
// (una lista vacía es una decisión: «este grupo no oculta nada»).
function primero(...valores) {
  for (const v of valores) if (v !== undefined && v !== null) return v
  return undefined
}

// grupos/{id}: la visibilidad por grupo.
export function normalizarGrupo(grupo) {
  if (!grupo) return grupo
  const modulosOcultos = primero(grupo.modulosOcultos, grupo.fasesOcultas)
  if (modulosOcultos === undefined) return grupo
  return { ...grupo, modulosOcultos }
}

// usuarios/{uid}: los módulos que el profesor habilitó a ESE alumno.
export function normalizarPerfil(perfil) {
  if (!perfil) return perfil
  const modulosDesbloqueados = primero(perfil.modulosDesbloqueados, perfil.fasesDesbloqueadas)
  if (modulosDesbloqueados === undefined) return perfil
  return { ...perfil, modulosDesbloqueados }
}

// intentos/{id}: inmutables por regla (`update: false`), así que los intentos
// anteriores al renombrado conservarán `faseId` PARA SIEMPRE. Esta traducción
// no es transitoria como las otras: se queda mientras existan esos intentos.
export function normalizarIntento(intento) {
  if (!intento) return intento
  const moduloId = primero(intento.moduloId, intento.faseId)
  if (moduloId === undefined) return intento
  return {
    ...intento,
    moduloId,
    moduloNumero: primero(intento.moduloNumero, intento.faseNumero),
    moduloTitulo: primero(intento.moduloTitulo, intento.faseTitulo),
  }
}

export const normalizarIntentos = (lista) => (lista || []).map(normalizarIntento)
export const normalizarGrupos = (lista) => (lista || []).map(normalizarGrupo)
