// ============================================================
//  Revisión docente — pase temporal y dictámenes
// ------------------------------------------------------------
//  Lo que estas pruebas protegen:
//   1. el pase CADUCA (un pase sin caducidad sería un rol disfrazado);
//   2. el pase habilita FIRMAR, no editar ni publicar;
//   3. validar exige un RESPONSABLE con nombre —y solo eso: la lista de
//      repaso y las fuentes citadas suman, pero ya no bloquean la firma—;
//   4. corregir exige el detalle de la corrección;
//   5. las deudas que el propio tema declara se detectan antes de firmar;
//   6. aplicar una firma produce una ficha que `validarRevision` acepta.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  ACCIONES_REVISION, ESTADOS_DICTAMEN, MAX_DIAS_PASE, CLAVES_CHECKLIST,
  normalizarPase, paseActivo, diasRestantesPase, validarPase, caducidadEn,
  puedeRevisar, puedeReportar, motivoSinRevision,
  deudasDeclaradas, checklistCompleta, validarFirmaValidacion, fichaValidada,
  validarDictamen, normalizarDictamen, resumenDictamenes, yaFirmado,
  comprobarAplicacion,
} from '../src/lib/revisionDocente.js'
import { validarRevision } from '../src/lib/estadoEditorial.js'

const HOY = '2026-08-17'
const OK = { fuentes: true, cifras: true, alcance: true, actividad: true }
const FUENTES = ['NAEMT. PHTLS, 9.ª ed., 2020, cap. 4, pp. 99–144.']

// ---------- 1. el pase caduca ----------

test('el pase de revisión está vigente hasta su fecha, inclusive', () => {
  const perfil = { revisorTemporal: { hasta: '2026-08-17' } }
  assert.equal(paseActivo(perfil, '2026-08-16'), true)
  assert.equal(paseActivo(perfil, '2026-08-17'), true, 'el último día sigue siendo válido')
  assert.equal(paseActivo(perfil, '2026-08-18'), false, 'al día siguiente ya no')
})

test('sin pase, con pase basura o sin fecha de hoy no hay vigencia', () => {
  assert.equal(paseActivo({}, HOY), false)
  assert.equal(paseActivo({ revisorTemporal: { hasta: 'siempre' } }, HOY), false)
  assert.equal(paseActivo({ revisorTemporal: { hasta: '2026-12-31' } }, 'ayer'), false)
})

test('normalizarPase descarta claves inventadas y fechas mal formadas', () => {
  const p = normalizarPase({ hasta: '31/12/2026', rol: 'superadmin', nota: 'x'.repeat(400) })
  assert.equal(p.hasta, null)
  assert.equal(p.nota.length, 300)
  assert.equal(Object.prototype.hasOwnProperty.call(p, 'rol'), false, 'no se copia un campo desconocido')
})

test('un pase no puede durar más que el tope, ni empezar caducado', () => {
  assert.equal(validarPase({ hasta: caducidadEn(30, HOY) }, HOY), null)
  assert.match(validarPase({ hasta: '2026-08-16' }, HOY), /ya pas/i)
  assert.match(validarPase({ hasta: caducidadEn(MAX_DIAS_PASE + 1, HOY) }, HOY), new RegExp(String(MAX_DIAS_PASE)))
  assert.match(validarPase({ hasta: '17-08-2026' }, HOY), /AAAA-MM-DD/)
})

test('los días restantes se cuentan hasta la caducidad', () => {
  const perfil = { revisorTemporal: { hasta: caducidadEn(10, HOY) } }
  assert.equal(diasRestantesPase(perfil, HOY), 10)
  assert.equal(diasRestantesPase({ revisorTemporal: { hasta: HOY } }, HOY), 0)
  assert.equal(diasRestantesPase({}, HOY), null)
})

// ---------- 2. el pase habilita firmar, no editar ----------

test('quién puede revisar: rol, pase vigente o permiso de publicar', () => {
  assert.equal(puedeRevisar({ esSuperadmin: true, hoy: HOY }), true)
  assert.equal(puedeRevisar({ rol: 'admin_escuela', hoy: HOY }), true)
  assert.equal(puedeRevisar({ rol: 'instructor', hoy: HOY }), false, 'un profesor sin pase no revisa')
  assert.equal(
    puedeRevisar({ rol: 'instructor', perfil: { revisorTemporal: { hasta: caducidadEn(5, HOY) } }, hoy: HOY }),
    true,
  )
  assert.equal(
    puedeRevisar({ rol: 'instructor', perfil: { permisosEditor: { publicarContenido: true } }, hoy: HOY }),
    true,
    'quien ya puede publicar, con más razón puede opinar',
  )
  assert.equal(puedeRevisar({ rol: 'alumno', hoy: HOY }), false)
})

test('el pase caducado deja de habilitar y el motivo lo explica con la fecha', () => {
  const perfil = { revisorTemporal: { hasta: '2026-01-01' } }
  assert.equal(puedeRevisar({ rol: 'instructor', perfil, hoy: HOY }), false)
  assert.match(motivoSinRevision({ rol: 'instructor', perfil, hoy: HOY }), /2026-01-01/)
  assert.match(motivoSinRevision({ rol: 'instructor', hoy: HOY }), /pase de revisi/i)
  assert.equal(motivoSinRevision({ esSuperadmin: true, hoy: HOY }), null)
})

test('el pase NO concede permisos de edición', () => {
  // El pase vive en `revisorTemporal`; los permisos de edición, en
  // `permisosEditor`. Conceder uno no toca el otro: es la garantía de que
  // pedirle a un profesor que revise no le convierte en editor.
  const perfil = { revisorTemporal: { hasta: caducidadEn(30, HOY) } }
  assert.equal(puedeRevisar({ rol: 'instructor', perfil, hoy: HOY }), true)
  assert.equal(perfil.permisosEditor, undefined, 'el pase no crea permisos de edición')
})

test('reportar no exige pase: basta tener sesión', () => {
  assert.equal(puedeReportar({ uid: 'u1' }), true)
  assert.equal(puedeReportar({}), false)
})

// ---------- 3. validar exige un responsable con nombre ----------

test('la firma de validación exige nombre y nada más', () => {
  assert.match(validarFirmaValidacion({ fuentes: FUENTES, checklist: OK }).motivo, /firma/i)
  // Sin fuentes y sin marcar la lista: se puede firmar. La fricción anterior
  // —cuatro casillas y una lista de fuentes con formato— no producía revisiones
  // más cuidadosas, producía revisiones sin terminar y un temario sin validar.
  assert.equal(validarFirmaValidacion({ revisadoPor: 'Dra. X' }).ok, true)
  assert.equal(validarFirmaValidacion({ revisadoPor: 'Dra. X', fuentes: [], checklist: {} }).ok, true)
  assert.equal(validarFirmaValidacion({ revisadoPor: '   ' }).ok, false)
})

test('checklistCompleta exige todas las claves declaradas', () => {
  assert.equal(checklistCompleta(OK), true)
  assert.equal(checklistCompleta({}), false)
  assert.equal(CLAVES_CHECKLIST.length, 4)
  for (const k of CLAVES_CHECKLIST) {
    assert.equal(checklistCompleta({ ...OK, [k]: false }), false, `falta ${k} y aun así pasó`)
  }
})

test('el dictamen de validar se rechaza sin los requisitos de la firma', () => {
  assert.match(validarDictamen({ accion: 'validar', temaId: 'm5-cin-definicion' }), /firma/i)
  assert.equal(
    validarDictamen({
      accion: 'validar', temaId: 'm5-cin-definicion',
      revisadoPor: 'Dra. X', fuentes: FUENTES, checklist: OK,
    }),
    null,
  )
})

// ---------- 4. corregir exige el detalle ----------

test('corregir sin comentario no se acepta, y exige firma', () => {
  assert.match(validarDictamen({ accion: 'corregir', temaId: 't1' }), /corregir/i)
  assert.match(
    validarDictamen({ accion: 'corregir', temaId: 't1', comentario: 'Cambiar la dosis del ejemplo.' }),
    /firma/i,
  )
  assert.equal(
    validarDictamen({
      accion: 'corregir', temaId: 't1',
      comentario: 'Cambiar la dosis del ejemplo.', revisadoPor: 'Dr. Y',
    }),
    null,
  )
})

test('reportar exige descripción pero no firma ni fuentes', () => {
  assert.match(validarDictamen({ accion: 'reportar', temaId: 't1' }), /describe/i)
  assert.equal(validarDictamen({ accion: 'reportar', temaId: 't1', comentario: 'Imagen rota.' }), null)
})

test('acción o tema desconocidos se rechazan', () => {
  assert.match(validarDictamen({ accion: 'publicar', temaId: 't1' }), /desconocida/i)
  assert.match(validarDictamen({ accion: 'reportar', comentario: 'x' }), /falta el tema/i)
  assert.match(validarDictamen(null), /inv[aá]lido/i)
})

test('normalizarDictamen recorta, deduplica y no arrastra basura', () => {
  const d = normalizarDictamen({
    accion: 'validar', temaId: 't1', revisadoPor: '  Dra. X  ',
    fuentes: [' a ', 'a', '', null], checklist: { fuentes: true, ajeno: true },
    estado: 'inventado', extra: 'no debe pasar',
  })
  assert.deepEqual(d.fuentes, ['a'])
  assert.equal(d.revisadoPor, 'Dra. X')
  assert.equal(d.estado, 'abierto', 'un estado desconocido cae al valor seguro')
  assert.deepEqual(Object.keys(d.checklist).sort(), [...CLAVES_CHECKLIST].sort())
  assert.equal(d.extra, undefined)
  assert.ok(ESTADOS_DICTAMEN.includes(d.estado))
})

test('un dictamen que no es de validar no arrastra checklist', () => {
  const d = normalizarDictamen({ accion: 'corregir', temaId: 't1', comentario: 'x', checklist: OK })
  assert.equal(d.checklist, undefined)
})

// ---------- 5. deudas declaradas por el propio tema ----------

test('se detectan las deudas que la ficha del tema declara', () => {
  const revision = {
    observaciones: [
      'Redactado desde cero en el lote B; el tema estaba vacío.',
      'DEUDA BIBLIOGRÁFICA: capítulo y página de PHTLS 9 PENDIENTES.',
      'BLOQUEO PARCIAL DECLARADO: no se publica ninguna dosis.',
      'ÁMBITO PREHOSPITALARIO: se sospecha, se sostiene y se traslada.',
    ],
  }
  const deudas = deudasDeclaradas(revision)
  assert.equal(deudas.length, 2)
  assert.ok(deudas.every((d) => /PENDIENTES|BLOQUEO/.test(d)))
  assert.deepEqual(deudasDeclaradas(null), [])
  assert.deepEqual(deudasDeclaradas({ observaciones: 'no es lista' }), [])
})

test('las deudas se informan pero no impiden firmar: la decisión es del docente', () => {
  const revision = { observaciones: ['Capítulo y página PENDIENTES.'] }
  const r = validarFirmaValidacion({ revision, revisadoPor: 'Dra. X', fuentes: FUENTES, checklist: OK })
  assert.equal(r.ok, true, 'la deuda avisa, no bloquea')
  assert.equal(r.deudas.length, 1)
})

// ---------- 6. aplicar la firma produce una ficha válida ----------

test('la ficha resultante de una firma pasa validarRevision', () => {
  const revision = { estado: 'borrador', procedencia: 'redactado', fuentes: ['Fuente previa.'] }
  const { ficha, error } = comprobarAplicacion(
    revision,
    { revisadoPor: 'Dra. X', fuentes: FUENTES },
    HOY,
  )
  assert.equal(error, null, `la ficha aplicada debería ser válida: ${error}`)
  assert.equal(ficha.estado, 'validado')
  assert.equal(ficha.revisadoPor, 'Dra. X')
  assert.equal(ficha.actualizado, HOY)
  assert.ok(ficha.fuentes.includes('Fuente previa.'), 'no se pierden las fuentes previas')
  assert.ok(ficha.fuentes.includes(FUENTES[0]))
})

test('una firma sin fuentes citadas deja la traza del acto de revisión', () => {
  // `validarRevision` sigue exigiendo trazabilidad y esa exigencia NO se tocó:
  // lo que cambia es de dónde sale cuando el docente no cita nada. La traza
  // dice quién firmó y cuándo, con esas palabras, para que nadie la confunda
  // con una cita bibliográfica.
  const ficha = fichaValidada({ estado: 'borrador' }, { revisadoPor: 'Dra. X', fuentes: [], fecha: HOY })
  assert.equal(validarRevision(ficha), null)
  assert.equal(ficha.fuentes.length, 1)
  assert.match(ficha.fuentes[0], /Revision docente de Dra\. X \(2026-08-17\)/)
})

test('sin nombre, la ficha de una firma sigue siendo rechazada', () => {
  // Guarda del guarda: aunque alguien saltara `validarFirmaValidacion`, un
  // `validado` sin responsable no pasa el control de la ficha editorial.
  const ficha = fichaValidada({ estado: 'borrador' }, { revisadoPor: '', fuentes: [], fecha: HOY })
  assert.match(validarRevision(ficha), /nombre o rol/i)
})

test('fichaValidada rechaza un estado que no exige revisor', () => {
  assert.throws(
    () => fichaValidada({}, { revisadoPor: 'X', fuentes: FUENTES, fecha: HOY, estado: 'borrador' }),
    /no v[aá]lido/i,
  )
})

test('la firma conserva el resto de la ficha y no la reescribe', () => {
  const revision = {
    estado: 'en_revision', procedencia: 'redactado', versionClinica: 'PHTLS 9.ª ed.',
    observaciones: ['Una observación que debe sobrevivir.'], fuentes: [],
  }
  const ficha = fichaValidada(revision, { revisadoPor: 'Dra. X', fuentes: FUENTES, fecha: HOY })
  assert.equal(ficha.versionClinica, 'PHTLS 9.ª ed.')
  assert.deepEqual(ficha.observaciones, ['Una observación que debe sobrevivir.'])
})

// ---------- cola de la coordinación ----------

test('el resumen cuenta solo los dictámenes abiertos, por acción y por tema', () => {
  const lista = [
    { temaId: 'a', accion: 'validar', estado: 'abierto' },
    { temaId: 'a', accion: 'corregir', estado: 'abierto' },
    { temaId: 'b', accion: 'reportar', estado: 'abierto' },
    { temaId: 'c', accion: 'validar', estado: 'aplicado' },
  ]
  const r = resumenDictamenes(lista)
  assert.equal(r.total, 4)
  assert.equal(r.abiertos, 3)
  assert.equal(r.validar, 1)
  assert.equal(r.corregir, 1)
  assert.equal(r.reportar, 1)
  assert.equal(r.temas, 2, 'dos temas distintos con dictamen abierto')
})

test('no se firma dos veces el mismo tema con el pase abierto', () => {
  const lista = [{ temaId: 'a', uid: 'u1', accion: 'validar', estado: 'abierto' }]
  assert.equal(yaFirmado(lista, { temaId: 'a', uid: 'u1' }), true)
  assert.equal(yaFirmado(lista, { temaId: 'a', uid: 'u2' }), false, 'otro revisor sí puede firmar')
  assert.equal(yaFirmado(lista, { temaId: 'b', uid: 'u1' }), false)
  assert.equal(
    yaFirmado([{ temaId: 'a', uid: 'u1', accion: 'validar', estado: 'aplicado' }], { temaId: 'a', uid: 'u1' }),
    false,
    'una firma ya aplicada no bloquea una nueva revisión',
  )
})

test('las tres acciones son exactamente las que ofrece la barra del tema', () => {
  assert.deepEqual(ACCIONES_REVISION, ['validar', 'corregir', 'reportar'])
})
