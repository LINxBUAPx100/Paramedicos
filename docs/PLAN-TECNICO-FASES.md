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
> **Última actualización: 31 de agosto de 2026 (tarde).** Ese día se ejecutaron
> **P1** y **P2** contra producción y se rehízo la portada central. Del blindaje
> **solo queda P3**, y es el que importa: P1 movió el contenido a Firestore y P2
> lo sacó del JavaScript publicado, pero **Firestore lo sigue entregando igual
> de abierto**. Mientras P3 no esté puesto, el blindaje está a medias.
>
> Lo cerrado el 31 de agosto, en orden:
>
> | | Qué |
> |---|---|
> | **P1** | R.E.S.C.A.T.E. migrada a su propio contenido: 288 documentos sembrados, 288 clonados, `GRP-SCZD` reapuntado, 287/287 verificados |
> | **P2** | El temario deja de compilarse en el JS. El trozo de entrada baja de 3 037 kB a 712 kB y las 1 546 respuestas de examen descargables pasan a **cero** |
> | **Portada** | `/` pasa a ser una portada a sangre con foto, banda a tres bloques y la sección «Cómo se vive PTEM». El botón de menú desaparece cuando el cajón no tiene nada que abrir |
>
> Todo eso está fusionado y desplegado en `main` (`3db0a3d`). No queda ninguna
> rama de trabajo sin fusionar.
>
> Antes, el 30 de agosto, se había añadido el **trabajo O (Dashboard de
> Recepción)**, se corrigieron tres afirmaciones que ya no eran ciertas —el
> cableado de `alcanceDeExamen`, la validación de `intentos` y el número de
> lecciones vacías— y se aclaró que los certificados con QR **no** dependen de
> la migración a Next.js.

---

## Estado en una tabla

Veinte trabajos terminados y veintitrés pendientes. Los tachados no se vuelven a
tocar salvo regresión demostrada.

**El bloque P está cerrado.** P1 movió el contenido a Firestore, P2 lo sacó del
JavaScript publicado y P3 cerró la puerta del servidor: comprobado contra
producción sin sesión, **ninguna colección de contenido es legible**.

Con una salvedad que no es menor: **las reglas no se aplican al SDK de
administración**. La credencial de service account que se filtró el 31 de agosto
sigue viva —comprobado— y lee todo el proyecto saltándose P3. Rotarla es la otra
mitad del blindaje, y solo puede hacerla el dueño del proyecto.

Queda una decisión (comprar el dominio, para F1), una tarea de la academia
(**meter a los dos alumnos en un grupo**) y una deuda destapada al desplegar:
**la colección `agregados` está vacía en producción**.

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
| ~~**P4** — Portada pública de PTEM y vitrinas por carrera~~ | bloque P |
| ~~**P6** — Sello de propiedad del contenido~~ | bloque P |
| ~~**P7** — Blindaje de la interfaz (menú, buscador, pie, Home)~~ | bloque P · nuevo |
| ~~**P8** — No-indexación de lo que no es público~~ | bloque P · nuevo |
| ~~**T** — Tutoriales de primera vez (24 pantallas)~~ | pedido el 30-08-2026 |
| ~~**U** — Orden y filtros de las listas de personas~~ | pedido el 30-08-2026 |
| ~~**V** — Emulador local + usuarios de prueba~~ | necesario para verificar |
| ~~**P1** — Migrar R.E.S.C.A.T.E. a su propio contenido en Firestore~~ | bloque P · 31-08-2026 |
| ~~**P2** — Apagar el bundle: el temario deja de viajar en el JS~~ | bloque P · 31-08-2026 |
| ~~**P9** — Portada central rediseñada (foto a sangre, voces, menú)~~ | pedido el 31-08-2026 |
| ~~**P3** — Reglas de lectura por academia, grupo y programa~~ | bloque P · 31-08-2026 · **el bloque P queda cerrado** |

### Pendiente, en orden de ejecución

| # | Trabajo | Duración | Depende de |
|---|---|---|---|
| **F1** | Dominio propio + Firebase Hosting + `BrowserRouter` | 1-2 días | — · **cabe en Spark** · las portadas de P4 ya existen y esperan sus URLs |
| **P5** | Optimización del arranque (la no-indexación ya está en P8) | 1-2 días | — · **P2 hecho, ya no bloquea** |
| **A** | Calidad editorial v2 | larga, por lotes | — · **P2 hecho, ya no bloquea** |
| **O1** | Matrícula secuencial del alumno | 1-2 días | — |
| **B** | Mi Botiquín | corta | lista de artículos de la academia |
| **O2** | Bloqueo por pago + bypass auditado | 3-5 días | O1 |
| **O3** | Check-in de 8 horas | 3-5 días | O1 |
| **F2** | Contratar Blaze + alertas de gasto + RTDB + respaldos | 1 día | medir consumo real primero |
| **J** | Paginación de `/admin` y auditoría | media | **va con F2**: en Blaze el exceso ya no se corta, se cobra |
| **L** | Suscripción y cobro (pasarela, webhook, recepción, corte de caja) | 2 semanas | **F2** · O2 |
| **O4** | Pantalla de Recepción (rol `recepcion`) | 1 semana | O1-O3 · L |
| **C** | Clase en vivo con actividades calificables **(incluye el simulador de escenas)** | 2-3 semanas | A, **F2** · **O3** (la bandera «en clase» decide a quién se puede calificar) |
| **D** | Entrenador de farmacología | media | catálogo de fármacos de la academia |
| **M** | Tienda (uniformes e insumos) | 2 semanas | L · comparte catálogo con B |
| **O5** | Feed de logística de tienda en recepción | 3-5 días | M · O4 |
| **O6** | Credencial con código + escáner USB | 1-2 días | O4 |
| **N** | Inventario simple | 1 semana | M |
| **E** | Editor de temas (bloques, quiz, flashcards, actividades) | media | — |
| **H** | Certificados con QR verificable | 2-3 semanas | F1 (dominio) · F2 (Functions) |
| **G** | Migración a Next.js | 3-5 semanas | F1 · **reevaluar tras A**, no comprometido |
| **I** | Plan CURSO + directorio de capacitadores | media | — |
| **K** | Tipo MEDICINA (convocatorias) | larga | — |

> **Sobre el trabajo O.** El «Dashboard de Recepción» que se pidió el 30 de
> agosto de 2026 **no es un módulo nuevo**: es la pantalla a la que ya
> convergían L (cobro en caja), M (recoger en instalaciones) y C (calificar en
> clase). Se parte en seis piezas porque tres de ellas —matrícula, bloqueo por
> pago y check-in— son **datos**, no dependen de la pasarela y pueden hacerse
> antes; y las otras tres son la pantalla y sus accesorios. Detalle en el
> apartado «Trabajo O».

> **Sobre el bloque P (30 de agosto de 2026).** El dueño del producto decidió
> tres cosas que reordenan todo lo demás: la plataforma se vende a otras
> academias **muy a futuro**, hoy solo se trabaja para RESCATE, y el contenido
> tiene que quedar blindado antes que cualquier función nueva. El bloque P es
> ese blindaje, más la portada pública que la venta futura va a necesitar.

---

## Lo que está esperando una decisión tuya

Ya no son tres: **P1 se autorizó y se ejecutó el 31 de agosto**, y con él salió
P2. Quedan dos permisos y una tarea de la academia.

| Decisión | Por qué te toca | Desbloquea |
|---|---|---|
| ~~Desplegar `firestore.rules`~~ | — | **Hecho el 31-08-2026.** Cerró P3 y los tutoriales ya cruzan de dispositivo |
| Comprar el dominio | Es una compra | **F1**, y con él las URLs sin `#` |
| Meter a los dos alumnos en `GRP-SCZD` | Es alta en la academia, no código | Que dejen de ver «Necesitas un código de grupo». El grupo ya apunta al programa correcto |

### La credencial filtrada SIGUE VIVA

No es una decisión pendiente: es un agujero abierto. El 31 de agosto se pegó en
un chat el contenido de una clave de service account del proyecto. Ese mismo día
se dio por rotada, y **se comprobó que no lo estaba**: la clave
`97418f4409…` seguía devolviendo un token de acceso válido.

Por qué importa más ahora que antes: **las reglas de Firestore no se aplican al
SDK de administración.** P3 cierra la puerta del cliente, pero quien tenga esa
clave entra por la de servicio y lee los 287 temas, los usuarios y todo lo
demás. Mientras siga viva, el blindaje tiene una llave maestra circulando.

Se borra desde la consola de Firebase (Configuración → Cuentas de servicio →
administrar permisos → Claves) o con:

```bash
gcloud iam service-accounts keys delete 97418f440957b97713aed40e2679c01310ae2dda --iam-account=firebase-adminsdk-fbsvc@ptem-a304f.iam.gserviceaccount.com
```

Y después borrar el archivo de `Downloads`. Para comprobar que quedó muerta,
pedirle un token: una clave revocada falla con `invalid_grant`.

---

## Registro · sesión del 30 de agosto de 2026

> Esto es lo que YA ESTÁ HECHO, no trabajo por hacer. El plan vivo empieza en
> «El orden lo manda la validación docente». Se conserva porque los tres fallos
> que destapó explican por qué el orden es el que es.

Además de P4 y P6, esta sesión cerró tres peticiones nuevas del dueño del
producto y **destapó tres fallos que nadie había visto**. Los fallos importan
más que las funciones, así que van primero.

### Lo que se encontró auditando

**1. El menú lateral enseñaba el temario entero a cualquiera.** Con la sesión
cerrada, el panel principal decía «No has iniciado sesión» y el menú listaba
los **287 títulos** del plan de R.E.S.C.A.T.E. Los títulos son contenido de la
academia: son su índice. Causa: `Layout` pintaba el índice sin preguntarle nada
a nadie, y el índice viaja en el bundle.

**2. Y también a un alumno con cuenta pero SIN GRUPO.** Éste es el que casi se
escapa. `puedeAcceder` responde «¿tiene sesión y su academia está al
corriente?», y ese alumno la pasa. La otra mitad —«¿tiene plan de estudios
asignado?»— la responde `motivoSinPrograma`, y ahí falla. Con solo la primera
puerta puesta, el menú le enseñaba los 287 títulos mientras la página le pedía
un código de grupo. **El Home tenía el mismo agujero por su cuenta**, porque
`/` no cuelga de `RutaProtegida`: le pintaba el carrusel con los siete módulos.

**3. El bloqueo «Tu programa todavía no está disponible» se daba en falso.**
`motivoSinPrograma` tenía `programasDeAcademia = []` por defecto, y **ningún
llamador de la aplicación pasa ese dato** —solo las pruebas—. Así que la
comprobación concluía «no está publicado» sin haber mirado nada, y TODO alumno
con grupo quedaba bloqueado en todas las pantallas protegidas. Se corrigió: sin
la lista, la comprobación no corre, porque no se puede demostrar que algo no
esté publicado sin mirarlo. No abre ningún agujero —quién ve qué lo deciden
`puedeVerPrograma` sobre cada contenido y las reglas de Firestore—; lo que se
retira es un diagnóstico que se estaba dando en falso.

> **Conviene comprobarlo contra producción.** Si ese bloqueo estaba activo, los
> alumnos con grupo no podían abrir ninguna lección. No se puede confirmar sin
> mirar los datos reales.

**4. Una trampa en el sitemap.** Llevaba escrito «cuando se migre a
BrowserRouter, añadir aquí cada /tema/…». Seguir esa nota habría publicado el
índice completo del plan en Google. Corregida, y con una prueba que impide que
vuelva.

### P7 — Blindaje de la interfaz · HECHO

Sin acceso, y **sin plan de estudios**, no se pinta: ni el recorrido de estudio,
ni el buscador de la barra, ni los enlaces de estudio del pie, ni el carrusel de
módulos del Home, ni el rótulo «Recorrido de estudio» (un encabezado sobre la
nada anuncia que hay algo escondido). La lista se **vacía antes de recorrerla**,
no se oculta con CSS: lo que no se pinta no se lee en el inspector.

Verificado en pantalla: sin sesión, buscar `OVACE`, `AVDI` o `PROPEDÉUTICO` en
el HTML devuelve **cero coincidencias**. Con grupo, todo vuelve a verse.

**Lo que P7 NO arregla, y hay que decirlo:** el temario **sigue viajando en el
JavaScript publicado**. `grep` sobre `dist/` devuelve todavía **1 546 respuestas
de examen**. Quien abra las herramientas del navegador se lo lleva entero
aunque el menú no le enseñe nada. Eso es **P2**, y P2 necesita **P1**.

### P8 — No-indexación · HECHO

`robots.txt` reescrito, `sitemap.xml` con **solo portadas públicas**, y —lo que
de verdad funciona en una aplicación de una sola página— una etiqueta
`<meta name="robots">` que el shell recalcula en cada navegación
(`src/lib/indexable.js`). Es **lista blanca**: una ruta nueva nace sin indexar.

### T — Tutoriales de primera vez · HECHO

24 pantallas, una vez en la vida de la cuenta, **nunca en las páginas de tema**.
Un solo punto de montaje en el `Layout` guiado por la ruta: ninguna pantalla
sabe que existen. Un paso cuyo elemento no está se enseña centrado en vez de
romperse. Y no salen sin acceso: se vio en pantalla el tutorial de «visibilidad
del temario» encima del muro de «No has iniciado sesión».

Se guardan en `tutoriales/{uid}`, **colección propia y no un campo en
`usuarios`**: la regla de `usuarios` tiene lista blanca estricta porque
ensancharla ya causó una escalada de privilegios, y el peor caso aquí es que
alguien se marque un tutorial como visto. **Falta desplegar la regla** para que
crucen de dispositivo; mientras tanto funciona con `localStorage`.

### U — Orden y filtros de las listas de personas · HECHO

`src/lib/listaUsuarios.js`, compartido por la tabla de la academia y la de la
plataforma. El desorden no era aleatorio: comparar con `<` pone «Ximena» antes
que «alexis» y «Díaz» después de «Duarte». Ahora `Intl.Collator` en español, y
la búsqueda ignora acentos y ñ (`lopez` encuentra *López*, `sedeno` encuentra
*sedeño*). Filtros de rol, estado y grupo, acumulables, con contador.

**Las cuentas inactivas salen de los listados** —suspendidas y dadas de baja—,
filtradas en `datosAcademia`, el hook único del panel. Eso arregló de paso el
fallo que se reportó: «permisos de edición» ofrecía permisos a un profesor
suspendido, que no puede ni entrar.

### V — Emulador local + usuarios de prueba · HECHO

`npm run emu` y `npm run seed:usuarios`. Once personas que cubren los casos que
de verdad rompen: dos grupos, acentos y ñ, orden numérico, suspendido, dado de
baja y **sin grupo** —que es el que destapó el fallo 2—. El script **se niega a
correr sin emulador** salvo `--produccion` explícito.

`VITE_FIREBASE_EMULADOR=1` en el `.env` local apunta la aplicación al emulador.
La rama se elimina del build de producción, y hay una prueba que lo vigila.

---

## El orden lo manda la validación docente, no el plan

**Los profesores están dentro validando material.** Eso reordenó el bloque P el
30 de agosto de 2026, y conviene entender por qué se pudo reordenar sin riesgo.

**El trabajo docente vive en otra capa.** Las firmas no están dentro de los
temas: están en `validaciones/{academiaId}`, un documento por academia indexado
por `temaId`, más `validaciones/_plataforma` para lo que firma el super-admin.
P1 escribe DOCUMENTOS DE TEMA; no toca `validaciones` ni `dictamenes`. Y como
la capa se cruza por `temaId` —identidad estable—, una firma puesta hoy sigue
aplicando después de la migración. Comprobado también el caso feo: un documento
de academia vacío no tapa las firmas de la plataforma, porque
`combinarValidaciones` mezcla por clave.

Dicho de otro modo: **el contenido se puede volver a sembrar desde el repo las
veces que haga falta; la firma de un docente, no.** Es lo único irreemplazable
del sistema, y es justo lo que la migración no toca.

| Trabajo | ¿Estorba a quien está validando? | Estado |
|---|---|---|
| P4, P6, P7, P8, T, U | **No.** Rutas nuevas, campos nuevos y filtros. No tocan el panel ni el temario en revisión | Hechos |
| V (emulador) | **No.** No toca producción: ésa es su razón de existir | Hecho |
| P1 | **Sí.** El contenido cambiaba de fuente bajo sus pies | **Hecho el 31-08-2026**, sin interrupción: 287/287 verificados y las firmas intactas |
| P2 | **Sí.** Era el punto de no retorno: si P1 hubiera quedado incompleto, no verían nada | **Hecho el 31-08-2026**, después de comprobar P1 |
| P9 (portada) | **No.** Solo toca `/`, que ellos no usan para validar | Hecho el 31-08-2026 |
| P3 | **Sí.** Una regla mal puesta los deja fuera del material que revisan | Espera el despliegue de `firestore.rules` |
| F1 | **Sí.** Les rompe los marcadores a `#/panel/contenido` | Espera dominio |

Todo lo que no los tocaba se hizo primero, con ellos dentro. P1 y P2 se hicieron
el 31 de agosto en ese orden y comprobando el primero antes de empezar el
segundo, que es lo que hacía falta: la vuelta atrás de P1 era desmarcar la
academia como migrada, y la de P2 ya no existe, porque el bundle se apagó.

**Queda P3, y su riesgo es el contrario:** no borra nada, pero una regla mal
puesta deja al cuerpo docente fuera del material que está revisando. La trampa
ya está localizada —el staff no tiene grupo— y las reglas se prueban contra el
emulador antes de tocar producción.

**Y un incentivo real:** los bancos de examen solo toman temas `validado` o
`publicado`. Cada firma que pongan antes de la migración es contenido que ya
queda utilizable del otro lado.

---

## Bloque P — Blindaje del contenido y portada pública

### El hallazgo que obliga a poner esto primero

`RutaProtegida` no protege nada. Es una comprobación de cliente sobre una app
estática: el temario viaja **compilado dentro del bundle** y GitHub Pages lo
sirve a cualquiera que pida el archivo, sin cuenta, sin academia y sin grupo.

Medido en `dist/` el 30 de agosto de 2026, sobre `assets/index-*.js` (3 026 KB):

| Qué está a la vista de cualquiera | Cantidad |
|---|---|
| Respuestas correctas de quiz (`correcta:`) | 1 546 |
| Explicaciones de examen | 1 539 |
| Flashcards completas | 1 429 |
| Lecciones redactadas (incluida farmacología con dosis) | todas |

No es una fuga parcial ni un descuido de permisos: es la forma del despliegue.
Un competidor descarga **un** archivo y tiene el curso entero y su banco de
exámenes. Mientras el contenido se empaquete en el JS, cualquier otra medida de
protección es decorativa.

> **Por qué hay dos cifras.** Aquí se cuenta sobre el archivo MINIFICADO de
> `dist/` (1 546 respuestas); la prueba `fugaDelBundle.test.mjs` cuenta sobre el
> FUENTE (1 539). La diferencia son coincidencias que el minificador introduce,
> y ninguna de las dos es más verdadera que la otra: la de `dist/` mide lo que
> se sirve, la del fuente mide lo que se escribió. Se conservan las dos a
> propósito, para que nadie las tome por un error de cuentas.

### P1 — Migrar R.E.S.C.A.T.E. a Firestore · HECHO el 31-08-2026

**El punto de partida no era el que este plan suponía.** La inspección previa
—con credencial de service account, solo lectura— encontró esto en producción:

| | |
|---|---|
| Plantillas | **0**. Nunca se sembró ninguna |
| Curso de RES-2026 | 1: `RES-2026__r-e-s-c-a-t-e` — **borrador, 0 temas**, clonación nunca completada |
| `contenido.estado` | **`migrado`** |
| Grupos | 1 (`GRP-SCZD`, «Sabatino Matutino»), apuntando a ese curso vacío |
| Alumnos | **2** |

Es decir: la academia estaba **marcada como migrada sin estarlo**. Una etiqueta
sin nada detrás. Por eso los alumnos leían del bundle por el fallback, y por eso
el alcance real de la operación eran dos personas y no doscientas.

**Lo ejecutado**, en cuatro pasos:

1. Sembrar la plantilla `paramedico-tum` — 288 docs (1 + 287 temas).
2. Clonarla a RES-2026 — 288 docs. **No se tocó** el curso vacío anterior: al
   estar en borrador no se sirve a nadie, y borrarlo es decisión de la academia.
3. **Reapuntar `GRP-SCZD.programaId`** al curso nuevo. Este paso NO está en el
   script y sin él los alumnos no verían nada. Se anotó el valor previo antes
   de tocarlo.
4. Verificar: `clonacion.completa=true; temas 287/287; faltantes: ninguno`.

**Lo que sobrevivió al viaje**, comprobado documento a documento:

| | |
|---|---|
| `estadoEditorial` | 104 en revisión · 178 borrador · 5 bloqueados — idéntico al generador |
| `propietario` | `rescate` en los 287 |
| Ficha `revision` | 287/287 |
| `tituloOficial` | 287/287 |
| Material | 268 temas con secciones, quiz y flashcards |
| **Validaciones docentes** | **Intactas.** Viven en `validaciones/`, que la migración no toca |

**Vuelta atrás**, si hiciera falta: `grupos/GRP-SCZD.programaId` de vuelta a
`RES-2026__r-e-s-c-a-t-e` y todos regresan al bundle en la siguiente recarga.

> **Lo que quedó pendiente y NO es técnico: los dos alumnos no están en ningún
> grupo.** `grupoId` vacío en ambos. El grupo existe y ya apunta al temario
> migrado, pero nadie está dentro, así que los dos siguen viendo «Necesitas un
> código de grupo». Eso era cierto antes de migrar y lo sigue siendo: a quién
> corresponde cada grupo lo decide la academia, no la migración.

### P1 — cómo se hizo (referencia para la próxima academia)

La maquinaria ya existe y está probada: plantillas versionadas,
`clonarPlantillaAAcademia` y la replicación (trabajo PLAN-LMS F9). Lo que falta
es **usarla con RESCATE**, que hoy sigue siendo una academia «sin migrar» y por
eso lee del bundle.

Hay que respetar el bloqueador de la Fase 3: Firestore rechaza arreglos
anidados, y las tablas ya viajan envueltas (`{ celdas: [...] }`). Cualquier campo
nuevo necesita el mismo trato.

Criterio de terminado: RESCATE abre cualquier lección por el camino de Firestore
(3 lecturas) y ninguna pantalla cae al bundle.

### P2 — Apagar el bundle · HECHO el 31-08-2026

> **Cerrado.** Criterio de terminado cumplido y medido sobre `dist/`:
>
> | | Antes | Después |
> |---|---|---|
> | Respuestas correctas descargables | 1 546 | **0** |
> | Explicaciones | 1 539 | **0** |
> | Tarjetas | 1 428 | **0** |
> | Títulos del temario | 287 | **0** |
> | Trozo de entrada | 3 037 kB | **712 kB** |
>
> Se hizo en tres frentes, no solo quitando el fallback:
>
> · El resolutor dejó de caer al bundle. Sin contenido propio no hay contenido
>   (`src/lib/contenidoVacio.js`), y eso es lo correcto: el bundle ERA el
>   temario de R.E.S.C.A.T.E., así que servírselo a otra academia le enseñaba
>   material ajeno creyendo que era el suyo.
> · La muestra de la portada pública salió del temario: ahora es un módulo
>   generado de 3 kB (`scripts/gen-demo-portada.mjs`), sin respuestas ni
>   tarjetas.
> · `navIndice.js` dejó de publicar los 287 títulos. Eran contenido de la
>   academia y estaban descargables aunque la interfaz no los pintara.
>
> `tests/fugaDelBundle.test.mjs` pasó de MEDIR la fuga a IMPEDIRLA: si alguien
> vuelve a enlazar el temario desde la aplicación —por comodidad o por un
> fallback «temporal»— esas pruebas fallan.


`src/data/contenido/` deja de ser una dependencia de la aplicación y pasa a ser
**material de siembra**: lo leen los scripts (`gen:plan`, `seed`, replicación) en
tiempo de construcción, no el navegador.

Esto toca los tres puntos donde hoy existe el fallback a legacy:
`src/lib/contenidoApi.js`, `src/lib/firebase/contenido.js` y
`src/context/ContenidoContext.jsx`. El fallback no se puede quitar a ciegas: una
academia sin migrar se quedaría con la pantalla en blanco en vez de con un
temario ajeno. La salida correcta es que «sin contenido propio» sea un estado
explícito y visible, no un silencio que se rellena solo.

Invariante que se conserva: **una academia migrada nunca cae al bundle.** Deja
de ser una regla de prudencia y pasa a ser trivial, porque el bundle ya no
existe.

Criterio de terminado: `grep -c "correcta:"` sobre `dist/assets/*.js` devuelve 0.

### P3 — Reglas de lectura por academia, grupo y programa · HECHO el 31-08-2026

> **Cerrado, y con la sorpresa de que las reglas ya estaban escritas.** Lo que
> faltaba no era código sino el despliegue: `firestore.rules` llevaba la cadena
> completa (`alumnoLeeCurso` = pertenece a la academia + curso `publicado` +
> el curso está en el programa de su grupo) y el staff exento por `esStaffDe`,
> pero producción seguía corriendo reglas viejas.
>
> **Pre-vuelo contra producción antes de tocar nada** (solo lectura), porque el
> riesgo no era la regla sino el dato:
>
> | Comprobación | Resultado |
> |---|---|
> | Staff activo | 10 (2 directores + 8 instructores), **todos con `academiaId = RES-2026`** |
> | Contenido | 287 temas, todos `aca=RES-2026 curso=RES-2026__paramedico-tum estado=publicado` |
> | Staff que perdería acceso | 5 — **los cinco con `estado=eliminado`**. Ningún profesor activo |
> | `agregados` | 0 documentos: nada que cerrar (ver la deuda de abajo) |
> | `plantillas*` | Sin `academiaId`, pero su regla es solo super-admin: no les afecta |
>
> **Verificado después del despliegue, con el cliente web y sin sesión**, que es
> como llega un visitante: `temas`, `cursos`, `agregados`, un tema suelto,
> `usuarios`, `grupos` y `plantillasTemas` responden todas
> `permission-denied`. **Cero colecciones legibles sin sesión.** La portada
> pública sigue cargando sin un solo error de consola.
>
> **Lo que P3 NO protege, y hay que decirlo:** las reglas no se aplican al SDK
> de administración. Quien tenga una clave de service account del proyecto lee
> todo, sin excepción. Por eso rotar la credencial que se filtró no es una
> tarea menor pendiente: es la otra mitad de este blindaje.

#### Deuda destapada por el pre-vuelo: los agregados están vacíos

La colección `agregados` tiene **0 documentos** en producción. Son las vistas
derivadas —glosario, buscador, banco de exámenes, mazo de flashcards, galería,
contadores— que existen para que abrir UNA lección no obligue a leer las 287
(Fase 1). Nunca se generaron para R.E.S.C.A.T.E. después de P1.

No bloqueaba P3 —no hay documentos que cerrar— pero hay que comprobar qué ven
hoy el buscador, el glosario y el banco de exámenes, y regenerarlos si están
sirviendo vacío.

### P3 — cómo estaba escrito (referencia)

Sacar el contenido del bundle solo sirve si Firestore no lo entrega igual de
abierto. La lectura de `temas` y de los agregados debe exigir sesión, membresía
de la academia dueña y un grupo cuyo `programaId` incluya ese temario — la
misma cadena que ya aplica `motivoSinPrograma`, ahora del lado del servidor.

Las suites de `tests/rules/` corren con emulador y Java 21 en CI. **Una suite
omitida no es una suite aprobada**: si el emulador no arranca, se reporta.

> **Trampa localizada antes de escribirla.** El staff NO tiene grupo:
> `grupoIds` es exclusivo de staff y los profesores validan sin pertenecer a
> ningún grupo de alumnos. Una regla que exija «grupo con ese `programaId`»
> sin exentarlos deja a los profesores fuera del material que están revisando,
> que es justo el trabajo que no se puede interrumpir. `RutaProtegida` ya los
> exenta en el cliente (`motivoSinPrograma`); la regla tiene que hacer lo
> mismo en el servidor.
>
> La lectura de `validaciones` se queda como está (`allow read: if true`): la
> etiqueta editorial se sirve también a quien no tiene sesión, y cerrarla
> dejaría al visitante viendo un aviso de revisión sobre material ya firmado.

### F1 — Dominio propio, Firebase Hosting y `BrowserRouter`

**El blindaje NO necesita Blaze.** Esto se aclara aquí porque el plan anterior
juntaba dos cosas distintas bajo una sola «F» y hacía parecer que había que
contratar antes de empezar.

`src/main.jsx:18` usa `HashRouter`, así que toda URL pública sería
`ptem.mx/#/paramedicos`: Google no indexa fragmentos y WhatsApp no genera vista
previa. Una portada comercial que no se busca ni se comparte no vende. GitHub
Pages no hace rewrites de SPA; Firebase Hosting sí, **y está en el plan gratuito**
con dominio propio y certificado incluidos.

El límite de Spark aquí no son las lecturas: es la **transferencia, 360 MB al
día**. Con el bundle actual de 3 MB eso da ~120 visitas diarias. Después de P2,
varios miles. Es decir que P2 no es que no exija Blaze: es lo que vuelve viable
la portada pública sin contratarlo.

> Confirmar las cifras del plan gratuito en la página de precios de Firebase
> antes de mover el dominio. Se han movido antes.

### F2 — Contratar Blaze

Se hace **cuando ya haya algo que medir**, no antes. Tres cosas lo exigen y
ninguna es el blindaje:

| Necesita Blaze | Por qué |
|---|---|
| Presencia en clase en vivo (**C**) | RTDB gratis corta en 100 conexiones simultáneas: con 200 alumnos no se puede ni ensayar |
| Webhook de la pasarela (**L**) | Exige Cloud Functions |
| Respaldos programados de Firestore | El export automático es de pago |

Al contratarlo: **alertas de gasto desde el primer día** y separar de verdad el
entorno de pruebas del de producción. Y con Blaze la cuota deja de cortar y
empieza a cobrar, así que el trabajo **J** (paginación de `/admin`) va pegado a
esta fase, no a F1.

### Lo que el blindaje consume en Spark

| Operación | Coste | Cuota Spark |
|---|---|---|
| Migrar RESCATE (P1) | ~350 escrituras, **una sola vez** | 20 000/día |
| Abrir una lección | 3 lecturas (medido en la Fase 1) | — |
| 200 alumnos × 10 lecciones | ~4 000 lecturas/día | 50 000/día |
| El temario en Firestore | unos pocos MB | 1 GiB |

Cabe con holgura. Y el consumo de red **baja**: hoy cada alumno se descarga
3 MB de JavaScript aunque abra una sola lección.

### P4 — Portada pública · HECHO el 30-08-2026

| Archivo | Qué es |
|---|---|
| `src/lib/carrerasModelo.js` | Catálogo de las seis carreras. Lógica pura |
| `src/pages/PortadaPTEM.jsx` | La raíz para quien llega sin sesión |
| `src/pages/CarreraPage.jsx` | Una vitrina para las cinco carreras sin temario |
| `tests/carrerasModelo.test.mjs` | 11 pruebas, incluidas las dos que importan |

**La raíz dejó de ser la portada de paramédicos.** Ahora `/` explica qué es
PTEM, lista las seis carreras y declara la alianza con R.E.S.C.A.T.E. La
portada de paramédicos **no se tocó**: vive íntegra en `/paramedicos`, con su
muestra de un tema real, y de paso salió de la entrada del bundle (ahora se
carga diferida, 7.6 kB en su propio archivo).

**Las rutas se generan desde el catálogo**, no se escriben a mano. Añadir una
carrera es una entrada en `carrerasModelo.js`: ni página nueva, ni ruta nueva,
ni un `if` suelto. El catálogo comprueba solo que ningún slug choque con una
ruta de la aplicación.

**`proteccion_civil` es por fin un tipo de programa.** Venía disfrazado de
`licenciatura` desde la Fase 3, que ya avisaba de que cambiaría; anunciarla en
la portada con el nombre de otra carrera habría sido incorrecto. Las dos
pruebas que guardaban ese dato avisaron solas, que es para lo que estaban.

**Dos pruebas sujetan la regla que de verdad importa:** una carrera sin temario
tiene que decirlo en su propio texto, y ninguna puede anunciar módulos, horas ni
número de temas. Es la versión comercial de la prohibición de CLAUDE.md de
inventar el alcance de un programa: una vitrina que calla equivale a una que
promete.

**Lo que queda de P4** son las URLs sin `#`, y eso es F1.

---

### P6 — Sello de propiedad · HECHO el 30-08-2026

Cada uno de los **287 nodos** declara ahora de quién es: `rescate`, `ptem` o
`terceros`. Hoy el reparto es `rescate 287`, y el generador lo imprime en cada
ejecución para que el día que deje de serlo se vea sin ir a buscarlo.

**El defecto es `rescate` a propósito.** Un tema sin sellar se trata como de la
academia: el error barato es no replicar algo replicable; el caro es replicar
material ajeno.

**Lo que casi se escapa.** Las claves que no se copian explícitamente en
`contenidoModelo` / `contenidoApi` / `agregadosModelo` **se pierden al viajar a
Firestore** —ya pasó con `estadoEditorial`, y por eso una academia migrada veía
todo su temario como borrador—. El sello se añadió en los cuatro puntos de paso;
sin eso, la migración de P1 lo habría borrado entero en una sola pasada. Hay una
prueba que lo comprueba.

---

### La fuga, ya medida

`tests/fugaDelBundle.test.mjs` recorre el grafo de imports desde
`src/main.jsx` —siguiendo también los `import()` diferidos, porque un chunk
diferido se sirve igual de abierto— y deja escrito el tamaño del problema:

**1 539 respuestas correctas, 1 539 explicaciones y 1 428 tarjetas**
descargables sin cuenta.

La prueba está **en verde a propósito**: afirma lo que hoy es cierto, no lo que
debería ser. Una prueba en rojo en `main` corta el despliegue, y el despliegue
está activo. **Cuando P2 funcione, esta prueba fallará** — ése es su modo de
avisar. Entonces se invierten sus dos aserciones y pasa a ser el guardián que
impide que la fuga se reabra.

---

### P9 — Portada central rediseñada · HECHO el 31-08-2026

No estaba en el plan: lo pidió el dueño del producto esa tarde, con una imagen
de referencia. `/` deja de ser una página de secciones y pasa a ser una portada
a sangre: fotografía a ancho completo, titular a tres alturas y banda inferior.

Lo que no es decorativo:

| Decisión | Por qué |
|---|---|
| Foto en AVIF/WebP a cinco anchos | El original pesaba 2,8 MB. A 800 px pesa 31 kB, y es el LCP de la raíz |
| El `<link rel=preload>` del `<head>` cambia de imagen | Precargaba la ilustración del paramédico, que en `/` ya no se pinta: era una descarga en prioridad alta compitiendo con la foto que sí es el LCP |
| No se elige la precarga por ruta | Exigiría un `<script>` en línea y la CSP del build lo prohíbe a propósito. Con F1 (BrowserRouter) cada ruta podrá llevar su `<link>` |
| `--topbar-h` pasa de 62 px a 64 | La variable mentía: la regla del tema pintaba la barra de 64. Esos 2 px asomaban entre la barra y la foto como una raya blanca, y descuadraban también el panel lateral y los `scroll-margin-top` |
| La barra sobre la foto es cristal, no transparencia | Transparente del todo, la barra dejaba de existir: no había forma de ver dónde acaba la navegación |

**«Cómo se vive PTEM»** sustituye al bloque de alianza. Son cuatro voces de uso
—alumno, docente, quien valida, la academia— y **no son testimonios**: no llevan
nombre, foto, estrellas ni generación, y su pie dice lo que son («Así estudia…»).
Una reseña inventada en la página que capta alumnos es publicidad falsa y el
desprestigio se lo come la academia. El día que haya testimonios reales, con
permiso de quien los firma, se cambia el arreglo `VOCES` y ya.

Tampoco afirma que el temario esté firmado: hoy los profesores están validando y
ninguna lección está publicada como definitiva.

**El botón de menú desaparece cuando el cajón no tiene nada que abrir.** Sin
sesión contenía un único enlace, «Inicio», que ya está en la barra de arriba. La
regla vive en `src/lib/menuLateral.js` con siete pruebas, y no pregunta «¿hay
sesión?» sino «¿ofrece el cajón algo que la barra no enseñe ya?»: así el botón
reaparece solo si mañana se añade un enlace de cajón para visitantes.

> **Lo que salió mal, para que no se repita.** Al fusionar, un `git checkout`
> con un stash a medio aplicar dejó marcadores de conflicto en
> `PortadaPTEM.jsx`, y un `git add -A` sin volver a mirar el estado los subió a
> `main`. El build de CI falló, así que **no llegó a desplegarse** y producción
> siguió sirviendo la versión anterior. Revertido en `9d7a8f8` y rehecho.
> La lección: después de cambiar de rama, mirar `git status` otra vez antes de
> `add -A`, y no dar por bueno un diff leído hace tres comandos.

### P5 — Optimización del arranque

Ya no incluye la no-indexación: eso se adelantó y está hecho en **P8**, porque
no dependía de nada y dejarlo para después era publicar el temario en Google
mientras se blindaba la puerta.

Lo que queda es peso, y **P2 ya se llevó la mitad**: el trozo de entrada bajó de
3 037 kB a 712 kB al sacar el temario. Medido sobre `dist/` el 31-08-2026, lo
que queda es esto:

| Trozo | Peso | Qué es |
|---|---|---|
| `index.esm` | 720 kB | SDK de Firebase. **La pieza gorda que queda** |
| `index` (entrada) | 712 kB | La aplicación |
| `init` | 221 kB | Arranque de Firebase |

Esta fase ya no espera a nadie y se ocupa del SDK: hoy entra entero aunque el
visitante de la portada no vaya a iniciar sesión.

### Lo que el bloque P NO incluye

- Cobrar a otras academias. Eso es **L**, y sigue donde estaba.
- Contenido de las otras carreras. Las vitrinas no lo prometen.
- Marca de agua por matrícula. Depende de **O1** y se hace ahí.
- Migrar a Next.js. **G** sigue sin comprometerse.

Y lo que el bloque P **todavía no** arregla, dicho aquí para que no se confunda
con estar resuelto: **Firestore sigue entregando el temario a quien sepa
pedirlo**. P7 blindó la interfaz, P2 cerró el archivo publicado, y la puerta del
servidor la cierra **P3**, que es lo único que falta.

---

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
- [x] **Partir el chunk de datos del bundle** — ya tiene dueño: es **P2**, y
      dejó de ser un asunto de peso para ser uno de seguridad. Medido en `dist/`
      el 30-08-2026: **1 546 respuestas de examen** descargables sin cuenta. El
      criterio de terminado y la prueba que lo vigila están en el bloque P.

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

**Protección Civil ya tiene tipo propio** (`proteccion_civil`), desde el
30-08-2026. Esta sección anunciaba que cambiaría en cuanto hiciera falta, y
hizo falta con **P4**: la portada pública lista las carreras desde
`META_PROGRAMA`, y anunciarla como «Licenciatura en Paramédicos» habría sido
incorrecto. Las dos pruebas que guardaban el dato avisaron solas.

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

> **Partido en dos el 30-08-2026.** **F1** (dominio + Firebase Hosting +
> `BrowserRouter`) **cabe en el plan gratuito** y es lo único que el bloque P
> necesita. **F2** (contratar Blaze) baja hasta donde de verdad hace falta:
> antes de **L** y **C**. El detalle está arriba, en el bloque P.

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

### Costo real, medido sobre este código (29-08-2026)

Se midió antes de comprometer las 3–5 semanas. **Lo que se muda intacto:**

| Capa | Tamaño | Qué pasa |
|---|---|---|
| `src/lib` | 14,293 líneas · 78 archivos | JS puro, sin React ni Vite: se muda tal cual |
| Pruebas | 13,925 líneas · 73 archivos, **solo 6 tocan React** | **El 92 % sobrevive intacto** |
| `firestore.rules` / `storage.rules` | — | Sin cambios |
| `src/index.css` | 8,648 líneas | CSS puro con variables; Next lo acepta casi tal cual |

**Lo que se reescribe: ~19,550 líneas de JSX** (33 pantallas = 8,053 · 62
componentes = 10,569 · contextos = 928). Pero el número de líneas no es el
problema; son estas cuatro cosas:

1. **React Router está en todo.** 47 archivos lo importan y hay **161 usos** de
   `useNavigate`, `useParams`, `Link` y `useLocation`. Ninguno es difícil
   aislado; son 161.
2. **Rompe todos los enlaces guardados.** Hoy es `HashRouter`: las URLs son
   `sitio/#/tema/m5-shock`. Next usa rutas reales. Cada marcador, cada enlace
   compartido y cada QR impreso dejan de funcionar, y `PLAN-LMS.md` §2 exige que
   `/tema/:id` sobreviva. Se arregla con un redirector, que es legado permanente.
3. **La autenticación es el costo escondido y el mayor.** **34 componentes usan
   `useAuth`**, y `AuthContext` está construido sobre `onAuthStateChanged` y
   `onSnapshot` **en el cliente**. Firebase Auth de cliente no le sirve al
   servidor: renderizar en servidor una página protegida exige sesión por
   cookie, una ruta que la emita, verificación con el Admin SDK y decidir
   pantalla por pantalla qué va en servidor. **Sin ese trabajo no hay beneficio
   de SSR**: quedaría Next.js renderizando en cliente, o sea lo mismo de hoy con
   otra sintaxis.
4. **Arrastra hosting y plan.** GitHub Pages no ejecuta servidor. Obliga a Vercel
   (uso comercial de pago) o Firebase App Hosting (exige Blaze). G no es
   independiente de F.

Más 17 usos de `import.meta.env` que pasan a `process.env.NEXT_PUBLIC_*`.

### Veredicto: reevaluar después de A, no comprometer

| Argumento a favor | ¿Se sostiene? |
|---|---|
| SSR hace desaparecer el temario pesado | **Es el argumento principal, y el trabajo A lo resuelve en días** |
| Rutas de servidor para PDFs, certificados, reportes | Real — pero **Cloud Functions también**, y llegan con Blaze |
| SEO | Un LMS tras login no lo necesita |
| TypeScript | **No requiere Next.js**: se puede adoptar hoy en `src/lib` con Vite |

**Recomendación registrada:** hacer A y volver a juzgar G con el peso ya medido.
Reescribir 19,550 líneas y rehacer la autenticación de 34 componentes para
llegar donde ya se está no se paga. G queda como «reevaluar», no como
comprometido.

---

## Trabajo H (antes «Fase 7») — Certificados con QR verificable · PENDIENTE

Necesita el trabajo F y un dominio propio. **2–3 semanas.** Absorbe la «Fase 8
— certificados digitales» de PLAN-LMS: es la misma función, mejor pensada.

> **Corregido el 30-08-2026: NO depende de la migración a Next.js (trabajo G).**
> La página pública de verificación es una ruta que lee `certificados/{folio}`
> con `allow read: if true`. Next.js haría que cargue sin descargar la
> aplicación entera —es el único sitio del producto donde el SSR se paga solo—,
> pero eso es una mejora, no una condición. Y **Python no interviene**: el PDF y
> el QR se generan en el cliente o en una Cloud Function en Node, que es lo que
> ya trae el trabajo F. Lo que da seriedad al certificado es el folio imposible
> de adivinar, la revocación y el dominio propio, no el framework.

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

## Trabajo A — Calidad editorial v2 · PENDIENTE

> Partir el bundle ya NO es parte de A: se lo lleva **P2**, que además lo hace
> por seguridad y no solo por peso. A pasa a depender de P2.

Detalle completo en `PLAN-LMS.md` §25. Resumen y lo que cambió al unificar:

**Primero la infraestructura, que además salda una deuda de la Fase 1.** El
bundle sirve el temario entero como un trozo de 3,037 kB (700 kB gzip, medido
el 29 de agosto). Los agregados de la Fase 1 no lo tocan: solo ayudan a una
academia migrada. Se parte el generador en estructura ligera + un archivo por
módulo + índice de búsqueda + banco de preguntas por módulo, y `src/data/index.js`
gana `getTemaCompleto()` asíncrono. Sin esto, enriquecer el temario lo llevaría
a 12-16 MB.

**Después el contenido, un lote por entrega.** Medido el 30-08-2026, el «lote 0»
está casi vacío: **`alcanceDeExamen` ya está cableado** en 12 de los 14 nodos de
evaluación —los dos que faltan son las prácticas de M2 y M5, que no llevan banco
de preguntas—, y **no queda ninguna lección vacía**: de los 19 «vacíos» que
cuenta el inventario, 14 son nodos de evaluación que por diseño no llevan prosa
y 5 son temas `bloqueado_por_decision` esperando a la academia (los cuatro de M7
y el taller de aminas de M4). Así que lo que queda es la pasada de calidad,
módulo por módulo, en este
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
- **J — Auditoría y coste de `/admin`.** Historial append-only, paginación y
  contadores. Comprobado el 30-08-2026: `src/lib/firebase/intentos.js:62` lee la
  colección `intentos` ENTERA y `usuarios.js:54` la de `usuarios`, sin un solo
  `limit()`. **La validación numérica de `intentos` YA ESTÁ HECHA** —llegó con
  PLAN-LMS F4—: las reglas comprueban tipos, rangos y la coherencia
  `porcentaje ≈ aciertos/total` con tolerancia de ±1, así que la frase «hoy
  permite inyectar un 100 % falso» ya no es cierta. De J solo queda paginar y
  auditar.
- **K — Tipo MEDICINA.** Organización por convocatoria e importación de
  temarios oficiales, nunca inventados.

---

## Trabajos L, M y N — Cobros, tienda e inventario · PENDIENTES

Propuesta del dueño del 29 de agosto de 2026: **prohibir la transferencia manual
al banco y que todo pago pase por la plataforma**, para acabar con los pagos
perdidos. Se acepta la idea; abajo van las cinco correcciones que se le hicieron
antes de planificarla.

**Decisiones tomadas:** solo cobra **RESCATE** por ahora (una sola cuenta de
pasarela, sin Stripe Connect ni Marketplace); **sin Odoo** —la academia no usa
ERP y un contador de existencias cubre uniformes e insumos—; y **sin base
relacional**: todo en Firestore, junto al resto.

### Dónde encaja: el gancho ya existe

`src/lib/accesoModelo.js::calcularAcceso()` es **la única función que decide si
un alumno entra**, y ya modela acceso con caducidad (`esPrueba` + `pruebaHasta`).
Añadir `accesoHasta` junto a esos campos es un cambio pequeño y contenido: no
hace falta un sistema de acceso nuevo ni middleware nuevo. Esa centralización ya
está hecha y es la parte difícil.

### Las cinco correcciones a la propuesta original

1. **No hace falta Next.js.** Un webhook necesita un endpoint de servidor, y eso
   es **una Cloud Function**, no un framework. Son dos funciones —recibir el
   webhook y registrar el cobro en efectivo—, no una migración. Es, eso sí, el
   argumento más fuerte a favor de tener servidor que ha aparecido: **hace del
   trabajo F un prerrequisito**, no algo tardío.
2. **Nada de base relacional.** Una tabla `Users` aparte daría dos fuentes de
   verdad sobre quién es un usuario, cuando roles, academias, grupos, progreso y
   reglas ya viven en Firestore. `Orders` y `Order_Items` mapean a colecciones y
   heredan el aislamiento por academia que ya funciona.
3. **Verificar la firma del webhook — esto era un agujero de seguridad.** La
   propuesta decía «tu código detecta el evento y suma 31 días». Tal cual,
   cualquiera que descubra la URL se regala acceso mandando un POST falso. El
   endpoint es la única puerta abierta a internet sin autenticación. Obligatorio:
   validar `Stripe-Signature` (o la firma de Mercado Pago) con el secreto
   compartido **antes de mirar el contenido**; **idempotencia**, porque las
   pasarelas reintentan el mismo evento y sin registro de eventos procesados un
   alumno acaba con 93 días por un pago; y **no confiar en el monto del payload**,
   sino contrastarlo con la orden emitida.
4. **El «+31 días» tiene dos errores.** Debe extenderse desde
   `max(hoy, vencimiento_actual)`, no desde hoy: si un alumno paga tres días
   antes de vencer, la fórmula original se los tira y enseña a pagar tarde. Y
   31 × 12 = 372 días, o sea una semana gratis al año por alumno: o se usa mes
   calendario o se decide a sabiendas.
5. **Lo fiscal, que es lo que no se planea.** El dinero debe caer en la cuenta de
   pasarela **de RESCATE**, no de PTEM: si PTEM cobra y reparte, maneja fondos de
   terceros, que es actividad regulada. Hay que decidir antes quién emite el CFDI
   al alumno que lo pida. Y **OXXO no es instantáneo** (de minutos a horas): el
   alumno pagará esperando entrar de inmediato, así que la pantalla debe decirlo
   o habrá quejas el primer día. Confirmar con contador antes de construir.

### Trabajo L — Suscripción y cobro · **la etapa que resuelve el problema**

~2 semanas. Es la única que ataca «quién pagó»; las otras dos son otro negocio.

- Pasarela (Mercado Pago o Stripe) con sesión de pago vinculada al `uid`.
- Referencias únicas de OXXO y CLABE dinámica para SPEI.
- Cloud Function de webhook: firma verificada, idempotente, que extiende
  `accesoHasta` con la regla del punto 4.
- **Panel de recepción**: buscar al alumno por nombre o matrícula y registrar el
  cobro en efectivo, ejecutando exactamente la misma función que el webhook.
  Queda registrado **quién lo cobró y cuándo** (mismo criterio que el resto de
  acciones sensibles del proyecto).
- Corte de caja y recibo al correo del alumno.

### Trabajo M — Tienda · ~2 semanas

Carrito, `ordenes` y `ordenesArticulos` en Firestore, uniformes e insumos de
botiquín, y **«recoger en instalaciones»** con alerta al panel de recepción
cuando el pedido esté listo. Puede incluir la mensualidad en el mismo carrito.

**Enlace con el trabajo B:** los insumos de la tienda son los mismos artículos
del botiquín virtual. Un solo catálogo, dos usos —estudiar y reponer—, y no dos
listas que se desincronizan.

### Trabajo N — Inventario · ~1 semana

Descuento de existencias al vender, alertas de reposición y exportación a hoja
de cálculo. Sin ERP. Si algún día la academia adopta Odoo para su contabilidad,
entonces sí se conecta con lo que ya use, que no es lo mismo que implantarlo.

### Efecto sobre el calendario

- **F (hosting + Blaze) sube de posición**: lo necesitan tanto C (60–150
  conectados simultáneos superan el corte de 100 de Realtime Database) como L
  (Cloud Functions para el webhook).
- **J sube con él.** En Spark, `/admin` leyendo `usuarios` e `intentos`
  completos sin límite se corta solo al agotar la cuota. En Blaze **ya no se
  corta: se cobra**. Paginar `/admin` deja de ser higiene y pasa a ser control
  de gasto.

---

## Trabajo O — Dashboard de Recepción · PENDIENTE · pedido el 30-08-2026

La academia registra asistencias y pagos **en papel**. Se pide una pantalla de
recepción operada a alta velocidad: buscar al alumno, marcarle entrada, cobrarle
y, si hace falta, dejarlo pasar hoy aunque deba. Más un feed en vivo de los
pedidos de la tienda y, a futuro, un escáner USB de códigos.

### Lo primero: esto ya estaba medio planeado

Conviene decirlo antes de estimar nada, porque cambia el precio:

| Se pidió | Ya estaba en el plan |
|---|---|
| Panel de recepción para cobrar en efectivo | **Trabajo L**, con «quién lo cobró y cuándo» y corte de caja |
| Bloquear al alumno que no está al corriente | **Trabajo L**: `accesoHasta` junto a `esPrueba`/`pruebaHasta` en `calcularAcceso()` |
| Aviso a recepción cuando un pedido está listo · «pago en caja» | **Trabajo M**, «recoger en instalaciones» |
| Que el profesor califique en clase | **Trabajo C**, con estados `evaluado` / `sin_responder` / `pendiente` |

**Genuinamente nuevo son tres cosas:** la matrícula secuencial, el check-in con
caducidad de 8 horas y el escáner. El resto es juntar en una sola pantalla lo
que ya tenía dueño. Por eso O no son «2 semanas de módulo nuevo» sino seis
piezas cortas, de las que **tres se pueden empezar sin esperar a la pasarela**.

Y una pieza clave ya existe y está probada: `src/lib/accesoModelo.js::calcularAcceso()`
es **la única función que decide si un alumno entra**. No hace falta un sistema
de acceso nuevo ni middleware nuevo; hace falta un campo más y una rama más.

---

### La decisión de stack, que hay que tomar antes de escribir una línea

La petición del 30 de agosto describe el stack como **Next.js + TypeScript +
Tailwind, con Python y base de datos relacional**. El proyecto de hoy es **Vite +
React + JavaScript, con Firestore**, y el 29 de agosto ya se decidió lo contrario
en dos puntos concretos (apartado «Trabajos L, M y N»): *sin base relacional* y
*«no hace falta Next.js: un webhook es una Cloud Function, no un framework»*.

No se resuelve solo. Son tres caminos con precios muy distintos:

| Camino | Qué cuesta | Qué se gana |
|---|---|---|
| **1. Construir O sobre lo que hay** (Vite + Firestore + Cloud Functions en Node) · **recomendado** | Nada extra. Las seis piezas suman ~3 semanas | Recepción funcionando este mes. Roles, aislamiento por academia, reglas y `calcularAcceso` ya están construidos y con pruebas |
| **2. Migrar a Next.js primero, luego O** | +3-5 semanas de migración (trabajo G) **antes** de que recepción exista | Se escribe la pantalla una sola vez. `src/lib` (14 293 líneas) y el 92 % de las pruebas se mudan intactas; se reescriben las pantallas y el enrutado |
| **3. Añadir Python + base relacional** | Segundo runtime, segundo despliegue, verificar el token de Firebase en Python, y **dos fuentes de verdad** sobre quién es un usuario | Ninguna de las cinco exigencias de O lo pide. Roles, academias, grupos, progreso y reglas ya viven en Firestore |

**Recomendación: camino 1.** Ningún requisito de O necesita SQL ni Python.
«Matrícula secuencial» suena a `AUTO_INCREMENT`, pero en Firestore se resuelve
con un documento contador y una transacción, y a escala de una academia eso
sobra. Lo único que de verdad necesita servidor es el webhook de la pasarela, y
eso es **una Cloud Function**, que llega con el trabajo F.

**Sobre Python y los certificados**, que es donde surgió la pregunta: la página
pública de verificación del trabajo H **no necesita Next.js ni Python**. Es una
ruta pública que lee `certificados/{folio}` con `allow read: if true`. Next.js
ayudaría a que esa página cargue sin descargar la aplicación entera —es el único
sitio del producto donde el SSR se paga solo—, pero es una mejora, no un
requisito. Lo que da seriedad al certificado no es el framework: es el folio
imposible de adivinar, la revocación y el dominio propio.

---

### O1 — Matrícula secuencial · 1-2 días · dificultad baja

Siete dígitos rellenos con ceros (`0000001`). En Firestore no hay
autoincremento: un documento `contadores/{academiaId}` y una transacción que lee
y suma. Soporta cómodamente el ritmo de inscripción de una academia (el límite
real es ~1 escritura por segundo sostenida **sobre ese documento**, no sobre la
base).

- Campo `matricula` en `usuarios/{uid}`, inmutable desde el cliente por reglas.
- **Relleno de los alumnos que ya existen**: un script como los de `scripts/`,
  en seco por defecto, ordenando por fecha de alta.
- Índice para buscar por matrícula, y búsqueda por prefijo con consulta de rango.

**Riesgo:** que dos academias tengan el mismo `0000001`. **Decisión necesaria:**
¿la matrícula es única por academia (lo coherente con el aislamiento que ya
existe) o única en toda la plataforma? Si es por academia, la credencial impresa
tiene que llevar también la academia.

### O2 — Bloqueo por pago + bypass auditado · 3-5 días · dificultad media

- `accesoHasta` (fecha) en el perfil, leído por `calcularAcceso()`.
- `bypassHasta`, `bypassPor` y `bypassMotivo` para el botón «permitir acceso por
  hoy». **Auditado siempre**: quién lo concedió y cuándo, mismo criterio que el
  resto de acciones sensibles del proyecto.
- El cierre de sesión en caliente ya está resuelto para las cuentas de prueba
  (`msParaVencerPrueba`): se reutiliza el mismo patrón, o el alumno vencido
  seguiría leyendo hasta recargar la página.

**Riesgo alto, y hay que decirlo:** ésta es la función más peligrosa de todo el
producto. Un fallo aquí no molesta, **deja a un alumno fuera de su clase**. Pide
un periodo de gracia configurable, una pantalla que diga con claridad qué pasó y
a quién acudir, y un camino de desbloqueo que recepción pueda ejecutar en
segundos. **Decisión necesaria:** ¿cuántos días de gracia, y bloquea también al
alumno que está a mitad de un examen?

### O3 — Check-in de 8 horas · 3-5 días · dificultad media

`asistencias/{id}`: `uid`, `academiaId`, `grupoId`, `inicio`, `expira`
(= inicio + 8 h), `registradoPor`, `medio` (`manual` | `codigo`).

**«En clase» se DERIVA de `expira > ahora`; no es un campo booleano.** Un
booleano exigiría un proceso que lo apague, y en Spark no hay ni TTL ni cron:
alguien se quedaría «en clase» para siempre. Derivarlo de la marca de tiempo no
cuesta nada y no puede desincronizarse.

Es lo que habilita la regla pedida: **el profesor solo califica al alumno con la
bandera activa**. Eso ata O3 al trabajo C, y por eso C pasa a depender de O3.

**Riesgo:** si el check-in falla o alguien llega tarde, el alumno se queda sin
poder ser calificado. El profesor necesita una anulación manual, registrada.
**Decisiones necesarias:** ¿8 horas fijas o hasta el fin de la jornada? ¿Qué
pasa si alguien hace check-in dos veces el mismo día? ¿Y si una clase pasa de
medianoche?

### O4 — Pantalla de Recepción · 1 semana · dificultad media

Rol nuevo `recepcion` y ruta `/recepcion`. Buscador enfocado al abrir,
operable **sin ratón**, con el resultado y sus tres botones —Check-in, Cobrar,
Permitir hoy— alcanzables por teclado.

Archivos que toca el rol nuevo: `src/lib/roles.js` (`ROLES`, `ROLES_DIRECTOR`,
`ETIQUETA_ROL`), `src/lib/capacidades.js`, el enrutado del panel y
`firestore.rules`.

> **Aviso de arquitectura, para no repetir un error conocido.** En las reglas,
> `esStaffDe()` hoy significa «instructor o director», y con eso se abre la
> lectura de `temas`, `cursos` y `dictamenes`. **Meter `recepcion` dentro de
> `esStaffDe()` le regalaría a recepción el temario completo.** Necesita
> predicado propio (`esRecepcionDe()`) con acceso a `usuarios`, `asistencias`,
> `pagos` y `ordenes` de su academia, y a nada más.

Responsivo de verdad: se opera en un mostrador, a veces desde una tableta. Vale
la regla que ya se aplicó en la barra de revisión —rejilla en pantalla estrecha
y objetivos táctiles de 44 px— y **una sola columna por debajo de 900 px**, con
el buscador fijo arriba.

### O5 — Feed de logística de tienda · 3-5 días · dificultad media · depende de M

Barra lateral en vivo con la línea de tiempo del pedido: `comprado` →
`en_sucursal` → `entregado`, más `pago_en_caja` pendiente de cobro.

Se resuelve con **un `onSnapshot`** sobre `ordenes` de esa academia filtrando lo
ya entregado. No hace falta websocket propio ni sondeo: Firestore ya empuja, y
se paga por documento que cambia, no por minuto abierto. Confirmar el cobro
físico desde la alerta ejecuta **exactamente la misma función que el webhook**
(decisión ya tomada en el trabajo L; no se duplica la lógica de cobro).

**Riesgo:** una pestaña abierta todo el día con un listener mal filtrado se come
la cuota. Filtrar por academia **y** por estado, y cerrar el listener al salir.

### O6 — Credencial con código + escáner USB · 1-2 días · dificultad baja

Un escáner USB de QR/código de barras **es un teclado**: escribe el código y
pulsa Enter. Si el buscador de O4 nace enfocado y operable por teclado, el
escáner funciona el día que se compre, sin driver ni integración. El software
casi no es el trabajo.

Lo que sí hay que diseñar es **la credencial**, y ahí hay una trampa: si el
código impreso es la matrícula, cualquiera que vea la credencial de otro puede
teclear su número y hacerle check-in. **El código debe ser un identificador
opaco** guardado junto al perfil, no la matrícula visible.

---

### Lo que hace falta de la academia para el trabajo O

| Para | Hace falta |
|---|---|
| O1 | Decidir si la matrícula es única por academia o global · confirmar que 7 dígitos es lo que se quiere imprimir |
| O2 | Días de gracia · qué se le enseña al alumno bloqueado · quién puede conceder el bypass |
| O3 | Si son 8 horas fijas o jornada · qué hace el profesor cuando falta el check-in |
| O4 | Quién será `recepcion` · si opera en computadora, tableta o las dos |
| O5 | Catálogo de la tienda (el mismo del botiquín, trabajo B) |
| O6 | Si se imprimen credenciales, y con qué diseño |
| **Todo O** | **La decisión de stack de arriba.** Es la única que bloquea de verdad |

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
- ~~¿Protección Civil necesita tipo de programa propio?~~ **Sí**, resuelto el
  30-08-2026 con P4.
- **¿Las academias reales están migradas o en `legacy`?** Determina si el ahorro
  de la Fase 1 ya aplica o si primero hay que migrarlas. **Es la misma pregunta
  que responde P1**, así que deja de ser una duda suelta: se contesta al
  ejecutarlo.

---

## Cómo verificar cualquier cambio de estas fases

```bash
npm test
npm run build
npx firebase-tools@15 emulators:exec --only firestore,storage --project ptem-rules-test "node --test tests/rules/*.test.mjs"
```

Las pruebas de reglas necesitan **Java 21**. No declares como aprobada una suite
que se omitió: el job de CI lo comprueba explícitamente.
