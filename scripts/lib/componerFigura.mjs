// ============================================================
//  Constructor de composiciones docentes
// ------------------------------------------------------------
//  Convierte una declaración de scripts/activos/composiciones.json en un SVG
//  autocontenido, accesible y legible en tema claro y oscuro.
//
//  Por qué un constructor y no SVG escrito a mano: son diecisiete figuras y
//  todas comparten la misma retícula, la misma tipografía y los mismos tonos.
//  Escritas a mano, cada una habría acabado con su propio tamaño de letra y su
//  propio azul. Declaradas como datos, la revisión académica se hace sobre el
//  TEXTO —que es lo que hay que revisar— y no sobre coordenadas.
//
//  Tres decisiones que conviene no deshacer:
//
//   · TEMA. El SVG se sirve con <img>, así que no hereda el CSS de la página.
//     Lleva su propio <style> con los tonos claros y un bloque
//     `prefers-color-scheme: dark`, que sí se aplica a un SVG cargado como
//     imagen. Así la figura no queda en blanco sobre negro ni al revés.
//
//   · TEXTO REAL, NO QUEMADO. Cada rótulo es un <text>: se puede seleccionar,
//     buscar, traducir y ampliar sin pixelar. Los mapas de bits con texto
//     dentro son inaccesibles y esa es una de las reglas del proyecto.
//
//   · IDENTIFICADORES AISLADOS. Un componente puede usarse dos veces en la
//     misma figura (y varios usan `url(#gradiente)` internamente). Sin prefijar
//     los `id`, la segunda copia robaría el degradado de la primera y el dibujo
//     saldría mal. Cada instancia recibe su propio prefijo.
// ============================================================

const TIPO = 'font-family:\'Segoe UI\',Roboto,\'Helvetica Neue\',Arial,sans-serif'

// Paleta de las composiciones. Los tonos están COMPROBADOS con el cálculo de
// contraste WCAG sobre el fondo de la caja donde se usan (los títulos van a
// 14,5 px en negrita, que no cuenta como «texto grande», así que el mínimo
// aplicable es 4,5:1). El ámbar del tema claro estaba en #a16207 y daba 4,49:
// fallaba AA por una centésima, que es exactamente el tipo de detalle que no se
// ve a ojo. A #8f5700 da 5,43. El resto va entre 5,0 y 8,5 en los dos temas.
const ESTILO = `
:root{
  --f:#ffffff; --p:#f1f5f9; --b:#cbd5e1; --t:#0f172a; --s:#475569;
  --ac:#0369a1; --al:#b91c1c; --ok:#047857; --am:#8f5700; --vi:#6d28d9;
}
@media (prefers-color-scheme: dark){
  :root{
    --f:#0b1220; --p:#16202f; --b:#334155; --t:#e2e8f0; --s:#94a3b8;
    --ac:#38bdf8; --al:#f87171; --ok:#34d399; --am:#fbbf24; --vi:#a78bfa;
  }
}
.fondo{fill:var(--f)}
.t-titulo{${TIPO};font-size:26px;font-weight:700;fill:var(--t)}
.t-sub{${TIPO};font-size:14.5px;fill:var(--s)}
.t-caja-tit{${TIPO};font-size:14.5px;font-weight:700}
.t-caja{${TIPO};font-size:12.8px;fill:var(--t)}
.t-pie{${TIPO};font-size:12.5px;fill:var(--s)}
.t-nota{${TIPO};font-size:12.8px;fill:var(--s)}
.t-etq{${TIPO};font-size:12.5px;fill:var(--t)}
.t-formula{${TIPO};font-size:30px;font-weight:700;fill:var(--t)}
.t-formula-nota{${TIPO};font-size:12.5px;fill:var(--s)}
.caja{fill:var(--p);stroke:var(--b);stroke-width:1;rx:10}
.regla{stroke:var(--b);stroke-width:1}
.tono-tinta{fill:var(--t)} .tono-suave{fill:var(--s)} .tono-acento{fill:var(--ac)}
.tono-alerta{fill:var(--al)} .tono-ok{fill:var(--ok)} .tono-ambar{fill:var(--am)}
.tono-violeta{fill:var(--vi)}
.bd-tinta{stroke:var(--t)} .bd-suave{stroke:var(--s)} .bd-acento{stroke:var(--ac)}
.bd-alerta{stroke:var(--al)} .bd-ok{stroke:var(--ok)} .bd-ambar{stroke:var(--am)}
.bd-violeta{stroke:var(--vi)} .bd-borde{stroke:var(--b)}
.fl-panel{fill:var(--p)} .fl-borde{fill:var(--b)} .fl-none{fill:none}
.fl-tinta{fill:var(--t)} .fl-suave{fill:var(--s)} .fl-acento{fill:var(--ac)}
.fl-alerta{fill:var(--al)} .fl-ok{fill:var(--ok)} .fl-ambar{fill:var(--am)}
.fl-violeta{fill:var(--vi)}
`.replace(/\s*\n\s*/g, '')

const TONOS = new Set(['tinta', 'suave', 'acento', 'alerta', 'ok', 'ambar', 'violeta', 'borde', 'panel'])

const escaparRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// Aísla los `id` de una instancia de componente para que dos copias del mismo
// dibujo no se pisen los degradados ni las máscaras.
function aislarIds(cuerpo, prefijo) {
  const ids = new Set()
  for (const m of cuerpo.matchAll(/\sid\s*=\s*"([^"]+)"/g)) ids.add(m[1])
  if (!ids.size) return cuerpo
  let s = cuerpo
  for (const id of ids) {
    const esc = escaparRe(id)
    s = s.replace(new RegExp(`(\\sid\\s*=\\s*")${esc}(")`, 'g'), `$1${prefijo}${id}$2`)
    s = s.replace(new RegExp(`url\\(#${esc}\\)`, 'g'), `url(#${prefijo}${id})`)
    s = s.replace(new RegExp(`((?:xlink:)?href\\s*=\\s*")#${esc}(")`, 'g'), `$1#${prefijo}${id}$2`)
  }
  return s
}

// Aísla las CLASES de una instancia. Esto no es un detalle: media biblioteca
// viene exportada de Adobe Illustrator y usa exactamente los mismos nombres
// —`.cls-1`, `.st0`— en todos los archivos. El CSS de un SVG es global, así que
// dos componentes sin aislar acabarían pintándose con los colores del otro: el
// riñón saldría del color del corazón, y sin ningún error visible.
function aislarClases(cuerpo, prefijo) {
  const clases = new Set()
  for (const bloque of cuerpo.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    for (const m of bloque[1].matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)) clases.add(m[1])
  }
  if (!clases.size) return cuerpo
  let s = cuerpo
  for (const c of clases) {
    const esc = escaparRe(c)
    // En el CSS: el selector .cls-1 → .p1cls-1
    s = s.replace(new RegExp(`\\.${esc}(?![\\w-])`, 'g'), `.${prefijo}${c}`)
  }
  // En el marcado: class="cls-1 otra" → class="p1cls-1 p1otra"
  s = s.replace(/\sclass\s*=\s*"([^"]*)"/g, (todo, valor) => {
    const nuevo = valor.split(/\s+/).filter(Boolean)
      .map((t) => (clases.has(t) ? prefijo + t : t)).join(' ')
    return ` class="${nuevo}"`
  })
  return s
}

export function componerFigura(comp, { porId, cuerpos, escaparXml }) {
  const errores = []
  const componentes = []
  const piezas = []
  let contador = 0

  const W = Number(comp.ancho) || 960
  const H = Number(comp.alto) || 600
  if (!comp.title) errores.push('falta title')
  if (!comp.descripcion) errores.push('falta descripcion (texto accesible ampliado)')

  const esc = (t) => escaparXml(String(t == null ? '' : t))
  const tono = (t) => (TONOS.has(t) ? t : 'tinta')

  // --- fondo ------------------------------------------------
  piezas.push(`<rect class="fondo" x="0" y="0" width="${W}" height="${H}"/>`)

  // --- cabecera ---------------------------------------------
  piezas.push(`<text class="t-titulo" x="60" y="48">${esc(comp.title)}</text>`)
  if (comp.subtitulo) piezas.push(`<text class="t-sub" x="60" y="72">${esc(comp.subtitulo)}</text>`)
  piezas.push(`<line class="regla" x1="60" y1="84" x2="${W - 60}" y2="84"/>`)

  // --- trazos declarados (se pintan debajo de las figuras) ---
  for (const tr of comp.trazos || []) {
    if (!/^[MmLlHhVvCcSsQqTtAaZz0-9,.\-+eE\s]+$/.test(String(tr.d || ''))) {
      errores.push(`trazo con datos no válidos: ${String(tr.d).slice(0, 40)}`)
      continue
    }
    const relleno = tr.relleno ? `fl-${tono(tr.relleno)}` : 'fl-none'
    const dash = tr.discontinuo ? ' stroke-dasharray="5 4"' : ''
    const punta = tr.punta ? ' marker-end="url(#punta)"' : ''
    // La opacidad permite usar un tono de acento como fondo suave sin definir
    // una segunda paleta: el texto encima sigue teniendo contraste en los dos temas.
    const op = tr.opacidad != null ? ` fill-opacity="${Number(tr.opacidad)}"` : ''
    piezas.push(`<path class="${relleno} bd-${tono(tr.tono || 'borde')}" fill-rule="evenodd" d="${esc(tr.d)}" stroke-width="${Number(tr.grosor) || 1.5}"${dash}${punta}${op}/>`)
  }

  // --- figuras (activos embebidos) --------------------------
  function figura(assetId, x, y, w, h, etiqueta) {
    const f = porId.get(assetId)
    if (!f) { errores.push(`el componente "${assetId}" no está en el catálogo`); return }
    if (!componentes.includes(assetId)) componentes.push(assetId)

    if (f.format === 'svg') {
      const c = cuerpos.get(assetId)
      if (!c || !c.cuerpo) { errores.push(`no hay cuerpo SVG de "${assetId}"`); return }
      const pref = `k${++contador}`
      const cuerpoAislado = aislarClases(aislarIds(c.cuerpo, `${pref}-`), pref)
      piezas.push(
        `<svg x="${x}" y="${y}" width="${w}" height="${h}" viewBox="${f.dimensions.viewBox}"`
        + ` preserveAspectRatio="xMidYMid meet">${cuerpoAislado}</svg>`
      )
    } else {
      // Un PNG de SMART no se puede incrustar por referencia (rompería el
      // requisito de figura autocontenida y de origen propio), así que la
      // composición NO lo embebe: se declara el bloqueo y se deja el hueco
      // rotulado, que es honesto y no promete un dibujo que no está.
      errores.push(`"${assetId}" es ${f.format} y una composición solo puede embeber SVG; usa un componente vectorial o sitúa el PNG como figura suelta`)
      return
    }
    if (etiqueta) {
      piezas.push(`<text class="t-pie" x="${x + w / 2}" y="${y + h + 18}" text-anchor="middle">${esc(etiqueta)}</text>`)
    }
  }

  for (const f of comp.figuras || []) figura(f.assetId, f.x, f.y, f.w, f.h, f.etiqueta)

  const fila = comp.figurasFila
  if (fila && (fila.items || []).length) {
    const k = fila.items.length
    const gap = Number(fila.gap) || 0
    const w = (Number(fila.w) - gap * (k - 1)) / k
    fila.items.forEach((it, i) => {
      figura(it.assetId, Number(fila.x) + i * (w + gap), Number(fila.y), w, Number(fila.h), it.etiqueta)
    })
  }

  // --- rejillas de fichas -----------------------------------
  //
  //  El alto lo DICTA EL CONTENIDO, no el reparto. La primera versión dividía el
  //  alto declarado en partes iguales, y en doce de las diecisiete figuras la
  //  última línea de texto se salía por debajo de su caja: el borde cortaba la
  //  frase y nada fallaba. Ahora se mide lo que cada ficha necesita, se toma el
  //  máximo de su fila y la caja crece hasta ahí. El `h` declarado pasa a ser un
  //  mínimo, y si el total no cabe en el lienzo se avisa con la cifra exacta.
  const ALTO_TITULO = 20
  const ALTO_LINEA = 17
  const ALTO_LINEA_VACIA = 8
  const MARGEN_SUP = 24
  const MARGEN_INF = 10

  function altoNecesario(it) {
    let h = MARGEN_SUP + MARGEN_INF
    if (it.titulo) h += ALTO_TITULO
    for (const l of it.lineas || []) h += (l === '' ? ALTO_LINEA_VACIA : ALTO_LINEA)
    return h
  }

  // Ancho aproximado de una cadena. No hay métricas de fuente en Node, así que
  // se estima por número de caracteres. Los coeficientes están MEDIDOS con
  // `getBBox` en el navegador sobre estos mismos estilos: el texto en español a
  // 12,8 px da entre 0,41 y 0,47 em por carácter, y a 14,5 px en negrita 0,52.
  // Se toma el extremo alto de lo medido más un margen mínimo.
  //
  // La primera versión usó 0,52 y 0,55 «a ojo» y marcó como desbordadas catorce
  // líneas que caben de sobra. Un comprobador demasiado estricto no protege:
  // obliga a recortar texto correcto.
  const COEF_NEGRITA = 0.53
  const COEF_REGULAR = 0.47
  const RELLENO_CAJA = 26 // 16 px de sangrado izquierdo + 10 de aire a la derecha

  function anchoAprox(texto, tam, negrita) {
    return String(texto).length * tam * (negrita ? COEF_NEGRITA : COEF_REGULAR)
  }

  function rejilla(r, nombre) {
    const items = r.items || []
    if (!items.length) return 0
    const cols = Number(r.columnas) || items.length
    const gap = Number(r.gap) || 16
    const filas = Math.ceil(items.length / cols)
    const w = (Number(r.w) - gap * (cols - 1)) / cols
    const minimo = Number(r.h) ? (Number(r.h) - gap * (filas - 1)) / filas : 0

    // Alto de cada fila: el mayor de sus fichas, nunca menos que el declarado.
    const altoFila = []
    for (let f = 0; f < filas; f++) {
      const enFila = items.slice(f * cols, (f + 1) * cols)
      altoFila[f] = Math.max(minimo, ...enFila.map(altoNecesario))
    }

    let cy = Number(r.y)
    items.forEach((it, i) => {
      const f = Math.floor(i / cols)
      const cx = Number(r.x) + (i % cols) * (w + gap)
      const y = Number(r.y) + altoFila.slice(0, f).reduce((n, a) => n + a + gap, 0)
      caja(it, cx, y, w, altoFila[f])
      cy = Math.max(cy, y + altoFila[f])

      // Aviso de rótulo que no cabe en su columna: se dice, con la cifra, en vez
      // de dejar el texto cortado por el borde.
      const util = w - RELLENO_CAJA
      if (it.titulo && anchoAprox(it.titulo, 14.5, true) > util) {
        errores.push(`${nombre}: el título «${it.titulo}» necesita ~${Math.ceil(anchoAprox(it.titulo, 14.5, true) + RELLENO_CAJA)} px y la columna mide ${Math.round(w)}`)
      }
      for (const l of it.lineas || []) {
        if (l && anchoAprox(l, 12.8, false) > util) {
          errores.push(`${nombre}: la línea «${l.slice(0, 42)}…» necesita ~${Math.ceil(anchoAprox(l, 12.8, false) + RELLENO_CAJA)} px y la columna mide ${Math.round(w)}`)
        }
      }
    })
    return cy
  }

  function caja(it, x, y, w, h) {
    const t = tono(it.tono || 'acento')
    const alto = Math.round(h * 100) / 100
    piezas.push(`<rect class="caja" x="${x}" y="${y}" width="${w}" height="${alto}" rx="10"/>`)
    piezas.push(`<rect class="tono-${t}" x="${x}" y="${y}" width="4" height="${alto}" rx="2"/>`)
    let cy = y + MARGEN_SUP
    if (it.titulo) {
      piezas.push(`<text class="t-caja-tit tono-${t}" x="${x + 16}" y="${cy}">${esc(it.titulo)}</text>`)
      cy += ALTO_TITULO
    }
    for (const linea of it.lineas || []) {
      if (linea === '') { cy += ALTO_LINEA_VACIA; continue }
      piezas.push(`<text class="t-caja" x="${x + 16}" y="${cy}">${esc(linea)}</text>`)
      cy += ALTO_LINEA
    }
  }

  // Fondo del lienzo hasta donde de verdad llega el contenido: si una rejilla
  // creció por encima de lo declarado, hay que saberlo antes de publicar.
  let fondoOcupado = 0
  fondoOcupado = Math.max(fondoOcupado, rejilla(comp.rejilla || {}, 'rejilla'))
  fondoOcupado = Math.max(fondoOcupado, rejilla(comp.rejilla2 || {}, 'rejilla2'))
  if (comp.cajaAncha) {
    const c = comp.cajaAncha
    const alto = Math.max(Number(c.h) || 0, altoNecesario(c))
    caja(c, Number(c.x), Number(c.y), Number(c.w), alto)
    fondoOcupado = Math.max(fondoOcupado, Number(c.y) + alto)
    const util = Number(c.w) - RELLENO_CAJA
    for (const l of c.lineas || []) {
      if (l && anchoAprox(l, 12.8, false) > util) {
        errores.push(`cajaAncha: la línea «${l.slice(0, 42)}…» necesita ~${Math.ceil(anchoAprox(l, 12.8, false) + RELLENO_CAJA)} px y la caja mide ${c.w}`)
      }
    }
  }

  // --- fórmula ----------------------------------------------
  if (comp.formula) {
    const f = comp.formula
    piezas.push(`<rect class="caja" x="${f.x}" y="${f.y}" width="${f.w}" height="66" rx="10"/>`)
    piezas.push(`<text class="t-formula" x="${Number(f.x) + Number(f.w) / 2}" y="${Number(f.y) + 34}" text-anchor="middle">${esc(f.texto)}</text>`)
    if (f.nota) piezas.push(`<text class="t-formula-nota" x="${Number(f.x) + Number(f.w) / 2}" y="${Number(f.y) + 54}" text-anchor="middle">${esc(f.nota)}</text>`)
  }

  // --- textos sueltos ---------------------------------------
  for (const t of comp.textos || []) {
    const clase = `tono-${tono(t.tono || 'tinta')}`
    const attrs = [
      `class="t-etq ${clase}"`,
      `x="${t.x}"`, `y="${t.y}"`,
      t.ancla ? `text-anchor="${t.ancla === 'middle' || t.ancla === 'end' ? t.ancla : 'start'}"` : '',
      t.tam ? `style="font-size:${Number(t.tam)}px${t.peso ? `;font-weight:${Number(t.peso)}` : ''}"` : (t.peso ? `style="font-weight:${Number(t.peso)}"` : ''),
      t.rotar ? `transform="rotate(${Number(t.rotar)} ${t.x} ${t.y})"` : '',
    ].filter(Boolean).join(' ')
    piezas.push(`<text ${attrs}>${esc(t.texto)}</text>`)
  }

  // El contenido no puede pisar la nota al pie ni salirse del lienzo. Se avisa
  // con la cifra exacta que hay que poner en `alto`, para no dejarlo al ojo.
  const topeContenido = comp.notaPie ? H - 64 : H - 16
  if (fondoOcupado > topeContenido) {
    errores.push(`el contenido llega a y=${Math.ceil(fondoOcupado)} y el lienzo solo admite ${topeContenido}: sube "alto" a ${Math.ceil(fondoOcupado) + (comp.notaPie ? 64 : 16)}`)
  }

  // --- nota al pie ------------------------------------------
  if (comp.notaPie) {
    const y = H - 34
    piezas.push(`<line class="regla" x1="60" y1="${y - 22}" x2="${W - 60}" y2="${y - 22}"/>`)
    // El pie puede ser largo; se reparte en líneas de ~140 caracteres, que a
    // 12,8 px caben en 840 px de ancho útil.
    const lineas = partir(String(comp.notaPie), 132)
    lineas.slice(0, 3).forEach((l, i) => {
      piezas.push(`<text class="t-nota" x="60" y="${y + i * 16}">${esc(l)}</text>`)
    })
    if (lineas.length > 3) errores.push('la nota al pie no cabe en tres líneas; acórtala o sube el alto de la figura')
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">`
    + `<title>${esc(comp.title)}</title>`
    + `<desc>${esc(comp.descripcion || '')}</desc>`
    + `<defs><style>${ESTILO}</style>`
    + '<marker id="punta" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">'
    + '<path d="M0 0 L10 5 L0 10 z" fill="context-stroke"/></marker></defs>'
    + piezas.join('')
    + '</svg>\n'

  return { svg, componentes, errores }
}

// Reparte un texto en líneas sin cortar palabras.
function partir(texto, ancho) {
  const palabras = texto.split(/\s+/)
  const out = []
  let linea = ''
  for (const p of palabras) {
    if (!linea) { linea = p; continue }
    if ((linea + ' ' + p).length > ancho) { out.push(linea); linea = p } else linea += ' ' + p
  }
  if (linea) out.push(linea)
  return out
}
