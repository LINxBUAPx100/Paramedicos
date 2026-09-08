// ============================================================
//  Mi Botiquín — estados derivados del progreso y la validación
// ------------------------------------------------------------
//  No guarda un segundo progreso. Lee `leidos` y la capa de firmas que PTEM
//  ya mantiene, y decide cuánto puede mostrar cada ficha.
// ============================================================

export const ESTADOS_BOTIQUIN = ['disponible', 'proximo', 'bloqueado', 'silueta']
const ESTADOS_FIRMADOS = new Set(['validado', 'publicado'])

export function numeroDeModulo(moduloId) {
  const match = String(moduloId || '').match(/^(?:m|modulo-?)(\d+)$/i)
  return match ? Number(match[1]) : Number.POSITIVE_INFINITY
}

export function temaQueDesbloquea(articulo) {
  return articulo?.desbloqueaCon?.temaId || articulo?.temaIdBasico || articulo?.temaId || null
}

export function articuloValidado(articulo, validaciones = {}) {
  if (!articulo?.temaId) return articulo?.nivelRiesgo === 'identificacion'
  return ESTADOS_FIRMADOS.has(validaciones?.[articulo.temaId]?.estado)
}

export function accesoDeArticulo(articulo, {
  leidos = {},
  validaciones = {},
  vistaInstructor = false,
  siguienteModulo = null,
} = {}) {
  const temaDesbloqueo = temaQueDesbloquea(articulo)
  const leido = !temaDesbloqueo || Boolean(leidos?.[temaDesbloqueo])
  const firmado = articuloValidado(articulo, validaciones)
  const moduloId = articulo?.desbloqueaCon?.moduloId || null

  if (vistaInstructor) {
    return {
      estado: 'disponible',
      desbloqueado: true,
      validado: firmado,
      muestraFicha: true,
      permiteEnlace: Boolean(articulo?.temaId),
      vistaInstructor: true,
      motivo: firmado
        ? 'Lección validada o publicada.'
        : 'Vista de instructor: la ficha se muestra para revisión.',
    }
  }

  if (!leido) {
    const proximo = Boolean(siguienteModulo && moduloId === siguienteModulo)
    return {
      estado: proximo ? 'proximo' : 'bloqueado',
      desbloqueado: false,
      validado: firmado,
      muestraFicha: false,
      permiteEnlace: false,
      vistaInstructor: false,
      motivo: proximo
        ? `Está en el siguiente módulo de tu recorrido (${moduloId?.toUpperCase() || 'pendiente'}).`
        : `Se desbloquea al estudiar ${moduloId?.toUpperCase() || 'la lección indicada'}.`,
    }
  }

  if (articulo?.nivelRiesgo === 'invasivo' && !firmado) {
    return {
      estado: 'silueta',
      desbloqueado: true,
      validado: false,
      muestraFicha: false,
      permiteEnlace: false,
      vistaInstructor: false,
      motivo: 'La identificación completa se habilita cuando la lección recibe validación docente.',
    }
  }

  const enlaceLibre = articulo?.nivelRiesgo === 'identificacion'
  return {
    estado: 'disponible',
    desbloqueado: true,
    validado: firmado,
    muestraFicha: true,
    permiteEnlace: Boolean(articulo?.temaId && (firmado || enlaceLibre)),
    vistaInstructor: false,
    motivo: articulo?.temaId && !firmado && !enlaceLibre
      ? 'Puedes identificar el equipo; la técnica sigue pendiente de validación docente.'
      : 'Artículo disponible en tu botiquín.',
  }
}

function siguienteModuloDelCatalogo(catalogo, leidos) {
  const candidatos = new Set()
  for (const articulo of Array.isArray(catalogo) ? catalogo : []) {
    const tema = temaQueDesbloquea(articulo)
    if (tema && !leidos?.[tema] && articulo?.desbloqueaCon?.moduloId) {
      candidatos.add(articulo.desbloqueaCon.moduloId)
    }
  }
  return [...candidatos].sort((a, b) => numeroDeModulo(a) - numeroDeModulo(b))[0] || null
}

export function estadosDelCatalogo(catalogo, opciones = {}) {
  const siguienteModulo = opciones.siguienteModulo
    || siguienteModuloDelCatalogo(catalogo, opciones.leidos || {})
  return Object.fromEntries((Array.isArray(catalogo) ? catalogo : []).map((articulo) => [
    articulo.id,
    accesoDeArticulo(articulo, { ...opciones, siguienteModulo }),
  ]))
}

export function resumenDeEstados(estados) {
  const resumen = { total: 0, disponible: 0, proximo: 0, bloqueado: 0, silueta: 0 }
  for (const acceso of Object.values(estados || {})) {
    resumen.total += 1
    if (acceso?.estado in resumen) resumen[acceso.estado] += 1
  }
  return resumen
}
