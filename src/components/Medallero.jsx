import { useMemo } from 'react'
import Icon from './Icon.jsx'
import { useProgress } from '../context/ProgressContext.jsx'
import { useIndiceContenido } from '../context/ContenidoContext.jsx'
import {
  evaluarMedallas, desbloqueoPrincipal, resumenDeLogros, rachaActual, diaLocal,
} from '../lib/logrosModelo.js'

// ============================================================
//  MEDALLERO — la cabecera de Logros (trabajo R1)
// ------------------------------------------------------------
//  Tres cosas, en este orden y no en otro:
//
//    1. LA RACHA. Es lo que hace volver mañana, así que va primero.
//    2. EL DESBLOQUEO PRINCIPAL: una sola cosa, grande, la siguiente, con lo
//       que falta. No una rejilla de cuarenta casillas grises — que es la forma
//       más rápida de que una sección de logros se lea como una lista de
//       deberes.
//    3. EL MEDALLERO entero, debajo, para quien quiera verlo.
//
//  Todo se calcula al pintar, desde el progreso que ya está en memoria y el
//  índice de módulos que el shell ya tiene: CERO lecturas nuevas. Después de lo
//  que costó bajar el temario de 288 lecturas a 3, una pantalla de logros no es
//  sitio para gastarlas.
//
//  La lógica no está aquí: está en `lib/logrosModelo.js`, que se prueba sin
//  montar React.
// ============================================================
export default function Medallero() {
  const { estado } = useProgress()
  const { modulos } = useIndiceContenido()

  const hoy = diaLocal()
  const racha = rachaActual(estado.actividad, hoy)
  const mejorRacha = Math.max(Number(estado.racha?.mejor || 0), racha)

  const medallas = useMemo(
    () => evaluarMedallas({
      modulos,
      leidos: estado.leidos,
      quizzes: estado.quizzes,
      examenes: estado.examenes,
      actividad: estado.actividad,
      racha: estado.racha,
      hoy,
    }),
    [modulos, estado.leidos, estado.quizzes, estado.examenes, estado.actividad, estado.racha, hoy]
  )

  // «El módulo abierto» sin tener fechas por tema: el primero que aún no está
  // terminado. Solo se usa para deshacer un empate en la cabecera, así que no
  // merece más precisión que esta.
  const moduloAbiertoId = useMemo(() => {
    const enCurso = (modulos || []).find(
      (m) => (m.temas || []).some((t) => !estado.leidos?.[t.id])
    )
    return enCurso?.id || null
  }, [modulos, estado.leidos])

  const siguiente = desbloqueoPrincipal(medallas, { moduloAbiertoId })
  const { conseguidas, total } = resumenDeLogros(medallas)

  // SIN ÍNDICE NO HAY MEDALLERO, y decirlo es mejor que enseñar medio.
  //
  // `modulos` llega vacío en dos casos que se ven de verdad: mientras el índice
  // de la academia viaja (1 lectura), y cuando esa academia no tiene contenido
  // propio utilizable. En los dos, el catálogo saldría SIN las medallas de
  // módulo —o sea, casi entero— y la cuenta pasaría de «0 de 8» a «0 de 15» un
  // segundo después. Es exactamente la meta que se mueve que el resto de este
  // trabajo evita: el denominador de una medalla no puede cambiar solo.
  //
  // La racha sí se pinta: no depende del temario, es del alumno.
  const sinTemario = (modulos || []).length === 0

  // Conseguidas primero; entre las pendientes, la más cerca arriba.
  const ordenadas = useMemo(
    () => [...medallas].sort((a, b) => {
      if (a.conseguida !== b.conseguida) return a.conseguida ? -1 : 1
      return b.fraccion - a.fraccion
    }),
    [medallas]
  )

  return (
    <section className="medallero" aria-label="Tu avance">
      <div className="medallero-cabecera">
        <Racha dias={racha} mejor={mejorRacha} sinHistorial={!estado.racha?.ultimoDia} />
        {sinTemario && (
          <div className="mdl-siguiente mdl-siguiente--fin">
            <span className="mdl-siguiente-ico"><Icon name="reloj" size={30} /></span>
            <div>
              <h2>Tus medallas, en cuanto llegue tu temario</h2>
              <p>
                El medallero se arma con los módulos de tu academia. Aparece aquí en cuanto tu
                temario esté disponible.
              </p>
            </div>
          </div>
        )}
        {!sinTemario && (siguiente
          ? <Siguiente medalla={siguiente} />
          : (
            <div className="mdl-siguiente mdl-siguiente--fin">
              <span className="mdl-siguiente-ico"><Icon name="trofeo" size={30} /></span>
              <div>
                <h2>Las tienes todas</h2>
                <p>No queda ninguna medalla por conseguir. Enhorabuena.</p>
              </div>
            </div>
          ))}
      </div>

      {!sinTemario && (
        <>
          <h2 className="mdl-titulo">
            Medallero <span className="mdl-cuenta">{conseguidas} de {total}</span>
          </h2>

          <ul className="mdl-rejilla">
            {ordenadas.map((m) => <Medalla key={m.id} medalla={m} />)}
          </ul>
        </>
      )}
    </section>
  )
}

// ------------------------------------------------------------

function Racha({ dias, mejor, sinHistorial }) {
  return (
    <div className={`mdl-racha${dias > 0 ? ' mdl-racha--viva' : ''}`}>
      <span className="mdl-racha-ico"><Icon name="chispa" size={26} /></span>
      <div>
        <strong className="mdl-racha-n">
          {dias} <span>{dias === 1 ? 'día' : 'días'}</span>
        </strong>
        {/* Concordancia de verdad: con la racha en 1 esto decía «1 día ·
            seguidos estudiando · tu mejor marca son 1». */}
        <p className="mdl-racha-txt">
          {dias > 0
            ? <>
                {dias === 1 ? 'seguido' : 'seguidos'} estudiando ·
                {' '}tu mejor marca {mejor === 1 ? 'es 1 día' : `son ${mejor} días`}
              </>
            : <>Estudia algo hoy y empieza tu racha.</>}
        </p>
        {/* Dicho en voz alta y una sola vez: la racha no puede saber lo que
            pasó antes de existir, y una racha inventada desprestigiaría todo lo
            demás de esta pantalla. */}
        {sinHistorial && (
          <p className="mdl-racha-nota">
            Las rachas empiezan a contarse desde hoy: antes no se guardaba la fecha de cada lectura.
          </p>
        )}
      </div>
    </div>
  )
}

function Siguiente({ medalla }) {
  const faltan = medalla.total - medalla.hecho
  return (
    <div className="mdl-siguiente">
      <span className="mdl-siguiente-ico"><Icon name={medalla.icono} size={30} /></span>
      <div className="mdl-siguiente-cuerpo">
        <p className="mdl-siguiente-eti">Tu próximo desbloqueo</p>
        <h2>{medalla.titulo}</h2>
        <p className="mdl-siguiente-pista">{medalla.pista}</p>
        <Barra hecho={medalla.hecho} total={medalla.total} grande />
        <p className="mdl-siguiente-falta">
          {faltan === medalla.total
            ? <>Aún no has empezado esta.</>
            : <>Te {faltan === 1 ? 'queda' : 'quedan'} {faltan} para conseguirla.</>}
        </p>
      </div>
    </div>
  )
}

function Medalla({ medalla }) {
  return (
    <li className={`mdl-card${medalla.conseguida ? ' mdl-card--ok' : ''}`}>
      <span className="mdl-card-ico">
        <Icon name={medalla.conseguida ? medalla.icono : 'candado'} size={22} />
      </span>
      <div className="mdl-card-cuerpo">
        <h3>{medalla.titulo}</h3>
        <p>{medalla.pista}</p>
        {medalla.conseguida
          ? <p className="mdl-card-ok-txt"><Icon name="check" size={14} /> Conseguida</p>
          : <Barra hecho={medalla.hecho} total={medalla.total} />}
      </div>
    </li>
  )
}

function Barra({ hecho, total, grande = false }) {
  const pct = total > 0 ? Math.round((hecho / total) * 100) : 0
  return (
    <div className={`mdl-barra${grande ? ' mdl-barra--grande' : ''}`}>
      <div
        className="mdl-barra-pista"
        role="progressbar"
        aria-valuenow={hecho}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`${hecho} de ${total}`}
      >
        <span className="mdl-barra-relleno" style={{ width: `${pct}%` }} />
      </div>
      <span className="mdl-barra-cifra">{hecho}/{total}</span>
    </div>
  )
}
