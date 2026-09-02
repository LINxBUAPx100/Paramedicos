# PTEM — mandato de remediación académica para Claude

Este archivo es obligatorio para cualquier sesión de Claude que trabaje en este repositorio. Léelo completo antes de editar. Su propósito es reconstruir el contenido académico de PTEM sin volver a mezclar conceptos, inventar subtemas ni presentar como validadas piezas generadas o reubicadas automáticamente.

> **Este mandato cubre el trabajo EDITORIAL: redactar y validar el temario.**
> El trabajo TÉCNICO (arquitectura, clase en vivo, multi-grupo, certificados)
> avanza por separado y se registra en **`docs/PLAN-TECNICO-FASES.md`**. Si te
> han pedido una fase técnica, empieza por ahí; si te han pedido redactar
> temario, sigue en este archivo. Los dos proyectos son independientes: el
> software funciona sin que exista una línea de temario nuevo, y el temario se
> carga encima cuando esté listo.

## 0. Estado actual y mandato inmediato

La contención inicial ya fue implementada. **No vuelvas a empezar la arquitectura desde cero** y no restaures el fallback de `reutilizado.js`.

> **LAS CIFRAS DE ESTA SECCIÓN ESTABAN DESFASADAS EN MÁS DE CIEN LECCIONES.**
> Decían «107 temas vacíos, 161 lecciones con material», y eso llevaba a cada
> sesión nueva a creer que quedaba medio temario por escribir. Medido con
> `npm run inventario` el **2 de septiembre de 2026**, el temario está
> prácticamente redactado y lo que queda es una pasada de CALIDAD, no de
> relleno. Un mandato que miente sobre el estado del trabajo hace que se
> reescriba lo que ya estaba hecho.

Estado comprobado con `npm run inventario` el 2 de septiembre de 2026:

- 7 módulos, 56 unidades y 287 nodos oficiales.
- **268 lecciones con material estudiable** de 273 posibles; esta cifra mide presencia de material, no validación académica.
- **19 temas sin material**, y ninguno es una lección por escribir: **14 son nodos de evaluación** —12 exámenes y 2 prácticas— que por diseño no llevan prosa, y **5 están `bloqueado_por_decision`** esperando a la academia (los cuatro del Módulo 7 y el taller de aminas del Módulo 4).
- 178 temas en `borrador`, 104 en `en_revision`, 5 `bloqueado_por_decision`.
- 0 temas están `validado` o `publicado`.
- Los 14 nodos de evaluación tienen su `alcanceDeExamen` cableado.
- El corpus heredado quedó archivado y fuera del contenido que recibe el alumno.
- Las 58 lecciones redactadas del Módulo 4 tienen actividad; su deuda pedagógica es cero.
- Pasan 1 045 pruebas y el último build de producción verificado, pero eso **no equivale a validación académica**.

**Lo que queda editorialmente NO es escribir lecciones: es el trabajo A**, la
pasada de calidad módulo por módulo descrita en `docs/PLAN-TECNICO-FASES.md` y
en `PLAN-LMS.md` §25. Orden acordado: M3 y M5 primero —vía aérea, soporte vital
y trauma, el material de más riesgo—, luego M4, M6, M2 y M1. A cada lección se
le añaden, **derivadas de su propia prosa y sin un solo dato clínico nuevo**,
tabla comparativa o algoritmo, mnemotecnia, «Lo que más se pregunta», «Errores
frecuentes», «Repaso rápido» y «Preguntas de repaso oral».

Hecho el 02-09-2026: la unidad de **evaluación primaria y secundaria del Módulo
3** (10 lecciones, `m3-ep-*` y `m3-es-*`). Los helpers del molde v2 están al
principio de `src/data/contenido/m3-evaluacion.js` y se reutilizan tal cual en
los lotes siguientes.

Para el relevo inmediato lee de principio a fin `docs/GUIA-REDACCION-M5-LOTE-A.md` y ejecuta `docs/PROMPT-CLAUDE-M5-LOTE-A.md`. `docs/RELEVO-CLAUDE-2026-08-17.md`, `docs/GUIA-REDACCION-M4-RESTANTE.md` y `docs/PROMPT-CLAUDE-M4-RESTANTE.md` son antecedentes de lotes ya terminados: consúltalos solo ante una discrepancia concreta. **No vuelvas a redactar, resumir ni reorganizar las 34 lecciones nuevas del Módulo 4 ni las actividades de las 33 lecciones existentes de M5.**

Antes de redactar nuevos temas debes verificar y preservar estos cuatro controles surgidos de la segunda auditoría. En el estado comprobado actual ya tienen pruebas de regresión; no rehagas la solución si sigue cumpliéndose:

1. Los bancos de examen usan únicamente temas `validado` o `publicado`; `borrador` y `en_revision` quedan fuera.
2. OVACE pediátrica cita AHA/AAP *Pediatric Basic Life Support 2025* y distingue lactante, niño y pérdida de respuesta.
3. El tema médico-legal usa instrumentos jurídicos y sanitarios específicos, no solo NOM-034, y declara lo que depende del ámbito local.
4. Inventario, generador y contenido servido cuentan lecciones con material estudiable, no IDs declarados ni nodos de evaluación. La cifra actual comprobada es 161.

Además, conserva los dos controles bibliográficos añadidos durante la auditoría de trauma: ningún tema puede citar como fuente la portada comercial de PHTLS y toda cita de PHTLS debe declarar edición, capítulo y página. La biblioteca aportada por el usuario ya contiene una copia identificada y consultable de PHTLS 9; por ello, Claude debe localizar las páginas reales en esa copia y dejar una deuda solo cuando una búsqueda concreta no permita comprobarlas. La copia de PHTLS 10 declara traducción automática y no es citable.

Si alguno regresó, corrígelo primero. Después continúa la reconstrucción editorial real. No entregues solamente un plan, una lista de pendientes o más infraestructura: **redacta, integra y verifica el contenido faltante en los archivos que consume la aplicación**.

### Cuota de producción acelerada obligatoria

La prioridad del usuario es llenar los temas. Cada ejecución de trabajo debe completar **por lo menos 15 lecciones nuevas o un módulo académico completo si contiene menos**, salvo bloqueo externo demostrado. Si un tema se bloquea, registra la pregunta concreta y continúa con el siguiente tema seguro. No detengas una ejecución para entregar solo inventarios, investigación, pruebas o infraestructura.

Al menos 90 % del trabajo nuevo debe reflejarse en lecciones redactadas e integradas. Al terminar, informa de forma visible: lecciones nuevas incorporadas, IDs terminados, lecciones con material antes/después y vacíos antes/después. Las pruebas y el build son controles de calidad, no el producto principal.

La entrega de las **34 lecciones restantes del Módulo 4**, sus actividades y las 17 actividades antiguamente pendientes de M5 ya está integrada. La deuda pedagógica de las 33 lecciones existentes de M5 es cero. La siguiente sesión debe producir las **33 lecciones nuevas del Módulo 5, lote A**, siguiendo sin omisiones `docs/GUIA-REDACCION-M5-LOTE-A.md`; la investigación y los límites clínicos de ese lote ya fueron preparados por Codex.

Toda lección, nueva o ya redactada, debe incluir por lo menos una actividad de aprendizaje significativa y derivada de su propio contenido. No se exige una actividad motriz donde no corresponda: puede ser secuenciación clínica, completar relaciones causales, análisis de un caso breve, clasificación, interpretación o preguntas de aplicación. No sirven como actividad repetir el quiz, ordenar elementos arbitrariamente o pedir información que la lección no enseña.

Deuda de actividades comprobada: Módulos 1, 2, 3, 4 y 5 tienen actividad en todas sus lecciones redactadas. M5 está en 33/33 y cuatro pruebas impiden la regresión. Las lecciones nuevas deben nacer con actividad.

## 1. Misión

Debes convertir PTEM en una guía de estudio coherente con el plan oficial de R.E.S.C.A.T.E. y académicamente defendible.

El resultado final debe:

1. Conservar la estructura oficial del PDF.
2. Eliminar, reubicar o reescribir todo contenido contaminado.
3. Completar los temas realmente vacíos sin inventar el alcance del programa.
4. Actualizar afirmaciones clínicas cuando exista una guía vigente posterior al PDF, dejando claro qué corresponde al plan histórico y qué corresponde a la práctica actual.
5. Mantener trazabilidad de fuentes, edición, fecha y protocolo.
6. Separar contenido académico, evaluaciones, prácticas y decisiones pendientes de la academia.
7. No publicar ni desplegar nada sin revisión y autorización del usuario.

## 2. Fuentes rectoras y orden de autoridad

### 2.1 Fuente estructural obligatoria

El documento rector de estructura y alcance es:

`C:\Users\PC\Downloads\PLAN DE ESTUDIOS PARAMÉDICO RESCATE OFICIAL.pdf`

Tiene 17 páginas y define:

- siete módulos curriculares;
- las unidades o filas temáticas;
- los 287 subtemas estudiables;
- semanas y horas;
- exámenes y prácticas;
- requisito de dos cursos de especialización;
- nombres de los cursos de especialización;
- bibliografía sugerida.

El PDF define **qué debe enseñarse**, pero no siempre contiene suficiente desarrollo para decidir **cómo debe enseñarse** ni todas las cifras clínicas actuales.

### 2.2 Auditoría obligatoria

Antes de editar, lee completamente:

- `docs/AUDITORIA-ACADEMICA-PTEM.md`
- `docs/CONTENIDO-PENDIENTE.md`
- `docs/DOSSIER-FUENTES-POR-MODULO.md`
- `docs/BIBLIOTECA-DRIVE-PTEM.md`
- `docs/REGISTRO-FUENTES-ACADEMICAS.json`
- `src/data/contenido/README.md`
- `scripts/seed/plan-rescate.json`
- `src/lib/temaContenidoModelo.js`

La auditoría contiene errores confirmados, reescrituras base, vacíos prioritarios y criterios de validación. No la sustituyas por una revisión superficial.

### 2.3 Fuentes clínicas

Para afirmaciones clínicas usa, en este orden:

1. Normas, leyes y documentos oficiales mexicanos vigentes: DOF, Secretaría de Salud, CENETEC, COFEPRIS, IMSS cuando corresponda.
2. Guías oficiales de sociedades responsables del estándar: AHA, AAP, American Burn Association, Brain Trauma Foundation, WHO/OMS, FIGO, GINA u organismo equivalente.
3. Edición exacta del manual expresamente aprobada por la academia, cuando exista una copia legítima y consultable.
4. Artículos originales o revisiones sistemáticas cuando una guía no resuelva el punto.

El PDF presenta una bibliografía global: **no asigna libros por módulo**. No trates como oficial la distribución propuesta por Gemini u otra IA. Aplica la matriz de `docs/DOSSIER-FUENTES-POR-MODULO.md` y el registro legible por máquina.

Estado bibliográfico que no debes ocultar:

- PHTLS 9 y ACLS 2020 son las ediciones históricas nombradas por el plan; PHTLS 10 y AHA 2025 son posteriores.
- EMPACT es de 2012 y no gobierna algoritmos o dosis actuales.
- “Manual de Urgencias Jiménez”, AMIR, NALS y “Vademécum farmacología” no están identificados de forma reproducible.
- Para farmacología se exige la guía vigente de la indicación, IPP/registro COFEPRIS y formulario/protocolo local.
- El Módulo 7 carece de subtemas oficiales y permanece bloqueado aunque existan fuentes candidatas.

La carpeta de Drive aportada por el usuario ya fue inventariada y clasificada en `docs/BIBLIOTECA-DRIVE-PTEM.md`. Contiene 77 archivos, pero no todos son fuentes académicas válidas. Usa obligatoriamente su clasificación: PHTLS 9 quedó identificado; Tortora no está en la carpeta; Bibiano no es Jiménez; las copias traducidas automáticamente de PHTLS 10 y NALS no se citan; diapositivas, flashcards, imágenes y archivos de procedencia ambigua no sostienen afirmaciones clínicas.

No uses blogs, resúmenes comerciales, foros, contenido SEO, videos ni otra IA como autoridad para dosis, tiempos, sitios anatómicos, indicaciones, contraindicaciones o procedimientos invasivos. Pueden servir para localizar una fuente primaria, nunca para reemplazarla.

No inventes una URL, edición, capítulo, página, DOI ni cita. Si no puedes comprobarla, deja el dato como pendiente.

### 2.4 Fuente que NO es autoridad

`_pdf_dump2.txt` no corresponde al plan oficial. Contiene otro “Temario Definitivo” de ocho páginas y no debe utilizarse para determinar estructura, objetivos o alcance.

Los archivos `src/data/fase*.js`, `src/data/extraFase*.js` y `src/data/contenido/reutilizado.js` contienen material legado. Pueden consultarse para detectar piezas rescatables, pero **no son fuentes académicas ni curriculares**.

## 3. Hechos ya comprobados

- La estructura actual representa 7 módulos, 56 unidades y 287 temas.
- El plan declara 88 semanas y 440 horas.
- El Módulo 4 contiene una inconsistencia del PDF: sus filas suman 110 horas, pero declara 115. “Urgencias del sistema nervioso” aparece como 2 semanas y 5 horas; 10 horas harían cuadrar el total. No cambies este dato sin autorización de la academia.
- La primera auditoría encontró 81 nodos mecánicamente completos, 121 escasos y 85 vacíos. Esas cifras son históricas: describían el corpus contaminado antes de la cuarentena.
- El corpus legado tiene 1,479 piezas: 152 se ubicaron solo por contexto y 52 quedaron sin ubicación.
- 85 de los 202 temas poblados del corpus anterior mezclaban tres o más temas antiguos.
- La situación editorial comprobada el 2 de septiembre de 2026 con `npm run inventario` es: 268 lecciones con material, 19 temas sin material —14 nodos de evaluación y 5 bloqueados por decisión—, 178 borradores, 104 en revisión y 5 bloqueados.
- Ninguna lección ha sido validada ni publicada por un docente.
- Las cifras del 17 de agosto de 2026 que este archivo repetía (107 vacíos, 161 con material) quedaron desfasadas al terminarse los lotes de M4 y M5; no se usan como línea base.
- Las 33 lecciones actualmente redactadas de M5 ya contienen actividad; el siguiente lote es producción de 33 páginas nuevas, no reparación de actividades.
- Los 126 nodos sin material de estudio se explican por temas todavía vacíos, 14 nodos de evaluación sin prosa y 5 bloqueos explícitos; consulta el inventario generado para el desglose actual.
- Los 14 nodos de evaluación son 12 exámenes y 2 prácticas.
- Se retiraron de la vista del alumno las contradicciones conocidas de dosis, fuentes fuera de tema y material de cuidados críticos colocado en páginas básicas. Varias correcciones todavía consisten en cuarentena, no en una lección nueva.

El estado `COMPLETO` del inventario solo significa que existen cantidades mínimas de campos. No significa “correcto”, “validado” ni “publicable”.

## 4. Prohibiciones

Nunca hagas lo siguiente:

- No vuelvas a distribuir contenido mediante similitud de palabras, IDF, embeddings o coincidencia de títulos sin revisión humana tema por tema.
- No edites `src/data/planRescate.js` a mano: es un archivo generado.
- No uses `reutilizado.js` como contenido publicado por defecto.
- No llenes un tema solo para mejorar una métrica de cobertura.
- No inventes subtemas para una unidad que el PDF deja sin desarrollo.
- No conviertas los exámenes o prácticas en lecciones de prosa.
- No presentes una dosis como universal si depende de edad, peso, concentración, vía, tipo de ambulancia, alcance profesional, dirección médica o protocolo local.
- No mezcles contenido hospitalario o de terapia intensiva con el nivel prehospitalario sin identificarlo como ampliación y sin que el plan lo pida.
- No mantengas una afirmación por el solo hecho de que suena médica o de que es correcta en otro contexto.
- No copies párrafos extensos de manuales protegidos. Parafrasea y cita.
- No despliegues Firebase, no siembres producción, no migres academias y no publiques contenido.
- No borres el material legado; debe quedar archivado para trazabilidad hasta que el usuario autorice su eliminación.
- No sobrescribas cambios no relacionados ni limpies el árbol de trabajo del usuario.
- No hagas commits ni push salvo solicitud expresa.

## 5. Solución técnica obligatoria

### 5.1 Separar legado de contenido publicable

Modifica la arquitectura para que `src/data/contenido/reutilizado.js` no alimente silenciosamente el contenido mostrado al alumno.

Requisitos:

1. Conservar `reutilizado.js` como archivo histórico o fuente de borradores.
2. El contenido visible debe proceder únicamente de archivos revisados explícitamente.
3. Si un tema no está revisado, la interfaz debe mostrar “Contenido en revisión” o “Contenido aún no disponible”, nunca una mezcla automática.
4. La lista de temas redactados no debe confundirse con una lista de temas validados.
5. Añadir pruebas que demuestren que una pieza heredada no aparece en producción si no fue aprobada explícitamente.

No implementes una solución destructiva. Antes de cambiar el punto de unión en `src/data/contenido/index.js`, identifica qué pruebas y páginas dependen del fallback legado.

### 5.2 Estado editorial real

Implementa un estado editorial compatible con el modelo local y con Firestore. Como mínimo:

- `vacio`
- `borrador`
- `en_revision`
- `validado`
- `publicado`
- `bloqueado_por_decision`

El estado debe distinguir:

- autoría o procedencia;
- fecha de actualización;
- versión clínica o fecha de corte;
- persona o rol que revisó;
- observaciones pendientes;
- fuentes clínicas.

No marques automáticamente `validado` o `publicado`. Esos estados requieren acción explícita de un docente autorizado.

Si agregar metadatos al documento del tema afecta validadores, serialización, editor o reglas, actualiza todas las capas y sus pruebas de forma compatible. No rompas documentos existentes.

### 5.3 Títulos oficiales y títulos visibles

Conserva la transcripción oficial para trazabilidad, pero permite mostrar al alumno una grafía académica corregida.

Casos confirmados:

- ESCENCIAL → ESENCIAL.
- URGNCIAS → URGENCIAS.
- Osteólisis → Osteoclisis / acceso intraóseo, sujeto a confirmación académica.
- Wadell → Waddell.
- Kellie Monroe → Monro-Kellie.
- causa equina → cauda equina.
- Brown sequard → Brown-Séquard.
- lefort 1, ,2 y 3 → Le Fort I, II y III.
- desagarres → desgarros.
- TRAUATISMO EN EL PACIENTE PEDIATRICO → TRAUMATISMO EN EL PACIENTE PEDIÁTRICO.

No alteres el texto documental original sin conservarlo en un campo de trazabilidad.

### 5.4 Exámenes y prácticas

Los 12 exámenes y 2 prácticas no son contenido académico omitido ni deben recibir prosa de relleno.

- Los exámenes deben tomar preguntas únicamente de los temas cubiertos antes de ese punto del plan.
- Aunque el alcance temporal esté correctamente calculado, el banco solo puede tomar preguntas de temas `validado` o `publicado`. `borrador` y `en_revision` no significan aprobado.
- Debes cablear y verificar `alcanceDeExamen` para parciales y finales.
- Las prácticas requieren objetivos, lista de cotejo, criterios de seguridad y evaluación de desempeño, no artículos enciclopédicos.
- Nunca incluyas en un examen un dato que no esté enseñado y citado en los temas de su alcance.

## 6. Método de trabajo por módulo

Trabaja en lotes pequeños y verificables. No intentes reescribir 287 temas en una sola edición masiva.

### Fase 0 — protección y diagnóstico

Esta fase ya se ejecutó. Verifica sus resultados, pero no recrees archivos generados ni repitas el mapeo automático como solución.

1. Revisa `git status` y preserva todos los cambios existentes.
2. Ejecuta las pruebas actuales y el build para conocer la línea base.
3. Regenera el inventario y la matriz existentes; no mantengas una segunda lista manual que pueda desincronizarse.
4. Identifica las rutas de datos que realmente llegan a la interfaz.
5. Confirma que `reutilizado.js` continúa fuera del contenido público.

### Fase 1 — contención del riesgo

La separación del legado y los estados editoriales ya existen. Consérvalos y corrige cualquier regresión.

1. Confirma que el material legado no validado no se muestra como contenido normal.
2. Corrige el filtro de exámenes: solo `validado` o `publicado` aportan reactivos.
3. Corrige fuentes pediátricas, médico-legales y métricas señaladas en la sección 0.
4. Corrige primero contradicciones y errores con potencial de daño:
   - atropina 0.5 mg frente a 1 mg en bradicardia;
   - OVACE conforme a AHA 2025;
   - Parkland clásica frente a recomendación ABA 2024;
   - vía aérea y procedimientos invasivos;
   - farmacología y concentraciones;
   - pediatría;
   - obstetricia;
   - trauma craneal y espinal.
5. Mantén el estado visual de contenido en revisión.
6. Agrega pruebas de regresión para cada corrección sensible. Una prueba que hace `return` porque el tema está vacío no demuestra que la corrección se haya redactado.

### Fase 2 — reconstrucción editorial

Orden recomendado:

1. Verificar los cuatro controles de la sección 0 y los dos controles bibliográficos de PHTLS; corregir únicamente regresiones.
2. Módulo 1: conservar sus 20 lecciones ya auditadas en `en_revision`. No reescribirlas ni validarlas sin revisión docente o hallazgo concreto.
3. Módulo 3: conservar sus 33 lecciones ya redactadas en `en_revision`, incluidas vía aérea, vía intravenosa/intraósea y monitor/desfibrilador. Sus dos nodos de evaluación no requieren prosa. No reescribir ni elevar estos temas sin hallazgo concreto o revisión docente.
4. Módulo 5: conservar los 33 borradores de trauma ya auditados. La decisión tema por tema está registrada; no repetir la auditoría ni promoverlos mientras falten las páginas/capítulos exactos de PHTLS y las demás fuentes señaladas.
5. Módulo 4: sus 58 lecciones están redactadas y todas tienen actividad. Conservarlas; no reabrirlas salvo hallazgo concreto o regresión automatizada.
6. Módulo 5: conservar sus 33 borradores actuales y completar primero la deuda de 17 actividades. La producción de las 66 lecciones nuevas se hará en dos lotes de 33 con guía de investigación específica preparada por Codex.
7. Módulo 6: pediatría, trauma pediátrico y geriatría.
8. Módulo 5: completar los 66 temas todavía vacíos sin reutilizar mezclas antiguas, únicamente cuando el lote tenga guía de investigación específica.
9. Módulo 2: prioridad inmediata. Completar de una sola vez sus 17 temas anatómicos y fisiológicos, con actividad significativa en cada lección y sin introducir terapéutica avanzada fuera de lugar.
10. Módulo 7: mantener los cuatro temas bloqueados hasta que la academia defina su alcance.

Correcciones obligatorias al lote de epidemiología/farmacología antes de comenzar respiratorio:

- En `m4-epi-urgencia-emergencia`, el artículo 72 del Reglamento define «urgencia», pero por sí solo no crea una obligación prehospitalaria universal. Separa la definición del ámbito y del sujeto obligado; sustenta con la disposición correspondiente cualquier deber atribuido al servicio. Fuente o elimina el uso clínico de «emergencia» y «urgencia sentida» si permanecen como conceptos formales.
- En `m4-far-generalidades`, elimina la idea de que un fármaco intravenoso periférico «se queda en el trayecto» durante el shock: la vía IV evita la absorción, aunque la hipoperfusión puede retrasar su distribución al sitio de efecto. Revisa también la definición de margen/ventana terapéutica, el absoluto de que la alergia «no depende de la cantidad» y la frase que presenta la repetición en voz alta como el «único» control posible.
- En `m4-far-nom-034`, cumple el título curricular: después de verificar cuál es el texto vigente en el DOF, presenta la dotación mínima de medicamentos por tipo de ambulancia que realmente establezca la norma, sin convertirla en indicación ni añadir dosis. No bloquees esa comparación solo porque todavía se desconozca el tipo de unidad de la academia.
- Conserva el bloqueo parcial y la ausencia de dosis en `m4-far-dosis-urgencia` y `m4-far-infusiones-aminas` hasta recibir formulario, presentaciones, concentraciones, equipo y protocolo local.

Por cada lote:

1. Selecciona entre 5 y 10 temas consecutivos de una misma unidad; si la unidad completa solo contiene 3 o 4 temas, trabaja la unidad completa como un lote.
2. Lee el título, la unidad y los temas vecinos en el PDF/semilla.
3. Audita cada pieza actual: `conservar`, `corregir`, `mover`, `eliminar` o `bloquear`.
4. Investiga fuentes primarias.
5. Redacta el contenido nuevo.
6. Genera conceptos, tarjetas, preguntas y actividades únicamente desde el texto aprobado.
7. Añade fuentes específicas.
8. Ejecuta validadores, pruebas y build.
9. Produce un resumen del lote con decisiones y pendientes.
10. No avances a otra unidad si el lote actual deja contradicciones abiertas de alto riesgo.

Continúa con lotes sucesivos. No te detengas después de producir el primer lote si todavía puedes trabajar con seguridad en el siguiente. Si una decisión académica bloquea un tema, registra la pregunta concreta, bloquea solo ese tema y continúa con los demás.

### Fase 3 — revisión integral

1. Busca contradicciones globales de dosis, tiempos, escalas y nombres.
2. Comprueba que cada pregunta se responda con el contenido de su propio tema.
3. Comprueba que los parciales respeten el alcance temporal del plan.
4. Revisa navegación, títulos visibles y estados editoriales.
5. Entrega un informe de temas listos para revisión docente; no los declares publicados.

## 7. Molde académico por tipo de tema

### Concepto o anatomía

1. Definición y alcance.
2. Componentes o clasificación.
3. Relación funcional.
4. Aplicación prehospitalaria limitada al tema.
5. Errores frecuentes.

### Patología o urgencia

1. Definición.
2. Fisiopatología breve y pertinente.
3. Presentación clínica y signos de gravedad.
4. Evaluación prehospitalaria.
5. Manejo según alcance y protocolo.
6. Criterios de traslado/prealerta.
7. Errores o contraindicaciones.

### Procedimiento

1. Objetivo.
2. Indicaciones.
3. Contraindicaciones absolutas y relativas.
4. Material.
5. Preparación y seguridad.
6. Técnica paso a paso.
7. Confirmación de éxito.
8. Complicaciones y respuesta.
9. Documentación y reevaluación.

### Práctica

1. Competencia observable.
2. Equipo y condiciones.
3. Riesgos y medidas de seguridad.
4. Lista de cotejo.
5. Errores críticos.
6. Criterios de aprobación.

### Examen

No lleva prosa. Debe definir alcance, banco elegible, número de reactivos, ponderación, aprobación y retroalimentación.

## 8. Contrato mínimo de contenido por tema

Un tema académico desarrollado debe contener, salvo justificación explícita:

- `resumen`: 1–2 frases centradas en el objetivo real.
- `duracion`: estimación realista.
- `objetivos`: 2–4 resultados observables con verbos en infinitivo.
- `secciones`: 2–5 secciones coherentes.
- `conceptosClave`: 3–6 conceptos presentes en el texto.
- `flashcards`: 3–6 tarjetas derivadas del texto.
- `quiz`: 3–5 preguntas con una sola mejor respuesta y explicación.
- `actividades`: obligatorias en cada lección. Deben aportar aplicación auténtica; no son relleno ni repetición del quiz.
- un bloque `fuentes` al final con referencias específicas.

Cantidad no equivale a calidad. Un tema puede justificar menos elementos si su alcance es estrecho.

Ejemplo compatible con el modelo actual:

```js
'tema-id-oficial': {
  icono: '…',
  duracion: '15 min',
  resumen: '…',
  objetivos: [
    'Reconocer …',
    'Diferenciar …',
    'Aplicar … según protocolo.',
  ],
  secciones: [
    {
      titulo: 'Definición y alcance',
      bloques: [
        { tipo: 'p', texto: '…' },
        { tipo: 'callout', variante: 'alerta', titulo: '…', texto: '…' },
      ],
    },
    {
      titulo: 'Fuentes',
      bloques: [
        {
          tipo: 'fuentes',
          items: [
            {
              nombre: 'Institución. Documento, edición/año.',
              url: 'https://enlace-oficial-especifico',
              nota: 'Sección, tabla, algoritmo o página que respalda el dato.',
            },
          ],
        },
      ],
    },
  ],
  conceptosClave: [
    { termino: '…', definicion: '…' },
  ],
  flashcards: [
    { frente: '…', reverso: '…' },
  ],
  quiz: [
    {
      pregunta: '…',
      opciones: ['…', '…', '…', '…'],
      correcta: 0,
      explicacion: 'La opción es correcta porque …',
    },
  ],
  actividades: null,
}
```

No agregues campos nuevos a este objeto hasta implementar su compatibilidad completa en modelo, editor, API, Firestore, reglas y pruebas.

## 9. Reglas clínicas de redacción

### 9.1 Cifras y dosis

Toda cifra clínica debe responder:

- ¿Para qué población?
- ¿Para qué indicación?
- ¿Qué vía y concentración?
- ¿Qué edición/año la respalda?
- ¿Es guía universal, protocolo nacional o protocolo local?
- ¿Está dentro del alcance del alumno o del servicio?

Si falta una respuesta, no fijes la cifra como regla universal. Escribe “según protocolo del servicio” y registra la decisión pendiente.

### 9.2 Cambios ya obligatorios

- Bradicardia sintomática adulta: atropina 1 mg IV, repetir cada 3–5 min, máximo 3 mg, conforme al algoritmo AHA 2025. Elimina la variante de 0.5 mg para esta indicación.
- OVACE grave en adulto consciente, AHA 2025: 5 golpes dorsales seguidos de 5 compresiones abdominales; usar torácicas en embarazo avanzado o si no puede rodearse el abdomen.
- Fórmula de Parkland: enseñar la fórmula clásica solicitada por el PDF como antecedente y compararla con la recomendación ABA 2024 de iniciar 2 mL/kg/%SCQ en adultos con ≥20 % SCQ, titulando respuesta.
- “Osteólisis” en acceso vascular: no usar; presentar “acceso intraóseo” u “osteoclisis” y conservar la errata documental solo para trazabilidad.
- Obturador esofágico: si se conserva, identificarlo como dispositivo histórico; no enseñarlo como estándar actual.

### 9.3 Lenguaje

- Español formal, universitario y técnico.
- Frases claras y directas.
- Define las siglas en su primera aparición.
- Evita dramatización, tono publicitario y absolutos innecesarios.
- Distingue “puede”, “sugiere”, “se asocia”, “está indicado” y “es obligatorio”.
- No uses “siempre” o “nunca” salvo prohibición inequívoca y citada.
- No llames “diagnóstico” a una impresión prehospitalaria cuando se requiere imagen o laboratorio.
- No atribuyas competencias a todo paramédico si dependen de certificación, dirección médica o regulación local.

## 10. Distribución correcta del contenido

Una pieza pertenece a un tema únicamente si cumple las tres condiciones:

1. Responde a uno de los objetivos de ese tema.
2. Usa el contexto de la unidad sin invadir el objetivo de un tema vecino.
3. Su quiz podría contestarse estudiando solo esa página.

Ejemplos:

- ECG no pertenece a posiciones anatómicas.
- Farmacología de SRI no pertenece a apertura manual de vía aérea.
- Fórmula de Winter no pertenece a Parkland.
- Manejo de indicios no pertenece a cinemática de proyectiles; va en aspectos médico-legales.
- Antiarritmia no pertenece a analgesia de extremidades.
- Una pregunta sobre midazolam intranasal no desarrolla por sí sola “niños con necesidades especiales”.

Si una pieza es relevante para dos temas, elige uno como fuente canónica y en el otro resume o enlaza; no dupliques bloques completos.

## 11. Temas que requieren decisión de la academia

No inventes contenido para:

- `m7-operaciones-especiales-unico`, porque el PDF no define el alcance.
- unidades del Módulo 7 sin subtemas específicos suficientes.
- cursos de especialización enumerados únicamente por nombre.
- el dato de 5/10 horas de Urgencias del sistema nervioso.
- medicamentos o procedimientos sin protocolo local disponible.

Usa `bloqueado_por_decision` y deja una pregunta concreta para la academia.

## 12. Controles automáticos que debes añadir o reforzar

Como mínimo, crea pruebas para detectar:

1. Una misma indicación con dosis contradictorias.
2. Preguntas cuyo vocabulario central no aparece en el tema.
3. Fuentes ubicadas en una página que no respaldan su materia.
4. Tema marcado `validado` sin fuentes.
5. Tema publicado con `procedencia.porUnidad` o con contenido heredado no aprobado.
6. Examen que incluye temas posteriores a su unidad.
7. IDs inexistentes o contenido huérfano.
8. URLs inválidas o referencias genéricas sin documento identificable.
9. Títulos visibles corregidos sin perder el título oficial.
10. Estado “sin contenido” visible y accesible.

Los controles semánticos son auxiliares: generan alertas para revisión, no reubican ni aprueban contenido automáticamente.

## 13. Verificación por entrega

Después de cada lote:

```bash
npm run gen:plan
npm run gen:nav
npm test
npm run build
npm run inventario
```

Si una prueba de reglas requiere Java o credenciales y no puede ejecutarse, repórtalo expresamente. Nunca declares una prueba omitida como aprobada.

También revisa visualmente al menos:

- un tema de concepto;
- un tema de procedimiento;
- un tema clínico;
- el estado “en revisión”;
- el alcance de un examen.

## 14. Entregables esperados de Claude

Al completar cada módulo entrega:

1. Archivos de contenido revisado por unidad o módulo.
2. Matriz de decisiones por tema: conservar, corregir, mover, eliminar, generar o bloquear.
3. Fuentes exactas utilizadas.
4. Lista de cifras clínicas y su edición/año.
5. Pruebas agregadas y resultados.
6. Temas pendientes de decisión docente.
7. Resumen de cobertura: vacíos, borradores, en revisión y candidatos a validación.

No declares el proyecto terminado mientras quede contenido heredado visible como si estuviera validado.

## 15. Prompt maestro de ejecución

Cuando el usuario te pida iniciar la remediación, interpreta la tarea así:

> Lee `CLAUDE.md` y `docs/RELEVO-CLAUDE-2026-08-17.md`. No repitas el Módulo 4: el lote de 34 lecciones ya quedó integrado y Codex confirmó 161 lecciones con material, 107 temas sin contenido, 58/58 lecciones de M4 con actividad, 495 pruebas aprobadas y build correcto. Verifica que esa línea base siga intacta y corrige únicamente una regresión demostrada. Después añade actividades a las 17 lecciones ya redactadas de M5 enumeradas en el relevo, derivándolas solo de su propia lección y sin reescribir su prosa. Ejecuta generación, pruebas, build, inventario y matriz una vez al final. Mantén `borrador` o `en_revision`; no valides, publiques, despliegues, escribas en Firebase, hagas commits ni borres el legado.

## 16. Condición de terminación

El trabajo técnico y editorial solo puede considerarse completo cuando:

- ningún contenido heredado no aprobado aparece al alumno;
- los 287 nodos tienen un estado editorial explícito;
- los 19 temas sin material son solo nodos de evaluación y temas bloqueados por una decisión concreta (comprobado el 02-09-2026);
- los borradores resuelven las deudas bibliográficas registradas y pasan revisión docente;
- las lecciones en revisión resuelven sus observaciones bibliográficas y clínicas;
- las pruebas sensibles no pasan de forma vacía omitiendo temas que todavía deben redactarse;
- los bancos de examen solo usan material `validado` o `publicado`;
- las fuentes identifican documento, edición/año y, cuando sea posible, capítulo, tabla, algoritmo o página;
- exámenes y prácticas respetan el plan;
- no existen contradicciones clínicas conocidas;
- pruebas y build pasan;
- queda una matriz para revisión y aprobación del cuerpo docente.

La IA prepara contenido candidato. La academia valida y autoriza la publicación.
