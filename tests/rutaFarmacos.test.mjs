import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  nivelDeFarmaco, etapasDeRuta, sumarErrores, erroresOrdenados, HABILIDAD_PARA_ERROR, NOMBRE_ERROR,
  tarjetasParaRepaso, temaDeFarmaco, esClaveDeFarmaco, partirPorFarmacos,
} from '../src/lib/rutaFarmacos.js'
import { claveTarjeta, triageDeHoy } from '../src/lib/pulsoModelo.js'
import { FARMACOS } from '../src/data/farmacos/catalogo.js'
import { tarjetasDe } from '../src/lib/farmacosModelo.js'
import { HABILIDADES } from '../src/lib/ejerciciosCalculo.js'

const leer = (ruta) => readFileSync(new URL(`../${ruta}`, import.meta.url), 'utf8')

// ---------- Entrega 1: ruta y dominio ----------

test('el nivel de un fármaco exige cada paso anterior y respeta si tiene casos', () => {
  const f = { id: 'x' }
  const tarjeta = { [claveTarjeta(temaDeFarmaco('x'), 'frente')]: { intervalo: 3 } }
  assert.deepEqual(nivelDeFarmaco(f, {}), { nivel: 0, maximo: 2 })
  assert.equal(nivelDeFarmaco(f, { srs: tarjeta }).nivel, 1)
  assert.equal(nivelDeFarmaco(f, { dominio: { 'clas:x': { racha: 1 } } }).nivel, 0, 'sin conocerlo no se salta a clasificar')
  assert.equal(nivelDeFarmaco(f, { srs: tarjeta, dominio: { 'clas:x': { racha: 1 } } }).nivel, 2)
  const todo = { srs: tarjeta, dominio: { 'clas:x': { racha: 1 }, 'caso:x:d1': { dominada: true } }, conCasos: true }
  assert.deepEqual(nivelDeFarmaco(f, todo), { nivel: 3, maximo: 3 })
  assert.equal(nivelDeFarmaco(f, { srs: { [claveTarjeta(temaDeFarmaco('x'), 'f')]: { intervalo: 0 } } }).nivel, 0, '«otra vez» no cuenta como conocerlo')
})

test('la ruta cuenta cada etapa y señala la primera sin terminar', () => {
  const farmacos = [{ id: 'a' }, { id: 'b' }]
  const niveles = new Map([['a', { nivel: 2 }], ['b', { nivel: 1 }]])
  const r = etapasDeRuta({ farmacos, niveles, dominio: { 'calc:h1': { dominada: true } }, habilidades: [{ id: 'h1' }, { id: 'h2' }], casos: [] })
  assert.deepEqual(r.etapas.map((e) => [e.id, e.hechos, e.total]), [['conocer', 2, 2], ['clasificar', 1, 2], ['calcular', 1, 2], ['aplicar', 0, 0]])
  assert.equal(r.actual, 1, 'conocer está completa: toca clasificar')
  assert.deepEqual(r.etapas.map((e) => e.modo), ['tarjetas', 'relampago', 'calcular', 'casos'])
})

test('el entrenador abre en la ruta y conserva los ocho modos agrupados', () => {
  const src = leer('src/pages/FarmacosPage.jsx')
  assert.match(src, /\? params\.get\('modo'\) : 'ruta'/)
  for (const m of ['catalogo', 'tarjetas', 'fundamentos', 'relampago', 'preguntas', 'marco', 'calcular', 'casos']) {
    assert.match(src, new RegExp(`'${m}'`), `falta el modo ${m}`)
  }
  assert.match(src, /registrarIntento\(`clas:\$\{f\.id\}`, correcto\)/, 'el relámpago debe dejar rastro por fármaco')
})

// ---------- Entrega 2: repaso y lectura ----------

test('las tarjetas de fármacos entran al repaso con clave propia que no choca con lecciones', () => {
  const t = tarjetasParaRepaso(tarjetasDe(FARMACOS), FARMACOS)
  assert.equal(t.length, FARMACOS.length * 2)
  assert.ok(t.every((c) => esClaveDeFarmaco(c.clave) && c.enlace.startsWith('/farmacos/')))
  assert.equal(new Set(t.map((c) => c.clave)).size, t.length, 'claves únicas')
})

test('el triage cuenta las tarjetas de fármacos solo si se admiten', () => {
  const srs = { [claveTarjeta(temaDeFarmaco('oxigeno'), 'x')]: { vence: 0 } }
  assert.equal(triageDeHoy({ modulos: [], srs, ahora: 1 }).reforzar.vencidas, 0)
  assert.equal(triageDeHoy({ modulos: [], srs, ahora: 1, claveExtra: esClaveDeFarmaco }).reforzar.vencidas, 1)
})

test('el marcado encuentra cada fármaco en su lección real y no inventa marcas', async () => {
  const oxigeno = FARMACOS.find((f) => f.id === 'oxigeno')
  const temaId = oxigeno.temasRelacionados[0]
  const { todosLosTemas } = await import('../src/data/index.js')
  const tema = todosLosTemas.find((t) => t.id === temaId)
  assert.ok(tema, `no se encontró la lección ${temaId}`)
  // El texto que TextoGlosario recorre: párrafos, avisos y elementos de listas.
  const texto = tema.secciones.flatMap((s) => s.bloques.flatMap((b) => [b.texto || '', ...(b.items || []).filter((x) => typeof x === 'string')])).join(' ')
  const marcas = partirPorFarmacos(texto, [oxigeno]).filter((s) => s.farmaco)
  assert.ok(marcas.length > 0, 'la lección nombra el oxígeno y no se marcó')
  assert.equal(partirPorFarmacos(texto, [oxigeno]).map((s) => s.texto).join(''), texto, 'el texto se reconstruye idéntico')
  assert.deepEqual(partirPorFarmacos('Sin fármacos aquí.', [oxigeno]), [{ texto: 'Sin fármacos aquí.' }])
})

test('la lección marca fármacos solo con el plan y solo los ligados a ella', () => {
  const src = leer('src/components/pulso/FarmacosEnTexto.jsx')
  assert.match(src, /esSuperadmin \|\| Boolean\(capacidades\?\.entrenadorFarmacologia\)/)
  assert.match(src, /indiceInverso\(cat\.FARMACOS\)\[temaId\]/)
  assert.match(leer('src/pages/TemaPage.jsx'), /<ProveedorFarmacosEnLeccion temaId=\{temaId\}>/)
})

// ---------- Entrega 3: errores ----------

test('los errores se suman por tipo y cada tipo lleva a una habilidad que existe', () => {
  const ids = new Set(HABILIDADES.map((h) => h.id))
  for (const h of Object.values(HABILIDAD_PARA_ERROR)) assert.ok(ids.has(h), `la habilidad «${h}» no existe`)
  const e = sumarErrores({ unidades: 2 }, [{ errores: ['unidades'] }, { errores: ['tiempo', 'otro'] }, { errores: [] }])
  assert.deepEqual(e, { unidades: 3, tiempo: 1 }, '«otro» no dice qué practicar y no se cuenta')
  const orden = erroresOrdenados(e)
  assert.equal(orden[0].tipo, 'unidades')
  assert.equal(orden[0].habilidad, 'conversiones')
  assert.equal(orden[0].nombre, NOMBRE_ERROR.unidades)
})

test('casos y cálculo guardan los errores; la ruta abre la habilidad sugerida', () => {
  assert.match(leer('src/components/farmacos/CasosClinicos.jsx'), /guardarErrores\(sumarErrores\(leerErrores\(\), rs\)\)/)
  assert.match(leer('src/components/farmacos/AprenderCalculo.jsx'), /guardarErrores\(sumarErrores\(leerErrores\(\), resultados\)\)/)
  assert.match(leer('src/pages/FarmacosPage.jsx'), /habilidadInicial=\{params\.get\('habilidad'\)\}/)
})

// ---------- Entrega 4: práctica ----------

test('las opciones falsas salen primero de la misma sección del catálogo', async () => {
  const { preguntasDe } = await import('../src/lib/farmacosModelo.js')
  const ps = preguntasDe(FARMACOS, { semilla: 'cercanos' }).filter((p) => p.id.endsWith('-grupo'))
  let cercanas = 0
  let posibles = 0
  for (const p of ps) {
    const f = FARMACOS.find((x) => x.id === p.farmacoId)
    const vecinos = new Set(FARMACOS.filter((x) => x.id !== f.id && x.seccion === f.seccion && x.grupo !== f.grupo).map((x) => x.grupo))
    const esperadas = Math.min(3, vecinos.size)
    posibles += esperadas
    cercanas += p.opciones.slice(1).filter((o) => vecinos.has(o)).length
    assert.ok(p.opciones.slice(1).filter((o) => vecinos.has(o)).length >= esperadas, `${p.id}: no aprovechó a sus vecinos de sección`)
  }
  assert.ok(posibles > 0 && cercanas >= posibles)
})

test('relámpago: la unidad mínima sigue la dotación acumulativa y el grupo trae 4 opciones únicas', async () => {
  const { preguntaRelampago, unidadMinima, SIN_UNIDAD } = await import('../src/lib/farmacosModelo.js')
  const { UNIDADES_NOM } = await import('../src/data/farmacos/catalogo.js')
  const porApendice = { A: 'Traslado', B: 'Urgencias básicas', C: 'Urgencias avanzadas', D: 'Cuidados intensivos' }
  for (const f of FARMACOS) {
    assert.equal(unidadMinima(f, UNIDADES_NOM), f.apendice ? porApendice[f.apendice] : SIN_UNIDAD, f.id)
    const g = preguntaRelampago(f, 'grupo', { unidades: UNIDADES_NOM, catalogo: FARMACOS, semilla: f.id })
    assert.equal(new Set(g.opciones).size, 4, `${f.id}: opciones repetidas`)
    assert.ok(g.opciones.includes(f.grupo))
    const u = preguntaRelampago(f, 'unidad', { unidades: UNIDADES_NOM })
    assert.ok(u.opciones.includes(u.correcta))
  }
  const src = leer('src/pages/FarmacosPage.jsx')
  assert.match(src, /if \(variante !== 'grupo'\) registrarIntento\(`clas:\$\{f\.id\}`, correcto\)/, 'el grupo no es clasificación NOM')
})

test('el comparador usa solo campos del catálogo y marca las diferencias', async () => {
  const { filasComparador } = await import('../src/lib/farmacosModelo.js')
  const { UNIDADES_NOM } = await import('../src/data/farmacos/catalogo.js')
  const a = FARMACOS.find((f) => f.id === 'adrenalina')
  const filas = filasComparador(a, a, UNIDADES_NOM)
  assert.ok(filas.every((f) => !f.difiere), 'un fármaco consigo mismo no difiere')
  const b = FARMACOS.find((f) => f.id === 'propofol')
  const otra = filasComparador(a, b, UNIDADES_NOM)
  assert.ok(otra.find((f) => f.campo === 'Origen').difiere)
  assert.ok(!otra.some((f) => /dosis \d|mg\/kg/i.test(`${f.a} ${f.b}`)), 'el comparador no muestra dosis')
  assert.match(leer('src/pages/FarmacosPage.jsx'), /\{modo === 'comparar' && <Comparador \/>\}/)
})

test('el cálculo trae teclado numérico propio en pantallas táctiles', () => {
  const src = leer('src/components/farmacos/EjercicioGuiado.jsx')
  assert.match(src, /\(pointer: coarse\)/)
  assert.match(src, /inputMode=\{tactil \? 'none' : 'decimal'\}/, 'con teclado propio no debe abrirse el del sistema')
  assert.match(src, /\{tactil && !visto && <TecladoNumerico/)
})

// ---------- Vista del profesor ----------

test('el resumen del grupo cuenta patrones, ignora alumnos de fuera y sugiere el más repetido', async () => {
  const { resumenErroresGrupo } = await import('../src/lib/rutaFarmacos.js')
  const alumnos = [{ id: 'a', nombre: 'Ana' }, { id: 'b', nombre: 'Beto' }, { id: 'c', nombre: 'Cris' }]
  const docs = [
    { uid: 'a', errores: { tiempo: 3, unidades: 1 } },
    { uid: 'b', errores: { tiempo: 2 } },
    { uid: 'z', errores: { tiempo: 9 } }, // de otro grupo: no cuenta
  ]
  const r = resumenErroresGrupo(docs, alumnos)
  assert.equal(r.conDatos, 2)
  assert.equal(r.total, 3)
  assert.equal(r.porTipo[0].tipo, 'tiempo')
  assert.equal(r.porTipo[0].alumnos, 2)
  assert.deepEqual(r.porTipo[0].quienes.map((q) => q.nombre), ['Ana', 'Beto'])
  const unidades = r.porTipo.find((t) => t.tipo === 'unidades')
  assert.equal(unidades.alumnos, 0, 'un error suelto no es un patrón')
  assert.equal(r.sugerencia.tipo, 'tiempo')
  assert.equal(resumenErroresGrupo([], alumnos).sugerencia, null)
})

test('el alumno sube solo cuentas por tipo y el profesor las ve en su panel', () => {
  const firebase = leer('src/lib/firebase/erroresCalculo.js')
  assert.match(firebase, /uid, academiaId, grupoId: grupoId \|\| null, errores: limpiar\(errores\), actualizado: serverTimestamp\(\)/)
  const hook = leer('src/components/farmacos/useSincronizarErrores.js')
  assert.match(hook, /rol !== 'alumno'/, 'solo los alumnos suben errores')
  assert.match(hook, /registrar\('erroresCalculo:subir'/, 'un rechazo de la regla no rompe la pantalla')
  assert.match(leer('src/pages/panel/Resumen.jsx'), /<ErroresDelGrupo academiaId=\{academiaId\}/)
  const reglas = leer('firestore.rules')
  assert.match(reglas, /match \/erroresCalculo\/\{uid\}/)
  // El progreso no se tocó: sigue con su lista cerrada de campos.
  assert.match(reglas, /hasOnly\(\s*\['leidos', 'quizzes', 'examenes', 'actividad', 'racha', 'updatedAt'\]\)/)
})
