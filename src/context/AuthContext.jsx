import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { esCorreoSupremo } from '../lib/firebase/supremos.js'

const AuthContext = createContext(null)

// Roles con acceso al contenido siendo staff de una academia.
const ROLES_STAFF = ['admin_escuela', 'instructor']

// Calcula si el usuario puede acceder al contenido y, si no, el motivo.
//   superadmin/supremo   → acceso total (bypass).
//   sin sesión           → 'no-sesion'
//   perfil inexistente    → 'sin-perfil' (no se queda cargando para siempre)
//   usuario no activo     → 'usuario-bloqueado'
//   sin academia          → 'sin-academia'
//   academia no activa    → 'academia-inactiva' (no ha pagado / suspendida)
function calcularAcceso({ user, perfil, perfilListo, academia, rol, esSupremo }) {
  if (esSupremo || rol === 'superadmin') return { puede: true, motivo: null }
  if (!user) return { puede: false, motivo: 'no-sesion' }
  if (!perfilListo) return { puede: false, motivo: 'cargando' }
  if (!perfil) return { puede: false, motivo: 'sin-perfil' }
  if (perfil.estado && perfil.estado !== 'activo') return { puede: false, motivo: 'usuario-bloqueado' }
  // Acceso de prueba vigente (código temporal): entra sin academia.
  const enPrueba = Boolean(perfil.pruebaHasta?.seconds && perfil.pruebaHasta.seconds * 1000 > Date.now())
  if (!perfil.academiaId) {
    return enPrueba ? { puede: true, motivo: null } : { puede: false, motivo: 'sin-academia' }
  }
  if (academia === undefined) return { puede: false, motivo: 'cargando' } // academia aún cargando
  if (!academia || academia.estado !== 'activo') {
    return enPrueba ? { puede: true, motivo: null } : { puede: false, motivo: 'academia-inactiva' }
  }
  return { puede: true, motivo: null }
}

// Expone usuario de Firebase Auth + perfil de Firestore (rol, academia, estado) +
// la academia del usuario, y calcula el acceso al contenido. El SDK de Firebase se
// carga de forma DIFERIDA (import dinámico) para no engordar el bundle inicial.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [perfilListo, setPerfilListo] = useState(false) // true tras el 1er snapshot del perfil
  const [academia, setAcademia] = useState(undefined) // undefined = sin cargar; null = no existe
  const [cargando, setCargando] = useState(true)
  const salirRef = useRef(() => Promise.resolve())

  // Sesión + perfil en vivo.
  useEffect(() => {
    let activo = true
    let unsubAuth = null
    let unsubPerfil = null
    ;(async () => {
      const [initMod, authMod, fs] = await Promise.all([
        import('../lib/firebase/init.js'),
        import('../lib/firebase/auth.js'),
        import('firebase/firestore'),
      ])
      if (!activo) return
      const { db, firebaseListo } = initMod
      salirRef.current = authMod.salir
      if (!firebaseListo) {
        setCargando(false)
        return
      }
      unsubAuth = authMod.observarAuth((u) => {
        setUser(u)
        setPerfilListo(false)
        if (unsubPerfil) { unsubPerfil(); unsubPerfil = null }
        if (u) {
          unsubPerfil = fs.onSnapshot(
            fs.doc(db, 'usuarios', u.uid),
            (snap) => {
              setPerfil(snap.exists() ? { id: snap.id, ...snap.data() } : null)
              setPerfilListo(true)
              setCargando(false)
            },
            () => {
              // Error al leer el perfil (permisos/red): no dejar el spinner infinito.
              setPerfil(null)
              setPerfilListo(true)
              setCargando(false)
            }
          )
        } else {
          setPerfil(null)
          setCargando(false)
        }
      })
    })()
    return () => {
      activo = false
      if (unsubAuth) unsubAuth()
      if (unsubPerfil) unsubPerfil()
    }
  }, [])

  // Academia del usuario en vivo (para saber si está activa / ha pagado).
  useEffect(() => {
    const acaId = perfil?.academiaId
    if (!acaId) {
      // Sin academia: el acceso se resuelve por 'sin-academia' antes de mirar este valor.
      setAcademia(null)
      return
    }
    setAcademia(undefined) // cargando
    let activo = true
    let unsub = null
    ;(async () => {
      const [{ db }, fs] = await Promise.all([
        import('../lib/firebase/init.js'),
        import('firebase/firestore'),
      ])
      if (!activo) return
      unsub = fs.onSnapshot(
        fs.doc(db, 'academias', acaId),
        (snap) => setAcademia(snap.exists() ? { id: snap.id, ...snap.data() } : null),
        () => setAcademia(null)
      )
    })()
    return () => {
      activo = false
      if (unsub) unsub()
    }
  }, [perfil?.academiaId])

  const rol = perfil?.rol || null
  // El admin supremo se reconoce por su correo (igual que en firestore.rules):
  // manda aunque su doc de Firestore aún no diga 'superadmin'.
  const esSupremo = esCorreoSupremo(user?.email)
  const esSuperadmin = esSupremo || rol === 'superadmin'
  const { puede: puedeAcceder, motivo } = calcularAcceso({ user, perfil, perfilListo, academia, rol, esSupremo })
  // Aún resolviendo sesión/perfil/academia: no bloquear todavía.
  const accesoCargando = cargando || motivo === 'cargando'

  // Auto-promoción del supremo: en su primer acceso su perfil nace como
  // 'alumno'; las reglas le permiten (por su correo) subir su propio doc a
  // 'superadmin'. Así el resto del sistema (queries por rol) lo ve como tal.
  useEffect(() => {
    if (!user || !perfilListo || !esCorreoSupremo(user.email)) return
    if (!perfil || perfil.rol === 'superadmin') return
    ;(async () => {
      try {
        const [{ db }, fs] = await Promise.all([
          import('../lib/firebase/init.js'),
          import('firebase/firestore'),
        ])
        await fs.updateDoc(fs.doc(db, 'usuarios', user.uid), { rol: 'superadmin' })
      } catch {
        // Sin permisos (reglas aún no publicadas): la UI sigue mandando por correo.
      }
    })()
  }, [user, perfil, perfilListo])

  const valor = {
    user,
    perfil,
    academia: academia || null,
    cargando,
    salir: (...args) => salirRef.current(...args),
    autenticado: Boolean(user),
    rol,
    academiaId: perfil?.academiaId || null,
    enPrueba: Boolean(perfil?.pruebaHasta?.seconds && perfil.pruebaHasta.seconds * 1000 > Date.now()),
    pruebaHasta: perfil?.pruebaHasta || null,
    esSupremo,
    esSuperadmin,
    esStaff: esSuperadmin || ROLES_STAFF.includes(rol),
    puedeAcceder,
    accesoCargando,
    motivoBloqueo: motivo,
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
