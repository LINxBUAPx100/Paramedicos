import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext.jsx'
import { esEvaluacionPorId, nivelDeTema, NIVELES_DOMINIO, aReanudar } from '../../lib/pulsoModelo.js'
import { tituloVisibleDe } from '../../data/contenido/titulosVisibles.js'

// La ruta de traslado del módulo (PTEM Pulso): una parada por tema, en el
// orden del plan. Cada parada se rellena según el dominio de ESTUDIO del tema;
// los exámenes y prácticas son el hospital de destino. La parada donde vas
// late. Sustituye a la vista de lista como primera lectura del módulo; la
// lista con buscador sigue debajo.
const PASO = 88
const ALTO = 200
const ARRIBA = 70
const ABAJO = 138

const COLOR_NIVEL = [
  'var(--borde-fuerte)',
  'color-mix(in srgb, var(--primario) 40%, var(--bg-2))',
  'color-mix(in srgb, var(--primario) 65%, var(--bg-2))',
  'color-mix(in srgb, var(--primario) 85%, var(--bg-2))',
  'var(--exito-solido)',
]

const corto = (t, n = 24) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t)

export default function RutaModulo({ modulo, temas = [] }) {
  const { estado } = useProgress()
  const navigate = useNavigate()
  const cont = useRef(null)
  const actualId = aReanudar({
    modulos: [{ ...modulo, temas }],
    leidos: estado.leidos, lecturas: estado.lecturas || {},
  }).tema?.id || null

  // Lleva la parada actual a la vista al abrir el módulo.
  useEffect(() => {
    const i = temas.findIndex((t) => t.id === actualId)
    if (cont.current && i > 3) cont.current.scrollLeft = Math.max(0, i * PASO - cont.current.clientWidth / 2)
  }, [actualId, temas])

  if (!temas.length) return null
  const pts = temas.map((_, i) => [PASO / 2 + i * PASO, i % 2 ? ARRIBA : ABAJO])
  const curva = (a, b) => { const mx = (a[0] + b[0]) / 2; return `C${mx} ${a[1]} ${mx} ${b[1]} ${b[0]} ${b[1]}` }
  let d = `M${pts[0][0]} ${pts[0][1]}`
  let hecho = d
  const iActual = temas.findIndex((t) => t.id === actualId)
  for (let i = 1; i < pts.length; i++) {
    d += ` ${curva(pts[i - 1], pts[i])}`
    if (iActual < 0 || i <= iActual) hecho += ` ${curva(pts[i - 1], pts[i])}`
  }
  const ancho = temas.length * PASO
  const hechos = temas.filter((t) => estado.leidos[t.id]).length

  return (
    <section className="pl-ruta" aria-label={`Ruta del Módulo ${modulo.numero}`}>
      <div className="pl-ruta-cab">
        <h2>Tu ruta en el Módulo {modulo.numero}</h2>
        <span className="pl-rotulo">{hechos} de {temas.filter((t) => !esEvaluacionPorId(t.id)).length} temas leídos</span>
      </div>
      <div className="pl-ruta-cont" ref={cont}>
        <svg width={ancho} height={ALTO} viewBox={`0 0 ${ancho} ${ALTO}`} role="list">
          <path d={d} className="pl-ruta-camino" />
          {iActual !== 0 && <path d={hecho} className="pl-ruta-hecho" />}
          <path d={d} className="pl-ruta-centro" />
          {temas.map((t, i) => {
            const [x, y] = pts[i]
            const evaluacion = esEvaluacionPorId(t.id)
            const nivel = evaluacion ? 0 : nivelDeTema(t.id, estado, t.nFlashcards || 0)
            const esActual = t.id === actualId
            const titulo = tituloVisibleDe(t)
            const etiqueta = evaluacion ? titulo : `${t.numero} ${titulo}`
            const ir = () => navigate(`/tema/${t.id}`)
            return (
              <g
                key={t.id}
                className="pl-parada-ruta"
                role="listitem"
                tabIndex={0}
                aria-label={`${etiqueta}. ${evaluacion ? 'Evaluación' : NIVELES_DOMINIO[nivel]}${esActual ? '. Estás aquí' : ''}`}
                onClick={ir}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ir() } }}
              >
                <title>{etiqueta}</title>
                {evaluacion ? (
                  <>
                    <rect x={x - 17} y={y - 17} width="34" height="34" rx="8" className="pl-ruta-hospital" />
                    <path d={`M${x} ${y - 9}v18M${x - 9} ${y}h18`} stroke="#fff" strokeWidth="4" />
                  </>
                ) : (
                  <>
                    {esActual && <circle cx={x} cy={y} r="22" className="pl-ruta-halo" />}
                    <circle cx={x} cy={y} r={esActual ? 17 : 14} className="pl-ruta-anillo" style={{ stroke: esActual ? 'var(--urgencia)' : COLOR_NIVEL[nivel] }} />
                    {nivel > 0 && <circle cx={x} cy={y} r={3 + nivel * 2.4} style={{ fill: COLOR_NIVEL[nivel] }} />}
                  </>
                )}
                <text x={x} y={i % 2 ? y - 28 : y + 36} textAnchor="middle" className={esActual ? 'pl-ruta-texto es-actual' : 'pl-ruta-texto'}>
                  {corto(etiqueta)}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
      <p className="pl-ruta-leyenda">
        <span><i style={{ background: COLOR_NIVEL[1] }} />Expuesto</span>
        <span><i style={{ background: COLOR_NIVEL[2] }} />Reconoce</span>
        <span><i style={{ background: COLOR_NIVEL[3] }} />Aplica</span>
        <span><i style={{ background: COLOR_NIVEL[4] }} />Domina</span>
        <span><i className="pl-ruta-leyenda-hosp" />Examen o práctica</span>
      </p>
    </section>
  )
}
