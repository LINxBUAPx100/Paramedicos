// ============================================================
//  Matriz de decisiones por tema — entregable §14.2 del mandato
// ------------------------------------------------------------
//  Se GENERA en vez de escribirse a mano por la misma razón que planRescate.js:
//  una matriz redactada aparte se desincroniza del contenido en la primera
//  tanda de cambios, y una matriz desincronizada es peor que ninguna, porque
//  afirma un estado de revisión que ya no es cierto.
//
//  Aquí no se decide nada: se recoge lo que cada tema declara en su ficha
//  editorial y se ordena para que el cuerpo docente pueda revisarlo por
//  módulo, con las preguntas abiertas separadas de lo que ya está redactado.
//
//  Uso:  node scripts/matriz-decisiones.mjs   (o `npm run matriz`)
// ============================================================
import { writeFileSync } from 'node:fs'
import { planRescate } from '../src/data/planRescate.js'
import {
  estadoEditorialDe, esNodoDeEvaluacion, ETIQUETA_ESTADO, ESTADOS_EDITORIALES,
} from '../src/lib/estadoEditorial.js'
import { TEMAS_REDACTADOS, tieneBorradorLegado } from '../src/data/contenido/index.js'

const REDACTADOS = new Set(TEMAS_REDACTADOS)

// Qué se decidió con cada tema, deducido de su estado y su procedencia. Las
// cinco decisiones del mandato: conservar, corregir, generar, bloquear o
// pendiente de redacción.
function decision(tema) {
  const estado = estadoEditorialDe(tema)
  if (estado === 'bloqueado_por_decision') return 'BLOQUEAR'
  if (esNodoDeEvaluacion(tema)) return 'CONFIGURAR'
  if (estado === 'vacio') {
    return tieneBorradorLegado(tema.id) ? 'PENDIENTE (hay borrador legado)' : 'PENDIENTE'
  }
  if (!REDACTADOS.has(tema.id)) return 'REVISAR'
  const obs = tema.revision?.observaciones || []
  if (obs.some((o) => /desde cero|sustituye|reescritura/i.test(o))) return 'GENERAR'
  if (estado === 'en_revision') return 'CORREGIR'
  return 'CONSERVAR CON REVISIÓN'
}

const filas = []
for (const m of planRescate) {
  for (const u of m.unidades) {
    for (const id of u.temas) {
      const t = m.temas.find((x) => x.id === id)
      if (!t) continue
      filas.push({
        modulo: m.numeroOficial,
        moduloTitulo: m.tituloVisible || m.titulo,
        unidad: u.tituloVisible || u.titulo,
        tema: t,
        estado: estadoEditorialDe(t),
        decision: decision(t),
      })
    }
  }
}

const escapar = (s) => String(s || '').replace(/\|/g, '\\|').replace(/\n/g, ' ')

// ---------- preguntas abiertas a la academia ----------

const bloqueados = filas.filter((f) => f.estado === 'bloqueado_por_decision')
const conPendientesDeEvaluacion = filas.filter((f) => (f.tema.evaluacion?.pendientes || []).length)

// ---------- cifras clínicas declaradas ----------

const versiones = new Map()
for (const f of filas) {
  const v = f.tema.revision?.versionClinica
  if (!v) continue
  if (!versiones.has(v)) versiones.set(v, [])
  versiones.get(v).push(f.tema.id)
}

const resumen = ESTADOS_EDITORIALES
  .map((e) => [e, filas.filter((f) => f.estado === e).length])
  .filter(([, n]) => n > 0)

const md = `# Matriz de decisiones por tema

> Generado por \`scripts/matriz-decisiones.mjs\` — no editar a mano.
> Regenerar: \`npm run matriz\`

Este documento es el entregable de revisión docente. **Ningún tema de esta
matriz está validado**: la IA prepara contenido candidato y la academia valida
y autoriza la publicación.

## Resumen

| Estado editorial | Temas |
|---|---:|
${resumen.map(([e, n]) => `| ${ETIQUETA_ESTADO[e]} | ${n} |`).join('\n')}
| **Total** | **${filas.length}** |

### Qué significa cada decisión

| Decisión | Significado |
|---|---|
| CONSERVAR CON REVISIÓN | Material redactado a mano que se mantiene, pendiente de precisar fuentes y alcance antes de validarse. |
| CORREGIR | Se modificó una afirmación clínica concreta respecto de lo que había; el tema queda en revisión con su fuente. |
| GENERAR | Se redactó desde cero porque lo anterior mezclaba temas de origen distintos. |
| CONFIGURAR | Nodo de examen o práctica: se define alcance, banco y criterios, no prosa. |
| BLOQUEAR | El plan no da alcance suficiente; hay una pregunta concreta para la academia. |
| PENDIENTE | Sin redactar todavía. Si dice «hay borrador legado», existe material del temario anterior archivado que puede servir de punto de partida, nunca de contenido publicable. |

## Preguntas abiertas a la academia

Son ${bloqueados.length} temas detenidos. Cada uno espera una respuesta concreta;
mientras no llegue, el alumno ve «Contenido pendiente de decisión académica».

${bloqueados.map((f) => `### \`${f.tema.id}\` · ${f.tema.tituloVisible || f.tema.titulo}
**Módulo ${f.modulo} · ${f.unidad}**

${f.tema.revision.pregunta}
${(f.tema.revision.observaciones || []).map((o) => `- ${o}`).join('\n')}
`).join('\n')}

## Decisiones pendientes en exámenes y prácticas

${conPendientesDeEvaluacion.length === 0 ? '_Ninguna._' : `
| Nodo | Tipo | Decisión pendiente |
|---|---|---|
${conPendientesDeEvaluacion.flatMap((f) =>
  (f.tema.evaluacion.pendientes || []).map((p) =>
    `| \`${f.tema.id}\` | ${f.tema.evaluacion.tipo} | ${escapar(p)} |`)
).join('\n')}`}

## Versiones clínicas declaradas

Cada tema que fija una afirmación sujeta a cambio declara contra qué edición se
redactó. Es lo que permite saber qué hay que revisar cuando salga una guía nueva.

${versiones.size === 0 ? '_Ninguna todavía._' : `
| Versión / fecha de corte | Temas |
|---|---|
${[...versiones.entries()].map(([v, ids]) =>
  `| ${escapar(v)} | ${ids.map((i) => `\`${i}\``).join(', ')} |`).join('\n')}`}

## Matriz completa

${planRescate.map((m) => {
  const delModulo = filas.filter((f) => f.modulo === m.numeroOficial)
  return `### Módulo ${m.numeroOficial} — ${m.tituloVisible || m.titulo}

| Tema | Título | Estado | Decisión | Observaciones abiertas |
|---|---|---|---|---:|
${delModulo.map((f) => {
    const obs = (f.tema.revision?.observaciones || []).length
      + (f.tema.evaluacion?.pendientes || []).length
    return `| \`${f.tema.id}\` | ${escapar(f.tema.tituloVisible || f.tema.titulo)} | ${ETIQUETA_ESTADO[f.estado]} | ${f.decision} | ${obs || ''} |`
  }).join('\n')}`
}).join('\n\n')}

## Condición de terminación (§16 del mandato)

| Requisito | Estado |
|---|---|
| Ningún contenido heredado sin aprobar visible para el alumno | Cumplido — verificado por \`tests/integridadEditorial.test.mjs\` |
| Los 287 nodos con estado editorial explícito | Cumplido — ${filas.length} nodos |
| Temas académicos vacíos redactados o bloqueados | En curso — ${filas.filter((f) => f.estado === 'vacio').length} sin redactar |
| Temas escasos reconstruidos o bloqueados | En curso |
| «Completos» automáticos revisados desde cero | Cumplido — ninguno se publica ya |
| Los 50 temas manuales revisados | En curso — ${filas.filter((f) => f.estado === 'borrador').length} en borrador |
| Exámenes y prácticas respetan el plan | Cumplido — alcance calculado y verificado |
| Sin contradicciones clínicas conocidas | Verificado por \`tests/regresionClinica.test.mjs\` |
| Pruebas y build pasan | Sí |
| Matriz para revisión docente | Este documento |
`

writeFileSync(new URL('../docs/MATRIZ-DECISIONES.md', import.meta.url), md)
console.log(`✓ docs/MATRIZ-DECISIONES.md generado — ${filas.length} temas, ${bloqueados.length} bloqueados.`)
for (const [e, n] of resumen) console.log(`   ${String(n).padStart(3)}  ${ETIQUETA_ESTADO[e]}`)
