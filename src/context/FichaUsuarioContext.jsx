import { createContext, lazy, Suspense, useCallback, useContext, useMemo, useState } from 'react'
import { useAuth } from './AuthContext.jsx'
import { permisosDeFicha, puedeAbrirFichas } from '../lib/fichaUsuario.js'

// La ficha entera —formulario, contraseña, historial— se descarga la primera
// vez que alguien pulsa un nombre. Quien nunca abre una no paga su peso, y eso
// incluye al alumno, que es quien más veces carga la aplicación.
const FichaUsuarioModal = lazy(() => import('../components/usuarios/FichaUsuarioModal.jsx'))

// ============================================================
//  LA FICHA DE PERSONA, DISPONIBLE DESDE CUALQUIER SITIO
// ------------------------------------------------------------
//  Se pidió que en el 100 % de los lugares donde aparece una persona se pueda
//  pulsar su nombre y abrir su ficha. «El 100 %» es el requisito difícil: hay
//  una docena larga de listas repartidas entre tres consolas, y cualquier
//  solución que obligue a cada una a montar un modal propio se rompe en cuanto
//  alguien añada la lista número trece.
//
//  Por eso el modal vive AQUÍ, montado una sola vez por encima de todo, y las
//  listas solo dicen a quién abrir:
//
//      const abrir = useAbrirFicha()
//      <BotonPersona persona={m} />        ← lo normal, ya lo hace por dentro
//      abrir(uid)                          ← cuando hace falta a mano
//
//  Una lista no sabe qué campos son editables, ni quién puede tocar una
//  contraseña, ni cómo se audita un cambio. Solo sabe a quién se refiere.
//
//  QUIÉN PUEDE ABRIRLA la decide `lib/fichaUsuario.js` (super-admin, director
//  y recepción; un profesor no). Si quien mira no puede, `abrir()` no hace
//  nada y `BotonPersona` pinta texto plano: un nombre que se puede pulsar y no
//  hace nada es peor que uno que no se puede pulsar.
// ============================================================

const FichaUsuarioContext = createContext(null)

export function FichaUsuarioProvider({ children }) {
  const { rol, esSuperadmin, user, academiaId } = useAuth()
  // Lo que se está mirando: un uid, o la persona entera si quien abre ya la
  // tenía cargada (evita una lectura y pinta el nombre al instante).
  const [abierta, setAbierta] = useState(null)

  const habilitado = puedeAbrirFichas({ rol, esSuperadmin })

  const abrir = useCallback((personaOUid) => {
    if (!habilitado || !personaOUid) return
    const persona = typeof personaOUid === 'string'
      ? { uid: personaOUid }
      : { ...personaOUid, uid: personaOUid.uid || personaOUid.id }
    if (!persona.uid) return
    setAbierta(persona)
  }, [habilitado])

  const cerrar = useCallback(() => setAbierta(null), [])

  const valor = useMemo(() => ({
    abrir,
    cerrar,
    habilitado,
    // Permisos sobre UNA persona concreta. Lo usa `BotonPersona` para decidir
    // si ese nombre en particular es pulsable: recepción, por ejemplo, abre
    // fichas de alumnos y no la de su director.
    permisosSobre: (persona) => permisosDeFicha({
      rol, esSuperadmin, miUid: user?.uid, miAcademiaId: academiaId, objetivo: persona,
    }),
  }), [abrir, cerrar, habilitado, rol, esSuperadmin, user?.uid, academiaId])

  return (
    <FichaUsuarioContext.Provider value={valor}>
      {children}
      {abierta && (
        <Suspense fallback={null}>
          <FichaUsuarioModal persona={abierta} onCerrar={cerrar} />
        </Suspense>
      )}
    </FichaUsuarioContext.Provider>
  )
}

/**
 * El contexto completo. Devuelve un objeto INERTE cuando no hay proveedor, en
 * vez de lanzar: hay pantallas —la portada pública, la de términos— que montan
 * listas fuera del árbol de la aplicación, y no tiene sentido que reventaran
 * por no poder abrir una ficha que nadie va a pedir ahí.
 */
export function useFichaUsuario() {
  return useContext(FichaUsuarioContext) || {
    abrir: () => {},
    cerrar: () => {},
    habilitado: false,
    permisosSobre: () => ({ puedeVer: false, campos: [], puedeContrasena: false }),
  }
}

export function useAbrirFicha() {
  return useFichaUsuario().abrir
}
