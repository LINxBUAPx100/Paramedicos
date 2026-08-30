// ============================================================
//  Enlaces del glosario — que la palabra subrayada lleve A SU PALABRA
// ------------------------------------------------------------
//  EL FALLO QUE ESTAS PRUEBAS CIERRAN
//
//  Pulsar un tecnicismo subrayado dentro de una lección te dejaba en el
//  encabezado de /logros, no en la definición. Tres causas encadenadas:
//
//   1. el armazón subía al inicio en CADA cambio de ruta, y como los efectos
//      del hijo corren antes que los del padre, deshacía el salto del glosario;
//   2. el glosario se rendía si la palabra aún no estaba en el DOM —y no lo
//      estaba, porque llega en un agregado aparte—;
//   3. /logros no pintaba nada hasta que cargaban los dos agregados de la
//      galería, así que la palabra tardaba en existir.
//
//  Lo que se protege aquí:
//   1. las rutas con destino propio (`?t=`, `?ref=`) no las mueve el armazón;
//   2. TODO término subrayable tiene ficha en /logros con el MISMO slug —si los
//      dos agregados dejaran de coincidir, el enlace llevaría a la nada—;
//   3. los slugs son únicos: dos palabras distintas no comparten destino.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  PARAMS_DE_SALTO, tieneSaltoPropio, debeSubirAlInicio,
} from '../src/lib/saltoEnPagina.js'
import { construirAgregados, glosarioParaEnlazar } from '../src/lib/agregadosModelo.js'
import { construirGlosario, slugTermino, partirTexto, expresionDeTerminos } from '../src/lib/glosario.js'
import { modulos } from '../src/data/index.js'

// ---------- 1. el armazón no pisa a quien se coloca solo ----------

test('una ruta con destino dentro de la página no se sube al inicio', () => {
  assert.equal(debeSubirAlInicio({ search: '?t=hipoperfusion' }), false)
  assert.equal(debeSubirAlInicio({ search: '?ref=torax-lateral' }), false)
  assert.equal(tieneSaltoPropio({ search: '?t=hipoperfusion' }), true)
})

test('una ruta normal sí se sube al inicio', () => {
  assert.equal(debeSubirAlInicio({ search: '' }), true)
  assert.equal(debeSubirAlInicio({}), true)
  assert.equal(debeSubirAlInicio({ search: '?q=trauma' }), true, 'buscar no es un salto interno')
  assert.equal(debeSubirAlInicio({ search: '?tab=grupos' }), true, '«tab» no es «t»')
})

test('un parámetro de salto vacío no cuenta como destino', () => {
  // `?t=` no señala ninguna palabra: si no se subiera al inicio, el lector
  // llegaría a media página sin motivo.
  assert.equal(debeSubirAlInicio({ search: '?t=' }), true)
  assert.equal(debeSubirAlInicio({ search: '?t=%20%20' }), true)
})

test('los parámetros de salto están declarados, no adivinados', () => {
  assert.deepEqual([...PARAMS_DE_SALTO].sort(), ['ref', 't'])
})

test('tieneSaltoPropio aguanta una entrada malformada sin romper la navegación', () => {
  assert.equal(tieneSaltoPropio(null), false)
  assert.equal(tieneSaltoPropio(undefined), false)
  assert.equal(tieneSaltoPropio('?t=hipoperfusion'), true, 'acepta la cadena suelta')
})

// ---------- 2. cada palabra subrayada tiene su ficha ----------

const { porModulo, globales } = construirAgregados(modulos)
const enlaces = globales.glosarioEnlaces
const fichas = porModulo.flatMap((m) => m.glosario)
const slugsConFicha = new Set(fichas.map((e) => e.slug))

test('el temario real tiene términos que subrayar', () => {
  assert.ok(enlaces.length > 500, `solo ${enlaces.length} términos subrayables`)
})

test('TODO término subrayable tiene ficha en el glosario, con el mismo slug', () => {
  // Ésta es la prueba que habría cazado el fallo si hubiera sido de datos.
  // Los dos agregados salen del mismo `construirGlosario`, pero nada lo
  // garantizaba: si uno se generase por módulo, el desempate de slugs repetidos
  // (`-2`) divergiría y cada enlace subrayado apuntaría a la nada.
  const rotos = enlaces
    .filter(([, slug]) => !slugsConFicha.has(slug))
    .map(([termino, slug]) => `${termino} → ${slug}`)
  assert.deepEqual(rotos, [], `${rotos.length} tecnicismos subrayados no llevan a ninguna ficha`)
})

test('ningún slug lleva a dos palabras distintas', () => {
  const vistos = new Map()
  const choques = []
  for (const e of fichas) {
    if (vistos.has(e.slug) && vistos.get(e.slug) !== e.termino) {
      choques.push(`${e.slug}: «${vistos.get(e.slug)}» y «${e.termino}»`)
    }
    vistos.set(e.slug, e.termino)
  }
  assert.deepEqual(choques, [])
})

test('el enlace que se pinta en la prosa apunta al slug de la ficha', () => {
  // Recorre el camino completo del lector: prosa → término reconocido →
  // slug → ficha. Si cualquiera de los tres eslabones cambiara de forma, el
  // enlace dejaría de resolver y hasta ahora nadie se enteraría.
  const paraEnlazar = glosarioParaEnlazar(enlaces)
  const regex = expresionDeTerminos(paraEnlazar.entradas)
  const muestra = fichas.slice(0, 40)
  for (const ficha of muestra) {
    const segmentos = partirTexto(`Antes de todo, ${ficha.termino} importa.`, paraEnlazar, { regex })
    const enlazado = segmentos.find((s) => s.entrada)
    assert.ok(enlazado, `«${ficha.termino}» no se reconoció en la prosa`)
    assert.ok(
      slugsConFicha.has(enlazado.entrada.slug),
      `«${ficha.termino}» enlaza a ${enlazado.entrada.slug}, que no tiene ficha`,
    )
  }
})

test('el slug es estable y apto para una URL', () => {
  assert.equal(slugTermino('Presión arterial media (PAM)'), slugTermino('Presión arterial media (PAM)'))
  for (const e of fichas) {
    assert.match(e.slug, /^[a-z0-9-]+$/, `slug no apto para URL: «${e.termino}» → ${e.slug}`)
  }
})

test('el glosario del curso entero y el de los agregados coinciden en tamaño', () => {
  const todosLosTemas = modulos.flatMap((m) => m.temas || [])
  const directo = construirGlosario(todosLosTemas)
  assert.equal(fichas.length, directo.entradas.length)
  assert.equal(enlaces.length, directo.entradas.length)
})
