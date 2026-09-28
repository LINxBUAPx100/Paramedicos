import { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react'
import { useAuth } from './AuthContext.jsx'
import { registrar } from '../lib/registro.js'
import { sumarActividad } from '../lib/logrosModelo.js'
import { anotarLectura, programarTarjeta } from '../lib/pulsoModelo.js'

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
    // PTEM Pulso: en qué sección de cada lección se quedó el alumno, para el
    // botón «Reanudar» y el trazo del monitor.
    //   lecturas: { temaId: { seccion, total, vistas: [i…], fecha } }
    // Vive SOLO en este dispositivo: no se sube a Firestore (la escritura de
    // abajo enumera sus campos y este no está), así que no toca las reglas ni
    // el presupuesto de escrituras. Sincronizarlo es una decisión aparte.
    lecturas: {},
    // Más datos de Pulso, con la misma regla: SOLO en este dispositivo.
    //   aplicadas:    { temaId: { aciertos, total, fecha } } — actividades al primer intento
    //   srs:          { claveTarjeta: { intervalo, facilidad, vence, repeticiones, fallos } }
    //   repasoRapido: { temaId: [índices marcados como sabidos] }
    //   oral:         { temaId: { i: 0 | 1 | 2 } } — cómo le salió cada pregunta oral
    //   mochila:      [temaId, …] — temas guardados para después
    //   preferencias: { letra: 0-3, unaMano: bool }
    // Para sincronizarlos hay que añadir `pulso` a la regla de progreso/{uid}
    // (firestore.rules) y DESPLEGARLA antes de subir el campo; si no, la regla
    // rechaza el documento entero y el progreso deja de sincronizarse en
    // silencio. Ver docs/ux/PULSO.md.
    aplicadas: {},
    srs: {},
    repasoRapido: {},
    oral: {},
    mochila: [],
    preferencias: { letra: 0, unaMano: false },
    lecturasUid: null,
    tema: 'claro', // claro | oscuro (preferencia del dispositivo, no se sincroniza)
  }
}

// Apunta que HOY hubo actividad. Se llama desde las tres acciones que cuentan
// como estudiar —leer, resolver un quiz y terminar un examen—; ninguna otra,
// porque abrir la aplicación y cerrarla no es estudiar y una racha que se
// mantiene sola no significa nada.
const conActividad = (s) => ({ ...s, ...sumarActividad(s) })

// Datos locales de Pulso que pertenecen a UNA cuenta. Las preferencias de
// lectura son del dispositivo y se conservan.
const PULSO_VACIO = () => ({ lecturas: {}, aplicadas: {}, srs: {}, repasoRapido: {}, oral: {}, mochila: [] })

export function ProgressProvider({ children }) {
  const [estado, setEstado] = useState(cargarEstado)
  const { user } = useAuth()
  const hidratadoRef = useRef(false) // true cuando ya cargamos el progreso remoto
  const timerRef = useRef(0)

  // Cache local (siempre; también es el modo sin sesión y el respaldo offline).
  //
  // Agrupada: con el repaso espaciado el estado puede pesar cientos de kB, y
  // serializarlo entero en CADA acción (cada tarjeta calificada, cada sección
  // leída) bloqueaba el hilo principal. Se escribe como mucho cada 300 ms y,
  // sin esperar, al ocultar o cerrar la pestaña, para no perder nada.
  const ultimoEstado = useRef(estado)
  ultimoEstado.current = estado
  const pendienteLocal = useRef(0)
  const escribirLocal = useCallback(() => {
    if (pendienteLocal.current) { clearTimeout(pendienteLocal.current); pendienteLocal.current = 0 }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ultimoEstado.current))
    } catch {
      /* almacenamiento no disponible */
    }
  }, [])
  useEffect(() => {
    if (pendienteLocal.current) clearTimeout(pendienteLocal.current)
    pendienteLocal.current = setTimeout(escribirLocal, 300)
  }, [estado, escribirLocal])
  useEffect(() => {
    const alOcultar = () => { if (document.visibilityState === 'hidden') escribirLocal() }
    window.addEventListener('pagehide', escribirLocal)
    document.addEventListener('visibilitychange', alOcultar)
    return () => {
      window.removeEventListener('pagehide', escribirLocal)
      document.removeEventListener('visibilitychange', alOcultar)
      escribirLocal()
    }
  }, [escribirLocal])

  // Aplica el tema al documento.
  useEffect(() => {
    document.documentElement.dataset.tema = estado.tema
  }, [estado.tema])

  // Preferencias de lectura de Pulso (tamaño de letra y modo una mano): igual
  // que el tema, se aplican al documento y las resuelve pulso.css.
  const letra = estado.preferencias?.letra || 0
  const unaMano = Boolean(estado.preferencias?.unaMano)
  useEffect(() => {
    const raiz = document.documentElement
    if (letra) raiz.dataset.letra = String(letra); else delete raiz.dataset.letra
    if (unaMano) raiz.dataset.unaMano = 'si'; else delete raiz.dataset.unaMano
  }, [letra, unaMano])

  // Las descargas sin conexión son de UNA cuenta: se atan a quien tiene la
  // sesión y se borran al salir (ver lib/descargas.js).
  // Import dinámico: el almacén de descargas no viaja en el paquete principal.
  useEffect(() => {
    import('../lib/descargas.js').then((m) => m.fijarDuenoDescargas(user?.uid || null)).catch(() => {})
  }, [user])

  // Al iniciar sesión: cargar el progreso remoto. Si existe, MANDA (evita mezclar
  // progreso de otro usuario que quedara en localStorage de un equipo compartido).
  // Si no existe, se conserva el local y el efecto de escritura lo subirá.
  useEffect(() => {
    if (!user) {
      hidratadoRef.current = false
      return
    }
    // Las lecturas son locales y no las reemplaza el progreso remoto, así que
    // en un equipo compartido se quedarían las del alumno anterior y su
    // «Reanudar» aparecería en la cuenta de otro. Se atan a la cuenta.
    setEstado((local) => (local.lecturasUid === user.uid
      ? local
      : { ...local, ...PULSO_VACIO(), lecturasUid: user.uid }))
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

  // Se llama al desplazarse por la lección. `anotarLectura` devuelve el mismo
  // objeto si nada cambió, y entonces no hay render.
  const registrarLectura = useCallback((temaId, seccion, total) => {
    setEstado((s) => {
      const lecturas = anotarLectura(s.lecturas || {}, temaId, seccion, total)
      return lecturas === s.lecturas ? s : { ...s, lecturas }
    })
  }, [])

  // Actividades del tema resueltas: se guarda el primer intento completo.
  const registrarAplicada = useCallback((temaId, aciertos, total) => {
    setEstado((s) => {
      if (s.aplicadas?.[temaId]) return s
      return conActividad({ ...s, aplicadas: { ...(s.aplicadas || {}), [temaId]: { aciertos, total, fecha: Date.now() } } })
    })
  }, [])

  // Repaso espaciado: calificar una tarjeta programa su próxima aparición.
  const calificarTarjeta = useCallback((clave, calificacion) => {
    setEstado((s) => {
      const srs = { ...(s.srs || {}), [clave]: programarTarjeta(s.srs?.[clave], calificacion) }
      // Tope: el temario tiene del orden de 1 500 tarjetas.
      const claves = Object.keys(srs)
      if (claves.length > 3000) {
        claves.sort((a, b) => (srs[a].vence || 0) - (srs[b].vence || 0))
        for (const k of claves.slice(0, claves.length - 3000)) delete srs[k]
      }
      return conActividad({ ...s, srs })
    })
  }, [])

  const marcarRepasoRapido = useCallback((temaId, indice, sabido) => {
    setEstado((s) => {
      const previos = new Set(s.repasoRapido?.[temaId] || [])
      if (sabido) previos.add(indice); else previos.delete(indice)
      return { ...s, repasoRapido: { ...(s.repasoRapido || {}), [temaId]: [...previos].sort((a, b) => a - b) } }
    })
  }, [])

  const calificarOral = useCallback((temaId, indice, resultado) => {
    setEstado((s) => conActividad({
      ...s, oral: { ...(s.oral || {}), [temaId]: { ...(s.oral?.[temaId] || {}), [indice]: resultado } },
    }))
  }, [])

  const alternarMochila = useCallback((temaId) => {
    setEstado((s) => {
      const actual = s.mochila || []
      const mochila = actual.includes(temaId) ? actual.filter((t) => t !== temaId) : [temaId, ...actual].slice(0, 100)
      return { ...s, mochila }
    })
  }, [])

  const fijarPreferencia = useCallback((clave, valor) => {
    setEstado((s) => ({ ...s, preferencias: { ...(s.preferencias || {}), [clave]: valor } }))
  }, [])

  const alternarTema = useCallback(() => {
    setEstado((s) => ({ ...s, tema: s.tema === 'claro' ? 'oscuro' : 'claro' }))
  }, [])

  const reiniciar = useCallback(() => {
    setEstado((s) => ({ ...defecto(), tema: s.tema, preferencias: s.preferencias }))
  }, [])

  const valor = {
    estado,
    marcarLeido,
    registrarQuiz,
    registrarExamen,
    registrarLectura,
    registrarAplicada,
    calificarTarjeta,
    marcarRepasoRapido,
    calificarOral,
    alternarMochila,
    fijarPreferencia,
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
