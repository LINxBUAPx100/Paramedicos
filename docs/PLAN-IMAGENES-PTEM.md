# Imágenes de PTEM — arquitectura implementada

Estado: **ejecutado**. Este documento describía un plan; ahora describe lo que
hay. El inventario de qué se sustituyó por qué, con la tabla de reversión, está
en [`INVENTARIO-ACTIVOS-MEDICOS.md`](INVENTARIO-ACTIVOS-MEDICOS.md), que lo
genera el pipeline y no se escribe a mano.

## 1. El problema que había

Las imágenes del temario vivían en Google Drive: 21 entradas escritas a mano en
`src/data/imagenes.js`, trece de ellas enlaces de Drive. Eso costaba tres cosas,
no una:

1. **Drive no es un hosting de imágenes.** No garantiza el hotlink —cambia de
   dominio y limita el tráfico automatizado—, cada archivo hay que compartirlo a
   mano como «cualquiera con el enlace», y una imagen que alguien mueva de
   carpeta desaparece del temario sin aviso.
2. **No había procedencia.** Un enlace de Drive no dice quién hizo el dibujo ni
   bajo qué licencia se puede publicar. Sin eso no se puede atribuir, y sin
   atribuir no se puede publicar material con licencia CC BY.
3. **No había cobertura.** 21 imágenes para 287 temas: la mayoría de las
   lecciones no tenía ningún apoyo visual.

Y había un cuarto problema, en los iconos: los 287 temas y los 7 módulos usaban
**emojis** (269 usos, 129 emojis distintos). Un emoji lo dibuja la fuente del
sistema, así que el mismo tema se veía distinto en cada plataforma y algunos
—🫀, 🫁, 🫘, 🩻— no se ven en equipos con fuentes antiguas. No responden al tema
claro/oscuro, un lector de pantalla los anuncia en medio del título, y varios
eran directamente **incorrectos**: 🫀 (corazón) encabezaba tres temas de hígado
y 🦵 (pierna) uno de cadera.

## 2. De dónde sale el material ahora

Dos bibliotecas de acceso abierto, y ninguna más:

| Fuente | Qué aporta | Licencias | Versión fijada |
|---|---|---|---|
| [BioIcons](https://bioicons.com/) ([repo](https://github.com/duerrsimon/bioicons)) | 157 activos: anatomía y patología de Servier bajo CC BY 3.0, más material CC0 y CC BY 4.0 de otros autores | CC-BY-3.0, CC-BY-4.0, CC0-1.0 | commit `d29e766e` |
| [Servier Medical Art](https://smart.servier.com/) | 48 activos: lo que BioIcons no tiene (columna vertebral, médula, esqueleto, ambulancia, camilla, collarín, placenta, ictus…) | CC-BY-4.0 | biblioteca pública, recuperada el 2026-08-20 |
| Composiciones de PTEM | 23 figuras nuevas armadas con los activos anteriores + rótulos en español | obra propia sobre componentes de terceros | — |

**La licencia de un archivo no es la del repositorio que lo aloja.** BioIcons se
publica bajo MIT; sus 2 830 dibujos son de terceros y llevan licencias distintas.
La licencia real se **lee de la ruta** —`static/icons/<licencia>/<categoría>/<autor>/<archivo>.svg`—
y el pipeline aborta si esa carpeta no está en el registro de licencias.

Aviso que no hay que olvidar: BioIcons aloja **copias históricas de Servier bajo
CC BY 3.0**. No son lo mismo que una descarga actual de smart.servier.com, que
es CC BY 4.0. Confundirlas atribuye con la licencia equivocada, así que cada
archivo conserva la suya y hay una prueba que lo comprueba.

## 3. Dónde vive y cómo se sirve

```
public/imagenes/medical/
  bioicons/       157 SVG saneados y optimizados
  smart/           48 PNG de la biblioteca oficial
  composiciones/   23 SVG generados por PTEM
public/imagenes/archivo/   los 8 diagramas anteriores, conservados para revertir
```

El contenido guarda **rutas relativas**, nunca URLs, y `rutaImagen()` de
`src/lib/img.js` sigue siendo el único punto donde se decide de dónde se sirven:
el día que haya un CDN se define `VITE_IMAGENES_BASE` y no se toca ninguna ficha.

Peso: **19 MB en disco, ~4 MB con gzip** para 228 activos. GitHub Pages admite
1 GB por sitio. Los SVG llegan comprimidos por el servidor; los PNG de SMART se
sirven tal cual, porque optimizarlos exigiría `sharp` y este repositorio no lo
lleva como dependencia a propósito.

## 4. El catálogo es la única fuente de verdad

`src/data/activosMedicos.js` lo **genera** `scripts/importar-activos-medicos.mjs`
y nadie lo edita a mano. Cada ficha declara id, título, tipo, proveedor, autor
con su URL, categoría, etiquetas, ruta, formato, dimensiones y `viewBox`,
procedencia completa (página, archivo crudo, ruta en el repositorio, commit,
fecha de recuperación, **sha256**), licencia normalizada con sus obligaciones,
texto de atribución, cambios, accesibilidad (`alt` y descripción ampliada) y
usos.

Las licencias viven en `src/lib/licenciasActivos.js` con su obligación real
—`attributionRequired`, `shareAlike`—, no en un enum de dos valores. Orden de
preferencia de la política: **CC0 → obra propia → MIT → CC BY → CC BY-SA**. Hoy
el catálogo **no tiene ningún CC BY-SA**, así que PTEM no arrastra ninguna
obligación vírica por este material.

## 5. El pipeline

```bash
npm run activos:importar -- --dry-run   # no escribe nada; imprime el informe
npm run activos:importar                # importa
npm run activos:importar -- --sin-red   # regenera solo con la caché local
npm run activos:importar -- --solo=cp-servier-rinon
```

Qué hace, en orden, y por qué cada paso está ahí:

1. **Baja de un commit fijado.** Sin eso, el mismo comando de mañana podría
   traer otro archivo y el crédito quedaría apuntando a una obra que ya no es la
   que se sirve. La caché vive en `.cache/activos/` (ignorada por git) y hace el
   pipeline idempotente y ejecutable sin red.
2. **Importa solo lo seleccionado** (`scripts/activos/seleccion.json`), nunca el
   repositorio entero.
3. **Lee autor y licencia de la ruta** y aborta si falta cualquiera de los dos.
4. **Sanea el SVG dos veces** (`scripts/lib/svgSeguro.mjs`): primero sobre el
   archivo tal como llega, buscando solo lo que la limpieza no podría volver
   inocuo (`<script>`, atributos de evento, referencias a otro dominio) —así el
   saneado nunca puede tapar un script «arreglándolo»—; después, sobre el
   archivo ya limpio, la comprobación estricta completa. Un SVG es un documento,
   no una imagen: servido desde el propio origen puede ejecutar JavaScript.
5. **Retira el envoltorio de Adobe Illustrator**, que es lo que trae casi todo el
   material de DBCLS: DTD interno con entidades, un `<switch>` cuyo primer hijo
   es un `<foreignObject>` con datos privados del editor, y un CDATA de cientos
   de kilobytes. Tres archivos pasaron de 1,8 MB a 560 KB solo con eso.
6. **Conserva el `viewBox`** y reduce la geometría a dos decimales (0,002 % de
   error en un lienzo de 500 unidades: por debajo del subpíxel).
7. **Escribe `<title>` y `<desc>` en español**: el original suele venir en inglés
   o ser el nombre del archivo, que no sirve como texto alternativo.
8. **Calcula el sha256** y no sobrescribe un archivo modificado a mano: si su
   hash no coincide con el que registró el catálogo, se detiene y lo dice.
9. **Aplica el presupuesto de icono** (128 KB). Lo que lo supera sigue en el
   catálogo como ilustración pero deja de ser elegible como icono de cabecera:
   pedir 400 KB para pintar 26 píxeles sería absurdo. Se imprime la lista: nada
   se degrada en silencio.
10. **Comprueba la cobertura de los 287 temas** contra la semilla oficial y
    aborta si falta uno.
11. **Genera** el catálogo y `docs/INVENTARIO-ACTIVOS-MEDICOS.md`.

## 6. Las decisiones editoriales viven en datos, no en el script

| Archivo | Qué decide |
|---|---|
| `scripts/activos/fuentes.json` | las dos fuentes autorizadas y su versión fijada |
| `scripts/activos/seleccion.json` | los 205 activos elegidos, con `alt`, descripción, **motivo** de la elección y **equivalencia** comprobada frente a lo que sustituye |
| `scripts/activos/composiciones.json` | las 23 figuras nuevas, declaradas como datos (retícula, rótulos, notas) |
| `scripts/activos/mapa-temas.json` | qué figura le corresponde a cada uno de los 287 temas |
| `scripts/activos/iconos-modulo.json` | el icono de los 7 módulos y las 15 excepciones por tema |
| `scripts/activos/reversion.json` | de dónde venía cada imagen retirada y cómo volver atrás |

El criterio de selección **no es coincidencia de palabras**: un activo entra si
representa la misma estructura o el mismo mecanismo que la figura original, al
nivel prehospitalario del plan. Cada entrada lo justifica por escrito.

## 7. Las composiciones

Ocho de las figuras del Atlas no eran ilustraciones: eran procesos, curvas y
clasificaciones dibujadas a mano en SVG (bomba Na⁺/K⁺, sistema de conducción,
onda del ECG, circulación mayor y menor, gasto cardíaco, curva de la
oxihemoglobina, clasificación del shock, equilibrio ácido-base). Cuatro de las
imágenes de Drive tenían el mismo problema (cascada de la coagulación,
receptores adrenérgicos, secuencia de intubación, glándulas endocrinas).

Sustituir una de ellas por un icono aislado habría destruido lo que enseñaba, así
que se construyeron **23 composiciones** con `scripts/lib/componerFigura.mjs`:
activos abiertos embebidos + rótulos en español como **texto SVG real** (se
selecciona, se busca, se amplía sin pixelar y lo lee un lector de pantalla).

Tres decisiones que conviene no deshacer:

- **Tema claro y oscuro.** El SVG se sirve con `<img>`, así que no hereda el CSS
  de la página: lleva su propio bloque `prefers-color-scheme`, que sí se aplica.
- **Identificadores y clases aislados por instancia.** Media biblioteca viene
  exportada de Illustrator y usa los mismos nombres (`.cls-1`, `.st0`) en todos
  los archivos. El CSS de un SVG es global: sin aislar, el riñón saldría con los
  colores del corazón y sin ningún error visible.
- **Solo se embebe SVG.** Los activos de SMART llegan en PNG y empotrarlos en
  base64 dispararía el peso por encima del presupuesto, así que en columna
  vertebral, nefrona y glándulas endocrinas la ilustración de SMART se sirve como
  figura aparte del mismo tema.

**Límite deliberado:** las composiciones migran material visual, no introducen
contenido clínico nuevo. Donde una figura habría exigido inventar una tabla con
cifras —Glasgow, niveles de PIC, fórmula de Parkland, regla de los 9, colores de
triage, triángulo de evaluación pediátrica— **no se construyó**: esas cifras
tienen que venir de la lección redactada y de su fuente académica. Esos temas
reciben la figura anatómica que les corresponde y quedan anotados en el
inventario para la sesión editorial.

## 8. Iconos: de emoji a activo

- Los 269 campos `icono` del contenido y los 7 de los módulos pasaron a ser
  **identificadores del catálogo**. La sustitución se hizo con
  `npm run activos:iconos`, tema por tema y no emoji por emoji: el mismo 🩸
  aparecía en hemorragia, en hematopoyesis y en sangrado digestivo, y cada uno
  necesita una figura distinta.
- `src/data/contenido/iconosTemas.js` deja constancia de qué emoji tenía cada
  tema: es la tabla de reversión de esta parte y el registro de los que estaban
  mal.
- `scripts/gen-plan-rescate.mjs` ya no lleva emojis escritos a mano: lee
  `ICONO_POR_MODULO` e `ICONO_POR_TEMA` del catálogo. `planRescate.js` **se
  regenera**; hay una prueba que comprueba que está al día con su fuente.
- `src/components/MedicalIcon.jsx` los pinta como `<img>` con `loading="lazy"` y
  tamaño explícito (en una lista de veinte temas, los que no se ven no se
  descargan), decorativo por omisión (`aria-hidden`) y con **respaldo vectorial
  local** —un icono de `Icon.jsx`—, nunca un emoji.
- `Icon.jsx` se conserva para los controles genéricos (buscar, cerrar, editar,
  descargar, avanzar): forzar un icono médico ahí sería confuso.

## 9. Créditos

- **Junto a la figura**: `CreditosActivo.jsx` añade un control «Créditos» donde
  la licencia lo exige. Es un `<button>` real con `aria-expanded`, foco visible
  y cierre con Escape: un `title=""` no cumple, porque no se ve con teclado ni en
  móvil. El panel muestra título, autor, proveedor, licencia con enlace, fuente,
  cambios, el crédito de **cada componente** de una composición y el texto de
  atribución copiable.
- **Página global**: `/creditos`, enlazada desde el pie del sitio y **fuera de
  `RutaProtegida`**, porque el crédito tiene que poder consultarse sin haber
  entrado en una academia. Agrupa por licencia, resume por autor y declara la
  trazabilidad (commit fijado y fecha de recuperación).
- Los CC0 no exigen atribución pero conservan su procedencia en `/creditos`.
- Ningún texto insinúa aval: se nombra al autor, al proveedor y a la licencia, y
  nada más. Hay una prueba que rechaza «en colaboración con», «con el apoyo de»
  y similares, porque las licencias CC prohíben sugerir patrocinio.

## 10. Accesibilidad

- `alt` escrito a mano por activo, en español, nunca el nombre del archivo.
- **Descripción ampliada** en un `<details>` del pie para las figuras que
  comunican relaciones: quien no ve el diagrama necesita el recorrido completo, y
  un `alt` de una línea no alcanza.
- Rótulos como texto SVG, no quemados en un mapa de bits.
- `viewBox` obligatorio: la figura escala sin deformarse y el zoom del visor
  funciona.
- Los iconos decorativos llevan `alt=""` **y** `aria-hidden`, porque hay lectores
  que anuncian «imagen» ante un alt vacío si falta lo segundo.

## 11. El editor

- `src/lib/temaContenidoModelo.js` aceptaba solo `http(s)://…`, es decir,
  rechazaba exactamente lo que esta arquitectura pide. Ahora acepta **rutas
  relativas confinadas** a los directorios de imágenes y rechaza traversal en
  claro, codificado (`%2e%2e`) y con barra invertida, rutas absolutas, URLs sin
  esquema, `data:`/`javascript:` y extensiones que no sean de imagen.
- Los bloques `imagen` y `diagrama` aceptan `assetId`, que es la forma
  preferente: con el identificador llegan solos la ruta, el `alt` y el crédito.
- `src/components/editor/SelectorActivo.jsx` permite elegir por concepto
  —«riñón», «quemadura», «ECG»— con miniaturas, y **muestra el crédito antes de
  guardar**, para que quien edita sepa qué obligación asume.

## 12. Pruebas

| Archivo | Qué protege |
|---|---|
| `tests/activosMedicos.test.mjs` | autor, procedencia, licencia y URL de licencia por activo; que la licencia coincida con la ruta de origen; existencia y **hash** de cada archivo; SVG sin nada ejecutable; `viewBox` y `<title>`; composiciones con todos sus componentes acreditados; cobertura de los 287 temas; presupuesto de icono; nada de Drive |
| `tests/creditosActivos.test.mjs` | que el control de créditos aparezca donde la licencia lo exige y solo ahí; que una composición liste a todos sus autores; que la página global recoja los componentes internos; que el texto no insinúe aval |
| `tests/sinEmojis.test.mjs` | ni un pictograma en el temario servido, en los datos generados o en los componentes; campos `icono` con identificadores válidos; sin dingbats ni flechas usadas como icono |
| `tests/rutasImagen.test.mjs` | rutas locales sí, traversal no, en todas sus formas |
| `tests/imagenesTemario.test.mjs` | el Atlas sin Drive; `assetId` existente; todos los temas con imagen; sin duplicados; los 8 SVG anteriores archivados y sin uso; la galería de Logros se arma y sus tarjetas llevan a temas reales |
| `tests/generadoAlDia.test.mjs` | `planRescate.js` y `navIndice.js` al día con su fuente; el catálogo regenerable sin red |

## 13. Cómo actualizar en el futuro

1. Para **añadir un activo**: editar `scripts/activos/seleccion.json` con su
   ruta en BioIcons o su slug de SMART, su `alt`, su descripción, el motivo de la
   elección y la equivalencia. Después `npm run activos:importar`.
2. Para **añadir una figura compuesta**: editarla en
   `scripts/activos/composiciones.json`. Es una declaración de datos: retícula,
   rótulos y notas. No hace falta escribir SVG.
3. Para **cambiar qué imagen ve un tema**: `scripts/activos/mapa-temas.json`. El
   primero de la lista es el canónico (tarjeta en Logros y cabecera de la
   galería).
4. Para **subir la versión de BioIcons**: cambiar `commit` en
   `scripts/activos/fuentes.json`, ejecutar con `--dry-run`, revisar los hashes
   que cambian y solo entonces ejecutar en firme.
5. Después de cualquier cambio: `npm run gen:plan && npm run gen:nav && npm test
   && npm run build`.
6. `.cache/activos/` guarda las descargas; borrarla fuerza a volver a bajar.
   `--sin-red` regenera solo con lo que ya está en caché.

## 14. Lo que sigue pendiente

Está todo en la §6 del inventario generado. En resumen:

- **Alacrán**: el plan lo nombra y ninguno de los dos bancos tiene uno. La
  composición de picaduras cubre himenóptero, araña y serpiente y declara la
  ausencia. No se buscó en fuentes no autorizadas.
- **Escápula aislada**: no existe en ninguno de los dos bancos; se usa la
  fractura de hombro de SMART, que incluye la cintura escapular.
- **Cinemática del trauma**: ningún banco autorizado tiene vehículos, cascos ni
  escenas de colisión. Los once temas reciben figuras de cuerpos en movimiento,
  la aorta para la desaceleración y el pictograma de explosivo. Es una
  aproximación declarada, no una equivalencia.
- **Sinapsis ampliada** y **especie de serpiente**: aproximaciones declaradas en
  la ficha de cada activo.
- **Figuras clínicas con cifras**: no se construyeron, por la razón de la §7.
