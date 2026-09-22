import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { tema, modulos } from './datos.js'
import { buscarModulos } from './recorrido.js'

export function InicioEstudio() {
  return <>
    <header className="ui-cabecera"><span className="ui-antetitulo">Campus PTEM · Propuesta de inicio</span><h1>Tu siguiente paso,<br />a la vista.</h1><p>Un espacio para estudiar, practicar y retomar el recorrido.</p></header>
    <div className="demo-inicio-grid">
      <section className="demo-destacado">
        <span className="ui-antetitulo">Lección de muestra</span>
        <h2>{tema.titulo}</h2>
        <p>Explora la lectura y su índice. El estado editorial se conserva visible dentro de la lección.</p>
        <Link to="/tema" className="btn btn--primario">Abrir lección <Icon name="chevronDer" size={18} /></Link>
        <span className="demo-nota">Demostración · no representa tu historial de estudio</span>
      </section>
      <section className="demo-siguiente">
        <span className="ui-antetitulo">Tu recorrido</span>
        <h2>Estudia con un orden claro</h2>
        <ol><li><span>01</span><div><strong>Explora</strong><p>Encuentra tu módulo.</p></div></li><li><span>02</span><div><strong>Comprende</strong><p>Lee con el índice a mano.</p></div></li><li><span>03</span><div><strong>Practica</strong><p>Revisa lo aprendido.</p></div></li></ol>
      </section>
    </div>
    <div className="demo-seccion-titulo"><h2>Elige cómo seguir</h2><Link to="/plan" className="ui-enlace">Ver el plan de mejoras</Link></div>
    <div className="demo-accesos">
      {[['/', 'temario', 'Explorar módulos', 'Encuentra el contenido por su nombre.'], ['/examen', 'examen', 'Practicar el tema', 'Prueba el quiz de la lección de muestra.'], ['/panel', 'progreso', 'Vista docente', 'Consulta el seguimiento con datos sintéticos.']].map(([ruta, icono, titulo, texto]) => <Link to={ruta} key={ruta}><Icon name={icono} size={24} /><h3>{titulo}</h3><p>{texto}</p><span>Explorar <Icon name="chevronDer" size={16} /></span></Link>)}
    </div>
  </>
}

export function ExplorarModulos({ vacio }) {
  const [consulta, setConsulta] = useState('')
  const visibles = buscarModulos(vacio ? [] : modulos, consulta)
  return <>
    <header className="ui-cabecera"><span className="ui-antetitulo">Tu recorrido de estudio</span><h1>Mi temario</h1><p>Encuentra un módulo. Todos los accesos de esta muestra abren la misma lección de demostración.</p></header>
    <div className="demo-buscador"><label className="ui-campo">Buscar módulo<input type="search" placeholder="Escribe parte del nombre…" value={consulta} onChange={(e) => setConsulta(e.target.value)} /></label><p role="status">{visibles.length} {visibles.length === 1 ? 'módulo encontrado' : 'módulos encontrados'}</p></div>
    <div className="demo-modulos">{visibles.map((m) => <Link to="/tema" className="demo-modulo" key={m.id}><span className="demo-num">{String(m.numero).padStart(2, '0')}</span><div><span className="ui-antetitulo">Módulo {m.numero}</span><h2>{m.titulo}</h2><p>{m.temas.length} temas · Abrir lección de muestra</p></div><Icon name="chevronDer" size={20} /></Link>)}</div>
    {!visibles.length && <section className="ui-estado"><h2>{consulta ? 'No encontramos ese módulo' : 'Todavía no hay módulos disponibles'}</h2><p>{consulta ? 'Prueba con otra palabra o vuelve al catálogo completo.' : 'Cuando tu academia habilite contenido, aparecerá aquí.'}</p>{consulta && <button className="btn btn--suave" onClick={() => setConsulta('')}>Limpiar búsqueda</button>}</section>}
  </>
}

export function PlanMejoras() {
  return <>
    <header className="ui-cabecera"><span className="ui-antetitulo">Propuesta · pendiente de revisión</span><h1>Un sistema.<br />Muchas pantallas.</h1><p>Orden propuesto para aplicar el diseño por recorridos completos. Este plan visual no reemplaza el calendario técnico del proyecto.</p></header>
    <div className="demo-plan">
      {[
        ['01', 'Orientarse y empezar', 'Inicio, navegación y catálogo', 'Una acción principal por pantalla, menú agrupado y búsqueda con recuperación cuando no hay resultados.', '/inicio', 'Explorar propuesta nueva', 'Vista nueva en este prototipo'],
        ['02', 'Leer y practicar', 'Lección, índice y quiz', 'Revisar el recorrido de ida y vuelta, la lectura extensa y la visibilidad del estado editorial.', '/tema', 'Revisar la lectura existente', 'Base existente para revisar'],
        ['03', 'Dar seguimiento', 'Grupo, calificaciones e incorporación', 'Revisar búsqueda, tablas y formularios sin confundir ausencia de evaluación con una calificación de cero.', '/panel', 'Revisar seguimiento existente', 'Base existente para revisar'],
        ['04', 'Extender con coherencia', 'Atlas, botiquín, cuenta y logros', 'Después de revisar las primeras etapas, adaptar las herramientas especializadas a los mismos patrones.', '/sistema', 'Consultar componentes existentes', 'Pantallas especializadas pendientes'],
      ].map(([numero, titulo, alcance, texto, ruta, accion, estado]) => <section key={numero}><span className="demo-plan-numero">{numero}</span><div><span className="ui-antetitulo">{alcance}</span><h2>{titulo}</h2><p>{texto}</p><span className="demo-nota">{estado}</span><Link to={ruta} className="ui-enlace">{accion} <Icon name="chevronDer" size={16} /></Link></div></section>)}
    </div>
  </>
}
