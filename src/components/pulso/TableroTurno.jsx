import { Link } from 'react-router-dom'
import { useProgress } from '../../context/ProgressContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { aReanudar, triageDeHoy, turnoDeHoy } from '../../lib/pulsoModelo.js'
import { rachaActual } from '../../lib/logrosModelo.js'
import { estadosEditoriales } from '../../data/navIndice.js'
import TrazoMonitor from '../ui/TrazoMonitor.jsx'

// El tablero de turno del inicio (PTEM Pulso). Ocupa el lugar de la antigua
// barra «Tu progreso» —misma sección configurable, id 'progreso'— y responde a
// dos preguntas: dónde me quedé y qué me conviene estudiar hoy.
//
// Todo sale del índice ligero y del progreso: no hace ninguna lectura. Recibe
// SOLO los módulos visibles para el grupo, así que nunca sugiere un tema que el
// profesor no ha liberado.
export default function TableroTurno({ modulos = [], total = 0 }) {
  const { estado } = useProgress()
  const { capacidades, esSuperadmin } = useAuth()
  const conFarmacologia = esSuperadmin || Boolean(capacidades?.entrenadorFarmacologia)
  const { leidos = {}, quizzes = {}, lecturas = {}, actividad = {}, srs = {}, mochila = [] } = estado
  if (!modulos.length) return null

  const siguiente = aReanudar({ modulos, leidos, lecturas, bloqueados: estadosEditoriales })
  const triage = triageDeHoy({
    modulos, leidos, quizzes, srs, bloqueados: estadosEditoriales,
    claveExtra: (k) => conFarmacologia && k.startsWith('farm:'),
    moduloEnCurso: siguiente.tema?.moduloId || null,
  })
  const turno = turnoDeHoy({ reanudar: siguiente, triage, quizzes })
  const rojo = triage.reforzar.vencidas + triage.reforzar.total
  const racha = rachaActual(actividad)
  // Mi mochila: temas guardados desde el monitor, solo los que siguen visibles.
  const porId = new Map(modulos.flatMap((m) => (m.temas || []).map((t) => [t.id, { ...t, moduloNumero: m.numero }])))
  const guardados = mochila.map((id) => porId.get(id)).filter(Boolean).slice(0, 8)
  const temasLeidos = Object.values(leidos).filter(Boolean).length
  const pct = total ? Math.round((temasLeidos / total) * 100) : 0

  return (
    <div className="ph-wrap">
      <section className="pl-tablero" aria-label="Tu tablero de hoy">
        <TarjetaReanudar siguiente={siguiente} temasLeidos={temasLeidos} total={total} pct={pct} />
        <aside className="pl-triage" aria-labelledby="pl-triage-titulo">
          <div className="pl-triage-cab">
            <h2 id="pl-triage-titulo">Tu triage de hoy</h2>
            {racha > 0 && (
              <span className="pl-racha" title="Días seguidos con estudio">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" aria-hidden="true"><path d="M2 13h5l2-5 4 10 2-5h7" /></svg>
                {racha} {racha === 1 ? 'día' : 'días'}
              </span>
            )}
          </div>
          <Etiqueta
            color="rojo"
            titulo="Repasar hoy"
            sub={rojo
              ? [
                  triage.reforzar.vencidas ? `${triage.reforzar.vencidas} ${triage.reforzar.vencidas === 1 ? 'tarjeta vencida' : 'tarjetas vencidas'}` : '',
                  triage.reforzar.total ? `${triage.reforzar.total} quiz bajo 70 %` : '',
                ].filter(Boolean).join(' · ')
              : 'Nada por olvidarse hoy'}
            n={rojo}
            a={triage.reforzar.vencidas ? '/flashcards' : triage.reforzar.primero ? `/tema/${triage.reforzar.primero.id}/quiz` : null}
          />
          <Etiqueta
            color="amarillo"
            titulo={triage.pendientes.modulo ? `Pendientes del Módulo ${triage.pendientes.modulo.numero}` : 'Pendientes'}
            sub={triage.pendientes.total ? 'Temas sin leer donde vas' : 'Nada pendiente en este módulo'}
            n={triage.pendientes.total}
            a={triage.pendientes.modulo ? `/modulo/${triage.pendientes.modulo.id}` : null}
          />
          <Etiqueta
            color="verde"
            titulo="Listos"
            sub="Leídos y con su quiz en la referencia"
            n={triage.listos.total}
            a="/progreso?vista=mio"
          />
          {turno.length > 0 && (
            <div className="pl-turno">
              <span className="pl-rotulo">Tu turno de hoy · {turno.length} {turno.length === 1 ? 'tarea' : 'tareas'}</span>
              <ol>
                {turno.map((t) => <li key={t.id}><Link to={t.a}>{t.texto}</Link></li>)}
              </ol>
              <Link to={turno[0].a} className="btn btn--turno">Empezar turno</Link>
            </div>
          )}
          <p className="pl-triage-nota">El 70 % es la referencia de práctica del quiz, no la calificación mínima de tu academia.</p>
        </aside>
      </section>
      {guardados.length > 0 && (
        <section className="pl-mochila" aria-labelledby="pl-mochila-titulo">
          <h2 id="pl-mochila-titulo">Mi mochila</h2>
          <ul>
            {guardados.map((t) => (
              <li key={t.id}>
                <Link to={`/tema/${t.id}`}>
                  <span className="pl-mochila-num">{t.numero}</span>
                  <span>{t.titulo}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

function TarjetaReanudar({ siguiente, temasLeidos, total, pct }) {
  const { modo, tema, lectura } = siguiente
  const barraProgreso = (
    <div className="pl-reanudar-pie">
      <span>{temasLeidos} de {total} temas leídos · {pct} %</span>
      {/* A la vista PERSONAL: quien da clase tiene además la de sus alumnos. */}
      <Link to="/progreso?vista=mio">Ver mi progreso</Link>
    </div>
  )

  if (modo === 'terminado') {
    return (
      <article className="pl-reanudar">
        <div className="pl-franja" aria-hidden="true" />
        <div className="pl-reanudar-cuerpo">
          <h2>Leíste todo lo disponible</h2>
          <p>No queda ningún tema sin leer en los módulos que tu grupo tiene abiertos.</p>
          <div className="pl-acciones">
            <Link to="/flashcards" className="btn btn--reanudar">
              <Latido /> Repasar tarjetas
            </Link>
          </div>
          {barraProgreso}
        </div>
      </article>
    )
  }

  const seccion = modo === 'reanudar' ? lectura.seccion : 0
  const destino = seccion > 0 ? `/tema/${tema.id}?seccion=${seccion}` : `/tema/${tema.id}`
  return (
    <article className="pl-reanudar" style={tema.moduloColor ? { '--pl-modulo': tema.moduloColor } : undefined}>
      <div className="pl-franja" aria-hidden="true" />
      <div className="pl-reanudar-cuerpo">
        <div className="pl-insignias">
          <span className="pl-insignia">Módulo {tema.moduloNumero} · {tema.moduloTitulo}</span>
          <span className="pl-insignia">Tema {tema.numero}</span>
        </div>
        <h2>{tema.titulo}</h2>
        <p>
          {modo === 'reanudar'
            ? `Vas en la sección ${seccion + 1} de ${lectura.total}. Te llevamos justo ahí.`
            : 'Es tu siguiente tema en el orden del plan.'}
        </p>
        {modo === 'reanudar' && (
          <TrazoMonitor total={lectura.total} vistas={lectura.vistas || []} actual={seccion} alto={40} />
        )}
        <div className="pl-acciones">
          <Link to={destino} className="btn btn--reanudar">
            <Latido /> {modo === 'reanudar' ? 'Reanudar' : 'Empezar'}
          </Link>
          <Link to={`/modulo/${tema.moduloId}`} className="btn btn--fantasma">Ver el módulo</Link>
        </div>
        {barraProgreso}
      </div>
    </article>
  )
}

function Etiqueta({ color, titulo, sub, n, a }) {
  const dentro = (
    <>
      <span className="pl-etiqueta-ojal" aria-hidden="true" />
      <span>
        <b>{titulo}</b>
        <span className="pl-etiqueta-sub">{sub}</span>
      </span>
      <span className="pl-etiqueta-n">{n}</span>
    </>
  )
  const clase = `pl-etiqueta pl-etiqueta--${color} ${n ? '' : 'pl-etiqueta--vacia'}`
  return a && n ? <Link to={a} className={clase}>{dentro}</Link> : <div className={clase}>{dentro}</div>
}

function Latido() {
  return (
    <span className="pl-latido" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
        <path d="M2 13h5l2-5 4 10 2-5h7" />
      </svg>
    </span>
  )
}
