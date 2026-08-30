// ============================================================
//  Validaciones docentes — colección `validaciones`
// ------------------------------------------------------------
//  UN documento por academia (`validaciones/{academiaId}`), y uno más para lo
//  que se revisa fuera de toda academia (`validaciones/_plataforma`, que es
//  donde firma el super-admin sobre la plantilla global).
//
//      { academiaId, temas: { [temaId]: { estado, revisadoPor, comentario,
//                                         fuentes[], fecha, uid, nombre } },
//        actualizado }
//
//  POR QUÉ UN SOLO DOCUMENTO Y NO UNO POR TEMA
//
//  El temario tiene 287 nodos y la capa se aplica a CADA lección que se abre.
//  Con un documento por tema, saber si una lección está validada costaría una
//  lectura extra por lección; con este, la sesión entera cuesta una. Escribir
//  usa `merge` sobre la rama del tema, así que dos docentes que validan temas
//  distintos a la vez no se pisan.
//
//  La barrera REAL es firestore.rules: escribir exige ser super-admin o staff
//  de esa misma academia. Aquí se comprueba la forma antes de tocar la red.
// ============================================================
import { db } from './init.js'
import { doc, getDoc, setDoc, deleteField, serverTimestamp } from 'firebase/firestore'
import {
  DOC_PLATAFORMA, combinarValidaciones, docValidacionesDe, mapaDeValidaciones,
  normalizarValidacion,
} from '../validacionesModelo.js'

const refDe = (academiaId) => doc(db, 'validaciones', docValidacionesDe(academiaId))

/**
 * Mapa `temaId → validación` de una academia. Una lectura.
 *
 * Nunca lanza: si el documento no existe, si las reglas lo niegan o si no hay
 * red, devuelve un mapa vacío y el temario se sirve con el estado que declara
 * su propio material. Perder la capa degrada la vista (se ve «en revisión»
 * donde ya había firma); romper la página sería peor.
 */
export async function leerValidaciones(academiaId) {
  const leerUno = async (id) => {
    try {
      const snap = await getDoc(doc(db, 'validaciones', id))
      return snap.exists() ? mapaDeValidaciones(snap.data()) : {}
    } catch {
      return {}
    }
  }
  // Sin academia solo hay una capa que leer, y es la de la plataforma.
  if (!academiaId) return leerUno(DOC_PLATAFORMA)
  // Con academia son DOS, en paralelo: lo que el super-admin firmó sobre el
  // temario global y lo que firmó esta academia sobre su copia. La segunda
  // manda. Es una lectura más por sesión, y es lo que hace que validar desde
  // la consola de la plataforma sirva para todas las academias en vez de
  // guardarse en un documento que nadie mira.
  const [plataforma, propias] = await Promise.all([
    leerUno(DOC_PLATAFORMA),
    leerUno(academiaId),
  ])
  return combinarValidaciones(plataforma, propias)
}

/**
 * Firma la validación de un tema y la APLICA: a partir de esta escritura el
 * alumno deja de ver el aviso de contenido sin revisar y el tema entra en el
 * banco de examen de su unidad.
 *
 * Devuelve la validación normalizada, que es lo que la interfaz pinta sin
 * esperar a releer nada.
 */
export async function validarTema({
  academiaId = null, temaId, estado = 'validado',
  revisadoPor, comentario = '', fuentes = [], fecha, uid = null, nombre = '',
}) {
  if (!temaId) throw new Error('Falta el tema que se va a validar.')
  const validacion = normalizarValidacion({
    estado, revisadoPor, comentario, fuentes, fecha, uid, nombre,
  })
  await setDoc(
    refDe(academiaId),
    {
      academiaId: academiaId || null,
      temas: { [temaId]: validacion },
      actualizado: serverTimestamp(),
    },
    { merge: true }
  )
  return validacion
}

/**
 * Retira la firma de un tema: vuelve al estado que declara su propio material
 * (normalmente `en_revision`) y sale del banco de examen.
 *
 * Se borra el campo en vez de marcarlo «retirado» porque la capa solo responde
 * una pregunta —¿está avalado hoy?— y el rastro de quién firmó qué vive en la
 * cola de dictámenes, que es append-only.
 */
export async function retirarValidacionTema({ academiaId = null, temaId }) {
  if (!temaId) throw new Error('Falta el tema cuya validacion se retira.')
  await setDoc(
    refDe(academiaId),
    { temas: { [temaId]: deleteField() }, actualizado: serverTimestamp() },
    { merge: true }
  )
}
