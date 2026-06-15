import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { buscar } from '../data/index.js'

export default function BuscarPage() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') || '')
  const resultados = buscar(query)

  // Sincroniza con el buscador del header (?q=…) sin remontar la página.
  useEffect(() => {
    const q = params.get('q')
    if (q != null) setQuery(q)
  }, [params])

  return (
    <div className="buscar-page">
      <header className="buscar-header">
        <h1>🔍 Buscar en la guía</h1>
        <p>Encuentra temas y conceptos clave por palabra.</p>
      </header>

      <input
        type="search"
        className="buscar-input"
        placeholder="Ej. shock, capnografía, lactato, sepsis…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />

      {query.trim() && (
        <p className="buscar-conteo">
          {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'} para «{query}»
        </p>
      )}

      <div className="buscar-resultados">
        {resultados.map(({ tema, conceptos }) => (
          <div className="buscar-card" key={tema.id} style={{ '--fase-color': tema.faseColor }}>
            <Link to={`/tema/${tema.id}`} className="buscar-card-titulo">
              <span className="tema-fila-num">{tema.numero}</span>
              {tema.icono} {tema.titulo}
            </Link>
            <p className="buscar-card-resumen">{tema.resumen}</p>
            {conceptos.length > 0 && (
              <div className="buscar-conceptos">
                {conceptos.map((c, i) => (
                  <div key={i} className="buscar-concepto">
                    <strong>{c.termino}:</strong> {c.definicion}
                  </div>
                ))}
              </div>
            )}
            <span className="buscar-card-fase">Fase {tema.faseNumero} · {tema.faseTitulo}</span>
          </div>
        ))}
      </div>

      {query.trim() && resultados.length === 0 && (
        <div className="buscar-vacio">
          <span>🤔</span>
          <p>No se encontraron resultados. Prueba con otra palabra.</p>
        </div>
      )}
    </div>
  )
}
