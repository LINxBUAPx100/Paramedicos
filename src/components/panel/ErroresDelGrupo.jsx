import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { resumenErroresGrupo, REPETICIONES_PATRON } from '../../lib/rutaFarmacos.js'

// Errores de cálculo del grupo (PTEM Pulso, vista del profesor). Dice qué
// conviene reforzar en clase: cuántos alumnos repiten cada tipo de error del
// entrenador de farmacología y quiénes. Solo cuentas: ni respuestas ni notas.
//
// Aparece solo si la academia tiene el entrenador en su plan. `alumnos` son
// los del grupo (o de la academia) que el panel ya tiene filtrados.
export default function ErroresDelGrupo({ academiaId, grupoId = null, alumnos = [] }) {
  const { capacidades, esSuperadmin } = useAuth()
  const conEntrenador = esSuperadmin || Boolean(capacidades?.entrenadorFarmacologia)
  const [estado, setEstado] = useState({ fase: 'cargando', docs: [] })
  const [abierto, setAbierto] = useState(null)

  useEffect(() => {
    if (!conEntrenador || !academiaId) return undefined
    let vivo = true
    setEstado({ fase: 'cargando', docs: [] })
    import('../../lib/firebase/erroresCalculo.js')
      .then((m) => m.erroresDeGrupo({ academiaId, grupoId }))
      .then((docs) => { if (vivo) setEstado({ fase: 'listo', docs }) })
      .catch(() => { if (vivo) setEstado({ fase: 'error', docs: [] }) })
    return () => { vivo = false }
  }, [conEntrenador, academiaId, grupoId])

  if (!conEntrenador) return null
  const r = resumenErroresGrupo(estado.docs, alumnos)
  const max = Math.max(1, ...r.porTipo.map((t) => t.alumnos))

  return (
    <section className="ui-panel pl-errores-grupo" aria-labelledby="pl-errores-grupo-titulo">
      <h2 id="pl-errores-grupo-titulo">Cálculo farmacológico: errores del grupo</h2>
      {estado.fase === 'cargando' && <p role="status">Cargando…</p>}
      {estado.fase === 'error' && (
        <p className="ui-estado" role="alert">No se pudieron cargar los errores del grupo. Si es la primera vez, puede que la regla de Firestore de esta vista aún no esté publicada.</p>
      )}
      {estado.fase === 'listo' && (r.porTipo.length === 0 ? (
        <p className="ui-estado">
          Todavía no hay errores registrados. Aparecen cuando tus alumnos resuelven cálculos o casos en el entrenador
          ({r.conDatos} de {r.total} con actividad).
        </p>
      ) : (
        <>
          <p className="pl-nota-pie">
            Alumnos que repitieron cada error al menos {REPETICIONES_PATRON} veces · {r.conDatos} de {r.total} alumnos con actividad en el entrenador.
          </p>
          <ul className="pl-errores-lista">
            {r.porTipo.map((t) => (
              <li key={t.tipo}>
                <button type="button" className="pl-errores-fila" aria-expanded={abierto === t.tipo} onClick={() => setAbierto(abierto === t.tipo ? null : t.tipo)}>
                  <span>{t.nombre}</span>
                  <span className="pl-errores-barra" aria-hidden="true"><i style={{ width: `${(t.alumnos / max) * 100}%` }} /></span>
                  <span className="pl-errores-cifra">{t.alumnos} {t.alumnos === 1 ? 'alumno' : 'alumnos'}</span>
                </button>
                {abierto === t.tipo && (
                  <ul className="pl-errores-quienes">
                    {t.quienes.length
                      ? t.quienes.map((q) => <li key={q.uid}>{q.nombre} <span>{q.n} veces</span></li>)
                      : <li>Nadie lo repite todavía ({t.total} en total, sueltos).</li>}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          {r.sugerencia && (
            <p className="pl-errores-sugerencia">
              <b>Para la clase:</b> {r.sugerencia.alumnos} de {r.conDatos} alumnos con actividad repiten «{r.sugerencia.nombre.toLowerCase()}».
              Conviene un repaso de ese paso antes del siguiente examen; en el entrenador lo practican en «Aprende a calcular».
            </p>
          )}
        </>
      ))}
    </section>
  )
}
