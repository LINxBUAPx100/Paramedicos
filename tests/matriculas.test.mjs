// ============================================================
//  Matrículas — el formato por generación, y lo que impide romperlo
// ------------------------------------------------------------
//  LO QUE ESTA SUITE EXISTE PARA IMPEDIR, dicho antes que nada, porque las
//  tres cosas parecen mejoras:
//
//   1. «Si alguien teclea 15, complétalo con ceros hasta siete dígitos.» Con el
//      formato anterior era correcto —el número era correlativo—; con este
//      produce `0000015`, que es la matrícula de una generación 00 y un mes 00
//      que no existen. Un trozo se busca, no se rellena.
//   2. «Dale un contador a cada grupo.» Dos grupos distintos pueden compartir
//      generación, mes, día y turno, así que los dos empezarían en 01 y
//      emitirían matrículas idénticas. El contador cuelga de la SERIE.
//   3. «Al cambiar de grupo, déjale su matrícula.» Entonces su número afirma
//      que entró en un grupo en el que ya no está. Se rehace, y la anterior se
//      guarda porque los pagos son inmutables y la llevan dentro.
//
//  Módulo PURO: sin red y sin React.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  DIAS_DE_CLASE, RANGOS_TURNO, diaDeGrupo, esMatriculaConocida, esMatriculaHeredada,
  esMatriculaValida, explicarMatricula, formatearMatricula, formatearMatriculaHeredada,
  matriculaAlCambiarDeGrupo, mesDeGrupo, partirMatricula, partirMatriculaHeredada,
  perteneceASerie, prefijoDeAcademia, serieDeGrupo, siguienteOrden, turnoDeGrupo,
  turnoDeOrden,
} from '../src/lib/matriculas.js'

// Un grupo completo: generación 4, empieza el 09-11-2026, sábados, 08:00.
const GRUPO = {
  id: 'GRP-1',
  nombre: 'Sábado matutino',
  generacion: { numero: 4, anio: 2026 },
  horario: { inicio: '08:00', fin: '14:00', dias: ['sabado'], fechaInicio: '2026-11-09' },
}
const TARDE = { ...GRUPO, id: 'GRP-2', horario: { ...GRUPO.horario, inicio: '15:00', fin: '20:00' } }

// ── EL FORMATO ──────────────────────────────────────────────────────────────

test('la matrícula del ejemplo del dueño del producto sale exacta', () => {
  // 04 · 11 · 1 · 15 → 0411115. Es el caso que se pidió, literal.
  assert.equal(formatearMatricula('04111', 15), '0411115')
  const p = partirMatricula('0411115')
  assert.deepEqual(
    { generacion: p.generacion, mes: p.mes, dia: p.dia, orden: p.orden },
    { generacion: 4, mes: 11, dia: 1, orden: 15 }
  )
  assert.equal(p.serie, '04111')
  assert.equal(p.diaId, 'sabado')
})

test('los tres días de clase tienen su dígito y no hay un cuarto', () => {
  assert.deepEqual(DIAS_DE_CLASE.map((d) => [d.id, d.digito]),
    [['sabado', 1], ['domingo', 2], ['miercoles', 3]])
  assert.equal(partirMatricula('0411415'), null, 'un día 4 no existe y no puede leerse')
})

test('lo que no tiene la forma no se acepta como matrícula', () => {
  for (const malo of ['', null, undefined, '04111', '041111', '04111155', 'RE0000007', '0011315', '0413115']) {
    assert.equal(esMatriculaValida(malo), false, `${malo} pasó como matrícula`)
  }
  assert.equal(partirMatricula('0000015'), null, 'generación 0 y mes 00 no existen')
})

// ── LOS DOS TURNOS ──────────────────────────────────────────────────────────

test('la tarde empieza en 51 y el 50 no se emite nunca', () => {
  // La regla la fijó el dueño del producto: «a partir de 50 para arriba son los
  // de la tarde, y el primero de la tarde es el 51».
  assert.equal(RANGOS_TURNO.matutino.desde, 1)
  assert.equal(RANGOS_TURNO.matutino.hasta, 49)
  assert.equal(RANGOS_TURNO.vespertino.desde, 51)
  assert.equal(RANGOS_TURNO.vespertino.hasta, 99)
  assert.equal(turnoDeOrden(50), null, 'el 50 es la frontera, no una matrícula')
  assert.throws(() => formatearMatricula('04111', 50), /turno/)
  assert.throws(() => formatearMatricula('04111', 0), /turno/)
  assert.throws(() => formatearMatricula('04111', 100), /turno/)
})

test('el turno se lee en la propia matrícula, sin abrir la ficha', () => {
  assert.equal(partirMatricula('0411101').turno, 'matutino')
  assert.equal(partirMatricula('0411149').turno, 'matutino')
  assert.equal(partirMatricula('0411151').turno, 'vespertino')
  assert.equal(partirMatricula('0411199').turno, 'vespertino')
  assert.equal(partirMatricula('0411150'), null)
})

test('el siguiente orden no reutiliza un número liberado', () => {
  // Quien se dio de baja no devuelve su matrícula a la circulación: su historial
  // de pagos acabaría en el expediente de otra persona.
  assert.equal(siguienteOrden(['0411101', '0411103'], 'matutino'), 4)
  assert.equal(siguienteOrden([], 'matutino'), 1)
  assert.equal(siguienteOrden([], 'vespertino'), 51, 'el primero de la tarde es el 51')
  assert.equal(siguienteOrden(['0411152'], 'vespertino'), 53)
  // Los dos turnos se cuentan por separado: los de la mañana no empujan a los
  // de la tarde ni al revés.
  assert.equal(siguienteOrden(['0411199'], 'matutino'), 1)
  assert.equal(siguienteOrden(['0411149'], 'vespertino'), 51)
})

test('una serie agotada se dice, no se da la vuelta', () => {
  assert.equal(siguienteOrden(['0411149'], 'matutino'), null)
  assert.equal(siguienteOrden(['0411199'], 'vespertino'), null)
})

// ── LA SERIE SALE DEL GRUPO ─────────────────────────────────────────────────

test('la serie se arma con la generación, el mes y el día del grupo', () => {
  const s = serieDeGrupo(GRUPO)
  assert.equal(s.ok, true)
  assert.equal(s.serie, '04111')
  assert.equal(s.turno, 'matutino')
  assert.equal(s.clave, '04111-m')
  assert.equal(serieDeGrupo(TARDE).clave, '04111-v', 'la tarde lleva su propio contador')
  assert.equal(mesDeGrupo(GRUPO), 11)
  assert.equal(diaDeGrupo(GRUPO), 1)
  assert.equal(turnoDeGrupo(TARDE), 'vespertino')
})

test('UN GRUPO INCOMPLETO NO EMITE MATRÍCULAS INVENTADAS', () => {
  // Cada hueco tiene su frase: quien está en el mostrador tiene que saber qué
  // pedirle a la dirección, no leer «no se pudo».
  const sinGeneracion = serieDeGrupo({ ...GRUPO, generacion: null })
  assert.equal(sinGeneracion.ok, false)
  assert.match(sinGeneracion.problemas.join(' '), /generación/i)

  const sinFecha = serieDeGrupo({ ...GRUPO, horario: { ...GRUPO.horario, fechaInicio: '' } })
  assert.match(sinFecha.problemas.join(' '), /fecha de inicio/i)

  const sinHora = serieDeGrupo({ ...GRUPO, horario: { ...GRUPO.horario, inicio: '' } })
  assert.match(sinHora.problemas.join(' '), /mañana o de tarde/i)

  const dosDias = serieDeGrupo({ ...GRUPO, horario: { ...GRUPO.horario, dias: ['sabado', 'domingo'] } })
  assert.match(dosDias.problemas.join(' '), /más de un día/i)

  const diaRaro = serieDeGrupo({ ...GRUPO, horario: { ...GRUPO.horario, dias: ['martes'] } })
  assert.match(diaRaro.problemas.join(' '), /sábado, domingo ni miércoles/i)

  assert.equal(serieDeGrupo({}).ok, false)
  assert.equal(serieDeGrupo(null).ok, false, 'sin grupo no hay serie, y no debe reventar')
})

// ── CAMBIAR DE GRUPO ────────────────────────────────────────────────────────

test('CAMBIAR DE GRUPO REHACE LA MATRÍCULA', () => {
  // Es lo que se pidió, y la razón es que el número describe al grupo: dejarlo
  // igual haría que dijera que entró donde ya no está.
  const otro = {
    ...GRUPO,
    generacion: { numero: 5, anio: 2027 },
    horario: { ...GRUPO.horario, dias: ['miercoles'], fechaInicio: '2027-02-03' },
  }
  const r = matriculaAlCambiarDeGrupo({ matricula: '0411115', grupo: otro })
  assert.equal(r.accion, 'emitir')
  assert.equal(r.serie.serie, '05023')
  assert.match(r.motivo, /0411115/, 'no se dice cuál era la anterior')
})

test('si el grupo nuevo es de la misma serie y turno, CONSERVA su número', () => {
  // Cambiar el número sin motivo le invalida la credencial que lleva encima.
  const gemelo = { ...GRUPO, id: 'GRP-9', nombre: 'Otro sábado igual' }
  const r = matriculaAlCambiarDeGrupo({ matricula: '0411115', grupo: gemelo })
  assert.equal(r.accion, 'conservar')
  assert.ok(perteneceASerie('0411115', serieDeGrupo(gemelo)))
})

test('el mismo número en el otro turno NO es la misma serie', () => {
  // `0411115` es de mañana; el grupo de tarde reparte de 51 en adelante.
  assert.equal(perteneceASerie('0411115', serieDeGrupo(TARDE)), false)
  assert.equal(matriculaAlCambiarDeGrupo({ matricula: '0411115', grupo: TARDE }).accion, 'emitir')
})

test('quien no tenía matrícula recibe la primera, y el bloqueo se explica', () => {
  assert.equal(matriculaAlCambiarDeGrupo({ matricula: '', grupo: GRUPO }).accion, 'emitir')
  assert.equal(matriculaAlCambiarDeGrupo({ matricula: 'RE0000007', grupo: GRUPO }).accion, 'emitir',
    'una matrícula del formato viejo no pertenece a ninguna serie: se rehace')

  const bloqueado = matriculaAlCambiarDeGrupo({ matricula: '', grupo: { ...GRUPO, generacion: null } })
  assert.equal(bloqueado.accion, 'bloqueado')
  assert.match(bloqueado.motivo, /generación/i)
})

// ── EL FORMATO ANTERIOR SE LEE, NO SE EMITE ─────────────────────────────────

test('las matrículas viejas se siguen reconociendo mientras existan', () => {
  assert.equal(esMatriculaHeredada('RE0000007'), true)
  assert.equal(esMatriculaValida('RE0000007'), false, 'ya no es el formato vigente')
  assert.equal(esMatriculaConocida('RE0000007'), true)
  assert.equal(esMatriculaConocida('0411115'), true)
  assert.equal(partirMatriculaHeredada('RE0000007').numero, 7)
  assert.equal(formatearMatriculaHeredada('RES-2026', 7), 'RE0000007')
  assert.equal(prefijoDeAcademia('R.E.S.C.A.T.E.'), 'RE')
})

test('lo que dice una matrícula se puede leer en voz alta', () => {
  const frase = explicarMatricula('0411151')
  assert.match(frase, /Generación 4/)
  assert.match(frase, /Sábado/)
  assert.match(frase, /vespertino/)
  assert.match(frase, /51/)
  assert.match(explicarMatricula('RE0000007'), /formato anterior/i)
})

// ── LA CAPA DE FIRESTORE Y LAS REGLAS ───────────────────────────────────────

const CAPA = readFileSync(new URL('../src/lib/firebase/matriculas.js', import.meta.url), 'utf8')
const REGLAS = readFileSync(new URL('../firestore.rules', import.meta.url), 'utf8')

test('el orden se reserva en una TRANSACCIÓN, no contando alumnos', () => {
  assert.match(CAPA, /runTransaction/)
  assert.doesNotMatch(CAPA, /getDocs/, 'volvió a contar alumnos para saber cuál toca')
})

test('el contador cuelga de la SERIE, no de la academia ni del grupo', () => {
  assert.match(CAPA, /'contadores', academiaId, 'series', clave/,
    'el contador dejó de ser por serie: dos grupos iguales volverían a chocar')
  assert.match(CAPA, /rango\.desde - 1/, 'el vespertino dejó de arrancar en 50 para dar el 51')
  assert.match(CAPA, /se agotó/, 'la serie llena ya no avisa')
})

test('LA REGLA IMPIDE QUE EL CONTADOR DE SERIE BAJE', () => {
  const i = REGLAS.indexOf('match /series/{serie}')
  assert.notEqual(i, -1, 'desapareció la regla del contador por serie')
  const bloque = REGLAS.slice(i, REGLAS.indexOf('\n      }', i))
  assert.match(bloque, /request\.resource\.data\.ultimo > resource\.data\.ultimo/,
    'un contador que puede bajar reparte dos veces el mismo número')
  assert.match(bloque, /ultimo <= 99/, 'el orden dejó de caber en dos dígitos')
  assert.match(bloque, /allow delete: if false;/)
})

test('la matrícula solo se emite, o se rehace AL CAMBIAR DE GRUPO', () => {
  const i = REGLAS.indexOf('function matriculaCoherente()')
  assert.notEqual(i, -1, 'desapareció la cláusula que acota la matrícula')
  const bloque = REGLAS.slice(i, REGLAS.indexOf('\n    }', i))
  assert.match(bloque, /matches\('\^\[0-9\]\{7\}\$'\)/, 'la regla dejó de exigir siete dígitos')
  assert.match(bloque, /resource\.data\.get\('matricula', ''\) == ''/, 'ya no distingue emitir de reescribir')
  assert.match(bloque, /get\('grupoId', null\) != resource\.data\.get\('grupoId', null\)/,
    'se puede reescribir una matrícula sin mover a nadie de grupo')
})

test('recepción puede rehacerla, pero solo dentro del cambio de grupo', () => {
  // Desde /usuarios: hay otra regla de recepción en /articulos (el inventario),
  // y buscar «allow update: if esRecepcionDe» a secas encuentra esa primero.
  const usuarios = REGLAS.indexOf('match /usuarios/{uid}')
  const i = REGLAS.indexOf('allow update: if esRecepcionDe(resource.data.academiaId)', usuarios)
  const bloque = REGLAS.slice(i, i + 900)
  assert.match(bloque, /'matricula', 'matriculasAnteriores'/,
    'recepción no puede escribir la matrícula que su propio cambio de grupo genera')
  assert.match(bloque, /matriculaCoherente\(\)/, 'nada acota lo que recepción escribe en la matrícula')
})

test('LA MATRÍCULA NO TIENE BOTÓN: se emite sola', () => {
  // Se pidió el 21-09-2026: «que las matrículas se generen automáticamente sin
  // dar un botón; en el momento que se le asigne a un grupo que cumpla los
  // parámetros necesarios debe generar en automático su matrícula».
  //
  // Dos caminos, y los dos tienen que seguir existiendo:
  //  · el personal le asigna el grupo → va en la misma escritura;
  //  · la persona consiguió grupo por su cuenta (código, invitación,
  //    solicitud aceptada) → la emite la primera pantalla de personal que la
  //    vea, porque sin Cloud Functions no hay servidor que pueda hacerlo.
  const GESTION = readFileSync(new URL('../src/components/panel/GestionMiembros.jsx', import.meta.url), 'utf8')
  const PADRON = readFileSync(new URL('../src/components/staff/PanelPadron.jsx', import.meta.url), 'utf8')
  const HOOK = readFileSync(new URL('../src/components/usuarios/useMatriculasAlDia.js', import.meta.url), 'utf8')
  const CAPA = readFileSync(new URL('../src/lib/firebase/matriculas.js', import.meta.url), 'utf8')

  assert.doesNotMatch(GESTION, /emitirMatricula/, 'volvió el botón de emitir')
  assert.doesNotMatch(GESTION, /'Emitiendo…' : 'Emitir'/)
  for (const pantalla of [GESTION, PADRON]) {
    assert.match(pantalla, /useMatriculasAlDia\(/, 'una pantalla de personal dejó de ponerlas al día')
  }
  assert.match(CAPA, /export async function asegurarMatriculas/)
  assert.match(HOOK, /intentada\.current === firma/,
    'sin esa guarda, una pantalla abierta reintentaría en bucle a quien no se puede matricular')

  // Y la ficha del mostrador, que es donde se atiende a quien llega sin ella.
  const CTX = readFileSync(new URL('../src/context/FichaStaffContext.jsx', import.meta.url), 'utf8')
  assert.match(CTX, /asegurarMatriculas/, 'abrir una ficha ya no emite la matrícula que falta')

  // Sigue sin ofrecérsele a quien no es alumno: es el número de expediente de
  // quien cursa, no de quien da clase.
  assert.match(GESTION, /m\.rol !== 'alumno'/)
  assert.match(GESTION, /esMatriculaConocida\(m\.matricula\)/,
    'la columna dejó de distinguir una matrícula de un campo con basura')
})

test('mover de grupo y rehacer la matrícula van en UNA escritura', () => {
  const USUARIOS = readFileSync(new URL('../src/lib/firebase/usuarios.js', import.meta.url), 'utf8')
  assert.match(USUARIOS, /export async function moverAlumnoDeGrupo/)
  assert.match(USUARIOS, /const parche = \{ grupoId \}/,
    'si se parten en dos escrituras, la regla deniega la segunda')
  const FICHA = readFileSync(new URL('../src/lib/firebase/staff/alumnos.js', import.meta.url), 'utf8')
  assert.match(FICHA, /matriculaAlMoverDeGrupo/,
    'la ficha de recepción cambia de grupo sin rehacer la matrícula')
})

test('los pagos se buscan por TODAS sus matrículas', () => {
  // Un pago es inmutable (allow update: if false): su matrícula no se puede
  // reescribir, así que sin el historial el dinero cobrado antes del cambio de
  // grupo desaparece del estado de cuenta y parece que la persona debe.
  const CAJA = readFileSync(new URL('../src/lib/firebase/staff/caja.js', import.meta.url), 'utf8')
  assert.match(CAJA, /matriculas = null/)
  assert.match(CAJA, /where\('matricula', 'in', claves\)/)
  const CTX = readFileSync(new URL('../src/context/FichaStaffContext.jsx', import.meta.url), 'utf8')
  assert.match(CTX, /pagosDe\(\{ matriculas: matriculasDe\(persona\)/)
})
