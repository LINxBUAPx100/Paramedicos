# Datos del temario — cómo añadir y ordenar

La **numeración es automática**. Nunca escribas `numero: 3` ni `numero: '3.1'` a mano:
se calcula desde la posición en [`registro.js`](./registro.js). Reordenar = cambiar
el orden ahí; los números (Fase 1, tema 1.1…) se recalculan solos.

Regla de oro:
- **`id`** = identidad estable → va en las URLs (`/tema/:id`) y en el progreso
  guardado del alumno. **No lo cambies nunca** una vez publicado, aunque reordenes.
- **`orden`** = posición visible. Eso es lo que cambias para reordenar.

## Reordenar fases
En [`registro.js`](./registro.js), cambia los valores de `orden` (o mueve las líneas):
```js
{ orden: 1, fase: fase2 },   // ahora fase2 se muestra como "Fase 1"
{ orden: 2, fase: fase1 },
```
Las URLs y el progreso siguen intactos porque dependen del `id`, no del número.

## Reordenar / insertar un tema
Mueve o inserta el objeto en el array `temas` de su archivo de fase.
Los `x.y` se recalculan según la nueva posición.

## Añadir una fase
1. Crea `faseN.js`:
   ```js
   import { crearFase, crearTema } from './crear.js'
   export const fase8 = crearFase({
     id: 'fase-operaciones',           // id estable (no tiene que llevar número)
     titulo: 'Operaciones Especiales',
     subtitulo: 'Nivel avanzado',
     descripcion: '…',
     color: '#e11d2a',
     temas: [
       crearTema({ id: 'rescate-acuatico', titulo: 'Rescate acuático', /* … */ }),
     ],
   })
   ```
2. Regístrala en [`registro.js`](./registro.js): un import + una línea
   `{ orden: 8, fase: fase8 }`.

Eso es todo — el home, el menú, las estadísticas, el examen y la búsqueda se
actualizan solos porque todos derivan de `fases` en [`index.js`](./index.js).
