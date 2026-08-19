// ============================================================
//  Acceso al contenido — lógica PURA
// ------------------------------------------------------------
//  Vivía dentro de AuthContext y no se podía probar sin React ni Firebase.
//  Aquí queda como módulo puro (`npm test`) porque es la puerta de entrada al
//  contenido: si se rompe, o se cierra a quien pagó o se abre a quien no.
//
//  REGLA CENTRAL DE LA PRUEBA TEMPORAL
//  Un código de prueba (`codigos`) NO es una inscripción: es un permiso con
//  fecha de caducidad. Al canjearlo, el perfil queda marcado `esPrueba: true`
//  y el código puede integrarlo a una academia y a un grupo para que la
//  persona vea el temario real. Cuando `pruebaHasta` pasa, esa integración
//  DEJA DE CONTAR por completo: ni academia, ni grupo, ni contenido, ni panel.
//  La cuenta sigue existiendo (para poder canjear un código nuevo o el código
//  oficial de su academia), pero no pertenece ya a ningún sitio.
//
//  El espejo de esto en el servidor es `pruebaVencida()` en firestore.rules:
//  si cambias uno, cambia el otro. Sin la regla, el bloqueo sería solo de
//  pantalla y el SDK seguiría sirviendo los temas.
// ============================================================

/** Milisegundos en los que caduca la prueba del perfil (0 = no tiene). */
export function finDePrueba(perfil) {
  const seg = perfil?.pruebaHasta?.seconds
  if (typeof seg === 'number' && Number.isFinite(seg)) return seg * 1000
  // Tolerancia: un Date/número si algún día se guarda sin Timestamp.
  const bruto = perfil?.pruebaHasta
  if (bruto instanceof Date) return bruto.getTime()
  if (typeof bruto === 'number' && Number.isFinite(bruto)) return bruto
  return 0
}

/** ¿La prueba del perfil sigue vigente en `ahora`? */
export function pruebaVigente(perfil, ahora = Date.now()) {
  const fin = finDePrueba(perfil)
  return fin > 0 && fin > ahora
}

/**
 * ¿El perfil es una cuenta de PRUEBA ya vencida?
 * Marcado como prueba pero sin fecha válida = vencida: un `esPrueba` sin
 * `pruebaHasta` no puede significar acceso indefinido.
 */
export function pruebaVencida(perfil, ahora = Date.now()) {
  if (!perfil?.esPrueba) return false
  return !pruebaVigente(perfil, ahora)
}

/**
 * Pertenencia EFECTIVA del perfil. Una prueba vencida no pertenece a nada:
 * el resto de la app (panel, grupo, temario, examen) debe verla igual que a
 * un usuario recién registrado que todavía no ha canjeado ningún código.
 * @returns {{academiaId: string|null, grupoId: string|null, vencida: boolean}}
 */
export function pertenenciaEfectiva(perfil, ahora = Date.now()) {
  if (pruebaVencida(perfil, ahora)) {
    return { academiaId: null, grupoId: null, vencida: true }
  }
  return {
    academiaId: perfil?.academiaId || null,
    grupoId: perfil?.grupoId || null,
    vencida: false,
  }
}

/**
 * Calcula si el usuario puede acceder al contenido y, si no, el motivo.
 *   superadmin/supremo   → acceso total (bypass).
 *   sin sesión           → 'no-sesion'
 *   perfil inexistente   → 'sin-perfil' (no se queda cargando para siempre)
 *   usuario no activo    → 'usuario-bloqueado'
 *   prueba vencida       → 'prueba-expirada'
 *   sin academia         → 'sin-academia'
 *   academia no activa   → 'academia-inactiva' (no ha pagado / suspendida)
 */
export function calcularAcceso({ user, perfil, perfilListo, academia, rol, esSupremo, ahora = Date.now() }) {
  if (esSupremo || rol === 'superadmin') return { puede: true, motivo: null }
  if (!user) return { puede: false, motivo: 'no-sesion' }
  if (!perfilListo) return { puede: false, motivo: 'cargando' }
  if (!perfil) return { puede: false, motivo: 'sin-perfil' }
  if (perfil.estado && perfil.estado !== 'activo') return { puede: false, motivo: 'usuario-bloqueado' }
  const enPrueba = pruebaVigente(perfil, ahora)
  // Cuenta MARCADA como prueba (aunque el código la haya integrado a una
  // academia/grupo): al vencer pierde el acceso hasta meter un código real.
  if (perfil.esPrueba) {
    return enPrueba ? { puede: true, motivo: null } : { puede: false, motivo: 'prueba-expirada' }
  }
  if (!perfil.academiaId) {
    return enPrueba ? { puede: true, motivo: null } : { puede: false, motivo: 'sin-academia' }
  }
  if (academia === undefined) return { puede: false, motivo: 'cargando' } // academia aún cargando
  if (!academia || academia.estado !== 'activo') {
    return enPrueba ? { puede: true, motivo: null } : { puede: false, motivo: 'academia-inactiva' }
  }
  return { puede: true, motivo: null }
}

/**
 * Milisegundos que faltan para que la prueba venza, o null si no aplica
 * (sin prueba, ya vencida, o tan lejos que no merece temporizador).
 *
 * Sirve para CERRAR LA SESIÓN EN CALIENTE: sin esto, quien tuviera la app
 * abierta al vencer su prueba seguía leyendo el temario hasta recargar la
 * página, porque el vencimiento no cambia ningún documento y por tanto no
 * llega ningún snapshot que vuelva a calcular el acceso.
 *
 * `tope` evita setTimeout de días (el navegador los desborda a los ~24.8 días).
 */
export function msHastaFinDePrueba(perfil, ahora = Date.now(), tope = 6 * 60 * 60 * 1000) {
  const fin = finDePrueba(perfil)
  if (!fin || fin <= ahora) return null
  return Math.min(fin - ahora, tope)
}

/** Etiqueta corta del estado de prueba para las listas del panel. */
export function etiquetaPrueba(perfil, ahora = Date.now()) {
  if (!perfil?.esPrueba) return null
  const fin = finDePrueba(perfil)
  const fecha = fin
    ? new Date(fin).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
    : null
  if (pruebaVigente(perfil, ahora)) {
    return { vigente: true, texto: fecha ? `prueba · vence ${fecha}` : 'prueba' }
  }
  return { vigente: false, texto: fecha ? `prueba vencida ${fecha}` : 'prueba vencida' }
}
