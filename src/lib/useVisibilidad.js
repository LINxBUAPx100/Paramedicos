// ============================================================
//  Visibilidad de contenido para ALUMNOS, controlada por su grupo
// ------------------------------------------------------------
//  El staff decide desde /temario qué módulos y temas ve cada grupo
//  (grupos/{cod}.modulosOcultos / .temasOcultos). Este hook lo aplica:
//  solo restringe a usuarios con rol 'alumno' que pertenecen a un grupo;
//  el staff y los alumnos sin grupo ven todo.
// ============================================================
import { useMemo } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useIndiceContenido } from '../context/ContenidoContext.jsx'

export function useVisibilidad() {
  const { rol, grupo, perfil } = useAuth()
  const { modulos } = useIndiceContenido()

  // Mapa temaId → moduloId (un tema oculta también si su módulo está oculta),
  // derivado del índice de LA ACADEMIA del usuario (bundle si es legacy).
  const MODULO_DE_TEMA = useMemo(() => {
    const map = {}
    for (const f of modulos) for (const t of f.temas) map[t.id] = f.id
    return map
  }, [modulos])

  return useMemo(() => {
    const aplica = rol === 'alumno' && Boolean(grupo)
    const modulosOcultos = new Set(aplica ? grupo.modulosOcultos || [] : [])
    const temasOcultos = new Set(aplica ? grupo.temasOcultos || [] : [])
    // Módulos habilitadas a ESTE alumno por su profesor (al aprobar su
    // solicitud de "siguiente módulo"): anulan lo oculto del grupo.
    const desbloqueadas = new Set(aplica ? perfil?.modulosDesbloqueados || [] : [])

    const moduloVisible = (moduloId) =>
      desbloqueadas.has(moduloId) || !modulosOcultos.has(moduloId)
    const temaVisible = (temaId) =>
      !temasOcultos.has(temaId) && moduloVisible(MODULO_DE_TEMA[temaId])

    return {
      // ¿Hay restricciones activas para este usuario?
      restringido: aplica && (modulosOcultos.size > 0 || temasOcultos.size > 0),
      moduloVisible,
      temaVisible,
    }
  }, [rol, grupo, perfil, MODULO_DE_TEMA])
}
