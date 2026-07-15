import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { recursosGenerales } from '../data/recursosDescarga.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useIndiceAcademia } from '../context/ContenidoContext.jsx'
import Icon from '../components/Icon.jsx'

// ============================================================
//  Temario (SOLO STAFF): dashboard de visibilidad por grupo
// ------------------------------------------------------------
//  Muestra el 100% del contenido real de la web (8 fases · todos sus temas)
//  y permite decidir qué ve cada GRUPO de alumnos:
//    · Botón global  "Ocultar todo / Mostrar todo"
//    · Ojo por MÓDULO (fase): oculta/muestra el módulo completo
//    · Ojo por TEMA: oculta/muestra ese tema individual
//  Lo oculto desaparece de las listas del alumno y sale censurado en el Atlas.
// ============================================================

export default function TemarioPage() {
  const { cargando, esStaff, esSuperadmin, academiaId, grupoId: miGrupoId, puedeVerCodigos } = useAuth()
  const [params] = useSearchParams()
  const acaParam = (params.get('aca') || '').toUpperCase()

  const [academias, setAcademias] = useState([]) // solo superadmin
  const [acaSel, setAcaSel] = useState('')
  const [grupos, setGrupos] = useState(null) // null = cargando
  const [grupoSel, setGrupoSel] = useState('')
  const [ocultas, setOcultas] = useState({ fases: [], temas: [] })
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [aplicado, setAplicado] = useState(false)

  const academiaActiva = esSuperadmin ? acaSel : academiaId
  // Temario de LA ACADEMIA gestionada: su copia si está migrada, bundle si no.
  const { fases: fasesTemario } = useIndiceAcademia(academiaActiva)
  const TODAS_LAS_FASES = useMemo(() => fasesTemario.map((f) => f.id), [fasesTemario])
  const TOTAL_TEMAS = useMemo(
    () => fasesTemario.reduce((s, f) => s + f.temas.length, 0),
    [fasesTemario]
  )

  // Super-admin: lista de academias para elegir.
  useEffect(() => {
    if (!esSuperadmin) return
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
  }, [esSuperadmin])

  // Grupos de la academia activa.
  useEffect(() => {
    if (!esStaff || !academiaActiva) return
    let activo = true
    setGrupos(null)
    ;(async () => {
      try {
        const { listarGrupos } = await import('../lib/firebase/grupos.js')
        const lista = await listarGrupos(academiaActiva)
        if (!activo) return
        setGrupos(lista)
        // Preselección: el grupo propio del profesor si existe; si no, el primero.
        setGrupoSel((prev) => {
          if (prev && lista.some((g) => g.id === prev)) return prev
          if (miGrupoId && lista.some((g) => g.id === miGrupoId)) return miGrupoId
          return lista[0]?.id || ''
        })
      } catch {
        if (activo) { setGrupos([]); setError('No se pudieron cargar los grupos (revisa que las reglas estén publicadas).') }
      }
    })()
    return () => { activo = false }
  }, [esStaff, academiaActiva, miGrupoId])

  // Al cambiar de grupo, carga su visibilidad actual.
  const grupo = useMemo(() => (grupos || []).find((g) => g.id === grupoSel) || null, [grupos, grupoSel])
  useEffect(() => {
    setOcultas({ fases: grupo?.fasesOcultas || [], temas: grupo?.temasOcultos || [] })
  }, [grupo])

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
        <Link to="/" className="btn-pildora btn-pildora--solido">Volver al inicio</Link>
      </div>
    )
  }

  // Escribe la visibilidad en el grupo (optimista, revierte si falla).
  const guardar = async (nuevas) => {
    if (!grupo) return
    const previas = ocultas
    setOcultas(nuevas)
    setGuardando(true)
    setError('')
    try {
      const [{ db }, fs] = await Promise.all([
        import('../lib/firebase/init.js'),
        import('firebase/firestore'),
      ])
      await fs.updateDoc(fs.doc(db, 'grupos', grupo.id), {
        fasesOcultas: nuevas.fases,
        temasOcultos: nuevas.temas,
      })
      // Refleja el cambio en la lista local de grupos (para no perderlo al cambiar).
      setGrupos((gs) => gs.map((g) =>
        g.id === grupo.id ? { ...g, fasesOcultas: nuevas.fases, temasOcultos: nuevas.temas } : g
      ))
    } catch (err) {
      setOcultas(previas)
      setError(
        String(err?.code || '').includes('permission-denied')
          ? 'Sin permisos: publica las reglas actualizadas de firestore.rules en la consola.'
          : 'No se pudo guardar el cambio.'
      )
    } finally {
      setGuardando(false)
    }
  }

  const faseOculta = (fid) => ocultas.fases.includes(fid)
  const temaOcultoSolo = (tid) => ocultas.temas.includes(tid)

  const toggleFase = (fase) => {
    if (faseOculta(fase.id)) {
      // Mostrar TODO el módulo: quita la fase y sus temas individuales.
      const idsTemas = fase.temas.map((t) => t.id)
      guardar({
        fases: ocultas.fases.filter((f) => f !== fase.id),
        temas: ocultas.temas.filter((t) => !idsTemas.includes(t)),
      })
    } else {
      guardar({ ...ocultas, fases: [...ocultas.fases, fase.id] })
    }
  }

  const toggleTema = (tid) => {
    guardar({
      ...ocultas,
      temas: temaOcultoSolo(tid)
        ? ocultas.temas.filter((t) => t !== tid)
        : [...ocultas.temas, tid],
    })
  }

  const todoOculto = ocultas.fases.length === TODAS_LAS_FASES.length
  const toggleTodo = () => {
    guardar(todoOculto ? { fases: [], temas: [] } : { fases: [...TODAS_LAS_FASES], temas: [] })
  }

  // Replica la configuración actual a TODOS los grupos de la academia a la vez.
  const aplicarATodos = async () => {
    if (!grupos || grupos.length < 2) return
    const ok = window.confirm(
      `¿Aplicar esta configuración de acceso a los ${grupos.length} grupos de la academia?\n\n` +
      'Sobrescribe lo que cada grupo tenga configurado ahora mismo.'
    )
    if (!ok) return
    setGuardando(true)
    setError('')
    setAplicado(false)
    try {
      const [{ db }, fs] = await Promise.all([
        import('../lib/firebase/init.js'),
        import('firebase/firestore'),
      ])
      const batch = fs.writeBatch(db)
      grupos.forEach((g) => {
        batch.update(fs.doc(db, 'grupos', g.id), {
          fasesOcultas: ocultas.fases,
          temasOcultos: ocultas.temas,
        })
      })
      await batch.commit()
      setGrupos((gs) => gs.map((g) => ({ ...g, fasesOcultas: ocultas.fases, temasOcultos: ocultas.temas })))
      setAplicado(true)
      setTimeout(() => setAplicado(false), 3000)
    } catch (err) {
      setError(
        String(err?.code || '').includes('permission-denied')
          ? 'Sin permisos: publica las reglas actualizadas de firestore.rules en la consola.'
          : 'No se pudo aplicar a todos los grupos.'
      )
    } finally {
      setGuardando(false)
    }
  }

  const temasOcultosTotal = fasesTemario.reduce((s, f) => {
    if (faseOculta(f.id)) return s + f.temas.length
    return s + f.temas.filter((t) => temaOcultoSolo(t.id)).length
  }, 0)

  return (
    <div className="temario temario--staff">
      <header className="temario-hero">
        <span className="temario-badge">Temario completo · {fasesTemario.length} fases · {TOTAL_TEMAS} temas</span>
        <h1>Temario y visibilidad para alumnos</h1>
        <p className="temario-desc">
          Este es el 100% del contenido de la plataforma. Elige un grupo y usa los ojos para
          decidir qué fases y temas pueden ver sus alumnos: lo oculto desaparece de sus listas y
          aparece bloqueado en el Atlas hasta que lo liberes.
        </p>

        <div className="temario-controles">
          {esSuperadmin && (
            <label className="panel-selector">
              Academia
              <select value={acaSel} onChange={(e) => { setAcaSel(e.target.value); setGrupoSel('') }}>
                {academias.map((a) => (
                  <option key={a.id} value={a.id}>{a.id} — {a.nombre}</option>
                ))}
              </select>
            </label>
          )}
          {grupos && grupos.length > 0 && (
            <label className="panel-selector">
              Grupo
              <select value={grupoSel} onChange={(e) => setGrupoSel(e.target.value)}>
                {grupos.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.nombre}{puedeVerCodigos ? ` (${g.id})` : ''}
                  </option>
                ))}
              </select>
            </label>
          )}
          {grupo && (
            <button className="btn btn-secundario temario-toggle-todo" onClick={toggleTodo} disabled={guardando}>
              {todoOculto ? 'Mostrar todo' : 'Ocultar todo'}
            </button>
          )}
          {grupo && grupos && grupos.length > 1 && (
            <button className="btn btn-primario temario-aplicar-todos" onClick={aplicarATodos} disabled={guardando}>
              <Icon name="capas" size={15} /> Aplicar a los {grupos.length} grupos
            </button>
          )}
          {grupo && (
            <span className="temario-resumen-ocultos">
              {aplicado
                ? '✓ Aplicado a todos los grupos.'
                : temasOcultosTotal === 0
                  ? 'El grupo ve todo el contenido.'
                  : `${temasOcultosTotal} de ${TOTAL_TEMAS} temas ocultos para este grupo.`}
              {guardando && ' Guardando…'}
            </span>
          )}
        </div>

        {error && <p className="cuenta-error" role="alert">{error}</p>}
        {grupos && grupos.length === 0 && (
          <p className="cuenta-aviso">
            Esta academia aún no tiene grupos. {esSuperadmin ? 'Créalos en su dashboard' : 'Crea uno en tu Panel'} para
            poder controlar la visibilidad por grupo.
          </p>
        )}
      </header>

      {fasesTemario.map((fase) => {
        const fOculta = faseOculta(fase.id)
        const visiblesDeFase = fOculta
          ? 0
          : fase.temas.filter((t) => !temaOcultoSolo(t.id)).length
        return (
          <section
            className={`temario-modulo tv-modulo ${fOculta ? 'tv-oculto' : ''}`}
            key={fase.id}
            style={{ '--fase-color': fase.color }}
          >
            <div className="tv-modulo-cab">
              <span className="tv-modulo-num">{String(fase.numero).padStart(2, '0')}</span>
              <div className="tv-modulo-info">
                <h2>{fase.titulo}</h2>
                <p>{fase.subtitulo} · {visiblesDeFase}/{fase.temas.length} temas visibles</p>
              </div>
              {grupo && (
                <button
                  className={`tv-ojo tv-ojo--modulo ${fOculta ? 'cerrado' : ''}`}
                  onClick={() => toggleFase(fase)}
                  disabled={guardando}
                  title={fOculta ? 'Mostrar todo el módulo' : 'Ocultar todo el módulo'}
                  aria-label={`${fOculta ? 'Mostrar' : 'Ocultar'} módulo ${fase.titulo}`}
                >
                  <Icon name={fOculta ? 'ojoCerrado' : 'ojo'} size={20} />
                </button>
              )}
            </div>

            <ul className="tv-temas">
              {fase.temas.map((tema) => {
                const tOculto = fOculta || temaOcultoSolo(tema.id)
                return (
                  <li key={tema.id} className={`tv-tema ${tOculto ? 'tv-oculto' : ''}`}>
                    <span className="tv-tema-num">{tema.numero}</span>
                    <Link to={`/tema/${tema.id}`} className="tv-tema-titulo">{tema.titulo}</Link>
                    {fOculta ? (
                      <span className="tv-tema-pormodulo">oculto por módulo</span>
                    ) : (
                      grupo && (
                        <button
                          className={`tv-ojo ${tOculto ? 'cerrado' : ''}`}
                          onClick={() => toggleTema(tema.id)}
                          disabled={guardando}
                          title={tOculto ? 'Mostrar este tema' : 'Ocultar este tema'}
                          aria-label={`${tOculto ? 'Mostrar' : 'Ocultar'} tema ${tema.titulo}`}
                        >
                          <Icon name={tOculto ? 'ojoCerrado' : 'ojo'} size={18} />
                        </button>
                      )
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        )
      })}

      {recursosGenerales.length > 0 && (
        <div className="descargas descargas--general">
          <h3><Icon name="libro" size={17} /> Recursos generales de estudio</h3>
          <div className="descargas-grid">
            {recursosGenerales.map((r, i) => (
              <a key={i} className="descarga-btn" href={r.url} target="_blank" rel="noopener noreferrer">
                <span className="descarga-ico"><Icon name="descarga" size={19} /></span>
                <span className="descarga-txt">Descarga: {r.titulo}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
