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
import { apiConValidaciones } from '../lib/validacionesModelo.js'
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
  const [api, setApi] = useState(null) // API BAJO DEMANDA | null
  const [error, setError] = useState(null)
  const [pedido, setPedido] = useState(false) // alguna página pidió el contenido
  const [pedidoApi, setPedidoApi] = useState(false)
  const [reintento, setReintento] = useState(0)
  // Capa de VALIDACIONES DOCENTES: `temaId → firma`. Se lee UNA vez por
  // academia (un solo documento) y se superpone a cada lección que sale del
  // resolutor. Sin esto, validar un tema no se notaba en ningún sitio: el
  // estado editorial vive en el contenido generado y nadie lo reescribía.
  const [validaciones, setValidaciones] = useState({})
  // Alguien pidió la capa de firmas sin pedir el temario. Pasa en el panel del
  // director: el semáforo «listo y aprobado» necesita saber qué está firmado,
  // pero esa pantalla nunca carga lecciones. Sin esta bandera el semáforo se
  // quedaba en ámbar para siempre, contradiciendo a la página del tema.
  const [pedidoValidaciones, setPedidoValidaciones] = useState(false)

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

  // API BAJO DEMANDA (Fase 1). Es la puerta que NO baja el curso entero: el
  // índice ya está cargado, la lección es una lectura y cada vista derivada lee
  // su agregado. Convive con `contenido` a propósito, no lo sustituye de golpe:
  // las pantallas se migran una a una y la que todavía no lo esté sigue
  // funcionando por el camino de siempre.
  useEffect(() => {
    setApi(null)
    if (!pedidoApi) return undefined
    let activo = true
    ;(async () => {
      try {
        const { contenidoBajoDemandaDeAcademia } = await import('../lib/firebase/contenido.js')
        const resuelto = await contenidoBajoDemandaDeAcademia(academia, acceso, cursoElegido)
        if (activo && resuelto) setApi(resuelto)
      } catch (err) {
        // No se propaga a la pantalla: quien use el hook verá `api` en null y
        // pintará su esqueleto. Aquí se registra porque es donde una academia
        // dejaría de servirse por el camino barato sin que nadie lo notara.
        registrar('contenido:api', err, { academiaId })
      }
    })()
    return () => { activo = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedidoApi, clave, reintento])

  // Firmas docentes de esta academia. Una lectura, y si falla se sigue con el
  // estado que declara el propio material: la capa mejora la vista, no es
  // condición para que el temario se pinte.
  //
  // Se espera a que alguien PIDA contenido. La portada y el resto del sitio
  // público no enseñan lecciones, así que ahí esta lectura no diría nada y sí
  // se cobraría una vez por visitante.
  useEffect(() => {
    if (!pedido && !pedidoApi && !pedidoValidaciones) return undefined
    let activo = true
    ;(async () => {
      try {
        const { leerValidaciones } = await import('../lib/firebase/validaciones.js')
        const mapa = await leerValidaciones(academiaId)
        if (activo) setValidaciones(mapa)
      } catch (err) {
        registrar('contenido:validaciones', err, { academiaId })
      }
    })()
    return () => { activo = false }
  }, [academiaId, reintento, pedido, pedidoApi, pedidoValidaciones])

  const pedir = useCallback(() => setPedido(true), [])
  const pedirApi = useCallback(() => setPedidoApi(true), [])
  const pedirValidaciones = useCallback(() => setPedidoValidaciones(true), [])

  // Refresca la capa sin recargar el temario entero: lo llama la barra de
  // revisión justo después de firmar, para que el cambio se vea al instante en
  // la misma página en la que se firmó.
  const refrescarValidaciones = useCallback(async (parche = null) => {
    if (parche) {
      setValidaciones((v) => ({ ...v, ...parche }))
      return
    }
    try {
      const { leerValidaciones } = await import('../lib/firebase/validaciones.js')
      setValidaciones(await leerValidaciones(academiaId))
    } catch (err) {
      registrar('contenido:validaciones', err, { academiaId })
    }
  }, [academiaId])

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

  // La API que ven las pantallas ya trae la capa de validaciones puesta: nadie
  // río abajo tiene que acordarse de aplicarla.
  const apiValidada = useMemo(() => apiConValidaciones(api, validaciones), [api, validaciones])

  const valor = useMemo(
    () => ({
      indice, contenido, api: apiValidada, error, pedir, pedirApi, reintentar,
      academiaId, cursos, cursoId, elegirCurso, validaciones, refrescarValidaciones, pedirValidaciones,
    }),
    [indice, contenido, apiValidada, error, pedir, pedirApi, reintentar,
      academiaId, cursos, cursoId, elegirCurso, validaciones, refrescarValidaciones, pedirValidaciones]
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

// ============================================================
//  HOOKS BAJO DEMANDA (Fase 1)
// ------------------------------------------------------------
//  Sustituyen a `useContenido()` en las pantallas de estudio. La diferencia no
//  se ve: es que abrir una lección deja de costar 287 lecturas.
//
//  Todos devuelven `{ …, cargando, error }` y ninguno lanza: mientras
//  `cargando` sea true la pantalla pinta su esqueleto, igual que hasta ahora.
// ============================================================

/**
 * La API bajo demanda. `api` es null mientras resuelve.
 *
 * Lo que responde SIN lecturas: módulos, títulos, numeración, vecinos y
 * contadores. Lo demás son métodos `…Async` que cuestan una lectura.
 */
export function useApiContenido() {
  const ctx = usarContexto()
  const { pedirApi } = ctx
  useEffect(() => { pedirApi() }, [pedirApi])
  return { api: ctx.api, error: ctx.error, reintentar: ctx.reintentar }
}

/**
 * Capa de validaciones docentes y la forma de refrescarla.
 *
 * `validaciones` es `temaId → firma`; `refrescarValidaciones(parche)` acepta un
 * parche optimista (lo que se acaba de firmar) o, sin argumentos, relee el
 * documento. Lo usa la barra de revisión de cada tema.
 */
export function useValidaciones() {
  const { validaciones, refrescarValidaciones, pedirValidaciones } = usarContexto()
  // Pedirlas es parte de usarlas. El panel del director enseña el semáforo
  // editorial sin cargar una sola lección, así que no basta con que la capa se
  // lea «cuando alguien pida contenido»: quien la consulta la pide.
  useEffect(() => { pedirValidaciones() }, [pedirValidaciones])
  return { validaciones, refrescarValidaciones }
}

// Cualquier carga asíncrona derivada de la API, con su estado. `deps` son las
// dependencias que obligan a recargar (normalmente el id de lo que se pide).
//
// El guardia `vivo` no es adorno: al pasar de una lección a otra deprisa,
// la respuesta de la primera puede llegar DESPUÉS de la segunda y pintaría la
// lección equivocada. Descartarla es la diferencia entre navegar y ver
// parpadear contenido ajeno.
function useCargaDeApi(pedir, deps) {
  const { api, error: errorApi, reintentar } = useApiContenido()
  const [dato, setDato] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!api) return undefined
    let vivo = true
    setDato(null)
    setError(null)
    Promise.resolve()
      .then(() => pedir(api))
      .then((r) => { if (vivo) setDato(r) })
      .catch((err) => { if (vivo) setError(err) })
    return () => { vivo = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, ...deps])

  return { dato, api, cargando: !api || (dato === null && !error), error: error || errorApi, reintentar }
}

/**
 * Versión escueta de lo anterior para quien solo quiere el dato: devuelve
 * `null` mientras carga y el resultado cuando llega.
 *
 * La usan las piezas que pueden pintarse sin su agregado —el subrayado del
 * glosario, por ejemplo— y que prefieren aparecer luego a bloquear la página.
 */
export function useCargaDeAgregado(pedir, deps = []) {
  return useCargaDeApi(pedir, deps).dato
}

/** Una lección completa. Una lectura. */
export function useTema(temaId) {
  const { dato, api, cargando, error, reintentar } = useCargaDeApi(
    (a) => (temaId ? a.getTemaAsync(temaId) : null),
    [temaId]
  )
  return { tema: dato, api, cargando: Boolean(temaId) && cargando, error, reintentar }
}

/** Preguntas de un módulo (examen de módulo). Una lectura. */
export function usePreguntasDeModulo(moduloId) {
  const { dato, cargando, error, reintentar } = useCargaDeApi(
    (a) => (moduloId ? a.preguntasDeModuloAsync(moduloId) : []),
    [moduloId]
  )
  return { preguntas: dato || [], cargando, error, reintentar }
}

/** Banco completo (examen general). Una lectura por módulo. */
export function useTodasLasPreguntas() {
  const { dato, cargando, error, reintentar } = useCargaDeApi((a) => a.todasLasPreguntasAsync(), [])
  return { preguntas: dato || [], cargando, error, reintentar }
}

/**
 * Mazo completo de flashcards. Una lectura por módulo.
 *
 * `activo` en false lo deja sin pedir nada. Existe porque la pantalla de
 * flashcards de UN tema no necesita el mazo global, pero las reglas de los
 * hooks obligan a invocarlo igual: sin este interruptor, abrir las tarjetas de
 * una lección se llevaba por delante los siete agregados del curso.
 */
export function useTodasLasFlashcards(activo = true) {
  const { dato, cargando, error, reintentar } = useCargaDeApi(
    (a) => (activo ? a.todasLasFlashcardsAsync() : []),
    [activo]
  )
  return { flashcards: dato || [], cargando, error, reintentar }
}

/** Fichas de las lecciones de un módulo (índice del módulo). Una lectura. */
export function useFichasDeModulo(moduloId) {
  const { dato, cargando, error, reintentar } = useCargaDeApi(
    (a) => (moduloId ? a.fichasDeModuloAsync(moduloId) : []),
    [moduloId]
  )
  return { fichas: dato || [], cargando, error, reintentar }
}

/** Fichas de TODO el curso (buscador). Una lectura por módulo. */
export function useTodasLasFichas() {
  const { dato, cargando, error, reintentar } = useCargaDeApi((a) => a.todasLasFichasAsync(), [])
  return { fichas: dato || [], cargando, error, reintentar }
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
