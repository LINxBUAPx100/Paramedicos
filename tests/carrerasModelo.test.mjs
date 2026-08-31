// ============================================================
//  Pruebas del catálogo de carreras públicas
// ------------------------------------------------------------
//  Lo que se protege aquí no es la maquetación de la portada: es que la
//  vitrina no prometa un temario que no existe. PTEM anuncia seis carreras y
//  solo una tiene contenido; el día que alguien pegue texto de marketing
//  prometiendo módulos de Enfermería, estas pruebas lo paran.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  CARRERAS, ESTADOS_CARRERA, carreraPorSlug, esSlugDeCarrera, carrerasPublicas,
  carrerasAbiertas, carrerasEnPreparacion, estiloDeCarrera, rutaDeCarrera,
  contactoDeCarrera, problemasDelCatalogo, enlaceWhatsapp, CONTACTO_WHATSAPP,
} from '../src/lib/carrerasModelo.js'
import { META_PROGRAMA } from '../src/lib/programasModelo.js'

// ---------- integridad del catálogo ----------

test('el catálogo no tiene slugs repetidos, inválidos ni chocando con la app', () => {
  assert.deepEqual(problemasDelCatalogo(), [])
})

test('las seis carreras que la academia anuncia están todas', () => {
  assert.equal(CARRERAS.length, 6)
  assert.deepEqual(carrerasPublicas().map((c) => c.slug), [
    'paramedicos', 'enfermeria', 'tsu-paramedico',
    'licenciatura-paramedico', 'proteccion-civil', 'cursos',
  ])
})

test('cada carrera toma color e icono de META_PROGRAMA, sin inventarse identidad', () => {
  for (const c of CARRERAS) {
    const meta = META_PROGRAMA[c.tipo]
    assert.ok(meta, `la carrera ${c.slug} usa un tipo que no está en el catálogo`)
    assert.equal(estiloDeCarrera(c).color, meta.color)
    assert.equal(estiloDeCarrera(c).icono, meta.icono)
  }
})

// ---------- la regla que importa ----------

test('SOLO paramédicos está abierta: el resto no promete contenido', () => {
  assert.deepEqual(carrerasAbiertas().map((c) => c.slug), ['paramedicos'])
  assert.equal(carrerasEnPreparacion().length, 5)
})

// El texto de una carrera sin temario TIENE que decir que no lo hay. Es la
// versión comercial de la regla de CLAUDE.md que prohíbe inventar el alcance
// de un programa: una vitrina que calla equivale a una que promete.
test('toda carrera en preparación lo declara en su propio texto', () => {
  const declara = /en preparación|se está construyendo|todavía no está disponible|no hay fecha/i
  for (const c of carrerasEnPreparacion()) {
    const texto = `${c.resumen} ${c.puntos.join(' ')}`
    assert.match(texto, declara,
      `la carrera "${c.slug}" no dice en ninguna parte que su temario no está listo`)
  }
})

// Ninguna vitrina puede anunciar cifras del temario de paramédicos como si
// fueran suyas. Es el error más fácil de cometer al copiar la portada.
test('ninguna carrera en preparación anuncia módulos, horas ni número de temas', () => {
  const promesa = /\b\d+\s*(módulos?|temas?|horas?|semanas?|créditos?)\b/i
  for (const c of carrerasEnPreparacion()) {
    const texto = `${c.titular} ${c.resumen} ${c.queEs} ${c.puntos.join(' ')}`
    assert.doesNotMatch(texto, promesa,
      `la carrera "${c.slug}" promete una cifra curricular que nadie ha definido`)
  }
})

test('los estados posibles son solo dos y todas las carreras usan uno', () => {
  assert.deepEqual(ESTADOS_CARRERA, ['abierta', 'en_preparacion'])
  for (const c of CARRERAS) assert.ok(ESTADOS_CARRERA.includes(c.estado))
})

// ---------- consultas ----------

test('carreraPorSlug encuentra, ignora mayúsculas y no revienta con basura', () => {
  assert.equal(carreraPorSlug('paramedicos').tipo, 'tum')
  assert.equal(carreraPorSlug('PARAMEDICOS').tipo, 'tum')
  assert.equal(carreraPorSlug('no-existe'), null)
  assert.equal(carreraPorSlug(''), null)
  assert.equal(carreraPorSlug(null), null)
  assert.equal(carreraPorSlug(undefined), null)
  assert.equal(esSlugDeCarrera('cursos'), true)
  assert.equal(esSlugDeCarrera('admin'), false)
})

test('la ruta de una carrera cuelga de la raíz y es la que se comparte', () => {
  assert.equal(rutaDeCarrera(carreraPorSlug('proteccion-civil')), '/proteccion-civil')
  assert.equal(rutaDeCarrera(carreraPorSlug('paramedicos')), '/paramedicos')
})

test('el contacto va a la academia y trae escrito por qué carrera se pregunta', () => {
  const abierta = contactoDeCarrera(carreraPorSlug('paramedicos'))
  const preparando = contactoDeCarrera(carreraPorSlug('enfermeria'))
  assert.ok(abierta.startsWith(`https://wa.me/${CONTACTO_WHATSAPP}?text=`))
  assert.match(decodeURIComponent(abierta), /Técnico en Urgencias Médicas/)
  // Quien pregunta por una carrera sin temario pregunta CUÁNDO, no cómo entrar.
  assert.match(decodeURIComponent(preparando), /cuándo estará Enfermería/)
})

test('enlaceWhatsapp codifica el mensaje y no rompe con acentos ni signos', () => {
  const url = enlaceWhatsapp('¿Cuándo abre Protección Civil?')
  // El `?` del principio es el separador de la consulta; lo que no puede
  // llevar espacios ni signos sin codificar es el mensaje.
  const mensaje = url.split('?text=')[1]
  assert.doesNotMatch(mensaje, /[ ¿?]/)
  assert.match(decodeURIComponent(mensaje), /¿Cuándo abre Protección Civil\?/)
})
