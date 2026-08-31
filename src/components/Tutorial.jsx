import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'

// ============================================================
//  Tutorial de una pantalla — foco guiado, una sola vez
// ------------------------------------------------------------
//  Ilumina un elemento real de la pantalla y explica para qué sirve. El
//  «agujero» del velo no es un recorte: es un `box-shadow` enorme sobre un
//  rectángulo del tamaño del objetivo, que el navegador compone en la GPU y
//  no obliga a repintar el documento entero en cada paso.
//
//  UN PASO SIN OBJETIVO, O CON UN OBJETIVO QUE NO EXISTE, SIGUE SIRVIENDO. El
//  paso se enseña centrado, sin foco. Esto no es una concesión: media docena de
//  pasos apuntan a cosas que solo ve cierto rol, o que no están cuando la lista
//  viene vacía. Un tutorial jamás puede dejar inutilizable la pantalla que
//  venía a explicar.
//
//  SE CIERRA COMO SEA. Terminar, saltar, Esc o pulsar fuera: las cuatro marcan
//  el tutorial como visto. El dueño del producto lo pidió así —una vez en la
//  vida del usuario—, y una salida que NO marcase dejaría a quien lo cierra
//  recibiéndolo otra vez en cada visita.
// ============================================================

// Aire alrededor del elemento iluminado, para que no quede pegado al borde.
const AIRE = 8

export default function Tutorial({ tutorial, onCerrar }) {
  const [i, setI] = useState(0)
  const [rect, setRect] = useState(null)
  const cajaRef = useRef(null)

  const pasos = tutorial?.pasos || []
  const paso = pasos[i] || null
  const ultimo = i >= pasos.length - 1

  // Posición del objetivo del paso actual. Se recalcula al cambiar de paso y
  // cuando la ventana se mueve debajo: sin esto, el foco se queda donde estaba
  // y termina iluminando el sitio equivocado.
  const medir = useCallback(() => {
    if (!paso?.objetivo) { setRect(null); return }
    const el = document.querySelector(paso.objetivo)
    if (!el) { setRect(null); return }
    const r = el.getBoundingClientRect()
    // Un elemento de tamaño cero está en el DOM pero no en pantalla (un drawer
    // cerrado, una fila colapsada). Se trata como si no estuviera.
    if (r.width < 1 || r.height < 1) { setRect(null); return }
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height })
  }, [paso])

  useLayoutEffect(() => {
    if (paso?.objetivo) {
      const el = document.querySelector(paso.objetivo)
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }
    // Se mide tras el desplazamiento; si no, se mediría la posición de antes.
    const t = setTimeout(medir, paso?.objetivo ? 320 : 0)
    return () => clearTimeout(t)
  }, [medir, paso])

  useEffect(() => {
    window.addEventListener('resize', medir)
    window.addEventListener('scroll', medir, true)
    return () => {
      window.removeEventListener('resize', medir)
      window.removeEventListener('scroll', medir, true)
    }
  }, [medir])

  const terminar = useCallback(() => { onCerrar?.() }, [onCerrar])
  const siguiente = useCallback(() => {
    if (ultimo) terminar()
    else setI((n) => n + 1)
  }, [ultimo, terminar])
  const anterior = useCallback(() => setI((n) => Math.max(0, n - 1)), [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); terminar() }
      else if (e.key === 'ArrowRight') { e.preventDefault(); siguiente() }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); anterior() }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [terminar, siguiente, anterior])

  // El foco entra en el diálogo: quien navega con teclado o lector de pantalla
  // tiene que oír el tutorial, no seguir en el enlace donde estaba.
  useEffect(() => { cajaRef.current?.focus() }, [i])

  if (!paso) return null

  // La tarjeta va debajo del objetivo, salvo que no quepa: entonces encima.
  // Sin objetivo, centrada.
  const estiloCaja = rect
    ? (() => {
      const debajo = rect.top + rect.height + AIRE + 200 < window.innerHeight
      return {
        top: debajo ? rect.top + rect.height + AIRE * 2 : undefined,
        bottom: debajo ? undefined : window.innerHeight - rect.top + AIRE * 2,
        left: Math.max(AIRE * 2, Math.min(rect.left, window.innerWidth - 380)),
      }
    })()
    : null

  return (
    <div className="tut" role="presentation" onClick={terminar}>
      {rect && (
        <div
          className="tut-foco"
          style={{
            top: rect.top - AIRE,
            left: rect.left - AIRE,
            width: rect.width + AIRE * 2,
            height: rect.height + AIRE * 2,
          }}
          aria-hidden="true"
        />
      )}

      <div
        ref={cajaRef}
        tabIndex={-1}
        className={`tut-caja ${rect ? 'tut-caja--anclada' : 'tut-caja--centro'}`}
        style={estiloCaja || undefined}
        role="dialog"
        aria-modal="true"
        aria-labelledby="tut-titulo"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="tut-cabecera">
          <span className="tut-etiqueta">
            {tutorial.titulo} · {i + 1} de {pasos.length}
          </span>
          <button
            type="button"
            className="tut-cerrar"
            onClick={terminar}
            aria-label="Cerrar el tutorial"
          >
            <Icon name="cerrar" size={16} />
          </button>
        </div>

        <h2 id="tut-titulo" className="tut-titulo">
          {paso.titulo || tutorial.titulo}
        </h2>
        <p className="tut-texto">{paso.texto}</p>

        <div className="tut-pie">
          <div className="tut-puntos" aria-hidden="true">
            {pasos.map((p, n) => (
              <span key={p.texto} className={`tut-punto ${n === i ? 'on' : ''}`} />
            ))}
          </div>
          <div className="tut-acciones">
            {i > 0 && (
              <button type="button" className="btn btn--sm btn--fantasma" onClick={anterior}>
                Atrás
              </button>
            )}
            {!ultimo && (
              <button type="button" className="tut-saltar" onClick={terminar}>
                Saltar
              </button>
            )}
            <button type="button" className="btn btn--sm btn--carbon" onClick={siguiente}>
              {ultimo ? 'Entendido' : 'Siguiente'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
