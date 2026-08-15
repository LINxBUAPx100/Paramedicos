import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import {
  misCalificaciones, normalizarEvaluacion, estadoDeActividad, textoDePlazo, APROBADO,
} from '../lib/calificacionesModelo.js'
import { hrefSeguro } from '../lib/enlaceSeguro.js'
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

      {/* Cada actividad, no solo su nota: instrucciones, plazo y material. El
          maestro la crea para todo el grupo y la califica uno por uno, así que
          el alumno necesita saber QUÉ tiene que hacer y PARA CUÁNDO, no solo
          cuánto sacó cuando ya es tarde. */}
      <ul className="mc-actividades">
        {datos.lista.map(({ evaluacion, valor, nota, aprobado }) => {
          const est = estadoDeActividad(evaluacion, valor === null ? null : { valor })
          const plazo = textoDePlazo(est)
          const href = hrefSeguro(evaluacion.enlace)
          return (
            <li key={evaluacion.id} className={`mc-actividad mc-actividad--${est.estado}`}>
              <span className={`examen-pct ${valor === null ? '' : aprobado ? 'ok' : 'mal'}`}>
                {valor === null ? '—' : `${valor}%`}
              </span>
              <div className="mc-cuerpo">
                <strong>{evaluacion.titulo}</strong>
                {evaluacion.descripcion && <p className="mc-desc">{evaluacion.descripcion}</p>}
                {nota && <p className="mc-nota">Tu maestro anotó: {nota}</p>}
                {href && (
                  <a className="mc-enlace" href={href} target="_blank" rel="noopener noreferrer">
                    <Icon name="descarga" size={14} /> Ver el material
                  </a>
                )}
              </div>
              <span className={`mc-plazo mc-plazo--${est.estado}`}>
                {est.estado === 'calificada'
                  ? `Calificada${evaluacion.fecha ? ` · ${fechaTxt(evaluacion.fecha)}` : ''}`
                  : plazo}
              </span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
