# Prompt de ejecución — Módulo 5, lote A

Trabaja directamente sobre el proyecto PTEM ubicado en:

`C:\Users\PC\Documents\Paramedicos`

Esta ejecución es de **producción de contenido**, no de planeación. No respondas únicamente con un plan, una auditoría ni infraestructura.

Lee completamente y obedece, en este orden:

1. `CLAUDE.md`
2. `docs/GUIA-REDACCION-M5-LOTE-A.md`
3. `docs/REGISTRO-FUENTES-ACADEMICAS.json`
4. `docs/DOSSIER-FUENTES-POR-MODULO.md`
5. `docs/BIBLIOTECA-DRIVE-PTEM.md`
6. `docs/AUDITORIA-ACADEMICA-PTEM.md`
7. `src/data/contenido/README.md`
8. `src/lib/temaContenidoModelo.js`
9. `scripts/seed/plan-rescate.json`
10. El PDF oficial indicado en `CLAUDE.md`

Línea base comprobada: 499 pruebas pasan; hay 161 lecciones con material y 107 vacíos editoriales; las 33 lecciones ya redactadas de M5 tienen actividad. Verifica brevemente esa línea base y corrige solo una regresión demostrada. No vuelvas a tocar las 17 actividades ya integradas ni las 34 lecciones nuevas de M4.

## Entrega principal obligatoria

Redacta e integra las **33 lecciones nuevas** enumeradas en `docs/GUIA-REDACCION-M5-LOTE-A.md`, desde `m5-cin-definicion` hasta `m5-tcc-lesiones-focales`, respetando exactamente la lista y el orden de la guía. Deben quedar en los archivos que consume la aplicación, con sus importaciones reales. No conviertas el examen intermedio en prosa y no sustituyas el lote por actividades o inventarios.

La guía ya resolvió alcance, fuentes, diferencias históricas/actuales y contenido esperado casi sección por sección. Síguela literalmente salvo que detectes una contradicción verificable con una fuente primaria; si ocurre, conserva el tema, registra la discrepancia y aplica la fuente vigente.

Para cada lección:

- conserva ID, ubicación y título curricular; las erratas “Wadell” y “Kellie–Monroe” se documentan, pero el texto visible usa Waddell y Monro–Kellie;
- usa tono formal, universitario, técnico y prehospitalario;
- escribe resumen, objetivos, secciones, conceptos, tarjetas, quiz, actividad, fuentes y metadatos editoriales;
- deriva tarjetas, preguntas y actividad exclusivamente de lo enseñado en esa misma página;
- deja el estado en `borrador` o `en_revision`, nunca `validado` ni `publicado`;
- para PHTLS 9, cita edición, capítulo y página impresa exacta dentro de los intervalos verificados de la guía;
- para actualización clínica, usa las URLs primarias registradas; no inventes localizadores;
- separa base curricular histórica, actualización clínica y protocolo local;
- no copies pasajes extensos de libros protegidos; sintetiza y atribuye;
- no inventes dosis, volúmenes, calibres, concentraciones, sitios invasivos, umbrales ni competencias.

## Límites clínicos innegociables

- El mecanismo orienta sospecha y triaje; nunca diagnostica una lesión.
- No atribuyas la “tríada de Waddell” a PHTLS si no encuentras una fuente reproducible para el epónimo.
- En neumotórax abierto aplica AHA 2024: no impongas como regla universal el apósito oclusivo de tres lados; contempla dejar expuesta, apósito limpio no oclusivo o sello ventilado, y aflojar/retirar si empeora la respiración.
- En torniquete no indiques aflojamiento periódico ni un tiempo máximo universal.
- No diagnostiques una lesión intracraneal específica por un solo hallazgo o mecanismo.
- Descompresión torácica, vía aérea avanzada, fluidos, hemoderivados, oxígeno, analgesia y destino dependen de alcance/protocolo cuando corresponda.

## Implementación y aceptación

Distribuye el lote en archivos coherentes de `src/data/contenido/` y regístralos en `src/data/contenido/index.js` siguiendo el patrón actual. No sobrescribas contenido previo al fusionar. Añade pruebas de regresión específicas para los ocho controles indicados al final de la guía.

Después ejecuta, en este orden:

1. `npm run generar`
2. `npm test`
3. `npm run build`
4. `npm run inventario -- --md`
5. `npm run matriz`

Si una lección concreta queda bloqueada, registra la fuente o decisión exacta que falta y continúa con todas las demás; no detengas el lote. El objetivo esperado es 194 lecciones con material y 74 vacíos editoriales. Si las cifras difieren, explica la causa contando IDs reales, no lo ocultes.

En tu respuesta final informa únicamente resultados verificables:

- 33 lecciones nuevas incorporadas o lista exacta de las que faltaron;
- IDs terminados;
- material antes/después;
- vacíos antes/después;
- actividades nuevas;
- pruebas y build;
- archivos modificados;
- bloqueos clínicos o fuentes pendientes.

No despliegues, no escribas en Firebase, no migres producción, no hagas commits y no borres el legado.
