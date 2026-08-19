// ============================================================
//  Contenido académico para la UI — cableado del RESOLUTOR (Fase 4 roadmap)
// ------------------------------------------------------------
//  Única puerta de los COMPONENTES al contenido. Dos niveles:
//
//  · ÍNDICE ligero (useIndiceContenido): la misma forma que
//    src/data/navIndice.js. Arranca con el bundle (0 lecturas) y, si la
//    academia del usuario está 'migrado', se sustituye por SU estructura
//    (1 lectura: el doc del curso). Lo consume el shell (Layout, Home,
//    useVisibilidad, Temario, Panel).
//
//  · CONTENIDO completo (useContenido): la API entera de src/data/index.js
//    resuelta por contenidoDeAcademia() — Firestore si la academia está
//    migrada, bundle legacy si no (fallback automático). Se carga BAJO
//    DEMANDA: solo cuando una página de estudio lo pide, así el visitante
//    anónimo y el alumno legacy no pagan lecturas ni descargas de más.
//
//  Las URLs públicas (/modulo/:id, /tema/:id) no cambian: los ids viajan en
//  la estructura de cada academia (la clonación los preserva).
// ============================================================
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext.jsx'
import { academiaMigrada } from '../lib/contenidoApi.js'
import { programasDeGrupo } from '../lib/programasModelo.js'
import { registrar } from '../lib/registro.js'
import { modulosNav, stats as statsBundle } from '../data/navIndice.js'

const INDICE_BUNDLE = { modulos: modulosNav, stats: statsBundle, fuente: 'legacy' }

const ContenidoContext = createContext(null)

// Curso elegido por academia. En `localStorage` y no en el perfil porque es
// una preferencia de lectura, no un permiso: perderla no rompe nada y
// guardarla en Firestore costaría una escritura por cada cambio de pestaña.
const CLAVE_CURSO = (academiaId) => `ptem:curso:${academiaId || "sin-academia"}`

function leerCursoGuardado(academiaId) {
  try { return localStorage.getItem(CLAVE_CURSO(academiaId)) || null } catch { return null }
}

function guardarCurso(academiaId, cursoId) {
  try {
    if (cursoId) localStorage.setItem(CLAVE_CURSO(academiaId), cursoId)
    else localStorage.removeItem(CLAVE_CURSO(academiaId))
  } catch { /* almacenamiento bloqueado: la elección dura lo que la sesión */ }
}

export function ContenidoProvider({ children }) {
  const { academia, rol, grupo, esSuperadmin } = useAuth()
  const academiaId = academia?.id || null
  const migrada = academiaMigrada(academia)
  // ALCANCE de programas de esta persona: define QUÉ contenido resuelve el
  // resolutor (un alumno de Enfermería no recibe TUM). Se memoiza para no
  // recrear el objeto en cada render y disparar los efectos de más.
  const acceso = useMemo(
    () => ({ rol, esSuperadmin, grupo }),
    [rol, esSuperadmin, grupo]
  )
  // Identidad de la FUENTE: si cambia (login/logout, cambio de academia, fin
  // de la clonación o CAMBIO DE GRUPO), se descarta lo cargado y se resuelve
  // otra vez. El grupo entra en la clave porque cambia el contenido servido:
  // sin él, quien pasa de un grupo a otro seguiría viendo el temario anterior.
  const claveAcceso = esSuperadmin || rol === 'instructor' || rol === 'admin_escuela'
    ? '*'
    : programasDeGrupo(grupo).sort().join(',') || '∅'

  // CURSO ELEGIDO. Una academia puede impartir varios (paramédico,
  // enfermería…) y un grupo puede cursar su carrera más una especialización.
  // Se recuerda por academia y por navegador: quien estudia enfermería no
  // quiere volver a elegirla cada vez que abre la aplicación. La elección
  // NO es una credencial: el resolutor solo sirve un curso si de verdad
  // está al alcance de esta persona (cursoAServir), así que escribir otro
  // id a mano en el almacenamiento no abre ninguna puerta.
  //
  // Va ANTES de `clave` a propósito: `clave` lo usa, y leer una `const` antes
  // de su declaración lanza «Cannot access before initialization». Al estar en
  // la rama de academia migrada, el fallo no habría aparecido con el temario
  // del paquete y sí en cuanto una academia real abriera la aplicación.
  const [cursoElegido, setCursoElegido] = useState(() => leerCursoGuardado(academiaId))
  useEffect(() => { setCursoElegido(leerCursoGuardado(academiaId)) }, [academiaId])

  const clave = migrada ? `${academiaId}|${claveAcceso}|${cursoElegido || 'auto'}` : `legacy|${claveAcceso}`

  const [indice, setIndice] = useState(INDICE_BUNDLE)
  const [contenido, setContenido] = useState(null) // API completa | null
  const [error, setError] = useState(null)
  const [pedido, setPedido] = useState(false) // alguna página pidió el contenido
  const [reintento, setReintento] = useState(0)

  // Índice ligero de la academia migrada (1 lectura). Legacy: bundle directo.
  useEffect(() => {
    setContenido(null)
    setError(null)
    setIndice(INDICE_BUNDLE)
    if (!migrada) return undefined
    let activo = true
    ;(async () => {
      try {
        const { indiceDeAcademia } = await import('../lib/firebase/contenido.js')
        const ind = await indiceDeAcademia(academia, acceso, cursoElegido)
        if (activo && ind) {
          // preguntas/flashcards salen del bundle hasta cargar el contenido
          // completo (la estructura sola no las conoce): solo afinan contadores.
          setIndice({ ...ind, stats: { ...INDICE_BUNDLE.stats, ...ind.stats } })
        }
      } catch (err) {
        /* sin red/permisos: el shell se queda con el índice del bundle */
        // Silencioso PARA EL ALUMNO a propósito, pero no para nosotros: aquí
        // es donde una academia migrada empieza a mostrar el temario genérico
        // como si fuera el suyo.
        registrar('contenido:indice', err, { academiaId })
      }
    })()
    return () => { activo = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clave])

  // Contenido COMPLETO bajo demanda (lo disparan las páginas de estudio).
  useEffect(() => {
    if (!pedido || contenido) return undefined
    let activo = true
    ;(async () => {
      try {
        const { contenidoDeAcademia } = await import('../lib/firebase/contenido.js')
        const api = await contenidoDeAcademia(academia, acceso, cursoElegido)
        if (!activo) return
        setContenido(api)
        setError(null)
        // El shell refleja EXACTAMENTE lo cargado; si la academia migrada
        // terminó cayendo a legacy (parcial/permisos), el índice vuelve al bundle.
        setIndice(api.fuente === 'firestore' && api.indice ? api.indice : INDICE_BUNDLE)
      } catch (err) {
        // Falla hasta el fallback (p. ej. sin red para bajar el chunk de datos).
        registrar('contenido:completo', err, { academiaId })
        if (activo) setError(err)
      }
    })()
    return () => { activo = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedido, contenido, clave, reintento])

  const pedir = useCallback(() => setPedido(true), [])

  // Cambiar de curso: se guarda y se descarta lo cargado. El contenido se
  // vuelve a resolver porque `clave` cambia.
  const elegirCurso = useCallback((cursoId) => {
    guardarCurso(academiaId, cursoId)
    setCursoElegido(cursoId || null)
  }, [academiaId])
  const reintentar = useCallback(() => {
    setError(null)
    setReintento((n) => n + 1)
  }, [])

  // Los cursos que esta persona puede estudiar. Salen de lo ya cargado (el
  // contenido completo si está, y si no del índice ligero): ninguna lectura
  // extra. Sin academia migrada no hay cursos y el Home se comporta como
  // siempre, con el temario del paquete.
  const cursos = contenido?.cursos || indice?.cursos || []
  const cursoId = contenido?.cursoId || indice?.cursoId || null

  const valor = useMemo(
    () => ({ indice, contenido, error, pedir, reintentar, academiaId, cursos, cursoId, elegirCurso }),
    [indice, contenido, error, pedir, reintentar, academiaId, cursos, cursoId, elegirCurso]
  )
  return <ContenidoContext.Provider value={valor}>{children}</ContenidoContext.Provider>
}

function usarContexto() {
  const ctx = useContext(ContenidoContext)
  if (!ctx) throw new Error('useContenido debe usarse dentro de ContenidoProvider')
  return ctx
}

// Contenido COMPLETO (páginas de estudio). Devuelve { contenido, error,
// reintentar }: contenido es null mientras carga → renderizar <CargandoContenido/>.
export function useContenido() {
  const ctx = usarContexto()
  const { pedir } = ctx
  useEffect(() => { pedir() }, [pedir])
  return ctx
}

// Índice LIGERO para el shell (no dispara la carga del contenido completo).
export function useIndiceContenido() {
  return usarContexto().indice
}

/**
 * Los CURSOS que esta persona puede estudiar y cuál tiene abierto.
 *
 * Sale de lo que el resolutor ya cargó, así que no cuesta lecturas. Con una
 * academia sin migrar (o sin sesión) la lista viene vacía: hay un solo temario,
 * el del paquete, y no hay nada que elegir.
 */
export function useCursos() {
  const { cursos, cursoId, elegirCurso } = usarContexto()
  return { cursos, cursoId, elegirCurso }
}

// Índice de UNA academia concreta (superadmin gestionando otra academia desde
// /temario o /admin): si es la del usuario (o no hay id) usa el del contexto;
// si es ajena, resuelve el suyo con fallback al bundle.
export function useIndiceAcademia(academiaIdObjetivo) {
  const ctx = usarContexto()
  const esAjena = Boolean(academiaIdObjetivo) && academiaIdObjetivo !== ctx.academiaId
  const [remoto, setRemoto] = useState(null)
  useEffect(() => {
    if (!esAjena) { setRemoto(null); return undefined }
    let activo = true
    setRemoto(null)
    ;(async () => {
      try {
        const { indicePorAcademiaId } = await import('../lib/firebase/contenido.js')
        const ind = await indicePorAcademiaId(academiaIdObjetivo)
        if (activo && ind) setRemoto({ ...ind, stats: { ...INDICE_BUNDLE.stats, ...ind.stats } })
      } catch {
        /* academia legacy o sin permisos: bundle */
      }
    })()
    return () => { activo = false }
  }, [esAjena, academiaIdObjetivo])
  if (!esAjena) return ctx.indice
  return remoto || INDICE_BUNDLE
}

// Estado de carga de las páginas de estudio. Es un ESQUELETO, no un spinner:
// la página ya sabe qué forma va a tener, así que se dibuja esa forma en gris.
// Gana dos cosas sobre el spinner que había —
//   · la percepción de velocidad (se ve estructura, no una rueda girando),
//   · el CLS: el contenido real aterriza donde ya había hueco, sin saltos.
// `variante` elige la silueta; el respaldo es un bloque de texto genérico.
//
// Accesibilidad: role="status" + aria-busy y un texto solo para lectores, que
// no ven la silueta. Las barras van con aria-hidden.
export function CargandoContenido({ variante = 'generico' }) {
  return (
    <div className="esqueleto" role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">Cargando contenido…</span>
      {variante === 'tema' && (
        <>
          <span className="esq-linea esq-linea--migas" aria-hidden="true" />
          <div className="esq-cabecera" aria-hidden="true">
            <span className="esq-ico" />
            <span className="esq-cabecera-txt">
              <span className="esq-linea esq-linea--corta" />
              <span className="esq-linea esq-linea--titulo" />
            </span>
          </div>
          <span className="esq-linea" aria-hidden="true" />
          <span className="esq-linea" aria-hidden="true" />
          <span className="esq-linea esq-linea--media" aria-hidden="true" />
          <span className="esq-bloque" aria-hidden="true" />
          <span className="esq-linea" aria-hidden="true" />
          <span className="esq-linea esq-linea--media" aria-hidden="true" />
        </>
      )}
      {variante === 'modulo' && (
        <>
          <span className="esq-linea esq-linea--migas" aria-hidden="true" />
          <div className="esq-cabecera" aria-hidden="true">
            <span className="esq-ico" />
            <span className="esq-cabecera-txt">
              <span className="esq-linea esq-linea--corta" />
              <span className="esq-linea esq-linea--titulo" />
            </span>
          </div>
          <span className="esq-linea esq-linea--media" aria-hidden="true" />
          <div className="esq-rejilla" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => <span key={i} className="esq-tarjeta" />)}
          </div>
        </>
      )}
      {variante === 'generico' && (
        <>
          <span className="esq-linea esq-linea--titulo" aria-hidden="true" />
          <span className="esq-linea" aria-hidden="true" />
          <span className="esq-linea" aria-hidden="true" />
          <span className="esq-linea esq-linea--media" aria-hidden="true" />
        </>
      )}
    </div>
  )
}

// Error terminal (ni Firestore ni bundle): raro — normalmente sin conexión.
export function ErrorContenido({ onReintentar }) {
  return (
    <div className="acceso-restringido" role="alert">
      <h1>No se pudo cargar el contenido</h1>
      <p>Revisa tu conexión e inténtalo de nuevo.</p>
      {/* Misma pantalla de escape, mismo botón que NotFound / ErrorBoundary. */}
      <button className="btn btn--pildora btn--carbon" onClick={onReintentar}>Reintentar</button>
    </div>
  )
}
