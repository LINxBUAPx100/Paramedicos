// ============================================================
//  Visibilidad de contenido para ALUMNOS, controlada por su grupo
// ------------------------------------------------------------
//  El staff decide desde /temario qué fases y temas ve cada grupo
//  (grupos/{cod}.fasesOcultas / .temasOcultos). Este hook lo aplica:
//  solo restringe a usuarios con rol 'alumno' que pertenecen a un grupo;
//  el staff y los alumnos sin grupo ven todo.
// ============================================================
import { useMemo } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useIndiceContenido } from '../context/ContenidoContext.jsx'

export function useVisibilidad() {
  const { rol, grupo, perfil } = useAuth()
  const { fases } = useIndiceContenido()

  // Mapa temaId → faseId (un tema oculta también si su fase está oculta),
  // derivado del índice de LA ACADEMIA del usuario (bundle si es legacy).
  const FASE_DE_TEMA = useMemo(() => {
    const map = {}
    for (const f of fases) for (const t of f.temas) map[t.id] = f.id
    return map
  }, [fases])

  return useMemo(() => {
    const aplica = rol === 'alumno' && Boolean(grupo)
    const fasesOcultas = new Set(aplica ? grupo.fasesOcultas || [] : [])
    const temasOcultos = new Set(aplica ? grupo.temasOcultos || [] : [])
    // Fases habilitadas a ESTE alumno por su profesor (al aprobar su
    // solicitud de "siguiente módulo"): anulan lo oculto del grupo.
    const desbloqueadas = new Set(aplica ? perfil?.fasesDesbloqueadas || [] : [])

    const faseVisible = (faseId) =>
      desbloqueadas.has(faseId) || !fasesOcultas.has(faseId)
    const temaVisible = (temaId) =>
      !temasOcultos.has(temaId) && faseVisible(FASE_DE_TEMA[temaId])

    return {
      // ¿Hay restricciones activas para este usuario?
      restringido: aplica && (fasesOcultas.size > 0 || temasOcultos.size > 0),
      faseVisible,
      temaVisible,
    }
  }, [rol, grupo, perfil, FASE_DE_TEMA])
}
