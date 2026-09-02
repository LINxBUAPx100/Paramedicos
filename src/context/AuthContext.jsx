import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { debePedirTerminos } from '../lib/terminosModelo.js'
import { esCorreoSupremo } from '../lib/firebase/supremos.js'
import { capacidadesDe, planEfectivo } from '../lib/capacidades.js'
import { registrar } from '../lib/registro.js'
import { normalizarGrupo, normalizarPerfil } from '../lib/compatNombres.js'
import { perfilCompleto } from '../lib/perfilMinimo.js'
import {
  calcularAcceso, msHastaFinDePrueba, pertenenciaEfectiva, pruebaVigente,
} from '../lib/accesoModelo.js'
import { gruposDeUsuario, grupoActivoDe, puedeElegirGrupo } from '../lib/gruposDeUsuario.js'
import { hayIndicioDeSesion } from '../lib/sesionProbable.js'

const AuthContext = createContext(null)

// Roles con acceso al contenido siendo staff de una academia.
const ROLES_STAFF = ['admin_escuela', 'instructor']

// Grupo con el que se está trabajando, recordado POR ACADEMIA y por navegador.
// Mismo patrón que el curso elegido en ContenidoContext, y por el mismo motivo:
// es una preferencia de lectura, no una credencial.
const CLAVE_GRUPO = (academiaId) => `ptem:grupo:${academiaId || 'sin-academia'}`

function leerGrupoGuardado(academiaId) {
  try { return localStorage.getItem(CLAVE_GRUPO(academiaId)) || null } catch { return null }
}

function guardarGrupo(academiaId, grupoId) {
  try {
    if (grupoId) localStorage.setItem(CLAVE_GRUPO(academiaId), grupoId)
    else localStorage.removeItem(CLAVE_GRUPO(academiaId))
  } catch { /* almacenamiento bloqueado: la elección dura lo que la sesión */ }
}

// Expone usuario de Firebase Auth + perfil de Firestore (rol, academia, estado) +
// la academia del usuario, y calcula el acceso al contenido. El SDK de Firebase se
// carga de forma DIFERIDA (import dinámico) para no engordar el bundle inicial.
//
// Y DESDE EL 02-09-2026, SOLO CUANDO HACE FALTA. Antes se cargaba al montar, en
// toda visita: era la única forma de saber si había sesión, y costaba ~950 kB
// (240 comprimidos) también a quien solo abría la portada pública. Ahora se
// pregunta primero a `lib/sesionProbable.js`, que mira lo que el propio SDK deja
// escrito en el navegador y ante la duda dice que sí.
//
// Quien necesite sesión sin esperar a esa respuesta llama a `encender()` del
// contexto: lo hacen la página de cuenta —donde se inicia sesión— y
// `RutaProtegida`, que es donde equivocarse no es una opción.
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [perfil, setPerfil] = useState(null)
  const [perfilListo, setPerfilListo] = useState(false) // true tras el 1er snapshot del perfil
  const [academia, setAcademia] = useState(undefined) // undefined = sin cargar; null = no existe
  const [cargando, setCargando] = useState(true)
  const salirRef = useRef(() => Promise.resolve())

  // ¿Se ha encendido ya Firebase en esta pestaña? El ref evita encenderlo dos
  // veces cuando la sonda y una llamada a `encender()` coinciden.
  const [encendido, setEncendido] = useState(false)
  const encendidoRef = useRef(false)
  const encender = useCallback(() => {
    if (encendidoRef.current) return
    encendidoRef.current = true
    // Vuelve a «cargando»: si la sonda ya había dicho «sin sesión», la pantalla
    // debe esperar a que Auth conteste de verdad en vez de afirmar que no hay
    // nadie. Sin esto, una ruta protegida enseñaría «no has iniciado sesión»
    // durante un instante a quien sí la tiene.
    setCargando(true)
    setEncendido(true)
  }, [])

  // La sonda. No carga nada: mira si este navegador tiene rastro de una sesión.
  useEffect(() => {
    let vivo = true
    hayIndicioDeSesion()
      .then((hay) => {
        if (!vivo) return
        if (hay) encender()
        // Sin rastro de sesión no se espera a nadie: la app puede pintar ya, y
        // el SDK entrará en cuanto alguien vaya a iniciar sesión.
        else setCargando(false)
      })
      .catch(() => { if (vivo) encender() })
    return () => { vivo = false }
  }, [encender])

  // Sesión + perfil en vivo.
  useEffect(() => {
    if (!encendido) return undefined
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
  }, [encendido])

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
  const { academiaId, vencida: pruebaTerminada } = pertenenciaEfectiva(perfil)
  const rol = perfil?.rol || null

  // Perfil EFECTIVO: una prueba vencida no conserva grupos, aunque el documento
  // los siga guardando. Se aplica aquí una vez para que ni la lista ni el grupo
  // activo tengan que acordarse.
  const perfilEfectivo = pruebaTerminada ? null : perfil

  // GRUPOS de esta persona. Un alumno tiene el suyo; un profesor puede llevar
  // varios (`grupoIds`) y elige con cuál trabaja. Ver src/lib/gruposDeUsuario.js.
  const grupos = useMemo(
    () => gruposDeUsuario(perfilEfectivo, rol),
    [perfilEfectivo, rol]
  )

  // Cuál tiene abierto. Vive en `localStorage` y no en el perfil porque es una
  // preferencia de trabajo, no un permiso: perderla no rompe nada y guardarla
  // costaría una escritura cada vez que la maestra cambia de grupo. Y no
  // concede nada: `grupoActivoDe` descarta un id que no sea suyo.
  const [grupoElegido, setGrupoElegido] = useState(() => leerGrupoGuardado(academiaId))
  useEffect(() => { setGrupoElegido(leerGrupoGuardado(academiaId)) }, [academiaId])

  const grupoId = grupoActivoDe({ perfil: perfilEfectivo, rol, elegido: grupoElegido })

  const elegirGrupo = useCallback((id) => {
    guardarGrupo(academiaId, id)
    setGrupoElegido(id || null)
  }, [academiaId])

  // Grupo ACTIVO en vivo (visibilidad de contenido para alumnos).
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

  // `rol` se calcula más arriba: los grupos lo necesitan antes que esto.
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
    // Enciende Firebase ahora. Lo llama quien va a necesitar sesión sí o sí.
    encender,
    autenticado: Boolean(user),
    rol,
    // EFECTIVOS: null cuando la prueba venció, aunque el perfil los conserve.
    academiaId,
    // GRUPO ACTIVO: el doc y su id. Para un alumno es el suyo y no cambia;
    // para un profesor, aquel con el que ha decidido trabajar ahora.
    grupo,
    grupoId,
    // TODOS sus grupos, y con qué puede cambiar de uno a otro. `grupos` son
    // ids: quien necesite los documentos los cruza con los de su academia
    // (gruposDelPanel), que ya los tiene cargados.
    grupos,
    elegirGrupo,
    puedeElegirGrupo: puedeElegirGrupo(rol, grupos),
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
    // ¿Hay que pedirle que acepte los términos antes de dejarle usar nada?
    // Se calcula aquí, junto al resto del acceso, para que ninguna pantalla
    // tenga que acordarse de preguntarlo por su cuenta.
    debeAceptarTerminos: debePedirTerminos({ perfil, perfilListo, rol, esSupremo }),
  }

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
