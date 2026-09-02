// ============================================================
//  CreditosActivo — el control «Créditos» que acompaña a una figura
// ------------------------------------------------------------
//  Por qué existe: casi todo el material del Atlas está bajo CC BY 3.0 o
//  CC BY 4.0, y esas licencias no piden un agradecimiento: piden que la
//  atribución esté ahí, junto a la obra o en un lugar razonable. Un `title=""`
//  no cumple —no se ve con teclado, no se ve en móvil y no lo lee un lector de
//  pantalla de forma fiable—, así que aquí es un botón real.
//
//  Cuatro decisiones deliberadas:
//
//   · ES UN <button> CON `aria-expanded`. Funciona con teclado, tiene foco
//     visible y anuncia si el panel está abierto. Escape lo cierra.
//   · EL PANEL LISTA CADA COMPONENTE. Una composición puede llevar cinco
//     dibujos de cinco autores; atribuirla a uno solo incumpliría la licencia
//     de los otros cuatro.
//   · EL TEXTO ES COPIABLE. Quien reutilice la figura no debería tener que
//     redactar la atribución: se le da hecha, con un botón que la copia.
//   · NO SUGIERE RESPALDO. Se nombra al autor, al proveedor y a la licencia.
//     Ni «en colaboración con» ni «con el apoyo de»: sería falso y la propia
//     licencia lo prohíbe.
//   · EL CRÉDITO SE CARGA AL ABRIR, no al pintar la figura. Los datos de
//     procedencia viven en el catálogo completo, que son 500 kB; pedirlos para
//     decidir el texto de un botón obligaba a descargarlos en cada página con
//     imágenes —y en la portada, que no tiene ninguna—. Lo que hace falta ANTES
//     de abrir es solo saber si la licencia exige atribución, y eso ya lo
//     responde el catálogo ligero desde `requiereCreditoVisible`.
// ============================================================
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'
import { existeActivo } from '../lib/activosMedicos.js'
import { hrefSeguro } from '../lib/enlaceSeguro.js'

function Enlace({ url, children }) {
  const href = hrefSeguro(url)
  if (!href) return <span>{children}</span>
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}

export default function CreditosActivo({ assetId, className = '' }) {
  const [abierto, setAbierto] = useState(false)
  const [copiado, setCopiado] = useState(false)
  const [credito, setCredito] = useState(null)
  const caja = useRef(null)

  // El catálogo con la procedencia entra aquí, y solo cuando alguien abre el
  // panel. Si la descarga falla, el panel se queda con su aviso y la página no
  // se rompe: lo que se pierde es la ficha, no la figura.
  useEffect(() => {
    if (!abierto || credito) return undefined
    let vivo = true
    import('../lib/creditosActivos.js')
      .then(({ creditoDe }) => { if (vivo) setCredito(creditoDe(assetId)) })
      .catch(() => { /* sin catálogo no hay ficha; el aviso del panel lo dice */ })
    return () => { vivo = false }
  }, [abierto, credito, assetId])

  // Escape cierra, y el foco vuelve al botón: es el comportamiento que espera
  // quien navega con teclado y el que evita dejar el foco perdido en el panel.
  useEffect(() => {
    if (!abierto) return undefined
    const alPulsar = (e) => { if (e.key === 'Escape') setAbierto(false) }
    document.addEventListener('keydown', alPulsar)
    return () => document.removeEventListener('keydown', alPulsar)
  }, [abierto])

  // Un assetId que no existe no merece botón. Se comprueba con el catálogo
  // ligero, que ya está cargado.
  if (!existeActivo(assetId)) return null

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(credito.textoCopiable)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2200)
    } catch {
      // Sin permiso de portapapeles el texto sigue visible y seleccionable:
      // no se pierde nada, así que no hay nada que avisar.
    }
  }

  return (
    <div className={`creditos ${className}`.trim()} ref={caja}>
      <button
        type="button"
        className="creditos-btn"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        aria-controls={`creditos-${assetId}`}
      >
        <Icon name="libro" size={14} />
        Créditos
      </button>

      {abierto && !credito && (
        <div className="creditos-panel" id={`creditos-${assetId}`}>
          <p className="creditos-nota">Cargando la ficha de esta figura…</p>
        </div>
      )}

      {abierto && credito && (
        <div className="creditos-panel" id={`creditos-${assetId}`}>
          <dl className="creditos-lista">
            <dt>Título</dt>
            <dd>{credito.titulo}</dd>

            <dt>{credito.componentes.length ? 'Composición de' : 'Autoría'}</dt>
            <dd>
              {credito.autorUrl
                ? <Enlace url={credito.autorUrl}>{credito.autor}</Enlace>
                : credito.autor}
            </dd>

            <dt>Proveedor</dt>
            <dd>
              {credito.proveedorUrl
                ? <Enlace url={credito.proveedorUrl}>{credito.proveedor}</Enlace>
                : credito.proveedor}
            </dd>

            <dt>Licencia</dt>
            <dd>
              {credito.licencia.url
                ? <Enlace url={credito.licencia.url}>{credito.licencia.id}</Enlace>
                : credito.licencia.id}
              {credito.compartirIgual && (
                <span className="creditos-aviso"> · CompartirIgual: la obra derivada hereda esta licencia.</span>
              )}
            </dd>

            {credito.fuenteUrl && (
              <>
                <dt>Fuente</dt>
                <dd><Enlace url={credito.fuenteUrl}>Ver el original</Enlace></dd>
              </>
            )}

            {credito.cambios.length > 0 && (
              <>
                <dt>Cambios de PTEM</dt>
                <dd>
                  <ul className="creditos-cambios">
                    {credito.cambios.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </dd>
              </>
            )}
          </dl>

          {credito.componentes.length > 0 && (
            <div className="creditos-componentes">
              <h4>Esta figura se compone de</h4>
              <ul>
                {credito.componentes.map((c) => (
                  <li key={c.id}>
                    <strong>{c.titulo}</strong> — {c.autorUrl
                      ? <Enlace url={c.autorUrl}>{c.autor}</Enlace>
                      : c.autor}
                    {' · '}
                    {c.licencia.url
                      ? <Enlace url={c.licencia.url}>{c.licencia.id}</Enlace>
                      : c.licencia.id}
                    {' · '}{c.proveedor}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="creditos-copiar">
            <p className="creditos-texto">{credito.textoCopiable}</p>
            <button type="button" className="creditos-copiar-btn" onClick={copiar}>
              <Icon name={copiado ? 'check' : 'copiar'} size={14} />
              {copiado ? 'Atribución copiada' : 'Copiar la atribución'}
            </button>
          </div>

          <p className="creditos-nota">
            Los autores y los proveedores citados no respaldan PTEM ni revisan su contenido.
            El catálogo completo está en <Link to="/creditos">Créditos del material visual</Link>.
          </p>
        </div>
      )}
    </div>
  )
}
