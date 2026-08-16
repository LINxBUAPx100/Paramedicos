import { useCallback, useEffect, useMemo, useState } from 'react'
import { agregarIntentos } from '../../lib/panelModelo.js'
import { registrar } from '../../lib/registro.js'

// ============================================================
//  Carga de los datos de UNA academia (Bloque O)
// ------------------------------------------------------------
//  Los cargaba `PanelAcademia`, y las solicitudes las cargaba aparte cada
//  sección que las necesitaba. Ahora se leen UNA vez y se reparten: cambiar de
//  sección del panel no vuelve a golpear Firestore (mismo criterio que
//  AdminShell en la consola del super-admin).
//
//  Las lecturas que pueden fallar por reglas viejas se degradan a lista vacía
//  con su propio mensaje: que no haya grupos publicados no debe dejar al
//  director sin ver el avance de sus alumnos.
// ============================================================

export function useDatosAcademia(academiaId) {
  const [datos, setDatos] = useState(null) // { miembros, intentos, grupos, solicitudes }
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [errorSolicitudes, setErrorSolicitudes] = useState('')
  const [recarga, setRecarga] = useState(0)

  const recargar = useCallback(() => setRecarga((n) => n + 1), [])

  useEffect(() => {
    if (!academiaId) return undefined
    let activo = true
    setCargando(true)
    setError('')
    ;(async () => {
      try {
        const [{ miembrosDeAcademia }, { intentosDeAcademia }, { listarGrupos }, solicitudesApi] =
          await Promise.all([
            import('../../lib/firebase/usuarios.js'),
            import('../../lib/firebase/intentos.js'),
            import('../../lib/firebase/grupos.js'),
            import('../../lib/firebase/solicitudes.js'),
          ])
        const [miembros, intentos, grupos, solicitudes] = await Promise.all([
          miembrosDeAcademia(academiaId),
          intentosDeAcademia(academiaId),
          listarGrupos(academiaId).catch(() => []), // reglas viejas: sin grupos
          solicitudesApi.solicitudesDeAcademia(academiaId).catch((err) => {
            registrar('panel:solicitudes', err)
            if (activo) {
              setErrorSolicitudes(
                String(err?.code || '').includes('permission-denied')
                  ? 'Sin permisos: publica las reglas actualizadas de firestore.rules (colección "solicitudes").'
                  : 'No se pudieron cargar las solicitudes.'
              )
            }
            return []
          }),
        ])
        if (!activo) return
        setDatos({ miembros, intentos, grupos, solicitudes })
      } catch (err) {
        registrar('panel:cargar', err)
        if (activo) setError('No se pudo cargar la información. Revisa tu conexión o tus permisos.')
      } finally {
        if (activo) setCargando(false)
      }
    })()
    return () => { activo = false }
  }, [academiaId, recarga])

  // Mejor calificación y nº de intentos por alumno y módulo: lo usan el resumen,
  // la tabla de avance y las estadísticas.
  const porAlumno = useMemo(() => agregarIntentos(datos?.intentos), [datos])

  return {
    miembros: datos?.miembros || [],
    intentos: datos?.intentos || [],
    grupos: datos?.grupos || [],
    solicitudes: datos?.solicitudes || [],
    porAlumno,
    cargando,
    error,
    errorSolicitudes,
    hayDatos: Boolean(datos),
    recargar,
  }
}
