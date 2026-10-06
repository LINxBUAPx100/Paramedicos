import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { decidir, resumenRecorrido, signosDelRecorrido } from '../../lib/casosModelo.js'
import {
  accionesDelCaso, explorar, calificarConciencia, glasgowDe, COMPONENTES_GLASGOW, AVDI_EXPLICA,
} from '../../lib/exploracion.js'
import MonitorSignos from './MonitorSignos.jsx'
import { variarCaso, nuevaSemilla } from '../../lib/variacion.js'

// Reproductor de un caso del Modo llamada. Vive aparte de la página para que
// el editor de escenarios pruebe el caso exactamente como lo jugará el alumno.
// `onSalir` es opcional: sin él no se pinta «Otros casos».
//
// EXPLORACIÓN ACTIVA (06-10-2026): el alumno no recibe los signos, los obtiene
// explorando (lib/exploracion.js). Cada medida queda en el monitor con el
// momento en que se tomó; el paciente sigue cambiando y el monitor no avisa.
// AVDI y Glasgow no se muestran nunca: el alumno los clasifica y se le corrige.
//
// CADA PARTIDA ES DISTINTA (lib/variacion.js): al empezar y al repetir se
// elige una versión del caso, se desplazan las cifras y se barajan las
// opciones. El caso que se juega sale de una semilla.
export default function ReproductorCaso({ caso: base, onSalir }) {
  const [semilla, setSemilla] = useState(() => nuevaSemilla())
  const caso = useMemo(() => variarCaso(base, semilla), [base, semilla])
  const [nodoId, setNodoId] = useState(caso.inicio)
  const [registro, setRegistro] = useState([])
  const [retro, setRetro] = useState(null)
  const [segundos, setSegundos] = useState(0)
  const [extra, setExtra] = useState(0) // tiempo que cuesta explorar
  const [medidas, setMedidas] = useState({}) // clave → { valor, paso }
  const [hallazgos, setHallazgos] = useState([]) // { paso, accion, etiqueta, texto }
  const [clasificaciones, setClasificaciones] = useState([]) // { paso, resultado, respuesta }
  const [clasificando, setClasificando] = useState(null) // 'avdi' | 'glasgow' | null
  const desde = useRef(Date.now())
  const nodo = caso.nodos[nodoId]
  const paso = registro.length
  const acciones = useMemo(() => accionesDelCaso(caso), [caso])
  // El estado REAL del paciente. Nunca se pinta tal cual mientras se juega.
  const real = signosDelRecorrido(caso, registro)?.actual || {}

  // El reloj corre mientras hay decisiones pendientes.
  useEffect(() => {
    if (nodo?.fin || retro) return undefined
    const t = setInterval(() => setSegundos((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [nodo, retro])

  const reiniciar = () => {
    setSemilla(nuevaSemilla())
    setNodoId(caso.inicio); setRegistro([]); setRetro(null); setSegundos(0); setExtra(0)
    setMedidas({}); setHallazgos([]); setClasificaciones([]); setClasificando(null)
  }
  const elegir = (i) => {
    const r = decidir(caso, nodoId, i, registro, Date.now() - desde.current)
    setRegistro(r.registro)
    setRetro({ ...r.registro[r.registro.length - 1], va: r.nodoId })
    setClasificando(false)
  }
  const seguir = () => {
    setNodoId(retro.va)
    setRetro(null)
    desde.current = Date.now()
  }
  // `segundos`: cuánto se sostuvo el instrumento (pulso, respiración…), o
  // null. Los instrumentos gastan tiempo REAL —el reloj ya lo cuenta—; las
  // demás acciones suman su tiempo estimado.
  const hacer = (accion, segundos = null) => {
    // Lo que cuentan el paciente y los testigos puede cambiar en cada momento.
    const relato = { historia: nodo.historia ?? caso.historia, testigos: nodo.testigos ?? caso.testigos }
    const { texto, medidos } = explorar(accion.id, real, caso, relato, { segundos })
    if (!accion.instrumento) setExtra((s) => s + accion.segundos)
    setHallazgos((h) => [...h, { paso, accion: accion.id, etiqueta: accion.etiqueta, texto }])
    if (Object.keys(medidos).length) {
      setMedidas((m) => ({ ...m, ...Object.fromEntries(Object.entries(medidos).map(([k, v]) => [k, { valor: v, paso }])) }))
    }
  }
  const exploradoAhora = hallazgos.filter((h) => h.paso === paso).map((h) => h.accion)
  const ultimaClasificacion = clasificaciones[clasificaciones.length - 1] || null
  // Lo último que el alumno dijo de cada escala, para su recuadro del monitor.
  const ultimaDe = (que) => [...clasificaciones].reverse().find((c) => c.resultado.que === que || c.resultado.que === 'ambas') || null
  const ultimaAvdi = ultimaDe('avdi')
  const ultimaGcs = ultimaDe('glasgow')
  const enBarra = acciones.filter((a) => !a.instrumento)
  const reloj = segundos + extra
  const pediatrico = caso.paciente === 'lactante' || caso.paciente === 'nino'

  if (nodo.fin) {
    const res = resumenRecorrido(caso, registro, nodoId)
    const bien = clasificaciones.filter((c) => c.resultado.todoBien).length
    const g = glasgowDe(real)
    return (
      <section className="pl-caso" aria-live="polite">
        <span className={`pl-caso-desenlace pl-caso-desenlace--${res.desenlace}`}>
          {res.desenlace === 'favorable' ? 'Desenlace favorable' : 'Desenlace desfavorable'}
        </span>
        <p className="pl-caso-texto">{nodo.texto}</p>
        {caso.signos && (
          <MonitorSignos
            titulo="Estado real del paciente al terminar"
            acciones={acciones}
            medidas={Object.fromEntries(Object.entries(real).map(([k, v]) => [k, { valor: v, paso }]))}
            paso={paso}
            conciencia={{ avdi: real.avdi, glasgow: pediatrico ? null : g }}
            conGlasgow={!pediatrico}
          />
        )}
        <p className="pl-caso-resumen">
          {res.decisiones} decisiones · {res.correctas} correctas · {res.aceptables} aceptables · {res.riesgos} de riesgo · {reloj} s
        </p>
        <p className="pl-caso-resumen">
          {caso.version ? `${caso.version} · ` : ''}partida n.º {caso.semilla}
        </p>
        <p className="pl-caso-resumen">
          {hallazgos.length} exploraciones ({extra} s) · conciencia valorada {clasificaciones.length} {clasificaciones.length === 1 ? 'vez' : 'veces'}, {bien} sin errores
          {clasificaciones.length === 0 && ' · nunca valoraste el nivel de conciencia'}
        </p>
        {res.repasar.length > 0 && (
          <p>Repasa: {res.repasar.map((t, i) => <span key={t}>{i > 0 && ', '}<Link to={`/tema/${t}`}>{t}</Link></span>)}</p>
        )}
        <div className="pl-acciones">
          <button type="button" className="btn btn--reanudar pl-sin-icono" onClick={reiniciar}>Otra llamada como esta</button>
          {onSalir && <button type="button" className="btn btn--fantasma" onClick={onSalir}>Otros casos</button>}
        </div>
      </section>
    )
  }

  return (
    <section className="pl-caso">
      <div className="pl-caso-cab">
        <b>{caso.titulo}</b>
        <span className="pl-caso-reloj" aria-label={`Tiempo: ${reloj} segundos`}>{String(Math.floor(reloj / 60)).padStart(2, '0')}:{String(reloj % 60).padStart(2, '0')}</span>
      </div>
      {caso.signos && (
        <MonitorSignos
          acciones={acciones}
          medidas={medidas}
          paso={paso}
          conGlasgow={!pediatrico}
          conciencia={{
            avdi: ultimaAvdi?.respuesta.avdi || null,
            paso: ultimaAvdi?.paso,
            glasgow: ultimaGcs?.resultado.conGlasgow ? ultimaGcs.respuesta : null,
          }}
          interactivo
          deshabilitado={Boolean(retro)}
          lego={caso.rol === 'lego'}
          onInstrumento={hacer}
          onConciencia={(que) => setClasificando((v) => (v === que ? null : que))}
        />
      )}
      <p className="pl-caso-texto">{nodo.texto}</p>

      {retro ? (
        <div className={`pl-caso-retro pl-caso-retro--${retro.tipo}`} role="status">
          <b>{retro.tipo === 'correcta' ? 'Buena decisión' : retro.tipo === 'aceptable' ? 'Aceptable' : 'Decisión de riesgo'}</b>
          <p>{retro.retro}</p>
          {retro.tema && <Link to={`/tema/${retro.tema}`}>Ver la lección que lo explica</Link>}
          <p className="pl-caso-nota">El paciente sigue evolucionando: lo que mediste antes puede haber cambiado.</p>
          <button type="button" className="btn btn--reanudar pl-sin-icono" onClick={seguir}>Continuar</button>
        </div>
      ) : (
        <>
          {caso.signos && (
            <section className="pl-explorar" aria-label="Explorar al paciente">
              <h3>Explorar al paciente</h3>
              <div className="pl-explorar-acciones">
                {enBarra.map((a) => (
                  <button type="button" key={a.id} onClick={() => hacer(a)} className={exploradoAhora.includes(a.id) ? 'hecho' : ''}>
                    {a.etiqueta}<small>{a.segundos} s</small>
                  </button>
                ))}
              </div>
              <p className="pl-caso-nota">Los signos se toman en su recuadro del monitor: toca o mantén pulsado. AVDI y Glasgow, tocando el suyo.</p>
              {clasificando && (
                <Clasificar
                  key={clasificando}
                  que={pediatrico ? 'avdi' : clasificando}
                  pediatrico={pediatrico}
                  onCerrar={() => setClasificando(null)}
                  onEnviar={(respuesta) => {
                    const que = pediatrico ? 'avdi' : clasificando
                    const resultado = calificarConciencia(respuesta, real, caso, exploradoAhora, que)
                    setClasificaciones((c) => [...c, { paso, respuesta, resultado }])
                    setClasificando(null)
                  }}
                />
              )}
              {ultimaClasificacion && ultimaClasificacion.paso === paso && !clasificando && (
                <ResultadoConciencia resultado={ultimaClasificacion.resultado} />
              )}
              {hallazgos.length > 0 && (
                <ol className="pl-hallazgos" aria-live="polite">
                  {[...hallazgos].reverse().map((h, i) => (
                    <li key={hallazgos.length - i} className={h.paso === paso ? 'ahora' : 'antes'}>
                      <b>{h.etiqueta}</b>
                      <span>{h.texto}</span>
                      {h.paso !== paso && <small>{paso - h.paso === 1 ? 'hace 1 decisión' : `hace ${paso - h.paso} decisiones`}</small>}
                    </li>
                  ))}
                </ol>
              )}
            </section>
          )}
          <div className="pl-caso-opciones">
            {nodo.opciones.map((o, i) => (
              <button type="button" key={i} onClick={() => elegir(i)}><span>{i + 1}</span>{o.texto}</button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

// Valoración de UNA escala, la del recuadro que se tocó.
function Clasificar({ que, pediatrico, onEnviar, onCerrar }) {
  const [avdi, setAvdi] = useState('')
  const [g, setG] = useState({ o: '', v: '', m: '' })
  const completo = que === 'avdi' ? Boolean(avdi) : Boolean(g.o && g.v && g.m)
  const primero = useRef(null)
  useEffect(() => { primero.current?.focus() }, [])
  return (
    <form className="pl-clasificar" onSubmit={(e) => { e.preventDefault(); if (completo) onEnviar(que === 'avdi' ? { avdi } : { ...g }) }}>
      {que === 'avdi' && <fieldset>
        <legend>¿En qué nivel de AVDI está?</legend>
        <div className="pl-clasificar-avdi">
          {['A', 'V', 'D', 'I'].map((n) => (
            <label key={n} className={avdi === n ? 'elegido' : ''}>
              <input ref={n === 'A' ? primero : undefined} type="radio" name="avdi" value={n} checked={avdi === n} onChange={() => setAvdi(n)} />
              <b>{n}</b><span>{{ A: 'Alerta', V: 'Verbal', D: 'Dolor', I: 'Inconsciente' }[n]}</span>
            </label>
          ))}
        </div>
      </fieldset>}
      {pediatrico && <p className="pl-caso-nota">En el paciente pediátrico se valora AVDI; la adaptación pediátrica de Glasgow es un tema propio del Módulo 6.</p>}
      {que === 'glasgow' && (
        <fieldset>
          <legend>Glasgow: puntúa la MEJOR respuesta de cada componente</legend>
          <div className="pl-clasificar-gcs">
            {Object.entries(COMPONENTES_GLASGOW).map(([k, c]) => (
              <label key={k}>
                <span>{c.nombre}</span>
                <select ref={k === 'o' ? primero : undefined} value={g[k]} onChange={(e) => setG((x) => ({ ...x, [k]: e.target.value }))}>
                  <option value="">—</option>
                  {c.niveles.map((nombre, i) => <option key={i} value={i + 1}>{i + 1} · {nombre}</option>).reverse()}
                </select>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <div className="pl-acciones">
        <button type="submit" className="btn btn--reanudar pl-sin-icono" disabled={!completo}>Registrar valoración</button>
        <button type="button" className="btn btn--fantasma" onClick={onCerrar}>Cancelar</button>
      </div>
    </form>
  )
}

function ResultadoConciencia({ resultado }) {
  const { avdi, componentes, total, conGlasgow, todoBien, avisos, que } = resultado
  return (
    <div className={`pl-conciencia ${todoBien ? 'bien' : 'mal'}`} role="status">
      <b>{todoBien ? 'Valoración correcta' : 'La valoración no coincide con el paciente'}</b>
      <ul>
        {avdi && (
          <li className={avdi.ok ? 'ok' : 'no'}>
            AVDI: marcaste {avdi.dado}.{' '}
            {avdi.ok ? 'Correcto.' : `Era ${avdi.real}.`} {AVDI_EXPLICA[avdi.real]}
          </li>
        )}
        {conGlasgow && Object.entries(componentes).map(([k, c]) => (
          <li key={k} className={c.ok ? 'ok' : 'no'}>
            {c.nombre}: marcaste {c.dado}. {c.ok ? 'Correcto.' : `Era ${c.real}: ${c.descripcion.toLowerCase()}.`}
          </li>
        ))}
        {conGlasgow && <li>Glasgow total real: {total} (se comunica desglosado: O{componentes.o.real} V{componentes.v.real} M{componentes.m.real}).</li>}
      </ul>
      {avisos.length > 0 && <ul className="pl-conciencia-avisos">{avisos.map((a) => <li key={a}>{a}</li>)}</ul>}
      <p className="pl-caso-nota">
        Repasa: {que !== 'glasgow' && <Link to="/tema/m1-pab-avdi">AVDI</Link>}
        {que === 'ambas' && ', '}
        {conGlasgow && <Link to="/tema/m5-tcc-glasgow">escala de Glasgow</Link>}.
      </p>
    </div>
  )
}
