# Guía de redacción — Módulo 5, lote A

Fecha de corte: 17 de agosto de 2026. Esta guía traduce la investigación de Codex en instrucciones editoriales concretas para Claude. No autoriza a publicar, validar ni ampliar el temario.

## Resultado obligatorio

Crear e integrar **33 lecciones nuevas** del Módulo 5. La aplicación debe pasar de 161 a 194 lecciones con material y de 107 a 74 vacíos editoriales, salvo que el inventario use una definición distinta y el reporte explique exactamente la diferencia. Las 33 lecciones de M5 que ya existen tienen actividad; no deben reescribirse.

IDs, en el orden oficial:

1. `m5-cin-definicion`
2. `m5-cin-energia-cinetica`
3. `m5-cin-energia-potencial`
4. `m5-cin-abierto-cerrado`
5. `m5-cin-cavitacion`
6. `m5-cin-arma-blanca-fuego`
7. `m5-cin-triada-wadell`
8. `m5-cin-desaceleracion`
9. `m5-cin-vehiculo-automotor`
10. `m5-cin-motocicleta`
11. `m5-cin-explosiones`
12. `m5-hs-tipos-hemorragias`
13. `m5-hs-control-hemorragias`
14. `m5-hs-torniquete`
15. `m5-hs-definicion-tipos-shock`
16. `m5-hs-fisiopatologia`
17. `m5-tt-clasificacion`
18. `m5-tt-traquea-laringe`
19. `m5-tt-costilla`
20. `m5-tt-torax-inestable`
21. `m5-tt-neumotorax-simple`
22. `m5-tt-neumotorax-abierto`
23. `m5-tt-hemotorax`
24. `m5-tt-traqueo-bronquial`
25. `m5-tt-disrupcion-aortica`
26. `m5-tt-taponamiento`
27. `m5-tt-contusion-miocardica`
28. `m5-ta-abdomen-agudo`
29. `m5-tcc-definicion`
30. `m5-tcc-kellie-monroe`
31. `m5-tcc-fractura-craneo`
32. `m5-tcc-escalpe`
33. `m5-tcc-lesiones-focales`

No conviertas `m5-examen-1-unico` en una lección. Es un nodo de evaluación y debe conservar su comportamiento actual.

## Autoridad y localización comprobada

### Base curricular histórica

La copia licenciada aportada por el usuario es **PHTLS 9.ª edición, ISBN 978-1-284-10330-4, copyright 2020**. Parafrasea; no copies párrafos ni tablas extensas. Toda cita debe incluir edición, capítulo y página impresa:

- Cinemática: capítulo 4, “La cinemática del trauma”, pp. 99–144.
- Hemorragia y shock: capítulo 3, “Shock: fisiopatología de la vida y la muerte”, pp. 47–98.
- Trauma de cabeza: capítulo 8, “Trauma en cabeza”, pp. 257–292.
- Trauma torácico: capítulo 10, “Trauma torácico”, pp. 345–376.
- Trauma abdominal: capítulo 11, desde p. 377. Localiza la página específica antes de citar una afirmación concreta.

La copia de PHTLS 10 de Drive declara traducción automática: **no se consulta para redactar, no se cita y no fija terminología**. La página de NAEMT solo confirma que existe una edición actual del curso; no respalda afirmaciones clínicas específicas.

### Actualización clínica

Usa exclusivamente los registros autorizados en `docs/REGISTRO-FUENTES-ACADEMICAS.json`:

- AHA/American Red Cross First Aid Guidelines 2024: hemorragia externa, torniquete y herida torácica abierta.
- WHO/ICRC Basic Emergency Care: ABCDE, shock y evaluación inicial del traumatizado.
- ACS Guidelines for the Field Triage of Injured Patients 2021: el mecanismo estima riesgo y destino; no diagnostica una lesión.
- ACS Best Practices Guidelines: trauma y TCE.
- Brain Trauma Foundation, Prehospital TBI, 3.ª edición: prevención de lesión cerebral secundaria en el ámbito prehospitalario.
- ACS Best Practices Guidelines: The Management of Traumatic Brain Injury, 2024.

Cuando una conducta dependa de oxígeno, ventilación avanzada, acceso vascular, fluidos, hemoderivados, analgesia, descompresión, destino, equipo o dirección médica, escribe “según protocolo local y alcance autorizado”; no inventes el protocolo.

## Contrato de cada lección

Cada objeto debe respetar el modelo real de `src/lib/temaContenidoModelo.js` y los patrones de los archivos actuales. Debe contener, como mínimo:

- resumen de 80–140 palabras;
- 2–4 objetivos observables;
- 2–5 secciones sustantivas, sin párrafos de relleno;
- 3–6 conceptos clave;
- 3–6 tarjetas derivadas de la prosa;
- 3–5 preguntas de quiz respondibles solo con la lección;
- al menos una actividad significativa de aplicación, clasificación, relación causal o secuencia real;
- referencias con URL y localizador reproducible;
- metadatos editoriales en `borrador` o `en_revision`, nunca `validado` ni `publicado`.

No repitas el quiz en la actividad. No fabriques cifras, dosis, volúmenes, calibres, concentraciones, umbrales o sitios anatómicos de procedimientos. El mecanismo aumenta o reduce sospecha y orienta triaje: nunca confirma por sí solo una lesión. Distingue siempre observación prehospitalaria, diagnóstico hospitalario y tratamiento definitivo.

## Guion de contenido por tema

### Cinemática

**`m5-cin-definicion` — Definición de trauma y cinemática.** Explica el trauma como transferencia de energía capaz de lesionar tejidos y la cinemática como reconstrucción razonada del evento. Organiza la lectura en preevento, evento y posevento. Cierra aclarando que mecanismo, fisiología, anatomía y exploración se integran; ninguno reemplaza a los demás.

**`m5-cin-energia-cinetica`.** Presenta `Ec = ½mv²` para explicar por qué la velocidad tiene efecto cuadrático. Añade masa, tiempo y distancia de detención, sistemas de retención y superficie de impacto. La fórmula sirve para comprender relaciones, no para calcular gravedad en la escena ni predecir un órgano lesionado.

**`m5-cin-energia-potencial`.** Presenta la energía potencial gravitatoria `Ep = mgh`. En caídas, relaciona altura, masa, superficie, región corporal del primer impacto y características del paciente. No enseñes una altura universal como frontera entre trauma leve y grave; si mencionas criterios de triaje, atribúyelos a ACS 2021 y sepáralos del diagnóstico.

**`m5-cin-abierto-cerrado`.** Diferencia trauma cerrado/contuso y abierto/penetrante por integridad de la superficie y transferencia de energía. Explica mecanismos mixtos. Una herida pequeña no excluye lesión interna y la ausencia de herida no implica baja gravedad. Describe hallazgos; no reconstruyas trayectos sin imagen.

**`m5-cin-cavitacion`.** Explica cavidad permanente y temporal, elasticidad y densidad tisular, deformación, fragmentación y desviación del proyectil. Evita inferir calibre, arma, trayectoria exacta o daño interno a partir de los orificios externos.

**`m5-cin-arma-blanca-fuego`.** Contrasta el trayecto de objetos cortopunzantes con la transferencia balística. Enseña a no explorar la herida, no retirar objetos empalados y no etiquetar con certeza entrada/salida. La atención del paciente tiene prioridad y la preservación de indicios se realiza sin retrasarla.

**`m5-cin-triada-wadell`.** Conserva el ID oficial, pero muestra el nombre editorial correcto **tríada de Waddell** y registra que el plan contiene la variante “Wadell”. Expón como heurística los tres impactos del atropellamiento: vehículo–persona, persona–vehículo/capó y persona–suelo. La altura del paciente y del vehículo modifica los patrones. No atribuyas el epónimo a PHTLS si no encuentras una fuente primaria reproducible y no lo presentes como diagnóstico.

**`m5-cin-desaceleracion`.** Explica compresión, tracción y cizallamiento por cambio rápido de velocidad, incluidos los puntos de fijación de aorta y encéfalo. Distingue impacto frontal, lateral, posterior y rotacional sin convertir cada patrón en una lesión segura.

**`m5-cin-vehiculo-automotor`.** Desarrolla las tres colisiones: vehículo–objeto, ocupante–interior/retención y órganos–cuerpo. Incluye intrusión, cinturón, bolsa de aire, volante, parabrisas, eyección y estado de otros ocupantes como información. Conecta con triaje ACS 2021. No uses frases deterministas como “volante deformado equivale a lesión X”.

**`m5-cin-motocicleta`.** Explica ausencia de compartimento protector, impacto frontal, lateral, expulsión, deslizamiento e impactos secundarios. El casco reduce riesgo, pero no descarta lesión craneal o cervical. La retirada del casco solo se aborda como necesidad de vía aérea o conforme a entrenamiento/protocolo.

**`m5-cin-explosiones`.** Clasifica lesión primaria por onda, secundaria por fragmentos, terciaria por desplazamiento y cuaternaria por quemaduras, inhalación, aplastamiento u otros efectos. Incluye el mayor riesgo en espacios cerrados y seguridad/HAZMAT. Solo añade una categoría quinaria si la fuente elegida la define y aclara que la terminología varía. No invadas el alcance operativo bloqueado del Módulo 7.

### Hemorragia y shock

**`m5-hs-tipos-hemorragias`.** Clasifica externa, interna y de unión; compresible y no compresible. Puede describir sangrado pulsátil o continuo, pero no enseñar color o patrón como medición fiable de gravedad. Valora flujo activo, acumulación, respuesta fisiológica y sitios ocultos: tórax, abdomen, pelvis y huesos largos.

**`m5-hs-control-hemorragias`.** Secuencia: seguridad/EPP, exposición, presión manual directa; empaquetamiento de heridas profundas aptas y apósito hemostático si están autorizados; vendaje tras controlar; torniquete para hemorragia de extremidad potencialmente mortal o no controlada. Reevalúa siempre. No empaquetes a ciegas tórax, abdomen o cuello. La hemorragia interna exige reconocimiento y traslado, no “control externo”.

**`m5-hs-torniquete`.** Indicación: hemorragia de extremidad potencialmente mortal. Prioriza dispositivo comercial, aprieta hasta detener el sangrado, registra hora y reevalúa; un segundo dispositivo depende del diseño y protocolo. No aflojar periódicamente, no enseñar un tiempo máximo universal y no usar en mordedura de serpiente. No inventes anchos, distancias o presión.

**`m5-hs-definicion-tipos-shock`.** Define shock como perfusión celular/entrega o utilización de oxígeno insuficiente. Clasifica hipovolémico/hemorrágico, distributivo, cardiogénico y obstructivo, con una diferencia fisiológica y un ejemplo de cada uno. Mantén foco traumático y no repitas las urgencias médicas de M4. Shock no equivale únicamente a hipotensión.

**`m5-hs-fisiopatologia`.** Relaciona precarga, gasto cardiaco, entrega de oxígeno, compensación simpática, metabolismo anaerobio, acidosis, coagulopatía e hipotermia. Enseña tendencias de estado mental, piel, pulso periférico, relleno capilar y presión; la presión puede ser normal al inicio. No publiques porcentajes de clases I–IV sin localizador actual verificable.

### Trauma torácico

**`m5-tt-clasificacion`.** Clasifica abierto/cerrado y organiza amenazas por ventilación, oxigenación y perfusión dentro del ABCDE. Aclara que pueden coexistir lesiones y que la clasificación mecánica no sustituye la evaluación fisiológica.

**`m5-tt-traquea-laringe`.** Incluye disfonía, estridor, enfisema subcutáneo, herida cervical, hemoptisis y deterioro progresivo. Prioriza reconocimiento, mínima manipulación, apoyo y aviso temprano. La instrumentación avanzada queda sujeta a competencia y protocolo.

**`m5-tt-costilla`.** Dolor, sensibilidad, crepitación y ventilación superficial; riesgo de lesión subyacente y mayor vulnerabilidad en personas mayores o frágiles. No recomiendes vendaje circunferencial. Oxígeno, soporte ventilatorio y analgesia dependen del protocolo.

**`m5-tt-torax-inestable`.** Define segmento con pérdida de continuidad por múltiples fracturas; el movimiento paradójico puede ser sutil. Explica que la contusión pulmonar contribuye al deterioro. No inmovilices con cinta ni sacos; prioriza ventilación, reevaluación y traslado según protocolo.

**`m5-tt-neumotorax-simple`.** Aire pleural con pérdida parcial de expansión, dolor, disnea y posible disminución unilateral de ruidos. Los hallazgos no siempre están completos y puede progresar. No enseñes descompresión del neumotórax simple.

**`m5-tt-neumotorax-abierto`.** Describe la comunicación de la pared con pleura. Actualiza PHTLS histórico con AHA 2024: es razonable dejar expuesta la herida, usar apósito limpio seco no oclusivo o sello ventilado. Si un apósito/sello empeora la respiración, aflojar o retirar. **No enseñes el apósito oclusivo de tres lados como regla universal actual.** Activar respuesta y transportar.

**`m5-tt-hemotorax`.** Sangre en espacio pleural causa pérdida ventilatoria y shock hemorrágico. Disminución de ruidos o matidez pueden faltar o ser difíciles de apreciar. El ámbito prehospitalario sospecha y traslada; no confirma por imagen ni ofrece tratamiento definitivo.

**`m5-tt-traqueo-bronquial`.** Lesión rara con fuga aérea, enfisema subcutáneo, hemoptisis y dificultad respiratoria. Puede sospecharse ante fuga persistente, pero el diagnóstico es hospitalario. Manejo prehospitalario de soporte y traslado.

**`m5-tt-disrupcion-aortica`.** Asóciala con desaceleración de alta energía. Dolor torácico/dorsal o diferencias de pulsos/presión pueden estar ausentes. El mecanismo eleva sospecha y prioridad de centro de trauma; la imagen confirma.

**`m5-tt-taponamiento`.** Explica shock obstructivo por presión pericárdica. La tríada de Beck suele estar incompleta y no debe exigirse. Sospecha ante mecanismo compatible y shock, con traslado rápido. No enseñes pericardiocentesis de campo como conducta universal.

**`m5-tt-contusion-miocardica`.** Usa “lesión cardiaca contusa” como término contemporáneo y explica que dolor, arritmia e hipotensión son inespecíficos. ECG/monitorización si existen y evaluación hospitalaria. No diagnosticar por equimosis esternal. Distingue conceptualmente de *commotio cordis*.

### Trauma abdominal

**`m5-ta-abdomen-agudo`.** En esta unidad significa emergencia abdominal traumática/peritoneal, no un repaso de apendicitis o patología médica. Dolor, defensa, distensión o irritación pueden ser tardíos o estar ausentes. Integra mecanismo, exploraciones seriadas y signos de shock. No hagas palpación agresiva repetida, no des vía oral y no afirmes diagnóstico de órgano en campo.

### Traumatismo craneoencefálico

**`m5-tcc-definicion`.** Define TCE como fuerza externa con alteración cerebral; diferencia lesión primaria del evento y secundaria posterior. Incluye evaluación neurológica seriada y Glasgow sin duplicar su tema futuro. Un examen inicial normal no excluye lesión.

**`m5-tcc-kellie-monroe`.** Corrige editorialmente a **doctrina de Monro–Kellie** y conserva nota de la errata del plan. Cráneo rígido contiene encéfalo, sangre y LCR; la compensación es limitada y luego aumenta la presión intracraneal. Explica perfusión cerebral solo de forma conceptual. No inventes proporciones ni mezcles los “niveles de lesión” de otro tema.

**`m5-tcc-fractura-craneo`.** Describe lineal, deprimida, basilar y abierta. Incluye escalón, fuga de LCR y equimosis periorbitaria/retroauricular, aclarando que pueden faltar o aparecer tarde. No palpar agresivamente, explorar ni ocluir drenaje. La imagen confirma.

**`m5-tcc-escalpe`.** Explica que el cuero cabelludo sangra abundantemente. Aplica presión directa con cautela si se sospecha fractura abierta/deprimida, busca heridas ocultas y vigila shock. Conservación de tejido avulsionado según protocolo; no reimplantar en campo.

**`m5-tcc-lesiones-focales`.** Resume epidural, subdural, contusión y hematoma intraparenquimatoso. Puede haber déficit focal o deterioro, pero no se distinguen con fiabilidad en campo. Prioriza evaluación seriada y evitar hipoxia/hipotensión conforme a protocolo. No enseñes que el intervalo lúcido siempre significa hematoma epidural.

## Pruebas editoriales específicas del lote

Además de las pruebas existentes, añade regresiones que verifiquen:

1. existen exactamente los 33 IDs y cada uno tiene actividad;
2. ninguna lección cita PHTLS 10 ni una portada comercial;
3. toda cita de PHTLS 9 contiene edición, capítulo y página;
4. `m5-tt-neumotorax-abierto` no prescribe de forma universal un apósito oclusivo de tres lados y sí contempla vigilancia/retirada si empeora la respiración;
5. cinemática no convierte mecanismo en diagnóstico;
6. torniquete no indica aflojamiento periódico ni tiempo máximo universal;
7. TCE no presenta la tríada de Beck, intervalo lúcido o signos de fractura como requisitos obligatorios;
8. no aparecen dosis, volúmenes, calibres ni competencias invasivas inventadas.

Al terminar ejecuta `npm run generar`, `npm test`, `npm run build`, `npm run inventario -- --md` y `npm run matriz`. Reporta cifras antes/después y lista exacta de archivos modificados. No despliegues, no escribas en Firebase, no migres producción, no hagas commits y no borres legado.
