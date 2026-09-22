// ============================================================
//  La ficha de persona — quién toca qué, y el «100 % de los sitios»
// ------------------------------------------------------------
//  DOS COSAS SE VIGILAN AQUÍ, y la segunda es la que se va a romper sola.
//
//  1. Los permisos. Se pidieron tres niveles: super-admin, director y
//     recepción, «pero recepción no debe poder ver NADA relacionado con
//     contraseñas». Eso no es «el botón deshabilitado»: es que el bloque no
//     exista.
//
//  2. La COBERTURA. Se pidió que la ficha se pueda abrir en el 100 % de los
//     sitios donde aparece una persona. Un requisito así no se cumple una vez:
//     se incumple el día que alguien añada la lista número dieciséis y no se
//     acuerde. Por eso la prueba recorre los archivos que pintan personas y
//     exige que usen `BotonPersona`. Si añades una lista nueva, añádela aquí;
//     si falla, es que le falta el enlace.
//
//  La lista de abajo salió de un inventario de `src/components` y `src/pages`
//  hecho el 20-09-2026. Las EXCEPCIONES están enumeradas con su motivo: son
//  sitios donde no hay uid que abrir, no sitios que se olvidaron.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import {
  CAMPOS_CONTACTO, CAMPOS_GESTION, CAMPOS_PLATAFORMA, cambiosDeFicha,
  estadoDeContrasena, parcheDeFicha, permisosDeFicha, problemasDeFicha,
  puedeAbrirFichas, valoresDeFicha,
} from '../src/lib/fichaUsuario.js'

const leer = (r) => readFileSync(new URL(r, import.meta.url), 'utf8')

const ALUMNA = { uid: 'a1', rol: 'alumno', academiaId: 'ACA', nombre: 'Ana', email: 'ana@x.mx', telefono: '2222256586', matricula: 'AC0000001', estado: 'activo', grupoId: 'G1' }
const PROFE = { uid: 'p1', rol: 'instructor', academiaId: 'ACA', nombre: 'Pablo', email: 'pablo@x.mx' }
const DIRECTOR = { uid: 'd1', rol: 'admin_escuela', academiaId: 'ACA', nombre: 'Diana', email: 'diana@x.mx' }
const DE_OTRA = { uid: 'z1', rol: 'alumno', academiaId: 'OTRA', nombre: 'Zoe', email: 'zoe@x.mx' }

const comoSuper = (objetivo) => permisosDeFicha({ rol: 'superadmin', esSuperadmin: true, miUid: 's1', miAcademiaId: null, objetivo })
const comoDirector = (objetivo) => permisosDeFicha({ rol: 'admin_escuela', miUid: 'd1', miAcademiaId: 'ACA', objetivo })
const comoRecepcion = (objetivo) => permisosDeFicha({ rol: 'recepcion', miUid: 'r1', miAcademiaId: 'ACA', objetivo })
const comoProfesor = (objetivo) => permisosDeFicha({ rol: 'instructor', miUid: 'p1', miAcademiaId: 'ACA', objetivo })

// ── RECEPCIÓN Y LAS CONTRASEÑAS ─────────────────────────────────────────────

test('recepción NO ve nada relacionado con contraseñas', () => {
  // Se pidió literalmente. `puedeContrasena` en false es lo que hace que el
  // modal no pinte ese bloque — no que lo pinte deshabilitado.
  const p = comoRecepcion(ALUMNA)
  assert.equal(p.puedeContrasena, false)
  assert.equal(estadoDeContrasena(ALUMNA, p).puede, false)
  assert.equal(estadoDeContrasena(ALUMNA, p).aviso, '',
    'ni siquiera un aviso: el bloque entero no existe para recepción')
})

test('el modal no pinta el bloque de contraseña sin permiso', () => {
  const MODAL = leer('../src/components/usuarios/FichaUsuarioModal.jsx')
  assert.match(MODAL, /\{permisos\.puedeContrasena && \(/,
    'el bloque de contraseña dejó de estar condicionado al permiso')
  // Y la capa de datos lo vuelve a comprobar: la pantalla no es la barrera.
  const DATOS = leer('../src/lib/firebase/fichaUsuario.js')
  assert.match(DATOS, /if \(!permisos\?\.puedeContrasena\) \{\s*\n\s*throw new Error/)
})

test('el super-admin y el director SÍ pueden restablecer', () => {
  assert.equal(comoSuper(ALUMNA).puedeContrasena, true)
  assert.equal(comoDirector(ALUMNA).puedeContrasena, true)
  assert.match(estadoDeContrasena(ALUMNA, comoDirector(ALUMNA)).aviso, /elija una contraseña nueva/)
})

test('sin correo o sin cuenta activada no se ofrece restablecer', () => {
  // Un enlace de restablecimiento necesita un buzón y una cuenta de Auth. Una
  // preinscripción no tiene ninguna de las dos.
  const sinCorreo = { ...ALUMNA, email: '' }
  assert.equal(estadoDeContrasena(sinCorreo, comoSuper(sinCorreo)).puede, false)
  const sinCuenta = { ...ALUMNA, uid: null, id: null }
  assert.match(estadoDeContrasena(sinCuenta, comoSuper(ALUMNA)).aviso, /invitación/)
})

// ── LOS TRES NIVELES ────────────────────────────────────────────────────────

test('recepción solo toca datos de CONTACTO, y solo de alumnos', () => {
  assert.deepEqual(comoRecepcion(ALUMNA).campos, CAMPOS_CONTACTO)
  for (const vetado of [...CAMPOS_GESTION, ...CAMPOS_PLATAFORMA]) {
    assert.equal(comoRecepcion(ALUMNA).campos.includes(vetado), false, `recepción alcanzó ${vetado}`)
  }
  // La ficha de un profesor o de un director se VE, pero no se edita.
  assert.equal(comoRecepcion(PROFE).puedeVer, true)
  assert.deepEqual(comoRecepcion(PROFE).campos, [])
  assert.match(comoRecepcion(PROFE).motivo, /solo se editan fichas de alumnos/)
})

test('el director toca contacto y gestión, nunca la plataforma', () => {
  const p = comoDirector(ALUMNA)
  for (const c of [...CAMPOS_CONTACTO, ...CAMPOS_GESTION]) assert.ok(p.campos.includes(c), `falta ${c}`)
  for (const c of CAMPOS_PLATAFORMA) {
    assert.equal(p.campos.includes(c), false,
      `el director alcanzó ${c}: mover a alguien de academia o reescribir una matrícula no es suyo`)
  }
  // Y no puede nombrar ni degradar a OTRO director. `DIRECTOR` es él mismo
  // (mismo uid), así que para probar esto hace falta un segundo: con el
  // primero se entraba por la rama de «a ti mismo» y la prueba comprobaba otra
  // cosa de la que creía.
  assert.deepEqual(p.rolesQuePuedeAsignar, ['alumno', 'instructor', 'recepcion'])
  const otroDirector = { ...DIRECTOR, uid: 'd2', nombre: 'Daniel' }
  assert.equal(comoDirector(otroDirector).campos.length, 0)
  assert.match(comoDirector(otroDirector).motivo, /Solo el super-admin/)
})

test('el super-admin lo toca todo, en cualquier academia', () => {
  const p = comoSuper(DE_OTRA)
  for (const c of [...CAMPOS_CONTACTO, ...CAMPOS_GESTION, ...CAMPOS_PLATAFORMA]) {
    assert.ok(p.campos.includes(c), `al super-admin le falta ${c}`)
  }
  assert.equal(p.puedeContrasena, true)
})

test('nadie se edita a sí mismo desde la ficha', () => {
  // Su sitio es «Mi cuenta». Cambiarse el rol desde aquí es la forma más fácil
  // de quedarse fuera de la propia consola.
  const superSobreSi = permisosDeFicha({ rol: 'superadmin', esSuperadmin: true, miUid: 's1', objetivo: { uid: 's1', rol: 'superadmin' } })
  assert.deepEqual(superSobreSi.campos, CAMPOS_CONTACTO, 'el super-admin pudo cambiarse el rol a sí mismo')
  const dirSobreSi = comoDirector(DIRECTOR)
  assert.equal(dirSobreSi.campos.length, 0)
})

test('nadie cruza de academia salvo el super-admin', () => {
  assert.equal(comoDirector(DE_OTRA).puedeVer, false)
  assert.equal(comoRecepcion(DE_OTRA).puedeVer, false)
  assert.match(comoDirector(DE_OTRA).motivo, /no pertenece a tu academia/)
})

test('un profesor no abre fichas', () => {
  // No es un olvido: no tiene ninguna escritura sobre el perfil de otra
  // persona salvo `modulosDesbloqueados`, que ya tiene su pantalla.
  assert.equal(comoProfesor(ALUMNA).puedeVer, false)
  assert.equal(puedeAbrirFichas({ rol: 'instructor' }), false)
  assert.equal(puedeAbrirFichas({ rol: 'alumno' }), false)
  for (const rol of ['admin_escuela', 'recepcion']) {
    assert.equal(puedeAbrirFichas({ rol }), true, `${rol} no puede abrir fichas`)
  }
  assert.equal(puedeAbrirFichas({ rol: 'alumno', esSuperadmin: true }), true)
})

// ── EL PARCHE Y LA VALIDACIÓN ───────────────────────────────────────────────

test('el parche lleva SOLO lo que cambió y SOLO lo permitido', () => {
  const permisos = comoRecepcion(ALUMNA)
  const valores = { ...valoresDeFicha(ALUMNA), telefono: '5512345678', rol: 'admin_escuela' }
  const parche = parcheDeFicha(ALUMNA, valores, permisos)
  assert.deepEqual(Object.keys(parche), ['telefono'],
    'se coló un campo que recepción no puede tocar')
  assert.equal(parche.telefono, '5512345678')
})

test('un grupo vacío se guarda como null, no como cadena vacía', () => {
  // El resto del sistema comprueba `!grupoId`, y una cadena vacía en Firestore
  // es un valor presente que rompe las consultas `where(… == null)`.
  const permisos = comoDirector(ALUMNA)
  const parche = parcheDeFicha(ALUMNA, { ...valoresDeFicha(ALUMNA), grupoId: '' }, permisos)
  assert.equal(parche.grupoId, null)
})

test('sin cambios no hay parche', () => {
  const permisos = comoSuper(ALUMNA)
  assert.deepEqual(cambiosDeFicha(ALUMNA, valoresDeFicha(ALUMNA), permisos), [])
  assert.deepEqual(parcheDeFicha(ALUMNA, valoresDeFicha(ALUMNA), permisos), {})
})

test('solo se valida lo que quien mira puede tocar', () => {
  // A recepción no se le exige una matrícula bien formada: no la puede
  // escribir, así que un error ahí no es suyo y bloquearle el guardado por eso
  // sería pedirle que arregle lo que no puede tocar.
  const rota = { ...valoresDeFicha(ALUMNA), matricula: 'basura' }
  assert.equal(problemasDeFicha(rota, comoRecepcion(ALUMNA)).length, 0)
  assert.match(problemasDeFicha(rota, comoSuper(ALUMNA)).join(' '), /dos letras y siete dígitos/)
})

test('el correo y el nombre se validan donde sí se editan', () => {
  const permisos = comoDirector(ALUMNA)
  assert.match(problemasDeFicha({ ...valoresDeFicha(ALUMNA), email: 'roto' }, permisos).join(' '), /correo/)
  assert.match(problemasDeFicha({ ...valoresDeFicha(ALUMNA), nombre: '  ' }, permisos).join(' '), /nombre/)
  assert.match(problemasDeFicha({ ...valoresDeFicha(ALUMNA), telefono: '123' }, permisos).join(' '), /teléfono/)
  assert.equal(problemasDeFicha(valoresDeFicha(ALUMNA), permisos).length, 0)
})

// ── LAS REGLAS LO IMPONEN EN EL SERVIDOR ────────────────────────────────────

const REGLAS = leer('../firestore.rules')

test('la regla del director incluye los campos de contacto', () => {
  // Hasta el 20-09-2026 un director no podía ni corregirle un apellido a
  // nadie: la lista blanca solo tenía rol, estado y grupo.
  assert.match(REGLAS, /hasOnly\(\['rol', 'estado', 'grupoId', 'grupoIds', 'puedeVerCodigos', 'matricula',\s*\n\s*'matriculasAnteriores', 'nombre', 'email', 'telefono', 'notaRecepcion'\]\)/)
  assert.match(REGLAS, /function datosDeContactoValidos\(\)/)
})

test('la matrícula y la academia siguen fuera del director', () => {
  const bloque = REGLAS.slice(REGLAS.indexOf('match /usuarios/'), REGLAS.indexOf('\n    }', REGLAS.indexOf('match /usuarios/')))
  const i = bloque.indexOf('allow update: if esAdminDe(resource.data.academiaId)')
  const regla = bloque.slice(i, bloque.indexOf('allow update', i + 20))
  assert.match(regla, /request\.resource\.data\.academiaId == resource\.data\.academiaId/,
    'el director puede mover a alguien de academia')
  // La matrícula ya no es de emisión ÚNICA (21-09-2026): se rehace al cambiar
  // de grupo, porque el grupo la dicta. Lo que sigue prohibido —y es lo que
  // importa— es reescribirla a secas, sin mover a nadie de sitio.
  assert.match(REGLAS, /function matriculaCoherente\(\)/)
  assert.match(regla, /matriculaCoherente\(\)/,
    'el director puede reescribir una matrícula sin que cambie de grupo')
})

// ── LA COBERTURA: EL «100 % DE LOS SITIOS» ──────────────────────────────────

/**
 * Archivos que pintan el nombre de una persona y DEBEN poder abrir su ficha.
 * Salido del inventario del 20-09-2026 sobre `src/components` y `src/pages`.
 */
const DEBEN_ABRIR_FICHA = [
  // Panel del director
  '../src/components/panel/GestionMiembros.jsx',
  '../src/components/panel/AvanceAlumnos.jsx',
  '../src/components/panel/SeguimientoAlumnos.jsx',
  '../src/components/panel/ModulosDeAlumno.jsx',
  '../src/components/panel/SolicitudesInternas.jsx',
  '../src/components/panel/SolicitudesDeAcceso.jsx',
  '../src/components/panel/Estadisticas.jsx',
  '../src/components/panel/GruposAcademia.jsx',
  '../src/components/PermisosEditoriales.jsx',
  '../src/components/ColaDictamenes.jsx',
  '../src/pages/panel/Calificaciones.jsx',
  '../src/pages/panel/Contenido.jsx',
  // Consola del super-admin
  '../src/pages/AdminPage.jsx',
  '../src/pages/admin/Logs.jsx',
  // Mostrador
  '../src/components/staff/PanelPadron.jsx',
  '../src/components/staff/BuscadorAlumno.jsx',
  '../src/components/staff/BandejaDeTienda.jsx',
  '../src/components/staff/PanelSolicitudes.jsx',
  '../src/components/staff/FichaAlumno.jsx',
]

test('todas las pantallas que pintan personas pueden abrir su ficha', () => {
  for (const ruta of DEBEN_ABRIR_FICHA) {
    const fuente = leer(ruta)
    assert.match(fuente, /import BotonPersona from/,
      `${ruta} pinta personas y no importa BotonPersona: ahí no se puede abrir la ficha`)
    assert.match(fuente, /<BotonPersona/,
      `${ruta} importa BotonPersona pero no lo usa`)
  }
})

test('la lista de cobertura no se vacía sin que se note', () => {
  // Sin esto, borrar entradas de DEBEN_ABRIR_FICHA dejaría la prueba en verde
  // sin comprobar nada. Diecinueve es lo que había el 20-09-2026.
  assert.ok(DEBEN_ABRIR_FICHA.length >= 19,
    `la lista bajó a ${DEBEN_ABRIR_FICHA.length}: ¿se quitó una pantalla o se olvidó?`)
})

/**
 * Las EXCEPCIONES, con su motivo. Están enumeradas para que se pueda discutir
 * cada una, y no escondidas en la ausencia de una prueba.
 */
const SIN_FICHA_Y_POR_QUE = {
  '../src/components/panel/AltaDeRecepcion.jsx':
    'el alta crea una invitación, no una cuenta: todavía no hay uid que abrir',
  '../src/components/staff/HojaImprimible.jsx':
    'recibe un documento ya serializado para imprimir; no tiene el objeto persona',
  '../src/components/staff/PanelCorte.jsx':
    'el detalle del corte identifica por matrícula, y el uid del pago puede ser null a propósito',
  '../src/pages/Cuenta.jsx':
    'son los perfiles recordados de ESTE dispositivo, guardados en local y sin uid',
}

test('las excepciones siguen siendo excepciones', () => {
  for (const [ruta, motivo] of Object.entries(SIN_FICHA_Y_POR_QUE)) {
    assert.ok(motivo.length > 20, `la excepción de ${ruta} no explica nada`)
    // Si alguna llega a poder abrir la ficha, se mueve a la lista de arriba.
    // Esta prueba avisa en vez de dejarlo a medias.
    const fuente = leer(ruta)
    if (/<BotonPersona/.test(fuente)) {
      assert.fail(`${ruta} ya abre fichas: muévelo a DEBEN_ABRIR_FICHA y quita su excepción`)
    }
  }
})

test('el botón decide persona a persona, no pantalla a pantalla', () => {
  // En la misma tabla, recepción abrirá la ficha de un alumno y no la de su
  // director. Un nombre que parece pulsable y no hace nada es peor que uno que
  // no lo parece.
  const BOTON = leer('../src/components/usuarios/BotonPersona.jsx')
  assert.match(BOTON, /permisosSobre\(persona\)/)
  assert.match(BOTON, /stopPropagation/,
    'sin esto, abrir la ficha desplegaría además el acordeón que la contiene')
})
