// ============================================================
//  Minificado reproducible de los SVG que se sirven
// ------------------------------------------------------------
//  POR QUÉ EXISTE ESTE ARCHIVO. El 29 de agosto de 2026 alguien pasó los 180
//  SVG de public/imagenes/medical por un optimizador externo y los commiteó
//  (92ba65a). Las imágenes quedaron bien —2.8 MB menos, sin perder el modo
//  oscuro ni la accesibilidad— pero el catálogo generado seguía registrando el
//  hash de los archivos ANTERIORES, así que `tests/activosMedicos.test.mjs`
//  puso CI en rojo y, como el despliegue depende del test, la web dejó de
//  actualizarse durante horas sin que nadie supiera por qué.
//
//  La lección no es «el test molesta»: el test hizo exactamente su trabajo,
//  que es impedir que una imagen cambie sin que cambie su procedencia. La
//  lección es que el minificado tenía que ser parte del PIPELINE y no un paso
//  manual, para que `npm run activos:importar` produzca siempre el mismo byte
//  y el hash del catálogo sea reproducible.
//
//  QUÉ SE DESACTIVA Y POR QUÉ. La preselección de SVGO trae plugins que en
//  este proyecto rompen cosas concretas:
//
//    · cleanupIds     → las composiciones EMBEBEN el cuerpo de varios activos
//      en un mismo documento; renombrar o descartar ids rompería los
//      `url(#…)` internos y el dibujo perdería degradados y máscaras.
//    · removeDesc     → es el texto accesible en español que pone limpiarSvg a
//      propósito. Quitarlo deja la figura muda para un lector de pantalla.
//      (`removeViewBox` y `removeTitle` ya no están en la preselección de
//      SVGO, así que no hace falta desactivarlos; la guarda de abajo verifica
//      igualmente que el viewBox sobreviva.)
//    · inlineStyles   → mueve las reglas de `<style>` a atributos `style`.
//      Funciona, pero 23 de estos archivos definen su paleta clara y su
//      `@media (prefers-color-scheme: dark)` en ese bloque, y prefiero no
//      reorganizar el tema de una figura para ahorrar unos kilobytes.
//
//  El resto de la preselección (trazos, números, atributos redundantes) sí se
//  aplica: es donde está el ahorro de verdad y no cambia lo que se ve.
//
//  `svgo` NO está en package.json, igual que `sharp`: son herramientas que
//  solo hacen falta el día que se importan activos.
//      npm i --no-save svgo && npm run activos:importar
// ============================================================

const CONFIG = {
  multipass: true,
  js2svg: { pretty: false },
  plugins: [{
    name: 'preset-default',
    params: {
      overrides: {
        cleanupIds: false,
        removeDesc: false,
        inlineStyles: false,
      },
    },
  }],
}

let optimize = null

// Se carga a demanda para que quien no importe activos no necesite svgo.
export async function cargarMinificador() {
  if (optimize) return true
  try {
    ({ optimize } = await import('svgo'))
    return true
  } catch {
    return false
  }
}

// Minifica un SVG ya saneado. Devuelve el original si svgo no está instalado
// o si la optimización no produce un SVG utilizable: nunca degrada el archivo.
export function minificarSvg(texto) {
  if (!optimize) return texto
  try {
    const r = optimize(String(texto), CONFIG)
    const salida = r && typeof r.data === 'string' ? r.data : ''
    // Guardas mínimas: tiene que seguir siendo un SVG con viewBox. Si el
    // optimizador devolviera algo raro, se conserva la entrada.
    if (!salida || !/^<svg[\s>]/i.test(salida.trim()) || !/viewBox\s*=/i.test(salida)) return texto
    return salida.endsWith('\n') ? salida : salida + '\n'
  } catch {
    return texto
  }
}
