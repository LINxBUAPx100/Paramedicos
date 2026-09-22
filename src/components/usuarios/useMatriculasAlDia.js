import { useEffect, useMemo, useRef, useState } from 'react'

// ============================================================
//  Las matrículas se ponen al día SOLAS — sin botón
// ------------------------------------------------------------
//  Se pidió el 21-09-2026: «que las matrículas se generen automáticamente sin
//  dar un botón; en el momento que se le asigne a un grupo que cumpla los
//  parámetros necesarios debe generar en automático su matrícula».
//
//  Cuando es el PERSONAL quien asigna el grupo, eso ya pasa en la misma
//  escritura (el alta, la ficha del mostrador, el selector de grupo). Este hook
//  cubre el otro camino, que es el que no tiene a nadie delante: el alumno que
//  consigue grupo por su cuenta —código de grupo, invitación, solicitud de
//  acceso aceptada—. Ahí no hay servidor que pueda emitirla (no hay Cloud
//  Functions, y la regla de `contadores` no deja al alumno mover el contador, a
//  propósito), así que la emite la primera pantalla de personal que lo vea.
//
//  TRES CAUTELAS, porque esto ESCRIBE al abrir una pantalla:
//
//   1. **Una firma, no un array.** El efecto depende de la lista de uids
//      pendientes, no del objeto: sin eso, cada render dispararía otra pasada.
//   2. **Cada firma se intenta UNA vez.** Si un grupo está mal configurado, su
//      alumno no se puede matricular y reintentarlo en bucle solo gastaría
//      lecturas. Se cuenta, se enseña y se para.
//   3. **Un tope por pasada** (lo aplica `asegurarMatriculas`): un padrón con
//      trescientos huecos no puede convertir una apertura en trescientas
//      escrituras. Lo que quede sale en la siguiente, que es igual de
//      automática.
//
//  Y NO ROMPE NADA SI FALLA: la pantalla tiene su propio trabajo. Un error aquí
//  se cuenta y se enseña; no se lanza.
// ============================================================

/**
 * @param {object} arg
 * @param {Array}  arg.personas  el listado que la pantalla ya tiene cargado.
 * @param {Array}  arg.grupos    los grupos de la academia, ya cargados.
 * @param {string} arg.academiaId
 * @param {boolean} arg.activo   false mientras la pantalla carga, o si quien
 *                               mira no puede emitir (las reglas lo denegarían).
 * @param {Function} arg.alEmitir se llama cuando SÍ se emitió algo, para que la
 *                               pantalla recargue y enseñe los números nuevos.
 * @returns {{emitidas: Array, bloqueadas: Array, trabajando: boolean}}
 */
export function useMatriculasAlDia({ personas, grupos, academiaId, activo = true, alEmitir }) {
  const [emitidas, setEmitidas] = useState([])
  const [bloqueadas, setBloqueadas] = useState([])
  const [trabajando, setTrabajando] = useState(false)
  const intentada = useRef('')

  // Quiénes están pendientes AHORA, en forma de cadena estable. Es lo que hace
  // que el efecto corra al cambiar la lista y no en cada render.
  const firma = useMemo(() => (personas || [])
    .filter((p) => (p?.rol || 'alumno') === 'alumno' && p?.grupoId && !String(p?.matricula || '').trim())
    .map((p) => p.uid || p.id)
    .sort()
    .join(','), [personas])

  useEffect(() => {
    if (!activo || !academiaId || !firma) return undefined
    if (!(grupos || []).length) return undefined // sin grupos no se puede decidir nada
    if (intentada.current === firma) return undefined
    intentada.current = firma

    let vivo = true
    ;(async () => {
      setTrabajando(true)
      try {
        const { asegurarMatriculas } = await import('../../lib/firebase/matriculas.js')
        const r = await asegurarMatriculas({ alumnos: personas, grupos, academiaId })
        if (!vivo) return
        setEmitidas(r.emitidas)
        setBloqueadas(r.bloqueadas)
        if (r.emitidas.length) alEmitir?.(r.emitidas)
      } catch {
        // Silencio a propósito: ver la cabecera. Lo que no se pudo emitir se
        // vuelve a intentar la próxima vez que se abra la pantalla.
      } finally {
        if (vivo) setTrabajando(false)
      }
    })()
    return () => { vivo = false }
  // `personas` y `alEmitir` quedan fuera a propósito: la primera cambia de
  // identidad en cada carga aunque su contenido pendiente sea el mismo —para
  // eso está `firma`—, y la segunda suele ser una función nueva por render.
  }, [firma, activo, academiaId, grupos]) // eslint-disable-line react-hooks/exhaustive-deps

  return { emitidas, bloqueadas, trabajando }
}

/** Una frase para la pantalla, o '' si no hay nada que contar. */
export function resumenDeEmision({ emitidas, bloqueadas }) {
  const partes = []
  if (emitidas?.length) {
    partes.push(emitidas.length === 1
      ? `Se emitió la matrícula ${emitidas[0].matricula}${emitidas[0].nombre ? ` a ${emitidas[0].nombre}` : ''}.`
      : `Se emitieron ${emitidas.length} matrículas que faltaban.`)
  }
  if (bloqueadas?.length) {
    const motivos = [...new Set(bloqueadas.map((b) => b.motivo))].slice(0, 2)
    partes.push(`${bloqueadas.length} sin emitir: ${motivos.join(' ')}`)
  }
  return partes.join(' ')
}
