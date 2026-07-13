import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import PanelAcademia from '../components/PanelAcademia.jsx'
import PersonalizacionAcademia from '../components/PersonalizacionAcademia.jsx'
import { ETIQUETA_PLAN, ETIQUETA_TIPO, planEfectivo } from '../lib/capacidades.js'
import Icon from '../components/Icon.jsx'

// Dashboard individual de UNA academia, visto por el SUPER-ADMIN
// (/admin/academia/:academiaId): datos de la academia + activar/suspender +
// avance de alumnos + gestión completa de miembros y roles.
export default function AcademiaAdminPage() {
  const { academiaId } = useParams()
  const { cargando, esSuperadmin, user } = useAuth()
  const navigate = useNavigate()

  const [academia, setAcademia] = useState(undefined) // undefined = cargando; null = no existe
  const [ocupado, setOcupado] = useState(false)
  const [error, setError] = useState('')
  const [editandoCodigo, setEditandoCodigo] = useState(false)
  const [codigoNuevo, setCodigoNuevo] = useState('')
  const [migrando, setMigrando] = useState(false)

  useEffect(() => {
    if (!esSuperadmin || !academiaId) return
    let activo = true
    setAcademia(undefined)
    ;(async () => {
      try {
        const { obtenerAcademia } = await import('../lib/firebase/usuarios.js')
        const a = await obtenerAcademia(academiaId)
        if (activo) setAcademia(a)
      } catch {
        if (activo) setAcademia(null)
      }
    })()
    return () => { activo = false }
  }, [esSuperadmin, academiaId])

  if (cargando || (esSuperadmin && academia === undefined)) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando…</span>
      </div>
    )
  }

  if (!esSuperadmin) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Solo super-administradores</h1>
        <p>Este dashboard es exclusivo del administrador de la plataforma.</p>
        <Link to="/" className="btn-pildora btn-pildora--solido">Volver al inicio</Link>
      </div>
    )
  }

  if (!academia) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="alerta" size={30} /></span>
        <h1>Academia no encontrada</h1>
        <p>No existe una academia con el código <strong>{academiaId}</strong>.</p>
        <Link to="/admin" className="btn-pildora btn-pildora--solido">← Volver al dashboard</Link>
      </div>
    )
  }

  const activa = academia.estado === 'activo'

  const alternarEstado = async () => {
    setOcupado(true)
    setError('')
    try {
      const { actualizarAcademia } = await import('../lib/firebase/usuarios.js')
      const estado = activa ? 'suspendida' : 'activo'
      await actualizarAcademia(academia.id, { estado })
      setAcademia({ ...academia, estado })
    } catch {
      setError('No se pudo cambiar el estado de la academia.')
    } finally {
      setOcupado(false)
    }
  }

  // Cambia el código (ID) de la academia migrando todas sus referencias.
  const cambiarCodigo = async (e) => {
    e.preventDefault()
    const seguro = window.confirm(
      `¿Cambiar el código ${academia.id} → ${codigoNuevo.trim().toUpperCase()}?\n\n` +
      'Se migran todos sus usuarios, grupos, códigos, intentos y solicitudes. ' +
      'El código anterior dejará de funcionar.'
    )
    if (!seguro) return
    setMigrando(true)
    setError('')
    try {
      const { cambiarCodigoAcademia } = await import('../lib/firebase/admin.js')
      const nuevo = await cambiarCodigoAcademia(academia.id, codigoNuevo)
      navigate(`/admin/academia/${nuevo}`, { replace: true })
    } catch (err) {
      setError(err?.message || 'No se pudo cambiar el código de la academia.')
    } finally {
      setMigrando(false)
      setEditandoCodigo(false)
    }
  }

  return (
    <div className="panel-page admin-page">
      <nav className="migas">
        <Link to="/admin">Dashboard general</Link> <span>/</span> {academia.id}
      </nav>

      <header className="panel-header">
        <div>
          <h1><Icon name="temario" size={24} /> {academia.nombre || academia.id}</h1>
          <p>
            Código <strong>{academia.id}</strong>
            {' · '}<strong>{ETIQUETA_TIPO[academia.tipo] || academia.tipo || 'Paramédico básico'}</strong>
            {' · '}plan <strong>{ETIQUETA_PLAN[planEfectivo(academia)]}</strong>
            {academia.plan ? <> · facturación <strong>{academia.plan}</strong></> : null}
          </p>
        </div>
        <div className="admin-academia-acciones">
          <span className={`aa-estado ${activa ? 'ok' : 'mal'}`}>{activa ? 'Activa' : 'Suspendida'}</span>
          <button
            className={`panel-estado-btn ${activa ? 'activo' : 'suspendido'}`}
            onClick={alternarEstado}
            disabled={ocupado}
          >
            {ocupado ? '…' : activa ? 'Suspender academia' : 'Reactivar academia'}
          </button>
          <button
            className="panel-estado-btn"
            onClick={() => { setEditandoCodigo((v) => !v); setCodigoNuevo(''); setError('') }}
            disabled={migrando}
          >
            Cambiar código
          </button>
        </div>
      </header>

      {editandoCodigo && (
        <form className="admin-form admin-form--codigo" onSubmit={cambiarCodigo}>
          <label>
            Nuevo código de la academia
            <input
              type="text"
              value={codigoNuevo}
              onChange={(e) => setCodigoNuevo(e.target.value.toUpperCase())}
              placeholder={`${academia.id} → p. ej. AEP-2027`}
              required
            />
          </label>
          <button className="btn btn-primario" type="submit" disabled={migrando}>
            {migrando ? 'Migrando todo…' : 'Cambiar y migrar'}
          </button>
          <p className="panel-gestion-sub" style={{ flexBasis: '100%' }}>
            Se migran usuarios, grupos, códigos, intentos y solicitudes al código nuevo.
            El código anterior deja de funcionar (avisa a la academia).
          </p>
        </form>
      )}

      {error && <p className="cuenta-error" role="alert">{error}</p>}

      <PanelAcademia academiaId={academia.id} academiaNombre={academia.nombre || ''} gestion="superadmin" miUid={user?.uid} />

      <PersonalizacionAcademia
        academia={academia}
        onGuardado={async () => {
          const { obtenerAcademia } = await import('../lib/firebase/usuarios.js')
          setAcademia(await obtenerAcademia(academia.id))
        }}
      />
    </div>
  )
}
