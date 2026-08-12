import { useState } from 'react'
import Icon from '../Icon.jsx'

// ============================================================
//  Solicitudes de DENTRO de la academia (siguiente módulo / ver códigos)
// ------------------------------------------------------------
//  Ya no lee Firestore: las solicitudes llegan cargadas por el armazón, y
//  resolver una pide una recarga. Antes esta sección hacía su propia consulta,
//  así que el panel leía la misma colección dos veces.
// ============================================================

export default function SolicitudesInternas({
  solicitudes, gestion, miUid, soloGrupo, nombreGrupo, errorCarga = '', onCambio,
}) {
  const [ocupado, setOcupado] = useState(null) // id en proceso | 'todas'
  const [error, setError] = useState('')

  const pendientes = solicitudes.filter((s) => s.estado === 'pendiente')
  // Un profesor fijado a su grupo atiende solo las de su grupo; las de
  // CÓDIGOS solo las ve quien puede aprobarlas (director / super-admin).
  const visibles = pendientes.filter((s) =>
    s.tipo === 'codigos' ? Boolean(gestion) : soloGrupo ? s.grupoId === soloGrupo : true
  )

  const resolver = async (s, aprobar) => {
    setOcupado(s.id)
    setError('')
    try {
      const mod = await import('../../lib/firebase/solicitudes.js')
      if (!aprobar) await mod.rechazarSolicitud(s.id, miUid)
      else if (s.tipo === 'codigos') await mod.aprobarSolicitudCodigos(s, miUid)
      else await mod.aprobarSolicitudModulo(s, miUid)
      onCambio()
    } catch {
      setError('No se pudo resolver la solicitud (revisa permisos o conexión).')
    } finally {
      setOcupado(null)
    }
  }

  const aceptarTodas = async () => {
    setOcupado('todas')
    setError('')
    try {
      const mod = await import('../../lib/firebase/solicitudes.js')
      for (const s of visibles) {
        if (s.tipo === 'codigos') await mod.aprobarSolicitudCodigos(s, miUid)
        else await mod.aprobarSolicitudModulo(s, miUid)
      }
    } catch {
      setError('No se pudieron aceptar todas (revisa permisos o conexión).')
    } finally {
      onCambio()
      setOcupado(null)
    }
  }

  const fechaTxt = (f) =>
    f?.seconds
      ? new Date(f.seconds * 1000).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })
      : ''

  return (
    <section className="panel-solicitudes">
      <h2>
        <Icon name="check" size={20} /> Solicitudes pendientes
        {visibles.length > 0 && <span className="ps-badge">{visibles.length}</span>}
      </h2>
      <p className="panel-gestion-sub">
        Cuando un alumno termina un módulo puede pedir acceso al siguiente. Acéptalas una por
        una o todas juntas.{gestion ? ' Aquí también verás a los profesores que piden ver los códigos.' : ''}
      </p>
      {(error || errorCarga) && <p className="cuenta-error" role="alert">{error || errorCarga}</p>}

      {visibles.length === 0 ? (
        <p className="panel-vacio">No hay solicitudes pendientes.</p>
      ) : (
        <>
          <ul className="ps-lista">
            {visibles.map((s) => (
              <li key={s.id} className="ps-item">
                <div className="ps-info">
                  <strong>{s.nombre || '—'}</strong>
                  {s.tipo === 'codigos' ? (
                    <span className="ps-detalle">pide <b>ver los códigos</b> de academia y grupos</span>
                  ) : (
                    <span className="ps-detalle">pide la <b>Fase {s.faseNumero} · {s.faseTitulo}</b></span>
                  )}
                  {s.grupoId && !soloGrupo && (
                    <span className="panel-tag-grupo">{nombreGrupo(s.grupoId)}</span>
                  )}
                  <small className="ps-fecha">{fechaTxt(s.fecha)}</small>
                </div>
                <span className="ps-acciones">
                  <button
                    className="ps-aceptar"
                    disabled={Boolean(ocupado)}
                    onClick={() => resolver(s, true)}
                  >
                    {ocupado === s.id ? '…' : 'Aceptar'}
                  </button>
                  <button
                    className="ps-rechazar"
                    disabled={Boolean(ocupado)}
                    onClick={() => resolver(s, false)}
                  >
                    Rechazar
                  </button>
                </span>
              </li>
            ))}
          </ul>
          {visibles.length > 1 && (
            <button className="btn btn--primario ps-todas" disabled={Boolean(ocupado)} onClick={aceptarTodas}>
              {ocupado === 'todas' ? 'Aceptando…' : `Aceptar todas (${visibles.length})`}
            </button>
          )}
        </>
      )}
    </section>
  )
}
