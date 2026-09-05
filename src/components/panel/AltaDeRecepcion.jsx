import { useMemo, useRef, useState } from 'react'
import Icon from '../Icon.jsx'
import CompartirCodigo, { enlaceInvitacion } from '../CompartirCodigo.jsx'
import { mensajeError } from '../../lib/panelModelo.js'
import { agruparPorGeneracion } from '../../lib/invitacionesCentro.js'
import {
  METODOS_PAGO, CONCEPTOS_PAGO,
  problemasDelAlta, problemasDelPago,
  textoDeBienvenida, enlaceWhatsApp,
} from '../../lib/recepcionModelo.js'

// ============================================================
//  RECEPCIÓN — el alta de mostrador, de principio a fin
// ------------------------------------------------------------
//  El modelo, la escritura y las reglas de esta pantalla se hicieron el 2 de
//  septiembre de 2026 (trabajo O4a) y se quedaron sin pantalla: `recepcionModelo.js`
//  y `firebase/recepcion.js` existían, tenían pruebas, y no los llamaba nadie.
//  Esto es la pantalla.
//
//  QUÉ HACE UN ALTA AQUÍ, y qué NO hace.
//
//  Reserva la matrícula, guarda la ficha dentro de una invitación personal de
//  un solo uso y registra el primer pago si lo hubo. Lo que NO hace es crear la
//  cuenta de Firebase Auth: hacerlo desde el navegador dejaría la sesión
//  iniciada como esa persona, o sea que echaría a la recepcionista de la suya
//  en cada alta. Eso exige una Cloud Function (plan Blaze) y es el trabajo O4b.
//
//  Así que el alta es una PREINSCRIPCIÓN y el botón de bienvenida manda un
//  enlace, no una contraseña. Cuando llegue Blaze cambia lo que hace el botón;
//  esta pantalla y estos datos no cambian.
//
//  DOS DECISIONES DE INTERFAZ QUE NO SON ADORNO:
//
//   · **La ficha del alta no desaparece al terminar.** Quien está en un
//     mostrador necesita seguir viendo la matrícula y el enlace mientras se lo
//     dicta a la persona que tiene delante. Se cierra a mano, con «Dar de alta
//     a otra persona».
//   · **Los avisos dicen QUÉ falta, no «hay errores».** Es literalmente lo que
//     `problemasDelAlta` devuelve: una lista de frases. Aquí se pintan tal cual.
//
//  QUIÉN ENTRA. Hoy, el director (desde /panel/recepcion) y el super-admin
//  (desde la consola de la academia): son quienes las reglas ya dejan crear
//  invitaciones y mover el contador de matrículas. Por eso esto es un
//  COMPONENTE y no una página: las dos consolas montan el mismo formulario, y
//  el permiso lo decide cada página en su puerta. El rol `recepcion` es un
//  trabajo aparte y tiene su propia advertencia en el plan —meterlo dentro de
//  `esStaffDe()` en las reglas le regalaría el temario completo—.
// ============================================================

const ALTA_VACIA = { nombre: '', email: '', telefono: '', grupoId: '', nota: '' }
const PAGO_VACIO = { monto: '', concepto: 'inscripcion', metodo: 'efectivo', referencia: '', nota: '' }

export default function AltaDeRecepcion({
  academiaId, academiaNombre = '', grupos = [], miUid,
  // Cómo se llama un grupo por su id. El panel lo trae del contexto; la consola
  // del super-admin lo resuelve sobre su propia lista.
  nombreGrupo = (id) => id,
}) {

  const [alta, setAlta] = useState(ALTA_VACIA)
  const [cobra, setCobra] = useState(true)
  const [pago, setPago] = useState(PAGO_VACIO)
  const [intentado, setIntentado] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [ficha, setFicha] = useState(null) // { matricula, codigo, alta }
  const primerCampo = useRef(null)

  const pagoEfectivo = cobra ? pago : { sinPago: true }
  const problemas = useMemo(
    () => [...problemasDelAlta(alta), ...problemasDelPago(pagoEfectivo)],
    [alta, pagoEfectivo]
  )

  const campo = (k) => (e) => setAlta((a) => ({ ...a, [k]: e.target.value }))
  const campoPago = (k) => (e) => setPago((p) => ({ ...p, [k]: e.target.value }))

  const enviar = async (e) => {
    e.preventDefault()
    setIntentado(true)
    setError('')
    if (problemas.length) return
    setGuardando(true)
    try {
      const { altaDeRecepcion } = await import('../../lib/firebase/recepcion.js')
      const res = await altaDeRecepcion({
        alta,
        pago: pagoEfectivo,
        academiaId,
        creadoPor: miUid,
      })
      setFicha(res)
      setAlta(ALTA_VACIA)
      setPago(PAGO_VACIO)
      setCobra(true)
      setIntentado(false)
    } catch (err) {
      // `altaDeRecepcion` lanza errores PROPIOS con texto útil («No se pudo
      // generar un código único…»), y esos hay que enseñarlos tal cual: el
      // mensaje genérico de conexión mandaría a mirar el wifi por un choque de
      // códigos. Solo los errores de Firebase —los que traen `code`— pasan por
      // el traductor, que es quien sabe leer un `permission-denied`.
      setError(err?.code
        ? mensajeError(err, 'No se pudo completar el alta', 'invitaciones y pagos')
        : (err?.message || 'No se pudo completar el alta.'))
    } finally {
      setGuardando(false)
    }
  }

  const otra = () => {
    setFicha(null)
    setError('')
    primerCampo.current?.focus()
  }

  return (
    <>
      {ficha
        ? <FichaDelAlta
            ficha={ficha}
            academiaNombre={academiaNombre}
            nombreGrupo={nombreGrupo}
            onOtra={otra}
          />
        : null}

      <form className="rec-form" onSubmit={enviar} noValidate>
        <section className="rec-bloque">
          <h2><Icon name="usuario" size={20} /> Quién entra</h2>
          <div className="rec-campos">
            <label className="rec-campo rec-campo--ancho">
              Nombre completo
              <input
                ref={primerCampo}
                type="text"
                autoFocus
                autoComplete="off"
                value={alta.nombre}
                onChange={campo('nombre')}
                placeholder="Como aparece en su identificación"
              />
            </label>
            <label className="rec-campo">
              Correo
              <input
                type="email"
                inputMode="email"
                autoComplete="off"
                value={alta.email}
                onChange={campo('email')}
                placeholder="nombre@correo.com"
              />
            </label>
            <label className="rec-campo">
              Teléfono
              <input
                type="tel"
                inputMode="tel"
                autoComplete="off"
                value={alta.telefono}
                onChange={campo('telefono')}
                placeholder="10 dígitos"
              />
            </label>
            <label className="rec-campo">
              Grupo
              {/* Agrupados por generación, como en el centro de invitaciones:
                  una academia con varios ciclos tiene nombres que se repiten. */}
              <select value={alta.grupoId} onChange={campo('grupoId')}>
                <option value="">— Elige el grupo —</option>
                {agruparPorGeneracion(grupos || []).map((bloque) => (
                  <optgroup key={bloque.clave} label={bloque.etiqueta}>
                    {bloque.grupos.map((g) => (
                      <option key={g.id} value={g.id}>{g.nombre}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            <label className="rec-campo rec-campo--ancho">
              Nota (opcional)
              <input
                type="text"
                value={alta.nota}
                onChange={campo('nota')}
                placeholder="Lo que haga falta recordar de esta alta"
              />
            </label>
          </div>
          <p className="rec-pie">
            El correo y el teléfono son obligatorios: son las dos vías por las que le llega su
            enlace. La matrícula la pone la academia sola, no se escribe aquí.
          </p>
        </section>

        <section className="rec-bloque">
          <h2><Icon name="llave" size={20} /> Primer pago</h2>
          <div className="rec-cobro">
            <label className="rec-check">
              <input type="checkbox" checked={cobra} onChange={(e) => setCobra(e.target.checked)} />
              <span>Cobré algo ahora</span>
            </label>
            {!cobra && <p className="rec-pie">Se da de alta sin registrar ningún pago.</p>}
          </div>

          {cobra && (
            <div className="rec-campos">
              <label className="rec-campo">
                Importe
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={pago.monto}
                  onChange={campoPago('monto')}
                  placeholder="0.00"
                />
              </label>
              <label className="rec-campo">
                Concepto
                <select value={pago.concepto} onChange={campoPago('concepto')}>
                  {CONCEPTOS_PAGO.map((c) => (
                    <option key={c.id} value={c.id}>{c.etiqueta}</option>
                  ))}
                </select>
              </label>
              <label className="rec-campo">
                Cómo pagó
                <select value={pago.metodo} onChange={campoPago('metodo')}>
                  {METODOS_PAGO.map((m) => (
                    <option key={m.id} value={m.id}>{m.etiqueta}</option>
                  ))}
                </select>
              </label>
              <label className="rec-campo">
                Referencia (opcional)
                <input
                  type="text"
                  value={pago.referencia}
                  onChange={campoPago('referencia')}
                  placeholder="Folio, últimos 4 dígitos…"
                />
              </label>
            </div>
          )}
        </section>

        {/* Qué falta, en cuanto se ha intentado guardar una vez. Antes de eso no
            se avisa de nada: nadie quiere que le señalen los huecos de un
            formulario que todavía está rellenando. */}
        {intentado && problemas.length > 0 && (
          <div className="rec-faltan" role="alert">
            <strong><Icon name="alerta" size={16} /> Falta esto para poder guardar</strong>
            <ul>
              {problemas.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        )}

        {error && <p className="rec-error" role="alert">{error}</p>}

        <div className="rec-acciones">
          <button type="submit" className="btn btn--pildora btn--primario" disabled={guardando}>
            {guardando ? 'Dando de alta…' : 'Dar de alta y reservar matrícula'}
          </button>
          <p className="rec-pie">
            La matrícula se reserva al guardar y ya no se reparte a nadie más, aunque después
            borres la invitación.
          </p>
        </div>
      </form>
    </>
  )
}

// ------------------------------------------------------------
//  La ficha del alta recién hecha
// ------------------------------------------------------------
//  Se queda en pantalla a propósito hasta que se cierra a mano: es lo que se le
//  dicta a la persona que está delante del mostrador.

function FichaDelAlta({ ficha, academiaNombre, nombreGrupo, onOtra }) {
  const { matricula, codigo, alta } = ficha
  const [copiado, setCopiado] = useState('')

  const enlace = enlaceInvitacion(codigo)
  const mensaje = textoDeBienvenida({
    nombre: alta.nombre,
    academiaNombre,
    enlace,
    matricula,
  })
  const whatsapp = enlaceWhatsApp(alta.telefono, mensaje)

  const copiar = (texto, que) => {
    try {
      navigator.clipboard.writeText(texto)
      setCopiado(que)
    } catch { /* sin permisos de portapapeles: queda el texto a la vista */ }
  }

  return (
    <section className="rec-ficha" aria-live="polite">
      <header className="rec-ficha-cab">
        <span className="rec-ficha-ok"><Icon name="check" size={18} /></span>
        <div>
          {/* Sin género: «dado/dada de alta» obliga a saber el de alguien que
              acaba de escribir su nombre en un mostrador, y acertar la mitad de
              las veces es fallar la otra mitad. */}
          <h2>{alta.nombre} ya tiene matrícula</h2>
          <p>
            Matrícula <code className="rec-mat">{matricula}</code>
            {alta.grupoId ? <> · Grupo {nombreGrupo(alta.grupoId)}</> : null}
          </p>
        </div>
        <button type="button" className="btn btn--pildora btn--carbon" onClick={onOtra}>
          Dar de alta a otra persona
        </button>
      </header>

      <p className="rec-pie">
        Todavía no tiene contraseña: el enlace le lleva a crearla. Hasta que entre, sus datos
        viven en la invitación.
      </p>

      <div className="rec-bienvenida">
        <button
          type="button"
          className="btn btn--pildora btn--primario"
          onClick={() => copiar(mensaje, 'mensaje')}
        >
          <Icon name="copiar" size={16} /> Copiar mensaje de bienvenida
        </button>
        <button
          type="button"
          className="btn btn--pildora btn--carbon"
          onClick={() => copiar(enlace, 'enlace')}
        >
          <Icon name="compartir" size={16} /> Copiar solo el enlace
        </button>
        {whatsapp && (
          <a
            className="btn btn--pildora btn--carbon"
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            Enviar por WhatsApp
          </a>
        )}
        {copiado && (
          <span className="rec-copiado" role="status">
            {copiado === 'mensaje' ? 'Mensaje copiado' : 'Enlace copiado'}
          </span>
        )}
      </div>

      <pre className="rec-mensaje">{mensaje}</pre>

      {/* El mismo compartidor que el resto de la academia: QR, tarjeta y
          «compartir» del sistema. No se reinventa aquí. */}
      <CompartirCodigo
        codigo={codigo}
        nombre={academiaNombre || 'la academia'}
        contexto={alta.grupoId ? nombreGrupo(alta.grupoId) : ''}
        tipo="invitacion"
        rol="alumno"
      />
    </section>
  )
}
