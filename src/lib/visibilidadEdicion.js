// Mostrar un módulo no publica de nuevo sus temas ocultos individualmente.
export function alternarModuloConExcepciones(ocultas, moduloId) {
  const modulos = ocultas.modulos.includes(moduloId)
    ? ocultas.modulos.filter((id) => id !== moduloId)
    : [...ocultas.modulos, moduloId]
  return { modulos, temas: [...ocultas.temas] }
}
