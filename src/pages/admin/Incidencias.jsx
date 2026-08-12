import { ProblemasReportados } from '../AdminPage.jsx'

// Consola del super-admin · INCIDENCIAS.
// Aquí llegan dos cosas por la misma colección `reportes`: los problemas que
// un alumno reporta desde un tema, y los DIAGNÓSTICOS técnicos que se envían
// desde Mi cuenta (Bloque E), que viajan con temaId '__diagnostico__'.
export default function AdminIncidencias() {
  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Incidencias</h1>
        <p>Problemas reportados en los temas y diagnósticos técnicos enviados por los usuarios.</p>
      </header>
      <ProblemasReportados />
    </div>
  )
}
