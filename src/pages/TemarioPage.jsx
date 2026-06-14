import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { temarioOficial, temarioStats } from '../data/temarioOficial.js'
import { recursosGenerales } from '../data/recursosDescarga.js'
import { getTema } from '../data/index.js'

export default function TemarioPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const pct = Math.round((temarioStats.cubiertos / temarioStats.total) * 100)

  return (
    <div className="temario">
      <header className="temario-hero">
        <span className="temario-badge">Temario oficial · 5 módulos</span>
        <h1>{temarioOficial.titulo}</h1>
        <p className="temario-sub">{temarioOficial.subtitulo}</p>
        <p className="temario-desc">{temarioOficial.descripcion}</p>
        <div className="temario-cobertura">
          <div className="temario-cobertura-barra">
            <div className="temario-cobertura-fill" style={{ width: `${pct}%` }} />
          </div>
          <span>
            {temarioStats.cubiertos} de {temarioStats.total} subtemas con tema de estudio enlazado ({pct}%)
          </span>
        </div>
        <p className="temario-leyenda">
          <span className="sub-tag sub-tag--ok">✓ Con tema</span> abre el estudio a fondo ·{' '}
          <span className="sub-tag sub-tag--pend">En desarrollo</span> contemplado en el temario
        </p>
      </header>

      {recursosGenerales.length > 0 && (
        <div className="descargas descargas--general">
          <h3>🧠 Recursos generales de estudio</h3>
          <div className="descargas-grid">
            {recursosGenerales.map((r, i) => (
              <a key={i} className="descarga-btn" href={r.url} target="_blank" rel="noopener noreferrer">
                <span className="descarga-ico">📥</span>
                <span className="descarga-txt">Descarga: {r.titulo} {r.emoji}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {temarioOficial.modulos.map((modulo) => (
        <section className="temario-modulo" key={modulo.numero}>
          <div className="temario-modulo-cab">
            <span className="temario-modulo-ico">{modulo.icono}</span>
            <div>
              <span className="temario-modulo-num">Módulo {modulo.numero}</span>
              <h2>{modulo.titulo}</h2>
              <p>{modulo.descripcion}</p>
            </div>
          </div>

          {modulo.categorias.map((cat, ci) => (
            <div className="temario-categoria" key={ci}>
              <h3 className="temario-categoria-titulo">{cat.titulo}</h3>
              {cat.recursos && <p className="temario-recursos">📚 {cat.recursos}</p>}
              <ul className="temario-subtemas">
                {cat.subtemas.map((s) => {
                  const tema = s.temaId ? getTema(s.temaId) : null
                  return (
                    <li className="temario-subtema" key={s.n}>
                      <span className="temario-subtema-n">{s.n}</span>
                      {tema ? (
                        <Link to={`/tema/${tema.id}`} className="temario-subtema-link">
                          <span className="temario-subtema-txt">{s.t}</span>
                          <span className="sub-tag sub-tag--ok">✓ Tema {tema.numero}</span>
                        </Link>
                      ) : (
                        <span className="temario-subtema-link temario-subtema-link--plano">
                          <span className="temario-subtema-txt">{s.t}</span>
                          <span className="sub-tag sub-tag--pend">En desarrollo</span>
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
