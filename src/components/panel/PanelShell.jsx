import { useMemo, useState } from 'react'
import { Link, NavLink, Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useIndiceAcademia } from '../../context/ContenidoContext.jsx'
import { pasaFiltroGrupo, seccionesPanel } from '../../lib/panelModelo.js'
import Icon from '../Icon.jsx'
import { useDatosAcademia } from './datosAcademia.js'

// ============================================================
//  Consola del director — armazón (Bloque O)
// ------------------------------------------------------------
//  `PanelAcademia.jsx` eran 1271 líneas y el panel del director las pintaba
//  TODAS de una vez, apiladas en una columna: avance, solicitudes internas,
//  solicitudes del directorio, grupos, miembros, permisos editoriales y
//  códigos de prueba. Encima, «qué contenido ve cada grupo» —lo que un director
//  toca a diario— vivía escondido en /temario, un nombre que no lo anuncia.
//
//  Ahora hay una sección por asunto bajo /panel/*, y el profesor entra al
//  MISMO armazón con menos secciones (las resuelve `seccionesPanel`, probada en
//  tests/panelModelo.test.mjs). Los datos de la academia se leen UNA vez aquí y
//  bajan por el contexto del Outlet.
// ============================================================

export function usePanel() {
  return useOutletContext()
}

export default function PanelShell() {
  const {
    cargando, esStaff, esSuperadmin, academiaId, academia, rol, user, perfil, capacidades,
    // Permiso que su director le aprueba: abre los códigos y, con ellos, la
    // emisión de invitaciones de ALUMNO desde el centro de invitaciones.
    puedeVerCodigos,
  } = useAuth()
  const datos = useDatosAcademia(academiaId)
  const { modulos } = useIndiceAcademia(academiaId)

  // Un profesor con grupo asignado queda fijado a su grupo y no puede cambiar
  // el filtro: no tiene por qué ver el avance de los grupos de otro.
  const esDirector = rol === 'admin_escuela'
  const soloGrupo = !esDirector ? perfil?.grupoId || null : null
  const [grupoFiltro, setGrupoFiltro] = useState(soloGrupo || '') // '' = todos; 'sin' = sin grupo

  const filtroEfectivo = soloGrupo || grupoFiltro
  const alumnos = useMemo(
    () => datos.miembros.filter((m) => m.rol === 'alumno' && pasaFiltroGrupo(m, filtroEfectivo)),
    [datos.miembros, filtroEfectivo]
  )
  const staff = useMemo(() => datos.miembros.filter((m) => m.rol !== 'alumno'), [datos.miembros])

  const secciones = useMemo(
    () => seccionesPanel({
      rol, capacidades, permisosEditor: perfil?.permisosEditor, puedeVerCodigos,
    }),
    [rol, capacidades, perfil?.permisosEditor, puedeVerCodigos]
  )

  const contexto = useMemo(
    () => ({
      ...datos,
      academiaId,
      academia,
      academiaNombre: academia?.nombre || '',
      gestion: esDirector ? 'director' : null,
      // Quién es, para el centro de invitaciones: qué roles puede repartir y
      // qué lista puede leer lo decide invitacionesCentro.js con esto.
      quienEmite: { rol, esSuperadmin: rol === 'superadmin', puedeVerCodigos, uid: user?.uid || null },
      miUid: user?.uid || null,
      soloGrupo,
      grupoFiltro: filtroEfectivo,
      setGrupoFiltro,
      alumnos,
      staff,
      modulos,
      nombreGrupo: (id) => datos.grupos.find((g) => g.id === id)?.nombre || id,
    }),
    [datos, academiaId, academia, esDirector, user, soloGrupo, filtroEfectivo, alumnos, staff, modulos, rol, puedeVerCodigos]
  )

  if (cargando) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando…</span>
      </div>
    )
  }

  // El super-admin tiene su propia consola, con todas las academias.
  if (esSuperadmin) return <Navigate to="/admin" replace />

  if (!esStaff) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Panel exclusivo del personal</h1>
        <p>Esta sección es solo para instructores y administradores de academia.</p>
        <Link to="/" className="btn btn--pildora btn--carbon">Volver al inicio</Link>
      </div>
    )
  }

  if (!academiaId) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="alerta" size={30} /></span>
        <h1>Sin academia asignada</h1>
        <p>Tu cuenta es de personal pero no está ligada a ninguna academia. Pide al administrador que te asigne una.</p>
        <Link to="/" className="btn btn--pildora btn--carbon">Volver al inicio</Link>
      </div>
    )
  }

  return (
    <div className="consola">
      <nav className="consola-nav" aria-label="Secciones del panel">
        <span className="consola-marca">
          <Icon name="temario" size={18} /> {academia?.nombre || academiaId}
        </span>
        {secciones.map((s) => (
          <NavLink key={s.id} to={s.ruta} end={s.fin} className="consola-link">
            <Icon name={s.icono} size={17} />
            <span>{s.etiqueta}</span>
          </NavLink>
        ))}
      </nav>

      <div className="consola-cuerpo">
        {datos.error && <p className="cuenta-error" role="alert">{datos.error}</p>}
        {datos.cargando && !datos.hayDatos ? (
          <div className="ruta-cargando" role="status">
            <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando academia…</span>
          </div>
        ) : (
          <Outlet context={contexto} />
        )}
      </div>
    </div>
  )
}

// Selector de grupo del panel. Un profesor fijado a su grupo ve a qué grupo
// está mirando, pero no puede cambiarlo.
export function FiltroGrupo() {
  const { grupos, grupoFiltro, setGrupoFiltro, soloGrupo, nombreGrupo } = usePanel()
  const { puedeVerCodigos } = useAuth()

  if (soloGrupo) {
    return (
      <p className="panel-grupo-aviso">
        <Icon name="usuario" size={16} /> Estás viendo tu grupo:{' '}
        <strong>{nombreGrupo(soloGrupo)}</strong>
        {puedeVerCodigos && <> <code>{soloGrupo}</code></>}
      </p>
    )
  }

  if (grupos.length === 0) return null

  return (
    <label className="panel-selector panel-selector--grupo">
      Grupo
      <select value={grupoFiltro} onChange={(e) => setGrupoFiltro(e.target.value)}>
        <option value="">Todos los grupos</option>
        {grupos.map((g) => (
          <option key={g.id} value={g.id}>
            {g.nombre}{puedeVerCodigos ? ` (${g.id})` : ''}
          </option>
        ))}
        <option value="sin">Sin grupo</option>
      </select>
    </label>
  )
}
