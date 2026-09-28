// La tarjeta de repaso que se voltea (repaso libre, repaso espaciado y
// fármacos). Las dos caras existen a la vez y se apilan en la misma celda de
// la cuadrícula, así la tarjeta mide lo que la cara más larga y el giro no
// hace saltar la página.
//
// Al pasar a otra tarjeta el giro NO se anima de regreso: el `key` del giro
// cambia con la carta y React lo monta ya boca arriba. Si se animara, durante
// medio giro se vería la respuesta de la tarjeta nueva.
export default function TarjetaVolteable({ frente, reverso, volteada, onVoltear, pistaFrente = 'Mostrar respuesta', pistaReverso = 'Volver a la pregunta' }) {
  return (
    <button
      type="button"
      className={`ui-tarjeta-repaso ${volteada ? 'ui-tarjeta-repaso--respuesta' : ''}`}
      aria-pressed={volteada}
      onClick={onVoltear}
    >
      <span className="ui-tarjeta-giro" key={`${frente}\u0000${reverso}`}>
        <span className="ui-tarjeta-cara ui-tarjeta-cara--frente" aria-hidden={volteada}>
          <span className="ui-antetitulo">Pregunta</span>
          <span className="ui-tarjeta-texto">{frente}</span>
          <span className="ui-tarjeta-pista">{pistaFrente} · Enter, espacio o clic</span>
        </span>
        <span className="ui-tarjeta-cara ui-tarjeta-cara--reverso" aria-hidden={!volteada}>
          <span className="ui-antetitulo">Respuesta</span>
          <span className="ui-tarjeta-texto">{reverso}</span>
          <span className="ui-tarjeta-pista">{pistaReverso} · Enter, espacio o clic</span>
        </span>
      </span>
    </button>
  )
}
