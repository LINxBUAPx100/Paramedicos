import { useEffect, useId, useMemo, useRef, useState } from 'react'
import Icon from '../Icon.jsx'
import VistaPreviaTema from './VistaPreviaTema.jsx'
import { clonProfundo } from '../../lib/contenidoModelo.js'
import {
  TIPOS_BLOQUE, VARIANTES_CALLOUT, bloqueNuevo, preguntaNueva, duplicarPregunta,
  duplicarSeccion, correctasDe, normalizarContenido, validarContenidoTema,
} from '../../lib/temaContenidoModelo.js'
import { EXTENSIONES_PERMITIDAS } from '../../lib/archivosModelo.js'

// ============================================================
//  Editor del CONTENIDO interno de un tema (Fase 4)
// ------------------------------------------------------------
//  Borrador LOCAL (nada se escribe por tecla) + un único "Guardar contenido"
//  que valida, normaliza y guarda todo el contenido en una transacción
//  (guardarContenidoTema). `onDirty` protege los cambios sin guardar.
//  Los esquemas son EXACTAMENTE los que renderizan los componentes del
//  alumno: lo guardado aquí se ve idéntico en TemaPage.
// ============================================================

const ACCEPT_ARCHIVOS = EXTENSIONES_PERMITIDAS.map((e) => `.${e}`).join(',')
const ACCEPT_IMAGENES = '.png,.jpg,.jpeg,.webp,.gif'

// Campos que edita ESTE panel (titulo/resumen viven en PanelNodo).
function extraerBorrador(temaDoc) {
  const c = clonProfundo({
    duracion: temaDoc.duracion || '',
    objetivos: temaDoc.objetivos || [],
    secciones: temaDoc.secciones || [],
    conceptosClave: temaDoc.conceptosClave || [],
    flashcards: temaDoc.flashcards || [],
    quiz: temaDoc.quiz || [],
    recursos: temaDoc.recursos || { videos: [], fuentes: [], imagenes: [], archivos: [] },
    actividades: temaDoc.actividades || { ordenar: null, completar: [], preguntas: [] },
  })
  c.recursos.videos = c.recursos.videos || []
  c.recursos.fuentes = c.recursos.fuentes || []
  c.recursos.imagenes = c.recursos.imagenes || []
  c.recursos.archivos = c.recursos.archivos || []
  c.actividades.completar = c.actividades.completar || []
  c.actividades.preguntas = c.actividades.preguntas || []
  // `correcta` se edita siempre como arreglo (checkboxes); se compacta al guardar.
  for (const q of [...c.quiz, ...c.actividades.preguntas]) q.correcta = correctasDe(q)
  for (const it of c.actividades.completar) it.correcta = correctasDe(it)
  return c
}

// ---------- piezas pequeñas reutilizables ----------

function BotonChico({ icono, etiqueta, onClick, disabled, peligro }) {
  return (
    <button
      type="button"
      className={`ct-boton ${peligro ? 'ct-boton--peligro' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon name={icono} size={14} /> {etiqueta}
    </button>
  )
}

function FilaOrden({ indice, total, onMover, onDuplicar, onQuitar, etiqueta, disabled }) {
  return (
    <span className="ct-fila-orden" role="group" aria-label={`Acciones de ${etiqueta}`}>
      <button type="button" className="editor-expandir" disabled={disabled || indice === 0}
        aria-label={`Subir ${etiqueta}`} onClick={() => onMover(indice, indice - 1)}>
        <Icon name="chevronArriba" size={14} />
      </button>
      <button type="button" className="editor-expandir" disabled={disabled || indice === total - 1}
        aria-label={`Bajar ${etiqueta}`} onClick={() => onMover(indice, indice + 1)}>
        <Icon name="chevronAbajo" size={14} />
      </button>
      {onDuplicar && (
        <button type="button" className="editor-expandir" disabled={disabled}
          aria-label={`Duplicar ${etiqueta}`} onClick={() => onDuplicar(indice)}>
          <Icon name="copiar" size={14} />
        </button>
      )}
      <button type="button" className="editor-expandir ct-quitar" disabled={disabled}
        aria-label={`Quitar ${etiqueta}`} onClick={() => onQuitar(indice)}>
        <Icon name="basura" size={14} />
      </button>
    </span>
  )
}

function CampoTexto({ id, etiqueta, valor, onCambio, multilinea, filas = 2, placeholder, disabled, pista }) {
  return (
    <div className="editor-campo">
      <label htmlFor={id}>{etiqueta}</label>
      {multilinea ? (
        <textarea id={id} rows={filas} value={valor || ''} placeholder={placeholder}
          disabled={disabled} onChange={(e) => onCambio(e.target.value)} />
      ) : (
        <input id={id} type="text" value={valor || ''} placeholder={placeholder}
          disabled={disabled} onChange={(e) => onCambio(e.target.value)} />
      )}
      {pista && <p className="editor-nota">{pista}</p>}
    </div>
  )
}

// Lista de renglones editada como textarea (un elemento por línea).
function ListaLineas({ id, etiqueta, valor, onCambio, disabled, pista, filas = 4 }) {
  return (
    <div className="editor-campo">
      <label htmlFor={id}>{etiqueta}</label>
      <textarea id={id} rows={filas} value={(valor || []).join('\n')} disabled={disabled}
        onChange={(e) => onCambio(e.target.value.split('\n'))} />
      <p className="editor-nota">{pista || 'Un elemento por renglón.'}</p>
    </div>
  )
}

// ---------- editor de un bloque de contenido ----------

function EditorBloque({ bloque, uid, disabled, onCambio }) {
  const set = (campo, valor) => onCambio({ ...bloque, [campo]: valor })
  switch (bloque.tipo) {
    case 'p':
    case 'h3':
      return <CampoTexto id={`${uid}-t`} etiqueta="Texto" multilinea={bloque.tipo === 'p'} filas={3}
        valor={bloque.texto} onCambio={(v) => set('texto', v)} disabled={disabled} />
    case 'lista':
    case 'pasos':
      return (
        <>
          <CampoTexto id={`${uid}-ti`} etiqueta="Título (opcional)" valor={bloque.titulo}
            onCambio={(v) => set('titulo', v)} disabled={disabled} />
          <ListaLineas id={`${uid}-it`} etiqueta={bloque.tipo === 'lista' ? 'Elementos' : 'Pasos (en orden)'}
            valor={bloque.items} onCambio={(v) => set('items', v)} disabled={disabled} />
        </>
      )
    case 'tabla':
      return (
        <>
          <CampoTexto id={`${uid}-ti`} etiqueta="Título (opcional)" valor={bloque.titulo}
            onCambio={(v) => set('titulo', v)} disabled={disabled} />
          <CampoTexto id={`${uid}-h`} etiqueta="Encabezados (separados por |)"
            valor={(bloque.headers || []).join(' | ')} disabled={disabled}
            onCambio={(v) => set('headers', v.split('|').map((s) => s.trim()))} />
          <div className="editor-campo">
            <label htmlFor={`${uid}-f`}>Filas (una por renglón, celdas separadas por |)</label>
            <textarea id={`${uid}-f`} rows={4} disabled={disabled}
              value={(bloque.filas || []).map((f) => f.join(' | ')).join('\n')}
              onChange={(e) => set('filas', e.target.value.split('\n').map((l) => l.split('|').map((s) => s.trim())))} />
            <p className="editor-nota">Cada fila necesita tantas celdas como encabezados.</p>
          </div>
        </>
      )
    case 'callout':
      return (
        <>
          <div className="editor-campo">
            <label htmlFor={`${uid}-v`}>Tipo de recuadro</label>
            <select id={`${uid}-v`} value={bloque.variante} disabled={disabled}
              onChange={(e) => set('variante', e.target.value)}>
              {VARIANTES_CALLOUT.map((v) => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <CampoTexto id={`${uid}-ti`} etiqueta="Título (opcional)" valor={bloque.titulo}
            onCambio={(v) => set('titulo', v)} disabled={disabled} />
          <CampoTexto id={`${uid}-t`} etiqueta="Texto" multilinea valor={bloque.texto}
            onCambio={(v) => set('texto', v)} disabled={disabled} />
        </>
      )
    case 'formula':
      return (
        <>
          <CampoTexto id={`${uid}-t`} etiqueta="Fórmula" valor={bloque.texto}
            onCambio={(v) => set('texto', v)} disabled={disabled} />
          <CampoTexto id={`${uid}-n`} etiqueta="Nota (opcional)" valor={bloque.nota}
            onCambio={(v) => set('nota', v)} disabled={disabled} />
        </>
      )
    case 'imagen':
    case 'diagrama':
      return (
        <>
          <CampoTexto id={`${uid}-s`} etiqueta="Enlace de la imagen (https)" valor={bloque.src}
            onCambio={(v) => set('src', v)} disabled={disabled}
            pista="Puedes dejarlo vacío y llenar el pie/búsqueda: quedará un hueco para conseguir la imagen." />
          <CampoTexto id={`${uid}-c`} etiqueta={bloque.tipo === 'diagrama' ? 'Título / pie' : 'Pie de imagen'}
            valor={bloque.tipo === 'diagrama' ? bloque.titulo : bloque.caption}
            onCambio={(v) => set(bloque.tipo === 'diagrama' ? 'titulo' : 'caption', v)} disabled={disabled} />
          {bloque.tipo === 'imagen' && (
            <CampoTexto id={`${uid}-a`} etiqueta="Texto alternativo (accesibilidad)" valor={bloque.alt}
              onCambio={(v) => set('alt', v)} disabled={disabled} />
          )}
        </>
      )
    case 'fuentes':
      return (
        <div className="ct-lista-objetos">
          {(bloque.items || []).map((f, i) => (
            <div className="ct-objeto" key={i}>
              <input type="text" aria-label={`Nombre de la fuente ${i + 1}`} placeholder="Nombre"
                value={f.nombre || ''} disabled={disabled}
                onChange={(e) => {
                  const items = [...bloque.items]; items[i] = { ...f, nombre: e.target.value }; set('items', items)
                }} />
              <input type="text" aria-label={`Enlace de la fuente ${i + 1}`} placeholder="https://…"
                value={f.url || ''} disabled={disabled}
                onChange={(e) => {
                  const items = [...bloque.items]; items[i] = { ...f, url: e.target.value }; set('items', items)
                }} />
              <button type="button" className="editor-expandir ct-quitar" disabled={disabled}
                aria-label={`Quitar la fuente ${i + 1}`}
                onClick={() => set('items', bloque.items.filter((_, j) => j !== i))}>
                <Icon name="basura" size={14} />
              </button>
            </div>
          ))}
          <BotonChico icono="mas" etiqueta="Agregar fuente" disabled={disabled}
            onClick={() => set('items', [...(bloque.items || []), { nombre: '', url: '' }])} />
        </div>
      )
    default:
      return <p className="editor-nota">Este tipo de bloque ({bloque.tipo}) se conserva tal cual.</p>
  }
}

// ---------- opciones con casillas de "correcta" (quiz, repaso, completar) ----------

function EditorOpciones({ uid, opciones, correctas, disabled, onCambio }) {
  return (
    <div className="editor-campo">
      <span className="ct-etiqueta">Opciones (marca las correctas)</span>
      {(opciones || []).map((op, oi) => (
        <div className="ct-opcion" key={oi}>
          <input
            type="checkbox"
            id={`${uid}-c${oi}`}
            checked={correctas.includes(oi)}
            disabled={disabled}
            onChange={(e) => {
              const set = new Set(correctas)
              if (e.target.checked) set.add(oi); else set.delete(oi)
              onCambio(opciones, [...set].sort((a, b) => a - b))
            }}
          />
          <label className="sr-only" htmlFor={`${uid}-c${oi}`}>Opción {oi + 1} correcta</label>
          <input type="text" aria-label={`Texto de la opción ${oi + 1}`} value={op} disabled={disabled}
            onChange={(e) => {
              const ops = [...opciones]; ops[oi] = e.target.value
              onCambio(ops, correctas)
            }} />
          <button type="button" className="editor-expandir ct-quitar" disabled={disabled || opciones.length <= 2}
            aria-label={`Quitar la opción ${oi + 1}`}
            onClick={() => onCambio(
              opciones.filter((_, j) => j !== oi),
              correctas.filter((c) => c !== oi).map((c) => (c > oi ? c - 1 : c)),
            )}>
            <Icon name="basura" size={14} />
          </button>
        </div>
      ))}
      <BotonChico icono="mas" etiqueta="Agregar opción" disabled={disabled || (opciones || []).length >= 6}
        onClick={() => onCambio([...(opciones || []), ''], correctas)} />
    </div>
  )
}

// ---------- editor de preguntas (quiz del tema / repaso de actividades) ----------

function EditorPreguntas({ preguntas, uid, disabled, conPeso, onCambio }) {
  const setPregunta = (i, q) => onCambio(preguntas.map((p, j) => (j === i ? q : p)))
  const mover = (de, a) => {
    const n = [...preguntas]; const [q] = n.splice(de, 1); n.splice(a, 0, q); onCambio(n)
  }
  return (
    <div className="ct-lista-objetos">
      {preguntas.map((q, i) => {
        const idQ = `${uid}-q${i}`
        const correctas = correctasDe(q)
        return (
          <fieldset className="ct-pregunta" key={i}>
            <legend>Pregunta {i + 1}</legend>
            <div className="ct-pregunta-cabecera">
              {conPeso && (
                <div className="editor-campo ct-peso">
                  <label htmlFor={`${idQ}-peso`}>Ponderación</label>
                  <input id={`${idQ}-peso`} type="number" min="0.5" max="100" step="0.5"
                    value={q.peso ?? 1} disabled={disabled}
                    onChange={(e) => setPregunta(i, { ...q, peso: Number(e.target.value) })} />
                </div>
              )}
              <FilaOrden indice={i} total={preguntas.length} etiqueta={`la pregunta ${i + 1}`} disabled={disabled}
                onMover={mover}
                onDuplicar={() => onCambio([...preguntas.slice(0, i + 1), duplicarPregunta(q), ...preguntas.slice(i + 1)])}
                onQuitar={() => onCambio(preguntas.filter((_, j) => j !== i))} />
            </div>
            <CampoTexto id={idQ} etiqueta="Enunciado" multilinea valor={q.pregunta}
              onCambio={(v) => setPregunta(i, { ...q, pregunta: v })} disabled={disabled} />
            <EditorOpciones uid={idQ} opciones={q.opciones || []} correctas={correctas} disabled={disabled}
              onCambio={(opciones, correcta) => setPregunta(i, { ...q, opciones, correcta })} />
            <CampoTexto id={`${idQ}-e`} etiqueta="Explicación (se muestra al responder)" multilinea
              valor={q.explicacion} onCambio={(v) => setPregunta(i, { ...q, explicacion: v })} disabled={disabled} />
          </fieldset>
        )
      })}
      <BotonChico icono="mas" etiqueta="Agregar pregunta" disabled={disabled}
        onClick={() => onCambio([...preguntas, { ...preguntaNueva(), correcta: [0] }])} />
    </div>
  )
}

// ---------- filas tituladas (videos, fuentes, conceptos, flashcards…) ----------

function EditorFilas({ filas, campos, etiquetaFila, uid, disabled, onCambio, extra }) {
  return (
    <div className="ct-lista-objetos">
      {filas.map((fila, i) => (
        <div className="ct-objeto" key={i}>
          {campos.map(({ campo, etiqueta, ancho }) => (
            <input key={campo} type="text" aria-label={`${etiqueta} (${etiquetaFila} ${i + 1})`}
              placeholder={etiqueta} value={fila[campo] || ''} disabled={disabled}
              style={ancho ? { flexBasis: ancho } : undefined}
              onChange={(e) => onCambio(filas.map((f, j) => (j === i ? { ...f, [campo]: e.target.value } : f)))} />
          ))}
          {extra?.(fila, i)}
          <button type="button" className="editor-expandir ct-quitar" disabled={disabled}
            aria-label={`Quitar ${etiquetaFila} ${i + 1}`}
            onClick={() => onCambio(filas.filter((_, j) => j !== i))}>
            <Icon name="basura" size={14} />
          </button>
        </div>
      ))}
      <BotonChico icono="mas" etiqueta={`Agregar ${etiquetaFila}`} disabled={disabled}
        onClick={() => onCambio([...filas, Object.fromEntries(campos.map((c) => [c.campo, '']))])} />
    </div>
  )
}

// ============================================================
//  Panel principal
// ============================================================
export default function PanelContenidoTema({
  temaDoc, academiaId, modoPlantilla = false, ocupado = false,
  onGuardar, onDirty,
}) {
  const uid = useId()
  const [borrador, setBorrador] = useState(null)
  const [sucio, setSucio] = useState(false)
  const [error, setError] = useState('')
  const [previa, setPrevia] = useState(false)
  const [subiendo, setSubiendo] = useState(null) // { destino, pct }
  const inputArchivo = useRef(null)
  const inputImagen = useRef(null)

  // Nuevo doc o nueva versión guardada → reiniciar el borrador local.
  useEffect(() => {
    if (temaDoc) setBorrador(extraerBorrador(temaDoc))
    setSucio(false)
    setError('')
  }, [temaDoc?.docId, temaDoc?.version]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { onDirty?.(sucio) }, [sucio, onDirty])

  const editar = (fn) => {
    setBorrador((prev) => {
      const n = clonProfundo(prev)
      fn(n)
      return n
    })
    setSucio(true)
    setError('')
  }

  const contadores = useMemo(() => (borrador ? {
    secciones: borrador.secciones.length,
    bloques: borrador.secciones.reduce((n, s) => n + (s.bloques?.length || 0), 0),
    quiz: borrador.quiz.length,
    conceptos: borrador.conceptosClave.length,
    flashcards: borrador.flashcards.length,
    recursos: ['videos', 'fuentes', 'imagenes', 'archivos'].reduce((n, l) => n + borrador.recursos[l].length, 0),
    actividades: (borrador.actividades.ordenar ? 1 : 0)
      + borrador.actividades.completar.length + borrador.actividades.preguntas.length,
  } : null), [borrador])

  if (!temaDoc || !borrador) {
    return <p className="editor-nota">Cargando el contenido del tema…</p>
  }

  const deshabilitado = ocupado || temaDoc.estado === 'archivado'

  const guardar = async () => {
    const contenido = normalizarContenido(borrador)
    const e = validarContenidoTema(contenido)
    if (e) { setError(e); return }
    const ok = await onGuardar(contenido)
    if (ok) setSucio(false)
  }

  const descartar = () => {
    setBorrador(extraerBorrador(temaDoc))
    setSucio(false)
    setError('')
  }

  // ---- subida de archivos (Storage aislado por academia) ----
  const subir = async (archivo, carpeta, alTerminar) => {
    if (!archivo) return
    setError('')
    setSubiendo({ destino: carpeta, pct: 0 })
    try {
      const { subirArchivoAcademia } = await import('../../lib/firebase/almacen.js')
      const subido = await subirArchivoAcademia({
        academiaId, archivo, carpeta,
        onProgreso: (pct) => setSubiendo({ destino: carpeta, pct }),
      })
      alTerminar(subido)
    } catch (err) {
      setError(err?.message || 'No se pudo subir el archivo.')
    } finally {
      setSubiendo(null)
    }
  }

  const grupos = [
    {
      clave: 'secciones', titulo: `Contenido del tema (${contadores.secciones} secciones · ${contadores.bloques} bloques)`,
      cuerpo: (
        <>
          {borrador.secciones.map((sec, si) => (
            <fieldset className="ct-seccion" key={si}>
              <legend>Sección {si + 1}</legend>
              <div className="ct-pregunta-cabecera">
                <CampoTexto id={`${uid}-s${si}`} etiqueta="Título de la sección" valor={sec.titulo}
                  onCambio={(v) => editar((b) => { b.secciones[si].titulo = v })} disabled={deshabilitado} />
                <FilaOrden indice={si} total={borrador.secciones.length} etiqueta={`la sección ${si + 1}`} disabled={deshabilitado}
                  onMover={(de, a) => editar((b) => { const [s] = b.secciones.splice(de, 1); b.secciones.splice(a, 0, s) })}
                  onDuplicar={() => editar((b) => { b.secciones.splice(si + 1, 0, duplicarSeccion(b.secciones[si])) })}
                  onQuitar={() => editar((b) => { b.secciones.splice(si, 1) })} />
              </div>
              {(sec.bloques || []).map((bl, bi) => (
                <div className="ct-bloque" key={bi}>
                  <div className="ct-bloque-cabecera">
                    <span className="ct-bloque-tipo">{TIPOS_BLOQUE[bl.tipo]?.etiqueta || bl.tipo}</span>
                    <FilaOrden indice={bi} total={sec.bloques.length} etiqueta={`el bloque ${bi + 1}`} disabled={deshabilitado}
                      onMover={(de, a) => editar((b) => { const lista = b.secciones[si].bloques; const [x] = lista.splice(de, 1); lista.splice(a, 0, x) })}
                      onDuplicar={() => editar((b) => { b.secciones[si].bloques.splice(bi + 1, 0, clonProfundo(bl)) })}
                      onQuitar={() => editar((b) => { b.secciones[si].bloques.splice(bi, 1) })} />
                  </div>
                  <EditorBloque bloque={bl} uid={`${uid}-s${si}b${bi}`} disabled={deshabilitado}
                    onCambio={(nuevo) => editar((b) => { b.secciones[si].bloques[bi] = nuevo })} />
                </div>
              ))}
              <AgregarBloque uid={`${uid}-add${si}`} disabled={deshabilitado}
                onAgregar={(tipo) => editar((b) => { b.secciones[si].bloques.push(bloqueNuevo(tipo)) })} />
            </fieldset>
          ))}
          <BotonChico icono="mas" etiqueta="Agregar sección" disabled={deshabilitado}
            onClick={() => editar((b) => { b.secciones.push({ titulo: '', bloques: [bloqueNuevo('p')] }) })} />
        </>
      ),
    },
    {
      clave: 'objetivos', titulo: `Objetivos y datos generales (${borrador.objetivos.length} objetivos)`,
      cuerpo: (
        <>
          <CampoTexto id={`${uid}-dur`} etiqueta="Duración estimada (p. ej. 45 min)" valor={borrador.duracion}
            onCambio={(v) => editar((b) => { b.duracion = v })} disabled={deshabilitado} />
          <ListaLineas id={`${uid}-obj`} etiqueta="Objetivos de aprendizaje" valor={borrador.objetivos}
            onCambio={(v) => editar((b) => { b.objetivos = v })} disabled={deshabilitado} />
        </>
      ),
    },
    {
      clave: 'conceptos', titulo: `Conceptos clave (${contadores.conceptos}) — alimentan la actividad de unir`,
      cuerpo: (
        <EditorFilas uid={uid} etiquetaFila="concepto" disabled={deshabilitado}
          filas={borrador.conceptosClave}
          campos={[{ campo: 'termino', etiqueta: 'Término' }, { campo: 'definicion', etiqueta: 'Definición', ancho: '55%' }]}
          onCambio={(v) => editar((b) => { b.conceptosClave = v })} />
      ),
    },
    {
      clave: 'flashcards', titulo: `Flashcards (${contadores.flashcards})`,
      cuerpo: (
        <EditorFilas uid={uid} etiquetaFila="flashcard" disabled={deshabilitado}
          filas={borrador.flashcards}
          campos={[{ campo: 'frente', etiqueta: 'Frente (pregunta)' }, { campo: 'reverso', etiqueta: 'Reverso (respuesta)', ancho: '50%' }]}
          onCambio={(v) => editar((b) => { b.flashcards = v })} />
      ),
    },
    {
      clave: 'quiz', titulo: `Quiz del tema (${contadores.quiz} preguntas) — también alimenta el examen de la fase`,
      cuerpo: (
        <>
          <p className="editor-nota">
            La ponderación (peso) cuenta más una pregunta al calcular la calificación.
            Con todas en 1, la calificación es el clásico aciertos/total.
          </p>
          <EditorPreguntas preguntas={borrador.quiz} uid={`${uid}-quiz`} conPeso disabled={deshabilitado}
            onCambio={(v) => editar((b) => { b.quiz = v })} />
        </>
      ),
    },
    {
      clave: 'recursos', titulo: `Recursos (${contadores.recursos}) — videos, enlaces, imágenes y descargables`,
      cuerpo: (
        <>
          <h4 className="ct-etiqueta">Videos</h4>
          <EditorFilas uid={`${uid}-v`} etiquetaFila="video" disabled={deshabilitado}
            filas={borrador.recursos.videos}
            campos={[{ campo: 'titulo', etiqueta: 'Título' }, { campo: 'url', etiqueta: 'https://…', ancho: '40%' }, { campo: 'canal', etiqueta: 'Canal' }]}
            onCambio={(v) => editar((b) => { b.recursos.videos = v })} />
          <h4 className="ct-etiqueta">Fuentes y enlaces</h4>
          <EditorFilas uid={`${uid}-f`} etiquetaFila="fuente" disabled={deshabilitado}
            filas={borrador.recursos.fuentes}
            campos={[{ campo: 'titulo', etiqueta: 'Título' }, { campo: 'url', etiqueta: 'https://…', ancho: '40%' }, { campo: 'tipo', etiqueta: 'Tipo (guía, artículo…)' }]}
            onCambio={(v) => editar((b) => { b.recursos.fuentes = v })} />
          <h4 className="ct-etiqueta">Imágenes del tema</h4>
          <EditorFilas uid={`${uid}-i`} etiquetaFila="imagen" disabled={deshabilitado}
            filas={borrador.recursos.imagenes}
            campos={[{ campo: 'src', etiqueta: 'https://… (o sube una)', ancho: '40%' }, { campo: 'caption', etiqueta: 'Pie' }, { campo: 'busqueda', etiqueta: 'Término de búsqueda' }]}
            onCambio={(v) => editar((b) => { b.recursos.imagenes = v })} />
          {!modoPlantilla && (
            <p className="ct-subir">
              <input ref={inputImagen} type="file" accept={ACCEPT_IMAGENES} className="sr-only"
                id={`${uid}-subir-img`}
                onChange={(e) => {
                  const f = e.target.files?.[0]; e.target.value = ''
                  subir(f, 'imagenes', ({ url }) => editar((b) => { b.recursos.imagenes.push({ src: url, caption: f.name, busqueda: '' }) }))
                }} />
              <BotonChico icono="subir" etiqueta={subiendo?.destino === 'imagenes' ? `Subiendo… ${subiendo.pct}%` : 'Subir imagen'}
                disabled={deshabilitado || !!subiendo} onClick={() => inputImagen.current?.click()} />
            </p>
          )}
          <h4 className="ct-etiqueta">Archivos descargables</h4>
          {borrador.recursos.archivos.map((a, i) => (
            <div className="ct-objeto" key={i}>
              <input type="text" aria-label={`Título del archivo ${i + 1}`} placeholder="Título"
                value={a.titulo || ''} disabled={deshabilitado}
                onChange={(e) => editar((b) => { b.recursos.archivos[i].titulo = e.target.value })} />
              <span className="ct-archivo-nombre" title={a.path}>{(a.path || '').split('/').pop() || 'archivo'}</span>
              <button type="button" className="editor-expandir ct-quitar" disabled={deshabilitado}
                aria-label={`Quitar el archivo ${i + 1}`}
                onClick={() => editar((b) => { b.recursos.archivos.splice(i, 1) })}>
                <Icon name="basura" size={14} />
              </button>
            </div>
          ))}
          {modoPlantilla ? (
            <p className="editor-nota">Las plantillas globales no llevan archivos: se suben en cada academia.</p>
          ) : (
            <p className="ct-subir">
              <input ref={inputArchivo} type="file" accept={ACCEPT_ARCHIVOS} className="sr-only"
                id={`${uid}-subir-arch`}
                onChange={(e) => {
                  const f = e.target.files?.[0]; e.target.value = ''
                  subir(f, 'archivos', ({ url, path, tipo, tamano }) =>
                    editar((b) => { b.recursos.archivos.push({ titulo: f.name.replace(/\.[a-z0-9]+$/i, ''), url, path, tipo, tamano }) }))
                }} />
              <BotonChico icono="subir" etiqueta={subiendo?.destino === 'archivos' ? `Subiendo… ${subiendo.pct}%` : 'Subir archivo (pdf, audio, video)'}
                disabled={deshabilitado || !!subiendo} onClick={() => inputArchivo.current?.click()} />
              <span className="editor-nota">Se aceptan: {ACCEPT_ARCHIVOS} · queda guardado en el almacén privado de esta academia.</span>
            </p>
          )}
        </>
      ),
    },
    {
      clave: 'actividades', titulo: `Actividades de repaso (${contadores.actividades})`,
      cuerpo: (
        <>
          <h4 className="ct-etiqueta">Ordenar la secuencia</h4>
          {borrador.actividades.ordenar ? (
            <>
              <CampoTexto id={`${uid}-ot`} etiqueta="Título de la secuencia" valor={borrador.actividades.ordenar.titulo}
                onCambio={(v) => editar((b) => { b.actividades.ordenar.titulo = v })} disabled={deshabilitado} />
              <ListaLineas id={`${uid}-op`} etiqueta="Pasos EN EL ORDEN CORRECTO (la app los baraja)"
                valor={borrador.actividades.ordenar.pasos}
                onCambio={(v) => editar((b) => { b.actividades.ordenar.pasos = v })} disabled={deshabilitado} />
              <BotonChico icono="basura" etiqueta="Quitar esta actividad" peligro disabled={deshabilitado}
                onClick={() => editar((b) => { b.actividades.ordenar = null })} />
            </>
          ) : (
            <BotonChico icono="mas" etiqueta="Agregar actividad de ordenar" disabled={deshabilitado}
              onClick={() => editar((b) => { b.actividades.ordenar = { titulo: '', pasos: ['', ''] } })} />
          )}
          <h4 className="ct-etiqueta">Completar la frase</h4>
          {borrador.actividades.completar.map((it, i) => (
            <fieldset className="ct-pregunta" key={i}>
              <legend>Frase {i + 1}</legend>
              <div className="ct-pregunta-cabecera">
                <span />
                <BotonChico icono="basura" etiqueta="Quitar frase" peligro disabled={deshabilitado}
                  onClick={() => editar((b) => { b.actividades.completar.splice(i, 1) })} />
              </div>
              <CampoTexto id={`${uid}-cf${i}`} etiqueta="Frase (marca el hueco con ___)" multilinea
                valor={it.texto} onCambio={(v) => editar((b) => { b.actividades.completar[i].texto = v })}
                disabled={deshabilitado} pista="Ejemplo: El corazón ___ sangre a todo el cuerpo." />
              <EditorOpciones uid={`${uid}-cfq${i}`} opciones={it.opciones || []} correctas={correctasDe(it)}
                disabled={deshabilitado}
                onCambio={(opciones, correcta) => editar((b) => {
                  b.actividades.completar[i] = { ...b.actividades.completar[i], opciones, correcta }
                })} />
              <CampoTexto id={`${uid}-cfe${i}`} etiqueta="Explicación (opcional)" multilinea
                valor={it.explicacion} disabled={deshabilitado}
                onCambio={(v) => editar((b) => { b.actividades.completar[i].explicacion = v })} />
            </fieldset>
          ))}
          <BotonChico icono="mas" etiqueta="Agregar frase para completar" disabled={deshabilitado}
            onClick={() => editar((b) => { b.actividades.completar.push({ texto: '', opciones: ['', ''], correcta: [0], explicacion: '' }) })} />
          <h4 className="ct-etiqueta">Preguntas de repaso (con explicación)</h4>
          <EditorPreguntas preguntas={borrador.actividades.preguntas} uid={`${uid}-ap`} conPeso={false}
            disabled={deshabilitado}
            onCambio={(v) => editar((b) => { b.actividades.preguntas = v })} />
        </>
      ),
    },
  ]

  return (
    <section className="ct-panel" aria-label="Contenido del tema">
      <header className="ct-panel-cabecera">
        <h3 className="editor-subtitulo">Contenido del tema</h3>
        <div className="ct-panel-acciones">
          <BotonChico icono="ojo" etiqueta="Vista previa del tema" disabled={!!subiendo}
            onClick={() => setPrevia(true)} />
          {sucio && <span className="editor-pendiente">Cambios sin guardar</span>}
          <button type="button" className="btn-pildora" disabled={!sucio || deshabilitado} onClick={descartar}>
            Descartar
          </button>
          <button type="button" className="btn-pildora btn-pildora--solido"
            disabled={!sucio || deshabilitado || !!subiendo} onClick={guardar}>
            <Icon name="check" size={16} /> Guardar contenido
          </button>
        </div>
      </header>
      {temaDoc.estado === 'archivado' && (
        <p className="editor-aviso" role="status">Tema archivado: restáuralo para editar su contenido.</p>
      )}
      {error && <p className="editor-error" role="alert">{error}</p>}

      {grupos.map((g) => (
        <details className="ct-grupo" key={g.clave}>
          <summary>{g.titulo}</summary>
          <div className="ct-grupo-cuerpo">{g.cuerpo}</div>
        </details>
      ))}

      <VistaPreviaTema
        abierto={previa}
        tema={{ ...temaDoc, ...normalizarContenido(borrador) }}
        onCerrar={() => setPrevia(false)}
      />
    </section>
  )
}

function AgregarBloque({ uid, disabled, onAgregar }) {
  const [tipo, setTipo] = useState('p')
  return (
    <div className="ct-agregar-bloque">
      <label htmlFor={uid} className="sr-only">Tipo de bloque</label>
      <select id={uid} value={tipo} disabled={disabled} onChange={(e) => setTipo(e.target.value)}>
        {Object.entries(TIPOS_BLOQUE)
          .filter(([t]) => t !== 'diagrama') // los diagramas del Atlas se editan como imagen
          .map(([t, spec]) => <option key={t} value={t}>{spec.etiqueta}</option>)}
      </select>
      <BotonChico icono="mas" etiqueta="Agregar bloque" disabled={disabled} onClick={() => onAgregar(tipo)} />
    </div>
  )
}
