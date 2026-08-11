import { useEffect, useRef, useState } from 'react'

// ============================================================
//  Reveal — aparecer al entrar en pantalla
// ------------------------------------------------------------
//  Usa UN IntersectionObserver compartido por todas las instancias. La versión
//  anterior enganchaba `scroll` + `resize` y llamaba a getBoundingClientRect()
//  dentro de un rAF: con los 17 Reveal del Home eso son 17 listeners y 17
//  lecturas de layout FORZADAS por frame mientras se hace scroll (layout
//  thrashing), justo en los móviles de gama media que usan los alumnos.
//  IntersectionObserver hace lo mismo fuera del hilo principal.
//
//  Desaparece también el temporizador de respaldo de 2.2s que tenía la versión
//  anterior: era un parche por desconfianza en el propio mecanismo. Con el
//  observador no hace falta — si el elemento está en pantalla, se dispara.
//
//  Respeta prefers-reduced-motion: si está activo, el contenido aparece de
//  inmediato y ni siquiera se crea el observador.
// ============================================================

// Un observador para toda la app. Se crea perezosamente (en el primer Reveal
// que lo necesite) y nunca se destruye: vive lo que viva la página.
let observador = null
const alRevelar = new WeakMap()

function obtenerObservador() {
  if (observador) return observador
  observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue
        alRevelar.get(entrada.target)?.()
        observador.unobserve(entrada.target) // revelar es de ida
      }
    },
    // Se revela un poco ANTES de que el elemento toque el borde inferior, para
    // que la animación termine cuando el usuario llega a leerlo.
    { rootMargin: '0px 0px -10% 0px', threshold: 0 }
  )
  return observador
}

export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, style, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return undefined

    // Sin soporte (navegador antiguo) o con movimiento reducido: se muestra ya.
    // Nunca se deja contenido oculto por no poder animarlo.
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true)
      return undefined
    }

    const io = obtenerObservador()
    alRevelar.set(el, () => setVisible(true))
    io.observe(el)
    return () => {
      io.unobserve(el)
      alRevelar.delete(el)
    }
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal-os ${visible ? 'is-visible' : ''} ${className}`}
      style={{ '--rd': `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
