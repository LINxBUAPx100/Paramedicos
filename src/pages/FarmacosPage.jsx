import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
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
  VARIANTES_RELAMPAGO, preguntaRelampago, filasComparador,
} from '../lib/farmacosModelo.js'
import AprenderCalculo from '../components/farmacos/AprenderCalculo.jsx'
import CasosClinicos from '../components/farmacos/CasosClinicos.jsx'
import RutaFarmacologia from '../components/farmacos/RutaFarmacologia.jsx'
import SesionEspaciada from '../components/pulso/SesionEspaciada.jsx'
import { registrarIntento } from '../lib/dominioFarmacos.js'
import { tarjetasParaRepaso } from '../lib/rutaFarmacos.js'
import Fundamentos from '../components/farmacos/Fundamentos.jsx'
import '../styles/farmacos.css'
import TarjetaVolteable from '../components/ui/TarjetaVolteable.jsx'

// ============================================================
//  Entrenador de farmacología (trabajo D · PLAN-LMS §27)
// ------------------------------------------------------------
//  /farmacos            → catálogo y modos de práctica (?modo=…)
//  /farmacos/:farmacoId → ficha completa
//
//  Puerta de plan: capacidad `entrenadorFarmacologia` (solo Pro). La puerta
//  de acceso (sesión, academia, grupo) ya la pone <RutaProtegida>.
// ============================================================

// La ruta (PTEM Pulso) es la entrada; los ocho modos de siempre se agrupan en
// sus cuatro etapas. Fundamentos y marco legal quedan como consulta dentro de
// la etapa a la que sirven.
const MODOS = [
  { id: 'ruta', label: 'Tu ruta', icono: 'progreso' },
  { id: 'catalogo', label: 'Catálogo', icono: 'libro' },
  { id: 'calcular', label: 'Aprende a calcular', icono: 'matraz' },
  { id: 'casos', label: 'Casos clínicos', icono: 'ambulancia' },
  { id: 'fundamentos', label: 'Fundamentos', icono: 'birrete' },
  { id: 'tarjetas', label: 'Tarjetas', icono: 'flashcards' },
  { id: 'preguntas', label: 'Preguntas', icono: 'pregunta' },
  { id: 'relampago', label: 'Clasificación relámpago', icono: 'reloj' },
  { id: 'marco', label: 'Marco legal', icono: 'verificado' },
  { id: 'comparar', label: 'Comparar', icono: 'capas' },
]
const ETAPAS_MODOS = [
  { titulo: null, modos: ['ruta'] },
  { titulo: 'Conocer', modos: ['catalogo', 'tarjetas', 'comparar', 'fundamentos'] },
  { titulo: 'Clasificar', modos: ['relampago', 'preguntas', 'marco'] },
  { titulo: 'Calcular', modos: ['calcular'] },
  { titulo: 'Aplicar', modos: ['casos'] },
]
const MODO_POR_ID = Object.fromEntries(MODOS.map((m) => [m.id, m]))

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

// PTEM Pulso: la ficha se lee como una página de producto. Arriba, lo que
// identifica al fármaco y un recuadro de acciones; debajo, anclas con el MISMO
// contenido de siempre (uso, NOM-034, presentaciones y dosis verificadas,
// temario y fuentes) y, al final, los del mismo grupo. No se añade ni se
// quita ningún dato clínico: solo cambia cómo se encuentra.
const ANCLAS_FICHA = [
  ['farm-uso', 'Uso'],
  ['farm-nom', 'NOM-034'],
  ['farm-dosis', 'Presentaciones y dosis'],
  ['farm-temario', 'En el temario'],
  ['farm-fuentes', 'Fuentes'],
]

function Ficha({ f }) {
  const navigate = useNavigate()
  // 'default' es la primera entrada de la sesión: no hay pantalla previa de la app.
  const vieneDeLaApp = useLocation().key !== 'default'
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
  const unidades = f.apendice ? UNIDADES_NOM.filter((u) => u.apendices.includes(f.apendice)).map((u) => u.tipo) : []
  const conCalculo = f.dosis.some((d) => d.calculo)
  // «Del mismo grupo»: primero los que comparten grupo farmacológico, luego
  // los de su sección del catálogo. Como los productos relacionados de una
  // tienda, pero con un criterio que se puede explicar.
  const mismoGrupo = FARMACOS.filter((x) => x.id !== f.id && x.grupo === f.grupo)
  const tituloRelacionados = mismoGrupo.length
    ? 'Del mismo grupo'
    : `También en «${seccion?.titulo || 'esta sección'}»`
  const relacionados = [
    ...mismoGrupo,
    ...FARMACOS.filter((x) => x.id !== f.id && x.grupo !== f.grupo && x.seccion === f.seccion),
  ].slice(0, 6)
  const irA = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  return (
    <article className="farm-ficha pl-farm">
      <nav className="migas" aria-label="Ubicación">
        <Link to="/">Inicio</Link><span>/</span>
        <Link to="/farmacos">Farmacología</Link><span>/</span>{f.nombre}
      </nav>

      <div className="pl-farm-cabeza">
        <header className="pl-farm-producto">
          <div className="pl-franja" aria-hidden="true" />
          <div className="pl-farm-producto-cuerpo">
            <span className="pl-rotulo">{seccion?.titulo}</span>
            <h1>{f.nombre}</h1>
            <p className="farm-ficha-meta">
              <span className="ui-etiqueta">{f.grupo}</span> <Origen f={f} />
            </p>
            <p className="pl-farm-uso">{f.uso}</p>
            <dl className="pl-farm-datos">
              <div><dt>Presentación en la NOM</dt><dd>{f.presentacionNom || 'No figura en los apéndices'}</dd></div>
              <div><dt>Unidades que lo llevan</dt><dd>{unidades.length ? unidades.join(', ') : 'Según formulario del servicio'}</dd></div>
              <div><dt>Lecciones donde aparece</dt><dd>{temas.length}</dd></div>
              <div><dt>Dosis verificadas</dt><dd>{f.dosis.length || 'Ninguna'}</dd></div>
            </dl>
          </div>
        </header>

        <aside className="pl-farm-acciones" aria-label="Qué hacer con esta ficha">
          <span className="pl-rotulo">Estudiarlo</span>
          {temas[0] && (
            <Link to={`/tema/${temas[0]}`} className="btn btn--reanudar pl-sin-icono">Ir a la lección</Link>
          )}
          {conCalculo && (
            <Link className="btn btn--turno" to={`/farmacos?modo=casos&farmaco=${f.id}`}>Practicar casos</Link>
          )}
          <Link className="btn btn--fantasma" to={`/farmacos?modo=tarjetas&farmaco=${f.id}`}>Repasar sus tarjetas</Link>
          <Link className="btn btn--fantasma" to={`/farmacos?modo=comparar&a=${f.id}`}>Comparar con otro</Link>
          <p className="pl-farm-precaucion"><b>Precaución clave</b>{f.precaucion}</p>
        </aside>
      </div>

      <AvisoEditorial estado={f.estadoEditorial} />
      <Aviso />

      <nav className="pl-farm-anclas" aria-label="Secciones de la ficha">
        {ANCLAS_FICHA.map(([id, texto]) => <a key={id} href={`#${id}`} onClick={irA(id)}>{texto}</a>)}
      </nav>

      <section className="ui-panel" id="farm-uso">
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

      <section className="ui-panel" id="farm-nom">
        {f.apendice ? (
          <>
            <h2>En la NOM-034</h2>
            <dl className="farm-dl">
              <dt>Apéndice</dt><dd>{f.apendice} · numeral {f.numeral}</dd>
              <dt>Presentación</dt><dd>{f.presentacionNom}</dd>
              <dt>Unidades que lo llevan</dt>
              <dd>{unidades.join(', ')}</dd>
            </dl>
            <p className="staff-ayuda">
              La presentación identifica el producto del inventario; no es una dosis para un paciente.
            </p>
          </>
        ) : (
          <>
            <h2>Formulario ampliado</h2>
            <p>
              No figura por nombre en los apéndices A-D de la NOM-034. Es un ejemplo de formulario
              institucional sujeto a protocolo: no hay obligación universal de llevarlo.
            </p>
          </>
        )}
      </section>

      <section className="ui-panel" id="farm-dosis">
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
        {conCalculo && (
          <p><Link className="btn btn--primario" to={`/farmacos?modo=casos&farmaco=${f.id}`}><Icon name="ambulancia" size={15} /> Practicar casos de {f.nombre}</Link></p>
        )}
        <p className="staff-ayuda">Para estudiarlo, la guía propone dominar: {RUTA_ESTUDIO.join(', ').toLowerCase()}.</p>
      </section>

      <section className="ui-panel" id="farm-temario">
        <h2>En el temario</h2>
        {temas.length ? (
          <ul className="pl-farm-lecciones">
            {temas.map((t) => (
              <li key={t}><Link to={`/tema/${t}`}>{titulos[t] || t}</Link></li>
            ))}
          </ul>
        ) : (
          <p>Ninguna lección de tu temario lo nombra todavía.</p>
        )}
      </section>

      <section className="ui-panel" id="farm-fuentes">
        <h2>Fuentes</h2>
        <p className="staff-ayuda">
          {f.fuente.pagina
            ? <>{ORIGEN_CATALOGO.titulo}, revisión {ORIGEN_CATALOGO.revision}, p. {f.fuente.pagina}. Esa guía cita:</>
            : 'Fármaco complementario de la guía de estudio; grupo, uso y precaución salen de:'}
        </p>
        <Referencias ids={f.fuente.referencias} />
      </section>

      {relacionados.length > 0 && (
        <section className="pl-farm-relacionados" aria-labelledby="farm-relacionados">
          <h2 id="farm-relacionados">{tituloRelacionados}</h2>
          <ul>
            {relacionados.map((x) => (
              <li key={x.id}>
                <Link to={`/farmacos/${x.id}`}>
                  <b>{x.nombre}</b>
                  <span>{x.grupo}</span>
                  <span className="pl-farm-rel-origen">{ETIQUETA_ORIGEN[casillaDe(x)]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Se vuelve a donde se abrió la ficha (Ruta, Casos, Comparar…). Solo si
          se llegó de fuera —enlace directo, marcador— se ofrece el catálogo. */}
      <p>{vieneDeLaApp
        ? <button type="button" className="btn btn--suave" onClick={() => navigate(-1)}><Icon name="chevronIzq" size={15} /> Volver</button>
        : <Link to="/farmacos?modo=catalogo" className="btn btn--suave"><Icon name="chevronIzq" size={15} /> Volver al catálogo</Link>}</p>
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

// Tarjetas del entrenador (PTEM Pulso): por omisión, el repaso espaciado —las
// mismas tarjetas que entran al «Repaso de hoy»—; el recorrido libre de antes
// sigue a un clic. ?farmaco=<id> repasa solo las de ese fármaco.
function Tarjetas() {
  const [params, setParams] = useSearchParams()
  const libre = params.get('libre') === '1'
  const soloDe = params.get('farmaco')
  const cartas = useMemo(() => {
    const todas = tarjetasParaRepaso(tarjetasDe(FARMACOS), FARMACOS)
    return soloDe ? todas.filter((c) => c.farmacoId === soloDe) : todas
  }, [soloDe])
  const cambiar = (clave, valor) => {
    const n = new URLSearchParams(params)
    if (valor) n.set(clave, valor); else n.delete(clave)
    setParams(n, { replace: true })
  }
  return (
    <>
      <div className="pl-modo" role="tablist" aria-label="Tipo de repaso">
        <button type="button" role="tab" aria-selected={!libre} className={!libre ? 'es-activo' : ''} onClick={() => cambiar('libre', '')}>Repaso de hoy</button>
        <button type="button" role="tab" aria-selected={libre} className={libre ? 'es-activo' : ''} onClick={() => cambiar('libre', '1')}>Repaso libre</button>
      </div>
      {soloDe && <p className="staff-ayuda">Solo las de {FARMACOS.find((f) => f.id === soloDe)?.nombre || soloDe}. <button type="button" className="ui-enlace" onClick={() => cambiar('farmaco', '')}>Ver todas</button></p>}
      {libre ? <TarjetasLibres /> : <SesionEspaciada key={soloDe || 'todas'} cartas={cartas} />}
    </>
  )
}

function TarjetasLibres() {
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
      <TarjetaVolteable frente={carta.frente} reverso={carta.reverso} volteada={volteada} onVoltear={() => setVolteada((v) => !v)} />
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

// Mejor marca por variante, en este navegador (como el resto del dominio).
const CLAVE_MARCAS = 'ptem.farmacos.relampago.v1'
function leerMarcas() {
  try { return JSON.parse(localStorage.getItem(CLAVE_MARCAS) || '{}') || {} } catch { return {} }
}
function guardarMarca(variante, aciertos) {
  const m = leerMarcas()
  if ((m[variante] || 0) >= aciertos) return m
  const n = { ...m, [variante]: aciertos }
  try { localStorage.setItem(CLAVE_MARCAS, JSON.stringify(n)) } catch { /* sin almacenamiento */ }
  return n
}

// Clasificación relámpago con tres variantes (PTEM Pulso). Apéndice y unidad
// son clasificación NOM-034: su acierto es la evidencia del nivel «Clasifica».
function Relampago() {
  const [variante, setVariante] = useState('apendice')
  const [tanda, setTanda] = useState(null)
  const [indice, setIndice] = useState(0)
  const [restante, setRestante] = useState(SEGUNDOS)
  const [respuestas, setRespuestas] = useState([])
  const [ultima, setUltima] = useState(null)
  const [marcas, setMarcas] = useState(leerMarcas)
  const reloj = useRef(null)
  const terminado = tanda && (restante === 0 || indice >= tanda.length)
  const preguntas = useMemo(
    () => (tanda || []).map((f, k) => preguntaRelampago(f, variante, { unidades: UNIDADES_NOM, catalogo: FARMACOS, semilla: `${f.id}-${k}` })),
    [tanda, variante],
  )

  useEffect(() => {
    if (!tanda || terminado) return undefined
    reloj.current = setInterval(() => setRestante((s) => Math.max(s - 1, 0)), 1000)
    return () => clearInterval(reloj.current)
  }, [tanda, terminado])

  useEffect(() => {
    if (terminado) setMarcas(guardarMarca(variante, respuestas.filter((r) => r.correcto).length))
  }, [terminado]) // eslint-disable-line react-hooks/exhaustive-deps

  const empezar = (v = variante) => {
    setVariante(v)
    setTanda(tandaClasificacion(FARMACOS, 15))
    setIndice(0); setRestante(SEGUNDOS); setRespuestas([]); setUltima(null)
  }

  const responder = (opcion) => {
    const f = tanda[indice]
    const { correcta } = preguntas[indice]
    const correcto = opcion === correcta
    // Deja rastro por fármaco: es la evidencia del nivel «Clasifica».
    if (variante !== 'grupo') registrarIntento(`clas:${f.id}`, correcto)
    const r = { f, opcion, correcta, correcto }
    setRespuestas((rs) => [...rs, r])
    setUltima(r)
    setIndice((i) => i + 1)
  }

  const selector = (
    <div className="pl-modo" role="tablist" aria-label="Variante del relámpago">
      {Object.entries(VARIANTES_RELAMPAGO).map(([id, texto]) => (
        <button key={id} type="button" role="tab" aria-selected={variante === id} className={variante === id ? 'es-activo' : ''} onClick={() => (tanda ? empezar(id) : setVariante(id))}>
          {texto}{marcas[id] ? ` · mejor ${marcas[id]}` : ''}
        </button>
      ))}
    </div>
  )

  const PREGUNTA = {
    apendice: '¿Dónde figura?',
    unidad: '¿Desde qué unidad lo lleva la NOM-034?',
    grupo: '¿A qué grupo pertenece?',
  }

  if (!tanda) {
    return (
      <div className="ui-estado">
        {selector}
        <h2>{PREGUNTA[variante]}</h2>
        <p>
          Tienes {SEGUNDOS} segundos para responder hasta 15 fármacos.{' '}
          {variante === 'apendice' && 'Apéndice A, B, C o D de la NOM-034, o formulario ampliado.'}
          {variante === 'unidad' && 'La dotación es acumulativa: elige la unidad más básica que ya lo lleva.'}
          {variante === 'grupo' && 'Las opciones falsas son de su misma sección del catálogo: hay que distinguir.'}
        </p>
        <button className="btn btn--primario" onClick={() => empezar()}>Empezar</button>
      </div>
    )
  }

  const aciertos = respuestas.filter((r) => r.correcto).length

  if (terminado) {
    return (
      <div className="ui-estado" role="status">
        {selector}
        <h2>{aciertos} de {respuestas.length} correctas</h2>
        <p>Tu mejor marca en «{VARIANTES_RELAMPAGO[variante]}»: {marcas[variante] || aciertos}.</p>
        {respuestas.length < tanda.length && <p>Se acabó el tiempo con {tanda.length - respuestas.length} sin responder.</p>}
        <ul className="farm-resultados">
          {respuestas.map((r) => (
            <li key={r.f.id} className={r.correcto ? 'ok' : 'mal'}>
              <Link to={`/farmacos/${r.f.id}`}>{r.f.nombre}</Link>: {r.correcta}
              {variante === 'apendice' && r.f.numeral ? ` (${r.f.numeral})` : ''}
              {!r.correcto && <> · respondiste {r.opcion}</>}
            </li>
          ))}
        </ul>
        <button className="btn btn--primario" onClick={() => empezar()}>Otra tanda</button>
      </div>
    )
  }

  const f = tanda[indice]
  return (
    <div className="farm-relampago">
      {selector}
      <div className="ui-repaso-barra">
        <span>{indice + 1} de {tanda.length}</span>
        <span className={`farm-reloj ${restante <= 10 ? 'farm-reloj--final' : ''}`} aria-live="off">
          <Icon name="reloj" size={16} /> {restante} s
        </span>
      </div>
      <p className="farm-relampago-nombre">{f.nombre}</p>
      <div className="farm-casillas" role="group" aria-label={PREGUNTA[variante]}>
        {preguntas[indice].opciones.map((c) => (
          <button key={c} className="btn btn--suave" onClick={() => responder(c)}>{c}</button>
        ))}
      </div>
      {ultima && (
        <p className={`farm-veredicto ${ultima.correcto ? 'ok' : 'mal'}`} role="status">
          {ultima.correcto ? 'Correcto' : 'Incorrecto'}: {ultima.f.nombre} → {ultima.correcta}
          {variante === 'apendice' && ultima.f.numeral ? ` (${ultima.f.numeral})` : ''}.
        </p>
      )}
    </div>
  )
}

// ---------- Comparador (PTEM Pulso) ----------------------------------------
//
// Dos fichas lado a lado con los campos que ya existen; se resaltan los que
// difieren. ?a=<id>&b=<id> en la URL, para enlazarlo desde una ficha.
function Comparador() {
  const [params, setParams] = useSearchParams()
  const porId = (id) => FARMACOS.find((f) => f.id === id)
  const a = porId(params.get('a')) || porId('adrenalina') || FARMACOS[0]
  const b = porId(params.get('b')) || FARMACOS.find((f) => f.id !== a.id && f.seccion === a.seccion) || FARMACOS[1]
  const elegir = (clave, id) => {
    const n = new URLSearchParams(params)
    n.set('modo', 'comparar'); n.set(clave, id)
    setParams(n, { replace: true })
  }
  const filas = filasComparador(a, b, UNIDADES_NOM)
  const opciones = SECCIONES.map((s) => (
    <optgroup key={s.id} label={s.titulo}>
      {FARMACOS.filter((f) => f.seccion === s.id).map((f) => <option key={f.id} value={f.id}>{f.nombre}</option>)}
    </optgroup>
  ))
  return (
    <section className="ui-panel fr-comparador">
      <div className="ui-herramientas">
        <label className="ui-campo">Primer fármaco<select value={a.id} onChange={(e) => elegir('a', e.target.value)}>{opciones}</select></label>
        <label className="ui-campo">Segundo fármaco<select value={b.id} onChange={(e) => elegir('b', e.target.value)}>{opciones}</select></label>
      </div>
      <p className="staff-ayuda">Se resaltan los datos que difieren. Solo se comparan campos del catálogo: dosis y vía dependen del protocolo del servicio.</p>
      <div className="ui-tabla-wrap">
        <table className="ui-tabla fr-tabla-comp">
          <thead><tr><th scope="col"><span className="pl-solo-lector">Campo</span></th><th scope="col"><Link to={`/farmacos/${a.id}`}>{a.nombre}</Link></th><th scope="col"><Link to={`/farmacos/${b.id}`}>{b.nombre}</Link></th></tr></thead>
          <tbody>
            {filas.map((fila) => (
              <tr key={fila.campo} className={fila.difiere ? 'fr-difiere' : ''}>
                <th scope="row">{fila.campo}</th><td>{fila.a}</td><td>{fila.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
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
  const modo = MODOS.some((m) => m.id === params.get('modo')) ? params.get('modo') : 'ruta'

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
          <Link to="/farmacos?modo=catalogo" className="btn btn--suave">Ir al catálogo</Link>
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
      <div className="farm-modos fr-modos" role="tablist" aria-label="Modo de estudio">
        {ETAPAS_MODOS.map((g) => (
          <div className="fr-grupo-modos" key={g.titulo || 'ruta'}>
            {g.titulo && <span className="fr-grupo-titulo">{g.titulo}</span>}
            {g.modos.map((id) => {
              const m = MODO_POR_ID[id]
              return (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={modo === m.id}
                  className={`farm-modo ${modo === m.id ? 'is-active' : ''}`}
                  onClick={() => setParams(m.id === 'ruta' ? {} : { modo: m.id })}
                >
                  <Icon name={m.icono} size={16} /> {m.label}
                </button>
              )
            })}
          </div>
        ))}
      </div>
      <div role="tabpanel">
        {modo === 'ruta' && <RutaFarmacologia onModo={(m) => setParams({ modo: m })} />}
        {modo === 'catalogo' && <Catalogo />}
        {modo === 'calcular' && <AprenderCalculo key={params.get('habilidad') || 'todas'} habilidadInicial={params.get('habilidad')} />}
        {modo === 'casos' && <CasosClinicos key={params.get('farmaco') || 'todos'} farmacoId={params.get('farmaco')} />}
        {modo === 'fundamentos' && <Fundamentos />}
        {modo === 'tarjetas' && <Tarjetas />}
        {modo === 'preguntas' && <Preguntas />}
        {modo === 'relampago' && <Relampago />}
        {modo === 'marco' && <Marco />}
        {modo === 'comparar' && <Comparador />}
      </div>
    </div>
  )
}
