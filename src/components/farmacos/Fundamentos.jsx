import { useMemo, useState } from 'react'
import Quiz from '../Quiz.jsx'
import { TEMAS_FUNDAMENTOS, PREGUNTAS_FUNDAMENTOS } from '../../data/farmacos/fundamentos.js'

// Fundamentos: primero se lee el tema (hechos cortos, cada uno con su
// fuente) y después se practica con preguntas que solo preguntan eso.
export default function Fundamentos() {
  const [tema, setTema] = useState('todos')
  const [ronda, setRonda] = useState(0)
  const temas = tema === 'todos' ? TEMAS_FUNDAMENTOS : TEMAS_FUNDAMENTOS.filter((t) => t.id === tema)
  const preguntas = useMemo(
    () => PREGUNTAS_FUNDAMENTOS.filter((p) => tema === 'todos' || p.tema === tema),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tema, ronda],
  )

  return (
    <>
      <div className="ui-herramientas">
        <label className="ui-campo">Tema
          <select value={tema} onChange={(e) => setTema(e.target.value)}>
            <option value="todos">Todos</option>
            {TEMAS_FUNDAMENTOS.map((t) => <option key={t.id} value={t.id}>{t.titulo}</option>)}
          </select>
        </label>
      </div>
      {temas.map((t) => (
        <details key={t.id} className="ui-indice" open={tema !== 'todos'}>
          <summary>{t.titulo}</summary>
          <ul className="fund-hechos">
            {t.hechos.map((h) => (
              <li key={h.texto}>
                {h.texto}{' '}
                <a className="staff-ayuda" href={h.fuente.url} target="_blank" rel="noreferrer noopener">
                  [{h.fuente.documento}{h.fuente.seccion ? `, ${h.fuente.seccion}` : ''}]
                </a>
              </li>
            ))}
          </ul>
        </details>
      ))}
      <section className="ui-panel">
        <Quiz key={`${tema}-${ronda}`} titulo="Fundamentos de farmacología" preguntas={preguntas} onReintentar={() => setRonda((r) => r + 1)} />
      </section>
    </>
  )
}
