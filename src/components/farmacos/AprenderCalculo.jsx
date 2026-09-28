import { useMemo, useState } from 'react'
import Icon from '../Icon.jsx'
import EjercicioGuiado from './EjercicioGuiado.jsx'
import { HABILIDADES, HABILIDAD_POR_ID } from '../../lib/ejerciciosCalculo.js'
import { generador, nuevaSemilla } from '../../lib/azar.js'
import { leerDominio, registrarIntento, RACHA_PARA_DOMINAR, leerErrores, guardarErrores } from '../../lib/dominioFarmacos.js'
import { sumarErrores } from '../../lib/rutaFarmacos.js'

// Ruta de aprendizaje del cálculo: explicación → ejemplo resuelto → práctica
// guiada con números nuevos. Una habilidad se da por dominada con
// RACHA_PARA_DOMINAR ejercicios seguidos resueltos sin ayuda y a la primera.
// `habilidadInicial`: la ruta abre directamente la habilidad que entrena el
// error más frecuente del alumno (?habilidad=<id>).
export default function AprenderCalculo({ habilidadInicial = null }) {
  const [habilidadId, setHabilidadId] = useState(() => (habilidadInicial && HABILIDAD_POR_ID[habilidadInicial] ? habilidadInicial : null))
  const [semilla, setSemilla] = useState(() => nuevaSemilla('calc'))
  const [dominio, setDominio] = useState(() => leerDominio())
  const [verEjemplo, setVerEjemplo] = useState(false)
  const h = habilidadId ? HABILIDAD_POR_ID[habilidadId] : null
  const ejercicio = useMemo(() => (h ? h.generar(generador(semilla)) : null), [h, semilla])

  const abrir = (id) => { setHabilidadId(id); setSemilla(nuevaSemilla('calc')); setVerEjemplo(false) }
  const otro = () => setSemilla(nuevaSemilla('calc'))

  function terminar(resultados) {
    guardarErrores(sumarErrores(leerErrores(), resultados))
    const limpio = resultados.every((r) => r.primera && !r.asistido)
    setDominio(registrarIntento(`calc:${h.id}`, limpio))
  }

  if (!h) {
    return (
      <>
        <p className="staff-ayuda">
          Ocho habilidades, de la más básica a la más compleja. Cada una explica la operación, muestra un
          ejemplo resuelto y te da ejercicios nuevos cada vez. Se marca como dominada tras {RACHA_PARA_DOMINAR} ejercicios
          seguidos sin errores ni ayuda.
        </p>
        <ol className="calc-ruta">
          {HABILIDADES.map((x) => {
            const d = dominio[`calc:${x.id}`]
            return (
              <li key={x.id}>
                <button type="button" className={`calc-habilidad ${d?.dominada ? 'is-dominada' : ''}`} onClick={() => abrir(x.id)}>
                  <span className="calc-nivel">Nivel {x.nivel}</span>
                  <strong>{x.titulo}</strong>
                  <span className="calc-estado">
                    {d?.dominada ? <><Icon name="check" size={14} /> Dominada</>
                      : d?.racha ? `Racha ${d.racha}/${RACHA_PARA_DOMINAR}` : 'Sin practicar'}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </>
    )
  }

  const d = dominio[`calc:${h.id}`]
  return (
    <div className="calc-leccion">
      <button type="button" className="ui-enlace" onClick={() => setHabilidadId(null)}>
        <Icon name="chevronIzq" size={14} /> Todas las habilidades
      </button>
      <h2>{h.titulo}</h2>
      {h.explicacion.map((t) => <p key={t}>{t}</p>)}
      <p className="calc-formula"><Icon name="matraz" size={16} /> {h.formula}</p>
      <details className="ui-indice" open={verEjemplo} onToggle={(e) => setVerEjemplo(e.currentTarget.open)}>
        <summary>Ejemplo resuelto</summary>
        <p><strong>{h.ejemplo.enunciado}</strong></p>
        <p>{h.ejemplo.solucion}</p>
      </details>
      <section className="ui-panel">
        <div className="ui-repaso-barra">
          <span>Práctica guiada</span>
          <span>{d?.dominada ? 'Dominada' : `Racha ${d?.racha || 0}/${RACHA_PARA_DOMINAR}`}</span>
        </div>
        <EjercicioGuiado
          key={semilla}
          ejercicio={ejercicio}
          onTerminar={terminar}
          pie={<button type="button" className="btn btn--primario" onClick={otro}>Otro ejercicio <Icon name="chevronDer" size={15} /></button>}
        />
      </section>
    </div>
  )
}
