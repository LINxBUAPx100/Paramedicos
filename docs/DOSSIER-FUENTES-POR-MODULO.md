# PTEM — expediente de fuentes académicas por módulo

**Fecha de corte:** 16 de agosto de 2026  
**Destinatario operativo:** Claude, para investigación, redacción e integración del contenido de PTEM  
**Tono editorial obligatorio:** formal universitario, técnico, claro y centrado en la atención prehospitalaria

## 1. Dictamen sobre la propuesta de Gemini

La propuesta de Gemini tiene una **afinidad temática parcialmente correcta**, pero no puede adoptarse como si fuera una distribución oficial de la bibliografía.

El PDF de R.E.S.C.A.T.E. contiene una sola lista titulada «BIBLIOGRAFÍAS SUGERIDAS». No asigna cada obra a un módulo. Por tanto, la relación módulo–libro propuesta por Gemini es una inferencia, no una instrucción del plan.

### Lo acertado

- Tortora es la fuente natural del Módulo 2.
- PHTLS es la base curricular natural del Módulo 5 y un apoyo importante para la evaluación del trauma en los módulos 1 y 3.
- AMLS es un buen marco de razonamiento para las urgencias médicas del Módulo 4.
- ACLS corresponde al paro, las arritmias y parte de las urgencias cardiológicas.
- PALS corresponde al soporte vital y a las urgencias pediátricas.
- El conjunto de manuales de urgencias puede apoyar el Módulo 4, siempre que se identifique exactamente cada obra y se limite el contenido al ámbito prehospitalario.

### Lo que debe corregirse

1. **PHTLS no es la fuente principal para primeros auxilios generales.** Para el Módulo 1 son más directas las guías AHA/Cruz Roja 2024 de primeros auxilios y las guías AHA 2025 de soporte vital.
2. **ACLS 2020 ya no debe gobernar afirmaciones actuales.** Se conserva como referencia histórica del plan, pero las recomendaciones sustituidas deben actualizarse con AHA 2025.
3. **PHTLS 9 es la edición nombrada por el plan, pero la edición vigente del programa es la 10.** La novena puede fijar la correspondencia curricular; la décima y las guías actuales deben utilizarse para detectar cambios, sin atribuir a la novena contenido que no se haya consultado.
4. **EMPACT es antiguo.** La edición identificada es de 2012 y se basa en estándares de 2010. Puede aportar un esquema histórico de evaluación, pero no dosis, algoritmos ni práctica vigente.
5. **“Manual de Urgencias Jiménez” es ambiguo.** Puede referirse al *Manual de Urgencias* de Miguel Rivas Jiménez, 5.ª ed. (2022), o a *Medicina de urgencias y emergencias* de Jiménez Murillo/Montero Pérez, 7.ª ed. (2023). La academia debe confirmar cuál posee y aprueba.
6. **“AMIR” no identifica una obra clínica concreta.** Los manuales AMIR suelen ser material de preparación de examen y no deben gobernar dosis o procedimientos.
7. **“Vademécum farmacología” no tiene autor, edición ni ISBN.** No es una cita reproducible. Ninguna ficha farmacológica puede basarse solo en ese rótulo.
8. **“NALS” es ambiguo en un plan de 2024.** El programa NALS de American Red Cross/AWHONN identificado actualmente apareció después. No debe asumirse que el PDF se refería a ese producto. Para reanimación neonatal se usará AHA/AAP 2025 y la academia deberá identificar el NALS que quiso citar.
9. **Geriatría no queda bien cubierta por EMPACT.** GEMS 3.ª edición es actualmente una fuente prehospitalaria más específica.
10. **Operaciones especiales no se resuelve con EMPACT y PHTLS.** Requiere NOM-034, la guía OMS 2025 para sistemas de ambulancias, EVOS, manejo de incidentes con múltiples víctimas y protocolos locales.

## 2. Regla de autoridad para redactar

Claude debe aplicar este orden a cada afirmación:

1. **Estructura y alcance:** PDF oficial de R.E.S.C.A.T.E. y `scripts/seed/plan-rescate.json`.
2. **Legalidad y operación en México:** texto vigente del DOF, Cámara de Diputados, Secretaría de Salud, COFEPRIS y protocolo local aplicable.
3. **Práctica clínica actual:** guía primaria vigente del organismo responsable del estándar.
4. **Marco pedagógico del plan:** edición exacta de los manuales sugeridos, solo cuando exista una copia legítima y consultable.
5. **Apoyo secundario:** manual clínico identificable, vigente y pertinente.

Una obra sugerida por el PDF no desplaza una norma mexicana ni una actualización clínica posterior. Cuando haya diferencia, el texto debe separar:

- **“Base curricular del plan (2024)”**;
- **“Actualización clínica vigente (fecha de corte)”**;
- **“Protocolo local / dirección médica”**.

## 3. Catálogo resuelto y problemas bibliográficos

| Rótulo del PDF | Identificación o estado | Uso permitido |
|---|---|---|
| Principios de Anatomía y Fisiología; Tortora; Panamericana | Tortora y Derrickson, *Principios de anatomía y fisiología*, 15.ª ed., Editorial Médica Panamericana, 2018 | Fuente curricular principal del Módulo 2 |
| Manual ACLS 2020 | Manual AHA ACLS 2020 | Correspondencia histórica; contrastar recomendaciones con AHA 2025 |
| PHTLS ed. 9 | PHTLS 9.ª ed., NAEMT/ACS | Base curricular de trauma si la copia licenciada está disponible; contrastar con PHTLS 10 y guías actuales |
| PALS | Falta edición en el PDF | Usar copia aprobada para pedagogía; AHA 2025 para afirmaciones vigentes |
| NALS | No resuelto | No citar hasta que la academia identifique autor, organización, edición e ISBN |
| AMLS | AMLS; edición no indicada. La edición actual identificada es la 4.ª | Marco de evaluación de urgencias médicas; no sustituye guías específicas |
| AMIR | No identifica título ni edición | Solo apoyo si la academia identifica el manual; nunca autoridad única |
| MIR Moya | Manuel S. Moya Mir, *Normas de actuación en urgencias*, 5.ª ed., Panamericana, 2011 | Apoyo secundario antiguo y hospitalario; no usar para práctica vigente sin contraste |
| Manual de Urgencias Jiménez | Ambiguo entre al menos dos obras plausibles | Bloquear la cita hasta que la academia confirme la obra exacta |
| EMPACT | *Emergency Medical Patients: Assessment, Care, and Transport*, 1.ª ed., 2012 | Esquema histórico de evaluación; prohibido usarlo para dosis o algoritmos actuales |
| Vademécum farmacología | No identificado | No es fuente reproducible; exigir medicamento, fabricante/IPP vigente, indicación y protocolo |

## 4. Fuentes públicas verificadas

Estas páginas son localizadores oficiales. Claude debe citar el documento específico utilizado dentro de cada tema; no basta con citar este expediente.

### Soporte vital, primeros auxilios y pediatría

- [AHA y Cruz Roja: guías 2024 de primeros auxilios](https://cpr.heart.org/en/resuscitation-science/2024-first-aid-guidelines)
- [AHA 2025: soporte vital básico del adulto](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-basic-life-support)
- [AHA 2025: soporte vital avanzado del adulto](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/adult-advanced-life-support)
- [AHA/AAP 2025: soporte vital básico pediátrico](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-basic-life-support)
- [AHA 2025: soporte vital avanzado pediátrico](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/pediatric-advanced-life-support)
- [AHA/AAP 2025: reanimación neonatal](https://cpr.heart.org/en/resuscitation-science/cpr-and-ecc-guidelines/neonatal-resuscitation)
- [AHA: actualización de materiales de cursos 2025](https://cpr.heart.org/en/resources/faqs/course-updates)

### Atención prehospitalaria y evaluación

- [OMS 2025: guía operativa para sistemas de ambulancias](https://www.who.int/publications/b/79743)
- [OMS 2026: referencia clínica de atención prehospitalaria](https://www.who.int/publications/b/82620)
- [OMS/ICRC: Basic Emergency Care](https://www.who.int/publications/i/item/9789241513081)
- [NAEMT: PHTLS](https://www.naemt.org/education/trauma-education/phtls)
- [NAEMT: cursos PHTLS; confirma contenido de 10.ª edición](https://www.naemt.org/education/trauma-education/phtls/phtls-courses)
- [NAEMT: AMLS 4.ª edición y alcance temático](https://www.naemt.org/education/medical-education/amls)
- [Pearson: EMPACT, 1.ª edición, 2012](https://www.pearson.com/en-us/subject-catalog/p/emergency-medical-patients-assessment-care-and-transport/P200000000933?view=educator)

### Urgencias médicas específicas

- [GINA 2026: estrategia mundial para asma](https://ginasthma.org/reports/)
- [GOLD 2026: informe y guía de bolsillo para EPOC](https://goldcopd.org/2026-gold-report-and-pocket-guide/)
- [AHA/ACC/HFSA 2022: insuficiencia cardiaca](https://professional.heart.org/en/guidelines-statements/2022-ahaacchfsa-guideline-for-the-management-of-heart-failure-a-report-of-thecir0000000000001063)
- [British Thoracic Society 2023: enfermedad pleural y neumotórax espontáneo](https://www.brit-thoracic.org.uk/clinical-resources/guidelines/pleural-disease/)
- [ESC 2019: tromboembolia pulmonar aguda](https://www.escardio.org/guidelines/clinical-practice-guidelines/all-esc-practice-guidelines/acute-pulmonary-embolism/)
- [ATS/IDSA 2019: neumonía adquirida en la comunidad en adultos](https://www.idsociety.org/practice-guideline/community-acquired-pneumonia-cap-in-adults)
- [ADA 2026: Standards of Care in Diabetes](https://diabetesjournals.org/care/article/49/Supplement_1/S6/163930/Summary-of-Revisions-Standards-of-Care-in-Diabetes)
- [AHA/ASA 2026: accidente cerebrovascular isquémico agudo](https://professional.heart.org/en/guidelines-statements/2026-guideline-for-the-early-management-of-patients-with-acute-ischemic-strokestr0000000000000513)
- [KDIGO 2024: enfermedad renal crónica](https://kdigo.org/guidelines/ckd-evaluation-and-management/)
- [OMS 2025: hemorragia posparto](https://www.who.int/publications/i/item/9789240115637)
- [OMS: complicaciones del embarazo y parto, 2.ª ed.](https://www.who.int/publications/i/item/9789241565493)

### Trauma

- [American College of Surgeons: Trauma Quality Programs, guías de mejores prácticas](https://www.facs.org/quality-programs/trauma/quality/best-practices-guidelines/)
- [Brain Trauma Foundation: traumatismo craneoencefálico grave, 4.ª ed.](https://braintrauma.org/coma/guidelines/severe-tbi)
- [American Burn Association: guía 2024 de reanimación del shock por quemaduras](https://pubmed.ncbi.nlm.nih.gov/38051821/)
- [OMS 2025: estándares para lesión medular en emergencias](https://www.who.int/publications/i/item/9789240103948)

### Geriatría y operaciones

- [NAEMT: GEMS](https://naemt.org/education/medical-education/gems)
- [NAEMT: seguridad del operador de vehículos de emergencias (EVOS)](https://www.naemt.org/education/operational-education/ems-vehicle-operator-safety)
- [OMS: manejo de incidentes con múltiples víctimas](https://www.who.int/teams/integrated-health-services/clinical-services-and-systems/emergency-and-critical-care/mass-casualty-management)
- [OMS/ICRC/MSF: herramienta integrada de triage](https://www.who.int/tools/triage)

### México: regulación, fármacos y documentación

- [DOF: NOM-034-SSA3-2013, atención médica prehospitalaria](https://www.dof.gob.mx/normasOficiales.php?codp=5473&view=si)
- [Cámara de Diputados: Reglamento de la LGS en Materia de Prestación de Servicios de Atención Médica](https://www.diputados.gob.mx/LeyesBiblio/regley/Reg_LGS_MPSAM_170718.pdf)
- [DOF: NOM-004-SSA3-2012, expediente clínico](https://www.dof.gob.mx/normasOficiales/4909/SALUD/SALUD.html)
- [Cámara de Diputados: Ley General de Salud vigente](https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf)
- [DOF: Ley Federal de Protección de Datos Personales en Posesión de los Particulares, expedida en 2025](https://www.dof.gob.mx/nota_detalle.php?codigo=5752569&fecha=20/03/2025)
- [Cámara de Diputados: Código Nacional de Procedimientos Penales vigente](https://www.diputados.gob.mx/LeyesBiblio/pdf/CNPP.pdf)
- [COFEPRIS: guía para información para prescribir](https://www.gob.mx/cofepris/documentos/guia-para-estructurar-y-redactar-la-informacion-para-prescribir-e-instructivo)
- [COFEPRIS: visor de registros sanitarios de medicamentos](https://www.gob.mx/cofepris/articulos/cofepris-presenta-visor-de-registros-sanitarios-de-medicamentos?idiom=es)
- [Secretaría de Salud: manual 2024 de vigilancia de intoxicaciones por animales ponzoñosos](https://epidemiologia.salud.gob.mx/gobmx/salud/documentos/manuales/26_Manual_de_Procedimientos_Ponzona_2024.pdf)

## 5. Matriz de trabajo por módulo

### Módulo 1 — Propedéutico

**Base principal:** AHA/Cruz Roja 2024, AHA BLS/PBLS 2025, OMS Basic Emergency Care.  
**Apoyo del plan:** PHTLS 9 para evaluación y lesiones; el manual de urgencias confirmado para contexto.  
**Fuentes obligatorias adicionales:** NOM-034, Ley General de Salud, NOM-004, ley de datos personales y CNPP para el bloque médico-legal.

Distribución:

- Primeros auxilios básicos: AHA/Cruz Roja 2024 más AHA BLS 2025 para RCP, DEA y OVACE.
- Primeros auxilios intermedios: OMS BEC y PHTLS para XABCDE, heridas y trauma; AHA PBLS 2025 para RCP/OVACE pediátrica.
- Introducción al SMU: OMS 2025 y NOM-034 para organización; legislación vigente para consentimiento, negativa, confidencialidad, documentación e indicios.
- Terminología y referencias anatómicas: Tortora, sin convertir el tema en fisiopatología avanzada.

**Prohibiciones:** no enseñar intervenciones profesionales como si fueran primeros auxilios para legos; no sostener todo el bloque legal únicamente con NOM-034; no usar algoritmo adulto para OVACE pediátrica.

### Módulo 2 — El cuerpo humano

**Base principal y suficiente para el alcance:** Tortora y Derrickson, 15.ª ed.  
**Apoyo opcional:** otra obra de anatomía/fisiología solo cuando aclare una figura o concepto y esté identificada.

Distribución:

- Anatomía y fisiología esencial: célula, líquidos, electrofisiología, ácido–base, metabolismo y tegumentario.
- Anatomía y fisiología intermedia: sistemas óseo, muscular, cardiovascular, nervioso, digestivo y urinario.
- Anatomía opcional: sistemas hematopoyético, linfático/inmunitario, reproductor, sentidos y endocrino.
- Práctica: identificación y relaciones anatómicas; no prosa enciclopédica.

**Prohibiciones:** no adelantar tratamiento, dosis, protocolos de cuidados críticos o diagnósticos diferenciales; no usar la antigua estructura de cinco módulos de `src/data/temarioOficial.js`.

### Módulo 3 — Evaluación inicial y soporte vital

**Base principal:** OMS BEC, PHTLS, AHA BLS/ALS 2025.  
**Apoyo del plan:** ACLS 2020 y EMPACT únicamente para cotejo histórico.  
**Condición local:** NOM-034, ficha técnica del equipo, alcance profesional y dirección médica.

Distribución:

- Evaluación primaria/secundaria: OMS BEC y PHTLS; distinguir XABCDE, ABCDE, SAMPLE y exploración dirigida.
- Vía aérea: AHA 2025 y guía/protocolo del servicio; confirmar cada dispositivo y su indicación.
- Vía intravenosa/intraósea: protocolo local, alcance profesional, ficha del dispositivo y fuente farmacológica de cada solución.
- Monitor/desfibrilador: AHA 2025 y manual de uso del fabricante del equipo real.

**Bloqueos obligatorios:** secuencia rápida, cricotiroidotomía con aguja y demás procedimientos invasivos no pueden redactarse como competencia autónoma hasta conocer nivel del programa, supervisión, equipo y protocolo local. “Obturador esofágico” debe tratarse como dispositivo histórico/obsoleto, no como práctica recomendada. “Osteólisis” se conserva solo como errata documental y se muestra como acceso intraóseo/osteoclisis.

### Módulo 4 — Urgencias médico-quirúrgicas

**Marco común:** AMLS 4 para evaluación y razonamiento.  
**Apoyo del plan:** manual de urgencias exacto que confirme la academia; Moya Mir y EMPACT solo como apoyo histórico.  
**Regla:** cada unidad necesita además la guía primaria actual de su especialidad.

Distribución:

- Epidemiología: fuentes oficiales de salud pública; enseñar clasificación y utilidad prehospitalaria, no estadística inventada.
- Farmacología: COFEPRIS/IPP vigente, guía de la indicación, NOM-034 y formulario/protocolo local. Un “vademécum” sin identificar no sirve.
- Respiratorias: OMS 2026/BEC para evaluación y estabilización inicial; GINA 2026 para asma; GOLD 2026 para EPOC; AHA/ACC/HFSA para edema pulmonar cardiogénico; BTS 2023 para neumotórax espontáneo; ESC 2019 para TEP; ATS/IDSA 2019 para neumonía adulta. AMLS es apoyo curricular, no sustituto de esas guías. Todo tratamiento farmacológico requiere además IPP, dotación vigente, protocolo local y límites prehospitalarios.
- Gastrointestinales: AMLS más el manual de urgencias confirmado; centrarse en reconocimiento de gravedad, shock, hidratación y traslado, no en diagnóstico hospitalario definitivo.
- Cardiológicas: AHA ALS 2025 para paro y arritmias; ACLS 2020 solo como antecedente del plan. Cualquier fármaco debe contrastarse con algoritmo vigente y protocolo local.
- Metabólicas: ADA 2026 y AMLS; separar hipoglucemia, hiperglucemia y crisis hiperglucémicas; no trasladar regímenes hospitalarios al campo.
- Urinarias: AMLS/KDIGO y manual confirmado; el objetivo es reconocer deterioro, alteraciones electrolíticas y necesidad de traslado.
- Neurológicas: AHA/ASA 2026 para EVC, AMLS y protocolo local para convulsiones; tiempos y escalas deben citarse.
- Gineco-obstétricas: OMS obstetricia y HPP 2025, más protocolo local; parto distócico y fármacos obstétricos requieren límites explícitos.
- Toxicológicas: Secretaría de Salud/COFEPRIS, centro toxicológico y protocolos de antivenenos; no convertir un manual de vigilancia epidemiológica en guía terapéutica.

**Prohibiciones:** no usar una sola fuente para todo el módulo; no copiar esquemas hospitalarios avanzados al ámbito prehospitalario; no fijar infusiones, aminas, antídotos o dosis sin concentración, indicación, población y protocolo.

**Nota normativa al corte de 2026:** la NOM-034-SSA3-2013 continúa siendo el texto publicado que se consulta. El Programa Nacional de Infraestructura de la Calidad 2026 conserva una modificación como proyecto en curso; no la describas como reforma vigente hasta localizar su publicación normativa final en el DOF.

### Módulo 5 — Emergencias traumatológicas

**Base curricular:** PHTLS 9, si se consulta la copia licenciada.  
**Actualización:** PHTLS 10, ACS TQP, Brain Trauma Foundation, American Burn Association, OMS y AHA/Cruz Roja 2024.

Distribución:

- Cinemática: PHTLS; usarla para anticipar lesiones, no para diagnosticar por mecanismo.
- Hemorragia y shock: PHTLS, AHA/Cruz Roja 2024 y fuentes actuales de control hemorrágico/reanimación.
- Tórax, abdomen, cara y musculoesquelético: PHTLS más guías ACS; separar reconocimiento prehospitalario de confirmación hospitalaria.
- Cráneo y columna: PHTLS, Brain Trauma Foundation, ACS y OMS; corregir Monro–Kellie, cauda equina y Brown-Séquard.
- Lesiones ambientales: AHA/Cruz Roja 2024 y guía actual específica.
- Quemaduras: PHTLS/ABLS y ABA 2024. Explicar Parkland como fórmula clásica solicitada por el plan y contrastarla con la recomendación actual aplicable, con titulación y contexto.

**Prohibiciones:** no enseñar manitol, anticonvulsivantes, intubación o descompresión como acciones universales; no afirmar lesión específica únicamente por cinemática; no mezclar el manejo hospitalario definitivo con el tratamiento de campo.

### Módulo 6 — Poblaciones especiales

**Pediatría:** AHA/AAP 2025, PALS de edición aprobada, OMS y PHTLS para trauma.  
**Neonatal:** AHA/AAP 2025; NALS queda sin identificar.  
**Geriatría:** GEMS 3, AMLS, PHTLS/ACS para trauma y normativa de protección aplicable.

Distribución:

- Introducción/evaluación pediátrica: PALS, AHA PALS 2025 y enfoque pediátrico sistemático.
- Situaciones especiales: fuente pediátrica oficial y legislación mexicana para abuso, consentimiento y protección; no diagnosticar abuso por un signo aislado.
- Soporte vital pediátrico: AHA PBLS/PALS 2025, sin algoritmos adultos.
- Urgencias pediátricas: PALS/OMS y guía específica actual; “sufrimiento fetal agudo” debe revisarse porque pertenece mejor al bloque obstétrico/perinatal.
- Trauma pediátrico: PHTLS y AHA/AAP; acceso intraóseo conforme a alcance y protocolo.
- Geriatría: GEMS 3 para evaluación, comunicación, polifarmacia y diamante GEMS; PHTLS/ACS para trauma geriátrico.

**Prohibiciones:** no inferir percentiles, dosis por peso o tamaños de equipo sin una fuente pediátrica concreta; no usar EMPACT 2012 como autoridad vigente; no afirmar que el NALS actual es el citado por el plan.

### Módulo 7 — Operaciones especiales

El PDF enumera cuatro unidades de cinco horas, pero deja **vacía toda la columna de subtemas**. Por ello los cuatro temas deben permanecer `bloqueado_por_decision` hasta que la academia apruebe objetivos y competencias.

Fuentes candidatas una vez aprobado el alcance:

- Operaciones de ambulancias: NOM-034, OMS 2025 y EVOS; agregar reglamento de tránsito y política institucional local.
- Obtención de acceso y extracción: debe aclararse si “acceso” significa acceso a la escena, acceso al paciente, extricación vehicular o acceso vascular. PHTLS no resuelve esa ambigüedad.
- Operaciones especiales: definir si incluye HazMat, rescate, táctico, aeromédico, incidentes infecciosos u otro campo. Cada opción exige formación, regulación y fuentes diferentes.
- Múltiples víctimas/triage: OMS MCM/IITT, sistema de comando y protocolo de protección civil/servicio aprobado.

**Prohibición absoluta:** Claude no debe convertir esta lista de posibles temas en el temario oficial. Solo puede preparar una propuesta para decisión humana.

## 6. Decisiones que la academia debe responder

1. ¿Qué obra exacta significa “Manual de Urgencias Jiménez”?
2. ¿Qué título y edición de AMIR se autoriza?
3. ¿Qué vademécum —autor, editorial, edición o base oficial— quiso citar el plan?
4. ¿Qué producto y edición significa NALS en el documento de 2024?
5. ¿Se adopta PHTLS 9 como texto histórico o se actualiza formalmente el plan a PHTLS 10?
6. ¿Se mantiene ACLS 2020 como texto del curso o se actualiza a materiales AHA 2025?
7. ¿Cuál es el nivel profesional, alcance farmacológico y lista de procedimientos invasivos de los alumnos?
8. ¿Cuál es el formulario de medicamentos, concentraciones y bombas reales del servicio?
9. ¿Qué significa “obtención de acceso” en el Módulo 7?
10. ¿Qué operaciones especiales y método de triage enseña oficialmente la academia?
11. ¿Se corrigen las horas del Módulo 4 o se conserva la discrepancia documental?

Las preguntas 1–4 bloquean citas bibliográficas; 7–10 bloquean contenido de riesgo. Claude puede seguir redactando temas no afectados.

## 7. Contrato de producción para Claude

Antes de redactar cada lote, Claude debe crear una ficha de evidencia con:

- ID y título oficial del tema;
- objetivo prehospitalario limitado;
- fuente estructural;
- fuente clínica vigente;
- fuente mexicana o protocolo local, cuando aplique;
- edición/fecha de corte;
- afirmaciones de alto riesgo previstas;
- decisiones pendientes;
- estado editorial resultante.

Para cada cifra clínica debe registrar: población, indicación, vía, concentración si aplica, fecha de la fuente y carácter universal/nacional/local. Si alguno falta, la cifra no entra como regla general.

Todo contenido generado queda como `borrador` o `en_revision`. Solo un docente autorizado puede marcarlo `validado` o `publicado`.

## 8. Derechos de autor y uso de IA

- No descargar ni reproducir manuales comerciales sin licencia.
- No copiar tablas, algoritmos, figuras o párrafos extensos.
- Parafrasear hechos y citar la fuente concreta.
- Respetar las condiciones de uso de cada sitio. Si una guía prohíbe transformación o redistribución por IA, usarla solo como localizador para revisión humana o buscar una fuente primaria pública alternativa.
- No presentar como leído un manual al que Claude no tenga acceso.

## 9. Criterio final de aceptación

Un tema solo queda listo para revisión docente si:

1. coincide con su título y vecinos del PDF;
2. no amplía el alcance por intuición;
3. separa práctica actual, base histórica y protocolo local;
4. contiene fuentes específicas y verificables;
5. no contiene dosis o procedimientos sin contexto;
6. sus tarjetas, quiz y actividades se derivan del texto del propio tema;
7. permanece sin publicar hasta firma docente.
