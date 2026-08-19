import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useIndiceAcademia } from '../../context/ContenidoContext.jsx'
import { contarTemasOcultos, estadoModulo, focoBaraja, totalTemas } from '../../lib/panelModelo.js'
import { semaforoDe, tituloSemaforo } from '../../lib/estadoEditorial.js'
import { estadosEditoriales } from '../../data/navIndice.js'
import Icon from '../Icon.jsx'

// Semáforo de avance editorial del temario oficial. Solo se pinta para el
// superadmin: a un profesor le diría que un tema «no está listo» sin que pueda
// hacer nada al respecto, y al alumno ya se le informa con el aviso de la propia
// página del tema, que es donde la advertencia sirve de algo.
function SemaforoEditorial({ temaId }) {
  const estado = estadosEditoriales[temaId]
  if (!estado) return null // academia con temario propio: no hay estado oficial que mostrar
  const color = semaforoDe(estado)
  const titulo = tituloSemaforo(estado)
  return (
    <span
      className={`tv-semaforo tv-semaforo--${color}`}
      title={titulo}
      aria-label={titulo}
      role="img"
    />
  )
}

// ============================================================
//  Visibilidad del contenido por GRUPO (antes suelta en /temario)
// ------------------------------------------------------------
//  Decide qué módulos y temas ve cada grupo de alumnos:
//    · «Ocultar todo / Mostrar todo» del grupo entero
//    · Ojo por MÓDULO (módulo): oculta/muestra el módulo completo
//    · Ojo por TEMA: oculta/muestra ese tema individual
//  Lo oculto desaparece de las listas del alumno y sale censurado en Logros.
//
//  Vivía dentro de `/temario`, un nombre que no dice lo que hace: quien
//  buscaba «qué ve mi grupo» no lo encontraba. Ahora es una sección del panel
//  del director y `/temario` la reutiliza tal cual.
//
//  Los grupos llegan por prop —ya los tiene cargados quien la monta— y la copia
//  local guarda lo que se va escribiendo, para no perderlo al cambiar de grupo.
//
//  DISPOSICIÓN (Bloque Q): eran 68 filas seguidas, con los controles perdidos
//  entre el título y el contenido. Ahora hay dos zonas separadas:
//    · «Espacios» — a QUIÉN le estás cambiando la visibilidad (academia, grupo)
//      y las acciones que afectan a todo. Es una tarjeta aparte porque decidir
//      el destinatario y decidir el contenido son dos cosas distintas.
//    · La baraja — un módulo abierta a la vez; las demás, una línea que dice
//      cuántos temas ve el grupo. Cabeceras como `<button aria-expanded>`
//      navegables con flechas (patrón de acordeón de WAI-ARIA).
//  La lógica de guardado NO cambió: `guardar`, `toggleModulo`, `toggleTema`,
//  `toggleTodo` y `aplicarATodos` son las de siempre.
// ============================================================

// `academiaNombre` es opcional y solo se usa para rotular la imagen exportada:
// si no llega, se rotula con el código de la academia, que siempre existe.
export default function VisibilidadGrupos({ academiaId, academiaNombre = '', grupos, cabecera = null }) {
  const { grupoId: miGrupoId, puedeVerCodigos, esSuperadmin } = useAuth()
  // Temario de LA ACADEMIA gestionada: su copia si está migrada, bundle si no.
  const { modulos: modulosTemario } = useIndiceAcademia(academiaId)

  const [lista, setLista] = useState(grupos)
  const [grupoSel, setGrupoSel] = useState('')
  const [ocultas, setOcultas] = useState({ modulos: [], temas: [] })
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [aplicado, setAplicado] = useState(false)
  // undefined = nadie ha elegido todavía (se abre la primera);
  // null = el director las cerró todas a propósito.
  const [abiertaId, setAbiertaId] = useState(undefined)
  const cabeceras = useRef([])
  const [exportando, setExportando] = useState(null) // 'completo' | 'grupo' | null

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
    setOcultas({ modulos: grupo?.modulosOcultos || [], temas: grupo?.temasOcultos || [] })
  }, [grupo])

  const TODAS_LAS_MODULOS = useMemo(() => modulosTemario.map((f) => f.id), [modulosTemario])
  const TOTAL_TEMAS = useMemo(() => totalTemas(modulosTemario), [modulosTemario])

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
        modulosOcultos: nuevas.modulos,
        temasOcultos: nuevas.temas,
      })
      // Refleja el cambio en la lista local (para no perderlo al cambiar de grupo).
      setLista((gs) => gs.map((g) =>
        g.id === grupo.id ? { ...g, modulosOcultos: nuevas.modulos, temasOcultos: nuevas.temas } : g
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

  const moduloOculta = (fid) => ocultas.modulos.includes(fid)
  const temaOcultoSolo = (tid) => ocultas.temas.includes(tid)

  const toggleModulo = (modulo) => {
    if (moduloOculta(modulo.id)) {
      // Mostrar TODO el módulo: quita el módulo y sus temas individuales.
      const idsTemas = modulo.temas.map((t) => t.id)
      guardar({
        modulos: ocultas.modulos.filter((f) => f !== modulo.id),
        temas: ocultas.temas.filter((t) => !idsTemas.includes(t)),
      })
    } else {
      guardar({ ...ocultas, modulos: [...ocultas.modulos, modulo.id] })
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

  const todoOculto = ocultas.modulos.length === TODAS_LAS_MODULOS.length
  const toggleTodo = () => {
    guardar(todoOculto ? { modulos: [], temas: [] } : { modulos: [...TODAS_LAS_MODULOS], temas: [] })
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
          modulosOcultos: ocultas.modulos,
          temasOcultos: ocultas.temas,
        })
      })
      await batch.commit()
      setLista((gs) => gs.map((g) => ({ ...g, modulosOcultos: ocultas.modulos, temasOcultos: ocultas.temas })))
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

  const temasOcultosTotal = contarTemasOcultos(modulosTemario, ocultas)

  // Qué módulo está abierta: la primera mientras nadie decida otra cosa.
  const moduloAbierta = abiertaId === undefined ? modulosTemario[0]?.id : abiertaId
  const alternarCarta = (id) => setAbiertaId(moduloAbierta === id ? null : id)

  // Exportar a PNG. `soloGrupo` decide si se respeta lo que el grupo tiene
  // oculto o si sale el temario completo.
  const exportar = async (soloGrupo) => {
    setExportando(soloGrupo ? 'grupo' : 'completo')
    setError('')
    try {
      const { descargarTemarioPNG } = await import('../../lib/pintarTemario.js')
      await descargarTemarioPNG({
        modulos: modulosTemario,
        ocultas: soloGrupo ? ocultas : null,
        academia: academiaNombre || academiaId || '',
        grupo: soloGrupo ? (grupo?.nombre || '') : '',
      })
    } catch (err) {
      setError(err?.message || 'No se pudo generar la imagen del temario.')
    } finally {
      setExportando(null)
    }
  }

  const alTeclear = (e, indice) => {
    const destino = focoBaraja(indice, e.key, modulosTemario.length)
    if (destino === null) return // Tab, Enter y Espacio siguen siendo suyos
    e.preventDefault()
    cabeceras.current[destino]?.focus()
  }

  return (
    <>
      {/* ---- Espacios: a quién le estás cambiando la visibilidad ---- */}
      <div className="tv-espacios">
        <div className="tv-espacios-cab">
          <span className="tv-espacios-titulo">
            <Icon name="capas" size={15} /> Espacios
          </span>
          {grupo && (
            <p className="tv-espacios-estado" role="status">
              {aplicado
                ? '✓ Aplicado a todos los grupos.'
                : temasOcultosTotal === 0
                  ? 'Este grupo ve todo el contenido.'
                  : `${temasOcultosTotal} de ${TOTAL_TEMAS} temas ocultos para este grupo.`}
              {guardando && ' Guardando…'}
            </p>
          )}
        </div>

        <div className="tv-espacios-campos">
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
        </div>

        <div className="tv-espacios-acciones">
          {grupo && (
            <>
              <button className="btn btn--sm btn--suave" onClick={toggleTodo} disabled={guardando}>
                <Icon name={todoOculto ? 'ojo' : 'ojoCerrado'} size={15} />
                {todoOculto ? 'Mostrar todo' : 'Ocultar todo'}
              </button>
              {lista.length > 1 && (
                <button className="btn btn--sm btn--primario" onClick={aplicarATodos} disabled={guardando}>
                  <Icon name="capas" size={15} /> Aplicar a los {lista.length} grupos
                </button>
              )}
            </>
          )}

          {/* Exportar a imagen (Bloque R). Dos variantes, y la del grupo solo
              cuando hay grupo elegido: sin él no hay nada que respetar. La
              descarga NO depende de tener grupos, así que vive fuera de ese
              condicional — una academia sin grupos también quiere su temario. */}
          <button className="btn btn--sm btn--fantasma" onClick={() => exportar(false)} disabled={Boolean(exportando)}>
            <Icon name="descarga" size={15} />
            {exportando === 'completo' ? 'Generando…' : 'Descargar PNG'}
          </button>
          {grupo && temasOcultosTotal > 0 && (
            <button className="btn btn--sm btn--fantasma" onClick={() => exportar(true)} disabled={Boolean(exportando)}>
              <Icon name="descarga" size={15} />
              {exportando === 'grupo' ? 'Generando…' : 'Descargar solo lo del grupo'}
            </button>
          )}
        </div>
      </div>

      {error && <p className="cuenta-error" role="alert">{error}</p>}
      {lista.length === 0 && (
        <p className="cuenta-aviso">
          Esta academia aún no tiene grupos. Crea uno para poder controlar la visibilidad por grupo.
        </p>
      )}

      {/* ---- Baraja de modulos: una abierta a la vez ---- */}
      {esSuperadmin && (
        <p className="tv-leyenda">
          <span className="tv-leyenda-item">
            <span className="tv-semaforo tv-semaforo--rojo" aria-hidden="true" /> Sin contenido
          </span>
          <span className="tv-leyenda-item">
            <span className="tv-semaforo tv-semaforo--ambar" aria-hidden="true" /> En desarrollo
          </span>
          <span className="tv-leyenda-item">
            <span className="tv-semaforo tv-semaforo--verde" aria-hidden="true" /> Listo y aprobado
          </span>
          <span className="tv-leyenda-nota">Avance editorial del temario oficial. Solo tú lo ves.</span>
        </p>
      )}

      <div className="tv-baraja">
        {modulosTemario.map((modulo, indice) => {
          const est = estadoModulo(modulo, ocultas)
          const abierta = moduloAbierta === modulo.id
          const panelId = `tv-panel-${modulo.id}`
          return (
            <section
              className={`tv-carta tv-carta--${est.estado} ${abierta ? 'abierta' : ''}`}
              key={modulo.id}
              style={{ '--modulo-color': modulo.color }}
            >
              <div className="tv-carta-cab">
                <button
                  type="button"
                  className="tv-carta-abrir"
                  aria-expanded={abierta}
                  // Solo cuando existe: los temas se montan al abrir, y apuntar
                  // a un id que no está en el DOM es una referencia rota.
                  aria-controls={abierta ? panelId : undefined}
                  ref={(el) => { cabeceras.current[indice] = el }}
                  onKeyDown={(e) => alTeclear(e, indice)}
                  onClick={() => alternarCarta(modulo.id)}
                >
                  <span className="tv-carta-num">{String(modulo.numero).padStart(2, '0')}</span>
                  <span className="tv-carta-info">
                    <strong>{modulo.titulo}</strong>
                    <small>
                      {est.estado === 'oculta'
                        ? est.porModulo
                          ? 'Módulo oculto para este grupo'
                          : 'Sin temas visibles para este grupo'
                        : `${est.visibles} de ${est.total} temas visibles`}
                    </small>
                  </span>
                  <span className="tv-carta-chevron" aria-hidden="true">
                    <Icon name={abierta ? 'chevronArriba' : 'chevronAbajo'} size={18} />
                  </span>
                </button>

                {/* Ahora dice en texto lo que hace: un ojo a secas obliga a
                    adivinar si muestra el estado actual o la acción. */}
                {grupo && (
                  <button
                    type="button"
                    className="btn btn--sm btn--fantasma tv-ojo-txt"
                    onClick={() => toggleModulo(modulo)}
                    disabled={guardando}
                    aria-label={`${est.porModulo ? 'Mostrar' : 'Ocultar'} el módulo completo: Módulo ${modulo.numero}, ${modulo.titulo}`}
                  >
                    <Icon name={est.porModulo ? 'ojoCerrado' : 'ojo'} size={16} />
                    {est.porModulo ? 'Mostrar módulo' : 'Ocultar módulo'}
                  </button>
                )}
              </div>

              {abierta && (
                <ul className="tv-temas" id={panelId}>
                  {modulo.temas.map((tema) => {
                    const tOculto = est.porModulo || temaOcultoSolo(tema.id)
                    return (
                      <li key={tema.id} className={`tv-tema ${tOculto ? 'tv-oculto' : ''}`}>
                        {esSuperadmin && <SemaforoEditorial temaId={tema.id} />}
                        <span className="tv-tema-num">{tema.numero}</span>
                        <Link to={`/tema/${tema.id}`} className="tv-tema-titulo">{tema.titulo}</Link>
                        {est.porModulo ? (
                          <span className="tv-tema-pormodulo">oculto por módulo</span>
                        ) : (
                          grupo && (
                            <button
                              type="button"
                              className="btn btn--sm btn--fantasma tv-ojo-txt"
                              onClick={() => toggleTema(tema.id)}
                              disabled={guardando}
                              aria-label={`${tOculto ? 'Mostrar' : 'Ocultar'} el tema ${tema.titulo}`}
                            >
                              <Icon name={tOculto ? 'ojoCerrado' : 'ojo'} size={15} />
                              {tOculto ? 'Mostrar' : 'Ocultar'}
                            </button>
                          )
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}
            </section>
          )
        })}
      </div>
    </>
  )
}
