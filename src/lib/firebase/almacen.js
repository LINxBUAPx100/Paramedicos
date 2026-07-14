// ============================================================
//  Storage por academia — capa de datos (Fase 4)
// ------------------------------------------------------------
//  Única puerta de subida de archivos del editor. Antes de tocar la red:
//   - valida extensión/MIME/tamaño (allowlist de archivosModelo.js),
//   - construye la ruta CANÓNICA academias/{acaId}/{carpeta}/… (jamás se
//     acepta una ruta armada por el cliente),
//  y storage.rules impone lo mismo en el servidor.
//  `firebase/storage` entra por import dinámico: no engorda el bundle.
// ============================================================
import { app } from './init.js'
import {
  validarArchivoParaSubir, rutaArchivoAcademia, rutaEsDeAcademia,
} from '../archivosModelo.js'

let _storage = null
async function storageLib() {
  if (!_storage) _storage = await import('firebase/storage')
  return _storage
}

// Sube un archivo del editor al prefijo de la academia y devuelve
// { path, url, tipo, tamano }. `onProgreso` recibe 0-100.
export async function subirArchivoAcademia({ academiaId, archivo, carpeta = 'archivos', onProgreso }) {
  if (!academiaId) throw new Error('Falta la academia para subir el archivo.')
  const error = validarArchivoParaSubir({
    nombre: archivo?.name, tipo: archivo?.type, tamano: archivo?.size,
  })
  if (error) throw new Error(error)

  const path = rutaArchivoAcademia(academiaId, carpeta, archivo.name, Date.now())
  const { getStorage, ref, uploadBytesResumable, getDownloadURL } = await storageLib()
  const referencia = ref(getStorage(app), path)

  await new Promise((resolver, rechazar) => {
    const tarea = uploadBytesResumable(referencia, archivo, { contentType: archivo.type })
    tarea.on('state_changed',
      (s) => onProgreso?.(Math.round((s.bytesTransferred / s.totalBytes) * 100)),
      (err) => rechazar(new Error(
        err?.code === 'storage/unauthorized'
          ? 'No tienes permiso para subir archivos en esta academia (o el tipo/tamaño no está permitido).'
          : err?.message || 'No se pudo subir el archivo.'
      )),
      resolver,
    )
  })
  const url = await getDownloadURL(referencia)
  return { path, url, tipo: archivo.type, tamano: archivo.size }
}

// Borra un archivo del prefijo de la academia (p. ej. al quitar un adjunto).
// La ruta se valida contra el prefijo ANTES de tocar la red.
export async function borrarArchivoAcademia({ academiaId, path }) {
  if (!rutaEsDeAcademia(path, academiaId)) {
    throw new Error('Esa ruta no pertenece al almacenamiento de esta academia.')
  }
  const { getStorage, ref, deleteObject } = await storageLib()
  await deleteObject(ref(getStorage(app), path))
}
