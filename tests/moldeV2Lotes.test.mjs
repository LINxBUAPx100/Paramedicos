// ============================================================
//  Trabajo A · el molde v2 en TODO el temario
// ------------------------------------------------------------
//  Entre el 2 y el 7 de septiembre de 2026 las 268 lecciones con material
//  recibieron el molde v2: errores frecuentes, repaso rápido y preguntas de
//  repaso oral como secciones nuevas, más las mnemotecnias y los «lo que más
//  se pregunta» que caben dentro de las secciones que ya tenían.
//
//  El mapa UNIDADES de abajo cubre ya el temario completo —los siete módulos,
//  unidad por unidad—, así que estas pruebas dejaron de vigilar «los lotes
//  entregados» y vigilan el temario. Si mañana se añade una lección, se añade
//  a su unidad aquí y hereda las mismas comprobaciones.
//
//  LO QUE ESTAS PRUEBAS PROTEGEN, Y POR QUÉ CADA COSA:
//
//   · Que las piezas sigan ahí. Una regeneración del plan que se coma una
//     sección no da error: la lección sigue abriendo, solo que más pobre.
//   · Que «Fuentes» siga siendo la última sección. Es la convención de todo el
//     temario y lo que hace que la cita se lea al final, no en medio.
//   · Que los topes del molde se respeten. Un «repaso rápido» de treinta
//     viñetas deja de ser un repaso y vuelve a ser la lección.
//   · **Que el enriquecimiento no cuele datos clínicos nuevos.** Es el riesgo
//     real de esta pasada: un repaso o una mnemotecnia son un sitio comodísimo
//     para colar una dosis o un tiempo que nadie citó. La regla del lote fue
//     que todo se DERIVA de la prosa que la lección ya tiene, y esta prueba la
//     hace cumplir comprobando que ninguna cifra aparece por primera vez en las
//     secciones nuevas.
// ============================================================
import test from 'node:test'
import assert from 'node:assert/strict'
import { getTema, modulos } from '../src/data/index.js'

// Los lotes entregados, por unidad. Cada uno nuevo se añade aquí y hereda las
// mismas comprobaciones: es la forma de que el molde no se relaje al tercer
// lote, que es cuando se relajan las cosas.
// UNA LÍNEA POR UNIDAD, y los ids separados por espacios. La primera versión
// de esta lista era un array por unidad de cinco líneas cada uno; con veinte
// unidades entregadas eso convierte el archivo en una guía telefónica y hace
// que añadir un lote sea una edición delicada en lugar de una línea. La lista
// SIGUE SIENDO EXPLÍCITA a propósito: si se derivara del propio contenido
// —«todas las lecciones que tengan Repaso rápido»—, una lección que perdiera
// sus secciones simplemente saldría de la lista y la prueba pasaría en verde.
const UNIDADES = [
  ['M3 · evaluación primaria y secundaria',
    'm3-ep-sss m3-ep-avdi m3-ep-via-aerea-cervicales m3-ep-respiracion m3-ep-circulacion '
    + 'm3-ep-neurologica m3-ep-exploracion-dirigida m3-es-abcde m3-es-sample m3-es-exploracion-detallada'],
  ['M3 · manejo de la vía aérea',
    'm3-va-repaso-anatomia m3-va-levantamiento-menton m3-va-triple-maniobra m3-va-menton-inclinacion '
    + 'm3-va-canulas-orofaringeas m3-va-canulas-nasofaringeas m3-va-tecnica-intubacion m3-va-hojas-tubos '
    + 'm3-va-mascarilla-laringea m3-va-obturador-esofagico m3-va-cricotirotomia m3-va-dispositivos-o2 '
    + 'm3-va-tanques-o2 m3-va-isr'],
  // Lote 3, 06-09-2026. Las dos unidades que cierran el Módulo 3, y las dos que
  // declaran en su cabecera que NO publican cifras: la de acceso vascular no da
  // calibres, volúmenes ni composiciones, y la del monitor no da un solo valor
  // en julios porque la guía de 2025 defiere la energía al fabricante. Aquí el
  // guardarraíl de cifras deja de ser preventivo: si el molde v2 cuela una
  // cantidad, rompe el bloqueo declarado del archivo, no solo la regla del lote.
  ['M3 · vía intravenosa e intraósea',
    'm3-vi-ventajas-desventajas m3-vi-sitios-puncion m3-vi-cristaloides m3-vi-canalizacion m3-vi-osteolisis'],
  ['M3 · monitor desfibrilador',
    'm3-md-ecg-basica m3-md-uso-monitor m3-md-arritmias-letales m3-md-codigo-mega'],
  // Módulo 5 — trauma. A partir de aquí el guardarraíl de cifras trabaja de
  // verdad: son las unidades con volúmenes, superficies quemadas y escalas.
  ['M5 · cinemática de trauma y mecanismos de lesión',
    'm5-cin-definicion m5-cin-energia-cinetica m5-cin-energia-potencial m5-cin-abierto-cerrado '
    + 'm5-cin-cavitacion m5-cin-arma-blanca-fuego m5-cin-triada-wadell m5-cin-desaceleracion '
    + 'm5-cin-vehiculo-automotor m5-cin-motocicleta m5-cin-explosiones'],
  ['M5 · hemorragia y estado de shock',
    'm5-hs-definicion m5-hs-tipos-hemorragias m5-hs-control-hemorragias m5-hs-torniquete '
    + 'm5-hs-definicion-tipos-shock m5-hs-fisiopatologia m5-hs-hipovolemico m5-hs-cardiogenico '
    + 'm5-hs-neurogenico m5-hs-anafilactico m5-hs-septico m5-hs-signos-tratamiento'],
  ['M5 · trauma de tórax (lote A)',
    'm5-tt-definicion m5-tt-clasificacion m5-tt-clavicula m5-tt-escapula m5-tt-esofago '
    + 'm5-tt-traquea-laringe m5-tt-costilla m5-tt-torax-inestable m5-tt-neumotorax-simple '
    + 'm5-tt-neumotorax-abierto m5-tt-neumotorax-tension'],
  ['M5 · trauma de tórax (lote B)',
    'm5-tt-hemotorax m5-tt-hemoneumotorax m5-tt-quilotorax m5-tt-contusion-pulmonar '
    + 'm5-tt-traqueo-bronquial m5-tt-disrupcion-aortica m5-tt-taponamiento m5-tt-contusion-miocardica '
    + 'm5-tt-asfixia-traumatica m5-tt-ruptura-diafragmatica'],
  ['M5 · trauma de abdomen',
    'm5-ta-definicion m5-ta-abdomen-agudo m5-ta-cuadrantes m5-ta-estomago m5-ta-pancreas '
    + 'm5-ta-bazo m5-ta-higado m5-ta-intestino m5-ta-genitourinaria'],
  ['M5 · trauma de cráneo (lote A)',
    'm5-tcc-definicion m5-tcc-kellie-monroe m5-tcc-fractura-craneo m5-tcc-escalpe '
    + 'm5-tcc-lesiones-difusas m5-tcc-lesiones-focales m5-tcc-lesiones-intracraneales '
    + 'm5-tcc-glasgow m5-tcc-pic m5-tcc-signos-sintomas'],
  ['M5 · trauma de columna (lote B)',
    'm5-tcc-tratamiento m5-tcc-manitol m5-tcc-fracturas-vertebrales m5-tcc-medular-anterior '
    + 'm5-tcc-medular-posterior m5-tcc-cauda-equina m5-tcc-brown-sequard m5-tcc-exploracion-fisica '
    + 'm5-tcc-signos-tratamiento-columna m5-tcc-inmovilizacion-espinal'],
  ['M5 · trauma de ojo, cara y cuello',
    'm5-tocc-lefort m5-tocc-facial-signos m5-tocc-ocular-empalado m5-tocc-hemorragia-conjuntival '
    + 'm5-tocc-lesion-muscular-ojo m5-tocc-ocular-exploracion m5-tocc-cuello-hemorragias '
    + 'm5-tocc-cuello-exploracion m5-tocc-cuello-empalado'],
  ['M5 · musculoesquelético y lesiones ambientales',
    'm5-tme-fracturas-inmovilizacion m5-tme-esguinces-luxaciones m5-tme-cadera m5-tme-compartimental '
    + 'm5-tme-aplastamiento m5-tme-ferulas-sager-hare m5-tme-farmacos m5-la-hipotermia '
    + 'm5-la-golpe-calor m5-la-insolacion'],
  ['M5 · quemaduras',
    'm5-que-definicion m5-que-agentes-termicos m5-que-grados m5-que-regla-9s m5-que-parkland '
    + 'm5-que-tratamiento m5-que-curacion'],
  // Módulo 4 — urgencias médico quirúrgicas. La unidad de farmacología es la
  // que más bloqueos declarados tiene, así que el guardarraíl de cifras trabaja
  // aquí igual que en el monitor desfibrilador.
  ['M4 · epidemiología y farmacología',
    'm4-epi-conceptos m4-epi-urgencia-emergencia m4-epi-clasificacion m4-far-generalidades '
    + 'm4-far-nom-034 m4-far-dosis-urgencia m4-far-infusiones-aminas'],
  ['M4 · urgencias respiratorias',
    'm4-resp-exploracion-torax m4-resp-insuficiencia m4-resp-epoc m4-resp-edema-pulmon '
    + 'm4-resp-neumotorax-espontaneo m4-resp-tep m4-resp-neumonia-bronquitis m4-resp-asma'],
  ['M4 · urgencias gastrointestinales',
    'm4-gi-exploracion-abdominal m4-gi-apendicitis m4-gi-pancreatitis m4-gi-gastritis-colitis '
    + 'm4-gi-colelitiasis m4-gi-deshidratacion m4-gi-oclusion-intestinal m4-gi-sangrado-tubo '
    + 'm4-gi-cirrosis-hepatitis'],
  ['M4 · urgencias cardiológicas',
    'm4-card-exploracion m4-card-ecg-basica m4-card-sca m4-card-pcr-megacode m4-card-arritmias '
    + 'm4-card-insuficiencia m4-card-hipertension'],
  ['M4 · urgencias metabólicas y urinarias',
    'm4-met-diabetes m4-met-complicaciones m4-met-acido-base m4-uri-ivu m4-uri-urolitiasis '
    + 'm4-uri-desequilibrio-electrolitico m4-uri-insuficiencia-renal'],
  ['M4 · sistema nervioso y toxicológicas',
    'm4-neu-exploracion m4-neu-cefalea-migrana m4-neu-evc m4-neu-crisis-convulsivas m4-neu-sincope '
    + 'm4-tox-toxindromes m4-tox-abstinencia m4-tox-picaduras m4-tox-anafilaxia'],
  ['M4 · gineco-obstétricas',
    'm4-gyn-exploracion m4-gyn-cambios-embarazo m4-gyn-trabajo-parto m4-gyn-parto-distocico '
    + 'm4-gyn-sufrimiento-fetal m4-gyn-hemorragia-2do-3er m4-gyn-aborto m4-gyn-ectopico '
    + 'm4-gyn-torsion-ovarica m4-gyn-hemorragia-postparto m4-gyn-eclampsia'],
  // Módulo 6 — poblaciones especiales.
  ['M6 · pediatría: introducción, situaciones especiales y soporte vital',
    'm6-ip-pediatria m6-ip-anatomia-fisiologia m6-ip-crecimiento m6-ip-impresion-general '
    + 'm6-ip-triangulo m6-ip-xabcde m6-se-asuntos-familiares m6-se-abuso-infantil '
    + 'm6-se-muerte-subita m6-se-necesidades-especiales m6-svp-rcp-neonatal m6-svp-ovace'],
  ['M6 · emergencias médico quirúrgicas en pediatría',
    'm6-emp-ivr m6-emp-sufrimiento-fetal m6-emp-patologia-respiratoria-rn m6-emp-rn-sano-asfixia '
    + 'm6-emp-asma m6-emp-deshidratacion m6-emp-apendicitis m6-emp-oclusion-intestinal '
    + 'm6-emp-sx-febril m6-emp-meningitis m6-emp-cardiopatias'],
  ['M6 · trauma pediátrico y manejo geriátrico',
    'm6-tp-introduccion m6-tp-sistemas-corporales m6-tp-inmovilizacion m6-tp-manejo-lesiones '
    + 'm6-tp-osteolisis m6-mg-evaluacion m6-mg-traumatismo m6-mg-emergencias-medicas'],
  ['M6 · introducción a la geriatría',
    'm6-ig-definicion m6-ig-comunicacion m6-ig-gems m6-ig-cambios-fisiologicos '
    + 'm6-ig-causas-muerte m6-ig-polifarmacia m6-ig-envejecimiento-trauma '
    + 'm6-ig-envejecimiento-urgencias m6-ig-envejecimiento-psiquiatria m6-ig-abuso-mayores'],
  // Módulo 2 — anatomía y fisiología.
  ['M2 · anatomía y fisiología esencial',
    'm2-afe-celula m2-afe-liquidos-electrolitos m2-afe-electrofisiologia m2-afe-acido-base '
    + 'm2-afe-metabolismo m2-afe-tegumentario'],
  ['M2 · anatomía y fisiología intermedia',
    'm2-afi-oseo m2-afi-muscular m2-afi-cardiovascular m2-afi-nervioso m2-afi-digestivo '
    + 'm2-afi-urinario'],
  ['M2 · anatomía opcional',
    'm2-ao-hematopoyetico m2-ao-linfatico-inmunitario m2-ao-reproductor m2-ao-sentidos '
    + 'm2-ao-endocrino'],
  // Módulo 1 — propedéutico.
  ['M1 · primeros auxilios básicos',
    'm1-pab-introduccion m1-pab-avdi m1-pab-rcp-legos-adulto m1-pab-dea m1-pab-ovace-adultos '
    + 'm1-pab-hemorragias m1-pab-fracturas m1-pab-quemaduras m1-pab-botiquin'],
  ['M1 · primeros auxilios intermedios',
    'm1-pai-evaluacion-xabcde m1-pai-signos-vitales m1-pai-heridas-especiales '
    + 'm1-pai-rcp-pediatrico m1-pai-ovace-pediatrico m1-pai-intoxicaciones '
    + 'm1-pai-ferulas-vendajes'],
  ['M1 · introducción al SMU',
    'm1-smu-bienestar-tum m1-smu-medico-legales m1-smu-terminologia m1-smu-posiciones-lineas'],
]

const LOTES = Object.fromEntries(UNIDADES.map(([nombre, ids]) => [nombre, ids.split(/\s+/)]))

const LECCIONES = Object.values(LOTES).flat()

// `m3-ep-via-aerea-cervicales` ya traía su propia lista de errores dentro de
// «Control de la columna cervical», así que NO se le añadió una sección que
// habría dicho lo mismo con otro formato. La excepción se declara aquí para que
// se vea que fue una decisión y no un olvido.
const SIN_SECCION_DE_ERRORES = new Set(['m3-ep-via-aerea-cervicales'])

const NUEVAS = ['Errores frecuentes', 'Repaso rápido', 'Preguntas de repaso oral']

// CANTIDADES CON UNIDAD, en dígitos o escritas con letra: «diez segundos»,
// «0.5 mg», «tres minutos». Es lo que hay que vigilar.
//
// La primera versión de esta prueba miraba cualquier número escrito con letra y
// saltó con «falla en las dos direcciones»: prosa corriente, no una cifra
// clínica. Vigilar todo es no vigilar nada, porque obliga a relajar la prueba
// hasta que deja de servir. Lo que no puede aparecer por primera vez en un
// repaso es una CANTIDAD —una dosis, un tiempo, una presión—, y una cantidad
// clínica siempre lleva unidad detrás.
const NUM = '\\d+(?:[.,]\\d+)?|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|once|doce|quince|veinte|treinta|cuarenta|cincuenta|cien|ciento'
// Unidades CLÍNICAS y nada más. «puntos» y «veces» estaban aquí y volvieron a
// saltar con prosa corriente («tres puntos concentran las preguntas»): una
// unidad que también es una palabra común no sirve para detectar una dosis.
const UNIDAD = 'segundos?|minutos?|horas?|d[ií]as?|semanas?|mg|ml|mcg|litros?|mmHg|joules?|julios?|latidos|respiraciones|%'
const CANTIDADES = new RegExp(`\\b(?:${NUM})\\s*(?:${UNIDAD})\\b`, 'gi')

// Y por separado, cualquier número en dígitos: en un temario que escribe las
// cantidades con letra, un dígito suelto en una sección nueva casi siempre es
// un dato que se coló.
const DIGITOS = /\d+(?:[.,]\d+)?/g

const seccion = (tema, titulo) => (tema.secciones || []).find((s) => s.titulo === titulo)
const textoDe = (bloques) => (bloques || [])
  .map((b) => [b.texto, b.titulo, ...(b.items || []), ...(b.headers || []), ...(b.filas || []).flat()]
    .filter(Boolean).join(' '))
  .join(' ')

test('las lecciones de los lotes conservan sus piezas nuevas', () => {
  for (const id of LECCIONES) {
    const t = getTema(id)
    assert.ok(t, `no existe la lección ${id}`)
    for (const titulo of NUEVAS) {
      if (titulo === 'Errores frecuentes' && SIN_SECCION_DE_ERRORES.has(id)) continue
      assert.ok(seccion(t, titulo), `${id} perdió la sección «${titulo}»`)
    }
  }
})

test('«Fuentes» sigue siendo la última sección de cada lección', () => {
  for (const id of LECCIONES) {
    const secciones = getTema(id).secciones
    assert.equal(secciones[secciones.length - 1].titulo, 'Fuentes',
      `${id} dejó de terminar en «Fuentes»: las secciones nuevas se insertan ANTES`)
  }
})

// Esta comprobación NO se limita a los lotes: recorre el temario entero.
//
// La pasada de calidad del 07-09-2026 encontró 33 lecciones del Módulo 5 —las
// cuatro unidades de trauma redactadas en agosto— cuya cita no era una sección
// sino un bloque titulado «Para ampliar» colgado al final de la última sección
// clínica. Las fuentes estaban; lo que faltaba era que se leyeran como fuentes
// de la lección y no de ese apartado. Se movieron a su sección propia sin
// tocar ni una referencia, y esto impide que vuelva a pasar en una lección
// nueva.
test('TODA lección con material termina en una sección «Fuentes»', () => {
  const sinFuentes = []
  let revisadas = 0
  for (const m of modulos) {
    for (const u of m.unidades) {
      for (const id of u.temas) {
        const t = getTema(id)
        if (!t?.secciones?.length) continue // nodos de evaluación y bloqueados
        revisadas += 1
        if (t.secciones[t.secciones.length - 1].titulo !== 'Fuentes') sinFuentes.push(id)
      }
    }
  }
  assert.ok(revisadas > 250, `solo se revisaron ${revisadas} lecciones`)
  assert.deepEqual(sinFuentes, [],
    `${sinFuentes.length} lecciones no terminan en «Fuentes»: ${sinFuentes.join(', ')}`)
})

test('los topes del molde v2 se respetan', () => {
  for (const id of LECCIONES) {
    const t = getTema(id)
    const repaso = seccion(t, 'Repaso rápido').bloques.find((b) => b.tipo === 'lista')
    assert.ok(repaso.items.length >= 8 && repaso.items.length <= 12,
      `${id}: el repaso rápido tiene ${repaso.items.length} viñetas (el molde admite hasta 12)`)

    const orales = seccion(t, 'Preguntas de repaso oral').bloques.find((b) => b.tipo === 'lista')
    assert.ok(orales.items.length >= 6 && orales.items.length <= 10,
      `${id}: ${orales.items.length} preguntas orales (el molde admite hasta 10)`)

    const errores = seccion(t, 'Errores frecuentes')
    if (errores) {
      assert.ok(errores.bloques.every((b) => b.tipo === 'callout' && b.variante === 'alerta'),
        `${id}: los errores frecuentes van como callout de alerta`)
    }

    const kb = JSON.stringify(t).length / 1024
    assert.ok(kb < 35, `${id} pesa ${kb.toFixed(1)} kB; el tope por lección son 35 kB`)
  }
})

test('las preguntas orales son preguntas, no afirmaciones con la respuesta dentro', () => {
  for (const id of LECCIONES) {
    const orales = seccion(getTema(id), 'Preguntas de repaso oral').bloques.find((b) => b.tipo === 'lista')
    for (const q of orales.items) {
      const esPregunta = q.includes('?')

      // LA COMPROBACIÓN ESTÁ INVERTIDA A PROPÓSITO, y merece la explicación.
      //
      // La primera versión enumeraba los verbos en imperativo admitidos
      // —«Enumera», «Describe», «Explica»…— y crecía en cada lote: «Relaciona»,
      // «Formula», «Da», «Pon». Al cuarto añadido quedó claro que la lista no
      // vigilaba nada: se ampliaba mecánicamente en cuanto una consigna
      // perfectamente válida la hacía saltar, así que su único efecto real era
      // una ronda de mantenimiento por lote.
      //
      // Lo que hay que impedir es que se cuele una AFIRMACIÓN con la respuesta
      // dentro —«La adrenalina es el tratamiento y no un adyuvante.»— disfrazada
      // de pregunta. Y una afirmación en español empieza casi siempre por un
      // determinante, un pronombre o un sujeto, no por un verbo en imperativo.
      // Así que se rechaza ese arranque en lugar de enumerar todo lo permitido:
      // el criterio no hay que ampliarlo cada vez y sigue teniendo dientes.
      const arranqueDeAfirmacion = /^(El |La |Los |Las |Un |Una |Unos |Unas |Este |Esta |Estos |Estas |Ese |Esa |Su |Sus |Lo |Al |Del |En el |En la |Cuando |Si |Porque |Es |Son |Hay |Existe|Siempre |Nunca |Todo |Toda )/
      const esConsigna = !arranqueDeAfirmacion.test(q)

      assert.ok(esPregunta || esConsigna,
        `${id}: «${q}» se lee como una afirmación, no como pregunta ni consigna para responder en voz alta`)
    }
  }
})

test('NINGUNA cifra aparece por primera vez en las secciones nuevas', () => {
  // La regla del lote: el molde v2 reorganiza lo que la lección ya enseña y ya
  // cita; no añade datos clínicos. Una cifra que solo exista en el repaso o en
  // la mnemotecnia sería exactamente el dato inventado que este proyecto no
  // puede permitirse, y no daría ningún error visible.
  let revisadas = 0
  let halladas = 0
  for (const id of LECCIONES) {
    const t = getTema(id)
    // Las mnemotecnias y los «lo que más se pregunta» se insertaron DENTRO de
    // las secciones que ya existían, así que también son texto nuevo y también
    // se revisan. Sin esto, la mnemotecnia sería el hueco por el que entraría
    // una cifra sin citar, que es precisamente donde mejor se disfraza.
    const esNuevo = (b) => b.titulo === 'Regla mnemotécnica' || b.titulo === 'Lo que más se pregunta'
    const nuevas = [
      ...(t.secciones || []).filter((s) => NUEVAS.includes(s.titulo)),
      ...(t.secciones || [])
        .filter((s) => !NUEVAS.includes(s.titulo))
        .map((s) => ({ titulo: s.titulo, bloques: (s.bloques || []).filter(esNuevo) }))
        .filter((s) => s.bloques.length > 0),
    ]
    const viejas = (t.secciones || [])
      .filter((s) => !NUEVAS.includes(s.titulo))
      .map((s) => ({ ...s, bloques: (s.bloques || []).filter((b) => !esNuevo(b)) }))
    const original = `${t.resumen} ${(t.objetivos || []).join(' ')} ${textoDe(viejas.flatMap((s) => s.bloques))} `
      + `${(t.conceptosClave || []).map((c) => `${c.termino} ${c.definicion}`).join(' ')} `
      + `${(t.flashcards || []).map((f) => `${f.frente} ${f.reverso}`).join(' ')} `
      + `${(t.quiz || []).map((q) => `${q.pregunta} ${q.opciones.join(' ')} ${q.explicacion}`).join(' ')}`

    for (const s of nuevas) {
      revisadas += 1
      const enSeccion = textoDe(s.bloques)
      const cifras = [
        ...(enSeccion.match(DIGITOS) || []),
        ...(enSeccion.match(CANTIDADES) || []),
      ]
      halladas += cifras.length
      for (const cifra of cifras) {
        assert.ok(original.toLowerCase().includes(cifra.toLowerCase()),
          `${id} · «${s.titulo}»: la cifra ${cifra} no aparece en ninguna otra parte de la lección. `
          + 'El molde v2 reorganiza lo que ya se enseña; no introduce datos nuevos.')
      }
    }
  }
  // Sin esto la prueba pasaría en verde si un cambio de títulos dejara el
  // recorrido a cero secciones y no hubiera nada que revisar.
  assert.ok(revisadas >= 70, `solo se revisaron ${revisadas} secciones nuevas`)

  // QUÉ DEMUESTRA ESTA PRUEBA HOY, DICHO SIN ADORNOS.
  //
  // En el lote del 02-09-2026 encontró 4 cifras, todas en dígitos y todas en
  // `m3-ep-neurologica`, y ninguna cantidad con unidad: el lote no introdujo ni
  // una sola. Así que hoy verifica poco, y decirlo es parte de la prueba —una
  // suite que presume de vigilar dosis cuando no hay dosis que vigilar da una
  // garantía falsa, que es peor que no tenerla—.
  //
  // Se conserva porque el riesgo es de los lotes que vienen: M3 vía aérea, M4
  // farmacología y M5 trauma sí llevan dosis, tiempos y volúmenes, y ahí un
  // «repaso rápido» es el sitio perfecto para que se cuele una cifra sin citar.
  // Este es el guardarraíl esperándolos, no un certificado de lo ya hecho.
  assert.ok(halladas >= 0)
})
