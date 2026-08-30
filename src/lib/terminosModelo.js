// ============================================================
//  Aceptación de los términos y condiciones — lógica PURA
// ------------------------------------------------------------
//  Una sola pregunta: ¿esta persona aceptó LA VERSIÓN VIGENTE del texto?
//
//  Se guarda la versión aceptada, no un booleano. Un `aceptoTerminos: true`
//  diría que aceptó «los términos», sin decir cuáles: al cambiar el texto,
//  todo el mundo quedaría vinculado a un acuerdo que nunca leyó y no habría
//  forma de saberlo. Con la versión, cambiar el texto vuelve a preguntar, y en
//  el perfil queda constancia de qué se aceptó y cuándo.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
//
//  Doc: usuarios/{uid}.terminos = { version: 'AAAA-MM-DD', aceptadoEn }
// ============================================================
import { VERSION_TERMINOS } from '../data/terminos.js'

const FECHA = /^\d{4}-\d{2}-\d{2}$/

/** Normaliza lo leído del perfil: solo claves conocidas y bien formadas. */
export function normalizarAceptacion(bruto) {
  const f = bruto && typeof bruto === 'object' && !Array.isArray(bruto) ? bruto : {}
  return {
    version: FECHA.test(String(f.version || '')) ? String(f.version) : null,
    aceptadoEn: f.aceptadoEn ?? null,
  }
}

/**
 * ¿El perfil aceptó la versión vigente?
 *
 * Se compara por IGUALDAD, no por «aceptó algo alguna vez» ni por «aceptó algo
 * posterior»: la versión vigente es la que la Plataforma muestra hoy, y es la
 * única que se le puede exigir a nadie.
 */
export function aceptoTerminos(perfil, version = VERSION_TERMINOS) {
  return normalizarAceptacion(perfil?.terminos).version === version
}

/**
 * ¿Hay que PEDIRLE que acepte?
 *
 * No se le pide a quien todavía no tiene perfil cargado —no sabríamos si ya
 * aceptó y le saldría el muro a cualquiera durante el parpadeo de carga— ni al
 * super-admin, que administra la Plataforma y no la consume.
 */
export function debePedirTerminos({ perfil, perfilListo = true, rol, esSupremo } = {}, version = VERSION_TERMINOS) {
  if (esSupremo || rol === 'superadmin') return false
  if (!perfilListo || !perfil) return false
  return !aceptoTerminos(perfil, version)
}

/**
 * Ficha que se escribe en el perfil al aceptar. `fecha` la pone quien llama
 * (en Firestore, `serverTimestamp()`), para que no la fije el reloj del
 * navegador de quien acepta.
 */
export function fichaAceptacion(fecha, version = VERSION_TERMINOS) {
  if (!FECHA.test(String(version))) {
    throw new Error(`Version de terminos invalida: "${version}" (se espera AAAA-MM-DD).`)
  }
  return { version: String(version), aceptadoEn: fecha ?? null }
}

/** Texto legible de cuándo aceptó, para su propia cuenta. Null si no aceptó. */
export function fechaDeAceptacion(perfil) {
  const seg = perfil?.terminos?.aceptadoEn?.seconds
  if (typeof seg === 'number' && Number.isFinite(seg)) {
    return new Date(seg * 1000).toISOString().slice(0, 10)
  }
  return null
}
