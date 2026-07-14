// Pruebas de Fase 4: contenido enriquecido del tema, calificación ponderada,
// archivos y aislamiento de referencias de Storage. PURAS (sin Firebase).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { todosLosTemas } from '../src/data/index.js'
import { contenidoTema } from '../src/lib/contenidoModelo.js'
import {
  validarBloque, validarSecciones, validarPregunta, validarQuiz,
  validarRecursos, validarActividades, validarContenidoTema,
  calcularCalificacion, correctasDe, bloqueNuevo, preguntaNueva,
  duplicarPregunta, duplicarSeccion,
} from '../src/lib/temaContenidoModelo.js'
import {
  validarArchivoParaSubir, nombreSeguro, extensionDe, rutaArchivoAcademia,
  rutaEsDeAcademia, rutaDesdeUrlStorage, validarReferenciasStorage,
} from '../src/lib/archivosModelo.js'

// ---------- COMPATIBILIDAD: todo el temario real pasa las validaciones ----------

test('compatibilidad: el contenido de los 68 temas actuales valida sin errores', () => {
  for (const tema of todosLosTemas) {
    const doc = contenidoTema(tema)
    const contenido = {
      resumen: doc.resumen, duracion: doc.duracion, objetivos: doc.objetivos,
      secciones: doc.secciones, conceptosClave: doc.conceptosClave,
      flashcards: doc.flashcards, quiz: doc.quiz, recursos: doc.recursos,
      actividades: doc.actividades,
    }
    const error = validarContenidoTema(contenido)
    assert.equal(error, null, `Tema "${tema.id}": ${error}`)
  }
})

test('compatibilidad: la calificación sin pesos reproduce el cálculo actual', () => {
  // Cálculo actual (Quiz/ExamenFasePage): aciertos, total, round(a/t*100).
  const preguntas = todosLosTemas[0].quiz
  const respuestas = preguntas.map((q) => correctasDe(q)[0]) // todas bien
  const r = calcularCalificacion(preguntas, respuestas)
  assert.equal(r.aciertos, preguntas.length)
  assert.equal(r.total, preguntas.length)
  assert.equal(r.porcentaje, 100)

  const mitad = preguntas.map((q, i) => (i % 2 === 0 ? correctasDe(q)[0] : null))
  const r2 = calcularCalificacion(preguntas, mitad)
  assert.equal(r2.porcentaje, Math.round((r2.aciertos / r2.total) * 100))
})

// ---------- bloques ----------

test('bloques: cada tipo del catálogo nace válido tras llenar sus campos', () => {
  const listos = {
    p: { texto: 'Hola' }, h3: { texto: 'Sub' },
    lista: { items: ['a'] }, pasos: { items: ['a', 'b'] },
    tabla: {}, callout: { texto: 'ojo' }, formula: { texto: 'x=1' },
    imagen: { src: 'https://x.mx/a.png' },
    fuentes: { items: [{ nombre: 'GPC', url: 'https://x.mx' }] },
  }
  for (const [tipo, extra] of Object.entries(listos)) {
    const b = { ...bloqueNuevo(tipo), ...extra }
    assert.equal(validarBloque(b), null, `bloque ${tipo}`)
  }
})

test('bloques: se rechazan vacíos, tipos desconocidos y enlaces peligrosos', () => {
  assert.ok(validarBloque({ tipo: 'p', texto: '' }))
  assert.ok(validarBloque({ tipo: 'inventado', texto: 'x' }))
  assert.ok(validarBloque({ tipo: 'imagen', src: 'javascript:alert(1)' }))
  assert.ok(validarBloque({ tipo: 'imagen', src: 'data:text/html;base64,x' }))
  assert.ok(validarBloque({ tipo: 'lista', items: [] }))
  assert.ok(validarBloque({ tipo: 'tabla', headers: ['a'], filas: [['x', 'y']] }))
  assert.ok(validarBloque({ tipo: 'callout', variante: 'otra', texto: 'x' }))
  assert.equal(validarSecciones([{ titulo: 'S', bloques: [{ tipo: 'p', texto: 'ok' }] }]), null)
  assert.ok(validarSecciones([{ titulo: '', bloques: [] }]))
})

// ---------- preguntas / quiz / ponderaciones ----------

test('preguntas: correcta como índice o arreglo, dentro de rango', () => {
  const base = { pregunta: '¿?', opciones: ['a', 'b', 'c'], explicacion: 'x' }
  assert.equal(validarPregunta({ ...base, correcta: 1 }), null)
  assert.equal(validarPregunta({ ...base, correcta: [0, 2] }), null)
  assert.ok(validarPregunta({ ...base, correcta: 3 }), 'índice fuera de rango')
  assert.ok(validarPregunta({ ...base, correcta: [] }), 'sin correcta')
  assert.ok(validarPregunta({ ...base, correcta: [0, 1, 2] }), 'todas correctas')
  assert.ok(validarPregunta({ ...base, opciones: ['a'], correcta: 0 }), 'una sola opción')
  assert.ok(validarPregunta({ pregunta: '', opciones: ['a', 'b'], correcta: 0 }), 'sin enunciado')
})

test('preguntas: la ponderación debe ser un número > 0 (máx. 100)', () => {
  const base = { pregunta: '¿?', opciones: ['a', 'b'], correcta: 0 }
  assert.equal(validarPregunta({ ...base, peso: 2.5 }), null)
  assert.equal(validarPregunta({ ...base }), null, 'sin peso = válido (default 1)')
  assert.ok(validarPregunta({ ...base, peso: 0 }))
  assert.ok(validarPregunta({ ...base, peso: -1 }))
  assert.ok(validarPregunta({ ...base, peso: 'dos' }))
  assert.ok(validarPregunta({ ...base, peso: 101 }))
})

test('calificación ponderada: los pesos cuentan y el redondeo es 0-100', () => {
  const preguntas = [
    { pregunta: 'a', opciones: ['x', 'y'], correcta: 0, peso: 3 },
    { pregunta: 'b', opciones: ['x', 'y'], correcta: 1, peso: 1 },
  ]
  // Solo la de peso 3 correcta → 3/4 = 75 %.
  const r = calcularCalificacion(preguntas, [0, 0])
  assert.equal(r.porcentaje, 75)
  assert.equal(r.aciertos, 1)
  assert.equal(r.puntos, 3)
  assert.equal(r.pesoTotal, 4)
  // Solo la de peso 1 correcta → 25 %.
  assert.equal(calcularCalificacion(preguntas, [1, 1]).porcentaje, 25)
  // Nada respondido → 0 %.
  assert.equal(calcularCalificacion(preguntas, [null, null]).porcentaje, 0)
  // Sin preguntas → 0 % sin dividir entre cero.
  assert.equal(calcularCalificacion([], []).porcentaje, 0)
})

test('calificación: correcta múltiple acepta cualquiera de las marcadas', () => {
  const preguntas = [{ pregunta: 'a', opciones: ['x', 'y', 'z'], correcta: [0, 2] }]
  assert.equal(calcularCalificacion(preguntas, [2]).porcentaje, 100)
  assert.equal(calcularCalificacion(preguntas, [0]).porcentaje, 100)
  assert.equal(calcularCalificacion(preguntas, [1]).porcentaje, 0)
})

test('quiz: reporta el número de la pregunta con error', () => {
  const quiz = [
    { pregunta: 'ok', opciones: ['a', 'b'], correcta: 0 },
    { pregunta: 'mala', opciones: ['a', 'b'], correcta: 9 },
  ]
  assert.match(validarQuiz(quiz), /Pregunta 2/)
})

// ---------- recursos y actividades ----------

test('recursos: URLs http(s) obligatorias; archivos con título, url y path', () => {
  assert.equal(validarRecursos({
    videos: [{ titulo: 'RCP', url: 'https://youtu.be/x', canal: 'AHA' }],
    fuentes: [{ titulo: 'GPC', url: 'https://cenetec.gob.mx', tipo: 'guía' }],
    archivos: [{ titulo: 'Manual', url: 'https://firebasestorage.googleapis.com/v0/b/x/o/a%2Fb.pdf?alt=media', path: 'academias/A/archivos/b.pdf' }],
  }), null)
  assert.ok(validarRecursos({ videos: [{ titulo: 'x', url: 'ftp://x' }] }))
  assert.ok(validarRecursos({ archivos: [{ titulo: 'x', url: 'https://x.mx/a.pdf' }] }), 'archivo sin path')
  assert.ok(validarRecursos({ fuentes: [{ titulo: '', url: 'https://x.mx' }] }))
})

test('actividades: ordenar ≥2 pasos, completar con hueco ___, preguntas válidas', () => {
  assert.equal(validarActividades({
    ordenar: { titulo: 'RCP', pasos: ['Verificar', 'Comprimir'] },
    completar: [{ texto: 'El corazón ___ sangre.', opciones: ['bombea', 'filtra'], correcta: 0 }],
    preguntas: [{ pregunta: '¿?', opciones: ['a', 'b'], correcta: 1, explicacion: 'x' }],
  }), null)
  assert.ok(validarActividades({ ordenar: { titulo: 'x', pasos: ['solo uno'] } }))
  assert.ok(validarActividades({ completar: [{ texto: 'sin hueco', opciones: ['a', 'b'], correcta: 0 }] }))
  assert.ok(validarActividades({ preguntas: [{ pregunta: 'x', opciones: ['a'], correcta: 0 }] }))
})

// ---------- contenido completo y duplicación ----------

test('contenido: rechaza campos que no son de contenido (estado, ids, metadatos)', () => {
  assert.ok(validarContenidoTema({ estado: 'publicado' }))
  assert.ok(validarContenidoTema({ academiaId: 'B' }))
  assert.ok(validarContenidoTema({ version: 99 }))
  assert.equal(validarContenidoTema({ resumen: 'ok', quiz: [] }), null)
})

test('duplicar: copias independientes (mutar la copia no toca el original)', () => {
  const q = { ...preguntaNueva(), pregunta: 'orig', opciones: ['a', 'b'] }
  const q2 = duplicarPregunta(q)
  q2.opciones.push('c')
  assert.equal(q.opciones.length, 2)
  const sec = { titulo: 'S', bloques: [{ tipo: 'lista', items: ['x'] }] }
  const sec2 = duplicarSeccion(sec)
  sec2.bloques[0].items.push('y')
  assert.equal(sec.bloques[0].items.length, 1)
  assert.equal(sec2.titulo, 'Copia de S')
})

// ---------- archivos (allowlist, tamaños, nombres) ----------

test('archivos: ejecutables y extensiones fuera de la allowlist se rechazan', () => {
  for (const nombre of ['virus.exe', 'script.bat', 'app.apk', 'code.js', 'macro.docm', 'pagina.html', 'sin-extension']) {
    assert.ok(validarArchivoParaSubir({ nombre, tipo: 'application/pdf', tamano: 100 }), nombre)
  }
  assert.equal(validarArchivoParaSubir({ nombre: 'guia.pdf', tipo: 'application/pdf', tamano: 1024 }), null)
  assert.equal(validarArchivoParaSubir({ nombre: 'foto.jpg', tipo: 'image/jpeg', tamano: 1024 }), null)
})

test('archivos: el MIME debe coincidir con la extensión y el tamaño con su límite', () => {
  assert.ok(validarArchivoParaSubir({ nombre: 'falso.pdf', tipo: 'application/x-msdownload', tamano: 100 }))
  assert.ok(validarArchivoParaSubir({ nombre: 'foto.png', tipo: 'image/png', tamano: 9 * 1024 * 1024 }), 'imagen de 9 MB')
  assert.ok(validarArchivoParaSubir({ nombre: 'video.mp4', tipo: 'video/mp4', tamano: 51 * 1024 * 1024 }), 'video de 51 MB')
  assert.ok(validarArchivoParaSubir({ nombre: 'vacio.pdf', tipo: 'application/pdf', tamano: 0 }))
  assert.equal(validarArchivoParaSubir({ nombre: 'video.mp4', tipo: 'video/mp4', tamano: 49 * 1024 * 1024 }), null)
})

test('archivos: nombres sanitizados y rutas canónicas sin traversal', () => {
  assert.equal(nombreSeguro('Guía RCP (v2).PDF'.toLowerCase()), 'guia-rcp-v2.pdf')
  assert.equal(extensionDe('a.b.MP4'.toLowerCase()), 'mp4')
  assert.equal(
    rutaArchivoAcademia('AEP-2026', 'archivos', '../../etc/passwd.pdf', 123),
    'academias/AEP-2026/archivos/123-etc-passwd.pdf'
  )
  assert.throws(() => rutaArchivoAcademia('A/../B', 'archivos', 'x.pdf', 1))
  assert.throws(() => rutaArchivoAcademia('AEP', 'otra-carpeta', 'x.pdf', 1))
})

test('rutas: solo el prefijo de la propia academia es válido', () => {
  assert.equal(rutaEsDeAcademia('academias/A/archivos/x.pdf', 'A'), true)
  assert.equal(rutaEsDeAcademia('academias/B/archivos/x.pdf', 'A'), false)
  assert.equal(rutaEsDeAcademia('academias/A/../B/x.pdf', 'A'), false)
  assert.equal(rutaEsDeAcademia('otras/x.pdf', 'A'), false)
})

test('rutas: se extrae la ruta desde una URL de descarga de Storage', () => {
  const url = 'https://firebasestorage.googleapis.com/v0/b/ptem.appspot.com/o/academias%2FB%2Farchivos%2Fx.pdf?alt=media&token=t'
  assert.equal(rutaDesdeUrlStorage(url), 'academias/B/archivos/x.pdf')
  assert.equal(rutaDesdeUrlStorage('https://otra.cdn.com/a.pdf'), null)
})

test('aislamiento: el contenido no puede referenciar Storage de otra academia', () => {
  const contenido = {
    recursos: {
      archivos: [{ titulo: 'Manual', path: 'academias/A/archivos/m.pdf', url: 'https://firebasestorage.googleapis.com/v0/b/x/o/academias%2FA%2Farchivos%2Fm.pdf?alt=media' }],
      imagenes: [{ src: 'https://firebasestorage.googleapis.com/v0/b/x/o/academias%2FA%2Fimagenes%2Fi.png?alt=media' }],
    },
    secciones: [{ titulo: 'S', bloques: [{ tipo: 'imagen', src: 'https://cdn.externa.com/libre.png' }] }],
  }
  assert.equal(validarReferenciasStorage(contenido, 'A'), null)
  // path de otra academia → rechazado.
  assert.ok(validarReferenciasStorage({
    recursos: { archivos: [{ titulo: 'x', path: 'academias/B/archivos/m.pdf', url: 'https://x.mx/m.pdf' }] },
  }, 'A'))
  // URL de Storage de otra academia (aunque el path diga A) → rechazado.
  assert.ok(validarReferenciasStorage({
    recursos: { imagenes: [{ src: 'https://firebasestorage.googleapis.com/v0/b/x/o/academias%2FB%2Fimagenes%2Fi.png?alt=media' }] },
  }, 'A'))
  // Imagen de bloque apuntando a Storage ajeno → rechazado.
  assert.ok(validarReferenciasStorage({
    secciones: [{ titulo: 'S', bloques: [{ tipo: 'imagen', src: 'https://firebasestorage.googleapis.com/v0/b/x/o/academias%2FB%2Fimagenes%2Fi.png?alt=media' }] }],
  }, 'A'))
})

test('normalizar: recorta, limpia vacíos y compacta correcta/peso', async () => {
  const { normalizarContenido } = await import('../src/lib/temaContenidoModelo.js')
  const n = normalizarContenido({
    resumen: '  hola  ',
    objetivos: ['  a  ', '', '   '],
    secciones: [{ titulo: ' S ', bloques: [
      { tipo: 'p', texto: '  ' },
      { tipo: 'lista', titulo: '', items: [' x ', ''] },
    ] }],
    quiz: [{ pregunta: ' q ', opciones: [' a ', 'b'], correcta: [1], peso: 1 }],
    actividades: { ordenar: { titulo: 'x', pasos: ['', ' '] }, completar: [], preguntas: [] },
    recursos: { videos: [{ titulo: '', url: '' }], fuentes: [], imagenes: [], archivos: [] },
  })
  assert.equal(n.resumen, 'hola')
  assert.deepEqual(n.objetivos, ['a'])
  assert.equal(n.secciones[0].bloques.length, 1, 'el párrafo vacío se elimina')
  assert.deepEqual(n.secciones[0].bloques[0].items, ['x'])
  assert.equal(n.quiz[0].correcta, 1, 'correcta [1] → 1 (compat con Quiz.jsx)')
  assert.equal('peso' in n.quiz[0], false, 'peso 1 (default) no se guarda')
  assert.equal(n.actividades, null, 'actividades sin contenido → null')
  assert.equal(n.recursos, null, 'recursos sin contenido → null')
  // La normalización de un tema real es estable (no cambia nada).
  const doc = contenidoTema(todosLosTemas[3])
  const contenido = {
    resumen: doc.resumen, duracion: doc.duracion, objetivos: doc.objetivos,
    secciones: doc.secciones, conceptosClave: doc.conceptosClave,
    flashcards: doc.flashcards, quiz: doc.quiz, recursos: doc.recursos,
    actividades: doc.actividades,
  }
  assert.equal(validarContenidoTema(normalizarContenido(contenido)), null)
})
