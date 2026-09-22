// Esta búsqueda usa únicamente el catálogo que recibe el prototipo.
export function buscarModulos(modulos, consulta) {
  const normalizar = (valor) => String(valor).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  const palabras = normalizar(consulta).trim().split(/\s+/).filter(Boolean)
  return modulos.filter((modulo) => palabras.every((palabra) => normalizar(modulo.titulo).includes(palabra)))
}
