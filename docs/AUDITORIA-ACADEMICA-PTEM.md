# Auditoría académica y editorial de PTEM

**Fecha:** 16 de agosto de 2026  
**Fuente rectora:** `PLAN DE ESTUDIOS PARAMÉDICO R.E.S.C.A.T.E. OFICIAL.pdf` (17 páginas, edición 2024)  
**Contenido auditado:** estructura oficial, contenido reutilizado, contenido redactado manualmente, evaluaciones, fichas y bibliografía presentes en el proyecto PTEM.  
**Tono adoptado para las propuestas:** formal, universitario y técnico, con lenguaje claro para formación prehospitalaria.

## Dictamen ejecutivo

La estructura curricular de PTEM es, en términos generales, una transcripción fiel del PDF: **7 módulos, 56 unidades, 287 temas, 88 semanas y 440 horas declaradas**. El problema grave no está en la estructura, sino en el contenido que se colocó dentro de ella.

El contenido actual **no debe publicarse en bloque como material académico validado**. Una parte importante procede de un temario anterior, más amplio y distinto, cuyas piezas fueron reasignadas por coincidencia automática de palabras. El resultado incluye temas formados con fragmentos de farmacología avanzada, cardiología, neurología, legislación y cuidados críticos que no corresponden al título de la lección.

Hallazgos cuantitativos:

- 287 temas oficiales.
- 202 temas contienen al menos una pieza de material; 85 están vacíos.
- De los 85 vacíos, 74 son vacíos académicos reales; 9 son exámenes y 2 son prácticas que deben resolverse como actividades, no con prosa de relleno.
- El inventario llama “COMPLETOS” a 81 temas, pero ese rótulo solo comprueba cantidades mínimas de secciones, preguntas, tarjetas y conceptos.
- De esos 81, 49 fueron redactados manualmente y 32 se completaron automáticamente.
- **Los 32 temas “completos” automáticos mezclan material de tres o más temas de origen.** Por ello, “completo” no equivale a correcto.
- El corpus heredado contiene 1,479 piezas: 1,327 asignadas por coincidencia directa y 152 asignadas solo por contexto de unidad o por el título del tema antiguo.
- 52 piezas quedaron sin ubicación. No deben incorporarse sin revisión docente.
- 85 de los 202 temas poblados mezclan material de tres o más temas antiguos. Es decir, aproximadamente el 42 % de los temas con contenido presenta un riesgo objetivo de incoherencia editorial.
- Solo 46 de los 287 temas contienen algún bloque de fuentes. Hay 95 referencias: 34 remiten a la misma página general de PHTLS/NAEMT, 12 no tienen URL y varias son blogs o resúmenes secundarios. La trazabilidad bibliográfica actual es insuficiente para dosis, tiempos, técnicas y criterios clínicos.

**Decisión recomendada:** conservar la estructura oficial; congelar la publicación del contenido heredado; mantener únicamente bloques validados; reescribir por tema desde fuentes primarias o manuales expresamente aprobados por la academia.

---

## Paso 1. Análisis de brechas y errores

### 1.1 Lo estructural que sí coincide con el PDF

La semilla `scripts/seed/plan-rescate.json` reproduce los siete módulos, sus filas temáticas, subtemas, semanas y horas. También conserva la exigencia de cursar dos especializaciones y registra las quince opciones que el PDF enumera como módulos 8 a 22.

Existe una inconsistencia en el propio PDF: en el Módulo 4, “Urgencias del sistema nervioso” aparece con 2 semanas y 5 horas. La suma de las filas da 110 horas, pero el total impreso declara 115. Para que el total cuadre, esa unidad tendría que tener 10 horas. PTEM hizo bien en marcarlo como dato por confirmar y no corregirlo silenciosamente.

También se conservaron erratas del PDF como si fueran títulos oficiales. Para una web educativa deben distinguirse dos campos:

- `tituloOficial`: transcripción documental, útil para trazabilidad.
- `tituloVisible`: forma académica corregida para el alumno.

Correcciones necesarias: “esencial”, “urgencias”, “osteoclisis” en vez de “osteólisis” cuando se habla de acceso intraóseo, “Waddell”, “Monro-Kellie”, “cauda equina”, “Brown-Séquard”, “Le Fort I, II y III”, “desgarros” y “traumatismo pediátrico”.

### 1.2 Conceptos confundidos o material inventado/descontextualizado

| Tema actual | Contenido que aparece | Diagnóstico | Acción |
|---|---|---|---|
| `m1-smu-posiciones-lineas` — Posiciones, líneas anatómicas y cuadrantes | ECG, inmovilización espinal, norepinefrina, descompresión torácica, estado epiléptico, oxitocina y FRAP | Mezcla extrema de diez temas de origen | Eliminar todo salvo la terminología anatómica pertinente y reescribir |
| `m2-afi-cardiovascular` — Sistema cardiovascular | Farmacología de paro, nitratos, adenosina, vías de administración, EVC y vasopresores | Confunde anatomía/fisiología con terapéutica avanzada y neurología | Conservar solo anatomía, circulación y conducción básica |
| `m3-ep-via-aerea-cervicales` — Apertura de vía aérea y control cervical | SRI, sedantes, bloqueadores neuromusculares y fuentes de farmacología avanzada | El nivel y el objeto de estudio no corresponden | Mover SRI a su tema oficial; redactar aquí maniobras básicas y control cervical |
| `m3-va-repaso-anatomia` — Anatomía y fisiología pulmonar | Piezas de fisiología cardiovascular y anatomía general | Reasignación por contexto, no por equivalencia | Reescribir desde anatomía respiratoria |
| `m3-vi-ventajas-desventajas` — Terapia intravenosa | Fragmentos de neumología, cardiología y fluidoterapia | El tema perdió una pregunta académica concreta | Reescribir indicaciones, ventajas, limitaciones y complicaciones de la vía IV |
| `m4-far-generalidades` — Generalidades de farmacología | 99 piezas provenientes de 25 temas | Es una acumulación, no una lección | Sustituir por farmacocinética, farmacodinamia, seguridad y alcance prehospitalario |
| `m4-far-nom-034` — Fármacos según NOM-034 | Legislación, CRUM, RPBI y FRAP mezclados con fármacos | Confunde regulación del servicio con farmacología | Separar la lista normativa por tipo de ambulancia de los protocolos terapéuticos |
| `m4-gyn-eclampsia` — Preeclampsia/eclampsia | Fuentes sobre organofosforados, antídotos, bloqueadores beta y calcioantagonistas | Fuente y tema no tienen relación | Eliminar ese bloque de fuentes; reconstruir con guía obstétrica aprobada |
| `m5-tcc-definicion` — Definición de trauma craneoencefálico/columna | TXA en hemorragia posparto, calcio en transfusión y movilización en bloque | Contaminación por trauma/obstetricia y contexto de unidad | Reescritura completa |
| `m5-tme-farmacos` — Analgesia en trauma estable de extremidades | Transfusión masiva, hipercalemia, adenosina, amiodarona y naloxona | Riesgo clínico alto; casi todo es ajeno al tema | Eliminar y redactar según alcance, protocolo local y medicamentos autorizados |
| `m5-que-parkland` — Fórmula de Parkland | Fórmula de Winter y brecha aniónica | Confusión por la palabra “fórmula” | Eliminar todo lo ácido-base de esta lección |
| `m6-ip-crecimiento` — Crecimiento y desarrollo | Una tarjeta sobre bactericidas y bacteriostáticos | Falso positivo léxico por “crecimiento” | Eliminar la tarjeta; tema actualmente vacío |
| `m6-se-necesidades-especiales` | Una pregunta aislada sobre midazolam intranasal | Dato clínico posible, pero no desarrolla necesidades especiales | Reubicar la pregunta y redactar el tema desde cero |
| `m5-cin-arma-blanca-fuego` — Cinemática de arma blanca y arma de fuego | Manejo de indicios y ropa en escenas delictivas | Tangencial: pertenece a aspectos médico-legales | Mover a médico-legal; aquí explicar mecanismo y patrones de lesión |
| `m1-pai-heridas-especiales` | Piezas de cinco temas antiguos | Puede alcanzar el mínimo mecánico sin coherencia de secuencia | Revisar bloque por bloque; no conservar por el solo rótulo “completo” |

Estos no son casos aislados. Entre los temas con mayor número de orígenes mezclados se encuentran:

- Generalidades de farmacología: 25 orígenes.
- Arritmias letales: 24.
- Síndrome de insuficiencia respiratoria: 24.
- Apertura de vía aérea y control cervical: 22.
- Célula, función y organelos: 18.
- Clasificación de enfermedades: 16.
- Definición y tipos de shock: 16.
- Líquidos y electrolitos: 14.
- Dispositivos de oxigenoterapia: 14.
- Sistema cardiovascular: 14.

### 1.3 Errores clínicos o datos que requieren actualización

1. **Atropina contradictoria.** El corpus enseña en distintos lugares 0.5 mg y 1 mg para bradicardia sintomática. El algoritmo AHA vigente usa 1 mg IV, repetible cada 3 a 5 minutos, máximo 3 mg. Deben eliminarse todas las versiones de 0.5 mg para este uso. Esto no afecta las dosis distintas de atropina en intoxicación por organofosforados, que constituyen otra indicación.

2. **OVACE de adulto y niño mayor de un año desactualizada.** El contenido enseña compresiones abdominales repetidas sin el ciclo inicial de golpes dorsales. La AHA 2025 indica ciclos de 5 golpes en la espalda y 5 compresiones abdominales en el adulto consciente con obstrucción grave; en embarazo avanzado o cuando no puede rodearse el abdomen se usan compresiones torácicas. La lección debe actualizarse completa, incluidos cuestionarios y tarjetas.

3. **Parkland presentado como cifra universal.** La web afirma 4 mL × kg × %SCQ como respuesta única. Esa es la fórmula clásica que el PDF pide enseñar, pero las guías de la American Burn Association publicadas en 2024 recomiendan iniciar en adultos con quemaduras de al menos 20 % de superficie corporal con 2 mL/kg/%SCQ para reducir sobrecarga, siempre titulando según respuesta. PTEM debe enseñar la fórmula clásica como antecedente/estimación y declarar qué edición o protocolo adopta la academia.

4. **Bibliografía desactualizada.** El PDF cita ACLS 2020 y PHTLS 9. La AHA publicó guías completas en 2025. La bibliografía oficial puede conservarse como referencia histórica del plan, pero el contenido clínico debe llevar edición y fecha de corte. No debe actualizarse a escondidas: se necesita una política docente de vigencia.

5. **“Osteólisis” como procedimiento vascular.** Osteólisis significa destrucción o resorción del tejido óseo. En el contexto de acceso vascular, el término esperado es “osteoclisis” o, preferentemente para claridad actual, “acceso intraóseo”.

6. **Obturador esofágico sin contexto histórico.** El PDF lo menciona, pero no debe enseñarse como dispositivo estándar actual. Si se conserva por fidelidad documental, debe rotularse como dispositivo histórico y compararse con dispositivos supraglóticos actuales autorizados por el servicio.

7. **Dosis sin alcance profesional.** Numerosos bloques presentan dosis como universales sin señalar autorización del nivel formativo, dirección médica, tipo de ambulancia, población, concentración o protocolo local. En material prehospitalario, una cifra correcta fuera de contexto también es insegura.

### 1.4 Paja y relleno innecesario

Debe eliminarse o reducirse:

- Bloques “Fuentes y evidencia” copiados en temas a los que no respaldan.
- Listas enciclopédicas de fármacos avanzados dentro de anatomía básica.
- Tarjetas y preguntas válidas en sí mismas, pero ajenas al objetivo de la página.
- Duplicados con pequeñas variaciones de redacción.
- Expresiones absolutas como “siempre”, “nunca”, “lo único que sirve” o “es lo que realmente mata” cuando existen excepciones clínicas o dependen del protocolo.
- Contenido de transición a medicina, farmacología crítica avanzada o terapia intensiva que no está solicitado en la unidad oficial y no se identifica como ampliación optativa.
- Referencias genéricas a una portada institucional o a un libro sin edición, capítulo o página.

### 1.5 Omisiones respecto del PDF

El inventario automático encuentra 85 nodos vacíos. Once son nodos operativos (9 exámenes y 2 prácticas). Los **74 vacíos académicos reales** se distribuyen así:

| Módulo | Vacíos académicos reales |
|---|---:|
| 1. Propedéutico | 0 |
| 2. El cuerpo humano | 2 |
| 3. Evaluación inicial y soporte vital | 11 |
| 4. Urgencias médico-quirúrgicas | 16 |
| 5. Emergencias traumatológicas | 20 |
| 6. Poblaciones especiales | 24 |
| 7. Operaciones especiales | 1 |

Además, 121 temas tienen material insuficiente. El listado completo de IDs, títulos y campos faltantes está en `docs/CONTENIDO-PENDIENTE.md`.

Las omisiones con mayor impacto formativo son:

- Evaluación de circulación, exploración dirigida y SAMPLE.
- Técnica de canalización y acceso intraóseo.
- Exploración dirigida de tórax, abdomen, neurología y gineco-obstetricia.
- Asma y accidente cerebrovascular.
- Emergencias obstétricas críticas: hemorragia, aborto, ectópico, torsión y parto distócico.
- Trauma facial, ocular y de cuello.
- Fracturas, inmovilización y férulas de tracción.
- Evaluación pediátrica XABCDE, abuso infantil y necesidades especiales.
- Trauma pediátrico, polifarmacia, abuso del adulto mayor y manejo geriátrico.

En el Módulo 7, el PDF solo proporciona títulos generales y no detalla subtemas. No debe inventarse un programa de “Operaciones especiales” sin que la academia defina oficialmente su alcance.

---

## Paso 2. Validación: lo que sí puede conservarse

### 2.1 Conservar intacto

1. **La estructura y trazabilidad documental:** módulos, unidades, temas, semanas, horas, requisito de dos especializaciones y bibliografía tal como aparecen en la semilla. Debe conservarse el dato oficial aun cuando exista un título visible corregido.

2. **`m1-pab-rcp-legos-adulto`, bloque “Compresiones de alta calidad”:** frecuencia de 100–120/min, profundidad adulta de al menos 5 cm evitando superar 6 cm, reexpansión completa, pausas mínimas y cambio de compresor aproximadamente cada 2 minutos. Está alineado con AHA 2025.

3. **`m1-pab-dea`, bloques “Qué hace y qué no hace un DEA” y “Secuencia de uso”:** distinción entre ritmos desfibrilables y no desfibrilables, análisis sin contacto, descarga cuando el equipo la indica y reinicio inmediato de compresiones.

4. **`m1-pai-evaluacion-xabcde`, distinción primaria/secundaria:** XABCDE como evaluación primaria de amenazas vitales y SAMPLE/exploración de cabeza a pies como evaluación secundaria. Debe conservarse la aclaración de que la secundaria no retrasa el traslado del paciente inestable.

5. **`m5-hs-definicion`, idea central “shock no es igual a hipotensión”:** es correcto enseñar que la hipotensión puede ser tardía y que deben reconocerse signos de hipoperfusión antes de que la compensación falle. Conviene sustituir la frase simplificada “la célula no recibe oxígeno” por “la entrega y/o utilización de oxígeno resulta insuficiente para las necesidades metabólicas”.

6. **`m5-tt-neumotorax-tension`, reconocimiento clínico:** no esperar desviación traqueal, considerar que la ingurgitación yugular puede faltar con hipovolemia y sospechar tensión en el paciente ventilado que se deteriora bruscamente. El procedimiento invasivo debe seguir expresamente el protocolo y el alcance autorizado.

### 2.2 Conservar solo después de una corrección menor

- Las lecciones manuales del Módulo 1 y las de shock, tórax, abdomen y cráneo/columna del Módulo 5 son mejores candidatas que el contenido heredado, pero no deben aprobarse en bloque. Son 50 temas manuales, de los cuales 49 alcanzan el mínimo mecánico. Requieren revisión de cifras, absolutos, alcance profesional y citas antes de declararse validados.
- Los textos anatómicos básicos del tema cardiovascular son utilizables; se deben retirar las secciones de fármacos, EVC y vasopresores.
- Las piezas directas del corpus antiguo pueden servir como borrador, nunca como evidencia de corrección. La coincidencia de palabras solo ayuda a localizar candidatos.

---

## Paso 3. Propuesta de corrección y reescritura

Los siguientes textos están redactados para sustituir las secciones contaminadas. No incluyen dosis o procedimientos invasivos que dependan del protocolo local salvo cuando se identifica la fuente y el alcance.

### 3.1 Posiciones, líneas anatómicas y cuadrantes

**Texto propuesto**

La descripción anatómica utiliza una posición de referencia común: persona de pie, cabeza y mirada al frente, miembros superiores a los lados con las palmas hacia delante y pies orientados al frente. A partir de ella se emplean términos de relación como superior/inferior, anterior/posterior, medial/lateral, proximal/distal y superficial/profundo.

Los planos sagital, frontal o coronal y transversal permiten describir la localización y dirección de una lesión. En el abdomen pueden utilizarse cuatro cuadrantes —superior derecho, superior izquierdo, inferior derecho e inferior izquierdo— o nueve regiones. En atención prehospitalaria debe registrarse el sitio con términos anatómicos precisos y evitar expresiones ambiguas como “arriba”, “abajo” o “a un lado”.

**Eliminar de esta página:** ECG, inmovilización espinal, norepinefrina, convulsiones, descompresión torácica, oxitocina y FRAP.

### 3.2 OVACE grave en adulto consciente — actualización AHA 2025

**Texto propuesto**

Una obstrucción leve permite toser o hablar; se anima a la persona a continuar tosiendo y se vigila. Una obstrucción grave se reconoce por tos débil o ausente, incapacidad para hablar, cambio de coloración, alteración del estado mental o apnea. Debe activarse el sistema de emergencias.

En el adulto consciente con obstrucción grave se realizan ciclos de **5 golpes en la espalda seguidos de 5 compresiones abdominales**, hasta expulsar el objeto o hasta que la persona pierda la respuesta. En embarazo avanzado o cuando no es posible rodear el abdomen se sustituyen las compresiones abdominales por compresiones torácicas. Si la persona pierde la respuesta, se inicia RCP comenzando con compresiones y se inspecciona la boca antes de ventilar; solo se retira un objeto visible.

**Actualizar también:** objetivos, pasos, flashcards, cuestionarios y la lección de niño mayor de un año.

### 3.3 Sistema cardiovascular — límites académicos

**Texto propuesto**

El sistema cardiovascular está formado por el corazón y los vasos sanguíneos. Su función es mantener el flujo necesario para transportar oxígeno, nutrientes, hormonas y productos de desecho. El corazón tiene cuatro cavidades y válvulas que dirigen el flujo en un solo sentido. La circulación pulmonar conduce sangre desde el ventrículo derecho a los pulmones y la devuelve a la aurícula izquierda; la circulación sistémica parte del ventrículo izquierdo y retorna a la aurícula derecha.

El sistema de conducción inicia normalmente en el nodo sinoauricular, se propaga por las aurículas, atraviesa el nodo auriculoventricular y continúa por el haz de His, sus ramas y las fibras de Purkinje. Esta sección debe explicar anatomía y fisiología; los fármacos, las arritmias, el síndrome coronario y el EVC pertenecen a unidades posteriores.

### 3.4 Apertura de vía aérea y control cervical

**Texto propuesto**

En la evaluación primaria debe comprobarse si la vía aérea está permeable. En un paciente sin sospecha de trauma puede emplearse la maniobra frente-mentón. Cuando existe un mecanismo compatible con lesión cervical se prefiere la tracción mandibular, mientras otro rescatador mantiene estabilización manual. Si la maniobra inicial no abre la vía aérea, la oxigenación y la ventilación tienen prioridad: se utiliza la técnica que logre permeabilidad con el menor movimiento posible.

Se retiran únicamente cuerpos extraños visibles y accesibles; no se realiza barrido digital a ciegas. La aspiración, las cánulas y la ventilación con bolsa-mascarilla se aplican según indicaciones, contraindicaciones, entrenamiento y protocolo. La SRI y los bloqueadores neuromusculares no pertenecen a esta página.

### 3.5 Fármacos usados en el SMU según NOM-034

**Texto propuesto**

La NOM-034-SSA3-2013 regula criterios mínimos de la atención prehospitalaria y diferencia equipamiento e insumos según el tipo de ambulancia. Sus apéndices normativos incluyen medicamentos mínimos para determinadas unidades, pero esa lista **no constituye por sí sola un protocolo terapéutico ni autoriza a todo prestador a administrar todos los fármacos**.

La enseñanza debe presentar: tipo de ambulancia, medicamento exigido por el apéndice aplicable, presentación, condiciones de conservación y finalidad general. La indicación, dosis, vía y vigilancia deben proceder del protocolo médico vigente, del alcance profesional autorizado y de la dirección médica. Debe citarse el texto publicado en el Diario Oficial, no una lista recordada o reconstruida por IA.

### 3.6 Fórmula de Parkland

**Texto propuesto**

El plan oficial solicita enseñar la fórmula de Parkland. La fórmula clásica estima el volumen inicial de Ringer lactato durante las primeras 24 horas mediante 4 mL × peso en kg × porcentaje de superficie corporal quemada; la mitad se administra durante las primeras 8 horas contadas desde el momento de la quemadura y el resto durante las 16 horas siguientes.

No debe presentarse como una dosis fija. Es una estimación inicial que se ajusta a la respuesta clínica y a la diuresis, de acuerdo con el protocolo. En adultos con quemaduras de al menos 20 % de superficie corporal, la guía de la American Burn Association de 2024 recomienda iniciar con 2 mL/kg/%SCQ para reducir sobrecarga de volumen. PTEM debe identificar expresamente si enseña la fórmula clásica por fidelidad al plan, la recomendación actual o ambas comparadas.

**Eliminar de esta página:** fórmula de Winter, brecha aniónica y trastornos ácido-base.

### 3.7 Analgesia en trauma estable de extremidades

**Texto propuesto**

El control del dolor forma parte de la atención del trauma de extremidades, junto con la evaluación neurovascular, la alineación o inmovilización indicada y la reevaluación. Antes de administrar un fármaco deben documentarse dolor, alergias, medicamentos previos, estado hemodinámico, embarazo cuando corresponda y contraindicaciones.

La selección entre analgésicos no opioides, opioides u otras estrategias depende del protocolo del servicio, el alcance profesional y la situación clínica. No deben incluirse aquí antiarrítmicos, tratamiento de hipercalemia, transfusión masiva ni antídotos. Si la academia desea enseñar AINE, opioide y cloruro de etilo, debe proporcionar su protocolo autorizado con dosis, vía, concentración, contraindicaciones y vigilancia.

### 3.8 Definición de traumatismo craneoencefálico

**Texto propuesto**

El traumatismo craneoencefálico es una alteración de la función cerebral o evidencia de lesión cerebral causada por una fuerza externa. Puede manifestarse con pérdida o alteración de la conciencia, amnesia, déficit neurológico, convulsiones o hallazgos compatibles con lesión intracraneal.

La prioridad prehospitalaria es prevenir lesión secundaria: evitar hipoxemia e hipotensión, identificar deterioro neurológico, proteger la vía aérea cuando esté indicado, controlar hemorragias asociadas, mantener normotermia y trasladar al centro apropiado. La definición no debe contener farmacología obstétrica, calcio de transfusión ni fuentes sobre hemorragia posparto.

### 3.9 Crecimiento y desarrollo pediátrico

**Texto propuesto**

Crecimiento es el aumento cuantitativo del tamaño corporal; desarrollo es la adquisición progresiva de funciones motoras, cognitivas, lingüísticas y sociales. En la valoración prehospitalaria se considera si la conducta y la respuesta del niño son congruentes con su edad, porque la exploración, la comunicación y los signos de alarma cambian con la etapa del desarrollo.

La lección debe organizarse por lactante, preescolar, escolar y adolescente, con hitos generales y enfoque de evaluación, sin convertirla en un catálogo diagnóstico. La tarjeta sobre bactericidas y bacteriostáticos debe eliminarse.

### 3.10 Acceso intraóseo — corrección de “osteólisis”

**Texto propuesto**

El acceso intraóseo u osteoclisis permite administrar líquidos y medicamentos a través de la cavidad medular cuando se necesita acceso vascular urgente y la vía intravenosa no puede obtenerse con rapidez. Sus indicaciones, sitios, dispositivo, técnica, contraindicaciones y confirmación dependen de la edad, el equipo y el protocolo del servicio.

El término “osteólisis” no debe utilizarse para este procedimiento, porque designa destrucción del tejido óseo.

---

## Paso 4. Contenido faltante prioritario

Estas propuestas cubren vacíos críticos y permanecen deliberadamente sin dosis o maniobras avanzadas no definidas por el PDF.

### 4.1 Evaluación de la circulación (`m3-ep-circulacion`)

La evaluación de la circulación identifica perfusión inadecuada y hemorragia. Debe incluir pulso central y periférico, frecuencia y calidad, temperatura y color de la piel, relleno capilar como dato complementario, estado mental y búsqueda sistemática de sangrado. Una presión arterial normal no excluye shock compensado. Toda intervención exige reevaluar la respuesta y buscar causas reversibles.

### 4.2 Historia SAMPLE (`m3-es-sample`)

SAMPLE organiza la información clínica esencial: signos y síntomas; alergias; medicamentos; antecedentes o padecimientos; última ingesta; y eventos relacionados con el cuadro. La historia debe obtenerse del paciente, familiares, testigos, identificaciones médicas o envases disponibles, sin retrasar la atención de amenazas vitales.

### 4.3 Técnica de canalización (`m3-vi-canalizacion`)

La enseñanza debe abarcar indicaciones, selección del sitio y calibre, higiene y antisepsia, preparación del material, técnica aséptica, fijación, comprobación de permeabilidad, documentación y vigilancia de infiltración, extravasación, flebitis, sangrado e infección. La práctica debe realizarse con supervisión y lista de cotejo; un texto no sustituye el entrenamiento psicomotor.

### 4.4 Asma (`m4-resp-asma`)

El asma es una enfermedad inflamatoria con obstrucción variable del flujo aéreo. La evaluación prehospitalaria debe valorar habla, trabajo respiratorio, frecuencia, entrada de aire, sibilancias, saturación y estado mental. El “tórax silencioso”, la fatiga, la alteración de conciencia o el deterioro pese al tratamiento son signos de gravedad. El tratamiento farmacológico debe seguir el protocolo local y distinguir crisis moderada, grave y amenaza vital.

### 4.5 Accidente cerebrovascular (`m4-neu-evc`)

El EVC produce un déficit neurológico agudo por isquemia o hemorragia; ambos no pueden diferenciarse con certeza en el campo. Debe registrarse la última vez que el paciente estuvo bien, aplicar una escala prehospitalaria validada, comprobar glucemia, mantener oxigenación sin hiperoxia rutinaria, evitar retrasos y prealertar al centro receptor según la red regional. No deben administrarse tratamientos de reperfusión sin imagen y protocolo hospitalario.

### 4.6 Abuso infantil (`m6-se-abuso-infantil`)

Debe sospecharse maltrato cuando la historia es incompatible con la lesión o con el desarrollo del niño, cambia entre informantes, existe retraso injustificado en solicitar ayuda o se observan lesiones de distintas edades o en zonas inusuales. La prioridad es la seguridad y la atención clínica. Se documentan hallazgos y declaraciones de forma objetiva, sin interrogar de manera sugestiva ni confrontar al posible agresor, y se activa la ruta institucional y legal correspondiente.

### 4.7 Evaluación pediátrica XABCDE (`m6-ip-xabcde`)

La evaluación pediátrica comienza con una impresión general y continúa con XABCDE adaptado al tamaño y fisiología del niño. Deben reconocerse hemorragia exanguinante, obstrucción de vía aérea, ventilación ineficaz, perfusión alterada, déficit neurológico y exposición con prevención de hipotermia. La reevaluación frecuente es esencial porque el niño puede compensar y deteriorarse con rapidez.

### 4.8 Manejo del paciente geriátrico (`m6-mg-evaluacion`)

La valoración geriátrica debe considerar estado basal, fragilidad, cognición, audición, visión, movilidad, polifarmacia, anticoagulantes, red de apoyo y objetivos de atención. Los signos pueden ser atípicos y una alteración aguda no debe atribuirse automáticamente a la edad. Debe compararse el estado actual con el basal y revisar medicamentos, caídas, infección, dolor, hidratación y riesgo de maltrato.

### 4.9 Tema sin alcance suficiente en el PDF (`m7-operaciones-especiales-unico`)

No se propone contenido. El PDF solo dice “Operaciones especiales” y no define objetivos, competencias ni límites. Inventar rescate vertical, táctico, materiales peligrosos o espacios confinados mezclaría cursos de especialización distintos. La academia debe emitir primero el alcance oficial.

---

## Orden de corrección recomendado

1. Ocultar o marcar como “en revisión” todo contenido procedente únicamente de `reutilizado.js`.
2. Corregir de inmediato los temas con riesgo de daño: dosis contradictorias, OVACE, quemaduras, vía aérea, fármacos, pediatría y procedimientos invasivos.
3. Separar títulos oficiales de títulos visibles corregidos.
4. Convertir el inventario en estados editoriales reales: `vacío`, `borrador automático`, `revisión técnica`, `validado por docente`, `publicado`.
5. Exigir por cada cifra: fuente, edición/año, población, indicación y protocolo o alcance profesional.
6. Revisar los 50 temas manuales y aprobar bloques, no páginas completas por presunción.
7. Redactar los 74 vacíos académicos por prioridad clínica; configurar por separado los 9 exámenes y 2 prácticas vacías.
8. Hacer una segunda auditoría docente antes de publicar a alumnos.

## Criterio editorial mínimo para declarar un tema “validado”

Un tema solo debe marcarse como validado si cumple todo lo siguiente:

- Corresponde exactamente al título y objetivo del PDF.
- No contiene piezas provenientes de otros temas sin una decisión editorial explícita.
- Las afirmaciones clínicas son correctas para la población y el nivel formativo.
- Toda dosis, tiempo, profundidad, frecuencia, sitio anatómico o umbral tiene fuente trazable.
- Se indica edición/año cuando el dato puede cambiar.
- Se diferencia conocimiento general de protocolo local.
- Los objetivos, texto, conceptos, tarjetas y preguntas no se contradicen.
- La evaluación mide lo enseñado en la propia lección.
- Un docente autorizado deja nombre, fecha y versión de aprobación.

## Fuentes externas utilizadas para validar puntos sensibles

- American Heart Association. *2025 Guidelines: Adult Basic Life Support*: https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support
- American Heart Association. *Adult Foreign-Body Airway Obstruction Algorithm, 2025*: https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-BLS-Adult-FBAO-250630.pdf?sc_lang=es
- American Heart Association. *Adult Bradycardia With a Pulse Algorithm, 2025*: https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Accessible/Algorithm-ACLS-Bradycardia-LngDscrp-250725-Ed.pdf
- Diario Oficial de la Federación. *NOM-034-SSA3-2013*: https://www.dof.gob.mx/normasOficiales.php?codp=5473&view=si
- Cartotto R, et al. *American Burn Association Clinical Practice Guidelines on Burn Shock Resuscitation*. J Burn Care Res. 2024;45(3):565-589. https://pubmed.ncbi.nlm.nih.gov/38051821/

## Conclusión

PTEM posee una base curricular recuperable y bien estructurada, pero su contenido heredado no es confiable como conjunto. El principal error metodológico fue tratar similitud léxica como equivalencia académica. La solución no es “completar” más deprisa, sino establecer procedencia, revisión por tema y control de versiones clínicas. La estructura debe conservarse; el contenido debe depurarse con una combinación de eliminación, reubicación, reescritura y validación docente.
