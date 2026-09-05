import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { useAuth } from './AuthContext.jsx'
import { registrar } from '../lib/registro.js'
import { sumarActividad } from '../lib/logrosModelo.js'

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
    // Trabajo R1. `leidos` es un booleano SIN cuándo, así que hasta ahora no
    // había forma de saber qué día estudió alguien y una racha era imposible de
    // calcular. Esto lo arregla hacia delante —no hacia atrás: reconstruir las
    // fechas de lo ya leído sería inventarlas—.
    //   actividad: { 'AAAA-MM-DD': cuántas cosas hizo ese día }
    //   racha:     { actual, mejor, ultimoDia }
    // `mejor` se guarda porque es lo único que no se puede recalcular cuando el
    // historial se recorta; `actual` se recalcula al pintar (lib/logrosModelo).
    actividad: {},
    racha: { actual: 0, mejor: 0, ultimoDia: null },
    tema: 'claro', // claro | oscuro (preferencia del dispositivo, no se sincroniza)
  }
}

// Apunta que HOY hubo actividad. Se llama desde las tres acciones que cuentan
// como estudiar —leer, resolver un quiz y terminar un examen—; ninguna otra,
// porque abrir la aplicación y cerrarla no es estudiar y una racha que se
// mantiene sola no significa nada.
const conActividad = (s) => ({ ...s, ...sumarActividad(s) })

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
            // Misma regla que los tres de arriba: lo remoto MANDA. En una
            // cuenta que viene de antes de R1 no habrá nada, y entonces la
            // racha empieza a contarse desde cero — que es lo honesto: las
            // fechas de lo ya leído no existen y no se van a inventar.
            actividad: r.actividad || {},
            racha: r.racha || { actual: 0, mejor: 0, ultimoDia: null },
          }))
        }
      } catch (err) {
        /* sin conexión: seguimos con el local */
        registrar('progreso:cargar', err, { uid: user.uid })
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
            actividad: estado.actividad,
            racha: estado.racha,
            updatedAt: fs.serverTimestamp(),
          },
          { merge: true }
        )
      } catch (err) {
        /* reintenta en el próximo cambio */
        // El caso que importa: si las reglas rechazan la forma del documento,
        // el progreso deja de sincronizarse SIN que el alumno note nada (el
        // local sigue funcionando). Sin esto era invisible.
        registrar('progreso:guardar', err, { uid: user.uid })
      }
    }, 800)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [estado.leidos, estado.quizzes, estado.examenes, estado.actividad, estado.racha, user])

  const marcarLeido = useCallback((temaId, valor = true) => {
    setEstado((s) => {
      const siguiente = { ...s, leidos: { ...s.leidos, [temaId]: valor } }
      // DESMARCAR no suma actividad: quitar una marca no es estudiar, y si
      // sumara, marcar y desmarcar el mismo tema mantendría una racha viva sin
      // haber leído nada.
      return valor ? conActividad(siguiente) : siguiente
    })
  }, [])

  const registrarQuiz = useCallback((temaId, aciertos, total) => {
    setEstado((s) => {
      const previo = s.quizzes[temaId]
      // Conserva el mejor resultado.
      const mejor =
        !previo || aciertos / total >= previo.aciertos / previo.total
          ? { aciertos, total, fecha: Date.now() }
          : previo
      // La actividad se apunta aunque el resultado NO mejore el anterior:
      // repetir un quiz y sacar menos sigue siendo haber estudiado hoy.
      return conActividad({ ...s, quizzes: { ...s.quizzes, [temaId]: mejor } })
    })
  }, [])

  const registrarExamen = useCallback((aciertos, total) => {
    setEstado((s) => conActividad({
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
