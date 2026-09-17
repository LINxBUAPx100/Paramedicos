export function normalizarConsulta(texto) {
  return String(texto || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim()
}

// Primero se acota al contenido visible; filtros y contadores usan ese conjunto.
export function filtrarTemasEstudio(temas, { temaVisible = () => true, moduloId = '', consulta = '', lectura = 'todos', leidos = {} } = {}) {
  const q = normalizarConsulta(consulta)
  return temas.filter((tema) => temaVisible(tema.id)
    && (!moduloId || tema.moduloId === moduloId)
    && (!q || normalizarConsulta(`${tema.numero} ${tema.tituloVisible || tema.titulo}`).includes(q))
    && (lectura === 'todos' || (lectura === 'leidos' ? Boolean(leidos[tema.id]) : !leidos[tema.id])))
}

export function paginarLista(lista, pagina = 1, cantidad = 20) {
  const paginas = Math.max(1, Math.ceil(lista.length / cantidad))
  const actual = Math.min(paginas, Math.max(1, Number.isFinite(Number(pagina)) ? Math.trunc(Number(pagina)) : 1))
  const desde = (actual - 1) * cantidad
  return { filas: lista.slice(desde, desde + cantidad), pagina: actual, paginas, total: lista.length, desde: lista.length ? desde + 1 : 0, hasta: Math.min(desde + cantidad, lista.length) }
}

export function resumenLectura(temas, estado) {
  const leidos = temas.filter((t) => estado.leidos?.[t.id]).length
  const quizzes = temas.map((t) => estado.quizzes?.[t.id]).filter((q) => q && q.total > 0 && Number.isFinite(q.aciertos))
  return {
    total: temas.length, leidos,
    porcentaje: temas.length ? Math.round(leidos / temas.length * 100) : 0,
    quizzes: quizzes.length,
    promedio: quizzes.length ? Math.round(quizzes.reduce((suma, q) => suma + q.aciertos / q.total, 0) / quizzes.length * 100) : null,
  }
}
