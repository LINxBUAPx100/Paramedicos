// ============================================================
//  Inventario del contenido FALTANTE del temario oficial.
// ------------------------------------------------------------
//  Recorre el plan generado y clasifica cada tema por lo que le falta, para
//  que el trabajo editorial pendiente sea una lista concreta y no una
//  sensación. Distingue tres situaciones, porque exigen trabajo distinto:
//
//    VACÍO    — sin una sola pieza de material.
//    ESCASO   — tiene algo, pero no lo mínimo para estudiarse (ver MINIMOS).
//    COMPLETO — cumple el mínimo.
//
//  Además propone el MOLDE de redacción de cada tema. No es cosmético: una
//  ficha de patología y una de procedimiento no se escriben igual, y agrupar
//  por molde permite redactar en tandas homogéneas y revisarlas rápido.
//
//  Uso:  node scripts/inventario-contenido.mjs           (resumen)
//        node scripts/inventario-contenido.mjs --lista   (detalle completo)
//        node scripts/inventario-contenido.mjs --md      (escribe docs/CONTENIDO-PENDIENTE.md)
// ============================================================
import { writeFileSync } from 'node:fs'
import { planRescate } from '../src/data/planRescate.js'
import {
  estadoEditorialDe, esNodoDeEvaluacion, tieneMaterial, ETIQUETA_ESTADO, ESTADOS_EDITORIALES,
} from '../src/lib/estadoEditorial.js'

const args = process.argv.slice(2)
const LISTA = args.includes('--lista')
const MD = args.includes('--md')

// Mínimo para que un tema se considere estudiable. No es un ideal: es el suelo
// por debajo del cual abrir el tema decepciona al alumno.
const MINIMOS = { secciones: 1, quiz: 2, flashcards: 2, conceptosClave: 1 }

const PROCEDIMIENTO = /t[ée]cnica|uso del|manejo de|taller|canalizaci[óo]n|inmovilizaci[óo]n|levantamiento|maniobra|toma de|curaci[óo]n|punci[óo]n|colocaci[óo]n|f[ée]rula|vendaje|exploraci[óo]n|apertura|aplicaci[óo]n|dispositivos|c[áa]nulas|intubaci[óo]n|mascarilla|obturador|torniquete|reanimaci[óo]n|rcp|desfibrilador|dea\b/i
const CONCEPTO = /definici[óo]n|conceptos|terminolog[íi]a|generalidades|introducci[óo]n|clasificaci[óo]n|tipos de|aspectos|bienestar|posiciones|epidemiolog[íi]a|urgencia y emergencia|impacto del|comunicaci[óo]n|asuntos|situaciones/i

function molde(tema, unidad) {
  if (unidad.tipo === 'examen') return 'examen'
  if (unidad.tipo === 'practica') return 'práctica'
  if (PROCEDIMIENTO.test(tema.titulo)) return 'procedimiento'
  if (CONCEPTO.test(tema.titulo)) return 'concepto'
  return 'patología'
}

function faltantes(t) {
  const f = []
  for (const [campo, min] of Object.entries(MINIMOS)) {
    const n = (t[campo] || []).length
    if (n < min) f.push(`${campo} ${n}/${min}`)
  }
  return f
}

const filas = []
for (const m of planRescate) {
  for (const u of m.unidades) {
    for (const id of u.temas) {
      const t = m.temas.find((x) => x.id === id)
      if (!t) continue
      const total = ['secciones', 'quiz', 'flashcards', 'conceptosClave']
        .reduce((n, c) => n + (t[c] || []).length, 0)
      const falta = faltantes(t)
      filas.push({
        modulo: m.numeroOficial, moduloTitulo: m.titulo,
        unidad: u.titulo, unidadTipo: u.tipo,
        id: t.id, titulo: t.titulo,
        estado: total === 0 ? 'VACÍO' : falta.length ? 'ESCASO' : 'COMPLETO',
        // El conteo de campos y el estado EDITORIAL responden preguntas
        // distintas: uno dice cuánto hay, el otro de dónde salió y quién
        // respondió por ello. Se informan por separado a propósito, porque
        // confundirlos fue el error que llamó COMPLETOS a 32 temas armados
        // automáticamente.
        estadoEditorial: estadoEditorialDe(t),
        evaluacion: esNodoDeEvaluacion(t),
        tieneMaterial: tieneMaterial(t),
        pendientes: (t.revision?.observaciones || []).length
          + (t.evaluacion?.pendientes || []).length,
        molde: molde(t, u),
        falta,
        conteo: {
          sec: (t.secciones || []).length, quiz: (t.quiz || []).length,
          fc: (t.flashcards || []).length, cc: (t.conceptosClave || []).length,
        },
      })
    }
  }
}

const vacios = filas.filter((f) => f.estado === 'VACÍO')
const escasos = filas.filter((f) => f.estado === 'ESCASO')
const completos = filas.filter((f) => f.estado === 'COMPLETO')

console.log('— Inventario de contenido del plan oficial —\n')
console.log(`  Temas totales : ${filas.length}`)
console.log(`  COMPLETO      : ${completos.length}`)
console.log(`  ESCASO        : ${escasos.length}`)
console.log(`  VACÍO         : ${vacios.length}\n`)

console.log('  — Estado EDITORIAL (de dónde salió el material y quién respondió por él) —')
for (const e of ESTADOS_EDITORIALES) {
  const n = filas.filter((f) => f.estadoEditorial === e).length
  if (n) console.log(`    ${String(n).padStart(3)}  ${ETIQUETA_ESTADO[e]}`)
}
const conPendientes = filas.filter((f) => f.pendientes > 0).length
console.log(`    ${String(conPendientes).padStart(3)}  temas con observaciones abiertas`)
console.log(`    ${String(filas.filter((f) => f.evaluacion).length).padStart(3)}  nodos de evaluación (examen o práctica)`)
// Lecciones REALES: excluye los nodos de evaluación, que no llevan ni pueden
// llevar material de estudio. Es la cifra que el generador informaba mal.
const lecciones = filas.filter((f) => !f.evaluacion && f.tieneMaterial).length
console.log(`    ${String(lecciones).padStart(3)}  lecciones con material estudiable\n`)

const porMolde = {}
for (const f of [...vacios, ...escasos]) porMolde[f.molde] = (porMolde[f.molde] || 0) + 1
console.log('  Pendiente por molde de redacción:')
for (const [k, v] of Object.entries(porMolde).sort((a, b) => b[1] - a[1])) {
  console.log(`    ${String(v).padStart(3)}  ${k}`)
}

console.log('\n  Pendiente por módulo:')
for (const m of planRescate) {
  const p = [...vacios, ...escasos].filter((f) => f.modulo === m.numeroOficial)
  const v = p.filter((f) => f.estado === 'VACÍO').length
  console.log(`    Módulo ${m.numeroOficial}: ${String(p.length).padStart(3)} pendientes (${v} vacíos) — ${m.titulo}`)
}

function detalle(lista, titulo) {
  const out = [`\n## ${titulo} (${lista.length})\n`]
  let modAct = null
  let uniAct = null
  for (const f of lista) {
    if (f.modulo !== modAct) {
      out.push(`\n### Módulo ${f.modulo} — ${f.moduloTitulo}\n`)
      modAct = f.modulo
      uniAct = null
    }
    if (f.unidad !== uniAct) {
      out.push(`\n**${f.unidad}**\n`)
      uniAct = f.unidad
    }
    const det = f.estado === 'ESCASO' ? ` — falta: ${f.falta.join(', ')}` : ''
    const ed = ` · **${ETIQUETA_ESTADO[f.estadoEditorial]}**`
    out.push(`- \`${f.id}\` · ${f.titulo} _(${f.molde})_${ed}${det}`)
  }
  return out.join('\n')
}

if (LISTA) {
  console.log(detalle(vacios, 'Temas VACÍOS'))
  console.log(detalle(escasos, 'Temas ESCASOS'))
}

if (MD) {
  const md = `# Contenido pendiente del plan oficial R.E.S.C.A.T.E.

> Generado por \`scripts/inventario-contenido.mjs\` — no editar a mano.
> Regenerar: \`npm run inventario -- --md\`

De los **${filas.length}** temas del plan: **${completos.length} completos**,
**${escasos.length} escasos** y **${vacios.length} vacíos**.

## Estado editorial

Esta es la cifra que importa. «Completo» solo cuenta campos; el estado editorial
dice de dónde salió el material y quién respondió por él.

| Estado | Temas |
|---|---:|
${ESTADOS_EDITORIALES
  .map((e) => [e, filas.filter((f) => f.estadoEditorial === e).length])
  .filter(([, n]) => n > 0)
  .map(([e, n]) => `| ${ETIQUETA_ESTADO[e]} | ${n} |`)
  .join('\n')}

Ningún tema puede llegar a *Validado* o *Publicado* por generación: esos dos
estados exigen nombre de docente, fecha y fuentes trazables.

**Lecciones con material estudiable: ${filas.filter((f) => !f.evaluacion && f.tieneMaterial).length}**
de ${filas.filter((f) => !f.evaluacion).length} lecciones del plan. Los
${filas.filter((f) => f.evaluacion).length} nodos de evaluación se cuentan aparte:
no llevan material de estudio y sumarlos aquí infla la cobertura.

Se considera *completo* un tema con al menos ${MINIMOS.secciones} sección,
${MINIMOS.quiz} preguntas, ${MINIMOS.flashcards} flashcards y
${MINIMOS.conceptosClave} concepto clave. Es un suelo, no un ideal: por debajo,
abrir el tema decepciona al alumno.

El **molde** propone cómo redactarlo:

| Molde | Estructura |
|---|---|
| patología | definición → fisiopatología breve → signos y síntomas → manejo prehospitalario → banderas rojas |
| procedimiento | indicaciones → contraindicaciones → técnica paso a paso → complicaciones |
| concepto | definición → aplicación → ejemplos |
| examen / práctica | no lleva prosa: se resuelve cableando \`alcanceDeExamen\` |
${detalle(vacios, 'Temas VACÍOS')}
${detalle(escasos, 'Temas ESCASOS')}
`
  writeFileSync(new URL('../docs/CONTENIDO-PENDIENTE.md', import.meta.url), md)
  console.log('\n✓ docs/CONTENIDO-PENDIENTE.md generado.')
}
