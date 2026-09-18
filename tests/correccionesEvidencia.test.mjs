// ============================================================
//  Correcciones nacidas del contraste con evidencia externa
// ------------------------------------------------------------
//  Cada prueba de aquí fija UNA corrección concreta hecha el 17-09-2026 a
//  partir de un veredicto registrado en `docs/CONTRASTE-EVIDENCIA.json`.
//
//  Por qué existen. Una lección corregida sin prueba vuelve a torcerse en la
//  siguiente pasada de estilo: alguien «mejora» la redacción y devuelve el
//  intervalo de 5 a 6 cm porque suena a lo que aprendió. Estas pruebas
//  convierten cada hallazgo en algo que no se puede deshacer en silencio.
//
//  Lo que NO hacen: decir que el tema está validado. Validar exige firma
//  docente y ninguna prueba la sustituye.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import CONTENIDO from '../src/data/contenido/index.js'
import { textoDeTema, normalizar, frases } from '../src/lib/auditoriaClinica.js'

const LIBRO = JSON.parse(readFileSync(new URL('../docs/CONTRASTE-EVIDENCIA.json', import.meta.url), 'utf8'))
const texto = (id) => normalizar(textoDeTema({ id, ...CONTENIDO[id] }))
const fuentesDe = (id) => (CONTENIDO[id]?.secciones || [])
  .flatMap((s) => s.bloques || [])
  .filter((b) => b.tipo === 'fuentes')
  .flatMap((b) => b.items || [])

// ---------- 1. profundidad de compresión en el adulto (af-df90f3eed1) ----------

// El techo de 6 cm PUEDE nombrarse —explicar qué cambió exige nombrarlo—, pero
// solo acompañado de lo que lo sitúa: que es la formulación de 2020, que ya no
// forma parte de la recomendación, o que procede de datos observacionales. Una
// frase que lo enuncie a secas vuelve a enseñar la recomendación anterior.
const SITUADORES = /2020|ya no forma parte|observacional|no como intervalo|umbral/

// La corrección no vale solo donde se encontró. La lección pediátrica repetía
// el intervalo del adulto en su tabla comparativa y en su repaso, y se habría
// quedado contradiciendo a la del adulto. El control recorre TODO el temario.
test('en ninguna lección se enuncia la profundidad del adulto como intervalo de 5 a 6 cm', () => {
  const sueltas = []
  for (const [id, tema] of Object.entries(CONTENIDO)) {
    for (const f of frases(normalizar(textoDeTema({ id, ...tema })))) {
      if (!/6 cm|seis centimetros|5 a 6|5-6 cm/.test(f)) continue
      if (SITUADORES.test(f)) continue
      sueltas.push(`${id}: ${f.trim()}`)
    }
  }
  assert.deepEqual(sueltas, [],
    'AHA 2025 recomienda «al menos 5 cm». Nombrar el techo de 6 cm sin decir que es la formulación '
    + 'de 2020 o que procede de datos observacionales reinstala la recomendación anterior.')
})

test('la lección del adulto conserva el umbral y explica de dónde sale el techo', () => {
  const t = texto('m1-pab-rcp-legos-adulto')
  assert.match(t, /al menos 5 cm|al menos cinco centimetros/,
    'El umbral de 5 cm tiene que seguir enunciado: es lo que manda.')
  assert.match(t, /observacional/,
    'El daño por encima de 6 cm procede de datos observacionales y la lección debe decirlo así.')
})

// ---------- 2. evidencia del cambio de OVACE (af-d14e46a12e) ----------

test('la OVACE del adulto cita el estudio que motivó anteponer los golpes dorsales', () => {
  const t = texto('m1-pab-ovace-adultos')
  assert.match(t, /709/, 'La cohorte de 709 casos es la evidencia del cambio de 2025.')
  assert.match(t, /0\.49/, 'La lección declara la magnitud del efecto, no solo que hubo un cambio.')
  const citas = fuentesDe('m1-pab-ovace-adultos').map((i) => `${i.nombre} ${i.nota || ''}`).join(' ')
  assert.match(citas, /38825222|resuscitation\.2024\.110258/i,
    'El estudio de Dunne tiene que estar en el bloque de fuentes con su localizador.')
})

// ---------- 3. relación compresión-ventilación pediátrica (af-c50111a37c) ----------

test('la relación pediátrica no se enuncia como cifra demostrada', () => {
  const t = texto('m1-pai-rcp-pediatrico')
  assert.match(t, /30:2/, 'Las cifras siguen siendo las que se evalúan.')
  assert.match(t, /15:2/)
  assert.match(t, /optima sigue siendo desconocida|no se haya demostrado|no que 15:2 supere/,
    'La guía de 2025 declara que la relación óptima sigue sin establecerse: la lección no puede '
    + 'presentarla como dato cerrado.')
})

// ---------- 4. técnica de compresión en el lactante (af-f3cccea351) ----------

test('el lactante nombra las técnicas que sustituyen a los dos dedos', () => {
  const t = texto('m1-pai-rcp-pediatrico')
  assert.match(t, /dos dedos/, 'Se sigue nombrando lo retirado, porque el alumno puede haberlo aprendido.')
  assert.match(t, /dos pulgares/, 'Hay que decir qué se usa en su lugar.')
  assert.match(t, /talon de una mano/)
})

// ---------- 5. activación del SMU en pediatría (af-c0ac02b44e) ----------

test('la activación pediátrica ya no enseña «2 minutos de RCP y después llamar» como regla', () => {
  const t = texto('m1-pai-rcp-pediatrico')
  assert.doesNotMatch(t, /dar 2 minutos de rcp y despues llamar|se dan dos minutos de rcp y despues se llama/,
    'La guía de 2025 pide activar el SEM e iniciar la RCP sin demora; la secuencia «reanimar y '
    + 'luego llamar» queda para el caso de no tener teléfono.')
  assert.match(t, /altavoz/,
    'La conducta con teléfono a mano —activar en altavoz sin interrumpir— es la norma y tiene que '
    + 'estar enseñada.')
  assert.match(t, /pendiente de comprobacion docente/,
    'El punto no se cerró contra la figura publicada del algoritmo: la lección lo declara abierto.')
})

test('ninguna pregunta del tema pediátrico premia la conducta retirada', () => {
  for (const q of CONTENIDO['m1-pai-rcp-pediatrico']?.quiz || []) {
    const correcta = normalizar(q.opciones?.[q.correcta] || '')
    assert.doesNotMatch(correcta, /2 minutos de rcp y despues llamar/,
      `Una pregunta da por correcta una conducta que la guía vigente ya no enuncia: «${q.pregunta}»`)
  }
})

// ---------- 6. Parkland (af-038ea699df, af-5937f7fc65, af-d175ebbeb4) ----------

test('Parkland presenta el contrapeso de ABRUPT y no zanja el cambio', () => {
  const t = texto('m5-que-parkland')
  assert.match(t, /abrupt/, 'Sin ABRUPT, la lección enseña que 2 es la respuesta y 4 el error.')
  assert.match(t, /brooke modificada/, 'La cifra de 2 mL/kg/%SCQ tiene nombre y procedencia.')
  assert.match(t, /0\.5 ml\/kg\/h|0\.5 mL\/kg\/h|medio mililitro por kilogramo y hora/,
    'La titulación necesita su objetivo declarado.')
})

test('Parkland cita la guía de la ABA con su localizador y el ensayo que la matiza', () => {
  const citas = fuentesDe('m5-que-parkland').map((i) => `${i.nombre} ${i.nota || ''} ${i.url || ''}`).join(' ')
  assert.match(citas, /38051821/, 'La guía de la ABA se cita por PMID, no por título suelto.')
  assert.match(citas, /J Burn Care Res\. 2024;45\(3\):565-589/, 'Con volumen y páginas.')
  assert.match(citas, /34417368/, 'ABRUPT tiene que estar entre las fuentes del tema.')
})

// ---------- 7. las citas que se corrigieron no pueden volver al portal ----------

test('las guías de la AHA se citan por documento, no por la página de sección del portal', () => {
  for (const id of ['m1-pab-rcp-legos-adulto', 'm1-pab-ovace-adultos', 'm1-pai-rcp-pediatrico']) {
    for (const item of fuentesDe(id)) {
      const url = item.url || ''
      assert.ok(!/cpr\.heart\.org\/en\/resuscitation-science\/cpr-and-ecc-guidelines\/[a-z-]+$/.test(url),
        `${id}: «${item.nombre}» vuelve a apuntar a una página de sección del portal de la AHA, `
        + 'que cambia de contenido. La cita tiene que llevar al documento.')
    }
  }
})

// ---------- 8. el libro y las lecciones no se contradicen ----------

test('toda corrección aplicada sigue teniendo su veredicto registrado', () => {
  const aplicadas = ['af-df90f3eed1', 'af-d14e46a12e', 'af-c50111a37c', 'af-d1bde0ac9b',
    'af-f3cccea351', 'af-c0ac02b44e', 'af-038ea699df', 'af-5937f7fc65', 'af-d175ebbeb4']
  const enLibro = new Set((LIBRO.entradas || []).map((e) => e.id))
  for (const id of aplicadas) {
    assert.ok(enLibro.has(id),
      `Se corrigió una lección por ${id} pero el libro de contraste ya no guarda ese veredicto: `
      + 'la corrección se quedaría sin justificación trazable.')
  }
})

test('ningún tema tocado quedó marcado como validado por la corrección', () => {
  for (const id of ['m1-pab-rcp-legos-adulto', 'm1-pab-ovace-adultos', 'm1-pab-hemorragias',
    'm1-pai-rcp-pediatrico', 'm5-que-parkland']) {
    const estado = CONTENIDO[id]?.revision?.estado
    assert.ok(!['validado', 'publicado'].includes(estado),
      `${id}: corregir no valida. Ese estado exige firma docente.`)
  }
})
