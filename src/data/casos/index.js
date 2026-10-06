// Casos del modo llamada (PTEM Pulso).
//
// Un caso es contenido clínico: lo valida la academia, con las mismas reglas
// que una lección (fuentes con edición, alcance del plan, estado editorial).
// El formato y el validador están en src/lib/casosModelo.js.
//
// Desde el 05-10-2026 hay BORRADORES redactados por Claude a petición del
// usuario, derivados solo de la prosa de las lecciones que citan, con signos
// vitales que reaccionan a cada decisión. Mientras sean `borrador`, el alumno
// no los ve: casosParaElAlumno solo deja pasar `validado` y `publicado`. El
// personal los ve marcados para revisarlos, y puede adaptarlos desde
// panel › Escenarios, donde la academia también escribe los suyos.
import M1 from './m1-soporte-vital.js'
import M1M6 from './m1-m6-primer-respondiente.js'
import M4A from './m4-urgencias-a.js'
import M4M6B from './m4-m6-urgencias-b.js'
import M5 from './m5-trauma.js'

export const CASOS = [...M1, ...M1M6, ...M4A, ...M4M6B, ...M5]
