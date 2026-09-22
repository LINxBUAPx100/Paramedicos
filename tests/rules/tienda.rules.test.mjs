// ============================================================
//  Pruebas de REGLAS — la tienda, contra el emulador
// ------------------------------------------------------------
//  `tests/tienda.test.mjs` comprueba que las reglas están ESCRITAS como se
//  decidió. Esto comprueba que Firestore LAS APLICA así, que no es lo mismo.
//
//  Lo que se fija, y por qué cada cosa:
//
//   1. **El alumno no puede fijar lo que se le cobra.** Su pedido tiene que
//      nacer en cero. Es la defensa entera: las reglas no tienen bucles, así
//      que no pueden validar precio a precio contra el catálogo.
//   2. **El alumno no publica en el catálogo.** Es inventario y precios de la
//      academia.
//   3. **El catálogo no cruza de academia.**
//   4. **Un pedido confirmado ya no se reescribe.**
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

const ARTICULO = {
  academiaId: 'ACA-A', nombre: 'Férula de vacío', descripcion: 'De vacío, adulto',
  categoria: 'equipo', precio: 450, existencias: 3, imagen: '', activo: true,
}

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-tienda`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  // Se limpia antes de sembrar: ejecutando el archivo suelto contra un emulador
  // ya en marcha, los documentos de la vuelta anterior harían fallar pruebas
  // por una razón falsa.
  await env.clearFirestore()
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    const pon = (ruta, datos) => setDoc(doc(db, ruta), datos)

    await pon('academias/ACA-A', { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    await pon('academias/ACA-B', { nombre: 'B', estado: 'activo', planComercial: 'pro' })

    await pon('usuarios/super1', { rol: 'superadmin', academiaId: '', estado: 'activo' })
    await pon('usuarios/dirA', { rol: 'admin_escuela', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/dirB', { rol: 'admin_escuela', academiaId: 'ACA-B', estado: 'activo' })
    await pon('usuarios/profA', { rol: 'instructor', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/recA', { rol: 'recepcion', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/alumA', {
      rol: 'alumno', academiaId: 'ACA-A', estado: 'activo', grupoId: 'G-A1',
      nombre: 'Ana', matricula: 'AC0000001',
    })
    await pon('usuarios/alumB', { rol: 'alumno', academiaId: 'ACA-B', estado: 'activo', nombre: 'Beto' })

    await pon('grupos/G-A1', { academiaId: 'ACA-A', nombre: 'TUM', estado: 'activo', programaId: 'ACA-A__tum' })

    await pon('articulos/art1', ARTICULO)
    await pon('articulos/artB', { ...ARTICULO, academiaId: 'ACA-B', nombre: 'De la otra' })

    await pon('ordenes/pedido1', {
      academiaId: 'ACA-A', uid: 'alumA', matricula: 'AC0000001', nombre: 'Ana',
      lineas: [{ articuloId: 'art1', cantidad: 2 }], total: 0,
      estado: 'solicitado', origen: 'alumno', registradoPor: 'alumA',
    })
    await pon('ordenes/apartada1', {
      academiaId: 'ACA-A', uid: 'alumA', matricula: 'AC0000001', nombre: 'Ana',
      lineas: [{ articuloId: 'art1', nombre: 'Férula de vacío', precio: 450, cantidad: 1 }],
      total: 450, estado: 'apartado', registradoPor: 'recA',
    })
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()

const pedidoDe = (uid, extra = {}) => ({
  academiaId: 'ACA-A', uid, matricula: 'AC0000001', nombre: 'Ana',
  lineas: [{ articuloId: 'art1', cantidad: 1 }], total: 0,
  estado: 'solicitado', origen: 'alumno', registradoPor: uid, ...extra,
})

after(async () => {
  if (env) await env.cleanup()
})

// ── 1. EL ALUMNO NO FIJA LO QUE SE LE COBRA ─────────────────────────────────

test('el alumno manda su pedido, y nace en CERO', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(setDoc(doc(como('alumA'), 'ordenes/nuevo1'), pedidoDe('alumA')))
})

test('un pedido con importe se deniega', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  // ESTA ES LA PRUEBA. Si deja de fallar, el importe lo decide el cliente.
  await assertFails(setDoc(doc(como('alumA'), 'ordenes/nuevo2'), pedidoDe('alumA', { total: 1 })))
  await assertFails(setDoc(doc(como('alumA'), 'ordenes/nuevo3'), pedidoDe('alumA', { total: 99999 })))
})

test('un alumno no puede crear un pedido APARTADO (que reserva material)', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  await assertFails(setDoc(doc(como('alumA'), 'ordenes/nuevo4'),
    pedidoDe('alumA', { estado: 'apartado' })))
})

test('un alumno no pide a nombre de otro', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  await assertFails(setDoc(doc(como('alumA'), 'ordenes/nuevo5'), pedidoDe('otro')))
})

test('un alumno de otra academia no pide en esta', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  await assertFails(setDoc(doc(como('alumB'), 'ordenes/nuevo6'), pedidoDe('alumB')))
})

// ── 2. CANCELAR LO SUYO, Y NADA MÁS ─────────────────────────────────────────

test('el alumno cancela su pedido sin confirmar', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(updateDoc(doc(como('alumA'), 'ordenes/pedido1'), { estado: 'cancelado' }))
})

test('el alumno NO puede confirmarse su propio pedido ni ponerle precio', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  // `apartado` reserva material: confirmárselo uno mismo sería saltarse al
  // mostrador y vaciar el inventario desde el teléfono.
  await assertFails(updateDoc(doc(como('alumA'), 'ordenes/apartada1'), { estado: 'entregado' }))
  await assertFails(updateDoc(doc(como('alumA'), 'ordenes/apartada1'), { total: 0 }))
})

test('el alumno no toca el pedido de otro', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(updateDoc(doc(como('alumB'), 'ordenes/pedido1'), { estado: 'cancelado' }))
})

// ── 3. RECEPCIÓN CONFIRMA: AHÍ ENTRA EL DINERO ──────────────────────────────

test('recepción convierte un pedido en apartado CON precios', { skip }, async () => {
  await preparar()
  const { doc, setDoc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await setDoc(doc(como('alumA'), 'ordenes/porConfirmar'), pedidoDe('alumA'))
  // Reescribir líneas y total solo se puede desde `solicitado`: es exactamente
  // en lo que consiste confirmar.
  await assertSucceeds(updateDoc(doc(como('recA'), 'ordenes/porConfirmar'), {
    lineas: [{ articuloId: 'art1', nombre: 'Férula de vacío', precio: 450, cantidad: 1 }],
    total: 450,
    estado: 'apartado',
  }))
})

test('una vez apartado, líneas y total son inmutables', { skip }, async () => {
  await preparar()
  const { doc, updateDoc } = fsmod
  const { assertFails, assertSucceeds } = rut
  await assertFails(updateDoc(doc(como('recA'), 'ordenes/apartada1'), { total: 1 }))
  await assertFails(updateDoc(doc(como('recA'), 'ordenes/apartada1'), { lineas: [] }))
  // Cambiar de estado sí: es el flujo normal.
  await assertSucceeds(updateDoc(doc(como('recA'), 'ordenes/apartada1'), { estado: 'pagado' }))
})

// ── 4. EL CATÁLOGO ES DE LA DIRECCIÓN ───────────────────────────────────────

test('el director publica en SU catálogo', { skip }, async () => {
  await preparar()
  const { doc, setDoc, updateDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(setDoc(doc(como('dirA'), 'articulos/nuevo1'), ARTICULO))
  await assertSucceeds(updateDoc(doc(como('dirA'), 'articulos/art1'), { precio: 500 }))
  // Y el super-admin, en cualquiera: es la paridad que exige el proyecto.
  await assertSucceeds(setDoc(doc(como('super1'), 'articulos/nuevoSuper'), ARTICULO))
})

test('ni el alumno ni el profesor ni recepción publican artículos', { skip }, async () => {
  await preparar()
  const { doc, setDoc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(setDoc(doc(como('alumA'), 'articulos/deAlumno'), ARTICULO))
  await assertFails(setDoc(doc(como('profA'), 'articulos/deProfe'), ARTICULO))
  await assertFails(setDoc(doc(como('recA'), 'articulos/deRecepcion'), ARTICULO))
  // Y nadie de fuera cambia el precio.
  await assertFails(updateDoc(doc(como('alumA'), 'articulos/art1'), { precio: 1 }))
  await assertFails(updateDoc(doc(como('recA'), 'articulos/art1'), { precio: 1 }))
})

test('el catálogo no cruza de academia', { skip }, async () => {
  await preparar()
  const { doc, getDoc, setDoc, updateDoc } = fsmod
  const { assertFails } = rut
  await assertFails(getDoc(doc(como('alumB'), 'articulos/art1')))
  await assertFails(updateDoc(doc(como('dirB'), 'articulos/art1'), { precio: 1 }))
  await assertFails(setDoc(doc(como('dirB'), 'articulos/coladoEnA'), ARTICULO))
})

test('un artículo con forma inválida no llega al catálogo', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertFails } = rut
  // Este catálogo lo ven todos los alumnos de la academia a la vez.
  await assertFails(setDoc(doc(como('dirA'), 'articulos/malo1'), { ...ARTICULO, precio: '450' }))
  await assertFails(setDoc(doc(como('dirA'), 'articulos/malo2'), { ...ARTICULO, existencias: -1 }))
  await assertFails(setDoc(doc(como('dirA'), 'articulos/malo3'), { ...ARTICULO, nombre: '' }))
  await assertFails(setDoc(doc(como('dirA'), 'articulos/malo4'), {
    ...ARTICULO, imagen: 'javascript:alert(1)',
  }))
})

test('el alumno LEE el catálogo de su academia', { skip }, async () => {
  await preparar()
  const { doc, getDoc } = fsmod
  const { assertSucceeds } = rut
  await assertSucceeds(getDoc(doc(como('alumA'), 'articulos/art1')))
})
