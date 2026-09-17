export default function Paginacion({ datos, onCambiar, etiqueta = 'Páginas de resultados' }) {
  if (datos.paginas <= 1) return null
  return (
    <nav className="ui-paginacion" aria-label={etiqueta}>
      <button type="button" className="btn btn--suave" disabled={datos.pagina === 1} onClick={() => onCambiar(datos.pagina - 1)}>Anterior</button>
      <span role="status">{datos.desde}–{datos.hasta} de {datos.total} · página {datos.pagina} de {datos.paginas}</span>
      <button type="button" className="btn btn--suave" disabled={datos.pagina === datos.paginas} onClick={() => onCambiar(datos.pagina + 1)}>Siguiente</button>
    </nav>
  )
}
