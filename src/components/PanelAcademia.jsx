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
      <Estadisticas alumnos={alumnos} staff={staff} intentos={datos.intentos} resumen={resumen} />

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

      {gestion && <CodigosPrueba academiaId={academiaId} miUid={miUid} />}
    </>
  )
}

// ---------- Estadísticas de la academia ----------
function Estadisticas({ alumnos, staff, intentos, resumen }) {
  const stats = useMemo(() => {
    const uidsAlumnos = new Set(alumnos.map((a) => a.id))
    // Mejores calificaciones (una por alumno-fase) solo de alumnos actuales.
    const mejores = []
    let activos = 0
    const enRiesgo = []
    for (const al of alumnos) {
      const porFase = resumen[al.id]
      if (!porFase) continue
      const valores = Object.values(porFase).map((c) => c.mejor)
      if (valores.length === 0) continue
      activos += 1
      mejores.push(...valores)
      const prom = Math.round(valores.reduce((s, v) => s + v, 0) / valores.length)
      if (prom < 70) enRiesgo.push({ ...al, prom, fases: valores.length })
    }
    const promedio = mejores.length
      ? Math.round(mejores.reduce((s, v) => s + v, 0) / mejores.length)
      : null
    const aprobacion = mejores.length
      ? Math.round((mejores.filter((v) => v >= 70).length / mejores.length) * 100)
      : null
    const hace7d = Date.now() / 1000 - 7 * 24 * 3600
    const semana = intentos.filter((i) => (i.fecha?.seconds || 0) >= hace7d).length

    // Promedio de la mejor calificación por fase (entre quienes la presentaron).
    const porFase = fasesNav.map((f) => {
      const valores = alumnos
        .map((al) => resumen[al.id]?.[f.id]?.mejor)
        .filter((v) => v !== undefined)
      const prom = valores.length
        ? Math.round(valores.reduce((s, v) => s + v, 0) / valores.length)
        : null
      return { fase: f, prom, presentaron: valores.length }
    })

    const recientes = intentos.filter((i) => uidsAlumnos.has(i.uid)).slice(0, 6)
    return { promedio, aprobacion, activos, semana, porFase, recientes, enRiesgo }
  }, [alumnos, intentos, resumen])

  const fechaTxt = (f) =>
    f?.seconds ? new Date(f.seconds * 1000).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }) : '—'

  return (
    <section className="panel-estadisticas">
      <div className="pe-kpis">
        <div className="pe-kpi">
          <b>{stats.promedio === null ? '—' : `${stats.promedio}%`}</b>
          <span>Promedio general</span>
          <small>de las mejores calificaciones</small>
        </div>
        <div className="pe-kpi">
          <b>{stats.aprobacion === null ? '—' : `${stats.aprobacion}%`}</b>
          <span>Aprobación</span>
          <small>fases presentadas con ≥70%</small>
        </div>
        <div className="pe-kpi">
          <b>{stats.activos}<small className="pe-kpi-de">/{alumnos.length}</small></b>
          <span>Alumnos activos</span>
          <small>con al menos un examen</small>
        </div>
        <div className="pe-kpi">
          <b>{stats.semana}</b>
          <span>Intentos esta semana</span>
          <small>últimos 7 días</small>
        </div>
        <div className="pe-kpi">
          <b>{staff.length}</b>
          <span>Staff</span>
          <small>directores y profesores</small>
        </div>
      </div>

      <div className="pe-columnas">
        <div className="pe-card">
          <h3>Dominio por fase</h3>
          <p className="pe-card-sub">Promedio de la mejor calificación entre quienes presentaron.</p>
          <div className="pe-barras">
            {stats.porFase.map(({ fase, prom, presentaron }) => (
              <div className="pe-barra-fila" key={fase.id} style={{ '--fase-color': fase.color }}>
                <span className="pe-barra-label" title={fase.titulo}>F{fase.numero}</span>
                <div className="pe-barra-pista">
                  <div
                    className={`pe-barra ${prom !== null && prom < 70 ? 'baja' : ''}`}
                    style={{ width: prom === null ? 0 : `${Math.max(prom, 4)}%` }}
                  />
                </div>
                <span className="pe-barra-valor">
                  {prom === null ? <em>sin datos</em> : <>{prom}% <small>· {presentaron} alumno{presentaron !== 1 ? 's' : ''}</small></>}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pe-lado">
          <div className="pe-card">
            <h3>Actividad reciente</h3>
            {stats.recientes.length === 0 ? (
              <p className="panel-vacio">Todavía no hay exámenes presentados.</p>
            ) : (
              <ul className="pe-actividad">
                {stats.recientes.map((it) => (
                  <li key={it.id}>
                    <span className="pe-act-nombre">{it.nombre || '—'}</span>
                    <span className="pe-act-fase">F{it.faseNumero}</span>
                    <b className={it.porcentaje >= 70 ? 'ok' : 'mal'}>{it.porcentaje}%</b>
                    <small>{fechaTxt(it.fecha)}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="pe-card pe-card--riesgo">
            <h3>Alumnos en riesgo</h3>
            {stats.enRiesgo.length === 0 ? (
              <p className="panel-vacio">Nadie por debajo del 70% de promedio. 🎉</p>
            ) : (
              <ul className="pe-riesgo">
                {stats.enRiesgo.map((al) => (
                  <li key={al.id}>
                    <span>{al.nombre || al.email}</span>
                    <b>{al.prom}%</b>
                    <small>{al.fases} fase{al.fases !== 1 ? 's' : ''}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Códigos de acceso temporal (probar el servicio) ----------
export function CodigosPrueba({ academiaId = null, miUid }) {
  const [codigos, setCodigos] = useState(null)
  const [dias, setDias] = useState(7)
  const [nota, setNota] = useState('')
  const [nuevo, setNuevo] = useState(null) // último código creado (para copiarlo)
  const [ocupado, setOcupado] = useState(false)
  const [error, setError] = useState('')

  const cargar = async () => {
    try {
      const { listarCodigos } = await import('../lib/firebase/codigos.js')
      setCodigos(await listarCodigos(academiaId))
    } catch {
      setCodigos([])
      setError('No se pudieron cargar los códigos (revisa que las reglas estén publicadas).')
    }
  }
  useEffect(() => { cargar() }, [academiaId]) // eslint-disable-line react-hooks/exhaustive-deps

  const crear = async (e) => {
    e.preventDefault()
    setOcupado(true)
    setError('')
    try {
      const { crearCodigo } = await import('../lib/firebase/codigos.js')
      const c = await crearCodigo({ creadoPor: miUid, academiaId, dias: Number(dias), nota })
      setNuevo(c.id)
      setNota('')
      await cargar()
    } catch {
      setError('No se pudo crear el código.')
    } finally {
      setOcupado(false)
    }
  }

  const alternar = async (c) => {
    try {
      const { alternarCodigo } = await import('../lib/firebase/codigos.js')
      await alternarCodigo(c.id, c.estado === 'activo' ? 'inactivo' : 'activo')
      await cargar()
    } catch {
      setError('No se pudo cambiar el estado del código.')
    }
  }

  const copiar = (id) => {
    try { navigator.clipboard.writeText(id) } catch { /* sin permisos */ }
  }

  const ahora = Date.now()
  const estadoDe = (c) => {
    if ((c.expira?.seconds || 0) * 1000 <= ahora) return 'expirado'
    return c.estado === 'activo' ? 'activo' : 'inactivo'
  }
  const fechaTxt = (f) =>
    f?.seconds ? new Date(f.seconds * 1000).toLocaleDateString('es-MX', { dateStyle: 'medium' }) : '—'

  return (
    <section className="panel-codigos">
      <h2><Icon name="pildora" size={20} /> Códigos de prueba</h2>
      <p className="panel-gestion-sub">
        Genera códigos de acceso temporal para que alguien pruebe la plataforma sin inscribirse.
        La persona lo activa en <strong>Mi cuenta → Únete con tu código</strong>.
      </p>

      <form className="pc-form" onSubmit={crear}>
        <label>
          Vigencia
          <select value={dias} onChange={(e) => setDias(e.target.value)}>
            <option value={3}>3 días</option>
            <option value={7}>7 días</option>
            <option value={14}>14 días</option>
            <option value={30}>30 días</option>
          </select>
        </label>
        <label className="pc-nota">
          Nota (opcional)
          <input type="text" value={nota} onChange={(e) => setNota(e.target.value)} placeholder="Para quién es" maxLength={60} />
        </label>
        <button className="btn btn-primario" type="submit" disabled={ocupado}>
          {ocupado ? 'Creando…' : '+ Crear código'}
        </button>
      </form>

      {nuevo && (
        <p className="pc-nuevo" role="status">
          Código creado: <code>{nuevo}</code>
          <button className="pc-copiar" onClick={() => copiar(nuevo)}>Copiar</button>
        </p>
      )}
      {error && <p className="cuenta-error" role="alert">{error}</p>}

      {codigos === null ? null : codigos.length === 0 ? (
        <p className="panel-vacio">Aún no has creado códigos de prueba.</p>
      ) : (
        <ul className="pc-lista">
          {codigos.map((c) => {
            const est = estadoDe(c)
            return (
              <li key={c.id} className={`pc-item ${est}`}>
                <code className="pc-codigo">{c.id}</code>
                <span className="pc-detalle">
                  {c.nota && <strong>{c.nota} · </strong>}
                  expira {fechaTxt(c.expira)}
                </span>
                <span className={`pc-estado ${est}`}>{est}</span>
                <span className="pc-acciones">
                  <button className="pc-copiar" onClick={() => copiar(c.id)}>Copiar</button>
                  {est !== 'expirado' && (
                    <button className="pc-toggle" onClick={() => alternar(c)}>
                      {est === 'activo' ? 'Desactivar' : 'Reactivar'}
                    </button>
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      )}
    </section>
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
