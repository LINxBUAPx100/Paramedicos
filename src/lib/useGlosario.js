import { useMemo } from 'react'
import { useApiContenido, useCargaDeAgregado } from '../context/ContenidoContext.jsx'
import { expresionDeTerminos } from './glosario.js'
import { glosarioParaEnlazar } from './agregadosModelo.js'

// ============================================================
//  El glosario del contenido que ESTE alumno tiene servido
// ------------------------------------------------------------
//  Se construye a partir del temario del resolutor (bundle o la copia de su
//  academia), así que una academia que edite sus temas ve su propio glosario.
//
//  Hay DOS hooks porque hay dos necesidades de tamaño muy distintas, y
//  confundirlas era lo que ataba cada lección al temario entero:
//
//   · SUBRAYAR tecnicismos dentro de una lección solo necesita la palabra y su
//     enlace. Son 71 KB y lo pide CADA lección: es la ruta caliente.
//   · LA FICHA de /logros necesita además las definiciones y el reparto por
//     módulo. Son 489 KB y lo pide una sola pantalla, cuando el alumno entra.
//
//  Antes las dos salían del mismo sitio: los 287 temas completos en memoria.
// ============================================================

/**
 * Glosario mínimo para enlazar términos en la prosa de una lección.
 *
 * Mientras carga devuelve un glosario vacío en vez de bloquear: el texto se
 * pinta sin subrayados y los enlaces aparecen cuando llegan. Es preferible a
 * retrasar la lección por sus enlaces.
 */
export function useGlosario() {
  const enlaces = useCargaDeAgregado((api) => api.enlacesGlosarioAsync(), [])
  return useMemo(() => {
    const g = glosarioParaEnlazar(enlaces || [])
    return { ...g, regex: expresionDeTerminos(g.entradas) }
  }, [enlaces])
}

/**
 * Glosario COMPLETO, con definiciones y agrupado por módulo (pantalla /logros).
 *
 * Se rearma desde los agregados por módulo. El orden entre módulos es el del
 * plan porque los agregados se piden en ese orden; dentro de cada bloque manda
 * el `orden` con el que se generó el glosario, que es el de aparición.
 */
export function useGlosarioCompleto() {
  const { api } = useApiContenido()
  const entradas = useCargaDeAgregado((a) => a.glosarioCompletoAsync(), [])

  return useMemo(() => {
    const lista = entradas || []
    const indice = new Map()
    for (const e of lista) if (!indice.has(e.clave)) indice.set(e.clave, e)

    // Un bloque por módulo, en el orden en que los módulos salen del índice:
    // así /logros lee igual que el temario aunque un módulo no aporte términos.
    const porModulo = []
    let bloque = null
    for (const e of lista) {
      if (!bloque || bloque.moduloId !== e.moduloId) {
        bloque = {
          moduloId: e.moduloId,
          moduloNumero: e.moduloNumero,
          moduloTitulo: e.moduloTitulo,
          moduloColor: e.moduloColor,
          entradas: [],
        }
        porModulo.push(bloque)
      }
      bloque.entradas.push(e)
    }

    return { entradas: lista, porModulo, indice, total: lista.length, cargando: !api || entradas === null }
  }, [entradas, api])
}
