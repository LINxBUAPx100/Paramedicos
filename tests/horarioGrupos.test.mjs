// ============================================================
//  Horario de los grupos
// ------------------------------------------------------------
//  Pedido el 2 de septiembre de 2026: las academias no dan clase de lunes a
//  viernes a la misma hora. Unos grupos son de miércoles, otros de sábado y
//  domingo, hay turno de mañana y de tarde, y un maestro no da clase a dos
//  grupos a la vez.
//
//  Lo que estas pruebas fijan, por orden de importancia:
//
//   1. Que el estado «en clase ahora» se calcule bien, porque es lo único que
//      hace útil la pantalla de selección: quien entra un sábado por la mañana
//      tiene que encontrar arriba el grupo al que le está dando clase.
//   2. Que un PROFESOR no vea grupos que no lleva ni grupos desactivados, y que
//      un director sí vea los inactivos pero SEPARADOS.
//   3. Que un grupo sin horario no rompa nada. Es el estado normal de un grupo
//      recién creado, y la pantalla tiene que poder decirlo en vez de fallar.
//
//  La fecha se pasa siempre como argumento, nunca se lee el reloj: es lo que
//  permite probar un sábado a las nueve sin esperar al sábado.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  DIAS, minutosDeHora, horaDeMinutos, normalizarHorario, turnoDe, resumenDeHorario,
  estadoDeClase, enClaseAhora, ordenarPorClase, agruparPorGeneracion, etiquetaDeGeneracion,
  gruposParaElegir, choquesDeHorario, problemasDeHorario, fechaISO, esActivo,
} from '../src/lib/horarioGrupos.js'

// Un miércoles (2026-09-02) y un sábado (2026-09-05), a la hora que se indique.
const miercoles = (hhmm) => new Date(`2026-09-02T${hhmm}:00`)
const sabado = (hhmm) => new Date(`2026-09-05T${hhmm}:00`)

const grupo = (extra = {}) => ({
  id: 'GRP-1', nombre: 'Grupo', estado: 'activo', ...extra,
})
const conHorario = (dias, inicio, fin, extra = {}) =>
  grupo({ horario: { dias, inicio, fin }, ...extra })

// ---------- horas ----------

test('las horas se leen y se escriben sin inventarse nada', () => {
  assert.equal(minutosDeHora('08:30'), 510)
  assert.equal(minutosDeHora('8:05'), 485)
  assert.equal(horaDeMinutos(510), '08:30')
  // Lo que no es una hora vale null, no cero: cero sería medianoche.
  for (const malo of ['', null, '25:00', '08:70', 'ocho', '0830']) {
    assert.equal(minutosDeHora(malo), null, `«${malo}» no es una hora`)
  }
})

test('el turno se DERIVA de la hora, no se guarda aparte', () => {
  assert.equal(turnoDe({ inicio: '08:00' }), 'matutino')
  assert.equal(turnoDe({ inicio: '11:59' }), 'matutino')
  assert.equal(turnoDe({ inicio: '12:00' }), 'vespertino')
  assert.equal(turnoDe({ inicio: '16:30' }), 'vespertino')
  assert.equal(turnoDe({ inicio: '' }), null)
})

// ---------- normalización ----------

test('un grupo sin horario no es un error, es un grupo sin horario', () => {
  const h = normalizarHorario(grupo())
  assert.deepEqual(h.dias, [])
  assert.equal(h.completo, false)
  assert.equal(resumenDeHorario(grupo()), 'Sin horario configurado')
  // Y no lanza al preguntarle por su estado.
  assert.equal(estadoDeClase(grupo(), miercoles('10:00')).estado, 'sin-horario')
})

test('los días se ordenan por la semana, no por el orden en que se pulsaron', () => {
  const h = normalizarHorario(conHorario(['domingo', 'miercoles', 'sabado'], '08:00', '14:00'))
  assert.deepEqual(h.dias, ['miercoles', 'sabado', 'domingo'])
})

test('los días repetidos o inventados se descartan', () => {
  const h = normalizarHorario(conHorario(['lunes', 'lunes', 'lunacion', 'MARTES'], '08:00', '14:00'))
  assert.deepEqual(h.dias, ['lunes', 'martes'])
})

// ---------- en clase ahora ----------

test('un grupo de miércoles por la mañana está EN CLASE un miércoles a las diez', () => {
  const g = conHorario(['miercoles'], '08:00', '14:00')
  assert.equal(enClaseAhora(g, miercoles('10:00')), true)
  const e = estadoDeClase(g, miercoles('10:00'))
  assert.equal(e.estado, 'en-clase')
  assert.match(e.etiqueta, /hasta las 14:00/)
})

test('el mismo grupo, antes y después de su hora', () => {
  const g = conHorario(['miercoles'], '08:00', '14:00')
  assert.equal(estadoDeClase(g, miercoles('07:00')).estado, 'hoy-antes')
  assert.equal(estadoDeClase(g, miercoles('15:00')).estado, 'hoy-despues')
  assert.equal(estadoDeClase(g, sabado('10:00')).estado, 'otro-dia')
})

test('el grupo de fin de semana no aparece en clase entre semana', () => {
  const g = conHorario(['sabado', 'domingo'], '09:00', '15:00')
  assert.equal(enClaseAhora(g, miercoles('10:00')), false)
  assert.equal(enClaseAhora(g, sabado('10:00')), true)
})

test('un grupo que aún no ha empezado NO está en clase, aunque hoy sea su día', () => {
  // El caso que se cuela si solo se mira el día de la semana: un grupo creado
  // con su horario puesto y que empieza el mes que viene.
  const g = grupo({ horario: { dias: ['miercoles'], inicio: '08:00', fin: '14:00', fechaInicio: '2026-10-07' } })
  const e = estadoDeClase(g, miercoles('10:00'))
  assert.equal(e.estado, 'no-empieza-aun')
  assert.match(e.etiqueta, /2026-10-07/)
})

test('la fecha ISO es la LOCAL, no la de Greenwich', () => {
  // toISOString() pasa a UTC y en México adelanta el día a partir de las 18:00:
  // un grupo que empieza mañana aparecería como empezado esta tarde.
  assert.equal(fechaISO(new Date('2026-09-02T23:30:00')), '2026-09-02')
  assert.equal(fechaISO(new Date('2026-09-02T00:10:00')), '2026-09-02')
})

test('el orden pone delante lo que tiene clase ahora', () => {
  const enClase = conHorario(['miercoles'], '08:00', '14:00', { id: 'A', nombre: 'A' })
  const luego = conHorario(['miercoles'], '16:00', '20:00', { id: 'B', nombre: 'B' })
  const otroDia = conHorario(['sabado'], '09:00', '15:00', { id: 'C', nombre: 'C' })
  const sinHorario = grupo({ id: 'D', nombre: 'D' })
  const orden = ordenarPorClase([sinHorario, otroDia, luego, enClase], miercoles('10:00'))
  assert.deepEqual(orden.map((g) => g.id), ['A', 'B', 'C', 'D'])
})

// ---------- generaciones ----------

test('las generaciones se ordenan de la más reciente a la más antigua', () => {
  const grupos = [
    grupo({ id: 'v', generacion: { numero: 1, anio: 2024 } }),
    grupo({ id: 'n', generacion: { numero: 3, anio: 2026 } }),
    grupo({ id: 'm', generacion: { numero: 2, anio: 2025 } }),
  ]
  assert.deepEqual(agruparPorGeneracion(grupos).map((x) => x.grupos[0].id), ['n', 'm', 'v'])
})

test('«sin generación» va al final, no en su sitio alfabético', () => {
  // Si se enterrara entre las demás, nadie completaría nunca el dato.
  const grupos = [
    grupo({ id: 'sin' }),
    grupo({ id: 'con', generacion: { numero: 1, anio: 2020 } }),
  ]
  const bloques = agruparPorGeneracion(grupos)
  assert.equal(bloques[bloques.length - 1].etiqueta, 'Sin generación')
  assert.equal(bloques[bloques.length - 1].grupos[0].id, 'sin')
})

test('la etiqueta de generación aguanta que falte un dato', () => {
  assert.equal(etiquetaDeGeneracion({ numero: 3, anio: 2026 }), 'Generación 3 · 2026')
  assert.equal(etiquetaDeGeneracion({ anio: 2026 }), 'Generación 2026')
  assert.equal(etiquetaDeGeneracion({ numero: 3 }), 'Generación 3')
  assert.equal(etiquetaDeGeneracion(null), 'Sin generación')
})

// ---------- qué ve cada rol ----------

const PLANTEL = [
  grupo({ id: 'A', nombre: 'A', profesorTitular: 'prof-1', generacion: { numero: 2, anio: 2026 } }),
  grupo({ id: 'B', nombre: 'B', profesorTitular: 'prof-2', generacion: { numero: 2, anio: 2026 } }),
  grupo({ id: 'C', nombre: 'C', profesorTitular: 'prof-1', estado: 'inactivo', generacion: { numero: 1, anio: 2025 } }),
]

test('UN PROFESOR SOLO VE SUS GRUPOS ACTIVOS', () => {
  const r = gruposParaElegir({ grupos: PLANTEL, rol: 'instructor', uid: 'prof-1' })
  const ids = r.activos.flatMap((x) => x.grupos.map((g) => g.id))
  assert.deepEqual(ids, ['A'])
  // Ni el de su compañero, ni el suyo desactivado.
  assert.equal(r.inactivos.length, 0)
  assert.equal(r.verInactivos, false)
})

test('el director ve TODOS, pero los inactivos aparte', () => {
  const r = gruposParaElegir({ grupos: PLANTEL, rol: 'admin_escuela', uid: 'dir' })
  assert.deepEqual(r.activos.flatMap((x) => x.grupos.map((g) => g.id)), ['A', 'B'])
  assert.deepEqual(r.inactivos.flatMap((x) => x.grupos.map((g) => g.id)), ['C'])
  assert.equal(r.verInactivos, true)
})

test('el super-admin ve lo mismo que el director', () => {
  const r = gruposParaElegir({ grupos: PLANTEL, rol: 'alumno', uid: 'x', esSuperadmin: true })
  assert.equal(r.total, 3)
  assert.equal(r.verInactivos, true)
})

test('todos los roles reciben los grupos separados por generación', () => {
  const r = gruposParaElegir({ grupos: PLANTEL, rol: 'admin_escuela', uid: 'dir' })
  assert.equal(r.activos[0].etiqueta, 'Generación 2 · 2026')
  assert.equal(r.inactivos[0].etiqueta, 'Generación 1 · 2025')
})

// ---------- choques ----------

test('un maestro con dos grupos a la misma hora produce un choque', () => {
  const grupos = [
    conHorario(['sabado'], '09:00', '13:00', { id: 'A', profesorTitular: 'p1' }),
    conHorario(['sabado'], '11:00', '15:00', { id: 'B', profesorTitular: 'p1' }),
  ]
  const ch = choquesDeHorario(grupos)
  assert.equal(ch.length, 1)
  assert.deepEqual(ch[0].dias, ['sabado'])
  assert.deepEqual(ch[0].grupos.map((g) => g.id), ['A', 'B'])
})

test('dos turnos seguidos NO son un choque', () => {
  // Uno termina justo cuando el otro empieza: pasa constantemente y marcarlo
  // como error haría que se ignorasen los avisos de verdad.
  const grupos = [
    conHorario(['sabado'], '08:00', '12:00', { id: 'A', profesorTitular: 'p1' }),
    conHorario(['sabado'], '12:00', '16:00', { id: 'B', profesorTitular: 'p1' }),
  ]
  assert.deepEqual(choquesDeHorario(grupos), [])
})

test('no hay choque si son días distintos, profesores distintos o el grupo está inactivo', () => {
  const base = { inicio: '09:00', fin: '13:00' }
  assert.deepEqual(choquesDeHorario([
    grupo({ id: 'A', profesorTitular: 'p1', horario: { ...base, dias: ['sabado'] } }),
    grupo({ id: 'B', profesorTitular: 'p1', horario: { ...base, dias: ['domingo'] } }),
  ]), [])
  assert.deepEqual(choquesDeHorario([
    grupo({ id: 'A', profesorTitular: 'p1', horario: { ...base, dias: ['sabado'] } }),
    grupo({ id: 'B', profesorTitular: 'p2', horario: { ...base, dias: ['sabado'] } }),
  ]), [])
  assert.deepEqual(choquesDeHorario([
    grupo({ id: 'A', profesorTitular: 'p1', horario: { ...base, dias: ['sabado'] } }),
    grupo({ id: 'B', profesorTitular: 'p1', estado: 'inactivo', horario: { ...base, dias: ['sabado'] } }),
  ]), [])
})

// ---------- validación ----------

test('un horario vacío se puede guardar: el grupo existe antes que su horario', () => {
  // Obligar a rellenarlo para crear el grupo pondría fechas inventadas en la
  // base de datos, que es peor que un campo vacío.
  assert.deepEqual(problemasDeHorario({}), [])
  assert.deepEqual(problemasDeHorario({ dias: [], inicio: '', fin: '' }), [])
})

test('los errores del horario se dicen en palabras que se puedan enseñar', () => {
  assert.match(problemasDeHorario({ inicio: '14:00', fin: '09:00', dias: ['sabado'] })[0], /terminar antes de empezar/)
  assert.match(problemasDeHorario({ inicio: '08:00', fin: '14:00', dias: [] })[0], /al menos un día/)
  assert.match(problemasDeHorario({ dias: ['sabado'] })[0], /hora de inicio y la de fin/)
  assert.match(problemasDeHorario({ fechaInicio: '07/10/2026' })[0], /AAAA-MM-DD/)
})

test('un horario completo y coherente no tiene problemas', () => {
  assert.deepEqual(problemasDeHorario({
    inicio: '08:00', fin: '14:00', dias: ['sabado', 'domingo'], fechaInicio: '2026-10-07',
  }), [])
})

// ---------- cordura ----------

test('los siete días están y su índice coincide con el de Date', () => {
  assert.equal(DIAS.length, 7)
  assert.equal(DIAS.find((d) => d.id === 'domingo').indice, new Date('2026-09-06T12:00:00').getDay())
  assert.equal(DIAS.find((d) => d.id === 'miercoles').indice, miercoles('12:00').getDay())
  assert.equal(esActivo(grupo()), true)
  assert.equal(esActivo(grupo({ estado: 'inactivo' })), false)
})

test('UN GRUPO DESACTIVADO NUNCA ESTÁ EN CLASE, aunque su horario cuadre', () => {
  // Encontrado pintando las tarjetas: un grupo dado de baja de la generación
  // pasada salía con el distintivo «En clase ahora» porque su horario seguía
  // cuadrando con el sábado. El horario dice cuándo SE DABA esa clase; el
  // estado dice si se sigue dando.
  const g = conHorario(['sabado'], '08:00', '14:00', { estado: 'inactivo' })
  assert.equal(enClaseAhora(g, sabado('10:00')), false)
  assert.equal(estadoDeClase(g, sabado('10:00')).estado, 'inactivo')
  // Y su horario se sigue pudiendo consultar: es lo que fue, no un dato roto.
  assert.match(estadoDeClase(g, sabado('10:00')).etiqueta, /Sábado · 08:00-14:00/)
})
