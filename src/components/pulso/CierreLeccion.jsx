import { useEffect, useRef, useState } from 'react'
import { NIVELES_DOMINIO } from '../../lib/pulsoModelo.js'
import { ANCLA_PRACTICA } from './PracticaLeccion.jsx'

// Pantalla de cierre al terminar una lección (PTEM Pulso). Dice qué nivel se
// alcanzó, qué falta para el siguiente y ofrece la siguiente parada del plan
// con una cuenta atrás.
//
// La cuenta atrás se detiene con CUALQUIER interacción dentro del cierre y no
// existe si el sistema pide reducir movimiento: un salto automático que no se
// puede frenar sería quitarle el control al alumno.
const SEGUNDOS = 8
const CIRC = 2 * Math.PI * 27

export default function CierreLeccion({ nivel, preguntas = 0, siguiente, onIr, onCerrar }) {
  const reducir = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [quedan, setQuedan] = useState(reducir ? null : SEGUNDOS)
  const caja = useRef(null)
  const detener = () => setQuedan(null)
  // En una ref: el padre re-renderiza (el progreso cambia) y una función nueva
  // en las dependencias reiniciaría el segundo en curso.
  const irRef = useRef(onIr)
  irRef.current = onIr

  useEffect(() => { caja.current?.focus() }, [])
  useEffect(() => {
    if (quedan === null) return undefined
    if (quedan <= 0) { irRef.current(); return undefined }
    const t = setTimeout(() => setQuedan((q) => (q === null ? null : q - 1)), 1000)
    return () => clearTimeout(t)
  }, [quedan])
  useEffect(() => {
    const tecla = (e) => { if (e.key === 'Escape') onCerrar() }
    window.addEventListener('keydown', tecla)
    return () => window.removeEventListener('keydown', tecla)
  }, [onCerrar])

  const irAPractica = () => {
    onCerrar()
    setTimeout(() => {
      const el = document.getElementById(ANCLA_PRACTICA)
      el?.focus({ preventScroll: true })
      el?.scrollIntoView({ block: 'start', behavior: reducir ? 'auto' : 'smooth' })
    }, 60)
  }
  const siguienteNivel = NIVELES_DOMINIO[Math.min(4, nivel + 1)]

  return (
    <div className="pl-cierre-velo" role="presentation" onPointerDown={(e) => { if (e.target === e.currentTarget) onCerrar() }}>
      <div
        className="pl-cierre"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pl-cierre-titulo"
        tabIndex={-1}
        ref={caja}
        onPointerDown={detener}
        onKeyDown={detener}
      >
        <div className="pl-franja" aria-hidden="true" />
        <div className="pl-cierre-cuerpo">
          <span className="pl-cierre-sube">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true"><path d="m5 12 5 5 9-10" /></svg>
            Lección terminada · estás en «{NIVELES_DOMINIO[nivel]}»
          </span>
          {nivel < 2 && preguntas > 0 ? (
            <>
              <h2 id="pl-cierre-titulo">{preguntas} preguntas y llegas a «{siguienteNivel}»</h2>
              <div className="pl-acciones">
                <button type="button" className="btn btn--reanudar pl-sin-icono" onClick={irAPractica}>Responder ahora</button>
                <button type="button" className="btn btn--fantasma" onClick={onCerrar}>Después</button>
              </div>
            </>
          ) : (
            <h2 id="pl-cierre-titulo">{nivel >= 4 ? 'Dominas este tema' : `Siguiente meta: «${siguienteNivel}»`}</h2>
          )}
          {siguiente && (
            <div className="pl-siguiente">
              {quedan !== null ? (
                <svg className="pl-eta" viewBox="0 0 64 64" aria-hidden="true">
                  <circle className="pl-eta-fondo" cx="32" cy="32" r="27" />
                  <circle className="pl-eta-frente" cx="32" cy="32" r="27" strokeDasharray={CIRC} strokeDashoffset={(CIRC * (SEGUNDOS - quedan)) / SEGUNDOS} />
                  <text x="32" y="39" textAnchor="middle">{quedan}</text>
                </svg>
              ) : (
                <span className="pl-parada" aria-hidden="true" />
              )}
              <div className="pl-siguiente-txt">
                <span className="pl-rotulo" aria-live="polite">
                  {quedan !== null ? `Siguiente parada en ${quedan} s` : 'Siguiente parada'}
                </span>
                <b>{siguiente.titulo}</b>
                <div className="pl-acciones">
                  <button type="button" className="btn btn--reanudar pl-sin-icono" onClick={onIr}>Ir ahora</button>
                  <button type="button" className="btn btn--fantasma" onClick={onCerrar}>Quedarme aquí</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
