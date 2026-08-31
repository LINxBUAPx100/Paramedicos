// ============================================================
//  Qué puede y qué NO puede pisar una resiembra de la plantilla
// ------------------------------------------------------------
//  `scripts/migrar-contenido.mjs --seed` escribe la plantilla oficial desde el
//  repositorio con un `set()`, es decir, un reemplazo completo del documento.
//  Eso está bien para el CONTENIDO del plan —que es justo lo que el repositorio
//  gobierna— y está mal para todo lo demás que vive en ese mismo documento.
//
//  EL 31 DE AGOSTO DE 2026 ESO ROMPIÓ LA PLANTILLA OFICIAL, de tres maneras a
//  la vez, y ninguna dio error:
//
//   · `tipoDestino` volvió a 'basico'. La academia es 'avanzado', así que su
//     replicación empezó a salir con un aviso de incompatibilidad que nadie
//     había provocado.
//   · `version` volvió a 1 cuando ya había una v7 publicada. Como
//     `publicarVersionPlantilla` crea el snapshot con el número que lleve la
//     plantilla y se niega si ya existe, publicar la siguiente pasó a ser
//     imposible.
//   · La `estructura` se reemplazó por los módulos del repositorio. Un módulo
//     creado desde el editor de contenido habría desaparecido sin dejar rastro;
//     se salvó por unas horas de diferencia.
//
//  Este módulo es la regla, aparte del script, para poder probarla sin red ni
//  credenciales: el fallo era de decisión, no de conexión.
// ============================================================

/**
 * Metadatos con los que hay que escribir la plantilla.
 *
 * El repositorio manda sobre el contenido. NO manda sobre a qué tipo de
 * academia va dirigida la plantilla ni por qué versión va: eso se decide desde
 * el panel, y reescribirlo en cada resiembra es pisarle el trabajo a quien lo
 * puso. Solo un `--tipo=` o `--version=` explícitos ganan al valor remoto.
 */
export function metadatosDePlantilla({
  remota = null,
  tipoInicial = 'basico',
  versionInicial = 1,
  tipoExplicito = false,
  versionExplicita = false,
} = {}) {
  return {
    tipoDestino: !tipoExplicito && remota?.tipoDestino ? remota.tipoDestino : tipoInicial,
    version: !versionExplicita && remota?.version ? remota.version : versionInicial,
    // El estado lo gobierna el panel (borrador/publicada/archivada), no el repo.
    estado: remota?.estado || 'publicada',
  }
}

/** Normaliza una estructura, que unas veces es arreglo y otras `{ modulos }`. */
export function modulosDe(estructura) {
  if (Array.isArray(estructura)) return estructura
  return estructura?.modulos || []
}

/**
 * Módulos que la resiembra BORRARÍA: los que están en la plantilla remota y no
 * en el repositorio.
 *
 * Son, por definición, los que alguien creó desde el editor de contenido. El
 * script se niega a continuar si hay alguno, salvo `--forzar-estructura`.
 */
export function modulosQueSePerderian(estructuraRepo, estructuraRemota) {
  const enRepo = new Set(modulosDe(estructuraRepo).map((m) => m.id))
  return modulosDe(estructuraRemota).filter((m) => m && m.id && !enRepo.has(m.id))
}

/** Versiones publicadas de una plantilla, a partir de los ids de sus snapshots. */
export function versionesPublicadas(plantillaId, idsDeVersiones = []) {
  const re = new RegExp(`^${plantillaId}__v(\\d+)$`)
  return idsDeVersiones
    .map((id) => Number(String(id).match(re)?.[1]))
    .filter((n) => Number.isFinite(n))
    .sort((a, b) => a - b)
}

/**
 * ¿El contador de versión impide publicar la siguiente?
 *
 * `publicarVersionPlantilla` crea `plantilla__vN` con la N que lleve la
 * plantilla y se niega si ese documento ya existe. Si el contador quedó por
 * debajo —o igual— que una versión ya publicada, publicar es imposible.
 *
 * Devuelve `null` si todo está bien, o el diagnóstico con la N que hay que
 * poner. No se corrige solo: mover un contador de versión a ciegas es peor que
 * avisar, porque el número es lo que ata cada academia a lo que recibió.
 */
export function versionBloqueada(version, publicadas = []) {
  if (!publicadas.length) return null
  const mayor = Math.max(...publicadas)
  if (version > mayor) return null
  return { version, mayorPublicada: mayor, sugerida: mayor + 1 }
}
