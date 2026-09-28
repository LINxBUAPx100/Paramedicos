import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext.jsx'
import { claveTarjeta, sesionDeRepaso, etiquetaIntervalo } from '../../lib/pulsoModelo.js'
import TarjetaVolteable from '../ui/TarjetaVolteable.jsx'

// ============================================================
//  Repaso de hoy (PTEM Pulso): repetición espaciada
// ------------------------------------------------------------
//  La sesión se arma UNA vez al entrar (vencidas primero, luego hasta 10
//  nuevas) para que calificar no reordene la tarjeta que se está leyendo.
//  «Otra vez» devuelve la tarjeta al final de la sesión. El estado de cada
//  tarjeta vive en el progreso local (ver ProgressContext).
// ============================================================
// `cartas`: [{ temaId, frente, reverso, temaTitulo, clave?, enlace? }]. Sin
// `clave` se deriva de tema + frente; sin `enlace`, se vuelve a la lección.
export default function SesionEspaciada({ cartas }) {
  const { estado, calificarTarjeta } = useProgress()
  const conClave = useMemo(
    () => cartas.map((c) => ({ ...c, clave: c.clave || claveTarjeta(c.temaId, c.frente) })),
    [cartas]
  )
  const [cola, setCola] = useState(() => sesionDeRepaso(conClave, estado.srs || {}))
  const [volteada, setVolteada] = useState(false)
  const [hechas, setHechas] = useState(0)
  const carta = cola[0]
  const srs = estado.srs || {}

  if (!carta) {
    return (
      <div className="ui-estado pl-repaso-fin" role="status">
        <h2>{hechas ? 'Repaso de hoy terminado' : 'Nada que repasar por hoy'}</h2>
        <p>{hechas
          ? `Repasaste ${hechas} ${hechas === 1 ? 'tarjeta' : 'tarjetas'}. Cada una volverá justo antes de que la olvides.`
          : 'No tienes tarjetas vencidas ni nuevas en este conjunto. Puedes usar el repaso libre.'}</p>
      </div>
    )
  }
  const calificar = (c) => {
    calificarTarjeta(carta.clave, c)
    setHechas((n) => n + 1)
    setVolteada(false)
    setCola((q) => (c === 0 ? [...q.slice(1), carta] : q.slice(1)))
  }
  const nueva = !srs[carta.clave]
  return (
    <section aria-label="Repaso espaciado">
      <div className="ui-repaso-barra">
        <span role="status">{cola.length} por repasar · {hechas} hechas</span>
        {nueva && <span className="pl-insignia">Nueva</span>}
      </div>
      <TarjetaVolteable frente={carta.frente} reverso={carta.reverso} volteada={volteada} onVoltear={() => setVolteada((v) => !v)} pistaReverso="¿Qué tan bien la recordaste?" />
      {volteada ? (
        <div className="pl-calificar" role="group" aria-label="¿Qué tan bien la recordaste?">
          {[['Otra vez', 'var(--urgencia)'], ['Difícil', 'var(--alerta)'], ['Bien', 'var(--primario)'], ['Fácil', 'var(--exito-solido)']].map(([txt, color], c) => (
            <button type="button" key={txt} style={{ '--c': color }} onClick={() => calificar(c)}>
              {txt}<small>{etiquetaIntervalo(srs[carta.clave], c)}</small>
            </button>
          ))}
        </div>
      ) : (
        <p className="pl-nota-pie">Intenta responder antes de voltearla. Luego dinos qué tan bien la recordaste.</p>
      )}
      <p className="ui-repaso-origen"><Link to={carta.enlace || `/tema/${carta.temaId}`}>{carta.enlace ? 'Abrir la ficha' : 'Volver a la lección'}: {carta.temaTitulo || 'abrir'}</Link></p>
    </section>
  )
}
