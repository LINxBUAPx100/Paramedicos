// ============================================================
//  Habilidades de cálculo — lecciones cortas con práctica guiada
// ------------------------------------------------------------
//  Cada habilidad enseña UNA operación: explicación, fórmula, ejemplo
//  resuelto y un generador que produce ejercicios nuevos paso a paso.
//
//  Los ejercicios de habilidad usan «soluciones de práctica» con números
//  redondos: enseñan la aritmética, no una indicación. Los casos con
//  fármacos reales y dosis citadas viven en `casosFarmacologia.js`.
// ============================================================
import {
  convertirMasa, concentracion, dosisPorPeso, volumenAExtraer, mlHoraPorPeso,
  mlHoraPorTiempo, gotasPorMinuto, porcentajeAMgMl, proporcionAMgMl, fmt, redondear,
} from './calculoDosis.js'

const elegir = (rng, arr) => arr[Math.floor(rng() * arr.length)]

// Paso de un ejercicio. `ctx` alimenta el diagnóstico de errores.
function paso(id, pregunta, respuesta, unidad, formula, resolucion, ctx = {}) {
  return { id, pregunta, respuesta: redondear(respuesta, 4), unidad, formula, resolucion, ctx }
}

export const HABILIDADES = [
  {
    id: 'conversiones',
    titulo: 'Convertir unidades de masa',
    nivel: 1,
    explicacion: [
      'Casi todos los errores graves de medicación son errores de unidades. Antes de calcular, todas las cantidades tienen que estar en la MISMA unidad.',
      'La escalera es de mil en mil: 1 g = 1000 mg y 1 mg = 1000 mcg. Para bajar un peldaño (de g a mg, de mg a mcg) se multiplica por 1000; para subirlo se divide entre 1000.',
      'Escribe «mcg» y no «µg»: la µ manuscrita se confunde con una «m» y convierte microgramos en miligramos.',
    ],
    formula: 'g ×1000 → mg ×1000 → mcg   ·   mcg ÷1000 → mg ÷1000 → g',
    ejemplo: {
      enunciado: 'Convierte 0.3 mg a microgramos.',
      solucion: '0.3 mg × 1000 = 300 mcg. Se multiplica porque bajamos de mg a mcg.',
    },
    generar(rng) {
      const casos = [
        () => { const v = elegir(rng, [0.1, 0.2, 0.25, 0.3, 0.5, 1.5, 2]); return ['mg', 'mcg', v] },
        () => { const v = elegir(rng, [50, 100, 200, 250, 400, 600]); return ['mcg', 'mg', v] },
        () => { const v = elegir(rng, [0.5, 1, 1.5, 2, 4]); return ['g', 'mg', v] },
        () => { const v = elegir(rng, [250, 500, 1500, 2000]); return ['mg', 'g', v] },
      ]
      const [de, a, v] = elegir(rng, casos)()
      const r = convertirMasa(v, de, a)
      const op = r > v ? `× 1000` : `÷ 1000`
      return {
        enunciado: `Convierte ${fmt(v, 3)} ${de} a ${a}.`,
        pasos: [paso('r', `¿Cuántos ${a} son?`, r, a, `${de} → ${a}: ${op}`, `${fmt(v, 3)} ${de} ${op} = ${fmt(r, 4)} ${a}`,
          { invertido: r > v ? v / 1000 : v * 1000 })],
      }
    },
  },
  {
    id: 'porcentajes',
    titulo: 'Porcentajes y proporciones',
    nivel: 1,
    explicacion: [
      'Muchas ampolletas no dicen «mg/mL» sino un porcentaje o una proporción. Hay que traducirlos antes de calcular.',
      'Porcentaje peso/volumen: gramos por cada 100 mL. Por eso 1 % = 1 g/100 mL = 10 mg/mL. Una solución al 2 % tiene 20 mg/mL; una al 50 %, 500 mg/mL (0.5 g/mL).',
      'Proporción 1:X: 1 g disuelto en X mL. 1:1000 = 1 g/1000 mL = 1 mg/mL; 1:10 000 = 0.1 mg/mL. Cuanto mayor es X, más diluida está.',
    ],
    formula: 'mg/mL = % × 10   ·   mg/mL = 1000 ÷ X  (para 1:X)',
    ejemplo: {
      enunciado: 'Una solución al 50 % en una jeringa de 50 mL: ¿cuántos gramos contiene?',
      solucion: '50 % = 50 g/100 mL = 0.5 g/mL. 0.5 g/mL × 50 mL = 25 g.',
    },
    generar(rng) {
      if (rng() < 0.5) {
        const pct = elegir(rng, [0.9, 1, 2, 5, 10, 20, 50])
        return {
          enunciado: `Una solución de práctica está al ${fmt(pct, 1)} %. ¿Cuál es su concentración?`,
          pasos: [paso('r', '¿Cuántos mg hay en cada mL?', porcentajeAMgMl(pct), 'mg/mL', 'mg/mL = % × 10', `${fmt(pct, 1)} × 10 = ${fmt(porcentajeAMgMl(pct))} mg/mL`)],
        }
      }
      const x = elegir(rng, [1000, 10000, 100000])
      return {
        enunciado: `Una solución de práctica viene en proporción 1:${x.toLocaleString('es-MX')}. ¿Cuál es su concentración?`,
        pasos: [paso('r', '¿Cuántos mg hay en cada mL?', proporcionAMgMl(x), 'mg/mL', 'mg/mL = 1000 ÷ X', `1000 ÷ ${x.toLocaleString('es-MX')} = ${fmt(proporcionAMgMl(x), 4)} mg/mL`)],
      }
    },
  },
  {
    id: 'volumen',
    titulo: 'Cuántos mL extraer',
    nivel: 2,
    explicacion: [
      'La pregunta de todos los días: me piden una dosis en mg y la ampolleta trae cierta cantidad en cierto volumen. ¿Cuántos mL cargo?',
      'Primero se calcula la concentración (mg por cada mL). Después se divide lo que necesito entre lo que trae cada mL. Lo que se busca va ARRIBA.',
      'Comprueba el resultado con sentido común: si la dosis es la mitad de lo que trae la ampolleta, cargas la mitad de su volumen.',
    ],
    formula: 'concentración = mg ÷ mL de la ampolleta   ·   mL = dosis ÷ concentración',
    ejemplo: {
      enunciado: 'Una ampolleta trae 150 mg en 3 mL y necesitas 75 mg.',
      solucion: 'Concentración: 150 ÷ 3 = 50 mg/mL. Volumen: 75 ÷ 50 = 1.5 mL.',
    },
    generar(rng) {
      const [mg, ml] = elegir(rng, [[150, 3], [10, 2], [100, 5], [4, 4], [50, 10], [500, 5], [30, 1], [5, 1]])
      const c = concentracion(mg, ml)
      const fraccion = elegir(rng, [0.25, 0.5, 0.75, 1, 1.5, 2])
      const dosis = redondear(mg * fraccion, 3)
      const v = volumenAExtraer(dosis, c)
      return {
        enunciado: `Una ampolleta de práctica trae ${fmt(mg)} mg en ${fmt(ml)} mL. Necesitas administrar ${fmt(dosis, 3)} mg.`,
        pasos: [
          paso('c', '¿Cuál es la concentración?', c, 'mg/mL', 'mg ÷ mL', `${fmt(mg)} ÷ ${fmt(ml)} = ${fmt(c, 3)} mg/mL`, { invertido: ml / mg }),
          paso('v', '¿Cuántos mL cargas?', v, 'mL', 'dosis ÷ concentración', `${fmt(dosis, 3)} ÷ ${fmt(c, 3)} = ${fmt(v, 3)} mL`, { invertido: c / dosis }),
        ],
      }
    },
  },
  {
    id: 'peso',
    titulo: 'Dosis por kilogramo y dosis máxima',
    nivel: 2,
    explicacion: [
      'En pediatría y en muchos fármacos de adulto la dosis se indica por kilogramo: dosis total = dosis por kg × peso.',
      'Muchas dosis por peso tienen un TOPE. Si el resultado lo supera, se administra el tope: a partir de cierto peso, el niño recibe la dosis de adulto.',
      'El peso tiene que estar en kilogramos. Si te dan libras, divide entre 2.2.',
    ],
    formula: 'dosis = (dosis/kg) × kg   ·   si dosis > máximo → máximo',
    ejemplo: {
      enunciado: 'Dosis de práctica 0.01 mg/kg, máximo 0.5 mg, paciente de 20 kg.',
      solucion: '0.01 × 20 = 0.2 mg. No supera 0.5 mg, así que la dosis es 0.2 mg. Con 60 kg saldría 0.6 mg y se darían 0.5 mg.',
    },
    generar(rng) {
      const [porKg, max] = elegir(rng, [[0.01, 0.5], [0.1, 6], [0.02, 0.5], [1, 100], [5, 300], [0.1, 10], [2, null]])
      const peso = elegir(rng, [8, 12, 15, 18, 20, 25, 30, 40, 55, 70])
      const { dosis, bruta, topada } = dosisPorPeso(porKg, peso, max)
      const pasos = [
        paso('b', '¿Cuánto da el cálculo por peso?', bruta, 'mg', '(mg/kg) × kg', `${fmt(porKg, 3)} × ${peso} = ${fmt(bruta, 3)} mg`, { peso }),
      ]
      if (max != null) {
        pasos.push(paso('d', '¿Qué dosis administras?', dosis, 'mg', 'compara con el máximo',
          topada ? `${fmt(bruta, 3)} mg supera el máximo de ${fmt(max, 3)} mg → se administra ${fmt(max, 3)} mg` : `${fmt(bruta, 3)} mg no supera el máximo de ${fmt(max, 3)} mg → ${fmt(dosis, 3)} mg`,
          { peso, sinTope: topada ? bruta : null }))
      }
      return {
        enunciado: `Dosis de práctica: ${fmt(porKg, 3)} mg/kg${max != null ? `, máximo ${fmt(max, 3)} mg por dosis` : ''}. Paciente de ${peso} kg.`,
        pasos,
      }
    },
  },
  {
    id: 'dilucion',
    titulo: 'Preparar una dilución',
    nivel: 3,
    explicacion: [
      'Para una infusión, el fármaco se diluye en una bolsa o jeringa. La concentración final es la cantidad total de fármaco entre el volumen total.',
      'Las infusiones de vasoactivos se programan en microgramos: convierte los mg de la ampolleta a mcg antes de dividir.',
      'Si la ampolleta se añade a la bolsa, el volumen total cambia un poco; en los ejercicios se toma el volumen de la bolsa, que es como se etiqueta en la práctica habitual. El protocolo del servicio fija la dilución estándar.',
    ],
    formula: 'mcg/mL = (mg × 1000) ÷ mL de la dilución',
    ejemplo: {
      enunciado: '4 mg diluidos en 250 mL.',
      solucion: '4 mg × 1000 = 4000 mcg. 4000 ÷ 250 = 16 mcg/mL.',
    },
    generar(rng) {
      const [mg, ml] = elegir(rng, [[4, 250], [8, 250], [4, 100], [1, 250], [400, 250], [250, 250], [16, 250], [2, 50]])
      const mcg = convertirMasa(mg, 'mg', 'mcg')
      const c = mcg / ml
      return {
        enunciado: `Diluyes ${fmt(mg)} mg de un fármaco de práctica en ${ml} mL.`,
        pasos: [
          paso('m', '¿Cuántos mcg hay en total?', mcg, 'mcg', 'mg × 1000', `${fmt(mg)} × 1000 = ${fmt(mcg)} mcg`),
          paso('c', '¿Cuál es la concentración final?', c, 'mcg/mL', 'mcg ÷ mL', `${fmt(mcg)} ÷ ${ml} = ${fmt(c, 3)} mcg/mL`, { invertido: ml / mcg }),
        ],
      }
    },
  },
  {
    id: 'infusion',
    titulo: 'Velocidad de infusión en mL/h',
    nivel: 3,
    explicacion: [
      'La bomba se programa en mL/h, pero la indicación llega en mcg/kg/min. Hay que pasar de una a otra en tres movimientos: por el peso, por 60 minutos y entre la concentración.',
      'Primero los mcg por minuto que necesita el paciente (dosis × peso). Luego por hora (× 60). Por último, cuántos mL contienen esa cantidad (÷ concentración).',
      'El error clásico es olvidar el × 60: la bomba correría 60 veces más lenta de lo indicado.',
    ],
    formula: 'mL/h = (mcg/kg/min × kg × 60) ÷ (mcg/mL)',
    ejemplo: {
      enunciado: '0.1 mcg/kg/min, paciente de 70 kg, dilución de 16 mcg/mL.',
      solucion: '0.1 × 70 = 7 mcg/min. 7 × 60 = 420 mcg/h. 420 ÷ 16 = 26.25 mL/h.',
    },
    generar(rng) {
      // Pares dosis/concentración con órdenes de magnitud coherentes: un
      // rango de décimas de mcg/kg/min con diluciones de decenas de mcg/mL, y
      // uno de unidades con diluciones de miles.
      const [dosis, c] = elegir(rng, [[0.05, 16], [0.1, 16], [0.2, 32], [0.5, 40], [2, 1600], [5, 1600], [10, 1600], [5, 1000]])
      const peso = elegir(rng, [50, 60, 70, 80, 90])
      const porMin = dosis * peso
      const porHora = porMin * 60
      const mlh = mlHoraPorPeso(dosis, peso, c)
      return {
        enunciado: `Indicación de práctica: ${fmt(dosis, 3)} mcg/kg/min. Paciente de ${peso} kg. Dilución de ${fmt(c)} mcg/mL.`,
        pasos: [
          paso('a', '¿Cuántos mcg por minuto?', porMin, 'mcg/min', 'mcg/kg/min × kg', `${fmt(dosis, 3)} × ${peso} = ${fmt(porMin, 3)} mcg/min`, { peso }),
          paso('b', '¿Cuántos mcg por hora?', porHora, 'mcg/h', '× 60', `${fmt(porMin, 3)} × 60 = ${fmt(porHora, 3)} mcg/h`),
          paso('c', '¿A cuántos mL/h programas la bomba?', mlh, 'mL/h', 'mcg/h ÷ mcg/mL', `${fmt(porHora, 3)} ÷ ${fmt(c)} = ${fmt(mlh, 2)} mL/h`, { peso, invertido: c / porHora }),
        ],
      }
    },
  },
  {
    id: 'tiempo',
    titulo: 'Pasar un volumen en un tiempo',
    nivel: 2,
    explicacion: [
      'Algunas dosis se indican «en 10 minutos» o «en 8 horas». La bomba necesita mL/h.',
      'Convierte el tiempo a horas (minutos ÷ 60) y divide el volumen entre ese tiempo. Pasar 100 mL en 10 minutos equivale a 600 mL/h.',
    ],
    formula: 'mL/h = mL ÷ (minutos ÷ 60)',
    ejemplo: {
      enunciado: '100 mL en 10 minutos.',
      solucion: '10 min ÷ 60 = 0.1667 h. 100 ÷ 0.1667 = 600 mL/h.',
    },
    generar(rng) {
      const [ml, min] = elegir(rng, [[100, 10], [100, 20], [250, 30], [500, 60], [50, 15], [100, 480], [1000, 240]])
      const r = mlHoraPorTiempo(ml, min)
      return {
        enunciado: `Tienes que pasar ${ml} mL en ${min} minutos con bomba de infusión.`,
        pasos: [paso('r', '¿A cuántos mL/h programas?', r, 'mL/h', 'mL ÷ (min ÷ 60)', `${ml} ÷ (${min} ÷ 60) = ${fmt(r, 2)} mL/h`)],
      }
    },
  },
  {
    id: 'goteo',
    titulo: 'Goteo por gravedad',
    nivel: 2,
    explicacion: [
      'Sin bomba, la velocidad se regula contando gotas. El dato clave es el FACTOR DE GOTEO del equipo, impreso en su empaque: cuántas gotas forman 1 mL.',
      'Normogoteros y macrogoteros suelen dar 10, 15 o 20 gotas/mL según el fabricante; el microgotero da 60. No lo supongas: léelo.',
      'Con microgotero (60 gotas/mL), las gotas por minuto coinciden con los mL por hora.',
    ],
    formula: 'gotas/min = (mL × gotas/mL) ÷ minutos',
    ejemplo: {
      enunciado: '500 mL en 4 horas con equipo de 20 gotas/mL.',
      solucion: '4 h = 240 min. (500 × 20) ÷ 240 = 41.7 → unas 42 gotas/min.',
    },
    generar(rng) {
      const ml = elegir(rng, [250, 500, 1000])
      const horas = elegir(rng, [1, 2, 4, 6, 8])
      const factor = elegir(rng, [10, 15, 20, 60])
      const min = horas * 60
      const r = gotasPorMinuto(ml, factor, min)
      return {
        enunciado: `Debes pasar ${ml} mL en ${horas} h con un equipo de ${factor} gotas/mL.`,
        pasos: [
          paso('t', '¿Cuántos minutos son?', min, 'min', 'h × 60', `${horas} × 60 = ${min} min`),
          paso('g', '¿Cuántas gotas por minuto?', r, 'gotas/min', '(mL × factor) ÷ min', `(${ml} × ${factor}) ÷ ${min} = ${fmt(r, 1)} gotas/min`, { factor, tolerancia: 0.03 }),
        ],
      }
    },
  },
]

export const HABILIDAD_POR_ID = Object.fromEntries(HABILIDADES.map((h) => [h.id, h]))
