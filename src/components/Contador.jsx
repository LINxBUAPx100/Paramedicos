import { useEffect, useRef, useState } from 'react'

// Cuenta ascendente (0 → valor) cuando entra en pantalla. Respeta reduced-motion.
export default function Contador({ valor = 0, duracion = 1100, className = '' }) {
  const [n, setN] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(valor)
      return
    }
    let raf = 0
    let inicio = 0
    let lanzado = false
    const animar = (t) => {
      if (!inicio) inicio = t
      const p = Math.min(1, (t - inicio) / duracion)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setN(Math.round(eased * valor))
      if (p < 1) raf = requestAnimationFrame(animar)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !lanzado) {
          lanzado = true
          raf = requestAnimationFrame(animar)
          io.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [valor, duracion])

  return (
    <span ref={ref} className={className}>
      {n}
    </span>
  )
}
