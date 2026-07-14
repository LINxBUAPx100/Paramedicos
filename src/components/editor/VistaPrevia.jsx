import { useEffect, useRef } from 'react'
import Icon from '../Icon.jsx'
import { ensamblarFases, construirApi } from '../../lib/contenidoApi.js'

// Vista previa del temario TAL COMO LO VERÍA UN ALUMNO:
//  - solo contenido publicado (mismo filtro que la capa de acceso),
//  - de solo lectura: no toca progreso, ni intentos, ni calificaciones
//    (este componente no importa ninguno de esos módulos),
//  - con un aviso permanente de que es una vista previa.
export default function VistaPrevia({ abierto, curso, temasDocs = [], onCerrar }) {
  const refCerrar = useRef(null)
  const disparador = useRef(null)

  useEffect(() => {
    if (!abierto) return
    disparador.current = document.activeElement
    refCerrar.current?.focus()
    const alTeclear = (e) => { if (e.key === 'Escape') onCerrar?.() }
    document.addEventListener('keydown', alTeclear)
    return () => {
      document.removeEventListener('keydown', alTeclear)
      disparador.current?.focus?.()
    }
  }, [abierto, onCerrar])

  if (!abierto) return null

  const publicado = curso?.estado === 'publicado'
  const temasPorId = new Map(temasDocs.map((t) => [t.temaId, t]))
  const { fases } = ensamblarFases(curso?.estructura || [], temasPorId)
  const api = construirApi(fases)

  return (
    <div className="dialogo-fondo" onMouseDown={(e) => { if (e.target === e.currentTarget) onCerrar?.() }}>
      <div className="dialogo dialogo--previa" role="dialog" aria-modal="true" aria-labelledby="previa-titulo">
        <header className="previa-cabecera">
          <p className="previa-banda" role="status">
            <Icon name="ojo" size={16} /> Modo vista previa — así verá el temario un alumno.
            Nada de lo que hagas aquí registra progreso.
          </p>
          <div className="previa-fila">
            <h2 id="previa-titulo">{curso?.titulo || 'Curso'}</h2>
            <button type="button" ref={refCerrar} className="btn-pildora" onClick={onCerrar}>
              <Icon name="flechaIzq" size={16} /> Volver al editor
            </button>
          </div>
          {!publicado && (
            <p className="editor-aviso">
              Este curso aún no está publicado: los alumnos NO lo ven todavía.
              Esta vista muestra cómo se vería al publicarlo.
            </p>
          )}
        </header>
        <div className="previa-cuerpo">
          {api.fases.length === 0 && (
            <p className="editor-vacio">
              No hay contenido publicado. Publica al menos una fase con un módulo
              y un tema publicados para que el alumno vea algo.
            </p>
          )}
          <ol className="previa-fases">
            {api.fases.map((fase) => (
              <li key={fase.id}>
                <h3>Fase {fase.numero} · {fase.titulo}</h3>
                {fase.subtitulo && <p className="previa-sub">{fase.subtitulo}</p>}
                <ul className="previa-temas">
                  {fase.temas.map((tema) => (
                    <li key={tema.id}>
                      <span className="previa-tema-numero">{tema.numero}</span>
                      <div>
                        <p className="previa-tema-titulo">{tema.titulo}</p>
                        {tema.resumen && <p className="previa-tema-resumen">{tema.resumen}</p>}
                      </div>
                    </li>
                  ))}
                  {fase.temas.length === 0 && <li className="previa-tema-vacio">Sin temas publicados en esta fase.</li>}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}
