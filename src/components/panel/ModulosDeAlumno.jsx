import { useState } from 'react'
import Icon from '../Icon.jsx'
import { avanceDeAlumno, modulosHasta } from '../../lib/avanceAlumno.js'

// ============================================================
//  Qué módulos ve UN alumno, y abrirle cualquiera
// ------------------------------------------------------------
//  El panel ya dejaba habilitar módulos, pero de UNA EN UNA y en orden: para
//  abrirle a alguien el módulo 5 había que abrirle antes el 3 y el 4, una
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

export default function ModulosDeAlumno({ alumno, modulos, modulosOcultosDelGrupo, ocupado, onDesbloquear, onBloquear, onAbrirHasta }) {
  const [error, setError] = useState('')
  const avance = avanceDeAlumno(alumno, modulos, modulosOcultosDelGrupo)

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
        <strong>Módulos de {alumno.nombre || alumno.email || alumno.id}</strong>
        <span className="fa-resumen">
          Ve {avance.visibles} de {avance.total}
          {avance.individuales > 0 && ` · ${avance.individuales} abiertas por ti`}
        </span>
      </div>

      {error && <p className="cuenta-error" role="alert">{error}</p>}

      <ul className="fa-lista">
        {avance.filas.map(({ modulo, estado, alternable, accion }) => (
          <li key={modulo.id} className={`fa-fila fa-fila--${estado}`}>
            <span className="fa-num" style={{ '--modulo-color': modulo.color }}>
              {String(modulo.numero ?? '').padStart(2, '0')}
            </span>
            <span className="fa-titulo">{modulo.titulo}</span>

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
                  accion === 'desbloquear' ? onDesbloquear(modulo) : onBloquear(modulo)
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
                title={`Abrir todos los módulos hasta ${modulo.titulo}`}
                onClick={() => correr(() => onAbrirHasta(
                  modulosHasta(modulos, modulo.id, {
                    modulosOcultosDelGrupo,
                    modulosDesbloqueados: alumno.modulosDesbloqueados || [],
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
        tenga oculto. Para abrirle un módulo a todo el grupo, usa la visibilidad del grupo.
      </p>
    </div>
  )
}
