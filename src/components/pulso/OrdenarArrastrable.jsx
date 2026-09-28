import { useLayoutEffect, useRef, useState } from 'react'
import Icon from '../Icon.jsx'
import { moverA } from '../../lib/pulsoModelo.js'

// Actividad «Ordena» con arrastre y animación (PTEM Pulso).
//
//  · Arrastrar: con ratón, desde cualquier parte del paso; con el dedo, desde
//    el asa (⋮⋮) para no robarle el desplazamiento a la página.
//  · Mientras se arrastra, los demás pasos se apartan y el orden cambia en
//    vivo al cruzar la mitad del vecino.
//  · Cada cambio de lugar (arrastre o flechas) se ANIMA con la técnica FLIP:
//    se mide dónde estaba cada paso, dónde quedó, y se desliza de uno a otro.
//    Así se ve qué se movió y hacia dónde, en vez de un salto.
//  · Las flechas siguen: son la vía de teclado y de quien no puede arrastrar.
//    Cada movimiento se anuncia para lectores de pantalla.
const UMBRAL = 4
const DURACION = 220

export default function OrdenarArrastrable({ pasos, orden, setOrden, comprobado, onMover }) {
  const lista = useRef(null)
  const posiciones = useRef(new Map()) // idx → offsetTop antes del último cambio
  const arrastre = useRef(null)
  // El orden más reciente, aunque React todavía no haya vuelto a pintar: dos
  // movimientos del puntero seguidos no pueden partir del mismo orden viejo.
  const ordenRef = useRef(orden)
  ordenRef.current = orden
  const [arrastrando, setArrastrando] = useState(null) // idx del paso en la mano
  const [aviso, setAviso] = useState('')
  const reducir = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const items = () => [...(lista.current?.querySelectorAll('[data-idx]') || [])]

  // FLIP: cada paso que cambió de lugar parte de su posición anterior.
  useLayoutEffect(() => {
    const previas = posiciones.current
    const siguientes = new Map()
    for (const el of items()) {
      const idx = Number(el.dataset.idx)
      siguientes.set(idx, el.offsetTop)
      const antes = previas.get(idx)
      // El que va en la mano se recoloca bajo el puntero en su hueco nuevo.
      if (arrastre.current?.activo && idx === arrastre.current.idx) {
        el.style.transform = `translateY(${arrastre.current.top0 + arrastre.current.dy - el.offsetTop}px)`
        continue
      }
      if (reducir || antes === undefined) continue
      const delta = antes - el.offsetTop
      if (!delta) continue
      el.style.transition = 'none'
      el.style.transform = `translateY(${delta}px)`
      // Forzar el cálculo antes de soltar la animación.
      void el.offsetHeight
      el.style.transition = `transform ${DURACION}ms cubic-bezier(0.22, 1, 0.36, 1)`
      el.style.transform = ''
    }
    posiciones.current = siguientes
  }, [orden, reducir])

  const anunciar = (idx, pos) => setAviso(`«${pasos[idx]}» ahora es el paso ${pos + 1} de ${pasos.length}.`)

  const mover = (desde, hasta) => {
    if (hasta < 0 || hasta >= orden.length || desde === hasta) return
    const idx = orden[desde]
    setOrden(moverA(orden, desde, hasta))
    onMover?.()
    anunciar(idx, hasta)
  }

  const alBajar = (e, idx) => {
    if (e.button !== undefined && e.button !== 0) return
    if (e.target.closest('button')) return
    // Con el dedo solo desde el asa: arrastrar el paso entero impediría
    // desplazar la página sobre la lista.
    if (e.pointerType !== 'mouse' && !e.target.closest('.ordenar-asa')) return
    const el = e.currentTarget
    arrastre.current = { idx, y0: e.clientY, top0: el.offsetTop, dy: 0, activo: false, el }
    el.setPointerCapture?.(e.pointerId)
  }

  const alMover = (e) => {
    const a = arrastre.current
    if (!a) return
    const dy = e.clientY - a.y0
    if (!a.activo) {
      if (Math.abs(dy) < UMBRAL) return
      a.activo = true
      setArrastrando(a.idx)
    }
    e.preventDefault()
    // Dónde quedaría el centro del paso arrastrado.
    const centro = a.top0 + dy + a.el.offsetHeight / 2
    a.dy = dy
    const hermanos = items()
    const actual = ordenRef.current
    const desde = actual.indexOf(a.idx)
    let hasta = desde
    hermanos.forEach((h, pos) => {
      if (Number(h.dataset.idx) === a.idx) return
      const medio = h.offsetTop + h.offsetHeight / 2
      if (pos < desde && centro < medio) hasta = Math.min(hasta, pos)
      if (pos > desde && centro > medio) hasta = Math.max(hasta, pos)
    })
    if (hasta !== desde) {
      const nuevo = moverA(actual, desde, hasta)
      ordenRef.current = nuevo
      setOrden(nuevo)
      onMover?.()
    }
    // El paso sigue al puntero aunque su hueco en la lista haya cambiado.
    a.el.style.transition = 'none'
    a.el.style.transform = `translateY(${a.top0 + dy - a.el.offsetTop}px)`
  }

  const alSoltar = () => {
    const a = arrastre.current
    arrastre.current = null
    if (!a) return
    if (a.activo) {
      a.el.style.transition = reducir ? 'none' : `transform ${DURACION}ms cubic-bezier(0.22, 1, 0.36, 1)`
      a.el.style.transform = ''
      anunciar(a.idx, ordenRef.current.indexOf(a.idx))
    }
    setArrastrando(null)
  }

  return (
    <>
      <ol className="ordenar-lista" ref={lista}>
        {orden.map((idx, pos) => {
          const ok = comprobado && idx === pos
          const mal = comprobado && idx !== pos
          return (
            <li
              key={idx}
              data-idx={idx}
              className={`ordenar-item ${ok ? 'is-ok' : ''} ${mal ? 'is-mal' : ''} ${arrastrando === idx ? 'es-arrastrado' : ''}`}
              onPointerDown={(e) => alBajar(e, idx)}
              onPointerMove={alMover}
              onPointerUp={alSoltar}
              onPointerCancel={alSoltar}
            >
              <span className="ordenar-asa" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="9" cy="6" r="1.6" /><circle cx="15" cy="6" r="1.6" /><circle cx="9" cy="12" r="1.6" /><circle cx="15" cy="12" r="1.6" /><circle cx="9" cy="18" r="1.6" /><circle cx="15" cy="18" r="1.6" /></svg>
              </span>
              <span className="ordenar-num">{pos + 1}</span>
              <span className="ordenar-txt">{pasos[idx]}</span>
              <span className="ordenar-flechas">
                <button type="button" onClick={() => mover(pos, pos - 1)} disabled={pos === 0} aria-label={`Subir «${pasos[idx]}»`}>
                  <Icon name="chevronArriba" size={16} />
                </button>
                <button type="button" onClick={() => mover(pos, pos + 1)} disabled={pos === orden.length - 1} aria-label={`Bajar «${pasos[idx]}»`}>
                  <Icon name="chevronAbajo" size={16} />
                </button>
              </span>
            </li>
          )
        })}
      </ol>
      <p className="pl-solo-lector" aria-live="polite">{aviso}</p>
    </>
  )
}
