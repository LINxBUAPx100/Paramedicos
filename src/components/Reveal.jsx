import { useEffect, useRef, useState } from 'react'

// Revela su contenido al entrar en el viewport (fade + rise suave).
// Usa scroll/resize con guarda rAF (robusto en todos los entornos) y un
// chequeo en montaje para revelar de inmediato lo que ya está visible.
// Respeta prefers-reduced-motion: si está activo, muestra todo de inmediato.
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, style, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    let revealed = false
    let ticking = false
    let timer = 0

    const cleanup = () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (timer) clearTimeout(timer)
    }
    const reveal = () => {
      if (revealed) return
      revealed = true
      setVisible(true)
      cleanup()
    }
    const enView = () => {
      const r = el.getBoundingClientRect()
      return r.top < window.innerHeight * 0.9 && r.bottom > 0
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        if (enView()) reveal()
      })
    }

    // Si ya está (o casi) en pantalla al montar, revelar de inmediato.
    if (enView()) {
      setVisible(true)
      return
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    // Backstop: garantiza que el contenido nunca quede oculto.
    timer = setTimeout(reveal, 2200)
    return cleanup
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
