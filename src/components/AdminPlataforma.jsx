import { useEffect, useState } from 'react'
import {
  PLANES, TIPOS, ETIQUETA_PLAN, ETIQUETA_TIPO, planEfectivo, validarPlanTipo,
} from '../lib/capacidades.js'
import Icon from './Icon.jsx'

// Secciones EXCLUSIVAS del super-administrador (los directores no las ven):
//  - FacturacionAcademias: plan, renovación y estado de pago de cada academia.
//  - AnuncioGlobal: banner que ven todos los usuarios de la plataforma.

// ---------- Facturación y planes de las academias ----------
export function FacturacionAcademias({ academias, onCambio }) {
  const [ocupado, setOcupado] = useState(null) // academiaId en proceso
  const [error, setError] = useState('')
  const [edit, setEdit] = useState(null) // { id, plan, fecha }

  const ahora = Date.now()
  const seg = (a) => a.fechaRenovacion?.seconds || 0
  const diasRestantes = (a) => {
    const s = seg(a)
    if (!s) return null
    return Math.ceil((s * 1000 - ahora) / (24 * 60 * 60 * 1000))
  }
  const fechaTxt = (a) => {
    const s = seg(a)
    return s ? new Date(s * 1000).toLocaleDateString('es-MX', { dateStyle: 'medium' }) : '—'
  }

  const correr = async (id, fn) => {
    setOcupado(id); setError('')
    try {
      await fn()
      onCambio()
    } catch (err) {
      setError(err?.message || 'No se pudo aplicar el cambio de facturación.')
    } finally {
      setOcupado(null)
    }
  }

  const renovar = (a, dias) =>
    correr(a.id, async () => {
      const { renovarAcademia } = await import('../lib/firebase/plataforma.js')
      await renovarAcademia(a.id, dias, seg(a) * 1000)
    })

  const suspender = (a) =>
    correr(a.id, async () => {
      const { actualizarFacturacion } = await import('../lib/firebase/plataforma.js')
      await actualizarFacturacion(a.id, { estado: a.estado === 'activo' ? 'suspendido' : 'activo' })
    })

  const guardarEdit = () => {
    const { id, nombre, codigo, planComercial, tipo, plan, fecha } = edit
    const nuevoCodigo = String(codigo || '').trim().toUpperCase()
    const cambiaCodigo = nuevoCodigo && nuevoCodigo !== id
    const errorPlan = validarPlanTipo(planComercial, tipo)
    if (errorPlan) { setError(errorPlan); return }
    // Cambiar el código migra el doc a un ID nuevo y arrastra todas sus
    // referencias: es pesado y el código anterior deja de funcionar → confirma.
    if (cambiaCodigo && !window.confirm(
      `Vas a cambiar el código de la academia de «${id}» a «${nuevoCodigo}».\n\n` +
      'El código anterior dejará de funcionar y se migrarán todos sus datos ' +
      '(alumnos, grupos, códigos de prueba, intentos, solicitudes y reportes).\n\n' +
      '¿Continuar?'
    )) return
    setEdit(null)
    return correr(id, async () => {
      const { actualizarFacturacion } = await import('../lib/firebase/plataforma.js')
      await actualizarFacturacion(id, { nombre, planComercial, tipo, plan, fechaRenovacion: fecha || null })
      if (cambiaCodigo) {
        const { cambiarCodigoAcademia } = await import('../lib/firebase/admin.js')
        await cambiarCodigoAcademia(id, nuevoCodigo)
      }
    })
  }

  // Ordena por urgencia: primero vencidas / por vencer; sin fecha, al final.
  const orden = [...academias].sort((a, b) => {
    const da = diasRestantes(a), db = diasRestantes(b)
    if (da === null) return 1
    if (db === null) return -1
    return da - db
  })

  return (
    <section className="admin-facturacion">
      <h2><Icon name="pildora" size={20} /> Facturación y planes</h2>
      <p className="panel-gestion-sub">
        Exclusivo del super-administrador: plan, fecha de renovación y estado de pago de cada
        academia. Una academia suspendida pierde el acceso de todos sus miembros.
      </p>
      {error && <p className="cuenta-error" role="alert">{error}</p>}
      <div className="panel-tabla-wrap">
        <table className="panel-tabla panel-tabla--gestion">
          <thead>
            <tr>
              <th>Academia</th>
              <th>Plan</th>
              <th>Renovación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orden.map((a) => {
              const dias = diasRestantes(a)
              const vencida = dias !== null && dias < 0
              const porVencer = dias !== null && dias >= 0 && dias <= 7
              const enEdicion = edit?.id === a.id
              return (
                <tr key={a.id} className="panel-fila-gestion">
                  <td className="panel-alumno">
                    {enEdicion ? (
                      <div className="fact-edit-aca">
                        <input
                          className="fact-input"
                          type="text"
                          value={edit.nombre}
                          onChange={(e) => setEdit({ ...edit, nombre: e.target.value })}
                          placeholder="Nombre de la academia"
                          aria-label="Nombre de la academia"
                        />
                        <input
                          className="fact-input fact-input--codigo"
                          type="text"
                          value={edit.codigo}
                          onChange={(e) => setEdit({ ...edit, codigo: e.target.value.toUpperCase() })}
                          placeholder="CÓDIGO"
                          aria-label="Código de la academia"
                        />
                      </div>
                    ) : (
                      <>
                        <strong>{a.nombre || a.id}</strong>
                        <span className="fact-codigo">{a.id}</span>
                      </>
                    )}
                  </td>
                  <td>
                    {enEdicion ? (
                      <div className="fact-edit-aca">
                        <select
                          className="fact-input"
                          value={edit.planComercial}
                          aria-label="Plan comercial"
                          onChange={(e) => setEdit({ ...edit, planComercial: e.target.value })}
                        >
                          {PLANES.map((p) => (
                            <option key={p} value={p} disabled={Boolean(validarPlanTipo(p, edit.tipo))}>
                              {ETIQUETA_PLAN[p]}
                            </option>
                          ))}
                        </select>
                        <select
                          className="fact-input"
                          value={edit.tipo}
                          aria-label="Tipo de academia"
                          onChange={(e) => {
                            const t = e.target.value
                            setEdit({ ...edit, tipo: t, planComercial: t === 'avanzado' ? 'pro' : edit.planComercial })
                          }}
                        >
                          {TIPOS.map((t) => <option key={t} value={t}>{ETIQUETA_TIPO[t]}</option>)}
                        </select>
                        <input
                          className="fact-input"
                          type="text"
                          value={edit.plan}
                          aria-label="Periodicidad de facturación"
                          onChange={(e) => setEdit({ ...edit, plan: e.target.value })}
                          placeholder="periodicidad, p. ej. anual"
                        />
                      </div>
                    ) : (
                      <span className="fact-plan">
                        <b className={`fact-plan-badge fact-plan-badge--${planEfectivo(a)}`}>
                          {ETIQUETA_PLAN[planEfectivo(a)]}
                          {!a.planComercial && <small title="Plan sin asignar: se trata como Pro (academia previa a los planes). Edita para fijarlo."> *</small>}
                        </b>
                        <small>{ETIQUETA_TIPO[a.tipo] || a.tipo || '—'}{a.plan ? ` · ${a.plan}` : ''}</small>
                      </span>
                    )}
                  </td>
                  <td>
                    {enEdicion ? (
                      <input className="fact-input" type="date" value={edit.fecha} onChange={(e) => setEdit({ ...edit, fecha: e.target.value })} />
                    ) : (
                      <span className={`fact-fecha ${vencida ? 'vencida' : porVencer ? 'porvencer' : ''}`}>
                        {fechaTxt(a)}
                        {dias !== null && <small>{vencida ? `venció hace ${-dias} d` : `faltan ${dias} d`}</small>}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`pc-estado ${a.estado === 'activo' ? 'activo' : 'expirado'}`}>
                      {a.estado === 'activo' ? 'activa' : 'suspendida'}
                    </span>
                  </td>
                  <td className="admin-acciones">
                    {enEdicion ? (
                      <>
                        <button className="pc-copiar" disabled={ocupado === a.id} onClick={guardarEdit}>Guardar</button>
                        <button className="pc-copiar" onClick={() => setEdit(null)}>×</button>
                      </>
                    ) : (
                      <>
                        <button className="pc-toggle" disabled={ocupado === a.id} onClick={() => renovar(a, 30)} title="Registrar pago: +30 días y reactivar">
                          Renovar +30d
                        </button>
                        <button
                          className={`panel-estado-btn ${a.estado === 'activo' ? 'activo' : 'suspendido'}`}
                          disabled={ocupado === a.id}
                          onClick={() => suspender(a)}
                        >
                          {ocupado === a.id ? '…' : a.estado === 'activo' ? 'Suspender' : 'Reactivar'}
                        </button>
                        <button
                          className="pc-copiar"
                          onClick={() => setEdit({
                            id: a.id,
                            nombre: a.nombre || '',
                            codigo: a.id,
                            planComercial: planEfectivo(a),
                            tipo: a.tipo || 'basico',
                            plan: a.plan || '',
                            fecha: seg(a) ? new Date(seg(a) * 1000).toISOString().slice(0, 10) : '',
                          })}
                        >Editar</button>
                      </>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="panel-nota">
        «Renovar +30d» extiende la renovación y reactiva la academia (registra un pago). Con
        «Editar» cambias nombre, código, plan y fecha; al cambiar el <strong>código</strong> se
        migran todos los datos de la academia y el código anterior deja de servir. La tabla se
        ordena por urgencia: primero las vencidas y por vencer.
      </p>
    </section>
  )
}

// ---------- Anuncio global de la plataforma ----------
export function AnuncioGlobal() {
  const [mensaje, setMensaje] = useState('')
  const [tipo, setTipo] = useState('info')
  const [activo, setActivo] = useState(false)
  const [cargado, setCargado] = useState(false)
  const [msg, setMsg] = useState('')
  const [error, setError] = useState('')
  const [ocupado, setOcupado] = useState(false)

  useEffect(() => {
    let activoEfecto = true
    ;(async () => {
      const { obtenerAnuncio } = await import('../lib/firebase/plataforma.js')
      const a = await obtenerAnuncio()
      if (!activoEfecto) return
      if (a) { setMensaje(a.mensaje || ''); setTipo(a.tipo || 'info'); setActivo(Boolean(a.activo)) }
      setCargado(true)
    })()
    return () => { activoEfecto = false }
  }, [])

  const guardar = async (e) => {
    e.preventDefault()
    setMsg(''); setError(''); setOcupado(true)
    try {
      const { guardarAnuncio } = await import('../lib/firebase/plataforma.js')
      await guardarAnuncio({ mensaje, tipo, activo })
      setMsg(activo ? 'Anuncio publicado: lo verán todos los usuarios.' : 'Anuncio guardado (desactivado).')
    } catch {
      setError('No se pudo guardar el anuncio.')
    } finally {
      setOcupado(false)
    }
  }

  return (
    <section className="admin-anuncio">
      <h2><Icon name="chispa" size={20} /> Anuncio global</h2>
      <p className="panel-gestion-sub">
        Un mensaje que aparece como banner para <strong>todos</strong> los usuarios de la plataforma
        (mantenimiento, avisos, novedades). Solo el super-administrador puede publicarlo.
      </p>
      {cargado && (
        <form className="admin-form" onSubmit={guardar}>
          <label style={{ flexBasis: '100%' }}>
            Mensaje
            <input type="text" value={mensaje} onChange={(e) => setMensaje(e.target.value)} placeholder="p. ej. Mantenimiento el domingo de 2 a 4 am." maxLength={160} />
          </label>
          <label>
            Tipo
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="info">Informativo (azul)</option>
              <option value="alerta">Alerta (rojo)</option>
            </select>
          </label>
          <label className="admin-anuncio-activo">
            <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} /> Mostrar a todos
          </label>
          <button className="btn btn-primario" type="submit" disabled={ocupado}>
            {ocupado ? 'Guardando…' : 'Guardar anuncio'}
          </button>
          {error && <p className="cuenta-error" role="alert">{error}</p>}
          {msg && <p className="cuenta-ok" role="status">{msg}</p>}
        </form>
      )}
    </section>
  )
}
