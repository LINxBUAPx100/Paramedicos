# Contenido de los temas del plan oficial

Un archivo por módulo. Cada uno exporta un objeto **indexado por `temaId`** con
el material de ese tema; `scripts/gen-plan-rescate.mjs` lo mezcla sobre la
estructura de `scripts/seed/plan-rescate.json` al generar `planRescate.js`.

La separación es deliberada:

- **La semilla manda en la ESTRUCTURA** — qué módulos, qué unidades, qué temas,
  con qué título y en qué orden. Se transcribe del PDF y no se toca desde aquí.
- **Estos archivos mandan en el MATERIAL** — secciones, conceptos, flashcards,
  quiz y actividades.

Si un `temaId` no existe en la semilla, la generación **falla**: así un tema
renombrado en el plan no deja contenido huérfano apuntando a la nada.

## Ruta real del dato (quién manda sobre cada campo)

```
scripts/seed/plan-rescate.json     ESTRUCTURA: módulos, unidades, temas,
        │                          títulos oficiales, semanas, horas
        │
src/data/contenido/*.js            MATERIAL: secciones, conceptos, flashcards,
        │  ├─ revisiones.js         quiz, actividades
        │  ├─ bloqueos.js          FICHA EDITORIAL: estado, procedencia, fuentes
        │  ├─ evaluaciones.js      CONFIGURACIÓN de exámenes y prácticas
        │  ├─ titulosVisibles.js   TÍTULO VISIBLE corregido (el oficial se conserva)
        │  └─ reutilizado.js       LEGADO ARCHIVADO — no se publica
        │
scripts/gen-plan-rescate.mjs       une las tres cosas + calcula alcanceExamen
        ▼
src/data/planRescate.js            (generado, no editar a mano)
        ▼
src/data/index.js                  API: modulos, todosLosTemas, getTema…
        ▼
ContenidoContext                   resolutor: Firestore de la academia, o este bundle
        ▼
TemaPage / ModuloPage / exámenes
```

## Contenido publicable vs. legado

`reutilizado.js` contiene el corpus del temario ANTERIOR redistribuido sobre los
287 temas oficiales por coincidencia de palabras. **Ya no alimenta el contenido
del alumno.** Se conserva y se exporta aparte (`BORRADORES_LEGADO`) por dos
razones: sirve de punto de partida a quien reescriba un tema, y permite que una
prueba compruebe que nada de ahí se publicó sin aprobarse.

Solo llega al alumno lo que está en un archivo redactado explícitamente y
declarado en `REDACTADO` dentro de `index.js`.

## Estado editorial

Cada tema declara su ficha, inline (`revision: {...}` junto al tema) en los
archivos nuevos o en `revisiones.js` para el material anterior:

| Estado | Qué significa | Qué ve el alumno |
|---|---|---|
| `vacio` | Sin material redactado | «Contenido aún no disponible» |
| `borrador` | Escrito, sin fuentes precisas ni revisión | El material + aviso «Contenido en revisión» |
| `en_revision` | Redactado y con fuentes trazables | El material + aviso «Contenido en revisión» |
| `validado` / `publicado` | Firmado por un docente | El material, sin aviso |
| `bloqueado_por_decision` | El plan no da alcance | La pregunta abierta a la academia |

`validado` y `publicado` **no se alcanzan por generación**: exigen nombre de
revisor, fecha y fuentes, y el generador aborta si una ficha los declara sin
ellos. Ver `src/lib/estadoEditorial.js`.

## Verificación

```bash
npm run gen:plan   # regenera planRescate.js y valida las fichas
npm run gen:nav
npm test           # incluye los controles de §12 del mandato
npm run build
npm run inventario -- --md
npm run matriz     # docs/MATRIZ-DECISIONES.md para revisión docente
```

## Forma de cada tema

```js
'm1-pab-dea': {
  icono: '⚡',
  duracion: '15 min',
  resumen: 'Una o dos frases sobre qué resuelve el tema.',
  objetivos: ['Verbo en infinitivo + resultado observable.'],
  secciones: [{ titulo: '…', bloques: [ …ver TIPOS_BLOQUE… ] }],
  conceptosClave: [{ termino: '…', definicion: '…' }],
  flashcards: [{ frente: '…', reverso: '…' }],
  quiz: [{ pregunta: '…', opciones: ['a','b','c','d'], correcta: 0, explicacion: '…' }],
  actividades: { ordenar: {…}, completar: [...], preguntas: [...] },
}
```

Bloques disponibles (`src/lib/temaContenidoModelo.js` → `TIPOS_BLOQUE`):
`p`, `h3`, `lista`, `pasos`, `tabla`, `callout`, `formula`, `imagen`,
`diagrama`, `fuentes`. Variantes de `callout`: `clave`, `clinico`, `alerta`,
`dosis`.

## Regla clínica

Este es material de formación paramédica. **Toda cifra —dosis, tiempos,
profundidades, frecuencias— debe poder rastrearse a la bibliografía que el
propio plan declara** (AHA/ACLS 2020, PHTLS 9, PALS, NALS, AMLS, NOM-034,
Tortora, Vademécum). Cuando un dato dependa del protocolo local o de una
edición concreta, se dice en el texto en vez de fijar un número que parezca
universal.

Nada de lo que se escriba aquí sustituye la revisión del cuerpo docente de la
academia antes de publicarlo a los alumnos.

## Biblioteca de referencia

La academia comparte una carpeta de Drive («B. (BIBLIOTECA)») con las obras que
sostienen el temario. `scripts/biblioteca.mjs` la cataloga y descarga la que se
necesite al directorio temporal — **los PDF no se versionan en el repo**, tienen
derechos de autor.

```bash
npm run biblioteca                        # catálogo
npm run biblioteca -- --buscar=trauma     # filtrar
npm run biblioteca -- --bajar=phtls10     # descargar y obtener la ruta local
```

Redactar con la fuente delante no es una formalidad: es la diferencia entre una
dosis citada y una recordada. Cada cifra que entre al temario debe poder
señalarse en una de estas obras, y el bloque `fuentes` del tema es donde se
declara.

### Hallazgos al cotejar la bibliografía del plan

El plan oficial declara «MANUAL ACLS 2020» y «PHTLS ED 9». La biblioteca
contiene material más reciente y conviene que la academia actualice su lista:

| El plan cita | Disponible / vigente |
|---|---|
| ACLS 2020 | La AHA publicó en **2025** una revisión de las guías de RCP y ACE |
| PHTLS 9.ª ed. | La carpeta incluye **PHTLS 10.ª ed. en español** |

Ambas ediciones están catalogadas (`acls2020`, `phtls9`, `phtls10`) para poder
comparar y documentar qué cambió.
