import { useEffect, useMemo, useState } from 'react'
import { usePanel } from '../../components/panel/PanelShell.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import ConfirmacionReforzada from '../../components/ConfirmacionReforzada.jsx'
import Icon from '../../components/Icon.jsx'
import {
  normalizarEvaluacion, indexarCalificaciones, resumenDelGrupo, resumenDeEvaluacion,
  validarValor, resumenPorGrupos, APROBADO,
} from '../../lib/calificacionesModelo.js'

// ============================================================
//  Libro de calificaciones (Bloque S)
// ------------------------------------------------------------
//  Se califican EVALUACIONES DEL MAESTRO —un examen presencial, una práctica—,
//  no los módulos del temario, y van separadas de los `intentos` de la app: un
//  intento es repetible a voluntad y mezclarlos infla el promedio.
//
//  Aquí no se calcula nada: todo sale de `lib/calificacionesModelo.js`, que es
//  puro y está probado. Esta página lee, pinta y escribe.
// ============================================================

// EL LIBRO, sin saber de dónde salen sus datos.
//
// Estaba atado a `usePanel()`, el contexto del panel del director, y por eso el
// super-admin no podía ver ni poner una calificación: él opera cada academia
// desde /admin/academia/:id, donde ese contexto no existe. La regla es que el
// super-admin puede todo lo que puede un director, así que el libro pasa a
// recibir sus datos por props y cada pantalla se los da desde donde los tenga.
export function LibroDeCalificaciones({ academiaId, alumnos, grupos, grupoFiltro, nombreGrupo, gestion }) {
  const { esSuperadmin } = useAuth()
  const [evaluaciones, setEvaluaciones] = useState(null)
  const [calificaciones, setCalificaciones] = useState([])
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [recarga, setRecarga] = useState(0)
  const [ocupado, setOcupado] = useState(false)
  const [nueva, setNueva] = useState(null) // formulario de alta
  const [borrando, setBorrando] = useState(null)

  useEffect(() => {
    if (!academiaId) return undefined
    let vivo = true
    ;(async () => {
      try {
        const api = await import('../../lib/firebase/calificaciones.js')
        const [evs, cals] = await Promise.all([
          api.listarEvaluaciones(academiaId),
          api.listarCalificaciones(academiaId),
        ])
        if (!vivo) return
        setEvaluaciones(evs.map(normalizarEvaluacion))
        setCalificaciones(cals)
      } catch (err) {
        if (!vivo) return
        setEvaluaciones([])
        setError(
          String(err?.code || '').includes('permission-denied')
            ? 'Sin permisos: publica las reglas actualizadas de firestore.rules (colecciones "evaluaciones" y "calificaciones").'
            : 'No se pudieron cargar las calificaciones.'
        )
      }
    })()
    return () => { vivo = false }
  }, [academiaId, recarga])

  // Las evaluaciones de un grupo concreto solo aplican a ese grupo; las que no
  // llevan grupo son de toda la academia.
  const visibles = useMemo(() => {
    const lista = evaluaciones || []
    if (!grupoFiltro || grupoFiltro === 'sin') return lista
    return lista.filter((e) => !e.grupoId || e.grupoId === grupoFiltro)
  }, [evaluaciones, grupoFiltro])

  const indice = useMemo(() => indexarCalificaciones(calificaciones), [calificaciones])
  const resumen = useMemo(() => resumenDelGrupo(visibles, alumnos, indice), [visibles, alumnos, indice])
  // Retrato por grupos para quien dirige. Usa TODAS las evaluaciones, no las
  // filtradas: cada grupo se mide con las que le aplican, y eso lo decide el
  // módulo puro.
  const porGrupos = useMemo(
    () => resumenPorGrupos(evaluaciones || [], alumnos, indice, grupos || []),
    [evaluaciones, alumnos, indice, grupos]
  )

  const guardarNota = async (evaluacion, alumno, valor) => {
    const bruto = String(valor).trim()
    setError('')
    try {
      const api = await import('../../lib/firebase/calificaciones.js')
      // Vaciar la celda BORRA la nota, no pone un 0: un 0 es un juicio y una
      // celda vacía es «todavía no evaluado».
      if (bruto === '') {
        await api.quitarCalificacion(evaluacion.id, alumno.id)
        setCalificaciones((prev) => prev.filter((c) => !(c.evaluacionId === evaluacion.id && c.uid === alumno.id)))
        return
      }
      const malo = validarValor(bruto)
      if (malo) { setError(malo); return }
      await api.guardarCalificacion({
        evaluacionId: evaluacion.id,
        academiaId,
        grupoId: evaluacion.grupoId || alumno.grupoId || null,
        uid: alumno.id,
        valor: Number(bruto),
      })
      // Refleja el cambio sin recargar toda la tabla.
      setCalificaciones((prev) => {
        const resto = prev.filter((c) => !(c.evaluacionId === evaluacion.id && c.uid === alumno.id))
        return [...resto, { evaluacionId: evaluacion.id, uid: alumno.id, academiaId, valor: Number(bruto) }]
      })
    } catch (err) {
      setError(err?.message || 'No se pudo guardar la calificación.')
    }
  }

  const crear = async (e) => {
    e.preventDefault()
    setOcupado(true)
    setError('')
    try {
      const api = await import('../../lib/firebase/calificaciones.js')
      await api.crearEvaluacion({
        academiaId,
        grupoId: nueva.paraGrupo && grupoFiltro && grupoFiltro !== 'sin' ? grupoFiltro : null,
        titulo: nueva.titulo,
        descripcion: nueva.descripcion,
        ponderacion: nueva.ponderacion,
        fechaEntrega: nueva.fechaEntrega,
        enlace: nueva.enlace,
      })
      setNueva(null)
      setAviso('Evaluación creada. Ya puedes calificar en su columna.')
      setRecarga((n) => n + 1)
    } catch (err) {
      setError(err?.message || 'No se pudo crear la evaluación.')
    } finally {
      setOcupado(false)
    }
  }

  const borrar = async () => {
    setOcupado(true)
    setError('')
    try {
      const api = await import('../../lib/firebase/calificaciones.js')
      const n = await api.borrarEvaluacion(borrando.id, academiaId)
      setBorrando(null)
      setAviso(`Evaluación borrada${n > 0 ? ` junto con ${n} calificación(es)` : ''}.`)
      setRecarga((x) => x + 1)
    } catch (err) {
      setError(err?.message || 'No se pudo borrar la evaluación.')
    } finally {
      setOcupado(false)
    }
  }

  const puedeBorrar = gestion === 'director' || esSuperadmin

  if (evaluaciones === null) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando calificaciones…</span>
      </div>
    )
  }

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Calificaciones</h1>
        <p>
          Tus evaluaciones —exámenes presenciales, prácticas, trabajos— y la nota de cada alumno.
          Van aparte de los exámenes de la plataforma, que son repetibles.
        </p>
      </header>

      {error && <p className="cuenta-error" role="alert">{error}</p>}
      {aviso && <p className="cuenta-ok" role="status">{aviso}</p>}

      <section className="cal-kpis" aria-label="Resumen del grupo">
        <div className="pe-kpi">
          <b>{resumen.promedio === null ? '—' : `${resumen.promedio}%`}</b>
          <span>Promedio del grupo</span>
          <small>ponderado, solo lo calificado</small>
        </div>
        <div className="pe-kpi">
          <b>{visibles.length}</b>
          <span>Evaluaciones</span>
          <small>{grupoFiltro && grupoFiltro !== 'sin' ? nombreGrupo(grupoFiltro) : 'toda la academia'}</small>
        </div>
        <div className="pe-kpi">
          <b>{resumen.enRiesgo.length}</b>
          <span>En riesgo</span>
          <small>bajo {APROBADO}% con alguna nota</small>
        </div>
        <div className="pe-kpi">
          <b>{resumen.pendientesTotal}</b>
          <span>Sin calificar</span>
          <small>celdas por rellenar</small>
        </div>
      </section>

      {/* Quien DIRIGE necesita comparar grupos; quien da clase necesita ver a
          sus alumnos uno por uno. Son dos preguntas distintas, así que el
          director recibe además este retrato — y solo cuando mira la academia
          entera: con un grupo filtrado ya está viendo ese grupo. */}
      {puedeBorrar && (!grupoFiltro || grupoFiltro === 'sin') && porGrupos.length > 0 && (
        <section className="cal-grupos">
          <h2>Por grupo</h2>
          <div className="panel-tabla-wrap">
            <table className="panel-tabla">
              <thead>
                <tr>
                  <th scope="col">Grupo</th>
                  <th scope="col">Alumnos</th>
                  <th scope="col">Actividades</th>
                  <th scope="col">Promedio</th>
                  <th scope="col">En riesgo</th>
                  <th scope="col">Sin calificar</th>
                </tr>
              </thead>
              <tbody>
                {porGrupos.map((g) => (
                  <tr key={g.grupo.id || 'sin'}>
                    <th scope="row">{g.grupo.nombre}</th>
                    <td>{g.alumnos}</td>
                    <td>{g.evaluaciones}</td>
                    <td className={`cal-promedio ${g.promedio === null ? '' : g.promedio >= APROBADO ? 'ok' : 'mal'}`}>
                      {g.promedio === null ? '—' : `${g.promedio}%`}
                    </td>
                    <td>{g.enRiesgo > 0 ? <strong className="cal-riesgo">{g.enRiesgo}</strong> : '—'}</td>
                    <td>{g.pendientes > 0 ? g.pendientes : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="panel-nota">
            «En riesgo» cuenta solo a quien ya tiene alguna nota por debajo del {APROBADO}%. Quien
            no tiene ninguna está <strong>sin evaluar</strong>, que no es lo mismo.
          </p>
        </section>
      )}

      <div className="cal-acciones">
        <button
          type="button"
          className="btn btn--primario"
          onClick={() => setNueva({ titulo: '', descripcion: '', ponderacion: 1, paraGrupo: true, fechaEntrega: '', enlace: '' })}
        >
          <Icon name="mas" size={15} /> Nueva actividad o evaluación
        </button>
      </div>

      {nueva && (
        <form className="admin-form cal-form" onSubmit={crear}>
          <label>
            Título
            <input
              type="text" value={nueva.titulo} required maxLength={120} autoFocus
              placeholder="p. ej. Parcial 1 · Vía aérea"
              onChange={(e) => setNueva({ ...nueva, titulo: e.target.value })}
            />
          </label>
          <label>
            Ponderación
            <input
              type="number" value={nueva.ponderacion} min="0.5" max="100" step="0.5"
              onChange={(e) => setNueva({ ...nueva, ponderacion: e.target.value })}
            />
          </label>
          <label>
            Fecha de entrega (opcional)
            <input
              type="date" value={nueva.fechaEntrega}
              onChange={(e) => setNueva({ ...nueva, fechaEntrega: e.target.value })}
            />
          </label>
          <label className="pc-nota">
            Instrucciones para el alumno (opcional)
            <input
              type="text" value={nueva.descripcion} maxLength={500}
              onChange={(e) => setNueva({ ...nueva, descripcion: e.target.value })}
            />
          </label>
          <label className="pc-nota">
            Enlace al material (opcional)
            <input
              type="url" value={nueva.enlace} placeholder="https://… (Drive, PDF, video)"
              onChange={(e) => setNueva({ ...nueva, enlace: e.target.value })}
            />
          </label>
          {grupoFiltro && grupoFiltro !== 'sin' && (
            <label className="cal-check">
              <input
                type="checkbox" checked={nueva.paraGrupo}
                onChange={(e) => setNueva({ ...nueva, paraGrupo: e.target.checked })}
              />
              Solo para {nombreGrupo(grupoFiltro)}
            </label>
          )}
          <button className="btn btn--primario" type="submit" disabled={ocupado}>
            {ocupado ? 'Creando…' : 'Crear'}
          </button>
          <button className="btn btn--suave" type="button" onClick={() => setNueva(null)}>Cancelar</button>
          <p className="panel-gestion-sub" style={{ flexBasis: '100%' }}>
            La ponderación es el peso en el promedio: una práctica con peso 3 cuenta el triple que
            un examen con peso 1.
          </p>
        </form>
      )}

      {visibles.length === 0 ? (
        <p className="panel-vacio">
          Todavía no hay evaluaciones. Crea la primera y aparecerá como columna de la tabla.
        </p>
      ) : alumnos.length === 0 ? (
        <p className="panel-vacio">No hay alumnos en este grupo a los que calificar.</p>
      ) : (
        <div className="panel-tabla-wrap">
          <table className="panel-tabla cal-tabla">
            <thead>
              <tr>
                <th scope="col">Alumno</th>
                {visibles.map((ev) => {
                  const r = resumenDeEvaluacion(ev, alumnos, indice)
                  return (
                    <th key={ev.id} scope="col" className="cal-th">
                      <span className="cal-th-titulo">{ev.titulo}</span>
                      <small>
                        peso {ev.ponderacion}
                        {r.promedio !== null && ` · media ${r.promedio}%`}
                      </small>
                      {puedeBorrar && (
                        <button
                          type="button"
                          className="btn btn--sm btn--fantasma"
                          onClick={() => setBorrando(ev)}
                          aria-label={`Borrar la evaluación ${ev.titulo}`}
                        >
                          <Icon name="basura" size={13} /> Borrar
                        </button>
                      )}
                    </th>
                  )
                })}
                <th scope="col">Promedio</th>
              </tr>
            </thead>
            <tbody>
              {resumen.filas.map((fila) => (
                <tr key={fila.alumno.id}>
                  <th scope="row" className="panel-alumno">
                    {fila.alumno.nombre || fila.alumno.email || fila.alumno.id}
                    {fila.pendientes > 0 && (
                      <span className="panel-tag-grupo">{fila.pendientes} sin calificar</span>
                    )}
                  </th>
                  {visibles.map((ev) => (
                    <td key={ev.id} className="cal-celda">
                      <CeldaNota
                        valor={indice[fila.alumno.id]?.[ev.id]?.valor}
                        etiqueta={`Calificación de ${fila.alumno.nombre || fila.alumno.id} en ${ev.titulo}`}
                        onGuardar={(v) => guardarNota(ev, fila.alumno, v)}
                      />
                    </td>
                  ))}
                  <td className={`cal-promedio ${fila.promedio === null ? '' : fila.aprobado ? 'ok' : 'mal'}`}>
                    {fila.promedio === null ? '—' : `${fila.promedio}%`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="panel-nota">
        Una celda vacía significa <strong>sin calificar</strong> y no cuenta en el promedio; un
        <strong> 0</strong> sí es una nota y sí cuenta. Para quitar una nota, vacía la celda.
      </p>

      {borrando && (
        <ConfirmacionReforzada
          titulo={`Borrar la evaluación "${borrando.titulo}"`}
          frase="BORRAR EVALUACION"
          etiquetaConfirmar="Borrar definitivamente"
          ocupado={ocupado}
          onCerrar={() => setBorrando(null)}
          onConfirmar={borrar}
          resumen={
            <>
              <p>
                Se elimina la evaluación <strong>y todas las calificaciones que tenga puesta</strong>.
                No se puede deshacer.
              </p>
              <p className="cuenta-error">
                Si solo quieres dejar de usarla, bájale la ponderación o edítala: borrarla pierde el
                trabajo de calificar.
              </p>
            </>
          }
        />
      )}
    </div>
  )
}

// Celda editable. Guarda al salir del campo o con Enter, no en cada tecla: una
// escritura por pulsación llenaría Firestore de versiones intermedias.
function CeldaNota({ valor, etiqueta, onGuardar }) {
  const inicial = Number.isFinite(Number(valor)) && valor !== undefined && valor !== null ? String(valor) : ''
  const [texto, setTexto] = useState(inicial)
  // Si la tabla se recarga por fuera, la celda refleja el valor nuevo.
  useEffect(() => { setTexto(inicial) }, [inicial])

  const confirmar = () => { if (texto !== inicial) onGuardar(texto) }

  return (
    <input
      type="text"
      inputMode="numeric"
      className={`cal-input ${texto === '' ? 'vacia' : Number(texto) >= APROBADO ? 'ok' : 'mal'}`}
      value={texto}
      aria-label={etiqueta}
      placeholder="—"
      maxLength={3}
      onChange={(e) => setTexto(e.target.value.replace(/[^0-9]/g, ''))}
      onBlur={confirmar}
      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur() } }}
    />
  )
}

// El panel del director: los datos salen de su contexto, como siempre.
export default function PanelCalificaciones() {
  const { academiaId, alumnos, grupos, grupoFiltro, nombreGrupo, gestion } = usePanel()
  return (
    <LibroDeCalificaciones
      academiaId={academiaId} alumnos={alumnos} grupos={grupos}
      grupoFiltro={grupoFiltro} nombreGrupo={nombreGrupo} gestion={gestion}
    />
  )
}

