# Prompt para Claude: Módulo 2 completo y recuperación de actividades

Trabaja directamente en `C:\Users\PC\Documents\Paramedicos`.

No respondas con un plan. No vuelvas a auditar todo el repositorio. No crees infraestructura adicional. Esta ejecución debe producir material educativo visible en la aplicación.

Lee primero:

1. `CLAUDE.md`
2. `docs/ESTADO-PRODUCCION-ACELERADA.md`
3. `docs/BIBLIOTECA-DRIVE-PTEM.md`
4. `docs/REGISTRO-FUENTES-ACADEMICAS.json`
5. `scripts/seed/plan-rescate.json`, únicamente las unidades del Módulo 2
6. `src/data/contenido/README.md`
7. `src/lib/temaContenidoModelo.js`

Usa la línea base comprobada: 110 lecciones con material, 158 temas sin contenido y 477 pruebas aprobadas. Ejecuta primero las pruebas; si pasan, no inspecciones ni reescribas los controles existentes.

## Entrega obligatoria 1: Módulo 2 completo

Redacta e integra en una sola ejecución las 17 lecciones académicas del Módulo 2 listadas en `docs/ESTADO-PRODUCCION-ACELERADA.md`. No te detengas al terminar una unidad.

Usa como apoyo la biblioteca aportada:

- AAOS, *Anatomía y fisiología para el paramédico*, para orientación prehospitalaria;
- Guyton y Hall, 13.ª edición, para fisiología;
- Moore, 7.ª edición, para anatomía regional.

Tortora no está en la carpeta: no simules haberlo consultado ni le atribuyas páginas de otra obra. Cita únicamente las fuentes que abras realmente, con edición, capítulo y página cuando el archivo permita comprobarla. No copies texto protegido.

El Módulo 2 enseña estructura y función. No introduzcas tratamientos, dosis, algoritmos avanzados, interpretación diagnóstica exhaustiva ni competencias clínicas que pertenecen a otros módulos. La conexión prehospitalaria debe limitarse a explicar por qué la anatomía o fisiología ayuda a observar, comunicar o comprender un hallazgo.

Cada una de las 17 lecciones debe incluir:

- resumen y duración realista;
- 2 a 4 objetivos observables;
- 3 a 5 secciones sustantivas;
- conceptos clave y relaciones estructura-función;
- 3 a 6 flashcards;
- 3 a 5 preguntas con explicación, respondibles solo con la lección;
- por lo menos una actividad significativa;
- fuentes específicas;
- ficha editorial en `borrador` o `en_revision`.

Para estas lecciones conceptuales, prefiere actividades de completar relaciones, clasificación, interpretación breve y asociación estructura-función. Usa `ordenar` solo cuando exista una secuencia fisiológica real. La actividad no puede ser una copia del quiz.

Configura también los cuatro nodos no expositivos del Módulo 2: primer examen, segundo examen, práctica y examen final. Los exámenes no llevan prosa y solo alcanzan lecciones anteriores según el plan. La práctica debe tener consigna, producto observable y lista de cotejo, sin inventar nota de aprobación.

Integra el nuevo archivo o archivos en `src/data/contenido/index.js` y en cualquier registro editorial real que consuma el generador.

## Entrega obligatoria 2: actividades de Módulo 3

Después de completar Módulo 2, añade actividades significativas a las 17 lecciones de Módulo 3 enumeradas en `docs/ESTADO-PRODUCCION-ACELERADA.md`. No reescribas sus explicaciones, fuentes, estados ni reactivos salvo que la actividad revele una contradicción concreta.

Para procedimientos, usa secuenciación solo si refleja una técnica real ya enseñada. Para evaluación, usa casos breves y decisiones de observación. Para dispositivos o temas bloqueados parcialmente, la actividad debe respetar las limitaciones y no convertir una descripción en autorización para ejecutar el procedimiento.

## Verificación y resultado

Después de integrar:

1. ejecuta generación del plan;
2. ejecuta pruebas;
3. ejecuta build;
4. regenera inventario y matriz;
5. calcula cobertura de actividades por módulo.

La entrega mínima aceptable debe mostrar:

- 17 lecciones nuevas de Módulo 2;
- 127 lecciones con material y 141 temas sin contenido, salvo diferencia explicada;
- 17/17 lecciones nuevas de Módulo 2 con actividad;
- deuda de actividades de Módulo 3 reducida de 17 a 0;
- pruebas y build aprobados.

Si una fuente concreta no abre, usa otra fuente identificada del registro y deja la deuda bibliográfica precisa; no detengas las otras 16 lecciones. No marques nada como validado o publicado.

No despliegues, no escribas en Firebase, no migres producción, no hagas commits y no borres el legado.

Comienza tu respuesta final con cifras, no con una narración:

- Lecciones nuevas integradas
- IDs terminados
- Lecciones con material: antes → después
- Temas sin contenido: antes → después
- Actividades M2: cubiertas/17
- Deuda de actividades M3: antes → después
- Pruebas
- Build
