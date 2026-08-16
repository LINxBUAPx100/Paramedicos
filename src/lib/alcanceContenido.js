// ============================================================
//  Alcance del contenido nuevo — lógica PURA
// ------------------------------------------------------------
//  Un profesor crea contenido PARA SU GRUPO; un director, para toda su
//  academia. Pero el contenido vive en la academia, no en el grupo: los grupos
//  solo deciden QUÉ VEN sus alumnos (`grupos/{id}.modulosOcultos` y
//  `.temasOcultos`). No hace falta contenido separado por grupo para conseguir
//  lo que se pide, y separarlo de verdad costaría campo nuevo, reglas nuevas y
//  consultas nuevas, fragmentaría el temario y complicaría la replicación — a
//  cambio de nada que el profesor llegue a notar.
//
//  Así que «solo lo ve mi grupo» se consigue al revés de como suena: un nodo
//  nuevo nace VISIBLE PARA TODOS (es el default de la visibilidad), y lo que
//  hay que hacer es ocultarlo en LOS DEMÁS grupos. El director lo abre a toda
//  la academia quitándolo de esas listas, que es exactamente la pantalla de
//  visibilidad que ya existe.
//
//  Sin React y sin Firebase: se prueba con `npm test`.
// ============================================================

// Qué campo del grupo gobierna cada tipo de nodo. Una UNIDAD no está aquí a
// propósito: la visibilidad por grupo no la contempla, se decide tema a tema.
// Por eso tampoco se le puede prometer a nadie que «su unidad solo la ve su
// grupo» — lo que se acota son los temas que se cuelguen dentro.
const CAMPO = { tema: 'temasOcultos', modulo: 'modulosOcultos' }

// ¿Se puede acotar este tipo de nodo a un grupo? Lo consulta quien avisa al
// usuario, para no afirmar un alcance que no se ha aplicado.
export function esAcotable(tipo) {
  return Object.prototype.hasOwnProperty.call(CAMPO, tipo)
}

// Devuelve los cambios a escribir: [{ grupoId, campo, valores }].
// `valores` es la lista COMPLETA y ya resuelta, para que la capa de datos solo
// tenga que escribirla (nada de leer-modificar-escribir en el servidor).
//
// Vacío significa «no hay nada que hacer», y eso incluye el caso de un profesor
// sin grupo asignado: «solo mi grupo» no quiere decir nada si no tiene grupo, y
// ocultarlo en todos dejaría el tema sin nadie que lo vea, que es peor que
// dejarlo visible.
export function ocultarParaOtrosGrupos({ grupos = [], grupoPropio = null, tipo = 'tema', id = null } = {}) {
  const campo = CAMPO[tipo]
  if (!campo || !id || !grupoPropio) return []

  const cambios = []
  for (const g of grupos) {
    if (!g?.id || g.id === grupoPropio) continue
    const actuales = Array.isArray(g[campo]) ? g[campo] : []
    // Idempotente: si ya lo oculta, no se reescribe. Importa porque esto corre
    // detrás de cada alta y una escritura de más es una escritura que puede
    // fallar sola.
    if (actuales.includes(id)) continue
    cambios.push({ grupoId: g.id, campo, valores: [...actuales, id] })
  }
  return cambios
}

// ¿Hay que acotar lo que crea esta persona a su grupo? Solo el profesor: el
// director y el super-admin crean para toda la academia, que es su ámbito.
//
// Se decide por ROL y no por «tiene grupo asignado», porque un director también
// puede tener grupo (da clase) y su contenido no debe nacer restringido.
export function creaSoloParaSuGrupo({ esSuperadmin = false, rol = null, grupoId = null } = {}) {
  return !esSuperadmin && rol === 'instructor' && Boolean(grupoId)
}

// Frase para decirle a quien acaba de crear algo qué alcance tiene. Va aquí y
// no en el componente para poder probarla: es la única señal de que el tema no
// lo ve toda la academia, y equivocarla es dejar al profesor creyendo lo
// contrario de lo que pasó.
export function avisoDeAlcance({ restringido, nombreGrupo = '', otrosGrupos = 0 } = {}) {
  if (!restringido) return ''
  if (otrosGrupos === 0) {
    return 'Lo verán los alumnos de tu academia (no hay otros grupos todavía).'
  }
  return nombreGrupo
    ? `Por ahora solo lo ve tu grupo (${nombreGrupo}). Tu director puede abrirlo al resto de la academia.`
    : 'Por ahora solo lo ve tu grupo. Tu director puede abrirlo al resto de la academia.'
}
