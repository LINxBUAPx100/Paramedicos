// Reconocimiento estático: no importa la aplicación ni conecta con Firebase.
// Usa los parsers ya presentes en el lockfile, sin instalar dependencias.
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { parse } = require('@babel/parser')
const postcss = require('postcss')
const raiz = path.resolve(import.meta.dirname, '../..')
const leer = (f) => fs.readFileSync(path.join(raiz, f), 'utf8')
const archivos = (d) => fs.readdirSync(path.join(raiz, d), { withFileTypes: true })
  .flatMap((e) => e.isDirectory() ? archivos(`${d}/${e.name}`) : [`${d}/${e.name}`]).sort()
const visitar = (n, fn) => {
  if (!n || typeof n !== 'object') return
  if (n.type) fn(n)
  for (const [k, v] of Object.entries(n)) {
    if (['loc', 'start', 'end', 'comments', 'tokens'].includes(k)) continue
    if (Array.isArray(v)) v.forEach((x) => visitar(x, fn))
    else if (v && typeof v === 'object') visitar(v, fn)
  }
}
const fuentes = archivos('src').filter((f) => /\.(jsx|js)$/.test(f))
const datos = new Map()
for (const f of fuentes) {
  const texto = leer(f)
  const ast = parse(texto, { sourceType: 'module', plugins: ['jsx'] })
  const d = { ast, etiquetas: {}, controles: [], imports: [], exports: [], tablas: [], formas: [] }
  visitar(ast, (n) => {
    if (n.type === 'ImportDeclaration') d.imports.push(n.source.value)
    if (n.type === 'CallExpression' && n.callee.type === 'Import' && n.arguments[0]?.type === 'StringLiteral') d.imports.push(n.arguments[0].value)
    if (n.type === 'ExportDefaultDeclaration') d.exports.push(n.declaration.id?.name || 'default')
    if (n.type === 'ExportNamedDeclaration' && n.declaration?.id) d.exports.push(n.declaration.id.name)
    if (n.type !== 'JSXOpeningElement') return
    const nombre = n.name.name
    d.etiquetas[nombre] = (d.etiquetas[nombre] || 0) + 1
    const atributo = (clave) => {
      const a = n.attributes.find((x) => x.name?.name === clave)
      return a ? a.value ? texto.slice(a.value.start, a.value.end).replace(/\s+/g, ' ') : 'sí' : '—'
    }
    const item = { linea: n.loc.start.line, etiqueta: nombre, clase: atributo('className'), tipo: atributo('type') }
    if (['button', 'input', 'select', 'textarea', 'form', 'table'].includes(nombre)) d.controles.push(item)
    if (nombre === 'table') d.tablas.push(item)
    if (nombre === 'form') d.formas.push({ ...item, envio: atributo('onSubmit') })
  })
  datos.set(f, d)
}
const enlace = (f, l) => `[${f}${l ? ':' + l : ''}](../../${f})`
const celda = (x) => String(x).replace(/\|/g, '\\|').replace(/\n/g, ' ')
const tabla = (cab, filas) => ['| ' + cab.join(' | ') + ' |', '|' + cab.map(() => '---').join('|') + '|', ...filas.map((r) => '| ' + r.map(celda).join(' | ') + ' |')].join('\n')
const partes = ['# Fase 0 — Inventario estático reproducible', '', 'Generado con `node docs/ux/inventariar-fase-0.mjs`. Cuenta declaraciones de código, no elementos renderizados ni personas. Los enlaces abren el archivo; el sufijo indica la línea observada. No determina equivalencia visual ni accesibilidad.', '']
const css = postcss.parse(leer('src/index.css'))
let declaraciones = 0, reglas = 0, oscuro = 0
const clases = new Map(), tokens = new Set()
css.walkDecls((d) => { declaraciones++; if (d.prop.startsWith('--')) tokens.add(d.prop) })
css.walkRules((r) => {
  reglas++
  if (r.selector.includes('data-tema')) oscuro++
  for (const m of r.selector.matchAll(/\.([a-zA-Z_][\w-]*)/g)) if (!clases.has(m[1])) clases.set(m[1], r.source.start.line)
})
const comp = [...datos].filter(([f]) => f.startsWith('src/components/'))
const totales = (lista) => Object.fromEntries(['button', 'table', 'form', 'input', 'select', 'textarea'].map((k) => [k, lista.reduce((n, [, d]) => n + (d.etiquetas[k] || 0), 0)]))
partes.push('## Conteos', tabla(['Medida', 'Resultado'], [
  ['Líneas físicas index.css (sin contar el segmento vacío final)', leer('src/index.css').trimEnd().split('\n').length],
  ['Declaraciones CSS (PostCSS; incluye custom properties y @font-face)', declaraciones],
  ['Reglas CSS / reglas con data-tema', `${reglas} / ${oscuro}`],
  ['Custom properties distintas declaradas, en cualquier selector', tokens.size],
  ['Archivos components (incluye datosAcademia.js)', comp.length],
  ['Controles declarados en components', JSON.stringify(totales(comp))],
  ['Controles declarados en todo src', JSON.stringify(totales([...datos]))],
  ['Pruebas raíz / reglas', `${archivos('tests').filter((f) => /^tests\/[^/]+\.test\.mjs$/.test(f)).length} / ${archivos('tests/rules').filter((f) => f.endsWith('.test.mjs')).length}`],
]), '')
// Las rutas anidadas heredan prefijo. Los index comparten URL con su shell.
const rutas = []
const propositos = {
  Inicio: 'Portada pública, bienvenida sin academia o inicio con acceso, según sesión',
  Cuenta: 'Registro, inicio de sesión, código de acceso y gestión de cuenta',
  Landing: 'Portada de Paramédicos; CarreraPage presenta las otras cinco carreras en preparación',
  TerminosPage: 'Consultar términos y condiciones', ModuloPage: 'Índice del módulo y acceso a sus temas',
  ExamenModuloPage: 'Rendir examen del módulo', RedirigirModulo: 'Compatibilidad: /fase redirige a /modulo, conservando id y examen',
  TemaPage: 'Estudiar una lección o consultar un nodo de evaluación; revisión docente según permiso',
  QuizPage: 'Contestar el quiz del tema', ExamenUnidadPage: 'Rendir evaluación del alcance de la unidad',
  ExamenPage: 'Rendir examen general', FlashcardsPage: 'Repasar tarjetas globales o de un tema',
  LogrosPage: 'Galería del temario, medallero y glosario según visibilidad', AtlasAnatomicoPage: 'Explorar anatomía 3D',
  BotiquinPage: 'Explorar el botiquín 3D (trabajo concurrente, incluido por autorización del dueño)',
  CreditosPage: 'Consultar atribuciones de los activos visuales sin iniciar sesión',
  Navigate: 'Redirección de compatibilidad: atlas → logros; admin/replicacion → admin/contenido',
  TemarioPage: 'Consultar estructura del temario', ProgresoPage: 'Ver avance propio y vista staff según rol', BuscarPage: 'Buscar temas',
  PanelShell: 'Shell de la academia; puerta staff, contexto y navegación', PanelResumen: 'Estadísticas y alumnos en riesgo',
  PanelRecepcion: 'Alta de mostrador, matrícula, invitación y pago', PanelMiembros: 'Consultar y gestionar miembros según permiso',
  PanelGrupos: 'Gestionar grupos y visibilidad', PanelInvitaciones: 'Centro de invitaciones', PanelAccesos: 'Códigos y solicitudes de acceso',
  PanelCalificaciones: 'Avance de exámenes y evaluaciones/calificaciones de grupo', PanelContenido: 'Estado de cursos, historial y entrada al editor',
  PanelMiAcademia: 'Ajustes y personalización de academia', EditorPage: 'Editor estructural y de contenido; contexto propio, academia o plantilla',
  AdminShell: 'Shell global; puerta superadmin y contexto de plataforma', AdminResumen: 'Resumen global',
  AdminPage: 'Academias o usuarios, según prop seccion', ReplicacionPage: 'Plantillas, copias de temario y dictámenes globales',
  AdminFacturacion: 'Planes, facturación y anuncio global', AdminIncidencias: 'Incidencias de plataforma', AdminLogs: 'Historial de operaciones',
  AcademiaShell: 'Contexto de una academia dentro de la consola global', AcaProgramas: 'Elegir y administrar programas de academia',
  AcaAlumnos: 'Personas de academia', AcaAccesos: 'Códigos y solicitudes de academia', AcaInvitaciones: 'Invitaciones de academia',
  AcaRecepcion: 'Recepción de academia', AcaAjustes: 'Ajustes y personalización de academia', AcaResumen: 'Resumen del curso elegido',
  AcaGrupos: 'Grupos del curso', AcaContenido: 'Contenido del curso', AcaRevision: 'Cola de dictámenes del curso, bajo superadmin',
  AcaCalificaciones: 'Calificaciones del curso', AcademiaAdminPage: 'Ficha global de academia y panel de gestión integrado',
  NotFound: 'Ruta no encontrada',
}
const recorrerRutas = (n, prefijo = '') => {
  if (!n || typeof n !== 'object') return
  let base = prefijo
  if (n.type === 'JSXElement' && n.openingElement.name.name === 'Route') {
    const attrs = n.openingElement.attributes
    const p = attrs.find((a) => a.name?.name === 'path')?.value
    const idx = attrs.some((a) => a.name?.name === 'index')
    const el = attrs.find((a) => a.name?.name === 'element')?.value
    const nombres = []
    if (el) visitar(el, (x) => { if (x.type === 'JSXOpeningElement') nombres.push(x.name.name) })
    const ruta = p?.type === 'StringLiteral' ? p.value : p ? '/{c.slug}' : ''
    base = ruta.startsWith('/') ? ruta : [prefijo, ruta].filter(Boolean).join('/')
    rutas.push([base || '/', idx ? 'index' : el ? 'elemento' : 'agrupador', nombres.join(' → ') || '—', n.loc.start.line])
  }
  for (const [k, v] of Object.entries(n)) {
    if (['loc', 'comments', 'tokens'].includes(k)) continue
    if (Array.isArray(v)) v.forEach((x) => recorrerRutas(x, base))
    else if (v && typeof v === 'object') recorrerRutas(v, base)
  }
}
recorrerRutas(datos.get('src/App.jsx').ast)
partes.push('## Rutas declaradas', `${rutas.length} declaraciones JSX Route. La entrada /{c.slug} se expande en seis rutas desde carrerasModelo.js; index y shell no son pantallas adicionales. Todas usan #/ en el navegador.`, tabla(['Ruta', 'Tipo', 'Componente / gate', 'Propósito', 'Evidencia'], rutas.map((r) => [r[0], r[1], r[2], propositos[r[2].replace('RutaProtegida → ', '').split(' → ')[0]] || 'Agrupar el contexto del curso; sin pantalla propia', enlace('src/App.jsx', r[3])])), '')
partes.push('## Todos los archivos de componentes', 'B/T/F = declaraciones button/table/form. Los importadores son referencias estáticas directas encontradas en src, no garantía de que una rama condicional se ejecute.', tabla(['Archivo', 'Exportaciones con nombre detectado', 'B/T/F', 'Importadores directos'], comp.map(([f, d]) => {
  const usados = [...datos].filter(([origen, x]) => x.imports.some((i) => i.startsWith('.') && path.resolve(raiz, path.dirname(origen), i) === path.resolve(raiz, f))).map(([x]) => x)
  return [enlace(f), d.exports.join(', ') || 'ver archivo', ['button', 'table', 'form'].map((k) => d.etiquetas[k] || 0).join('/'), usados.join(', ') || 'ninguno detectado']
})), '')
partes.push('## Tablas nativas (todo src)', tabla(['Archivo', 'Clase'], [...datos].flatMap(([f, d]) => d.tablas.map((t) => [enlace(f, t.linea), t.clase]))), '')
partes.push('## Formularios nativos (todo src)', 'No incluye grupos de controles guardados mediante botones fuera de un form. El inventario de controles siguiente sí los incluye.', tabla(['Archivo', 'Clase', 'onSubmit'], [...datos].flatMap(([f, d]) => d.formas.map((t) => [enlace(f, t.linea), t.clase, t.envio]))), '')
partes.push('## Familias CSS por nombre', 'Clasificación léxica; incluye subelementos y modificadores. NO es un conteo de diseños distintos o duplicados accidentales.', tabla(['Clase', 'Primera regla'], [...clases].filter(([c]) => /btn|boton|tabla|table|card|tarjeta|aviso|alert|badge/.test(c)).sort(([a], [b]) => a.localeCompare(b)).map(([c, l]) => [c, enlace('src/index.css', l)])), '')
partes.push('## Controles por archivo', tabla(['Archivo', 'button', 'input', 'select', 'textarea', 'form', 'table'], [...datos].filter(([, d]) => d.controles.length).map(([f, d]) => [enlace(f), ...['button', 'input', 'select', 'textarea', 'form', 'table'].map((k) => d.etiquetas[k] || 0)])), '')
partes.push('## Imports directos del SDK fuera de lib/firebase', tabla(['Archivo', 'Import'], [...datos].filter(([f]) => !f.startsWith('src/lib/firebase/')).flatMap(([f, d]) => d.imports.filter((i) => i.startsWith('firebase/')).map((i) => [enlace(f), i]))), '')
fs.writeFileSync(path.join(raiz, 'docs/ux/FASE-0-INVENTARIO.md'), partes.filter(Boolean).join('\n\n') + '\n')
console.log(JSON.stringify({ declaracionesRoute: rutas.length, archivosComponentes: comp.length, controlesSrc: totales([...datos]), declaracionesCss: declaraciones, salida: 'docs/ux/FASE-0-INVENTARIO.md' }))
