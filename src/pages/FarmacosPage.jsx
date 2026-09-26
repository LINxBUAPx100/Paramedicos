import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import Quiz from '../components/Quiz.jsx'
import AvisoEditorial from '../components/AvisoEditorial.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useIndiceContenido } from '../context/ContenidoContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import { barajarCon } from '../lib/azar.js'
import {
  FARMACOS, SECCIONES, REFERENCIAS, MARCO, UNIDADES_NOM, FICHA_INSTITUCIONAL,
  RUTA_ESTUDIO, ORIGEN_CATALOGO,
} from '../data/farmacos/catalogo.js'
import {
  APENDICES, AVISO_PROTOCOLO, AVISO_SIN_DOSIS, ETIQUETA_ORIGEN, casillaDe,
  evaluarClasificacion, filtrarFarmacos, preguntasDe, tandaClasificacion, tarjetasDe,
} from '../lib/farmacosModelo.js'
import AprenderCalculo from '../components/farmacos/AprenderCalculo.jsx'
import CasosClinicos from '../components/farmacos/CasosClinicos.jsx'
import Fundamentos from '../components/farmacos/Fundamentos.jsx'
import '../styles/farmacos.css'

// ============================================================
//  Entrenador de farmacología (trabajo D · PLAN-LMS §27)
// ------------------------------------------------------------
//  /farmacos            → catálogo y modos de práctica (?modo=…)
//  /farmacos/:farmacoId → ficha completa
//
//  Puerta de plan: capacidad `entrenadorFarmacologia` (solo Pro). La puerta
//  de acceso (sesión, academia, grupo) ya la pone <RutaProtegida>.
// ============================================================

const MODOS = [
  { id: 'catalogo', label: 'Catálogo', icono: 'libro' },
  { id: 'calcular', label: 'Aprende a calcular', icono: 'matraz' },
  { id: 'casos', label: 'Casos clínicos', icono: 'ambulancia' },
  { id: 'fundamentos', label: 'Fundamentos', icono: 'birrete' },
  { id: 'tarjetas', label: 'Tarjetas', icono: 'flashcards' },
  { id: 'preguntas', label: 'Preguntas', icono: 'pregunta' },
  { id: 'relampago', label: 'Clasificación relámpago', icono: 'reloj' },
  { id: 'marco', label: 'Marco legal', icono: 'verificado' },
]

const SECCION_POR_ID = Object.fromEntries(SECCIONES.map((s) => [s.id, s]))

function Aviso() {
  return (
    <p className="farm-aviso" role="note">
      <Icon name="alerta" size={18} />
      <span>{AVISO_PROTOCOLO}</span>
    </p>
  )
}

function Origen({ f }) {
  const casilla = casillaDe(f)
  return (
    <span className={`farm-origen farm-origen--${casilla === 'ampliado' ? 'ampliado' : 'nom'}`}>
      {ETIQUETA_ORIGEN[casilla]}
    </span>
  )
}

function Referencias({ ids }) {
  return (
    <ol className="farm-refs">
      {ids.map((id) => {
        const r = REFERENCIAS[id]
        return (
          <li key={id} value={id}>
            <a href={r.url} target="_blank" rel="noreferrer noopener">{r.nombre}</a>
            {r.nota && <span className="staff-ayuda"> {r.nota}</span>}
          </li>
        )
      })}
    </ol>
  )
}

// ---------- Ficha ---------------------------------------------------------

function Ficha({ f }) {
  const { modulos = [] } = useIndiceContenido() || {}
  const { temaVisible } = useVisibilidad()
  const titulos = useMemo(() => {
    const m = {}
    for (const mod of modulos) for (const t of mod.temas || []) m[t.id] = t.titulo
    return m
  }, [modulos])
  // Solo lecciones que existen en el curso de esta academia y que su grupo ve.
  const temas = (f.temasRelacionados || [])
    .filter((t) => temaVisible(t) && (!modulos.length || titulos[t]))
  const seccion = SECCION_POR_ID[f.seccion]

  return (
    <article className="farm-ficha">
      <nav className="migas" aria-label="Ubicación">
        <Link to="/">Inicio</Link><span>/</span>
        <Link to="/farmacos">Farmacología</Link><span>/</span>{f.nombre}
      </nav>
      <header className="ui-cabecera">
        <span className="ui-antetitulo">{seccion?.titulo}</span>
        <h1>{f.nombre}</h1>
        <p className="farm-ficha-meta">
          <span className="ui-etiqueta">{f.grupo}</span> <Origen f={f} />
        </p>
      </header>

      <AvisoEditorial estado={f.estadoEditorial} />
      <Aviso />

      <section className="ui-panel">
        <h2>Uso</h2>
        <p>{f.uso}</p>
        <h2>Precaución clave</h2>
        <p className="farm-precaucion">{f.precaucion}</p>
        {f.notas.length > 0 && (
          <>
            <h2>Notas</h2>
            <ul>{f.notas.map((n) => <li key={n}>{n}</li>)}</ul>
          </>
        )}
        <p className="staff-ayuda">
          Las precauciones son selectivas, no una lista completa de contraindicaciones.
        </p>
      </section>

      {f.apendice && (
        <section className="ui-panel">
          <h2>En la NOM-034</h2>
          <dl className="farm-dl">
            <dt>Apéndice</dt><dd>{f.apendice} · numeral {f.numeral}</dd>
            <dt>Presentación</dt><dd>{f.presentacionNom}</dd>
            <dt>Unidades que lo llevan</dt>
            <dd>{UNIDADES_NOM.filter((u) => u.apendices.includes(f.apendice)).map((u) => u.tipo).join(', ')}</dd>
          </dl>
          <p className="staff-ayuda">
            La presentación identifica el producto del inventario; no es una dosis para un paciente.
          </p>
        </section>
      )}
      {!f.apendice && (
        <section className="ui-panel">
          <h2>Formulario ampliado</h2>
          <p>
            No figura por nombre en los apéndices A-D de la NOM-034. Es un ejemplo de formulario
            institucional sujeto a protocolo: no hay obligación universal de llevarlo.
          </p>
        </section>
      )}

      <section className="ui-panel">
        <h2>Presentaciones y dosis</h2>
        {f.presentaciones?.length > 0 && (
          <ul>
            {f.presentaciones.map((p) => <li key={p.id}>{p.texto}{p.fuente && <span className="staff-ayuda"> · {p.fuente.documento}</span>}</li>)}
          </ul>
        )}
        {f.dosis.length === 0 && <p>{f.sinDosis || `Todavía no hay dosis verificadas para esta ficha. ${AVISO_SIN_DOSIS.split('. ').slice(1).join('. ')}`}</p>}
        {f.dosis.some((d) => d.nota) && (
          <ul className="staff-ayuda">{f.dosis.filter((d) => d.nota).map((d) => <li key={d.id}>{d.nota}</li>)}</ul>
        )}
        {f.dosis.length > 0 && (
          <div className="ui-tabla-wrap">
            <table className="ui-tabla">
              <thead><tr><th>Indicación</th><th>Población</th><th>Vía</th><th>Dosis</th><th>Fuente</th></tr></thead>
              <tbody>
                {f.dosis.map((d) => (
                  <tr key={d.id}>
                    <td>{d.indicacion}</td>
                    <td>{d.poblacion === 'pediatrico' ? 'Pediátrico' : d.poblacion === 'embarazo' ? 'Embarazo' : 'Adulto'}</td>
                    <td>{d.via}</td>
                    <td>{d.dosisTexto}{d.repeticion ? <><br /><span className="staff-ayuda">{d.repeticion}</span></> : null}</td>
                    <td>
                      <a href={d.fuente.url} target="_blank" rel="noreferrer noopener">{d.fuente.documento}</a>
                      <span className="staff-ayuda">{`, ${d.fuente.edicion}`}{d.fuente.capitulo ? ` · ${d.fuente.capitulo}` : ''}{d.fuente.pagina ? ` · p. ${d.fuente.pagina}` : ''}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {f.dosis.some((d) => d.calculo) && (
          <p><Link className="btn btn--primario" to={`/farmacos?modo=casos&farmaco=${f.id}`}><Icon name="ambulancia" size={15} /> Practicar casos de {f.nombre}</Link></p>
        )}
        <p className="staff-ayuda">Para estudiarlo, la guía propone dominar: {RUTA_ESTUDIO.join(', ').toLowerCase()}.</p>
      </section>

      <section className="ui-panel">
        <h2>En el temario</h2>
        {temas.length ? (
          <ul className="farm-temas">
            {temas.map((t) => (
              <li key={t}><Link to={`/tema/${t}`}>{titulos[t] || t}</Link></li>
            ))}
          </ul>
        ) : (
          <p>Ninguna lección de tu temario lo nombra todavía.</p>
        )}
      </section>

      <section className="ui-panel">
        <h2>Fuentes</h2>
        <p className="staff-ayuda">
          {f.fuente.pagina
            ? <>{ORIGEN_CATALOGO.titulo}, revisión {ORIGEN_CATALOGO.revision}, p. {f.fuente.pagina}. Esa guía cita:</>
            : 'Fármaco complementario de la guía de estudio; grupo, uso y precaución salen de:'}
        </p>
        <Referencias ids={f.fuente.referencias} />
      </section>

      <p><Link to="/farmacos" className="btn btn--suave"><Icon name="chevronIzq" size={15} /> Volver al catálogo</Link></p>
    </article>
  )
}

// ---------- Catálogo ------------------------------------------------------

function Catalogo() {
  const [consulta, setConsulta] = useState('')
  const [seccion, setSeccion] = useState('todas')
  const [origen, setOrigen] = useState('todos')
  const lista = filtrarFarmacos(FARMACOS, { consulta, seccion, origen })
  const grupos = SECCIONES.map((s) => ({ ...s, items: lista.filter((f) => f.seccion === s.id) }))
    .filter((s) => s.items.length)

  return (
    <>
      <div className="ui-herramientas">
        <label className="ui-campo">Buscar
          <input type="search" value={consulta} onChange={(e) => setConsulta(e.target.value)} placeholder="Nombre, grupo, uso o precaución" />
        </label>
        <label className="ui-campo">Sección
          <select value={seccion} onChange={(e) => setSeccion(e.target.value)}>
            <option value="todas">Todas</option>
            {SECCIONES.map((s) => <option key={s.id} value={s.id}>{s.titulo}</option>)}
          </select>
        </label>
        <label className="ui-campo">Origen
          <select value={origen} onChange={(e) => setOrigen(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="nom">Mínimo NOM-034</option>
            <option value="ampliado">Formulario ampliado</option>
          </select>
        </label>
      </div>
      <p className="staff-ayuda" role="status">{lista.length} de {FARMACOS.length} fichas</p>
      {!grupos.length && (
        <div className="ui-estado"><h2>Sin resultados</h2><p>Prueba con otra palabra o quita los filtros.</p></div>
      )}
      {grupos.map((s) => (
        <section key={s.id} className="farm-seccion">
          <h2>{s.titulo} <small>{s.detalle}</small></h2>
          <ul className="farm-rejilla">
            {s.items.map((f) => (
              <li key={f.id}>
                <Link to={`/farmacos/${f.id}`} className="farm-tarjeta">
                  <strong>{f.nombre}</strong>
                  <span className="farm-tarjeta-grupo">{f.grupo}</span>
                  <span className="farm-tarjeta-uso">{f.uso}</span>
                  <Origen f={f} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  )
}

// ---------- Tarjetas ------------------------------------------------------

function Tarjetas() {
  const [cartas, setCartas] = useState(() => barajarCon(Math.random, tarjetasDe(FARMACOS)))
  const [indice, setIndice] = useState(0)
  const [volteada, setVolteada] = useState(false)
  const carta = cartas[indice]
  const avanzar = (d) => { setIndice((i) => Math.min(Math.max(i + d, 0), cartas.length - 1)); setVolteada(false) }
  const barajar = () => { setCartas(barajarCon(Math.random, tarjetasDe(FARMACOS))); setIndice(0); setVolteada(false) }

  return (
    <div className="ui-repaso">
      <div className="ui-repaso-barra">
        <span>Tarjeta {indice + 1} de {cartas.length}</span>
        <button className="btn btn--suave" onClick={barajar}>Barajar</button>
      </div>
      <button type="button" className={`ui-tarjeta-repaso ${volteada ? 'ui-tarjeta-repaso--respuesta' : ''}`} aria-pressed={volteada} onClick={() => setVolteada((v) => !v)}>
        <span className="ui-antetitulo">{volteada ? 'Respuesta' : 'Pregunta'}</span>
        <span className="ui-tarjeta-texto">{volteada ? carta.reverso : carta.frente}</span>
        <span className="ui-tarjeta-pista">{volteada ? 'Volver a la pregunta' : 'Mostrar respuesta'} · Enter, espacio o clic</span>
      </button>
      <div className="ui-repaso-barra">
        <button className="btn btn--suave" disabled={indice === 0} onClick={() => avanzar(-1)}><Icon name="chevronIzq" size={15} /> Anterior</button>
        <button className="btn btn--primario" disabled={indice === cartas.length - 1} onClick={() => avanzar(1)}>Siguiente <Icon name="chevronDer" size={15} /></button>
      </div>
      <p className="ui-repaso-origen"><Link to={`/farmacos/${carta.farmacoId}`}>Abrir la ficha</Link></p>
    </div>
  )
}

// ---------- Preguntas -----------------------------------------------------

const TAMANO_TANDA = 10

function Preguntas() {
  const [seccion, setSeccion] = useState('todas')
  const [ronda, setRonda] = useState(0)
  const preguntas = useMemo(() => {
    const base = filtrarFarmacos(FARMACOS, { seccion })
    // Los distractores salen del catálogo ENTERO, aunque se filtre la sección.
    return preguntasDe(base, { catalogo: FARMACOS }).slice(0, TAMANO_TANDA)
    // `ronda` fuerza una tanda nueva al reintentar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seccion, ronda])

  return (
    <>
      <div className="ui-herramientas">
        <label className="ui-campo">Sección
          <select value={seccion} onChange={(e) => { setSeccion(e.target.value); setRonda((r) => r + 1) }}>
            <option value="todas">Todo el catálogo</option>
            {SECCIONES.map((s) => <option key={s.id} value={s.id}>{s.titulo}</option>)}
          </select>
        </label>
      </div>
      <Quiz
        key={`${seccion}-${ronda}`}
        titulo="Práctica de farmacología"
        preguntas={preguntas}
        onReintentar={() => setRonda((r) => r + 1)}
      />
    </>
  )
}

// ---------- Clasificación relámpago ---------------------------------------

const SEGUNDOS = 60
const CASILLAS = [...APENDICES, 'ampliado']

function Relampago() {
  const [tanda, setTanda] = useState(null)
  const [indice, setIndice] = useState(0)
  const [restante, setRestante] = useState(SEGUNDOS)
  const [respuestas, setRespuestas] = useState([])
  const [ultima, setUltima] = useState(null)
  const reloj = useRef(null)
  const terminado = tanda && (restante === 0 || indice >= tanda.length)

  useEffect(() => {
    if (!tanda || terminado) return undefined
    reloj.current = setInterval(() => setRestante((s) => Math.max(s - 1, 0)), 1000)
    return () => clearInterval(reloj.current)
  }, [tanda, terminado])

  const empezar = () => {
    setTanda(tandaClasificacion(FARMACOS, 15))
    setIndice(0); setRestante(SEGUNDOS); setRespuestas([]); setUltima(null)
  }

  const responder = (casilla) => {
    const f = tanda[indice]
    const correcto = evaluarClasificacion(f, casilla)
    const r = { f, casilla, correcto }
    setRespuestas((rs) => [...rs, r])
    setUltima(r)
    setIndice((i) => i + 1)
  }

  if (!tanda) {
    return (
      <div className="ui-estado">
        <h2>¿Dónde figura cada fármaco?</h2>
        <p>
          Tienes {SEGUNDOS} segundos para clasificar hasta 15 fármacos: apéndice A, B, C o D de la
          NOM-034, o formulario ampliado. Cada respuesta muestra el numeral que la respalda.
        </p>
        <button className="btn btn--primario" onClick={empezar}>Empezar</button>
      </div>
    )
  }

  const aciertos = respuestas.filter((r) => r.correcto).length

  if (terminado) {
    return (
      <div className="ui-estado" role="status">
        <h2>{aciertos} de {respuestas.length} correctas</h2>
        {respuestas.length < tanda.length && <p>Se acabó el tiempo con {tanda.length - respuestas.length} sin responder.</p>}
        <ul className="farm-resultados">
          {respuestas.map((r) => (
            <li key={r.f.id} className={r.correcto ? 'ok' : 'mal'}>
              <Link to={`/farmacos/${r.f.id}`}>{r.f.nombre}</Link>: {ETIQUETA_ORIGEN[casillaDe(r.f)]}
              {r.f.numeral ? ` (${r.f.numeral})` : ''}
              {!r.correcto && <> · respondiste {ETIQUETA_ORIGEN[r.casilla]}</>}
            </li>
          ))}
        </ul>
        <button className="btn btn--primario" onClick={empezar}>Otra tanda</button>
      </div>
    )
  }

  const f = tanda[indice]
  return (
    <div className="farm-relampago">
      <div className="ui-repaso-barra">
        <span>{indice + 1} de {tanda.length}</span>
        <span className={`farm-reloj ${restante <= 10 ? 'farm-reloj--final' : ''}`} aria-live="off">
          <Icon name="reloj" size={16} /> {restante} s
        </span>
      </div>
      <p className="farm-relampago-nombre">{f.nombre}</p>
      <div className="farm-casillas" role="group" aria-label="¿Dónde figura?">
        {CASILLAS.map((c) => (
          <button key={c} className="btn btn--suave" onClick={() => responder(c)}>{ETIQUETA_ORIGEN[c]}</button>
        ))}
      </div>
      {ultima && (
        <p className={`farm-veredicto ${ultima.correcto ? 'ok' : 'mal'}`} role="status">
          {ultima.correcto ? 'Correcto' : 'Incorrecto'}: {ultima.f.nombre} → {ETIQUETA_ORIGEN[casillaDe(ultima.f)]}
          {ultima.f.numeral ? ` (${ultima.f.numeral})` : ''}.
        </p>
      )}
    </div>
  )
}

// ---------- Marco legal ---------------------------------------------------

function Marco() {
  return (
    <>
      <section className="ui-panel">
        <h2>Dotación acumulativa por tipo de unidad</h2>
        <div className="ui-tabla-wrap">
          <table className="ui-tabla">
            <thead><tr><th>Unidad</th><th>Apéndices</th><th>Alcance</th></tr></thead>
            <tbody>
              {UNIDADES_NOM.map((u) => (
                <tr key={u.tipo}><td>{u.tipo}</td><td>{u.apendices.join(' + ')}</td><td>{u.alcance}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {MARCO.map((m) => (
        <section key={m.titulo} className="ui-panel">
          <h2>{m.titulo}</h2>
          <p>{m.texto}</p>
          <p className="staff-ayuda">Fuente: {m.fuentes.map((id) => `[${id}]`).join(' ')}</p>
        </section>
      ))}
      <section className="ui-panel">
        <h2>La ficha que completa cada servicio</h2>
        <p className="staff-ayuda">Estructura de trabajo que propone la guía; no es una obligación textual de la NOM-034.</p>
        <dl className="farm-dl">
          {FICHA_INSTITUCIONAL.map((c) => (
            <div key={c.campo}><dt>{c.campo}</dt><dd>{c.define}</dd></div>
          ))}
        </dl>
      </section>
      <section className="ui-panel">
        <h2>Referencias</h2>
        <Referencias ids={Object.keys(REFERENCIAS).map(Number)} />
      </section>
    </>
  )
}

// ---------- Página --------------------------------------------------------

export default function FarmacosPage() {
  const { farmacoId } = useParams()
  const [params, setParams] = useSearchParams()
  const { capacidades, esSuperadmin } = useAuth()
  const modo = MODOS.some((m) => m.id === params.get('modo')) ? params.get('modo') : 'catalogo'

  if (!esSuperadmin && !capacidades?.entrenadorFarmacologia) {
    return (
      <div className="ui-estado" role="status">
        <h2>El entrenador de farmacología no está en tu plan</h2>
        <p>Tu academia no tiene activado este apartado. Si crees que es un error, consulta a tu academia.</p>
        <Link to="/" className="btn btn--suave">Volver al inicio</Link>
      </div>
    )
  }

  if (farmacoId) {
    const f = FARMACOS.find((x) => x.id === farmacoId)
    if (!f) {
      return (
        <div className="ui-estado" role="status">
          <h2>No encontramos esa ficha</h2>
          <p>Puede que el enlace sea antiguo o que el fármaco ya no esté en el catálogo.</p>
          <Link to="/farmacos" className="btn btn--suave">Ir al catálogo</Link>
        </div>
      )
    }
    return <Ficha f={f} />
  }

  return (
    <div className="farm-page">
      <nav className="migas" aria-label="Ubicación"><Link to="/">Inicio</Link><span>/</span>Farmacología</nav>
      <header className="ui-cabecera">
        <span className="ui-antetitulo">Entrenador</span>
        <h1>Farmacología prehospitalaria</h1>
        <p>
          {FARMACOS.length} fichas del catálogo de la academia. Aprende a calcular paso a paso, resuelve casos
          con pacientes que cambian en cada intento y repasa grupo, uso, precaución y norma de cada fármaco.
        </p>
      </header>
      <Aviso />
      <div className="farm-modos" role="tablist" aria-label="Modo de estudio">
        {MODOS.map((m) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={modo === m.id}
            className={`farm-modo ${modo === m.id ? 'is-active' : ''}`}
            onClick={() => setParams(m.id === 'catalogo' ? {} : { modo: m.id })}
          >
            <Icon name={m.icono} size={16} /> {m.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        {modo === 'catalogo' && <Catalogo />}
        {modo === 'calcular' && <AprenderCalculo />}
        {modo === 'casos' && <CasosClinicos key={params.get('farmaco') || 'todos'} farmacoId={params.get('farmaco')} />}
        {modo === 'fundamentos' && <Fundamentos />}
        {modo === 'tarjetas' && <Tarjetas />}
        {modo === 'preguntas' && <Preguntas />}
        {modo === 'relampago' && <Relampago />}
        {modo === 'marco' && <Marco />}
      </div>
    </div>
  )
}
