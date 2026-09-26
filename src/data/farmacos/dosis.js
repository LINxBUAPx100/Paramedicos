// ============================================================
//  Entrenador de farmacología — dosis citadas y presentaciones
// ------------------------------------------------------------
//  Autorización: el dueño del producto pidió el 25-09-2026 «enseñar a
//  calcular dosis y administraciones» (PLAN-LMS §23.1, decisión 2).
//
//  Regla de este archivo: una cifra entra SOLO si se leyó en la fuente
//  primaria durante la investigación, y se transcribe con su documento,
//  edición, año, sección o página y una cita literal breve. Lo que no se
//  pudo verificar no está aquí (ver «Pendientes» en PLAN-TECNICO-FASES §D).
//  tests/farmacos.test.mjs rechaza cualquier entrada incompleta.
//
//  Las diluciones de las infusiones son DATOS DEL EJERCICIO, no una
//  indicación: la dilución estándar la fija el protocolo de cada servicio,
//  y el enunciado del caso lo dice.
// ============================================================

const AHA_ALS = {
  documento: 'Part 9: Adult Advanced Life Support. 2025 AHA Guidelines for CPR and ECC. Circulation 2025;152(suppl 2):S538-S577',
  edicion: 'AHA 2025',
  anio: 2025,
  url: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000001376',
}

const aha = (seccion, pagina) => ({ ...AHA_ALS, seccion, pagina })

// Opciones de administración. La correcta repite la fuente; las demás son
// errores típicos, y su «porque» explica por qué no.
const op = (texto, porque, correcta = false) => ({ texto, porque, correcta })

const DOSIS_ALS = {
  adrenalina: [
    {
      id: 'paro-adulto',
      indicacion: 'Paro cardiaco',
      escenario: 'Paro cardiaco con RCP en curso y acceso IV permeable',
      poblacion: 'adulto',
      via: 'IV',
      dosisTexto: '1 mg IV/IO cada 3-5 minutos.',
      repeticion: 'Repetir 1 mg cada 3-5 minutos mientras dure el paro. En asistolia/AESP, lo antes posible.',
      calculo: { tipo: 'fija', valor: 1, unidadMasa: 'mg', presentacion: '1mg-1ml' },
      administracion: {
        pregunta: '¿Cada cuánto se repite durante el paro?',
        opciones: [
          op('Cada 3-5 minutos', 'Correcto: 1 mg cada 3-5 minutos según el algoritmo de paro del adulto.', true),
          op('Cada minuto', 'Demasiado frecuente: el algoritmo indica cada 3-5 minutos.'),
          op('Cada 10 minutos', 'Demasiado espaciado: el algoritmo indica cada 3-5 minutos.'),
          op('Una sola dosis', 'En paro se repite mientras dure la reanimación.'),
        ],
      },
      fuente: aha('Recomendaciones de vasopresores (rec. 2, COR 2a, LOE B-R); Figura 2, Adult Cardiac Arrest Algorithm', 'S548, S551'),
      cita: 'It is reasonable to administer epinephrine (1 mg) every 3 to 5 min for adult patients in cardiac arrest.',
    },
    {
      id: 'bradicardia-infusion',
      indicacion: 'Bradicardia sintomática refractaria a atropina',
      escenario: 'Bradicardia sintomática que no respondió a atropina; se decide infusión de adrenalina',
      poblacion: 'adulto',
      via: 'IV',
      dosisTexto: 'Infusión de 2-10 mcg/min, titulada según respuesta.',
      repeticion: 'Titular entre 2 y 10 mcg/min según la respuesta del paciente.',
      calculo: { tipo: 'infusionFija', valor: 2, dilucion: { mg: 1, ml: 250 } },
      fuente: aha('Figura 8, Adult Bradycardia With a Pulse Algorithm, Doses/Details', 'S575'),
      cita: 'Epinephrine IV infusion: 2-10 mcg per minute infusion. Titrate to patient response.',
    },
  ],
  atropina: [
    {
      id: 'bradicardia-adulto',
      indicacion: 'Bradicardia sintomática',
      escenario: 'Bradicardia sintomática con compromiso hemodinámico',
      poblacion: 'adulto',
      via: 'IV',
      dosisTexto: '1 mg IV en bolo; repetir cada 3-5 minutos; dosis total máxima 3 mg.',
      repeticion: 'Repetir cada 3-5 minutos hasta un máximo total de 3 mg.',
      calculo: { tipo: 'fija', valor: 1, unidadMasa: 'mg', presentacion: '1mg-1ml' },
      administracion: {
        pregunta: '¿Cuál es la dosis TOTAL máxima?',
        opciones: [
          op('3 mg', 'Correcto: tres dosis de 1 mg, cada 3-5 minutos.', true),
          op('1 mg', 'Esa es la dosis inicial; se puede repetir hasta 3 mg.'),
          op('0.5 mg', 'No es la dosis de AHA 2025, que indica 1 mg por dosis.'),
          op('Sin máximo', 'Tiene tope: 3 mg en total.'),
        ],
      },
      nota: 'El Compendio Nacional de Insumos 2025 todavía da 0.5-1 mg con máximo de 2 mg; el entrenador sigue AHA 2025, que es la referencia que exige el mandato del proyecto (CLAUDE.md §9.2).',
      fuente: aha('Figura 8, Adult Bradycardia With a Pulse Algorithm, Doses/Details; rec. 2 (COR 2a, LOE B-NR)', 'S573, S575'),
      cita: 'Atropine IV dose: First dose: 1 mg bolus. Repeat every 3-5 minutes. Maximum total dose: 3 mg.',
    },
  ],
  amiodarona: [
    {
      id: 'paro-adulto',
      indicacion: 'FV o TV sin pulso refractaria a la desfibrilación',
      escenario: 'Fibrilación ventricular que persiste tras las descargas',
      poblacion: 'adulto',
      via: 'IV',
      dosisTexto: 'Primera dosis 300 mg en bolo; segunda dosis 150 mg.',
      repeticion: 'Si persiste, segunda dosis de 150 mg. Es alternativa a la lidocaína, no se dan juntas.',
      calculo: { tipo: 'fija', valor: 300, unidadMasa: 'mg', presentacion: '150mg-3ml' },
      administracion: {
        pregunta: 'Si la FV persiste, ¿cuál es la segunda dosis?',
        opciones: [
          op('150 mg', 'Correcto: 300 mg la primera y 150 mg la segunda.', true),
          op('300 mg de nuevo', 'La segunda dosis es la mitad: 150 mg.'),
          op('450 mg', 'No existe esa dosis en el algoritmo.'),
          op('Lidocaína además de amiodarona', 'Son alternativas: el algoritmo dice amiodarona O lidocaína.'),
        ],
      },
      fuente: aha('Figura 2, Adult Cardiac Arrest Algorithm, Drug Therapy; antiarrítmicos en paro (rec. 1, COR 2b, LOE B-R)', 'S550-S551'),
      cita: 'Amiodarone IV/IO dose: First dose: 300 mg bolus Second dose: 150 mg',
    },
  ],
  lidocaina: [
    {
      id: 'paro-adulto',
      indicacion: 'FV o TV sin pulso refractaria a la desfibrilación',
      escenario: 'Fibrilación ventricular refractaria; el equipo elige lidocaína y calcula el extremo inferior del rango (1 mg/kg)',
      poblacion: 'adulto',
      via: 'IV',
      dosisTexto: 'Primera dosis 1-1.5 mg/kg; segunda dosis 0.5-0.75 mg/kg.',
      repeticion: 'Segunda dosis 0.5-0.75 mg/kg. Es alternativa a la amiodarona.',
      calculo: { tipo: 'porKg', valor: 1, unidadMasa: 'mg', presentacion: '100mg-5ml' },
      fuente: aha('Figura 2, Adult Cardiac Arrest Algorithm, Drug Therapy', 'S551'),
      cita: 'Lidocaine IV/IO dose: First dose: 1-1.5 mg/kg Second dose: 0.5-0.75 mg/kg',
    },
  ],
  adenosina: [
    {
      id: 'tsv-adulto',
      indicacion: 'Taquicardia supraventricular regular de complejo estrecho',
      escenario: 'Taquicardia regular de complejo estrecho, estable, que no cedió con maniobras vagales',
      poblacion: 'adulto',
      via: 'IV',
      dosisTexto: 'Primera dosis 6 mg IV rápido seguido de bolo de solución salina; segunda dosis 12 mg si es necesario.',
      repeticion: 'Si no convierte, 12 mg.',
      calculo: { tipo: 'fija', valor: 6, unidadMasa: 'mg', presentacion: '6mg-2ml' },
      administracion: {
        pregunta: '¿Cómo se administra?',
        opciones: [
          op('Bolo IV rápido seguido de bolo de solución salina', 'Correcto: bolo IV rápido y lavado con solución salina, como indica el algoritmo. Es un antiarrítmico de acción muy breve.', true),
          op('Infusión lenta en 10 minutos', 'El algoritmo indica bolo IV rápido, no infusión: su acción es muy breve.'),
          op('Intramuscular', 'No es una vía de este fármaco en la indicación.'),
          op('Bolo lento sin lavado', 'El algoritmo pide bolo RÁPIDO seguido de lavado con solución salina.'),
        ],
      },
      fuente: aha('Figura 6, Adult Tachyarrhythmia With a Pulse Algorithm, Doses/Details; rec. 2 (COR 1, LOE B-R)', 'S563, S566'),
      cita: 'Adenosine IV dose: First dose: 6 mg rapid IV push; follow with NS flush. Second dose: 12 mg if required.',
    },
  ],
  dopamina: [
    {
      id: 'bradicardia-infusion',
      indicacion: 'Bradicardia sintomática refractaria a atropina',
      escenario: 'Bradicardia sintomática que no respondió a atropina; se decide infusión de dopamina',
      poblacion: 'adulto',
      via: 'IV',
      dosisTexto: 'Infusión de 5-20 mcg/kg/min, titulada según respuesta; retirar lentamente.',
      repeticion: 'Titular entre 5 y 20 mcg/kg/min; retirar lentamente.',
      calculo: { tipo: 'infusionPorKg', valor: 5, dilucion: { mg: 400, ml: 250 } },
      fuente: aha('Figura 8, Adult Bradycardia With a Pulse Algorithm, Doses/Details', 'S575'),
      cita: 'Dopamine IV infusion: Usual infusion rate is 5-20 mcg/kg per minute. Titrate to patient response; taper slowly.',
    },
  ],
}


import { DOSIS_URGENCIAS, PRESENTACIONES as PRESENTACIONES_BASE } from './dosisUrgencias.js'
import { DOSIS_AMPLIACION, PRESENTACIONES_AMPLIACION } from './dosisAmpliacion.js'

// Presentaciones de las dos rondas, por ficha.
export const PRESENTACIONES = { ...PRESENTACIONES_BASE }
for (const [id, lista] of Object.entries(PRESENTACIONES_AMPLIACION)) {
  PRESENTACIONES[id] = [...(PRESENTACIONES[id] || []), ...lista]
}

// Todas las dosis por ficha: AHA 2025 primero, luego el resto.
// Una clave puede repetirse con sufijo «#n» (se añadió en rondas distintas):
// se agrupa por la ficha real, sin perder ninguna entrada.
const FUENTES = [DOSIS_ALS, DOSIS_URGENCIAS, DOSIS_AMPLIACION]
export const DOSIS = {}
for (const fuente of FUENTES) {
  for (const [clave, entradas] of Object.entries(fuente)) {
    const id = clave.split('#')[0]
    ;(DOSIS[id] ||= []).push(...entradas)
  }
}
