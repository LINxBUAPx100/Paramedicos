import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { usePanel } from '../../components/panel/PanelShell.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { useIndiceAcademia } from '../../context/ContenidoContext.jsx'
import ReproductorCaso from '../../components/pulso/ReproductorCaso.jsx'
import Icon from '../../components/Icon.jsx'
import { CASOS } from '../../data/casos/index.js'
import { SIGNOS, validarCaso } from '../../lib/casosModelo.js'
import {
  TIPOS_OPCION, avisosDeAutor, borradorDesde, casoNuevo, eliminarNodo, idDeCaso,
  normalizarCaso, opcionNueva, siguienteIdNodo,
} from '../../lib/casosEditor.js'

// ============================================================
//  Editor de escenarios del Modo llamada (05-10-2026)
// ------------------------------------------------------------
//  El personal docente de la academia —director y profesores— crea aquí sus
//  propios escenarios: momentos, decisiones, consecuencias y signos vitales
//  que reaccionan a cada decisión. Se guardan en `casos/{id}` (Firestore).
//
//  Un escenario es contenido clínico, así que sigue la regla de las lecciones:
//  nace en borrador y el alumno solo lo ve cuando un docente lo VALIDA. Validar
//  pide un comentario y deja firma (quién, cuándo); editar un escenario ya
//  validado lo devuelve a revisión.
//
//  La lógica (normalizar, validar, ids) está en lib/casosEditor.js, que es puro
//  y está probado; esta página pinta y guarda.
// ============================================================

const ETIQUETA_ESTADO = { borrador: 'Borrador', en_revision: 'En revisión', validado: 'Validado', publicado: 'Publicado' }
const AVALADOS = ['validado', 'publicado']

// El panel del director y la consola del super-admin pintan la MISMA pantalla;
// solo cambia de dónde sale la academia (ver pages/admin/academia/Escenarios).
export default function PanelEscenarios() {
  const { academiaId, miUid } = usePanel()
  return <EscenariosDeAcademia academiaId={academiaId} miUid={miUid} />
}

export function EscenariosDeAcademia({ academiaId, miUid }) {
  const [params, setParams] = useSearchParams()
  const [casos, setCasos] = useState(null)
  const [error, setError] = useState('')
  const editando = params.get('caso') // id, o 'nuevo'

  const recargar = async () => {
    setError('')
    try {
      const { listarCasosAcademia } = await import('../../lib/firebase/casos.js')
      setCasos(await listarCasosAcademia({ academiaId }))
    } catch {
      setCasos([])
      setError('No se pudieron cargar los escenarios (revisa que las reglas estén publicadas).')
    }
  }
  useEffect(() => { if (academiaId) recargar() }, [academiaId]) // eslint-disable-line react-hooks/exhaustive-deps

  if (editando) {
    const existente = editando === 'nuevo' ? null : (casos || []).find((c) => c.id === editando)
    if (editando !== 'nuevo' && casos === null) return <p role="status">Cargando escenario…</p>
    return (
      <EditorEscenario
        key={editando + (params.get('desde') || '')}
        academiaId={academiaId}
        miUid={miUid}
        existente={existente}
        plantilla={CASOS.find((c) => c.id === params.get('desde')) || null}
        onCerrar={() => setParams({})}
        onGuardado={async (id) => { await recargar(); setParams({ caso: id }, { replace: true }) }}
      />
    )
  }

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Escenarios</h1>
        <p>
          Casos del <Link to="/casos">Modo llamada</Link> propios de tu academia: momentos, decisiones y signos
          vitales que reaccionan a lo que elige el alumno. Nacen en borrador y el alumno solo los ve cuando un
          docente los valida.
        </p>
      </header>
      {error && <p className="cuenta-error" role="alert">{error}</p>}
      <div className="ui-atajos">
        <button type="button" className="btn btn--primario" onClick={() => setParams({ caso: 'nuevo' })}>
          <Icon name="mas" size={15} /> Nuevo escenario
        </button>
        <label className="ui-campo es-desde">
          Partir de un escenario de PTEM
          <select value="" onChange={(e) => e.target.value && setParams({ caso: 'nuevo', desde: e.target.value })}>
            <option value="">Elige uno para adaptarlo…</option>
            {CASOS.map((c) => <option key={c.id} value={c.id}>{c.titulo}</option>)}
          </select>
        </label>
      </div>
      {casos === null ? (
        <p role="status">Cargando escenarios…</p>
      ) : casos.length === 0 ? (
        <p className="panel-vacio">Tu academia todavía no tiene escenarios propios.</p>
      ) : (
        <ul className="es-lista">
          {casos.map((c) => (
            <li key={c.id}>
              <button type="button" onClick={() => setParams({ caso: c.id })}>
                <b>{c.titulo}</b>
                <span className={`es-estado es-estado--${c.estado}`}>{ETIQUETA_ESTADO[c.estado] || c.estado}</span>
                {c.resumen && <span className="es-resumen">{c.resumen}</span>}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

// ---------- El editor de un escenario --------------------------------------

function EditorEscenario({ academiaId, miUid, existente, plantilla, onCerrar, onGuardado }) {
  const { perfil, user } = useAuth()
  const { modulos } = useIndiceAcademia(academiaId)
  const [b, setB] = useState(() => {
    if (existente) return { ...borradorDesde(existente), id: existente.id, estado: existente.estado }
    if (plantilla) return borradorDesde(plantilla, { titulo: `${plantilla.titulo} (adaptado)` })
    return casoNuevo()
  })
  const [probando, setProbando] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [aviso, setAviso] = useState('')
  const [comentario, setComentario] = useState('')
  const sucio = useState(false)
  const [, setSucio] = sucio

  // Lecciones elegibles: las del índice de la academia, con su número.
  const lecciones = useMemo(
    () => (modulos || []).flatMap((m) => (m.temas || []).map((t) => ({ id: t.id, titulo: `${t.numero || ''} ${t.titulo}`.trim() }))),
    [modulos]
  )
  const tituloDe = (id) => lecciones.find((l) => l.id === id)?.titulo || id

  const caso = useMemo(() => normalizarCaso({ ...b, id: b.id || 'borrador' }), [b])
  const errores = useMemo(() => validarCaso(caso), [caso])
  const avisos = useMemo(() => avisosDeAutor(caso), [caso])
  const listo = errores.length === 0 && avisos.length === 0

  const cambiar = (f) => { setB((x) => f(structuredClone(x))); setSucio(true); setAviso('') }
  const ids = Object.keys(b.nodos)

  const guardar = async ({ estado, revision = null } = {}) => {
    setGuardando(true)
    setAviso('')
    try {
      const { guardarCaso } = await import('../../lib/firebase/casos.js')
      const id = b.id || idDeCaso(b.titulo, academiaId)
      // Editar un escenario avalado lo devuelve a revisión: lo que se validó
      // ya no es lo que hay. Volverlo a validar deja una firma nueva.
      let nuevoEstado = estado || b.estado
      if (!estado && AVALADOS.includes(b.estado)) nuevoEstado = 'en_revision'
      await guardarCaso({
        caso: { ...normalizarCaso({ ...b, id }), estado: nuevoEstado },
        academiaId,
        autorUid: existente?.autorUid || miUid,
        revision,
      })
      setB((x) => ({ ...x, id, estado: nuevoEstado }))
      setSucio(false)
      setAviso(nuevoEstado === 'validado' ? 'Escenario validado: ya lo ven los alumnos de la academia.' : 'Guardado.')
      await onGuardado(id)
    } catch {
      setAviso('No se pudo guardar. Revisa tu conexión y que las reglas estén publicadas.')
    } finally {
      setGuardando(false)
    }
  }
  const validar = () => {
    if (!comentario.trim()) { setAviso('Para validar, escribe un comentario de revisión.'); return }
    guardar({
      estado: 'validado',
      revision: { por: miUid, nombre: perfil?.nombre || user?.email || '', comentario: comentario.trim(), fecha: new Date().toISOString() },
    })
  }
  const borrar = async () => {
    if (!b.id || !window.confirm('¿Borrar este escenario? No se puede deshacer.')) return
    try {
      const { borrarCaso } = await import('../../lib/firebase/casos.js')
      await borrarCaso(b.id)
      onCerrar()
    } catch {
      setAviso('No se pudo borrar (un profesor solo puede borrar los suyos).')
    }
  }

  return (
    <div className="cs-seccion es-editor">
      <nav className="migas" aria-label="Ubicación">
        <button type="button" className="link-discreto" onClick={onCerrar}><Icon name="chevronIzq" size={14} /> Escenarios</button>
      </nav>
      <header className="cs-cabecera">
        <h1>{b.titulo || 'Escenario sin título'}</h1>
        <p>
          <span className={`es-estado es-estado--${b.estado}`}>{ETIQUETA_ESTADO[b.estado]}</span>{' '}
          {AVALADOS.includes(b.estado) ? 'Si lo modificas, vuelve a revisión hasta que se valide de nuevo.' : 'Los alumnos no lo ven hasta que se valide.'}
        </p>
      </header>

      {probando ? (
        <section className="es-bloque">
          <div className="es-bloque-cab"><h2>Vista previa</h2><button type="button" className="btn btn--suave" onClick={() => setProbando(false)}>Volver a editar</button></div>
          <ReproductorCaso key={JSON.stringify(caso)} caso={caso} />
        </section>
      ) : (
        <>
          {/* 1. Datos */}
          <section className="es-bloque">
            <h2>1 · Datos del escenario</h2>
            <label className="ui-campo">Título<input value={b.titulo} maxLength={160} onChange={(e) => cambiar((x) => { x.titulo = e.target.value; return x })} placeholder="Se desploma en la parada del autobús" /></label>
            <label className="ui-campo">Resumen (una frase)<input value={b.resumen} maxLength={600} onChange={(e) => cambiar((x) => { x.resumen = e.target.value; return x })} /></label>
            <div className="es-fila">
              <label className="ui-campo">Quién atiende
                <select value={b.rol || 'tum'} onChange={(e) => cambiar((x) => { x.rol = e.target.value; return x })}>
                  <option value="tum">TUM con equipo (toma pulso, pupilas y lo que dé el equipo)</option>
                  <option value="lego">Primer respondiente lego (sin pulso ni equipo)</option>
                </select>
              </label>
              <label className="ui-campo">Paciente
                <select value={b.paciente || 'adulto'} onChange={(e) => cambiar((x) => { x.paciente = e.target.value; return x })}>
                  <option value="adulto">Adulto (se valora AVDI y Glasgow)</option>
                  <option value="nino">Niño (solo AVDI)</option>
                  <option value="lactante">Lactante (solo AVDI)</option>
                </select>
              </label>
            </div>
            <label className="ui-campo">Lo que contesta el paciente si se le pregunta (solo si puede hablar)
              <textarea rows={2} value={b.historia || ''} onChange={(e) => cambiar((x) => { x.historia = e.target.value; return x })} placeholder="Me empezó a doler el pecho hace media hora…" />
            </label>
            <label className="ui-campo">Lo que cuentan los testigos si se les pregunta
              <textarea rows={2} value={b.testigos || ''} onChange={(e) => cambiar((x) => { x.testigos = e.target.value; return x })} placeholder="Se desplomó de repente mientras esperaba…" />
            </label>
            <div className="ui-campo">
              Lecciones que lo sostienen
              <div className="es-chips">
                {b.temas.map((t) => (
                  <span key={t} className="es-chip">{tituloDe(t)}<button type="button" aria-label={`Quitar ${tituloDe(t)}`} onClick={() => cambiar((x) => { x.temas = x.temas.filter((y) => y !== t); return x })}>×</button></span>
                ))}
              </div>
              <select value="" onChange={(e) => e.target.value && cambiar((x) => { x.temas = [...new Set([...x.temas, e.target.value])]; return x })}>
                <option value="">Añadir lección…</option>
                {lecciones.filter((l) => !b.temas.includes(l.id)).map((l) => <option key={l.id} value={l.id}>{l.titulo}</option>)}
              </select>
            </div>
            <fieldset className="es-fuentes">
              <legend>Fuentes (documento, edición y, si se puede, capítulo o página)</legend>
              {b.fuentes.map((f, i) => (
                <div key={i} className="es-fila">
                  <input aria-label={`Fuente ${i + 1}`} value={f.nombre} placeholder="Institución. Documento, edición/año." onChange={(e) => cambiar((x) => { x.fuentes[i].nombre = e.target.value; return x })} />
                  <input aria-label={`Nota de la fuente ${i + 1}`} value={f.nota} placeholder="Qué respalda (sección, algoritmo, página)" onChange={(e) => cambiar((x) => { x.fuentes[i].nota = e.target.value; return x })} />
                  <button type="button" className="btn btn--sm btn--suave" onClick={() => cambiar((x) => { x.fuentes.splice(i, 1); return x })}>Quitar</button>
                </div>
              ))}
              <button type="button" className="btn btn--sm btn--suave" onClick={() => cambiar((x) => { x.fuentes.push({ nombre: '', nota: '' }); return x })}>Añadir fuente</button>
            </fieldset>
          </section>

          {/* 2. Signos iniciales */}
          <section className="es-bloque">
            <h2>2 · Signos al empezar</h2>
            <p className="es-ayuda">
              El alumno NO los ve: los obtiene explorando, y el nivel de conciencia lo tiene que clasificar él.
              Deja vacío lo que el escenario no tiene (sin oxímetro, sin SpO₂). «—» = no medible. Glasgow con la forma
              O#V#M# («O4V4M6»); si lo dejas vacío se usa el que corresponde a su AVDI. Las decisiones y los momentos los irán cambiando.
            </p>
            <EditorSignos signos={b.signos} onCambiar={(k, v) => cambiar((x) => { x.signos = { ...(x.signos || {}), [k]: v }; return x })} />
          </section>

          {/* 3. Momentos */}
          <section className="es-bloque">
            <div className="es-bloque-cab">
              <h2>3 · Momentos y decisiones</h2>
              <div className="ui-atajos">
                <button type="button" className="btn btn--sm btn--suave" onClick={() => cambiar((x) => { const id = siguienteIdNodo(x.nodos, 'n'); x.nodos[id] = { texto: '', opciones: [opcionNueva(), opcionNueva()] }; return x })}>Añadir momento</button>
                <button type="button" className="btn btn--sm btn--suave" onClick={() => cambiar((x) => { const id = siguienteIdNodo(x.nodos, 'fin'); x.nodos[id] = { texto: '', fin: true, desenlace: 'favorable' }; return x })}>Añadir final</button>
              </div>
            </div>
            {ids.map((id) => (
              <Momento
                key={id}
                id={id}
                nodo={b.nodos[id]}
                esInicio={b.inicio === id}
                ids={ids}
                temas={b.temas}
                tituloDe={tituloDe}
                cambiar={(f) => cambiar((x) => { x.nodos[id] = f(x.nodos[id]); return x })}
                hacerInicio={() => cambiar((x) => { x.inicio = id; return x })}
                eliminar={() => cambiar((x) => eliminarNodo(x, id))}
              />
            ))}
          </section>
        </>
      )}

      {/* Estado de la forma y acciones */}
      <section className="es-bloque es-acciones" aria-live="polite">
        {listo ? (
          <p className="es-ok"><Icon name="check" size={15} /> El escenario está completo: se puede probar y validar.</p>
        ) : (
          <details className="es-errores" open>
            <summary>{errores.length + avisos.length} {errores.length + avisos.length === 1 ? 'cosa pendiente' : 'cosas pendientes'} antes de validar</summary>
            <ul>{[...errores, ...avisos].map((e, i) => <li key={i}>{e}</li>)}</ul>
          </details>
        )}
        <div className="ui-atajos">
          <button type="button" className="btn btn--primario" disabled={guardando || !b.titulo.trim()} onClick={() => guardar()}>Guardar</button>
          <button type="button" className="btn btn--suave" disabled={errores.length > 0} onClick={() => setProbando((v) => !v)}>{probando ? 'Volver a editar' : 'Probar'}</button>
          {b.id && <button type="button" className="btn btn--suave" onClick={borrar}>Borrar</button>}
        </div>
        {!AVALADOS.includes(b.estado) && (
          <div className="es-validar">
            <label className="ui-campo">Comentario de revisión (obligatorio para validar)
              <textarea rows={2} value={comentario} onChange={(e) => setComentario(e.target.value)} placeholder="Revisado contra la lección y sus fuentes…" />
            </label>
            <button type="button" className="btn btn--exito" disabled={!listo || guardando || !b.titulo.trim()} onClick={validar}>
              Validar y firmar como {perfil?.nombre || user?.email || 'docente'}
            </button>
          </div>
        )}
        {aviso && <p role="status" className="es-aviso">{aviso}</p>}
      </section>
    </div>
  )
}

function EditorSignos({ signos = {}, onCambiar, compacto = false }) {
  return (
    <div className={`es-signos ${compacto ? 'es-signos--compacto' : ''}`}>
      {SIGNOS.map((s) => (
        <label key={s.clave} className="es-signo">
          <span>{s.etiqueta}{s.unidad ? ` (${s.unidad})` : ''}</span>
          {s.clave === 'avdi' ? (
            <select value={signos?.[s.clave] ?? ''} onChange={(e) => onCambiar(s.clave, e.target.value)}>
              <option value="">{compacto ? 'sin cambio' : '—'}</option>
              {['A', 'V', 'D', 'I'].map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          ) : (
            <input value={signos?.[s.clave] ?? ''} placeholder={compacto ? 'sin cambio' : ''} onChange={(e) => onCambiar(s.clave, e.target.value)} />
          )}
        </label>
      ))}
    </div>
  )
}

function Momento({ id, nodo, esInicio, ids, temas, tituloDe, cambiar, hacerInicio, eliminar }) {
  const setCampo = (k, v) => cambiar((n) => ({ ...n, [k]: v }))
  const setOpcion = (i, k, v) => cambiar((n) => ({ ...n, opciones: n.opciones.map((o, j) => (j === i ? { ...o, [k]: v } : o)) }))
  return (
    <article className={`es-momento ${nodo.fin ? 'es-momento--fin' : ''}`}>
      <div className="es-momento-cab">
        <b>{nodo.fin ? 'Final' : 'Momento'} «{id}»</b>
        {esInicio && <span className="es-chip">Inicio</span>}
        <div className="ui-atajos">
          {!esInicio && !nodo.fin && <button type="button" className="btn btn--sm btn--suave" onClick={hacerInicio}>Hacer inicio</button>}
          {!esInicio && <button type="button" className="btn btn--sm btn--suave" onClick={eliminar}>Eliminar</button>}
        </div>
      </div>
      <label className="ui-campo">{nodo.fin ? 'Qué ocurre al final' : 'Qué ve el alumno (solo la escena: sin signos ni lo que dicen; eso se explora)'}
        <textarea rows={3} value={nodo.texto} onChange={(e) => setCampo('texto', e.target.value)} />
      </label>
      {!nodo.fin && (
        <details className="es-detalle">
          <summary>Lo que dicen en este momento (si cambia)</summary>
          <label className="ui-campo">El paciente<input value={nodo.historia || ''} onChange={(e) => setCampo('historia', e.target.value)} placeholder="Vacío = lo de siempre" /></label>
          <label className="ui-campo">Los testigos<input value={nodo.testigos || ''} onChange={(e) => setCampo('testigos', e.target.value)} placeholder="Vacío = lo de siempre" /></label>
        </details>
      )}
      {nodo.fin && (
        <label className="ui-campo">Desenlace
          <select value={nodo.desenlace} onChange={(e) => setCampo('desenlace', e.target.value)}>
            <option value="favorable">Favorable</option>
            <option value="desfavorable">Desfavorable</option>
          </select>
        </label>
      )}
      <details className="es-detalle">
        <summary>Cómo evoluciona el paciente al llegar aquí (signos)</summary>
        <EditorSignos compacto signos={nodo.signos} onCambiar={(k, v) => setCampo('signos', { ...(nodo.signos || {}), [k]: v })} />
      </details>
      {!nodo.fin && (
        <div className="es-opciones">
          {nodo.opciones.map((o, i) => (
            <div key={i} className={`es-opcion es-opcion--${o.tipo}`}>
              <div className="es-fila">
                <input aria-label={`Opción ${i + 1}`} value={o.texto} placeholder={`Opción ${i + 1}: qué decide el alumno`} onChange={(e) => setOpcion(i, 'texto', e.target.value)} />
                <select aria-label="Tipo" value={o.tipo} onChange={(e) => setOpcion(i, 'tipo', e.target.value)}>
                  {TIPOS_OPCION.map((t) => <option key={t.id} value={t.id}>{t.etiqueta}</option>)}
                </select>
                <select aria-label="Lleva a" value={o.va} onChange={(e) => setOpcion(i, 'va', e.target.value)}>
                  <option value="">Lleva a…</option>
                  {ids.filter((x) => x !== id).map((x) => <option key={x} value={x}>{x}</option>)}
                </select>
              </div>
              <textarea rows={2} aria-label="Consecuencia" value={o.retro} placeholder="Por qué: qué dice la lección de esta decisión" onChange={(e) => setOpcion(i, 'retro', e.target.value)} />
              <div className="es-fila">
                <select aria-label="Lección que lo explica" value={o.tema} onChange={(e) => setOpcion(i, 'tema', e.target.value)}>
                  <option value="">Lección que lo explica…</option>
                  {temas.map((t) => <option key={t} value={t}>{tituloDe(t)}</option>)}
                </select>
                {nodo.opciones.length > 2 && (
                  <button type="button" className="btn btn--sm btn--suave" onClick={() => cambiar((n) => ({ ...n, opciones: n.opciones.filter((_, j) => j !== i) }))}>Quitar opción</button>
                )}
              </div>
              <details className="es-detalle">
                <summary>Qué cambia esta decisión en los signos</summary>
                <EditorSignos compacto signos={o.signos} onCambiar={(k, v) => setOpcion(i, 'signos', { ...(o.signos || {}), [k]: v })} />
              </details>
            </div>
          ))}
          {nodo.opciones.length < 4 && (
            <button type="button" className="btn btn--sm btn--suave" onClick={() => cambiar((n) => ({ ...n, opciones: [...n.opciones, opcionNueva()] }))}>Añadir opción</button>
          )}
        </div>
      )}
    </article>
  )
}
