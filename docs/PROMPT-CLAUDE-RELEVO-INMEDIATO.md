# Prompt para la nueva cuenta de Claude

Trabaja directamente sobre el proyecto PTEM ubicado en:

`C:\Users\PC\Documents\Paramedicos`

Esta es una sesión de relevo. La cuenta anterior agotó su contexto después de integrar el Módulo 4. No asumas que quedó a medias y no repitas ese lote.

Lee completamente, en este orden:

1. `CLAUDE.md`
2. `docs/RELEVO-CLAUDE-2026-08-17.md`
3. `docs/ESTADO-PRODUCCION-ACELERADA.md`

No respondas únicamente con un plan.

La línea base ya fue comprobada por Codex: 7 módulos, 56 unidades, 287 nodos, 161 lecciones con material, 107 temas editoriales sin contenido, 58/58 lecciones redactadas de M4 con actividad, 14/14 evaluaciones configuradas, 495 pruebas aprobadas y build correcto.

Primero confirma que los archivos `m4-cardiologicas.js`, `m4-metabolicas.js`, `m4-urinarias.js`, `m4-neurologicas.js`, `m4-gineco-a.js`, `m4-gineco-b.js`, `m4-toxicologicas.js` y `m4-actividades.js` continúan importados en `src/data/contenido/index.js`. Ejecuta `npm test` y `npm run build`. Si obtienes la línea base indicada, no cambies ni reescribas M4. Corrige solamente una regresión demostrada.

Después completa las 17 actividades pendientes de M5 enumeradas en `docs/RELEVO-CLAUDE-2026-08-17.md`. Crea un archivo de actividades separado y fusiónalo por campo desde `src/data/contenido/index.js`, siguiendo los patrones de `m3-actividades.js` y `m4-actividades.js`. No modifiques la prosa, fuentes, estado, conceptos, tarjetas ni quiz de esas lecciones.

Cada actividad debe derivarse exclusivamente de la lección existente, exigir aplicación auténtica y no repetir literalmente el quiz. No introduzcas datos, dosis, procedimientos, indicaciones ni contraindicaciones que la página no enseñe. Añade una prueba que exija 33/33 lecciones redactadas de M5 con actividad y que compruebe que el archivo de actividades no borró su contenido anterior.

Al terminar ejecuta, una sola vez y en este orden:

1. `npm run gen:plan`
2. `npm run gen:nav`
3. `npm test`
4. `npm run build`
5. `npm run inventario -- --md`
6. `npm run matriz`

Entrega un reporte final con: actividades nuevas incorporadas, IDs terminados, cobertura M5 antes/después, pruebas, build y archivos modificados.

No inicies todavía las 66 lecciones nuevas de M5: el usuario encargó a Codex preparar primero su guía de investigación tema por tema. No valides ni publiques. No despliegues. No escribas en Firebase. No migres producción. No hagas commits ni push. No borres el legado ni limpies el árbol de trabajo.
