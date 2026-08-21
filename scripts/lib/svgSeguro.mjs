// ============================================================
//  Saneado y optimización de SVG importados
// ------------------------------------------------------------
//  Un SVG no es una imagen: es un documento. Traído de un repositorio de
//  terceros y servido desde el propio origen del sitio, puede ejecutar
//  JavaScript (`<script>`, `onload=`), pedir recursos a otro dominio
//  (`<image href="https://…">`, `@import`) o incrustar HTML dentro del dibujo
//  (`<foreignObject>`). Nada de eso hace falta para dibujar un riñón.
//
//  Este módulo RECHAZA —no «limpia y reza»— cualquier archivo con esos
//  elementos, y elimina el ruido de editor (metadatos de Inkscape, comentarios,
//  identificadores de Adobe) sin tocar la geometría ni el `viewBox`.
//
//  Se exporta también `problemasDeSvg`, que es lo que usan las pruebas para
//  comprobar el resultado FINAL en public/, no solo la intención del pipeline.
// ============================================================

// Elementos que ejecutan código o traen contenido de fuera. Estos NUNCA se
// aceptan, ni antes ni después de limpiar: si aparecen, el archivo se rechaza.
const ELEMENTOS_EJECUTABLES = [
  'script', 'iframe', 'embed', 'object', 'audio', 'video', 'handler',
]

// Elementos que además no tienen sentido en una ilustración estática. Se
// comprueban en la fase ESTRICTA, sobre el archivo ya limpio: `foreignObject`
// llega en casi todos los SVG exportados de Adobe Illustrator dentro de un
// `<switch>` cuyo único contenido es una referencia a datos privados del
// editor, y eso lo retira `limpiarSvg`. Si sobrevive a la limpieza, es que no
// era eso y el archivo se rechaza.
const ELEMENTOS_PROHIBIDOS = [
  ...ELEMENTOS_EJECUTABLES,
  'foreignObject', 'animate', 'animateTransform', 'animateMotion', 'set',
]

// Atributos de evento: cualquiera que empiece por `on`.
const RE_EVENTO = /\son[a-z-]+\s*=/gi

// Referencias que salen del archivo. Se permite solo `#fragmento`: un dibujo
// autocontenido no necesita traer nada de fuera.
const RE_EXTERNO = /(?:\shref|xlink:href|\ssrc)\s*=\s*["'](?!#)([^"']*)["']/gi
const RE_URL_CSS = /url\(\s*["']?(?!#)([^"')]*)["']?\s*\)/gi

// `modo`:
//   'estricto' (por omisión) → el archivo FINAL, el que se va a servir. Nada de
//        ejecutable, nada de externo, nada de restos de editor.
//   'origen'   → el archivo TAL COMO LLEGA, antes de limpiar. Solo se buscan las
//        cosas que la limpieza no puede convertir en inocuas: código,
//        atributos de evento y referencias a otro dominio. Así el saneado
//        nunca puede tapar un `<script>` «arreglándolo».
export function problemasDeSvg(texto, opciones = {}) {
  const nombre = opciones.nombre || 'svg'
  const modo = opciones.modo || 'estricto'
  const p = []
  const s = String(texto || '')
  if (!s.trim()) return [nombre + ': archivo vacío']
  if (!/<svg[\s>]/i.test(s)) return [nombre + ': no parece un SVG (falta el elemento <svg>)']

  const elementos = modo === 'origen' ? ELEMENTOS_EJECUTABLES : ELEMENTOS_PROHIBIDOS
  for (const el of elementos) {
    if (new RegExp('<\\s*' + el + '[\\s>/]', 'i').test(s)) p.push(nombre + ': contiene <' + el + '>')
  }
  const eventos = s.match(RE_EVENTO)
  if (eventos) {
    const unicos = [...new Set(eventos.map((e) => e.trim()))]
    p.push(nombre + ': atributos de evento (' + unicos.join(' ') + ')')
  }
  if (/@import/i.test(s)) p.push(nombre + ': usa @import en CSS')
  if (modo !== 'origen') {
    // Un DTD interno con entidades es lo que usa Illustrator para declarar sus
    // espacios de nombres privados; después de limpiar no debe quedar ninguno,
    // porque una entidad es también el vehículo del ataque de expansión (XXE).
    if (/<!ENTITY/i.test(s)) p.push(nombre + ': declara entidades XML')
    if (/<!DOCTYPE[^>]*(SYSTEM|PUBLIC)/i.test(s)) p.push(nombre + ': DOCTYPE con SYSTEM/PUBLIC')
  }

  for (const m of s.matchAll(RE_EXTERNO)) {
    const valor = (m[1] || '').trim()
    if (!valor) continue
    // `data:` incrustado: se rechaza porque esconde contenido sin revisar.
    if (/^data:/i.test(valor)) p.push(nombre + ': referencia data: incrustada')
    else p.push(nombre + ': referencia externa a "' + valor.slice(0, 80) + '"')
  }
  for (const m of s.matchAll(RE_URL_CSS)) {
    const valor = (m[1] || '').trim()
    if (valor && !valor.startsWith('#')) p.push(nombre + ': url() externa en CSS "' + valor.slice(0, 80) + '"')
  }
  return p
}

// Limpieza conservadora. Lo que NO hace, a propósito:
//   · no reescribe ni redondea coordenadas (alteraría la ilustración);
//   · no toca `viewBox` ni `preserveAspectRatio`;
//   · no renombra `id` (los `url(#…)` internos dependen de ellos).
export function limpiarSvg(texto, opciones = {}) {
  const titulo = opciones.titulo || ''
  const descripcion = opciones.descripcion || ''
  let s = String(texto)

  // --- Envoltorio de Adobe Illustrator ---------------------------------
  //  Casi todo el material de DBCLS llega exportado de Illustrator, que añade
  //  tres cosas inútiles y una molesta:
  //    · un DTD interno con sus espacios de nombres privados como entidades;
  //    · un `<switch>` cuyo primer hijo es un `<foreignObject>` que solo
  //      contiene una referencia (`<i:aipgfRef>`) a datos privados del editor;
  //    · un bloque `<i:aipgf>` con un CDATA de cientos de kilobytes;
  //    · atributos `i:extraneous` por todo el árbol.
  //  El dibujo de verdad es el hermano del foreignObject dentro del switch. Se
  //  retira el envoltorio y se conserva el dibujo: después de esto el archivo
  //  ya no tiene foreignObject ni entidades, y la comprobación estricta puede
  //  seguir siendo estricta.
  s = s.replace(/<!DOCTYPE[\s\S]*?\]\s*>/gi, '')
  s = s.replace(/<i:[a-zA-Z][\w-]*[\s\S]*?<\/i:[a-zA-Z][\w-]*>/g, '')
  s = s.replace(/<i:[a-zA-Z][\w-]*[^>]*\/>/g, '')
  s = s.replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
  s = s.replace(/<foreignObject[^>]*\/>/gi, '')
  // El `<switch>` ya vacío de su alternativa: se desenvuelve para no dejar un
  // elemento de conmutación con una sola rama.
  s = s.replace(/<switch[^>]*>/gi, '').replace(/<\/switch>/gi, '')
  // Referencias a entidades del DTD que se acaba de borrar (&ns_ai; …).
  s = s.replace(/\sxmlns:[\w-]+\s*=\s*"&[\w-]+;"/g, '')
  s = s.replace(/&ns_[\w-]+;/g, '')

  // Metadatos de editor: sodipodi/inkscape/rdf. Pesan y no dibujan.
  s = s.replace(/<metadata[\s\S]*?<\/metadata>/gi, '')
  s = s.replace(/<sodipodi:namedview[\s\S]*?(\/>|<\/sodipodi:namedview>)/gi, '')
  s = s.replace(/<!--[\s\S]*?-->/g, '')
  s = s.replace(/\s(?:sodipodi|inkscape|graph|adobe|illustrator|serif|i|x)\s*:\s*[\w-]+\s*=\s*"[^"]*"/gi, '')
  s = s.replace(/\sxmlns:(?:sodipodi|inkscape|rdf|cc|dc|graph|serif|i|x)\s*=\s*"[^"]*"/gi, '')
  s = s.replace(/<\?xml[^>]*\?>/gi, '')
  s = s.replace(/<!DOCTYPE[^>]*>/gi, '')
  s = s.replace(/>\s+</g, '><').replace(/[ \t]{2,}/g, ' ').trim()

  // `viewBox` es obligatorio: sin él el dibujo no escala y la proporción se
  // pierde. Si el archivo trae solo width/height numéricos, se deduce.
  if (!/viewBox\s*=/i.test(s)) {
    const w = s.match(/<svg[^>]*\swidth\s*=\s*"([\d.]+)(?:px)?"/i)
    const h = s.match(/<svg[^>]*\sheight\s*=\s*"([\d.]+)(?:px)?"/i)
    if (w && h) s = s.replace(/<svg/i, '<svg viewBox="0 0 ' + w[1] + ' ' + h[1] + '"')
  }

  // --- rótulos quemados en inglés ---------------------------------------
  //  Quince de los archivos importados traen texto DENTRO del dibujo, y casi
  //  siempre en inglés: «Tongue», «Pharynx», «Concentration». En una guía en
  //  español eso da una figura bilingüe, y además es texto que no se puede
  //  traducir, buscar ni leer con un lector de pantalla: la regla del proyecto
  //  es que lo que explica la imagen va en el pie y en el texto alternativo.
  //
  //  La decisión es POR ACTIVO, declarada en seleccion.json, porque un borrado
  //  general sería peor: los números de la esfera de un cronómetro son el
  //  dibujo, y «O₂» o «CO₂» no son inglés. `quitarTexto` admite:
  //    · true          → quitar todo el texto del dibujo;
  //    · ['Wave', …]   → quitar solo esos rótulos (comparación exacta).
  const quitar = opciones.quitarTexto
  if (quitar) {
    const quitarTodo = quitar === true
    const lista = Array.isArray(quitar) ? quitar.map((x) => String(x).trim()) : []
    s = s.replace(/<text\b[^>]*>[\s\S]*?<\/text>/gi, (etiqueta) => {
      if (quitarTodo) return ''
      const contenido = etiqueta.replace(/<[^>]*>/g, '').trim()
      return lista.includes(contenido) ? '' : etiqueta
    })
    // Un `<text>` vacío que quedara suelto no pinta nada; se limpia igual.
    s = s.replace(/<text\b[^>]*\/>/gi, '')
  }

  // Accesibilidad: `<title>`/`<desc>` propios en español. El original suele
  // venir en inglés o ser el nombre del archivo, que no sirve como alternativa.
  if (titulo || descripcion) {
    s = s.replace(/<title>[\s\S]*?<\/title>/i, '').replace(/<desc>[\s\S]*?<\/desc>/i, '')
    const cabecera = s.match(/<svg[^>]*>/i)
    if (cabecera) {
      const acc = (titulo ? '<title>' + escaparXml(titulo) + '</title>' : '')
        + (descripcion ? '<desc>' + escaparXml(descripcion) + '</desc>' : '')
      s = s.replace(cabecera[0], cabecera[0] + acc)
    }
  }
  // Precisión de la geometría. Las ilustraciones de Servier vienen con tres
  // decimales y son dibujos de miles de trazos: bajar a dos recorta entre un
  // 10 y un 20 % del peso. En un lienzo de ~500 unidades que se pinta a 900 px
  // como máximo, dos decimales son 0,002 % de error: por debajo del subpíxel.
  // Solo se toca el interior de `d` y `points`; ni un atributo más, para no
  // mover un `viewBox` ni una matriz de transformación.
  const decimales = opciones.decimales == null ? 2 : Number(opciones.decimales)
  if (decimales >= 0) {
    s = s.replace(/\s(d|points)\s*=\s*"([^"]*)"/g, (todo, attr, valor) => (
      ` ${attr}="${valor.replace(/-?\d*\.\d+/g, (n) => {
        const r = Number(n).toFixed(decimales)
        return String(Number(r))
      })}"`
    ))
  }

  if (!/<svg[^>]*\srole\s*=/i.test(s)) s = s.replace(/<svg/i, '<svg role="img"')
  if (!/<svg[^>]*\sxmlns\s*=/i.test(s)) s = s.replace(/<svg/i, '<svg xmlns="http://www.w3.org/2000/svg"')

  return s + '\n'
}

export function escaparXml(t) {
  return String(t)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Dimensiones declaradas por el archivo: `viewBox` manda. Devuelve null si no
// se puede saber (eso es un fallo del importador, no algo que se arregle
// inventando 24×24).
export function dimensionesSvg(texto) {
  const s = String(texto || '')
  const vb = s.match(/viewBox\s*=\s*"\s*([-\d.eE]+)[ ,]+([-\d.eE]+)[ ,]+([-\d.eE]+)[ ,]+([-\d.eE]+)\s*"/i)
  if (vb) {
    const w = Number(vb[3])
    const h = Number(vb[4])
    if (Number.isFinite(w) && Number.isFinite(h) && w > 0 && h > 0) {
      return {
        width: redondear(w),
        height: redondear(h),
        viewBox: vb[1] + ' ' + vb[2] + ' ' + vb[3] + ' ' + vb[4],
      }
    }
  }
  const w = s.match(/<svg[^>]*\swidth\s*=\s*"([\d.]+)/i)
  const h = s.match(/<svg[^>]*\sheight\s*=\s*"([\d.]+)/i)
  if (w && h) return { width: redondear(+w[1]), height: redondear(+h[1]), viewBox: '0 0 ' + w[1] + ' ' + h[1] }
  return null
}

function redondear(n) {
  return Math.round(n * 100) / 100
}

// Cuerpo interior de un SVG (sin el envoltorio <svg>), para componer figuras
// nuevas a partir de varios activos. No se reescala aquí: eso lo hace el <svg>
// anidado que lo envuelve, respetando su propio viewBox.
export function cuerpoSvg(texto) {
  const s = String(texto)
  const abre = s.match(/<svg[^>]*>/i)
  if (!abre) return ''
  const desde = s.indexOf(abre[0]) + abre[0].length
  const hasta = s.lastIndexOf('</svg>')
  if (hasta < desde) return ''
  return s.slice(desde, hasta)
    // El `<title>` del componente no debe competir con el de la composición:
    // la figura tiene UN nombre accesible, no cinco.
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<desc>[\s\S]*?<\/desc>/gi, '')
}

// Dimensiones de un PNG, leídas de su cabecera IHDR. Los activos de SMART
// llegan en PNG: sin esto, el catálogo declararía un tamaño inventado y la
// caja de la figura volvería a deformar el dibujo.
export function dimensionesPng(buf) {
  if (!buf || buf.length < 24) return null
  const firma = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
  for (let i = 0; i < firma.length; i++) if (buf[i] !== firma[i]) return null
  if (buf.toString('ascii', 12, 16) !== 'IHDR') return null
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20), viewBox: '' }
}
