// FASE 3 — TUM-Intermedio (Manejo Invasivo y Fluidoterapia)

export const fase3 = {
  id: 'fase-3',
  numero: 3,
  titulo: 'TUM-Intermedio',
  subtitulo: 'Manejo Invasivo y Fluidoterapia',
  color: '#f59e0b',
  icono: '💉',
  descripcion:
    'El paramédico intermedio introduce procedimientos invasivos y farmacología. Entender la distribución de líquidos y la farmacocinética evita complicaciones y guía decisiones.',
  temas: [
    {
      id: 'terapia-iv-io',
      numero: '3.1',
      titulo: 'Terapia Intravenosa e Intraósea',
      icono: '🩸',
      duracion: '50 min',
      resumen:
        'No todas las soluciones son iguales. La osmolaridad y la tonicidad determinan adónde va el agua que infundimos, y la vía intraósea salva vidas cuando no hay acceso venoso.',
      objetivos: [
        'Diferenciar cristaloides y coloides por osmolaridad y tonicidad.',
        'Predecir la distribución de líquidos entre compartimentos.',
        'Aplicar sitios, contraindicaciones y complicaciones del acceso intraóseo.',
      ],
      secciones: [
        {
          titulo: 'Compartimentos y distribución del agua',
          bloques: [
            {
              tipo: 'p',
              texto:
                'El agua corporal total (~60% del peso) se reparte en el compartimento intracelular (2/3) y el extracelular (1/3), este último dividido en intersticial (3/4) e intravascular (1/4). La tonicidad de la solución que infundimos decide hacia qué compartimento se desplaza el agua.',
            },
            {
              tipo: 'tabla',
              headers: ['Solución', 'Tonicidad', 'Destino y uso'],
              filas: [
                ['Salino 0.9% (fisiológico)', 'Isotónica', 'Permanece en el extracelular; reanimación general. Riesgo de acidosis hiperclorémica en grandes volúmenes.'],
                ['Ringer Lactato / Hartmann', 'Isotónica (balanceada)', 'Extracelular; más fisiológica, el lactato se metaboliza a bicarbonato.'],
                ['Plasmalyte', 'Isotónica (balanceada)', 'Extracelular; composición muy cercana al plasma.'],
                ['Glucosado 5%', 'Isotónica que se vuelve hipotónica', 'Se distribuye a todos los compartimentos al consumirse la glucosa; no expande la volemia.'],
                ['Salino hipertónico 3% / 7.5%', 'Hipertónica', 'Atrae agua del intracelular al intravascular; TCE con HIC, reanimación de bajo volumen.'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Cristaloides vs. coloides',
              texto:
                'Los cristaloides (salino, Ringer) contienen electrolitos y agua, se distribuyen rápido y son baratos, pero gran parte abandona el espacio intravascular en ~30-60 min. Los coloides (albúmina, almidones) contienen moléculas grandes que retienen agua en el vaso por presión oncótica, expandiendo más con menos volumen, pero son más caros y con riesgos propios.',
            },
          ],
        },
        {
          titulo: 'Acceso intraóseo (IO)',
          bloques: [
            {
              tipo: 'p',
              texto:
                'La cavidad medular es una "vena no colapsable": permite infundir fluidos y fármacos con absorción casi inmediata a la circulación central cuando el acceso IV es imposible o se retrasa en emergencias.',
            },
            {
              tipo: 'lista',
              titulo: 'Sitios de inserción',
              items: [
                'Tibia proximal: 1-2 cm medial e inferior a la tuberosidad tibial (sitio más usado en adultos y niños).',
                'Húmero proximal: tuberosidad mayor; alto flujo, útil en RCP, pero se desplaza con el movimiento del brazo.',
                'Tibia distal y esternón (dispositivos específicos) como alternativas.',
              ],
            },
            {
              tipo: 'tabla',
              headers: ['Contraindicaciones', 'Complicaciones'],
              filas: [
                ['Fractura del hueso elegido', 'Extravasación / mala posición'],
                ['IO o intento previo en el mismo hueso (≤48 h)', 'Síndrome compartimental'],
                ['Infección/celulitis en el sitio', 'Osteomielitis (infección ósea)'],
                ['Prótesis o cirugía ortopédica en el sitio', 'Embolia grasa (raro), dolor a la infusión'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'alerta',
              titulo: 'Síndrome compartimental',
              texto:
                'Si la aguja IO se desplaza, el líquido se extravasa al compartimento muscular, elevando la presión y comprometiendo la perfusión: dolor desproporcionado, tensión y aumento de volumen del miembro. Es una complicación grave que exige retirar la vía y vigilancia estrecha.',
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'Tonicidad', definicion: 'Capacidad de una solución de mover agua a través de la membrana celular.' },
        { termino: 'Salino hipertónico', definicion: 'Atrae agua del intracelular al vaso; útil en hipertensión intracraneal.' },
        { termino: 'Presión oncótica', definicion: 'Fuerza de las proteínas/coloides que retiene agua en el espacio intravascular.' },
        { termino: 'Síndrome compartimental', definicion: 'Complicación del IO por extravasación que eleva la presión en el compartimento.' },
      ],
      flashcards: [
        { frente: '¿Qué compartimento expande principalmente el salino 0.9%?', reverso: 'El extracelular (no entra a la célula por ser isotónico).' },
        { frente: '¿Cómo actúa el salino hipertónico 3% en el TCE?', reverso: 'Atrae agua del intracelular al intravascular, reduciendo el edema cerebral.' },
        { frente: 'Sitio IO más usado y su referencia', reverso: 'Tibia proximal, 1-2 cm medial e inferior a la tuberosidad tibial.' },
        { frente: 'Complicación grave por desplazamiento de la aguja IO', reverso: 'Extravasación con síndrome compartimental.' },
      ],
      quiz: [
        {
          pregunta: 'Para reducir el edema cerebral en un TCE grave, la solución de elección entre estas es:',
          opciones: ['Glucosado 5%', 'Salino hipertónico 3%', 'Salino 0.9% a gran volumen', 'Agua destilada'],
          correcta: 1,
          explicacion: 'El salino hipertónico crea un gradiente osmótico que extrae agua del tejido cerebral hacia el vaso, disminuyendo la presión intracraneal.',
        },
        {
          pregunta: '¿Por qué el glucosado 5% NO sirve para expandir la volemia?',
          opciones: ['Porque es hipertónico permanente', 'Porque al consumirse la glucosa el agua libre se distribuye a todos los compartimentos', 'Porque contiene coloides', 'Porque permanece en el plasma'],
          correcta: 1,
          explicacion: 'Una vez metabolizada la glucosa queda agua libre que se reparte por todo el cuerpo, aportando muy poco volumen intravascular.',
        },
        {
          pregunta: 'Una contraindicación absoluta para colocar un acceso intraóseo en un hueso es:',
          opciones: ['Paciente pediátrico', 'Fractura de ese hueso', 'Necesidad de fármacos en paro', 'Mala perfusión periférica'],
          correcta: 1,
          explicacion: 'En un hueso fracturado el líquido se extravasaría; debe elegirse otro sitio.',
        },
      ],
    },
    {
      id: 'farmacologia-toxicologia',
      numero: '3.2',
      titulo: 'Farmacología Intermedia y Toxicología Básica',
      icono: '⚗️',
      duracion: '50 min',
      resumen:
        'Cómo el cuerpo maneja un fármaco (farmacocinética) y cómo el fármaco actúa sobre el cuerpo (farmacodinamia). El reconocimiento de toxidromes orienta el tratamiento del intoxicado.',
      objetivos: [
        'Definir los procesos ADME de la farmacocinética.',
        'Relacionar la vía de administración con la biodisponibilidad.',
        'Reconocer los principales toxidromes y su manejo.',
      ],
      secciones: [
        {
          titulo: 'Farmacocinética (ADME) y farmacodinamia',
          bloques: [
            {
              tipo: 'lista',
              titulo: 'ADME — lo que el cuerpo hace al fármaco',
              items: [
                'Absorción: paso del fármaco desde el sitio de administración a la sangre.',
                'Distribución: reparto del fármaco por los tejidos (depende de la perfusión, la unión a proteínas y la liposolubilidad).',
                'Metabolismo: transformación, sobre todo hepática (citocromo P450), a metabolitos generalmente más hidrosolubles.',
                'Excreción: eliminación, principalmente renal.',
              ],
            },
            {
              tipo: 'p',
              texto:
                'La farmacodinamia describe el efecto del fármaco: unión a receptores (agonista, antagonista), relación dosis-respuesta, potencia y eficacia. Un agonista activa el receptor; un antagonista lo bloquea (ej. naloxona sobre receptores opioides).',
            },
            {
              tipo: 'callout',
              variante: 'clave',
              titulo: 'Biodisponibilidad y vía',
              texto:
                'La biodisponibilidad es la fracción de fármaco que alcanza la circulación sistémica activa. La vía intravenosa tiene biodisponibilidad del 100% (sin barreras de absorción ni primer paso hepático). La vía oral sufre el efecto de primer paso, reduciendo la fracción activa. Por eso las dosis IV y oral del mismo fármaco difieren.',
            },
          ],
        },
        {
          titulo: 'Toxidromes',
          bloques: [
            {
              tipo: 'p',
              texto:
                'Un toxidrome es un conjunto de signos y síntomas que sugiere una clase de tóxico. Identificarlo permite iniciar tratamiento sin esperar análisis.',
            },
            {
              tipo: 'tabla',
              headers: ['Toxidrome', 'Signos clave', 'Ejemplos / antídoto'],
              filas: [
                ['Anticolinérgico', 'Midriasis, piel seca y caliente, retención urinaria, taquicardia, delirio, hipertermia ("rojo, seco, caliente, loco, ciego")', 'Atropina, antihistamínicos / fisostigmina'],
                ['Colinérgico', 'SLUDGE: salivación, lagrimeo, micción, defecación, GI, emesis; miosis, broncorrea, bradicardia', 'Organofosforados / atropina + pralidoxima'],
                ['Simpaticomimético', 'Midriasis, diaforesis, taquicardia, hipertensión, hipertermia, agitación', 'Cocaína, anfetaminas / benzodiacepinas'],
                ['Opiáceo', 'Miosis puntiforme, depresión respiratoria, sedación, bradicardia', 'Heroína, fentanilo / naloxona'],
                ['Sedante-hipnótico', 'Sedación, depresión respiratoria, reflejos disminuidos, pupilas variables', 'Benzodiacepinas, alcohol / flumazenil (con cautela)'],
              ],
            },
            {
              tipo: 'callout',
              variante: 'clinico',
              titulo: 'Diferenciar anticolinérgico de simpaticomimético',
              texto:
                'Ambos cursan con taquicardia, midriasis e hipertermia, pero la piel SECA apunta al anticolinérgico y la piel SUDOROSA (diaforesis) al simpaticomimético. Este detalle cambia el enfoque.',
            },
          ],
        },
      ],
      conceptosClave: [
        { termino: 'ADME', definicion: 'Absorción, Distribución, Metabolismo y Excreción: los pasos de la farmacocinética.' },
        { termino: 'Biodisponibilidad', definicion: 'Fracción del fármaco que alcanza la circulación sistémica activa; 100% por vía IV.' },
        { termino: 'Efecto de primer paso', definicion: 'Metabolismo hepático que reduce la fracción activa de un fármaco oral.' },
        { termino: 'Toxidrome', definicion: 'Síndrome clínico que orienta a una clase de tóxico.' },
      ],
      flashcards: [
        { frente: 'Antídoto del toxidrome opiáceo', reverso: 'Naloxona (antagonista de receptores opioides).' },
        { frente: '¿Qué diferencia clínica separa anticolinérgico de simpaticomimético?', reverso: 'Piel seca (anticolinérgico) vs. piel sudorosa/diaforesis (simpaticomimético).' },
        { frente: 'Significa "SLUDGE" del toxidrome colinérgico', reverso: 'Salivación, Lagrimeo, micción (Urination), Defecación, GI, Emesis.' },
        { frente: 'Biodisponibilidad de la vía intravenosa', reverso: '100%: no hay barreras de absorción ni primer paso hepático.' },
      ],
      quiz: [
        {
          pregunta: 'Paciente con miosis puntiforme, bradipnea severa y estupor tras consumo de drogas. El antídoto es:',
          opciones: ['Atropina', 'Naloxona', 'Flumazenil', 'Adrenalina'],
          correcta: 1,
          explicacion: 'Es un toxidrome opiáceo (miosis + depresión respiratoria + sedación); la naloxona revierte el efecto.',
        },
        {
          pregunta: 'Un paciente intoxicado con organofosforados presentará típicamente:',
          opciones: ['Piel seca y midriasis', 'Miosis, broncorrea, salivación y bradicardia', 'Hipertensión con diaforesis y agitación', 'Sedación aislada sin secreciones'],
          correcta: 1,
          explicacion: 'Es un toxidrome colinérgico (SLUDGE) por exceso de acetilcolina; se trata con atropina y pralidoxima.',
        },
        {
          pregunta: '¿Por qué la dosis oral de un fármaco suele ser mayor que la IV?',
          opciones: ['Porque la vía oral no tiene metabolismo', 'Por el efecto de primer paso hepático que reduce su biodisponibilidad', 'Porque la IV se excreta más lento', 'Porque la oral es más potente'],
          correcta: 1,
          explicacion: 'El fármaco oral se absorbe por el intestino y pasa por el hígado antes de la circulación, perdiendo fracción activa (primer paso).',
        },
      ],
    },
  ],
}
