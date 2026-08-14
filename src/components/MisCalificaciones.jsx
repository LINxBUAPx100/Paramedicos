import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { misCalificaciones, normalizarEvaluacion, APROBADO } from '../lib/calificacionesModelo.js'
import Icon from './Icon.jsx'

// ============================================================
//  Las calificaciones del ALUMNO en «Mi progreso» (Bloque S)
// ------------------------------------------------------------
//  Ve LAS SUYAS y nunca las de otro: la consulta filtra por su uid y la regla de
//  Firestore lo impone en el servidor. Aquí no hay nada que decidir sobre
//  privacidad; si esta consulta trajera notas de más, el problema estaría en la
//  regla, no en este componente.
//
//  Van aparte de los exámenes de la plataforma, que ya tienen su propia sección:
//  un examen de la app es repetible y estas notas las pone una persona.
//
//  Si no hay evaluaciones, NO se pinta nada. Una sección vacía titulada
//  «Calificaciones» hace que el alumno se pregunte si le falta algo por hacer.
// ============================================================
export default function MisCalificaciones() {
  const { user, academiaId } = useAuth()
  const [datos, setDatos] = useState(null)

  useEffect(() => {
    if (!user?.uid || !academiaId) return undefined
    let vivo = true
    ;(async () => {
      try {
        const api = await import('../lib/firebase/calificaciones.js')
        const [evs, mias] = await Promise.all([
          api.listarEvaluaciones(academiaId),
          api.misCalificacionesDe(user.uid, academiaId),
        ])
        if (!vivo) return
        setDatos(misCalificaciones(user.uid, evs.map(normalizarEvaluacion), mias))
      } catch {
        // Silencioso a propósito: si esto falla, el alumno sigue viendo su
        // progreso normal. Un error rojo aquí solo le preocuparía por algo que
        // no puede resolver.
        if (vivo) setDatos({ lista: [], promedio: null })
      }
    })()
    return () => { vivo = false }
  }, [user?.uid, academiaId])

  if (!datos || datos.lista.length === 0) return null

  const fechaTxt = (f) =>
    f?.seconds ? new Date(f.seconds * 1000).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' }) : ''

  return (
    <section className="progreso-examenes mis-calificaciones">
      <h2 className="seccion-titulo">
        <Icon name="examen" size={20} /> Calificaciones de tu academia
      </h2>
      <p className="panel-gestion-sub">
        Las evaluaciones que pone tu maestro (prácticas, exámenes presenciales). Son distintas de
        los exámenes de la plataforma, que puedes repetir.
      </p>

      {datos.promedio !== null && (
        <p className="mc-promedio">
          Tu promedio ponderado:{' '}
          <b className={datos.promedio >= APROBADO ? 'ok' : 'mal'}>{datos.promedio}%</b>
          {datos.pendientes > 0 && (
            <small> · {datos.pendientes} sin calificar todavía (no cuentan)</small>
          )}
        </p>
      )}

      <div className="examenes-lista">
        {datos.lista.map(({ evaluacion, valor, nota, aprobado }) => (
          <div key={evaluacion.id} className="examen-fila">
            <span className={`examen-pct ${valor === null ? '' : aprobado ? 'ok' : 'mal'}`}>
              {valor === null ? '—' : `${valor}%`}
            </span>
            <span>
              {evaluacion.titulo}
              {nota && <small className="mc-nota"> · {nota}</small>}
            </span>
            <span className="examen-fecha">
              {valor === null ? 'Sin calificar' : fechaTxt(evaluacion.fecha)}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
