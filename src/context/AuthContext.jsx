import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { esCorreoSupremo } from '../lib/firebase/supremos.js'
import { capacidadesDe, planEfectivo } from '../lib/capacidades.js'
import { registrar } from '../lib/registro.js'
import { normalizarGrupo, normalizarPerfil } from '../lib/compatNombres.js'
import { perfilCompleto } from '../lib/perfilMinimo.js'
import {
  calcularAcceso, msHastaFinDePrueba, pertenenciaEfectiva, pruebaVigente,
} from '../lib/accesoModelo.js'

const AuthContext = createContext(null)

// Roles con acceso al contenido siendo staff de una academia.
const ROLES_STAFF = ['admin_escuela', 'instructor']

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
              setPerfil(snap.exists() ? normalizarPerfil({ id: snap.id, ...snap.data() }) : null)
              setPerfilListo(true)
              setCargando(false)
            },
            (err) => {
              // Error al leer el perfil (permisos/red): no dejar el spinner infinito.
              // Es el origen del motivo 'sin-perfil', que al usuario se le
              // muestra como "no encontramos tu perfil" sin más pista.
              registrar('perfil:snapshot', err, { uid: u.uid })
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

  // --- VENCIMIENTO EN CALIENTE DE LA PRUEBA -------------------------------
  // Que una prueba venza no cambia ningún documento, así que no llega ningún
  // snapshot que vuelva a calcular el acceso: sin este temporizador, quien
  // tuviera la app abierta al dar la hora seguía estudiando hasta recargar la
  // página. Al disparar, `tick` fuerza un render y el acceso se recalcula con
  // la hora nueva. El módulo acota la espera (los setTimeout largos desbordan),
  // por eso el efecto se re-arma con cada `tick` hasta que ya no queda tiempo.
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const ms = msHastaFinDePrueba(perfil)
    if (ms == null) return
    const id = setTimeout(() => setTick((n) => n + 1), ms + 1000)
    return () => clearTimeout(id)
  }, [perfil, tick])

  // Pertenencia EFECTIVA: una prueba vencida no conserva academia ni grupo
  // aunque el perfil los siga guardando (ver src/lib/accesoModelo.js). Todo lo
  // que cuelga del contexto —temario, panel, exámenes— parte de estos valores,
  // así que al vencer la persona queda como recién registrada. El espejo en el
  // servidor es `pruebaVencida()` en firestore.rules.
  const { academiaId, grupoId, vencida: pruebaTerminada } = pertenenciaEfectiva(perfil)

  // Grupo del usuario en vivo (visibilidad de contenido para alumnos).
  const [grupo, setGrupo] = useState(null)
  useEffect(() => {
    const gid = grupoId
    if (!gid) {
      setGrupo(null)
      return
    }
    let activo = true
    let unsub = null
    ;(async () => {
      const [{ db }, fs] = await Promise.all([
        import('../lib/firebase/init.js'),
        import('firebase/firestore'),
      ])
      if (!activo) return
      unsub = fs.onSnapshot(
        fs.doc(db, 'grupos', gid),
        (snap) => setGrupo(snap.exists() ? normalizarGrupo({ id: snap.id, ...snap.data() }) : null),
        () => setGrupo(null)
      )
    })()
    return () => {
      activo = false
      if (unsub) unsub()
    }
  }, [grupoId])

  // Academia del usuario en vivo (para saber si está activa / ha pagado).
  useEffect(() => {
    const acaId = academiaId
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
  }, [academiaId])

  const rol = perfil?.rol || null
  // El admin supremo se reconoce por su correo (igual que en firestore.rules):
  // manda aunque su doc de Firestore aún no diga 'superadmin'.
  const esSupremo = esCorreoSupremo(user?.email)
  const esSuperadmin = esSupremo || rol === 'superadmin'
  const { puede: puedeAcceder, motivo } = calcularAcceso({ user, perfil, perfilListo, academia, rol, esSupremo })
  // Aún resolviendo sesión/perfil/academia: no bloquear todavía.
  const accesoCargando = cargando || motivo === 'cargando'

  // --- AUTO-REPARACIÓN DEL PERFIL ----------------------------------------
  // Una cuenta de Auth sin su doc en `usuarios` (o con el doc a medias) queda
  // inservible: las reglas de escritura del propio perfil comparan `rol`,
  // `estado` y `academiaId` contra lo que ya hay, así que si falta uno de esos
  // campos toda escritura se deniega — incluido el canje de la invitación, que
  // es justamente lo que la persona está intentando hacer. Pasa por causas
  // ordinarias: el `setDoc` del registro se cayó por red, la pestaña se cerró
  // entre crear la cuenta y crear el perfil, o el doc viene de un esquema
  // anterior. Aquí se arregla en cuanto se detecta.
  //
  // Se intenta UNA vez por uid (`reparados`): si las reglas lo deniegan, no
  // tiene sentido reintentar en bucle contra Firestore. Queda en el registro de
  // diagnóstico, que es lo que el usuario puede enviarnos desde «Mi cuenta».
  const reparados = useRef(new Set())
  useEffect(() => {
    if (!user || !perfilListo) return
    if (perfilCompleto(perfil)) return
    if (reparados.current.has(user.uid)) return
    reparados.current.add(user.uid)
    ;(async () => {
      try {
        const { asegurarPerfil } = await import('../lib/firebase/auth.js')
        // Reparar bien NO se registra: el banner de diagnóstico de «Mi cuenta»
        // cuenta lo que hay en el registro, y anunciar un problema que la app
        // acaba de resolver sola solo asusta.
        await asegurarPerfil(user)
      } catch (err) {
        registrar('perfil:reparar', err, { uid: user.uid })
      }
    })()
  }, [user, perfil, perfilListo])

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
      } catch (err) {
        // Sin permisos (reglas aún no publicadas): la UI sigue mandando por correo.
        registrar('supremo:autopromocion', err)
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
    // EFECTIVOS: null cuando la prueba venció, aunque el perfil los conserve.
    academiaId,
    grupo,
    grupoId,
    enPrueba: pruebaVigente(perfil),
    // true = entró con un código temporal que ya venció. La cuenta existe, pero
    // no pertenece a nada hasta que canjee un código nuevo o el de su academia.
    pruebaTerminada,
    pruebaHasta: perfil?.pruebaHasta || null,
    esSupremo,
    esSuperadmin,
    // Una prueba vencida no es staff de nada: si alguien con un rol de academia
    // canjeó un código temporal, al vencer queda fuera del panel igual que del
    // temario (las reglas hacen lo mismo con esStaffDe()).
    esStaff: esSuperadmin || (!pruebaTerminada && ROLES_STAFF.includes(rol)),
    // Plan comercial y capacidades de LA ACADEMIA DEL USUARIO (fuente única:
    // src/lib/capacidades.js). El superadmin opera academias ajenas desde
    // /admin con los datos de cada academia, no con estos.
    planComercial: planEfectivo(academia || null),
    capacidades: capacidadesDe(academia || null),
    // Ver los CÓDIGOS de academia/grupo: director y super-admin siempre; un
    // profesor solo si un director le aprobó la solicitud (perfil.puedeVerCodigos).
    puedeVerCodigos:
      esSuperadmin
      || (!pruebaTerminada && (rol === 'admin_escuela' || Boolean(perfil?.puedeVerCodigos))),
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
