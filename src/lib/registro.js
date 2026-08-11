// ============================================================
//  Registro de errores — dejar de depurar a ciegas
// ------------------------------------------------------------
//  La app traga los errores a propósito en muchos sitios: si Firestore no
//  responde, el contenido cae al bundle y el alumno sigue estudiando en vez de
//  ver una pantalla rota. Esa decisión es CORRECTA de cara al usuario y no se
//  toca. El problema es que también los tragaba de cara a NOSOTROS: cuando un
//  director dice "no me guarda", no había absolutamente nada que mirar.
//
//  Esto no sustituye a un servicio de telemetría: es lo mínimo que funciona sin
//  servidor y sin dependencias. Los errores viven en memoria y en
//  sessionStorage (se van al cerrar la pestaña, nunca acompañan al usuario) y
//  solo salen del dispositivo si la persona pulsa "Enviar diagnóstico".
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================

const CLAVE = 'ptem:diagnostico:v1'
// Tope bajo a propósito: interesa lo ÚLTIMO que pasó, no un historial. Además
// sessionStorage anda por 5 MB y esto comparte espacio con el resto de la app.
const MAXIMO = 30
const MAX_TEXTO = 300

let memoria = leerDeSesion()

function leerDeSesion() {
  try {
    const crudo = globalThis.sessionStorage?.getItem(CLAVE)
    const lista = crudo ? JSON.parse(crudo) : []
    return Array.isArray(lista) ? lista.slice(-MAXIMO) : []
  } catch {
    return [] // storage lleno, deshabilitado o JSON corrupto: se empieza limpio
  }
}

function guardarEnSesion() {
  try {
    globalThis.sessionStorage?.setItem(CLAVE, JSON.stringify(memoria))
  } catch {
    /* sin storage: el registro sigue vivo en memoria durante esta sesión */
  }
}

// Un error puede ser un Error, un FirebaseError (con .code), un string o
// cualquier cosa que alguien haya lanzado. Se normaliza sin perder el código,
// que en Firebase es lo único realmente accionable ('permission-denied',
// 'unavailable', 'failed-precondition'…).
function describir(error) {
  if (!error) return { mensaje: 'sin detalle' }
  if (typeof error === 'string') return { mensaje: error.slice(0, MAX_TEXTO) }
  const salida = {}
  if (error.code) salida.codigo = String(error.code).slice(0, 80)
  if (error.name && error.name !== 'Error') salida.tipo = String(error.name).slice(0, 60)
  salida.mensaje = String(error.message || error).slice(0, MAX_TEXTO)
  return salida
}

// Apunta un fallo. `ambito` identifica QUÉ falló, no dónde está el código:
// 'perfil', 'progreso:guardar', 'contenido:indice'… Es lo que se lee después.
// `datos` son extras cortos y NO sensibles (ids, no contenido de usuario).
export function registrar(ambito, error, datos = null) {
  const entrada = {
    // Sin Date.now() no se puede ordenar nada; es hora local del dispositivo,
    // así que sirve para ordenar y para correlacionar, no como hora exacta.
    t: new Date().toISOString(),
    ambito: String(ambito || 'desconocido').slice(0, 60),
    ...describir(error),
  }
  if (datos && typeof datos === 'object') {
    entrada.datos = Object.fromEntries(
      Object.entries(datos).slice(0, 8).map(([k, v]) => [k, String(v).slice(0, 120)])
    )
  }
  memoria = [...memoria, entrada].slice(-MAXIMO)
  guardarEnSesion()
  // En desarrollo, además, a la consola: si estás delante, quieres verlo ya.
  if (import.meta.env?.DEV) console.warn(`[${entrada.ambito}]`, error)
  return entrada
}

// Lo apuntado en esta sesión, de lo más antiguo a lo más reciente.
export function errores() {
  return [...memoria]
}

export function hayErrores() {
  return memoria.length > 0
}

export function limpiar() {
  memoria = []
  guardarEnSesion()
}

// Paquete listo para adjuntar a un reporte: los errores más el entorno mínimo
// para reproducir. Sin datos personales — el uid y el correo los añade la capa
// de Firestore al crear el reporte, que ya los conoce.
export function diagnostico(extra = {}) {
  return {
    errores: errores(),
    entorno: {
      agente: String(globalThis.navigator?.userAgent || '').slice(0, 200),
      idioma: String(globalThis.navigator?.language || ''),
      pantalla: globalThis.screen ? `${globalThis.screen.width}x${globalThis.screen.height}` : '',
      ruta: String(globalThis.location?.hash || globalThis.location?.pathname || ''),
      enLinea: globalThis.navigator?.onLine !== false,
    },
    ...extra,
  }
}
