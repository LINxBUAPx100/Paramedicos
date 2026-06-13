// Renderiza los bloques de contenido de un tema según su tipo.
import Diagrama from './Diagramas.jsx'

function Bloque({ bloque }) {
  switch (bloque.tipo) {
    case 'p':
      return <p className="c-parrafo">{bloque.texto}</p>

    case 'diagrama':
      return <Diagrama clave={bloque.clave} titulo={bloque.titulo} descripcion={bloque.descripcion} />

    case 'h3':
      return <h3 className="c-subtitulo">{bloque.texto}</h3>

    case 'lista':
      return (
        <div className="c-lista-wrap">
          {bloque.titulo && <h4 className="c-lista-titulo">{bloque.titulo}</h4>}
          <ul className="c-lista">
            {bloque.items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        </div>
      )

    case 'pasos':
      return (
        <div className="c-lista-wrap">
          {bloque.titulo && <h4 className="c-lista-titulo">{bloque.titulo}</h4>}
          <ol className="c-pasos">
            {bloque.items.map((it, i) => (
              <li key={i}>
                <span className="c-paso-num">{i + 1}</span>
                <span>{it}</span>
              </li>
            ))}
          </ol>
        </div>
      )

    case 'tabla':
      return (
        <div className="c-tabla-wrap">
          {bloque.titulo && <h4 className="c-lista-titulo">{bloque.titulo}</h4>}
          <table className="c-tabla">
            <thead>
              <tr>
                {bloque.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bloque.filas.map((fila, i) => (
                <tr key={i}>
                  {fila.map((celda, j) => (
                    <td key={j}>{celda}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case 'callout': {
      const iconos = { clave: '💡', clinico: '🩺', alerta: '⚠️' }
      return (
        <div className={`c-callout c-callout--${bloque.variante}`}>
          <div className="c-callout-ico">{iconos[bloque.variante] || '📌'}</div>
          <div>
            {bloque.titulo && <strong className="c-callout-titulo">{bloque.titulo}</strong>}
            <p>{bloque.texto}</p>
          </div>
        </div>
      )
    }

    case 'formula':
      return (
        <div className="c-formula">
          <code>{bloque.texto}</code>
          {bloque.nota && <span className="c-formula-nota">{bloque.nota}</span>}
        </div>
      )

    default:
      return null
  }
}

export default function Contenido({ secciones }) {
  return (
    <div className="contenido-tema">
      {secciones.map((sec, i) => (
        <section className="seccion" key={i}>
          <h2 className="seccion-titulo">{sec.titulo}</h2>
          {sec.bloques.map((b, j) => (
            <Bloque bloque={b} key={j} />
          ))}
        </section>
      ))}
    </div>
  )
}
