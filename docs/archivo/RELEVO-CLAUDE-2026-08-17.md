# Relevo de sesión para Claude — 17 de agosto de 2026

Este archivo existe porque la sesión anterior de Claude agotó su contexto después de integrar el lote restante del Módulo 4 y antes de entregar un cierre fiable. Es el punto de continuación autoritativo para otra cuenta. No reconstruyas el historial a partir de suposiciones y no repitas trabajo terminado.

## 1. Punto exacto donde quedó la sesión

La redacción e integración del lote de M4 **sí terminó**. Están importados en `src/data/contenido/index.js`:

- `m4-cardiologicas.js`: 7 lecciones;
- `m4-metabolicas.js`: 3 lecciones;
- `m4-urinarias.js`: 4 lecciones;
- `m4-neurologicas.js`: 5 lecciones;
- `m4-gineco-a.js` y `m4-gineco-b.js`: 11 lecciones en conjunto;
- `m4-toxicologicas.js`: 4 lecciones;
- `m4-actividades.js`: actividades para las 16 lecciones antiguas de M4 que no las tenían.

Los 34 IDs exigidos por `docs/GUIA-REDACCION-M4-RESTANTE.md` existen. No hay un archivo clínico del lote a medio escribir. Las 58 lecciones con material del Módulo 4 tienen al menos una actividad válida.

Los tres pendientes que el inventario muestra en M4 **no son lecciones omitidas**:

- `m4-pra-taller-aminas`: práctica bloqueada hasta recibir formulario, concentraciones, equipo y protocolo local;
- `m4-examen-1-unico`: nodo de examen configurado, sin prosa por diseño;
- `m4-examen-final-unico`: nodo de examen configurado, sin prosa por diseño.

No intentes “rellenarlos” para bajar la métrica.

## 2. Línea base comprobada por Codex

Comprobación realizada después del corte de Claude:

- estructura: 7 módulos, 56 unidades y 287 nodos;
- lecciones con material estudiable: **161**;
- temas editoriales sin contenido: **107**;
- borradores: **71**;
- en revisión: **104**;
- bloqueados por decisión: **5**;
- nodos de evaluación configurados: **14 de 14**;
- actividades de M4: **58 de 58 lecciones redactadas**;
- pruebas: **495 aprobadas, 0 fallidas**;
- build de Vite: **correcto**;
- inventario y matriz: regenerados.

La advertencia de Vite sobre fragmentos mayores de 500 kB es una advertencia previa de tamaño, no una regresión del lote académico. No conviertas el relevo en una refactorización de rendimiento.

## 3. Orden de trabajo para la cuenta de relevo

1. Lee completamente `CLAUDE.md` y este archivo.
2. Revisa `git status` solo para preservar el árbol existente. No limpies, reviertas ni borres cambios.
3. Confirma que los siete archivos del apartado 1 siguen importados en `src/data/contenido/index.js`.
4. Ejecuta `npm test`. La referencia es 495/495. Si continúa pasando, no modifiques las pruebas ni reescribas M4.
5. Ejecuta `npm run build`. Si continúa pasando, considera cerrado técnicamente el lote de M4.
6. Continúa con trabajo útil y seguro: agrega las 17 actividades pendientes de las lecciones ya redactadas del Módulo 5.
7. Ejecuta una sola vez al final: `npm run gen:plan`, `npm run gen:nav`, `npm test`, `npm run build`, `npm run inventario -- --md` y `npm run matriz`.
8. Entrega el cierre con métricas antes/después y los archivos tocados. No respondas solamente con un plan.

## 4. Deuda exacta de actividades de M5

Añade únicamente el campo `actividades` por fusión, siguiendo el patrón de `m3-actividades.js` y `m4-actividades.js`. No reescribas las lecciones ni cambies sus fuentes, estados, quiz, tarjetas o conceptos.

1. `m5-tt-definicion`
2. `m5-tt-clavicula`
3. `m5-tt-escapula`
4. `m5-tt-esofago`
5. `m5-tt-hemoneumotorax`
6. `m5-tt-quilotorax`
7. `m5-tt-asfixia-traumatica`
8. `m5-tt-ruptura-diafragmatica`
9. `m5-ta-definicion`
10. `m5-ta-estomago`
11. `m5-ta-pancreas`
12. `m5-ta-bazo`
13. `m5-ta-higado`
14. `m5-tcc-lesiones-difusas`
15. `m5-tcc-medular-posterior`
16. `m5-tcc-exploracion-fisica`
17. `m5-tcc-signos-tratamiento-columna`

Cada actividad debe derivarse exclusivamente de la lección existente. Puede ser un caso breve, clasificación, relación causal, completar o secuencia clínica real. No repitas literalmente preguntas del quiz. No introduzcas dosis, procedimientos, indicaciones, contraindicaciones ni datos que la lección no enseñe.

## 5. Límite del relevo

No inicies por tu cuenta la redacción de las 66 lecciones nuevas que faltan en M5. Ese contenido necesita una guía de investigación tema por tema; el usuario encargó a Codex investigar y a Claude integrar y dar forma a la web. Completar las 17 actividades mantiene la producción en movimiento sin permitir que una nueva sesión improvise alcance clínico.

No valides ni publiques temas. No despliegues. No escribas en Firebase. No migres producción. No hagas commits ni push. No borres el legado.
