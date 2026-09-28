import { Link } from 'react-router-dom'
import { rachaActual, mejorRachaEn, diaLocal, diaAnterior } from '../../lib/logrosModelo.js'
import { nivelDeTema, NIVELES_DOMINIO, esEvaluacionPorId, tarjetasVencidas, REFERENCIA_QUIZ } from '../../lib/pulsoModelo.js'

// «Tus signos vitales de estudio» (PTEM Pulso), arriba de Mi progreso:
//  · la racha y un calendario de las últimas 12 semanas;
//  · el mapa de dominio de todos los módulos, un cuadro por tema;
//  · qué conviene repasar, con enlace directo.
// Todo sale del progreso y del índice ligero: ninguna lectura.
const SEMANAS = 12
const COLOR = [
  'var(--bg-3)',
  'color-mix(in srgb, var(--primario) 32%, var(--bg-2))',
  'color-mix(in srgb, var(--primario) 60%, var(--bg-2))',
  'color-mix(in srgb, var(--primario) 88%, var(--bg-2))',
  'var(--exito-solido)',
]

function calendario(actividad = {}) {
  const dias = []
  let d = diaLocal()
  for (let k = 0; k < SEMANAS * 7; k++) { dias.unshift({ dia: d, n: Number(actividad[d] || 0) }); d = diaAnterior(d) }
  return dias
}

export default function SignosDeEstudio({ modulos = [], estado = {} }) {
  const actividad = estado.actividad || {}
  const racha = rachaActual(actividad)
  const mejor = Math.max(mejorRachaEn(actividad), estado.racha?.mejor || 0, racha)
  const dias = calendario(actividad)
  const diasConEstudio = dias.filter((x) => x.n > 0).length
  const temas = modulos.flatMap((m) => m.temas.filter((t) => !esEvaluacionPorId(t.id)).map((t) => ({ ...t, modulo: m })))
  const niveles = temas.map((t) => nivelDeTema(t.id, estado, t.nFlashcards || 0))
  const cuenta = [0, 1, 2, 3, 4].map((n) => niveles.filter((x) => x === n).length)
  const vencidas = tarjetasVencidas(estado.srs || {}).length
  const reforzar = temas.filter((t) => {
    const q = estado.quizzes?.[t.id]
    return q && q.total > 0 && q.aciertos / q.total < REFERENCIA_QUIZ
  }).slice(0, 5)

  return (
    <section className="pl-signos" aria-label="Tus signos vitales de estudio">
      <div className="pl-signos-fila">
        <div className="pl-signo">
          <span className="pl-rotulo">Racha</span>
          <b className="pl-signo-num">{racha}<small> {racha === 1 ? 'día' : 'días'}</small></b>
          <span className="pl-nota-pie">Mejor racha: {mejor} · {diasConEstudio} {diasConEstudio === 1 ? 'día' : 'días'} con estudio en 12 semanas</span>
        </div>
        <div className="pl-calendario" role="img" aria-label={`${diasConEstudio} días con estudio en las últimas 12 semanas`}>
          {dias.map((x) => (
            <i key={x.dia} title={`${x.dia}: ${x.n ? `${x.n} ${x.n === 1 ? 'acción' : 'acciones'}` : 'sin estudio'}`} className={x.n >= 6 ? 'n3' : x.n >= 3 ? 'n2' : x.n >= 1 ? 'n1' : ''} />
          ))}
        </div>
      </div>

      <div className="pl-signos-dominio">
        <div className="pl-signos-cab">
          <h2>Mapa de dominio</h2>
          <span className="pl-rotulo">{cuenta[4]} {cuenta[4] === 1 ? 'dominado' : 'dominados'} · {cuenta[1] + cuenta[2] + cuenta[3]} en camino · {cuenta[0]} sin empezar</span>
        </div>
        {modulos.map((m) => {
          const suyos = temas.filter((t) => t.modulo.id === m.id)
          if (!suyos.length) return null
          return (
            <div className="pl-mapa-modulo" key={m.id}>
              <Link to={`/modulo/${m.id}`} className="pl-mapa-nombre">M{m.numero}</Link>
              <div className="pl-mapa-cuadros">
                {suyos.map((t) => {
                  const n = niveles[temas.indexOf(t)]
                  return (
                    <Link
                      key={t.id}
                      to={`/tema/${t.id}`}
                      style={{ background: COLOR[n] }}
                      title={`${t.numero} ${t.titulo}: ${NIVELES_DOMINIO[n]}`}
                      aria-label={`${t.numero} ${t.titulo}: ${NIVELES_DOMINIO[n]}`}
                    />
                  )
                })}
              </div>
            </div>
          )
        })}
        <p className="pl-ruta-leyenda">
          {NIVELES_DOMINIO.map((nombre, n) => <span key={nombre}><i style={{ background: COLOR[n], borderRadius: 3 }} />{nombre}</span>)}
        </p>
      </div>

      {(vencidas > 0 || reforzar.length > 0) && (
        <div className="pl-signos-repasar">
          <h2>Te conviene repasar</h2>
          <ul>
            {vencidas > 0 && <li><Link to="/flashcards">{vencidas} {vencidas === 1 ? 'tarjeta vencida' : 'tarjetas vencidas'}</Link> en tu repaso de hoy</li>}
            {reforzar.map((t) => (
              <li key={t.id}><Link to={`/tema/${t.id}/quiz`}>{t.numero} {t.titulo}</Link> · quiz bajo 70 %</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
