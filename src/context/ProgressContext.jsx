import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { useAuth } from './AuthContext.jsx'

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
    tema: 'claro', // claro | oscuro (preferencia del dispositivo, no se sincroniza)
  }
}

export function ProgressProvider({ children }) {
  const [estado, setEstado] = useState(cargarEstado)
  const { user } = useAuth()
  const hidratadoRef = useRef(false) // true cuando ya cargamos el progreso remoto
  const timerRef = useRef(0)

  // Cache local (siempre; también es el modo sin sesión y el respaldo offline).
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

  // Al iniciar sesión: cargar el progreso remoto. Si existe, MANDA (evita mezclar
  // progreso de otro usuario que quedara en localStorage de un equipo compartido).
  // Si no existe, se conserva el local y el efecto de escritura lo subirá.
  useEffect(() => {
    if (!user) {
      hidratadoRef.current = false
      return
    }
    let activo = true
    ;(async () => {
      const [{ db, firebaseListo }, fs] = await Promise.all([
        import('../lib/firebase/init.js'),
        import('firebase/firestore'),
      ])
      if (!activo || !firebaseListo) return
      try {
        const snap = await fs.getDoc(fs.doc(db, 'progreso', user.uid))
        if (activo && snap.exists()) {
          const r = snap.data()
          setEstado((local) => ({
            ...local,
            leidos: r.leidos || {},
            quizzes: r.quizzes || {},
            examenes: r.examenes || [],
          }))
        }
      } catch {
        /* sin conexión: seguimos con el local */
      }
      if (activo) hidratadoRef.current = true
    })()
    return () => {
      activo = false
    }
  }, [user])

  // Escribe el progreso a Firestore (con debounce) cuando cambia y hay sesión.
  useEffect(() => {
    if (!user || !hidratadoRef.current) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      const [{ db, firebaseListo }, fs] = await Promise.all([
        import('../lib/firebase/init.js'),
        import('firebase/firestore'),
      ])
      if (!firebaseListo) return
      try {
        await fs.setDoc(
          fs.doc(db, 'progreso', user.uid),
          {
            leidos: estado.leidos,
            quizzes: estado.quizzes,
            examenes: estado.examenes,
            updatedAt: fs.serverTimestamp(),
          },
          { merge: true }
        )
      } catch {
        /* reintenta en el próximo cambio */
      }
    }, 800)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [estado.leidos, estado.quizzes, estado.examenes, user])

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
