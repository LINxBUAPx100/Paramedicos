# Replicación de contenido (Fase 7)

> Plantillas globales versionadas + clonación/replicación controlada hacia
> academias, exclusivas del SUPER-ADMIN. Sin propagación automática, sin
> referencias compartidas, sin sobrescrituras silenciosas.

## Principio no negociable

Cada academia opera una copia **independiente** (`cursos/temas` con su
`academiaId` en el doc-id). Replicar = escribir de nuevo en el namespace de la
academia destino. Las plantillas son de solo lectura para todos menos el
super-admin, y **ningún cambio se propaga solo**: toda distribución es una
operación explícita con dry-run, respaldo y confirmación reforzada.

## Arquitectura

```
MODELO PURO (npm test, sin Firebase)
  src/lib/plantillasModelo.js   metadatos, ciclo de vida, versionado, snapshot
  src/lib/replicacionModelo.js  huella, comparación, estrategias, plan de
                                escrituras/lotes, respaldo, rollback, estados

CAPA DE DATOS (solo super-admin; las reglas son la barrera real)
  src/lib/firebase/replicacion.js  navegador: plantillas + operaciones ACOTADAS
                                   (≤ MAX_DESTINOS_CLIENTE = 5 academias)
  scripts/replicar-contenido.mjs   backend seguro (firebase-admin): masivo

UI  src/pages/ReplicacionPage.jsx  →  /admin/replicacion (lazy, solo super)
```

No se usa Cloud Functions: el proyecto es Spark. El "backend seguro" para
operaciones masivas es el **script privado con service account** (mismo patrón
que `scripts/migrar-contenido.mjs`). Si en el futuro se quiere mover a Cloud
Functions (requiere **Blaze**): envolver `analizar/aplicar/rollback` en una
función `onCall` con verificación de rol superadmin (custom claim o doc de
usuario), validación estricta del payload, App Check y límites de tamaño. El
modelo puro se reutiliza tal cual; nada del cliente cambia salvo el transporte.

## Modelo de datos

```
plantillas/{plantillaId}                  catálogo (borrador de TRABAJO + metadatos)
  { id, nombre, descripcion, categoria, tipoDestino, planesCompatibles,
    version, estado(borrador|publicada|archivada), origen(manual|curso-academia|duplicado),
    academiaOrigenId?, cursoOrigenId?, hash?, conteos?, estructura,
    creadaPor, creadaEn, actualizadaPor, actualizado, publicadaEn? }
plantillasTemas/{plantillaId__temaId}     contenido de trabajo (se edita en borrador)

plantillasVersiones/{plantillaId__vN}     SNAPSHOT INMUTABLE al publicar
  { plantillaId, version, nombre, notas, estructura, hash, hashEstructura,
    conteos, autor, fecha, origen, cambios{agregados,quitados,modificados} }
plantillasVersionesTemas/{plantillaId__vN__temaId}
  { versionId: 'plantillaId__vN',  ← consulta por UN campo (sin índice compuesto)
    plantillaId, version, temaId, ...contenido, hash }

replicaciones/{id}                        operación (auditoría + progreso)
  { tipo(clonacion|replicacion), plantillaId, version, destinos[], estrategia,
    estado, dryRun{analisis, totales, advertencias, bloqueada, fecha},
    confirmacion{frase, selecciones, usuario, fecha}, backupId,
    progreso{academiaId: {estado, loteConfirmado, escrituras, hashCursoEscrito}},
    creados{academiaId: [{coleccion, docId, hashEscrito}]},
    creadoPor, creadoEn, inicioAplicacion?, finAplicacion?, error?, rollback? }

respaldos/{bk-<repId>__<coleccion>__<docId>}   snapshot previo (id determinista)
  { backupId, replicacionId, academiaId, coleccion, docId, datos, versionDoc, fecha }
```

**Sello de origen** (clave de la detección de cambios): cada tema clonado o
replicado lleva `origen: { plantillaId, version, hash, replicacionId }` con la
huella del contenido **tal como se recibió**. Las reglas lo hacen inmutable
para los editores de academia. `hashLocal ≠ origen.hash` ⇒ la academia lo
modificó; `hashOrigen ≠ origen.hash` ⇒ la plantilla cambió. Clones previos a la
Fase 7 no tienen sello: toda divergencia se trata como **conflicto**
(conservador; jamás se pisa nada por inferencia).

## Estados de una operación

`borrador → analizando → lista → esperando_confirmacion → aplicando →
completada | completada_con_advertencias | fallida → (revirtiendo → revertida)`
· `cancelada` desde los estados previos a aplicar. Transiciones validadas por
`puedeTransicionar` dentro de una **transacción** sobre el doc de la operación:
`aplicando` no transiciona a sí mismo (bloqueo anti doble ejecución; reanudar
tras un cierre abrupto exige `reanudar: true` / `--reanudar` explícito).

## Dry-run (obligatorio)

`analizarReplicacion` lee cada destino (academia + curso + temas) y clasifica
cada tema: `nuevo · sin_cambios · modificado_en_origen · modificado_local ·
conflicto · solo_local · archivado_local`, más incompatibilidades de plan/tipo
(capacidades centralizadas: plan CURSO máx. 1 curso; tipo distinto = requiere
confirmación justificada; `capacidades.plantillas=false` = bloqueo). No escribe
contenido: solo guarda el análisis en el doc de la operación, incluida la
**huella del destino**. Al aplicar se re-verifica esa huella: si el destino
cambió después del análisis, esa academia se **omite** con advertencia y hay
que re-analizar.

## Estrategias de conflicto (default: `conservar_local`)

| Clase → | nuevo | sin cambios | del origen | local | conflicto | solo local | archivado |
|---|---|---|---|---|---|---|---|
| **conservar_local** | crear | omitir | actualizar | conservar | conservar | conservar | conservar |
| **reemplazar_con_origen** | crear | omitir | actualizar | **actualizar** | **actualizar** | conservar | conservar |
| **duplicar_como_nuevo** | crear | omitir | actualizar | duplicar | duplicar | conservar | conservar |
| **seleccion_manual** | crear | omitir | actualizar | decidir | decidir (obligatorio) | conservar | conservar |

- Lo **creado por la academia** (`solo_local`) y lo **archivado** por ella no
  se toca con ninguna estrategia (solo la selección manual puede decidir sobre
  archivados).
- `duplicar_como_nuevo` genera ids `tema-vN` (sin `__`), inserta la copia junto
  al original y **nace en borrador** (ningún alumno la ve hasta publicarla).
- `reemplazar_con_origen` exige respaldo previo + frase de confirmación.

## Respaldo

Antes de escribir, cada doc que se actualizará (temas + el doc del curso) se
copia a `respaldos/` con id determinista `bk-<repId>__<coleccion>__<docId>`:
reanudar **no** sobrescribe el snapshot original. `verificarRespaldo` exige
cobertura completa; si falta un respaldo, **no se escribe nada** en esa
academia. Solo el super-admin puede leer respaldos (reglas). **Retención**: los
respaldos no se borran automáticamente en esta fase; depurarlos es una decisión
manual del super-admin y solo tras verificar que la operación no necesitará
rollback (política a revisar cuando exista métrica de volumen).

## Aplicación (idempotente, reanudable, acotada)

Por academia: verificación de huella → respaldo → lotes de ≤20 escrituras
(`writeBatch`) con `progreso.loteConfirmado` guardado tras cada lote → doc del
curso al final (estructura fusionada + `versionOrigen` + `replicacion`) →
historial. Los doc-id son deterministas: **reanudar reescribe los mismos docs**
(nunca duplica). Una academia fallida detiene la operación (estado `fallida`,
reanudable). Clonación (curso inexistente): crea el curso completo desde la
versión y marca `academias/{id}.contenido.estado='migrado'`.

- **Navegador**: máx. `MAX_DESTINOS_CLIENTE = 5` academias por operación.
- **Masivo**: `npm run replicar` (script admin), mismos modelos y mismos
  respaldos; `--confirmar="FRASE"` obligatorio para reemplazos/multi-academia.

## Costos aproximados (Spark)

| Operación | Lecturas | Escrituras |
|---|---|---|
| Publicar versión (68 temas) | ~70 | ~70 (snapshot) + 1 |
| Dry-run por academia | ~72 (academia + cursos + temas + versión) | 1 (doc de operación) |
| Aplicar por academia (todo nuevo) | ~72 | ~70 + respaldos (≈0 si es clonación) |
| Aplicar conservar_local típico | ~72 | solo temas nuevos/actualizados + 1 curso + respaldos |
| Rollback por academia | 1 por doc implicado ×2 | restaurados + archivados |

El wizard muestra escrituras estimadas antes de confirmar. Regla práctica: una
replicación a 5 academias del temario completo ≈ 350 lecturas + ≤400 escrituras
— muy por debajo de las cuotas diarias de Spark.

## Variables de entorno y comandos

```
FIRESTORE_EMULATOR_HOST=127.0.0.1:8080      # pruebas con emulador
GOOGLE_APPLICATION_CREDENTIALS=/ruta/sa.json # producción (service account PRIVADO)
FIREBASE_PROJECT_ID=ptem-a304f               # opcional (default)

npm run replicar                                          # ayuda
npm run replicar -- --plantilla=tum --version=2 --destinos=ACA-A,ACA-B   # dry-run
npm run replicar -- ... --estrategia=conservar_local --apply --confirmar="REPLICAR 2 ACADEMIAS"
npm run replicar -- --operacion=ID --apply --reanudar     # reanudación
npm run replicar -- --rollback --operacion=ID             # vista previa de rollback
npm run replicar -- --rollback --operacion=ID --apply --confirmar="REVERTIR 2 ACADEMIAS"
```

## Pruebas

- Puras: `tests/replicacion.test.mjs` (25) + `tests/plantillas.test.mjs` (10) —
  `npm test`.
- Reglas: casos F7 en `tests/rules/contenido.rules.test.mjs`
  (`npm run test:rules`; requiere Java + firebase-tools; sin emulador se omiten
  con motivo, nunca dan falso verde).

## Procedimiento para producción (manual, en orden)

1. `npm run test:rules` en un entorno con Java (obligatorio).
2. Desplegar `firestore.rules` (consola o `firebase deploy --only firestore:rules`).
3. Publicar la versión de la plantilla desde `/admin/replicacion`.
4. Dry-run (siempre) → revisar conflictos → confirmar → aplicar (≤5 academias
   desde la UI; masivo con `npm run replicar` + service account).
5. Verificar 1 academia al azar (`/admin/academia/{id}` + vista del alumno).
6. Conservar el `replicacionId`: es la llave del rollback.

## Advertencias

- **Nunca** ejecutar `--apply --produccion` sin dry-run previo revisado.
- No borrar versiones publicadas usadas por academias (`versionEstaEnUso`).
- No relajar reglas para "facilitar" escrituras masivas: el camino masivo es el
  script con Admin SDK.
- El progreso, intentos y calificaciones quedan estructuralmente fuera
  (`COLECCIONES_PERMITIDAS`); cualquier cambio a esa lista exige revisión.
