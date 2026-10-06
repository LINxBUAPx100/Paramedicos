import { useEffect, useRef, useState } from 'react'
import { SIGNOS } from '../../lib/casosModelo.js'

// El monitor del Modo llamada. NO muestra el estado real del paciente mientras
// se juega: muestra lo que el alumno MIDIÓ y cuánto hace que lo midió. Lo que
// no ha medido sale con «?». El paciente sigue cambiando y el monitor no avisa.
//
// DESDE EL 07-10-2026 CADA RECUADRO ES EL INSTRUMENTO. Se mide imitando el
// gesto real (los modos y tiempos están en lib/exploracion.js, ACCIONES):
//   · AVDI y Glasgow: un toque abre su valoración.
//   · Pulso: mantener pulsado; ~10 s dice si hay pulso, 1 minuto lo cuenta.
//   · Respiración: mantener pulsado; unos segundos dicen si respira, 30 s la cuenta.
//   · Oxímetro, glucómetro, termómetro, monitor: un toque y el equipo tarda.
//   · Tensión: mantener pulsado para inflar y soltar para desinflar.
//   · Piel: un toque. Pupilas: mantener 3 a 5 s.
// Mientras se sostiene o el equipo trabaja, el recuadro emite ondas.
//
// Al terminar el caso se le pasa el estado real (`titulo` lo dice) y no es
// interactivo.

const texto = (v) => (v === null || v === undefined || v === '' ? '—' : String(v))
const reducirMovimiento = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

export default function MonitorSignos({
  acciones = [], medidas = {}, paso = 0, conciencia = null, conGlasgow = true, titulo = 'Lo que has medido',
  interactivo = false, deshabilitado = false, lego = false, onInstrumento, onConciencia,
}) {
  // Los recuadros: lo que alguna acción de este caso puede medir.
  const medibles = new Set(acciones.flatMap((a) => a.revela))
  // AVDI y Glasgow se clasifican, no se miden; los movimientos son narración.
  const visibles = SIGNOS.filter((s) => medibles.has(s.clave) && !['avdi', 'glasgow', 'movimientos'].includes(s.clave))
  const instrumentoDe = (clave) => acciones.find((a) => a.instrumento?.clave === clave) || null
  const fc = medidas.fc && typeof medidas.fc.valor === 'number' && medidas.fc.valor > 0 ? medidas.fc.valor : null
  const sinPulso = medidas.fc && (medidas.fc.valor === 0 || /sin pulso/i.test(String(medidas.fc.valor)))
  const edad = (m) => (paso - m.paso === 0 ? 'ahora' : paso - m.paso === 1 ? 'hace 1 decisión' : `hace ${paso - m.paso} decisiones`)
  const gcs = conciencia?.glasgow
  const totalGcs = gcs ? Number(gcs.o) + Number(gcs.v) + Number(gcs.m) : null
  const activo = interactivo && !deshabilitado

  return (
    <section className="pl-monitor-signos" aria-label={titulo}>
      <div className="pl-ms-cab">
        <span
          className={`pl-ms-corazon ${fc ? 'late' : ''} ${sinPulso ? 'parado' : ''}`}
          style={fc ? { '--pl-latido': `${(60 / fc).toFixed(2)}s` } : undefined}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" focusable="false">
            <path d="M12 21s-7.5-4.6-9.5-9.3C1.1 8.3 3.2 4.5 6.9 4.5c2.1 0 3.6 1.1 5.1 3 1.5-1.9 3-3 5.1-3 3.7 0 5.8 3.8 4.4 7.2C19.5 16.4 12 21 12 21z" />
          </svg>
        </span>
        <span className="pl-ms-titulo">{titulo}</span>
        {activo && <span className="pl-ms-nota">toca o mantén pulsado cada recuadro</span>}
      </div>
      <dl className="pl-ms-rejilla">
        <Conciencia
          activo={activo} onConciencia={onConciencia}
          clave="avdi" etiqueta="AVDI" valor={conciencia?.avdi || '?'}
          pie={conciencia?.avdi ? (conciencia.paso === undefined ? 'real' : edad({ paso: conciencia.paso })) : 'sin valorar'}
        />
        {conGlasgow && (
          <Conciencia
            activo={activo} onConciencia={onConciencia}
            clave="glasgow" etiqueta="Glasgow" valor={gcs ? totalGcs : '?'}
            pie={gcs ? `O${gcs.o} V${gcs.v} M${gcs.m}` : 'sin valorar'}
          />
        )}
        {visibles.map((s) => {
          const m = medidas[s.clave]
          const accion = instrumentoDe(s.clave)
          const props = { s, m, edad, paso }
          return activo && accion
            ? <Instrumento key={s.clave} {...props} accion={accion} lego={lego} onMedir={onInstrumento} />
            : <Recuadro key={`${s.clave}-${texto(m?.valor)}-${m?.paso ?? 'x'}`} {...props} />
        })}
      </dl>
    </section>
  )
}

// Fuera del monitor a propósito: el reloj del caso lo vuelve a pintar cada
// segundo, y un componente definido dentro se montaría de nuevo (y perdería
// el foco) en cada tic.
function Conciencia({ activo, onConciencia, clave, etiqueta, valor, pie }) {
  const contenido = (
    <>
      <dt>{etiqueta}</dt>
      <dd><span className="pl-ms-valor">{valor}</span></dd>
      <small className="pl-ms-edad">{pie}</small>
    </>
  )
  return activo ? (
    <button type="button" className="pl-ms-signo pl-ms-signo--avdi pl-ms-boton" onClick={() => onConciencia?.(clave)}
      aria-label={`Valorar ${etiqueta}. Última valoración: ${valor === '?' ? 'ninguna' : valor}.`}>
      {contenido}
      <span className="pl-ms-gesto">toca para valorar</span>
    </button>
  ) : <div className="pl-ms-signo pl-ms-signo--avdi">{contenido}</div>
}

function Valor({ s, m, edad, paso }) {
  const v = m?.valor
  return (
    <>
      <dt>{s.etiqueta}</dt>
      <dd>
        <span className="pl-ms-valor">{m ? texto(v) : '?'}</span>
        {m && typeof v === 'number' && s.unidad && <span className="pl-ms-unidad">{s.unidad}</span>}
      </dd>
      <small className="pl-ms-edad">{m ? edad(m) : 'sin medir'}</small>
      {m && paso - m.paso > 0 && <span className="pl-solo-lector">(medida antigua)</span>}
    </>
  )
}

function clases(s, m, paso, extra = '') {
  const largo = typeof m?.valor === 'string' && m.valor.length > 9
  return `pl-ms-signo pl-ms-signo--${s.clave} ${m ? '' : 'sin-medir'} ${largo ? 'largo' : ''} ${m && paso - m.paso > 0 ? 'vieja' : ''} ${extra}`
}

function Recuadro({ s, m, edad, paso }) {
  return <div className={clases(s, m, paso, m ? 'cambia' : '')}><Valor s={s} m={m} edad={edad} paso={paso} /></div>
}

// ---------- Un recuadro que es un instrumento ------------------------------

function Instrumento({ s, m, edad, paso, accion, lego, onMedir }) {
  const ins = accion.instrumento
  const completo = lego && ins.completoLego ? ins.completoLego : ins.completo
  const ayuda = lego && ins.ayudaLego ? ins.ayudaLego : ins.ayuda
  const [fase, setFase] = useState('libre') // libre | sosteniendo | esperando | aviso
  const [t, setT] = useState(0) // segundos transcurridos en la fase
  const [aviso, setAviso] = useState('')
  const [recien, setRecien] = useState(false) // destello tras medir
  const inicio = useRef(0)
  const cuadro = useRef(0)
  const temporizador = useRef(0)
  const faseRef = useRef('libre')
  const cambiarFase = (f) => { faseRef.current = f; setFase(f) }

  const temporizadorDestello = useRef(0)
  useEffect(() => () => {
    clearInterval(cuadro.current); clearTimeout(temporizador.current); clearTimeout(temporizadorDestello.current)
  }, [])

  const medir = (segundos) => {
    cambiarFase('libre'); setT(0)
    onMedir?.(accion, segundos)
    setRecien(true)
    clearTimeout(temporizadorDestello.current)
    temporizadorDestello.current = setTimeout(() => setRecien(false), 1400)
  }
  const avisar = (txt) => {
    cambiarFase('aviso'); setAviso(txt); setT(0)
    clearTimeout(temporizador.current)
    temporizador.current = setTimeout(() => { if (faseRef.current === 'aviso') cambiarFase('libre') }, 2600)
  }
  // Cuenta el tiempo de la fase actual y, si llega al tope, termina sola.
  // Con un intervalo y no con requestAnimationFrame: rAF se detiene cuando la
  // pestaña no se dibuja, y el oxímetro se quedaba «leyendo» para siempre. El
  // tiempo se mide con el reloj, así que un intervalo frenado no lo falsea.
  const correr = (tope, alLlegar) => {
    inicio.current = performance.now()
    clearInterval(cuadro.current)
    cuadro.current = setInterval(() => {
      const seg = (performance.now() - inicio.current) / 1000
      setT(seg)
      if (tope && seg >= tope) { clearInterval(cuadro.current); alLlegar(tope) }
    }, 100)
  }
  const esperar = () => {
    cambiarFase('esperando')
    correr(ins.espera, () => medir(null))
  }

  // --- Gestos -------------------------------------------------------------
  const empezar = () => {
    if (faseRef.current === 'sosteniendo' || faseRef.current === 'esperando') return
    if (ins.modo === 'clic') { medir(null); return }
    if (ins.modo === 'espera') { esperar(); return }
    cambiarFase('sosteniendo')
    correr(ins.modo === 'sostener' ? completo : null, (seg) => { clearInterval(cuadro.current); medir(seg) })
  }
  const soltar = () => {
    if (faseRef.current !== 'sosteniendo') return
    clearInterval(cuadro.current)
    const seg = (performance.now() - inicio.current) / 1000
    if (seg < ins.minimo) {
      avisar(ins.modo === 'inflar'
        ? 'Inflaste poco: el manguito no ocluye y no hay lectura.'
        : 'Soltaste demasiado pronto: no alcanzas a obtener nada.')
      return
    }
    if (ins.modo === 'inflar') { esperar(); return }
    medir(seg)
  }

  const sostiene = ins.modo === 'sostener' || ins.modo === 'inflar'
  const manejadores = sostiene
    ? {
        onPointerDown: (e) => { e.preventDefault(); e.currentTarget.setPointerCapture?.(e.pointerId); empezar() },
        onPointerUp: soltar,
        onPointerCancel: soltar,
        onKeyDown: (e) => { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); empezar() } },
        onKeyUp: (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); soltar() } },
        onContextMenu: (e) => e.preventDefault(),
      }
    : { onClick: empezar }

  // Progreso de la barra: hacia el tope del gesto o de la espera.
  const tope = fase === 'esperando' ? ins.espera : fase === 'sosteniendo' ? (completo || ins.minimo) : 1
  const progreso = fase === 'sosteniendo' || fase === 'esperando' ? Math.min(1, t / tope) : 0
  const ocupado = fase === 'sosteniendo' || fase === 'esperando'
  const gesto = ins.modo === 'clic' || ins.modo === 'espera' ? 'toca' : ins.modo === 'inflar' ? 'mantén para inflar' : 'mantén pulsado'

  let estado = null
  if (fase === 'sosteniendo') {
    estado = ins.modo === 'inflar'
      ? (t < ins.minimo ? `inflando… ${Math.floor(t)} s` : 'suelta para desinflar')
      : `${Math.floor(t)} s${completo ? ` / ${completo} s` : ''}`
  } else if (fase === 'esperando') {
    estado = ins.modo === 'inflar' ? 'desinflando y escuchando…' : 'leyendo…'
  } else if (fase === 'aviso') {
    estado = aviso
  }

  return (
    <button
      type="button"
      className={clases(s, m, paso, `pl-ms-boton ${ocupado ? 'activo' : ''} ${fase === 'aviso' ? 'con-aviso' : ''} ${recien && fase === 'libre' ? 'cambia' : ''}`)}
      style={{ '--p': progreso }}
      title={ayuda}
      aria-label={`${accion.etiqueta}. ${ayuda}${m ? ` Última medida: ${texto(m.valor)}, ${edad(m)}.` : ' Sin medir.'}`}
      aria-busy={ocupado}
      {...manejadores}
    >
      <Valor s={s} m={m} edad={edad} paso={paso} />
      {ocupado && !reducirMovimiento() && <span className="pl-ms-ondas" aria-hidden="true"><i /><i /><i /></span>}
      {ocupado && <span className="pl-ms-barra" aria-hidden="true" />}
      <span className={`pl-ms-gesto ${estado ? 'en-curso' : ''}`} role={fase === 'aviso' ? 'status' : undefined}>
        {estado || gesto}
      </span>
    </button>
  )
}
