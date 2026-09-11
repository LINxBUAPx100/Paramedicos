// Auditoría reproducible sin montar App ni importar Firebase.
// Solo escribe el anexo de mediciones; no modifica CSS, datos o pruebas.
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { createRequire } from 'node:module'
import { resumenAcademia } from '../../src/lib/panelModelo.js'
import { bancoDeExamen, motivoExamenInactivo } from '../../src/lib/bancoExamen.js'
import { seleccionarPreguntas } from '../../src/lib/examenModelo.js'
import { construirAgregados } from '../../src/lib/agregadosModelo.js'
import { construirApiBajoDemanda } from '../../src/lib/contenidoApi.js'
import { apiConValidaciones } from '../../src/lib/validacionesModelo.js'
const require = createRequire(import.meta.url)
const postcss = require('postcss')
const esbuild = require('esbuild')
const React = require('react')
const { renderToStaticMarkup } = require('react-dom/server')
const raiz = path.resolve(import.meta.dirname, '../..')
const leer = (f) => fs.readFileSync(path.join(raiz, f), 'utf8')
const arbol = postcss.parse(leer('src/index.css'))
const declaraciones = []
arbol.walkDecls((d) => declaraciones.push(d))
const grupos = {
  'Tamaño de fuente': /^(font-size)$/,
  'Familia de fuente': /^(font-family)$/,
  'Altura de línea': /^(line-height)$/,
  'Espaciado': /^(padding|margin|gap|row-gap|column-gap)(-|$)/,
  'Radios': /^border(-[a-z]+)*-radius$/,
  'Sombras': /^(box-shadow|text-shadow)$/,
  'Colores de texto/fondo/borde': /^(color|background|background-color|border|border-.*)$/,
  'Transición/animación': /^(transition|animation)(-|$)/,
}
const escapar = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ')
const tabla = (cab, filas) => ['| ' + cab.join(' | ') + ' |', '|' + cab.map(() => '---').join('|') + '|', ...filas.map((f) => '| ' + f.map(escapar).join(' | ') + ' |')].join('\n')
const partes = ['# Fase 1 — Mediciones y reproducciones', 'Ejecutar desde la raíz: `node docs/ux/medir-fase-1.mjs`. Usa dependencias ya instaladas. No conecta Firebase ni ejecuta handlers de escritura. Los casos sintéticos no representan alumnos reales.', '## CSS: criterio', 'Se analiza todo index.css con PostCSS. Cada declaración cuenta aunque luego sea sobrescrita o pertenezca a un breakpoint. Los valores únicos son cadenas normalizadas, no valores computados equivalentes. «Con var» incluye valores mixtos con literales. No se cuentan definiciones --token dentro de estas familias. Colores incluye border completo; no es un conteo exclusivo de pigmentos.']
const resumen = []
for (const [nombre, patron] of Object.entries(grupos)) {
  const ds = declaraciones.filter((d) => patron.test(d.prop))
  const valores = new Map()
  for (const d of ds) {
    const valor = d.value.trim().replace(/\s+/g, ' ')
    const anterior = valores.get(valor) || { n: 0, linea: d.source.start.line }
    anterior.n++
    valores.set(valor, anterior)
  }
  const conVar = ds.filter((d) => d.value.includes('var(')).length
  resumen.push([nombre, ds.length, valores.size, conVar, ds.length - conVar])
  partes.push(`## ${nombre}: 15 valores más frecuentes`, tabla(['Valor', 'Declaraciones', 'Primera línea de index.css'], [...valores].sort((a, b) => b[1].n - a[1].n).slice(0, 15).map(([v, d]) => [v, d.n, d.linea])))
}
partes.splice(4, 0, '## Resumen CSS', tabla(['Familia', 'Declaraciones', 'Valores distintos', 'Con var()', 'Sin var()'], resumen))
const hex = new Set()
declaraciones.forEach((d) => { for (const m of d.value.matchAll(/#[0-9a-f]{3,8}\b/gi)) hex.add(m[0].toLowerCase()) })
const medias = new Set()
arbol.walkAtRules('media', (r) => medias.add(r.params))
partes.push('## Literales y condiciones', `Literales hex distintos: ${hex.size}. Condiciones @media distintas: ${medias.size}. Los hex abreviados no se equiparan a los largos.`, tabla(['Condiciones @media'], [...medias].map((x) => [x])))
const patrones = /\.(admin-form|pc-form|cuenta-form|rec-form|cal-input|panel-tabla|rp-tabla|c-tabla|revdoc-form|btn--primario|btn|tema-page|c-parrafo|aviso-editorial)(?![\w-])/
const reglas = []
arbol.walkRules((r) => {
  if (!patrones.test(r.selector)) return
  const ds = (r.nodes || []).filter((d) => d.type === 'decl' && /^(font|line-height|padding|margin|gap|border-radius|min-width|max-width|width|color|background|outline|min-height)/.test(d.prop))
  if (ds.length) reglas.push([r.source.start.line, r.selector, r.parent.type === 'atrule' ? `@${r.parent.name} ${r.parent.params}` : 'global', ds.map((d) => `${d.prop}: ${d.value}`).join('; ')])
})
partes.push('## Reglas comparables: lector, botones, formularios y tablas', 'Extracto de declaraciones fuente; conserva overrides y condiciones para no confundir la primera regla con el resultado final.', tabla(['Línea', 'Selector', 'Condición', 'Declaraciones'], reglas))
// Solo se evalúan estos cuatro archivos y React. Cualquier import nuevo ajeno
// a esta lista detiene la reproducción en vez de ejecutar la aplicación.
const permitidos = new Set(['src/components/Quiz.jsx', 'src/components/Icon.jsx', 'src/lib/baraja.js', 'src/lib/azar.js'])
const cache = new Map()
function moduloLocal(f) {
  if (!permitidos.has(f)) throw new Error(`Import fuera del aislamiento: ${f}`)
  if (cache.has(f)) return cache.get(f).exports
  const modulo = { exports: {} }
  cache.set(f, modulo)
  const codigo = esbuild.transformSync(leer(f), { loader: 'jsx', format: 'cjs', jsx: 'automatic' }).code
  const importar = (id) => id.startsWith('react') ? require(id) : moduloLocal(path.posix.normalize(path.posix.join(path.posix.dirname(f), id)))
  vm.runInThisContext(`(function(require,module,exports){${codigo}\n})`, { filename: f })(importar, modulo, modulo.exports)
  return modulo.exports
}
const Quiz = moduloLocal('src/components/Quiz.jsx').default
const sondas = []
const temaBorrador = { id: 'tema-sintetico', titulo: 'Prueba de interfaz', estadoEditorial: 'borrador', revision: { estado: 'borrador', procedencia: 'redactado' }, secciones: [], conceptosClave: [], flashcards: [], quiz: [{ pregunta: 'Pregunta sintética', opciones: ['A', 'B'], correcta: 0, explicacion: 'Prueba' }] }
const modulosSinteticos = [{ id: 'modulo-sintetico', numero: 1, titulo: 'Módulo sintético', temas: [temaBorrador] }]
const agregados = construirAgregados(modulosSinteticos)
const apiSintetica = apiConValidaciones(construirApiBajoDemanda({ indice: { modulos: modulosSinteticos }, cargarTema: async () => temaBorrador, cargarAgregado: async (tipo) => agregados.porModulo[0][tipo] }), {})
sondas.push(['Mismo borrador, dos caminos reales', JSON.stringify({ bancoUnidad: bancoDeExamen([temaBorrador]).length, agregadoModulo: (await apiSintetica.preguntasDeModuloAsync('modulo-sintetico')).length, agregadoGeneral: (await apiSintetica.todasLasPreguntasAsync()).length })])
for (const [nombre, preguntas] of [['Quiz vacío', []], ['Quiz de control, no clínico', [{ pregunta: 'Pregunta sintética de interfaz', opciones: ['Opción A', 'Opción B'], correcta: 0, explicacion: 'Caso de prueba de interfaz.' }]]]) {
  try {
    const html = renderToStaticMarkup(React.createElement(Quiz, { preguntas, semilla: 'auditoria' }))
    sondas.push([nombre, `Render correcto; ${html.length} caracteres; aria-pressed=${html.includes('aria-pressed')}; aria-checked=${html.includes('aria-checked')}`])
  } catch (e) { sondas.push([nombre, `${e.name}: ${e.message}`]) }
}
sondas.push(['Selección sin banco', JSON.stringify(seleccionarPreguntas([], { semilla: 'auditoria' }))])
sondas.push(['Banco vacío y motivo de unidad', JSON.stringify({ banco: bancoDeExamen([]), motivo: motivoExamenInactivo([]) })])
const alumnos = Array.from({ length: 200 }, (_, i) => ({ id: `sintetico-${i}`, nombre: `Alumno de prueba ${i + 1}` }))
const stats = resumenAcademia({ alumnos, modulos: [], porAlumno: {}, intentos: [], ahora: 0 })
sondas.push(['200 alumnos sintéticos sin intentos', JSON.stringify({ total: stats.totalAlumnos, activos: stats.activos, enRiesgo: stats.enRiesgo.length, promedio: stats.promedio })])
partes.push('## Reproducciones aisladas', 'Render de servidor del componente real Quiz, no simulación de sus funciones. No comprueba eventos de navegador, foco, CSS calculado ni persistencia. La reproducción del error no modifica ni relaja las pruebas existentes.', tabla(['Sonda', 'Salida'], sondas))
const luminancia = (valor) => {
  const h = valor.replace('#', '')
  const c = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722
}
const pares = [['#ffffff', '#3f8ef0'], ['#ffffff', '#0c5fc4'], ['#475569', '#ffffff'], ['#b45309', '#fef3c7'], ['#10b981', '#ffffff'], ['#ef4444', '#ffffff']]
partes.push('## Pares de contraste de referencia', 'Se calcula luminancia sRGB de colores opacos. El extremo claro de un degradado no demuestra por sí solo el contraste bajo cada glifo: es un candidato a verificar en navegador. No se certifica ninguna pantalla ni marca personalizada.', tabla(['Texto', 'Fondo', 'Ratio'], pares.map(([a, b]) => { const l = [luminancia(a), luminancia(b)].sort((x, y) => y - x); return [a, b, ((l[0] + 0.05) / (l[1] + 0.05)).toFixed(2)] })))
fs.writeFileSync(path.join(raiz, 'docs/ux/FASE-1-MEDICIONES.md'), partes.join('\n\n') + '\n')
console.log(JSON.stringify({ resumen, hexDistintos: hex.size, condicionesMedia: medias.size, sondas, salida: 'docs/ux/FASE-1-MEDICIONES.md' }, null, 2))
