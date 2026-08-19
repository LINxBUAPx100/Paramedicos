// ============================================================
//  Códigos de acceso IMPOSIBLES DE ADIVINAR
// ------------------------------------------------------------
//  Todo el reparto de acceso de la plataforma cuelga de una cadena corta:
//  el código de invitación (que ADEMÁS trae el rol), el de grupo y el de
//  prueba. Y las reglas dejan que cualquier usuario autenticado CONSULTE uno
//  concreto —tiene que ser así para poder canjearlo—, así que quien tenga una
//  cuenta puede probar códigos a ciegas contra Firestore.
//
//  Eso convierte la longitud del sufijo aleatorio en un control de seguridad,
//  no en un detalle estético. Lo que había antes:
//
//     invitación   INV-AEP-D-XXXX   →  31⁴ ≈ 9.2×10⁵   (~20 bits)
//     grupo        GRP-XXXX         →  31⁴ ≈ 9.2×10⁵
//     prueba       AEP-GE-7DXX      →  31²  =     961   (~10 bits)
//
//  Un millón de lecturas de Firestore cuesta céntimos y se paralelizan: probar
//  el espacio ENTERO de una invitación de DIRECTOR era cuestión de minutos, y
//  quien acertara se convertía en administrador de esa academia (con acceso a
//  los datos de todos sus alumnos). El de prueba, con 961 combinaciones, se
//  agota en segundos.
//
//  Aquí se arreglan las dos mitades del problema:
//
//   1. LONGITUD. 8 caracteres del alfabeto de 31 = 31⁸ ≈ 8.5×10¹¹ (~40 bits).
//      A 10.000 intentos por segundo son unos 2.700 años. El prefijo legible
//      (academia, rol, vigencia) se conserva: lo que crece es el secreto.
//
//   2. FUENTE DE AZAR. `Math.random()` NO es criptográfico: su estado interno
//      se puede reconstruir observando salidas, así que un atacante que vea
//      unos cuantos códigos emitidos podría predecir los siguientes por muy
//      largos que sean. Aquí se usa `crypto.getRandomValues`.
//
//  Sobre el sesgo: 256 no es múltiplo de 31, así que tomar `byte % 31` haría
//  más probables las 8 primeras letras. Se descartan los bytes ≥ 248 (31×8) y
//  se vuelve a tirar; es la técnica estándar (rejection sampling) y cuesta un
//  3 % de bytes desechados.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================

// Sin caracteres confusos (0/O, 1/I/L): estos códigos se dictan por teléfono y
// se copian a mano de un mensaje.
export const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

// Longitud del secreto. 8 = ~40 bits, suficiente contra fuerza bruta remota y
// todavía manejable si alguien lo teclea.
export const LARGO_SECRETO = 8

const LIMITE = Math.floor(256 / ALFABETO.length) * ALFABETO.length // 248

/**
 * Bytes aleatorios criptográficos. `fuente` se inyecta en las pruebas para
 * comprobar el descarte por sesgo con valores conocidos.
 */
function bytes(n, fuente) {
  const buf = new Uint8Array(n)
  if (fuente) return fuente(buf)
  const c = globalThis.crypto
  if (!c?.getRandomValues) {
    // Deliberadamente NO se cae a Math.random: un código de acceso generado con
    // azar predecible es peor que un error visible, porque nadie se entera.
    throw new Error('Este navegador no puede generar códigos seguros. Actualízalo para emitir accesos.')
  }
  c.getRandomValues(buf)
  return buf
}

/**
 * Secreto aleatorio de `largo` caracteres del alfabeto, sin sesgo.
 */
export function secretoAleatorio(largo = LARGO_SECRETO, fuente = null) {
  let salida = ''
  let intentos = 0
  while (salida.length < largo) {
    // Se piden de golpe los que faltan más un margen para los descartes.
    const lote = bytes(largo - salida.length + 4, fuente)
    for (const b of lote) {
      if (b >= LIMITE) continue // descarte: evitaría el sesgo de módulo
      salida += ALFABETO[b % ALFABETO.length]
      if (salida.length === largo) break
    }
    if (++intentos > 20) throw new Error('No se pudo generar un código seguro.')
  }
  return salida
}

/** Bits de entropía de un secreto de `largo` caracteres (para documentarlo). */
export function bitsDeEntropia(largo = LARGO_SECRETO) {
  return Math.round(largo * Math.log2(ALFABETO.length))
}
