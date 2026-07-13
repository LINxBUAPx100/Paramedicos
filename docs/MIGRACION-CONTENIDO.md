# Migración de contenido por academia (Fase 2)

> Objetivo: cada academia tiene una **copia independiente** de su contenido.
> Modificar la copia de una academia jamás afecta a otra academia ni a la
> plantilla global. Los cambios de la plantilla **no** se propagan solos
> (la replicación con vista previa/respaldos es la Fase 9).

## Modelo

| Colección | Doc ID | Quién escribe |
|---|---|---|
| `plantillas/{plantillaId}` | `paramedico-tum` | solo super-admin |
| `plantillasTemas/{plantillaId__temaId}` | `paramedico-tum__rcp` | solo super-admin |
| `cursos/{academiaId__plantillaId}` | `AEP-2026__paramedico-tum` | director PRO / prof. autorizado / super |
| `temas/{cursoId__temaId}` | `AEP-2026__paramedico-tum__rcp` | ídem |
| `historial/{auto}` | — | staff (append-only, firmado) |
| `respaldos/{auto}` | — | solo super-admin (Fase 9) |

- Los doc-id son **deterministas** con el `academiaId` como prefijo: clonar es
  idempotente (reejecutar reescribe, nunca duplica) y los namespaces de dos
  academias son disjuntos por construcción.
- Cada curso clonado registra su origen: `plantillaOrigenId` + `versionOrigen`.
- Los `temaId`/`faseId` originales se **conservan**: el progreso, los intentos y
  las calificaciones (keyed por esos ids) no se tocan ni se migran.

## Estados de migración (`academias/{id}.contenido.estado`)

| Estado | Significado | Qué sirve la app |
|---|---|---|
| *(ausente)* / `legacy` | sin migrar | bundle `src/data` (comportamiento actual) |
| `migrando` | clonación en curso | bundle `src/data` |
| `migrado` | copia completa | **su copia** de Firestore |
| `error` | clonación fallida | bundle `src/data` (reintentar) |

Solo el super-admin escribe este campo (las reglas acotan al director a
`logo/lema/colorHero`). La capa de acceso (`contenidoDeAcademia()` en
`src/lib/firebase/contenido.js`) es la única puerta al contenido: los
componentes nunca eligen entre Firestore y `src/data`, y si la carga de la
copia falla (parcial, permisos, red) cae a legacy sin romper la academia.

## Procedimiento

Todo el flujo es **dry-run por defecto**; nada escribe sin `--apply`.
El script imprime siempre el proyecto Firebase objetivo y un resumen.

```bash
# 0. Inspeccionar la plantilla que se generaría desde src/data (sin conexión)
npm run gen:plantilla          # escribe scripts/plantilla-oficial.json (git-ignored)
npm run migrar                 # ayuda + números del temario local

# 1. Ensayar contra el EMULADOR (recomendado antes de tocar producción)
#    Requiere Java + firebase-tools:  npm i -D firebase-tools
npx firebase emulators:start --only firestore --project ptem-a304f
# en otra terminal:
FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 node scripts/migrar-contenido.mjs --seed
FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 node scripts/migrar-contenido.mjs --seed --apply
FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 node scripts/migrar-contenido.mjs --academia=AEP-2026 --apply
FIRESTORE_EMULATOR_HOST=127.0.0.1:8080 node scripts/migrar-contenido.mjs --verificar --academia=AEP-2026

# 2. Producción (cuando el dueño lo decida; NUNCA sin dry-run previo)
#    Requiere un service account (fuera del repo) y el flag explícito:
GOOGLE_APPLICATION_CREDENTIALS=/ruta/sa.json node scripts/migrar-contenido.mjs --seed --produccion            # dry-run
GOOGLE_APPLICATION_CREDENTIALS=/ruta/sa.json node scripts/migrar-contenido.mjs --seed --produccion --apply
GOOGLE_APPLICATION_CREDENTIALS=/ruta/sa.json node scripts/migrar-contenido.mjs --academia=AEP-2026 --produccion --apply
```

Alternativa sin service account: el super-admin puede sembrar/clonar desde la
app con `importarPlantillaOficial()` (`src/lib/firebase/plantillas.js`) y
`clonarPlantillaAAcademia()` (`src/lib/firebase/contenido.js`) — mismas
escrituras, mismos ids (la UI que las dispare llega con Fases 3-4).

### Interrupciones y reanudación

Una clonación interrumpida deja `clonacion.completa = false` y el estado
`migrando`/`error` → la app sigue sirviendo legacy (nadie pierde acceso).
Reejecutar el mismo comando con `--apply` **reanuda**: los ids deterministas
reescriben lo ya escrito y completan lo faltante. `--verificar --academia=X`
lista los temas faltantes de una clonación parcial.

## Reglas y pruebas

- Reglas nuevas en `firestore.rules` (NO desplegadas en esta fase):
  plantillas solo super-admin; cursos/temas por academia con `academiaId`,
  `cursoId` y `temaId` **inmutables**; lectura de alumno solo `publicado` y de
  su academia; director BASE no edita; profesor solo con `permisosEditor` y
  sobre sus `cursosPermitidos`; historial append-only firmado.
- Pruebas puras (sin Firebase): `npm test` — integridad, ids, equivalencia de la
  API, independencia de copias, estados.
- Pruebas de reglas (aislamiento cruzado A/B): `npm run test:rules`
  (= `firebase emulators:exec --only firestore --project ptem-rules-test
  "node --test tests/rules/*.test.mjs"`). Requieren **Java** y
  `firebase-tools`; sin emulador se omiten con el motivo (nunca falso verde).
  **Correrlas antes de desplegar las reglas.**

## Rollback

1. **Sin desplegar reglas ni migrar nada** (estado actual): no hay nada que
   revertir; la app funciona exactamente como antes.
2. **Plantilla sembrada / academia clonada por error**: poner
   `academias/{id}.contenido.estado = 'legacy'` (o borrar el campo) → la app
   vuelve al bundle al instante. Los docs de `cursos`/`temas` pueden quedarse
   (inertes) o borrarse por prefijo `{academiaId}__` cuando convenga.
3. **Reglas**: el `firestore.rules` anterior está en git; redesplegar la
   versión previa revierte los permisos (las colecciones nuevas quedan
   inaccesibles para clientes, lo cual es seguro).
4. **Datos de alumnos**: progreso/intentos/calificaciones nunca se tocan en
   esta fase; no requieren rollback.
