// ============================================================
//  Canje de UN código, sea del tipo que sea
// ------------------------------------------------------------
//  El usuario escribe un código y no tiene por qué saber de qué tipo es. Se
//  prueban en orden: ACADEMIA → GRUPO (que une también a su academia) →
//  PRUEBA temporal.
//
//  Vivía dentro de Cuenta.jsx, y al necesitarlo también la pantalla de
//  bienvenida (Bloque K) se extrae aquí en vez de duplicar una cascada de
//  errores anidados que es fácil desincronizar.
//
//  Devuelve { tipo, mensaje } o lanza el error del ÚLTIMO intento significativo:
//  si el código no es de ningún tipo, el error útil es el del último, no el
//  "no existe una academia" del primero.
// ============================================================

// ¿El error dice "esto no era de este tipo" o "esto era de este tipo pero algo
// falló"? Solo en el primer caso tiene sentido seguir probando; en el segundo
// hay que parar y contarle al usuario qué pasó (academia suspendida, código
// caducado…), o se le acabaría mostrando un mensaje que no corresponde.
const noEsDeEsteTipo = (err, aguja) => String(err?.message || '').includes(aguja)

export async function canjearCualquierCodigo(uid, codigo) {
  const cod = String(codigo || '').trim()
  if (!cod) throw new Error('Escribe el código que te dieron.')

  // 1) ¿Código de ACADEMIA?
  try {
    const { unirseAcademia } = await import('./usuarios.js')
    const aca = await unirseAcademia(uid, cod)
    return { tipo: 'academia', academia: aca, mensaje: `Te uniste a: ${aca.nombre}` }
  } catch (err) {
    if (!noEsDeEsteTipo(err, 'No existe una academia')) throw err
  }

  // 2) ¿Código de GRUPO? (une al grupo y, con él, a su academia)
  try {
    const { unirseGrupo } = await import('./grupos.js')
    const g = await unirseGrupo(uid, cod)
    return {
      tipo: 'grupo',
      grupo: g,
      mensaje: `Te uniste al grupo "${g.nombre}" de ${g.academia?.nombre || g.academiaId}.`,
    }
  } catch (err) {
    if (!noEsDeEsteTipo(err, 'No existe un grupo')) throw err
  }

  // 3) ¿Código de PRUEBA temporal? Último intento: su error es el que se
  //    propaga si tampoco lo es.
  const { canjearCodigo } = await import('./codigos.js')
  const expira = await canjearCodigo(uid, cod)
  const fecha = new Date(expira.toMillis()).toLocaleDateString('es-MX', { dateStyle: 'long' })
  return {
    tipo: 'prueba',
    expira,
    mensaje: `Código de prueba activado: tienes acceso hasta el ${fecha}.`,
  }
}
