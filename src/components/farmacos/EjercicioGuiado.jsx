import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon.jsx'
import { diagnosticar, leerNumero, fmt } from '../../lib/calculoDosis.js'

// ============================================================
//  Ejercicio guiado paso a paso
// ------------------------------------------------------------
//  El alumno resuelve UN paso cada vez. Al fallar recibe una pista que
//  nombra su error (unidades, tiempo, peso, operación invertida…), no la
//  respuesta. Al segundo fallo puede ver la resolución del paso, pero ese
//  paso cuenta como «asistido» en el resumen: el objetivo es que aprenda a
//  hacerlo, no que avance.
//
//  Tipos de paso:
//   · numérico (por omisión): { pregunta, respuesta, unidad, formula, resolucion, ctx }
//   · opción: { tipo: 'opcion', pregunta, opciones: [{ texto, correcta, porque }], resolucion }
// ============================================================

const INTENTOS_ANTES_DE_AYUDA = 2

function PasoNumerico({ p, onResuelto }) {
  const [valor, setValor] = useState('')
  const [intentos, setIntentos] = useState(0)
  const [diag, setDiag] = useState(null)
  const [visto, setVisto] = useState(false)
  const input = useRef(null)
  useEffect(() => { input.current?.focus() }, [])

  function comprobar(e) {
    e.preventDefault()
    const n = leerNumero(valor)
    const d = diagnosticar(n, p.respuesta, p.ctx)
    if (!d) { onResuelto({ primera: intentos === 0, asistido: false, errores: diag ? [diag.tipo] : [] }); return }
    setIntentos((i) => i + 1)
    setDiag(d)
  }

  function verResolucion() {
    setVisto(true)
  }

  return (
    <form className="ej-paso" onSubmit={comprobar}>
      <label className="ej-pregunta" htmlFor={`ej-${p.id}`}>{p.pregunta}</label>
      {p.formula && <p className="ej-formula"><Icon name="matraz" size={14} /> {p.formula}</p>}
      <div className="ej-entrada">
        <input
          id={`ej-${p.id}`}
          ref={input}
          inputMode="decimal"
          autoComplete="off"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          aria-describedby={diag ? `ej-${p.id}-diag` : undefined}
          disabled={visto}
        />
        <span className="ej-unidad">{p.unidad}</span>
        {!visto && <button className="btn btn--primario" type="submit" disabled={!valor.trim()}>Comprobar</button>}
      </div>
      {diag && !visto && (
        <p id={`ej-${p.id}-diag`} className="ej-pista" role="alert">
          <Icon name="alerta" size={16} /> {diag.pista}
        </p>
      )}
      {intentos >= INTENTOS_ANTES_DE_AYUDA && !visto && (
        <button type="button" className="ui-enlace" onClick={verResolucion}>Ver cómo se resuelve este paso</button>
      )}
      {visto && (
        <div className="ej-resolucion" role="status">
          <p><strong>Resolución:</strong> {p.resolucion}</p>
          <p>Respuesta: <strong>{fmt(p.respuesta, 4)} {p.unidad}</strong></p>
          <button type="button" className="btn btn--suave" onClick={() => onResuelto({ primera: false, asistido: true, errores: diag ? [diag.tipo] : [] })}>
            Entendido, seguir
          </button>
        </div>
      )}
    </form>
  )
}

function PasoOpcion({ p, onResuelto }) {
  const [elegida, setElegida] = useState(null)
  const [fallos, setFallos] = useState([])
  const correcta = elegida != null && p.opciones[elegida].correcta

  function elegir(i) {
    if (correcta) return
    setElegida(i)
    if (!p.opciones[i].correcta) setFallos((f) => (f.includes(i) ? f : [...f, i]))
  }

  return (
    <div className="ej-paso">
      <p className="ej-pregunta">{p.pregunta}</p>
      <div className="ej-opciones" role="group" aria-label={p.pregunta}>
        {p.opciones.map((o, i) => (
          <button
            key={o.texto}
            type="button"
            className={`ej-opcion ${fallos.includes(i) ? 'is-mal' : ''} ${correcta && elegida === i ? 'is-bien' : ''}`}
            onClick={() => elegir(i)}
            disabled={fallos.includes(i) || correcta}
            aria-pressed={elegida === i}
          >
            {o.texto}
          </button>
        ))}
      </div>
      {elegida != null && (
        <p className={correcta ? 'ej-bien' : 'ej-pista'} role="alert">
          <Icon name={correcta ? 'check' : 'alerta'} size={16} /> {p.opciones[elegida].porque}
        </p>
      )}
      {correcta && (
        <button type="button" className="btn btn--primario" onClick={() => onResuelto({ primera: fallos.length === 0, asistido: false, errores: fallos.length ? ['opcion'] : [] })}>
          Siguiente paso <Icon name="chevronDer" size={15} />
        </button>
      )}
    </div>
  )
}

export default function EjercicioGuiado({ ejercicio, onTerminar, cabecera = null, pie = null }) {
  const [indice, setIndice] = useState(0)
  const [resultados, setResultados] = useState([])
  const total = ejercicio.pasos.length
  const terminado = resultados.length === total

  function resuelto(r) {
    const nuevos = [...resultados, r]
    setResultados(nuevos)
    if (nuevos.length < total) setIndice((i) => i + 1)
    else onTerminar?.(nuevos)
  }

  const p = ejercicio.pasos[indice]
  const primera = resultados.filter((r) => r.primera).length
  const asistidos = resultados.filter((r) => r.asistido).length

  return (
    <div className="ej">
      {cabecera}
      <p className="ej-enunciado">{ejercicio.enunciado}</p>
      <ol className="ej-hechos" aria-label="Pasos resueltos">
        {ejercicio.pasos.slice(0, resultados.length).map((q, i) => (
          <li key={q.id} className={resultados[i].asistido ? 'is-asistido' : 'is-bien'}>
            <Icon name={resultados[i].asistido ? 'ojo' : 'check'} size={14} />
            <span>{q.pregunta} <strong>{q.tipo === 'opcion' ? q.opciones.find((o) => o.correcta).texto : `${fmt(q.respuesta, 4)} ${q.unidad}`}</strong></span>
          </li>
        ))}
      </ol>
      {!terminado && (
        <>
          <p className="ej-progreso">Paso {indice + 1} de {total}</p>
          {p.tipo === 'opcion'
            ? <PasoOpcion key={`${p.id}-${indice}`} p={p} onResuelto={resuelto} />
            : <PasoNumerico key={`${p.id}-${indice}`} p={p} onResuelto={resuelto} />}
        </>
      )}
      {terminado && (
        <div className="ej-fin" role="status">
          <strong>
            {asistidos === 0 && primera === total ? 'Perfecto: todos los pasos a la primera.'
              : asistidos === 0 ? `Resuelto: ${primera} de ${total} pasos a la primera.`
                : `Terminado con ayuda en ${asistidos} de ${total} pasos. Repite uno nuevo sin mirar la resolución.`}
          </strong>
          {pie}
        </div>
      )}
    </div>
  )
}
