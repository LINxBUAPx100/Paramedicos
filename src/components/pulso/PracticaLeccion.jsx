import { useMemo, useState } from 'react'
import Quiz from '../Quiz.jsx'
import { useProgress } from '../../context/ProgressContext.jsx'
import { nuevaSemilla } from '../../lib/azar.js'
import { seleccionarPreguntas } from '../../lib/examenModelo.js'

// El quiz del tema, DENTRO de la lección (PTEM Pulso). Es el mismo componente,
// la misma baraja y el mismo registro que /tema/:id/quiz —que se conserva—; lo
// que cambia es que ya no hay que salir de la lección para practicar.
export const ANCLA_PRACTICA = 'leccion-practica'

export default function PracticaLeccion({ tema }) {
  const { registrarQuiz } = useProgress()
  const [semilla, setSemilla] = useState(() => nuevaSemilla(tema.id))
  const preguntas = useMemo(
    () => seleccionarPreguntas(tema.quiz || [], { semilla, tamano: null }),
    [tema, semilla]
  )
  if (!preguntas.length) return null
  return (
    <section className="pl-practica" id={ANCLA_PRACTICA} tabIndex={-1} aria-labelledby="pl-practica-titulo">
      <div className="pl-franja" aria-hidden="true" />
      <div className="pl-practica-cuerpo">
        <span className="pl-rotulo">Práctica del tema · sin salir de la lección</span>
        <h2 id="pl-practica-titulo">{preguntas.length} preguntas para llegar a «Reconoce»</h2>
        <p className="pl-nota-pie">La referencia de práctica es 70 %. No es la calificación mínima de tu academia.</p>
        <Quiz
          key={`${tema.id}-${semilla}`}
          preguntas={preguntas}
          titulo={`Tema ${tema.numero}`}
          semilla={semilla}
          onComplete={(aciertos, total) => registrarQuiz(tema.id, aciertos, total)}
          onReintentar={() => setSemilla(nuevaSemilla(tema.id))}
        />
      </div>
    </section>
  )
}
