import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { recursosGenerales } from '../data/recursosDescarga.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useIndiceAcademia } from '../context/ContenidoContext.jsx'
import { totalTemas } from '../lib/panelModelo.js'
import { hrefSeguro } from '../lib/enlaceSeguro.js'
import VisibilidadGrupos from '../components/panel/VisibilidadGrupos.jsx'
import Icon from '../components/Icon.jsx'

// ============================================================
//  Temario (SOLO STAFF): visibilidad del contenido por grupo
// ------------------------------------------------------------
//  La superficie de control vive ahora en
//  `components/panel/VisibilidadGrupos.jsx`, porque es una SECCIÓN del panel
//  del director (Bloque O) y no una página aparte con un nombre que no dice lo
//  que hace. Esta página se queda como la entrada directa —enlazada en el menú
//  y en marcadores— y añade lo que solo tiene sentido aquí: el selector de
//  academia del super-admin y los recursos generales de estudio.
// ============================================================

export default function TemarioPage() {
  const { cargando, esStaff, esSuperadmin, academiaId } = useAuth()
  const [params] = useSearchParams()
  const acaParam = (params.get('aca') || '').toUpperCase()

  const [academias, setAcademias] = useState([]) // solo superadmin
  const [acaSel, setAcaSel] = useState('')
  const [grupos, setGrupos] = useState([])
  const [error, setError] = useState('')

  const academiaActiva = esSuperadmin ? acaSel : academiaId
  const { modulos: modulosTemario } = useIndiceAcademia(academiaActiva)
  const TOTAL_TEMAS = useMemo(() => totalTemas(modulosTemario), [modulosTemario])

  // Super-admin: lista de academias para elegir.
  useEffect(() => {
    if (!esSuperadmin) return undefined
    let activo = true
    ;(async () => {
      try {
        const { listarAcademias } = await import('../lib/firebase/usuarios.js')
        const lista = await listarAcademias()
        if (!activo) return
        setAcademias(lista)
        // Preselecciona la academia del enlace (?aca=CODE) si existe.
        const preferida = lista.some((a) => a.id === acaParam) ? acaParam : ''
        setAcaSel((prev) => prev || preferida || lista[0]?.id || '')
      } catch {
        if (activo) setError('No se pudieron cargar las academias.')
      }
    })()
    return () => { activo = false }
  }, [esSuperadmin]) // eslint-disable-line react-hooks/exhaustive-deps

  // Grupos de la academia activa.
  useEffect(() => {
    if (!esStaff || !academiaActiva) return undefined
    let activo = true
    ;(async () => {
      try {
        const { listarGrupos } = await import('../lib/firebase/grupos.js')
        const lista = await listarGrupos(academiaActiva)
        if (activo) setGrupos(lista)
      } catch {
        if (activo) {
          setGrupos([])
          setError('No se pudieron cargar los grupos (revisa que las reglas estén publicadas).')
        }
      }
    })()
    return () => { activo = false }
  }, [esStaff, academiaActiva])

  if (cargando) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando…</span>
      </div>
    )
  }

  // Solo staff: los alumnos ya no ven esta sección.
  if (!esStaff) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Sección del personal</h1>
        <p>El temario y el control de visibilidad son exclusivos de profesores, directores y administradores.</p>
        <Link to="/" className="btn btn--pildora btn--carbon">Volver al inicio</Link>
      </div>
    )
  }

  const selectorAcademia = esSuperadmin ? (
    <label className="panel-selector">
      Academia
      <select value={acaSel} onChange={(e) => setAcaSel(e.target.value)}>
        {academias.map((a) => (
          <option key={a.id} value={a.id}>{a.id} — {a.nombre}</option>
        ))}
      </select>
    </label>
  ) : null

  return (
    <div className="temario temario--staff">
      <header className="temario-hero">
        <span className="temario-badge">
          Temario completo · {modulosTemario.length} módulos · {TOTAL_TEMAS} temas
        </span>
        <h1>Temario y visibilidad para alumnos</h1>
        <p className="temario-desc">
          Este es el 100% del contenido de la plataforma. Elige un grupo y usa los ojos para
          decidir qué módulos y temas pueden ver sus alumnos: lo oculto desaparece de sus listas y
          aparece bloqueado en el Atlas hasta que lo liberes.
        </p>
        {error && <p className="cuenta-error" role="alert">{error}</p>}
      </header>

      <VisibilidadGrupos
        academiaId={academiaActiva}
        grupos={grupos}
        cabecera={selectorAcademia}
      />

      {recursosGenerales.length > 0 && (
        <div className="descargas descargas--general">
          <h3><Icon name="libro" size={17} /> Recursos generales de estudio</h3>
          <div className="descargas-grid">
            {recursosGenerales.map((r, i) => {
              const href = hrefSeguro(r.url)
              const dentro = (
                <>
                  <span className="descarga-ico"><Icon name="descarga" size={19} /></span>
                  <span className="descarga-txt">Descarga: {r.titulo}</span>
                </>
              )
              return href ? (
                <a key={i} className="descarga-btn" href={href} target="_blank" rel="noopener noreferrer">
                  {dentro}
                </a>
              ) : (
                <span key={i} className="descarga-btn enlace-roto" title="Enlace no válido">
                  {dentro}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
