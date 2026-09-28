import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CASOS } from '../data/casos/index.js'
import { casosParaElAlumno, decidir, resumenRecorrido } from '../lib/casosModelo.js'
import { useVisibilidad } from '../lib/useVisibilidad.js'

// Modo llamada (PTEM Pulso, entrega 6): casos que se ramifican. Entra una
// llamada, el alumno decide qué hacer primero y el caso responde a cada
// decisión con su consecuencia. Cada decisión enlaza a la lección que la
// sostiene. Solo se ofrecen casos validados por un docente.
export default function CasosPage() {
  const { temaVisible } = useVisibilidad()
  const casos = casosParaElAlumno(CASOS, { temaVisible })
  const [activo, setActivo] = useState(null)
  const caso = casos.find((c) => c.id === activo) || null

  return (
    <div className="pl-casos">
      <nav className="migas" aria-label="Ubicación"><Link to="/">Inicio</Link><span>/</span>Modo llamada</nav>
      <header className="ui-cabecera">
        <span className="ui-antetitulo">Práctica de decisiones</span>
        <h1>Modo llamada</h1>
        <p>Entra una llamada, eliges qué evaluar y qué hacer, y el caso responde a tus decisiones. Cada decisión te lleva a la lección que la explica.</p>
      </header>
      {caso ? (
        <ReproductorCaso key={caso.id} caso={caso} onSalir={() => setActivo(null)} />
      ) : casos.length ? (
        <ul className="pl-casos-lista">
          {casos.map((c) => (
            <li key={c.id}>
              <button type="button" onClick={() => setActivo(c.id)}>
                <b>{c.titulo}</b>
                {c.resumen && <span>{c.resumen}</span>}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="ui-estado pl-casos-vacio">
          <div className="pl-franja" aria-hidden="true" />
          <h2>Todavía no hay casos validados</h2>
          <p>Los casos son contenido clínico: los escribe y los valida tu academia, con fuentes, igual que las lecciones. En cuanto un docente apruebe el primero, aparecerá aquí.</p>
          <Link to="/" className="btn btn--fantasma">Volver al tablero</Link>
        </div>
      )}
    </div>
  )
}

function ReproductorCaso({ caso, onSalir }) {
  const [nodoId, setNodoId] = useState(caso.inicio)
  const [registro, setRegistro] = useState([])
  const [retro, setRetro] = useState(null)
  const [segundos, setSegundos] = useState(0)
  const desde = useRef(Date.now())
  const nodo = caso.nodos[nodoId]

  // El reloj corre mientras hay decisiones pendientes.
  useEffect(() => {
    if (nodo?.fin || retro) return undefined
    const t = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [nodo, retro])

  const elegir = (i) => {
    const r = decidir(caso, nodoId, i, registro, Date.now() - desde.current)
    setRegistro(r.registro)
    setRetro({ ...r.registro[r.registro.length - 1], va: r.nodoId })
  }
  const seguir = () => {
    setNodoId(retro.va)
    setRetro(null)
    desde.current = Date.now()
  }

  if (nodo.fin) {
    const res = resumenRecorrido(caso, registro, nodoId)
    return (
      <section className="pl-caso" aria-live="polite">
        <span className={`pl-caso-desenlace pl-caso-desenlace--${res.desenlace}`}>
          {res.desenlace === 'favorable' ? 'Desenlace favorable' : 'Desenlace desfavorable'}
        </span>
        <p className="pl-caso-texto">{nodo.texto}</p>
        <p className="pl-caso-resumen">
          {res.decisiones} decisiones · {res.correctas} correctas · {res.aceptables} aceptables · {res.riesgos} de riesgo · {res.segundos} s
        </p>
        {res.repasar.length > 0 && (
          <p>Repasa: {res.repasar.map((t, i) => <span key={t}>{i > 0 && ', '}<Link to={`/tema/${t}`}>{t}</Link></span>)}</p>
        )}
        <div className="pl-acciones">
          <button type="button" className="btn btn--reanudar pl-sin-icono" onClick={() => { setNodoId(caso.inicio); setRegistro([]); setSegundos(0) }}>Repetir la llamada</button>
          <button type="button" className="btn btn--fantasma" onClick={onSalir}>Otros casos</button>
        </div>
      </section>
    )
  }

  return (
    <section className="pl-caso">
      <div className="pl-caso-cab">
        <b>{caso.titulo}</b>
        <span className="pl-caso-reloj" aria-label={`Tiempo: ${segundos} segundos`}>{String(Math.floor(segundos / 60)).padStart(2, '0')}:{String(segundos % 60).padStart(2, '0')}</span>
      </div>
      <p className="pl-caso-texto">{nodo.texto}</p>
      {retro ? (
        <div className={`pl-caso-retro pl-caso-retro--${retro.tipo}`} role="status">
          <b>{retro.tipo === 'correcta' ? 'Buena decisión' : retro.tipo === 'aceptable' ? 'Aceptable' : 'Decisión de riesgo'}</b>
          <p>{retro.retro}</p>
          {retro.tema && <Link to={`/tema/${retro.tema}`}>Ver la lección que lo explica</Link>}
          <button type="button" className="btn btn--reanudar pl-sin-icono" onClick={seguir}>Continuar</button>
        </div>
      ) : (
        <div className="pl-caso-opciones">
          {nodo.opciones.map((o, i) => (
            <button type="button" key={i} onClick={() => elegir(i)}><span>{i + 1}</span>{o.texto}</button>
          ))}
        </div>
      )}
    </section>
  )
}
