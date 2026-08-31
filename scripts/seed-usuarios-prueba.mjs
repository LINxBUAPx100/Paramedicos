// ============================================================
//  DOS academias de prueba — para poder mirar, y para probar el aislamiento
// ------------------------------------------------------------
//  Casi ninguna pantalla de PTEM se puede ver sin sesión: el panel, la consola,
//  el avance y los tutoriales exigen un usuario con rol y grupo. Hasta ahora
//  eso obligaba a elegir entre crear gente falsa en la academia real —que
//  aparecería en los listados de quien está trabajando— o no mirar.
//
//  Y hay una segunda razón, más importante: **el aislamiento entre academias
//  nunca se había ejercitado**. Con una sola academia, el código que separa a
//  una de otra no se ejecuta jamás, y esa separación es la promesa central del
//  producto el día que se venda a un tercero. Por eso se siembran DOS, cada una
//  con su propio programa y sus propios temas, con marcadores que permiten
//  detectar de inmediato si el contenido de una aparece en la otra.
//
//  DRY-RUN POR DEFECTO: sin --apply no escribe nada.
//  EXIGE EMULADOR: sin FIRESTORE_EMULATOR_HOST se niega, salvo --produccion.
//
//  Uso:
//    npm run emu                              (en otra terminal; necesita Java 21)
//    node scripts/seed-usuarios-prueba.mjs                (enseña qué haría)
//    node scripts/seed-usuarios-prueba.mjs --apply        (escribe)
//    node scripts/seed-usuarios-prueba.mjs --retirar --apply
//
//  Después, en el `.env` local:  VITE_FIREBASE_EMULADOR=1
//  Todas las contraseñas son `prueba123`.
// ============================================================
import { fichaAceptacion } from '../src/lib/terminosModelo.js'
import { VERSION_TERMINOS } from '../src/data/terminos.js'
import { cursoIdDe, temaDocIdEnCurso } from '../src/lib/contenidoModelo.js'

const PROYECTO_DEFAULT = 'ptem-a304f'
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
  console.log(`Dos academias de prueba — dry-run por defecto.

  --apply         ESCRIBE (sin esto solo se muestra el plan)
  --retirar       BORRA lo sembrado
  --produccion    permite escribir en producción (NO lo uses sin motivo)`)
  process.exit(0)
}

// ------------------------------------------------------------
//  Las dos academias
// ------------------------------------------------------------
//  Los MARCADORES del contenido son lo que hace útil la prueba: si en la
//  pantalla de un alumno de RESCATE aparece la palabra «MARCA-CRUZ-VERDE», el
//  aislamiento está roto, y se ve de un golpe sin comparar identificadores.
const ACADEMIAS = [
  {
    id: 'PRUEBA',
    nombre: 'Academia de Pruebas RESCATE',
    plantilla: 'tum-basico',
    marca: 'MARCA-RESCATE',
    grupos: [
      { id: 'pr-matutino', nombre: 'Matutino 2026' },
      { id: 'pr-sabatino', nombre: 'Sabatino 2026' },
    ],
    personas: [
      { uid: 'p-director', nombre: 'Diana Directora', correo: 'director@prueba.ptem',
        rol: 'admin_escuela', grupo: null, porQue: 'panel de academia completo' },
      { uid: 'p-profe-1', nombre: 'Pablo Profesor', correo: 'profe1@prueba.ptem',
        rol: 'instructor', grupo: 'pr-matutino',
        grupoIds: ['pr-matutino', 'pr-sabatino'], porQue: 'profesor con DOS grupos' },
      { uid: 'p-profe-2', nombre: 'Paula Ñuño Pérez', correo: 'profe2@prueba.ptem',
        rol: 'instructor', grupo: 'pr-sabatino', porQue: 'acentos y ñ en el orden' },
      { uid: 'p-profe-susp', nombre: 'Práxedes Suspendido', correo: 'profe-susp@prueba.ptem',
        rol: 'instructor', grupo: 'pr-matutino', estado: 'suspendido',
        porQue: 'NO debe salir en permisos de edición' },
      { uid: 'p-alumno-1', nombre: 'Ana Alumna', correo: 'alumno1@prueba.ptem',
        rol: 'alumno', grupo: 'pr-matutino', porQue: 'alumno normal' },
      { uid: 'p-alumno-2', nombre: 'álvaro alumno', correo: 'alumno2@prueba.ptem',
        rol: 'alumno', grupo: 'pr-matutino', porQue: 'minúsculas + acento inicial' },
      { uid: 'p-alumno-10', nombre: 'Alumno 10', correo: 'alumno10@prueba.ptem',
        rol: 'alumno', grupo: 'pr-sabatino', porQue: 'orden numérico: tras el 2' },
      { uid: 'p-alumno-2b', nombre: 'Alumno 2', correo: 'alumno2b@prueba.ptem',
        rol: 'alumno', grupo: 'pr-sabatino', porQue: 'orden numérico: antes del 10' },
      { uid: 'p-sin-grupo', nombre: 'Zoe Sin Grupo', correo: 'singrupo@prueba.ptem',
        rol: 'alumno', grupo: null, porQue: 'sin plan: no ve temario' },
      { uid: 'p-baja', nombre: 'Bruno Baja', correo: 'baja@prueba.ptem',
        rol: 'alumno', grupo: null, academiaId: null, estado: 'eliminado',
        porQue: 'dado de baja: solo con la casilla marcada' },
    ],
  },
  {
    id: 'CRUZVERDE',
    nombre: 'Academia Cruz Verde',
    plantilla: 'enf-basico',
    marca: 'MARCA-CRUZ-VERDE',
    grupos: [
      { id: 'cv-nocturno', nombre: 'Nocturno 2026' },
    ],
    personas: [
      { uid: 'c-director', nombre: 'Carlos Director Cruz Verde', correo: 'director@cruzverde.ptem',
        rol: 'admin_escuela', grupo: null, porQue: 'NO debe ver nada de PRUEBA' },
      { uid: 'c-profe', nombre: 'Carmen Profesora', correo: 'profe@cruzverde.ptem',
        rol: 'instructor', grupo: 'cv-nocturno', porQue: 'staff de la OTRA academia' },
      { uid: 'c-alumno', nombre: 'César Alumno', correo: 'alumno@cruzverde.ptem',
        rol: 'alumno', grupo: 'cv-nocturno', porQue: 'NO debe ver el temario de PRUEBA' },
    ],
  },
]

// El super-admin no pertenece a ninguna academia: las gestiona todas.
const SUPERADMIN = {
  uid: 'p-super', nombre: 'Sofía Superadmin', correo: 'super@prueba.ptem',
  rol: 'superadmin', grupo: null, academiaId: null, porQue: 'consola de plataforma',
}

// Dos temas por academia. Uno publicado y uno en borrador: el borrador no debe
// llegar al alumno ni siquiera dentro de su propia academia.
const TEMAS = [
  { id: 'tema-uno', titulo: 'Lección publicada', estado: 'publicado' },
  { id: 'tema-dos', titulo: 'Lección en borrador', estado: 'borrador' },
]

// ------------------------------------------------------------
//  Comprobaciones antes de tocar nada
// ------------------------------------------------------------
if (!EMULADOR && !PRODUCCION) {
  console.error(`
✗ No hay emulador y no se ha pasado --produccion.

  Este script crea academias y personas. Hacerlo en producción llenaría los
  listados de quien está trabajando ahora mismo, así que por defecto se niega.

  Arranca el emulador en otra terminal:

    npm run emu

  y vuelve a ejecutar esto con las variables del emulador. Ver el README de la
  sección «Pruebas» o el encabezado de este archivo.
`)
  process.exit(1)
}

if (PRODUCCION && !EMULADOR) {
  console.warn('\n⚠  MODO PRODUCCIÓN: se van a crear academias reales en', PROYECTO, '\n')
}

const personasDe = (a) => a.personas
const todasLasPersonas = [SUPERADMIN, ...ACADEMIAS.flatMap(personasDe)]

console.log('Academias de prueba')
console.log(`  proyecto: ${PROYECTO}`)
console.log(`  destino:  ${EMULADOR ? `EMULADOR (${EMULADOR})` : 'PRODUCCIÓN'}`)
console.log(`  auth:     ${EMULADOR_AUTH || '(no declarado)'}`)
console.log(`  modo:     ${RETIRAR ? 'RETIRAR' : 'SEMBRAR'} · ${APPLY ? 'APPLY (escribe)' : 'dry-run'}\n`)

if (!RETIRAR) {
  for (const a of ACADEMIAS) {
    console.log(`  ${a.id} — ${a.nombre}`)
    console.log(`    programa: ${a.plantilla} · marcador de contenido: ${a.marca}`)
    console.log(`    grupos:   ${a.grupos.map((g) => g.nombre).join(', ')}`)
    for (const p of a.personas) {
      const estado = p.estado ? ` [${p.estado}]` : ''
      console.log(`    · ${p.nombre.padEnd(26)} ${String(p.rol).padEnd(14)}${estado.padEnd(14)} ${p.porQue}`)
    }
    console.log('')
  }
  console.log(`  ${SUPERADMIN.nombre} (${SUPERADMIN.correo}) — ${SUPERADMIN.porQue}\n`)
  console.log(`  Contraseña de todos: ${PASSWORD}`)
  console.log(`
  PARA QUÉ SIRVE LA SEGUNDA: el aislamiento entre academias nunca se había
  ejercitado, porque con una sola no se ejecuta. Si en una pantalla de
  ${ACADEMIAS[0].id} aparece «${ACADEMIAS[1].marca}» (o al revés), está roto.`)
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

async function crearPersona(p, academiaId) {
  try {
    await auth.createUser({
      uid: p.uid, email: p.correo, password: PASSWORD, displayName: p.nombre,
    })
  } catch (err) {
    if (err?.code === 'auth/uid-already-exists' || err?.code === 'auth/email-already-exists') {
      await auth.updateUser(p.uid, { email: p.correo, password: PASSWORD, displayName: p.nombre })
    } else throw err
  }

  const perfil = {
    nombre: p.nombre,
    correo: p.correo,
    email: p.correo,
    rol: p.rol,
    // Una cuenta dada de baja NO conserva academia ni grupo: se los quita la
    // baja, y sembrarla con ellos crearía un estado que no existe.
    academiaId: p.academiaId === null ? null : (p.academiaId || academiaId),
    grupoId: p.grupo ?? null,
    estado: p.estado || 'activo',
    // Los términos ya aceptados, con la VERSIÓN vigente: con una antigua la
    // puerta vuelve a salir y no se llega a ver la pantalla que se buscaba.
    terminos: fichaAceptacion(new Date(), VERSION_TERMINOS),
    creado: FieldValue.serverTimestamp(),
  }
  if (p.grupoIds) perfil.grupoIds = p.grupoIds
  await db.doc(`usuarios/${p.uid}`).set(perfil, { merge: true })
}

async function sembrar() {
  for (const a of ACADEMIAS) {
    await db.doc(`academias/${a.id}`).set({
      nombre: a.nombre, estado: 'activo', plan: 'PRO', tipo: 'academia',
      // `contenido.estado` DECIDE DE DÓNDE SE LEE, y su defecto es peligroso:
      // sin este campo vale `legacy`, y legacy significa «sírvele el bundle».
      // El bundle es el temario de R.E.S.C.A.T.E., así que una academia recién
      // creada y sin migrar recibe el material de otra academia como si fuera
      // el suyo. Sembrar sin esto era reproducir el fallo, no probarlo.
      contenido: { estado: 'migrado', migradoEn: FieldValue.serverTimestamp() },
      creado: FieldValue.serverTimestamp(),
    }, { merge: true })

    // El PROGRAMA de la academia. Su id es lo que apunta `grupos.programaId`.
    const cursoId = cursoIdDe(a.id, a.plantilla)
    await db.doc(`cursos/${cursoId}`).set({
      academiaId: a.id,
      titulo: `${a.nombre} — programa de prueba`,
      estado: 'publicado',
      version: 1,
      plantillaOrigenId: null,
      creado: FieldValue.serverTimestamp(),
    }, { merge: true })

    // Sus temas, con el MARCADOR dentro del texto.
    for (const t of TEMAS) {
      await db.doc(`temas/${temaDocIdEnCurso(cursoId, t.id)}`).set({
        academiaId: a.id,
        cursoId,
        temaId: t.id,
        titulo: `${t.titulo} de ${a.nombre}`,
        estado: t.estado,
        estadoEditorial: t.estado === 'publicado' ? 'publicado' : 'borrador',
        propietario: 'rescate',
        resumen: `Contenido exclusivo de ${a.id}. ${a.marca}`,
        secciones: [{
          titulo: 'Sección de prueba',
          bloques: [{ tipo: 'p', texto: `Este texto solo debe verse en ${a.id}: ${a.marca}` }],
        }],
        creado: FieldValue.serverTimestamp(),
      }, { merge: true })
    }

    for (const g of a.grupos) {
      await db.doc(`grupos/${g.id}`).set({
        academiaId: a.id, nombre: g.nombre, programaId: cursoId,
        estado: 'activo', creado: FieldValue.serverTimestamp(),
      }, { merge: true })
    }

    for (const p of a.personas) await crearPersona(p, a.id)
    console.log(`  ✓ ${a.id}: 1 programa, ${TEMAS.length} temas, ${a.grupos.length} grupos, ${a.personas.length} personas`)
  }

  await crearPersona(SUPERADMIN, null)
  console.log(`  ✓ super-admin: ${SUPERADMIN.correo}`)

  console.log(`\n  Listo. Entra con cualquiera de esos correos y "${PASSWORD}".`)
  console.log('  Recuerda VITE_FIREBASE_EMULADOR=1 en tu .env y reiniciar `npm run dev`.\n')
}

async function retirar() {
  for (const p of todasLasPersonas) {
    await db.doc(`usuarios/${p.uid}`).delete().catch(() => {})
    await auth.deleteUser(p.uid).catch(() => {})
  }
  for (const a of ACADEMIAS) {
    const cursoId = cursoIdDe(a.id, a.plantilla)
    for (const t of TEMAS) {
      await db.doc(`temas/${temaDocIdEnCurso(cursoId, t.id)}`).delete().catch(() => {})
    }
    await db.doc(`cursos/${cursoId}`).delete().catch(() => {})
    for (const g of a.grupos) await db.doc(`grupos/${g.id}`).delete().catch(() => {})
    await db.doc(`academias/${a.id}`).delete().catch(() => {})
    console.log(`  ✓ retirada ${a.id}`)
  }
  console.log('\n  Retirado todo.\n')
}

await (RETIRAR ? retirar() : sembrar())
process.exit(0)
