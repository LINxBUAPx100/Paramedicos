import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { recursosGenerales } from '../data/recursosDescarga.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useIndiceAcademia } from '../context/ContenidoContext.jsx'
import { totalTemas } from '../lib/panelModelo.js'
import { hrefSeguro } from '../lib/enlaceSeguro.js'
import VisibilidadGrupos from '../components/panel/VisibilidadGrupos.jsx'
import { TarjetasDeAcademia, TarjetasDeGrupo, PasosDeEspacio } from '../components/panel/ElegirEspacio.jsx'
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
//
//  DESDE EL 02-09-2026 SE ENTRA POR PASOS: academia → grupo → temario.
//
//  Antes se entraba directamente al temario con dos desplegables arriba. Caben
//  en una línea y por eso parecían suficientes, pero un `<option>` solo puede
//  decir el nombre del grupo: ni a qué hora da clase, ni de qué generación es,
//  ni quién lo lleva. Con varias generaciones abiertas a la vez, eso se elegía
//  de memoria.
//
//  El paso de academia SE SALTA SOLO cuando hay una sola. Obligar a un director
//  a elegir entre una opción no es un paso, es un obstáculo; el super-admin sí
//  lo necesita porque opera varias.
// ============================================================

// El grupo elegido, recordado por navegador. Misma clave y mismo motivo que el
// grupo activo de AuthContext: es una preferencia de lectura, no una credencial.
const CLAVE_GRUPO = 'ptem:temario:grupo'
const leerGrupoRecordado = () => {
  try { return localStorage.getItem(CLAVE_GRUPO) || '' } catch { return '' }
}
const recordarGrupo = (id) => {
  try {
    if (id) localStorage.setItem(CLAVE_GRUPO, id)
    else localStorage.removeItem(CLAVE_GRUPO)
  } catch { /* almacenamiento bloqueado: la elección dura lo que la sesión */ }
}

export default function TemarioPage() {
  const { cargando, esStaff, esSuperadmin, academiaId, rol, user, puedeVerCodigos } = useAuth()
  const [params] = useSearchParams()
  const acaParam = (params.get('aca') || '').toUpperCase()

  const [academias, setAcademias] = useState([]) // solo superadmin
  const [acaSel, setAcaSel] = useState('')
  const [grupos, setGrupos] = useState([])
  const [error, setError] = useState('')
  // El grupo elegido en las tarjetas. Vive en el navegador y no en el perfil
  // porque es una preferencia de trabajo, no un permiso: perderla no rompe
  // nada, y guardarla costaría una escritura cada vez que se cambia de grupo.
  const [grupoSel, setGrupoSel] = useState(() => leerGrupoRecordado())

  const academiaActiva = esSuperadmin ? acaSel : academiaId
  const grupoElegido = grupos.find((g) => g.id === grupoSel) || null
  const nombreAcademia = academias.find((a) => a.id === academiaActiva)?.nombre || academiaActiva
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
        // Ya NO se preselecciona la primera de la lista: con tarjetas, entrar
        // a una academia cualquiera «porque era la primera» es justo lo que
        // este paso viene a evitar. Solo manda el enlace con ?aca=CODE.
        const preferida = lista.some((a) => a.id === acaParam) ? acaParam : ''
        setAcaSel((prev) => prev || preferida || '')
      } catch {
        if (activo) setError('No se pudieron cargar las academias.')
      }
    })()
    return () => { activo = false }
  }, [esSuperadmin]) // eslint-disable-line react-hooks/exhaustive-deps

  // Cambiar de academia invalida el grupo elegido: era de la otra.
  useEffect(() => { setGrupoSel('') }, [academiaActiva])

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

  const elegirGrupo = (id) => {
    setGrupoSel(id)
    recordarGrupo(id)
  }

  // PASO 1 — academia. Solo cuando hay más de una que elegir.
  if (esSuperadmin && !academiaActiva) {
    return (
      <div className="temario temario--staff">
        <header className="temario-hero">
          <h1>Elige una academia</h1>
          <p className="temario-desc">
            Operas varias academias. Elige en cuál vas a trabajar; después eliges el grupo.
          </p>
          {error && <p className="cuenta-error" role="alert">{error}</p>}
        </header>
        {academias.length === 0
          ? <p className="panel-vacio">Todavía no hay academias en la plataforma.</p>
          : <TarjetasDeAcademia academias={academias} onElegir={setAcaSel} />}
      </div>
    )
  }

  // PASO 2 — grupo.
  if (!grupoElegido) {
    return (
      <div className="temario temario--staff">
        <header className="temario-hero">
          <PasosDeEspacio
            academia={nombreAcademia}
            onVolverAcademia={esSuperadmin ? () => setAcaSel('') : null}
          />
          <h1>Elige un grupo</h1>
          <p className="temario-desc">
            El grupo decide qué temario estás mirando y para quién ocultas o liberas contenido.
            Si alguno tiene clase ahora mismo, aparece primero.
          </p>
          {error && <p className="cuenta-error" role="alert">{error}</p>}
        </header>
        <TarjetasDeGrupo
          grupos={grupos}
          rol={rol}
          uid={user?.uid || null}
          esSuperadmin={esSuperadmin}
          verCodigo={puedeVerCodigos}
          onElegir={elegirGrupo}
        />
      </div>
    )
  }

  // PASO 3 — el temario del grupo elegido.
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
        grupoForzado={grupoElegido.id}
        onCambiarGrupo={() => setGrupoSel('')}
        cabecera={(
          <PasosDeEspacio
            academia={nombreAcademia}
            grupo={grupoElegido.nombre || grupoElegido.id}
            onVolverAcademia={esSuperadmin ? () => setAcaSel('') : null}
            onVolverGrupo={() => setGrupoSel('')}
          />
        )}
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
