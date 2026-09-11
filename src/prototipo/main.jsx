import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import LogoPTEM from '../components/marca/LogoPTEM.jsx'
import Icon from '../components/Icon.jsx'
import Contenido from '../components/Contenido.jsx'
import AvisoEditorial from '../components/AvisoEditorial.jsx'
import Quiz from '../components/Quiz.jsx'
import IndiceLeccion from '../components/ui/IndiceLeccion.jsx'
import SeguimientoAlumnos from '../components/panel/SeguimientoAlumnos.jsx'
import { estadoEditorialDe } from '../lib/estadoEditorial.js'
import { tema, modulos, alumnos, porAlumno, seccionesVolumen } from './datos.js'
import '../index.css'
import '../styles/tokens.css'
import '../styles/componentes.css'
import '../styles/pantallas.css'
import './prototipo.css'

const destinos = [['/', 'temario', 'Mi temario'], ['/tema', 'libro', 'Lección'], ['/examen', 'examen', 'Práctica'], ['/panel', 'progreso', 'Seguimiento'], ['/calificaciones', 'examen', 'Calificaciones'], ['/revision', 'libro', 'Revisión docente'], ['/alta', 'usuario', 'Incorporación'], ['/editor', 'herramientas', 'Editor'], ['/sistema', 'capas', 'Componentes']]
function Cabecera({ sobre, titulo, children }) { return <header className="ui-cabecera"><span className="ui-antetitulo">{sobre || 'Academia · Paramédicos'}</span><h1>{titulo}</h1>{children && <p>{children}</p>}</header> }
function Formulario({ revision = false }) {
  const [mensaje, setMensaje] = useState('')
  return <form className="ui-panel" onSubmit={(e) => { e.preventDefault(); setMensaje(revision ? 'Dictamen simulado. No se guardó ninguna firma ni se cambió el estado del tema.' : 'Alta simulada. No se creó cuenta ni invitación real.') }}>
    <h2>{revision ? 'Revisión del tema' : 'Datos del alumno'}</h2>
    <div className="ui-herramientas"><label className="ui-campo">{revision ? 'Nombre de quien firma (obligatorio)' : 'Nombre completo (obligatorio)'}<input required autoComplete="off" /></label>{!revision && <label className="ui-campo">Correo electrónico (obligatorio)<input type="email" required /></label>}</div>
    {revision ? <><label className="ui-campo">Acción<select><option>Corregir</option><option>Reportar</option><option>Validar (simulación)</option></select></label><label className="ui-campo">Observaciones (obligatorio)<textarea rows={5} required /></label></> : <><div className="ui-herramientas"><label className="ui-campo">Teléfono (obligatorio)<input type="tel" required /></label><label className="ui-campo">Grupo<select><option>Paramédicos · Grupo A</option><option>Paramédicos · Grupo B</option></select></label></div><label className="ui-campo">Nota opcional<textarea rows={3} /></label></>}
    <div className="ui-atajos"><button className="btn btn--primario">{revision ? 'Enviar dictamen de prueba' : 'Revisar alta de prueba'}</button><button className="btn btn--suave" type="reset" onClick={() => setMensaje('')}>Limpiar</button></div><p role="status">{mensaje}</p>
  </form>
}
function Editor() {
  const [seleccion, setSeleccion] = useState(0)
  const [texto, setTexto] = useState('')
  const [aviso, setAviso] = useState('')
  return <><Cabecera titulo="Editor de contenido">Árbol y detalle. Las notas de esta vista solo viven en memoria; el texto académico es de lectura.</Cabecera><div className="demo-editor"><nav className="ui-panel" aria-label="Secciones del tema">{tema.secciones.map((s, i) => <button key={i} className="ui-enlace" aria-current={seleccion === i ? 'true' : undefined} onClick={() => setSeleccion(i)}>{s.titulo}</button>)}</nav><section className="ui-panel"><h2>{tema.secciones[seleccion].titulo}</h2><Contenido enlazarGlosario={false} secciones={[tema.secciones[seleccion]]} /><label className="ui-campo">Nota de edición de prueba<textarea value={texto} onChange={(e) => { setTexto(e.target.value); setAviso('Cambios locales sin guardar') }} /></label><button className="btn btn--primario" onClick={() => setAviso('Nota conservada en esta sesión de prueba.')}>Guardar nota local</button><p role="status">{aviso}</p></section></div></>
}
function Calificaciones() {
  const [notas, setNotas] = useState({})
  return <><Cabecera titulo="Calificaciones">Evaluaciones docentes · Grupo A · Datos sintéticos</Cabecera><div className="ui-tabla-wrap"><table className="ui-tabla"><thead><tr><th>Alumno</th><th>Evaluación inicial</th><th>Estado</th></tr></thead><tbody>{alumnos.slice(0, 20).map((a) => <tr key={a.id}><th scope="row">{a.nombre}</th><td><input className="cal-input" type="number" min="0" max="100" aria-label={`Nota de ${a.nombre}`} value={notas[a.id] || ''} onChange={(e) => setNotas({ ...notas, [a.id]: e.target.value })} /></td><td>{notas[a.id] ? 'Edición local de prueba' : 'Sin evaluar'}</td></tr>)}</tbody></table></div></>
}
function Laboratorio() {
  const [estado, setEstado] = useState('normal')
  const [oscuro, setOscuro] = useState(false)
  const [volumen, setVolumen] = useState(false)
  const [consulta, setConsulta] = useState('')
  const lugar = useLocation()
  useEffect(() => { document.documentElement.dataset.tema = oscuro ? 'oscuro' : 'claro' }, [oscuro])
  useEffect(() => { document.getElementById('demo-contenido')?.focus(); window.scrollTo(0, 0) }, [lugar.pathname])
  const secciones = volumen ? seccionesVolumen : tema.secciones
  return <div className="demo-app">
    <header className="demo-topbar"><Link to="/" aria-label="PTEM · inicio"><LogoPTEM height={30} /></Link><span>Vista de revisión · datos de prueba</span><button className="btn btn--suave btn--sm" onClick={() => setOscuro(!oscuro)}>{oscuro ? 'Modo claro' : 'Modo oscuro'}</button></header>
    <aside className="demo-nav"><span className="ui-antetitulo">Campus de aprendizaje</span>{destinos.map(([ruta, icono, titulo]) => <NavLink key={ruta} to={ruta} end className="demo-nav-link"><Icon name={icono} size={18} />{titulo}</NavLink>)}<p>Sin sesión, cuentas reales ni escrituras en Firebase.</p></aside>
    <main id="demo-contenido" tabIndex={-1} className="demo-main">
      <div className="demo-controles"><label>Escenario <select value={estado} onChange={(e) => setEstado(e.target.value)}><option value="normal">Normal</option><option value="vacio">Vacío</option><option value="error">Error</option><option value="cargando">Cargando</option><option value="permiso">Sin permiso</option><option value="bloqueado">Contenido bloqueado</option></select></label><label><input type="checkbox" checked={volumen} onChange={(e) => setVolumen(e.target.checked)} /> Lectura extensa: 14 secciones y 6 tablas</label></div>
      {estado === 'error' ? <section className="ui-estado" role="alert"><h1>No pudimos cargar esta vista</h1><p>Los datos no se han perdido. Prueba de recuperación local.</p><button className="btn btn--primario" onClick={() => setEstado('normal')}>Reintentar</button></section> : estado === 'cargando' ? <section className="ui-estado" role="status"><h1>Cargando contenido…</h1><p>Escenario controlado. Cambia a Normal para continuar.</p></section> : estado === 'permiso' ? <section className="ui-estado"><h1>No tienes permiso para esta acción</h1><p>Consulta con el director de tu academia.</p><button className="btn btn--suave" onClick={() => setEstado('normal')}>Volver al contenido</button></section> : estado === 'bloqueado' ? <><Cabecera titulo="Contenido bloqueado" /><AvisoEditorial estado="bloqueado_por_decision" /></> : <Routes>
        <Route path="/" element={<><Cabecera sobre="Tu recorrido de estudio" titulo="Mi temario">Un módulo a la vez. Estudia, practica y consulta tu avance.</Cabecera><label className="ui-campo">Buscar módulo<input type="search" value={consulta} onChange={(e) => setConsulta(e.target.value)} /></label><div className="demo-modulos">{estado !== 'vacio' && modulos.filter((m) => m.titulo.toLowerCase().includes(consulta.toLowerCase())).map((m) => <Link to="/tema" className="demo-modulo" key={m.id}><span className="demo-num">{String(m.numero).padStart(2, '0')}</span><div><span className="ui-antetitulo">Módulo {m.numero}</span><h2>{m.titulo}</h2><p>{m.temas.length} temas · Abrir lección de muestra</p></div><Icon name="chevronDer" size={20} /></Link>)}</div>{estado === 'vacio' && <p className="ui-estado">No hay módulos disponibles para este escenario.</p>}</>} />
        <Route path="/tema" element={<article className="tema-page"><Cabecera sobre="Módulo 2 · El cuerpo humano" titulo={tema.titulo}>{volumen ? 'Fixture de volumen: secciones originales de dos temas, con origen indicado. No es una lección curricular nueva.' : tema.resumen}</Cabecera><AvisoEditorial estado={estadoEditorialDe(tema)} revision={tema.revision} /><div className="ui-atajos"><Link to="/examen" className="btn btn--primario">Hacer el quiz</Link><Link to="/revision" className="btn btn--suave">Revisar este tema</Link></div><IndiceLeccion secciones={secciones} />{estado === 'vacio' ? <p className="ui-estado">Sin material en este escenario.</p> : <Contenido secciones={secciones} enlazarGlosario={false} />}</article>} />
        <Route path="/examen" element={<><Cabecera titulo="Práctica del tema">Preguntas originales para revisar la interacción del quiz. Esta demostración no es un examen avalado y no guarda resultados.</Cabecera><Quiz key={estado} preguntas={estado === 'vacio' ? [] : tema.quiz} semilla="demo-ux" /><Link className="ui-enlace" to="/tema">Volver a la lección</Link></>} />
        <Route path="/panel" element={<><Cabecera sobre="Trabajo docente · Grupo A" titulo="Seguimiento del grupo">Identifica quién necesita acompañamiento y consulta su evidencia.</Cabecera><SeguimientoAlumnos alumnos={estado === 'vacio' ? [] : alumnos} porAlumno={porAlumno} modulos={modulos} /></>} />
        <Route path="/calificaciones" element={<Calificaciones />} />
        <Route path="/revision" element={<><Cabecera titulo="Revisión docente">{tema.titulo}</Cabecera><AvisoEditorial estado={estadoEditorialDe(tema)} revision={tema.revision} /><Formulario revision /></>} />
        <Route path="/alta" element={<><Cabecera titulo="Incorporar alumnos">Grupo y datos de contacto antes de compartir el acceso.</Cabecera><Formulario /></>} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/sistema" element={<><Cabecera titulo="Componentes compartidos">Mismos tokens y clases que las pantallas aplicadas.</Cabecera><div className="ui-panel"><h2>Acciones</h2><div className="ui-atajos"><button className="btn btn--primario">Primaria</button><button className="btn btn--suave">Secundaria</button><button className="btn btn--primario" disabled>No disponible</button></div><p><span className="ui-etiqueta">Sin evidencia de evaluación</span> <span className="ui-etiqueta ui-etiqueta--riesgo">Promedio menor de 70</span></p></div><Formulario /><AvisoEditorial estado="borrador" /></>} />
        <Route path="*" element={<><h1>Vista no encontrada</h1><Link to="/">Volver al temario</Link></>} />
      </Routes>}
    </main>
  </div>
}
createRoot(document.getElementById('root')).render(<HashRouter><Laboratorio /></HashRouter>)
