// ============================================================
//  Página de inicio por SECCIONES configurables — lógica PURA (roadmap F7)
// ------------------------------------------------------------
//  Sin Firebase, sin React. El director (plan con `paginaInicioConfigurable`)
//  decide qué secciones del Home ven los miembros de SU academia y en qué
//  orden. La configuración vive en `academias/{id}.homeSecciones` (la regla
//  de Firestore acota quién la escribe); sin configuración, el Home es
//  EXACTAMENTE el actual (default = comportamiento de siempre).
//
//  La identidad de la academia SÍ es una sección de este catálogo («academia»):
//  se puede ocultar y mover como cualquier otra. Estuvo fuera, clavada detrás
//  de la portada, y por eso se leía como un aviso pegado al Home en vez de como
//  una parte del Home.
//
//  El que sigue FUERA es el selector de grupo del profesor: es una herramienta
//  para trabajar, no presencia de marca. Si el director pudiera ocultarlo, sus
//  profesores se quedarían sin poder cambiar de grupo.
// ============================================================

// Catálogo de secciones configurables, en su ORDEN predeterminado (el Home
// actual). Añadir una sección nueva = una entrada aquí + su render en Home.jsx.
export const SECCIONES_HOME = [
  {
    id: 'hero',
    etiqueta: 'Portada PTEM',
    descripcion: 'Presentación de la plataforma: marca, mensaje y estadísticas del temario.',
  },
  {
    id: 'academia',
    etiqueta: 'Tu academia',
    descripcion: 'La identidad de la academia: logo, nombre, mensaje, avisos y accesos. Se configura más abajo.',
  },
  {
    id: 'progreso',
    etiqueta: 'Tu progreso',
    descripcion: 'Barra con los temas leídos del alumno (solo aparece si ya empezó).',
  },
  {
    id: 'fases',
    etiqueta: 'Carrusel de fases',
    descripcion: 'El recorrido del temario, fase por fase.',
  },
  {
    id: 'prueba',
    etiqueta: 'Ponte a prueba',
    descripcion: 'Invitación al examen general y a los quizzes.',
  },
  {
    id: 'atlas',
    etiqueta: 'Atlas',
    descripcion: 'Invitación al atlas anatómico y fisiológico.',
  },
  {
    id: 'flashcards',
    etiqueta: 'Flashcards',
    descripcion: 'Invitación al repaso con flashcards.',
  },
]

export const IDS_SECCIONES_HOME = SECCIONES_HOME.map((s) => s.id)

export const ETIQUETA_SECCION_HOME = Object.fromEntries(
  SECCIONES_HOME.map((s) => [s.id, s.etiqueta])
)

// Configuración predeterminada: todas visibles, en el orden del catálogo.
export function homeSeccionesDefault() {
  return SECCIONES_HOME.map((s) => ({ id: s.id, visible: true }))
}

// Normaliza una configuración guardada (o basura de Firestore):
//  - solo ids del catálogo, sin duplicados, en el orden recibido;
//  - `visible` booleano estricto (cualquier otra cosa ⇒ true, fail-open:
//    un dato corrupto jamás borra secciones del Home);
//  - las secciones que falten se AÑADEN visibles EN SU SITIO del catálogo, no
//    al final. Antes iban al final, y eso bastaba mientras las secciones nuevas
//    fueran invitaciones de marketing; en cuanto se añadió «Tu academia» —que
//    va justo tras la portada— la regla vieja habría mandado la identidad de
//    cada academia ya configurada al pie de su Home sin que nadie lo pidiera.
export function normalizarHomeSecciones(config) {
  const conocidas = new Set(IDS_SECCIONES_HOME)
  const vistas = new Set()
  const out = []
  for (const item of Array.isArray(config) ? config : []) {
    const id = item?.id
    if (!conocidas.has(id) || vistas.has(id)) continue
    vistas.add(id)
    out.push({ id, visible: item.visible === false ? false : true })
  }
  // Cada ausente entra detrás de su vecina anterior del catálogo que SÍ esté
  // presente; si no hay ninguna (era la primera), abre la lista. Así se respeta
  // el orden que eligió el director y la sección nueva cae donde le toca.
  for (const id of IDS_SECCIONES_HOME) {
    if (vistas.has(id)) continue
    const posCatalogo = IDS_SECCIONES_HOME.indexOf(id)
    const previas = IDS_SECCIONES_HOME.slice(0, posCatalogo)
    let destino = 0
    for (let i = out.length - 1; i >= 0; i--) {
      if (previas.includes(out[i].id)) { destino = i + 1; break }
    }
    out.splice(destino, 0, { id, visible: true })
    vistas.add(id)
  }
  return out
}

// Secciones del Home para UNA academia (o el default si no hay nada que
// aplicar). La ESCRITURA ya la acotan las reglas por plan; aquí se aplica lo
// guardado tal cual — mismo criterio que logo/lema/colorHero.
export function seccionesDeHome(academia) {
  if (!academia || !Array.isArray(academia.homeSecciones) || academia.homeSecciones.length === 0) {
    return homeSeccionesDefault()
  }
  return normalizarHomeSecciones(academia.homeSecciones)
}

// Solo los ids visibles, en orden de render (lo que consume Home.jsx).
export function idsVisiblesDeHome(academia) {
  return seccionesDeHome(academia).filter((s) => s.visible).map((s) => s.id)
}

// --- Operaciones puras del editor del director (inmutables) ---

export function alternarSeccion(config, id) {
  return normalizarHomeSecciones(config).map((s) =>
    s.id === id ? { ...s, visible: !s.visible } : s
  )
}

export function moverSeccion(config, id, direccion) {
  const lista = normalizarHomeSecciones(config)
  const idx = lista.findIndex((s) => s.id === id)
  const destino = idx + (direccion === 'arriba' ? -1 : 1)
  if (idx < 0 || destino < 0 || destino >= lista.length) return lista
  const out = [...lista]
  ;[out[idx], out[destino]] = [out[destino], out[idx]]
  return out
}

// ¿La configuración equivale al default? (para guardar null y no arrastrar
// un campo redundante en el doc de la academia).
export function esHomeDefault(config) {
  const norm = normalizarHomeSecciones(config)
  const def = homeSeccionesDefault()
  return norm.length === def.length
    && norm.every((s, i) => s.id === def[i].id && s.visible === def[i].visible)
}
