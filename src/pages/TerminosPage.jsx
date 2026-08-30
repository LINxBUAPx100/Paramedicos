import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { TERMINOS, TITULO_TERMINOS, VERSION_TERMINOS, JURISDICCION } from '../data/terminos.js'

// ============================================================
//  Términos y condiciones — página pública
// ------------------------------------------------------------
//  PÚBLICA a propósito, sin `RutaProtegida`. Hay que poder leer lo que se te
//  pide aceptar ANTES de aceptarlo, y quien todavía no ha aceptado no puede
//  entrar al contenido: si esta página estuviera detrás del muro, el único
//  camino sería aceptar a ciegas.
//
//  El texto vive en `src/data/terminos.js` y se pinta desde ahí, también en la
//  pantalla de aceptación. Dos copias del mismo texto legal acaban divergiendo,
//  y entonces nadie sabe cuál es el que obliga.
// ============================================================
export default function TerminosPage() {
  return (
    <article className="legal">
      <header className="legal-cab">
        <span className="legal-eyebrow">PTEM / T-Tem · Academia RESCATE</span>
        <h1>{TITULO_TERMINOS}</h1>
        <dl className="legal-meta">
          <div><dt>Versión</dt><dd>{VERSION_TERMINOS}</dd></div>
          <div><dt>Jurisdicción</dt><dd>{JURISDICCION}</dd></div>
        </dl>
      </header>

      <TextoTerminos />

      <footer className="legal-pie">
        <Link to="/" className="link-discreto">
          <Icon name="chevronIzq" size={15} /> Volver al inicio
        </Link>
      </footer>
    </article>
  )
}

/**
 * El cuerpo del documento, sin encabezado ni navegación.
 *
 * Se exporta porque la pantalla de aceptación lo incrusta tal cual: quien
 * acepta lee EXACTAMENTE lo mismo que quien entra a la página pública.
 */
export function TextoTerminos() {
  return (
    <div className="legal-cuerpo">
      {TERMINOS.map((s) => (
        <section key={s.n} className="legal-seccion" aria-labelledby={`t-${s.n}`}>
          <h2 id={`t-${s.n}`}>
            <span className="legal-num">{s.n}</span>
            {s.titulo}
          </h2>
          {(s.parrafos || []).map((p, i) => <p key={i}>{p}</p>)}
          {s.puntos && (
            <ul className="legal-puntos">
              {s.puntos.map((p) => (
                <li key={p.titulo}>
                  <strong>{p.titulo}.</strong> {p.texto}
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  )
}
