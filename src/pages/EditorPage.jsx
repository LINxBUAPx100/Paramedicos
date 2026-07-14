import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Icon from '../components/Icon.jsx'
import ArbolCurso, { ChipEstado } from '../components/editor/ArbolCurso.jsx'
import PanelNodo from '../components/editor/PanelNodo.jsx'
import PanelContenidoTema from '../components/editor/PanelContenidoTema.jsx'
import DialogoConfirmar from '../components/editor/DialogoConfirmar.jsx'
import VistaPrevia from '../components/editor/VistaPrevia.jsx'
import { academiaMigrada } from '../lib/contenidoApi.js'
import {
  localizar, tipoDeRef, permisoEdicion, validarTitulo, contarDescendientesActivos,
  crearFase, crearModulo, crearTema, actualizarNodo, reordenarNodo, moverNodo,
  duplicarNodo, archivarNodo, restaurarNodo, despublicarNodo, publicarNodo,
} from '../lib/editorModelo.js'

// La capa de datos se importa DIFERIDA (mismo patrón del resto de la app:
// Firebase nunca entra al bundle inicial).
let _editorLib = null
function editorLib() {
  if (!_editorLib) _editorLib = import('../lib/firebase/editor.js')
  return _editorLib
}

function Bloqueo({ icono = 'candado', titulo, children }) {
  return (
    <div className="acceso-restringido" role="alert">
      <span className="acceso-ico"><Icon name={icono} size={30} /></span>
      <h1>{titulo}</h1>
      {children}
      <Link to="/" className="btn-pildora btn-pildora--solido">Volver al inicio</Link>
    </div>
  )
}

// ============================================================
//  EDITOR ESTRUCTURAL (Fase 3)
//  /editor                      → director / profesor autorizado (su academia)
//  /editor/:academiaId          → superadmin sobre cualquier academia
//  /editor/plantilla/:plantillaId → superadmin sobre la PLANTILLA GLOBAL
// ============================================================
export default function EditorPage() {
  const params = useParams()
  const { cargando, user, perfil, rol, esSuperadmin, academiaId, academia, capacidades } = useAuth()

  const destino = useMemo(() => (
    params.plantillaId
      ? { modo: 'plantilla', plantillaId: params.plantillaId }
      : { modo: 'academia', academiaId: params.academiaId || academiaId }
  ), [params.plantillaId, params.academiaId, academiaId])

  const contexto = useMemo(() => ({
    uid: user?.uid, esSuperadmin, rol, academiaId, capacidades, perfil,
  }), [user?.uid, esSuperadmin, rol, academiaId, capacidades, perfil])

  // ---------- estado principal ----------
  const [academiaObjetivo, setAcademiaObjetivo] = useState(null) // doc de la academia editada
  const [cursos, setCursos] = useState(null)                     // null = cargando
  const [cursoSelId, setCursoSelId] = useState(null)
  const [seleccion, setSeleccion] = useState(null)               // {curso:true} | ref | null
  const [temasCache, setTemasCache] = useState({})               // temaId -> doc (curso actual)
  const [cargandoTema, setCargandoTema] = useState(false)
  const [guardado, setGuardado] = useState({ estado: 'inactivo', mensaje: '' })
  const [errorCarga, setErrorCarga] = useState('')
  const [dialogo, setDialogo] = useState(null)                   // confirmaciones
  const [crear, setCrear] = useState(null)                       // alta con título
  const [previa, setPrevia] = useState(null)                     // { temasDocs }
  const sucio = useRef(false)                                    // cambios sin guardar (cualquier panel)
  const sucios = useRef({})                                      // por panel: { nodo, contenido }
  const marcarSucio = (clave) => (v) => {
    sucios.current[clave] = v
    sucio.current = Object.values(sucios.current).some(Boolean)
  }
  const ocupado = guardado.estado === 'guardando'

  const curso = useMemo(
    () => (cursos || []).find((c) => c.id === cursoSelId) || null,
    [cursos, cursoSelId]
  )

  // Cursos visibles: el profesor solo ve sus cursos permitidos.
  const cursosVisibles = useMemo(() => {
    if (!cursos) return null
    if (esSuperadmin || rol === 'admin_escuela') return cursos
    const permitidos = perfil?.permisosEditor?.cursosPermitidos || []
    return cursos.filter((c) => permitidos.includes(c.id))
  }, [cursos, esSuperadmin, rol, perfil])

  // ---------- permisos y candados ----------
  const permiso = useMemo(() => {
    if (destino.modo === 'plantilla') {
      return esSuperadmin
        ? { permitido: true }
        : { permitido: false, motivo: 'Solo el administrador de la plataforma edita plantillas globales.' }
    }
    return permisoEdicion({
      esSuperadmin, rol,
      academiaIdUsuario: academiaId,
      academiaIdObjetivo: destino.academiaId,
      capacidades, perfil,
    })
  }, [destino, esSuperadmin, rol, academiaId, capacidades, perfil])

  // ---------- carga inicial ----------
  const recargar = useCallback(async () => {
    setErrorCarga('')
    try {
      const ed = await editorLib()
      if (destino.modo === 'academia') {
        const doc = (!params.academiaId || params.academiaId === academiaId)
          ? academia
          : await ed.obtenerAcademiaEditor(destino.academiaId)
        setAcademiaObjetivo(doc ? { id: destino.academiaId, ...doc } : null)
        if (!doc || !academiaMigrada(doc)) { setCursos([]); return }
      }
      setCursos(await ed.listarCursosEditor(destino))
    } catch (err) {
      setErrorCarga(err?.message || 'No se pudo cargar el contenido.')
      setCursos([])
    }
  }, [destino, params.academiaId, academiaId, academia])

  useEffect(() => {
    if (cargando || !permiso.permitido) return
    if (destino.modo === 'academia' && !destino.academiaId) return
    recargar()
  }, [cargando, permiso.permitido, recargar, destino])

  // Al cambiar de curso se limpia la caché de temas (jamás se mezcla nada).
  useEffect(() => { setTemasCache({}); setSeleccion(null) }, [cursoSelId])

  // Cambios sin guardar: aviso al salir de la página.
  useEffect(() => {
    const guardia = (e) => {
      if (sucio.current) { e.preventDefault(); e.returnValue = '' }
    }
    window.addEventListener('beforeunload', guardia)
    return () => window.removeEventListener('beforeunload', guardia)
  }, [])

  // Doc del tema seleccionado (carga diferida, cacheada por curso).
  const temaSel = seleccion?.temaId ? temasCache[seleccion.temaId] : null
  useEffect(() => {
    let vivo = true
    if (!seleccion?.temaId || temasCache[seleccion.temaId] || !curso) return
    setCargandoTema(true)
    editorLib()
      .then((ed) => ed.temaDelEditor(destino, curso.id, seleccion.temaId))
      .then((doc) => {
        if (vivo && doc) setTemasCache((prev) => ({ ...prev, [doc.temaId]: doc }))
      })
      .catch(() => null)
      .finally(() => { if (vivo) setCargandoTema(false) })
    return () => { vivo = false }
  }, [seleccion?.temaId, curso, destino, temasCache])

  // ---------- utilidades ----------
  const confirmarSiSucio = (continuar) => {
    if (!sucio.current) return continuar()
    setDialogo({
      titulo: 'Cambios sin guardar',
      cuerpo: 'Tienes cambios sin guardar en el panel. Si continúas, se perderán.',
      confirmar: 'Descartar cambios',
      tono: 'peligro',
      accion: () => { sucio.current = false; sucios.current = {}; continuar() },
    })
  }

  const seleccionar = (ref) => confirmarSiSucio(() => setSeleccion(ref))

  const actualizarCursoLocal = (id, cambios) => {
    setCursos((prev) => prev.map((c) => (c.id === id ? { ...c, ...cambios } : c)))
  }

  // Núcleo: aplica una transformación PURA y la guarda en una transacción con
  // control de versión. Optimista con rollback: la UI cambia ya; si Firestore
  // rechaza (permisos, conflicto, red), se restaura y se explica.
  const ejecutar = async (accion, transformar, extras = {}) => {
    if (!curso || ocupado) return null
    const previo = curso
    let resultado
    try {
      resultado = transformar(curso.estructura || [])
    } catch (err) {
      setGuardado({ estado: 'error', mensaje: err.message })
      return null
    }
    setGuardado({ estado: 'guardando', mensaje: 'Guardando…' })
    actualizarCursoLocal(curso.id, { estructura: resultado.estructura })
    try {
      const ed = await editorLib()
      // Los extras pueden depender del resultado (p. ej. el id del tema nuevo
      // se genera dentro de la transformación pura).
      const extrasFinal = typeof extras === 'function' ? extras(resultado) : extras
      const { version } = await ed.guardarEstructura(
        contexto, destino, curso.id, curso.version ?? 0,
        resultado.estructura, accion,
        { ...extrasFinal, temasDuplicados: resultado.mapeoTemas || [] }
      )
      actualizarCursoLocal(curso.id, { version })
      setGuardado({ estado: 'ok', mensaje: 'Cambios guardados' })
      return resultado
    } catch (err) {
      actualizarCursoLocal(curso.id, { estructura: previo.estructura, version: previo.version })
      if (err?.name === 'ConflictoVersion') {
        await recargar()
        setSeleccion(null)
      }
      setGuardado({
        estado: 'error',
        mensaje: err?.message || 'No se pudo guardar. Revisa tu conexión e inténtalo de nuevo.',
      })
      return null
    }
  }

  // ---------- acciones sobre el nodo seleccionado ----------
  const nodoSel = useMemo(() => {
    if (!seleccion || seleccion.curso || !curso) return null
    try {
      const loc = localizar(curso.estructura || [], seleccion)
      return loc.tema || loc.modulo || loc.fase
    } catch {
      return null
    }
  }, [seleccion, curso])

  const accionNodo = async (accion, param) => {
    const ref = seleccion
    const tipo = tipoDeRef(ref)
    if (!ref || !tipo || !curso) return
    if (accion === 'publicar') {
      await ejecutar('publicar-' + tipo, (e) => publicarNodo(e, ref, { cursoEstado: curso.estado }))
    } else if (accion === 'despublicar') {
      setDialogo({
        titulo: `Despublicar ${tipo}`,
        cuerpo: `Los alumnos dejarán de ver “${nodoSel?.titulo}” (y todo lo que contiene) hasta que lo publiques de nuevo.`,
        confirmar: 'Despublicar',
        accion: () => ejecutar('despublicar-' + tipo, (e) => despublicarNodo(e, ref)),
      })
    } else if (accion === 'archivar') {
      const activos = contarDescendientesActivos(curso.estructura || [], ref)
      setDialogo({
        titulo: `Archivar ${tipo}`,
        cuerpo: activos > 0
          ? `“${nodoSel?.titulo}” contiene ${activos} elemento${activos === 1 ? '' : 's'} activo${activos === 1 ? '' : 's'}. Al archivarlo, TODA la rama dejará de mostrarse a los alumnos (nada se elimina; puedes restaurarlo cuando quieras).`
          : `“${nodoSel?.titulo}” dejará de mostrarse a los alumnos. Nada se elimina; puedes restaurarlo cuando quieras.`,
        confirmar: 'Archivar',
        tono: 'peligro',
        accion: () => ejecutar('archivar-' + tipo, (e) => archivarNodo(e, ref)),
      })
    } else if (accion === 'restaurar') {
      await ejecutar('restaurar-' + tipo, (e) => restaurarNodo(e, ref))
    } else if (accion === 'duplicar') {
      const r = await ejecutar('duplicar-' + tipo, (e) => duplicarNodo(e, ref))
      if (r?.ref) setSeleccion(r.ref)
    } else if (accion === 'reordenar') {
      await ejecutar('reordenar-' + tipo, (e) => reordenarNodo(e, ref, param))
    } else if (accion === 'mover') {
      const [faseId, moduloId] = String(param).split('/')
      const destinoRef = tipo === 'modulo' ? { faseId } : { faseId, moduloId }
      setDialogo({
        titulo: `Mover ${tipo}`,
        cuerpo: `“${nodoSel?.titulo}” se moverá al final del destino seleccionado. El progreso de los alumnos no se pierde (los ids se conservan).`,
        confirmar: 'Mover',
        accion: async () => {
          const r = await ejecutar('mover-' + tipo, (e) => moverNodo(e, ref, destinoRef))
          if (r?.ref) setSeleccion(r.ref)
        },
      })
    }
  }

  const guardarCamposNodo = async (cambios, alTerminar) => {
    const ref = seleccion
    const tipo = tipoDeRef(ref)
    if (!ref || !curso) return
    let r
    if (tipo === 'tema') {
      const { resumen, ...deEstructura } = cambios
      const extras = {}
      const camposDoc = {}
      if ('titulo' in cambios) camposDoc.titulo = cambios.titulo
      if (resumen !== undefined) camposDoc.resumen = resumen
      if (Object.keys(camposDoc).length) extras.temaCampos = { temaId: ref.temaId, campos: camposDoc }
      r = await ejecutar('editar-tema', (e) => (
        Object.keys(deEstructura).length ? actualizarNodo(e, ref, deEstructura) : { estructura: e }
      ), extras)
      if (r) {
        setTemasCache((prev) => (prev[ref.temaId]
          ? { ...prev, [ref.temaId]: { ...prev[ref.temaId], ...camposDoc } }
          : prev))
      }
    } else {
      r = await ejecutar('editar-' + tipo, (e) => actualizarNodo(e, ref, cambios))
    }
    if (r) { marcarSucio('nodo')(false); alTerminar?.() }
  }

  // ---------- acciones sobre el curso ----------
  const accionCurso = async (accion) => {
    if (!curso || ocupado) return
    const cambiarEstado = async (estado, nombreAccion) => {
      setGuardado({ estado: 'guardando', mensaje: 'Guardando…' })
      try {
        const ed = await editorLib()
        const { version } = await ed.actualizarCursoEditor(
          contexto, destino, curso.id, curso.version ?? 0, { estado }, nombreAccion
        )
        actualizarCursoLocal(curso.id, { estado, version })
        setGuardado({ estado: 'ok', mensaje: 'Cambios guardados' })
      } catch (err) {
        if (err?.name === 'ConflictoVersion') await recargar()
        setGuardado({ estado: 'error', mensaje: err?.message })
      }
    }
    if (accion === 'publicar') {
      const e = validarTitulo(curso.titulo)
      if (e) { setGuardado({ estado: 'error', mensaje: `No se puede publicar: ${e}` }); return }
      await cambiarEstado('publicado', 'publicar-curso')
    } else if (accion === 'despublicar') {
      setDialogo({
        titulo: 'Despublicar curso',
        cuerpo: `Los alumnos dejarán de ver “${curso.titulo}” completo hasta que lo publiques de nuevo.`,
        confirmar: 'Despublicar',
        accion: () => cambiarEstado('borrador', 'despublicar-curso'),
      })
    } else if (accion === 'archivar') {
      setDialogo({
        titulo: 'Archivar curso',
        cuerpo: `“${curso.titulo}” dejará de mostrarse a los alumnos y quedará como archivado para tu equipo. Nada se elimina; puedes restaurarlo cuando quieras.`,
        confirmar: 'Archivar',
        tono: 'peligro',
        accion: () => cambiarEstado('archivado', 'archivar-curso'),
      })
    } else if (accion === 'restaurar') {
      await cambiarEstado('borrador', 'restaurar-curso')
    } else if (accion === 'duplicar') {
      setDialogo({
        titulo: 'Duplicar curso completo',
        cuerpo: `Se creará “Copia de ${curso.titulo}” con toda su estructura y temas, en borrador, dentro de esta misma academia. El progreso, los intentos y las calificaciones NO se copian.`,
        confirmar: 'Duplicar curso',
        accion: async () => {
          setGuardado({ estado: 'guardando', mensaje: 'Duplicando curso…' })
          try {
            const ed = await editorLib()
            const nuevo = await ed.duplicarCursoEditor(contexto, destino, curso)
            await recargar()
            setCursoSelId(nuevo.id)
            setGuardado({ estado: 'ok', mensaje: 'Curso duplicado' })
          } catch (err) {
            setGuardado({ estado: 'error', mensaje: err?.message })
          }
        },
      })
    }
  }

  const moverCurso = async (id, dir) => {
    if (!cursos || ocupado) return
    const orden = [...cursos]
    const i = orden.findIndex((c) => c.id === id)
    const j = i + (dir === 'arriba' ? -1 : 1)
    if (i < 0 || j < 0 || j >= orden.length) return
    ;[orden[i], orden[j]] = [orden[j], orden[i]]
    setGuardado({ estado: 'guardando', mensaje: 'Guardando…' })
    try {
      const ed = await editorLib()
      await ed.reordenarCursosEditor(contexto, destino, orden)
      await recargar()
      setGuardado({ estado: 'ok', mensaje: 'Orden guardado' })
    } catch (err) {
      setGuardado({ estado: 'error', mensaje: err?.message })
    }
  }

  // ---------- creación con título (fase, módulo, tema, curso) ----------
  const confirmarCrear = async () => {
    const c = crear
    if (!c) return
    const e = validarTitulo(c.titulo)
    if (e) { setCrear({ ...c, error: e }); return }
    setCrear(null)
    if (c.tipo === 'curso') {
      setGuardado({ estado: 'guardando', mensaje: 'Creando curso…' })
      try {
        const ed = await editorLib()
        const nuevo = await ed.crearCursoEditor(contexto, destino, { titulo: c.titulo })
        await recargar()
        setCursoSelId(nuevo.id)
        setSeleccion({ curso: true })
        setGuardado({ estado: 'ok', mensaje: 'Curso creado' })
      } catch (err) {
        setGuardado({ estado: 'error', mensaje: err?.message })
      }
      return
    }
    const transformaciones = {
      fase: (est) => crearFase(est, { titulo: c.titulo }),
      modulo: (est) => crearModulo(est, { faseId: c.faseId, titulo: c.titulo }),
      tema: (est) => crearTema(est, { faseId: c.faseId, moduloId: c.moduloId, titulo: c.titulo }),
    }
    const r = await ejecutar(
      'crear-' + c.tipo,
      transformaciones[c.tipo],
      // El doc del tema nuevo se crea en la MISMA transacción que la estructura.
      c.tipo === 'tema'
        ? (res) => ({ temasNuevos: [{ temaId: res.nodo.id, titulo: res.nodo.titulo }] })
        : {}
    )
    if (r?.ref) setSeleccion(r.ref)
  }

  // ---------- contenido enriquecido del tema (Fase 4) ----------
  const guardarContenidoDelTema = async (contenido) => {
    if (!curso || !seleccion?.temaId || !temaSel || ocupado) return false
    setGuardado({ estado: 'guardando', mensaje: 'Guardando contenido…' })
    try {
      const ed = await editorLib()
      const { version } = await ed.guardarContenidoTema(
        contexto, destino, curso.id, seleccion.temaId, temaSel.version ?? 0, contenido
      )
      setTemasCache((prev) => ({
        ...prev,
        [seleccion.temaId]: { ...prev[seleccion.temaId], ...contenido, version },
      }))
      setGuardado({ estado: 'ok', mensaje: 'Contenido guardado' })
      return true
    } catch (err) {
      if (err?.name === 'ConflictoVersion') {
        // Recarga el doc del tema para mostrar la versión más reciente.
        setTemasCache((prev) => {
          const n = { ...prev }
          delete n[seleccion.temaId]
          return n
        })
      }
      setGuardado({
        estado: 'error',
        mensaje: err?.message || 'No se pudo guardar el contenido. Revisa tu conexión e inténtalo de nuevo.',
      })
      return false
    }
  }

  // ---------- vista previa ----------
  const abrirPrevia = async () => {
    if (!curso) return
    try {
      const ed = await editorLib()
      const temasDocs = await ed.temasDeCursoEditor(destino, curso.id)
      setPrevia({ temasDocs })
    } catch (err) {
      setGuardado({ estado: 'error', mensaje: err?.message })
    }
  }

  // ---------- pantallas de acceso ----------
  if (cargando) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando…</span>
      </div>
    )
  }
  if (destino.modo === 'academia' && esSuperadmin && !params.academiaId) {
    return (
      <Bloqueo icono="temario" titulo="Elige una academia">
        <p>Como administrador de la plataforma, abre el editor desde la ficha de una academia en el dashboard.</p>
        <Link to="/admin" className="btn-pildora">Ir al dashboard</Link>
      </Bloqueo>
    )
  }
  if (!permiso.permitido) {
    return (
      <Bloqueo titulo="Editor de contenido no disponible">
        <p>{permiso.motivo}</p>
      </Bloqueo>
    )
  }
  if (destino.modo === 'academia' && cursos !== null && academiaObjetivo && !academiaMigrada(academiaObjetivo)) {
    return (
      <Bloqueo icono="alerta" titulo="Esta academia todavía usa el contenido estándar">
        <p>
          El temario de {academiaObjetivo?.nombre || 'esta academia'} aún no tiene una copia propia
          editable: usa el contenido estándar de la plataforma, que no se puede modificar desde aquí.
        </p>
        <p>
          {esSuperadmin
            ? 'Clona una plantilla a esta academia (migración de contenido) y vuelve para editar su copia.'
            : 'Pide al administrador de la plataforma que active la copia editable de tu academia. Mientras tanto, tus alumnos siguen viendo el temario normal.'}
        </p>
      </Bloqueo>
    )
  }

  const nombreDestino = destino.modo === 'plantilla'
    ? `Plantilla global: ${curso?.titulo || destino.plantillaId}`
    : academiaObjetivo?.nombre || destino.academiaId

  // ---------- render ----------
  return (
    <div className="editor-page">
      <header className="editor-cabecera">
        <div>
          <h1><Icon name="herramientas" size={22} /> Editor de contenido</h1>
          <p className={`editor-banda ${destino.modo === 'plantilla' ? 'editor-banda--plantilla' : ''}`}>
            {destino.modo === 'plantilla'
              ? <><Icon name="alerta" size={14} /> Estás editando la PLANTILLA GLOBAL (afecta futuras clonaciones, no a las academias ya clonadas)</>
              : <>Editando la copia propia de <strong>{nombreDestino}</strong> — tus cambios no afectan a otras academias ni a la plantilla.</>}
          </p>
        </div>
        <div className="editor-cabecera-acciones">
          <p className={`editor-guardado editor-guardado--${guardado.estado}`} role="status" aria-live="polite">
            {guardado.estado === 'guardando' && <><span className="ruta-spinner ruta-spinner--mini" aria-hidden="true" /> {guardado.mensaje}</>}
            {guardado.estado === 'ok' && <><Icon name="check" size={14} /> {guardado.mensaje}</>}
            {guardado.estado === 'error' && <><Icon name="alerta" size={14} /> {guardado.mensaje}</>}
          </p>
          {curso && (
            <button type="button" className="btn-pildora" onClick={abrirPrevia} disabled={ocupado}>
              <Icon name="ojo" size={16} /> Vista previa
            </button>
          )}
        </div>
      </header>

      {errorCarga && <p className="editor-error" role="alert">{errorCarga}</p>}

      {cursos === null ? (
        <div className="ruta-cargando" role="status">
          <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando cursos…</span>
        </div>
      ) : (
        <div className="editor-cuerpo">
          {/* -------- columna izquierda: cursos + árbol -------- */}
          <div className="editor-lateral">
            <section aria-label="Cursos de la academia">
              <div className="editor-lateral-cabecera">
                <h2>Cursos</h2>
                {destino.modo === 'academia' && (esSuperadmin || rol === 'admin_escuela') && (
                  <button
                    type="button"
                    className="btn-pildora"
                    disabled={ocupado}
                    onClick={() => setCrear({ tipo: 'curso', titulo: '' })}
                  >
                    <Icon name="mas" size={14} /> Nuevo curso
                  </button>
                )}
              </div>
              {cursosVisibles?.length === 0 && (
                <p className="editor-vacio">
                  {rol === 'instructor'
                    ? 'No tienes cursos asignados para editar. Pide acceso al director de tu academia.'
                    : 'Esta academia todavía no tiene cursos. Crea el primero para armar tu temario.'}
                </p>
              )}
              <ul className="editor-cursos">
                {cursosVisibles?.map((c, i) => (
                  <li key={c.id} className={c.id === cursoSelId ? 'editor-curso--activo' : ''}>
                    <button
                      type="button"
                      className="editor-nombre"
                      aria-current={c.id === cursoSelId ? 'true' : undefined}
                      onClick={() => confirmarSiSucio(() => { setCursoSelId(c.id); setSeleccion({ curso: true }) })}
                    >
                      <Icon name="libro" size={16} /> <span>{c.titulo}</span>
                    </button>
                    <ChipEstado estado={c.estado || 'publicado'} />
                    {cursosVisibles.length > 1 && destino.modo === 'academia' && (
                      <span className="editor-curso-orden">
                        <button
                          type="button" className="editor-expandir" disabled={ocupado || i === 0}
                          aria-label={`Subir el curso ${c.titulo} en el orden`}
                          onClick={() => moverCurso(c.id, 'arriba')}
                        >
                          <Icon name="chevronArriba" size={14} />
                        </button>
                        <button
                          type="button" className="editor-expandir" disabled={ocupado || i === cursosVisibles.length - 1}
                          aria-label={`Bajar el curso ${c.titulo} en el orden`}
                          onClick={() => moverCurso(c.id, 'abajo')}
                        >
                          <Icon name="chevronAbajo" size={14} />
                        </button>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {curso && (
              <ArbolCurso
                estructura={curso.estructura || []}
                seleccion={seleccion?.curso ? null : seleccion}
                onSeleccionar={seleccionar}
                onCrearHijo={(datos) => setCrear({ ...datos, titulo: '' })}
              />
            )}
          </div>

          {/* -------- columna derecha: panel de edición -------- */}
          <div className="editor-principal">
            {!curso && (
              <p className="editor-vacio">
                Elige un curso (o crea uno) para ver y editar su estructura.
              </p>
            )}
            {curso && seleccion?.curso && (
              <PanelNodo
                tipo="curso"
                nodo={curso}
                meta={curso}
                posicion={`${(cursosVisibles || []).findIndex((c) => c.id === curso.id) + 1} de ${(cursosVisibles || []).length}`}
                padre={nombreDestino}
                ocupado={ocupado}
                puedeReordenar={false}
                onGuardarCampos={async (cambios, alTerminar) => {
                  setGuardado({ estado: 'guardando', mensaje: 'Guardando…' })
                  try {
                    const ed = await editorLib()
                    const { version } = await ed.actualizarCursoEditor(
                      contexto, destino, curso.id, curso.version ?? 0, cambios
                    )
                    actualizarCursoLocal(curso.id, { ...cambios, version })
                    marcarSucio('nodo')(false)
                    alTerminar?.()
                    setGuardado({ estado: 'ok', mensaje: 'Cambios guardados' })
                  } catch (err) {
                    if (err?.name === 'ConflictoVersion') await recargar()
                    setGuardado({ estado: 'error', mensaje: err?.message })
                  }
                }}
                onAccion={accionCurso}
                onDirty={marcarSucio('nodo')}
              />
            )}
            {curso && seleccion && !seleccion.curso && nodoSel && (
              <>
                <PanelNodo
                  tipo={tipoDeRef(seleccion)}
                  nodo={nodoSel}
                  meta={tipoDeRef(seleccion) === 'tema' ? (temaSel || curso) : curso}
                  temaDoc={temaSel}
                  cargandoTema={cargandoTema}
                  posicion={posicionDe(curso.estructura, seleccion)}
                  padre={padreDe(curso.estructura, seleccion, curso.titulo)}
                  destinosMover={destinosMoverDe(curso.estructura, seleccion)}
                  ocupado={ocupado}
                  onGuardarCampos={guardarCamposNodo}
                  onAccion={accionNodo}
                  onDirty={marcarSucio('nodo')}
                />
                {/* Contenido enriquecido del tema (Fase 4): bloques, quiz con
                    ponderaciones, recursos con archivos y actividades. */}
                {seleccion.temaId && (
                  temaSel ? (
                    <PanelContenidoTema
                      temaDoc={temaSel}
                      academiaId={destino.modo === 'academia' ? destino.academiaId : null}
                      modoPlantilla={destino.modo === 'plantilla'}
                      ocupado={ocupado}
                      onGuardar={guardarContenidoDelTema}
                      onDirty={marcarSucio('contenido')}
                    />
                  ) : cargandoTema ? (
                    <p className="editor-nota" role="status">Cargando el contenido del tema…</p>
                  ) : null
                )}
              </>
            )}
            {curso && !seleccion && (
              <p className="editor-vacio">
                Selecciona un elemento del árbol para editarlo, o el curso para
                cambiar su título, publicarlo o duplicarlo.
              </p>
            )}
          </div>
        </div>
      )}

      {/* -------- diálogos -------- */}
      <DialogoConfirmar
        abierto={!!dialogo}
        titulo={dialogo?.titulo}
        confirmar={dialogo?.confirmar}
        tono={dialogo?.tono}
        onConfirmar={() => { const a = dialogo?.accion; setDialogo(null); a?.() }}
        onCancelar={() => setDialogo(null)}
      >
        <p>{dialogo?.cuerpo}</p>
      </DialogoConfirmar>

      {crear && (
        <div className="dialogo-fondo" onMouseDown={(e) => { if (e.target === e.currentTarget) setCrear(null) }}>
          <div className="dialogo" role="dialog" aria-modal="true" aria-labelledby="crear-titulo">
            <h2 id="crear-titulo">
              {crear.tipo === 'curso' ? 'Nuevo curso'
                : crear.tipo === 'fase' ? 'Nueva fase'
                : crear.tipo === 'modulo' ? 'Nuevo módulo'
                : 'Nuevo tema'}
            </h2>
            <form
              className="dialogo-cuerpo"
              onSubmit={(e) => { e.preventDefault(); confirmarCrear() }}
            >
              <div className="editor-campo">
                <label htmlFor="crear-input">Título</label>
                <input
                  id="crear-input"
                  type="text"
                  autoFocus
                  value={crear.titulo}
                  aria-invalid={crear.error ? 'true' : undefined}
                  aria-describedby={crear.error ? 'crear-error' : undefined}
                  onChange={(e) => setCrear({ ...crear, titulo: e.target.value, error: null })}
                  onKeyDown={(e) => { if (e.key === 'Escape') setCrear(null) }}
                />
                {crear.error && <p className="editor-error" id="crear-error">{crear.error}</p>}
              </div>
              <div className="dialogo-acciones">
                <button type="button" className="btn-pildora" onClick={() => setCrear(null)}>Cancelar</button>
                <button type="submit" className="btn-pildora btn-pildora--solido">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <VistaPrevia
        abierto={!!previa}
        curso={curso}
        temasDocs={previa?.temasDocs || []}
        onCerrar={() => setPrevia(null)}
      />
    </div>
  )
}

// ---------- derivados de presentación (puros, sin estado) ----------

function posicionDe(estructura, ref) {
  try {
    const loc = localizar(estructura || [], ref)
    if (loc.tipo === 'fase') return `${loc.iFase + 1} de ${estructura.length}`
    if (loc.tipo === 'modulo') return `${loc.iModulo + 1} de ${loc.fase.modulos.length}`
    return `${loc.iTema + 1} de ${loc.modulo.temas.length}`
  } catch {
    return null
  }
}

function padreDe(estructura, ref, tituloCurso) {
  try {
    const loc = localizar(estructura || [], ref)
    if (loc.tipo === 'fase') return `Curso “${tituloCurso}”`
    if (loc.tipo === 'modulo') return `Fase “${loc.fase.titulo}”`
    return `Módulo “${loc.modulo.titulo}” · Fase “${loc.fase.titulo}”`
  } catch {
    return null
  }
}

function destinosMoverDe(estructura, ref) {
  const tipo = tipoDeRef(ref)
  if (tipo === 'modulo') {
    return (estructura || [])
      .filter((f) => f.id !== ref.faseId && f.estado !== 'archivado')
      .map((f) => ({ valor: f.id, etiqueta: `Fase “${f.titulo}”` }))
  }
  if (tipo === 'tema') {
    const opciones = []
    for (const f of estructura || []) {
      if (f.estado === 'archivado') continue
      for (const m of f.modulos || []) {
        if (m.estado === 'archivado') continue
        if (f.id === ref.faseId && m.id === ref.moduloId) continue
        opciones.push({ valor: `${f.id}/${m.id}`, etiqueta: `“${m.titulo}” (fase “${f.titulo}”)` })
      }
    }
    return opciones
  }
  return []
}
