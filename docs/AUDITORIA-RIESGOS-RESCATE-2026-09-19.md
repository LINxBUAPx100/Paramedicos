# Auditoría de riesgos de Academia RESCATE

Fecha: 19 de septiembre de 2026. Alcance: clonación del material y del sitio, autorización, privacidad, integridad académica, continuidad y operación.

## Dictamen

**Hay una exposición crítica confirmada: el repositorio de GitHub es público y permite descargar el archivo del temario sin autenticarse.** Eliminar el temario del JavaScript de la web fue una protección correcta, pero no cierra la publicación de sus fuentes en GitHub.

Consulta anónima realizada durante esta auditoría:

- La API pública de GitHub devolvió `private: false`, `visibility: public`, `default_branch: main`, `has_pages: true` para `LINxBUAPx100/Paramedicos`.
- La lectura del archivo `src/data/planRescate.js` de `main` devolvió HTTP 200, 5 599 124 caracteres y presencia de `secciones` y `correcta`.
- `forks_count: 0` no demuestra ausencia de descargas, copias locales, capturas o republicaciones.

No hace falta vulnerar Firebase ni obtener una cuenta de alumno para explotar esta exposición. Se recomienda contenerla antes de distribuir más material reservado. **No se cambió la visibilidad del repositorio**, porque el encargo es de auditoría y el cambio puede afectar GitHub Pages según el plan contratado.

Una web que el navegador puede mostrar siempre permite alguna reproducción de su apariencia. Un alumno autorizado también puede capturar o transcribir el material que recibe. El objetivo alcanzable es reducir la entrega no autorizada, limitar el alcance de cada cuenta, dificultar extracción masiva, atribuir copias con cautela y disponer de evidencia y procedimientos de respuesta. No existe un candado de navegador que garantice que nadie copie.

## Alcance y límites de la evidencia

Se inspeccionaron las reglas locales de Firestore y Storage, rutas, acceso, carga y caché de contenido, archivos, validaciones docentes, evaluaciones, términos, dependencias, CI y fuentes estáticas. Se hicieron consultas anónimas a GitHub, a la portada publicada y a una imagen académica pública. No se intentó explotar la base de producción, registrar usuarios, modificar datos ni extraer información de alumnos.

En este documento:

- **Confirmado externo:** observado en una respuesta pública real durante la auditoría.
- **Confirmado en código:** el defecto está en el árbol local. Su presencia en producción requiere contrastar las reglas y la versión desplegadas.
- **Pendiente de consola/organización:** no puede decidirse leyendo el repositorio. No equivale a afirmar que el control no exista.

No es una certificación de ausencia de vulnerabilidades, una revisión clínica de las 268 lecciones ni una comprobación jurídica de contratos. Tampoco se auditó exhaustivamente todo el historial Git, todos los dispositivos, cuentas, proveedores o materiales de Drive.

Prioridades: P0 = contener inmediatamente; P1 = corregir antes de confiar material reservado o funciones sensibles; P2 = endurecimiento y operación posterior. La gravedad depende del impacto y de las condiciones descritas, no de una puntuación estadística inventada.

## Hallazgos prioritarios

### R01 — P0 / Crítico: fuente y temario accesibles en GitHub

**Confirmado externo.** Repositorio público y descarga anónima del temario verificadas. La estructura, prosa y campos de respuestas están disponibles fuera del control de matrícula. El código fuente reduce además el trabajo necesario para copiar la plataforma y adaptarla a otra academia.

**Medida:** mantener las fuentes y contenido exclusivo en repositorios privados, con acceso mínimo. Antes del cambio, comprobar el plan de GitHub y la continuidad de Pages. Una opción a evaluar es origen privado y publicación exclusiva de artefactos estáticos revisados, nunca de fuentes académicas. No basta borrar un archivo del último commit: puede permanecer en historia, ramas, etiquetas o copias externas. Esta auditoría no autoriza reescribir historia ni retirar archivos.

**Cierre verificable:** una sesión anónima no puede leer el repositorio, sus archivos ni fuentes reservadas; la web continúa funcionando; revisar otras ramas, artefactos y ubicaciones públicas. Esto no recupera copias previas.

### R02 — P1 / Alto: suspender en pantalla no revoca toda lectura en el servidor

**Confirmado en código.** `src/lib/accesoModelo.js:81` comprueba el estado del perfil y `:92` el de la academia. En cambio, `firestore.rules:74`, `:82`, `:93` y `:144` autorizan por rol, pertenencia, prueba temporal y programa, sin exigir esos estados activos. `storage.rules:47` tiene la misma carencia de suspensión.

Un usuario suspendido que conserve su sesión, academia y grupo puede satisfacer las condiciones de lectura de los temas publicados de su programa. Un instructor suspendido puede conservar ramas de permiso de staff. Se trata de nuevas peticiones autorizadas por las reglas locales, no solamente de una copia antigua en su navegador.

**Medida:** centralizar estado activo del usuario y academia en las reglas aplicables; definir revocación también para staff y administración. Añadir pruebas negativas de usuario suspendido, academia suspendida y sesiones ya abiertas, junto con pruebas de recuperación. Publicar las reglas manualmente en Firebase y verificar la versión efectiva. Deshabilitar Auth por sí solo no sustituye diseñar la revocación de permisos.

### R03 — P1 / Alto: ocultar temas por grupo no es una barrera de confidencialidad

**Confirmado en código.** `src/lib/useVisibilidad.js` filtra `temasOcultos` y `modulosOcultos` en React. `firestore.rules:144` solo exige pertenencia, publicación y programa; no consulta esas listas al leer temas. En las reglas las listas aparecen para autorizar su modificación, no para denegar lecturas.

Un alumno del mismo programa puede solicitar directamente un tema publicado aunque la navegación de su grupo lo oculte. La afirmación «solo lo ve mi grupo» de `src/lib/alcanceContenido.js` describe visibilidad de interfaz, no aislamiento real de datos.

**Medida:** decidir si la ocultación es solo pedagógica o confidencial. Si protege material, rediseñar permisos y consultas por tema/grupo y separar agregados que puedan transportar contenido restringido. Firestore no recorta automáticamente los resultados de consultas según reglas: hay que adaptar las consultas. Probar lecturas directas y agregados.

### R04 — P1 / Alto: validación docente más amplia en reglas que en interfaz

**Confirmado en código.** `firestore.rules:1370` permite escribir `validaciones/{academiaId}` a todo `esStaffDe(docId)`. El comentario confirma que el pase temporal del revisor se comprueba solo en la aplicación. No exige el pase, su vigencia, identidad del firmante, forma de cada validación ni un cambio limitado por tema.

Un instructor de esa academia puede escribir o borrar validaciones directamente aunque el flujo visual no le permita firmar. Según `src/lib/firebase/validaciones.js`, esas validaciones eliminan el aviso de revisión e incorporan temas al banco elegible. Es un riesgo de integridad clínica y de reputación, además de autorización.

**Medida:** exigir autorización docente vigente en servidor, identidad no suplantable y un registro por acto de revisión con referencia a la versión del contenido. Probar rechazo de instructor sin pase, pase vencido, firma ajena y borrado no autorizado. No cambiar estados editoriales durante esta auditoría.

### R05 — P1 / Alto condicionado: archivos sin aislamiento por curso o grupo

**Confirmado en código; exposición efectiva del bucket pendiente.** `storage.rules:104` permite leer cualquier objeto bajo la academia a cualquiera que pertenezca a ella. No distingue curso, grupo, tema publicado ni alumno sin grupo. La escritura del instructor tampoco limita `cursosPermitidos` en Storage.

**Medida:** antes de habilitar almacenamiento reservado, incorporar curso/tema al modelo de rutas o metadatos y verificar acceso contra Firestore. Incluir pruebas entre cursos de la misma academia, sin grupo, suspensión y profesor con permisos de otro curso.

`src/lib/archivosModelo.js:36` deja Storage apagado salvo `VITE_STORAGE_ACTIVO=1`; el workflow no suministra esa variable. No se comprobó en consola si existe un bucket activo ni sus reglas desplegadas. Este hallazgo no afirma una fuga actual desde Storage.

### R06 — P1 / Alto: no existe una entrega completa del visor protegido anunciado

**Confirmado en código.** `src/lib/materialTema.js` describe enlaces firmados de vida corta, marcas por alumno y rastro de aperturas; también asigna `protegido: true` al normalizar archivos. La búsqueda de consumidores encontró la validación del modelo, pero no un visor, firma de enlaces o registro de apertura conectado a páginas/componentes. `marcaDeAgua` construye un texto: eso no incorpora una marca al documento.

La subida implementada en `src/lib/firebase/almacen.js:61` usa `getDownloadURL`. No es una implementación de enlace firmado temporal por alumno. No debe presentarse el modelo puro como una protección entregada.

**Medida:** corregir las promesas antes de cargar material reservado; diseñar una entrega autenticada realmente cableada. Para archivos sensibles, evaluar descarga mediante SDK autenticado y control de acceso, evitando repartir enlaces duraderos. Si se requieren firma temporal o marcas incrustadas en cada copia, evaluar arquitectura y presupuesto: no guardar una credencial de firma dentro del cliente. Una marca HTML superpuesta puede retirarse; incluso una marca incrustada no prueba por sí sola quién filtró el archivo.

### R07 — P1 / Alto: imágenes académicas y enlaces externos tienen protección independiente

**Confirmado externo:** la imagen `imagenes/m2/sistema-conduccion.svg` del sitio publicado respondió HTTP 200 sin sesión. `public/imagenes` se distribuye como contenido estático y `src/lib/img.js` lo documenta. Hacer privado GitHub no protege esos archivos si continúan publicados por Pages.

Los enlaces de Drive u otros proveedores dependen de los permisos del proveedor. No se inspeccionaron esos permisos. Las imágenes externas pueden pasar por `wsrv.nl`; no se deben enviar a ese proxy direcciones privadas ni tokens de descarga.

**Medida:** separar muestras públicas, recursos redistribuibles y material exclusivo; servir lo exclusivo mediante autorización real. Revisar permisos de cada recurso externo. Mantener créditos y licencias de terceros: un recurso abierto de terceros no se vuelve exclusivo por aparecer en RESCATE.

### R08 — P1 / Alto: copia por usuarios autorizados y cuentas compartidas

**Limitación estructural confirmada.** El alumno recibe datos legibles, imágenes y reactivos para estudiar. Las consultas a temas y agregados pueden entregar material de su programa. `src/data/terminos.js` reconoce que no hay monitoreo de IP ni conteo de sesiones simultáneas. Las prohibiciones contractuales no ejecutan por sí mismas un bloqueo técnico.

**Medida:** matrículas individuales, menor alcance por cuenta, revisión de altas y permisos, mecanismos efectivos de suspensión, señales de extracción anormal y proceso de incidentes. Establecer privacidad y retención antes de implantar monitoreo. Las cuotas de sesiones, límites por usuario y trazabilidad confiable exigen diseño y pueden necesitar servicios fuera de la arquitectura actual.

No recomendar bloquear clic derecho, impedir selección, ofuscar JavaScript o esconder la clave pública de Firebase como protección principal. Tampoco prometer bloqueo universal de capturas, OCR o fotografía de pantalla.

### R09 — P1 / Alto: autoridad total concentrada en una cuenta

**Confirmado en código; protección de la cuenta pendiente.** `firestore.rules:40`, `storage.rules:27` y `src/lib/firebase/supremos.js` reconocen una cuenta suprema por correo verificado. Su compromiso permite acceder a las ramas globales, cambiar material, permisos y respaldos. No se reproduce aquí el correo para no ampliar su difusión.

La verificación del correo es un control correcto; no demuestra MFA, recuperación segura, separación entre uso personal y administrativo ni custodia institucional. `FIREBASE.md` deja MFA como recomendación pendiente.

**Medida:** verificar MFA/passkeys y recuperación de GitHub, correo y Google Cloud, revisar IAM y colaboradores, reducir cuentas globales, custodiar recuperación y definir sucesión. Revisar el mecanismo de privilegio supremo y su revocación; suspender un perfil no invalida por sí solo la rama basada en correo.

### R10 — P1 / Alto pendiente: App Check y reglas efectivas no comprobadas

`src/lib/firebase/init.js` inicializa App Check únicamente con una clave configurada. `.github/workflows/deploy.yml` la declara opcional. Eso no acredita que Firebase exija tokens válidos ni que las reglas revisadas aquí estén publicadas.

**Medida:** revisar consola, métricas, dominios autorizados, restricciones de APIs, reglas desplegadas e IAM; activar exigencia de App Check después de verificar clientes legítimos. No activarlo a ciegas y dejar a los alumnos fuera. App Check reduce algunos abusos, no elimina todos ni evita que un alumno autorizado copie.

La configuración pública `VITE_FIREBASE_*` no es una credencial administrativa. Rotarla sin cerrar autorización no resuelve la filtración del temario.

### R11 — P1 / Alto para acreditación: resultados de examen confiados al cliente

**Confirmado en código.** `firestore.rules:1097` valida que total, aciertos y porcentaje tengan consistencia aritmética, pero no recalifica respuestas contra un banco privado. Un cliente puede enviar un resultado coherente que no provenga de un examen real. Las respuestas viajan al cliente; `src/pages/ExamenPage.jsx` lo advierte.

**Medida:** mantener estos intentos como autoevaluación. Si deben respaldar acreditación, pagos, promoción o certificados oficiales, separar evaluación formal, banco privado, ejecución controlada y calificación confiable en servidor o procedimiento docente. No equiparar esto a un permiso de alumno para modificar `calificaciones`: esa colección tiene reglas separadas.

### R12 — P1 / Alto: control editorial no equivale a validación clínica

El inventario ejecutado arroja 268 lecciones con material; 178 nodos en borrador, 104 en revisión y 5 bloqueados. No se observó validación/publicación en la semilla local. Esto no certifica el estado de las copias de academias en Firestore ni de sus validaciones sobrepuestas.

`src/lib/validacionesModelo.js:83` admite reemplazar referencias faltantes con una traza de firma. Esa traza identifica un acto de revisión, pero no es evidencia bibliográfica. Las firmas tampoco quedan ligadas aquí a un hash inmutable del texto clínico.

**Medida:** revisión docente de contenido crítico, evidencia por afirmación, responsable y versión, caducidad/revisión de guías y retiro de aval al modificar material relevante. Conservar avisos y bloqueos. No se hizo una nueva validación de dosis o procedimientos ni se alteraron lecciones.

### R13 — P1 / Alto pendiente: continuidad, gasto y recuperación

La arquitectura depende de Firebase, GitHub Pages, cuentas administrativas y algunos proveedores externos. La extracción automatizada también puede agotar cuotas o aumentar gasto. El plan técnico deja respaldos y Blaze como trabajo pendiente; no se verificaron copias externas ni ejercicios de restauración.

`respaldos` en la misma base, con acceso de superadmin, ayuda a revertir operaciones, pero no sustituye una copia independiente ante robo de esa cuenta o pérdida del proyecto.

**Medida:** inventario de propietarios, respaldo cifrado fuera de la cuenta operativa, restauración ensayada, objetivos de pérdida/recuperación acordados, alertas y respuesta al consumo anormal. Separar caché, reversión editorial y respaldo de desastre.

Firebase documenta que Storage requiere Blaze, con el cambio aplicable desde el 3 de febrero de 2026. El propio proyecto mantiene la subida apagada por esa limitación. Los cálculos fijos de transferencia y cambio en `materialTema.js` son aproximaciones, no cotización actual ni límite de gasto. Las alertas de presupuesto no deben presentarse como garantía de tope.

## Otros riesgos relevantes

| ID / prioridad | Evidencia y alcance | Medida y criterio de cierre |
|---|---|---|
| R14 / P1: privacidad de validaciones | `firestore.rules:1371` permite lectura anónima del documento completo. `validaciones.js` incluye nombres, UID, comentarios, fuentes y fechas, además del estado. No se extrajeron datos reales. | Separar ficha pública mínima y revisión interna; probar que comentarios e identificadores internos no sean públicos. |
| R15 / P2: caché en equipo compartido | `cacheContenido.js` persiste lecciones/agregados en IndexedDB. `firebase/auth.js:81` solo llama a `signOut`; los consumidores encontrados de `limpiarCache` invalidan por versión/curso, no por cierre de sesión. | Limpiar datos de estudio al salir y definir retención/uso de equipos compartidos. Esto reduce residuos, pero no borra copias voluntarias del alumno. No se demostró acceso de otra cuenta desde la interfaz. |
| R16 / P1: dependencias con avisos | `npm audit` identificó 16 paquetes señalados: 6 altos y 10 moderados. Con `--omit=dev`: 2 moderados (`react-router`, `react-router-dom`), 0 altos. | Evaluar cada ruta vulnerable y actualizar con pruebas. Los 6 altos no demuestran 6 fallos explotables de la web estática. Vite/esbuild afectan especialmente el entorno de desarrollo; no exponerlo. No ejecutar `npm audit fix --force` indiscriminadamente. |
| R17 / P2: despliegue manual desde otra rama | El workflow permite build si es `workflow_dispatch` **o** `main`. Un disparo manual puede publicar otra rama; Actions usa etiquetas mayores y `firebase-tools@15` sin versión exacta. Las reglas no se despliegan en ese workflow. | Restringir ramas/entorno y aprobar publicación; fijar acciones/versiones verificadas; comprobar paridad de reglas. La afirmación antigua de que todo push despliega no es correcta: todo push prueba, el despliegue tiene esta condición. |
| R18 / P2: encuadre del sitio y dependencias remotas | La portada respondió sin cabeceras CSP ni X-Frame-Options; sí tiene CSP en meta. `vite.config.js` no protege `frame-ancestors` por cabecera. Three.js se carga de jsDelivr, fijado a versión, sin comprobación independiente del contenido descargado. | Evaluar protección contra encuadre engañoso en un alojamiento con cabeceras; revisar recursos externos. Una CSP no evita que copien la apariencia. No se probó un ataque de clickjacking. |
| R19 / P1: trazabilidad incompleta | El historial se escribe desde el cliente y algunas operaciones toleran su fallo con `.catch(() => null)`. Las reglas de historial no obligan atómicamente a registrar cada cambio. Las lecturas del material no tienen un registro de aperturas implementado en el visor anunciado. | No prometer detectar quién extrajo todo ni auditoría imposible de eludir. Definir eventos, retención y registro confiable; verificar cambios directos y fallos de red. |
| R20 / P1 pendiente: titularidad, licencias y privacidad | Los términos distinguen software del desarrollador, material de RESCATE y recursos de terceros. Señalan pendiente de revisión el aviso integral. No se comprobaron contratos, consentimiento de imágenes/personas, permisos de manuales, autorización de marca o procedimientos de atención de derechos. | Acordar por escrito titularidad/licencia de explotación y continuidad; revisar textos y materiales con responsables jurídicos. Preparar evidencia de autoría y canal de denuncia. No asumir que citar un libro autoriza redistribuirlo ni que los términos actuales garantizan una reclamación. |
| R21 / P1 pendiente: invitaciones y personal | Los códigos dan acceso a quien los posea; existen rutas de alta por grupo, invitación y prueba. Hay generación criptográfica, pero un código compartido o una cuenta de instructor permiten exposición dentro del alcance autorizado. | Inventariar accesos vigentes, preferir invitaciones acotadas, caducidad y usos; rotar ante filtración; revisar altas y baja de personal. Probar revocación efectiva junto con R02. |
| R22 / P2: secretos, historia y material opaco | La búsqueda limitada de claves privadas/tokens no produjo coincidencias en los archivos inspeccionados; se excluyeron `.git`, dependencias, build, caché, temporales y `.env*`. Siguen versionados `.botiquin-archive-00.part` a `-06.part` y `.botiquin-payload-00.b64`. | Escaneo de secretos e inventario histórico autorizado, sin mostrar valores. No declarar el historial limpio ni asumir contenido seguro de cargas opacas. No se borró ni decodificó ese material. |

## Controles que sí existen y deben conservarse

- Rutas protegidas y separación de roles en interfaz, acompañadas de reglas de datos; no basta la ruta por sí sola.
- Reglas que limitan temas publicados por academia y programa, y excluyen pruebas vencidas.
- Pruebas que impiden importar el temario completo en el grafo de la aplicación y conservan una muestra pública limitada. Pasan sus aserciones observadas; R01 es una vía diferente.
- Editor con permisos por capacidad/campo y aislamiento de plantillas para superadmin.
- CSP de producción, fuentes locales, ausencia de coincidencias de `dangerouslySetInnerHTML`, `eval(` o `new Function` en la búsqueda de `src`, y controles de enlaces.
- Tipos/tamaño de archivos permitidos y rutas por academia; no equivalen a antivirus ni análisis de contenido real del archivo.
- Códigos generados con `crypto.getRandomValues`, correo verificado para el privilegio supremo, términos versionados y advertencias de revisión académica.
- CI con pruebas unitarias y emulador, y build condicionado a pruebas. No demuestra qué reglas están hoy en Firebase.

## Qué puede copiar cada actor

| Actor | Situación observada o capacidad | Protección realista |
|---|---|---|
| Visitante sin cuenta | Fuente y temario del repositorio público; apariencia, recursos públicos y muestra del sitio. | Cerrar fuente/material reservado y revisar lo publicado. La interfaz pública seguirá siendo reproducible. |
| Alumno de RESCATE | Lo autorizado a su programa, capturas/transcripción y posibles lecturas de temas ocultos por R03. | Permisos efectivos, entrega acotada, trazabilidad proporcionada y respuesta a filtraciones. |
| Alumno suspendido | Las reglas locales mantienen caminos de lectura si conserva pertenencia/programa y sesión válida. | Corregir R02 y probar denegación desde una sesión ya abierta. |
| Instructor | Acceso amplio al contenido de su academia; validaciones más amplias de lo anunciado. | Menor privilegio, control de revisión en servidor y baja efectiva. |
| Otra academia | La vía pública de GitHub; no se demostró acceso cruzado a Firestore de producción. | Cerrar exposición pública y conservar pruebas de aislamiento entre academias. |
| Quien comprometa la cuenta suprema | Potencial acceso y modificación global mediante las reglas de superadmin. | MFA, custodia, separación de funciones, revocación y respaldo independiente. |

## Plan de reducción del riesgo

1. **Contención:** resolver R01 con el dueño del repositorio y garantizar continuidad de Pages. Clasificar material público/exclusivo. No prometer confidencialidad mientras el temario sea anónimo en GitHub.
2. **Autorización:** R02, R03 y R04 primero; R05 antes de habilitar Storage reservado. Cada cambio de reglas con pruebas en emulador, revisión local y publicación manual autorizada.
3. **Operación:** verificar App Check, cuentas, colaboradores, reglas efectivas, recuperación y copias. Revisar invitaciones. Actualizar dependencias tras evaluar avisos y compatibilidad.
4. **Producto:** retirar promesas de protección no implementada y definir entrega de documentos. Separar autoevaluación de acreditación formal. Conservar revisión clínica y sus avisos.
5. **Gobierno de la academia:** titularidad y licencias, privacidad, acceso de docentes, mecanismo de denuncia y protocolo de incidentes. No hay evidencia suficiente para afirmar que ya ocurrió un robo o atribuirlo a alguien.

No se asignan plazos ni costos ficticios. Mantener estrictamente Spark, sin backend propio, limita firma temporal, calificación privada y controles avanzados de sesiones. Son decisiones de arquitectura pendientes; no se contrataron servicios.

## Verificación realizada

- `git status --short` inicial: únicamente `?? .claude/settings.local.json`, archivo previo ajeno a esta intervención.
- `npm run gen:plan`: exit 0; 7 módulos, 56 unidades, 287 temas; 268 lecciones con material; 178 borradores, 104 en revisión, 5 bloqueados.
- `npm run gen:nav`: exit 0; cifras de 7 módulos y 287 temas, sin títulos del temario.
- `npm run build`: primer intento falló por acceso denegado de esbuild al directorio superior dentro del aislamiento; repetido fuera del aislamiento pasó, `built in 3.33s`. Advertencia de chunks mayores de 500 kB. Sus generadores no dejaron diferencias de contenido detectadas en Git.
- `npm run inventario`: exit 0; 268 lecciones con material, 14 nodos de evaluación y 287 temas con observaciones abiertas. El inventario no certifica revisión clínica.
- `npm test`: el primer proceso terminó correctamente tras 298 944 ms, con 1 269 pruebas: `pass 1269`, `fail 0`, `skipped 0`. El importador de imágenes tardó varios minutos; inicialmente pareció detenido. Se había iniciado una repetición fuera del aislamiento y se interrumpió únicamente su proceso de importación tras unos 201 segundos; esa repetición dio fallo por la interrupción, no constituye una segunda suite aprobada. El primer proceso terminó por sí mismo con exit 0.
- Verificación focalizada con `node --test --test-reporter=tap` sobre `fugaDelBundle`, `aislamientoEntreAcademias`, `acceso`, `permisosEditor`, `materialTema`, `enlaceSeguro` y `codigoSeguro`: `# pass 60`, `# fail 0`, `# skipped 0`. Estas pruebas existentes no cubren ni refutan los defectos nuevos de reglas señalados aquí.
- `npm run test:rules`: no pudo iniciar: `firebase` no se reconoce como comando. Java 21 está disponible; falta Firebase CLI. No se instalaron dependencias. Reglas NO verificadas dinámicamente en esta sesión.
- `npm audit --json`: el primer intento falló al verificar el certificado del registro. Con `NODE_OPTIONS=--use-system-ca` y TLS activo, completó la consulta: exit 1 por hallazgos; 16 paquetes, 6 altos y 10 moderados, 0 críticos. `npm audit --omit=dev --json`: 2 moderados. No se aplicaron actualizaciones.
- Lecturas anónimas por PowerShell: API de GitHub, archivo académico HTTP 200, portada HTTP 200 e imagen académica HTTP 200. El primer intento de red dentro del aislamiento falló; las verificaciones citadas provienen de la repetición exitosa fuera del aislamiento.
- `rg`, lecturas de archivos, `git remote -v`, búsquedas de consumidores y listado de archivos versionados sustentan los hallazgos. Algunos patrones de ruta con comodines no funcionaron en PowerShell y se sustituyeron por búsqueda en directorios. No son pruebas de seguridad aprobadas.

## Pendientes que requieren al dueño

1. ¿Se autoriza preparar el cierre del repositorio público, comprobando antes el plan de GitHub y cómo conservar disponible Pages?
2. ¿Qué textos, imágenes y documentos son exclusivos de RESCATE, cuáles son muestras públicas y cuáles tienen licencia de terceros?
3. ¿Ocultar por grupo debe impedir también descargar los datos, o únicamente ordenar la enseñanza?
4. ¿Quién es responsable institucional de GitHub/Firebase, recuperación, privacidad y validación docente?
5. ¿La academia requiere evaluación certificadora y entrega individual de documentos, y acepta evaluar presupuesto/arquitectura para ello?

## Fuentes externas consultadas

- [Repositorio público observado](https://github.com/LINxBUAPx100/Paramedicos). Evidencia complementada por consultas anónimas en vivo; no se copiaron aquí las lecciones.
- [GitHub: efectos de cambiar la visibilidad](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility) y [disponibilidad de Pages según plan](https://docs.github.com/en/pages/quickstart). Verificar continuidad antes de cambiar visibilidad.
- [Firebase: lectura por campos](https://firebase.google.com/docs/firestore/security/rules-fields) y [consultas seguras](https://firebase.google.com/docs/firestore/security/rules-query). La autorización de lectura se evalúa sobre documentos; no es una redacción selectiva de campos del resultado.
- [Firebase App Check](https://firebase.google.com/docs/app-check) y [activación de exigencia](https://firebase.google.com/docs/app-check/enable-enforcement). Complementa autenticación/reglas y tiene límites de protección.
- [Firebase: cambios de Storage y Blaze](https://firebase.google.com/docs/storage/faqs-storage-changes-announced-sept-2024).
- [Firebase: descargar archivos en web](https://firebase.google.com/docs/storage/web/download-files) y [API de Storage](https://firebase.google.com/docs/reference/js/storage). Distinguir enlaces de descarga y peticiones autenticadas de una implementación de firma temporal.
- Avisos devueltos por npm audit: [Vite en Windows](https://github.com/advisories/GHSA-fx2h-pf6j-xcff), [esbuild](https://github.com/advisories/GHSA-67mh-4wv8-2f99), [React Router DOM](https://github.com/advisories/GHSA-jjmj-jmhj-qwj2). El inventario del registro no demuestra explotación en este proyecto; se requiere revisar condiciones concretas.

## Entrega

Se creó este informe local para revisión. No se cambiaron código de aplicación, reglas, estados editoriales, dependencias, permisos, visibilidad de GitHub ni configuración de Firebase; no hubo commit, push, PR o despliegue. Los generadores se ejecutaron únicamente como verificación y no dejaron diferencias de contenido en los archivos generados.

Archivos escritos por los comandos de generación, sin diferencias finales de contenido:

- `C:/Users/PC/Documents/Paramedicos/src/data/planRescate.js`: regenerado.
- `C:/Users/PC/Documents/Paramedicos/src/data/navIndice.js`: regenerado.
- `C:/Users/PC/Documents/Paramedicos/src/data/activosLigeros.js`: regenerado por prebuild.
- `C:/Users/PC/Documents/Paramedicos/src/data/demoPortada.js`: regenerado por prebuild.

Único cambio entregable: `C:/Users/PC/Documents/Paramedicos/docs/AUDITORIA-RIESGOS-RESCATE-2026-09-19.md`, creado. `git diff --stat` no muestra cambios rastreados porque el informe es nuevo y no está agregado. `git status --short` muestra este informe y el archivo previo `.claude/settings.local.json`, que no se tocó. `git diff --check` no reportó errores; Git sí advierte normalización LF/CRLF en archivos generados y falta de acceso al archivo global de exclusiones. No cambia ninguna pantalla, ruta o botón.

Los hallazgos siguen abiertos hasta implementar y verificar sus medidas. No publicar este informe en el repositorio público antes de contener las exposiciones y valorar qué detalles deben permanecer internos.
