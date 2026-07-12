import { createContext, useContext, useEffect, useRef, useState } from 'react'

const AuthContext = createContext(null)

// Roles con acceso al contenido siendo staff de una academia.
const ROLES_STAFF = ['admin_escuela', 'instructor']

// Calcula si el usuario puede acceder al contenido y, si no, el motivo.
//   superadmin           → acceso total (bypass).
//   sin sesión           → 'no-sesion'
//   perfil inexistente    → 'sin-perfil' (no se queda cargando para siempre)
//   usuario no activo     → 'usuario-bloqueado'
//   sin academia          → 'sin-academia'
//   academia no activa    → 'academia-inactiva' (no ha pagado / suspendida)
function calcularAcceso({ user, perfil, perfilListo, academia, rol }) {
  if (rol === 'superadmin') return { puede: true, motivo: null }
  if (!user) return { puede: false, motivo: 'no-sesion' }
  if (!perfilListo) return { puede: false, motivo: 'cargando' }
  if (!perfil) return { puede: false, motivo: 'sin-perfil' }
  if (perfil.estado && perfil.estado !== 'activo') return { puede: false, motivo: 'usuario-bloqueado' }
  if (!perfil.academiaId) return { puede: false, motivo: 'sin-academia' }
  if (academia === undefined) return { puede: false, motivo: 'cargando' } // academia aún cargando
  if (!academia || academia.estado !== 'activo') return { puede: false, motivo: 'academia-inactiva' }
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
  const { puede: puedeAcceder, motivo } = calcularAcceso({ user, perfil, perfilListo, academia, rol })
  // Aún resolviendo sesión/perfil/academia: no bloquear todavía.
  const accesoCargando = cargando || motivo === 'cargando'

  const valor = {
    user,
    perfil,
    academia: academia || null,
    cargando,
    salir: (...args) => salirRef.current(...args),
    autenticado: Boolean(user),
    rol,
    academiaId: perfil?.academiaId || null,
    esSuperadmin: rol === 'superadmin',
    esStaff: rol === 'superadmin' || ROLES_STAFF.includes(rol),
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
