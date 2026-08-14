import { useState } from 'react'
import Icon from '../Icon.jsx'
import {
  ACCIONES_ACADEMIA, DESTINO_BORRAR, DESTINO_SIN_ACADEMIA,
  destinosDeUsuarios, reparto, describirDestino, puedeAvanzar,
  validarConfirmacion, exigeConfirmacionEscrita,
} from '../../lib/borradoAcademia.js'

// ============================================================
//  Asistente de baja de una academia — DOS PASOS
// ------------------------------------------------------------
//  Paso 1: qué pasa con las PERSONAS. Paso 2: qué pasa con la academia.
//
//  En ese orden a propósito: al revés obligaría a decidir lo irreversible
//  antes de saber a quién afecta. Aquí primero se ve cuánta gente hay dentro y
//  a dónde va, y solo después se elige entre borrar, archivar o suspender.
//
//  Toda la lógica —destinos, textos, si se puede avanzar, si hace falta escribir
//  el código— está en lib/borradoAcademia.js, que es puro y está probado.
// ============================================================

export default function BajaAcademia({ academia, academias, usuarios, ocupado, progreso, onCerrar, onConfirmar }) {
  const [paso, setPaso] = useState(1)
  const [destino, setDestino] = useState('')
  const [accion, setAccion] = useState('archivar')
  const [escrito, setEscrito] = useState('')

  const gente = reparto(usuarios, academia.id)
  const destinos = destinosDeUsuarios(academias, academia.id)
  const listo = puedeAvanzar(destino, gente.total)
  const pideCodigo = exigeConfirmacionEscrita(accion)
  const codigoOk = !pideCodigo || validarConfirmacion(escrito, academia.id)

  return (
    <div className="rp-dialogo-fondo" onMouseDown={(e) => { if (e.target === e.currentTarget && !ocupado) onCerrar() }}>
      <div className="rp-dialogo ba-dialogo" role="dialog" aria-modal="true" aria-labelledby="ba-titulo">
        <div className="rp-dialogo-cab">
          <h2 id="ba-titulo">
            Dar de baja «{academia.nombre || academia.id}»
            <small className="ba-paso">Paso {paso} de 2</small>
          </h2>
          <button className="rp-cerrar" onClick={onCerrar} disabled={ocupado} aria-label="Cerrar">✕</button>
        </div>

        {paso === 1 && (
          <>
            <h3 className="ba-pregunta">¿Qué quieres hacer con los usuarios?</h3>
            <p className="ba-cuenta">
              Esta academia tiene <strong>{gente.total}</strong>{' '}
              {gente.total === 1 ? 'persona' : 'personas'}
              {gente.total > 0 && <> — {gente.alumnos} alumnos y {gente.staff} del personal</>}.
            </p>

            {gente.total === 0 ? (
              <p className="cuenta-aviso">No hay nadie dentro: no hay nada que reubicar.</p>
            ) : (
              <div className="ba-opciones">
                {/* Borrar a la izquierda, en rojo y separado: es la única
                    opción de las dos que no se deshace. */}
                <button
                  type="button"
                  className={`btn btn--peligro ${destino === DESTINO_BORRAR ? 'ba-elegido' : ''}`}
                  aria-pressed={destino === DESTINO_BORRAR}
                  disabled={ocupado}
                  onClick={() => setDestino(DESTINO_BORRAR)}
                >
                  <Icon name="basura" size={16} /> Borrar a las {gente.total} personas
                </button>

                {/* Conservarlas, a la derecha, eligiendo a dónde van. */}
                <label className="panel-selector ba-destino">
                  Conservarlas y moverlas a…
                  <select
                    value={destino === DESTINO_BORRAR ? '' : destino}
                    disabled={ocupado}
                    onChange={(e) => setDestino(e.target.value)}
                  >
                    <option value="">Elige un destino…</option>
                    {destinos.map((d) => (
                      <option key={d.id} value={d.id}>{d.etiqueta}</option>
                    ))}
                  </select>
                </label>
              </div>
            )}

            {destino && (
              <p className={`ba-consecuencia ${destino === DESTINO_BORRAR ? 'mal' : ''}`}>
                <Icon name={destino === DESTINO_BORRAR ? 'alerta' : 'check'} size={15} />
                {describirDestino(destino, gente.total, academias)}
              </p>
            )}

            <div className="rp-dialogo-botones">
              <button className="btn btn--primario" disabled={!listo || ocupado} onClick={() => setPaso(2)}>
                Continuar
              </button>
              <button className="btn btn--suave" onClick={onCerrar} disabled={ocupado}>Cancelar</button>
            </div>
          </>
        )}

        {paso === 2 && (
          <>
            <h3 className="ba-pregunta">¿Y qué hacemos con la academia?</h3>
            <p className="ba-cuenta">
              {gente.total > 0
                ? describirDestino(destino, gente.total, academias)
                : 'Sin personas dentro.'}
            </p>

            <div className="ba-acciones">
              {Object.entries(ACCIONES_ACADEMIA).map(([id, a]) => (
                <label key={id} className={`ba-accion ba-accion--${a.tono} ${accion === id ? 'elegida' : ''}`}>
                  <input
                    type="radio" name="accion-academia" value={id}
                    checked={accion === id} disabled={ocupado}
                    onChange={() => { setAccion(id); setEscrito('') }}
                  />
                  <span>
                    <strong>{a.etiqueta}</strong>
                    <small>{a.descripcion}</small>
                  </span>
                </label>
              ))}
            </div>

            {pideCodigo && (
              <label className="ba-confirmar">
                Para confirmar, escribe el código de la academia: <code>{academia.id}</code>
                <input
                  type="text" value={escrito} disabled={ocupado} autoFocus
                  onChange={(e) => setEscrito(e.target.value)}
                  placeholder={academia.id}
                />
              </label>
            )}

            {progreso && (
              <p className="ba-progreso" role="status">
                Borrando: {progreso.paso} ({progreso.hechas}/{progreso.total})…
              </p>
            )}

            <div className="rp-dialogo-botones">
              <button
                className={`btn ${accion === 'borrar' ? 'btn--peligro' : 'btn--primario'}`}
                disabled={!codigoOk || ocupado}
                onClick={() => onConfirmar({ accion, destinoUsuarios: destino || DESTINO_SIN_ACADEMIA })}
              >
                {ocupado ? 'Trabajando…' : ACCIONES_ACADEMIA[accion].etiqueta}
              </button>
              <button className="btn btn--suave" onClick={() => setPaso(1)} disabled={ocupado}>
                ← Volver
              </button>
              <button className="btn btn--fantasma" onClick={onCerrar} disabled={ocupado}>Cancelar</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
