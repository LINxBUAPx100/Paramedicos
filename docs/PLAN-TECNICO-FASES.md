# Plan técnico por fases — estado y pendientes

> **Para quien retome esto.** Este documento es el registro vivo del trabajo
> TÉCNICO (software). No sustituye a `CLAUDE.md`, que gobierna el trabajo
> EDITORIAL (redactar el temario). Son dos proyectos distintos y avanzan por
> separado: el software funciona sin que exista una línea de temario nuevo.
>
> Última actualización: **29 de agosto de 2026**.
> Rama con las fases 1–3: `claude/fases-1-3-lectura-multigrupo-andamio`.

---

## Estado en una tabla

| # | Fase | Estado | Dónde |
|---|------|--------|-------|
| 1 | Lectura por tema (287 → 3 lecturas) | **Hecha** | Vite actual |
| 2 | Un profesor, varios grupos | **Hecha** | Vite actual |
| 3 | Programas nuevos con lecciones de andamio | **Hecha** | Vite actual |
| 4 | Clase en vivo con actividades calificables | Pendiente | Vite actual |
| 5 | Hosting propio + plan Blaze | Pendiente | Infraestructura |
| 6 | Migración a Next.js | Pendiente | — |
| 7 | Certificados con QR verificable | Pendiente | Necesita 5 y 6 |

Pendientes sueltos de fases ya cerradas: ver «Deuda abierta» al final.

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

## Fase 4 — Clase en vivo con actividades calificables · PENDIENTE

La fase grande. **2–3 semanas.** Todo lo anterior existe para que esta se pueda
hacer bien.

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

## Fase 5 — Hosting propio + Blaze · PENDIENTE

Se hace **después** de que la clase en vivo funcione, para contratar sabiendo
cuánto consume de verdad. **2–3 días.**

- Dominio propio — indispensable para que los certificados tengan credibilidad.
- Blaze con **alertas de gasto desde el primer día**.
- **RTDB en Blaze**: el plan gratuito corta en 100 conexiones simultáneas, así
  que con 200 alumnos no se puede ni ensayar la presencia en Spark.
- Separar de verdad el entorno de pruebas del de producción.

---

## Fase 6 — Migración a Next.js · PENDIENTE

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

## Fase 7 — Certificados con QR verificable · PENDIENTE

Necesita las fases 5 y 6. **2–3 semanas.**

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

## Deuda abierta

| Qué | De qué fase | Nota |
|---|---|---|
| Caché en IndexedDB | 1 | Refrescar la pestaña vuelve a pagar 3 lecturas |
| Partir el chunk de 3 MB del bundle | 1 | Solo afecta a academias sin migrar |
| Ver los flujos de profesor en navegador | 2 | Necesita un usuario de prueba |
| Sembrar el andamio en producción | 3 | Decisión de la academia |
| 2 pruebas en rojo por SVG modificados a mano | — | **Preexistente, no es de estas fases.** `public/imagenes/medical/bioicons/*` están modificados en el árbol de trabajo y `generadoAlDia.test.mjs` lo detecta |

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
