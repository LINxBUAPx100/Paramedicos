# Prompt para Claude: completar las 34 lecciones restantes del Módulo 4

Trabaja directamente en `C:\Users\PC\Documents\Paramedicos`.

No respondas con un plan. No repitas la auditoría ni la investigación bibliográfica. Codex ya hizo la investigación y la convirtió en una pauta temática obligatoria.

Lee únicamente lo necesario para producir:

1. `CLAUDE.md`
2. `docs/GUIA-REDACCION-M4-RESTANTE.md`
3. `docs/REGISTRO-FUENTES-ACADEMICAS.json`
4. `docs/PLAN-PRODUCCION-HASTA-VIERNES-2026-08-21.md`
5. Las unidades correspondientes del PDF/semilla oficial
6. El contrato de contenido de `src/data/contenido/README.md`

Línea base: 127 lecciones con material, 141 vacías y 485 pruebas aprobadas.

## Trabajo obligatorio

Redacta e integra las 34 lecciones vacías de estas seis unidades del Módulo 4:

- 7 de urgencias cardiológicas;
- 3 de urgencias metabólicas;
- 4 de urgencias urinarias;
- 5 de urgencias del sistema nervioso;
- 11 de urgencias gineco-obstétricas;
- 4 de urgencias toxicológicas.

Sigue tema por tema la guía `docs/GUIA-REDACCION-M4-RESTANTE.md`. Esa guía indica propósito, secciones, límites, actividad sugerida y fuente. No agregues materias fuera del título oficial.

Cada lección debe incluir resumen, duración, objetivos, 3 a 5 secciones sustantivas, conceptos, flashcards, 3 a 5 preguntas explicadas, una actividad distinta del quiz, fuentes específicas y ficha editorial. Todo reactivo y toda actividad deben responderse solo con la lección.

Usa `en_revision` únicamente cuando todas las fuentes centrales estén verificadas; usa `borrador` si queda una deuda bibliográfica importante. Nunca uses `validado` o `publicado`.

No inventes dosis, concentraciones, energías, ritmos de infusión, maniobras obstétricas o competencias. Cuando una intervención dependa del servicio, enseña el principio seguro, escribe “según protocolo local” y registra exactamente qué falta. No bloquees una lección completa por una dosis local.

Además, añade actividades a las 16 lecciones ya redactadas del Módulo 4 listadas en `docs/ESTADO-PRODUCCION-ACELERADA.md`. Aporta solo el campo `actividades`; no reescribas sus lecciones.

Conserva los bloqueos parciales ya documentados en `m4-far-dosis-urgencia` y `m4-far-infusiones-aminas`, que sí tienen lección, y el bloqueo total de `m4-pra-taller-aminas` hasta recibir formulario, concentraciones, competencia y protocolo local.

## Verificación

Ejecuta generación, pruebas, build, inventario y matriz una sola vez al terminar el lote completo. Añade controles dirigidos para:

- que las 34 lecciones existan y tengan actividad;
- que SCA cite la guía ACC/AHA/ACEP/NAEMSP/SCAI 2025;
- que hipertensión distinga cifra severa de daño agudo de órgano;
- que EVC no pretenda diferenciar isquemia/hemorragia sin imagen;
- que el borrador KDIGO 2027 no aparezca como guía publicada;
- que hemorragia obstétrica no recomiende tacto vaginal;
- que picaduras prohíba incisión, succión y torniquete;
- que anafilaxia no dependa de lesiones cutáneas para reconocerse;
- que la deuda de actividades de M4 sea cero.

Meta mínima esperada:

- 34 lecciones nuevas;
- lecciones con material: 127 → 161;
- temas sin contenido: 141 → 107;
- actividades M4: deuda 16 → 0;
- pruebas y build aprobados.

No despliegues, no escribas en Firebase, no migres producción, no hagas commits y no borres el legado.

Tu informe comienza con las cifras anteriores y después enumera fuentes realmente consultadas y bloqueos locales. Leer documentos o crear infraestructura no cuenta como producción.
