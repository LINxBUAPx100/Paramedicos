// FASE 6 — Farmacología Prehospitalaria Avanzada (Paramédico Avanzado / Cuidados Críticos)
// Basada en la "Guía Maestra de Farmacología Prehospitalaria Avanzada" (9 módulos).
// Contenido redactado a profundidad, con dosis verificadas contra guías y evidencia actual.
// Las dosis son de referencia educativa: SIEMPRE siga su protocolo local y dirección médica.

export const fase6 = {
  id: 'fase-6',
  numero: 6,
  titulo: 'Farmacología Prehospitalaria Avanzada',
  subtitulo: 'Paramédico Avanzado y Cuidados Críticos',
  color: '#db2777',
  icono: '💊',
  descripcion:
    'Antes de empujar un fármaco hay que entender a qué receptor llega, qué determinante hemodinámico mueve y qué evidencia lo respalda. Esta fase integra la farmacología de la vía aérea (SRI/SDA), el soporte vasopresor titulado, las arritmias complejas, la neurocrítica, el broncoespasmo casi-fatal, la analgesia mayor, el trauma con coagulopatía y los antídotos toxicológicos.',
  temas: [
    // ===================================================================
    // 6.1 — Bases Farmacológicas y Receptores
    // ===================================================================
    {
      id: 'bases-farmacologicas-receptores',
      numero: '6.1',
      titulo: 'Bases Farmacológicas y Receptores',
      icono: '🧪',
      duracion: '55 min',
      resumen:
        'Toda la farmacología de urgencias se reduce a una conversación entre una molécula y un receptor. Dominar agonismo, antagonismo, afinidad y eficacia —y el mapa de receptores adrenérgicos y colinérgicos— permite predecir el efecto de cada fármaco y reconocer los toxíndromes.',
      objetivos: [
        'Diferenciar afinidad, eficacia, potencia y los tipos de antagonismo.',
        'Mapear los receptores adrenérgicos (α1, α2, β1, β2, dopaminérgicos) con su efecto fisiológico.',
        'Describir los receptores colinérgicos muscarínicos y nicotínicos y la acción de la acetilcolina.',
        'Aplicar el comportamiento de cada vía de administración (IV, IO, IM, IN) al entorno prehospitalario.',
      ],
      secciones: [
        {
          titulo: 'Farmacodinamia: qué hace el fármaco al cuerpo',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La farmacodinamia estudia la relación entre la concentración del fármaco y su efecto. La mayoría de los fármacos de urgencia actúan uniéndose a un receptor (una proteína: canal iónico, receptor acoplado a proteína G, enzima o transportador). De esa unión nacen los conceptos que explican por qué dos fármacos del mismo grupo no son intercambiables.',
            },
            {
              tipo: 'lista',
              titulo: 'Los cuatro conceptos que debes dominar',
              items: [
                'Afinidad: con qué fuerza se une el fármaco al receptor. Alta afinidad = se une a concentraciones bajas.',
                'Eficacia: capacidad de producir el efecto máximo una vez unido. Un agonista pleno tiene eficacia alta; un antagonista, eficacia cero.',
                'Potencia: cuánta dosis se necesita para un efecto dado (relacionada con la CE50, concentración que da el 50% del efecto). Más potente = menos miligramos.',
                'Ventana terapéutica: distancia entre la dosis eficaz y la dosis tóxica. Estrecha (digoxina, fenitoína) obliga a titular con cuidado.',
              ],
            },
            {
              tipo: 'tabla',
              titulo: 'Cómo se comportan los ligandos',
              headers: ['Tipo de ligando', 'Qué hace', 'Ejemplo prehospitalario'],
              filas: [
                ['Agonista pleno', 'Se une y activa al máximo', 'Adrenalina, fentanilo, morfina'],
                ['Agonista parcial', 'Activa, pero con techo de efecto', 'Buprenorfina, nalbufina'],
                ['Antagonista competitivo', 'Bloquea el sitio; se vence con más agonista (reversible)', 'Naloxona, atropina, flumazenil'],
                ['Antagonista no competitivo', 'Bloquea de forma irreversible o en otro sitio; no se vence subiendo el agonista', 'Fenoxibenzamina, ketamina (sobre NMDA)'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Por qué importa en la calle',
              texto:
                'La naloxona es un antagonista competitivo: si la sobredosis es de un opioide muy ávido o muy concentrado (fentanilo), puede necesitar más dosis para "ganar" el receptor, y como su vida media es corta el paciente puede re-narcotizarse. Entender afinidad y competencia anticipa esa recaída.',
            },
            {
              tipo: 'imagen',
              src: '',
              alt: 'Curvas dosis-respuesta de agonista pleno, parcial y con antagonista',
              caption: 'Curvas dosis-respuesta: agonista pleno vs. parcial y el desplazamiento que produce un antagonista competitivo.',
              busqueda: 'dose response curve full partial agonist competitive antagonist pharmacology',
            },
          ],
        },
        {
          titulo: 'Receptores adrenérgicos',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El sistema simpático ("lucha o huida") actúa a través de noradrenalina y adrenalina sobre cinco familias de receptores. Conocer dónde está cada uno y qué hace al activarse es lo que permite elegir el vasopresor o el broncodilatador correcto.',
            },
            {
              tipo: 'diagrama',
              clave: 'receptores',
              titulo: 'Mapa de receptores adrenérgicos',
              descripcion: 'Localización y efecto de α1, α2, β1, β2 y dopaminérgicos.',
            },
            {
              tipo: 'tabla',
              titulo: 'Receptor → efecto → fármaco que lo aprovecha',
              headers: ['Receptor', 'Efecto principal', 'Fármaco representativo'],
              filas: [
                ['α1', 'Vasoconstricción (↑ RVS, ↑ PA), midriasis', 'Fenilefrina, noradrenalina'],
                ['α2', 'Presináptico: ↓ liberación de noradrenalina; central: sedación, ↓ simpático', 'Clonidina, dexmedetomidina'],
                ['β1', '↑ frecuencia, ↑ contractilidad, ↑ conducción AV', 'Dobutamina, adrenalina, dopamina'],
                ['β2', 'Broncodilatación, vasodilatación, relajación uterina', 'Salbutamol, terbutalina'],
                ['Dopaminérgico (D1)', 'Vasodilatación renal/mesentérica (dosis baja)', 'Dopamina a dosis baja'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Adrenalina: el efecto cambia con la dosis',
              texto:
                'A dosis baja predomina β (inotropía, broncodilatación, incluso ligera vasodilatación β2); a dosis alta domina α1 (vasoconstricción intensa). Por eso la misma molécula sirve para la anafilaxia (IM), el paro (IV en bolo) y el shock (infusión titulada): cambia el receptor que "gana" según la concentración.',
            },
          ],
        },
        {
          titulo: 'Receptores colinérgicos',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La acetilcolina (ACh) es el neurotransmisor del parasimpático y de la placa neuromuscular. Actúa sobre dos tipos de receptor: muscarínicos (órganos efectores del parasimpático) y nicotínicos (músculo esquelético y ganglios autónomos). El bloqueo o el exceso de ACh produce cuadros opuestos y reconocibles.',
            },
            {
              tipo: 'tabla',
              titulo: 'Muscarínicos vs. nicotínicos',
              headers: ['Receptor', 'Localización', 'Efecto de la ACh'],
              filas: [
                ['Muscarínicos (M)', 'Corazón, músculo liso, glándulas exocrinas', 'Bradicardia, broncoconstricción, secreciones, miosis, peristaltismo'],
                ['Nicotínicos musculares (Nm)', 'Placa neuromuscular', 'Contracción del músculo esquelético (fasciculaciones si hay exceso)'],
                ['Nicotínicos neuronales (Nn)', 'Ganglios autónomos, médula suprarrenal', 'Transmisión ganglionar; liberación de catecolaminas'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Conexión con toxicología (módulo 6.9)',
              texto:
                'El exceso muscarínico produce el toxíndrome colinérgico (DUMBELS / SLUDGE: diarrea, micción, miosis, bradicardia, broncorrea, lagrimeo, salivación), típico de organofosforados. La atropina —antagonista muscarínico— lo revierte. El bloqueo muscarínico da el cuadro anticolinérgico opuesto: "rojo como tomate, seco como hueso, caliente como brasa, ciego como topo, loco como cabra".',
            },
          ],
        },
        {
          titulo: 'Farmacocinética útil en la calle',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La farmacocinética es lo que el cuerpo hace al fármaco (absorción, distribución, metabolismo, excreción). En prehospitalario lo que más cambia el efecto es la vía y la perfusión: un paciente en shock absorbe mal por vía IM/SC y redistribuye distinto.',
            },
            {
              tipo: 'tabla',
              titulo: 'Vías de administración en urgencias',
              headers: ['Vía', 'Inicio', 'Cuándo usarla'],
              filas: [
                ['IV', 'Segundos', 'Estándar de oro si hay acceso'],
                ['IO (intraósea)', 'Casi igual que IV', 'Acceso fallido; dosis y fármacos equivalentes a IV'],
                ['IM', '5-20 min (variable con perfusión)', 'Adrenalina en anafilaxia, midazolam en crisis'],
                ['IN (intranasal)', '5-10 min', 'Naloxona, midazolam, fentanilo sin acceso'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'La intraósea NO es una vía de segunda',
              texto:
                'Por vía IO se pueden dar prácticamente todos los fármacos de reanimación a la misma dosis que IV, incluidos vasopresores, sedantes y bloqueadores neuromusculares. Lavar con bolo (flush) tras cada fármaco para empujarlo a la circulación central.',
            },
          ],
        },
        {
          titulo: 'Fuentes y evidencia',
          bloques: [
            {
              tipo: 'fuentes',
              items: [
                { nombre: 'Goodman & Gilman — Las Bases Farmacológicas de la Terapéutica', nota: 'Texto de referencia en farmacodinamia' },
                { nombre: 'StatPearls (NCBI) — Adrenergic Drugs', url: 'https://www.ncbi.nlm.nih.gov/books/NBK534230/', nota: 'Receptores α/β y aplicación clínica' },
                { nombre: 'StatPearls (NCBI) — Beta-1 Receptors', url: 'https://www.ncbi.nlm.nih.gov/books/NBK532904/' },
                { nombre: 'LITFL — Secciones de Farmacología y Toxicología', url: 'https://litfl.com/', nota: 'Receptores colinérgicos y toxíndromes' },
                { nombre: 'Tintinalli — Medicina de Urgencias', nota: 'Capítulos de farmacología básica' },
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Afinidad vs. eficacia', definicion: 'Afinidad = fuerza de unión; eficacia = capacidad de activar el receptor una vez unido.' },
        { termino: 'Antagonista competitivo', definicion: 'Bloquea reversiblemente el sitio del agonista; se vence aumentando el agonista (naloxona, atropina).' },
        { termino: 'α1', definicion: 'Vasoconstricción y aumento de la resistencia vascular sistémica.' },
        { termino: 'β1 vs. β2', definicion: 'β1 = corazón (FC y contractilidad); β2 = bronquios y vasos (dilatación).' },
        { termino: 'Toxíndrome colinérgico', definicion: 'Exceso muscarínico (DUMBELS): secreciones, miosis, bradicardia; se trata con atropina.' },
        { termino: 'Intraósea', definicion: 'Vía equivalente a IV para dosis y fármacos de reanimación; requiere flush.' },
      ],
      flashcards: [
        { frente: '¿Qué receptor media la vasoconstricción de los vasopresores?', reverso: 'α1 (alfa-1).' },
        { frente: '¿Por qué la naloxona puede necesitar redosificación?', reverso: 'Es antagonista competitivo de vida media corta; el opioide puede "reaparecer" (re-narcotización).' },
        { frente: '¿Qué efecto domina la adrenalina a dosis alta?', reverso: 'α1: vasoconstricción intensa.' },
        { frente: 'Regla mnemotécnica del exceso colinérgico', reverso: 'DUMBELS / SLUDGE: secreciones, miosis, bradicardia, broncorrea.' },
        { frente: '¿Se puede dar un bloqueador neuromuscular por vía IO?', reverso: 'Sí, a la misma dosis que IV, con flush posterior.' },
      ],
      quiz: [
        {
          pregunta: 'Un fármaco con alta afinidad pero eficacia cero es un:',
          opciones: ['Agonista pleno', 'Agonista parcial', 'Antagonista', 'Inductor enzimático'],
          correcta: 2,
          explicacion: 'Se une fuerte (afinidad) pero no produce efecto (eficacia cero): es la definición de antagonista.',
        },
        {
          pregunta: 'Para producir broncodilatación se busca activar el receptor:',
          opciones: ['α1', 'β1', 'β2', 'Muscarínico'],
          correcta: 2,
          explicacion: 'β2 relaja el músculo liso bronquial (salbutamol, terbutalina).',
        },
        {
          pregunta: 'El toxíndrome colinérgico por organofosforados se trata principalmente con:',
          opciones: ['Atropina', 'Adrenalina', 'Naloxona', 'Flumazenil'],
          correcta: 0,
          explicacion: 'La atropina antagoniza los receptores muscarínicos y seca las secreciones potencialmente mortales.',
        },
        {
          pregunta: 'Respecto a la vía intraósea en reanimación:',
          opciones: ['Solo sirve para líquidos', 'Requiere la mitad de la dosis', 'Es equivalente a la IV para fármacos de reanimación', 'No admite vasopresores'],
          correcta: 2,
          explicacion: 'La IO admite los mismos fármacos y dosis que la IV; se lava con bolo tras cada administración.',
        },
      ],
    },

    // ===================================================================
    // 6.2 — Farmacología de la Vía Aérea (SRI / SDA)
    // ===================================================================
    {
      id: 'farmacologia-via-aerea-sri-sda',
      numero: '6.2',
      titulo: 'Farmacología de la Vía Aérea (SRI / SDA)',
      icono: '🫁',
      duracion: '60 min',
      resumen:
        'La intubación de urgencia es un acto farmacológico tanto como técnico. Elegir el inductor según el perfil hemodinámico y el bloqueador neuromuscular según las contraindicaciones marca la diferencia entre una vía aérea segura y un colapso peri-intubación.',
      objetivos: [
        'Describir la secuencia rápida (SRI) y la secuencia demorada (SDA) y cuándo usar cada una.',
        'Elegir el agente inductor según el estado hemodinámico (shock vs. normotensión).',
        'Comparar bloqueadores neuromusculares despolarizantes y no despolarizantes y sus contraindicaciones.',
        'Justificar los fármacos de pretratamiento y sus indicaciones actuales.',
      ],
      secciones: [
        {
          titulo: 'La secuencia: SRI y SDA',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La Secuencia Rápida de Intubación (SRI) administra casi simultáneamente un inductor y un bloqueador neuromuscular para crear condiciones óptimas de intubación minimizando el riesgo de broncoaspiración. La Secuencia Demorada de Intubación (SDA) usa un sedante que preserva la respiración (típicamente ketamina) para poder preoxigenar al paciente agitado antes de paralizar.',
            },
            {
              tipo: 'diagrama',
              clave: 'sri',
              titulo: 'Línea de tiempo de la SRI',
              descripcion: 'Las fases desde la preoxigenación hasta la verificación con capnografía.',
            },
            {
              tipo: 'pasos',
              titulo: 'Las 7 P de la SRI',
              items: [
                'Preparación: material, monitor, capnografía, plan B y fármacos calculados.',
                'Preoxigenación: 3 min con O₂ al 100% o 8 respiraciones máximas; oxigenación apneica con cánula nasal.',
                'Pretratamiento (opcional): fentanilo para atenuar la respuesta simpática.',
                'Parálisis con inducción: inductor + bloqueador neuromuscular casi a la vez.',
                'Posicionamiento: alinear ejes (posición de olfateo / oreja-esternón).',
                'Paso del tubo y comprobación: laringoscopia, intubación, confirmar con capnografía.',
                'Postintubación: fijar tubo, sedoanalgesia, ventilación protectora, control de PA.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Optimizar antes de inducir',
              texto:
                'Resucitar antes de intubar: corregir hipotensión e hipoxemia primero. Un paciente con shock e hipoxemia tiene alto riesgo de paro peri-intubación. La SDA con ketamina permite preoxigenar al agitado que no tolera la mascarilla.',
            },
          ],
        },
        {
          titulo: 'Agentes inductores y sedantes',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El inductor ideal en urgencias es el que apaga la conciencia sin tirar la presión. Ketamina y etomidato son los preferidos en inestabilidad; propofol y midazolam (a dosis de inducción) tienden a hipotensar y se reservan para el normotenso.',
            },
            {
              tipo: 'tabla',
              titulo: 'Inductores: dosis y perfil',
              headers: ['Fármaco', 'Dosis IV (inducción)', 'Inicio', 'Perfil hemodinámico'],
              filas: [
                ['Ketamina', '1-2 mg/kg (0.5-1 si shock)', '45-60 s', 'Estabiliza/sube la PA (simpaticomimético); broncodilata'],
                ['Etomidato', '0.3 mg/kg', '15-45 s', 'Neutro; supresión suprarrenal transitoria'],
                ['Propofol', '1.5-2.5 mg/kg', '15-45 s', 'Hipotensor; útil en estatus o normotenso'],
                ['Midazolam', '0.1-0.3 mg/kg', '1-2 min', 'Hipotensor; inicio lento, a menudo infradosificado'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'dosis',
              titulo: 'Regla del shock: "sedante bajo, paralítico alto"',
              texto:
                'En shock, reduzca el inductor (p. ej. ketamina 0.5-1 mg/kg) para no profundizar la hipotensión, y AUMENTE el bloqueador neuromuscular (rocuronio 1.2-1.6 mg/kg) porque el brazo-circulación lento retrasa su llegada. Así se mantiene la primera-pasada sin colapsar al paciente.',
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Cuidado',
              texto:
                'Propofol y midazolam a dosis de inducción pueden precipitar hipotensión grave en el hipovolémico o séptico. El etomidato es hemodinámicamente neutro pero produce supresión suprarrenal: evite dosis repetidas, sobre todo en sepsis.',
            },
            {
              tipo: 'imagen',
              src: '',
              alt: 'Comparación de inductores para SRI',
              caption: 'Comparativa visual de inductores (ketamina, etomidato, propofol, midazolam) por inicio y efecto sobre la presión.',
              busqueda: 'RSI induction agents comparison ketamine etomidate propofol hemodynamics chart',
            },
          ],
        },
        {
          titulo: 'Bloqueadores neuromusculares (BNM)',
          bloques: [
            {
              tipo: 'p',
              texto:
                'Los BNM paralizan el músculo esquelético actuando en la placa neuromuscular. Los despolarizantes (succinilcolina) imitan a la acetilcolina; los no despolarizantes (rocuronio, vecuronio) la bloquean de forma competitiva.',
            },
            {
              tipo: 'tabla',
              titulo: 'Bloqueadores neuromusculares',
              headers: ['Fármaco', 'Tipo', 'Dosis SRI', 'Inicio / Duración'],
              filas: [
                ['Succinilcolina', 'Despolarizante', '1.5 mg/kg IV', '45-60 s / 6-10 min'],
                ['Rocuronio', 'No despolarizante', '1.2 mg/kg IV', '45-60 s / 45-70 min'],
                ['Vecuronio', 'No despolarizante', '0.1-0.2 mg/kg IV', '2-3 min / 30-60 min'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Contraindicaciones de la succinilcolina',
              texto:
                'Evítela si hay riesgo de hiperkalemia: quemaduras o aplastamiento >48-72 h, denervación (ictus/lesión medular subaguda, ELA, Guillain-Barré), distrofias musculares, inmovilización prolongada e hiperkalemia conocida. En estos casos puede subir el K⁺ 5-10 mEq/L y provocar paro. También desencadena hipertermia maligna.',
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Por qué muchos servicios prefieren rocuronio',
              texto:
                'El rocuronio a 1.2 mg/kg iguala el inicio de la succinilcolina sin riesgo de hiperkalemia ni hipertermia maligna; su única contraindicación es la alergia. Su pega es la duración larga (no respira solo si la intubación falla), reversible con sugammadex donde esté disponible.',
            },
          ],
        },
        {
          titulo: 'Fármacos de pretratamiento',
          bloques: [
            {
              tipo: 'lista',
              titulo: 'Qué se usa y por qué',
              items: [
                'Fentanilo 1-3 mcg/kg ~3 min antes: atenúa la descarga simpática de la laringoscopia (útil en disección aórtica, hemorragia subaracnoidea, cardiopatía isquémica).',
                'Lidocaína 1.5 mg/kg: histórica para atenuar la respuesta en TCE y vía aérea reactiva; la evidencia actual es débil y ya no se recomienda de rutina.',
                'Atropina 0.02 mg/kg en pediatría: prevención de bradicardia vagal por laringoscopia/succinilcolina; hoy es selectiva, no universal.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Menos es más',
              texto:
                'El único pretratamiento con respaldo razonable es el fentanilo en el paciente en quien una crisis hipertensiva transitoria sea peligrosa. La lidocaína y la atropina sistemáticas han caído en desuso.',
            },
          ],
        },
        {
          titulo: 'Fuentes y evidencia',
          bloques: [
            {
              tipo: 'fuentes',
              items: [
                { nombre: 'REBEL EM — The RSI Trial: Ketamina vs. Etomidato', url: 'https://rebelem.com/the-rsi-trial-ketamine-vs-etomidate-in-rapid-sequence-intubation/' },
                { nombre: 'REBEL EM — Dosing Sedatives Low and Paralytics High in Shock', url: 'https://rebelem.com/dosing-sedatives-low-and-paralytics-high-in-shock-patients-requiring-rsi/' },
                { nombre: 'EMCrit (IBCC) — Therapeutic paralysis', url: 'https://emcrit.org/ibcc/paralysis/' },
                { nombre: 'ALiEM — Succinylcholine and the Risk of Hyperkalemia', url: 'https://www.aliem.com/succinylcholine-risk-hyperkalemia/' },
                { nombre: 'The Walls — Manual de Manejo de la Vía Aérea de Urgencia', nota: 'Referencia de SRI/SDA' },
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'SRI', definicion: 'Inductor + bloqueador neuromuscular casi simultáneos para intubar minimizando aspiración.' },
        { termino: 'SDA', definicion: 'Sedación que preserva la respiración (ketamina) para preoxigenar antes de paralizar.' },
        { termino: 'Ketamina en shock', definicion: 'Inductor que preserva o sube la PA; reducir a 0.5-1 mg/kg en hipotensión.' },
        { termino: 'Succinilcolina e hiperkalemia', definicion: 'Contraindicada en quemados/aplastamiento >48-72 h, denervación, distrofias; riesgo de paro.' },
        { termino: 'Rocuronio 1.2 mg/kg', definicion: 'Alternativa segura sin hiperkalemia; inicio rápido, duración larga.' },
        { termino: 'Sedante bajo, paralítico alto', definicion: 'Estrategia de dosificación en shock para preservar la hemodinamia.' },
      ],
      flashcards: [
        { frente: 'Inductor de elección en el paciente en shock', reverso: 'Ketamina (o etomidato); reducir dosis de ketamina a 0.5-1 mg/kg.' },
        { frente: 'Dosis de rocuronio para SRI', reverso: '1.2 mg/kg IV (hasta 1.6 mg/kg en shock).' },
        { frente: 'Tres contextos donde la succinilcolina es peligrosa', reverso: 'Quemado/aplastamiento subagudo, denervación y distrofias (riesgo de hiperkalemia).' },
        { frente: '¿Qué pretratamiento conserva indicación clara?', reverso: 'Fentanilo, para atenuar la respuesta simpática a la laringoscopia.' },
        { frente: '¿Para qué sirve la SDA?', reverso: 'Sedar con ketamina y preoxigenar al paciente agitado que no tolera la mascarilla.' },
      ],
      quiz: [
        {
          pregunta: 'Paciente politraumatizado hipotenso que requiere intubación. La estrategia más segura es:',
          opciones: ['Propofol 2 mg/kg + succinilcolina', 'Ketamina a dosis reducida + rocuronio a dosis alta', 'Midazolam 0.3 mg/kg solo', 'Etomidato a doble dosis repetido'],
          correcta: 1,
          explicacion: '"Sedante bajo, paralítico alto": ketamina 0.5-1 mg/kg para no hipotensar y rocuronio 1.2-1.6 mg/kg para asegurar la primera pasada.',
        },
        {
          pregunta: '¿En cuál de estos pacientes evitarías la succinilcolina?',
          opciones: ['Apendicitis de 6 horas', 'Quemadura del 40% de hace 5 días', 'Fractura aislada de muñeca', 'Migraña'],
          correcta: 1,
          explicacion: 'A partir de las 48-72 h, las quemaduras y aplastamientos sobreexpresan receptores y la succinilcolina puede causar hiperkalemia letal.',
        },
        {
          pregunta: 'El fentanilo como pretratamiento de la SRI se usa para:',
          opciones: ['Paralizar', 'Atenuar la respuesta simpática a la laringoscopia', 'Revertir opioides', 'Broncodilatar'],
          correcta: 1,
          explicacion: 'Blunting de la descarga simpática, útil cuando una crisis hipertensiva transitoria sería peligrosa.',
        },
      ],
    },

    // ===================================================================
    // 6.3 — Soporte Hemodinámico y Vasopresores
    // ===================================================================
    {
      id: 'soporte-hemodinamico-vasopresores',
      numero: '6.3',
      titulo: 'Soporte Hemodinámico y Vasopresores',
      icono: '🩸',
      duracion: '55 min',
      resumen:
        'Más allá del bolo de adrenalina, el soporte avanzado exige titular infusiones para sostener la perfusión de los órganos diana. Elegir el presor correcto nace de entender qué determinante del shock está roto: precarga, contractilidad o tono vascular.',
      objetivos: [
        'Relacionar cada tipo de shock con el fármaco que corrige su determinante alterado.',
        'Dosificar noradrenalina, adrenalina, vasopresina y fenilefrina en infusión.',
        'Diferenciar vasopresores de inotrópicos y conocer sus riesgos.',
        'Preparar y dosificar vasopresores en dosis de empuje (push-dose).',
      ],
      secciones: [
        {
          titulo: 'Qué presor para qué shock',
          bloques: [
            {
              tipo: 'formula',
              texto: 'PAM ≈ Gasto cardíaco × Resistencia vascular sistémica',
              nota: 'Y Gasto cardíaco = Frecuencia × Volumen sistólico (precarga, contractilidad, poscarga).',
            },
            {
              tipo: 'tabla',
              titulo: 'El determinante roto manda el tratamiento',
              headers: ['Tipo de shock', 'Determinante alterado', 'Tratamiento dirigido'],
              filas: [
                ['Hipovolémico', '↓ precarga', 'Volumen / sangre; presor solo de puente'],
                ['Cardiogénico', '↓ contractilidad', 'Inotrópico (dobutamina) ± presor'],
                ['Distributivo (séptico)', '↓ RVS (tono)', 'Noradrenalina + volumen'],
                ['Distributivo (anafiláctico)', '↓ RVS + permeabilidad', 'Adrenalina IM/infusión'],
                ['Obstructivo', 'Obstrucción mecánica', 'Tratar la causa (descompresión, trombólisis) + presor puente'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'No "presores ciegos"',
              texto:
                'Un vasopresor sobre un tanque vacío sube la cifra pero no la perfusión. Optimice la precarga (volumen/sangre según el tipo de shock) antes o junto con el presor. En el cardiogénico, subir demasiado la poscarga con un α-agonista puede empeorar el gasto.',
            },
          ],
        },
        {
          titulo: 'Vasopresores en infusión continua',
          bloques: [
            {
              tipo: 'tabla',
              titulo: 'Infusiones de primera línea',
              headers: ['Fármaco', 'Dosis típica', 'Receptores', 'Indicación principal'],
              filas: [
                ['Noradrenalina', '0.05-0.5 mcg/kg/min', 'α1 >> β1', 'Shock séptico/distributivo (1.ª elección)'],
                ['Adrenalina', '0.01-0.5 mcg/kg/min', 'β y α (dosis-dependiente)', 'Anafilaxia, shock refractario, cardiogénico'],
                ['Vasopresina', '0.03-0.04 U/min (fija)', 'Receptores V1', 'Ahorrador de catecolaminas en sepsis'],
                ['Fenilefrina', '0.5-2 mcg/kg/min', 'α1 puro', 'Hipotensión con taquicardia; bolo peri-intubación'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'dosis',
              titulo: 'Noradrenalina: el caballo de batalla',
              texto:
                'Es el vasopresor de primera línea en el shock séptico y la mayoría de los distributivos. Si no basta, se añade adrenalina o se suma vasopresina a dosis fija para "ahorrar" catecolaminas. Idealmente por vía central, pero puede iniciarse por una buena vía periférica o IO mientras se consigue acceso central.',
            },
          ],
        },
        {
          titulo: 'Inotrópicos positivos',
          bloques: [
            {
              tipo: 'tabla',
              titulo: 'Inotrópicos',
              headers: ['Fármaco', 'Dosis', 'Efecto', 'Riesgo'],
              filas: [
                ['Dobutamina', '2-20 mcg/kg/min', 'β1: ↑ contractilidad y gasto', 'Puede BAJAR la PA (vasodilatación β2)'],
                ['Dopamina', '2-20 mcg/kg/min', 'Dosis baja β, alta α', 'Arritmogénica; más mortalidad que noradrenalina en shock'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'La dopamina perdió terreno',
              texto:
                'En el shock, la dopamina se asocia a más arritmias y mayor mortalidad que la noradrenalina, por lo que ha dejado de ser primera elección. Conserva un papel como infusión de puente en la bradicardia sintomática (5-20 mcg/kg/min) hasta el marcapasos. La dobutamina mejora el gasto pero puede hipotensar: vigílela.',
            },
          ],
        },
        {
          titulo: 'Vasopresores en dosis de empuje (push-dose)',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El push-dose pressor es un bolo pequeño y titulable de vasopresor para rescatar la hipotensión transitoria (peri-intubación, post-RCP, puente mientras arranca la infusión). El más usado es la fenilefrina; la adrenalina diluida a 10 mcg/mL es la otra opción.',
            },
            {
              tipo: 'pasos',
              titulo: 'Preparar adrenalina push-dose (10 mcg/mL)',
              items: [
                'Tome 1 mL de adrenalina 100 mcg/mL (la jeringa precargada "de paro", 1:10 000).',
                'Mézclela en 9 mL de solución salina en una jeringa de 10 mL.',
                'Resultado: 10 mL a 10 mcg/mL.',
                'Dosis: 0.5-2 mL (5-20 mcg) IV cada 2-5 min, titulando a la respuesta. Inicio ~1 min, duración 5-10 min.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'dosis',
              titulo: 'Fenilefrina push-dose',
              texto:
                'Diluya para obtener 100 mcg/mL y administre 50-200 mcg (0.5-2 mL) cada 2-5 min. α1 puro: ideal cuando hay hipotensión CON taquicardia y no quiere acelerar más al corazón.',
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'El error de dilución mata',
              texto:
                'Confundir concentraciones de adrenalina (1 mg/mL "IM" vs. 100 mcg/mL "de paro" vs. 10 mcg/mL "push-dose") ha causado sobredosis graves. Rotule la jeringa, calcule en voz alta y confirme con un segundo operador.',
            },
            {
              tipo: 'imagen',
              src: '',
              alt: 'Preparación de adrenalina push-dose 10 mcg/mL',
              caption: 'Esquema de preparación de la adrenalina en dosis de empuje (10 mcg/mL) y la matriz de actividad por receptor de cada vasopresor.',
              busqueda: 'push dose epinephrine preparation 10 mcg/ml vasopressor receptor activity chart',
            },
          ],
        },
        {
          titulo: 'Fuentes y evidencia',
          bloques: [
            {
              tipo: 'fuentes',
              items: [
                { nombre: 'EMCrit — Push-Dose Pressors', url: 'https://emcrit.org/emcrit/bolus-dose-pressors/' },
                { nombre: 'EMCrit — Push-Dose Pressors Update', url: 'https://emcrit.org/emcrit/push-dose-pressor-update/' },
                { nombre: 'LITFL — Inotropes and Vasopressors', url: 'https://litfl.com/', nota: 'Resumen de receptores y dosis' },
                { nombre: 'AHA — Soporte Vital Cardiovascular Avanzado (ACLS)', url: 'https://cpr.heart.org/', nota: 'Infusiones en shock y bradicardia' },
                { nombre: 'Surviving Sepsis Campaign', nota: 'Noradrenalina de primera línea y vasopresina ahorradora' },
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Noradrenalina', definicion: 'Vasopresor de primera línea en shock séptico/distributivo (α1 >> β1).' },
        { termino: 'Vasopresina', definicion: 'Dosis fija 0.03-0.04 U/min, ahorradora de catecolaminas.' },
        { termino: 'Dobutamina', definicion: 'Inotrópico β1 que mejora el gasto pero puede bajar la PA.' },
        { termino: 'Push-dose', definicion: 'Bolo titulable: adrenalina 5-20 mcg o fenilefrina 50-200 mcg cada 2-5 min.' },
        { termino: 'Dopamina', definicion: 'Más arritmias/mortalidad que noradrenalina; útil como puente en bradicardia.' },
      ],
      flashcards: [
        { frente: 'Vasopresor de primera línea en shock séptico', reverso: 'Noradrenalina (0.05-0.5 mcg/kg/min).' },
        { frente: 'Dosis fija de vasopresina en sepsis', reverso: '0.03-0.04 unidades/min.' },
        { frente: 'Adrenalina push-dose: concentración y dosis', reverso: '10 mcg/mL; 5-20 mcg (0.5-2 mL) cada 2-5 min.' },
        { frente: '¿Por qué la dobutamina puede hipotensar?', reverso: 'Estimula β2 vascular (vasodilatación) además de β1.' },
        { frente: 'Inotrópico/presor de puente en bradicardia sintomática', reverso: 'Infusión de dopamina (o adrenalina) hasta el marcapasos.' },
      ],
      quiz: [
        {
          pregunta: 'Shock séptico que no responde a 30 mL/kg de cristaloide. El siguiente paso es:',
          opciones: ['Dopamina en infusión', 'Noradrenalina en infusión', 'Fenilefrina en bolo único', 'Más volumen indefinidamente'],
          correcta: 1,
          explicacion: 'La noradrenalina es el vasopresor de primera línea tras la reanimación con líquidos en el shock séptico.',
        },
        {
          pregunta: 'Para preparar adrenalina push-dose a 10 mcg/mL se mezcla:',
          opciones: ['1 mL de 1 mg/mL en 9 mL', '1 mL de 100 mcg/mL en 9 mL de salino', '1 ampolla en 1 L', '10 mL de 1 mg/mL puros'],
          correcta: 1,
          explicacion: '1 mL de la jeringa de paro (100 mcg/mL) en 9 mL de salino da 10 mL a 10 mcg/mL.',
        },
        {
          pregunta: 'Ventaja de la fenilefrina sobre la adrenalina en push-dose:',
          opciones: ['Broncodilata más', 'Es α1 puro: no añade taquicardia', 'Dura horas', 'Aumenta la contractilidad'],
          correcta: 1,
          explicacion: 'Al ser α1 puro, sube la PA sin acelerar el corazón: útil si ya hay taquicardia.',
        },
      ],
    },

    // ===================================================================
    // 6.4 — Farmacología Cardiovascular Avanzada
    // ===================================================================
    {
      id: 'farmacologia-cardiovascular-avanzada',
      numero: '6.4',
      titulo: 'Farmacología Cardiovascular Avanzada',
      icono: '❤️',
      duracion: '60 min',
      resumen:
        'Intervención farmacológica precisa en arritmias complejas y crisis hipertensivas. Cada fármaco tiene una indicación electrofisiológica concreta: equivocar el agente en una taquicardia de complejo ancho o en una disección aórtica puede ser letal.',
      objetivos: [
        'Seleccionar el antiarrítmico correcto según el algoritmo de taquicardia.',
        'Manejar la bradicardia sintomática con atropina y agentes de puente al marcapasos.',
        'Dosificar los antihipertensivos parenterales de urgencia según la patología.',
      ],
      secciones: [
        {
          titulo: 'Taquiarritmias',
          bloques: [
            {
              tipo: 'tabla',
              titulo: 'Antiarrítmicos en taquicardia con pulso',
              headers: ['Fármaco', 'Dosis', 'Indicación'],
              filas: [
                ['Adenosina', '6 mg IV rápido, luego 12 mg, luego 12 mg', 'TSV regular de complejo estrecho'],
                ['Amiodarona', '150 mg en 10 min (estable); 300 mg IV/IO en paro', 'TV con pulso, FV/TV sin pulso'],
                ['Sulfato de magnesio', '1-2 g IV', 'Torsades de Pointes (TV polimorfa con QT largo)'],
                ['Diltiazem', '0.25 mg/kg IV (~15-20 mg) en 2 min', 'Control de frecuencia en FA/flutter'],
                ['Verapamilo', '2.5-5 mg IV', 'Alternativa para control de frecuencia'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'dosis',
              titulo: 'Adenosina: técnica antes que dosis',
              texto:
                'Vida media de segundos: adminístrela por la vía más proximal con bolo rápido seguido de flush de 20 mL y elevación del brazo. Avise al paciente de la sensación transitoria de "pausa". Útil además como maniobra diagnóstica en la taquicardia regular de complejo estrecho.',
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'No bloquees el nodo en la FA preexcitada',
              texto:
                'En una taquicardia irregular de complejo ANCHO (sospecha de FA con WPW), los bloqueadores del nodo AV (adenosina, diltiazem, verapamilo, digoxina, betabloqueadores) pueden acelerar la conducción por la vía accesoria y degenerar en FV. Trate con cardioversión o amiodarona/procainamida. Inestable = cardioversión sincronizada.',
            },
            {
              tipo: 'imagen',
              src: '',
              alt: 'Algoritmo de taquicardia con pulso de la AHA',
              caption: 'Algoritmo de taquicardia con pulso (AHA/ACLS): estable vs. inestable, complejo estrecho vs. ancho.',
              busqueda: 'ACLS adult tachycardia with pulse algorithm 2020',
            },
          ],
        },
        {
          titulo: 'Bradiarritmias',
          bloques: [
            {
              tipo: 'pasos',
              titulo: 'Bradicardia sintomática: escalera',
              items: [
                'Atropina 0.5 mg IV cada 3-5 min, máximo 3 mg.',
                'Si no responde: marcapasos transcutáneo Y/O infusión cronotrópica.',
                'Adrenalina en infusión 2-10 mcg/min, o dopamina 5-20 mcg/kg/min como puente.',
                'Buscar y tratar la causa (hiperkalemia, isquemia, fármacos, hipoxia).',
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Cuándo la atropina no sirve',
              texto:
                'La atropina actúa sobre el tono vagal; es poco útil en bloqueos AV de alto grado (Mobitz II o completo) con escape ancho, donde el problema está por debajo del nodo. Ahí, no se demore: marcapasos transcutáneo o infusión de catecolaminas. En el trasplantado cardíaco (denervado) tampoco funciona.',
            },
            {
              tipo: 'imagen',
              src: '',
              alt: 'Algoritmo de bradicardia de la AHA',
              caption: 'Algoritmo de bradicardia con pulso (AHA/ACLS).',
              busqueda: 'ACLS adult bradycardia algorithm 2020 atropine pacing',
            },
          ],
        },
        {
          titulo: 'Crisis hipertensivas',
          bloques: [
            {
              tipo: 'tabla',
              titulo: 'Antihipertensivos parenterales',
              headers: ['Fármaco', 'Dosis', 'Mejor escenario'],
              filas: [
                ['Labetalol', '10-20 mg IV; repetir/doblar c/10 min', 'Disección, ictus, eclampsia (α/β)'],
                ['Esmolol', 'Carga 500 mcg/kg/min 1 min; infusión 50 mcg/kg/min', 'Disección aórtica (β titulable y breve)'],
                ['Nitroglicerina', 'Infusión 5-10 mcg/min, titular al alza', 'Edema agudo de pulmón, síndrome coronario'],
                ['Nicardipino', 'Infusión 5 mg/h, titular', 'Urgencia neurológica (calcioantagonista)'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Disección aórtica: frecuencia antes que presión',
              texto:
                'Primero baje la frecuencia con un betabloqueador (esmolol/labetalol) para reducir la fuerza de eyección (dP/dt), y solo después añada un vasodilatador. Metas habituales: FC < 60 y PAS 100-120 mmHg. Dar un vasodilatador SOLO provoca taquicardia refleja que aumenta el estrés de pared y propaga la disección.',
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'No toda hipertensión es emergencia',
              texto:
                'Sin daño agudo de órgano blanco (cerebro, corazón, riñón, retina) es una urgencia hipertensiva, no una emergencia: no se baja con fármacos IV rápidos. Bajar la PA demasiado deprisa puede causar isquemia cerebral o miocárdica.',
            },
          ],
        },
        {
          titulo: 'Fuentes y evidencia',
          bloques: [
            {
              tipo: 'fuentes',
              items: [
                { nombre: 'AHA — Actualización 2018 sobre antiarrítmicos en ACLS (ACC)', url: 'https://www.acc.org/Latest-in-Cardiology/ten-points-to-remember/2018/11/20/11/37/2018-American-Heart-Association-Focused-Update-on-ACLS' },
                { nombre: 'ACLS — Algoritmo de taquicardia', url: 'https://acls.net/acls-tachycardia-algorithm' },
                { nombre: 'EMCrit (IBCC) — Hypertensive emergencies', url: 'https://emcrit.org/ibcc/htn/' },
                { nombre: 'EMCrit — Aortic dissection', url: 'https://emcrit.org/emcrit/aortic-dissection/' },
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Adenosina 6-12-12', definicion: 'Bolo rápido con flush para TSV regular de complejo estrecho.' },
        { termino: 'Magnesio', definicion: 'Tratamiento de la Torsades de Pointes (1-2 g IV).' },
        { termino: 'FA preexcitada', definicion: 'No usar bloqueadores del nodo AV; riesgo de FV. Cardioversión o procainamida/amiodarona.' },
        { termino: 'Atropina', definicion: '0.5 mg IV c/3-5 min (máx 3 mg); poco útil en bloqueo infranodal.' },
        { termino: 'Disección: dP/dt', definicion: 'Betabloqueo primero (FC<60, PAS 100-120) y luego vasodilatador.' },
      ],
      flashcards: [
        { frente: 'Secuencia de dosis de adenosina', reverso: '6 mg, luego 12 mg, luego 12 mg, en bolo rápido con flush.' },
        { frente: 'Fármaco para Torsades de Pointes', reverso: 'Sulfato de magnesio 1-2 g IV.' },
        { frente: 'Dosis de atropina en bradicardia', reverso: '0.5 mg IV cada 3-5 min, máximo 3 mg.' },
        { frente: '¿Qué evitar en FA con WPW (complejo ancho irregular)?', reverso: 'Bloqueadores del nodo AV (adenosina, diltiazem, verapamilo, betabloqueadores, digoxina).' },
        { frente: 'Primer objetivo en disección aórtica', reverso: 'Bajar la frecuencia con betabloqueador (esmolol/labetalol) antes que la presión.' },
      ],
      quiz: [
        {
          pregunta: 'TV monomorfa estable con pulso. Antiarrítmico razonable:',
          opciones: ['Adenosina 6 mg', 'Amiodarona 150 mg en 10 min', 'Diltiazem 20 mg', 'Atropina 1 mg'],
          correcta: 1,
          explicacion: 'La amiodarona 150 mg IV en 10 minutos es apropiada para la TV con pulso estable.',
        },
        {
          pregunta: 'Bloqueo AV completo con escape ancho e hipotensión. La atropina probablemente:',
          opciones: ['Será muy eficaz', 'Será poco útil; preparar marcapasos/infusión', 'Está contraindicada siempre', 'Resolverá el bloqueo de rama'],
          correcta: 1,
          explicacion: 'En el bloqueo infranodal la atropina rara vez funciona; el tratamiento es marcapasos transcutáneo o catecolaminas.',
        },
        {
          pregunta: 'En la disección aórtica con hipertensión, el primer fármaco debe:',
          opciones: ['Ser un vasodilatador puro como hidralazina', 'Bajar la frecuencia (betabloqueador)', 'Ser un bolo de líquidos', 'Aumentar la contractilidad'],
          correcta: 1,
          explicacion: 'Se baja primero la FC y la dP/dt con betabloqueo; un vasodilatador solo causa taquicardia refleja que propaga la disección.',
        },
      ],
    },

    // ===================================================================
    // 6.5 — Farmacología Neurocrítica y Control de PIC
    // ===================================================================
    {
      id: 'farmacologia-neurocritica-pic',
      numero: '6.5',
      titulo: 'Farmacología Neurocrítica y Control de PIC',
      icono: '🧠',
      duracion: '55 min',
      resumen:
        'Protección cerebral en dos escenarios que no perdonan: el estatus epiléptico (cada minuto de convulsión daña neuronas) y la hipertensión intracraneal con herniación. La farmacología prehospitalaria puede ganar tiempo vital hacia el quirófano o la UCI.',
      objetivos: [
        'Aplicar el escalón terapéutico del estatus epiléptico (benzodiacepina y segunda línea).',
        'Dosificar correctamente las benzodiacepinas, incluida la vía IM.',
        'Reconocer la tríada de Cushing y usar la terapia osmolar ante la herniación.',
      ],
      secciones: [
        {
          titulo: 'Estatus epiléptico',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El estatus epiléptico es una convulsión >5 min o convulsiones repetidas sin recuperar la conciencia. Es una emergencia tiempo-dependiente: cuanto más dura, más resistente se vuelve y más daño neuronal produce. El tratamiento es escalonado y la primera línea son las benzodiacepinas a dosis adecuada (el error más común es infradosificar).',
            },
            {
              tipo: 'pasos',
              titulo: 'Escalera del estatus convulsivo',
              items: [
                'Línea 1 — Benzodiacepina ya: midazolam IM/IN, lorazepam IV o diazepam IV.',
                'Repetir la benzodiacepina una vez si persiste a los 5 min.',
                'Línea 2 — Antiepiléptico IV: levetiracetam, fosfenitoína/fenitoína o valproato.',
                'Línea 3 — Estatus refractario: inducción anestésica (propofol/midazolam) e intubación.',
              ],
            },
            {
              tipo: 'tabla',
              titulo: 'Benzodiacepinas de primera línea',
              headers: ['Fármaco', 'Dosis adulto', 'Vía'],
              filas: [
                ['Midazolam', '10 mg (≥40 kg); 0.2 mg/kg', 'IM (preferida sin acceso), IN'],
                ['Lorazepam', '0.1 mg/kg (máx 4 mg), repetible', 'IV'],
                ['Diazepam', '0.15-0.2 mg/kg (máx 10 mg)', 'IV (o rectal en niños)'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'dosis',
              titulo: 'Segunda línea (ensayo ESETT): son equivalentes',
              texto:
                'Levetiracetam 60 mg/kg (máx 4500 mg), fosfenitoína 20 mg PE/kg (máx 1500 mg PE) y valproato 40 mg/kg (máx 3000 mg) lograron cese de la crisis en ~45-50% de los casos, sin diferencias significativas entre ellos. Elija según disponibilidad y comorbilidad.',
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Sin vía, midazolam IM (estudio RAMPART)',
              texto:
                'El midazolam 10 mg IM detiene la convulsión al menos tan rápido como el lorazepam IV cuando aún no hay acceso vascular, porque ganar la vía retrasa el tratamiento. La absorción IM es fiable y la vía IN es una alternativa válida.',
            },
          ],
        },
        {
          titulo: 'Hipertensión intracraneal y herniación',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La doctrina de Monro-Kellie dice que el cráneo es una caja rígida con tres componentes (encéfalo, sangre y LCR): si uno crece (hematoma, edema), la presión intracraneal (PIC) sube. Lo que importa para la neurona es la presión de perfusión cerebral.',
            },
            {
              tipo: 'formula',
              texto: 'PPC = PAM − PIC',
              nota: 'Presión de perfusión cerebral = presión arterial media − presión intracraneal. Si sube la PIC o cae la PAM, el cerebro se isquemia.',
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Tríada de Cushing = herniación inminente',
              texto:
                'Hipertensión (PA sistólica alta con presión de pulso amplia) + bradicardia + respiración irregular. Es un signo TARDÍO de hipertensión intracraneal grave con compromiso del tallo. Sumado a midriasis/anisocoria y deterioro del Glasgow, exige actuar de inmediato.',
            },
            {
              tipo: 'tabla',
              titulo: 'Terapia osmolar ante la herniación',
              headers: ['Agente', 'Dosis', 'Notas'],
              filas: [
                ['Solución salina hipertónica 3%', '~250 mL (o 3-5 mL/kg) IV', 'No baja la PA; preferida si hay hipotensión/shock'],
                ['Manitol', '0.5-1 g/kg IV', 'Diurético osmótico; puede hipotensar y dañar el riñón'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Medidas que acompañan a los osmóticos',
              texto:
                'Cabecera a 30°, cabeza neutra, evitar hipoxia e hipotensión (ambas duplican la mortalidad en TCE), normocapnia (EtCO₂ 35-40; la hiperventilación a EtCO₂ 30-35 se reserva como puente ante signos de herniación), analgesia/sedación y tratar la fiebre y las convulsiones.',
            },
            {
              tipo: 'imagen',
              src: '',
              alt: 'Tríada de Cushing y herniación cerebral',
              caption: 'Tríada de Cushing (HTA, bradicardia, respiración irregular) y mecanismos de herniación cerebral.',
              busqueda: 'Cushing triad intracranial pressure brain herniation diagram',
            },
          ],
        },
        {
          titulo: 'Fuentes y evidencia',
          bloques: [
            {
              tipo: 'fuentes',
              items: [
                { nombre: 'REBEL EM — The ESETT Trial (segunda línea en estatus)', url: 'https://rebelem.com/the-esett-trial-2nd-line-medications-in-status-epilepticus/' },
                { nombre: 'ESETT — Lancet (texto del ensayo)', url: 'https://www.thelancet.com/article/S0140-6736(20)30611-5/fulltext' },
                { nombre: 'EMCrit (IBCC) — Status epilepticus', url: 'https://emcrit.org/ibcc/sz/' },
                { nombre: 'EMCrit (IBCC) — Elevated intracranial pressure', url: 'https://emcrit.org/ibcc/icp/' },
                { nombre: 'Brain Trauma Foundation — Guías de TCE grave', url: 'https://braintrauma.org/', nota: 'Metas de PPC, osmoterapia' },
                { nombre: 'Neurocritical Care Society — Guidelines for Status Epilepticus', url: 'https://www.neurocriticalcare.org/' },
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Estatus epiléptico', definicion: 'Convulsión >5 min; tratar ya con benzodiacepina a dosis plena (no infradosificar).' },
        { termino: 'Midazolam IM 10 mg', definicion: 'Primera elección sin acceso vascular (RAMPART).' },
        { termino: 'Segunda línea (ESETT)', definicion: 'Levetiracetam, fosfenitoína y valproato son equivalentes en eficacia.' },
        { termino: 'Tríada de Cushing', definicion: 'HTA + bradicardia + respiración irregular: herniación inminente.' },
        { termino: 'PPC = PAM − PIC', definicion: 'Evitar hipotensión e hipoxia, que disparan la mortalidad en TCE.' },
        { termino: 'Salino hipertónico 3%', definicion: 'Osmótico que no baja la PA; preferible al manitol si hay hipotensión.' },
      ],
      flashcards: [
        { frente: 'Primera línea sin vía IV en una convulsión activa', reverso: 'Midazolam 10 mg IM (o intranasal).' },
        { frente: 'Dosis de levetiracetam como segunda línea', reverso: '60 mg/kg IV (máx 4500 mg).' },
        { frente: 'Define la tríada de Cushing', reverso: 'Hipertensión, bradicardia y respiración irregular.' },
        { frente: 'Fórmula de la presión de perfusión cerebral', reverso: 'PPC = PAM − PIC.' },
        { frente: 'Osmótico preferido si el paciente está hipotenso', reverso: 'Solución salina hipertónica 3% (el manitol puede hipotensar).' },
      ],
      quiz: [
        {
          pregunta: 'Convulsión tónico-clónica de 8 minutos, sin acceso IV. Lo correcto es:',
          opciones: ['Esperar a canalizar para dar lorazepam', 'Midazolam 10 mg IM ahora', 'Fenitoína IM', 'Solo oxígeno y observar'],
          correcta: 1,
          explicacion: 'Sin vía, el midazolam IM es tan eficaz como el lorazepam IV y evita el retraso de canalizar (RAMPART).',
        },
        {
          pregunta: 'Paciente con TCE, PA 200/90, FC 44 y respiración irregular. Esto sugiere:',
          opciones: ['Shock hipovolémico', 'Tríada de Cushing por hipertensión intracraneal', 'Reacción vagal benigna', 'Intoxicación por opioides'],
          correcta: 1,
          explicacion: 'HTA + bradicardia + respiración irregular es la tríada de Cushing: herniación inminente.',
        },
        {
          pregunta: 'Ante signos de herniación con hipotensión asociada, el osmótico preferible es:',
          opciones: ['Manitol 1 g/kg', 'Solución salina hipertónica 3%', 'Furosemida', 'Dextrosa al 5%'],
          correcta: 1,
          explicacion: 'El salino hipertónico reduce la PIC sin bajar la PA; el manitol, por su diuresis, puede agravar la hipotensión.',
        },
      ],
    },

    // ===================================================================
    // 6.6 — Farmacología Respiratoria Avanzada
    // ===================================================================
    {
      id: 'farmacologia-respiratoria-avanzada',
      numero: '6.6',
      titulo: 'Farmacología Respiratoria Avanzada',
      icono: '🌬️',
      duracion: '45 min',
      resumen:
        'Manejo del broncoespasmo casi-fatal y del edema de la vía aérea superior. Cuando el salbutamol ya no basta, hay un arsenal de segunda línea (magnesio, adrenalina, terbutalina) que puede evitar la intubación, y en el crup la adrenalina nebulizada gana tiempo.',
      objetivos: [
        'Escalar el tratamiento del asma/EPOC refractario más allá del broncodilatador inhalado.',
        'Dosificar magnesio IV, terbutalina y adrenalina IM en el asma casi-fatal.',
        'Tratar el crup con adrenalina nebulizada y dexametasona.',
      ],
      secciones: [
        {
          titulo: 'Asma y EPOC casi-fatal',
          bloques: [
            {
              tipo: 'p',
              texto:
                'En la crisis grave, la base son los β2-agonistas inhalados (salbutamol) + anticolinérgico (ipratropio) + corticoide sistémico temprano. Si el paciente se deteriora pese a ello (asma casi-fatal: silencio auscultatorio, agotamiento, alteración del estado mental), se escala a la segunda línea.',
            },
            {
              tipo: 'pasos',
              titulo: 'Escalón del broncoespasmo grave',
              items: [
                'Salbutamol continuo + ipratropio nebulizados, O₂ y corticoide sistémico (metilprednisolona/hidrocortisona o dexametasona).',
                'Sulfato de magnesio IV 2 g (40 mg/kg en niños, máx 2 g) en 15-20 min.',
                'Adrenalina IM 0.3-0.5 mg (0.01 mg/kg en niños) si hay broncoespasmo casi-fatal o sospecha de anafilaxia.',
                'Terbutalina SC/IV o adrenalina en infusión en el refractario; considerar VNI; intubar solo si fracasa todo (alto riesgo).',
              ],
            },
            {
              tipo: 'tabla',
              titulo: 'Segunda línea en el asma grave',
              headers: ['Fármaco', 'Dosis', 'Mecanismo'],
              filas: [
                ['Sulfato de magnesio', '2 g IV en 15-20 min', 'Relaja el músculo liso bronquial'],
                ['Adrenalina', '0.3-0.5 mg IM (1 mg/mL)', 'β2 broncodilatador + α (reduce edema)'],
                ['Terbutalina', '0.25 mg SC; o 10 mcg/kg IV + 0.4 mcg/kg/min', 'β2 sistémico'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Intubar al asmático es de altísimo riesgo',
              texto:
                'La obstrucción espiratoria atrapa aire (auto-PEEP) y puede causar hipotensión y barotrauma al ventilar. Si es inevitable: ketamina como inductor (broncodilata), frecuencia baja, tiempo espiratorio largo (I:E 1:4-1:5), tolerar hipercapnia permisiva y vigilar el neumotórax. Ante hipotensión súbita tras intubar: desconectar y dejar exhalar.',
            },
          ],
        },
        {
          titulo: 'Crup y edema de la vía aérea superior',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El crup (laringotraqueítis) produce estridor inspiratorio y tos perruna por edema subglótico. La dexametasona es la base en todos los grados; la adrenalina nebulizada se reserva para el estridor en reposo (moderado-grave) por su efecto α vasoconstrictor que reduce el edema mucoso.',
            },
            {
              tipo: 'tabla',
              titulo: 'Fármacos en el crup',
              headers: ['Fármaco', 'Dosis', 'Notas'],
              filas: [
                ['Dexametasona', '0.6 mg/kg VO/IM/IV (máx 12 mg)', 'Base en todos los grados; igual de eficaz por las 3 vías'],
                ['Adrenalina racémica 2.25%', '0.5 mL en 2.5-3 mL de salino, nebulizada', 'Estridor en reposo'],
                ['Adrenalina L (1 mg/mL)', '5 mL nebulizados (alternativa a la racémica)', 'Misma eficacia si no hay racémica'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Vigila el rebote tras la adrenalina nebulizada',
              texto:
                'El efecto de la adrenalina nebulizada dura 1-2 h y puede haber rebote del edema al pasar; por eso siempre se acompaña de dexametasona y se observa al niño. La dexametasona tarda unas horas en actuar pero su efecto es duradero.',
            },
            {
              tipo: 'imagen',
              src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Croup_steeple_sign.jpg?width=720',
              alt: 'Signo del campanario en el crup',
              caption: 'Radiografía de cuello: estrechamiento subglótico ("signo del campanario") típico del crup.',
              fuente: 'Wikimedia Commons',
              fuenteUrl: 'https://commons.wikimedia.org/wiki/File:Croup_steeple_sign.jpg',
              busqueda: 'croup steeple sign subglottic narrowing radiograph pediatric',
            },
          ],
        },
        {
          titulo: 'Fuentes y evidencia',
          bloques: [
            {
              tipo: 'fuentes',
              items: [
                { nombre: 'GINA — Global Initiative for Asthma', url: 'https://ginasthma.org/', nota: 'Manejo escalonado del asma' },
                { nombre: 'Children s Colorado — Vía clínica del crup', url: 'https://www.childrenscolorado.org/globalassets/healthcare-professionals/clinical-pathways/croup.pdf' },
                { nombre: 'SAEM — Croup (currículo de urgencias pediátricas)', url: 'https://www.saem.org/about-saem/academies-interest-groups-affiliates2/cdem/for-students/online-education/peds-em-curriculum/respiratory/croup' },
                { nombre: 'Pediatric Advanced Life Support (PALS)', nota: 'Dosis pediátricas de referencia' },
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Magnesio IV en asma', definicion: '2 g IV en 15-20 min (40 mg/kg en niños) como broncodilatador de segunda línea.' },
        { termino: 'Adrenalina IM en asma casi-fatal', definicion: '0.3-0.5 mg (1 mg/mL); β2 broncodilatador + α antiedema.' },
        { termino: 'Hipercapnia permisiva', definicion: 'Ventilar al asmático con FR baja y espiración larga, tolerando CO₂ alto, para evitar auto-PEEP.' },
        { termino: 'Dexametasona en crup', definicion: '0.6 mg/kg VO/IM/IV; base en todos los grados.' },
        { termino: 'Adrenalina nebulizada', definicion: 'Para estridor en reposo; vigilar rebote, siempre con corticoide.' },
      ],
      flashcards: [
        { frente: 'Dosis de sulfato de magnesio IV en asma grave', reverso: '2 g IV en 15-20 min (40 mg/kg en niños, máx 2 g).' },
        { frente: 'Inductor de elección si hay que intubar a un asmático', reverso: 'Ketamina (broncodilata).' },
        { frente: 'Dosis de dexametasona en crup', reverso: '0.6 mg/kg VO/IM/IV (máx 12 mg).' },
        { frente: '¿Cuándo se usa adrenalina nebulizada en el crup?', reverso: 'Estridor en reposo (moderado-grave); vigilar rebote.' },
        { frente: 'Riesgo principal al ventilar al asmático', reverso: 'Atrapamiento aéreo (auto-PEEP) con hipotensión y barotrauma.' },
      ],
      quiz: [
        {
          pregunta: 'Asma grave que no mejora con salbutamol/ipratropio continuos. Siguiente fármaco IV:',
          opciones: ['Furosemida', 'Sulfato de magnesio 2 g', 'Adenosina', 'Naloxona'],
          correcta: 1,
          explicacion: 'El magnesio IV 2 g relaja el músculo liso bronquial y es la segunda línea en el asma grave.',
        },
        {
          pregunta: 'Niño con crup y estridor en reposo. El tratamiento incluye:',
          opciones: ['Solo antibióticos', 'Dexametasona + adrenalina nebulizada', 'Salbutamol exclusivamente', 'Atropina nebulizada'],
          correcta: 1,
          explicacion: 'Dexametasona en todos los grados y adrenalina nebulizada para el estridor en reposo, con observación por rebote.',
        },
        {
          pregunta: 'Tras intubar a un asmático aparece hipotensión súbita. La maniobra inmediata es:',
          opciones: ['Subir la frecuencia del ventilador', 'Desconectar del ventilador y permitir la espiración', 'Administrar un betabloqueador', 'Reducir el tiempo espiratorio'],
          correcta: 1,
          explicacion: 'Sugiere auto-PEEP por atrapamiento aéreo: desconectar y dejar exhalar (y descartar neumotórax) restaura el retorno venoso.',
        },
      ],
    },

    // ===================================================================
    // 6.7 — Analgesia Mayor y Anestesia Disociativa
    // ===================================================================
    {
      id: 'analgesia-mayor-anestesia-disociativa',
      numero: '6.7',
      titulo: 'Analgesia Mayor y Anestesia Disociativa',
      icono: '💉',
      duracion: '45 min',
      resumen:
        'El control del dolor agudo es un derecho del paciente y una habilidad crítica. Dominar los opioides fuertes, su reversión y, sobre todo, el espectro de dosis de la ketamina permite analgesia potente sin sacrificar la hemodinamia ni la respiración.',
      objetivos: [
        'Dosificar los opioides fuertes y su reversión con naloxona.',
        'Comprender el espectro de dosis de la ketamina (analgésica, disociativa, de inducción).',
        'Seleccionar el analgésico según el perfil hemodinámico y respiratorio del paciente.',
      ],
      secciones: [
        {
          titulo: 'Opioides fuertes',
          bloques: [
            {
              tipo: 'tabla',
              titulo: 'Opioides y reversor',
              headers: ['Fármaco', 'Dosis analgésica', 'Notas'],
              filas: [
                ['Fentanilo', '1-2 mcg/kg IV/IN', 'Inicio rápido; estabilidad hemodinámica; sin liberación de histamina'],
                ['Morfina', '0.1 mg/kg IV', 'Más duradera; puede liberar histamina e hipotensar'],
                ['Buprenorfina', 'Agonista parcial', 'Techo de efecto; analgesia prolongada'],
                ['Naloxona', '0.04-0.4 mg IV titulada (2-4 mg IN)', 'Revierte la depresión respiratoria opioide'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Fentanilo: el opioide del paciente frágil',
              texto:
                'Por su rapidez y su escasa repercusión sobre la presión (no libera histamina), el fentanilo es preferible en el trauma y el inestable. La morfina, por su efecto histaminérgico y vasodilatador, puede no ser ideal en el hipotenso.',
            },
            {
              tipo: 'callout',
              variante: 'dosis',
              titulo: 'Naloxona: titular, no inundar',
              texto:
                'En sobredosis el objetivo es restaurar la respiración, NO despertar por completo. Empiece bajo (0.04-0.1 mg IV) y repita: una dosis alta de golpe puede precipitar abstinencia aguda, agitación, vómito y edema pulmonar. Recuerde la re-narcotización: vigile, porque la naloxona dura menos que muchos opioides.',
            },
          ],
        },
        {
          titulo: 'Ketamina: un fármaco, tres dosis',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La ketamina es un antagonista NMDA con un comportamiento único: el efecto cambia radicalmente con la dosis. A dosis baja es un analgésico potente que respeta la respiración; a dosis alta produce anestesia disociativa para intubar. Entre medias hay una "zona de recrudescencia" que conviene evitar.',
            },
            {
              tipo: 'tabla',
              titulo: 'El espectro de dosis de la ketamina (IV)',
              headers: ['Objetivo', 'Dosis', 'Características'],
              filas: [
                ['Analgesia subdisociativa', '0.1-0.3 mg/kg en 10-15 min', 'Analgesia potente; preserva la respiración'],
                ['Disociación / SDA', '~1 mg/kg', 'Sedación disociativa para procedimientos o preoxigenar'],
                ['Inducción (SRI)', '1-2 mg/kg', 'Anestesia para intubar; broncodilata, sostiene la PA'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Por qué la analgesia con ketamina es tan útil prehospitalaria',
              texto:
                'A 0.1-0.3 mg/kg controla el dolor refractario sin deprimir la respiración ni tirar la presión, e incluso permite ahorrar opioides. Pásela lenta (en 10-15 min o diluida) para minimizar los efectos psicodislépticos. Es ideal en el trauma con dolor intenso e inestabilidad.',
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Efectos a vigilar',
              texto:
                'Fenómenos de emergencia (disforia, alucinaciones) más frecuentes a dosis intermedias o en bolo rápido: tratar con una benzodiacepina y un entorno tranquilo. Aumenta secreciones (laringoespasmo raro), sialorrea y puede subir transitoriamente FC y PA. Administrar lenta reduce estos efectos.',
            },
            {
              tipo: 'imagen',
              src: '',
              alt: 'Espectro de dosis de la ketamina',
              caption: 'Continuo dosis-efecto de la ketamina: de la analgesia subdisociativa a la inducción anestésica.',
              busqueda: 'ketamine dose response continuum analgesia dissociation induction',
            },
          ],
        },
        {
          titulo: 'Fuentes y evidencia',
          bloques: [
            {
              tipo: 'fuentes',
              items: [
                { nombre: 'PHTLS 10.ª edición — Manejo del dolor', nota: 'Estándar de analgesia prehospitalaria' },
                { nombre: 'JEMS — Artículos sobre ketamina prehospitalaria', url: 'https://www.jems.com/', nota: 'Analgesia subdisociativa' },
                { nombre: 'REBEL EM — Ketamina en SRI y analgesia', url: 'https://rebelem.com/the-rsi-trial-ketamine-vs-etomidate-in-rapid-sequence-intubation/' },
                { nombre: 'EMCrit — Naloxona y manejo del opioide', url: 'https://emcrit.org/', nota: 'Titulación y re-narcotización' },
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Fentanilo 1-2 mcg/kg', definicion: 'Opioide rápido y hemodinámicamente estable; de elección en trauma.' },
        { termino: 'Naloxona titulada', definicion: '0.04-0.4 mg IV: restaurar respiración sin precipitar abstinencia.' },
        { termino: 'Ketamina analgésica', definicion: '0.1-0.3 mg/kg en 10-15 min: dolor refractario sin deprimir respiración.' },
        { termino: 'Ketamina de inducción', definicion: '1-2 mg/kg: anestesia disociativa para SRI; broncodilata y sostiene PA.' },
        { termino: 'Re-narcotización', definicion: 'La naloxona dura menos que muchos opioides; vigilar recaída.' },
      ],
      flashcards: [
        { frente: 'Dosis analgésica subdisociativa de ketamina', reverso: '0.1-0.3 mg/kg IV lenta (10-15 min).' },
        { frente: '¿Por qué el fentanilo es preferible en el inestable?', reverso: 'Inicio rápido y no libera histamina: menos hipotensión.' },
        { frente: 'Objetivo de la naloxona en sobredosis', reverso: 'Restaurar la ventilación, no despertar del todo (evitar abstinencia).' },
        { frente: 'Dosis de ketamina para inducción en SRI', reverso: '1-2 mg/kg IV (reducir en shock).' },
        { frente: '¿Cómo se reducen los fenómenos de emergencia de la ketamina?', reverso: 'Administración lenta/diluida, entorno tranquilo y benzodiacepina si aparecen.' },
      ],
      quiz: [
        {
          pregunta: 'Trauma con dolor intenso y PA 90/60. El analgésico más razonable es:',
          opciones: ['Morfina 0.1 mg/kg en bolo', 'Ketamina 0.2 mg/kg lenta', 'Naloxona', 'Diazepam'],
          correcta: 1,
          explicacion: 'La ketamina a dosis analgésica controla el dolor sin deprimir la respiración ni tirar la presión, ideal en el inestable.',
        },
        {
          pregunta: 'En una sobredosis de opioides con bradipnea, la naloxona se debe:',
          opciones: ['Dar a dosis máxima de golpe', 'Titular desde dosis baja hasta recuperar la ventilación', 'Evitar siempre', 'Administrar solo IM a dosis alta'],
          correcta: 1,
          explicacion: 'Titular evita la abstinencia aguda; el objetivo es la respiración, no el despertar completo.',
        },
        {
          pregunta: 'A dosis de 0.2 mg/kg IV, la ketamina produce:',
          opciones: ['Anestesia disociativa completa', 'Analgesia preservando la respiración', 'Parálisis muscular', 'Bloqueo del nodo AV'],
          correcta: 1,
          explicacion: 'Es la dosis subdisociativa: analgesia potente con respiración conservada.',
        },
      ],
    },

    // ===================================================================
    // 6.8 — Trauma Severo, Coagulopatía y Hemorragia Obstétrica
    // ===================================================================
    {
      id: 'trauma-coagulopatia-hemorragia-obstetrica',
      numero: '6.8',
      titulo: 'Trauma, Coagulopatía y Hemorragia Obstétrica',
      icono: '🩸',
      duracion: '50 min',
      resumen:
        'Farmacología enfocada en detener la hemorragia masiva y romper la espiral de la muerte. El ácido tranexámico, el soporte de calcio y los uterotónicos en la hemorragia postparto son intervenciones baratas y de alto impacto en supervivencia.',
      objetivos: [
        'Explicar la tríada (y el diamante) de la muerte en el trauma.',
        'Dosificar el ácido tranexámico en trauma y en hemorragia postparto.',
        'Justificar el soporte de calcio en la transfusión masiva.',
        'Tratar la hemorragia postparto con uterotónicos y antifibrinolíticos.',
      ],
      secciones: [
        {
          titulo: 'La espiral de la muerte y el ácido tranexámico',
          bloques: [
            {
              tipo: 'p',
              texto:
                'En el trauma grave, tres factores se retroalimentan y matan: hipotermia, acidosis y coagulopatía (la "tríada letal"). La hipocalcemia se reconoce hoy como cuarto vértice (el "diamante de la muerte"), porque el calcio es imprescindible para la coagulación y la contracción cardíaca.',
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Del triángulo al diamante',
              texto:
                'Hipotermia → enzimas de la coagulación lentas. Acidosis → factores disfuncionales. Coagulopatía → más sangrado → más transfusión → más dilución, más frío y más hipocalcemia. Romper cualquier vértice (calentar, controlar hemorragia, dar calcio, antifibrinolítico) ayuda a cerrar el círculo.',
            },
            {
              tipo: 'tabla',
              titulo: 'Ácido tranexámico (TXA) en trauma',
              headers: ['Protocolo', 'Dosis', 'Evidencia'],
              filas: [
                ['Civil (CRASH-2)', '1 g IV en 10 min + 1 g en 8 h', 'Mortalidad menor si se da <3 h (mejor <1 h)'],
                ['TCE (CRASH-3)', '1 g en 10 min + 1 g en 8 h, <3 h', 'Menos muerte por TCE leve-moderado'],
                ['Militar (TCCC)', '2 g IV en bolo lento', 'Simplifica la dosis en combate'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'dosis',
              titulo: 'TXA: la ventana de 3 horas',
              texto:
                'El TXA estabiliza el coágulo inhibiendo la fibrinólisis. Su beneficio depende del tiempo: máximo en la primera hora y nulo o perjudicial pasadas las 3 h del traumatismo. Por eso es una intervención prehospitalaria de alto valor: darlo pronto.',
            },
            {
              tipo: 'imagen',
              src: '',
              alt: 'Triángulo/diamante de la muerte en trauma',
              caption: 'Tríada letal (hipotermia, acidosis, coagulopatía) y su evolución al diamante de la muerte con la hipocalcemia.',
              busqueda: 'trauma lethal triad diamond hypothermia acidosis coagulopathy hypocalcemia',
            },
          ],
        },
        {
          titulo: 'Soporte de calcio',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La sangre transfundida contiene citrato como anticoagulante, que quela el calcio del receptor y provoca hipocalcemia. El calcio iónico bajo deteriora la coagulación y la contractilidad cardíaca, agravando el shock.',
            },
            {
              tipo: 'callout',
              variante: 'dosis',
              titulo: 'Calcio en la transfusión masiva',
              texto:
                'Recomendación tipo Joint Trauma System / THOR: administrar 1 g de calcio tras la primera unidad de hemoderivado y repetir según el sangrado/cada 4 unidades. El cloruro de calcio aporta ~3 veces más calcio elemental que el gluconato y se prefiere en la urgencia (mejor por vía central; el gluconato es más seguro por periférica).',
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'CaCl₂ vs. gluconato',
              texto:
                '1 g de cloruro de calcio ≈ 270 mg de calcio elemental; 1 g de gluconato ≈ 90 mg. El gluconato necesita metabolismo hepático (limitado en el shock). No mezclar el calcio con bicarbonato en la misma vía (precipita).',
            },
          ],
        },
        {
          titulo: 'Hemorragia postparto (HPP)',
          bloques: [
            {
              tipo: 'pasos',
              titulo: 'Manejo farmacológico de la HPP',
              items: [
                'Oxitocina 10 UI IM (o en infusión IV diluida) como uterotónico de primera línea + masaje uterino bimanual.',
                'Ácido tranexámico 1 g IV en 10 min; repetir 1 g si sigue sangrando a los 30 min (estudio WOMAN).',
                'Uterotónicos de segunda línea según disponibilidad (ergometrina, carbetocina, misoprostol).',
                'Reanimación con hemoderivados y traslado urgente; tratar la causa (atonía, retención, trauma).',
              ],
            },
            {
              tipo: 'callout',
              variante: 'dosis',
              titulo: 'TXA en HPP (estudio WOMAN)',
              texto:
                '1 g IV lento; si el sangrado continúa tras 30 min o se reinicia en 24 h, una segunda dosis de 1 g. Administrado dentro de las primeras 3 h del parto reduce la muerte por hemorragia. La OMS lo recomienda junto a los uterotónicos.',
            },
          ],
        },
        {
          titulo: 'Fuentes y evidencia',
          bloques: [
            {
              tipo: 'fuentes',
              items: [
                { nombre: 'PulmCrit (EMCrit) — TXA en TCE (CRASH-3)', url: 'https://emcrit.org/pulmcrit/crash3/' },
                { nombre: 'CRASH-3 — resultados (Lancet/PMC)', url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6853170/' },
                { nombre: 'FIGO — Declaración sobre TXA en HPP (WOMAN/OMS)', url: 'https://www.figo.org/joint-statement-recommendation-tranexamic-acid-treatment-pph' },
                { nombre: 'St Emlyn s — Hipocalcemia, trauma y transfusión', url: 'https://www.stemlynsblog.org/hypocalcaemia-trauma-and-major-transfusion-st-emlyns/' },
                { nombre: 'THOR Network / Joint Trauma System', nota: 'Reanimación de control de daños y calcio' },
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Diamante de la muerte', definicion: 'Hipotermia, acidosis, coagulopatía e hipocalcemia que se retroalimentan en el trauma.' },
        { termino: 'TXA en trauma', definicion: '1 g/10 min + 1 g/8 h (o 2 g TCCC); útil solo <3 h, mejor <1 h.' },
        { termino: 'Hipocalcemia por citrato', definicion: 'La transfusión quela el calcio; repón con calcio para sostener coagulación y contractilidad.' },
        { termino: 'Oxitocina 10 UI', definicion: 'Uterotónico de primera línea en la hemorragia postparto.' },
        { termino: 'TXA en HPP (WOMAN)', definicion: '1 g IV, repetible a los 30 min; dentro de las 3 h del parto.' },
      ],
      flashcards: [
        { frente: 'Dosis de TXA en trauma (CRASH-2/3)', reverso: '1 g IV en 10 min y luego 1 g en 8 h, dentro de las 3 h.' },
        { frente: '¿Por qué hay hipocalcemia en la transfusión masiva?', reverso: 'El citrato anticoagulante de la sangre quela el calcio del receptor.' },
        { frente: '¿Qué aporta más calcio elemental, CaCl₂ o gluconato?', reverso: 'El cloruro de calcio (~3 veces más por gramo).' },
        { frente: 'Uterotónico de primera línea en HPP', reverso: 'Oxitocina 10 UI IM (+ masaje uterino).' },
        { frente: 'Ventana de utilidad del TXA', reverso: 'Las primeras 3 horas (máximo beneficio en la 1.ª hora).' },
      ],
      quiz: [
        {
          pregunta: 'Politrauma con hemorragia, 40 min de evolución. Respecto al TXA:',
          opciones: ['Ya es tarde, no darlo', 'Dar 1 g IV en 10 min ahora (luego 1 g/8 h)', 'Solo si la PA es normal', 'Sustituye a la transfusión'],
          correcta: 1,
          explicacion: 'Dentro de las 3 h (mejor cuanto antes) el TXA reduce la mortalidad por hemorragia: 1 g en 10 min y luego 1 g en 8 h.',
        },
        {
          pregunta: 'El cuarto vértice del "diamante de la muerte" en trauma es:',
          opciones: ['Hipoglucemia', 'Hipocalcemia', 'Hiperkalemia', 'Hipertermia'],
          correcta: 1,
          explicacion: 'La hipocalcemia se suma a hipotermia, acidosis y coagulopatía por su papel en la coagulación y la contractilidad.',
        },
        {
          pregunta: 'Hemorragia postparto por atonía. Primera línea farmacológica:',
          opciones: ['Oxitocina 10 UI IM + masaje', 'Adrenalina IM', 'Furosemida', 'Atropina'],
          correcta: 0,
          explicacion: 'La oxitocina es el uterotónico de primera línea; se acompaña de TXA y masaje uterino.',
        },
      ],
    },

    // ===================================================================
    // 6.9 — Antídotos y Emergencias Toxicológicas
    // ===================================================================
    {
      id: 'antidotos-emergencias-toxicologicas',
      numero: '6.9',
      titulo: 'Antídotos y Emergencias Toxicológicas',
      icono: '☠️',
      duracion: '55 min',
      resumen:
        'Reconocer el toxíndrome orienta el antídoto. Esta sección reúne las intoxicaciones de alto riesgo del prehospitalario avanzado: calcioantagonistas/betabloqueadores, organofosforados, antidepresivos tricíclicos y la eclampsia.',
      objetivos: [
        'Identificar los principales toxíndromes por sus signos.',
        'Aplicar los antídotos y terapias específicas (calcio, glucagón, HIET, atropina, pralidoxima, bicarbonato, magnesio).',
        'Reconocer los hallazgos electrocardiográficos que guían el tratamiento.',
      ],
      secciones: [
        {
          titulo: 'Reconocer el toxíndrome',
          bloques: [
            {
              tipo: 'tabla',
              titulo: 'Toxíndromes de alto rendimiento',
              headers: ['Toxíndrome', 'Pupilas / piel', 'FC y signos', 'Antídoto / manejo'],
              filas: [
                ['Colinérgico', 'Miosis, piel húmeda', 'Bradicardia, secreciones (DUMBELS)', 'Atropina (± pralidoxima)'],
                ['Anticolinérgico', 'Midriasis, piel seca y roja', 'Taquicardia, delirio, fiebre', 'Benzodiacepinas (± fisostigmina)'],
                ['Simpaticomimético', 'Midriasis, diaforesis', 'Taquicardia, HTA, agitación', 'Benzodiacepinas, enfriar'],
                ['Opioide', 'Miosis puntiforme', '↓ FR, ↓ conciencia', 'Naloxona titulada'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Húmedo vs. seco',
              texto:
                'La gran bifurcación: el colinérgico está "empapado" (secreciones, sudor, miosis) y el anticolinérgico está "seco" (piel seca y roja, midriasis, retención). Pupilas y piel resuelven la mayoría de los casos en segundos.',
            },
            {
              tipo: 'imagen',
              src: '',
              alt: 'Tabla comparativa de toxíndromes',
              caption: 'Comparativa de toxíndromes (colinérgico, anticolinérgico, simpaticomimético, opioide).',
              busqueda: 'toxidromes comparison table cholinergic anticholinergic sympathomimetic opioid',
            },
          ],
        },
        {
          titulo: 'Calcioantagonistas y betabloqueadores',
          bloques: [
            {
              tipo: 'p',
              texto:
                'Ambas intoxicaciones causan bradicardia e hipotensión, pero los calcioantagonistas (verapamilo, diltiazem) suelen cursar con hiperglucemia (bloquean la liberación de insulina) y los betabloqueadores con glucemia normal o baja. El tratamiento se solapa y escala por pasos.',
            },
            {
              tipo: 'pasos',
              titulo: 'Escalón terapéutico',
              items: [
                'Soporte: líquidos, atropina para la bradicardia, monitor.',
                'Calcio IV (cloruro de calcio 1-3 g o gluconato equivalente), sobre todo en calcioantagonistas.',
                'Glucagón 3-10 mg IV en bolo, seguido de infusión: estimula el AMPc sin pasar por el receptor β (útil en betabloqueo).',
                'HIET (insulina a altas dosis con euglucemia): insulina 1 U/kg en bolo y luego 1-10 U/kg/h con dextrosa, vigilando glucemia y potasio.',
                'Refractario: vasopresores, marcapasos, lípidos IV o ECMO según recursos.',
              ],
            },
            {
              tipo: 'callout',
              variante: 'dosis',
              titulo: 'HIET: el inotrópico del corazón intoxicado',
              texto:
                'La insulina a altas dosis mejora la contractilidad del miocardio intoxicado (que cambia su metabolismo a glucosa) y la acidosis. Requiere infusión de dextrosa y vigilancia estrecha de glucosa y potasio. Es una terapia de rescate clave en el betabloqueo y el calcioantagonismo graves.',
            },
          ],
        },
        {
          titulo: 'Organofosforados',
          bloques: [
            {
              tipo: 'p',
              texto:
                'Los organofosforados (insecticidas, gases nerviosos) inhiben la acetilcolinesterasa: la acetilcolina se acumula y produce una crisis colinérgica (DUMBELS) que mata por broncorrea, broncoespasmo y bradicardia. La protección personal es prioritaria (riesgo de contaminación del rescatador).',
            },
            {
              tipo: 'callout',
              variante: 'dosis',
              titulo: 'Atropina a dosis altas y pralidoxima',
              texto:
                'Atropina 2-5 mg IV doblando la dosis cada 3-5 min hasta secar las secreciones bronquiales (el objetivo NO es la frecuencia ni la pupila, sino el pulmón seco): pueden necesitarse decenas de miligramos. La pralidoxima (2-PAM) reactiva la enzima: 30 mg/kg IV (1-2 g) en carga y luego infusión; reduce la debilidad nicotínica (fasciculaciones, parálisis).',
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Protégete primero',
              texto:
                'Descontaminar (quitar ropa, lavar) y usar EPP: el tóxico se absorbe por piel y por las secreciones del paciente. La causa habitual de muerte es la insuficiencia respiratoria por secreciones y debilidad de músculos respiratorios.',
            },
          ],
        },
        {
          titulo: 'Antidepresivos tricíclicos',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La sobredosis de tricíclicos bloquea los canales de sodio cardíacos (ensancha el QRS y puede causar TV) y tiene efectos anticolinérgicos, alfa-bloqueantes (hipotensión) y convulsiones. El ECG guía el tratamiento.',
            },
            {
              tipo: 'callout',
              variante: 'dosis',
              titulo: 'Bicarbonato de sodio si el QRS ensancha',
              texto:
                'Bicarbonato de sodio 1-2 mEq/kg en bolo IV cuando el QRS supera ~100 ms (o hay arritmia/hipotensión), repitiendo hasta estrechar el QRS. Aporta sodio (vence el bloqueo del canal) y alcaliniza (favorece la unión del fármaco a proteínas). Es la intervención que salva en la cardiotoxicidad por tricíclicos.',
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Pista en el ECG',
              texto:
                'Busque QRS ancho, taquicardia y una onda R prominente en aVR: marcadores de toxicidad por bloqueo de canales de sodio. Evite los antiarrítmicos de clase IA/IC (empeoran). Trate las convulsiones con benzodiacepinas.',
            },
          ],
        },
        {
          titulo: 'Eclampsia',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La eclampsia es la aparición de convulsiones en la preeclampsia (HTA + proteinuria del embarazo). El anticonvulsivo de elección NO es una benzodiacepina sino el sulfato de magnesio, que también previene la recurrencia y la progresión.',
            },
            {
              tipo: 'callout',
              variante: 'dosis',
              titulo: 'Sulfato de magnesio en eclampsia',
              texto:
                'Carga de 4-6 g IV en 15-20 min, seguida de infusión de 1-2 g/h. Vigile la toxicidad por magnesio (pérdida del reflejo rotuliano, depresión respiratoria, bradicardia): el antídoto es el gluconato de calcio IV. El tratamiento definitivo es finalizar el embarazo.',
            },
            {
              tipo: 'fuentes',
              items: [
                { nombre: 'Goldfrank — Toxicologic Emergencies', nota: 'Referencia maestra de antídotos' },
                { nombre: 'EMCrit (IBCC) — CCB / Beta-blocker overdose', url: 'https://emcrit.org/ibcc/ccb-2/' },
                { nombre: 'CoreEM — HIET (insulina a altas dosis)', url: 'https://coreem.net/core/hiet/' },
                { nombre: 'StatPearls (NCBI) — Organophosphate Toxicity', url: 'https://www.ncbi.nlm.nih.gov/books/NBK470430/' },
                { nombre: 'LITFL — TCA toxicity (y ECG)', url: 'https://litfl.com/tca-toxicity/' },
              ],
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Colinérgico vs. anticolinérgico', definicion: '"Húmedo" (secreciones, miosis) vs. "seco" (piel seca/roja, midriasis).' },
        { termino: 'HIET', definicion: 'Insulina 1 U/kg bolo + 1-10 U/kg/h con dextrosa: inotrópico en intoxicación por CCB/BB.' },
        { termino: 'Atropina en organofosforados', definicion: '2-5 mg doblando hasta secar secreciones; objetivo pulmonar, no la FC.' },
        { termino: 'Bicarbonato en tricíclicos', definicion: '1-2 mEq/kg si QRS >100 ms; vence el bloqueo de sodio.' },
        { termino: 'Magnesio en eclampsia', definicion: 'Carga 4-6 g + 1-2 g/h; antídoto de su toxicidad: gluconato de calcio.' },
      ],
      flashcards: [
        { frente: 'Antídoto del exceso colinérgico por organofosforados', reverso: 'Atropina a dosis altas (doblando) + pralidoxima.' },
        { frente: 'Objetivo de la atropinización en organofosforados', reverso: 'Secar las secreciones bronquiales (pulmón seco), no la frecuencia.' },
        { frente: 'Tratamiento de la cardiotoxicidad por tricíclicos con QRS ancho', reverso: 'Bicarbonato de sodio 1-2 mEq/kg.' },
        { frente: 'Anticonvulsivo de elección en la eclampsia', reverso: 'Sulfato de magnesio (carga 4-6 g + infusión).' },
        { frente: 'Antídoto de la toxicidad por magnesio', reverso: 'Gluconato de calcio IV.' },
        { frente: 'Terapia de rescate inotrópica en intoxicación por betabloqueadores', reverso: 'HIET: insulina a altas dosis con euglucemia.' },
      ],
      quiz: [
        {
          pregunta: 'Paciente con miosis, sialorrea, broncorrea y bradicardia tras fumigar. El antídoto principal es:',
          opciones: ['Naloxona', 'Atropina a dosis altas', 'Flumazenil', 'Bicarbonato'],
          correcta: 1,
          explicacion: 'Es un toxíndrome colinérgico por organofosforados; la atropina (doblando hasta secar secreciones) es el pilar, con pralidoxima.',
        },
        {
          pregunta: 'Sobredosis de tricíclicos con QRS de 130 ms e hipotensión. El tratamiento clave es:',
          opciones: ['Amiodarona', 'Bicarbonato de sodio 1-2 mEq/kg', 'Verapamilo', 'Atropina'],
          correcta: 1,
          explicacion: 'El bicarbonato aporta sodio y alcaliniza, revirtiendo el bloqueo de canales de sodio que ensancha el QRS.',
        },
        {
          pregunta: 'En la intoxicación grave por betabloqueador/calcioantagonista refractaria, una terapia de rescate es:',
          opciones: ['HIET (insulina a altas dosis con euglucemia)', 'Naloxona', 'Furosemida', 'Adenosina'],
          correcta: 0,
          explicacion: 'La insulina a altas dosis mejora la contractilidad del miocardio intoxicado; se acompaña de calcio y glucagón.',
        },
        {
          pregunta: 'Embarazada de 34 semanas con convulsión y PA 170/110. El fármaco de elección es:',
          opciones: ['Diazepam', 'Sulfato de magnesio', 'Fenitoína', 'Levetiracetam'],
          correcta: 1,
          explicacion: 'En la eclampsia el anticonvulsivo de elección es el sulfato de magnesio (carga 4-6 g + infusión 1-2 g/h).',
        },
      ],
    },
  ],
}
