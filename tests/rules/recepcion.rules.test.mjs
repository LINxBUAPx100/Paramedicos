// ============================================================
//  Pruebas de REGLAS — el rol `recepcion` contra el emulador
// ------------------------------------------------------------
//  `tests/staffAislamiento.test.mjs` comprueba que las reglas están ESCRITAS
//  como se decidió. Esto comprueba que FIRESTORE LAS APLICA así, que no es lo
//  mismo: una regla puede estar escrita y no llegar a evaluarse nunca porque
//  otra de más arriba ya concedió el permiso.
//
//  Lo que se fija aquí, y por qué cada cosa:
//
//   1. **Recepción no lee el temario.** Es el riesgo que el plan técnico dejó
//      avisado antes de que el rol existiera: `esStaffDe()` abre `temas` y
//      `cursos`, y meter recepción ahí habría regalado el contenido entero.
//   2. **Recepción no cruza de academia.** La promesa central del producto.
//   3. **Recepción no asciende a nadie ni se toca la matrícula**, que son las
//      dos formas de convertir el mostrador en una puerta trasera.
//   4. **El inventario solo baja**, y nunca por debajo de cero.
//   5. **Un pago sigue sin poder editarse**, también para el rol nuevo.
//
//  Requieren el emulador de Firestore (Java): npm run test:rules
//  Sin emulador la suite se OMITE con el motivo; nunca da falso verde.
// ============================================================
import { test, after } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const HOST = process.env.FIRESTORE_EMULATOR_HOST
let rut = null
try {
  rut = await import('@firebase/rules-unit-testing')
} catch {
  /* dependencia ausente: se reporta vía skip */
}

const skip = !HOST
  ? 'Requiere el emulador de Firestore: npm run test:rules'
  : !rut
    ? 'Falta @firebase/rules-unit-testing: npm i -D @firebase/rules-unit-testing firebase-tools'
    : false

let env = null
let fsmod = null

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    // Proyecto propio: `node --test` corre los archivos en paralelo y los
    // fixtures se pisarían entre sí (misma lección que contenido.rules).
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-recepcion`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  // Se limpia ANTES de sembrar. `npm run test:rules` levanta un emulador nuevo
  // cada vez, así que en CI daría igual; pero ejecutando el archivo suelto
  // contra un emulador ya en marcha, los documentos de la vuelta anterior
  // seguían ahí y dos pruebas pasaban a fallar por una razón falsa (un `setDoc`
  // sobre un pago existente es un UPDATE, y los pagos no se actualizan). Una
  // prueba que depende de si se ejecutó antes no sirve para nada.
  await env.clearFirestore()
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    const pon = (ruta, datos) => setDoc(doc(db, ruta), datos)

    await pon('academias/ACA-A', { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    await pon('academias/ACA-B', { nombre: 'B', estado: 'activo', planComercial: 'pro' })

    await pon('usuarios/super1', { rol: 'superadmin', academiaId: '', estado: 'activo' })
    await pon('usuarios/dirA', { rol: 'admin_escuela', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/profA', { rol: 'instructor', academiaId: 'ACA-A', estado: 'activo' })
    // Las dos recepciones: una por academia, para el caso de aislamiento.
    await pon('usuarios/recA', { rol: 'recepcion', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/recB', { rol: 'recepcion', academiaId: 'ACA-B', estado: 'activo' })
    // Recepción con una prueba VENCIDA: no atiende ningún mostrador.
    await pon('usuarios/recVencida', {
      rol: 'recepcion', academiaId: 'ACA-A', estado: 'activo',
      esPrueba: true, pruebaHasta: new Date('2020-01-01'),
    })

    await pon('usuarios/alumA', {
      rol: 'alumno', academiaId: 'ACA-A', estado: 'activo', grupoId: 'G-A1',
      nombre: 'Ana', email: 'ana@x.mx', telefono: '2222256586', matricula: 'AC0000001',
    })
    await pon('usuarios/alumB', { rol: 'alumno', academiaId: 'ACA-B', estado: 'activo', nombre: 'Beto' })

    await pon('grupos/G-A1', { academiaId: 'ACA-A', nombre: 'TUM', estado: 'activo', programaId: 'ACA-A__tum' })
    await pon('grupos/G-A2', { academiaId: 'ACA-A', nombre: 'Otro', estado: 'activo', programaId: 'ACA-A__tum' })
    await pon('grupos/G-B1', { academiaId: 'ACA-B', nombre: 'TUM B', estado: 'activo', programaId: 'ACA-B__tum' })

    await pon('cursos/ACA-A__tum', {
      academiaId: 'ACA-A', titulo: 'TUM', estado: 'publicado', version: 1,
      creadoPor: 'seed', estructura: [], clonacion: { completa: true },
    })
    await pon('temas/ACA-A__tum__t1', {
      academiaId: 'ACA-A', cursoId: 'ACA-A__tum', temaId: 't1',
      titulo: 'Lección', estado: 'publicado', version: 1,
    })

    await pon('articulos/art1', { academiaId: 'ACA-A', nombre: 'Férula', precio: 450, existencias: 3, activo: true })
    await pon('ordenes/ord1', {
      academiaId: 'ACA-A', uid: 'alumA', matricula: 'AC0000001', nombre: 'Ana',
      lineas: [{ articuloId: 'art1', nombre: 'Férula', precio: 450, cantidad: 1 }],
      total: 450, estado: 'apartado', registradoPor: 'recA',
    })
    await pon('ordenes/ordEntregada', {
      academiaId: 'ACA-A', uid: 'alumA', matricula: 'AC0000001', nombre: 'Ana',
      lineas: [{ articuloId: 'art1', nombre: 'Férula', precio: 450, cantidad: 1 }],
      total: 450, estado: 'entregado', registradoPor: 'recA',
    })
    await pon('pagos/pago1', {
      academiaId: 'ACA-A', matricula: 'AC0000001', monto: 2500,
      concepto: 'inscripcion', metodo: 'efectivo', registradoPor: 'recA',
    })
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()

const asistencia = (extra = {}) => {
  const inicio = new Date('2026-09-20T08:00:00')
  return {
    uid: 'alumA', academiaId: 'ACA-A', grupoId: 'G-A1', matricula: 'AC0000001',
    nombre: 'Ana', inicio, expira: new Date(inicio.getTime() + 8 * 3600_000),
    registradoPor: 'recA', medio: 'manual', ...extra,
  }
}

after(async () => {
  if (env) await env.cleanup()
})

// ── 1. EL TEMARIO SIGUE CERRADO ─────────────────────────────────────────────

test('recepción NO lee el temario de su propia academia', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertFails, assertSucceeds } = rut

  // Esta es LA prueba. Si deja de fallar, alguien metió `recepcion` dentro de
  // `esStaffDe()` y el contenido entero de la academia acaba de quedar abierto.
  await assertFails(getDoc(doc(como('recA'), 'temas/ACA-A__tum__t1')))
  await assertFails(getDoc(doc(como('recA'), 'cursos/ACA-A__tum')))

  // Y el profesor de la misma academia SÍ lo lee: la prueba de arriba no pasa
  // por estar todo cerrado.
  await assertSucceeds(getDoc(doc(como('profA'), 'temas/ACA-A__tum__t1')))
})

// ── 2. SÍ PUEDE HACER SU TRABAJO ────────────────────────────────────────────

test('recepción lee a las personas de su academia y registra entradas', { skip }, async () => {
  await preparar()
  const { doc, getDoc, setDoc } = fsmod
  const { assertSucceeds } = rut

  await assertSucceeds(getDoc(doc(como('recA'), 'usuarios/alumA')))
  await assertSucceeds(setDoc(doc(como('recA'), 'asistencias/alumA__2026-09-20'), asistencia()))
})

test('recepción cobra en mostrador', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertSucceeds } = rut

  await assertSucceeds(setDoc(doc(como('recA'), 'pagos/nuevo1'), {
    academiaId: 'ACA-A', matricula: 'AC0000001', monto: 900,
    concepto: 'mensualidad', metodo: 'efectivo', registradoPor: 'recA',
  }))
})

test('recepción edita los datos de contacto y deja rastro', { skip }, async () => {
  await preparar()
  const { doc, updateDoc, setDoc } = fsmod
  const { assertSucceeds } = rut

  await assertSucceeds(updateDoc(doc(como('recA'), 'usuarios/alumA'), { telefono: '5512345678' }))
  // Y puede moverlo a otro grupo DE SU ACADEMIA.
  await assertSucceeds(updateDoc(doc(como('recA'), 'usuarios/alumA'), { grupoId: 'G-A2' }))
  // El rastro: sin este permiso, la auditoría se denegaría en silencio.
  await assertSucceeds(setDoc(doc(como('recA'), 'historial/h1'), {
    academiaId: 'ACA-A', usuario: 'recA', accion: 'editar-alumno',
    coleccion: 'usuarios', docId: 'alumA', antes: {}, despues: {}, origen: 'recepcion',
  }))
})

// ── 3. LAS PUERTAS TRASERAS ─────────────────────────────────────────────────

test('recepción NO asciende a nadie ni cambia su estado', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut

  // Con `rol` el mostrador convertiría a un alumno en profesor, y un profesor
  // lee el temario completo: sería la vía indirecta a lo que cierra la prueba 1.
  await assertFails(updateDoc(doc(como('recA'), 'usuarios/alumA'), { rol: 'instructor' }))
  await assertFails(updateDoc(doc(como('recA'), 'usuarios/alumA'), { estado: 'suspendido' }))
  await assertFails(updateDoc(doc(como('recA'), 'usuarios/alumA'), { academiaId: 'ACA-B' }))
  await assertFails(updateDoc(doc(como('recA'), 'usuarios/alumA'), { modulosDesbloqueados: ['m1'] }))
})

test('recepción NO reescribe una matrícula a mano', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut

  // Escribirla saltándose el contador es la única forma de darle el mismo
  // número a dos personas desde la interfaz.
  await assertFails(updateDoc(doc(como('recA'), 'usuarios/alumA'), { matricula: 'AC0000002' }))
})

test('recepción NO edita la ficha de un profesor ni la de su director', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut

  await assertFails(updateDoc(doc(como('recA'), 'usuarios/profA'), { telefono: '5512345678' }))
  await assertFails(updateDoc(doc(como('recA'), 'usuarios/dirA'), { telefono: '5512345678' }))
})

test('recepción NO mete a un alumno en el grupo de otra academia', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut

  // El grupo lleva el `programaId`: un grupo ajeno colado aquí le daría al
  // alumno el temario de otra escuela.
  await assertFails(updateDoc(doc(como('recA'), 'usuarios/alumA'), { grupoId: 'G-B1' }))
})

// ── 4. AISLAMIENTO ENTRE ACADEMIAS ──────────────────────────────────────────

test('la recepción de una academia no alcanza a la otra', { skip }, async () => {
  await preparar()
  const { doc, getDoc, setDoc, updateDoc } = fsmod
  const { assertFails } = rut

  await assertFails(getDoc(doc(como('recB'), 'usuarios/alumA')))
  await assertFails(updateDoc(doc(como('recB'), 'usuarios/alumA'), { telefono: '5512345678' }))
  await assertFails(setDoc(doc(como('recB'), 'asistencias/alumA__2026-09-21'), asistencia()))
  await assertFails(setDoc(doc(como('recB'), 'pagos/nuevoB'), {
    academiaId: 'ACA-A', matricula: 'AC0000001', monto: 100,
    concepto: 'otro', metodo: 'efectivo', registradoPor: 'recB',
  }))
})

test('una prueba vencida no atiende el mostrador', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertFails } = rut

  await assertFails(getDoc(doc(como('recVencida'), 'usuarios/alumA')))
})

// ── 5. ASISTENCIAS ──────────────────────────────────────────────────────────

test('una asistencia sin `expira` no se guarda', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut

  // «En clase» se DERIVA de esa marca: sin ella el documento no significa nada.
  const { expira, ...sinExpira } = asistencia()
  await assertFails(setDoc(doc(como('recA'), 'asistencias/alumA__2026-09-22'), sinExpira))
  // Y `expira` anterior a `inicio` es un pase ya caducado al nacer.
  await assertFails(setDoc(doc(como('recA'), 'asistencias/alumA__2026-09-23'),
    asistencia({ expira: new Date('2026-09-19T08:00:00') })))
})

test('el id de la asistencia tiene que ser el de esa persona', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut

  // Un documento con el uid de alguien y el id de otro rompería el recuento.
  await assertFails(setDoc(doc(como('recA'), 'asistencias/otro__2026-09-24'), asistencia()))
})

test('el alumno LEE su asistencia pero no se la registra solo', { skip }, async () => {
  await preparar()
  const { doc, getDoc, setDoc } = fsmod
  const { assertFails, assertSucceeds } = rut

  await assertSucceeds(getDoc(doc(como('alumA'), 'asistencias/alumA__2026-09-20')))
  // Si pudiera escribirla, se marcaría entrada desde casa.
  await assertFails(setDoc(doc(como('alumA'), 'asistencias/alumA__2026-09-25'),
    asistencia({ registradoPor: 'alumA' })))
})

// ── 6. TIENDA E INVENTARIO ──────────────────────────────────────────────────

test('recepción baja el inventario pero no lo sube', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails, assertSucceeds } = rut

  // Quien recibe mercancía es quien la da de alta.
  await assertFails(updateDoc(doc(como('recA'), 'articulos/art1'), { existencias: 99 }))
  // Y nunca por debajo de cero: un inventario negativo es un artículo
  // prometido dos veces.
  await assertFails(updateDoc(doc(como('recA'), 'articulos/art1'), { existencias: -1 }))
  await assertSucceeds(updateDoc(doc(como('recA'), 'articulos/art1'), { existencias: 2 }))
})

test('recepción no cambia el precio de un artículo', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut

  await assertFails(updateDoc(doc(como('recA'), 'articulos/art1'), { precio: 1 }))
})

test('una orden entregada ya no se toca', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut

  // Ya se descontó del inventario: reabrirla lo dejaría descuadrado sin que
  // nada lo señalara.
  await assertFails(updateDoc(doc(como('recA'), 'ordenes/ordEntregada'), { estado: 'apartado' }))
})

test('las líneas y el total de una orden son inmutables', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails, assertSucceeds } = rut

  await assertFails(updateDoc(doc(como('recA'), 'ordenes/ord1'), { total: 1 }))
  await assertFails(updateDoc(doc(como('recA'), 'ordenes/ord1'), { lineas: [] }))
  // Cambiar de estado sí: es el flujo normal.
  await assertSucceeds(updateDoc(doc(como('recA'), 'ordenes/ord1'), { estado: 'pagado' }))
})

// ── 7. LA CAJA NO SE REESCRIBE ──────────────────────────────────────────────

test('un pago registrado no se edita ni se borra desde el mostrador', { skip }, async () => {
  await preparar()
  const { doc, updateDoc, deleteDoc } = fsmod
  const { assertFails } = rut

  // Editar un asiento destruye la prueba de lo que se apuntó primero, y con
  // ella la posibilidad de cuadrar una caja. No se relajó al abrir el rol.
  await assertFails(updateDoc(doc(como('recA'), 'pagos/pago1'), { monto: 1 }))
  await assertFails(deleteDoc(doc(como('recA'), 'pagos/pago1')))
})

// ── 8. EL PROFESOR NO ES RECEPCIÓN ──────────────────────────────────────────

test('un profesor no cobra ni edita fichas', { skip }, async () => {
  await preparar()
  const { doc, setDoc, updateDoc } = fsmod
  const { assertFails } = rut

  await assertFails(setDoc(doc(como('profA'), 'pagos/nuevoProf'), {
    academiaId: 'ACA-A', matricula: 'AC0000001', monto: 100,
    concepto: 'otro', metodo: 'efectivo', registradoPor: 'profA',
  }))
  // El valor tiene que ser DISTINTO del actual, y esto no es un detalle del
  // test: una escritura que no cambia nada produce un `affectedKeys()` vacío,
  // y un conjunto vacío cumple cualquier `hasOnly()`. O sea que el profesor
  // «puede» escribir un no-op sobre un alumno —permiso que no concede nada,
  // porque el documento queda igual—, pero que convertiría esta prueba en un
  // falso verde si se escribiera con el teléfono que ya tiene.
  await assertFails(updateDoc(doc(como('profA'), 'usuarios/alumA'), { telefono: '9999999999' }))
})

// ── 9. LA FICHA ÚNICA DE PERSONA (20-09-2026) ───────────────────────────────
//
//  La ficha se abre desde cualquier lista de las tres consolas y deja editar
//  distinto según quién mire. Lo que sigue comprueba que el SERVIDOR aplica
//  esos tres niveles, no solo la pantalla.

test('el DIRECTOR ya puede corregir los datos de contacto', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  // Hasta esa fecha no podía ni arreglarle un apellido mal escrito a nadie: su
  // lista blanca solo tenía rol, estado y grupo.
  await assertSucceeds(updateDoc(doc(como('dirA'), 'usuarios/alumA'), {
    nombre: 'Ana Corregida', email: 'ana.nueva@x.mx', telefono: '5599887766',
  }))
})

test('el director puede mezclar contacto y gestión en una sola escritura', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  // La ficha guarda de una vez. Si la regla exigiera escrituras separadas,
  // habría dos entradas de auditoría por un solo gesto.
  await assertSucceeds(updateDoc(doc(como('dirA'), 'usuarios/alumA'), {
    nombre: 'Ana Otra Vez', grupoId: 'G-A2', estado: 'suspendido',
  }))
})

test('el director sigue sin poder mover a nadie de academia', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(updateDoc(doc(como('dirA'), 'usuarios/alumA'), { academiaId: 'ACA-B' }))
})

test('un nombre vacío o un correo enorme se rechazan en el servidor', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  // La forma se comprueba en la regla y no solo en el formulario: una regla
  // que confía en que el cliente valide no está comprobando nada.
  await assertFails(updateDoc(doc(como('dirA'), 'usuarios/alumA'), { nombre: '' }))
  await assertFails(updateDoc(doc(como('recA'), 'usuarios/alumA'), { nombre: '' }))
  await assertFails(updateDoc(doc(como('dirA'), 'usuarios/alumA'), { telefono: '1'.repeat(30) }))
})

test('el rastro de la ficha se escribe desde las tres consolas', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertSucceeds } = rut
  for (const [quien, id] of [['dirA', 'h-dir'], ['recA', 'h-rec']]) {
    await assertSucceeds(setDoc(doc(como(quien), `historial/${id}`), {
      academiaId: 'ACA-A', usuario: quien, accion: 'editar-persona',
      coleccion: 'usuarios', docId: 'alumA', antes: {}, despues: {}, origen: 'recepcion',
    }))
  }
})
