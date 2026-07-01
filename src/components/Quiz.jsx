import { useState } from 'react'

// Quiz interactivo reutilizable.
// props: preguntas [{ pregunta, opciones, correcta, explicacion }], onComplete(aciertos, total), titulo
export default function Quiz({ preguntas, onComplete, titulo }) {
  const [indice, setIndice] = useState(0)
  const [seleccion, setSeleccion] = useState(null)
  const [confirmado, setConfirmado] = useState(false)
  const [aciertos, setAciertos] = useState(0)
  const [terminado, setTerminado] = useState(false)
  const [respuestas, setRespuestas] = useState([])

  const pregunta = preguntas[indice]
  const total = preguntas.length

  function confirmar() {
    if (seleccion === null) return
    const correcto = seleccion === pregunta.correcta
    setConfirmado(true)
    if (correcto) setAciertos((a) => a + 1)
    setRespuestas((r) => [...r, { pregunta, seleccion, correcto }])
  }

  function siguiente() {
    if (indice + 1 >= total) {
      setTerminado(true)
      const final = aciertos // ya actualizado por confirmar
      onComplete?.(final, total)
    } else {
      setIndice((i) => i + 1)
      setSeleccion(null)
      setConfirmado(false)
    }
  }

  function reiniciar() {
    setIndice(0)
    setSeleccion(null)
    setConfirmado(false)
    setAciertos(0)
    setTerminado(false)
    setRespuestas([])
  }

  if (terminado) {
    const pct = Math.round((aciertos / total) * 100)
    const aprobado = pct >= 70
    return (
      <div className="quiz-resultado">
        <div className={`quiz-marcador ${aprobado ? 'ok' : 'mal'}`}>
          <div className="quiz-marcador-pct">{pct}%</div>
          <div className="quiz-marcador-sub">
            {aciertos} de {total} correctas
          </div>
        </div>
        <h3>{aprobado ? '¡Excelente trabajo!' : 'Sigue practicando'}</h3>
        <p className="quiz-resultado-msg">
          {aprobado
            ? 'Dominas este contenido. Repasa las que fallaste para asegurar el 100%.'
            : 'Estás cerca. Revisa el tema y vuelve a intentarlo: el objetivo es 70% o más.'}
        </p>
        <div className="quiz-repaso">
          {respuestas.map((r, i) => (
            <div key={i} className={`quiz-repaso-item ${r.correcto ? 'ok' : 'mal'}`}>
              <span className="quiz-repaso-ico">{r.correcto ? '✓' : '✗'}</span>
              <div>
                <div className="quiz-repaso-preg">{r.pregunta.pregunta}</div>
                {!r.correcto && (
                  <div className="quiz-repaso-correcta">
                    Respuesta correcta: <strong>{r.pregunta.opciones[r.pregunta.correcta]}</strong>
                  </div>
                )}
                <div className="quiz-repaso-exp">{r.pregunta.explicacion}</div>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primario" onClick={reiniciar}>
          Intentar de nuevo
        </button>
      </div>
    )
  }

  return (
    <div className="quiz">
      <div className="quiz-cabecera">
        {titulo && <span className="quiz-titulo">{titulo}</span>}
        <span className="quiz-contador">
          Pregunta {indice + 1} / {total}
        </span>
      </div>
      <div className="quiz-barra">
        <div
          className="quiz-barra-fill"
          style={{ width: `${((indice + (confirmado ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <h3 className="quiz-pregunta">{pregunta.pregunta}</h3>

      <div className="quiz-opciones">
        {pregunta.opciones.map((op, i) => {
          let clase = 'quiz-opcion'
          if (confirmado) {
            if (i === pregunta.correcta) clase += ' correcta'
            else if (i === seleccion) clase += ' incorrecta'
          } else if (i === seleccion) {
            clase += ' seleccionada'
          }
          return (
            <button
              key={i}
              className={clase}
              onClick={() => !confirmado && setSeleccion(i)}
              disabled={confirmado}
            >
              <span className="quiz-opcion-letra">{String.fromCharCode(65 + i)}</span>
              <span>{op}</span>
              {confirmado && i === pregunta.correcta && <span className="quiz-opcion-marca">✓</span>}
              {confirmado && i === seleccion && i !== pregunta.correcta && (
                <span className="quiz-opcion-marca">✗</span>
              )}
            </button>
          )
        })}
      </div>

      {confirmado && (
        <div className={`quiz-explicacion ${seleccion === pregunta.correcta ? 'ok' : 'mal'}`}>
          <strong>{seleccion === pregunta.correcta ? '✓ Correcto. ' : '✗ Incorrecto. '}</strong>
          {pregunta.explicacion}
        </div>
      )}

      <div className="quiz-acciones">
        {!confirmado ? (
          <button
            className="btn btn-primario"
            onClick={confirmar}
            disabled={seleccion === null}
          >
            Confirmar
          </button>
        ) : (
          <button className="btn btn-primario" onClick={siguiente}>
            {indice + 1 >= total ? 'Ver resultados' : 'Siguiente →'}
          </button>
        )}
      </div>
    </div>
  )
}
