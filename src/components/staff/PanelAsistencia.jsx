import { useState } from 'react'
import Icon from '../Icon.jsx'
import { useFicha } from '../../context/FichaStaffContext.jsx'
import { claveDeDia, diaLargo, horaCorta, porDia } from '../../lib/staff/asistenciaModelo.js'
import { textoDeError } from '../../lib/staff/avisos.js'

// ============================================================
//  Control de asistencia — el botón que sustituye a la firma en papel
// ------------------------------------------------------------
//  UN SOLO BOTÓN GRANDE, y el estado siempre visible. Es lo que se pulsa
//  decenas de veces en una mañana.
//
//  Si ya había entrada hoy, el botón NO desaparece: se renueva la vigencia y se
//  dice que ya estaba registrada. Esconderlo obligaría a adivinar por qué no
//  está, y el id determinista (`{uid}__{día}`) ya garantiza que no se apunta
//  dos veces —ver `lib/staff/asistenciaModelo.js`—.
// ============================================================
export default function PanelAsistencia() {
  const { alumno, academiaId, miUid, asistencia, asistencias, ahora, recargar } = useFicha()
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')

  const registrar = async () => {
    setGuardando(true)
    setError('')
    setAviso('')
    try {
      const { registrarEntrada } = await import('../../lib/firebase/staff/asistencias.js')
      const res = await registrarEntrada({
        alumno,
        academiaId,
        registradoPor: miUid,
        medio: 'manual',
        ahora: new Date(),
        yaRegistradaHoy: Boolean(asistencia.hoy),
      })
      setAviso(res.repetida
        ? 'Ya estaba registrada hoy: se renovó su vigencia, no se apuntó dos veces.'
        : 'Entrada registrada.')
      if (!res.auditado) {
        setAviso((a) => `${a} La entrada se guardó, pero no se pudo escribir su línea de auditoría.`)
      }
      await recargar()
    } catch (err) {
      setError(textoDeError(err, 'No se pudo registrar la entrada', 'asistencias'))
    } finally {
      setGuardando(false)
    }
  }

  const dias = porDia(asistencias).slice(0, 12)
  const hoy = claveDeDia(ahora)

  return (
    <section className="ui-panel staff-panel" aria-labelledby="staff-asistencia-t">
      <h3 id="staff-asistencia-t">Asistencia</h3>

      <button
        type="button"
        className="btn btn--primario staff-boton-grande"
        onClick={registrar}
        disabled={guardando}
      >
        <Icon name="check" size={22} />
        {guardando ? 'Registrando…' : (asistencia.hoy ? 'Renovar su entrada de hoy' : 'Registrar llegada')}
      </button>

      <p className="staff-ayuda">
        Guarda la fecha y la hora automáticamente. La entrada vale 8 horas; estar en clase se calcula
        con esa hora de caducidad, no con una casilla que alguien tenga que apagar.
      </p>

      {aviso && <p className="staff-aviso" role="status">{aviso}</p>}
      {error && <p className="ui-nota-error" role="alert">{error}</p>}

      <h4>Últimos días</h4>
      {dias.length === 0
        ? <p className="staff-ayuda">Todavía no tiene ninguna entrada registrada.</p>
        : (
          <ul className="staff-lista-dias">
            {dias.map(({ dia, asistencias: delDia }) => (
              <li key={dia} className={dia === hoy ? 'es-hoy' : ''}>
                <span className="staff-dia">{diaLargo(dia)}</span>
                <span className="staff-hora">
                  {delDia.map((a) => horaCorta(a.inicio)).join(' · ')}
                  {delDia.some((a) => a.medio === 'codigo') ? ' · credencial' : ''}
                </span>
              </li>
            ))}
          </ul>
        )}
    </section>
  )
}
