import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import {
  COMPRESIONES_MAX, COMPRESIONES_MIN, COMPRESIONES_POR_DEFECTO,
  fuenteDeRitmo, intervaloDe, ritmoValido, urlDeEmbed, urlDeSpotify,
} from '../lib/ritmoRCP.js'

// ============================================================
//  Ritmo de compresiones — música y metrónomo para la práctica de RCP
// ------------------------------------------------------------
//  DOS PIEZAS, Y LA SEGUNDA NO ES UN EXTRA:
//
//   · La PLAYLIST de Spotify, que es lo que se pidió y lo que engancha en una
//     sala llena de gente practicando.
//   · Un METRÓNOMO propio, porque el reproductor incrustado de Spotify solo
//     suena entero si quien mira ha iniciado sesión con Premium en ese
//     navegador; si no, da una vista previa de unos 30 segundos. Dos minutos de
//     compresiones con 30 segundos de música no es una práctica.
//
//  EL IFRAME NO SE CARGA HASTA QUE ALGUIEN LO PIDE, y eso es deliberado: montar
//  el reproductor de un tercero en cuanto se abre la lección metería sus
//  cookies en el navegador de todos los alumnos que pasen por el tema, lo
//  escuchen o no. Aquí hay un botón, y hasta que no se pulsa no se contacta con
//  Spotify. El metrónomo, mientras tanto, funciona sin red y sin terceros.
//
//  EL SONIDO SE GENERA CON WebAudio, no con un archivo: un clic de metrónomo son
//  cuatro líneas de oscilador y así no hay un audio que descargar, ni que
//  versionar, ni que falle por una ruta.
// ============================================================
export default function RitmoRCP({
  enlaceActividad = '',
  enlaceAcademia = '',
  titulo = 'Ritmo de compresiones',
  nota = '',
}) {
  const fuente = fuenteDeRitmo({ actividad: enlaceActividad, academia: enlaceAcademia })
  const [cargarReproductor, setCargarReproductor] = useState(false)
  const [ritmo, setRitmo] = useState(COMPRESIONES_POR_DEFECTO)
  const [sonando, setSonando] = useState(false)
  const audioRef = useRef(null)
  const temporizador = useRef(null)

  const clic = useCallback(() => {
    try {
      if (!audioRef.current) {
        const Ctx = window.AudioContext || window.webkitAudioContext
        if (!Ctx) return
        audioRef.current = new Ctx()
      }
      const ctx = audioRef.current
      const osc = ctx.createOscillator()
      const vol = ctx.createGain()
      // Un pitido corto y seco: tiene que oírse por encima de la música sin
      // taparla, y no debe cansar en dos minutos seguidos.
      osc.frequency.value = 1000
      vol.gain.setValueAtTime(0.25, ctx.currentTime)
      vol.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05)
      osc.connect(vol).connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    } catch { /* sin audio disponible, el número en pantalla sigue sirviendo */ }
  }, [])

  // El metrónomo. `setInterval` y no un bucle de `requestAnimationFrame` porque
  // esto tiene que seguir sonando con la pestaña en segundo plano: quien
  // practica deja el móvil en el suelo, al lado del maniquí.
  useEffect(() => {
    if (!sonando) return undefined
    clic()
    temporizador.current = setInterval(clic, intervaloDe(ritmo))
    return () => clearInterval(temporizador.current)
  }, [sonando, ritmo, clic])

  // Al salir de la pantalla no se puede quedar un oscilador vivo.
  useEffect(() => () => {
    clearInterval(temporizador.current)
    try { audioRef.current?.close() } catch { /* ya estaba cerrado */ }
  }, [])

  const embed = urlDeEmbed(fuente)
  const enlace = urlDeSpotify(fuente)

  return (
    <section className="ritmo-rcp" aria-labelledby="ritmo-rcp-t">
      <h3 id="ritmo-rcp-t" className="seccion-titulo">
        <Icon name="corazon" size={20} /> {titulo}
      </h3>
      <p className="ritmo-ayuda">
        Las compresiones van entre <b>{COMPRESIONES_MIN} y {COMPRESIONES_MAX} por minuto</b>. La
        música ayuda a sostener el ritmo; el metrónomo lo marca exacto y funciona sin conexión.
        {nota ? ` ${nota}` : ''}
      </p>

      {/* --- METRÓNOMO: primero, porque es el que siempre funciona --- */}
      <div className="ritmo-metronomo">
        <button
          type="button"
          className={`btn ${sonando ? 'btn--exito' : 'btn--primario'}`}
          onClick={() => setSonando((s) => !s)}
          aria-pressed={sonando}
        >
          <Icon name={sonando ? 'check' : 'chispa'} size={18} />
          {sonando ? 'Metrónomo sonando' : 'Marcar el ritmo'}
        </button>
        <label className="ritmo-slider">
          <span>{ritmo} compresiones/min</span>
          <input
            type="range"
            min={COMPRESIONES_MIN}
            max={COMPRESIONES_MAX}
            step="1"
            value={ritmo}
            onChange={(e) => setRitmo(ritmoValido(e.target.value))}
            aria-label="Compresiones por minuto"
          />
        </label>
      </div>

      {/* --- LA MÚSICA: solo si se pide --- */}
      {embed ? (
        cargarReproductor ? (
          <iframe
            className="ritmo-spotify"
            src={embed}
            title="Lista de reproducción para el ritmo de compresiones"
            width="100%"
            height="352"
            frameBorder="0"
            loading="lazy"
            referrerPolicy="no-referrer"
            allow="clipboard-write; encrypted-media; picture-in-picture"
          />
        ) : (
          <div className="ritmo-cargar">
            <button type="button" className="btn btn--suave" onClick={() => setCargarReproductor(true)}>
              <Icon name="compartir" size={17} /> Cargar la lista de Spotify
            </button>
            <p className="ritmo-ayuda">
              Se abre aquí dentro. Hasta que lo pulses no se contacta con Spotify, para no dejar sus
              cookies en el navegador de quien solo viene a leer. Sin una cuenta Premium iniciada,
              Spotify reproduce una vista previa corta: para la práctica completa, usa el metrónomo
              o abre la lista en su aplicación.
            </p>
          </div>
        )
      ) : (
        <p className="ritmo-ayuda">
          Todavía no hay música configurada, así que queda el metrónomo, que hace el mismo
          trabajo. Para añadirla: quien prepara la práctica pega ahí su enlace de Spotify, o se
          configura para toda la academia en <code>src/lib/ritmoRCP.js</code>.
        </p>
      )}

      {enlace && (
        <p className="ritmo-ayuda">
          <a href={enlace} target="_blank" rel="noopener noreferrer">Abrir la lista en Spotify</a>
        </p>
      )}
    </section>
  )
}
