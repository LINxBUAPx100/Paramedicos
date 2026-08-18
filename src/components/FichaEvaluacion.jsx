import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

// ============================================================
//  Ficha de un nodo de EXAMEN o de PRÁCTICA
// ------------------------------------------------------------
//  Estos nodos existen en el plan y antes se abrían como una lección vacía o,
//  peor, con prosa de relleno. Lo que un alumno necesita ver aquí es qué le
//  van a preguntar, de dónde salen los reactivos y qué está todavía sin
//  decidir — no un artículo.
// ============================================================

export default function FichaEvaluacion({
  tema, temasDelAlcance = [], preguntasDisponibles = 0, pendientesDeValidar = 0,
}) {
  const ev = tema.evaluacion
  const alcance = tema.alcanceExamen
  if (!ev && !alcance) return null
  const esPractica = ev?.tipo === 'practica'

  return (
    <section className="ficha-eval">
      <header className="ficha-eval-cab">
        <span className="ficha-eval-ico">
          <Icon name={esPractica ? 'matraz' : 'examen'} size={24} />
        </span>
        <div>
          <h2>{ev?.titulo || tema.titulo}</h2>
          <p>
            {esPractica
              ? 'Evaluación de desempeño: se aprueba haciendo, no leyendo.'
              : 'Evaluación escrita. Sus reactivos salen de los temas que ya estudiaste.'}
          </p>
        </div>
      </header>

      {alcance && (
        <div className="ficha-eval-bloque">
          <h3>Alcance</h3>
          <p>
            {alcance.esFinal
              ? 'Examen final: cubre todas las unidades de contenido del módulo.'
              : 'Examen parcial: cubre lo visto desde el examen anterior.'}
            {' '}Son {temasDelAlcance.length} temas y {preguntasDisponibles} preguntas aprobadas
            en el banco.
          </p>
          {/* La cifra de arriba cuenta SOLO temas validados o publicados. Si hay
              material redactado esperando revisión, se dice: si no, la ficha
              parecería estar afirmando que no existe nada escrito. */}
          {pendientesDeValidar > 0 && (
            <p className="ficha-eval-nota">
              Otros {pendientesDeValidar} temas de este alcance ya tienen preguntas redactadas,
              pero no entran al banco hasta que el cuerpo docente las valide.
            </p>
          )}
          {temasDelAlcance.length > 0 && (
            <ul className="ficha-eval-temas">
              {temasDelAlcance.map((t) => (
                <li key={t.id}>
                  <Link to={`/tema/${t.id}`}>{t.numero} · {t.tituloVisible || t.titulo}</Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {esPractica && (
        <>
          <div className="ficha-eval-bloque">
            <h3>Competencia que se evalúa</h3>
            <p>{ev.competencia}</p>
          </div>
          {ev.equipo?.length > 0 && (
            <div className="ficha-eval-bloque">
              <h3>Equipo y condiciones</h3>
              <ul>{ev.equipo.map((e, i) => <li key={i}>{e}</li>)}</ul>
            </div>
          )}
          {ev.seguridad?.length > 0 && (
            <div className="ficha-eval-bloque">
              <h3>Seguridad</h3>
              <ul>{ev.seguridad.map((e, i) => <li key={i}>{e}</li>)}</ul>
            </div>
          )}
          <div className="ficha-eval-bloque">
            <h3>Lista de cotejo</h3>
            <ul className="ficha-eval-cotejo">
              {ev.cotejo.map((c, i) => (
                <li key={i} className={c.critico ? 'es-critico' : ''}>
                  {c.paso}
                  {c.critico && <span className="chip chip-critico">Paso crítico</span>}
                </li>
              ))}
            </ul>
          </div>
          <div className="ficha-eval-bloque">
            <h3>Errores críticos</h3>
            <ul>{ev.erroresCriticos.map((e, i) => <li key={i}>{e}</li>)}</ul>
          </div>
        </>
      )}

      {ev?.reglas?.length > 0 && (
        <div className="ficha-eval-bloque">
          <h3>Reglas del examen</h3>
          <ul>{ev.reglas.map((r, i) => <li key={i}>{r}</li>)}</ul>
        </div>
      )}

      {ev?.pendientes?.length > 0 && (
        <div className="ficha-eval-bloque ficha-eval-pendiente">
          <h3><Icon name="alerta" size={16} /> Pendiente de la academia</h3>
          <ul>{ev.pendientes.map((p, i) => <li key={i}>{p}</li>)}</ul>
        </div>
      )}

      {alcance && preguntasDisponibles > 0 && (
        <Link to={`/tema/${tema.id}/examen`} className="btn btn--primario btn--lg">
          <Icon name="examen" size={17} /> Practicar este examen
        </Link>
      )}
      {alcance && preguntasDisponibles === 0 && (
        <p className="ficha-eval-vacio">
          {pendientesDeValidar > 0
            ? 'El examen permanece desactivado: sus temas tienen preguntas redactadas, pero '
              + 'ninguna validada por el cuerpo docente. Un examen no puede calificar con '
              + 'material que nadie ha revisado.'
            : 'Todavía no hay preguntas en el banco de los temas de este alcance. En cuanto se '
              + 'redacten y se validen, el examen podrá presentarse desde aquí.'}
        </p>
      )}
    </section>
  )
}
