import { useAcademiaAdmin } from '../../../components/admin/AcademiaShell.jsx'
import { EscenariosDeAcademia } from '../../panel/Escenarios.jsx'

// Escenarios del Modo llamada de una academia, desde la consola del
// super-admin: la misma pantalla que el panel del director.
export default function AcademiaEscenarios() {
  const { academiaId, miUid } = useAcademiaAdmin()
  return <EscenariosDeAcademia academiaId={academiaId} miUid={miUid} />
}
