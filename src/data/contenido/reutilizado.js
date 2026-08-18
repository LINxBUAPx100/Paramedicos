// ⚠️ ARCHIVO GENERADO por scripts/mapear-legado.mjs — NO editar a mano.
// Material del temario ANTERIOR redistribuido sobre los temas del plan oficial
// de R.E.S.C.A.T.E. No se reescribió nada: cada pieza conserva su texto y lleva
// `procedencia.temaOriginal` con el tema del que venía.
//
// El reparto es AUTOMÁTICO (solapamiento de términos con peso IDF), así que la
// ubicación de cada pieza es una PROPUESTA que el cuerpo docente debe revisar
// antes de publicar. Lo escrito a mano en los otros archivos de esta carpeta
// tiene prioridad sobre lo de aquí.
//
// Regenerar:  node scripts/mapear-legado.mjs --escribir
export default {
  "m2-afe-celula": {
    "secciones": [
      {
        "titulo": "Estructura celular",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La célula eucariota está delimitada por la membrana plasmática, una bicapa lipídica con proteínas integrales y periféricas que controla selectivamente el intercambio con el medio. En su interior, el citoplasma alberga organelos especializados suspendidos en el citosol y sostenidos por el citoesqueleto."
          },
          {
            "tipo": "diagrama",
            "clave": "celula",
            "titulo": "La célula y sus organelos",
            "descripcion": "Núcleo, mitocondria, retículo, Golgi y lisosomas: cada organelo cumple una función clave en la homeostasis."
          },
          {
            "tipo": "lista",
            "titulo": "Organelos y su relevancia clínica",
            "items": [
              "Núcleo: contiene el ADN; dirige la síntesis proteica. La lesión nuclear irreversible marca el punto de no retorno de la muerte celular.",
              "Mitocondria: \"central energética\", produce ATP por fosforilación oxidativa. Su disfunción (hipoxia, cianuro) precipita el metabolismo anaerobio.",
              "Retículo endoplásmico rugoso: síntesis de proteínas de exportación (ribosomas adheridos). El liso sintetiza lípidos y detoxifica fármacos.",
              "Aparato de Golgi: empaqueta y modifica proteínas; forma vesículas de secreción.",
              "Lisosomas: digestión intracelular con enzimas hidrolíticas; su ruptura libera enzimas que autodigieren la célula (autólisis en la necrosis).",
              "Peroxisomas: degradan ácidos grasos y peróxido de hidrógeno."
            ]
          },
          {
            "tipo": "p",
            "texto": "El citoesqueleto (microfilamentos de actina, filamentos intermedios y microtúbulos) da forma, permite el movimiento y el transporte intracelular. La matriz extracelular —colágeno, elastina, proteoglicanos— provee soporte estructural y modula la señalización; su integridad es clave en la cicatrización y en la respuesta al trauma."
          }
        ],
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "titulo": "Transporte membranal",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El paso de sustancias a través de la membrana puede ser pasivo (sin gasto de ATP, a favor del gradiente) o activo (con gasto de energía, contra el gradiente). Distinguirlos explica por qué ciertas soluciones expanden o deshidratan la célula."
          },
          {
            "tipo": "tabla",
            "headers": [
              "Mecanismo",
              "Energía",
              "Ejemplo"
            ],
            "filas": [
              [
                "Difusión simple",
                "No (pasivo)",
                "O₂ y CO₂ a través de la bicapa"
              ],
              [
                "Difusión facilitada",
                "No (pasivo)",
                "Glucosa por GLUT, canales iónicos"
              ],
              [
                "Ósmosis",
                "No (pasivo)",
                "Agua a través de acuaporinas"
              ],
              [
                "Transporte activo primario",
                "Sí (ATP directo)",
                "Bomba Na⁺/K⁺ ATPasa"
              ],
              [
                "Transporte activo secundario",
                "Sí (gradiente iónico)",
                "Cotransporte Na⁺/glucosa (SGLT)"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "La bomba Na⁺/K⁺ ATPasa",
            "texto": "Expulsa 3 Na⁺ e introduce 2 K⁺ por cada ATP, manteniendo el gradiente electroquímico, el potencial de membrana en reposo (≈ −70 mV) y el volumen celular. Cuando falla el ATP (isquemia), entra Na⁺ y agua → tumefacción celular, el primer signo de lesión."
          },
          {
            "tipo": "diagrama",
            "clave": "bombanak",
            "titulo": "Bomba Na⁺/K⁺ ATPasa",
            "descripcion": "Con cada ATP la bomba expulsa 3 Na⁺ e introduce 2 K⁺: sostiene el potencial de reposo y el volumen de la célula."
          }
        ],
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "titulo": "Lesión y muerte celular",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Cuando cae el aporte de oxígeno, la lesión celular empieza siendo REVERSIBLE: se detiene la bomba Na⁺/K⁺, la célula se tumefacta y acumula lactato. Si la isquemia persiste, la lesión se vuelve IRREVERSIBLE: entra calcio de forma masiva, se activan enzimas (fosfolipasas y proteasas) y la membrana se rompe. Reconocer esta ventana es la base del \"tiempo es músculo\" y \"tiempo es cerebro\"."
          },
          {
            "tipo": "tabla",
            "titulo": "Apoptosis vs. necrosis",
            "headers": [
              "Rasgo",
              "Apoptosis",
              "Necrosis"
            ],
            "filas": [
              [
                "Energía (ATP)",
                "Requiere ATP (programada)",
                "Ocurre sin ATP"
              ],
              [
                "Membrana",
                "Se mantiene íntegra",
                "Se rompe y libera contenido"
              ],
              [
                "Inflamación",
                "Ausente",
                "Marcada"
              ],
              [
                "Patrón",
                "Células aisladas",
                "Grupos de células contiguas"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Ventana terapéutica",
            "texto": "En el IAM y el ictus el objetivo es revertir la isquemia ANTES de que la lesión sea irreversible: reperfundir el miocardio o el tejido cerebral a tiempo limita la zona de necrosis. Por eso cada minuto cuenta en el prehospitalario."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Lesión por reperfusión",
            "texto": "Al restaurar el flujo, el oxígeno que regresa genera radicales libres que pueden dañar aún más la célula (lesión por reperfusión). Por eso la reperfusión debe ser oportuna y controlada."
          }
        ],
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "titulo": "Tejido epitelial",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El epitelio se caracteriza por celulas muy juntas con escasa matriz, polaridad (cara apical y basal), avascularidad (se nutre por difusion desde el tejido conectivo subyacente) y alta capacidad de regeneracion. Descansa sobre una membrana basal que lo separa del conectivo."
          },
          {
            "tipo": "tabla",
            "titulo": "Clasificacion del epitelio por capas y forma",
            "headers": [
              "Tipo",
              "Localizacion",
              "Funcion"
            ],
            "filas": [
              [
                "Plano simple",
                "Alveolos, endotelio vascular",
                "Difusion e intercambio rapido"
              ],
              [
                "Cubico simple",
                "Tubulos renales, glandulas",
                "Secrecion y absorcion"
              ],
              [
                "Cilindrico simple",
                "Intestino, estomago",
                "Absorcion y secrecion de moco"
              ],
              [
                "Plano estratificado",
                "Piel, esofago, boca",
                "Proteccion contra abrasion"
              ],
              [
                "De transicion",
                "Vejiga, ureteres",
                "Distension sin romperse"
              ]
            ]
          },
          {
            "tipo": "p",
            "texto": "Las glandulas derivan de epitelio. Las exocrinas vierten su producto por conductos hacia una superficie (sudoriparas, salivales, pancreas exocrino); las endocrinas carecen de conducto y secretan hormonas directamente a la sangre (tiroides, suprarrenales)."
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Correlacion clinica",
            "texto": "La pared alveolar es epitelio plano simple de pocas micras: por eso el gas difunde rapido, pero tambien por eso el liquido del edema pulmonar bloquea con facilidad el intercambio gaseoso."
          }
        ],
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "titulo": "El hueso como tejido vivo",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El hueso es tejido conectivo mineralizado, vivo y en constante remodelacion. Esta formado por matriz organica (colageno) que le da flexibilidad y matriz inorganica (fosfato de calcio) que le da dureza. Contiene osteoblastos (forman hueso), osteoclastos (lo reabsorben) y osteocitos (mantienen la matriz)."
          },
          {
            "tipo": "lista",
            "titulo": "Funciones del esqueleto",
            "items": [
              "Sosten y forma del cuerpo.",
              "Proteccion de organos (craneo, costillas, columna).",
              "Movimiento como palancas para los musculos.",
              "Reserva mineral de calcio y fosforo.",
              "Hematopoyesis: la medula osea roja produce celulas sanguineas."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Acceso intraoseo",
            "texto": "La medula osea esta muy vascularizada y drena a la circulacion central. Por eso el acceso intraoseo permite infundir liquidos y farmacos cuando no se logra una via venosa, especialmente en ninos y en shock."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "titulo": "Respuesta celular al estrés",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Ante una agresión, la célula primero se adapta (hipertrofia, hiperplasia, atrofia, metaplasia). Si el estímulo persiste, sufre lesión reversible (tumefacción, esteatosis) y, superado un umbral, lesión irreversible que termina en muerte celular."
          },
          {
            "tipo": "tabla",
            "headers": [
              "",
              "Necrosis",
              "Apoptosis"
            ],
            "filas": [
              [
                "Naturaleza",
                "Patológica, no programada",
                "Programada, fisiológica o patológica"
              ],
              [
                "Energía (ATP)",
                "No requiere",
                "Requiere ATP"
              ],
              [
                "Membrana",
                "Se rompe; libera contenido",
                "Se mantiene; cuerpos apoptóticos"
              ],
              [
                "Inflamación",
                "Sí, intensa",
                "No (típicamente)"
              ]
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia"
        }
      },
      {
        "titulo": "Inflamación, reparación y coagulación",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Mediadores químicos de la inflamación",
            "items": [
              "Histamina: vasodilatación y aumento de la permeabilidad (mastocitos).",
              "Prostaglandinas: dolor, fiebre, vasodilatación (diana de los AINE).",
              "Citocinas (TNF-α, IL-1, IL-6): respuesta sistémica, fiebre; centrales en la sepsis.",
              "Sistema del complemento: opsonización, quimiotaxis y lisis (complejo de ataque a la membrana)."
            ]
          },
          {
            "tipo": "p",
            "texto": "La cascada de la coagulación se describía en dos vías: la intrínseca (contacto, medida por el TTPa) y la extrínseca (factor tisular, medida por el TP/INR), que convergen en la vía común (activación del factor X → trombina → fibrina). El modelo celular moderno integra estas vías sobre la superficie de las plaquetas en fases de iniciación, amplificación y propagación."
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Por qué importa",
            "texto": "Entender qué vía mide cada prueba (extrínseca → TP/INR; intrínseca → TTPa) explica el efecto de anticoagulantes (warfarina afecta el INR; heparina, el TTPa) y la coagulopatía del trauma y la sepsis."
          }
        ],
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia"
        }
      },
      {
        "titulo": "Sistema inmune e hipersensibilidad",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La inmunidad innata es la primera línea, rápida e inespecífica (barreras, neutrófilos, macrófagos, complemento). La adaptativa es específica y con memoria: linfocitos T (celular) y B (humoral, producen anticuerpos)."
          },
          {
            "tipo": "tabla",
            "headers": [
              "Tipo de hipersensibilidad",
              "Mecanismo",
              "Ejemplo"
            ],
            "filas": [
              [
                "I — Inmediata",
                "IgE, mastocitos, histamina",
                "Anafilaxia, alergia, asma"
              ],
              [
                "II — Citotóxica",
                "Anticuerpos contra células (IgG/IgM)",
                "Reacción transfusional, anemia hemolítica"
              ],
              [
                "III — Complejos inmunes",
                "Depósito de complejos antígeno-anticuerpo",
                "Lupus, enfermedad del suero"
              ],
              [
                "IV — Retardada",
                "Linfocitos T (no anticuerpos)",
                "Dermatitis de contacto, prueba de tuberculina"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Anafilaxia = hipersensibilidad tipo I",
            "texto": "La liberación masiva de histamina causa vasodilatación, broncoespasmo y aumento de la permeabilidad (shock distributivo). La adrenalina es el tratamiento de elección por sus efectos alfa (vasoconstricción) y beta (broncodilatación, estabilización del mastocito)."
          }
        ],
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia"
        }
      },
      {
        "titulo": "Bacteriología básica",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La tinción de Gram separa las bacterias según su pared celular: las Gram positivas (gruesa capa de peptidoglicano) se tiñen de violeta; las Gram negativas (pared fina con membrana externa de lipopolisacárido) se tiñen de rosa. La morfología las clasifica en cocos (esféricos) y bacilos (alargados)."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "El LPS de las Gram negativas",
            "texto": "El lipopolisacárido (endotoxina) de la membrana externa de las Gram negativas es un potente desencadenante de la respuesta inflamatoria sistémica y del shock séptico: activa la liberación masiva de citocinas."
          }
        ],
        "procedencia": {
          "temaOriginal": "microbiologia-sepsis"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Bomba Na⁺/K⁺ ATPasa",
        "definicion": "Transporte activo que saca 3 Na⁺ y mete 2 K⁺ por ATP; sostiene el potencial de reposo y el volumen celular.",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "termino": "Lesión irreversible",
        "definicion": "Entrada masiva de calcio y rotura de membrana tras isquemia prolongada; ya no hay recuperación celular.",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "termino": "Membrana basal",
        "definicion": "Capa de soporte que separa el epitelio del tejido conectivo subyacente.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "termino": "Matriz extracelular",
        "definicion": "Conjunto de fibras y sustancia fundamental que rodea a las celulas del conectivo.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "termino": "Sincitio funcional",
        "definicion": "Conjunto de celulas conectadas electricamente que se comportan como una unidad, como el miocardio.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "termino": "Discos intercalares",
        "definicion": "Uniones entre celulas del musculo cardiaco que permiten la conduccion electrica.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "termino": "Osteoclasto",
        "definicion": "Celula que reabsorbe el hueso durante la remodelacion.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "termino": "Hormona",
        "definicion": "Mensajero quimico liberado a la sangre que actua sobre celulas con receptores especificos.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "termino": "Insulina",
        "definicion": "Hormona que baja la glucemia al introducir glucosa en las celulas.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "termino": "Shock",
        "definicion": "Hipoperfusion tisular con aporte insuficiente de oxigeno a las celulas.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "termino": "Tonicidad",
        "definicion": "Capacidad de una solución de mover agua a través de la membrana celular.",
        "procedencia": {
          "temaOriginal": "terapia-iv-io"
        }
      },
      {
        "termino": "Shock",
        "definicion": "Hipoperfusión tisular con hipoxia celular y disfunción orgánica.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "termino": "Apoptosis",
        "definicion": "Muerte celular programada, dependiente de ATP, sin inflamación.",
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia"
        }
      },
      {
        "termino": "Necrosis",
        "definicion": "Muerte celular patológica con ruptura de membrana e inflamación.",
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia"
        }
      },
      {
        "termino": "SCI",
        "definicion": "Sistema de Comando de Incidentes: estructura modular con mando único y cinco funciones.",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "¿Qué iones mueve la bomba Na⁺/K⁺ ATPasa y en qué proporción?",
        "reverso": "Saca 3 Na⁺, mete 2 K⁺ por cada ATP.",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica",
          "porUnidad": true
        }
      },
      {
        "frente": "Que celula produce surfactante?",
        "reverso": "El neumocito tipo II.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "frente": "Que funcion tiene la bilis?",
        "reverso": "Emulsionar las grasas para que la lipasa las digiera.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "frente": "¿Qué compartimento expande principalmente el salino 0.9%?",
        "reverso": "El extracelular (no entra a la célula por ser isotónico).",
        "procedencia": {
          "temaOriginal": "terapia-iv-io"
        }
      },
      {
        "frente": "Membrana de la cricotiroidotomía: ¿entre qué cartílagos?",
        "reverso": "Entre el cartílago tiroides y el cricoides.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "frente": "Por que el potasio puede caer al tratar la CAD",
        "reverso": "La insulina mete el potasio a las celulas.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "frente": "Mecanismo de los betalactamicos",
        "reverso": "Inhiben la sintesis de la pared celular bacteriana.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Durante isquemia profunda, ¿cuál es la primera consecuencia del fallo de la bomba Na⁺/K⁺ ATPasa?",
        "opciones": [
          "Salida masiva de potasio sin consecuencias",
          "Entrada de Na⁺ y agua con tumefacción celular",
          "Aumento de la producción de ATP",
          "Alcalosis intracelular"
        ],
        "correcta": 1,
        "explicacion": "Sin ATP la bomba se detiene, el Na⁺ entra siguiendo su gradiente y arrastra agua, produciendo tumefacción (edema) celular, signo precoz de lesión.",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "pregunta": "¿Dónde ocurre la fosforilación oxidativa?",
        "opciones": [
          "Citosol",
          "Membrana mitocondrial interna",
          "Núcleo",
          "Aparato de Golgi"
        ],
        "correcta": 1,
        "explicacion": "La cadena de transporte de electrones y la ATP sintasa se ubican en la membrana mitocondrial interna.",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "pregunta": "Por que el tejido conectivo cartilaginoso cicatriza mal?",
        "opciones": [
          "Porque es muy vascularizado",
          "Porque es avascular y se nutre por difusion",
          "Porque carece de matriz",
          "Porque tiene demasiadas neuronas"
        ],
        "correcta": 1,
        "explicacion": "El cartilago es avascular y se nutre por difusion lenta desde el pericondrio, lo que limita la llegada de celulas reparadoras y enlentece su cicatrizacion.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "pregunta": "Que celulas de la epidermis participan en la defensa inmunitaria?",
        "opciones": [
          "Queratinocitos",
          "Melanocitos",
          "Celulas de Langerhans",
          "Adipocitos"
        ],
        "correcta": 2,
        "explicacion": "Las celulas de Langerhans son celulas presentadoras de antigeno en la epidermis y forman parte de la inmunidad cutanea.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "pregunta": "Que celula osea es responsable de reabsorber hueso durante la remodelacion?",
        "opciones": [
          "Osteoblasto",
          "Osteocito",
          "Osteoclasto",
          "Condrocito"
        ],
        "correcta": 2,
        "explicacion": "El osteoclasto reabsorbe la matriz osea, mientras el osteoblasto la forma; el equilibrio entre ambos mantiene la masa osea.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "pregunta": "Que efecto NO corresponde a la insulina?",
        "opciones": [
          "Introducir glucosa en las celulas",
          "Estimular el almacenamiento de glucogeno",
          "Aumentar la produccion de cuerpos cetonicos",
          "Favorecer la sintesis de grasa"
        ],
        "correcta": 2,
        "explicacion": "La insulina inhibe la produccion de cuerpos cetonicos; su ausencia es la que dispara la cetogenesis en la cetoacidosis.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "pregunta": "Ante una hiperpotasemia con cambios graves en el ECG, la primera medida es:",
        "opciones": [
          "Furosemida",
          "Calcio para estabilizar el miocardio",
          "Solución glucosada sola",
          "Esperar el laboratorio"
        ],
        "correcta": 1,
        "explicacion": "El calcio no reduce el potasio, pero estabiliza la membrana del miocardio en minutos, protegiendo del paro mientras otras medidas redistribuyen el potasio.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      },
      {
        "pregunta": "Una taquicardia ventricular polimorfa tipo torsades de pointes se trata de elección con:",
        "opciones": [
          "Sulfato de magnesio IV",
          "Calcio IV",
          "Bicarbonato",
          "Potasio IV"
        ],
        "correcta": 0,
        "explicacion": "El sulfato de magnesio 1-2 g IV estabiliza la membrana ventricular y es el tratamiento de elección de la torsades, incluso con magnesio sérico normal.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      },
      {
        "pregunta": "¿Cuál es una característica de la necrosis frente a la apoptosis?",
        "opciones": [
          "No requiere ATP y provoca inflamación",
          "Es siempre fisiológica",
          "Mantiene íntegra la membrana",
          "Forma cuerpos apoptóticos"
        ],
        "correcta": 0,
        "explicacion": "La necrosis es pasiva, rompe la membrana y libera contenido celular que desencadena inflamación intensa.",
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia"
        }
      },
      {
        "pregunta": "Una LRA por hipovolemia/shock, con riñón estructuralmente sano, se clasifica como:",
        "opciones": [
          "Intrínseca",
          "Prerrenal",
          "Posrenal",
          "Obstructiva"
        ],
        "correcta": 1,
        "explicacion": "La causa prerrenal es la hipoperfusión; al restaurar la perfusión la función suele recuperarse.",
        "procedencia": {
          "temaOriginal": "medicina-interna"
        }
      },
      {
        "pregunta": "Un paciente con TSH elevada y T4 baja tiene:",
        "opciones": [
          "Hipertiroidismo primario",
          "Hipotiroidismo primario",
          "Hipotiroidismo central",
          "Funcion tiroidea normal"
        ],
        "correcta": 1,
        "explicacion": "En el hipotiroidismo primario la tiroides falla, la T4 baja y la hipofisis responde elevando la TSH (retroalimentacion).",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "pregunta": "Los antibioticos betalactamicos actuan principalmente:",
        "opciones": [
          "Inhibiendo la pared celular",
          "Inhibiendo la subunidad 30S",
          "Inhibiendo la ADN girasa",
          "Inhibiendo el folato"
        ],
        "correcta": 0,
        "explicacion": "Penicilinas, cefalosporinas y carbapenems inhiben la sintesis de la pared celular bacteriana, mecanismo bactericida.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      }
    ]
  },
  "m2-afe-metabolismo": {
    "secciones": [
      {
        "titulo": "Bioenergética y metabolismo",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La oxidación completa de una molécula de glucosa rinde ~30-32 ATP en condiciones aerobias. El proceso ocurre en tres etapas encadenadas:"
          },
          {
            "tipo": "pasos",
            "items": [
              "Glucólisis (citosol): glucosa → 2 piruvato, con ganancia neta de 2 ATP y 2 NADH. No requiere oxígeno.",
              "Ciclo de Krebs (matriz mitocondrial): el acetil-CoA se oxida liberando CO₂ y generando NADH y FADH₂.",
              "Cadena de transporte de electrones y fosforilación oxidativa (membrana mitocondrial interna): NADH y FADH₂ ceden electrones, se bombea H⁺ y la ATP sintasa produce la mayor parte del ATP usando O₂ como aceptor final."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Metabolismo anaerobio y lactato — la clave del shock",
            "texto": "Sin O₂, el piruvato se convierte en lactato para regenerar NAD⁺ y permitir que la glucólisis continúe, pero con un rendimiento mísero de 2 ATP. La acumulación de lactato (>2 mmol/L, y de forma crítica >4) es un marcador de hipoperfusión tisular: indica que las células están \"respirando\" sin oxígeno. Por eso el lactato sérico es uno de los mejores indicadores de severidad y respuesta a la reanimación en el shock."
          }
        ],
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "titulo": "El higado, laboratorio metabolico",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Funciones del higado",
            "items": [
              "Metabolismo de carbohidratos: almacena y libera glucosa (glucogeno).",
              "Sintesis de proteinas plasmaticas, incluida la albumina y los factores de coagulacion.",
              "Detoxificacion de farmacos, alcohol y amoniaco (que convierte en urea).",
              "Produccion de bilis para digerir grasas.",
              "Almacenamiento de vitaminas y hierro."
            ]
          },
          {
            "tipo": "p",
            "texto": "El higado produce la mayoria de los factores de coagulacion; por eso la insuficiencia hepatica grave causa tendencia al sangrado. Tambien convierte el amoniaco toxico en urea; cuando falla, el amoniaco se acumula y produce encefalopatia hepatica."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Higado y coagulacion",
            "texto": "En el paciente con enfermedad hepatica avanzada el sangrado es dificil de controlar porque faltan factores de coagulacion. La vitamina K, necesaria para varios de ellos, se absorbe con la grasa y depende de la bilis."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "titulo": "Metabolismo energetico",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Tras la absorcion, los nutrientes pasan por la vena porta al higado antes de llegar a la circulacion general. El cuerpo usa la glucosa como combustible principal; cuando se agota, recurre a las grasas y, en ayuno prolongado, a las proteinas. La insulina y el glucagon coordinan estos cambios."
          },
          {
            "tipo": "lista",
            "titulo": "Estados metabolicos",
            "items": [
              "Estado alimentado: la insulina almacena glucosa como glucogeno y grasa.",
              "Ayuno temprano: el glucagon libera glucosa del glucogeno hepatico.",
              "Ayuno prolongado: se queman grasas y se forman cuerpos cetonicos.",
              "Inanicion: se degradan proteinas musculares para obtener energia."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Lactato",
        "definicion": "Producto del metabolismo anaerobio; marcador de hipoperfusión tisular y severidad del shock.",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "termino": "Glucagon",
        "definicion": "Hormona que eleva la glucemia liberando glucosa del higado.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "termino": "Glucogeno",
        "definicion": "Forma de almacenamiento de glucosa en el higado y el musculo.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "termino": "Metabolismo anaerobio",
        "definicion": "Produccion de energia sin oxigeno que genera acido lactico y acidosis.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "termino": "ADME",
        "definicion": "Absorción, Distribución, Metabolismo y Excreción: los pasos de la farmacocinética.",
        "procedencia": {
          "temaOriginal": "farmacologia-toxicologia"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "¿Cuántos ATP rinde la glucólisis anaerobia vs. la oxidación aerobia completa de la glucosa?",
        "reverso": "2 ATP (anaerobia) vs. ~30-32 ATP (aerobia).",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "frente": "¿Por qué el lactato indica gravedad en el shock?",
        "reverso": "Refleja metabolismo anaerobio por hipoperfusión: las células carecen de O₂ suficiente.",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "frente": "Que significa la I de insulina en AEIOU-TIPS",
        "reverso": "Alteraciones de la glucosa: hipoglucemia o hiperglucemia.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un paciente en shock presenta lactato de 6 mmol/L. ¿Qué refleja principalmente?",
        "opciones": [
          "Buena oxigenación tisular",
          "Hipoperfusión y metabolismo anaerobio",
          "Alcalosis respiratoria pura",
          "Exceso de bicarbonato"
        ],
        "correcta": 1,
        "explicacion": "El lactato elevado indica que los tejidos generan energía sin oxígeno suficiente (anaerobio), marcador de hipoperfusión y gravedad.",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "pregunta": "El cotransporte Na⁺/glucosa (SGLT) es un ejemplo de:",
        "opciones": [
          "Difusión simple",
          "Transporte activo secundario",
          "Ósmosis",
          "Transporte activo primario"
        ],
        "correcta": 1,
        "explicacion": "Usa el gradiente de Na⁺ (creado por la bomba ATPasa) para mover glucosa contra su gradiente: transporte activo secundario.",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "pregunta": "Un corredor presenta fatiga y ardor muscular tras un esfuerzo intenso. El mecanismo fisiologico es:",
        "opciones": [
          "Exceso de oxigeno en el musculo",
          "Agotamiento del ATP y acumulacion de acido lactico por metabolismo anaerobio",
          "Aumento del calcio extracelular",
          "Liberacion de acetilcolina en exceso"
        ],
        "correcta": 1,
        "explicacion": "El esfuerzo intenso supera el aporte de oxigeno; el musculo recurre al metabolismo anaerobio, agotando ATP y acumulando acido lactico, lo que produce fatiga y ardor.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "pregunta": "En la mayoria de las personas sanas, cual es el principal estimulo para respirar?",
        "opciones": [
          "La presion de oxigeno",
          "La presion de dioxido de carbono y el pH",
          "La glucosa en sangre",
          "La temperatura corporal"
        ],
        "correcta": 1,
        "explicacion": "Los quimiorreceptores centrales responden sobre todo al CO2 y al pH del liquido cefalorraquideo; el CO2 es el estimulo dominante de la ventilacion.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "pregunta": "Un paciente con taquicardia, perdida de peso, temblor e intolerancia al calor probablemente tiene:",
        "opciones": [
          "Hipotiroidismo",
          "Hipertiroidismo",
          "Hipoglucemia",
          "Insuficiencia suprarrenal"
        ],
        "correcta": 1,
        "explicacion": "El exceso de hormona tiroidea acelera el metabolismo: taquicardia, perdida de peso, temblor e intolerancia al calor son tipicos del hipertiroidismo.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "pregunta": "Un paciente con falla hepatica presenta confusion y somnolencia. El mecanismo mas probable es:",
        "opciones": [
          "Acumulacion de glucosa",
          "Acumulacion de amoniaco no convertido en urea (encefalopatia hepatica)",
          "Exceso de albumina",
          "Falta de bilis"
        ],
        "correcta": 1,
        "explicacion": "El higado convierte el amoniaco toxico en urea; cuando falla, el amoniaco se acumula y altera el cerebro, produciendo encefalopatia hepatica.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "pregunta": "Durante un ayuno prolongado, de donde obtiene energia el cuerpo principalmente?",
        "opciones": [
          "Glucosa de la comida",
          "Grasas, formando cuerpos cetonicos",
          "Solo agua",
          "Bilis"
        ],
        "correcta": 1,
        "explicacion": "Tras agotar el glucogeno, el cuerpo quema grasas y produce cuerpos cetonicos como combustible alternativo; en inanicion extrema degrada proteinas.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "pregunta": "Que ocurre a nivel celular cuando falta oxigeno por hipoperfusion?",
        "opciones": [
          "La celula entra en metabolismo anaerobio y produce acido lactico",
          "La celula deja de necesitar energia",
          "Se acelera el metabolismo aerobio",
          "No hay cambios"
        ],
        "correcta": 0,
        "explicacion": "Sin oxigeno la celula recurre al metabolismo anaerobio, genera acido lactico y, de no corregirse, muere.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "pregunta": "¿Por qué el glucosado 5% NO sirve para expandir la volemia?",
        "opciones": [
          "Porque es hipertónico permanente",
          "Porque al consumirse la glucosa el agua libre se distribuye a todos los compartimentos",
          "Porque contiene coloides",
          "Porque permanece en el plasma"
        ],
        "correcta": 1,
        "explicacion": "Una vez metabolizada la glucosa queda agua libre que se reparte por todo el cuerpo, aportando muy poco volumen intravascular.",
        "procedencia": {
          "temaOriginal": "terapia-iv-io"
        }
      },
      {
        "pregunta": "La diferencia entre la adrenalina usada en paro y la usada en anafilaxia IM es:",
        "opciones": [
          "Es el mismo vial sin distinción",
          "La concentración: 0.1 mg/mL IV en paro y 1 mg/mL IM en anafilaxia",
          "La anafilaxia usa la vía IV obligatoria",
          "En paro se diluye en glucosa"
        ],
        "correcta": 1,
        "explicacion": "Confundir las concentraciones es un error grave. En paro se usa la presentación diluida 0.1 mg/mL por vía IV/IO; en anafilaxia la concentrada 1 mg/mL por vía IM.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      }
    ]
  },
  "m2-afe-acido-base": {
    "secciones": [
      {
        "titulo": "Equilibrio ácido-base bioquímico",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El pH sanguíneo se mantiene estrecho (7.35-7.45) gracias a sistemas amortiguadores (tampones), la ventilación pulmonar y la regulación renal. El principal tampón extracelular es el sistema bicarbonato/ácido carbónico."
          },
          {
            "tipo": "formula",
            "texto": "pH = 6.1 + log ( [HCO₃⁻] / (0.03 × pCO₂) )",
            "nota": "Ecuación de Henderson-Hasselbalch aplicada al sistema bicarbonato."
          },
          {
            "tipo": "lista",
            "titulo": "Sistemas tampón principales",
            "items": [
              "Bicarbonato (HCO₃⁻): el más importante en el líquido extracelular; regulado por pulmón (CO₂) y riñón (HCO₃⁻).",
              "Fosfato: relevante en el líquido intracelular y la orina.",
              "Proteínas (incluida la hemoglobina): amortiguan dentro de las células y la sangre."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Lectura rápida",
            "texto": "Si baja el HCO₃⁻ (se consume amortiguando ácidos, como el lactato) → acidosis metabólica. El cuerpo compensa hiperventilando para \"soplar\" CO₂. Entender esto conecta directamente la bioquímica con la capnografía y la ventilación."
          }
        ],
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "titulo": "Fisiología renal",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El riñón filtra el plasma en el glomérulo (la tasa de filtración glomerular, TFG, es el mejor índice de función renal) y luego reabsorbe selectivamente agua y solutos en los túbulos. Regula la volemia, los electrolitos y el equilibrio ácido-base reabsorbiendo o excretando bicarbonato y H⁺."
          },
          {
            "tipo": "diagrama",
            "clave": "nefrona",
            "titulo": "La nefrona",
            "descripcion": "Glomérulo y túbulos: filtración, reabsorción y secreción que regulan volemia, electrolitos y pH."
          },
          {
            "tipo": "pasos",
            "titulo": "Sistema Renina-Angiotensina-Aldosterona (SRAA)",
            "items": [
              "La caída de la presión de perfusión renal estimula la liberación de renina (aparato yuxtaglomerular).",
              "La renina convierte angiotensinógeno en angiotensina I.",
              "La ECA (pulmonar) convierte angiotensina I en angiotensina II, un potente vasoconstrictor que eleva la RVS.",
              "La angiotensina II estimula la aldosterona, que retiene Na⁺ y agua, y la ADH, expandiendo la volemia."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Por qué importa en prehospitalario",
            "texto": "El SRAA es el mecanismo compensatorio de fondo en la hipovolemia: explica la taquicardia, la vasoconstricción (palidez, llenado capilar lento) y la oliguria del paciente en shock antes de que caiga la presión. Reconocer estos signos permite tratar el shock \"compensado\" antes de la descompensación."
          }
        ],
        "procedencia": {
          "temaOriginal": "fisiologia-medica"
        }
      },
      {
        "titulo": "Funciones del rinon",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Funciones renales",
            "items": [
              "Eliminar productos de desecho (urea, creatinina, acidos).",
              "Regular el volumen y la composicion de los liquidos corporales.",
              "Controlar la presion arterial mediante el SRAA.",
              "Mantener el equilibrio acido-base regulando bicarbonato e hidrogeniones.",
              "Producir eritropoyetina (estimula la formacion de globulos rojos) y activar vitamina D."
            ]
          },
          {
            "tipo": "p",
            "texto": "El rinon ajusta finamente el agua y los electrolitos. La hormona antidiuretica (ADH), liberada por la hipofisis posterior, aumenta la reabsorcion de agua en el tubo colector cuando el cuerpo necesita conservar liquidos, concentrando la orina."
          }
        ],
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Henderson-Hasselbalch",
        "definicion": "Relación entre pH, bicarbonato y pCO₂ que rige el equilibrio ácido-base.",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "termino": "Relacion V/Q",
        "definicion": "Equilibrio entre ventilacion y perfusion que determina el intercambio gaseoso.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "termino": "Trastorno mixto",
        "definicion": "Coexistencia de dos o mas alteraciones acido-base.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "termino": "Retroalimentacion negativa",
        "definicion": "La hormona periferica inhibe a hipotalamo e hipofisis para mantener el equilibrio.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "termino": "Afinidad vs. eficacia",
        "definicion": "Afinidad = fuerza de unión; eficacia = capacidad de activar el receptor una vez unido.",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Ventana terapéutica del ácido tranexámico",
        "reverso": "Primeras 3 horas tras el trauma; después puede ser perjudicial.",
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "frente": "Ventana del ácido tranexámico en el trauma",
        "reverso": "Primeras 3 horas tras la lesión.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "frente": "Como se corrige el anion gap por la albumina",
        "reverso": "Sumar 2.5 por cada g/dL de albumina por debajo de 4.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase",
          "porUnidad": true
        }
      },
      {
        "frente": "FG que define la ERC estadio G5 (terminal)",
        "reverso": "Menor a 15 mL/min/1.73 m2.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase",
          "porUnidad": true
        }
      },
      {
        "frente": "Tratamiento de base de la encefalopatia hepatica",
        "reverso": "Lactulosa (mas tratar el desencadenante); rifaximina coadyuvante.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Que sucede a nivel molecular para que la miosina se suelte de la actina durante la relajacion?",
        "opciones": [
          "Se libera mas calcio",
          "El ATP se une a la cabeza de miosina",
          "Se libera acetilcolina",
          "Se acumula acido lactico"
        ],
        "correcta": 1,
        "explicacion": "El ATP se une a la cabeza de miosina y permite que se desprenda de la actina; sin ATP la union persiste, como en el rigor mortis.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "pregunta": "Como funciona la retroalimentacion negativa en el eje tiroideo?",
        "opciones": [
          "El exceso de hormona tiroidea aumenta la TSH",
          "El exceso de hormona tiroidea frena la TSH",
          "La TSH no depende de la hormona tiroidea",
          "El hipotalamo deja de funcionar"
        ],
        "correcta": 1,
        "explicacion": "Cuando las hormonas tiroideas suben, inhiben la liberacion de TSH por la hipofisis, manteniendo el equilibrio mediante retroalimentacion negativa.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      }
    ]
  },
  "m2-examen-final-unico": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Fosforilación oxidativa",
        "definicion": "Producción mayoritaria de ATP en la mitocondria usando O₂ como aceptor final de electrones.",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "termino": "Precarga",
        "definicion": "Volumen de sangre que llena el ventriculo al final de la diastole.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "termino": "ETCO2",
        "definicion": "Valor del CO2 al final de la espiración; normal 35-45 mmHg.",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      }
    ],
    "flashcards": [],
    "quiz": []
  },
  "m3-va-dispositivos-o2": {
    "secciones": [
      {
        "titulo": "Dispositivos y FiO₂",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La fracción inspirada de oxígeno (FiO₂) ambiental es 0.21 (21%). Cada dispositivo aumenta la FiO₂ según el flujo y el diseño. La elección depende de la hipoxemia, el patrón ventilatorio y el riesgo de retención de CO₂."
          },
          {
            "tipo": "tabla",
            "headers": [
              "Dispositivo",
              "Flujo",
              "FiO₂ aproximada"
            ],
            "filas": [
              [
                "Puntas nasales",
                "1-6 L/min",
                "24-44%"
              ],
              [
                "Mascarilla simple",
                "5-10 L/min",
                "40-60%"
              ],
              [
                "Mascarilla con reservorio (no recirculante)",
                "10-15 L/min",
                "60-95%"
              ],
              [
                "Mascarilla Venturi",
                "según adaptador",
                "24-50% (precisa)"
              ],
              [
                "Bolsa-válvula-mascarilla (BVM) con reservorio",
                "15 L/min",
                "~100%"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Cuidado en el EPOC",
            "texto": "En algunos pacientes con EPOC retenedor crónico, una FiO₂ excesiva puede reducir el estímulo ventilatorio y favorecer la hipercapnia. Se titula el O₂ a una SpO₂ objetivo (típicamente 88-92%) en lugar de saturar al 100% sin necesidad."
          }
        ],
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica"
        }
      },
      {
        "titulo": "Oximetria, temperatura y llenado capilar",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La saturacion de oxigeno (SpO2) mide el porcentaje de hemoglobina unida a oxigeno. El llenado capilar valora la perfusion periferica. La temperatura completa el cuadro: la hipotermia y la fiebre alteran el metabolismo y el pronostico."
          },
          {
            "tipo": "pasos",
            "titulo": "Medicion del llenado capilar",
            "items": [
              "Eleva la mano del paciente ligeramente por encima del corazon.",
              "Presiona el lecho ungueal hasta que palidezca.",
              "Suelta y cuenta los segundos hasta que recupere el color.",
              "Normal: menor o igual a 2 segundos. Mayor a 2 segundos sugiere mala perfusion (frio, shock, deshidratacion)."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Interpretacion de la SpO2",
            "headers": [
              "SpO2",
              "Interpretacion",
              "Conducta"
            ],
            "filas": [
              [
                "95 a 100%",
                "Normal",
                "Vigilar"
              ],
              [
                "91 a 94%",
                "Hipoxemia leve",
                "Oxigeno suplementario"
              ],
              [
                "86 a 90%",
                "Hipoxemia moderada",
                "Oxigeno a alto flujo, reevaluar via aerea"
              ],
              [
                "Menor a 85%",
                "Hipoxemia grave",
                "Soporte ventilatorio, posible BVM"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Cuando la oximetria miente",
            "texto": "El pulsioximetro da lecturas falsamente normales en la intoxicacion por monoxido de carbono (la carboxihemoglobina se confunde con oxihemoglobina). Tambien falla con uñas pintadas, hipotermia, mala perfusion y movimiento. Trata al paciente, no al numero."
          }
        ],
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "titulo": "Técnica de colocación",
        "bloques": [
          {
            "tipo": "pasos",
            "titulo": "Inserción de un i-gel",
            "items": [
              "Preoxigenar y reunir el material; seleccionar el tamaño por peso.",
              "Lubricar el dorso del dispositivo con gel hidrosoluble.",
              "Posicionar la cabeza en olfateo (salvo trauma); abrir la boca.",
              "Introducir el dispositivo siguiendo el paladar hasta sentir resistencia firme.",
              "Confirmar que la marca de los dientes queda a la altura de los incisivos.",
              "Conectar la BVM y ventilar, verificando la colocación.",
              "Fijar el dispositivo y colocar un mordedor si está disponible."
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Confirmación de la colocación",
            "items": [
              "Elevación torácica simétrica y bilateral con la ventilación.",
              "Auscultación de ruidos respiratorios en ambos campos y ausencia en epigastrio.",
              "Capnografía con onda cuadrada de ETCO2 (el estándar de oro).",
              "Ausencia de fuga audible alrededor del dispositivo."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "La capnografía manda",
            "texto": "La presencia de una onda de capnografía sostenida es el mejor indicador de ventilación efectiva. Si no hay ETCO2, asuma mala posición, retire y reinserte; no insista ventilando contra una vía sellada al esófago."
          }
        ],
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Lesión por reperfusión",
        "definicion": "Daño adicional por radicales libres al restaurar el flujo de oxígeno a un tejido isquémico.",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "termino": "Curva de oxihemoglobina",
        "definicion": "Relacion sigmoidea entre la presion de oxigeno y la saturacion de la hemoglobina.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "termino": "Efecto Bohr",
        "definicion": "Desplazamiento de la curva a la derecha por CO2 y acidez, que libera mas oxigeno.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "termino": "FiO₂",
        "definicion": "Fracción inspirada de oxígeno; 0.21 en aire ambiente, ~1.0 con BVM y reservorio.",
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica"
        }
      },
      {
        "termino": "Auto-PEEP",
        "definicion": "Atrapamiento aéreo por hiperventilación; aumenta presión intratorácica.",
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica",
          "porUnidad": true
        }
      },
      {
        "termino": "Dispositivo supraglótico",
        "definicion": "Vía aérea que sella la entrada de la laringe sin pasar las cuerdas vocales.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      },
      {
        "termino": "SpO2",
        "definicion": "Porcentaje de hemoglobina saturada de oxígeno medido por oximetría de pulso.",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "termino": "Atomizador",
        "definicion": "Dispositivo que dispersa el fármaco en gotas finas para la vía intranasal.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "termino": "Faja pélvica",
        "definicion": "Dispositivo sobre los trocánteres que cierra el anillo pélvico y controla sangrado.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "termino": "Carboxihemoglobina",
        "definicion": "Unión del CO a la hemoglobina que impide transportar oxígeno.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "termino": "Gradiente A-a",
        "definicion": "Diferencia alveolo-arterial de oxigeno; elevada en enfermedad del parenquima o cortocircuito.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que significa un desplazamiento a la derecha de la curva?",
        "reverso": "La hemoglobina suelta mas oxigeno a los tejidos.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "frente": "¿Por qué la hiperventilación con BVM es peligrosa?",
        "reverso": "Aumenta la presión intratorácica, reduce el retorno venoso y la perfusión cerebral/coronaria.",
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica"
        }
      },
      {
        "frente": "SpO₂ objetivo orientativa en EPOC retenedor",
        "reverso": "88-92%, titulando el oxígeno.",
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica"
        }
      },
      {
        "frente": "Que SpO2 se considera hipoxemia que requiere oxigeno",
        "reverso": "Por debajo de 95%; con prioridad si baja de 90 a 94%.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "frente": "Dónde se asienta un dispositivo supraglótico",
        "reverso": "Por encima de la glotis, sellando la entrada de la laringe sin pasar las cuerdas.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      },
      {
        "frente": "Qué dispositivo NO requiere inflar balón",
        "reverso": "El i-gel, que se amolda con su gel termoplástico.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      },
      {
        "frente": "Qué mide la oximetría de pulso",
        "reverso": "El porcentaje de hemoglobina saturada de oxígeno (SpO2).",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "frente": "Cómo se optimiza la vía intranasal",
        "reverso": "Con atomizador y dividiendo la dosis entre ambas fosas nasales.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "frente": "Saturacion meta de oxigeno en el retenedor de CO2",
        "reverso": "Aproximadamente 88 a 92 por ciento.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un paciente febril y acidotico necesita entregar mas oxigeno a sus tejidos. Que ocurre con la curva de oxihemoglobina?",
        "opciones": [
          "Se desplaza a la izquierda y retiene oxigeno",
          "Se desplaza a la derecha y libera mas oxigeno",
          "No cambia",
          "Se vuelve lineal"
        ],
        "correcta": 1,
        "explicacion": "La fiebre y la acidosis desplazan la curva a la derecha (efecto Bohr), facilitando que la hemoglobina suelte oxigeno donde mas se necesita.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "pregunta": "La forma sigmoidea de la curva de oxihemoglobina implica que:",
        "opciones": [
          "La saturacion cae linealmente con la presion",
          "Pequenas caidas de presion en la zona empinada liberan mucho oxigeno a los tejidos",
          "La hemoglobina nunca suelta oxigeno",
          "El CO2 no afecta la entrega de oxigeno"
        ],
        "correcta": 1,
        "explicacion": "La pendiente pronunciada de la curva en presiones bajas permite que pequenas reducciones de presion liberen grandes cantidades de oxigeno a los tejidos.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "pregunta": "Para administrar la mayor FiO₂ posible a un paciente que ventila espontáneamente, se usa:",
        "opciones": [
          "Puntas nasales a 4 L/min",
          "Mascarilla simple a 6 L/min",
          "Mascarilla con reservorio a 15 L/min",
          "Venturi al 28%"
        ],
        "correcta": 2,
        "explicacion": "La mascarilla con reservorio (no recirculante) a 10-15 L/min entrega 60-95% de O₂.",
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica"
        }
      },
      {
        "pregunta": "Cuales son las unicas acciones de tratamiento permitidas durante el triage START?",
        "opciones": [
          "Canalizar y administrar fluidos",
          "Abrir via aerea y controlar hemorragia masiva",
          "Inmovilizar fracturas",
          "Administrar oxigeno a todos"
        ],
        "correcta": 1,
        "explicacion": "START solo permite dos acciones salvadoras rapidas: abrir la via aerea y controlar la hemorragia masiva; el resto se hace despues.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "pregunta": "La ventaja de un dispositivo supraglótico de segunda generación es:",
        "opciones": [
          "No requiere lubricación",
          "Tiene un canal gástrico que reduce la aspiración",
          "Pasa las cuerdas vocales",
          "Funciona en pacientes conscientes"
        ],
        "correcta": 1,
        "explicacion": "Los DSG de segunda generación (i-gel, LMA con canal) incorporan un puerto para sonda gástrica que permite drenar el estómago y disminuye el riesgo de regurgitación.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      },
      {
        "pregunta": "Una contraindicación para colocar un dispositivo supraglótico es:",
        "opciones": [
          "Paro cardíaco",
          "Reflejo nauseoso intacto",
          "Ventilación con BVM difícil",
          "Fracaso de la intubación"
        ],
        "correcta": 1,
        "explicacion": "Un paciente con reflejos conservados no tolerará el dispositivo y puede presentar laringoespasmo o vómito; el DSG se usa en pacientes inconscientes sin reflejo nauseoso.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      },
      {
        "pregunta": "Tras el RCE, ¿cuál es el manejo correcto del oxígeno?",
        "opciones": [
          "Mantener FiO2 100 por ciento siempre",
          "Titular a SpO2 92 a 98 por ciento para evitar hiperoxia",
          "Suspender el oxígeno",
          "Hiperventilar para bajar el CO2"
        ],
        "correcta": 1,
        "explicacion": "La hiperoxia incrementa el daño por reperfusión; el oxígeno se titula a la pulsioximetría y se mantiene normocapnia.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "pregunta": "En el manejo inicial, el oxígeno suplementario está indicado cuando:",
        "opciones": [
          "Siempre, a alto flujo",
          "Solo si la SpO2 es menor a 90 por ciento",
          "Nunca",
          "Solo si hay dolor"
        ],
        "correcta": 1,
        "explicacion": "La hiperoxia en el SICA no aporta beneficio y puede ser perjudicial; se reserva para hipoxemia con SpO2 menor a 90 por ciento.",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "pregunta": "La meta de SpO2 en un paciente con EPOC exacerbado es:",
        "opciones": [
          "100 por ciento",
          "88 a 92 por ciento",
          "Mayor a 95 por ciento",
          "No importa"
        ],
        "correcta": 1,
        "explicacion": "La hiperoxia empeora la hipercapnia en el retenedor crónico; se titula el oxígeno a 88 a 92 por ciento.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "pregunta": "Cual es la conducta correcta al administrar oxigeno a un retenedor cronico de CO2:",
        "opciones": [
          "Oxigeno al 100 por ciento siempre",
          "Titular a saturacion de 88 a 92 por ciento",
          "No administrar oxigeno",
          "Saturacion meta de 100 por ciento"
        ],
        "correcta": 1,
        "explicacion": "Se titula a una saturacion moderada para corregir la hipoxemia sin agravar la hipercapnia ni alterar la relacion ventilacion-perfusion.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "pregunta": "Cual de los siguientes es un componente de la escala CURB-65:",
        "opciones": [
          "Saturacion de oxigeno",
          "Frecuencia respiratoria mayor o igual a 30",
          "Temperatura",
          "Leucocitosis"
        ],
        "correcta": 1,
        "explicacion": "CURB-65 incluye confusion, urea, frecuencia respiratoria mayor o igual a 30, presion baja y edad mayor o igual a 65 anos.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      }
    ]
  },
  "m6-ig-causas-muerte": {
    "secciones": [
      {
        "titulo": "Sodio y agua",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El sodio es el principal determinante de la osmolaridad y, por tanto, del movimiento del agua. Las alteraciones del sodio se manifiestan sobre todo como síntomas neurológicos por los cambios de volumen en las neuronas."
          },
          {
            "tipo": "tabla",
            "titulo": "Alteraciones del sodio",
            "headers": [
              "Trastorno",
              "Manifestaciones",
              "Riesgo de la corrección"
            ],
            "filas": [
              [
                "Hiponatremia",
                "Confusión, cefalea, convulsiones, edema cerebral",
                "Corrección rápida causa mielinolisis pontina."
              ],
              [
                "Hipernatremia",
                "Sed intensa, letargo, irritabilidad neuromuscular",
                "Corrección rápida causa edema cerebral."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Despacio con el sodio",
            "texto": "El sodio se corrige lento. Bajarlo o subirlo demasiado rápido daña el cerebro: la hiponatremia corregida bruscamente provoca desmielinización (mielinolisis pontina). En campo, el manejo es de soporte y traslado."
          }
        ],
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      },
      {
        "titulo": "Complicaciones agudas",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Complicaciones que matan temprano",
            "items": [
              "Arritmias malignas: FV y TV, principal causa de muerte súbita en las primeras horas.",
              "Insuficiencia cardíaca y edema agudo de pulmón por disfunción del ventrículo izquierdo.",
              "Shock cardiogénico por pérdida extensa de masa contráctil.",
              "Complicaciones mecánicas tardías: rotura de pared, comunicación interventricular, insuficiencia mitral aguda."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Monitorización continua",
            "texto": "Todo paciente con SICA debe permanecer monitorizado con desfibrilador disponible. La FV primaria en las primeras horas es frecuente y reversible con desfibrilación inmediata."
          }
        ],
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "titulo": "Lesión por inhalación y vía aérea",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La lesión por inhalación es una de las principales causas de muerte en el quemado. El edema de la vía aérea progresa con rapidez y puede cerrar la vía en minutos a horas; anticiparse es vital, porque intubar tarde es intubar imposible."
          },
          {
            "tipo": "lista",
            "titulo": "Signos de lesión por inhalación",
            "items": [
              "Quemaduras faciales, vibrisas nasales chamuscadas y hollín en boca o nariz.",
              "Esputo carbonáceo, ronquera, estridor o sibilancias.",
              "Antecedente de fuego en espacio cerrado.",
              "Alteración de conciencia en el contexto del incendio."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Asegura la vía aérea de forma temprana",
            "texto": "Ante signos de lesión por inhalación, asegura la vía aérea antes de que el edema progrese. Esperar a que aparezca el estridor franco puede significar perder la ventana para una intubación segura; el tubo se elige de calibre adecuado para permitir la broncoscopia."
          }
        ],
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "titulo": "Anticoagulantes",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Anticoagulantes principales",
            "headers": [
              "Farmaco",
              "Mecanismo",
              "Monitorizacion / reversion"
            ],
            "filas": [
              [
                "Heparina no fraccionada",
                "Potencia la antitrombina",
                "TTPa; reversion con protamina"
              ],
              [
                "Heparina de bajo peso molecular",
                "Inhibe factor Xa",
                "Generalmente sin monitorizacion; antiXa si es necesario"
              ],
              [
                "Warfarina",
                "Inhibe sintesis de factores dependientes de vitamina K",
                "INR; reversion con vitamina K y plasma o concentrado"
              ],
              [
                "Anticoagulantes directos (DOAC)",
                "Inhiben trombina o factor Xa",
                "Sin monitorizacion rutinaria; reversores especificos"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Heparina y warfarina al inicio",
            "texto": "Al iniciar warfarina puede haber un estado protrombotico transitorio porque caen primero las proteinas C y S (anticoagulantes naturales de vida media corta). Por eso se traslapa con heparina hasta lograr un INR terapeutico."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Trombocitopenia inducida por heparina",
            "texto": "La trombocitopenia inducida por heparina es una reaccion inmune paradojica que causa trombosis pese a las plaquetas bajas. Obliga a suspender toda la heparina y cambiar a un anticoagulante alternativo."
          }
        ],
        "procedencia": {
          "temaOriginal": "hematologia-coagulacion"
        }
      },
      {
        "titulo": "Hemorragia posparto",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La hemorragia posparto es una causa principal de muerte materna. La causa mas frecuente es la atonia uterina (el utero no se contrae). Se aborda de forma sistematica con las cuatro T."
          },
          {
            "tipo": "tabla",
            "titulo": "Las cuatro T de la hemorragia posparto",
            "headers": [
              "Causa",
              "Que es"
            ],
            "filas": [
              [
                "Tono",
                "Atonia uterina (la mas frecuente)"
              ],
              [
                "Trauma",
                "Desgarros del canal del parto"
              ],
              [
                "Tejido",
                "Retencion de restos placentarios"
              ],
              [
                "Trombina",
                "Trastornos de la coagulacion"
              ]
            ]
          },
          {
            "tipo": "pasos",
            "titulo": "Manejo de la atonia uterina",
            "items": [
              "Masaje uterino bimanual.",
              "Uterotonicos: oxitocina de primera linea, luego otros agentes.",
              "Reposicion de volumen y hemoderivados segun necesidad.",
              "Medidas avanzadas si persiste: balon intrauterino, suturas o intervencion quirurgica."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Reconocer la hemorragia oculta",
            "texto": "La paciente joven compensa bien y puede tener signos vitales casi normales hasta una perdida importante. La taquicardia es a menudo el primer signo; no hay que esperar a la hipotension para actuar."
          }
        ],
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Principal tampón del líquido extracelular",
        "reverso": "Sistema bicarbonato/ácido carbónico (HCO₃⁻/H₂CO₃).",
        "procedencia": {
          "temaOriginal": "biologia-celular-bioquimica"
        }
      },
      {
        "frente": "¿Por qué la intubación selectiva tiende al lado derecho?",
        "reverso": "El bronquio principal derecho es más vertical, corto y ancho.",
        "procedencia": {
          "temaOriginal": "anatomia-sistematica"
        }
      },
      {
        "frente": "Cual es el principal neurotransmisor inhibitorio del SNC?",
        "reverso": "El GABA.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "frente": "Causa principal de muerte súbita en las primeras horas del IAM",
        "reverso": "Fibrilación ventricular.",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "frente": "Riesgo principal al ventilar al asmático",
        "reverso": "Atrapamiento aéreo (auto-PEEP) con hipotensión y barotrauma.",
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un paciente con cirrosis avanzada sangra con facilidad. La causa principal es:",
        "opciones": [
          "Exceso de plaquetas",
          "El higado produce menos factores de coagulacion",
          "Aumento de la bilis",
          "Exceso de vitamina K"
        ],
        "correcta": 1,
        "explicacion": "El higado sintetiza la mayoria de los factores de coagulacion; en la insuficiencia hepatica disminuye su produccion y aparece tendencia al sangrado.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "pregunta": "Cual es la funcion principal del intestino grueso?",
        "opciones": [
          "Digerir proteinas",
          "Absorber agua y formar heces",
          "Producir bilis",
          "Absorber la mayoria de los nutrientes"
        ],
        "correcta": 1,
        "explicacion": "El intestino grueso absorbe agua y electrolitos del material no digerido y compacta las heces; la mayor parte de los nutrientes ya se absorbio en el delgado.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      }
    ]
  },
  "m1-smu-posiciones-lineas": {
    "secciones": [
      {
        "titulo": "Planos, ejes y osteología",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La posición anatómica de referencia (de pie, palmas al frente) define los planos sagital, coronal (frontal) y transversal (axial), y los términos de relación: proximal/distal, medial/lateral, superior/inferior, anterior/posterior. Este lenguaje es imprescindible para comunicar lesiones y procedimientos sin ambigüedad."
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Reparos óseos para accesos",
            "texto": "Tuberosidad tibial: referencia para el acceso intraóseo en tibia proximal (1-2 cm medial y por debajo). Cabeza/tuberosidad mayor del húmero: sitio de IO humeral. Cresta ilíaca, acromion y maléolos son referencias palpables constantes incluso en pacientes con mala perfusión."
          }
        ],
        "procedencia": {
          "temaOriginal": "anatomia-sistematica"
        }
      },
      {
        "titulo": "Inmovilizacion espinal",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La columna protege la medula espinal. Ante un mecanismo sugestivo, se restringe el movimiento para evitar convertir una lesion osea en una lesion medular. La tendencia actual es la restriccion selectiva basada en criterios, no la inmovilizacion automatica de todos."
          },
          {
            "tipo": "diagrama",
            "clave": "columna"
          },
          {
            "tipo": "lista",
            "titulo": "Criterios para restringir el movimiento espinal",
            "items": [
              "Alteracion del estado mental o intoxicacion.",
              "Dolor o hipersensibilidad en la linea media de la columna.",
              "Deficit neurologico focal (hormigueo, debilidad, paralisis).",
              "Deformidad anatomica de la columna.",
              "Lesion distractora que impida valorar de forma confiable."
            ]
          },
          {
            "tipo": "pasos",
            "titulo": "Tecnica basica de restriccion espinal",
            "items": [
              "Estabilizacion manual de la cabeza en posicion neutra desde el primer contacto.",
              "Colocacion de collarin cervical del tamaño adecuado.",
              "Movilizacion en bloque (log roll) con varios rescatadores coordinados.",
              "Aseguramiento al dispositivo (tabla o ferula espinal) con correas e inmovilizadores laterales.",
              "Reevaluar la funcion neurovascular en las cuatro extremidades."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Posicion neutra y excepciones",
            "texto": "La cabeza se lleva a neutro alineado con el cuerpo, salvo que el movimiento provoque dolor, resistencia, espasmo o deficit nuevo; en ese caso se inmoviliza en la posicion encontrada."
          }
        ],
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      },
      {
        "titulo": "Las ondas, segmentos e intervalos",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "ecg"
          },
          {
            "tipo": "tabla",
            "titulo": "Componentes de la onda electrocardiográfica",
            "headers": [
              "Componente",
              "Representa",
              "Valor normal"
            ],
            "filas": [
              [
                "Onda P",
                "Despolarización auricular",
                "Menor de 0.12 s, positiva en DII"
              ],
              [
                "Intervalo PR",
                "Tiempo aurícula a ventrículo",
                "0.12-0.20 s (3-5 cuadros pequeños)"
              ],
              [
                "Complejo QRS",
                "Despolarización ventricular",
                "Menor de 0.12 s (menos de 3 cuadros)"
              ],
              [
                "Segmento ST",
                "Inicio de la repolarización",
                "Isoeléctrico (en la línea base)"
              ],
              [
                "Onda T",
                "Repolarización ventricular",
                "Asimétrica, concordante con el QRS"
              ],
              [
                "Intervalo QT",
                "Despolarización y repolarización total",
                "Variable con la frecuencia, suele menor de 0.44 s"
              ]
            ]
          },
          {
            "tipo": "p",
            "texto": "El papel del ECG corre a 25 mm/s. Cada cuadro pequeño (1 mm) equivale a 0.04 s y cada cuadro grande (5 mm) a 0.20 s. En el eje vertical, 10 mm equivalen a 1 mV de voltaje. Esta cuadrícula es la regla que permite medir tiempos y amplitudes."
          }
        ],
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      },
      {
        "titulo": "Fuentes y evidencia",
        "bloques": [
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "REBEL EM — The ESETT Trial (segunda línea en estatus)",
                "url": "https://rebelem.com/the-esett-trial-2nd-line-medications-in-status-epilepticus/"
              },
              {
                "nombre": "ESETT — Lancet (texto del ensayo)",
                "url": "https://www.thelancet.com/article/S0140-6736(20)30611-5/fulltext"
              },
              {
                "nombre": "EMCrit (IBCC) — Status epilepticus",
                "url": "https://emcrit.org/ibcc/sz/"
              },
              {
                "nombre": "EMCrit (IBCC) — Elevated intracranial pressure",
                "url": "https://emcrit.org/ibcc/icp/"
              },
              {
                "nombre": "Brain Trauma Foundation — Guías de TCE grave",
                "url": "https://braintrauma.org/",
                "nota": "Metas de PPC, osmoterapia"
              },
              {
                "nombre": "Neurocritical Care Society — Guidelines for Status Epilepticus",
                "url": "https://www.neurocriticalcare.org/"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Norepinefrina",
        "definicion": "Vasopresor alfa-1 predominante; primera línea en la mayoría de shocks.",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "termino": "Segunda línea (ESETT)",
        "definicion": "Levetiracetam, fosfenitoína y valproato son equivalentes en eficacia.",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      },
      {
        "termino": "Corrección válida",
        "definicion": "Tachar con una línea legible, anotar la corrección y rubricar; nunca borrar ni usar corrector.",
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Sitio preferido actual para descompresión con aguja en adultos",
        "reverso": "5.º espacio intercostal, línea axilar anterior.",
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "frente": "Sitio actual de descompresión con aguja en el adulto",
        "reverso": "5.º espacio intercostal, línea axilar anterior.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "frente": "Primera línea sin vía IV en una convulsión activa",
        "reverso": "Midazolam 10 mg IM (o intranasal).",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      },
      {
        "frente": "Uterotónico de primera línea en HPP",
        "reverso": "Oxitocina 10 UI IM (+ masaje uterino).",
        "procedencia": {
          "temaOriginal": "trauma-coagulopatia-hemorragia-obstetrica"
        }
      },
      {
        "frente": "¿Cómo se corrige un error en el FRAP?",
        "reverso": "Se tacha con una sola línea legible, se anota la corrección y se rubrica; nunca se borra ni se usa corrector.",
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "El primer escalón farmacológico del estado epiléptico es:",
        "opciones": [
          "Fenitoína",
          "Una benzodiacepina",
          "Levetiracetam",
          "Propofol"
        ],
        "correcta": 1,
        "explicacion": "Las benzodiacepinas (midazolam IM, lorazepam o diazepam IV) son la primera línea; la subdosificación causa refractariedad.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "pregunta": "Los espacios en blanco del FRAP deben:",
        "opciones": [
          "Dejarse por si se necesita agregar algo",
          "Cancelarse con una línea para impedir agregados posteriores",
          "Llenarse con \"N/A\" a lápiz",
          "Recortarse de la hoja"
        ],
        "correcta": 1,
        "explicacion": "Cancelar los espacios en blanco con una línea evita que se añada información después de firmado el formato.",
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ]
  },
  "m2-afi-nervioso": {
    "secciones": [
      {
        "titulo": "Neuroanatomía",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Sistema Nervioso Central (SNC)",
            "items": [
              "Encéfalo: cerebro (hemisferios y corteza), responsable de funciones superiores y motricidad voluntaria.",
              "Diencéfalo: tálamo (relevo sensitivo) e hipotálamo (homeostasis, eje endocrino, temperatura).",
              "Tallo cerebral: mesencéfalo, protuberancia y bulbo raquídeo; aloja centros vitales (respiratorio y cardiovascular) y el origen de la mayoría de los pares craneales.",
              "Cerebelo: coordinación, equilibrio y tono.",
              "Médula espinal: vía de conducción y centro de reflejos."
            ]
          },
          {
            "tipo": "p",
            "texto": "El Sistema Nervioso Periférico incluye los 12 pares craneales y los nervios espinales. El Sistema Nervioso Autónomo se divide en simpático (\"lucha o huida\": taquicardia, midriasis, broncodilatación, vasoconstricción) y parasimpático (\"reposo y digestión\": bradicardia, miosis, aumento del peristaltismo). Su equilibrio explica la respuesta hemodinámica al estrés y al shock neurogénico."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Pares craneales de alto rendimiento",
            "texto": "III (oculomotor): la dilatación pupilar fija unilateral sugiere herniación por hipertensión intracraneal. X (vago): principal eje parasimpático cardíaco. VII (facial) y XII (hipogloso) se evalúan en el ictus."
          }
        ],
        "procedencia": {
          "temaOriginal": "anatomia-sistematica"
        }
      },
      {
        "titulo": "Organizacion del sistema nervioso",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El sistema nervioso se divide en central (SNC: encefalo y medula espinal) y periferico (SNP: nervios craneales y espinales). El SNP a su vez se divide en somatico (voluntario) y autonomo (involuntario)."
          },
          {
            "tipo": "tabla",
            "titulo": "Sistema nervioso autonomo",
            "headers": [
              "Rama",
              "Funcion",
              "Efectos"
            ],
            "filas": [
              [
                "Simpatico",
                "Lucha o huida",
                "Taquicardia, midriasis, broncodilatacion, vasoconstriccion"
              ],
              [
                "Parasimpatico",
                "Reposo y digestion",
                "Bradicardia, miosis, broncoconstriccion, aumento de la digestion"
              ]
            ]
          },
          {
            "tipo": "p",
            "texto": "El simpatico usa principalmente noradrenalina (y adrenalina desde la medula suprarrenal); el parasimpatico usa acetilcolina. El conocimiento de estos sistemas explica el efecto de muchos farmacos de emergencia, como la atropina y la adrenalina."
          }
        ],
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Neuroglia",
        "definicion": "Celulas de soporte del tejido nervioso, mas numerosas que las neuronas.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "termino": "Mielina",
        "definicion": "Aislante del axon que acelera la conduccion mediante los nodos de Ranvier.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada",
          "porUnidad": true
        }
      },
      {
        "termino": "Parasimpatico",
        "definicion": "Rama autonoma de reposo y digestion; usa acetilcolina.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Por que el dano del SNC deja secuelas permanentes?",
        "reverso": "Porque las neuronas del SNC casi no se regeneran y se reemplazan por cicatriz.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "frente": "Que acelera la conduccion del axon?",
        "reverso": "La mielina, mediante conduccion saltatoria por los nodos de Ranvier.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada",
          "porUnidad": true
        }
      },
      {
        "frente": "Que neurotransmisor usa el parasimpatico?",
        "reverso": "La acetilcolina.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada",
          "porUnidad": true
        }
      },
      {
        "frente": "¿Cuál es el examen obligatorio ante un déficit neurológico?",
        "reverso": "La glucemia capilar (la hipoglucemia imita un EVC).",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "frente": "Signo neurologico tipico de la encefalopatia hepatica",
        "reverso": "Asterixis (temblor de aleteo).",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Por que la mielina aumenta la velocidad de conduccion del impulso?",
        "opciones": [
          "Porque genera mas neurotransmisores",
          "Porque permite la conduccion saltatoria entre los nodos de Ranvier",
          "Porque aumenta el calcio intracelular",
          "Porque elimina el periodo refractario"
        ],
        "correcta": 1,
        "explicacion": "La mielina aisla el axon y el impulso salta de un nodo de Ranvier al siguiente (conduccion saltatoria), lo que acelera enormemente la transmision.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada",
          "porUnidad": true
        }
      }
    ]
  },
  "m4-resp-insuficiencia": {
    "secciones": [
      {
        "titulo": "Anatomía cardiovascular y respiratoria",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La circulación mayor (sistémica) lleva sangre oxigenada del ventrículo izquierdo al cuerpo; la menor (pulmonar) lleva sangre desoxigenada del ventrículo derecho a los pulmones. Las arterias coronarias nacen de la raíz aórtica: la coronaria izquierda se divide en descendente anterior (cara anterior y septo) y circunfleja (cara lateral); la coronaria derecha irriga el ventrículo derecho y, en la mayoría, la cara inferior y el nodo AV."
          },
          {
            "tipo": "diagrama",
            "clave": "corazon",
            "titulo": "Anatomía del corazón y arterias coronarias",
            "descripcion": "Descendente anterior, circunfleja y coronaria derecha: saber qué cara irriga cada una predice la arteria ocluida en el IAM."
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Correlación coronaria-ECG",
            "texto": "Saber qué arteria irriga cada cara permite predecir la arteria ocluida en un IAMCEST: cara inferior (II, III, aVF) → coronaria derecha; cara anterior (V1-V4) → descendente anterior; lateral (I, aVL, V5-V6) → circunfleja."
          },
          {
            "tipo": "p",
            "texto": "El árbol traqueobronquial parte de la tráquea, que se bifurca en la carina hacia los bronquios principales. El bronquio derecho es más vertical, corto y ancho: por eso los cuerpos extraños y la intubación selectiva tienden a alojarse a la derecha. Los pulmones se dividen en lóbulos (3 derecho, 2 izquierdo) y segmentos. Las pleuras (visceral y parietal) crean un espacio virtual cuya integridad mantiene la presión negativa necesaria para la ventilación."
          },
          {
            "tipo": "diagrama",
            "clave": "respiratorio",
            "titulo": "Árbol traqueobronquial y pulmones",
            "descripcion": "Tráquea, carina y bronquios principales; el derecho es más vertical, corto y ancho."
          }
        ],
        "procedencia": {
          "temaOriginal": "anatomia-sistematica"
        }
      },
      {
        "titulo": "Anatomia respiratoria",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "respiratorio",
            "titulo": "Via aerea y pulmones"
          },
          {
            "tipo": "p",
            "texto": "La via aerea superior incluye nariz, faringe y laringe; la inferior, traquea, bronquios, bronquiolos y alveolos. La laringe contiene las cuerdas vocales y la epiglotis, que protege la via aerea al deglutir. El arbol bronquial se ramifica hasta los alveolos, donde ocurre el intercambio."
          },
          {
            "tipo": "lista",
            "titulo": "Funciones de la via aerea",
            "items": [
              "Calentar, humidificar y filtrar el aire inspirado.",
              "Conducir el aire hasta los alveolos.",
              "Proteger la via aerea (epiglotis, reflejo tusigeno).",
              "Fonacion mediante las cuerdas vocales."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Surfactante",
            "texto": "Los neumocitos tipo II producen surfactante, que reduce la tension superficial y evita el colapso alveolar. Su deficiencia en prematuros causa el sindrome de dificultad respiratoria neonatal."
          }
        ],
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "titulo": "Semiología médica",
        "bloques": [
          {
            "tipo": "pasos",
            "titulo": "Las cuatro maniobras de la exploración física",
            "items": [
              "Inspección: color, trabajo respiratorio, deformidades, simetría, heridas.",
              "Palpación: dolor, crepitación, enfisema subcutáneo, pulsos, temperatura.",
              "Percusión: matidez (líquido/sangre, derrame) vs. timpanismo (aire, neumotórax).",
              "Auscultación: ruidos respiratorios y cardíacos."
            ]
          },
          {
            "tipo": "tabla",
            "headers": [
              "Ruido",
              "Tipo",
              "Significado típico"
            ],
            "filas": [
              [
                "Estertores (crepitantes)",
                "Respiratorio",
                "Líquido alveolar: edema pulmonar, neumonía."
              ],
              [
                "Sibilancias",
                "Respiratorio",
                "Broncoconstricción: asma, EPOC, anafilaxia."
              ],
              [
                "Estridor",
                "Respiratorio",
                "Obstrucción de vía aérea alta: emergencia."
              ],
              [
                "Roncus",
                "Respiratorio",
                "Secreciones en vías grandes."
              ],
              [
                "S3",
                "Cardíaco",
                "Sobrecarga de volumen / insuficiencia cardíaca."
              ],
              [
                "S4",
                "Cardíaco",
                "Ventrículo rígido: HTA, isquemia."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "S1 y S2",
            "texto": "S1 (\"lub\") = cierre de las válvulas auriculoventriculares (mitral y tricúspide), inicio de la sístole. S2 (\"dub\") = cierre de las válvulas semilunares (aórtica y pulmonar), inicio de la diástole. Los soplos reflejan flujo turbulento por estenosis o insuficiencia valvular."
          }
        ],
        "procedencia": {
          "temaOriginal": "evaluacion-integral"
        }
      },
      {
        "titulo": "Física de la ventilación a presión positiva",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La ventilación espontánea es a presión negativa (el diafragma genera vacío). La ventilación con BVM o ventilador es a presión positiva: empuja aire a los pulmones, invirtiendo la mecánica normal. Esto tiene consecuencias hemodinámicas importantes."
          },
          {
            "tipo": "lista",
            "titulo": "Principios físicos aplicados",
            "items": [
              "Ley de Boyle: a temperatura constante, presión y volumen son inversamente proporcionales; al aumentar el volumen torácico baja la presión y entra aire.",
              "La presión positiva aumenta la presión intratorácica, lo que reduce el retorno venoso y puede bajar el gasto cardíaco (peligroso en hipovolemia).",
              "La hiperinsuflación (volúmenes altos o frecuencia excesiva) genera auto-PEEP, distensión gástrica y riesgo de barotrauma."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "No hiperventilar",
            "texto": "Ventilar demasiado rápido o con demasiado volumen eleva la presión intratorácica, reduce el retorno venoso y empeora la perfusión cerebral y coronaria, especialmente durante la RCP. Ventilaciones lentas, suaves y con el volumen justo para elevar el tórax."
          }
        ],
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica"
        }
      },
      {
        "titulo": "Ahogamiento",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El ahogamiento es la insuficiencia respiratoria por sumersion o inmersion en un liquido. La hipoxia es el problema central y el determinante del pronostico, por lo que la prioridad es restablecer la oxigenacion."
          },
          {
            "tipo": "pasos",
            "titulo": "Manejo del paciente ahogado",
            "items": [
              "Asegura tu seguridad: no te conviertas en otra victima al rescatar.",
              "Saca al paciente del agua e inicia ventilaciones cuanto antes si no respira.",
              "Considera lesion cervical si hubo clavado o trauma.",
              "Inicia RCP si no hay pulso, comenzando por la oxigenacion.",
              "Abriga: la hipotermia acompaña con frecuencia al ahogamiento."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Sindrome de ahogamiento secundario",
            "texto": "Tras la aspiracion de agua, el paciente puede deteriorarse horas despues por edema pulmonar. Todo ahogado, aunque parezca recuperado, debe ser valorado y vigilado en el hospital."
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "titulo": "Sistema START",
        "bloques": [
          {
            "tipo": "p",
            "texto": "START (Simple Triage And Rapid Treatment) clasifica adultos en menos de 60 segundos por paciente evaluando deambulacion, respiracion, perfusion y estado mental. Solo se realizan dos acciones salvadoras durante el triage: abrir via aerea y controlar hemorragia masiva."
          },
          {
            "tipo": "pasos",
            "titulo": "Algoritmo START",
            "items": [
              "Pide que caminen quienes puedan: los que deambulan son clasificacion verde (leve).",
              "Respiracion: si no respira, abre la via aerea; si sigue sin respirar es negro; si respira mas de 30 por minuto es rojo.",
              "Perfusion: si respira menos de 30, valora pulso radial o llenado capilar; ausente o mayor a 2 segundos es rojo (controla hemorragia).",
              "Estado mental: si la perfusion es adecuada, valora si obedece ordenes simples; si no obedece es rojo; si obedece es amarillo."
            ]
          },
          {
            "tipo": "formula",
            "texto": "Reglas rapidas: respira mas de 30 = ROJO; llenado mayor a 2 s o sin pulso radial = ROJO; no obedece ordenes = ROJO",
            "nota": "Si pasa los tres filtros (respira bien, buena perfusion, obedece) y no deambula por lesion, es AMARILLO."
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "JumpSTART en pediatria",
            "texto": "Para niños se usa JumpSTART, que ajusta los rangos respiratorios y añade un paso de 5 ventilaciones de rescate antes de clasificar como negro a un niño en apnea con pulso, porque su paro suele ser de origen respiratorio."
          }
        ],
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "titulo": "Ofidios: serpientes venenosas",
        "bloques": [
          {
            "tipo": "p",
            "texto": "En México las mordeduras de importancia médica las causan dos grupos: las víboras (familia de los crotálidos: cascabel, nauyaca y cantil), con veneno hemotóxico y proteolítico, y las serpientes de coral (coralillos, familia de los elápidos), con veneno neurotóxico. El cuadro y el antiveneno difieren entre ambos."
          },
          {
            "tipo": "tabla",
            "titulo": "Víboras vs. coralillo",
            "headers": [
              "Característica",
              "Víboras (cascabel/nauyaca)",
              "Coralillo"
            ],
            "filas": [
              [
                "Tipo de veneno",
                "Hemotóxico/proteolítico",
                "Neurotóxico"
              ],
              [
                "Local",
                "Dolor, edema progresivo, equimosis, ampollas, necrosis",
                "Escaso o nulo edema"
              ],
              [
                "Sistémico",
                "Coagulopatía, sangrado, choque",
                "Ptosis, visión borrosa, parálisis, falla respiratoria"
              ],
              [
                "Faboterápico",
                "Antivipmyn",
                "Coralmyn"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "El coralillo engaña",
            "texto": "El coralillo puede dejar una marca mínima y poco dolor al inicio, pero el veneno neurotóxico produce parálisis progresiva horas después, hasta paro respiratorio. No te confíes por la ausencia de edema: vigila la vía aérea y la ventilación y traslada de inmediato."
          },
          {
            "tipo": "imagen",
            "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Crotalus_atrox_(2).jpg?width=720",
            "alt": "Víbora de cascabel (Crotalus)",
            "caption": "Víbora de cascabel (Crotalus): veneno hemotóxico y proteolítico.",
            "fuente": "Wikimedia Commons",
            "fuenteUrl": "https://commons.wikimedia.org/wiki/File:Crotalus_atrox_(2).jpg",
            "busqueda": "Crotalus cascabel serpiente Mexico"
          },
          {
            "tipo": "imagen",
            "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Micrurus_spixii_2.jpg?width=720",
            "alt": "Serpiente de coral (Micrurus)",
            "caption": "Serpiente de coral (Micrurus): veneno neurotóxico; patrón de anillos vivos.",
            "fuente": "Wikimedia Commons",
            "fuenteUrl": "https://commons.wikimedia.org/wiki/File:Micrurus_spixii_2.jpg",
            "busqueda": "Micrurus coralillo serpiente coral Mexico"
          }
        ],
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      },
      {
        "titulo": "Sistema neurológico y analgesia",
        "bloques": [
          {
            "tipo": "p",
            "texto": "En el ámbito prehospitalario se controlan convulsiones, dolor, hipoglucemia y sobredosis de opioides. El manejo del dolor es un derecho del paciente y mejora los desenlaces; la analgesia debe titularse vigilando ventilación y presión arterial."
          },
          {
            "tipo": "tabla",
            "titulo": "Fármacos neurológicos y analgésicos",
            "headers": [
              "Fármaco",
              "Uso",
              "Dosis prehospitalaria"
            ],
            "filas": [
              [
                "Midazolam",
                "Convulsiones / sedación",
                "10 mg IM o 0.2 mg/kg intranasal; 0.1 mg/kg IV titulado."
              ],
              [
                "Diazepam",
                "Convulsiones",
                "5-10 mg IV lento, repetible."
              ],
              [
                "Naloxona",
                "Reversión de opioides",
                "0.4-2 mg IV/IM/IO o 2-4 mg intranasal, titulando a la ventilación."
              ],
              [
                "Glucosa al 50% (dextrosa)",
                "Hipoglucemia",
                "25 g IV (50 mL al 50%)."
              ],
              [
                "Glucagón",
                "Hipoglucemia sin acceso IV",
                "1 mg IM/SC."
              ],
              [
                "Morfina",
                "Dolor moderado-intenso",
                "2-4 mg IV titulados, vigilando ventilación y TA."
              ],
              [
                "Fentanilo",
                "Dolor / hemodinamia inestable",
                "1 mcg/kg IV o 1.5-2 mcg/kg intranasal."
              ],
              [
                "Ketamina",
                "Analgesia / sedación",
                "Analgesia: 0.1-0.3 mg/kg IV. Disociativa: 1-2 mg/kg IV."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Naloxona: titular, no inundar",
            "texto": "El objetivo de la naloxona es restaurar la ventilación, no despertar por completo al paciente. Una reversión brusca puede precipitar un síndrome de abstinencia agudo con agitación, vómito y edema pulmonar. Administre dosis pequeñas y repita."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "titulo": "Interpretación integrada",
        "bloques": [
          {
            "tipo": "pasos",
            "titulo": "Lectura integrada del monitor",
            "items": [
              "Mire primero al paciente: color, esfuerzo respiratorio, estado mental.",
              "Correlacione cada número con lo que ve; busque artefactos en lo incongruente.",
              "Use la capnografía para evaluar ventilación y la calidad de la RCP.",
              "Una la SpO2 con la frecuencia respiratoria y la auscultación.",
              "Revalúe tras cada intervención: el monitor mide tendencias, no fotos."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Ejemplos de integración",
            "headers": [
              "Escenario",
              "Patrón",
              "Interpretación"
            ],
            "filas": [
              [
                "Asma grave",
                "SpO2 baja + ETCO2 con aleta de tiburón",
                "Broncoespasmo con atrapamiento aéreo."
              ],
              [
                "Sobredosis de opioides",
                "FR baja + ETCO2 alto + SpO2 que cae",
                "Hipoventilación; considerar naloxona."
              ],
              [
                "Choque",
                "TA baja + ETCO2 bajo + taquicardia",
                "Hipoperfusión global."
              ],
              [
                "Intoxicación por CO",
                "SpO2 normal con clínica de hipoxia",
                "Lectura falsamente tranquilizadora."
              ]
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "titulo": "Ventilación mecánica básica",
        "bloques": [
          {
            "tipo": "tabla",
            "headers": [
              "Modo",
              "Característica"
            ],
            "filas": [
              [
                "AC/VC (asistida-controlada por volumen)",
                "Entrega un volumen fijo en cada respiración (propias o del ventilador)."
              ],
              [
                "SIMV",
                "Sincroniza respiraciones mandatorias con el esfuerzo del paciente; permite respiraciones espontáneas."
              ],
              [
                "CPAP",
                "Presión positiva continua; el paciente respira espontáneamente (edema agudo de pulmón)."
              ],
              [
                "BiPAP",
                "Dos niveles de presión (inspiratorio y espiratorio); apoya la ventilación (EPOC, hipercapnia)."
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Parámetros de protección pulmonar",
            "items": [
              "Volumen tidal: 6-8 mL/kg de peso corporal IDEAL (no real) para evitar volutrauma.",
              "PEEP: presión positiva al final de la espiración; recluta alvéolos y mejora la oxigenación.",
              "FiO₂: titular a la SpO₂ objetivo evitando hiperoxia innecesaria.",
              "Frecuencia respiratoria: ajustada al ETCO₂/pH objetivo."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Peso IDEAL, no real",
            "texto": "El volumen tidal se calcula sobre el peso corporal ideal (basado en talla y sexo), porque el tamaño del pulmón depende de la estatura, no de la obesidad. Usar el peso real sobredistiende los pulmones y causa lesión."
          }
        ],
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "titulo": "EPOC exacerbado",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La exacerbación del EPOC suele desencadenarse por infección y cursa con aumento de la disnea, la tos y la expectoración. Estos pacientes son retenedores de CO2 crónicos; el objetivo de oxigenación es modesto para no abolir el estímulo respiratorio ni empeorar la hipercapnia."
          },
          {
            "tipo": "lista",
            "titulo": "Manejo del EPOC exacerbado",
            "items": [
              "Oxígeno titulado a SpO2 88 a 92 por ciento.",
              "Broncodilatadores: salbutamol e ipratropio nebulizados.",
              "Corticoesteroides sistémicos y antibióticos si hay datos de infección.",
              "VMNI temprana en la insuficiencia respiratoria hipercápnica."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Oxígeno controlado en el EPOC",
            "texto": "Evita la hiperoxia en el retenedor crónico: el exceso de oxígeno empeora la hipercapnia por alteración de la relación ventilación-perfusión y el efecto Haldane, no solo por el estímulo hipóxico. La meta es 88 a 92 por ciento."
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "titulo": "SDRA y ventilación protectora",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El sindrome de dificultad respiratoria aguda (SDRA) es una lesión pulmonar inflamatoria con edema no cardiogénico por aumento de la permeabilidad capilar. Causa hipoxemia refractaria e infiltrados bilaterales. A diferencia del edema cardiogénico, no hay falla de bomba."
          },
          {
            "tipo": "lista",
            "titulo": "Principios de la ventilación protectora",
            "items": [
              "Volumen corriente bajo: 6 ml/kg de peso corporal ideal.",
              "Limitar la presión meseta a menos de 30 cmH2O.",
              "PEEP adecuada para mantener el reclutamiento alveolar.",
              "Tolerar la hipercapnia permisiva para evitar la lesión inducida por el ventilador.",
              "Posición prona en el SDRA grave dentro del entorno hospitalario."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Volumen bajo salva pulmones",
            "texto": "La ventilación con volúmenes altos sobredistiende los alveolos sanos y perpetúa la inflamación (volutrauma). El volumen corriente bajo basado en el peso ideal es la intervención que más reduce la mortalidad en el SDRA."
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "titulo": "Ventilación mecánica no invasiva (VMNI)",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "CPAP frente a BiPAP",
            "headers": [
              "Modo",
              "Uso principal"
            ],
            "filas": [
              [
                "CPAP",
                "Presión continua; edema agudo de pulmón, apnea."
              ],
              [
                "BiPAP",
                "Dos niveles de presión; insuficiencia hipercápnica del EPOC."
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Contraindicaciones de la VMNI",
            "items": [
              "Paro respiratorio o necesidad de vía aérea inmediata.",
              "Alteración grave del estado de conciencia o incapacidad para proteger la vía aérea.",
              "Vómito o riesgo alto de broncoaspiración.",
              "Inestabilidad hemodinámica grave o trauma facial.",
              "Falta de colaboración del paciente."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "La VMNI exige reevaluación constante",
            "texto": "Si tras un breve ensayo de VMNI el paciente no mejora o se deteriora (acidosis que empeora, agotamiento, deterioro del estado mental), no insistas: procede a la intubación. La VMNI nunca debe retrasar una vía aérea definitiva necesaria."
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "titulo": "POCUS (ecografía a pie de cama)",
        "bloques": [
          {
            "tipo": "tabla",
            "headers": [
              "Protocolo",
              "Indicación",
              "Busca"
            ],
            "filas": [
              [
                "eFAST",
                "Trauma",
                "Líquido libre abdominal, hemopericardio, neumotórax y hemotórax."
              ],
              [
                "RUSH",
                "Shock indiferenciado",
                "Causa del shock: corazón, volemia (vena cava), aorta, tórax/abdomen."
              ],
              [
                "BLUE",
                "Dificultad respiratoria",
                "Patrones pulmonares: neumotórax, edema, derrame, consolidación."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Signos ecográficos esenciales",
            "texto": "El \"deslizamiento pleural\" (lung sliding) descarta neumotórax en ese punto; su ausencia, con el \"punto pulmón\", lo sugiere. Las \"líneas B\" en cohete indican edema/síndrome intersticial. El derrame pericárdico con colapso de cavidades sugiere taponamiento."
          }
        ],
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      },
      {
        "titulo": "Insuficiencia respiratoria",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "respiratorio"
          },
          {
            "tipo": "tabla",
            "titulo": "Tipos de insuficiencia respiratoria",
            "headers": [
              "",
              "Tipo I (hipoxemica)",
              "Tipo II (hipercapnica)"
            ],
            "filas": [
              [
                "PaO2",
                "Baja (menor a 60 mmHg)",
                "Baja"
              ],
              [
                "PaCO2",
                "Normal o baja",
                "Elevada (mayor a 45 mmHg)"
              ],
              [
                "Mecanismo",
                "Alteracion ventilacion-perfusion, cortocircuito",
                "Falla de la bomba ventilatoria"
              ],
              [
                "Ejemplos",
                "Neumonia, edema pulmonar, SDRA, TEP",
                "EPOC avanzada, depresion del centro respiratorio, fatiga muscular"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "La clave es la PaCO2",
            "texto": "La insuficiencia respiratoria tipo I es un problema de oxigenacion con PaCO2 normal o baja. La tipo II anade retencion de CO2 (hipercapnia), lo que refleja falla de la ventilacion. Esta distincion guia el uso de ventilacion no invasiva."
          },
          {
            "tipo": "formula",
            "texto": "Gradiente alveolo-arterial = PAO2 menos PaO2 (PAO2 aproximada = FiO2 por 713 menos PaCO2 entre 0.8)",
            "nota": "Un gradiente A-a normal con hipoxemia sugiere hipoventilacion o baja FiO2; un gradiente elevado sugiere enfermedad del parenquima o cortocircuito."
          }
        ],
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "titulo": "EPOC",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La enfermedad pulmonar obstructiva cronica es una limitacion persistente y poco reversible al flujo aereo, ligada principalmente al tabaquismo. Engloba la bronquitis cronica (tos productiva cronica) y el enfisema (destruccion alveolar)."
          },
          {
            "tipo": "tabla",
            "titulo": "Asma vs EPOC",
            "headers": [
              "Rasgo",
              "Asma",
              "EPOC"
            ],
            "filas": [
              [
                "Reversibilidad",
                "Marcada con broncodilatador",
                "Escasa o ausente"
              ],
              [
                "Edad de inicio",
                "Frecuente en jovenes",
                "Generalmente mayores de 40"
              ],
              [
                "Factor principal",
                "Atopia, alergenos",
                "Tabaquismo"
              ],
              [
                "Curso",
                "Episodico, variable",
                "Progresivo y persistente"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Oxigeno en el retenedor de CO2",
            "texto": "En la EPOC con insuficiencia tipo II se debe titular el oxigeno a una saturacion meta moderada (alrededor de 88 a 92 por ciento). El exceso de oxigeno puede empeorar la hipercapnia; el objetivo es corregir la hipoxemia sin abolir el estimulo respiratorio ni alterar la relacion ventilacion-perfusion."
          },
          {
            "tipo": "lista",
            "titulo": "Exacerbacion de EPOC",
            "items": [
              "Aumento de disnea, volumen o purulencia del esputo.",
              "Broncodilatadores de accion corta y corticoesteroides sistemicos.",
              "Antibiotico si hay datos de infeccion bacteriana (esputo purulento).",
              "Ventilacion no invasiva (BiPAP) si hay acidosis respiratoria por hipercapnia."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "titulo": "Neumonia y derrame pleural",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La neumonia es la infeccion del parenquima pulmonar. Cursa con fiebre, tos, expectoracion, disnea y dolor pleuritico, con estertores y consolidacion en la exploracion. El neumococo (Streptococcus pneumoniae) es el agente mas frecuente de la neumonia adquirida en la comunidad."
          },
          {
            "tipo": "lista",
            "titulo": "Escala CURB-65 de gravedad",
            "items": [
              "C: confusion.",
              "U: urea elevada.",
              "R: frecuencia respiratoria mayor o igual a 30.",
              "B: presion arterial baja (sistolica menor a 90 o diastolica menor o igual a 60).",
              "65: edad mayor o igual a 65 anos. A mayor puntaje, mayor mortalidad y necesidad de hospitalizacion."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Derrame pleural: criterios de Light (es exudado si cumple uno)",
            "headers": [
              "Cociente",
              "Punto de corte"
            ],
            "filas": [
              [
                "Proteinas pleural / serica",
                "Mayor a 0.5"
              ],
              [
                "DHL pleural / serica",
                "Mayor a 0.6"
              ],
              [
                "DHL pleural",
                "Mayor a dos tercios del limite superior serico"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Trasudado vs exudado",
            "texto": "El trasudado refleja desequilibrio de presiones (insuficiencia cardiaca, cirrosis, sindrome nefrotico). El exudado refleja inflamacion o aumento de permeabilidad (infeccion, neoplasia, embolia). Los criterios de Light separan ambos."
          }
        ],
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "titulo": "Tromboembolia pulmonar",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La tromboembolia pulmonar (TEP) es la oclusion de la arteria pulmonar o sus ramas por un trombo, casi siempre procedente de una trombosis venosa profunda de miembros inferiores. Es una causa de insuficiencia respiratoria tipo I con gradiente A-a elevado."
          },
          {
            "tipo": "lista",
            "titulo": "Factores de riesgo (triada de Virchow)",
            "items": [
              "Estasis: inmovilizacion, viajes prolongados, hospitalizacion.",
              "Lesion endotelial: cirugia, trauma, cateteres.",
              "Hipercoagulabilidad: cancer, embarazo, anticonceptivos, trombofilias."
            ]
          },
          {
            "tipo": "pasos",
            "titulo": "Abordaje diagnostico",
            "items": [
              "Estimar la probabilidad clinica (por ejemplo, escala de Wells).",
              "Probabilidad baja: dimero D; si es negativo, descarta TEP.",
              "Probabilidad alta o dimero D positivo: angiotomografia de torax (estudio confirmatorio).",
              "En el inestable o con falla renal, considerar gammagrafia V/Q o ecocardiograma."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "TEP masiva",
            "texto": "La TEP con inestabilidad hemodinamica (hipotension o choque) por falla aguda del ventriculo derecho es candidata a trombolisis. El resto se maneja con anticoagulacion. La taquicardia y la hipoxemia con radiografia casi normal deben hacer sospechar TEP."
          }
        ],
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "titulo": "Opioides fuertes",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Opioides y reversor",
            "headers": [
              "Fármaco",
              "Dosis analgésica",
              "Notas"
            ],
            "filas": [
              [
                "Fentanilo",
                "1-2 mcg/kg IV/IN",
                "Inicio rápido; estabilidad hemodinámica; sin liberación de histamina"
              ],
              [
                "Morfina",
                "0.1 mg/kg IV",
                "Más duradera; puede liberar histamina e hipotensar"
              ],
              [
                "Buprenorfina",
                "Agonista parcial",
                "Techo de efecto; analgesia prolongada"
              ],
              [
                "Naloxona",
                "0.04-0.4 mg IV titulada (2-4 mg IN)",
                "Revierte la depresión respiratoria opioide"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Fentanilo: el opioide del paciente frágil",
            "texto": "Por su rapidez y su escasa repercusión sobre la presión (no libera histamina), el fentanilo es preferible en el trauma y el inestable. La morfina, por su efecto histaminérgico y vasodilatador, puede no ser ideal en el hipotenso."
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "Naloxona: titular, no inundar",
            "texto": "En sobredosis el objetivo es restaurar la respiración, NO despertar por completo. Empiece bajo (0.04-0.1 mg IV) y repita: una dosis alta de golpe puede precipitar abstinencia aguda, agitación, vómito y edema pulmonar. Recuerde la re-narcotización: vigile, porque la naloxona dura menos que muchos opioides."
          }
        ],
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      },
      {
        "titulo": "Organofosforados",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Los organofosforados (insecticidas, gases nerviosos) inhiben la acetilcolinesterasa: la acetilcolina se acumula y produce una crisis colinérgica (DUMBELS) que mata por broncorrea, broncoespasmo y bradicardia. La protección personal es prioritaria (riesgo de contaminación del rescatador)."
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "Atropina a dosis altas y pralidoxima",
            "texto": "Atropina 2-5 mg IV doblando la dosis cada 3-5 min hasta secar las secreciones bronquiales (el objetivo NO es la frecuencia ni la pupila, sino el pulmón seco): pueden necesitarse decenas de miligramos. La pralidoxima (2-PAM) reactiva la enzima: 30 mg/kg IV (1-2 g) en carga y luego infusión; reduce la debilidad nicotínica (fasciculaciones, parálisis)."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Protégete primero",
            "texto": "Descontaminar (quitar ropa, lavar) y usar EPP: el tóxico se absorbe por piel y por las secreciones del paciente. La causa habitual de muerte es la insuficiencia respiratoria por secreciones y debilidad de músculos respiratorios."
          }
        ],
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Presión positiva",
        "definicion": "Empuja aire a los pulmones; reduce el retorno venoso si es excesiva.",
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica"
        }
      },
      {
        "termino": "Ahogamiento",
        "definicion": "Insuficiencia respiratoria por sumersion; la hipoxia determina el pronostico.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "termino": "Ahogamiento secundario",
        "definicion": "Deterioro respiratorio tardio por edema pulmonar tras aspirar agua.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "termino": "JumpSTART",
        "definicion": "Adaptacion pediatrica de START con ventilaciones de rescate antes de etiquetar como negro.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "termino": "Toxidrome",
        "definicion": "Síndrome clínico que orienta a una clase de tóxico.",
        "procedencia": {
          "temaOriginal": "farmacologia-toxicologia"
        }
      },
      {
        "termino": "Capnografía",
        "definicion": "Medición del CO2 espirado; confirma de forma fiable la ventilación efectiva.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      },
      {
        "termino": "Hipercapnia permisiva",
        "definicion": "Tolerar CO2 elevado para evitar barotrauma y atrapamiento aéreo.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas",
          "porUnidad": true
        }
      },
      {
        "termino": "MODS",
        "definicion": "Síndrome de disfunción multiorgánica.",
        "procedencia": {
          "temaOriginal": "microbiologia-sepsis"
        }
      },
      {
        "termino": "Líneas B",
        "definicion": "Artefactos ecográficos de edema/síndrome intersticial pulmonar.",
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      },
      {
        "termino": "Insuficiencia respiratoria tipo I",
        "definicion": "Hipoxemia con PaCO2 normal o baja; problema de oxigenacion.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "termino": "Insuficiencia respiratoria tipo II",
        "definicion": "Hipoxemia con hipercapnia; falla de la ventilacion.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "termino": "Enfermedad de Addison",
        "definicion": "Insuficiencia suprarrenal primaria con cortisol bajo, hipotension e hiperpigmentacion.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "termino": "Atropina en organofosforados",
        "definicion": "2-5 mg doblando hasta secar secreciones; objetivo pulmonar, no la FC.",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "¿Qué enzima y dónde convierte angiotensina I en II?",
        "reverso": "La ECA, principalmente en el pulmón.",
        "procedencia": {
          "temaOriginal": "fisiologia-medica"
        }
      },
      {
        "frente": "Por que el oxigeno se administra controlado en EPOC?",
        "reverso": "Porque su estimulo respiratorio puede depender del oxigeno bajo y el exceso puede deprimir la ventilacion.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "frente": "Relacion compresion/ventilacion con dos rescatadores en el niño",
        "reverso": "15:2.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "frente": "Mejor método para confirmar la ventilación",
        "reverso": "La capnografía con onda de ETCO2 sostenida.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      },
      {
        "frente": "Hallazgo del síndrome de Wellens",
        "reverso": "T bifásicas o profundamente invertidas en V2-V3: estenosis crítica de la DA.",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "frente": "Límite de la presión meseta en SDRA",
        "reverso": "Menor a 30 cmH2O.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas",
          "porUnidad": true
        }
      },
      {
        "frente": "Que define a la insuficiencia respiratoria tipo II",
        "reverso": "Hipoxemia con hipercapnia (PaCO2 mayor a 45 mmHg).",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "frente": "Que significa el sindrome HELLP",
        "reverso": "Hemolisis, enzimas hepaticas elevadas y plaquetas bajas.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Por que todo paciente ahogado debe ser valorado en el hospital aunque parezca recuperado?",
        "opciones": [
          "Por tramite administrativo",
          "Por riesgo de deterioro respiratorio tardio (ahogamiento secundario)",
          "Para hidratacion obligatoria",
          "No es necesario si esta consciente"
        ],
        "correcta": 1,
        "explicacion": "Tras aspirar agua puede aparecer edema pulmonar horas despues; por eso se vigila al paciente aunque inicialmente parezca bien.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "pregunta": "Al revertir una sobredosis de opioides con naloxona, el objetivo terapéutico es:",
        "opciones": [
          "Despertar completamente al paciente de inmediato",
          "Restaurar una ventilación adecuada titulando la dosis",
          "Provocar abstinencia para evitar recaídas",
          "Mantener al paciente sedado"
        ],
        "correcta": 1,
        "explicacion": "La meta es recuperar la respiración eficaz, no el despertar total. La reversión brusca puede desencadenar abstinencia aguda con agitación, vómito y edema pulmonar.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "pregunta": "Tras colocar un DSG no se obtiene onda de capnografía. La conducta correcta es:",
        "opciones": [
          "Aumentar la fuerza de ventilación",
          "Asumir buena posición y continuar",
          "Sospechar mala posición, retirar y reinsertar",
          "Inflar más el balón"
        ],
        "correcta": 2,
        "explicacion": "La ausencia de ETCO2 sugiere que el dispositivo no está ventilando los pulmones (posible sellado esofágico). Hay que retirar y reinsertar, no insistir.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      },
      {
        "pregunta": "Una onda de capnografía con pendiente ascendente en la meseta (aleta de tiburón) indica:",
        "opciones": [
          "Hiperventilación",
          "Broncoespasmo (asma o EPOC)",
          "Paro respiratorio",
          "Buena ventilación"
        ],
        "correcta": 1,
        "explicacion": "La aleta de tiburón refleja la espiración prolongada y obstruida del broncoespasmo; la meseta pierde su forma cuadrada normal.",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "pregunta": "Una limitación importante de la oximetría de pulso es que:",
        "opciones": [
          "Detecta la hipoxia de forma muy precoz",
          "Cae tarde respecto al inicio de la hipoxia",
          "Mide la ventilación",
          "Es invasiva"
        ],
        "correcta": 1,
        "explicacion": "La SpO2 desciende cuando la hipoxia ya está establecida; no es un detector precoz. La capnografía y la clínica advierten antes el deterioro ventilatorio.",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "pregunta": "Un paciente con EPOC tiene PaO2 de 52 mmHg y PaCO2 de 58 mmHg. Esto corresponde a:",
        "opciones": [
          "Insuficiencia respiratoria tipo I",
          "Insuficiencia respiratoria tipo II",
          "Gasometria normal",
          "Alcalosis respiratoria"
        ],
        "correcta": 1,
        "explicacion": "La combinacion de hipoxemia con hipercapnia (PaCO2 elevada) define la insuficiencia respiratoria tipo II por falla ventilatoria.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "pregunta": "Un paciente cirrotico con confusion y asterixis probablemente tenga:",
        "opciones": [
          "Sindrome hepatorrenal",
          "Encefalopatia hepatica",
          "Peritonitis bacteriana espontanea",
          "Hemorragia por varices"
        ],
        "correcta": 1,
        "explicacion": "La alteracion mental con asterixis por acumulo de amonio define la encefalopatia hepatica; se trata con lactulosa y corrigiendo el desencadenante.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      }
    ]
  },
  "m7-acceso-extraccion-unico": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Tuberosidad tibial",
        "definicion": "Reparo para el acceso intraóseo en tibia proximal.",
        "procedencia": {
          "temaOriginal": "anatomia-sistematica"
        }
      },
      {
        "termino": "Midazolam IM 10 mg",
        "definicion": "Primera elección sin acceso vascular (RAMPART).",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Por que el acceso intraoseo es eficaz?",
        "reverso": "Porque la medula osea esta muy vascularizada y drena a la circulacion central.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "frente": "Vía para controlar convulsiones sin acceso IV",
        "reverso": "Intranasal o intramuscular (midazolam).",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "frente": "Vía equivalente a la IV cuando no hay acceso venoso",
        "reverso": "La intraósea (IO), con la misma dosis.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "El acceso intraóseo en tibia proximal se referencia respecto a:",
        "opciones": [
          "El maléolo lateral",
          "La tuberosidad tibial",
          "La cabeza del peroné únicamente",
          "La rótula superior"
        ],
        "correcta": 1,
        "explicacion": "Se inserta 1-2 cm medial e inferior a la tuberosidad tibial, en la cara plana de la tibia.",
        "procedencia": {
          "temaOriginal": "anatomia-sistematica"
        }
      },
      {
        "pregunta": "En un niño con convulsión activa sin acceso IV, una opción adecuada es:",
        "opciones": [
          "Esperar a tener vía IV antes de tratar",
          "Midazolam intranasal o IM",
          "Diazepam oral",
          "Adrenalina IM"
        ],
        "correcta": 1,
        "explicacion": "El midazolam intranasal (0.2 mg/kg) o IM permite controlar la crisis sin acceso vascular, evitando retrasos peligrosos en una convulsión prolongada.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "pregunta": "En todo paciente con alteración del estado mental es obligatorio:",
        "opciones": [
          "Intubar de inmediato",
          "Realizar glucometría capilar",
          "Administrar naloxona",
          "Colocar acceso IO"
        ],
        "correcta": 1,
        "explicacion": "La hipoglucemia imita múltiples cuadros neurológicos y es de corrección rápida; la glucometría debe hacerse siempre ante un deterioro del estado mental.",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "pregunta": "Cuando no se logra acceso venoso en un paro cardíaco, la vía equivalente es:",
        "opciones": [
          "Subcutánea",
          "Intraósea",
          "Oral",
          "Sublingual"
        ],
        "correcta": 1,
        "explicacion": "La vía intraósea ofrece una absorción casi inmediata equivalente a la IV y se usa con las mismas dosis cuando el acceso venoso falla o se retrasa.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "pregunta": "Convulsión tónico-clónica de 8 minutos, sin acceso IV. Lo correcto es:",
        "opciones": [
          "Esperar a canalizar para dar lorazepam",
          "Midazolam 10 mg IM ahora",
          "Fenitoína IM",
          "Solo oxígeno y observar"
        ],
        "correcta": 1,
        "explicacion": "Sin vía, el midazolam IM es tan eficaz como el lorazepam IV y evita el retraso de canalizar (RAMPART).",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      }
    ]
  },
  "m5-tt-traquea-laringe": {
    "secciones": [
      {
        "titulo": "Cricotiroidotomía quirúrgica",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Es la vía aérea de rescate cuando \"no se puede intubar, no se puede oxigenar\" (CICO). Se accede a la tráquea a través de la membrana cricotiroidea, palpable entre el cartílago tiroides (manzana de Adán) y el cricoides."
          },
          {
            "tipo": "pasos",
            "titulo": "Técnica bisturí-dedo-bougie",
            "items": [
              "Identificar y estabilizar la laringe; localizar la membrana cricotiroidea.",
              "Incisión vertical en piel, luego horizontal en la membrana con el bisturí.",
              "Introducir el dedo para mantener el trayecto (palpación).",
              "Pasar el bougie hacia la tráquea y deslizar el tubo sobre él.",
              "Confirmar con capnografía y ventilar."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Carina",
        "definicion": "Bifurcación de la tráquea en los bronquios principales.",
        "procedencia": {
          "temaOriginal": "anatomia-sistematica"
        }
      },
      {
        "termino": "i-gel",
        "definicion": "DSG de gel termoplástico que se amolda a la laringe sin necesidad de inflar balón.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      }
    ],
    "flashcards": [],
    "quiz": []
  },
  "m5-tcc-medular-anterior": {
    "secciones": [
      {
        "titulo": "La columna vertebral",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "columna",
            "titulo": "Regiones de la columna vertebral"
          },
          {
            "tipo": "tabla",
            "titulo": "Regiones de la columna",
            "headers": [
              "Region",
              "Vertebras",
              "Nota"
            ],
            "filas": [
              [
                "Cervical",
                "7 (C1-C7)",
                "Mayor movilidad; protege la medula alta"
              ],
              [
                "Toracica",
                "12 (T1-T12)",
                "Articula con las costillas"
              ],
              [
                "Lumbar",
                "5 (L1-L5)",
                "Soporta mayor peso"
              ],
              [
                "Sacro",
                "5 fusionadas",
                "Forma parte de la pelvis"
              ],
              [
                "Coccix",
                "4 fusionadas",
                "Vestigial"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Lesion medular cervical",
            "texto": "Una lesion por arriba de C5 puede comprometer el nervio frenico y paralizar el diafragma, causando paro respiratorio. Por eso en trauma se protege la columna cervical desde el primer momento."
          },
          {
            "tipo": "p",
            "texto": "La medula espinal termina alrededor de L1-L2; por debajo continua como la cauda equina. Las vertebras protegen la medula, y los discos intervertebrales actuan como amortiguadores. Una hernia discal comprime raices nerviosas causando dolor irradiado y deficit neurologico."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "titulo": "Derivaciones y territorios",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Las 12 derivaciones son cámaras que fotografían el corazón desde distintos ángulos. Seis son de los miembros (plano frontal) y seis precordiales (plano horizontal). Agrupar las derivaciones por territorio permite localizar dónde ocurre una isquemia."
          },
          {
            "tipo": "tabla",
            "titulo": "Territorios coronarios en el ECG",
            "headers": [
              "Cara",
              "Derivaciones",
              "Arteria habitual"
            ],
            "filas": [
              [
                "Inferior",
                "DII, DIII, aVF",
                "Coronaria derecha"
              ],
              [
                "Lateral",
                "DI, aVL, V5, V6",
                "Circunfleja"
              ],
              [
                "Septal",
                "V1, V2",
                "Descendente anterior"
              ],
              [
                "Anterior",
                "V3, V4",
                "Descendente anterior"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Imagen en espejo",
            "texto": "Una lesión en la cara inferior (DII, DIII, aVF) puede mostrar descenso del ST en las derivaciones opuestas (DI, aVL): son cambios recíprocos que refuerzan el diagnóstico de infarto."
          }
        ],
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Descendente anterior",
        "definicion": "Arteria que irriga la cara anterior y el septo; su oclusión da IAM anterior.",
        "procedencia": {
          "temaOriginal": "anatomia-sistematica"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que arteria coronaria irriga gran parte del ventriculo izquierdo?",
        "reverso": "La descendente anterior izquierda.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un IAMCEST con elevación del ST en II, III y aVF localiza la lesión en la cara:",
        "opciones": [
          "Anterior",
          "Lateral",
          "Inferior",
          "Posterior"
        ],
        "correcta": 2,
        "explicacion": "II, III y aVF corresponden a la cara inferior, irrigada habitualmente por la coronaria derecha.",
        "procedencia": {
          "temaOriginal": "anatomia-sistematica"
        }
      },
      {
        "pregunta": "Una lesion medular completa por encima de C5 pone en riesgo la vida principalmente porque:",
        "opciones": [
          "Paraliza los brazos",
          "Compromete el nervio frenico y la respiracion diafragmatica",
          "Causa perdida de la vision",
          "Detiene la digestion"
        ],
        "correcta": 1,
        "explicacion": "El nervio frenico (C3-C5) inerva el diafragma; una lesion por encima de C5 puede paralizarlo y provocar paro respiratorio.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "pregunta": "Un QRS positivo en DI y negativo en aVF indica:",
        "opciones": [
          "Eje normal",
          "Desviación del eje a la izquierda",
          "Desviación del eje a la derecha",
          "Desviación extrema"
        ],
        "correcta": 1,
        "explicacion": "DI positivo con aVF negativo corresponde a desviación del eje a la izquierda, asociada a causas como hemibloqueo anterior izquierdo o hipertrofia.",
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      }
    ]
  },
  "m1-pab-avdi": {
    "secciones": [
      {
        "titulo": "Hemostasia y cascada de coagulacion",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "coagulacion"
          },
          {
            "tipo": "tabla",
            "titulo": "Hemostasia primaria vs secundaria",
            "headers": [
              "Rasgo",
              "Primaria",
              "Secundaria"
            ],
            "filas": [
              [
                "Protagonista",
                "Plaquetas y endotelio",
                "Factores de coagulacion"
              ],
              [
                "Resultado",
                "Tapon plaquetario",
                "Malla de fibrina estable"
              ],
              [
                "Sangrado tipico",
                "Mucocutaneo, petequias",
                "Profundo, articular, muscular"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Vias de la coagulacion y pruebas",
            "items": [
              "Via extrinseca (factor tisular): se mide con el TP/INR.",
              "Via intrinseca (de contacto): se mide con el TTPa.",
              "Via comun: activacion del factor X, trombina y fibrina.",
              "Los factores II, VII, IX y X dependen de la vitamina K."
            ]
          },
          {
            "tipo": "formula",
            "texto": "Regla nemotecnica: TP mide la via extrinseca; TTPa mide la via intrinseca",
            "nota": "La warfarina prolonga el TP/INR (afecta factores dependientes de vitamina K); la heparina no fraccionada prolonga el TTPa."
          }
        ],
        "procedencia": {
          "temaOriginal": "hematologia-coagulacion"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "SN simpático vs. parasimpático",
        "definicion": "Lucha/huida vs. reposo/digestión; gobiernan la respuesta hemodinámica.",
        "procedencia": {
          "temaOriginal": "anatomia-sistematica"
        }
      },
      {
        "termino": "AVDI (AVPU)",
        "definicion": "Tamiz rapido del estado de conciencia: Alerta, responde a la Voz, responde al Dolor, Inconsciente.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "termino": "Sepsis",
        "definicion": "Disfunción orgánica por respuesta desregulada del huésped a la infección.",
        "procedencia": {
          "temaOriginal": "microbiologia-sepsis"
        }
      },
      {
        "termino": "Reticulocitos",
        "definicion": "Eritrocitos jovenes; su numero indica la respuesta de la medula osea.",
        "procedencia": {
          "temaOriginal": "hematologia-coagulacion"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que significan las siglas AVDI",
        "reverso": "Alerta, responde a la Voz, responde al Dolor, Inconsciente.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "frente": "Contraindicación por estado de conciencia",
        "reverso": "Reflejo nauseoso intacto o paciente consciente.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      },
      {
        "frente": "Tres citocinas centrales en la respuesta sistémica/sepsis",
        "reverso": "TNF-α, IL-1 e IL-6.",
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia"
        }
      },
      {
        "frente": "¿Qué pretratamiento conserva indicación clara?",
        "reverso": "Fentanilo, para atenuar la respuesta simpática a la laringoscopia.",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un paciente solo abre los ojos y se mueve cuando se le aplica un estimulo doloroso. En AVDI se clasifica como:",
        "opciones": [
          "A (Alerta)",
          "V (responde a la Voz)",
          "D (responde al Dolor)",
          "I (Inconsciente)"
        ],
        "correcta": 2,
        "explicacion": "Responde unicamente al estimulo doloroso: nivel D, que corresponde aproximadamente a un Glasgow de 8.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "pregunta": "La sepsis se define fundamentalmente como:",
        "opciones": [
          "Cualquier infección bacteriana",
          "Disfunción orgánica por una respuesta desregulada del huésped a la infección",
          "Fiebre aislada",
          "Presencia de bacterias en sangre sin más"
        ],
        "correcta": 1,
        "explicacion": "Lo que define la sepsis es la disfunción orgánica derivada de la respuesta inmune desregulada, no solo la infección.",
        "procedencia": {
          "temaOriginal": "microbiologia-sepsis"
        }
      },
      {
        "pregunta": "El bolo estandar de reanimacion con cristaloide en pediatria es de:",
        "opciones": [
          "5 mL/kg",
          "10 mL/kg",
          "20 mL/kg",
          "40 mL/kg"
        ],
        "correcta": 2,
        "explicacion": "Se administra un bolo de 20 mL/kg de cristaloide isotonico y se reevalua la respuesta antes de repetir.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      },
      {
        "pregunta": "Para que la negativa de atención de un paciente sea válida, este debe:",
        "opciones": [
          "Estar consciente, orientado y competente",
          "Ser menor de edad",
          "Estar bajo efecto de alcohol",
          "Tener el estado de conciencia alterado"
        ],
        "correcta": 0,
        "explicacion": "Solo un paciente competente (orientado, sin alteración por sustancias, hipoxia o TCE) puede rechazar válidamente la atención.",
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ]
  },
  "m2-afi-cardiovascular": {
    "secciones": [
      {
        "titulo": "Anatomia del corazon",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "corazon",
            "titulo": "Camaras y valvulas del corazon"
          },
          {
            "tipo": "p",
            "texto": "El corazon tiene cuatro camaras: dos auriculas que reciben sangre y dos ventriculos que la expulsan. El lado derecho maneja sangre desoxigenada hacia los pulmones; el izquierdo, sangre oxigenada hacia el cuerpo. El tabique los separa."
          },
          {
            "tipo": "tabla",
            "titulo": "Valvulas cardiacas",
            "headers": [
              "Valvula",
              "Ubicacion",
              "Funcion"
            ],
            "filas": [
              [
                "Tricuspide",
                "Auricula derecha a ventriculo derecho",
                "Evita reflujo hacia la auricula"
              ],
              [
                "Pulmonar",
                "Ventriculo derecho a arteria pulmonar",
                "Salida a los pulmones"
              ],
              [
                "Mitral",
                "Auricula izquierda a ventriculo izquierdo",
                "Evita reflujo hacia la auricula"
              ],
              [
                "Aortica",
                "Ventriculo izquierdo a la aorta",
                "Salida a la circulacion sistemica"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Coronarias",
            "texto": "Las arterias coronarias nacen de la raiz aortica y nutren al miocardio durante la diastole. La descendente anterior izquierda irriga gran parte del ventriculo izquierdo; su oclusion causa el infarto mas extenso y peligroso."
          }
        ],
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "titulo": "La circulacion",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "circulacion",
            "titulo": "Circulacion mayor y menor"
          },
          {
            "tipo": "p",
            "texto": "Existen dos circuitos: la circulacion menor o pulmonar lleva sangre del ventriculo derecho a los pulmones para oxigenarse y regresa a la auricula izquierda; la circulacion mayor o sistemica lleva sangre oxigenada del ventriculo izquierdo al cuerpo y regresa desoxigenada a la auricula derecha."
          },
          {
            "tipo": "lista",
            "titulo": "Tipos de vasos",
            "items": [
              "Arterias: llevan sangre a presion lejos del corazon; paredes gruesas y elasticas.",
              "Arteriolas: regulan la resistencia y la presion arterial; son la llave del flujo.",
              "Capilares: sitio de intercambio de gases y nutrientes; pared de una celula.",
              "Venas: regresan sangre al corazon a baja presion; tienen valvulas."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "titulo": "Conduccion electrica",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "conduccion",
            "titulo": "Sistema de conduccion del corazon"
          },
          {
            "tipo": "pasos",
            "titulo": "Via de conduccion",
            "items": [
              "Nodo sinoauricular (marcapasos natural, 60-100 por minuto) inicia el impulso.",
              "Se despolarizan las auriculas y la sangre pasa a los ventriculos.",
              "Nodo auriculoventricular retrasa el impulso para permitir el llenado.",
              "Haz de His y sus ramas conducen el impulso al tabique.",
              "Fibras de Purkinje despolarizan los ventriculos de abajo hacia arriba."
            ]
          },
          {
            "tipo": "p",
            "texto": "Si el nodo sinusal falla, un marcapasos subsidiario toma el control a menor frecuencia: el nodo AV (40-60) o las fibras ventriculares (20-40). Esto explica los ritmos de escape en bloqueos cardiacos."
          }
        ],
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "titulo": "Sistema cardiovascular",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Los fármacos cardiovasculares modulan la frecuencia, la contractilidad y el tono vascular actuando sobre receptores adrenérgicos, canales iónicos o el sistema nervioso autónomo. Conocer el receptor predice el efecto: alfa-1 vasoconstriñe, beta-1 acelera y contrae el corazón, beta-2 broncodilata y vasodilata."
          },
          {
            "tipo": "tabla",
            "titulo": "Fármacos cardiovasculares clave",
            "headers": [
              "Fármaco",
              "Mecanismo",
              "Indicación y dosis prehospitalaria"
            ],
            "filas": [
              [
                "Adrenalina (epinefrina)",
                "Agonista alfa y beta",
                "Paro: 1 mg IV/IO cada 3-5 min. Anafilaxia: 0.3-0.5 mg IM (0.01 mg/kg en niños)."
              ],
              [
                "Atropina",
                "Antagonista muscarínico (vagolítico)",
                "Bradicardia sintomática: 0.5 mg IV cada 3-5 min, máximo 3 mg."
              ],
              [
                "Amiodarona",
                "Antiarrítmico clase III (bloquea canales de K)",
                "FV/TV sin pulso refractaria: 300 mg IV en bolo, segunda dosis de 150 mg."
              ],
              [
                "Nitroglicerina",
                "Vasodilatador (libera óxido nítrico)",
                "Dolor torácico isquémico: 0.4 mg sublingual cada 5 min hasta 3 dosis si TAS mayor de 90."
              ],
              [
                "Aspirina",
                "Antiagregante (inhibe COX-1)",
                "Sospecha de SICA: 160-325 mg masticable."
              ],
              [
                "Adenosina",
                "Frena el nodo AV",
                "TSV: 6 mg IV rápido seguido de bolo de salino; segunda dosis de 12 mg."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Nitroglicerina y disfunción eréctil",
            "texto": "Nunca administre nitroglicerina si el paciente tomó sildenafil (Viagra) o similares en las últimas 24-48 horas: la combinación produce hipotensión profunda y refractaria. Verifique siempre antes de dar nitratos."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "titulo": "Selección por escenario",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Vía según situación",
            "headers": [
              "Escenario",
              "Vía preferida",
              "Razón"
            ],
            "filas": [
              [
                "Paro cardíaco",
                "IV o IO",
                "Efecto inmediato; IO si no hay acceso venoso."
              ],
              [
                "Anafilaxia",
                "Adrenalina IM",
                "Rápida, fiable y más segura que la IV."
              ],
              [
                "Convulsión sin acceso IV",
                "Midazolam IN o IM",
                "Controla la crisis sin canalizar."
              ],
              [
                "Dolor torácico isquémico",
                "Nitroglicerina sublingual",
                "Inicio rápido evitando primer paso."
              ],
              [
                "Crisis asmática",
                "Salbutamol nebulizado",
                "Acción local directa en el bronquio."
              ],
              [
                "Sobredosis de opioides",
                "Naloxona IN o IM/IV",
                "IN si no hay acceso; titular a la ventilación."
              ]
            ]
          },
          {
            "tipo": "pasos",
            "titulo": "Razonamiento para elegir la vía",
            "items": [
              "Defina la urgencia: si necesita efecto inmediato, busque IV o IO.",
              "Valore el acceso vascular disponible y el estado del paciente.",
              "Considere alternativas sin aguja (IN, IM, nebulizada) si el acceso falla.",
              "Ajuste la dosis a la vía elegida y documente la administración."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "La vía cambia la dosis y la velocidad",
            "texto": "Una misma dosis no produce el mismo efecto por todas las vías. Confirme siempre la dosis correcta para la vía elegida; por ejemplo, la naloxona intranasal suele requerir una dosis mayor que la IV."
          }
        ],
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "titulo": "EVC: isquémico frente a hemorrágico",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El evento vascular cerebral isquémico (cerca del 85 por ciento) se debe a la oclusión de una arteria cerebral; el hemorrágico (cerca del 15 por ciento) a la rotura de un vaso. Clínicamente pueden ser indistinguibles en el campo, por lo que la tomografía es indispensable antes de cualquier tratamiento de reperfusión."
          },
          {
            "tipo": "lista",
            "titulo": "Pistas clínicas",
            "items": [
              "Hemorrágico: cefalea intensa súbita, vómito y deterioro rápido de la conciencia.",
              "Isquémico: déficit focal de instalación brusca sin cefalea predominante.",
              "La hemorragia subaracnoidea da la peor cefalea de la vida, en trueno.",
              "Ninguna pista es definitiva: solo la imagen distingue ambos."
            ]
          },
          {
            "tipo": "diagrama",
            "clave": "encefalo"
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "No bajes la presión a ciegas",
            "texto": "En el EVC isquémico se tolera presión elevada (hipertensión permisiva) para mantener la perfusión de la penumbra; bajarla bruscamente daña. El manejo de la presión difiere por completo en el hemorrágico, donde sí se controla. Por eso la imagen es prioritaria."
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "titulo": "Fuentes y evidencia",
        "bloques": [
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "EMCrit — Push-Dose Pressors",
                "url": "https://emcrit.org/emcrit/bolus-dose-pressors/"
              },
              {
                "nombre": "EMCrit — Push-Dose Pressors Update",
                "url": "https://emcrit.org/emcrit/push-dose-pressor-update/"
              },
              {
                "nombre": "LITFL — Inotropes and Vasopressors",
                "url": "https://litfl.com/",
                "nota": "Resumen de receptores y dosis"
              },
              {
                "nombre": "AHA — Soporte Vital Cardiovascular Avanzado (ACLS)",
                "url": "https://cpr.heart.org/",
                "nota": "Infusiones en shock y bradicardia"
              },
              {
                "nombre": "Surviving Sepsis Campaign",
                "nota": "Noradrenalina de primera línea y vasopresina ahorradora"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Gasto cardiaco",
        "definicion": "Volumen de sangre que el corazon bombea por minuto; frecuencia por volumen sistolico.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "termino": "Nodo sinoauricular",
        "definicion": "Marcapasos natural del corazon, dispara 60-100 veces por minuto.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "termino": "RCE",
        "definicion": "Retorno de la circulación espontánea; inicia los cuidados posparo.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "termino": "α1",
        "definicion": "Vasoconstricción y aumento de la resistencia vascular sistémica.",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "termino": "β1 vs. β2",
        "definicion": "β1 = corazón (FC y contractilidad); β2 = bronquios y vasos (dilatación).",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "¿Qué arteria coronaria suele irrigar la cara inferior del corazón?",
        "reverso": "La coronaria derecha (derivaciones II, III, aVF).",
        "procedencia": {
          "temaOriginal": "anatomia-sistematica"
        }
      },
      {
        "frente": "Cual es el marcapasos natural del corazon?",
        "reverso": "El nodo sinoauricular (SA).",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "frente": "Que produce el primer ruido cardiaco (S1)?",
        "reverso": "El cierre de las valvulas auriculoventriculares (mitral y tricuspide).",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "frente": "¿Qué hacer con la extremidad afectada?",
        "reverso": "Inmovilizarla a la altura del corazón y retirar anillos/ropa apretada.",
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      },
      {
        "frente": "Por qué la adenosina necesita bolo de arrastre",
        "reverso": "Tiene vida media de segundos; el bolo la empuja al corazón antes de inactivarse.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "frente": "Qué indica un ascenso súbito de ETCO2 en RCP",
        "reverso": "Posible retorno de la circulación espontánea.",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "frente": "¿Por qué la dobutamina puede hipotensar?",
        "reverso": "Estimula β2 vascular (vasodilatación) además de β1.",
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "En el shock cardiogénico, el determinante del gasto cardíaco primariamente afectado es:",
        "opciones": [
          "La precarga",
          "La poscarga",
          "El inotropismo (contractilidad)",
          "La frecuencia exclusivamente"
        ],
        "correcta": 2,
        "explicacion": "El corazón pierde fuerza de contracción; de ahí el uso de inotrópicos como la dobutamina.",
        "procedencia": {
          "temaOriginal": "fisiologia-medica"
        }
      },
      {
        "pregunta": "Un paciente con taquicardia ventricular a 200 por minuto desarrolla isquemia. La razon fisiologica principal es:",
        "opciones": [
          "Aumenta la diastole y se llena demasiado el corazon",
          "La diastole se acorta y reduce la perfusion coronaria",
          "Las coronarias se llenan en sistole",
          "Aumenta la precarga en exceso"
        ],
        "correcta": 1,
        "explicacion": "Las coronarias se perfunden en diastole; una frecuencia muy alta acorta la diastole y disminuye el flujo coronario, agravando la isquemia.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "pregunta": "La presion arterial es el producto de:",
        "opciones": [
          "Frecuencia cardiaca por precarga",
          "Gasto cardiaco por resistencia vascular sistemica",
          "Volumen sistolico por poscarga",
          "Contractilidad por precarga"
        ],
        "correcta": 1,
        "explicacion": "La presion arterial media es aproximadamente el gasto cardiaco multiplicado por la resistencia vascular sistemica; ambos pueden alterarse en el shock.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "pregunta": "En el shock cardiogenico el problema principal es:",
        "opciones": [
          "Perdida de volumen sanguineo",
          "Vasodilatacion masiva",
          "Falla de la contractilidad miocardica",
          "Aumento excesivo de la precarga"
        ],
        "correcta": 2,
        "explicacion": "En el shock cardiogenico el corazon no contrae con fuerza suficiente (falla la contractilidad), por lo que cae el gasto cardiaco a pesar de un volumen adecuado.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "pregunta": "Por que la sangre del intestino pasa primero por el higado?",
        "opciones": [
          "Para oxigenarse",
          "Porque la vena porta lleva los nutrientes al higado para su procesamiento",
          "Para filtrarse en el rinon",
          "Para llegar mas rapido al corazon"
        ],
        "correcta": 1,
        "explicacion": "La vena porta conduce la sangre rica en nutrientes desde el intestino al higado, que la procesa, almacena y detoxifica antes de enviarla a la circulacion general.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "pregunta": "Durante una RCP, el ETCO₂ sube súbitamente de 12 a 40 mmHg. Esto sugiere:",
        "opciones": [
          "Hiperventilación",
          "Retorno de la circulación espontánea (ROSC)",
          "Desplazamiento del tubo",
          "Embolia pulmonar"
        ],
        "correcta": 1,
        "explicacion": "El ascenso brusco del ETCO₂ refleja el restablecimiento del gasto cardíaco: signo de ROSC.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "pregunta": "Durante la RCP, el ETCO2 sube súbitamente de 12 a 40 mmHg. Esto sugiere:",
        "opciones": [
          "Falla del capnógrafo",
          "Retorno de la circulación espontánea",
          "Hiperventilación",
          "Desconexión del tubo"
        ],
        "correcta": 1,
        "explicacion": "Un ascenso brusco y sostenido del ETCO2 refleja la recuperación del gasto cardíaco y suele preceder al pulso palpable.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "pregunta": "La diferencia funcional entre un vasopresor y un inotrópico es que el inotrópico:",
        "opciones": [
          "Aumenta la resistencia vascular",
          "Aumenta la contractilidad miocárdica",
          "Disminuye la frecuencia",
          "Solo vasodilata"
        ],
        "correcta": 1,
        "explicacion": "El inotrópico mejora la fuerza de contracción (gasto), mientras el vasopresor eleva la resistencia (presión).",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "pregunta": "Ventaja de la fenilefrina sobre la adrenalina en push-dose:",
        "opciones": [
          "Broncodilata más",
          "Es α1 puro: no añade taquicardia",
          "Dura horas",
          "Aumenta la contractilidad"
        ],
        "correcta": 1,
        "explicacion": "Al ser α1 puro, sube la PA sin acelerar el corazón: útil si ya hay taquicardia.",
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      }
    ]
  },
  "m3-va-repaso-anatomia": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Efecto Bohr",
        "definicion": "Acidosis/CO₂/fiebre desplazan la curva de O₂ a la derecha, liberando O₂ a los tejidos.",
        "procedencia": {
          "temaOriginal": "fisiologia-medica",
          "porUnidad": true
        }
      },
      {
        "termino": "Poscarga",
        "definicion": "Resistencia que el ventriculo debe vencer para eyectar la sangre.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo",
          "porUnidad": true
        }
      },
      {
        "termino": "Diastole",
        "definicion": "Fase de relajacion y llenado; durante ella se perfunden las coronarias.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Reparo anatómico para IO tibial",
        "reverso": "Tuberosidad tibial: 1-2 cm medial e inferior a ella.",
        "procedencia": {
          "temaOriginal": "anatomia-sistematica",
          "porUnidad": true
        }
      },
      {
        "frente": "¿Hacia dónde desplaza la acidosis la curva de oxihemoglobina y qué implica?",
        "reverso": "A la derecha: la hemoglobina suelta más O₂ a los tejidos (efecto Bohr).",
        "procedencia": {
          "temaOriginal": "fisiologia-medica",
          "porUnidad": true
        }
      },
      {
        "frente": "Tres determinantes del volumen sistólico",
        "reverso": "Precarga, poscarga e inotropismo (contractilidad).",
        "procedencia": {
          "temaOriginal": "fisiologia-medica",
          "porUnidad": true
        }
      },
      {
        "frente": "Cuando se perfunden las coronarias?",
        "reverso": "Durante la diastole, cuando el miocardio esta relajado.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo",
          "porUnidad": true
        }
      },
      {
        "frente": "Que valvula separa la auricula izquierda del ventriculo izquierdo?",
        "reverso": "La valvula mitral.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo",
          "porUnidad": true
        }
      },
      {
        "frente": "Que es la poscarga?",
        "reverso": "La resistencia que el ventriculo debe vencer para eyectar la sangre.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo",
          "porUnidad": true
        }
      },
      {
        "frente": "Cual es el volumen corriente normal?",
        "reverso": "Aproximadamente 500 mL.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo",
          "porUnidad": true
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "La fiebre, la acidosis y la hipercapnia desplazan la curva de disociación de la oxihemoglobina:",
        "opciones": [
          "A la izquierda, reteniendo O₂",
          "A la derecha, cediendo más O₂ a los tejidos",
          "No la modifican",
          "La hacen lineal"
        ],
        "correcta": 1,
        "explicacion": "Es el efecto Bohr: condiciones de demanda tisular elevada hacen que la hemoglobina libere O₂ más fácilmente.",
        "procedencia": {
          "temaOriginal": "fisiologia-medica",
          "porUnidad": true
        }
      }
    ]
  },
  "m1-pab-rcp-legos-adulto": {
    "secciones": [
      {
        "titulo": "Cadena de supervivencia",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La cadena de supervivencia es la secuencia de acciones que, encadenadas y a tiempo, maximizan la posibilidad de sobrevivir a un paro cardiaco. Un eslabon roto compromete toda la cadena."
          },
          {
            "tipo": "lista",
            "titulo": "Eslabones (paro extrahospitalario en el adulto)",
            "items": [
              "Reconocimiento inmediato del paro y activacion del sistema de emergencias.",
              "RCP precoz con enfasis en las compresiones.",
              "Desfibrilacion rapida con DEA.",
              "Soporte vital avanzado eficaz.",
              "Cuidados integrados posparo cardiaco.",
              "Recuperacion y rehabilitacion."
            ]
          },
          {
            "tipo": "diagrama",
            "clave": "corazon"
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "El tiempo es musculo y es cerebro",
            "texto": "Sin RCP, la probabilidad de supervivencia cae entre 7 y 10% por cada minuto que pasa. La RCP precoz por testigos puede duplicar o triplicar la supervivencia."
          }
        ],
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "titulo": "Reconocimiento y activacion",
        "bloques": [
          {
            "tipo": "pasos",
            "titulo": "Secuencia inicial del rescatador unico",
            "items": [
              "Verifica la seguridad de la escena antes de acercarte.",
              "Evalua la respuesta: toca los hombros y pregunta en voz alta si esta bien.",
              "Si no responde, pide ayuda y activa el sistema de emergencias (911) o envia a alguien por el DEA.",
              "Comprueba simultaneamente respiracion y pulso carotideo durante no mas de 10 segundos.",
              "Si no respira o solo boquea (respiracion agonica) y no hay pulso, inicia RCP de inmediato."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "El boqueo no es respirar",
            "texto": "La respiracion agonica (gasping) es un reflejo del tronco encefalico, no ventilacion eficaz. Es un signo de paro: no esperes a que se confirme, inicia compresiones."
          }
        ],
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "titulo": "RCP de alta calidad",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Las compresiones generan flujo sanguineo a corazon y cerebro. Su calidad determina el resultado: profundidad correcta, frecuencia adecuada, reexpansion completa y minimas interrupciones."
          },
          {
            "tipo": "tabla",
            "titulo": "Parametros de RCP de alta calidad por edad",
            "headers": [
              "Parametro",
              "Adulto",
              "Niño",
              "Lactante"
            ],
            "filas": [
              [
                "Frecuencia",
                "100 a 120 por minuto",
                "100 a 120 por minuto",
                "100 a 120 por minuto"
              ],
              [
                "Profundidad",
                "Al menos 5 cm (max 6)",
                "Un tercio del torax (5 cm)",
                "Un tercio del torax (4 cm)"
              ],
              [
                "Tecnica",
                "Dos manos",
                "Una o dos manos",
                "Dos dedos o dos pulgares"
              ],
              [
                "Relacion compresion/ventilacion (1 rescatador)",
                "30:2",
                "30:2",
                "30:2"
              ],
              [
                "Relacion (2 rescatadores)",
                "30:2",
                "15:2",
                "15:2"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Pilares de la calidad",
            "items": [
              "Comprime fuerte y rapido en el centro del torax (mitad inferior del esternon).",
              "Permite la reexpansion completa entre compresiones; no te apoyes en el torax.",
              "Minimiza las interrupciones: menos de 10 segundos por pausa.",
              "Evita la ventilacion excesiva, que eleva la presion intratoracica y reduce el retorno venoso.",
              "Cambia de compresor cada 2 minutos para evitar la fatiga."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Fraccion de compresion toracica",
            "texto": "Es el porcentaje del tiempo total de reanimacion en que efectivamente se comprime. La meta es mayor al 60%, idealmente 80%. Cada segundo sin comprimir, la presion de perfusion coronaria cae y hay que reconstruirla."
          }
        ],
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "titulo": "Errores y seguridad farmacológica",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Errores frecuentes a evitar",
            "items": [
              "Confundir concentraciones de adrenalina: 1 mg/mL (anafilaxia IM) frente a 0.1 mg/mL (paro IV).",
              "No reevaluar la TA antes de repetir nitroglicerina.",
              "Dar la dosis pediátrica como si fuera de adulto: siempre calcular por peso.",
              "Olvidar el bolo de arrastre tras la adenosina, que se inactiva en segundos."
            ]
          },
          {
            "tipo": "pasos",
            "titulo": "Cálculo de dosis por peso",
            "items": [
              "Confirme el peso en kilogramos (estime con cinta de Broselow en niños).",
              "Multiplique la dosis por kg por el peso para obtener la dosis total.",
              "Convierta la dosis total a volumen usando la concentración del vial.",
              "Verifique en voz alta con el compañero antes de administrar."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "titulo": "Principios de la RCP de alta calidad",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La supervivencia en el paro cardíaco depende menos de los fármacos y más de las compresiones de alta calidad ininterrumpidas y de la desfibrilación temprana cuando está indicada. Todo el algoritmo ACLS se construye sobre esta base; cualquier intervención que interrumpa las compresiones debe justificarse y minimizarse."
          },
          {
            "tipo": "lista",
            "titulo": "Criterios de RCP de alta calidad",
            "items": [
              "Frecuencia de 100 a 120 compresiones por minuto.",
              "Profundidad de al menos 5 cm y no más de 6 cm en el adulto.",
              "Permitir el reexpansión torácica completa entre compresiones.",
              "Minimizar las interrupciones: fracción de compresión torácica mayor al 60 por ciento.",
              "Evitar la ventilación excesiva; una vez con vía aérea avanzada, una ventilación cada 6 segundos (10 por minuto).",
              "Rotar al compresor cada 2 minutos para evitar la fatiga."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "La capnografía guía la reanimación",
            "texto": "Un ETCO2 menor a 10 mmHg durante la RCP sugiere compresiones de mala calidad o muy bajo gasto; busca mejorar la técnica. Un ascenso brusco y sostenido del ETCO2 por arriba de 35 a 40 mmHg suele anunciar el retorno de la circulación espontánea antes incluso de palpar pulso."
          },
          {
            "tipo": "diagrama",
            "clave": "ecg"
          }
        ],
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "titulo": "Dosis y liquidos por peso",
        "bloques": [
          {
            "tipo": "p",
            "texto": "En pediatria casi todo se calcula por peso (kilogramos). Esto exige un peso confiable y calculo cuidadoso, ya que el margen de error es menor que en el adulto."
          },
          {
            "tipo": "formula",
            "texto": "Bolo de reanimacion con cristaloide isotonico: 20 mL/kg, reevaluando tras cada bolo",
            "nota": "Se reevalua la respuesta entre bolos; en cardiopatia o sospecha de sobrecarga se usan volumenes menores y mayor cautela."
          },
          {
            "tipo": "formula",
            "texto": "Mantenimiento (regla 4-2-1): 4 mL/kg/h para los primeros 10 kg, 2 mL/kg/h para los siguientes 10 kg y 1 mL/kg/h por cada kg adicional",
            "nota": "Sirve para estimar el liquido de mantenimiento por hora segun el peso del nino."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Calculo por peso",
            "texto": "Verificar siempre la dosis en mg/kg y el volumen final, y respetar las dosis maximas que coinciden con las del adulto. Un error de un decimal puede ser critico en un lactante."
          }
        ],
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Fraccion de compresion toracica",
        "definicion": "Porcentaje del tiempo de RCP dedicado a comprimir; meta mayor al 60%.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "termino": "Anisocoria",
        "definicion": "Pupilas desiguales; con deterioro sugiere herniacion por compresion del III par.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "termino": "Fracción de compresión",
        "definicion": "Porcentaje del tiempo de paro dedicado a compresiones; meta mayor al 60 por ciento.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "termino": "Aclaramiento de lactato",
        "definicion": "Descenso del lactato; marcador dinámico de reanimación eficaz.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "termino": "Meta de diuresis",
        "definicion": "0.5 ml/kg/h en el adulto; guía real de la reanimación del quemado.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "termino": "Bolo de 20 mL/kg",
        "definicion": "Volumen de reanimacion con cristaloide isotonico, reevaluado entre bolos.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Pupila dilatada fija unilateral en TCE sugiere…",
        "reverso": "Herniación con compresión del III par (oculomotor).",
        "procedencia": {
          "temaOriginal": "anatomia-sistematica"
        }
      },
      {
        "frente": "Rango normal de FC en el adulto",
        "reverso": "60 a 100 latidos por minuto.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "frente": "Frecuencia de compresiones en RCP de alta calidad",
        "reverso": "100 a 120 por minuto.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "frente": "Profundidad de compresion en el adulto",
        "reverso": "Al menos 5 cm, sin exceder 6 cm.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "frente": "Relacion compresion/ventilacion con un rescatador en el adulto",
        "reverso": "30:2.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "frente": "Pupila dilatada fija unilateral con deterioro sugiere…",
        "reverso": "Herniacion cerebral con compresion del III par.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "frente": "Marcador dinámico de reanimación eficaz",
        "reverso": "El aclaramiento (descenso) del lactato.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "frente": "Meta de diuresis en la reanimación del quemado adulto",
        "reverso": "0.5 ml/kg/h.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "La compresion del tercer par craneal (oculomotor) por herniacion produce:",
        "opciones": [
          "Miosis bilateral",
          "Midriasis fija unilateral",
          "Perdida de la audicion",
          "Paralisis de la lengua"
        ],
        "correcta": 1,
        "explicacion": "El III par lleva fibras parasimpaticas que constrinen la pupila; su compresion las anula y aparece una pupila dilatada y fija, signo de herniacion.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "pregunta": "Encuentras a un adulto que no responde y solo boquea de forma ocasional. Que haces?",
        "opciones": [
          "Esperar a ver si recupera la respiracion",
          "Iniciar RCP porque el boqueo es signo de paro",
          "Dar dos ventilaciones y reevaluar 1 minuto",
          "Colocarlo en posicion de recuperacion"
        ],
        "correcta": 1,
        "explicacion": "La respiracion agonica es un reflejo del tronco encefalico, no ventilacion eficaz. Es signo de paro; inicia compresiones de inmediato.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "pregunta": "Cual es la profundidad correcta de las compresiones en un adulto?",
        "opciones": [
          "2 a 3 cm",
          "3 a 4 cm",
          "Al menos 5 cm sin pasar de 6",
          "Mas de 7 cm"
        ],
        "correcta": 2,
        "explicacion": "La profundidad recomendada es al menos 5 cm; pasar de 6 cm aumenta el riesgo de lesion sin mejorar el flujo.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "pregunta": "Por que es perjudicial la ventilacion excesiva durante la RCP?",
        "opciones": [
          "Provoca hiperoxia toxica inmediata",
          "Aumenta la presion intratoracica y reduce el retorno venoso",
          "Enfria al paciente",
          "No tiene ningun efecto"
        ],
        "correcta": 1,
        "explicacion": "Ventilar de mas eleva la presion dentro del torax, disminuye el retorno venoso al corazon y baja el gasto generado por las compresiones.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "pregunta": "Antes de tocar a una persona electrocutada que sigue en contacto con la fuente, debes:",
        "opciones": [
          "Iniciar RCP de inmediato",
          "Cortar o asegurar la fuente de energia",
          "Mojar la zona",
          "Aplicar un torniquete"
        ],
        "correcta": 1,
        "explicacion": "La seguridad es primero: hay que cortar o asegurar la energia, de lo contrario el rescatador tambien se electrocuta.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "pregunta": "Durante una RCP, el ETCO2 sube súbitamente de 12 a 38 mmHg. Esto sugiere:",
        "opciones": [
          "Tubo desplazado",
          "Posible retorno de la circulación espontánea",
          "Hiperventilación",
          "Fallo del capnógrafo"
        ],
        "correcta": 1,
        "explicacion": "Un aumento brusco del ETCO2 durante la reanimación refleja la recuperación de la perfusión pulmonar, signo de retorno de la circulación espontánea.",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "pregunta": "Un ETCO2 sostenido por debajo de 10 mmHg durante la RCP indica principalmente:",
        "opciones": [
          "Excelente calidad de las compresiones",
          "Compresiones ineficaces o muy bajo gasto",
          "Retorno de la circulación",
          "Hiperventilación"
        ],
        "correcta": 1,
        "explicacion": "Un ETCO2 muy bajo durante la reanimación refleja escasa perfusión pulmonar por compresiones de mala calidad y se asocia a peor pronóstico.",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "pregunta": "En un paro no desfibrilable, ¿cuándo se administra la adrenalina?",
        "opciones": [
          "Solo tras la primera descarga",
          "Lo antes posible y se repite cada 3 a 5 minutos",
          "Únicamente si hay RCE",
          "Después de la amiodarona"
        ],
        "correcta": 1,
        "explicacion": "En AESP y asistolia la adrenalina temprana se asocia a mejores resultados; se repite cada 3 a 5 minutos durante la RCP.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      }
    ]
  },
  "m3-md-arritmias-letales": {
    "secciones": [
      {
        "titulo": "Frecuencia cardiaca y frecuencia respiratoria",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La frecuencia cardiaca (FC) se cuenta por palpacion de un pulso central o periferico durante 30 o 60 segundos. La frecuencia respiratoria (FR) se cuenta observando las excursiones del torax sin avisar al paciente, porque al saberse observado modifica su respiracion. Ambas se valoran junto con su calidad: ritmo, fuerza, profundidad y simetria."
          },
          {
            "tipo": "tabla",
            "titulo": "Calidad del pulso",
            "headers": [
              "Hallazgo",
              "Descripcion",
              "Sospecha clinica"
            ],
            "filas": [
              [
                "Filiforme (debil y rapido)",
                "Pulso fino, dificil de palpar",
                "Shock, hipovolemia"
              ],
              [
                "Salton (lleno y fuerte)",
                "Pulso amplio",
                "Hipertension, fiebre, ejercicio"
              ],
              [
                "Irregular",
                "Intervalos desiguales",
                "Arritmia (fibrilacion auricular)"
              ],
              [
                "Ausente periferico, presente central",
                "Solo se palpa carotideo o femoral",
                "Hipotension grave, vasoconstriccion"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Sitios de pulso utiles",
            "items": [
              "Radial: pulso periferico de eleccion en el adulto consciente.",
              "Carotideo: pulso central de eleccion en el adulto inconsciente.",
              "Braquial: pulso de eleccion en el lactante.",
              "Femoral: pulso central alterno cuando el carotideo es inaccesible."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Regla practica de presion por pulso palpable",
            "texto": "Una guia clasica de campo: si se palpa pulso radial, la presion sistolica suele ser de al menos 80 mmHg; solo femoral, alrededor de 70; solo carotideo, alrededor de 60. Es orientativa, no sustituye al baumanometro, pero sirve cuando no hay tiempo de medir."
          }
        ],
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "titulo": "Hipotermia",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La hipotermia es el descenso de la temperatura central por debajo de 35 grados. El frio enlentece el metabolismo y, en grados severos, el corazon se vuelve irritable y propenso a arritmias."
          },
          {
            "tipo": "tabla",
            "titulo": "Grados de hipotermia",
            "headers": [
              "Grado",
              "Temperatura central",
              "Signos"
            ],
            "filas": [
              [
                "Leve",
                "32 a 35 grados",
                "Escalofrios intensos, taquicardia, confusion leve"
              ],
              [
                "Moderada",
                "28 a 32 grados",
                "Cesan los escalofrios, bradicardia, somnolencia"
              ],
              [
                "Severa",
                "Menor a 28 grados",
                "Rigidez, pulso casi imperceptible, riesgo de fibrilacion"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Principios del manejo",
            "items": [
              "Retira al paciente del ambiente frio y quita la ropa mojada.",
              "Recalentamiento pasivo con mantas en hipotermia leve.",
              "Recalentamiento activo externo en moderada (compresas tibias en tronco).",
              "Manipula con suavidad: el corazon hipotermico es muy irritable.",
              "No declares muerto a un hipotermico hasta recalentarlo: no esta muerto hasta estar caliente y muerto."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Caliente y muerto",
            "texto": "En hipotermia severa, el paciente puede parecer fallecido y aun ser reanimable. Continua la RCP y el recalentamiento; las decisiones de cese se toman tras recalentar."
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "titulo": "Toxidromes",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Un toxidrome es un conjunto de signos y síntomas que sugiere una clase de tóxico. Identificarlo permite iniciar tratamiento sin esperar análisis."
          },
          {
            "tipo": "tabla",
            "headers": [
              "Toxidrome",
              "Signos clave",
              "Ejemplos / antídoto"
            ],
            "filas": [
              [
                "Anticolinérgico",
                "Midriasis, piel seca y caliente, retención urinaria, taquicardia, delirio, hipertermia (\"rojo, seco, caliente, loco, ciego\")",
                "Atropina, antihistamínicos / fisostigmina"
              ],
              [
                "Colinérgico",
                "SLUDGE: salivación, lagrimeo, micción, defecación, GI, emesis; miosis, broncorrea, bradicardia",
                "Organofosforados / atropina + pralidoxima"
              ],
              [
                "Simpaticomimético",
                "Midriasis, diaforesis, taquicardia, hipertensión, hipertermia, agitación",
                "Cocaína, anfetaminas / benzodiacepinas"
              ],
              [
                "Opiáceo",
                "Miosis puntiforme, depresión respiratoria, sedación, bradicardia",
                "Heroína, fentanilo / naloxona"
              ],
              [
                "Sedante-hipnótico",
                "Sedación, depresión respiratoria, reflejos disminuidos, pupilas variables",
                "Benzodiacepinas, alcohol / flumazenil (con cautela)"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Diferenciar anticolinérgico de simpaticomimético",
            "texto": "Ambos cursan con taquicardia, midriasis e hipertermia, pero la piel SECA apunta al anticolinérgico y la piel SUDOROSA (diaforesis) al simpaticomimético. Este detalle cambia el enfoque."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-toxicologia"
        }
      },
      {
        "titulo": "Calcio y magnesio",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Calcio: clínica y ECG",
            "headers": [
              "Trastorno",
              "Clínica",
              "ECG"
            ],
            "filas": [
              [
                "Hipocalcemia",
                "Espasmos, tetania, signos de Chvostek y Trousseau",
                "QT prolongado."
              ],
              [
                "Hipercalcemia",
                "Debilidad, confusión, estreñimiento, litiasis",
                "QT acortado."
              ]
            ]
          },
          {
            "tipo": "p",
            "texto": "El magnesio es cofactor de muchas enzimas y modula los canales de potasio y calcio. Su deficiencia es frecuente y se asocia a arritmias, en particular a la taquicardia ventricular polimorfa conocida como torsades de pointes."
          },
          {
            "tipo": "tabla",
            "titulo": "Magnesio: clínica y manejo",
            "headers": [
              "Trastorno",
              "Manifestaciones",
              "Manejo"
            ],
            "filas": [
              [
                "Hipomagnesemia",
                "Temblor, arritmias, torsades de pointes",
                "Sulfato de magnesio 1-2 g IV."
              ],
              [
                "Hipermagnesemia",
                "Hiporreflexia, debilidad, hipotensión, depresión respiratoria",
                "Suspender aportes; calcio como antagonista."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Magnesio en torsades",
            "texto": "El sulfato de magnesio 1-2 g IV es el tratamiento de elección de la torsades de pointes, incluso con magnesio sérico normal, porque estabiliza la membrana ventricular."
          }
        ],
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      },
      {
        "titulo": "Estabilidad e inestabilidad",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El primer paso ante cualquier arritmia no es nombrar el ritmo sino determinar si el paciente está estable o inestable. La inestabilidad indica que la arritmia compromete la perfusión y obliga a un tratamiento eléctrico inmediato."
          },
          {
            "tipo": "lista",
            "titulo": "Signos de inestabilidad (las cuatro)",
            "items": [
              "Hipotensión o signos de shock (piel fría, livideces, alteración del estado mental).",
              "Dolor torácico isquémico de tipo anginoso.",
              "Insuficiencia cardíaca aguda o edema pulmonar.",
              "Alteración aguda del estado de conciencia por bajo gasto."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "El ritmo no manda; el paciente manda",
            "texto": "Una taquicardia a 150 latidos por minuto en un paciente despierto y normotenso se trata distinto que la misma frecuencia con shock. Trate al paciente que tiene la arritmia, no al número del monitor."
          },
          {
            "tipo": "diagrama",
            "clave": "conduccion"
          }
        ],
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "titulo": "Taquicardias de complejo estrecho",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El complejo estrecho (QRS menor a 0.12 s) indica origen supraventricular. Incluye la taquicardia sinusal, la taquicardia supraventricular paroxística (TSVP) por reentrada y la fibrilación o flutter auricular. El ritmo regular o irregular orienta el diagnóstico."
          },
          {
            "tipo": "pasos",
            "titulo": "Manejo de la TSVP estable y regular",
            "items": [
              "Maniobras vagales (Valsalva modificada con elevación de piernas).",
              "Adenosina 6 mg IV en bolo rápido seguido de descarga de solución salina.",
              "Si no revierte, adenosina 12 mg IV; puede repetirse una vez.",
              "Si persiste, considerar betabloqueador o calcioantagonista (diltiazem o verapamilo).",
              "Si en cualquier momento hay inestabilidad: cardioversión sincronizada."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Adenosina: aviso al paciente",
            "texto": "La adenosina tiene vida media de pocos segundos y produce una breve pausa asistólica con sensación de muerte inminente y rubor. Adviértalo, adminístrela por la vía más proximal posible y con bolo rápido seguido de salina."
          }
        ],
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "titulo": "Taquicardias de complejo ancho y fibrilación auricular",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La taquicardia de complejo ancho (QRS mayor o igual a 0.12 s) debe tratarse como taquicardia ventricular hasta demostrar lo contrario, sobre todo en pacientes con cardiopatía estructural. Confundirla con una supraventricular con aberrancia y administrar el fármaco equivocado puede ser fatal."
          },
          {
            "tipo": "pasos",
            "titulo": "TV monomórfica estable",
            "items": [
              "Amiodarona 150 mg IV en 10 minutos; puede repetirse.",
              "Alternativas: procainamida o sotalol segun disponibilidad.",
              "Si hay inestabilidad: cardioversión sincronizada inmediata.",
              "Si es polimórfica (torsades): sulfato de magnesio 1 a 2 g IV y corregir QT/electrolitos."
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Fibrilación auricular con respuesta rápida",
            "items": [
              "Ritmo irregularmente irregular sin ondas P definidas.",
              "Estable: control de frecuencia con diltiazem o betabloqueador.",
              "Inestable: cardioversión sincronizada.",
              "Precaución con la cardioversión si la FA dura más de 48 horas por riesgo de embolia.",
              "El WPW con FA contraindica los bloqueadores del nodo AV; usar cardioversión o procainamida."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Energía de cardioversión sincronizada (bifásico)",
            "headers": [
              "Arritmia",
              "Energía inicial"
            ],
            "filas": [
              [
                "TSVP / Flutter auricular",
                "50 a 100 J"
              ],
              [
                "Fibrilación auricular",
                "120 a 200 J"
              ],
              [
                "TV monomórfica con pulso",
                "100 J"
              ],
              [
                "TV polimórfica inestable",
                "Tratar como FV: desfibrilación no sincronizada"
              ]
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "titulo": "Tiroides",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Hipertiroidismo vs hipotiroidismo",
            "headers": [
              "Rasgo",
              "Hipertiroidismo",
              "Hipotiroidismo"
            ],
            "filas": [
              [
                "Metabolismo",
                "Acelerado",
                "Enlentecido"
              ],
              [
                "Peso",
                "Perdida",
                "Aumento"
              ],
              [
                "Termorregulacion",
                "Intolerancia al calor",
                "Intolerancia al frio"
              ],
              [
                "Frecuencia cardiaca",
                "Taquicardia",
                "Bradicardia"
              ],
              [
                "Causa frecuente",
                "Enfermedad de Graves",
                "Tiroiditis de Hashimoto"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Crisis tiroideas",
            "texto": "La tormenta tiroidea es un hipertiroidismo extremo con fiebre, taquicardia, agitacion y falla multiorganica; se trata con betabloqueador, tionamidas, yodo y corticoesteroide. El coma mixedematoso es el hipotiroidismo grave con hipotermia, bradicardia y estupor; ambos son emergencias."
          },
          {
            "tipo": "lista",
            "titulo": "Interpretacion de la TSH",
            "items": [
              "Hipotiroidismo primario: TSH alta, T4 baja.",
              "Hipertiroidismo primario: TSH baja, T4 alta.",
              "La TSH es la prueba de tamizaje mas sensible de la funcion tiroidea."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "titulo": "Fuentes y evidencia",
        "bloques": [
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "AHA — Actualización 2018 sobre antiarrítmicos en ACLS (ACC)",
                "url": "https://www.acc.org/Latest-in-Cardiology/ten-points-to-remember/2018/11/20/11/37/2018-American-Heart-Association-Focused-Update-on-ACLS"
              },
              {
                "nombre": "ACLS — Algoritmo de taquicardia",
                "url": "https://acls.net/acls-tachycardia-algorithm"
              },
              {
                "nombre": "EMCrit (IBCC) — Hypertensive emergencies",
                "url": "https://emcrit.org/ibcc/htn/"
              },
              {
                "nombre": "EMCrit — Aortic dissection",
                "url": "https://emcrit.org/emcrit/aortic-dissection/"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada"
        }
      },
      {
        "titulo": "Reconocer el toxíndrome",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Toxíndromes de alto rendimiento",
            "headers": [
              "Toxíndrome",
              "Pupilas / piel",
              "FC y signos",
              "Antídoto / manejo"
            ],
            "filas": [
              [
                "Colinérgico",
                "Miosis, piel húmeda",
                "Bradicardia, secreciones (DUMBELS)",
                "Atropina (± pralidoxima)"
              ],
              [
                "Anticolinérgico",
                "Midriasis, piel seca y roja",
                "Taquicardia, delirio, fiebre",
                "Benzodiacepinas (± fisostigmina)"
              ],
              [
                "Simpaticomimético",
                "Midriasis, diaforesis",
                "Taquicardia, HTA, agitación",
                "Benzodiacepinas, enfriar"
              ],
              [
                "Opioide",
                "Miosis puntiforme",
                "↓ FR, ↓ conciencia",
                "Naloxona titulada"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Húmedo vs. seco",
            "texto": "La gran bifurcación: el colinérgico está \"empapado\" (secreciones, sudor, miosis) y el anticolinérgico está \"seco\" (piel seca y roja, midriasis, retención). Pupilas y piel resuelven la mayoría de los casos en segundos."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Tabla comparativa de toxíndromes",
            "caption": "Comparativa de toxíndromes (colinérgico, anticolinérgico, simpaticomimético, opioide).",
            "busqueda": "toxidromes comparison table cholinergic anticholinergic sympathomimetic opioid"
          }
        ],
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      },
      {
        "titulo": "Antidepresivos tricíclicos",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La sobredosis de tricíclicos bloquea los canales de sodio cardíacos (ensancha el QRS y puede causar TV) y tiene efectos anticolinérgicos, alfa-bloqueantes (hipotensión) y convulsiones. El ECG guía el tratamiento."
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "Bicarbonato de sodio si el QRS ensancha",
            "texto": "Bicarbonato de sodio 1-2 mEq/kg en bolo IV cuando el QRS supera ~100 ms (o hay arritmia/hipotensión), repitiendo hasta estrechar el QRS. Aporta sodio (vence el bloqueo del canal) y alcaliniza (favorece la unión del fármaco a proteínas). Es la intervención que salva en la cardiotoxicidad por tricíclicos."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Pista en el ECG",
            "texto": "Busque QRS ancho, taquicardia y una onda R prominente en aVR: marcadores de toxicidad por bloqueo de canales de sodio. Evite los antiarrítmicos de clase IA/IC (empeoran). Trate las convulsiones con benzodiacepinas."
          }
        ],
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      },
      {
        "titulo": "Diferencias anatomofisiologicas",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Via aerea y respiracion",
            "items": [
              "Cabeza grande y occipucio prominente: la posicion neutra alinea la via aerea.",
              "Lengua relativamente grande y via aerea estrecha: mayor riesgo de obstruccion.",
              "Dependen mas del diafragma; se fatigan rapido. La taquipnea es un signo temprano.",
              "Mayor superficie corporal: pierden calor con facilidad."
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Circulacion y compensacion",
            "items": [
              "Mantienen la presion arterial hasta etapas avanzadas del choque (la hipotension es tardia y ominosa).",
              "La taquicardia y el llenado capilar lento son signos tempranos de hipoperfusion.",
              "El gasto cardiaco depende mucho de la frecuencia cardiaca; la bradicardia es grave."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "La hipotension pediatrica es tardia",
            "texto": "El nino compensa el choque con vasoconstriccion y taquicardia, manteniendo la presion casi hasta el final. Cuando aparece la hipotension, el choque ya esta descompensado. Hay que reconocer los signos tempranos: taquicardia, piel fria y moteada, llenado capilar prolongado."
          }
        ],
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Shock compensado",
        "definicion": "Fase en la que la TA se mantiene normal gracias a taquicardia y vasoconstriccion.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "termino": "Ritmo desfibrilable",
        "definicion": "Fibrilacion ventricular o taquicardia ventricular sin pulso que responde al DEA.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "termino": "Torsades de pointes",
        "definicion": "Taquicardia ventricular polimorfa asociada a QT largo; se trata con magnesio.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      },
      {
        "termino": "Mobitz II",
        "definicion": "Bloqueo infranodal con riesgo de progreso; la atropina suele fallar, requiere marcapasos.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo",
          "porUnidad": true
        }
      },
      {
        "termino": "Torsades de pointes",
        "definicion": "TV polimórfica con QT largo; se trata con magnesio.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo",
          "porUnidad": true
        }
      },
      {
        "termino": "Hiperkalemia",
        "definicion": "Potasio elevado con riesgo de arritmia letal; tratar con calcio, insulina/glucosa, salbutamol.",
        "procedencia": {
          "temaOriginal": "medicina-interna"
        }
      },
      {
        "termino": "Tormenta tiroidea",
        "definicion": "Hipertiroidismo extremo con fiebre, taquicardia y falla organica; emergencia.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "termino": "Toxíndrome colinérgico",
        "definicion": "Exceso muscarínico (DUMBELS): secreciones, miosis, bradicardia; se trata con atropina.",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "termino": "Dopamina",
        "definicion": "Más arritmias/mortalidad que noradrenalina; útil como puente en bradicardia.",
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Primer signo de compensacion del shock",
        "reverso": "Taquicardia.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "frente": "Que pasa con los escalofrios en hipotermia moderada",
        "reverso": "Cesan; aparece bradicardia y somnolencia.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "frente": "Limitacion de la TA oscilométrica",
        "reverso": "Pierde exactitud en hipotensión extrema y arritmias.",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "frente": "¿Cuáles son los ritmos desfibrilables?",
        "reverso": "Fibrilación ventricular (FV) y taquicardia ventricular sin pulso (TVSP).",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "frente": "Energía de cardioversión en fibrilación auricular",
        "reverso": "120 a 200 J bifásico.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "frente": "Hallazgo en ECG de la fibrilación auricular",
        "reverso": "Ritmo irregularmente irregular sin ondas P.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "frente": "Regla mnemotécnica del exceso colinérgico",
        "reverso": "DUMBELS / SLUDGE: secreciones, miosis, bradicardia, broncorrea.",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "frente": "Signo temprano de hipoperfusion en el nino",
        "reverso": "Taquicardia y llenado capilar prolongado.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "La activación simpática produce:",
        "opciones": [
          "Bradicardia y miosis",
          "Taquicardia, midriasis y broncodilatación",
          "Aumento del peristaltismo",
          "Vasodilatación generalizada"
        ],
        "correcta": 1,
        "explicacion": "El simpático prepara para \"lucha o huida\": taquicardia, midriasis, broncodilatación y vasoconstricción.",
        "procedencia": {
          "temaOriginal": "anatomia-sistematica"
        }
      },
      {
        "pregunta": "Por que se debe recalentar con cuidado a un paciente hipotermico?",
        "opciones": [
          "Porque la piel se quema con facilidad",
          "Porque el retorno de sangre fria periferica puede causar arritmias",
          "Porque aumenta demasiado rapido la presion arterial",
          "Porque se inhibe la sudoracion"
        ],
        "correcta": 1,
        "explicacion": "El recalentamiento brusco devuelve sangre fria y acida de la periferia al corazon, lo que puede desencadenar arritmias potencialmente letales.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "pregunta": "Cual efecto corresponde a la activacion simpatica?",
        "opciones": [
          "Bradicardia y miosis",
          "Broncoconstriccion",
          "Taquicardia, midriasis y broncodilatacion",
          "Aumento de la digestion"
        ],
        "correcta": 2,
        "explicacion": "El simpatico prepara para la lucha o huida: acelera el corazon, dilata pupilas y bronquios y desvia el flujo a los musculos.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "pregunta": "Cual es el mecanismo del sincope vasovagal?",
        "opciones": [
          "Arritmia maligna",
          "Reflejo que disminuye la frecuencia cardiaca y la tension arterial",
          "Hemorragia interna",
          "Hipoxia por neumonia"
        ],
        "correcta": 1,
        "explicacion": "El sincope vasovagal se debe a un reflejo que baja la FC y la TA, reduciendo la perfusion cerebral de forma transitoria.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "pregunta": "La atropina actúa en la bradicardia sintomática porque es un:",
        "opciones": [
          "Agonista beta-1",
          "Antagonista muscarínico que bloquea el vago",
          "Bloqueador de canales de calcio",
          "Vasodilatador directo"
        ],
        "correcta": 1,
        "explicacion": "La atropina es vagolítica: bloquea los receptores muscarínicos, reduciendo el freno parasimpático sobre el nodo sinusal y aumentando la frecuencia cardíaca.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "pregunta": "Para calcular la frecuencia en una fibrilación auricular (ritmo irregular) lo más fiable es:",
        "opciones": [
          "Dividir 300 entre los cuadros grandes",
          "El método de los 6 segundos",
          "Contar las ondas P",
          "Medir el intervalo PR"
        ],
        "correcta": 1,
        "explicacion": "En ritmos irregulares el método de los cuadros grandes es impreciso; contar los QRS en 6 segundos y multiplicar por 10 promedia las variaciones.",
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      },
      {
        "pregunta": "Ante una taquicardia de complejo ancho regular en un paciente con cardiopatía, lo más seguro es asumir:",
        "opciones": [
          "TSVP con aberrancia",
          "Taquicardia ventricular",
          "Fibrilación auricular",
          "Taquicardia sinusal"
        ],
        "correcta": 1,
        "explicacion": "Toda taquicardia de complejo ancho se trata como TV hasta demostrar lo contrario, sobre todo con cardiopatía estructural.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "pregunta": "¿En cuál de estos pacientes evitarías la succinilcolina?",
        "opciones": [
          "Apendicitis de 6 horas",
          "Quemadura del 40% de hace 5 días",
          "Fractura aislada de muñeca",
          "Migraña"
        ],
        "correcta": 1,
        "explicacion": "A partir de las 48-72 h, las quemaduras y aplastamientos sobreexpresan receptores y la succinilcolina puede causar hiperkalemia letal.",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      },
      {
        "pregunta": "En una hemorragia posparto en una paciente joven, el primer signo de alarma suele ser:",
        "opciones": [
          "Hipotension marcada",
          "Taquicardia",
          "Bradicardia",
          "Fiebre"
        ],
        "correcta": 1,
        "explicacion": "La paciente joven compensa bien; la taquicardia aparece antes que la hipotension, por lo que no hay que esperar a esta ultima.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      },
      {
        "pregunta": "El sindrome HELLP se caracteriza por:",
        "opciones": [
          "Hipertension, edema y proteinuria leve",
          "Hemolisis, enzimas hepaticas elevadas y plaquetas bajas",
          "Hiperglucemia y cetosis",
          "Hipotension y bradicardia"
        ],
        "correcta": 1,
        "explicacion": "HELLP es un acronimo de hemolisis, enzimas hepaticas elevadas y plaquetas bajas; es una forma grave de preeclampsia.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ]
  },
  "m5-hs-definicion-tipos-shock": {
    "secciones": [
      {
        "titulo": "Fisiología cardiovascular",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El potencial de acción cardíaco difiere entre las células marcapasos (nodo sinusal y AV, con despolarización espontánea dependiente de canales de calcio) y el músculo contráctil (con una meseta prolongada por entrada de Ca²⁺ que sostiene la contracción y previene la tetania)."
          },
          {
            "tipo": "formula",
            "texto": "Gasto cardíaco (GC) = Frecuencia cardíaca × Volumen sistólico",
            "nota": "Y la Presión Arterial Media ≈ GC × Resistencia Vascular Sistémica."
          },
          {
            "tipo": "lista",
            "titulo": "Determinantes del volumen sistólico",
            "items": [
              "Precarga: volumen telediastólico (estiramiento de la fibra). A mayor retorno venoso, mayor contracción (ley de Frank-Starling), hasta un límite.",
              "Poscarga: resistencia contra la que el ventrículo eyecta (presión aórtica, RVS).",
              "Inotropismo (contractilidad): fuerza intrínseca de contracción, aumentada por el simpático y fármacos como la dobutamina."
            ]
          },
          {
            "tipo": "diagrama",
            "clave": "gasto",
            "titulo": "Determinantes del gasto cardíaco",
            "descripcion": "Precarga, poscarga e inotropismo: cada tipo de shock ataca uno distinto y el tratamiento se dirige al alterado."
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Razonamiento del shock",
            "texto": "Cada tipo de shock ataca un determinante distinto: el hipovolémico baja la precarga; el cardiogénico baja el inotropismo; el distributivo (séptico/neurogénico/anafiláctico) baja la RVS (poscarga y tono). El tratamiento se dirige al determinante alterado: volumen, inotrópicos o vasopresores."
          }
        ],
        "procedencia": {
          "temaOriginal": "fisiologia-medica"
        }
      },
      {
        "titulo": "Gasto cardiaco",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "gasto",
            "titulo": "Determinantes del gasto cardiaco"
          },
          {
            "tipo": "formula",
            "texto": "Gasto cardiaco = Frecuencia cardiaca x Volumen sistolico",
            "nota": "El volumen sistolico depende de precarga, contractilidad y poscarga."
          },
          {
            "tipo": "lista",
            "titulo": "Determinantes del volumen sistolico",
            "items": [
              "Precarga: volumen de sangre que llena el ventriculo antes de contraerse (ley de Frank-Starling).",
              "Contractilidad: fuerza intrinseca de la contraccion miocardica.",
              "Poscarga: resistencia que el ventriculo debe vencer para eyectar (presion arterial)."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Aplicacion en shock",
            "texto": "La presion arterial es producto del gasto cardiaco por la resistencia vascular. En el shock hipovolemico cae la precarga; en el cardiogenico falla la contractilidad; en el distributivo cae la resistencia. Identificar el determinante alterado guia el tratamiento."
          }
        ],
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "titulo": "Fases del shock hipovolemico",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Fases segun la perdida de volumen",
            "headers": [
              "Fase",
              "Perdida",
              "Signos"
            ],
            "filas": [
              [
                "Compensado (clase I-II)",
                "Hasta 30%",
                "Taquicardia, piel fria, ansiedad, TA normal o limitrofe"
              ],
              [
                "Descompensado (clase III)",
                "30 a 40%",
                "Hipotension, taquicardia marcada, confusion, oliguria"
              ],
              [
                "Irreversible (clase IV)",
                "Mayor a 40%",
                "Bradicardia terminal, inconsciencia, fallo multiorganico"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Signos tempranos a no pasar por alto",
            "items": [
              "Taquicardia: el primer mecanismo de compensacion.",
              "Piel palida, fria y diaforetica por vasoconstriccion.",
              "Llenado capilar prolongado.",
              "Ansiedad o inquietud por hipoxia cerebral incipiente.",
              "Sed intensa."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Triada de la muerte en trauma",
            "texto": "Hipotermia, acidosis y coagulopatia se potencian entre si y empeoran la hemorragia. Por eso, ademas de detener el sangrado, hay que abrigar al paciente: mantener la temperatura es parte del tratamiento del shock."
          }
        ],
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "titulo": "Farmacología de reanimación",
        "bloques": [
          {
            "tipo": "tabla",
            "headers": [
              "Clase / Fármaco",
              "Mecanismo",
              "Dosis y uso prehospitalario"
            ],
            "filas": [
              [
                "Vasopresor — Norepinefrina",
                "Agonista alfa-1 > beta-1; aumenta la RVS",
                "Infusión 0.05-1 mcg/kg/min. Shock séptico, cardiogénico, neurogénico."
              ],
              [
                "Inotrópico — Dobutamina",
                "Agonista beta-1/beta-2; aumenta la contractilidad",
                "Infusión 2-20 mcg/kg/min. Falla cardíaca descompensada."
              ],
              [
                "Antiarrítmico III — Amiodarona",
                "Bloqueo de canales de K⁺; prolonga el potencial de acción",
                "Paro: 300 mg IV en bolo. TV estable: 150 mg IV en 10 min."
              ],
              [
                "Inductor — Ketamina",
                "Antagonista NMDA; disociativo, mantiene reflejos",
                "1-2 mg/kg IV (inducción RSI); 0.1-0.3 mg/kg (analgesia)."
              ],
              [
                "BNM despolarizante — Succinilcolina",
                "Despolariza la placa motora",
                "1.5-2 mg/kg IV. Inicio y duración cortos."
              ],
              [
                "BNM no despolarizante — Rocuronio",
                "Bloquea el receptor de acetilcolina",
                "1-1.2 mg/kg IV. Duración más prolongada."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Norepinefrina: el vasopresor de primera línea",
            "texto": "Su predominio alfa-1 produce vasoconstricción potente elevando la RVS, con un efecto beta-1 modesto que sostiene la frecuencia. Es de elección en la mayoría de los shocks que requieren vasopresor, especialmente el séptico."
          }
        ],
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "titulo": "Los cuatro tipos de shock",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Perfiles hemodinámicos",
            "headers": [
              "Tipo",
              "Mecanismo y perfil"
            ],
            "filas": [
              [
                "Hipovolémico",
                "Pérdida de volumen; precarga baja, RVS alta, piel fría."
              ],
              [
                "Cardiogénico",
                "Falla de bomba; gasto bajo, congestión, RVS alta, piel fría."
              ],
              [
                "Obstructivo",
                "Obstrucción al llenado o eyección; precarga bloqueada."
              ],
              [
                "Distributivo",
                "Vasodilatación; RVS baja, gasto a menudo alto, piel caliente al inicio."
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Subtipos frecuentes",
            "items": [
              "Hipovolémico: hemorrágico (trauma, sangrado digestivo) y no hemorrágico (deshidratación, quemaduras).",
              "Cardiogénico: IAM extenso, arritmias, miocardiopatía, valvulopatía aguda.",
              "Obstructivo: neumotórax a tensión, taponamiento cardíaco, embolia pulmonar masiva.",
              "Distributivo: séptico, anafiláctico y neurogénico."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Caliente o frío",
            "texto": "El shock distributivo temprano cursa con piel caliente y rosada por vasodilatación, a diferencia de los otros tipos con piel fría y moteada. Esta diferencia clínica orienta rápido el diagnóstico a pie de cama."
          }
        ],
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "titulo": "Manejo del shock distributivo",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El shock séptico es el prototipo del distributivo. El tratamiento combina control del foco, antibióticos tempranos, reanimación con líquidos y vasopresores cuando la presión no responde al volumen. El shock anafiláctico y el neurogénico tienen particularidades propias."
          },
          {
            "tipo": "pasos",
            "titulo": "Reanimación del shock séptico",
            "items": [
              "Cargas de cristaloide (30 ml/kg) valorando la respuesta y evitando la sobrecarga.",
              "Antibióticos de amplio espectro lo antes posible y toma de cultivos.",
              "Noradrenalina como vasopresor de primera línea si persiste la hipotensión.",
              "Meta de PAM mayor o igual a 65 mmHg y vigilancia del lactato.",
              "Considerar vasopresina o adrenalina como segunda línea."
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Anafilaxia y shock neurogénico",
            "items": [
              "Anafilaxia: adrenalina IM 0.3 a 0.5 mg en cara anterolateral del muslo, repetible cada 5 a 15 min.",
              "Anafilaxia: líquidos, antihistamínicos y broncodilatadores como adyuvantes.",
              "Neurogénico: pérdida del tono simpático por lesión medular alta; bradicardia con hipotensión.",
              "Neurogénico: líquidos, vasopresores y atropina para la bradicardia."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Adrenalina en anafilaxia es IM, no IV en bolo",
            "texto": "La vía de elección en la anafilaxia es la intramuscular en el muslo. El bolo IV de adrenalina no diluido se reserva para el paro y puede causar arritmias graves si se usa mal en el paciente con pulso."
          }
        ],
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "titulo": "Agentes inductores y sedantes",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El inductor ideal en urgencias es el que apaga la conciencia sin tirar la presión. Ketamina y etomidato son los preferidos en inestabilidad; propofol y midazolam (a dosis de inducción) tienden a hipotensar y se reservan para el normotenso."
          },
          {
            "tipo": "tabla",
            "titulo": "Inductores: dosis y perfil",
            "headers": [
              "Fármaco",
              "Dosis IV (inducción)",
              "Inicio",
              "Perfil hemodinámico"
            ],
            "filas": [
              [
                "Ketamina",
                "1-2 mg/kg (0.5-1 si shock)",
                "45-60 s",
                "Estabiliza/sube la PA (simpaticomimético); broncodilata"
              ],
              [
                "Etomidato",
                "0.3 mg/kg",
                "15-45 s",
                "Neutro; supresión suprarrenal transitoria"
              ],
              [
                "Propofol",
                "1.5-2.5 mg/kg",
                "15-45 s",
                "Hipotensor; útil en estatus o normotenso"
              ],
              [
                "Midazolam",
                "0.1-0.3 mg/kg",
                "1-2 min",
                "Hipotensor; inicio lento, a menudo infradosificado"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "Regla del shock: \"sedante bajo, paralítico alto\"",
            "texto": "En shock, reduzca el inductor (p. ej. ketamina 0.5-1 mg/kg) para no profundizar la hipotensión, y AUMENTE el bloqueador neuromuscular (rocuronio 1.2-1.6 mg/kg) porque el brazo-circulación lento retrasa su llegada. Así se mantiene la primera-pasada sin colapsar al paciente."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Cuidado",
            "texto": "Propofol y midazolam a dosis de inducción pueden precipitar hipotensión grave en el hipovolémico o séptico. El etomidato es hemodinámicamente neutro pero produce supresión suprarrenal: evite dosis repetidas, sobre todo en sepsis."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Comparación de inductores para SRI",
            "caption": "Comparativa visual de inductores (ketamina, etomidato, propofol, midazolam) por inicio y efecto sobre la presión.",
            "busqueda": "RSI induction agents comparison ketamine etomidate propofol hemodynamics chart"
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      },
      {
        "titulo": "Qué presor para qué shock",
        "bloques": [
          {
            "tipo": "formula",
            "texto": "PAM ≈ Gasto cardíaco × Resistencia vascular sistémica",
            "nota": "Y Gasto cardíaco = Frecuencia × Volumen sistólico (precarga, contractilidad, poscarga)."
          },
          {
            "tipo": "tabla",
            "titulo": "El determinante roto manda el tratamiento",
            "headers": [
              "Tipo de shock",
              "Determinante alterado",
              "Tratamiento dirigido"
            ],
            "filas": [
              [
                "Hipovolémico",
                "↓ precarga",
                "Volumen / sangre; presor solo de puente"
              ],
              [
                "Cardiogénico",
                "↓ contractilidad",
                "Inotrópico (dobutamina) ± presor"
              ],
              [
                "Distributivo (séptico)",
                "↓ RVS (tono)",
                "Noradrenalina + volumen"
              ],
              [
                "Distributivo (anafiláctico)",
                "↓ RVS + permeabilidad",
                "Adrenalina IM/infusión"
              ],
              [
                "Obstructivo",
                "Obstrucción mecánica",
                "Tratar la causa (descompresión, trombólisis) + presor puente"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "No \"presores ciegos\"",
            "texto": "Un vasopresor sobre un tanque vacío sube la cifra pero no la perfusión. Optimice la precarga (volumen/sangre según el tipo de shock) antes o junto con el presor. En el cardiogénico, subir demasiado la poscarga con un α-agonista puede empeorar el gasto."
          }
        ],
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Pulso filiforme",
        "definicion": "Pulso debil y rapido tipico del shock e hipovolemia.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "termino": "Shock distributivo",
        "definicion": "Vasodilatación con RVS baja; incluye séptico, anafiláctico y neurogénico.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "termino": "Dobutamina",
        "definicion": "Inotrópico que mejora la contractilidad en el shock cardiogénico.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "termino": "Shock neurogénico",
        "definicion": "Hipotensión con bradicardia por pérdida del tono simpático en lesión medular alta.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "termino": "Ketamina en shock",
        "definicion": "Inductor que preserva o sube la PA; reducir a 0.5-1 mg/kg en hipotensión.",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      },
      {
        "termino": "Sedante bajo, paralítico alto",
        "definicion": "Estrategia de dosificación en shock para preservar la hemodinamia.",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cuando cae la presion en el shock hipovolemico",
        "reverso": "Tarde, en la fase descompensada, tras perder mas del 30% del volumen.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "frente": "Inotrópico de elección en shock cardiogénico",
        "reverso": "Dobutamina.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "frente": "Diferencia entre shock neurogénico y medular",
        "reverso": "El neurogénico es circulatorio (hipotensión con bradicardia); el medular es pérdida de reflejos y función.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "frente": "¿Qué componente bacteriano dispara fuertemente el shock séptico?",
        "reverso": "El lipopolisacárido (endotoxina) de las Gram negativas.",
        "procedencia": {
          "temaOriginal": "microbiologia-sepsis"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual es la principal razon por la que las quemaduras extensas causan shock?",
        "opciones": [
          "Perdida de sangre por hemorragia arterial",
          "Fuga de plasma y agua por la perdida de la barrera cutanea",
          "Vasoconstriccion generalizada",
          "Aumento de la produccion de vitamina D"
        ],
        "correcta": 1,
        "explicacion": "La destruccion de la piel provoca fuga masiva de plasma al intersticio y al exterior, generando hipovolemia y shock por quemadura.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "pregunta": "En un shock hipovolemico, cual determinante del gasto cardiaco cae primero?",
        "opciones": [
          "Contractilidad",
          "Poscarga",
          "Precarga",
          "Frecuencia cardiaca"
        ],
        "correcta": 2,
        "explicacion": "La perdida de volumen reduce el retorno venoso y por tanto la precarga, disminuyendo el volumen sistolico y el gasto cardiaco.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "pregunta": "Un paciente con hipotension que no responde a liquidos ni vasopresores y tiene antecedente de uso cronico de esteroides. Que sospechar?",
        "opciones": [
          "Shock hipovolemico",
          "Crisis suprarrenal por falta de cortisol",
          "Hipertiroidismo",
          "Hiperglucemia simple"
        ],
        "correcta": 1,
        "explicacion": "La supresion del eje por esteroides cronicos puede causar insuficiencia suprarrenal; la falta de cortisol produce hipotension refractaria que mejora con corticoides intravenosos.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "pregunta": "Cual es el tipo de shock causado por un neumotorax a tension?",
        "opciones": [
          "Hipovolemico",
          "Cardiogenico",
          "Distributivo",
          "Obstructivo"
        ],
        "correcta": 3,
        "explicacion": "El neumotorax a tension obstruye el retorno venoso al corazon; es una causa de shock obstructivo.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "pregunta": "El vasopresor de primera línea en el shock séptico es:",
        "opciones": [
          "Dobutamina",
          "Norepinefrina",
          "Amiodarona",
          "Succinilcolina"
        ],
        "correcta": 1,
        "explicacion": "La norepinefrina (alfa-1 predominante) eleva la RVS y es de elección en el shock séptico.",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "pregunta": "La tríada de Cushing (HTA, bradicardia, respiración irregular) indica:",
        "opciones": [
          "Shock hipovolémico",
          "Hipertensión intracraneal con herniación inminente",
          "Sepsis temprana",
          "Intoxicación opiácea"
        ],
        "correcta": 1,
        "explicacion": "Es un signo tardío de PIC elevada; el cuerpo eleva la PAM para perfundir el cerebro, con bradicardia refleja.",
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "pregunta": "Un paciente febril, hipotenso, con piel caliente y rosada tiene un shock más probablemente:",
        "opciones": [
          "Hipovolémico",
          "Distributivo (séptico)",
          "Cardiogénico",
          "Obstructivo"
        ],
        "correcta": 1,
        "explicacion": "La piel caliente por vasodilatación con RVS baja y fiebre orienta a shock distributivo de tipo séptico.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "pregunta": "En el shock cardiogénico con congestión pulmonar, la administración agresiva de líquidos:",
        "opciones": [
          "Es el tratamiento de elección",
          "Empeora la congestión y el edema pulmonar",
          "No tiene efecto",
          "Aumenta la contractilidad"
        ],
        "correcta": 1,
        "explicacion": "El corazón ya está sobrecargado; más líquido empeora la congestión. Se prefieren inotrópicos como la dobutamina.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "pregunta": "Un paciente con lesión medular cervical, hipotenso y bradicárdico, presenta un shock:",
        "opciones": [
          "Hipovolémico",
          "Neurogénico",
          "Cardiogénico",
          "Obstructivo"
        ],
        "correcta": 1,
        "explicacion": "La pérdida del tono simpático por lesión medular alta causa vasodilatación con bradicardia: shock neurogénico (distributivo).",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "pregunta": "La triada de Cushing (HTA, bradicardia, respiración irregular) indica:",
        "opciones": [
          "Shock hipovolémico",
          "Hipertensión intracraneal con herniación inminente",
          "Sepsis",
          "Intoxicación opiácea"
        ],
        "correcta": 1,
        "explicacion": "Es un signo tardío de PIC elevada: el cuerpo eleva la PAM para perfundir el cerebro, con bradicardia refleja.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "pregunta": "Un politraumatizado con lesión cervical, hipotenso y bradicárdico presenta:",
        "opciones": [
          "Shock hipovolémico",
          "Shock neurogénico",
          "Shock cardiogénico",
          "Shock séptico"
        ],
        "correcta": 1,
        "explicacion": "La pérdida del tono simpático en una lesión medular alta produce hipotensión con bradicardia, característica del shock neurogénico.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "pregunta": "La anafilaxia corresponde a una hipersensibilidad de tipo:",
        "opciones": [
          "I (mediada por IgE)",
          "II (citotóxica)",
          "III (complejos inmunes)",
          "IV (retardada)"
        ],
        "correcta": 0,
        "explicacion": "Es tipo I: la IgE activa mastocitos que liberan histamina, causando shock distributivo y broncoespasmo.",
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia"
        }
      },
      {
        "pregunta": "El componente de las bacterias Gram negativas que desencadena el shock séptico es:",
        "opciones": [
          "El ácido teicoico",
          "El lipopolisacárido (endotoxina)",
          "La cápsula de las Gram positivas",
          "El peptidoglicano grueso"
        ],
        "correcta": 1,
        "explicacion": "El LPS de la membrana externa de las Gram negativas activa una liberación masiva de citocinas.",
        "procedencia": {
          "temaOriginal": "microbiologia-sepsis"
        }
      },
      {
        "pregunta": "En el shock séptico, el vasopresor de primera elección para sostener la PAM es:",
        "opciones": [
          "Dobutamina",
          "Norepinefrina",
          "Furosemida",
          "Atropina"
        ],
        "correcta": 1,
        "explicacion": "Tras la reanimación con fluidos, la norepinefrina es el vasopresor de primera línea en la sepsis.",
        "procedencia": {
          "temaOriginal": "microbiologia-sepsis"
        }
      },
      {
        "pregunta": "Paciente con TCE, PA 200/90, FC 44 y respiración irregular. Esto sugiere:",
        "opciones": [
          "Shock hipovolémico",
          "Tríada de Cushing por hipertensión intracraneal",
          "Reacción vagal benigna",
          "Intoxicación por opioides"
        ],
        "correcta": 1,
        "explicacion": "HTA + bradicardia + respiración irregular es la tríada de Cushing: herniación inminente.",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      }
    ]
  },
  "m6-emp-ivr": {
    "secciones": [
      {
        "titulo": "Fisiología respiratoria",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La ventilación depende de la distensibilidad (compliance: facilidad para inflarse) y la resistencia de las vías aéreas. La difusión de gases sigue la Ley de Fick: es proporcional a la superficie y al gradiente de presión, e inversamente proporcional al grosor de la membrana alveolocapilar (engrosada en el edema y la fibrosis)."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Curva de disociación de la oxihemoglobina",
            "texto": "Su forma sigmoidea explica que la SpO₂ se mantenga alta hasta una pO₂ ~60 mmHg, y luego caiga bruscamente. Se desplaza a la DERECHA (suelta O₂ a los tejidos) con acidosis, hipercapnia, fiebre y aumento de 2,3-DPG (efecto Bohr). Se desplaza a la IZQUIERDA (retiene O₂) con alcalosis, hipotermia e hipocapnia. El efecto Haldane describe cómo la desoxihemoglobina transporta mejor el CO₂."
          },
          {
            "tipo": "diagrama",
            "clave": "oxihemoglobina",
            "titulo": "Curva de disociación de la oxihemoglobina",
            "descripcion": "La forma sigmoidea y sus desplazamientos (efecto Bohr) explican cuándo la hemoglobina cede o retiene O₂."
          }
        ],
        "procedencia": {
          "temaOriginal": "fisiologia-medica"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Por que el lactante muy pequeno con fiebre requiere mas cautela",
        "reverso": "Mayor riesgo de infeccion bacteriana grave.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual de los siguientes NO participa en el intercambio gaseoso?",
        "opciones": [
          "Volumen corriente que llega al alveolo",
          "Espacio muerto anatomico",
          "Membrana alveolo-capilar",
          "Capilares pulmonares"
        ],
        "correcta": 1,
        "explicacion": "El espacio muerto es el aire que permanece en las vias de conduccion (traquea, bronquios) y no llega al alveolo, por lo que no participa en el intercambio.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      }
    ]
  },
  "m2-afi-muscular": {
    "secciones": [
      {
        "titulo": "Que es la histologia",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La histologia estudia los tejidos, es decir, conjuntos de celulas semejantes que junto con su matriz extracelular cumplen una funcion comun. Aunque el cuerpo tiene mas de 200 tipos celulares, todos se agrupan en cuatro tejidos fundamentales que se combinan para formar organos y sistemas."
          },
          {
            "tipo": "diagrama",
            "clave": "celula",
            "titulo": "La celula como unidad del tejido",
            "descripcion": "Los organelos celulares determinan la especializacion de cada tejido."
          },
          {
            "tipo": "lista",
            "titulo": "Los cuatro tejidos fundamentales",
            "items": [
              "Epitelial: recubre superficies y forma glandulas; protege, absorbe y secreta.",
              "Conectivo: une, sostiene y nutre; incluye sangre, hueso, cartilago y grasa.",
              "Muscular: genera movimiento mediante contraccion.",
              "Nervioso: recibe, procesa y transmite informacion electrica."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Regla de oro",
            "texto": "Ningun organo esta hecho de un solo tejido. El corazon, por ejemplo, tiene musculo (miocardio), epitelio (endocardio), conectivo (esqueleto fibroso) y nervioso (sistema de conduccion)."
          }
        ],
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "titulo": "Tejido muscular y nervioso",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Los tres tipos de musculo",
            "headers": [
              "Tipo",
              "Control",
              "Caracteristicas"
            ],
            "filas": [
              [
                "Esqueletico",
                "Voluntario",
                "Estriado, multinucleado, contraccion rapida y fatigable"
              ],
              [
                "Cardiaco",
                "Involuntario",
                "Estriado, ramificado, discos intercalares, no se fatiga"
              ],
              [
                "Liso",
                "Involuntario",
                "No estriado, fusiforme, en visceras y vasos"
              ]
            ]
          },
          {
            "tipo": "p",
            "texto": "Los discos intercalares del musculo cardiaco contienen uniones comunicantes (gap junctions) que permiten que el impulso electrico viaje de celula a celula, haciendo que el corazon se comporte como un sincitio funcional: todas las fibras se contraen de forma coordinada."
          },
          {
            "tipo": "p",
            "texto": "El tejido nervioso esta formado por neuronas (transmiten el impulso) y neuroglia (celulas de soporte mucho mas numerosas que las neuronas). A diferencia del epitelio, las neuronas del sistema nervioso central practicamente no se regeneran, lo que explica la gravedad del dano cerebral y medular."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Regeneracion limitada",
            "texto": "El musculo cardiaco y las neuronas del SNC tienen capacidad de regeneracion casi nula. Por eso un infarto y un evento cerebral dejan secuelas permanentes: el tejido perdido se sustituye por cicatriz, no por celulas funcionales."
          }
        ],
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "titulo": "Termorregulacion",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El hipotalamo es el termostato corporal. Ante el calor ordena vasodilatacion cutanea y sudoracion para perder calor; ante el frio ordena vasoconstriccion, piloereccion y escalofrios (termogenesis por contraccion muscular) para conservar y producir calor."
          },
          {
            "tipo": "tabla",
            "titulo": "Mecanismos de transferencia de calor",
            "headers": [
              "Mecanismo",
              "Definicion"
            ],
            "filas": [
              [
                "Radiacion",
                "Perdida de calor por ondas infrarrojas hacia el ambiente"
              ],
              [
                "Conduccion",
                "Transferencia por contacto directo con un objeto mas frio"
              ],
              [
                "Conveccion",
                "Perdida por movimiento de aire o agua sobre la piel"
              ],
              [
                "Evaporacion",
                "Perdida de calor al evaporarse el sudor"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Hipotermia y vasoconstriccion",
            "texto": "En hipotermia la sangre se centraliza para proteger los organos vitales, dejando la piel fria y palida. Por eso al recalentar a un paciente hay que hacerlo con cuidado: el retorno de sangre fria periferica al centro puede causar arritmias."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "titulo": "El musculo esqueletico y la contraccion",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El musculo esqueletico se compone de fibras con miofibrillas formadas por sarcomeros, la unidad contractil. Cada sarcomero contiene filamentos de actina (delgados) y miosina (gruesos) que se deslizan unos sobre otros para acortar la fibra."
          },
          {
            "tipo": "pasos",
            "titulo": "Mecanismo de contraccion (teoria del deslizamiento)",
            "items": [
              "El impulso nervioso libera acetilcolina en la union neuromuscular.",
              "La despolarizacion viaja por los tubulos T hasta el reticulo sarcoplasmico.",
              "Se libera calcio que se une a la troponina y descubre los sitios de la actina.",
              "Las cabezas de miosina se unen a la actina formando puentes cruzados.",
              "Con energia del ATP, la miosina jala la actina y el sarcomero se acorta.",
              "Cuando cesa el estimulo, el calcio se recaptura y el musculo se relaja."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "El papel del ATP y el calcio",
            "texto": "Sin ATP la miosina no se suelta de la actina: por eso aparece el rigor mortis tras la muerte, cuando se agota el ATP. El calcio es el interruptor que inicia la contraccion."
          },
          {
            "tipo": "p",
            "texto": "La fatiga muscular ocurre cuando se agota el ATP y se acumula acido lactico durante el metabolismo anaerobio. El calambre se asocia a alteraciones de electrolitos y deshidratacion. La contraccion sostenida que no permite la relajacion se llama tetania."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "titulo": "Asma grave y estado asmático",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El asma grave es una obstrucción al flujo aéreo por broncoespasmo, inflamación y tapones de moco. El estado asmático es la crisis que no responde al tratamiento inicial y amenaza la vida. El peligro principal es el atrapamiento aéreo, que conduce a la fatiga muscular y al paro."
          },
          {
            "tipo": "lista",
            "titulo": "Signos de crisis que amenaza la vida",
            "items": [
              "Silencio auscultatorio (torax silente): el flujo es tan bajo que no hay sibilancias.",
              "Incapacidad para hablar, uso de músculos accesorios y posición en trípode.",
              "Alteración del estado mental, agotamiento, bradicardia y cianosis.",
              "Un CO2 normal o en ascenso en una crisis grave es señal de fatiga inminente."
            ]
          },
          {
            "tipo": "pasos",
            "titulo": "Tratamiento del estado asmático",
            "items": [
              "Salbutamol nebulizado continuo, asociado a bromuro de ipratropio.",
              "Corticoesteroides sistémicos tempranos (metilprednisolona o prednisona).",
              "Sulfato de magnesio 1 a 2 g IV en la crisis grave.",
              "Adrenalina IM si hay riesgo vital o broncoespasmo refractario.",
              "Considerar VMNI; la intubación es de alto riesgo y se reserva para el agotamiento."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "El asmático intubado: hipoventilación permisiva",
            "texto": "Al ventilar a un asmático intubado hay que dar tiempo espiratorio largo y frecuencias bajas para evitar el auto-PEEP y el barotrauma. Se tolera cierta hipercapnia (hipercapnia permisiva) para no provocar atrapamiento aéreo y neumotórax."
          },
          {
            "tipo": "diagrama",
            "clave": "respiratorio"
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "titulo": "Receptores colinérgicos",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La acetilcolina (ACh) es el neurotransmisor del parasimpático y de la placa neuromuscular. Actúa sobre dos tipos de receptor: muscarínicos (órganos efectores del parasimpático) y nicotínicos (músculo esquelético y ganglios autónomos). El bloqueo o el exceso de ACh produce cuadros opuestos y reconocibles."
          },
          {
            "tipo": "tabla",
            "titulo": "Muscarínicos vs. nicotínicos",
            "headers": [
              "Receptor",
              "Localización",
              "Efecto de la ACh"
            ],
            "filas": [
              [
                "Muscarínicos (M)",
                "Corazón, músculo liso, glándulas exocrinas",
                "Bradicardia, broncoconstricción, secreciones, miosis, peristaltismo"
              ],
              [
                "Nicotínicos musculares (Nm)",
                "Placa neuromuscular",
                "Contracción del músculo esquelético (fasciculaciones si hay exceso)"
              ],
              [
                "Nicotínicos neuronales (Nn)",
                "Ganglios autónomos, médula suprarrenal",
                "Transmisión ganglionar; liberación de catecolaminas"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Conexión con toxicología (módulo 6.9)",
            "texto": "El exceso muscarínico produce el toxíndrome colinérgico (DUMBELS / SLUDGE: diarrea, micción, miosis, bradicardia, broncorrea, lagrimeo, salivación), típico de organofosforados. La atropina —antagonista muscarínico— lo revierte. El bloqueo muscarínico da el cuadro anticolinérgico opuesto: \"rojo como tomate, seco como hueso, caliente como brasa, ciego como topo, loco como cabra\"."
          }
        ],
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Frank-Starling",
        "definicion": "A mayor precarga (estiramiento), mayor fuerza de contracción, hasta un límite.",
        "procedencia": {
          "temaOriginal": "fisiologia-medica"
        }
      },
      {
        "termino": "Sarcomero",
        "definicion": "Unidad contractil del musculo formada por filamentos de actina y miosina.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "termino": "Union neuromuscular",
        "definicion": "Sinapsis entre la motoneurona y la fibra muscular, mediada por acetilcolina.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "termino": "Rigor mortis",
        "definicion": "Rigidez muscular tras la muerte por agotamiento del ATP.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "termino": "Ley de Frank-Starling",
        "definicion": "A mayor estiramiento del ventriculo por la precarga, mayor fuerza de contraccion.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "termino": "Sistole",
        "definicion": "Fase de contraccion y eyeccion de la sangre.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "termino": "Peristalsis",
        "definicion": "Ondas de contraccion del musculo liso que mueven el alimento por el tubo digestivo.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "termino": "Atonia uterina",
        "definicion": "Falta de contraccion del utero; causa mas frecuente de hemorragia posparto.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cuales son los cuatro tejidos fundamentales?",
        "reverso": "Epitelial, conectivo, muscular y nervioso.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "frente": "Cual es la unidad contractil del musculo?",
        "reverso": "El sarcomero.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "frente": "Que ion inicia la contraccion muscular?",
        "reverso": "El calcio, al unirse a la troponina.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "frente": "Que dice la ley de Frank-Starling?",
        "reverso": "A mayor estiramiento ventricular por la precarga, mayor fuerza de contraccion.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "frente": "Que es la peristalsis?",
        "reverso": "Ondas de contraccion del musculo liso que mueven el alimento.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Que caracteristica del musculo cardiaco lo distingue del esqueletico?",
        "opciones": [
          "Es voluntario",
          "No es estriado",
          "Tiene discos intercalares y es ramificado",
          "Es multinucleado y fatigable"
        ],
        "correcta": 2,
        "explicacion": "El musculo cardiaco es estriado pero involuntario, ramificado y con discos intercalares que lo conectan electricamente, a diferencia del esqueletico voluntario y multinucleado.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      }
    ]
  },
  "m4-uri-ivu": {
    "secciones": [
      {
        "titulo": "Alteracion del estado mental y AEIOU-TIPS",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La alteracion del estado mental tiene innumerables causas. La nemotecnia AEIOU-TIPS organiza el diagnostico diferencial para no olvidar causas tratables como la hipoglucemia."
          },
          {
            "tipo": "tabla",
            "titulo": "Nemotecnia AEIOU-TIPS",
            "headers": [
              "Letra",
              "Significado"
            ],
            "filas": [
              [
                "A",
                "Alcohol y otras intoxicaciones"
              ],
              [
                "E",
                "Epilepsia, electrolitos, encefalopatia"
              ],
              [
                "I",
                "Insulina (hipo o hiperglucemia)"
              ],
              [
                "O",
                "Oxigeno (hipoxia), opioides, sobredosis"
              ],
              [
                "U",
                "Uremia (falla renal)"
              ],
              [
                "T",
                "Trauma, temperatura (hipo o hipertermia)"
              ],
              [
                "I",
                "Infeccion (sepsis, meningitis)"
              ],
              [
                "P",
                "Psiquiatrico, envenenamiento (poisoning)"
              ],
              [
                "S",
                "Stroke (EVC), shock, espacio ocupante"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Siempre mide la glucosa",
            "texto": "La hipoglucemia imita un evento vascular cerebral, una intoxicacion o una crisis psiquiatrica y es facil de revertir. Ante cualquier alteracion del estado mental, mide la glucemia capilar."
          }
        ],
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "titulo": "AEIOU-TIPS: causas del estado mental alterado",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Cuando AVDI o Glasgow estan bajos, AEIOU-TIPS es la regla mnemotecnica para buscar la causa de forma ordenada y no quedarse solo con \"esta inconsciente\"."
          },
          {
            "tipo": "tabla",
            "titulo": "Regla AEIOU-TIPS",
            "headers": [
              "Letra",
              "Causa a descartar"
            ],
            "filas": [
              [
                "A",
                "Alcohol y otras toxinas"
              ],
              [
                "E",
                "Epilepsia, Electrolitos, Encefalopatia"
              ],
              [
                "I",
                "Insulina (hipo o hiperglucemia)"
              ],
              [
                "O",
                "Opioides / sobredosis (Overdose), Oxigeno (hipoxia)"
              ],
              [
                "U",
                "Uremia (fallo renal) y otras causas metabolicas"
              ],
              [
                "T",
                "Trauma, Temperatura (hipo o hipertermia)"
              ],
              [
                "I",
                "Infeccion (sepsis, meningitis)"
              ],
              [
                "P",
                "Psicogeno, intoxicacion (Poisoning)"
              ],
              [
                "S",
                "Stroke (EVC) y Shock"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Lo reversible primero",
            "texto": "Ante todo alterado, descarta de inmediato lo que se corrige en la calle: hipoglucemia (glucometria), hipoxia (oxigeno y SpO2) y opioides (naloxona si hay bradipnea y miosis). Son causas frecuentes, rapidas de tratar y mortales si se pasan por alto."
          }
        ],
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "TFG",
        "definicion": "Tasa de filtración glomerular: mejor índice de función renal.",
        "procedencia": {
          "temaOriginal": "fisiologia-medica"
        }
      },
      {
        "termino": "Espacio muerto",
        "definicion": "Aire en vias que no participa en el intercambio gaseoso.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "termino": "Tasa de filtracion glomerular",
        "definicion": "Volumen de sangre filtrado por minuto; mejor indicador de funcion renal.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "termino": "SRAA",
        "definicion": "Sistema renina-angiotensina-aldosterona que regula presion y volumen.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico",
          "porUnidad": true
        }
      },
      {
        "termino": "Eritropoyetina",
        "definicion": "Hormona renal que estimula la produccion de globulos rojos.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "termino": "Bactericida",
        "definicion": "Antibiotico que mata la bacteria; preferido en infecciones graves.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      },
      {
        "termino": "Triple whammy",
        "definicion": "AINE mas IECA/ARA II mas diuretico; precipita lesion renal aguda.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cuales son los tres procesos de formacion de orina?",
        "reverso": "Filtracion, reabsorcion y secrecion.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico",
          "porUnidad": true
        }
      },
      {
        "frente": "Que efecto tiene la ADH?",
        "reverso": "Aumenta la reabsorcion de agua y concentra la orina.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico",
          "porUnidad": true
        }
      },
      {
        "frente": "Que enzima convierte la angiotensina I en II?",
        "reverso": "La enzima convertidora de angiotensina (ECA).",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico",
          "porUnidad": true
        }
      },
      {
        "frente": "Que hormona renal estimula la formacion de globulos rojos?",
        "reverso": "La eritropoyetina.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "frente": "Ejemplo de causa de acidosis metabolica con anion gap normal",
        "reverso": "Diarrea (perdida de bicarbonato) o acidosis tubular renal.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "frente": "Dos antibioticos que requieren ajuste renal y vigilancia de niveles",
        "reverso": "Aminoglucosidos y vancomicina.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      },
      {
        "frente": "Por que es peligroso el triple whammy",
        "reverso": "AINE mas IECA/ARA II mas diuretico precipita lesion renal aguda.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "La vejiga urinaria necesita distenderse al llenarse. Que epitelio lo permite?",
        "opciones": [
          "Plano simple",
          "Cilindrico simple",
          "De transicion",
          "Cubico estratificado"
        ],
        "correcta": 2,
        "explicacion": "El epitelio de transicion (urotelio) cambia su forma para permitir la distension de la vejiga sin perder su integridad.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "pregunta": "Un paciente en shock presenta oliguria (poca orina). Que indica este signo a nivel renal?",
        "opciones": [
          "Aumento de la filtracion glomerular",
          "Caida de la presion de perfusion y de la TFG por hipoperfusion",
          "Exceso de ADH bloqueado",
          "Falla de la aldosterona"
        ],
        "correcta": 1,
        "explicacion": "La hipoperfusion reduce la presion en el glomerulo y baja la TFG, disminuyendo la produccion de orina; la oliguria es un signo temprano de mala perfusion.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "pregunta": "Un paciente en diálisis con ondas T altas y picudas tiene probablemente:",
        "opciones": [
          "Hipopotasemia",
          "Hiperpotasemia",
          "Hipocalcemia",
          "Hipernatremia"
        ],
        "correcta": 1,
        "explicacion": "Las ondas T picudas son el signo más temprano de hiperpotasemia, frecuente en pacientes renales. La progresión es a QRS ancho y onda sinusoidal previa al paro.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      },
      {
        "pregunta": "En la necrosis tubular aguda, el sedimento urinario tipico muestra:",
        "opciones": [
          "Cilindros hialinos",
          "Cilindros granulosos pardos",
          "Sedimento limpio",
          "Cristales de cistina"
        ],
        "correcta": 1,
        "explicacion": "La necrosis tubular aguda se caracteriza por cilindros granulosos pardos (cilindros de celulas tubulares) en el sedimento urinario.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "pregunta": "Cual antibiotico requiere ajuste por funcion renal y vigilancia por nefrotoxicidad y ototoxicidad:",
        "opciones": [
          "Azitromicina",
          "Gentamicina (aminoglucosido)",
          "Amoxicilina",
          "Doxiciclina"
        ],
        "correcta": 1,
        "explicacion": "Los aminoglucosidos como la gentamicina son nefrotoxicos y ototoxicos y se eliminan por via renal, por lo que requieren ajuste y vigilancia.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      }
    ]
  },
  "m2-afe-liquidos-electrolitos": {
    "secciones": [
      {
        "titulo": "La neurona y el potencial de accion",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "neurona",
            "titulo": "Estructura de la neurona"
          },
          {
            "tipo": "p",
            "texto": "La neurona tiene dendritas que reciben senales, un cuerpo o soma que las integra y un axon que conduce el impulso. Muchos axones estan recubiertos de mielina, un aislante que acelera la conduccion mediante los nodos de Ranvier (conduccion saltatoria)."
          },
          {
            "tipo": "pasos",
            "titulo": "Fases del potencial de accion",
            "items": [
              "Reposo: el interior es negativo (alrededor de menos 70 mV) gracias a la bomba sodio-potasio.",
              "Despolarizacion: un estimulo abre canales de sodio; el sodio entra y el interior se vuelve positivo.",
              "Repolarizacion: el potasio sale y restaura la negatividad interna.",
              "Hiperpolarizacion: breve sobrecorreccion antes de volver al reposo.",
              "Periodo refractario: la neurona no responde, lo que asegura la direccion del impulso."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Ley del todo o nada",
            "texto": "El potencial de accion se dispara solo si el estimulo alcanza el umbral; una vez disparado, su amplitud es siempre la misma. La intensidad del estimulo se codifica por la frecuencia de disparos, no por su tamano."
          }
        ],
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "titulo": "La nefrona",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "nefrona",
            "titulo": "Estructura de la nefrona"
          },
          {
            "tipo": "p",
            "texto": "La nefrona es la unidad funcional del rinon; cada rinon tiene cerca de un millon. Consta del glomerulo (filtro), la capsula de Bowman, el tubulo proximal, el asa de Henle, el tubulo distal y el tubo colector. La orina se forma por filtracion, reabsorcion y secrecion."
          },
          {
            "tipo": "pasos",
            "titulo": "Formacion de la orina",
            "items": [
              "Filtracion glomerular: la presion empuja agua y solutos pequenos hacia la capsula de Bowman.",
              "Reabsorcion tubular: se recuperan agua, glucosa, sodio y otros solutos utiles hacia la sangre.",
              "Secrecion tubular: se anaden a la orina sustancias como potasio, hidrogeniones y farmacos.",
              "Excrecion: la orina final sale por el tubo colector hacia la pelvis renal."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Tasa de filtracion glomerular",
            "texto": "La TFG mide cuanta sangre filtran los rinones por minuto y es el mejor indicador de la funcion renal. Depende de la presion de perfusion; en el shock cae la TFG y se produce oliguria, un signo temprano de hipoperfusion."
          }
        ],
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "titulo": "Sistema renina-angiotensina-aldosterona",
        "bloques": [
          {
            "tipo": "pasos",
            "titulo": "Cascada del SRAA",
            "items": [
              "La caida de presion o de sodio estimula al rinon a liberar renina.",
              "La renina convierte el angiotensinogeno en angiotensina I.",
              "La enzima convertidora (ECA) transforma angiotensina I en angiotensina II.",
              "La angiotensina II provoca vasoconstriccion potente y libera aldosterona.",
              "La aldosterona retiene sodio y agua, y elimina potasio, elevando la presion."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Por que importa en farmacologia",
            "texto": "Los inhibidores de la ECA y los antagonistas de la aldosterona se usan en hipertension e insuficiencia cardiaca porque interrumpen este eje. Vigilar el potasio es clave, pues pueden elevarlo."
          }
        ],
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "titulo": "Sodio, potasio y agua",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Electrolitos clave",
            "headers": [
              "Electrolito",
              "Compartimento",
              "Importancia"
            ],
            "filas": [
              [
                "Sodio",
                "Principal extracelular",
                "Determina el volumen y la osmolaridad"
              ],
              [
                "Potasio",
                "Principal intracelular",
                "Excitabilidad cardiaca y neuromuscular"
              ],
              [
                "Calcio",
                "Hueso y plasma",
                "Contraccion y coagulacion"
              ],
              [
                "Bicarbonato",
                "Plasma",
                "Amortiguador acido-base"
              ]
            ]
          },
          {
            "tipo": "p",
            "texto": "El sodio gobierna donde esta el agua: la natremia refleja el balance entre sodio y agua. El potasio es critico para el corazon: tanto la hipopotasemia como la hiperpotasemia provocan arritmias potencialmente letales. La hiperpotasemia severa altera el ECG con ondas T picudas y puede causar paro cardiaco."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Potasio y corazon",
            "texto": "La hiperpotasemia es una de las urgencias metabolicas mas peligrosas. El calcio intravenoso estabiliza la membrana cardiaca mientras se toman medidas para bajar el potasio."
          }
        ],
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "titulo": "Principios de la fluidoterapia",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Los líquidos no solo expanden la volemia: también reponen electrolitos. La elección entre salino fisiológico y soluciones balanceadas como el Ringer lactato influye en el equilibrio del potasio, el cloro y el pH del paciente."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Salino vs. balanceadas",
            "texto": "Grandes volúmenes de salino 0.9% pueden causar acidosis hiperclorémica por su alto contenido de cloro. Las soluciones balanceadas (Ringer, Plasmalyte) tienen una composición más cercana al plasma y son preferibles en reanimaciones extensas."
          },
          {
            "tipo": "lista",
            "titulo": "Rangos normales de referencia",
            "items": [
              "Sodio: 135-145 mEq/L.",
              "Potasio: 3.5-5.0 mEq/L.",
              "Calcio total: 8.5-10.5 mg/dL.",
              "Magnesio: 1.5-2.5 mg/dL."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      },
      {
        "titulo": "Potasio y el corazón",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El potasio es el electrolito más peligroso para el corazón: tanto el exceso como el defecto alteran la excitabilidad y producen arritmias. Por eso su lectura en el ECG es vital en el medio prehospitalario."
          },
          {
            "tipo": "tabla",
            "titulo": "Potasio: ECG y manejo",
            "headers": [
              "Trastorno",
              "ECG",
              "Manejo prehospitalario"
            ],
            "filas": [
              [
                "Hiperpotasemia",
                "Ondas T picudas, luego QRS ancho y onda sinusoidal",
                "Calcio (estabiliza miocardio), salbutamol nebulizado, traslado."
              ],
              [
                "Hipopotasemia",
                "Ondas T planas, aparición de onda U, descenso del ST",
                "Reposición controlada de potasio; vigilar arritmias."
              ]
            ]
          },
          {
            "tipo": "diagrama",
            "clave": "ecg"
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "El calcio salva en la hiperpotasemia",
            "texto": "El gluconato o cloruro de calcio no baja el potasio, pero estabiliza la membrana del miocardio en minutos, protegiendo del paro mientras otras medidas redistribuyen el potasio. Es la primera intervención ante ECG amenazante."
          }
        ],
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      },
      {
        "titulo": "Anatomia funcional de la nefrona",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "nefrona"
          },
          {
            "tipo": "p",
            "texto": "La nefrona es la unidad funcional del rinon. Filtra el plasma en el glomerulo y procesa el ultrafiltrado a lo largo del tubulo, reabsorbiendo agua y solutos y secretando productos de desecho e iones para regular el equilibrio hidroelectrolitico y acido-base."
          },
          {
            "tipo": "lista",
            "titulo": "Segmentos y funciones",
            "items": [
              "Tubulo proximal: reabsorbe la mayor parte de sodio, glucosa, bicarbonato y aminoacidos.",
              "Asa de Henle: crea el gradiente medular; diana de los diureticos de asa.",
              "Tubulo distal: ajuste fino de sodio; diana de las tiazidas.",
              "Tubulo colector: accion de aldosterona y hormona antidiuretica; secrecion de potasio e hidrogeno."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "titulo": "Emergencias hiperglucemicas",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "CAD vs estado hiperosmolar (EHH)",
            "headers": [
              "Rasgo",
              "Cetoacidosis (CAD)",
              "Estado hiperosmolar (EHH)"
            ],
            "filas": [
              [
                "Tipo de diabetes",
                "Mas tipo 1",
                "Mas tipo 2"
              ],
              [
                "Glucosa",
                "Alta (mayor a 250)",
                "Muy alta (a menudo mayor a 600)"
              ],
              [
                "Cetonas / acidosis",
                "Si, anion gap elevado",
                "Minimas o ausentes"
              ],
              [
                "Osmolaridad",
                "Variable",
                "Muy elevada"
              ],
              [
                "Estado mental",
                "Variable",
                "Mas deterioro"
              ]
            ]
          },
          {
            "tipo": "pasos",
            "titulo": "Manejo de la cetoacidosis diabetica",
            "items": [
              "Reposicion intensa de liquidos intravenosos (la deshidratacion es enorme).",
              "Insulina intravenosa en infusion continua.",
              "Vigilar y reponer potasio: cae al entrar a la celula con la insulina.",
              "Buscar y tratar el desencadenante (infeccion, omision de insulina, evento cardiaco).",
              "No suspender la insulina hasta resolver la cetosis y traslapar a insulina subcutanea."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "El potasio en la CAD",
            "texto": "El potasio serico puede estar normal o alto al ingreso pese a un deficit corporal total. Al iniciar insulina el potasio entra a las celulas y puede caer peligrosamente. Si el potasio inicial es bajo, primero se repone y luego se inicia insulina."
          }
        ],
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "titulo": "Apendicitis y obstruccion intestinal",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La apendicitis aguda es la urgencia quirurgica abdominal mas frecuente. El dolor suele iniciar periumbilical o epigastrico y migrar a la fosa iliaca derecha (punto de McBurney), con anorexia, nausea y febricula."
          },
          {
            "tipo": "lista",
            "titulo": "Signos de irritacion peritoneal",
            "items": [
              "Signo de Blumberg: dolor de rebote en la fosa iliaca derecha.",
              "Signo de Rovsing: dolor en fosa iliaca derecha al palpar la izquierda.",
              "Signo del psoas y del obturador: dolor con movimientos especificos de la cadera."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Obstruccion mecanica vs ileo paralitico",
            "headers": [
              "Rasgo",
              "Obstruccion mecanica",
              "Ileo paralitico"
            ],
            "filas": [
              [
                "Ruidos intestinales",
                "Aumentados, metalicos (luego ausentes)",
                "Disminuidos o ausentes"
              ],
              [
                "Causas",
                "Adherencias, hernias, tumores",
                "Cirugia, peritonitis, electrolitos, opioides"
              ],
              [
                "Imagen",
                "Niveles hidroaereos, asas dilatadas con corte",
                "Dilatacion difusa sin punto de corte"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Senales de alarma en obstruccion",
            "texto": "La fiebre, taquicardia, dolor desproporcionado, acidosis o signos peritoneales sugieren estrangulacion o isquemia intestinal, una urgencia quirurgica. La obstruccion no complicada puede manejarse de forma conservadora inicial con sonda y liquidos."
          }
        ],
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "SRAA",
        "definicion": "Eje hormonal que retiene sodio y agua y vasoconstriñe para sostener la presión.",
        "procedencia": {
          "temaOriginal": "fisiologia-medica"
        }
      },
      {
        "termino": "Aldosterona",
        "definicion": "Hormona que retiene sodio y agua y elimina potasio.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "termino": "Infarto de VD",
        "definicion": "Precarga dependiente; los nitratos lo descompensan, se trata con líquidos.",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "termino": "Eco FAST",
        "definicion": "Ecografía dirigida que detecta líquido libre en el trauma.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "termino": "eFAST",
        "definicion": "Protocolo POCUS de trauma para líquido libre, hemopericardio y neumotórax.",
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      },
      {
        "termino": "Criterios de Light",
        "definicion": "Diferencian exudado de trasudado en el liquido pleural.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "termino": "Peritonitis bacteriana espontanea",
        "definicion": "Infeccion del liquido ascitico sin foco quirurgico.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      },
      {
        "termino": "Bicarbonato en tricíclicos",
        "definicion": "1-2 mEq/kg si QRS >100 ms; vence el bloqueo de sodio.",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que ion entra durante la despolarizacion?",
        "reverso": "El sodio.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "frente": "Que hormona retiene sodio y agua y elimina potasio?",
        "reverso": "La aldosterona.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "frente": "Cual es el principal electrolito intracelular?",
        "reverso": "El potasio.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "frente": "Tratamiento de la torsades de pointes",
        "reverso": "Sulfato de magnesio 1 a 2 g IV y corregir QT/electrolitos.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "frente": "FENa en la LRA prerrenal",
        "reverso": "Menor a 1 por ciento (el rinon retiene sodio).",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "frente": "Tratamiento de la cardiotoxicidad por tricíclicos con QRS ancho",
        "reverso": "Bicarbonato de sodio 1-2 mEq/kg.",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual de estas es una articulacion sinovial (diartrosis)?",
        "opciones": [
          "Suturas del craneo",
          "Disco intervertebral",
          "Rodilla",
          "Sinfisis del pubis"
        ],
        "correcta": 2,
        "explicacion": "La rodilla es una diartrosis movil con cartilago, capsula y liquido sinovial. Las suturas son fibrosas y los discos son cartilaginosos.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "pregunta": "Durante el periodo refractario absoluto, la neurona:",
        "opciones": [
          "Responde a cualquier estimulo",
          "No puede generar un nuevo potencial de accion, lo que asegura la direccionalidad del impulso",
          "Libera mas calcio",
          "Se hiperpolariza de forma permanente"
        ],
        "correcta": 1,
        "explicacion": "En el periodo refractario absoluto los canales de sodio estan inactivados y no puede dispararse otro potencial, garantizando que el impulso viaje en una sola direccion.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "pregunta": "Cual es el efecto neto de la activacion del SRAA?",
        "opciones": [
          "Disminuye la presion arterial",
          "Retiene sodio y agua, causa vasoconstriccion y eleva la presion",
          "Elimina sodio y agua",
          "Disminuye el potasio sin afectar la presion"
        ],
        "correcta": 1,
        "explicacion": "El SRAA eleva la presion: la angiotensina II contrae los vasos y la aldosterona retiene sodio y agua mientras elimina potasio.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "pregunta": "Un paciente con hiperpotasemia severa y ondas T picudas requiere primero:",
        "opciones": [
          "Diureticos solamente",
          "Calcio intravenoso para estabilizar la membrana cardiaca",
          "Mas potasio",
          "Restriccion de liquidos"
        ],
        "correcta": 1,
        "explicacion": "El calcio intravenoso estabiliza la membrana del miocardio y protege contra arritmias mientras se toman medidas para reducir el potasio serico.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "pregunta": "Por que el sodio determina el volumen de liquido corporal?",
        "opciones": [
          "Porque es el principal cation intracelular",
          "Porque es el principal soluto extracelular y el agua lo sigue por osmosis",
          "Porque no afecta la osmolaridad",
          "Porque se elimina sin agua"
        ],
        "correcta": 1,
        "explicacion": "El sodio es el principal determinante de la osmolaridad extracelular; donde va el sodio, el agua lo sigue por osmosis, regulando el volumen.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "pregunta": "Un paciente toma un inhibidor de la ECA. Que parametro debe vigilarse de cerca?",
        "opciones": [
          "Sodio bajo",
          "Potasio, que puede elevarse",
          "Glucosa",
          "Calcio bajo"
        ],
        "correcta": 1,
        "explicacion": "Al inhibir la ECA disminuye la aldosterona y se retiene potasio, por lo que estos farmacos pueden causar hiperpotasemia y requieren vigilancia.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "pregunta": "En que segmento de la nefrona ocurre la mayor reabsorcion de solutos filtrados?",
        "opciones": [
          "Tubo colector",
          "Tubulo proximal",
          "Capsula de Bowman",
          "Asa de Henle ascendente unicamente"
        ],
        "correcta": 1,
        "explicacion": "El tubulo proximal reabsorbe la mayor parte del agua, glucosa, sodio y otros solutos del filtrado, recuperandolos hacia la sangre.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "pregunta": "Corregir una hiponatremia demasiado rápido puede provocar:",
        "opciones": [
          "Edema cerebral",
          "Mielinolisis pontina",
          "Hiperpotasemia",
          "Acidosis"
        ],
        "correcta": 1,
        "explicacion": "La corrección brusca de la hiponatremia produce desmielinización osmótica (mielinolisis pontina). El sodio debe ajustarse lentamente.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      },
      {
        "pregunta": "Un paciente con sodio 140, cloro 100 y bicarbonato 14 tiene un anion gap de:",
        "opciones": [
          "12",
          "26",
          "54",
          "14"
        ],
        "correcta": 1,
        "explicacion": "Anion gap = 140 menos (100 mas 14) = 26, que esta elevado e indica acidosis metabolica con anion gap aumentado.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "pregunta": "Una LRA con fraccion excretada de sodio menor a 1 por ciento y cociente urea/creatinina elevado sugiere:",
        "opciones": [
          "Necrosis tubular aguda",
          "Causa prerrenal",
          "Causa posrenal",
          "Glomerulonefritis"
        ],
        "correcta": 1,
        "explicacion": "La avida retencion de sodio (FENa baja) con cociente urea/creatinina alto refleja un rinon sano que conserva volumen: patron prerrenal.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "pregunta": "Durante el tratamiento de la CAD, el electrolito que debe vigilarse mas estrechamente por riesgo de caida brusca es:",
        "opciones": [
          "Sodio",
          "Calcio",
          "Potasio",
          "Magnesio"
        ],
        "correcta": 2,
        "explicacion": "La insulina desplaza el potasio al interior celular; aunque inicie normal o alto, puede descender peligrosamente y debe reponerse.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "pregunta": "Sobredosis de tricíclicos con QRS de 130 ms e hipotensión. El tratamiento clave es:",
        "opciones": [
          "Amiodarona",
          "Bicarbonato de sodio 1-2 mEq/kg",
          "Verapamilo",
          "Atropina"
        ],
        "correcta": 1,
        "explicacion": "El bicarbonato aporta sodio y alcaliniza, revirtiendo el bloqueo de canales de sodio que ensancha el QRS.",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      }
    ]
  },
  "m4-card-exploracion": {
    "secciones": [
      {
        "titulo": "Semiologia cardiaca",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "corazon"
          },
          {
            "tipo": "lista",
            "titulo": "Focos de auscultacion",
            "items": [
              "Aortico: segundo espacio intercostal derecho, borde paraesternal.",
              "Pulmonar: segundo espacio intercostal izquierdo, borde paraesternal.",
              "Tricuspideo: cuarto a quinto espacio intercostal izquierdo, borde paraesternal.",
              "Mitral o apical: quinto espacio intercostal izquierdo, linea medioclavicular."
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Ruidos cardiacos",
            "items": [
              "R1: cierre de valvulas auriculoventriculares (mitral y tricuspide); inicio de la sistole.",
              "R2: cierre de valvulas semilunares (aortica y pulmonar); inicio de la diastole.",
              "R3: galope ventricular, llenado rapido; normal en jovenes, patologico en sobrecarga de volumen.",
              "R4: galope auricular, contraccion contra ventriculo rigido; sugiere disfuncion diastolica."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Pulso venoso yugular",
            "texto": "La estimacion de la presion venosa yugular permite valorar la presion de la auricula derecha a la cabecera del paciente. Su elevacion indica congestion sistemica y es signo cardinal de falla derecha."
          }
        ],
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Fórmula del gasto cardíaco",
        "reverso": "GC = Frecuencia cardíaca × Volumen sistólico.",
        "procedencia": {
          "temaOriginal": "fisiologia-medica"
        }
      },
      {
        "frente": "Cual es la formula del gasto cardiaco?",
        "reverso": "Gasto cardiaco = frecuencia cardiaca por volumen sistolico.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "frente": "¿Por qué evitar nitratos en infarto de VD?",
        "reverso": "Es precarga dependiente; los nitratos causan hipotensión grave.",
        "procedencia": {
          "temaOriginal": "sica-profundo",
          "porUnidad": true
        }
      },
      {
        "frente": "Causa mas frecuente de falla cardiaca derecha",
        "reverso": "La falla cardiaca izquierda previa.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cuál es el orden correcto del sistema de conducción cardíaca:",
        "opciones": [
          "Nodo AV, nodo sinusal, His, Purkinje",
          "Nodo sinusal, nodo AV, haz de His, fibras de Purkinje",
          "His, Purkinje, nodo sinusal, nodo AV",
          "Purkinje, His, nodo AV, nodo sinusal"
        ],
        "correcta": 1,
        "explicacion": "El impulso nace en el nodo sinusal, se frena en el nodo AV, desciende por el haz de His y se distribuye por las fibras de Purkinje.",
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      }
    ]
  },
  "m4-card-hipertension": {
    "secciones": [
      {
        "titulo": "Tension arterial y presion arterial media",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La tension arterial (TA) tiene dos valores: la sistolica (presion durante la contraccion ventricular) y la diastolica (presion durante la relajacion). Se mide por auscultacion con baumanometro y estetoscopio, escuchando los ruidos de Korotkoff, o por palpacion cuando hay mucho ruido ambiental (solo da la sistolica)."
          },
          {
            "tipo": "formula",
            "texto": "PAM = PAD + (PAS - PAD) / 3",
            "nota": "Presion arterial media. PAS = sistolica, PAD = diastolica. Una PAM mayor o igual a 65 mmHg suele indicar perfusion adecuada de organos."
          },
          {
            "tipo": "tabla",
            "titulo": "Clasificacion de la tension arterial en el adulto",
            "headers": [
              "Categoria",
              "Sistolica (mmHg)",
              "Diastolica (mmHg)"
            ],
            "filas": [
              [
                "Optima / normal",
                "Menor a 120",
                "Menor a 80"
              ],
              [
                "Elevada",
                "120 a 129",
                "Menor a 80"
              ],
              [
                "Hipertension etapa 1",
                "130 a 139",
                "80 a 89"
              ],
              [
                "Hipertension etapa 2",
                "Mayor o igual a 140",
                "Mayor o igual a 90"
              ],
              [
                "Crisis hipertensiva",
                "Mayor a 180",
                "Mayor a 120"
              ],
              [
                "Hipotension",
                "Menor a 90",
                "Variable"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "No te confies de una TA normal",
            "texto": "En el shock compensado, el cuerpo mantiene la presion a costa de vasoconstriccion y taquicardia. La TA cae tarde, cuando los mecanismos de compensacion fallan. Una sistolica que baja es signo de shock descompensado: el paciente ya esta grave."
          }
        ],
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "titulo": "Glandula suprarrenal",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Insuficiencia suprarrenal vs Cushing",
            "headers": [
              "Rasgo",
              "Insuficiencia (Addison)",
              "Exceso (Cushing)"
            ],
            "filas": [
              [
                "Cortisol",
                "Bajo",
                "Alto"
              ],
              [
                "Presion arterial",
                "Hipotension",
                "Hipertension"
              ],
              [
                "Glucosa",
                "Tendencia a hipoglucemia",
                "Hiperglucemia"
              ],
              [
                "Piel",
                "Hiperpigmentacion (si es primaria)",
                "Estrias, fragilidad, equimosis"
              ],
              [
                "Electrolitos",
                "Hiponatremia, hiperpotasemia",
                "Hipopotasemia"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Crisis suprarrenal",
            "texto": "La insuficiencia suprarrenal aguda cursa con hipotension que no responde a liquidos ni vasopresores, hiponatremia e hiperpotasemia. Es una emergencia que requiere hidrocortisona intravenosa inmediata y reposicion de volumen."
          },
          {
            "tipo": "p",
            "texto": "La causa mas frecuente de sindrome de Cushing es la administracion exogena de corticoesteroides. La suspension brusca de esteroides cronicos puede precipitar una crisis suprarrenal por supresion del eje."
          }
        ],
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Salino hipertónico",
        "definicion": "Atrae agua del intracelular al vaso; útil en hipertensión intracraneal.",
        "procedencia": {
          "temaOriginal": "terapia-iv-io"
        }
      },
      {
        "termino": "Oscilometría",
        "definicion": "Método de la TA no invasiva basado en oscilaciones del flujo arterial.",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "termino": "EVC isquémico",
        "definicion": "Oclusión arterial cerebral; cerca del 85 por ciento de los casos.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Como es la hemorragia arterial",
        "reverso": "Roja brillante, en chorros pulsatiles; la mas grave.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "frente": "Que NO hacer en mordedura de serpiente",
        "reverso": "No succionar, no torniquete arterial, no cortar, no hielo.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "frente": "¿Por qué no bajar la presión en el EVC isquémico?",
        "reverso": "La hipertensión permisiva mantiene la perfusión de la penumbra.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "frente": "Forma del hematoma epidural en la TC",
        "reverso": "Lente biconvexa (lenticular), típicamente arterial.",
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "¿Cuál es el estímulo inicial de la liberación de renina?",
        "opciones": [
          "Hipertensión arterial",
          "Caída de la presión de perfusión renal",
          "Alcalosis",
          "Hiperkalemia aislada"
        ],
        "correcta": 1,
        "explicacion": "La hipoperfusión renal (como en la hipovolemia) activa el SRAA para retener sodio y agua y vasoconstreñir.",
        "procedencia": {
          "temaOriginal": "fisiologia-medica"
        }
      },
      {
        "pregunta": "El principal riesgo hemodinámico de la ventilación a presión positiva excesiva es:",
        "opciones": [
          "Aumento del retorno venoso",
          "Disminución del retorno venoso y del gasto cardíaco",
          "Bradicardia por vagotonía",
          "Hipertensión arterial sostenida"
        ],
        "correcta": 1,
        "explicacion": "La presión intratorácica elevada comprime las venas centrales, reduce el retorno venoso y baja el gasto cardíaco.",
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica"
        }
      },
      {
        "pregunta": "En el EVC isquémico, el manejo de una presión arterial elevada en el campo es:",
        "opciones": [
          "Bajarla agresivamente",
          "Tolerar la hipertensión permisiva para perfundir la penumbra",
          "Administrar nitroprusiato",
          "Indiferente"
        ],
        "correcta": 1,
        "explicacion": "Bajar la presión bruscamente reduce la perfusión del tejido en riesgo; se tolera la hipertensión hasta definir el tipo de EVC con imagen.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "pregunta": "Un hematoma con forma de lente biconvexa en la TC corresponde a:",
        "opciones": [
          "Hematoma subdural (venoso)",
          "Hematoma epidural (arterial)",
          "Hemorragia subaracnoidea",
          "Infarto isquémico"
        ],
        "correcta": 1,
        "explicacion": "El epidural es típicamente arterial (meníngea media) y adopta forma biconvexa/lenticular, con intervalo lúcido clásico.",
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      }
    ]
  },
  "m2-afi-oseo": {
    "secciones": [
      {
        "titulo": "Tejido conectivo",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El conectivo se distingue por abundante matriz extracelular formada por fibras (colageno, elastina, reticulina) y sustancia fundamental. Sus celulas estan dispersas. Es el tejido mas variado del cuerpo y va desde la sangre liquida hasta el hueso solido."
          },
          {
            "tipo": "lista",
            "titulo": "Variedades de tejido conectivo",
            "items": [
              "Laxo (areolar): rellena espacios, rodea vasos y nervios; sitio de inflamacion.",
              "Denso: tendones y ligamentos, rico en colageno con gran resistencia a la traccion.",
              "Adiposo: reserva energetica, aislamiento termico y proteccion mecanica.",
              "Cartilago: soporte flexible y avascular (oreja, nariz, superficies articulares).",
              "Oseo: matriz mineralizada con calcio; sosten y reserva mineral.",
              "Sangre: matriz liquida (plasma) con celulas suspendidas; transporte."
            ]
          },
          {
            "tipo": "p",
            "texto": "El colageno es la proteina mas abundante del cuerpo y da resistencia a la traccion; la elastina permite el retroceso elastico de arterias y pulmones. La vitamina C es indispensable para sintetizar colageno: su deficiencia (escorbuto) causa mala cicatrizacion y sangrado de encias."
          }
        ],
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Diartrosis",
        "definicion": "Articulacion sinovial movil, como la rodilla o el hombro.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico",
          "porUnidad": true
        }
      },
      {
        "termino": "Fractura expuesta",
        "definicion": "Fractura en la que el hueso comunica con el exterior; alto riesgo de infeccion.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Por que ocurre el rigor mortis?",
        "reverso": "Por agotamiento del ATP, que impide que la miosina se suelte de la actina.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico",
          "porUnidad": true
        }
      },
      {
        "frente": "Que neurotransmisor actua en la union neuromuscular?",
        "reverso": "La acetilcolina.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico",
          "porUnidad": true
        }
      },
      {
        "frente": "Que da dureza al hueso?",
        "reverso": "La matriz inorganica de fosfato de calcio.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "frente": "Fractura tipica del niño por hueso flexible",
        "reverso": "En tallo verde.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      },
      {
        "frente": "Las cinco \"S\" de la TC de cráneo",
        "reverso": "Sangre, cisternas, cerebro, ventrículos y hueso (sistemática de lectura).",
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      }
    ],
    "quiz": []
  },
  "m1-pai-heridas-especiales": {
    "secciones": [
      {
        "titulo": "Cicatrizacion y reparacion",
        "bloques": [
          {
            "tipo": "pasos",
            "titulo": "Fases de la cicatrizacion de una herida",
            "items": [
              "Hemostasia: vasoconstriccion y coagulo de plaquetas y fibrina (minutos).",
              "Inflamacion: llegan neutrofilos y macrofagos que limpian la herida (1 a 3 dias).",
              "Proliferacion: fibroblastos depositan colageno y se forma tejido de granulacion (dias a semanas).",
              "Remodelacion: el colageno se reorganiza y la cicatriz gana resistencia (semanas a meses)."
            ]
          },
          {
            "tipo": "p",
            "texto": "Los tejidos con alta tasa de division (epitelio, sangre) se regeneran restaurando la funcion; los de baja division (cardiaco, nervioso) reparan con tejido fibroso. Esta diferencia es la base pronostica del trauma: una abrasion cutanea sana sin secuela, un infarto deja una zona cicatrizal acinetica."
          }
        ],
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Tejido de granulacion",
        "definicion": "Tejido nuevo, rojo y vascularizado que rellena una herida durante la proliferacion.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "termino": "Empaquetamiento",
        "definicion": "Introducir gasa en una herida profunda hasta el fondo para comprimir desde dentro.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "termino": "Herida soplante de torax",
        "definicion": "Herida penetrante que succiona aire; se maneja con aposito de tres lados.",
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Donde se coloca el torniquete",
        "reverso": "5 a 7 cm por encima de la herida, nunca sobre una articulacion.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "frente": "Como se maneja una herida soplante de torax",
        "reverso": "Aposito de tres lados que deja salir aire pero impide su entrada.",
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "En que fase de la cicatrizacion los fibroblastos depositan colageno y aparece tejido de granulacion?",
        "opciones": [
          "Hemostasia",
          "Inflamacion",
          "Proliferacion",
          "Remodelacion"
        ],
        "correcta": 2,
        "explicacion": "Durante la proliferacion los fibroblastos sintetizan colageno y se forma tejido de granulacion vascularizado que rellena la herida.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "pregunta": "Una fractura abierta debe manejarse antes de inmovilizar con:",
        "opciones": [
          "Reduccion inmediata del hueso",
          "Aposito esteril sobre la herida",
          "Aplicacion de torniquete siempre",
          "Lavado con agua a presion"
        ],
        "correcta": 1,
        "explicacion": "La herida de una fractura expuesta se cubre con aposito esteril antes de inmovilizar para reducir el riesgo de infeccion.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      },
      {
        "pregunta": "Un herido camina por su cuenta y solicita ayuda por una herida en el brazo. Su clasificacion inicial es:",
        "opciones": [
          "Rojo",
          "Amarillo",
          "Verde",
          "Negro"
        ],
        "correcta": 2,
        "explicacion": "Quien deambula (walking wounded) se clasifica inicialmente como verde, prioridad menor, aunque debe reevaluarse.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      }
    ]
  },
  "m2-ao-endocrino": {
    "secciones": [
      {
        "titulo": "Principios del sistema endocrino",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "endocrino",
            "titulo": "Glandulas endocrinas principales"
          },
          {
            "tipo": "p",
            "texto": "El sistema endocrino se comunica mediante hormonas, mensajeros quimicos liberados a la sangre que actuan sobre celulas con receptores especificos. A diferencia del sistema nervioso, su accion es mas lenta pero mas prolongada. La retroalimentacion negativa mantiene los niveles hormonales estables."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Retroalimentacion negativa",
            "texto": "Cuando una hormona alcanza su nivel objetivo, frena la glandula que la produce, como un termostato. La mayoria de los ejes hormonales funcionan asi para evitar excesos y deficits."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "titulo": "Hipotalamo e hipofisis",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El hipotalamo controla la hipofisis, la glandula maestra. La hipofisis anterior secreta hormonas que regulan otras glandulas (tiroides, suprarrenales, gonadas) ademas de la hormona de crecimiento y la prolactina. La hipofisis posterior libera ADH y oxitocina producidas en el hipotalamo."
          },
          {
            "tipo": "tabla",
            "titulo": "Hormonas de la hipofisis anterior",
            "headers": [
              "Hormona",
              "Glandula diana",
              "Efecto"
            ],
            "filas": [
              [
                "TSH",
                "Tiroides",
                "Estimula hormonas tiroideas"
              ],
              [
                "ACTH",
                "Suprarrenal",
                "Estimula cortisol"
              ],
              [
                "FSH y LH",
                "Gonadas",
                "Reproduccion"
              ],
              [
                "GH",
                "Tejidos",
                "Crecimiento y metabolismo"
              ],
              [
                "Prolactina",
                "Mama",
                "Produccion de leche"
              ]
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "titulo": "Pancreas y glucemia",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El pancreas endocrino regula la glucemia con dos hormonas opuestas: la insulina (celulas beta) baja la glucosa al introducirla en las celulas, y el glucagon (celulas alfa) la sube al liberar glucosa del higado. Su equilibrio mantiene la glucemia estable."
          },
          {
            "tipo": "lista",
            "titulo": "Acciones de la insulina",
            "items": [
              "Permite la entrada de glucosa a las celulas.",
              "Estimula el almacenamiento de glucogeno en el higado.",
              "Inhibe la produccion de cuerpos cetonicos.",
              "Favorece la sintesis de grasa y proteinas."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Cetoacidosis diabetica",
            "texto": "Sin insulina las celulas no pueden usar glucosa y queman grasa, produciendo cuerpos cetonicos acidos. El resultado es hiperglucemia, acidosis metabolica, deshidratacion y aliento afrutado. El tratamiento incluye liquidos, insulina y correccion de electrolitos."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "titulo": "El eje hipotalamo-hipofisis",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "endocrino"
          },
          {
            "tipo": "p",
            "texto": "El hipotalamo libera hormonas que regulan la hipofisis, la cual a su vez controla glandulas perifericas como tiroides, suprarrenales y gonadas. La hormona producida en la periferia inhibe los niveles superiores: este es el principio de la retroalimentacion negativa."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Logica de la retroalimentacion",
            "texto": "En un trastorno primario (de la glandula periferica), la hormona hipofisaria se mueve en direccion opuesta. Ejemplo: en el hipotiroidismo primario la T4 esta baja y la TSH alta. En un trastorno central (hipofisario), ambas van en la misma direccion."
          }
        ],
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Glandula endocrina",
        "definicion": "Glandula sin conducto que vierte hormonas directamente a la sangre.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "termino": "ADH",
        "definicion": "Hormona antidiuretica que aumenta la reabsorcion de agua en el tubo colector.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "termino": "Retroalimentacion negativa",
        "definicion": "Mecanismo por el cual una hormona frena su propia produccion al alcanzar su nivel objetivo.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "termino": "Cortisol",
        "definicion": "Hormona suprarrenal del estres que eleva la glucemia y tiene efecto antiinflamatorio.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "termino": "TSH",
        "definicion": "Hormona estimulante de la tiroides; prueba mas sensible de la funcion tiroidea.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cual es la glandula maestra del sistema endocrino?",
        "reverso": "La hipofisis, controlada por el hipotalamo.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "frente": "Que hormona baja la glucemia?",
        "reverso": "La insulina.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "frente": "Que hormona sube la glucemia?",
        "reverso": "El glucagon.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "frente": "Que hormonas produce la tiroides?",
        "reverso": "T3, T4 (metabolismo) y calcitonina (baja calcio).",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "frente": "Que hormona libera la corteza suprarrenal ante el estres?",
        "reverso": "El cortisol.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "frente": "Que es la retroalimentacion negativa?",
        "reverso": "Una hormona frena su produccion al alcanzar su nivel objetivo, como un termostato.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "frente": "Patron de laboratorio del hipotiroidismo primario",
        "reverso": "TSH alta y T4 baja.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica",
          "porUnidad": true
        }
      },
      {
        "frente": "Como interpretar un trastorno primario por retroalimentacion",
        "reverso": "La hormona hipofisaria se mueve en direccion opuesta a la periferica.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Que hormona permite concentrar la orina al conservar agua?",
        "opciones": [
          "Aldosterona",
          "ADH (hormona antidiuretica)",
          "Renina",
          "Eritropoyetina"
        ],
        "correcta": 1,
        "explicacion": "La ADH aumenta la permeabilidad al agua en el tubo colector, reabsorbiendo agua y concentrando la orina cuando el cuerpo necesita conservar liquidos.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "pregunta": "Que hormona de la hipofisis anterior estimula la liberacion de cortisol?",
        "opciones": [
          "TSH",
          "ACTH",
          "FSH",
          "Prolactina"
        ],
        "correcta": 1,
        "explicacion": "La ACTH (hormona adrenocorticotropa) actua sobre la corteza suprarrenal para estimular la produccion de cortisol.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "pregunta": "En un trastorno endocrino PRIMARIO, la relacion entre la hormona periferica y la hipofisaria es:",
        "opciones": [
          "Van en la misma direccion",
          "Van en direccion opuesta",
          "No se relacionan",
          "Ambas siempre bajas"
        ],
        "correcta": 1,
        "explicacion": "En un trastorno primario las hormonas van en direccion opuesta por retroalimentacion (ejemplo: T4 baja con TSH alta).",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      }
    ]
  },
  "m3-va-isr": {
    "secciones": [
      {
        "titulo": "Ciclo cardiaco",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El ciclo cardiaco alterna sistole (contraccion y expulsion) y diastole (relajacion y llenado). Durante la sistole ventricular se cierran las valvulas auriculoventriculares (primer ruido, S1) y se abren las semilunares; durante la diastole se cierran las semilunares (segundo ruido, S2) y se llenan los ventriculos."
          },
          {
            "tipo": "pasos",
            "titulo": "Secuencia del ciclo",
            "items": [
              "Llenado ventricular diastolico, ayudado por la contraccion auricular.",
              "Contraccion isovolumetrica: se cierran las valvulas AV (S1).",
              "Eyeccion: se abren las valvulas semilunares y sale la sangre.",
              "Relajacion isovolumetrica: se cierran las semilunares (S2)."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Las coronarias se llenan en diastole",
            "texto": "El miocardio recibe su sangre durante la diastole, cuando esta relajado. Una taquicardia extrema acorta la diastole y reduce la perfusion coronaria, lo que puede agravar la isquemia."
          }
        ],
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "titulo": "Cálculo de la frecuencia cardíaca",
        "bloques": [
          {
            "tipo": "formula",
            "texto": "FC = 300 / numero de cuadros grandes entre dos R",
            "nota": "Método rápido para ritmos regulares: cuente los cuadros grandes entre dos complejos QRS y divida 300 entre ese número."
          },
          {
            "tipo": "lista",
            "titulo": "Secuencia memorística de cuadros grandes",
            "items": [
              "1 cuadro grande entre R y R: 300 por minuto.",
              "2 cuadros: 150 por minuto.",
              "3 cuadros: 100 por minuto.",
              "4 cuadros: 75 por minuto.",
              "5 cuadros: 60 por minuto.",
              "6 cuadros: 50 por minuto."
            ]
          },
          {
            "tipo": "formula",
            "texto": "FC = numero de QRS en 30 cuadros grandes x 10",
            "nota": "Método de los 6 segundos, ideal para ritmos irregulares como la fibrilación auricular: cuente los QRS en una tira de 6 segundos y multiplique por 10."
          }
        ],
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      },
      {
        "titulo": "Complicaciones y limitaciones",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Complicaciones posibles",
            "items": [
              "Aspiración: protección incompleta frente al contenido gástrico.",
              "Fuga e hipoventilación si el sello es insuficiente o la presión es alta.",
              "Insuflación gástrica con ventilaciones demasiado rápidas o vigorosas.",
              "Lesión de tejidos blandos o laringoespasmo en pacientes con reflejos conservados."
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Limitaciones y contraindicaciones",
            "items": [
              "Reflejo nauseoso intacto o paciente consciente (no lo tolera).",
              "Obstrucción de la vía aérea por cuerpo extraño o edema laríngeo.",
              "Trauma o quemaduras significativas de la vía aérea superior.",
              "Necesidad de presiones de ventilación muy altas (la fuga aumenta)."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Es un puente, no un destino",
            "texto": "El DSG estabiliza la ventilación en el campo y permite trasladar; en el hospital suele cambiarse por un tubo endotraqueal cuando se requiere protección definitiva de la vía aérea."
          }
        ],
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      },
      {
        "titulo": "Intubación de Secuencia Rápida (RSI) y Retardada (DSI)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La RSI consiste en administrar de forma casi simultánea un inductor y un bloqueador neuromuscular para crear condiciones óptimas de intubación minimizando el riesgo de broncoaspiración. La DSI (secuencia retardada) usa primero un agente disociativo como la ketamina para permitir la preoxigenación en el paciente agitado, retrasando la parálisis."
          },
          {
            "tipo": "pasos",
            "titulo": "Las \"P\" de la RSI",
            "items": [
              "Preparación: equipo, monitorización, plan de rescate, fármacos calculados.",
              "Preoxigenación: lavado de nitrógeno con O₂ al 100% durante 3 min para crear reserva en la CRF y prolongar la apnea segura.",
              "Pretratamiento / optimización fisiológica: corregir hipotensión e hipoxemia antes de inducir.",
              "Parálisis con inducción: inductor (ketamina, etomidato) + bloqueador (succinilcolina o rocuronio).",
              "Posicionamiento: \"ramping\" (alinear conducto auditivo con la horquilla esternal), maniobra de Sellick opcional.",
              "Prueba de colocación: visualización, capnografía, auscultación.",
              "Postintubación: sedoanalgesia, fijación, ventilación protectora."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Preoxigenación = \"lavado de nitrógeno\"",
            "texto": "El aire alveolar es ~78% nitrógeno. Respirar O₂ al 100% reemplaza ese nitrógeno por oxígeno en la capacidad residual funcional, creando un reservorio que permite varios minutos de apnea sin desaturar. Es el paso que más tiempo seguro otorga durante la intubación."
          }
        ],
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "titulo": "La secuencia: SRI y SDA",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La Secuencia Rápida de Intubación (SRI) administra casi simultáneamente un inductor y un bloqueador neuromuscular para crear condiciones óptimas de intubación minimizando el riesgo de broncoaspiración. La Secuencia Demorada de Intubación (SDA) usa un sedante que preserva la respiración (típicamente ketamina) para poder preoxigenar al paciente agitado antes de paralizar."
          },
          {
            "tipo": "diagrama",
            "clave": "sri",
            "titulo": "Línea de tiempo de la SRI",
            "descripcion": "Las fases desde la preoxigenación hasta la verificación con capnografía."
          },
          {
            "tipo": "pasos",
            "titulo": "Las 7 P de la SRI",
            "items": [
              "Preparación: material, monitor, capnografía, plan B y fármacos calculados.",
              "Preoxigenación: 3 min con O₂ al 100% o 8 respiraciones máximas; oxigenación apneica con cánula nasal.",
              "Pretratamiento (opcional): fentanilo para atenuar la respuesta simpática.",
              "Parálisis con inducción: inductor + bloqueador neuromuscular casi a la vez.",
              "Posicionamiento: alinear ejes (posición de olfateo / oreja-esternón).",
              "Paso del tubo y comprobación: laringoscopia, intubación, confirmar con capnografía.",
              "Postintubación: fijar tubo, sedoanalgesia, ventilación protectora, control de PA."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Optimizar antes de inducir",
            "texto": "Resucitar antes de intubar: corregir hipotensión e hipoxemia primero. Un paciente con shock e hipoxemia tiene alto riesgo de paro peri-intubación. La SDA con ketamina permite preoxigenar al agitado que no tolera la mascarilla."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Mielinolisis pontina",
        "definicion": "Daño cerebral por corrección demasiado rápida de la hiponatremia.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que epitelio recubre los alveolos y por que?",
        "reverso": "Plano simple, porque permite la difusion rapida de gases.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual es la secuencia correcta del sistema de conduccion?",
        "opciones": [
          "Nodo AV, nodo SA, His, Purkinje",
          "Nodo SA, nodo AV, haz de His, fibras de Purkinje",
          "Purkinje, His, nodo AV, nodo SA",
          "Nodo SA, His, nodo AV, Purkinje"
        ],
        "correcta": 1,
        "explicacion": "El impulso nace en el nodo SA, se retrasa en el nodo AV, baja por el haz de His y se distribuye por las fibras de Purkinje a los ventriculos.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "pregunta": "Respecto a la dosis, una verdad sobre las vías de administración es:",
        "opciones": [
          "La dosis es igual por todas las vías",
          "La vía puede modificar la dosis necesaria, como la naloxona IN frente a la IV",
          "La vía no afecta la velocidad de acción",
          "La vía oral es la más rápida"
        ],
        "correcta": 1,
        "explicacion": "La biodisponibilidad varía con la vía; por eso la naloxona intranasal suele requerir mayor dosis que la IV para lograr el mismo efecto.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "pregunta": "Una FA con respuesta rápida en paciente hipotenso y con dolor torácico se maneja con:",
        "opciones": [
          "Diltiazem IV",
          "Cardioversión sincronizada",
          "Adenosina",
          "Observación"
        ],
        "correcta": 1,
        "explicacion": "La inestabilidad obliga a cardioversión sincronizada (120 a 200 J), no a control farmacológico de la frecuencia.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      }
    ]
  },
  "m1-pab-ovace-adultos": {
    "secciones": [
      {
        "titulo": "Obstruccion de via aerea por cuerpo extraño (OVACE)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El atragantamiento puede ser leve (obstruccion parcial, el paciente tose con fuerza) o grave (obstruccion completa, no puede toser, hablar ni respirar). La conducta cambia segun la severidad y el estado de conciencia."
          },
          {
            "tipo": "pasos",
            "titulo": "Adulto y niño consciente con obstruccion grave",
            "items": [
              "Pregunta si se esta ahogando; el signo universal es llevarse las manos al cuello.",
              "Si no puede hablar ni toser, parate detras y aplica compresiones abdominales (maniobra de Heimlich).",
              "Coloca el puño sobre el ombligo por debajo del apendice xifoides y comprime hacia adentro y arriba.",
              "Repite hasta expulsar el objeto o hasta que el paciente pierda la conciencia."
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Variantes de la maniobra",
            "items": [
              "Lactante: alterna 5 golpes interescapulares con 5 compresiones toracicas; no se hacen compresiones abdominales.",
              "Embarazada u obeso: usa compresiones toracicas en lugar de abdominales.",
              "Paciente inconsciente: bajalo al piso, inicia RCP y revisa la boca antes de cada ventilacion para retirar el objeto si es visible."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "No barridos a ciegas",
            "texto": "Nunca metas el dedo a barrer la boca sin ver el objeto: puedes empujarlo mas adentro. Solo retira lo que veas claramente."
          }
        ],
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Maniobra de Heimlich",
        "definicion": "Compresiones abdominales para desobstruir la via aerea en el adulto consciente.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "termino": "Ileo paralitico",
        "definicion": "Detencion del transito sin obstruccion mecanica; ruidos disminuidos.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cual es la proteina mas abundante del cuerpo?",
        "reverso": "El colageno, que da resistencia a la traccion.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "frente": "Que NO debes hacer al buscar un cuerpo extraño en la boca",
        "reverso": "Barridos a ciegas; solo retira lo que veas.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      }
    ],
    "quiz": []
  },
  "m5-tcc-cauda-equina": {
    "secciones": [
      {
        "titulo": "RCE y cuidados posparo",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El retorno de la circulación espontánea es el inicio, no el final, del tratamiento. El síndrome posparo combina lesión cerebral, disfunción miocárdica y respuesta inflamatoria sistémica. El cuidado posparo busca optimizar la perfusión y proteger el cerebro."
          },
          {
            "tipo": "lista",
            "titulo": "Metas inmediatas tras el RCE",
            "items": [
              "Oxigenación con SpO2 entre 92 y 98 por ciento; evitar la hiperoxia.",
              "Ventilación para normocapnia (ETCO2 35 a 45 mmHg); evitar la hiperventilación.",
              "Presión arterial sistólica mayor a 90 mmHg o PAM mayor a 65 mmHg con líquidos y vasopresores.",
              "ECG de 12 derivaciones para detectar IAMCEST y activar reperfusión.",
              "Manejo dirigido de la temperatura (control entre 32 y 36 grados) en el paciente comatoso.",
              "Tratar la causa desencadenante y trasladar a centro con capacidad de hemodinamia."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "La hiperoxia daña",
            "texto": "Tras el RCE, las fracciones de oxígeno excesivas aumentan el estrés oxidativo y empeoran la lesión por reperfusión cerebral. Titule el oxígeno a la pulsioximetría en lugar de mantener el 100 por ciento de forma indefinida."
          }
        ],
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Cauda equina",
        "definicion": "Conjunto de raices nerviosas que continuan la medula por debajo de L1-L2.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "termino": "Anion gap",
        "definicion": "Na menos (Cl mas HCO3); separa acidosis metabolicas por su causa.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "termino": "Cuatro T",
        "definicion": "Tono, trauma, tejido y trombina; causas de hemorragia posparto.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que vitamina es esencial para sintetizar colageno?",
        "reverso": "La vitamina C; su deficiencia causa escorbuto.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "frente": "Donde termina la medula espinal en el adulto?",
        "reverso": "Alrededor de L1-L2; debajo continua la cauda equina.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "frente": "¿Por qué los nitratos son peligrosos en el IAM de ventrículo derecho?",
        "reverso": "El VD es precarga-dependiente; la venodilatación reduce el llenado y causa hipotensión/colapso.",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "frente": "Causa mas frecuente de hipertiroidismo",
        "reverso": "Enfermedad de Graves.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "frente": "Causa mas frecuente de sindrome de Cushing",
        "reverso": "Administracion exogena de corticoesteroides.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "frente": "Causa mas frecuente de hemorragia posparto",
        "reverso": "La atonia uterina.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "En AEIOU-TIPS, que causa tratable es indispensable descartar de inmediato en toda alteracion del estado mental?",
        "opciones": [
          "Uremia",
          "Hipoglucemia",
          "Stroke",
          "Causa psiquiatrica"
        ],
        "correcta": 1,
        "explicacion": "La hipoglucemia imita muchos cuadros graves y se revierte facilmente; por eso siempre se mide la glucemia capilar.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "pregunta": "La causa mas frecuente de sindrome de Cushing es:",
        "opciones": [
          "Adenoma hipofisario",
          "Tumor suprarrenal",
          "Uso exogeno de corticoesteroides",
          "Tumor pulmonar productor de ACTH"
        ],
        "correcta": 2,
        "explicacion": "La administracion exogena de corticoesteroides es la causa mas comun de sindrome de Cushing en la practica clinica.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "pregunta": "La causa mas frecuente de hemorragia posparto es:",
        "opciones": [
          "Trauma del canal",
          "Atonia uterina",
          "Retencion de tejido",
          "Trastorno de coagulacion"
        ],
        "correcta": 1,
        "explicacion": "La atonia uterina (el utero no se contrae) es la causa mas frecuente; es la primera T de las cuatro T.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ]
  },
  "m4-resp-edema-pulmon": {
    "secciones": [
      {
        "titulo": "Disnea y dolor abdominal",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La disnea es la sensacion subjetiva de falta de aire. Sus causas van desde el pulmon hasta el corazon. El dolor abdominal, por su parte, puede ser de origen visceral, somatico o referido, y su localizacion orienta el diagnostico."
          },
          {
            "tipo": "tabla",
            "titulo": "Causas comunes de disnea",
            "headers": [
              "Origen",
              "Ejemplos",
              "Pista clinica"
            ],
            "filas": [
              [
                "Respiratorio",
                "Asma, EPOC, neumonia",
                "Sibilancias, fiebre, tos"
              ],
              [
                "Cardiaco",
                "Edema agudo de pulmon",
                "Estertores, ortopnea, antecedente cardiaco"
              ],
              [
                "Alergico",
                "Anafilaxia",
                "Urticaria, edema, exposicion a alergeno"
              ],
              [
                "Metabolico",
                "Acidosis (respiracion de Kussmaul)",
                "Aliento cetonico, diabetico"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Cuadrantes abdominales y sospecha",
            "items": [
              "Cuadrante superior derecho: vesicula, higado.",
              "Cuadrante superior izquierdo: bazo, estomago.",
              "Cuadrante inferior derecho: apendice.",
              "Cuadrante inferior izquierdo: colon (diverticulitis).",
              "Epigastrio: pancreas, estomago, dolor coronario referido."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Abdomen agudo quirurgico",
            "texto": "Dolor intenso, abdomen rigido en tabla, defensa, rebote y signos de shock indican un abdomen agudo que requiere traslado urgente. No administres nada por via oral."
          }
        ],
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "titulo": "Edema agudo de pulmón cardiogénico",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El edema agudo de pulmón cardiogénico se produce por aumento de la presión hidrostática en el capilar pulmonar, casi siempre por falla del ventrículo izquierdo o crisis hipertensiva. El líquido inunda los alveolos y produce hipoxemia grave de instalación rápida."
          },
          {
            "tipo": "pasos",
            "titulo": "Tratamiento del edema agudo cardiogénico",
            "items": [
              "Posición sentada y oxígeno para corregir la hipoxemia.",
              "VMNI (CPAP o BiPAP) temprana: mejora la oxigenación y reduce la precarga y poscarga.",
              "Nitroglicerina para reducir precarga y poscarga si la presión lo permite.",
              "Diuréticos de asa en el paciente con sobrecarga de volumen.",
              "Tratar el desencadenante: crisis hipertensiva, isquemia o arritmia."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "La VMNI cambia el pronóstico",
            "texto": "En el edema agudo cardiogénico, la presión positiva reduce el retorno venoso, mejora el intercambio gaseoso y disminuye el trabajo respiratorio. A menudo evita la intubación si se aplica pronto."
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "titulo": "Crisis hipertensivas",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Antihipertensivos parenterales",
            "headers": [
              "Fármaco",
              "Dosis",
              "Mejor escenario"
            ],
            "filas": [
              [
                "Labetalol",
                "10-20 mg IV; repetir/doblar c/10 min",
                "Disección, ictus, eclampsia (α/β)"
              ],
              [
                "Esmolol",
                "Carga 500 mcg/kg/min 1 min; infusión 50 mcg/kg/min",
                "Disección aórtica (β titulable y breve)"
              ],
              [
                "Nitroglicerina",
                "Infusión 5-10 mcg/min, titular al alza",
                "Edema agudo de pulmón, síndrome coronario"
              ],
              [
                "Nicardipino",
                "Infusión 5 mg/h, titular",
                "Urgencia neurológica (calcioantagonista)"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Disección aórtica: frecuencia antes que presión",
            "texto": "Primero baje la frecuencia con un betabloqueador (esmolol/labetalol) para reducir la fuerza de eyección (dP/dt), y solo después añada un vasodilatador. Metas habituales: FC < 60 y PAS 100-120 mmHg. Dar un vasodilatador SOLO provoca taquicardia refleja que aumenta el estrés de pared y propaga la disección."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "No toda hipertensión es emergencia",
            "texto": "Sin daño agudo de órgano blanco (cerebro, corazón, riñón, retina) es una urgencia hipertensiva, no una emergencia: no se baja con fármacos IV rápidos. Bajar la PA demasiado deprisa puede causar isquemia cerebral o miocárdica."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Víboras (crotálidos)",
        "definicion": "Cascabel, nauyaca y cantil; veneno hemotóxico: edema, necrosis y coagulopatía. Antiveneno: Antivipmyn.",
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      },
      {
        "termino": "Coralillo",
        "definicion": "Elápido neurotóxico; poco edema pero parálisis progresiva. Antiveneno: Coralmyn.",
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      },
      {
        "termino": "SDRA",
        "definicion": "Edema pulmonar no cardiogénico por aumento de permeabilidad capilar.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Estertores crepitantes indican…",
        "reverso": "Líquido en los alvéolos: edema pulmonar o neumonía.",
        "procedencia": {
          "temaOriginal": "evaluacion-integral"
        }
      },
      {
        "frente": "Tipo de veneno de las víboras (cascabel/nauyaca)",
        "reverso": "Hemotóxico y proteolítico: edema, necrosis y coagulopatía.",
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      },
      {
        "frente": "¿Por qué el coralillo es peligroso pese a poco edema?",
        "reverso": "Su veneno es neurotóxico: produce parálisis progresiva y paro respiratorio.",
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      },
      {
        "frente": "¿Cómo actúa el salino hipertónico 3% en el TCE?",
        "reverso": "Atrae agua del intracelular al intravascular, reduciendo el edema cerebral.",
        "procedencia": {
          "temaOriginal": "terapia-iv-io"
        }
      },
      {
        "frente": "Modo de VMNI de elección en el edema agudo de pulmón",
        "reverso": "CPAP (o BiPAP).",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "frente": "Diferencia entre edema cardiogénico y SDRA",
        "reverso": "El cardiogénico es por presión hidrostática; el SDRA por permeabilidad capilar.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un paciente con edema pulmonar agudo presenta hipoxemia severa. A nivel histologico, por que falla el intercambio gaseoso?",
        "opciones": [
          "El epitelio alveolar se vuelve estratificado",
          "El liquido aumenta la distancia de difusion a traves del epitelio plano alveolar",
          "Las neuronas alveolares dejan de funcionar",
          "El musculo liso alveolar se contrae en exceso"
        ],
        "correcta": 1,
        "explicacion": "El alveolo esta tapizado por epitelio plano simple ultradelgado; el liquido del edema interpone una barrera que aumenta la distancia de difusion del oxigeno, reduciendo el intercambio.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "pregunta": "Un trauma toracico provoca colapso pulmonar, desviacion traqueal e hipotension. El cuadro mas probable es:",
        "opciones": [
          "Asma",
          "Neumotorax a tension",
          "Edema pulmonar",
          "Embolia grasa"
        ],
        "correcta": 1,
        "explicacion": "El neumotorax a tension colapsa el pulmon, desvia el mediastino y comprime los grandes vasos, causando hipotension; requiere descompresion inmediata.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "pregunta": "Cual de los siguientes NO es uno de los seis signos clasicos de fractura?",
        "opciones": [
          "Crepitacion",
          "Deformidad",
          "Fiebre",
          "Impotencia funcional"
        ],
        "correcta": 2,
        "explicacion": "Los seis signos son dolor, edema, deformidad, crepitacion, equimosis e impotencia funcional. La fiebre no forma parte de ellos.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      },
      {
        "pregunta": "En el edema agudo de pulmón cardiogénico, la VMNI temprana:",
        "opciones": [
          "Está contraindicada",
          "Reduce precarga y poscarga, mejora oxigenación y evita intubaciones",
          "Solo sirve en el EPOC",
          "Aumenta el retorno venoso"
        ],
        "correcta": 1,
        "explicacion": "La presión positiva disminuye el retorno venoso y el trabajo respiratorio, mejorando el intercambio gaseoso y evitando intubaciones.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "pregunta": "Una contraindicación clara de la VMNI es:",
        "opciones": [
          "Edema agudo de pulmón",
          "EPOC hipercápnico",
          "Paciente obnubilado que no protege la vía aérea",
          "Asma moderada"
        ],
        "correcta": 2,
        "explicacion": "La incapacidad de proteger la vía aérea conlleva alto riesgo de broncoaspiración; ahí se requiere vía aérea definitiva.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "pregunta": "El SDRA se diferencia del edema cardiogénico en que:",
        "opciones": [
          "Hay falla de bomba",
          "Es edema no cardiogénico por aumento de permeabilidad capilar",
          "Responde a diuréticos como tratamiento principal",
          "Cursa con presiones de llenado altas"
        ],
        "correcta": 1,
        "explicacion": "El SDRA es una lesión inflamatoria con permeabilidad capilar aumentada, sin falla de bomba ni presiones de llenado elevadas.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "pregunta": "La ausencia de deslizamiento pleural junto al \"punto pulmón\" en ecografía sugiere:",
        "opciones": [
          "Edema pulmonar",
          "Neumotórax",
          "Derrame pericárdico",
          "Consolidación neumónica"
        ],
        "correcta": 1,
        "explicacion": "La pérdida del lung sliding con punto pulmón es altamente sugestiva de neumotórax.",
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      },
      {
        "pregunta": "Cual de estos signos es propio de la falla cardiaca DERECHA:",
        "opciones": [
          "Estertores crepitantes",
          "Ortopnea",
          "Ingurgitacion yugular y edema de miembros",
          "Disnea paroxistica nocturna"
        ],
        "correcta": 2,
        "explicacion": "La falla derecha produce congestion sistemica: ingurgitacion yugular, hepatomegalia y edema; los demas reflejan congestion pulmonar por falla izquierda.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ]
  },
  "m5-tocc-lesion-muscular-ojo": {
    "secciones": [
      {
        "titulo": "Tipos de lesion musculoesqueletica",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Diferenciacion clinica",
            "headers": [
              "Lesion",
              "Definicion",
              "Signos clave"
            ],
            "filas": [
              [
                "Fractura",
                "Ruptura de la continuidad del hueso",
                "Dolor, deformidad, crepitacion, impotencia funcional"
              ],
              [
                "Luxacion",
                "Perdida de contacto entre superficies articulares",
                "Deformidad articular, bloqueo del movimiento, dolor intenso"
              ],
              [
                "Esguince",
                "Lesion de ligamentos por estiramiento o desgarro",
                "Dolor, edema, equimosis, inestabilidad"
              ],
              [
                "Distension",
                "Lesion de musculo o tendon",
                "Dolor a la contraccion, espasmo"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Clasificacion de fracturas",
            "items": [
              "Cerrada: la piel permanece integra.",
              "Abierta o expuesta: el hueso comunica con el exterior, alto riesgo de infeccion y hemorragia.",
              "Conminuta: el hueso se fragmenta en multiples pedazos.",
              "En tallo verde: incompleta, tipica del niño por hueso flexible.",
              "Por estres: microfracturas por sobrecarga repetida."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Los seis signos de fractura",
            "texto": "Dolor, edema, deformidad, crepitacion, equimosis e impotencia funcional. No siempre estan todos; la ausencia de deformidad no descarta una fractura."
          }
        ],
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      },
      {
        "titulo": "Bloqueadores neuromusculares (BNM)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Los BNM paralizan el músculo esquelético actuando en la placa neuromuscular. Los despolarizantes (succinilcolina) imitan a la acetilcolina; los no despolarizantes (rocuronio, vecuronio) la bloquean de forma competitiva."
          },
          {
            "tipo": "tabla",
            "titulo": "Bloqueadores neuromusculares",
            "headers": [
              "Fármaco",
              "Tipo",
              "Dosis SRI",
              "Inicio / Duración"
            ],
            "filas": [
              [
                "Succinilcolina",
                "Despolarizante",
                "1.5 mg/kg IV",
                "45-60 s / 6-10 min"
              ],
              [
                "Rocuronio",
                "No despolarizante",
                "1.2 mg/kg IV",
                "45-60 s / 45-70 min"
              ],
              [
                "Vecuronio",
                "No despolarizante",
                "0.1-0.2 mg/kg IV",
                "2-3 min / 30-60 min"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Contraindicaciones de la succinilcolina",
            "texto": "Evítela si hay riesgo de hiperkalemia: quemaduras o aplastamiento >48-72 h, denervación (ictus/lesión medular subaguda, ELA, Guillain-Barré), distrofias musculares, inmovilización prolongada e hiperkalemia conocida. En estos casos puede subir el K⁺ 5-10 mEq/L y provocar paro. También desencadena hipertermia maligna."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Por qué muchos servicios prefieren rocuronio",
            "texto": "El rocuronio a 1.2 mg/kg iguala el inicio de la succinilcolina sin riesgo de hiperkalemia ni hipertermia maligna; su única contraindicación es la alergia. Su pega es la duración larga (no respira solo si la intubación falla), reversible con sugammadex donde esté disponible."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Cual tejido tiene mayor capacidad de regeneracion tras una lesion?",
        "opciones": [
          "Musculo cardiaco",
          "Neuronas del SNC",
          "Epitelio cutaneo",
          "Cartilago articular"
        ],
        "correcta": 2,
        "explicacion": "El epitelio tiene alta tasa de division y se regenera restaurando la funcion. Cardiaco, neuronas del SNC y cartilago tienen capacidad regenerativa muy limitada.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos"
        }
      },
      {
        "pregunta": "Cual es la diferencia entre esguince y luxacion?",
        "opciones": [
          "El esguince es fractura y la luxacion no",
          "El esguince lesiona ligamentos sin perder la relacion articular; la luxacion pierde la congruencia",
          "Son sinonimos",
          "La luxacion solo afecta musculos"
        ],
        "correcta": 1,
        "explicacion": "El esguince es lesion ligamentaria sin desplazamiento articular; la luxacion implica perdida de la congruencia de la articulacion.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      }
    ]
  },
  "m5-hs-definicion": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "CID",
        "definicion": "Coagulación intravascular diseminada: microtrombos y sangrado por consumo de factores.",
        "procedencia": {
          "temaOriginal": "microbiologia-sepsis",
          "porUnidad": true
        }
      },
      {
        "termino": "Angulo de Treitz",
        "definicion": "Limite anatomico que separa la hemorragia digestiva alta de la baja.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo",
          "porUnidad": true
        }
      },
      {
        "termino": "Melena",
        "definicion": "Heces negras y malolientes por sangre digerida; sugiere hemorragia alta.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [
      {
        "frente": "¿Qué es la CID?",
        "reverso": "Coagulación intravascular diseminada: trombosis microvascular y sangrado simultáneos.",
        "procedencia": {
          "temaOriginal": "microbiologia-sepsis",
          "porUnidad": true
        }
      },
      {
        "frente": "Que estructura separa la hemorragia digestiva alta de la baja",
        "reverso": "El angulo de Treitz.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo",
          "porUnidad": true
        }
      },
      {
        "frente": "Cuales son las cuatro T de la hemorragia posparto",
        "reverso": "Tono, trauma, tejido y trombina.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal",
          "porUnidad": true
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un paciente desnutrido tiene cicatrizacion muy lenta y sangrado de encias. Cual deficiencia es mas probable?",
        "opciones": [
          "Vitamina A",
          "Vitamina C",
          "Vitamina K",
          "Vitamina D"
        ],
        "correcta": 1,
        "explicacion": "La vitamina C es esencial para la sintesis de colageno; su deficiencia (escorbuto) produce mala cicatrizacion y fragilidad capilar con sangrado gingival.",
        "procedencia": {
          "temaOriginal": "histologia-tejidos",
          "porUnidad": true
        }
      },
      {
        "pregunta": "La warfarina prolonga principalmente:",
        "opciones": [
          "El TTPa (vía intrínseca)",
          "El TP/INR (vía extrínseca)",
          "El tiempo de sangrado plaquetario",
          "Ninguna prueba"
        ],
        "correcta": 1,
        "explicacion": "La warfarina afecta factores de la vía extrínseca/común medidos por TP/INR; la heparina afecta el TTPa.",
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia",
          "porUnidad": true
        }
      },
      {
        "pregunta": "La warfarina prolonga principalmente:",
        "opciones": [
          "El TTPa",
          "El TP/INR",
          "El tiempo de sangrado",
          "El conteo plaquetario"
        ],
        "correcta": 1,
        "explicacion": "La warfarina inhibe los factores dependientes de vitamina K y prolonga el TP/INR, que mide la via extrinseca.",
        "procedencia": {
          "temaOriginal": "hematologia-coagulacion",
          "porUnidad": true
        }
      },
      {
        "pregunta": "Politrauma con hemorragia, 40 min de evolución. Respecto al TXA:",
        "opciones": [
          "Ya es tarde, no darlo",
          "Dar 1 g IV en 10 min ahora (luego 1 g/8 h)",
          "Solo si la PA es normal",
          "Sustituye a la transfusión"
        ],
        "correcta": 1,
        "explicacion": "Dentro de las 3 h (mejor cuanto antes) el TXA reduce la mortalidad por hemorragia: 1 g en 10 min y luego 1 g en 8 h.",
        "procedencia": {
          "temaOriginal": "trauma-coagulopatia-hemorragia-obstetrica",
          "porUnidad": true
        }
      }
    ]
  },
  "m2-afe-tegumentario": {
    "secciones": [
      {
        "titulo": "Estructura de la piel",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "piel",
            "titulo": "Capas de la piel y sus anexos"
          },
          {
            "tipo": "p",
            "texto": "La piel tiene tres capas: epidermis, dermis e hipodermis (tejido celular subcutaneo). La epidermis es epitelio plano estratificado queratinizado, avascular; la dermis es tejido conectivo con vasos, nervios y anexos; la hipodermis es tejido adiposo que aisla y amortigua."
          },
          {
            "tipo": "lista",
            "titulo": "Componentes por capa",
            "items": [
              "Epidermis: queratinocitos, melanocitos (pigmento), celulas de Langerhans (inmunidad), capa cornea protectora.",
              "Dermis: colageno y elastina, capilares, terminaciones nerviosas, foliculos pilosos, glandulas sudoriparas y sebaceas.",
              "Hipodermis: adipocitos para aislamiento termico, reserva energetica y amortiguacion."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Por que importa la profundidad",
            "texto": "La epidermis no tiene vasos ni nervios propios; una lesion solo epidermica no sangra ni duele intensamente. Cuando una herida sangra y duele mucho, ha alcanzado la dermis."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "titulo": "Quemaduras",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Clasificacion de quemaduras por profundidad",
            "headers": [
              "Grado",
              "Capa afectada",
              "Signos"
            ],
            "filas": [
              [
                "Primer grado (superficial)",
                "Solo epidermis",
                "Eritema, dolor, sin ampollas"
              ],
              [
                "Segundo grado (espesor parcial)",
                "Epidermis y dermis",
                "Ampollas, dolor intenso, humeda"
              ],
              [
                "Tercer grado (espesor total)",
                "Toda la piel",
                "Seca, blanca o carbonizada, sin dolor por destruccion nerviosa"
              ]
            ]
          },
          {
            "tipo": "formula",
            "texto": "Regla de los nueves (adulto): cabeza 9 por ciento, cada brazo 9, cada pierna 18, torax anterior 18, espalda 18, genitales 1.",
            "nota": "Estima la superficie corporal quemada para calcular reanimacion con liquidos."
          },
          {
            "tipo": "p",
            "texto": "La perdida de la barrera cutanea en quemaduras extensas provoca fuga masiva de plasma y agua, llevando al shock por quemadura. Por eso la reanimacion con liquidos es prioritaria. La regla de los nueves cambia en ninos, donde la cabeza representa mayor proporcion de la superficie corporal."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "titulo": "Profundidad de las quemaduras",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Clasificación por profundidad",
            "headers": [
              "Grado",
              "Características"
            ],
            "filas": [
              [
                "Primer grado (superficial)",
                "Solo epidermis; eritema doloroso sin ampollas (como el sol)."
              ],
              [
                "Segundo grado superficial",
                "Epidermis y dermis superficial; ampollas, muy doloroso, llenado capilar presente."
              ],
              [
                "Segundo grado profundo",
                "Dermis profunda; menos doloroso, aspecto moteado o blanquecino."
              ],
              [
                "Tercer grado (espesor total)",
                "Toda la dermis; piel acartonada, blanca o carbonizada, indolora."
              ],
              [
                "Cuarto grado",
                "Afecta músculo, tendón o hueso."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "La quemadura indolora es la más grave",
            "texto": "En la quemadura de espesor total se destruyen las terminaciones nerviosas, por lo que es indolora y de aspecto seco y acartonado. La ausencia de dolor no tranquiliza: indica mayor profundidad y peor pronóstico."
          },
          {
            "tipo": "diagrama",
            "clave": "piel"
          }
        ],
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Epidermis",
        "definicion": "Capa externa de la piel, epitelio plano estratificado queratinizado y avascular.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "termino": "Dermis",
        "definicion": "Capa de tejido conectivo con vasos, nervios, foliculos y glandulas.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "termino": "Hipodermis",
        "definicion": "Tejido subcutaneo adiposo que aisla y amortigua.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario",
          "porUnidad": true
        }
      },
      {
        "termino": "Manto acido",
        "definicion": "Superficie acida de la piel que inhibe el crecimiento bacteriano.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "termino": "Agotamiento por calor",
        "definicion": "Cuadro de debilidad y piel humeda con temperatura casi normal, sin alteracion mental grave.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "termino": "Quemadura de espesor total",
        "definicion": "Destruye toda la dermis; piel acartonada e indolora (tercer grado).",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "termino": "Colinérgico vs. anticolinérgico",
        "definicion": "\"Húmedo\" (secreciones, miosis) vs. \"seco\" (piel seca/roja, midriasis).",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cuales son las tres capas de la piel?",
        "reverso": "Epidermis, dermis e hipodermis.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "frente": "Por que la epidermis no sangra al lesionarse?",
        "reverso": "Porque es avascular; no tiene vasos propios.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "frente": "Que vitamina sintetiza la piel?",
        "reverso": "La vitamina D, con la luz solar.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "frente": "Diferencia entre fractura cerrada y abierta",
        "reverso": "Cerrada: piel integra. Abierta: el hueso comunica con el exterior.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      },
      {
        "frente": "¿Qué diferencia clínica separa anticolinérgico de simpaticomimético?",
        "reverso": "Piel seca (anticolinérgico) vs. piel sudorosa/diaforesis (simpaticomimético).",
        "procedencia": {
          "temaOriginal": "farmacologia-toxicologia"
        }
      },
      {
        "frente": "¿Por qué el shock distributivo cursa con piel caliente?",
        "reverso": "Por la vasodilatación periférica que reduce la RVS.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Una quemadura presenta piel seca, blanquecina y el paciente no refiere dolor en esa zona. Que grado es?",
        "opciones": [
          "Primer grado",
          "Segundo grado superficial",
          "Segundo grado profundo",
          "Tercer grado"
        ],
        "correcta": 3,
        "explicacion": "La ausencia de dolor con aspecto seco y blanco indica destruccion total de la dermis y sus nervios, caracteristica de la quemadura de tercer grado o espesor total.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "pregunta": "Paciente con TA 118/78 pero FC de 130, piel fria y llenado capilar de 4 segundos. La interpretacion mas adecuada es:",
        "opciones": [
          "Esta estable porque la TA es normal",
          "Shock compensado: la TA aun no cae pero hay signos de hipoperfusion",
          "Crisis hipertensiva",
          "No hay datos de alarma"
        ],
        "correcta": 1,
        "explicacion": "La TA normal con taquicardia, piel fria y llenado prolongado es shock compensado. La presion cae tarde; los signos de mala perfusion lo delatan antes.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "pregunta": "Un paciente con TA 110/70, FC 124, piel fria y ansioso tras una colision. La fase de shock mas probable es:",
        "opciones": [
          "No tiene shock",
          "Shock compensado",
          "Shock descompensado",
          "Shock irreversible"
        ],
        "correcta": 1,
        "explicacion": "TA aun normal con taquicardia, piel fria y ansiedad indica shock compensado: el cuerpo mantiene la presion a costa de compensar.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "pregunta": "En hipotermia, por que se debe manipular al paciente con suavidad?",
        "opciones": [
          "Por comodidad",
          "Porque el corazon hipotermico es muy irritable y puede fibrilar",
          "Para no despertarlo",
          "Porque la piel se rompe facil"
        ],
        "correcta": 1,
        "explicacion": "El miocardio frio es muy irritable; un movimiento brusco puede desencadenar fibrilacion ventricular.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "pregunta": "Un paciente intoxicado con organofosforados presentará típicamente:",
        "opciones": [
          "Piel seca y midriasis",
          "Miosis, broncorrea, salivación y bradicardia",
          "Hipertensión con diaforesis y agitación",
          "Sedación aislada sin secreciones"
        ],
        "correcta": 1,
        "explicacion": "Es un toxidrome colinérgico (SLUDGE) por exceso de acetilcolina; se trata con atropina y pralidoxima.",
        "procedencia": {
          "temaOriginal": "farmacologia-toxicologia"
        }
      }
    ]
  },
  "m5-que-tratamiento": {
    "secciones": [
      {
        "titulo": "Funciones de la piel",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Funciones principales",
            "items": [
              "Barrera: protege contra microorganismos, quimicos y radiacion UV.",
              "Termorregulacion: controla la perdida de calor por sudoracion y vasomotricidad.",
              "Sensibilidad: receptores de tacto, presion, temperatura y dolor.",
              "Sintesis: produce vitamina D con la luz solar.",
              "Homeostasis hidrica: evita la perdida excesiva de agua.",
              "Excrecion: elimina agua, sales y urea por el sudor."
            ]
          },
          {
            "tipo": "p",
            "texto": "La piel es clave en la inmunidad innata: su superficie acida (manto acido) y la capa cornea impiden la colonizacion bacteriana. Cuando se pierde esta barrera, como en una quemadura extensa, el riesgo de infeccion y de perdida de liquidos se dispara."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "titulo": "Reanimación con líquidos: Parkland",
        "bloques": [
          {
            "tipo": "formula",
            "texto": "Parkland: 4 ml x peso (kg) x porcentaje de SCQ",
            "nota": "Es el volumen de cristaloide (Ringer lactato) para las primeras 24 horas. Se administra la mitad en las primeras 8 horas contadas desde el momento de la quemadura, y la otra mitad en las 16 horas siguientes."
          },
          {
            "tipo": "lista",
            "titulo": "Claves de la reanimación",
            "items": [
              "El cristaloide de elección es el Ringer lactato.",
              "Las 8 horas se cuentan desde la hora de la quemadura, no desde la atención.",
              "La fórmula es una estimación inicial: se titula a la diuresis.",
              "Meta de diuresis: 0.5 ml/kg/h en el adulto (mayor en el niño y en quemadura eléctrica)."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Titular a la diuresis, no a la fórmula",
            "texto": "Parkland solo da el punto de partida. La sobrerreanimación causa edema, sindrome compartimental y problemas pulmonares; la subreanimación, shock. La diuresis horaria es la guía real del ajuste."
          }
        ],
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Ketamina de inducción",
        "definicion": "1-2 mg/kg: anestesia disociativa para SRI; broncodilata y sostiene PA.",
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa",
          "porUnidad": true
        }
      },
      {
        "termino": "Re-narcotización",
        "definicion": "La naloxona dura menos que muchos opioides; vigilar recaída.",
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "La reanimación con líquidos del quemado se ajusta principalmente segun:",
        "opciones": [
          "El peso solamente",
          "La diuresis horaria",
          "La presión arterial aislada",
          "El dolor del paciente"
        ],
        "correcta": 1,
        "explicacion": "Parkland es solo una estimación inicial; la diuresis horaria (meta 0.5 ml/kg/h en adulto) guía el ajuste real para evitar sobre o subreanimación.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      }
    ]
  },
  "m4-met-diabetes": {
    "secciones": [
      {
        "titulo": "Cicatrizacion cutanea",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Las heridas superficiales que respetan la dermis cicatrizan sin marca porque el epitelio regenera. Las que destruyen la dermis sanan con cicatriz de colageno. Una cicatrizacion excesiva produce queloides; una insuficiente, dehiscencia de la herida."
          },
          {
            "tipo": "lista",
            "titulo": "Factores que retrasan la cicatrizacion",
            "items": [
              "Mala perfusion e hipoxia tisular.",
              "Infeccion local.",
              "Diabetes y desnutricion.",
              "Edad avanzada y uso de corticoides."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "titulo": "Endocrinología urgente",
        "bloques": [
          {
            "tipo": "tabla",
            "headers": [
              "",
              "Cetoacidosis diabética (CAD)",
              "Estado Hiperosmolar (EHH)"
            ],
            "filas": [
              [
                "Tipo de diabetes",
                "Típicamente tipo 1",
                "Típicamente tipo 2"
              ],
              [
                "Glucemia",
                "Alta (>250 mg/dL)",
                "Muy alta (>600 mg/dL)"
              ],
              [
                "Cetonas/acidosis",
                "Presentes; acidosis con anión gap",
                "Mínimas; sin acidosis significativa"
              ],
              [
                "Osmolaridad",
                "Elevada",
                "Muy elevada"
              ],
              [
                "Clave clínica",
                "Respiración de Kussmaul, aliento a frutas",
                "Deshidratación severa, alteración neurológica"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Pilares del tratamiento de la CAD",
            "texto": "Fluidos (la deshidratación es enorme), insulina (detiene la cetogénesis) y reposición de potasio. ¡Cuidado! La insulina introduce K⁺ en la célula y puede precipitar una hipokalemia peligrosa; debe vigilarse y reponerse el potasio."
          },
          {
            "tipo": "lista",
            "titulo": "Otras urgencias endocrinas",
            "items": [
              "Tormenta tiroidea: hipertiroidismo extremo con fiebre, taquiarritmia y agitación.",
              "Insuficiencia suprarrenal aguda (crisis addisoniana): hipotensión refractaria, hiponatremia, hiperkalemia; requiere hidrocortisona."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "medicina-interna"
        }
      },
      {
        "titulo": "Enfermedad renal cronica",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Estadios de ERC por filtrado glomerular (mL/min/1.73 m2)",
            "headers": [
              "Estadio",
              "FG",
              "Descripcion"
            ],
            "filas": [
              [
                "G1",
                "Mayor o igual a 90",
                "Dano renal con FG normal"
              ],
              [
                "G2",
                "60 a 89",
                "Descenso leve"
              ],
              [
                "G3a / G3b",
                "45 a 59 / 30 a 44",
                "Descenso moderado"
              ],
              [
                "G4",
                "15 a 29",
                "Descenso grave"
              ],
              [
                "G5",
                "Menor a 15",
                "Falla renal (terminal)"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Complicaciones de la ERC",
            "items": [
              "Anemia por deficit de eritropoyetina.",
              "Enfermedad mineral osea: hiperfosfatemia, hipocalcemia, hiperparatiroidismo secundario.",
              "Acidosis metabolica cronica.",
              "Hiperpotasemia y sobrecarga de volumen.",
              "Riesgo cardiovascular muy elevado."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Causas mas frecuentes de ERC",
            "texto": "La diabetes mellitus y la hipertension arterial son las dos causas mas frecuentes de enfermedad renal cronica. El control estricto de ambas y el bloqueo del sistema renina-angiotensina enlentecen su progresion."
          }
        ],
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "titulo": "Diabetes mellitus",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Criterios diagnosticos de diabetes",
            "headers": [
              "Prueba",
              "Punto de corte"
            ],
            "filas": [
              [
                "Glucosa en ayuno",
                "Mayor o igual a 126 mg/dL"
              ],
              [
                "Glucosa a las 2 h en curva",
                "Mayor o igual a 200 mg/dL"
              ],
              [
                "Hemoglobina glucosilada (HbA1c)",
                "Mayor o igual a 6.5 por ciento"
              ],
              [
                "Glucosa al azar con sintomas",
                "Mayor o igual a 200 mg/dL"
              ]
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Diabetes tipo 1 vs tipo 2",
            "headers": [
              "Rasgo",
              "Tipo 1",
              "Tipo 2"
            ],
            "filas": [
              [
                "Mecanismo",
                "Destruccion autoinmune de celulas beta",
                "Resistencia a la insulina"
              ],
              [
                "Insulina",
                "Deficiencia absoluta",
                "Relativa, inicialmente alta"
              ],
              [
                "Edad tipica",
                "Ninos y jovenes",
                "Adultos (en aumento en jovenes)"
              ],
              [
                "Tendencia a cetosis",
                "Alta (CAD)",
                "Baja (mas EHH)"
              ]
            ]
          },
          {
            "tipo": "p",
            "texto": "La HbA1c refleja el promedio de glucemia de los ultimos dos a tres meses, ya que mide la glucosilacion irreversible de la hemoglobina. La meta de control suele ser menor a 7 por ciento, individualizada segun el paciente."
          }
        ],
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Anión gap",
        "definicion": "Na⁺ − (Cl⁻ + HCO₃⁻); clasifica la acidosis metabólica.",
        "procedencia": {
          "temaOriginal": "medicina-interna",
          "porUnidad": true
        }
      },
      {
        "termino": "CAD vs. EHH",
        "definicion": "CAD con cetoacidosis (tipo 1); EHH con glucemia y osmolaridad extremas sin acidosis (tipo 2).",
        "procedencia": {
          "temaOriginal": "medicina-interna",
          "porUnidad": true
        }
      },
      {
        "termino": "HbA1c",
        "definicion": "Promedio glucemico de 2 a 3 meses; diagnostico de diabetes con valor mayor o igual a 6.5 por ciento.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Diferencia clave entre CAD y EHH",
        "reverso": "La CAD cursa con cetoacidosis; el EHH con osmolaridad/glucemia extremas sin acidosis significativa.",
        "procedencia": {
          "temaOriginal": "medicina-interna",
          "porUnidad": true
        }
      },
      {
        "frente": "Dos causas mas frecuentes de ERC",
        "reverso": "Diabetes mellitus e hipertension arterial.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "frente": "Valor de HbA1c que diagnostica diabetes",
        "reverso": "Mayor o igual a 6.5 por ciento.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "frente": "Diferencia clave entre CAD y EHH",
        "reverso": "La CAD tiene cetoacidosis con anion gap; el EHH no, pero la osmolaridad es muy alta.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica",
          "porUnidad": true
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual factor NO retrasa la cicatrizacion?",
        "opciones": [
          "Diabetes",
          "Buena perfusion tisular",
          "Infeccion local",
          "Uso de corticoides"
        ],
        "correcta": 1,
        "explicacion": "Una buena perfusion aporta oxigeno y nutrientes y favorece la cicatrizacion. Diabetes, infeccion y corticoides la retrasan.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "pregunta": "Una HbA1c de 7.2 por ciento en un paciente sin diagnostico previo indica:",
        "opciones": [
          "Glucemia normal",
          "Prediabetes",
          "Diabetes mellitus",
          "Hipoglucemia"
        ],
        "correcta": 2,
        "explicacion": "Una HbA1c mayor o igual a 6.5 por ciento cumple criterio diagnostico de diabetes mellitus.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      }
    ]
  },
  "m6-tp-sistemas-corporales": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Termorregulacion",
        "definicion": "Control de la temperatura corporal mediante sudoracion y vasomotricidad.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      }
    ],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Cual region de la columna soporta el mayor peso corporal?",
        "opciones": [
          "Cervical",
          "Toracica",
          "Lumbar",
          "Coccix"
        ],
        "correcta": 2,
        "explicacion": "La region lumbar (L1-L5) soporta la mayor carga mecanica, por eso es asiento frecuente de hernias discales y dolor.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      }
    ]
  },
  "m5-que-regla-9s": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Regla de los nueves",
        "definicion": "Metodo para estimar el porcentaje de superficie corporal quemada.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "termino": "AEIOU-TIPS",
        "definicion": "Regla para buscar la causa del estado mental alterado.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "termino": "Regla de los nueves",
        "definicion": "Método para estimar la superficie corporal quemada en el adulto.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "termino": "AEIOU",
        "definicion": "Regla de indicaciones urgentes de dialisis.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "termino": "Regla 4-2-1",
        "definicion": "Calculo de liquidos de mantenimiento por peso en pediatria.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que porcentaje asigna la regla de los nueves a cada pierna?",
        "reverso": "El 18 por ciento.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "frente": "Porcentaje de un brazo en la regla de los nueves",
        "reverso": "9 por ciento.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "frente": "Regla de Rivero-Carvallo",
        "reverso": "Los soplos derechos aumentan con la inspiracion.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      },
      {
        "frente": "En que consiste la regla 4-2-1",
        "reverso": "4 mL/kg/h por los primeros 10 kg, 2 por los siguientes 10 y 1 por cada kg adicional.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "En un adulto con quemaduras en todo el torax anterior y todo un brazo, que porcentaje aproximado de superficie corporal esta afectado?",
        "opciones": [
          "18 por ciento",
          "27 por ciento",
          "36 por ciento",
          "9 por ciento"
        ],
        "correcta": 1,
        "explicacion": "Torax anterior 18 por ciento mas un brazo 9 por ciento suman 27 por ciento segun la regla de los nueves.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "pregunta": "Un paciente tiene pulso carotideo presente pero no se palpa radial ni femoral. La sistolica aproximada es:",
        "opciones": [
          "Mayor a 90 mmHg",
          "Alrededor de 80 mmHg",
          "Alrededor de 70 mmHg",
          "Alrededor de 60 mmHg"
        ],
        "correcta": 3,
        "explicacion": "La regla de campo estima: solo carotideo presente sugiere una sistolica cercana a 60 mmHg, indicio de hipotension grave.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "pregunta": "Cual es la justificacion del concepto de la hora dorada?",
        "opciones": [
          "Es una regla rigida de exactamente 60 minutos",
          "La atencion definitiva temprana mejora el pronostico del trauma grave",
          "Solo aplica a quemaduras",
          "Se refiere al tiempo de descanso del rescatador"
        ],
        "correcta": 1,
        "explicacion": "La hora dorada subraya que entre mas pronto reciba el paciente la atencion definitiva, mejor su pronostico; es un principio, no un cronometro exacto.",
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      },
      {
        "pregunta": "Segun la regla 4-2-1, el mantenimiento por hora de un nino de 22 kg es:",
        "opciones": [
          "22 mL/h",
          "42 mL/h",
          "62 mL/h",
          "88 mL/h"
        ],
        "correcta": 2,
        "explicacion": "40 (primeros 10 kg) mas 20 (siguientes 10 kg) mas 2 (los 2 kg restantes) igual a 62 mL/h.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ]
  },
  "m5-que-grados": {
    "secciones": [
      {
        "titulo": "Extensión: la regla de los nueves",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La superficie corporal quemada (SCQ) se estima con la regla de los nueves en el adulto. Solo se cuentan las quemaduras de segundo grado o más profundas; las de primer grado no se incluyen en el cálculo de líquidos."
          },
          {
            "tipo": "tabla",
            "titulo": "Regla de los nueves (adulto)",
            "headers": [
              "Región",
              "Porcentaje"
            ],
            "filas": [
              [
                "Cabeza y cuello",
                "9 por ciento"
              ],
              [
                "Cada brazo",
                "9 por ciento"
              ],
              [
                "Torax y abdomen anterior",
                "18 por ciento"
              ],
              [
                "Espalda completa",
                "18 por ciento"
              ],
              [
                "Cada pierna",
                "18 por ciento"
              ],
              [
                "Periné",
                "1 por ciento"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "La regla de la palma",
            "texto": "Para quemaduras irregulares o pequeñas, la palma de la mano del paciente (incluidos los dedos) equivale a cerca del 1 por ciento de su superficie corporal. Es útil para estimar parches dispersos."
          }
        ],
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Quemadura de espesor total",
        "definicion": "Quemadura de tercer grado que destruye toda la piel y las terminaciones nerviosas.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "termino": "Hipotermia",
        "definicion": "Temperatura central por debajo de 35 grados.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "termino": "Dexametasona en crup",
        "definicion": "0.6 mg/kg VO/IM/IV; base en todos los grados.",
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Por que la quemadura de tercer grado no duele?",
        "reverso": "Porque destruye las terminaciones nerviosas de la dermis.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "frente": "Que causa el shock por quemadura?",
        "reverso": "La fuga masiva de plasma y agua por la perdida de la barrera cutanea.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "frente": "A que temperatura comienza la hipotermia",
        "reverso": "Por debajo de 35 grados centigrados.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "frente": "¿Cómo se reparte el volumen de Parkland?",
        "reverso": "La mitad en las primeras 8 horas (desde la quemadura) y la otra mitad en las 16 siguientes.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "frente": "¿Por qué la quemadura de tercer grado es indolora?",
        "reverso": "Se destruyen las terminaciones nerviosas de la dermis.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "El bloqueo AV de segundo grado con alargamiento progresivo del PR hasta una P bloqueada se llama:",
        "opciones": [
          "Mobitz II",
          "Mobitz I (Wenckebach)",
          "Bloqueo completo",
          "Bloqueo de primer grado"
        ],
        "correcta": 1,
        "explicacion": "El Mobitz I muestra alargamiento progresivo del PR hasta que una P no conduce; suele ser nodal y benigno.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "pregunta": "Un adulto de 70 kg con 30 por ciento de SCQ. Segun Parkland, el volumen total en 24 horas es:",
        "opciones": [
          "4200 ml",
          "8400 ml",
          "2100 ml",
          "12600 ml"
        ],
        "correcta": 1,
        "explicacion": "4 x 70 x 30 = 8400 ml de Ringer lactato; la mitad (4200 ml) en las primeras 8 horas.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "pregunta": "Una quemadura de aspecto blanco, seco, acartonado e indoloro corresponde a:",
        "opciones": [
          "Primer grado",
          "Segundo grado superficial",
          "Tercer grado (espesor total)",
          "Quemadura solar"
        ],
        "correcta": 2,
        "explicacion": "La quemadura de espesor total destruye las terminaciones nerviosas, por eso es indolora, seca y acartonada.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "pregunta": "En la sospecha de lesión por inhalación con quemaduras faciales y esputo carbonáceo, la conducta es:",
        "opciones": [
          "Esperar a que aparezca estridor",
          "Asegurar la vía aérea de forma temprana",
          "Solo administrar broncodilatadores",
          "Diferir el manejo de la vía aérea"
        ],
        "correcta": 1,
        "explicacion": "El edema progresa con rapidez; asegurar la vía aérea temprano evita una intubación imposible cuando ya hay obstrucción.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "pregunta": "Niño con crup y estridor en reposo. El tratamiento incluye:",
        "opciones": [
          "Solo antibióticos",
          "Dexametasona + adrenalina nebulizada",
          "Salbutamol exclusivamente",
          "Atropina nebulizada"
        ],
        "correcta": 1,
        "explicacion": "Dexametasona en todos los grados y adrenalina nebulizada para el estridor en reposo, con observación por rebote.",
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada"
        }
      }
    ]
  },
  "m2-ao-sentidos": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "PAM",
        "definicion": "Presion arterial media; PAD + (PAS - PAD)/3; refleja la presion de perfusion de organos.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "termino": "Emergencia hipertensiva",
        "definicion": "Presion muy elevada con dano agudo de organo blanco; requiere tratamiento intravenoso.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      },
      {
        "termino": "Preeclampsia",
        "definicion": "Hipertension con dano de organo despues de las 20 semanas de gestacion.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que organo es el termostato del cuerpo?",
        "reverso": "El hipotalamo.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "frente": "Que organo produce la mayoria de los factores de coagulacion?",
        "reverso": "El higado.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "frente": "Que organo se sospecha en dolor del cuadrante inferior derecho",
        "reverso": "El apendice.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "frente": "Color de bolsa para residuos patológicos (tejidos/órganos)",
        "reverso": "Amarilla.",
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual es la PAM de un paciente con TA de 120/60?",
        "opciones": [
          "90 mmHg",
          "80 mmHg",
          "60 mmHg",
          "100 mmHg"
        ],
        "correcta": 1,
        "explicacion": "PAM = 60 + (120 - 60)/3 = 60 + 20 = 80 mmHg, valor adecuado para la perfusion de organos.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      }
    ]
  },
  "m5-la-golpe-calor": {
    "secciones": [
      {
        "titulo": "Emergencias por calor",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El cuerpo disipa calor por radiacion, conduccion, conveccion y evaporacion del sudor. Cuando la produccion o la carga ambiental superan la disipacion, aparece el espectro de las emergencias por calor."
          },
          {
            "tipo": "tabla",
            "titulo": "Espectro de las emergencias por calor",
            "headers": [
              "Cuadro",
              "Caracteristicas",
              "Manejo"
            ],
            "filas": [
              [
                "Calambres por calor",
                "Espasmos musculares dolorosos, sudoracion",
                "Reposo, hidratacion con electrolitos"
              ],
              [
                "Agotamiento por calor",
                "Debilidad, nausea, piel humeda, temperatura normal o leve",
                "Ambiente fresco, hidratacion, reposo"
              ],
              [
                "Golpe de calor",
                "Temperatura mayor a 40 grados, alteracion mental, piel caliente",
                "Enfriamiento agresivo y traslado urgente"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "El golpe de calor es una urgencia vital",
            "texto": "La clave es la alteracion del estado mental con temperatura muy elevada. La piel puede estar seca (clasico) o sudorosa (por esfuerzo). Enfria de inmediato: agua, hielo en axilas e ingles, retira ropa. No retrases el traslado."
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "titulo": "ECG continuo, TA y glucometría",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Parámetros complementarios",
            "items": [
              "ECG continuo: detecta arritmias en tiempo real; las derivaciones de extremidades dan una visión general del ritmo.",
              "TA no invasiva (oscilometría): fiable en presiones medias; pierde exactitud en hipotensión extrema y arritmias.",
              "Glucometría capilar: descartar hipoglucemia en todo paciente con alteración del estado de conciencia.",
              "Temperatura: clave en hipotermia, golpe de calor y sepsis."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Glucosa en todo deterioro neurológico",
            "texto": "La hipoglucemia imita ictus, intoxicación y convulsiones. Ningún paciente con alteración del estado mental debe quedar sin glucometría; corregirla es rápido y revierte el cuadro."
          },
          {
            "tipo": "p",
            "texto": "La toma de TA no invasiva por oscilometría puede sobrestimar presiones bajas y subestimar las altas; en pacientes inestables conviene confirmar con palpación o repetir la medición y correlacionar con el pulso y la perfusión."
          }
        ],
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Golpe de calor",
        "definicion": "Urgencia con temperatura mayor a 40 grados y alteracion mental; requiere enfriamiento agresivo.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Como pierde calor el cuerpo al evaporar sudor?",
        "reverso": "Por evaporacion, uno de los cuatro mecanismos de transferencia de calor.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "frente": "Que distingue al golpe de calor del agotamiento por calor",
        "reverso": "La alteracion del estado mental con temperatura muy elevada.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "frente": "Manejo prioritario del golpe de calor",
        "reverso": "Enfriamiento agresivo inmediato y traslado urgente.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual mecanismo de perdida de calor predomina cuando un paciente esta mojado y expuesto al viento?",
        "opciones": [
          "Radiacion",
          "Conduccion",
          "Conveccion y evaporacion",
          "Solo conduccion"
        ],
        "correcta": 2,
        "explicacion": "El viento aumenta la conveccion y la humedad favorece la evaporacion, una combinacion que acelera la perdida de calor y el riesgo de hipotermia.",
        "procedencia": {
          "temaOriginal": "sistema-tegumentario"
        }
      },
      {
        "pregunta": "Un corredor colapsa con temperatura de 41 grados, confuso y con piel caliente. El diagnostico y manejo son:",
        "opciones": [
          "Agotamiento por calor; hidratar y observar",
          "Golpe de calor; enfriamiento agresivo y traslado urgente",
          "Calambres por calor; estirar el musculo",
          "Deshidratacion leve; reposo"
        ],
        "correcta": 1,
        "explicacion": "Temperatura mayor a 40 grados con alteracion mental es golpe de calor, una urgencia vital que exige enfriamiento agresivo inmediato.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "pregunta": "En un paciente con hipotermia severa que parece sin vida, lo correcto es:",
        "opciones": [
          "Declarar la muerte de inmediato",
          "Iniciar RCP y recalentar; no esta muerto hasta estar caliente y muerto",
          "Recalentar muy rapido con calor directo intenso",
          "Esperar sin intervenir"
        ],
        "correcta": 1,
        "explicacion": "En hipotermia severa el paciente puede ser reanimable; se mantiene la RCP y el recalentamiento, y las decisiones de cese se toman tras recalentar.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      }
    ]
  },
  "m5-tme-esguinces-luxaciones": {
    "secciones": [
      {
        "titulo": "Articulaciones",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Tipos de articulaciones por movilidad",
            "headers": [
              "Tipo",
              "Movilidad",
              "Ejemplo"
            ],
            "filas": [
              [
                "Sinartrosis (fibrosa)",
                "Inmovil",
                "Suturas del craneo"
              ],
              [
                "Anfiartrosis (cartilaginosa)",
                "Semimovil",
                "Discos intervertebrales, sinfisis del pubis"
              ],
              [
                "Diartrosis (sinovial)",
                "Movil",
                "Rodilla, hombro, codo"
              ]
            ]
          },
          {
            "tipo": "p",
            "texto": "Las articulaciones sinoviales tienen cartilago articular, capsula, liquido sinovial lubricante y ligamentos estabilizadores. Una luxacion es la perdida de la congruencia articular; un esguince es la lesion de los ligamentos sin perdida de la relacion articular."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Luxacion",
        "definicion": "Perdida de la congruencia de una articulacion.",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "termino": "Luxacion",
        "definicion": "Perdida de contacto entre las superficies de una articulacion.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      }
    ],
    "flashcards": [],
    "quiz": []
  },
  "m3-ep-via-aerea-cervicales": {
    "secciones": [
      {
        "titulo": "Evaluación primaria XABCDE",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Se atienden las amenazas vitales en orden estricto: lo que mata primero se trata primero. No se avanza a la siguiente letra sin controlar la anterior."
          },
          {
            "tipo": "tabla",
            "headers": [
              "Letra",
              "Significado",
              "Acción clave"
            ],
            "filas": [
              [
                "X",
                "Hemorragia exsanguinante",
                "Control inmediato: presión directa, torniquete, empaquetamiento."
              ],
              [
                "A",
                "Vía aérea con control cervical",
                "Permeabilizar y proteger la columna cervical."
              ],
              [
                "B",
                "Ventilación (Breathing)",
                "Evaluar frecuencia, simetría, SpO₂; oxigenar, descomprimir neumotórax a tensión."
              ],
              [
                "C",
                "Circulación",
                "Pulsos, llenado capilar, control de hemorragia, accesos y fluidos."
              ],
              [
                "D",
                "Déficit neurológico",
                "Escala de Glasgow, pupilas, glucemia."
              ],
              [
                "E",
                "Exposición / control térmico",
                "Exponer para hallar lesiones y prevenir la hipotermia."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "La \"X\" va primero",
            "texto": "En trauma con hemorragia masiva, el control del sangrado exsanguinante precede incluso a la vía aérea: un paciente puede desangrarse en minutos. El torniquete colocado a tiempo es una de las intervenciones con mayor impacto en mortalidad."
          }
        ],
        "procedencia": {
          "temaOriginal": "evaluacion-integral"
        }
      },
      {
        "titulo": "Vía aérea en trauma maxilofacial masivo",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El trauma maxilofacial severo amenaza la vía aérea por sangrado, edema, dientes y fragmentos óseos y pérdida del soporte anatómico. Las medidas conservadoras buscan mantener la permeabilidad mientras se prepara el manejo definitivo."
          },
          {
            "tipo": "pasos",
            "titulo": "Medidas conservadoras",
            "items": [
              "Aspiración continua de sangre y secreciones.",
              "Posición que favorezca el drenaje (si no hay sospecha de lesión espinal que lo impida).",
              "Maniobras manuales (tracción mandibular) evitando movilizar la columna cervical.",
              "Cánulas básicas según tolerancia; la nasofaríngea está contraindicada si se sospecha fractura de base de cráneo.",
              "Anticipar la necesidad de vía aérea quirúrgica si la obstrucción es insalvable."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica"
        }
      },
      {
        "titulo": "Vía aérea difícil: LEMON y HOP",
        "bloques": [
          {
            "tipo": "tabla",
            "headers": [
              "LEMON (anatómicamente difícil)",
              "Significado"
            ],
            "filas": [
              [
                "L — Look",
                "Inspección externa: trauma, obesidad, cuello corto, barba."
              ],
              [
                "E — Evaluate 3-3-2",
                "Apertura bucal 3 dedos, mentón-hioides 3, hioides-cartílago tiroides 2."
              ],
              [
                "M — Mallampati",
                "Visibilidad de estructuras orofaríngeas (clases I-IV)."
              ],
              [
                "O — Obstruction/Obesity",
                "Masas, edema, epiglotitis, obesidad."
              ],
              [
                "N — Neck mobility",
                "Movilidad cervical (limitada en collarín o artritis)."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "HOP — la vía aérea fisiológicamente difícil",
            "texto": "Aunque la anatomía sea fácil, el paciente puede deteriorarse al intubar por su fisiología: Hipotensión (la inducción y la presión positiva colapsan el gasto cardíaco → \"intubación que mata\"), Oxigenación límite (desatura en segundos), pH/acidosis (la apnea elimina la compensación respiratoria). Hay que optimizar HOP ANTES de inducir."
          }
        ],
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "titulo": "Causas reversibles: las H y las T",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Las cinco H y las cinco T",
            "headers": [
              "Las H",
              "Las T"
            ],
            "filas": [
              [
                "Hipovolemia",
                "Neumotórax a Tensión"
              ],
              [
                "Hipoxia",
                "Taponamiento cardíaco"
              ],
              [
                "Hidrogeniones (acidosis)",
                "Toxinas (fármacos)"
              ],
              [
                "Hipo/Hiperpotasemia",
                "Trombosis pulmonar (TEP)"
              ],
              [
                "Hipotermia",
                "Trombosis coronaria (IAM)"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Intervenciones dirigidas",
            "items": [
              "Hipovolemia: cargas de cristaloide; control de hemorragia y sangre si está disponible.",
              "Hipoxia: oxigenación y ventilación efectivas, confirmar vía aérea.",
              "Hiperpotasemia: gluconato de calcio, bicarbonato e insulina con glucosa.",
              "Neumotórax a tensión: descompresión con aguja seguida de toracostomía.",
              "Taponamiento: pericardiocentesis o toracotomía segun el entorno.",
              "Toxinas: antídotos especificos (bicarbonato en tricíclicos, lípidos en anestésicos locales).",
              "Trombosis pulmonar masiva: considerar fibrinolisis durante la RCP."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "El ultrasonido a pie de cama",
            "texto": "En manos entrenadas, la ecografía durante las pausas de análisis del ritmo ayuda a distinguir causas reversibles: taponamiento, neumotórax, hipovolemia, dilatación del ventrículo derecho por TEP, y diferencia la AESP verdadera de la pseudo-AESP con contractilidad residual."
          }
        ],
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "titulo": "Pancreatitis aguda",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La pancreatitis aguda es la inflamacion del pancreas por autodigestion enzimatica. Sus dos causas mas frecuentes son la litiasis biliar y el alcohol. Se presenta con dolor epigastrico intenso que irradia a la espalda, nauseas y vomito."
          },
          {
            "tipo": "lista",
            "titulo": "Diagnostico (dos de tres criterios)",
            "items": [
              "Dolor abdominal caracteristico (epigastrico irradiado a la espalda).",
              "Lipasa o amilasa mayor a tres veces el limite superior normal.",
              "Hallazgos de imagen compatibles (tomografia, ultrasonido)."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Manejo de la pancreatitis",
            "texto": "El pilar es la reanimacion con liquidos intravenosos, el control del dolor y el ayuno inicial seguido de reinicio temprano de la via oral segun tolerancia. Los antibioticos no son rutinarios; se reservan para necrosis infectada. La pancreatitis biliar requiere atender la litiasis."
          },
          {
            "tipo": "lista",
            "titulo": "Datos de gravedad",
            "items": [
              "Falla organica persistente.",
              "Necrosis pancreatica.",
              "Hipocalcemia, hemoconcentracion, elevacion marcada de azoados.",
              "Escalas como Ranson o APACHE II ayudan a estimar el pronostico."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      },
      {
        "titulo": "Fármacos de pretratamiento",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Qué se usa y por qué",
            "items": [
              "Fentanilo 1-3 mcg/kg ~3 min antes: atenúa la descarga simpática de la laringoscopia (útil en disección aórtica, hemorragia subaracnoidea, cardiopatía isquémica).",
              "Lidocaína 1.5 mg/kg: histórica para atenuar la respuesta en TCE y vía aérea reactiva; la evidencia actual es débil y ya no se recomienda de rutina.",
              "Atropina 0.02 mg/kg en pediatría: prevención de bradicardia vagal por laringoscopia/succinilcolina; hoy es selectiva, no universal."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Menos es más",
            "texto": "El único pretratamiento con respaldo razonable es el fentanilo en el paciente en quien una crisis hipertensiva transitoria sea peligrosa. La lidocaína y la atropina sistemáticas han caído en desuso."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      },
      {
        "titulo": "Fuentes y evidencia",
        "bloques": [
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "REBEL EM — The RSI Trial: Ketamina vs. Etomidato",
                "url": "https://rebelem.com/the-rsi-trial-ketamine-vs-etomidate-in-rapid-sequence-intubation/"
              },
              {
                "nombre": "REBEL EM — Dosing Sedatives Low and Paralytics High in Shock",
                "url": "https://rebelem.com/dosing-sedatives-low-and-paralytics-high-in-shock-patients-requiring-rsi/"
              },
              {
                "nombre": "EMCrit (IBCC) — Therapeutic paralysis",
                "url": "https://emcrit.org/ibcc/paralysis/"
              },
              {
                "nombre": "ALiEM — Succinylcholine and the Risk of Hyperkalemia",
                "url": "https://www.aliem.com/succinylcholine-risk-hyperkalemia/"
              },
              {
                "nombre": "The Walls — Manual de Manejo de la Vía Aérea de Urgencia",
                "nota": "Referencia de SRI/SDA"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      },
      {
        "titulo": "Taquiarritmias",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Antiarrítmicos en taquicardia con pulso",
            "headers": [
              "Fármaco",
              "Dosis",
              "Indicación"
            ],
            "filas": [
              [
                "Adenosina",
                "6 mg IV rápido, luego 12 mg, luego 12 mg",
                "TSV regular de complejo estrecho"
              ],
              [
                "Amiodarona",
                "150 mg en 10 min (estable); 300 mg IV/IO en paro",
                "TV con pulso, FV/TV sin pulso"
              ],
              [
                "Sulfato de magnesio",
                "1-2 g IV",
                "Torsades de Pointes (TV polimorfa con QT largo)"
              ],
              [
                "Diltiazem",
                "0.25 mg/kg IV (~15-20 mg) en 2 min",
                "Control de frecuencia en FA/flutter"
              ],
              [
                "Verapamilo",
                "2.5-5 mg IV",
                "Alternativa para control de frecuencia"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "Adenosina: técnica antes que dosis",
            "texto": "Vida media de segundos: adminístrela por la vía más proximal con bolo rápido seguido de flush de 20 mL y elevación del brazo. Avise al paciente de la sensación transitoria de \"pausa\". Útil además como maniobra diagnóstica en la taquicardia regular de complejo estrecho."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "No bloquees el nodo en la FA preexcitada",
            "texto": "En una taquicardia irregular de complejo ANCHO (sospecha de FA con WPW), los bloqueadores del nodo AV (adenosina, diltiazem, verapamilo, digoxina, betabloqueadores) pueden acelerar la conducción por la vía accesoria y degenerar en FV. Trate con cardioversión o amiodarona/procainamida. Inestable = cardioversión sincronizada."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Algoritmo de taquicardia con pulso de la AHA",
            "caption": "Algoritmo de taquicardia con pulso (AHA/ACLS): estable vs. inestable, complejo estrecho vs. ancho.",
            "busqueda": "ACLS adult tachycardia with pulse algorithm 2020"
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada"
        }
      },
      {
        "titulo": "Crup y edema de la vía aérea superior",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El crup (laringotraqueítis) produce estridor inspiratorio y tos perruna por edema subglótico. La dexametasona es la base en todos los grados; la adrenalina nebulizada se reserva para el estridor en reposo (moderado-grave) por su efecto α vasoconstrictor que reduce el edema mucoso."
          },
          {
            "tipo": "tabla",
            "titulo": "Fármacos en el crup",
            "headers": [
              "Fármaco",
              "Dosis",
              "Notas"
            ],
            "filas": [
              [
                "Dexametasona",
                "0.6 mg/kg VO/IM/IV (máx 12 mg)",
                "Base en todos los grados; igual de eficaz por las 3 vías"
              ],
              [
                "Adrenalina racémica 2.25%",
                "0.5 mL en 2.5-3 mL de salino, nebulizada",
                "Estridor en reposo"
              ],
              [
                "Adrenalina L (1 mg/mL)",
                "5 mL nebulizados (alternativa a la racémica)",
                "Misma eficacia si no hay racémica"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Vigila el rebote tras la adrenalina nebulizada",
            "texto": "El efecto de la adrenalina nebulizada dura 1-2 h y puede haber rebote del edema al pasar; por eso siempre se acompaña de dexametasona y se observa al niño. La dexametasona tarda unas horas en actuar pero su efecto es duradero."
          },
          {
            "tipo": "imagen",
            "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Croup_steeple_sign.jpg?width=720",
            "alt": "Signo del campanario en el crup",
            "caption": "Radiografía de cuello: estrechamiento subglótico (\"signo del campanario\") típico del crup.",
            "fuente": "Wikimedia Commons",
            "fuenteUrl": "https://commons.wikimedia.org/wiki/File:Croup_steeple_sign.jpg",
            "busqueda": "croup steeple sign subglottic narrowing radiograph pediatric"
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada"
        }
      },
      {
        "titulo": "Traslado de pacientes infectocontagiosos",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Precauciones esenciales",
            "items": [
              "Equipo de protección personal según la vía de transmisión (contacto, gotas, aérea).",
              "Mascarilla al paciente cuando la transmisión es por gotas o aérea; aislar al personal no esencial.",
              "Ventilación de la unidad y desinfección posterior según protocolo.",
              "Notificación al hospital receptor para que prepare el aislamiento antes del arribo."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "La protección del equipo es parte de la atención",
            "texto": "Un rescatador enfermo es un recurso menos. El uso correcto del EPP, la higiene de manos y la descontaminación de la unidad no son opcionales: son parte del estándar de cuidado."
          }
        ],
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Hipofisis",
        "definicion": "Glandula maestra que regula otras glandulas bajo el control del hipotalamo.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "termino": "XABCDE",
        "definicion": "Secuencia de evaluación primaria: hemorragia, vía aérea, ventilación, circulación, déficit, exposición.",
        "procedencia": {
          "temaOriginal": "evaluacion-integral"
        }
      },
      {
        "termino": "Estridor",
        "definicion": "Ruido de obstrucción de vía aérea superior; emergencia inmediata.",
        "procedencia": {
          "temaOriginal": "evaluacion-integral"
        }
      },
      {
        "termino": "Glasgow menor o igual a 8",
        "definicion": "Umbral de via aerea no protegida; considerar intubacion.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "termino": "Posición de olfateo",
        "definicion": "Alineación de los ejes de la vía aérea con leve extensión cervical para facilitar la inserción.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      },
      {
        "termino": "LEMON",
        "definicion": "Nemotecnia de vía aérea anatómicamente difícil.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "termino": "HOP",
        "definicion": "Vía aérea fisiológicamente difícil: Hipotensión, Oxigenación, pH.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "termino": "Reanimación hipotensiva",
        "definicion": "Presión permisiva hasta el control quirúrgico para no desprender el coágulo.",
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "termino": "Control de daños",
        "definicion": "Estrategia de hipotensión permisiva, transfusión balanceada y TXA temprano.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "termino": "Lesión por inhalación",
        "definicion": "Daño de la vía aérea por humo; obliga a asegurar la vía de forma temprana.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "termino": "SRI",
        "definicion": "Inductor + bloqueador neuromuscular casi simultáneos para intubar minimizando aspiración.",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda",
          "porUnidad": true
        }
      },
      {
        "termino": "Rocuronio 1.2 mg/kg",
        "definicion": "Alternativa segura sin hiperkalemia; inicio rápido, duración larga.",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda",
          "porUnidad": true
        }
      },
      {
        "termino": "MARCH",
        "definicion": "Hemorragia masiva, vía Aérea, Respiración, Circulación, cabeza/Hipotermia.",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cuantas vertebras cervicales hay?",
        "reverso": "Siete (C1 a C7).",
        "procedencia": {
          "temaOriginal": "sistema-musculoesqueletico"
        }
      },
      {
        "frente": "Que estructura protege la via aerea al deglutir?",
        "reverso": "La epiglotis.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "frente": "¿Qué representa la \"X\" en XABCDE y por qué va primero?",
        "reverso": "Hemorragia exsanguinante; puede matar en minutos, antes que un problema de vía aérea.",
        "procedencia": {
          "temaOriginal": "evaluacion-integral"
        }
      },
      {
        "frente": "Glasgow que indica via aerea no protegida",
        "reverso": "8 o menos.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "frente": "Las dos unicas acciones durante el triage START",
        "reverso": "Abrir la via aerea y controlar hemorragia masiva.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "frente": "Glasgow que indica via aerea no protegida",
        "reverso": "8 o menos.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "frente": "¿Qué significa \"lavado de nitrógeno\" en la preoxigenación?",
        "reverso": "Reemplazar el N₂ alveolar por O₂ al 100% para crear reserva y prolongar la apnea segura.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva",
          "porUnidad": true
        }
      },
      {
        "frente": "¿Qué evalúa la \"HOP\" antes de intubar?",
        "reverso": "La dificultad FISIOLÓGICA: Hipotensión, Oxigenación, pH/acidosis.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva",
          "porUnidad": true
        }
      },
      {
        "frente": "Contraindicación clave de la VMNI",
        "reverso": "Paro respiratorio o incapacidad para proteger la vía aérea.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "El segundo ruido cardiaco (S2) corresponde a:",
        "opciones": [
          "Cierre de valvulas AV",
          "Apertura de valvulas semilunares",
          "Cierre de valvulas semilunares (aortica y pulmonar)",
          "Contraccion auricular"
        ],
        "correcta": 2,
        "explicacion": "El S2 se produce por el cierre de las valvulas semilunares al inicio de la diastole; el S1 corresponde al cierre de las valvulas AV.",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "pregunta": "Que intervencion NO debe retrasar el traslado de un paciente de trauma critico?",
        "opciones": [
          "Control de hemorragia exsanguinante",
          "Permeabilizar via aerea obstruida",
          "Inmovilizacion meticulosa de una fractura de dedo",
          "Descompresion de neumotorax a tension"
        ],
        "correcta": 2,
        "explicacion": "Las intervenciones que no salvan la vida, como inmovilizar una fractura menor, se realizan en camino y no deben demorar el traslado.",
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      },
      {
        "pregunta": "Durante el triage START, un paciente no respira. Tras abrir la via aerea sigue sin respirar. Se clasifica como:",
        "opciones": [
          "Rojo",
          "Amarillo",
          "Negro",
          "Verde"
        ],
        "correcta": 2,
        "explicacion": "Si tras la maniobra de apertura de via aerea el adulto no respira, se etiqueta como negro; en START no se inicia RCP durante el triage.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "pregunta": "La \"H\" de la regla HOP en vía aérea fisiológicamente difícil se refiere a:",
        "opciones": [
          "Hipertermia",
          "Hipotensión",
          "Hemorragia",
          "Hipoglucemia"
        ],
        "correcta": 1,
        "explicacion": "HOP = Hipotensión, Oxigenación, pH. La hipotensión puede provocar colapso hemodinámico al inducir.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "pregunta": "Cual NO es parte del manejo estandar de la pancreatitis aguda no complicada:",
        "opciones": [
          "Reanimacion con liquidos",
          "Control del dolor",
          "Antibioticos de rutina",
          "Reinicio temprano de la via oral segun tolerancia"
        ],
        "correcta": 2,
        "explicacion": "Los antibioticos no son rutinarios en la pancreatitis; se reservan para la necrosis infectada documentada.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      }
    ]
  },
  "m4-far-infusiones-aminas": {
    "secciones": [
      {
        "titulo": "La sinapsis",
        "bloques": [
          {
            "tipo": "p",
            "texto": "En la sinapsis quimica, el potencial de accion llega al boton terminal, entra calcio y se liberan neurotransmisores que cruzan la hendidura sinaptica para unirse a receptores postsinapticos. La senal puede ser excitatoria o inhibitoria segun el neurotransmisor y el receptor."
          },
          {
            "tipo": "tabla",
            "titulo": "Neurotransmisores principales",
            "headers": [
              "Neurotransmisor",
              "Efecto general",
              "Relevancia"
            ],
            "filas": [
              [
                "Acetilcolina",
                "Excitatorio en musculo",
                "Union neuromuscular y parasimpatico"
              ],
              [
                "Noradrenalina",
                "Excitatorio",
                "Respuesta simpatica de lucha o huida"
              ],
              [
                "Dopamina",
                "Modulador",
                "Movimiento y recompensa (Parkinson)"
              ],
              [
                "GABA",
                "Inhibitorio",
                "Principal freno del SNC"
              ],
              [
                "Glutamato",
                "Excitatorio",
                "Principal excitador del SNC"
              ],
              [
                "Serotonina",
                "Modulador",
                "Estado de animo y sueno"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Intoxicacion por organofosforados",
            "texto": "Los organofosforados inhiben la acetilcolinesterasa y la acetilcolina se acumula, causando el sindrome colinergico: salivacion, lagrimeo, miccion, bradicardia y broncorrea. El antidoto es la atropina."
          }
        ],
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "titulo": "Tiroides y suprarrenales",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La tiroides produce T3 y T4, que regulan el metabolismo basal, y calcitonina, que baja el calcio. El hipertiroidismo acelera el cuerpo (taquicardia, perdida de peso); el hipotiroidismo lo enlentece. Las paratiroides regulan el calcio mediante la hormona paratiroidea."
          },
          {
            "tipo": "tabla",
            "titulo": "Glandulas suprarrenales",
            "headers": [
              "Zona",
              "Hormona",
              "Funcion"
            ],
            "filas": [
              [
                "Corteza (glomerular)",
                "Aldosterona",
                "Retiene sodio y agua"
              ],
              [
                "Corteza (fascicular)",
                "Cortisol",
                "Respuesta al estres, glucemia, antiinflamatorio"
              ],
              [
                "Corteza (reticular)",
                "Androgenos",
                "Hormonas sexuales"
              ],
              [
                "Medula",
                "Adrenalina y noradrenalina",
                "Respuesta de lucha o huida"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Crisis suprarrenal",
            "texto": "La falta de cortisol (insuficiencia suprarrenal) provoca hipotension que no responde a liquidos ni vasopresores, hipoglucemia y debilidad. Es una urgencia que requiere corticoides intravenosos."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "titulo": "Bradicardias",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La bradicardia se define por una frecuencia menor a 50 latidos por minuto. Solo requiere tratamiento si es sintomática por bajo gasto. Las causas incluyen disfunción del nodo sinusal, bloqueos auriculoventriculares, isquemia, hiperpotasemia, hipotermia y fármacos como betabloqueadores y calcioantagonistas."
          },
          {
            "tipo": "pasos",
            "titulo": "Algoritmo de la bradicardia sintomática",
            "items": [
              "Asegurar vía aérea, oxígeno si hay hipoxemia y monitorización con acceso IV.",
              "Atropina 1 mg IV en bolo; repetir cada 3 a 5 minutos hasta un máximo de 3 mg.",
              "Si la atropina falla: marcapasos transcutáneo o infusión de adrenalina (2 a 10 mcg/min) o dopamina (5 a 20 mcg/kg/min).",
              "Tratar la causa subyacente (hiperpotasemia, intoxicación, isquemia).",
              "Preparar marcapasos transvenoso o traslado a hemodinamia segun el caso."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Atropina y bloqueo de alto grado",
            "texto": "En el bloqueo AV de segundo grado Mobitz II y en el bloqueo completo, la atropina suele ser ineficaz porque el problema está por debajo del nodo AV; no demore el marcapasos transcutáneo esperando una respuesta a la atropina."
          },
          {
            "tipo": "tabla",
            "titulo": "Bloqueos auriculoventriculares",
            "headers": [
              "Tipo",
              "Hallazgo en ECG"
            ],
            "filas": [
              [
                "Primer grado",
                "PR prolongado constante mayor a 0.20 s."
              ],
              [
                "Segundo grado Mobitz I",
                "PR se alarga progresivamente hasta una P bloqueada (Wenckebach)."
              ],
              [
                "Segundo grado Mobitz II",
                "P bloqueadas súbitas con PR constante; riesgo de progresión."
              ],
              [
                "Tercer grado (completo)",
                "Disociación AV total entre P y QRS."
              ]
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "titulo": "Vasopresores e inotrópicos",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Agentes vasoactivos",
            "headers": [
              "Fármaco",
              "Acción y uso"
            ],
            "filas": [
              [
                "Noradrenalina",
                "Alfa potente, beta leve; vasopresor de primera línea en séptico."
              ],
              [
                "Adrenalina",
                "Alfa y beta; anafilaxia, séptico refractario, bradicardia."
              ],
              [
                "Dopamina",
                "Dosis dependiente; segunda línea, más arritmogénica."
              ],
              [
                "Dobutamina",
                "Inotrópico beta; mejora contractilidad en cardiogénico."
              ],
              [
                "Vasopresina",
                "Vasoconstrictor no adrenérgico; adyuvante en séptico."
              ],
              [
                "Fenilefrina",
                "Alfa puro; útil cuando se quiere evitar taquicardia."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Vasopresor versus inotrópico",
            "texto": "Un vasopresor aumenta la resistencia vascular (la presión) y un inotrópico aumenta la contractilidad (el gasto). El shock distributivo necesita vasopresores; el cardiogénico con presión limítrofe puede requerir un inotrópico como la dobutamina, a veces combinado."
          },
          {
            "tipo": "lista",
            "titulo": "Reglas de seguridad",
            "items": [
              "Los vasopresores idealmente por vía central; por vía periférica solo de forma transitoria y vigilada.",
              "Optimizar la precarga con líquidos antes de iniciar vasopresores en el hipovolémico.",
              "En el cardiogénico, las cargas agresivas de líquido empeoran la congestión.",
              "Titular siempre a metas de perfusión, no solo a un número de presión."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "titulo": "Receptores adrenérgicos",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El sistema simpático (\"lucha o huida\") actúa a través de noradrenalina y adrenalina sobre cinco familias de receptores. Conocer dónde está cada uno y qué hace al activarse es lo que permite elegir el vasopresor o el broncodilatador correcto."
          },
          {
            "tipo": "diagrama",
            "clave": "receptores",
            "titulo": "Mapa de receptores adrenérgicos",
            "descripcion": "Localización y efecto de α1, α2, β1, β2 y dopaminérgicos."
          },
          {
            "tipo": "tabla",
            "titulo": "Receptor → efecto → fármaco que lo aprovecha",
            "headers": [
              "Receptor",
              "Efecto principal",
              "Fármaco representativo"
            ],
            "filas": [
              [
                "α1",
                "Vasoconstricción (↑ RVS, ↑ PA), midriasis",
                "Fenilefrina, noradrenalina"
              ],
              [
                "α2",
                "Presináptico: ↓ liberación de noradrenalina; central: sedación, ↓ simpático",
                "Clonidina, dexmedetomidina"
              ],
              [
                "β1",
                "↑ frecuencia, ↑ contractilidad, ↑ conducción AV",
                "Dobutamina, adrenalina, dopamina"
              ],
              [
                "β2",
                "Broncodilatación, vasodilatación, relajación uterina",
                "Salbutamol, terbutalina"
              ],
              [
                "Dopaminérgico (D1)",
                "Vasodilatación renal/mesentérica (dosis baja)",
                "Dopamina a dosis baja"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Adrenalina: el efecto cambia con la dosis",
            "texto": "A dosis baja predomina β (inotropía, broncodilatación, incluso ligera vasodilatación β2); a dosis alta domina α1 (vasoconstricción intensa). Por eso la misma molécula sirve para la anafilaxia (IM), el paro (IV en bolo) y el shock (infusión titulada): cambia el receptor que \"gana\" según la concentración."
          }
        ],
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "titulo": "Farmacocinética útil en la calle",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La farmacocinética es lo que el cuerpo hace al fármaco (absorción, distribución, metabolismo, excreción). En prehospitalario lo que más cambia el efecto es la vía y la perfusión: un paciente en shock absorbe mal por vía IM/SC y redistribuye distinto."
          },
          {
            "tipo": "tabla",
            "titulo": "Vías de administración en urgencias",
            "headers": [
              "Vía",
              "Inicio",
              "Cuándo usarla"
            ],
            "filas": [
              [
                "IV",
                "Segundos",
                "Estándar de oro si hay acceso"
              ],
              [
                "IO (intraósea)",
                "Casi igual que IV",
                "Acceso fallido; dosis y fármacos equivalentes a IV"
              ],
              [
                "IM",
                "5-20 min (variable con perfusión)",
                "Adrenalina en anafilaxia, midazolam en crisis"
              ],
              [
                "IN (intranasal)",
                "5-10 min",
                "Naloxona, midazolam, fentanilo sin acceso"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "La intraósea NO es una vía de segunda",
            "texto": "Por vía IO se pueden dar prácticamente todos los fármacos de reanimación a la misma dosis que IV, incluidos vasopresores, sedantes y bloqueadores neuromusculares. Lavar con bolo (flush) tras cada fármaco para empujarlo a la circulación central."
          }
        ],
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "titulo": "Vasopresores en infusión continua",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Infusiones de primera línea",
            "headers": [
              "Fármaco",
              "Dosis típica",
              "Receptores",
              "Indicación principal"
            ],
            "filas": [
              [
                "Noradrenalina",
                "0.05-0.5 mcg/kg/min",
                "α1 >> β1",
                "Shock séptico/distributivo (1.ª elección)"
              ],
              [
                "Adrenalina",
                "0.01-0.5 mcg/kg/min",
                "β y α (dosis-dependiente)",
                "Anafilaxia, shock refractario, cardiogénico"
              ],
              [
                "Vasopresina",
                "0.03-0.04 U/min (fija)",
                "Receptores V1",
                "Ahorrador de catecolaminas en sepsis"
              ],
              [
                "Fenilefrina",
                "0.5-2 mcg/kg/min",
                "α1 puro",
                "Hipotensión con taquicardia; bolo peri-intubación"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "Noradrenalina: el caballo de batalla",
            "texto": "Es el vasopresor de primera línea en el shock séptico y la mayoría de los distributivos. Si no basta, se añade adrenalina o se suma vasopresina a dosis fija para \"ahorrar\" catecolaminas. Idealmente por vía central, pero puede iniciarse por una buena vía periférica o IO mientras se consigue acceso central."
          }
        ],
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      },
      {
        "titulo": "Inotrópicos positivos",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Inotrópicos",
            "headers": [
              "Fármaco",
              "Dosis",
              "Efecto",
              "Riesgo"
            ],
            "filas": [
              [
                "Dobutamina",
                "2-20 mcg/kg/min",
                "β1: ↑ contractilidad y gasto",
                "Puede BAJAR la PA (vasodilatación β2)"
              ],
              [
                "Dopamina",
                "2-20 mcg/kg/min",
                "Dosis baja β, alta α",
                "Arritmogénica; más mortalidad que noradrenalina en shock"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "La dopamina perdió terreno",
            "texto": "En el shock, la dopamina se asocia a más arritmias y mayor mortalidad que la noradrenalina, por lo que ha dejado de ser primera elección. Conserva un papel como infusión de puente en la bradicardia sintomática (5-20 mcg/kg/min) hasta el marcapasos. La dobutamina mejora el gasto pero puede hipotensar: vigílela."
          }
        ],
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      },
      {
        "titulo": "Vasopresores en dosis de empuje (push-dose)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El push-dose pressor es un bolo pequeño y titulable de vasopresor para rescatar la hipotensión transitoria (peri-intubación, post-RCP, puente mientras arranca la infusión). El más usado es la fenilefrina; la adrenalina diluida a 10 mcg/mL es la otra opción."
          },
          {
            "tipo": "pasos",
            "titulo": "Preparar adrenalina push-dose (10 mcg/mL)",
            "items": [
              "Tome 1 mL de adrenalina 100 mcg/mL (la jeringa precargada \"de paro\", 1:10 000).",
              "Mézclela en 9 mL de solución salina en una jeringa de 10 mL.",
              "Resultado: 10 mL a 10 mcg/mL.",
              "Dosis: 0.5-2 mL (5-20 mcg) IV cada 2-5 min, titulando a la respuesta. Inicio ~1 min, duración 5-10 min."
            ]
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "Fenilefrina push-dose",
            "texto": "Diluya para obtener 100 mcg/mL y administre 50-200 mcg (0.5-2 mL) cada 2-5 min. α1 puro: ideal cuando hay hipotensión CON taquicardia y no quiere acelerar más al corazón."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "El error de dilución mata",
            "texto": "Confundir concentraciones de adrenalina (1 mg/mL \"IM\" vs. 100 mcg/mL \"de paro\" vs. 10 mcg/mL \"push-dose\") ha causado sobredosis graves. Rotule la jeringa, calcule en voz alta y confirme con un segundo operador."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Preparación de adrenalina push-dose 10 mcg/mL",
            "caption": "Esquema de preparación de la adrenalina en dosis de empuje (10 mcg/mL) y la matriz de actividad por receptor de cada vasopresor.",
            "busqueda": "push dose epinephrine preparation 10 mcg/ml vasopressor receptor activity chart"
          }
        ],
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      },
      {
        "titulo": "Bradiarritmias",
        "bloques": [
          {
            "tipo": "pasos",
            "titulo": "Bradicardia sintomática: escalera",
            "items": [
              "Atropina 0.5 mg IV cada 3-5 min, máximo 3 mg.",
              "Si no responde: marcapasos transcutáneo Y/O infusión cronotrópica.",
              "Adrenalina en infusión 2-10 mcg/min, o dopamina 5-20 mcg/kg/min como puente.",
              "Buscar y tratar la causa (hiperkalemia, isquemia, fármacos, hipoxia)."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Cuándo la atropina no sirve",
            "texto": "La atropina actúa sobre el tono vagal; es poco útil en bloqueos AV de alto grado (Mobitz II o completo) con escape ancho, donde el problema está por debajo del nodo. Ahí, no se demore: marcapasos transcutáneo o infusión de catecolaminas. En el trasplantado cardíaco (denervado) tampoco funciona."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Algoritmo de bradicardia de la AHA",
            "caption": "Algoritmo de bradicardia con pulso (AHA/ACLS).",
            "busqueda": "ACLS adult bradycardia algorithm 2020 atropine pacing"
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada"
        }
      },
      {
        "titulo": "Asma y EPOC casi-fatal",
        "bloques": [
          {
            "tipo": "p",
            "texto": "En la crisis grave, la base son los β2-agonistas inhalados (salbutamol) + anticolinérgico (ipratropio) + corticoide sistémico temprano. Si el paciente se deteriora pese a ello (asma casi-fatal: silencio auscultatorio, agotamiento, alteración del estado mental), se escala a la segunda línea."
          },
          {
            "tipo": "pasos",
            "titulo": "Escalón del broncoespasmo grave",
            "items": [
              "Salbutamol continuo + ipratropio nebulizados, O₂ y corticoide sistémico (metilprednisolona/hidrocortisona o dexametasona).",
              "Sulfato de magnesio IV 2 g (40 mg/kg en niños, máx 2 g) en 15-20 min.",
              "Adrenalina IM 0.3-0.5 mg (0.01 mg/kg en niños) si hay broncoespasmo casi-fatal o sospecha de anafilaxia.",
              "Terbutalina SC/IV o adrenalina en infusión en el refractario; considerar VNI; intubar solo si fracasa todo (alto riesgo)."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Segunda línea en el asma grave",
            "headers": [
              "Fármaco",
              "Dosis",
              "Mecanismo"
            ],
            "filas": [
              [
                "Sulfato de magnesio",
                "2 g IV en 15-20 min",
                "Relaja el músculo liso bronquial"
              ],
              [
                "Adrenalina",
                "0.3-0.5 mg IM (1 mg/mL)",
                "β2 broncodilatador + α (reduce edema)"
              ],
              [
                "Terbutalina",
                "0.25 mg SC; o 10 mcg/kg IV + 0.4 mcg/kg/min",
                "β2 sistémico"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Intubar al asmático es de altísimo riesgo",
            "texto": "La obstrucción espiratoria atrapa aire (auto-PEEP) y puede causar hipotensión y barotrauma al ventilar. Si es inevitable: ketamina como inductor (broncodilata), frecuencia baja, tiempo espiratorio largo (I:E 1:4-1:5), tolerar hipercapnia permisiva y vigilar el neumotórax. Ante hipotensión súbita tras intubar: desconectar y dejar exhalar."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada"
        }
      },
      {
        "titulo": "Calcioantagonistas y betabloqueadores",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Ambas intoxicaciones causan bradicardia e hipotensión, pero los calcioantagonistas (verapamilo, diltiazem) suelen cursar con hiperglucemia (bloquean la liberación de insulina) y los betabloqueadores con glucemia normal o baja. El tratamiento se solapa y escala por pasos."
          },
          {
            "tipo": "pasos",
            "titulo": "Escalón terapéutico",
            "items": [
              "Soporte: líquidos, atropina para la bradicardia, monitor.",
              "Calcio IV (cloruro de calcio 1-3 g o gluconato equivalente), sobre todo en calcioantagonistas.",
              "Glucagón 3-10 mg IV en bolo, seguido de infusión: estimula el AMPc sin pasar por el receptor β (útil en betabloqueo).",
              "HIET (insulina a altas dosis con euglucemia): insulina 1 U/kg en bolo y luego 1-10 U/kg/h con dextrosa, vigilando glucemia y potasio.",
              "Refractario: vasopresores, marcapasos, lípidos IV o ECMO según recursos."
            ]
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "HIET: el inotrópico del corazón intoxicado",
            "texto": "La insulina a altas dosis mejora la contractilidad del miocardio intoxicado (que cambia su metabolismo a glucosa) y la acidosis. Requiere infusión de dextrosa y vigilancia estrecha de glucosa y potasio. Es una terapia de rescate clave en el betabloqueo y el calcioantagonismo graves."
          }
        ],
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Simpatico",
        "definicion": "Rama autonoma de lucha o huida; usa noradrenalina.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "termino": "AESP",
        "definicion": "Actividad eléctrica organizada sin pulso; se trata con RCP, adrenalina y corrección de causas.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "termino": "Noradrenalina",
        "definicion": "Vasopresor de primera línea en el shock séptico.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "termino": "Noradrenalina",
        "definicion": "Vasopresor de primera línea en shock séptico/distributivo (α1 >> β1).",
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      },
      {
        "termino": "Dobutamina",
        "definicion": "Inotrópico β1 que mejora el gasto pero puede bajar la PA.",
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores",
          "porUnidad": true
        }
      },
      {
        "termino": "Push-dose",
        "definicion": "Bolo titulable: adrenalina 5-20 mcg o fenilefrina 50-200 mcg cada 2-5 min.",
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      },
      {
        "termino": "Adrenalina IM en asma casi-fatal",
        "definicion": "0.3-0.5 mg (1 mg/mL); β2 broncodilatador + α antiedema.",
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada"
        }
      },
      {
        "termino": "Adrenalina nebulizada",
        "definicion": "Para estridor en reposo; vigilar rebote, siempre con corticoide.",
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que neurotransmisor usa el simpatico?",
        "reverso": "Principalmente la noradrenalina.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "frente": "Que produce la medula suprarrenal?",
        "reverso": "Adrenalina y noradrenalina.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "frente": "Dosis de adrenalina en paro cardíaco",
        "reverso": "1 mg IV/IO cada 3-5 minutos (concentración 0.1 mg/mL).",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "frente": "Dosis de adrenalina en anafilaxia (adulto)",
        "reverso": "0.3-0.5 mg IM (concentración 1 mg/mL).",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "frente": "Vía de elección para la adrenalina en anafilaxia",
        "reverso": "Intramuscular en el muslo (vasto lateral).",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "frente": "Dosis de adrenalina en el paro",
        "reverso": "1 mg IV/IO cada 3 a 5 minutos.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "frente": "Vasopresor de primera línea en shock séptico",
        "reverso": "Noradrenalina.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "frente": "Vía y dosis de adrenalina en anafilaxia",
        "reverso": "IM en el muslo, 0.3 a 0.5 mg, repetible cada 5 a 15 min.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "frente": "Diferencia entre vasopresor e inotrópico",
        "reverso": "El vasopresor sube la resistencia; el inotrópico sube la contractilidad.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "frente": "¿Qué receptor media la vasoconstricción de los vasopresores?",
        "reverso": "α1 (alfa-1).",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "frente": "¿Qué efecto domina la adrenalina a dosis alta?",
        "reverso": "α1: vasoconstricción intensa.",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "frente": "Vasopresor de primera línea en shock séptico",
        "reverso": "Noradrenalina (0.05-0.5 mcg/kg/min).",
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      },
      {
        "frente": "Adrenalina push-dose: concentración y dosis",
        "reverso": "10 mcg/mL; 5-20 mcg (0.5-2 mL) cada 2-5 min.",
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      },
      {
        "frente": "Inotrópico/presor de puente en bradicardia sintomática",
        "reverso": "Infusión de dopamina (o adrenalina) hasta el marcapasos.",
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      },
      {
        "frente": "¿Cuándo se usa adrenalina nebulizada en el crup?",
        "reverso": "Estridor en reposo (moderado-grave); vigilar rebote.",
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada"
        }
      },
      {
        "frente": "Anticonvulsivo de elección en la eclampsia",
        "reverso": "Sulfato de magnesio (carga 4-6 g + infusión).",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un paciente con intoxicacion por organofosforados presenta salivacion, lagrimeo, miosis y bradicardia. El mecanismo es:",
        "opciones": [
          "Exceso de noradrenalina",
          "Inhibicion de la acetilcolinesterasa con acumulacion de acetilcolina",
          "Bloqueo de receptores de dopamina",
          "Deficit de GABA"
        ],
        "correcta": 1,
        "explicacion": "Los organofosforados inhiben la acetilcolinesterasa; la acetilcolina se acumula y sobreestimula los receptores colinergicos. El antidoto es la atropina.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "pregunta": "Cual hormona y glandula corresponden a la respuesta de lucha o huida inmediata?",
        "opciones": [
          "Cortisol de la corteza suprarrenal",
          "Adrenalina de la medula suprarrenal",
          "Insulina del pancreas",
          "TSH de la hipofisis"
        ],
        "correcta": 1,
        "explicacion": "La medula suprarrenal libera adrenalina y noradrenalina, que producen la respuesta rapida de lucha o huida; el cortisol actua de forma mas sostenida.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "pregunta": "Paciente con miosis puntiforme, bradipnea severa y estupor tras consumo de drogas. El antídoto es:",
        "opciones": [
          "Atropina",
          "Naloxona",
          "Flumazenil",
          "Adrenalina"
        ],
        "correcta": 1,
        "explicacion": "Es un toxidrome opiáceo (miosis + depresión respiratoria + sedación); la naloxona revierte el efecto.",
        "procedencia": {
          "temaOriginal": "farmacologia-toxicologia"
        }
      },
      {
        "pregunta": "En FV refractaria, el primer antiarrítmico y su dosis correcta son:",
        "opciones": [
          "Adrenalina 1 mg",
          "Amiodarona 300 mg en bolo",
          "Atropina 1 mg",
          "Lidocaína 0.5 mg/kg"
        ],
        "correcta": 1,
        "explicacion": "Tras la tercera descarga se administra amiodarona 300 mg; la alternativa es lidocaína 1 a 1.5 mg/kg. La adrenalina no es un antiarrítmico.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "pregunta": "Un paciente con FC de 38 lpm está confuso e hipotenso. La atropina no responde. El siguiente paso es:",
        "opciones": [
          "Repetir atropina hasta 10 mg",
          "Marcapasos transcutáneo o infusión de adrenalina/dopamina",
          "Adenosina",
          "Cardioversión sincronizada"
        ],
        "correcta": 1,
        "explicacion": "En bradicardia inestable refractaria a atropina (máximo 3 mg) se usa marcapasos transcutáneo o cronotrópicos en infusión.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "pregunta": "En un paciente con WPW y fibrilación auricular, ¿qué fármaco está contraindicado?",
        "opciones": [
          "Procainamida",
          "Diltiazem",
          "Magnesio",
          "Adrenalina"
        ],
        "correcta": 1,
        "explicacion": "Los bloqueadores del nodo AV como el diltiazem pueden favorecer la conducción por la vía accesoria y precipitar FV; se prefiere procainamida o cardioversión.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "pregunta": "La vía correcta de la adrenalina en la anafilaxia con pulso es:",
        "opciones": [
          "IV en bolo no diluido",
          "Intramuscular en el muslo",
          "Subcutánea",
          "Inhalada"
        ],
        "correcta": 1,
        "explicacion": "La adrenalina IM en el muslo es la vía de elección; el bolo IV no diluido se reserva para el paro por su riesgo arritmogénico.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "pregunta": "El vasopresor de primera línea en el shock séptico es:",
        "opciones": [
          "Dopamina",
          "Noradrenalina",
          "Dobutamina",
          "Fenilefrina"
        ],
        "correcta": 1,
        "explicacion": "La noradrenalina es el vasopresor de primera elección por su eficacia y menor perfil arritmogénico que la dopamina.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "pregunta": "El toxíndrome colinérgico por organofosforados se trata principalmente con:",
        "opciones": [
          "Atropina",
          "Adrenalina",
          "Naloxona",
          "Flumazenil"
        ],
        "correcta": 0,
        "explicacion": "La atropina antagoniza los receptores muscarínicos y seca las secreciones potencialmente mortales.",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "pregunta": "Shock séptico que no responde a 30 mL/kg de cristaloide. El siguiente paso es:",
        "opciones": [
          "Dopamina en infusión",
          "Noradrenalina en infusión",
          "Fenilefrina en bolo único",
          "Más volumen indefinidamente"
        ],
        "correcta": 1,
        "explicacion": "La noradrenalina es el vasopresor de primera línea tras la reanimación con líquidos en el shock séptico.",
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      },
      {
        "pregunta": "Para preparar adrenalina push-dose a 10 mcg/mL se mezcla:",
        "opciones": [
          "1 mL de 1 mg/mL en 9 mL",
          "1 mL de 100 mcg/mL en 9 mL de salino",
          "1 ampolla en 1 L",
          "10 mL de 1 mg/mL puros"
        ],
        "correcta": 1,
        "explicacion": "1 mL de la jeringa de paro (100 mcg/mL) en 9 mL de salino da 10 mL a 10 mcg/mL.",
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      },
      {
        "pregunta": "Bloqueo AV completo con escape ancho e hipotensión. La atropina probablemente:",
        "opciones": [
          "Será muy eficaz",
          "Será poco útil; preparar marcapasos/infusión",
          "Está contraindicada siempre",
          "Resolverá el bloqueo de rama"
        ],
        "correcta": 1,
        "explicacion": "En el bloqueo infranodal la atropina rara vez funciona; el tratamiento es marcapasos transcutáneo o catecolaminas.",
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada"
        }
      },
      {
        "pregunta": "Embarazada de 34 semanas con convulsión y PA 170/110. El fármaco de elección es:",
        "opciones": [
          "Diazepam",
          "Sulfato de magnesio",
          "Fenitoína",
          "Levetiracetam"
        ],
        "correcta": 1,
        "explicacion": "En la eclampsia el anticonvulsivo de elección es el sulfato de magnesio (carga 4-6 g + infusión 1-2 g/h).",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      }
    ]
  },
  "m5-tcc-fractura-craneo": {
    "secciones": [
      {
        "titulo": "El encefalo",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "encefalo",
            "titulo": "Regiones del encefalo"
          },
          {
            "tipo": "lista",
            "titulo": "Regiones y funciones",
            "items": [
              "Cerebro (corteza): pensamiento, movimiento voluntario, sensibilidad, lenguaje.",
              "Cerebelo: coordinacion, equilibrio y tono muscular.",
              "Diencefalo: talamo (releva sensibilidad) e hipotalamo (homeostasis y hormonas).",
              "Tronco encefalico: mesencefalo, protuberancia y bulbo; controla respiracion y latido.",
              "Bulbo raquideo: centro cardiorrespiratorio vital."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Herniacion y triada de Cushing",
            "texto": "El aumento de la presion intracraneal produce la triada de Cushing: hipertension, bradicardia y respiracion irregular. Es un signo tardio y grave de herniacion cerebral inminente."
          },
          {
            "tipo": "lista",
            "titulo": "Pares craneales clave en urgencias",
            "items": [
              "II Optico: vision; reflejo fotomotor.",
              "III Oculomotor: movimiento ocular y constriccion pupilar; su compresion causa midriasis fija.",
              "VII Facial: expresion facial; util en sospecha de evento cerebral.",
              "X Vago: control parasimpatico del corazon y visceras."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "titulo": "Principios de inmovilizacion",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Reglas generales del entablillado",
            "items": [
              "Inmoviliza la articulacion proximal y la distal a la fractura.",
              "En luxacion, inmoviliza la articulacion afectada y el hueso de cada lado.",
              "Valora pulso, sensibilidad y movilidad antes y despues de la ferula.",
              "Acolchona las prominencias oseas para evitar lesiones por presion.",
              "No intentes reducir fracturas; alinea solo si no hay pulso distal y con traccion suave.",
              "Cubre las heridas abiertas con aposito esteril antes de inmovilizar."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Tipos de ferula",
            "headers": [
              "Ferula",
              "Uso tipico"
            ],
            "filas": [
              [
                "Rigida (tablilla)",
                "Fracturas de huesos largos"
              ],
              [
                "Moldeable (SAM)",
                "Se adapta a la forma de la extremidad"
              ],
              [
                "De vacio",
                "Se ajusta al contorno y endurece al extraer aire"
              ],
              [
                "De traccion",
                "Fractura cerrada de femur (diafisis)"
              ],
              [
                "Cabestrillo y vendaje",
                "Lesiones de clavicula y humero"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Ferula de traccion",
            "texto": "Indicada en fractura cerrada aislada de la diafisis del femur. Contrarresta el espasmo muscular que cabalga los fragmentos, reduce el dolor, la hemorragia y el daño a tejidos. No usar en fractura de cadera, rodilla o pelvis."
          }
        ],
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      },
      {
        "titulo": "TC de cráneo simple",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La TC simple es la prueba inicial en el TCE y el ictus. Se evalúa sistemáticamente: Sangre (hiperdensa, blanca: hematomas epidural en lente biconvexa, subdural en semiluna), Cisternas (su borramiento sugiere HIC/herniación), Cerebro (asimetría, desviación de línea media, borramiento de surcos), Ventrículos (tamaño, hidrocefalia) y Hueso (fracturas)."
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Epidural vs. subdural",
            "texto": "Hematoma EPIdural: forma de lente biconvexa, suele ser arterial (arteria meníngea media), con clásico \"intervalo lúcido\". Hematoma SUBdural: forma de semiluna (cóncava), venoso, frecuente en ancianos y alcohólicos por trauma menor."
          }
        ],
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Paciente con TCE que pasa de pupilas iguales a una pupila derecha dilatada y fija, con caida del Glasgow. Esto sugiere:",
        "opciones": [
          "Intoxicacion por opioides",
          "Herniacion cerebral con compresion del III par",
          "Hipoglucemia",
          "Crisis de ansiedad"
        ],
        "correcta": 1,
        "explicacion": "La anisocoria nueva con deterioro indica herniacion y compresion del tercer par craneal: urgencia neuroquirurgica.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "pregunta": "Para reducir el edema cerebral en un TCE grave, la solución de elección entre estas es:",
        "opciones": [
          "Glucosado 5%",
          "Salino hipertónico 3%",
          "Salino 0.9% a gran volumen",
          "Agua destilada"
        ],
        "correcta": 1,
        "explicacion": "El salino hipertónico crea un gradiente osmótico que extrae agua del tejido cerebral hacia el vaso, disminuyendo la presión intracraneal.",
        "procedencia": {
          "temaOriginal": "terapia-iv-io"
        }
      }
    ]
  },
  "m5-cin-energia-potencial": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Potencial de accion",
        "definicion": "Cambio electrico de la neurona que transmite el impulso siguiendo la ley del todo o nada.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cual es el potencial de reposo de la neurona?",
        "reverso": "Alrededor de menos 70 mV.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      }
    ],
    "quiz": []
  },
  "m6-ig-comunicacion": {
    "secciones": [
      {
        "titulo": "Metas y monitorización",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Indicadores de perfusión",
            "items": [
              "PAM mayor o igual a 65 mmHg en la mayoría de los adultos.",
              "Diuresis mayor a 0.5 ml/kg/h.",
              "Llenado capilar, temperatura distal y estado mental.",
              "Aclaramiento de lactato como guía dinámica.",
              "Saturación venosa central como medida avanzada del balance aporte-demanda."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "No persigas un número aislado",
            "texto": "Una PAM aceptable con piel fría, oliguria y lactato en ascenso indica que la perfusión sigue siendo inadecuada. La reanimación se guía por la perfusión global, no por un solo signo vital."
          }
        ],
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Sinapsis",
        "definicion": "Punto de comunicacion entre neuronas mediado por neurotransmisores.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Quienes infartan sin dolor clasico",
        "reverso": "Mujeres, diabeticos y adultos mayores.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Una mujer diabetica de 68 años refiere nausea, fatiga y disnea sin dolor toracico. Lo prudente es:",
        "opciones": [
          "Descartar infarto pese a la ausencia de dolor",
          "Asumir indigestion y dar antiacido",
          "Tranquilizarla y no trasladar",
          "Indicar reposo en casa"
        ],
        "correcta": 0,
        "explicacion": "Mujeres, diabeticos y adultos mayores pueden presentar infarto atipico sin dolor; el umbral de sospecha debe ser bajo.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "pregunta": "Un adulto mayor con diabetes tipo 2, glucosa de 850, osmolaridad muy elevada y sin cetonas significativas tiene:",
        "opciones": [
          "Cetoacidosis diabetica",
          "Estado hiperosmolar hiperglucemico",
          "Hipoglucemia",
          "Tormenta tiroidea"
        ],
        "correcta": 1,
        "explicacion": "La hiperglucemia extrema con osmolaridad muy alta y ausencia de cetoacidosis define el estado hiperosmolar, tipico del paciente con diabetes tipo 2.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      }
    ]
  },
  "m3-ep-respiracion": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Triada de Cushing",
        "definicion": "Hipertension, bradicardia y respiracion irregular por hipertension intracraneal.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "termino": "Bulbo raquideo",
        "definicion": "Region del tronco que controla la respiracion y el latido cardiaco.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "termino": "Volumen corriente",
        "definicion": "Cantidad de aire movilizado en una respiracion normal, unos 500 mL.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "termino": "Respiracion agonica",
        "definicion": "Boqueo reflejo que no es ventilacion eficaz; signo de paro.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "termino": "Respiracion de Kussmaul",
        "definicion": "Respiracion profunda y rapida compensadora de la acidosis metabolica.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "termino": "Tríada de Cushing",
        "definicion": "HTA, bradicardia y respiración irregular: herniación inminente (signo tardío).",
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "termino": "Triada de Cushing",
        "definicion": "HTA, bradicardia y respiración irregular: HIC y herniación (tardío).",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "termino": "SDA",
        "definicion": "Sedación que preserva la respiración (ketamina) para preoxigenar antes de paralizar.",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      },
      {
        "termino": "Tríada de Cushing",
        "definicion": "HTA + bradicardia + respiración irregular: herniación inminente.",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      },
      {
        "termino": "Naloxona titulada",
        "definicion": "0.04-0.4 mg IV: restaurar respiración sin precipitar abstinencia.",
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      },
      {
        "termino": "Ketamina analgésica",
        "definicion": "0.1-0.3 mg/kg en 10-15 min: dolor refractario sin deprimir respiración.",
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que es la triada de Cushing?",
        "reverso": "Hipertension, bradicardia y respiracion irregular por hipertension intracraneal.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "frente": "Que region controla la respiracion y el latido?",
        "reverso": "El bulbo raquideo del tronco encefalico.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "frente": "Cual es el principal estimulo de la respiracion?",
        "reverso": "El dioxido de carbono, a traves del pH del liquido cefalorraquideo.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "frente": "Que es la respiracion agonica",
        "reverso": "Boqueo reflejo que NO es respiracion eficaz; indica paro.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "frente": "Que es la respiracion de Kussmaul",
        "reverso": "Respiracion profunda y rapida que compensa la acidosis metabolica.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "frente": "Que evalua el sistema START",
        "reverso": "Deambulacion, respiracion, perfusion y estado mental.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "frente": "Frecuencia respiratoria que clasifica como rojo en START",
        "reverso": "Mas de 30 respiraciones por minuto.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "frente": "Componentes de la tríada de Cushing",
        "reverso": "Hipertensión, bradicardia y respiración irregular (HIC tardía).",
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "frente": "Componentes de la triada de Cushing",
        "reverso": "Hipertensión, bradicardia y respiración irregular.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "frente": "Patrón respiratorio de la CAD",
        "reverso": "Respiración de Kussmaul (profunda y rápida) para compensar la acidosis.",
        "procedencia": {
          "temaOriginal": "medicina-interna"
        }
      },
      {
        "frente": "Define la tríada de Cushing",
        "reverso": "Hipertensión, bradicardia y respiración irregular.",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      },
      {
        "frente": "Componentes del APGAR",
        "reverso": "Aspecto, pulso, gesto, actividad y respiracion.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Por que el surfactante es vital para la respiracion?",
        "opciones": [
          "Aumenta la tension superficial",
          "Reduce la tension superficial y evita el colapso alveolar",
          "Transporta oxigeno",
          "Filtra el aire"
        ],
        "correcta": 1,
        "explicacion": "El surfactante disminuye la tension superficial dentro del alveolo, evitando que colapse en la espiracion; su deficit causa el distres respiratorio neonatal.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "pregunta": "Por que se cuenta la FR sin avisar al paciente?",
        "opciones": [
          "Para ahorrar tiempo",
          "Porque al sentirse observado modifica su patron respiratorio",
          "Porque es mas higienico",
          "No hay diferencia"
        ],
        "correcta": 1,
        "explicacion": "La respiracion tiene control voluntario; si el paciente sabe que lo observan, altera el ritmo y la medicion pierde validez.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      }
    ]
  },
  "m4-epi-clasificacion": {
    "secciones": [
      {
        "titulo": "Insuficiencia cardiaca",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La insuficiencia cardiaca es un sindrome clinico en el que el corazon no logra bombear sangre suficiente para satisfacer las demandas metabolicas del organismo, o lo hace a expensas de presiones de llenado elevadas. No es un diagnostico unico sino el resultado final de muchas enfermedades cardiacas."
          },
          {
            "tipo": "tabla",
            "titulo": "Clasificacion por fraccion de eyeccion (FEVI)",
            "headers": [
              "Tipo",
              "FEVI",
              "Mecanismo dominante"
            ],
            "filas": [
              [
                "IC con FEVI reducida (ICFEr)",
                "Menor o igual a 40 por ciento",
                "Falla de contractilidad (sistolica)"
              ],
              [
                "IC con FEVI levemente reducida",
                "41 a 49 por ciento",
                "Zona intermedia"
              ],
              [
                "IC con FEVI preservada (ICFEp)",
                "Mayor o igual a 50 por ciento",
                "Falla de relajacion (diastolica)"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Manifestaciones segun el ventriculo que falla",
            "items": [
              "Falla izquierda: congestion pulmonar. Disnea de esfuerzo, ortopnea, disnea paroxistica nocturna, estertores crepitantes.",
              "Falla derecha: congestion sistemica. Ingurgitacion yugular, hepatomegalia, ascitis, edema de miembros inferiores.",
              "La causa mas frecuente de falla derecha es la falla izquierda previa.",
              "Tercer ruido (R3 o galope ventricular): marcador de sobrecarga de volumen y mal pronostico."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Clasificacion funcional NYHA",
            "headers": [
              "Clase",
              "Limitacion",
              "Sintomas"
            ],
            "filas": [
              [
                "I",
                "Ninguna",
                "Asintomatico con actividad ordinaria"
              ],
              [
                "II",
                "Leve",
                "Sintomas con esfuerzo moderado"
              ],
              [
                "III",
                "Marcada",
                "Sintomas con esfuerzo minimo"
              ],
              [
                "IV",
                "Total",
                "Sintomas en reposo"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Peptidos natriureticos",
            "texto": "El BNP y el NT-proBNP se elevan cuando el miocardio se distiende por sobrecarga de presion o volumen. Son utiles para confirmar o descartar IC ante una disnea de origen incierto; un valor bajo hace muy improbable la IC como causa."
          },
          {
            "tipo": "lista",
            "titulo": "Pilares del tratamiento de la ICFEr cronica",
            "items": [
              "Inhibidores del sistema renina-angiotensina (IECA, ARA II o el inhibidor de neprilisina sacubitrilo-valsartan).",
              "Betabloqueadores con evidencia (carvedilol, bisoprolol, metoprolol succinato).",
              "Antagonistas de mineralocorticoides (espironolactona, eplerenona).",
              "Inhibidores de SGLT2 (dapagliflozina, empagliflozina), beneficio incluso sin diabetes.",
              "Diureticos de asa para el control de la congestion (mejoran sintomas, no mortalidad)."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      },
      {
        "titulo": "Asma",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El asma es una enfermedad inflamatoria cronica de la via aerea con hiperreactividad bronquial y obstruccion reversible al flujo. Cursa con episodios de disnea, sibilancias, tos y opresion toracica, frecuentemente nocturnos o desencadenados por alergenos, ejercicio o infecciones."
          },
          {
            "tipo": "lista",
            "titulo": "Datos de crisis asmatica grave",
            "items": [
              "Dificultad para completar frases, uso de musculos accesorios.",
              "Frecuencia respiratoria muy alta o, en fase tardia, silencio auscultatorio (torax silente).",
              "Saturacion baja, agotamiento, alteracion del estado de conciencia.",
              "Una PaCO2 normal o elevada en una crisis grave es signo de alarma de fatiga inminente."
            ]
          },
          {
            "tipo": "pasos",
            "titulo": "Manejo de la crisis asmatica",
            "items": [
              "Oxigeno para mantener saturacion adecuada.",
              "Broncodilatadores beta2 de accion corta inhalados (salbutamol), repetidos o nebulizados.",
              "Anticolinergico inhalado (bromuro de ipratropio) en crisis moderada a grave.",
              "Corticoesteroides sistemicos tempranos para reducir la inflamacion.",
              "Sulfato de magnesio intravenoso en crisis grave que no responde."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "titulo": "Insuficiencia hepatica",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El higado sintetiza factores de coagulacion y albumina, metaboliza farmacos y depura el amonio. Su falla, aguda o cronica (cirrosis), compromete todas estas funciones y produce complicaciones potencialmente mortales."
          },
          {
            "tipo": "lista",
            "titulo": "Complicaciones de la cirrosis e hipertension portal",
            "items": [
              "Varices esofagicas y riesgo de hemorragia.",
              "Ascitis y peritonitis bacteriana espontanea.",
              "Encefalopatia hepatica por acumulo de amonio.",
              "Sindrome hepatorrenal.",
              "Coagulopatia por deficit de factores y trombocitopenia."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Encefalopatia hepatica",
            "texto": "La acumulacion de amonio altera el estado mental, con asterixis (temblor de aleteo). Se trata buscando el desencadenante (hemorragia, infeccion, estrenimiento) y con lactulosa para reducir la absorcion de amonio; la rifaximina es coadyuvante."
          }
        ],
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      },
      {
        "titulo": "Serie roja y anemias",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La anemia es la disminucion de la masa eritrocitaria o de la hemoglobina. El primer paso para clasificarla es el volumen corpuscular medio (VCM), que separa las anemias en microciticas, normociticas y macrociticas."
          },
          {
            "tipo": "tabla",
            "titulo": "Clasificacion de la anemia por VCM",
            "headers": [
              "Tipo",
              "VCM",
              "Causas tipicas"
            ],
            "filas": [
              [
                "Microcitica",
                "Bajo (menor a 80)",
                "Deficiencia de hierro, talasemia, enfermedad cronica"
              ],
              [
                "Normocitica",
                "Normal (80 a 100)",
                "Hemorragia aguda, enfermedad cronica, hemolisis"
              ],
              [
                "Macrocitica",
                "Alto (mayor a 100)",
                "Deficiencia de vitamina B12 o folato, alcohol, hipotiroidismo"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Hierro y deposito",
            "texto": "En la deficiencia de hierro la ferritina (deposito) esta baja, la capacidad de transporte (transferrina) alta y la saturacion baja. En la anemia de la enfermedad cronica la ferritina suele estar normal o alta porque es un reactante de fase aguda."
          },
          {
            "tipo": "lista",
            "titulo": "Reticulocitos: la respuesta de la medula",
            "items": [
              "Reticulocitos altos: la medula responde (hemolisis, hemorragia aguda).",
              "Reticulocitos bajos: produccion insuficiente (deficiencias, falla medular).",
              "Son clave para diferenciar el origen de una anemia normocitica."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "hematologia-coagulacion"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Vagolítico",
        "definicion": "Sustancia que bloquea el efecto del nervio vago, aumentando la frecuencia cardíaca, como la atropina.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "termino": "Ritmo sinusal",
        "definicion": "Ritmo originado en el nodo sinusal con P antes de cada QRS y frecuencia 60-100.",
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      },
      {
        "termino": "Necrosis tubular aguda",
        "definicion": "LRA intrinseca por dano tubular; FENa mayor a 2 por ciento y cilindros granulosos.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "termino": "Pancreatitis aguda",
        "definicion": "Inflamacion pancreatica por autodigestion; causas frecuentes: litiasis biliar y alcohol.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Frecuencia intrínseca del nodo sinusal",
        "reverso": "60 a 100 latidos por minuto.",
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      },
      {
        "frente": "Que significa un delta ratio mayor a 2",
        "reverso": "Coexiste alcalosis metabolica o acidosis respiratoria cronica.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "frente": "Las dos causas mas frecuentes de pancreatitis aguda",
        "reverso": "Litiasis biliar y alcohol.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      },
      {
        "frente": "Primer objetivo en disección aórtica",
        "reverso": "Bajar la frecuencia con betabloqueador (esmolol/labetalol) antes que la presión.",
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada"
        }
      },
      {
        "frente": "Objetivo de la atropinización en organofosforados",
        "reverso": "Secar las secreciones bronquiales (pulmón seco), no la frecuencia.",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "La ley del todo o nada significa que:",
        "opciones": [
          "El estimulo siempre es maximo",
          "Si se alcanza el umbral, el potencial de accion se dispara con amplitud constante",
          "La neurona nunca se repolariza",
          "La amplitud depende de la intensidad del estimulo"
        ],
        "correcta": 1,
        "explicacion": "Una vez alcanzado el umbral, el potencial de accion tiene amplitud fija; la intensidad del estimulo se codifica por la frecuencia de disparo, no por la amplitud.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      },
      {
        "pregunta": "Si falla el nodo sinusal, que estructura asume el control y a que frecuencia aproximada?",
        "opciones": [
          "El haz de His a 100 por minuto",
          "El nodo AV a 40-60 por minuto",
          "Las auriculas a 120 por minuto",
          "Las coronarias a 80 por minuto"
        ],
        "correcta": 1,
        "explicacion": "El nodo AV es el marcapasos subsidiario y dispara a 40-60 por minuto; las fibras ventriculares lo hacen aun mas lento (20-40).",
        "procedencia": {
          "temaOriginal": "cardiovascular-profundo"
        }
      },
      {
        "pregunta": "La frecuencia respiratoria normal de un lactante de 6 meses es de aproximadamente:",
        "opciones": [
          "12 a 20 rpm",
          "20 a 30 rpm",
          "25 a 40 rpm",
          "40 a 60 rpm"
        ],
        "correcta": 2,
        "explicacion": "El lactante respira entre 25 y 40 rpm. Confundirlo con el rango del adulto haria pasar por anormal lo que es fisiologico.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "pregunta": "En START, un paciente que respira a 36 por minuto se clasifica como:",
        "opciones": [
          "Verde",
          "Amarillo",
          "Rojo",
          "Negro"
        ],
        "correcta": 2,
        "explicacion": "Una frecuencia respiratoria mayor a 30 por minuto es criterio de rojo (atencion inmediata) en START.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "pregunta": "En una tira de ritmo regular hay 4 cuadros grandes entre dos ondas R. La frecuencia cardíaca aproximada es:",
        "opciones": [
          "60 por minuto",
          "75 por minuto",
          "100 por minuto",
          "150 por minuto"
        ],
        "correcta": 1,
        "explicacion": "300 dividido entre 4 cuadros grandes da 75 por minuto. Es el método rápido para ritmos regulares.",
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      },
      {
        "pregunta": "Cuál de los siguientes NO es criterio de ritmo sinusal normal:",
        "opciones": [
          "Una onda P antes de cada QRS",
          "Frecuencia entre 60 y 100",
          "Onda P positiva en aVR",
          "Intervalo PR constante"
        ],
        "correcta": 2,
        "explicacion": "En ritmo sinusal la onda P es negativa en aVR y positiva en DII. Una P positiva en aVR sugiere otro origen del ritmo o mala colocación de electrodos.",
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      },
      {
        "pregunta": "El mejor indicador dinámico de que la reanimación del shock funciona es:",
        "opciones": [
          "Una sola medición de PAM normal",
          "El aclaramiento progresivo del lactato",
          "La frecuencia cardíaca aislada",
          "El color de la orina"
        ],
        "correcta": 1,
        "explicacion": "La tendencia descendente del lactato refleja mejora de la perfusión global, mejor que un valor aislado de presión.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "pregunta": "Al ventilar a un asmático intubado se debe:",
        "opciones": [
          "Usar frecuencias altas",
          "Dar tiempo espiratorio largo y tolerar hipercapnia",
          "Maximizar el volumen corriente",
          "Evitar la sedación"
        ],
        "correcta": 1,
        "explicacion": "El tiempo espiratorio largo y la hipercapnia permisiva previenen el auto-PEEP, el atrapamiento aéreo y el barotrauma.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "pregunta": "El dato prehospitalario más valioso para decidir la reperfusión del EVC es:",
        "opciones": [
          "La presión arterial inicial",
          "La hora de inicio o de ultima vez visto sano",
          "El antecedente familiar",
          "La frecuencia cardíaca"
        ],
        "correcta": 1,
        "explicacion": "La ventana terapéutica depende del tiempo de evolución; la hora de inicio determina la elegibilidad para trombolisis o trombectomía.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "pregunta": "Para diagnosticar pancreatitis aguda se requieren:",
        "opciones": [
          "Solo dolor abdominal",
          "Dos de tres: clinica, enzimas elevadas o imagen",
          "Solo amilasa elevada",
          "Tomografia obligatoria siempre"
        ],
        "correcta": 1,
        "explicacion": "El diagnostico exige al menos dos de tres criterios: dolor caracteristico, lipasa/amilasa mayor a tres veces el limite, o imagen compatible.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      },
      {
        "pregunta": "El dolor que inicia periumbilical y migra a la fosa iliaca derecha con dolor de rebote sugiere:",
        "opciones": [
          "Colecistitis",
          "Apendicitis",
          "Pancreatitis",
          "Diverticulitis"
        ],
        "correcta": 1,
        "explicacion": "La migracion del dolor a la fosa iliaca derecha y el signo de rebote (Blumberg) son caracteristicos de la apendicitis aguda.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      },
      {
        "pregunta": "Una anemia con VCM de 70 fL orienta primero a:",
        "opciones": [
          "Deficiencia de B12",
          "Anemia microcitica (deficiencia de hierro o talasemia)",
          "Hemolisis aguda",
          "Anemia macrocitica"
        ],
        "correcta": 1,
        "explicacion": "Un VCM bajo (menor a 80) define la anemia microcitica, cuyas causas tipicas son la deficiencia de hierro y la talasemia.",
        "procedencia": {
          "temaOriginal": "hematologia-coagulacion"
        }
      }
    ]
  },
  "m4-card-pcr-megacode": {
    "secciones": [
      {
        "titulo": "Evaluacion pupilar",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Las pupilas informan del tallo cerebral y de muchas intoxicaciones. Se valora tamaño, simetria y reactividad a la luz (lo normal se resume como PIRRL: Pupilas Iguales, Redondas y Reactivas a la Luz). La anisocoria (pupilas desiguales) nueva en un paciente con deterioro es una urgencia."
          },
          {
            "tipo": "tabla",
            "titulo": "Patrones pupilares y su significado",
            "headers": [
              "Hallazgo",
              "Causa probable"
            ],
            "filas": [
              [
                "Mioticas puntiformes (ambas)",
                "Opioides u organofosforados (toxidrome colinergico)"
              ],
              [
                "Midriaticas reactivas (ambas)",
                "Simpaticomimeticos, anfetaminas, cocaina, estres"
              ],
              [
                "Midriaticas fijas (ambas)",
                "Hipoxia grave, paro, lesion grave del tallo"
              ],
              [
                "Anisocoria (una dilatada fija)",
                "Herniacion con compresion del III par; hipertension intracraneal"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Pupila dilatada fija + deterioro = herniacion",
            "texto": "Una pupila que se dilata y deja de reaccionar junto con caida del Glasgow sugiere herniacion cerebral. Sumada a la triada de Cushing (hipertension, bradicardia, respiracion irregular) obliga a actuar: via aerea, evitar hipoxia e hipotension y traslado al centro con neurocirugia."
          }
        ],
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "titulo": "Capnografía (ETCO2)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La capnografía mide el CO2 al final de la espiración (ETCO2) y muestra su evolución en una onda. Es uno de los parámetros más informativos en urgencias porque refleja ventilación, perfusión y metabolismo simultáneamente. El valor normal es de 35-45 mmHg."
          },
          {
            "tipo": "tabla",
            "titulo": "Interpretación de la capnografía",
            "headers": [
              "Hallazgo",
              "Significado"
            ],
            "filas": [
              [
                "Onda cuadrada normal de 35-45 mmHg",
                "Ventilación y perfusión adecuadas."
              ],
              [
                "ETCO2 bajo brusco a cero",
                "Tubo desplazado, desconexión u obstrucción total."
              ],
              [
                "ETCO2 muy bajo en RCP",
                "Compresiones ineficaces o bajo gasto."
              ],
              [
                "Aumento súbito de ETCO2 en RCP",
                "Posible retorno de la circulación espontánea (RCE)."
              ],
              [
                "Pendiente ascendente en meseta (aleta de tiburón)",
                "Broncoespasmo (asma, EPOC)."
              ],
              [
                "ETCO2 elevado",
                "Hipoventilación o retención de CO2."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Capnografía en RCP",
            "texto": "Un ETCO2 sostenido por debajo de 10 mmHg durante la reanimación indica compresiones de mala calidad o pronóstico ominoso; un ascenso súbito por encima de 35-40 mmHg sugiere retorno de la circulación espontánea."
          }
        ],
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "titulo": "Capnografía (ETCO₂)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La capnografía mide el CO₂ espirado y es el estándar de oro para confirmar la colocación traqueal del tubo y monitorizar ventilación y perfusión. La onda normal tiene cuatro fases."
          },
          {
            "tipo": "lista",
            "titulo": "Fases de la onda capnográfica",
            "items": [
              "Fase I: línea base inspiratoria, sin CO₂ (espacio muerto).",
              "Fase II: ascenso rápido (vaciado del espacio muerto + alveolar).",
              "Fase III: meseta alveolar; su final es el ETCO₂.",
              "Fase IV: descenso inspiratorio al entrar aire fresco.",
              "Ángulo alfa (entre II y III) y ángulo beta (entre III y IV) reflejan la mecánica."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Lecturas clave del ETCO₂",
            "texto": "Patrón \"aleta de tiburón\" (ascenso lento, ángulo alfa aumentado) = broncoespasmo (asma/EPOC). En RCP: ETCO₂ refleja el gasto cardíaco generado por las compresiones; un ascenso súbito a >35-40 mmHg sugiere retorno de circulación espontánea (ROSC); valores persistentemente <10 mmHg indican compresiones inefectivas o mal pronóstico. Una caída brusca puede indicar embolia pulmonar o desplazamiento del tubo."
          }
        ],
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Hiperpotasemia",
        "definicion": "Exceso de potasio que puede causar arritmias y paro cardiaco.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "termino": "Cadena de supervivencia",
        "definicion": "Secuencia de acciones que maximiza la supervivencia al paro cardiaco.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "termino": "Reexpansion completa",
        "definicion": "Permitir que el torax regrese a su forma entre compresiones para favorecer el llenado cardiaco.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "termino": "Hiperpotasemia",
        "definicion": "Potasio elevado; produce ondas T picudas y riesgo de paro cardíaco.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      },
      {
        "termino": "ETCO₂ en RCP",
        "definicion": "Refleja el gasto cardíaco; subida súbita sugiere ROSC.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "termino": "Amiodarona",
        "definicion": "Antiarrítmico para FV/TVSP refractaria: 300 mg y luego 150 mg.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco",
          "porUnidad": true
        }
      },
      {
        "termino": "H y T",
        "definicion": "Mnemotecnia de las causas reversibles del paro cardíaco.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "¿Cuándo se administra el primer antiarrítmico?",
        "reverso": "Tras la tercera descarga (FV/TVSP persistente).",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco",
          "porUnidad": true
        }
      },
      {
        "frente": "Valor de ETCO2 que sugiere RCE",
        "reverso": "Ascenso brusco y sostenido por arriba de 35 a 40 mmHg.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco",
          "porUnidad": true
        }
      },
      {
        "frente": "ETCO2 menor a 10 mmHg durante RCP indica",
        "reverso": "Compresiones de mala calidad o muy bajo gasto cardíaco.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "frente": "Meta de SpO2 tras el RCE",
        "reverso": "92 a 98 por ciento; evitar la hiperoxia.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco",
          "porUnidad": true
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual estructura del tronco encefalico es el centro cardiorrespiratorio vital?",
        "opciones": [
          "Cerebelo",
          "Talamo",
          "Bulbo raquideo",
          "Corteza frontal"
        ],
        "correcta": 2,
        "explicacion": "El bulbo raquideo aloja los centros que regulan la respiracion y el latido cardiaco; su dano es incompatible con la vida.",
        "procedencia": {
          "temaOriginal": "neuroanatomia-avanzada"
        }
      }
    ]
  },
  "m4-resp-neumotorax-espontaneo": {
    "secciones": [
      {
        "titulo": "Mecanica de la ventilacion",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La ventilacion es un proceso mecanico gobernado por cambios de presion. En la inspiracion el diafragma desciende y los intercostales externos elevan las costillas, aumentando el volumen toracico y reduciendo la presion, por lo que el aire entra. La espiracion en reposo es pasiva por retroceso elastico."
          },
          {
            "tipo": "tabla",
            "titulo": "Volumenes pulmonares",
            "headers": [
              "Volumen",
              "Definicion",
              "Valor aprox."
            ],
            "filas": [
              [
                "Volumen corriente",
                "Aire por respiracion normal",
                "500 mL"
              ],
              [
                "Volumen de reserva inspiratorio",
                "Aire extra que se puede inhalar",
                "3000 mL"
              ],
              [
                "Volumen de reserva espiratorio",
                "Aire extra que se puede exhalar",
                "1100 mL"
              ],
              [
                "Volumen residual",
                "Aire que queda tras espiracion maxima",
                "1200 mL"
              ],
              [
                "Espacio muerto",
                "Aire que no participa en el intercambio",
                "150 mL"
              ]
            ]
          },
          {
            "tipo": "p",
            "texto": "El control de la respiracion reside en el bulbo y la protuberancia. El estimulo principal es el dioxido de carbono (a traves del pH del liquido cefalorraquideo). En el paciente con EPOC cronico el estimulo puede depender mas del oxigeno bajo, por lo que el oxigeno se administra de forma controlada."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Neumotorax a tension",
            "texto": "El aire atrapado en el espacio pleural colapsa el pulmon y desplaza el mediastino, comprimiendo el corazon y los grandes vasos. Es una urgencia que requiere descompresion inmediata."
          }
        ],
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "titulo": "Procedimientos torácicos",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El neumotórax a tensión es una emergencia clínica (no radiológica): el aire atrapado colapsa el pulmón, desplaza el mediastino y comprime las grandes venas, reduciendo el retorno venoso. Se manifiesta con disnea, hipotensión, ingurgitación yugular, ausencia de ruidos y desviación traqueal tardía."
          },
          {
            "tipo": "tabla",
            "headers": [
              "Procedimiento",
              "Sitio / nota"
            ],
            "filas": [
              [
                "Descompresión con aguja",
                "5.º espacio intercostal, línea axilar anterior (preferido en adultos), o 2.º espacio medioclavicular como alternativa."
              ],
              [
                "Toracostomía con dedo (finger thoracostomy)",
                "Incisión y disección digital en el 5.º EIC; más fiable que la aguja en tórax grueso."
              ],
              [
                "Pericardiocentesis ecoguiada",
                "Evacuación del taponamiento cardíaco guiada por POCUS."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Por qué cambió el sitio de la aguja",
            "texto": "El 5.º espacio intercostal en la línea axilar anterior tiene menos masa muscular y grasa que el clásico 2.º espacio medioclavicular en muchos adultos, aumentando la probabilidad de alcanzar la cavidad pleural con la aguja."
          }
        ],
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "titulo": "Radiografía de tórax (ABCDE)",
        "bloques": [
          {
            "tipo": "pasos",
            "titulo": "Lectura sistemática",
            "items": [
              "A — Airway: vía aérea/tráquea central, bronquios.",
              "B — Bones: costillas, clavículas, columna (fracturas).",
              "C — Cardiac: silueta cardíaca (índice cardiotorácico).",
              "D — Diaphragm: hemidiafragmas, ángulos costofrénicos, aire bajo el diafragma.",
              "E — Effusion/Fields: derrames y campos pulmonares (infiltrados, neumotórax)."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Surfactante",
        "definicion": "Sustancia que reduce la tension superficial y evita el colapso alveolar.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "termino": "Neumotorax a tension",
        "definicion": "Acumulacion de aire pleural que colapsa el pulmon y desplaza el mediastino.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "termino": "Neumotórax a tensión",
        "definicion": "Aire a presión que colapsa el pulmón y el retorno venoso; descompresión inmediata.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "termino": "Ley de Boyle en vuelo",
        "definicion": "Con la altitud el gas se expande: riesgo de neumotórax a tensión y distensión de cavidades.",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Tipo de shock por neumotorax a tension",
        "reverso": "Obstructivo.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "frente": "Enumera las cinco T",
        "reverso": "Neumotórax a tensión, taponamiento, toxinas, trombosis pulmonar, trombosis coronaria.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "frente": "¿Cómo se diagnostica el neumotórax a tensión?",
        "reverso": "Clínicamente; nunca se espera una radiografía.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "frente": "¿Qué descarta el deslizamiento pleural (lung sliding)?",
        "reverso": "El neumotórax en ese punto explorado.",
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      },
      {
        "frente": "¿Por qué es peligroso volar con un neumotórax?",
        "reverso": "Con la altitud el gas se expande (Boyle) y puede convertirse en neumotórax a tensión.",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Sibilancias difusas en un paciente disneico orientan a:",
        "opciones": [
          "Edema pulmonar exclusivamente",
          "Broncoconstricción (asma/EPOC/anafilaxia)",
          "Neumotórax",
          "Derrame pleural masivo"
        ],
        "correcta": 1,
        "explicacion": "Las sibilancias reflejan estrechamiento bronquial; típicas de asma, EPOC y anafilaxia.",
        "procedencia": {
          "temaOriginal": "evaluacion-integral"
        }
      },
      {
        "pregunta": "Cual de los siguientes NO es una causa potencialmente mortal de dolor toracico?",
        "opciones": [
          "Diseccion aortica",
          "Embolia pulmonar",
          "Costocondritis",
          "Neumotorax a tension"
        ],
        "correcta": 2,
        "explicacion": "La costocondritis es una causa benigna de dolor toracico; las otras tres amenazan la vida y deben descartarse primero.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "pregunta": "Un paciente en AESP tiene venas yugulares distendidas y ruidos respiratorios ausentes de un lado. La causa reversible más probable es:",
        "opciones": [
          "Hipovolemia",
          "Neumotórax a tensión",
          "Hiperpotasemia",
          "Hipotermia"
        ],
        "correcta": 1,
        "explicacion": "La distensión yugular con hipoventilación unilateral apunta a neumotórax a tensión, que requiere descompresión inmediata con aguja.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      }
    ]
  },
  "m6-parcial-1-unico": {
    "secciones": [
      {
        "titulo": "Intercambio gaseoso",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El intercambio ocurre por difusion simple en la membrana alveolo-capilar: el oxigeno pasa del alveolo a la sangre y el dioxido de carbono en sentido inverso, siguiendo gradientes de presion parcial. La relacion entre ventilacion y perfusion (V/Q) determina la eficiencia del intercambio."
          },
          {
            "tipo": "lista",
            "titulo": "Transporte de gases",
            "items": [
              "Oxigeno: la mayoria viaja unido a la hemoglobina; una pequena fraccion disuelta en plasma.",
              "Dioxido de carbono: viaja como bicarbonato (la mayoria), unido a hemoglobina y disuelto.",
              "La saturacion de oxigeno (SpO2) refleja el porcentaje de hemoglobina ocupada por oxigeno."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "titulo": "Curva de oxihemoglobina",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "oxihemoglobina",
            "titulo": "Curva de disociacion de la oxihemoglobina"
          },
          {
            "tipo": "p",
            "texto": "La curva relaciona la presion parcial de oxigeno con la saturacion de la hemoglobina. Tiene forma de S: en los pulmones (alta presion) la hemoglobina se satura facil, y en los tejidos (baja presion) suelta el oxigeno. Su pendiente pronunciada explica por que una pequena caida de la presion produce gran descarga de oxigeno a los tejidos."
          },
          {
            "tipo": "tabla",
            "titulo": "Desplazamiento de la curva",
            "headers": [
              "Direccion",
              "Causas",
              "Efecto"
            ],
            "filas": [
              [
                "A la derecha",
                "Acidosis, fiebre, CO2 alto, ejercicio",
                "Suelta mas oxigeno a los tejidos"
              ],
              [
                "A la izquierda",
                "Alcalosis, hipotermia, CO2 bajo",
                "Retiene mas oxigeno; lo suelta menos"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Efecto Bohr",
            "texto": "El aumento de CO2 y la acidez desplazan la curva a la derecha, facilitando que la hemoglobina entregue oxigeno justo donde el metabolismo es mas intenso. Es un ajuste elegante a las necesidades del tejido."
          }
        ],
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Un fármaco con alta afinidad pero eficacia cero es un:",
        "opciones": [
          "Agonista pleno",
          "Agonista parcial",
          "Antagonista",
          "Inductor enzimático"
        ],
        "correcta": 2,
        "explicacion": "Se une fuerte (afinidad) pero no produce efecto (eficacia cero): es la definición de antagonista.",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      }
    ]
  },
  "m6-ig-definicion": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Complejo ancho",
        "definicion": "QRS mayor o igual a 0.12 s; se asume TV hasta probar lo contrario.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "termino": "PAM objetivo",
        "definicion": "Mayor o igual a 65 mmHg como meta inicial de perfusión.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Como se transporta la mayor parte del CO2?",
        "reverso": "Como bicarbonato en el plasma.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "frente": "Meta de PAM en la reanimación del shock",
        "reverso": "Mayor o igual a 65 mmHg.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "frente": "¿Dónde se coloca la faja pélvica?",
        "reverso": "Sobre los trocánteres mayores.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual es la meta de la fraccion de compresion toracica?",
        "opciones": [
          "Menor al 30%",
          "Alrededor del 50%",
          "Mayor al 60%, idealmente 80%",
          "No importa mientras se desfibrile"
        ],
        "correcta": 2,
        "explicacion": "La fraccion de compresion debe ser mayor al 60%; mientras mas tiempo se comprime, mejor se mantiene la presion de perfusion coronaria.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "pregunta": "El hallazgo que define IAMCEST en V2 y V3 de un hombre es:",
        "opciones": [
          "Elevación mayor o igual a 1 mm",
          "Elevación mayor o igual a 2 mm",
          "Descenso del ST",
          "Inversión de T"
        ],
        "correcta": 1,
        "explicacion": "En V2 y V3 el umbral es mayor en hombres (2 mm) y de 1.5 mm en mujeres, por la variabilidad normal del punto J.",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "pregunta": "La placa con mayor riesgo de causar un evento agudo es la que tiene:",
        "opciones": [
          "Mayor calcificación",
          "Núcleo lipídico grande y cápsula fibrosa delgada",
          "Menor contenido lipídico",
          "La estenosis más severa"
        ],
        "correcta": 1,
        "explicacion": "La placa vulnerable, con cápsula fina y gran núcleo lipídico, es más propensa a romperse aunque no sea la más estenótica.",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      }
    ]
  },
  "m4-pra-taller-aminas": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Que desplaza la curva de oxihemoglobina a la derecha?",
        "reverso": "Acidosis, fiebre, CO2 alto y ejercicio.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      }
    ],
    "quiz": []
  },
  "m5-tt-costilla": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Durante la inspiracion en reposo, que ocurre?",
        "opciones": [
          "El diafragma se relaja y sube",
          "El diafragma desciende, aumenta el volumen toracico y baja la presion",
          "La presion toracica aumenta y empuja el aire afuera",
          "Solo intervienen los abdominales"
        ],
        "correcta": 1,
        "explicacion": "El diafragma desciende y los intercostales externos elevan las costillas; el volumen toracico aumenta, la presion cae y el aire entra.",
        "procedencia": {
          "temaOriginal": "respiratorio-profundo"
        }
      },
      {
        "pregunta": "La faja pélvica en una fractura inestable debe colocarse:",
        "opciones": [
          "Sobre el ombligo",
          "Sobre los trocánteres mayores",
          "Sobre las costillas",
          "Sobre los muslos distales"
        ],
        "correcta": 1,
        "explicacion": "A la altura de los trocánteres cierra el anillo pélvico y reduce el volumen para taponar el sangrado; más alto es ineficaz.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      }
    ]
  },
  "m2-afi-urinario": {
    "secciones": [
      {
        "titulo": "Nefrología y electrolitos",
        "bloques": [
          {
            "tipo": "tabla",
            "headers": [
              "Lesión renal aguda",
              "Mecanismo"
            ],
            "filas": [
              [
                "Prerrenal",
                "Hipoperfusión (hipovolemia, shock); riñón estructuralmente sano."
              ],
              [
                "Intrínseca (renal)",
                "Daño del parénquima (necrosis tubular aguda, nefrotóxicos)."
              ],
              [
                "Posrenal",
                "Obstrucción del flujo urinario (litiasis, próstata)."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Hiperkalemia: amenaza inmediata",
            "texto": "El potasio elevado altera el potencial de membrana cardíaco: ondas T picudas, ensanchamiento del QRS, ondas sinusoidales y paro. El manejo de emergencia incluye gluconato de calcio (estabiliza la membrana), insulina con glucosa y salbutamol (introducen K⁺ en la célula)."
          },
          {
            "tipo": "p",
            "texto": "El equilibrio ácido-base avanzado usa el anión gap (Na⁺ − (Cl⁻ + HCO₃⁻)) para clasificar la acidosis metabólica: con anión gap elevado (cetoacidosis, lactato, tóxicos) o normal (pérdidas digestivas, renales). El delta gap evalúa trastornos mixtos."
          }
        ],
        "procedencia": {
          "temaOriginal": "medicina-interna"
        }
      },
      {
        "titulo": "Lesion renal aguda",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Clasificacion etiologica de la LRA",
            "headers": [
              "Tipo",
              "Mecanismo",
              "Ejemplos"
            ],
            "filas": [
              [
                "Prerrenal",
                "Hipoperfusion renal",
                "Deshidratacion, hemorragia, insuficiencia cardiaca, sepsis"
              ],
              [
                "Renal o intrinseca",
                "Dano del parenquima",
                "Necrosis tubular aguda, glomerulonefritis, nefritis intersticial"
              ],
              [
                "Posrenal",
                "Obstruccion del flujo",
                "Litiasis, hiperplasia prostatica, tumores"
              ]
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Prerrenal vs necrosis tubular aguda",
            "headers": [
              "Indice",
              "Prerrenal",
              "Necrosis tubular"
            ],
            "filas": [
              [
                "Fraccion excretada de sodio",
                "Menor a 1 por ciento",
                "Mayor a 2 por ciento"
              ],
              [
                "Sodio urinario",
                "Bajo",
                "Alto"
              ],
              [
                "Cociente urea/creatinina",
                "Elevado (mayor a 20)",
                "Normal"
              ],
              [
                "Sedimento urinario",
                "Limpio o cilindros hialinos",
                "Cilindros granulosos pardos"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Logica de la fraccion excretada de sodio",
            "texto": "En la LRA prerrenal el rinon esta sano y retiene avidamente sodio para conservar volumen, por lo que la fraccion excretada es baja. En la necrosis tubular el tubulo esta danado y no puede reabsorber sodio, por lo que lo excreta."
          },
          {
            "tipo": "lista",
            "titulo": "Indicaciones urgentes de dialisis (regla AEIOU)",
            "items": [
              "A: acidosis metabolica grave refractaria.",
              "E: alteraciones electroliticas, sobre todo hiperpotasemia refractaria.",
              "I: intoxicaciones por toxinas dializables.",
              "O: sobrecarga de volumen (overload) refractaria.",
              "U: uremia sintomatica (encefalopatia, pericarditis)."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "titulo": "Antibioticos",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Clases de antibioticos por mecanismo",
            "headers": [
              "Clase",
              "Mecanismo",
              "Notas"
            ],
            "filas": [
              [
                "Betalactamicos (penicilinas, cefalosporinas, carbapenems)",
                "Inhiben la pared celular",
                "Alergia cruzada; bactericidas"
              ],
              [
                "Aminoglucosidos",
                "Inhiben la subunidad 30S del ribosoma",
                "Nefrotoxicos y ototoxicos; ajuste renal"
              ],
              [
                "Macrolidos",
                "Inhiben la subunidad 50S",
                "Inhiben CYP450; prolongan QT"
              ],
              [
                "Fluoroquinolonas",
                "Inhiben la ADN girasa",
                "Tendinopatia; prolongan QT"
              ],
              [
                "Vancomicina",
                "Inhibe la pared (glucopeptido)",
                "Cubre SARM; vigilar niveles y rinon"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Bactericida vs bacteriostatico",
            "texto": "Los bactericidas matan a la bacteria (betalactamicos, aminoglucosidos, fluoroquinolonas); los bacteriostaticos detienen su crecimiento y dependen del sistema inmune (macrolidos, tetraciclinas, sulfonamidas). En infecciones graves o pacientes inmunocomprometidos se prefieren los bactericidas."
          },
          {
            "tipo": "lista",
            "titulo": "Principios de uso racional",
            "items": [
              "Empezar empirico segun el foco probable y desescalar con el cultivo.",
              "Cubrir el espectro necesario, ni mas ni menos, para frenar la resistencia.",
              "Considerar penetracion al sitio (orina, hueso, sistema nervioso central).",
              "Ajustar por funcion renal y vigilar toxicidad de los de margen estrecho."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      },
      {
        "titulo": "Antihipertensivos",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Grupos de antihipertensivos",
            "headers": [
              "Grupo",
              "Mecanismo",
              "Indicaciones / cuidados"
            ],
            "filas": [
              [
                "IECA / ARA II",
                "Bloquean el sistema renina-angiotensina",
                "Protegen rinon en diabetes; vigilar potasio y creatinina"
              ],
              [
                "Calcioantagonistas",
                "Vasodilatacion (dihidropiridinas) o cardiacos",
                "Edema con dihidropiridinas"
              ],
              [
                "Tiazidas",
                "Diuretico en tubulo distal",
                "Hipopotasemia, hiperuricemia, hiperglucemia"
              ],
              [
                "Betabloqueadores",
                "Reducen gasto y frecuencia",
                "Utiles en cardiopatia; cuidado en asma y bloqueos"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "IECA en el embarazo",
            "texto": "Los IECA y ARA II estan contraindicados en el embarazo por teratogenicidad. La tos seca es un efecto adverso clasico de los IECA; el angioedema, aunque raro, es grave y obliga a suspenderlos."
          },
          {
            "tipo": "p",
            "texto": "La eleccion del antihipertensivo se individualiza por comorbilidades: IECA o ARA II en diabetes y enfermedad renal con proteinuria; betabloqueadores tras infarto o en insuficiencia cardiaca; calcioantagonistas y tiazidas como buenas opciones de inicio."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Nefrona",
        "definicion": "Unidad funcional del rinon donde se filtra la sangre y se forma la orina.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "termino": "LRA prerrenal",
        "definicion": "Lesión renal por hipoperfusión con riñón estructuralmente sano.",
        "procedencia": {
          "temaOriginal": "medicina-interna"
        }
      },
      {
        "termino": "LRA prerrenal",
        "definicion": "Lesion renal por hipoperfusion con rinon estructuralmente sano; FENa menor a 1 por ciento.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "termino": "IECA",
        "definicion": "Inhibidor de la enzima convertidora de angiotensina; protege rinon y contraindicado en embarazo.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cual es la unidad funcional del rinon?",
        "reverso": "La nefrona.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Ante signos de herniación con hipotensión asociada, el osmótico preferible es:",
        "opciones": [
          "Manitol 1 g/kg",
          "Solución salina hipertónica 3%",
          "Furosemida",
          "Dextrosa al 5%"
        ],
        "correcta": 1,
        "explicacion": "El salino hipertónico reduce la PIC sin bajar la PA; el manitol, por su diuresis, puede agravar la hipotensión.",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      }
    ]
  },
  "m4-gyn-cambios-embarazo": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Que cambio en el ECG sugiere hiperpotasemia?",
        "reverso": "Ondas T picudas.",
        "procedencia": {
          "temaOriginal": "renal-hidroelectrolitico"
        }
      },
      {
        "frente": "Grupo antihipertensivo contraindicado en el embarazo",
        "reverso": "IECA y ARA II (teratogenicos).",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un infarto de cara inferior se identifica por cambios en:",
        "opciones": [
          "V1 y V2",
          "DI y aVL",
          "DII, DIII y aVF",
          "V3 y V4"
        ],
        "correcta": 2,
        "explicacion": "DII, DIII y aVF exploran la cara inferior, irrigada habitualmente por la coronaria derecha. DI y aVL pueden mostrar cambios recíprocos.",
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      },
      {
        "pregunta": "Un QT prolongado en el ECG puede deberse a:",
        "opciones": [
          "Hipercalcemia",
          "Hipocalcemia o hipomagnesemia",
          "Hipernatremia",
          "Hiperpotasemia leve"
        ],
        "correcta": 1,
        "explicacion": "Tanto la hipocalcemia como la hipomagnesemia alargan el QT y predisponen a torsades de pointes. La hipercalcemia, en cambio, lo acorta.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      }
    ]
  },
  "m4-met-complicaciones": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Cetoacidosis diabetica",
        "definicion": "Urgencia por falta de insulina con hiperglucemia, cetonas y acidosis.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "termino": "Cetoacidosis diabetica",
        "definicion": "Emergencia con hiperglucemia, cetonas y acidosis con anion gap; mas frecuente en tipo 1.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que caracteriza a la cetoacidosis diabetica?",
        "reverso": "Hiperglucemia, cetonas, acidosis, deshidratacion y aliento afrutado.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un paciente diabetico presenta hiperglucemia, respiracion profunda, aliento afrutado y deshidratacion. El diagnostico mas probable es:",
        "opciones": [
          "Hipoglucemia",
          "Cetoacidosis diabetica",
          "Crisis tiroidea",
          "Insuficiencia suprarrenal"
        ],
        "correcta": 1,
        "explicacion": "La falta de insulina lleva a quemar grasa y producir cuerpos cetonicos acidos; la hiperglucemia, la acidosis y el aliento afrutado son tipicos de la cetoacidosis diabetica.",
        "procedencia": {
          "temaOriginal": "sistema-endocrino"
        }
      },
      {
        "pregunta": "Un paciente diabetico con respiracion profunda y rapida y aliento afrutado probablemente cursa con:",
        "opciones": [
          "Asma",
          "Acidosis metabolica (respiracion de Kussmaul)",
          "Neumotorax",
          "Crisis de panico"
        ],
        "correcta": 1,
        "explicacion": "La respiracion de Kussmaul con aliento cetonico es tipica de la cetoacidosis diabetica, una acidosis metabolica.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "pregunta": "Un paciente diabético tipo 1 con glucemia 420, respiración de Kussmaul y aliento a frutas tiene probablemente:",
        "opciones": [
          "Estado hiperosmolar (EHH)",
          "Cetoacidosis diabética (CAD)",
          "Hipoglucemia",
          "Tormenta tiroidea"
        ],
        "correcta": 1,
        "explicacion": "La cetoacidosis produce acidosis metabólica con respiración de Kussmaul compensatoria y aliento cetónico (afrutado).",
        "procedencia": {
          "temaOriginal": "medicina-interna"
        }
      },
      {
        "pregunta": "Cual de estas es causa de acidosis metabolica con anion gap NORMAL:",
        "opciones": [
          "Cetoacidosis diabetica",
          "Acidosis lactica",
          "Diarrea",
          "Intoxicacion por metanol"
        ],
        "correcta": 2,
        "explicacion": "La diarrea provoca perdida de bicarbonato y acidosis hipercloremica con anion gap normal; las demas opciones elevan el anion gap.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "pregunta": "Un paciente con cetoacidosis diabetica que ademas vomita de forma persistente probablemente tenga:",
        "opciones": [
          "Solo acidosis metabolica",
          "Trastorno mixto (acidosis con anion gap mas alcalosis metabolica)",
          "Solo alcalosis respiratoria",
          "Gasometria normal"
        ],
        "correcta": 1,
        "explicacion": "La cetoacidosis aumenta el anion gap mientras el vomito genera alcalosis metabolica; coexisten dos trastornos, lo que el delta gap ayuda a desenmascarar.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      }
    ]
  },
  "m4-gi-sangrado-tubo": {
    "secciones": [
      {
        "titulo": "El tubo digestivo",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "digestivo",
            "titulo": "Organos del sistema digestivo"
          },
          {
            "tipo": "p",
            "texto": "El tubo digestivo es un conducto que va de la boca al ano: boca, faringe, esofago, estomago, intestino delgado e intestino grueso. Los organos accesorios (glandulas salivales, higado, vesicula biliar y pancreas) aportan secreciones que ayudan a la digestion."
          },
          {
            "tipo": "tabla",
            "titulo": "Funcion por segmento",
            "headers": [
              "Organo",
              "Funcion principal"
            ],
            "filas": [
              [
                "Boca",
                "Masticacion y digestion del almidon (amilasa salival)"
              ],
              [
                "Estomago",
                "Digestion de proteinas con acido y pepsina"
              ],
              [
                "Intestino delgado",
                "Principal sitio de digestion y absorcion de nutrientes"
              ],
              [
                "Intestino grueso",
                "Absorcion de agua y formacion de heces"
              ],
              [
                "Recto y ano",
                "Almacenamiento y eliminacion de heces"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Peristalsis",
            "texto": "El movimiento del alimento se logra por peristalsis, ondas de contraccion del musculo liso. El control es autonomo: el parasimpatico estimula la digestion y el simpatico la frena."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "titulo": "Conceptos que rigen la elección",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La biodisponibilidad es la fracción del fármaco administrado que llega a la circulación sistémica activa. La vía intravenosa tiene, por definición, una biodisponibilidad del 100% porque salta toda barrera de absorción; las demás vías dependen de cuánto se absorbe y se metaboliza antes de actuar."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Efecto de primer paso",
            "texto": "Los fármacos absorbidos por el tubo digestivo pasan primero por el hígado, que puede inactivar gran parte de la dosis (efecto de primer paso). Las vías sublingual, intranasal y parenteral lo evitan, logrando un inicio más rápido y predecible."
          },
          {
            "tipo": "lista",
            "titulo": "Factores para elegir la vía",
            "items": [
              "Urgencia del efecto deseado.",
              "Estado de conciencia y capacidad de deglutir.",
              "Disponibilidad de acceso vascular.",
              "Propiedades del fármaco (irritante, volumen, liposolubilidad)."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "titulo": "Anatomia funcional del tubo digestivo",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "digestivo"
          },
          {
            "tipo": "p",
            "texto": "El angulo de Treitz (union duodenoyeyunal) divide el tubo digestivo en alto y bajo, lo que separa la hemorragia digestiva alta de la baja. Esta distincion guia el abordaje inicial y la endoscopia adecuada."
          }
        ],
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      },
      {
        "titulo": "Aeromedicina de evacuación",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El transporte aeromédico acorta tiempos hacia el centro definitivo, pero impone una fisiología propia: con la altitud baja la presión barométrica y los gases se expanden (ley de Boyle), lo que afecta cavidades cerradas."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "El gas se expande con la altitud",
            "texto": "Un neumotórax pequeño puede volverse a tensión, el aire del manguito del tubo endotraqueal y de las férulas neumáticas se expande, y el oído y el intestino se distienden. Anticipa: descomprime el neumotórax antes de volar, vigila presiones de manguito y considera la altitud de vuelo."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Seguridad alrededor de la aeronave",
            "texto": "Aproxímate solo por el frente y a la vista del piloto, nunca por la cola (rotor de cola). En terreno inclinado, acércate por el lado cuesta abajo. Asegura objetos sueltos: el rotor genera viento intenso."
          }
        ],
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Efecto de primer paso",
        "definicion": "Metabolismo hepático que inactiva parte del fármaco absorbido por el tubo digestivo.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "termino": "Vía parenteral",
        "definicion": "Administración que evita el tubo digestivo: IV, IO, IM y SC.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      }
    ],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Un paciente con heces negras y malolientes (melena) tiene mas probablemente un sangrado:",
        "opciones": [
          "Digestivo bajo",
          "Digestivo alto",
          "Hemorroidal",
          "Renal"
        ],
        "correcta": 1,
        "explicacion": "La melena resulta de sangre digerida a su paso por el tubo digestivo, lo que orienta a un origen alto (sobre el angulo de Treitz).",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      }
    ]
  },
  "m2-afi-digestivo": {
    "secciones": [
      {
        "titulo": "Digestion y absorcion",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Digestion de nutrientes",
            "headers": [
              "Nutriente",
              "Enzimas y lugar",
              "Producto final"
            ],
            "filas": [
              [
                "Carbohidratos",
                "Amilasa (boca y pancreas)",
                "Glucosa y monosacaridos"
              ],
              [
                "Proteinas",
                "Pepsina (estomago), proteasas pancreaticas",
                "Aminoacidos"
              ],
              [
                "Grasas",
                "Bilis y lipasa pancreatica",
                "Acidos grasos y glicerol"
              ]
            ]
          },
          {
            "tipo": "p",
            "texto": "La absorcion ocurre sobre todo en el intestino delgado, cuya superficie esta amplificada por pliegues, vellosidades y microvellosidades. La bilis emulsiona las grasas para que la lipasa las digiera; sin bilis, las grasas no se absorben bien y aparece esteatorrea."
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Vesicula biliar",
            "texto": "La vesicula almacena y concentra la bilis y la libera al comer grasas. Un calculo que obstruye el conducto produce colico biliar y, si bloquea el flujo, ictericia."
          }
        ],
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Bilis",
        "definicion": "Secrecion hepatica que emulsiona las grasas para su digestion.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo",
          "porUnidad": true
        }
      },
      {
        "termino": "Vellosidades",
        "definicion": "Proyecciones del intestino delgado que amplian la superficie de absorcion.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "termino": "Vena porta",
        "definicion": "Vena que lleva la sangre con nutrientes del intestino al higado.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "termino": "Esteatorrea",
        "definicion": "Heces grasas por mala absorcion de grasas, a menudo por falta de bilis.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo",
          "porUnidad": true
        }
      },
      {
        "termino": "Canal gástrico",
        "definicion": "Puerto de los DSG de segunda generación para drenar el estómago y reducir aspiración.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que enzima del estomago digiere proteinas?",
        "reverso": "La pepsina.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "frente": "Que ocurre cuando el higado no convierte el amoniaco en urea?",
        "reverso": "Se acumula amoniaco y aparece encefalopatia hepatica.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "frente": "Por donde llega la sangre con nutrientes al higado?",
        "reverso": "Por la vena porta.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "frente": "Que rama autonoma estimula la digestion?",
        "reverso": "El parasimpatico.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo",
          "porUnidad": true
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "En que organo comienza la digestion quimica del almidon?",
        "opciones": [
          "Estomago",
          "Boca, con la amilasa salival",
          "Intestino grueso",
          "Higado"
        ],
        "correcta": 1,
        "explicacion": "La amilasa salival inicia la digestion del almidon en la boca; el pancreas aporta mas amilasa en el intestino delgado.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      }
    ]
  },
  "m3-ep-neurologica": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Encefalopatia hepatica",
        "definicion": "Alteracion neurologica por acumulacion de amoniaco cuando falla el higado.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Ventana clásica de la trombolisis IV",
        "reverso": "Hasta 4.5 horas en pacientes seleccionados.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas",
          "porUnidad": true
        }
      }
    ],
    "quiz": []
  },
  "m3-vi-sitios-puncion": {
    "secciones": [
      {
        "titulo": "Del impulso eléctrico a la onda",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El impulso nace en el nodo sinusal (marcapasos natural, 60-100 por minuto), recorre las aurículas, se frena en el nodo AV, baja por el haz de His y se distribuye por las fibras de Purkinje hasta los ventrículos. Cada paso deja una huella eléctrica que el ECG registra."
          },
          {
            "tipo": "diagrama",
            "clave": "conduccion"
          },
          {
            "tipo": "lista",
            "titulo": "Correlato de cada estructura",
            "items": [
              "Nodo sinusal y aurículas: onda P (despolarización auricular).",
              "Nodo AV: pausa fisiológica, corresponde al segmento PR.",
              "Ventrículos: complejo QRS (despolarización ventricular).",
              "Repolarización ventricular: onda T."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Jerarquía de marcapasos",
            "texto": "Si el nodo sinusal falla, el nodo AV asume el control a 40-60 por minuto, y si este falla, los ventrículos disparan a 20-40 por minuto. A menor sitio, menor frecuencia y menor estabilidad."
          }
        ],
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Punto de McBurney",
        "definicion": "Sitio de dolor maximo en la apendicitis, en la fosa iliaca derecha.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      },
      {
        "termino": "Antagonista competitivo",
        "definicion": "Bloquea reversiblemente el sitio del agonista; se vence aumentando el agonista (naloxona, atropina).",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cual es el principal sitio de absorcion de nutrientes?",
        "reverso": "El intestino delgado.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "frente": "Sitio IO más usado y su referencia",
        "reverso": "Tibia proximal, 1-2 cm medial e inferior a la tuberosidad tibial.",
        "procedencia": {
          "temaOriginal": "terapia-iv-io"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Si el nodo sinusal deja de funcionar, el siguiente marcapasos y su frecuencia esperada son:",
        "opciones": [
          "Los ventrículos a 100 por minuto",
          "El nodo AV a 40-60 por minuto",
          "Las fibras de Purkinje a 80 por minuto",
          "Las aurículas a 120 por minuto"
        ],
        "correcta": 1,
        "explicacion": "En la jerarquía de marcapasos, el nodo AV asume el control a 40-60 por minuto. A menor sitio en la jerarquía, menor frecuencia y estabilidad.",
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      }
    ]
  },
  "m5-tcc-pic": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "PPC",
        "definicion": "Presión de perfusión cerebral = PAM menos PIC.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "termino": "Delta gap",
        "definicion": "Compara el aumento del anion gap con la caida del bicarbonato; detecta trastornos mixtos.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "termino": "PPC = PAM − PIC",
        "definicion": "Evitar hipotensión e hipoxia, que disparan la mortalidad en TCE.",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Fórmula de la presión de perfusión cerebral",
        "reverso": "PPC = PAM − PIC.",
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "frente": "Fórmula de la presión de perfusión cerebral",
        "reverso": "PPC = PAM menos PIC.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "frente": "Fórmula de la presión de perfusión cerebral",
        "reverso": "PPC = PAM − PIC.",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un paciente con obstruccion del conducto biliar presenta ictericia y heces grasas. Por que aparecen las heces grasas?",
        "opciones": [
          "Exceso de bilis en el intestino",
          "Falta de bilis para emulsionar las grasas, que no se absorben",
          "Exceso de lipasa pancreatica",
          "Aumento de la peristalsis"
        ],
        "correcta": 1,
        "explicacion": "Sin bilis las grasas no se emulsionan ni se absorben bien y se eliminan en las heces (esteatorrea); la obstruccion biliar tambien causa ictericia.",
        "procedencia": {
          "temaOriginal": "sistema-digestivo"
        }
      },
      {
        "pregunta": "Según Monro-Kellie, ¿qué ocurre al crecer un hematoma intracraneal?",
        "opciones": [
          "El cráneo se expande",
          "Disminuyen LCR y sangre para compensar, hasta que la PIC se dispara",
          "No hay cambios de presión",
          "Aumenta el LCR"
        ],
        "correcta": 1,
        "explicacion": "En un cráneo rígido, el aumento de un componente desplaza a los otros; agotada la compensación, la PIC sube de forma abrupta.",
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "pregunta": "En el TCE grave, la hiperventilación sistemática es:",
        "opciones": [
          "Recomendada siempre",
          "Perjudicial porque vasoconstriñe y reduce el flujo cerebral; solo transitoria ante herniación",
          "Indiferente",
          "Útil para subir la PIC"
        ],
        "correcta": 1,
        "explicacion": "La hipocapnia vasoconstriñe y puede causar isquemia; se mantiene normocapnia, reservando la hiperventilación breve solo para signos de herniación.",
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "pregunta": "En la sospecha de herniación, la hiperventilación está indicada:",
        "opciones": [
          "De forma sistemática y prolongada",
          "Solo leve y transitoria como puente ante signos de herniación",
          "Nunca, en ningún caso",
          "Para aumentar la PIC"
        ],
        "correcta": 1,
        "explicacion": "La hipocapnia vasoconstriñe y puede causar isquemia; solo se usa de forma breve y controlada ante herniación inminente.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      }
    ]
  },
  "m5-cin-energia-cinetica": {
    "secciones": [
      {
        "titulo": "Cinemática del trauma compleja",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El trauma es energía transferida al cuerpo. La energía cinética (Ec = ½ m·v²) explica por qué la velocidad pesa más que la masa: duplicar la velocidad cuadruplica la energía. Predecir el patrón de lesión a partir del mecanismo permite buscar lesiones ocultas antes de que se manifiesten."
          },
          {
            "tipo": "lista",
            "titulo": "Patrones de transferencia de energía",
            "items": [
              "Cavitación: la energía desplaza tejido creando una cavidad temporal (clave en heridas por proyectil de alta velocidad).",
              "Cizallamiento: tejidos de distinta densidad se desaceleran a ritmos diferentes (desgarro de aorta, pedículos renales en caídas y colisiones).",
              "Compresión: aplastamiento directo de órganos (tórax, pelvis).",
              "Balística: la lesión depende de la energía cinética transferida, no solo del calibre; importan velocidad, fragmentación y trayecto."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "evaluacion-integral"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Energía cinética",
        "definicion": "Ec = ½ m·v²; la velocidad influye al cuadrado en la energía del trauma.",
        "procedencia": {
          "temaOriginal": "evaluacion-integral"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cuando trasladar a un centro de trauma",
        "reverso": "Lesiones graves o mecanismo de alta energia.",
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      },
      {
        "frente": "Primer paso ante una lesion electrica",
        "reverso": "Cortar la fuente de energia antes de tocar al paciente.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Si la velocidad de un vehículo se duplica, la energía cinética transferida en el impacto:",
        "opciones": [
          "Se duplica",
          "Se cuadruplica",
          "No cambia",
          "Se reduce a la mitad"
        ],
        "correcta": 1,
        "explicacion": "Ec = ½ m·v²: la velocidad está al cuadrado, así que duplicarla multiplica la energía por cuatro.",
        "procedencia": {
          "temaOriginal": "evaluacion-integral"
        }
      }
    ]
  },
  "m4-card-insuficiencia": {
    "secciones": [
      {
        "titulo": "Valvulopatias",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Las valvulopatias generan soplos por flujo turbulento. La estenosis dificulta la apertura; la insuficiencia o regurgitacion permite el reflujo por cierre incompetente. Localizar el soplo en el ciclo cardiaco (sistole o diastole) es el primer paso del diagnostico."
          },
          {
            "tipo": "tabla",
            "titulo": "Soplos principales",
            "headers": [
              "Valvulopatia",
              "Momento",
              "Caracteristicas"
            ],
            "filas": [
              [
                "Estenosis aortica",
                "Sistolica",
                "Soplo eyectivo en cresciendo-decresciendo, irradia a carotidas, pulso parvus et tardus"
              ],
              [
                "Insuficiencia aortica",
                "Diastolica",
                "Soplo decresciente, pulso amplio (saltarino), presion diferencial aumentada"
              ],
              [
                "Estenosis mitral",
                "Diastolica",
                "Retumbo con chasquido de apertura, foco mitral en decubito lateral"
              ],
              [
                "Insuficiencia mitral",
                "Sistolica",
                "Soplo holosistolico que irradia a axila"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Triada de la estenosis aortica grave",
            "texto": "Angina, sincope de esfuerzo y disnea por insuficiencia cardiaca. La aparicion de estos sintomas marca un pronostico reservado y suele indicar reemplazo valvular (quirurgico o percutaneo, TAVI)."
          },
          {
            "tipo": "lista",
            "titulo": "Maniobras que modifican los soplos",
            "items": [
              "Aumentar el retorno venoso (cuclillas, elevar piernas) intensifica casi todos los soplos.",
              "Maniobra de Valsalva y bipedestacion disminuyen el retorno: aumentan el soplo de la miocardiopatia hipertrofica y del prolapso mitral.",
              "La inspiracion aumenta los soplos del corazon derecho (regla de Rivero-Carvallo)."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "S3",
        "definicion": "Tercer ruido cardíaco asociado a sobrecarga de volumen / insuficiencia cardíaca.",
        "procedencia": {
          "temaOriginal": "evaluacion-integral"
        }
      },
      {
        "termino": "Paciente inestable",
        "definicion": "Hipotensión, dolor isquémico, insuficiencia cardíaca o alteración de conciencia por la arritmia.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "termino": "ICFEr",
        "definicion": "Insuficiencia cardiaca con FEVI reducida (menor o igual a 40 por ciento), de origen sistolico.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      },
      {
        "termino": "R3",
        "definicion": "Galope ventricular asociado a sobrecarga de volumen e insuficiencia cardiaca.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Una FEVI de 55 por ciento con sintomas claros de insuficiencia cardiaca corresponde a:",
        "opciones": [
          "ICFEr",
          "IC con FEVI levemente reducida",
          "ICFEp",
          "No es insuficiencia cardiaca"
        ],
        "correcta": 2,
        "explicacion": "Una FEVI mayor o igual a 50 por ciento con sintomas de IC define la IC con fraccion de eyeccion preservada, de mecanismo diastolico.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      },
      {
        "pregunta": "El tercer ruido cardiaco (R3) en un adulto mayor suele indicar:",
        "opciones": [
          "Disfuncion diastolica aislada",
          "Sobrecarga de volumen e insuficiencia cardiaca",
          "Estenosis aortica",
          "Hallazgo siempre normal"
        ],
        "correcta": 1,
        "explicacion": "En el adulto el R3 es un galope ventricular asociado a sobrecarga de volumen e insuficiencia cardiaca, con valor pronostico adverso.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ]
  },
  "m5-tt-neumotorax-simple": {
    "secciones": [
      {
        "titulo": "Manejo por prioridades",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La evaluacion del trauma sigue la misma logica del XABCDE: lo que mata primero se trata primero. Cada hallazgo critico se maneja en el momento de detectarlo antes de avanzar."
          },
          {
            "tipo": "tabla",
            "titulo": "Prioridades y acciones criticas",
            "headers": [
              "Prioridad",
              "Amenaza",
              "Accion"
            ],
            "filas": [
              [
                "X",
                "Hemorragia exsanguinante",
                "Presion, empaquetamiento, torniquete"
              ],
              [
                "A",
                "Via aerea comprometida",
                "Permeabilizar con control cervical"
              ],
              [
                "B",
                "Ventilacion inadecuada",
                "Oxigeno, descomprimir neumotorax a tension, sellar herida soplante"
              ],
              [
                "C",
                "Shock",
                "Control de hemorragia, abrigo, traslado"
              ],
              [
                "D",
                "Deterioro neurologico",
                "Glasgow, pupilas, glucosa"
              ],
              [
                "E",
                "Exposicion",
                "Buscar lesiones ocultas y prevenir hipotermia"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Herida toracica soplante",
            "texto": "Una herida penetrante de torax que succiona aire puede generar neumotorax. Se cubre con un aposito de tres lados (valvula) que deja salir aire pero impide su entrada, vigilando que no evolucione a neumotorax a tension."
          }
        ],
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Percusión timpánica en el tórax sugiere…",
        "reverso": "Aire atrapado: neumotórax.",
        "procedencia": {
          "temaOriginal": "evaluacion-integral"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Una herida toracica que succiona aire con cada inspiracion se maneja con:",
        "opciones": [
          "Aposito oclusivo de cuatro lados sellado completamente",
          "Aposito de tres lados que actua como valvula",
          "Gasa seca simple",
          "Torniquete"
        ],
        "correcta": 1,
        "explicacion": "El aposito de tres lados permite la salida de aire e impide su entrada, evitando favorecer un neumotorax a tension.",
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      },
      {
        "pregunta": "Un paciente con trauma torácico, hipotenso, con yugulares distendidas e hipoventilación unilateral con desviación traqueal tiene:",
        "opciones": [
          "Taponamiento cardíaco",
          "Neumotórax a tensión",
          "Hemotórax simple",
          "Contusión pulmonar"
        ],
        "correcta": 1,
        "explicacion": "La hipoventilación unilateral con desviación traqueal distingue el neumotórax a tensión del taponamiento, que conserva los ruidos respiratorios.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "pregunta": "El neumotórax a tensión se diagnostica:",
        "opciones": [
          "Con radiografía de torax",
          "Clínicamente y se trata de inmediato",
          "Con tomografía",
          "Con electrocardiograma"
        ],
        "correcta": 1,
        "explicacion": "Es un diagnóstico clínico que exige descompresión inmediata; esperar imágenes puede ser mortal.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "pregunta": "La \"R\" del algoritmo MARCH corresponde a:",
        "opciones": [
          "Reanimación cardiopulmonar",
          "Respiración (neumotórax, sello de tórax)",
          "Radio/comunicaciones",
          "Retiro de ropa"
        ],
        "correcta": 1,
        "explicacion": "R = Respirations: tratar el neumotórax (descompresión) y las heridas torácicas con sello.",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      }
    ]
  },
  "m5-hs-control-hemorragias": {
    "secciones": [
      {
        "titulo": "Secuencia de control de hemorragias",
        "bloques": [
          {
            "tipo": "pasos",
            "titulo": "Escalonamiento del control",
            "items": [
              "Presion directa firme y sostenida sobre la herida con apositos.",
              "Si no cede, empaqueta la herida (packing) introduciendo gasa hasta el fondo y mantén presion.",
              "En extremidades con sangrado que amenaza la vida, coloca un torniquete proximal a la herida.",
              "Aplica un vendaje compresivo para mantener la hemostasia lograda."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Colocacion del torniquete",
            "headers": [
              "Aspecto",
              "Recomendacion"
            ],
            "filas": [
              [
                "Ubicacion",
                "De 5 a 7 cm por encima de la herida, nunca sobre una articulacion"
              ],
              [
                "Apriete",
                "Hasta que cese el sangrado y desaparezca el pulso distal"
              ],
              [
                "Hora de colocacion",
                "Anotar la hora en el torniquete y en el reporte"
              ],
              [
                "No aflojar",
                "Una vez colocado por hemorragia masiva, no se afloja en campo"
              ],
              [
                "Dolor",
                "Es normal que duela; eso no es motivo para retirarlo"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "El torniquete salva vidas",
            "texto": "El miedo historico a la perdida del miembro fue exagerado. La evidencia militar demostro que un torniquete colocado a tiempo salva la vida con bajo riesgo de daño si el tiempo de isquemia se mantiene razonable. Ante hemorragia exsanguinante en extremidad, colocalo sin dudar."
          }
        ],
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "titulo": "Manejo del shock hemorrágico",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La reanimación de control de daños busca evitar la \"tríada letal\": hipotermia, acidosis y coagulopatía, que se retroalimentan. Prioriza hemoderivados (sangre entera, concentrados de eritrocitos y plasma en proporciones equilibradas) sobre los cristaloides, que diluyen los factores de coagulación."
          },
          {
            "tipo": "lista",
            "titulo": "Pilares",
            "items": [
              "Reanimación hipotensiva: mantener una presión \"permisiva\" (p. ej., PAS ~80-90 mmHg o pulso radial presente) hasta el control quirúrgico, para no \"reventar el coágulo\".",
              "Hemoderivados precoces: sangre entera o plasma; minimizar cristaloides.",
              "Ácido Tranexámico (TXA): antifibrinolítico; reduce la mortalidad por hemorragia si se administra dentro de las 3 primeras horas.",
              "Control de la hemorragia: torniquetes, agentes hemostáticos, empaquetamiento, faja pélvica.",
              "Prevención de la hipotermia: mantas, fluidos tibios."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "TXA: la ventana importa",
            "texto": "El ácido tranexámico estabiliza el coágulo inhibiendo la fibrinólisis. Administrado dentro de las primeras 3 horas del trauma reduce la mortalidad; después de ese tiempo puede ser perjudicial. El tiempo es un factor decisivo."
          }
        ],
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "titulo": "Trauma pélvico",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La fractura de pelvis inestable puede causar una hemorragia exsanguinante en el espacio retroperitoneal, que no se comprime con facilidad. El anillo pélvico roto aumenta su volumen y permite acumular grandes cantidades de sangre."
          },
          {
            "tipo": "pasos",
            "titulo": "Manejo de la pelvis inestable",
            "items": [
              "No balancear ni explorar repetidamente la pelvis si se sospecha fractura.",
              "Colocar una faja pélvica a la altura de los trocánteres mayores.",
              "La faja reduce el volumen pélvico y favorece el taponamiento del sangrado.",
              "Reanimación de control de daños y traslado a centro de trauma."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Faja a la altura correcta",
            "texto": "La faja pélvica debe colocarse sobre los trocánteres mayores, no sobre el ombligo. Una faja demasiado alta no cierra el anillo pélvico y resulta ineficaz para controlar el sangrado."
          }
        ],
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "titulo": "Trauma raquimedular",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La lesión medular puede ser primaria (por el trauma inicial) o secundaria (por hipoxia, hipotensión o movilización inadecuada). La meta prehospitalaria es prevenir la lesión secundaria y reconocer el shock neurogénico."
          },
          {
            "tipo": "lista",
            "titulo": "Shock neurogénico frente a shock medular",
            "items": [
              "Shock neurogénico: hipotensión con bradicardia por pérdida del tono simpático en lesiones altas.",
              "Shock medular: pérdida transitoria de reflejos y función por debajo de la lesión, no es un shock circulatorio.",
              "Manejo del neurogénico: líquidos, vasopresores y atropina para la bradicardia.",
              "Inmovilización selectiva segun criterios clínicos, evitando la restricción innecesaria."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Reanimación de control de daños",
            "texto": "El paciente con hemorragia grave se beneficia de una estrategia que combine hipotensión permisiva hasta el control quirúrgico, transfusión balanceada de hemoderivados, prevención de la triada letal (hipotermia, acidosis, coagulopatía) y ácido tranexámico dentro de las primeras 3 horas."
          }
        ],
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Primer paso del control de hemorragia externa",
        "reverso": "Presion directa firme y sostenida.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "En un paciente con amputación traumática y sangrado pulsátil masivo, ¿cuál es la primera prioridad?",
        "opciones": [
          "Asegurar la vía aérea",
          "Control del sangrado exsanguinante (torniquete)",
          "Canalizar dos vías",
          "Inmovilización cervical"
        ],
        "correcta": 1,
        "explicacion": "La \"X\" del XABCDE: la hemorragia exsanguinante se controla primero porque puede causar la muerte en minutos.",
        "procedencia": {
          "temaOriginal": "evaluacion-integral"
        }
      },
      {
        "pregunta": "Por que NO se debe aflojar un torniquete colocado por hemorragia masiva en el medio prehospitalario?",
        "opciones": [
          "Porque ya no sirve",
          "Porque se reanuda la hemorragia y se liberan metabolitos toxicos acumulados",
          "Porque duele menos apretado",
          "Porque pierde la hora de colocacion"
        ],
        "correcta": 1,
        "explicacion": "Aflojarlo reinicia el sangrado y libera de golpe acidos y potasio del territorio isquemico; se deja hasta el control definitivo hospitalario.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "pregunta": "En el shock hemorrágico, la reanimación hipotensiva busca:",
        "opciones": [
          "Normalizar la presión rápidamente con cristaloides",
          "Mantener una presión permisiva para no desprender el coágulo hasta el control quirúrgico",
          "Elevar la PAS sobre 140 mmHg",
          "Evitar todo aporte de líquidos"
        ],
        "correcta": 1,
        "explicacion": "Subir bruscamente la presión puede \"reventar el coágulo\" y aumentar el sangrado; se tolera una presión más baja hasta el control definitivo.",
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "pregunta": "El componente de la reanimación de control de daños que debe darse en las primeras 3 horas es:",
        "opciones": [
          "Antibióticos",
          "Ácido tranexámico",
          "Diuréticos",
          "Vasodilatadores"
        ],
        "correcta": 1,
        "explicacion": "El TXA reduce la mortalidad por hemorragia si se administra dentro de las primeras 3 horas; después puede ser perjudicial.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      }
    ]
  },
  "m3-va-mascarilla-laringea": {
    "secciones": [
      {
        "titulo": "Tipos de dispositivos",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Comparación de dispositivos supraglóticos",
            "headers": [
              "Dispositivo",
              "Mecanismo de sello",
              "Características"
            ],
            "filas": [
              [
                "Mascarilla laríngea (LMA)",
                "Manguito inflable que rodea la entrada laríngea",
                "El clásico; requiere inflar el balón con jeringa."
              ],
              [
                "i-gel",
                "Gel termoplástico que se amolda sin balón",
                "Colocación muy rápida, canal gástrico integrado, sin inflado."
              ],
              [
                "Tubo laríngeo (King LT)",
                "Dos balones: uno esofágico y uno faríngeo",
                "Sella esófago e hipofaringe; un solo punto de inflado."
              ],
              [
                "LMA de segunda generación",
                "Manguito con canal gástrico",
                "Permite drenar contenido gástrico y reducir aspiración."
              ]
            ]
          },
          {
            "tipo": "p",
            "texto": "Los dispositivos de segunda generación (i-gel y LMA con canal) incorporan un puerto para pasar una sonda gástrica, lo que disminuye el riesgo de regurgitación y aspiración, una ventaja relevante en pacientes con estómago lleno."
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Elección por tamaño",
            "texto": "El tamaño se elige por el peso del paciente y viene codificado por color en muchos dispositivos. Un dispositivo demasiado pequeño no sella; uno demasiado grande no se asienta. Tenga a la mano el de tamaño contiguo."
          }
        ],
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Mascarilla con reservorio",
        "definicion": "Entrega 60-95% de O₂ a 10-15 L/min en el paciente que respira.",
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "FiO₂ aproximada de una mascarilla con reservorio a 15 L/min",
        "reverso": "Entre 60% y 95% (cercana a 100% con buen sellado).",
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica"
        }
      },
      {
        "frente": "¿Para qué sirve la SDA?",
        "reverso": "Sedar con ketamina y preoxigenar al paciente agitado que no tolera la mascarilla.",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cuál de estos dispositivos se amolda a la laringe SIN necesidad de inflar un balón:",
        "opciones": [
          "Mascarilla laríngea clásica",
          "i-gel",
          "Tubo laríngeo King LT",
          "Tubo endotraqueal"
        ],
        "correcta": 1,
        "explicacion": "El i-gel emplea un gel termoplástico que se adapta con el calor corporal a la anatomía laríngea, lo que acelera su colocación.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      },
      {
        "pregunta": "La vía aérea quirúrgica de rescate en situación \"no intubable, no oxigenable\" es:",
        "opciones": [
          "Cánula orofaríngea",
          "Cricotiroidotomía",
          "Mascarilla laríngea",
          "Intubación nasotraqueal"
        ],
        "correcta": 1,
        "explicacion": "Ante CICO, la cricotiroidotomía a través de la membrana cricotiroidea es la vía de rescate definitiva.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      }
    ]
  },
  "m3-va-canulas-orofaringeas": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Contraindicación de la cánula nasofaríngea",
        "reverso": "Sospecha de fractura de base de cráneo.",
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "En sospecha de fractura de base de cráneo está contraindicada:",
        "opciones": [
          "La aspiración",
          "La cánula nasofaríngea",
          "La oxigenoterapia",
          "La tracción mandibular"
        ],
        "correcta": 1,
        "explicacion": "La cánula nasofaríngea puede penetrar a través de una fractura de base de cráneo; se evita ante esa sospecha.",
        "procedencia": {
          "temaOriginal": "oxigenoterapia-via-aerea-basica"
        }
      }
    ]
  },
  "m5-tcc-glasgow": {
    "secciones": [
      {
        "titulo": "Escala de coma de Glasgow",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La escala de coma de Glasgow (ECG) cuantifica el nivel de conciencia sumando tres componentes. El puntaje va de 3 (coma profundo) a 15 (normal). Siempre se reporta el desglose, no solo el total, porque guia decisiones de via aerea."
          },
          {
            "tipo": "tabla",
            "titulo": "Componentes de la escala de Glasgow",
            "headers": [
              "Respuesta ocular",
              "Respuesta verbal",
              "Respuesta motora"
            ],
            "filas": [
              [
                "4 Espontanea",
                "5 Orientada",
                "6 Obedece ordenes"
              ],
              [
                "3 A la voz",
                "4 Confusa",
                "5 Localiza el dolor"
              ],
              [
                "2 Al dolor",
                "3 Palabras inapropiadas",
                "4 Retira al dolor"
              ],
              [
                "1 Ninguna",
                "2 Sonidos incomprensibles",
                "3 Flexion anormal (decorticacion)"
              ],
              [
                "-",
                "1 Ninguna",
                "2 Extension anormal (descerebracion)"
              ],
              [
                "-",
                "-",
                "1 Ninguna"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Glasgow menor o igual a 8: intuba",
            "texto": "Un puntaje de 8 o menos indica incapacidad para proteger la via aerea. En el ambito basico, esto se traduce en colocar al paciente en posicion de seguridad, aspirar secreciones y prepararse para apoyo ventilatorio mientras llega el soporte avanzado."
          }
        ],
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "titulo": "Escala de Coma de Glasgow (adulto)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La escala de coma de Glasgow (ECG) cuantifica el nivel de conciencia sumando tres respuestas: ocular (1 a 4), verbal (1 a 5) y motora (1 a 6). El total va de 3 (coma profundo) a 15 (normal). Siempre se reporta DESGLOSADO (por ejemplo O3 V4 M5 = 12), porque el componente motor es el de mayor valor pronostico y un mismo total puede significar cosas distintas."
          },
          {
            "tipo": "tabla",
            "titulo": "Componentes de la escala de Glasgow",
            "headers": [
              "Respuesta ocular (O)",
              "Respuesta verbal (V)",
              "Respuesta motora (M)"
            ],
            "filas": [
              [
                "4 Espontanea",
                "5 Orientada",
                "6 Obedece ordenes"
              ],
              [
                "3 A la voz",
                "4 Confusa",
                "5 Localiza el dolor"
              ],
              [
                "2 Al dolor",
                "3 Palabras inapropiadas",
                "4 Retira al dolor"
              ],
              [
                "1 Ninguna",
                "2 Sonidos incomprensibles",
                "3 Flexion anormal (decorticacion)"
              ],
              [
                "—",
                "1 Ninguna",
                "2 Extension anormal (descerebracion)"
              ],
              [
                "—",
                "—",
                "1 Ninguna"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Glasgow menor o igual a 8: protege la via aerea",
            "texto": "Un puntaje de 8 o menos indica incapacidad para proteger la via aerea (riesgo de broncoaspiracion): es el umbral clasico para considerar intubacion. En el nivel basico significa posicion de seguridad, aspiracion y apoyo ventilatorio mientras llega el soporte avanzado."
          },
          {
            "tipo": "pasos",
            "titulo": "Ejemplo resuelto",
            "items": [
              "Abre los ojos al dolor → ocular = 2.",
              "Emite sonidos incomprensibles → verbal = 2.",
              "Retira al dolor → motora = 4.",
              "Total: 2 + 2 + 4 = 8. Se reporta O2 V2 M4 = 8 (umbral de via aerea no protegida)."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Trucos para evaluar bien",
            "texto": "Si el paciente esta intubado, la verbal se marca con \"T\" (por ejemplo O2 VT M4). Aplica el estimulo doloroso de forma central (presion en el trapecio o el reborde supraorbitario) para no confundir un reflejo medular con una respuesta real. Registra siempre el desglose y la hora para ver la tendencia."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Tabla de la escala de coma de Glasgow",
            "caption": "Escala de coma de Glasgow completa (ocular, verbal y motora) con su puntuacion.",
            "busqueda": "Glasgow coma scale chart eyes verbal motor scoring"
          }
        ],
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "titulo": "Fuentes y evidencia",
        "bloques": [
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "Glasgow Coma Scale — sitio oficial (estructura y uso)",
                "url": "https://www.glasgowcomascale.org/"
              },
              {
                "nombre": "PHTLS 10.ma edicion — Evaluacion del paciente",
                "nota": "AVDI, Glasgow y evaluacion primaria"
              },
              {
                "nombre": "Guias AHA / PALS — Evaluacion pediatrica y TEP",
                "url": "https://cpr.heart.org/"
              },
              {
                "nombre": "NAEMT — Evaluacion del estado mental (AEIOU-TIPS)",
                "nota": "Abordaje del estado mental alterado"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Escala de Glasgow",
        "definicion": "Escala de 3 a 15 que mide conciencia sumando respuesta ocular, verbal y motora.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "termino": "Escala de Glasgow",
        "definicion": "Escala de 3 a 15 que suma respuesta ocular (4), verbal (5) y motora (6); se reporta desglosada.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "termino": "PIRRL",
        "definicion": "Pupilas Iguales, Redondas y Reactivas a la Luz: hallazgo pupilar normal.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow",
          "porUnidad": true
        }
      },
      {
        "termino": "Escala de Cincinnati",
        "definicion": "Tamizaje de EVC: cara, brazos y lenguaje.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que mide la respuesta verbal en Glasgow y su maximo",
        "reverso": "Orientacion del lenguaje; maximo 5 puntos.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "frente": "Rango total de la escala de Glasgow",
        "reverso": "De 3 (coma profundo) a 15 (normal).",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "frente": "Puntajes maximos de cada componente del Glasgow",
        "reverso": "Ocular 4, Verbal 5, Motora 6.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "frente": "Nivel de AVDI que corresponde aproximadamente a un Glasgow de 8",
        "reverso": "D (responde solo al Dolor).",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "frente": "Componentes de la escala de Cincinnati",
        "reverso": "Asimetría facial, debilidad de brazos y alteración del lenguaje.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Escala de Glasgow de un paciente que abre ojos al dolor (2), emite sonidos incomprensibles (2) y retira al dolor (4):",
        "opciones": [
          "ECG 6",
          "ECG 8",
          "ECG 10",
          "ECG 12"
        ],
        "correcta": 1,
        "explicacion": "2 + 2 + 4 = 8. Un Glasgow de 8 marca el umbral de via aerea no protegida.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "pregunta": "Glasgow de un paciente que abre ojos a la voz (3), esta confuso (4) y obedece ordenes (6):",
        "opciones": [
          "ECG 11",
          "ECG 12",
          "ECG 13",
          "ECG 14"
        ],
        "correcta": 2,
        "explicacion": "3 + 4 + 6 = 13. Se reporta O3 V4 M6 = 13.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "pregunta": "Por que se reporta el Glasgow desglosado y no solo el total?",
        "opciones": [
          "Por costumbre",
          "Porque el componente motor tiene mayor valor pronostico y un mismo total puede significar cosas distintas",
          "Para ahorrar tiempo",
          "Porque el ocular es el mas importante"
        ],
        "correcta": 1,
        "explicacion": "El desglose (sobre todo la motora) aporta informacion pronostica que el total solo puede ocultar.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      }
    ]
  },
  "m6-emp-patologia-respiratoria-rn": {
    "secciones": [
      {
        "titulo": "Rangos normales por edad",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Los valores normales cambian con la edad: el recien nacido tiene FC y FR altas con TA baja, y conforme crece se acerca a los valores del adulto. Memorizar estos rangos evita alarmas falsas y permite detectar la verdadera anormalidad."
          },
          {
            "tipo": "tabla",
            "titulo": "Signos vitales normales por grupo de edad",
            "headers": [
              "Edad",
              "FC (lpm)",
              "FR (rpm)",
              "TA sistolica (mmHg)"
            ],
            "filas": [
              [
                "Recien nacido",
                "120 a 160",
                "40 a 60",
                "60 a 90"
              ],
              [
                "Lactante (1 a 12 meses)",
                "100 a 150",
                "25 a 40",
                "70 a 95"
              ],
              [
                "Preescolar (1 a 5 años)",
                "80 a 140",
                "20 a 30",
                "80 a 100"
              ],
              [
                "Escolar (6 a 12 años)",
                "70 a 120",
                "18 a 25",
                "80 a 110"
              ],
              [
                "Adolescente",
                "60 a 100",
                "12 a 20",
                "90 a 120"
              ],
              [
                "Adulto",
                "60 a 100",
                "12 a 20",
                "90 a 140"
              ],
              [
                "Adulto mayor",
                "60 a 100",
                "12 a 20",
                "Tiende a elevarse"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Formula pediatrica de TA minima",
            "texto": "En niños de 1 a 10 años, la sistolica minima aceptable se estima asi: 70 + (2 x edad en años). Por debajo de ese valor, sospecha hipotension y shock descompensado."
          }
        ],
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "titulo": "Reanimacion neonatal y APGAR",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Tras el nacimiento, la mayoria de los recien nacidos solo requieren secado, calor y estimulacion. La transicion clave es lograr una ventilacion eficaz; la causa mas frecuente de compromiso neonatal es la dificultad para iniciar la respiracion."
          },
          {
            "tipo": "pasos",
            "titulo": "Pasos iniciales de la reanimacion neonatal",
            "items": [
              "Proporcionar calor, secar y estimular; despejar la via aerea si es necesario.",
              "Si no respira o la frecuencia cardiaca es menor a 100: ventilacion con presion positiva.",
              "Si la frecuencia cardiaca es menor a 60 pese a ventilacion adecuada: compresiones torabicas.",
              "Si persiste menor a 60: adrenalina y considerar causas reversibles."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Puntuacion de APGAR (cada parametro 0, 1 o 2)",
            "headers": [
              "Parametro",
              "0",
              "2"
            ],
            "filas": [
              [
                "Aspecto (color)",
                "Cianotico o palido",
                "Rosado completo"
              ],
              [
                "Pulso (frecuencia cardiaca)",
                "Ausente",
                "Mayor a 100"
              ],
              [
                "Gesto (irritabilidad refleja)",
                "Sin respuesta",
                "Llanto, tos o estornudo"
              ],
              [
                "Actividad (tono muscular)",
                "Flacido",
                "Movimientos activos"
              ],
              [
                "Respiracion",
                "Ausente",
                "Llanto vigoroso"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Como usar el APGAR",
            "texto": "El APGAR se valora al minuto y a los cinco minutos de vida y describe la transicion del recien nacido. No se usa para decidir si iniciar la reanimacion (esa decision es inmediata segun respiracion y frecuencia cardiaca), sino para evaluar la respuesta."
          }
        ],
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "APGAR",
        "definicion": "Puntuacion que evalua la transicion del recien nacido al minuto y a los cinco minutos.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Un recien nacido a los 5 minutos tiene frecuencia cardiaca mayor a 100, llanto vigoroso, movimientos activos, responde a estimulos pero con cianosis distal. Su APGAR aproximado es:",
        "opciones": [
          "10",
          "9",
          "5",
          "3"
        ],
        "correcta": 1,
        "explicacion": "Pierde un punto por el color (acrocianosis), obteniendo 2 en los otros cuatro parametros, para un total de 9.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ]
  },
  "m1-pai-signos-vitales": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Llenado capilar",
        "definicion": "Tiempo de retorno del color tras presionar el lecho ungueal; normal hasta 2 segundos.",
        "procedencia": {
          "temaOriginal": "signos-vitales",
          "porUnidad": true
        }
      },
      {
        "termino": "Ruidos de Korotkoff",
        "definicion": "Sonidos auscultados al desinflar el manguito que definen la sistolica y la diastolica.",
        "procedencia": {
          "temaOriginal": "signos-vitales",
          "porUnidad": true
        }
      },
      {
        "termino": "Carboxihemoglobina",
        "definicion": "Hemoglobina unida a monoxido de carbono; engaña al pulsioximetro dando SpO2 falsamente alta.",
        "procedencia": {
          "temaOriginal": "signos-vitales",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Como se calcula la PAM",
        "reverso": "PAD + (PAS - PAD) dividido entre 3.",
        "procedencia": {
          "temaOriginal": "signos-vitales",
          "porUnidad": true
        }
      },
      {
        "frente": "Llenado capilar normal",
        "reverso": "Menor o igual a 2 segundos.",
        "procedencia": {
          "temaOriginal": "signos-vitales",
          "porUnidad": true
        }
      },
      {
        "frente": "TA sistolica minima en un niño de 6 años",
        "reverso": "70 + (2 x 6) = 82 mmHg.",
        "procedencia": {
          "temaOriginal": "signos-vitales",
          "porUnidad": true
        }
      },
      {
        "frente": "Pulso de eleccion en el lactante",
        "reverso": "Braquial.",
        "procedencia": {
          "temaOriginal": "signos-vitales",
          "porUnidad": true
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual es el primer paso al llegar a un choque vehicular?",
        "opciones": [
          "Tomar signos vitales",
          "Evaluar la seguridad de la escena",
          "Inmovilizar la columna",
          "Canalizar una via"
        ],
        "correcta": 1,
        "explicacion": "La atencion del trauma comienza con la evaluacion de la escena: garantizar la seguridad antes de acercarse al paciente.",
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      }
    ]
  },
  "m4-tox-toxindromes": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Hidroxocobalamina",
        "definicion": "Antídoto de elección en la intoxicación por cianuro.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "termino": "HIET",
        "definicion": "Insulina 1 U/kg bolo + 1-10 U/kg/h con dextrosa: inotrópico en intoxicación por CCB/BB.",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Por que la oximetria miente en intoxicacion por CO",
        "reverso": "La carboxihemoglobina se confunde con oxihemoglobina y da SpO2 falsamente alta.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      },
      {
        "frente": "Antídoto del toxidrome opiáceo",
        "reverso": "Naloxona (antagonista de receptores opioides).",
        "procedencia": {
          "temaOriginal": "farmacologia-toxicologia",
          "porUnidad": true
        }
      },
      {
        "frente": "Por qué la SpO2 engaña en intoxicación por CO",
        "reverso": "No distingue la carboxihemoglobina de la oxihemoglobina y marca valores falsamente normales.",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "frente": "Antídoto de la intoxicación por cianuro",
        "reverso": "Hidroxocobalamina.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "frente": "Tratamiento de la intoxicación por monóxido de carbono",
        "reverso": "Oxígeno al 100 por ciento; considerar cámara hiperbárica.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "frente": "¿Por qué engaña el pulsioxímetro en la intoxicación por CO?",
        "reverso": "No distingue la carboxihemoglobina de la oxihemoglobina; muestra SpO2 falsamente normal.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "frente": "Antídoto de la toxicidad por magnesio",
        "reverso": "Gluconato de calcio IV.",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas",
          "porUnidad": true
        }
      },
      {
        "frente": "Antidoto de la toxicidad por sulfato de magnesio",
        "reverso": "El gluconato de calcio.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal",
          "porUnidad": true
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Mujer encontrada inconsciente con pupilas puntiformes y respiracion de 6 por minuto. La causa reversible inmediata a tratar es:",
        "opciones": [
          "Intoxicacion por opioides (dar naloxona)",
          "Evento vascular cerebral",
          "Crisis hipertensiva",
          "Sepsis"
        ],
        "correcta": 0,
        "explicacion": "Miosis puntiforme + bradipnea + coma es el toxidrome opioide; la naloxona titulada restaura la ventilacion.",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "pregunta": "Un paciente rescatado de un incendio en espacio cerrado presenta SpO2 de 99% pero confusión y cefalea. Lo más probable es:",
        "opciones": [
          "Estado de oxigenación óptimo",
          "Intoxicación por monóxido de carbono con oximetría falsamente normal",
          "Hiperventilación",
          "Crisis de ansiedad"
        ],
        "correcta": 1,
        "explicacion": "El oxímetro no distingue la carboxihemoglobina de la oxihemoglobina, por lo que en intoxicación por CO marca valores normales pese a la hipoxia tisular.",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "pregunta": "En un rescatado de un incendio en espacio cerrado, el pulsioxímetro marca 98 por ciento pero el paciente está confuso. La causa probable es:",
        "opciones": [
          "Ansiedad",
          "Intoxicación por monóxido de carbono",
          "Hipoglucemia",
          "Deshidratación"
        ],
        "correcta": 1,
        "explicacion": "El pulsioxímetro no detecta la carboxihemoglobina y puede mostrar SpO2 normal pese a hipoxia grave por CO.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "pregunta": "Cual es una indicacion URGENTE de dialisis segun la regla AEIOU:",
        "opciones": [
          "Creatinina elevada estable",
          "Hiperpotasemia refractaria",
          "Proteinuria leve",
          "Anemia cronica"
        ],
        "correcta": 1,
        "explicacion": "La hiperpotasemia refractaria es la E de AEIOU; otras son acidosis grave, intoxicaciones, sobrecarga de volumen y uremia sintomatica.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      }
    ]
  },
  "m4-neu-cefalea-migrana": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "EVC hemorrágico",
        "definicion": "Rotura de un vaso; cefalea súbita y deterioro rápido.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      }
    ],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Un rescatista encuentra a un bombero rescatado de un incendio con SpO2 de 99% pero confuso y con cefalea. Lo correcto es:",
        "opciones": [
          "Confiar en la SpO2 y no dar oxigeno",
          "Sospechar intoxicacion por CO y administrar oxigeno a alto flujo",
          "Suspender oxigeno por riesgo de toxicidad",
          "Solo vigilar"
        ],
        "correcta": 1,
        "explicacion": "En exposicion a humo, la SpO2 normal puede ser falsa por carboxihemoglobina. Los sintomas neurologicos obligan a dar oxigeno a alto flujo.",
        "procedencia": {
          "temaOriginal": "signos-vitales"
        }
      }
    ]
  },
  "m1-pab-dea": {
    "secciones": [
      {
        "titulo": "Desfibrilador externo automatico (DEA)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El DEA analiza el ritmo cardiaco y, si detecta un ritmo desfibrilable (fibrilacion ventricular o taquicardia ventricular sin pulso), entrega una descarga que despolariza el corazon para permitir que el marcapasos natural reinicie un ritmo organizado."
          },
          {
            "tipo": "pasos",
            "titulo": "Uso del DEA",
            "items": [
              "Enciende el equipo y sigue las instrucciones de voz.",
              "Coloca los parches en torax desnudo y seco: uno infraclavicular derecho y otro en linea axilar media izquierda.",
              "Aleja a todos y permite que el equipo analice el ritmo sin tocar al paciente.",
              "Si indica descarga, asegurate de que nadie toque al paciente y oprime el boton.",
              "Reanuda compresiones de inmediato tras la descarga durante 2 minutos antes del siguiente analisis."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Consideraciones especiales con el DEA",
            "headers": [
              "Situacion",
              "Conducta"
            ],
            "filas": [
              [
                "Torax mojado",
                "Secar antes de colocar parches"
              ],
              [
                "Vello toracico abundante",
                "Rasurar o usar segundo juego de parches para depilar"
              ],
              [
                "Parche de medicamento transdermico",
                "Retirar y limpiar la piel"
              ],
              [
                "Marcapasos o desfibrilador implantado",
                "Colocar el parche al menos a 2.5 cm del dispositivo"
              ],
              [
                "Paciente pediatrico",
                "Usar parches y atenuador pediatricos si estan disponibles"
              ],
              [
                "Superficie metalica o agua",
                "Mover al paciente a superficie seca y no conductora"
              ]
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": []
  },
  "m6-svp-rcp-neonatal": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Cada cuanto se cambia de compresor",
        "reverso": "Cada 2 minutos para evitar la fatiga.",
        "procedencia": {
          "temaOriginal": "svb-rcp",
          "porUnidad": true
        }
      },
      {
        "frente": "Paso mas importante de la reanimacion neonatal",
        "reverso": "Lograr una ventilacion eficaz.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      },
      {
        "frente": "Volumen del bolo de reanimacion pediatrico estandar",
        "reverso": "20 mL/kg de cristaloide isotonico, reevaluando entre bolos.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Una contraindicación absoluta para colocar un acceso intraóseo en un hueso es:",
        "opciones": [
          "Paciente pediátrico",
          "Fractura de ese hueso",
          "Necesidad de fármacos en paro",
          "Mala perfusión periférica"
        ],
        "correcta": 1,
        "explicacion": "En un hueso fracturado el líquido se extravasaría; debe elegirse otro sitio.",
        "procedencia": {
          "temaOriginal": "terapia-iv-io"
        }
      },
      {
        "pregunta": "Durante la reanimacion neonatal, las compresiones toracicas se inician cuando la frecuencia cardiaca:",
        "opciones": [
          "Es menor a 100 pese a estimulacion",
          "Es menor a 60 pese a ventilacion adecuada",
          "Es mayor a 100",
          "Es exactamente 80"
        ],
        "correcta": 1,
        "explicacion": "Las compresiones se inician si la frecuencia cardiaca permanece menor a 60 pese a una ventilacion con presion positiva adecuada.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ]
  },
  "m3-md-uso-monitor": {
    "secciones": [
      {
        "titulo": "Filosofía de la monitorización",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Ningún monitor reemplaza la valoración del paciente; lo complementa. Un número anormal en un paciente que se ve bien obliga a descartar artefacto antes de actuar, y un número normal nunca debe tranquilizar frente a un paciente que se deteriora."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Trate al paciente, no al monitor",
            "texto": "Si la SpO2 marca 85% pero el paciente está rosado, alerta y sin disnea, sospeche un artefacto (mala perfusión, movimiento, esmalte de uñas) antes de inundar de oxígeno o intervenir."
          }
        ],
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "titulo": "Ritmos desfibrilables: FV y TVSP",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La fibrilación ventricular (FV) y la taquicardia ventricular sin pulso (TVSP) responden a la desfibrilación. La energía entregada interrumpe la actividad eléctrica caótica para permitir que el nodo sinusal reasuma el control. Cada minuto de retraso en la desfibrilación reduce la probabilidad de supervivencia entre 7 y 10 por ciento."
          },
          {
            "tipo": "pasos",
            "titulo": "Algoritmo del ritmo desfibrilable",
            "items": [
              "Confirmar FV o TVSP en el monitor y desfibrilar de inmediato (bifásico 120 a 200 J segun fabricante, o 360 J monofásico).",
              "Reanudar RCP de inmediato durante 2 minutos sin verificar pulso.",
              "Establecer acceso IV o IO y vía aérea avanzada sin interrumpir compresiones.",
              "Tras la segunda descarga, administrar adrenalina 1 mg cada 3 a 5 minutos.",
              "Tras la tercera descarga, administrar amiodarona 300 mg en bolo (segunda dosis 150 mg) o lidocaína 1 a 1.5 mg/kg.",
              "Analizar el ritmo cada 2 minutos; desfibrilar si persiste el ritmo desfibrilable.",
              "Buscar y corregir causas reversibles (H y T) en paralelo."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Carga durante las compresiones",
            "texto": "Cargue el desfibrilador mientras continúan las compresiones y solo deténgalas en el instante exacto de la descarga. Esto reduce la pausa preshock a menos de 5 segundos y mejora la probabilidad de éxito de la desfibrilación."
          }
        ],
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Ubicacion de los parches del DEA en el adulto",
        "reverso": "Infraclavicular derecho y linea axilar media izquierda.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "frente": "Diferencia entre cardioversión y desfibrilación",
        "reverso": "La cardioversión es sincronizada sobre la R; la desfibrilación es no sincronizada.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un paciente tiene un parche transdermico de nitroglicerina en el torax donde va el parche del DEA. Que haces?",
        "opciones": [
          "Colocar el parche del DEA encima",
          "Retirar el parche de medicamento y limpiar la piel antes",
          "No usar el DEA",
          "Cambiar la posicion del parche a la espalda"
        ],
        "correcta": 1,
        "explicacion": "El parche de medicamento puede causar quemaduras y dispersar la energia; se retira y se limpia la piel antes de colocar el parche del DEA.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "pregunta": "La intervención que más impacta la supervivencia en FV es:",
        "opciones": [
          "La adrenalina temprana",
          "La intubación inmediata",
          "La desfibrilación temprana con compresiones de calidad",
          "La amiodarona"
        ],
        "correcta": 2,
        "explicacion": "Cada minuto de retraso en la desfibrilación reduce la supervivencia 7 a 10 por ciento; las compresiones de calidad mantienen perfusión entre descargas.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "pregunta": "En una TV polimórfica inestable (torsades), la descarga eléctrica debe ser:",
        "opciones": [
          "Cardioversión sincronizada a 50 J",
          "Desfibrilación no sincronizada",
          "Cardioversión sincronizada a 200 J",
          "No requiere descarga"
        ],
        "correcta": 1,
        "explicacion": "En la polimórfica el equipo no identifica la R de forma fiable; se desfibrila como en FV.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      }
    ]
  },
  "m1-pai-rcp-pediatrico": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Maniobra de desobstruccion en el lactante",
        "reverso": "5 golpes interescapulares alternados con 5 compresiones toracicas.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      }
    ],
    "quiz": []
  },
  "m3-md-ecg-basica": {
    "secciones": [
      {
        "titulo": "Ritmos no desfibrilables: AESP y asistolia",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La actividad eléctrica sin pulso (AESP) es la presencia de actividad eléctrica organizada en el monitor sin pulso palpable. La asistolia es la ausencia total de actividad eléctrica. Ninguno responde a la desfibrilación; el tratamiento es RCP de alta calidad, adrenalina temprana y la búsqueda agresiva de la causa."
          },
          {
            "tipo": "pasos",
            "titulo": "Algoritmo del ritmo no desfibrilable",
            "items": [
              "Continuar RCP de alta calidad sin interrupciones.",
              "Administrar adrenalina 1 mg lo antes posible y repetir cada 3 a 5 minutos.",
              "Obtener vía aérea avanzada y capnografía.",
              "Analizar el ritmo cada 2 minutos; si aparece ritmo desfibrilable, pasar al algoritmo correspondiente.",
              "Identificar y tratar las causas reversibles (H y T): este es el determinante principal del resultado."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Confirmar la asistolia",
            "texto": "Antes de etiquetar asistolia verifica el protocolo de la línea plana: comprueba conexiones de electrodos, aumenta la ganancia y confirma en una segunda derivación. Una FV fina puede simular asistolia, y el tratamiento de una y otra es opuesto."
          }
        ],
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Onda P",
        "definicion": "Deflexión que representa la despolarización de las aurículas.",
        "procedencia": {
          "temaOriginal": "ecg-basico",
          "porUnidad": true
        }
      },
      {
        "termino": "Complejo QRS",
        "definicion": "Conjunto de ondas que representa la despolarización de los ventrículos.",
        "procedencia": {
          "temaOriginal": "ecg-basico",
          "porUnidad": true
        }
      },
      {
        "termino": "Intervalo PR",
        "definicion": "Tiempo desde el inicio de la P hasta el inicio del QRS; refleja la conducción aurícula-ventrículo.",
        "procedencia": {
          "temaOriginal": "ecg-basico",
          "porUnidad": true
        }
      },
      {
        "termino": "Segmento ST",
        "definicion": "Tramo entre el QRS y la onda T; su elevación o descenso indica isquemia o lesión.",
        "procedencia": {
          "temaOriginal": "ecg-basico",
          "porUnidad": true
        }
      },
      {
        "termino": "Eje eléctrico",
        "definicion": "Dirección promedio de la despolarización ventricular en el plano frontal.",
        "procedencia": {
          "temaOriginal": "ecg-basico",
          "porUnidad": true
        }
      },
      {
        "termino": "Cambios recíprocos",
        "definicion": "Descenso del ST en derivaciones opuestas a una zona de lesión; refuerzan el diagnóstico.",
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      },
      {
        "termino": "FV/TVSP",
        "definicion": "Ritmos desfibrilables; el tratamiento prioritario es la descarga eléctrica temprana.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "termino": "Adrenalina en paro",
        "definicion": "1 mg IV/IO cada 3 a 5 minutos en cualquier ritmo de paro.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Qué representa la onda P",
        "reverso": "La despolarización de las aurículas.",
        "procedencia": {
          "temaOriginal": "ecg-basico",
          "porUnidad": true
        }
      },
      {
        "frente": "Valor normal del intervalo PR",
        "reverso": "0.12 a 0.20 segundos (3 a 5 cuadros pequeños).",
        "procedencia": {
          "temaOriginal": "ecg-basico",
          "porUnidad": true
        }
      },
      {
        "frente": "Duración normal del QRS",
        "reverso": "Menor de 0.12 segundos (menos de 3 cuadros pequeños).",
        "procedencia": {
          "temaOriginal": "ecg-basico",
          "porUnidad": true
        }
      },
      {
        "frente": "Método de los cuadros grandes para la FC",
        "reverso": "Dividir 300 entre el número de cuadros grandes entre dos R.",
        "procedencia": {
          "temaOriginal": "ecg-basico",
          "porUnidad": true
        }
      },
      {
        "frente": "Método de los 6 segundos",
        "reverso": "Contar los QRS en 6 segundos (30 cuadros grandes) y multiplicar por 10.",
        "procedencia": {
          "temaOriginal": "ecg-basico",
          "porUnidad": true
        }
      },
      {
        "frente": "Derivaciones de la cara inferior",
        "reverso": "DII, DIII y aVF (coronaria derecha).",
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      },
      {
        "frente": "Eje normal según DI y aVF",
        "reverso": "QRS positivo en DI y positivo en aVF.",
        "procedencia": {
          "temaOriginal": "ecg-basico",
          "porUnidad": true
        }
      },
      {
        "frente": "A qué velocidad corre el papel del ECG",
        "reverso": "A 25 mm/s; cada cuadro pequeño es 0.04 s.",
        "procedencia": {
          "temaOriginal": "ecg-basico",
          "porUnidad": true
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Despues de que el DEA entrega una descarga, lo correcto es:",
        "opciones": [
          "Reanalizar el ritmo de inmediato",
          "Verificar pulso 30 segundos",
          "Reanudar compresiones de inmediato por 2 minutos",
          "Dar 5 ventilaciones"
        ],
        "correcta": 2,
        "explicacion": "Tras la descarga se reanudan las compresiones de inmediato durante 2 minutos antes del siguiente analisis, para no perder presion de perfusion coronaria.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "pregunta": "Cada cuadro pequeño del papel del ECG, a velocidad estándar, equivale a:",
        "opciones": [
          "0.04 segundos",
          "0.20 segundos",
          "1 segundo",
          "0.5 segundos"
        ],
        "correcta": 0,
        "explicacion": "A 25 mm/s, cada cuadro pequeño (1 mm) equivale a 0.04 s y cada cuadro grande (5 mm) a 0.20 s.",
        "procedencia": {
          "temaOriginal": "ecg-basico",
          "porUnidad": true
        }
      },
      {
        "pregunta": "Durante una RCP, el monitor muestra una línea plana. ¿Qué debe hacer antes de declarar asistolia?",
        "opciones": [
          "Desfibrilar de inmediato",
          "Verificar electrodos, aumentar la ganancia y confirmar en otra derivación",
          "Administrar amiodarona",
          "Suspender la reanimación"
        ],
        "correcta": 1,
        "explicacion": "Una FV fina puede simular una línea plana. Confirmar el protocolo de asistolia evita no desfibrilar a un ritmo realmente desfibrilable.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      }
    ]
  },
  "m5-ta-abdomen-agudo": {
    "secciones": [
      {
        "titulo": "Arañas: viuda negra y violinista",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Latrodectismo vs. loxoscelismo",
            "headers": [
              "Araña",
              "Cuadro",
              "Manejo"
            ],
            "filas": [
              [
                "Viuda negra (Latrodectus)",
                "Latrodectismo: dolor intenso, calambres, rigidez abdominal, diaforesis, hipertensión",
                "Analgesia, benzodiacepinas; faboterápico Aracmyn en casos graves"
              ],
              [
                "Violinista/reclusa (Loxosceles)",
                "Loxoscelismo: lesión cutánea necrótica; rara vez hemólisis sistémica",
                "Cuidado de la herida; vigilar forma sistémica"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "La rigidez abdominal de la viuda negra confunde",
            "texto": "El latrodectismo puede simular un abdomen agudo por la rigidez y el dolor. El antecedente de picadura y la diaforesis localizada orientan. El loxoscelismo, en cambio, evoluciona como una úlcera necrótica que crece en días."
          },
          {
            "tipo": "imagen",
            "src": "https://commons.wikimedia.org/wiki/Special:FilePath/Latrodectus_mactans_eating.JPG?width=720",
            "alt": "Araña viuda negra (Latrodectus mactans)",
            "caption": "Viuda negra (Latrodectus mactans): mancha roja en reloj de arena en el abdomen.",
            "fuente": "Wikimedia Commons",
            "fuenteUrl": "https://commons.wikimedia.org/wiki/File:Latrodectus_mactans_eating.JPG",
            "busqueda": "Latrodectus mactans viuda negra"
          }
        ],
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Abdomen agudo",
        "definicion": "Dolor abdominal grave con signos peritoneales que sugiere urgencia quirurgica.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "termino": "Latrodectismo",
        "definicion": "Viuda negra: dolor, calambres y rigidez abdominal; faboterápico Aracmyn en casos graves.",
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      },
      {
        "termino": "Encefalopatia hepatica",
        "definicion": "Alteracion mental por amonio en la falla hepatica; cursa con asterixis.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cuadro típico de la viuda negra",
        "reverso": "Latrodectismo: dolor, calambres, rigidez abdominal y diaforesis.",
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "En una mujer embarazada que se atraganta y no puede hablar, la maniobra adecuada es:",
        "opciones": [
          "Compresiones abdominales (Heimlich)",
          "Compresiones toracicas",
          "Golpes en la espalda solamente",
          "No intervenir hasta que pierda la conciencia"
        ],
        "correcta": 1,
        "explicacion": "En embarazadas y personas obesas se usan compresiones toracicas, ya que el abdomen gravido impide la maniobra abdominal segura.",
        "procedencia": {
          "temaOriginal": "svb-rcp"
        }
      },
      {
        "pregunta": "Un paciente con abdomen rigido en tabla, dolor intenso y signos de shock requiere:",
        "opciones": [
          "Alimento para mejorar",
          "Traslado urgente sin dar nada por via oral",
          "Laxante",
          "Observacion en casa 24 horas"
        ],
        "correcta": 1,
        "explicacion": "El abdomen rigido con datos peritoneales y shock indica abdomen agudo quirurgico; se traslada con urgencia y no se da nada por boca.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      }
    ]
  },
  "m5-hs-tipos-hemorragias": {
    "secciones": [
      {
        "titulo": "Tipos de hemorragia",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La hemorragia puede ser externa (visible) o interna (oculta y peligrosa). Segun el vaso afectado, tiene caracteristicas distintas que orientan su gravedad."
          },
          {
            "tipo": "tabla",
            "titulo": "Clasificacion por origen vascular",
            "headers": [
              "Tipo",
              "Caracteristicas",
              "Gravedad"
            ],
            "filas": [
              [
                "Arterial",
                "Sangre roja brillante que sale a chorros pulsatiles",
                "La mas grave, dificil de controlar"
              ],
              [
                "Venosa",
                "Sangre roja oscura, flujo continuo y constante",
                "Moderada a grave segun el vaso"
              ],
              [
                "Capilar",
                "Rezumamiento lento en sabana",
                "Leve, suele autolimitarse"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Sitios de hemorragia interna oculta peligrosa",
            "items": [
              "Torax: cada hemitorax aloja gran volumen sanguineo.",
              "Abdomen: el bazo y el higado sangran de forma masiva.",
              "Pelvis: las fracturas pueden producir hemorragia exsanguinante.",
              "Femur: una fractura cerrada puede perder mas de un litro de sangre.",
              "Retroperitoneo: sangrado silencioso de dificil deteccion."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "La hemorragia interna engaña",
            "texto": "No hay sangre visible, pero el paciente entra en shock. Sospechala ante un mecanismo de alta energia con taquicardia, palidez y deterioro progresivo sin una causa externa evidente."
          }
        ],
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "titulo": "Hemorragia digestiva",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Alta vs baja",
            "headers": [
              "Rasgo",
              "Alta (sobre Treitz)",
              "Baja (bajo Treitz)"
            ],
            "filas": [
              [
                "Presentacion",
                "Hematemesis, melena",
                "Hematoquecia, rectorragia"
              ],
              [
                "Causas",
                "Ulcera peptica, varices, Mallory-Weiss",
                "Diverticulos, angiodisplasia, neoplasia, hemorroides"
              ],
              [
                "Estudio",
                "Endoscopia alta",
                "Colonoscopia"
              ]
            ]
          },
          {
            "tipo": "pasos",
            "titulo": "Manejo inicial",
            "items": [
              "Valorar estado hemodinamico (ABC) y colocar dos accesos venosos de grueso calibre.",
              "Reposicion de volumen y transfusion segun necesidad.",
              "Inhibidor de bomba de protones intravenoso si se sospecha origen ulceroso.",
              "En sospecha de varices: octreotido y antibiotico profilactico.",
              "Endoscopia diagnostica y terapeutica una vez estabilizado."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Melena vs hematoquecia",
            "texto": "La melena (heces negras y malolientes) sugiere sangrado alto digerido. La hematoquecia (sangre roja por el recto) suele ser baja, pero una hemorragia alta muy abundante y rapida tambien puede manifestarse como hematoquecia."
          }
        ],
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      },
      {
        "titulo": "La espiral de la muerte y el ácido tranexámico",
        "bloques": [
          {
            "tipo": "p",
            "texto": "En el trauma grave, tres factores se retroalimentan y matan: hipotermia, acidosis y coagulopatía (la \"tríada letal\"). La hipocalcemia se reconoce hoy como cuarto vértice (el \"diamante de la muerte\"), porque el calcio es imprescindible para la coagulación y la contracción cardíaca."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Del triángulo al diamante",
            "texto": "Hipotermia → enzimas de la coagulación lentas. Acidosis → factores disfuncionales. Coagulopatía → más sangrado → más transfusión → más dilución, más frío y más hipocalcemia. Romper cualquier vértice (calentar, controlar hemorragia, dar calcio, antifibrinolítico) ayuda a cerrar el círculo."
          },
          {
            "tipo": "tabla",
            "titulo": "Ácido tranexámico (TXA) en trauma",
            "headers": [
              "Protocolo",
              "Dosis",
              "Evidencia"
            ],
            "filas": [
              [
                "Civil (CRASH-2)",
                "1 g IV en 10 min + 1 g en 8 h",
                "Mortalidad menor si se da <3 h (mejor <1 h)"
              ],
              [
                "TCE (CRASH-3)",
                "1 g en 10 min + 1 g en 8 h, <3 h",
                "Menos muerte por TCE leve-moderado"
              ],
              [
                "Militar (TCCC)",
                "2 g IV en bolo lento",
                "Simplifica la dosis en combate"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "TXA: la ventana de 3 horas",
            "texto": "El TXA estabiliza el coágulo inhibiendo la fibrinólisis. Su beneficio depende del tiempo: máximo en la primera hora y nulo o perjudicial pasadas las 3 h del traumatismo. Por eso es una intervención prehospitalaria de alto valor: darlo pronto."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Triángulo/diamante de la muerte en trauma",
            "caption": "Tríada letal (hipotermia, acidosis, coagulopatía) y su evolución al diamante de la muerte con la hipocalcemia.",
            "busqueda": "trauma lethal triad diamond hypothermia acidosis coagulopathy hypocalcemia"
          }
        ],
        "procedencia": {
          "temaOriginal": "trauma-coagulopatia-hemorragia-obstetrica"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Hemorragia arterial",
        "definicion": "Sangrado rojo brillante y pulsatil; el mas grave y dificil de controlar.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "termino": "Torniquete",
        "definicion": "Dispositivo proximal que detiene el flujo arterial en hemorragia exsanguinante de extremidad.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Por que NO se afloja un torniquete en campo",
        "reverso": "Reanudar el flujo provoca nueva hemorragia y libera metabolitos toxicos.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "frente": "¿Qué se trata en la zona caliente del TECC?",
        "reverso": "Solo la hemorragia masiva (torniquete), antes de mover a la víctima a cubierto.",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual es la conducta correcta ante una hemorragia exsanguinante en el antebrazo que no cede a la presion directa?",
        "opciones": [
          "Elevar el brazo y esperar",
          "Colocar un torniquete proximal a la herida",
          "Aplicar hielo",
          "Suturar de inmediato"
        ],
        "correcta": 1,
        "explicacion": "Ante hemorragia que amenaza la vida en una extremidad y que no cede a la presion, se coloca torniquete proximal sin demora.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "pregunta": "En un trauma cerrado con hipotensión persistente y sin sangrado externo, la sospecha principal es:",
        "opciones": [
          "Deshidratación",
          "Hemorragia abdominal o pélvica oculta",
          "Reacción vagal",
          "Hipoglucemia"
        ],
        "correcta": 1,
        "explicacion": "El shock sin foco externo en el trauma cerrado obliga a buscar hemorragia interna, sobre todo abdominal o pélvica.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "pregunta": "Un inhibidor potente del CYP450 administrado junto con warfarina probablemente:",
        "opciones": [
          "Disminuye el INR",
          "Aumenta el INR y el riesgo de sangrado",
          "No afecta la warfarina",
          "Inactiva la warfarina"
        ],
        "correcta": 1,
        "explicacion": "Al inhibir su metabolismo, la concentracion de warfarina sube, prolongando el INR y aumentando el riesgo de hemorragia.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      }
    ]
  },
  "m5-hs-fisiopatologia": {
    "secciones": [
      {
        "titulo": "Fisiopatologia del shock",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El shock es un estado de hipoperfusion tisular: las celulas no reciben suficiente oxigeno para su metabolismo. Sin oxigeno, la celula pasa a metabolismo anaerobio, produce acido lactico y, si no se corrige, muere. El shock es un proceso, no un numero de presion."
          },
          {
            "tipo": "diagrama",
            "clave": "shock"
          },
          {
            "tipo": "lista",
            "titulo": "Tipos de shock (clasificacion general)",
            "items": [
              "Hipovolemico: perdida de volumen (hemorragia, deshidratacion).",
              "Cardiogenico: falla de la bomba cardiaca (infarto extenso).",
              "Distributivo: vasodilatacion masiva (septico, anafilactico, neurogenico).",
              "Obstructivo: obstaculo al flujo (neumotorax a tension, taponamiento, embolia pulmonar)."
            ]
          },
          {
            "tipo": "formula",
            "texto": "Aporte de oxigeno = Gasto cardiaco x Contenido arterial de oxigeno",
            "nota": "Cualquier caida del gasto cardiaco o del contenido de oxigeno reduce el aporte tisular y desencadena shock."
          }
        ],
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "titulo": "Fisiopatología de la placa",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La aterosclerosis es un proceso inflamatorio crónico. La placa vulnerable no es necesariamente la más estenótica, sino la que tiene un núcleo lipídico grande y una cápsula fibrosa delgada. Su rotura expone material trombogénico que activa plaquetas y la cascada de coagulación, formando un trombo que reduce o interrumpe el flujo."
          },
          {
            "tipo": "lista",
            "titulo": "Del flujo reducido al infarto",
            "items": [
              "Trombo no oclusivo: limita el flujo y causa isquemia subendocárdica (SICASEST).",
              "Trombo oclusivo total y persistente: isquemia transmural (IAMCEST).",
              "La isquemia prolongada provoca necrosis que avanza del subendocardio al epicardio.",
              "El tiempo es músculo: cada minuto de oclusión aumenta el área de necrosis."
            ]
          },
          {
            "tipo": "diagrama",
            "clave": "corazon"
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Tiempo es músculo",
            "texto": "El miocardio irrigado por una arteria ocluida muere de forma progresiva. La meta de reperfusión en el IAMCEST es restaurar el flujo lo antes posible para salvar miocardio viable y reducir mortalidad y disfunción ventricular."
          }
        ],
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "titulo": "Fisiopatología del shock",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El shock es un estado de hipoperfusión tisular que lleva a hipoxia celular y disfunción orgánica. A nivel celular, la falta de oxígeno fuerza el metabolismo anaerobio, genera ácido láctico y, si persiste, conduce a la muerte celular. La presión arterial puede ser normal en fases tempranas gracias a los mecanismos compensadores."
          },
          {
            "tipo": "formula",
            "texto": "PAM = Gasto Cardíaco x Resistencia Vascular Sistémica",
            "nota": "El gasto cardíaco depende de frecuencia, precarga, contractilidad y poscarga. Cada tipo de shock altera uno o varios de estos componentes."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "El lactato como marcador",
            "texto": "El lactato elevado refleja el metabolismo anaerobio por hipoperfusión. Su tendencia descendente (aclaramiento) es uno de los mejores indicadores de que la reanimación funciona, mejor que un solo valor de presión."
          },
          {
            "tipo": "diagrama",
            "clave": "shock"
          }
        ],
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "titulo": "Fisiopatología de la sepsis",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La sepsis es una disfunción orgánica potencialmente mortal causada por una respuesta desregulada del huésped a la infección. No es solo la bacteria: es la reacción inmune descontrolada la que daña los propios órganos."
          },
          {
            "tipo": "pasos",
            "titulo": "Cascada fisiopatológica",
            "items": [
              "El patógeno (o su endotoxina) activa la inmunidad innata y libera citocinas (TNF-α, IL-1, IL-6).",
              "Disfunción endotelial: vasodilatación, aumento de permeabilidad y fuga capilar → hipotensión y edema (shock distributivo).",
              "Coagulopatía: activación de la coagulación con consumo de factores y plaquetas → CID (microtrombos + sangrado).",
              "Hipoperfusión e hipoxia tisular → metabolismo anaerobio, lactato elevado.",
              "Síndrome de disfunción multiorgánica (MODS): fallo progresivo de riñón, pulmón, hígado, etc."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Reconocimiento y \"hora dorada\" de la sepsis",
            "texto": "Sospecha sepsis ante infección + signos de disfunción: alteración del estado mental, taquipnea, hipotensión, lactato elevado. El qSOFA (PAS ≤100, FR ≥22, alteración mental) es una herramienta rápida de cribado. El tratamiento precoz —cultivos, antibióticos tempranos, fluidos y vasopresores (norepinefrina) para sostener la PAM— mejora la supervivencia."
          }
        ],
        "procedencia": {
          "temaOriginal": "microbiologia-sepsis"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "AEIOU-TIPS",
        "definicion": "Nemotecnia del diagnostico diferencial de la alteracion del estado mental.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "termino": "Complemento",
        "definicion": "Sistema de proteínas que opsoniza, atrae leucocitos y lisa patógenos.",
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia",
          "porUnidad": true
        }
      },
      {
        "termino": "Estado hiperosmolar",
        "definicion": "Hiperglucemia extrema con osmolaridad muy alta y sin cetoacidosis significativa; mas en tipo 2.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "termino": "Aspecto toxico",
        "definicion": "Mal estado general (letargia, mala perfusion) que indica gravedad mas alla de la fiebre.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Estudio obligado en toda alteracion del estado mental",
        "reverso": "La glucemia capilar.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "frente": "Primer estudio en todo estado mental alterado",
        "reverso": "Glucemia capilar (descartar hipoglucemia).",
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "frente": "Estudio obligado en toda alteración del estado mental",
        "reverso": "Glucometría capilar para descartar hipoglucemia.",
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      },
      {
        "frente": "Diferencia clave entre necrosis y apoptosis respecto a la inflamación",
        "reverso": "La necrosis genera inflamación; la apoptosis típicamente no.",
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia",
          "porUnidad": true
        }
      },
      {
        "frente": "¿Qué vía de la coagulación mide el TP/INR?",
        "reverso": "La vía extrínseca (factor tisular).",
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia",
          "porUnidad": true
        }
      },
      {
        "frente": "Tipo de hipersensibilidad de la anafilaxia",
        "reverso": "Tipo I, mediada por IgE e histamina.",
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia",
          "porUnidad": true
        }
      },
      {
        "frente": "Componentes del qSOFA",
        "reverso": "PAS ≤100 mmHg, FR ≥22 rpm y alteración del estado mental.",
        "procedencia": {
          "temaOriginal": "microbiologia-sepsis"
        }
      },
      {
        "frente": "Por que se traslapa heparina al iniciar warfarina",
        "reverso": "Por el estado protrombotico transitorio inicial de la warfarina.",
        "procedencia": {
          "temaOriginal": "hematologia-coagulacion"
        }
      },
      {
        "frente": "Que vale mas: la cifra de fiebre o el estado general",
        "reverso": "El estado general (el aspecto del nino).",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "La razon para traslapar heparina al iniciar warfarina es:",
        "opciones": [
          "Aumentar el sangrado",
          "El estado protrombotico transitorio inicial de la warfarina",
          "Acelerar el INR",
          "Evitar trombocitopenia"
        ],
        "correcta": 1,
        "explicacion": "Al inicio caen primero las proteinas C y S (anticoagulantes naturales), generando un estado protrombotico transitorio que cubre la heparina.",
        "procedencia": {
          "temaOriginal": "hematologia-coagulacion"
        }
      }
    ]
  },
  "m5-cin-triada-wadell": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Triada de la muerte",
        "definicion": "Hipotermia, acidosis y coagulopatia que se retroalimentan en el trauma grave.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "termino": "Tríada letal",
        "definicion": "Hipotermia, acidosis y coagulopatía que se potencian en el trauma grave.",
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "termino": "Triada letal",
        "definicion": "Hipotermia, acidosis y coagulopatía que se potencian en el trauma grave.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      },
      {
        "termino": "Triada de Virchow",
        "definicion": "Estasis, lesion endotelial e hipercoagulabilidad; base de la trombosis.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que es la triada de la muerte",
        "reverso": "Hipotermia, acidosis y coagulopatia.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "frente": "¿Cuál es la \"tríada letal\" del trauma?",
        "reverso": "Hipotermia, acidosis y coagulopatía.",
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "frente": "Componentes de la triada letal del trauma",
        "reverso": "Hipotermia, acidosis y coagulopatía.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Por que es importante abrigar a un paciente en shock por trauma?",
        "opciones": [
          "Por confort unicamente",
          "Porque la hipotermia agrava la acidosis y la coagulopatia (triada de la muerte)",
          "Para subir la presion directamente",
          "No es importante"
        ],
        "correcta": 1,
        "explicacion": "La hipotermia forma parte de la triada de la muerte; empeora la coagulacion y la acidosis, por lo que mantener la temperatura es parte del tratamiento.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      },
      {
        "pregunta": "Cual combinacion conlleva mayor riesgo de lesion renal aguda (triple whammy):",
        "opciones": [
          "IECA mas estatina mas aspirina",
          "AINE mas IECA mas diuretico",
          "Betabloqueador mas tiazida",
          "Calcioantagonista mas IECA"
        ],
        "correcta": 1,
        "explicacion": "La triada de AINE, IECA o ARA II y diuretico compromete la perfusion y la autorregulacion glomerular, precipitando lesion renal aguda.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      }
    ]
  },
  "m5-tcc-escalpe": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Cual de los siguientes es un sitio de hemorragia interna oculta capaz de causar shock sin sangrado visible?",
        "opciones": [
          "Cuero cabelludo",
          "Pelvis",
          "Mano",
          "Pabellon auricular"
        ],
        "correcta": 1,
        "explicacion": "Las fracturas pelvicas pueden producir hemorragia masiva interna sin sangre externa visible.",
        "procedencia": {
          "temaOriginal": "hemorragias-shock-basico"
        }
      }
    ]
  },
  "m1-pai-ferulas-vendajes": {
    "secciones": [
      {
        "titulo": "Valoracion neurovascular",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Toda lesion de extremidad exige valorar la funcion neurovascular distal antes y despues de inmovilizar. Una ferula mal colocada puede comprometer la circulacion o un nervio."
          },
          {
            "tipo": "pasos",
            "titulo": "Evaluacion de los 5 puntos distales",
            "items": [
              "Pulso distal a la lesion.",
              "Llenado capilar.",
              "Color y temperatura de la piel.",
              "Sensibilidad (que sienta el tacto).",
              "Movilidad (que pueda mover los dedos)."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Sindrome compartimental",
            "texto": "Dolor desproporcionado, palidez, parestesias, ausencia de pulso y paralisis (las 5 P) indican aumento de presion dentro de un compartimento muscular. Es una urgencia: afloja vendajes y traslada con prioridad."
          }
        ],
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Un paciente con fractura de antebrazo entablillada presenta dolor creciente, palidez y perdida del pulso radial. Sospechas:",
        "opciones": [
          "Esguince asociado",
          "Sindrome compartimental",
          "Distension muscular",
          "Cuadro normal posterior a la ferula"
        ],
        "correcta": 1,
        "explicacion": "Las 5 P (dolor, palidez, parestesias, ausencia de pulso, paralisis) apuntan a sindrome compartimental: afloja vendajes y traslada con prioridad.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      }
    ]
  },
  "m5-tt-disrupcion-aortica": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Esguince",
        "definicion": "Lesion ligamentaria por estiramiento o desgarro sin ruptura osea.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que valvulas cierran en R2",
        "reverso": "Las semilunares: aortica y pulmonar.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un paciente presenta soplo sistolico eyectivo que irradia a carotidas y pulso parvus et tardus. El diagnostico mas probable es:",
        "opciones": [
          "Insuficiencia mitral",
          "Estenosis aortica",
          "Insuficiencia aortica",
          "Estenosis mitral"
        ],
        "correcta": 1,
        "explicacion": "La estenosis aortica produce un soplo sistolico eyectivo que irradia a carotidas y un pulso de ascenso lento y baja amplitud (parvus et tardus).",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ]
  },
  "m5-tme-compartimental": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Sindrome compartimental",
        "definicion": "Aumento de presion en un compartimento muscular que compromete la circulacion; urgencia.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      },
      {
        "termino": "Síndrome compartimental",
        "definicion": "Complicación del IO por extravasación que eleva la presión en el compartimento.",
        "procedencia": {
          "temaOriginal": "terapia-iv-io"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cuales son las 5 P del sindrome compartimental",
        "reverso": "Dolor (pain), palidez, parestesias, ausencia de pulso y paralisis.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      },
      {
        "frente": "Complicación grave por desplazamiento de la aguja IO",
        "reverso": "Extravasación con síndrome compartimental.",
        "procedencia": {
          "temaOriginal": "terapia-iv-io"
        }
      }
    ],
    "quiz": []
  },
  "m1-pab-fracturas": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Ferula de traccion",
        "definicion": "Dispositivo para fractura cerrada de diafisis femoral que contrarresta el espasmo muscular.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que articulaciones se inmovilizan en una fractura",
        "reverso": "La proximal y la distal al foco de fractura.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      },
      {
        "frente": "Que se valora antes y despues de colocar una ferula",
        "reverso": "Pulso, sensibilidad y movilidad distales.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      },
      {
        "frente": "Indicacion de la ferula de traccion",
        "reverso": "Fractura cerrada aislada de la diafisis del femur.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      },
      {
        "frente": "Cuando NO usar ferula de traccion",
        "reverso": "Fractura de cadera, rodilla, pelvis o fractura expuesta de femur.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Al inmovilizar una fractura de tibia, que estructuras debes incluir en la ferula?",
        "opciones": [
          "Solo el sitio de fractura",
          "La articulacion proximal y la distal",
          "Toda la pierna y la cadera siempre",
          "Unicamente el tobillo"
        ],
        "correcta": 1,
        "explicacion": "La regla del entablillado es inmovilizar la articulacion proximal y la distal al foco de fractura para evitar el movimiento de los fragmentos.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      },
      {
        "pregunta": "En cual de estas situaciones esta indicada la ferula de traccion?",
        "opciones": [
          "Fractura de pelvis",
          "Fractura expuesta de femur",
          "Fractura cerrada de la diafisis femoral",
          "Luxacion de cadera"
        ],
        "correcta": 2,
        "explicacion": "La ferula de traccion se usa solo en fractura cerrada aislada de la diafisis del femur; esta contraindicada en pelvis, cadera y fracturas expuestas.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      }
    ]
  },
  "m5-tcc-definicion": {
    "secciones": [
      {
        "titulo": "Fuentes y evidencia",
        "bloques": [
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "PulmCrit (EMCrit) — TXA en TCE (CRASH-3)",
                "url": "https://emcrit.org/pulmcrit/crash3/"
              },
              {
                "nombre": "CRASH-3 — resultados (Lancet/PMC)",
                "url": "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6853170/"
              },
              {
                "nombre": "FIGO — Declaración sobre TXA en HPP (WOMAN/OMS)",
                "url": "https://www.figo.org/joint-statement-recommendation-tranexamic-acid-treatment-pph"
              },
              {
                "nombre": "St Emlyn s — Hipocalcemia, trauma y transfusión",
                "url": "https://www.stemlynsblog.org/hypocalcaemia-trauma-and-major-transfusion-st-emlyns/"
              },
              {
                "nombre": "THOR Network / Joint Trauma System",
                "nota": "Reanimación de control de daños y calcio"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "trauma-coagulopatia-hemorragia-obstetrica",
          "porUnidad": true
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Movilizacion en bloque",
        "definicion": "Tecnica coordinada (log roll) que mueve la columna como una unidad.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que es el log roll",
        "reverso": "Movilizacion en bloque coordinada que mantiene la columna alineada.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico",
          "porUnidad": true
        }
      }
    ],
    "quiz": []
  },
  "m5-tcc-lesiones-focales": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Segun los criterios de restriccion espinal selectiva, cual SI justifica inmovilizar la columna?",
        "opciones": [
          "Paciente alerta, sin dolor y sin deficit",
          "Deficit neurologico focal nuevo",
          "Mecanismo menor sin sintomas",
          "Dolor solo en una mano por herida"
        ],
        "correcta": 1,
        "explicacion": "Un deficit neurologico focal es criterio claro para restringir el movimiento espinal; el paciente alerta sin dolor ni deficit puede no requerirlo.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      }
    ]
  },
  "m5-tcc-fracturas-vertebrales": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Cual es la posicion correcta de la cabeza durante la inmovilizacion cervical en general?",
        "opciones": [
          "Flexionada hacia el pecho",
          "Extendida hacia atras",
          "Neutra alineada con el cuerpo",
          "Rotada hacia el lado sano"
        ],
        "correcta": 2,
        "explicacion": "La cabeza se lleva a posicion neutra alineada con el cuerpo, salvo que aparezca dolor, resistencia o deficit nuevo, caso en que se deja como se encontro.",
        "procedencia": {
          "temaOriginal": "trauma-musculoesqueletico"
        }
      }
    ]
  },
  "m6-se-muerte-subita": {
    "secciones": [
      {
        "titulo": "Sincope",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El sincope es la perdida transitoria de la conciencia por hipoperfusion cerebral global, con recuperacion espontanea y completa. Lo importante es distinguir el sincope benigno del que esconde una causa grave."
          },
          {
            "tipo": "tabla",
            "titulo": "Causas frecuentes de sincope",
            "headers": [
              "Tipo",
              "Mecanismo",
              "Ejemplo"
            ],
            "filas": [
              [
                "Vasovagal",
                "Reflejo que baja FC y TA",
                "Dolor, emocion, calor, bipedestacion prolongada"
              ],
              [
                "Ortostatico",
                "Caida de TA al incorporarse",
                "Deshidratacion, medicamentos"
              ],
              [
                "Cardiaco",
                "Arritmia o falla de bomba",
                "Bloqueo, taquiarritmia, estenosis aortica"
              ],
              [
                "Neurologico",
                "Eventos cerebrales",
                "Mas bien causa de sintomas focales que de sincope puro"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Banderas rojas del sincope",
            "texto": "Sincope durante el esfuerzo, sin prodromos, con dolor toracico, palpitaciones o antecedente de muerte subita familiar sugiere causa cardiaca: traslada y vigila el ritmo."
          }
        ],
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "titulo": "Miocardiopatias",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Tipos de miocardiopatia",
            "headers": [
              "Tipo",
              "Fisiopatologia",
              "Claves"
            ],
            "filas": [
              [
                "Dilatada",
                "Dilatacion y falla sistolica",
                "Causa mas comun; idiopatica, alcohol, viral, isquemica"
              ],
              [
                "Hipertrofica",
                "Hipertrofia septal asimetrica, obstruccion al tracto de salida",
                "Causa de muerte subita en jovenes y atletas; herencia autosomica dominante"
              ],
              [
                "Restrictiva",
                "Pared rigida, falla diastolica",
                "Amiloidosis, hemocromatosis, fibrosis"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Miocardiopatia hipertrofica y ejercicio",
            "texto": "El soplo aumenta con maniobras que reducen la precarga (Valsalva, bipedestacion) porque el ventriculo mas pequeno acentua la obstruccion. Es una causa relevante de sincope y muerte subita durante el esfuerzo en deportistas jovenes."
          }
        ],
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Miocardiopatia hipertrofica",
        "definicion": "Hipertrofia septal asimetrica; causa de muerte subita en jovenes.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Miocardiopatia asociada a muerte subita en atletas jovenes",
        "reverso": "La miocardiopatia hipertrofica.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un joven se desmaya jugando futbol, sin prodromos, y un tio murio subitamente a los 30 años. Que sospechas?",
        "opciones": [
          "Sincope vasovagal benigno",
          "Sincope de probable origen cardiaco",
          "Hipoglucemia",
          "Crisis de ansiedad"
        ],
        "correcta": 1,
        "explicacion": "El sincope de esfuerzo, sin prodromos y con antecedente de muerte subita familiar es una bandera roja de causa cardiaca.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "pregunta": "Ante un paciente con hemiparesia súbita, lo primero que debe descartarse es:",
        "opciones": [
          "Un infarto cardíaco",
          "La hipoglucemia mediante glucemia capilar",
          "Una fractura",
          "Una infección"
        ],
        "correcta": 1,
        "explicacion": "La hipoglucemia es un imitador clásico de EVC; la glucemia capilar es obligatoria antes de cualquier conducta.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      }
    ]
  },
  "m4-card-sca": {
    "secciones": [
      {
        "titulo": "Dolor toracico",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El dolor toracico exige descartar causas que amenazan la vida. El sindrome coronario agudo es la prioridad, pero hay otras causas graves que no se deben pasar por alto."
          },
          {
            "tipo": "lista",
            "titulo": "Causas potencialmente mortales",
            "items": [
              "Sindrome coronario agudo (infarto, angina inestable).",
              "Diseccion aortica.",
              "Embolia pulmonar.",
              "Neumotorax a tension.",
              "Taponamiento cardiaco.",
              "Ruptura esofagica."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Caracteristicas del dolor coronario tipico",
            "headers": [
              "Aspecto",
              "Descripcion"
            ],
            "filas": [
              [
                "Calidad",
                "Opresivo, como peso, no punzante"
              ],
              [
                "Localizacion",
                "Retroesternal"
              ],
              [
                "Irradiacion",
                "Brazo izquierdo, mandibula, espalda"
              ],
              [
                "Asociados",
                "Diaforesis, nausea, disnea"
              ],
              [
                "Duracion",
                "Mas de 20 minutos sugiere infarto"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Presentaciones atipicas",
            "texto": "Mujeres, diabeticos y adultos mayores pueden infartarse sin dolor clasico: solo fatiga, nausea, disnea o malestar epigastrico. Mantén un umbral bajo de sospecha."
          }
        ],
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "titulo": "Ritmo sinusal y eje eléctrico",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Criterios de ritmo sinusal normal",
            "items": [
              "Frecuencia entre 60 y 100 por minuto.",
              "Una onda P antes de cada QRS y un QRS después de cada P.",
              "Onda P positiva en DII y negativa en aVR.",
              "Intervalo PR constante y normal (0.12-0.20 s).",
              "Ritmo regular (intervalos R-R uniformes)."
            ]
          },
          {
            "tipo": "p",
            "texto": "El eje eléctrico es la dirección promedio de la despolarización ventricular. Una estimación rápida usa DI y aVF: si el QRS es positivo en ambas, el eje es normal. La desviación del eje sugiere hipertrofia, bloqueos de rama o patología pulmonar."
          },
          {
            "tipo": "tabla",
            "titulo": "Estimación rápida del eje",
            "headers": [
              "DI",
              "aVF",
              "Eje"
            ],
            "filas": [
              [
                "Positivo",
                "Positivo",
                "Normal"
              ],
              [
                "Positivo",
                "Negativo",
                "Desviación izquierda"
              ],
              [
                "Negativo",
                "Positivo",
                "Desviación derecha"
              ],
              [
                "Negativo",
                "Negativo",
                "Desviación extrema (noroeste)"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "El ECG no sustituye al paciente",
            "texto": "Un ECG normal no descarta un síndrome coronario agudo, y un trazo anormal en un paciente asintomático no siempre es urgencia. Correlacione siempre el ECG con la clínica."
          }
        ],
        "procedencia": {
          "temaOriginal": "ecg-basico"
        }
      },
      {
        "titulo": "Síndromes coronarios agudos (SICA)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El IAMCEST (infarto con elevación del ST) traduce oclusión completa de una coronaria y exige reperfusión urgente. La elevación significativa del ST en derivaciones contiguas, con imagen especular (descenso recíproco), localiza la cara afectada."
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Infarto de ventrículo derecho",
            "texto": "Sospéchalo ante un IAM inferior (II, III, aVF) con hipotensión. Se confirma con elevación del ST en V4R. Es PRECARGA-dependiente: los nitratos y otros vasodilatadores pueden causar colapso. El manejo prioriza el aporte de volumen."
          },
          {
            "tipo": "tabla",
            "headers": [
              "Equivalente de STEMI",
              "Hallazgo"
            ],
            "filas": [
              [
                "Síndrome de Wellens",
                "T bifásicas o profundamente invertidas en V2-V3: estenosis crítica de la descendente anterior."
              ],
              [
                "Ondas T de De Winter",
                "Descenso del ST con T altas y picudas en precordiales: oclusión proximal de la DA."
              ],
              [
                "Criterios de Sgarbossa",
                "Permiten diagnosticar IAM en presencia de BRI o marcapasos (concordancia del ST)."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "No descartar IAM por un BRI",
            "texto": "Un bloqueo de rama izquierda oculta los cambios isquémicos habituales. Los criterios de Sgarbossa (elevación concordante del ST ≥1 mm, descenso concordante en V1-V3, o elevación discordante excesiva) rescatan el diagnóstico en pacientes que de otro modo no recibirían reperfusión."
          }
        ],
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "titulo": "El espectro de los síndromes coronarios agudos",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Diferenciación del SICA",
            "headers": [
              "Entidad",
              "ECG",
              "Troponina"
            ],
            "filas": [
              [
                "Angina inestable",
                "Normal o descenso transitorio del ST/T",
                "Negativa"
              ],
              [
                "IAMSEST",
                "Descenso del ST o inversión de T, sin elevación",
                "Positiva"
              ],
              [
                "IAMCEST",
                "Elevación del ST en derivaciones contiguas o BRI nuevo",
                "Positiva"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Criterios de elevación significativa del ST",
            "items": [
              "Mayor o igual a 1 mm en dos derivaciones contiguas de los miembros.",
              "Mayor o igual a 2 mm en hombres (1.5 mm en mujeres) en V2 y V3.",
              "Bloqueo de rama izquierda nuevo o presumiblemente nuevo con clínica sugerente.",
              "Considerar derivaciones derechas (V4R) y posteriores (V7 a V9)."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Equivalentes de IAMCEST",
            "texto": "No todo infarto agudo y peligroso eleva el ST de forma obvia. El patrón de Wellens, el de De Winter y el descenso difuso del ST con elevación en aVR (oclusión de tronco o enfermedad de tres vasos) son señales de alarma que exigen valoración urgente."
          }
        ],
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "titulo": "Hipertension arterial",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Categorias de presion arterial",
            "headers": [
              "Categoria",
              "Sistolica (mmHg)",
              "Diastolica (mmHg)"
            ],
            "filas": [
              [
                "Normal",
                "Menor a 120",
                "y menor a 80"
              ],
              [
                "Elevada",
                "120 a 129",
                "y menor a 80"
              ],
              [
                "Hipertension etapa 1",
                "130 a 139",
                "o 80 a 89"
              ],
              [
                "Hipertension etapa 2",
                "Mayor o igual a 140",
                "o mayor o igual a 90"
              ]
            ]
          },
          {
            "tipo": "p",
            "texto": "Mas del 90 por ciento de los casos son hipertension primaria o esencial, sin causa identificable. Las causas secundarias incluyen enfermedad renovascular, hiperaldosteronismo, feocromocitoma, apnea del sueno y coartacion aortica; se sospechan ante inicio temprano, hipertension resistente o datos clinicos especificos."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Urgencia vs emergencia hipertensiva",
            "texto": "La emergencia hipertensiva cursa con dano agudo de organo blanco (encefalopatia, edema pulmonar, sindrome coronario, diseccion aortica, eclampsia) y requiere reduccion controlada con farmacos intravenosos. La urgencia es presion muy elevada sin dano agudo de organo y se maneja por via oral evitando descensos bruscos."
          },
          {
            "tipo": "lista",
            "titulo": "Dano de organo blanco cronico",
            "items": [
              "Corazon: hipertrofia ventricular izquierda, insuficiencia cardiaca.",
              "Rinon: nefroesclerosis, enfermedad renal cronica.",
              "Cerebro: enfermedad vascular cerebral, deterioro cognitivo.",
              "Ojo: retinopatia hipertensiva.",
              "Vasos: aterosclerosis acelerada, aneurismas."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Sindrome coronario agudo",
        "definicion": "Espectro de isquemia miocardica que incluye angina inestable e infarto.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "termino": "Placa vulnerable",
        "definicion": "Placa con núcleo lipídico grande y cápsula fina, propensa a romperse.",
        "procedencia": {
          "temaOriginal": "sica-profundo",
          "porUnidad": true
        }
      },
      {
        "termino": "SICASEST",
        "definicion": "Síndrome coronario sin elevación del ST (IAMSEST y angina inestable).",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "termino": "Tiempo puerta-balón",
        "definicion": "Intervalo hasta la angioplastia; meta menor a 90 minutos.",
        "procedencia": {
          "temaOriginal": "sica-profundo",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Como es el dolor coronario tipico",
        "reverso": "Opresivo, retroesternal, irradiado a brazo izquierdo o mandibula, con diaforesis.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "frente": "Tiempo máximo para ECG tras el contacto",
        "reverso": "10 minutos.",
        "procedencia": {
          "temaOriginal": "sica-profundo",
          "porUnidad": true
        }
      },
      {
        "frente": "Tiempo puerta-balón objetivo en IAMCEST",
        "reverso": "Menor a 90 minutos.",
        "procedencia": {
          "temaOriginal": "sica-profundo",
          "porUnidad": true
        }
      },
      {
        "frente": "¿La fibrinolisis aplica en IAMSEST?",
        "reverso": "No; solo en IAMCEST.",
        "procedencia": {
          "temaOriginal": "sica-profundo",
          "porUnidad": true
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un descenso difuso del ST con elevación en aVR sugiere:",
        "opciones": [
          "Pericarditis benigna",
          "Oclusión de tronco coronario o enfermedad de tres vasos",
          "Infarto inferior aislado",
          "Variante normal"
        ],
        "correcta": 1,
        "explicacion": "Es un equivalente de IAMCEST de alto riesgo que indica isquemia extensa y exige valoración urgente.",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      }
    ]
  },
  "m4-neu-sincope": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Sincope",
        "definicion": "Perdida transitoria de conciencia por hipoperfusion cerebral con recuperacion completa.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "termino": "Estenosis aortica",
        "definicion": "Obstruccion a la salida del ventriculo izquierdo; triada de angina, sincope y disnea.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Definicion de sincope",
        "reverso": "Perdida transitoria de conciencia por hipoperfusion cerebral con recuperacion completa.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "frente": "Bandera roja de sincope cardiaco",
        "reverso": "Sincope durante el esfuerzo, sin prodromos o con palpitaciones.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes"
        }
      },
      {
        "frente": "Triada clinica de la estenosis aortica grave",
        "reverso": "Angina, sincope de esfuerzo y disnea.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ],
    "quiz": []
  },
  "m6-ig-envejecimiento-urgencias": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Disnea",
        "definicion": "Sensacion subjetiva de dificultad para respirar.",
        "procedencia": {
          "temaOriginal": "urgencias-medicas-comunes",
          "porUnidad": true
        }
      },
      {
        "termino": "CRUM",
        "definicion": "Centro Regulador de Urgencias Médicas: coordina traslado y destino.",
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      }
    ],
    "flashcards": [],
    "quiz": []
  },
  "m7-triage-unico": {
    "secciones": [
      {
        "titulo": "Evaluacion de la escena",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La atencion del trauma empieza antes de tocar al paciente. La evaluacion de la escena protege al rescatador, identifica peligros y aporta informacion sobre el mecanismo de lesion."
          },
          {
            "tipo": "lista",
            "titulo": "Componentes de la evaluacion de la escena",
            "items": [
              "Seguridad: para el equipo, el paciente y los testigos.",
              "Equipo de proteccion personal segun el riesgo (biologico, quimico, trafico).",
              "Mecanismo de lesion: que paso y cuanta energia se transfirio.",
              "Numero de pacientes: define si hay que activar incidentes con multiples victimas.",
              "Recursos necesarios: apoyos, bomberos, rescate, mas unidades."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Tu seguridad primero",
            "texto": "Un rescatador lesionado deja de ser solucion y se vuelve un paciente mas. Nunca ingreses a una escena insegura sin el control de los peligros."
          }
        ],
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      },
      {
        "titulo": "Concepto de incidente con multiples victimas",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Un incidente con multiples victimas (IMV) ocurre cuando el numero de pacientes o la gravedad superan los recursos disponibles en ese momento. La filosofia de atencion se invierte: el mayor bien para el mayor numero."
          },
          {
            "tipo": "lista",
            "titulo": "Diferencias frente a la atencion habitual",
            "items": [
              "El paciente mas grave no siempre es el primero en recibir recursos.",
              "Se prioriza a quien tiene mayor probabilidad de sobrevivir con intervencion rapida.",
              "Las intervenciones iniciales son minimas: abrir via aerea y controlar hemorragia.",
              "El objetivo es clasificar rapido a todos antes de tratar a fondo a alguno."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Cambio de mentalidad",
            "texto": "En el dia a dia se da todo por un paciente. En un IMV, gastar todos los recursos en el caso mas grave puede costar la vida de varios salvables. El triage redistribuye el esfuerzo."
          }
        ],
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "titulo": "Sistema de comando de incidentes",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El sistema de comando de incidentes (SCI) es una estructura organizativa que coordina la respuesta. Establece una cadena de mando clara, evita la duplicidad de esfuerzos y permite escalar segun la magnitud del evento."
          },
          {
            "tipo": "lista",
            "titulo": "Funciones basicas del SCI",
            "items": [
              "Comando: dirige la operacion y toma decisiones globales.",
              "Operaciones: ejecuta las tareas de rescate, triage y tratamiento.",
              "Planificacion: reune informacion y prevé recursos.",
              "Logistica: provee equipo, personal e insumos.",
              "Administracion y finanzas: documenta costos y recursos."
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Areas operativas en un IMV",
            "items": [
              "Area de triage: clasificacion inicial de victimas.",
              "Area de tratamiento: organizada por prioridad (rojo, amarillo, verde).",
              "Area de transporte: coordina la salida ordenada hacia los hospitales.",
              "Zona de seguridad y control de acceso."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Un solo comandante",
            "texto": "El primer rescatador capacitado en llegar asume el comando hasta ser relevado. Una cadena de mando unica evita el caos de ordenes contradictorias en la escena."
          }
        ],
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "titulo": "Intoxicación por CO y cianuro",
        "bloques": [
          {
            "tipo": "p",
            "texto": "En los incendios en espacios cerrados coexisten dos tóxicos peligrosos: el monóxido de carbono y el cianuro. Ambos producen hipoxia tisular pese a una oxigenación aparentemente normal, y el cianuro proviene de la combustión de plásticos y materiales sintéticos."
          },
          {
            "tipo": "tabla",
            "titulo": "Monóxido de carbono frente a cianuro",
            "headers": [
              "Tóxico",
              "Mecanismo y tratamiento"
            ],
            "filas": [
              [
                "Monóxido de carbono",
                "Se une a la hemoglobina (carboxihemoglobina) e impide transportar O2; tratamiento con O2 al 100 por ciento, considerar cámara hiperbárica."
              ],
              [
                "Cianuro",
                "Bloquea la cadena respiratoria mitocondrial; tratamiento con hidroxocobalamina."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "El pulsioxímetro engaña en la intoxicación por CO",
            "texto": "El pulsioxímetro convencional no distingue la carboxihemoglobina de la oxihemoglobina, por lo que puede mostrar una SpO2 falsamente normal pese a una hipoxia grave. Ante sospecha, administra oxígeno al 100 por ciento y usa cooximetría si está disponible."
          },
          {
            "tipo": "lista",
            "titulo": "Pistas de intoxicación por cianuro",
            "items": [
              "Acidosis metabólica profunda con lactato muy elevado.",
              "Deterioro neurológico y colapso cardiovascular sin causa clara.",
              "Víctima de incendio en espacio cerrado con hollín y bajo nivel de conciencia.",
              "La hidroxocobalamina es el antídoto de elección en el ámbito prehospitalario."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "titulo": "Sistema de Comando de Incidentes (SCI)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El Sistema de Comando de Incidentes (SCI/ICS) es la estructura estandarizada para organizar la respuesta a cualquier incidente, pequeño o grande. Permite una cadena de mando única, lenguaje común y crecimiento modular según la magnitud. El primer respondiente capacitado en llegar asume el comando hasta ser relevado."
          },
          {
            "tipo": "lista",
            "titulo": "Las cinco funciones del SCI",
            "items": [
              "Comando: dirige el incidente, fija objetivos y seguridad.",
              "Operaciones: ejecuta las acciones tácticas (rescate, atención, extinción).",
              "Planeación: reúne información y elabora el plan de acción del incidente.",
              "Logística: provee recursos, personal, equipo y suministros.",
              "Administración y finanzas: controla costos, contratos y documentación."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Tramo de control",
            "texto": "Cada responsable debe supervisar idealmente de 3 a 7 personas (tramo de control). Si se excede, la estructura se subdivide. En incidentes con múltiples víctimas, el SCI se integra con el triage (START/JumpSTART) y el Puesto Médico Avanzado."
          }
        ],
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      },
      {
        "titulo": "Incidentes HazMat (materiales peligrosos)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "En un incidente con materiales peligrosos, el rescatador puede convertirse en víctima. El principio rector es no entrar sin equipo de protección y sin descontaminación: se trabaja desde una distancia segura, a favor del viento y cuesta arriba del derrame."
          },
          {
            "tipo": "tabla",
            "titulo": "Zonas de control HazMat",
            "headers": [
              "Zona",
              "Color",
              "Quién y qué"
            ],
            "filas": [
              [
                "Caliente (exclusión)",
                "Roja",
                "Solo personal con EPP; contacto con el material"
              ],
              [
                "Templada (reducción)",
                "Amarilla",
                "Corredor de descontaminación"
              ],
              [
                "Fría (apoyo)",
                "Verde",
                "Triage, atención médica y comando"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Identificar antes de actuar",
            "texto": "Usa la Guía de Respuesta en Caso de Emergencia (GRE/ERG), las placas de identificación (rombo NFPA 704, número ONU) y binoculares para reconocer el material a distancia. La descontaminación precede a la atención médica avanzada: un paciente contaminado contamina la ambulancia y al equipo."
          }
        ],
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      },
      {
        "titulo": "Psicología de emergencias y bienestar",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La exposición repetida al sufrimiento, la muerte y los incidentes críticos desgasta al personal. Reconocer el estrés por incidente crítico y cuidar la salud mental es tan profesional como dominar una técnica."
          },
          {
            "tipo": "lista",
            "titulo": "Herramientas de cuidado",
            "items": [
              "Defusing: conversación breve e informal en las horas siguientes a un evento difícil.",
              "Debriefing: revisión estructurada en grupo, días después, para procesar el incidente.",
              "Reconocer señales de alarma: insomnio, irritabilidad, intrusiones, aislamiento, consumo de sustancias.",
              "Buscar ayuda profesional sin estigma; el burnout y el estrés postraumático son lesiones, no debilidades."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Cuídate para poder cuidar",
            "texto": "El bienestar del paramédico (sueño, alimentación, red de apoyo, descarga emocional) sostiene la calidad de la atención a lo largo de la carrera. Un sistema que cuida a su gente retiene a sus mejores rescatadores."
          },
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "C-TECC — Guías de Tactical Emergency Casualty Care",
                "url": "https://www.c-tecc.org/guidelines"
              },
              {
                "nombre": "FEMA — Incident Command System (ICS)",
                "url": "https://training.fema.gov/is/courseoverview.aspx?code=IS-100.c"
              },
              {
                "nombre": "Guía de Respuesta en Caso de Emergencia (GRE/ERG)",
                "url": "https://www.gob.mx/sct",
                "nota": "Identificación de materiales peligrosos"
              },
              {
                "nombre": "NAEMT — TECC y bienestar del proveedor",
                "url": "https://www.naemt.org/",
                "nota": "Cursos de medicina táctica y salud mental"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      },
      {
        "titulo": "¿Qué es el FRAP y cuándo se llena?",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El Formato de Registro de Atención Prehospitalaria (FRAP) es el documento que respalda legalmente toda la atención brindada. Registra quién, cuándo, qué se encontró, qué se hizo y cómo evolucionó el paciente hasta la transferencia. La NOM-034 obliga a documentar la atención: el FRAP se llena durante o inmediatamente después del servicio, mientras la información está fresca."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Un FRAP por cada paciente",
            "texto": "Cada paciente atendido genera su propio formato, aunque provengan del mismo incidente. En incidentes con múltiples víctimas se usan tarjetas de triage y registros condensados, pero cada persona conserva su identidad y su registro."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Lo que no se escribió, no se hizo",
            "texto": "El FRAP se llena con letra legible, con tinta, sin espacios en blanco y sin alteraciones. Un procedimiento que se realizó pero no se documentó, ante un juez, no ocurrió. Un FRAP completo protege; uno incompleto o alterado condena."
          }
        ],
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Incidente con multiples victimas",
        "definicion": "Evento en que las victimas superan los recursos disponibles.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "termino": "START",
        "definicion": "Sistema de triage rapido que clasifica adultos por deambulacion, respiracion, perfusion y estado mental.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "termino": "Walking wounded",
        "definicion": "Heridos que deambulan; se clasifican como verde (menor).",
        "procedencia": {
          "temaOriginal": "triage-mci",
          "porUnidad": true
        }
      },
      {
        "termino": "Categoria negra",
        "definicion": "Fallecidos o expectantes sin posibilidad razonable de sobrevivir con los recursos actuales.",
        "procedencia": {
          "temaOriginal": "triage-mci",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Filosofia del triage en un IMV",
        "reverso": "El mayor bien para el mayor numero de victimas.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "frente": "Que significa el color verde",
        "reverso": "Lesion menor; heridos que deambulan (walking wounded).",
        "procedencia": {
          "temaOriginal": "triage-mci",
          "porUnidad": true
        }
      },
      {
        "frente": "Que significa el color negro",
        "reverso": "Fallecido o expectante, sin posibilidad razonable de sobrevivir con los recursos disponibles.",
        "procedencia": {
          "temaOriginal": "triage-mci",
          "porUnidad": true
        }
      },
      {
        "frente": "Quien asume el comando del incidente",
        "reverso": "El primer rescatador capacitado en llegar, hasta ser relevado.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "frente": "¿Cuántos FRAP se llenan por incidente?",
        "reverso": "Uno por cada paciente atendido, aunque provengan del mismo incidente.",
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual es la filosofia central del triage en un incidente con multiples victimas?",
        "opciones": [
          "Atender primero al mas grave sin importar el pronostico",
          "El mayor bien para el mayor numero de victimas",
          "Atender por orden de llegada",
          "Trasladar a todos al mismo tiempo"
        ],
        "correcta": 1,
        "explicacion": "En un IMV los recursos son limitados; el objetivo es lograr el mayor bien para el mayor numero, no agotar todo en un solo caso.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "pregunta": "En una víctima de incendio con acidosis profunda, lactato muy alto y colapso, el antídoto a considerar es:",
        "opciones": [
          "Naloxona",
          "Hidroxocobalamina",
          "Atropina",
          "Flumazenil"
        ],
        "correcta": 1,
        "explicacion": "El cuadro sugiere intoxicación por cianuro, que bloquea la respiración mitocondrial; la hidroxocobalamina es el antídoto de elección.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "pregunta": "En un incidente HazMat, la atención médica avanzada del paciente se realiza:",
        "opciones": [
          "En la zona caliente, de inmediato",
          "Tras la descontaminación, en la zona fría",
          "Dentro del derrame",
          "No se atiende"
        ],
        "correcta": 1,
        "explicacion": "Primero se descontamina (zona templada) y luego se atiende en la zona fría; un paciente contaminado contamina al equipo.",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      }
    ]
  },
  "m7-operaciones-ambulancias-unico": {
    "secciones": [
      {
        "titulo": "Plan de oro y hora dorada",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El concepto de la hora dorada plantea que el paciente con trauma grave tiene mejores resultados si recibe atencion definitiva (frecuentemente quirurgica) en la primera hora tras la lesion. De ahi el plan de oro prehospitalario: minimizar el tiempo en escena."
          },
          {
            "tipo": "lista",
            "titulo": "Plan de oro del PHTLS",
            "items": [
              "Limitar el tiempo en escena a 10 minutos o menos en trauma critico (plan de platino).",
              "Identificar y tratar de inmediato las amenazas vitales.",
              "Controlar la hemorragia externa con rapidez.",
              "Mantener la oxigenacion y la ventilacion.",
              "Iniciar el traslado al centro de trauma apropiado lo antes posible.",
              "Realizar las intervenciones que no detengan el traslado durante el camino."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Carga y rueda",
            "texto": "En trauma penetrante critico, el tratamiento definitivo es el quirofano. La filosofia de cargar y rodar (load and go) prioriza el traslado rapido sobre las maniobras prolongadas en escena que solo retrasan la cirugia."
          }
        ],
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      },
      {
        "titulo": "Empaquetamiento y traslado",
        "bloques": [
          {
            "tipo": "pasos",
            "titulo": "Empaquetamiento del paciente critico",
            "items": [
              "Asegura el control de la columna si esta indicado.",
              "Inmoviliza fracturas que comprometan la circulacion o causen dolor severo.",
              "Cubre heridas, controla la temperatura y abriga.",
              "Fija al paciente al dispositivo de traslado de forma segura.",
              "Reevalua signos vitales y la evaluacion primaria durante el camino."
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Eleccion del centro receptor",
            "items": [
              "Centro de trauma para lesiones graves o mecanismo de alta energia.",
              "Considera el helicoptero o traslado aereo en tiempos largos o terreno dificil.",
              "Notifica de forma anticipada al hospital para que prepare recursos.",
              "No te detengas en un centro que no pueda dar el tratamiento definitivo."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "No te quedes jugando en la escena",
            "texto": "Las intervenciones que no salvan la vida no deben retrasar el traslado del paciente critico. Lo que se pueda hacer en movimiento, se hace en la ambulancia."
          }
        ],
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      },
      {
        "titulo": "Codigo de colores",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Categorias del triage",
            "headers": [
              "Color",
              "Prioridad",
              "Significado"
            ],
            "filas": [
              [
                "Rojo",
                "Inmediata (I)",
                "Lesion critica pero salvable; atencion y traslado prioritarios"
              ],
              [
                "Amarillo",
                "Diferida (II)",
                "Lesion seria pero estable; puede esperar un poco"
              ],
              [
                "Verde",
                "Menor (III)",
                "Heridos leves que deambulan; los walking wounded"
              ],
              [
                "Negro",
                "Expectante / fallecido",
                "Sin signos de vida o lesiones incompatibles con la vida"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "La categoria negra es dinamica",
            "texto": "En un IMV, el negro incluye a fallecidos y a expectantes (heridos sin posibilidad razonable de sobrevivir con los recursos disponibles). Si la situacion mejora y llegan recursos, algunos pueden reclasificarse."
          }
        ],
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "titulo": "Escalas prehospitalarias",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Escala de Cincinnati",
            "headers": [
              "Componente",
              "Hallazgo anormal"
            ],
            "filas": [
              [
                "Asimetría facial",
                "Un lado de la cara no se mueve igual al sonreir."
              ],
              [
                "Debilidad de brazos",
                "Un brazo cae o no se eleva igual que el otro."
              ],
              [
                "Lenguaje",
                "Habla arrastrada, palabras incorrectas o incapacidad de hablar."
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Conceptos clave del traslado",
            "items": [
              "Cualquier componente anormal de Cincinnati sugiere alta probabilidad de EVC.",
              "Las escalas de gran vaso (como RACE o LAMS) ayudan a decidir el centro destino.",
              "Registrar la hora de inicio o de ultima vez visto sano es crítico.",
              "Glucemia capilar obligatoria: la hipoglucemia imita un EVC."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "La hora de inicio manda",
            "texto": "El tratamiento de reperfusión depende del tiempo de evolución. Determinar con precisión la hora de inicio (o la ultima vez que se vio sano al paciente) es uno de los datos prehospitalarios más valiosos. El tiempo es cerebro."
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "titulo": "Ventana terapéutica del EVC isquémico",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Estrategias de reperfusión",
            "items": [
              "Trombolisis IV: ventana clásica hasta 4.5 horas en pacientes seleccionados.",
              "Trombectomía mecánica: en oclusión de gran vaso, ventana ampliada hasta 24 h con criterios de imagen.",
              "Preavisar al hospital activa el código ictus y acorta los tiempos.",
              "Trasladar a un centro con capacidad de imagen y, si aplica, trombectomía."
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Cuidados prehospitalarios del EVC",
            "items": [
              "Mantener SpO2 mayor o igual a 94 por ciento y evitar la hipotensión.",
              "No administrar nada por boca por riesgo de aspiración.",
              "Corregir la hipoglucemia y evitar tanto la hipo como la hiperglucemia.",
              "Documentar el déficit y la hora; traslado rápido con preaviso."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Descarta los imitadores",
            "texto": "La hipoglucemia, las convulsiones con parálisis de Todd, la migraña con aura y las intoxicaciones imitan al EVC. La glucemia capilar es obligatoria antes de etiquetar cualquier déficit como vascular."
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "titulo": "NOM-087: manejo de RPBI en la ambulancia",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La NOM-087-SEMARNAT-SSA1-2002 (citada también como NOM-087-ECOL-SSA1-2002) regula la separación, envasado y disposición de los Residuos Peligrosos Biológico-Infecciosos (RPBI). Su correcta clasificación por colores previene contagios y sanciones."
          },
          {
            "tipo": "tabla",
            "titulo": "Clasificación y código de colores de los RPBI",
            "headers": [
              "Residuo",
              "Envase y color"
            ],
            "filas": [
              [
                "Sangre y líquidos",
                "Recipiente hermético ROJO"
              ],
              [
                "Cultivos y cepas de agentes infecciosos",
                "Bolsa ROJA"
              ],
              [
                "Patológicos (tejidos, órganos)",
                "Bolsa AMARILLA"
              ],
              [
                "No anatómicos (gasas, materiales con fluidos)",
                "Bolsa ROJA"
              ],
              [
                "Punzocortantes (agujas, bisturís)",
                "Recipiente rígido ROJO"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Los punzocortantes NUNCA a la bolsa",
            "texto": "Las agujas y objetos punzocortantes van siempre en el contenedor rígido rojo, jamás en una bolsa (perforan y exponen). No se reencapuchan las agujas. Todo envase lleva el símbolo universal de riesgo biológico y la leyenda \"RPBI\"."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Código de colores RPBI NOM-087",
            "caption": "Clasificación de RPBI por colores (NOM-087): rojo, amarillo y contenedor rígido.",
            "busqueda": "NOM-087 RPBI clasificacion colores bolsa roja amarilla punzocortantes"
          }
        ],
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      },
      {
        "titulo": "Negativa de atención (rechazo informado)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Un paciente adulto, consciente y competente tiene derecho a rechazar la atención o el traslado. Para que la negativa sea válida y te proteja, debe quedar documentada correctamente en el FRAP."
          },
          {
            "tipo": "pasos",
            "titulo": "Cómo documentar un rechazo",
            "items": [
              "Verifica la capacidad: paciente orientado, sin alteración por alcohol, drogas, hipoxia o TCE.",
              "Explica en términos claros los riesgos de no recibir atención, incluida la posibilidad de muerte o daño grave.",
              "Ofrece alternativas (llamar de nuevo, acudir por medios propios) y respóndele sus dudas.",
              "Registra que se informó y que el paciente comprendió; obtén su firma y, de ser posible, la de un testigo."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Si no puede decidir, no hay rechazo válido",
            "texto": "Un paciente con estado de conciencia alterado, un menor sin tutor o una persona incapaz de comprender los riesgos NO puede rechazar válidamente la atención: opera el consentimiento implícito y se procede a atender."
          }
        ],
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Carga y rueda",
        "definicion": "Estrategia de traslado rapido en trauma critico priorizando la cirugia.",
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      },
      {
        "termino": "TECC",
        "definicion": "Medicina táctica civil en tres fases: amenaza directa (caliente), indirecta (templada) y evacuación (fría).",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar",
          "porUnidad": true
        }
      },
      {
        "termino": "Zonas HazMat",
        "definicion": "Caliente (roja), templada (amarilla, descontaminación) y fría (verde, atención).",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar",
          "porUnidad": true
        }
      },
      {
        "termino": "Defusing/Debriefing",
        "definicion": "Intervenciones de descarga emocional tras incidentes críticos.",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que intervenciones se hacen en camino",
        "reverso": "Las que no salvan la vida de inmediato y no deben retrasar el traslado.",
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      },
      {
        "frente": "¿Qué hace el CRUM?",
        "reverso": "Regula y coordina el traslado y asigna el hospital con capacidad resolutiva.",
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      },
      {
        "frente": "Las cinco funciones del SCI",
        "reverso": "Comando, Operaciones, Planeación, Logística, y Administración/Finanzas.",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      },
      {
        "frente": "¿Qué significa MARCH?",
        "reverso": "Massive hemorrhage, Airway, Respirations, Circulation, Head/Hypothermia.",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar",
          "porUnidad": true
        }
      },
      {
        "frente": "Color de la zona de descontaminación HazMat",
        "reverso": "Amarilla (zona templada).",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar",
          "porUnidad": true
        }
      },
      {
        "frente": "Diferencia entre defusing y debriefing",
        "reverso": "Defusing: charla breve e inmediata; debriefing: revisión estructurada días después.",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar",
          "porUnidad": true
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "En un paciente con herida penetrante toracica y shock, la filosofia PHTLS recomienda:",
        "opciones": [
          "Maniobras prolongadas en escena",
          "Carga y rueda hacia el centro de trauma",
          "Esperar refuerzos sin trasladar",
          "Reanimacion con grandes volumenes en escena"
        ],
        "correcta": 1,
        "explicacion": "El trauma penetrante critico se beneficia del quirofano; la estrategia de carga y rueda prioriza el traslado rapido.",
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      },
      {
        "pregunta": "Al aproximarse a un helicóptero, lo correcto es:",
        "opciones": [
          "Acercarse por la cola",
          "Acercarse por el frente, a la vista del piloto",
          "Correr agachado por cualquier lado",
          "Esperar a que apaguen el rotor siempre"
        ],
        "correcta": 1,
        "explicacion": "Siempre por el frente y a la vista del piloto, nunca por la cola (rotor de cola); en pendiente, por el lado cuesta abajo.",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar",
          "porUnidad": true
        }
      }
    ]
  },
  "m3-va-triple-maniobra": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Que significa carga y rueda",
        "reverso": "Trasladar rapido al quirofano, evitando maniobras prolongadas en escena.",
        "procedencia": {
          "temaOriginal": "phtls-trauma"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Una taquicardia regular de complejo estrecho a 180 lpm en paciente estable. El manejo inicial es:",
        "opciones": [
          "Cardioversión inmediata",
          "Maniobras vagales y luego adenosina",
          "Amiodarona 300 mg",
          "Atropina"
        ],
        "correcta": 1,
        "explicacion": "En la TSVP estable se inicia con maniobras vagales y, si fallan, adenosina 6 mg seguida de 12 mg.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "pregunta": "El soplo de la miocardiopatia hipertrofica obstructiva tipicamente:",
        "opciones": [
          "Disminuye con la Valsalva",
          "Aumenta con la Valsalva",
          "No se modifica con maniobras",
          "Solo se ausculta en diastole"
        ],
        "correcta": 1,
        "explicacion": "La Valsalva reduce la precarga y el tamano ventricular, lo que acentua la obstruccion al tracto de salida y aumenta el soplo.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      },
      {
        "pregunta": "Tras intubar a un asmático aparece hipotensión súbita. La maniobra inmediata es:",
        "opciones": [
          "Subir la frecuencia del ventilador",
          "Desconectar del ventilador y permitir la espiración",
          "Administrar un betabloqueador",
          "Reducir el tiempo espiratorio"
        ],
        "correcta": 1,
        "explicacion": "Sugiere auto-PEEP por atrapamiento aéreo: desconectar y dejar exhalar (y descartar neumotórax) restaura el retorno venoso.",
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada"
        }
      }
    ]
  },
  "m5-cin-definicion": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Primer paso de la atencion del trauma",
        "reverso": "La evaluacion de la escena (seguridad y mecanismo).",
        "procedencia": {
          "temaOriginal": "phtls-trauma",
          "porUnidad": true
        }
      },
      {
        "frente": "Mecanismo de la naloxona",
        "reverso": "Antagonista de receptores opioides con alta afinidad que los desplaza.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas",
          "porUnidad": true
        }
      },
      {
        "frente": "Mecanismo de la norepinefrina",
        "reverso": "Agonista alfa-1 > beta-1: vasoconstricción que eleva la RVS.",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada",
          "porUnidad": true
        }
      }
    ],
    "quiz": []
  },
  "m4-tox-picaduras": {
    "secciones": [
      {
        "titulo": "Lesiones electricas y mordeduras",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La corriente electrica causa daño por quemadura y por sus efectos sobre el corazon y los nervios. Las picaduras y mordeduras varian desde reacciones locales hasta envenenamiento y anafilaxia."
          },
          {
            "tipo": "lista",
            "titulo": "Lesiones electricas",
            "items": [
              "Corta la fuente de energia antes de tocar al paciente.",
              "Busca herida de entrada y de salida; el daño interno suele ser mayor al visible.",
              "Vigila arritmias: la corriente puede provocar fibrilacion ventricular.",
              "El rayo produce paro cardiaco y respiratorio; prioriza ventilar y desfibrilar."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Picaduras y mordeduras",
            "headers": [
              "Agente",
              "Datos clave",
              "Conducta"
            ],
            "filas": [
              [
                "Abeja o avispa",
                "Dolor local, riesgo de anafilaxia",
                "Retirar aguijon, vigilar reaccion alergica"
              ],
              [
                "Araña o alacran",
                "Dolor, posible toxicidad sistemica",
                "Inmovilizar, traslado, antiveneno hospitalario"
              ],
              [
                "Serpiente",
                "Marcas de colmillos, edema, dolor",
                "Inmovilizar la extremidad por debajo del corazon, traslado urgente"
              ],
              [
                "Mordedura de animal o humano",
                "Riesgo de infeccion y rabia",
                "Lavado, control de hemorragia, valoracion medica"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Mordedura de serpiente: que NO hacer",
            "texto": "No succiones la herida, no apliques torniquete arterial, no cortes la piel ni pongas hielo. Inmoviliza, mantén la extremidad a nivel del corazon o ligeramente por debajo y traslada para recibir antiveneno."
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "titulo": "Alacranismo (Centruroides)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La picadura de alacrán del género Centruroides es una de las intoxicaciones más frecuentes en México. El veneno es neurotóxico: libera neurotransmisores y produce un cuadro que va del dolor local intenso a manifestaciones sistémicas. Es mucho más grave en niños pequeños y ancianos."
          },
          {
            "tipo": "tabla",
            "titulo": "Gravedad del alacranismo",
            "headers": [
              "Grado",
              "Manifestaciones"
            ],
            "filas": [
              [
                "I (leve)",
                "Dolor y parestesias locales, sin datos sistémicos"
              ],
              [
                "II (moderado)",
                "Sialorrea, prurito nasal/faríngeo, inquietud, fasciculaciones"
              ],
              [
                "III (grave)",
                "Distrés respiratorio, nistagmo, convulsiones, arritmias, edema pulmonar"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "Faboterápico Alacramyn",
            "texto": "El antiveneno faboterápico (Alacramyn) es el tratamiento de los casos moderados y graves, y ha reducido drásticamente la mortalidad por alacranismo en México. Se administra según la gravedad y la respuesta. Evita usar de rutina gluconato de calcio o atropina: el pilar es el antiveneno y el soporte."
          },
          {
            "tipo": "imagen",
            "src": "https://commons.wikimedia.org/wiki/Special:FilePath/StripedBarkScorpion.jpg?width=720",
            "alt": "Alacrán del género Centruroides",
            "caption": "Alacrán de corteza (Centruroides): responsable del alacranismo en México.",
            "fuente": "Wikimedia Commons",
            "fuenteUrl": "https://commons.wikimedia.org/wiki/File:StripedBarkScorpion.jpg",
            "busqueda": "Centruroides alacran Mexico"
          }
        ],
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      },
      {
        "titulo": "Principios prehospitalarios",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Qué SÍ hacer",
            "items": [
              "Calmar al paciente e inmovilizar la extremidad a la altura del corazón.",
              "Retirar anillos, relojes y ropa apretada antes de que progrese el edema.",
              "Limpiar la herida con agua y jabón; marcar con pluma el borde del edema y anotar la hora para vigilar su avance.",
              "Trasladar pronto al centro que disponga de antiveneno; identificar al animal con una foto a distancia segura."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Lo que NUNCA debes hacer",
            "texto": "Nada de torniquetes, succión (boca o dispositivos), incisiones, hielo, calor, descargas eléctricas ni remedios caseros: aumentan el daño local y no eliminan el veneno. Tampoco persigas a la serpiente o el alacrán: arriesgas una segunda víctima."
          },
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "IMSS — GPC Diagnóstico y tratamiento de mordedura de serpiente",
                "url": "https://edumed.imss.gob.mx/pediatria/toxico/guia_pract_clin_serpientes.pdf"
              },
              {
                "nombre": "UNAM — Instituto de Biotecnología (antivenenos)",
                "url": "https://biotecmov.ibt.unam.mx/numeros/32/2.html"
              },
              {
                "nombre": "Goldfrank — Toxicologic Emergencies",
                "nota": "Envenenamiento por animales ponzoñosos"
              },
              {
                "nombre": "Bioclon / Cofepris — Faboterápicos (Antivipmyn, Alacramyn, Aracmyn, Coralmyn)",
                "nota": "Antivenenos de uso en México"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Loxoscelismo",
        "definicion": "Araña violinista: lesión cutánea necrótica; rara hemólisis sistémica.",
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Tres maniobras prohibidas en mordedura/picadura",
        "reverso": "Torniquete, succión e incisión (también hielo y descargas).",
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual de estas acciones es CORRECTA ante una mordedura de serpiente?",
        "opciones": [
          "Succionar el veneno",
          "Aplicar torniquete arterial",
          "Inmovilizar la extremidad y trasladar para antiveneno",
          "Cortar la herida y aplicar hielo"
        ],
        "correcta": 2,
        "explicacion": "El manejo correcto es inmovilizar, mantener la extremidad a nivel del corazon o debajo y trasladar; succionar, cortar, hielo y torniquete arterial estan contraindicados.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "pregunta": "Paciente mordido por una serpiente, con marca mínima y poco dolor, que horas después presenta ptosis y dificultad respiratoria. Lo más probable es:",
        "opciones": [
          "Mordedura de cascabel",
          "Envenenamiento por coralillo (neurotóxico)",
          "Reacción alérgica leve",
          "Picadura de alacrán grado I"
        ],
        "correcta": 1,
        "explicacion": "El coralillo deja poco daño local pero su neurotoxina produce parálisis progresiva: vigilar vía aérea y trasladar de inmediato.",
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      },
      {
        "pregunta": "Ante una mordedura de víbora en el antebrazo, una maniobra prehospitalaria CORRECTA es:",
        "opciones": [
          "Colocar un torniquete arterial",
          "Succionar el veneno",
          "Inmovilizar el brazo y retirar anillos/reloj",
          "Aplicar hielo y hacer una incisión"
        ],
        "correcta": 2,
        "explicacion": "Se inmoviliza la extremidad y se retiran anillos antes del edema; torniquete, succión, hielo e incisión están contraindicados.",
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      },
      {
        "pregunta": "El faboterápico Alacramyn se utiliza para el envenenamiento por:",
        "opciones": [
          "Coralillo",
          "Alacrán (Centruroides)",
          "Viuda negra",
          "Cascabel"
        ],
        "correcta": 1,
        "explicacion": "Alacramyn es el antiveneno faboterápico contra el alacranismo por Centruroides.",
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      }
    ]
  },
  "m5-la-hipotermia": {
    "secciones": [
      {
        "titulo": "Oximetría de pulso (SpO2)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La oximetría mide el porcentaje de hemoglobina saturada de oxígeno mediante la absorción de dos longitudes de onda de luz. Es rápida y no invasiva, pero tiene puntos ciegos importantes que el paramédico debe conocer."
          },
          {
            "tipo": "lista",
            "titulo": "Limitaciones de la oximetría",
            "items": [
              "Intoxicación por monóxido de carbono: el oxímetro no distingue carboxihemoglobina y marca un valor falsamente normal.",
              "Mala perfusión, hipotermia o vasoconstricción: lectura inestable o ausente.",
              "Movimiento, esmalte de uñas oscuro y luz ambiental intensa: artefactos.",
              "La SpO2 cae tarde tras el inicio de la hipoxia: no es un detector precoz."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "El monóxido engaña",
            "texto": "En una intoxicación por CO, la SpO2 puede mostrar 99% mientras el paciente se asfixia, porque el oxímetro confunde la carboxihemoglobina con oxihemoglobina. Confíe en la clínica y el contexto, no en el número."
          }
        ],
        "procedencia": {
          "temaOriginal": "monitorizacion-paciente"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "No esta muerto hasta estar caliente y muerto",
        "definicion": "Principio que obliga a recalentar antes de declarar muerte por hipotermia.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Principio clave en hipotermia severa",
        "reverso": "No esta muerto hasta estar caliente y muerto: recalentar antes de cesar.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      },
      {
        "frente": "Enumera las cinco H",
        "reverso": "Hipovolemia, hipoxia, hidrogeniones, hipo/hiperpotasemia, hipotermia.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Cual es el problema fisiopatologico central del ahogamiento?",
        "opciones": [
          "La hipotermia exclusivamente",
          "La hipoxia",
          "La cantidad de agua tragada",
          "El tipo de agua (dulce o salada)"
        ],
        "correcta": 1,
        "explicacion": "El determinante del pronostico en el ahogamiento es la hipoxia; por eso la prioridad de manejo es restablecer la oxigenacion.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales"
        }
      }
    ]
  },
  "m4-epi-urgencia-emergencia": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Problema central del ahogamiento",
        "reverso": "La hipoxia; la prioridad es restablecer la oxigenacion.",
        "procedencia": {
          "temaOriginal": "emergencias-ambientales",
          "porUnidad": true
        }
      },
      {
        "frente": "Que diferencia una emergencia de una urgencia hipertensiva",
        "reverso": "La emergencia tiene dano agudo de organo blanco.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      },
      {
        "frente": "¿Cómo se reducen los fenómenos de emergencia de la ketamina?",
        "reverso": "Administración lenta/diluida, entorno tranquilo y benzodiacepina si aparecen.",
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      }
    ],
    "quiz": []
  },
  "m5-que-curacion": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Sistema de comando de incidentes",
        "definicion": "Estructura que coordina la respuesta con cadena de mando unica.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      }
    ],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "En el sistema de comando de incidentes, quien asume el mando inicial?",
        "opciones": [
          "El medico de mayor jerarquia del hospital",
          "El primer rescatador capacitado en llegar, hasta ser relevado",
          "La policia siempre",
          "Nadie hasta que llegue el director"
        ],
        "correcta": 1,
        "explicacion": "El primer rescatador capacitado en arribar asume el comando para mantener una cadena de mando unica, hasta que alguien lo releve formalmente.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      }
    ]
  },
  "m6-ip-pediatria": {
    "secciones": [
      {
        "titulo": "Glasgow pediatrico (modificacion)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "En el niño que aun no habla, la respuesta verbal se adapta porque no puede estar \"orientado\". Las respuestas ocular y motora se evaluan igual que en el adulto, ajustando las ordenes a la edad."
          },
          {
            "tipo": "tabla",
            "titulo": "Respuesta verbal pediatrica (lactante / preverbal)",
            "headers": [
              "Puntos",
              "Respuesta verbal del lactante"
            ],
            "filas": [
              [
                "5",
                "Balbucea, sonrie, sigue objetos (apropiado)"
              ],
              [
                "4",
                "Llanto consolable"
              ],
              [
                "3",
                "Llanto inconsolable ante el estimulo"
              ],
              [
                "2",
                "Quejido o gruñido"
              ],
              [
                "1",
                "Ninguna"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "No olvides el TEP",
            "texto": "En pediatria, el Triangulo de Evaluacion Pediatrica (apariencia, trabajo respiratorio y circulacion de la piel) da una impresion del estado neurologico y de gravedad desde la puerta, antes de tocar al niño, y complementa al Glasgow."
          }
        ],
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      },
      {
        "titulo": "Deshidratacion",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Grados de deshidratacion",
            "headers": [
              "Grado",
              "Signos clinicos",
              "Conducta"
            ],
            "filas": [
              [
                "Leve",
                "Mucosas algo secas, sed, sin alteracion hemodinamica",
                "Rehidratacion oral"
              ],
              [
                "Moderada",
                "Ojos hundidos, llenado capilar lento, irritabilidad, oliguria",
                "Rehidratacion oral o intravenosa segun tolerancia"
              ],
              [
                "Grave",
                "Letargia, signo del pliegue, hipotension, choque",
                "Rehidratacion intravenosa con bolos"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Signos utiles en el nino",
            "items": [
              "Llenado capilar prolongado.",
              "Ausencia de lagrimas y mucosas secas.",
              "Fontanela hundida en el lactante.",
              "Disminucion del gasto urinario (panales secos)."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Rehidratacion oral primero",
            "texto": "En la deshidratacion leve a moderada, la rehidratacion oral con sales de rehidratacion es eficaz y de eleccion. La via intravenosa se reserva para la deshidratacion grave, el choque o la intolerancia a la via oral."
          }
        ],
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      },
      {
        "titulo": "Fiebre en pediatria",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La fiebre es un motivo de consulta muy frecuente. El abordaje depende de la edad: cuanto menor es el nino, mayor el riesgo de infeccion bacteriana grave y mas cauteloso el manejo."
          },
          {
            "tipo": "lista",
            "titulo": "Abordaje por edad",
            "items": [
              "Lactante muy pequeno (menor de un mes y los primeros meses): mayor riesgo; suele requerir estudios amplios.",
              "Nino mayor con buen estado general: foco clinico identificable y manejo dirigido.",
              "Valorar siempre el estado general por encima de la cifra de temperatura.",
              "Buscar signos de alarma: mal aspecto, exantema petequial, rigidez de nuca, dificultad respiratoria."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "El estado general manda",
            "texto": "Un nino con fiebre alta pero buen aspecto e interactivo suele tener menor riesgo que uno con fiebre menor pero aspecto toxico (letargia, irritabilidad, mala perfusion). La apariencia del triangulo pediatrico orienta mas que el numero del termometro."
          }
        ],
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Para que sirve JumpSTART",
        "reverso": "Triage pediatrico que añade 5 ventilaciones antes de etiquetar como negro al niño en apnea con pulso.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Por que JumpSTART añade ventilaciones de rescate en el niño en apnea con pulso?",
        "opciones": [
          "Porque el paro pediatrico suele ser de origen respiratorio",
          "Para ganar tiempo administrativo",
          "Porque los niños no se clasifican",
          "Por costumbre historica"
        ],
        "correcta": 0,
        "explicacion": "En pediatria el paro es predominantemente respiratorio; unas ventilaciones pueden revertirlo, por eso se intentan antes de etiquetar como negro.",
        "procedencia": {
          "temaOriginal": "triage-mci"
        }
      },
      {
        "pregunta": "En el choque pediatrico, la hipotension:",
        "opciones": [
          "Aparece temprano",
          "Es un signo tardio y ominoso",
          "Nunca ocurre",
          "Es el primer signo"
        ],
        "correcta": 1,
        "explicacion": "El nino compensa con taquicardia y vasoconstriccion; la hipotension aparece tarde e indica choque ya descompensado.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      },
      {
        "pregunta": "En la valoracion de la fiebre pediatrica, el factor mas importante para juzgar la gravedad es:",
        "opciones": [
          "La cifra exacta de temperatura",
          "El estado general y el aspecto del nino",
          "La duracion en dias siempre",
          "El color de la fiebre"
        ],
        "correcta": 1,
        "explicacion": "El estado general (aspecto, interaccion, perfusion) pesa mas que la cifra del termometro para estimar el riesgo.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ]
  },
  "m3-ep-avdi": {
    "secciones": [
      {
        "titulo": "AVDI: el tamiz rapido del estado de conciencia",
        "bloques": [
          {
            "tipo": "p",
            "texto": "AVDI (en ingles AVPU) es la valoracion mas rapida del nivel de conciencia y se hace durante la \"D\" de la evaluacion primaria. Clasifica al paciente en cuatro niveles segun el menor estimulo que provoca respuesta. Es ideal para el primer contacto y para reevaluar tendencia en segundos, antes de calcular el Glasgow."
          },
          {
            "tipo": "tabla",
            "titulo": "Niveles de la escala AVDI",
            "headers": [
              "Nivel",
              "Que evalua",
              "Glasgow aproximado"
            ],
            "filas": [
              [
                "A — Alerta",
                "Ojos abiertos, responde e interactua espontaneamente",
                "14 a 15"
              ],
              [
                "V — responde a la Voz",
                "Reacciona solo al estimulo verbal (llamado)",
                "9 a 13"
              ],
              [
                "D — responde al Dolor",
                "Reacciona solo al estimulo doloroso",
                "6 a 8"
              ],
              [
                "I — Inconsciente",
                "No responde a ningun estimulo",
                "3 a 5"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "AVDI primero, Glasgow despues",
            "texto": "AVDI se obtiene en segundos y orienta la gravedad de inmediato; el Glasgow cuantifica con detalle y sirve para seguir la tendencia. La correspondencia con Glasgow es aproximada (no exacta): un paciente que solo responde al Dolor ronda un Glasgow de 8, el umbral de via aerea no protegida."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "La \"D\" tambien es Dextrosa",
            "texto": "En todo paciente con estado mental alterado mide la glucemia capilar SIEMPRE: la hipoglucemia imita a un evento vascular cerebral y se corrige en minutos. No dejes morir a nadie por no medir el azucar."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Escala AVPU / AVDI",
            "caption": "Escala AVDI (AVPU): los cuatro niveles de respuesta del estado de conciencia.",
            "busqueda": "AVPU scale alert verbal pain unresponsive prehospital diagram"
          }
        ],
        "procedencia": {
          "temaOriginal": "evaluacion-neurologica-avdi-glasgow"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": []
  },
  "m6-emp-rn-sano-asfixia": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Ultima vez visto sano",
        "definicion": "Hora que define la ventana de reperfusión cuando se desconoce el inicio.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      }
    ],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "El alacranismo es particularmente grave en:",
        "opciones": [
          "Adultos jóvenes sanos",
          "Niños pequeños",
          "Solo en ancianos",
          "No tiene grupos de riesgo"
        ],
        "correcta": 1,
        "explicacion": "Los niños pequeños desarrollan con más facilidad el cuadro sistémico grave; requieren atención y antiveneno oportunos.",
        "procedencia": {
          "temaOriginal": "fauna-venenosa-mexico"
        }
      }
    ]
  },
  "m3-vi-cristaloides": {
    "secciones": [
      {
        "titulo": "Compartimentos y distribución del agua",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El agua corporal total (~60% del peso) se reparte en el compartimento intracelular (2/3) y el extracelular (1/3), este último dividido en intersticial (3/4) e intravascular (1/4). La tonicidad de la solución que infundimos decide hacia qué compartimento se desplaza el agua."
          },
          {
            "tipo": "tabla",
            "headers": [
              "Solución",
              "Tonicidad",
              "Destino y uso"
            ],
            "filas": [
              [
                "Salino 0.9% (fisiológico)",
                "Isotónica",
                "Permanece en el extracelular; reanimación general. Riesgo de acidosis hiperclorémica en grandes volúmenes."
              ],
              [
                "Ringer Lactato / Hartmann",
                "Isotónica (balanceada)",
                "Extracelular; más fisiológica, el lactato se metaboliza a bicarbonato."
              ],
              [
                "Plasmalyte",
                "Isotónica (balanceada)",
                "Extracelular; composición muy cercana al plasma."
              ],
              [
                "Glucosado 5%",
                "Isotónica que se vuelve hipotónica",
                "Se distribuye a todos los compartimentos al consumirse la glucosa; no expande la volemia."
              ],
              [
                "Salino hipertónico 3% / 7.5%",
                "Hipertónica",
                "Atrae agua del intracelular al intravascular; TCE con HIC, reanimación de bajo volumen."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Cristaloides vs. coloides",
            "texto": "Los cristaloides (salino, Ringer) contienen electrolitos y agua, se distribuyen rápido y son baratos, pero gran parte abandona el espacio intravascular en ~30-60 min. Los coloides (albúmina, almidones) contienen moléculas grandes que retienen agua en el vaso por presión oncótica, expandiendo más con menos volumen, pero son más caros y con riesgos propios."
          }
        ],
        "procedencia": {
          "temaOriginal": "terapia-iv-io"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Solución que causa acidosis hiperclorémica en grandes volúmenes",
        "reverso": "El salino 0.9% por su alto contenido de cloro.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      },
      {
        "frente": "¿Por qué la atropina falla en el Mobitz II?",
        "reverso": "Porque el bloqueo es infranodal; la solución es el marcapasos.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "frente": "Osmótico preferido si el paciente está hipotenso",
        "reverso": "Solución salina hipertónica 3% (el manitol puede hipotensar).",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "En insuficiencia hepatica grave hay que tener especial precaucion con:",
        "opciones": [
          "Antibioticos de eliminacion renal pura",
          "Sedantes y opioides por riesgo de encefalopatia",
          "Soluciones cristaloides",
          "Oxigeno suplementario"
        ],
        "correcta": 1,
        "explicacion": "Los sedantes y opioides pueden precipitar o agravar la encefalopatia hepatica y deben usarse con extrema cautela.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      }
    ]
  },
  "m4-far-nom-034": {
    "secciones": [
      {
        "titulo": "Acceso intraóseo (IO)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La cavidad medular es una \"vena no colapsable\": permite infundir fluidos y fármacos con absorción casi inmediata a la circulación central cuando el acceso IV es imposible o se retrasa en emergencias."
          },
          {
            "tipo": "lista",
            "titulo": "Sitios de inserción",
            "items": [
              "Tibia proximal: 1-2 cm medial e inferior a la tuberosidad tibial (sitio más usado en adultos y niños).",
              "Húmero proximal: tuberosidad mayor; alto flujo, útil en RCP, pero se desplaza con el movimiento del brazo.",
              "Tibia distal y esternón (dispositivos específicos) como alternativas."
            ]
          },
          {
            "tipo": "tabla",
            "headers": [
              "Contraindicaciones",
              "Complicaciones"
            ],
            "filas": [
              [
                "Fractura del hueso elegido",
                "Extravasación / mala posición"
              ],
              [
                "IO o intento previo en el mismo hueso (≤48 h)",
                "Síndrome compartimental"
              ],
              [
                "Infección/celulitis en el sitio",
                "Osteomielitis (infección ósea)"
              ],
              [
                "Prótesis o cirugía ortopédica en el sitio",
                "Embolia grasa (raro), dolor a la infusión"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Síndrome compartimental",
            "texto": "Si la aguja IO se desplaza, el líquido se extravasa al compartimento muscular, elevando la presión y comprometiendo la perfusión: dolor desproporcionado, tensión y aumento de volumen del miembro. Es una complicación grave que exige retirar la vía y vigilancia estrecha."
          }
        ],
        "procedencia": {
          "temaOriginal": "terapia-iv-io"
        }
      },
      {
        "titulo": "NOM-034-SSA3-2013: atención médica prehospitalaria",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La NOM-034-SSA3-2013, \"Regulación de los servicios de salud. Atención médica prehospitalaria\" (publicada en el Diario Oficial de la Federación el 23 de septiembre de 2014), es la norma rectora del servicio prehospitalario en México. Establece criterios mínimos para la atención, el equipamiento y la tipificación de las ambulancias, y el perfil del personal."
          },
          {
            "tipo": "tabla",
            "titulo": "Tipificación de ambulancias (NOM-034)",
            "headers": [
              "Tipo",
              "Capacidad",
              "Personal mínimo"
            ],
            "filas": [
              [
                "Ambulancia de traslado",
                "Pacientes estables sin riesgo vital",
                "Conductor y técnico"
              ],
              [
                "Urgencias básicas (TUM-B)",
                "Soporte vital básico",
                "TUM básico"
              ],
              [
                "Urgencias avanzadas (TUM-A)",
                "Soporte vital avanzado (vía aérea, fármacos)",
                "TUM avanzado / paramédico"
              ],
              [
                "Cuidados intensivos",
                "Traslado de paciente crítico",
                "Personal con competencias críticas"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "El perfil del TUM",
            "texto": "La norma define al Técnico en Urgencias Médicas (TUM) en sus niveles (básico, intermedio y avanzado) y sus competencias. Actuar fuera de tu nivel de certificación o protocolo es una de las fuentes más comunes de problemas médico-legales."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Tipificación de ambulancias NOM-034",
            "caption": "Tipos de ambulancia según la NOM-034 y su equipamiento.",
            "busqueda": "NOM-034 tipificacion ambulancias Mexico tipos equipamiento"
          }
        ],
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      },
      {
        "titulo": "Coordinación médica: CRUM y 911",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El Centro Regulador de Urgencias Médicas (CRUM) coordina la atención y el traslado, asigna el hospital con capacidad resolutiva y enlaza con la dirección médica. El número único de emergencias 9-1-1 recibe la llamada y despacha el recurso. La comunicación clara y el reporte estructurado al hospital aceleran la atención definitiva."
          },
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "NOM-034-SSA3-2013 (texto oficial, PDF)",
                "url": "https://salud.guanajuato.gob.mx/download/Normatividad/Normas/NOM_034_SSA3_2013.pdf"
              },
              {
                "nombre": "NOM-087-SEMARNAT-SSA1-2002 (RPBI, resumen y PDF)",
                "url": "https://www.normasoficiales.mx/nom/nom-087-semarnat-ssa1-2002"
              },
              {
                "nombre": "Ley General de Salud (Cámara de Diputados, PDF)",
                "url": "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf"
              },
              {
                "nombre": "Diario Oficial de la Federación (DOF)",
                "url": "https://www.dof.gob.mx/",
                "nota": "Publicación oficial de las NOM"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      },
      {
        "titulo": "Entrega-recepción y cierre",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La atención termina con una transferencia formal a personal de igual o mayor nivel. Da un reporte estructurado (motivo, hallazgos, manejo y evolución) y registra en el FRAP el nombre y cargo de quien recibe, el hospital y la hora de entrega, con su firma. Sin esa transferencia documentada, la responsabilidad sigue siendo tuya."
          },
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "NOM-034-SSA3-2013 (texto oficial, PDF)",
                "url": "https://salud.guanajuato.gob.mx/download/Normatividad/Normas/NOM_034_SSA3_2013.pdf"
              },
              {
                "nombre": "Ley General de Salud (Cámara de Diputados, PDF)",
                "url": "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGS.pdf"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "NOM-034-SSA3-2013",
        "definicion": "Norma que regula la atención médica prehospitalaria y tipifica las ambulancias en México.",
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      },
      {
        "termino": "NOM-087",
        "definicion": "Norma de manejo de RPBI; rojo para sangre/cultivos/no anatómicos/punzocortantes, amarillo para patológicos.",
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "¿Qué regula la NOM-034-SSA3-2013?",
        "reverso": "La atención médica prehospitalaria y la tipificación de ambulancias en México.",
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      }
    ],
    "quiz": []
  },
  "m3-vi-ventajas-desventajas": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Presión oncótica",
        "definicion": "Fuerza de las proteínas/coloides que retiene agua en el espacio intravascular.",
        "procedencia": {
          "temaOriginal": "terapia-iv-io",
          "porUnidad": true
        }
      },
      {
        "termino": "Epidural vs. subdural",
        "definicion": "Lente biconvexa arterial vs. semiluna venosa.",
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Biodisponibilidad de la vía intravenosa",
        "reverso": "100%: no hay barreras de absorción ni primer paso hepático.",
        "procedencia": {
          "temaOriginal": "farmacologia-toxicologia"
        }
      },
      {
        "frente": "Ventaja de los DSG de segunda generación",
        "reverso": "Incluyen canal gástrico que reduce el riesgo de aspiración.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      },
      {
        "frente": "Biodisponibilidad de la vía intravenosa",
        "reverso": "100%, porque salta toda barrera de absorción.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "frente": "Origen mas frecuente del trombo en una TEP",
        "reverso": "Trombosis venosa profunda de miembros inferiores.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "frente": "Tratamiento inmediato de la crisis suprarrenal",
        "reverso": "Hidrocortisona intravenosa y reposicion de volumen.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Una desventaja de infundir grandes volúmenes de salino 0.9% es:",
        "opciones": [
          "Provoca alcalosis",
          "Causa acidosis hiperclorémica",
          "Eleva el calcio",
          "Es hipotónico"
        ],
        "correcta": 1,
        "explicacion": "El alto contenido de cloro del salino 0.9% puede generar acidosis hiperclorémica en reanimaciones extensas; las soluciones balanceadas la evitan.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      },
      {
        "pregunta": "La vía intravenosa tiene una biodisponibilidad del 100% porque:",
        "opciones": [
          "Se metaboliza en el hígado primero",
          "Salta cualquier barrera de absorción y llega directa a la circulación",
          "Se absorbe lentamente",
          "Depende del flujo muscular"
        ],
        "correcta": 1,
        "explicacion": "Al administrarse directamente en el torrente sanguíneo, la totalidad de la dosis queda disponible de inmediato, sin pérdida por absorción ni primer paso.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "pregunta": "La adrenalina en anafilaxia se administra preferentemente por vía:",
        "opciones": [
          "Intravenosa rápida",
          "Intramuscular en el muslo",
          "Subcutánea",
          "Oral"
        ],
        "correcta": 1,
        "explicacion": "La vía IM en el vasto lateral ofrece absorción rápida y fiable con menor riesgo de arritmia que la IV, reservada para el paro o el choque refractario.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "pregunta": "Paciente con cifra de 210/130 mmHg, cefalea intensa, confusion y papiledema. La conducta correcta es:",
        "opciones": [
          "Tratamiento oral y alta",
          "Reduccion intravenosa controlada por emergencia hipertensiva",
          "Observacion sin tratamiento",
          "Descenso rapido al rango normal"
        ],
        "correcta": 1,
        "explicacion": "Hay encefalopatia hipertensiva (dano agudo de organo blanco), por lo que es una emergencia que requiere farmacos intravenosos con descenso controlado, no brusco.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      },
      {
        "pregunta": "Un paciente con hipotension refractaria a liquidos y vasopresores, hiponatremia e hiperpotasemia probablemente tenga:",
        "opciones": [
          "Crisis tiroidea",
          "Crisis suprarrenal",
          "Cetoacidosis",
          "Coma mixedematoso"
        ],
        "correcta": 1,
        "explicacion": "La hipotension refractaria con hiponatremia e hiperpotasemia es tipica de la insuficiencia suprarrenal aguda; requiere hidrocortisona intravenosa.",
        "procedencia": {
          "temaOriginal": "endocrinologia-clinica"
        }
      },
      {
        "pregunta": "Para una deshidratacion moderada en un nino que tolera la via oral, lo indicado es:",
        "opciones": [
          "Bolos intravenosos inmediatos",
          "Rehidratacion oral con sales de rehidratacion",
          "Solo observacion",
          "Antibioticos"
        ],
        "correcta": 1,
        "explicacion": "La rehidratacion oral es de eleccion en la deshidratacion leve a moderada con tolerancia oral; la via intravenosa se reserva para casos graves.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      },
      {
        "pregunta": "Cual de estos signos sugiere deshidratacion grave:",
        "opciones": [
          "Sed leve",
          "Mucosas ligeramente secas",
          "Signo del pliegue persistente y letargia",
          "Llanto con lagrimas"
        ],
        "correcta": 2,
        "explicacion": "El signo del pliegue persistente, la letargia y la inestabilidad hemodinamica indican deshidratacion grave que requiere via intravenosa.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ]
  },
  "m4-far-generalidades": {
    "secciones": [
      {
        "titulo": "Farmacocinética (ADME) y farmacodinamia",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "ADME — lo que el cuerpo hace al fármaco",
            "items": [
              "Absorción: paso del fármaco desde el sitio de administración a la sangre.",
              "Distribución: reparto del fármaco por los tejidos (depende de la perfusión, la unión a proteínas y la liposolubilidad).",
              "Metabolismo: transformación, sobre todo hepática (citocromo P450), a metabolitos generalmente más hidrosolubles.",
              "Excreción: eliminación, principalmente renal."
            ]
          },
          {
            "tipo": "p",
            "texto": "La farmacodinamia describe el efecto del fármaco: unión a receptores (agonista, antagonista), relación dosis-respuesta, potencia y eficacia. Un agonista activa el receptor; un antagonista lo bloquea (ej. naloxona sobre receptores opioides)."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Biodisponibilidad y vía",
            "texto": "La biodisponibilidad es la fracción de fármaco que alcanza la circulación sistémica activa. La vía intravenosa tiene biodisponibilidad del 100% (sin barreras de absorción ni primer paso hepático). La vía oral sufre el efecto de primer paso, reduciendo la fracción activa. Por eso las dosis IV y oral del mismo fármaco difieren."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-toxicologia"
        }
      },
      {
        "titulo": "Principios farmacológicos esenciales",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La farmacocinética describe lo que el cuerpo le hace al fármaco (absorción, distribución, metabolismo y eliminación), mientras que la farmacodinamia describe lo que el fármaco le hace al cuerpo (interacción con receptores). En urgencias importan dos conceptos: el inicio de acción y la duración del efecto, porque determinan cuándo veremos resultado y cuándo repetir la dosis."
          },
          {
            "tipo": "lista",
            "titulo": "Conceptos de receptores",
            "items": [
              "Agonista: se une al receptor y lo activa, imitando al ligando natural (la adrenalina sobre receptores adrenérgicos).",
              "Antagonista: se une al receptor pero lo bloquea, impidiendo la activación (la naloxona sobre receptores opioides).",
              "Afinidad: fuerza con que el fármaco se une al receptor; la naloxona desplaza al opioide por mayor afinidad.",
              "Efecto techo: dosis a partir de la cual aumentar el fármaco ya no aumenta el efecto deseado."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Los seis correctos",
            "texto": "Paciente correcto, medicamento correcto, dosis correcta, vía correcta, hora correcta y documentación correcta. Verificar caducidad, color y transparencia de la solución es parte del medicamento correcto."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "titulo": "Sistema respiratorio",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El objetivo en la vía aérea reactiva es revertir el broncoespasmo y reducir la inflamación. Los beta-2 agonistas relajan el músculo liso bronquial de forma rápida; los anticolinérgicos lo complementan; los corticoides actúan en horas reduciendo la inflamación de base."
          },
          {
            "tipo": "tabla",
            "titulo": "Fármacos respiratorios",
            "headers": [
              "Fármaco",
              "Clase",
              "Dosis prehospitalaria"
            ],
            "filas": [
              [
                "Salbutamol",
                "Beta-2 agonista de acción corta",
                "Crisis asmática: 2.5-5 mg nebulizado, repetible. Broncodilatación en minutos."
              ],
              [
                "Ipratropio",
                "Anticolinérgico inhalado",
                "0.5 mg nebulizado, suele combinarse con salbutamol."
              ],
              [
                "Metilprednisolona",
                "Corticoide sistémico",
                "125 mg IV en crisis asmática moderada-grave; inicio lento."
              ],
              [
                "Adrenalina IM",
                "Agonista alfa y beta",
                "Broncoespasmo grave o anafilaxia: 0.3-0.5 mg IM."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Temblor y taquicardia",
            "texto": "El salbutamol estimula también receptores beta-1 a dosis altas, por lo que el temblor fino, la taquicardia y la hipopotasemia leve son efectos esperables tras nebulizaciones repetidas. No suelen requerir tratamiento."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "titulo": "Vías por mucosas y respiratoria",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Vías por mucosa y respiratoria",
            "headers": [
              "Vía",
              "Inicio",
              "Ejemplos prehospitalarios"
            ],
            "filas": [
              [
                "Sublingual",
                "Rápido (1-3 min)",
                "Nitroglicerina; evita el primer paso hepático."
              ],
              [
                "Intranasal (IN)",
                "Rápido (2-5 min)",
                "Naloxona, midazolam, fentanilo; sin necesidad de aguja."
              ],
              [
                "Nebulizada / inhalada",
                "Minutos, efecto local",
                "Salbutamol, ipratropio; actúa directo sobre el bronquio."
              ],
              [
                "Rectal",
                "Variable",
                "Diazepam en convulsiones cuando no hay otra vía (sobre todo en niños)."
              ]
            ]
          },
          {
            "tipo": "p",
            "texto": "La vía intranasal aprovecha la rica vascularización de la mucosa nasal y la cercanía al sistema nervioso central. Para optimizarla se usa un atomizador que dispersa el fármaco y se divide la dosis entre ambas fosas nasales, evitando que escurra."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "La vía sin aguja salva tiempo",
            "texto": "La vía intranasal permite tratar convulsiones, dolor o sobredosis sin canalizar, lo que es valioso en niños, pacientes agitados o cuando el acceso vascular se retrasa."
          }
        ],
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "titulo": "Serie blanca y plaquetas",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Interpretacion de la serie blanca",
            "items": [
              "Neutrofilia: infeccion bacteriana, estres, corticoesteroides.",
              "Linfocitosis: infecciones virales.",
              "Eosinofilia: alergias, parasitos, farmacos.",
              "Neutropenia: riesgo de infeccion grave; quimioterapia, farmacos, falla medular."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Alteraciones plaquetarias",
            "headers": [
              "Estado",
              "Hallazgo",
              "Riesgo"
            ],
            "filas": [
              [
                "Trombocitopenia",
                "Plaquetas bajas",
                "Sangrado mucocutaneo, petequias"
              ],
              [
                "Trombocitosis",
                "Plaquetas altas",
                "Reactiva o por trastorno mieloproliferativo"
              ],
              [
                "Disfuncion plaquetaria",
                "Numero normal, funcion alterada",
                "Sangrado pese a conteo normal"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Petequias y sangrado mucoso",
            "texto": "Las petequias, equimosis y sangrado de mucosas apuntan a un problema de hemostasia primaria (plaquetas o vasos). El sangrado profundo en articulaciones o musculos apunta a hemostasia secundaria (factores de coagulacion)."
          }
        ],
        "procedencia": {
          "temaOriginal": "hematologia-coagulacion"
        }
      },
      {
        "titulo": "Principios de farmacocinetica",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La farmacocinetica describe lo que el cuerpo hace al farmaco: absorcion, distribucion, metabolismo y eliminacion (ADME). La farmacodinamia describe lo que el farmaco hace al cuerpo. Ambas guian la dosificacion segura."
          },
          {
            "tipo": "lista",
            "titulo": "Conceptos clave",
            "items": [
              "Vida media: tiempo en que la concentracion cae a la mitad; determina el intervalo de dosis.",
              "Metabolismo de primer paso: el higado reduce la fraccion del farmaco oral que llega a la circulacion.",
              "Margen terapeutico estrecho: farmacos como warfarina, digoxina y aminoglucosidos requieren vigilancia.",
              "La mayoria de los farmacos se eliminan por via renal o se metabolizan en el higado."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Citocromo P450",
            "texto": "Muchos farmacos se metabolizan por el sistema CYP450. Los inhibidores (por ejemplo, algunos antifungicos y macrolidos) elevan los niveles de otros farmacos; los inductores (por ejemplo, rifampicina y algunos antiepilepticos) los reducen. Aqui nacen muchas interacciones graves."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      },
      {
        "titulo": "Ajuste renal y hepatico e interacciones",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Ajuste por insuficiencia renal",
            "items": [
              "Reducir dosis o ampliar el intervalo de farmacos de eliminacion renal.",
              "Vigilar de cerca aminoglucosidos, vancomicina, algunos DOAC y la metformina.",
              "Evitar nefrotoxicos cuando sea posible (AINE, contraste, aminoglucosidos)."
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Ajuste por insuficiencia hepatica",
            "items": [
              "Precaucion con farmacos de metabolismo hepatico y alto primer paso.",
              "Vigilar sedantes y opioides por riesgo de encefalopatia.",
              "La coagulopatia hepatica modifica la respuesta a anticoagulantes."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Interacciones de alto riesgo",
            "headers": [
              "Combinacion",
              "Riesgo"
            ],
            "filas": [
              [
                "Warfarina mas antibioticos o AINE",
                "Sangrado por aumento del INR"
              ],
              [
                "IECA mas diuretico ahorrador de potasio",
                "Hiperpotasemia"
              ],
              [
                "Macrolido o fluoroquinolona mas otro que prolonga QT",
                "Arritmia ventricular"
              ],
              [
                "AINE mas IECA mas diuretico (triple whammy)",
                "Lesion renal aguda"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Triple whammy renal",
            "texto": "La combinacion de un AINE, un IECA o ARA II y un diuretico puede precipitar lesion renal aguda, sobre todo en el adulto mayor o deshidratado, porque afectan a la vez la perfusion y la autorregulacion glomerular."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      },
      {
        "titulo": "Farmacodinamia: qué hace el fármaco al cuerpo",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La farmacodinamia estudia la relación entre la concentración del fármaco y su efecto. La mayoría de los fármacos de urgencia actúan uniéndose a un receptor (una proteína: canal iónico, receptor acoplado a proteína G, enzima o transportador). De esa unión nacen los conceptos que explican por qué dos fármacos del mismo grupo no son intercambiables."
          },
          {
            "tipo": "lista",
            "titulo": "Los cuatro conceptos que debes dominar",
            "items": [
              "Afinidad: con qué fuerza se une el fármaco al receptor. Alta afinidad = se une a concentraciones bajas.",
              "Eficacia: capacidad de producir el efecto máximo una vez unido. Un agonista pleno tiene eficacia alta; un antagonista, eficacia cero.",
              "Potencia: cuánta dosis se necesita para un efecto dado (relacionada con la CE50, concentración que da el 50% del efecto). Más potente = menos miligramos.",
              "Ventana terapéutica: distancia entre la dosis eficaz y la dosis tóxica. Estrecha (digoxina, fenitoína) obliga a titular con cuidado."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Cómo se comportan los ligandos",
            "headers": [
              "Tipo de ligando",
              "Qué hace",
              "Ejemplo prehospitalario"
            ],
            "filas": [
              [
                "Agonista pleno",
                "Se une y activa al máximo",
                "Adrenalina, fentanilo, morfina"
              ],
              [
                "Agonista parcial",
                "Activa, pero con techo de efecto",
                "Buprenorfina, nalbufina"
              ],
              [
                "Antagonista competitivo",
                "Bloquea el sitio; se vence con más agonista (reversible)",
                "Naloxona, atropina, flumazenil"
              ],
              [
                "Antagonista no competitivo",
                "Bloquea de forma irreversible o en otro sitio; no se vence subiendo el agonista",
                "Fenoxibenzamina, ketamina (sobre NMDA)"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Por qué importa en la calle",
            "texto": "La naloxona es un antagonista competitivo: si la sobredosis es de un opioide muy ávido o muy concentrado (fentanilo), puede necesitar más dosis para \"ganar\" el receptor, y como su vida media es corta el paciente puede re-narcotizarse. Entender afinidad y competencia anticipa esa recaída."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Curvas dosis-respuesta de agonista pleno, parcial y con antagonista",
            "caption": "Curvas dosis-respuesta: agonista pleno vs. parcial y el desplazamiento que produce un antagonista competitivo.",
            "busqueda": "dose response curve full partial agonist competitive antagonist pharmacology"
          }
        ],
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "titulo": "Fuentes y evidencia",
        "bloques": [
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "Goodman & Gilman — Las Bases Farmacológicas de la Terapéutica",
                "nota": "Texto de referencia en farmacodinamia"
              },
              {
                "nombre": "StatPearls (NCBI) — Adrenergic Drugs",
                "url": "https://www.ncbi.nlm.nih.gov/books/NBK534230/",
                "nota": "Receptores α/β y aplicación clínica"
              },
              {
                "nombre": "StatPearls (NCBI) — Beta-1 Receptors",
                "url": "https://www.ncbi.nlm.nih.gov/books/NBK532904/"
              },
              {
                "nombre": "LITFL — Secciones de Farmacología y Toxicología",
                "url": "https://litfl.com/",
                "nota": "Receptores colinérgicos y toxíndromes"
              },
              {
                "nombre": "Tintinalli — Medicina de Urgencias",
                "nota": "Capítulos de farmacología básica"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "titulo": "Fuentes y evidencia",
        "bloques": [
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "GINA — Global Initiative for Asthma",
                "url": "https://ginasthma.org/",
                "nota": "Manejo escalonado del asma"
              },
              {
                "nombre": "Children s Colorado — Vía clínica del crup",
                "url": "https://www.childrenscolorado.org/globalassets/healthcare-professionals/clinical-pathways/croup.pdf"
              },
              {
                "nombre": "SAEM — Croup (currículo de urgencias pediátricas)",
                "url": "https://www.saem.org/about-saem/academies-interest-groups-affiliates2/cdem/for-students/online-education/peds-em-curriculum/respiratory/croup"
              },
              {
                "nombre": "Pediatric Advanced Life Support (PALS)",
                "nota": "Dosis pediátricas de referencia"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada",
          "porUnidad": true
        }
      },
      {
        "titulo": "Ketamina: un fármaco, tres dosis",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La ketamina es un antagonista NMDA con un comportamiento único: el efecto cambia radicalmente con la dosis. A dosis baja es un analgésico potente que respeta la respiración; a dosis alta produce anestesia disociativa para intubar. Entre medias hay una \"zona de recrudescencia\" que conviene evitar."
          },
          {
            "tipo": "tabla",
            "titulo": "El espectro de dosis de la ketamina (IV)",
            "headers": [
              "Objetivo",
              "Dosis",
              "Características"
            ],
            "filas": [
              [
                "Analgesia subdisociativa",
                "0.1-0.3 mg/kg en 10-15 min",
                "Analgesia potente; preserva la respiración"
              ],
              [
                "Disociación / SDA",
                "~1 mg/kg",
                "Sedación disociativa para procedimientos o preoxigenar"
              ],
              [
                "Inducción (SRI)",
                "1-2 mg/kg",
                "Anestesia para intubar; broncodilata, sostiene la PA"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Por qué la analgesia con ketamina es tan útil prehospitalaria",
            "texto": "A 0.1-0.3 mg/kg controla el dolor refractario sin deprimir la respiración ni tirar la presión, e incluso permite ahorrar opioides. Pásela lenta (en 10-15 min o diluida) para minimizar los efectos psicodislépticos. Es ideal en el trauma con dolor intenso e inestabilidad."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Efectos a vigilar",
            "texto": "Fenómenos de emergencia (disforia, alucinaciones) más frecuentes a dosis intermedias o en bolo rápido: tratar con una benzodiacepina y un entorno tranquilo. Aumenta secreciones (laringoespasmo raro), sialorrea y puede subir transitoriamente FC y PA. Administrar lenta reduce estos efectos."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Espectro de dosis de la ketamina",
            "caption": "Continuo dosis-efecto de la ketamina: de la analgesia subdisociativa a la inducción anestésica.",
            "busqueda": "ketamine dose response continuum analgesia dissociation induction"
          }
        ],
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      },
      {
        "titulo": "Las secciones del FRAP",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Qué va en cada parte del formato",
            "headers": [
              "Sección",
              "Qué se registra"
            ],
            "filas": [
              [
                "Datos del servicio y cronología",
                "Folio, fecha, unidad, tripulación y las horas del servicio (llamada, salida, arribos y disponibilidad)."
              ],
              [
                "Datos del paciente",
                "Nombre, edad, sexo, domicilio y quién lo refiere o acompaña."
              ],
              [
                "Causa / motivo",
                "Origen clínico o traumático; agente causal y mecanismo de lesión."
              ],
              [
                "Evaluación primaria",
                "XABCDE y estado de conciencia (AVDI y/o Glasgow)."
              ],
              [
                "Evaluación secundaria",
                "Hallazgos por segmentos y localización de lesiones (esquema corporal)."
              ],
              [
                "Signos vitales",
                "Tomas seriadas, cada una con su hora."
              ],
              [
                "Antecedentes (SAMPLE)",
                "Signos/síntomas, Alergias, Medicamentos, Padecimientos previos, Última ingesta, Eventos."
              ],
              [
                "Tratamiento / manejo",
                "Oxígeno, inmovilización, medicamentos (dosis, vía y hora) y procedimientos."
              ],
              [
                "Evolución y traslado",
                "Cambios en el estado, hospital destino y condición en la entrega."
              ],
              [
                "Negativa / entrega-recepción",
                "Firma de rechazo informado o de recepción por el hospital."
              ]
            ]
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Formato FRAP de atención prehospitalaria",
            "caption": "Ejemplo de FRAP con sus secciones: cronología, evaluación, signos vitales y manejo.",
            "busqueda": "formato FRAP registro atencion prehospitalaria Mexico ejemplo"
          }
        ],
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      },
      {
        "titulo": "SAMPLE y el registro de la evaluación",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "El interrogatorio SAMPLE",
            "items": [
              "S — Signos y síntomas que presenta el paciente.",
              "A — Alergias (medicamentos, alimentos, ambientales).",
              "M — Medicamentos que toma (y última dosis).",
              "P — Padecimientos y antecedentes médicos/quirúrgicos.",
              "L — Última ingesta de alimento o líquido (por sus siglas en inglés, \"Last meal\").",
              "E — Eventos previos: qué estaba haciendo cuando inició el problema."
            ]
          },
          {
            "tipo": "p",
            "texto": "Documenta los hallazgos de forma objetiva y describible: \"herida de 3 cm en región parietal derecha con sangrado activo\" comunica más que \"golpe en la cabeza\". Anota lo que observas y mides, no interpretaciones ni diagnósticos que no te corresponden."
          }
        ],
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Biodisponibilidad",
        "definicion": "Fracción del fármaco que alcanza la circulación sistémica activa; 100% por vía IV.",
        "procedencia": {
          "temaOriginal": "farmacologia-toxicologia"
        }
      },
      {
        "termino": "Efecto de primer paso",
        "definicion": "Metabolismo hepático que reduce la fracción activa de un fármaco oral.",
        "procedencia": {
          "temaOriginal": "farmacologia-toxicologia"
        }
      },
      {
        "termino": "Agonista",
        "definicion": "Fármaco que se une a un receptor y lo activa, imitando al ligando natural.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "termino": "Antagonista",
        "definicion": "Fármaco que bloquea el receptor sin activarlo, como la naloxona.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "termino": "Farmacocinética",
        "definicion": "Lo que el organismo hace con el fármaco: absorción, distribución, metabolismo y eliminación.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "termino": "Efecto techo",
        "definicion": "Dosis a partir de la cual aumentar el fármaco no incrementa el efecto deseado.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "termino": "Titulación",
        "definicion": "Administrar pequeñas dosis sucesivas hasta lograr el efecto buscado minimizando efectos adversos.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "termino": "Biodisponibilidad",
        "definicion": "Fracción del fármaco administrado que alcanza la circulación sistémica activa.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "termino": "Vía sublingual",
        "definicion": "Absorción bajo la lengua que evita el primer paso hepático, como la nitroglicerina.",
        "procedencia": {
          "temaOriginal": "vias-administracion",
          "porUnidad": true
        }
      },
      {
        "termino": "Atropina",
        "definicion": "Primer fármaco de la bradicardia sintomática: 1 mg cada 3 a 5 min, máximo 3 mg.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "termino": "Adenosina",
        "definicion": "Fármaco de la TSVP regular: 6 mg y luego 12 mg en bolo rápido.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "termino": "Vida media",
        "definicion": "Tiempo en que la concentracion del farmaco cae a la mitad; define el intervalo de dosis.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      },
      {
        "termino": "Metabolismo de primer paso",
        "definicion": "Reduccion hepatica de la fraccion oral del farmaco antes de la circulacion.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      },
      {
        "termino": "CYP450",
        "definicion": "Sistema enzimatico hepatico; sus inhibidores e inductores generan interacciones.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada",
          "porUnidad": true
        }
      },
      {
        "termino": "Margen terapeutico estrecho",
        "definicion": "Farmacos cuya dosis toxica esta cerca de la terapeutica; requieren vigilancia.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      },
      {
        "termino": "Intraósea",
        "definicion": "Vía equivalente a IV para dosis y fármacos de reanimación; requiere flush.",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "termino": "Vasopresina",
        "definicion": "Dosis fija 0.03-0.04 U/min, ahorradora de catecolaminas.",
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      },
      {
        "termino": "Adenosina 6-12-12",
        "definicion": "Bolo rápido con flush para TSV regular de complejo estrecho.",
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada",
          "porUnidad": true
        }
      },
      {
        "termino": "Magnesio",
        "definicion": "Tratamiento de la Torsades de Pointes (1-2 g IV).",
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada",
          "porUnidad": true
        }
      },
      {
        "termino": "FA preexcitada",
        "definicion": "No usar bloqueadores del nodo AV; riesgo de FV. Cardioversión o procainamida/amiodarona.",
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada",
          "porUnidad": true
        }
      },
      {
        "termino": "Atropina",
        "definicion": "0.5 mg IV c/3-5 min (máx 3 mg); poco útil en bloqueo infranodal.",
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada",
          "porUnidad": true
        }
      },
      {
        "termino": "Disección: dP/dt",
        "definicion": "Betabloqueo primero (FC<60, PAS 100-120) y luego vasodilatador.",
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada",
          "porUnidad": true
        }
      },
      {
        "termino": "Estatus epiléptico",
        "definicion": "Convulsión >5 min; tratar ya con benzodiacepina a dosis plena (no infradosificar).",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      },
      {
        "termino": "Hipercapnia permisiva",
        "definicion": "Ventilar al asmático con FR baja y espiración larga, tolerando CO₂ alto, para evitar auto-PEEP.",
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada",
          "porUnidad": true
        }
      },
      {
        "termino": "Sulfato de magnesio",
        "definicion": "Farmaco de eleccion para prevenir y tratar las convulsiones eclampticas.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      },
      {
        "termino": "SAMPLE",
        "definicion": "Signos/síntomas, Alergias, Medicamentos, Padecimientos, Última ingesta, Eventos.",
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Significa \"SLUDGE\" del toxidrome colinérgico",
        "reverso": "Salivación, Lagrimeo, micción (Urination), Defecación, GI, Emesis.",
        "procedencia": {
          "temaOriginal": "farmacologia-toxicologia",
          "porUnidad": true
        }
      },
      {
        "frente": "Dosis máxima de atropina en bradicardia",
        "reverso": "3 mg en total (0.5 mg cada 3-5 min).",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "frente": "Primera dosis de amiodarona en FV refractaria",
        "reverso": "300 mg IV en bolo.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "frente": "Contraindicación clave de la nitroglicerina",
        "reverso": "Uso de sildenafil o similares en 24-48 h, e hipotensión (TAS menor de 90).",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas",
          "porUnidad": true
        }
      },
      {
        "frente": "Dosis de glucosa al 50% en hipoglucemia",
        "reverso": "25 g IV (50 mL de la solución al 50%).",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "frente": "Beta-2 agonista de acción corta y su dosis nebulizada",
        "reverso": "Salbutamol 2.5-5 mg nebulizado.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "frente": "Qué es el efecto de primer paso",
        "reverso": "El metabolismo hepático que inactiva parte del fármaco absorbido por el intestino.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "frente": "Por qué la nitroglicerina se da sublingual",
        "reverso": "Inicio rápido y evita el efecto de primer paso hepático.",
        "procedencia": {
          "temaOriginal": "vias-administracion",
          "porUnidad": true
        }
      },
      {
        "frente": "Dosis de amiodarona en paro cardíaco",
        "reverso": "300 mg IV en bolo (segunda dosis de 150 mg si persiste).",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "frente": "Dosis de inducción de ketamina en RSI",
        "reverso": "1-2 mg/kg IV.",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "frente": "Dosis de amiodarona en FV/TVSP refractaria",
        "reverso": "300 mg en bolo, luego 150 mg si persiste.",
        "procedencia": {
          "temaOriginal": "acls-paro-cardiaco"
        }
      },
      {
        "frente": "Dosis de atropina en bradicardia sintomática",
        "reverso": "1 mg IV cada 3 a 5 min, máximo 3 mg.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "frente": "¿Qué fármacos se evitan en FA con WPW?",
        "reverso": "Los bloqueadores del nodo AV; se usa cardioversión o procainamida.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "frente": "Dosis de aspirina en el SICA",
        "reverso": "162 a 325 mg masticada.",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "frente": "Dosis de sulfato de magnesio en el asma grave",
        "reverso": "1 a 2 g IV.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "frente": "Primer fármaco del estado epiléptico",
        "reverso": "Una benzodiacepina (midazolam IM, lorazepam o diazepam IV).",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "frente": "Primer fármaco para estabilizar la membrana cardíaca en hiperkalemia",
        "reverso": "Gluconato de calcio (no baja el K⁺, protege el corazón).",
        "procedencia": {
          "temaOriginal": "medicina-interna"
        }
      },
      {
        "frente": "Grupo de farmacos que reduce mortalidad en ICFEr ademas de IECA y betabloqueador",
        "reverso": "Antagonistas de mineralocorticoides e inhibidores de SGLT2.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      },
      {
        "frente": "Que farmacos se anaden ante sospecha de hemorragia por varices",
        "reverso": "Octreotido y antibiotico profilactico.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      },
      {
        "frente": "Que mide la vida media de un farmaco",
        "reverso": "El tiempo en que su concentracion cae a la mitad; determina el intervalo.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      },
      {
        "frente": "Efecto adverso clasico de los IECA",
        "reverso": "Tos seca (y, raro pero grave, angioedema).",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada",
          "porUnidad": true
        }
      },
      {
        "frente": "Que hacen los inhibidores del CYP450 a otros farmacos",
        "reverso": "Elevan sus niveles al frenar su metabolismo.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      },
      {
        "frente": "¿Se puede dar un bloqueador neuromuscular por vía IO?",
        "reverso": "Sí, a la misma dosis que IV, con flush posterior.",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "frente": "Inductor de elección en el paciente en shock",
        "reverso": "Ketamina (o etomidato); reducir dosis de ketamina a 0.5-1 mg/kg.",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      },
      {
        "frente": "Dosis de rocuronio para SRI",
        "reverso": "1.2 mg/kg IV (hasta 1.6 mg/kg en shock).",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      },
      {
        "frente": "Dosis fija de vasopresina en sepsis",
        "reverso": "0.03-0.04 unidades/min.",
        "procedencia": {
          "temaOriginal": "soporte-hemodinamico-vasopresores"
        }
      },
      {
        "frente": "Secuencia de dosis de adenosina",
        "reverso": "6 mg, luego 12 mg, luego 12 mg, en bolo rápido con flush.",
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada"
        }
      },
      {
        "frente": "Fármaco para Torsades de Pointes",
        "reverso": "Sulfato de magnesio 1-2 g IV.",
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada"
        }
      },
      {
        "frente": "Dosis de atropina en bradicardia",
        "reverso": "0.5 mg IV cada 3-5 min, máximo 3 mg.",
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada"
        }
      },
      {
        "frente": "¿Qué evitar en FA con WPW (complejo ancho irregular)?",
        "reverso": "Bloqueadores del nodo AV (adenosina, diltiazem, verapamilo, betabloqueadores, digoxina).",
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada",
          "porUnidad": true
        }
      },
      {
        "frente": "Dosis de levetiracetam como segunda línea",
        "reverso": "60 mg/kg IV (máx 4500 mg).",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      },
      {
        "frente": "Inductor de elección si hay que intubar a un asmático",
        "reverso": "Ketamina (broncodilata).",
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada",
          "porUnidad": true
        }
      },
      {
        "frente": "Dosis de dexametasona en crup",
        "reverso": "0.6 mg/kg VO/IM/IV (máx 12 mg).",
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada"
        }
      },
      {
        "frente": "Dosis analgésica subdisociativa de ketamina",
        "reverso": "0.1-0.3 mg/kg IV lenta (10-15 min).",
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      },
      {
        "frente": "Dosis de ketamina para inducción en SRI",
        "reverso": "1-2 mg/kg IV (reducir en shock).",
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      },
      {
        "frente": "Dosis de TXA en trauma (CRASH-2/3)",
        "reverso": "1 g IV en 10 min y luego 1 g en 8 h, dentro de las 3 h.",
        "procedencia": {
          "temaOriginal": "trauma-coagulopatia-hemorragia-obstetrica"
        }
      },
      {
        "frente": "Antídoto del exceso colinérgico por organofosforados",
        "reverso": "Atropina a dosis altas (doblando) + pralidoxima.",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      },
      {
        "frente": "Terapia de rescate inotrópica en intoxicación por betabloqueadores",
        "reverso": "HIET: insulina a altas dosis con euglucemia.",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      },
      {
        "frente": "Farmaco de eleccion para las convulsiones eclampticas",
        "reverso": "El sulfato de magnesio.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      },
      {
        "frente": "¿Qué significa SAMPLE?",
        "reverso": "Signos/síntomas, Alergias, Medicamentos, Padecimientos previos, Última ingesta y Eventos.",
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "¿Por qué la dosis oral de un fármaco suele ser mayor que la IV?",
        "opciones": [
          "Porque la vía oral no tiene metabolismo",
          "Por el efecto de primer paso hepático que reduce su biodisponibilidad",
          "Porque la IV se excreta más lento",
          "Porque la oral es más potente"
        ],
        "correcta": 1,
        "explicacion": "El fármaco oral se absorbe por el intestino y pasa por el hígado antes de la circulación, perdiendo fracción activa (primer paso).",
        "procedencia": {
          "temaOriginal": "farmacologia-toxicologia"
        }
      },
      {
        "pregunta": "Un paciente con dolor torácico isquémico refiere haber tomado sildenafil esta mañana. ¿Cuál es la conducta correcta respecto a la nitroglicerina?",
        "opciones": [
          "Administrarla a doble dosis",
          "No administrarla por riesgo de hipotensión grave",
          "Administrarla solo si hay taquicardia",
          "Administrarla por vía IV en lugar de sublingual"
        ],
        "correcta": 1,
        "explicacion": "Los nitratos combinados con inhibidores de la fosfodiesterasa-5 (sildenafil) potencian la vasodilatación y producen hipotensión profunda y refractaria. Está contraindicada en las 24-48 h posteriores.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "pregunta": "Tras administrar 6 mg de adenosina IV para una TSV no hay respuesta. ¿Qué pudo fallar con mayor probabilidad?",
        "opciones": [
          "La dosis fue excesiva",
          "No se administró el bolo de arrastre rápido",
          "Debió darse por vía IM",
          "El fármaco actúa en 30 minutos"
        ],
        "correcta": 1,
        "explicacion": "La adenosina tiene una vida media de segundos. Sin un bolo de salino que la empuje rápidamente hacia el corazón, se inactiva antes de actuar sobre el nodo AV.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "pregunta": "El temblor fino y la taquicardia tras varias nebulizaciones de salbutamol se explican por:",
        "opciones": [
          "Reacción alérgica al fármaco",
          "Estimulación beta-1 a dosis altas",
          "Hipoglucemia inducida",
          "Bloqueo colinérgico"
        ],
        "correcta": 1,
        "explicacion": "Aunque el salbutamol es selectivo beta-2, a dosis repetidas estimula también receptores beta-1, produciendo taquicardia y temblor. Son efectos esperables y rara vez requieren tratamiento.",
        "procedencia": {
          "temaOriginal": "farmacologia-por-sistemas"
        }
      },
      {
        "pregunta": "Paciente con IAM inferior e hipotensión. Antes de dar nitratos debes:",
        "opciones": [
          "Administrarlos de inmediato",
          "Descartar infarto de ventrículo derecho (V4R) por ser precarga-dependiente",
          "Duplicar la dosis",
          "Dar un bolo de furosemida"
        ],
        "correcta": 1,
        "explicacion": "El IAM de VD depende de la precarga; los nitratos pueden precipitar colapso. Hay que buscar elevación en V4R y priorizar volumen.",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "pregunta": "La dosis de amiodarona en el paro cardíaco por FV/TV sin pulso es:",
        "opciones": [
          "150 mg en bolo",
          "300 mg IV en bolo",
          "1 mg/kg/min",
          "50 mg en 10 min"
        ],
        "correcta": 1,
        "explicacion": "En paro se administran 300 mg IV en bolo; puede repetirse una dosis de 150 mg.",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "pregunta": "Un paciente con infarto inferior se vuelve hipotenso tras una dosis de nitroglicerina. La explicación más probable es:",
        "opciones": [
          "Reacción alérgica",
          "Compromiso del ventrículo derecho (precarga dependiente)",
          "Sobredosis de aspirina",
          "Taponamiento"
        ],
        "correcta": 1,
        "explicacion": "El infarto inferior suele afectar el VD, que es precarga dependiente; los nitratos reducen la precarga y causan hipotensión. Se tratan con líquidos.",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "pregunta": "En la hiperkalemia con cambios en el ECG, el primer fármaco que estabiliza la membrana cardíaca es:",
        "opciones": [
          "Insulina",
          "Gluconato de calcio",
          "Salbutamol",
          "Bicarbonato"
        ],
        "correcta": 1,
        "explicacion": "El calcio estabiliza el potencial de membrana del miocardio inmediatamente, aunque no reduce el potasio sérico.",
        "procedencia": {
          "temaOriginal": "medicina-interna"
        }
      },
      {
        "pregunta": "Cual de los siguientes farmacos mejora sintomas pero NO reduce la mortalidad en la ICFEr cronica:",
        "opciones": [
          "Carvedilol",
          "Espironolactona",
          "Furosemida",
          "Dapagliflozina"
        ],
        "correcta": 2,
        "explicacion": "Los diureticos de asa como la furosemida alivian la congestion y los sintomas, pero no han demostrado reducir la mortalidad; los otros tres si.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      },
      {
        "pregunta": "Un paciente con tos seca persistente desde que inicio su antihipertensivo probablemente toma:",
        "opciones": [
          "Una tiazida",
          "Un calcioantagonista",
          "Un IECA",
          "Un betabloqueador"
        ],
        "correcta": 2,
        "explicacion": "La tos seca es un efecto adverso clasico de los IECA por acumulo de bradicinina; suele resolverse al cambiar a un ARA II.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada",
          "porUnidad": true
        }
      },
      {
        "pregunta": "Un antibiotico bacteriostatico:",
        "opciones": [
          "Siempre es de eleccion en sepsis grave",
          "Detiene el crecimiento y depende del sistema inmune",
          "Mata la bacteria directamente",
          "No interactua con otros farmacos"
        ],
        "correcta": 1,
        "explicacion": "Los bacteriostaticos frenan el crecimiento bacteriano y requieren un sistema inmune competente; en infecciones graves suelen preferirse bactericidas.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      },
      {
        "pregunta": "Respecto a la vía intraósea en reanimación:",
        "opciones": [
          "Solo sirve para líquidos",
          "Requiere la mitad de la dosis",
          "Es equivalente a la IV para fármacos de reanimación",
          "No admite vasopresores"
        ],
        "correcta": 2,
        "explicacion": "La IO admite los mismos fármacos y dosis que la IV; se lava con bolo tras cada administración.",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "pregunta": "Paciente politraumatizado hipotenso que requiere intubación. La estrategia más segura es:",
        "opciones": [
          "Propofol 2 mg/kg + succinilcolina",
          "Ketamina a dosis reducida + rocuronio a dosis alta",
          "Midazolam 0.3 mg/kg solo",
          "Etomidato a doble dosis repetido"
        ],
        "correcta": 1,
        "explicacion": "\"Sedante bajo, paralítico alto\": ketamina 0.5-1 mg/kg para no hipotensar y rocuronio 1.2-1.6 mg/kg para asegurar la primera pasada.",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      },
      {
        "pregunta": "En la disección aórtica con hipertensión, el primer fármaco debe:",
        "opciones": [
          "Ser un vasodilatador puro como hidralazina",
          "Bajar la frecuencia (betabloqueador)",
          "Ser un bolo de líquidos",
          "Aumentar la contractilidad"
        ],
        "correcta": 1,
        "explicacion": "Se baja primero la FC y la dP/dt con betabloqueo; un vasodilatador solo causa taquicardia refleja que propaga la disección.",
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada"
        }
      },
      {
        "pregunta": "Asma grave que no mejora con salbutamol/ipratropio continuos. Siguiente fármaco IV:",
        "opciones": [
          "Furosemida",
          "Sulfato de magnesio 2 g",
          "Adenosina",
          "Naloxona"
        ],
        "correcta": 1,
        "explicacion": "El magnesio IV 2 g relaja el músculo liso bronquial y es la segunda línea en el asma grave.",
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada"
        }
      },
      {
        "pregunta": "En una sobredosis de opioides con bradipnea, la naloxona se debe:",
        "opciones": [
          "Dar a dosis máxima de golpe",
          "Titular desde dosis baja hasta recuperar la ventilación",
          "Evitar siempre",
          "Administrar solo IM a dosis alta"
        ],
        "correcta": 1,
        "explicacion": "Titular evita la abstinencia aguda; el objetivo es la respiración, no el despertar completo.",
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      },
      {
        "pregunta": "A dosis de 0.2 mg/kg IV, la ketamina produce:",
        "opciones": [
          "Anestesia disociativa completa",
          "Analgesia preservando la respiración",
          "Parálisis muscular",
          "Bloqueo del nodo AV"
        ],
        "correcta": 1,
        "explicacion": "Es la dosis subdisociativa: analgesia potente con respiración conservada.",
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      },
      {
        "pregunta": "Paciente con miosis, sialorrea, broncorrea y bradicardia tras fumigar. El antídoto principal es:",
        "opciones": [
          "Naloxona",
          "Atropina a dosis altas",
          "Flumazenil",
          "Bicarbonato"
        ],
        "correcta": 1,
        "explicacion": "Es un toxíndrome colinérgico por organofosforados; la atropina (doblando hasta secar secreciones) es el pilar, con pralidoxima.",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      },
      {
        "pregunta": "En la intoxicación grave por betabloqueador/calcioantagonista refractaria, una terapia de rescate es:",
        "opciones": [
          "HIET (insulina a altas dosis con euglucemia)",
          "Naloxona",
          "Furosemida",
          "Adenosina"
        ],
        "correcta": 0,
        "explicacion": "La insulina a altas dosis mejora la contractilidad del miocardio intoxicado; se acompaña de calcio y glucagón.",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      },
      {
        "pregunta": "El farmaco de eleccion para prevenir y tratar las convulsiones de la eclampsia es:",
        "opciones": [
          "Diazepam",
          "Fenitoina",
          "Sulfato de magnesio",
          "Levetiracetam"
        ],
        "correcta": 2,
        "explicacion": "El sulfato de magnesio es el farmaco de eleccion en la eclampsia; su antidoto, ante toxicidad, es el gluconato de calcio.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ]
  },
  "m3-va-tecnica-intubacion": {
    "secciones": [
      {
        "titulo": "Por qué supraglótico",
        "bloques": [
          {
            "tipo": "p",
            "texto": "Un dispositivo supraglótico (DSG) se asienta por encima de la glotis y sella la entrada de la laringe sin atravesar las cuerdas vocales. Esto permite ventilar a ciegas, con menos formación que la intubación endotraqueal y con tasas de éxito altas al primer intento, algo crítico durante la reanimación."
          },
          {
            "tipo": "diagrama",
            "clave": "respiratorio"
          },
          {
            "tipo": "lista",
            "titulo": "Indicaciones",
            "items": [
              "Paro cardíaco donde se prioriza minimizar interrupciones de las compresiones.",
              "Ventilación con BVM inadecuada o difícil.",
              "Rescate cuando la intubación endotraqueal falla.",
              "Operador sin entrenamiento o autorización para intubar."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Supraglótico vs. endotraqueal",
            "texto": "El tubo endotraqueal protege mejor la vía aérea de la aspiración porque sella por debajo de la glotis, pero requiere más destreza. El DSG es más rápido y simple, aunque ofrece protección parcial frente a la broncoaspiración."
          }
        ],
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Preoxigenación",
        "definicion": "Lavado de nitrógeno con O₂ 100% que crea reserva para la apnea de la intubación.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "termino": "VMNI",
        "definicion": "Soporte ventilatorio sin intubación: CPAP y BiPAP.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Principal limitación frente al tubo endotraqueal",
        "reverso": "Protección incompleta contra la broncoaspiración.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "La principal ventaja de un dispositivo supraglótico sobre la intubación endotraqueal durante un paro es:",
        "opciones": [
          "Protege mejor de la aspiración",
          "Es más rápido y requiere menos destreza",
          "Permite presiones de ventilación más altas",
          "No necesita confirmación de la colocación"
        ],
        "correcta": 1,
        "explicacion": "El DSG se coloca a ciegas, rápido y con menos entrenamiento, minimizando interrupciones de las compresiones. A cambio, protege menos de la aspiración que el tubo endotraqueal.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      }
    ]
  },
  "m3-va-obturador-esofagico": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Tubo laríngeo",
        "definicion": "Dispositivo con balones esofágico y faríngeo que aíslan la vía aérea.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cuántos balones tiene el tubo laríngeo",
        "reverso": "Dos: uno esofágico y uno faríngeo.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "El tubo laríngeo (King LT) sella la vía aérea mediante:",
        "opciones": [
          "Un solo balón traqueal",
          "Dos balones, uno esofágico y uno faríngeo",
          "Un gel sin balón",
          "Aspiración continua"
        ],
        "correcta": 1,
        "explicacion": "El tubo laríngeo posee un balón distal que ocluye el esófago y uno proximal que sella la hipofaringe, dirigiendo el aire hacia la tráquea.",
        "procedencia": {
          "temaOriginal": "via-aerea-avanzada-supraglotica"
        }
      }
    ]
  },
  "m4-uri-insuficiencia-renal": {
    "secciones": [
      {
        "titulo": "Integración clínica",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Pistas de alarma en el ECG",
            "items": [
              "Ondas T picudas: sospeche hiperpotasemia (insuficiencia renal, aplastamiento muscular).",
              "Onda U y T plana: sospeche hipopotasemia (vómito, diuréticos).",
              "QT prolongado: hipocalcemia o hipomagnesemia; riesgo de torsades.",
              "Onda sinusoidal: hiperpotasemia grave, preludio de paro."
            ]
          },
          {
            "tipo": "pasos",
            "titulo": "Enfoque del paciente con sospecha electrolítica",
            "items": [
              "Indague antecedentes: insuficiencia renal, diálisis, diuréticos, vómito, diarrea.",
              "Monitorice ECG continuo de inmediato.",
              "Trate los cambios amenazantes (calcio en hiperpotasemia, magnesio en torsades).",
              "Evite correcciones bruscas; el ajuste fino es hospitalario.",
              "Traslade vigilando el monitor de forma continua."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": []
  },
  "m4-uri-desequilibrio-electrolitico": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Onda U",
        "definicion": "Deflexión que aparece tras la T, típica de la hipopotasemia.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos",
          "porUnidad": true
        }
      },
      {
        "termino": "Acidosis hiperclorémica",
        "definicion": "Acidosis por exceso de cloro tras grandes volúmenes de salino 0.9%.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos",
          "porUnidad": true
        }
      },
      {
        "termino": "Signo de Trousseau",
        "definicion": "Espasmo del carpo al inflar el manguito; indica hipocalcemia.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Primer signo en el ECG de la hiperpotasemia",
        "reverso": "Ondas T picudas (altas y simétricas).",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos",
          "porUnidad": true
        }
      },
      {
        "frente": "Hallazgo del ECG en hipopotasemia",
        "reverso": "Ondas T planas, aparición de onda U y descenso del ST.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos",
          "porUnidad": true
        }
      },
      {
        "frente": "Tratamiento de elección de la torsades de pointes",
        "reverso": "Sulfato de magnesio 1-2 g IV.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos",
          "porUnidad": true
        }
      },
      {
        "frente": "Riesgo de corregir la hiponatremia muy rápido",
        "reverso": "Mielinolisis pontina (desmielinización).",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos",
          "porUnidad": true
        }
      },
      {
        "frente": "Efecto del calcio sobre el QT",
        "reverso": "Hipocalcemia alarga el QT; hipercalcemia lo acorta.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos",
          "porUnidad": true
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "La onda U en el ECG sugiere:",
        "opciones": [
          "Hiperpotasemia",
          "Hipopotasemia",
          "Hipercalcemia",
          "Hipernatremia"
        ],
        "correcta": 1,
        "explicacion": "La onda U, junto con ondas T planas y descenso del ST, es característica de la hipopotasemia, frecuente por vómito, diarrea o diuréticos.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos",
          "porUnidad": true
        }
      }
    ]
  },
  "m5-tme-farmacos": {
    "secciones": [
      {
        "titulo": "Fuentes y evidencia",
        "bloques": [
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "PHTLS 10.ª edición — Manejo del dolor",
                "nota": "Estándar de analgesia prehospitalaria"
              },
              {
                "nombre": "JEMS — Artículos sobre ketamina prehospitalaria",
                "url": "https://www.jems.com/",
                "nota": "Analgesia subdisociativa"
              },
              {
                "nombre": "REBEL EM — Ketamina en SRI y analgesia",
                "url": "https://rebelem.com/the-rsi-trial-ketamine-vs-etomidate-in-rapid-sequence-intubation/"
              },
              {
                "nombre": "EMCrit — Naloxona y manejo del opioide",
                "url": "https://emcrit.org/",
                "nota": "Titulación y re-narcotización"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      },
      {
        "titulo": "Soporte de calcio",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La sangre transfundida contiene citrato como anticoagulante, que quela el calcio del receptor y provoca hipocalcemia. El calcio iónico bajo deteriora la coagulación y la contractilidad cardíaca, agravando el shock."
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "Calcio en la transfusión masiva",
            "texto": "Recomendación tipo Joint Trauma System / THOR: administrar 1 g de calcio tras la primera unidad de hemoderivado y repetir según el sangrado/cada 4 unidades. El cloruro de calcio aporta ~3 veces más calcio elemental que el gluconato y se prefiere en la urgencia (mejor por vía central; el gluconato es más seguro por periférica)."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "CaCl₂ vs. gluconato",
            "texto": "1 g de cloruro de calcio ≈ 270 mg de calcio elemental; 1 g de gluconato ≈ 90 mg. El gluconato necesita metabolismo hepático (limitado en el shock). No mezclar el calcio con bicarbonato en la misma vía (precipita)."
          }
        ],
        "procedencia": {
          "temaOriginal": "trauma-coagulopatia-hemorragia-obstetrica"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Amiodarona",
        "definicion": "Antiarrítmico clase III; 300 mg en paro, 150 mg en TV estable.",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "termino": "Fentanilo 1-2 mcg/kg",
        "definicion": "Opioide rápido y hemodinámicamente estable; de elección en trauma.",
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Primer fármaco ante hiperpotasemia con ECG amenazante",
        "reverso": "Calcio (gluconato o cloruro): estabiliza el miocardio.",
        "procedencia": {
          "temaOriginal": "fluidoterapia-electrolitos"
        }
      },
      {
        "frente": "Primer fármaco en la TSVP regular estable",
        "reverso": "Adenosina 6 mg en bolo rápido, luego 12 mg si no revierte.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      },
      {
        "frente": "¿Por qué la naloxona puede necesitar redosificación?",
        "reverso": "Es antagonista competitivo de vida media corta; el opioide puede \"reaparecer\" (re-narcotización).",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      },
      {
        "frente": "¿Qué aporta más calcio elemental, CaCl₂ o gluconato?",
        "reverso": "El cloruro de calcio (~3 veces más por gramo).",
        "procedencia": {
          "temaOriginal": "trauma-coagulopatia-hemorragia-obstetrica"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "TV monomorfa estable con pulso. Antiarrítmico razonable:",
        "opciones": [
          "Adenosina 6 mg",
          "Amiodarona 150 mg en 10 min",
          "Diltiazem 20 mg",
          "Atropina 1 mg"
        ],
        "correcta": 1,
        "explicacion": "La amiodarona 150 mg IV en 10 minutos es apropiada para la TV con pulso estable.",
        "procedencia": {
          "temaOriginal": "farmacologia-cardiovascular-avanzada"
        }
      }
    ]
  },
  "m4-far-dosis-urgencia": {
    "secciones": [
      {
        "titulo": "Vías parenterales",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Vías parenterales comparadas",
            "headers": [
              "Vía",
              "Inicio",
              "Características"
            ],
            "filas": [
              [
                "Intravenosa (IV)",
                "Inmediato (segundos a minutos)",
                "Biodisponibilidad 100%; vía de elección en urgencias; permite titular."
              ],
              [
                "Intraósea (IO)",
                "Casi inmediato",
                "Equivalente a la IV cuando no hay acceso venoso; misma dosis."
              ],
              [
                "Intramuscular (IM)",
                "Minutos (5-20)",
                "Absorción por flujo muscular; útil en anafilaxia (adrenalina IM)."
              ],
              [
                "Subcutánea (SC)",
                "Lenta y sostenida",
                "Para volúmenes pequeños; insulina, algunas heparinas."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "IM en anafilaxia",
            "texto": "La adrenalina en anafilaxia se administra IM en el muslo (vasto lateral) porque ofrece absorción rápida y fiable con menor riesgo de arritmia que la vía IV, que se reserva para el paro o el choque refractario."
          }
        ],
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": []
  },
  "m3-va-cricotirotomia": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Vía intranasal",
        "definicion": "Absorción por la mucosa nasal con un atomizador; rápida y sin aguja.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "¿En qué envase van los punzocortantes (NOM-087)?",
        "reverso": "Recipiente rígido rojo, nunca en bolsa; no se reencapuchan agujas.",
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "La vía sublingual de la nitroglicerina tiene ventaja porque:",
        "opciones": [
          "Es la más lenta",
          "Evita el efecto de primer paso hepático y actúa rápido",
          "Requiere aguja",
          "Solo sirve para volúmenes grandes"
        ],
        "correcta": 1,
        "explicacion": "Bajo la lengua el fármaco se absorbe a la circulación sin pasar por el hígado, logrando un inicio de acción rápido en el dolor isquémico.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      },
      {
        "pregunta": "Según la NOM-087, una aguja usada debe desecharse en:",
        "opciones": [
          "Bolsa roja",
          "Bolsa amarilla",
          "Recipiente rígido rojo",
          "Bolsa negra de basura común"
        ],
        "correcta": 2,
        "explicacion": "Los punzocortantes van en contenedor rígido rojo rotulado como RPBI; nunca en bolsa.",
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      }
    ]
  },
  "m6-se-necesidades-especiales": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "En un niño con convulsión activa y sin acceso vascular, una vía eficaz es:",
        "opciones": [
          "Oral",
          "Intranasal",
          "Subcutánea",
          "Esperar el acceso IV"
        ],
        "correcta": 1,
        "explicacion": "La vía intranasal del midazolam aprovecha la vascularización de la mucosa nasal para un inicio rápido sin necesidad de aguja, ideal en pediatría.",
        "procedencia": {
          "temaOriginal": "vias-administracion"
        }
      }
    ]
  },
  "m1-pab-botiquin": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Volumen tidal protector",
        "definicion": "6-8 mL/kg de peso IDEAL para evitar volutrauma.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "termino": "Ventilación protectora",
        "definicion": "Volumen corriente bajo (6 ml/kg ideal) y presión meseta menor a 30 cmH2O.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "¿Sobre qué peso se calcula el volumen tidal?",
        "reverso": "Peso corporal IDEAL (no el real), 6-8 mL/kg.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "frente": "Volumen corriente en la ventilación protectora",
        "reverso": "6 ml/kg de peso corporal ideal.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "El volumen tidal protector en ventilación mecánica es:",
        "opciones": [
          "10-12 mL/kg de peso real",
          "6-8 mL/kg de peso ideal",
          "15 mL/kg de peso ideal",
          "4 mL/kg de peso real"
        ],
        "correcta": 1,
        "explicacion": "Para evitar volutrauma se usan 6-8 mL/kg calculados sobre el peso corporal ideal.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "pregunta": "La intervención que más reduce la mortalidad en el SDRA es:",
        "opciones": [
          "Volumen corriente alto",
          "Volumen corriente bajo (6 ml/kg ideal)",
          "FiO2 100 por ciento constante",
          "Diuréticos"
        ],
        "correcta": 1,
        "explicacion": "El volumen corriente bajo evita el volutrauma; es la medida con mayor impacto en la supervivencia del SDRA.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      }
    ]
  },
  "m4-resp-epoc": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Meta de SpO2 en EPOC",
        "definicion": "88 a 92 por ciento para evitar la hipercapnia por hiperoxia.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Patrón capnográfico en \"aleta de tiburón\" indica…",
        "reverso": "Broncoespasmo (asma/EPOC), por ángulo alfa aumentado.",
        "procedencia": {
          "temaOriginal": "via-aerea-definitiva"
        }
      },
      {
        "frente": "Meta de SpO2 en el EPOC exacerbado",
        "reverso": "88 a 92 por ciento.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "frente": "Diferencia clave entre asma y EPOC",
        "reverso": "El asma es reversible con broncodilatador; la EPOC apenas o nada.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Paciente postoperado con disnea subita, taquicardia, hipoxemia y radiografia de torax casi normal. La sospecha principal es:",
        "opciones": [
          "Neumonia",
          "Tromboembolia pulmonar",
          "EPOC descompensada",
          "Asma"
        ],
        "correcta": 1,
        "explicacion": "La disnea e hipoxemia subitas con radiografia normal en un paciente con factores de riesgo (cirugia, inmovilidad) son tipicas de TEP.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      }
    ]
  },
  "m4-card-ecg-basica": {
    "secciones": [
      {
        "titulo": "ECG de 12, 15 y 18 derivaciones",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El ECG de 12 derivaciones observa el corazón desde planos frontal (derivaciones de los miembros) y horizontal (precordiales). Las derivaciones derechas (V3R-V6R, ECG de 15) detectan el infarto de ventrículo derecho, y las posteriores (V7-V9, ECG de 18) el infarto posterior, que de otro modo pasan desapercibidos."
          },
          {
            "tipo": "lista",
            "titulo": "Lectura sistemática",
            "items": [
              "Ritmo y frecuencia.",
              "Eje eléctrico: dirección media de la despolarización (normal entre −30° y +90°).",
              "Intervalos: PR, QRS, QT.",
              "Bloqueos de rama: QRS ancho (>120 ms). BRD (\"orejas de conejo\" rsR' en V1); BRI (QRS ancho con morfología en V6).",
              "Hipertrofias, isquemia (T), lesión (ST) y necrosis (Q)."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "titulo": "Localización del infarto",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Cara, derivaciones y arteria responsable",
            "headers": [
              "Cara",
              "Derivaciones / Arteria"
            ],
            "filas": [
              [
                "Septal",
                "V1 a V2 / Descendente anterior"
              ],
              [
                "Anterior",
                "V3 a V4 / Descendente anterior"
              ],
              [
                "Lateral",
                "I, aVL, V5 a V6 / Circunfleja"
              ],
              [
                "Inferior",
                "II, III, aVF / Coronaria derecha"
              ],
              [
                "Ventrículo derecho",
                "V4R / Coronaria derecha proximal"
              ],
              [
                "Posterior",
                "V7 a V9; espejo en V1 a V3 / Circunfleja o CD"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Infarto inferior: busca el ventrículo derecho",
            "texto": "Hasta un tercio de los infartos inferiores comprometen el ventrículo derecho. Estos pacientes son precarga dependientes: los nitratos y la morfina pueden provocar hipotensión grave. Coloca V4R y, si hay infarto de VD, trata la hipotensión con cargas de líquido."
          }
        ],
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "titulo": "Tratamiento inicial y reperfusión",
        "bloques": [
          {
            "tipo": "pasos",
            "titulo": "Manejo inicial del SICA",
            "items": [
              "ECG de 12 derivaciones en los primeros 10 minutos del contacto.",
              "Aspirina 162 a 325 mg masticada (salvo alergia).",
              "Nitroglicerina sublingual para el dolor isquémico, vigilando la presión.",
              "Oxígeno solo si SpO2 menor a 90 por ciento.",
              "Analgesia con morfina si el dolor persiste pese a nitratos (con cautela en SICASEST).",
              "Segundo antiagregante y anticoagulación segun protocolo y estrategia."
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Estrategias de reperfusión en IAMCEST",
            "items": [
              "Angioplastia primaria (ICP) preferida si el tiempo puerta-balón es menor a 90 minutos.",
              "Si la ICP no es accesible a tiempo, fibrinolisis dentro de los primeros 30 minutos de contacto (idealmente antes de 12 h de evolución).",
              "Trasladar siempre a centro con hemodinamia; preavisar para activar el laboratorio.",
              "La fibrinolisis no aplica en el IAMSEST."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Cuidado con la nitroglicerina",
            "texto": "Evita los nitratos en infarto de ventrículo derecho, hipotensión, y en quienes hayan usado inhibidores de la fosfodiesterasa (sildenafil) en las últimas 24 a 48 horas por riesgo de hipotensión profunda."
          }
        ],
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "V4R",
        "definicion": "Derivación derecha clave para diagnosticar infarto de ventrículo derecho.",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "termino": "V4R",
        "definicion": "Derivación derecha para detectar infarto de ventrículo derecho.",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Arteria del infarto inferior",
        "reverso": "Coronaria derecha (derivaciones II, III, aVF).",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "frente": "¿Qué derivación detecta el infarto de ventrículo derecho?",
        "reverso": "V4R.",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      }
    ],
    "quiz": []
  },
  "m4-gi-oclusion-intestinal": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "IAMCEST",
        "definicion": "Infarto con elevación del ST: oclusión coronaria completa que requiere reperfusión urgente.",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada"
        }
      },
      {
        "termino": "IAMCEST",
        "definicion": "Infarto con elevación del ST por oclusión coronaria total; requiere reperfusión urgente.",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "termino": "Equivalente de IAMCEST",
        "definicion": "Patrones como De Winter o aVR elevado que indican oclusión grave sin elevación clásica.",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Ruidos intestinales en la obstruccion mecanica temprana",
        "reverso": "Aumentados y metalicos.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "En la obstruccion intestinal mecanica temprana los ruidos intestinales tipicamente estan:",
        "opciones": [
          "Ausentes desde el inicio",
          "Aumentados y metalicos",
          "Normales",
          "Solo presentes con la tos"
        ],
        "correcta": 1,
        "explicacion": "La obstruccion mecanica genera peristalsis de lucha con ruidos aumentados y metalicos; el ileo paralitico, en cambio, los disminuye.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      }
    ]
  },
  "m2-afe-electrofisiologia": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Sgarbossa",
        "definicion": "Criterios para diagnosticar IAM en presencia de BRI o marcapasos.",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Los criterios de Sgarbossa sirven para:",
        "opciones": [
          "Calcular el eje eléctrico",
          "Diagnosticar IAM en presencia de bloqueo de rama izquierda",
          "Medir el QT",
          "Identificar hipertrofia auricular"
        ],
        "correcta": 1,
        "explicacion": "El BRI enmascara la isquemia; los criterios de Sgarbossa permiten reconocer el IAM pese al bloqueo.",
        "procedencia": {
          "temaOriginal": "cardiologia-avanzada",
          "porUnidad": true
        }
      }
    ]
  },
  "m5-tcc-kellie-monroe": {
    "secciones": [
      {
        "titulo": "Trauma craneoencefálico grave",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La doctrina de Monro-Kellie establece que el cráneo es un compartimento rígido con tres componentes: cerebro, sangre y líquido cefalorraquídeo. Si uno aumenta (p. ej., un hematoma), otro debe disminuir; agotada la compensación, la presión intracraneal (PIC) se dispara."
          },
          {
            "tipo": "formula",
            "texto": "PPC = PAM − PIC",
            "nota": "Presión de Perfusión Cerebral = Presión Arterial Media − Presión Intracraneal. Si la PIC sube o la PAM baja, el cerebro se isquemiza."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Tríada de Cushing",
            "texto": "Hipertensión (PAS elevada), bradicardia y respiración irregular: es un signo TARDÍO de hipertensión intracraneal y herniación inminente. Refleja el intento desesperado del cuerpo por mantener la perfusión cerebral."
          },
          {
            "tipo": "lista",
            "titulo": "Prevención de la lesión secundaria",
            "items": [
              "Evitar la HIPOXIA (mantener SpO₂ ≥ 94%) y la HIPOTENSIÓN (cada episodio empeora el pronóstico).",
              "Normocapnia: la hiperventilación sistemática es perjudicial (vasoconstricción cerebral); reservar la hiperventilación controlada y transitoria solo para signos de herniación.",
              "Cabecera a 30°, normotermia, control de convulsiones y manejo del dolor.",
              "Salino hipertónico para la hipertensión intracraneal."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      },
      {
        "titulo": "Hipertensión intracraneal y herniación",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La doctrina de Monro-Kellie dice que el cráneo es una caja rígida con tres componentes (encéfalo, sangre y LCR): si uno crece (hematoma, edema), la presión intracraneal (PIC) sube. Lo que importa para la neurona es la presión de perfusión cerebral."
          },
          {
            "tipo": "formula",
            "texto": "PPC = PAM − PIC",
            "nota": "Presión de perfusión cerebral = presión arterial media − presión intracraneal. Si sube la PIC o cae la PAM, el cerebro se isquemia."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Tríada de Cushing = herniación inminente",
            "texto": "Hipertensión (PA sistólica alta con presión de pulso amplia) + bradicardia + respiración irregular. Es un signo TARDÍO de hipertensión intracraneal grave con compromiso del tallo. Sumado a midriasis/anisocoria y deterioro del Glasgow, exige actuar de inmediato."
          },
          {
            "tipo": "tabla",
            "titulo": "Terapia osmolar ante la herniación",
            "headers": [
              "Agente",
              "Dosis",
              "Notas"
            ],
            "filas": [
              [
                "Solución salina hipertónica 3%",
                "~250 mL (o 3-5 mL/kg) IV",
                "No baja la PA; preferida si hay hipotensión/shock"
              ],
              [
                "Manitol",
                "0.5-1 g/kg IV",
                "Diurético osmótico; puede hipotensar y dañar el riñón"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Medidas que acompañan a los osmóticos",
            "texto": "Cabecera a 30°, cabeza neutra, evitar hipoxia e hipotensión (ambas duplican la mortalidad en TCE), normocapnia (EtCO₂ 35-40; la hiperventilación a EtCO₂ 30-35 se reserva como puente ante signos de herniación), analgesia/sedación y tratar la fiebre y las convulsiones."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Tríada de Cushing y herniación cerebral",
            "caption": "Tríada de Cushing (HTA, bradicardia, respiración irregular) y mecanismos de herniación cerebral.",
            "busqueda": "Cushing triad intracranial pressure brain herniation diagram"
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Monro-Kellie",
        "definicion": "El cráneo rígido contiene cerebro, sangre y LCR en equilibrio de presión.",
        "procedencia": {
          "temaOriginal": "soporte-trauma-critico"
        }
      }
    ],
    "flashcards": [],
    "quiz": []
  },
  "m4-card-arritmias": {
    "secciones": [
      {
        "titulo": "Cardioversión versus desfibrilación",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La cardioversión sincronizada entrega la descarga sobre la onda R para evitar el período vulnerable del ciclo cardíaco; se usa en taquiarritmias con pulso e inestables. La desfibrilación es no sincronizada y se reserva para FV, TVSP y TV polimórfica."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "No sincronizar en torsades",
            "texto": "En la TV polimórfica el equipo no puede identificar de forma fiable la onda R; intentar sincronizar puede impedir la descarga. En la polimórfica inestable se desfibrila como en FV."
          },
          {
            "tipo": "lista",
            "titulo": "Antes de cardiovertir al paciente consciente",
            "items": [
              "Sedoanalgesia si el tiempo lo permite.",
              "Confirmar el modo sincronizado en cada descarga (algunos equipos lo desactivan tras disparar).",
              "Tener listo el carro de paro y el plan de desfibrilación si degenera en FV."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Cardioversión sincronizada",
        "definicion": "Descarga sobre la onda R para taquiarritmias inestables con pulso.",
        "procedencia": {
          "temaOriginal": "arritmias-manejo"
        }
      }
    ],
    "flashcards": [],
    "quiz": []
  },
  "m3-ep-sss": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Hemostasia primaria",
        "definicion": "Formacion del tapon plaquetario; su falla da sangrado mucocutaneo.",
        "procedencia": {
          "temaOriginal": "hematologia-coagulacion",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Tipo de sangrado de la falla de hemostasia primaria",
        "reverso": "Mucocutaneo: petequias, equimosis y sangrado de mucosas.",
        "procedencia": {
          "temaOriginal": "hematologia-coagulacion",
          "porUnidad": true
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "La estrategia de reperfusión preferida en IAMCEST cuando es accesible a tiempo es:",
        "opciones": [
          "Fibrinolisis",
          "Angioplastia primaria con puerta-balón menor a 90 min",
          "Solo aspirina",
          "Heparina aislada"
        ],
        "correcta": 1,
        "explicacion": "La ICP primaria es superior a la fibrinolisis cuando puede realizarse dentro del tiempo objetivo.",
        "procedencia": {
          "temaOriginal": "sica-profundo",
          "porUnidad": true
        }
      },
      {
        "pregunta": "Un paciente con petequias, equimosis y sangrado de encias tiene mas probablemente un defecto de:",
        "opciones": [
          "Hemostasia secundaria",
          "Hemostasia primaria",
          "Via comun",
          "Fibrinolisis"
        ],
        "correcta": 1,
        "explicacion": "El sangrado mucocutaneo (petequias, equimosis, encias) es propio de un defecto de la hemostasia primaria (plaquetas o vasos).",
        "procedencia": {
          "temaOriginal": "hematologia-coagulacion",
          "porUnidad": true
        }
      }
    ]
  },
  "m5-tt-torax-inestable": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Signos vitales seriados",
        "definicion": "Varias tomas con su hora (5 min en inestable, 15 en estable) para mostrar la tendencia.",
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "¿Por qué el fentanilo es preferible en el inestable?",
        "reverso": "Inicio rápido y no libera histamina: menos hipotensión.",
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      },
      {
        "frente": "¿Cada cuánto se toman signos vitales en un paciente inestable?",
        "reverso": "Cada 5 minutos (cada 15 si está estable), y cada toma con su hora.",
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "La diferencia clave entre angina inestable e IAMSEST es:",
        "opciones": [
          "La elevación del ST",
          "La elevación de troponinas",
          "La localización del dolor",
          "La edad del paciente"
        ],
        "correcta": 1,
        "explicacion": "Ambas carecen de elevación del ST; el IAMSEST presenta troponinas positivas (hay necrosis) y la angina inestable no.",
        "procedencia": {
          "temaOriginal": "sica-profundo"
        }
      },
      {
        "pregunta": "Trauma con dolor intenso y PA 90/60. El analgésico más razonable es:",
        "opciones": [
          "Morfina 0.1 mg/kg en bolo",
          "Ketamina 0.2 mg/kg lenta",
          "Naloxona",
          "Diazepam"
        ],
        "correcta": 1,
        "explicacion": "La ketamina a dosis analgésica controla el dolor sin deprimir la respiración ni tirar la presión, ideal en el inestable.",
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      }
    ]
  },
  "m4-resp-tep": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Shock obstructivo",
        "definicion": "Obstrucción mecánica al flujo: tensión, taponamiento, TEP masivo.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "termino": "Dimero D",
        "definicion": "Producto de degradacion de la fibrina; util por su alto valor predictivo negativo en TEP.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Estudio confirmatorio de TEP",
        "reverso": "Angiotomografia de torax.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "frente": "Para que sirve el dimero D en TEP",
        "reverso": "Para descartarla por su alto valor predictivo negativo (probabilidad baja).",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Una TEP con hipotension sostenida y falla del ventriculo derecho es candidata a:",
        "opciones": [
          "Solo observacion",
          "Anticoagulacion oral ambulatoria",
          "Trombolisis",
          "Diureticos"
        ],
        "correcta": 2,
        "explicacion": "La TEP masiva con inestabilidad hemodinamica justifica la trombolisis; la TEP estable se trata con anticoagulacion.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      }
    ]
  },
  "m5-tt-taponamiento": {
    "secciones": [
      {
        "titulo": "Triada de Beck y taponamiento",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Triada de Beck",
            "items": [
              "Hipotensión por la compresión del corazón.",
              "Ingurgitación yugular por el aumento de la presión venosa.",
              "Ruidos cardíacos velados por el líquido pericárdico."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Tensión frente a taponamiento",
            "texto": "Ambos cursan con hipotensión y yugulares distendidas, pero el neumotórax a tensión tiene hipoventilación unilateral y desviación traqueal, mientras el taponamiento conserva ruidos respiratorios y muestra ruidos cardíacos velados. La ecografía resuelve la duda con rapidez."
          }
        ],
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Triada de Beck",
        "definicion": "Hipotensión, yugulares distendidas y ruidos cardíacos velados del taponamiento.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Tipos de shock obstructivo",
        "reverso": "Neumotórax a tensión, taponamiento cardíaco y TEP masivo.",
        "procedencia": {
          "temaOriginal": "shock-avanzado"
        }
      },
      {
        "frente": "Componentes de la triada de Beck",
        "reverso": "Hipotensión, ingurgitación yugular y ruidos cardíacos velados.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      }
    ],
    "quiz": []
  },
  "m4-neu-crisis-convulsivas": {
    "secciones": [
      {
        "titulo": "Estado epiléptico",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El estado epiléptico se define como una crisis de más de 5 minutos o crisis repetidas sin recuperación de la conciencia entre ellas. Es una emergencia: la actividad prolongada causa lesión neuronal, hipertermia, acidosis y compromiso respiratorio."
          },
          {
            "tipo": "pasos",
            "titulo": "Manejo escalonado",
            "items": [
              "Primera línea: benzodiacepina. Midazolam IM 10 mg, lorazepam IV 0.1 mg/kg o diazepam IV.",
              "Segunda línea si persiste: antiepiléptico IV (levetiracetam, valproato o fenitoína).",
              "Tercera línea (estado refractario): inducción anestésica e intubación.",
              "Buscar y tratar causas: hipoglucemia, hiponatremia, hipoxia, intoxicación, eclampsia."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "No subdosificar la benzodiacepina",
            "texto": "Una causa frecuente de estado epiléptico refractario es la dosis insuficiente de benzodiacepina. Administra la dosis completa adecuada y, si persiste, escala sin demora a la segunda línea. La eclampsia se trata con sulfato de magnesio."
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "titulo": "Estatus epiléptico",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El estatus epiléptico es una convulsión >5 min o convulsiones repetidas sin recuperar la conciencia. Es una emergencia tiempo-dependiente: cuanto más dura, más resistente se vuelve y más daño neuronal produce. El tratamiento es escalonado y la primera línea son las benzodiacepinas a dosis adecuada (el error más común es infradosificar)."
          },
          {
            "tipo": "pasos",
            "titulo": "Escalera del estatus convulsivo",
            "items": [
              "Línea 1 — Benzodiacepina ya: midazolam IM/IN, lorazepam IV o diazepam IV.",
              "Repetir la benzodiacepina una vez si persiste a los 5 min.",
              "Línea 2 — Antiepiléptico IV: levetiracetam, fosfenitoína/fenitoína o valproato.",
              "Línea 3 — Estatus refractario: inducción anestésica (propofol/midazolam) e intubación."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Benzodiacepinas de primera línea",
            "headers": [
              "Fármaco",
              "Dosis adulto",
              "Vía"
            ],
            "filas": [
              [
                "Midazolam",
                "10 mg (≥40 kg); 0.2 mg/kg",
                "IM (preferida sin acceso), IN"
              ],
              [
                "Lorazepam",
                "0.1 mg/kg (máx 4 mg), repetible",
                "IV"
              ],
              [
                "Diazepam",
                "0.15-0.2 mg/kg (máx 10 mg)",
                "IV (o rectal en niños)"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "Segunda línea (ensayo ESETT): son equivalentes",
            "texto": "Levetiracetam 60 mg/kg (máx 4500 mg), fosfenitoína 20 mg PE/kg (máx 1500 mg PE) y valproato 40 mg/kg (máx 3000 mg) lograron cese de la crisis en ~45-50% de los casos, sin diferencias significativas entre ellos. Elija según disponibilidad y comorbilidad."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Sin vía, midazolam IM (estudio RAMPART)",
            "texto": "El midazolam 10 mg IM detiene la convulsión al menos tan rápido como el lorazepam IV cuando aún no hay acceso vascular, porque ganar la vía retrasa el tratamiento. La absorción IM es fiable y la vía IN es una alternativa válida."
          }
        ],
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Estado asmático",
        "definicion": "Crisis asmática que no responde al tratamiento inicial y amenaza la vida.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "termino": "Estado epiléptico",
        "definicion": "Crisis mayor a 5 min o repetidas sin recuperar conciencia.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "¿Qué significa un torax silente en el asma?",
        "reverso": "Flujo aéreo críticamente bajo; crisis que amenaza la vida.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "frente": "Definición de estado epiléptico",
        "reverso": "Crisis de más de 5 minutos o repetidas sin recuperar conciencia.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "frente": "Que significa una PaCO2 normal en una crisis asmatica grave",
        "reverso": "Signo de alarma: fatiga muscular inminente.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "En una crisis asmática grave, la desaparición de las sibilancias indica:",
        "opciones": [
          "Mejoría del paciente",
          "Flujo aéreo críticamente bajo (torax silente)",
          "Error de auscultación",
          "Resolución del broncoespasmo"
        ],
        "correcta": 1,
        "explicacion": "El torax silente refleja un flujo tan bajo que no genera sibilancias; es un signo de gravedad extrema y paro inminente.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas"
        }
      },
      {
        "pregunta": "El estado epiléptico se define como una crisis que dura más de:",
        "opciones": [
          "1 minuto",
          "5 minutos",
          "30 minutos",
          "60 minutos"
        ],
        "correcta": 1,
        "explicacion": "La definición operativa actual es crisis de más de 5 minutos o crisis repetidas sin recuperar la conciencia.",
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      },
      {
        "pregunta": "En una crisis asmatica grave, una PaCO2 que ha pasado de baja a normal indica:",
        "opciones": [
          "Que la crisis esta cediendo",
          "Buena oxigenacion",
          "Fatiga muscular y riesgo de paro respiratorio",
          "Error de laboratorio"
        ],
        "correcta": 2,
        "explicacion": "En la crisis grave inicial la PaCO2 esta baja por hiperventilacion; su normalizacion o ascenso anuncia agotamiento muscular y falla ventilatoria inminente.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      },
      {
        "pregunta": "El fentanilo como pretratamiento de la SRI se usa para:",
        "opciones": [
          "Paralizar",
          "Atenuar la respuesta simpática a la laringoscopia",
          "Revertir opioides",
          "Broncodilatar"
        ],
        "correcta": 1,
        "explicacion": "Blunting de la descarga simpática, útil cuando una crisis hipertensiva transitoria sería peligrosa.",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      }
    ]
  },
  "m5-tt-definicion": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Torax silente",
        "definicion": "Ausencia de sibilancias por flujo aéreo críticamente bajo; signo de gravedad extrema.",
        "procedencia": {
          "temaOriginal": "emergencias-respiratorias-criticas",
          "porUnidad": true
        }
      }
    ],
    "flashcards": [],
    "quiz": []
  },
  "m5-tcc-lesiones-intracraneales": {
    "secciones": [
      {
        "titulo": "Hipertensión intracraneal y herniación",
        "bloques": [
          {
            "tipo": "formula",
            "texto": "PPC = PAM - PIC",
            "nota": "La presión de perfusión cerebral es la diferencia entre la presión arterial media y la presión intracraneal; si la PIC sube o la PAM cae, el cerebro deja de perfundirse."
          },
          {
            "tipo": "lista",
            "titulo": "Signos de hipertensión intracraneal y herniación",
            "items": [
              "Triada de Cushing: hipertensión, bradicardia y respiración irregular (signo tardío).",
              "Deterioro del estado de conciencia y pupila dilatada y fija unilateral.",
              "Postura de descerebración o decorticación.",
              "Vómito en proyectil y cefalea progresiva."
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Medidas ante la herniación inminente",
            "items": [
              "Elevar la cabecera a 30 grados y mantener la cabeza en línea media.",
              "Asegurar oxigenación y normocapnia; evitar hipoxia e hipotensión.",
              "Salino hipertónico o manitol para reducir la PIC.",
              "Hiperventilación leve y transitoria solo como puente ante signos de herniación."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Prevenir la lesión secundaria",
            "texto": "El cerebro lesionado es muy sensible a la hipoxia y la hipotensión; cada episodio empeora el pronóstico. La meta prehospitalaria es mantener SpO2 mayor o igual a 94 por ciento, presión adecuada y normocapnia."
          }
        ],
        "procedencia": {
          "temaOriginal": "emergencias-neurologicas"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": []
  },
  "m5-tt-neumotorax-abierto": {
    "secciones": [
      {
        "titulo": "Trauma torácico letal",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El torax alberga lesiones que matan en minutos. La evaluación primaria busca de forma sistemática las entidades que comprometen la ventilación y la circulación, porque varias se tratan con maniobras simples antes de cualquier imagen."
          },
          {
            "tipo": "tabla",
            "titulo": "Lesiones torácicas inmediatamente mortales",
            "headers": [
              "Lesión",
              "Reconocimiento y manejo"
            ],
            "filas": [
              [
                "Neumotórax a tensión",
                "Hipotensión, yugulares distendidas, hipoventilación unilateral; descompresión con aguja y toracostomía."
              ],
              [
                "Neumotórax abierto",
                "Herida soplante; apósito de tres lados (valvular)."
              ],
              [
                "Hemotórax masivo",
                "Hipoventilación con matidez y shock; toracostomía y reposición."
              ],
              [
                "Taponamiento cardíaco",
                "Triada de Beck; pericardiocentesis o toracotomía."
              ],
              [
                "Torax inestable",
                "Segmento costal con movimiento paradójico; analgesia y soporte ventilatorio."
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Neumotórax a tensión: diagnóstico clínico",
            "texto": "El neumotórax a tensión se diagnostica y trata por la clínica, nunca esperando una radiografía. El sitio actual de descompresión con aguja en el adulto es el 5.º espacio intercostal en la línea axilar anterior, alternativa al 2.º espacio en la línea medioclavicular."
          }
        ],
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "En el neumotórax abierto, el manejo prehospitalario inicial es:",
        "opciones": [
          "Sellar la herida por completo de forma hermética",
          "Colocar un apósito de tres lados (valvular)",
          "No cubrir la herida",
          "Aplicar presión directa firme"
        ],
        "correcta": 1,
        "explicacion": "El apósito de tres lados permite salir el aire en la espiración y evita que entre en la inspiración, previniendo que se convierta en tensión.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      }
    ]
  },
  "m5-ta-bazo": {
    "secciones": [
      {
        "titulo": "Trauma abdominal",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El abdomen es un sitio frecuente de hemorragia interna oculta. El bazo y el higado son los órganos más lesionados en el trauma cerrado. Un abdomen aparentemente benigno puede albergar un sangrado masivo, por lo que el mecanismo y la tendencia hemodinámica pesan más que un solo examen."
          },
          {
            "tipo": "lista",
            "titulo": "Datos de alarma",
            "items": [
              "Distensión, dolor y signos de irritación peritoneal.",
              "Shock sin causa externa evidente: sospecha hemorragia abdominal o pélvica.",
              "Equimosis periumbilical (Cullen) o en flancos (Grey Turner): sangrado retroperitoneal.",
              "El eco FAST detecta líquido libre a pie de cama."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "El abdomen que sangra puede no doler al inicio",
            "texto": "En el politraumatizado con alteración de conciencia o lesiones distractoras, la exploración abdominal pierde sensibilidad. La hipotensión persistente sin foco externo obliga a sospechar sangrado abdominal o pélvico y a trasladar sin demora a cirugía."
          }
        ],
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": []
  },
  "m5-cin-abierto-cerrado": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Órganos más lesionados en el trauma abdominal cerrado",
        "reverso": "El bazo y el higado.",
        "procedencia": {
          "temaOriginal": "trauma-por-sistemas"
        }
      }
    ],
    "quiz": []
  },
  "m5-que-parkland": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Fórmula de Parkland",
        "definicion": "4 ml x kg x porcentaje de SCQ de Ringer lactato en 24 horas.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "termino": "Formula de Winter",
        "definicion": "Calcula la PaCO2 esperada en la acidosis metabolica para evaluar la compensacion.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Fórmula de Parkland",
        "reverso": "4 ml x peso en kg x porcentaje de SCQ, de Ringer lactato, en 24 horas.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "frente": "Fórmula del anión gap",
        "reverso": "Na⁺ − (Cl⁻ + HCO₃⁻).",
        "procedencia": {
          "temaOriginal": "medicina-interna"
        }
      },
      {
        "frente": "Formula del anion gap",
        "reverso": "Na menos (Cl mas HCO3); normal 8 a 12 mEq/L.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "frente": "Formula de Winter",
        "reverso": "PaCO2 esperada = 1.5 por HCO3 mas 8 (mas o menos 2).",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "En la fórmula de Parkland, las primeras 8 horas se cuentan desde:",
        "opciones": [
          "La llegada al hospital",
          "El momento de la quemadura",
          "El inicio de la infusión",
          "La primera diuresis"
        ],
        "correcta": 1,
        "explicacion": "El tiempo se cuenta desde la hora de la quemadura, por lo que el retraso en la atención reduce la ventana de las primeras 8 horas.",
        "procedencia": {
          "temaOriginal": "quemaduras-inhalacion"
        }
      },
      {
        "pregunta": "En una acidosis metabolica con HCO3 de 12, la formula de Winter predice una PaCO2 esperada de aproximadamente:",
        "opciones": [
          "40 mmHg",
          "26 mmHg",
          "50 mmHg",
          "12 mmHg"
        ],
        "correcta": 1,
        "explicacion": "PaCO2 esperada = 1.5 por 12 mas 8 = 26 mmHg. Si la PaCO2 real es muy distinta, hay un trastorno respiratorio agregado.",
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      }
    ]
  },
  "m4-tox-anafilaxia": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Hipersensibilidad I",
        "definicion": "Reacción mediada por IgE e histamina: anafilaxia y alergias.",
        "procedencia": {
          "temaOriginal": "fisiopatologia-inmunologia"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que es la trombocitopenia inducida por heparina",
        "reverso": "Reaccion inmune que causa trombosis pese a plaquetas bajas; obliga a suspender heparina.",
        "procedencia": {
          "temaOriginal": "hematologia-coagulacion"
        }
      }
    ],
    "quiz": []
  },
  "m4-met-acido-base": {
    "secciones": [
      {
        "titulo": "Gastroenterología",
        "bloques": [
          {
            "tipo": "lista",
            "titulo": "Urgencias frecuentes",
            "items": [
              "Úlcera péptica: erosión por desequilibrio entre agresión (ácido, H. pylori, AINE) y defensa mucosa; puede sangrar o perforar.",
              "Hemorragia digestiva alta (sobre el ángulo de Treitz): hematemesis, melena; causas como úlcera o várices esofágicas.",
              "Hemorragia digestiva baja: hematoquecia/rectorragia.",
              "Insuficiencia hepática: ictericia, coagulopatía, encefalopatía, ascitis.",
              "Pancreatitis aguda: dolor epigástrico irradiado a la espalda, autodigestión enzimática; litiasis y alcohol son las causas principales."
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "medicina-interna"
        }
      },
      {
        "titulo": "Trastornos acido-base: abordaje sistematico",
        "bloques": [
          {
            "tipo": "diagrama",
            "clave": "acidobase"
          },
          {
            "tipo": "pasos",
            "titulo": "Pasos para analizar una gasometria",
            "items": [
              "Mirar el pH: acidemia (menor a 7.35) o alcalemia (mayor a 7.45).",
              "Identificar el trastorno primario por PaCO2 y bicarbonato.",
              "Si es acidosis metabolica, calcular el anion gap.",
              "Verificar la compensacion esperada.",
              "Si la compensacion no es la esperada, sospechar trastorno mixto.",
              "Si hay anion gap elevado, calcular el delta gap."
            ]
          },
          {
            "tipo": "formula",
            "texto": "Anion gap = Na menos (Cl mas HCO3). Normal aproximado: 8 a 12 mEq/L",
            "nota": "Debe corregirse por la albumina: por cada gramo de albumina por debajo de 4 g/dL, sumar 2.5 al anion gap."
          },
          {
            "tipo": "tabla",
            "titulo": "Causas de acidosis metabolica",
            "headers": [
              "Anion gap elevado",
              "Anion gap normal (hipercloremica)"
            ],
            "filas": [
              [
                "Cetoacidosis (diabetica, alcoholica)",
                "Diarrea (perdida de bicarbonato)"
              ],
              [
                "Acidosis lactica",
                "Acidosis tubular renal"
              ],
              [
                "Uremia (falla renal)",
                "Inhibidores de anhidrasa carbonica"
              ],
              [
                "Toxinas (metanol, etilenglicol, salicilatos)",
                "Reposicion con solucion salina excesiva"
              ]
            ]
          },
          {
            "tipo": "formula",
            "texto": "Compensacion en acidosis metabolica (formula de Winter): PaCO2 esperada = 1.5 por HCO3 mas 8 (mas o menos 2)",
            "nota": "Si la PaCO2 medida es mayor que la esperada, coexiste acidosis respiratoria; si es menor, coexiste alcalosis respiratoria."
          }
        ],
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      },
      {
        "titulo": "Delta gap y trastornos mixtos",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El delta gap compara cuanto subio el anion gap con cuanto bajo el bicarbonato. Sirve para detectar un segundo trastorno metabolico oculto detras de una acidosis con anion gap elevado."
          },
          {
            "tipo": "formula",
            "texto": "Delta ratio = (anion gap medido menos 12) entre (24 menos HCO3 medido)",
            "nota": "Menor a 1: acidosis mixta con anion gap elevado y con anion gap normal. Entre 1 y 2: acidosis pura con anion gap elevado. Mayor a 2: coexiste alcalosis metabolica o acidosis respiratoria cronica."
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Trastornos mixtos",
            "texto": "Un trastorno mixto es la coexistencia de dos o mas alteraciones acido-base. Se sospecha cuando la compensacion no se ajusta a lo esperado o cuando el delta gap se sale del rango. Un ejemplo clasico es el paciente con cetoacidosis diabetica (anion gap alto) que tambien vomita (alcalosis metabolica)."
          },
          {
            "tipo": "tabla",
            "titulo": "Resumen de trastornos primarios",
            "headers": [
              "Trastorno",
              "pH",
              "Alteracion primaria"
            ],
            "filas": [
              [
                "Acidosis metabolica",
                "Bajo",
                "HCO3 bajo"
              ],
              [
                "Alcalosis metabolica",
                "Alto",
                "HCO3 alto"
              ],
              [
                "Acidosis respiratoria",
                "Bajo",
                "PaCO2 alta"
              ],
              [
                "Alcalosis respiratoria",
                "Alto",
                "PaCO2 baja"
              ]
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "nefrologia-acidobase"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": []
  },
  "m3-es-abcde": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "ABCDE radiográfico",
        "definicion": "Airway, Bones, Cardiac, Diaphragm, Effusion/Fields.",
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      }
    ],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "El protocolo POCUS indicado para un paciente en shock indiferenciado es:",
        "opciones": [
          "eFAST",
          "RUSH",
          "BLUE",
          "ABCDE"
        ],
        "correcta": 1,
        "explicacion": "El protocolo RUSH evalúa de forma estructurada las causas del shock (bomba, tanque y tuberías).",
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      }
    ]
  },
  "m5-tt-hemotorax": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "¿Qué protocolo POCUS se usa en el trauma?",
        "reverso": "eFAST (líquido libre, hemopericardio, neumotórax/hemotórax).",
        "procedencia": {
          "temaOriginal": "diagnostico-imagen"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un liquido pleural con cociente de proteinas pleural/serica de 0.7 se clasifica como:",
        "opciones": [
          "Trasudado",
          "Exudado",
          "Quilotorax",
          "Hemotorax"
        ],
        "correcta": 1,
        "explicacion": "Por los criterios de Light, un cociente de proteinas mayor a 0.5 cumple criterio de exudado.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      }
    ]
  },
  "m5-tt-contusion-miocardica": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "BNP",
        "definicion": "Peptido natriuretico que se eleva con la distension miocardica; util para diagnosticar IC.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ],
    "flashcards": [],
    "quiz": []
  },
  "m3-es-exploracion-detallada": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "NYHA",
        "definicion": "Clasificacion funcional de la IC segun la limitacion a la actividad fisica.",
        "procedencia": {
          "temaOriginal": "cardiologia-clinica"
        }
      }
    ],
    "flashcards": [],
    "quiz": []
  },
  "m4-resp-neumonia-bronquitis": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "CURB-65",
        "definicion": "Escala de gravedad de la neumonia adquirida en la comunidad.",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Agente mas frecuente de neumonia adquirida en la comunidad",
        "reverso": "Streptococcus pneumoniae (neumococo).",
        "procedencia": {
          "temaOriginal": "neumologia-clinica"
        }
      }
    ],
    "quiz": []
  },
  "m4-gi-pancreatitis": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Cuantos de los tres criterios se necesitan para diagnosticar pancreatitis",
        "reverso": "Dos de tres (clinica, enzimas o imagen).",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      }
    ],
    "quiz": []
  },
  "m4-gi-apendicitis": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Patron de migracion del dolor en la apendicitis",
        "reverso": "De periumbilical/epigastrico a la fosa iliaca derecha.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      }
    ],
    "quiz": []
  },
  "m6-emp-oclusion-intestinal": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Cual de estos datos en una obstruccion intestinal sugiere estrangulacion y urgencia quirurgica:",
        "opciones": [
          "Distension leve",
          "Fiebre, taquicardia y signos peritoneales",
          "Vomito ocasional",
          "Ruidos aumentados"
        ],
        "correcta": 1,
        "explicacion": "La fiebre, taquicardia y signos peritoneales sugieren isquemia o estrangulacion, que obligan a cirugia urgente.",
        "procedencia": {
          "temaOriginal": "gastroenterologia-abdomen-agudo"
        }
      }
    ]
  },
  "m6-ip-crecimiento": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Diferencia entre bactericida y bacteriostatico",
        "reverso": "El bactericida mata; el bacteriostatico frena el crecimiento y depende del sistema inmune.",
        "procedencia": {
          "temaOriginal": "farmacologia-clinica-avanzada"
        }
      }
    ],
    "quiz": []
  },
  "m5-tt-traqueo-bronquial": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Para producir broncodilatación se busca activar el receptor:",
        "opciones": [
          "α1",
          "β1",
          "β2",
          "Muscarínico"
        ],
        "correcta": 2,
        "explicacion": "β2 relaja el músculo liso bronquial (salbutamol, terbutalina).",
        "procedencia": {
          "temaOriginal": "bases-farmacologicas-receptores"
        }
      }
    ]
  },
  "m5-tme-aplastamiento": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Succinilcolina e hiperkalemia",
        "definicion": "Contraindicada en quemados/aplastamiento >48-72 h, denervación, distrofias; riesgo de paro.",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Tres contextos donde la succinilcolina es peligrosa",
        "reverso": "Quemado/aplastamiento subagudo, denervación y distrofias (riesgo de hiperkalemia).",
        "procedencia": {
          "temaOriginal": "farmacologia-via-aerea-sri-sda"
        }
      }
    ],
    "quiz": []
  },
  "m5-tcc-manitol": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Salino hipertónico 3%",
        "definicion": "Osmótico que no baja la PA; preferible al manitol si hay hipotensión.",
        "procedencia": {
          "temaOriginal": "farmacologia-neurocritica-pic"
        }
      }
    ],
    "flashcards": [],
    "quiz": []
  },
  "m6-emp-asma": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Magnesio IV en asma",
        "definicion": "2 g IV en 15-20 min (40 mg/kg en niños) como broncodilatador de segunda línea.",
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Dosis de sulfato de magnesio IV en asma grave",
        "reverso": "2 g IV en 15-20 min (40 mg/kg en niños, máx 2 g).",
        "procedencia": {
          "temaOriginal": "farmacologia-respiratoria-avanzada"
        }
      }
    ],
    "quiz": []
  },
  "m4-tox-abstinencia": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [
      {
        "frente": "Objetivo de la naloxona en sobredosis",
        "reverso": "Restaurar la ventilación, no despertar del todo (evitar abstinencia).",
        "procedencia": {
          "temaOriginal": "analgesia-mayor-anestesia-disociativa"
        }
      }
    ],
    "quiz": []
  },
  "m4-gyn-hemorragia-postparto": {
    "secciones": [
      {
        "titulo": "Hemorragia postparto (HPP)",
        "bloques": [
          {
            "tipo": "pasos",
            "titulo": "Manejo farmacológico de la HPP",
            "items": [
              "Oxitocina 10 UI IM (o en infusión IV diluida) como uterotónico de primera línea + masaje uterino bimanual.",
              "Ácido tranexámico 1 g IV en 10 min; repetir 1 g si sigue sangrando a los 30 min (estudio WOMAN).",
              "Uterotónicos de segunda línea según disponibilidad (ergometrina, carbetocina, misoprostol).",
              "Reanimación con hemoderivados y traslado urgente; tratar la causa (atonía, retención, trauma)."
            ]
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "TXA en HPP (estudio WOMAN)",
            "texto": "1 g IV lento; si el sangrado continúa tras 30 min o se reinicia en 24 h, una segunda dosis de 1 g. Administrado dentro de las primeras 3 h del parto reduce la muerte por hemorragia. La OMS lo recomienda junto a los uterotónicos."
          }
        ],
        "procedencia": {
          "temaOriginal": "trauma-coagulopatia-hemorragia-obstetrica"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Oxitocina 10 UI",
        "definicion": "Uterotónico de primera línea en la hemorragia postparto.",
        "procedencia": {
          "temaOriginal": "trauma-coagulopatia-hemorragia-obstetrica"
        }
      }
    ],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Hemorragia postparto por atonía. Primera línea farmacológica:",
        "opciones": [
          "Oxitocina 10 UI IM + masaje",
          "Adrenalina IM",
          "Furosemida",
          "Atropina"
        ],
        "correcta": 0,
        "explicacion": "La oxitocina es el uterotónico de primera línea; se acompaña de TXA y masaje uterino.",
        "procedencia": {
          "temaOriginal": "trauma-coagulopatia-hemorragia-obstetrica"
        }
      }
    ]
  },
  "m6-ig-gems": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Diamante de la muerte",
        "definicion": "Hipotermia, acidosis, coagulopatía e hipocalcemia que se retroalimentan en el trauma.",
        "procedencia": {
          "temaOriginal": "trauma-coagulopatia-hemorragia-obstetrica"
        }
      }
    ],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "El cuarto vértice del \"diamante de la muerte\" en trauma es:",
        "opciones": [
          "Hipoglucemia",
          "Hipocalcemia",
          "Hiperkalemia",
          "Hipertermia"
        ],
        "correcta": 1,
        "explicacion": "La hipocalcemia se suma a hipotermia, acidosis y coagulopatía por su papel en la coagulación y la contractilidad.",
        "procedencia": {
          "temaOriginal": "trauma-coagulopatia-hemorragia-obstetrica"
        }
      }
    ]
  },
  "m4-gyn-trabajo-parto": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "TXA en HPP (WOMAN)",
        "definicion": "1 g IV, repetible a los 30 min; dentro de las 3 h del parto.",
        "procedencia": {
          "temaOriginal": "trauma-coagulopatia-hemorragia-obstetrica"
        }
      }
    ],
    "flashcards": [],
    "quiz": []
  },
  "m4-gyn-eclampsia": {
    "secciones": [
      {
        "titulo": "Eclampsia",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La eclampsia es la aparición de convulsiones en la preeclampsia (HTA + proteinuria del embarazo). El anticonvulsivo de elección NO es una benzodiacepina sino el sulfato de magnesio, que también previene la recurrencia y la progresión."
          },
          {
            "tipo": "callout",
            "variante": "dosis",
            "titulo": "Sulfato de magnesio en eclampsia",
            "texto": "Carga de 4-6 g IV en 15-20 min, seguida de infusión de 1-2 g/h. Vigile la toxicidad por magnesio (pérdida del reflejo rotuliano, depresión respiratoria, bradicardia): el antídoto es el gluconato de calcio IV. El tratamiento definitivo es finalizar el embarazo."
          },
          {
            "tipo": "fuentes",
            "items": [
              {
                "nombre": "Goldfrank — Toxicologic Emergencies",
                "nota": "Referencia maestra de antídotos"
              },
              {
                "nombre": "EMCrit (IBCC) — CCB / Beta-blocker overdose",
                "url": "https://emcrit.org/ibcc/ccb-2/"
              },
              {
                "nombre": "CoreEM — HIET (insulina a altas dosis)",
                "url": "https://coreem.net/core/hiet/"
              },
              {
                "nombre": "StatPearls (NCBI) — Organophosphate Toxicity",
                "url": "https://www.ncbi.nlm.nih.gov/books/NBK470430/"
              },
              {
                "nombre": "LITFL — TCA toxicity (y ECG)",
                "url": "https://litfl.com/tca-toxicity/"
              }
            ]
          }
        ],
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      },
      {
        "titulo": "Preeclampsia y eclampsia",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La preeclampsia es un trastorno hipertensivo del embarazo que aparece despues de las 20 semanas, con hipertension y dano de organo (clasicamente proteinuria). La eclampsia es la aparicion de convulsiones en este contexto. Son causas importantes de morbimortalidad materna y fetal."
          },
          {
            "tipo": "lista",
            "titulo": "Datos de severidad",
            "items": [
              "Presion arterial muy elevada (sistolica mayor o igual a 160 o diastolica mayor o igual a 110).",
              "Cefalea intensa, alteraciones visuales, dolor en epigastrio o hipocondrio derecho.",
              "Trombocitopenia, elevacion de enzimas hepaticas, falla renal.",
              "Sindrome HELLP: hemolisis, enzimas hepaticas elevadas y plaquetas bajas."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Sulfato de magnesio",
            "texto": "El sulfato de magnesio es el farmaco de eleccion para prevenir y tratar las convulsiones de la eclampsia. Su toxicidad se vigila clinicamente (reflejos osteotendinosos, frecuencia respiratoria y diuresis); su antidoto es el gluconato de calcio."
          },
          {
            "tipo": "p",
            "texto": "El tratamiento definitivo de la preeclampsia es la finalizacion del embarazo (nacimiento), individualizando el momento segun la gravedad y la edad gestacional. El control de la presion y la prevencion de convulsiones estabilizan a la madre mientras tanto."
          }
        ],
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Magnesio en eclampsia",
        "definicion": "Carga 4-6 g + 1-2 g/h; antídoto de su toxicidad: gluconato de calcio.",
        "procedencia": {
          "temaOriginal": "antidotos-emergencias-toxicologicas"
        }
      },
      {
        "termino": "Eclampsia",
        "definicion": "Convulsiones en el contexto de preeclampsia.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      },
      {
        "termino": "Sindrome HELLP",
        "definicion": "Hemolisis, enzimas hepaticas elevadas y plaquetas bajas; forma grave de preeclampsia.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Que define a la eclampsia",
        "reverso": "La aparicion de convulsiones en el contexto de preeclampsia.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "El tratamiento definitivo de la preeclampsia es:",
        "opciones": [
          "Reposo absoluto",
          "Antihipertensivos de por vida",
          "La finalizacion del embarazo (nacimiento)",
          "Diureticos"
        ],
        "correcta": 2,
        "explicacion": "La preeclampsia se resuelve con el nacimiento; el momento se individualiza segun la gravedad y la edad gestacional.",
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ]
  },
  "m4-gyn-sufrimiento-fetal": {
    "secciones": [
      {
        "titulo": "Trabajo de parto",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Etapas del trabajo de parto",
            "headers": [
              "Etapa",
              "Inicio y fin",
              "Eventos"
            ],
            "filas": [
              [
                "Primera",
                "Inicio de contracciones a dilatacion completa",
                "Fase latente y fase activa; borramiento y dilatacion"
              ],
              [
                "Segunda",
                "Dilatacion completa al nacimiento",
                "Pujo y expulsion del feto"
              ],
              [
                "Tercera",
                "Nacimiento al alumbramiento placentario",
                "Desprendimiento y salida de placenta"
              ],
              [
                "Cuarta",
                "Primeras dos horas posparto",
                "Vigilancia de hemorragia y tono uterino"
              ]
            ]
          },
          {
            "tipo": "lista",
            "titulo": "Complicaciones del parto",
            "items": [
              "Distocia: progreso anormal del trabajo de parto.",
              "Sufrimiento fetal: alteraciones de la frecuencia cardiaca fetal.",
              "Prolapso de cordon: emergencia obstetrica.",
              "Distocia de hombros: dificultad para liberar los hombros tras la cabeza."
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Prolapso de cordon",
            "texto": "Cuando el cordon umbilical se desliza por delante de la presentacion fetal, su compresion compromete el flujo al feto. Es una emergencia que requiere elevar la presentacion, posicionar a la madre y proceder a una cesarea urgente."
          }
        ],
        "procedencia": {
          "temaOriginal": "obstetricia-neonatal"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": []
  },
  "m6-ip-triangulo": {
    "secciones": [
      {
        "titulo": "Triangulo de evaluacion pediatrica",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El triangulo de evaluacion pediatrica es una herramienta de impresion rapida, sin tocar al nino, basada en lo que se ve y se escucha en segundos. Permite decidir la gravedad y la prioridad antes de la exploracion detallada."
          },
          {
            "tipo": "lista",
            "titulo": "Los tres lados del triangulo",
            "items": [
              "Apariencia: tono, interaccion, consolabilidad, mirada y llanto.",
              "Trabajo respiratorio: ruidos anormales, retracciones, aleteo nasal, postura.",
              "Circulacion cutanea: color de la piel (palidez, cianosis, piel marmorea)."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Como interpretarlo",
            "texto": "La apariencia alterada sola sugiere disfuncion sistemica o neurologica; con el trabajo respiratorio orienta a dificultad respiratoria o falla; con la circulacion alterada apunta a choque. Los tres lados alterados indican falla cardiopulmonar."
          }
        ],
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "Triangulo de evaluacion pediatrica",
        "definicion": "Impresion rapida basada en apariencia, trabajo respiratorio y circulacion cutanea.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Cuales son los tres lados del triangulo de evaluacion pediatrica",
        "reverso": "Apariencia, trabajo respiratorio y circulacion cutanea.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Los tres componentes del triangulo de evaluacion pediatrica son:",
        "opciones": [
          "Pulso, presion y temperatura",
          "Apariencia, trabajo respiratorio y circulacion cutanea",
          "Glucosa, oxigeno y peso",
          "Frecuencia cardiaca, frecuencia respiratoria y saturacion"
        ],
        "correcta": 1,
        "explicacion": "El triangulo se basa en apariencia, trabajo respiratorio y circulacion cutanea, valorados sin tocar al nino.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ]
  },
  "m4-gi-deshidratacion": {
    "secciones": [],
    "conceptosClave": [
      {
        "termino": "Signo del pliegue",
        "definicion": "Persistencia del pliegue cutaneo; signo de deshidratacion grave.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      },
      {
        "termino": "Rehidratacion oral",
        "definicion": "Tratamiento de eleccion en deshidratacion leve a moderada.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "Tratamiento de eleccion en deshidratacion leve a moderada",
        "reverso": "Rehidratacion oral con sales de rehidratacion.",
        "procedencia": {
          "temaOriginal": "pediatria-especiales"
        }
      }
    ],
    "quiz": []
  },
  "m1-smu-medico-legales": {
    "secciones": [
      {
        "titulo": "Marco legal: Ley General de Salud",
        "bloques": [
          {
            "tipo": "p",
            "texto": "La Ley General de Salud establece el derecho a la protección de la salud y la obligación de los establecimientos de atender las urgencias. En una urgencia, la atención no puede negarse ni condicionarse a pago previo: negar la atención de una urgencia puede constituir un delito."
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Urgencia real",
            "texto": "Se considera urgencia todo problema que ponga en peligro la vida, un órgano o una función y que requiera atención inmediata. Ante la duda, se actúa como si fuera urgencia. El traslado debe hacerse al hospital con capacidad resolutiva, coordinado por el regulador médico."
          }
        ],
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      },
      {
        "titulo": "Aspectos médico-legales",
        "bloques": [
          {
            "tipo": "tabla",
            "titulo": "Las tres fuentes clásicas de responsabilidad",
            "headers": [
              "Término",
              "Definición",
              "Ejemplo"
            ],
            "filas": [
              [
                "Negligencia",
                "No hacer lo que se debía hacer (omisión)",
                "No inmovilizar una columna con mecanismo de riesgo"
              ],
              [
                "Impericia",
                "Falta de pericia, conocimiento o destreza",
                "Intentar un procedimiento sin la capacitación"
              ],
              [
                "Imprudencia",
                "Hacer de más o sin precaución (comisión)",
                "Conducir la ambulancia de forma temeraria"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Consentimiento, rechazo y abandono",
            "texto": "Todo paciente competente puede dar o rechazar la atención (consentimiento informado / rechazo informado). En el inconsciente o el menor sin tutor opera el consentimiento implícito (presunto). Una vez iniciada la atención, suspenderla sin transferir a un nivel igual o superior constituye abandono."
          }
        ],
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      },
      {
        "titulo": "El FRAP: tu documento legal",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El Formato de Registro de Atención Prehospitalaria (FRAP) es el documento médico-legal que respalda toda la atención. Documenta la evaluación, los hallazgos, las intervenciones, la evolución y la transferencia. Tiene valor probatorio: es tu defensa principal ante cualquier reclamo."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Lo que no se escribió, no se hizo",
            "texto": "Registra con letra legible, sin alterar ni borrar (los errores se tachan con una línea y se rubrican), con hora de cada intervención y los datos de quien recibe al paciente. Un FRAP completo protege; uno incompleto o alterado condena."
          }
        ],
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      },
      {
        "titulo": "Cronología: la línea del tiempo del servicio",
        "bloques": [
          {
            "tipo": "pasos",
            "titulo": "Horas que debes registrar",
            "items": [
              "Recepción de la llamada (cuándo se activó el servicio).",
              "Salida de la base o unidad hacia la escena.",
              "Arribo a la escena.",
              "Contacto con el paciente (arribo al paciente).",
              "Salida de la escena hacia el hospital.",
              "Arribo al hospital.",
              "Disponibilidad de la unidad (fin del servicio)."
            ]
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Signos vitales seriados",
            "texto": "Registra al menos dos tomas de signos vitales: la inicial y una previa a la entrega. En el paciente inestable, cada 5 minutos; en el estable, cada 15. Cada toma con su hora: la tendencia (si mejora o empeora) tiene más valor clínico y legal que un dato aislado."
          }
        ],
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      },
      {
        "titulo": "Errores, correcciones y valor legal",
        "bloques": [
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "Cómo se corrige un error",
            "texto": "Nunca borres ni uses corrector. El error se tacha con UNA sola línea que permita seguir leyendo lo escrito, se anota la corrección y se rubrica. Los espacios en blanco se cancelan con una línea para que nadie agregue información después. Cualquier alteración (borrones, tachones ilegibles, hojas rehechas) destruye el valor probatorio del formato."
          },
          {
            "tipo": "callout",
            "variante": "clave",
            "titulo": "Objetivo y sin juicios",
            "texto": "El FRAP es un documento técnico, no un espacio para opiniones sobre el paciente o terceros. Registra hechos, horas y datos medibles. Anotaciones despectivas o subjetivas pueden volverse en tu contra."
          }
        ],
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ],
    "conceptosClave": [
      {
        "termino": "FRAP",
        "definicion": "Formato de Registro de Atención Prehospitalaria; documento médico-legal con valor probatorio.",
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      },
      {
        "termino": "FRAP",
        "definicion": "Formato de Registro de Atención Prehospitalaria; documento médico-legal, uno por paciente.",
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ],
    "flashcards": [
      {
        "frente": "¿Por qué es vital el FRAP?",
        "reverso": "Es el documento médico-legal con valor probatorio: \"lo que no se escribió, no se hizo\".",
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      }
    ],
    "quiz": [
      {
        "pregunta": "Un paramédico inicia la atención de un paciente y luego lo deja sin transferirlo a personal de igual o mayor nivel. Esto constituye:",
        "opciones": [
          "Consentimiento implícito",
          "Abandono",
          "Impericia",
          "Buena práctica"
        ],
        "correcta": 1,
        "explicacion": "Suspender la atención ya iniciada sin transferencia adecuada es abandono, una falta médico-legal.",
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      },
      {
        "pregunta": "Al cometer un error de escritura en el FRAP, lo correcto es:",
        "opciones": [
          "Borrarlo con corrector y escribir encima",
          "Tacharlo con una línea legible, corregir y rubricar",
          "Rehacer toda la hoja",
          "Dejarlo tal cual para no alterar el documento"
        ],
        "correcta": 1,
        "explicacion": "El error se tacha con una sola línea que deje leer lo escrito, se corrige y se rubrica; borrar o usar corrector invalida el valor legal.",
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      },
      {
        "pregunta": "¿Por qué se registran signos vitales seriados y no una sola toma?",
        "opciones": [
          "Por norma de llenar espacios",
          "Para mostrar la tendencia (si mejora o empeora) del paciente",
          "Porque una sola toma es ilegal",
          "Para justificar el tiempo en escena"
        ],
        "correcta": 1,
        "explicacion": "La tendencia de los signos vitales tiene más valor clínico y legal que un dato aislado.",
        "procedencia": {
          "temaOriginal": "llenado-frap"
        }
      }
    ]
  },
  "m5-cin-arma-blanca-fuego": {
    "secciones": [
      {
        "titulo": "Indicios y cadena de custodia",
        "bloques": [
          {
            "tipo": "p",
            "texto": "En hechos posiblemente delictivos (violencia, accidentes, muertes), la escena contiene indicios con valor legal. El paramédico prioriza la vida, pero debe alterar lo mínimo indispensable: no mover objetos sin necesidad, conservar la ropa cortada y documentar lo que se modificó al atender."
          },
          {
            "tipo": "callout",
            "variante": "clinico",
            "titulo": "Atiende sin contaminar",
            "texto": "Si debes cortar ropa, evita hacerlo sobre orificios de bala o arma blanca. Coloca lo retirado en bolsa de papel cuando sea posible. Si hay un fallecido con signos evidentes de muerte y un posible delito, no muevas el cuerpo y da aviso a la autoridad."
          }
        ],
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": []
  },
  "m2-ao-hematopoyetico": {
    "secciones": [],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "Ante una urgencia que pone en peligro la vida, la Ley General de Salud establece que la atención:",
        "opciones": [
          "Puede condicionarse a pago previo",
          "No puede negarse ni condicionarse",
          "Solo aplica en hospitales privados",
          "Es opcional"
        ],
        "correcta": 1,
        "explicacion": "La atención de la urgencia es obligatoria y no puede condicionarse a pago; negarla puede ser delito.",
        "procedencia": {
          "temaOriginal": "legislacion-marco-normativo-mexico",
          "porUnidad": true
        }
      }
    ]
  },
  "m5-hs-torniquete": {
    "secciones": [
      {
        "titulo": "Medicina Táctica Civil (TECC)",
        "bloques": [
          {
            "tipo": "p",
            "texto": "El TECC (Tactical Emergency Casualty Care) adapta los principios militares del TCCC al entorno civil de alta amenaza (tiroteos activos, atentados, disturbios). Organiza la atención en tres fases que corresponden a tres zonas de riesgo."
          },
          {
            "tipo": "pasos",
            "titulo": "Las tres fases del TECC",
            "items": [
              "Amenaza directa (zona caliente): la amenaza sigue activa. Prioridad: neutralizar/evadir la amenaza, mover a la víctima a cubierto y controlar SOLO la hemorragia masiva con torniquete.",
              "Amenaza indirecta (zona templada): amenaza reducida pero presente. Se aplica el algoritmo MARCH de forma rápida.",
              "Evacuación (zona fría): traslado a la atención definitiva, reevaluando intervenciones y previniendo la hipotermia."
            ]
          },
          {
            "tipo": "tabla",
            "titulo": "Algoritmo MARCH",
            "headers": [
              "Letra",
              "Prioridad"
            ],
            "filas": [
              [
                "M — Massive hemorrhage",
                "Hemorragia masiva: torniquete, empaquetamiento"
              ],
              [
                "A — Airway",
                "Vía aérea: posición, cánulas, supraglóticos"
              ],
              [
                "R — Respirations",
                "Respiración: descompresión de neumotórax, sello de tórax"
              ],
              [
                "C — Circulation",
                "Circulación: accesos, control de hemorragia, TXA"
              ],
              [
                "H — Head / Hypothermia",
                "TCE y prevención de hipotermia"
              ]
            ]
          },
          {
            "tipo": "callout",
            "variante": "alerta",
            "titulo": "En la zona caliente, solo lo que mata en minutos",
            "texto": "Bajo amenaza directa NO se hace evaluación completa: la hemorragia exanguinante es la única causa que se trata (torniquete) antes de mover a la víctima a un lugar seguro. La mejor medicina táctica es la superioridad de la fuerza y la cobertura."
          },
          {
            "tipo": "imagen",
            "src": "",
            "alt": "Fases del TECC y zonas de amenaza",
            "caption": "Fases del TECC (zona caliente, templada y fría) y el algoritmo MARCH.",
            "busqueda": "TECC phases hot warm cold zone MARCH algorithm diagram"
          }
        ],
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      }
    ],
    "conceptosClave": [],
    "flashcards": [],
    "quiz": [
      {
        "pregunta": "En la fase de amenaza directa del TECC (zona caliente), la única intervención médica prioritaria es:",
        "opciones": [
          "Intubar",
          "Controlar la hemorragia masiva con torniquete",
          "Canalizar dos vías",
          "Inmovilizar la columna"
        ],
        "correcta": 1,
        "explicacion": "Bajo amenaza directa solo se controla la hemorragia exanguinante (torniquete) y se mueve a la víctima a cubierto.",
        "procedencia": {
          "temaOriginal": "operaciones-especiales-tactica-bienestar"
        }
      }
    ]
  }
}
