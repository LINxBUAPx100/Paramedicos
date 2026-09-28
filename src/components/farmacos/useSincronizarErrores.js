import { useCallback } from 'react'
import { useAuth } from '../../context/AuthContext.jsx'
import { registrar } from '../../lib/registro.js'

// Sube las cuentas de errores de cálculo del alumno para que su profesor vea
// qué reforzar en clase (PTEM Pulso). Solo alumnos con academia y sesión.
//
// Si la regla de `erroresCalculo` aún no está desplegada, la escritura se
// rechaza y solo queda en el registro de errores: la copia local sigue siendo
// la que usa la ruta del alumno, y nada más deja de funcionar.
export function useSincronizarErrores() {
  const { user, rol, academiaId, grupoId } = useAuth()
  return useCallback((errores) => {
    if (!user?.uid || !academiaId || rol !== 'alumno') return
    import('../../lib/firebase/erroresCalculo.js')
      .then((m) => m.subirErroresCalculo({ uid: user.uid, academiaId, grupoId, errores }))
      .catch((err) => registrar('erroresCalculo:subir', err, { uid: user.uid }))
  }, [user?.uid, rol, academiaId, grupoId])
}
