export const SYSTEMS = [
  {
    id: 'skeletal',
    name: 'Sistema óseo',
    shortName: 'Huesos',
    color: '#e2d9ba',
    description: 'Los huesos sostienen el cuerpo, protegen órganos y sirven de anclaje a músculos y ligamentos.',
  },
  {
    id: 'muscular',
    name: 'Sistema muscular',
    shortName: 'Músculos',
    color: '#a85b50',
    description: 'Los músculos generan movimiento, estabilizan articulaciones y contribuyen a la postura y la producción de calor.',
  },
  {
    id: 'cardiac',
    name: 'Corazón',
    shortName: 'Corazón',
    color: '#b96760',
    description: 'El corazón impulsa la sangre a través de los circuitos pulmonar y sistémico.',
  },
  {
    id: 'sensory',
    name: 'Órganos de los sentidos',
    shortName: 'Sentidos',
    color: '#b0c8ce',
    description: 'Las estructuras sensoriales detectan estímulos y transmiten información al sistema nervioso.',
  },
  {
    id: 'arterial',
    name: 'Sistema arterial',
    shortName: 'Arterias',
    color: '#c05245',
    description: 'Las arterias llevan sangre desde el corazón hacia los tejidos o, en la circulación pulmonar, hacia los pulmones.',
  },
  {
    id: 'venous',
    name: 'Sistema venoso',
    shortName: 'Venas',
    color: '#527c9f',
    description: 'Las venas devuelven la sangre al corazón mediante redes superficiales y profundas.',
  },
  {
    id: 'nervous',
    name: 'Sistema nervioso',
    shortName: 'Nervios',
    color: '#d8b565',
    description: 'El encéfalo, la médula espinal y los nervios reciben, procesan y transmiten señales.',
  },
  {
    id: 'respiratory',
    name: 'Sistema respiratorio',
    shortName: 'Respiratorio',
    color: '#b98991',
    description: 'La vía aérea conduce el aire y los pulmones permiten el intercambio de oxígeno y dióxido de carbono.',
  },
  {
    id: 'digestive',
    name: 'Sistema digestivo',
    shortName: 'Digestivo',
    color: '#b8916b',
    description: 'El tubo digestivo y sus órganos accesorios procesan alimentos, absorben nutrientes y movilizan desechos.',
  },
  {
    id: 'urinary',
    name: 'Sistema urinario',
    shortName: 'Urinario',
    color: '#b47961',
    description: 'Los riñones filtran la sangre y regulan el equilibrio de líquidos, electrolitos y ácido-base.',
  },
  {
    id: 'lymphatic',
    name: 'Sistema linfático',
    shortName: 'Linfático',
    color: '#879f7c',
    description: 'Los vasos y órganos linfáticos participan en el retorno de líquido y en la respuesta inmunitaria.',
  },
  {
    id: 'endocrine',
    name: 'Sistema endocrino',
    shortName: 'Endocrino',
    color: '#c5a09a',
    description: 'Los órganos endocrinos liberan hormonas que coordinan el metabolismo, el crecimiento y la respuesta al estrés.',
  },
  {
    id: 'reproductive',
    name: 'Sistema reproductor',
    shortName: 'Reproductor',
    color: '#bda098',
    description: 'Este modelo representa estructuras reproductoras de una referencia anatómica masculina adulta.',
  },
  {
    id: 'integumentary',
    name: 'Superficie corporal',
    shortName: 'Superficie',
    color: '#ba9b7d',
    description: 'La superficie corporal aporta una referencia exterior y representa la barrera protectora del organismo.',
  },
  {
    id: 'connective',
    name: 'Tejido conectivo',
    shortName: 'Conectivo',
    color: '#aec3bb',
    description: 'Cartílagos, ligamentos y otros tejidos conectivos unen, sostienen y estabilizan estructuras.',
  },
]

export const DEFAULT_VISIBLE = SYSTEMS
  .filter((system) => system.id !== 'integumentary')
  .map((system) => system.id)

export const ORGAN_SYSTEMS = [
  'cardiac',
  'respiratory',
  'digestive',
  'urinary',
  'endocrine',
  'reproductive',
]

const NOMBRES_ES = {
  heart: 'Corazón',
  brain: 'Encéfalo',
  cerebrum: 'Cerebro',
  cerebellum: 'Cerebelo',
  'spinal cord': 'Médula espinal',
  trachea: 'Tráquea',
  larynx: 'Laringe',
  pharynx: 'Faringe',
  esophagus: 'Esófago',
  diaphragm: 'Diafragma',
  'right lung': 'Pulmón derecho',
  'left lung': 'Pulmón izquierdo',
  lung: 'Pulmón',
  liver: 'Hígado',
  stomach: 'Estómago',
  spleen: 'Bazo',
  pancreas: 'Páncreas',
  gallbladder: 'Vesícula biliar',
  'small intestine': 'Intestino delgado',
  'large intestine': 'Intestino grueso',
  colon: 'Colon',
  rectum: 'Recto',
  appendix: 'Apéndice',
  'right kidney': 'Riñón derecho',
  'left kidney': 'Riñón izquierdo',
  kidney: 'Riñón',
  ureter: 'Uréter',
  'urinary bladder': 'Vejiga urinaria',
  aorta: 'Aorta',
  'pulmonary artery': 'Arteria pulmonar',
  'pulmonary vein': 'Vena pulmonar',
  'superior vena cava': 'Vena cava superior',
  'inferior vena cava': 'Vena cava inferior',
  carotid: 'Carótida',
  'common carotid artery': 'Arteria carótida común',
  'subclavian artery': 'Arteria subclavia',
  'femoral artery': 'Arteria femoral',
  'radial artery': 'Arteria radial',
  skull: 'Cráneo',
  mandible: 'Mandíbula',
  maxilla: 'Maxilar',
  hyoid: 'Hueso hioides',
  sternum: 'Esternón',
  rib: 'Costilla',
  ribs: 'Costillas',
  clavicle: 'Clavícula',
  scapula: 'Escápula',
  humerus: 'Húmero',
  radius: 'Radio',
  ulna: 'Cúbito',
  pelvis: 'Pelvis',
  sacrum: 'Sacro',
  coccyx: 'Cóccix',
  femur: 'Fémur',
  patella: 'Rótula',
  tibia: 'Tibia',
  fibula: 'Peroné',
  'cervical vertebra': 'Vértebra cervical',
  'thoracic vertebra': 'Vértebra torácica',
  'lumbar vertebra': 'Vértebra lumbar',
  thyroid: 'Tiroides',
  'pituitary gland': 'Hipófisis',
  adrenal: 'Glándula suprarrenal',
  'adrenal gland': 'Glándula suprarrenal',
  eye: 'Ojo',
  ear: 'Oído',
  tongue: 'Lengua',
}

const SINONIMOS = {
  heart: ['corazon', 'cardiaco', 'miocardio'],
  brain: ['encefalo', 'cerebro', 'neurologico'],
  trachea: ['traquea', 'via aerea'],
  larynx: ['laringe', 'via aerea'],
  pharynx: ['faringe', 'via aerea'],
  diaphragm: ['diafragma', 'respiracion', 'ventilacion'],
  lung: ['pulmon', 'respiratorio'],
  'right lung': ['pulmon derecho'],
  'left lung': ['pulmon izquierdo'],
  liver: ['higado'],
  spleen: ['bazo'],
  pancreas: ['pancreas'],
  'urinary bladder': ['vejiga'],
  aorta: ['aorta', 'gran vaso'],
  sternum: ['esternon', 'rcp', 'torax'],
  rib: ['costilla', 'torax'],
  ribs: ['costillas', 'torax'],
  hyoid: ['hioides', 'via aerea'],
  pelvis: ['pelvis', 'trauma pelvico'],
  femur: ['femur', 'hueso largo'],
  tibia: ['tibia', 'hueso largo'],
  fibula: ['perone'],
  ulna: ['cubito'],
}

const EXPLICACIONES = {
  heart: 'Bomba muscular de cuatro cavidades situada en el mediastino. Su lado derecho impulsa sangre hacia los pulmones y el izquierdo hacia la circulación sistémica.',
  liver: 'Órgano abdominal situado principalmente bajo el hemidiafragma derecho. Participa en el metabolismo, la síntesis de proteínas y la producción de bilis.',
  brain: 'Órgano central del sistema nervioso. Integra funciones motoras, sensitivas, cognitivas y autonómicas.',
  stomach: 'Cámara muscular entre el esófago y el intestino delgado que almacena y mezcla el contenido ingerido.',
  spleen: 'Órgano linfoide del cuadrante superior izquierdo que filtra sangre y participa en la respuesta inmunitaria.',
  pancreas: 'Órgano abdominal con funciones digestivas y endocrinas, incluida la producción de enzimas y hormonas.',
  'urinary bladder': 'Reservorio muscular pélvico que almacena la orina procedente de los riñones.',
  trachea: 'Conducto principal de la vía aérea entre la laringe y los bronquios. Sus anillos cartilaginosos ayudan a mantenerla abierta.',
  diaphragm: 'Músculo que separa tórax y abdomen. Su contracción aumenta el volumen torácico y participa de forma principal en la inspiración.',
}

export const normalizarTexto = (value = '') => String(value)
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .trim()

export function nombreEstructura(name = '') {
  return NOMBRES_ES[normalizarTexto(name)] || name
}

export function terminosEstructura(concept) {
  const key = normalizarTexto(concept?.name)
  return [
    concept?.name,
    concept?.id,
    NOMBRES_ES[key],
    ...(SINONIMOS[key] || []),
  ]
    .filter(Boolean)
    .map(normalizarTexto)
    .join(' ')
}

export function explicacionEstructura(name, systemId) {
  const key = normalizarTexto(name)
  return EXPLICACIONES[key]
    || SYSTEMS.find((system) => system.id === systemId)?.description
    || 'Estructura identificada en el modelo anatómico de referencia BodyParts3D.'
}

export function sistemaPorId(id) {
  return SYSTEMS.find((system) => system.id === id) || null
}
