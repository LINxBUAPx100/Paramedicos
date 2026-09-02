// ============================================================
//  Navegación de la consola del super-admin — lógica PURA
// ------------------------------------------------------------
//  El problema que resuelve: la consola tenía UN solo riel, siempre de la
//  plataforma, y la ventana de una academia era una única página que apilaba
//  once bloques en un scroll. Es decir: al entrar a una academia, la navegación
//  seguía hablando de otra cosa y todo lo de esa academia caía en la misma
//  pantalla. De ahí que se sintiera confuso.
//
//  Ahora hay DOS CONTEXTOS y el riel es el de aquel en el que estás:
//
//    · PLATAFORMA  →  /admin/…            (todas las academias a la vez)
//    · ACADEMIA    →  /admin/aca/{id}/…   (una academia, con sus secciones)
//
//  El contexto vive en la URL a propósito: así un enlace lleva a otra persona
//  exactamente a donde estabas, el botón Atrás deshace el cambio de academia y
//  al recargar no se pierde. Un selector guardado en el navegador no da nada de
//  eso.
//
//  Módulo PURO (sin React, sin Firebase): se prueba con `npm test`.
// ============================================================

export const RAIZ_ADMIN = '/admin'
export const RAIZ_ACADEMIA = '/admin/aca'

// ---------- catálogo: contexto PLATAFORMA ----------
export const SECCIONES_PLATAFORMA = [
  { id: 'resumen', ruta: '/admin', fin: true, icono: 'progreso', etiqueta: 'Resumen' },
  { id: 'academias', ruta: '/admin/academias', icono: 'temario', etiqueta: 'Academias' },
  { id: 'usuarios', ruta: '/admin/usuarios', icono: 'usuario', etiqueta: 'Usuarios' },
  { id: 'contenido', ruta: '/admin/contenido', icono: 'capas', etiqueta: 'Contenido' },
  { id: 'facturacion', ruta: '/admin/facturacion', icono: 'pildora', etiqueta: 'Facturación' },
  { id: 'incidencias', ruta: '/admin/incidencias', icono: 'alerta', etiqueta: 'Incidencias' },
  { id: 'logs', ruta: '/admin/logs', icono: 'reloj', etiqueta: 'Actividad' },
]

// ---------- catálogo: contexto ACADEMIA ----------
//  Cada entrada es una de las piezas que antes vivían apiladas en la misma
//  página. El `sufijo` es lo que se pega detrás de /admin/aca/{id}.
// `deLaAcademia` marca lo que NO pertenece a un programa concreto.
//
// La divisoria no es de comodidad, es de significado: un alumno pertenece a la
// academia y puede cursar dos programas, así que su ficha no puede vivir dentro
// de uno. Un grupo, en cambio, cursa UN plan de estudios (`programaId`), y sus
// calificaciones y su temario son de ese plan. Mezclarlos era exactamente lo
// que hacía que el panel enseñara siempre lo de paramédicos.
export const SECCIONES_ACADEMIA = [
  { id: 'resumen', sufijo: '', fin: true, icono: 'progreso', etiqueta: 'Resumen' },
  { id: 'grupos', sufijo: 'grupos', icono: 'capas', etiqueta: 'Grupos' },
  { id: 'contenido', sufijo: 'contenido', icono: 'herramientas', etiqueta: 'Contenido' },
  { id: 'revision', sufijo: 'revision', icono: 'check', etiqueta: 'Revisión docente' },
  { id: 'calificaciones', sufijo: 'calificaciones', icono: 'progreso', etiqueta: 'Calificaciones' },
  { id: 'alumnos', sufijo: 'alumnos', icono: 'usuario', etiqueta: 'Alumnos y staff', deLaAcademia: true },
  { id: 'accesos', sufijo: 'accesos', icono: 'usuario', etiqueta: 'Accesos', deLaAcademia: true },
  { id: 'invitaciones', sufijo: 'invitaciones', icono: 'llave', etiqueta: 'Invitaciones', deLaAcademia: true },
  { id: 'ajustes', sufijo: 'ajustes', icono: 'editar', etiqueta: 'Ajustes de la academia', deLaAcademia: true },
]

// La pantalla que se ve al entrar a una academia SIN elegir programa.
export const SECCION_PROGRAMAS = {
  id: 'programas', sufijo: '', fin: true, icono: 'capas', etiqueta: 'Programas',
}

// Ruta de una sección de academia. Es la ÚNICA forma de construir estos
// enlaces: si el prefijo cambiara, cambia aquí y no en quince componentes.
//
// EL CURSO ES UN NIVEL DE LA RUTA, no un filtro.
//
// Una academia imparte varios programas —paramédico, enfermería, cursos— y
// cada uno tiene sus alumnos, sus grupos, sus calificaciones, su temario y sus
// profesores. Es, en la práctica, una academia dentro de la academia. Un
// desplegable que «filtra» no expresa eso: se pierde al recargar, no se puede
// compartir por enlace y deja al director sin saber en qué programa está
// trabajando. Con el curso en la dirección, cada programa tiene su propia
// consola y sus pantallas no pueden mezclarse.
//
// Sin curso, la ruta es la de la academia y lleva a la pantalla de programas.
export function rutaDeAcademia(academiaId, seccion = '', cursoId = null) {
  const id = encodeURIComponent(String(academiaId || '').trim())
  if (!id) return RAIZ_ADMIN
  const s = String(seccion || '').replace(/^\/+|\/+$/g, '')
  const c = String(cursoId || '').trim()
  const base = c ? `${RAIZ_ACADEMIA}/${id}/c/${encodeURIComponent(c)}` : `${RAIZ_ACADEMIA}/${id}`
  return s ? `${base}/${s}` : base
}

// El riel, ya resuelto, del contexto en el que se esté.
export function seccionesDeAdmin(academiaId = null, cursoId = null) {
  if (!academiaId) return SECCIONES_PLATAFORMA
  // Sin curso elegido solo se ofrece lo que es de la academia entera. Enseñar
  // «Resumen» o «Contenido» sin saber de qué programa llevaría a la pantalla de
  // paramédicos disfrazada de pantalla de la academia, que es justo la mezcla
  // que hay que evitar.
  const lista = cursoId ? SECCIONES_ACADEMIA : SECCIONES_ACADEMIA.filter((s) => s.deLaAcademia)
  return lista.map((s) => ({
    ...s,
    ruta: rutaDeAcademia(academiaId, s.sufijo, s.deLaAcademia ? null : cursoId),
  }))
}

/**
 * Lee el contexto de una ruta: en qué academia estamos (o ninguna) y en qué
 * sección. Lo usa el armazón para pintar el riel correcto y saber qué resaltar.
 */
export function contextoDeRuta(pathname) {
  const ruta = String(pathname || '')
  // `/admin/aca/<academia>[/c/<curso>][/<seccion>]`
  const m = ruta.match(/^\/admin\/aca\/([^/]+)(?:\/c\/([^/?#]+))?(?:\/([^/?#]*))?/)
  if (!m) {
    const plataforma = SECCIONES_PLATAFORMA.find((s) => (
      s.fin ? ruta === s.ruta || ruta === `${s.ruta}/` : ruta.startsWith(s.ruta)
    ))
    return { academiaId: null, cursoId: null, seccion: plataforma?.id || null }
  }
  const academiaId = decodeURIComponent(m[1])
  const cursoId = m[2] ? decodeURIComponent(m[2]) : null
  const sufijo = m[3] || ''
  // Sin curso y sin sufijo estamos en la pantalla de programas, no en el
  // resumen de ninguno: son pantallas distintas y confundirlas resaltaría la
  // sección equivocada en el riel.
  const seccion = !cursoId && !sufijo
    ? SECCION_PROGRAMAS.id
    : SECCIONES_ACADEMIA.find((s) => s.sufijo === sufijo)?.id || null
  return { academiaId, cursoId, seccion }
}

/**
 * Al cambiar de academia desde una sección, se conserva la sección: si estabas
 * mirando los grupos de una, quieres ver los grupos de la otra, no volver al
 * resumen. Si esa sección no existe en el destino (o vas a la plataforma), se
 * cae al resumen, que siempre existe.
 */
export function rutaAlCambiarAcademia(pathname, academiaIdDestino) {
  const { seccion } = contextoDeRuta(pathname)
  if (!academiaIdDestino) return RAIZ_ADMIN
  const enDestino = SECCIONES_ACADEMIA.find((s) => s.id === seccion)
  // EL CURSO NO VIAJA a la otra academia. Los ids de curso llevan el
  // academiaId por delante (`RES-2026__paramedico-tum`), así que conservarlo
  // apuntaría a un curso que en el destino no existe —y, peor, a uno de la
  // academia anterior—. Se aterriza en su pantalla de programas, que es donde
  // se elige.
  if (enDestino && !enDestino.deLaAcademia) return rutaDeAcademia(academiaIdDestino)
  return rutaDeAcademia(academiaIdDestino, enDestino?.sufijo || '')
}

// Resumen de UNA academia para las tarjetas del panel general: lo que se puede
// saber sin abrir nada, contando sobre lo que la consola ya cargó.
export function resumenDeAcademia(academia, { usuarios = [], intentos = [] } = {}) {
  const id = academia?.id
  const suyos = usuarios.filter((u) => u.academiaId === id && u.estado !== 'eliminado')
  return {
    id,
    nombre: academia?.nombre || id,
    estado: academia?.estado || 'activo',
    plan: academia?.planComercial || 'base',
    tipo: academia?.tipo || 'basico',
    alumnos: suyos.filter((u) => u.rol === 'alumno').length,
    staff: suyos.filter((u) => u.rol === 'instructor' || u.rol === 'admin_escuela').length,
    intentos: intentos.filter((i) => i.academiaId === id).length,
    // Una academia sin un solo examen presentado es la señal de que se dio de
    // alta y ahí se quedó: es lo primero que un super-admin quiere ver.
    sinActividad: intentos.filter((i) => i.academiaId === id).length === 0,
  }
}
