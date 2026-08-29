import { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  useApiContenido, usePreguntasDeModulo, CargandoContenido, ErrorContenido,
} from '../context/ContenidoContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { useVisibilidad } from '../lib/useVisibilidad.js'
import Quiz from '../components/Quiz.jsx'
import Icon from '../components/Icon.jsx'
import NotFound from './NotFound.jsx'
import { nuevaSemilla } from '../lib/azar.js'
import { seleccionarPreguntas, temasCubiertos } from '../lib/examenModelo.js'

// --- Semilla del intento en curso -------------------------------------------
// El examen de módulo es el único que se GUARDA (lo ve el maestro), así que es el
// único donde refrescar la página no puede ser una tirada de dados nueva: con
// un subconjunto del banco, recargar hasta que salgan las preguntas cómodas
// sería trivial. La semilla vive en sessionStorage —una por módulo— y solo la
// renueva "Otro intento", que es lo que de verdad es un intento nuevo.
//
// sessionStorage y no localStorage a propósito: al cerrar la pestaña el examen
// a medias se da por abandonado. Y si el navegador lo tiene bloqueado, se cae a
// una semilla en memoria: se pierde la reproducibilidad al refrescar, nunca el
// examen.
const ssClave = (moduloId) => `ptem-examen-semilla__${moduloId}`

function leerSemilla(moduloId) {
  try { return sessionStorage.getItem(ssClave(moduloId)) || '' } catch { return '' }
}
function guardarSemilla(moduloId, semilla) {
  try { sessionStorage.setItem(ssClave(moduloId), semilla) } catch { /* no disponible */ }
}

export default function ExamenModuloPage() {
  const { moduloId } = useParams()
  const { api } = useApiContenido()
  const modulo = api?.getModulo(moduloId)
  const { preguntas: delModulo, cargando, error, reintentar } = usePreguntasDeModulo(moduloId)
  const { user, perfil, academiaId } = useAuth()
  const { moduloVisible, temaVisible } = useVisibilidad()

  const [iniciado, setIniciado] = useState(false)
  const [guardado, setGuardado] = useState(null) // { ok, pct } | { ok: false }
  const [fin, setFin] = useState(null) // { pct } → pantalla de felicitaciones
  // Semilla del intento: se recupera de la sesión (refrescar = mismo examen) y
  // solo nace una nueva si no había ninguna.
  const [semilla, setSemilla] = useState(() => {
    const guardada = leerSemilla(moduloId)
    if (guardada) return guardada
    const nueva = nuevaSemilla(moduloId)
    guardarSemilla(moduloId, nueva)
    return nueva
  })

  // Banco disponible: las preguntas del módulo, menos las de temas ocultos
  // para el grupo del alumno.
  const banco = useMemo(
    () => delModulo.filter((q) => temaVisible(q.temaId)),
    [delModulo, temaVisible]
  )
  // El examen: un SUBCONJUNTO repartido por tema, reproducible desde la semilla.
  const preguntas = useMemo(
    () => seleccionarPreguntas(banco, { semilla }),
    [banco, semilla]
  )

  if (error) return <ErrorContenido onReintentar={reintentar} />
  if (cargando) return <CargandoContenido />
  if (!modulo) return <NotFound />

  // Módulo (módulo) oculta para el grupo del alumno: examen no disponible.
  if (!moduloVisible(modulo.id)) {
    return (
      <div className="acceso-restringido" role="alert">
        <span className="acceso-ico"><Icon name="candado" size={30} /></span>
        <h1>Examen no disponible</h1>
        <p>Tu profesor todavía no libera este módulo para tu grupo. Vuelve más adelante.</p>
        <Link to="/examen" className="btn btn--pildora btn--carbon">Volver a exámenes</Link>
      </div>
    )
  }

  const onComplete = async (aciertos, total) => {
    const pctLocal = total ? Math.round((aciertos / total) * 100) : 0
    setFin({ pct: pctLocal })
    try {
      const { guardarIntentoModulo } = await import('../lib/firebase/intentos.js')
      const pct = await guardarIntentoModulo({
        uid: user.uid,
        nombre: perfil?.nombre || user.displayName || '',
        academiaId,
        modulo,
        aciertos,
        total,
        // Con la semilla y el banco del módulo se regenera el examen EXACTO que
        // vio este alumno. Sin ella, un intento es un número suelto y una
        // reclamación de nota no se puede resolver.
        semilla,
      })
      setGuardado({ ok: true, pct })
    } catch {
      setGuardado({ ok: false })
    }
  }

  // Un intento nuevo es una semilla nueva: otras preguntas y otro orden.
  const otroIntento = () => {
    setGuardado(null)
    setFin(null)
    const nueva = nuevaSemilla(moduloId)
    guardarSemilla(moduloId, nueva)
    setSemilla(nueva)
  }

  return (
    <div className="examen-page" style={{ '--modulo-color': modulo.color }}>
      <nav className="migas">
        <Link to={`/modulo/${modulo.id}`}>Modulo {modulo.numero}</Link> <span>/</span> Examen de módulo
      </nav>

      {!iniciado ? (
        <div className="examen-modulo-intro">
          <span className="examen-hero-ico"><Icon name="examen" size={46} /></span>
          <h1>Examen del Módulo {modulo.numero}</h1>
          <p className="examen-modulo-nombre">{modulo.titulo}</p>
          <p>
            {preguntas.length} preguntas escogidas de las {banco.length} de este módulo, repartidas
            entre sus {temasCubiertos(preguntas)} temas. Al terminar, tu resultado se guarda como
            intento (fecha, puntaje y % de acierto) para que tú y tu maestro puedan seguir tu avance.
          </p>
          {/* Decirlo de frente tiene dos efectos y los dos interesan: quita la
              idea de que copiarle al de al lado sirva, y avisa de que estudiar
              media modulo no basta porque van a caer preguntas de todos sus temas. */}
          <p className="examen-modulo-aviso">
            <Icon name="candado" size={15} /> Cada alumno recibe una selección distinta, y
            recargar la página no la cambia.
          </p>
          <p className="examen-nota-autoeval">
            Es una <strong>autoevaluación</strong> para saber qué repasar, no una calificación
            oficial.
          </p>
          <button className="btn btn--primario btn--lg" onClick={() => setIniciado(true)}>
            Comenzar ({preguntas.length} preguntas)
          </button>
          <Link to={`/modulo/${modulo.id}`} className="link-discreto"><Icon name="chevronIzq" size={15} /> Volver al módulo</Link>
        </div>
      ) : (
        <>
          <header className="quiz-page-header">
            <h1>
              <span className="quiz-page-ico"><Icon name="examen" size={24} /></span>
              Examen · Modulo {modulo.numero}
            </h1>
            <p>{modulo.titulo}</p>
          </header>

          {guardado && (
            <div className={`examen-modulo-guardado ${guardado.ok ? 'ok' : 'error'}`} role="status">
              {guardado.ok
                ? `Intento guardado (${guardado.pct}%). Tu maestro podrá verlo en tu avance.`
                : 'No se pudo guardar el intento (revisa tu conexión). Tu resultado sigue abajo.'}
            </div>
          )}

          <Quiz
            key={semilla}
            preguntas={preguntas}
            titulo={`Módulo ${modulo.numero}`}
            onComplete={onComplete}
            semilla={semilla}
            onReintentar={otroIntento}
          />

          <div className="quiz-page-pie">
            <button type="button" className="btn btn--suave" onClick={otroIntento}>
              Otro intento
            </button>
            <Link to={`/modulo/${modulo.id}`} className="btn btn--suave">
              <Icon name="chevronIzq" size={15} /> Volver al módulo
            </Link>
          </div>

          {fin && <ModuloCompletado modulo={modulo} modulos={api.modulos} pct={fin.pct} onCerrar={() => setFin(null)} />}
        </>
      )}
    </div>
  )
}

// Mensaje según la CALIFICACIÓN del módulo (60% examen + 40% actividades de los
// temas). Reconocimiento + diagnóstico + siguiente acción: corrige sin humillar
// y motiva sin exagerar (sin emojis ni afirmaciones que la nota no demuestra).
function mensajeDeNota(n, nombre) {
  const nota = Math.max(0, Math.min(100, Number(n) || 0))
  const saludo = nombre ? `${nombre}, ` : ''
  if (nota >= 95) return {
    icono: 'medalla',
    tono: 'sobresaliente',
    titulo: `${saludo}dominas este módulo`,
    texto: 'Tu resultado demuestra un dominio sobresaliente de los contenidos. Revisa tus respuestas para consolidar los últimos detalles y continúa con el siguiente módulo.',
  }
  if (nota >= 90) return {
    icono: 'trofeo',
    tono: 'excelente',
    titulo: `${saludo}lograste un excelente resultado`,
    texto: 'Comprendes los conceptos principales y los aplicaste correctamente. Repasa los pocos puntos pendientes para fortalecer todavía más tu preparación.',
  }
  if (nota >= 80) return {
    icono: 'tendencia',
    tono: 'solido',
    titulo: `${saludo}tienes un desempeño sólido`,
    texto: 'La base del módulo está bien comprendida. Identifica los temas con menor puntuación, refuérzalos y continúa avanzando.',
  }
  if (nota >= 76) return {
    icono: 'verificado',
    tono: 'aprobado',
    titulo: `${saludo}completaste el módulo`,
    texto: 'Alcanzaste los objetivos necesarios para aprobar. Antes de continuar, dedica unos minutos a revisar tus errores y asegurar los conceptos clave.',
  }
  if (nota >= 70) return {
    icono: 'alerta',
    tono: 'aprobado-ajustado',
    titulo: `${saludo}aprobaste, pero aún puedes reforzarlo`,
    texto: 'Cumpliste con la calificación mínima. Conviene repasar los temas con menor resultado antes de avanzar, especialmente aquellos que requieren aplicación práctica.',
  }
  if (nota >= 60) return {
    icono: 'diana',
    tono: 'cerca',
    titulo: `${saludo}estás cerca de aprobar`,
    texto: 'Ya tienes parte importante del módulo comprendida. Revisa los temas con menor porcentaje, completa las actividades pendientes y vuelve a intentarlo.',
  }
  if (nota >= 50) return {
    icono: 'herramientas',
    tono: 'refuerzo',
    titulo: `${saludo}necesitas reforzar algunos fundamentos`,
    texto: 'Has avanzado, pero todavía hay conceptos esenciales que requieren práctica. Trabaja primero en los temas con menor desempeño y después repite la evaluación.',
  }
  return {
    icono: 'libro',
    tono: 'inicio',
    titulo: `${saludo}vamos a fortalecer este módulo`,
    texto: 'Este resultado indica que necesitas revisar los contenidos desde la base. Avanza tema por tema, completa las actividades y utiliza los resultados para orientar tu siguiente intento.',
  }
}

// ------------------------------------------------------------
//  Pantalla completa al terminar el examen de módulo: CALIFICACIÓN del
//  módulo (60% examen + 40% actividades de los temas), felicitación
//  personalizada por rango, resumen de aprendizajes con el desempeño
//  por tema y, si la siguiente módulo está bloqueada para el alumno,
//  botón para SOLICITAR el acceso (el staff aprueba desde su panel).
//  Con menos de 50% no se solicita: se invita a repasar.
// ------------------------------------------------------------
function ModuloCompletado({ modulo, modulos, pct, onCerrar }) {
  const { user, perfil, rol, academiaId, grupoId } = useAuth()
  const { estado } = useProgress()
  const { moduloVisible } = useVisibilidad()

  // Desempeño en las ACTIVIDADES de cada tema (mejor quiz guardado del tema;
  // un tema sin quiz hecho cuenta como 0 — el desglose lo deja claro).
  const porTema = modulo.temas.map((t) => {
    const q = estado.quizzes[t.id]
    return { id: t.id, numero: t.numero, titulo: t.titulo, pct: q ? Math.round((q.aciertos / q.total) * 100) : null }
  })
  const promTemas = Math.round(porTema.reduce((s, t) => s + (t.pct || 0), 0) / (porTema.length || 1))
  const conQuiz = porTema.filter((t) => t.pct !== null).length
  const calificacion = Math.round(0.6 * pct + 0.4 * promTemas)
  const debeRepasar = calificacion < 50
  const nivelNota = calificacion >= 70 ? 'ok' : calificacion >= 50 ? 'media' : 'mal'
  const m = mensajeDeNota(calificacion, (perfil?.nombre || '').split(' ')[0])

  const idx = modulos.findIndex((f) => f.id === modulo.id)
  const siguiente = idx >= 0 ? modulos[idx + 1] || null : null
  // El alumno solo SOLICITA cuando la siguiente módulo está oculta para él;
  // si ya la ve (o es staff), se le invita a continuar directamente.
  const bloqueada = Boolean(siguiente) && rol === 'alumno' && !moduloVisible(siguiente.id)

  // Mientras el mensaje está en pantalla, congela el scroll del fondo para que
  // la pantalla quede optimizada y el mensaje siempre centrado hasta cerrarlo.
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  const [envio, setEnvio] = useState(bloqueada ? 'cargando' : 'puede')
  const [confirmar, setConfirmar] = useState(false) // muestra la advertencia antes de solicitar
  // ¿Ya tiene una solicitud pendiente de esa módulo? (no duplicar)
  useEffect(() => {
    if (!bloqueada) return
    let activo = true
    ;(async () => {
      try {
        const { misSolicitudes } = await import('../lib/firebase/solicitudes.js')
        const lista = await misSolicitudes(user.uid)
        const ya = lista.some(
          (s) => s.tipo === 'modulo' && s.moduloId === siguiente.id && s.estado === 'pendiente'
        )
        if (activo) setEnvio(ya ? 'pendiente' : 'puede')
      } catch {
        if (activo) setEnvio('puede')
      }
    })()
    return () => { activo = false }
  }, [bloqueada, siguiente?.id, user?.uid]) // eslint-disable-line react-hooks/exhaustive-deps

  const solicitar = async () => {
    setEnvio('enviando')
    try {
      const { crearSolicitud } = await import('../lib/firebase/solicitudes.js')
      await crearSolicitud({
        tipo: 'modulo',
        uid: user.uid,
        nombre: perfil?.nombre || user.displayName || '',
        academiaId,
        grupoId,
        moduloId: siguiente.id,
        moduloNumero: siguiente.numero,
        moduloTitulo: siguiente.titulo,
      })
      setEnvio('enviada')
    } catch {
      setEnvio('error')
    }
  }

  return (
    <div className="modulo-fin" role="dialog" aria-modal="true" aria-label="Módulo completado">
      <div className="modulo-fin-card" style={{ '--modulo-color': modulo.color }}>
        <small className="modulo-fin-modulo">Modulo {modulo.numero} · {modulo.titulo}</small>
        <span className={`modulo-fin-icono t-${m.tono}`} aria-hidden="true">
          <Icon name={m.icono} size={26} />
        </span>
        <h2>{m.titulo}</h2>

        <div className={`modulo-fin-nota ${nivelNota}`}>
          <b>{calificacion}%</b>
          <small>Calificación del módulo</small>
          <span>
            Examen {pct}% · Actividades de los temas {promTemas}%
            {conQuiz < porTema.length && ` (${conQuiz}/${porTema.length} temas con quiz hecho)`}
          </span>
        </div>

        <p className="modulo-fin-sub">{m.texto}</p>

        <details className="modulo-fin-aprendizajes">
          <summary>
            <Icon name="diana" size={16} /> Aprendizajes de este módulo
            <em>{modulo.temas.length} temas</em>
          </summary>
          <ul>
            {porTema.map((t) => (
              <li key={t.id}>
                <span>{t.numero}</span> {t.titulo}
                <em className={`mf-chip ${t.pct === null ? 'sin' : t.pct >= 70 ? 'ok' : 'mal'}`}>
                  {t.pct === null ? '—' : `${t.pct}%`}
                </em>
              </li>
            ))}
          </ul>
        </details>

        <div className="modulo-fin-cta">
          {debeRepasar ? (
            <Link to={`/modulo/${modulo.id}`} className="btn btn--primario btn--lg" onClick={onCerrar}>
              Repasar los temas del módulo
            </Link>
          ) : !siguiente ? (
            <p className="modulo-fin-final">
              Esta era la última modulo del temario: completaste todo el programa.
            </p>
          ) : bloqueada ? (
            <>
              {envio === 'enviada' || envio === 'pendiente' ? (
                <p className="modulo-fin-final" role="status">
                  {envio === 'enviada' ? 'Solicitud enviada.' : 'Ya tienes una solicitud pendiente.'}{' '}
                  Tu profesor la verá en su panel y te habilitará la
                  Modulo {siguiente.numero} · {siguiente.titulo}.
                </p>
              ) : confirmar ? (
                <div className="modulo-fin-aviso" role="alert">
                  <p>
                    <b>Vas a solicitar avanzar a el Módulo {siguiente.numero}.</b> Solo hazlo si ya
                    dominas este módulo: tu profesor revisará tu desempeño antes de habilitártela y
                    no podrás cancelar la solicitud una vez enviada.
                  </p>
                  <div className="modulo-fin-aviso-btns">
                    <button
                      className="btn btn--primario"
                      onClick={solicitar}
                      disabled={envio === 'enviando'}
                    >
                      {envio === 'enviando' ? 'Enviando…' : 'Sí, solicitar avanzar'}
                    </button>
                    <button
                      className="btn btn--suave"
                      onClick={() => setConfirmar(false)}
                      disabled={envio === 'enviando'}
                    >
                      Mejor no
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn--primario btn--lg modulo-fin-solicitar"
                  onClick={() => setConfirmar(true)}
                  disabled={envio === 'cargando'}
                >
                  Solicitar avanzar al siguiente módulo
                </button>
              )}
              {envio === 'error' && (
                <p className="cuenta-error" role="alert">
                  No se pudo enviar la solicitud (revisa tu conexión e inténtalo de nuevo).
                </p>
              )}
            </>
          ) : (
            <Link to={`/modulo/${siguiente.id}`} className="btn btn--primario btn--lg">
              Continuar con el Módulo {siguiente.numero} <Icon name="chevronDer" size={15} />
            </Link>
          )}
        </div>

        <button className="modulo-fin-cerrar" onClick={onCerrar}>
          Seguir repasando este módulo
        </button>
      </div>
    </div>
  )
}
