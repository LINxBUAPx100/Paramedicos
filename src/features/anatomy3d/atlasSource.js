export const ATLAS_SOURCE_COMMIT = '1c38bf35c254a891200d3cedecfd57abebe83d8d'
export const THREE_VERSION = '0.159.0'

export const ATLAS_REPOSITORY_URL = 'https://github.com/ashemag/human-atlas'
export const BODYPARTS3D_URL = 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/'
export const BODYPARTS3D_LICENSE_URL = 'https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html'

export const ATLAS_MODEL_BASE = `https://cdn.jsdelivr.net/gh/ashemag/human-atlas@${ATLAS_SOURCE_COMMIT}/public/models`
export const THREE_MODULE_URL = `https://cdn.jsdelivr.net/npm/three@${THREE_VERSION}/build/three.module.min.js`

let threePromise = null

/**
 * Three.js se descarga únicamente al entrar al atlas. La versión queda fijada
 * para que un cambio externo no altere el visor sin revisión.
 */
export function loadThree() {
  if (!threePromise) {
    threePromise = import(/* @vite-ignore */ THREE_MODULE_URL)
      .catch((error) => {
        threePromise = null
        throw error
      })
  }
  return threePromise
}

export function resolveModelUrl(path) {
  const fileName = String(path || '').split('/').pop()
  if (!fileName || !/^[a-z0-9][a-z0-9._-]*$/i.test(fileName)) {
    throw new Error('El catálogo anatómico contiene una ruta de modelo inválida.')
  }
  return `${ATLAS_MODEL_BASE}/${fileName}`
}

export async function loadAtlas(signal) {
  const response = await fetch(`${ATLAS_MODEL_BASE}/atlas.json`, {
    signal,
    cache: 'force-cache',
    mode: 'cors',
  })
  if (!response.ok) {
    throw new Error('No se pudo descargar el catálogo anatómico.')
  }

  const atlas = await response.json()
  if (!Array.isArray(atlas?.parts) || !Array.isArray(atlas?.chunks)) {
    throw new Error('El catálogo anatómico recibido no tiene el formato esperado.')
  }

  return {
    ...atlas,
    chunks: atlas.chunks.map((chunk) => ({
      ...chunk,
      url: resolveModelUrl(chunk.url),
      gzip: chunk.gzip ? resolveModelUrl(chunk.gzip) : undefined,
    })),
  }
}
