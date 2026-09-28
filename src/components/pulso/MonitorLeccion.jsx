import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext.jsx'
import { seccionLoQueMasSePregunta, NIVELES_DOMINIO } from '../../lib/pulsoModelo.js'
import TrazoMonitor from '../ui/TrazoMonitor.jsx'
import IndiceLeccion from '../ui/IndiceLeccion.jsx'

// El monitor de la lección (PTEM Pulso). Va fijo bajo la barra superior y
// cumple tres tareas:
//  1. dice en qué sección estás y cuánto llevas, con un latido por sección;
//  2. salta a cualquier sección (latidos, índice o el atajo a «Lo que más se
//     pregunta» del molde v2);
//  3. anota la sección en el progreso LOCAL para el «Reanudar» del inicio.
//
// Lo que NO hace: marcar el tema como leído. Que una sección pase por pantalla
// no demuestra que se haya leído (ver la auditoría UX, flujo 1), así que la
// marca sigue siendo una acción del alumno.
const id = (i) => `leccion-seccion-${i}`

export default function MonitorLeccion({ temaId, titulo, secciones = [], nivel = 0 }) {
  const total = secciones.length
  const { estado, registrarLectura, alternarMochila, fijarPreferencia } = useProgress()
  const letra = estado.preferencias?.letra || 0
  const unaMano = Boolean(estado.preferencias?.unaMano)
  const enMochila = (estado.mochila || []).includes(temaId)
  const [params] = useSearchParams()
  const [actual, setActual] = useState(-1)
  // Avance CONTINUO (sección + fracción recorrida de ella) para que el punto
  // del trazo se deslice mientras se lee, en vez de saltar de sección en sección.
  const [progreso, setProgreso] = useState(0)
  const lectura = estado.lecturas?.[temaId]
  const vistas = lectura?.total === total ? lectura.vistas || [] : []
  const atajo = seccionLoQueMasSePregunta(secciones)
  const saltoInicial = useRef(false)

  const ir = (i, bloque = null) => {
    const seccion = document.getElementById(id(i))
    if (!seccion) return
    const destino = bloque || seccion
    const reducir = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    seccion.focus({ preventScroll: true })
    destino.scrollIntoView({ block: bloque ? 'center' : 'start', behavior: reducir ? 'auto' : 'smooth' })
  }
  // El atajo lleva al aviso mismo, no al principio de su sección: suele estar
  // en medio de una sección larga.
  const irAlAtajo = () => {
    const seccion = document.getElementById(id(atajo))
    const aviso = [...(seccion?.querySelectorAll('.c-callout--clave') || [])]
      .find((el) => /lo que m[aá]s se pregunta/i.test(el.textContent || ''))
    ir(atajo, aviso || null)
  }

  // Sección actual: la última cuyo encabezado ya subió del 40 % de la pantalla.
  useEffect(() => {
    if (!total) return undefined
    let cuadro = 0
    const medir = () => {
      cuadro = 0
      const limite = window.innerHeight * 0.4
      let nuevo = -1
      let fraccion = 0
      for (let i = 0; i < total; i++) {
        const el = document.getElementById(id(i))
        if (!el) continue
        const r = el.getBoundingClientRect()
        if (r.top < limite) {
          nuevo = i
          fraccion = r.height > 0 ? Math.max(0, Math.min(0.999, (limite - r.top) / r.height)) : 0
        }
      }
      const alFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (alFinal && nuevo >= 0) { nuevo = total - 1; fraccion = 0.999 }
      setActual(nuevo)
      setProgreso(nuevo < 0 ? 0 : nuevo + fraccion)
    }
    const alDesplazar = () => { if (!cuadro) cuadro = requestAnimationFrame(medir) }
    medir()
    window.addEventListener('scroll', alDesplazar, { passive: true })
    window.addEventListener('resize', alDesplazar)
    return () => {
      window.removeEventListener('scroll', alDesplazar)
      window.removeEventListener('resize', alDesplazar)
      if (cuadro) cancelAnimationFrame(cuadro)
    }
  }, [temaId, total])

  // Cada cambio de sección se anota (anotarLectura ignora las repeticiones).
  useEffect(() => {
    if (actual >= 0) registrarLectura(temaId, actual, total)
  }, [temaId, actual, total, registrarLectura])

  // «Reanudar» desde el inicio llega con ?seccion=N.
  useEffect(() => {
    saltoInicial.current = false
  }, [temaId])
  useEffect(() => {
    const n = Number.parseInt(params.get('seccion'), 10)
    if (saltoInicial.current || !Number.isInteger(n) || n < 1 || n >= total) return undefined
    saltoInicial.current = true
    const t = setTimeout(() => ir(n), 120)
    return () => clearTimeout(t)
  }, [params, total])

  if (!total) return null
  const etiquetas = secciones.map((s) => s.titulo)
  const enCurso = actual >= 0 ? actual : 0
  return (
    <div className="pl-monitor" role="navigation" aria-label="Avance de la lección">
      <div className="pl-franja" aria-hidden="true" />
      <div className="pl-monitor-fila">
        <div className="pl-monitor-titulo">
          <b>{titulo}</b>
          <small aria-live="polite">
            {actual >= 0 ? `${etiquetas[enCurso]} · ${enCurso + 1} de ${total}` : `${total} ${total === 1 ? 'sección' : 'secciones'}`}
          </small>
        </div>
        {atajo >= 0 && atajo !== actual && (
          <button type="button" className="btn btn--atajo" onClick={irAlAtajo}>
            Ir a lo que más se pregunta
          </button>
        )}
        <span className="pl-dominio" title="Tu dominio de estudio de este tema">
          <span className="pl-dominio-barras" aria-hidden="true">
            {[1, 2, 3, 4].map((k) => <i key={k} className={k <= nivel ? 'on' : ''} />)}
          </span>
          <span>{NIVELES_DOMINIO[nivel]}</span>
        </span>
        <div className="pl-herramientas">
          <button
            type="button"
            className="pl-icono"
            onClick={() => fijarPreferencia('letra', (letra + 1) % 4)}
            aria-label={`Tamaño de letra: ${['normal', 'grande', 'más grande', 'máximo'][letra]}. Cambiar`}
            title="Tamaño de letra"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 18 9 6l5 12M5.8 14h6.4M15 18l3-7 3 7" /></svg>
          </button>
          <button
            type="button"
            className="pl-icono"
            aria-pressed={unaMano}
            onClick={() => fijarPreferencia('unaMano', !unaMano)}
            aria-label="Modo una mano"
            title="Modo una mano: letra grande y controles abajo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M10 18h4" /></svg>
          </button>
          <button
            type="button"
            className="pl-icono"
            aria-pressed={enMochila}
            onClick={() => alternarMochila(temaId)}
            aria-label={enMochila ? 'Quitar de Mi mochila' : 'Guardar en Mi mochila'}
            title={enMochila ? 'En tu mochila' : 'Guardar en Mi mochila'}
          >
            <svg viewBox="0 0 24 24" fill={enMochila ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z" /></svg>
          </button>
        </div>
      </div>
      <TrazoMonitor total={total} vistas={vistas} actual={actual} progreso={progreso} etiquetas={etiquetas} onIr={ir} alto={40} />
      <IndiceLeccion secciones={secciones} />
    </div>
  )
}
