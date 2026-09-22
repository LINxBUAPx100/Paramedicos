// ============================================================
//  Recepción — cómo se cuenta un fallo en el mostrador (lógica PURA)
// ------------------------------------------------------------
//  El proyecto ya tenía `mensajeError` en `lib/panelModelo.js`, y hace una cosa
//  concreta: traducir un `permission-denied` de Firestore a una frase útil. El
//  problema es que a todo lo demás le añade «(revisa tu conexión)», y eso
//  manda a mirar el wifi por un error que no tiene nada que ver.
//
//  Es exactamente la trampa que ya se documentó en `AltaDeRecepcion.jsx`: los
//  módulos de recepción lanzan errores PROPIOS con texto útil —«Solo quedan 2
//  de Férula de vacío», «Esta persona no tiene matrícula todavía»— y esos hay
//  que enseñarlos tal cual. Solo los errores de Firebase, los que traen `code`,
//  pasan por el traductor.
//
//  Se saca a su propio módulo porque lo usan ocho componentes, y ocho copias
//  del mismo `if` acaban divergiendo.
// ============================================================
import { mensajeError } from '../panelModelo.js'

/**
 * @param {Error} err       lo que se atrapó.
 * @param {string} accion   qué se estaba intentando: «No se pudo cobrar».
 * @param {string} coleccion  la colección, para el aviso de reglas sin publicar.
 */
export function textoDeError(err, accion, coleccion) {
  if (err?.code) return mensajeError(err, accion, coleccion)
  return err?.message || `${accion}.`
}
