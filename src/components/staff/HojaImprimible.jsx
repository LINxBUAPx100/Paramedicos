// ============================================================
//  La hoja que se imprime (o se guarda como PDF)
// ------------------------------------------------------------
//  ESTE COMPONENTE NO DECIDE NADA. Recibe el documento ya construido por
//  `lib/staff/reporteModelo.js` y lo pinta. Esa separación es lo que permite
//  probar con `npm test` que un reporte sin la casilla de pagos no lleva
//  importes, sin montar React ni abrir un visor de PDF.
//
//  EL LOGO VA DOS VECES A PROPÓSITO: arriba como encabezado y detrás como marca
//  de agua. Se pidieron las dos cosas; la de atrás lleva opacidad baja y
//  `aria-hidden`, porque es decoración y un lector de pantalla no tiene por qué
//  anunciarla dos veces.
//
//  `print-color-adjust: exact` (en `staff.css`) es lo que impide que el
//  navegador se «ahorre» la marca de agua al imprimir en ahorro de tinta.
// ============================================================
export default function HojaImprimible({ documento }) {
  if (!documento) return null
  // `titulo`/`subtitulo` los pone cada constructor: el mismo componente imprime
  // el estado de cuenta de una persona, el padrón entero y el corte de caja.
  const { academia, titulo, subtitulo, generado, bloques } = documento

  return (
    <article className="staff-hoja" id="staff-hoja">
      {academia.logo && (
        <img className="staff-hoja-marca" src={academia.logo} alt="" aria-hidden="true" />
      )}

      <header className="staff-hoja-cabecera">
        {academia.logo
          ? <img className="staff-hoja-logo" src={academia.logo} alt={academia.nombre} />
          : <p className="staff-hoja-nombre">{academia.nombre}</p>}
        <div>
          <h1>{titulo || 'Documento'}</h1>
          {subtitulo && <p><b>{subtitulo}</b></p>}
          <p className="staff-hoja-fecha">Generado el {generado}</p>
        </div>
      </header>

      {bloques.map((b) => (
        <section key={b.id} className="staff-hoja-bloque">
          <h2>{b.titulo}</h2>

          {b.tipo === 'pares' && (
            <dl className="staff-hoja-pares">
              {b.pares.map(([etiqueta, valor]) => (
                <div key={etiqueta}><dt>{etiqueta}</dt><dd>{valor}</dd></div>
              ))}
            </dl>
          )}

          {b.tipo === 'tabla' && (
            b.filas.length === 0
              ? <p className="staff-hoja-vacio">{b.vacio}</p>
              : (
                <table className="staff-hoja-tabla">
                  <thead>
                    <tr>{b.columnas.map((c) => <th key={c}>{c}</th>)}</tr>
                  </thead>
                  <tbody>
                    {b.filas.map((fila, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <tr key={`${b.id}-${i}`}>
                        {fila.map((celda, j) => <td key={`${b.id}-${i}-${j}`}>{celda}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
          )}

          {b.nota && <p className="staff-hoja-nota">{b.nota}</p>}
        </section>
      ))}

      <footer className="staff-hoja-pie">
        <p>
          {academia.nombre} · Documento informativo generado por el sistema. No sustituye a un
          recibo fiscal.
        </p>
      </footer>
    </article>
  )
}
