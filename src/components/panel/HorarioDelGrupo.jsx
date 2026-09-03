import { useState } from 'react'
import Icon from '../Icon.jsx'
import { mensajeError } from '../../lib/panelModelo.js'
import {
  DIAS, normalizarHorario, resumenDeHorario, turnoDe, ETIQUETA_TURNO, problemasDeHorario,
} from '../../lib/horarioGrupos.js'

// ============================================================
//  Horario del grupo y maestro a cargo
// ------------------------------------------------------------
//  POR QUÉ HACE FALTA. Las academias no dan clase de lunes a viernes a la misma
//  hora: unos grupos son de miércoles, otros de sábado y domingo, y cada uno
//  tiene turno de mañana o de tarde. Sin ese dato la plataforma no puede hacer
//  lo único que de verdad ahorra tiempo al entrar —enseñar primero el grupo que
//  tiene clase AHORA— y la lista de grupos es un montón plano.
//
//  TRES DECISIONES DEL FORMULARIO:
//
//   · **El turno no se pregunta, se deduce y se enseña.** Se calcula de la hora
//     de inicio. Pedirlo aparte crearía dos verdades que se contradicen en
//     cuanto alguien cambie la hora y olvide el turno.
//   · **Se puede guardar a medias.** Un grupo existe antes de que se decida su
//     horario. Lo que se rechaza es un horario incoherente —termina antes de
//     empezar, días sin horas—, que no es un dato pendiente sino un dato mal.
//   · **El choque con otro grupo se AVISA, no se bloquea.** Un maestro no da
//     clase a dos grupos a la vez, pero las academias reorganizan horarios a
//     media semana: impedir el guardado obligaría a deshacer una asignación
//     para poder arreglar la otra. El aviso lo pinta quien llama, que es el que
//     ve todos los grupos a la vez.
// ============================================================
export default function HorarioDelGrupo({ grupo, profesores = [], onGuardar, deshabilitado = false }) {
  const actual = normalizarHorario(grupo)
  const [abierto, setAbierto] = useState(false)
  const [inicio, setInicio] = useState(actual.inicio)
  const [fin, setFin] = useState(actual.fin)
  const [dias, setDias] = useState(actual.dias)
  const [fechaInicio, setFechaInicio] = useState(actual.fechaInicio)
  const [titular, setTitular] = useState(grupo?.profesorTitular || '')
  const [ocupado, setOcupado] = useState(false)
  const [error, setError] = useState('')
  const [guardado, setGuardado] = useState(false)

  const horario = { inicio, fin, dias, fechaInicio }
  const problemas = problemasDeHorario(horario)
  const turno = turnoDe(horario)

  const alternarDia = (id) => {
    setGuardado(false)
    setDias((prev) => (prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]))
  }

  const guardar = async () => {
    setError('')
    setGuardado(false)
    if (problemas.length) { setError(problemas.join(' ')); return }
    setOcupado(true)
    try {
      await onGuardar({ horario, profesorTitular: titular || null })
      setGuardado(true)
    } catch (err) {
      setError(mensajeError(err))
    } finally {
      setOcupado(false)
    }
  }

  const nombreTitular = profesores.find((p) => p.id === grupo?.profesorTitular)
  const idBase = `hg-${grupo?.id || 'x'}`

  return (
    <div className="hg">
      <button
        type="button"
        className="hg-cabecera"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls={`${idBase}-panel`}
      >
        <Icon name="reloj" size={15} />
        <span className="hg-resumen">
          {resumenDeHorario(grupo)}
          {turnoDe(grupo?.horario) && ` · ${ETIQUETA_TURNO[turnoDe(grupo.horario)]}`}
        </span>
        <span className="hg-titular">
          {nombreTitular
            ? `A cargo: ${nombreTitular.nombre || nombreTitular.email}`
            : 'Sin maestro asignado'}
        </span>
        <Icon name={abierto ? 'arriba' : 'abajo'} size={14} />
      </button>

      {abierto && (
        <div className="hg-panel" id={`${idBase}-panel`}>
          <fieldset className="hg-dias">
            <legend>Días de clase</legend>
            {DIAS.map((d) => (
              <label key={d.id} className={`hg-dia ${dias.includes(d.id) ? 'activo' : ''}`}>
                <input
                  type="checkbox"
                  checked={dias.includes(d.id)}
                  disabled={deshabilitado || ocupado}
                  onChange={() => alternarDia(d.id)}
                />
                <span aria-hidden="true">{d.corta}</span>
                <span className="sr-only">{d.etiqueta}</span>
              </label>
            ))}
          </fieldset>

          <div className="hg-fila">
            <label htmlFor={`${idBase}-ini`}>
              Empieza
              <input
                id={`${idBase}-ini`} type="time" value={inicio} disabled={deshabilitado || ocupado}
                onChange={(e) => { setInicio(e.target.value); setGuardado(false) }}
              />
            </label>
            <label htmlFor={`${idBase}-fin`}>
              Termina
              <input
                id={`${idBase}-fin`} type="time" value={fin} disabled={deshabilitado || ocupado}
                onChange={(e) => { setFin(e.target.value); setGuardado(false) }}
              />
            </label>
            {/* El turno se ENSEÑA, no se pide: sale de la hora de inicio. */}
            <p className="hg-turno">
              {turno ? ETIQUETA_TURNO[turno] : 'Turno: pon la hora de inicio'}
            </p>
          </div>

          <div className="hg-fila">
            <label htmlFor={`${idBase}-desde`}>
              Primer día de clases
              <input
                id={`${idBase}-desde`} type="date" value={fechaInicio} disabled={deshabilitado || ocupado}
                onChange={(e) => { setFechaInicio(e.target.value); setGuardado(false) }}
              />
            </label>
            <label htmlFor={`${idBase}-prof`}>
              Maestro a cargo
              <select
                id={`${idBase}-prof`} value={titular} disabled={deshabilitado || ocupado}
                onChange={(e) => { setTitular(e.target.value); setGuardado(false) }}
              >
                <option value="">Sin asignar</option>
                {profesores.map((p) => (
                  <option key={p.id} value={p.id}>{p.nombre || p.email || p.id}</option>
                ))}
              </select>
            </label>
          </div>

          <p className="hg-nota">
            El grupo puede quedarse sin horario mientras se decide. Lo que no se guarda es un
            horario imposible: sin días, sin horas o terminando antes de empezar.
          </p>

          {error && <p className="cuenta-error" role="alert">{error}</p>}
          {guardado && !error && <p className="hg-ok" role="status">Horario guardado.</p>}

          <button
            type="button"
            className="btn btn--pildora"
            onClick={guardar}
            disabled={deshabilitado || ocupado || problemas.length > 0}
          >
            {ocupado ? 'Guardando…' : 'Guardar horario'}
          </button>
          {problemas.length > 0 && (
            <ul className="hg-problemas">
              {problemas.map((p) => <li key={p}>{p}</li>)}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
