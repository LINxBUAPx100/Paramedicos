// ============================================================
//  Enlaces seguros — el último filtro antes de un href
// ------------------------------------------------------------
//  React NO bloquea `javascript:` en un href: en el build de producción ni
//  siquiera avisa, y el atributo se escribe tal cual. Un `javascript:…`
//  guardado en el contenido (recursos, fuentes, descargables) se ejecutaría
//  en la sesión de todos los alumnos de esa academia.
//
//  Ya existe `urlSegura()` en lib/temaContenidoModelo.js, pero valida en el
//  EDITOR: solo cubre lo que se guarda desde NUESTRA interfaz. No cubre a un
//  editor que escriba con el SDK directamente, ni al contenido anterior a esa
//  validación, ni a los datos del bundle. Ambos filtros son necesarios y no se
//  sustituyen: `urlSegura` avisa al autor, `hrefSeguro` protege al lector.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================

// Únicos esquemas que pueden llegar a un href de contenido. Nada de
// javascript:, data:, vbscript:, file: ni blob:.
const PROTOCOLOS_PERMITIDOS = ['http:', 'https:']

// Devuelve la URL normalizada si es un enlace http(s) legítimo, o null.
// El parser de URL del navegador normaliza antes de que miremos el protocolo,
// así que las variantes ofuscadas clásicas ("JavaScript:", "java\nscript:",
// espacios delante) caen solas: al normalizarse revelan su esquema real.
export function hrefSeguro(url) {
  const crudo = String(url ?? '').trim()
  if (!crudo) return null
  let analizada
  try {
    analizada = new URL(crudo)
  } catch {
    return null // relativas, vacías o basura: fuera (estos href son externos)
  }
  if (!PROTOCOLOS_PERMITIDOS.includes(analizada.protocol)) return null
  return analizada.href
}
