import { useState } from 'react'
import Icon from '../Icon.jsx'
import { avanceDeAlumno, fasesHasta } from '../../lib/avanceAlumno.js'

// ============================================================
//  Qué fases ve UN alumno, y abrirle cualquiera
// ------------------------------------------------------------
//  El panel ya dejaba habilitar módulos, pero de UNA EN UNA y en orden: para
//  abrirle a alguien la fase 5 había que abrirle antes la 3 y la 4, una
//  pulsación cada una. Aquí están todas a la vez, con su estado.
//
//  Tres estados, y la diferencia importa:
//    · «Todo el grupo» — la ve porque su grupo la muestra. No se puede quitar a
//      una sola persona: el campo del alumno solo suma. Por eso no lleva
//      interruptor en vez de llevar uno que no hace nada.
//    · «Abierta a él» — su grupo la oculta y se la abrió su profesor.
//    · «Oculta» — su grupo la oculta y a él no se le ha abierto.
//
//  Y el atajo «Abrir hasta aquí», porque un maestro no piensa «desbloquea la 2,
//  la 3 y la 4» sino «que llegue hasta la 4».
// ============================================================

export default function FasesDeAlumno({ alumno, fases, fasesOcultasDelGrupo, ocupado, onDesbloquear, onBloquear, onAbrirHasta }) {
  const [error, setError] = useState('')
  const avance = avanceDeAlumno(alumno, fases, fasesOcultasDelGrupo)

  const correr = async (fn) => {
    setError('')
    try {
      await fn()
    } catch {
      setError('No se pudo cambiar el acceso (revisa permisos o conexión).')
    }
  }

  return (
    <div className="fa-panel">
      <div className="fa-cab">
        <strong>Fases de {alumno.nombre || alumno.email || alumno.id}</strong>
        <span className="fa-resumen">
          Ve {avance.visibles} de {avance.total}
          {avance.individuales > 0 && ` · ${avance.individuales} abiertas por ti`}
        </span>
      </div>

      {error && <p className="cuenta-error" role="alert">{error}</p>}

      <ul className="fa-lista">
        {avance.filas.map(({ fase, estado, alternable, accion }) => (
          <li key={fase.id} className={`fa-fila fa-fila--${estado}`}>
            <span className="fa-num" style={{ '--fase-color': fase.color }}>
              {String(fase.numero ?? '').padStart(2, '0')}
            </span>
            <span className="fa-titulo">{fase.titulo}</span>

            <span className={`fa-estado fa-estado--${estado}`}>
              {estado === 'grupo' && 'Todo el grupo'}
              {estado === 'individual' && 'Abierta a él'}
              {estado === 'oculta' && 'Oculta'}
            </span>

            {alternable ? (
              <button
                type="button"
                className={`btn btn--sm ${accion === 'desbloquear' ? 'btn--primario' : 'btn--fantasma'}`}
                disabled={ocupado}
                onClick={() => correr(() =>
                  accion === 'desbloquear' ? onDesbloquear(fase) : onBloquear(fase)
                )}
              >
                {accion === 'desbloquear' ? 'Abrir' : 'Quitar'}
              </button>
            ) : (
              // Sin interruptor a propósito: quitársela solo a esta persona no
              // se puede, y un botón que no hace nada confunde más que ayuda.
              <span className="fa-nada">—</span>
            )}

            {estado === 'oculta' && (
              <button
                type="button"
                className="btn btn--sm btn--suave"
                disabled={ocupado}
                title={`Abrir todas las fases hasta ${fase.titulo}`}
                onClick={() => correr(() => onAbrirHasta(
                  fasesHasta(fases, fase.id, {
                    fasesOcultasDelGrupo,
                    fasesDesbloqueadas: alumno.fasesDesbloqueadas || [],
                  })
                ))}
              >
                <Icon name="flecha" size={13} /> Hasta aquí
              </button>
            )}
          </li>
        ))}
      </ul>

      <p className="panel-nota">
        Lo que abras aquí es <strong>solo para esta persona</strong> y manda sobre lo que su grupo
        tenga oculto. Para abrirle una fase a todo el grupo, usa la visibilidad del grupo.
      </p>
    </div>
  )
}
