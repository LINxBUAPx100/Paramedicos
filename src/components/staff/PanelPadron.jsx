import { useCallback, useEffect, useMemo, useState } from 'react'
import Icon from '../Icon.jsx'
import HojaImprimible from './HojaImprimible.jsx'
import { imprimirHoja, nombreSimple } from './imprimir.js'
import { filtrarPadron, ordenarPadron, resumenDePadron } from '../../lib/staff/padronModelo.js'
import { construirPadron } from '../../lib/staff/reporteModelo.js'
import { textoDeError } from '../../lib/staff/avisos.js'
import BotonPersona from '../usuarios/BotonPersona.jsx'
import { resumenDeEmision, useMatriculasAlDia } from '../usuarios/useMatriculasAlDia.js'

// ============================================================
//  Alumnos — cuántos hay, quiénes son, y la hoja para imprimir
// ------------------------------------------------------------
//  «Cuántos alumnos hay» parece una cifra y son cuatro. Las dos últimas —sin
//  grupo y sin matrícula— NO son estadística, son listas de trabajo:
//
//   · sin grupo    → entró y no ve contenido, porque el plan de estudios
//                    cuelga del grupo;
//   · sin matrícula → no se le puede cobrar (la regla de `pagos` la exige) ni
//                    imprimirle un estado de cuenta.
//
//  Por eso se pueden pulsar: filtran la tabla a esas personas para poder
//  arreglarlas una por una, no solo contarlas.
//
//  SE IMPRIME LO QUE SE VE. La hoja se arma con las filas YA filtradas: si se
//  imprimiera la lista entera, el botón dejaría de ser de fiar en cuanto
//  alguien lo comprobara una vez.
// ============================================================
export default function PanelPadron({ academiaId, academia, grupos = [], onAbrirFicha, onAlta }) {
  const [personas, setPersonas] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [texto, setTexto] = useState('')
  const [grupo, setGrupo] = useState('')
  const [columnas, setColumnas] = useState({ matricula: true, grupo: true, contacto: false })
  const [soloSinMatricula, setSoloSinMatricula] = useState(false)
  const [previa, setPrevia] = useState(false)

  const cargar = useCallback(async (recargar = false) => {
    if (!academiaId) return
    setCargando(true)
    setError('')
    try {
      const { padronDeAcademia } = await import('../../lib/firebase/staff/alumnos.js')
      setPersonas(await padronDeAcademia(academiaId, { recargar }))
    } catch (err) {
      setError(textoDeError(err, 'No se pudo cargar el padrón', 'usuarios'))
    } finally {
      setCargando(false)
    }
  }, [academiaId])

  useEffect(() => { cargar() }, [cargar])

  // LAS MATRÍCULAS QUE FALTAN SE EMITEN SOLAS AL ABRIR ESTA PANTALLA.
  //
  // «Sin matrícula» era una lista de trabajo que había que recorrer a mano, con
  // un botón por persona. Desde el 21-09-2026 no: quien tenga un grupo que
  // cumple los parámetros recibe la suya al entrar aquí. Los que quedan en la
  // lista son exactamente los que NO se pueden emitir —sin grupo, o con un
  // grupo al que le falta generación, fecha, día único u hora—, y eso sí es
  // trabajo de verdad.
  const emision = useMatriculasAlDia({
    personas,
    grupos,
    academiaId,
    activo: !cargando,
    alEmitir: () => cargar(true),
  })
  const avisoEmision = resumenDeEmision(emision)

  const resumen = useMemo(() => resumenDePadron(personas, grupos), [personas, grupos])
  const todas = useMemo(() => ordenarPadron(personas, grupos), [personas, grupos])
  const filas = useMemo(() => filtrarPadron(todas, { texto, grupo }), [todas, texto, grupo])
  // Lo que de verdad se está viendo, que es lo único que debe imprimirse.
  const visibles = useMemo(
    () => (soloSinMatricula ? filas.filter((f) => !f.matricula) : filas),
    [filas, soloSinMatricula]
  )

  const documento = useMemo(
    () => construirPadron({ academia, filas: visibles, resumen, columnas, ahora: new Date() }),
    [academia, visibles, resumen, columnas]
  )

  // Índice por uid. La tabla lo consulta una vez por fila, y con `find` sobre
  // el padrón entero eso es cuadrático: con doscientos alumnos se nota al
  // teclear en el filtro.
  const porUid = useMemo(
    () => new Map(personas.map((p) => [p.uid || p.id, p])),
    [personas]
  )

  const imprimir = () => imprimirHoja(nombreSimple('padron'), () => setPrevia(true))

  // Las dos cifras que son listas de trabajo se pueden pulsar: filtran la tabla
  // a esas personas para poder arreglarlas una por una, no solo contarlas.
  const verSinGrupo = () => { setTexto(''); setSoloSinMatricula(false); setGrupo('__sin__') }
  const verSinMatricula = () => { setTexto(''); setGrupo(''); setSoloSinMatricula(true) }

  return (
    <section className="ui-panel staff-panel" aria-labelledby="staff-padron-t">
      <h3 id="staff-padron-t">Alumnos</h3>

      {error && <p className="ui-nota-error" role="alert">{error}</p>}
      {cargando && <p className="staff-ayuda" role="status">Contando…</p>}

      <div className="staff-cifras">
        <p><span>Activos</span><b>{resumen.total}</b></p>
        <button type="button" className="staff-cifra-boton" onClick={verSinGrupo}>
          <span>Sin grupo</span><b>{resumen.sinGrupo.length}</b>
        </button>
        <button type="button" className="staff-cifra-boton" onClick={verSinMatricula}>
          <span>Sin matrícula</span><b>{resumen.sinMatricula.length}</b>
        </button>
        <p><span>Suspendidos o de baja</span><b>{resumen.suspendidos}</b></p>
      </div>

      {resumen.sinGrupo.length > 0 && (
        <p className="staff-ayuda">
          Quien no tiene grupo entra y no ve contenido: el plan de estudios cuelga del grupo. Y
          tampoco puede tener matrícula, que sale de la generación, el mes, el día y el turno de
          su grupo.
        </p>
      )}

      {avisoEmision && <p className="staff-aviso" role="status">{avisoEmision}</p>}

      <div className="ui-herramientas">
        <label className="ui-campo">
          <span>Filtrar</span>
          <input
            type="search" value={texto} placeholder="Nombre, matrícula, correo…"
            onChange={(e) => { setTexto(e.target.value); setSoloSinMatricula(false) }}
          />
        </label>
        <label className="ui-campo">
          <span>Grupo</span>
          <select
            value={grupo}
            onChange={(e) => { setGrupo(e.target.value); setSoloSinMatricula(false) }}
          >
            <option value="">Todos</option>
            <option value="__sin__">Sin grupo</option>
            {grupos.map((g) => (
              <option key={g.id} value={g.nombre || g.id}>{g.nombre || g.id}</option>
            ))}
          </select>
        </label>
        <div className="ui-atajos">
          <button type="button" className="btn btn--sm" onClick={() => cargar(true)}>
            <Icon name="restaurar" size={16} /> Actualizar
          </button>
          <button type="button" className="btn btn--sm btn--primario" onClick={onAlta}>
            <Icon name="mas" size={16} /> Dar de alta
          </button>
        </div>
      </div>

      <fieldset className="staff-casillas staff-casillas--linea">
        <legend>Qué columnas se imprimen</legend>
        {[['matricula', 'Matrícula'], ['grupo', 'Grupo'], ['contacto', 'Correo y teléfono']].map(([id, etiqueta]) => (
          <label key={id}>
            <input
              type="checkbox"
              checked={Boolean(columnas[id])}
              onChange={() => setColumnas((c) => ({ ...c, [id]: !c[id] }))}
            />
            <span><b>{etiqueta}</b></span>
          </label>
        ))}
      </fieldset>

      <div className="ui-atajos">
        <button type="button" className="btn btn--primario" onClick={imprimir} disabled={visibles.length === 0}>
          <Icon name="descarga" size={18} /> Imprimir o guardar en PDF
        </button>
        <button type="button" className="btn btn--sm" onClick={() => setPrevia((p) => !p)}>
          <Icon name="ojo" size={16} /> {previa ? 'Ocultar la vista previa' : 'Ver cómo queda'}
        </button>
        <span className="staff-ayuda">Se imprime exactamente lo que estás viendo: {visibles.length} de {todas.length}.</span>
      </div>

      <div className="ui-tabla-wrap">
        <table className="ui-tabla">
          <thead>
            <tr><th>Nombre</th><th>Matrícula</th><th>Grupo</th><th>Contacto</th><th /></tr>
          </thead>
          <tbody>
            {visibles.map((f) => (
              <tr key={f.uid}>
                {/* El nombre abre la FICHA de persona (datos y edición);
                    el botón de la derecha abre su mostrador, que es otra
                    cosa: asistencia, caja, tienda y mensajes. */}
                <td><BotonPersona persona={porUid.get(f.uid)} /></td>
                <td>{f.matricula || <span className="ui-etiqueta ui-etiqueta--riesgo">sin matrícula</span>}</td>
                <td>{f.grupo || <span className="ui-etiqueta ui-etiqueta--riesgo">sin grupo</span>}</td>
                <td>{f.email || f.telefono || '—'}</td>
                <td>
                  <button
                    type="button" className="ui-enlace"
                    onClick={() => onAbrirFicha?.(personas.find((p) => (p.uid || p.id) === f.uid))}
                  >
                    Abrir ficha
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visibles.length === 0 && !cargando && (
        <p className="staff-ayuda">Ningún alumno coincide con el filtro.</p>
      )}

      {previa && (
        <div className="staff-previa-hoja">
          <HojaImprimible documento={documento} />
        </div>
      )}
    </section>
  )
}
