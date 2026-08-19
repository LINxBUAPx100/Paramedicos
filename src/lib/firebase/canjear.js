// ============================================================
//  Canje de UN código, sea del tipo que sea
// ------------------------------------------------------------
//  El usuario escribe un código y no tiene por qué saber de qué tipo es. Se
//  prueban en orden: INVITACIÓN POR ROL → ACADEMIA → GRUPO (que une también a
//  su academia) → PRUEBA temporal.
//
//  La invitación va PRIMERA porque es la única que trae un rol: si se probara
//  al final, un código de invitación que además coincidiera con otro tipo
//  metería a la persona como alumno y se perdería el rol. Al ir delante, su
//  «no existe una invitación» es el que deja pasar al resto.
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

  // ANTES de intentar cualquier canje: el perfil de Firestore tiene que existir
  // y estar completo. Los cuatro canjes son un `update` sobre `usuarios/{uid}`,
  // y las reglas comparan `rol`/`estado`/`academiaId` con lo que ya hay: si el
  // documento falta o le falta un campo, la escritura se deniega con «Missing
  // or insufficient permissions», que no dice nada a quien solo quería activar
  // su invitación. Reparar aquí convierte ese callejón en un canje normal.
  try {
    const { asegurarMiPerfil } = await import('./auth.js')
    await asegurarMiPerfil()
  } catch (err) {
    const { registrar } = await import('../registro.js')
    registrar('canje:asegurarPerfil', err, { uid })
    throw new Error(
      'No pudimos preparar tu cuenta para activar el código. ' +
      'Cierra sesión, vuelve a entrar e inténtalo otra vez; si sigue igual, ' +
      'avisa a tu academia con este dato: perfil incompleto.'
    )
  }

  // 1) ¿INVITACIÓN por rol? (academia + grupo opcional + ROL)
  try {
    const { canjearInvitacion } = await import('./invitaciones.js')
    const inv = await canjearInvitacion(uid, cod)
    const donde = inv.grupo
      ? `${inv.academia?.nombre || inv.academiaId} · grupo "${inv.grupo.nombre}"`
      : (inv.academia?.nombre || inv.academiaId)
    return {
      tipo: 'invitacion',
      invitacion: inv,
      rol: inv.rol,
      mensaje: `Te uniste a ${donde} como ${inv.rolEtiqueta.toLowerCase()}.`,
    }
  } catch (err) {
    if (!noEsDeEsteTipo(err, 'No existe una invitación')) throw err
  }

  // 2) ¿Código de ACADEMIA?
  try {
    const { unirseAcademia } = await import('./usuarios.js')
    const aca = await unirseAcademia(uid, cod)
    return { tipo: 'academia', academia: aca, mensaje: `Te uniste a: ${aca.nombre}` }
  } catch (err) {
    if (!noEsDeEsteTipo(err, 'No existe una academia')) throw err
  }

  // 3) ¿Código de GRUPO? (une al grupo y, con él, a su academia)
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

  // 4) ¿Código de PRUEBA temporal? Último intento: su error es el que se
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
