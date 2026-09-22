import { useMemo, useState } from 'react'
import Icon from '../Icon.jsx'
import { useFicha } from '../../context/FichaStaffContext.jsx'
import { PLANTILLAS, componer, datosDeMensaje } from '../../lib/staff/plantillasMensaje.js'
import { ESTADOS_PENDIENTES } from '../../lib/staff/carritoModelo.js'

// ============================================================
//  Comunicación — plantillas pregrabadas con los datos ya dentro
// ------------------------------------------------------------
//  EL TEXTO SE VE ANTES DE MANDARLO. No es un adorno: el mensaje lleva el
//  nombre de una persona y una cifra de dinero, y sale hacia un teléfono real.
//  Un botón que abre WhatsApp con un texto que nadie ha leído manda tarde o
//  temprano un «Tu adeudo es de $NaN».
//
//  Y SI FALTA UN DATO, NO SE MANDA. `componer` devuelve qué falta y el botón se
//  queda desactivado con el motivo escrito. Es preferible a completar el hueco
//  con un cero o con una cadena vacía.
//
//  El texto de cada plantilla vive en `lib/staff/plantillasMensaje.js`, no
//  aquí, porque el día que lo mande una API en lugar de una persona tiene que
//  ser exactamente el mismo texto.
// ============================================================
export default function PanelMensajes() {
  const { alumno, academia, cuenta, ordenes } = useFicha()
  const [elegida, setElegida] = useState('recordatorio-pago')
  const [copiado, setCopiado] = useState(false)

  // La orden que interesa para los mensajes de compra es la última que aún no
  // se ha entregado: es de la que se pregunta en el mostrador.
  const orden = useMemo(
    () => (ordenes || []).find((o) => o.estado !== 'entregado' && o.estado !== 'cancelado') || null,
    [ordenes]
  )

  const datos = useMemo(
    () => datosDeMensaje({ alumno, academia, saldo: cuenta.saldo, orden }),
    [alumno, academia, cuenta.saldo, orden]
  )

  const mensaje = useMemo(
    () => componer(elegida, datos, { telefono: alumno?.telefono }),
    [elegida, datos, alumno?.telefono]
  )

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(mensaje.texto)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2500)
    } catch {
      // Sin permiso de portapapeles el texto sigue a la vista y se puede
      // seleccionar a mano: no hace falta avisar de nada.
    }
  }

  const sinTelefono = !String(alumno?.telefono || '').trim()
  const deudaPendiente = (ordenes || []).some((o) => ESTADOS_PENDIENTES.includes(o.estado))

  return (
    <section className="ui-panel staff-panel" aria-labelledby="staff-mensajes-t">
      <h3 id="staff-mensajes-t">Mensaje por WhatsApp</h3>

      <div className="staff-plantillas" role="group" aria-label="Plantillas">
        {PLANTILLAS.map((p) => (
          <button
            key={p.id}
            type="button"
            className={`btn btn--sm ${elegida === p.id ? 'btn--primario' : ''}`}
            onClick={() => setElegida(p.id)}
            aria-pressed={elegida === p.id}
          >
            {p.etiqueta}
          </button>
        ))}
      </div>

      {mensaje.faltan.length > 0 ? (
        <p className="ui-nota-error" role="alert">
          No se puede componer este mensaje: falta {mensaje.faltan.join(', ')}.
          {elegida === 'recoleccion-lista' && !deudaPendiente && ' Esta persona no tiene ningún pedido abierto.'}
        </p>
      ) : (
        <>
          <label className="ui-campo">
            <span>Así va a salir</span>
            <textarea value={mensaje.texto} readOnly rows={6} className="staff-previa" />
          </label>

          <div className="ui-atajos">
            <a
              className={`btn btn--primario ${mensaje.enlace ? '' : 'staff-desactivado'}`}
              href={mensaje.enlace || undefined}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={mensaje.enlace ? undefined : 'true'}
              onClick={(e) => { if (!mensaje.enlace) e.preventDefault() }}
            >
              <Icon name="compartir" size={18} /> Abrir WhatsApp
            </a>
            <button type="button" className="btn btn--sm" onClick={copiar}>
              <Icon name="copiar" size={16} /> {copiado ? 'Copiado' : 'Copiar el texto'}
            </button>
          </div>

          {sinTelefono && (
            <p className="staff-ayuda">
              Esta persona no tiene teléfono registrado, así que no hay a quién abrirle WhatsApp.
              El texto se puede copiar igualmente. Añade su número desde «Editar ficha».
            </p>
          )}
        </>
      )}
    </section>
  )
}
