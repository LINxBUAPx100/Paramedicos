import { useCallback, useEffect, useMemo, useState } from 'react'
import Icon from '../Icon.jsx'
import HojaImprimible from './HojaImprimible.jsx'
import { imprimirHoja, nombreSimple } from './imprimir.js'
import { etiquetaConcepto, etiquetaMetodo, fechaCorta, moneda, ordenarPagos } from '../../lib/staff/cajaModelo.js'
import { construirCorte } from '../../lib/staff/reporteModelo.js'
import { textoDeError } from '../../lib/staff/avisos.js'

// ============================================================
//  Corte de caja — lo cobrado hoy, para cuadrar el cajón
// ------------------------------------------------------------
//  ESTO ES LO ADMINISTRATIVO DE LOS PAGOS, y es distinto de la caja de la
//  ficha: allí se cobra a UNA persona, aquí se mira el día entero.
//
//  «Por método» va antes que el detalle a propósito: lo que se cuadra contra
//  el dinero del cajón es el total en efectivo, no la lista de asientos. El
//  detalle está debajo para buscar uno concreto cuando algo no cuadra.
//
//  No hay aquí ningún botón que corrija un cobro, y no es un olvido: el importe,
//  el método y la fecha son inmutables por regla, porque editar el primer
//  asiento destruye la prueba de lo que se apuntó. El CONCEPTO sí lo puede
//  corregir la dirección, pero desde la ficha de la persona (PanelCaja): es
//  donde se ve de quién es ese pago y qué más le han cobrado.
//
//  Y SI FALTA EL ÍNDICE DE `pagos` POR FECHA, esta pantalla lo DICE. Antes
//  devolvía cero sin más, que es la peor forma de fallar que puede tener un
//  corte de caja: se lee como «hoy no se cobró nada».
// ============================================================

/** Los tres cortes que se piden de verdad en un mostrador. */
const PERIODOS = [
  { id: 'hoy', etiqueta: 'Hoy', desde: () => new Date(new Date().setHours(0, 0, 0, 0)) },
  { id: 'semana', etiqueta: 'Últimos 7 días', desde: () => new Date(Date.now() - 7 * 864e5) },
  { id: 'mes', etiqueta: 'Últimos 30 días', desde: () => new Date(Date.now() - 30 * 864e5) },
]

export default function PanelCorte({ academiaId, academia }) {
  const [periodo, setPeriodo] = useState('hoy')
  const [pagos, setPagos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  // Un corte que sale en blanco porque falta un índice se lee como «hoy no se
  // cobró nada», y con eso se cuadra mal una caja. Este aviso es esa diferencia.
  const [aviso, setAviso] = useState('')
  const [previa, setPrevia] = useState(false)

  const desde = useMemo(
    () => (PERIODOS.find((p) => p.id === periodo) || PERIODOS[0]).desde(),
    [periodo]
  )

  const cargar = useCallback(async () => {
    if (!academiaId) return
    setCargando(true)
    setError('')
    try {
      const { cobrosDelDia } = await import('../../lib/firebase/staff/caja.js')
      const r = await cobrosDelDia({ academiaId, desde })
      setPagos(ordenarPagos(r.pagos))
      setAviso(r.aviso || '')
    } catch (err) {
      setError(textoDeError(err, 'No se pudo cargar el corte', 'pagos'))
      setPagos([])
    } finally {
      setCargando(false)
    }
  }, [academiaId, desde])

  useEffect(() => { cargar() }, [cargar])

  const total = pagos.reduce((s, p) => s + (Number(p.monto) || 0), 0)
  const porMetodo = useMemo(() => {
    const mapa = new Map()
    for (const p of pagos) {
      const fila = mapa.get(p.metodo) || { metodo: p.metodo, total: 0, veces: 0 }
      fila.total += p.monto
      fila.veces += 1
      mapa.set(p.metodo, fila)
    }
    return [...mapa.values()].sort((a, b) => b.total - a.total)
  }, [pagos])

  const documento = useMemo(
    () => construirCorte({ academia, pagos, desde, ahora: new Date() }),
    [academia, pagos, desde]
  )

  return (
    <section className="ui-panel staff-panel" aria-labelledby="staff-corte-t">
      <h3 id="staff-corte-t">Corte de caja</h3>

      <div className="ui-herramientas">
        <label className="ui-campo">
          <span>Periodo</span>
          <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
            {PERIODOS.map((p) => <option key={p.id} value={p.id}>{p.etiqueta}</option>)}
          </select>
        </label>
        <div className="ui-atajos">
          <button type="button" className="btn btn--sm" onClick={cargar}>
            <Icon name="restaurar" size={16} /> Actualizar
          </button>
          <button
            type="button" className="btn btn--sm btn--primario"
            onClick={() => imprimirHoja(nombreSimple(`corte-${periodo}`), () => setPrevia(true))}
            disabled={pagos.length === 0}
          >
            <Icon name="descarga" size={16} /> Imprimir
          </button>
        </div>
      </div>

      {error && <p className="ui-nota-error" role="alert">{error}</p>}
      {aviso && <p className="ui-nota-error" role="alert">{aviso}</p>}
      {cargando && <p className="staff-ayuda" role="status">Sumando…</p>}

      <div className="staff-cifras">
        <p><span>Cobrado</span><b>{moneda(total)}</b></p>
        <p><span>Movimientos</span><b>{pagos.length}</b></p>
      </div>

      <h4>Por método de pago</h4>
      {porMetodo.length === 0
        ? <p className="staff-ayuda">Sin cobros en este periodo.</p>
        : (
          <ul className="staff-lista-dias">
            {porMetodo.map((m) => (
              <li key={m.metodo}>
                <span className="staff-dia">{etiquetaMetodo(m.metodo)} · {m.veces} mov.</span>
                <span className="staff-hora">{moneda(m.total)}</span>
              </li>
            ))}
          </ul>
        )}

      <h4>Detalle</h4>
      {pagos.length === 0
        ? <p className="staff-ayuda">Nada que mostrar.</p>
        : (
          <div className="ui-tabla-wrap">
            <table className="ui-tabla">
              <thead>
                <tr><th>Hora</th><th>Matrícula</th><th>Concepto</th><th>Método</th><th>Importe</th></tr>
              </thead>
              <tbody>
                {pagos.map((p) => (
                  <tr key={p.id}>
                    <td>{fechaCorta(p.fecha)}</td>
                    <td>{p.matricula || '—'}</td>
                    <td>{etiquetaConcepto(p.concepto)}</td>
                    <td>{etiquetaMetodo(p.metodo)}</td>
                    <td>{moneda(p.monto)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      <p className="staff-ayuda">
        El importe de un cobro no se edita ni se borra: una corrección de dinero se hace con otro
        asiento. La dirección sí puede corregir el <b>concepto</b> desde la ficha de la persona.
      </p>

      {previa && (
        <div className="staff-previa-hoja">
          <HojaImprimible documento={documento} />
        </div>
      )}
    </section>
  )
}
