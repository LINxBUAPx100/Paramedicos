# Estado de producción acelerada de PTEM

Fecha de corte: 17 de agosto de 2026.

## Cobertura académica real

| Métrica | Antes de este lote | Estado actual | Cambio |
|---|---:|---:|---:|
| Lecciones con material estudiable | 194 | 268 | +74 |
| Temas sin contenido editorial | 74 | 0 | -74 |
| Borradores | 104 | 178 | +74 |
| En revisión | 104 | 104 | 0 |
| Bloqueados por decisión | 5 | 5 | 0 |

**La cobertura de lecciones del plan está completa.** Los 287 nodos se reparten en 268 lecciones con material, 14 nodos de evaluación configurados sin prosa por diseño y 5 temas bloqueados por decisión de la academia. No queda ningún tema vacío.

El avance de 74 lecciones corresponde al lote B del Módulo 5 (33) y al Módulo 6 completo (41). Pasan 515 controles automatizados, el build de producción es correcto y los 287 temas validan contra el modelo sin errores.

## Estado por módulo

Ningún módulo conserva temas vacíos. Los 19 nodos que el inventario sigue marcando como pendientes son, por diseño o por decisión:

- **14 nodos de evaluación** (12 exámenes y 2 prácticas), configurados y sin prosa;
- **5 temas bloqueados por decisión**: la práctica de aminas del Módulo 4 y los cuatro temas del Módulo 7, cuyo alcance el plan no define.

El **Módulo 7** sigue siendo el único módulo sin contenido, y su desbloqueo depende de que la academia declare el alcance de operaciones de ambulancias, acceso y extracción, operaciones especiales y triage.

## Cobertura de actividades

Se cuenta una actividad cuando la lección incluye al menos una propuesta válida en `actividades.ordenar`, `actividades.completar` o `actividades.preguntas`.

| Módulo | Lecciones redactadas | Con actividad | Deuda actual |
|---|---:|---:|---:|
| M1 | 20 | 20 | 0 |
| M2 | 17 | 17 | 0 |
| M3 | 33 | 33 | 0 |
| M4 | 58 | 58 | 0 |
| M5 | 99 | 99 | 0 |
| M6 | 41 | 41 | 0 |
| M7 | 0 | 0 | bloqueado por alcance |

**No quedan lecciones redactadas sin actividad.** Las 17 que faltaban en M5 se resolvieron el 17 de agosto de 2026 con `src/data/contenido/m5-actividades.js`, que aporta únicamente el campo `actividades` por fusión y no toca prosa, fuentes, estado, conceptos, tarjetas ni quiz. Las nuevas lecciones deben nacer con actividad, por lo que esa deuda no debe volver a abrirse.

### Deuda de Módulo 5, ya saldada

Los 17 ids eran `m5-tt-definicion`, `m5-tt-clavicula`, `m5-tt-escapula`, `m5-tt-esofago`, `m5-tt-hemoneumotorax`, `m5-tt-quilotorax`, `m5-tt-asfixia-traumatica`, `m5-tt-ruptura-diafragmatica`, `m5-ta-definicion`, `m5-ta-estomago`, `m5-ta-pancreas`, `m5-ta-bazo`, `m5-ta-higado`, `m5-tcc-lesiones-difusas`, `m5-tcc-medular-posterior`, `m5-tcc-exploracion-fisica` y `m5-tcc-signos-tratamiento-columna`. Cuatro pruebas de `tests/regresionClinica.test.mjs` impiden que la deuda regrese: exigen los 17 ids con actividad, 33/33 lecciones de M5 con actividad, que la fusión no haya borrado el contenido previo de esas lecciones y que ninguna actividad del módulo publique una dosis, un volumen o un calibre.

## Criterio pedagógico de actividad

Cada lección debe tener al menos una actividad significativa. Puede consistir en:

- completar una relación anatómica, fisiológica o causal;
- clasificar estructuras, funciones o hallazgos;
- ordenar únicamente un proceso que tenga secuencia real;
- interpretar un caso breve usando conceptos enseñados;
- relacionar estructura, función y manifestación observable;
- tomar una decisión de evaluación prehospitalaria sin introducir tratamiento fuera del tema.

No son aceptables:

- repetir literalmente una pregunta del quiz;
- ordenar listas sin una secuencia conceptual real;
- preguntar datos no enseñados en la lección;
- usar dosis, procedimientos o diagnósticos fuera del alcance;
- llamar “práctica” a una consigna genérica sin producto o criterio observable.

## Ritmo de producción

1. ~~Relevo inmediato: reconocer y verificar el Módulo 4 ya integrado; no repetirlo.~~ Hecho: 8 archivos importados, 495 pruebas y build correctos, sin regresión.
2. ~~En la misma ejecución: añadir actividades a las 17 lecciones señaladas de Módulo 5, sin reescribir su prosa.~~ Hecho: `m5-actividades.js`, 499 pruebas.
3. ~~**Siguiente entrega inmediata:** ejecutar `docs/PROMPT-CLAUDE-M5-LOTE-A.md` y crear las 33 lecciones nuevas indicadas en `docs/GUIA-REDACCION-M5-LOTE-A.md`. Meta: 161 → 194 lecciones con material y 107 → 74 vacíos editoriales.~~ Hecho: 33 lecciones integradas, 194 lecciones con material, 74 vacíos, 515 pruebas y build correctos. Las 33 nacieron con actividad y quedan en `borrador`.
4. ~~M5 lote B y M6.~~ Hecho: 74 lecciones integradas —33 del lote B de M5 y las 41 del Módulo 6—, todas nacidas con actividad y en `borrador`. La cobertura del plan queda completa.
5. **Siguiente fase:** ya no es producción de cobertura, sino REVISIÓN DOCENTE. Hay 178 borradores y 104 lecciones en revisión, ninguna validada. El trabajo pendiente es resolver las deudas bibliográficas declaradas, entregar el protocolo local y validar tema por tema.

Leer, investigar, inventariar o ejecutar pruebas no cuenta como lección producida. Las pruebas y el build son requisitos de aceptación posteriores a la integración.
