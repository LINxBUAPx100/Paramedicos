import { useEffect, useMemo, useState } from 'react'
import { useAdmin } from '../../components/admin/AdminShell.jsx'
import {
  leerAccion, familiaDe, filtrarHistorial, camposCambiados, contarPorFamilia, FAMILIAS,
} from '../../lib/historialModelo.js'
import Icon from '../../components/Icon.jsx'

// ============================================================
//  Registro de actividad de la plataforma (super-admin)
// ------------------------------------------------------------
//  La colección `historial` se venía escribiendo desde media aplicación y no
//  había NINGUNA pantalla que la leyera. Un registro que nadie mira no sirve, y
//  encima da la falsa sensación de que hay rastro de lo que pasa.
//
//  Aquí está: quién hizo qué, sobre qué documento, cuándo, y —cuando la entrada
//  guardó `antes`/`despues`— exactamente qué campos cambiaron.
//
//  Todo el filtrado y la lectura de acciones vive en lib/historialModelo.js,
//  que es puro y está probado.
// ============================================================

const fmt = (ts) => {
  const s = ts?.seconds
  if (!s) return '—'
  return new Date(s * 1000).toLocaleString('es-MX', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export default function AdminLogs() {
  const { academias, usuarios } = useAdmin()
  const [entradas, setEntradas] = useState(null)
  const [error, setError] = useState('')
  const [filtros, setFiltros] = useState({ academiaId: '', familia: '', busca: '' })
  const [abierta, setAbierta] = useState(null)

  useEffect(() => {
    let vivo = true
    ;(async () => {
      try {
        const { listarHistorial } = await import('../../lib/firebase/historial.js')
        const lista = await listarHistorial({ limite: 300 })
        if (vivo) setEntradas(lista)
      } catch (err) {
        if (!vivo) return
        setEntradas([])
        setError(
          String(err?.code || '').includes('permission-denied')
            ? 'Sin permisos para leer el historial. Publica las reglas actualizadas.'
            : 'No se pudo cargar el registro de actividad.'
        )
      }
    })()
    return () => { vivo = false }
  }, [])

  // Nombre legible en vez de un uid crudo: un registro que solo enseña
  // identificadores obliga a buscar cada uno a mano para entender nada.
  const nombreDe = useMemo(() => {
    const map = {}
    for (const u of usuarios || []) map[u.id] = u.nombre || u.email || u.id
    return (uid) => map[uid] || uid || '—'
  }, [usuarios])

  const visibles = useMemo(() => filtrarHistorial(entradas, filtros), [entradas, filtros])
  const cuenta = useMemo(() => contarPorFamilia(visibles), [visibles])

  if (entradas === null) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando el registro…</span>
      </div>
    )
  }

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Registro de actividad</h1>
        <p>
          Quién hizo qué en la plataforma. Se guardan las acciones que cambian datos: altas, bajas,
          permisos, borrados y cambios de contenido. Las {entradas.length} más recientes.
        </p>
      </header>

      {error && <p className="cuenta-error" role="alert">{error}</p>}

      <section className="cs-kpis" aria-label="Resumen del registro">
        <div className="cs-kpi"><b>{visibles.length}</b><span>entradas</span><small>con los filtros puestos</small></div>
        <div className="cs-kpi"><b>{cuenta.borrado}</b><span>borrados</span><small>lo irreversible</small></div>
        <div className="cs-kpi"><b>{cuenta.baja}</b><span>bajas y archivados</span><small>reversibles</small></div>
        <div className="cs-kpi"><b>{cuenta.alta}</b><span>altas y permisos</span><small>lo que se concedió</small></div>
      </section>

      <div className="logs-filtros">
        <label className="panel-selector">
          Academia
          <select
            value={filtros.academiaId}
            onChange={(e) => setFiltros({ ...filtros, academiaId: e.target.value })}
          >
            <option value="">Todas</option>
            {academias.map((a) => (
              <option key={a.id} value={a.id}>{a.nombre || a.id}</option>
            ))}
          </select>
        </label>
        <label className="panel-selector">
          Tipo
          <select
            value={filtros.familia}
            onChange={(e) => setFiltros({ ...filtros, familia: e.target.value })}
          >
            {FAMILIAS.map((f) => <option key={f.id} value={f.id}>{f.etiqueta}</option>)}
          </select>
        </label>
        <label className="panel-selector">
          Buscar
          <input
            type="search"
            value={filtros.busca}
            placeholder="acción, colección, id…"
            onChange={(e) => setFiltros({ ...filtros, busca: e.target.value })}
          />
        </label>
      </div>

      {visibles.length === 0 ? (
        <p className="panel-vacio">
          {entradas.length === 0
            ? 'Todavía no hay actividad registrada.'
            : 'Ninguna entrada coincide con los filtros.'}
        </p>
      ) : (
        <div className="panel-tabla-wrap">
          <table className="panel-tabla logs-tabla">
            <thead>
              <tr>
                <th scope="col">Cuándo</th>
                <th scope="col">Quién</th>
                <th scope="col">Qué hizo</th>
                <th scope="col">Sobre</th>
                <th scope="col">Academia</th>
              </tr>
            </thead>
            <tbody>
              {visibles.map((e) => {
                const accion = leerAccion(e.accion)
                const cambios = camposCambiados(e.antes, e.despues)
                const abierto = abierta === e.id
                return (
                  <tr key={e.id} className={`logs-fila logs-fila--${familiaDe(e.accion)}`}>
                    <td className="logs-fecha">{fmt(e.fecha)}</td>
                    <td>{nombreDe(e.usuario)}</td>
                    <td>
                      <span className={`logs-accion logs-accion--${accion.tono}`}>{accion.texto}</span>
                      {cambios.length > 0 && (
                        <>
                          {' '}
                          <button
                            type="button"
                            className="btn btn--sm btn--fantasma"
                            aria-expanded={abierto}
                            onClick={() => setAbierta(abierto ? null : e.id)}
                          >
                            {abierto ? 'Ocultar' : `Ver ${cambios.length} cambio(s)`}
                          </button>
                          {abierto && (
                            <ul className="logs-cambios">
                              {cambios.map((c) => (
                                <li key={c.clave}>
                                  <strong>{c.clave}</strong>:{' '}
                                  <span className="logs-antes">{JSON.stringify(c.antes) ?? '—'}</span>
                                  {' → '}
                                  <span className="logs-despues">{JSON.stringify(c.despues) ?? '—'}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </>
                      )}
                    </td>
                    <td className="logs-doc">
                      {e.coleccion}
                      {e.docId ? <small> · {e.docId}</small> : null}
                    </td>
                    <td>{e.academiaId || '—'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="panel-nota">
        <Icon name="alerta" size={14} /> El registro es <strong>solo de escritura</strong>: nadie
        puede editar una entrada, ni desde aquí ni desde la aplicación. Es lo que lo hace fiable.
      </p>
    </div>
  )
}
