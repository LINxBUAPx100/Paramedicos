// ARCHIVO GENERADO por scripts/migrar-iconos-emoji.mjs — constancia y reversión.
//
// Qué es: el registro de la migración de iconos de tema. Para cada tema, el
// valor que tenía el campo `icono` antes (un emoji) y el identificador de
// activo médico que tiene ahora.
//
// Para qué sirve:
//   · REVERTIR. Si hubiera que volver atrás, aquí está el valor anterior de
//     cada tema, tema por tema.
//   · AUDITAR. Deja ver los casos en los que el emoji era, además de frágil,
//     incorrecto: 🫀 (corazón) en tres temas de hígado, 🦵 (pierna) en uno de
//     cadera, 🩸 (sangre) repetido en hemorragia y en hematopoyesis.
//
// La regla del reemplazo NO fue «este emoji por este dibujo», sino «este TEMA
// por el activo que le asignó la curación» (scripts/activos/mapa-temas.json).
// Por eso el mismo emoji aparece sustituido por activos distintos.
//
// Nadie edita este archivo a mano y la aplicación no lo importa.

export const ICONOS_MIGRADOS = {
  "m1-pai-rcp-pediatrico": {
    "anterior": "👶",
    "nuevo": "ic-rcp"
  },
  "m1-pai-ferulas-vendajes": {
    "anterior": "🩹",
    "nuevo": "ic-fractura"
  },
  "m1-pai-evaluacion-xabcde": {
    "anterior": "🔤",
    "nuevo": "cp-cc0-paciente"
  },
  "m1-pai-ovace-pediatrico": {
    "anterior": "🧒",
    "nuevo": "ic-nino"
  },
  "m1-pai-intoxicaciones": {
    "anterior": "☠️",
    "nuevo": "cp-cc0-toxico"
  },
  "m1-smu-bienestar-tum": {
    "anterior": "🧘",
    "nuevo": "cp-servier-traslado-carga"
  },
  "m1-smu-terminologia": {
    "anterior": "📖",
    "nuevo": "cp-servier-libro"
  },
  "m1-examen-aplicacion": {
    "anterior": "📝",
    "nuevo": "cp-servier-libreta"
  },
  "m1-pai-signos-vitales": {
    "anterior": "🌡️",
    "nuevo": "ic-tension-arterial"
  },
  "m1-pai-heridas-especiales": {
    "anterior": "🩹",
    "nuevo": "cp-servier-piel"
  },
  "m1-smu-medico-legales": {
    "anterior": "⚖️",
    "nuevo": "cp-servier-balanza-desequilibrada"
  },
  "m1-smu-posiciones-lineas": {
    "anterior": "🧭",
    "nuevo": "cp-cc0-paciente"
  },
  "m1-pab-introduccion": {
    "anterior": "🚑",
    "nuevo": "ic-ambulancia"
  },
  "m1-pab-avdi": {
    "anterior": "🧠",
    "nuevo": "cp-servier-cerebro"
  },
  "m1-pab-rcp-legos-adulto": {
    "anterior": "❤️",
    "nuevo": "ic-rcp"
  },
  "m1-pab-dea": {
    "anterior": "⚡",
    "nuevo": "ic-desfibrilador"
  },
  "m1-pab-ovace-adultos": {
    "anterior": "🫁",
    "nuevo": "cp-servier-via-aerea-superior"
  },
  "m1-pab-hemorragias": {
    "anterior": "🩸",
    "nuevo": "cp-servier-eritrocito"
  },
  "m1-pab-fracturas": {
    "anterior": "🦴",
    "nuevo": "ic-fractura"
  },
  "m1-pab-quemaduras": {
    "anterior": "🔥",
    "nuevo": "cp-servier-quemadura-2do"
  },
  "m1-pab-botiquin": {
    "anterior": "🧰",
    "nuevo": "ic-botiquin"
  },
  "m2-afe-celula": {
    "anterior": "🔬",
    "nuevo": "cp-servier-celula-vacia"
  },
  "m2-afe-liquidos-electrolitos": {
    "anterior": "💧",
    "nuevo": "cp-servier-agua"
  },
  "m2-afe-electrofisiologia": {
    "anterior": "⚡",
    "nuevo": "cp-cc0-potencial-accion"
  },
  "m2-afe-acido-base": {
    "anterior": "⚖️",
    "nuevo": "dg-equilibrio-acido-base"
  },
  "m2-afe-metabolismo": {
    "anterior": "🔥",
    "nuevo": "cp-servier-mitocondria"
  },
  "m2-afe-tegumentario": {
    "anterior": "🧴",
    "nuevo": "cp-servier-piel"
  },
  "m2-afi-oseo": {
    "anterior": "🦴",
    "nuevo": "cp-smart-esqueleto"
  },
  "m2-afi-muscular": {
    "anterior": "💪",
    "nuevo": "cp-servier-musculo"
  },
  "m2-afi-cardiovascular": {
    "anterior": "❤️",
    "nuevo": "il-corazon-vascularizacion"
  },
  "m2-afi-nervioso": {
    "anterior": "🧠",
    "nuevo": "cp-servier-cerebro"
  },
  "m2-afi-digestivo": {
    "anterior": "🍽️",
    "nuevo": "cp-servier-estomago"
  },
  "m2-afi-urinario": {
    "anterior": "🚰",
    "nuevo": "dg-nefrona"
  },
  "m2-ao-hematopoyetico": {
    "anterior": "🩸",
    "nuevo": "cp-servier-eritrocito"
  },
  "m2-ao-linfatico-inmunitario": {
    "anterior": "🛡️",
    "nuevo": "cp-servier-linfatico"
  },
  "m2-ao-reproductor": {
    "anterior": "⚕️",
    "nuevo": "cp-smart-utero"
  },
  "m2-ao-sentidos": {
    "anterior": "👁️",
    "nuevo": "cp-servier-ojo"
  },
  "m2-ao-endocrino": {
    "anterior": "🧪",
    "nuevo": "dg-glandulas-endocrinas"
  },
  "m3-ep-sss": {
    "anterior": "🛡️",
    "nuevo": "cp-cc0-riesgo-biologico"
  },
  "m3-ep-avdi": {
    "anterior": "🧠",
    "nuevo": "cp-servier-cerebro"
  },
  "m3-ep-via-aerea-cervicales": {
    "anterior": "🫁",
    "nuevo": "cp-servier-via-aerea-superior"
  },
  "m3-ep-respiracion": {
    "anterior": "💨",
    "nuevo": "cp-servier-pulmon"
  },
  "m3-ep-circulacion": {
    "anterior": "🩸",
    "nuevo": "cp-servier-capilares"
  },
  "m3-ep-neurologica": {
    "anterior": "🔦",
    "nuevo": "cp-servier-cerebro"
  },
  "m3-ep-exploracion-dirigida": {
    "anterior": "🔎",
    "nuevo": "cp-cc0-lupa"
  },
  "m3-es-abcde": {
    "anterior": "🔤",
    "nuevo": "cp-cc0-paciente"
  },
  "m3-es-sample": {
    "anterior": "📋",
    "nuevo": "cp-servier-libreta"
  },
  "m3-es-exploracion-detallada": {
    "anterior": "🫱",
    "nuevo": "ic-estetoscopio"
  },
  "m3-md-ecg-basica": {
    "anterior": "📈",
    "nuevo": "dg-ecg-onda-normal"
  },
  "m3-md-uso-monitor": {
    "anterior": "⚡",
    "nuevo": "cp-smart-holter"
  },
  "m3-md-arritmias-letales": {
    "anterior": "💔",
    "nuevo": "ic-desfibrilador"
  },
  "m3-md-codigo-mega": {
    "anterior": "🎯",
    "nuevo": "ic-rcp"
  },
  "m3-va-tecnica-intubacion": {
    "anterior": "🔦",
    "nuevo": "cp-smart-laringe-corte"
  },
  "m3-va-hojas-tubos": {
    "anterior": "📏",
    "nuevo": "cp-smart-laringe-corte"
  },
  "m3-va-mascarilla-laringea": {
    "anterior": "🎭",
    "nuevo": "cp-servier-via-aerea-superior"
  },
  "m3-va-obturador-esofagico": {
    "anterior": "🏛️",
    "nuevo": "cp-smart-esofago"
  },
  "m3-va-cricotirotomia": {
    "anterior": "⚠️",
    "nuevo": "cp-servier-laringe"
  },
  "m3-va-dispositivos-o2": {
    "anterior": "💨",
    "nuevo": "cp-servier-ventilador"
  },
  "m3-va-tanques-o2": {
    "anterior": "🛢️",
    "nuevo": "cp-cc0-gas"
  },
  "m3-va-isr": {
    "anterior": "💉",
    "nuevo": "dg-secuencia-intubacion"
  },
  "m3-va-repaso-anatomia": {
    "anterior": "🫁",
    "nuevo": "il-arbol-traqueobronquial"
  },
  "m3-va-levantamiento-menton": {
    "anterior": "🤚",
    "nuevo": "cp-servier-via-aerea-superior"
  },
  "m3-va-triple-maniobra": {
    "anterior": "🧑‍🚒",
    "nuevo": "cp-servier-via-aerea-superior"
  },
  "m3-va-menton-inclinacion": {
    "anterior": "↗️",
    "nuevo": "cp-servier-via-aerea-superior"
  },
  "m3-va-canulas-orofaringeas": {
    "anterior": "🔧",
    "nuevo": "cp-servier-cavidad-oral"
  },
  "m3-va-canulas-nasofaringeas": {
    "anterior": "👃",
    "nuevo": "cp-servier-cavidad-nasal"
  },
  "m3-vi-ventajas-desventajas": {
    "anterior": "💧",
    "nuevo": "cp-servier-bolsa-infusion"
  },
  "m3-vi-sitios-puncion": {
    "anterior": "🎯",
    "nuevo": "cp-servier-vena"
  },
  "m3-vi-cristaloides": {
    "anterior": "🧪",
    "nuevo": "dg-soluciones-cristaloides"
  },
  "m3-vi-canalizacion": {
    "anterior": "🩹",
    "nuevo": "cp-servier-vena"
  },
  "m3-vi-osteolisis": {
    "anterior": "🦴",
    "nuevo": "ic-hueso"
  },
  "m4-card-exploracion": {
    "anterior": "🫀",
    "nuevo": "cp-servier-corazon-interior"
  },
  "m4-card-ecg-basica": {
    "anterior": "📈",
    "nuevo": "dg-ecg-onda-normal"
  },
  "m4-card-sca": {
    "anterior": "💔",
    "nuevo": "il-corazon-vascularizacion"
  },
  "m4-card-pcr-megacode": {
    "anterior": "🚨",
    "nuevo": "ic-rcp"
  },
  "m4-card-arritmias": {
    "anterior": "〰️",
    "nuevo": "cp-servier-ecg"
  },
  "m4-card-insuficiencia": {
    "anterior": "🫁",
    "nuevo": "cp-servier-edema-miembros"
  },
  "m4-card-hipertension": {
    "anterior": "🩺",
    "nuevo": "ic-tension-arterial"
  },
  "m4-epi-conceptos": {
    "anterior": "📊",
    "nuevo": "cp-servier-curva-gauss"
  },
  "m4-epi-urgencia-emergencia": {
    "anterior": "⏱️",
    "nuevo": "cp-servier-cronometro"
  },
  "m4-epi-clasificacion": {
    "anterior": "🗂️",
    "nuevo": "cp-servier-curva-gauss"
  },
  "m4-far-generalidades": {
    "anterior": "💊",
    "nuevo": "cp-servier-descenso-exponencial"
  },
  "m4-far-nom-034": {
    "anterior": "📋",
    "nuevo": "cp-servier-libreta"
  },
  "m4-far-dosis-urgencia": {
    "anterior": "🧮",
    "nuevo": "cp-servier-dosis-efecto"
  },
  "m4-far-infusiones-aminas": {
    "anterior": "⏳",
    "nuevo": "cp-servier-grafica-perfusion"
  },
  "m4-gi-exploracion-abdominal": {
    "anterior": "🫃",
    "nuevo": "cp-servier-hepatomegalia"
  },
  "m4-gi-apendicitis": {
    "anterior": "🔺",
    "nuevo": "cp-servier-colon"
  },
  "m4-gi-pancreatitis": {
    "anterior": "🥞",
    "nuevo": "cp-servier-pancreas"
  },
  "m4-gi-gastritis-colitis": {
    "anterior": "🔥",
    "nuevo": "cp-servier-ulcera-gastrica"
  },
  "m4-gi-colelitiasis": {
    "anterior": "🟡",
    "nuevo": "cp-servier-colelitiasis"
  },
  "m4-gi-deshidratacion": {
    "anterior": "💧",
    "nuevo": "cp-servier-agua"
  },
  "m4-gi-oclusion-intestinal": {
    "anterior": "⛔",
    "nuevo": "cp-servier-intestino-delgado"
  },
  "m4-gi-sangrado-tubo": {
    "anterior": "🩸",
    "nuevo": "cp-servier-ulcera-gastrica"
  },
  "m4-gi-cirrosis-hepatitis": {
    "anterior": "🫀",
    "nuevo": "cp-servier-cirrosis"
  },
  "m4-gyn-exploracion": {
    "anterior": "🩺",
    "nuevo": "cp-smart-utero"
  },
  "m4-gyn-cambios-embarazo": {
    "anterior": "🤰",
    "nuevo": "ic-feto-utero"
  },
  "m4-gyn-trabajo-parto": {
    "anterior": "👶",
    "nuevo": "ic-feto-utero"
  },
  "m4-gyn-parto-distocico": {
    "anterior": "⚠️",
    "nuevo": "ic-feto-utero"
  },
  "m4-gyn-sufrimiento-fetal": {
    "anterior": "📉",
    "nuevo": "cp-smart-placenta"
  },
  "m4-gyn-hemorragia-2do-3er": {
    "anterior": "🩸",
    "nuevo": "ic-feto-utero"
  },
  "m4-gyn-aborto": {
    "anterior": "🕊️",
    "nuevo": "cp-smart-utero"
  },
  "m4-gyn-ectopico": {
    "anterior": "🚑",
    "nuevo": "cp-smart-utero"
  },
  "m4-gyn-torsion-ovarica": {
    "anterior": "🌀",
    "nuevo": "cp-smart-utero"
  },
  "m4-gyn-hemorragia-postparto": {
    "anterior": "🚨",
    "nuevo": "cp-servier-eritrocito"
  },
  "m4-gyn-eclampsia": {
    "anterior": "⚡",
    "nuevo": "ic-tension-arterial"
  },
  "m4-met-diabetes": {
    "anterior": "🩸",
    "nuevo": "cp-servier-islote-langerhans"
  },
  "m4-met-complicaciones": {
    "anterior": "⚠️",
    "nuevo": "cp-servier-islote-langerhans"
  },
  "m4-met-acido-base": {
    "anterior": "⚖️",
    "nuevo": "dg-equilibrio-acido-base"
  },
  "m4-neu-exploracion": {
    "anterior": "🧠",
    "nuevo": "cp-servier-cerebro"
  },
  "m4-neu-cefalea-migrana": {
    "anterior": "🤕",
    "nuevo": "cp-servier-senos-paranasales"
  },
  "m4-neu-evc": {
    "anterior": "⏱️",
    "nuevo": "cp-smart-evc-isquemico"
  },
  "m4-neu-crisis-convulsivas": {
    "anterior": "⚡",
    "nuevo": "cp-servier-cerebro"
  },
  "m4-neu-sincope": {
    "anterior": "💫",
    "nuevo": "cp-servier-cerebro"
  },
  "m4-resp-exploracion-torax": {
    "anterior": "🩺",
    "nuevo": "ic-estetoscopio"
  },
  "m4-resp-insuficiencia": {
    "anterior": "🫁",
    "nuevo": "cp-servier-via-intrapulmonar"
  },
  "m4-resp-epoc": {
    "anterior": "💨",
    "nuevo": "cp-servier-enfisema"
  },
  "m4-resp-edema-pulmon": {
    "anterior": "🌊",
    "nuevo": "cp-servier-edema-pulmonar"
  },
  "m4-resp-neumotorax-espontaneo": {
    "anterior": "🎈",
    "nuevo": "cp-servier-neumotorax"
  },
  "m4-resp-tep": {
    "anterior": "🩸",
    "nuevo": "cp-servier-tep"
  },
  "m4-resp-neumonia-bronquitis": {
    "anterior": "🦠",
    "nuevo": "cp-servier-bronquitis-cronica"
  },
  "m4-resp-asma": {
    "anterior": "🌬️",
    "nuevo": "cp-servier-bronquio-inflamado"
  },
  "m4-tox-toxindromes": {
    "anterior": "☠️",
    "nuevo": "cp-cc0-toxico"
  },
  "m4-tox-abstinencia": {
    "anterior": "🥃",
    "nuevo": "cp-servier-alcohol"
  },
  "m4-tox-picaduras": {
    "anterior": "🦂",
    "nuevo": "cp-dbcls-abeja"
  },
  "m4-tox-anafilaxia": {
    "anterior": "🚨",
    "nuevo": "cp-servier-anticuerpo"
  },
  "m4-uri-ivu": {
    "anterior": "🦠",
    "nuevo": "cp-servier-vejiga"
  },
  "m4-uri-urolitiasis": {
    "anterior": "🪨",
    "nuevo": "cp-servier-calculos"
  },
  "m4-uri-desequilibrio-electrolitico": {
    "anterior": "⚡",
    "nuevo": "cp-servier-balanza-desequilibrada"
  },
  "m4-uri-insuficiencia-renal": {
    "anterior": "🫘",
    "nuevo": "cp-servier-grafica-renal"
  },
  "m5-ta-abdomen-agudo": {
    "anterior": "🚨",
    "nuevo": "cp-servier-peristalsis"
  },
  "m5-ta-definicion": {
    "anterior": "🩻",
    "nuevo": "cp-servier-intestino"
  },
  "m5-ta-cuadrantes": {
    "anterior": "🔍",
    "nuevo": "cp-cc0-lupa"
  },
  "m5-ta-bazo": {
    "anterior": "🩸",
    "nuevo": "cp-servier-bazo"
  },
  "m5-ta-higado": {
    "anterior": "🫀",
    "nuevo": "cp-servier-higado"
  },
  "m5-ta-estomago": {
    "anterior": "🍽️",
    "nuevo": "cp-servier-estomago"
  },
  "m5-ta-pancreas": {
    "anterior": "🧪",
    "nuevo": "cp-servier-pancreas"
  },
  "m5-ta-intestino": {
    "anterior": "🌀",
    "nuevo": "cp-servier-intestino"
  },
  "m5-ta-genitourinaria": {
    "anterior": "🚻",
    "nuevo": "cp-servier-vejiga"
  },
  "m5-la-hipotermia": {
    "anterior": "❄️",
    "nuevo": "cp-servier-frio"
  },
  "m5-la-golpe-calor": {
    "anterior": "🔥",
    "nuevo": "cp-servier-calor"
  },
  "m5-la-insolacion": {
    "anterior": "☀️",
    "nuevo": "cp-servier-sol"
  },
  "m5-cin-definicion": {
    "anterior": "💥",
    "nuevo": "cp-servier-corredor"
  },
  "m5-cin-energia-cinetica": {
    "anterior": "🚗",
    "nuevo": "cp-servier-ciclista"
  },
  "m5-cin-energia-potencial": {
    "anterior": "🪜",
    "nuevo": "cp-servier-corredor"
  },
  "m5-cin-abierto-cerrado": {
    "anterior": "🔀",
    "nuevo": "cp-smart-esqueleto"
  },
  "m5-cin-cavitacion": {
    "anterior": "🕳️",
    "nuevo": "cp-servier-fibra-muscular"
  },
  "m5-cin-arma-blanca-fuego": {
    "anterior": "🔪",
    "nuevo": "cp-cc0-explosivo"
  },
  "m5-cin-triada-wadell": {
    "anterior": "🚸",
    "nuevo": "ic-nino"
  },
  "m5-cin-desaceleracion": {
    "anterior": "🛑",
    "nuevo": "cp-servier-aorta"
  },
  "m5-cin-vehiculo-automotor": {
    "anterior": "🚙",
    "nuevo": "cp-servier-ciclista"
  },
  "m5-cin-motocicleta": {
    "anterior": "🏍️",
    "nuevo": "cp-servier-ciclista"
  },
  "m5-cin-explosiones": {
    "anterior": "💣",
    "nuevo": "cp-cc0-explosivo"
  },
  "m5-tcc-definicion": {
    "anterior": "🧠",
    "nuevo": "cp-smart-craneo"
  },
  "m5-tcc-kellie-monroe": {
    "anterior": "⚖️",
    "nuevo": "cp-smart-craneo"
  },
  "m5-tcc-fractura-craneo": {
    "anterior": "💀",
    "nuevo": "cp-smart-craneo"
  },
  "m5-tcc-escalpe": {
    "anterior": "🩹",
    "nuevo": "cp-smart-craneo"
  },
  "m5-tcc-lesiones-focales": {
    "anterior": "🎯",
    "nuevo": "cp-smart-evc-hemorragico"
  },
  "m5-tcc-lesiones-intracraneales": {
    "anterior": "🧩",
    "nuevo": "cp-smart-evc-hemorragico"
  },
  "m5-tcc-glasgow": {
    "anterior": "🔢",
    "nuevo": "cp-servier-cerebro"
  },
  "m5-tcc-pic": {
    "anterior": "📈",
    "nuevo": "cp-smart-craneo"
  },
  "m5-tcc-manitol": {
    "anterior": "💉",
    "nuevo": "cp-servier-inyectable"
  },
  "m5-tcc-fracturas-vertebrales": {
    "anterior": "🦴",
    "nuevo": "dg-columna-vertebral"
  },
  "m5-tcc-medular-anterior": {
    "anterior": "⬆️",
    "nuevo": "cp-smart-medula-espinal"
  },
  "m5-tcc-cauda-equina": {
    "anterior": "🐴",
    "nuevo": "cp-smart-medula-espinal"
  },
  "m5-tcc-lesiones-difusas": {
    "anterior": "🧠",
    "nuevo": "cp-servier-cerebro"
  },
  "m5-tcc-signos-sintomas": {
    "anterior": "👁️",
    "nuevo": "cp-servier-ojo"
  },
  "m5-tcc-tratamiento": {
    "anterior": "🚑",
    "nuevo": "ic-ambulancia"
  },
  "m5-tcc-medular-posterior": {
    "anterior": "⬇️",
    "nuevo": "cp-smart-medula-espinal"
  },
  "m5-tcc-brown-sequard": {
    "anterior": "↔️",
    "nuevo": "cp-smart-medula-espinal"
  },
  "m5-tcc-exploracion-fisica": {
    "anterior": "🖐️",
    "nuevo": "cp-servier-mano"
  },
  "m5-tcc-signos-tratamiento-columna": {
    "anterior": "🦴",
    "nuevo": "ic-collarin"
  },
  "m5-tcc-inmovilizacion-espinal": {
    "anterior": "🛏️",
    "nuevo": "ic-collarin"
  },
  "m5-hs-tipos-hemorragias": {
    "anterior": "🩸",
    "nuevo": "cp-servier-eritrocito"
  },
  "m5-hs-control-hemorragias": {
    "anterior": "🧤",
    "nuevo": "cp-cc0-guantes"
  },
  "m5-hs-torniquete": {
    "anterior": "🩹",
    "nuevo": "cp-servier-arteria"
  },
  "m5-hs-definicion-tipos-shock": {
    "anterior": "📉",
    "nuevo": "cp-servier-capilares"
  },
  "m5-hs-fisiopatologia": {
    "anterior": "🫀",
    "nuevo": "cp-servier-capilares"
  },
  "m5-tme-fracturas-inmovilizacion": {
    "anterior": "🦴",
    "nuevo": "ic-fractura"
  },
  "m5-tme-esguinces-luxaciones": {
    "anterior": "🤕",
    "nuevo": "ic-esguince"
  },
  "m5-tme-cadera": {
    "anterior": "🦵",
    "nuevo": "cp-smart-pelvis"
  },
  "m5-tme-compartimental": {
    "anterior": "⏱️",
    "nuevo": "cp-servier-fibra-muscular"
  },
  "m5-tme-aplastamiento": {
    "anterior": "🧱",
    "nuevo": "cp-servier-fibra-muscular"
  },
  "m5-tme-ferulas-sager-hare": {
    "anterior": "🔧",
    "nuevo": "ic-fractura"
  },
  "m5-tme-farmacos": {
    "anterior": "💊",
    "nuevo": "cp-servier-tableta"
  },
  "m5-tocc-lefort": {
    "anterior": "🦷",
    "nuevo": "cp-servier-senos-paranasales"
  },
  "m5-tocc-facial-signos": {
    "anterior": "😷",
    "nuevo": "cp-servier-senos-paranasales"
  },
  "m5-tocc-ocular-empalado": {
    "anterior": "📌",
    "nuevo": "cp-servier-ojo-corte"
  },
  "m5-tocc-hemorragia-conjuntival": {
    "anterior": "👁️",
    "nuevo": "cp-servier-ojo-corte"
  },
  "m5-tocc-lesion-muscular-ojo": {
    "anterior": "🔄",
    "nuevo": "cp-servier-musculos-ojo"
  },
  "m5-tocc-ocular-exploracion": {
    "anterior": "🔦",
    "nuevo": "cp-servier-ojo"
  },
  "m5-tocc-cuello-hemorragias": {
    "anterior": "🩸",
    "nuevo": "cp-smart-arterias-cuello"
  },
  "m5-tocc-cuello-exploracion": {
    "anterior": "🔎",
    "nuevo": "cp-smart-arterias-cuello"
  },
  "m5-tocc-cuello-empalado": {
    "anterior": "🗡️",
    "nuevo": "cp-smart-arterias-cuello"
  },
  "m5-que-definicion": {
    "anterior": "🔥",
    "nuevo": "cp-servier-piel"
  },
  "m5-que-agentes-termicos": {
    "anterior": "🧯",
    "nuevo": "dg-agentes-quemadura"
  },
  "m5-que-grados": {
    "anterior": "📊",
    "nuevo": "cp-servier-quemadura-2do"
  },
  "m5-que-regla-9s": {
    "anterior": "🖐️",
    "nuevo": "cp-servier-mano"
  },
  "m5-que-parkland": {
    "anterior": "💧",
    "nuevo": "cp-servier-bolsa-infusion"
  },
  "m5-que-tratamiento": {
    "anterior": "🚑",
    "nuevo": "cp-servier-bolsa-infusion"
  },
  "m5-que-curacion": {
    "anterior": "🩹",
    "nuevo": "cp-cc0-guantes"
  },
  "m5-hs-definicion": {
    "anterior": "🩸",
    "nuevo": "cp-servier-eritrocito"
  },
  "m5-hs-hipovolemico": {
    "anterior": "💧",
    "nuevo": "cp-servier-eritrocito"
  },
  "m5-hs-cardiogenico": {
    "anterior": "💔",
    "nuevo": "cp-servier-corazon-interior"
  },
  "m5-hs-neurogenico": {
    "anterior": "🧠",
    "nuevo": "cp-smart-medula-espinal"
  },
  "m5-hs-anafilactico": {
    "anterior": "🐝",
    "nuevo": "cp-servier-anticuerpo"
  },
  "m5-hs-septico": {
    "anterior": "🦠",
    "nuevo": "cp-servier-neutrofilo"
  },
  "m5-hs-signos-tratamiento": {
    "anterior": "🚑",
    "nuevo": "cp-servier-capilares"
  },
  "m5-tt-clasificacion": {
    "anterior": "🗂️",
    "nuevo": "cp-smart-caja-toracica"
  },
  "m5-tt-traquea-laringe": {
    "anterior": "🗣️",
    "nuevo": "cp-servier-laringe"
  },
  "m5-tt-costilla": {
    "anterior": "🦴",
    "nuevo": "cp-smart-fractura-costal"
  },
  "m5-tt-torax-inestable": {
    "anterior": "↕️",
    "nuevo": "cp-smart-fractura-costal"
  },
  "m5-tt-neumotorax-simple": {
    "anterior": "🫧",
    "nuevo": "cp-servier-neumotorax"
  },
  "m5-tt-neumotorax-abierto": {
    "anterior": "🌬️",
    "nuevo": "cp-servier-neumotorax"
  },
  "m5-tt-hemotorax": {
    "anterior": "🩸",
    "nuevo": "cp-servier-eritrocito"
  },
  "m5-tt-traqueo-bronquial": {
    "anterior": "🌲",
    "nuevo": "il-arbol-traqueobronquial"
  },
  "m5-tt-disrupcion-aortica": {
    "anterior": "⚡",
    "nuevo": "cp-servier-aorta"
  },
  "m5-tt-taponamiento": {
    "anterior": "💔",
    "nuevo": "cp-servier-corazon-interior"
  },
  "m5-tt-contusion-miocardica": {
    "anterior": "🫀",
    "nuevo": "cp-servier-corazon"
  },
  "m5-tt-definicion": {
    "anterior": "🫁",
    "nuevo": "cp-smart-caja-toracica"
  },
  "m5-tt-clavicula": {
    "anterior": "🦴",
    "nuevo": "cp-smart-fractura-clavicula"
  },
  "m5-tt-escapula": {
    "anterior": "🛡️",
    "nuevo": "cp-smart-fractura-hombro"
  },
  "m5-tt-esofago": {
    "anterior": "⚠️",
    "nuevo": "cp-smart-esofago"
  },
  "m5-tt-neumotorax-tension": {
    "anterior": "🚨",
    "nuevo": "cp-servier-neumotorax"
  },
  "m5-tt-hemoneumotorax": {
    "anterior": "🩸",
    "nuevo": "cp-servier-neumotorax"
  },
  "m5-tt-quilotorax": {
    "anterior": "💧",
    "nuevo": "cp-servier-linfatico"
  },
  "m5-tt-contusion-pulmonar": {
    "anterior": "🫁",
    "nuevo": "cp-servier-via-intrapulmonar"
  },
  "m5-tt-asfixia-traumatica": {
    "anterior": "😰",
    "nuevo": "cp-servier-capilares"
  },
  "m5-tt-ruptura-diafragmatica": {
    "anterior": "↕️",
    "nuevo": "cp-servier-hernia-hiatal"
  },
  "m6-emp-ivr": {
    "anterior": "🤧",
    "nuevo": "cp-servier-cavidad-nasal"
  },
  "m6-emp-sufrimiento-fetal": {
    "anterior": "🤰",
    "nuevo": "cp-smart-placenta"
  },
  "m6-emp-patologia-respiratoria-rn": {
    "anterior": "🫁",
    "nuevo": "ic-recien-nacido"
  },
  "m6-emp-rn-sano-asfixia": {
    "anterior": "🍼",
    "nuevo": "ic-recien-nacido"
  },
  "m6-emp-asma": {
    "anterior": "💨",
    "nuevo": "cp-servier-bronquio-inflamado"
  },
  "m6-emp-deshidratacion": {
    "anterior": "💧",
    "nuevo": "cp-servier-agua"
  },
  "m6-emp-apendicitis": {
    "anterior": "🩺",
    "nuevo": "cp-servier-colon"
  },
  "m6-emp-oclusion-intestinal": {
    "anterior": "🌀",
    "nuevo": "cp-servier-intestino-delgado"
  },
  "m6-emp-sx-febril": {
    "anterior": "🌡️",
    "nuevo": "cp-cc0-termometro"
  },
  "m6-emp-meningitis": {
    "anterior": "🧠",
    "nuevo": "cp-servier-cerebro"
  },
  "m6-emp-cardiopatias": {
    "anterior": "❤️",
    "nuevo": "cp-servier-corazon-interior"
  },
  "m6-ig-definicion": {
    "anterior": "👴",
    "nuevo": "cp-servier-adulto-mayor"
  },
  "m6-ig-comunicacion": {
    "anterior": "💬",
    "nuevo": "cp-servier-rostro-mayor"
  },
  "m6-ig-gems": {
    "anterior": "💎",
    "nuevo": "ic-adultos-mayores"
  },
  "m6-ig-cambios-fisiologicos": {
    "anterior": "⚙️",
    "nuevo": "cp-servier-adulta-mayor"
  },
  "m6-ig-causas-muerte": {
    "anterior": "📉",
    "nuevo": "ic-adultos-mayores"
  },
  "m6-ig-polifarmacia": {
    "anterior": "💊",
    "nuevo": "cp-servier-blister"
  },
  "m6-ig-envejecimiento-trauma": {
    "anterior": "🩹",
    "nuevo": "cp-servier-adulto-mayor"
  },
  "m6-ig-envejecimiento-urgencias": {
    "anterior": "🩺",
    "nuevo": "cp-servier-adulto-mayor"
  },
  "m6-ig-envejecimiento-psiquiatria": {
    "anterior": "🧠",
    "nuevo": "cp-servier-rostro-mayor"
  },
  "m6-ig-abuso-mayores": {
    "anterior": "🛡️",
    "nuevo": "cp-servier-adulta-mayor"
  },
  "m6-mg-evaluacion": {
    "anterior": "📋",
    "nuevo": "cp-servier-adulto-mayor"
  },
  "m6-mg-traumatismo": {
    "anterior": "🚑",
    "nuevo": "cp-servier-adulto-mayor"
  },
  "m6-mg-emergencias-medicas": {
    "anterior": "❤️‍🩹",
    "nuevo": "cp-servier-adulto-mayor"
  },
  "m6-ip-pediatria": {
    "anterior": "🧒",
    "nuevo": "ic-nino"
  },
  "m6-ip-anatomia-fisiologia": {
    "anterior": "🫀",
    "nuevo": "cp-smart-esqueleto-nino"
  },
  "m6-ip-crecimiento": {
    "anterior": "📏",
    "nuevo": "cp-smart-esqueleto-nino"
  },
  "m6-ip-impresion-general": {
    "anterior": "👀",
    "nuevo": "cp-dbcls-examen-nino"
  },
  "m6-ip-triangulo": {
    "anterior": "🔺",
    "nuevo": "cp-dbcls-examen-nino"
  },
  "m6-ip-xabcde": {
    "anterior": "🔤",
    "nuevo": "ic-nino"
  },
  "m6-se-asuntos-familiares": {
    "anterior": "👨‍👩‍👧",
    "nuevo": "cp-dbcls-examen-nino"
  },
  "m6-se-abuso-infantil": {
    "anterior": "🛡️",
    "nuevo": "ic-nino"
  },
  "m6-se-muerte-subita": {
    "anterior": "🕯️",
    "nuevo": "ic-recien-nacido"
  },
  "m6-se-necesidades-especiales": {
    "anterior": "♿",
    "nuevo": "cp-servier-atomizador"
  },
  "m6-svp-rcp-neonatal": {
    "anterior": "👶",
    "nuevo": "ic-rcp"
  },
  "m6-svp-ovace": {
    "anterior": "🫁",
    "nuevo": "ic-nino"
  },
  "m6-tp-introduccion": {
    "anterior": "🚸",
    "nuevo": "ic-nino"
  },
  "m6-tp-sistemas-corporales": {
    "anterior": "🧩",
    "nuevo": "cp-smart-esqueleto-nino"
  },
  "m6-tp-inmovilizacion": {
    "anterior": "🛏️",
    "nuevo": "ic-collarin"
  },
  "m6-tp-manejo-lesiones": {
    "anterior": "🧰",
    "nuevo": "ic-fractura"
  },
  "m6-tp-osteolisis": {
    "anterior": "🦴",
    "nuevo": "ic-hueso"
  }
}

// Emojis retirados, con cuántos temas los usaban.
export const EMOJIS_RETIRADOS = {
  "🩸": 13,
  "🧠": 9,
  "🫁": 9,
  "🦴": 9,
  "🩹": 7,
  "⚡": 7,
  "💧": 7,
  "🚑": 6,
  "🫀": 6,
  "🔥": 5,
  "🛡️": 5,
  "🚨": 5,
  "🩺": 5,
  "⚖️": 4,
  "💨": 4,
  "💔": 4,
  "⚠️": 4,
  "👶": 3,
  "🔤": 3,
  "❤️": 3,
  "👁️": 3,
  "🧪": 3,
  "🔦": 3,
  "📋": 3,
  "📈": 3,
  "🎯": 3,
  "⏱️": 3,
  "💊": 3,
  "📉": 3,
  "🌀": 3,
  "🦠": 3,
  "🧒": 2,
  "☠️": 2,
  "🌡️": 2,
  "🧰": 2,
  "🍽️": 2,
  "🔎": 2,
  "📏": 2,
  "💉": 2,
  "🔧": 2,
  "📊": 2,
  "🗂️": 2,
  "🔺": 2,
  "🤰": 2,
  "🤕": 2,
  "🌬️": 2,
  "🚸": 2,
  "🧩": 2,
  "🖐️": 2,
  "🛏️": 2,
  "↕️": 2,
  "🧘": 1,
  "📖": 1,
  "📝": 1,
  "🧭": 1,
  "🔬": 1,
  "🧴": 1,
  "💪": 1,
  "🚰": 1,
  "⚕️": 1,
  "🫱": 1,
  "🎭": 1,
  "🏛️": 1,
  "🛢️": 1,
  "🤚": 1,
  "🧑‍🚒": 1,
  "↗️": 1,
  "👃": 1,
  "〰️": 1,
  "🧮": 1,
  "⏳": 1,
  "🫃": 1,
  "🥞": 1,
  "🟡": 1,
  "⛔": 1,
  "🕊️": 1,
  "💫": 1,
  "🌊": 1,
  "🎈": 1,
  "🥃": 1,
  "🦂": 1,
  "🪨": 1,
  "🫘": 1,
  "🩻": 1,
  "🔍": 1,
  "🚻": 1,
  "❄️": 1,
  "☀️": 1,
  "💥": 1,
  "🚗": 1,
  "🪜": 1,
  "🔀": 1,
  "🕳️": 1,
  "🔪": 1,
  "🛑": 1,
  "🚙": 1,
  "🏍️": 1,
  "💣": 1,
  "💀": 1,
  "🔢": 1,
  "⬆️": 1,
  "🐴": 1,
  "⬇️": 1,
  "↔️": 1,
  "🧤": 1,
  "🦵": 1,
  "🧱": 1,
  "🦷": 1,
  "😷": 1,
  "📌": 1,
  "🔄": 1,
  "🗡️": 1,
  "🧯": 1,
  "🐝": 1,
  "🗣️": 1,
  "🫧": 1,
  "🌲": 1,
  "😰": 1,
  "🤧": 1,
  "🍼": 1,
  "👴": 1,
  "💬": 1,
  "💎": 1,
  "⚙️": 1,
  "❤️‍🩹": 1,
  "👀": 1,
  "👨‍👩‍👧": 1,
  "🕯️": 1,
  "♿": 1
}
