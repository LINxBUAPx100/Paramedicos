# Contraste del temario contra evidencia externa

> Generado por `scripts/contraste-evidencia.mjs` — no editar a mano.
> Regenerar: `npm run contraste -- --md`

Una fuente dice de dónde salió una frase; no dice que la frase siga siendo
cierta hoy. Esta cola separa las afirmaciones del temario que **se pueden**
comprobar contra literatura clínica de las que no, y las ordena por el daño
que haría equivocarse.

**El buscador no es la fuente.** OpenEvidence y equivalentes sintetizan
literatura: sirven para localizar la guía o el artículo primario. Lo que se
cita en la lección es ese documento, abierto y leído.
`tests/contrasteEvidencia.test.mjs` impide que su dominio aparezca en un
bloque `fuentes`.

**Un veredicto no valida un tema.** `validado` y `publicado` siguen exigiendo
firma docente. Lo que un veredicto produce es un hallazgo concreto, que es
exactamente lo que CLAUDE.md pide para poder tocar una lección ya terminada.

## Reparto

| Ámbito | Afirmaciones | Quién lo resuelve |
|---|---:|---|
| evidencia | 132 | literatura y guías clínicas — esta cola |
| curricular | 33 | alcance del plan oficial: decisión de la academia |
| normativo | 26 | DOF y Secretaría de Salud: texto vigente, no literatura |
| local | 4 | protocolo y formulario del servicio: decisión de la academia |

Con veredicto registrado: **27**. Pendientes: **110** (8 de riesgo alto, 28 medio, 74 bajo).

## Cómo se anota un resultado

En `docs/CONTRASTE-EVIDENCIA.json`, una entrada por afirmación consultada:

```json
{
  "id": "af-0000000000",
  "temaId": "m5-que-parkland",
  "literal": "la frase tal como está en la lección",
  "consultadoEl": "2026-09-17",
  "consultadoPor": "nombre o rol",
  "veredicto": "matiza",
  "resumen": "qué dijo la evidencia, en una o dos frases",
  "fuentesPrimarias": [
    {
      "cita": "Institución. Documento, edición/año, sección o tabla.",
      "url": "https://…",
      "doi": "10.xxxx/xxxxx"
    }
  ],
  "accion": "precisar",
  "nota": "qué habría que cambiar en la lección"
}
```

## Lote piloto — las 25 de mayor riesgo

Cada bloque se pega tal cual en el buscador.

### 1. `af-caac08cf0c` · riesgo alto

**Dónde:** `m1-pai-signos-vitales` (M1)

**Dice el curso:** La información que cambia decisiones aparece al comparar dos tomas separadas en el tiempo: una frecuencia cardiaca de 110 lpm significa una cosa si antes era 95 y otra muy distinta si antes era 130.

**Cita actual de la lección:** Conde C. Semiología y fisiopatología, 2015.

```text
Topic: Toma de signos vitales. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "La información que cambia decisiones aparece al comparar dos tomas separadas en el tiempo: una frecuencia cardiaca de 110 lpm significa una cosa si antes era 95 y otra muy distinta si antes era 130."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 2. `af-822a7a6fd3` · riesgo alto

**Dónde:** `m1-pai-signos-vitales` (M1)

**Dice el curso:** Un paciente con 18 respiraciones por minuto pero con tiraje intercostal marcado no tiene una respiración normal.

**Cita actual de la lección:** Conde C. Semiología y fisiopatología, 2015.

```text
Topic: Toma de signos vitales. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Un paciente con 18 respiraciones por minuto pero con tiraje intercostal marcado no tiene una respiración normal."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 3. `af-d09b91f229` · riesgo alto

**Dónde:** `m1-pai-signos-vitales` (M1)

**Dice el curso:** Rescate de incendio con saturación de 98 %: ¿queda descartada la hipoxia?

**Cita actual de la lección:** Conde C. Semiología y fisiopatología, 2015.

```text
Topic: Toma de signos vitales. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Rescate de incendio con saturación de 98 %: ¿queda descartada la hipoxia?"
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 4. `af-139892652e` · riesgo alto

**Dónde:** `m1-pai-ovace-pediatrico` (M1)

**Dice el curso:** A partir del año de edad la guía pediátrica de 2025 recomienda ciclos de 5 golpes dorsales alternados con 5 compresiones abdominales, repetidos hasta expulsar el objeto o hasta que el niño deje de responder.

**La misma cifra aparece además en 8 sitio(s) de la lección:**
- A partir del año se comprime el abdomen, pero dentro del ciclo: 5 golpes dorsales y 5 compresiones abdominales.
- Ciclo de la OVACE en el lactante 5 golpes interescapulares + 5 compresiones torácicas, repitiendo.
- Lactante menor de un año con obstrucción grave: 5 golpes dorsales + 5 compresiones TORÁCICAS;
- A partir del año de edad, dentro del ciclo de 5 golpes dorsales + 5 compresiones abdominales.
- Niño mayor de un año con obstrucción grave: 5 golpes dorsales + 5 compresiones ABDOMINALES.
- Dar 5 compresiones torácicas en el mismo punto que la RCP, más lentas y profundas.
- Dar 5 golpes interescapulares con el talón de la mano.
- En el menor de un año la secuencia es 5 y 5.

**Cita actual de la lección:** American Heart Association y American Academy of Pediatrics. Part 6: Pediatric Basic Life Support. 2025 Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. Circulation, 2025. DOI 10.1161/CIR.0000000000001370.

```text
Topic: OVACE en pediátrico y lactante. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "A partir del año de edad la guía pediátrica de 2025 recomienda ciclos de 5 golpes dorsales alternados con 5 compresiones abdominales, repetidos hasta expulsar el objeto o hasta que el niño deje de responder."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 5. `af-77866fe05f` · riesgo alto

**Dónde:** `m1-pai-ovace-pediatrico` (M1)

**Dice el curso:** El cambio de 2025 alineó la secuencia del niño con la del lactante añadiendo los golpes dorsales al inicio del ciclo, y la propia guía explica que la evidencia pediátrica directa es limitada y que se buscó simplificar el entrenamiento.

**La misma cifra aparece además en 4 sitio(s) de la lección:**
- El plan oficial separa la OVACE del adulto de la pediátrica, y las recomendaciones difieren: la fuente de esta página es la guía pediátrica de 2025 de la AHA y la Academia Americana de Pediatría.
- A partir del año, la guía pediátrica de 2025 recomienda ciclos de cinco golpes dorsales alternados con cinco compresiones abdominales.
- El cambio de 2025 alineó la secuencia del niño con la del lactante añadiendo los golpes dorsales al inicio del ciclo.
- ¿Qué cambió la guía de 2025 en el niño y con qué razones lo explicó?

**Cita actual de la lección:** American Heart Association y American Academy of Pediatrics. Part 6: Pediatric Basic Life Support. 2025 Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. Circulation, 2025. DOI 10.1161/CIR.0000000000001370.

```text
Topic: OVACE en pediátrico y lactante. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "El cambio de 2025 alineó la secuencia del niño con la del lactante añadiendo los golpes dorsales al inicio del ciclo, y la propia guía explica que la evidencia pediátrica directa es limitada y que se buscó simplificar el entrenamiento."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 6. `af-d276f5060d` · riesgo alto

**Dónde:** `m1-pai-ovace-pediatrico` (M1)

**Dice el curso:** Al suelo, activar el 911 e iniciar RCP, mirando la boca antes de cada ventilación.

**Cita actual de la lección:** American Heart Association y American Academy of Pediatrics. Part 6: Pediatric Basic Life Support. 2025 Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. Circulation, 2025. DOI 10.1161/CIR.0000000000001370.

```text
Topic: OVACE en pediátrico y lactante. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Al suelo, activar el 911 e iniciar RCP, mirando la boca antes de cada ventilación."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 7. `af-220bd1abdb` · riesgo alto

**Dónde:** `m4-met-diabetes` (M4)

**Dice el curso:** Hay pacientes con tipo 1 diagnosticados en la edad adulta y pacientes con tipo 2 que desarrollan cetoacidosis.

**La misma cifra aparece además en 3 sitio(s) de la lección:**
- Diferencia funcional entre tipo 1 y tipo 2 En el tipo 1 el páncreas deja de producir insulina;
- Diferencia funcionalmente la diabetes tipo 1 de la tipo 2.
- Tomar las asociaciones de tipo 1 y tipo 2 como absolutas

**Cita actual de la lección:** American Diabetes Association. Standards of Care in Diabetes, 2026.

```text
Topic: Diabetes mellitus. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Hay pacientes con tipo 1 diagnosticados en la edad adulta y pacientes con tipo 2 que desarrollan cetoacidosis."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 8. `af-4e248044ee` · riesgo alto

**Dónde:** `m4-met-diabetes` (M4)

**Dice el curso:** Diabetes tipo 1: El páncreas deja de producir insulina;

**La misma cifra aparece además en 2 sitio(s) de la lección:**
- Tipo 1: el páncreas deja de producir insulina;
- El tipo 1 es más propenso a la cetoacidosis;

**Cita actual de la lección:** American Diabetes Association. Standards of Care in Diabetes, 2026.

```text
Topic: Diabetes mellitus. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Diabetes tipo 1: El páncreas deja de producir insulina;"
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 9. `af-aa17070d2c` · riesgo medio

**Dónde:** `m1-pab-rcp-legos-adulto` (M1)

**Dice el curso:** El relevo eficiente cambia de reanimador cada dos minutos aproximadamente, se anuncia antes, se coloca en posición mientras el otro sigue comprimiendo y se ejecuta en menos de 5 segundos.

**La misma cifra aparece además en 3 sitio(s) de la lección:**
- La consecuencia práctica para el alumno es que el error frecuente es quedarse corto, no pasarse: el objetivo que se vigila es alcanzar los 5 cm.
- La de 2025 la enuncia como un umbral: al menos 5 cm.
- Realizar el cambio en menos de 5 segundos.

**Cita actual de la lección:** Kleinman ME, Buick JE, Huber N, et al. Part 7: Adult Basic Life Support: 2025 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care. Circulation. 2025;152(16_suppl_2):S448-S478.

```text
Topic: RCP legos en adulto. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "El relevo eficiente cambia de reanimador cada dos minutos aproximadamente, se anuncia antes, se coloca en posición mientras el otro sigue comprimiendo y se ejecuta en menos de 5 segundos."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 10. `af-c6f3ca69df` · riesgo medio

**Dónde:** `m1-pab-quemaduras` (M1)

**Dice el curso:** En el adulto la superficie corporal se reparte en múltiplos de nueve: cabeza y cuello 9 %, cada extremidad superior 9 %, cara anterior del tronco 18 %, cara posterior 18 %, cada extremidad inferior 18 % y periné 1 %.

**Cita actual de la lección:** Hewett Brumberg EK, Douma MJ, Alibertis K, et al. 2024 American Heart Association and American Red Cross Guidelines for First Aid. Circulation. 2024;150(24):e519-e579.

```text
Topic: Quemaduras. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "En el adulto la superficie corporal se reparte en múltiplos de nueve: cabeza y cuello 9 %, cada extremidad superior 9 %, cara anterior del tronco 18 %, cara posterior 18 %, cada extremidad inferior 18 % y periné 1 %."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 11. `af-55d306b826` · riesgo medio

**Dónde:** `m1-pab-quemaduras` (M1)

**Dice el curso:** Para superficies irregulares o pequeñas, la palma de la mano del PACIENTE (incluidos los dedos) equivale aproximadamente al 1 % de su superficie corporal.

**La misma cifra aparece además en 2 sitio(s) de la lección:**
- Regla de la palma: La palma del paciente con los dedos equivale a cerca del 1 % de su superficie corporal.
- Aproximadamente el 1 % de su superficie corporal.

**Cita actual de la lección:** Hewett Brumberg EK, Douma MJ, Alibertis K, et al. 2024 American Heart Association and American Red Cross Guidelines for First Aid. Circulation. 2024;150(24):e519-e579.

```text
Topic: Quemaduras. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Para superficies irregulares o pequeñas, la palma de la mano del PACIENTE (incluidos los dedos) equivale aproximadamente al 1 % de su superficie corporal."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 12. `af-7f21bb746c` · riesgo medio

**Dónde:** `m1-pab-quemaduras` (M1)

**Dice el curso:** Regla de los nueves: Método de estimación rápida de la superficie corporal quemada repartiendo el cuerpo del adulto en múltiplos de 9 %.

**Cita actual de la lección:** Hewett Brumberg EK, Douma MJ, Alibertis K, et al. 2024 American Heart Association and American Red Cross Guidelines for First Aid. Circulation. 2024;150(24):e519-e579.

```text
Topic: Quemaduras. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Regla de los nueves: Método de estimación rápida de la superficie corporal quemada repartiendo el cuerpo del adulto en múltiplos de 9 %."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 13. `af-2c587a8bff` · riesgo medio

**Dónde:** `m1-pai-signos-vitales` (M1)

**Dice el curso:** El brazalete debe abarcar aproximadamente el 80 % de la circunferencia del brazo y cubrir dos tercios de su longitud;

**La misma cifra aparece además en 1 sitio(s) de la lección:**
- Alrededor del 80 % de la circunferencia y dos tercios de la longitud del brazo.

**Cita actual de la lección:** Conde C. Semiología y fisiopatología, 2015.

```text
Topic: Toma de signos vitales. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "El brazalete debe abarcar aproximadamente el 80 % de la circunferencia del brazo y cubrir dos tercios de su longitud;"
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 14. `af-83457821cb` · riesgo medio

**Dónde:** `m3-ep-neurologica` (M3)

**Dice el curso:** Dos exigencias se repiten en todas las preguntas de la D: registrar los TRES componentes de Glasgow además del total —porque un 10 puede ser cualquier cosa y el motor es el que mejor refleja la gravedad— y no atribuir al cerebro lo que todavía no se ha descartado fuera de él.

**La misma cifra aparece además en 2 sitio(s) de la lección:**
- Se registran siempre los tres componentes además del total: un total de 10 puede corresponder a situaciones clínicas muy distintas, y el componente motor es el que mejor refleja la gravedad.
- Un 10 puede corresponder a situaciones clínicas muy distintas según de dónde salgan los puntos.

**Cita actual de la lección:** NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.

```text
Topic: Evaluación neurológica. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Dos exigencias se repiten en todas las preguntas de la D: registrar los TRES componentes de Glasgow además del total —porque un 10 puede ser cualquier cosa y el motor es el que mejor refleja la gravedad— y no atribuir al cerebro lo que todavía no se ha descartado fuera de él."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 15. `af-5d34204106` · riesgo medio

**Dónde:** `m3-ep-neurologica` (M3)

**Dice el curso:** Los síndromes medulares concretos, el manejo del traumatismo craneoencefálico y las escalas prehospitalarias de accidente cerebrovascular se estudian en sus propios temas, en los Módulos 4 y 5.

**La misma cifra aparece además en 1 sitio(s) de la lección:**
- Síndromes medulares, traumatismo craneoencefálico y escalas de ictus son otros temas, en los Módulos 4 y 5.

**Cita actual de la lección:** NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.

```text
Topic: Evaluación neurológica. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Los síndromes medulares concretos, el manejo del traumatismo craneoencefálico y las escalas prehospitalarias de accidente cerebrovascular se estudian en sus propios temas, en los Módulos 4 y 5."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 16. `af-bf8a734e4c` · riesgo medio

**Dónde:** `m3-va-canulas-orofaringeas` (M3)

**Dice el curso:** Avanzarla hasta aproximadamente la mitad y girarla 180 grados hasta que la concavidad siga la curva de la lengua.

**La misma cifra aparece además en 4 sitio(s) de la lección:**
- En pediatría la técnica del giro de 180 grados puede lesionar el paladar blando, que es más frágil.
- Se introduce con la concavidad hacia el paladar y se gira 180 grados a media inserción.
- El giro de 180 grados puede lesionar el paladar blando, más frágil en pediatría.
- Con la concavidad hacia el paladar, girándola 180 grados a medio camino.

**Cita actual de la lección:** American Heart Association. 2025 Guidelines: Adult Basic Life Support.

```text
Topic: Cánulas orofaríngeas. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Avanzarla hasta aproximadamente la mitad y girarla 180 grados hasta que la concavidad siga la curva de la lengua."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 17. `af-76270c4477` · riesgo medio

**Dónde:** `m4-far-nom-034` (M4)

**Dice el curso:** A.4.1 · Cloruro de sodio, solución al 0.9 %

**Cita actual de la lección:** DOF. NOM-034-SSA3-2013, Atención médica prehospitalaria (23 de septiembre de 2014): numerales 4.1.2 a 4.1.5 y Apéndices Normativos A.4, B.4, C.3 y D.1.

```text
Topic: Fármacos usados en el SMU según la NOM 034. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "A.4.1 · Cloruro de sodio, solución al 0.9 %"
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 18. `af-e99477b9e5` · riesgo medio

**Dónde:** `m4-far-nom-034` (M4)

**Dice el curso:** A.4.3 · Glucosa, solución al 5 %

**Cita actual de la lección:** DOF. NOM-034-SSA3-2013, Atención médica prehospitalaria (23 de septiembre de 2014): numerales 4.1.2 a 4.1.5 y Apéndices Normativos A.4, B.4, C.3 y D.1.

```text
Topic: Fármacos usados en el SMU según la NOM 034. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "A.4.3 · Glucosa, solución al 5 %"
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 19. `af-4a7606b1f1` · riesgo medio

**Dónde:** `m4-far-nom-034` (M4)

**Dice el curso:** B.4.3.1 · Endocrinología · Dextrosa al 50 %

**Cita actual de la lección:** DOF. NOM-034-SSA3-2013, Atención médica prehospitalaria (23 de septiembre de 2014): numerales 4.1.2 a 4.1.5 y Apéndices Normativos A.4, B.4, C.3 y D.1.

```text
Topic: Fármacos usados en el SMU según la NOM 034. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "B.4.3.1 · Endocrinología · Dextrosa al 50 %"
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 20. `af-5902698002` · riesgo medio

**Dónde:** `m4-far-nom-034` (M4)

**Dice el curso:** Solo soluciones —cloruro de sodio al 0.9 %, electrolitos orales, glucosa al 5 % y solución Hartman—;

**Cita actual de la lección:** DOF. NOM-034-SSA3-2013, Atención médica prehospitalaria (23 de septiembre de 2014): numerales 4.1.2 a 4.1.5 y Apéndices Normativos A.4, B.4, C.3 y D.1.

```text
Topic: Fármacos usados en el SMU según la NOM 034. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Solo soluciones —cloruro de sodio al 0.9 %, electrolitos orales, glucosa al 5 % y solución Hartman—;"
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 21. `af-5b32497ef1` · riesgo medio

**Dónde:** `m5-hs-signos-tratamiento` (M5)

**Dice el curso:** más de 2 segundos sugiere hipoperfusión.

**La misma cifra aparece además en 1 sitio(s) de la lección:**
- Relleno capilar mayor de 2 segundos.

**Cita actual de la lección:** NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.

```text
Topic: Signos y síntomas y tratamiento prehospitalario. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "más de 2 segundos sugiere hipoperfusión."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 22. `af-5e63833369` · riesgo medio

**Dónde:** `m5-tcc-glasgow` (M5)

**Dice el curso:** La escala de coma de Glasgow puntúa tres respuestas —apertura ocular, respuesta verbal y respuesta motora— y las suma en un valor de 3 a 15.

**La misma cifra aparece además en 1 sitio(s) de la lección:**
- Escala de coma de Glasgow: Instrumento que puntúa apertura ocular, respuesta verbal y respuesta motora, con un total de 3 a 15.

**Cita actual de la lección:** NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4), cap. 8, «Trauma en cabeza», pp. 257–292.

```text
Topic: Escala de coma de Glasgow. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "La escala de coma de Glasgow puntúa tres respuestas —apertura ocular, respuesta verbal y respuesta motora— y las suma en un valor de 3 a 15."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 23. `af-594cceeb66` · riesgo medio

**Dónde:** `m5-tcc-glasgow` (M5)

**Dice el curso:** Cada componente puntúa al menos 1, así que el valor más bajo posible es 3 y el más alto 15.

**La misma cifra aparece además en 2 sitio(s) de la lección:**
- De ahí sale el máximo de 15, y como cada componente puntúa al menos 1, el mínimo es 3.
- Rango de la escala de coma de Glasgow De 3 a 15: cada componente puntúa al menos 1.

**Cita actual de la lección:** NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4), cap. 8, «Trauma en cabeza», pp. 257–292.

```text
Topic: Escala de coma de Glasgow. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Cada componente puntúa al menos 1, así que el valor más bajo posible es 3 y el más alto 15."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 24. `af-2f82d7ccbf` · riesgo medio

**Dónde:** `m5-tcc-glasgow` (M5)

**Dice el curso:** Un «Glasgow 0» no existe, y verlo escrito en un informe indica que quien lo anotó no puntuó la escala.

**La misma cifra aparece además en 1 sitio(s) de la lección:**
- Un «Glasgow 0» no existe: verlo escrito indica que quien lo anotó no puntuó la escala.

**Cita actual de la lección:** NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed., 2020 (ISBN 978-1-284-10330-4), cap. 8, «Trauma en cabeza», pp. 257–292.

```text
Topic: Escala de coma de Glasgow. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Un «Glasgow 0» no existe, y verlo escrito en un informe indica que quien lo anotó no puntuó la escala."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

### 25. `af-6b34cee75a` · riesgo medio

**Dónde:** `m5-tcc-signos-sintomas` (M5)

**Dice el curso:** Un Glasgow de 13 que baja a 10 en quince minutos informa muchísimo más que un 10 aislado.

**Cita actual de la lección:** NAEMT. PHTLS: Soporte Vital de Trauma Prehospitalario, 9.ª ed.

```text
Topic: Signos y síntomas. (prehospital / EMS scope).
Question: what does the current guideline recommend, which body issued it, in what year or edition, and what primary sources support it?
Statement to check (Spanish, from our course): "Un Glasgow de 13 que baja a 10 en quince minutos informa muchísimo más que un 10 aislado."
Answer with: (1) the current recommendation, (2) whether the statement above is supported, superseded or contradicted, (3) the exact citations (journal/guideline, year, DOI or PMID).
```

