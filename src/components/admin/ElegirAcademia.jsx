import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'
import { rutaDeAcademia, resumenDeAcademia } from '../../lib/adminModelo.js'
import { ETIQUETA_PLAN, ETIQUETA_TIPO, planEfectivo } from '../../lib/capacidades.js'

// ============================================================
//  «¿En qué quieres trabajar?» — la puerta del Resumen
// ------------------------------------------------------------
//  La consola tenía un solo modo: todo a la vez. Para administrar una academia
//  había que buscarla en una tabla, entrar a una página que apilaba once bloques
//  y volver atrás para lo siguiente, con el menú de la izquierda hablando
//  siempre de la plataforma.
//
//  Aquí se elige explícitamente: o toda la plataforma, o una academia. Al elegir
//  una, el riel entero pasa a ser el de esa academia (lib/adminModelo.js) y la
//  URL lo refleja, así que el enlace es compartible y el botón Atrás deshace.
//
//  Cada tarjeta enseña lo que se puede saber SIN abrir nada, contando sobre lo
//  que la consola ya cargó: ni una lectura extra a Firestore.
// ============================================================
export default function ElegirAcademia({ academias = [], usuarios = [], intentos = [] }) {
  if (!academias.length) return null

  const fichas = academias
    .map((a) => ({ ...resumenDeAcademia(a, { usuarios, intentos }), plan: planEfectivo(a), doc: a }))
    // Las suspendidas al final: se administran menos, pero deben verse.
    .sort((a, b) => (a.estado === b.estado ? a.nombre.localeCompare(b.nombre) : a.estado === 'activo' ? -1 : 1))

  return (
    <section className="cs-elegir" aria-labelledby="cs-elegir-titulo">
      <header className="cs-elegir-cab">
        <h2 id="cs-elegir-titulo">¿En qué quieres trabajar?</h2>
        <p>
          Estás viendo <strong>toda la plataforma</strong>. Entra a una academia y el menú de la
          izquierda pasa a ser el suyo: alumnos, grupos, invitaciones, contenido y ajustes de esa
          academia y solo de esa.
        </p>
      </header>

      <ul className="cs-elegir-lista">
        {fichas.map((f) => (
          <li key={f.id}>
            <Link className={`cs-aca${f.estado === 'activo' ? '' : ' cs-aca--suspendida'}`} to={rutaDeAcademia(f.id)}>
              <span className="cs-aca-ico"><Icon name="temario" size={20} /></span>
              <span className="cs-aca-datos">
                <strong>{f.nombre}</strong>
                <small>
                  <code>{f.id}</code> · {ETIQUETA_PLAN[f.plan] || f.plan} ·{' '}
                  {ETIQUETA_TIPO[f.tipo] || f.tipo}
                </small>
                <small className="cs-aca-cifras">
                  {f.alumnos} alumno{f.alumnos === 1 ? '' : 's'} · {f.staff} staff ·{' '}
                  {f.intentos} examen{f.intentos === 1 ? '' : 'es'}
                </small>
                {f.estado !== 'activo' && <small className="cs-aca-aviso">Suspendida</small>}
                {f.estado === 'activo' && f.sinActividad && (
                  <small className="cs-aca-aviso">Sin un solo examen presentado</small>
                )}
              </span>
              <Icon name="chevronDer" size={18} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
