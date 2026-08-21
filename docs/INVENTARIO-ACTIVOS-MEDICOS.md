# Inventario de activos médicos — reemplazos, procedencia y reversión

ARCHIVO GENERADO por `scripts/importar-activos-medicos.mjs`. No editar a mano:
se regenera con `npm run activos:importar`.

## 1. Resumen

| | |
|---|---|
| Activos en el catálogo | **228** |
| Bajados de BioIcons | 157 |
| Bajados de Servier Medical Art | 48 |
| Composiciones nuevas de PTEM | 23 |
| Temas con al menos una imagen | 287 |
| Commit fijado de BioIcons | `d29e766ea7580b8063c4f47b29e872db40a4d979` |
| SMART recuperado el | 2026-08-20 |

### Reparto por licencia

| Licencia | Activos | Exige atribución | CompartirIgual |
|---|---|---|---|
| CC-BY-3.0 | 135 | sí | no |
| CC-BY-4.0 | 54 | sí | no |
| PTEM-Propia | 23 | no | no |
| CC0-1.0 | 16 | no | no |

Orden de preferencia declarado en la política: CC0-1.0 → PTEM-Propia → MIT → BSD-3-Clause → CC-BY-3.0 → CC-BY-4.0 → CC-BY-SA-3.0 → CC-BY-SA-4.0.

**No hay ningún activo CompartirIgual (CC BY-SA) en el catálogo**, así que PTEM no arrastra ninguna obligación vírica por este material.

## 2. Tabla de reemplazos y reversión

Cada fila dice de dónde venía la imagen, qué la sustituye y **cómo volver atrás**.
Ningún archivo original de Drive se ha borrado: solo se han retirado sus
referencias en la aplicación.

| Dónde se usa | Tema | Origen anterior | Tipo | Qué mostraba | Nuevo assetId | Estado | Motivo | Equivalencia | Cómo revertir |
|---|---|---|---|---|---|---|---|---|---|
| ATLAS_TEMAS · clave `celula` | m2-afe-celula | `https://drive.google.com/file/d/15jTVRG0WCzpzEjEZIuRyfCPGTzHKR6o5/view` | google_drive | Esquema de la célula con sus organelos rotulados | `dg-celula-organelos` | reemplazado | Era un esquema con relaciones, no una foto: se recompone con célula, núcleo y mitocondria de Servier más rótulos en español | Conserva los cuatro elementos que rotulaba y añade la consecuencia clínica de la falta de ATP | El Atlas se genera: se restituye la URL en scripts/activos/mapa-temas.json y se reimporta |
| ATLAS_TEMAS · clave `corazon` | m2-afi-cardiovascular | `https://drive.google.com/file/d/1194V9CclqlF0FsVm90m8W5qBZJc6j11l/view` | google_drive | Anatomía del corazón y arterias coronarias | `il-corazon-vascularizacion` | reemplazado | Servier tiene la misma vista anterior con el trayecto coronario dibujado | Cámaras y coronarias, sin añadir oclusiones que el tema no pide | Restituir la URL en mapa-temas.json y reimportar |
| ATLAS_TEMAS · clave `respiratorio` | m3-va-repaso-anatomia | `https://drive.google.com/file/d/1-AH17bWBHvTcjNA44AjcyKNCJkdnzoy9/view` | google_drive | Árbol traqueobronquial y pulmones | `il-arbol-traqueobronquial` | reemplazado | Muestra el árbol completo y la asimetría derecha/izquierda, sin texto quemado | Mismo alcance anatómico; los rótulos pasan al pie y al texto alternativo | Restituir la URL en mapa-temas.json y reimportar |
| ATLAS_TEMAS · clave `nefrona` | m2-afi-urinario | `https://drive.google.com/file/d/1kaq_bil5MRZucepN7qI_CtuT9UERKWHO/view` | google_drive | La nefrona con sus segmentos | `dg-nefrona` | reemplazado | El tema nombra cada tramo: se rotulan en español sobre la nefrona vectorial y el riñón en corte | Los cuatro tramos con su función; la nefrona de SMART se sirve además como figura aparte | Restituir la URL en mapa-temas.json y reimportar |
| ATLAS_TEMAS · clave `neurona` | m2-afi-nervioso | `https://drive.google.com/file/d/1-LHRmRaReuaSofSDtP9Ko0wsKLssz_n5/view` | google_drive | Neurona y sinapsis | `cp-dbcls-neurona` | reemplazado | Es la única neurona del catálogo con axón mielinizado y terminaciones | Deuda declarada: no amplía la hendidura sináptica; la sinapsis se explica en el pie | Restituir la URL en mapa-temas.json y reimportar |
| ATLAS_TEMAS · clave `encefalo` | m2-afi-nervioso | `https://drive.google.com/file/d/1nC3ZY9wuTryFQx7oOLmWnorw5pbxn0M2/view` | google_drive | Regiones del encéfalo rotuladas | `dg-encefalo-regiones` | reemplazado | Los rótulos eran el contenido de la figura: se rehacen en español sobre el corte sagital de Servier | Las cuatro regiones con su función y su déficit correspondiente | Restituir la URL en mapa-temas.json y reimportar |
| ATLAS_TEMAS · clave `piel` | m2-afe-tegumentario | `https://drive.google.com/file/d/1Z8BVgX9VVNxjbiHF9doYCwZ5EADf1gQJ/view` | google_drive | Capas de la piel rotuladas | `dg-piel-capas` | reemplazado | Ídem: los rótulos eran el contenido | Las tres capas y la relación profundidad-clínica de la quemadura | Restituir la URL en mapa-temas.json y reimportar |
| ATLAS_TEMAS · clave `columna` | m2-afi-oseo | `https://drive.google.com/file/d/1Nxq-6rboOCXte-1UmUEVTvqt5HmV6aF_/view` | google_drive | Columna vertebral con sus regiones | `dg-columna-vertebral` | reemplazado | El contenido eran las regiones y el número de vértebras; se rotulan sobre un esquema propio | Las cinco regiones con su número de vértebras; la columna de SMART se sirve además como figura aparte | Restituir la URL en mapa-temas.json y reimportar |
| ATLAS_TEMAS · clave `endocrino` | m2-ao-endocrino | `https://drive.google.com/file/d/1IlmdCayC7JWmcmNSw7DI9ecLnJCvEnxY/view` | google_drive | Glándulas endocrinas situadas en el cuerpo | `dg-glandulas-endocrinas` | reemplazado | Era un mapa corporal con rótulos: se rehace con localización, páncreas de Servier e islote | Localización de cinco glándulas y la urgencia asociada a tres de ellas | Restituir la URL en mapa-temas.json y reimportar |
| ATLAS_TEMAS · clave `digestivo` | m2-afi-digestivo | `https://drive.google.com/file/d/1vO1BwNBSDG_K5jNQWdT2o4e2fFHmrn71/view` | google_drive | Tracto digestivo completo | `il-tracto-digestivo` | reemplazado | Servier tiene el mismo recorrido sin rótulos incrustados en inglés | Mismo alcance anatómico | Restituir la URL en mapa-temas.json y reimportar |
| ATLAS_TEMAS · clave `coagulacion` | m2-ao-hematopoyetico | `https://drive.google.com/file/d/1ImFPJU_FVp3bU_8bw0Cnku_cdNVuQlGd/view` | google_drive | Cascada de la coagulación | `dg-cascada-coagulacion` | reemplazado | Era un proceso en etapas: se recompone con plaqueta, fibrina y coágulo de Servier más las cuatro etapas rotuladas | Las cuatro etapas y su relación con la maniobra prehospitalaria y la tríada letal | Restituir la URL en mapa-temas.json y reimportar |
| ATLAS_TEMAS · clave `receptores` | m4-far-generalidades | `https://drive.google.com/file/d/1XmLpHhvERSXgdUjUpm4dabOAAnV2n9Xl/view` | google_drive | Receptores adrenérgicos y sus efectos | `dg-receptores-adrenergicos` | reemplazado | Era una tabla de efectos: se rehace sobre el receptor de membrana y el músculo liso de Servier | α₁, β₁, β₂ y dopaminérgicos con su efecto; sin dosis, que siguen bloqueadas | Restituir la URL en mapa-temas.json y reimportar |
| ATLAS_TEMAS · clave `sri` | m3-va-isr | `https://drive.google.com/file/d/1PMs76U2Tpg6A9Z5B3gw9nP0MrSXqC_a5/view` | google_drive | Secuencia rápida de intubación | `dg-secuencia-intubacion` | reemplazado | Era una secuencia de pasos: se rehace con las siete etapas y las figuras del trayecto, el destino y los fármacos | Las siete etapas. La farmacología sigue declarada como deuda pendiente de protocolo local | Restituir la URL en mapa-temas.json y reimportar |
| public/imagenes/m2/bomba-sodio-potasio.svg | m2-afe-electrofisiologia | `imagenes/m2/bomba-sodio-potasio.svg` | svg_local_generado | Esquema de la bomba Na⁺/K⁺ con el intercambio de iones y el gasto de ATP | `dg-bomba-sodio-potasio` | reemplazado | SVG dibujado a mano sin procedencia: se rehace con el receptor de membrana de Servier y los potenciales de acción CC0 | Conserva íntegro su texto y añade la consecuencia clínica en hipoxia | El archivo original está en public/imagenes/archivo/m2/bomba-sodio-potasio.svg |
| public/imagenes/m2/sistema-conduccion.svg | m2-afi-cardiovascular | `imagenes/m2/sistema-conduccion.svg` | svg_local_generado | Trayecto del impulso y frecuencias de escape | `dg-sistema-conduccion` | reemplazado | Se rehace sobre la anatomía real del sistema de conducción de Servier | Conserva las cuatro estaciones y sus frecuencias (60–100, 40–60, 20–40) | public/imagenes/archivo/m2/sistema-conduccion.svg |
| public/imagenes/m2/circulacion-mayor-menor.svg | m2-afi-cardiovascular | `imagenes/m2/circulacion-mayor-menor.svg` | svg_local_generado | Los dos circuitos en serie | `dg-circulacion-mayor-menor` | reemplazado | Se rehace con las circulaciones pulmonar y sistémica y el alvéolo de Servier | Conserva los dos circuitos y añade la consecuencia de estar en serie | public/imagenes/archivo/m2/circulacion-mayor-menor.svg |
| public/imagenes/m2/gasto-cardiaco.svg | m2-afi-cardiovascular | `imagenes/m2/gasto-cardiaco.svg` | svg_local_generado | GC = FC × VS y los tres determinantes del volumen sistólico | `dg-gasto-cardiaco` | reemplazado | Se rehace con la misma fórmula y la figura del corazón de Servier | Conserva fórmula, factores y determinantes, y añade dónde falla cada uno | public/imagenes/archivo/m2/gasto-cardiaco.svg |
| public/imagenes/m2/equilibrio-acido-base.svg | m2-afe-acido-base | `imagenes/m2/equilibrio-acido-base.svg` | svg_local_generado | Los cuatro trastornos ácido-base con sus causas y su compensación | `dg-equilibrio-acido-base` | reemplazado | Se rehace sobre la balanza de Servier | Conserva íntegros los cuatro cuadros, los rangos y la regla de lectura | public/imagenes/archivo/m2/equilibrio-acido-base.svg |
| public/imagenes/m3/ecg-onda-normal.svg | m3-md-ecg-basica | `imagenes/m3/ecg-onda-normal.svg` | svg_local_generado | Onda P, QRS, T e intervalos | `dg-ecg-onda-normal` | reemplazado | Se rehace sobre el trazo real de Servier, con la cuadrícula del papel | Conserva los intervalos (PR 0,12–0,20 s; QRS < 0,12 s; QT variable) | public/imagenes/archivo/m3/ecg-onda-normal.svg |
| public/imagenes/m3/curva-oxihemoglobina.svg | m3-va-repaso-anatomia | `imagenes/m3/curva-oxihemoglobina.svg` | svg_local_generado | Curva sigmoide, P50 y los dos desplazamientos | `dg-curva-oxihemoglobina` | reemplazado | La curva es obra propia de PTEM (no hay una sigmoide en los bancos) y se acompaña del eritrocito de Servier | Conserva ejes, P50 ≈ 26,6 mmHg y los dos desplazamientos con sus causas | public/imagenes/archivo/m3/curva-oxihemoglobina.svg |
| public/imagenes/m5/clasificacion-shock.svg | m5-hs-definicion-tipos-shock | `imagenes/m5/clasificacion-shock.svg` | svg_local_generado | Los cuatro tipos de shock con sus causas | `dg-clasificacion-shock` | reemplazado | Se rehace añadiendo la figura del mecanismo de cada tipo | Conserva los cuatro tipos, todas sus causas y la advertencia sobre la presión arterial | public/imagenes/archivo/m5/clasificacion-shock.svg |
| src/data/contenido/*.js · campo `icono` (269 usos, 129 emojis distintos) | todos | `carácter emoji Unicode` | contenido | Icono de cada tema, impreso como texto en TemaPage, ModuloPage, BuscarPage, Landing y ProgresoPage | `—` | reemplazado | Un emoji depende de la fuente del sistema, no es theme-aware, se lee mal con lector de pantalla y en varios casos representaba el órgano equivocado | Cada emoji se sustituyó por el activo anatómico del tema o, cuando el concepto no es médico, por un icono de línea de Icon.jsx | git revert del commit de migración de iconos; el mapa emoji→identificador queda en src/data/contenido/iconosTemas.js |
| scripts/gen-plan-rescate.mjs · ESTILO[].icono | los 7 módulos | `carácter emoji Unicode` | contenido | Icono de cada módulo | `—` | reemplazado | Ídem; además el archivo es generado y no se puede editar a mano | Cada módulo recibe el activo del sistema o del acto que lo define | Restituir los emojis en ESTILO y ejecutar npm run gen:plan |

## 3. Catálogo completo

| assetId | Título | Tipo | Proveedor | Autor | Licencia | Archivo | Temas |
|---|---|---|---|---|---|---|---|
| `cp-cc0-bacteria` | Bacteria (esquema) | diagram_component | BioIcons | Pauline Franz | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-bacteria.svg` | 0 |
| `cp-cc0-corrosivo` | Señal de sustancia corrosiva | diagram_component | BioIcons | David Eccles (gringer) | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-corrosivo.svg` | 0 |
| `cp-cc0-explosivo` | Señal de material explosivo | diagram_component | BioIcons | David Eccles (gringer) | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-explosivo.svg` | 2 |
| `cp-cc0-gas` | Señal de gas a presión | diagram_component | BioIcons | David Eccles (gringer) | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-gas.svg` | 1 |
| `cp-cc0-guantes` | Guantes | medical_icon | BioIcons | Riccardo Iacovelli | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-guantes.svg` | 4 |
| `cp-cc0-inflamable` | Señal de sustancia inflamable | medical_icon | BioIcons | David Eccles (gringer) | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-inflamable.svg` | 0 |
| `cp-cc0-lupa` | Lupa | medical_icon | BioIcons | Marcel Tisch | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-lupa.svg` | 4 |
| `cp-cc0-nefrona` | Nefrona (esquema vectorial) | diagram_component | BioIcons | EmilyADaniel | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-nefrona.svg` | 0 |
| `cp-cc0-nocivo` | Señal de sustancia nociva | diagram_component | BioIcons | David Eccles (gringer) | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-nocivo.svg` | 1 |
| `cp-cc0-paciente` | Paciente | medical_icon | BioIcons | Marcel Tisch | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-paciente.svg` | 6 |
| `cp-cc0-potencial-accion` | Potenciales de acción | diagram_component | BioIcons | Marcel Tisch | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-potencial-accion.svg` | 1 |
| `cp-cc0-riesgo-biologico` | Señal de riesgo biológico | medical_icon | BioIcons | Erick Hernández López | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-riesgo-biologico.svg` | 1 |
| `cp-cc0-termometro` | Termómetro | medical_icon | BioIcons | kehan | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-termometro.svg` | 2 |
| `cp-cc0-toxico` | Señal de sustancia tóxica | medical_icon | BioIcons | David Eccles (gringer) | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-toxico.svg` | 2 |
| `cp-cc0-tubo-muestra` | Tubo de muestra | medical_icon | BioIcons | Marcel Tisch | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-tubo-muestra.svg` | 2 |
| `cp-cc0-virus` | Virus (esquema) | diagram_component | BioIcons | Marcel Tisch | [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/) | `public/imagenes/medical/bioicons/cp-cc0-virus.svg` | 0 |
| `cp-dbcls-abeja` | Abeja | medical_icon | BioIcons | DBCLS | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/bioicons/cp-dbcls-abeja.svg` | 2 |
| `cp-dbcls-arana` | Araña | diagram_component | BioIcons | DBCLS | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/bioicons/cp-dbcls-arana.svg` | 0 |
| `cp-dbcls-examen-nino` | Exploración de un niño | medical_icon | BioIcons | DBCLS | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/bioicons/cp-dbcls-examen-nino.svg` | 3 |
| `cp-dbcls-neurona` | Neurona | illustration | BioIcons | DBCLS | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/bioicons/cp-dbcls-neurona.svg` | 2 |
| `cp-dbcls-serpiente` | Serpiente | diagram_component | BioIcons | DBCLS | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/bioicons/cp-dbcls-serpiente.svg` | 0 |
| `cp-dbcls-tipos-neurona` | Tipos de neurona | diagram_component | BioIcons | DBCLS | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/bioicons/cp-dbcls-tipos-neurona.svg` | 2 |
| `cp-servier-adulta-mayor` | Mujer adulta mayor | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-adulta-mayor.svg` | 2 |
| `cp-servier-adulto-mayor` | Persona adulta mayor | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-adulto-mayor.svg` | 6 |
| `cp-servier-agua` | Vaso de agua | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-agua.svg` | 3 |
| `cp-servier-alcohol` | Bebida alcohólica | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-alcohol.svg` | 1 |
| `cp-servier-anticuerpo` | Anticuerpo | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-anticuerpo.svg` | 3 |
| `cp-servier-aorta` | Aorta | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-aorta.svg` | 2 |
| `cp-servier-arteria` | Pared arterial | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-arteria.svg` | 3 |
| `cp-servier-atomizador` | Atomizador nasal | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-atomizador.svg` | 2 |
| `cp-servier-bacteria` | Bacteria | illustration | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-bacteria.svg` | 3 |
| `cp-servier-balanza` | Balanza en equilibrio | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-balanza.svg` | 1 |
| `cp-servier-balanza-desequilibrada` | Balanza desequilibrada | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-balanza-desequilibrada.svg` | 2 |
| `cp-servier-bazo` | Bazo | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-bazo.svg` | 1 |
| `cp-servier-blister` | Blíster de medicamento | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-blister.svg` | 3 |
| `cp-servier-bolsa-infusion` | Bolsa de infusión | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-bolsa-infusion.svg` | 6 |
| `cp-servier-bronquio-inflamado` | Bronquio inflamado | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-bronquio-inflamado.svg` | 2 |
| `cp-servier-bronquitis-cronica` | Bronquitis crónica | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-bronquitis-cronica.svg` | 1 |
| `cp-servier-bulbo-olfatorio` | Bulbo olfatorio | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-bulbo-olfatorio.svg` | 1 |
| `cp-servier-calculos` | Cálculos | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-calculos.svg` | 1 |
| `cp-servier-calor` | Calor | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-calor.svg` | 1 |
| `cp-servier-candado` | Candado cerrado | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-candado.svg` | 2 |
| `cp-servier-capilares` | Red capilar | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-capilares.svg` | 5 |
| `cp-servier-capsula` | Cápsula | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-capsula.svg` | 0 |
| `cp-servier-cavidad-nasal` | Cavidad nasal | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-cavidad-nasal.svg` | 2 |
| `cp-servier-cavidad-oral` | Cavidad oral | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-cavidad-oral.svg` | 1 |
| `cp-servier-celula-vacia` | Célula (contorno y membrana) | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-celula-vacia.svg` | 1 |
| `cp-servier-cerebro` | Encéfalo | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-cerebro.svg` | 10 |
| `cp-servier-ciclista` | Ciclista | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-ciclista.svg` | 4 |
| `cp-servier-cigarrillo` | Cigarrillo | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-cigarrillo.svg` | 1 |
| `cp-servier-circulacion-pulmonar` | Circulación pulmonar | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-circulacion-pulmonar.svg` | 0 |
| `cp-servier-circulacion-venosa` | Circulación de retorno | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-circulacion-venosa.svg` | 0 |
| `cp-servier-cirrosis` | Cirrosis | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-cirrosis.svg` | 1 |
| `cp-servier-coagulo` | Coágulo con plaquetas y fibrina | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-coagulo.svg` | 0 |
| `cp-servier-colelitiasis` | Litiasis biliar | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-colelitiasis.svg` | 1 |
| `cp-servier-colitis` | Inflamación intestinal | illustration | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-colitis.svg` | 1 |
| `cp-servier-colon` | Colon | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-colon.svg` | 2 |
| `cp-servier-conduccion-cardiaca` | Sistema de conducción del corazón | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-conduccion-cardiaca.svg` | 0 |
| `cp-servier-corazon` | Corazón | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-corazon.svg` | 3 |
| `cp-servier-corazon-interior` | Corazón por dentro | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-corazon-interior.svg` | 5 |
| `cp-servier-corredor` | Persona corriendo | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-corredor.svg` | 2 |
| `cp-servier-cronometro` | Cronómetro | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-cronometro.svg` | 1 |
| `cp-servier-curva-gauss` | Curva de distribución normal | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-curva-gauss.svg` | 3 |
| `cp-servier-dentadura` | Dentadura del adulto | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-dentadura.svg` | 1 |
| `cp-servier-descenso-exponencial` | Descenso exponencial | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-descenso-exponencial.svg` | 1 |
| `cp-servier-diente` | Diente | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-diente.svg` | 0 |
| `cp-servier-dosis-efecto` | Relación dosis-efecto | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-dosis-efecto.svg` | 1 |
| `cp-servier-ecg` | Trazo electrocardiográfico | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-ecg.svg` | 4 |
| `cp-servier-edema-miembros` | Edema de miembros inferiores | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-edema-miembros.svg` | 1 |
| `cp-servier-edema-pulmonar` | Edema pulmonar | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-edema-pulmonar.svg` | 1 |
| `cp-servier-enfisema` | Enfisema | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-enfisema.svg` | 1 |
| `cp-servier-eritrocito` | Eritrocito | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-eritrocito.svg` | 7 |
| `cp-servier-estomago` | Estómago | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-estomago.svg` | 1 |
| `cp-servier-fibra-muscular` | Fibra muscular | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-fibra-muscular.svg` | 3 |
| `cp-servier-fibrina` | Red de fibrina | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-fibrina.svg` | 0 |
| `cp-servier-frio` | Frío | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-frio.svg` | 2 |
| `cp-servier-grafica-perfusion` | Concentración en perfusión continua | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-grafica-perfusion.svg` | 1 |
| `cp-servier-grafica-renal` | Función renal normal y reducida | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-grafica-renal.svg` | 1 |
| `cp-servier-grifo` | Grifo | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-grifo.svg` | 0 |
| `cp-servier-hematopoyesis` | Hematopoyesis | illustration | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-hematopoyesis.svg` | 1 |
| `cp-servier-hepatomegalia` | Hepatomegalia | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-hepatomegalia.svg` | 1 |
| `cp-servier-herida` | Cicatrización de una herida | illustration | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-herida.svg` | 11 |
| `cp-servier-hernia-hiatal` | Hernia hiatal | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-hernia-hiatal.svg` | 1 |
| `cp-servier-hernia-paraesofagica` | Unión esofagogástrica | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-hernia-paraesofagica.svg` | 1 |
| `cp-servier-higado` | Hígado | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-higado.svg` | 1 |
| `cp-servier-hipertonico` | Eritrocito en medio hipertónico | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-hipertonico.svg` | 0 |
| `cp-servier-hipotonico` | Eritrocito en medio hipotónico | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-hipotonico.svg` | 0 |
| `cp-servier-inhalador` | Inhalador | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-inhalador.svg` | 2 |
| `cp-servier-intercambio-gaseoso` | Intercambio gaseoso alveolar | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-intercambio-gaseoso.svg` | 1 |
| `cp-servier-intestino` | Intestino | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-intestino.svg` | 1 |
| `cp-servier-intestino-delgado` | Intestino delgado | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-intestino-delgado.svg` | 2 |
| `cp-servier-inyectable` | Ampolleta inyectable | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-inyectable.svg` | 3 |
| `cp-servier-islote-langerhans` | Islote de Langerhans | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-islote-langerhans.svg` | 2 |
| `cp-servier-isotonico` | Eritrocito en medio isotónico | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-isotonico.svg` | 0 |
| `cp-servier-jeringa` | Jeringa | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-jeringa.svg` | 2 |
| `cp-servier-laringe` | Laringe | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-laringe.svg` | 4 |
| `cp-servier-lengua` | Lengua | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-lengua.svg` | 2 |
| `cp-servier-lentes` | Lentes | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-lentes.svg` | 2 |
| `cp-servier-libreta` | Libreta de registro | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-libreta.svg` | 15 |
| `cp-servier-libro` | Libro | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-libro.svg` | 1 |
| `cp-servier-linfatico` | Sistema linfático | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-linfatico.svg` | 2 |
| `cp-servier-linfocito` | Linfocito | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-linfocito.svg` | 1 |
| `cp-servier-llave` | Llave | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-llave.svg` | 1 |
| `cp-servier-lobulos-pulmonares` | Lóbulos pulmonares | illustration | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-lobulos-pulmonares.svg` | 3 |
| `cp-servier-macrofago` | Macrófago | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-macrofago.svg` | 0 |
| `cp-servier-mano` | Mano | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-mano.svg` | 2 |
| `cp-servier-mitocondria` | Mitocondria | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-mitocondria.svg` | 1 |
| `cp-servier-musculatura` | Musculatura corporal | illustration | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-musculatura.svg` | 3 |
| `cp-servier-musculo` | Músculo | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-musculo.svg` | 1 |
| `cp-servier-musculo-liso` | Músculo liso | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-musculo-liso.svg` | 0 |
| `cp-servier-musculos-ojo` | Músculos del ojo | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-musculos-ojo.svg` | 1 |
| `cp-servier-neumotorax` | Neumotórax | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-neumotorax.svg` | 5 |
| `cp-servier-neutrofilo` | Neutrófilo | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-neutrofilo.svg` | 1 |
| `cp-servier-nucleo` | Núcleo celular | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-nucleo.svg` | 0 |
| `cp-servier-oido` | Oído | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-oido.svg` | 1 |
| `cp-servier-ojo` | Ojo | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-ojo.svg` | 4 |
| `cp-servier-ojo-corte` | Ojo en corte | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-ojo-corte.svg` | 2 |
| `cp-servier-pancreas` | Páncreas | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-pancreas.svg` | 2 |
| `cp-servier-peristalsis` | Peristalsis | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-peristalsis.svg` | 2 |
| `cp-servier-piel` | Piel sana | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-piel.svg` | 2 |
| `cp-servier-pierna` | Extremidad inferior | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-pierna.svg` | 3 |
| `cp-servier-plaqueta` | Plaqueta | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-plaqueta.svg` | 0 |
| `cp-servier-portasueros` | Portasueros | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-portasueros.svg` | 2 |
| `cp-servier-pulmon` | Pulmones | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-pulmon.svg` | 1 |
| `cp-servier-quemadura-1er` | Quemadura de primer grado | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-quemadura-1er.svg` | 0 |
| `cp-servier-quemadura-2do` | Quemadura de segundo grado | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-quemadura-2do.svg` | 2 |
| `cp-servier-quemadura-3er` | Quemadura de tercer grado | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-quemadura-3er.svg` | 0 |
| `cp-servier-radiacion-uv` | Radiación ultravioleta | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-radiacion-uv.svg` | 1 |
| `cp-servier-receptor-membrana` | Receptor de membrana | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-receptor-membrana.svg` | 0 |
| `cp-servier-recto` | Recto | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-recto.svg` | 1 |
| `cp-servier-respiracion` | Inspiración | illustration | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-respiracion.svg` | 5 |
| `cp-servier-rinon` | Riñón | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-rinon.svg` | 4 |
| `cp-servier-rostro-mayor` | Rostro de persona mayor | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-rostro-mayor.svg` | 2 |
| `cp-servier-sanitario` | Sanitario | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-sanitario.svg` | 0 |
| `cp-servier-semaforo` | Semáforo | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-semaforo.svg` | 1 |
| `cp-servier-senos-paranasales` | Senos paranasales | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-senos-paranasales.svg` | 3 |
| `cp-servier-sol` | Sol | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-sol.svg` | 1 |
| `cp-servier-tableta` | Tableta | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-tableta.svg` | 2 |
| `cp-servier-tendon` | Unión musculotendinosa | illustration | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-tendon.svg` | 1 |
| `cp-servier-tep` | Tromboembolia pulmonar | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-tep.svg` | 1 |
| `cp-servier-tos` | Tos | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-tos.svg` | 1 |
| `cp-servier-traslado-carga` | Levantamiento y traslado | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-traslado-carga.svg` | 1 |
| `cp-servier-trombosis` | Trombosis venosa | illustration | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-trombosis.svg` | 1 |
| `cp-servier-ulcera-gastrica` | Úlcera gástrica | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-ulcera-gastrica.svg` | 2 |
| `cp-servier-vejiga` | Vejiga | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-vejiga.svg` | 2 |
| `cp-servier-vellosidades` | Vellosidades intestinales | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-vellosidades.svg` | 2 |
| `cp-servier-vena` | Vena | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-vena.svg` | 3 |
| `cp-servier-ventilador` | Ventilador | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-ventilador.svg` | 2 |
| `cp-servier-via-aerea-superior` | Vía aérea superior | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-via-aerea-superior.svg` | 6 |
| `cp-servier-via-intrapulmonar` | Vía aérea intrapulmonar | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-via-intrapulmonar.svg` | 3 |
| `cp-servier-virus` | Virus | illustration | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-virus.svg` | 1 |
| `cp-servier-virus-hepatitis` | Virus de la hepatitis | medical_icon | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/cp-servier-virus-hepatitis.svg` | 1 |
| `cp-smart-arterias-cerebrales` | Arterias cerebrales | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-arterias-cerebrales.png` | 1 |
| `cp-smart-arterias-cuello` | Arterias de cabeza y cuello | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-arterias-cuello.png` | 3 |
| `cp-smart-caja-toracica` | Caja torácica | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-caja-toracica.png` | 5 |
| `cp-smart-colon` | Colon en corte | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-colon.png` | 1 |
| `cp-smart-craneo` | Cráneo | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-craneo.png` | 7 |
| `cp-smart-deglucion` | Deglución | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-deglucion.png` | 3 |
| `cp-smart-esofago` | Esófago en corte | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-esofago.png` | 2 |
| `cp-smart-esqueleto` | Esqueleto | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-esqueleto.png` | 3 |
| `cp-smart-esqueleto-nino` | Esqueleto del niño | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-esqueleto-nino.png` | 5 |
| `cp-smart-evc-hemorragico` | Ictus hemorrágico | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-evc-hemorragico.png` | 3 |
| `cp-smart-evc-isquemico` | Ictus isquémico | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-evc-isquemico.png` | 1 |
| `cp-smart-fractura-clavicula` | Fractura de clavícula | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-fractura-clavicula.png` | 1 |
| `cp-smart-fractura-costal` | Fractura costal | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-fractura-costal.png` | 2 |
| `cp-smart-fractura-hombro` | Fractura del hombro | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-fractura-hombro.png` | 1 |
| `cp-smart-hernia-discal` | Hernia discal | illustration | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-hernia-discal.png` | 1 |
| `cp-smart-holter` | Registro electrocardiográfico continuo | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-holter.png` | 1 |
| `cp-smart-laringe-corte` | Laringe en corte | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-laringe-corte.png` | 2 |
| `cp-smart-mama` | Mama | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-mama.png` | 1 |
| `cp-smart-medula-espinal` | Médula espinal en corte | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-medula-espinal.png` | 6 |
| `cp-smart-meningitis` | Meningitis | illustration | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-meningitis.png` | 1 |
| `cp-smart-nefrona` | Nefrona | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-nefrona.png` | 1 |
| `cp-smart-pelvis` | Pelvis | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-pelvis.png` | 1 |
| `cp-smart-placenta` | Placenta | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-placenta.png` | 3 |
| `cp-smart-placenta-previa` | Placenta previa | illustration | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-placenta-previa.png` | 2 |
| `cp-smart-rodilla` | Rodilla | illustration | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-rodilla.png` | 1 |
| `cp-smart-suprarrenal` | Glándula suprarrenal | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-suprarrenal.png` | 1 |
| `cp-smart-testiculo` | Testículo | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-testiculo.png` | 1 |
| `cp-smart-tiroides` | Tiroides | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-tiroides.png` | 1 |
| `cp-smart-utero` | Útero | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-utero.png` | 5 |
| `cp-smart-vesicula` | Vesícula biliar y duodeno | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/cp-smart-vesicula.png` | 1 |
| `dg-agentes-quemadura` | Agentes que producen una quemadura | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-agentes-quemadura.svg` | 1 |
| `dg-bomba-sodio-potasio` | Bomba Na⁺/K⁺ ATPasa | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-bomba-sodio-potasio.svg` | 1 |
| `dg-cascada-coagulacion` | Hemostasia: de la lesión al coágulo | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-cascada-coagulacion.svg` | 2 |
| `dg-celula-organelos` | La célula y sus organelos | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-celula-organelos.svg` | 1 |
| `dg-circulacion-mayor-menor` | Circulación mayor y menor | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-circulacion-mayor-menor.svg` | 1 |
| `dg-clasificacion-shock` | Clasificación del estado de shock | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-clasificacion-shock.svg` | 4 |
| `dg-columna-vertebral` | Columna vertebral | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-columna-vertebral.svg` | 1 |
| `dg-cuadrantes-abdominales` | Cuadrantes abdominales | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-cuadrantes-abdominales.svg` | 3 |
| `dg-curva-oxihemoglobina` | Curva de disociación de la oxihemoglobina | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-curva-oxihemoglobina.svg` | 2 |
| `dg-ecg-onda-normal` | Onda electrocardiográfica normal | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-ecg-onda-normal.svg` | 2 |
| `dg-encefalo-regiones` | Regiones del encéfalo | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-encefalo-regiones.svg` | 4 |
| `dg-equilibrio-acido-base` | Equilibrio ácido-base | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-equilibrio-acido-base.svg` | 2 |
| `dg-gasto-cardiaco` | Determinantes del gasto cardíaco | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-gasto-cardiaco.svg` | 1 |
| `dg-glandulas-endocrinas` | Glándulas endocrinas | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-glandulas-endocrinas.svg` | 1 |
| `dg-grados-quemadura` | Profundidad de la quemadura | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-grados-quemadura.svg` | 3 |
| `dg-nefrona` | La nefrona | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-nefrona.svg` | 2 |
| `dg-picaduras-mordeduras` | Picaduras y mordeduras | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-picaduras-mordeduras.svg` | 1 |
| `dg-piel-capas` | Capas de la piel | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-piel-capas.svg` | 2 |
| `dg-receptores-adrenergicos` | Receptores adrenérgicos y sus efectos | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-receptores-adrenergicos.svg` | 1 |
| `dg-secuencia-intubacion` | Secuencia rápida de intubación: etapas | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-secuencia-intubacion.svg` | 1 |
| `dg-sistema-conduccion` | Sistema de conducción cardíaca | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-sistema-conduccion.svg` | 3 |
| `dg-soluciones-cristaloides` | Osmolaridad de las soluciones | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-soluciones-cristaloides.svg` | 2 |
| `dg-tipos-hemorragia` | Tipos de hemorragia | composite | PTEM | PTEM (composición) y los autores de sus componentes | [PTEM-Propia]() | `public/imagenes/medical/composiciones/dg-tipos-hemorragia.svg` | 2 |
| `ic-adultos-mayores` | Personas mayores | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-adultos-mayores.png` | 2 |
| `ic-ambulancia` | Ambulancia | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-ambulancia.png` | 8 |
| `ic-botiquin` | Botiquín de urgencias | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-botiquin.png` | 1 |
| `ic-camilla` | Camilla | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-camilla.png` | 3 |
| `ic-collarin` | Collarín cervical | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-collarin.png` | 5 |
| `ic-desfibrilador` | Desfibrilador | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-desfibrilador.png` | 8 |
| `ic-esguince` | Esguince de tobillo | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-esguince.png` | 1 |
| `ic-estetoscopio` | Estetoscopio | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-estetoscopio.png` | 10 |
| `ic-feto-utero` | Feto en el útero | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-feto-utero.png` | 4 |
| `ic-fractura` | Fractura de fémur | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-fractura.png` | 7 |
| `ic-higiene-manos` | Higiene de manos | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-higiene-manos.png` | 1 |
| `ic-hueso` | Estructura del hueso | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-hueso.png` | 5 |
| `ic-nino` | Paciente pediátrico | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-nino.png` | 17 |
| `ic-rcp` | Compresiones torácicas | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-rcp.png` | 6 |
| `ic-recien-nacido` | Recién nacido | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-recien-nacido.png` | 6 |
| `ic-silla-ruedas` | Silla de ruedas | illustration | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-silla-ruedas.png` | 1 |
| `ic-tension-arterial` | Toma de presión arterial | medical_icon | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/ic-tension-arterial.png` | 4 |
| `il-arbol-traqueobronquial` | Árbol traqueobronquial y pulmones | illustration | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/il-arbol-traqueobronquial.svg` | 4 |
| `il-columna-vertebral` | Columna vertebral | diagram_component | Servier Medical Art (SMART) | Servier | [CC-BY-4.0](https://creativecommons.org/licenses/by/4.0/) | `public/imagenes/medical/smart/il-columna-vertebral.png` | 1 |
| `il-corazon-vascularizacion` | Corazón y arterias coronarias | illustration | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/il-corazon-vascularizacion.svg` | 2 |
| `il-encefalo-corte` | Encéfalo en corte sagital | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/il-encefalo-corte.svg` | 4 |
| `il-piel-corte` | Piel en corte | diagram_component | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/il-piel-corte.svg` | 0 |
| `il-tracto-digestivo` | Tracto digestivo | illustration | BioIcons | Servier | [CC-BY-3.0](https://creativecommons.org/licenses/by/3.0/) | `public/imagenes/medical/bioicons/il-tracto-digestivo.svg` | 2 |

## 4. Curación: por qué se eligió cada activo

Esta justificación NO viaja en el catálogo que consume el navegador (son 228
párrafos que nadie ve en pantalla): vive aquí, que es donde se revisa.

| assetId | Motivo de la elección | Equivalencia comprobada |
|---|---|---|
| `cp-cc0-bacteria` | Segunda figura bacteriana, para composiciones donde la de Servier ya está usada. Fuente CC0. | Componente de la composición de sepsis. |
| `cp-cc0-corrosivo` | La quemadura química es uno de los agentes del plan, y el pictograma es lo que identifica el producto en la escena. Fuente CC0. | Componente de la composición de agentes de quemadura. |
| `cp-cc0-explosivo` | El tema de impactos en explosiones necesita identificar el agente; el pictograma es el que aparece en el transporte de mercancías. Fuente CC0. | Componente de la composición de explosiones. |
| `cp-cc0-gas` | Es el pictograma del tanque de oxígeno, que el plan trata como material y como riesgo. Fuente CC0. | Cobertura nueva para tipos de tanques de oxígeno. |
| `cp-cc0-guantes` | Icono de seguridad de la escena y de control de hemorragia con protección. Fuente CC0. | Reemplaza 🧤. |
| `cp-cc0-inflamable` | Identifica el agente causal en el tema de agentes térmicos. Fuente CC0. | Reemplaza 🧯 en agentes de quemadura. |
| `cp-cc0-lupa` | Icono de exploración dirigida y de valoración por regiones. Fuente CC0. | Reemplaza 🔎 y 🔍. |
| `cp-cc0-nefrona` | Es la única nefrona VECTORIAL de los dos bancos, y una composición solo puede embeber SVG. La versión de SMART, más detallada, se sirve además como ilustración aparte del mismo tema. Fuente CC0. | Componente del sustituto de la imagen de Drive «La nefrona». |
| `cp-cc0-nocivo` | Completa el juego de pictogramas del tema toxicológico. Fuente CC0. | Componente de la composición de toxíndromes. |
| `cp-cc0-paciente` | Icono neutro de «el paciente» para los temas de evaluación e impresión general. Fuente CC0. | Reemplaza 🚑 y 👀 en los temas de evaluación, donde el objeto es la persona y no el vehículo. |
| `cp-cc0-potencial-accion` | Es la consecuencia funcional de la bomba Na⁺/K⁺: la composición necesita mostrar para qué sirve el gradiente. Fuente CC0. | Componente del sustituto de public/imagenes/m2/bomba-sodio-potasio.svg. |
| `cp-cc0-riesgo-biologico` | La seguridad de la escena incluye el riesgo biológico; es el símbolo que se busca en el entorno. Fuente CC0. | Reemplaza 🛡️ en el tema de SSS. |
| `cp-cc0-termometro` | Icono de temperatura y signos vitales. Fuente CC0, preferida por la política de licencias. | Reemplaza 🌡️. |
| `cp-cc0-toxico` | En toxicología el pictograma normalizado es información real: es lo que el alumno verá en el envase de la escena. Fuente CC0. | Reemplaza ☠️ en intoxicaciones y toxíndromes. |
| `cp-cc0-tubo-muestra` | Referencia de los datos que el prehospitalario no tiene: distingue lo que se mide en la calle de lo que se mide en el hospital. Fuente CC0. | Cobertura nueva para desequilibrio ácido-base y electrolítico. |
| `cp-cc0-virus` | Figura viral de respaldo para composiciones pediátricas. Fuente CC0. | Componente de la composición de infección respiratoria pediátrica. |
| `cp-dbcls-abeja` | Es el agente más frecuente de anafilaxia por picadura en el plan. | Reemplaza 🐝 en shock anafiláctico y es componente de la composición de picaduras. |
| `cp-dbcls-arana` | El tema enumera mordedura de araña como cuadro propio. | Componente de la composición de picaduras y mordeduras. |
| `cp-dbcls-examen-nino` | El plan insiste en que al niño se le explora sin separarlo de su acompañante; la figura muestra esa relación. | Reemplaza 👨‍👩‍👧 en asuntos familiares y cubre la evaluación pediátrica. |
| `cp-dbcls-neurona` | Es la neurona completa —con axón mielinizado y terminaciones— que el tema «Neurona y sinapsis» necesita. Se prefirió sobre las variantes CC0 porque ninguna dibuja la mielina. | Sustituye la imagen de Drive «Neurona y sinapsis». Deuda declarada: la sinapsis se rotula en el pie, porque el dibujo llega a las terminaciones y no amplía la hendidura. |
| `cp-dbcls-serpiente` | El tema enumera mordedura de serpiente. Deuda declarada: la especie del dibujo no es una de las de importancia médica en México, así que la figura ilustra el mecanismo, no la identificación de especie. | Componente de la composición de picaduras y mordeduras. |
| `cp-dbcls-tipos-neurona` | El arco reflejo y la exploración neurológica se explican con los tres tipos, no con uno. | Cobertura nueva para el sistema nervioso y la exploración neurológica. |
| `cp-servier-adulta-mayor` | Segunda figura geriátrica, para que la unidad no represente a toda la población mayor con una sola persona. | Cobertura nueva para los temas geriátricos. |
| `cp-servier-adulto-mayor` | Icono de la unidad de geriatría. | Reemplaza 👴 y los emojis genéricos de los temas geriátricos. |
| `cp-servier-agua` | Icono de líquidos corporales e hidratación, donde el asunto es el agua y no una vía de administración. | Reemplaza 💧 en líquidos, electrolitos y deshidratación. |
| `cp-servier-alcohol` | El síndrome de abstinencia del plan es sobre todo alcohólico: el agente es la sustancia. | Reemplaza 🥃 en síndrome de abstinencia. |
| `cp-servier-anticuerpo` | Icono del sistema inmunitario y de la reacción anafiláctica. | Reemplaza 🛡️ y 🚨 en inmunidad y anafilaxia, donde el escudo y la sirena eran metáforas. |
| `cp-servier-aorta` | La disrupción aórtica traumática ocurre en un punto concreto del cayado: sin la figura, el tema queda sin referencia anatómica. | Cobertura nueva para disrupción aórtica e hipertensión. |
| `cp-servier-arteria` | Explica por qué la arteria soporta presión y la vena no: base de hipertensión y de hemorragia arterial. | Componente de las composiciones vasculares y del shock distributivo. |
| `cp-servier-atomizador` | La vía intranasal aparece en el plan como alternativa cuando no hay acceso vascular. | Cobertura nueva para crisis convulsivas y niños con necesidades especiales. |
| `cp-servier-bacteria` | Icono de infección: neumonía, infección urinaria y shock séptico. | Reemplaza 🦠 y 🤧 en los temas infecciosos. |
| `cp-servier-balanza` | Continente del esquema ácido-base: el pH como resultado del equilibrio entre PaCO₂ y HCO₃⁻. | Componente del sustituto de public/imagenes/m2/equilibrio-acido-base.svg. |
| `cp-servier-balanza-desequilibrada` | Representa el desequilibrio, que es el asunto del tema de electrolitos, y sirve al tema médico-legal como símbolo de la ley. | Reemplaza ⚖️ en desequilibrio electrolítico y aspectos médico-legales. |
| `cp-servier-bazo` | Órgano de sangrado abdominal por excelencia en trauma cerrado. | Cobertura nueva para lesión de bazo. |
| `cp-servier-blister` | Es el objeto que se recoge en la escena de una intoxicación por medicamentos y el que se cuenta en polifarmacia. | Cobertura nueva para toxíndromes y polifarmacia. |
| `cp-servier-bolsa-infusion` | Icono de la unidad de vía intravenosa y de las soluciones cristaloides. | Reemplaza 💧 y 🧪 en acceso vascular y soluciones. |
| `cp-servier-bronquio-inflamado` | Es exactamente el mecanismo del asma: la vía aérea se estrecha por dentro. | Reemplaza 🌬️ en el tema de asma. |
| `cp-servier-bronquitis-cronica` | Es el otro componente del EPOC y la base de la bronquitis aguda. | Cobertura nueva para neumonía y bronquitis. |
| `cp-servier-bulbo-olfatorio` | Completa el tema de órganos de los sentidos y explica por qué una fractura de base de cráneo puede dar rinorraquia. | Cobertura nueva para órganos de los sentidos. |
| `cp-servier-calculos` | Representa el objeto que causa la enfermedad en la urolitiasis. | Reemplaza 🪨 en urolitiasis. |
| `cp-servier-calor` | Es el agente del golpe de calor, que es un problema de carga térmica, no de sol directo. | Cobertura nueva para golpe de calor. |
| `cp-servier-candado` | Icono de los temas bloqueados por decisión académica y de la confidencialidad del expediente. | Cobertura nueva para los temas del módulo 7 pendientes de definición y para aspectos médico-legales. |
| `cp-servier-capilares` | Es el lugar donde ocurre la hipoperfusión del shock; sin este nivel el shock se explica solo con presiones. | Componente de las composiciones de circulación y de clasificación del shock. |
| `cp-servier-capsula` | La presentación cambia la dosis disponible: el tema de dosis necesita ver formas distintas. | Cobertura nueva para medicamentos y sus dosis. |
| `cp-servier-cavidad-nasal` | Una cánula nasofaríngea se introduce paralela al suelo de la fosa, no hacia arriba: la figura enseña por qué. | Reemplaza 👃 en el tema de cánulas nasofaríngeas. |
| `cp-servier-cavidad-oral` | Es el espacio donde se mide y se coloca la cánula orofaríngea. DEUDA DECLARADA: el dibujo trae rótulos quemados en inglés (Upper lip, Lower lip, Uvula, Palatine tonsil, Tongue, Palate). Se conservan porque ninguno de los dos bancos autorizados tiene una versión sin rótulos y borrarlos dejaría las líneas guía apuntando al aire. El pie y el texto alternativo nombran las estructuras en español. | Reemplaza 🔧 en el tema de cánulas orofaríngeas. |
| `cp-servier-celula-vacia` | Sirve de continente para la composición de la célula y sus organelos. | Componente del sustituto de la imagen de Drive «La célula y sus organelos». |
| `cp-servier-cerebro` | Icono anatómico del encéfalo para los temas neurológicos y de trauma craneal. | Reemplaza 🧠. |
| `cp-servier-ciclista` | La cinemática necesita cuerpos en movimiento con masa y velocidad; es el material más cercano que ofrecen los bancos autorizados. | Componente de las composiciones de cinemática. Deuda declarada: ninguno de los dos bancos tiene vehículos accidentados. |
| `cp-servier-cigarrillo` | Es el factor de riesgo que encabeza la epidemiología del EPOC y de la cardiopatía isquémica. | Cobertura nueva para epidemiología y clasificación de enfermedades. |
| `cp-servier-circulacion-pulmonar` | Es el otro medio circuito que la composición necesita para enseñar los dos en serie. | Componente del sustituto de public/imagenes/m2/circulacion-mayor-menor.svg. |
| `cp-servier-circulacion-venosa` | Aporta el circuito sistémico completo para la composición de circulación mayor y menor. | Componente del sustituto de public/imagenes/m2/circulacion-mayor-menor.svg. |
| `cp-servier-cirrosis` | Distingue el hígado enfermo del sano, que es lo que el tema compara. | Reemplaza 🫀 en el tema de cirrosis y hepatitis. |
| `cp-servier-coagulo` | Cierra la secuencia de la composición mostrando el tapón definitivo. | Componente del sustituto de «Cascada de la coagulación». |
| `cp-servier-colelitiasis` | Muestra a la vez el órgano y la causa, que es lo que el tema explica. | Reemplaza 🟡 en colelitiasis y colecistitis. |
| `cp-servier-colitis` | Es la figura de la colitis: pared inflamada, no un símbolo de dolor. | Reemplaza 🔥 en el tema de gastritis y colitis. |
| `cp-servier-colon` | Referencia anatómica de apendicitis, colitis y oclusión baja. DEUDA DECLARADA: el dibujo trae rótulos quemados en inglés (Rectum, Sigmoid, Descendant colon, Transverse, Ascending, Caecum, Appendix). Se conservan porque ninguno de los dos bancos autorizados tiene una versión sin rótulos y borrarlos dejaría las líneas guía apuntando al aire. El pie y el texto alternativo nombran las estructuras en español. | Reemplaza 🔺 en apendicitis por la estructura donde está el apéndice. |
| `cp-servier-conduccion-cardiaca` | Representa el recorrido del impulso sobre la anatomía real, que es lo que el SVG generado esquematizaba con cajas. | Base del sustituto de public/imagenes/m2/sistema-conduccion.svg; la composición conserva marcapasos y frecuencias de escape. |
| `cp-servier-corazon` | Icono anatómico del corazón: el emoji dibujaba un corazón simbólico, no el órgano. | Reemplaza 🫀 y ❤️ en los temas cardiovasculares. |
| `cp-servier-corazon-interior` | Necesario para exploración cardíaca e insuficiencia: el flujo dentro del corazón no se ve desde fuera. | Cobertura nueva para los temas de exploración cardíaca e insuficiencia. |
| `cp-servier-corredor` | Segundo cuerpo en movimiento para las composiciones de energía cinética y desaceleración. | Componente de las composiciones de cinemática. |
| `cp-servier-cronometro` | Varios temas del plan son problemas de tiempo: ventana del ictus, tiempo de isquemia, tiempo de escena. | Reemplaza ⏱️ y ⏳ en los temas donde el tiempo es el criterio. |
| `cp-servier-curva-gauss` | Es la figura de los conceptos básicos de epidemiología: frecuencia y dispersión. | Reemplaza 📊 en conceptos básicos de epidemiología. |
| `cp-servier-dentadura` | La alteración de la oclusión dentaria es un signo clave de fractura de Le Fort y de mandíbula. | Cobertura nueva para fracturas de Le Fort. |
| `cp-servier-descenso-exponencial` | Es la vida media: por qué una dosis se repite a intervalos y no cuando el paciente lo pide. | Cobertura nueva para generalidades de farmacología. |
| `cp-servier-diente` | Icono para el trauma dentofacial. DEUDA DECLARADA: el dibujo trae rótulos quemados en inglés (Enamel, Dentin, Gum, Pulp cavity, Nerves and blood vessels, Maxillary bone, Cementum). Se conservan porque ninguno de los dos bancos autorizados tiene una versión sin rótulos y borrarlos dejaría las líneas guía apuntando al aire. El pie y el texto alternativo nombran las estructuras en español. | Reemplaza 🦷 junto con la figura del macizo facial. |
| `cp-servier-dosis-efecto` | Es la figura de la ventana terapéutica: más dosis no es más efecto indefinidamente. | Cobertura nueva para dosis en la urgencia. |
| `cp-servier-ecg` | Aporta el trazo y la cuadrícula reales; los rótulos de onda e intervalo los pone la composición en español. | Base del sustituto de public/imagenes/m3/ecg-onda-normal.svg. |
| `cp-servier-edema-miembros` | Es el signo visible de la insuficiencia cardíaca derecha, y se busca en la exploración. | Reemplaza 💔 en el tema de insuficiencia cardíaca por el signo que se explora. |
| `cp-servier-edema-pulmonar` | Muestra el mecanismo del edema en el sitio donde ocurre, sin salirse del nivel del tema. | Reemplaza 🌊 en edema agudo de pulmón. |
| `cp-servier-enfisema` | Explica por qué el paciente con EPOC atrapa aire y desatura: es pérdida de superficie, no falta de esfuerzo. | Reemplaza 💨 en el tema de EPOC agudizado. |
| `cp-servier-eritrocito` | Icono de «sangre» que sí representa sangre: la célula que transporta el oxígeno, no una gota de tinta. | Reemplaza 🩸 en hemorragia, hematología y transporte de oxígeno. |
| `cp-servier-estomago` | Icono anatómico para los temas gástricos. | Reemplaza 🍽️ y 🥞 por la estructura correspondiente. |
| `cp-servier-fibra-muscular` | El síndrome de aplastamiento libera el contenido de esta fibra a la sangre: sin la célula, la rabdomiólisis es una palabra. | Cobertura nueva para síndrome de aplastamiento y compartimental. |
| `cp-servier-fibrina` | Es el producto final de la cascada; sin él la composición explicaría el proceso sin su resultado. | Componente del sustituto de «Cascada de la coagulación». |
| `cp-servier-frio` | Es el agente de la hipotermia y del componente térmico de la tríada letal. | Reemplaza ❄️ en hipotermia. |
| `cp-servier-grafica-perfusion` | Explica por qué las aminas se administran en perfusión y no en bolo: el objetivo es una concentración estable. | Cobertura nueva para manejo de infusiones y aminas. |
| `cp-servier-grafica-renal` | Es la consecuencia práctica de la insuficiencia renal: el fármaco se acumula. | Cobertura nueva para insuficiencia renal. |
| `cp-servier-grifo` | Icono de entrada y salida de agua del organismo, que es el marco del balance hídrico. | Reemplaza 🚰 en el tema urinario junto con la figura del riñón. |
| `cp-servier-hematopoyesis` | Icono del tema hematopoyético: representa la función del sistema, no un símbolo genérico. | Reemplaza 🩸 en el tema hematopoyético, que repetía el de hemorragia. |
| `cp-servier-hepatomegalia` | Es un hallazgo de la exploración abdominal que se puede palpar en la calle. | Cobertura nueva para exploración abdominal e insuficiencia cardíaca derecha. |
| `cp-servier-herida` | Icono de heridas y vendajes basado en la lesión real, no en una tirita. | Reemplaza 🩹. |
| `cp-servier-hernia-hiatal` | Sirve de referencia al hiato diafragmático, que es también la vía de la ruptura diafragmática traumática. | Cobertura nueva para ruptura diafragmática y reflujo. |
| `cp-servier-hernia-paraesofagica` | Referencia anatómica para lesión de esófago torácico. | Cobertura nueva para lesión de esófago. |
| `cp-servier-higado` | Icono anatómico para hepatitis, cirrosis y trauma hepático. | Reemplaza 🫀 en temas hepáticos, donde el emoji del corazón era el órgano equivocado. |
| `cp-servier-hipertonico` | Completa la comparación osmolar de las tres situaciones. | Componente de la composición de soluciones cristaloides. |
| `cp-servier-hipotonico` | Muestra la consecuencia de administrar una solución de menor osmolaridad. | Componente de la composición de soluciones cristaloides. |
| `cp-servier-inhalador` | Icono de asma y EPOC, donde el tratamiento es inhalado. | Reemplaza 🌬️ en asma y 💨 en EPOC por el dispositivo real. |
| `cp-servier-intercambio-gaseoso` | Es el punto exacto donde la circulación menor cumple su función. | Componente de los sustitutos de circulacion-mayor-menor.svg y curva-oxihemoglobina.svg. |
| `cp-servier-intestino` | Icono anatómico para oclusión intestinal, trauma de intestino y dolor abdominal. | Reemplaza 🌀 y ⛔ en los temas intestinales. |
| `cp-servier-intestino-delgado` | Distingue el delgado del colon, que es lo que cambia el cuadro en una oclusión. | Cobertura nueva para oclusión intestinal y lesión de intestino. |
| `cp-servier-inyectable` | La concentración va en la ampolleta: es el objeto que hay que leer antes de calcular una dosis. | Cobertura nueva para dosis en la urgencia y farmacología. |
| `cp-servier-islote-langerhans` | Es el lugar exacto donde falla la diabetes; el páncreas entero no lo distingue. | Cobertura nueva para diabetes mellitus y complicaciones diabéticas. |
| `cp-servier-isotonico` | Es la referencia con la que se comparan hipo e hipertónico: la razón de que la solución de elección sea isotónica. | Componente de la composición de soluciones cristaloides. |
| `cp-servier-jeringa` | Icono de administración parenteral y de secuencia de intubación. | Reemplaza 💉. |
| `cp-servier-laringe` | Es el punto anatómico exacto de la cricotirotomía y del trauma laringotraqueal. | Reemplaza ⚠️ y 🗣️ en cricotirotomía y trauma de laringe. |
| `cp-servier-lengua` | En el paciente inconsciente la lengua es la primera causa de obstrucción; también sirve al tema del gusto. | Cobertura nueva para apertura de vía aérea y sentidos. |
| `cp-servier-lentes` | El déficit visual y auditivo cambia la comunicación con el paciente geriátrico y su riesgo de caída. | Cobertura nueva para cambios fisiológicos del paciente geriátrico. |
| `cp-servier-libreta` | SAMPLE, el informe y la documentación médico-legal son actos de registro. | Reemplaza 📋 y 📝 en SAMPLE, evaluación y documentación. |
| `cp-servier-libro` | Icono de terminología médica y de los temas de definición y marco conceptual. | Reemplaza 📖 en terminología médica. |
| `cp-servier-linfatico` | Icono del tema linfático que muestra la distribución real del sistema. | Reemplaza 🛡️ en el tema linfático e inmunitario. |
| `cp-servier-linfocito` | Célula de la inmunidad específica, complemento del anticuerpo en el tema inmunitario. | Cobertura nueva para el sistema linfático e inmunitario. |
| `cp-servier-llave` | El tema de obtención de acceso trata de abrir un espacio para llegar al paciente. | Cobertura nueva para obtención de acceso y extracción. |
| `cp-servier-lobulos-pulmonares` | La exploración de tórax se organiza por campos; sin los lóbulos, auscultar «por campos» no tiene mapa. | Cobertura nueva para exploración de tórax y contusión pulmonar. |
| `cp-servier-macrofago` | Interviene en la limpieza de la herida y en la respuesta inflamatoria. | Componente de la composición de hemostasia y cicatrización. |
| `cp-servier-mano` | Es la referencia de la regla de la palma para estimar superficie quemada y el icono de exploración manual. | Reemplaza 🖐️ y 🫱. |
| `cp-servier-mitocondria` | Icono del metabolismo celular y componente de la composición de la célula: donde se produce el ATP. | Reemplaza 🔥 en el tema de metabolismo, que era una metáfora del gasto energético. |
| `cp-servier-musculatura` | Es la figura en posición anatómica: sirve al tema de posiciones y líneas de referencia. | Reemplaza 🧭 en posiciones anatómicas, líneas y cuadrantes. |
| `cp-servier-musculo` | Icono anatómico del sistema muscular. | Reemplaza 💪, que representaba un gesto y no el tejido. |
| `cp-servier-musculo-liso` | Es el efector de los receptores adrenérgicos: lo que se contrae en el vaso y en el bronquio. | Componente de la composición de receptores adrenérgicos. |
| `cp-servier-musculos-ojo` | La lesión muscular del ojo se explora por la limitación del movimiento; esta es la figura del tema. | Reemplaza 🔄 en el tema de lesión muscular de ojo. |
| `cp-servier-neumotorax` | El plan trata el neumotórax en varios temas; la figura muestra el mecanismo. | Reemplaza 🫧 y 🎈, y es componente del shock obstructivo. |
| `cp-servier-neutrofilo` | Es la célula que responde primero a la infección bacteriana: sostiene los temas infecciosos y la sepsis. | Cobertura nueva para infecciones y shock séptico. |
| `cp-servier-nucleo` | Organelo obligado en la composición de la célula. | Componente del sustituto de «La célula y sus organelos». |
| `cp-servier-oido` | Completa el tema de órganos de los sentidos y da referencia a la otorragia del trauma craneal. | Cobertura nueva para órganos de los sentidos. |
| `cp-servier-ojo` | Icono anatómico para los temas oculares y de exploración de sentidos. | Reemplaza 👁️, 👀 y 📌 en los temas oculares. |
| `cp-servier-ojo-corte` | El hifema es sangre en la cámara anterior: sin el corte no se puede señalar dónde está. | Cobertura nueva para hemorragia conjuntival e hifema y para objeto empalado ocular. |
| `cp-servier-pancreas` | Sirve a pancreatitis y a la composición de glándulas endocrinas. | Reemplaza 🥞 en pancreatitis. |
| `cp-servier-peristalsis` | La oclusión y el íleo son problemas de esta onda; el tema los explica por ausencia o por lucha. | Cobertura nueva para oclusión intestinal y abdomen agudo. |
| `cp-servier-piel` | Icono del tegumentario y referencia de «piel sana» frente a las variantes de quemadura. | Reemplaza 🧴 en el tema del sistema tegumentario. |
| `cp-servier-pierna` | Icono de trauma de extremidad inferior y síndrome compartimental. | Reemplaza 🦵. |
| `cp-servier-plaqueta` | Componente de la composición de hemostasia: la fase plaquetaria necesita su protagonista. | Componente del sustituto de la imagen de Drive «Cascada de la coagulación». |
| `cp-servier-portasueros` | Icono del manejo de infusiones y aminas, donde el asunto es el ritmo de administración. | Reemplaza ⏳ en el tema de infusiones y aminas. |
| `cp-servier-pulmon` | Icono anatómico del pulmón para los temas respiratorios. | Reemplaza 🫁. |
| `cp-servier-quemadura-1er` | La clasificación por grados solo se entiende comparando las tres profundidades en el mismo corte. | Componente de la composición de grados de quemadura. |
| `cp-servier-quemadura-2do` | El plan exige distinguir profundidad; este corte lo muestra sobre la misma piel del icono anterior. | Reemplaza 🔥 y 🧯 en los temas de quemaduras. No se usa en metabolismo ni gastritis, donde el fuego no representaba nada anatómico. |
| `cp-servier-quemadura-3er` | Es la que explica el dato contraintuitivo del tema: no duele en el centro porque el nervio se destruyó. | Componente de la composición de grados de quemadura. |
| `cp-servier-radiacion-uv` | La radiación es uno de los agentes de quemadura que el plan enumera. | Componente de la composición de agentes de quemadura. |
| `cp-servier-receptor-membrana` | Es la estructura que la farmacología del plan necesita: dónde se une el fármaco. | Componente del sustituto de «Receptores adrenérgicos y sus efectos». |
| `cp-servier-recto` | Extremo distal del tubo digestivo, referencia del sangrado bajo. | Cobertura nueva para sangrado de tubo digestivo. |
| `cp-servier-respiracion` | Icono de ventilación basado en la mecánica real, no en el emoji del soplo. | Reemplaza 💨 y 🌬️. |
| `cp-servier-rinon` | Icono anatómico para insuficiencia renal, urolitiasis y aparato urinario. | Reemplaza 🫘 y 🚰 en los temas urinarios. |
| `cp-servier-rostro-mayor` | El tema de comunicación con el adulto mayor trata de mirar a la cara, hablar despacio y comprobar audición: la figura es el rostro. | Reemplaza 💬 en el tema de comunicación con el adulto mayor. |
| `cp-servier-sanitario` | Los síntomas urinarios se cuentan en episodios de micción: disuria, polaquiuria, tenesmo. | Reemplaza 🚻 en infección de vías urinarias. |
| `cp-servier-semaforo` | El triage se decide por color de prioridad; el semáforo es el objeto que la cultura ya asocia a esa decisión. | Cobertura nueva para triage y clasificación por prioridad. |
| `cp-servier-senos-paranasales` | Da el mapa del macizo facial que necesitan el trauma facial y la exploración de la cara. | Reemplaza 🦷 y 😷 en fracturas faciales. |
| `cp-servier-sol` | Es el agente de la insolación, que el plan distingue del golpe de calor. | Reemplaza ☀️ en insolación. |
| `cp-servier-tableta` | Icono de farmacología general y de polifarmacia. | Reemplaza 💊. |
| `cp-servier-tendon` | Los desgarros ocurren en esta unión; es la figura del tema de esguinces y desgarros. DEUDA DECLARADA: el dibujo trae rótulos quemados en inglés (Tendon, Epimysium, Fascicle, Fiber, Fibril, Collagen, Microfibril, Perimysium). Se conservan porque ninguno de los dos bancos autorizados tiene una versión sin rótulos y borrarlos dejaría las líneas guía apuntando al aire. El pie y el texto alternativo nombran las estructuras en español. | Reemplaza 🤕 en el tema de esguinces, luxaciones y desgarros. |
| `cp-servier-tep` | El TEP es un problema de obstrucción, no de vía aérea; la figura lo deja claro de un vistazo. | Cobertura nueva para TEP y shock obstructivo. |
| `cp-servier-tos` | En la OVACE la tos eficaz es el criterio que decide no intervenir: es el signo del tema. | Reemplaza 🫁 en los temas de OVACE, donde el pulmón no señalaba el signo clínico. |
| `cp-servier-traslado-carga` | El bienestar del TUM trata en buena parte de mecánica corporal: esta es la figura del gesto que se corrige. | Reemplaza 🧘 en el tema de bienestar del TUM. |
| `cp-servier-trombosis` | Es el origen del TEP: el tema encadena trombosis y embolia. | Cobertura nueva para TEP. |
| `cp-servier-ulcera-gastrica` | Es la lesión que explica a la vez la gastritis grave y el sangrado de tubo digestivo alto. | Reemplaza 🔥 en gastritis y 🩸 en sangrado de tubo digestivo, que no distinguían la lesión. |
| `cp-servier-vejiga` | Icono anatómico para infección urinaria y trauma genitourinario. | Reemplaza 🚻 y 🦠 en el tema urinario, separándolo del icono de infección general. |
| `cp-servier-vellosidades` | Es la superficie de absorción de agua: explica por qué una diarrea deshidrata. DEUDA DECLARADA: el dibujo trae rótulos quemados en inglés (Arteriole, Venule, Mucus cell, Epithelial cell, Lacteal, Blood/Lymphatic circulation). Se conservan porque ninguno de los dos bancos autorizados tiene una versión sin rótulos y borrarlos dejaría las líneas guía apuntando al aire. El pie y el texto alternativo nombran las estructuras en español. | Cobertura nueva para deshidratación. |
| `cp-servier-vena` | Icono del acceso venoso periférico y del sistema venoso. | Reemplaza 🎯 en sitios de punción, donde la diana no señalaba nada anatómico. |
| `cp-servier-ventilador` | Icono de soporte ventilatorio y de dispositivos y tanques de oxígeno. | Reemplaza 🛢️ en tanques de oxígeno. |
| `cp-servier-via-aerea-superior` | Figura de referencia de toda la unidad de vía aérea: apertura manual, cánulas, supraglóticos e intubación ocurren sobre este trayecto. DEUDA DECLARADA: el dibujo trae rótulos quemados en inglés (Tongue, Oral cavity, Pharynx, Nasal cavity, Mandible, Palate). Se conservan porque ninguno de los dos bancos autorizados tiene una versión sin rótulos y borrarlos dejaría las líneas guía apuntando al aire. El pie y el texto alternativo nombran las estructuras en español. | Reemplaza 🤚, ↗️, 🧑‍🚒, 👃, 🎭 y 🏛️, que eran símbolos de maniobras sin relación anatómica. |
| `cp-servier-via-intrapulmonar` | Es el nivel donde actúan el asma y la insuficiencia respiratoria; el pulmón entero no lo muestra. | Cobertura nueva para insuficiencia respiratoria y asma. |
| `cp-servier-virus` | Agente de las infecciones respiratorias altas, que en pediatría son casi siempre virales. | Reemplaza 🤧 en infección de vías respiratorias. |
| `cp-servier-virus-hepatitis` | Identifica el agente de la hepatitis, distinguiéndola de la cirrosis con la que comparte tema. | Cobertura nueva para cirrosis y hepatitis. |
| `cp-smart-arterias-cerebrales` | El territorio de la arteria ocluida decide el déficit del ictus: sin el mapa vascular, la focalidad no se explica. | Componente de la composición de accidente cerebrovascular. |
| `cp-smart-arterias-cuello` | El control de hemorragia del cuello y el objeto empalado cervical exigen saber qué hay debajo. | Cobertura nueva para exploración del cuello, control de hemorragias cervicales y objeto empalado. |
| `cp-smart-caja-toracica` | Es el continente de todo el módulo de trauma de tórax y el mapa de la auscultación. | Cobertura nueva para definición y clasificación del trauma de tórax. |
| `cp-smart-colon` | Complementa la figura del colon completo cuando el tema habla de la pared. | Cobertura nueva para lesión de intestino y colitis. |
| `cp-smart-craneo` | Icono de trauma craneal y fractura de cráneo. | Reemplaza 💀 y 🤕 en los temas de trauma craneal. |
| `cp-smart-deglucion` | Es el mecanismo que protege la vía aérea; su fallo es la broncoaspiración. | Cobertura nueva para OVACE y protección de la vía aérea. |
| `cp-smart-esofago` | El esófago no tiene serosa, y eso explica por qué su lesión se contamina hacia el mediastino. | Cobertura nueva para lesión de esófago y obturador esofágico. |
| `cp-smart-esqueleto` | Es el mapa general del sistema óseo y la referencia para localizar cada lesión del módulo de trauma. | Cobertura nueva para el sistema óseo y para el módulo de trauma musculoesquelético. |
| `cp-smart-esqueleto-nino` | Explica de un vistazo por qué el hueso del niño se deforma antes de romperse y por qué la cabeza recibe más energía. | Cobertura nueva para anatomía y fisiología pediátrica, crecimiento y trauma pediátrico. |
| `cp-smart-evc-hemorragico` | Es la otra mitad del tema; distinguirlo del isquémico cambia por completo la conducta. | Componente de la composición de accidente cerebrovascular y de lesiones intracraneales. |
| `cp-smart-evc-isquemico` | Es el 80 % de los ictus y el que define la ventana de reperfusión. | Componente del sustituto del emoji ⏱️ en accidente cerebrovascular. |
| `cp-smart-fractura-clavicula` | El plan dedica un tema propio a la lesión de clavícula. | Cobertura nueva para lesión de clavícula. |
| `cp-smart-fractura-costal` | Es la lesión de costilla y la base del tórax inestable, que es la misma lesión repetida en varios arcos. | Reemplaza ↕️ en tórax inestable y cubre lesión de costilla. |
| `cp-smart-fractura-hombro` | Es la figura más próxima a la lesión de escápula, que requiere gran energía y obliga a buscar lesiones asociadas. | Reemplaza 🛡️ en lesión de escápula. Deuda declarada: ninguno de los dos bancos tiene una escápula aislada. |
| `cp-smart-hernia-discal` | Es la referencia de compresión radicular, que el plan usa para explicar el dolor irradiado y el cuadro de cauda equina. | Cobertura nueva para fracturas de cuerpo vertebral y síndrome de cauda equina. |
| `cp-smart-holter` | Es la colocación de electrodos, que es lo que el tema «Uso del monitor desfibrilador» enseña antes de interpretar. | Reemplaza ⚡ en uso del monitor desfibrilador. |
| `cp-smart-laringe-corte` | Es la vista que se busca en la laringoscopia; la laringe cerrada no muestra la glotis. | Componente de la composición de secuencia de intubación y del tema de técnica de intubación. |
| `cp-smart-mama` | Componente del tema de sistema reproductor femenino y de la atención al recién nacido sano. | Componente de la composición de sistema reproductor. |
| `cp-smart-medula-espinal` | Los síndromes medulares del plan (anterior, posterior, Brown-Séquard, cauda equina) solo se entienden sobre el corte transversal. | Reemplaza ⬆️, ⬇️, ↔️ y 🐴, que eran flechas sin anatomía. |
| `cp-smart-meningitis` | Localiza la infección en la cubierta y no en el parénquima, que es lo que explica la rigidez de nuca. | Cobertura nueva para meningitis pediátrica. |
| `cp-smart-nefrona` | Es la nefrona con todos los segmentos que el tema nombra. Se prefirió sobre la variante CC0 de BioIcons, que es un esquema plano sin diferenciar el asa. | Base del sustituto de la imagen de Drive «La nefrona». |
| `cp-smart-pelvis` | Es el anillo pelviano, que en trauma importa por su capacidad de sangrado y por la lesión de cadera. | Reemplaza 🦵 en el tema de cadera, donde el emoji de la pierna no señalaba la articulación. |
| `cp-smart-placenta` | El sufrimiento fetal es un problema de este intercambio; la figura lo localiza. | Reemplaza 📉 en sufrimiento fetal agudo. |
| `cp-smart-placenta-previa` | Es una de las dos causas mayores de hemorragia del tercer trimestre y la que contraindica el tacto. | Cobertura nueva para hemorragia del segundo y tercer trimestre. |
| `cp-smart-rodilla` | Referencia articular para luxaciones y esguinces de miembro inferior. | Cobertura nueva para esguinces, luxaciones y desgarros. |
| `cp-smart-suprarrenal` | Produce las catecolaminas, así que enlaza el tema endocrino con el de receptores adrenérgicos. | Componente del sustituto de «Glándulas endocrinas». |
| `cp-smart-testiculo` | Componente del tema de sistema reproductor masculino y referencia de la torsión testicular. | Componente de la composición de sistema reproductor. |
| `cp-smart-tiroides` | Glándula obligada del tema endocrino y referencia anatómica del cuello. | Componente del sustituto de «Glándulas endocrinas». |
| `cp-smart-utero` | Es la anatomía que la exploración ginecológica y la torsión ovárica necesitan. | Reemplaza 🌀 en torsión ovárica y cubre exploración ginecológica y sistema reproductor. |
| `cp-smart-vesicula` | Explica el trayecto que obstruye un cálculo y por qué el dolor se localiza donde se localiza. | Cobertura nueva para colelitiasis y colecistitis. |
| `dg-agentes-quemadura` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Cobertura nueva: el tema de agentes térmicos usaba un emoji de extintor. |
| `dg-bomba-sodio-potasio` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye public/imagenes/m2/bomba-sodio-potasio.svg, conservando todo su texto. |
| `dg-cascada-coagulacion` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye la imagen de Drive «Cascada de la coagulación». |
| `dg-celula-organelos` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye la imagen de Drive «La célula y sus organelos», que era un esquema rotulado. |
| `dg-circulacion-mayor-menor` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye public/imagenes/m2/circulacion-mayor-menor.svg. |
| `dg-clasificacion-shock` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye public/imagenes/m5/clasificacion-shock.svg, conservando todas sus causas. |
| `dg-columna-vertebral` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye la imagen de Drive «Columna vertebral». La ilustración de SMART se sirve además como figura aparte del mismo tema. |
| `dg-cuadrantes-abdominales` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Cobertura nueva: el tema de cuadrantes y exploración física usaba un emoji de lupa. |
| `dg-curva-oxihemoglobina` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye public/imagenes/m3/curva-oxihemoglobina.svg, conservando P50 y los dos desplazamientos. |
| `dg-ecg-onda-normal` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye public/imagenes/m3/ecg-onda-normal.svg, conservando sus intervalos. |
| `dg-encefalo-regiones` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye la imagen de Drive «Regiones del encéfalo». |
| `dg-equilibrio-acido-base` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye public/imagenes/m2/equilibrio-acido-base.svg, conservando los cuatro cuadros y la regla de lectura. |
| `dg-gasto-cardiaco` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye public/imagenes/m2/gasto-cardiaco.svg. |
| `dg-glandulas-endocrinas` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye la imagen de Drive «Glándulas endocrinas». Las ilustraciones de tiroides y suprarrenal de SMART se sirven además como figuras aparte del mismo tema. |
| `dg-grados-quemadura` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Cobertura nueva: el tema de grados de quemadura no tenía figura propia y compartía emoji con el resto de la unidad. |
| `dg-nefrona` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye la imagen de Drive «La nefrona». |
| `dg-picaduras-mordeduras` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Cobertura nueva: el tema usaba un emoji de alacrán, y ninguno de los dos bancos tiene un alacrán. |
| `dg-piel-capas` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye la imagen de Drive «Capas de la piel». |
| `dg-receptores-adrenergicos` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye la imagen de Drive «Receptores adrenérgicos y sus efectos». |
| `dg-secuencia-intubacion` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye la imagen de Drive «Secuencia Rápida de Intubación». |
| `dg-sistema-conduccion` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Sustituye public/imagenes/m2/sistema-conduccion.svg, conservando marcapasos y frecuencias. |
| `dg-soluciones-cristaloides` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Cobertura nueva: el tema de soluciones cristaloides usaba un emoji de matraz. |
| `dg-tipos-hemorragia` | La figura original comunicaba un proceso, una curva o una clasificación: sustituirla por un icono aislado habría destruido lo que enseñaba. | Cobertura nueva: el tema de tipos de hemorragia no tenía figura propia. |
| `ic-adultos-mayores` | Icono de la unidad de geriatría cuando el tema trata de la población y no de un paciente. | Reemplaza 📉 en causas principales de muerte y 💎 en el diamante GEMS. |
| `ic-ambulancia` | Icono del sistema médico de urgencias y del traslado. BioIcons no tiene ningún vehículo sanitario. | Reemplaza 🚑 en los temas sobre el SMU y el traslado, no en los de valoración. |
| `ic-botiquin` | El tema «Botiquín ideal» trata precisamente de este objeto y de su contenido. | Reemplaza 🧰 en el tema de botiquín ideal. |
| `ic-camilla` | Es el equipo del traslado y de la movilización, que el módulo 7 trata como operación. | Cobertura nueva para operaciones de ambulancias e inmovilización. |
| `ic-collarin` | Es el dispositivo del tema de inmovilización espinal y de control de cervicales. | Reemplaza 🛏️ en inmovilización espinal e inmovilización pediátrica. |
| `ic-desfibrilador` | Icono del DEA, del paro y de las arritmias letales: el dispositivo que define la conducta en esos temas. | Reemplaza ⚡ en DEA y monitor, y 💔 en arritmias letales, SCA y shock cardiogénico. |
| `ic-esguince` | Es el esguince más frecuente y la figura del tema. | Reemplaza 🤕 en esguinces, luxaciones y desgarros. |
| `ic-estetoscopio` | Icono de exploración física y auscultación. | Reemplaza 🩺. |
| `ic-feto-utero` | Icono de la unidad obstétrica: muestra a la vez gestación y presentación, que es lo que el plan evalúa. | Reemplaza 🤰, 🫃 y 📉 en los temas obstétricos. |
| `ic-fractura` | Icono de fractura y de férulas: muestra la lesión, no el hueso sano. | Reemplaza 🦴 en fracturas y 🔧 en férulas de tracción. |
| `ic-higiene-manos` | Es la medida de bioseguridad de mayor rendimiento y parte del bienestar del TUM. | Cobertura nueva para bienestar del TUM y prevención. |
| `ic-hueso` | Icono anatómico del sistema óseo que además explica por qué el hueso sangra al fracturarse y por qué el acceso intraóseo funciona. | Reemplaza 🦴, incluido el tema de acceso intraóseo, donde el emoji no mostraba la cavidad medular. |
| `ic-nino` | Icono de la unidad pediátrica. La proporción del dibujo sostiene una idea del plan: la cabeza pesa proporcionalmente más, y eso cambia el patrón de lesión. | Reemplaza 🧒, 👶 y 🚸 en los temas pediátricos. |
| `ic-rcp` | El tema de RCP trata de este gesto; ningún icono de corazón lo representa. | Reemplaza ❤️ en RCP de legos y cubre RCP pediátrico, neonatal y megacode. |
| `ic-recien-nacido` | Icono de los temas neonatales, donde la conducta es distinta a la del lactante. | Reemplaza 🍼 y 👶 en recién nacido y reanimación neonatal. |
| `ic-silla-ruedas` | Los temas de necesidades especiales y de movilidad del adulto mayor tratan de dependencia funcional; es el objeto que la representa. | Reemplaza ♿ en niños con necesidades especiales. |
| `ic-tension-arterial` | Icono de signos vitales y de hipertensión: muestra el procedimiento, no un número. | Reemplaza 🌡️ en signos vitales y 🩺 en hipertensión. |
| `il-arbol-traqueobronquial` | Muestra el árbol completo y la asimetría derecha/izquierda, que es lo que importa clínicamente en aspiración y en colocación del tubo. | Sustituye la imagen de Drive «Árbol traqueobronquial y pulmones», sin texto quemado. |
| `il-columna-vertebral` | Es la columna completa y de perfil, la vista en la que se distinguen regiones y curvaturas. BioIcons no tiene ninguna columna. | Base del sustituto de la imagen de Drive «Columna vertebral». |
| `il-corazon-vascularizacion` | Única ilustración del catálogo que muestra a la vez la silueta cardíaca y la vascularización coronaria, que es lo que pedía la tarjeta del Atlas. | Sustituye la imagen de Drive «Anatomía del corazón y arterias coronarias». Conserva cámaras y trayecto coronario; no añade oclusiones que el tema no pide. |
| `il-encefalo-corte` | Base de la composición «Regiones del encéfalo»: las tres regiones a rotular quedan visibles y separadas. | Base del sustituto de la imagen de Drive «Regiones del encéfalo». |
| `il-piel-corte` | Corte limpio con las tres capas diferenciadas, que es lo que el tema necesita para explicar profundidad de quemadura. | Base del sustituto de la imagen de Drive «Capas de la piel». |
| `il-tracto-digestivo` | Versión sin rótulos del esquema digestivo: los nombres se escriben en español en el pie en lugar de quedar quemados en inglés. | Sustituye la imagen de Drive «Tracto digestivo». Se descartó `digestive-system-labeled` por traer los rótulos incrustados. |

## 5. Peso de los archivos

El presupuesto para el papel de ICONO es **128 KB**. Lo que lo supera
sigue en el catálogo como ilustración —se usa en la galería y en el tema— pero
deja de ser elegible como icono de cabecera: pedir 400 KB para pintar 26 píxeles
sería absurdo. Nada se degrada en silencio, y estos son los diez más pesados:

| assetId | Peso | Tipo |
|---|---|---|
| `cp-dbcls-tipos-neurona` | 547 KB | diagram_component |
| `dg-picaduras-mordeduras` | 520 KB | composite |
| `cp-servier-trombosis` | 476 KB | illustration |
| `cp-servier-hematopoyesis` | 393 KB | illustration |
| `dg-clasificacion-shock` | 379 KB | composite |
| `dg-cascada-coagulacion` | 342 KB | composite |
| `dg-celula-organelos` | 339 KB | composite |
| `cp-servier-coagulo` | 328 KB | diagram_component |
| `cp-servier-virus` | 318 KB | illustration |
| `cp-servier-nucleo` | 313 KB | diagram_component |

Reclasificados de icono a ilustración por peso (16): cp-servier-lobulos-pulmonares (214 KB), cp-servier-respiracion (251 KB), cp-servier-tendon (293 KB), cp-servier-musculatura (227 KB), cp-servier-colitis (158 KB), cp-servier-trombosis (476 KB), cp-servier-hematopoyesis (393 KB), cp-servier-herida (256 KB), cp-servier-bacteria (133 KB), cp-servier-virus (318 KB), cp-dbcls-neurona (303 KB), cp-smart-hernia-discal (156 KB), cp-smart-placenta-previa (162 KB), cp-smart-meningitis (158 KB), cp-smart-rodilla (135 KB), ic-silla-ruedas (232 KB).

Los SVG se sirven comprimidos: el conjunto ocupa unos 4 MB con gzip. Los PNG de
SMART llegan tal cual del proveedor, porque optimizarlos exigiría `sharp`, que
este repositorio no lleva como dependencia a propósito.

## 6. Bloqueos y deudas declaradas

- **Alacrán (m4-tox-picaduras)** — El plan nombra la picadura de alacrán y ninguno de los dos bancos autorizados tiene un alacrán. La composición dg-picaduras-mordeduras cubre himenóptero, araña y serpiente, y declara la ausencia. No se ha buscado en fuentes no autorizadas.
- **Escápula aislada (m5-tt-escapula)** — Ni BioIcons ni SMART tienen una escápula suelta. Se usa la fractura de hombro de SMART, que incluye la cintura escapular, y se declara la aproximación.
- **Vehículos y mecanismos de impacto (unidad m5-cinematica-trauma)** — Ningún banco autorizado tiene vehículos, cascos ni escenas de colisión. Los once temas de cinemática reciben figuras de cuerpos en movimiento (ciclista, corredor), la aorta para la desaceleración y el pictograma de explosivo. Es una aproximación declarada, no una equivalencia.
- **Sinapsis ampliada (m2-afi-nervioso)** — La neurona de DBCLS llega hasta las terminaciones axónicas y no amplía la hendidura sináptica. Ninguna de las alternativas CC0 la dibuja tampoco.
- **Especie de serpiente** — El dibujo disponible en DBCLS es una serpiente japonesa, no una de importancia médica en México. La figura ilustra el mecanismo, no la identificación de especie, y así se declara en su ficha.
- **Servier Medical Art sin paquete descargable ni commit** — SMART no publica un repositorio git ni un paquete único. La reproducibilidad se sostiene en el sha256 de cada archivo y en la fecha de recuperación registrada en el catálogo. El endpoint /wp-json/wp/v2/icons responde 401 y no se usa. Los activos llegan en PNG: SMART no ofrece SVG para este material.
- **Figuras clínicas con cifras (Glasgow, niveles de PIC, Parkland, regla de los 9, colores de triage, triángulo de evaluación pediátrica)** — NO se han construido. Habrían exigido introducir contenido clínico nuevo con cifras, y esta sesión es una migración de imágenes: esas cifras tienen que venir de la lección redactada y de su fuente académica. Esos temas reciben la figura anatómica que les corresponde y quedan anotados para la sesión editorial.
- **Composiciones con componentes PNG** — Una composición solo embebe SVG. Empotrar un PNG de SMART en base64 habría llevado la figura por encima del presupuesto de 300 KB del proyecto, así que en columna vertebral, nefrona y glándulas endocrinas la ilustración de SMART se sirve como figura aparte del mismo tema en vez de dentro de la composición.

## 7. Cómo actualizar en el futuro

1. Editar `scripts/activos/seleccion.json` (activos) o `composiciones.json` (figuras).
2. Para subir la versión de BioIcons, cambiar `commit` en `scripts/activos/fuentes.json`.
3. `npm run activos:importar -- --dry-run` y revisar el informe.
4. `npm run activos:importar` y después `npm test`.
5. La caché de descargas vive en `.cache/activos/`; borrarla fuerza a volver a bajar.
   `--sin-red` regenera solo con lo que ya está en caché.
