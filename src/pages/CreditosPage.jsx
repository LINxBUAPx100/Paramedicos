// ============================================================
//  /creditos — créditos del material visual
// ------------------------------------------------------------
//  Página obligatoria, no cortesía. Casi todo el material del temario está bajo
//  CC BY 3.0 o CC BY 4.0, y esas licencias piden atribución en un lugar
//  razonable para el medio. Para un icono de 24 píxeles que se repite en veinte
//  lecciones, ese lugar es esta página; para una figura grande, el crédito va
//  además junto a la figura (ver CreditosActivo.jsx).
//
//  Lo que hace que la página sea utilizable y no un muro de doscientas líneas:
//
//   · agrupa por LICENCIA, que es lo que determina la obligación, y dentro
//     ordena por autor;
//   · resume primero por autor, con cuántas obras aporta cada uno;
//   · dice de forma explícita que ni los autores ni los proveedores respaldan
//     PTEM: no hacerlo sería sugerir un aval que no existe y que la propia
//     licencia prohíbe insinuar;
//   · declara la trazabilidad —el commit fijado de BioIcons y la fecha de
//     recuperación de SMART—, que es lo que permite comprobar que el archivo
//     que se sirve es el que se atribuye.
//
//  La página no depende de la sesión ni del contenido de la academia: el
//  catálogo es del repositorio, así que se puede abrir sin haber entrado.
// ============================================================
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import MedicalIcon from '../components/MedicalIcon.jsx'
import {
  activosEnUso, agrupadosPorLicencia, autoresEnUso, avisosDeLicencia,
  BIOICONS_COMMIT, SMART_RECUPERADO,
} from '../lib/activosMedicos.js'
import { NOMBRE_PROVEEDOR, URL_PROVEEDOR } from '../lib/licenciasActivos.js'
import { hrefSeguro } from '../lib/enlaceSeguro.js'

function Ext({ url, children }) {
  const href = hrefSeguro(url)
  if (!href) return <span>{children}</span>
  return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
}

export default function CreditosPage() {
  const [filtro, setFiltro] = useState('')
  const usados = useMemo(() => activosEnUso(), [])
  const grupos = useMemo(() => agrupadosPorLicencia(usados), [usados])
  const autores = useMemo(() => autoresEnUso(usados), [usados])
  const avisos = useMemo(() => avisosDeLicencia(usados), [usados])

  const q = filtro.trim().toLowerCase()
  const filtrar = (lista) => (
    q
      ? lista.filter((a) => (
        a.title.toLowerCase().includes(q)
        || a.originalCreator.name.toLowerCase().includes(q)
        || a.id.includes(q)
        || (a.tags || []).some((t) => t.toLowerCase().includes(q))
      ))
      : lista
  )

  const conShareAlike = usados.filter((a) => a.license.shareAlike)

  return (
    <div className="creditos-page">
      <header className="creditos-page-header">
        <h1 className="ph-h2"><Icon name="libro" size={28} /> Créditos del material visual</h1>
        <p>
          Las ilustraciones y los iconos médicos de PTEM proceden de dos bibliotecas de
          acceso abierto: <Ext url="https://bioicons.com/">BioIcons</Ext> y{' '}
          <Ext url="https://smart.servier.com/">Servier Medical Art</Ext>. Cada archivo
          conserva el autor y la licencia con que se publicó, y aquí están todos.
        </p>
        <p className="creditos-page-aviso">
          Ni los autores citados ni BioIcons ni Servier respaldan PTEM, revisan su contenido
          ni tienen relación con la academia. Se les nombra porque sus licencias lo exigen y
          porque su trabajo hace posible este material.
        </p>
      </header>

      <section className="creditos-resumen">
        <div className="creditos-cifras">
          <div><strong>{usados.length}</strong><span>ilustraciones e iconos</span></div>
          <div><strong>{autores.length}</strong><span>autores</span></div>
          <div><strong>{grupos.length}</strong><span>licencias distintas</span></div>
        </div>
        <dl className="creditos-trazabilidad">
          <dt>BioIcons</dt>
          <dd>
            versión fijada:{' '}
            <Ext url={`https://github.com/duerrsimon/bioicons/tree/${BIOICONS_COMMIT}`}>
              <code>{BIOICONS_COMMIT.slice(0, 12)}</code>
            </Ext>
          </dd>
          <dt>Servier Medical Art</dt>
          <dd>biblioteca pública, material recuperado el {SMART_RECUPERADO}</dd>
        </dl>
      </section>

      {conShareAlike.length > 0 && (
        <section className="creditos-sa" role="note">
          <h2><Icon name="alerta" size={20} /> Obligación CompartirIgual pendiente</h2>
          <p>
            {conShareAlike.length} activo(s) están bajo una licencia CompartirIgual (CC BY-SA).
            Cualquier obra derivada de ellos tiene que publicarse en los mismos términos.
          </p>
          <ul>
            {conShareAlike.map((a) => (
              <li key={a.id}><code>{a.id}</code> — {a.title} ({a.license.id})</li>
            ))}
          </ul>
        </section>
      )}

      {avisos.length > 0 && (
        <section className="creditos-mit">
          <h2>Avisos de licencia que hay que conservar</h2>
          <ul>
            {avisos.map((a) => (
              <li key={a.id}>
                <strong>{a.titulo}</strong> — {a.autor} · {a.licencia}. Se conserva el aviso de
                copyright y el texto de la licencia: <Ext url={a.url}>{a.url}</Ext>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="creditos-autores">
        <h2>Autores</h2>
        <ul className="creditos-autores-lista">
          {autores.map((a) => (
            <li key={a.nombre}>
              {a.url ? <Ext url={a.url}>{a.nombre}</Ext> : a.nombre}
              <span className="creditos-autor-meta">
                {a.obras} {a.obras === 1 ? 'obra' : 'obras'} · {a.licencias.join(', ')}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <div className="creditos-buscar">
        <label htmlFor="creditos-q">Buscar en el catálogo</label>
        <input
          id="creditos-q"
          type="search"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Título, autor, identificador o etiqueta"
        />
      </div>

      {grupos.map(({ licencia, activos }) => {
        const lista = filtrar(activos)
        if (!lista.length) return null
        return (
          <section className="creditos-grupo" key={licencia.id}>
            <h2>
              {licencia.url ? <Ext url={licencia.url}>{licencia.name}</Ext> : licencia.name}
              <span className="creditos-grupo-n">{lista.length}</span>
            </h2>
            {licencia.attributionRequired
              ? <p className="creditos-grupo-nota">Exige atribución: autor, título y licencia.</p>
              : <p className="creditos-grupo-nota">No exige atribución, pero su procedencia queda registrada.</p>}
            <ul className="creditos-tabla">
              {lista.map((a) => (
                <li key={a.id}>
                  <span className="creditos-tabla-ico">
                    <MedicalIcon id={a.id} size={26} />
                  </span>
                  <span className="creditos-tabla-txt">
                    <strong>{a.title}</strong>
                    <span className="creditos-tabla-autor">
                      {a.originalCreator.url
                        ? <Ext url={a.originalCreator.url}>{a.originalCreator.name}</Ext>
                        : a.originalCreator.name}
                      {' · '}
                      {URL_PROVEEDOR[a.catalogProvider]
                        ? <Ext url={URL_PROVEEDOR[a.catalogProvider]}>{NOMBRE_PROVEEDOR[a.catalogProvider]}</Ext>
                        : NOMBRE_PROVEEDOR[a.catalogProvider]}
                    </span>
                    {a.attribution.changes.length > 0 && (
                      <span className="creditos-tabla-cambios">
                        Adaptado por PTEM: {a.attribution.changes.join('; ')}
                      </span>
                    )}
                    {a.usages.topicIds.length > 0 && (
                      <span className="creditos-tabla-usos">
                        Se usa en {a.usages.topicIds.length}{' '}
                        {a.usages.topicIds.length === 1 ? 'tema' : 'temas'}
                      </span>
                    )}
                  </span>
                  <code className="creditos-tabla-id">{a.id}</code>
                </li>
              ))}
            </ul>
          </section>
        )
      })}

      <footer className="creditos-page-pie">
        <p>
          El inventario completo —con la procedencia de cada archivo, su hash y la tabla de
          reversión— está en el repositorio, en <code>docs/INVENTARIO-ACTIVOS-MEDICOS.md</code>.
        </p>
        <Link to="/logros" className="btn btn--pildora btn--carbon">Volver a Logros</Link>
      </footer>
    </div>
  )
}
