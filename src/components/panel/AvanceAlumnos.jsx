import { useState } from 'react'
import { APROBADO } from '../../lib/panelModelo.js'
import FasesDeAlumno from './FasesDeAlumno.jsx'

// ============================================================
//  Avance por alumno y por fase + habilitar/retroceder módulos
// ------------------------------------------------------------
//  Cada celda es la MEJOR calificación del examen de esa fase y el nº de
//  intentos. La última columna decide qué módulo se le habilita a un alumno
//  por encima de lo que su grupo oculta, y también cómo retirárselo.
// ============================================================

export default function AvanceAlumnos({
  alumnos, grupos, fases, porAlumno, intentos, grupoFiltro, nombreGrupo,
  academiaId, puedeVerCodigos, onCambio,
}) {
  const [alumnoAbierto, setAlumnoAbierto] = useState(null)
  const [desbloqueando, setDesbloqueando] = useState(null) // uid en proceso
  const [error, setError] = useState('')

  const fechaTxt = (seg) => (seg ? new Date(seg * 1000).toLocaleDateString('es-MX') : '')

  // Siguiente módulo POR HABILITAR a un alumno: la primera fase que su grupo
  // tiene oculta y que aún no se le ha desbloqueado individualmente.
  const siguientePorHabilitar = (al) => {
    const ocultasDelGrupo = grupos.find((g) => g.id === al.grupoId)?.fasesOcultas || []
    const yaDesbloqueadas = al.fasesDesbloqueadas || []
    return fases.find((f) => ocultasDelGrupo.includes(f.id) && !yaDesbloqueadas.includes(f.id)) || null
  }

  // Última fase habilitada INDIVIDUALMENTE (y que el grupo aún oculta): es la
  // que se puede retroceder. Las fases que el grupo ya muestra no se tocan aquí.
  const ultimaHabilitada = (al) => {
    const ocultasDelGrupo = grupos.find((g) => g.id === al.grupoId)?.fasesOcultas || []
    const yaDesbloqueadas = al.fasesDesbloqueadas || []
    return (
      [...fases]
        .reverse()
        .find((f) => yaDesbloqueadas.includes(f.id) && ocultasDelGrupo.includes(f.id)) || null
    )
  }

  const correr = async (uid, accion, mensaje) => {
    setDesbloqueando(uid)
    setError('')
    try {
      await accion()
      onCambio()
    } catch {
      setError(mensaje)
    } finally {
      setDesbloqueando(null)
    }
  }

  const habilitarFase = (uid, f) =>
    correr(uid, async () => {
      const { desbloquearFase } = await import('../../lib/firebase/solicitudes.js')
      await desbloquearFase(uid, f.id)
    }, 'No se pudo habilitar el módulo (revisa permisos o conexión).')

  const retrocederFase = (uid, f) =>
    correr(uid, async () => {
      const { bloquearFase } = await import('../../lib/firebase/solicitudes.js')
      await bloquearFase(uid, f.id)
    }, 'No se pudo retroceder el módulo (revisa permisos o conexión).')

  if (alumnos.length === 0) {
    return (
      <p className="panel-vacio">
        {puedeVerCodigos ? (
          <>
            Aún no hay alumnos en esta academia. Compárteles el código
            <strong> {academiaId} </strong>
            para que se unan desde su cuenta.
          </>
        ) : (
          'Aún no hay alumnos en esta academia. Pide a tu director el código para compartirlo.'
        )}
      </p>
    )
  }

  return (
    <>
      {error && <p className="cuenta-error" role="alert">{error}</p>}

      <div className="panel-tabla-wrap">
        <table className="panel-tabla">
          <thead>
            <tr>
              <th scope="col">Alumno</th>
              {fases.map((f) => (
                <th key={f.id} scope="col">
                  <abbr title={f.titulo}>F{f.numero}</abbr>
                  <span className="sr-only">: {f.titulo}</span>
                </th>
              ))}
              <th scope="col">
                Módulos
                <span className="sr-only"> (habilitar el siguiente módulo que su grupo tiene oculto)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((al) => {
              const porFase = porAlumno[al.id] || {}
              const abierto = alumnoAbierto === al.id
              return (
                <tr key={al.id} className={abierto ? 'abierto' : ''}>
                  <th scope="row" className="panel-alumno">
                    <button
                      type="button"
                      className="panel-alumno-abrir"
                      aria-expanded={abierto}
                      aria-controls="panel-detalle-alumno"
                      onClick={() => setAlumnoAbierto(abierto ? null : al.id)}
                    >
                      {al.nombre || al.email || al.id}
                      <span className="sr-only">
                        {abierto ? ' — cerrar su historial' : ' — abrir su historial de intentos'}
                      </span>
                    </button>
                    {al.grupoId && !grupoFiltro && (
                      <span className="panel-tag-grupo">{nombreGrupo(al.grupoId)}</span>
                    )}
                    {al.estado !== 'activo' && <span className="panel-tag-suspendido">suspendido</span>}
                  </th>
                  {fases.map((f) => {
                    const c = porFase[f.id]
                    if (!c) return <td key={f.id} className="panel-celda-vacia">—</td>
                    const nivel = c.mejor >= APROBADO ? 'ok' : 'mal'
                    return (
                      <td key={f.id} className={`panel-celda ${nivel}`} title={`Último intento: ${fechaTxt(c.ultimo)}`}>
                        <b>{c.mejor}%</b>
                        <small>×{c.n}</small>
                      </td>
                    )
                  })}
                  <td className="panel-celda-habilitar">
                    {(() => {
                      const sig = siguientePorHabilitar(al)
                      const ult = ultimaHabilitada(al)
                      if (!sig && !ult) {
                        return (
                          <span className="panel-celda-vacia" title="Ya ve todos los módulos disponibles">—</span>
                        )
                      }
                      return (
                        <span className="panel-modulos-botones">
                          {sig && (
                            <button
                              type="button"
                              className="panel-habilitar-btn"
                              disabled={desbloqueando === al.id}
                              title={`Habilitarle la Fase ${sig.numero} · ${sig.titulo}`}
                              aria-label={`Habilitar la Fase ${sig.numero} (${sig.titulo}) a ${al.nombre || al.email}`}
                              onClick={() => habilitarFase(al.id, sig)}
                            >
                              {desbloqueando === al.id ? '…' : `Habilitar F${sig.numero}`}
                            </button>
                          )}
                          {ult && (
                            <button
                              type="button"
                              className="panel-retroceder-btn"
                              disabled={desbloqueando === al.id}
                              title={`Retroceder: volver a ocultarle la Fase ${ult.numero} · ${ult.titulo}`}
                              aria-label={`Volver a ocultar la Fase ${ult.numero} (${ult.titulo}) a ${al.nombre || al.email}`}
                              onClick={() => retrocederFase(al.id, ult)}
                            >
                              {desbloqueando === al.id ? '…' : `Ocultar F${ult.numero}`}
                            </button>
                          )}
                        </span>
                      )
                    })()}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {alumnoAbierto && (
        <>
          {/* Las fases de ESA persona, todas a la vez. Antes solo se podía
              habilitar la siguiente, así que llevar a alguien hasta la fase 5
              costaba tres pulsaciones en orden. */}
          {(() => {
            const al = alumnos.find((a) => a.id === alumnoAbierto)
            if (!al) return null
            const ocultasDelGrupo = grupos.find((g) => g.id === al.grupoId)?.fasesOcultas || []
            return (
              <FasesDeAlumno
                alumno={al}
                fases={fases}
                fasesOcultasDelGrupo={ocultasDelGrupo}
                ocupado={desbloqueando === al.id}
                onDesbloquear={(f) => habilitarFase(al.id, f)}
                onBloquear={(f) => retrocederFase(al.id, f)}
                onAbrirHasta={(ids) => correr(al.id, async () => {
                  const { desbloquearFase } = await import('../../lib/firebase/solicitudes.js')
                  // Una por una: `arrayUnion` es idempotente, así que reintentar
                  // no duplica nada si alguna falla a mitad.
                  for (const id of ids) await desbloquearFase(al.id, id)
                }, 'No se pudieron abrir los módulos (revisa permisos o conexión).')}
              />
            )
          })()}

          <DetalleAlumno
            alumno={alumnos.find((a) => a.id === alumnoAbierto)}
            intentos={intentos.filter((i) => i.uid === alumnoAbierto)}
            onCerrar={() => setAlumnoAbierto(null)}
          />
        </>
      )}

      <p className="panel-nota">
        Cada celda muestra la <strong>mejor calificación</strong> del examen de fase y el número de
        intentos (×n). Toca un alumno para ver su historial completo.
      </p>
    </>
  )
}

// Historial completo de intentos de un alumno.
export function DetalleAlumno({ alumno, intentos, onCerrar }) {
  if (!alumno) return null
  const fechaTxt = (f) =>
    f?.seconds ? new Date(f.seconds * 1000).toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }) : '—'
  return (
    <section id="panel-detalle-alumno" className="panel-detalle" aria-label={`Historial de ${alumno.nombre || alumno.email}`}>
      <header>
        <h2>{alumno.nombre || alumno.email}</h2>
        <button className="btn btn--suave" onClick={onCerrar}>Cerrar</button>
      </header>
      {intentos.length === 0 ? (
        <p className="panel-vacio">Este alumno aún no presenta ningún examen de fase.</p>
      ) : (
        <ul className="panel-intentos">
          {intentos.map((it) => (
            <li key={it.id} className={it.porcentaje >= APROBADO ? 'ok' : 'mal'}>
              <span className="pi-fase">Fase {it.faseNumero}</span>
              <span className="pi-titulo">{it.faseTitulo}</span>
              <span className="pi-nota">{it.aciertos}/{it.total} · <b>{it.porcentaje}%</b></span>
              <span className="pi-fecha">{fechaTxt(it.fecha)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
