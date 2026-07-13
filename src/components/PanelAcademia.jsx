import { useEffect, useMemo, useState } from 'react'
import { fasesNav } from '../data/navIndice.js'
import Icon from './Icon.jsx'

// ============================================================
//  Dashboard de UNA academia (compartido por toda la jerarquía)
// ------------------------------------------------------------
//  - Avance por alumno y por fase (mejor % del examen de fase + nº intentos).
//  - Historial completo al tocar un alumno.
//  - Gestión de miembros según quién mira:
//      gestion="superadmin" → cualquier rol (alumno/instructor/admin_escuela/
//                             superadmin) + activar/suspender.
//      gestion="director"   → solo alumno<->instructor + activar/suspender
//                             (nunca a sí mismo ni a otros admins).
//      gestion=null         → (instructor) solo lectura del avance.
// ============================================================

const ROLES_TODOS = ['alumno', 'instructor', 'admin_escuela', 'superadmin']
const ROLES_DIRECTOR = ['alumno', 'instructor']

export const ETIQUETA_ROL = {
  alumno: 'Alumno',
  instructor: 'Profesor',
  admin_escuela: 'Director',
  superadmin: 'Super-admin',
}

export default function PanelAcademia({ academiaId, gestion = null, miUid = null }) {
  const [datos, setDatos] = useState(null) // { miembros, intentos }
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [alumnoAbierto, setAlumnoAbierto] = useState(null)
  const [recarga, setRecarga] = useState(0)

  useEffect(() => {
    if (!academiaId) return
    let activo = true
    setCargando(true)
    setError('')
    ;(async () => {
      try {
        const [{ miembrosDeAcademia }, { intentosDeAcademia }] = await Promise.all([
          import('../lib/firebase/usuarios.js'),
          import('../lib/firebase/intentos.js'),
        ])
        const [miembros, intentos] = await Promise.all([
          miembrosDeAcademia(academiaId),
          intentosDeAcademia(academiaId),
        ])
        if (!activo) return
        setDatos({ miembros, intentos })
      } catch {
        if (activo) setError('No se pudo cargar la información. Revisa tu conexión o tus permisos.')
      } finally {
        if (activo) setCargando(false)
      }
    })()
    return () => { activo = false }
  }, [academiaId, recarga])

  // Agrega los intentos por alumno y por fase: { uid: { faseId: { mejor, n, ultimo } } }
  const resumen = useMemo(() => {
    const map = {}
    for (const it of datos?.intentos || []) {
      const porFase = (map[it.uid] = map[it.uid] || {})
      const celda = (porFase[it.faseId] = porFase[it.faseId] || { mejor: 0, n: 0, ultimo: null })
      celda.n += 1
      if (it.porcentaje >= celda.mejor) celda.mejor = it.porcentaje
      const seg = it.fecha?.seconds || 0
      if (!celda.ultimo || seg > celda.ultimo) celda.ultimo = seg
    }
    return map
  }, [datos])

  if (cargando) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando academia…</span>
      </div>
    )
  }
  if (error) return <p className="cuenta-error" role="alert">{error}</p>
  if (!datos) return null

  const alumnos = datos.miembros.filter((m) => m.rol === 'alumno')
  const staff = datos.miembros.filter((m) => m.rol !== 'alumno')
  const fechaTxt = (seg) => (seg ? new Date(seg * 1000).toLocaleDateString('es-MX') : '')

  return (
    <>
      <div className="panel-stats">
        <span><strong>{alumnos.length}</strong> alumnos</span>
        <span><strong>{staff.length}</strong> staff</span>
        <span><strong>{datos.intentos.length}</strong> intentos de examen</span>
      </div>

      {alumnos.length === 0 ? (
        <p className="panel-vacio">
          Aún no hay alumnos en esta academia. Compárteles el código
          <strong> {academiaId} </strong>
          para que se unan desde su cuenta.
        </p>
      ) : (
        <div className="panel-tabla-wrap">
          <table className="panel-tabla">
            <thead>
              <tr>
                <th>Alumno</th>
                {fasesNav.map((f) => (
                  <th key={f.id} title={f.titulo}>F{f.numero}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alumnos.map((al) => {
                const porFase = resumen[al.id] || {}
                const abierto = alumnoAbierto === al.id
                return (
                  <tr
                    key={al.id}
                    className={abierto ? 'abierto' : ''}
                    onClick={() => setAlumnoAbierto(abierto ? null : al.id)}
                  >
                    <td className="panel-alumno">
                      <strong>{al.nombre || al.email || al.id}</strong>
                      {al.estado !== 'activo' && <span className="panel-tag-suspendido">suspendido</span>}
                    </td>
                    {fasesNav.map((f) => {
                      const c = porFase[f.id]
                      if (!c) return <td key={f.id} className="panel-celda-vacia">—</td>
                      const nivel = c.mejor >= 70 ? 'ok' : 'mal'
                      return (
                        <td key={f.id} className={`panel-celda ${nivel}`} title={`Último intento: ${fechaTxt(c.ultimo)}`}>
                          <b>{c.mejor}%</b>
                          <small>×{c.n}</small>
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {alumnoAbierto && (
        <DetalleAlumno
          alumno={alumnos.find((a) => a.id === alumnoAbierto)}
          intentos={datos.intentos.filter((i) => i.uid === alumnoAbierto)}
          onCerrar={() => setAlumnoAbierto(null)}
        />
      )}

      <p className="panel-nota">
        Cada celda muestra la <strong>mejor calificación</strong> del examen de fase y el número de
        intentos (×n). Toca un alumno para ver su historial completo.
      </p>

      {gestion && (
        <GestionMiembros
          miembros={datos.miembros}
          gestion={gestion}
          miUid={miUid}
          onCambio={() => setRecarga((n) => n + 1)}
        />
      )}
    </>
  )
}

// Historial completo de intentos de un alumno.
export function DetalleAlumno({ alumno, intentos, onCerrar }) {
  if (!alumno) return null
  const fechaTxt = (f) =>
    f?.seconds ? new Date(f.seconds * 1000).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }) : '—'
  return (
    <section className="panel-detalle" aria-label={`Historial de ${alumno.nombre}`}>
      <header>
        <h2>{alumno.nombre || alumno.email}</h2>
        <button className="btn btn-secundario" onClick={onCerrar}>Cerrar</button>
      </header>
      {intentos.length === 0 ? (
        <p className="panel-vacio">Este alumno aún no presenta ningún examen de fase.</p>
      ) : (
        <ul className="panel-intentos">
          {intentos.map((it) => (
            <li key={it.id} className={it.porcentaje >= 70 ? 'ok' : 'mal'}>
              <span className="pi-fase">Fase {it.faseNumero}</span>
              <span className="pi-titulo">{it.faseTitulo}</span>
              <span className="pi-nota">{it.aciertos}/{it.total} · <b>{it.porcentaje}%</b></span>
              <span className="pi-fecha">{fechaTxt(it.fecha)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

// Tabla de miembros con cambio de rol y de estado, según jerarquía.
function GestionMiembros({ miembros, gestion, miUid, onCambio }) {
  const [ocupado, setOcupado] = useState(null) // uid en proceso
  const [error, setError] = useState('')

  const rolesDisponibles = gestion === 'superadmin' ? ROLES_TODOS : ROLES_DIRECTOR

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
      const { actualizarUsuario } = await import('../lib/firebase/usuarios.js')
      await actualizarUsuario(uid, cambios)
      onCambio()
    } catch {
      setError('No se pudo aplicar el cambio (revisa permisos o conexión).')
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
      <div className="panel-tabla-wrap">
        <table className="panel-tabla panel-tabla--gestion">
          <thead>
            <tr>
              <th>Miembro</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {miembros.map((m) => {
              const puede = editable(m)
              const suspendido = m.estado && m.estado !== 'activo'
              return (
                <tr key={m.id} className="panel-fila-gestion">
                  <td className="panel-alumno">
                    <strong>{m.nombre || '—'}</strong>
                    {m.id === miUid && <span className="panel-tag-yo">tú</span>}
                  </td>
                  <td className="panel-correo">{m.email || '—'}</td>
                  <td>
                    {puede ? (
                      <select
                        className="panel-rol-select"
                        value={m.rol}
                        disabled={ocupado === m.id}
                        onChange={(e) => aplicar(m.id, { rol: e.target.value })}
                      >
                        {rolesDisponibles.map((r) => (
                          <option key={r} value={r}>{ETIQUETA_ROL[r]}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`panel-rol-tag rol-${m.rol}`}>{ETIQUETA_ROL[m.rol] || m.rol}</span>
                    )}
                  </td>
                  <td>
                    {puede ? (
                      <button
                        className={`panel-estado-btn ${suspendido ? 'suspendido' : 'activo'}`}
                        disabled={ocupado === m.id}
                        onClick={() => aplicar(m.id, { estado: suspendido ? 'activo' : 'suspendido' })}
                      >
                        {ocupado === m.id ? '…' : suspendido ? 'Reactivar' : 'Suspender'}
                      </button>
                    ) : (
                      <span className={`panel-rol-tag ${suspendido ? 'rol-suspendido' : 'rol-activo'}`}>
                        {suspendido ? 'Suspendido' : 'Activo'}
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
