// ============================================================
//  Bloque de la academia en el Home — lógica PURA (Bloque L)
// ------------------------------------------------------------
//  Sustituye a la banda fija que pintaba logo + nombre + lema. La academia es
//  quien paga, y hasta ahora su presencia en la app era un renglón.
//
//  Vive en `academias/{id}.homeAcademia` y SOLO lo escribe el director (o el
//  super-admin sobre academias ajenas): lo impone la regla de Firestore, no
//  esta capa.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
//
//  Criterio de normalización: FAIL-OPEN. Un dato corrupto en Firestore jamás
//  debe dejar el Home en blanco ni reventar el render — cae al valor por
//  defecto, que es exactamente la banda de siempre.
// ============================================================

export const VARIANTES = ['banda', 'hero', 'tarjetas']

export const ETIQUETA_VARIANTE = {
  banda: 'Banda discreta',
  hero: 'Portada con imagen',
  tarjetas: 'Banda + accesos rápidos',
}

export const DESCRIPCION_VARIANTE = {
  banda: 'Una franja con tu logo, nombre y lema. Es la de siempre.',
  hero: 'Un bloque grande con imagen de fondo y tu mensaje encima. Ocupa la portada.',
  tarjetas: 'La banda, más botones a las secciones que quieras destacar.',
}

// Destinos permitidos para los accesos rápidos. Es un CATÁLOGO CERRADO a
// propósito: si el director pudiera escribir la ruta a mano, podría colar un
// `javascript:` en el href de un enlace y ejecutarlo en la sesión de todos sus
// alumnos. Con catálogo, ese vector no existe.
export const DESTINOS = [
  { ruta: '/temario', etiqueta: 'Temario', icono: 'temario' },
  { ruta: '/examen', etiqueta: 'Exámenes', icono: 'examen' },
  { ruta: '/flashcards', etiqueta: 'Flashcards', icono: 'flashcards' },
  { ruta: '/atlas', etiqueta: 'Atlas', icono: 'atlas' },
  { ruta: '/progreso', etiqueta: 'Mi progreso', icono: 'progreso' },
  { ruta: '/buscar', etiqueta: 'Buscar', icono: 'buscar' },
  { ruta: '/cuenta', etiqueta: 'Mi cuenta', icono: 'usuario' },
]

const RUTAS_VALIDAS = new Set(DESTINOS.map((d) => d.ruta))
const ICONO_DE = Object.fromEntries(DESTINOS.map((d) => [d.ruta, d.icono]))

export const MAX_AVISOS = 3
export const MAX_ACCESOS = 4
const MAX_TITULO = 80
const MAX_MENSAJE = 200
const MAX_AVISO_TEXTO = 240

const texto = (v, max) => String(v ?? '').trim().slice(0, max)

export function homeAcademiaDefault() {
  return {
    variante: 'banda',
    titulo: '',
    mensaje: '',
    imagenFondo: '',
    colorAcento: '',
    mostrarGrupo: true,
    avisos: [],
    accesos: [],
  }
}

// Normaliza lo guardado (o la basura que haya). Nunca lanza.
export function normalizarHomeAcademia(config) {
  const base = homeAcademiaDefault()
  if (!config || typeof config !== 'object') return base

  const variante = VARIANTES.includes(config.variante) ? config.variante : base.variante

  const avisos = (Array.isArray(config.avisos) ? config.avisos : [])
    .filter((a) => a && typeof a === 'object')
    .map((a) => ({
      titulo: texto(a.titulo, MAX_TITULO),
      texto: texto(a.texto, MAX_AVISO_TEXTO),
      url: texto(a.url, 500),
    }))
    // Un aviso sin nada que decir no se pinta.
    .filter((a) => a.titulo || a.texto)
    .slice(0, MAX_AVISOS)

  const vistos = new Set()
  const accesos = (Array.isArray(config.accesos) ? config.accesos : [])
    .filter((a) => a && typeof a === 'object' && RUTAS_VALIDAS.has(a.ruta) && !vistos.has(a.ruta))
    .map((a) => {
      vistos.add(a.ruta)
      return {
        ruta: a.ruta,
        etiqueta: texto(a.etiqueta, 40) || DESTINOS.find((d) => d.ruta === a.ruta).etiqueta,
        icono: ICONO_DE[a.ruta],
      }
    })
    .slice(0, MAX_ACCESOS)

  return {
    variante,
    titulo: texto(config.titulo, MAX_TITULO),
    mensaje: texto(config.mensaje, MAX_MENSAJE),
    imagenFondo: texto(config.imagenFondo, 500),
    colorAcento: /^#[0-9a-fA-F]{6}$/.test(config.colorAcento || '') ? config.colorAcento : '',
    // Solo `false` explícito oculta el grupo: cualquier otra cosa, lo muestra.
    mostrarGrupo: config.mostrarGrupo === false ? false : true,
    avisos,
    accesos,
  }
}

// Configuración EFECTIVA para pintar: lo guardado, con los huecos rellenos a
// partir de los datos que la academia ya tenía (nombre, lema, colorHero). Así
// una academia que nunca lo configure se ve exactamente igual que antes.
export function homeAcademiaDe(academia) {
  const cfg = normalizarHomeAcademia(academia?.homeAcademia)
  return {
    ...cfg,
    titulo: cfg.titulo || academia?.nombre || academia?.id || '',
    mensaje: cfg.mensaje || academia?.lema || '',
    colorAcento: cfg.colorAcento || academia?.colorHero || '',
    logo: academia?.logo || '',
  }
}

// ¿Equivale al default? Entonces se guarda null y el doc no arrastra un campo
// redundante (mismo criterio que homeModelo.js).
export function esHomeAcademiaDefault(config) {
  const a = normalizarHomeAcademia(config)
  const b = homeAcademiaDefault()
  return (
    a.variante === b.variante &&
    a.titulo === b.titulo &&
    a.mensaje === b.mensaje &&
    a.imagenFondo === b.imagenFondo &&
    a.colorAcento === b.colorAcento &&
    a.mostrarGrupo === b.mostrarGrupo &&
    a.avisos.length === 0 &&
    a.accesos.length === 0
  )
}

// --- Operaciones puras del editor (inmutables) ---

export function alternarAcceso(config, ruta) {
  const cfg = normalizarHomeAcademia(config)
  const ya = cfg.accesos.some((a) => a.ruta === ruta)
  if (ya) return { ...cfg, accesos: cfg.accesos.filter((a) => a.ruta !== ruta) }
  if (cfg.accesos.length >= MAX_ACCESOS) return cfg
  const d = DESTINOS.find((x) => x.ruta === ruta)
  if (!d) return cfg
  return { ...cfg, accesos: [...cfg.accesos, { ruta, etiqueta: d.etiqueta, icono: d.icono }] }
}

export function agregarAviso(config) {
  const cfg = normalizarHomeAcademia(config)
  if (cfg.avisos.length >= MAX_AVISOS) return cfg
  return { ...cfg, avisos: [...cfg.avisos, { titulo: '', texto: '', url: '' }] }
}

export function editarAviso(config, indice, campos) {
  const cfg = normalizarHomeAcademia(config)
  // normalizarHomeAcademia descarta los avisos vacíos, así que mientras se
  // edita se trabaja sobre la lista CRUDA y solo se limpia al guardar.
  const avisos = (Array.isArray(config?.avisos) ? config.avisos : cfg.avisos).map((a, i) =>
    i === indice ? { ...a, ...campos } : a
  )
  return { ...cfg, avisos }
}

export function quitarAviso(config, indice) {
  const avisos = (Array.isArray(config?.avisos) ? config.avisos : []).filter((_, i) => i !== indice)
  return { ...normalizarHomeAcademia(config), avisos }
}
