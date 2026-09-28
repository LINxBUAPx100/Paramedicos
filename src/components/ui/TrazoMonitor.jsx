import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { trazoEcg, puntoEnTrazo, colorDeAvance } from '../../lib/pulsoModelo.js'

// El trazo del monitor de PTEM Pulso: un complejo por sección de la lección.
// Las secciones ya vistas se pintan en rojo; la actual, en azul hasta donde va
// el punto. El punto RECORRE la línea (sube y baja con cada complejo) según el
// avance continuo `progreso` (0…total), y su color cambia con el avance.
//
// Con `onIr` cada latido es un botón que salta a su sección; sin él, el trazo
// es solo una lectura (así va en el tablero del inicio).
const DURACION = 650

function useAvanceSuave(objetivo) {
  const [valor, setValor] = useState(objetivo)
  const actual = useRef(objetivo)
  useEffect(() => {
    const reducir = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const desde = actual.current
    if (reducir || Math.abs(objetivo - desde) < 0.001) {
      actual.current = objetivo
      setValor(objetivo)
      return undefined
    }
    let cuadro = 0
    const inicio = performance.now()
    // Saltos pequeños (el desplazamiento) siguen casi al instante; los grandes
    // (un clic en otro latido) viajan por el trazo sin cortar camino.
    const dur = Math.min(DURACION, 120 + Math.abs(objetivo - desde) * 260)
    const paso = (t) => {
      const k = Math.min(1, (t - inicio) / dur)
      const e = 1 - (1 - k) ** 3
      actual.current = desde + (objetivo - desde) * e
      setValor(actual.current)
      if (k < 1) cuadro = requestAnimationFrame(paso)
    }
    cuadro = requestAnimationFrame(paso)
    return () => cancelAnimationFrame(cuadro)
  }, [objetivo])
  return valor
}

export default function TrazoMonitor({
  total, vistas = [], actual = -1, progreso = null, etiquetas = [], onIr = null, alto = 44, className = '',
}) {
  const id = useId().replace(/:/g, '')
  const n = Math.max(1, total || 1)
  // Memoizado: el punto se anima cuadro a cuadro y el trazo no cambia.
  const d = useMemo(() => trazoEcg(n, alto), [n, alto])
  const ancho = 800 / n
  const vistasSet = new Set(vistas)
  const objetivo = actual < 0 ? null : Math.max(0, Math.min(n, progreso ?? actual + 0.5))
  const avance = useAvanceSuave(objetivo ?? 0)
  const punto = objetivo === null ? null : puntoEnTrazo(n, avance, alto)
  const seccionDelPunto = Math.min(n - 1, Math.floor(avance))
  return (
    <div className={`pl-trazo ${onIr ? 'pl-trazo--interactivo' : ''} ${className}`} style={{ '--pl-trazo-alto': `${alto}px` }}>
      <svg viewBox={`0 0 800 ${alto}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={`${id}-v`}>
            {[...vistasSet].map((i) => <rect key={i} x={i * ancho} y={-6} width={ancho + 0.5} height={alto + 12} />)}
          </clipPath>
          {punto && (
            <clipPath id={`${id}-a`}>
              <rect x={seccionDelPunto * ancho} y={-6} width={Math.max(0, punto.x - seccionDelPunto * ancho)} height={alto + 12} />
            </clipPath>
          )}
        </defs>
        <path className="pl-trazo-base" d={d} />
        <path className="pl-trazo-vivo" d={d} clipPath={`url(#${id}-v)`} />
        {punto && <path className="pl-trazo-actual" d={d} clipPath={`url(#${id}-a)`} />}
      </svg>
      {/* El punto va en HTML y no dentro del SVG: el SVG se estira con
          preserveAspectRatio="none" y un círculo se volvería un óvalo. */}
      {punto && (
        <span
          className="pl-trazo-punta"
          aria-hidden="true"
          style={{ left: `${(punto.x / 800) * 100}%`, top: `${punto.y}px`, '--pl-punta': colorDeAvance(avance / n) }}
        />
      )}
      {onIr && (
        <div className="pl-trazo-latidos" style={{ gridTemplateColumns: `repeat(${n}, 1fr)` }}>
          {Array.from({ length: n }, (_, i) => (
            <button
              key={i}
              type="button"
              data-t={etiquetas[i] || `Sección ${i + 1}`}
              aria-label={`Ir a ${etiquetas[i] || `la sección ${i + 1}`}${vistasSet.has(i) ? ' (leída)' : ''}`}
              aria-current={i === actual ? 'step' : undefined}
              onClick={() => onIr(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
