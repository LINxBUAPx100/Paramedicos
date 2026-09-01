// ============================================================
//  Material de clase: lo que se puede proteger y lo que no
// ------------------------------------------------------------
//  El encargo fue «que no puedan descargar ni robar el PDF». Eso, tal cual, no
//  existe: si el navegador pinta el documento, los bytes están en la máquina de
//  quien lo mira.
//
//  Lo que estas pruebas fijan es la frontera honesta entre las dos cosas que sí
//  se pueden hacer —servir solo a quien toca, y marcar cada copia con quién la
//  abrió— y la que no. Sobre todo impiden lo peligroso: que un material quede
//  marcado como «protegido» cuando no puede estarlo.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import {
  normalizarMaterial, validarMaterial, marcaDeAgua, formatoDeNombre,
  seMuestraEnPantalla, costoEstimado, MAX_MB,
} from '../src/lib/materialTema.js'

// ---------- la frontera de lo que se puede proteger ----------

test('un ENLACE EXTERNO nunca se marca como protegido', () => {
  // Es lo más importante del archivo. Un enlace de Drive lo sirve Google: PTEM
  // no puede firmarlo, ni marcarlo, ni saber quién lo abrió. Decir que está
  // protegido sería mentir a quien decide qué material sube ahí.
  const { material, error } = normalizarMaterial({
    titulo: 'Guía de RCP', origen: 'enlace', url: 'https://drive.google.com/file/abc',
  })
  assert.equal(error, null)
  assert.equal(material.protegido, false)
})

test('un ARCHIVO PROPIO sí se sirve firmado y marcado', () => {
  const { material, error } = normalizarMaterial({
    titulo: 'Presentación de trauma', origen: 'archivo',
    path: 'academias/RES-2026/material/trauma.pdf', mb: 4,
  })
  assert.equal(error, null)
  assert.equal(material.protegido, true)
  assert.equal(material.enPantalla, true, 'un PDF se puede mostrar sin descargar')
})

test('un PPTX no se puede MOSTRAR, y el modelo lo dice', () => {
  // El navegador no pinta PowerPoint. Ofrecerlo como material «protegido» que
  // se ve en pantalla sería falso: lo único que se puede hacer es bajarlo, y
  // entonces no está protegido. Hay que exportarlo a PDF.
  const { material } = normalizarMaterial({
    titulo: 'Clase 3', origen: 'archivo',
    path: 'academias/RES-2026/material/clase3.pptx', mb: 8,
  })
  assert.equal(material.formato, 'presentacion')
  assert.equal(material.enPantalla, false)
  assert.equal(seMuestraEnPantalla('presentacion'), false)
  assert.equal(seMuestraEnPantalla('pdf'), true)
})

// ---------- la marca de agua ----------

test('sin datos del alumno NO se inventa una marca genérica', () => {
  // Una marca que dijera «PTEM» no identifica a nadie: daría sensación de
  // control sin darlo. Devolver null obliga al visor a negarse.
  assert.equal(marcaDeAgua({}), null)
  assert.equal(marcaDeAgua({ nombre: '   ' }), null)
  assert.equal(marcaDeAgua(), null)
})

test('la marca lleva matrícula y fecha, no solo el nombre', () => {
  // Dos alumnos pueden llamarse igual; la fecha acota cuándo se sacó la copia.
  const m = marcaDeAgua({ nombre: 'Ana Ruiz', matricula: 'RES-0421', fecha: '2026-08-31T10:00:00Z' })
  assert.equal(m, 'Ana Ruiz · RES-0421 · 2026-08-31')
  // Con lo mínimo, al menos el nombre.
  assert.equal(marcaDeAgua({ nombre: 'Ana Ruiz' }), 'Ana Ruiz')
})

// ---------- lo que se rechaza, y por qué ----------

test('un enlace que no sea https se rechaza', () => {
  // http viaja en claro y `javascript:` es un vector de ejecución. Los dos se
  // caen por la misma puerta.
  for (const url of ['http://x.com/a.pdf', 'javascript:alert(1)', 'ftp://x/a.pdf', '']) {
    const { error } = normalizarMaterial({ titulo: 'X', origen: 'enlace', url })
    assert.ok(error, `debería rechazar ${url || '(vacío)'}`)
  }
})

test('un archivo sin ruta de almacenamiento se rechaza', () => {
  // Sin ruta no se puede firmar el enlace, así que no se puede proteger. Guardar
  // la ficha igual la haría fallar el día que un alumno la abra.
  const { error } = normalizarMaterial({ titulo: 'X', origen: 'archivo', mb: 2 })
  assert.match(error, /ruta de almacenamiento/)
})

test('un archivo por encima del tope se rechaza con la cifra', () => {
  const { error } = normalizarMaterial({
    titulo: 'X', origen: 'archivo', path: 'a/b.pdf', mb: MAX_MB + 5,
  })
  assert.match(error, new RegExp(String(MAX_MB)))
})

test('sin título y sin origen no se guarda nada', () => {
  assert.match(normalizarMaterial({ origen: 'enlace', url: 'https://x/a.pdf' }).error, /título/)
  assert.match(normalizarMaterial({ titulo: 'X', origen: 'magia' }).error, /Origen/)
})

test('el formato se deduce de la extensión', () => {
  assert.equal(formatoDeNombre('clase.PDF'), 'pdf')
  assert.equal(formatoDeNombre('clase.pptx'), 'presentacion')
  assert.equal(formatoDeNombre('clase.exe'), null)
  assert.equal(formatoDeNombre(''), null)
})

// ---------- la lista ----------

test('validarMaterial acepta la lista vacía y la ausente', () => {
  assert.equal(validarMaterial(null), null)
  assert.equal(validarMaterial([]), null)
  assert.equal(validarMaterial('nope'), 'El material del tema es inválido.')
})

test('un tema no puede acumular material sin límite', () => {
  const uno = { titulo: 'X', origen: 'enlace', url: 'https://x/a.pdf' }
  assert.equal(validarMaterial(Array(10).fill(uno)), null)
  assert.match(validarMaterial(Array(11).fill(uno)), /máximo/)
})

test('el primer material inválido detiene la lista entera', () => {
  const lista = [
    { titulo: 'Bueno', origen: 'enlace', url: 'https://x/a.pdf' },
    { titulo: 'Malo', origen: 'enlace', url: 'http://x/b.pdf' },
  ]
  assert.match(validarMaterial(lista), /https/)
})

// ---------- el costo, antes de subir y no en el recibo ----------

test('los enlaces externos NO cuestan transferencia', () => {
  // Es exactamente su atractivo: los sirve otro.
  const c = costoEstimado([{ origen: 'enlace', url: 'https://x/a.pdf' }], 300, 2)
  assert.equal(c.archivos, 0)
  assert.equal(c.pesosMensual, 0)
})

test('los archivos propios sí, y se puede ver antes de subirlos', () => {
  // 5 MB × 300 alumnos × 2 veces = 2.93 GB al mes.
  const c = costoEstimado([{ origen: 'archivo', mb: 5 }], 300, 2)
  assert.equal(c.archivos, 1)
  assert.equal(c.gbMensual, 2.93)
  // A $0.12 USD por GB y $18.50 por dólar: unos $6.50 al mes por este archivo.
  assert.ok(c.pesosMensual > 6 && c.pesosMensual < 7, `salió ${c.pesosMensual}`)
})

test('sin alumnos el costo es cero, no un error', () => {
  const c = costoEstimado([{ origen: 'archivo', mb: 10 }], 0)
  assert.equal(c.gbMensual, 0)
  assert.equal(c.pesosMensual, 0)
})
