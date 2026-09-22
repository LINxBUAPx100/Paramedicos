import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon.jsx'
import { sinResultados } from '../../lib/staff/resolverAlumno.js'
import { textoDeError } from '../../lib/staff/avisos.js'
import BotonPersona from '../usuarios/BotonPersona.jsx'

// ============================================================
//  El buscador del mostrador
// ------------------------------------------------------------
//  ES LA PANTALLA ENTERA hasta que alguien aparece, y por eso se le dedican
//  cuatro decisiones que parecen pequeñas y no lo son:
//
//  1. **Nace enfocado.** Quien llega al mostrador teclea sin tocar el ratón. Y
//     es lo que hace que un escáner USB funcione el día que se compre: un
//     escáner escribe y pulsa Enter, así que si el foco ya está aquí, no hay
//     integración que hacer (trabajo O6 del plan).
//  2. **Se busca al enviar, no al teclear.** Buscar en cada tecla dispararía
//     una consulta por letra —y se paga por lectura—. Con Enter, además, el
//     escáner encaja solo.
//  3. **«No existe» NO es un error.** Es el caso normal cuando llega alguien
//     nuevo, y por eso la respuesta lleva dentro el botón de darlo de alta. Sin
//     él, recepción tendría que salir a otra pantalla, y eso con una persona
//     esperando delante se paga en minutos.
//  4. **Si hay varios, se eligen; si hay uno, se abre.** Nadie quiere pulsar
//     «seleccionar» en una lista de un solo elemento.
//
//  No sabe qué es una matrícula: eso lo decide `lib/staff/resolverAlumno.js`,
//  que es la costura preparada para cuando la numeración cambie.
// ============================================================
export default function BuscadorAlumno({ academiaId, onElegir, onAlta, autoFoco = true }) {
  const [texto, setTexto] = useState('')
  const [buscando, setBuscando] = useState(false)
  const [error, setError] = useState('')
  const [respuesta, setRespuesta] = useState(null) // { interpretacion, resultados }
  const campo = useRef(null)

  useEffect(() => { if (autoFoco) campo.current?.focus() }, [autoFoco])

  const buscar = async (e) => {
    e?.preventDefault()
    const consulta = texto.trim()
    if (!consulta) { campo.current?.focus(); return }
    setBuscando(true)
    setError('')
    setRespuesta(null)
    try {
      const { buscarAlumno } = await import('../../lib/firebase/staff/alumnos.js')
      const res = await buscarAlumno(consulta, { academiaId })
      setRespuesta(res)
      // Un solo resultado se abre directamente: es lo que quería quien buscó.
      if (res.resultados.length === 1) elegir(res.resultados[0])
    } catch (err) {
      setError(textoDeError(err, 'No se pudo buscar', 'usuarios'))
    } finally {
      setBuscando(false)
    }
  }

  const elegir = (persona) => {
    onElegir?.(persona)
    setTexto('')
    setRespuesta(null)
    // El foco vuelve al buscador: la siguiente persona llega enseguida.
    campo.current?.focus()
  }

  const vacio = respuesta && respuesta.resultados.length === 0
    ? sinResultados(respuesta.interpretacion)
    : null

  return (
    <section className="staff-buscador" aria-label="Buscar alumno">
      <form onSubmit={buscar} role="search">
        <label className="ui-campo staff-buscador-campo">
          <span>Matrícula, nombre, correo o teléfono</span>
          <div className="staff-buscador-fila">
            <input
              ref={campo}
              type="search"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe o escanea la credencial…"
              autoComplete="off"
              enterKeyHint="search"
              // El teclado numérico en tableta: lo que más se teclea aquí es
              // una matrícula. `inputMode` no impide escribir letras.
              inputMode="search"
              aria-describedby="staff-buscador-ayuda"
            />
            <button type="submit" className="btn btn--primario" disabled={buscando}>
              <Icon name="buscar" size={18} />
              {buscando ? 'Buscando…' : 'Buscar'}
            </button>
          </div>
        </label>
        <p className="staff-ayuda" id="staff-buscador-ayuda">
          Puedes teclear solo el número: <b>1</b> encuentra la matrícula completa de tu academia.
        </p>
      </form>

      {error && <p className="ui-nota-error" role="alert">{error}</p>}

      {respuesta?.interpretacion?.aviso && (
        <p className="staff-ayuda" aria-live="polite">{respuesta.interpretacion.aviso}</p>
      )}

      {respuesta && respuesta.resultados.length > 1 && (
        <div className="staff-resultados" aria-live="polite">
          <p className="staff-ayuda">{respuesta.resultados.length} coincidencias. Elige una:</p>
          <ul>
            {respuesta.resultados.map((p) => (
              <li key={p.uid || p.id}>
                <button type="button" className="staff-resultado" onClick={() => elegir(p)}>
                  <b><BotonPersona persona={p} /></b>
                  <span>{p.matricula || 'Sin matrícula'}</span>
                  <span>{p.email || '—'}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {vacio?.ofreceAlta && (
        <div className="staff-vacio" role="status">
          <Icon name="usuario" size={28} />
          <div>
            <h3>{vacio.titulo}</h3>
            <p>{vacio.texto}</p>
          </div>
          <button type="button" className="btn btn--primario" onClick={() => onAlta?.(respuesta.interpretacion)}>
            <Icon name="mas" size={18} />
            Dar de alta a esta persona
          </button>
        </div>
      )}
    </section>
  )
}
