import { useMemo, useState } from 'react'
import { Link, NavLink, Navigate, Outlet, useOutletContext } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useIndiceAcademia } from '../../context/ContenidoContext.jsx'
import { pasaFiltroGrupo, seccionesPanel } from '../../lib/panelModelo.js'
import { gruposDelPanel, filtroDeGrupoDelPanel } from '../../lib/gruposDeUsuario.js'
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
    // Grupo con el que este profesor está trabajando, y cómo cambiarlo.
    grupoId: grupoActivoId, elegirGrupo,
  } = useAuth()
  const datos = useDatosAcademia(academiaId)
  const { modulos } = useIndiceAcademia(academiaId)

  // Un profesor solo ve SUS grupos: no tiene por qué ver el avance de los de
  // otro. Antes eso se resolvía fijándolo a `perfil.grupoId`, un único campo, y
  // por eso una maestra con tres grupos en el sistema tenía uno. Ahora se
  // resuelve con su lista, y el que ve es el que tiene ABIERTO —el mismo que
  // usará el resto de la aplicación—, no uno distinto por pantalla.
  const esDirector = rol === 'admin_escuela'
  const misGrupos = useMemo(
    () => gruposDelPanel({ rol, perfil, gruposDeAcademia: datos.grupos }),
    [rol, perfil, datos.grupos]
  )
  // Al profesor con UN solo grupo se le sigue enseñando cuál es, sin selector.
  const soloGrupo = !esDirector && misGrupos.length === 1 ? misGrupos[0].id : null
  const [grupoFiltro, setGrupoFiltro] = useState('') // director: '' = todos; 'sin' = sin grupo

  // El director filtra libremente; el profesor está acotado a lo suyo, y su
  // filtro NO es un estado aparte: es el grupo activo de la sesión. `null`
  // significa NINGUNO —profesor sin grupos asignados—, que no es lo mismo que
  // `''` (todos). Ver filtroDeGrupoDelPanel.
  const filtroEfectivo = filtroDeGrupoDelPanel({
    rol, misGrupos, grupoActivoId, filtroDirector: grupoFiltro,
  })

  const alumnos = useMemo(
    () => (filtroEfectivo === null
      ? []
      : datos.miembros.filter((m) => m.rol === 'alumno' && pasaFiltroGrupo(m, filtroEfectivo))),
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
      grupoFiltro: filtroEfectivo ?? '',
      setGrupoFiltro,
      // Lo que el selector puede ofrecer y cómo cambiarlo. El director elige
      // sobre todos los grupos de la academia; el profesor, sobre los suyos, y
      // su elección cambia el grupo ACTIVO de la sesión, no un filtro local.
      esDirector,
      misGrupos,
      elegirGrupo,
      alumnos,
      staff,
      modulos,
      nombreGrupo: (id) => datos.grupos.find((g) => g.id === id)?.nombre || id,
    }),
    [datos, academiaId, academia, esDirector, user, soloGrupo, filtroEfectivo, alumnos, staff, modulos, rol, puedeVerCodigos, misGrupos, elegirGrupo]
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

// Selector de grupo del panel. Tres formas, según quién mira:
//
//   · DIRECTOR   → todos los grupos de la academia, más «sin grupo».
//   · PROFESOR con varios → solo los suyos, y elegir cambia el grupo ACTIVO de
//     la sesión, no un filtro de esta pantalla. Es a propósito: la maestra
//     trabaja con UN grupo a la vez, y que el panel, el temario y (más
//     adelante) la clase en vivo hablen del mismo evita el error de calificar
//     al grupo equivocado por haberlo cambiado solo en una pantalla.
//   · PROFESOR con uno solo → se le dice cuál es, sin desplegable.
export function FiltroGrupo() {
  const {
    grupos, grupoFiltro, setGrupoFiltro, soloGrupo, nombreGrupo,
    esDirector, misGrupos, elegirGrupo,
  } = usePanel()
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

  if (!esDirector) {
    // Sin grupos asignados no hay nada que ofrecer, y decirlo es mejor que
    // enseñar un desplegable vacío: la acción que falta es de su director.
    if (misGrupos.length === 0) {
      return (
        <p className="panel-grupo-aviso">
          <Icon name="usuario" size={16} /> Todavía no tienes ningún grupo asignado.
          Pídeselo al director de tu academia.
        </p>
      )
    }
    return (
      <label className="panel-selector panel-selector--grupo">
        Trabajando con
        <select value={grupoFiltro} onChange={(e) => elegirGrupo(e.target.value)}>
          {misGrupos.map((g) => (
            <option key={g.id} value={g.id}>
              {g.nombre}{puedeVerCodigos ? ` (${g.id})` : ''}
            </option>
          ))}
        </select>
      </label>
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
