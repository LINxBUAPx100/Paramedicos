// ============================================================
//  Replicación de contenido — lógica PURA (Fase 7)
// ------------------------------------------------------------
//  Sin Firebase, sin React. Todo lo que la replicación decide se calcula
//  aquí y se prueba con `npm test`; las capas de datos (navegador con el
//  super-admin, o scripts/replicar-contenido.mjs con firebase-admin) solo
//  ejecutan el plan resultante.
//
//  PRINCIPIO NO NEGOCIABLE: cada academia opera una copia INDEPENDIENTE.
//  Una replicación jamás crea referencias compartidas, jamás propaga nada
//  automáticamente y jamás sobrescribe cambios locales en silencio: la
//  estrategia predeterminada es CONSERVAR_LOCAL y REEMPLAZAR_CON_ORIGEN
//  exige respaldo previo + confirmación reforzada.
// ============================================================
import { clonProfundo, cursoIdDe, temaDocIdEnCurso, lotes } from './contenidoModelo.js'
import { capacidadesDe, planEfectivo } from './capacidades.js'

// ---------- Huella de contenido (hash determinista, igual en Node y navegador) ----------

// JSON estable: claves de objeto ordenadas ⇒ la misma huella para el mismo
// contenido aunque Firestore devuelva las claves en otro orden.
export function jsonEstable(valor) {
  if (valor === null || valor === undefined) return 'null'
  if (Array.isArray(valor)) return `[${valor.map(jsonEstable).join(',')}]`
  if (typeof valor === 'object') {
    const claves = Object.keys(valor).sort()
    return `{${claves.map((k) => `${JSON.stringify(k)}:${jsonEstable(valor[k])}`).join(',')}}`
  }
  return JSON.stringify(valor)
}

// FNV-1a de 32 bits con semilla; dos pasadas = 64 bits efectivos, suficiente
// para DETECTAR CAMBIOS (no es criptográfico ni necesita serlo).
function fnv1a(texto, semilla) {
  let h = semilla >>> 0
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i)
    h = Math.imul(h, 0x01000193) >>> 0
  }
  return h >>> 0
}

export function huella(valor) {
  const texto = jsonEstable(valor)
  const a = fnv1a(texto, 0x811c9dc5)
  const b = fnv1a(texto, 0x1b873593)
  return `${a.toString(16).padStart(8, '0')}${b.toString(16).padStart(8, '0')}-${texto.length}`
}

// Campos COMPARABLES de un tema: solo el contenido académico. Nunca entran
// metadatos (ids, versiones, fechas, autores, estado) — esos cambian por
// razones administrativas y no significan "contenido distinto".
export const CAMPOS_CONTENIDO_TEMA = [
  'titulo', 'icono', 'duracion', 'resumen', 'objetivos', 'secciones',
  'conceptosClave', 'flashcards', 'quiz', 'recursos', 'actividades',
]

export function contenidoComparableTema(tema) {
  const out = {}
  for (const campo of CAMPOS_CONTENIDO_TEMA) out[campo] = tema?.[campo] ?? null
  return out
}

export function huellaTema(tema) {
  return huella(contenidoComparableTema(tema))
}

// Estructura comparable de un curso (jerarquía + títulos + estados propios).
export function estructuraComparable(estructura) {
  return (estructura || []).map((f) => ({
    id: f.id, titulo: f.titulo, subtitulo: f.subtitulo || '', color: f.color || '',
    estado: f.estado || 'publicado',
    modulos: (f.modulos || []).map((m) => ({
      id: m.id, titulo: m.titulo, estado: m.estado || 'publicado',
      temas: (m.temas || []).map((t) => ({ id: t.id, titulo: t.titulo, estado: t.estado || 'publicado' })),
    })),
  }))
}

export function huellaEstructura(estructura) {
  return huella(estructuraComparable(estructura))
}

// ---------- Estados de una operación de replicación ----------

export const ESTADOS_REPLICACION = [
  'borrador', 'analizando', 'lista', 'esperando_confirmacion', 'aplicando',
  'completada', 'completada_con_advertencias', 'fallida',
  'revirtiendo', 'revertida', 'cancelada',
]

// Máquina de estados: qué transiciones son legales. Evita, por ejemplo,
// aplicar sin análisis vigente o revertir una operación jamás aplicada.
const TRANSICIONES = {
  borrador: ['analizando', 'cancelada'],
  analizando: ['lista', 'fallida', 'cancelada', 'borrador'],
  lista: ['esperando_confirmacion', 'analizando', 'cancelada', 'borrador'],
  esperando_confirmacion: ['aplicando', 'lista', 'cancelada'],
  // 'aplicando' NO transiciona a sí mismo: es el bloqueo anti doble ejecución
  // (reanudar tras un cierre abrupto exige la opción explícita `reanudar`).
  aplicando: ['completada', 'completada_con_advertencias', 'fallida'],
  completada: ['revirtiendo'],
  completada_con_advertencias: ['revirtiendo'],
  // Una fallida puede REANUDARSE (volver a aplicar, idempotente) o revertirse.
  fallida: ['aplicando', 'revirtiendo', 'cancelada'],
  revirtiendo: ['revertida', 'fallida'],
  revertida: [],
  cancelada: [],
}

export function puedeTransicionar(de, a) {
  return Boolean(TRANSICIONES[de]?.includes(a))
}

// ---------- Estrategias de conflicto ----------

export const ESTRATEGIAS = [
  'conservar_local', 'reemplazar_con_origen', 'duplicar_como_nuevo', 'seleccion_manual',
]
export const ESTRATEGIA_DEFAULT = 'conservar_local'

export const ETIQUETA_ESTRATEGIA = {
  conservar_local: 'Conservar lo local',
  reemplazar_con_origen: 'Reemplazar con el origen',
  duplicar_como_nuevo: 'Duplicar como nuevo',
  seleccion_manual: 'Selección manual',
}

export const DESCRIPCION_ESTRATEGIA = {
  conservar_local:
    'Agrega solo lo nuevo y actualiza lo que la academia NO ha tocado. Ningún cambio local se pierde.',
  reemplazar_con_origen:
    'Sustituye el contenido seleccionado por la versión del origen (con respaldo previo y confirmación reforzada). Lo creado por la academia se conserva.',
  duplicar_como_nuevo:
    'Conserva la versión local y agrega la versión del origen como una copia nueva e independiente.',
  seleccion_manual:
    'Como conservar lo local, pero cada conflicto exige una decisión explícita por elemento.',
}

// ---------- Clasificación de cambios (comparación origen ↔ destino) ----------

export const CLASES_CAMBIO = [
  'nuevo',                // existe en el origen, no en el destino
  'sin_cambios',          // idéntico en ambos
  'modificado_en_origen', // el origen cambió; la academia NO lo tocó
  'modificado_local',     // la academia lo tocó; el origen NO cambió
  'conflicto',            // ambos cambiaron (o no hay sello para distinguirlo)
  'solo_local',           // creado por la academia (no existe en el origen)
  'archivado_local',      // la academia lo archivó (decisión local que se respeta)
]

// Clasifica UN tema. `origen` = contenido de la versión de plantilla que se
// replica; `destino` = doc actual de la academia (puede traer el SELLO
// destino.origen.hash con la huella de lo que la academia recibió al clonar).
// Sin sello (clones previos a la Fase 7) no se puede saber quién cambió:
// cualquier divergencia se trata como CONFLICTO (conservador, jamás pisa).
export function clasificarTema({ origen, destino }) {
  if (!destino) return 'nuevo'
  if ((destino.estado || 'publicado') === 'archivado') return 'archivado_local'
  const hOrigen = huellaTema(origen)
  const hLocal = huellaTema(destino)
  if (hOrigen === hLocal) return 'sin_cambios'
  const sello = destino.origen?.hash || null
  if (!sello) return 'conflicto'
  const localCambio = hLocal !== sello
  const origenCambio = hOrigen !== sello
  if (localCambio && origenCambio) return 'conflicto'
  if (localCambio) return 'modificado_local'
  return 'modificado_en_origen'
}

// Ruta jerárquica legible de un tema dentro de una estructura (Fase > Módulo).
function rutaDeTema(estructura, temaId) {
  for (const f of estructura || []) {
    for (const m of f.modulos || []) {
      if ((m.temas || []).some((t) => t.id === temaId)) {
        return m.implicito ? f.titulo : `${f.titulo} › ${m.titulo}`
      }
    }
  }
  return ''
}

// Compara un curso ORIGEN (estructura + temas de una versión de plantilla)
// contra el estado ACTUAL de una academia. No escribe nada. Devuelve la lista
// clasificada de elementos, el resumen por clase y la huella del destino
// (para detectar si el destino cambia entre el dry-run y la aplicación).
export function compararCurso({ estructuraOrigen, temasOrigen, cursoDestino, temasDestino }) {
  const porIdDestino = new Map((temasDestino || []).map((t) => [t.temaId, t]))
  const idsOrigen = new Set((temasOrigen || []).map((t) => t.temaId))
  const elementos = []

  for (const temaOrigen of temasOrigen || []) {
    const destino = porIdDestino.get(temaOrigen.temaId) || null
    const clase = cursoDestino ? clasificarTema({ origen: temaOrigen, destino }) : 'nuevo'
    elementos.push({
      tipo: 'tema',
      temaId: temaOrigen.temaId,
      titulo: temaOrigen.titulo || temaOrigen.temaId,
      ruta: rutaDeTema(estructuraOrigen, temaOrigen.temaId),
      clase,
      idDestino: destino ? destino.docId || null : null,
      versionOrigen: temaOrigen.version ?? null,
      versionDestino: destino?.version ?? null,
      modificadoLocalPor: destino?.actualizadoPor || null,
      modificadoLocalEn: destino?.actualizado || null,
    })
  }
  // Temas creados por la academia (o duplicados previos): SOLO informativos;
  // ninguna estrategia los toca ni los borra.
  for (const t of temasDestino || []) {
    if (!idsOrigen.has(t.temaId)) {
      elementos.push({
        tipo: 'tema',
        temaId: t.temaId,
        titulo: t.titulo || t.temaId,
        ruta: '',
        clase: 'solo_local',
        idDestino: t.docId || null,
        versionOrigen: null,
        versionDestino: t.version ?? null,
        modificadoLocalPor: t.actualizadoPor || null,
        modificadoLocalEn: t.actualizado || null,
      })
    }
  }

  const resumen = {}
  for (const clase of CLASES_CAMBIO) resumen[clase] = 0
  for (const e of elementos) resumen[e.clase] = (resumen[e.clase] || 0) + 1

  return {
    elementos,
    resumen,
    // Huella del DESTINO completo al momento del análisis: si cambia antes de
    // aplicar, el dry-run dejó de estar vigente y hay que re-analizar.
    huellaDestino: huella({
      estructura: estructuraComparable(cursoDestino?.estructura || null),
      temas: (temasDestino || [])
        .map((t) => ({ id: t.temaId, h: huellaTema(t), estado: t.estado || 'publicado' }))
        .sort((a, b) => (a.id < b.id ? -1 : 1)),
    }),
  }
}

// ---------- Compatibilidad plantilla ↔ academia (capacidades centralizadas) ----------

// Devuelve la lista de incompatibilidades (vacía = compatible). `cursosActivos`
// = nº de cursos NO archivados que ya tiene la academia; `esNuevoCurso` = la
// operación crearía un curso que la academia aún no tiene.
export function validarCompatibilidad({ plantilla, academia, cursosActivos = 0, esNuevoCurso = false }) {
  const errores = []
  if (!academia) {
    errores.push({ tipo: 'academia', detalle: 'La academia destino no existe.' })
    return errores
  }
  const caps = capacidadesDe(academia)
  if (!caps.plantillas) {
    errores.push({ tipo: 'plan', detalle: `El plan ${planEfectivo(academia)} no recibe clonaciones de plantillas.` })
  }
  if (caps.maxCursos !== null && esNuevoCurso && cursosActivos >= caps.maxCursos) {
    errores.push({
      tipo: 'limite',
      detalle: `El plan ${planEfectivo(academia)} permite ${caps.maxCursos} curso(s) activo(s) y la academia ya tiene ${cursosActivos}.`,
    })
  }
  const tipoDestino = plantilla?.tipoDestino || 'basico'
  const tipoAcademia = academia.tipo || 'basico'
  if (tipoDestino !== tipoAcademia) {
    errores.push({
      tipo: 'tipo',
      advertencia: true, // bloquea salvo confirmación justificada del super-admin
      detalle: `La plantilla es para academias "${tipoDestino}" y la academia es "${tipoAcademia}".`,
    })
  }
  return errores
}

// ---------- Acciones por estrategia ----------

export const ACCIONES = ['crear', 'actualizar', 'duplicar', 'conservar', 'omitir', 'requiere_decision']

// Decide la acción de CADA elemento según su clase y la estrategia. En
// seleccion_manual, `selecciones` (temaId → accion) resuelve los conflictos;
// sin decisión explícita el elemento queda en requiere_decision y la
// operación NO puede aplicarse.
export function accionesPorEstrategia({ elementos, estrategia = ESTRATEGIA_DEFAULT, selecciones = {} }) {
  if (!ESTRATEGIAS.includes(estrategia)) {
    throw new Error(`Estrategia desconocida: ${estrategia}`)
  }
  return (elementos || []).map((e) => {
    let accion
    switch (e.clase) {
      case 'nuevo': accion = 'crear'; break
      case 'sin_cambios': accion = 'omitir'; break
      case 'solo_local': accion = 'conservar'; break
      case 'archivado_local':
        // Archivar fue una decisión local: solo la selección manual la revisa.
        accion = estrategia === 'seleccion_manual' && selecciones[e.temaId]
          ? selecciones[e.temaId]
          : 'conservar'
        break
      case 'modificado_en_origen':
        // La academia no lo tocó: actualizar es seguro en todas las estrategias.
        accion = 'actualizar'
        break
      case 'modificado_local':
        accion = estrategia === 'reemplazar_con_origen' ? 'actualizar'
          : estrategia === 'duplicar_como_nuevo' ? 'duplicar'
          : estrategia === 'seleccion_manual' ? (selecciones[e.temaId] || 'conservar')
          : 'conservar'
        break
      case 'conflicto':
        accion = estrategia === 'reemplazar_con_origen' ? 'actualizar'
          : estrategia === 'duplicar_como_nuevo' ? 'duplicar'
          : estrategia === 'seleccion_manual' ? (selecciones[e.temaId] || 'requiere_decision')
          : 'conservar'
        break
      default: accion = 'conservar'
    }
    if (accion && !ACCIONES.includes(accion)) accion = 'requiere_decision'
    return { ...e, accion }
  })
}

// ---------- Duplicar como nuevo: ids sin colisión ----------

// Id nuevo para la copia "duplicar_como_nuevo". Sin '__' (separador reservado
// de los doc-id) y determinista dentro de la operación: `tema-v3`, `tema-v3-2`…
export function idDuplicado(temaId, versionOrigen, existentes = new Set()) {
  const base = `${temaId}-v${versionOrigen}`
  if (!existentes.has(base)) return base
  let n = 2
  while (existentes.has(`${base}-${n}`)) n++
  return `${base}-${n}`
}

// ---------- Fusión de estructura ----------

// Fusiona la estructura del ORIGEN dentro de la del DESTINO según las
// acciones: los temas 'crear' se insertan en su fase/módulo (creando la fase
// si no existe); los 'duplicar' se insertan junto al original con su id nuevo;
// TODO lo local (fases/módulos/temas propios, orden, estados) se conserva.
export function fusionarEstructura({ estructuraOrigen, estructuraDestino, acciones, mapaDuplicados = {} }) {
  const destino = clonProfundo(estructuraDestino || [])
  const accionDe = new Map((acciones || []).map((a) => [a.temaId, a.accion]))

  const buscarFase = (fid) => destino.find((f) => f.id === fid)
  const idsEnDestino = new Set(
    destino.flatMap((f) => (f.modulos || []).flatMap((m) => (m.temas || []).map((t) => t.id)))
  )

  for (const faseOrigen of estructuraOrigen || []) {
    let fase = buscarFase(faseOrigen.id)
    for (const modOrigen of faseOrigen.modulos || []) {
      for (const temaOrigen of modOrigen.temas || []) {
        const accion = accionDe.get(temaOrigen.id)
        if (accion === 'crear' && !idsEnDestino.has(temaOrigen.id)) {
          if (!fase) {
            fase = {
              id: faseOrigen.id, titulo: faseOrigen.titulo,
              subtitulo: faseOrigen.subtitulo || '', descripcion: faseOrigen.descripcion || '',
              color: faseOrigen.color || '', icono: faseOrigen.icono || '',
              estado: faseOrigen.estado || 'publicado', modulos: [],
            }
            destino.push(fase)
          }
          let mod = (fase.modulos || []).find((m) => m.id === modOrigen.id)
          if (!mod) {
            mod = { id: modOrigen.id, titulo: modOrigen.titulo, temas: [] }
            if (modOrigen.implicito) mod.implicito = true
            if (modOrigen.estado) mod.estado = modOrigen.estado
            fase.modulos = fase.modulos || []
            fase.modulos.push(mod)
          }
          mod.temas = mod.temas || []
          mod.temas.push({ id: temaOrigen.id, titulo: temaOrigen.titulo, estado: temaOrigen.estado || 'publicado' })
          idsEnDestino.add(temaOrigen.id)
        }
        if (accion === 'duplicar') {
          const idNuevo = mapaDuplicados[temaOrigen.id]
          if (idNuevo && !idsEnDestino.has(idNuevo)) {
            // Junto al tema local original, en el módulo donde viva.
            for (const f of destino) {
              for (const m of f.modulos || []) {
                const idx = (m.temas || []).findIndex((t) => t.id === temaOrigen.id)
                if (idx >= 0) {
                  m.temas.splice(idx + 1, 0, {
                    id: idNuevo,
                    titulo: `${temaOrigen.titulo} (versión de plantilla)`,
                    estado: 'borrador', // la copia nueva nace en borrador: nadie la ve hasta publicarla
                  })
                  idsEnDestino.add(idNuevo)
                }
              }
            }
          }
        }
        if (accion === 'actualizar') {
          // El contenido vive en el doc del tema; en la estructura solo se
          // refresca el TÍTULO si la academia no lo había cambiado.
          for (const f of destino) {
            for (const m of f.modulos || []) {
              for (const t of m.temas || []) {
                if (t.id === temaOrigen.id && t.titulo !== temaOrigen.titulo) {
                  t.titulo = temaOrigen.titulo
                }
              }
            }
          }
        }
      }
    }
  }
  return destino
}

// ---------- Plan de escrituras (idempotente, por lotes) ----------

// Colecciones que una replicación PUEDE tocar. Progreso, intentos,
// calificaciones, usuarios y grupos quedan estructuralmente fuera.
export const COLECCIONES_PERMITIDAS = ['cursos', 'temas', 'replicaciones', 'respaldos', 'historial']

// Construye el plan COMPLETO de una academia: docs a escribir (con ids
// deterministas ⇒ reejecutar reescribe lo mismo, nunca duplica), docs a
// respaldar ANTES, lotes y estimación. No escribe nada.
export function planParaAcademia({
  academiaId, plantillaId, versionOrigen, replicacionId,
  elementosConAccion, temasOrigenPorId, estructuraOrigen, cursoDestino,
  plantillaMeta = null,
}) {
  if (!academiaId || !plantillaId || !replicacionId) {
    throw new Error('planParaAcademia: faltan academiaId, plantillaId o replicacionId.')
  }
  const pendientes = (elementosConAccion || []).filter((e) => e.accion === 'requiere_decision')
  if (pendientes.length) {
    throw new Error(`Hay ${pendientes.length} conflicto(s) sin decisión: resuélvelos antes de planear.`)
  }
  const cursoId = cursoDestino?.id || cursoIdDe(academiaId, plantillaId)

  // Ids nuevos para los duplicados (sin colisiones con lo que ya existe).
  const existentes = new Set((elementosConAccion || []).map((e) => e.temaId))
  const mapaDuplicados = {}
  for (const e of elementosConAccion || []) {
    if (e.accion === 'duplicar') {
      const idNuevo = idDuplicado(e.temaId, versionOrigen, existentes)
      existentes.add(idNuevo)
      mapaDuplicados[e.temaId] = idNuevo
    }
  }

  const sello = (temaOrigen) => ({
    plantillaId,
    version: versionOrigen,
    hash: huellaTema(temaOrigen),
    replicacionId,
  })

  const docsTemas = []
  const respaldar = []
  for (const e of elementosConAccion || []) {
    const temaOrigen = temasOrigenPorId instanceof Map
      ? temasOrigenPorId.get(e.temaId)
      : temasOrigenPorId?.[e.temaId]
    if (e.accion === 'crear') {
      docsTemas.push({
        docId: temaDocIdEnCurso(cursoId, e.temaId),
        accion: 'crear',
        datos: {
          academiaId, cursoId, temaId: e.temaId,
          ...clonProfundo(contenidoComparableTema(temaOrigen)),
          estado: temaOrigen?.estado || 'publicado',
          version: 1,
          origen: sello(temaOrigen),
        },
      })
    }
    if (e.accion === 'actualizar') {
      respaldar.push({ coleccion: 'temas', docId: temaDocIdEnCurso(cursoId, e.temaId) })
      docsTemas.push({
        docId: temaDocIdEnCurso(cursoId, e.temaId),
        accion: 'actualizar',
        datos: {
          academiaId, cursoId, temaId: e.temaId,
          ...clonProfundo(contenidoComparableTema(temaOrigen)),
          estado: temaOrigen?.estado || 'publicado',
          version: (e.versionDestino ?? 0) + 1,
          origen: sello(temaOrigen),
        },
      })
    }
    if (e.accion === 'duplicar') {
      const idNuevo = mapaDuplicados[e.temaId]
      docsTemas.push({
        docId: temaDocIdEnCurso(cursoId, idNuevo),
        accion: 'crear',
        datos: {
          academiaId, cursoId, temaId: idNuevo,
          ...clonProfundo(contenidoComparableTema(temaOrigen)),
          titulo: `${temaOrigen?.titulo || e.temaId} (versión de plantilla)`,
          estado: 'borrador',
          version: 1,
          origen: sello(temaOrigen),
        },
      })
    }
  }

  // Curso: estructura fusionada + registro de la versión recibida. Siempre se
  // respalda antes (es el único doc existente que la fusión modifica).
  const estructuraFusionada = fusionarEstructura({
    estructuraOrigen,
    estructuraDestino: cursoDestino?.estructura || [],
    acciones: elementosConAccion,
    mapaDuplicados,
  })
  if (cursoDestino) respaldar.push({ coleccion: 'cursos', docId: cursoId })

  const docCurso = {
    docId: cursoId,
    accion: cursoDestino ? 'actualizar' : 'crear',
    datos: cursoDestino
      ? {
          estructura: estructuraFusionada,
          versionOrigen,
          version: (cursoDestino.version ?? 0) + 1,
          replicacion: { id: replicacionId, version: versionOrigen },
        }
      : {
          // Curso inexistente: la operación es una CLONACIÓN completa desde
          // la versión publicada (doc nuevo, namespace de la academia).
          academiaId,
          plantillaId,
          titulo: plantillaMeta?.nombre || plantillaId,
          tipoDestino: plantillaMeta?.tipoDestino || 'basico',
          estado: 'publicado',
          orden: 1,
          plantillaOrigenId: plantillaId,
          versionOrigen,
          estructura: estructuraFusionada,
          version: 1,
          clonacion: { plantillaId, version: versionOrigen, completa: true },
          replicacion: { id: replicacionId, version: versionOrigen },
        },
  }

  const totalEscrituras = docsTemas.length + 1
  const bytesAprox = docsTemas.reduce((s, d) => s + jsonEstable(d.datos).length, 0)

  return {
    academiaId,
    cursoId,
    docCurso,
    docsTemas,
    respaldar,
    mapaDuplicados,
    lotes: lotes(docsTemas, 20),
    estimacion: {
      escrituras: totalEscrituras,
      respaldos: respaldar.length,
      lecturasAnalisis: 1 + (cursoDestino ? 1 : 0),
      bytesAprox,
    },
  }
}

// ---------- Respaldo ----------

// Verifica que el respaldo cubra TODO lo que el plan modificará. La
// aplicación real debe negarse a continuar si esto devuelve faltantes.
export function verificarRespaldo({ requeridos, respaldados }) {
  const tiene = new Set((respaldados || []).map((r) => `${r.coleccion}/${r.docId}`))
  const faltantes = (requeridos || []).filter((r) => !tiene.has(`${r.coleccion}/${r.docId}`))
  return { completo: faltantes.length === 0, faltantes }
}

// ---------- Rollback ----------

// Plan de reversión a partir de los respaldos de una replicación:
//  - docs respaldados → restaurar su snapshot;
//  - docs CREADOS por la replicación (sin respaldo previo) → archivar (nunca
//    se elimina permanentemente contenido en esta fase);
//  - si el doc cambió DESPUÉS de la replicación (huella actual ≠ huella que
//    dejó la replicación), se marca advertencia y NO se toca salvo que el
//    super-admin lo fuerce explícitamente (forzar[docId] = true).
export function planDeRollback({ respaldos, creados, docsActuales, forzar = {} }) {
  const actuales = new Map((docsActuales || []).map((d) => [`${d.coleccion}/${d.docId}`, d]))
  const restaurar = []
  const archivar = []
  const advertencias = []

  for (const r of respaldos || []) {
    const clave = `${r.coleccion}/${r.docId}`
    const actual = actuales.get(clave)
    if (!actual) {
      advertencias.push({ docId: r.docId, motivo: 'El documento ya no existe; se restaurará el respaldo.' })
      restaurar.push({ coleccion: r.coleccion, docId: r.docId, datos: clonProfundo(r.datos) })
      continue
    }
    const hActual = r.coleccion === 'temas' ? huellaTema(actual.datos) : huellaEstructura(actual.datos?.estructura)
    const hReplicada = r.hashEscrito || null
    if (hReplicada && hActual !== hReplicada && !forzar[r.docId]) {
      advertencias.push({
        docId: r.docId,
        motivo: 'Cambió después de la replicación: se conserva (usa forzar para restaurarlo de todos modos).',
        conservado: true,
      })
      continue
    }
    restaurar.push({ coleccion: r.coleccion, docId: r.docId, datos: clonProfundo(r.datos) })
  }

  for (const c of creados || []) {
    const actual = actuales.get(`${c.coleccion}/${c.docId}`)
    if (!actual) continue // nunca se escribió (fallo parcial): nada que revertir
    const hActual = c.coleccion === 'temas' ? huellaTema(actual.datos) : null
    if (c.hashEscrito && hActual && hActual !== c.hashEscrito && !forzar[c.docId]) {
      advertencias.push({
        docId: c.docId,
        motivo: 'Creado por la replicación pero editado después: se conserva (archívalo manualmente si procede).',
        conservado: true,
      })
      continue
    }
    archivar.push({ coleccion: c.coleccion, docId: c.docId })
  }

  return { restaurar, archivar, advertencias }
}

// ---------- Confirmación reforzada y resúmenes ----------

// Frase EXACTA que el super-admin debe escribir para operaciones destructivas
// o masivas. Verbo según la operación; número de academias siempre visible.
export function fraseConfirmacion({ tipo = 'replicar', estrategia = ESTRATEGIA_DEFAULT, numAcademias = 1 }) {
  const verbo = tipo === 'rollback' ? 'REVERTIR'
    : estrategia === 'reemplazar_con_origen' ? 'REEMPLAZAR'
    : tipo === 'clonar' ? 'CLONAR'
    : 'REPLICAR'
  return `${verbo} ${numAcademias} ${numAcademias === 1 ? 'ACADEMIA' : 'ACADEMIAS'}`
}

export function requiereConfirmacionReforzada({ tipo, estrategia, numAcademias = 1 }) {
  return tipo === 'rollback'
    || estrategia === 'reemplazar_con_origen'
    || numAcademias > 1
}

// Resumen agregado de una operación multi-academia (para el doc de auditoría).
export function resumenDeOperacion(planes) {
  const out = {
    academias: (planes || []).length,
    escrituras: 0, respaldos: 0, creados: 0, actualizados: 0, conservados: 0, duplicados: 0, omitidos: 0,
  }
  for (const p of planes || []) {
    out.escrituras += p.estimacion?.escrituras || 0
    out.respaldos += p.estimacion?.respaldos || 0
    for (const d of p.docsTemas || []) {
      if (d.accion === 'crear') out.creados++
      if (d.accion === 'actualizar') out.actualizados++
    }
    out.duplicados += Object.keys(p.mapaDuplicados || {}).length
  }
  return out
}
