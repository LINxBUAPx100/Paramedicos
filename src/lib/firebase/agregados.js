// ============================================================
//  Agregados del curso en Firestore — lectura y escritura
// ------------------------------------------------------------
//  Los agregados son las vistas derivadas del temario (glosario, buscador,
//  banco de exámenes, mazo, galería y contadores) precalculadas al publicar el
//  curso. Existen para que abrir UNA lección no obligue a leer las 287: el
//  porqué completo está en `src/lib/agregadosModelo.js`.
//
//  Aquí solo está el acceso a Firestore. La forma de los datos y las reglas de
//  partición viven en el módulo puro, que se prueba sin red.
//
//  Dos decisiones que conviene no deshacer sin leer el motivo:
//
//   · COLECCIÓN PROPIA, no subcolección de `cursos`. Una regla sobre
//     `cursos/{id}/agregados/{x}` no ve los datos del curso padre y habría que
//     resolverlos con `get()` dentro de la regla: una lectura FACTURADA por
//     cada documento pedido. Con `academiaId`/`cursoId` copiados en el
//     documento, la regla no lee nada. Mismo patrón que `temas`.
//
//   · SIEMPRE por id (`getDoc`), nunca con consulta. Así la regla mira
//     `resource.data.academiaId` directamente y no hace falta repetir el filtro
//     que sí necesita `temasDeCurso`.
// ============================================================
import { auth, db } from './init.js'
import { doc, getDoc, setDoc, writeBatch, serverTimestamp } from 'firebase/firestore'
import { lotes } from '../contenidoModelo.js'
import { SELLO, docIdAgregado, docsAgregadosDeCurso, datosDeDoc } from '../agregadosModelo.js'
import { leerCache, escribirCache, limpiarCache, claveAgregado } from '../cacheContenido.js'

// Caché por documento y por sesión: `${cursoId}||${tipo}||${moduloId}`.
// Guarda la PROMESA, no el resultado, para que dos pantallas que piden el
// mismo agregado a la vez compartan una sola lectura en vez de disparar dos.
const cache = new Map()

// Versión sellada de cada curso, tal como la leyó `selloDeAgregados`.
//
// Es lo que permite usar la caché de IndexedDB sin arriesgarse a servir
// contenido viejo: una entrada guardada solo vale si su versión coincide con la
// que el sello acaba de declarar. Sin esta anotación no se consulta la caché
// —se va a la red—, así que el orden importa pero no puede romper nada: el
// resolutor siempre pide el sello antes que ningún agregado.
const selloPorCurso = new Map()

export function versionSelladaDe(cursoId) {
  const s = selloPorCurso.get(cursoId)
  return s && s.version && !s.desactualizado ? s.version : null
}

const claveCache = (cursoId, tipo, moduloId) => `${cursoId}||${tipo}||${moduloId || '*'}`

async function leerDoc(cursoId, tipo, moduloId = null) {
  const clave = claveCache(cursoId, tipo, moduloId)
  if (!cache.has(clave)) {
    cache.set(
      clave,
      (async () => {
        // El SELLO nunca se cachea: es el que dice si lo demás sirve, y una
        // caché que se valida a sí misma no valida nada.
        const version = tipo === SELLO ? null : versionSelladaDe(cursoId)
        if (version) {
          const guardado = await leerCache(claveAgregado(cursoId, tipo, moduloId), version)
          if (guardado) return guardado
        }
        const snap = await getDoc(doc(db, 'agregados', docIdAgregado(cursoId, tipo, moduloId)))
        const datos = snap.exists() ? snap.data() : null
        // Sin `await`: guardar es una mejora para la próxima visita, no algo
        // que deba retrasar la pantalla de ésta.
        if (version && datos) escribirCache(claveAgregado(cursoId, tipo, moduloId), version, datos)
        return datos
      })().catch((err) => {
        // Un fallo NO se queda cacheado como definitivo: se descarta la entrada
        // para poder reintentar en la siguiente navegación.
        cache.delete(clave)
        throw err
      })
    )
  }
  return cache.get(clave)
}

/**
 * Un agregado del curso, ya deserializado.
 *
 * Devuelve `null` si no existe (curso clonado antes de esta fase, o
 * regeneración a medias). Quien llama decide: el resolutor solo entra por aquí
 * cuando el SELLO dice que los agregados están completos y al día.
 */
export async function leerAgregado(cursoId, tipo, moduloId = null) {
  if (!cursoId) return null
  const d = await leerDoc(cursoId, tipo, moduloId)
  return d ? datosDeDoc(d) : null
}

/**
 * ¿Este curso tiene agregados utilizables? Una lectura, cacheada por sesión.
 *
 * `desactualizado` lo pone el editor al guardar contenido: mientras esté en
 * true, el resolutor sirve por el camino completo. Es correcto y más caro, y
 * se cura solo en cuanto termina la regeneración. La alternativa —seguir
 * usando el agregado viejo— enseñaría al alumno el examen anterior al cambio.
 */
export async function selloDeAgregados(cursoId) {
  if (!cursoId) return null
  // NUNCA PROPAGA. Un fallo aquí solo debe significar «no puedo usar el camino
  // barato», y el resolutor ya sabe qué hacer con eso: servir el curso completo.
  //
  // Sin este try/catch, el 31-08-2026 la plataforma entera se quedó cargando.
  // Las reglas denegaban la lectura del sello porque el documento no existía
  // —`resource.data` sobre un `resource` nulo es un error, y un error deniega—,
  // la promesa se rechazaba, `bajoDemandaDeFirestore` no lo capturaba y con él
  // caían el temario, el glosario y la página de logros. La regla ya está
  // arreglada; esto es la red para la próxima, porque el resolutor no puede
  // depender de que una regla sea perfecta para que la plataforma abra.
  let d = null
  try {
    d = await leerDoc(cursoId, SELLO)
  } catch (err) {
    console.warn(`[agregados] No se pudo leer el sello de ${cursoId}; se sirve por el camino completo:`, err?.code || err?.message || err)
    return null
  }
  if (!d) return null
  const sello = { version: d.version || 0, desactualizado: Boolean(d.desactualizado), documentos: d.documentos || 0 }
  const anterior = selloPorCurso.get(cursoId)
  selloPorCurso.set(cursoId, sello)
  // Si el curso cambió de versión o quedó caducado, lo guardado en IndexedDB ya
  // no se va a poder usar nunca —la versión no coincidiría— y solo ocupa sitio.
  if (!sello.version || sello.desactualizado || (anterior && anterior.version !== sello.version)) {
    limpiarCache(cursoId)
  }
  return sello
}

export function agregadosUtilizables(sello) {
  return Boolean(sello?.version) && !sello.desactualizado
}

/**
 * (Re)escribe TODOS los agregados de un curso desde sus módulos ensamblados.
 *
 * Idempotente: los ids son deterministas, así que volver a ejecutarlo
 * sobrescribe los mismos documentos y sirve para reanudar una escritura
 * interrumpida.
 */
export async function escribirAgregadosDeCurso({ academiaId, cursoId, modulos, version = 1, onProgreso }) {
  if (!academiaId || !cursoId) throw new Error('escribirAgregadosDeCurso: faltan academiaId o cursoId.')
  const docs = docsAgregadosDeCurso({ academiaId, cursoId, modulos, version })
  let hechos = 0
  for (const grupo of lotes(docs, 20)) {
    const batch = writeBatch(db)
    for (const d of grupo) {
      const { docId, ...datos } = d
      batch.set(doc(db, 'agregados', docId), {
        ...datos,
        actualizado: serverTimestamp(),
        actualizadoPor: auth.currentUser?.uid || null,
      })
    }
    await batch.commit()
    hechos += grupo.length
    onProgreso?.({ hechos, total: docs.length })
  }

  // El SELLO va al FINAL, y esa es toda su gracia: si la escritura se
  // interrumpe a medias, el sello no llega y el curso se sigue sirviendo por el
  // camino completo, que es correcto aunque más caro. Sellar primero dejaría
  // agregados incompletos marcados como buenos, y el examen saldría corto sin
  // que nadie se enterara.
  await setDoc(doc(db, 'agregados', docIdAgregado(cursoId, SELLO)), {
    academiaId,
    cursoId,
    tipo: SELLO,
    moduloId: null,
    estado: 'publicado',
    version,
    documentos: docs.length,
    desactualizado: false,
    actualizado: serverTimestamp(),
    actualizadoPor: auth.currentUser?.uid || null,
  })

  limpiarCacheAgregados(cursoId)
  return { escritos: docs.length, version }
}

/**
 * Marca los agregados como caducados tras editar contenido.
 *
 * Una sola escritura barata. Se llama en el mismo sitio donde el editor ya
 * limpia la caché de contenido; a partir de ahí los alumnos se sirven por el
 * camino completo hasta que `regenerarAgregados` los reconstruya.
 *
 * No lanza: que falle el marcado no debe tumbar el guardado de una lección que
 * ya se escribió. El coste de fallar es servir un agregado viejo, y por eso se
 * registra en consola en vez de tragarse el error en silencio.
 */
export async function marcarAgregadosDesactualizados(academiaId, cursoId) {
  if (!academiaId || !cursoId) return false
  try {
    await setDoc(
      doc(db, 'agregados', docIdAgregado(cursoId, SELLO)),
      { academiaId, cursoId, tipo: SELLO, desactualizado: true, actualizado: serverTimestamp() },
      { merge: true }
    )
    limpiarCacheAgregados(cursoId)
    return true
  } catch (err) {
    console.warn(`[agregados] No se pudo marcar ${cursoId} como desactualizado:`, err?.message || err)
    return false
  }
}

/**
 * Olvida los agregados de un curso (o todos).
 *
 * Hay que llamarlo después de cada escritura: si no, la pestaña que acaba de
 * editar seguiría sirviendo el glosario y el banco anteriores durante el resto
 * de la sesión.
 */
export function limpiarCacheAgregados(cursoId = null) {
  // También la de IndexedDB: si no, la pestaña que acaba de editar seguiría
  // encontrando el agregado anterior en disco en su próxima recarga.
  limpiarCache(cursoId)
  if (!cursoId) {
    cache.clear()
    selloPorCurso.clear()
    return
  }
  selloPorCurso.delete(cursoId)
  const prefijo = `${cursoId}||`
  for (const clave of [...cache.keys()]) {
    if (clave.startsWith(prefijo)) cache.delete(clave)
  }
}
