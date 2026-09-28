import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'
import EjercicioGuiado from './EjercicioGuiado.jsx'
import { FARMACOS } from '../../data/farmacos/catalogo.js'
import { casosDisponibles, construirCaso } from '../../lib/casosFarmacologia.js'
import { nuevaSemilla } from '../../lib/azar.js'
import { leerDominio, registrarIntento, RACHA_PARA_DOMINAR, leerErrores, guardarErrores } from '../../lib/dominioFarmacos.js'
import { sumarErrores } from '../../lib/rutaFarmacos.js'
import { useSincronizarErrores } from './useSincronizarErrores.js'
import { AVISO_PROTOCOLO } from '../../lib/farmacosModelo.js'

function Fuente({ fuente, cita }) {
  if (!fuente) return null
  const lugar = [fuente.capitulo, fuente.seccion, fuente.pagina && `p. ${fuente.pagina}`].filter(Boolean).join(' · ')
  return (
    <p className="ej-fuente">
      <Icon name="libro" size={14} />{' '}
      {fuente.url ? <a href={fuente.url} target="_blank" rel="noreferrer noopener">{fuente.documento}</a> : fuente.documento}
      {`, ${fuente.edicion}`}{lugar ? ` · ${lugar}` : ''}
      {cita && <> — «{cita}»</>}
    </p>
  )
}

// Casos clínicos: fármaco → vía → dosis → volumen/velocidad → técnica.
export default function CasosClinicos({ farmacoId = null }) {
  const todos = useMemo(() => casosDisponibles(FARMACOS), [])
  const [filtro, setFiltro] = useState(farmacoId || 'todos')
  const [seleccion, setSeleccion] = useState(null) // { f, d }
  const [semilla, setSemilla] = useState(() => nuevaSemilla('caso'))
  const [dominio, setDominio] = useState(() => leerDominio())
  const sincronizar = useSincronizarErrores()
  const lista = filtro === 'todos' ? todos : todos.filter(({ f }) => f.id === filtro)
  const farmacosConCaso = [...new Map(todos.map(({ f }) => [f.id, f])).values()]

  const caso = useMemo(
    () => (seleccion ? construirCaso(seleccion.f, seleccion.d, { farmacos: FARMACOS, semilla }) : null),
    [seleccion, semilla],
  )

  const iniciar = (x) => { setSeleccion(x); setSemilla(nuevaSemilla('caso')) }
  const alAzar = () => { if (lista.length) iniciar(lista[Math.floor(Math.random() * lista.length)]) }

  if (!todos.length) {
    return <div className="ui-estado"><h2>Todavía no hay casos</h2><p>Los casos aparecen cuando una ficha tiene dosis con su fuente completa.</p></div>
  }

  if (caso) {
    const clave = `caso:${caso.id}`
    return (
      <div className="calc-leccion">
        <button type="button" className="ui-enlace" onClick={() => setSeleccion(null)}>
          <Icon name="chevronIzq" size={14} /> Todos los casos
        </button>
        <section className="ui-panel">
          <EjercicioGuiado
            key={semilla}
            ejercicio={caso}
            cabecera={<p className="ui-antetitulo">Caso · {seleccion.f.nombre}</p>}
            onTerminar={(rs) => {
              // Los tipos de error se acumulan: la ruta dice qué practicar.
              sincronizar(guardarErrores(sumarErrores(leerErrores(), rs)))
              setDominio(registrarIntento(clave, rs.every((r) => r.primera && !r.asistido)))
            }}
            pie={(
              <>
                {caso.repeticion && <p><strong>Después:</strong> {caso.repeticion}</p>}
                <Fuente fuente={caso.fuente} cita={caso.cita} />
                <p className="staff-ayuda">{AVISO_PROTOCOLO}</p>
                <div className="ui-atajos">
                  <button type="button" className="btn btn--primario" onClick={() => setSemilla(nuevaSemilla('caso'))}>Mismo caso, otro paciente</button>
                  <button type="button" className="btn btn--suave" onClick={alAzar}>Caso al azar</button>
                  <Link className="btn btn--suave" to={`/farmacos/${seleccion.f.id}`}>Ficha de {seleccion.f.nombre}</Link>
                </div>
              </>
            )}
          />
        </section>
      </div>
    )
  }

  return (
    <>
      <p className="staff-ayuda">
        Cada caso te pide las decisiones de una administración real: qué fármaco, qué vía, cuánto para ese
        peso, cuántos mL de la presentación y cómo se aplica. El paciente cambia en cada intento. Un caso
        se domina con {RACHA_PARA_DOMINAR} intentos seguidos sin errores.
      </p>
      <div className="ui-herramientas">
        <label className="ui-campo">Fármaco
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="todos">Todos ({todos.length} casos)</option>
            {farmacosConCaso.map((f) => <option key={f.id} value={f.id}>{f.nombre}</option>)}
          </select>
        </label>
        <button type="button" className="btn btn--primario" onClick={alAzar}><Icon name="chispa" size={15} /> Caso al azar</button>
      </div>
      <ul className="farm-rejilla">
        {lista.map(({ f, d }) => {
          const dom = dominio[`caso:${f.id}:${d.id}`]
          return (
            <li key={`${f.id}:${d.id}`}>
              <button type="button" className={`farm-tarjeta calc-caso ${dom?.dominada ? 'is-dominada' : ''}`} onClick={() => iniciar({ f, d })}>
                <strong>{f.nombre}</strong>
                <span className="farm-tarjeta-grupo">{d.indicacion}</span>
                <span className="farm-tarjeta-uso">{d.poblacion === 'pediatrico' ? 'Pediátrico' : d.poblacion === 'embarazo' ? 'Embarazo' : 'Adulto'} · {d.via}</span>
                <span className="calc-estado">{dom?.dominada ? 'Dominado' : dom?.racha ? `Racha ${dom.racha}/${RACHA_PARA_DOMINAR}` : 'Sin practicar'}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </>
  )
}
