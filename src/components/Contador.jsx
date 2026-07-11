import { useEffect, useRef, useState } from 'react'

// Cuenta ascendente (0 → valor) cuando entra en pantalla. Respeta reduced-motion.
// Garantiza que NUNCA se quede en 0: si ya está a la vista al montar, arranca de
// inmediato; y un backstop fija el valor final aunque el observer no dispare.
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
    let completo = false
    let backstop = 0

    const animar = (t) => {
      if (!inicio) inicio = t
      const p = Math.min(1, (t - inicio) / duracion)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setN(Math.round(eased * valor))
      if (p < 1) raf = requestAnimationFrame(animar)
      else completo = true
    }
    const lanzar = () => {
      if (lanzado) return
      lanzado = true
      raf = requestAnimationFrame(animar)
    }

    // Si ya está (o casi) a la vista al montar (p. ej. el hero), anima de inmediato
    // sin esperar al observer → evita el destello de "0" sobre el pliegue.
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) lanzar()

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) { lanzar(); io.disconnect() }
      },
      { threshold: 0.35 }
    )
    io.observe(el)

    // Red de seguridad: si la animación no completó (p. ej. rAF pausado por
    // pestaña en segundo plano), fija el valor final. Nunca se queda en 0.
    backstop = setTimeout(() => { if (!completo) setN(valor) }, 2000)

    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
      if (backstop) clearTimeout(backstop)
    }
  }, [valor, duracion])

  return (
    <span ref={ref} className={className}>
      {n}
    </span>
  )
}
