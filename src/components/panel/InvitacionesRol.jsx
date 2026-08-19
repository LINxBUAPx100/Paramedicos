import { useEffect, useState } from 'react'
import { mensajeError } from '../../lib/panelModelo.js'
import {
  ROLES_INVITACION, estadoInvitacion, etiquetaRol, maxUsosPorDefecto,
} from '../../lib/invitacionesModelo.js'
import Icon from '../Icon.jsx'
import CompartirCodigo from '../CompartirCodigo.jsx'
import {
  rolesQuePuedeInvitar, filtroDeInvitaciones, agruparPorGeneracion,
} from '../../lib/invitacionesCentro.js'

// ============================================================
//  Invitaciones POR ROL — crear, compartir, desactivar, borrar
// ------------------------------------------------------------
//  El código de la academia y el de cada grupo dicen A DÓNDE entra la persona;
//  ninguno decía COMO QUÉ, así que todo el mundo aterrizaba como alumno y había
//  que promoverlo a mano en Miembros. Aquí se emite el enlace ya con el rol
//  dentro: alumno, profesor o director.
//
//  QUIÉN puede emitir qué (invitacionesCentro.js, y lo mismo en las reglas):
//    · director y super-admin → cualquier rol, y ven todas las de su academia;
//    · profesor CON el permiso de códigos aprobado → SOLO alumnos, y ve solo
//      las que él emitió. Repartir el rol de profesor o de director sigue
//      siendo del director: ese enlace entrega el mando de la academia.
//
//  El profesor no pierde nada por el camino: ya podía dar el código de su
//  grupo, que mete a cualquiera como alumno para siempre. Una invitación es
//  lo mismo, pero con caducidad y tope de usos.
// ============================================================

export default function InvitacionesRol({
  academiaId, academiaNombre = '', miUid, grupos = [],
  // Quién mira: { rol, esSuperadmin, puedeVerCodigos, uid }. Sin él se asume
  // dirección, que es como se usaba desde el dashboard del super-admin.
  quienEmite = { rol: 'admin_escuela' },
}) {
  const rolesPosibles = rolesQuePuedeInvitar(quienEmite)
  const puedeElegirRol = rolesPosibles.length > 1
  const [lista, setLista] = useState(null)
  const [rol, setRol] = useState(rolesPosibles[0] || 'alumno')
  const [grupoSel, setGrupoSel] = useState('')
  const [dias, setDias] = useState(14)
  const [maxUsos, setMaxUsos] = useState(maxUsosPorDefecto('alumno'))
  const [nota, setNota] = useState('')
  const [nueva, setNueva] = useState(null) // última invitación creada
  const [ocupado, setOcupado] = useState(false)
  const [error, setError] = useState('')

  const cargar = async () => {
    try {
      const { listarInvitaciones } = await import('../../lib/firebase/invitaciones.js')
      // El filtro no es cosmético: las reglas exigen que TODO lo que devuelva
      // la consulta sea legible, así que un profesor que pidiera la lista
      // entera se llevaría un rechazo completo.
      const filtro = filtroDeInvitaciones(quienEmite, academiaId)
      setLista(filtro ? await listarInvitaciones(academiaId, filtro) : [])
    } catch (err) {
      setLista([])
      setError(mensajeError(err, 'No se pudieron cargar las invitaciones', 'invitaciones'))
    }
  }
  useEffect(() => { cargar() }, [academiaId]) // eslint-disable-line react-hooks/exhaustive-deps

  // Al cambiar de rol, el tope de usos vuelve a su valor recomendado: una
  // invitación de DIRECTOR se propone de un solo uso, y sería fácil dejarse
  // abierto el "sin límite" que venía de haber estado mirando la de alumno.
  const cambiarRol = (r) => {
    setRol(r)
    setMaxUsos(maxUsosPorDefecto(r))
  }

  const nombreGrupo = (id) => grupos.find((g) => g.id === id)?.nombre || id

  const crear = async (e) => {
    e.preventDefault()
    setOcupado(true)
    setError('')
    try {
      const { crearInvitacion } = await import('../../lib/firebase/invitaciones.js')
      const inv = await crearInvitacion({
        creadoPor: miUid,
        academiaId,
        rol,
        grupoId: grupoSel || null,
        dias: Number(dias),
        maxUsos: Number(maxUsos),
        nota,
      })
      setNueva({ id: inv.id, rol, grupoId: grupoSel || null })
      setNota('')
      await cargar()
    } catch (err) {
      setError(
        err?.code
          ? mensajeError(err, 'No se pudo crear la invitación', 'invitaciones')
          : err?.message || 'No se pudo crear la invitación.'
      )
    } finally {
      setOcupado(false)
    }
  }

  const alternar = async (inv) => {
    try {
      const { alternarInvitacion } = await import('../../lib/firebase/invitaciones.js')
      await alternarInvitacion(inv.id, inv.estado === 'activo' ? 'inactivo' : 'activo')
      await cargar()
    } catch (err) {
      setError(mensajeError(err, 'No se pudo cambiar el estado de la invitación', 'invitaciones'))
    }
  }

  // Borrar una invitación NO toca a quien ya la canjeó: esa persona conserva su
  // rol y su academia. Lo que desaparece es el enlace. Por eso basta un confirm
  // y no la confirmación reforzada que sí piden los grupos.
  const borrar = async (inv) => {
    if (!window.confirm(
      `¿Borrar la invitación ${inv.id}?\n\n` +
      `Deja de poder canjearse y desaparece de la lista. Quien ya la usó conserva ` +
      `su rol de ${etiquetaRol(inv.rol).toLowerCase()}.\n\n` +
      'Si solo quieres que deje de servir, usa "Desactivar": conserva el rastro.'
    )) return
    try {
      const { borrarInvitacion } = await import('../../lib/firebase/invitaciones.js')
      await borrarInvitacion(inv.id)
      await cargar()
    } catch (err) {
      setError(mensajeError(err, 'No se pudo borrar la invitación', 'invitaciones'))
    }
  }

  const copiar = (id) => {
    try { navigator.clipboard.writeText(id) } catch { /* sin permisos */ }
  }

  const fechaTxt = (f) =>
    f?.seconds ? new Date(f.seconds * 1000).toLocaleDateString('es-MX', { dateStyle: 'medium' }) : '—'

  const usosTxt = (inv) => {
    const max = Number(inv.maxUsos || 0)
    const usos = Number(inv.usos || 0)
    return max > 0 ? `${usos}/${max} usos` : `${usos} usos (sin límite)`
  }

  const rolActual = ROLES_INVITACION.find((r) => r.rol === rol)

  return (
    <section className="panel-invitaciones">
      <h2><Icon name="pildora" size={20} /> Invitaciones por rol</h2>
      <p className="panel-gestion-sub">
        El código de la academia y el de cada grupo dicen <em>a dónde</em> entra la persona;
        una invitación dice además <strong>como qué</strong>. Al activarla, entra ya como alumno,
        profesor o director, sin que tengas que promoverla después en Miembros.
      </p>

      <form className="pc-form" onSubmit={crear}>
          {/* Con un solo rol posible (el profesor) no se ofrece un desplegable
              de una opción: se dice lo que va a pasar y ya. */}
          {puedeElegirRol ? (
            <label>
              Entra como
              <select value={rol} onChange={(e) => cambiarRol(e.target.value)}>
                {ROLES_INVITACION.filter((r) => rolesPosibles.includes(r.rol)).map((r) => (
                  <option key={r.rol} value={r.rol}>{r.etiqueta}</option>
                ))}
              </select>
            </label>
          ) : (
            <p className="pc-fijo">Entra como <strong>alumno</strong></p>
          )}
          {grupos.length > 0 && (
            <label>
              Grupo (se integra al canjear)
              {/* Agrupados por GENERACIÓN: los grupos empiezan en fechas
                  distintas y en una academia con varios ciclos la lista plana
                  obliga a saberse los nombres de memoria. */}
              <select value={grupoSel} onChange={(e) => setGrupoSel(e.target.value)}>
                <option value="">— Sin grupo —</option>
                {agruparPorGeneracion(grupos).map((bloque) => (
                  <optgroup key={bloque.clave} label={bloque.etiqueta}>
                    {bloque.grupos.map((g) => (
                      <option key={g.id} value={g.id}>{g.nombre}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
          )}
          <label>
            Vigencia
            <select value={dias} onChange={(e) => setDias(e.target.value)}>
              <option value={3}>3 días</option>
              <option value={7}>7 días</option>
              <option value={14}>14 días</option>
              <option value={30}>30 días</option>
              <option value={90}>90 días</option>
            </select>
          </label>
          <label>
            Cuántas personas
            <select value={maxUsos} onChange={(e) => setMaxUsos(Number(e.target.value))}>
              <option value={1}>1 persona</option>
              <option value={5}>Hasta 5</option>
              <option value={25}>Hasta 25</option>
              <option value={0}>Sin límite</option>
            </select>
          </label>
          <label className="pc-nota">
            Nota (opcional)
            <input
              type="text"
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Para quién es"
              maxLength={60}
            />
          </label>
          <button className="btn btn--primario" type="submit" disabled={ocupado}>
            {ocupado ? 'Creando…' : '+ Crear invitación'}
          </button>
      </form>

      {rolActual && (
        <p className="pi-ayuda">
          <span className={`pi-rol ${rolActual.rol}`}>{rolActual.etiqueta}</span>
          {rolActual.descripcion}
          {rol === 'admin_escuela' && (
            <strong>
              {' '}Un director manda tanto como tú en esta academia: mándala a una sola persona.
            </strong>
          )}
        </p>
      )}

      {nueva && (
        <p className="pc-nuevo" role="status">
          Invitación creada ({etiquetaRol(nueva.rol).toLowerCase()}): <code>{nueva.id}</code>
          <button className="pc-copiar" onClick={() => copiar(nueva.id)}>Copiar</button>
          <CompartirCodigo
            codigo={nueva.id}
            nombre={academiaNombre || academiaId}
            contexto={nueva.grupoId ? nombreGrupo(nueva.grupoId) : ''}
            tipo="invitacion"
            rol={nueva.rol}
          />
        </p>
      )}
      {error && <p className="cuenta-error" role="alert">{error}</p>}

      {lista === null ? null : lista.length === 0 ? (
        <p className="panel-vacio">Aún no has creado invitaciones por rol.</p>
      ) : (
        <ul className="pc-lista">
          {lista.map((inv) => {
            const est = estadoInvitacion(inv)
            return (
              <li key={inv.id} className={`pc-item ${est === 'activa' ? 'activo' : 'inactivo'}`}>
                <span className={`pi-rol ${inv.rol}`}>{etiquetaRol(inv.rol)}</span>
                <code className="pc-codigo">{inv.id}</code>
                {inv.grupoId && (
                  <span className="pc-academia pc-grupo">{nombreGrupo(inv.grupoId)}</span>
                )}
                <span className="pc-detalle">
                  {inv.nota && <strong>{inv.nota} · </strong>}
                  {usosTxt(inv)} · expira {fechaTxt(inv.expira)}
                </span>
                <span className={`pc-estado ${est}`}>{est}</span>
                <span className="pc-acciones">
                  <button className="pc-copiar" onClick={() => copiar(inv.id)}>Copiar</button>
                  {est === 'activa' && (
                    <CompartirCodigo
                      codigo={inv.id}
                      nombre={academiaNombre || inv.academiaId}
                      contexto={inv.grupoId ? nombreGrupo(inv.grupoId) : ''}
                      tipo="invitacion"
                      rol={inv.rol}
                    />
                  )}
                  {est !== 'expirada' && (
                    <button className="pc-toggle" onClick={() => alternar(inv)}>
                      {inv.estado === 'activo' ? 'Desactivar' : 'Reactivar'}
                    </button>
                  )}
                  <button className="pc-toggle pc-borrar" onClick={() => borrar(inv)}>
                    Borrar
                  </button>
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
