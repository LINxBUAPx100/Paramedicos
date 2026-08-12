import { useMemo, useState } from 'react'
import { ETIQUETA_ROL, ROLES, ROLES_DIRECTOR } from '../../lib/roles.js'
import Icon from '../Icon.jsx'

// ============================================================
//  Miembros y roles: cambio de rol, grupo y estado según jerarquía
// ------------------------------------------------------------
//  gestion="superadmin" → cualquier rol + activar/suspender.
//  gestion="director"   → solo alumno<->instructor (nunca a sí mismo ni a
//                         otros directores) + activar/suspender.
//  El buscador (Bloque O) no es un adorno: una academia con 200 alumnos era
//  una tabla imposible de recorrer.
// ============================================================

export default function GestionMiembros({ miembros, grupos = [], gestion, miUid, onCambio }) {
  const [ocupado, setOcupado] = useState(null) // uid en proceso
  const [error, setError] = useState('')
  const [filtro, setFiltro] = useState('')

  const rolesDisponibles = gestion === 'superadmin' ? ROLES : ROLES_DIRECTOR

  const visibles = useMemo(() => {
    const q = filtro.trim().toLowerCase()
    if (!q) return miembros
    return miembros.filter((m) =>
      [m.nombre, m.email, ETIQUETA_ROL[m.rol] || m.rol, grupos.find((g) => g.id === m.grupoId)?.nombre]
        .some((v) => String(v || '').toLowerCase().includes(q))
    )
  }, [miembros, grupos, filtro])

  // ¿Puede quien mira editar a este miembro?
  const editable = (m) => {
    if (m.id === miUid) return false // nadie se toca a sí mismo desde aquí
    if (gestion === 'superadmin') return true
    // Director: solo alumnos e instructores de su academia.
    return ROLES_DIRECTOR.includes(m.rol)
  }

  const aplicar = async (uid, cambios) => {
    setOcupado(uid)
    setError('')
    try {
      const { actualizarUsuario } = await import('../../lib/firebase/usuarios.js')
      await actualizarUsuario(uid, cambios)
      onCambio()
    } catch {
      setError('No se pudo aplicar el cambio (revisa permisos o conexión).')
    } finally {
      setOcupado(null)
    }
  }

  // Va por su propia función y no por `aplicar` porque el campo es distinto y
  // el mensaje de error también debe serlo: si falla, lo que hay que revisar
  // es el plan de la academia, no el rol del usuario.
  const correrRevocar = async (uid) => {
    setOcupado(uid)
    setError('')
    try {
      const { revocarAccesoCodigos } = await import('../../lib/firebase/solicitudes.js')
      await revocarAccesoCodigos(uid)
      onCambio()
    } catch {
      setError('No se pudo retirar el acceso a los códigos (revisa permisos o conexión).')
    } finally {
      setOcupado(null)
    }
  }

  return (
    <section className="panel-gestion">
      <h2><Icon name="usuario" size={20} /> Miembros y roles</h2>
      <p className="panel-gestion-sub">
        {gestion === 'superadmin'
          ? 'Como super-administrador puedes asignar cualquier rol y suspender cuentas.'
          : 'Como director puedes nombrar profesores entre tus alumnos (y viceversa) y suspender cuentas.'}
      </p>
      {error && <p className="cuenta-error" role="alert">{error}</p>}

      <input
        type="search"
        className="admin-buscar"
        placeholder="Buscar por nombre, correo, rol o grupo…"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        aria-label="Buscar miembros"
      />

      <div className="panel-tabla-wrap">
        <table className="panel-tabla panel-tabla--gestion">
          <thead>
            <tr>
              <th scope="col">Miembro</th>
              <th scope="col">Correo</th>
              <th scope="col">Rol</th>
              <th scope="col">Grupo</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((m) => {
              const puede = editable(m)
              const suspendido = m.estado && m.estado !== 'activo'
              const quien = m.nombre || m.email || m.id
              const sinNombre = !m.nombre
                || m.nombre.trim().toLowerCase() === (m.email || '').trim().toLowerCase()
              return (
                <tr key={m.id} className="panel-fila-gestion">
                  <td className="panel-alumno" data-label="Miembro">
                    {sinNombre
                      ? <span className="panel-sin-nombre">Sin nombre registrado</span>
                      : <strong>{m.nombre}</strong>}
                    {m.id === miUid && <span className="panel-tag-yo">tú</span>}
                  </td>
                  <td className="panel-correo" data-label="Correo">{m.email || '—'}</td>
                  <td data-label="Rol">
                    {puede ? (
                      <select
                        className="panel-rol-select"
                        value={m.rol}
                        disabled={ocupado === m.id}
                        aria-label={`Rol de ${quien}`}
                        onChange={(e) => {
                          const rol = e.target.value
                          if (
                            rol === 'superadmin'
                            && !window.confirm(
                              `¿Convertir a ${quien} en SUPER-ADMINISTRADOR?\n\n` +
                              'Tendrá control total de la plataforma, no solo de esta academia.'
                            )
                          ) {
                            e.target.value = m.rol
                            return
                          }
                          aplicar(m.id, { rol })
                        }}
                      >
                        {rolesDisponibles.map((r) => (
                          <option key={r} value={r}>{ETIQUETA_ROL[r]}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`panel-rol-tag rol-${m.rol}`}>{ETIQUETA_ROL[m.rol] || m.rol}</span>
                    )}
                  </td>
                  <td data-label="Grupo">
                    {puede && grupos.length > 0 ? (
                      <select
                        className="panel-rol-select"
                        value={m.grupoId || ''}
                        disabled={ocupado === m.id}
                        aria-label={`Grupo de ${quien}`}
                        onChange={(e) => aplicar(m.id, { grupoId: e.target.value || null })}
                      >
                        <option value="">Sin grupo</option>
                        {grupos.map((g) => (
                          <option key={g.id} value={g.id}>{g.nombre}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={m.grupoId ? 'panel-rol-tag' : 'panel-celda-vacia'}>
                        {m.grupoId ? (grupos.find((g) => g.id === m.grupoId)?.nombre || m.grupoId) : '—'}
                      </span>
                    )}
                  </td>
                  <td data-label="Estado">
                    {puede ? (
                      <button
                        type="button"
                        className={`panel-estado-btn ${suspendido ? 'suspendido' : 'activo'}`}
                        disabled={ocupado === m.id}
                        onClick={() => {
                          if (
                            !suspendido
                            && !window.confirm(
                              `¿Suspender el acceso de ${quien}?\n\n` +
                              'Ya no podrá ingresar, pero conservará sus datos y su avance.'
                            )
                          ) return
                          aplicar(m.id, { estado: suspendido ? 'activo' : 'suspendido' })
                        }}
                      >
                        {ocupado === m.id ? '…' : suspendido ? 'Reactivar' : 'Suspender'}
                      </button>
                    ) : (
                      <span className={`panel-rol-tag ${suspendido ? 'rol-suspendido' : 'rol-activo'}`}>
                        {suspendido ? 'Suspendido' : 'Activo'}
                      </span>
                    )}
                    {/* SIMETRÍA (Bloque M): el acceso a los códigos se podía
                        conceder —al aprobar la solicitud del profesor— y no
                        había NADA que lo retirara, ni en la interfaz ni en la
                        capa de datos. Un profesor que dejaba de dar clase se
                        quedaba para siempre con la capacidad de ver y repartir
                        los códigos de la academia. */}
                    {puede && m.rol === 'instructor' && m.puedeVerCodigos && (
                      <button
                        type="button"
                        className="btn btn--sm btn--fantasma panel-revocar-codigos"
                        disabled={ocupado === m.id}
                        onClick={() => {
                          if (!window.confirm(
                            `¿Retirar a ${quien} el acceso a los códigos?\n\n` +
                            'Dejará de ver los códigos de la academia y de sus grupos. ' +
                            'Podrá volver a solicitarlo cuando lo necesite.'
                          )) return
                          correrRevocar(m.id)
                        }}
                        title="Retirar el acceso a los códigos de la academia"
                      >
                        <Icon name="candado" size={13} /> Quitar códigos
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {visibles.length === 0 && (
        <p className="panel-vacio">Nadie coincide con «{filtro}».</p>
      )}
    </section>
  )
}
