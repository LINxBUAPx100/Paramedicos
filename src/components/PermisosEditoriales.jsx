import { useEffect, useMemo, useState } from 'react'
import Icon from './Icon.jsx'
import {
  PERMISOS_EDITOR, ETIQUETA_PERMISO, DESCRIPCION_PERMISO, normalizarPermisos,
} from '../lib/permisosEditor.js'

// ============================================================
//  Permisos editoriales de profesores (Fase 6) — panel del director PRO
// ------------------------------------------------------------
//  El director concede/retira, por profesor de SU academia, qué puede editar y
//  en qué cursos. La barrera REAL son firestore.rules; aquí solo se ofrece la
//  matriz y se llama a asignarPermisosEditor (que valida y audita). El super
//  puede usarlo desde el dashboard de una academia; un profesor jamás.
// ============================================================
export default function PermisosEditoriales({ academiaId, instructores = [], onCambio }) {
  const [cursos, setCursos] = useState(null) // [{id,titulo,estado}] | null cargando
  const [errorCursos, setErrorCursos] = useState('')

  useEffect(() => {
    if (!academiaId) return
    let activo = true
    ;(async () => {
      try {
        const { cursosDeAcademia } = await import('../lib/firebase/contenido.js')
        const lista = await cursosDeAcademia(academiaId, { soloPublicados: false })
        if (activo) setCursos(lista.map((c) => ({ id: c.id, titulo: c.titulo || c.id, estado: c.estado })))
      } catch {
        if (activo) { setCursos([]); setErrorCursos('No se pudieron cargar los cursos de la academia.') }
      }
    })()
    return () => { activo = false }
  }, [academiaId])

  return (
    <section className="panel-permisos">
      <h2><Icon name="candado" size={20} /> Permisos de edición de profesores</h2>
      <p className="panel-gestion-sub">
        Concede solo lo necesario a cada profesor: qué puede editar y en qué
        cursos. Sin permisos, un profesor únicamente ve el avance de sus alumnos.
        Cada cambio queda registrado.
      </p>
      {errorCursos && <p className="cuenta-error" role="alert">{errorCursos}</p>}
      {cursos && cursos.length === 0 && !errorCursos && (
        <p className="panel-vacio">
          Esta academia aún no tiene cursos editables: los permisos de edición
          solo surten efecto sobre cursos existentes.
        </p>
      )}
      {instructores.length === 0 ? (
        <p className="panel-vacio">
          Todavía no hay profesores. Nombra a uno en “Miembros y roles” para
          poder concederle permisos.
        </p>
      ) : (
        <ul className="pe-permisos-lista">
          {instructores.map((p) => (
            <FilaProfesor
              key={p.id}
              profesor={p}
              cursos={cursos || []}
              onCambio={onCambio}
            />
          ))}
        </ul>
      )}

      <HistorialDePermisos academiaId={academiaId} />
    </section>
  )
}

// El texto de arriba promete que "cada cambio queda registrado" — y era verdad:
// asignarPermisosEditor escribe en `historial` desde el primer día. Lo que
// faltaba era ENSEÑARLO. `historialPermisos` llevaba ahí, exportada y sin que
// nadie la llamara: una auditoría que nadie podía consultar no es una auditoría.
function HistorialDePermisos({ academiaId }) {
  const [entradas, setEntradas] = useState(null) // null = sin cargar
  const [cargando, setCargando] = useState(false)

  const cargar = async () => {
    setCargando(true)
    try {
      const { historialPermisos } = await import('../lib/firebase/usuarios.js')
      setEntradas(await historialPermisos(academiaId))
    } catch {
      setEntradas([])
    } finally {
      setCargando(false)
    }
  }

  const fecha = (h) => (h.fecha?.seconds ? new Date(h.fecha.seconds * 1000).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }) : '')
  const claves = (m) => Object.entries(m || {}).filter(([k, v]) => v === true && k !== 'cursosPermitidos').map(([k]) => k)

  return (
    <details className="pe-historial" onToggle={(e) => { if (e.target.open && entradas === null) cargar() }}>
      <summary>
        <Icon name="reloj" size={15} /> Historial de cambios de permisos
      </summary>
      {cargando && <p className="panel-vacio">Cargando…</p>}
      {entradas !== null && entradas.length === 0 && !cargando && (
        <p className="panel-vacio">Todavía no se ha concedido ni retirado ningún permiso.</p>
      )}
      {entradas !== null && entradas.length > 0 && (
        <ul className="pe-historial-lista">
          {entradas.map((h) => {
            const antes = claves(h.antes)
            const despues = claves(h.despues)
            const nuevos = despues.filter((k) => !antes.includes(k))
            const quitados = antes.filter((k) => !despues.includes(k))
            return (
              <li key={h.id}>
                <span className="peh-fecha">{fecha(h)}</span>
                <span className={`peh-accion peh-accion--${h.accion === 'asignar-permisos' ? 'dar' : 'quitar'}`}>
                  {h.accion === 'asignar-permisos' ? 'Concedió' : 'Revocó'}
                </span>
                <span className="peh-detalle">
                  {nuevos.length > 0 && <>+{nuevos.join(', ')} </>}
                  {quitados.length > 0 && <>−{quitados.join(', ')}</>}
                  {nuevos.length === 0 && quitados.length === 0 && 'ajuste de cursos'}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </details>
  )
}

function FilaProfesor({ profesor, cursos, onCambio }) {
  const inicial = useMemo(() => normalizarPermisos(profesor.permisosEditor), [profesor.permisosEditor])
  const [borrador, setBorrador] = useState(inicial)
  const [estado, setEstado] = useState('idle') // idle | guardando | ok | error
  const [error, setError] = useState('')

  // Perfil recargado desde fuera → resincroniza el borrador local.
  useEffect(() => { setBorrador(inicial); setEstado('idle'); setError('') }, [inicial])

  const setBool = (clave, val) => setBorrador((b) => {
    const n = { ...b, [clave]: val }
    // Sin "editarContenido" nada más tiene efecto: al apagarlo se limpia todo.
    if (clave === 'editarContenido' && !val) {
      for (const k of PERMISOS_EDITOR) if (k !== 'editarContenido') n[k] = false
      n.cursosPermitidos = []
    }
    return n
  })

  const toggleCurso = (id) => setBorrador((b) => {
    const set = new Set(b.cursosPermitidos)
    if (set.has(id)) set.delete(id)
    else set.add(id)
    return { ...b, cursosPermitidos: [...set] }
  })

  const norm = normalizarPermisos(borrador)
  const cambiado = JSON.stringify(norm) !== JSON.stringify(inicial)
  const concedidos = PERMISOS_EDITOR.filter((k) => inicial[k]).length

  const guardar = async () => {
    setEstado('guardando')
    setError('')
    try {
      const { asignarPermisosEditor } = await import('../lib/firebase/usuarios.js')
      await asignarPermisosEditor(profesor.id, borrador, { cursosDisponibles: cursos.map((c) => c.id) })
      setEstado('ok')
      onCambio?.()
    } catch (err) {
      setEstado('error')
      setError(
        String(err?.code || '').includes('permission-denied')
          ? 'Sin permisos: tu plan debe incluir permisos editoriales y las reglas de Firestore deben estar publicadas.'
          : err?.message || 'No se pudieron guardar los permisos.'
      )
    }
  }

  const revocarTodo = () => setBorrador(normalizarPermisos({}))

  return (
    <li className="pe-profesor">
      <details>
        <summary>
          <strong>{profesor.nombre || profesor.email || profesor.id}</strong>
          <span className="pe-badge">
            {concedidos === 0 ? 'sin permisos' : `${concedidos} permiso${concedidos !== 1 ? 's' : ''}`}
          </span>
        </summary>
        <div className="pe-permisos-cuerpo">
          <fieldset className="pe-checks">
            <legend>Puede</legend>
            {PERMISOS_EDITOR.map((k) => {
              const bloqueado = k !== 'editarContenido' && !borrador.editarContenido
              return (
                <label key={k} className={`pe-check ${bloqueado ? 'pe-check--off' : ''}`}>
                  <input
                    type="checkbox"
                    checked={borrador[k]}
                    disabled={bloqueado}
                    onChange={(e) => setBool(k, e.target.checked)}
                  />
                  <span>
                    <strong>{ETIQUETA_PERMISO[k]}</strong>
                    <small>{DESCRIPCION_PERMISO[k]}</small>
                  </span>
                </label>
              )
            })}
          </fieldset>

          <fieldset className="pe-checks">
            <legend>Cursos permitidos</legend>
            {cursos.length === 0 ? (
              <p className="editor-nota">No hay cursos que asignar todavía.</p>
            ) : (
              cursos.map((c) => (
                <label key={c.id} className={`pe-check ${!borrador.editarContenido ? 'pe-check--off' : ''}`}>
                  <input
                    type="checkbox"
                    checked={borrador.cursosPermitidos.includes(c.id)}
                    disabled={!borrador.editarContenido}
                    onChange={() => toggleCurso(c.id)}
                  />
                  <span>
                    {c.titulo}
                    {c.estado && c.estado !== 'publicado' && <small> ({c.estado})</small>}
                  </span>
                </label>
              ))
            )}
          </fieldset>

          {error && <p className="cuenta-error" role="alert">{error}</p>}

          <div className="pe-acciones">
            <button
              type="button"
              className="btn btn--primario"
              disabled={!cambiado || estado === 'guardando'}
              onClick={guardar}
            >
              {estado === 'guardando' ? 'Guardando…' : 'Guardar permisos'}
            </button>
            {concedidos > 0 && (
              <button type="button" className="btn btn--suave" disabled={estado === 'guardando'} onClick={revocarTodo}>
                Revocar todo
              </button>
            )}
            {estado === 'ok' && <span className="cuenta-ok" role="status">Permisos actualizados.</span>}
          </div>
        </div>
      </details>
    </li>
  )
}
