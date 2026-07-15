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
//  Las URLs públicas (/fase/:id, /tema/:id) no cambian: los ids viajan en
//  la estructura de cada academia (la clonación los preserva).
// ============================================================
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useAuth } from './AuthContext.jsx'
import { academiaMigrada } from '../lib/contenidoApi.js'
import { fasesNav, stats as statsBundle } from '../data/navIndice.js'

const INDICE_BUNDLE = { fases: fasesNav, stats: statsBundle, fuente: 'legacy' }

const ContenidoContext = createContext(null)

export function ContenidoProvider({ children }) {
  const { academia } = useAuth()
  const academiaId = academia?.id || null
  const migrada = academiaMigrada(academia)
  // Identidad de la FUENTE: si cambia (login/logout, cambio de academia o su
  // clonación termina), se descarta lo cargado y se vuelve a resolver.
  const clave = migrada ? academiaId : 'legacy'

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
        const ind = await indiceDeAcademia(academia)
        if (activo && ind) {
          // preguntas/flashcards salen del bundle hasta cargar el contenido
          // completo (la estructura sola no las conoce): solo afinan contadores.
          setIndice({ ...ind, stats: { ...INDICE_BUNDLE.stats, ...ind.stats } })
        }
      } catch {
        /* sin red/permisos: el shell se queda con el índice del bundle */
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
        const api = await contenidoDeAcademia(academia)
        if (!activo) return
        setContenido(api)
        setError(null)
        // El shell refleja EXACTAMENTE lo cargado; si la academia migrada
        // terminó cayendo a legacy (parcial/permisos), el índice vuelve al bundle.
        setIndice(api.fuente === 'firestore' && api.indice ? api.indice : INDICE_BUNDLE)
      } catch (err) {
        // Falla hasta el fallback (p. ej. sin red para bajar el chunk de datos).
        if (activo) setError(err)
      }
    })()
    return () => { activo = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedido, contenido, clave, reintento])

  const pedir = useCallback(() => setPedido(true), [])
  const reintentar = useCallback(() => {
    setError(null)
    setReintento((n) => n + 1)
  }, [])

  const valor = useMemo(
    () => ({ indice, contenido, error, pedir, reintentar, academiaId }),
    [indice, contenido, error, pedir, reintentar, academiaId]
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

// Estado de carga estándar para las páginas de estudio (mismos estilos que el
// fallback de rutas de App.jsx).
export function CargandoContenido() {
  return (
    <div className="ruta-cargando" role="status" aria-live="polite">
      <span className="ruta-spinner" aria-hidden="true" />
      <span>Cargando contenido…</span>
    </div>
  )
}

// Error terminal (ni Firestore ni bundle): raro — normalmente sin conexión.
export function ErrorContenido({ onReintentar }) {
  return (
    <div className="acceso-restringido" role="alert">
      <h1>No se pudo cargar el contenido</h1>
      <p>Revisa tu conexión e inténtalo de nuevo.</p>
      <button className="btn btn-primario" onClick={onReintentar}>Reintentar</button>
    </div>
  )
}
