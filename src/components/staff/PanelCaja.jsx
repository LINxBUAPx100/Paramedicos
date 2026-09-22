import { useMemo, useState } from 'react'
import Icon from '../Icon.jsx'
import { useFicha } from '../../context/FichaStaffContext.jsx'
import {
  CONCEPTOS_PAGO, METODOS_PAGO, etiquetaConcepto, etiquetaMetodo,
  fechaCorta, moneda, problemasDelCobro,
} from '../../lib/staff/cajaModelo.js'
import { problemasDelAdeudo } from '../../lib/staff/adeudosModelo.js'
import { textoDeError } from '../../lib/staff/avisos.js'

// ============================================================
//  Punto de venta — cobrar y ver el historial
// ------------------------------------------------------------
//  EL DINERO DE UN COBRO NO SE PUEDE EDITAR DESPUÉS, y la pantalla lo dice
//  antes de cobrar, no después. El importe, el método y la fecha son la prueba
//  de lo que se apuntó, y con ellos se cuadra una caja: una corrección de
//  dinero se hace con otro asiento, no reescribiendo el primero.
//
//  EL CONCEPTO SÍ, Y SOLO LA DIRECCIÓN (21-09-2026). Teclear «mensualidad»
//  donde era «inscripción» es el error más común del mostrador y dejaba el
//  corte de caja mal repartido para siempre. No es dinero: es la clasificación
//  de por qué entró. Lo corrigen el director y el super-admin —no recepción,
//  que es quien se equivoca—, la regla lo acota con un `hasOnly` por el que no
//  cabe un importe, y queda rastro en el asiento y en `historial`.
//
//  Por eso el botón pide confirmación con el importe dentro: es la última
//  oportunidad de ver un cero de más.
// ============================================================
// `adeudoId` viaja en el propio cobro: es lo que convierte un cobro en un
// ABONO a un compromiso concreto. Vacío = cobro suelto, como siempre.
const COBRO_VACIO = { monto: '', concepto: 'mensualidad', metodo: 'efectivo', referencia: '', nota: '', adeudoId: '' }
const ADEUDO_VACIO = { total: '', concepto: 'mensualidad', vence: '', descripcion: '' }

export default function PanelCaja() {
  const { alumno, academiaId, miUid, cuenta, recargar, puedeCorregirPagos } = useFicha()
  const [cobro, setCobro] = useState(COBRO_VACIO)
  const [intentado, setIntentado] = useState(false)
  const [confirmando, setConfirmando] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [corrigiendo, setCorrigiendo] = useState('')

  const corregir = async (pago, concepto) => {
    setCorrigiendo(pago.id)
    setError('')
    setAviso('')
    try {
      const { corregirConcepto } = await import('../../lib/firebase/staff/caja.js')
      const r = await corregirConcepto({ pago, concepto, academiaId, registradoPor: miUid })
      if (r.cambiado) {
        setAviso(r.auditado
          ? `Concepto corregido a «${etiquetaConcepto(concepto)}». El importe no se tocó.`
          : `Concepto corregido a «${etiquetaConcepto(concepto)}», pero NO se pudo escribir la línea de auditoría.`)
      }
      await recargar()
    } catch (err) {
      setError(textoDeError(err, 'No se pudo corregir el concepto', 'pagos'))
    } finally {
      setCorrigiendo('')
    }
  }

  const problemas = useMemo(
    () => problemasDelCobro(cobro, { matricula: alumno?.matricula }),
    [cobro, alumno?.matricula]
  )

  const campo = (k) => (e) => {
    setCobro((c) => ({ ...c, [k]: e.target.value }))
    setConfirmando(false)
  }

  const enviar = async (e) => {
    e.preventDefault()
    setIntentado(true)
    setError('')
    setAviso('')
    if (problemas.length) return
    // Primer envío: pedir confirmación. Segundo: cobrar.
    if (!confirmando) { setConfirmando(true); return }
    setGuardando(true)
    try {
      const { cobrar } = await import('../../lib/firebase/staff/caja.js')
      const res = await cobrar({ cobro, alumno, academiaId, registradoPor: miUid })
      const base = res.auditado
        ? `Cobro registrado: ${moneda(cobro.monto)}.`
        : `Cobro registrado: ${moneda(cobro.monto)}. No se pudo escribir su línea de auditoría.`
      // Decir si el compromiso quedó saldado es la mitad del trabajo: es lo que
      // hay que contestarle a quien acaba de pagar.
      setAviso(cobro.adeudoId
        ? `${base} ${res.liquidado ? 'Con esto queda LIQUIDADO.' : 'Queda como abono; el resto sigue pendiente.'}`
        : base)
      setCobro(COBRO_VACIO)
      setIntentado(false)
      setConfirmando(false)
      await recargar()
    } catch (err) {
      setError(textoDeError(err, 'No se pudo registrar el cobro', 'pagos'))
      setConfirmando(false)
    } finally {
      setGuardando(false)
    }
  }

  // --- COMPROMISOS DE PAGO (21-09-2026) -------------------------------------
  //
  //  ABONAR ES COBRAR: no hay un botón «abonar» que escriba en el compromiso por
  //  su cuenta. Lo que hace `prepararAbono` es rellenar el formulario de cobro de
  //  arriba —importe, concepto y a qué compromiso se aplica— para que el dinero
  //  pase por el mismo sitio, con su confirmación y su asiento. Un camino
  //  paralelo para mover dinero es exactamente lo que descuadra una caja.
  const [nuevo, setNuevo] = useState(ADEUDO_VACIO)
  const [intentadoNuevo, setIntentadoNuevo] = useState(false)
  const [ocupadoAdeudo, setOcupadoAdeudo] = useState('')
  const problemasNuevo = useMemo(() => problemasDelAdeudo(nuevo), [nuevo])

  const prepararAbono = (compromiso, monto) => {
    setCobro((c) => ({
      ...c,
      monto: monto === '' ? '' : String(monto),
      concepto: compromiso.concepto,
      adeudoId: compromiso.id,
    }))
    setConfirmando(false)
    setIntentado(false)
    setAviso(`Cobrando a cuenta de «${etiquetaConcepto(compromiso.concepto)}»: faltan ${moneda(compromiso.saldo)}. Revisa el importe y registra el cobro.`)
    // El formulario está arriba del todo; sin esto, en una tableta parece que el
    // botón no hizo nada.
    document.getElementById('staff-caja-t')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const apuntarCompromiso = async () => {
    setIntentadoNuevo(true)
    if (problemasNuevo.length) return
    setOcupadoAdeudo('crear')
    setError('')
    setAviso('')
    try {
      const { crearAdeudo } = await import('../../lib/firebase/staff/adeudos.js')
      await crearAdeudo({ adeudo: nuevo, alumno, academiaId, registradoPor: miUid })
      setNuevo(ADEUDO_VACIO)
      setIntentadoNuevo(false)
      setAviso('Compromiso apuntado. No movió dinero: aparece en su cuenta hasta que se abone.')
      await recargar()
    } catch (err) {
      setError(textoDeError(err, 'No se pudo apuntar el compromiso', 'adeudos'))
    } finally {
      setOcupadoAdeudo('')
    }
  }

  const cancelarCompromiso = async (compromiso) => {
    const seguro = window.confirm(
      `¿Cancelar «${etiquetaConcepto(compromiso.concepto)}» por ${moneda(compromiso.saldo)}?\n\n`
      + 'Deja de reclamarse lo que falta. Los abonos ya cobrados NO se devuelven ni se borran: son pagos.'
    )
    if (!seguro) return
    setOcupadoAdeudo(compromiso.id)
    setError('')
    try {
      const { cancelarAdeudo } = await import('../../lib/firebase/staff/adeudos.js')
      await cancelarAdeudo({ adeudoId: compromiso.id, academiaId })
      setAviso('Compromiso cancelado. Lo que ya se había cobrado sigue en su historial.')
      await recargar()
    } catch (err) {
      setError(textoDeError(err, 'No se pudo cancelar el compromiso', 'adeudos'))
    } finally {
      setOcupadoAdeudo('')
    }
  }

  return (
    <section className="ui-panel staff-panel" aria-labelledby="staff-caja-t">
      <h3 id="staff-caja-t">Caja</h3>

      <div className="staff-saldo">
        <p><span>Pagado en total</span><b>{moneda(cuenta.pagado)}</b></p>
        <p className={cuenta.saldo > 0 ? 'staff-saldo--deuda' : ''}>
          <span>Saldo pendiente</span><b>{moneda(cuenta.saldo)}</b>
        </p>
        {cuenta.vencido > 0 && (
          <p className="staff-saldo--deuda">
            <span>De eso, VENCIDO</span><b>{moneda(cuenta.vencido)}</b>
          </p>
        )}
      </div>
      <p className="staff-ayuda">{cuenta.alcance}</p>

      <form onSubmit={enviar} className="staff-form">
        <div className="ui-herramientas">
          <label className="ui-campo">
            <span>Importe</span>
            <input
              type="number" min="1" step="0.01" inputMode="decimal"
              value={cobro.monto} onChange={campo('monto')} placeholder="0.00"
            />
          </label>
          <label className="ui-campo">
            <span>Concepto</span>
            <select value={cobro.concepto} onChange={campo('concepto')}>
              {CONCEPTOS_PAGO.map((c) => <option key={c.id} value={c.id}>{c.etiqueta}</option>)}
            </select>
          </label>
          <label className="ui-campo">
            <span>Método de pago</span>
            <select value={cobro.metodo} onChange={campo('metodo')}>
              {METODOS_PAGO.map((m) => <option key={m.id} value={m.id}>{m.etiqueta}</option>)}
            </select>
          </label>
          <label className="ui-campo">
            <span>Referencia <em>(opcional)</em></span>
            <input type="text" value={cobro.referencia} onChange={campo('referencia')} maxLength={60} />
          </label>
        </div>

        {intentado && problemas.length > 0 && (
          <ul className="ui-nota-error" role="alert">
            {problemas.map((p) => <li key={p}>{p}</li>)}
          </ul>
        )}

        <button type="submit" className="btn btn--primario" disabled={guardando}>
          <Icon name="check" size={18} />
          {guardando
            ? 'Registrando…'
            : (confirmando
              ? `Confirmar ${moneda(cobro.monto)} en ${etiquetaMetodo(cobro.metodo).toLowerCase()}`
              : 'Registrar cobro')}
        </button>
        {confirmando && (
          <p className="staff-aviso" role="status">
            El importe de un cobro registrado no se puede editar ni borrar: una corrección de dinero
            se hace con otro asiento. Comprueba el importe y confirma.
          </p>
        )}
      </form>

      {aviso && <p className="staff-aviso" role="status">{aviso}</p>}
      {error && <p className="ui-nota-error" role="alert">{error}</p>}

      <h4>Compromisos de pago</h4>
      <p className="staff-ayuda">
        Lo que esta persona quedó a deber, con sus abonos. <b>Un compromiso no es dinero</b>: en
        caja solo entra lo que se cobra, así que apuntar aquí $3 000 y recibir $500 deja $500 en el
        cajón y $2 500 pendientes, sin faltantes.
      </p>

      {cuenta.compromisos.length === 0
        ? <p className="staff-ayuda">No tiene compromisos apuntados.</p>
        : (
          <ul className="staff-compromisos">
            {cuenta.compromisos.map((c) => (
              <li key={c.id} className={`staff-compromiso staff-compromiso--${c.estado}${c.vencido ? ' es-vencido' : ''}`}>
                <div className="staff-compromiso-cab">
                  <b>{etiquetaConcepto(c.concepto)}</b>
                  <span className={`ui-etiqueta ${c.vencido ? 'ui-etiqueta--riesgo' : ''}`}>{c.etiqueta}</span>
                </div>
                {c.descripcion && <p className="staff-ayuda">{c.descripcion}</p>}
                <p className="staff-total">
                  <span>
                    {moneda(c.abonado)} de {moneda(c.total)}{c.vence ? ` · vence ${c.vence}` : ''}
                  </span>
                  <b>{c.saldo > 0 ? `Faltan ${moneda(c.saldo)}` : 'Liquidado'}</b>
                </p>

                {/* Los abonos: el «historial» que se pidió. Hay que poder
                    enseñar qué se pagó y cuándo, no solo el saldo. */}
                {c.abonos.length > 0 && (
                  <ul className="staff-abonos">
                    {c.abonos.map((a) => (
                      <li key={a.id}>
                        <span>{fechaCorta(a.fecha || a.creado)} · {etiquetaMetodo(a.metodo)}</span>
                        <b>{moneda(a.monto)}</b>
                      </li>
                    ))}
                  </ul>
                )}

                {c.saldo > 0 && c.estado !== 'cancelado' && (
                  <div className="staff-orden-acciones">
                    <button
                      type="button" className="btn btn--sm btn--primario"
                      onClick={() => prepararAbono(c, c.saldo)}
                    >
                      Liquidar {moneda(c.saldo)}
                    </button>
                    <button type="button" className="btn btn--sm" onClick={() => prepararAbono(c, '')}>
                      Abonar una parte
                    </button>
                    <button
                      type="button" className="ui-enlace"
                      onClick={() => cancelarCompromiso(c)}
                      disabled={Boolean(ocupadoAdeudo)}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

      {/* Apuntar un compromiso NUEVO. Plegado y debajo de la lista: lo
          frecuente en un mostrador es cobrar, no prometer. */}
      <details className="staff-detalle">
        <summary>Apuntar un compromiso de pago</summary>
        <div className="ui-herramientas">
          <label className="ui-campo">
            <span>Importe total</span>
            <input
              type="number" min="1" step="0.01" inputMode="decimal"
              value={nuevo.total} placeholder="0.00"
              onChange={(e) => setNuevo((n) => ({ ...n, total: e.target.value }))}
            />
          </label>
          <label className="ui-campo">
            <span>Concepto</span>
            <select value={nuevo.concepto} onChange={(e) => setNuevo((n) => ({ ...n, concepto: e.target.value }))}>
              {CONCEPTOS_PAGO.map((c) => <option key={c.id} value={c.id}>{c.etiqueta}</option>)}
            </select>
          </label>
          <label className="ui-campo">
            <span>Vence <em>(opcional)</em></span>
            <input
              type="date" value={nuevo.vence}
              onChange={(e) => setNuevo((n) => ({ ...n, vence: e.target.value }))}
            />
          </label>
          <label className="ui-campo">
            <span>Detalle <em>(opcional)</em></span>
            <input
              type="text" maxLength={200} value={nuevo.descripcion}
              placeholder="Colegiatura de noviembre, examen…"
              onChange={(e) => setNuevo((n) => ({ ...n, descripcion: e.target.value }))}
            />
          </label>
        </div>
        {intentadoNuevo && problemasNuevo.length > 0 && (
          <ul className="ui-nota-error" role="alert">{problemasNuevo.map((p) => <li key={p}>{p}</li>)}</ul>
        )}
        <button
          type="button" className="btn btn--sm"
          onClick={apuntarCompromiso}
          disabled={ocupadoAdeudo === 'crear'}
        >
          {ocupadoAdeudo === 'crear' ? 'Apuntando…' : 'Apuntar compromiso'}
        </button>
      </details>

      <h4>Historial de pagos</h4>
      {puedeCorregirPagos && cuenta.pagos.length > 0 && (
        <p className="staff-ayuda">
          Puedes corregir el <b>concepto</b> de un pago ya registrado: es la clasificación con la
          que se reparte el corte de caja. El importe, el método y la fecha no se tocan — para eso
          se registra otro asiento.
        </p>
      )}
      {cuenta.pagos.length === 0
        ? <p className="staff-ayuda">Sin pagos registrados.</p>
        : (
          <div className="ui-tabla-wrap">
            <table className="ui-tabla">
              <thead>
                <tr><th>Fecha</th><th>Concepto</th><th>Método</th><th>Referencia</th><th>Importe</th></tr>
              </thead>
              <tbody>
                {cuenta.pagos.map((p) => (
                  <tr key={p.id}>
                    <td>{fechaCorta(p.fecha)}</td>
                    <td>
                      {puedeCorregirPagos ? (
                        <label className="ui-campo staff-concepto">
                          <span className="staff-sr">Concepto del pago del {fechaCorta(p.fecha)}</span>
                          <select
                            value={p.concepto}
                            disabled={corrigiendo === p.id}
                            onChange={(e) => corregir(p, e.target.value)}
                          >
                            {CONCEPTOS_PAGO.map((c) => <option key={c.id} value={c.id}>{c.etiqueta}</option>)}
                          </select>
                        </label>
                      ) : etiquetaConcepto(p.concepto)}
                      {p.conceptoCorregidoPor && (
                        <span className="staff-ayuda staff-nota-corregido">Concepto corregido por la dirección</span>
                      )}
                    </td>
                    <td>{etiquetaMetodo(p.metodo)}</td>
                    <td>{p.referencia || '—'}</td>
                    <td>{moneda(p.monto)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </section>
  )
}
