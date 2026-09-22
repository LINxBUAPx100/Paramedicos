// ============================================================
//  Recepción no puede leer el temario — y esto lo vigila
// ------------------------------------------------------------
//  EL ERROR QUE ESTA PRUEBA EXISTE PARA IMPEDIR está escrito desde antes de
//  que el rol existiera, en el plan técnico:
//
//    «`esStaffDe()` hoy significa instructor o director, y con eso se abre la
//     lectura de `temas`, `cursos` y `dictamenes`. Meter `recepcion` dentro de
//     `esStaffDe()` le regalaría el temario completo.»
//
//  Es un cambio de UNA palabra —añadir 'recepcion' a un `||`— que parece un
//  arreglo razonable cuando algo se deniega, y que entrega el contenido entero
//  de la academia a la persona del mostrador. Por eso se comprueba sobre el
//  TEXTO de las reglas: es lo único que se puede verificar sin emulador, y el
//  emulador exige Java y credenciales que no siempre están.
//
//  NO SUSTITUYE a una prueba contra el emulador (`npm run test:rules`), y
//  decirlo importa: esto demuestra que las reglas están ESCRITAS como se
//  decidió, no que Firestore las aplique así. Las dos cosas hacen falta.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const leer = (r) => readFileSync(new URL(r, import.meta.url), 'utf8')
const REGLAS = leer('../firestore.rules')
const ROLES = leer('../src/lib/roles.js')
const EDICION = leer('../src/lib/staff/edicionPerfil.js')
const APP = leer('../src/App.jsx')
const LAYOUT = leer('../src/components/Layout.jsx')
const PROGRAMAS = leer('../src/lib/programasModelo.js')
const SHELL = leer('../src/components/staff/StaffShell.jsx')

/** El cuerpo de una función de las reglas, para mirarla sola. */
function cuerpoDe(nombre) {
  const i = REGLAS.indexOf(`function ${nombre}(`)
  assert.notEqual(i, -1, `no existe la función ${nombre}() en firestore.rules`)
  const fin = REGLAS.indexOf('\n    }', i)
  return REGLAS.slice(i, fin)
}

/** El bloque `match /coleccion/...` completo. */
function bloqueDe(coleccion) {
  const i = REGLAS.indexOf(`match /${coleccion}/`)
  assert.notEqual(i, -1, `no hay reglas para la colección ${coleccion}`)
  const fin = REGLAS.indexOf('\n    }', i)
  return REGLAS.slice(i, fin)
}

// ── LA LÍNEA QUE NO SE CRUZA ────────────────────────────────────────────────

test('`recepcion` NO está dentro de esStaffDe()', () => {
  // Si esta prueba falla, recepción acaba de recibir el temario completo.
  assert.doesNotMatch(cuerpoDe('esStaffDe'), /recepcion/,
    'se metió el rol de recepción dentro de esStaffDe(): eso le abre temas, cursos y dictámenes')
})

test('recepción tiene predicado PROPIO, y exige su academia', () => {
  const f = cuerpoDe('esRecepcionDe')
  assert.match(f, /rol', ''\) == 'recepcion'/)
  assert.match(f, /academiaId', null\) == acaId/,
    'esRecepcionDe dejó de atar a la persona a SU academia')
  assert.match(f, /!pruebaVencida\(\)/,
    'una prueba vencida seguiría atendiendo el mostrador')
})

test('el temario sigue cerrado para recepción', () => {
  // Las tres colecciones que nombra el aviso del plan, más los intentos.
  for (const coleccion of ['temas', 'cursos', 'dictamenes']) {
    assert.doesNotMatch(bloqueDe(coleccion), /esRecepcionDe/,
      `la colección ${coleccion} se abrió a recepción`)
  }
})

// ── LO QUE SÍ SE LE ABRE, Y NADA MÁS ────────────────────────────────────────

test('recepción alcanza exactamente las colecciones del mostrador', () => {
  for (const coleccion of ['usuarios', 'asistencias', 'pagos', 'ordenes', 'articulos', 'contadores', 'grupos', 'historial']) {
    assert.match(bloqueDe(coleccion), /esRecepcionDe|enMostradorDe/,
      `recepción no puede operar ${coleccion}`)
  }
})

test('el mostrador excluye al PROFESOR', () => {
  // Cobrar y editar fichas no es trabajo de un profesor, y sus reglas de
  // `pagos` nunca se lo permitieron.
  assert.match(cuerpoDe('enMostradorDe'), /esSuper\(\) \|\| esAdminDe\(acaId\) \|\| esRecepcionDe\(acaId\)/)
  assert.doesNotMatch(cuerpoDe('enMostradorDe'), /esStaffDe/,
    'enMostradorDe() dejó entrar a los profesores')
})

// ── LA EDICIÓN DE FICHA ─────────────────────────────────────────────────────

test('la regla y el código listan LOS MISMOS campos editables', () => {
  // Dos listas que se separan producen el peor de los fallos: un campo que la
  // pantalla ofrece y el servidor deniega, con cara de problema de permisos.
  const enCodigo = [...EDICION.matchAll(/^\s*id: '([a-zA-Z]+)',$/gm)].map((m) => m[1])
  const bloque = bloqueDe('usuarios')
  // `matricula` y `matriculasAnteriores` entran el 21-09-2026 y NO son
  // campos editables: los escribe el sistema cuando el mismo parche cambia de
  // grupo, y lo que los acota es matriculaCoherente(), no esta lista.
  const regla = /hasOnly\(\['nombre', 'email', 'telefono', 'grupoId', 'notaRecepcion',\s*\n\s*'matricula', 'matriculasAnteriores'\]\)/
  assert.match(bloque, regla, 'cambió la lista blanca de recepción en firestore.rules')
  for (const campo of ['nombre', 'email', 'telefono', 'grupoId', 'notaRecepcion']) {
    assert.ok(enCodigo.includes(campo), `${campo} está en la regla pero no en CAMPOS_EDITABLES`)
  }
})

test('los tres campos vetados siguen vetados en el servidor', () => {
  const bloque = bloqueDe('usuarios')
  // Se busca el `allow update` DE RECEPCIÓN, no la primera mención del
  // predicado: la de arriba es el `allow read`, que no concede escritura.
  const i = bloque.indexOf('allow update: if esRecepcionDe(')
  assert.notEqual(i, -1, 'desapareció la regla de edición de recepción')
  const siguiente = bloque.indexOf('allow update', i + 20)
  const reglaDeRecepcion = bloque.slice(i, siguiente === -1 ? undefined : siguiente)
  // Eran cuatro; desde el 21-09-2026 son TRES. La matrícula sí viaja en el
  // parche de recepción, pero solo dentro de un cambio de grupo y con la forma
  // que exige matriculaCoherente(): sigue sin poder teclearse, que es lo que
  // esta prueba defiende. El rol, el estado y la academia no se mueven.
  for (const campo of ['rol', 'estado', 'academiaId']) {
    assert.doesNotMatch(reglaDeRecepcion, new RegExp(`hasOnly\\(\\[[^\\]]*'${campo}'`),
      `recepción puede escribir ${campo}: eso no es lo que se decidió`)
  }
  assert.match(reglaDeRecepcion, /matriculaCoherente\(\)/,
    'recepción escribe la matrícula sin que nada acote cuándo ni con qué forma')
  // Y solo sobre alumnos.
  assert.match(reglaDeRecepcion, /resource\.data\.get\('rol', 'alumno'\) == 'alumno'/,
    'recepción puede editar la ficha de un profesor o de su director')
})

// ── LA MISMA RECEPCIÓN PARA LOS TRES ROLES ──────────────────────────────────
//
//  Se pidió el 21-09-2026: «la vista de recepción debe ser 100 % igual para el
//  superadmin o el director». Hasta entonces los dos tenían SOLO el formulario
//  de alta, así que no podían buscar a nadie, ni cobrar una mensualidad, ni
//  entregar material desde su propia pantalla.

const PANEL_RECEPCION = leer('../src/pages/panel/Recepcion.jsx')
const CONSOLA_RECEPCION = leer('../src/pages/admin/academia/Recepcion.jsx')
const PANEL_CAJA = leer('../src/components/staff/PanelCaja.jsx')
const CAJA = leer('../src/lib/firebase/staff/caja.js')

test('director y super-admin montan EL MISMO mostrador, no una copia', () => {
  for (const [nombre, pagina] of [['panel', PANEL_RECEPCION], ['consola', CONSOLA_RECEPCION]]) {
    assert.match(pagina, /import StaffShell from/, `la recepción del ${nombre} no monta StaffShell`)
    assert.match(pagina, /<StaffShell/, `la recepción del ${nombre} no pinta el mostrador`)
    assert.doesNotMatch(pagina, /<AltaDeRecepcion/,
      `la recepción del ${nombre} volvió a ser solo el formulario de alta`)
  }
})

test('SOLO dirección y super-admin corrigen el concepto de un pago', () => {
  // Recepción no: quien se equivoca al teclearlo no se corrige a sí mismo sin
  // que nadie lo vea.
  for (const pagina of [PANEL_RECEPCION, CONSOLA_RECEPCION]) {
    assert.match(pagina, /puedeCorregirPagos/)
  }
  const STAFF = leer('../src/pages/staff/Recepcion.jsx')
  assert.match(STAFF, /puedeCorregirPagos=\{rol === 'admin_escuela' \|\| esSuperadmin\}/,
    'la pantalla de recepción se lo concede al rol recepcion')
  assert.match(PANEL_CAJA, /puedeCorregirPagos \? \(/,
    'el selector de concepto se pinta para cualquiera')
})

test('EL DINERO DE UN PAGO SIGUE SIENDO INMUTABLE', () => {
  // Esta es la prueba que impide que «ya que se puede editar el concepto» se
  // convierta en «ya que se puede editar el pago». El importe, el método, la
  // matrícula y la fecha son la prueba con la que se cuadra una caja.
  const b = bloqueDe('pagos')
  const i = b.indexOf('allow update:')
  const regla = b.slice(i, b.indexOf('allow delete', i))
  assert.match(regla, /esSuper\(\) \|\| esAdminDe\(resource\.data\.academiaId\)/,
    'la corrección del concepto dejó de ser solo de dirección')
  assert.match(regla, /hasOnly\(\['concepto', 'conceptoCorregidoPor', 'conceptoCorregido'\]\)/,
    'por la puerta del concepto cabe ahora otro campo del pago')
  for (const campo of ['monto', 'metodo', 'matricula']) {
    assert.doesNotMatch(regla, new RegExp(`hasOnly\\(\\[[^\\]]*'${campo}'`),
      `un ${campo} ya registrado se puede reescribir: con eso no se cuadra ninguna caja`)
  }
  assert.match(regla, /conceptoCorregidoPor', ''\) == request\.auth\.uid/,
    'se puede corregir un pago firmando con el uid de otra persona')
})

test('corregir un concepto deja rastro y valida el catálogo', () => {
  assert.match(CAJA, /export async function corregirConcepto/)
  assert.match(CAJA, /if \(!esConcepto\(concepto\)\)/,
    'se puede escribir cualquier cadena como concepto de un pago')
  assert.match(CAJA, /accion: 'corregir-concepto-pago'/,
    'la corrección no deja línea de auditoría')
  // La línea de auditoría SÍ copia el importe —se lee meses después y resolver
  // un pago entonces costaría otra lectura—; lo que no puede tocarlo es la
  // ESCRITURA. Se mira exactamente esa.
  const escritura = CAJA.slice(
    CAJA.indexOf("updateDoc(doc(db, 'pagos'"),
    CAJA.indexOf('registrarSinRomper', CAJA.indexOf('corregirConcepto')))
  for (const campo of ['monto', 'metodo', 'matricula', 'fecha']) {
    assert.ok(!escritura.includes(campo), `la corrección del concepto escribe ${campo}`)
  }
})

// ── ASISTENCIAS ─────────────────────────────────────────────────────────────

test('la asistencia exige `expira`, y posterior a `inicio`', () => {
  // «En clase» se deriva de esa marca: sin ella, el dato no significa nada.
  const b = bloqueDe('asistencias')
  assert.match(b, /expira is timestamp/)
  assert.match(b, /expira > request\.resource\.data\.inicio/)
})

test('el id de la asistencia tiene que ser el de esa persona', () => {
  assert.match(bloqueDe('asistencias'), /id\.split\('__'\)\[0\] == request\.resource\.data\.uid/,
    'un documento con el uid de alguien y el id de otro rompería el recuento')
})

test('el alumno LEE sus asistencias pero no las escribe', () => {
  const b = bloqueDe('asistencias')
  assert.match(b, /allow read:[\s\S]*esDueno\(resource\.data\.uid\)/)
  // La escritura solo pasa por el mostrador: si el propio alumno pudiera, se
  // marcaría entrada desde casa.
  assert.match(b, /allow create, update: if enMostradorDe/)
})

// ── TIENDA ──────────────────────────────────────────────────────────────────

test('recepción baja el inventario, nunca lo sube', () => {
  // Quien recibe mercancía es quien la da de alta. Y nunca por debajo de cero:
  // un inventario negativo es un artículo prometido dos veces.
  const b = bloqueDe('articulos')
  assert.match(b, /existencias >= 0/)
  assert.match(b, /existencias < resource\.data\.existencias/)
  assert.match(b, /hasOnly\(\['existencias', 'actualizado'\]\)/)
})

test('una orden entregada es inmutable', () => {
  // Ya se descontó del inventario: reabrirla lo dejaría descuadrado sin que
  // nada lo señalara.
  const b = bloqueDe('ordenes')
  assert.match(b, /resource\.data\.estado != 'entregado'/)
  assert.match(b, /request\.resource\.data\.lineas == resource\.data\.lineas/,
    'las líneas de una orden dejaron de ser inmutables')
})

test('crear y borrar artículos van separados', () => {
  // En un `delete` no existe `request.resource`, y en un `create` no existe
  // `resource`. Juntarlos hace que la regla FALLE al evaluarse, no que deniegue.
  const b = bloqueDe('articulos')
  assert.match(b, /allow create: if \(esSuper\(\) \|\| esAdminDe\(request\.resource\.data\.academiaId\)\)/)
  assert.match(b, /allow delete: if esSuper\(\) \|\| esAdminDe\(resource\.data\.academiaId\);/)
})

// ── EL PAGO NO SE EDITA ─────────────────────────────────────────────────────

test('un pago registrado sigue sin poder editarse en lo que es dinero', () => {
  // Editar un asiento destruye la prueba de lo que se apuntó primero, y con ella
  // la posibilidad de cuadrar una caja. El 21-09-2026 se abrió UNA excepción
  // —el CONCEPTO, que es clasificación y no dinero, y solo para la dirección—;
  // el importe, el método y la matrícula siguen cerrados. Lo comprueba entera
  // «EL DINERO DE UN PAGO SIGUE SIENDO INMUTABLE», más arriba.
  const b = bloqueDe('pagos')
  assert.doesNotMatch(b, /allow update: if true/)
  assert.match(b, /hasOnly\(\['concepto'/,
    'la edición de un pago dejó de estar acotada a su concepto')
})

// ── EL ROL Y SU PUERTA ──────────────────────────────────────────────────────

test('el rol existe en el catálogo y lo reparte el director', () => {
  assert.match(ROLES, /'alumno', 'instructor', 'recepcion', 'admin_escuela', 'superadmin'/)
  assert.match(ROLES, /ROLES_DIRECTOR = \['alumno', 'instructor', 'recepcion'\]/)
  assert.match(ROLES, /recepcion: 'Recepción'/)
  // Y la regla del director tiene que permitirlo, o el selector ofrecería algo
  // que el servidor deniega.
  assert.match(bloqueDe('usuarios'), /rol in \['alumno', 'instructor', 'recepcion'\]/)
})

test('recepción tiene OTRO home: la raíz la manda a su pantalla', () => {
  assert.match(APP, /rol === 'recepcion'.*Navigate to="\/recepcion"/s,
    'la raíz volvió a servirle a recepción el recorrido de estudio')
  assert.match(APP, /path="\/recepcion"/)
})

// ── EL MENÚ DE ALUMNO NO LE APARECE ─────────────────────────────────────────

test('recepción no pasa la puerta del contenido', async () => {
  // EL FALLO, visto en pantalla el 20-09-2026: a la persona del mostrador se le
  // pintaba el recorrido completo de estudio —examen, flashcards, atlas,
  // botiquín, logros, progreso y el buscador del temario—. Bastaba con que
  // conservara un `grupoId` de cuando era alumna para pasar las dos
  // comprobaciones que deciden qué se ve.
  //
  // No era solo desorden: las reglas ya le niegan `temas` y `cursos`, así que
  // cada enlace prometía una pantalla que iba a fallar.
  const { motivoSinPrograma } = await import('../src/lib/programasModelo.js')
  const conGrupo = { id: 'G1', programaId: 'ACA__tum' }

  const bloqueo = motivoSinPrograma({ rol: 'recepcion', grupo: conGrupo })
  assert.ok(bloqueo, 'recepción volvió a pasar la puerta del contenido')
  assert.equal(bloqueo.codigo, 'recepcion')
  assert.equal(bloqueo.destino, '/recepcion')
  assert.ok(bloqueo.cta, 'sin `cta`, el botón diría «Volver al inicio» llevando al mostrador')

  // Y los demás roles no cambian.
  assert.equal(motivoSinPrograma({ rol: 'instructor', grupo: null }), null)
  assert.equal(motivoSinPrograma({ rol: 'admin_escuela', grupo: null }), null)
  assert.equal(motivoSinPrograma({ rol: 'alumno', grupo: conGrupo }), null)
})

test('el armazón le vacía las dos listas de navegación', () => {
  // `veContenido` ya se lleva lo marcado `soloConAcceso`; esto quita también lo
  // que no lleva marca, «Inicio» incluido: su inicio ES el mostrador.
  assert.match(LAYOUT, /const deAlumno = \(lista\) => \(esRecepcion \? \[\] : lista\.filter\(visible\)\)/,
    'volvieron los enlaces de alumno al menú de recepción')
  assert.match(LAYOUT, /esRecepcion \? \[\{ to: '\/recepcion'/,
    'recepción se quedó sin su propio enlace')
})

test('`esRecepcion` no es `esStaff`', () => {
  // `esStaff` abre el panel del director y su gemelo en las reglas abre el
  // temario. Son banderas distintas y tienen que seguir siéndolo.
  const AUTH = leer('../src/context/AuthContext.jsx')
  assert.match(AUTH, /esRecepcion: !pruebaTerminada && rol === 'recepcion'/)
  assert.match(AUTH, /const ROLES_STAFF = \['admin_escuela', 'instructor'\]/,
    'se metió recepción en ROLES_STAFF')
})

// ── EL ALTA ─────────────────────────────────────────────────────────────────

test('recepción NO elige la matrícula: la reserva el contador', async () => {
  // Se pidió expresamente. El formulario del alta no tiene ese campo y la
  // escritura la pide a una transacción sobre `contadores/{academiaId}`, que es
  // lo único que impide repartir dos veces el mismo número.
  const ALTA = leer('../src/components/panel/AltaDeRecepcion.jsx')
  const ESCRITURA = leer('../src/lib/firebase/recepcion.js')
  assert.match(ALTA, /const ALTA_VACIA = \{ nombre: '', email: '', telefono: '', grupoId: '', nota: '' \}/,
    'apareció un campo de matrícula en el formulario del alta')
  // Desde el 21-09-2026 la emite la SERIE DEL GRUPO —generación, mes, día y
  // turno—, no un correlativo de la academia. Sigue sin teclearse.
  assert.match(ESCRITURA, /await matriculaParaGrupo\(\{ academiaId, grupoId: alta\?\.grupoId \}\)/)
  // Y el alta es una sección propia, no solo el premio de una búsqueda fallida.
  assert.match(SHELL, /id: 'alta', etiqueta: 'Dar de alta'/)
})

test('las secciones administrativas están montadas', () => {
  for (const id of ['mostrador', 'alta', 'alumnos', 'caja', 'solicitudes', 'tienda']) {
    assert.match(SHELL, new RegExp(`id: '${id}'`), `falta la sección ${id}`)
  }
})

test('recepción CONSULTA solicitudes, no las resuelve', () => {
  const acceso = bloqueDe('solicitudesAcceso')
  const internas = bloqueDe('solicitudes')
  for (const [nombre, bloque] of [['solicitudesAcceso', acceso], ['solicitudes', internas]]) {
    assert.match(bloque, /allow read:[\s\S]*esRecepcionDe/, `recepción no puede leer ${nombre}`)
    // Decidir quién entra y con qué permisos sigue siendo del director.
    //
    // Se parte por `allow update: if` y no por `allow update` a secas: los
    // comentarios de las reglas mencionan esa frase para explicar por qué
    // recepción NO está ahí, y partir por ella metía el `allow read` entero
    // dentro de lo que se iba a inspeccionar. El primer intento falló por eso
    // y no por un permiso de más.
    const updates = bloque.split('allow update: if').slice(1).join('')
    assert.doesNotMatch(updates, /esRecepcionDe/,
      `recepción puede resolver ${nombre}: eso no es lo que se decidió`)
  }
  const API = leer('../src/lib/firebase/staff/solicitudes.js')
  assert.doesNotMatch(API, /updateDoc|setDoc|deleteDoc/,
    'el módulo de solicitudes de recepción dejó de ser solo lectura')
})

test('/recepcion NO cuelga de RutaProtegida', () => {
  // Esa puerta decide el acceso AL CONTENIDO (academia activa, grupo con
  // programa, prueba vigente) y recepción no lee contenido: metida ahí, se
  // quedaría fuera de su propia pantalla.
  const i = APP.indexOf('path="/recepcion"')
  const linea = APP.slice(i, APP.indexOf('\n', i))
  assert.doesNotMatch(linea, /RutaProtegida/)
})
