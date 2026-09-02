import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { usePanel } from '../../components/panel/PanelShell.jsx'
import { registrar } from '../../lib/registro.js'
import { CursoConIndices, useCursosConSello } from '../../components/panel/IndicesDeCursos.jsx'
import Icon from '../../components/Icon.jsx'

// ============================================================
//  Panel del director · CONTENIDO (Bloque O)
// ------------------------------------------------------------
//  La entrada al editor era un botón en la cabecera del panel, sin nada que
//  dijera en qué estado está el contenido de la academia ni qué se ha tocado
//  últimamente. El historial ya se escribía desde la Fase 6: lo que faltaba
//  era enseñarlo (mismo caso que `historialPermisos` en el Bloque M).
// ============================================================

const ETIQUETA_ACCION = {
  'crear-nodo': 'creó',
  'editar-nodo': 'editó',
  'archivar-nodo': 'archivó',
  'restaurar-nodo': 'restauró',
  'mover-nodo': 'movió',
  'borrar-grupo': 'borró un grupo',
  'asignar-permisos': 'concedió permisos',
  'revocar-permisos': 'retiró permisos',
}

export default function PanelContenido() {
  const { academiaId, academia, miembros } = usePanel()
  // La lista de cursos y el estado de sus índices son los mismos que ve el
  // super-admin en /admin/academia/:id: viven en un componente compartido para
  // que no puedan volver a divergir (ver IndicesDeCursos.jsx).
  const { cursos, sellos } = useCursosConSello(academiaId)
  const [historial, setHistorial] = useState(null) // null = cargando; [] = vacío
  const [sinHistorial, setSinHistorial] = useState(false)

  useEffect(() => {
    if (!academiaId) return undefined
    let vivo = true
    ;(async () => {
      const api = await import('../../lib/firebase/contenido.js')
      try {
        const h = await api.historialDeAcademia(academiaId)
        if (vivo) setHistorial(h)
      } catch (err) {
        registrar('panel:historial', err)
        // El historial solo lo lee el DIRECTOR (lo impone la regla). Un profesor
        // con permisos de edición llega aquí y no debe ver un error rojo.
        if (vivo) { setHistorial([]); setSinHistorial(true) }
      }
    })()
    return () => { vivo = false }
  }, [academiaId])

  const nombreDe = (uid) => {
    const m = miembros.find((x) => x.id === uid)
    return m?.nombre || m?.email || uid || 'alguien'
  }
  const fechaTxt = (f) =>
    f?.seconds ? new Date(f.seconds * 1000).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }) : '—'

  const estadoContenido = academia?.contenido?.estado || 'bundle'

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Contenido</h1>
        <p>El temario de tu academia: en qué estado está, quién lo edita y qué se ha tocado.</p>
      </header>

      <section className="panel-contenido-estado">
        <h2><Icon name="capas" size={20} /> Estado del temario</h2>
        <p className="panel-gestion-sub">
          {estadoContenido === 'migrado'
            ? 'Tu academia tiene su PROPIA copia del temario: lo que edites aquí solo lo ven tus alumnos.'
            : estadoContenido === 'migrando'
              ? 'Se está copiando el temario a tu academia. Espera a que termine antes de editar.'
              : estadoContenido === 'error'
                ? 'La copia del temario quedó a medias. Avisa al administrador de la plataforma.'
                : 'Tu academia usa el temario general de la plataforma. Para tener el tuyo propio, pídeselo al administrador.'}
        </p>

        <Link to="/editor" className="btn btn--pildora">
          <Icon name="herramientas" size={16} /> Abrir el editor de contenido
        </Link>

        {cursos === null ? null : cursos.length === 0 ? (
          <p className="panel-vacio">Aún no hay cursos propios en esta academia.</p>
        ) : (
          <ul className="pc-lista">
            {cursos.map((c) => (
              <CursoConIndices key={c.id} curso={c} academiaId={academiaId} sello={sellos[c.id]} />
            ))}
          </ul>
        )}
      </section>

      <section className="panel-historial">
        <h2><Icon name="reloj" size={20} /> Últimos cambios</h2>
        {sinHistorial ? (
          <p className="panel-gestion-sub">El historial de cambios lo consulta el director de la academia.</p>
        ) : historial === null ? (
          <p className="panel-gestion-sub">Cargando el historial…</p>
        ) : historial.length === 0 ? (
          <p className="panel-vacio">Todavía no se ha registrado ningún cambio.</p>
        ) : (
          <ul className="pe-historial-lista">
            {historial.map((h) => (
              <li key={h.id}>
                <strong>{nombreDe(h.usuario)}</strong>{' '}
                {ETIQUETA_ACCION[h.accion] || h.accion}{' '}
                <span className="peh-detalle">{h.coleccion}/{h.docId}</span>
                <small> · {fechaTxt(h.fecha)}</small>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
