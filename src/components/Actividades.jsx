import { useMemo, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import OrdenarArrastrable from './pulso/OrdenarArrastrable.jsx'

// Baraja una copia del array (Fisher–Yates). Math.random es válido en el navegador.
function barajar(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ---- Unir palabras: emparejar término ↔ definición (desde conceptosClave) ----
function UnirPalabras({ pares }) {
  const defsBarajadas = useMemo(() => barajar(pares.map((p, i) => ({ ...p, i }))), [pares])
  const [selTermino, setSelTermino] = useState(null) // índice del término elegido
  const [emparejados, setEmparejados] = useState({}) // { iTermino: true }
  const [errorEn, setErrorEn] = useState(null) // índice def con error momentáneo

  const intentar = (iDef) => {
    if (selTermino == null) return
    if (iDef === selTermino) {
      setEmparejados((e) => ({ ...e, [selTermino]: true }))
      setSelTermino(null)
    } else {
      setErrorEn(iDef)
      setTimeout(() => setErrorEn(null), 500)
    }
  }

  const total = pares.length
  const hechos = Object.keys(emparejados).length

  return (
    <div className="act act--unir">
      <div className="act-cabe">
        <h4><Icon name="capas" size={18} /> Une cada término con su definición</h4>
        <span className="act-progreso">{hechos}/{total}</span>
      </div>
      <div className="unir-grid">
        <ul className="unir-col">
          {pares.map((p, i) => (
            <li key={i}>
              <button
                className={`unir-chip ${emparejados[i] ? 'is-ok' : ''} ${selTermino === i ? 'is-sel' : ''}`}
                onClick={() => !emparejados[i] && setSelTermino(i)}
                disabled={!!emparejados[i]}
              >
                {p.termino}
                {emparejados[i] && <Icon name="check" size={15} />}
              </button>
            </li>
          ))}
        </ul>
        <ul className="unir-col">
          {defsBarajadas.map((d) => (
            <li key={d.i}>
              <button
                className={`unir-def ${emparejados[d.i] ? 'is-ok' : ''} ${errorEn === d.i ? 'is-mal' : ''}`}
                onClick={() => intentar(d.i)}
                disabled={!!emparejados[d.i]}
              >
                {d.definicion}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {hechos === total && <p className="act-exito">¡Todo emparejado!</p>}
    </div>
  )
}

// ---- Ordenar / rompecabezas: reconstruir una secuencia ----
function Ordenar({ titulo, pasos }) {
  const [orden, setOrden] = useState(() => {
    // baraja garantizando que no quede ya ordenado
    let b = barajar(pasos.map((_, i) => i))
    if (pasos.length > 1 && b.every((v, i) => v === i)) b = [...b].reverse()
    return b
  })
  const [comprobado, setComprobado] = useState(false)

  const correctos = orden.filter((v, i) => v === i).length

  return (
    <div className="act act--ordenar">
      <div className="act-cabe">
        <h4><Icon name="temario" size={18} /> Ordena: {titulo}</h4>
        {comprobado && <span className="act-progreso">{correctos}/{pasos.length}</span>}
      </div>
      {/* Arrastre + animación de cambio de lugar (PTEM Pulso). */}
      <OrdenarArrastrable pasos={pasos} orden={orden} setOrden={setOrden} comprobado={comprobado} onMover={() => setComprobado(false)} />
      <button className="btn btn--primario act-comprobar" onClick={() => setComprobado(true)}>
        Comprobar orden
      </button>
      {comprobado && correctos === pasos.length && <p className="act-exito">¡Secuencia correcta!</p>}
    </div>
  )
}

// ---- Completar huecos: elige la palabra que falta en la frase ----
function Completar({ items, onResponder }) {
  return (
    <div className="act act--completar">
      <div className="act-cabe">
        <h4><Icon name="chispa" size={18} /> Completa la frase</h4>
      </div>
      {items.map((it, i) => (
        <CompletarItem key={i} item={it} onResponder={(ok) => onResponder?.(`c${i}`, ok)} />
      ))}
    </div>
  )
}

function CompletarItem({ item, onResponder }) {
  const [elegida, setElegida] = useState(null)
  const partes = item.texto.split('___')
  const resuelto = elegida != null
  const acierto = elegida === item.correcta
  return (
    <div className="completar-item">
      <p className="completar-frase">
        {partes[0]}
        <span className={`completar-hueco ${resuelto ? (acierto ? 'is-ok' : 'is-mal') : ''}`}>
          {resuelto ? item.opciones[elegida] : '_____'}
        </span>
        {partes[1]}
      </p>
      <div className="completar-ops">
        {item.opciones.map((op, i) => (
          <button
            key={i}
            className={`completar-op ${resuelto && i === item.correcta ? 'is-ok' : ''}`}
            onClick={() => { if (elegida == null) { setElegida(i); onResponder?.(i === item.correcta) } }}
            disabled={resuelto}
          >
            {op}
          </button>
        ))}
      </div>
      {resuelto && !acierto && item.explicacion && <p className="completar-exp">{item.explicacion}</p>}
    </div>
  )
}

// ---- Preguntas extra (repaso adicional con explicación) ----
function PreguntaItem({ q, onResponder }) {
  const [elegida, setElegida] = useState(null)
  return (
    <div className="act-preg">
      <p className="act-preg-enunciado">{q.pregunta}</p>
      <div className="act-preg-ops">
        {q.opciones.map((op, i) => {
          const resuelto = elegida != null
          const esCorrecta = i === q.correcta
          const clase = resuelto
            ? esCorrecta
              ? 'is-ok'
              : i === elegida
                ? 'is-mal'
                : ''
            : ''
          return (
            <button
              key={i}
              className={`act-preg-op ${clase}`}
              onClick={() => { if (elegida == null) { setElegida(i); onResponder?.(i === q.correcta) } }}
              disabled={elegida != null}
            >
              {op}
            </button>
          )
        })}
      </div>
      {elegida != null && <p className="act-preg-exp">{q.explicacion}</p>}
    </div>
  )
}

// Sección de actividades de un tema. Recibe pares (conceptosClave), `ordenar` y `preguntas`.
// `onCompletar(aciertos, total)` se llama UNA vez, cuando se han contestado
// todas las frases para completar y todas las preguntas: es la evidencia que
// PTEM Pulso usa para el nivel «Aplica». Cuenta el PRIMER intento de cada una
// (cada ítem admite una sola respuesta). Unir y ordenar no entran: permiten
// reintentar hasta acertar y no dirían nada del primer intento.
export default function Actividades({ pares = [], ordenar, completar = [], preguntas = [], onCompletar = null }) {
  const respuestas = useRef({})
  const avisado = useRef(false)
  const totalEvaluable = completar.length + preguntas.length
  const onResponder = (clave, ok) => {
    if (clave in respuestas.current) return
    respuestas.current[clave] = ok
    const hechas = Object.values(respuestas.current)
    if (!avisado.current && totalEvaluable > 0 && hechas.length === totalEvaluable) {
      avisado.current = true
      onCompletar?.(hechas.filter(Boolean).length, totalEvaluable)
    }
  }
  const hayUnir = pares.length >= 2
  if (!hayUnir && !ordenar && completar.length === 0 && preguntas.length === 0) return null

  return (
    <section className="actividades">
      <h2 className="seccion-titulo">Actividades de repaso</h2>
      {hayUnir && <UnirPalabras pares={pares} />}
      {ordenar && <Ordenar titulo={ordenar.titulo} pasos={ordenar.pasos} />}
      {completar.length > 0 && <Completar items={completar} onResponder={onResponder} />}
      {preguntas.length > 0 && (
        <div className="act act--preguntas">
          <div className="act-cabe">
            <h4><Icon name="pregunta" size={18} /> Preguntas de repaso</h4>
          </div>
          {preguntas.map((q, i) => (
            <PreguntaItem key={i} q={q} onResponder={(ok) => onResponder(`p${i}`, ok)} />
          ))}
        </div>
      )}
    </section>
  )
}
