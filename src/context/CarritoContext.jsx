import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { LINEAS_MAXIMAS, lineasDePedido, problemasDelPedido, totalOrientativo } from '../lib/tiendaModelo.js'

// ============================================================
//  El carrito — vive por encima de las pantallas de la tienda
// ------------------------------------------------------------
//  POR QUÉ UN CONTEXTO Y NO ESTADO DE LA PÁGINA. La tienda dejó de ser una
//  sola pantalla: hay catálogo, ficha de producto y carrito, cada una con su
//  dirección. Si el carrito viviera en el catálogo, entrar a un producto y
//  volver lo vaciaría — que es exactamente lo que ninguna tienda hace.
//
//  SE GUARDA EN EL NAVEGADOR, NO EN FIRESTORE. Un carrito a medio armar no es
//  un dato de la academia: nadie lo consulta, nadie lo audita y guardarlo
//  costaría una escritura por cada «+». En `localStorage` sobrevive a recargar
//  y a cerrar la pestaña, que es lo que la gente espera, y no cuesta nada.
//
//  Y POR ACADEMIA (`ptem:carrito:<academiaId>`): si alguien cambia de academia
//  —un traslado, una cuenta de prueba— no se encuentra el carrito de la otra
//  con artículos que allí no existen.
//
//  Todo lo que se guarda son ids y cantidades. Los PRECIOS no entran aquí ni
//  en el pedido: los pone recepción al confirmar, con el catálogo delante. El
//  porqué está en `lib/tiendaModelo.js`, y es lo que hace que un carrito
//  manipulado no pueda cambiar lo que se cobra.
// ============================================================

const CarritoContext = createContext(null)

const CLAVE = (academiaId) => `ptem:carrito:${academiaId || 'sin-academia'}`

function leerGuardado(academiaId) {
  try {
    const crudo = localStorage.getItem(CLAVE(academiaId))
    if (!crudo) return {}
    const datos = JSON.parse(crudo)
    if (!datos || typeof datos !== 'object' || Array.isArray(datos)) return {}
    // Se sanea al leer: lo que hay en `localStorage` lo puede editar
    // cualquiera, y un `{"x": "mucho"}` reventaría la aritmética del total.
    const limpio = {}
    for (const [id, cantidad] of Object.entries(datos)) {
      const n = Math.trunc(Number(cantidad))
      if (id && Number.isFinite(n) && n > 0) limpio[id] = Math.min(99, n)
    }
    return limpio
  } catch {
    // Modo privado, almacenamiento bloqueado o JSON roto: se empieza vacío.
    return {}
  }
}

export function CarritoProvider({ academiaId, catalogo = [], children }) {
  const [lineas, setLineas] = useState(() => leerGuardado(academiaId))

  // Al cambiar de academia se carga el carrito de esa academia, no se arrastra
  // el anterior.
  useEffect(() => { setLineas(leerGuardado(academiaId)) }, [academiaId])

  useEffect(() => {
    try {
      if (Object.keys(lineas).length) localStorage.setItem(CLAVE(academiaId), JSON.stringify(lineas))
      else localStorage.removeItem(CLAVE(academiaId))
    } catch { /* almacenamiento bloqueado: el carrito dura lo que la pestaña */ }
  }, [lineas, academiaId])

  /**
   * Cambia la cantidad de un artículo.
   *
   * El tope es el INVENTARIO del artículo cuando se conoce: no se deja meter
   * en el carrito lo que después se va a rechazar al enviar, porque descubrir
   * el límite en el último paso es lo que hace abandonar un pedido.
   */
  const poner = useCallback((articuloId, cantidad, tope = 99) => {
    if (!articuloId) return
    setLineas((prev) => {
      const n = Math.max(0, Math.min(Number(tope) || 99, Math.trunc(Number(cantidad) || 0)))
      const copia = { ...prev }
      if (n <= 0) delete copia[articuloId]
      else copia[articuloId] = n
      return copia
    })
  }, [])

  const sumar = useCallback((articulo, delta = 1) => {
    const id = articulo?.id
    if (!id) return
    setLineas((prev) => {
      const tope = Math.max(0, Math.trunc(Number(articulo?.existencias) || 0))
      const n = Math.max(0, Math.min(tope || 99, (Number(prev[id]) || 0) + delta))
      const copia = { ...prev }
      if (n <= 0) delete copia[id]
      else copia[id] = n
      return copia
    })
  }, [])

  const quitar = useCallback((articuloId) => {
    setLineas((prev) => {
      const copia = { ...prev }
      delete copia[articuloId]
      return copia
    })
  }, [])

  const vaciar = useCallback(() => setLineas({}), [])

  const valor = useMemo(() => {
    const detalladas = lineasDePedido(lineas)
      .map((l) => {
        const art = catalogo.find((a) => a.id === l.articuloId)
        return art ? { ...l, articulo: art, subtotal: (Number(art.precio) || 0) * l.cantidad } : null
      })
      // Un artículo que la academia despublicó mientras el carrito estaba
      // guardado desaparece de la lista en vez de pintarse como un hueco.
      .filter(Boolean)

    return {
      lineas,
      detalladas,
      piezas: detalladas.reduce((s, l) => s + l.cantidad, 0),
      distintos: detalladas.length,
      total: totalOrientativo(lineas, catalogo),
      lleno: Object.keys(lineas).length >= LINEAS_MAXIMAS,
      problemas: problemasDelPedido(lineas, catalogo),
      cantidadDe: (id) => Number(lineas[id]) || 0,
      poner,
      sumar,
      quitar,
      vaciar,
    }
  }, [lineas, catalogo, poner, sumar, quitar, vaciar])

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

export function useCarrito() {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de CarritoProvider')
  return ctx
}
