// ============================================================
//  La persona que entró y se quedó en tierra de nadie
// ------------------------------------------------------------
//  EL FALLO, contado como se vio el 2 de septiembre de 2026: alguien pidió
//  entrar por el directorio, dirección lo aprobó, y quedó dentro de la academia
//  SIN grupo. Sin grupo no hay plan de estudios, y sin plan no ve contenido:
//  inicia sesión y la plataforma está vacía.
//
//  Lo grave no era el hueco, era que NO TENÍA SALIDA por ningún lado:
//
//   · él no podía pedir grupo, porque el directorio no pregunta por grupo;
//   · dirección no podía dárselo, porque aprobar era un sí o un no y después
//     ya no quedaba ninguna pantalla que lo relacionara con su solicitud;
//   · y la tabla de miembros sí dejaba asignarlo, pero nada avisaba de que
//     hiciera falta: había que recorrer la lista mirando una columna.
//
//  El alta la completa el propio interesado, y esa decisión es buena —evita
//  abrir en las reglas la escritura del perfil de otra persona—. Lo que
//  faltaba era que el director pudiera decir DÓNDE entra, y que el que ya se
//  quedó fuera se viera.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const leer = (r) => readFileSync(new URL(r, import.meta.url), 'utf8')
const DIRECTORIO = leer('../src/lib/firebase/directorio.js')
const SOLICITUDES = leer('../src/components/panel/SolicitudesDeAcceso.jsx')
const BIENVENIDA = leer('../src/pages/Bienvenida.jsx')
const MIEMBROS = leer('../src/components/panel/GestionMiembros.jsx')
const REGLAS = leer('../firestore.rules')

test('EL ALTA YA NO ESCRIBE grupoId: null A LA FUERZA', () => {
  // Era literal: la función que completaba el alta ponía `grupoId: null`, así
  // que ni siquiera un grupo elegido antes habría sobrevivido.
  assert.doesNotMatch(DIRECTORIO, /grupoId: null,/,
    'aplicarSolicitudAceptada volvió a fijar el grupo en null')
  assert.match(DIRECTORIO, /export async function aplicarSolicitudAceptada\(uid, academiaId, grupoId = null\)/,
    'el alta dejó de aceptar el grupo que decidió quien aprobó')
})

test('aprobar decide TAMBIÉN el grupo, y el dato viaja en la solicitud', () => {
  assert.match(DIRECTORIO, /grupoAsignado: aceptar \? \(grupoId \|\| null\) : null/,
    'la solicitud dejó de llevar el grupo asignado')
  assert.match(BIENVENIDA, /aplicarSolicitudAceptada\(user\.uid, sol\.academiaId, sol\.grupoAsignado/,
    'quien completa el alta dejó de leer el grupo de su solicitud')
})

test('rechazar no asigna grupo', () => {
  // Un grupo pegado a una solicitud rechazada no significa nada, y quedaría
  // ahí para confundir a quien la revise después.
  assert.match(DIRECTORIO, /aceptar \? \(grupoId \|\| null\) : null/)
})

test('la pantalla ofrece el grupo al aprobar, y avisa si se acepta sin él', () => {
  assert.match(SOLICITUDES, /grupoPara/, 'no hay selector de grupo en la aprobación')
  assert.match(SOLICITUDES, /NO verá contenido/,
    'aceptar sin grupo dejó de avisar de lo que implica')
  // Se avisa, no se impide: puede haber motivo para aceptar y colocar después,
  // y bloquear el botón obligaría a inventarse un grupo para poder aprobar.
  assert.doesNotMatch(SOLICITUDES, /disabled=\{[^}]*!grupoPara/,
    'el botón de aceptar no debe bloquearse por falta de grupo')
})

test('las reglas dejan pasar el grupo asignado, y solo eso', () => {
  const bloque = REGLAS.slice(REGLAS.indexOf('match /solicitudesAcceso/'))
  const update = bloque.slice(0, bloque.indexOf('allow delete'))
  assert.match(update, /'grupoAsignado'/, 'la regla no admite el campo nuevo')
  // Que se abra un campo no puede abrir los demás: la lista sigue siendo cerrada.
  assert.match(update, /hasOnly\(\['estado', 'resueltoPor', 'resueltoEn', 'motivo', 'grupoAsignado'\]\)/,
    'la lista blanca de campos de la solicitud dejó de ser exacta')
})

test('a quien ya se quedó sin grupo se le ve, y en un clic', () => {
  assert.match(MIEMBROS, /alumno\(s\) sin grupo/, 'desapareció el aviso de alumnos sin grupo')
  assert.match(MIEMBROS, /grupoId: '__sin__'/,
    'el aviso ya no filtra la tabla para dejar a la vista a quien hay que colocar')
  // Solo alumnos: un profesor lleva sus grupos en otra lista y no depende de
  // uno para ver contenido, así que contarlo sería un aviso falso.
  assert.match(MIEMBROS, /m\.rol === 'alumno' && !m\.grupoId/)
})
