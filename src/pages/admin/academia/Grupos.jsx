import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import { useDatosAcademia } from '../../../components/panel/datosAcademia.js'
import GruposAcademia from '../../../components/panel/GruposAcademia.jsx'
import { gruposDelPrograma, gruposSinPrograma } from '../../../lib/programasModelo.js'

// Academia · GRUPOS: crearlos, asignarles su plan de estudios y su generación.
export default function AcademiaGrupos() {
  const { academiaId, cursoId, academiaNombre, miUid } = useAcademiaAdmin()
  const datos = useDatosAcademia(academiaId)

  if (datos.cargando && !datos.hayDatos) {
    return (
      <div className="ruta-cargando" role="status">
        <span className="ruta-spinner" aria-hidden="true" /> <span>Cargando academia…</span>
      </div>
    )
  }
  if (datos.error) return <p className="cuenta-error" role="alert">{datos.error}</p>

  // SOLO LOS GRUPOS DE ESTE PROGRAMA. Un grupo cursa UN plan de estudios
  // (), así que los de enfermería no pintan nada en la consola de
  // paramédicos: mezclarlos es exactamente lo que hacía que el director no
  // pudiera supervisar un programa sin ver los otros encima.
  const grupos = gruposDelPrograma(datos.grupos, cursoId)
  // Los que no cursan NINGÚN plan. No caen en esta pestaña ni en ninguna otra,
  // así que si no se enseñan aquí no existen para quien administra.
  const huerfanos = gruposSinPrograma(datos.grupos)

  return (
    <div className="cs-seccion">
      <header className="cs-cabecera">
        <h1>Grupos</h1>
        <p>
          Los grupos de este programa. Cada uno lleva su generación, y su plan de estudios decide
          qué contenido ven sus alumnos y cómo se agrupan en las listas y en las invitaciones.
        </p>
      </header>

      <GruposAcademia
        academiaId={academiaId}
        academiaNombre={academiaNombre}
        grupos={grupos}
        miembros={datos.miembros}
        miUid={miUid}
        cursoPorDefecto={cursoId}
        huerfanos={huerfanos}
        onCambio={datos.recargar}
      />
    </div>
  )
}
