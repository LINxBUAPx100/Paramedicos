import { useMemo, useState } from 'react'
import Icon from '../Icon.jsx'
import HojaImprimible from './HojaImprimible.jsx'
import { imprimirHoja } from './imprimir.js'
import { useFicha } from '../../context/FichaStaffContext.jsx'
import {
  SECCIONES, construirReporte, nombreDeArchivo, problemasDelReporte, seleccionPorDefecto,
} from '../../lib/staff/reporteModelo.js'

// ============================================================
//  Armar el reporte y mandarlo a imprimir
// ------------------------------------------------------------
//  POR QUÉ NO HAY LIBRERÍA DE PDF, dicho una vez más aquí porque es donde se
//  buscará: el navegador ya sabe hacer PDF. `window.print()` sobre una hoja con
//  `@media print` ofrece «Guardar como PDF» y, en un mostrador, imprime directo
//  en la impresora de al lado. Una dependencia de ~300 kB haría exactamente lo
//  mismo en un proyecto que se ha peleado por bajar su paquete de 3 037 kB a
//  461 (trabajos P2 y P5).
//
//  EL TÍTULO DEL DOCUMENTO SE CAMBIA ANTES DE IMPRIMIR porque es lo que el
//  navegador propone como nombre del archivo al guardarlo. Sin eso, todos los
//  estados de cuenta se llamarían igual que la pestaña, y acaban los seis en la
//  misma carpeta sin poder distinguirse.
//
//  LO QUE SE VE ES LO QUE SE IMPRIME: la vista previa en pantalla es el MISMO
//  componente que la hoja. No hay una versión para mirar y otra para imprimir.
// ============================================================
export default function ArmadorDeReporte() {
  const { alumno, academia, grupo, cuenta, asistencias, ordenes, agenda } = useFicha()
  const [seleccion, setSeleccion] = useState(seleccionPorDefecto)
  const [previa, setPrevia] = useState(false)

  const problemas = problemasDelReporte(seleccion)

  const documento = useMemo(
    () => construirReporte({
      alumno, academia, grupo, seleccion,
      cuenta, asistencias, ordenes,
      evaluaciones: agenda.todas,
      ahora: new Date(),
    }),
    [alumno, academia, grupo, seleccion, cuenta, asistencias, ordenes, agenda.todas]
  )

  const imprimir = () => {
    if (problemas.length) return
    imprimirHoja(nombreDeArchivo({ alumno }), () => setPrevia(true))
  }

  const alternar = (id) => setSeleccion((s) => ({ ...s, [id]: !s[id] }))

  return (
    <section className="ui-panel staff-panel" aria-labelledby="staff-reporte-t">
      <h3 id="staff-reporte-t">Imprimir estado de cuenta</h3>

      <fieldset className="staff-casillas">
        <legend>Qué se imprime</legend>
        {SECCIONES.map((s) => (
          <label key={s.id}>
            <input type="checkbox" checked={Boolean(seleccion[s.id])} onChange={() => alternar(s.id)} />
            <span>
              <b>{s.etiqueta}</b>
              <em className="staff-ayuda">{s.descripcion}</em>
            </span>
          </label>
        ))}
      </fieldset>

      {problemas.length > 0 && (
        <ul className="ui-nota-error" role="alert">{problemas.map((p) => <li key={p}>{p}</li>)}</ul>
      )}

      <div className="ui-atajos">
        <button type="button" className="btn btn--primario" onClick={imprimir} disabled={problemas.length > 0}>
          <Icon name="descarga" size={18} /> Imprimir o guardar en PDF
        </button>
        <button type="button" className="btn btn--sm" onClick={() => setPrevia((p) => !p)}>
          <Icon name="ojo" size={16} /> {previa ? 'Ocultar la vista previa' : 'Ver cómo queda'}
        </button>
      </div>

      <p className="staff-ayuda">
        En el diálogo de impresión, elige «Guardar como PDF» como destino si quieres el archivo en
        vez del papel. El logo sale de la configuración de la academia.
      </p>

      {/* La hoja se monta SIEMPRE que haya previa, y la regla `@media print`
          de `staff.css` esconde todo lo demás al imprimir. */}
      {previa && (
        <div className="staff-previa-hoja">
          <HojaImprimible documento={documento} />
        </div>
      )}
    </section>
  )
}
