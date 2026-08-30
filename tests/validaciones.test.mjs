// ============================================================
//  Validaciones docentes — que «Validar» valide de verdad
// ------------------------------------------------------------
//  EL FALLO QUE ESTAS PRUEBAS CIERRAN
//
//  El botón «Validar» firmaba un dictamen, lo guardaba, y ahí se acababa todo.
//  Nadie escribía nunca el estado editorial del tema, así que el alumno seguía
//  viendo «Contenido en revisión» sobre material ya revisado y el banco de
//  examen seguía vacío para siempre. Peor: aunque alguien hubiera escrito el
//  estado en Firestore, `temaDesdeDoc` NO leía `estadoEditorial` ni `revision`,
//  de modo que la lección volvía de la base de datos como borrador otra vez.
//
//  Lo que se protege aquí:
//   1. una firma se aplica sobre la lección y la deja avalada;
//   2. la ficha resultante sigue pasando `validarRevision` (nada asciende sin
//      responsable, fecha y traza);
//   3. una lección avalada entra en el banco de examen y pierde el aviso;
//   4. un documento de validaciones manipulado no cuela un estado inventado;
//   5. el estado editorial SOBREVIVE al viaje a Firestore y de vuelta.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  DOC_PLATAFORMA, docValidacionesDe, trazaDeFirma, normalizarValidacion,
  normalizarLeido, mapaDeValidaciones, fichaConValidacion, aplicarValidacion,
  aplicarValidaciones, apiConValidaciones, sePuedeValidar, combinarValidaciones,
} from '../src/lib/validacionesModelo.js'
import {
  estadoEditorialDe, estadoEditorialDeFicha, estaAvalado, avisoEditorial, validarRevision,
} from '../src/lib/estadoEditorial.js'
import { bancoDeExamen, temasElegibles } from '../src/lib/bancoExamen.js'
import { contenidoTema, docsClonadosParaAcademia } from '../src/lib/contenidoModelo.js'
import { temaDesdeDoc } from '../src/lib/contenidoApi.js'

const HOY = '2026-08-30'

const TEMA = {
  id: 'm5-cin-definicion',
  titulo: 'Cinemática del trauma',
  estadoEditorial: 'en_revision',
  revision: {
    estado: 'en_revision',
    procedencia: 'redactado',
    actualizado: '2026-08-20',
    observaciones: ['Capítulo y página PENDIENTES.'],
    fuentes: ['NAEMT. PHTLS, 9.ª ed., 2020.'],
  },
  secciones: [{ titulo: 'Definición', bloques: [{ tipo: 'p', texto: 'Texto.' }] }],
  quiz: [{ pregunta: '¿Qué es?', opciones: ['a', 'b'], correcta: 0, explicacion: 'Porque sí.' }],
}

const FIRMA = normalizarValidacion({
  revisadoPor: 'Dra. Ana Ruiz, coordinadora académica',
  comentario: 'Revisado contra el protocolo del servicio.',
  fecha: HOY,
  uid: 'u-profe',
})

// ---------- 1 y 2. la firma se aplica y la ficha sigue siendo válida ----------

test('una firma deja la lección avalada', () => {
  assert.equal(estadoEditorialDe(TEMA), 'en_revision', 'punto de partida')
  const validado = aplicarValidacion(TEMA, { [TEMA.id]: FIRMA })
  assert.equal(estadoEditorialDe(validado), 'validado')
  assert.equal(estaAvalado(estadoEditorialDe(validado)), true)
  assert.equal(avisoEditorial(estadoEditorialDe(validado)), null, 'sin aviso de revisión')
})

test('la ficha que produce una firma pasa validarRevision', () => {
  const ficha = fichaConValidacion(TEMA.revision, FIRMA)
  assert.equal(validarRevision(ficha), null)
  assert.equal(ficha.estado, 'validado')
  assert.equal(ficha.revisadoPor, FIRMA.revisadoPor)
  assert.equal(ficha.actualizado, HOY)
  assert.ok(ficha.fuentes.includes('NAEMT. PHTLS, 9.ª ed., 2020.'), 'no se pierden las previas')
  assert.deepEqual(ficha.observaciones, ['Capítulo y página PENDIENTES.'], 'las deudas siguen ahí')
})

test('sin fuentes citadas la traza de la firma ocupa su lugar', () => {
  assert.equal(FIRMA.fuentes.length, 1)
  assert.match(FIRMA.fuentes[0], /Revision docente de Dra\. Ana Ruiz/)
  assert.match(FIRMA.fuentes[0], new RegExp(HOY))
  assert.match(FIRMA.fuentes[0], /Observaciones: Revisado contra el protocolo/)
})

test('las fuentes que el docente sí escribe se conservan tal cual', () => {
  const v = normalizarValidacion({
    revisadoPor: 'Dr. B', fecha: HOY, fuentes: ['AHA 2025, algoritmo de bradicardia.', '  ', ''],
  })
  assert.deepEqual(v.fuentes, ['AHA 2025, algoritmo de bradicardia.'])
})

test('firmar sin responsable o sin fecha no es firmar', () => {
  assert.throws(() => normalizarValidacion({ revisadoPor: '', fecha: HOY }), /responsable/i)
  assert.throws(() => normalizarValidacion({ revisadoPor: 'Dra. X', fecha: 'ayer' }), /fecha/i)
  assert.throws(() => normalizarValidacion({ revisadoPor: 'Dra. X', fecha: HOY, estado: 'borrador' }), /no admitido/i)
})

test('una firma que produciría una ficha inválida no se aplica', () => {
  // Un tema bloqueado por la academia exige `pregunta` en su ficha; ascenderlo
  // sin ella daría una ficha que `validarRevision` rechaza, así que la capa se
  // aparta y el tema se queda como estaba.
  const bloqueado = { ...TEMA, revision: { ...TEMA.revision, pregunta: undefined } }
  const conFirmaRota = { ...FIRMA, revisadoPor: '' }
  assert.equal(aplicarValidacion(bloqueado, { [TEMA.id]: conFirmaRota }), bloqueado)
})

// ---------- 3. el examen se abre al validar ----------

test('el banco de examen se abre exactamente cuando el tema se valida', () => {
  assert.deepEqual(temasElegibles([TEMA]), [], 'en revisión no aporta reactivos')
  const validado = aplicarValidacion(TEMA, { [TEMA.id]: FIRMA })
  assert.equal(temasElegibles([validado]).length, 1)
  assert.equal(bancoDeExamen([validado]).length, 1)
})

// ---------- 4. nada de estados inventados ----------

test('un documento manipulado no cuela un estado en el temario', () => {
  assert.equal(normalizarLeido({ estado: 'publicado', revisadoPor: 'X', fecha: HOY }).estado, 'publicado')
  assert.equal(normalizarLeido({ estado: 'borrador', revisadoPor: 'X', fecha: HOY }), null)
  assert.equal(normalizarLeido({ estado: 'validado', revisadoPor: '', fecha: HOY }), null)
  assert.equal(normalizarLeido({ estado: 'validado', revisadoPor: 'X', fecha: '30/08/2026' }), null)
  assert.equal(normalizarLeido(null), null)
})

test('mapaDeValidaciones descarta las entradas que no se sostienen', () => {
  const mapa = mapaDeValidaciones({
    temas: {
      bueno: { estado: 'validado', revisadoPor: 'Dra. X', fecha: HOY },
      malo: { estado: 'validado', revisadoPor: 'Dra. X' },
      inventado: { estado: 'publicadisimo', revisadoPor: 'Dra. X', fecha: HOY },
    },
  })
  assert.deepEqual(Object.keys(mapa), ['bueno'])
  assert.deepEqual(mapaDeValidaciones(null), {})
  assert.deepEqual(mapaDeValidaciones({ temas: [] }), {})
})

test('el documento de la plataforma recoge lo que se firma fuera de una academia', () => {
  assert.equal(docValidacionesDe('rescate-cdmx'), 'rescate-cdmx')
  assert.equal(docValidacionesDe(null), DOC_PLATAFORMA)
})

test('no se valida lo que no tiene material que avalar', () => {
  assert.equal(sePuedeValidar('en_revision'), true)
  assert.equal(sePuedeValidar('borrador'), true)
  assert.equal(sePuedeValidar('vacio'), false)
  assert.equal(sePuedeValidar('bloqueado_por_decision'), false)
  assert.equal(sePuedeValidar(undefined), false)
})

// ---------- la capa sobre la API de contenido ----------

test('la API envuelta entrega las lecciones ya validadas', async () => {
  const base = {
    getTemaAsync: async (id) => (id === TEMA.id ? TEMA : null),
    fichasDeModuloAsync: async () => [{ id: TEMA.id, estadoEditorial: 'en_revision' }],
    todasLasFichasAsync: async () => [{ id: TEMA.id, estadoEditorial: 'en_revision' }],
  }
  const api = apiConValidaciones(base, { [TEMA.id]: FIRMA })
  assert.equal(estadoEditorialDe(await api.getTemaAsync(TEMA.id)), 'validado')
  const [ficha] = await api.fichasDeModuloAsync('m5')
  assert.equal(estadoEditorialDeFicha(ficha), 'validado')
  assert.equal(await api.getTemaAsync('no-existe'), null)
})

test('sin firmas, la API se devuelve intacta y no cuesta nada', () => {
  const base = { getTemaAsync: async () => null }
  assert.equal(apiConValidaciones(base, {}), base)
  assert.equal(apiConValidaciones(base, null), base)
  assert.equal(aplicarValidaciones([TEMA], {})[0], TEMA)
})

// ---------- 5. el estado sobrevive al viaje a Firestore ----------

test('el estado editorial sobrevive al viaje a Firestore y de vuelta', () => {
  // Este era el otro medio bug: aunque se escribiera el estado, la lectura lo
  // tiraba y la academia migrada veía TODO su temario como borrador.
  const doc = contenidoTema(TEMA)
  assert.equal(doc.estadoEditorial, 'en_revision')
  assert.deepEqual(doc.revision, TEMA.revision)
  const vuelta = temaDesdeDoc(doc)
  assert.equal(estadoEditorialDe(vuelta), 'en_revision')
  assert.deepEqual(vuelta.revision, TEMA.revision)
})

test('la clonación a una academia se lleva el estado editorial', () => {
  const { temas } = docsClonadosParaAcademia({
    academiaId: 'aca-1',
    plantillaId: 'plan-rescate',
    plantillaTemas: [contenidoTema(TEMA)],
  })
  assert.equal(temas.length, 1)
  assert.equal(temas[0].estadoEditorial, 'en_revision')
  assert.deepEqual(temas[0].revision, TEMA.revision)
  assert.equal(estadoEditorialDe(temaDesdeDoc(temas[0])), 'en_revision')
})

test('un nodo de evaluación no llega vacío a la academia migrada', () => {
  const examen = {
    id: 'm1-examen-aplicacion',
    titulo: 'Examen del módulo 1',
    estadoEditorial: 'en_revision',
    evaluacion: { tipo: 'examen', reactivos: 20 },
    alcanceExamen: { temas: ['m1-pab-introduccion'] },
  }
  const vuelta = temaDesdeDoc(contenidoTema(examen))
  assert.deepEqual(vuelta.evaluacion, examen.evaluacion)
  assert.deepEqual(vuelta.alcanceExamen, examen.alcanceExamen)
  assert.notEqual(estadoEditorialDe(vuelta), 'vacio')
})

// ---------- la ficha del índice de módulo ----------

test('estadoEditorialDeFicha lee el estado ya resuelto del agregado', () => {
  // Una ficha no lleva secciones ni quiz: `estadoEditorialDe` la daría por
  // vacía SIEMPRE, y el índice de módulo pintaba «Sin contenido» en las 287.
  const ficha = { id: 'x', estadoEditorial: 'en_revision' }
  assert.equal(estadoEditorialDe(ficha), 'vacio', 'por eso no vale la función general')
  assert.equal(estadoEditorialDeFicha(ficha), 'en_revision')
  assert.equal(estadoEditorialDeFicha({ id: 'x' }), 'vacio')
  assert.equal(estadoEditorialDeFicha({ id: 'x', estadoEditorial: 'inventado' }), 'vacio')
})

test('trazaDeFirma no se rompe con datos incompletos', () => {
  assert.match(trazaDeFirma({}), /docente sin identificar/)
  assert.match(trazaDeFirma({ revisadoPor: 'X' }), /fecha no registrada/)
  assert.doesNotMatch(trazaDeFirma({ revisadoPor: 'X', fecha: HOY }), /Observaciones/)
})

// ---------- la capa llega a TODAS las puertas por las que sale una lección ----------

test('el envoltorio cubre cada método de la API que devuelve lecciones o fichas', async () => {
  // Guarda estructural. Si mañana se añade otra puerta —`getTemaCompletoAsync`,
  // otra vista de fichas— y no se envuelve, esa pantalla enseñaría el estado
  // editorial SIN las firmas docentes y el aviso de «contenido en revisión»
  // reaparecería sobre material ya validado. Aquí falla la prueba, no el alumno.
  const { construirApiBajoDemanda } = await import('../src/lib/contenidoApi.js')
  const api = construirApiBajoDemanda({
    indice: { modulos: [{ id: 'm5', numero: 5, titulo: 'Trauma', temas: [{ id: TEMA.id, numero: '5.1', titulo: TEMA.titulo }] }] },
    cargarTema: async () => TEMA,
    cargarAgregado: async () => [],
  })
  const PUERTAS = ['getTemaAsync', 'fichasDeModuloAsync', 'todasLasFichasAsync']
  for (const p of PUERTAS) {
    assert.equal(typeof api[p], 'function', `la API ya no expone ${p}`)
  }
  const envuelta = apiConValidaciones(api, { [TEMA.id]: FIRMA })
  for (const p of PUERTAS) {
    assert.notEqual(envuelta[p], api[p], `${p} salió SIN envolver`)
  }
  // Y lo que no devuelve lecciones se pasa tal cual, sin coste.
  assert.equal(envuelta.getTemaVecinos, api.getTemaVecinos)
  assert.equal(envuelta.cursoId, api.cursoId)
})

test('firmar dos veces el mismo tema deja el mismo resultado', () => {
  const uno = aplicarValidacion(TEMA, { [TEMA.id]: FIRMA })
  const dos = aplicarValidacion(uno, { [TEMA.id]: FIRMA })
  assert.equal(estadoEditorialDe(dos), 'validado')
  assert.deepEqual(dos.revision.fuentes, uno.revision.fuentes, 'las fuentes no se duplican')
  assert.equal(dos.revision.revisadoPor, FIRMA.revisadoPor)
})

test('retirar la firma devuelve el tema a su estado propio y cierra el examen', () => {
  // Es lo que hace «Retirar validación»: la entrada desaparece del mapa.
  const validado = aplicarValidacion(TEMA, { [TEMA.id]: FIRMA })
  assert.equal(bancoDeExamen([validado]).length, 1)
  const retirado = aplicarValidacion(TEMA, {})
  assert.equal(estadoEditorialDe(retirado), 'en_revision')
  assert.deepEqual(bancoDeExamen([retirado]), [])
  assert.equal(retirado, TEMA, 'sin firma se devuelve el mismo objeto, sin copiar')
})

test('una firma de «publicado» también avala', () => {
  const publicado = normalizarValidacion({ estado: 'publicado', revisadoPor: 'Dir. Z', fecha: HOY })
  const tema = aplicarValidacion(TEMA, { [TEMA.id]: publicado })
  assert.equal(estadoEditorialDe(tema), 'publicado')
  assert.equal(estaAvalado(estadoEditorialDe(tema)), true)
})

test('la firma de un tema no toca a sus vecinos', () => {
  const otro = { ...TEMA, id: 'm5-cin-energia' }
  const [a, b] = aplicarValidaciones([TEMA, otro], { [TEMA.id]: FIRMA })
  assert.equal(estadoEditorialDe(a), 'validado')
  assert.equal(estadoEditorialDe(b), 'en_revision')
  assert.equal(b, otro)
})

// ---------- el semáforo: la promesa que ve quien coordina ----------

test('una firma deja el tema en verde «listo y aprobado»', async () => {
  const { semaforoDe, tituloSemaforo } = await import('../src/lib/estadoEditorial.js')
  const { estadosEditoriales } = await import('../src/data/navIndice.js')

  // Cómo lo resuelve el panel (VisibilidadGrupos): la firma manda sobre el
  // estado que trae el paquete, que se calculó al compilar y no puede saber
  // nada de lo que un docente firme después.
  const estadoDelSemaforo = (temaId, mapa) => mapa?.[temaId]?.estado || estadosEditoriales[temaId]

  const temaReal = 'm5-cin-definicion'
  assert.ok(estadosEditoriales[temaReal], 'el tema de la prueba existe en el índice generado')
  assert.notEqual(semaforoDe(estadoDelSemaforo(temaReal, {})), 'verde', 'sin firma no está en verde')

  const conFirma = estadoDelSemaforo(temaReal, { [temaReal]: FIRMA })
  assert.equal(conFirma, 'validado')
  assert.equal(semaforoDe(conFirma), 'verde')
  assert.match(tituloSemaforo(conFirma), /listo y aprobado/)
})

// ---------- la firma de la plataforma llega a todas las academias ----------

test('lo que firma el super-admin en la plataforma vale en cada academia', () => {
  // Antes no: la firma se guardaba en `_plataforma`, cada academia leía solo su
  // propio documento, y validar desde la consola no se notaba en ningún sitio.
  const dePlataforma = { 'm5-cin-definicion': FIRMA }
  assert.deepEqual(combinarValidaciones(dePlataforma, {}), dePlataforma)
  assert.deepEqual(combinarValidaciones(dePlataforma, null), dePlataforma)
  assert.deepEqual(combinarValidaciones(null, null), {})
})

test('la firma de la academia manda sobre la de la plataforma', () => {
  // Quien tiene el temario delante y conoce a sus alumnos es quien responde.
  const suya = normalizarValidacion({ revisadoPor: 'Dir. de la academia', fecha: HOY })
  const unido = combinarValidaciones({ [TEMA.id]: FIRMA }, { [TEMA.id]: suya })
  assert.equal(unido[TEMA.id].revisadoPor, 'Dir. de la academia')
})

test('las dos capas se suman cuando hablan de temas distintos', () => {
  const otra = normalizarValidacion({ revisadoPor: 'Dir. Z', fecha: HOY })
  const unido = combinarValidaciones({ a: FIRMA }, { b: otra })
  assert.deepEqual(Object.keys(unido).sort(), ['a', 'b'])
})
