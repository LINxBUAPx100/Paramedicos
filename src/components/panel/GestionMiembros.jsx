import { useCallback, useEffect, useMemo, useState } from 'react'
import { ETIQUETA_ROL, ROLES, ROLES_DIRECTOR } from '../../lib/roles.js'
import { etiquetaPrueba } from '../../lib/accesoModelo.js'
import {
  estaDadaDeBaja, accionesDeCuenta, rolAlReactivar, avisoDeReactivacion,
} from '../../lib/cuentaModelo.js'
import { gruposDeUsuario } from '../../lib/gruposDeUsuario.js'
import Icon from '../Icon.jsx'
import FiltrosUsuarios from './FiltrosUsuarios.jsx'
import { prepararLista, FILTRO_VACIO, ORDEN_DEFECTO } from '../../lib/listaUsuarios.js'

// ============================================================
//  Miembros y roles: cambio de rol, grupo y estado según jerarquía
// ------------------------------------------------------------
//  gestion="superadmin" → cualquier rol + activar/suspender.
//  gestion="director"   → solo alumno<->instructor (nunca a sí mismo ni a
//                         otros directores) + activar/suspender.
//  El buscador (Bloque O) no es un adorno: una academia con 200 alumnos era
//  una tabla imposible de recorrer.
// ============================================================

export default function GestionMiembros({
  miembros, inactivos = [], grupos = [], gestion, miUid, academiaId, onCambio,
}) {
  const [ocupado, setOcupado] = useState(null) // uid en proceso
  const [error, setError] = useState('')
  const [filtro, setFiltro] = useState(FILTRO_VACIO)
  const [orden, setOrden] = useState(ORDEN_DEFECTO)
  // Las cuentas INACTIVAS —suspendidas y dadas de baja— no se listan con las
  // demás. Ésta es la única pantalla que puede enseñarlas, porque es la única
  // desde la que se levanta una suspensión o se reactiva una baja.
  const [verInactivos, setVerInactivos] = useState(false)

  const rolesDisponibles = gestion === 'superadmin' ? ROLES : ROLES_DIRECTOR

  const nombreDeGrupo = useCallback(
    (id) => grupos.find((g) => g.id === id)?.nombre || id, [grupos])

  // Lista base: las activas, más las inactivas si se han pedido.
  const base = useMemo(
    () => (verInactivos ? [...miembros, ...inactivos] : miembros),
    [miembros, inactivos, verInactivos]
  )

  // Filtrar y ordenar en una pasada. El orden es lo que arregla que la lista
  // saliera como Firestore la devolviera: por nombre, en español, ignorando
  // mayúsculas y acentos (ver `lib/listaUsuarios.js`).
  const visibles = useMemo(
    () => prepararLista(base, filtro, orden, { nombreDeGrupo }),
    [base, filtro, orden, nombreDeGrupo]
  )

  // Reactivar una cuenta dada de baja devuelve algo que la baja quitó: su
  // academia. Por eso no basta con poner `estado: 'activo'` como hace el botón
  // de suspender — hay una función que lo hace entero y deja rastro.
  const reactivar = async (m) => {
    const quien = m.nombre || m.email || m.id
    if (!window.confirm(
      `¿Reactivar la cuenta de ${quien}?\n\n${avisoDeReactivacion()}`
    )) return
    setOcupado(m.id)
    setError('')
    try {
      const { reactivarUsuario } = await import('../../lib/firebase/admin.js')
      await reactivarUsuario(m.id, { academiaId, rol: rolAlReactivar(m) })
      onCambio()
    } catch {
      setError('No se pudo reactivar la cuenta (revisa permisos o conexión).')
    } finally {
      setOcupado(null)
    }
  }

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

  // Asignar GRUPOS a un profesor. Va aparte de `aplicar` porque escribe dos
  // campos a la vez (la lista y el `grupoId` heredado, que deben quedar de
  // acuerdo) y porque su validación tiene mensajes propios: si el director
  // elige un grupo que no es de su academia, hay que decírselo, no dar un
  // «revisa permisos» genérico.
  const asignarGrupos = async (uid, ids) => {
    setOcupado(uid)
    setError('')
    try {
      const { asignarGruposAProfesor } = await import('../../lib/firebase/usuarios.js')
      await asignarGruposAProfesor(uid, ids, grupos)
      onCambio()
    } catch (err) {
      setError(err?.message || 'No se pudieron asignar los grupos (revisa permisos o conexión).')
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

      <FiltrosUsuarios
        usuarios={base}
        filtro={filtro}
        onFiltro={setFiltro}
        orden={orden}
        onOrden={setOrden}
        grupos={grupos}
        total={base.length}
        mostrados={visibles.length}
      />

      {/* Solo aparece si hay alguna. Una casilla que nunca cambia nada es
          ruido en una pantalla que ya tiene mucho que mirar. */}
      {inactivos.length > 0 && (
        <label className="panel-ver-bajas">
          <input
            type="checkbox"
            checked={verInactivos}
            onChange={(e) => setVerInactivos(e.target.checked)}
          />
          Mostrar cuentas inactivas ({inactivos.length})
        </label>
      )}

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
              // `eliminado` NO es `suspendido`, y confundirlos tenía
              // consecuencias: el botón de «Reactivar» ponía `estado: 'activo'`
              // sobre una cuenta dada de baja, que se quedaba activa pero SIN
              // academia —activa por dentro y rota por fuera, justo lo que
              // `reactivarExigeAcademia` existe para evitar—.
              const deBaja = estaDadaDeBaja(m)
              const suspendido = !deBaja && m.estado && m.estado !== 'activo'
              const prueba = etiquetaPrueba(m)
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
                  {/* Un PROFESOR puede llevar varios grupos; un ALUMNO, uno.
                      No es una asimetría gratuita: el grupo de un alumno lleva
                      su plan de estudios, y dos planes a la vez no es algo que
                      el producto contemple (ver src/lib/gruposDeUsuario.js). */}
                  <td data-label="Grupo">
                    {puede && grupos.length > 0 && m.rol === 'instructor' ? (
                      <GruposDelProfesor
                        profesor={m}
                        grupos={grupos}
                        ocupado={ocupado === m.id}
                        onGuardar={(ids) => asignarGrupos(m.id, ids)}
                      />
                    ) : puede && grupos.length > 0 ? (
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
                    {deBaja ? (
                      <span className="panel-baja-celda">
                        <span className="panel-rol-tag rol-suspendido">Dada de baja</span>
                        {accionesDeCuenta(m, { esSuperadmin: gestion === 'superadmin' })
                          .includes('reactivar') ? (
                            <button
                              type="button"
                              className="btn btn--sm btn--primario"
                              disabled={ocupado === m.id}
                              onClick={() => reactivar(m)}
                            >
                              {ocupado === m.id ? '…' : 'Reactivar'}
                            </button>
                          ) : (
                            // Las reglas no dejan a un director tocar una cuenta
                            // que ya no pertenece a su academia. Ofrecerle el
                            // botón sería ofrecerle un fallo.
                            <small className="panel-baja-nota">
                              La reactiva el administrador de la plataforma.
                            </small>
                          )}
                      </span>
                    ) : puede ? (
                      <span className="panel-baja-celda">
                        {/* Una suspendida solo se ve con la casilla marcada, así
                            que conviene decir en qué estado está además de qué
                            se puede hacer con ella. */}
                        {suspendido && (
                          <span className="panel-rol-tag rol-suspendido">Suspendida</span>
                        )}
                        <button
                          type="button"
                          className={`panel-estado-btn ${suspendido ? 'suspendido' : 'activo'}`}
                          disabled={ocupado === m.id}
                          onClick={() => {
                            if (
                              !suspendido
                              && !window.confirm(
                                `¿Suspender el acceso de ${quien}?\n\n` +
                                'Ya no podrá ingresar, pero conservará sus datos y su avance. '
                                + 'Dejará de aparecer en los listados hasta que la reactives.'
                              )
                            ) return
                            aplicar(m.id, { estado: suspendido ? 'activo' : 'suspendido' })
                          }}
                        >
                          {ocupado === m.id
                            ? '…'
                            : suspendido ? 'Levantar suspensión' : 'Suspender'}
                        </button>
                      </span>
                    ) : (
                      <span className={`panel-rol-tag ${suspendido ? 'rol-suspendido' : 'rol-activo'}`}>
                        {suspendido ? 'Suspendido' : 'Activo'}
                      </span>
                    )}
                    {/* Quien entró con un CÓDIGO DE PRUEBA sigue en la lista al
                        vencer, pero ya no pertenece a la academia ni al grupo:
                        sin esta etiqueta el director veía un alumno normal que
                        en realidad no puede entrar (src/lib/accesoModelo.js). */}
                    {prueba && (
                      <span className={`panel-rol-tag panel-tag-prueba ${prueba.vigente ? '' : 'rol-suspendido'}`}>
                        {prueba.texto}
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
        <p className="panel-vacio">Nadie coincide con los filtros puestos.</p>
      )}
    </section>
  )
}

// ============================================================
//  Los grupos de UN profesor
// ------------------------------------------------------------
//  Un desplegable no sirve aquí: hay que elegir VARIOS. Se usa <details> nativo
//  en vez de un modal porque cabe dentro de la celda, funciona con teclado y en
//  móvil sin código propio, y no roba el foco de la tabla mientras el director
//  repasa la lista.
//
//  Los cambios NO se guardan al marcar cada casilla: se acumulan y se aplican
//  con un botón. Marcar tres grupos serían tres escrituras y tres recargas de
//  la tabla, y el estado intermedio dejaría al profesor un instante sin grupos.
// ============================================================
function GruposDelProfesor({ profesor, grupos, ocupado, onGuardar }) {
  const asignados = useMemo(() => gruposDeUsuario(profesor, 'instructor'), [profesor])
  const [seleccion, setSeleccion] = useState(asignados)
  const [abierto, setAbierto] = useState(false)

  // Si la tabla se recarga con datos nuevos, la selección local se descarta:
  // lo que manda es lo guardado, no lo que quedó marcado antes.
  useEffect(() => { setSeleccion(asignados) }, [asignados])

  const quien = profesor.nombre || profesor.email || profesor.id
  const nombresAsignados = grupos.filter((g) => asignados.includes(g.id)).map((g) => g.nombre)
  const cambiado = seleccion.length !== asignados.length
    || seleccion.some((id) => !asignados.includes(id))

  const alternar = (id) => {
    setSeleccion((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  return (
    <details
      className="panel-grupos-multi"
      open={abierto}
      onToggle={(e) => setAbierto(e.currentTarget.open)}
    >
      <summary aria-label={`Grupos de ${quien}`}>
        {nombresAsignados.length === 0
          ? <span className="panel-celda-vacia">Sin grupos</span>
          : nombresAsignados.length === 1
            ? <span className="panel-rol-tag">{nombresAsignados[0]}</span>
            : <span className="panel-rol-tag">{nombresAsignados.length} grupos</span>}
      </summary>

      <div className="panel-grupos-lista">
        {grupos.map((g) => (
          <label key={g.id} className="panel-grupos-opcion">
            <input
              type="checkbox"
              checked={seleccion.includes(g.id)}
              disabled={ocupado}
              onChange={() => alternar(g.id)}
            />
            {g.nombre}
          </label>
        ))}

        <div className="panel-grupos-acciones">
          <button
            type="button"
            className="btn btn--pildora btn--carbon btn--mini"
            disabled={ocupado || !cambiado}
            onClick={() => onGuardar(seleccion)}
          >
            {ocupado ? 'Guardando…' : 'Guardar grupos'}
          </button>
          {cambiado && (
            <button
              type="button"
              className="panel-grupos-cancelar"
              disabled={ocupado}
              onClick={() => setSeleccion(asignados)}
            >
              Descartar
            </button>
          )}
        </div>
        {seleccion.length === 0 && (
          <p className="panel-grupos-aviso">
            Sin ningún grupo, este profesor no verá alumnos en su panel.
          </p>
        )}
      </div>
    </details>
  )
}
