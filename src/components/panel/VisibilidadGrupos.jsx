import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useIndiceAcademia } from '../../context/ContenidoContext.jsx'
import { contarTemasOcultos, totalTemas } from '../../lib/panelModelo.js'
import Icon from '../Icon.jsx'

// ============================================================
//  Visibilidad del contenido por GRUPO (antes suelta en /temario)
// ------------------------------------------------------------
//  Decide qué fases y temas ve cada grupo de alumnos:
//    · «Ocultar todo / Mostrar todo» del grupo entero
//    · Ojo por MÓDULO (fase): oculta/muestra el módulo completo
//    · Ojo por TEMA: oculta/muestra ese tema individual
//  Lo oculto desaparece de las listas del alumno y sale censurado en el Atlas.
//
//  Vivía dentro de `/temario`, un nombre que no dice lo que hace: quien
//  buscaba «qué ve mi grupo» no lo encontraba. Ahora es una sección del panel
//  del director y `/temario` la reutiliza tal cual.
//
//  Los grupos llegan por prop —ya los tiene cargados quien la monta— y la copia
//  local guarda lo que se va escribiendo, para no perderlo al cambiar de grupo.
// ============================================================

export default function VisibilidadGrupos({ academiaId, grupos, cabecera = null }) {
  const { grupoId: miGrupoId, puedeVerCodigos } = useAuth()
  // Temario de LA ACADEMIA gestionada: su copia si está migrada, bundle si no.
  const { fases: fasesTemario } = useIndiceAcademia(academiaId)

  const [lista, setLista] = useState(grupos)
  const [grupoSel, setGrupoSel] = useState('')
  const [ocultas, setOcultas] = useState({ fases: [], temas: [] })
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [aplicado, setAplicado] = useState(false)

  // La copia local se rehace cuando quien monta esto recarga sus grupos
  // (p. ej. tras crear o borrar uno en la sección de al lado).
  useEffect(() => { setLista(grupos) }, [grupos])

  // Preselección: el grupo propio del profesor si existe; si no, el primero.
  useEffect(() => {
    setGrupoSel((prev) => {
      if (prev && lista.some((g) => g.id === prev)) return prev
      if (miGrupoId && lista.some((g) => g.id === miGrupoId)) return miGrupoId
      return lista[0]?.id || ''
    })
  }, [lista, miGrupoId])

  const grupo = useMemo(() => lista.find((g) => g.id === grupoSel) || null, [lista, grupoSel])
  useEffect(() => {
    setOcultas({ fases: grupo?.fasesOcultas || [], temas: grupo?.temasOcultos || [] })
  }, [grupo])

  const TODAS_LAS_FASES = useMemo(() => fasesTemario.map((f) => f.id), [fasesTemario])
  const TOTAL_TEMAS = useMemo(() => totalTemas(fasesTemario), [fasesTemario])

  // Escribe la visibilidad en el grupo (optimista, revierte si falla).
  const guardar = async (nuevas) => {
    if (!grupo) return
    const previas = ocultas
    setOcultas(nuevas)
    setGuardando(true)
    setError('')
    try {
      const [{ db }, fs] = await Promise.all([
        import('../../lib/firebase/init.js'),
        import('firebase/firestore'),
      ])
      await fs.updateDoc(fs.doc(db, 'grupos', grupo.id), {
        fasesOcultas: nuevas.fases,
        temasOcultos: nuevas.temas,
      })
      // Refleja el cambio en la lista local (para no perderlo al cambiar de grupo).
      setLista((gs) => gs.map((g) =>
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
    if (lista.length < 2) return
    const ok = window.confirm(
      `¿Aplicar esta configuración de acceso a los ${lista.length} grupos de la academia?\n\n` +
      'Sobrescribe lo que cada grupo tenga configurado ahora mismo.'
    )
    if (!ok) return
    setGuardando(true)
    setError('')
    setAplicado(false)
    try {
      const [{ db }, fs] = await Promise.all([
        import('../../lib/firebase/init.js'),
        import('firebase/firestore'),
      ])
      const batch = fs.writeBatch(db)
      lista.forEach((g) => {
        batch.update(fs.doc(db, 'grupos', g.id), {
          fasesOcultas: ocultas.fases,
          temasOcultos: ocultas.temas,
        })
      })
      await batch.commit()
      setLista((gs) => gs.map((g) => ({ ...g, fasesOcultas: ocultas.fases, temasOcultos: ocultas.temas })))
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

  const temasOcultosTotal = contarTemasOcultos(fasesTemario, ocultas)

  return (
    <>
      <div className="temario-controles">
        {cabecera}
        {lista.length > 0 && (
          <label className="panel-selector">
            Grupo
            <select value={grupoSel} onChange={(e) => setGrupoSel(e.target.value)}>
              {lista.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nombre}{puedeVerCodigos ? ` (${g.id})` : ''}
                </option>
              ))}
            </select>
          </label>
        )}
        {grupo && (
          <button className="btn btn--suave temario-toggle-todo" onClick={toggleTodo} disabled={guardando}>
            {todoOculto ? 'Mostrar todo' : 'Ocultar todo'}
          </button>
        )}
        {grupo && lista.length > 1 && (
          <button className="btn btn--primario temario-aplicar-todos" onClick={aplicarATodos} disabled={guardando}>
            <Icon name="capas" size={15} /> Aplicar a los {lista.length} grupos
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
      {lista.length === 0 && (
        <p className="cuenta-aviso">
          Esta academia aún no tiene grupos. Crea uno para poder controlar la visibilidad por grupo.
        </p>
      )}

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
    </>
  )
}
