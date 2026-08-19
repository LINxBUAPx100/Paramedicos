import { Link } from 'react-router-dom'
import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import { useDatosAcademia } from '../../../components/panel/datosAcademia.js'
import { useIndiceAcademia } from '../../../context/ContenidoContext.jsx'
import Estadisticas from '../../../components/panel/Estadisticas.jsx'
import SolicitudesInternas from '../../../components/panel/SolicitudesInternas.jsx'
import SolicitudesDeAcceso from '../../../components/panel/SolicitudesDeAcceso.jsx'
import { rutaDeAcademia } from '../../../lib/adminModelo.js'

// Academia · RESUMEN: cómo va y qué está esperando respuesta. Lo que se
// administra tiene su propia sección en el riel, no más scroll infinito.
export default function AcademiaResumen() {
  const { academiaId, academiaNombre, miUid } = useAcademiaAdmin()
  const { modulos } = useIndiceAcademia(academiaId)
  const datos = useDatosAcademia(academiaId)

  if (datos.cargando && !datos.hayDatos) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando academia…</span>
      </div>
    )
  }
  if (datos.error) return <p className="cuenta-error" role="alert">{datos.error}</p>

  const nombreGrupo = (id) => datos.grupos.find((g) => g.id === id)?.nombre || id
  const alumnos = datos.miembros.filter((m) => m.rol === 'alumno')
  const staff = datos.miembros.filter((m) => m.rol !== 'alumno')

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Resumen</h1>
        <p>Cómo va esta academia y qué está esperando tu respuesta.</p>
      </header>

      <Estadisticas
        alumnos={alumnos}
        staff={staff}
        intentos={datos.intentos}
        porAlumno={datos.porAlumno}
        modulos={modulos}
      />

      <SolicitudesInternas
        solicitudes={datos.solicitudes}
        errorCarga={datos.errorSolicitudes}
        gestion="superadmin"
        miUid={miUid}
        soloGrupo={null}
        nombreGrupo={nombreGrupo}
        onCambio={datos.recargar}
      />

      <SolicitudesDeAcceso academiaId={academiaId} academiaNombre={academiaNombre} miUid={miUid} />

      <p className="panel-nota">
        El avance alumno por alumno está en{' '}
        <Link to={rutaDeAcademia(academiaId, 'alumnos')}>Alumnos y staff</Link>.
      </p>
    </div>
  )
}
