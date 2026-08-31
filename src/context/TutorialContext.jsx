import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { useAuth } from './AuthContext.jsx'
import { normalizarVistos, tutorialPendiente } from '../lib/tutorialesModelo.js'

// ============================================================
//  Qué tutoriales ha visto ya este usuario
// ------------------------------------------------------------
//  DOS ALMACENES, y cada uno responde a algo distinto:
//
//   · `localStorage` es el RÁPIDO. Se lee sin red, en el primer pintado, y
//     evita el parpadeo de enseñar un tutorial medio segundo antes de
//     descubrir que ya se había visto.
//   · Firestore es el VERDADERO. Es lo que hace que «una sola vez en la vida
//     del usuario» siga siendo cierto cuando entra desde otro teléfono.
//
//  Se leen los dos y se UNEN: visto en cualquiera de los dos es visto. Nunca
//  se resta. Así, si Firestore no responde —sin red, reglas todavía sin
//  desplegar—, el tutorial sigue sin repetirse en ese dispositivo en vez de
//  salir en cada carga.
//
//  DEGRADA EN SILENCIO. Sin sesión, sin red o con las reglas denegando, todo
//  esto sigue funcionando contra `localStorage`. Lo único que se pierde es
//  que el recuerdo cruce de dispositivo.
// ============================================================

const TutorialCtx = createContext(null)

const CLAVE_LOCAL = 'ptem:tutoriales'

function leerLocal() {
  try {
    return normalizarVistos(JSON.parse(localStorage.getItem(CLAVE_LOCAL) || '{}'))
  } catch {
    // Modo privado, almacenamiento lleno o un valor corrupto de una versión
    // anterior. Ninguno es motivo para romper la aplicación.
    return {}
  }
}

function escribirLocal(vistos) {
  try {
    localStorage.setItem(CLAVE_LOCAL, JSON.stringify(vistos))
  } catch { /* sin almacenamiento: se pierde el recuerdo, no la pantalla */ }
}

export function TutorialProvider({ children }) {
  const { user, autenticado } = useAuth()
  const uid = user?.uid || null

  const [vistos, setVistos] = useState(() => leerLocal())
  // Hasta que no se sabe qué hay en el servidor no se lanza nada: enseñar un
  // tutorial y quitarlo medio segundo después es peor que esperar.
  const [listo, setListo] = useState(() => !uid)
  const uidCargado = useRef(null)

  useEffect(() => {
    if (!uid) {
      // Sesión cerrada: se vuelve a lo local. No se borra nada — si el mismo
      // usuario vuelve a entrar en este navegador, sigue sin repetirse.
      uidCargado.current = null
      setVistos(leerLocal())
      setListo(true)
      return undefined
    }
    if (uidCargado.current === uid) return undefined
    uidCargado.current = uid

    let activo = true
    setListo(false)
    ;(async () => {
      let delServidor = {}
      try {
        const { leerVistos } = await import('../lib/firebase/tutoriales.js')
        delServidor = await leerVistos(uid)
      } catch { /* el módulo o la red fallaron: se sigue con lo local */ }
      if (!activo) return
      // Unión, nunca resta. Ver la cabecera.
      const unidos = { ...leerLocal(), ...delServidor }
      escribirLocal(unidos)
      setVistos(unidos)
      setListo(true)
    })()
    return () => { activo = false }
  }, [uid])

  const marcar = useCallback((clave) => {
    if (!clave) return
    setVistos((prev) => {
      if (prev[clave]) return prev
      const siguiente = { ...prev, [clave]: true }
      escribirLocal(siguiente)
      return siguiente
    })
    if (!uid) return
    import('../lib/firebase/tutoriales.js')
      .then(({ marcarVisto }) => marcarVisto(uid, clave))
      .catch(() => { /* queda guardado en local, que es lo que evita repetirlo */ })
  }, [uid])

  const reiniciar = useCallback(async () => {
    setVistos({})
    escribirLocal({})
    if (!uid) return
    try {
      const { reiniciarVistos } = await import('../lib/firebase/tutoriales.js')
      await reiniciarVistos(uid)
    } catch { /* local ya está limpio: los tutoriales volverán en este dispositivo */ }
  }, [uid])

  const pendienteDe = useCallback(
    (pathname, extra = {}) => (
      listo ? tutorialPendiente(pathname, vistos, { autenticado, ...extra }) : null
    ),
    [listo, vistos, autenticado]
  )

  const valor = useMemo(
    () => ({ vistos, listo, marcar, reiniciar, pendienteDe }),
    [vistos, listo, marcar, reiniciar, pendienteDe]
  )

  return <TutorialCtx.Provider value={valor}>{children}</TutorialCtx.Provider>
}

export function useTutoriales() {
  const ctx = useContext(TutorialCtx)
  if (!ctx) throw new Error('useTutoriales debe usarse dentro de TutorialProvider')
  return ctx
}
