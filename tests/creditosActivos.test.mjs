// ============================================================
//  Créditos: lo que la interfaz muestra sale de aquí
// ------------------------------------------------------------
//  El panel «Créditos» de cada figura y la página /creditos son JSX y no se
//  pueden ejecutar en `node --test` (este repositorio no lleva un renderizador
//  de React). Lo que sí se puede —y es donde está la sustancia— es probar la
//  capa que decide QUÉ se muestra: si esta función se equivoca, el panel
//  atribuye mal por más correcto que sea el marcado.
//
//  Lo que se protege:
//
//   · que una composición liste a TODOS sus autores. Una figura hecha con cinco
//     dibujos de cinco personas atribuida a una sola incumple la licencia de
//     las otras cuatro;
//   · que el control «Créditos» aparezca exactamente donde la licencia lo
//     exige: ni de menos (incumplimiento) ni de más (ruido en 130 iconos CC0);
//   · que la página global recoja también los componentes que viven DENTRO de
//     una composición, que no aparecen en el mapa de temas y cuya licencia
//     sigue viva;
//   · que el texto copiable sea utilizable: autor, título y licencia.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  activo, creditoDe, requiereCreditoVisible, activosEnUso, agrupadosPorLicencia,
  autoresEnUso, avisosDeLicencia, srcDeActivo, iconoDeTema, activoCanonicoDeTema,
  activosDeTema, esIdentificadorDeActivo,
} from '../src/lib/activosMedicos.js'
import { ACTIVOS_MEDICOS } from '../src/data/activosMedicos.js'
import { textoAtribucion, LICENCIAS } from '../src/lib/licenciasActivos.js'

const unaCcBy = ACTIVOS_MEDICOS.find((a) => a.license.id === 'CC-BY-3.0')
const unaCc0 = ACTIVOS_MEDICOS.find((a) => a.license.id === 'CC0-1.0')
const unaComposicion = ACTIVOS_MEDICOS.find((a) => a.kind === 'composite' && (a.componentes || []).length >= 3)

test('un activo desconocido no devuelve nada inventado', () => {
  assert.equal(activo('no-existe'), null)
  assert.equal(creditoDe('no-existe'), null)
  assert.equal(srcDeActivo('no-existe'), '')
  assert.equal(requiereCreditoVisible('no-existe'), false)
  assert.equal(esIdentificadorDeActivo('no-existe'), false)
  // Y tampoco con basura: nada de construir una ruta con lo que llegue.
  assert.equal(srcDeActivo('../../etc/passwd'), '')
  assert.equal(srcDeActivo(''), '')
  assert.equal(srcDeActivo(null), '')
})

test('el crédito de una obra CC BY trae todo lo que la licencia exige', () => {
  const c = creditoDe(unaCcBy.id)
  assert.ok(c, 'debería haber al menos un activo CC BY 3.0 en el catálogo')
  assert.equal(c.exigeAtribucion, true)
  assert.ok(c.autor && c.autor.length > 1, 'sin autor')
  assert.ok(c.titulo, 'sin título')
  assert.equal(c.licencia.id, 'CC-BY-3.0')
  assert.match(c.licencia.url, /^https:\/\/creativecommons\.org\/licenses\/by\/3\.0\//)
  assert.ok(c.fuenteUrl, 'sin enlace a la fuente')
  assert.ok(c.sha256, 'sin hash de trazabilidad')
  // El texto copiable nombra al autor y a la licencia: es lo que alguien
  // pegaría al reutilizar la figura.
  assert.ok(c.textoCopiable.includes(c.autor), 'el texto copiable no nombra al autor')
  assert.ok(c.textoCopiable.includes('CC-BY-3.0'), 'el texto copiable no nombra la licencia')
})

test('una obra CC0 conserva su procedencia aunque no exija atribución', () => {
  const c = creditoDe(unaCc0.id)
  assert.ok(c)
  assert.equal(c.exigeAtribucion, false)
  // No exigir atribución no es lo mismo que no saber de dónde salió.
  assert.ok(c.autor, 'un CC0 también tiene autor y se registra')
  assert.ok(c.sha256)
  assert.equal(requiereCreditoVisible(unaCc0.id), false, 'un CC0 no necesita el control junto a la figura')
})

test('una composición acredita a cada uno de sus componentes', () => {
  const c = creditoDe(unaComposicion.id)
  assert.ok(c, 'debería haber composiciones con varios componentes')
  assert.equal(c.componentes.length, unaComposicion.componentes.length)
  for (const comp of c.componentes) {
    assert.ok(comp.titulo, `${comp.id}: sin título`)
    assert.ok(comp.autor, `${comp.id}: sin autor`)
    assert.ok(comp.licencia.id, `${comp.id}: sin licencia`)
  }
  // Y hereda la obligación: si un componente pide atribución, el control
  // «Créditos» tiene que aparecer junto a la figura.
  const algunoExige = c.componentes.some((x) => x.exigeAtribucion)
  assert.equal(requiereCreditoVisible(unaComposicion.id), algunoExige)
  // Una obra derivada declara qué se cambió.
  assert.ok(c.cambios.length > 0, 'una composición debe declarar sus cambios')
})

test('el control de créditos aparece exactamente donde hace falta', () => {
  let deMenos = 0
  let deMas = 0
  for (const a of ACTIVOS_MEDICOS) {
    const debe = a.license.attributionRequired
      || (a.componentes || []).some((id) => activo(id)?.license.attributionRequired)
    const hay = requiereCreditoVisible(a.id)
    if (debe && !hay) deMenos++
    if (!debe && hay) deMas++
  }
  assert.equal(deMenos, 0, `${deMenos} activos exigen atribución y no la mostrarían`)
  assert.equal(deMas, 0, `${deMas} activos mostrarían un crédito que su licencia no pide`)
})

test('la página global recoge también los componentes de las composiciones', () => {
  const usados = activosEnUso()
  assert.ok(usados.length >= 150, `solo ${usados.length} activos en uso`)
  const ids = new Set(usados.map((a) => a.id))
  // Un componente puede no estar en el mapa de temas —vive dentro de una
  // figura— y su licencia sigue viva: tiene que aparecer en /creditos.
  const faltan = []
  for (const c of ACTIVOS_MEDICOS.filter((a) => a.kind === 'composite')) {
    for (const comp of c.componentes || []) if (!ids.has(comp)) faltan.push(`${c.id} usa ${comp} y no sale en créditos`)
  }
  assert.deepEqual(faltan, [], faltan.join('\n  '))
})

test('los grupos por licencia cubren todo lo usado y ninguno queda huérfano', () => {
  const usados = activosEnUso()
  const grupos = agrupadosPorLicencia(usados)
  const total = grupos.reduce((n, g) => n + g.activos.length, 0)
  assert.equal(total, usados.length, 'la agrupación por licencia pierde o duplica activos')
  for (const g of grupos) {
    assert.ok(g.licencia.id, 'un grupo sin licencia identificada')
    assert.ok(LICENCIAS[g.licencia.id], `licencia desconocida: ${g.licencia.id}`)
    assert.ok(g.activos.length > 0)
  }
})

test('el resumen por autor suma exactamente lo que hay', () => {
  const usados = activosEnUso()
  const autores = autoresEnUso(usados)
  const suma = autores.reduce((n, a) => n + a.obras, 0)
  assert.equal(suma, usados.length, 'el conteo por autor no cuadra con el total')
  // Ordenado de más a menos obras: es lo que hace legible una lista larga.
  for (let i = 1; i < autores.length; i++) {
    assert.ok(autores[i - 1].obras >= autores[i].obras, 'la lista de autores no está ordenada')
  }
  // Nadie sin nombre.
  assert.deepEqual(autores.filter((a) => !a.nombre).map((a) => a), [])
})

test('los avisos de licencia solo salen para las que los exigen', () => {
  const avisos = avisosDeLicencia()
  for (const a of avisos) {
    assert.ok(LICENCIAS[a.licencia]?.avisoObligatorio, `${a.id}: ${a.licencia} no exige aviso`)
    assert.ok(a.url, `${a.id}: un aviso sin enlace a la licencia no sirve`)
  }
})

test('cada tema resuelve su activo canónico y su icono', () => {
  // Es la parte que la interfaz usa en cada cabecera y en cada galería.
  const cardio = 'm2-afi-cardiovascular'
  assert.ok(activosDeTema(cardio).length >= 3, 'el tema cardiovascular debería traer varias figuras')
  assert.ok(activoCanonicoDeTema(cardio), 'sin activo canónico')
  assert.ok(iconoDeTema(cardio), 'sin icono')
  // El canónico es el PRIMERO del mapa: el orden es la decisión de curación.
  assert.equal(activoCanonicoDeTema(cardio).id, activosDeTema(cardio)[0].id)
  // Un tema inexistente no inventa nada.
  assert.deepEqual(activosDeTema('no-existe'), [])
  assert.equal(activoCanonicoDeTema('no-existe'), null)
  assert.equal(iconoDeTema('no-existe'), null)
})

test('la ruta que se sirve es del propio sitio, nunca una URL externa', () => {
  for (const a of ACTIVOS_MEDICOS.slice(0, 40)) {
    const src = srcDeActivo(a.id)
    assert.ok(src.includes('imagenes/medical/'), `${a.id}: ${src}`)
    assert.ok(!/^https?:/i.test(src), `${a.id} se serviría desde fuera: ${src}`)
  }
})

test('el texto de atribución no insinúa que el autor respalde PTEM', () => {
  // No es un detalle de estilo: las licencias CC prohíben sugerir aval o
  // patrocinio del autor original.
  const prohibidas = /respald|patrocin|avala|en colaboración con|con el apoyo de|en alianza/i
  const mal = ACTIVOS_MEDICOS
    .filter((a) => prohibidas.test(a.attribution.displayText))
    .map((a) => a.id)
  assert.deepEqual(mal, [], `Créditos que insinúan aval: ${mal.join(', ')}`)
})

test('textoAtribucion arma una cadena utilizable y declara los cambios', () => {
  const s = textoAtribucion({
    title: 'Riñón',
    creador: 'Servier',
    creadorUrl: 'https://smart.servier.com/',
    proveedor: 'BioIcons',
    licenciaId: 'CC-BY-3.0',
    cambios: ['rotulado en español'],
  })
  assert.match(s, /«Riñón»/)
  assert.match(s, /de Servier \(https:\/\/smart\.servier\.com\/\)/)
  assert.match(s, /vía BioIcons/)
  assert.match(s, /bajo CC-BY-3\.0/)
  assert.match(s, /Adaptado por PTEM: rotulado en español/)
})
