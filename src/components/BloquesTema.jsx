import Icon from './Icon.jsx'

// ============================================================
//  Bloques de un tema que se pintan IGUAL en la página y en la previa
// ------------------------------------------------------------
//  La vista previa del editor ya usaba los mismos componentes grandes que
//  `TemaPage` (Contenido, Recursos, Actividades), pero estos tres bloques los
//  tenía reescritos por su cuenta, y habían divergido:
//
//    · el resumen llevaba otra clase, así que se veía con otro estilo;
//    · los objetivos tenían otro encabezado —«Objetivos de aprendizaje» en la
//      previa, «Al terminar este tema podrás» en la página— y otro marcado;
//    · los CONCEPTOS CLAVE no aparecían en la previa. El alumno ve una rejilla
//      de tarjetas; el profesor que los escribía no veía nada.
//
//  Se pide que un tema creado desde la web se vea EXACTAMENTE igual que los
//  demás, y con dos copias del marcado eso no se sostiene: cada arreglo en una
//  se olvida en la otra. Aquí hay una sola.
//
//  Lo que NO está aquí a propósito: la cabecera con duración y contadores, la
//  navegación entre temas, el enlace al quiz y el botón de reportar. Son de la
//  página real y no tienen sentido dentro de un diálogo de previa.
// ============================================================

export function ResumenTema({ resumen }) {
  if (!resumen) return null
  return <p className="tema-resumen">{resumen}</p>
}

export function ObjetivosTema({ objetivos }) {
  if (!(objetivos || []).length) return null
  return (
    <div className="objetivos">
      <h3><Icon name="diana" size={17} /> Al terminar este tema podrás</h3>
      <ul>
        {objetivos.map((o, i) => <li key={i}>{o}</li>)}
      </ul>
    </div>
  )
}

export function ConceptosTema({ conceptos }) {
  if (!(conceptos || []).length) return null
  return (
    <section className="conceptos">
      <h2 className="seccion-titulo">Conceptos clave</h2>
      <div className="conceptos-grid">
        {conceptos.map((c, i) => (
          <div className="concepto-card" key={i}>
            <strong>{c.termino}</strong>
            <p>{c.definicion}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
