// Temario Definitivo de Medicina Prehospitalaria y Farmacología Avanzada (V3)
// Estructura oficial: 5 módulos, categorías y 97 subtemas numerados.
// Cada subtema enlaza (temaId) al tema de estudio que lo cubre, cuando existe.

export const temarioOficial = {
  titulo: 'Temario Definitivo de Medicina Prehospitalaria y Farmacología Avanzada',
  subtitulo: 'Hoja de ruta del Paramédico Avanzado (5 módulos · 97 subtemas)',
  descripcion:
    'Mapa exhaustivo del temario oficial. Cada subtema está enlazado al tema de estudio a fondo cuando ya existe en la guía; los marcados como «en desarrollo» están contemplados y se irán redactando.',
  modulos: [
    {
      numero: 'I',
      titulo: 'Fisiología Médica Avanzada',
      icono: '🔬',
      descripcion: 'Fundamentos biológicos y sistémicos para comprender la fisiopatología del paciente crítico.',
      categorias: [
        {
          titulo: 'A · Biología Celular, Tisular y Neurofisiología',
          recursos: 'Guyton & Hall: Tratado de Fisiología Médica · LITFL Neurophysiology',
          subtemas: [
            { n: 1, t: 'Dinámica de la membrana celular: transporte activo, pasivo y ósmosis', temaId: 'biologia-celular-bioquimica' },
            { n: 2, t: 'Electrofisiología celular: potencial de reposo y de acción', temaId: 'neuroanatomia-avanzada' },
            { n: 3, t: 'Fisiología muscular: mecanismos de contracción', temaId: 'sistema-musculoesqueletico' },
            { n: 4, t: 'Hematopoyesis: origen y función celular', temaId: 'hematologia-coagulacion' },
            { n: 5, t: 'Hemostasia y coagulación: tapón plaquetario, cascada y fibrinólisis', temaId: 'hematologia-coagulacion' },
            { n: 6, t: 'Transmisión sináptica: neurotransmisores', temaId: 'neuroanatomia-avanzada' },
            { n: 7, t: 'Corteza cerebral: mapeo y Homúnculo de Penfield', temaId: 'neuroanatomia-avanzada' },
            { n: 8, t: 'Sistema Límbico y Sistema Nervioso Autónomo', temaId: 'neuroanatomia-avanzada' },
            { n: 9, t: 'Neurobiología del dolor: vías aferentes y modulación central', temaId: 'neuroanatomia-avanzada' },
            { n: 10, t: 'Control motor extrapiramidal y dinámica del LCR', temaId: 'neuroanatomia-avanzada' },
            { n: 11, t: 'Fisiología sensorial integrativa', temaId: 'neuroanatomia-avanzada' },
          ],
        },
        {
          titulo: 'B · Fisiología Cardiovascular y Respiratoria',
          recursos: 'West: Fisiología Respiratoria · LITFL Cardiovascular Physiology',
          subtemas: [
            { n: 12, t: 'Sistema de conducción cardíaco: nodos y red de Purkinje', temaId: 'cardiovascular-profundo' },
            { n: 13, t: 'Mecánica del ciclo cardíaco: sístole, diástole, curvas presión-volumen', temaId: 'cardiovascular-profundo' },
            { n: 14, t: 'Gasto cardíaco: precarga, postcarga y Ley de Frank-Starling', temaId: 'cardiovascular-profundo' },
            { n: 15, t: 'Hemodinámica vascular y regulación de la presión arterial', temaId: 'cardiovascular-profundo' },
            { n: 16, t: 'Fisiología microvascular y circulación coronaria', temaId: 'cardiovascular-profundo' },
            { n: 17, t: 'Mecánica ventilatoria: compliance, resistencia y surfactante', temaId: 'respiratorio-profundo' },
            { n: 18, t: 'Espirometría fisiológica y difusión gaseosa alveolocapilar', temaId: 'respiratorio-profundo' },
            { n: 19, t: 'Transporte de O₂ (efecto Bohr) y CO₂ (efecto Haldane)', temaId: 'respiratorio-profundo' },
            { n: 20, t: 'Regulación ácido-base respiratoria y control ventilatorio', temaId: 'respiratorio-profundo' },
          ],
        },
        {
          titulo: 'C · Fisiología Renal, Gastrointestinal y Endocrina',
          recursos: 'Ganong: Fisiología Médica · Endocrine Society Protocols',
          subtemas: [
            { n: 21, t: 'Dinámica glomerular: determinantes de la TFG', temaId: 'renal-hidroelectrolitico' },
            { n: 22, t: 'Procesamiento tubular y regulación osmótica (ADH/Aldosterona)', temaId: 'renal-hidroelectrolitico' },
            { n: 23, t: 'Motilidad y secreción gastrointestinal', temaId: 'sistema-digestivo' },
            { n: 24, t: 'Fisiología hepatobiliar y eje hipotálamo-hipofisario', temaId: 'sistema-endocrino' },
            { n: 25, t: 'Metabolismo glucémico: fisiología del páncreas endocrino', temaId: 'sistema-endocrino' },
            { n: 26, t: 'Respuesta fisiológica al estrés: catecolaminas y cortisol', temaId: 'sistema-endocrino' },
          ],
        },
      ],
    },
    {
      numero: 'II',
      titulo: 'Marco Normativo, Operaciones Especiales y Triage',
      icono: '⚖️',
      descripcion: 'Regulación oficial en México y despliegue en incidentes complejos.',
      categorias: [
        {
          titulo: 'A · Legislación Mexicana y Operativa',
          recursos: 'Diario Oficial de la Federación (DOF) · Manuales de la Cruz Roja Mexicana',
          subtemas: [
            { n: 27, t: 'NOM-034-SSA3-2013: regulación de la atención médica prehospitalaria' },
            { n: 28, t: 'Ley General de Salud: artículos sobre urgencias y traslados' },
            { n: 29, t: 'Tipificación de ambulancias (NOM-034)' },
            { n: 30, t: 'Perfil del TUM/Paramédico oficial' },
            { n: 31, t: 'Aspectos médico-legales: negligencia, impericia, imprudencia' },
            { n: 32, t: 'Llenado y valor legal del FRAP (Formato de Registro de Atención Prehospitalaria)' },
            { n: 33, t: 'Manejo de casos médico-legales e indicios' },
            { n: 34, t: 'NOM-087-ECOL-SSA1-2002: manejo de RPBI en ambulancias' },
            { n: 35, t: 'Coordinación médica: enlace con CRUM y despacho 911' },
          ],
        },
        {
          titulo: 'B · Desastres, Triage y Táctica',
          recursos: 'FEMA (Incident Command System) · C-TECC Guidelines',
          subtemas: [
            { n: 36, t: 'Sistema de Comando de Incidentes (SCI)', temaId: 'triage-mci' },
            { n: 37, t: 'Triage prehospitalario START y JumpSTART', temaId: 'triage-mci' },
            { n: 38, t: 'Despliegue operativo: Puesto Médico Avanzado (PMA)', temaId: 'triage-mci' },
            { n: 39, t: 'Medicina Táctica Civil (TECC): fases de atención bajo amenaza' },
            { n: 40, t: 'Incidentes HazMat (materiales peligrosos): zonas de control' },
            { n: 41, t: 'Traslado de pacientes infectocontagiosos' },
            { n: 42, t: 'Aeromedicina de evacuación' },
            { n: 43, t: 'Psicología de emergencias y salud mental del paramédico (defusing/debriefing)' },
          ],
        },
      ],
    },
    {
      numero: 'III',
      titulo: 'Evaluación Clínica y Manejo de Trauma Avanzado',
      icono: '🚑',
      descripcion: 'El pilar de la atención prehospitalaria: abordaje sistemático e intervenciones críticas.',
      categorias: [
        {
          titulo: 'A · Evaluación, Soporte Vital y Vía Aérea',
          recursos: 'Guías AHA (BLS/ACLS) · Manual The Walls de Vía Aérea',
          subtemas: [
            { n: 44, t: 'Evaluación de la escena y evaluación primaria integral (X-A-B-C-D-E)', temaId: 'evaluacion-integral' },
            { n: 45, t: 'Evaluación secundaria sistemática (SAMPLE, OPQRST)', temaId: 'evaluacion-integral' },
            { n: 46, t: 'Monitoreo fisiológico: oximetría, capnografía (EtCO₂) y glucometría', temaId: 'monitorizacion-paciente' },
            { n: 47, t: 'RCP de alta calidad y desfibrilación prehospitalaria (DEA/manual)', temaId: 'svb-rcp' },
            { n: 48, t: 'Manejo básico de la vía aérea (cánulas, BVM)', temaId: 'oxigenoterapia-via-aerea-basica' },
            { n: 49, t: 'Manejo avanzado de la vía aérea: dispositivos supraglóticos e intubación', temaId: 'via-aerea-avanzada-supraglotica' },
            { n: 50, t: 'Oxigenoterapia de urgencia y manejo del tubo de tórax', temaId: 'oxigenoterapia-via-aerea-basica' },
            { n: 51, t: 'Ventilación mecánica prehospitalaria: parámetros básicos de traslado', temaId: 'via-aerea-definitiva' },
          ],
        },
        {
          titulo: 'B · Protocolos de Trauma (Stop The Bleed / PHTLS)',
          recursos: 'PHTLS 10.ma edición · Stop The Bleed (ACS)',
          subtemas: [
            { n: 52, t: 'Cinemática del trauma', temaId: 'phtls-trauma' },
            { n: 53, t: 'Control de hemorragia masiva (Stop The Bleed) y agentes hemostáticos', temaId: 'hemorragias-shock-basico' },
            { n: 54, t: 'Torniquetes en extremidades y empaquetamiento de heridas (wound packing)', temaId: 'hemorragias-shock-basico' },
            { n: 55, t: 'Shock hipovolémico hemorrágico: reanimación hídrica restrictiva', temaId: 'shock-avanzado' },
            { n: 56, t: 'Manejo del traumatismo craneoencefálico (TCE)', temaId: 'soporte-trauma-critico' },
            { n: 57, t: 'Restricción de la movilidad espinal (RME) selectiva', temaId: 'phtls-trauma' },
            { n: 58, t: 'Trauma torácico: descompresión pleural con aguja y parches valvulados', temaId: 'soporte-trauma-critico' },
            { n: 59, t: 'Trauma abdominal, pélvico (fajas) y amputaciones/avulsiones', temaId: 'trauma-por-sistemas' },
            { n: 60, t: 'Atención de quemaduras termo-químicas (SCQ)', temaId: 'quemaduras-inhalacion' },
            { n: 61, t: 'Extracción vehicular (rápida vs. chaleco KED)', temaId: 'phtls-trauma' },
          ],
        },
      ],
    },
    {
      numero: 'IV',
      titulo: 'Emergencias Médicas, Gineco-Obstétricas y Pediátricas',
      icono: '🍼',
      descripcion: 'Urgencias clínicas, del adulto crítico al parto y la pediatría.',
      categorias: [
        {
          titulo: 'A · Emergencias Clínicas y Especiales',
          recursos: 'Tintinalli: Emergency Medicine · Guías Goldfrank de Toxicología',
          subtemas: [
            { n: 62, t: 'Síndrome Coronario Agudo (SCA) y protocolo «Código Infarto»', temaId: 'sica-profundo' },
            { n: 63, t: 'Emergencias neurológicas («Código Cerebro», EVC)', temaId: 'emergencias-neurologicas' },
            { n: 64, t: 'Crisis convulsivas y estatus epiléptico', temaId: 'emergencias-neurologicas' },
            { n: 65, t: 'Emergencias metabólicas (hipoglucemia, CAD) y estado mental alterado (AEIOU-TIPS)', temaId: 'evaluacion-neurologica-avdi-glasgow' },
            { n: 66, t: 'Crisis asmática, EPOC y anafilaxia', temaId: 'emergencias-respiratorias-criticas' },
            { n: 67, t: 'Toxicología clínica y toxidromes', temaId: 'antidotos-emergencias-toxicologicas' },
            { n: 68, t: 'Emergencias ambientales (hipotermia, golpe de calor)', temaId: 'emergencias-ambientales' },
            { n: 69, t: 'Envenenamiento por fauna de México (ofidios, arácnidos)' },
          ],
        },
        {
          titulo: 'B · Obstetricia y Pediatría',
          recursos: 'Guías PALS · Manual ALSO (Obstetricia)',
          subtemas: [
            { n: 70, t: 'Parto fortuito prehospitalario y hemorragia postparto', temaId: 'obstetricia-neonatal' },
            { n: 71, t: 'Trastornos hipertensivos del embarazo (preeclampsia/eclampsia)', temaId: 'obstetricia-neonatal' },
            { n: 72, t: 'Reanimación neonatal (minuto de oro)', temaId: 'obstetricia-neonatal' },
            { n: 73, t: 'Triángulo de Evaluación Pediátrica (TEP)', temaId: 'pediatria-especiales' },
            { n: 74, t: 'Insuficiencia respiratoria y shock en pediatría', temaId: 'pediatria-especiales' },
            { n: 75, t: 'Soporte pediátrico especial (crisis febriles, maltrato)', temaId: 'pediatria-especiales' },
          ],
        },
      ],
    },
    {
      numero: 'V',
      titulo: 'Farmacología Prehospitalaria y Cuidados Críticos',
      icono: '💊',
      descripcion: 'El arsenal terapéutico del paramédico avanzado.',
      categorias: [
        {
          titulo: 'A · Farmacocinética, Accesos y Reanimación Inicial',
          recursos: 'Goodman & Gilman · Protocolos AHA (ACLS)',
          subtemas: [
            { n: 76, t: 'Bases farmacológicas: farmacodinamia, agonismo y receptores adrenérgicos/colinérgicos', temaId: 'bases-farmacologicas-receptores' },
            { n: 77, t: 'Farmacocinética de campo: vías de administración (IV, IO, IM, IN, SL)', temaId: 'vias-administracion' },
            { n: 78, t: 'Accesos vasculares: canulación periférica y acceso intraóseo (IO)', temaId: 'terapia-iv-io' },
            { n: 79, t: 'Fluidoterapia de reanimación: cristaloides vs. control de daños', temaId: 'fluidoterapia-electrolitos' },
            { n: 80, t: 'Fármacos resucitadores base: adrenalina, amiodarona y atropina', temaId: 'acls-paro-cardiaco' },
            { n: 81, t: 'Manejo de disritmias en ruta: cardioversión y marcapasos transcutáneo', temaId: 'arritmias-manejo' },
          ],
        },
        {
          titulo: 'B · Farmacología Crítica Avanzada (Vía Aérea, Hemodinámia y Trauma)',
          recursos: 'REBEL EM · EMCrit · The Lancet (CRASH Trials)',
          subtemas: [
            { n: 82, t: 'Secuencia Rápida y Demorada de Intubación (SRI/SDA)', temaId: 'farmacologia-via-aerea-sri-sda' },
            { n: 83, t: 'Agentes inductores: ketamina, etomidato, propofol, midazolam', temaId: 'farmacologia-via-aerea-sri-sda' },
            { n: 84, t: 'Bloqueadores neuromusculares: succinilcolina, rocuronio, vecuronio', temaId: 'farmacologia-via-aerea-sri-sda' },
            { n: 85, t: 'Fármacos de pretratamiento de vía aérea: fentanilo, lidocaína', temaId: 'farmacologia-via-aerea-sri-sda' },
            { n: 86, t: 'Soporte hemodinámico: norepinefrina, epinefrina y vasopresina en infusión', temaId: 'soporte-hemodinamico-vasopresores' },
            { n: 87, t: 'Vasopresores en dosis de empuje (push-dose pressors)', temaId: 'soporte-hemodinamico-vasopresores' },
            { n: 88, t: 'Analgesia mayor opioide: fentanilo, morfina, buprenorfina y reversión con naloxona', temaId: 'analgesia-mayor-anestesia-disociativa' },
            { n: 89, t: 'Analgesia y anestesia disociativa: ketamina a dosis subdisociativas', temaId: 'analgesia-mayor-anestesia-disociativa' },
            { n: 90, t: 'Coadyuvantes y antieméticos: ondansetrón, metoclopramida', temaId: 'farmacologia-clinica-avanzada' },
            { n: 91, t: 'Farmacología en trauma (tríada de la muerte): ácido tranexámico (TXA)', temaId: 'trauma-coagulopatia-hemorragia-obstetrica' },
            { n: 92, t: 'Soporte de calcio en exanguinación (gluconato/cloruro)', temaId: 'trauma-coagulopatia-hemorragia-obstetrica' },
            { n: 93, t: 'Farmacología neurocrítica: solución salina hipertónica y manitol para PIC', temaId: 'farmacologia-neurocritica-pic' },
            { n: 94, t: 'Anticonvulsivantes avanzados: levetiracetam, fosfenitoína', temaId: 'farmacologia-neurocritica-pic' },
            { n: 95, t: 'Farmacología respiratoria refractaria: sulfato de magnesio IV, terbutalina, epinefrina racémica', temaId: 'farmacologia-respiratoria-avanzada' },
            { n: 96, t: 'Antídotos específicos: glucagón, pralidoxima, bicarbonato de sodio', temaId: 'antidotos-emergencias-toxicologicas' },
            { n: 97, t: 'Farmacología obstétrica crítica: oxitocina para HPP, sulfato de magnesio para eclampsia', temaId: 'trauma-coagulopatia-hemorragia-obstetrica' },
          ],
        },
      ],
    },
  ],
}

// Total de subtemas y cuántos están enlazados a un tema existente.
export const temarioStats = (() => {
  let total = 0
  let cubiertos = 0
  for (const m of temarioOficial.modulos)
    for (const c of m.categorias)
      for (const s of c.subtemas) {
        total++
        if (s.temaId) cubiertos++
      }
  return { total, cubiertos }
})()
