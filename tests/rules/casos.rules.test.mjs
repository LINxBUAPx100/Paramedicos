// ============================================================
//  Pruebas de REGLAS — escenarios del Modo llamada (05-10-2026)
// ------------------------------------------------------------
//  Lo que se protege: el personal de una academia escribe SUS escenarios; el
//  alumno solo lee los avalados de su academia; avalar deja la firma de
//  quien guarda. Sin emulador la suite se OMITE con el motivo.
// ============================================================
import { test, after } from 'node:test'
import { readFileSync } from 'node:fs'

const HOST = process.env.FIRESTORE_EMULATOR_HOST
let rut = null
try { rut = await import('@firebase/rules-unit-testing') } catch { /* se reporta vía skip */ }

const skip = !HOST
  ? 'Requiere el emulador de Firestore: npm run test:rules'
  : !rut ? 'Falta @firebase/rules-unit-testing' : false

let env = null
let fsmod = null

async function preparar() {
  if (env) return env
  fsmod = await import('firebase/firestore')
  env = await rut.initializeTestEnvironment({
    projectId: `${process.env.GCLOUD_PROJECT || 'ptem-rules-test'}-casos`,
    firestore: { rules: readFileSync(new URL('../../firestore.rules', import.meta.url), 'utf8') },
  })
  await env.withSecurityRulesDisabled(async (ctx) => {
    const db = ctx.firestore()
    const { doc, setDoc } = fsmod
    const pon = (r, d) => setDoc(doc(db, r), d)
    await pon('academias/ACA-A', { nombre: 'A', estado: 'activo', planComercial: 'pro' })
    await pon('academias/ACA-B', { nombre: 'B', estado: 'activo', planComercial: 'pro' })
    await pon('usuarios/dirA', { rol: 'admin_escuela', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/profA', { rol: 'instructor', academiaId: 'ACA-A', estado: 'activo' })
    await pon('usuarios/profB', { rol: 'instructor', academiaId: 'ACA-B', estado: 'activo' })
    await pon('usuarios/alumA', { rol: 'alumno', academiaId: 'ACA-A', grupoId: 'G1', estado: 'activo' })
    // Uno avalado y uno en borrador, ya existentes.
    const base = { academiaId: 'ACA-A', autorUid: 'profA', titulo: 'T', resumen: '', temas: ['m1-pab-dea'],
      fuentes: [{ nombre: 'F' }], signos: null, inicio: 'n1', nodos: { n1: { texto: 'x', fin: true, desenlace: 'favorable' } } }
    await pon('casos/avalado', { ...base, estado: 'validado', revision: { por: 'profA' }, actualizado: new Date() })
    await pon('casos/borrador', { ...base, estado: 'borrador', revision: null, actualizado: new Date() })
  })
  return env
}

const como = (uid) => env.authenticatedContext(uid).firestore()
after(async () => { if (env) await env.cleanup() })

const caso = (fs, extra = {}) => ({
  academiaId: 'ACA-A', autorUid: 'profA', titulo: 'Nuevo', resumen: '', estado: 'borrador',
  temas: ['m1-pab-dea'], fuentes: [{ nombre: 'F' }], signos: { fc: 100 }, inicio: 'n1',
  nodos: { n1: { texto: 'x', fin: true, desenlace: 'favorable' } }, revision: null,
  rol: 'tum', paciente: 'adulto', historia: 'Me duele el pecho.', testigos: '',
  actualizado: fs.serverTimestamp(), ...extra,
})

test('el profesor crea un escenario de SU academia, firmado por él', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(setDoc(doc(como('profA'), 'casos/c1'), caso(fsmod)))
  // No en otra academia, ni a nombre de otro autor.
  await assertFails(setDoc(doc(como('profB'), 'casos/c2'), caso(fsmod, { autorUid: 'profB' })))
  await assertFails(setDoc(doc(como('profA'), 'casos/c3'), caso(fsmod, { autorUid: 'dirA' })))
})

test('validar exige la firma de quien guarda', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(setDoc(doc(como('profA'), 'casos/v1'), caso(fsmod, { estado: 'validado', revision: { por: 'profA', comentario: 'ok' } })))
  await assertFails(setDoc(doc(como('profA'), 'casos/v2'), caso(fsmod, { estado: 'validado', revision: null })))
  await assertFails(setDoc(doc(como('profA'), 'casos/v3'), caso(fsmod, { estado: 'validado', revision: { por: 'dirA' } })))
})

test('rol y paciente solo con sus valores', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  await rut.assertFails(setDoc(doc(como('profA'), 'casos/r1'), caso(fsmod, { rol: 'medico' })))
  await rut.assertFails(setDoc(doc(como('profA'), 'casos/r2'), caso(fsmod, { paciente: 'anciano' })))
})

test('el alumno no escribe escenarios', { skip }, async () => {
  await preparar()
  const { doc, setDoc } = fsmod
  await rut.assertFails(setDoc(doc(como('alumA'), 'casos/a1'), caso(fsmod, { autorUid: 'alumA' })))
})

test('el alumno lee solo los avalados de su academia', { skip }, async () => {
  await preparar()
  const { doc, getDoc, collection, query, where, getDocs } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertSucceeds(getDoc(doc(como('alumA'), 'casos/avalado')))
  await assertFails(getDoc(doc(como('alumA'), 'casos/borrador')))
  await assertSucceeds(getDocs(query(collection(como('alumA'), 'casos'),
    where('academiaId', '==', 'ACA-A'), where('estado', 'in', ['validado', 'publicado']))))
  await assertFails(getDocs(query(collection(como('alumA'), 'casos'), where('academiaId', '==', 'ACA-A'))))
  // El personal de otra academia no los lee.
  await assertFails(getDoc(doc(como('profB'), 'casos/borrador')))
})

test('borra el director; el profesor solo lo suyo', { skip }, async () => {
  await preparar()
  const { doc, deleteDoc } = fsmod
  const { assertSucceeds, assertFails } = rut
  await assertFails(deleteDoc(doc(como('profB'), 'casos/borrador')))
  await assertSucceeds(deleteDoc(doc(como('dirA'), 'casos/borrador')))
})
