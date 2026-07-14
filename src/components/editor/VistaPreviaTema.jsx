import { useEffect, useRef } from 'react'
import Icon from '../Icon.jsx'
import Contenido from '../Contenido.jsx'
import Recursos from '../Recursos.jsx'
import Actividades from '../Actividades.jsx'
import Quiz from '../Quiz.jsx'

// Vista previa del CONTENIDO de un tema tal como lo verá el alumno:
// usa LOS MISMOS componentes de TemaPage (Contenido/Recursos/Actividades/
// Quiz) — pero sin `onComplete` en el quiz y sin ningún módulo de progreso,
// así que aquí es IMPOSIBLE registrar progreso, intentos o calificaciones.
export default function VistaPreviaTema({ abierto, tema, onCerrar }) {
  const refCerrar = useRef(null)
  const disparador = useRef(null)

  useEffect(() => {
    if (!abierto) return
    disparador.current = document.activeElement
    refCerrar.current?.focus()
    const alTeclear = (e) => { if (e.key === 'Escape') onCerrar?.() }
    document.addEventListener('keydown', alTeclear)
    return () => {
      document.removeEventListener('keydown', alTeclear)
      disparador.current?.focus?.()
    }
  }, [abierto, onCerrar])

  if (!abierto || !tema) return null

  return (
    <div className="dialogo-fondo" onMouseDown={(e) => { if (e.target === e.currentTarget) onCerrar?.() }}>
      <div className="dialogo dialogo--previa" role="dialog" aria-modal="true" aria-labelledby="previa-tema-titulo">
        <header className="previa-cabecera">
          <p className="previa-banda" role="status">
            <Icon name="ojo" size={16} /> Modo vista previa — así verá este tema un alumno
            (con tus cambios sin guardar incluidos). Nada de lo que hagas aquí registra progreso.
          </p>
          <div className="previa-fila">
            <h2 id="previa-tema-titulo">{tema.titulo || 'Tema'}</h2>
            <button type="button" ref={refCerrar} className="btn-pildora" onClick={onCerrar}>
              <Icon name="flechaIzq" size={16} /> Volver al editor
            </button>
          </div>
        </header>
        <div className="previa-cuerpo">
          {tema.resumen && <p className="previa-sub">{tema.resumen}</p>}
          {(tema.objetivos || []).length > 0 && (
            <div className="c-lista-wrap">
              <h4 className="c-lista-titulo">Objetivos de aprendizaje</h4>
              <ul className="c-lista">
                {tema.objetivos.map((o, i) => <li key={i}>{o}</li>)}
              </ul>
            </div>
          )}
          <Contenido secciones={tema.secciones || []} />
          <Recursos recursos={tema.recursos} />
          {(tema.quiz || []).length > 0 && (
            <Quiz
              preguntas={tema.quiz}
              titulo={`Quiz: ${tema.titulo || ''}`}
            />
          )}
          <Actividades
            pares={tema.conceptosClave || []}
            ordenar={tema.actividades?.ordenar}
            completar={tema.actividades?.completar || []}
            preguntas={tema.actividades?.preguntas || []}
          />
        </div>
      </div>
    </div>
  )
}
