import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { FARMACOS, SECCIONES, UNIDADES_NOM } from '../../data/farmacos/catalogo.js'
import { ETIQUETA_ORIGEN, casillaDe } from '../../lib/farmacosModelo.js'
import { casosDisponibles } from '../../lib/casosFarmacologia.js'
import { HABILIDADES } from '../../lib/ejerciciosCalculo.js'
import { leerDominio, leerErrores } from '../../lib/dominioFarmacos.js'
import { etapasDeRuta, nivelDeFarmaco, NIVELES_FARMACO, erroresOrdenados, esClaveDeFarmaco } from '../../lib/rutaFarmacos.js'
import { tarjetasVencidas } from '../../lib/pulsoModelo.js'
import { useProgress } from '../../context/ProgressContext.jsx'

// Entrada del entrenador de farmacología (PTEM Pulso, entrega 1): una ruta de
// cuatro etapas en lugar de ocho pestañas del mismo peso, el dominio de cada
// fármaco en un mapa y lo que conviene hacer hoy. Los modos de siempre siguen
// ahí; la ruta solo dice por dónde ir.
const COLOR = [
  'var(--bg-3)',
  'color-mix(in srgb, var(--primario) 38%, var(--bg-2))',
  'color-mix(in srgb, var(--primario) 75%, var(--bg-2))',
  'var(--exito-solido)',
]

export default function RutaFarmacologia({ onModo }) {
  const { estado } = useProgress()
  const srs = estado.srs || {}
  const dominio = useMemo(() => leerDominio(), [])
  const errores = useMemo(() => erroresOrdenados(leerErrores()), [])
  const casos = useMemo(() => casosDisponibles(FARMACOS), [])
  const conCasos = useMemo(() => new Set(casos.map(({ f }) => f.id)), [casos])
  const niveles = useMemo(
    () => new Map(FARMACOS.map((f) => [f.id, nivelDeFarmaco(f, { srs, dominio, conCasos: conCasos.has(f.id) })])),
    [srs, dominio, conCasos],
  )
  const { etapas, actual } = etapasDeRuta({ farmacos: FARMACOS, niveles, dominio, habilidades: HABILIDADES, casos })
  const [elegido, setElegido] = useState(() => FARMACOS.find((f) => (niveles.get(f.id)?.nivel || 0) === 0) || FARMACOS[0])
  const vencidas = tarjetasVencidas(srs).filter(esClaveDeFarmaco).length
  const listos = FARMACOS.filter((f) => conCasos.has(f.id) && niveles.get(f.id)?.nivel === 2)
  const cuenta = [0, 1, 2, 3].map((n) => FARMACOS.filter((f) => niveles.get(f.id)?.nivel === n).length)
  const etapaActual = etapas[actual]
  const pendientes = etapaActual.total - etapaActual.hechos

  return (
    <div className="fr-ruta">
      <ol className="fr-etapas" aria-label="Ruta del entrenador">
        {etapas.map((e, i) => {
          const clase = e.hechos >= e.total && e.total ? 'es-hecha' : i === actual ? 'es-actual' : ''
          return (
            <li key={e.id}>
              <button type="button" className={`fr-etapa ${clase}`} onClick={() => onModo(e.modo)} aria-current={i === actual ? 'step' : undefined}>
                <span className="fr-etapa-num">0{i + 1}</span>
                <b>{e.titulo}</b>
                <span className="fr-etapa-sub">{e.sub}</span>
                <span className="fr-barra" aria-hidden="true"><i style={{ width: `${e.pct}%` }} /></span>
                <span className="fr-etapa-sub">{e.hechos} de {e.total}</span>
              </button>
            </li>
          )
        })}
      </ol>
      <div className="fr-continuar">
        <button type="button" className="btn btn--reanudar pl-sin-icono" onClick={() => onModo(etapaActual.modo)}>
          Continuar: {etapaActual.titulo}{pendientes > 0 ? ` · ${pendientes} por practicar` : ''}
        </button>
        <span className="pl-nota-pie">El botón siempre lleva al siguiente paso de la ruta.</span>
      </div>

      <div className="fr-tablero">
        <section className="fr-caja" aria-labelledby="fr-mapa-titulo">
          <div className="fr-caja-cab">
            <h2 id="fr-mapa-titulo">Mapa de dominio</h2>
            <span className="pl-rotulo">{cuenta[3]} aplican · {cuenta[1] + cuenta[2]} en camino · {cuenta[0]} sin empezar</span>
          </div>
          {SECCIONES.map((s) => {
            const suyos = FARMACOS.filter((f) => f.seccion === s.id)
            if (!suyos.length) return null
            return (
              <div className="fr-mapa-sec" key={s.id}>
                <span className="fr-mapa-nombre">{s.titulo}</span>
                <div className="fr-cuadros">
                  {suyos.map((f) => {
                    const n = niveles.get(f.id)?.nivel || 0
                    return (
                      <button
                        type="button"
                        key={f.id}
                        style={{ background: COLOR[n] }}
                        aria-pressed={elegido?.id === f.id}
                        aria-label={`${f.nombre}: ${NIVELES_FARMACO[n]}`}
                        title={f.nombre}
                        onClick={() => setElegido(f)}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
          <p className="pl-ruta-leyenda">
            {NIVELES_FARMACO.map((nombre, n) => <span key={nombre}><i style={{ background: COLOR[n], borderRadius: 3 }} />{nombre}</span>)}
          </p>
        </section>

        <div className="fr-lateral">
          <section className="fr-caja fr-triage" aria-label="Qué hacer hoy">
            <h2>Tu triage de farmacología</h2>
            <button type="button" className={`pl-etiqueta pl-etiqueta--rojo ${vencidas ? '' : 'pl-etiqueta--vacia'}`} onClick={() => onModo('tarjetas')}>
              <span className="pl-etiqueta-ojal" aria-hidden="true" />
              <span><b>Repasar hoy</b><span className="pl-etiqueta-sub">{vencidas ? 'Tarjetas de fármacos vencidas' : 'Nada vencido; puedes adelantar'}</span></span>
              <span className="pl-etiqueta-n">{vencidas}</span>
            </button>
            {errores[0] ? (
              <Link className="pl-etiqueta pl-etiqueta--amarillo" to={`/farmacos?modo=calcular${errores[0].habilidad ? `&habilidad=${errores[0].habilidad}` : ''}`}>
                <span className="pl-etiqueta-ojal" aria-hidden="true" />
                <span><b>Tu error más frecuente</b><span className="pl-etiqueta-sub">{errores[0].nombre}</span></span>
                <span className="pl-etiqueta-n">{errores[0].n}×</span>
              </Link>
            ) : (
              <div className="pl-etiqueta pl-etiqueta--amarillo pl-etiqueta--vacia">
                <span className="pl-etiqueta-ojal" aria-hidden="true" />
                <span><b>Tu error más frecuente</b><span className="pl-etiqueta-sub">Aparece al resolver cálculos y casos</span></span>
                <span className="pl-etiqueta-n">—</span>
              </div>
            )}
            <button type="button" className={`pl-etiqueta pl-etiqueta--verde ${listos.length ? '' : 'pl-etiqueta--vacia'}`} onClick={() => onModo('casos')}>
              <span className="pl-etiqueta-ojal" aria-hidden="true" />
              <span><b>Listos para casos</b><span className="pl-etiqueta-sub">Ya los conoces y clasificas</span></span>
              <span className="pl-etiqueta-n">{listos.length}</span>
            </button>
          </section>

          {elegido && <FichaRapida f={elegido} nivel={niveles.get(elegido.id)} tieneCasos={conCasos.has(elegido.id)} />}
        </div>
      </div>

      {errores.length > 0 && (
        <section className="fr-caja" aria-labelledby="fr-errores-titulo">
          <h2 id="fr-errores-titulo">Tus errores en cálculo</h2>
          <ul className="fr-errores">
            {errores.map((e) => (
              <li key={e.tipo}>
                <span>{e.nombre}</span>
                <span className="fr-barra" aria-hidden="true"><i style={{ width: `${(e.n / errores[0].n) * 100}%`, background: 'var(--urgencia)' }} /></span>
                <span className="fr-cifra">{e.n}</span>
                {e.habilidad && <Link to={`/farmacos?modo=calcular&habilidad=${e.habilidad}`}>Practicar</Link>}
              </li>
            ))}
          </ul>
          <p className="pl-nota-pie">Se guardan en este navegador, igual que tu dominio del entrenador.</p>
        </section>
      )}
    </div>
  )
}

function FichaRapida({ f, nivel, tieneCasos }) {
  const unidades = f.apendice ? UNIDADES_NOM.filter((u) => u.apendices.includes(f.apendice)).map((u) => u.tipo).join(', ') : 'Según formulario del servicio'
  const n = nivel?.nivel || 0
  return (
    <section className="fr-caja fr-ficha" aria-live="polite" aria-label={`Ficha rápida de ${f.nombre}`}>
      <span className="pl-rotulo">Ficha rápida</span>
      <h2>{f.nombre}</h2>
      <p className="farm-ficha-meta"><span className="ui-etiqueta">{f.grupo}</span> <span className="pl-insignia">{ETIQUETA_ORIGEN[casillaDe(f)]}</span></p>
      <span className="pl-dominio">
        <span className="pl-dominio-barras" aria-hidden="true">{[1, 2, 3].map((k) => <i key={k} className={k <= n ? 'on' : ''} />)}</span>
        <span>{NIVELES_FARMACO[n]}{!tieneCasos && n === 2 ? ' · sin casos todavía' : ''}</span>
      </span>
      <dl className="fr-ficha-dl">
        <div><dt>Uso</dt><dd>{f.uso}</dd></div>
        <div><dt>Precaución clave</dt><dd>{f.precaucion}</dd></div>
        <div><dt>Unidades que lo llevan</dt><dd>{unidades}</dd></div>
      </dl>
      <div className="pl-acciones">
        <Link className="btn btn--reanudar pl-sin-icono" to={`/farmacos?modo=tarjetas&farmaco=${f.id}`}>Repasar sus tarjetas</Link>
        <Link className="btn btn--fantasma" to={`/farmacos/${f.id}`}>Ficha completa</Link>
      </div>
    </section>
  )
}
