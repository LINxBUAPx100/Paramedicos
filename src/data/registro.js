// ============================================================
//  REGISTRO CENTRAL DEL TEMARIO — el ÚNICO lugar donde defines y ORDENAS.
// ------------------------------------------------------------
//  · Reordenar fases  → cambia los números de `orden` (o mueve las líneas).
//  · Añadir una fase   → una línea aquí: { orden, fase, extra? }.
//  La numeración visible (Fase 1, tema 1.1…) se CALCULA sola en index.js,
//  así que NO hay que renumerar nada a mano al reordenar.
//
//  IMPORTANTE: el `id` de cada fase/tema (dentro de su archivo) es su
//  IDENTIDAD ESTABLE — lo usan las URLs y el progreso guardado del alumno.
//  NO lo cambies al reordenar (ahí es donde entra `orden`, que sí es el orden).
//
//  Este modelo (id estable + campo `orden`) es el mismo que tendrá Firestore,
//  así que la futura migración a base de datos es conceptualmente copiar-pegar.
// ============================================================
import { fase1 } from './fase1.js'
import { fase2 } from './fase2.js'
import { fase3 } from './fase3.js'
import { fase4 } from './fase4.js'
import { fase5 } from './fase5.js'
import { fase6 } from './fase6.js'
import { fase7 } from './fase7.js'
import { extraFase1 } from './extraFase1.js'
import { extraFase2 } from './extraFase2.js'
import { extraFase3 } from './extraFase3.js'
import { extraFase4 } from './extraFase4.js'
import { extraFase5 } from './extraFase5.js'

// `orden` define la posición; `fase` es el contenido base; `extra` (opcional)
// son temas ampliados que se anexan al final de esa fase.
export const REGISTRO = [
  { orden: 1, fase: fase1, extra: extraFase1 },
  { orden: 2, fase: fase2, extra: extraFase2 },
  { orden: 3, fase: fase3, extra: extraFase3 },
  { orden: 4, fase: fase4, extra: extraFase4 },
  { orden: 5, fase: fase5, extra: extraFase5 },
  { orden: 6, fase: fase6 },
  { orden: 7, fase: fase7 },
]
