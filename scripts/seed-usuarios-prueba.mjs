// ============================================================
//  Usuarios de PRUEBA — una academia completa para poder mirar
// ------------------------------------------------------------
//  Casi ninguna pantalla de PTEM se puede ver sin sesión: el panel, la consola,
//  el avance y los tutoriales exigen un usuario con rol y grupo. Hasta ahora
//  eso obligaba a elegir entre crear gente falsa en la academia real —que
//  aparecería en los listados de quien está trabajando— o no mirar.
//
//  Este script siembra un juego completo en el EMULADOR: una academia, dos
//  grupos y once personas que cubren los casos que de verdad se rompen.
//
//  DRY-RUN POR DEFECTO: sin --apply no escribe nada.
//  EXIGE EMULADOR: sin FIRESTORE_EMULATOR_HOST se niega, salvo --produccion.
//
//  Uso:
//    npx firebase-tools@15 emulators:start --only auth,firestore --project ptem-a304f
//    node scripts/seed-usuarios-prueba.mjs                (enseña qué haría)
//    node scripts/seed-usuarios-prueba.mjs --apply        (escribe)
//    node scripts/seed-usuarios-prueba.mjs --retirar --apply
//
//  Después, en el `.env` local:  VITE_FIREBASE_EMULADOR=1
//  Todas las contraseñas son `prueba123`.
// ============================================================
import { fichaAceptacion } from '../src/lib/terminosModelo.js'
import { VERSION_TERMINOS } from '../src/data/terminos.js'

const PROYECTO_DEFAULT = 'ptem-a304f'
const ACADEMIA = 'PRUEBA'
const PASSWORD = 'prueba123'

const args = process.argv.slice(2)
const flag = (n) => args.includes(`--${n}`)
const APPLY = flag('apply')
const RETIRAR = flag('retirar')
const PRODUCCION = flag('produccion')
const EMULADOR = process.env.FIRESTORE_EMULATOR_HOST || null
const EMULADOR_AUTH = process.env.FIREBASE_AUTH_EMULATOR_HOST || null
const PROYECTO = process.env.FIREBASE_PROJECT_ID || process.env.GCLOUD_PROJECT || PROYECTO_DEFAULT

if (flag('help') || flag('h')) {
  console.log(`Usuarios de prueba — dry-run por defecto.

  --apply         ESCRIBE (sin esto solo se muestra el plan)
  --retirar       BORRA lo sembrado
  --produccion    permite escribir en producción (NO lo uses sin motivo)`)
  process.exit(0)
}

// ------------------------------------------------------------
//  El elenco
// ------------------------------------------------------------
//  No son once nombres al azar: cada uno existe para que una pantalla concreta
//  tenga algo que enseñar. Los estados raros —suspendido, dado de baja, sin
//  grupo, prueba vencida— son justamente los que descubren los fallos, y los
//  que no se pueden reproducir con una cuenta normal.
const GRUPOS = [
  { id: 'grupo-matutino', nombre: 'Matutino 2026', programaId: 'curso-tum' },
  { id: 'grupo-sabatino', nombre: 'Sabatino 2026', programaId: 'curso-tum' },
]

const PERSONAS = [
  { uid: 'p-super', nombre: 'Sofía Superadmin', email: 'super@prueba.ptem',
    rol: 'superadmin', grupoId: null, porQue: 'consola de plataforma' },
  { uid: 'p-director', nombre: 'Diana Directora', email: 'director@prueba.ptem',
    rol: 'admin_escuela', grupoId: null, porQue: 'panel de academia completo' },
  { uid: 'p-profe-1', nombre: 'Pablo Profesor', email: 'profe1@prueba.ptem',
    rol: 'instructor', grupoId: 'grupo-matutino',
    grupoIds: ['grupo-matutino', 'grupo-sabatino'], porQue: 'profesor con DOS grupos' },
  { uid: 'p-profe-2', nombre: 'Paula Ñuño Pérez', email: 'profe2@prueba.ptem',
    rol: 'instructor', grupoId: 'grupo-sabatino', porQue: 'acentos y ñ en el orden' },
  { uid: 'p-profe-susp', nombre: 'Práxedes Suspendido', email: 'profe-susp@prueba.ptem',
    rol: 'instructor', grupoId: 'grupo-matutino', estado: 'suspendido',
    porQue: 'NO debe salir en permisos de edición' },
  { uid: 'p-alumno-1', nombre: 'Ana Alumna', email: 'alumno1@prueba.ptem',
    rol: 'alumno', grupoId: 'grupo-matutino', porQue: 'alumno normal' },
  { uid: 'p-alumno-2', nombre: 'álvaro alumno', email: 'alumno2@prueba.ptem',
    rol: 'alumno', grupoId: 'grupo-matutino', porQue: 'minúsculas + acento inicial' },
  { uid: 'p-alumno-10', nombre: 'Alumno 10', email: 'alumno10@prueba.ptem',
    rol: 'alumno', grupoId: 'grupo-sabatino', porQue: 'orden numérico: va tras el 2' },
  { uid: 'p-alumno-2b', nombre: 'Alumno 2', email: 'alumno2b@prueba.ptem',
    rol: 'alumno', grupoId: 'grupo-sabatino', porQue: 'orden numérico: va antes del 10' },
  { uid: 'p-sin-grupo', nombre: 'Zoe Sin Grupo', email: 'singrupo@prueba.ptem',
    rol: 'alumno', grupoId: null, porQue: 'alumno sin plan: no ve temario' },
  { uid: 'p-baja', nombre: 'Bruno Baja', email: 'baja@prueba.ptem',
    rol: 'alumno', grupoId: null, academiaId: null, estado: 'eliminado',
    porQue: 'dado de baja: solo con la casilla marcada' },
]

// ------------------------------------------------------------
//  Comprobaciones antes de tocar nada
// ------------------------------------------------------------
if (!EMULADOR && !PRODUCCION) {
  console.error(`
✗ No hay emulador y no se ha pasado --produccion.

  Este script crea personas. Hacerlo en la academia real llenaría los listados
  de quien está trabajando ahora mismo, así que por defecto se niega.

  Arranca el emulador en otra terminal:

    npx firebase-tools@15 emulators:start --only auth,firestore --project ${PROYECTO}

  y vuelve a ejecutar esto.
`)
  process.exit(1)
}

if (PRODUCCION && !EMULADOR) {
  console.warn('\n⚠  MODO PRODUCCIÓN: se van a crear personas reales en', PROYECTO, '\n')
}

console.log(`Usuarios de prueba en la academia "${ACADEMIA}"`)
console.log(`  proyecto: ${PROYECTO}`)
console.log(`  destino:  ${EMULADOR ? `EMULADOR (${EMULADOR})` : 'PRODUCCIÓN'}`)
console.log(`  auth:     ${EMULADOR_AUTH || '(no declarado)'}`)
console.log(`  modo:     ${RETIRAR ? 'RETIRAR' : 'SEMBRAR'} · ${APPLY ? 'APPLY (escribe)' : 'dry-run'}\n`)

if (!RETIRAR) {
  console.log('  Se crearán:')
  console.log(`    · 1 academia (${ACADEMIA}) y ${GRUPOS.length} grupos`)
  for (const p of PERSONAS) {
    const estado = p.estado ? ` [${p.estado}]` : ''
    console.log(`    · ${p.nombre.padEnd(22)} ${String(p.rol).padEnd(14)}${estado.padEnd(14)} ${p.porQue}`)
  }
  console.log(`\n  Contraseña de todos: ${PASSWORD}`)
}

if (!APPLY) {
  console.log('\n  DRY-RUN: no se ha escrito nada. Añade --apply para aplicarlo.\n')
  process.exit(0)
}

// ------------------------------------------------------------
//  Escritura
// ------------------------------------------------------------
let adminApp, adminFirestore, adminAuth
try {
  adminApp = await import('firebase-admin/app')
  adminFirestore = await import('firebase-admin/firestore')
  adminAuth = await import('firebase-admin/auth')
} catch {
  console.error('✗ Falta firebase-admin. Instálalo con:  npm i -D firebase-admin')
  process.exit(1)
}

const opciones = { projectId: PROYECTO }
if (!EMULADOR) opciones.credential = adminApp.applicationDefault()
const app = adminApp.getApps().length ? adminApp.getApp() : adminApp.initializeApp(opciones)
const db = adminFirestore.getFirestore(app)
const auth = adminAuth.getAuth(app)

const { FieldValue } = adminFirestore

async function sembrar() {
  await db.doc(`academias/${ACADEMIA}`).set({
    nombre: 'Academia de Pruebas',
    estado: 'activo',
    plan: 'PRO',
    tipo: 'academia',
    creado: FieldValue.serverTimestamp(),
  }, { merge: true })
  console.log(`  ✓ academia ${ACADEMIA}`)

  for (const g of GRUPOS) {
    await db.doc(`grupos/${g.id}`).set({
      academiaId: ACADEMIA, nombre: g.nombre, programaId: g.programaId,
      estado: 'activo', creado: FieldValue.serverTimestamp(),
    }, { merge: true })
    console.log(`  ✓ grupo ${g.nombre}`)
  }

  for (const p of PERSONAS) {
    // Auth primero: sin registro no hay con qué iniciar sesión, y el perfil de
    // Firestore solo/ sin cuenta es exactamente el estado «no encontramos tu
    // perfil» que la aplicación enseña como error.
    try {
      await auth.createUser({
        uid: p.uid, email: p.email, password: PASSWORD, displayName: p.nombre,
      })
    } catch (err) {
      if (err?.code === 'auth/uid-already-exists' || err?.code === 'auth/email-already-exists') {
        await auth.updateUser(p.uid, { email: p.email, password: PASSWORD, displayName: p.nombre })
      } else throw err
    }

    const perfil = {
      nombre: p.nombre,
      email: p.email,
      rol: p.rol,
      // Una cuenta dada de baja NO conserva academia ni grupo: se los quita la
      // baja, y sembrarla con ellos crearía un estado que no existe.
      academiaId: p.academiaId === null ? null : (p.academiaId || ACADEMIA),
      grupoId: p.grupoId ?? null,
      estado: p.estado || 'activo',
      // Los términos ya aceptados: sin esto, cada cuenta de prueba abre con la
      // puerta de aceptación y no se llega a ver la pantalla que se quería ver.
      // La forma la decide `lib/terminosModelo.js` (fichaAceptacion) y la
      // VERSIÓN tiene que ser la vigente: con una antigua, la puerta vuelve a
      // salir, que es justo lo que hace bien cuando los términos cambian.
      terminos: fichaAceptacion(new Date(), VERSION_TERMINOS),
      creado: FieldValue.serverTimestamp(),
    }
    if (p.grupoIds) perfil.grupoIds = p.grupoIds
    await db.doc(`usuarios/${p.uid}`).set(perfil, { merge: true })
    console.log(`  ✓ ${p.email.padEnd(26)} ${p.rol}`)
  }

  console.log(`\n  Listo. Entra con cualquiera de esos correos y "${PASSWORD}".`)
  console.log('  Recuerda poner VITE_FIREBASE_EMULADOR=1 en tu .env y reiniciar `npm run dev`.\n')
}

async function retirar() {
  for (const p of PERSONAS) {
    await db.doc(`usuarios/${p.uid}`).delete().catch(() => {})
    await auth.deleteUser(p.uid).catch(() => {})
    console.log(`  ✓ retirado ${p.email}`)
  }
  for (const g of GRUPOS) await db.doc(`grupos/${g.id}`).delete().catch(() => {})
  await db.doc(`academias/${ACADEMIA}`).delete().catch(() => {})
  console.log('\n  Retirado todo.\n')
}

await (RETIRAR ? retirar() : sembrar())
process.exit(0)
