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
import { fasesNav } from '../data/navIndice.js'

// Mapa temaId → faseId (un tema oculta también si su fase está oculta).
const FASE_DE_TEMA = {}
for (const f of fasesNav) for (const t of f.temas) FASE_DE_TEMA[t.id] = f.id

export function useVisibilidad() {
  const { rol, grupo } = useAuth()

  return useMemo(() => {
    const aplica = rol === 'alumno' && Boolean(grupo)
    const fasesOcultas = new Set(aplica ? grupo.fasesOcultas || [] : [])
    const temasOcultos = new Set(aplica ? grupo.temasOcultos || [] : [])

    const faseVisible = (faseId) => !fasesOcultas.has(faseId)
    const temaVisible = (temaId) =>
      !temasOcultos.has(temaId) && !fasesOcultas.has(FASE_DE_TEMA[temaId])

    return {
      // ¿Hay restricciones activas para este usuario?
      restringido: aplica && (fasesOcultas.size > 0 || temasOcultos.size > 0),
      faseVisible,
      temaVisible,
    }
  }, [rol, grupo])
}
