import { useCallback, useEffect, useState } from 'react'
import { leerDeTrabajo, recordarDeTrabajo } from './grupoDeTrabajo.js'

// Estado de React respaldado por la memoria de lib/grupoDeTrabajo.js: arranca
// con lo último elegido en ESA academia y cada cambio queda recordado. Si la
// academia llega después (o cambia), se relee su valor.
export function useDeTrabajo(tipo, academiaId) {
  const [valor, setValor] = useState(() => leerDeTrabajo(tipo, academiaId))
  useEffect(() => { setValor(leerDeTrabajo(tipo, academiaId)) }, [tipo, academiaId])
  const cambiar = useCallback((nuevo) => {
    setValor(nuevo)
    recordarDeTrabajo(tipo, academiaId, nuevo)
  }, [tipo, academiaId])
  return [valor, cambiar]
}
