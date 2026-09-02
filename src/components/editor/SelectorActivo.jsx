// ============================================================
//  SelectorActivo — elegir una imagen médica del catálogo
// ------------------------------------------------------------
//  Antes, para poner una imagen en una lección había que pegar una URL a mano.
//  Eso tenía dos consecuencias: la URL solía ser de Google Drive (que no
//  garantiza el hotlink) y la imagen llegaba SIN autoría, así que no se podía
//  atribuir aunque su licencia lo exigiera.
//
//  Aquí se elige por concepto, no por URL. Al seleccionar un activo llegan de
//  una vez la ruta local, el texto alternativo escrito a mano, la descripción
//  ampliada y el crédito, que se muestra debajo para que quien edita SEPA qué
//  obligación asume al usar esa figura.
//
//  Detalles que no son adorno:
//   · la búsqueda mira título, autor, etiquetas e identificador, porque quien
//     edita busca «riñón», no «cp-servier-rinon»;
//   · se ven las miniaturas: elegir una figura anatómica por su nombre a ciegas
//     es como elegir una radiografía por el nombre del archivo;
//   · el crédito se muestra ANTES de guardar, no después.
// ============================================================
import { useMemo, useState } from 'react'
import MedicalIcon from '../MedicalIcon.jsx'
import { todosLosActivos, creditoDe } from '../../lib/creditosActivos.js'

const POR_PAGINA = 24

export default function SelectorActivo({ id, valor, onCambio, disabled }) {
  const [q, setQ] = useState('')
  const [abierto, setAbierto] = useState(false)
  const credito = valor ? creditoDe(valor) : null

  const resultados = useMemo(() => {
    const t = q.trim().toLowerCase()
    const base = todosLosActivos
    if (!t) return base.slice(0, POR_PAGINA)
    return base.filter((a) => (
      a.title.toLowerCase().includes(t)
      || a.id.includes(t)
      || a.originalCreator.name.toLowerCase().includes(t)
      || (a.tags || []).some((x) => x.toLowerCase().includes(t))
      || (a.accesibilidad?.alt || '').toLowerCase().includes(t)
    )).slice(0, POR_PAGINA)
  }, [q])

  return (
    <div className="editor-campo sel-activo">
      <label htmlFor={id}>Imagen del catálogo médico</label>

      {credito ? (
        <div className="sel-activo-elegido">
          <MedicalIcon id={valor} size={44} etiqueta={credito.titulo} />
          <div className="sel-activo-elegido-txt">
            <strong>{credito.titulo}</strong>
            <span className="sel-activo-cred">
              {credito.autor} · {credito.proveedor} · {credito.licencia.id}
              {credito.exigeAtribucion && ' · exige atribución (se muestra sola junto a la figura)'}
            </span>
            <code>{valor}</code>
          </div>
          <button
            type="button"
            className="sel-activo-quitar"
            disabled={disabled}
            onClick={() => onCambio('')}
          >
            Quitar
          </button>
        </div>
      ) : (
        <p className="editor-nota">
          Sin imagen del catálogo. Elige una y no hará falta pegar ninguna URL:
          la ruta, el texto alternativo y el crédito llegan con ella.
        </p>
      )}

      <button
        type="button"
        className="sel-activo-abrir"
        disabled={disabled}
        aria-expanded={abierto}
        onClick={() => setAbierto((v) => !v)}
      >
        {abierto ? 'Cerrar el catálogo' : (valor ? 'Cambiar de imagen' : 'Elegir del catálogo')}
      </button>

      {abierto && (
        <div className="sel-activo-panel">
          <input
            id={id}
            type="search"
            value={q}
            disabled={disabled}
            placeholder="Buscar: riñón, quemadura, ECG, columna…"
            onChange={(e) => setQ(e.target.value)}
          />
          <p className="editor-nota">
            {resultados.length === POR_PAGINA
              ? `Mostrando los primeros ${POR_PAGINA}; afina la búsqueda para ver más.`
              : `${resultados.length} resultado(s) de ${todosLosActivos.length} activos.`}
          </p>
          <ul className="sel-activo-rejilla">
            {resultados.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  className={`sel-activo-item${a.id === valor ? ' es-actual' : ''}`}
                  disabled={disabled}
                  onClick={() => { onCambio(a.id); setAbierto(false) }}
                  title={a.accesibilidad?.alt || a.title}
                >
                  <MedicalIcon id={a.id} size={54} />
                  <span className="sel-activo-item-tit">{a.title}</span>
                  <span className="sel-activo-item-lic">{a.license.id}</span>
                </button>
              </li>
            ))}
          </ul>
          {resultados.length === 0 && (
            <p className="editor-nota">
              Nada con ese término. El catálogo cubre anatomía, patología y material de los
              dos bancos autorizados; si de verdad falta una figura, se añade en
              <code>scripts/activos/seleccion.json</code> y se reimporta.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
