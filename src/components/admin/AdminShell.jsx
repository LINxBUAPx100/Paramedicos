import { useCallback, useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet, useOutletContext } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { registrar } from '../../lib/registro.js'
import Icon from '../Icon.jsx'

// ============================================================
//  Consola del super-admin — armazón (Bloque N)
// ------------------------------------------------------------
//  /admin era UNA página de 736 líneas con todo apilado en vertical:
//  academias, todos los usuarios de la plataforma, problemas, alta de
//  academia, alta de usuario y facturación. Sin resumen, sin navegación y sin
//  jerarquía. Encima, tres superficies desconectadas para lo mismo: /admin,
//  /admin/replicacion y la facturación dentro de la primera.
//
//  Ahora hay un armazón con navegación propia y una página por entidad. Los
//  datos pesados (academias, usuarios, intentos) se cargan UNA VEZ aquí y
//  bajan por el contexto del Outlet: cambiar de sección no vuelve a leer
//  Firestore, que es lo que pasaría si cada página cargara lo suyo.
// ============================================================

const SECCIONES = [
  { to: '/admin', end: true, icono: 'progreso', etiqueta: 'Resumen' },
  { to: '/admin/academias', icono: 'temario', etiqueta: 'Academias' },
  { to: '/admin/usuarios', icono: 'usuario', etiqueta: 'Usuarios' },
  { to: '/admin/contenido', icono: 'capas', etiqueta: 'Contenido' },
  { to: '/admin/facturacion', icono: 'pildora', etiqueta: 'Facturación' },
  { to: '/admin/incidencias', icono: 'alerta', etiqueta: 'Incidencias' },
  { to: '/admin/logs', icono: 'reloj', etiqueta: 'Actividad' },
]

export function useAdmin() {
  return useOutletContext()
}

export default function AdminShell() {
  const { cargando, esSuperadmin, user } = useAuth()
  const [datos, setDatos] = useState(null) // { academias, usuarios, intentos }
  const [cargandoDatos, setCargandoDatos] = useState(true)
  const [error, setError] = useState('')
  const [recarga, setRecarga] = useState(0)

  const refrescar = useCallback(() => setRecarga((n) => n + 1), [])

  useEffect(() => {
    if (!esSuperadmin) return undefined
    let activo = true
    setCargandoDatos(true)
    setError('')
    ;(async () => {
      try {
        const [{ listarAcademias, listarUsuarios }, { listarIntentos }] = await Promise.all([
          import('../../lib/firebase/usuarios.js'),
          import('../../lib/firebase/intentos.js'),
        ])
        const [academias, usuarios, intentos] = await Promise.all([
          listarAcademias(), listarUsuarios(), listarIntentos(),
        ])
        if (!activo) return
        setDatos({ academias, usuarios, intentos })
      } catch (err) {
        registrar('admin:cargar', err)
        if (activo) setError('No se pudo cargar la plataforma. Verifica que las reglas de Firestore estén publicadas.')
      } finally {
        if (activo) setCargandoDatos(false)
      }
    })()
    return () => { activo = false }
  }, [esSuperadmin, recarga])

  // Recuento por academia: lo usan el resumen y la lista, así que se calcula
  // una vez aquí y no en cada página.
  const porAcademia = useMemo(() => {
    const map = {}
    for (const u of datos?.usuarios || []) {
      if (!u.academiaId) continue
      const c = (map[u.academiaId] = map[u.academiaId] || { alumnos: 0, staff: 0, intentos: 0 })
      if (u.rol === 'alumno') c.alumnos += 1
      else c.staff += 1
    }
    for (const it of datos?.intentos || []) {
      if (!it.academiaId) continue
      const c = (map[it.academiaId] = map[it.academiaId] || { alumnos: 0, staff: 0, intentos: 0 })
      c.intentos += 1
    }
    return map
  }, [datos])

  const contexto = useMemo(
    () => ({
      academias: datos?.academias || [],
      usuarios: datos?.usuarios || [],
      intentos: datos?.intentos || [],
      porAcademia,
      cargandoDatos,
      refrescar,
      miUid: user?.uid || null,
    }),
    [datos, porAcademia, cargandoDatos, refrescar, user]
  )

  if (cargando) {
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
        <p>Esta consola es exclusiva de la administración de la plataforma.</p>
      </div>
    )
  }

  return (
    <div className="consola">
      <nav className="consola-nav" aria-label="Secciones de administración">
        <span className="consola-marca"><Icon name="capas" size={18} /> Plataforma</span>
        {SECCIONES.map((s) => (
          <NavLink key={s.to} to={s.to} end={s.end} className="consola-link">
            <Icon name={s.icono} size={17} />
            <span>{s.etiqueta}</span>
          </NavLink>
        ))}
      </nav>

      <div className="consola-cuerpo">
        {error && <p className="cuenta-error" role="alert">{error}</p>}
        {cargandoDatos && !datos ? (
          <div className="ruta-cargando" role="status">
            <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando plataforma…</span>
          </div>
        ) : (
          <Outlet context={contexto} />
        )}
      </div>
    </div>
  )
}
