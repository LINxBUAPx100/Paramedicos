// FASE 2 — Temas adicionales TUM-Básico (La Guía de Lin)
// Contenido a profundidad para estudio real. Español de México.

export const extraFase2 = [
  {
    id: 'signos-vitales',
    numero: '2.3',
    titulo: 'Signos Vitales e Interpretación',
    icono: '📊',
    duracion: '50 min',
    resumen:
      'Los signos vitales son la fotografía objetiva del estado fisiológico. Medirlos bien e interpretarlos en conjunto, no aislados, distingue al buen clínico prehospitalario.',
    objetivos: [
      'Medir con técnica correcta frecuencia cardiaca, frecuencia respiratoria, tension arterial, saturacion y temperatura.',
      'Conocer los rangos normales por grupo de edad y reconocer desviaciones peligrosas.',
      'Calcular el llenado capilar y la presion arterial media, e interpretar la escala de Glasgow.',
      'Integrar los signos vitales en una tendencia para anticipar el deterioro del paciente.',
    ],
    secciones: [
      {
        titulo: 'Frecuencia cardiaca y frecuencia respiratoria',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La frecuencia cardiaca (FC) se cuenta por palpacion de un pulso central o periferico durante 30 o 60 segundos. La frecuencia respiratoria (FR) se cuenta observando las excursiones del torax sin avisar al paciente, porque al saberse observado modifica su respiracion. Ambas se valoran junto con su calidad: ritmo, fuerza, profundidad y simetria.',
          },
          {
            tipo: 'tabla',
            titulo: 'Calidad del pulso',
            headers: ['Hallazgo', 'Descripcion', 'Sospecha clinica'],
            filas: [
              ['Filiforme (debil y rapido)', 'Pulso fino, dificil de palpar', 'Shock, hipovolemia'],
              ['Salton (lleno y fuerte)', 'Pulso amplio', 'Hipertension, fiebre, ejercicio'],
              ['Irregular', 'Intervalos desiguales', 'Arritmia (fibrilacion auricular)'],
              ['Ausente periferico, presente central', 'Solo se palpa carotideo o femoral', 'Hipotension grave, vasoconstriccion'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Sitios de pulso utiles',
            items: [
              'Radial: pulso periferico de eleccion en el adulto consciente.',
              'Carotideo: pulso central de eleccion en el adulto inconsciente.',
              'Braquial: pulso de eleccion en el lactante.',
              'Femoral: pulso central alterno cuando el carotideo es inaccesible.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Regla practica de presion por pulso palpable',
            texto:
              'Una guia clasica de campo: si se palpa pulso radial, la presion sistolica suele ser de al menos 80 mmHg; solo femoral, alrededor de 70; solo carotideo, alrededor de 60. Es orientativa, no sustituye al baumanometro, pero sirve cuando no hay tiempo de medir.',
          },
        ],
      },
      {
        titulo: 'Tension arterial y presion arterial media',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La tension arterial (TA) tiene dos valores: la sistolica (presion durante la contraccion ventricular) y la diastolica (presion durante la relajacion). Se mide por auscultacion con baumanometro y estetoscopio, escuchando los ruidos de Korotkoff, o por palpacion cuando hay mucho ruido ambiental (solo da la sistolica).',
          },
          {
            tipo: 'formula',
            texto: 'PAM = PAD + (PAS - PAD) / 3',
            nota: 'Presion arterial media. PAS = sistolica, PAD = diastolica. Una PAM mayor o igual a 65 mmHg suele indicar perfusion adecuada de organos.',
          },
          {
            tipo: 'tabla',
            titulo: 'Clasificacion de la tension arterial en el adulto',
            headers: ['Categoria', 'Sistolica (mmHg)', 'Diastolica (mmHg)'],
            filas: [
              ['Optima / normal', 'Menor a 120', 'Menor a 80'],
              ['Elevada', '120 a 129', 'Menor a 80'],
              ['Hipertension etapa 1', '130 a 139', '80 a 89'],
              ['Hipertension etapa 2', 'Mayor o igual a 140', 'Mayor o igual a 90'],
              ['Crisis hipertensiva', 'Mayor a 180', 'Mayor a 120'],
              ['Hipotension', 'Menor a 90', 'Variable'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'No te confies de una TA normal',
            texto:
              'En el shock compensado, el cuerpo mantiene la presion a costa de vasoconstriccion y taquicardia. La TA cae tarde, cuando los mecanismos de compensacion fallan. Una sistolica que baja es signo de shock descompensado: el paciente ya esta grave.',
          },
        ],
      },
      {
        titulo: 'Oximetria, temperatura y llenado capilar',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La saturacion de oxigeno (SpO2) mide el porcentaje de hemoglobina unida a oxigeno. El llenado capilar valora la perfusion periferica. La temperatura completa el cuadro: la hipotermia y la fiebre alteran el metabolismo y el pronostico.',
          },
          {
            tipo: 'pasos',
            titulo: 'Medicion del llenado capilar',
            items: [
              'Eleva la mano del paciente ligeramente por encima del corazon.',
              'Presiona el lecho ungueal hasta que palidezca.',
              'Suelta y cuenta los segundos hasta que recupere el color.',
              'Normal: menor o igual a 2 segundos. Mayor a 2 segundos sugiere mala perfusion (frio, shock, deshidratacion).',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Interpretacion de la SpO2',
            headers: ['SpO2', 'Interpretacion', 'Conducta'],
            filas: [
              ['95 a 100%', 'Normal', 'Vigilar'],
              ['91 a 94%', 'Hipoxemia leve', 'Oxigeno suplementario'],
              ['86 a 90%', 'Hipoxemia moderada', 'Oxigeno a alto flujo, reevaluar via aerea'],
              ['Menor a 85%', 'Hipoxemia grave', 'Soporte ventilatorio, posible BVM'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Cuando la oximetria miente',
            texto:
              'El pulsioximetro da lecturas falsamente normales en la intoxicacion por monoxido de carbono (la carboxihemoglobina se confunde con oxihemoglobina). Tambien falla con uñas pintadas, hipotermia, mala perfusion y movimiento. Trata al paciente, no al numero.',
          },
        ],
      },
      {
        titulo: 'Escala de coma de Glasgow',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La escala de coma de Glasgow (ECG) cuantifica el nivel de conciencia sumando tres componentes. El puntaje va de 3 (coma profundo) a 15 (normal). Siempre se reporta el desglose, no solo el total, porque guia decisiones de via aerea.',
          },
          {
            tipo: 'tabla',
            titulo: 'Componentes de la escala de Glasgow',
            headers: ['Respuesta ocular', 'Respuesta verbal', 'Respuesta motora'],
            filas: [
              ['4 Espontanea', '5 Orientada', '6 Obedece ordenes'],
              ['3 A la voz', '4 Confusa', '5 Localiza el dolor'],
              ['2 Al dolor', '3 Palabras inapropiadas', '4 Retira al dolor'],
              ['1 Ninguna', '2 Sonidos incomprensibles', '3 Flexion anormal (decorticacion)'],
              ['-', '1 Ninguna', '2 Extension anormal (descerebracion)'],
              ['-', '-', '1 Ninguna'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Glasgow menor o igual a 8: intuba',
            texto:
              'Un puntaje de 8 o menos indica incapacidad para proteger la via aerea. En el ambito basico, esto se traduce en colocar al paciente en posicion de seguridad, aspirar secreciones y prepararse para apoyo ventilatorio mientras llega el soporte avanzado.',
          },
        ],
      },
      {
        titulo: 'Rangos normales por edad',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Los valores normales cambian con la edad: el recien nacido tiene FC y FR altas con TA baja, y conforme crece se acerca a los valores del adulto. Memorizar estos rangos evita alarmas falsas y permite detectar la verdadera anormalidad.',
          },
          {
            tipo: 'tabla',
            titulo: 'Signos vitales normales por grupo de edad',
            headers: ['Edad', 'FC (lpm)', 'FR (rpm)', 'TA sistolica (mmHg)'],
            filas: [
              ['Recien nacido', '120 a 160', '40 a 60', '60 a 90'],
              ['Lactante (1 a 12 meses)', '100 a 150', '25 a 40', '70 a 95'],
              ['Preescolar (1 a 5 años)', '80 a 140', '20 a 30', '80 a 100'],
              ['Escolar (6 a 12 años)', '70 a 120', '18 a 25', '80 a 110'],
              ['Adolescente', '60 a 100', '12 a 20', '90 a 120'],
              ['Adulto', '60 a 100', '12 a 20', '90 a 140'],
              ['Adulto mayor', '60 a 100', '12 a 20', 'Tiende a elevarse'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Formula pediatrica de TA minima',
            texto:
              'En niños de 1 a 10 años, la sistolica minima aceptable se estima asi: 70 + (2 x edad en años). Por debajo de ese valor, sospecha hipotension y shock descompensado.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'PAM', definicion: 'Presion arterial media; PAD + (PAS - PAD)/3; refleja la presion de perfusion de organos.' },
      { termino: 'Llenado capilar', definicion: 'Tiempo de retorno del color tras presionar el lecho ungueal; normal hasta 2 segundos.' },
      { termino: 'Pulso filiforme', definicion: 'Pulso debil y rapido tipico del shock e hipovolemia.' },
      { termino: 'Ruidos de Korotkoff', definicion: 'Sonidos auscultados al desinflar el manguito que definen la sistolica y la diastolica.' },
      { termino: 'Carboxihemoglobina', definicion: 'Hemoglobina unida a monoxido de carbono; engaña al pulsioximetro dando SpO2 falsamente alta.' },
      { termino: 'Escala de Glasgow', definicion: 'Escala de 3 a 15 que mide conciencia sumando respuesta ocular, verbal y motora.' },
      { termino: 'Shock compensado', definicion: 'Fase en la que la TA se mantiene normal gracias a taquicardia y vasoconstriccion.' },
    ],
    flashcards: [
      { frente: 'Rango normal de FC en el adulto', reverso: '60 a 100 latidos por minuto.' },
      { frente: 'Que SpO2 se considera hipoxemia que requiere oxigeno', reverso: 'Por debajo de 95%; con prioridad si baja de 90 a 94%.' },
      { frente: 'Como se calcula la PAM', reverso: 'PAD + (PAS - PAD) dividido entre 3.' },
      { frente: 'Llenado capilar normal', reverso: 'Menor o igual a 2 segundos.' },
      { frente: 'Glasgow que indica via aerea no protegida', reverso: '8 o menos.' },
      { frente: 'Por que la oximetria miente en intoxicacion por CO', reverso: 'La carboxihemoglobina se confunde con oxihemoglobina y da SpO2 falsamente alta.' },
      { frente: 'TA sistolica minima en un niño de 6 años', reverso: '70 + (2 x 6) = 82 mmHg.' },
      { frente: 'Pulso de eleccion en el lactante', reverso: 'Braquial.' },
      { frente: 'Que mide la respuesta verbal en Glasgow y su maximo', reverso: 'Orientacion del lenguaje; maximo 5 puntos.' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente tiene pulso carotideo presente pero no se palpa radial ni femoral. La sistolica aproximada es:',
        opciones: ['Mayor a 90 mmHg', 'Alrededor de 80 mmHg', 'Alrededor de 70 mmHg', 'Alrededor de 60 mmHg'],
        correcta: 3,
        explicacion: 'La regla de campo estima: solo carotideo presente sugiere una sistolica cercana a 60 mmHg, indicio de hipotension grave.',
      },
      {
        pregunta: 'Paciente con TA 118/78 pero FC de 130, piel fria y llenado capilar de 4 segundos. La interpretacion mas adecuada es:',
        opciones: ['Esta estable porque la TA es normal', 'Shock compensado: la TA aun no cae pero hay signos de hipoperfusion', 'Crisis hipertensiva', 'No hay datos de alarma'],
        correcta: 1,
        explicacion: 'La TA normal con taquicardia, piel fria y llenado prolongado es shock compensado. La presion cae tarde; los signos de mala perfusion lo delatan antes.',
      },
      {
        pregunta: 'Cual es la PAM de un paciente con TA de 120/60?',
        opciones: ['90 mmHg', '80 mmHg', '60 mmHg', '100 mmHg'],
        correcta: 1,
        explicacion: 'PAM = 60 + (120 - 60)/3 = 60 + 20 = 80 mmHg, valor adecuado para la perfusion de organos.',
      },
      {
        pregunta: 'Un rescatista encuentra a un bombero rescatado de un incendio con SpO2 de 99% pero confuso y con cefalea. Lo correcto es:',
        opciones: ['Confiar en la SpO2 y no dar oxigeno', 'Sospechar intoxicacion por CO y administrar oxigeno a alto flujo', 'Suspender oxigeno por riesgo de toxicidad', 'Solo vigilar'],
        correcta: 1,
        explicacion: 'En exposicion a humo, la SpO2 normal puede ser falsa por carboxihemoglobina. Los sintomas neurologicos obligan a dar oxigeno a alto flujo.',
      },
      {
        pregunta: 'Escala de Glasgow de un paciente que abre ojos al dolor (2), emite sonidos incomprensibles (2) y retira al dolor (4):',
        opciones: ['ECG 6', 'ECG 8', 'ECG 10', 'ECG 12'],
        correcta: 1,
        explicacion: '2 + 2 + 4 = 8. Un Glasgow de 8 marca el umbral de via aerea no protegida.',
      },
      {
        pregunta: 'La frecuencia respiratoria normal de un lactante de 6 meses es de aproximadamente:',
        opciones: ['12 a 20 rpm', '20 a 30 rpm', '25 a 40 rpm', '40 a 60 rpm'],
        correcta: 2,
        explicacion: 'El lactante respira entre 25 y 40 rpm. Confundirlo con el rango del adulto haria pasar por anormal lo que es fisiologico.',
      },
      {
        pregunta: 'Por que se cuenta la FR sin avisar al paciente?',
        opciones: ['Para ahorrar tiempo', 'Porque al sentirse observado modifica su patron respiratorio', 'Porque es mas higienico', 'No hay diferencia'],
        correcta: 1,
        explicacion: 'La respiracion tiene control voluntario; si el paciente sabe que lo observan, altera el ritmo y la medicion pierde validez.',
      },
    ],
  },
  {
    id: 'svb-rcp',
    numero: '2.4',
    titulo: 'Soporte Vital Basico y RCP de Alta Calidad',
    icono: '❤️',
    duracion: '55 min',
    resumen:
      'En el paro cardiaco, cada minuto sin reanimacion reduce la supervivencia cerca de 10%. La RCP de alta calidad y la desfibrilacion temprana son las intervenciones que mas vidas salvan.',
    objetivos: [
      'Reconocer el paro cardiorrespiratorio y activar la cadena de supervivencia.',
      'Ejecutar compresiones toracicas de alta calidad con la profundidad y frecuencia correctas.',
      'Operar un DEA con seguridad e integrarlo al ciclo de RCP.',
      'Manejar la obstruccion de via aerea por cuerpo extraño (OVACE) en el paciente consciente e inconsciente.',
    ],
    secciones: [
      {
        titulo: 'Cadena de supervivencia',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La cadena de supervivencia es la secuencia de acciones que, encadenadas y a tiempo, maximizan la posibilidad de sobrevivir a un paro cardiaco. Un eslabon roto compromete toda la cadena.',
          },
          {
            tipo: 'lista',
            titulo: 'Eslabones (paro extrahospitalario en el adulto)',
            items: [
              'Reconocimiento inmediato del paro y activacion del sistema de emergencias.',
              'RCP precoz con enfasis en las compresiones.',
              'Desfibrilacion rapida con DEA.',
              'Soporte vital avanzado eficaz.',
              'Cuidados integrados posparo cardiaco.',
              'Recuperacion y rehabilitacion.',
            ],
          },
          {
            tipo: 'diagrama',
            clave: 'corazon',
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'El tiempo es musculo y es cerebro',
            texto:
              'Sin RCP, la probabilidad de supervivencia cae entre 7 y 10% por cada minuto que pasa. La RCP precoz por testigos puede duplicar o triplicar la supervivencia.',
          },
        ],
      },
      {
        titulo: 'Reconocimiento y activacion',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Secuencia inicial del rescatador unico',
            items: [
              'Verifica la seguridad de la escena antes de acercarte.',
              'Evalua la respuesta: toca los hombros y pregunta en voz alta si esta bien.',
              'Si no responde, pide ayuda y activa el sistema de emergencias (911) o envia a alguien por el DEA.',
              'Comprueba simultaneamente respiracion y pulso carotideo durante no mas de 10 segundos.',
              'Si no respira o solo boquea (respiracion agonica) y no hay pulso, inicia RCP de inmediato.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'El boqueo no es respirar',
            texto:
              'La respiracion agonica (gasping) es un reflejo del tronco encefalico, no ventilacion eficaz. Es un signo de paro: no esperes a que se confirme, inicia compresiones.',
          },
        ],
      },
      {
        titulo: 'RCP de alta calidad',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Las compresiones generan flujo sanguineo a corazon y cerebro. Su calidad determina el resultado: profundidad correcta, frecuencia adecuada, reexpansion completa y minimas interrupciones.',
          },
          {
            tipo: 'tabla',
            titulo: 'Parametros de RCP de alta calidad por edad',
            headers: ['Parametro', 'Adulto', 'Niño', 'Lactante'],
            filas: [
              ['Frecuencia', '100 a 120 por minuto', '100 a 120 por minuto', '100 a 120 por minuto'],
              ['Profundidad', 'Al menos 5 cm (max 6)', 'Un tercio del torax (5 cm)', 'Un tercio del torax (4 cm)'],
              ['Tecnica', 'Dos manos', 'Una o dos manos', 'Dos dedos o dos pulgares'],
              ['Relacion compresion/ventilacion (1 rescatador)', '30:2', '30:2', '30:2'],
              ['Relacion (2 rescatadores)', '30:2', '15:2', '15:2'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Pilares de la calidad',
            items: [
              'Comprime fuerte y rapido en el centro del torax (mitad inferior del esternon).',
              'Permite la reexpansion completa entre compresiones; no te apoyes en el torax.',
              'Minimiza las interrupciones: menos de 10 segundos por pausa.',
              'Evita la ventilacion excesiva, que eleva la presion intratoracica y reduce el retorno venoso.',
              'Cambia de compresor cada 2 minutos para evitar la fatiga.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Fraccion de compresion toracica',
            texto:
              'Es el porcentaje del tiempo total de reanimacion en que efectivamente se comprime. La meta es mayor al 60%, idealmente 80%. Cada segundo sin comprimir, la presion de perfusion coronaria cae y hay que reconstruirla.',
          },
        ],
      },
      {
        titulo: 'Desfibrilador externo automatico (DEA)',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El DEA analiza el ritmo cardiaco y, si detecta un ritmo desfibrilable (fibrilacion ventricular o taquicardia ventricular sin pulso), entrega una descarga que despolariza el corazon para permitir que el marcapasos natural reinicie un ritmo organizado.',
          },
          {
            tipo: 'pasos',
            titulo: 'Uso del DEA',
            items: [
              'Enciende el equipo y sigue las instrucciones de voz.',
              'Coloca los parches en torax desnudo y seco: uno infraclavicular derecho y otro en linea axilar media izquierda.',
              'Aleja a todos y permite que el equipo analice el ritmo sin tocar al paciente.',
              'Si indica descarga, asegurate de que nadie toque al paciente y oprime el boton.',
              'Reanuda compresiones de inmediato tras la descarga durante 2 minutos antes del siguiente analisis.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Consideraciones especiales con el DEA',
            headers: ['Situacion', 'Conducta'],
            filas: [
              ['Torax mojado', 'Secar antes de colocar parches'],
              ['Vello toracico abundante', 'Rasurar o usar segundo juego de parches para depilar'],
              ['Parche de medicamento transdermico', 'Retirar y limpiar la piel'],
              ['Marcapasos o desfibrilador implantado', 'Colocar el parche al menos a 2.5 cm del dispositivo'],
              ['Paciente pediatrico', 'Usar parches y atenuador pediatricos si estan disponibles'],
              ['Superficie metalica o agua', 'Mover al paciente a superficie seca y no conductora'],
            ],
          },
        ],
      },
      {
        titulo: 'Obstruccion de via aerea por cuerpo extraño (OVACE)',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El atragantamiento puede ser leve (obstruccion parcial, el paciente tose con fuerza) o grave (obstruccion completa, no puede toser, hablar ni respirar). La conducta cambia segun la severidad y el estado de conciencia.',
          },
          {
            tipo: 'pasos',
            titulo: 'Adulto y niño consciente con obstruccion grave',
            items: [
              'Pregunta si se esta ahogando; el signo universal es llevarse las manos al cuello.',
              'Si no puede hablar ni toser, parate detras y aplica compresiones abdominales (maniobra de Heimlich).',
              'Coloca el puño sobre el ombligo por debajo del apendice xifoides y comprime hacia adentro y arriba.',
              'Repite hasta expulsar el objeto o hasta que el paciente pierda la conciencia.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Variantes de la maniobra',
            items: [
              'Lactante: alterna 5 golpes interescapulares con 5 compresiones toracicas; no se hacen compresiones abdominales.',
              'Embarazada u obeso: usa compresiones toracicas en lugar de abdominales.',
              'Paciente inconsciente: bajalo al piso, inicia RCP y revisa la boca antes de cada ventilacion para retirar el objeto si es visible.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'No barridos a ciegas',
            texto:
              'Nunca metas el dedo a barrer la boca sin ver el objeto: puedes empujarlo mas adentro. Solo retira lo que veas claramente.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Cadena de supervivencia', definicion: 'Secuencia de acciones que maximiza la supervivencia al paro cardiaco.' },
      { termino: 'Respiracion agonica', definicion: 'Boqueo reflejo que no es ventilacion eficaz; signo de paro.' },
      { termino: 'Fraccion de compresion toracica', definicion: 'Porcentaje del tiempo de RCP dedicado a comprimir; meta mayor al 60%.' },
      { termino: 'Ritmo desfibrilable', definicion: 'Fibrilacion ventricular o taquicardia ventricular sin pulso que responde al DEA.' },
      { termino: 'Maniobra de Heimlich', definicion: 'Compresiones abdominales para desobstruir la via aerea en el adulto consciente.' },
      { termino: 'Reexpansion completa', definicion: 'Permitir que el torax regrese a su forma entre compresiones para favorecer el llenado cardiaco.' },
    ],
    flashcards: [
      { frente: 'Frecuencia de compresiones en RCP de alta calidad', reverso: '100 a 120 por minuto.' },
      { frente: 'Profundidad de compresion en el adulto', reverso: 'Al menos 5 cm, sin exceder 6 cm.' },
      { frente: 'Relacion compresion/ventilacion con un rescatador en el adulto', reverso: '30:2.' },
      { frente: 'Relacion compresion/ventilacion con dos rescatadores en el niño', reverso: '15:2.' },
      { frente: 'Que es la respiracion agonica', reverso: 'Boqueo reflejo que NO es respiracion eficaz; indica paro.' },
      { frente: 'Cada cuanto se cambia de compresor', reverso: 'Cada 2 minutos para evitar la fatiga.' },
      { frente: 'Ubicacion de los parches del DEA en el adulto', reverso: 'Infraclavicular derecho y linea axilar media izquierda.' },
      { frente: 'Maniobra de desobstruccion en el lactante', reverso: '5 golpes interescapulares alternados con 5 compresiones toracicas.' },
      { frente: 'Que NO debes hacer al buscar un cuerpo extraño en la boca', reverso: 'Barridos a ciegas; solo retira lo que veas.' },
    ],
    quiz: [
      {
        pregunta: 'Encuentras a un adulto que no responde y solo boquea de forma ocasional. Que haces?',
        opciones: ['Esperar a ver si recupera la respiracion', 'Iniciar RCP porque el boqueo es signo de paro', 'Dar dos ventilaciones y reevaluar 1 minuto', 'Colocarlo en posicion de recuperacion'],
        correcta: 1,
        explicacion: 'La respiracion agonica es un reflejo del tronco encefalico, no ventilacion eficaz. Es signo de paro; inicia compresiones de inmediato.',
      },
      {
        pregunta: 'Cual es la profundidad correcta de las compresiones en un adulto?',
        opciones: ['2 a 3 cm', '3 a 4 cm', 'Al menos 5 cm sin pasar de 6', 'Mas de 7 cm'],
        correcta: 2,
        explicacion: 'La profundidad recomendada es al menos 5 cm; pasar de 6 cm aumenta el riesgo de lesion sin mejorar el flujo.',
      },
      {
        pregunta: 'Despues de que el DEA entrega una descarga, lo correcto es:',
        opciones: ['Reanalizar el ritmo de inmediato', 'Verificar pulso 30 segundos', 'Reanudar compresiones de inmediato por 2 minutos', 'Dar 5 ventilaciones'],
        correcta: 2,
        explicacion: 'Tras la descarga se reanudan las compresiones de inmediato durante 2 minutos antes del siguiente analisis, para no perder presion de perfusion coronaria.',
      },
      {
        pregunta: 'En una mujer embarazada que se atraganta y no puede hablar, la maniobra adecuada es:',
        opciones: ['Compresiones abdominales (Heimlich)', 'Compresiones toracicas', 'Golpes en la espalda solamente', 'No intervenir hasta que pierda la conciencia'],
        correcta: 1,
        explicacion: 'En embarazadas y personas obesas se usan compresiones toracicas, ya que el abdomen gravido impide la maniobra abdominal segura.',
      },
      {
        pregunta: 'Por que es perjudicial la ventilacion excesiva durante la RCP?',
        opciones: ['Provoca hiperoxia toxica inmediata', 'Aumenta la presion intratoracica y reduce el retorno venoso', 'Enfria al paciente', 'No tiene ningun efecto'],
        correcta: 1,
        explicacion: 'Ventilar de mas eleva la presion dentro del torax, disminuye el retorno venoso al corazon y baja el gasto generado por las compresiones.',
      },
      {
        pregunta: 'Un paciente tiene un parche transdermico de nitroglicerina en el torax donde va el parche del DEA. Que haces?',
        opciones: ['Colocar el parche del DEA encima', 'Retirar el parche de medicamento y limpiar la piel antes', 'No usar el DEA', 'Cambiar la posicion del parche a la espalda'],
        correcta: 1,
        explicacion: 'El parche de medicamento puede causar quemaduras y dispersar la energia; se retira y se limpia la piel antes de colocar el parche del DEA.',
      },
      {
        pregunta: 'Cual es la meta de la fraccion de compresion toracica?',
        opciones: ['Menor al 30%', 'Alrededor del 50%', 'Mayor al 60%, idealmente 80%', 'No importa mientras se desfibrile'],
        correcta: 2,
        explicacion: 'La fraccion de compresion debe ser mayor al 60%; mientras mas tiempo se comprime, mejor se mantiene la presion de perfusion coronaria.',
      },
    ],
  },
  {
    id: 'hemorragias-shock-basico',
    numero: '2.5',
    titulo: 'Control de Hemorragias y Manejo Basico del Shock',
    icono: '🩸',
    duracion: '55 min',
    resumen:
      'La hemorragia es la primera causa de muerte evitable en trauma. Reconocerla, detenerla a tiempo y entender la cascada del shock cambia el desenlace del paciente.',
    objetivos: [
      'Diferenciar los tipos de hemorragia y su gravedad.',
      'Aplicar la secuencia de control de hemorragias: presion directa, empaquetamiento y torniquete.',
      'Explicar la fisiopatologia y las fases del shock hipovolemico.',
      'Reconocer los signos de shock compensado y descompensado para actuar antes del colapso.',
    ],
    secciones: [
      {
        titulo: 'Tipos de hemorragia',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La hemorragia puede ser externa (visible) o interna (oculta y peligrosa). Segun el vaso afectado, tiene caracteristicas distintas que orientan su gravedad.',
          },
          {
            tipo: 'tabla',
            titulo: 'Clasificacion por origen vascular',
            headers: ['Tipo', 'Caracteristicas', 'Gravedad'],
            filas: [
              ['Arterial', 'Sangre roja brillante que sale a chorros pulsatiles', 'La mas grave, dificil de controlar'],
              ['Venosa', 'Sangre roja oscura, flujo continuo y constante', 'Moderada a grave segun el vaso'],
              ['Capilar', 'Rezumamiento lento en sabana', 'Leve, suele autolimitarse'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Sitios de hemorragia interna oculta peligrosa',
            items: [
              'Torax: cada hemitorax aloja gran volumen sanguineo.',
              'Abdomen: el bazo y el higado sangran de forma masiva.',
              'Pelvis: las fracturas pueden producir hemorragia exsanguinante.',
              'Femur: una fractura cerrada puede perder mas de un litro de sangre.',
              'Retroperitoneo: sangrado silencioso de dificil deteccion.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'La hemorragia interna engaña',
            texto:
              'No hay sangre visible, pero el paciente entra en shock. Sospechala ante un mecanismo de alta energia con taquicardia, palidez y deterioro progresivo sin una causa externa evidente.',
          },
        ],
      },
      {
        titulo: 'Secuencia de control de hemorragias',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Escalonamiento del control',
            items: [
              'Presion directa firme y sostenida sobre la herida con apositos.',
              'Si no cede, empaqueta la herida (packing) introduciendo gasa hasta el fondo y mantén presion.',
              'En extremidades con sangrado que amenaza la vida, coloca un torniquete proximal a la herida.',
              'Aplica un vendaje compresivo para mantener la hemostasia lograda.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Colocacion del torniquete',
            headers: ['Aspecto', 'Recomendacion'],
            filas: [
              ['Ubicacion', 'De 5 a 7 cm por encima de la herida, nunca sobre una articulacion'],
              ['Apriete', 'Hasta que cese el sangrado y desaparezca el pulso distal'],
              ['Hora de colocacion', 'Anotar la hora en el torniquete y en el reporte'],
              ['No aflojar', 'Una vez colocado por hemorragia masiva, no se afloja en campo'],
              ['Dolor', 'Es normal que duela; eso no es motivo para retirarlo'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'El torniquete salva vidas',
            texto:
              'El miedo historico a la perdida del miembro fue exagerado. La evidencia militar demostro que un torniquete colocado a tiempo salva la vida con bajo riesgo de daño si el tiempo de isquemia se mantiene razonable. Ante hemorragia exsanguinante en extremidad, colocalo sin dudar.',
          },
        ],
      },
      {
        titulo: 'Fisiopatologia del shock',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El shock es un estado de hipoperfusion tisular: las celulas no reciben suficiente oxigeno para su metabolismo. Sin oxigeno, la celula pasa a metabolismo anaerobio, produce acido lactico y, si no se corrige, muere. El shock es un proceso, no un numero de presion.',
          },
          {
            tipo: 'diagrama',
            clave: 'shock',
          },
          {
            tipo: 'lista',
            titulo: 'Tipos de shock (clasificacion general)',
            items: [
              'Hipovolemico: perdida de volumen (hemorragia, deshidratacion).',
              'Cardiogenico: falla de la bomba cardiaca (infarto extenso).',
              'Distributivo: vasodilatacion masiva (septico, anafilactico, neurogenico).',
              'Obstructivo: obstaculo al flujo (neumotorax a tension, taponamiento, embolia pulmonar).',
            ],
          },
          {
            tipo: 'formula',
            texto: 'Aporte de oxigeno = Gasto cardiaco x Contenido arterial de oxigeno',
            nota: 'Cualquier caida del gasto cardiaco o del contenido de oxigeno reduce el aporte tisular y desencadena shock.',
          },
        ],
      },
      {
        titulo: 'Fases del shock hipovolemico',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Fases segun la perdida de volumen',
            headers: ['Fase', 'Perdida', 'Signos'],
            filas: [
              ['Compensado (clase I-II)', 'Hasta 30%', 'Taquicardia, piel fria, ansiedad, TA normal o limitrofe'],
              ['Descompensado (clase III)', '30 a 40%', 'Hipotension, taquicardia marcada, confusion, oliguria'],
              ['Irreversible (clase IV)', 'Mayor a 40%', 'Bradicardia terminal, inconsciencia, fallo multiorganico'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Signos tempranos a no pasar por alto',
            items: [
              'Taquicardia: el primer mecanismo de compensacion.',
              'Piel palida, fria y diaforetica por vasoconstriccion.',
              'Llenado capilar prolongado.',
              'Ansiedad o inquietud por hipoxia cerebral incipiente.',
              'Sed intensa.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Triada de la muerte en trauma',
            texto:
              'Hipotermia, acidosis y coagulopatia se potencian entre si y empeoran la hemorragia. Por eso, ademas de detener el sangrado, hay que abrigar al paciente: mantener la temperatura es parte del tratamiento del shock.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Hemorragia arterial', definicion: 'Sangrado rojo brillante y pulsatil; el mas grave y dificil de controlar.' },
      { termino: 'Empaquetamiento', definicion: 'Introducir gasa en una herida profunda hasta el fondo para comprimir desde dentro.' },
      { termino: 'Torniquete', definicion: 'Dispositivo proximal que detiene el flujo arterial en hemorragia exsanguinante de extremidad.' },
      { termino: 'Shock', definicion: 'Hipoperfusion tisular con aporte insuficiente de oxigeno a las celulas.' },
      { termino: 'Metabolismo anaerobio', definicion: 'Produccion de energia sin oxigeno que genera acido lactico y acidosis.' },
      { termino: 'Triada de la muerte', definicion: 'Hipotermia, acidosis y coagulopatia que se retroalimentan en el trauma grave.' },
    ],
    flashcards: [
      { frente: 'Como es la hemorragia arterial', reverso: 'Roja brillante, en chorros pulsatiles; la mas grave.' },
      { frente: 'Primer paso del control de hemorragia externa', reverso: 'Presion directa firme y sostenida.' },
      { frente: 'Donde se coloca el torniquete', reverso: '5 a 7 cm por encima de la herida, nunca sobre una articulacion.' },
      { frente: 'Por que NO se afloja un torniquete en campo', reverso: 'Reanudar el flujo provoca nueva hemorragia y libera metabolitos toxicos.' },
      { frente: 'Primer signo de compensacion del shock', reverso: 'Taquicardia.' },
      { frente: 'Cuando cae la presion en el shock hipovolemico', reverso: 'Tarde, en la fase descompensada, tras perder mas del 30% del volumen.' },
      { frente: 'Que es la triada de la muerte', reverso: 'Hipotermia, acidosis y coagulopatia.' },
      { frente: 'Tipo de shock por neumotorax a tension', reverso: 'Obstructivo.' },
    ],
    quiz: [
      {
        pregunta: 'Cual es la conducta correcta ante una hemorragia exsanguinante en el antebrazo que no cede a la presion directa?',
        opciones: ['Elevar el brazo y esperar', 'Colocar un torniquete proximal a la herida', 'Aplicar hielo', 'Suturar de inmediato'],
        correcta: 1,
        explicacion: 'Ante hemorragia que amenaza la vida en una extremidad y que no cede a la presion, se coloca torniquete proximal sin demora.',
      },
      {
        pregunta: 'Un paciente con TA 110/70, FC 124, piel fria y ansioso tras una colision. La fase de shock mas probable es:',
        opciones: ['No tiene shock', 'Shock compensado', 'Shock descompensado', 'Shock irreversible'],
        correcta: 1,
        explicacion: 'TA aun normal con taquicardia, piel fria y ansiedad indica shock compensado: el cuerpo mantiene la presion a costa de compensar.',
      },
      {
        pregunta: 'Por que NO se debe aflojar un torniquete colocado por hemorragia masiva en el medio prehospitalario?',
        opciones: ['Porque ya no sirve', 'Porque se reanuda la hemorragia y se liberan metabolitos toxicos acumulados', 'Porque duele menos apretado', 'Porque pierde la hora de colocacion'],
        correcta: 1,
        explicacion: 'Aflojarlo reinicia el sangrado y libera de golpe acidos y potasio del territorio isquemico; se deja hasta el control definitivo hospitalario.',
      },
      {
        pregunta: 'Cual es el tipo de shock causado por un neumotorax a tension?',
        opciones: ['Hipovolemico', 'Cardiogenico', 'Distributivo', 'Obstructivo'],
        correcta: 3,
        explicacion: 'El neumotorax a tension obstruye el retorno venoso al corazon; es una causa de shock obstructivo.',
      },
      {
        pregunta: 'Cual de los siguientes es un sitio de hemorragia interna oculta capaz de causar shock sin sangrado visible?',
        opciones: ['Cuero cabelludo', 'Pelvis', 'Mano', 'Pabellon auricular'],
        correcta: 1,
        explicacion: 'Las fracturas pelvicas pueden producir hemorragia masiva interna sin sangre externa visible.',
      },
      {
        pregunta: 'Por que es importante abrigar a un paciente en shock por trauma?',
        opciones: ['Por confort unicamente', 'Porque la hipotermia agrava la acidosis y la coagulopatia (triada de la muerte)', 'Para subir la presion directamente', 'No es importante'],
        correcta: 1,
        explicacion: 'La hipotermia forma parte de la triada de la muerte; empeora la coagulacion y la acidosis, por lo que mantener la temperatura es parte del tratamiento.',
      },
      {
        pregunta: 'Que ocurre a nivel celular cuando falta oxigeno por hipoperfusion?',
        opciones: ['La celula entra en metabolismo anaerobio y produce acido lactico', 'La celula deja de necesitar energia', 'Se acelera el metabolismo aerobio', 'No hay cambios'],
        correcta: 0,
        explicacion: 'Sin oxigeno la celula recurre al metabolismo anaerobio, genera acido lactico y, de no corregirse, muere.',
      },
    ],
  },
  {
    id: 'trauma-musculoesqueletico',
    numero: '2.6',
    titulo: 'Trauma Musculoesqueletico e Inmovilizacion',
    icono: '🦴',
    duracion: '50 min',
    resumen:
      'Las lesiones de huesos, articulaciones y tejidos blandos rara vez matan, pero mal manejadas causan dolor, hemorragia y discapacidad. La inmovilizacion correcta previene el daño secundario.',
    objetivos: [
      'Diferenciar fracturas, luxaciones y esguinces por sus signos clinicos.',
      'Aplicar los principios generales de inmovilizacion con ferulas.',
      'Reconocer las lesiones que amenazan la extremidad y requieren prioridad.',
      'Ejecutar los principios de la inmovilizacion espinal con criterio.',
    ],
    secciones: [
      {
        titulo: 'Tipos de lesion musculoesqueletica',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Diferenciacion clinica',
            headers: ['Lesion', 'Definicion', 'Signos clave'],
            filas: [
              ['Fractura', 'Ruptura de la continuidad del hueso', 'Dolor, deformidad, crepitacion, impotencia funcional'],
              ['Luxacion', 'Perdida de contacto entre superficies articulares', 'Deformidad articular, bloqueo del movimiento, dolor intenso'],
              ['Esguince', 'Lesion de ligamentos por estiramiento o desgarro', 'Dolor, edema, equimosis, inestabilidad'],
              ['Distension', 'Lesion de musculo o tendon', 'Dolor a la contraccion, espasmo'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Clasificacion de fracturas',
            items: [
              'Cerrada: la piel permanece integra.',
              'Abierta o expuesta: el hueso comunica con el exterior, alto riesgo de infeccion y hemorragia.',
              'Conminuta: el hueso se fragmenta en multiples pedazos.',
              'En tallo verde: incompleta, tipica del niño por hueso flexible.',
              'Por estres: microfracturas por sobrecarga repetida.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Los seis signos de fractura',
            texto:
              'Dolor, edema, deformidad, crepitacion, equimosis e impotencia funcional. No siempre estan todos; la ausencia de deformidad no descarta una fractura.',
          },
        ],
      },
      {
        titulo: 'Valoracion neurovascular',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Toda lesion de extremidad exige valorar la funcion neurovascular distal antes y despues de inmovilizar. Una ferula mal colocada puede comprometer la circulacion o un nervio.',
          },
          {
            tipo: 'pasos',
            titulo: 'Evaluacion de los 5 puntos distales',
            items: [
              'Pulso distal a la lesion.',
              'Llenado capilar.',
              'Color y temperatura de la piel.',
              'Sensibilidad (que sienta el tacto).',
              'Movilidad (que pueda mover los dedos).',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Sindrome compartimental',
            texto:
              'Dolor desproporcionado, palidez, parestesias, ausencia de pulso y paralisis (las 5 P) indican aumento de presion dentro de un compartimento muscular. Es una urgencia: afloja vendajes y traslada con prioridad.',
          },
        ],
      },
      {
        titulo: 'Principios de inmovilizacion',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Reglas generales del entablillado',
            items: [
              'Inmoviliza la articulacion proximal y la distal a la fractura.',
              'En luxacion, inmoviliza la articulacion afectada y el hueso de cada lado.',
              'Valora pulso, sensibilidad y movilidad antes y despues de la ferula.',
              'Acolchona las prominencias oseas para evitar lesiones por presion.',
              'No intentes reducir fracturas; alinea solo si no hay pulso distal y con traccion suave.',
              'Cubre las heridas abiertas con aposito esteril antes de inmovilizar.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Tipos de ferula',
            headers: ['Ferula', 'Uso tipico'],
            filas: [
              ['Rigida (tablilla)', 'Fracturas de huesos largos'],
              ['Moldeable (SAM)', 'Se adapta a la forma de la extremidad'],
              ['De vacio', 'Se ajusta al contorno y endurece al extraer aire'],
              ['De traccion', 'Fractura cerrada de femur (diafisis)'],
              ['Cabestrillo y vendaje', 'Lesiones de clavicula y humero'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Ferula de traccion',
            texto:
              'Indicada en fractura cerrada aislada de la diafisis del femur. Contrarresta el espasmo muscular que cabalga los fragmentos, reduce el dolor, la hemorragia y el daño a tejidos. No usar en fractura de cadera, rodilla o pelvis.',
          },
        ],
      },
      {
        titulo: 'Inmovilizacion espinal',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La columna protege la medula espinal. Ante un mecanismo sugestivo, se restringe el movimiento para evitar convertir una lesion osea en una lesion medular. La tendencia actual es la restriccion selectiva basada en criterios, no la inmovilizacion automatica de todos.',
          },
          {
            tipo: 'diagrama',
            clave: 'columna',
          },
          {
            tipo: 'lista',
            titulo: 'Criterios para restringir el movimiento espinal',
            items: [
              'Alteracion del estado mental o intoxicacion.',
              'Dolor o hipersensibilidad en la linea media de la columna.',
              'Deficit neurologico focal (hormigueo, debilidad, paralisis).',
              'Deformidad anatomica de la columna.',
              'Lesion distractora que impida valorar de forma confiable.',
            ],
          },
          {
            tipo: 'pasos',
            titulo: 'Tecnica basica de restriccion espinal',
            items: [
              'Estabilizacion manual de la cabeza en posicion neutra desde el primer contacto.',
              'Colocacion de collarin cervical del tamaño adecuado.',
              'Movilizacion en bloque (log roll) con varios rescatadores coordinados.',
              'Aseguramiento al dispositivo (tabla o ferula espinal) con correas e inmovilizadores laterales.',
              'Reevaluar la funcion neurovascular en las cuatro extremidades.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Posicion neutra y excepciones',
            texto:
              'La cabeza se lleva a neutro alineado con el cuerpo, salvo que el movimiento provoque dolor, resistencia, espasmo o deficit nuevo; en ese caso se inmoviliza en la posicion encontrada.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Fractura expuesta', definicion: 'Fractura en la que el hueso comunica con el exterior; alto riesgo de infeccion.' },
      { termino: 'Luxacion', definicion: 'Perdida de contacto entre las superficies de una articulacion.' },
      { termino: 'Esguince', definicion: 'Lesion ligamentaria por estiramiento o desgarro sin ruptura osea.' },
      { termino: 'Sindrome compartimental', definicion: 'Aumento de presion en un compartimento muscular que compromete la circulacion; urgencia.' },
      { termino: 'Ferula de traccion', definicion: 'Dispositivo para fractura cerrada de diafisis femoral que contrarresta el espasmo muscular.' },
      { termino: 'Movilizacion en bloque', definicion: 'Tecnica coordinada (log roll) que mueve la columna como una unidad.' },
    ],
    flashcards: [
      { frente: 'Diferencia entre fractura cerrada y abierta', reverso: 'Cerrada: piel integra. Abierta: el hueso comunica con el exterior.' },
      { frente: 'Que articulaciones se inmovilizan en una fractura', reverso: 'La proximal y la distal al foco de fractura.' },
      { frente: 'Que se valora antes y despues de colocar una ferula', reverso: 'Pulso, sensibilidad y movilidad distales.' },
      { frente: 'Cuales son las 5 P del sindrome compartimental', reverso: 'Dolor (pain), palidez, parestesias, ausencia de pulso y paralisis.' },
      { frente: 'Indicacion de la ferula de traccion', reverso: 'Fractura cerrada aislada de la diafisis del femur.' },
      { frente: 'Cuando NO usar ferula de traccion', reverso: 'Fractura de cadera, rodilla, pelvis o fractura expuesta de femur.' },
      { frente: 'Fractura tipica del niño por hueso flexible', reverso: 'En tallo verde.' },
      { frente: 'Que es el log roll', reverso: 'Movilizacion en bloque coordinada que mantiene la columna alineada.' },
    ],
    quiz: [
      {
        pregunta: 'Al inmovilizar una fractura de tibia, que estructuras debes incluir en la ferula?',
        opciones: ['Solo el sitio de fractura', 'La articulacion proximal y la distal', 'Toda la pierna y la cadera siempre', 'Unicamente el tobillo'],
        correcta: 1,
        explicacion: 'La regla del entablillado es inmovilizar la articulacion proximal y la distal al foco de fractura para evitar el movimiento de los fragmentos.',
      },
      {
        pregunta: 'Un paciente con fractura de antebrazo entablillada presenta dolor creciente, palidez y perdida del pulso radial. Sospechas:',
        opciones: ['Esguince asociado', 'Sindrome compartimental', 'Distension muscular', 'Cuadro normal posterior a la ferula'],
        correcta: 1,
        explicacion: 'Las 5 P (dolor, palidez, parestesias, ausencia de pulso, paralisis) apuntan a sindrome compartimental: afloja vendajes y traslada con prioridad.',
      },
      {
        pregunta: 'En cual de estas situaciones esta indicada la ferula de traccion?',
        opciones: ['Fractura de pelvis', 'Fractura expuesta de femur', 'Fractura cerrada de la diafisis femoral', 'Luxacion de cadera'],
        correcta: 2,
        explicacion: 'La ferula de traccion se usa solo en fractura cerrada aislada de la diafisis del femur; esta contraindicada en pelvis, cadera y fracturas expuestas.',
      },
      {
        pregunta: 'Segun los criterios de restriccion espinal selectiva, cual SI justifica inmovilizar la columna?',
        opciones: ['Paciente alerta, sin dolor y sin deficit', 'Deficit neurologico focal nuevo', 'Mecanismo menor sin sintomas', 'Dolor solo en una mano por herida'],
        correcta: 1,
        explicacion: 'Un deficit neurologico focal es criterio claro para restringir el movimiento espinal; el paciente alerta sin dolor ni deficit puede no requerirlo.',
      },
      {
        pregunta: 'Cual es la posicion correcta de la cabeza durante la inmovilizacion cervical en general?',
        opciones: ['Flexionada hacia el pecho', 'Extendida hacia atras', 'Neutra alineada con el cuerpo', 'Rotada hacia el lado sano'],
        correcta: 2,
        explicacion: 'La cabeza se lleva a posicion neutra alineada con el cuerpo, salvo que aparezca dolor, resistencia o deficit nuevo, caso en que se deja como se encontro.',
      },
      {
        pregunta: 'Una fractura abierta debe manejarse antes de inmovilizar con:',
        opciones: ['Reduccion inmediata del hueso', 'Aposito esteril sobre la herida', 'Aplicacion de torniquete siempre', 'Lavado con agua a presion'],
        correcta: 1,
        explicacion: 'La herida de una fractura expuesta se cubre con aposito esteril antes de inmovilizar para reducir el riesgo de infeccion.',
      },
      {
        pregunta: 'Cual de los siguientes NO es uno de los seis signos clasicos de fractura?',
        opciones: ['Crepitacion', 'Deformidad', 'Fiebre', 'Impotencia funcional'],
        correcta: 2,
        explicacion: 'Los seis signos son dolor, edema, deformidad, crepitacion, equimosis e impotencia funcional. La fiebre no forma parte de ellos.',
      },
    ],
  },
  {
    id: 'urgencias-medicas-comunes',
    numero: '2.7',
    titulo: 'Urgencias Medicas Comunes',
    icono: '🩺',
    duracion: '55 min',
    resumen:
      'La mayoria de los servicios prehospitalarios son medicos, no traumaticos. Reconocer los patrones del sincope, el dolor toracico, la disnea, el dolor abdominal y la alteracion mental orienta el tratamiento correcto.',
    objetivos: [
      'Abordar de forma sistematica las urgencias medicas mas frecuentes.',
      'Aplicar la nemotecnia AEIOU-TIPS ante la alteracion del estado mental.',
      'Reconocer datos de alarma en dolor toracico y disnea.',
      'Diferenciar las causas comunes de sincope y dolor abdominal.',
    ],
    secciones: [
      {
        titulo: 'Sincope',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El sincope es la perdida transitoria de la conciencia por hipoperfusion cerebral global, con recuperacion espontanea y completa. Lo importante es distinguir el sincope benigno del que esconde una causa grave.',
          },
          {
            tipo: 'tabla',
            titulo: 'Causas frecuentes de sincope',
            headers: ['Tipo', 'Mecanismo', 'Ejemplo'],
            filas: [
              ['Vasovagal', 'Reflejo que baja FC y TA', 'Dolor, emocion, calor, bipedestacion prolongada'],
              ['Ortostatico', 'Caida de TA al incorporarse', 'Deshidratacion, medicamentos'],
              ['Cardiaco', 'Arritmia o falla de bomba', 'Bloqueo, taquiarritmia, estenosis aortica'],
              ['Neurologico', 'Eventos cerebrales', 'Mas bien causa de sintomas focales que de sincope puro'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Banderas rojas del sincope',
            texto:
              'Sincope durante el esfuerzo, sin prodromos, con dolor toracico, palpitaciones o antecedente de muerte subita familiar sugiere causa cardiaca: traslada y vigila el ritmo.',
          },
        ],
      },
      {
        titulo: 'Dolor toracico',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El dolor toracico exige descartar causas que amenazan la vida. El sindrome coronario agudo es la prioridad, pero hay otras causas graves que no se deben pasar por alto.',
          },
          {
            tipo: 'lista',
            titulo: 'Causas potencialmente mortales',
            items: [
              'Sindrome coronario agudo (infarto, angina inestable).',
              'Diseccion aortica.',
              'Embolia pulmonar.',
              'Neumotorax a tension.',
              'Taponamiento cardiaco.',
              'Ruptura esofagica.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Caracteristicas del dolor coronario tipico',
            headers: ['Aspecto', 'Descripcion'],
            filas: [
              ['Calidad', 'Opresivo, como peso, no punzante'],
              ['Localizacion', 'Retroesternal'],
              ['Irradiacion', 'Brazo izquierdo, mandibula, espalda'],
              ['Asociados', 'Diaforesis, nausea, disnea'],
              ['Duracion', 'Mas de 20 minutos sugiere infarto'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Presentaciones atipicas',
            texto:
              'Mujeres, diabeticos y adultos mayores pueden infartarse sin dolor clasico: solo fatiga, nausea, disnea o malestar epigastrico. Mantén un umbral bajo de sospecha.',
          },
        ],
      },
      {
        titulo: 'Disnea y dolor abdominal',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La disnea es la sensacion subjetiva de falta de aire. Sus causas van desde el pulmon hasta el corazon. El dolor abdominal, por su parte, puede ser de origen visceral, somatico o referido, y su localizacion orienta el diagnostico.',
          },
          {
            tipo: 'tabla',
            titulo: 'Causas comunes de disnea',
            headers: ['Origen', 'Ejemplos', 'Pista clinica'],
            filas: [
              ['Respiratorio', 'Asma, EPOC, neumonia', 'Sibilancias, fiebre, tos'],
              ['Cardiaco', 'Edema agudo de pulmon', 'Estertores, ortopnea, antecedente cardiaco'],
              ['Alergico', 'Anafilaxia', 'Urticaria, edema, exposicion a alergeno'],
              ['Metabolico', 'Acidosis (respiracion de Kussmaul)', 'Aliento cetonico, diabetico'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Cuadrantes abdominales y sospecha',
            items: [
              'Cuadrante superior derecho: vesicula, higado.',
              'Cuadrante superior izquierdo: bazo, estomago.',
              'Cuadrante inferior derecho: apendice.',
              'Cuadrante inferior izquierdo: colon (diverticulitis).',
              'Epigastrio: pancreas, estomago, dolor coronario referido.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Abdomen agudo quirurgico',
            texto:
              'Dolor intenso, abdomen rigido en tabla, defensa, rebote y signos de shock indican un abdomen agudo que requiere traslado urgente. No administres nada por via oral.',
          },
        ],
      },
      {
        titulo: 'Alteracion del estado mental y AEIOU-TIPS',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La alteracion del estado mental tiene innumerables causas. La nemotecnia AEIOU-TIPS organiza el diagnostico diferencial para no olvidar causas tratables como la hipoglucemia.',
          },
          {
            tipo: 'tabla',
            titulo: 'Nemotecnia AEIOU-TIPS',
            headers: ['Letra', 'Significado'],
            filas: [
              ['A', 'Alcohol y otras intoxicaciones'],
              ['E', 'Epilepsia, electrolitos, encefalopatia'],
              ['I', 'Insulina (hipo o hiperglucemia)'],
              ['O', 'Oxigeno (hipoxia), opioides, sobredosis'],
              ['U', 'Uremia (falla renal)'],
              ['T', 'Trauma, temperatura (hipo o hipertermia)'],
              ['I', 'Infeccion (sepsis, meningitis)'],
              ['P', 'Psiquiatrico, envenenamiento (poisoning)'],
              ['S', 'Stroke (EVC), shock, espacio ocupante'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Siempre mide la glucosa',
            texto:
              'La hipoglucemia imita un evento vascular cerebral, una intoxicacion o una crisis psiquiatrica y es facil de revertir. Ante cualquier alteracion del estado mental, mide la glucemia capilar.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Sincope', definicion: 'Perdida transitoria de conciencia por hipoperfusion cerebral con recuperacion completa.' },
      { termino: 'Sindrome coronario agudo', definicion: 'Espectro de isquemia miocardica que incluye angina inestable e infarto.' },
      { termino: 'Disnea', definicion: 'Sensacion subjetiva de dificultad para respirar.' },
      { termino: 'Respiracion de Kussmaul', definicion: 'Respiracion profunda y rapida compensadora de la acidosis metabolica.' },
      { termino: 'Abdomen agudo', definicion: 'Dolor abdominal grave con signos peritoneales que sugiere urgencia quirurgica.' },
      { termino: 'AEIOU-TIPS', definicion: 'Nemotecnia del diagnostico diferencial de la alteracion del estado mental.' },
    ],
    flashcards: [
      { frente: 'Definicion de sincope', reverso: 'Perdida transitoria de conciencia por hipoperfusion cerebral con recuperacion completa.' },
      { frente: 'Bandera roja de sincope cardiaco', reverso: 'Sincope durante el esfuerzo, sin prodromos o con palpitaciones.' },
      { frente: 'Como es el dolor coronario tipico', reverso: 'Opresivo, retroesternal, irradiado a brazo izquierdo o mandibula, con diaforesis.' },
      { frente: 'Quienes infartan sin dolor clasico', reverso: 'Mujeres, diabeticos y adultos mayores.' },
      { frente: 'Que es la respiracion de Kussmaul', reverso: 'Respiracion profunda y rapida que compensa la acidosis metabolica.' },
      { frente: 'Que organo se sospecha en dolor del cuadrante inferior derecho', reverso: 'El apendice.' },
      { frente: 'Que significa la I de insulina en AEIOU-TIPS', reverso: 'Alteraciones de la glucosa: hipoglucemia o hiperglucemia.' },
      { frente: 'Estudio obligado en toda alteracion del estado mental', reverso: 'La glucemia capilar.' },
    ],
    quiz: [
      {
        pregunta: 'Un joven se desmaya jugando futbol, sin prodromos, y un tio murio subitamente a los 30 años. Que sospechas?',
        opciones: ['Sincope vasovagal benigno', 'Sincope de probable origen cardiaco', 'Hipoglucemia', 'Crisis de ansiedad'],
        correcta: 1,
        explicacion: 'El sincope de esfuerzo, sin prodromos y con antecedente de muerte subita familiar es una bandera roja de causa cardiaca.',
      },
      {
        pregunta: 'Cual de los siguientes NO es una causa potencialmente mortal de dolor toracico?',
        opciones: ['Diseccion aortica', 'Embolia pulmonar', 'Costocondritis', 'Neumotorax a tension'],
        correcta: 2,
        explicacion: 'La costocondritis es una causa benigna de dolor toracico; las otras tres amenazan la vida y deben descartarse primero.',
      },
      {
        pregunta: 'Una mujer diabetica de 68 años refiere nausea, fatiga y disnea sin dolor toracico. Lo prudente es:',
        opciones: ['Descartar infarto pese a la ausencia de dolor', 'Asumir indigestion y dar antiacido', 'Tranquilizarla y no trasladar', 'Indicar reposo en casa'],
        correcta: 0,
        explicacion: 'Mujeres, diabeticos y adultos mayores pueden presentar infarto atipico sin dolor; el umbral de sospecha debe ser bajo.',
      },
      {
        pregunta: 'Un paciente diabetico con respiracion profunda y rapida y aliento afrutado probablemente cursa con:',
        opciones: ['Asma', 'Acidosis metabolica (respiracion de Kussmaul)', 'Neumotorax', 'Crisis de panico'],
        correcta: 1,
        explicacion: 'La respiracion de Kussmaul con aliento cetonico es tipica de la cetoacidosis diabetica, una acidosis metabolica.',
      },
      {
        pregunta: 'En AEIOU-TIPS, que causa tratable es indispensable descartar de inmediato en toda alteracion del estado mental?',
        opciones: ['Uremia', 'Hipoglucemia', 'Stroke', 'Causa psiquiatrica'],
        correcta: 1,
        explicacion: 'La hipoglucemia imita muchos cuadros graves y se revierte facilmente; por eso siempre se mide la glucemia capilar.',
      },
      {
        pregunta: 'Un paciente con abdomen rigido en tabla, dolor intenso y signos de shock requiere:',
        opciones: ['Alimento para mejorar', 'Traslado urgente sin dar nada por via oral', 'Laxante', 'Observacion en casa 24 horas'],
        correcta: 1,
        explicacion: 'El abdomen rigido con datos peritoneales y shock indica abdomen agudo quirurgico; se traslada con urgencia y no se da nada por boca.',
      },
      {
        pregunta: 'Cual es el mecanismo del sincope vasovagal?',
        opciones: ['Arritmia maligna', 'Reflejo que disminuye la frecuencia cardiaca y la tension arterial', 'Hemorragia interna', 'Hipoxia por neumonia'],
        correcta: 1,
        explicacion: 'El sincope vasovagal se debe a un reflejo que baja la FC y la TA, reduciendo la perfusion cerebral de forma transitoria.',
      },
    ],
  },
  {
    id: 'phtls-trauma',
    numero: '2.8',
    titulo: 'Atencion Prehospitalaria del Trauma (PHTLS)',
    icono: '🚨',
    duracion: '55 min',
    resumen:
      'El PHTLS sistematiza la atencion del paciente traumatizado bajo una filosofia clara: tratar primero lo que mata primero y trasladar rapido al centro adecuado dentro del plan de oro.',
    objetivos: [
      'Realizar una evaluacion de la escena segura y estructurada.',
      'Aplicar el concepto del plan de oro y la hora dorada en el traslado.',
      'Manejar al paciente de trauma por prioridades segun la evaluacion primaria.',
      'Ejecutar un empaquetamiento y traslado eficientes hacia el centro apropiado.',
    ],
    secciones: [
      {
        titulo: 'Evaluacion de la escena',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La atencion del trauma empieza antes de tocar al paciente. La evaluacion de la escena protege al rescatador, identifica peligros y aporta informacion sobre el mecanismo de lesion.',
          },
          {
            tipo: 'lista',
            titulo: 'Componentes de la evaluacion de la escena',
            items: [
              'Seguridad: para el equipo, el paciente y los testigos.',
              'Equipo de proteccion personal segun el riesgo (biologico, quimico, trafico).',
              'Mecanismo de lesion: que paso y cuanta energia se transfirio.',
              'Numero de pacientes: define si hay que activar incidentes con multiples victimas.',
              'Recursos necesarios: apoyos, bomberos, rescate, mas unidades.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Tu seguridad primero',
            texto:
              'Un rescatador lesionado deja de ser solucion y se vuelve un paciente mas. Nunca ingreses a una escena insegura sin el control de los peligros.',
          },
        ],
      },
      {
        titulo: 'Plan de oro y hora dorada',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El concepto de la hora dorada plantea que el paciente con trauma grave tiene mejores resultados si recibe atencion definitiva (frecuentemente quirurgica) en la primera hora tras la lesion. De ahi el plan de oro prehospitalario: minimizar el tiempo en escena.',
          },
          {
            tipo: 'lista',
            titulo: 'Plan de oro del PHTLS',
            items: [
              'Limitar el tiempo en escena a 10 minutos o menos en trauma critico (plan de platino).',
              'Identificar y tratar de inmediato las amenazas vitales.',
              'Controlar la hemorragia externa con rapidez.',
              'Mantener la oxigenacion y la ventilacion.',
              'Iniciar el traslado al centro de trauma apropiado lo antes posible.',
              'Realizar las intervenciones que no detengan el traslado durante el camino.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Carga y rueda',
            texto:
              'En trauma penetrante critico, el tratamiento definitivo es el quirofano. La filosofia de cargar y rodar (load and go) prioriza el traslado rapido sobre las maniobras prolongadas en escena que solo retrasan la cirugia.',
          },
        ],
      },
      {
        titulo: 'Manejo por prioridades',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La evaluacion del trauma sigue la misma logica del XABCDE: lo que mata primero se trata primero. Cada hallazgo critico se maneja en el momento de detectarlo antes de avanzar.',
          },
          {
            tipo: 'tabla',
            titulo: 'Prioridades y acciones criticas',
            headers: ['Prioridad', 'Amenaza', 'Accion'],
            filas: [
              ['X', 'Hemorragia exsanguinante', 'Presion, empaquetamiento, torniquete'],
              ['A', 'Via aerea comprometida', 'Permeabilizar con control cervical'],
              ['B', 'Ventilacion inadecuada', 'Oxigeno, descomprimir neumotorax a tension, sellar herida soplante'],
              ['C', 'Shock', 'Control de hemorragia, abrigo, traslado'],
              ['D', 'Deterioro neurologico', 'Glasgow, pupilas, glucosa'],
              ['E', 'Exposicion', 'Buscar lesiones ocultas y prevenir hipotermia'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Herida toracica soplante',
            texto:
              'Una herida penetrante de torax que succiona aire puede generar neumotorax. Se cubre con un aposito de tres lados (valvula) que deja salir aire pero impide su entrada, vigilando que no evolucione a neumotorax a tension.',
          },
        ],
      },
      {
        titulo: 'Empaquetamiento y traslado',
        bloques: [
          {
            tipo: 'pasos',
            titulo: 'Empaquetamiento del paciente critico',
            items: [
              'Asegura el control de la columna si esta indicado.',
              'Inmoviliza fracturas que comprometan la circulacion o causen dolor severo.',
              'Cubre heridas, controla la temperatura y abriga.',
              'Fija al paciente al dispositivo de traslado de forma segura.',
              'Reevalua signos vitales y la evaluacion primaria durante el camino.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Eleccion del centro receptor',
            items: [
              'Centro de trauma para lesiones graves o mecanismo de alta energia.',
              'Considera el helicoptero o traslado aereo en tiempos largos o terreno dificil.',
              'Notifica de forma anticipada al hospital para que prepare recursos.',
              'No te detengas en un centro que no pueda dar el tratamiento definitivo.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'No te quedes jugando en la escena',
            texto:
              'Las intervenciones que no salvan la vida no deben retrasar el traslado del paciente critico. Lo que se pueda hacer en movimiento, se hace en la ambulancia.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Hora dorada', definicion: 'Periodo tras la lesion en que la atencion definitiva ofrece mejor pronostico.' },
      { termino: 'Plan de oro', definicion: 'Filosofia PHTLS de minimizar tiempo en escena y trasladar al centro adecuado.' },
      { termino: 'Carga y rueda', definicion: 'Estrategia de traslado rapido en trauma critico priorizando la cirugia.' },
      { termino: 'Tiempo en escena', definicion: 'Meta de 10 minutos o menos en el paciente de trauma critico.' },
      { termino: 'Herida soplante de torax', definicion: 'Herida penetrante que succiona aire; se maneja con aposito de tres lados.' },
      { termino: 'Centro de trauma', definicion: 'Hospital con capacidad de dar tratamiento definitivo al paciente traumatizado grave.' },
    ],
    flashcards: [
      { frente: 'Que es la hora dorada', reverso: 'Periodo tras la lesion en que la atencion definitiva da mejor pronostico.' },
      { frente: 'Meta de tiempo en escena en trauma critico', reverso: '10 minutos o menos.' },
      { frente: 'Que significa carga y rueda', reverso: 'Trasladar rapido al quirofano, evitando maniobras prolongadas en escena.' },
      { frente: 'Primer paso de la atencion del trauma', reverso: 'La evaluacion de la escena (seguridad y mecanismo).' },
      { frente: 'Como se maneja una herida soplante de torax', reverso: 'Aposito de tres lados que deja salir aire pero impide su entrada.' },
      { frente: 'Cuando trasladar a un centro de trauma', reverso: 'Lesiones graves o mecanismo de alta energia.' },
      { frente: 'Por que la seguridad de la escena es prioritaria', reverso: 'Un rescatador lesionado se convierte en otro paciente.' },
      { frente: 'Que intervenciones se hacen en camino', reverso: 'Las que no salvan la vida de inmediato y no deben retrasar el traslado.' },
    ],
    quiz: [
      {
        pregunta: 'Cual es el primer paso al llegar a un choque vehicular?',
        opciones: ['Tomar signos vitales', 'Evaluar la seguridad de la escena', 'Inmovilizar la columna', 'Canalizar una via'],
        correcta: 1,
        explicacion: 'La atencion del trauma comienza con la evaluacion de la escena: garantizar la seguridad antes de acercarse al paciente.',
      },
      {
        pregunta: 'En un paciente con herida penetrante toracica y shock, la filosofia PHTLS recomienda:',
        opciones: ['Maniobras prolongadas en escena', 'Carga y rueda hacia el centro de trauma', 'Esperar refuerzos sin trasladar', 'Reanimacion con grandes volumenes en escena'],
        correcta: 1,
        explicacion: 'El trauma penetrante critico se beneficia del quirofano; la estrategia de carga y rueda prioriza el traslado rapido.',
      },
      {
        pregunta: 'Cual es la meta de tiempo en escena para un paciente de trauma critico?',
        opciones: ['30 minutos', '20 minutos', '10 minutos o menos', 'El que sea necesario'],
        correcta: 2,
        explicacion: 'El plan de oro busca limitar el tiempo en escena a 10 minutos o menos en el trauma critico.',
      },
      {
        pregunta: 'Una herida toracica que succiona aire con cada inspiracion se maneja con:',
        opciones: ['Aposito oclusivo de cuatro lados sellado completamente', 'Aposito de tres lados que actua como valvula', 'Gasa seca simple', 'Torniquete'],
        correcta: 1,
        explicacion: 'El aposito de tres lados permite la salida de aire e impide su entrada, evitando favorecer un neumotorax a tension.',
      },
      {
        pregunta: 'Que intervencion NO debe retrasar el traslado de un paciente de trauma critico?',
        opciones: ['Control de hemorragia exsanguinante', 'Permeabilizar via aerea obstruida', 'Inmovilizacion meticulosa de una fractura de dedo', 'Descompresion de neumotorax a tension'],
        correcta: 2,
        explicacion: 'Las intervenciones que no salvan la vida, como inmovilizar una fractura menor, se realizan en camino y no deben demorar el traslado.',
      },
      {
        pregunta: 'Por que se notifica anticipadamente al hospital receptor?',
        opciones: ['Por protocolo administrativo unicamente', 'Para que prepare recursos y equipo antes de la llegada', 'Para reducir el papeleo', 'No es necesario'],
        correcta: 1,
        explicacion: 'La notificacion previa permite que el centro de trauma active y prepare quirofano, banco de sangre y equipo, ganando tiempo critico.',
      },
      {
        pregunta: 'Cual es la justificacion del concepto de la hora dorada?',
        opciones: ['Es una regla rigida de exactamente 60 minutos', 'La atencion definitiva temprana mejora el pronostico del trauma grave', 'Solo aplica a quemaduras', 'Se refiere al tiempo de descanso del rescatador'],
        correcta: 1,
        explicacion: 'La hora dorada subraya que entre mas pronto reciba el paciente la atencion definitiva, mejor su pronostico; es un principio, no un cronometro exacto.',
      },
    ],
  },
  {
    id: 'emergencias-ambientales',
    numero: '2.9',
    titulo: 'Emergencias Ambientales',
    icono: '🌡️',
    duracion: '50 min',
    resumen:
      'El ambiente puede ser tan letal como un trauma. El calor, el frio, el agua, la electricidad y los animales producen urgencias con fisiopatologia propia y manejo especifico.',
    objetivos: [
      'Diferenciar el espectro de las emergencias por calor y tratar el golpe de calor.',
      'Reconocer los grados de hipotermia y aplicar el recalentamiento adecuado.',
      'Manejar al paciente de ahogamiento con prioridad en la oxigenacion.',
      'Atender lesiones electricas y picaduras o mordeduras con seguridad.',
    ],
    secciones: [
      {
        titulo: 'Emergencias por calor',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El cuerpo disipa calor por radiacion, conduccion, conveccion y evaporacion del sudor. Cuando la produccion o la carga ambiental superan la disipacion, aparece el espectro de las emergencias por calor.',
          },
          {
            tipo: 'tabla',
            titulo: 'Espectro de las emergencias por calor',
            headers: ['Cuadro', 'Caracteristicas', 'Manejo'],
            filas: [
              ['Calambres por calor', 'Espasmos musculares dolorosos, sudoracion', 'Reposo, hidratacion con electrolitos'],
              ['Agotamiento por calor', 'Debilidad, nausea, piel humeda, temperatura normal o leve', 'Ambiente fresco, hidratacion, reposo'],
              ['Golpe de calor', 'Temperatura mayor a 40 grados, alteracion mental, piel caliente', 'Enfriamiento agresivo y traslado urgente'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'El golpe de calor es una urgencia vital',
            texto:
              'La clave es la alteracion del estado mental con temperatura muy elevada. La piel puede estar seca (clasico) o sudorosa (por esfuerzo). Enfria de inmediato: agua, hielo en axilas e ingles, retira ropa. No retrases el traslado.',
          },
        ],
      },
      {
        titulo: 'Hipotermia',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La hipotermia es el descenso de la temperatura central por debajo de 35 grados. El frio enlentece el metabolismo y, en grados severos, el corazon se vuelve irritable y propenso a arritmias.',
          },
          {
            tipo: 'tabla',
            titulo: 'Grados de hipotermia',
            headers: ['Grado', 'Temperatura central', 'Signos'],
            filas: [
              ['Leve', '32 a 35 grados', 'Escalofrios intensos, taquicardia, confusion leve'],
              ['Moderada', '28 a 32 grados', 'Cesan los escalofrios, bradicardia, somnolencia'],
              ['Severa', 'Menor a 28 grados', 'Rigidez, pulso casi imperceptible, riesgo de fibrilacion'],
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Principios del manejo',
            items: [
              'Retira al paciente del ambiente frio y quita la ropa mojada.',
              'Recalentamiento pasivo con mantas en hipotermia leve.',
              'Recalentamiento activo externo en moderada (compresas tibias en tronco).',
              'Manipula con suavidad: el corazon hipotermico es muy irritable.',
              'No declares muerto a un hipotermico hasta recalentarlo: no esta muerto hasta estar caliente y muerto.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Caliente y muerto',
            texto:
              'En hipotermia severa, el paciente puede parecer fallecido y aun ser reanimable. Continua la RCP y el recalentamiento; las decisiones de cese se toman tras recalentar.',
          },
        ],
      },
      {
        titulo: 'Ahogamiento',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El ahogamiento es la insuficiencia respiratoria por sumersion o inmersion en un liquido. La hipoxia es el problema central y el determinante del pronostico, por lo que la prioridad es restablecer la oxigenacion.',
          },
          {
            tipo: 'pasos',
            titulo: 'Manejo del paciente ahogado',
            items: [
              'Asegura tu seguridad: no te conviertas en otra victima al rescatar.',
              'Saca al paciente del agua e inicia ventilaciones cuanto antes si no respira.',
              'Considera lesion cervical si hubo clavado o trauma.',
              'Inicia RCP si no hay pulso, comenzando por la oxigenacion.',
              'Abriga: la hipotermia acompaña con frecuencia al ahogamiento.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Sindrome de ahogamiento secundario',
            texto:
              'Tras la aspiracion de agua, el paciente puede deteriorarse horas despues por edema pulmonar. Todo ahogado, aunque parezca recuperado, debe ser valorado y vigilado en el hospital.',
          },
        ],
      },
      {
        titulo: 'Lesiones electricas y mordeduras',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La corriente electrica causa daño por quemadura y por sus efectos sobre el corazon y los nervios. Las picaduras y mordeduras varian desde reacciones locales hasta envenenamiento y anafilaxia.',
          },
          {
            tipo: 'lista',
            titulo: 'Lesiones electricas',
            items: [
              'Corta la fuente de energia antes de tocar al paciente.',
              'Busca herida de entrada y de salida; el daño interno suele ser mayor al visible.',
              'Vigila arritmias: la corriente puede provocar fibrilacion ventricular.',
              'El rayo produce paro cardiaco y respiratorio; prioriza ventilar y desfibrilar.',
            ],
          },
          {
            tipo: 'tabla',
            titulo: 'Picaduras y mordeduras',
            headers: ['Agente', 'Datos clave', 'Conducta'],
            filas: [
              ['Abeja o avispa', 'Dolor local, riesgo de anafilaxia', 'Retirar aguijon, vigilar reaccion alergica'],
              ['Araña o alacran', 'Dolor, posible toxicidad sistemica', 'Inmovilizar, traslado, antiveneno hospitalario'],
              ['Serpiente', 'Marcas de colmillos, edema, dolor', 'Inmovilizar la extremidad por debajo del corazon, traslado urgente'],
              ['Mordedura de animal o humano', 'Riesgo de infeccion y rabia', 'Lavado, control de hemorragia, valoracion medica'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Mordedura de serpiente: que NO hacer',
            texto:
              'No succiones la herida, no apliques torniquete arterial, no cortes la piel ni pongas hielo. Inmoviliza, mantén la extremidad a nivel del corazon o ligeramente por debajo y traslada para recibir antiveneno.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Golpe de calor', definicion: 'Urgencia con temperatura mayor a 40 grados y alteracion mental; requiere enfriamiento agresivo.' },
      { termino: 'Agotamiento por calor', definicion: 'Cuadro de debilidad y piel humeda con temperatura casi normal, sin alteracion mental grave.' },
      { termino: 'Hipotermia', definicion: 'Temperatura central por debajo de 35 grados.' },
      { termino: 'No esta muerto hasta estar caliente y muerto', definicion: 'Principio que obliga a recalentar antes de declarar muerte por hipotermia.' },
      { termino: 'Ahogamiento', definicion: 'Insuficiencia respiratoria por sumersion; la hipoxia determina el pronostico.' },
      { termino: 'Ahogamiento secundario', definicion: 'Deterioro respiratorio tardio por edema pulmonar tras aspirar agua.' },
    ],
    flashcards: [
      { frente: 'Que distingue al golpe de calor del agotamiento por calor', reverso: 'La alteracion del estado mental con temperatura muy elevada.' },
      { frente: 'Manejo prioritario del golpe de calor', reverso: 'Enfriamiento agresivo inmediato y traslado urgente.' },
      { frente: 'A que temperatura comienza la hipotermia', reverso: 'Por debajo de 35 grados centigrados.' },
      { frente: 'Que pasa con los escalofrios en hipotermia moderada', reverso: 'Cesan; aparece bradicardia y somnolencia.' },
      { frente: 'Principio clave en hipotermia severa', reverso: 'No esta muerto hasta estar caliente y muerto: recalentar antes de cesar.' },
      { frente: 'Problema central del ahogamiento', reverso: 'La hipoxia; la prioridad es restablecer la oxigenacion.' },
      { frente: 'Primer paso ante una lesion electrica', reverso: 'Cortar la fuente de energia antes de tocar al paciente.' },
      { frente: 'Que NO hacer en mordedura de serpiente', reverso: 'No succionar, no torniquete arterial, no cortar, no hielo.' },
    ],
    quiz: [
      {
        pregunta: 'Un corredor colapsa con temperatura de 41 grados, confuso y con piel caliente. El diagnostico y manejo son:',
        opciones: ['Agotamiento por calor; hidratar y observar', 'Golpe de calor; enfriamiento agresivo y traslado urgente', 'Calambres por calor; estirar el musculo', 'Deshidratacion leve; reposo'],
        correcta: 1,
        explicacion: 'Temperatura mayor a 40 grados con alteracion mental es golpe de calor, una urgencia vital que exige enfriamiento agresivo inmediato.',
      },
      {
        pregunta: 'En un paciente con hipotermia severa que parece sin vida, lo correcto es:',
        opciones: ['Declarar la muerte de inmediato', 'Iniciar RCP y recalentar; no esta muerto hasta estar caliente y muerto', 'Recalentar muy rapido con calor directo intenso', 'Esperar sin intervenir'],
        correcta: 1,
        explicacion: 'En hipotermia severa el paciente puede ser reanimable; se mantiene la RCP y el recalentamiento, y las decisiones de cese se toman tras recalentar.',
      },
      {
        pregunta: 'Cual es el problema fisiopatologico central del ahogamiento?',
        opciones: ['La hipotermia exclusivamente', 'La hipoxia', 'La cantidad de agua tragada', 'El tipo de agua (dulce o salada)'],
        correcta: 1,
        explicacion: 'El determinante del pronostico en el ahogamiento es la hipoxia; por eso la prioridad de manejo es restablecer la oxigenacion.',
      },
      {
        pregunta: 'Por que todo paciente ahogado debe ser valorado en el hospital aunque parezca recuperado?',
        opciones: ['Por tramite administrativo', 'Por riesgo de deterioro respiratorio tardio (ahogamiento secundario)', 'Para hidratacion obligatoria', 'No es necesario si esta consciente'],
        correcta: 1,
        explicacion: 'Tras aspirar agua puede aparecer edema pulmonar horas despues; por eso se vigila al paciente aunque inicialmente parezca bien.',
      },
      {
        pregunta: 'Antes de tocar a una persona electrocutada que sigue en contacto con la fuente, debes:',
        opciones: ['Iniciar RCP de inmediato', 'Cortar o asegurar la fuente de energia', 'Mojar la zona', 'Aplicar un torniquete'],
        correcta: 1,
        explicacion: 'La seguridad es primero: hay que cortar o asegurar la energia, de lo contrario el rescatador tambien se electrocuta.',
      },
      {
        pregunta: 'Cual de estas acciones es CORRECTA ante una mordedura de serpiente?',
        opciones: ['Succionar el veneno', 'Aplicar torniquete arterial', 'Inmovilizar la extremidad y trasladar para antiveneno', 'Cortar la herida y aplicar hielo'],
        correcta: 2,
        explicacion: 'El manejo correcto es inmovilizar, mantener la extremidad a nivel del corazon o debajo y trasladar; succionar, cortar, hielo y torniquete arterial estan contraindicados.',
      },
      {
        pregunta: 'En hipotermia, por que se debe manipular al paciente con suavidad?',
        opciones: ['Por comodidad', 'Porque el corazon hipotermico es muy irritable y puede fibrilar', 'Para no despertarlo', 'Porque la piel se rompe facil'],
        correcta: 1,
        explicacion: 'El miocardio frio es muy irritable; un movimiento brusco puede desencadenar fibrilacion ventricular.',
      },
    ],
  },
  {
    id: 'triage-mci',
    numero: '2.10',
    titulo: 'Triage e Incidentes con Multiples Victimas',
    icono: '🏷️',
    duracion: '50 min',
    resumen:
      'Cuando las victimas superan a los recursos, la logica cambia: ya no se trata de hacer todo por uno, sino lo mejor para la mayoria. El triage ordena el caos para salvar mas vidas.',
    objetivos: [
      'Comprender la diferencia entre la atencion habitual y la de un incidente con multiples victimas.',
      'Aplicar el sistema START de clasificacion rapida.',
      'Interpretar el codigo de colores del triage.',
      'Describir la estructura basica del comando de incidentes.',
    ],
    secciones: [
      {
        titulo: 'Concepto de incidente con multiples victimas',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Un incidente con multiples victimas (IMV) ocurre cuando el numero de pacientes o la gravedad superan los recursos disponibles en ese momento. La filosofia de atencion se invierte: el mayor bien para el mayor numero.',
          },
          {
            tipo: 'lista',
            titulo: 'Diferencias frente a la atencion habitual',
            items: [
              'El paciente mas grave no siempre es el primero en recibir recursos.',
              'Se prioriza a quien tiene mayor probabilidad de sobrevivir con intervencion rapida.',
              'Las intervenciones iniciales son minimas: abrir via aerea y controlar hemorragia.',
              'El objetivo es clasificar rapido a todos antes de tratar a fondo a alguno.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Cambio de mentalidad',
            texto:
              'En el dia a dia se da todo por un paciente. En un IMV, gastar todos los recursos en el caso mas grave puede costar la vida de varios salvables. El triage redistribuye el esfuerzo.',
          },
        ],
      },
      {
        titulo: 'Sistema START',
        bloques: [
          {
            tipo: 'p',
            texto:
              'START (Simple Triage And Rapid Treatment) clasifica adultos en menos de 60 segundos por paciente evaluando deambulacion, respiracion, perfusion y estado mental. Solo se realizan dos acciones salvadoras durante el triage: abrir via aerea y controlar hemorragia masiva.',
          },
          {
            tipo: 'pasos',
            titulo: 'Algoritmo START',
            items: [
              'Pide que caminen quienes puedan: los que deambulan son clasificacion verde (leve).',
              'Respiracion: si no respira, abre la via aerea; si sigue sin respirar es negro; si respira mas de 30 por minuto es rojo.',
              'Perfusion: si respira menos de 30, valora pulso radial o llenado capilar; ausente o mayor a 2 segundos es rojo (controla hemorragia).',
              'Estado mental: si la perfusion es adecuada, valora si obedece ordenes simples; si no obedece es rojo; si obedece es amarillo.',
            ],
          },
          {
            tipo: 'formula',
            texto: 'Reglas rapidas: respira mas de 30 = ROJO; llenado mayor a 2 s o sin pulso radial = ROJO; no obedece ordenes = ROJO',
            nota: 'Si pasa los tres filtros (respira bien, buena perfusion, obedece) y no deambula por lesion, es AMARILLO.',
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'JumpSTART en pediatria',
            texto:
              'Para niños se usa JumpSTART, que ajusta los rangos respiratorios y añade un paso de 5 ventilaciones de rescate antes de clasificar como negro a un niño en apnea con pulso, porque su paro suele ser de origen respiratorio.',
          },
        ],
      },
      {
        titulo: 'Codigo de colores',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Categorias del triage',
            headers: ['Color', 'Prioridad', 'Significado'],
            filas: [
              ['Rojo', 'Inmediata (I)', 'Lesion critica pero salvable; atencion y traslado prioritarios'],
              ['Amarillo', 'Diferida (II)', 'Lesion seria pero estable; puede esperar un poco'],
              ['Verde', 'Menor (III)', 'Heridos leves que deambulan; los walking wounded'],
              ['Negro', 'Expectante / fallecido', 'Sin signos de vida o lesiones incompatibles con la vida'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'La categoria negra es dinamica',
            texto:
              'En un IMV, el negro incluye a fallecidos y a expectantes (heridos sin posibilidad razonable de sobrevivir con los recursos disponibles). Si la situacion mejora y llegan recursos, algunos pueden reclasificarse.',
          },
        ],
      },
      {
        titulo: 'Sistema de comando de incidentes',
        bloques: [
          {
            tipo: 'p',
            texto:
              'El sistema de comando de incidentes (SCI) es una estructura organizativa que coordina la respuesta. Establece una cadena de mando clara, evita la duplicidad de esfuerzos y permite escalar segun la magnitud del evento.',
          },
          {
            tipo: 'lista',
            titulo: 'Funciones basicas del SCI',
            items: [
              'Comando: dirige la operacion y toma decisiones globales.',
              'Operaciones: ejecuta las tareas de rescate, triage y tratamiento.',
              'Planificacion: reune informacion y prevé recursos.',
              'Logistica: provee equipo, personal e insumos.',
              'Administracion y finanzas: documenta costos y recursos.',
            ],
          },
          {
            tipo: 'lista',
            titulo: 'Areas operativas en un IMV',
            items: [
              'Area de triage: clasificacion inicial de victimas.',
              'Area de tratamiento: organizada por prioridad (rojo, amarillo, verde).',
              'Area de transporte: coordina la salida ordenada hacia los hospitales.',
              'Zona de seguridad y control de acceso.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Un solo comandante',
            texto:
              'El primer rescatador capacitado en llegar asume el comando hasta ser relevado. Una cadena de mando unica evita el caos de ordenes contradictorias en la escena.',
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Incidente con multiples victimas', definicion: 'Evento en que las victimas superan los recursos disponibles.' },
      { termino: 'START', definicion: 'Sistema de triage rapido que clasifica adultos por deambulacion, respiracion, perfusion y estado mental.' },
      { termino: 'JumpSTART', definicion: 'Adaptacion pediatrica de START con ventilaciones de rescate antes de etiquetar como negro.' },
      { termino: 'Walking wounded', definicion: 'Heridos que deambulan; se clasifican como verde (menor).' },
      { termino: 'Categoria negra', definicion: 'Fallecidos o expectantes sin posibilidad razonable de sobrevivir con los recursos actuales.' },
      { termino: 'Sistema de comando de incidentes', definicion: 'Estructura que coordina la respuesta con cadena de mando unica.' },
    ],
    flashcards: [
      { frente: 'Filosofia del triage en un IMV', reverso: 'El mayor bien para el mayor numero de victimas.' },
      { frente: 'Que evalua el sistema START', reverso: 'Deambulacion, respiracion, perfusion y estado mental.' },
      { frente: 'Frecuencia respiratoria que clasifica como rojo en START', reverso: 'Mas de 30 respiraciones por minuto.' },
      { frente: 'Las dos unicas acciones durante el triage START', reverso: 'Abrir la via aerea y controlar hemorragia masiva.' },
      { frente: 'Que significa el color verde', reverso: 'Lesion menor; heridos que deambulan (walking wounded).' },
      { frente: 'Que significa el color negro', reverso: 'Fallecido o expectante, sin posibilidad razonable de sobrevivir con los recursos disponibles.' },
      { frente: 'Para que sirve JumpSTART', reverso: 'Triage pediatrico que añade 5 ventilaciones antes de etiquetar como negro al niño en apnea con pulso.' },
      { frente: 'Quien asume el comando del incidente', reverso: 'El primer rescatador capacitado en llegar, hasta ser relevado.' },
    ],
    quiz: [
      {
        pregunta: 'Cual es la filosofia central del triage en un incidente con multiples victimas?',
        opciones: ['Atender primero al mas grave sin importar el pronostico', 'El mayor bien para el mayor numero de victimas', 'Atender por orden de llegada', 'Trasladar a todos al mismo tiempo'],
        correcta: 1,
        explicacion: 'En un IMV los recursos son limitados; el objetivo es lograr el mayor bien para el mayor numero, no agotar todo en un solo caso.',
      },
      {
        pregunta: 'En START, un paciente que respira a 36 por minuto se clasifica como:',
        opciones: ['Verde', 'Amarillo', 'Rojo', 'Negro'],
        correcta: 2,
        explicacion: 'Una frecuencia respiratoria mayor a 30 por minuto es criterio de rojo (atencion inmediata) en START.',
      },
      {
        pregunta: 'Durante el triage START, un paciente no respira. Tras abrir la via aerea sigue sin respirar. Se clasifica como:',
        opciones: ['Rojo', 'Amarillo', 'Negro', 'Verde'],
        correcta: 2,
        explicacion: 'Si tras la maniobra de apertura de via aerea el adulto no respira, se etiqueta como negro; en START no se inicia RCP durante el triage.',
      },
      {
        pregunta: 'Cuales son las unicas acciones de tratamiento permitidas durante el triage START?',
        opciones: ['Canalizar y administrar fluidos', 'Abrir via aerea y controlar hemorragia masiva', 'Inmovilizar fracturas', 'Administrar oxigeno a todos'],
        correcta: 1,
        explicacion: 'START solo permite dos acciones salvadoras rapidas: abrir la via aerea y controlar la hemorragia masiva; el resto se hace despues.',
      },
      {
        pregunta: 'Un herido camina por su cuenta y solicita ayuda por una herida en el brazo. Su clasificacion inicial es:',
        opciones: ['Rojo', 'Amarillo', 'Verde', 'Negro'],
        correcta: 2,
        explicacion: 'Quien deambula (walking wounded) se clasifica inicialmente como verde, prioridad menor, aunque debe reevaluarse.',
      },
      {
        pregunta: 'Por que JumpSTART añade ventilaciones de rescate en el niño en apnea con pulso?',
        opciones: ['Porque el paro pediatrico suele ser de origen respiratorio', 'Para ganar tiempo administrativo', 'Porque los niños no se clasifican', 'Por costumbre historica'],
        correcta: 0,
        explicacion: 'En pediatria el paro es predominantemente respiratorio; unas ventilaciones pueden revertirlo, por eso se intentan antes de etiquetar como negro.',
      },
      {
        pregunta: 'En el sistema de comando de incidentes, quien asume el mando inicial?',
        opciones: ['El medico de mayor jerarquia del hospital', 'El primer rescatador capacitado en llegar, hasta ser relevado', 'La policia siempre', 'Nadie hasta que llegue el director'],
        correcta: 1,
        explicacion: 'El primer rescatador capacitado en arribar asume el comando para mantener una cadena de mando unica, hasta que alguien lo releve formalmente.',
      },
    ],
  },
  {
    id: 'evaluacion-neurologica-avdi-glasgow',
    numero: '2.11',
    titulo: 'Evaluacion Neurologica: AVDI, Glasgow y Pupilas',
    icono: '🧠',
    duracion: '40 min',
    resumen:
      'La "D" (deficit neurologico) de la evaluacion primaria se resuelve con tres herramientas: el tamiz rapido AVDI, la escala de coma de Glasgow para cuantificar y dar tendencia, y la evaluacion pupilar. Juntas detectan el deterioro neurologico y la necesidad de proteger la via aerea.',
    objetivos: [
      'Aplicar la escala AVDI como tamiz rapido del estado de conciencia.',
      'Calcular e interpretar la escala de coma de Glasgow en el adulto y el niño.',
      'Reconocer los patrones pupilares de alarma y su significado.',
      'Usar la regla AEIOU-TIPS para buscar la causa del estado mental alterado.',
    ],
    secciones: [
      {
        titulo: 'AVDI: el tamiz rapido del estado de conciencia',
        bloques: [
          {
            tipo: 'p',
            texto:
              'AVDI (en ingles AVPU) es la valoracion mas rapida del nivel de conciencia y se hace durante la "D" de la evaluacion primaria. Clasifica al paciente en cuatro niveles segun el menor estimulo que provoca respuesta. Es ideal para el primer contacto y para reevaluar tendencia en segundos, antes de calcular el Glasgow.',
          },
          {
            tipo: 'tabla',
            titulo: 'Niveles de la escala AVDI',
            headers: ['Nivel', 'Que evalua', 'Glasgow aproximado'],
            filas: [
              ['A — Alerta', 'Ojos abiertos, responde e interactua espontaneamente', '14 a 15'],
              ['V — responde a la Voz', 'Reacciona solo al estimulo verbal (llamado)', '9 a 13'],
              ['D — responde al Dolor', 'Reacciona solo al estimulo doloroso', '6 a 8'],
              ['I — Inconsciente', 'No responde a ningun estimulo', '3 a 5'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'AVDI primero, Glasgow despues',
            texto:
              'AVDI se obtiene en segundos y orienta la gravedad de inmediato; el Glasgow cuantifica con detalle y sirve para seguir la tendencia. La correspondencia con Glasgow es aproximada (no exacta): un paciente que solo responde al Dolor ronda un Glasgow de 8, el umbral de via aerea no protegida.',
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'La "D" tambien es Dextrosa',
            texto:
              'En todo paciente con estado mental alterado mide la glucemia capilar SIEMPRE: la hipoglucemia imita a un evento vascular cerebral y se corrige en minutos. No dejes morir a nadie por no medir el azucar.',
          },
          {
            tipo: 'imagen',
            src: '',
            alt: 'Escala AVPU / AVDI',
            caption: 'Escala AVDI (AVPU): los cuatro niveles de respuesta del estado de conciencia.',
            busqueda: 'AVPU scale alert verbal pain unresponsive prehospital diagram',
          },
        ],
      },
      {
        titulo: 'Escala de Coma de Glasgow (adulto)',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La escala de coma de Glasgow (ECG) cuantifica el nivel de conciencia sumando tres respuestas: ocular (1 a 4), verbal (1 a 5) y motora (1 a 6). El total va de 3 (coma profundo) a 15 (normal). Siempre se reporta DESGLOSADO (por ejemplo O3 V4 M5 = 12), porque el componente motor es el de mayor valor pronostico y un mismo total puede significar cosas distintas.',
          },
          {
            tipo: 'tabla',
            titulo: 'Componentes de la escala de Glasgow',
            headers: ['Respuesta ocular (O)', 'Respuesta verbal (V)', 'Respuesta motora (M)'],
            filas: [
              ['4 Espontanea', '5 Orientada', '6 Obedece ordenes'],
              ['3 A la voz', '4 Confusa', '5 Localiza el dolor'],
              ['2 Al dolor', '3 Palabras inapropiadas', '4 Retira al dolor'],
              ['1 Ninguna', '2 Sonidos incomprensibles', '3 Flexion anormal (decorticacion)'],
              ['—', '1 Ninguna', '2 Extension anormal (descerebracion)'],
              ['—', '—', '1 Ninguna'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Glasgow menor o igual a 8: protege la via aerea',
            texto:
              'Un puntaje de 8 o menos indica incapacidad para proteger la via aerea (riesgo de broncoaspiracion): es el umbral clasico para considerar intubacion. En el nivel basico significa posicion de seguridad, aspiracion y apoyo ventilatorio mientras llega el soporte avanzado.',
          },
          {
            tipo: 'pasos',
            titulo: 'Ejemplo resuelto',
            items: [
              'Abre los ojos al dolor → ocular = 2.',
              'Emite sonidos incomprensibles → verbal = 2.',
              'Retira al dolor → motora = 4.',
              'Total: 2 + 2 + 4 = 8. Se reporta O2 V2 M4 = 8 (umbral de via aerea no protegida).',
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Trucos para evaluar bien',
            texto:
              'Si el paciente esta intubado, la verbal se marca con "T" (por ejemplo O2 VT M4). Aplica el estimulo doloroso de forma central (presion en el trapecio o el reborde supraorbitario) para no confundir un reflejo medular con una respuesta real. Registra siempre el desglose y la hora para ver la tendencia.',
          },
          {
            tipo: 'imagen',
            src: '',
            alt: 'Tabla de la escala de coma de Glasgow',
            caption: 'Escala de coma de Glasgow completa (ocular, verbal y motora) con su puntuacion.',
            busqueda: 'Glasgow coma scale chart eyes verbal motor scoring',
          },
        ],
      },
      {
        titulo: 'Glasgow pediatrico (modificacion)',
        bloques: [
          {
            tipo: 'p',
            texto:
              'En el niño que aun no habla, la respuesta verbal se adapta porque no puede estar "orientado". Las respuestas ocular y motora se evaluan igual que en el adulto, ajustando las ordenes a la edad.',
          },
          {
            tipo: 'tabla',
            titulo: 'Respuesta verbal pediatrica (lactante / preverbal)',
            headers: ['Puntos', 'Respuesta verbal del lactante'],
            filas: [
              ['5', 'Balbucea, sonrie, sigue objetos (apropiado)'],
              ['4', 'Llanto consolable'],
              ['3', 'Llanto inconsolable ante el estimulo'],
              ['2', 'Quejido o gruñido'],
              ['1', 'Ninguna'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'No olvides el TEP',
            texto:
              'En pediatria, el Triangulo de Evaluacion Pediatrica (apariencia, trabajo respiratorio y circulacion de la piel) da una impresion del estado neurologico y de gravedad desde la puerta, antes de tocar al niño, y complementa al Glasgow.',
          },
        ],
      },
      {
        titulo: 'Evaluacion pupilar',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Las pupilas informan del tallo cerebral y de muchas intoxicaciones. Se valora tamaño, simetria y reactividad a la luz (lo normal se resume como PIRRL: Pupilas Iguales, Redondas y Reactivas a la Luz). La anisocoria (pupilas desiguales) nueva en un paciente con deterioro es una urgencia.',
          },
          {
            tipo: 'tabla',
            titulo: 'Patrones pupilares y su significado',
            headers: ['Hallazgo', 'Causa probable'],
            filas: [
              ['Mioticas puntiformes (ambas)', 'Opioides u organofosforados (toxidrome colinergico)'],
              ['Midriaticas reactivas (ambas)', 'Simpaticomimeticos, anfetaminas, cocaina, estres'],
              ['Midriaticas fijas (ambas)', 'Hipoxia grave, paro, lesion grave del tallo'],
              ['Anisocoria (una dilatada fija)', 'Herniacion con compresion del III par; hipertension intracraneal'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'Pupila dilatada fija + deterioro = herniacion',
            texto:
              'Una pupila que se dilata y deja de reaccionar junto con caida del Glasgow sugiere herniacion cerebral. Sumada a la triada de Cushing (hipertension, bradicardia, respiracion irregular) obliga a actuar: via aerea, evitar hipoxia e hipotension y traslado al centro con neurocirugia.',
          },
        ],
      },
      {
        titulo: 'AEIOU-TIPS: causas del estado mental alterado',
        bloques: [
          {
            tipo: 'p',
            texto:
              'Cuando AVDI o Glasgow estan bajos, AEIOU-TIPS es la regla mnemotecnica para buscar la causa de forma ordenada y no quedarse solo con "esta inconsciente".',
          },
          {
            tipo: 'tabla',
            titulo: 'Regla AEIOU-TIPS',
            headers: ['Letra', 'Causa a descartar'],
            filas: [
              ['A', 'Alcohol y otras toxinas'],
              ['E', 'Epilepsia, Electrolitos, Encefalopatia'],
              ['I', 'Insulina (hipo o hiperglucemia)'],
              ['O', 'Opioides / sobredosis (Overdose), Oxigeno (hipoxia)'],
              ['U', 'Uremia (fallo renal) y otras causas metabolicas'],
              ['T', 'Trauma, Temperatura (hipo o hipertermia)'],
              ['I', 'Infeccion (sepsis, meningitis)'],
              ['P', 'Psicogeno, intoxicacion (Poisoning)'],
              ['S', 'Stroke (EVC) y Shock'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clave',
            titulo: 'Lo reversible primero',
            texto:
              'Ante todo alterado, descarta de inmediato lo que se corrige en la calle: hipoglucemia (glucometria), hipoxia (oxigeno y SpO2) y opioides (naloxona si hay bradipnea y miosis). Son causas frecuentes, rapidas de tratar y mortales si se pasan por alto.',
          },
        ],
      },
      {
        titulo: 'Fuentes y evidencia',
        bloques: [
          {
            tipo: 'fuentes',
            items: [
              { nombre: 'Glasgow Coma Scale — sitio oficial (estructura y uso)', url: 'https://www.glasgowcomascale.org/' },
              { nombre: 'PHTLS 10.ma edicion — Evaluacion del paciente', nota: 'AVDI, Glasgow y evaluacion primaria' },
              { nombre: 'Guias AHA / PALS — Evaluacion pediatrica y TEP', url: 'https://cpr.heart.org/' },
              { nombre: 'NAEMT — Evaluacion del estado mental (AEIOU-TIPS)', nota: 'Abordaje del estado mental alterado' },
            ],
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'AVDI (AVPU)', definicion: 'Tamiz rapido del estado de conciencia: Alerta, responde a la Voz, responde al Dolor, Inconsciente.' },
      { termino: 'Escala de Glasgow', definicion: 'Escala de 3 a 15 que suma respuesta ocular (4), verbal (5) y motora (6); se reporta desglosada.' },
      { termino: 'Glasgow menor o igual a 8', definicion: 'Umbral de via aerea no protegida; considerar intubacion.' },
      { termino: 'Anisocoria', definicion: 'Pupilas desiguales; con deterioro sugiere herniacion por compresion del III par.' },
      { termino: 'PIRRL', definicion: 'Pupilas Iguales, Redondas y Reactivas a la Luz: hallazgo pupilar normal.' },
      { termino: 'AEIOU-TIPS', definicion: 'Regla para buscar la causa del estado mental alterado.' },
    ],
    flashcards: [
      { frente: 'Que significan las siglas AVDI', reverso: 'Alerta, responde a la Voz, responde al Dolor, Inconsciente.' },
      { frente: 'Rango total de la escala de Glasgow', reverso: 'De 3 (coma profundo) a 15 (normal).' },
      { frente: 'Puntajes maximos de cada componente del Glasgow', reverso: 'Ocular 4, Verbal 5, Motora 6.' },
      { frente: 'Glasgow que indica via aerea no protegida', reverso: '8 o menos.' },
      { frente: 'Nivel de AVDI que corresponde aproximadamente a un Glasgow de 8', reverso: 'D (responde solo al Dolor).' },
      { frente: 'Pupila dilatada fija unilateral con deterioro sugiere…', reverso: 'Herniacion cerebral con compresion del III par.' },
      { frente: 'Primer estudio en todo estado mental alterado', reverso: 'Glucemia capilar (descartar hipoglucemia).' },
    ],
    quiz: [
      {
        pregunta: 'Un paciente solo abre los ojos y se mueve cuando se le aplica un estimulo doloroso. En AVDI se clasifica como:',
        opciones: ['A (Alerta)', 'V (responde a la Voz)', 'D (responde al Dolor)', 'I (Inconsciente)'],
        correcta: 2,
        explicacion: 'Responde unicamente al estimulo doloroso: nivel D, que corresponde aproximadamente a un Glasgow de 8.',
      },
      {
        pregunta: 'Glasgow de un paciente que abre ojos a la voz (3), esta confuso (4) y obedece ordenes (6):',
        opciones: ['ECG 11', 'ECG 12', 'ECG 13', 'ECG 14'],
        correcta: 2,
        explicacion: '3 + 4 + 6 = 13. Se reporta O3 V4 M6 = 13.',
      },
      {
        pregunta: 'Por que se reporta el Glasgow desglosado y no solo el total?',
        opciones: ['Por costumbre', 'Porque el componente motor tiene mayor valor pronostico y un mismo total puede significar cosas distintas', 'Para ahorrar tiempo', 'Porque el ocular es el mas importante'],
        correcta: 1,
        explicacion: 'El desglose (sobre todo la motora) aporta informacion pronostica que el total solo puede ocultar.',
      },
      {
        pregunta: 'Paciente con TCE que pasa de pupilas iguales a una pupila derecha dilatada y fija, con caida del Glasgow. Esto sugiere:',
        opciones: ['Intoxicacion por opioides', 'Herniacion cerebral con compresion del III par', 'Hipoglucemia', 'Crisis de ansiedad'],
        correcta: 1,
        explicacion: 'La anisocoria nueva con deterioro indica herniacion y compresion del tercer par craneal: urgencia neuroquirurgica.',
      },
      {
        pregunta: 'Mujer encontrada inconsciente con pupilas puntiformes y respiracion de 6 por minuto. La causa reversible inmediata a tratar es:',
        opciones: ['Intoxicacion por opioides (dar naloxona)', 'Evento vascular cerebral', 'Crisis hipertensiva', 'Sepsis'],
        correcta: 0,
        explicacion: 'Miosis puntiforme + bradipnea + coma es el toxidrome opioide; la naloxona titulada restaura la ventilacion.',
      },
    ],
  },
  {
    id: 'fauna-venenosa-mexico',
    numero: '2.12',
    titulo: 'Envenenamiento por Fauna de México',
    icono: '🦂',
    duracion: '40 min',
    resumen:
      'México concentra una enorme diversidad de animales ponzoñosos: serpientes, alacranes y arañas. Reconocer el cuadro, evitar las maniobras de campo dañinas y trasladar pronto al centro con antiveneno (faboterápico) salva vidas y extremidades.',
    objetivos: [
      'Diferenciar el envenenamiento por víboras (hemotóxico) del de coralillo (neurotóxico).',
      'Reconocer el alacranismo por Centruroides y su gravedad en el niño.',
      'Distinguir el latrodectismo (viuda negra) del loxoscelismo (violinista).',
      'Aplicar los principios prehospitalarios y evitar las maniobras contraindicadas.',
    ],
    secciones: [
      {
        titulo: 'Ofidios: serpientes venenosas',
        bloques: [
          {
            tipo: 'p',
            texto:
              'En México las mordeduras de importancia médica las causan dos grupos: las víboras (familia de los crotálidos: cascabel, nauyaca y cantil), con veneno hemotóxico y proteolítico, y las serpientes de coral (coralillos, familia de los elápidos), con veneno neurotóxico. El cuadro y el antiveneno difieren entre ambos.',
          },
          {
            tipo: 'tabla',
            titulo: 'Víboras vs. coralillo',
            headers: ['Característica', 'Víboras (cascabel/nauyaca)', 'Coralillo'],
            filas: [
              ['Tipo de veneno', 'Hemotóxico/proteolítico', 'Neurotóxico'],
              ['Local', 'Dolor, edema progresivo, equimosis, ampollas, necrosis', 'Escaso o nulo edema'],
              ['Sistémico', 'Coagulopatía, sangrado, choque', 'Ptosis, visión borrosa, parálisis, falla respiratoria'],
              ['Faboterápico', 'Antivipmyn', 'Coralmyn'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'El coralillo engaña',
            texto:
              'El coralillo puede dejar una marca mínima y poco dolor al inicio, pero el veneno neurotóxico produce parálisis progresiva horas después, hasta paro respiratorio. No te confíes por la ausencia de edema: vigila la vía aérea y la ventilación y traslada de inmediato.',
          },
          {
            tipo: 'imagen',
            src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Crotalus_atrox_(2).jpg?width=720',
            alt: 'Víbora de cascabel (Crotalus)',
            caption: 'Víbora de cascabel (Crotalus): veneno hemotóxico y proteolítico.',
            fuente: 'Wikimedia Commons',
            fuenteUrl: 'https://commons.wikimedia.org/wiki/File:Crotalus_atrox_(2).jpg',
            busqueda: 'Crotalus cascabel serpiente Mexico',
          },
          {
            tipo: 'imagen',
            src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Micrurus_spixii_2.jpg?width=720',
            alt: 'Serpiente de coral (Micrurus)',
            caption: 'Serpiente de coral (Micrurus): veneno neurotóxico; patrón de anillos vivos.',
            fuente: 'Wikimedia Commons',
            fuenteUrl: 'https://commons.wikimedia.org/wiki/File:Micrurus_spixii_2.jpg',
            busqueda: 'Micrurus coralillo serpiente coral Mexico',
          },
        ],
      },
      {
        titulo: 'Alacranismo (Centruroides)',
        bloques: [
          {
            tipo: 'p',
            texto:
              'La picadura de alacrán del género Centruroides es una de las intoxicaciones más frecuentes en México. El veneno es neurotóxico: libera neurotransmisores y produce un cuadro que va del dolor local intenso a manifestaciones sistémicas. Es mucho más grave en niños pequeños y ancianos.',
          },
          {
            tipo: 'tabla',
            titulo: 'Gravedad del alacranismo',
            headers: ['Grado', 'Manifestaciones'],
            filas: [
              ['I (leve)', 'Dolor y parestesias locales, sin datos sistémicos'],
              ['II (moderado)', 'Sialorrea, prurito nasal/faríngeo, inquietud, fasciculaciones'],
              ['III (grave)', 'Distrés respiratorio, nistagmo, convulsiones, arritmias, edema pulmonar'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'dosis',
            titulo: 'Faboterápico Alacramyn',
            texto:
              'El antiveneno faboterápico (Alacramyn) es el tratamiento de los casos moderados y graves, y ha reducido drásticamente la mortalidad por alacranismo en México. Se administra según la gravedad y la respuesta. Evita usar de rutina gluconato de calcio o atropina: el pilar es el antiveneno y el soporte.',
          },
          {
            tipo: 'imagen',
            src: 'https://commons.wikimedia.org/wiki/Special:FilePath/StripedBarkScorpion.jpg?width=720',
            alt: 'Alacrán del género Centruroides',
            caption: 'Alacrán de corteza (Centruroides): responsable del alacranismo en México.',
            fuente: 'Wikimedia Commons',
            fuenteUrl: 'https://commons.wikimedia.org/wiki/File:StripedBarkScorpion.jpg',
            busqueda: 'Centruroides alacran Mexico',
          },
        ],
      },
      {
        titulo: 'Arañas: viuda negra y violinista',
        bloques: [
          {
            tipo: 'tabla',
            titulo: 'Latrodectismo vs. loxoscelismo',
            headers: ['Araña', 'Cuadro', 'Manejo'],
            filas: [
              ['Viuda negra (Latrodectus)', 'Latrodectismo: dolor intenso, calambres, rigidez abdominal, diaforesis, hipertensión', 'Analgesia, benzodiacepinas; faboterápico Aracmyn en casos graves'],
              ['Violinista/reclusa (Loxosceles)', 'Loxoscelismo: lesión cutánea necrótica; rara vez hemólisis sistémica', 'Cuidado de la herida; vigilar forma sistémica'],
            ],
          },
          {
            tipo: 'callout',
            variante: 'clinico',
            titulo: 'La rigidez abdominal de la viuda negra confunde',
            texto:
              'El latrodectismo puede simular un abdomen agudo por la rigidez y el dolor. El antecedente de picadura y la diaforesis localizada orientan. El loxoscelismo, en cambio, evoluciona como una úlcera necrótica que crece en días.',
          },
          {
            tipo: 'imagen',
            src: 'https://commons.wikimedia.org/wiki/Special:FilePath/Latrodectus_mactans_eating.JPG?width=720',
            alt: 'Araña viuda negra (Latrodectus mactans)',
            caption: 'Viuda negra (Latrodectus mactans): mancha roja en reloj de arena en el abdomen.',
            fuente: 'Wikimedia Commons',
            fuenteUrl: 'https://commons.wikimedia.org/wiki/File:Latrodectus_mactans_eating.JPG',
            busqueda: 'Latrodectus mactans viuda negra',
          },
        ],
      },
      {
        titulo: 'Principios prehospitalarios',
        bloques: [
          {
            tipo: 'lista',
            titulo: 'Qué SÍ hacer',
            items: [
              'Calmar al paciente e inmovilizar la extremidad a la altura del corazón.',
              'Retirar anillos, relojes y ropa apretada antes de que progrese el edema.',
              'Limpiar la herida con agua y jabón; marcar con pluma el borde del edema y anotar la hora para vigilar su avance.',
              'Trasladar pronto al centro que disponga de antiveneno; identificar al animal con una foto a distancia segura.',
            ],
          },
          {
            tipo: 'callout',
            variante: 'alerta',
            titulo: 'Lo que NUNCA debes hacer',
            texto:
              'Nada de torniquetes, succión (boca o dispositivos), incisiones, hielo, calor, descargas eléctricas ni remedios caseros: aumentan el daño local y no eliminan el veneno. Tampoco persigas a la serpiente o el alacrán: arriesgas una segunda víctima.',
          },
          {
            tipo: 'fuentes',
            items: [
              { nombre: 'IMSS — GPC Diagnóstico y tratamiento de mordedura de serpiente', url: 'https://edumed.imss.gob.mx/pediatria/toxico/guia_pract_clin_serpientes.pdf' },
              { nombre: 'UNAM — Instituto de Biotecnología (antivenenos)', url: 'https://biotecmov.ibt.unam.mx/numeros/32/2.html' },
              { nombre: 'Goldfrank — Toxicologic Emergencies', nota: 'Envenenamiento por animales ponzoñosos' },
              { nombre: 'Bioclon / Cofepris — Faboterápicos (Antivipmyn, Alacramyn, Aracmyn, Coralmyn)', nota: 'Antivenenos de uso en México' },
            ],
          },
        ],
      },
    ],
    conceptosClave: [
      { termino: 'Víboras (crotálidos)', definicion: 'Cascabel, nauyaca y cantil; veneno hemotóxico: edema, necrosis y coagulopatía. Antiveneno: Antivipmyn.' },
      { termino: 'Coralillo', definicion: 'Elápido neurotóxico; poco edema pero parálisis progresiva. Antiveneno: Coralmyn.' },
      { termino: 'Alacranismo (Centruroides)', definicion: 'Neurotóxico; grave en niños. Tratamiento: faboterápico Alacramyn.' },
      { termino: 'Latrodectismo', definicion: 'Viuda negra: dolor, calambres y rigidez abdominal; faboterápico Aracmyn en casos graves.' },
      { termino: 'Loxoscelismo', definicion: 'Araña violinista: lesión cutánea necrótica; rara hemólisis sistémica.' },
      { termino: 'Faboterápico', definicion: 'Antiveneno de fragmentos de anticuerpo (innovación mexicana) de alta seguridad.' },
    ],
    flashcards: [
      { frente: 'Tipo de veneno de las víboras (cascabel/nauyaca)', reverso: 'Hemotóxico y proteolítico: edema, necrosis y coagulopatía.' },
      { frente: '¿Por qué el coralillo es peligroso pese a poco edema?', reverso: 'Su veneno es neurotóxico: produce parálisis progresiva y paro respiratorio.' },
      { frente: 'Antiveneno del alacranismo en México', reverso: 'Faboterápico Alacramyn.' },
      { frente: 'Cuadro típico de la viuda negra', reverso: 'Latrodectismo: dolor, calambres, rigidez abdominal y diaforesis.' },
      { frente: 'Tres maniobras prohibidas en mordedura/picadura', reverso: 'Torniquete, succión e incisión (también hielo y descargas).' },
      { frente: '¿Qué hacer con la extremidad afectada?', reverso: 'Inmovilizarla a la altura del corazón y retirar anillos/ropa apretada.' },
    ],
    quiz: [
      {
        pregunta: 'Paciente mordido por una serpiente, con marca mínima y poco dolor, que horas después presenta ptosis y dificultad respiratoria. Lo más probable es:',
        opciones: ['Mordedura de cascabel', 'Envenenamiento por coralillo (neurotóxico)', 'Reacción alérgica leve', 'Picadura de alacrán grado I'],
        correcta: 1,
        explicacion: 'El coralillo deja poco daño local pero su neurotoxina produce parálisis progresiva: vigilar vía aérea y trasladar de inmediato.',
      },
      {
        pregunta: 'Ante una mordedura de víbora en el antebrazo, una maniobra prehospitalaria CORRECTA es:',
        opciones: ['Colocar un torniquete arterial', 'Succionar el veneno', 'Inmovilizar el brazo y retirar anillos/reloj', 'Aplicar hielo y hacer una incisión'],
        correcta: 2,
        explicacion: 'Se inmoviliza la extremidad y se retiran anillos antes del edema; torniquete, succión, hielo e incisión están contraindicados.',
      },
      {
        pregunta: 'El faboterápico Alacramyn se utiliza para el envenenamiento por:',
        opciones: ['Coralillo', 'Alacrán (Centruroides)', 'Viuda negra', 'Cascabel'],
        correcta: 1,
        explicacion: 'Alacramyn es el antiveneno faboterápico contra el alacranismo por Centruroides.',
      },
      {
        pregunta: 'El alacranismo es particularmente grave en:',
        opciones: ['Adultos jóvenes sanos', 'Niños pequeños', 'Solo en ancianos', 'No tiene grupos de riesgo'],
        correcta: 1,
        explicacion: 'Los niños pequeños desarrollan con más facilidad el cuadro sistémico grave; requieren atención y antiveneno oportunos.',
      },
    ],
  },
]
