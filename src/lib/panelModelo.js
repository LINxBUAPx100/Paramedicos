// ============================================================
//  Consola del director — lógica PURA (Bloque O)
// ------------------------------------------------------------
//  `PanelAcademia.jsx` era una página de 1271 líneas con TODO apilado en
//  vertical: avance, solicitudes internas, solicitudes del directorio, grupos,
//  miembros, permisos editoriales y códigos de prueba. La aritmética de las
//  estadísticas vivía dentro del componente, así que no había forma de
//  probarla sin montar React.
//
//  Aquí está lo que se puede decidir SIN pintar nada: qué secciones ve cada
//  rol, cómo se agregan los intentos y qué dicen las estadísticas. Sin React y
//  sin Firebase: se prueba con `npm test`.
// ============================================================

// Umbral de aprobación de la plataforma. Estaba escrito a mano en cinco sitios.
export const APROBADO = 70

const SEMANA_SEG = 7 * 24 * 3600

// Catálogo de secciones del armazón. El orden es el de la navegación.
export const SECCIONES_PANEL = [
  { id: 'resumen', ruta: '/panel', fin: true, icono: 'progreso', etiqueta: 'Resumen' },
  { id: 'recepcion', ruta: '/panel/recepcion', icono: 'mas', etiqueta: 'Recepción' },
  { id: 'miembros', ruta: '/panel/miembros', icono: 'usuario', etiqueta: 'Miembros' },
  { id: 'grupos', ruta: '/panel/grupos', icono: 'capas', etiqueta: 'Grupos' },
  { id: 'invitaciones', ruta: '/panel/invitaciones', icono: 'llave', etiqueta: 'Invitaciones' },
  { id: 'accesos', ruta: '/panel/accesos', icono: 'candado', etiqueta: 'Accesos' },
  { id: 'calificaciones', ruta: '/panel/calificaciones', icono: 'examen', etiqueta: 'Calificaciones' },
  { id: 'contenido', ruta: '/panel/contenido', icono: 'herramientas', etiqueta: 'Contenido' },
  { id: 'academia', ruta: '/panel/academia', icono: 'temario', etiqueta: 'Mi academia' },
]

// Qué secciones ve quien mira. El profesor entra al MISMO armazón con menos
// secciones: nada de una pantalla distinta que haya que mantener por duplicado.
export function seccionesPanel({ rol, capacidades = null, permisosEditor = null, puedeVerCodigos = false } = {}) {
  const dirige = rol === 'admin_escuela' || rol === 'superadmin'
  // El editor es capacidad del plan para el director; un profesor entra solo
  // con un permiso editorial explícito que le concedió su director.
  const puedeEditar = dirige
    ? Boolean(capacidades?.editorContenido)
    : Boolean(permisosEditor?.editarContenido)

  const visible = {
    resumen: true,
    // Recepción (trabajo O4a): el alta de mostrador reserva una matrícula y
    // emite una invitación personal. Las dos cosas son del director; un
    // profesor no mueve el contador de la academia. Cuando exista el rol
    // `recepcion` entrará por aquí, y NO metiéndolo en `esStaffDe()` de las
    // reglas, que le regalaría el temario completo.
    recepcion: dirige,
    miembros: true, // el profesor la ve en solo lectura
    accesos: true, // el profesor pide aquí ver los códigos
    grupos: dirige,
    // Centro de invitaciones: director y super-admin siempre. Y el PROFESOR
    // con el permiso de códigos aprobado, porque desde ahí invita alumnos a su
    // grupo — no puede repartir roles, ni ver las invitaciones de su director;
    // eso lo impone firestore.rules, y esta pantalla solo le enseña lo suyo.
    invitaciones: dirige || (rol === 'instructor' && Boolean(puedeVerCodigos)),
    // El profesor SI la ve: es quien evalua a su grupo. Es la unica seccion de
    // escritura que un profesor tiene sin permisos editoriales, y es a proposito.
    calificaciones: true,
    contenido: puedeEditar,
    academia: dirige,
  }
  return SECCIONES_PANEL.filter((s) => visible[s.id])
}

// Agrega los intentos por alumno y por módulo:
//   { uid: { moduloId: { mejor, n, ultimo } } }
export function agregarIntentos(intentos) {
  const map = {}
  for (const it of intentos || []) {
    if (!it?.uid) continue
    const porModulo = (map[it.uid] = map[it.uid] || {})
    const celda = (porModulo[it.moduloId] = porModulo[it.moduloId] || { mejor: 0, n: 0, ultimo: null })
    celda.n += 1
    if (it.porcentaje >= celda.mejor) celda.mejor = it.porcentaje
    const seg = it.fecha?.seconds || 0
    if (!celda.ultimo || seg > celda.ultimo) celda.ultimo = seg
  }
  return map
}

// Filtro de grupo del panel: '' = todos, 'sin' = los que no tienen grupo.
export function pasaFiltroGrupo(miembro, filtro) {
  if (!filtro) return true
  if (filtro === 'sin') return !miembro?.grupoId
  return miembro?.grupoId === filtro
}

const media = (valores) =>
  valores.length ? Math.round(valores.reduce((s, v) => s + v, 0) / valores.length) : null

// Retrato de la academia (o del grupo filtrado). `ahora` entra por parámetro
// para que "esta semana" sea comprobable sin depender del reloj de la máquina.
export function resumenAcademia({
  alumnos = [], staff = [], intentos = [], porAlumno = {}, modulos = [], ahora = Date.now(),
}) {
  const uidsAlumnos = new Set(alumnos.map((a) => a.id))
  const mejores = []
  const enRiesgo = []
  let activos = 0

  for (const al of alumnos) {
    const valores = Object.values(porAlumno[al.id] || {}).map((c) => c.mejor)
    if (valores.length === 0) continue
    activos += 1
    mejores.push(...valores)
    const prom = media(valores)
    if (prom < APROBADO) enRiesgo.push({ ...al, prom, modulos: valores.length })
  }

  const hace7d = ahora / 1000 - SEMANA_SEG
  // Solo intentos de los alumnos visibles: respeta el filtro de grupo.
  const deAlumnos = intentos.filter((i) => uidsAlumnos.has(i.uid))
  const semana = deAlumnos.filter((i) => (i.fecha?.seconds || 0) >= hace7d).length

  const porModulo = modulos.map((f) => {
    const valores = alumnos
      .map((al) => porAlumno[al.id]?.[f.id]?.mejor)
      .filter((v) => v !== undefined)
    return { modulo: f, prom: media(valores), presentaron: valores.length }
  })

  return {
    promedio: media(mejores),
    aprobacion: mejores.length
      ? Math.round((mejores.filter((v) => v >= APROBADO).length / mejores.length) * 100)
      : null,
    activos,
    totalAlumnos: alumnos.length,
    totalStaff: staff.length,
    semana,
    porModulo,
    recientes: deAlumnos.slice(0, 6),
    enRiesgo,
  }
}

// --- Visibilidad por grupo (la superficie que absorbe el panel) ---

export function totalTemas(modulos) {
  return (modulos || []).reduce((s, f) => s + f.temas.length, 0)
}

// Estado de UNA módulo para el grupo elegido, que es lo que la tarjeta tiene que
// poder decir de un vistazo (Bloque Q). `porModulo` distingue «la ocultó el ojo
// del módulo» de «resultó oculta porque están tachados todos sus temas»: son la
// misma pantalla pero se deshacen de forma distinta.
export function estadoModulo(modulo, ocultas) {
  const temas = modulo?.temas || []
  const total = temas.length
  if ((ocultas?.modulos || []).includes(modulo?.id)) {
    return { estado: 'oculta', porModulo: true, visibles: 0, total }
  }
  const temasOcultos = new Set(ocultas?.temas || [])
  const visibles = temas.filter((t) => !temasOcultos.has(t.id)).length
  const estado = total > 0 && visibles === 0 ? 'oculta' : visibles === total ? 'visible' : 'parcial'
  return { estado, porModulo: false, visibles, total }
}

// Navegación por teclado de la baraja de módulos (patrón de acordeón de
// WAI-ARIA): las flechas mueven el foco entre cabeceras y da la vuelta al
// llegar al extremo; Inicio/Fin van a la primera y a la última. Devuelve el
// índice al que hay que llevar el foco, o null si esa tecla no es de las suyas
// (y entonces NO hay que tragarse el evento).
export function focoBaraja(indice, tecla, total) {
  if (!Number.isInteger(total) || total <= 0) return null
  switch (tecla) {
    case 'ArrowDown':
    case 'ArrowRight':
      return (indice + 1) % total
    case 'ArrowUp':
    case 'ArrowLeft':
      return (indice - 1 + total) % total
    case 'Home':
      return 0
    case 'End':
      return total - 1
    default:
      return null
  }
}

// Cuántos temas quedan ocultos para el grupo: los de un módulo oculta cuentan
// todos, aunque no estén marcados uno por uno.
export function contarTemasOcultos(modulos, ocultas) {
  const modulosOcultos = new Set(ocultas?.modulos || [])
  const temasOcultos = new Set(ocultas?.temas || [])
  return (modulos || []).reduce((s, f) => {
    if (modulosOcultos.has(f.id)) return s + f.temas.length
    return s + f.temas.filter((t) => temasOcultos.has(t.id)).length
  }, 0)
}

// --- Mensajes de error ---

// El fallo más común de este proyecto no es un bug: son reglas de Firestore
// sin publicar. Decirlo por su nombre ahorra media hora de diagnóstico.
export function mensajeError(err, accion, coleccion = 'codigos') {
  return String(err?.code || '').includes('permission-denied')
    ? `Sin permisos: publica las reglas actualizadas de firestore.rules (colección "${coleccion}").`
    : `${accion} (revisa tu conexión).`
}
