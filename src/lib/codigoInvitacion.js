// ============================================================
//  Código de invitación que viaja en el ENLACE (?c=XXXX)
// ------------------------------------------------------------
//  El enlace que reparte una academia es `…/#/cuenta?c=INV-AEP-A-K3M9`
//  (ver `enlaceInvitacion` en components/CompartirCodigo.jsx). Quien lo abre
//  normalmente NO tiene sesión todavía: se registra, y solo después puede
//  canjearlo. Entre esos dos momentos el código tiene que sobrevivir a un
//  cambio de pantalla, a la ventana de Google y a que la URL se limpie, o la
//  persona acaba teniendo que copiarlo a mano de un mensaje de WhatsApp.
//
//  Antes esto vivía dentro de Cuenta.jsx, así que solo funcionaba EN esa
//  pantalla: quien terminaba en «Bienvenida» —que es donde aterriza cualquiera
//  con cuenta y sin academia— se encontraba el campo vacío. Ahora es un módulo
//  único y las dos pantallas leen de aquí.
//
//  Dos decisiones que importan:
//
//   · La captura es SÍNCRONA (se hace al leer, no en un `useEffect`). Los
//     efectos de React corren de hijo a padre, así que capturar en un efecto
//     del padre y leer en el estado inicial del hijo es una carrera perdida: el
//     hijo se pinta con el campo vacío. `codigoInvitacionActual()` mira la URL
//     en el momento en que se le pregunta.
//
//   · El código guardado es una SUGERENCIA, no un candado: la pantalla lo pone
//     en el campo y la persona puede corregirlo, borrarlo o escribir otro.
//     `limpiarCodigoInvitacion()` se llama cuando ya se canjeó.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================

export const CLAVE_CODIGO = 'ptem-codigo-invitacion'

// Los códigos son mayúsculas, dígitos y guiones (INV-AEP-A-K3M9, AEP-2026,
// GRP-4F2A). Se normaliza para que un enlace con espacios o en minúsculas
// —copiado a mano de un mensaje— siga sirviendo.
export function normalizarCodigo(valor) {
  return String(valor ?? '').trim().replace(/\s+/g, '').toUpperCase()
}

/**
 * Extrae el código de una URL completa. Con HashRouter la query real vive
 * DENTRO del hash (`…/#/cuenta?c=XXX`), pero un enlace pegado a mano puede
 * traerla antes (`…/?c=XXX#/cuenta`). Se aceptan las dos, y gana la del hash
 * porque es la que produce `enlaceInvitacion`.
 */
export function codigoDeUrl(href) {
  const url = String(href ?? '')
  if (!url) return ''
  const [antes, ...resto] = url.split('#')
  const hash = resto.join('#')
  return normalizarCodigo(paramC(hash) || paramC(antes))
}

// `c` de una porción de URL, sin depender de que sea una URL válida entera
// (el hash de HashRouter no lo es).
function paramC(trozo) {
  const i = String(trozo || '').indexOf('?')
  if (i === -1) return ''
  try {
    return new URLSearchParams(trozo.slice(i + 1)).get('c') || ''
  } catch {
    return ''
  }
}

// --- Almacén (sessionStorage; nunca lanza si no está disponible) ---
// sessionStorage y no localStorage: el código pertenece a ESTA visita. Que
// sobreviva semanas en el navegador de un equipo compartido solo produce
// canjes con el código de otra persona.

export function leerCodigoInvitacion() {
  try {
    return normalizarCodigo(globalThis.sessionStorage?.getItem(CLAVE_CODIGO))
  } catch {
    return ''
  }
}

export function guardarCodigoInvitacion(codigo) {
  const limpio = normalizarCodigo(codigo)
  try {
    if (limpio) globalThis.sessionStorage?.setItem(CLAVE_CODIGO, limpio)
    else globalThis.sessionStorage?.removeItem(CLAVE_CODIGO)
  } catch { /* modo incógnito, cuota llena o storage deshabilitado */ }
  return limpio
}

export function limpiarCodigoInvitacion() {
  return guardarCodigoInvitacion('')
}

/**
 * El código de invitación vigente: el del enlace si la URL trae uno (y lo
 * guarda para el resto de la visita), o el ya guardado. Cadena vacía si no hay.
 *
 * `href` se pasa en las pruebas; en la app se toma de `window.location`.
 */
export function codigoInvitacionActual(href = globalThis.location?.href) {
  const delEnlace = codigoDeUrl(href)
  if (delEnlace) return guardarCodigoInvitacion(delEnlace)
  return leerCodigoInvitacion()
}
