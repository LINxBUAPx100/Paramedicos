# Plan por fases de PTEM — hoja de ruta única

> **Este es el ÚNICO calendario del proyecto.** Antes había dos: este (7 fases
> técnicas) y la ampliación de `PLAN-LMS.md` §21-§33 (calidad editorial,
> botiquín, entrenador de farmacología y simulador de escenas). Se escribieron
> por separado, no se conocían entre sí y se pisaban en tres puntos. El 29 de
> agosto de 2026 se fundieron aquí.
>
> **Reparto de trabajo entre documentos.** Este archivo dice **qué se hace y en
> qué orden**. `PLAN-LMS.md` conserva el **detalle** de arquitectura, modelos de
> datos, reglas y decisiones (§1-§20 lo ya construido; §21-§33 la ampliación
> editorial y el incidente de imágenes). `CLAUDE.md` gobierna el trabajo
> EDITORIAL —redactar el temario— y es otro proyecto: el software avanza sin él.
>
> Última actualización: **29 de agosto de 2026**, con las fases 1-3 ya
> integradas en `main` (commit de fusión `ebfc963`).

---

## Estado en una tabla

Diez trabajos terminados y once pendientes. Los tachados no se vuelven a tocar
salvo regresión demostrada.

### Terminado

| Trabajo | De dónde venía |
|---|---|
| ~~Planes comerciales y capacidades centralizadas~~ | PLAN-LMS F1 |
| ~~Aislamiento de contenido por academia + plantillas~~ | PLAN-LMS F2 |
| ~~Editor estructural de contenido~~ | PLAN-LMS F3 |
| ~~Cableado del resolutor a las páginas de estudio~~ | PLAN-LMS F4 |
| ~~Permisos editoriales granulares del profesor~~ | PLAN-LMS F6 |
| ~~Página de inicio por secciones configurables~~ | PLAN-LMS F7 |
| ~~Plantillas versionadas, clonación y replicación~~ | PLAN-LMS F9 |
| ~~**Fase 1** — Lectura por tema (287 → 3 lecturas)~~ | técnico F1 |
| ~~**Fase 2** — Un profesor, varios grupos~~ | técnico F2 |
| ~~**Fase 3** — Programas de andamio~~ | técnico F3 |

### Pendiente, en orden de ejecución

| # | Trabajo | Duración | Depende de |
|---|---|---|---|
| **A** | Calidad editorial v2 + partir el bundle | larga, por lotes | — |
| **B** | Mi Botiquín | corta | tu lista de artículos |
| **C** | Clase en vivo con actividades calificables **(incluye el simulador de escenas)** | 2-3 semanas | A, para que las escenas exijan lo que el temario enseña |
| **D** | Entrenador de farmacología | media | tu catálogo de fármacos |
| **E** | Editor de temas (bloques, quiz, flashcards, actividades) | media | — |
| **F** | Hosting propio + plan Blaze | 2-3 días | C, para contratar sabiendo el consumo real |
| **G** | Migración a Next.js | 3-5 semanas | F |
| **H** | Certificados con QR verificable | 2-3 semanas | F y G |
| **I** | Plan CURSO + directorio de capacitadores | media | — |
| **J** | Auditoría, paginación de `/admin`, validar `intentos` | media | — |
| **K** | Tipo MEDICINA (convocatorias) | larga | — |

## Los tres choques que había, y cómo quedaron

| Se pisaban | Resolución |
|---|---|
| Fase técnica 4 (clase en vivo, modelo `sesionesVivas` + `participantes`) **vs** PLAN-LMS Fase 16 (simulador de escenas, modelo `sesionesEscena` + `recorridos`) | **Gana el modelo técnico**, que estaba mucho más decidido: un documento por alumno para evitar contención de Firestore, presencia en Realtime Database porque Firestore no avisa cuando alguien cierra la laptop, y política de `sin_responder`. El simulador de escenas **no es una función aparte**: es un TIPO de actividad dentro de la clase en vivo, más un modo de repaso individual. Se descartan `sesionesEscena` y `recorridos`. |
| Fase técnica 1 (agregados, hecha) **vs** PLAN-LMS Fase 13 (partir `planRescate.js`) | **No eran lo mismo y las dos hacen falta.** Los agregados ya arreglaron la lectura de una academia MIGRADA (3 lecturas por lección). Partir el bundle arregla a la academia SIN migrar, que descarga el temario entero como JavaScript: medido hoy, un trozo de 3,037 kB (700 kB gzip). Ya figuraba como deuda abierta de la Fase 1; ahora es el requisito previo del trabajo **A**. |
| Fase técnica 7 (certificados con QR) **vs** PLAN-LMS Fase 8 (certificados digitales) | **Gana la versión con QR**, que es la misma función mejor pensada: página pública de verificación, folio imposible de adivinar y revocación. PLAN-LMS F8 queda absorbida. |

## La tensión que hay que decidir pronto

La migración a Next.js **reescribe todas las pantallas**, y este plan tiene una
regla propia que dice «no migrar y construir funciones nuevas a la vez». Eso
deja dos caminos, y hay que elegir a sabiendas:

- **Construir ahora en Vite y portar después** (el orden de la tabla). Ves
  botiquín, clase en vivo y entrenador funcionando en semanas, y pagas su
  reescritura durante la migración. El botiquín y el entrenador son baratos de
  portar (son datos y pantallas simples); la clase en vivo no.
- **Migrar primero y construir una sola vez.** Son entre 4 y 6 semanas de
  hosting más migración sin nada nuevo que enseñar a nadie, y después todo se
  construye una vez.

La tabla asume el primer camino porque el segundo deja mes y medio sin nada
visible. **No está decidido.**

---

## Lo que hay que saber antes de tocar nada

### El bloqueador que se descubrió en la Fase 3

Firestore **rechaza un arreglo que contenga otro arreglo**. Un bloque de tabla
guardaba sus filas exactamente así: `filas: [['a','b'], ['c','d']]`. Son 1 026
filas repartidas por **170 de los 287 temas**.

Consecuencia: **ninguna academia con tablas podía migrarse**. Fallaban la
siembra de plantillas, `clonarPlantillaAAcademia` y el guardado desde el editor.
Y como el resolutor cae al bundle ante cualquier fallo, el único síntoma visible
era que la academia «seguía en legacy», sin decir por qué.

Arreglado: las filas viajan envueltas (`{ celdas: [...] }`) y la lectura acepta
las dos formas, así que no hay nada que migrar. Ver `seccionesParaFirestore` /
`seccionesDesdeFirestore` en `src/lib/contenidoModelo.js` y
`tests/tablasFirestore.test.mjs`.

**Si vuelve a aparecer «Property array contains an invalid nested entity», es
esto.** Cualquier campo nuevo que guarde una matriz necesita el mismo trato.

### Dos invariantes que no se rompen

1. **Una academia migrada nunca cae al bundle.** El bundle es el temario
   genérico; servírselo a una academia que tiene el suyo le enseña contenido
   ajeno creyendo que es propio, y en silencio. Si los agregados no están al
   día, se sirve por el camino completo (más caro, correcto), nunca por el
   bundle.
2. **El grupo de un ALUMNO es uno solo.** Lleva el `programaId`, o sea el plan
   de estudios que decide qué temario lee. `grupoIds` es exclusivo de staff.

---

## Fase 1 — Lectura por tema · HECHA

**Problema.** Abrir una lección bajaba la colección `temas` entera (287
documentos, ~3 MB) porque seis vistas derivadas necesitaban un trozo de todos
los temas. Con 200 alumnos abriendo clase: 57 400 lecturas sobre una cuota
diaria de 50 000.

**Solución.** Precalcular esas vistas en documentos pequeños —los AGREGADOS—
partidos por módulo.

| Archivo | Qué es |
|---|---|
| `src/lib/agregadosModelo.js` | Lógica pura: construir y reensamblar agregados |
| `src/lib/firebase/agregados.js` | Lectura/escritura en Firestore + caché |
| `src/lib/contenidoApi.js` | `construirApiBajoDemanda` |
| `src/lib/firebase/contenido.js` | `contenidoBajoDemandaDeAcademia`, `regenerarAgregados` |
| `src/context/ContenidoContext.jsx` | Hooks: `useTema`, `useFichasDeModulo`, … |

**Por qué por módulo.** Medido: un agregado global de preguntas ocupa 487 KB
hoy, y como 107 de los 287 temas siguen vacíos, al completarse el temario
rebasaría el límite de 1 MiB por documento. Por módulo el mayor son 146 KB.

**Resultado:** abrir una lección = **3 lecturas** (índice + sello + tema).
Con 200 alumnos, una clase pasa de 57 400 a ~600 lecturas.

**Nombres asíncronos a propósito.** Lo que ahora cuesta una lectura se llama
`getTemaAsync`, no `getTema`. Si se hubiera reusado el nombre viejo devolviendo
una promesa, una pantalla sin migrar pintaría `[object Promise]` en vez de
fallar. Con nombre distinto, revienta en la primera prueba.

**Caducidad.** El editor y la replicación marcan el sello como
`desactualizado` al escribir contenido, y programan la regeneración con 15 s de
espera para agrupar ráfagas de guardados. Mientras tanto se sirve por el camino
completo: nunca el examen anterior al cambio.

### Pendiente de la Fase 1
- [ ] **Caché en IndexedDB.** Hoy la caché es un `Map` que muere con la pestaña:
      refrescar vuelve a pagar las 3 lecturas. Pequeño comparado con lo hecho.
- [ ] **Partir el chunk de datos del bundle** (3 MB / 702 KB gzip). Los
      agregados no ayudan aquí: una academia sin migrar carga el temario entero
      como JavaScript. Es un problema de empaquetado, no de Firestore.

---

## Fase 2 — Un profesor, varios grupos · HECHA

**Problema.** `usuarios/{uid}.grupoId` era un solo campo, usado en unos 40
archivos. Una maestra con tres grupos, en el sistema, tenía uno.

**Solución.** Se añade `grupoIds` **solo para staff**. Sin él se usa
`[grupoId]`: **no hay que migrar ningún documento**.

| Archivo | Qué es |
|---|---|
| `src/lib/gruposDeUsuario.js` | Lógica pura: lista, grupo activo, filtro del panel |
| `src/context/AuthContext.jsx` | Expone `grupos`, `grupoId` (activo), `elegirGrupo` |
| `src/components/panel/PanelShell.jsx` | Selector acotado a sus grupos |
| `src/components/panel/GestionMiembros.jsx` | El director asigna grupos |
| `src/lib/firebase/usuarios.js` | `asignarGruposAProfesor` |

**El selector del Home ya existía y estaba roto.** Escribía `perfil.grupoId`, y
las reglas prohíben expresamente cambiar de grupo por cuenta propia dentro de
una academia. A un profesor que ya tuviera grupo se le denegaba: solo veía «No
se pudo cambiar de grupo». Ahora la elección es local (localStorage por
academia), instantánea, y solo entre los grupos que su director le asignó.

**`grupoIds` es un filtro, no una credencial.** La regla valida su forma (lista,
tope de 40) pero no comprueba elemento por elemento: costaría un `get()` por
grupo y Firestore admite 10 por petición. Da igual — todo lo que se lee sigue
autorizándose con `esStaffDe(academiaId)`. Hay una prueba que lo demuestra.

**Una maestra trabaja con UN grupo a la vez.** Se quitó «todos los grupos» a
propósito: un estado «todos» obligaría a decidir a qué grupo se le pone una
calificación. Esto importa para la Fase 4.

### Pendiente de la Fase 2
- [ ] **Ver los flujos de profesor en el navegador.** Requieren sesión iniciada
      y no se han visto pintar. La lógica está cubierta por pruebas y las reglas
      verificadas contra el emulador. Es lo primero que hay que mirar con un
      usuario de prueba.

---

## Fase 3 — Programas de andamio · HECHA

**Qué son.** Enfermería, TSU, Licenciatura en Paramédicos y Protección Civil,
con **dos lecciones de relleno cada uno**, para comprobar que un programa que no
es TUM funciona de punta a punta antes de invertir meses en escribir su temario.

| Archivo | Qué es |
|---|---|
| `src/data/programasAndamio.js` | Los cuatro programas y sus ocho lecciones |
| `scripts/seed-andamio.mjs` | Siembra (dry-run por defecto) y retirada |
| `tests/programasAndamio.test.mjs` | Las barreras que lo mantienen fuera |

**El texto es lorem ipsum a propósito.** Prosa que pareciera médica se leería
mejor y sería la peor decisión posible: un andamio que parece contenido clínico
acaba, tarde o temprano, delante de un alumno o dentro de un examen.

**Cuatro barreras** para que no llegue a nadie: nace en `borrador` (la regla
`alumnoLeeCurso` exige `publicado`), lleva `esAndamio: true`, usa el prefijo
`andamio-` en todos sus ids, y no se importa desde `src/data/index.js`.

**Protección Civil** va de momento como tipo `licenciatura`. Si la academia
decide que necesita reglas distintas, se añade a `META_PROGRAMA` y cambia una
línea en `programasAndamio.js`.

**Cómo sembrarlo:**

```bash
node scripts/seed-andamio.mjs
```

Eso es un dry-run. Con `--apply` escribe, y exige emulador (`FIRESTORE_EMULATOR_HOST`)
o `--produccion` con credenciales. `--retirar --apply` lo borra.

### Pendiente de la Fase 3
- [ ] **Sembrar en producción**, si la academia quiere ver sus carreras futuras.
      No se ha hecho: `CLAUDE.md` prohíbe sembrar producción sin autorización.
- [ ] **Borrar el andamio** cuando llegue el temario real de cada carrera.

---

## Trabajo C (antes «Fase 4») — Clase en vivo con actividades calificables · PENDIENTE

La fase grande. **2–3 semanas.** Todo lo anterior existe para que esta se pueda
hacer bien.

> **Absorbe el simulador de escenas** que PLAN-LMS §28 planeaba aparte. Una
> escena simulada pasa a ser un TIPO de actividad de esta clase en vivo, no un
> sistema paralelo: la maestra abre la sesión, pone una escena como checkpoint,
> ve el avance y califica con las reglas de aquí abajo. Se descartan las
> colecciones `sesionesEscena` y `recorridos` que proponía aquel documento;
> mandan `sesionesVivas` y `participantes`.
>
> De PLAN-LMS §28 **sí se conserva**: el esquema de la escena como grafo con
> finales distintos y sus topes (12 nodos, 3 opciones por nodo, 4 finales, 6
> decisiones de profundidad); los tres orígenes (lote curado, 3 variantes por
> módulo generadas, y editor para la maestra); el modo de **repaso individual**
> fuera de clase; y la regla de que una escena solo califica si está `validado`
> o `publicado`.
>
> Dos decisiones de PLAN-LMS quedan **revocadas** por las de esta fase, que son
> mejores: «cancelar sin efecto» se cubre con los estados de `participantes`, y
> la calificación no es libre sino que sigue la tabla de `sin_responder` /
> `pendiente` / `evaluado` de más abajo.

### Modelo de datos acordado

```
sesionesVivas/{sesionId}                 ← solo escribe la maestra
  grupoId: "TUM-A"                       ← decide quién la ve
  academiaId, profesorUid, temaId
  estado: 'abierta' | 'cerrada'
  posicion: { seccion: 4 }
  checkpoint: null | {
    id, titulo: 'Simulación de inyección IM',
    estado: 'esperando' | 'concluido',
    calificacionGeneral: null | 85
  }

sesionesVivas/{sesionId}/participantes/{uid}    ← un doc por alumno
  nombre
  estado: 'siguiendo' | 'esperando' | 'evaluado' | 'sin_responder'
  calificacionIndividual: null | 92      ← anula la general
```

### Decisiones ya tomadas — no volver a abrirlas

1. **La sesión pertenece a un GRUPO, no a la maestra.** Es lo que impide que los
   demás grupos de la misma maestra vean la actividad.
2. **Un documento por alumno, jamás uno compartido.** Firestore admite ~1
   escritura/segundo sostenida por documento; veinte alumnos marcando «listo» en
   el mismo sitio produce contención y errores `aborted`.
3. **Presencia en Realtime Database, no en Firestore.** Firestore no avisa
   cuando alguien cierra la laptop: un alumno desconectado quedaría «esperando»
   para siempre y la lista de la maestra nunca se completaría. RTDB tiene
   `onDisconnect()`. Es su único uso.
4. **Los checkpoints los define la SESIÓN, no el contenido** (opción B). La
   maestra pulsa «pausar aquí» mientras da clase. No toca los 287 temas ni el
   mandato editorial de `CLAUDE.md`. Que el tema pueda *sugerir* dónde parar se
   añade después, si hace falta.

### Reglas de calificación acordadas con el usuario

| Estado | Qué pasó | Efecto en el promedio |
|---|---|---|
| `evaluado` | La maestra puso nota | Cuenta con su valor |
| `sin_responder` | El alumno no hizo la actividad | **Cuenta como 0** (configurable) |
| `pendiente` | La maestra aún no ha calificado | No cuenta todavía |

Las dos últimas parecen la misma cosa y no lo son. Que el alumno falte es su
responsabilidad y lleva cero; que la maestra vaya atrasada no debe hundir a
nadie. La segunda regla ya estaba escrita en `calificacionesModelo.js`.

- El valor de `sin_responder` va en `academias/{id}.politicaSinResponder`
  (`0` o `50`), no en el código: la escala es 0–100 con 70 de aprobatorio y el
  director decide. **Arranca en 0.**
- Solo la maestra del grupo, el director y el superadmin pueden poner una nota
  manual después, y **queda registrado quién y cuándo**.
- Reconexión libre. Si el checkpoint ya cerró, entra como `sin_responder`.
- La nota se materializa en el libro de calificaciones existente
  (`calificaciones/{evaluacionId}__{uid}`), **no en un sistema aparte**.

### Barra de desempeño del alumno

| Rango | Color |
|---|---|
| 100 | 🔵 Azul |
| 80–99 | 🟢 Verde |
| 60–79 | 🟡 Amarillo |
| 20–59 | 🔴 Rojo |
| 0–19 | ⚫ Negro |

Con una **marca visible en el 70**, que es donde aprueba: un alumno con 65 ve
amarillo y debe ver también que está por debajo de la línea.

Dos cuidados que no son opcionales: en **modo oscuro** el negro se dibuja con
borde o se invierte (negro sobre fondo negro es invisible justo en el caso más
grave), y **al lado del color va siempre el número y una etiqueta**, porque 1 de
cada 12 hombres no distingue el verde del rojo.

### Coste estimado
Una clase completa de 200 alumnos con 6 checkpoints: ~2 000 lecturas y ~1 300
escrituras. **Holgado.** Lo caro nunca fue esto, era la lectura del temario, y
eso ya está arreglado.

---

## Trabajo F (antes «Fase 5») — Hosting propio + Blaze · PENDIENTE

Se hace **después** de que la clase en vivo funcione, para contratar sabiendo
cuánto consume de verdad. **2–3 días.**

- Dominio propio — indispensable para que los certificados tengan credibilidad.
- Blaze con **alertas de gasto desde el primer día**.
- **RTDB en Blaze**: el plan gratuito corta en 100 conexiones simultáneas, así
  que con 200 alumnos no se puede ni ensayar la presencia en Spark.
- Separar de verdad el entorno de pruebas del de producción.

---

## Trabajo G (antes «Fase 6») — Migración a Next.js · PENDIENTE

Conviene **solo cuando ya haya servidor**. La razón principal no es la moda:
Next.js puede armar la lección en el servidor y mandar el texto ya listo, lo que
hace *desaparecer* el problema del temario pesado en vez de mitigarlo.
**3–5 semanas.**

| Se muda tal cual | Se reescribe |
|---|---|
| Modelo de datos, reglas de Firestore, toda la lógica de `src/lib`, las pruebas | Las pantallas y el enrutado |

- Migración pantalla por pantalla, no de golpe.
- TypeScript de forma gradual, empezando por `src/lib`.
- **Python: no.** Reportes, PDFs y generación de exámenes los cubren las rutas
  de servidor de Next.js. Un segundo lenguaje son dos despliegues que mantener.
- **Regla que no se rompe:** no migrar y construir funciones nuevas a la vez. Si
  algo falla, hay que poder saber si fue la migración o la función.

---

## Trabajo H (antes «Fase 7») — Certificados con QR verificable · PENDIENTE

Necesita los trabajos F y G. **2–3 semanas.** Absorbe la «Fase 8 — certificados
digitales» de PLAN-LMS: es la misma función, mejor pensada.

El QR no vale por el QR: vale porque lleva a una página **pública, en el dominio
de la academia**, que confirma que el certificado existe y sigue vigente, sin
que quien lo escanea tenga que registrarse en nada.

- Folio **aleatorio e imposible de adivinar** (nunca `001`, `002`).
- Página pública de verificación: válido, a nombre de quién, qué curso, qué fecha.
- Plantillas editables por curso desde el panel del director.
- Emisión automática al cumplirse los requisitos.
- **Revocación**: un certificado emitido por error pasa a «REVOCADO» al instante.
  Un PDF suelto no se puede desemitir; uno verificable sí. Ese es el valor real.

**El alumno de curso suelto** pierde el acceso al curso al emitirse su
certificado, pero **conserva su perfil** para inscribirse a otros. Su
certificado sigue descargable y su QR funciona para siempre.

> **Lo que un QR no hace.** *Verificable* y *con validez oficial* son cosas
> distintas. El QR prueba que el documento es auténtico y lo emitió la academia.
> La validez ante la autoridad educativa o sanitaria es un trámite regulatorio;
> ninguna tecnología la sustituye. Cuando la academia lo obtenga, el sistema
> imprime el número de registro en el documento.

---

## Trabajo A — Calidad editorial v2 + partir el bundle · PENDIENTE · **va primero**

Detalle completo en `PLAN-LMS.md` §25. Resumen y lo que cambió al unificar:

**Primero la infraestructura, que además salda una deuda de la Fase 1.** El
bundle sirve el temario entero como un trozo de 3,037 kB (700 kB gzip, medido
el 29 de agosto). Los agregados de la Fase 1 no lo tocan: solo ayudan a una
academia migrada. Se parte el generador en estructura ligera + un archivo por
módulo + índice de búsqueda + banco de preguntas por módulo, y `src/data/index.js`
gana `getTemaCompleto()` asíncrono. Sin esto, enriquecer el temario lo llevaría
a 12-16 MB.

**Después el contenido, un lote por entrega.** Lote 0 cierra lo que falta de
verdad: 4 patologías, 1 procedimiento, 3 prácticas y el cableado de
`alcanceDeExamen` de 12 nodos de examen. Luego, módulo por módulo, en este
orden: M3 y M5 (vía aérea, soporte vital, trauma), M4, M6, M2, M1. A cada
lección se le añaden tabla comparativa, algoritmo, mnemotecnias, «Lo que más se
pregunta», «Errores frecuentes», «Repaso rápido» y preguntas de repaso oral,
**con los bloques que ya existen** y sin tocar el esquema.

**Corrección importante de la línea base.** `CLAUDE.md` §0 dice 161 lecciones
con material y 107 temas vacíos. Medido con `npm run inventario` el 29 de
agosto: **268 de 273 lecciones con material y 19 vacíos**, de los cuales 12 son
nodos de examen que no llevan prosa. El temario está casi escrito; esto es una
pasada de calidad, no de relleno. `docs/PLAN-TECNICO-FASES.md` heredó la cifra
vieja al describir la Fase 1 («107 de los 287 temas siguen vacíos»): esa frase
describe el momento en que se midieron los agregados, no el estado de hoy.

---

## Trabajo B — Mi Botiquín · PENDIENTE

Detalle en `PLAN-LMS.md` §26. La función más barata y la que menos depende del
temario.

Catálogo curado por compartimento, ficha por artículo (para qué sirve, cuándo
se usa, cuándo no, cómo se revisa antes del turno, errores frecuentes, con qué
se confunde) y tres estados —«en tu botiquín», «próximo a desbloquear» y
«bloqueado» en silueta— **derivados del progreso que la app ya carga: cero
lecturas y cero escrituras nuevas**. Ruta `/botiquin`.

Las fotografías del equipo entran por el pipeline de activos médicos, con
licencia, crédito, saneado y hash sellado, **no copiadas a mano en `public/`**
(ver `PLAN-LMS.md` §33.6 y el incidente que lo motivó).

**Hace falta de la academia:** lista de artículos por compartimento, qué módulo
desbloquea cada uno, tipo de unidad y las fotos.

---

## Trabajo D — Entrenador de farmacología · PENDIENTE · bloqueado

Detalle en `PLAN-LMS.md` §27. **No empieza hasta que llegue el catálogo de
fármacos de la academia**, con presentaciones y concentraciones.

Ficha propia por fármaco con enlace bidireccional a los temas de M4 derivado
del catálogo (no se edita ninguna lección). Cuatro modos: ficha, tarjetas,
«dosis relámpago» y casos.

**Regla dura:** ninguna dosis sin fuente completa —documento, edición, año y
capítulo o página— y una prueba automática que rechaza la ficha que no la
traiga, más el aviso permanente de que la cifra sale de la guía citada y no del
cuadro básico de la unidad. Es lo que hace defendible la autorización expresa
del dueño para enseñar dosis (`PLAN-LMS.md` §23.1), que levanta de forma
condicionada el bloqueo de `CLAUDE.md` §6 y §11.

---

## Trabajo E — Editor de temas · PENDIENTE

Era la Fase 5 de PLAN-LMS. Que el staff edite bloques, quiz, flashcards y
actividades desde la interfaz, con borradores y vista previa. La capa de datos
y las reglas ya existen desde la Fase 2 de aquel plan; falta la pantalla.

---

## Trabajos I, J y K — PENDIENTES, sin urgencia

Vienen de PLAN-LMS F10, F11 y F12. Ninguno bloquea a los demás.

- **I — Plan CURSO + directorio de capacitadores.** Academia de un solo curso
  (RCP, ACLS, PHTLS) y su directorio, si la academia lo activa.
- **J — Auditoría y coste de `/admin`.** Historial append-only; paginación y
  contadores de `/admin`, que hoy lee `usuarios` e `intentos` completos sin
  límite y puede agotar la cuota; y validación de los campos numéricos de
  `intentos`, que hoy permite inyectar un 100 % falso.
- **K — Tipo MEDICINA.** Organización por convocatoria e importación de
  temarios oficiales, nunca inventados.

---

## Deuda abierta

| Qué | De qué fase | Nota |
|---|---|---|
| Caché en IndexedDB | 1 | Refrescar la pestaña vuelve a pagar 3 lecturas |
| Ver los flujos de profesor en navegador | 2 | Necesita un usuario de prueba |
| Sembrar el andamio en producción | 3 | Decisión de la academia |
| ~~2 pruebas en rojo por SVG modificados a mano~~ | — | **RESUELTO el 29 de agosto** (commit `09176cd`). Era el mismo fallo que tuvo `main` en rojo 11 horas y bloqueó el despliegue: los SVG se optimizaron sin regenerar el catálogo que sella su hash. El minificado es ahora parte del pipeline. Ver `PLAN-LMS.md` §33 |
| Verificar el pipeline de activos con red a `smart.servier.com` | — | El minificado se integró, pero la reproducibilidad byte a byte **no está verificada**: desde el entorno de trabajo esa fuente da 403 y sin ella el importador deja fuera 48 activos. Correr una vez `npm i --no-save svgo && npm run activos:importar` |
| Partir el chunk de 3 MB del bundle | 1 | Promovido: es el requisito previo del **trabajo A** |

### Decisiones que faltan (ninguna bloquea)

- ¿`sin_responder` vale 0 o 50? Configurable por academia; arranca en 0.
- ¿Puede un alumno pertenecer a dos programas a la vez? Los grupos ya soportan
  «programas extra», pero nadie lo ha usado.
- ¿Qué requisitos disparan la emisión automática de un certificado?
- ¿Protección Civil necesita tipo de programa propio?
- **¿Las academias reales están migradas o en `legacy`?** Determina si el ahorro
  de la Fase 1 ya aplica o si primero hay que migrarlas (ahora que se puede).

---

## Cómo verificar cualquier cambio de estas fases

```bash
npm test
npm run build
npx firebase-tools@15 emulators:exec --only firestore,storage --project ptem-rules-test "node --test tests/rules/*.test.mjs"
```

Las pruebas de reglas necesitan **Java 21**. No declares como aprobada una suite
que se omitió: el job de CI lo comprueba explícitamente.
