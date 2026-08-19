import { useMemo } from 'react'
import { useContenido } from '../context/ContenidoContext.jsx'
import { construirGlosario, expresionDeTerminos } from './glosario.js'

// ============================================================
//  El glosario del contenido que ESTE alumno tiene servido
// ------------------------------------------------------------
//  Se construye a partir de `todosLosTemas` del resolutor (bundle o la copia
//  de su academia), así que una academia que edite sus temas ve su propio
//  glosario, no uno fijo del código.
//
//  Se memoriza contra el contenido entero: son ~1 100 términos y una expresión
//  regular con todos ellos: recalcularlo en cada render de cada párrafo sería
//  caro y no cambia nada entre renders.
// ============================================================
export function useGlosario() {
  const { contenido } = useContenido()
  return useMemo(() => {
    const g = construirGlosario(contenido?.todosLosTemas || [])
    return { ...g, regex: expresionDeTerminos(g.entradas) }
  }, [contenido])
}
