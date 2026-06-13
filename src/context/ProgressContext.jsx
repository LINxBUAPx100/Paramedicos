import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const ProgressContext = createContext(null)

const STORAGE_KEY = 'guia-de-lin:progreso:v1'

function cargarEstado() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defecto()
    const parsed = JSON.parse(raw)
    return { ...defecto(), ...parsed }
  } catch {
    return defecto()
  }
}

function defecto() {
  return {
    leidos: {}, // { temaId: true }
    quizzes: {}, // { temaId: { aciertos, total, fecha } }
    examenes: [], // historial de exámenes generales
    tema: 'claro', // claro | oscuro
  }
}

export function ProgressProvider({ children }) {
  const [estado, setEstado] = useState(cargarEstado)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(estado))
    } catch {
      /* almacenamiento no disponible */
    }
  }, [estado])

  // Aplica el tema al documento.
  useEffect(() => {
    document.documentElement.dataset.tema = estado.tema
  }, [estado.tema])

  const marcarLeido = useCallback((temaId, valor = true) => {
    setEstado((s) => ({ ...s, leidos: { ...s.leidos, [temaId]: valor } }))
  }, [])

  const registrarQuiz = useCallback((temaId, aciertos, total) => {
    setEstado((s) => {
      const previo = s.quizzes[temaId]
      // Conserva el mejor resultado.
      const mejor =
        !previo || aciertos / total >= previo.aciertos / previo.total
          ? { aciertos, total, fecha: Date.now() }
          : previo
      return { ...s, quizzes: { ...s.quizzes, [temaId]: mejor } }
    })
  }, [])

  const registrarExamen = useCallback((aciertos, total) => {
    setEstado((s) => ({
      ...s,
      examenes: [{ aciertos, total, fecha: Date.now() }, ...s.examenes].slice(0, 20),
    }))
  }, [])

  const alternarTema = useCallback(() => {
    setEstado((s) => ({ ...s, tema: s.tema === 'claro' ? 'oscuro' : 'claro' }))
  }, [])

  const reiniciar = useCallback(() => {
    setEstado((s) => ({ ...defecto(), tema: s.tema }))
  }, [])

  const valor = {
    estado,
    marcarLeido,
    registrarQuiz,
    registrarExamen,
    alternarTema,
    reiniciar,
  }

  return <ProgressContext.Provider value={valor}>{children}</ProgressContext.Provider>
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress debe usarse dentro de ProgressProvider')
  return ctx
}
